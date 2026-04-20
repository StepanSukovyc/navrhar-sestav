"use strict";
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            var Seznam;
            (function (Seznam) {
                // TODO: dočasné - až bude zaktualizována varianta Eko, tak ji použít nebo tohle přesunout do Eko.WebClient
                Seznam.presetDokumentColumns = ["pozice_spis_ico", "ixp_spis", "priz_spis" /*, "ixs_fun_akt"*/, "ixs_su_akt", "nazev", "akt_znacka", "stav_dist", "stav_pis" /*, "typ_ag"*/ /*, "ktg_typ"*/ /*, "ixs_typ"*/, "s_prij", "s_ssl", "dat_zmena", "zmenu_prov", "s_ele", "s_fyz", "spis_pl", "spis_znak", "ixs_fun_wfl", "ixs_su_wfl", "dat_vyriz", "s_schval", "skar_znak", "skar_lhuta", "rok_spo_uda", "rok_skartace", "poc_listu", "poc_stran", "poc_kop", "poc_priloh", "poc_l_priloh", "cj", "PrizVBaliku", "ixs_zup", "PrizPozSkar", /*"typ_entity_ico",*/ "technicke_vlastnosti_ico"];
                // TODO: těmto hodnotám musí odpovídat filtry (s prefixem dokument_)
                // 18.01.2022 - TFeik
                // Zakomentování odstraněných filtrů dokumentu.
                Seznam.presetDokumentFields = [/*"pozice_spis_ico", */ "ixp_spis", "priz_spis" /*, "ixs_fun_akt"*/, "ixs_su_akt", "nazev", "akt_znacka", "stav_dist", "stav_pis" /*, "typ_ag"*/ /*, "ktg_typ"*/ /*, "ixs_typ"*/, "s_prij", "s_ssl", "dat_zmena", "zmenu_prov", "s_ele", "s_fyz", "uzo", "spis_pl", "spis_znak", "ixs_fun_wfl", "ixs_su_wfl", "dat_vyriz", "s_schval", "skar_znak", "skar_lhuta", "rok_spo_uda", "rok_skartace", "poc_listu", "poc_stran", "poc_kop", "poc_priloh", "poc_l_priloh", "cj" /*, "PrizVBaliku"*/, "ixs_zup" /*, "PrizPozSkar"*/ /*, "typ_entity_ico"*/ /*, "technicke_vlastnosti_ico"*/];
                /**
                 * Vraci objekt gridu
                 * @param content
                 * @returns
                */
                function GetGrid(content) {
                    var data = content.element.find(".ggrid." + content.classGrid);
                    return (data.length == 0 ? null : data);
                }
                Seznam.GetGrid = GetGrid;
                /**
                 * Vraci objekt filtru
                 * @param {GContent} content
                 * @returns
                 */
                function GetFilter(content) {
                    if (Gordic.Utils.WidgetExists("gfilterpanel", content?.$filterForm))
                        return content?.$filterForm;
                    else
                        throw "jres:30250571"; //RC 30250571 : Filtr nenalezen
                    //return content?.element.find(".js-filtr.gfilterpanel");
                    //return $(".js-filtr");
                }
                Seznam.GetFilter = GetFilter;
                /**
                 * Pridani radku, ktere je nutono obcerstvit
                 * @param pidDokladu
                 * @param content
                 * @returns
                 */
                function addRefreshRow(pidDokladu, content) {
                    let seznam = content;
                    if (typeof content === "undefined")
                        seznam = GetContentSeznam();
                    if (!seznam || seznam.closed)
                        return null;
                    let find = seznam.refreshRows.find((item) => item.ixp == pidDokladu);
                    if (typeof find === "undefined")
                        seznam.refreshRows.push({ ixp: pidDokladu });
                }
                Seznam.addRefreshRow = addRefreshRow;
                /**
                 * Vraceni obsahu seznamu
                 * @returns
                 */
                function GetContentSeznam() {
                    return $.content("UCTSeznamdokladu#");
                }
                Seznam.GetContentSeznam = GetContentSeznam;
                /**
                 * Dohledai radku
                 * @param {string} pidDokladu
                 * @returns
                 */
                function NajdiRadek(pidDokladu) {
                    var seznam = GetContentSeznam();
                    if (seznam === null || seznam.closed)
                        return null;
                    var grid = GetGrid(GetContentSeznam());
                    if (grid === null)
                        return;
                    var radek = Gordic.Eko.WebClient.Common.GetView(grid).findByKey(pidDokladu);
                    //var radek = $.content("UCTSeznamdokladu#").view.findByKey(pidDokladu, false);
                    if (radek)
                        return radek;
                    return null;
                }
                Seznam.NajdiRadek = NajdiRadek;
                ///**
                // * Dohrani radku na grid
                // * @param content
                // * @param pidyDokladu
                // * @returns
                // */
                //export function ReloadRowFromDB(content: GContent | null | undefined, pidyDokladu: string[]): JQueryPromise<any> {
                //    if (typeof content === undefined || content === null)
                //        content = GetContentSeznam();
                //    if (typeof content==="undefined" && content === null) return $.Deferred().reject().promise();
                //    //var def = $.Deferred();
                //    content!.beginOperation("jres:30250098"); //RC 30250098 : Načítám data
                //    //nacteni dat do gridu
                //    // @ts-ignore: docasne pro moznost prekladu 84
                //    //return view.requestData({ Filters: { ixp: { o: "=", v: pidDokladu } } })
                //    //    .always(() => {
                //    //        content!.endOperation();
                //    //        debugger;
                //    //        (content as GUctSeznam).$grid.ggrid("activeRow", { ixp: pidDokladu })
                //    //    });
                //    return (content as GContent).isl.UctDoklad.list({ ixp: { o: "IN", v: pidyDokladu } })
                //        .getData()
                //        .then(function (radky) {
                //            //if (refreshSeznamu) {
                //            debugger;
                //            if (radky.length > 0) {
                //                // zjisteni view
                //                let view = Gordic.Eko.WebClient.Common.GetView(GetGrid(content as any));
                //                view.updateData(radky, "update");
                //                var grid = GetGrid(content as any);
                //                if (grid === null) return
                //                grid.ggrid("activeRow", { ixp: radky[0].ixp });
                //                //ReplaceRow(content, radek[0], true);
                //                //}
                //            }
                //            return  radky;
                //        })
                //        .always(function () { content!.endOperation(); })
                //        ;
                //    //return def.promise();
                //}
                /**
                 * Nahrazeni radku novym obsahem
                 * @param {GContent} content
                 * @param {any} radek
                 * @param {boolean} refresh
                 */
                function ReplaceRow(content, radek, refresh) {
                    if (typeof content === "undefined" || content === null)
                        content = GetContentSeznam();
                    if (content === null || content?.closed)
                        return;
                    // Zmena radku na gridu
                    // TODO: Nefunguje korektne
                    //var that = content;
                    //var myview = new Gordic.Data.View(radek, { key: "ixp" });
                    //radek = myview.findByKey(radek.ixp, true);
                    var grid = GetGrid(content);
                    if (grid === null)
                        return;
                    let view = Gordic.Eko.WebClient.Common.GetView(grid);
                    //view.updateDataRaw(radek)
                    //view.updateData(radek, "refresh")
                    view.updateData(radek, "update");
                    if (refresh) {
                        grid.ggrid("activeRow", { ixp: radek.ixp });
                        //$.content("UCTSeznamdokladu#").$grid.ggrid("refreshRows", false) 
                        grid.ggrid("fitV");
                    }
                }
                Seznam.ReplaceRow = ReplaceRow;
                /**
                 * Obcerstveni seznamu z nactenych dat ve view
                 */
                function RefreshSeznamu(content) {
                    if (typeof content === "undefined" || content === null)
                        content = GetContentSeznam();
                    var grid = GetGrid(content);
                    if (grid === null)
                        return;
                    //grid.ggrid("activeRow", Gordic.Eko.WebClient.Common.AktualniRadek(grid)/*grid.ggrid("activeRow")*/);
                    // nastaveni aktualniho radku
                    // TODO: nevim jak to funguje ?
                    Gordic.Eko.WebClient.Common.setCurrentRow(grid, Gordic.Eko.Grid.currentRow(grid));
                    //$.content("UCTSeznamdokladu#").$grid.ggrid("refresh");
                }
                Seznam.RefreshSeznamu = RefreshSeznamu;
                /**
                 * Nastaveni pristupnosti prvku
                 * @param content
                 */
                function NastaveniPristupnosti(content, permisions, pocetRadku) {
                    const { actions } = content;
                    if (content.closed)
                        return;
                    var grid = GetGrid(content);
                    if (grid === null)
                        return;
                    if (typeof permisions === "undefined" || typeof pocetRadku === "undefined") {
                        // nastaveni pristupnosti tisku o zauctovani
                        const selectionRow = grid.ggrid("getSelection");
                        const result = selectionRow.find((row) => (!row.IsZauctovanoCastecne && !row.IsZauctovany));
                        const enablePrint = typeof result === "undefined" && selectionRow.length !== 0;
                        content.actions.tiskVybranychUDAct?.update({
                            enabled: enablePrint, tooltip: enablePrint ? "jres:30250631" : //RC 30250631 : pro doklady označené v seznamu
                                "jres:30250857", //RC 30250857 : Vybrány i nezúčtované doklady
                        });
                        return;
                    }
                    //content.actions!.actPodaniDokladu!.update({
                    //    enabled: content!.SeznamContentDto!.Permmissions!.PovoleniPodani!.Enabled===true,
                    //    tooltip: content.SeznamContentDto.Permmissions!.PovoleniPodani!.ToolTip,
                    //});
                    let ipxKnihy = getIxpDen(content);
                    // texty k sestavam
                    actions.actionNastaveniTextuTisku?.update({
                        enabled: ipxKnihy?.indexOf("*") == -1,
                        tooltip: ipxKnihy?.indexOf("*") == -1 ? "jres:30250865" //RC 30250865 : Nastavení textů pro tiskové výstupy
                            : "jres:30250864" //RC 30250864 : Není vybraná kniha
                    });
                    // podani
                    actions.actPodaniDokladu?.updatePermission(permisions.CanCreate);
                    // detail dokladu
                    //let pocetRadku = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid);
                    let emptySeznam = "";
                    //if (pocetRadku == 1) pocetRadku=0
                    if (pocetRadku < 1)
                        emptySeznam = "jres:30250168"; //RC 30250168 : Seznam dokladů je prázdný
                    //var tootip = content.actions.actDetailDokladu!.tooltip;
                    actions.actDetailDokladu?.updatePermission(permisions.CanRead);
                    actions.actDetailDokladu.update({
                        enabled: pocetRadku > 0,
                        tooltip: (pocetRadku < 1 ? emptySeznam : "jres:30250661"), //RC 30250661 : Zobrazení detailu dokladu
                    });
                    //actions.actDetailDoZalozky?.updatePermission(permisions.CanRead);
                    actions.actDetailDoZalozky.update({
                        visible: true,
                        enabled: pocetRadku > 0,
                        tooltip: (pocetRadku < 1 ? emptySeznam : actions.actDetailDoZalozky?.tooltip), //RC 30250837 : Zobrazení detailu dokladu v nové záložce
                    });
                    //content.actions.actDetailPolozky!.update({
                    //    enabled: pocetRadku > 0,
                    //    tooltip: (pocetRadku < 1 ? emptySeznam : "jres:30250606"), //RC 30250606 : Zobrazení detailu dokladu s aktivní záložkou s položkami
                    //    visible: false
                    //});
                    //var tootip = content.actions.actUpravitDoklad!.tooltip;
                    actions.actUpravitDoklad.update({
                        enabled: pocetRadku > 0,
                        tooltip: pocetRadku < 1 ? emptySeznam : "jres:30250662", //RC 30250662 : Zobrazení detailu dokladu v editaci
                    });
                    // tisk seznamu
                    /*
                    content.akceTisk.ActTiskSeznam.update({
                        enabled: pocetRadku > 0,
                        tooltip: (pocetRadku < 1 ? emptySeznam : content.akceTisk.ActTiskSeznam.tooltip),
                    });*/
                    // Zakazani vsech tisku
                    //if (pocetRadku < 1)
                    //content.menuTisk.
                    // TODO: nutno dodelat 
                    content.menuTisk /*["ActTiskSeznam"]*/.children.forEach(function (menu) {
                        if (menu.children) {
                            menu.children.forEach(function (submenu) {
                                submenu.action.update({
                                    enabled: pocetRadku > 0, tooltip: pocetRadku > 1 ? "" : emptySeznam,
                                });
                            });
                        }
                        else
                            menu.action.update({
                                enabled: pocetRadku > 0, tooltip: pocetRadku > 1 ? "" : emptySeznam,
                            });
                    });
                    // hromadne zauctovani dokladu
                    actions.actHromadneZauctovani?.updatePermission($.extend({ message: "" }, permisions.PovoleniProuctovat));
                    //if (permisions.PovoleniProuctovatHromadne.value)
                    //    content.actions.actHromadneZauctovani?.update({ tooltip:"" });
                    // hromadna kontrola metadat
                    actions.actHromadnaKontrolaMetadat?.updatePermission($.extend({ message: "" }, permisions.PovoleniKontrolyMetadat));
                    // Financni kontrola
                    actions.actHromadnaFIK?.updatePermission($.extend({ message: "" }, permisions.PovoleniFIK));
                    // Ucetni kontrola
                    actions.actHromadnaUCK?.updatePermission($.extend({ message: "" }, permisions.PovoleniUK));
                    //if (permisions.PovoleniHromadneKontrolyMetadat.value)
                    //content.actions.actHromadnaKontrolaMetadat?.update({ tooltip: "" });
                    // uzavreni vybranych dokladu   
                    actions.actHromUzavDoklVyb?.updatePermission($.extend({ message: "" }, permisions.PovoleniUzavreni));
                    //if (permisions.PovoleniUzavreniHromadne.value)
                    //content.actions.actHromUzavDoklVyb?.update({ tooltip: "" });
                    //// uzavreni vybranych dokladu            
                    //content.actions.actHromUzavDoklVyb!.update({
                    //    enabled: content.SeznamContentDto.Permmissions!.PovoleniHromadnehoUzavreniVybranych!.Enabled===true,
                    //    tooltip: content.SeznamContentDto.Permmissions!.PovoleniHromadnehoUzavreniVybranych!.ToolTip,
                    //});
                    // hromadne prevzeti
                    actions.actHromadnePrevzeti?.updatePermission($.extend({ message: "" }, permisions.PovoleniPrevzit));
                    //if (permisions.PovoleniPrevzitHromadne.value)
                    //content.actions.actHromadnePrevzeti?.update({ tooltip: "" });
                    //// prevzeti
                    //content.actions.actHromadnePrevzeti!.update({
                    //    enabled: content.SeznamContentDto.Permmissions!.PovoleniPrevzeti!.Enabled===true,
                    //    tooltip: content.SeznamContentDto.Permmissions!.PovoleniPrevzeti!.ToolTip,
                    //});
                    // hromadne preevidovat
                    actions.actHromadnaPreevidence?.updatePermission($.extend({ message: "" }, permisions.PovoleniPreevidence));
                    //if (permisions.PovoleniPreevidenceHromadne.value)
                    //content.actions.actHromadnaPreevidence?.update({ tooltip: "" });
                    //// preevidence
                    //content.actions.actHromadnaPreevidence!.update({
                    //    enabled: content.SeznamContentDto.Permmissions!.PovoleniPreevidence!.Enabled===true,
                    //    tooltip: content.SeznamContentDto.Permmissions!.PovoleniPreevidence!.ToolTip,
                    //});
                    // prideleni
                    actions.actHromednePridelit?.updatePermission($.extend({ message: "" }, permisions.PovoleniPridelit));
                    //if (permisions.PovoleniPridelitHromadne.value)
                    //content.actions.actHromednePridelit?.update({ tooltip: "" });
                    // predat
                    actions.actHromadnePredat?.updatePermission($.extend({ message: "" }, permisions.PovoleniPredat));
                    //if (permisions.PovoleniPredatHromadne.value)
                    //content.actions.actHromadnePredat?.update({ tooltip: "" });
                    // klicova slova
                    actions.actKlicovaSlovaDokladu?.updatePermission($.extend({ message: "" }, permisions.PovoleniKlicovaSlova));
                    //if (permisions.PovoleniKlicovaSlova.value)
                    //content.actions.actKlicovaSlovaDokladu?.update({ tooltip: "" });
                    //// klicova slova
                    //content.actions.actKlicovaSlovaDokladu!.update({
                    //    enabled: content.SeznamContentDto.Permmissions!.PovoleniKlicovaSlova!.Enabled===true,
                    //    tooltip: content.SeznamContentDto.Permmissions!.PovoleniKlicovaSlova!.ToolTip,
                    //});
                    // oznacit neprectene       
                    actions.actOznacitNeprectene?.updatePermission($.extend({ message: "" }, permisions.PovolenOznacitNeprectene));
                    //if (permisions.PovolenOznacitNeprectene.value)
                    //content.actions.actOznacitNeprectene?.update({ tooltip: "" });
                    //// oznacit neprectene                            
                    //content.actions.actOznacitNeprectene!.update({
                    //    enabled: content.SeznamContentDto.Permmissions!.PovolenOznacitNeprectene!.Enabled===true,
                    //    tooltip: content.SeznamContentDto.Permmissions!.PovolenOznacitNeprectene!.ToolTip,
                    //});
                    // oznacit prectene       
                    actions.actOznacitPrectene?.updatePermission($.extend({ message: "" }, permisions.PovolenOznacitPrectene));
                    //if (permisions.PovolenOznacitPrectene.value)
                    //content.actions.actOznacitPrectene?.update({ tooltip: "" });
                    actions.actObcerstvitSeznam.update({
                        enabled: true,
                        //  tooltip: emptySeznam,
                    });
                }
                Seznam.NastaveniPristupnosti = NastaveniPristupnosti;
                /**
                 * Znovunacteni dat
                 * @param {GUctSeznam} content
                 * @param filtr
                 * @param {string|undefined} idMessage
                 */
                function ReloadRequest(content, filtr, deffer) {
                    //var that = this;
                    if (content.closed)
                        return $.Deferred().reject().promise();
                    if (typeof filtr === "undefined" || filtr == null) {
                        let _filter = GetFilter(content);
                        //var _filter = content.$filterForm;
                        //const widgetExists = Gordic.Utils.WidgetExists("gfilterpanel", _filter);
                        filtr = _filter.gfilterpanel('getConfirmedData');
                        //filtr = _filter.gfilterpanel("getCurrentData");     
                        //filtr!.hraniceVelkychDat = content.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.BigData");//content.hraniceVelkychDat;
                        //filtr!.varovaniVelkehoMnoztviDat = content.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.WarningWhenLoading"); //content.varovaniVelkehoMnoztviDat;
                    }
                    if (typeof deffer === "undefined" || deffer === null) {
                        deffer = $.Deferred();
                        // zjisteni nastaveni chovani pri nacitani velkych dat
                        filtr.hraniceVelkychDat = Gordic.Eko.Utils.GetUserSettingsListMaxCount(content, "Global.Uct.AppSettings"); // content.LongListMaxCount; //content.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.BigData");//content.hraniceVelkychDat;
                        filtr.varovaniVelkehoMnoztviDat = Gordic.Eko.Utils.GetUserSettingsListWarning(content, "Global.Uct.AppSettings"); //content.LongListWarning;//content.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.WarningWhenLoading"); //content.varovaniVelkehoMnoztviDat;
                    }
                    content.beginOperation("jres:30250098"); //RC 30250098 : Načítám data
                    let myfiltr = filtr;
                    //filtr = filtr || {}; 
                    //sluzba pro pristup k datum ze serveru
                    //// @ts-ignore: docasne pro moznost prekladu 84
                    return content.isl.UctDoklad.list({ filters: myfiltr, /* fragments:[ "*"]*/ }).getView()
                        .then(function (seznamDokladu) {
                        var a = seznamDokladu.getDataRows();
                        return seznamDokladu;
                    })
                        .catch(function (error, type, vobj) {
                        let returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(content, error);
                        if (typeof returnMessage === "object") {
                            returnMessage.then(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    if (returnValue.IdMessage === "seznamDokladu_que" && returnValue.TypeMessage === 4 /* Gordic.Eko.Interface.GETypeTransferMessage.DecisionQuestionMessage */) {
                                        if (returnValue.ResultQuestion && typeof returnValue.ResultQuestion === "string") {
                                            myfiltr.varovaniVelkehoMnoztviDat = returnValue.ResultQuestion === "YES";
                                        }
                                    }
                                    myfiltr.idMessage = returnValue.IdMessage;
                                    return Reload(content, myfiltr, deffer);
                                }
                                else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */) {
                                    if (returnValue.TypeMessage === 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        return Gordic.Eko.Grid.confirmListLimit(content, returnValue.PoleParam[0], content.LongListMaxCount)
                                            .on("yes", function () {
                                            // seznam se bude i přesto načítat
                                            myfiltr.varovaniVelkehoMnoztviDat = returnValue.ResultQuestion === "YES";
                                            return Reload(content, myfiltr, deffer);
                                        })
                                            .on("close", deffer.reject);
                                    }
                                    else
                                        return deffer.reject();
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    //content.endOperation();
                                    return deffer.reject();
                                }
                                else {
                                    //content.endOperation();
                                    return deffer.reject();
                                }
                            });
                            //}
                        }
                        else
                            throw error;
                    })
                        .always(function () {
                        content.endOperation();
                    });
                    //return;
                }
                Seznam.ReloadRequest = ReloadRequest;
                /**
                 * Znovunacteni dat
                 * @param {GUctSeznam} content
                 * @param filtr
                 * @param {string|undefined} idMessage
                 */
                function Reload(content, filtr, deffer) {
                    //debugger;
                    //var that = this;
                    if (content.closed)
                        return $.Deferred().reject().promise();
                    if (typeof filtr === "undefined" || filtr == null) {
                        var _filter = GetFilter(content);
                        //var _filter = content.$filterForm;
                        //const widgetExists = Gordic.Utils.WidgetExists("gfilterpanel", _filter);
                        filtr = _filter.gfilterpanel('getConfirmedData');
                        //filtr = _filter.gfilterpanel("getCurrentData");     
                        //filtr!.hraniceVelkychDat = content.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.BigData");//content.hraniceVelkychDat;
                        //filtr!.varovaniVelkehoMnoztviDat = content.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.WarningWhenLoading"); //content.varovaniVelkehoMnoztviDat;
                    }
                    if (typeof deffer === "undefined" || deffer === null) {
                        deffer = $.Deferred();
                        // zjisteni nastaveni chovani pri nacitani velkych dat
                        filtr.hraniceVelkychDat = Gordic.Eko.Utils.GetUserSettingsListMaxCount(content, "Global.Uct.AppSettings"); // content.LongListMaxCount; //content.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.BigData");//content.hraniceVelkychDat;
                        filtr.varovaniVelkehoMnoztviDat = Gordic.Eko.Utils.GetUserSettingsListWarning(content, "Global.Uct.AppSettings"); //content.LongListWarning;//content.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.WarningWhenLoading"); //content.varovaniVelkehoMnoztviDat;
                    }
                    content.beginOperation("jres:30250098"); //RC 30250098 : Načítám data
                    let myfiltr = filtr;
                    //filtr = filtr || {}; 
                    //var grid = GetGrid(content);
                    //var data = grid.ggrid("getView").requestData({ filters: myfiltr }, { onResponse: });
                    //data.
                    //nacteni dat do gridu
                    //debugger;        
                    //sluzba pro pristup k datum ze serveru
                    //// @ts-ignore: docasne pro moznost prekladu 84
                    return content.isl.UctDoklad.list({ filters: myfiltr, /* fragments:[ "*"]*/ })
                        .use((req, next, ctx) => {
                        return next(req).then((result) => {
                            //debugger;
                            NastaveniPristupnosti(content, result.meta, result.data.length);
                            return result;
                        });
                    })
                        .getData()
                        .then(function (seznamDokladu) {
                        //return seznamDokladu;
                        //debugger;
                        var myGrid = GetGrid(content);
                        if (myGrid == null)
                            return;
                        if (seznamDokladu && seznamDokladu.length > 0) {
                            //myGrid.ggrid("setData", view, true);
                            var view = myGrid.ggrid("getView");
                            view.updateData(seznamDokladu);
                        }
                        else
                            // Zjistit, co to udela                        
                            myGrid.ggrid("setData", new Gordic.Data.View(null, { key: "ixp" }), true);
                        myGrid.ggrid('focus'); // nastavení focusu na grid
                        //NastaveniPristupnosti(content);
                        return deffer.resolve();
                    })
                        .catch(function (error, type, vobj) {
                        let returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(content, error);
                        if (typeof returnMessage === "object") {
                            //if (type === "validation") {                        
                            //let transMsgTst = Gordic.Eko.WebClient.Common.GetTranMessage(vobj);
                            //// test, zda jsou poslany nejaky zpravy
                            //if (transMsgTst != null) {
                            //    let transMsg = transMsgTst as Eko.Interface.GTransferMessage[];
                            //    Gordic.Eko.WebClient.Common.ZpracovaniZprav(content, transMsg)
                            returnMessage.then(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    if (returnValue.IdMessage === "seznamDokladu_que" && returnValue.TypeMessage === 4 /* Gordic.Eko.Interface.GETypeTransferMessage.DecisionQuestionMessage */) {
                                        if (returnValue.ResultQuestion && typeof returnValue.ResultQuestion === "string") {
                                            myfiltr.varovaniVelkehoMnoztviDat = returnValue.ResultQuestion === "YES";
                                        }
                                    }
                                    myfiltr.idMessage = returnValue.IdMessage;
                                    return Reload(content, myfiltr, deffer);
                                }
                                else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */) {
                                    if (returnValue.TypeMessage === 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        return Gordic.Eko.Grid.confirmListLimit(content, returnValue.PoleParam[0], content.LongListMaxCount)
                                            .on("yes", function () {
                                            // seznam se bude i přesto načítat
                                            myfiltr.varovaniVelkehoMnoztviDat = returnValue.ResultQuestion === "YES";
                                            return Reload(content, myfiltr, deffer);
                                        })
                                            .on("close", deffer.reject);
                                    }
                                    else
                                        return deffer.reject();
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    //content.endOperation();
                                    return deffer.reject();
                                }
                                else {
                                    //content.endOperation();
                                    return deffer.reject();
                                }
                            });
                            //}
                        }
                        else
                            throw error;
                    })
                        .always(function () {
                        content.endOperation();
                    });
                    //return;
                }
                Seznam.Reload = Reload;
                /**
                 * Zobrazeni okna dle aktualniho radku
                 * @param content
                 * @param row
                 */
                function ZobrazDetail(content, row, objekt, polozky = false) {
                    if (content.closed)
                        return;
                    var grid = GetGrid(content);
                    if (grid === null)
                        return;
                    if (row != null)
                        Gordic.Uct.WebClient.ZobrazDetailDleIXP({ content: content, newMode: content.debugMode, ixp: row.ixp, samostaneOkno: false, editace: false, grid: grid, objekt: objekt, ixpDen: row.ixp_den, polozky: polozky });
                    //Gordic.Uct.WebClient.ZobrazDetailDleIXPOld(content, row.ixp as any, false, false, grid, objekt, row.ixp_den as any, polozky);
                    else
                        content.dialogs.messageBox("jres:30250035", //RC 30250035 : Upozornění
                        "jres:30250034"); //RC 30250034 : Není vybrán žádný řádek!
                }
                Seznam.ZobrazDetail = ZobrazDetail;
                /**
                 * Zobrazeni detailu dle pidu
                 * @param content
                 * @param row
                 */
                function ZobrazDetailIxp(content, ixp) {
                    if (content.closed)
                        return;
                    if (ixp != null)
                        Gordic.Uct.WebClient.ZobrazDetailDleIXP({ content: content, newMode: content.debugMode, ixp: ixp, samostaneOkno: false, editace: false, polozky: true });
                    //Gordic.Uct.WebClient.ZobrazDetailDleIXPOld(content, ixp, false, false, void 0,void 0, void 0, true);
                    else
                        content.dialogs.messageBox("jres:30250035", //RC 30250035 : Upozornění
                        "jres:30250034"); //RC 30250034 : Není vybrán žádný řádek!
                }
                Seznam.ZobrazDetailIxp = ZobrazDetailIxp;
                /**
                 * Zobrazeni okna v rezimu uprav hlavicky dokladu
                 * @param content
                 * @param row
                 */
                function UpravitDetail(content, row) {
                    if (content.closed)
                        return;
                    var grid = GetGrid(content);
                    if (grid === null)
                        return;
                    if (row != null)
                        Gordic.Uct.WebClient.ZobrazDetailDleIXP({ content: content, newMode: content.debugMode, ixp: row.ixp, samostaneOkno: false, editace: true, grid: grid, polozky: false });
                    //Gordic.Uct.WebClient.ZobrazDetailDleIXPOld(content, row.ixp, false, true, grid);
                    else
                        content.dialogs.messageBox("jres:30250035", //RC 30250035 : Upozornění
                        "jres:30250034"); //RC 30250034 : Není vybrán žádný řádek!
                }
                Seznam.UpravitDetail = UpravitDetail;
                ///**
                // * Hromadne zauctovani
                // * @param {GUctSeznam} content
                // */
                //export function HromadneZauctovani(content: GUctSeznam) {
                //    // zjisteni oznacenych radku
                //    if (content.closed) return;
                //    var grid = GetGrid(content);
                //    if (grid === null) return;
                //    let oznaceneRadky = Gordic.Eko.Grid.checkedRows<Gordic.Uct.Interface.GUctSeznamDokladuDto>(grid, false);
                //    if (oznaceneRadky === null || oznaceneRadky === undefined || oznaceneRadky.length == 0) {
                //        content.dialogs.alert("jres:30250035", //RC 30250035 : Upozornění
                //            "jres:30250334");  //RC 30250334 : Nenalezeny žádné označené řádky
                //        return;
                //    }
                //    EKOUtils.callOtherContent(content, "GUctHromadneZauctovani", "Uct",
                //        (cntDiv, contentPruvodce: GUctHromadneUzavreni) => {
                //            if (typeof contentPruvodce !== "undefined" && typeof contentPruvodce.successClose === "boolean" && contentPruvodce.successClose === true) {
                //                if (content.closed) return;
                //                // refresh seznamu
                //                refresRow(content, contentPruvodce.resultRows)
                //                //let grid = GetGrid(content/*GetContentSeznam()*/);
                //                var myGrid = GetGrid(content);
                //                if (myGrid === null) return;
                //                let view = Gordic.Eko.WebClient.Common.GetView(myGrid);
                //                contentPruvodce.resultRows.forEach(function (meta) {
                //                    var aktRadek = view.findByKey(meta.ixp as any);
                //                    if (typeof aktRadek !== "undefined")
                //                        aktRadek.checked = true;
                //                });
                //                myGrid.ggrid("refreshRows");
                //            }
                //        }
                //        , { selectedRows: oznaceneRadky })        
                //}
                ///**
                // * Uzavreni vsech dokladu
                // * @param {GUctSeznam} content
                // */
                //export function UzavreniVsechDokladu(content: GUctSeznam) {
                //    if (content.closed) return;
                //    var grid = GetGrid(content);
                //    if (grid === null) return;
                //    UzavreniDokladu(content, Gordic.Eko.WebClient.Common.GetAllRows(grid), true);
                //}
                ///**
                // *  Uzavreni vybranych dokladu
                // * @param {GUctSeznam} content
                // */
                //export function UzavreniVybranychDokladu(content: GUctSeznam) {
                //    if (content.closed) return;
                //    var grid = GetGrid(content);
                //    if (grid === null) return;
                //    UzavreniDokladu(content, Gordic.Eko.Grid.checkedRows<Gordic.Uct.Interface.GUctSeznamDokladuDto>(grid, false) as any,false);
                //}
                ///**
                // * Vlastni uzavreni dokladu
                // *  
                // * function UzavreniDokladu
                // * 
                // * @param {Gordic.Eko.Interface.GUctSeznamDokladuDto[]} doklady
                // */
                //function UzavreniDokladu(content: GUctSeznam, doklady: Gordic.Uct.Interface.GUctSeznamDokladuDto[], hromadne: boolean)
                //{
                //    let that = content;
                //    if (doklady === null || doklady === undefined || doklady.length == 0) {
                //        content.dialogs.alert("jres:30250035", //RC 30250035 : Upozornění
                //            "jres:30250334");  //RC 30250334 : Nenalezeny žádné označené řádky
                //        return;
                //    }
                //    EKOUtils.callOtherContent(content, "GUctHromadneUzavreni", "Uct",
                //        (cntDiv, contentPruvodce: GUctHromadneUzavreni) => {
                //            if (typeof contentPruvodce!=="undefined" && typeof contentPruvodce.successClose === "boolean" && contentPruvodce.successClose === true) {
                //              // refresh seznamu
                //              if (hromadne)
                //                  // nacte vse znovu
                //                  Reload(that);
                //              else
                //                  refresRow(content, contentPruvodce.resultRows)
                //              if (!hromadne) {
                //                  //let grid = GetGrid(GetContentSeznam());
                //                  let grid = GetGrid(content);
                //                  if (grid === null) return;
                //                  let view = Gordic.Eko.WebClient.Common.GetView(grid)
                //                  contentPruvodce.resultRows.forEach(function (meta) {
                //                      var aktRadek = view.findByKey(meta.ixp as any);
                //                      if (typeof aktRadek!=="undefined")
                //                          aktRadek.checked = true;
                //                  });
                //                  grid.ggrid("refreshRows");
                //              }
                //          }
                //        }
                //        , { selectedRows: doklady })
                //        ;        
                //}
                /**
                 * Hromadne operace
                 *
                 * function HromadneOperace
                 *
                 *
                 *
                 */
                function HromadneOperace(content, typOperace) {
                    if (content.closed)
                        return;
                    var grid = GetGrid(content);
                    if (grid === null)
                        return;
                    // zjisteni oznacenych radku
                    let oznaceneRadky = Gordic.Eko.Grid.checkedRows(grid, false);
                    // definice akce detail
                    var gridActionDetail = new GAction($.extend(true, Gordic.Eko.Action.actionDetail({
                        run: function (ev, ctx) {
                            const cnt = $.content(ev.target);
                            const $grid = $(ctx.grid);
                            if ($grid != null) {
                                // dohledání aktuálního záznamu a zobrazení detailu
                                const aktRadek = $grid.ggrid("activeRow");
                                if (aktRadek && !(aktRadek instanceof jQuery))
                                    Gordic.Uct.WebClient.ZobrazDetailDleIXP({ content: cnt, newMode: content.debugMode, ixp: aktRadek.ixp, samostaneOkno: false, editace: false, ixpDen: aktRadek.ixp_den, polozky: false });
                                //Gordic.Uct.WebClient.ZobrazDetailDleIXPOld(cnt, aktRadek.ixp as any, false, false, void 0, void 0, aktRadek.ixp_den as any);
                                //ZobrazDetail(cnt, aktRadek)
                            }
                        },
                        enabled: true
                    }), { name: "actDetail" }));
                    if (oznaceneRadky === null || oznaceneRadky === undefined || oznaceneRadky.length == 0) {
                        content.dialogs.alert("jres:30250035", //RC 30250035 : Upozornění
                        "jres:30250334"); //RC 30250334 : Nenalezeny žádné označené řádky
                        return;
                    }
                    //let operace: string; 
                    switch (typOperace) {
                        case 1 /* Interface.GEUctHromadneOperace.Preevidence */:
                            HromadnaAkciRun(content, oznaceneRadky, {
                                action: 1 /* Gordic.Uct.Interface.GEUctHromadneOperace.Preevidence */,
                                IDSestavy: 12,
                                actioName: "jres:30250783", //RC 30250783 : Přeevidovat
                                description: "jres:30250782", //RC 30250782 : Akce provede přeevidenci vybraných dokladů do jiné knihy. Při přeevidenci je možné změnit Zpracovatele, případně Kompetenta.
                                serverParameterMethod: "Gordic.Uct.WebClient.GUctPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                                tema: "wfl_ptm_hromprk",
                                title: "jres:30250781", //RC 30250781 : Přeevidence
                                titleBreadCrumb: "jres:30250780" //RC 30250780 : Přeevidence
                            }, gridActionDetail);
                            //Preevidovat(content, oznaceneRadky as any, gridActionDetail);
                            return;
                        case 0 /* Interface.GEUctHromadneOperace.Prevzeti */:
                            HromadnaAkciRun(content, oznaceneRadky, {
                                action: 0 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prevzeti */,
                                IDSestavy: 0,
                                actioName: "jres:30250788", //RC 30250788 : Převzít
                                description: "jres:30250789", //RC 30250789 : Akce provede převzetí vybraných (zaškrtnutých) dokladů od jiného zpracovatele. Při převzetí je případně možné změnit Kompetenta dokladu.
                                serverParameterMethod: "",
                                tema: "wfl_ptm_hromprd",
                                title: "jres:30250790", //RC 30250790 : Převzít
                                titleBreadCrumb: "jres:30250791" //RC 30250791 : Převzít
                            }, gridActionDetail);
                            //Prevzit(content, oznaceneRadky as any, gridActionDetail);
                            return;
                        case 2 /* Interface.GEUctHromadneOperace.Prouctovani */:
                            Zauctovat(content, oznaceneRadky, gridActionDetail);
                            return;
                        case 3 /* Interface.GEUctHromadneOperace.Uzavreni */:
                            Uzavrit(content, oznaceneRadky, gridActionDetail);
                            return;
                        case 6 /* Interface.GEUctHromadneOperace.Prideleni */:
                            HromadnaAkciRun(content, oznaceneRadky, {
                                action: 6 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prideleni */,
                                IDSestavy: 0,
                                actioName: "jres:30250792", //RC 30250792 : Přidělit
                                description: "jres:30250793", //RC 30250793 : Přidělit doklady jiné funkci
                                serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                                tema: "wfl_ptm_hromprd",
                                title: "jres:30250794", //RC 30250794 : Přidělit
                                titleBreadCrumb: "jres:30250794" //RC 30250794 : Přidělit
                            }, gridActionDetail);
                            //Pridelit(content, oznaceneRadky as any, gridActionDetail);
                            return;
                        case 7 /* Interface.GEUctHromadneOperace.Predani */:
                            HromadnaAkciRun(content, oznaceneRadky, {
                                action: 7 /* Gordic.Uct.Interface.GEUctHromadneOperace.Predani */,
                                IDSestavy: 22,
                                actioName: "jres:30250784", //RC 30250784 : Předat
                                description: "jres:30250785", //RC 30250785 : Akce provede předání vybraných (zaškrtnutých) dokladů jinému zpracovateli. Při předání je případně možné změnit Kompetenta dokladu.
                                serverParameterMethod: "Gordic.Uct.WebClient.GUctPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                                tema: "wfl_ptm_hromprd",
                                title: "jres:30250786", //RC 30250786 : Předání
                                titleBreadCrumb: "jres:30250787" //RC 30250787 : Předání
                            }, gridActionDetail);
                            //Predat(content, oznaceneRadky as any, gridActionDetail);
                            return;
                        case 8 /* Interface.GEUctHromadneOperace.KontrolaMetadat */:
                            Gordic.Eko.Utils.KontrolaMetadat({ content: content, listIxp: oznaceneRadky.map((row) => row.ixp), detailAkce: ZobrazDetailIxp });
                            return;
                        default:
                            content.dialogs.alert("jres:30250035", //RC 30250035 : Upozornění
                            "jres:30250374"); //RC 30250374 : Neznámá operace
                            return;
                    }
                }
                Seznam.HromadneOperace = HromadneOperace;
                /**
                     * Spusteni hromadne operace
                     * @param content
                     * @param selectedRows
                     * @param detailAkce
                 */
                function HromadnaAkciRun(content, selectedRows, nastaveni, detailAkce) {
                    var that = content;
                    let cntWiz;
                    var actTiskHromadnaAkce = new GAction({
                        name: "actSelect", visible: false,
                        caption: "", run: function () { }
                    });
                    if (nastaveni.IDSestavy > 0) {
                        actTiskHromadnaAkce = Gordic.Eko.Action.actionTisk({
                            name: "actTiskHromadnaAkce",
                            tema: nastaveni.tema,
                            serverParameterMethod: nastaveni.serverParameterMethod,
                            enabled: true,
                            favorite: false,
                            visible: nastaveni.IDSestavy != 0,
                            parentContent: that,
                            reportStarting: function (rep) {
                                console.log(cntWiz);
                                let wiz = cntWiz.find(".ggrid")[0];
                                let $grid = $(wiz);
                                var seznam = Gordic.Eko.Grid.checkedRows($grid, true);
                                var def = $.Deferred();
                                WebClient.HromadnaOperaceGetParam(that.dialogs, cntWiz, seznam)
                                    /*hat.getParamPreevid(that, cntWiz, seznam)*/ .then((result) => {
                                    rep.customDto = { Tema: rep.tema, IDSestavy: nastaveni.IDSestavy, SeznamPidu: seznam, Data: result };
                                    def.resolve(rep);
                                    return;
                                });
                                //getParamPredat(that, cntWiz, seznam).done((result) => {
                                //    rep.customDto = { Tema: rep.tema, IDSestavy: 22, SeznamPidu: seznam, Data: result };
                                //    def.resolve(rep);
                                //    return;
                                //})
                                return def.promise();
                            }
                        });
                    }
                    let modelData = { duvod: void 0, ixs_fun_akt: "", ixs_su: "", ixs_ref: "", cis_real: "", ixs_fun_vyriz: "", ixp_den: "", subrada: null };
                    let formParams = WebClient.HromadnaOperaceform(nastaveni.action, content, content.ekoBook.ixp_den);
                    //PredatForm(content, that.IxsSu, getIxpDen(that) ? getIxpDen(that) : undefined);
                    cntWiz = that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        // titulek v breadcrumbu
                        title: nastaveni.title, //RC 30250684 : Předání
                        // formát gridu
                        gridFormat: createGridFormatHromadneOperace(),
                        // primární klíč dat v gridu
                        keys: "ixp",
                        // data pro grid (pro první krok)
                        data: SetDataSelected(selectedRows), //LoadData(content.isl.UctDoklad.validovatProPredat({ Seznam: selectedRows as Gordic.Uct.Interface.GUctVybranyDokladDto[] })),// selectedRows as Gordic.Uct.Interface.GUctVybranyDokladDto[],//LoadDataPredat(content, selectedRows as Gordic.Uct.Interface.GUctVybranyDokladDto[]),
                        // typ indikátorů nad gridem (KPI nebo badge)
                        indicatorType: "KPI",
                        // první krok - zadání parametrů a kontrola, při přechodu na další krok se zavolá spuštění vlastní operace
                        firstStep: {
                            // název kroku
                            title: "jres:30250776", //RC 30250776 : Zadání
                            // popis operace
                            description: nastaveni.description, //RC 30250649 : Akce provede předání vybraných (zaškrtnutých) dokladů jinému zpracovateli. Při předání je případně možné změnit Kompetenta dokladu.
                            // nad gridem zobrazit KPI/badge s počty záznamů
                            showIndicator: true,
                            // formulář s parametry
                            form: formParams,
                            // model pro parametry
                            modelData: modelData,
                            // nadpis tabu s parametry
                            //formTabTitle: "Parametry storna",
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250777", //RC 30250777 : Vybrané doklady
                            // obsluha změny parametru
                            fieldChangeDelegate: void 0,
                            // akce pro spusteni kontrolu uzivatelem
                            checkAction: (model, data) => {
                                modelData = model;
                                return content.isl.UctDoklad.hromadneOperaceValidace({
                                    akce: nastaveni.action,
                                    Seznam: data,
                                    IxpDenNew: model.ixp_den,
                                    IxsFunNew: model.ixs_fun_akt,
                                    IxsRefNew: model.ixs_ref,
                                    CisReal: model.cis_real
                                }).getData();
                            },
                            // název akce, která provede požadovanou operaci (tlačítko vpravo dole)
                            nextActionName: nastaveni.actioName, //RC 30250650 : Předat
                            // metoda volaná při přechodu na další krok (provedení vlastní operace) (pracuje nad daty ze vstupu, vrací aktuální data z databáze + výsledek operace)
                            nextAction: (model, data) => {
                                modelData = model;
                                return that.isl.UctDoklad.hromadneOperace({
                                    akce: nastaveni.action,
                                    Seznam: data,
                                    Duvod: modelData.duvod,
                                    IxsFunNew: modelData.ixs_fun_akt,
                                    ixpDen: getIxpDen(that),
                                    IxsSu: modelData.ixs_su,
                                    CisReal: modelData.cis_real,
                                    IxpDenNew: modelData.ixp_den,
                                    IxsRefNew: modelData.ixs_ref,
                                    IxsFunVyriz: modelData.ixs_fun_vyriz
                                })
                                    .get()
                                    .then(function (returnData) {
                                    //content.showFlash({ label: "jres:30250647" }) //RC 30250647 : Akce provedena
                                    return returnData.data;
                                });
                            },
                            // akce na tabu s gridem
                            menuGridBar: [
                                {
                                    // detail
                                    favorite: true,
                                    action: detailAkce
                                },
                                {
                                    // detail
                                    favorite: true,
                                    action: actTiskHromadnaAkce
                                },
                            ],
                            // akce volaná na dvojklik v gridu
                            defaultAction: detailAkce
                        },
                        // druhý (poslední) krok - zobrazení výsledku operace
                        lastStep: {
                            // název kroku
                            title: "jres:30250778", //RC 30250778 : Výsledek
                            // formulář s parametry
                            form: formParams,
                            // model pro parametry
                            modelData: () => { return modelData; },
                            // nadpis tabu s parametry
                            //formTabTitle: "Parametry storna",
                            // parametry jsou v tomto kroku již needitovatelné
                            enableFormFields: false,
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250779", //RC 30250779 : Zpracované doklady
                            // akce na tabu s gridem
                            menuGridBar: [
                                {
                                    // detail
                                    favorite: true,
                                    action: detailAkce
                                },
                            ],
                            // akce volaná na dvojklik v gridu
                            defaultAction: detailAkce
                        },
                        // obsluha úspěšného ukončení průvodce (na rozdíl od zrušení průvodce přeselektovává seznam)
                        completeDelegate: (view) => {
                            refreshRowsFromDB(content, view.getDataRows(false));
                        },
                        // obsluha zrušení průvodce
                        cancelDelegate: () => {
                            //FucGrid.wizardEnd(that, ikc, false);
                        },
                    }, {
                        title: nastaveni.titleBreadCrumb,
                    });
                    cntWiz.trigger("focus");
                }
                /**
                *  Definice sloupcu
                * createColumns
                *
                * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctselectedRowsDto>}
                */
                function createGridFormatHromadneOperace(result = false, withResultAtributs = true) {
                    var columns = new Gordic.Data.GridFormat()
                        .addPid()
                        .addAgendoveCislo()
                        .addEvidencniCislo()
                        .addDruhDokladu()
                        .addRok()
                        .addMesic()
                        .addDen()
                        .addCisloDokladu({ name: "ac_ixe", field: "ac_ixe" })
                        .addTypDokladu({ name: "ktgTypNazev", field: "ktgTypNazev" })
                        .addStavDokladu({ name: "stav_txt", field: "stav_txt" })
                        .addCastka({ name: "c", field: "c" })
                        .addMD({ fragment: "c0" /* Interface.GUctSeznamDokladuDtoFragments.c0 */ })
                        .addDal({ fragment: "c1" /* Interface.GUctSeznamDokladuDtoFragments.c1 */ })
                        .addZpracovatel({ name: "ixs_fun_nazev", field: "ixs_fun_nazev", fragment: "ixs_fun_nazev" /* Interface.GUctSeznamDokladuDtoFragments.ixs_fun_nazev */ })
                        .addPopis();
                    return columns;
                }
                Seznam.createGridFormatHromadneOperace = createGridFormatHromadneOperace;
                /**
                 * Nacteni dokladu k prevzeti
                 * @param content
                 * @param selectedRows
                 */
                function LoadData(taskList) {
                    //let defClose = $.Deferred();
                    //let taskList2: Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<any>>;
                    return taskList
                        .getData()
                        .then(function (resultRows) {
                        //return defClose.resolve(resultRows);
                        return resultRows;
                    }
                    //,
                    //function () {
                    //    return $.Deferred().reject();                    
                    //}
                    );
                    //return defClose.promise();
                }
                /**
                 * Oznaceni dokladu
                 * @param content
                 * @param selectedRows
                 */
                function SetDataSelected(selectedRows) {
                    selectedRows.forEach((row) => { row["wiz_check"] = true; });
                    return $.Deferred().resolve(selectedRows).promise();
                }
                /**
                 * Obcerstveni neaktivni radku
                 * @param content
                 * @returns
                 */
                function refreshRows(content) {
                    if (typeof content === "undefined" || content === null)
                        content = GetContentSeznam();
                    // test na existenci contentu a zda neni uzavren
                    if (content === null || content.closed)
                        return $.Deferred().reject().promise();
                    // test na radky k aktualizace
                    if (content.refreshRows.length === 0)
                        return $.Deferred().resolve().promise();
                    let result = refreshRowsFromDB(content, content.refreshRows);
                    result.then(() => content.refreshRows = []);
                    return result;
                }
                Seznam.refreshRows = refreshRows;
                /**
                 * Aktualizace zaslanych zapisu z DB do gridu
                 * @param content
                 * @param doklady
                 */
                function refreshRowsFromDB(content, doklady) {
                    // kontroly
                    if (!doklady || doklady.length == 0)
                        return $.Deferred().reject().promise();
                    if (typeof content === "undefined" || content === null)
                        content = GetContentSeznam();
                    if (content === null || content.closed)
                        return $.Deferred().reject().promise();
                    // zjisteni gridu
                    let grid = GetGrid(content);
                    if (grid == null)
                        return $.Deferred().resolve().promise();
                    // zjisteni view
                    let view = Gordic.Eko.WebClient.Common.GetView(grid);
                    if (view == null)
                        return $.Deferred().resolve().promise();
                    // prekopirovani pidu ze zaslanych radku do pole
                    let poleIxp = doklady.map((radek) => radek.ixp);
                    //return ReloadRowFromDB(content, poleIxp);
                    return view.requestData({ filters: { ixp: { o: "IN", v: poleIxp } } }, { updateMode: "update" }).then(() => {
                        if (!content.closed)
                            GetGrid(content)?.ggrid("activeRow", { ixp: doklady[0].ixp });
                        return;
                    });
                }
                Seznam.refreshRowsFromDB = refreshRowsFromDB;
                /**
                 * Akce uzavrit doklady
                 * @param content
                 * @param selectedRows
                 * @param detailAkce
                 */
                function Uzavrit(content, selectedRows, detailAkce) {
                    var that = content;
                    that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        // titulek v breadcrumbu
                        title: "jres:30250578", //RC 30250578 : Uzavřít
                        // formát gridu
                        gridFormat: createGridFormatHromadneOperace(), //Gordic.Uct.WebClient.Pruvodce.createColumns(false, false),
                        // primární klíč dat v gridu
                        keys: "ixp",
                        // data pro grid (pro první krok)
                        data: SetDataSelected(selectedRows),
                        //LoadData(content.isl.UctDoklad.validovatProUzavreni({ Seznam: selectedRows  })),
                        // typ indikátorů nad gridem (KPI nebo badge)
                        indicatorType: "KPI",
                        // první krok - zadání parametrů a kontrola, při přechodu na další krok se zavolá spuštění vlastní operace
                        firstStep: {
                            // název kroku
                            title: "jres:30250575", //RC 30250575 : Zadání
                            // popis operace
                            description: "jres:30250577", //RC 30250577 : Uzavření dokladů. S uzavřenými doklady již nejde dále pracovat
                            // nad gridem zobrazit KPI/badge s počty záznamů
                            showIndicator: true,
                            // formulář s parametry
                            //form: formParams,
                            // model pro parametry
                            //modelData: modelData,
                            // nadpis tabu s parametry
                            //formTabTitle: "Parametry storna",
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250570", //RC 30250570 : Vybrané doklady
                            // obsluha změny parametru
                            fieldChangeDelegate: void 0,
                            // akce pro spusteni kontroly uzivatelem
                            checkAction: (model, data) => {
                                return LoadData(content.isl.UctDoklad.validovatProUzavreni({ Seznam: data }));
                            },
                            // název akce, která provede požadovanou operaci (tlačítko vpravo dole)
                            nextActionName: "jres:30250578", //RC 30250578 : Uzavřít
                            // metoda volaná při přechodu na další krok (provedení vlastní operace) (pracuje nad daty ze vstupu, vrací aktuální data z databáze + výsledek operace)
                            nextAction: (model, data) => {
                                //modelData = model;
                                return that.isl.UctDoklad.hromadneUzavrit({ Seznam: data })
                                    .get()
                                    .then(function (returnData) {
                                    return returnData;
                                });
                            },
                            // akce na tabu s gridem
                            menuGridBar: [
                                {
                                    // detail
                                    favorite: true,
                                    action: detailAkce
                                },
                            ],
                            // akce volaná na dvojklik v gridu
                            defaultAction: detailAkce
                        },
                        // druhý (poslední) krok - zobrazení výsledku operace
                        lastStep: {
                            // název kroku
                            title: "jres:30250573", //RC 30250573 : Výsledek
                            // parametry jsou v tomto kroku již needitovatelné
                            enableFormFields: false,
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250579", //RC 30250579 : Zpracované doklady
                        },
                        // obsluha úspěšného ukončení průvodce (na rozdíl od zrušení průvodce přeselektovává seznam)
                        completeDelegate: (view) => {
                            refreshRowsFromDB(content, view.getDataRows(false));
                            //FucGrid.wizardEnd(that, ikc, true, { methodCalledIfSuccess: () => { that.nacteniSeznamu(); } });
                        },
                        // obsluha zrušení průvodce
                        cancelDelegate: () => {
                            //FucGrid.wizardEnd(that, ikc, false);
                        },
                    }, {
                        // titulek v breadcrumbu
                        title: "jres:30250578", //RC 30250578 : Uzavřít
                    });
                    //})
                    //.always(function () { content!.endOperation(); })
                    //;
                }
                /**
                 * Parametry pro zauctovat
                 *
                 * */
                function getFormParamZauctovat(content, opravnyDoklad) {
                    let that = content;
                    let x;
                    var def = $.Deferred();
                    that.beginOperation();
                    EKOUtils.CallRemoteService(that, "PredvolbyZauctovani", {}, "Gordic.Uct.WebClient.GUctHromadneZauctovani")
                        .then(function (result) {
                        //that.nastaveni = result;
                        let form = new Gordic.Forms.Form({ name: "formular", layoutDescriptor: "L1M1S1, L-5-5-2, M-5-5-2, S-12-12-0" });
                        form.addRow();
                        //.addSection("Pokračovat ve zpracování, když nastane nesrovnalost:");
                        //var predvolby = false;
                        result.forEach((polozka) => {
                            if (polozka.TypHodnoty === 0 /* Gordic.Uct.Interface.GEUctTypPolicek.Check */) {
                                //form.addRow("").addField("gcheck", {
                                //    name: polozka.Name,
                                //    label: polozka.Describe,
                                //    model: polozka.Name + "=value",
                                //    initialValue: typeof polozka.Value !== "undefined" && polozka.Value !== 0
                                //})
                            }
                            else if (polozka.TypHodnoty === 1 /* Gordic.Uct.Interface.GEUctTypPolicek.List */) {
                                //predvolby = true;
                                if (polozka.ID == 150 && opravnyDoklad) {
                                    // vyplneni pole stavu a dohledeni vybrane hodnoty
                                    var idStav = 0;
                                    var stavy = [];
                                    polozka.Volby.forEach((item, index) => {
                                        let s = { text: item.Name };
                                        s[polozka.Name] = item.Id;
                                        stavy.push(s);
                                        if (item.Id == polozka.Value) {
                                            idStav = index;
                                            return;
                                        }
                                    });
                                    // seznam
                                    form.addRow(polozka.Describe).addField("gselectbox", {
                                        name: polozka.Name,
                                        dropdown: true, multi: false, list: false, itemWidth: "",
                                        itemTemplate: "{text}",
                                        initialValue: stavy[idStav],
                                        helperColumns: ["text"],
                                        model: "model." + polozka.Name + "=value." + polozka.Name,
                                        data: new Gordic.Data.View(stavy, { key: polozka.Name }),
                                    });
                                    form.addRow();
                                }
                            }
                            that.endOperation();
                        });
                        return def.resolve(form);
                    })
                        .always(() => { that.endOperation(); });
                    return def.promise();
                }
                /**
                 * Akce Zauctovat dokladu
                 * @param content
                 * @param selectedRows
                 * @param detailAkce
                 */
                function Zauctovat(content, selectedRows, detailAkce) {
                    var that = content;
                    ;
                    // Obsahuje seznam opravny doklad     
                    let opravnyDoklad = typeof selectedRows.find((item) => (item.ktg_typ === 1010 || item.ktg_typ === 1011)) !== "undefined";
                    getFormParamZauctovat(content, opravnyDoklad)
                        .then((form) => {
                        let modelData = { ixp_den: "", ixs_fun_akt: "", ixs_ref: "" };
                        that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                            // titulek v breadcrumbu
                            title: "jres:30250800", //RC 30250800 : Účtování
                            // formát gridu
                            gridFormat: createGridFormatHromadneOperace(), //Gordic.Uct.WebClient.Pruvodce.createColumns(false, false),
                            // primární klíč dat v gridu
                            keys: "ixp",
                            // data pro grid (pro první krok)
                            data: SetDataSelected(selectedRows),
                            //LoadData(content.isl.UctDoklad.validovatProZauctovani({ Seznam: selectedRows })),
                            //LoadDataProuctovat(content, selectedRows as Gordic.Uct.Interface.GUctVybranyDokladDto[]),
                            // typ indikátorů nad gridem (KPI nebo badge)
                            indicatorType: "KPI",
                            // první krok - zadání parametrů a kontrola, při přechodu na další krok se zavolá spuštění vlastní operace
                            firstStep: {
                                // název kroku
                                title: "jres:30250575", //RC 30250575 : Zadání
                                // popis operace
                                description: "jres:30250583", //RC 30250583 : Proúčtování dokladů do účetního deníku.
                                // nad gridem zobrazit KPI/badge s počty záznamů
                                showIndicator: true,
                                // formulář s parametry
                                form: form, //getFormParamZauctovat(content),
                                // model pro parametry
                                modelData: modelData,
                                // nadpis tabu s parametry
                                formTabTitle: "jres:30250584", //RC 30250584 : Parametry
                                // nadpis tabu s gridem
                                gridTabTitle: "jres:30250570", //RC 30250570 : Vybrané doklady
                                // obsluha změny parametru
                                fieldChangeDelegate: void 0,
                                // akce pro spusteni kontrolu uzivatelem
                                checkAction: (model, data) => {
                                    return LoadData(content.isl.UctDoklad.validovatProZauctovani({ Seznam: data }));
                                    //return LoadDataProuctovat(content, data);
                                },
                                // název akce, která provede požadovanou operaci (tlačítko vpravo dole)
                                nextActionName: "jres:30250801", //RC 30250801 : Zaúčtovat
                                // metoda volaná při přechodu na další krok (provedení vlastní operace) (pracuje nad daty ze vstupu, vrací aktuální data z databáze + výsledek operace)
                                nextAction: (model, data) => {
                                    modelData = model;
                                    let rq = { Seznam: data };
                                    //rq.Nastaveni = this.nastaveni.Nastaveni;
                                    rq.StavUhradyPrimDokladu = modelData["StavUhradyPrimDokladu"];
                                    rq.StavZauctovaniPrimDokladu = modelData["StavZauctovaniPrimDokladu"];
                                    //rq.UkoncitVPripadeChyby = modelData.UkoncitVPripadeChyby;
                                    //var inputParams: Gordic.Uct.Interface.GUctDokladZauctovatHromadneRequestDto = {
                                    //    Seznam: data, IxpDenNew: modelData.ixp_den, IxsFunNew: modelData.ixs_fun_akt, IxsRefNew: modelData.ixs_ref
                                    //};
                                    return that.isl.UctDoklad.hromadneZauctovat({ rq: rq })
                                        .get()
                                        .then(function (returnData) {
                                        return returnData;
                                    })
                                        .catch((error) => {
                                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(content, error);
                                        returnMessage
                                            //let transMsg = transMsgTst as Eko.Interface.GTransferMessage[];
                                            //Gordic.Eko.WebClient.Common.ZpracovaniZprav(content, transMsg, 0, null as any, ExtendConditionsSchvaleni as any)
                                            .then(function (returnValue) {
                                            if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                                content.endOperation();
                                                return $.Deferred().reject();
                                            }
                                            else {
                                                content.endOperation();
                                                return $.Deferred().resolve();
                                            }
                                        })
                                            .always(function () {
                                            content.endOperation();
                                        });
                                        throw error;
                                    });
                                },
                                // akce na tabu s gridem
                                menuGridBar: [
                                    {
                                        // detail
                                        favorite: true,
                                        action: detailAkce
                                    },
                                ],
                                // akce volaná na dvojklik v gridu
                                defaultAction: detailAkce
                            },
                            // druhý (poslední) krok - zobrazení výsledku operace
                            lastStep: {
                                // název kroku
                                title: "jres:30250573", //RC 30250573 : Výsledek
                                // parametry jsou v tomto kroku již needitovatelné
                                enableFormFields: false,
                                // nadpis tabu s gridem
                                gridTabTitle: "jres:30250579", //RC 30250579 : Zpracované doklady
                            },
                            // obsluha úspěšného ukončení průvodce (na rozdíl od zrušení průvodce přeselektovává seznam)
                            completeDelegate: (view) => {
                                refreshRowsFromDB(content, view.getDataRows(false));
                                //FucGrid.wizardEnd(that, ikc, true, { methodCalledIfSuccess: () => { that.nacteniSeznamu(); } });
                            },
                            // obsluha zrušení průvodce
                            cancelDelegate: () => {
                                //FucGrid.wizardEnd(that, ikc, false);
                            },
                        }, {
                            // titulek v breadcrumbu
                            title: "jres:30250582", //RC 30250582 : Proúčtovat
                        });
                        return;
                    });
                }
                /**
                 *  Aktualizace konkretnich radku
                 *
                 * function refresRow
                 *
                 * @param {GContent} content
                 * @param {Gordic.Eko.Interface.GUctSeznamDokladuDto[]} doklady
                 */
                function refresRow(content, doklady) {
                    doklady.forEach((radek, index) => {
                        if (radek.ResultOperation === 200 /* Interface.GEResultOperation.Success */) {
                            let radekAkt = Gordic.Uct.WebClient.Seznam.NajdiRadek(radek.ixp);
                            radekAkt.s_zau = radek.s_zau;
                            radekAkt.stav_txt = radek.stav_txt;
                            radekAkt.stav = radek.stav;
                            Gordic.Uct.WebClient.Seznam.ReplaceRow(content, radekAkt, true);
                        }
                    });
                    //Gordic.Uct.WebClient.Seznam.ReplaceRow(content, radekAkt, true)
                }
                /**
                 *  Vytvoreni gridformatu
                 * export function createdGridFormat
                 *
                 * @param {GContent} content
                 * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamDokladuDto>}
                 */
                function createdGridFormat(content, param) {
                    var gridFormat = new Gordic.Data.GridFormat()
                        //Eko.Grid.getListWflColumns(true) 
                        .addWflColumns()
                        .addTypEntity({ fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.typ_entity_ico */ })
                        .addVlastnictvi({ fragment: "vlastnictvi" /* Interface.GUctSeznamDokladuDtoFragments.vlastnictvi */ })
                        // priznak precteno
                        .addPrecteno()
                        // priznak preevidence
                        .addPreevidence({ fragment: "preevidence" /* Interface.GUctSeznamDokladuDtoFragments.preevidence */ })
                        //Eko.Interface.GWflForEkoDtoNames.el_prilohy_pocet
                        // pocet el. priloh
                        //.addPocetElPriloh({ name: "el_prilohy_pocet", field: "el_prilohy_pocet", fragment: Eko.Interface.GWflForEkoDtoFragments.el_prilohy_pocet })
                        //.addPocetElPriloh({ name: "poc_epri", field: "poc_epri", fragment: Interface.GUctSeznamDokladuDtoFragments.poc_epri })
                        // elektornicky obraz
                        .addElObraz({ fragment: "el_obraz" /* Interface.GUctSeznamDokladuDtoFragments.el_obraz_typ */ })
                        // Kontroly
                        // stav financni kontroly
                        .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavFKColumn())
                        // Experimentální light - stav financni kontroly
                        //.addIconColumn(Gordic.Wfl.Globals.ListSupport.StavFKLColumn())
                        // stav ucetni kontroly;
                        .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavUKColumn())
                        // stav schvalovaciho procesu
                        .addStavEkoSchvalColumn()
                        //.addIconColumn(Gordic.Wfl.Globals.ListSupport.UzoColumn(undefined, (row) => { debugger; return true; }, undefined, undefined, undefined,))
                        .addBarevneOznaceni({ fragment: "wfl_uzo" /* Interface.GUctSeznamDokladuDtoFragments.uzo */ }, void 0, void 0, (row) => row.ixs_fun_akt != $.content("main").IxsFunAkt, content.globalSettings);
                    //Gordic.Eko.Grid.Column.addWflColumns(gridFormat);     
                    //return row.ixs_fun_akt != ($.content("main") as any).IxsFunAkt; }, undefined, undefined, undefined));
                    //Gordic.Eko.Grid.Column.addWflColumns(gridFormat, void 0, void 0, void 0, void 0);
                    if (content != null && content.Globals.Params.PovoleniPraceSInternimDanDokladem) {
                        //gridFormat.addTextColumn({
                        //    name: "priz_euct",
                        //    caption: "jres:30250093",         //RC 30250093 : Typ dokladu
                        //    width: 49,// fixedWidth: true,
                        //    customClass: "center",
                        //    fragment: Interface.GUctSeznamDokladuDtoFragments.priz_euct,
                        //    cellTemplate: function (data, metarow, info) {
                        //        if (data.priz_euct === 1) {
                        //            let toolTip = "jres:30250377" //RC 30250377 : Doklad E-učetnictví
                        //            return "<span title='" + toolTip + "'>EUC</span>";
                        //        }
                        //        else {
                        //            return "";                
                        //        }
                        //    }
                        //});
                        gridFormat.addIconColumn({
                            name: "int_dok",
                            caption: "jres:30250635", //RC 30250635 : Interní daňový doklad
                            //description:"jres:30250635", //RC 30250635 : Interní daňový doklad
                            width: 49, // fixedWidth: true,
                            customClass: "center",
                            fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.int_dok */,
                            //cellTemplate: function (data, metarow, info) {
                            //    if (data.int_dok === 1) {
                            //        let toolTip = "jres:30250350" //RC 30250350 : Interní daňový doklad
                            //        return "<span title='" + toolTip + "'>ANO</span>";
                            //    }
                            //    else {
                            //        return "";
                            //    }
                            //}
                            iconTemplate: function (data, meta) {
                                if (data.int_dok === 1)
                                    return { icon: "fa-info-circle g-state-text fa-fw grid-cell-icon", text: "jres:30250350" }; //RC 30250350 : Interní daňový doklad
                                else
                                    return null;
                            }
                        });
                    }
                    gridFormat.addPid({ fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.ixp */ })
                        .addAgendoveCislo({ fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.ac_ag */ } /*{ sortOrderDesc: Gordic.Data.Sorting. }*/)
                        .addEvidencniCislo({ fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.ac */ })
                        .addKniha({ name: "kniha", field: "kniha", fragment: "kniha" /* Interface.GUctSeznamDokladuDtoFragments.kniha */ })
                        //.addTextColumn({ name: "smlouva", description:"Název knihy, ve které je doklad aktuálné evidován" })
                        .addDruhDokladu({ fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.drd */ })
                        //.addNumberColumn({
                        //    name: "rok",
                        //    caption: "Rok", //RC 30250689 : Stav dokladu (číslo)
                        //    fragment: Interface.GUctSeznamDokladuDtoFragments.rok,
                        //    width: 60,
                        //})
                        .addRok({ fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.rok */ })
                        .addMesic({ fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.mesic */ })
                        .addDen({ fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.den */ })
                        .addCisloDokladu({ fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.ac_ixe */ })
                        .addTypDokladu({ name: "ktgTypNazev", field: "ktgTypNazev", fragment: "ktgTypNazev" /* Interface.GUctSeznamDokladuDtoFragments.ktgTypNazev */ })
                        .addStavDokladu({ name: "stav_txt", field: "stav_txt", fragment: "stav_txt" /* Interface.GUctSeznamDokladuDtoFragments.stav_txt */ })
                        // pomocne sloupce pro podminene formatovani
                        .addNumberColumn({
                        name: "priz_view",
                        caption: "jres:30250687", //RC 30250687 : Přečteno
                        hidden: true,
                        fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.priz_view */,
                        width: 60,
                    })
                        .addNumberColumn({
                        name: "ktg_typ",
                        caption: "jres:30250773", //RC 30250773 : Kategorie dokladu
                        fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.ktg_typ */,
                        hidden: true,
                        width: 60,
                    })
                        .addNumberColumn({
                        name: "stav",
                        caption: "jres:30250689", //RC 30250689 : Stav dokladu (číslo)
                        fragment: "stav" /* Interface.GUctSeznamDokladuDtoFragments.stav */,
                        hidden: true,
                        width: 60,
                    })
                        .addNumberColumn({
                        name: "preevidovano",
                        caption: "jres:30250693", //RC 30250693 : Přeevidované doklady
                        fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.preevidovano */,
                        hidden: true,
                        width: 60,
                    })
                        .addCastka({ name: "c", field: "c", fragment: "all" /* Interface.GUctSeznamDokladuDtoFragments.c */, })
                        .addMD({ fragment: "c0" /* Interface.GUctSeznamDokladuDtoFragments.c0 */ })
                        .addDal({ fragment: "c1" /* Interface.GUctSeznamDokladuDtoFragments.c1 */ })
                        .addZpracovatel({ name: "ixs_fun_nazev", field: "ixs_fun_nazev", fragment: "ixs_fun_nazev" /* Interface.GUctSeznamDokladuDtoFragments.ixs_fun_nazev */ })
                        .addPopis({ fragment: "popis" /* Interface.GUctSeznamDokladuDtoFragments.popis */ });
                    //let param: Gordic.Ssl.Interface.GDokumentGetColumnParamsResponseDto = {};
                    //Gordic.Ssl.WebClient.GDokumentIsl.AddGridColumns(gridFormat);
                    let scopeDokument = extendScope(undefined, "dokument" /* Interface.GUctSeznamDokladuDtoFragments.dokument */, "jres:30250829", //RC 30250829 : Dokument
                    "");
                    if (param != null)
                        Gordic.Ssl.WebClient.GDokumentIsl.AddGridColumnsImmediate(param, gridFormat, Seznam.presetDokumentColumns, {
                            scopeLevels: scopeDokument
                        });
                    let scopeVlastnosti = extendScope(undefined, "vlastnost" /* Uct.Interface.GRozSeznamDokladuDtoFragments.vlastnosti */, "jres:30250856");
                    if (content.ixsTypy) {
                        let scoV = scopeVlastnosti.map(i => i.scope).join(Gordic.Gin.WebClient.GSharedIsl.NameSeparator);
                        let scoVT = scopeVlastnosti.map(i => i?.scopeTitle).filter(i => i?.trim()).join(" - ");
                        let sxsTyp = [{ sxs: null, typ_obj: 434 /* Uct.Interface.GETypObjektu.KnihaUCT */ }];
                        content.ixsTypy.forEach(item => sxsTyp.push({ sxs: item, typ_obj: 680 /* Uct.Interface.GETypObjektu.TypDokumentu */ }));
                        // Rozsirene vlastnosti
                        gridFormat.add(Gordic.PopisneVlastnosti.createSxsTypGridFormat({
                            scope: scoV,
                            ixs_typ: content.ixsTypy,
                            typ_obj: [434 /* Uct.Interface.GETypObjektu.KnihaUCT */],
                            sxs_typ: sxsTyp,
                            scopeTitle: scoVT
                        }));
                    }
                    //.add(Gordic.PopisneVlastnosti.createIxsTypGridFormat("vlastnosti", ["DEMO04010101","0000040101B9"]))
                    //gridFormat.add(Gordic.PopisneVlastnosti.createGridFormat("vlastnosti"))
                    ;
                    return gridFormat;
                }
                Seznam.createdGridFormat = createdGridFormat;
                /**
                    * Přidání další úrovně do scope
                    *
                    * @param {Gin.WebClient.GScopeOptionLevel[] | undefined} scope scope
                    * @param {string} newScope nový scope
                    * @param {string} [newScopeTitleWOScope] titulek nového scope pro přidání do prázdného scope
                    * @param {string} [newScopeTitleWScope] titulek nového scope pro přidání do neprázdného scope
                    * @returns {Gin.WebClient.GScopeOptionLevel[]} výsledný scope
                    */
                function extendScope(scope, newScope, newScopeTitleWOScope, newScopeTitleWScope) {
                    // TODO: dočesat
                    let extendedScope = [];
                    let scopeLen = scope?.length || 0;
                    scope?.forEach((item, l) => {
                        if (l == scopeLen - 1 && newScopeTitleWScope)
                            extendedScope.push({ scope: item.scope });
                        else
                            extendedScope.push(item);
                    });
                    extendedScope.push({ scope: newScope, scopeTitle: (scope ? (newScopeTitleWScope ?? newScopeTitleWOScope) : newScopeTitleWOScope) });
                    return extendedScope;
                }
                Seznam.extendScope = extendScope;
                function dokumentInit() {
                    // převzato z metody AddDokumentGridColumns z Gordic.Wfl.WebClient\Gin\Wfl\Isl\GWflspidIsl.ts
                    return $.when(Gordic.Ssl.WebClient.GDokumentIsl.Init(
                    //Gordic.Wfl.WebClient.GWflspidIsl.Init(
                    Seznam.presetDokumentColumns /*"all"*/ /*Wfl.WebClient.GWflspidIslColumnsPreset.Eko()*/, 
                    // 14.09.2021 - TFeik
                    // Nepotřebuji načítat fieldy a ta u nich dám false.
                    // TODO: nemají tady být, když používám filtry?
                    //false
                    Seznam.presetDokumentFields), Gordic.Isl.Dokument.getColumnParams /*.Wflspid.getColumnParams*/().getData())
                        .then((_, columnParams) => {
                        return columnParams;
                    });
                }
                Seznam.dokumentInit = dokumentInit;
                /**
                    * Seznam akcí pro menu (hamburger nebo kontextové menu gridu)
                    *
                    * @param {boolean} contextMenu formát pro kontextové menu gridu (true (default) = ano, false = ne)
                    * @param {IGGridCellContext<Gordic.Fuc.Interface.GZapoctovyListDto> | undefined} cellContext kontext z gridu (pouze pro contextMenu = true) (default = undefinedundefined)
                    * @returns {(string | undefined)[] | (string | (string | undefined)[] | { action: GAction | undefined; primary: true; favorite: true; })[]} seznam akcí
                    */
                function getMenuActions() {
                    return ["actPodaniDokladu", "actDetailDokladu", "actUpravitDoklad", "actDetailDoZalozky",
                        "-", ["jres:30250597", "tiskKnihaUDAct", "tiskKnihaUDActVSE" //RC 30250597 : Tisk
                            ,
                            "-", "jres:30250598", "tiskKnihaUDActAG", "tiskKnihaUDActUD", "tiskKnihaUDActDU" //RC 30250598 : Tisk ÚD dle...
                            ,
                            "-", "tiskVybranychUDAct", "tiskPolozekUDAct"
                        ],
                        "-", "actOznacitPrectene", "actOznacitNeprectene"
                    ];
                }
                Seznam.getMenuActions = getMenuActions;
                /**
                 * Vrátí IXS_Fun_Akt
                 *
                 */
                function getIxsFunAkt() {
                    return $.content("main").IxsFunAkt;
                }
                Seznam.getIxsFunAkt = getIxsFunAkt;
                /**
                    * Vrátí PID aktuální knihy (nebo null pokud není zadána nebo se jde o režim přes více knih)
                    *
                    * @returns {string | null} PID aktuální knihy (nebo null pokud není zadána nebo se jde o režim přes více knih)
                    */
                function getIxpDen(content) {
                    // TODO: zůstane tato metoda?
                    return content.ekoBook?.ixp_den ?? null;
                }
                Seznam.getIxpDen = getIxpDen;
                /**
                 * Zobrazení detailu dokladu v nove zalozce prohlizece
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                function openDetailInNewTab(content) {
                    var myGrid = GetGrid(content);
                    if (myGrid !== null) {
                        // aktuální vybraná položka
                        const aktRadek = Gordic.Eko.Grid.currentRow(myGrid);
                        if (aktRadek && !(aktRadek instanceof jQuery)) {
                            // otevření detailu aktuální vybrané položky v nové záložce
                            return WebClient.openDetailInOtherTab(aktRadek.typ_ag, aktRadek.ixp);
                        }
                    }
                    return $.Deferred().reject().promise();
                }
                Seznam.openDetailInNewTab = openDetailInNewTab;
            })(Seznam = WebClient.Seznam || (WebClient.Seznam = {}));
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdFNlem5hbV9tZXRvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVWN0U2V6bmFtX21ldG9keS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBc3dEZjtBQXR3REQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc3dEbkI7SUF0d0RnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0Fzd0Q3QjtRQXR3RG9CLFdBQUEsU0FBUztZQUFDLElBQUEsTUFBTSxDQXN3RHBDO1lBdHdEOEIsV0FBQSxNQUFNO2dCQWdCakMsMkdBQTJHO2dCQUM5Riw0QkFBcUIsR0FBNkUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFBLG1CQUFtQixFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUEsY0FBYyxDQUFBLGVBQWUsQ0FBQSxlQUFlLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ3JvQixvRUFBb0U7Z0JBQ3BFLHFCQUFxQjtnQkFDckIsK0NBQStDO2dCQUNsQywyQkFBb0IsR0FBNEUsQ0FBQyx1QkFBdUIsQ0FBQSxVQUFVLEVBQUUsV0FBVyxDQUFBLG1CQUFtQixFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUEsY0FBYyxDQUFBLGVBQWUs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QUFPLFVBQUEsb0JBQW9CLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQy9ELENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDM0MsQ0FBQztnQkFaZSx5QkFBa0IscUJBWWpDLENBQUE7WUFDTCxDQUFDLEVBdHdEOEIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUFzd0RwQztRQUFELENBQUMsRUF0d0RvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzd0Q3QjtJQUFELENBQUMsRUF0d0RnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzd0RuQjtBQUFELENBQUMsRUF0d0RTLE1BQU0sS0FBTixNQUFNLFFBc3dEZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0ge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdIcm9tYWRuZU9wZXJhY2Uge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa2NlIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZVxyXG4gICAgICAgIHRlbWE6IHN0cmluZztcclxuICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IHN0cmluZztcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgYWN0aW9OYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgdGl0bGVCcmVhZENydW1iOiBzdHJpbmc7XHJcbiAgICAgICAgSURTZXN0YXZ5OiBudW1iZXI7XHJcbiAgICB9XHJcbiAgICAvLyBUT0RPOiBkb8SNYXNuw6kgLSBhxb4gYnVkZSB6YWt0dWFsaXpvdsOhbmEgdmFyaWFudGEgRWtvLCB0YWsgamkgcG91xb7DrXQgbmVibyB0b2hsZSBwxZllc3Vub3V0IGRvIEVrby5XZWJDbGllbnRcclxuICAgIGV4cG9ydCBjb25zdCBwcmVzZXREb2t1bWVudENvbHVtbnM6IC8qV2ZsLldlYkNsaWVudC5OYW1lczwqL0dvcmRpYy5Tc2wuV2ViQ2xpZW50LkdEb2t1bWVudENvbHVtbk5hbWVzW10vKj4qLyA9IFtcInBvemljZV9zcGlzX2ljb1wiLCBcIml4cF9zcGlzXCIsIFwicHJpel9zcGlzXCIvKiwgXCJpeHNfZnVuX2FrdFwiKi8sIFwiaXhzX3N1X2FrdFwiLCBcIm5hemV2XCIsIFwiYWt0X3puYWNrYVwiLCBcInN0YXZfZGlzdFwiLCBcInN0YXZfcGlzXCIvKiwgXCJ0eXBfYWdcIiovLyosIFwia3RnX3R5cFwiKi8vKiwgXCJpeHNfdHlwXCIqLywgXCJzX3ByaWpcIiwgXCJzX3NzbFwiLCBcImRhdF96bWVuYVwiLCBcInptZW51X3Byb3ZcIiwgXCJzX2VsZVwiLCBcInNfZnl6XCIsIFwic3Bpc19wbFwiLCBcInNwaXNfem5ha1wiLCBcIml4c19mdW5fd2ZsXCIsIFwiaXhzX3N1X3dmbFwiLCBcImRhdF92eXJpelwiLCBcInNfc2NodmFsXCIsIFwic2thcl96bmFrXCIsIFwic2thcl9saHV0YVwiLCBcInJva19zcG9fdWRhXCIsIFwicm9rX3NrYXJ0YWNlXCIsIFwicG9jX2xpc3R1XCIsIFwicG9jX3N0cmFuXCIsIFwicG9jX2tvcFwiLCBcInBvY19wcmlsb2hcIiwgXCJwb2NfbF9wcmlsb2hcIiwgXCJjalwiLCBcIlByaXpWQmFsaWt1XCIsIFwiaXhzX3p1cFwiLCBcIlByaXpQb3pTa2FyXCIsIC8qXCJ0eXBfZW50aXR5X2ljb1wiLCovIFwidGVjaG5pY2tlX3ZsYXN0bm9zdGlfaWNvXCJdO1xyXG4gICAgLy8gVE9ETzogdMSbbXRvIGhvZG5vdMOhbSBtdXPDrSBvZHBvdsOtZGF0IGZpbHRyeSAocyBwcmVmaXhlbSBkb2t1bWVudF8pXHJcbiAgICAvLyAxOC4wMS4yMDIyIC0gVEZlaWtcclxuICAgIC8vIFpha29tZW50b3bDoW7DrSBvZHN0cmFuxJtuw71jaCBmaWx0csWvIGRva3VtZW50dS5cclxuICAgIGV4cG9ydCBjb25zdCBwcmVzZXREb2t1bWVudEZpZWxkczogLypXZmwuV2ViQ2xpZW50Lk5hbWVzPCovR29yZGljLlNzbC5XZWJDbGllbnQuR0Rva3VtZW50RmllbGROYW1lc1tdLyo+Ki8gPSBbLypcInBvemljZV9zcGlzX2ljb1wiLCAqL1wiaXhwX3NwaXNcIiwgXCJwcml6X3NwaXNcIi8qLCBcIml4c19mdW5fYWt0XCIqLywgXCJpeHNfc3VfYWt0XCIsIFwibmF6ZXZcIiwgXCJha3Rfem5hY2thXCIsIFwic3Rhdl9kaXN0XCIsIFwic3Rhdl9waXNcIi8qLCBcInR5cF9hZ1wiKi8vKiwgXCJrdGdfdHlwXCIqLy8qLCBcIml4c190eXBcIiovLCBcInNfcHJpalwiLCBcInNfc3NsXCIsIFwiZGF0X3ptZW5hXCIsIFwiem1lbnVfcHJvdlwiLCBcInNfZWxlXCIsIFwic19meXpcIiwgXCJ1em9cIiwgXCJzcGlzX3BsXCIsIFwic3Bpc196bmFrXCIsIFwiaXhzX2Z1bl93ZmxcIiwgXCJpeHNfc3Vfd2ZsXCIsIFwiZGF0X3Z5cml6XCIsIFwic19zY2h2YWxcIiwgXCJza2FyX3puYWtcIiwgXCJza2FyX2xodXRhXCIsIFwicm9rX3Nwb191ZGFcIiwgXCJyb2tfc2thcnRhY2VcIiwgXCJwb2NfbGlzdHVcIiwgXCJwb2Nfc3RyYW5cIiwgXCJwb2Nfa29wXCIsIFwicG9jX3ByaWxvaFwiLCBcInBvY19sX3ByaWxvaFwiLCBcImNqXCIvKiwgXCJQcml6VkJhbGlrdVwiKi8sIFwiaXhzX3p1cFwiLyosIFwiUHJpelBvelNrYXJcIiovLyosIFwidHlwX2VudGl0eV9pY29cIiovLyosIFwidGVjaG5pY2tlX3ZsYXN0bm9zdGlfaWNvXCIqL107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRHcmlkKGNvbnRlbnQ6IEdVY3RTZXpuYW0pOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IC8qfCBudWxswqgqLyB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBjb250ZW50LmVsZW1lbnQuZmluZChcIi5nZ3JpZC5cIiArIGNvbnRlbnQuY2xhc3NHcmlkKTtcclxuICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIGFzIGFueSA6IGRhdGEpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWcmFjaSBvYmpla3QgZmlsdHJ1XHJcbiAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0RmlsdGVyKGNvbnRlbnQ/OiBHVWN0U2V6bmFtKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IEpRdWVyeTxFbGVtZW50PiB7XHJcbiAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZmlsdGVycGFuZWxcIiwgY29udGVudD8uJGZpbHRlckZvcm0pKVxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudD8uJGZpbHRlckZvcm07XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aHJvdyBcImpyZXM6MzAyNTA1NzFcIjsgLy9SQyAzMDI1MDU3MSA6IEZpbHRyIG5lbmFsZXplblxyXG4gICAgICAgIC8vcmV0dXJuIGNvbnRlbnQ/LmVsZW1lbnQuZmluZChcIi5qcy1maWx0ci5nZmlsdGVycGFuZWxcIik7XHJcbiAgICAgICAgLy9yZXR1cm4gJChcIi5qcy1maWx0clwiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUHJpZGFuaSByYWRrdSwga3RlcmUgamUgbnV0b25vIG9iY2Vyc3R2aXRcclxuICAgICAqIEBwYXJhbSBwaWREb2tsYWR1XHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFkZFJlZnJlc2hSb3cocGlkRG9rbGFkdTpzdHJpbmcsY29udGVudD86IEdVY3RTZXpuYW0sICkge1xyXG4gICAgICAgIGxldCBzZXpuYW0gPSBjb250ZW50O1xyXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgc2V6bmFtID0gR2V0Q29udGVudFNlem5hbSgpO1xyXG4gICAgICAgIGlmICghc2V6bmFtIHx8IHNlem5hbS5jbG9zZWQpIHJldHVybiBudWxsOyBcclxuICAgICAgICBsZXQgZmluZCA9IHNlem5hbS5yZWZyZXNoUm93cy5maW5kKChpdGVtKSA9PiBpdGVtLml4cCA9PSBwaWREb2tsYWR1KTtcclxuICAgICAgICBpZiAodHlwZW9mIGZpbmQgPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIHNlem5hbS5yZWZyZXNoUm93cy5wdXNoKHsgaXhwOiBwaWREb2tsYWR1IH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWcmFjZW5pIG9ic2FodSBzZXpuYW11XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0Q29udGVudFNlem5hbSgpOiBHVWN0U2V6bmFtIHtcclxuICAgICAgICByZXR1cm4gJC5jb250ZW50KFwiVUNUU2V6bmFtZG9rbGFkdSNcIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIERvaGxlZGFpIHJhZGt1XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGlkRG9rbGFkdVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIE5hamRpUmFkZWsocGlkRG9rbGFkdTogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHNlem5hbSA9IEdldENvbnRlbnRTZXpuYW0oKTtcclxuICAgICAgICBpZiAoc2V6bmFtID09PSBudWxsIHx8IHNlem5hbS5jbG9zZWQpIHJldHVybiBudWxsOyBcclxuICAgICAgICB2YXIgZ3JpZCA9IEdldEdyaWQoR2V0Q29udGVudFNlem5hbSgpKTtcclxuICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRWaWV3KGdyaWQpLmZpbmRCeUtleShwaWREb2tsYWR1KTtcclxuICAgICAgICAvL3ZhciByYWRlayA9ICQuY29udGVudChcIlVDVFNlem5hbWRva2xhZHUjXCIpLnZpZXcuZmluZEJ5S2V5KHBpZERva2xhZHUsIGZhbHNlKTtcclxuICAgICAgICBpZiAocmFkZWspXHJcbiAgICAgICAgICAgIHJldHVybiByYWRlaztcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIC8vLyoqXHJcbiAgICAvLyAqIERvaHJhbmkgcmFka3UgbmEgZ3JpZFxyXG4gICAgLy8gKiBAcGFyYW0gY29udGVudFxyXG4gICAgLy8gKiBAcGFyYW0gcGlkeURva2xhZHVcclxuICAgIC8vICogQHJldHVybnNcclxuICAgIC8vICovXHJcbiAgICAvL2V4cG9ydCBmdW5jdGlvbiBSZWxvYWRSb3dGcm9tREIoY29udGVudDogR0NvbnRlbnQgfCBudWxsIHwgdW5kZWZpbmVkLCBwaWR5RG9rbGFkdTogc3RyaW5nW10pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgLy8gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSB1bmRlZmluZWQgfHwgY29udGVudCA9PT0gbnVsbClcclxuICAgIC8vICAgICAgICBjb250ZW50ID0gR2V0Q29udGVudFNlem5hbSgpO1xyXG4gICAgLy8gICAgaWYgKHR5cGVvZiBjb250ZW50PT09XCJ1bmRlZmluZWRcIiAmJiBjb250ZW50ID09PSBudWxsKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgIC8vICAgIC8vdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgIC8vICAgIGNvbnRlbnQhLmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDA5OFwiKTsgLy9SQyAzMDI1MDA5OCA6IE5hxI3DrXTDoW0gZGF0YVxyXG4gICAgLy8gICAgLy9uYWN0ZW5pIGRhdCBkbyBncmlkdVxyXG4gICAgLy8gICAgLy8gQHRzLWlnbm9yZTogZG9jYXNuZSBwcm8gbW96bm9zdCBwcmVrbGFkdSA4NFxyXG4gICAgLy8gICAgLy9yZXR1cm4gdmlldy5yZXF1ZXN0RGF0YSh7IEZpbHRlcnM6IHsgaXhwOiB7IG86IFwiPVwiLCB2OiBwaWREb2tsYWR1IH0gfSB9KVxyXG4gICAgLy8gICAgLy8gICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAvLyAgICAvLyAgICAgICAgY29udGVudCEuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAvLyAgICAvLyAgICAgICAgZGVidWdnZXI7XHJcbiAgICAvLyAgICAvLyAgICAgICAgKGNvbnRlbnQgYXMgR1VjdFNlem5hbSkuJGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgeyBpeHA6IHBpZERva2xhZHUgfSlcclxuICAgIC8vICAgIC8vICAgIH0pO1xyXG4gICAgLy8gICAgcmV0dXJuIChjb250ZW50IGFzIEdDb250ZW50KS5pc2wuVWN0RG9rbGFkLmxpc3QoeyBpeHA6IHsgbzogXCJJTlwiLCB2OiBwaWR5RG9rbGFkdSB9IH0pXHJcbiAgICAvLyAgICAgICAgLmdldERhdGEoKVxyXG4gICAgLy8gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyYWRreSkge1xyXG4gICAgLy8gICAgICAgICAgICAvL2lmIChyZWZyZXNoU2V6bmFtdSkge1xyXG4gICAgLy8gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgIC8vICAgICAgICAgICAgaWYgKHJhZGt5Lmxlbmd0aCA+IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgIC8vIHpqaXN0ZW5pIHZpZXdcclxuICAgIC8vICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkdldFZpZXcoR2V0R3JpZChjb250ZW50IGFzIGFueSkpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKHJhZGt5LCBcInVwZGF0ZVwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgIHZhciBncmlkID0gR2V0R3JpZChjb250ZW50IGFzIGFueSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVyblxyXG4gICAgLy8gICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiLCB7IGl4cDogcmFka3lbMF0uaXhwIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgLy9SZXBsYWNlUm93KGNvbnRlbnQsIHJhZGVrWzBdLCB0cnVlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgLy8gICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgIHJldHVybiAgcmFka3k7XHJcbiAgICAvLyAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHsgY29udGVudCEuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAvLyAgICAgICAgO1xyXG4gICAgLy8gICAgLy9yZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIC8vfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmFocmF6ZW5pIHJhZGt1IG5vdnltIG9ic2FoZW1cclxuICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSB7YW55fSByYWRla1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSByZWZyZXNoXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZXBsYWNlUm93KGNvbnRlbnQ6IEdDb250ZW50fCBudWxsIHwgdW5kZWZpbmVkLCByYWRlazogYW55LCByZWZyZXNoOiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjb250ZW50ID09PSBudWxsKVxyXG4gICAgICAgICAgICBjb250ZW50ID0gR2V0Q29udGVudFNlem5hbSgpO1xyXG4gICAgICAgIGlmIChjb250ZW50ID09PSBudWxsIHx8IGNvbnRlbnQ/LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgIC8vIFptZW5hIHJhZGt1IG5hIGdyaWR1XHJcbiAgICAgICAgLy8gVE9ETzogTmVmdW5ndWplIGtvcmVrdG5lXHJcbiAgICAgICAgLy92YXIgdGhhdCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgLy92YXIgbXl2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocmFkZWssIHsga2V5OiBcIml4cFwiIH0pO1xyXG4gICAgICAgIC8vcmFkZWsgPSBteXZpZXcuZmluZEJ5S2V5KHJhZGVrLml4cCwgdHJ1ZSk7XHJcbiAgICAgICAgdmFyIGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQgYXMgYW55KTtcclxuXHJcbiAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVyblxyXG5cclxuICAgICAgICBsZXQgdmlldyA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRWaWV3KGdyaWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdmlldy51cGRhdGVEYXRhUmF3KHJhZGVrKVxyXG4gICAgICAgIC8vdmlldy51cGRhdGVEYXRhKHJhZGVrLCBcInJlZnJlc2hcIilcclxuICAgICAgICB2aWV3LnVwZGF0ZURhdGEocmFkZWssIFwidXBkYXRlXCIpO1xyXG5cclxuICAgICAgICBpZiAocmVmcmVzaCkge1xyXG4gICAgICAgICAgICBncmlkLmdncmlkKFwiYWN0aXZlUm93XCIsIHsgaXhwOiByYWRlay5peHAgfSk7XHJcbiAgICAgICAgICAgIC8vJC5jb250ZW50KFwiVUNUU2V6bmFtZG9rbGFkdSNcIikuJGdyaWQuZ2dyaWQoXCJyZWZyZXNoUm93c1wiLCBmYWxzZSkgXHJcbiAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJmaXRWXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JjZXJzdHZlbmkgc2V6bmFtdSB6IG5hY3RlbnljaCBkYXQgdmUgdmlld1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVmcmVzaFNlem5hbXUoY29udGVudDogR1VjdFNlem5hbSB8IG51bGwgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgY29udGVudCA9PT0gbnVsbClcclxuICAgICAgICAgICAgY29udGVudCA9IEdldENvbnRlbnRTZXpuYW0oKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm5cclxuICAgICAgICAvL2dyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkFrdHVhbG5pUmFkZWsoZ3JpZCkvKmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIikqLyk7XHJcbiAgICAgICAgLy8gbmFzdGF2ZW5pIGFrdHVhbG5paG8gcmFka3VcclxuICAgICAgICAvLyBUT0RPOiBuZXZpbSBqYWsgdG8gZnVuZ3VqZSA/XHJcbiAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLnNldEN1cnJlbnRSb3c8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGRwZXBEdG8+KGdyaWQsIEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvPihncmlkKSBhcyBhbnkpO1xyXG5cclxuICAgICAgICAvLyQuY29udGVudChcIlVDVFNlem5hbWRva2xhZHUjXCIpLiRncmlkLmdncmlkKFwicmVmcmVzaFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgcHJ2a3VcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBOYXN0YXZlbmlQcmlzdHVwbm9zdGkoY29udGVudDogR1VjdFNlem5hbSxcclxuICAgICAgICBwZXJtaXNpb25zPzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFBlcm1pc3Npb25zU2V6bmFtLCBwb2NldFJhZGt1PzpudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB7YWN0aW9ucyB9ID0gY29udGVudDtcclxuICAgICAgICBpZiAoY29udGVudC5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICB2YXIgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICBpZiAodHlwZW9mIHBlcm1pc2lvbnMgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHBvY2V0UmFka3UgPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbmkgcHJpc3R1cG5vc3RpIHRpc2t1IG8gemF1Y3RvdmFuaVxyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25Sb3cgPSBncmlkLmdncmlkPEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHNlbGVjdGlvblJvdy5maW5kKChyb3cpID0+ICghcm93LklzWmF1Y3RvdmFub0Nhc3RlY25lICYmICFyb3cuSXNaYXVjdG92YW55KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuYWJsZVByaW50ID0gdHlwZW9mIHJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxlY3Rpb25Sb3cubGVuZ3RoICE9PSAwIDtcclxuICAgICAgICAgICAgY29udGVudC5hY3Rpb25zLnRpc2tWeWJyYW55Y2hVREFjdD8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGVuYWJsZVByaW50LCB0b29sdGlwOiBlbmFibGVQcmludCA/IFwianJlczozMDI1MDYzMVwiIDogLy9SQyAzMDI1MDYzMSA6IHBybyBkb2tsYWR5IG96bmHEjWVuw6kgdiBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwODU3XCIsIC8vUkMgMzAyNTA4NTcgOiBWeWJyw6FueSBpIG5lesO6xI10b3ZhbsOpIGRva2xhZHlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMhLmFjdFBvZGFuaURva2xhZHUhLnVwZGF0ZSh7XHJcbiAgICAgICAgLy8gICAgZW5hYmxlZDogY29udGVudCEuU2V6bmFtQ29udGVudER0byEuUGVybW1pc3Npb25zIS5Qb3ZvbGVuaVBvZGFuaSEuRW5hYmxlZD09PXRydWUsXHJcbiAgICAgICAgLy8gICAgdG9vbHRpcDogY29udGVudC5TZXpuYW1Db250ZW50RHRvLlBlcm1taXNzaW9ucyEuUG92b2xlbmlQb2RhbmkhLlRvb2xUaXAsXHJcbiAgICAgICAgLy99KTtcclxuICAgICAgICBsZXQgaXB4S25paHkgPSBnZXRJeHBEZW4oY29udGVudCk7XHJcbiAgICAgICAgLy8gdGV4dHkgayBzZXN0YXZhbVxyXG4gICAgICAgIGFjdGlvbnMuYWN0aW9uTmFzdGF2ZW5pVGV4dHVUaXNrdT8udXBkYXRlKHtcclxuICAgICAgICAgICAgZW5hYmxlZDogaXB4S25paHk/LmluZGV4T2YoXCIqXCIpID09IC0xLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBpcHhLbmloeT8uaW5kZXhPZihcIipcIikgPT0gLTEgPyBcImpyZXM6MzAyNTA4NjVcIiAvL1JDIDMwMjUwODY1IDogTmFzdGF2ZW7DrSB0ZXh0xa8gcHJvIHRpc2tvdsOpIHbDvXN0dXB5XHJcbiAgICAgICAgICAgIDpcImpyZXM6MzAyNTA4NjRcIiAvL1JDIDMwMjUwODY0IDogTmVuw60gdnlicmFuw6Ega25paGFcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBwb2RhbmlcclxuICAgICAgICBhY3Rpb25zLmFjdFBvZGFuaURva2xhZHU/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5DYW5DcmVhdGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRldGFpbCBkb2tsYWR1XHJcbiAgICAgICAgLy9sZXQgcG9jZXRSYWRrdSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdShncmlkKTtcclxuICAgICAgICBsZXQgZW1wdHlTZXpuYW0gPSBcIlwiO1xyXG4gICAgICAgIC8vaWYgKHBvY2V0UmFka3UgPT0gMSkgcG9jZXRSYWRrdT0wXHJcbiAgICAgICAgaWYgKHBvY2V0UmFka3UgPCAxKVxyXG4gICAgICAgICAgICBlbXB0eVNlem5hbSA9IFwianJlczozMDI1MDE2OFwiOyAvL1JDIDMwMjUwMTY4IDogU2V6bmFtIGRva2xhZMWvIGplIHByw6F6ZG7DvVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vdmFyIHRvb3RpcCA9IGNvbnRlbnQuYWN0aW9ucy5hY3REZXRhaWxEb2tsYWR1IS50b29sdGlwO1xyXG4gICAgICAgIGFjdGlvbnMuYWN0RGV0YWlsRG9rbGFkdT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLkNhblJlYWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFjdGlvbnMuYWN0RGV0YWlsRG9rbGFkdSEudXBkYXRlKHtcclxuICAgICAgICAgICAgZW5hYmxlZDogcG9jZXRSYWRrdSA+IDAsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IChwb2NldFJhZGt1IDwgMSA/IGVtcHR5U2V6bmFtIDogXCJqcmVzOjMwMjUwNjYxXCIpLCAvL1JDIDMwMjUwNjYxIDogWm9icmF6ZW7DrSBkZXRhaWx1IGRva2xhZHVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9hY3Rpb25zLmFjdERldGFpbERvWmFsb3preT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLkNhblJlYWQpO1xyXG4gICAgICAgIGFjdGlvbnMuYWN0RGV0YWlsRG9aYWxvemt5IS51cGRhdGUoe1xyXG4gICAgICAgICAgICB2aXNpYmxlOnRydWUsXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHBvY2V0UmFka3UgPiAwLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAocG9jZXRSYWRrdSA8IDEgPyBlbXB0eVNlem5hbSA6IGFjdGlvbnMuYWN0RGV0YWlsRG9aYWxvemt5Py50b29sdGlwKSwgLy9SQyAzMDI1MDgzNyA6IFpvYnJhemVuw60gZGV0YWlsdSBkb2tsYWR1IHYgbm92w6kgesOhbG/FvmNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMuYWN0RGV0YWlsUG9sb3preSEudXBkYXRlKHtcclxuICAgICAgICAvLyAgICBlbmFibGVkOiBwb2NldFJhZGt1ID4gMCxcclxuICAgICAgICAvLyAgICB0b29sdGlwOiAocG9jZXRSYWRrdSA8IDEgPyBlbXB0eVNlem5hbSA6IFwianJlczozMDI1MDYwNlwiKSwgLy9SQyAzMDI1MDYwNiA6IFpvYnJhemVuw60gZGV0YWlsdSBkb2tsYWR1IHMgYWt0aXZuw60gesOhbG/FvmtvdSBzIHBvbG/FvmthbWlcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIC8vfSk7XHJcbiAgICAgICAgLy92YXIgdG9vdGlwID0gY29udGVudC5hY3Rpb25zLmFjdFVwcmF2aXREb2tsYWQhLnRvb2x0aXA7XHJcbiAgICAgICAgYWN0aW9ucy5hY3RVcHJhdml0RG9rbGFkIS51cGRhdGUoe1xyXG4gICAgICAgICAgICBlbmFibGVkOiBwb2NldFJhZGt1ID4gMCxcclxuICAgICAgICAgICAgdG9vbHRpcDogcG9jZXRSYWRrdSA8IDEgPyBlbXB0eVNlem5hbSA6IFwianJlczozMDI1MDY2MlwiLCAvL1JDIDMwMjUwNjYyIDogWm9icmF6ZW7DrSBkZXRhaWx1IGRva2xhZHUgdiBlZGl0YWNpXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gdGlzayBzZXpuYW11XHJcbiAgICAgICAgLypcclxuICAgICAgICBjb250ZW50LmFrY2VUaXNrLkFjdFRpc2tTZXpuYW0udXBkYXRlKHtcclxuICAgICAgICAgICAgZW5hYmxlZDogcG9jZXRSYWRrdSA+IDAsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IChwb2NldFJhZGt1IDwgMSA/IGVtcHR5U2V6bmFtIDogY29udGVudC5ha2NlVGlzay5BY3RUaXNrU2V6bmFtLnRvb2x0aXApLFxyXG4gICAgICAgIH0pOyovXHJcbiAgICAgICAgLy8gWmFrYXphbmkgdnNlY2ggdGlza3VcclxuICAgICAgICAvL2lmIChwb2NldFJhZGt1IDwgMSlcclxuICAgICAgICAvL2NvbnRlbnQubWVudVRpc2suXHJcbiAgICAgICAgLy8gVE9ETzogbnV0bm8gZG9kZWxhdCBcclxuXHJcbiAgICAgICAgY29udGVudC5tZW51VGlzay8qW1wiQWN0VGlza1Nlem5hbVwiXSovLmNoaWxkcmVuIS5mb3JFYWNoKGZ1bmN0aW9uIChtZW51KSB7XHJcbiAgICAgICAgICAgIGlmIChtZW51LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51LmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKHN1Ym1lbnUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJtZW51LmFjdGlvbiEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXRSYWRrdSA+IDAsIHRvb2x0aXA6IHBvY2V0UmFka3UgPiAxID8gXCJcIiA6IGVtcHR5U2V6bmFtLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBtZW51LmFjdGlvbiEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBwb2NldFJhZGt1ID4gMCwgdG9vbHRpcDogcG9jZXRSYWRrdSA+IDEgPyBcIlwiIDogZW1wdHlTZXpuYW0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gaHJvbWFkbmUgemF1Y3RvdmFuaSBkb2tsYWR1XHJcbiAgICAgICAgYWN0aW9ucy5hY3RIcm9tYWRuZVphdWN0b3Zhbmk/LnVwZGF0ZVBlcm1pc3Npb24oJC5leHRlbmQoeyBtZXNzYWdlOiBcIlwiIH0sIHBlcm1pc2lvbnMuUG92b2xlbmlQcm91Y3RvdmF0KSk7XHJcbiAgICAgICAgLy9pZiAocGVybWlzaW9ucy5Qb3ZvbGVuaVByb3VjdG92YXRIcm9tYWRuZS52YWx1ZSlcclxuICAgICAgICAvLyAgICBjb250ZW50LmFjdGlvbnMuYWN0SHJvbWFkbmVaYXVjdG92YW5pPy51cGRhdGUoeyB0b29sdGlwOlwiXCIgfSk7XHJcbiAgICAgICAgLy8gaHJvbWFkbmEga29udHJvbGEgbWV0YWRhdFxyXG4gICAgICAgIGFjdGlvbnMuYWN0SHJvbWFkbmFLb250cm9sYU1ldGFkYXQ/LnVwZGF0ZVBlcm1pc3Npb24oJC5leHRlbmQoeyBtZXNzYWdlOiBcIlwiIH0sIHBlcm1pc2lvbnMuUG92b2xlbmlLb250cm9seU1ldGFkYXQpKTtcclxuICAgICAgICAvLyBGaW5hbmNuaSBrb250cm9sYVxyXG4gICAgICAgIGFjdGlvbnMuYWN0SHJvbWFkbmFGSUs/LnVwZGF0ZVBlcm1pc3Npb24oJC5leHRlbmQoeyBtZXNzYWdlOiBcIlwiIH0sIHBlcm1pc2lvbnMuUG92b2xlbmlGSUspKTtcclxuICAgICAgICAvLyBVY2V0bmkga29udHJvbGFcclxuICAgICAgICBhY3Rpb25zLmFjdEhyb21hZG5hVUNLPy51cGRhdGVQZXJtaXNzaW9uKCQuZXh0ZW5kKHsgbWVzc2FnZTogXCJcIiB9LCBwZXJtaXNpb25zLlBvdm9sZW5pVUspKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2lmIChwZXJtaXNpb25zLlBvdm9sZW5pSHJvbWFkbmVLb250cm9seU1ldGFkYXQudmFsdWUpXHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMuYWN0SHJvbWFkbmFLb250cm9sYU1ldGFkYXQ/LnVwZGF0ZSh7IHRvb2x0aXA6IFwiXCIgfSk7XHJcblxyXG4gICAgICAgIC8vIHV6YXZyZW5pIHZ5YnJhbnljaCBkb2tsYWR1ICAgXHJcbiAgICAgICAgYWN0aW9ucy5hY3RIcm9tVXphdkRva2xWeWI/LnVwZGF0ZVBlcm1pc3Npb24oJC5leHRlbmQoeyBtZXNzYWdlOiBcIlwiIH0sIHBlcm1pc2lvbnMuUG92b2xlbmlVemF2cmVuaSkpO1xyXG4gICAgICAgIC8vaWYgKHBlcm1pc2lvbnMuUG92b2xlbmlVemF2cmVuaUhyb21hZG5lLnZhbHVlKVxyXG4gICAgICAgIC8vY29udGVudC5hY3Rpb25zLmFjdEhyb21VemF2RG9rbFZ5Yj8udXBkYXRlKHsgdG9vbHRpcDogXCJcIiB9KTtcclxuICAgICAgICAvLy8vIHV6YXZyZW5pIHZ5YnJhbnljaCBkb2tsYWR1ICAgICAgICAgICAgXHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMuYWN0SHJvbVV6YXZEb2tsVnliIS51cGRhdGUoe1xyXG4gICAgICAgIC8vICAgIGVuYWJsZWQ6IGNvbnRlbnQuU2V6bmFtQ29udGVudER0by5QZXJtbWlzc2lvbnMhLlBvdm9sZW5pSHJvbWFkbmVob1V6YXZyZW5pVnlicmFueWNoIS5FbmFibGVkPT09dHJ1ZSxcclxuICAgICAgICAvLyAgICB0b29sdGlwOiBjb250ZW50LlNlem5hbUNvbnRlbnREdG8uUGVybW1pc3Npb25zIS5Qb3ZvbGVuaUhyb21hZG5laG9VemF2cmVuaVZ5YnJhbnljaCEuVG9vbFRpcCxcclxuICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAvLyBocm9tYWRuZSBwcmV2emV0aVxyXG4gICAgICAgIGFjdGlvbnMuYWN0SHJvbWFkbmVQcmV2emV0aT8udXBkYXRlUGVybWlzc2lvbigkLmV4dGVuZCh7IG1lc3NhZ2U6IFwiXCIgfSwgcGVybWlzaW9ucy5Qb3ZvbGVuaVByZXZ6aXQpKTtcclxuICAgICAgICAvL2lmIChwZXJtaXNpb25zLlBvdm9sZW5pUHJldnppdEhyb21hZG5lLnZhbHVlKVxyXG4gICAgICAgIC8vY29udGVudC5hY3Rpb25zLmFjdEhyb21hZG5lUHJldnpldGk/LnVwZGF0ZSh7IHRvb2x0aXA6IFwiXCIgfSk7XHJcbiAgICAgICAgLy8vLyBwcmV2emV0aVxyXG4gICAgICAgIC8vY29udGVudC5hY3Rpb25zLmFjdEhyb21hZG5lUHJldnpldGkhLnVwZGF0ZSh7XHJcbiAgICAgICAgLy8gICAgZW5hYmxlZDogY29udGVudC5TZXpuYW1Db250ZW50RHRvLlBlcm1taXNzaW9ucyEuUG92b2xlbmlQcmV2emV0aSEuRW5hYmxlZD09PXRydWUsXHJcbiAgICAgICAgLy8gICAgdG9vbHRpcDogY29udGVudC5TZXpuYW1Db250ZW50RHRvLlBlcm1taXNzaW9ucyEuUG92b2xlbmlQcmV2emV0aSEuVG9vbFRpcCxcclxuICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAvLyBocm9tYWRuZSBwcmVldmlkb3ZhdFxyXG4gICAgICAgIGFjdGlvbnMuYWN0SHJvbWFkbmFQcmVldmlkZW5jZT8udXBkYXRlUGVybWlzc2lvbigkLmV4dGVuZCh7IG1lc3NhZ2U6IFwiXCIgfSwgcGVybWlzaW9ucy5Qb3ZvbGVuaVByZWV2aWRlbmNlKSk7XHJcbiAgICAgICAgLy9pZiAocGVybWlzaW9ucy5Qb3ZvbGVuaVByZWV2aWRlbmNlSHJvbWFkbmUudmFsdWUpXHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMuYWN0SHJvbWFkbmFQcmVldmlkZW5jZT8udXBkYXRlKHsgdG9vbHRpcDogXCJcIiB9KTtcclxuICAgICAgICAvLy8vIHByZWV2aWRlbmNlXHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMuYWN0SHJvbWFkbmFQcmVldmlkZW5jZSEudXBkYXRlKHtcclxuICAgICAgICAvLyAgICBlbmFibGVkOiBjb250ZW50LlNlem5hbUNvbnRlbnREdG8uUGVybW1pc3Npb25zIS5Qb3ZvbGVuaVByZWV2aWRlbmNlIS5FbmFibGVkPT09dHJ1ZSxcclxuICAgICAgICAvLyAgICB0b29sdGlwOiBjb250ZW50LlNlem5hbUNvbnRlbnREdG8uUGVybW1pc3Npb25zIS5Qb3ZvbGVuaVByZWV2aWRlbmNlIS5Ub29sVGlwLFxyXG4gICAgICAgIC8vfSk7XHJcbiAgICAgICAgLy8gcHJpZGVsZW5pXHJcbiAgICAgICAgYWN0aW9ucy5hY3RIcm9tZWRuZVByaWRlbGl0Py51cGRhdGVQZXJtaXNzaW9uKCQuZXh0ZW5kKHsgbWVzc2FnZTogXCJcIiB9LCBwZXJtaXNpb25zLlBvdm9sZW5pUHJpZGVsaXQpKTtcclxuICAgICAgICAvL2lmIChwZXJtaXNpb25zLlBvdm9sZW5pUHJpZGVsaXRIcm9tYWRuZS52YWx1ZSlcclxuICAgICAgICAvL2NvbnRlbnQuYWN0aW9ucy5hY3RIcm9tZWRuZVByaWRlbGl0Py51cGRhdGUoeyB0b29sdGlwOiBcIlwiIH0pO1xyXG4gICAgICAgIC8vIHByZWRhdFxyXG4gICAgICAgIGFjdGlvbnMuYWN0SHJvbWFkbmVQcmVkYXQ/LnVwZGF0ZVBlcm1pc3Npb24oJC5leHRlbmQoeyBtZXNzYWdlOiBcIlwiIH0sIHBlcm1pc2lvbnMuUG92b2xlbmlQcmVkYXQpKTtcclxuICAgICAgICAvL2lmIChwZXJtaXNpb25zLlBvdm9sZW5pUHJlZGF0SHJvbWFkbmUudmFsdWUpXHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMuYWN0SHJvbWFkbmVQcmVkYXQ/LnVwZGF0ZSh7IHRvb2x0aXA6IFwiXCIgfSk7XHJcblxyXG4gICAgICAgIC8vIGtsaWNvdmEgc2xvdmFcclxuICAgICAgICBhY3Rpb25zLmFjdEtsaWNvdmFTbG92YURva2xhZHU/LnVwZGF0ZVBlcm1pc3Npb24oJC5leHRlbmQoeyBtZXNzYWdlOiBcIlwiIH0sIHBlcm1pc2lvbnMuUG92b2xlbmlLbGljb3ZhU2xvdmEpKTtcclxuICAgICAgICAvL2lmIChwZXJtaXNpb25zLlBvdm9sZW5pS2xpY292YVNsb3ZhLnZhbHVlKVxyXG4gICAgICAgIC8vY29udGVudC5hY3Rpb25zLmFjdEtsaWNvdmFTbG92YURva2xhZHU/LnVwZGF0ZSh7IHRvb2x0aXA6IFwiXCIgfSk7XHJcbiAgICAgICAgLy8vLyBrbGljb3ZhIHNsb3ZhXHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMuYWN0S2xpY292YVNsb3ZhRG9rbGFkdSEudXBkYXRlKHtcclxuICAgICAgICAvLyAgICBlbmFibGVkOiBjb250ZW50LlNlem5hbUNvbnRlbnREdG8uUGVybW1pc3Npb25zIS5Qb3ZvbGVuaUtsaWNvdmFTbG92YSEuRW5hYmxlZD09PXRydWUsXHJcbiAgICAgICAgLy8gICAgdG9vbHRpcDogY29udGVudC5TZXpuYW1Db250ZW50RHRvLlBlcm1taXNzaW9ucyEuUG92b2xlbmlLbGljb3ZhU2xvdmEhLlRvb2xUaXAsXHJcbiAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgLy8gb3puYWNpdCBuZXByZWN0ZW5lICAgICAgIFxyXG4gICAgICAgIGFjdGlvbnMuYWN0T3puYWNpdE5lcHJlY3RlbmU/LnVwZGF0ZVBlcm1pc3Npb24oJC5leHRlbmQoeyBtZXNzYWdlOiBcIlwiIH0sIHBlcm1pc2lvbnMuUG92b2xlbk96bmFjaXROZXByZWN0ZW5lKSk7XHJcbiAgICAgICAgLy9pZiAocGVybWlzaW9ucy5Qb3ZvbGVuT3puYWNpdE5lcHJlY3RlbmUudmFsdWUpXHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMuYWN0T3puYWNpdE5lcHJlY3RlbmU/LnVwZGF0ZSh7IHRvb2x0aXA6IFwiXCIgfSk7XHJcblxyXG5cclxuICAgICAgICAvLy8vIG96bmFjaXQgbmVwcmVjdGVuZSAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvL2NvbnRlbnQuYWN0aW9ucy5hY3RPem5hY2l0TmVwcmVjdGVuZSEudXBkYXRlKHtcclxuICAgICAgICAvLyAgICBlbmFibGVkOiBjb250ZW50LlNlem5hbUNvbnRlbnREdG8uUGVybW1pc3Npb25zIS5Qb3ZvbGVuT3puYWNpdE5lcHJlY3RlbmUhLkVuYWJsZWQ9PT10cnVlLFxyXG4gICAgICAgIC8vICAgIHRvb2x0aXA6IGNvbnRlbnQuU2V6bmFtQ29udGVudER0by5QZXJtbWlzc2lvbnMhLlBvdm9sZW5Pem5hY2l0TmVwcmVjdGVuZSEuVG9vbFRpcCxcclxuICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAvLyBvem5hY2l0IHByZWN0ZW5lICAgICAgIFxyXG4gICAgICAgIGFjdGlvbnMuYWN0T3puYWNpdFByZWN0ZW5lPy51cGRhdGVQZXJtaXNzaW9uKCQuZXh0ZW5kKHsgbWVzc2FnZTogXCJcIiB9LCBwZXJtaXNpb25zLlBvdm9sZW5Pem5hY2l0UHJlY3RlbmUpKTtcclxuICAgICAgICAvL2lmIChwZXJtaXNpb25zLlBvdm9sZW5Pem5hY2l0UHJlY3RlbmUudmFsdWUpXHJcbiAgICAgICAgLy9jb250ZW50LmFjdGlvbnMuYWN0T3puYWNpdFByZWN0ZW5lPy51cGRhdGUoeyB0b29sdGlwOiBcIlwiIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBhY3Rpb25zLmFjdE9iY2Vyc3R2aXRTZXpuYW0hLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAvLyAgdG9vbHRpcDogZW1wdHlTZXpuYW0sXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAqIEBwYXJhbSB7R1VjdFNlem5hbX0gY29udGVudFxyXG4gICAgICogQHBhcmFtIGZpbHRyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IGlkTWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVsb2FkUmVxdWVzdChjb250ZW50OiBHVWN0U2V6bmFtLCBmaWx0cj86IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RGaWx0ckRva2xhZHUgfCB1bmRlZmluZWQgfCBudWxsLCBkZWZmZXI/OiBhbnkgfCB1bmRlZmluZWQgfCBudWxsKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcblxyXG4gICAgICAgIC8vdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGlmIChjb250ZW50LmNsb3NlZClcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWx0ciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBmaWx0ciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBfZmlsdGVyID0gR2V0RmlsdGVyKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAvL3ZhciBfZmlsdGVyID0gY29udGVudC4kZmlsdGVyRm9ybTtcclxuICAgICAgICAgICAgLy9jb25zdCB3aWRnZXRFeGlzdHMgPSBHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2ZpbHRlcnBhbmVsXCIsIF9maWx0ZXIpO1xyXG4gICAgICAgICAgICBmaWx0ciA9IF9maWx0ZXIuZ2ZpbHRlcnBhbmVsPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RGaWx0ckRva2xhZHU+KCdnZXRDb25maXJtZWREYXRhJylhcyBhbnk7XHJcbiAgICAgICAgICAgIC8vZmlsdHIgPSBfZmlsdGVyLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpOyAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgLy9maWx0ciEuaHJhbmljZVZlbGt5Y2hEYXQgPSBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5CaWdEYXRhXCIpOy8vY29udGVudC5ocmFuaWNlVmVsa3ljaERhdDtcclxuICAgICAgICAgICAgLy9maWx0ciEudmFyb3ZhbmlWZWxrZWhvTW5venR2aURhdCA9IGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLldhcm5pbmdXaGVuTG9hZGluZ1wiKTsgLy9jb250ZW50LnZhcm92YW5pVmVsa2Vob01ub3p0dmlEYXQ7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGRlZmZlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBkZWZmZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgZGVmZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAvLyB6amlzdGVuaSBuYXN0YXZlbmkgY2hvdmFuaSBwcmkgbmFjaXRhbmkgdmVsa3ljaCBkYXRcclxuICAgICAgICAgICAgZmlsdHIhLmhyYW5pY2VWZWxreWNoRGF0ID0gR29yZGljLkVrby5VdGlscy5HZXRVc2VyU2V0dGluZ3NMaXN0TWF4Q291bnQoY29udGVudCwgXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzXCIpOy8vIGNvbnRlbnQuTG9uZ0xpc3RNYXhDb3VudDsgLy9jb250ZW50Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5CaWdEYXRhXCIpOy8vY29udGVudC5ocmFuaWNlVmVsa3ljaERhdDtcclxuICAgICAgICAgICAgZmlsdHIhLnZhcm92YW5pVmVsa2Vob01ub3p0dmlEYXQgPSBHb3JkaWMuRWtvLlV0aWxzLkdldFVzZXJTZXR0aW5nc0xpc3RXYXJuaW5nKGNvbnRlbnQsIFwiR2xvYmFsLlVjdC5BcHBTZXR0aW5nc1wiKTsvL2NvbnRlbnQuTG9uZ0xpc3RXYXJuaW5nOy8vY29udGVudC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLlVjdC5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uV2FybmluZ1doZW5Mb2FkaW5nXCIpOyAvL2NvbnRlbnQudmFyb3ZhbmlWZWxrZWhvTW5venR2aURhdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDk4XCIpOyAvL1JDIDMwMjUwMDk4IDogTmHEjcOtdMOhbSBkYXRhXHJcbiAgICAgICAgbGV0IG15ZmlsdHI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RGaWx0ckRva2xhZHUgPSBmaWx0ciBhcyBhbnk7XHJcbiAgICAgICAgLy9maWx0ciA9IGZpbHRyIHx8IHt9OyBcclxuICAgICAgICAvL3NsdXpiYSBwcm8gcHJpc3R1cCBrIGRhdHVtIHplIHNlcnZlcnVcclxuICAgICAgICAvLy8vIEB0cy1pZ25vcmU6IGRvY2FzbmUgcHJvIG1vem5vc3QgcHJla2xhZHUgODRcclxuICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLmxpc3QoeyBmaWx0ZXJzOiBteWZpbHRyLC8qIGZyYWdtZW50czpbIFwiKlwiXSovIH0pLmdldFZpZXcoKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoc2V6bmFtRG9rbGFkdSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBzZXpuYW1Eb2tsYWR1LmdldERhdGFSb3dzKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlem5hbURva2xhZHU7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb25OZXcoY29udGVudCwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZS50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLklkTWVzc2FnZSA9PT0gXCJzZXpuYW1Eb2tsYWR1X3F1ZVwiICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuRGVjaXNpb25RdWVzdGlvbk1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0UXVlc3Rpb24gJiYgdHlwZW9mIHJldHVyblZhbHVlLlJlc3VsdFF1ZXN0aW9uID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15ZmlsdHIudmFyb3ZhbmlWZWxrZWhvTW5venR2aURhdCA9IHJldHVyblZhbHVlLlJlc3VsdFF1ZXN0aW9uID09PSBcIllFU1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15ZmlsdHIuaWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlbG9hZChjb250ZW50LCBteWZpbHRyLCBkZWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuVHlwZU1lc3NhZ2UgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkdyaWQuY29uZmlybUxpc3RMaW1pdChjb250ZW50LCByZXR1cm5WYWx1ZS5Qb2xlUGFyYW0hWzBdIGFzIGFueSBhcyBudW1iZXIsIGNvbnRlbnQuTG9uZ0xpc3RNYXhDb3VudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlem5hbSBzZSBidWRlIGkgcMWZZXN0byBuYcSNw610YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15ZmlsdHIudmFyb3ZhbmlWZWxrZWhvTW5venR2aURhdCA9IHJldHVyblZhbHVlLlJlc3VsdFF1ZXN0aW9uID09PSBcIllFU1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlbG9hZChjb250ZW50LCBteWZpbHRyLCBkZWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBkZWZmZXIucmVqZWN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIC8vcmV0dXJuO1xyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogWm5vdnVuYWN0ZW5pIGRhdFxyXG4gICAgICogQHBhcmFtIHtHVWN0U2V6bmFtfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gZmlsdHJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gaWRNZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZWxvYWQoY29udGVudDogR1VjdFNlem5hbSwgZmlsdHI/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RmlsdHJEb2tsYWR1IHwgdW5kZWZpbmVkIHwgbnVsbCwgZGVmZmVyPzogYW55IHwgdW5kZWZpbmVkIHwgbnVsbCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgLy92YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQuY2xvc2VkKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICBpZiAodHlwZW9mIGZpbHRyID09PSBcInVuZGVmaW5lZFwiIHx8IGZpbHRyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIF9maWx0ZXIgPSBHZXRGaWx0ZXIoY29udGVudCk7XHJcbiAgICAgICAgICAgIC8vdmFyIF9maWx0ZXIgPSBjb250ZW50LiRmaWx0ZXJGb3JtO1xyXG4gICAgICAgICAgICAvL2NvbnN0IHdpZGdldEV4aXN0cyA9IEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZmlsdGVycGFuZWxcIiwgX2ZpbHRlcik7XHJcbiAgICAgICAgICAgIGZpbHRyID0gX2ZpbHRlci5nZmlsdGVycGFuZWwoJ2dldENvbmZpcm1lZERhdGEnKSBhcyBhbnk7XHJcbiAgICAgICAgICAgIC8vZmlsdHIgPSBfZmlsdGVyLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpOyAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9maWx0ciEuaHJhbmljZVZlbGt5Y2hEYXQgPSBjb250ZW50Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5CaWdEYXRhXCIpOy8vY29udGVudC5ocmFuaWNlVmVsa3ljaERhdDtcclxuICAgICAgICAgICAgLy9maWx0ciEudmFyb3ZhbmlWZWxrZWhvTW5venR2aURhdCA9IGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLldhcm5pbmdXaGVuTG9hZGluZ1wiKTsgLy9jb250ZW50LnZhcm92YW5pVmVsa2Vob01ub3p0dmlEYXQ7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGRlZmZlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBkZWZmZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgZGVmZmVyID0gJC5EZWZlcnJlZCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB6amlzdGVuaSBuYXN0YXZlbmkgY2hvdmFuaSBwcmkgbmFjaXRhbmkgdmVsa3ljaCBkYXRcclxuICAgICAgICAgICAgZmlsdHIhLmhyYW5pY2VWZWxreWNoRGF0ID0gR29yZGljLkVrby5VdGlscy5HZXRVc2VyU2V0dGluZ3NMaXN0TWF4Q291bnQoY29udGVudCwgXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzXCIpOy8vIGNvbnRlbnQuTG9uZ0xpc3RNYXhDb3VudDsgLy9jb250ZW50Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5CaWdEYXRhXCIpOy8vY29udGVudC5ocmFuaWNlVmVsa3ljaERhdDtcclxuICAgICAgICAgICAgZmlsdHIhLnZhcm92YW5pVmVsa2Vob01ub3p0dmlEYXQgPSBHb3JkaWMuRWtvLlV0aWxzLkdldFVzZXJTZXR0aW5nc0xpc3RXYXJuaW5nKGNvbnRlbnQsIFwiR2xvYmFsLlVjdC5BcHBTZXR0aW5nc1wiKTsvL2NvbnRlbnQuTG9uZ0xpc3RXYXJuaW5nOy8vY29udGVudC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLlVjdC5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uV2FybmluZ1doZW5Mb2FkaW5nXCIpOyAvL2NvbnRlbnQudmFyb3ZhbmlWZWxrZWhvTW5venR2aURhdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDk4XCIpOyAvL1JDIDMwMjUwMDk4IDogTmHEjcOtdMOhbSBkYXRhXHJcbiAgICAgICAgbGV0IG15ZmlsdHI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RGaWx0ckRva2xhZHUgPSBmaWx0ciBhcyBhbnk7XHJcbiAgICAgICAgLy9maWx0ciA9IGZpbHRyIHx8IHt9OyBcclxuXHJcbiAgICAgICAgLy92YXIgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgLy92YXIgZGF0YSA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKHsgZmlsdGVyczogbXlmaWx0ciB9LCB7IG9uUmVzcG9uc2U6IH0pO1xyXG4gICAgICAgIC8vZGF0YS5cclxuICAgICAgICAvL25hY3RlbmkgZGF0IGRvIGdyaWR1XHJcbiAgICAgICAgLy9kZWJ1Z2dlcjsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9zbHV6YmEgcHJvIHByaXN0dXAgayBkYXR1bSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgLy8vLyBAdHMtaWdub3JlOiBkb2Nhc25lIHBybyBtb3pub3N0IHByZWtsYWR1IDg0XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZC5saXN0KHsgZmlsdGVyczogbXlmaWx0ciwvKiBmcmFnbWVudHM6WyBcIipcIl0qLyB9KVxyXG4gICAgICAgICAgICAudXNlKChyZXEsIG5leHQsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQocmVxKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIE5hc3RhdmVuaVByaXN0dXBub3N0aShjb250ZW50LCByZXN1bHQubWV0YSEsIHJlc3VsdC5kYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChzZXpuYW1Eb2tsYWR1KSB7XHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiBzZXpuYW1Eb2tsYWR1O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG15R3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG15R3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlem5hbURva2xhZHUgJiYgc2V6bmFtRG9rbGFkdS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbXlHcmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBteUdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvPihcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YShzZXpuYW1Eb2tsYWR1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWmppc3RpdCwgY28gdG8gdWRlbGEgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkLmdncmlkKFwic2V0RGF0YVwiLCBuZXcgR29yZGljLkRhdGEuVmlldyhudWxsIGFzIGFueSwgeyBrZXk6IFwiaXhwXCIgfSksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkLmdncmlkKCdmb2N1cycpOyAvLyBuYXN0YXZlbsOtIGZvY3VzdSBuYSBncmlkXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vTmFzdGF2ZW5pUHJpc3R1cG5vc3RpKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbk5ldyhjb250ZW50LCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2lmICh0eXBlID09PSBcInZhbGlkYXRpb25cIikgeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgdHJhbnNNc2dUc3QgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0VHJhbk1lc3NhZ2Uodm9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha3kgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRyYW5zTXNnVHN0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbGV0IHRyYW5zTXNnID0gdHJhbnNNc2dUc3QgYXMgRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5acHJhY292YW5pWnByYXYoY29udGVudCwgdHJhbnNNc2cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlLnRoZW4oZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuSWRNZXNzYWdlID09PSBcInNlem5hbURva2xhZHVfcXVlXCIgJiYgcmV0dXJuVmFsdWUuVHlwZU1lc3NhZ2UgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5EZWNpc2lvblF1ZXN0aW9uTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHRRdWVzdGlvbiAmJiB0eXBlb2YgcmV0dXJuVmFsdWUuUmVzdWx0UXVlc3Rpb24gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlmaWx0ci52YXJvdmFuaVZlbGtlaG9Nbm96dHZpRGF0ID0gcmV0dXJuVmFsdWUuUmVzdWx0UXVlc3Rpb24gPT09IFwiWUVTXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlmaWx0ci5pZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVsb2FkKGNvbnRlbnQsIG15ZmlsdHIsIGRlZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuTm9TZXJ2ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VUeXBlVHJhbnNmZXJNZXNzYWdlLlVzZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uR3JpZC5jb25maXJtTGlzdExpbWl0KGNvbnRlbnQsIHJldHVyblZhbHVlLlBvbGVQYXJhbSFbMF0gYXMgYW55IGFzIG51bWJlciwgY29udGVudC5Mb25nTGlzdE1heENvdW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V6bmFtIHNlIGJ1ZGUgaSBwxZllc3RvIG5hxI3DrXRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlmaWx0ci52YXJvdmFuaVZlbGtlaG9Nbm96dHZpRGF0ID0gcmV0dXJuVmFsdWUuUmVzdWx0UXVlc3Rpb24gPT09IFwiWUVTXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVsb2FkKGNvbnRlbnQsIG15ZmlsdHIsIGRlZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGRlZmZlci5yZWplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIC8vcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBab2JyYXplbmkgb2tuYSBkbGUgYWt0dWFsbmlobyByYWRrdVxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSByb3dcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFpvYnJhekRldGFpbChjb250ZW50OiBHVWN0U2V6bmFtLCByb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvLCBvYmpla3Q/OiBzdHJpbmcsIHBvbG96a3k6IGJvb2xlYW49ZmFsc2UpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgdmFyIGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHJvdyAhPSBudWxsKVxyXG4gICAgICAgICAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5ab2JyYXpEZXRhaWxEbGVJWFAoeyBjb250ZW50OiBjb250ZW50LCBuZXdNb2RlOiBjb250ZW50LmRlYnVnTW9kZSwgaXhwOiByb3cuaXhwISwgc2Ftb3N0YW5lT2tubzogZmFsc2UsIGVkaXRhY2U6ZmFsc2UsIGdyaWQ6IGdyaWQsIG9iamVrdDogb2JqZWt0LCBpeHBEZW46IHJvdy5peHBfZGVuISwgcG9sb3preTogcG9sb3preSB9KTtcclxuICAgICAgICAgICAgLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5ab2JyYXpEZXRhaWxEbGVJWFBPbGQoY29udGVudCwgcm93Lml4cCBhcyBhbnksIGZhbHNlLCBmYWxzZSwgZ3JpZCwgb2JqZWt0LCByb3cuaXhwX2RlbiBhcyBhbnksIHBvbG96a3kpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDM1XCIsIC8vUkMgMzAyNTAwMzUgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDAzNFwiKTsgIC8vUkMgMzAyNTAwMzQgOiBOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IMWZw6FkZWshXHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogWm9icmF6ZW5pIGRldGFpbHUgZGxlIHBpZHVcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBab2JyYXpEZXRhaWxJeHAoY29udGVudDogR0NvbnRlbnQsIGl4cDogc3RyaW5nKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChpeHAgIT0gbnVsbClcclxuICAgICAgICAgICAgR29yZGljLlVjdC5XZWJDbGllbnQuWm9icmF6RGV0YWlsRGxlSVhQKHsgY29udGVudDogY29udGVudCwgbmV3TW9kZTogKGNvbnRlbnQgYXMgR1VjdFNlem5hbSkuZGVidWdNb2RlLCBpeHA6IGl4cCwgc2Ftb3N0YW5lT2tubzogZmFsc2UsIGVkaXRhY2U6IGZhbHNlLCBwb2xvemt5OnRydWUgfSk7XHJcbiAgICAgICAgICAgIC8vR29yZGljLlVjdC5XZWJDbGllbnQuWm9icmF6RGV0YWlsRGxlSVhQT2xkKGNvbnRlbnQsIGl4cCwgZmFsc2UsIGZhbHNlLCB2b2lkIDAsdm9pZCAwLCB2b2lkIDAsIHRydWUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDM1XCIsIC8vUkMgMzAyNTAwMzUgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDAzNFwiKTsgIC8vUkMgMzAyNTAwMzQgOiBOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IMWZw6FkZWshXHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBab2JyYXplbmkgb2tuYSB2IHJlemltdSB1cHJhdiBobGF2aWNreSBkb2tsYWR1XHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHBhcmFtIHJvd1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVXByYXZpdERldGFpbChjb250ZW50OiBHVWN0U2V6bmFtLCByb3c6IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAoY29udGVudC5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICB2YXIgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICBpZiAocm93ICE9IG51bGwpXHJcbiAgICAgICAgICAgIEdvcmRpYy5VY3QuV2ViQ2xpZW50LlpvYnJhekRldGFpbERsZUlYUCh7IGNvbnRlbnQ6IGNvbnRlbnQsIG5ld01vZGU6IGNvbnRlbnQuZGVidWdNb2RlLCBpeHA6IHJvdy5peHAsIHNhbW9zdGFuZU9rbm86IGZhbHNlLCBlZGl0YWNlOiB0cnVlLCBncmlkOiBncmlkLCBwb2xvemt5OmZhbHNlIH0pO1xyXG4gICAgICAgICAgICAvL0dvcmRpYy5VY3QuV2ViQ2xpZW50LlpvYnJhekRldGFpbERsZUlYUE9sZChjb250ZW50LCByb3cuaXhwLCBmYWxzZSwgdHJ1ZSwgZ3JpZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAwMzVcIiwgLy9SQyAzMDI1MDAzNSA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMDM0XCIpOyAgLy9SQyAzMDI1MDAzNCA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayFcclxuICAgIH1cclxuXHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiBIcm9tYWRuZSB6YXVjdG92YW5pXHJcbiAgICAvLyAqIEBwYXJhbSB7R1VjdFNlem5hbX0gY29udGVudFxyXG4gICAgLy8gKi9cclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIEhyb21hZG5lWmF1Y3RvdmFuaShjb250ZW50OiBHVWN0U2V6bmFtKSB7XHJcbiAgICAvLyAgICAvLyB6amlzdGVuaSBvem5hY2VueWNoIHJhZGt1XHJcbiAgICAvLyAgICBpZiAoY29udGVudC5jbG9zZWQpIHJldHVybjtcclxuICAgIC8vICAgIHZhciBncmlkID0gR2V0R3JpZChjb250ZW50KTtcclxuICAgIC8vICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm47XHJcbiAgICAvLyAgICBsZXQgb3puYWNlbmVSYWRreSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0bz4oZ3JpZCwgZmFsc2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgLy8gICAgaWYgKG96bmFjZW5lUmFka3kgPT09IG51bGwgfHwgb3puYWNlbmVSYWRreSA9PT0gdW5kZWZpbmVkIHx8IG96bmFjZW5lUmFka3kubGVuZ3RoID09IDApIHtcclxuICAgIC8vICAgICAgICBjb250ZW50LmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMwMjUwMDM1XCIsIC8vUkMgMzAyNTAwMzUgOiBVcG96b3JuxJtuw61cclxuICAgIC8vICAgICAgICAgICAgXCJqcmVzOjMwMjUwMzM0XCIpOyAgLy9SQyAzMDI1MDMzNCA6IE5lbmFsZXplbnkgxb7DoWRuw6kgb3puYcSNZW7DqSDFmcOhZGt5XHJcbiAgICAvLyAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgfVxyXG4gICAgLy8gICAgRUtPVXRpbHMuY2FsbE90aGVyQ29udGVudChjb250ZW50LCBcIkdVY3RIcm9tYWRuZVphdWN0b3ZhbmlcIiwgXCJVY3RcIixcclxuICAgIC8vICAgICAgICAoY250RGl2LCBjb250ZW50UHJ1dm9kY2U6IEdVY3RIcm9tYWRuZVV6YXZyZW5pKSA9PiB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnRQcnV2b2RjZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29udGVudFBydXZvZGNlLnN1Y2Nlc3NDbG9zZSA9PT0gXCJib29sZWFuXCIgJiYgY29udGVudFBydXZvZGNlLnN1Y2Nlc3NDbG9zZSA9PT0gdHJ1ZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY2xvc2VkKSByZXR1cm47XHJcbiAgICAvLyAgICAgICAgICAgICAgICAvLyByZWZyZXNoIHNlem5hbXVcclxuICAgIC8vICAgICAgICAgICAgICAgIHJlZnJlc1Jvdyhjb250ZW50LCBjb250ZW50UHJ1dm9kY2UucmVzdWx0Um93cylcclxuICAgIC8vICAgICAgICAgICAgICAgIC8vbGV0IGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQvKkdldENvbnRlbnRTZXpuYW0oKSovKTtcclxuICAgIC8vICAgICAgICAgICAgICAgIHZhciBteUdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgaWYgKG15R3JpZCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0VmlldyhteUdyaWQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgY29udGVudFBydXZvZGNlLnJlc3VsdFJvd3MuZm9yRWFjaChmdW5jdGlvbiAobWV0YSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIHZhciBha3RSYWRlayA9IHZpZXcuZmluZEJ5S2V5KG1ldGEuaXhwIGFzIGFueSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBha3RSYWRlayAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgYWt0UmFkZWsuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgIG15R3JpZC5nZ3JpZChcInJlZnJlc2hSb3dzXCIpO1xyXG4gICAgLy8gICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICwgeyBzZWxlY3RlZFJvd3M6IG96bmFjZW5lUmFka3kgfSkgICAgICAgIFxyXG4gICAgLy99XHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiBVemF2cmVuaSB2c2VjaCBkb2tsYWR1XHJcbiAgICAvLyAqIEBwYXJhbSB7R1VjdFNlem5hbX0gY29udGVudFxyXG4gICAgLy8gKi9cclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIFV6YXZyZW5pVnNlY2hEb2tsYWR1KGNvbnRlbnQ6IEdVY3RTZXpuYW0pIHtcclxuICAgIC8vICAgIGlmIChjb250ZW50LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgLy8gICAgdmFyIGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgLy8gICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybjtcclxuICAgIC8vICAgIFV6YXZyZW5pRG9rbGFkdShjb250ZW50LCBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0QWxsUm93cyhncmlkKSwgdHJ1ZSk7XHJcbiAgICAvL31cclxuXHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiAgVXphdnJlbmkgdnlicmFueWNoIGRva2xhZHVcclxuICAgIC8vICogQHBhcmFtIHtHVWN0U2V6bmFtfSBjb250ZW50XHJcbiAgICAvLyAqL1xyXG4gICAgLy9leHBvcnQgZnVuY3Rpb24gVXphdnJlbmlWeWJyYW55Y2hEb2tsYWR1KGNvbnRlbnQ6IEdVY3RTZXpuYW0pIHtcclxuICAgIC8vICAgIGlmIChjb250ZW50LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgLy8gICAgdmFyIGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgLy8gICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybjtcclxuICAgIC8vICAgIFV6YXZyZW5pRG9rbGFkdShjb250ZW50LCBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG8+KGdyaWQsIGZhbHNlKSBhcyBhbnksZmFsc2UpO1xyXG5cclxuICAgIC8vfVxyXG5cclxuICAgIC8vLyoqXHJcbiAgICAvLyAqIFZsYXN0bmkgdXphdnJlbmkgZG9rbGFkdVxyXG4gICAgLy8gKiAgXHJcbiAgICAvLyAqIGZ1bmN0aW9uIFV6YXZyZW5pRG9rbGFkdVxyXG4gICAgLy8gKiBcclxuICAgIC8vICogQHBhcmFtIHtHb3JkaWMuRWtvLkludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b1tdfSBkb2tsYWR5XHJcbiAgICAvLyAqL1xyXG4gICAgLy9mdW5jdGlvbiBVemF2cmVuaURva2xhZHUoY29udGVudDogR1VjdFNlem5hbSwgZG9rbGFkeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9bXSwgaHJvbWFkbmU6IGJvb2xlYW4pXHJcbiAgICAvL3tcclxuICAgIC8vICAgIGxldCB0aGF0ID0gY29udGVudDtcclxuICAgIC8vICAgIGlmIChkb2tsYWR5ID09PSBudWxsIHx8IGRva2xhZHkgPT09IHVuZGVmaW5lZCB8fCBkb2tsYWR5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAvLyAgICAgICAgY29udGVudC5kaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDAzNVwiLCAvL1JDIDMwMjUwMDM1IDogVXBvem9ybsSbbsOtXHJcbiAgICAvLyAgICAgICAgICAgIFwianJlczozMDI1MDMzNFwiKTsgIC8vUkMgMzAyNTAzMzQgOiBOZW5hbGV6ZW55IMW+w6FkbsOpIG96bmHEjWVuw6kgxZnDoWRreVxyXG4gICAgLy8gICAgICAgIHJldHVybjtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgIEVLT1V0aWxzLmNhbGxPdGhlckNvbnRlbnQoY29udGVudCwgXCJHVWN0SHJvbWFkbmVVemF2cmVuaVwiLCBcIlVjdFwiLFxyXG4gICAgLy8gICAgICAgIChjbnREaXYsIGNvbnRlbnRQcnV2b2RjZTogR1VjdEhyb21hZG5lVXphdnJlbmkpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnRQcnV2b2RjZSE9PVwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnRlbnRQcnV2b2RjZS5zdWNjZXNzQ2xvc2UgPT09IFwiYm9vbGVhblwiICYmIGNvbnRlbnRQcnV2b2RjZS5zdWNjZXNzQ2xvc2UgPT09IHRydWUpIHtcclxuICAgIC8vICAgICAgICAgICAgICAvLyByZWZyZXNoIHNlem5hbXVcclxuICAgIC8vICAgICAgICAgICAgICBpZiAoaHJvbWFkbmUpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgIC8vIG5hY3RlIHZzZSB6bm92dVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICBSZWxvYWQodGhhdCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgZWxzZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICByZWZyZXNSb3coY29udGVudCwgY29udGVudFBydXZvZGNlLnJlc3VsdFJvd3MpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgIGlmICghaHJvbWFkbmUpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgLy9sZXQgZ3JpZCA9IEdldEdyaWQoR2V0Q29udGVudFNlem5hbSgpKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRWaWV3KGdyaWQpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgIGNvbnRlbnRQcnV2b2RjZS5yZXN1bHRSb3dzLmZvckVhY2goZnVuY3Rpb24gKG1ldGEpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgIHZhciBha3RSYWRlayA9IHZpZXcuZmluZEJ5S2V5KG1ldGEuaXhwIGFzIGFueSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFrdFJhZGVrIT09XCJ1bmRlZmluZWRcIilcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICBha3RSYWRlay5jaGVja2VkID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcInJlZnJlc2hSb3dzXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgLCB7IHNlbGVjdGVkUm93czogZG9rbGFkeSB9KVxyXG4gICAgLy8gICAgICAgIDsgICAgICAgIFxyXG4gICAgLy99XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIcm9tYWRuZSBvcGVyYWNlXHJcbiAgICAgKiAgXHJcbiAgICAgKiBmdW5jdGlvbiBIcm9tYWRuZU9wZXJhY2VcclxuICAgICAqIFxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEhyb21hZG5lT3BlcmFjZShjb250ZW50OiBHVWN0U2V6bmFtLCB0eXBPcGVyYWNlOiBJbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY29udGVudC5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICB2YXIgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAvLyB6amlzdGVuaSBvem5hY2VueWNoIHJhZGt1XHJcbiAgICAgICAgbGV0IG96bmFjZW5lUmFka3kgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG8+KGdyaWQsIGZhbHNlKTtcclxuICAgICAgICAvLyBkZWZpbmljZSBha2NlIGRldGFpbFxyXG4gICAgICAgIHZhciBncmlkQWN0aW9uRGV0YWlsID0gbmV3IEdBY3Rpb24oJC5leHRlbmQodHJ1ZSwgR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY250ID0gJC5jb250ZW50KGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAkZ3JpZCA9ICQoY3R4LmdyaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRncmlkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb2hsZWTDoW7DrSBha3R1w6FsbsOtaG8gesOhem5hbXUgYSB6b2JyYXplbsOtIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBha3RSYWRlazogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG8gPSAoJGdyaWQgYXMgYW55KS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWt0UmFkZWsgJiYgIShha3RSYWRlayBpbnN0YW5jZW9mIGpRdWVyeSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5VY3QuV2ViQ2xpZW50LlpvYnJhekRldGFpbERsZUlYUCh7IGNvbnRlbnQ6IGNudCwgbmV3TW9kZTogY29udGVudC5kZWJ1Z01vZGUsIGl4cDogYWt0UmFkZWsuaXhwISwgc2Ftb3N0YW5lT2tubzogZmFsc2UsIGVkaXRhY2U6IGZhbHNlLCBpeHBEZW46IGFrdFJhZGVrLml4cF9kZW4hLCBwb2xvemt5OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5ab2JyYXpEZXRhaWxEbGVJWFBPbGQoY250LCBha3RSYWRlay5peHAgYXMgYW55LCBmYWxzZSwgZmFsc2UsIHZvaWQgMCwgdm9pZCAwLCBha3RSYWRlay5peHBfZGVuIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ab2JyYXpEZXRhaWwoY250LCBha3RSYWRlaylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgIH0pLCB7IG5hbWU6IFwiYWN0RGV0YWlsXCIgfSkpO1xyXG5cclxuICAgICAgICBpZiAob3puYWNlbmVSYWRreSA9PT0gbnVsbCB8fCBvem5hY2VuZVJhZGt5ID09PSB1bmRlZmluZWQgfHwgb3puYWNlbmVSYWRreS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMwMjUwMDM1XCIsIC8vUkMgMzAyNTAwMzUgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDMzNFwiKTsgIC8vUkMgMzAyNTAzMzQgOiBOZW5hbGV6ZW55IMW+w6FkbsOpIG96bmHEjWVuw6kgxZnDoWRreVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2xldCBvcGVyYWNlOiBzdHJpbmc7IFxyXG4gICAgICAgIHN3aXRjaCAodHlwT3BlcmFjZSkge1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmVldmlkZW5jZTpcclxuICAgICAgICAgICAgICAgIEhyb21hZG5hQWtjaVJ1bihjb250ZW50LCBvem5hY2VuZVJhZGt5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmVldmlkZW5jZSxcclxuICAgICAgICAgICAgICAgICAgICBJRFNlc3Rhdnk6IDEyXHJcbiAgICAgICAgICAgICAgICAgICAgLCBhY3Rpb05hbWU6IFwianJlczozMDI1MDc4M1wiLCAvL1JDIDMwMjUwNzgzIDogUMWZZWV2aWRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDc4MlwiLCAvL1JDIDMwMjUwNzgyIDogQWtjZSBwcm92ZWRlIHDFmWVldmlkZW5jaSB2eWJyYW7DvWNoIGRva2xhZMWvIGRvIGppbsOpIGtuaWh5LiBQxZlpIHDFmWVldmlkZW5jaSBqZSBtb8W+bsOpIHptxJtuaXQgWnByYWNvdmF0ZWxlLCBwxZnDrXBhZG7EmyBLb21wZXRlbnRhLlxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0UHJpbnRQYXJhbWV0ZXJzOlNlcnZlclBhcmFtZXRlck1ldGhvZFRpc2t5TmFTZXpuYW11XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmtcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNzgxXCIsIC8vUkMgMzAyNTA3ODEgOiBQxZllZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZUJyZWFkQ3J1bWI6IFwianJlczozMDI1MDc4MFwiIC8vUkMgMzAyNTA3ODAgOiBQxZllZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgIH0sIGdyaWRBY3Rpb25EZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAvL1ByZWV2aWRvdmF0KGNvbnRlbnQsIG96bmFjZW5lUmFka3kgYXMgYW55LCBncmlkQWN0aW9uRGV0YWlsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuUHJldnpldGk6XHJcbiAgICAgICAgICAgICAgICBIcm9tYWRuYUFrY2lSdW4oY29udGVudCwgb3puYWNlbmVSYWRreSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuUHJldnpldGksXHJcbiAgICAgICAgICAgICAgICAgICAgSURTZXN0YXZ5OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgLCBhY3Rpb05hbWU6IFwianJlczozMDI1MDc4OFwiLCAvL1JDIDMwMjUwNzg4IDogUMWZZXZ6w610XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDc4OVwiLCAvL1JDIDMwMjUwNzg5IDogQWtjZSBwcm92ZWRlIHDFmWV2emV0w60gdnlicmFuw71jaCAoemHFoWtydG51dMO9Y2gpIGRva2xhZMWvIG9kIGppbsOpaG8genByYWNvdmF0ZWxlLiBQxZlpIHDFmWV2emV0w60gamUgcMWZw61wYWRuxJsgbW/Fvm7DqSB6bcSbbml0IEtvbXBldGVudGEgZG9rbGFkdS5cclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmRcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNzkwXCIsIC8vUkMgMzAyNTA3OTAgOiBQxZlldnrDrXRcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZUJyZWFkQ3J1bWI6IFwianJlczozMDI1MDc5MVwiIC8vUkMgMzAyNTA3OTEgOiBQxZlldnrDrXRcclxuICAgICAgICAgICAgICAgIH0sIGdyaWRBY3Rpb25EZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAvL1ByZXZ6aXQoY29udGVudCwgb3puYWNlbmVSYWRreSBhcyBhbnksIGdyaWRBY3Rpb25EZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5Qcm91Y3RvdmFuaTpcclxuICAgICAgICAgICAgICAgIFphdWN0b3ZhdChjb250ZW50LCBvem5hY2VuZVJhZGt5LCBncmlkQWN0aW9uRGV0YWlsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuVXphdnJlbmk6XHJcbiAgICAgICAgICAgICAgICBVemF2cml0KGNvbnRlbnQsIG96bmFjZW5lUmFka3ksIGdyaWRBY3Rpb25EZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmlkZWxlbmk6XHJcbiAgICAgICAgICAgICAgICBIcm9tYWRuYUFrY2lSdW4oY29udGVudCwgb3puYWNlbmVSYWRreSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuUHJpZGVsZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgIElEU2VzdGF2eTogMFxyXG4gICAgICAgICAgICAgICAgICAgICwgYWN0aW9OYW1lOiBcImpyZXM6MzAyNTA3OTJcIiwgLy9SQyAzMDI1MDc5MiA6IFDFmWlkxJtsaXRcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNzkzXCIsIC8vUkMgMzAyNTA3OTMgOiBQxZlpZMSbbGl0IGRva2xhZHkgamluw6kgZnVua2NpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcIndmbF9wdG1faHJvbXByZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA3OTRcIiwgLy9SQyAzMDI1MDc5NCA6IFDFmWlkxJtsaXRcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZUJyZWFkQ3J1bWI6IFwianJlczozMDI1MDc5NFwiIC8vUkMgMzAyNTA3OTQgOiBQxZlpZMSbbGl0XHJcbiAgICAgICAgICAgICAgICB9LCBncmlkQWN0aW9uRGV0YWlsKVxyXG4gICAgICAgICAgICAgICAgLy9QcmlkZWxpdChjb250ZW50LCBvem5hY2VuZVJhZGt5IGFzIGFueSwgZ3JpZEFjdGlvbkRldGFpbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlByZWRhbmk6XHJcbiAgICAgICAgICAgICAgICBIcm9tYWRuYUFrY2lSdW4oY29udGVudCwgb3puYWNlbmVSYWRreSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuUHJlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICBJRFNlc3Rhdnk6IDIyXHJcbiAgICAgICAgICAgICAgICAgICAgLCBhY3Rpb05hbWU6IFwianJlczozMDI1MDc4NFwiLCAvL1JDIDMwMjUwNzg0IDogUMWZZWRhdFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA3ODVcIiwgLy9SQyAzMDI1MDc4NSA6IEFrY2UgcHJvdmVkZSBwxZllZMOhbsOtIHZ5YnJhbsO9Y2ggKHphxaFrcnRudXTDvWNoKSBkb2tsYWTFryBqaW7DqW11IHpwcmFjb3ZhdGVsaS4gUMWZaSBwxZllZMOhbsOtIGplIHDFmcOtcGFkbsSbIG1vxb5uw6kgem3Em25pdCBLb21wZXRlbnRhIGRva2xhZHUuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3RQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcIndmbF9wdG1faHJvbXByZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA3ODZcIiwgLy9SQyAzMDI1MDc4NiA6IFDFmWVkw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICB0aXRsZUJyZWFkQ3J1bWI6IFwianJlczozMDI1MDc4N1wiIC8vUkMgMzAyNTA3ODcgOiBQxZllZMOhbsOtXHJcbiAgICAgICAgICAgICAgICB9LCBncmlkQWN0aW9uRGV0YWlsKVxyXG4gICAgICAgICAgICAgICAgLy9QcmVkYXQoY29udGVudCwgb3puYWNlbmVSYWRreSBhcyBhbnksIGdyaWRBY3Rpb25EZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5Lb250cm9sYU1ldGFkYXQ6XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLktvbnRyb2xhTWV0YWRhdCh7IGNvbnRlbnQ6IGNvbnRlbnQsIGxpc3RJeHA6IG96bmFjZW5lUmFka3kubWFwKChyb3cpID0+IHJvdy5peHAhKSwgZGV0YWlsQWtjZTpab2JyYXpEZXRhaWxJeHAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZGlhbG9ncy5hbGVydChcImpyZXM6MzAyNTAwMzVcIiwgLy9SQyAzMDI1MDAzNSA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDM3NFwiKTsgIC8vUkMgMzAyNTAzNzQgOiBOZXpuw6Ftw6Egb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICAgICogU3B1c3RlbmkgaHJvbWFkbmUgb3BlcmFjZVxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHNlbGVjdGVkUm93c1xyXG4gICAgICAgICAqIEBwYXJhbSBkZXRhaWxBa2NlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEhyb21hZG5hQWtjaVJ1bihjb250ZW50OiBHVWN0U2V6bmFtLCBzZWxlY3RlZFJvd3M6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvW11cclxuICAgICAgICAsIG5hc3RhdmVuaTogSUdIcm9tYWRuZU9wZXJhY2UsIGRldGFpbEFrY2U6IEdBY3Rpb24pIHtcclxuICAgICAgICB2YXIgdGhhdCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIGxldCBjbnRXaXo6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIHZhciBhY3RUaXNrSHJvbWFkbmFBa2NlID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICBuYW1lOiBcImFjdFNlbGVjdFwiLCB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY2FwdGlvbjogXCJcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobmFzdGF2ZW5pLklEU2VzdGF2eSA+IDApIHtcclxuICAgICAgICAgICAgYWN0VGlza0hyb21hZG5hQWtjZSA9IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrSHJvbWFkbmFBa2NlXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBuYXN0YXZlbmkudGVtYSwgXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IG5hc3RhdmVuaS5zZXJ2ZXJQYXJhbWV0ZXJNZXRob2QsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogbmFzdGF2ZW5pLklEU2VzdGF2eSAhPSAwLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhhdCxcclxuICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY250V2l6KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2l6ID0gY250V2l6LmZpbmQoXCIuZ2dyaWRcIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRncmlkID0gJCh3aXopO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V6bmFtID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPigkZ3JpZCwgdHJ1ZSkgYXMgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIEhyb21hZG5hT3BlcmFjZUdldFBhcmFtKCB0aGF0LmRpYWxvZ3MsIGNudFdpeiwgc2V6bmFtKVxyXG4gICAgICAgICAgICAgICAgICAgIC8qaGF0LmdldFBhcmFtUHJlZXZpZCh0aGF0LCBjbnRXaXosIHNlem5hbSkqLy50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgVGVtYTogcmVwLnRlbWEsIElEU2VzdGF2eTogbmFzdGF2ZW5pLklEU2VzdGF2eSwgU2V6bmFtUGlkdTogc2V6bmFtLCBEYXRhOiByZXN1bHQgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy9nZXRQYXJhbVByZWRhdCh0aGF0LCBjbnRXaXosIHNlem5hbSkuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcmVwLmN1c3RvbUR0byA9IHsgVGVtYTogcmVwLnRlbWEsIElEU2VzdGF2eTogMjIsIFNlem5hbVBpZHU6IHNlem5hbSwgRGF0YTogcmVzdWx0IH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZGVmLnJlc29sdmUocmVwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1vZGVsRGF0YTogSUdQcmVldmlkZW5jZU1vZGVsID0geyBkdXZvZDogdm9pZCAwLCBpeHNfZnVuX2FrdDogXCJcIiwgaXhzX3N1OiBcIlwiLCBpeHNfcmVmOiBcIlwiLCBjaXNfcmVhbDogXCJcIiwgaXhzX2Z1bl92eXJpejogXCJcIiwgaXhwX2RlbjogXCJcIiwgc3VicmFkYTogbnVsbCB9O1xyXG4gICAgICAgIGxldCBmb3JtUGFyYW1zID0gSHJvbWFkbmFPcGVyYWNlZm9ybShuYXN0YXZlbmkuYWN0aW9uLCBjb250ZW50LCBjb250ZW50LmVrb0Jvb2suaXhwX2RlbiEpO1xyXG4gICAgICAgIC8vUHJlZGF0Rm9ybShjb250ZW50LCB0aGF0Lkl4c1N1LCBnZXRJeHBEZW4odGhhdCkgPyBnZXRJeHBEZW4odGhhdCkgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgIGNudFdpeiA9IHRoYXQubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aXR1bGVrIHYgYnJlYWRjcnVtYnVcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBuYXN0YXZlbmkudGl0bGUsIC8vUkMgMzAyNTA2ODQgOiBQxZllZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAvLyBmb3Jtw6F0IGdyaWR1XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBjcmVhdGVHcmlkRm9ybWF0SHJvbWFkbmVPcGVyYWNlKCksXHJcbiAgICAgICAgICAgICAgICAvLyBwcmltw6FybsOtIGtsw63EjSBkYXQgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAga2V5czogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIC8vIGRhdGEgcHJvIGdyaWQgKHBybyBwcnZuw60ga3JvaylcclxuICAgICAgICAgICAgICAgIGRhdGE6IFNldERhdGFTZWxlY3RlZChzZWxlY3RlZFJvd3MpLC8vTG9hZERhdGEoY29udGVudC5pc2wuVWN0RG9rbGFkLnZhbGlkb3ZhdFByb1ByZWRhdCh7IFNlem5hbTogc2VsZWN0ZWRSb3dzIGFzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvW10gfSkpLC8vIHNlbGVjdGVkUm93cyBhcyBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0b1tdLC8vTG9hZERhdGFQcmVkYXQoY29udGVudCwgc2VsZWN0ZWRSb3dzIGFzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvW10pLFxyXG4gICAgICAgICAgICAgICAgLy8gdHlwIGluZGlrw6F0b3LFryBuYWQgZ3JpZGVtIChLUEkgbmVibyBiYWRnZSlcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJ2bsOtIGtyb2sgLSB6YWTDoW7DrSBwYXJhbWV0csWvIGEga29udHJvbGEsIHDFmWkgcMWZZWNob2R1IG5hIGRhbMWhw60ga3JvayBzZSB6YXZvbMOhIHNwdcWhdMSbbsOtIHZsYXN0bsOtIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG7DoXpldiBrcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA3NzZcIiwgLy9SQyAzMDI1MDc3NiA6IFphZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9waXMgb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBuYXN0YXZlbmkuZGVzY3JpcHRpb24sIC8vUkMgMzAyNTA2NDkgOiBBa2NlIHByb3ZlZGUgcMWZZWTDoW7DrSB2eWJyYW7DvWNoICh6YcWha3J0bnV0w71jaCkgZG9rbGFkxa8gamluw6ltdSB6cHJhY292YXRlbGkuIFDFmWkgcMWZZWTDoW7DrSBqZSBwxZnDrXBhZG7EmyBtb8W+bsOpIHptxJtuaXQgS29tcGV0ZW50YSBkb2tsYWR1LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hZCBncmlkZW0gem9icmF6aXQgS1BJL2JhZGdlIHMgcG/EjXR5IHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9ybXVsw6HFmSBzIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1QYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kZWwgcHJvIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogbW9kZWxEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mb3JtVGFiVGl0bGU6IFwiUGFyYW1ldHJ5IHN0b3JuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzAyNTA3NzdcIiwgLy9SQyAzMDI1MDc3NyA6IFZ5YnJhbsOpIGRva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIHptxJtueSBwYXJhbWV0cnVcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZENoYW5nZURlbGVnYXRlOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gc3B1c3Rlbmkga29udHJvbHUgdXppdmF0ZWxlbVxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhID0gbW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50LmlzbC5VY3REb2tsYWQuaHJvbWFkbmVPcGVyYWNlVmFsaWRhY2Uoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrY2U6IG5hc3RhdmVuaS5hY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgU2V6bmFtOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEl4cERlbk5ldzogbW9kZWwuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBJeHNGdW5OZXc6IG1vZGVsLml4c19mdW5fYWt0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEl4c1JlZk5ldzogbW9kZWwuaXhzX3JlZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBDaXNSZWFsOiBtb2RlbC5jaXNfcmVhbFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYgYWtjZSwga3RlcsOhIHByb3ZlZGUgcG/FvmFkb3Zhbm91IG9wZXJhY2kgKHRsYcSNw610a28gdnByYXZvIGRvbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IG5hc3RhdmVuaS5hY3Rpb05hbWUsIC8vUkMgMzAyNTA2NTAgOiBQxZllZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWV0b2RhIHZvbGFuw6EgcMWZaSBwxZllY2hvZHUgbmEgZGFsxaHDrSBrcm9rIChwcm92ZWRlbsOtIHZsYXN0bsOtIG9wZXJhY2UpIChwcmFjdWplIG5hZCBkYXR5IHplIHZzdHVwdSwgdnJhY8OtIGFrdHXDoWxuw60gZGF0YSB6IGRhdGFiw6F6ZSArIHbDvXNsZWRlayBvcGVyYWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGEgPSBtb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlVjdERva2xhZC5ocm9tYWRuZU9wZXJhY2Uoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrY2U6IG5hc3RhdmVuaS5hY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgU2V6bmFtOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIER1dm9kOiBtb2RlbERhdGEuZHV2b2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgSXhzRnVuTmV3OiBtb2RlbERhdGEuaXhzX2Z1bl9ha3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgaXhwRGVuOiBnZXRJeHBEZW4odGhhdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgSXhzU3U6IG1vZGVsRGF0YS5peHNfc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgQ2lzUmVhbDogbW9kZWxEYXRhLmNpc19yZWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEl4cERlbk5ldzogbW9kZWxEYXRhLml4cF9kZW5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEl4c1JlZk5ldzogbW9kZWxEYXRhLml4c19yZWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgSXhzRnVuVnlyaXo6IG1vZGVsRGF0YS5peHNfZnVuX3Z5cml6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29udGVudC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwNjQ3XCIgfSkgLy9SQyAzMDI1MDY0NyA6IEFrY2UgcHJvdmVkZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBha2NlIG5hIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBkZXRhaWxBa2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGFjdFRpc2tIcm9tYWRuYUFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAvLyBha2NlIHZvbGFuw6EgbmEgZHZvamtsaWsgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGRldGFpbEFrY2VcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZHJ1aMO9IChwb3NsZWRuw60pIGtyb2sgLSB6b2JyYXplbsOtIHbDvXNsZWRrdSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYga3Jva3VcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNzc4XCIsIC8vUkMgMzAyNTA3NzggOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3JtdWzDocWZIHMgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybVBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICAvLyBtb2RlbCBwcm8gcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiAoKSA9PiB7IHJldHVybiBtb2RlbERhdGE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFkcGlzIHRhYnUgcyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICAvL2Zvcm1UYWJUaXRsZTogXCJQYXJhbWV0cnkgc3Rvcm5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IGpzb3UgdiB0b210byBrcm9rdSBqacW+IG5lZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZUZvcm1GaWVsZHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzAyNTA3NzlcIiwgLy9SQyAzMDI1MDc3OSA6IFpwcmFjb3ZhbsOpIGRva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICAvLyBha2NlIG5hIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBkZXRhaWxBa2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSB2b2xhbsOhIG5hIGR2b2prbGlrIHYgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBkZXRhaWxBa2NlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgw7pzcMSbxaFuw6lobyB1a29uxI1lbsOtIHByxa92b2RjZSAobmEgcm96ZMOtbCBvZCB6cnXFoWVuw60gcHLFr3ZvZGNlIHDFmWVzZWxla3RvdsOhdsOhIHNlem5hbSlcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFJvd3NGcm9tREIoY29udGVudCwgdmlldy5nZXREYXRhUm93cyhmYWxzZSkpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIHpydcWhZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgIGNhbmNlbERlbGVnYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9GdWNHcmlkLndpemFyZEVuZCh0aGF0LCBpa2MsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbmFzdGF2ZW5pLnRpdGxlQnJlYWRDcnVtYixcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjbnRXaXoudHJpZ2dlcihcImZvY3VzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiAgRGVmaW5pY2Ugc2xvdXBjdVxyXG4gICAgKiBjcmVhdGVDb2x1bW5zXHJcbiAgICAqIFxyXG4gICAgKiBAcmV0dXJucyB7R29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0c2VsZWN0ZWRSb3dzRHRvPn1cclxuICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JpZEZvcm1hdEhyb21hZG5lT3BlcmFjZShyZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZSwgd2l0aFJlc3VsdEF0cmlidXRzOiBib29sZWFuID0gdHJ1ZSk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG8+IHtcclxuICAgICAgICB2YXIgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPigpXHJcblxyXG4gICAgICAgICAgICAuYWRkUGlkKClcclxuXHJcbiAgICAgICAgICAgIC5hZGRBZ2VuZG92ZUNpc2xvKClcclxuICAgICAgICAgICAgLmFkZEV2aWRlbmNuaUNpc2xvKClcclxuICAgICAgICAgICAgLmFkZERydWhEb2tsYWR1KClcclxuICAgICAgICAgICAgLmFkZFJvaygpXHJcbiAgICAgICAgICAgIC5hZGRNZXNpYygpXHJcbiAgICAgICAgICAgIC5hZGREZW4oKVxyXG4gICAgICAgICAgICAuYWRkQ2lzbG9Eb2tsYWR1KHsgbmFtZTogXCJhY19peGVcIiwgZmllbGQ6IFwiYWNfaXhlXCIgfSlcclxuICAgICAgICAgICAgLmFkZFR5cERva2xhZHUoeyBuYW1lOiBcImt0Z1R5cE5hemV2XCIsIGZpZWxkOiBcImt0Z1R5cE5hemV2XCIgfSlcclxuICAgICAgICAgICAgLmFkZFN0YXZEb2tsYWR1KHsgbmFtZTogXCJzdGF2X3R4dFwiLCBmaWVsZDogXCJzdGF2X3R4dFwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRDYXN0a2EoeyBuYW1lOiBcImNcIiwgZmllbGQ6IFwiY1wiIH0pXHJcbiAgICAgICAgICAgIC5hZGRNRCh7IGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuYzAgfSlcclxuICAgICAgICAgICAgLmFkZERhbCh7IGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuYzEgfSlcclxuICAgICAgICAgICAgLmFkZFpwcmFjb3ZhdGVsKHsgbmFtZTogXCJpeHNfZnVuX25hemV2XCIsIGZpZWxkOiBcIml4c19mdW5fbmF6ZXZcIiwgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5peHNfZnVuX25hemV2IH0pXHJcbiAgICAgICAgICAgIC5hZGRQb3BpcygpO1xyXG4gICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBOYWN0ZW5pIGRva2xhZHUgayBwcmV2emV0aVxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSBzZWxlY3RlZFJvd3NcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gTG9hZERhdGEodGFza0xpc3Q6IElzbC5fVGFzazxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+KTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0b1tdPiB7XHJcbiAgICAgICAgLy9sZXQgZGVmQ2xvc2UgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLy9sZXQgdGFza0xpc3QyOiBJc2wuX1Rhc2s8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRhc2tMaXN0XHJcbiAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdFJvd3MpIHtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZkNsb3NlLnJlc29sdmUocmVzdWx0Um93cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Um93cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8sXHJcbiAgICAgICAgICAgICAgICAvL2Z1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgLy8uZmFpbChmdW5jdGlvbiAoKSB7IHJldHVybiBkZWZDbG9zZS5yZWplY3QoKTsgfSlcclxuICAgICAgICAgICAgO1xyXG4gICAgICAgIC8vcmV0dXJuIGRlZkNsb3NlLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogT3puYWNlbmkgZG9rbGFkdSBcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gc2VsZWN0ZWRSb3dzXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFNldERhdGFTZWxlY3RlZChzZWxlY3RlZFJvd3M6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvW10pOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvW10+IHsgICAgICAgIFxyXG4gICAgICAgIHNlbGVjdGVkUm93cy5mb3JFYWNoKChyb3cpID0+IHsgcm93W1wid2l6X2NoZWNrXCJdID0gdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoc2VsZWN0ZWRSb3dzKS5wcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYmNlcnN0dmVuaSBuZWFrdGl2bmkgcmFka3VcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcmVmcmVzaFJvd3MoY29udGVudDogR1VjdFNlem5hbSwpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjb250ZW50ID09PSBudWxsKVxyXG4gICAgICAgICAgICBjb250ZW50ID0gR2V0Q29udGVudFNlem5hbSgpO1xyXG4gICAgICAgIC8vIHRlc3QgbmEgZXhpc3RlbmNpIGNvbnRlbnR1IGEgemRhIG5lbmkgdXphdnJlblxyXG4gICAgICAgIGlmIChjb250ZW50ID09PSBudWxsIHx8IGNvbnRlbnQuY2xvc2VkKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAvLyB0ZXN0IG5hIHJhZGt5IGsgYWt0dWFsaXphY2VcclxuICAgICAgICBpZiAoY29udGVudC5yZWZyZXNoUm93cy5sZW5ndGggPT09IDApIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gcmVmcmVzaFJvd3NGcm9tREIoY29udGVudCwgY29udGVudC5yZWZyZXNoUm93cyk7XHJcbiAgICAgICAgcmVzdWx0LnRoZW4oKCkgPT4gY29udGVudC5yZWZyZXNoUm93cyA9IFtdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWt0dWFsaXphY2UgemFzbGFueWNoIHphcGlzdSB6IERCIGRvIGdyaWR1XHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHBhcmFtIGRva2xhZHlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hSb3dzRnJvbURCKGNvbnRlbnQ6IEdVY3RTZXpuYW0sIGRva2xhZHk6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b1tdKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyBrb250cm9seVxyXG4gICAgICAgIGlmKCFkb2tsYWR5IHx8IGRva2xhZHkubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgY29udGVudCA9PT0gbnVsbClcclxuICAgICAgICAgICAgY29udGVudCA9IEdldENvbnRlbnRTZXpuYW0oKTtcclxuICAgICAgICBpZiAoY29udGVudCA9PT0gbnVsbCB8fCBjb250ZW50LmNsb3NlZCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gemppc3RlbmkgZ3JpZHVcclxuICAgICAgICBsZXQgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vIHpqaXN0ZW5pIHZpZXdcclxuICAgICAgICBsZXQgdmlldyA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRWaWV3KGdyaWQpO1xyXG4gICAgICAgIGlmICh2aWV3ID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgLy8gcHJla29waXJvdmFuaSBwaWR1IHplIHphc2xhbnljaCByYWRrdSBkbyBwb2xlXHJcbiAgICAgICAgbGV0IHBvbGVJeHAgPSBkb2tsYWR5Lm1hcCgocmFkZWspID0+IHJhZGVrLml4cCEpO1xyXG4gICAgICAgIC8vcmV0dXJuIFJlbG9hZFJvd0Zyb21EQihjb250ZW50LCBwb2xlSXhwKTtcclxuICAgICAgICByZXR1cm4gdmlldy5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IHsgaXhwOiB7IG86IFwiSU5cIiwgdjogcG9sZUl4cCB9IH0gfSwgeyB1cGRhdGVNb2RlOiBcInVwZGF0ZVwiIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQuY2xvc2VkKSBHZXRHcmlkKGNvbnRlbnQpPy5nZ3JpZChcImFjdGl2ZVJvd1wiLCB7IGl4cDogZG9rbGFkeVswXS5peHAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIEFrY2UgdXphdnJpdCBkb2tsYWR5XHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHBhcmFtIHNlbGVjdGVkUm93c1xyXG4gICAgICogQHBhcmFtIGRldGFpbEFrY2VcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gVXphdnJpdChjb250ZW50OiBHVWN0U2V6bmFtLCBzZWxlY3RlZFJvd3M6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvW10sIGRldGFpbEFrY2U6IEdBY3Rpb24pIHtcclxuICAgICAgICB2YXIgdGhhdCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIHRoYXQubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHRpdHVsZWsgdiBicmVhZGNydW1idVxyXG4gICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNTc4XCIsIC8vUkMgMzAyNTA1NzggOiBVemF2xZnDrXRcclxuICAgICAgICAgICAgLy8gZm9ybcOhdCBncmlkdVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0OiBjcmVhdGVHcmlkRm9ybWF0SHJvbWFkbmVPcGVyYWNlKCksLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5QcnV2b2RjZS5jcmVhdGVDb2x1bW5zKGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgICAgIC8vIHByaW3DoXJuw60ga2zDrcSNIGRhdCB2IGdyaWR1XHJcbiAgICAgICAgICAgIGtleXM6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgIC8vIGRhdGEgcHJvIGdyaWQgKHBybyBwcnZuw60ga3JvaylcclxuICAgICAgICAgICAgZGF0YTogU2V0RGF0YVNlbGVjdGVkKHNlbGVjdGVkUm93cyksXHJcbiAgICAgICAgICAgICAgICAvL0xvYWREYXRhKGNvbnRlbnQuaXNsLlVjdERva2xhZC52YWxpZG92YXRQcm9VemF2cmVuaSh7IFNlem5hbTogc2VsZWN0ZWRSb3dzICB9KSksXHJcbiAgICAgICAgICAgIC8vIHR5cCBpbmRpa8OhdG9yxa8gbmFkIGdyaWRlbSAoS1BJIG5lYm8gYmFkZ2UpXHJcbiAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcblxyXG4gICAgICAgICAgICAvLyBwcnZuw60ga3JvayAtIHphZMOhbsOtIHBhcmFtZXRyxa8gYSBrb250cm9sYSwgcMWZaSBwxZllY2hvZHUgbmEgZGFsxaHDrSBrcm9rIHNlIHphdm9sw6Egc3B1xaF0xJtuw60gdmxhc3Ruw60gb3BlcmFjZVxyXG4gICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgIC8vIG7DoXpldiBrcm9rdVxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDU3NVwiLCAvL1JDIDMwMjUwNTc1IDogWmFkw6Fuw61cclxuICAgICAgICAgICAgICAgIC8vIHBvcGlzIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA1NzdcIiwgLy9SQyAzMDI1MDU3NyA6IFV6YXbFmWVuw60gZG9rbGFkxa8uIFMgdXphdsWZZW7DvW1pIGRva2xhZHkgamnFviBuZWpkZSBkw6FsZSBwcmFjb3ZhdFxyXG4gICAgICAgICAgICAgICAgLy8gbmFkIGdyaWRlbSB6b2JyYXppdCBLUEkvYmFkZ2UgcyBwb8SNdHkgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gZm9ybXVsw6HFmSBzIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgLy9mb3JtOiBmb3JtUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgLy8gbW9kZWwgcHJvIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgLy9tb2RlbERhdGE6IG1vZGVsRGF0YSxcclxuICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAvL2Zvcm1UYWJUaXRsZTogXCJQYXJhbWV0cnkgc3Rvcm5hXCIsXHJcbiAgICAgICAgICAgICAgICAvLyBuYWRwaXMgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzAyNTA1NzBcIiwgLy9SQyAzMDI1MDU3MCA6IFZ5YnJhbsOpIGRva2xhZHlcclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgem3Em255IHBhcmFtZXRydVxyXG4gICAgICAgICAgICAgICAgZmllbGRDaGFuZ2VEZWxlZ2F0ZTogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gc3B1c3Rlbmkga29udHJvbHkgdXppdmF0ZWxlbVxyXG4gICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBMb2FkRGF0YShjb250ZW50LmlzbC5VY3REb2tsYWQudmFsaWRvdmF0UHJvVXphdnJlbmkoeyBTZXpuYW06IGRhdGEgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBuw6F6ZXYgYWtjZSwga3RlcsOhIHByb3ZlZGUgcG/FvmFkb3Zhbm91IG9wZXJhY2kgKHRsYcSNw610a28gdnByYXZvIGRvbGUpXHJcbiAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJqcmVzOjMwMjUwNTc4XCIsIC8vUkMgMzAyNTA1NzggOiBVemF2xZnDrXRcclxuICAgICAgICAgICAgICAgIC8vIG1ldG9kYSB2b2xhbsOhIHDFmWkgcMWZZWNob2R1IG5hIGRhbMWhw60ga3JvayAocHJvdmVkZW7DrSB2bGFzdG7DrSBvcGVyYWNlKSAocHJhY3VqZSBuYWQgZGF0eSB6ZSB2c3R1cHUsIHZyYWPDrSBha3R1w6FsbsOtIGRhdGEgeiBkYXRhYsOhemUgKyB2w71zbGVkZWsgb3BlcmFjZSlcclxuICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWxEYXRhID0gbW9kZWw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5VY3REb2tsYWQuaHJvbWFkbmVVemF2cml0KCB7IFNlem5hbTogZGF0YSB9IClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIGFrY2UgbmEgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBkZXRhaWxBa2NlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAvLyBha2NlIHZvbGFuw6EgbmEgZHZvamtsaWsgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogZGV0YWlsQWtjZVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gZHJ1aMO9IChwb3NsZWRuw60pIGtyb2sgLSB6b2JyYXplbsOtIHbDvXNsZWRrdSBvcGVyYWNlXHJcbiAgICAgICAgICAgIGxhc3RTdGVwOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBuw6F6ZXYga3Jva3VcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA1NzNcIiwgLy9SQyAzMDI1MDU3MyA6IFbDvXNsZWRla1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBhcmFtZXRyeSBqc291IHYgdG9tdG8ga3Jva3UgamnFviBuZWVkaXRvdmF0ZWxuw6lcclxuICAgICAgICAgICAgICAgIGVuYWJsZUZvcm1GaWVsZHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gbmFkcGlzIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMwMjUwNTc5XCIsIC8vUkMgMzAyNTA1NzkgOiBacHJhY292YW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIMO6c3DEm8WhbsOpaG8gdWtvbsSNZW7DrSBwcsWvdm9kY2UgKG5hIHJvemTDrWwgb2QgenJ1xaFlbsOtIHByxa92b2RjZSBwxZllc2VsZWt0b3bDoXbDoSBzZXpuYW0pXHJcbiAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoUm93c0Zyb21EQihjb250ZW50LCB2aWV3LmdldERhdGFSb3dzKGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAvL0Z1Y0dyaWQud2l6YXJkRW5kKHRoYXQsIGlrYywgdHJ1ZSwgeyBtZXRob2RDYWxsZWRJZlN1Y2Nlc3M6ICgpID0+IHsgdGhhdC5uYWN0ZW5pU2V6bmFtdSgpOyB9IH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gb2JzbHVoYSB6cnXFoWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIGNhbmNlbERlbGVnYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL0Z1Y0dyaWQud2l6YXJkRW5kKHRoYXQsIGlrYywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIHRpdHVsZWsgdiBicmVhZGNydW1idVxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDU3OFwiLCAvL1JDIDMwMjUwNTc4IDogVXphdsWZw610XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgLy99KVxyXG4gICAgICAgIC8vLmFsd2F5cyhmdW5jdGlvbiAoKSB7IGNvbnRlbnQhLmVuZE9wZXJhdGlvbigpOyB9KVxyXG5cclxuXHJcbiAgICAgICAgLy87XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcmFtZXRyeSBwcm8gemF1Y3RvdmF0XHJcbiAgICAgKiBcclxuICAgICAqICovXHJcbiAgICBmdW5jdGlvbiBnZXRGb3JtUGFyYW1aYXVjdG92YXQoY29udGVudDogR1VjdFNlem5hbSwgb3ByYXZueURva2xhZDogYm9vbGVhbik6IEpRdWVyeVByb21pc2U8Rm9ybXMuRm9ybT4ge1xyXG4gICAgICAgIGxldCB0aGF0ID0gY29udGVudDtcclxuICAgICAgICBsZXQgeDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFphdWN0b3ZhdE5hc3RhdmVuaUR0bztcclxuICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICBFS09VdGlscy5DYWxsUmVtb3RlU2VydmljZSh0aGF0LCBcIlByZWR2b2xieVphdWN0b3ZhbmlcIiwge30sIFwiR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdEhyb21hZG5lWmF1Y3RvdmFuaVwiKVxyXG5cclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERlZlBvbGlja2FEdG9bXSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhhdC5uYXN0YXZlbmkgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybXVsYXJcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtNS01LTIsIE0tNS01LTIsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdygpO1xyXG4gICAgICAgICAgICAgICAgLy8uYWRkU2VjdGlvbihcIlBva3JhxI1vdmF0IHZlIHpwcmFjb3bDoW7DrSwga2R5xb4gbmFzdGFuZSBuZXNyb3ZuYWxvc3Q6XCIpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgcHJlZHZvbGJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgocG9sb3prYSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9sb3prYS5UeXBIb2Rub3R5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdFR5cFBvbGljZWsuQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtLmFkZFJvdyhcIlwiKS5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IHBvbG96a2EuTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbGFiZWw6IHBvbG96a2EuRGVzY3JpYmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBwb2xvemthLk5hbWUgKyBcIj12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpbml0aWFsVmFsdWU6IHR5cGVvZiBwb2xvemthLlZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIHBvbG96a2EuVmFsdWUgIT09IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwb2xvemthLlR5cEhvZG5vdHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0VHlwUG9saWNlay5MaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJlZHZvbGJ5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvbG96a2EuSUQgPT0gMTUwICYmIG9wcmF2bnlEb2tsYWQpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5cGxuZW5pIHBvbGUgc3RhdnUgYSBkb2hsZWRlbmkgdnlicmFuZSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZFN0YXYgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdnkgPSBbXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9sb3prYS5Wb2xieSEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzID0geyB0ZXh0OiBpdGVtLk5hbWUgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNbcG9sb3prYS5OYW1lIGFzIGFueV0gPSBpdGVtLklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdnkucHVzaChzIGFzIG5ldmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLklkID09IHBvbG96a2EuVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZFN0YXYgPSBpbmRleDsgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRSb3cocG9sb3prYS5EZXNjcmliZSBhcyBhbnkpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHBvbG96a2EuTmFtZSBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsIG11bHRpOiBmYWxzZSwgbGlzdDogZmFsc2UsIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBzdGF2eVtpZFN0YXZdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInRleHRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuXCIgKyBwb2xvemthLk5hbWUgKyBcIj12YWx1ZS5cIiArIHBvbG96a2EuTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhzdGF2eSwgeyBrZXk6IHBvbG96a2EuTmFtZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoZm9ybSk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWtjZSBaYXVjdG92YXQgZG9rbGFkdVxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSBzZWxlY3RlZFJvd3NcclxuICAgICAqIEBwYXJhbSBkZXRhaWxBa2NlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFphdWN0b3ZhdChjb250ZW50OiBHVWN0U2V6bmFtLCBzZWxlY3RlZFJvd3M6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvW10sIGRldGFpbEFrY2U6IEdBY3Rpb24pIHtcclxuICAgICAgICB2YXIgdGhhdCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgaW50ZXJmYWNlIHByZWV2aWRlbmNlTW9kZWwge1xyXG4gICAgICAgICAgICBpeHBfZGVuOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgICAgICBpeHNfZnVuX2FrdDogc3RyaW5nIHwgbnVsbFxyXG4gICAgICAgICAgICBpeHNfcmVmOiBzdHJpbmcgfCBudWxsXHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gT2JzYWh1amUgc2V6bmFtIG9wcmF2bnkgZG9rbGFkICAgICBcclxuICAgICAgICBsZXQgb3ByYXZueURva2xhZCA9IHR5cGVvZiBzZWxlY3RlZFJvd3MuZmluZCgoaXRlbSkgPT4gKGl0ZW0ua3RnX3R5cCA9PT0gMTAxMCB8fCBpdGVtLmt0Z190eXAgPT09IDEwMTEpKSAhPT0gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgICBnZXRGb3JtUGFyYW1aYXVjdG92YXQoY29udGVudCwgb3ByYXZueURva2xhZClcclxuICAgICAgICAgICAgLnRoZW4oKGZvcm0pID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtb2RlbERhdGE6IHByZWV2aWRlbmNlTW9kZWwgPSB7IGl4cF9kZW46IFwiXCIsIGl4c19mdW5fYWt0OiBcIlwiLCBpeHNfcmVmOiBcIlwiIH07XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG8+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRpdHVsZWsgdiBicmVhZGNydW1idVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA4MDBcIiwgLy9SQyAzMDI1MDgwMCA6IMOaxI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvcm3DoXQgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBjcmVhdGVHcmlkRm9ybWF0SHJvbWFkbmVPcGVyYWNlKCksLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5QcnV2b2RjZS5jcmVhdGVDb2x1bW5zKGZhbHNlLCBmYWxzZSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJpbcOhcm7DrSBrbMOtxI0gZGF0IHYgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBrZXlzOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRhdGEgcHJvIGdyaWQgKHBybyBwcnZuw60ga3JvaylcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBTZXREYXRhU2VsZWN0ZWQoc2VsZWN0ZWRSb3dzICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTG9hZERhdGEoY29udGVudC5pc2wuVWN0RG9rbGFkLnZhbGlkb3ZhdFByb1phdWN0b3ZhbmkoeyBTZXpuYW06IHNlbGVjdGVkUm93cyB9KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTG9hZERhdGFQcm91Y3RvdmF0KGNvbnRlbnQsIHNlbGVjdGVkUm93cyBhcyBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0b1tdKSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB0eXAgaW5kaWvDoXRvcsWvIG5hZCBncmlkZW0gKEtQSSBuZWJvIGJhZGdlKVxyXG4gICAgICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBydm7DrSBrcm9rIC0gemFkw6Fuw60gcGFyYW1ldHLFryBhIGtvbnRyb2xhLCBwxZlpIHDFmWVjaG9kdSBuYSBkYWzFocOtIGtyb2sgc2UgemF2b2zDoSBzcHXFoXTEm27DrSB2bGFzdG7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoXpldiBrcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNTc1XCIsIC8vUkMgMzAyNTA1NzUgOiBaYWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3BpcyBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA1ODNcIiwgLy9SQyAzMDI1MDU4MyA6IFByb8O6xI10b3bDoW7DrSBkb2tsYWTFryBkbyDDusSNZXRuw61obyBkZW7DrWt1LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWQgZ3JpZGVtIHpvYnJheml0IEtQSS9iYWRnZSBzIHBvxI10eSB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9ybXVsw6HFmSBzIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtLC8vZ2V0Rm9ybVBhcmFtWmF1Y3RvdmF0KGNvbnRlbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb2RlbCBwcm8gcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogbW9kZWxEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWRwaXMgdGFidSBzIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwianJlczozMDI1MDU4NFwiLCAvL1JDIDMwMjUwNTg0IDogUGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMwMjUwNTcwXCIsIC8vUkMgMzAyNTA1NzAgOiBWeWJyYW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgem3Em255IHBhcmFtZXRydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZENoYW5nZURlbGVnYXRlOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgcHJvIHNwdXN0ZW5pIGtvbnRyb2x1IHV6aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIExvYWREYXRhKGNvbnRlbnQuaXNsLlVjdERva2xhZC52YWxpZG92YXRQcm9aYXVjdG92YW5pKHsgU2V6bmFtOiBkYXRhICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBMb2FkRGF0YVByb3VjdG92YXQoY29udGVudCwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYgYWtjZSwga3RlcsOhIHByb3ZlZGUgcG/FvmFkb3Zhbm91IG9wZXJhY2kgKHRsYcSNw610a28gdnByYXZvIGRvbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcImpyZXM6MzAyNTA4MDFcIiwgLy9SQyAzMDI1MDgwMSA6IFphw7rEjXRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ldG9kYSB2b2xhbsOhIHDFmWkgcMWZZWNob2R1IG5hIGRhbMWhw60ga3JvayAocHJvdmVkZW7DrSB2bGFzdG7DrSBvcGVyYWNlKSAocHJhY3VqZSBuYWQgZGF0eSB6ZSB2c3R1cHUsIHZyYWPDrSBha3R1w6FsbsOtIGRhdGEgeiBkYXRhYsOhemUgKyB2w71zbGVkZWsgb3BlcmFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGEgPSBtb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBycTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFphdWN0b3ZhdEhyb21hZG5lUmVxdWVzdER0byA9IHsgU2V6bmFtOiBkYXRhIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JxLk5hc3RhdmVuaSA9IHRoaXMubmFzdGF2ZW5pLk5hc3RhdmVuaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycS5TdGF2VWhyYWR5UHJpbURva2xhZHUgPSBtb2RlbERhdGFbXCJTdGF2VWhyYWR5UHJpbURva2xhZHVcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycS5TdGF2WmF1Y3RvdmFuaVByaW1Eb2tsYWR1ID0gbW9kZWxEYXRhW1wiU3RhdlphdWN0b3ZhbmlQcmltRG9rbGFkdVwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcnEuVWtvbmNpdFZQcmlwYWRlQ2h5YnkgPSBtb2RlbERhdGEuVWtvbmNpdFZQcmlwYWRlQ2h5Ynk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgaW5wdXRQYXJhbXM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRaYXVjdG92YXRIcm9tYWRuZVJlcXVlc3REdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBTZXpuYW06IGRhdGEsIEl4cERlbk5ldzogbW9kZWxEYXRhLml4cF9kZW4sIEl4c0Z1bk5ldzogbW9kZWxEYXRhLml4c19mdW5fYWt0LCBJeHNSZWZOZXc6IG1vZGVsRGF0YS5peHNfcmVmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuVWN0RG9rbGFkLmhyb21hZG5lWmF1Y3RvdmF0KHsgcnE6IHJxIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbk5ldyhjb250ZW50LCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHRyYW5zTXNnID0gdHJhbnNNc2dUc3QgYXMgRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5acHJhY292YW5pWnByYXYoY29udGVudCwgdHJhbnNNc2csIDAsIG51bGwgYXMgYW55LCBFeHRlbmRDb25kaXRpb25zU2NodmFsZW5pIGFzIGFueSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBuYSB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBkZXRhaWxBa2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha2NlIHZvbGFuw6EgbmEgZHZvamtsaWsgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBkZXRhaWxBa2NlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZHJ1aMO9IChwb3NsZWRuw60pIGtyb2sgLSB6b2JyYXplbsOtIHbDvXNsZWRrdSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFN0ZXA6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYga3Jva3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDU3M1wiLCAvL1JDIDMwMjUwNTczIDogVsO9c2xlZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJhbWV0cnkganNvdSB2IHRvbXRvIGtyb2t1IGppxb4gbmVlZGl0b3ZhdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZUZvcm1GaWVsZHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWRwaXMgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMDI1MDU3OVwiLCAvL1JDIDMwMjUwNTc5IDogWnByYWNvdmFuw6kgZG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgw7pzcMSbxaFuw6lobyB1a29uxI1lbsOtIHByxa92b2RjZSAobmEgcm96ZMOtbCBvZCB6cnXFoWVuw60gcHLFr3ZvZGNlIHDFmWVzZWxla3RvdsOhdsOhIHNlem5hbSlcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoUm93c0Zyb21EQihjb250ZW50LCB2aWV3LmdldERhdGFSb3dzKGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRnVjR3JpZC53aXphcmRFbmQodGhhdCwgaWtjLCB0cnVlLCB7IG1ldGhvZENhbGxlZElmU3VjY2VzczogKCkgPT4geyB0aGF0Lm5hY3RlbmlTZXpuYW11KCk7IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb2JzbHVoYSB6cnXFoWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9GdWNHcmlkLndpemFyZEVuZCh0aGF0LCBpa2MsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aXR1bGVrIHYgYnJlYWRjcnVtYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDU4MlwiLCAvL1JDIDMwMjUwNTgyIDogUHJvw7rEjXRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogIEFrdHVhbGl6YWNlIGtvbmtyZXRuaWNoIHJhZGt1XHJcbiAgICAgKiAgICBcclxuICAgICAqIGZ1bmN0aW9uIHJlZnJlc1Jvd1xyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge0dvcmRpYy5Fa28uSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvW119IGRva2xhZHlcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVmcmVzUm93KGNvbnRlbnQ6IEdDb250ZW50LCBkb2tsYWR5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0b1tdKSB7XHJcblxyXG4gICAgICAgIGRva2xhZHkuZm9yRWFjaCgocmFkZWssIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyYWRlay5SZXN1bHRPcGVyYXRpb24gPT09IEludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkZWtBa3QgPSBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uTmFqZGlSYWRlayhyYWRlay5peHAgYXMgYW55KSBhcyBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0bztcclxuICAgICAgICAgICAgICAgIHJhZGVrQWt0LnNfemF1ID0gcmFkZWsuc196YXU7XHJcbiAgICAgICAgICAgICAgICByYWRla0FrdC5zdGF2X3R4dCA9IHJhZGVrLnN0YXZfdHh0O1xyXG4gICAgICAgICAgICAgICAgcmFkZWtBa3Quc3RhdiA9IHJhZGVrLnN0YXY7XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uUmVwbGFjZVJvdyhjb250ZW50LCByYWRla0FrdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICAvL0dvcmRpYy5VY3QuV2ViQ2xpZW50LlNlem5hbS5SZXBsYWNlUm93KGNvbnRlbnQsIHJhZGVrQWt0LCB0cnVlKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAgVnl0dm9yZW5pIGdyaWRmb3JtYXR1XHJcbiAgICAgKiBleHBvcnQgZnVuY3Rpb24gY3JlYXRlZEdyaWRGb3JtYXRcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICogQHJldHVybnMge0dvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG8+fVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlZEdyaWRGb3JtYXQoY29udGVudDogR1VjdFNlem5hbSwgcGFyYW06IEdvcmRpYy5Tc2wuSW50ZXJmYWNlLkdEb2t1bWVudEdldENvbHVtblBhcmFtc1Jlc3BvbnNlRHRvIHwgbnVsbCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG8+IHtcclxuXHJcblxyXG4gICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG8+KClcclxuICAgICAgICAgICAgLy9Fa28uR3JpZC5nZXRMaXN0V2ZsQ29sdW1ucyh0cnVlKSBcclxuICAgICAgICAgICAgLmFkZFdmbENvbHVtbnMoKVxyXG4gICAgICAgICAgICAuYWRkVHlwRW50aXR5KHsgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy50eXBfZW50aXR5X2ljbyB9KVxyXG4gICAgICAgICAgICAuYWRkVmxhc3RuaWN0dmkoeyBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnZsYXN0bmljdHZpIH0pXHJcbiAgICAgICAgICAgIC8vIHByaXpuYWsgcHJlY3Rlbm9cclxuICAgICAgICAgICAgLmFkZFByZWN0ZW5vKClcclxuXHJcbiAgICAgICAgICAgIC8vIHByaXpuYWsgcHJlZXZpZGVuY2VcclxuICAgICAgICAgICAgLmFkZFByZWV2aWRlbmNlKHsgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5wcmVldmlkZW5jZSB9KVxyXG4gICAgICAgICAgICAvL0Vrby5JbnRlcmZhY2UuR1dmbEZvckVrb0R0b05hbWVzLmVsX3ByaWxvaHlfcG9jZXRcclxuICAgICAgICAgICAgLy8gcG9jZXQgZWwuIHByaWxvaFxyXG4gICAgICAgICAgICAvLy5hZGRQb2NldEVsUHJpbG9oKHsgbmFtZTogXCJlbF9wcmlsb2h5X3BvY2V0XCIsIGZpZWxkOiBcImVsX3ByaWxvaHlfcG9jZXRcIiwgZnJhZ21lbnQ6IEVrby5JbnRlcmZhY2UuR1dmbEZvckVrb0R0b0ZyYWdtZW50cy5lbF9wcmlsb2h5X3BvY2V0IH0pXHJcbiAgICAgICAgICAgIC8vLmFkZFBvY2V0RWxQcmlsb2goeyBuYW1lOiBcInBvY19lcHJpXCIsIGZpZWxkOiBcInBvY19lcHJpXCIsIGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMucG9jX2VwcmkgfSlcclxuICAgICAgICAgICAgLy8gZWxla3Rvcm5pY2t5IG9icmF6XHJcbiAgICAgICAgICAgIC5hZGRFbE9icmF6KHsgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5lbF9vYnJhel90eXAgfSlcclxuICAgICAgICAgICAgLy8gS29udHJvbHlcclxuICAgICAgICAgICAgLy8gc3RhdiBmaW5hbmNuaSBrb250cm9seVxyXG4gICAgICAgICAgICAuYWRkSWNvbkNvbHVtbihHb3JkaWMuV2ZsLkdsb2JhbHMuTGlzdFN1cHBvcnQuU3RhdkZLQ29sdW1uKCkpXHJcbiAgICAgICAgICAgIC8vIEV4cGVyaW1lbnTDoWxuw60gbGlnaHQgLSBzdGF2IGZpbmFuY25pIGtvbnRyb2x5XHJcbiAgICAgICAgICAgIC8vLmFkZEljb25Db2x1bW4oR29yZGljLldmbC5HbG9iYWxzLkxpc3RTdXBwb3J0LlN0YXZGS0xDb2x1bW4oKSlcclxuICAgICAgICAgICAgLy8gc3RhdiB1Y2V0bmkga29udHJvbHk7XHJcbiAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKEdvcmRpYy5XZmwuR2xvYmFscy5MaXN0U3VwcG9ydC5TdGF2VUtDb2x1bW4oKSlcclxuICAgICAgICAgICAgLy8gc3RhdiBzY2h2YWxvdmFjaWhvIHByb2Nlc3VcclxuICAgICAgICAgICAgLmFkZFN0YXZFa29TY2h2YWxDb2x1bW4oKVxyXG4gICAgICAgICAgICAvLy5hZGRJY29uQ29sdW1uKEdvcmRpYy5XZmwuR2xvYmFscy5MaXN0U3VwcG9ydC5Vem9Db2x1bW4odW5kZWZpbmVkLCAocm93KSA9PiB7IGRlYnVnZ2VyOyByZXR1cm4gdHJ1ZTsgfSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwpKVxyXG4gICAgICAgICAgICAuYWRkQmFyZXZuZU96bmFjZW5pKHsgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy51em8gfSwgdm9pZCAwLCB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAocm93KSA9PiByb3cuaXhzX2Z1bl9ha3QgIT0gKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3QsIGNvbnRlbnQuZ2xvYmFsU2V0dGluZ3NcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgLy9Hb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFdmbENvbHVtbnMoZ3JpZEZvcm1hdCk7ICAgICBcclxuICAgICAgICAvL3JldHVybiByb3cuaXhzX2Z1bl9ha3QgIT0gKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3Q7IH0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpKTtcclxuICAgICAgICAvL0dvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkV2ZsQ29sdW1ucyhncmlkRm9ybWF0LCB2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCB2b2lkIDApO1xyXG4gICAgICAgIGlmIChjb250ZW50ICE9IG51bGwgJiYgY29udGVudC5HbG9iYWxzLlBhcmFtcyEuUG92b2xlbmlQcmFjZVNJbnRlcm5pbURhbkRva2xhZGVtKSB7XHJcbiAgICAgICAgICAgIC8vZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJwcml6X2V1Y3RcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDkzXCIsICAgICAgICAgLy9SQyAzMDI1MDA5MyA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgIC8vICAgIHdpZHRoOiA0OSwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICBjdXN0b21DbGFzczogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgLy8gICAgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5wcml6X2V1Y3QsXHJcbiAgICAgICAgICAgIC8vICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEsIG1ldGFyb3csIGluZm8pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmIChkYXRhLnByaXpfZXVjdCA9PT0gMSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCB0b29sVGlwID0gXCJqcmVzOjMwMjUwMzc3XCIgLy9SQyAzMDI1MDM3NyA6IERva2xhZCBFLXXEjWV0bmljdHbDrVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBcIjxzcGFuIHRpdGxlPSdcIiArIHRvb2xUaXAgKyBcIic+RVVDPC9zcGFuPlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIFwiXCI7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImludF9kb2tcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDYzNVwiLCAgICAgICAgIC8vUkMgMzAyNTA2MzUgOiBJbnRlcm7DrSBkYcWIb3bDvSBkb2tsYWRcclxuICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246XCJqcmVzOjMwMjUwNjM1XCIsIC8vUkMgMzAyNTA2MzUgOiBJbnRlcm7DrSBkYcWIb3bDvSBkb2tsYWRcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0OSwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLmludF9kb2ssXHJcbiAgICAgICAgICAgICAgICAvL2NlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEsIG1ldGFyb3csIGluZm8pIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmIChkYXRhLmludF9kb2sgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBsZXQgdG9vbFRpcCA9IFwianJlczozMDI1MDM1MFwiIC8vUkMgMzAyNTAzNTAgOiBJbnRlcm7DrSBkYcWIb3bDvSBkb2tsYWRcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIFwiPHNwYW4gdGl0bGU9J1wiICsgdG9vbFRpcCArIFwiJz5BTk88L3NwYW4+XCI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSwgbWV0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmludF9kb2sgPT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZmEtaW5mby1jaXJjbGUgZy1zdGF0ZS10ZXh0IGZhLWZ3IGdyaWQtY2VsbC1pY29uXCIsIHRleHQ6IFwianJlczozMDI1MDM1MFwiIH07IC8vUkMgMzAyNTAzNTAgOiBJbnRlcm7DrSBkYcWIb3bDvSBkb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JpZEZvcm1hdC5hZGRQaWQoeyBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLml4cCB9KVxyXG4gICAgICAgICAgICAuYWRkQWdlbmRvdmVDaXNsbyh7IGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuYWNfYWcgfS8qeyBzb3J0T3JkZXJEZXNjOiBHb3JkaWMuRGF0YS5Tb3J0aW5nLiB9Ki8pXHJcbiAgICAgICAgICAgIC5hZGRFdmlkZW5jbmlDaXNsbyh7IGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuYWMgfSlcclxuICAgICAgICAgICAgLmFkZEtuaWhhKHsgbmFtZTogXCJrbmloYVwiLCBmaWVsZDogXCJrbmloYVwiLCBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLmtuaWhhIH0pXHJcbiAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInNtbG91dmFcIiwgZGVzY3JpcHRpb246XCJOw6F6ZXYga25paHksIHZlIGt0ZXLDqSBqZSBkb2tsYWQgYWt0dcOhbG7DqSBldmlkb3bDoW5cIiB9KVxyXG4gICAgICAgICAgICAuYWRkRHJ1aERva2xhZHUoeyBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLmRyZCB9KVxyXG4gICAgICAgICAgICAvLy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlJva1wiLCAvL1JDIDMwMjUwNjg5IDogU3RhdiBkb2tsYWR1ICjEjcOtc2xvKVxyXG4gICAgICAgICAgICAvLyAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnJvayxcclxuICAgICAgICAgICAgLy8gICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC5hZGRSb2soeyBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnJvayB9KVxyXG4gICAgICAgICAgICAuYWRkTWVzaWMoeyBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLm1lc2ljIH0pXHJcbiAgICAgICAgICAgIC5hZGREZW4oeyBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLmRlbiB9KVxyXG4gICAgICAgICAgICAuYWRkQ2lzbG9Eb2tsYWR1KHsgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5hY19peGUgfSlcclxuICAgICAgICAgICAgLmFkZFR5cERva2xhZHUoeyBuYW1lOiBcImt0Z1R5cE5hemV2XCIsIGZpZWxkOiBcImt0Z1R5cE5hemV2XCIsIGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMua3RnVHlwTmF6ZXYgfSlcclxuICAgICAgICAgICAgLmFkZFN0YXZEb2tsYWR1KHsgbmFtZTogXCJzdGF2X3R4dFwiLCBmaWVsZDogXCJzdGF2X3R4dFwiLCBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnN0YXZfdHh0IH0pXHJcbiAgICAgICAgICAgIC8vIHBvbW9jbmUgc2xvdXBjZSBwcm8gcG9kbWluZW5lIGZvcm1hdG92YW5pXHJcbiAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X3ZpZXdcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDY4N1wiLCAvL1JDIDMwMjUwNjg3IDogUMWZZcSNdGVub1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5wcml6X3ZpZXcsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA3NzNcIiwgLy9SQyAzMDI1MDc3MyA6IEthdGVnb3JpZSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLmt0Z190eXAsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2ODlcIiwgLy9SQyAzMDI1MDY4OSA6IFN0YXYgZG9rbGFkdSAoxI3DrXNsbylcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuc3RhdixcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByZWV2aWRvdmFub1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjkzXCIsIC8vUkMgMzAyNTA2OTMgOiBQxZllZXZpZG92YW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnByZWV2aWRvdmFubyxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5hZGRDYXN0a2EoeyBuYW1lOiBcImNcIiwgZmllbGQ6IFwiY1wiLCBmcmFnbWVudDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLmMsIH0pXHJcbiAgICAgICAgICAgIC5hZGRNRCh7IGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuYzAgfSlcclxuICAgICAgICAgICAgLmFkZERhbCh7IGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuYzEgfSlcclxuICAgICAgICAgICAgLmFkZFpwcmFjb3ZhdGVsKHsgbmFtZTogXCJpeHNfZnVuX25hemV2XCIsIGZpZWxkOiBcIml4c19mdW5fbmF6ZXZcIiwgZnJhZ21lbnQ6IEludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5peHNfZnVuX25hemV2IH0pXHJcbiAgICAgICAgICAgIC5hZGRQb3Bpcyh7IGZyYWdtZW50OiBJbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG9GcmFnbWVudHMucG9waXMgfSk7XHJcbiAgICAgICAgLy9sZXQgcGFyYW06IEdvcmRpYy5Tc2wuSW50ZXJmYWNlLkdEb2t1bWVudEdldENvbHVtblBhcmFtc1Jlc3BvbnNlRHRvID0ge307XHJcblxyXG4gICAgICAgIC8vR29yZGljLlNzbC5XZWJDbGllbnQuR0Rva3VtZW50SXNsLkFkZEdyaWRDb2x1bW5zKGdyaWRGb3JtYXQpO1xyXG4gICAgICAgIGxldCBzY29wZURva3VtZW50ID0gZXh0ZW5kU2NvcGUoXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLmRva3VtZW50LFxyXG4gICAgICAgICAgICBcImpyZXM6MzAyNTA4MjlcIiwgLy9SQyAzMDI1MDgyOSA6IERva3VtZW50XHJcbiAgICAgICAgICAgIFwiXCJcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAocGFyYW0gIT0gbnVsbClcclxuICAgICAgICAgICAgR29yZGljLlNzbC5XZWJDbGllbnQuR0Rva3VtZW50SXNsLkFkZEdyaWRDb2x1bW5zSW1tZWRpYXRlKFxyXG4gICAgICAgICAgICAgICAgcGFyYW0sXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgcHJlc2V0RG9rdW1lbnRDb2x1bW5zLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlTGV2ZWxzOiBzY29wZURva3VtZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIGxldCBzY29wZVZsYXN0bm9zdGkgPSBleHRlbmRTY29wZShcclxuICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnZsYXN0bm9zdGksXHJcbiAgICAgICAgICAgIFwianJlczozMDI1MDg1NlwiLCAvL1JDIDMwMjUwODU2IDogVmxhc3Rub3N0aVxyXG4gICAgICAgICAgICAvL1wiVmxhc3Rub3N0aSBzb3VwaXNreVwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoY29udGVudC5peHNUeXB5KSB7IFxyXG4gICAgICAgICAgICBsZXQgc2NvViA9IChzY29wZVZsYXN0bm9zdGkubWFwKGkgPT4gaS5zY29wZSkgYXMgc3RyaW5nW10pLmpvaW4oR2luLldlYkNsaWVudC5HU2hhcmVkSXNsLk5hbWVTZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICBsZXQgc2NvVlQgPSAoc2NvcGVWbGFzdG5vc3RpLm1hcChpID0+IGk/LnNjb3BlVGl0bGUpLmZpbHRlcihpID0+IGk/LnRyaW0oKSkgYXMgc3RyaW5nW10pLmpvaW4oXCIgLSBcIik7XHJcbiAgICAgICAgICAgIGxldCBzeHNUeXA6IHsgc3hzOiBzdHJpbmcgfCBudWxsLCB0eXBfb2JqOiBudW1iZXIgfVtdID0gW3sgc3hzOiBudWxsLCB0eXBfb2JqOiBVY3QuSW50ZXJmYWNlLkdFVHlwT2JqZWt0dS5LbmloYVVDVCB9XTtcclxuICAgICAgICAgICAgY29udGVudC5peHNUeXB5LmZvckVhY2goaXRlbSA9PiBzeHNUeXAucHVzaCh7IHN4czogaXRlbSwgdHlwX29iajogVWN0LkludGVyZmFjZS5HRVR5cE9iamVrdHUuVHlwRG9rdW1lbnR1IH0pKTtcclxuICAgICAgICAgICAgLy8gUm96c2lyZW5lIHZsYXN0bm9zdGlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGQoR29yZGljLlBvcGlzbmVWbGFzdG5vc3RpLmNyZWF0ZVN4c1R5cEdyaWRGb3JtYXQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb1YsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX3R5cDogY29udGVudC5peHNUeXB5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cF9vYmo6IFtVY3QuSW50ZXJmYWNlLkdFVHlwT2JqZWt0dS5LbmloYVVDVF0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3hzX3R5cDogc3hzVHlwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlVGl0bGU6IHNjb1ZUXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgLy8uYWRkKEdvcmRpYy5Qb3Bpc25lVmxhc3Rub3N0aS5jcmVhdGVJeHNUeXBHcmlkRm9ybWF0KFwidmxhc3Rub3N0aVwiLCBbXCJERU1PMDQwMTAxMDFcIixcIjAwMDAwNDAxMDFCOVwiXSkpXHJcbiAgICAgICAgLy9ncmlkRm9ybWF0LmFkZChHb3JkaWMuUG9waXNuZVZsYXN0bm9zdGkuY3JlYXRlR3JpZEZvcm1hdChcInZsYXN0bm9zdGlcIikpXHJcbiAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiBncmlkRm9ybWF0OyBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBQxZlpZMOhbsOtIGRhbMWhw60gw7pyb3ZuxJsgZG8gc2NvcGVcclxuICAgICAgICAqIFxyXG4gICAgICAgICogQHBhcmFtIHtHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW10gfCB1bmRlZmluZWR9IHNjb3BlIHNjb3BlXHJcbiAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3U2NvcGUgbm92w70gc2NvcGVcclxuICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbmV3U2NvcGVUaXRsZVdPU2NvcGVdIHRpdHVsZWsgbm92w6lobyBzY29wZSBwcm8gcMWZaWTDoW7DrSBkbyBwcsOhemRuw6lobyBzY29wZVxyXG4gICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtuZXdTY29wZVRpdGxlV1Njb3BlXSB0aXR1bGVrIG5vdsOpaG8gc2NvcGUgcHJvIHDFmWlkw6Fuw60gZG8gbmVwcsOhemRuw6lobyBzY29wZVxyXG4gICAgICAgICogQHJldHVybnMge0dpbi5XZWJDbGllbnQuR1Njb3BlT3B0aW9uTGV2ZWxbXX0gdsO9c2xlZG7DvSBzY29wZVxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZXh0ZW5kU2NvcGUoc2NvcGU6IEdpbi5XZWJDbGllbnQuR1Njb3BlT3B0aW9uTGV2ZWxbXSB8IHVuZGVmaW5lZCwgbmV3U2NvcGU6IHN0cmluZywgbmV3U2NvcGVUaXRsZVdPU2NvcGU/OiBzdHJpbmcsIG5ld1Njb3BlVGl0bGVXU2NvcGU/OiBzdHJpbmcpOiBHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW10ge1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBkb8SNZXNhdFxyXG4gICAgICAgIGxldCBleHRlbmRlZFNjb3BlOiBHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW10gPSBbXTtcclxuICAgICAgICBsZXQgc2NvcGVMZW4gPSBzY29wZT8ubGVuZ3RoIHx8IDA7XHJcbiAgICAgICAgc2NvcGU/LmZvckVhY2goKGl0ZW0sIGwpID0+IHtcclxuICAgICAgICAgICAgaWYgKGwgPT0gc2NvcGVMZW4gLSAxICYmIG5ld1Njb3BlVGl0bGVXU2NvcGUpIGV4dGVuZGVkU2NvcGUucHVzaCh7IHNjb3BlOiBpdGVtLnNjb3BlIH0pO1xyXG4gICAgICAgICAgICBlbHNlIGV4dGVuZGVkU2NvcGUucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBleHRlbmRlZFNjb3BlLnB1c2goeyBzY29wZTogbmV3U2NvcGUsIHNjb3BlVGl0bGU6IChzY29wZSA/IChuZXdTY29wZVRpdGxlV1Njb3BlID8/IG5ld1Njb3BlVGl0bGVXT1Njb3BlKSA6IG5ld1Njb3BlVGl0bGVXT1Njb3BlKSB9KTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRTY29wZTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBkb2t1bWVudEluaXQoKTogSlF1ZXJ5LlByb21pc2U8R29yZGljLlNzbC5JbnRlcmZhY2UuR0Rva3VtZW50R2V0Q29sdW1uUGFyYW1zUmVzcG9uc2VEdG8vKkdXZmxzcGlkR2V0Q29sdW1uUGFyYW1zUmVzcG9uc2VEdG8qLz4ge1xyXG5cclxuICAgICAgICAvLyBwxZlldnphdG8geiBtZXRvZHkgQWRkRG9rdW1lbnRHcmlkQ29sdW1ucyB6IEdvcmRpYy5XZmwuV2ViQ2xpZW50XFxHaW5cXFdmbFxcSXNsXFxHV2Zsc3BpZElzbC50c1xyXG5cclxuICAgICAgICByZXR1cm4gJC53aGVuKFxyXG4gICAgICAgICAgICBHb3JkaWMuU3NsLldlYkNsaWVudC5HRG9rdW1lbnRJc2wuSW5pdChcclxuICAgICAgICAgICAgICAgIC8vR29yZGljLldmbC5XZWJDbGllbnQuR1dmbHNwaWRJc2wuSW5pdChcclxuICAgICAgICAgICAgICAgIHByZXNldERva3VtZW50Q29sdW1ucy8qXCJhbGxcIiovLypXZmwuV2ViQ2xpZW50LkdXZmxzcGlkSXNsQ29sdW1uc1ByZXNldC5Fa28oKSovLFxyXG4gICAgICAgICAgICAgICAgLy8gMTQuMDkuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAvLyBOZXBvdMWZZWJ1amkgbmHEjcOtdGF0IGZpZWxkeSBhIHRhIHUgbmljaCBkw6FtIGZhbHNlLlxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogbmVtYWrDrSB0YWR5IGLDvXQsIGtkecW+IHBvdcW+w612w6FtIGZpbHRyeT9cclxuICAgICAgICAgICAgICAgIC8vZmFsc2VcclxuICAgICAgICAgICAgICAgIHByZXNldERva3VtZW50RmllbGRzXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIElzbC5Eb2t1bWVudC5nZXRDb2x1bW5QYXJhbXMvKi5XZmxzcGlkLmdldENvbHVtblBhcmFtcyovKCkuZ2V0RGF0YSgpXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigoXywgY29sdW1uUGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sdW1uUGFyYW1zO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBTZXpuYW0gYWtjw60gcHJvIG1lbnUgKGhhbWJ1cmdlciBuZWJvIGtvbnRleHRvdsOpIG1lbnUgZ3JpZHUpXHJcbiAgICAgICAgKiBcclxuICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29udGV4dE1lbnUgZm9ybcOhdCBwcm8ga29udGV4dG92w6kgbWVudSBncmlkdSAodHJ1ZSAoZGVmYXVsdCkgPSBhbm8sIGZhbHNlID0gbmUpXHJcbiAgICAgICAgKiBAcGFyYW0ge0lHR3JpZENlbGxDb250ZXh0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBvY3RvdnlMaXN0RHRvPiB8IHVuZGVmaW5lZH0gY2VsbENvbnRleHQga29udGV4dCB6IGdyaWR1IChwb3V6ZSBwcm8gY29udGV4dE1lbnUgPSB0cnVlKSAoZGVmYXVsdCA9IHVuZGVmaW5lZHVuZGVmaW5lZClcclxuICAgICAgICAqIEByZXR1cm5zIHsoc3RyaW5nIHwgdW5kZWZpbmVkKVtdIHwgKHN0cmluZyB8IChzdHJpbmcgfCB1bmRlZmluZWQpW10gfCB7IGFjdGlvbjogR0FjdGlvbiB8IHVuZGVmaW5lZDsgcHJpbWFyeTogdHJ1ZTsgZmF2b3JpdGU6IHRydWU7IH0pW119IHNlem5hbSBha2PDrVxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TWVudUFjdGlvbnMoKTogKHN0cmluZyB8IHVuZGVmaW5lZClbXSB8IChzdHJpbmcgfCAoc3RyaW5nIHwgdW5kZWZpbmVkKVtdIHwgeyBhY3Rpb246IEdBY3Rpb24gfCB1bmRlZmluZWQ7IHByaW1hcnk6IHRydWU7IGZhdm9yaXRlOiB0cnVlOyB9KVtdIHwgTWVudVBhcmFtc1tdIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcImFjdFBvZGFuaURva2xhZHVcIiwgXCJhY3REZXRhaWxEb2tsYWR1XCIsIFwiYWN0VXByYXZpdERva2xhZFwiLFwiYWN0RGV0YWlsRG9aYWxvemt5XCJcclxuICAgICAgICAgICAgLCBcIi1cIiwgW1wianJlczozMDI1MDU5N1wiLCBcInRpc2tLbmloYVVEQWN0XCIsIFwidGlza0tuaWhhVURBY3RWU0VcIiAvL1JDIDMwMjUwNTk3IDogVGlza1xyXG4gICAgICAgICAgICAgICAgLCBcIi1cIiwgXCJqcmVzOjMwMjUwNTk4XCIsIFwidGlza0tuaWhhVURBY3RBR1wiLCBcInRpc2tLbmloYVVEQWN0VURcIiwgXCJ0aXNrS25paGFVREFjdERVXCIgLy9SQyAzMDI1MDU5OCA6IFRpc2sgw5pEIGRsZS4uLlxyXG4gICAgICAgICAgICAgICAgLCBcIi1cIiwgXCJ0aXNrVnlicmFueWNoVURBY3RcIiwgXCJ0aXNrUG9sb3pla1VEQWN0XCJcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICwgXCItXCIsIFwiYWN0T3puYWNpdFByZWN0ZW5lXCIsIFwiYWN0T3puYWNpdE5lcHJlY3RlbmVcIlxyXG4gICAgICAgICAgICAgIF07IFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWcsOhdMOtIElYU19GdW5fQWt0IFxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRJeHNGdW5Ba3QoKTpzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAgICogVnLDoXTDrSBQSUQgYWt0dcOhbG7DrSBrbmloeSAobmVibyBudWxsIHBva3VkIG5lbsOtIHphZMOhbmEgbmVibyBzZSBqZGUgbyByZcW+aW0gcMWZZXMgdsOtY2Uga25paClcclxuICAgICAgICAqIFxyXG4gICAgICAgICogQHJldHVybnMge3N0cmluZyB8IG51bGx9IFBJRCBha3R1w6FsbsOtIGtuaWh5IChuZWJvIG51bGwgcG9rdWQgbmVuw60gemFkw6FuYSBuZWJvIHNlIGpkZSBvIHJlxb5pbSBwxZllcyB2w61jZSBrbmloKVxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0SXhwRGVuKGNvbnRlbnQ6IEdVY3RTZXpuYW0pOiBzdHJpbmcgfCBudWxsIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogesWvc3RhbmUgdGF0byBtZXRvZGE/XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuZWtvQm9vaz8uaXhwX2RlbiA/PyBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogWm9icmF6ZW7DrSBkZXRhaWx1IGRva2xhZHUgdiBub3ZlIHphbG96Y2UgcHJvaGxpemVjZVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBvcGVuRGV0YWlsSW5OZXdUYWIoY29udGVudDogR1VjdFNlem5hbSk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICB2YXIgbXlHcmlkID0gR2V0R3JpZChjb250ZW50KTtcclxuICAgICAgICBpZiAobXlHcmlkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgY29uc3QgYWt0UmFkZWsgPSBFa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvPihteUdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoYWt0UmFkZWsgJiYgIShha3RSYWRlayBpbnN0YW5jZW9mIGpRdWVyeSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdSBha3R1w6FsbsOtIHZ5YnJhbsOpIHBvbG/Fvmt5IHYgbm92w6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3BlbkRldGFpbEluT3RoZXJUYWIoYWt0UmFkZWsudHlwX2FnLCBha3RSYWRlay5peHApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgfVxyXG59Il19