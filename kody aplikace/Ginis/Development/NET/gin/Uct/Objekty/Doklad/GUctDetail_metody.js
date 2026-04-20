"use strict";
/**
 * Metody pro detail
 *
 */
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            var Detail;
            (function (Detail) {
                Detail.waitCall = 500; // cas zpozdeni volani metody        
                Detail.debounce = (callback, delay) => {
                    if (typeof delay === "undefined")
                        delay = Detail.waitCall; // defaultni cas cekani
                    let timeoutID = null;
                    return (...args) => {
                        let callName = callback.toString();
                        if (timeoutID !== null)
                            // vynulovani pocitadla
                            clearTimeout(timeoutID ?? undefined);
                        timeoutID = setTimeout(() => {
                            timeoutID = null; // Not strictly necessary but good to do this.
                            callback.apply(null, args);
                            //callback(...args);
                        }, delay);
                    };
                };
                /**
                 * Nacteni aktualnich stavu
                 *
                 * */
                function nastavStavySRC(content, md, dal) {
                    const grid = GetGrid(content);
                    if (grid == null)
                        return;
                    let result = $.Deferred().resolve().promise();
                    //var statusElement = grid.ggrid('statusWidget', 'id-stavy-widgetu');
                    let typStavu = content.globalSettings.get("Global.Uct.AppSettings.UctSettingsForm.ZobrazeniStavu");
                    if (typStavu === null || typeof typStavu === "undefined")
                        typStavu = 3 /* Interface.GEZobrazeniStavu.StavDokladu */;
                    let radek = Gordic.Eko.Grid.currentRow(grid);
                    if (radek !== null && typeof radek !== "undefined")
                        // pro novy je null
                        radek.ixp = content.Ixp;
                    let editaceOld = content.EditaceZapisu;
                    if (content.EditaceZapisu) {
                        // v editaci zapisu
                        // otestovat
                        result = GetCurrentEditRow(content, false)
                            .then(function (row) {
                            radek = row;
                            //debugger;
                            //radek.c0 = radek.c0?.toString();
                            //radek.c1 = radek.c1?.toString();
                            radek.priz_kur_roz = parseInt(radek.priz_kur_roz);
                            return;
                        });
                    }
                    else {
                        if (radek === null || typeof radek === "undefined" || (radek.uea === null && typStavu !== 3 /* Interface.GEZobrazeniStavu.StavDokladu */) || radek.ixp == null) {
                            setStatus(content, "");
                            return;
                        }
                    }
                    result.then(() => {
                        //debugger;
                        if (radek === null || typeof radek === "undefined" || (radek.uea === null && typStavu !== 3 /* Interface.GEZobrazeniStavu.StavDokladu */)) {
                            setStatus(content, "");
                            return;
                        }
                        //if (typStavu === null || typeof typStavu === "undefined") typStavu = Interface.GEZobrazeniStavu.StavDokladu;
                        content.isl.UctDokladZapis.stavyNaUctech({ radek: radek, typStavu: typStavu, editaceRadku: content.EditaceZapisu })
                            .get().then(function (result) {
                            //if (editaceOld != content.EditaceZapisu) {
                            //    setStatus(content, "");
                            //    return ;
                            //} 
                            //let radekTest = Gordic.Eko.WebClient.Common.currentRow<Interface.GUctdpepDto>(grid) as Interface.GUctdpepDto;
                            //if (radekTest === null || typeof radekTest === "undefined" || radekTest.uea === null) {
                            //    // jiz jsem v editaci, jinak to nejsem schopen poznat, udalosti jsem jdou 4x!
                            //    setStatus(content, "");
                            //    return;
                            //}
                            let popis = result.Popis + " {0} <b class='g-state-text g-state-active'>{1}</b>".format("MD", Gordic.Templates.Formatters.number(result.MD, "C")) + " {0} <b class='g-state-text g-state-active'>{1}</b>".format("DAL", Gordic.Templates.Formatters.number(result.DAL, "C"));
                            popis = popis + "   {0} <b class='g-state-text g-state-active'>{1}</b>".format("MD-DAL", Gordic.Templates.Formatters.number(result.MDDAL, "C"));
                            setStatus(content, popis);
                            //statusElement.html(result.Popis + " MD <b class='g-state-text g-state-active'>{0}</b>".format(result.MD as Decimal) + " DAL <b class='g-state-text g-state-active'>{0}</b>".format(result.DAL as Decimal));
                            return;
                        });
                        return;
                    });
                }
                Detail.nastavStavySRC = nastavStavySRC;
                // deboncovane stavy
                Detail.nastavStavy = Detail.debounce(nastavStavySRC, Detail.waitCall);
                //export function debounce(func: Function, wait?: number): Function {
                //    let timeoutID: ReturnType<typeof setTimeout> | null = null;
                //    if (typeof wait === "undefined")
                //        wait = 0; // okamzite zpracuj
                //    return function (this: any, ...args: any[]) {
                //        // Keep a reference to `this` so that
                //        // func.apply() can access it.
                //        const context = this;
                //        clearTimeout(timeoutID ?? undefined);
                //        timeoutID = setTimeout(function () {
                //            timeoutID = null; // Not strictly necessary but good to do this.
                //            func.apply(context, args);
                //        }, wait);
                //    };
                //}
                /**
                 * Vraci objekt gridu
                 * @param content
                 * @returns
                */
                function GetGrid(content) {
                    if (content.ContentImport)
                        return content.ContentImport.GetGrid();
                    let data = content.fullscreenElement == null ? content.element.find(".ggrid.js-UctPorizovaciGrid")
                        : content.fullscreenElement.find(".ggrid.js-UctPorizovaciGrid");
                    return (data.length == 0 ? null : data);
                }
                Detail.GetGrid = GetGrid;
                /**
                 * flash, ktery bude vymazan po nacteni
                 */
                Detail.flashResult = "flashResult";
                /**
                 * flash, ktery bude vymazan pri zauctovani
                 */
                Detail.flashResultZauct = "flashResultZauct";
                /**
                 * Nastaveni validatoru na formulari
                 * @param content
                 */
                function NastaveniValidatoru(content) {
                    content.findForms("formHeader,formDetail").findFields("rok_dph,mesic_dph").each(function (index, element) {
                        _PridejOdeberValidatorRequired($(element).gfield("option", "validators"), content.UcetniDokladDto.IsTypDanovy);
                        $(element).gfield("option", "flag", (content.UcetniDokladDto.IsTypDanovy ? Gordic.Prefabs.Field.Flags.required : null));
                    });
                    content.findForms("formHeader,formDetail").findFields("ixs_esu").each(function (index, element) {
                        _PridejOdeberValidatorRequired($(element).gfield("option", "validators"), content.UcetniDokladDto.IsTypDanovy && content.UcetniDokladDto.HlavickaDokladu?.ktg_typ == 1001);
                        $(element).gfield("option", "flag", (content.UcetniDokladDto.IsTypDanovy && content.UcetniDokladDto.HlavickaDokladu?.ktg_typ == 1001 ? Gordic.Prefabs.Field.Flags.required : null));
                    });
                }
                Detail.NastaveniValidatoru = NastaveniValidatoru;
                /**
                 *  Pridani vilidatoru
                 * @param pole
                 * @param pridej
                 */
                function _PridejOdeberValidatorRequired(pole, pridej) {
                    let index = _NajdiRequired(pole);
                    pridej ? (index == -1) && pole.push(new Gordic.Validators.Required()) :
                        (index != -1) && pole.splice(index, 1);
                    //if (pridej) {
                    //    if (index == -1)
                    //        pole.push(new Gordic.Validators.Required())
                    //}
                    //else {
                    //    if (index != -1)
                    //        pole.splice(index, 1)
                    //}
                }
                /**
                 * Nalezeni policka required
                 * @param pole
                 * @returns
                 */
                function _NajdiRequired(pole) {
                    for (let i = 0; i < pole.length; i++) {
                        if (pole[i] instanceof Gordic.Validators.Required)
                            return i;
                    }
                    return -1;
                }
                /**
                 * Zjisteni, zda je nacteny seznam
                 * */
                function IsSeznamExist() {
                    return typeof Gordic.Uct.WebClient.Seznam !== "undefined";
                }
                Detail.IsSeznamExist = IsSeznamExist;
                /**
                 * Pridani dokladu do zasobniku pro aktualizace
                 * @param pidDokladu
                 * @returns
                 */
                function addDocToRefresh(pidDokladu) {
                    if (!IsSeznamExist())
                        return;
                    if (!pidDokladu)
                        return;
                    Gordic.Uct.WebClient.Seznam.addRefreshRow(pidDokladu);
                }
                Detail.addDocToRefresh = addDocToRefresh;
                /**
                 * Obnoveni seznamu
                 * */
                function reloadSeznam() {
                    if (!IsSeznamExist())
                        return;
                    Gordic.Uct.WebClient.Seznam.refreshRows(Gordic.Uct.WebClient.Seznam.GetContentSeznam());
                }
                Detail.reloadSeznam = reloadSeznam;
                /**
                 * Aktualizace detailu dokladu podle stavu(menu, polozky, pristupnost)
                 * @param {GUctDetail} content
                 */
                function AktualizaceDokladu(content) {
                    // aktualizuji radku seznamu dokladu, pokud je dany zaznam neprecten
                    if (IsSeznamExist()) {
                        let radek = Gordic.Uct.WebClient.Seznam.NajdiRadek(content.Ixp);
                        if (radek !== null) {
                            // pokud neni zmena, nic nedelam
                            if (radek.priz_view != 0) {
                                radek.priz_view = 0;
                                Gordic.Uct.WebClient.Seznam.RefreshSeznamu(null);
                                //$.content("UCTSeznamdokladu#").$grid.ggrid("refresh");
                            }
                        }
                    }
                    // naplneni policek
                    $.extend(content.UcetniDokladDto.HlavickaDokladu, { rokBuvl: content.UcetniDokladDto.HlavickaDokladu.rok });
                    // naplnění popisných vlastností
                    Gordic.PopisneVlastnosti.applyValues(content, content.UcetniDokladDto.HlavickaDokladu?.vlastnosti ?? {});
                    content.findForms("formHeader,formDetail").findFields()
                        // { initialValues: true} - nevyvola se udalost change po naplneni dat
                        // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                        .gfield("model", "apply", content.UcetniDokladDto.HlavickaDokladu, { initialValues: true, setFlags: { triggerChange: false, } }) // verificationNeeded: false 
                        .gfield("model", "validators", $.extend(content.docValidators))
                        .gfield("confirm");
                    //debugger;
                    content.InterniDoklad = content.UcetniDokladDto.HlavickaDokladu?.int_dok;
                    // musim vyvolat zmenu na uctech, aby se dotahly limity
                    if (content.UcetniDokladDto.HlavickaDokladu?.bu_vl != "") {
                        content.findForms("formHeader,formDetail").findFields("bu_vl").gfield("model", "apply", content.UcetniDokladDto.HlavickaDokladu);
                    }
                    // aktualizace zapisu
                    AktualizaceZapisu(content);
                    // nastaveni pristupnosti poli drd a subrada
                    WaitForData(content)
                        .then((a) => {
                        if (content.closed)
                            return;
                        RefreshMenu(content);
                        // uprava pristupnosti poli
                        ZpristupneniPoli(content);
                        // Skryti nepotrebnych poli
                        ZobrazeniPoli(content);
                        // nastaveni pristupnosti poli drd a subrada
                        GetMesic(content)
                            .then(function (mesic) {
                            // pokud neni zadan drd, znepristupni subradu
                            if (mesic == -1)
                                content.findForms("formHeader,formDetail").findFields("drd").gfield("option", "disabled", true);
                        });
                        GetDrdAsync(content)
                            .then(function (drd) {
                            // pokud neni zadan drd, znepristupni subradu
                            if (drd == -1)
                                content.findForms("formHeader,formDetail").findFields("ac_ixe").gfield("option", "disabled", true);
                        });
                    });
                    if (content.EditaceHlavicky) {
                        ZpristupneniPoli(content);
                        // TODO: Je to porad nutne??
                        GDbd.getElementToFocus(content.element, ".gfield:not(.ui-state-disabled)")?.first().trigger("focus");
                    }
                }
                Detail.AktualizaceDokladu = AktualizaceDokladu;
                /**
                 * aktualizace zapisu
                 *
                 * @param {GUctDetail} content
                 */
                function AktualizaceZapisu(content) {
                    if (content.closed)
                        return;
                    const myGrid = GetGrid(content);
                    if (myGrid === null)
                        return;
                    let view = myGrid.ggrid("getView");
                    // 11.8.2025 uprava
                    view.updateData(content.UcetniDokladDto.Zapisy);
                    //myGrid.ggrid("setData", new Gordic.Data.View(content.UcetniDokladDto.Zapisy as any, { key: "ixp,radek_z" }), true);
                }
                /**
                 * export function AktualizaceFormulare
                 * Aktualizace formulare dle naplnenych policek
                 * @param {GUctDetail} content
                 */
                function AktualizaceFormulare(content) {
                    //content.Permissions = null as any;
                    RefreshMenu(content);
                    // Skryti nepotrebnych poli
                    ZobrazeniPoli(content);
                    // uprava pristupnosti poli
                    ZpristupneniPoli(content);
                    GetMesic(content)
                        .then(function (mesic) {
                        // pokud neni zadan drd, znepristupni subradu
                        if (mesic == -1)
                            content.findForms("formHeader,formDetail").findFields("drd").gfield("option", "disabled", true);
                        return;
                    });
                    GetDrdAsync(content)
                        .then(function (drd) {
                        // pokud neni zadan drd, znepristupni subradu
                        if (drd == -1)
                            content.findForms("formHeader,formDetail").findFields("ac_ixe").gfield("option", "disabled", true);
                        return;
                    });
                    content.findForms("formHeader,formDetail").findFields()
                        // { initialValues: true} - nevyvola se udalost change po naplneni dat
                        // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                        //.gfield("model", "apply", content.UcetniDokladDto.HlavickaDokladu, { initialValues: true, setFlags: { triggerChange: false, } }) // verificationNeeded: false 
                        //.gfield("model", "validators", $.extend(content.docValidators))
                        .gfield("resetErrors")
                        .gfield("confirm");
                }
                Detail.AktualizaceFormulare = AktualizaceFormulare;
                /**
                 * Vyplneni formulare hodnotami z DTO
                 * @param content
                 * @returns
                 */
                function fillForms(content) {
                    // naplneni policek
                    $.extend(content.UcetniDokladDto.HlavickaDokladu, { rokBuvl: content.UcetniDokladDto.HlavickaDokladu.rok });
                    // naplnění popisných vlastností
                    Gordic.PopisneVlastnosti.applyValues(content, content.UcetniDokladDto.HlavickaDokladu?.vlastnosti ?? {});
                    content.findForms("formHeader,formDetail").findFields()
                        // { initialValues: true} - nevyvola se udalost change po naplneni dat
                        // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                        .gfield("model", "apply", content.UcetniDokladDto.HlavickaDokladu, { initialValues: true, setFlags: { triggerChange: false, } }) // verificationNeeded: false 
                        .gfield("model", "validators", $.extend(content.docValidators))
                        .gfield("confirm");
                    //debugger;
                    content.InterniDoklad = content.UcetniDokladDto.HlavickaDokladu?.int_dok;
                    // musim vyvolat zmenu na uctech, aby se dotahly limity
                    if (content.UcetniDokladDto.HlavickaDokladu?.bu_vl != "") {
                        content.findForms("formHeader,formDetail").findFields("bu_vl").gfield("model", "apply", content.UcetniDokladDto.HlavickaDokladu);
                    }
                    // aktualizace zapisu
                    AktualizaceZapisu(content);
                    // nastaveni pristupnosti poli drd a subrada
                    return WaitForData(content)
                        .then((a) => {
                        if (content.closed)
                            return;
                        //RefreshMenu(content);
                        //// uprava pristupnosti poli
                        //ZpristupneniPoli(content);
                        //// Skryti nepotrebnych poli
                        //ZobrazeniPoli(content);
                        // nastaveni pristupnosti poli drd a subrada
                        GetMesic(content)
                            .then(function (mesic) {
                            // pokud neni zadan drd, znepristupni subradu
                            if (mesic == -1)
                                content.findForms("formHeader,formDetail").findFields("drd").gfield("option", "disabled", true);
                        });
                        GetDrdAsync(content)
                            .then(function (drd) {
                            // pokud neni zadan drd, znepristupni subradu
                            if (drd == -1)
                                content.findForms("formHeader,formDetail").findFields("ac_ixe").gfield("option", "disabled", true);
                        });
                        if (content.EditaceHlavicky) {
                            // TODO: Je to porad nutne??
                            GDbd.getElementToFocus(content.element, ".gfield:not(.ui-state-disabled)")?.first().trigger("focus");
                        }
                    });
                }
                /// <summary>
                /// Znovunacteni detailu dokladu
                /// </summary>
                /// <remarks>Tvagenknecht, 3.3.2017.</remarks>
                /// <returns>.</returns>
                function RefreshDetail(content, editaceHlevicky = false, clearFlash = true) {
                    //content.EditaceRadku = false;
                    content.EditaceZapisu = false;
                    //content.ChangeEnable = false;
                    content.newRowStart = false;
                    // vycisteni flash
                    if (clearFlash)
                        content.hideFlash(Detail.flashResult);
                    //content.showDocument = false;
                    //var def = $.Deferred();
                    // znepristupneni vsech akci
                    for (let akce in content.OwnActions) {
                        // debugger;
                        content.actions[akce].update({ enabled: false });
                    }
                    //let oldValue = content.ReloadSeznam;
                    //let OldTab = content.element.find(".gtabmanager").gtabmanager("getActive");
                    content.EditaceHlavicky = editaceHlevicky;
                    // nutne spustit, aby probehly vsechny udalosti
                    content.element.trigger('rememberinitialopen');
                    let def = $.Deferred();
                    content.element.one("detailbuilderfinished", function () {
                        return def.resolve();
                    });
                    //return def.resolve().promise();
                    content.load()
                        .then(function () {
                        //return content.readyAwait.then(() => {
                        //    debugger;
                        //    return;
                        //})
                        //debugger;
                        //content.on("contentready", function () {
                        //    content.off("contentready");
                        //    return def.resolve();
                        //});
                        //return WaitForData(content)
                        //    .then(function () {
                        //        // prepnuti na puvodni zalozku
                        //        //if (OldTab !== null) 
                        //        //    SwitchTab(content, OldTab);
                        //        //return; 
                        //    });
                        //return;
                    });
                    return def.promise();
                }
                Detail.RefreshDetail = RefreshDetail;
                /**
                 * Oductovani zapisu z vazebnich radku
                 * @param {GUctDetail} content
                 * @param {any} frmVazby
                 * @param {any} zapisy
                 * @returns
                 */
                function OductovaniZapisu(content, frmVazby, zapisy, vstup) {
                    const vazbyCnt = $.content(frmVazby);
                    if (typeof vstup === "undefined") {
                        vazbyCnt.beginOperation("jres:30250164".format(zapisy.length)); //RC 30250164 : Probíhá odúčtování, počet zápisů: {0}
                        content.log.trace("Zacatek oductovani", zapisy);
                        vstup = {
                            IdMessage: "",
                            PidDokladu: content.Ixp,
                            DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena,
                            Seznam: zapisy
                        };
                    }
                    return content.isl.UctDokladZapis.oductovatZapisy(vstup)
                        .get()
                        .then(() => {
                        // preberu hodnoty
                        vazbyCnt.endOperation();
                        // uzavreni okna vazeb
                        vazbyCnt.tryClose();
                        console.log("Oductovani provedeno", content.Ixp);
                        // aktualizace seznamu
                        addDocToRefresh(content.Ixp);
                        // aktualizace dat detailu
                        return ReloadRecords(content)
                            //return RefreshDetail(content)
                            .then(function (result) {
                            SwitchToRecords(content);
                            //content.showFlash({ id: "flashOductovani", icon: "gi-tick", label: "jres:30250165".format(zapisy.length), customClass: "g-state-success" }) //RC 30250165 : Úspěšně odúčtováno
                            return result;
                        });
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: vazbyCnt, erroObject: objError,
                        repeat: (returnValue) => {
                            return OductovaniZapisu(content, frmVazby, zapisy, vstup);
                        }
                    }))
                        .always(() => {
                        vazbyCnt.endOperation();
                        if (!vazbyCnt.closed)
                            vazbyCnt.tryClose();
                    });
                }
                Detail.OductovaniZapisu = OductovaniZapisu;
                /**
                 * Nastaveni ukladani bokem pro wfl Dokument
                 * @param content
                 */
                function nastavUlozeni(content, nastavEditaci) {
                    // opravu hlavicky
                    content.actions.actOpravitHlavicku?.updatePermission((nastavEditaci ? { value: false } :
                        (content.UcetniDokladDto.Permissions ? content.UcetniDokladDto.Permissions.PermissionsHlavicka.CanEdit : void 0)));
                    // evidence            
                    content.actions.actEvidence.updatePermission((nastavEditaci ? { value: true } :
                        (content.UcetniDokladDto.Permissions ? content.UcetniDokladDto.Permissions.PermissionsHlavicka.CanUpdate : void 0)));
                }
                Detail.nastavUlozeni = nastavUlozeni;
                /**
                 * Aktualizace menu a KPI
                 * @param content
                 * @param data
                 */
                function RefreshMenu(content) {
                    const that = content;
                    const { actions, EditaceHlavicky, changeProfile, EditaceZapisu, UcetniDokladDto } = content;
                    const { PermissionsHlavicka, PermissionsZapis } = content.UcetniDokladDto.Permissions;
                    // znepristupneni dokumentu wfl
                    if (('setTemporaryEditMode' in content) && UcetniDokladDto.HlavickaDokladu?.IsEvidovany)
                        content.setTemporaryEditMode(!EditaceZapisu);
                    // pocet zapisu dokladu
                    const grid = GetGrid(content);
                    if (grid == null)
                        return;
                    let pocetZapisu = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid);
                    // pokud jsem pridal novy radek na prazdny grid, je potreba ho zahrnout
                    if (pocetZapisu === 0 && content.newRowStart)
                        pocetZapisu = 1;
                    let isEditMode = IsEditMode(content);
                    // storno
                    actions.actStorno?.updatePermission(PermissionsHlavicka.PovoleniStorna);
                    // aktivace storna
                    actions.actAktivaceStorno?.updatePermission(PermissionsHlavicka.PovoleniAktivaceStorna);
                    // uzavreni dokladu
                    actions.actUzavrit?.updatePermission(PermissionsHlavicka.PovoleniUzavreni);
                    // podani dokladu
                    actions.actPodani?.updatePermission(PermissionsHlavicka.CanCreate);
                    // oprava hlavicky
                    // zamena akci dle stavu
                    actions.actOpravit.update(EditaceHlavicky ? content.actionZrusitZmenyHlavicky : content.actionOpravitHlavicku);
                    actions.actOpravit.updatePermission(EditaceHlavicky ?
                        PermissionsHlavicka.CanEdit.value ? PermissionsHlavicka.CanEdit : PermissionsHlavicka.CanStornoEdit
                        :
                            PermissionsHlavicka.CanEdit);
                    actions.actOpravitHlavicku?.updatePermission(PermissionsHlavicka.CanEdit);
                    const editaceTooltip = "jres:30250530"; //RC 30250530 : Během editace nelze akci provést
                    actions.actObcerstvitDoklad?.update({
                        enabled: !isEditMode, tooltip: isEditMode ? editaceTooltip
                            : ""
                    });
                    //const denyEdit: Gordic.General.ApplicationInterface.GPermission = { message: editaceTooltip, value:false,visible:true };
                    // zrusit opravu hlavicky
                    actions.actZrusitOpravutHlavicku?.updatePermission(PermissionsHlavicka.CanStornoEdit);
                    // evidence            
                    actions.actEvidence?.updatePermission(PermissionsHlavicka.CanUpdate);
                    // pokud edituji hlavicku, musim mit pravo evidence
                    if (EditaceHlavicky)
                        actions.actEvidence?.update({ enabled: true, tooltip: "" });
                    // kontrolni hlaseni
                    actions.actKontHlaseniDPH?.updatePermission(PermissionsHlavicka.PovoleniKontrolnihoHlaseni);
                    // vazby dokladu
                    actions.actVazbaDokladu?.updatePermission(PermissionsHlavicka.PovoleniVazebDokladu);
                    // schvaleni
                    actions.actSchvaleni?.updatePermission(PermissionsHlavicka.PovoleniSchvalit);
                    // odschvaleni
                    actions.actOdSchvaleni?.updatePermission(PermissionsHlavicka.PovoleniOdschvalit);
                    // prouctovat
                    actions.actProuctovat?.updatePermission(PermissionsHlavicka.PovoleniProuctovat);
                    // prevzit
                    actions.actPrevzetiDokladu?.updatePermission(PermissionsHlavicka.PovoleniPrevzit);
                    // preevidovat
                    actions.actPreevidovat?.updatePermission(PermissionsHlavicka.PovoleniPreevidovat);
                    // predat
                    actions.actPredat?.updatePermission(PermissionsHlavicka.PovoleniPredat);
                    // pridelit
                    actions.actPridelit?.updatePermission(PermissionsHlavicka.PovoleniPridelit);
                    // vratit do WFL
                    actions.actionVratitDoWfl?.updatePermission(PermissionsHlavicka.PovoleniVraceniDoWFL);
                    // tisk dokladu o zauctovani
                    actions.actTiskZaucDokl?.update({
                        enabled: content.UcetniDokladDto.HlavickaDokladu?.IsZauctovanoCastecne || content.UcetniDokladDto.HlavickaDokladu?.IsZauctovany && !isEditMode,
                        tooltip: isEditMode ? editaceTooltip : ""
                    }),
                        // kopie
                        actions.actKopieDokladu?.updatePermission(PermissionsHlavicka.PovoleniKopieDokladu);
                    // kopie bez polozek
                    actions.actKopieDokladuBezPolozek?.updatePermission(PermissionsHlavicka.PovoleniKopieDokladuBezPolozek);
                    // kopie bez polozek
                    actions.actKopieDokladuBezPolozek?.updatePermission(PermissionsHlavicka.PovoleniKopieDokladuBezPolozek);
                    // zobrazeni uctenky z bankovniho vypisu 
                    actions.acZobrazitUctenku?.updatePermission(PermissionsHlavicka.PovoleniZobrazitUctenku);
                    if (PermissionsHlavicka.PovoleniZobrazitUctenku.value) {
                        UpdateAction([actions.acZobrazitUctenku], { enabled: content.UcetniDokladDto?.IdentifikatorUctenky != null && content.UcetniDokladDto.IdentifikatorUctenky.trim() != "" });
                    }
                    if (isEditMode) {
                        UpdateAction([actions.actPodani,
                            actions.acZobrazitUctenku,
                            actions.actKopieDokladuBezPolozek,
                            actions.actKopieDokladu,
                            actions.actionVratitDoWfl,
                            actions.actPridelit,
                            actions.actPredat,
                            actions.actPreevidovat,
                            actions.actPrevzetiDokladu,
                            actions.actProuctovat,
                            actions.actOdSchvaleni,
                            actions.actSchvaleni,
                            actions.actUzavrit,
                            actions.actStorno,
                            actions.actAktivaceStorno,
                            actions.actVazbaDokladu,
                            actions.actKontHlaseniDPH,
                            //actions.actEvidence!,
                        ], {
                            enabled: false,
                            tooltip: editaceTooltip
                        });
                    }
                    if (EditaceZapisu) {
                        UpdateAction([actions.actOpravit,
                            actions.actKopieDokladuBezPolozek,
                            actions.actKopieDokladu,
                            actions.actPrevzetiDokladu,
                            actions.actPreevidovat,
                            actions.actPredat,
                            actions.actPridelit,
                            actions.actProuctovat,
                            actions.actOdSchvaleni,
                            actions.actSchvaleni,
                            actions.actUzavrit,
                            actions.actUzavrit,
                            actions.actStorno,
                            actions.actAktivaceStorno,
                        ], { enabled: false, tooltip: "jres:30250616" }); //RC 30250616 : Probíhá editace řádku
                    }
                    // *** Zapisy ***
                    // novy radek
                    actions.actPolozkyNovyRadek?.updatePermission(PermissionsZapis.CanCreate);
                    if (changeProfile || content.preFillInProgress || isEditMode)
                        //if (EditaceZapisu || changeProfile)`
                        UpdateAction([actions.actPolozkyNovyRadek], { enabled: false });
                    // ulozit radek
                    actions.actPolozkyUlozit?.updatePermission(PermissionsZapis.CanUpdate);
                    // zrusit editaci
                    actions.actPolozkyZrusit?.updatePermission(PermissionsZapis.PovoleniZrusitEditaciZapisu);
                    //UpdateAction(content.actions.actPolozkyZrusit as GAction, { enabled: content.EditaceZapisu });
                    ////if (EditaceRadku) {
                    //UpdateAction(content.actions.actPolozkyZrusit as GAction, { enabled: content.EditaceZapisu })
                    UpdateAction([actions.actPolozkyUlozit, actions.actPolozkyZrusit, actions.actPolozkyZrusit
                    ], { enabled: EditaceZapisu });
                    //}
                    // editace
                    actions.actPolozkyOpravit?.updatePermission(PermissionsZapis.CanEdit);
                    if (PermissionsZapis.CanEdit.value && (isEditMode || pocetZapisu === 0 || changeProfile)) {
                        UpdateAction([actions.actPolozkyOpravit], { enabled: false });
                    }
                    //Nápověda dat.slova
                    if (content.infoSelector == null)
                        actions.actPolozkyTextyZRozvrhu?.update({ enabled: true, tooltip: "" });
                    if (pocetZapisu === 0 || changeProfile || EditaceHlavicky)
                        UpdateAction([actions.actPolozkyTextyZRozvrhu], { enabled: false, tooltip: "jres:30250623" }); //RC 30250623 : Není řádek zápisu
                    // odstranit
                    actions.actPolozkyOdstranit?.updatePermission(PermissionsZapis.CanDelete);
                    if (PermissionsZapis.CanDelete.value && (isEditMode || pocetZapisu === 0)) {
                        UpdateAction([actions.actPolozkyOdstranit], { enabled: false });
                    }
                    // kopie radku
                    if (!PermissionsZapis.CanEdit.value)
                        UpdateAction([actions.actKopieRadku], { enabled: false });
                    else if (isEditMode)
                        UpdateAction([actions.actKopieRadku], { enabled: false, tooltip: "jres:30250622" }); //RC 30250622 : V režimu editace nelze kopírovat
                    else if (pocetZapisu === 0 || changeProfile)
                        UpdateAction([actions.actKopieRadku], { enabled: false, tooltip: "jres:30250623" }); //RC 30250623 : Není řádek zápisu
                    else {
                        //if (!GetGrid(content).ggrid("mark"))
                        //    UpdateAction(content.actions.actKopieRadku as GAction, { enabled: false, tooltip: "jres:30250624" }); //RC 30250624 : Není označen řádek
                        //else
                        UpdateAction([actions.actKopieRadku], { enabled: true, tooltip: "jres:30250621" }); //RC 30250621 : Kopie označeného řádku
                    }
                    // oznacit
                    //if ( pocetZapisu === 0 || content.changeProfile)) {
                    UpdateAction([actions.actOznacitZapis], { enabled: pocetZapisu === 0 || changeProfile ? false : true });
                    //}
                    //else
                    //    UpdateAction([actions.actOznacitZapis!], { enabled: true });
                    // predkontace
                    actions.actPolozkyPredkontace?.updatePermission(PermissionsZapis.PovoleniPredkontace);
                    if (PermissionsZapis.PovoleniPredkontace.value && (changeProfile || content.preFillInProgress || isEditMode)) {
                        UpdateAction([actions.actPolozkyPredkontace], { enabled: false });
                    }
                    // vyrovnani
                    actions.actPolozkyVyrovnat?.updatePermission(PermissionsZapis.PovoleniVyrovnaniZapisu);
                    let tooltip = "";
                    if (EditaceZapisu === true && content.castkyEnable === true)
                        tooltip = "jres:30250438"; //RC 30250438 : Vyrovnání dokladu
                    else
                        tooltip = "jres:30250439"; //RC 30250439 : Pořizovač účetních zápisů musí být v editaci a kurzor ve e sloupcích MD nebo DAL
                    // menu vyrovnani dokladu
                    UpdateAction([actions.actPolozkyVyrovnat], {
                        enabled: (EditaceZapisu === true && content.castkyEnable === true),
                        tooltip: tooltip,
                        visible: false
                    });
                    // import ze souboru
                    actions.actImportZeSouboru?.updatePermission(PermissionsZapis.PovoleniImportuZeSouboru);
                    UpdateAction([actions.actImportZeSouboru], {
                        enabled: (PermissionsZapis.PovoleniImportuZeSouboru.value && !isEditMode),
                        // tooltip: content.UcetniDokladDto.PovoleniImportuZeSouboru!.ToolTip
                    });
                    actions.actImportZeSouboruPruv?.updatePermission(PermissionsZapis.PovoleniImportuZeSouboru);
                    UpdateAction([actions.actImportZeSouboruPruv], {
                        enabled: (PermissionsZapis.PovoleniImportuZeSouboru.value && !isEditMode),
                        // tooltip: content.UcetniDokladDto.PovoleniImportuZeSouboru!.ToolTip
                    });
                    // menu import
                    //UpdateAction([actions.actImport!], {
                    //    enabled: ( PermissionsZapis!.PovoleniImportuZeSouboru.value && !IsEditMode(content)) ,
                    //    //tooltip: content.UcetniDokladDto.PovoleniImportuZeSouboru!.ToolTip
                    //});
                    // import ze schranky
                    actions.actImportZeSchranky?.updatePermission(PermissionsZapis.PovoleniImportuZeSchranky);
                    UpdateAction([actions.actImportZeSchranky], {
                        enabled: (PermissionsZapis.PovoleniImportuZeSchranky.value && !isEditMode),
                        //tooltip: content.UcetniDokladDto.PovoleniImportuZeSchranky!.ToolTip
                    });
                    // import ze schranky - pruvodce
                    actions.actImportZeSchrankyPruv?.updatePermission(PermissionsZapis.PovoleniImportuZeSchranky);
                    UpdateAction([actions.actImportZeSchrankyPruv], {
                        enabled: (PermissionsZapis.PovoleniImportuZeSchranky.value && !isEditMode),
                        //tooltip: content.UcetniDokladDto.PovoleniImportuZeSchranky!.ToolTip
                    });
                    // vytvoreni predkontace z oznacenych radku
                    actions.actPredkontaceOzn?.updatePermission(PermissionsZapis.PovoleniVytvoritPredkontaci);
                    // vytvoreni predkontace ze vsech radku
                    actions.actPredkontaceVsech?.updatePermission(PermissionsZapis.PovoleniVytvoritPredkontaci);
                    UpdateAction([actions.actPredkontaceOzn, actions.actPredkontaceVsech], {
                        enabled: (PermissionsZapis.PovoleniVytvoritPredkontaci.value && !isEditMode),
                        //tooltip: content.UcetniDokladDto.PovoleniImportuZeSchranky!.ToolTip
                    });
                    if (content.fullscreenElement != null) {
                        UpdateAction([actions.actImportZeSchrankyPruv, actions.actImportZeSouboruPruv,
                            actions.actPredkontaceVsech, actions.actPredkontaceOzn
                            //, actions.actPolozkyTextyZRozvrhu!
                        ], {
                            enabled: false,
                            tooltip: "jres:30250867" //RC 30250867 : V tomto režimu zobrazení není akce povolena
                        });
                    }
                    // hromadny popis zapisu
                    actions.actHromadnyPopisZapisu?.updatePermission(PermissionsZapis.PovoleniHromadnehoPopisuZapisu);
                    if (pocetZapisu == 0) {
                        UpdateAction([actions.actHromadnyPopisZapisu], {
                            enabled: false,
                            tooltip: "jres:30250209" //RC 30250209 : Doklad neobsahuje účetní zápisy
                        });
                    }
                    //if (IsEditMode(content))
                    //    tooltip = "jres:30250440" //RC 30250440 : Doklad je v režimu editace, akci nelze provést
                    //else
                    //    tooltip = "jres:30250441" //RC 30250441 : Načtení zápisů z databáze
                    actions.actObcerstvit.update({
                        enabled: !isEditMode,
                        tooltip: isEditMode ?
                            "jres:30250440" //RC 30250440 : Doklad je v režimu editace, akci nelze provést
                            :
                                "jres:30250441" //RC 30250441 : Načtení zápisů z databáze
                    });
                    // uprava statusbaru        
                    RefreshStatus(content);
                    // uprava KPI
                    RefreshKPI(content);
                }
                Detail.RefreshMenu = RefreshMenu;
                /**
                 * Aktualizace akce
                 *
                 * @param akce
                 */
                function UpdateAction(akce, options) {
                    //let that = this;
                    akce.forEach((item) => {
                        //that.log.trace(item);
                        item.update({
                            enabled: options.enabled,
                            tooltip: options.tooltip && typeof options.tooltip !== "undefined" ? options.tooltip : "",
                            visible: (typeof options.visible === "undefined" || options.visible == null) ? true : options.visible,
                            caption: typeof options.caption === "undefined" || options.caption == null ? void 0 : options.caption,
                            icon: typeof options.icon !== "undefined" && options.icon != null ? options.icon : void 0,
                        });
                    });
                }
                Detail.UpdateAction = UpdateAction;
                /**
                 *  Aktualizace statusbaru
                 * export function RefreshStatus
                 *
                 * @param {GUctDetail} content
                 */
                function RefreshStatus(content) {
                    if (!content.statuses)
                        return;
                    let customClass = "";
                    if (content.UcetniDokladDto.StavDokladu === 90 /* Gordic.Eko.Interface.GEStavyDokladu.Storno */) {
                        // storno
                        customClass = "g-tate-text " + Gordic.Global.Enums.ColorStateClass.error;
                        //stavDoklZkr = "STO";
                        //$statusStav.addClass("g-state-warning");
                    }
                    else if (content.UcetniDokladDto.StavDokladu === 40 /* Gordic.Eko.Interface.GEStavyDokladu.Zauctovano */) {
                        // zauctovano
                        customClass = Gordic.Global.Enums.ColorStateClass.active; // "g-state-success";
                        //stavDoklZkr = "ZAÚ";
                        //$statusStav.addClass("g-state-success");
                    }
                    else {
                        if (content.UcetniDokladDto.StavDokladu === 0 /* Gordic.Eko.Interface.GEStavyDokladu.Nezauctovano */) {
                            // nezauctovano
                            //stavDoklZkr = "NEZ";
                            customClass = ""; //Gordic.Gin.Globals.Enums.ColorStateClass.favorite;
                        }
                        else if (content.UcetniDokladDto.StavDokladu === 5 /* Gordic.Eko.Interface.GEStavyDokladu.Navrh */) {
                            //navrh
                            //stavDoklZkr = "NÁV";
                            customClass = ""; //Gordic.Gin.Globals.Enums.ColorStateClass.favorite;// "g-state-info";
                        }
                        else if (content.UcetniDokladDto.StavDokladu === 10 /* Gordic.Eko.Interface.GEStavyDokladu.ZauctovanoCastecne */) {
                            //zauctovano castecne 
                            //stavDoklZkr = "ZÚČ";
                            customClass = "";
                        }
                        else if (content.UcetniDokladDto.StavDokladu === 50 /* Gordic.Eko.Interface.GEStavyDokladu.Uzavreno */) {
                            //uzavreno
                            //stavDoklZkr = "UZA";
                            customClass = Gordic.Global.Enums.ColorStateClass.inactive;
                        }
                        else if (content.UcetniDokladDto.StavDokladu === 30 /* Gordic.Eko.Interface.GEStavyDokladu.Schvaleno */) {
                            //uzavreno
                            //stavDoklZkr = "SCH";
                            customClass = Gordic.Global.Enums.ColorStateClass.success;
                        }
                        else
                            customClass = Gordic.Global.Enums.ColorStateClass.info; // "g-state-info";
                    }
                    //content.statusStavDokladu.update({
                    //    caption: content.UcetniDokladDto!.StavTxt?.toUpperCase() as any,
                    //    customClass: customClass as any,
                    //    tooltip: content.UcetniDokladDto!.StavTxt as any,
                    //    visible: true,
                    //});
                    Gordic.Eko.Detail.StatusBar.updateItem(content.statuses["statusStavDokladu"] /*content.statusStavDokladu*/, content.UcetniDokladDto.StavTxt?.toUpperCase(), customClass.trim());
                    let textStatus = "";
                    if (content.UcetniDokladDto.HlavickaDokladu.priz_euct === 1) {
                        textStatus = "jres:30250377"; //"INT", //RC 30250377 : Doklad E-učetnictví
                        customClass = "g-state-text";
                    }
                    else if (content.UcetniDokladDto.HlavickaDokladu.int_dok === 1) {
                        textStatus = "jres:30250378"; //"INT", //RC 30250378 : INTERNÍ DOKLAD
                        customClass = "g-state-text g-state-warning";
                    }
                    Gordic.Eko.Detail.StatusBar.updateItem(content.statuses["statusTypDokladu"], textStatus, customClass.trim());
                    textStatus = "";
                    customClass = "";
                    if (content.UcetniDokladDto.HlavickaDokladu.s_sto === 20) {
                        textStatus = "jres:30250836"; //RC 30250836 : STORNO DOKLAD
                        customClass = "g-state-text" + Gordic.Global.Enums.ColorStateClass.important;
                    }
                    Gordic.Eko.Detail.StatusBar.updateItem(content.statuses["statusStavStorno"], textStatus, customClass.trim());
                }
                Detail.RefreshStatus = RefreshStatus;
                /**
                 * Skryti neviditelnych poli
                 * @param content
                 */
                function ZobrazeniPoli(content) {
                    if (content.UcetniDokladDto.HiddenItems != "") {
                        content.findForms("formHeader,formDetail").findFields(content.UcetniDokladDto.HiddenItems).gformrow().addClass('hidden');
                        content.findFormSections('sekEXTDPH').children('label').text('jres:30250548'); //RC 30250548 : Externí subjekt
                    }
                    if (content.UcetniDokladDto.VisibledItems != "") {
                        content.findForms("formHeader,formDetail").findFields(content.UcetniDokladDto.VisibledItems).gformrow().removeClass('hidden');
                        content.findFormSections('sekEXTDPH').children('label').text('jres:30250549'); //RC 30250549 : Externí subjekt a údaje DPH
                    }
                    //content.findFields(content.UcetniDokladDto!.HiddenItems as any).addClass('hidden');
                }
                Detail.ZobrazeniPoli = ZobrazeniPoli;
                /**
                 * Zpristupneni poli formulare
                 * @param {GUctDetail} content
                 */
                function ZpristupneniPoli(content) {
                    //var that = this;
                    // Nejprve vse znepristupnim
                    content.findForms("formHeader,formDetail").findFields().gfield("option", "disabled", true);
                    // grid bude pristupny
                    const grid = GetGrid(content);
                    if (grid == null)
                        return;
                    //grid.findFields().gfield
                    if (content.EditaceHlavicky) {
                        if (content.UcetniDokladDto.EnabledItems != "")
                            content.element.findFields(content.UcetniDokladDto.EnabledItems).gfield("option", "disabled", false);
                        //Nastaveni validatoru
                        NastaveniValidatoru(content);
                    }
                    else {
                        // disable all
                        content.findForms("formHeader,formDetail").findFields().gfield("option", "disabled", true);
                        // grid bude pristupny
                        grid.findFields().gfield("option", "disabled", false);
                    }
                    NastaveniValidatoru(content);
                }
                Detail.ZpristupneniPoli = ZpristupneniPoli;
                /**
                 * Storno/aktivace dokladu
                 *
                 * @param {GUctDetail} content
                 * @param aktivovat - true, doklad se aktivuje
                 * @returns {JQueryPromise<any>}
                 */
                function StornoDokladu(content, aktivovat = false) {
                    return aktivovat ?
                        AktivovatDoklad(content) :
                        StornovatDoklad(content);
                }
                Detail.StornoDokladu = StornoDokladu;
                /**
                * export function Storno dokladu
                *
                * @param {GUctDetail} content
                * @returns {any}
                */
                function StornovatDoklad(content, vstup) {
                    if (typeof vstup === "undefined") {
                        content.beginOperation("jres:30250360"); //RC 30250360 : Probíhá stornovaní dokladu
                        vstup = {
                            IdMessage: "", PidDokladu: content.Ixp, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena
                        };
                    }
                    return content.isl.UctDoklad.stornovat(vstup)
                        .get()
                        .then((result) => {
                        //RefreshAfterAction(content, false);
                        // obcerstveni seznamu na pozadi    
                        //addDocToRefresh( content.Ixp);
                        if (result.result.data.ResultMessage !== null && typeof result.result.data.ResultMessage === "string" && result.result.data.ResultMessage.trim() !== "")
                            content.showFlash({ id: result.result.data.ZauctovanyDoklad ? Detail.flashResult : Detail.flashResult, icon: "gi-tick", label: result.result.data.ResultMessage, customClass: "g-state-success", timer: 5000 });
                        if (typeof result.result.data.PidStornujicihoDoladu !== "undefined" && result.result.data.PidStornujicihoDoladu !== null && result.result.data.PidStornujicihoDoladu.trim() !== "") {
                            // obcerstveni aktualniho stornovaneho dokladu na seznamu
                            addDocToRefresh(content.Ixp);
                            // refresh stornujiciho dokladu
                            addDocToRefresh(result.result.data.PidStornujicihoDoladu);
                            Gordic.Uct.WebClient.ZobrazDetailDleIXP({ content: content, ixp: result.result.data.PidStornujicihoDoladu, samostaneOkno: false, editace: false, polozky: false });
                            //Gordic.Uct.WebClient.ZobrazDetailDleIXPOld(content, result.result.data.PidStornujicihoDoladu as any, false, false);
                            content.endOperation();
                            return result;
                            //return deffer.resolve();
                        }
                        else {
                            //if (result.result.data.DokladPermissions && result.result.data.DokladPermissions.PermissionsHlavicka) 
                            content.UcetniDokladDto.Permissions = result.result.data.DokladPermissions;
                            content.UcetniDokladDto.HlavickaDokladu = result.result.data.Hlavicka;
                            content.UcetniDokladDto.Zapisy?.forEach((zapis) => { zapis.aktivita = 500, zapis.dat_zmena = content.UcetniDokladDto.HlavickaDokladu?.dat_zmena; });
                            //content.UcetniDokladDto.Zapisy = result.result.data.Zapisy;
                            content.UcetniDokladDto.StavDokladu = result.result.data.StavDokladu;
                            content.UcetniDokladDto.StavTxt = result.result.data.StavTxt;
                            content.UcetniDokladDto.DatumZmeny = result.result.data.DatumZmeny;
                            RefreshAfterAction(content, true, false, true, false);
                            //RefreshAfterAction(content, false, false, true);
                            //return RefreshDetail(content)
                            //    .then(function () {
                            //        content.endOperation();
                            //        return result;
                            //    });
                        }
                    })
                        .catch((objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        repeat: (returnValue) => {
                            vstup.Nastaveni = returnValue.Nastaveni;
                            vstup.DuvodStorna = returnValue?.Nastaveni["DuvodStorna"]; //returnValue["DuvodStorna"];                                    
                            vstup.IdMessage = returnValue.IdMessage;
                            return StornovatDoklad(content, vstup);
                        }
                    }))
                        .always(() => { content.endOperation(); });
                }
                Detail.StornovatDoklad = StornovatDoklad;
                /**
                 * export function CloseDocuments
                 *  Uzavreni dokladu
                 * @param {GUctDetail} content
                 * @param {Gordic.Uct.Interface.GUctDokladUzavritRequestDto} [vstup]
                 * @param {any/* JQuery.Deferred<any, any} [deffer]
                 * @returns {JQueryPromise<any>}
                 */
                function CloseDocuments(content, vstup) {
                    if (typeof vstup === "undefined") {
                        content.beginOperation("jres:30250451"); //RC 30250451 : Probíhá uzavírání dokladu
                        vstup = {
                            IdMessage: "", PidDokladu: content.Ixp, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena,
                        };
                    }
                    return content.isl.UctDoklad.uzavrit(vstup)
                        .get()
                        .then((result) => {
                        content.endOperation();
                        // preberu hodnoty
                        content.UcetniDokladDto.HlavickaDokladu.dat_zmena = result.result.data.DatumZmeny;
                        content.UcetniDokladDto.StavDokladu = result.result.data.StavDokladu;
                        content.UcetniDokladDto.StavTxt = result.result.data.StavTxt;
                        // nove
                        content.UcetniDokladDto.HlavickaDokladu = result.result.data.Hlavicka;
                        content.UcetniDokladDto.Permissions = result.result.data.DokladPermissions;
                        if (result.result.data.Zapisy !== null)
                            content.UcetniDokladDto.Zapisy = result.result.data.Zapisy;
                        RefreshAfterAction(content, true);
                        // obcerstveni seznamu na pozadi   
                        addDocToRefresh(content.Ixp);
                        return result;
                    })
                        .catch((objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        repeat: (returnValue) => {
                            vstup.Nastaveni = returnValue.Nastaveni;
                            vstup.IdMessage = returnValue.IdMessage;
                            return CloseDocuments(content, vstup);
                        }
                    }))
                        .always(() => { content.endOperation(); });
                }
                Detail.CloseDocuments = CloseDocuments;
                /**
                * export function Storno dokladu
                *
                * @param {GUctDetail} content
                * @returns {any}
                */
                function AktivovatDoklad(content, vstup) {
                    if (typeof vstup === "undefined") {
                        content.beginOperation("jres:30250357"); //RC 30250357 : Probíhá aktivace
                        vstup = {
                            IdMessage: "", PidDokladu: content.Ixp, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena
                        };
                    }
                    return content.isl.UctDoklad.odStornovat(vstup)
                        .get()
                        .then((result) => {
                        // preberu hodnoty
                        //RefreshAfterAction(content, false);
                        content.UcetniDokladDto.Permissions = result.result.data.DokladPermissions;
                        content.UcetniDokladDto.HlavickaDokladu = result.result.data.Hlavicka;
                        //content.UcetniDokladDto.Zapisy = result.result.data.Zapisy;
                        content.UcetniDokladDto.Zapisy?.forEach((zapis) => { zapis.aktivita = 100, zapis.dat_zmena = content.UcetniDokladDto.HlavickaDokladu?.dat_zmena; });
                        content.UcetniDokladDto.StavDokladu = result.result.data.StavDokladu;
                        content.UcetniDokladDto.StavTxt = result.result.data.StavTxt;
                        content.UcetniDokladDto.DatumZmeny = result.result.data.DatumZmeny;
                        RefreshAfterAction(content, true, false, true, false);
                        // oznaceni, za se ma seznam obcerstvit
                        // TODO: toto neni optimalni, obcas pri zavreni hodi chyby
                        // content.ReloadSeznam = true;
                        // obcerstveni seznamu na pozadi s aktualnim dokledem   
                        //addDocToRefresh( content.Ixp);
                        // obcerstveni seznamu na pozadi se stornujicem dokladem
                        if (result.result.data.PidStornujicihDokladu && result.result.data.PidStornujicihDokladu != "")
                            addDocToRefresh(result.result.data.PidStornujicihDokladu);
                        if (result.result.data.ResultMessage !== null && typeof result.result.data.ResultMessage === "string" && result.result.data.ResultMessage.trim() !== "")
                            //    // text nebyl poslan za serveru
                            //    content.showFlash({ id: "flashSchvaleni", icon: "gi-tick", label: "jres:30250356", customClass: "g-state-success", timer: 5000 })  //RC 30250356 : Doklad byl odschválen
                            //else
                            content.showFlash({ id: Detail.flashResult, icon: "gi-tick", label: result.result.data.ResultMessage, customClass: "g-state-success", timer: 5000 });
                        //return RefreshDetail(content)
                        //    .then(function () {
                        //        content.endOperation();
                        //        return result;
                        //    });                                        
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        repeat: (returnValue) => {
                            vstup.Nastaveni = returnValue.Nastaveni;
                            if (typeof vstup.DuvodAktivaceStorna === "undefined")
                                vstup.DuvodAktivaceStorna = returnValue?.Nastaveni["DuvodAktivaceStorna"];
                            vstup.IdMessage = returnValue.IdMessage;
                            return AktivovatDoklad(content, vstup);
                        }
                    })).always(function () {
                        content.endOperation();
                    });
                }
                Detail.AktivovatDoklad = AktivovatDoklad;
                /**
                 *  Nacteni hodnot z formulare
                 * export function WaitForData
                 *
                 * @param {GUctDetail} content
                 * @param {boolean} loadData
                 * @returns {JQueryPromise<Gordic.Eko.Interface.GUctspidDto>}
                 */
                function WaitForData(content, loadData = false) {
                    //debugger;
                    let formy = content.element.findForms();
                    //if (content.defaultForm === null)
                    //    return $.Deferred().resolve({});
                    //else
                    return formy.gform("waitForValues")
                        .then((o) => {
                        if (content.closed)
                            return;
                        let dtoSaveData = null;
                        if (loadData)
                            content.findForms("formHeader,formDetail").findFields().gfield("model", "collect", dtoSaveData);
                        return $.Deferred().resolve(dtoSaveData).promise();
                    });
                }
                Detail.WaitForData = WaitForData;
                /**
                 * Zpravy, ktere je potreba zpracovat rucne pri evidence
                 *
                 * @param {GUctDetail} content
                 * @param {Eko.Interface.GTransferMessage} message
                 * @param {any} deffer
                 * @returns {JQueryPromise<any>}
                 */
                function ExtendConditionsEvidence(content, message, object) {
                    let deffer = $.Deferred();
                    if (message.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */
                        && message.TypeMessage === 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                        //var uctDoklad = object as Gordic.Eko.Interface.GUctspidDto;
                        Gordic.Eko.WebClient.Common.Dotaz(content, message)
                            .then(function (vysledek) {
                            message.IdMessage = "30100410";
                            if (vysledek.Result == 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                // vzit nabidnute cislo
                                message.Nastaveni["OtazkaVysledkuKontrolyCislaDokladu"] = 2;
                            }
                            else {
                                message.Nastaveni["OtazkaVysledkuKontrolyCislaDokladu"] = 1;
                            }
                            message.Result = 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */;
                            return deffer.resolve(message);
                        });
                        return deffer.promise();
                    }
                    message.Result = 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */;
                    return deffer.resolve(message).promise();
                }
                Detail.ExtendConditionsEvidence = ExtendConditionsEvidence;
                /**
                 * Evidence dokladu
                 *
                 * */
                function Evidence(content, data, closing = false) {
                    return EvidenceDokladu(content, data, closing)
                        .then((result) => {
                        if (content.UcetniDokladDto.IsMusiNavazat && (typeof closing === "undefined" || closing === false)) {
                            return content.dialogs.messageBox({
                                title: "jres:30250592", //RC 30250592 : Otázka
                                html: "jres:30250593", buttons: GDlg.mbbYesNo, icon: GDlg.mbiQuestion
                            }) //RC 30250593 : Opravný doklad musí být navázán na primární doklad. Chcete vazbu vytvořit nyní?
                                .createDialogPromise(GDlg.mbbYes.id)
                                .then(function () {
                                // seznam se bude i přesto načítat
                                return WebClient.VazbyDokladu(content, content.UcetniDokladDto.HlavickaDokladu, false)
                                    .then(() => {
                                    actionAfterEvidence(content);
                                    return result;
                                });
                            });
                        }
                    });
                }
                Detail.Evidence = Evidence;
                /**
                 * Nacteni parametru co delat po evidenci
                 * @param this
                 * @returns
                 */
                function getAkcePoEvidenci() {
                    return this.globalSettings.get("Global.Uct.AppSettings.UctSettingsForm.EvidenceAkce");
                }
                /**
                 * Akce po evidenci dokladu
                 * @param content
                 * @returns
                 */
                function actionAfterEvidence(content) {
                    const grid = GetGrid(content);
                    const def = $.Deferred();
                    if (grid == null)
                        return def.reject().promise();
                    // pokud nejsou zapisu, proved akci dle nastaveni
                    if (Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid) === 0) {
                        // co delat po evidenci
                        const hodnota = getAkcePoEvidenci.call(content); //content.globalSettings!.get("Global.Uct.AppSettings.UctSettingsForm.EvidenceAkce");
                        if (hodnota === "0") {
                            // novy radek                
                            SwitchToRecords(content);
                            // vyvolam akci novy radek
                            WaitForData(content)
                                .then((a) => {
                                if (content.closed)
                                    return $.Deferred().reject().promise();
                                const musiVazat = content.UcetniDokladDto.IsMusiNavazat;
                                content.UcetniDokladDto.IsMusiNavazat = false;
                                return NovyZapis(content)
                                    .always(() => content.UcetniDokladDto.IsMusiNavazat = musiVazat);
                            });
                            //content.actions["actPolozkyNovyRadek"]!.run();
                        }
                        else if (hodnota === "2") {
                            // spusteni predkontace
                            // prepnuti na zalozku zapisu
                            SwitchToRecords(content);
                            content.actions.actPolozkyPredkontace?.run();
                            // to nevim, zda bude fungovat...
                            return def.resolve().promise();
                        }
                    }
                    return def.resolve().promise();
                }
                Detail.actionAfterEvidence = actionAfterEvidence;
                /// <summary>
                /// Evidence dokladu
                /// </summary>
                function EvidenceDokladu(content, data, closing = false) {
                    //let def: JQuery.Deferred<any, any, any>;
                    let dokument = void (0);
                    //const zmenaDokumentu = ('profilDokumentEkoComponentHasChanged' in content) &&content.profilDokumentEkoComponentHasChanged() /*|| !('saveEkoProfil' in content)*/;
                    if (typeof data === "undefined" || data === null) {
                        // validace formuláře (pouze v js bez serveru)
                        if (!content.element.findForms().gform("isValid"))
                            return $.Deferred().reject().promise();
                        // posbirani hodnot z formulare do dto
                        let dtoSaveData = content.UcetniDokladDto.HlavickaDokladu;
                        content.findForms("formDetail,formHeader").findFields().gfield("model", "collect", dtoSaveData); // verificationNeeded: false
                        // oznaceni interniho dokladu
                        dtoSaveData.int_dok = content.InterniDoklad;
                        if (content.UcetniDokladDto.HlavickaDokladu?.IsEvidovany) {
                            // pokud nedoslo ke zmene, nic neposilam na server
                            if ( /*'saveEkoProfil' in content && zmenaDokumentu*/Gordic.Eko.Utils.DokumentHasChanged(content)) {
                                // dokument
                                dokument = $.extend(true, {}, content.saveEkoProfil(), content.saveSslDetailDoruceniEko ? content.saveSslDetailDoruceniEko() : {});
                                dokument.ixs_typ = dokument.ixs_typ ?? dtoSaveData?.ixs_typ;
                                dokument.nazev = dokument.nazev ?? dtoSaveData.dokument?.nazev;
                                dokument.st_utaj_id = dokument.st_utaj_id ?? dtoSaveData.dokument?.st_utaj_id;
                                dokument.ixs_fun_akt = dokument.ixs_fun_akt ?? dtoSaveData.dokument?.ixs_fun_akt;
                                dtoSaveData["dokument"] = dokument;
                            }
                            //debugger;
                            // vlastnosti -- posilat jen pokud doslo ke zmene a existuje metoda
                            if (Gordic.Eko.Utils.VlastnostiHasChanged(content))
                                //if (('descProps_setup' in content)
                                //    && Gordic.PopisneVlastnosti.hasChanged(content)
                                //)
                                dtoSaveData.vlastnosti = Gordic.PopisneVlastnosti.collectValues(content);
                        }
                        let idMessage = "";
                        content.beginOperation("jres:30250347"); //RC 30250347 : Probíhá ukládání
                        data = { Hlavicka: dtoSaveData, IdMessage: idMessage, PidDokladu: content.Ixp };
                    }
                    return content.isl.UctDoklad.saveDocument(data)
                        .getData()
                        .then(function (result) {
                        console.log("Evidence provedena ", content.Ixp);
                        content.EditaceHlavicky = false;
                        content.EditaceZapisu = false;
                        if (closing) {
                            content.endOperation();
                            return result;
                        }
                        // doslo ke zmene dokumentu, musim hard load                
                        content.UcetniDokladDto.Permissions = result.DokladPermissions;
                        content.UcetniDokladDto.HlavickaDokladu = result.Hlavicka;
                        // zapisy neprebiram, zmena pouze dat: zmena a stav
                        content.UcetniDokladDto.Zapisy?.forEach((zapis) => {
                            zapis.dat_zmena = content.UcetniDokladDto.HlavickaDokladu?.dat_zmena,
                                zapis.zmenu_prov = content.UcetniDokladDto.HlavickaDokladu?.zmenu_prov;
                        });
                        content.UcetniDokladDto.StavDokladu = result.StavDokladu;
                        content.UcetniDokladDto.StavTxt = result.StavTxt;
                        content.UcetniDokladDto.DatumZmeny = result.DatumZmeny;
                        let returnValue = !(!('profilDokumentEkoComponentHasChanged' in content) || content.profilDokumentEkoComponentHasChanged());
                        let returnAction;
                        //if (!('saveEkoProfil' in content) || zmenaDokumentu)
                        //    // puvodni dlouhe nacteni
                        //    returnAction = RefreshDetail(content);
                        //else
                        //{                    
                        returnAction = RefreshAfterAction(content, true, false, true, false, true);
                        //}
                        returnAction.then(function () {
                            content.endOperation();
                            // Zobrazit KH DPH
                            if (result.ZobrazitKHDPH) {
                                return PodkladyKHDPH(content, true, content.Globals.Params.AutomatickeOtevreniKHDPH == 2 /* Gordic.Uct.Interface.GEAutomatickeOtevreniKontrolnihoHlaseni.AnoBezDatumu */, result.PrvotniEvidence, true)
                                    .then(() => {
                                    content.endOperation();
                                    //refreshDetail(content,)
                                    // nutne nacit datum zmeny z duvodu mozne zmeni na serveru pri ukladani KH DPH
                                    //return ReloadRecords(content)
                                    //    .then(() => {
                                    if (!content.UcetniDokladDto.IsMusiNavazat)
                                        actionAfterEvidence(content).then(() => returnValue);
                                    return returnValue; //result;
                                    //});
                                });
                            }
                            // co delat po evidenci
                            // pokud nejsou zapisu a nemusi vazat, proved akci dle nastaveni
                            if (!content.UcetniDokladDto.IsMusiNavazat)
                                actionAfterEvidence(content);
                            content.endOperation();
                            return returnValue; //result;
                            //return def.resolve();
                        }).catch(function (err) {
                            content.endOperation();
                            //def.reject();
                            throw err;
                        });
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError, externProcessed: ExtendConditionsEvidence,
                        repeat: (returnValue) => {
                            data.Nastaveni = returnValue.Nastaveni;
                            data.IdMessage = returnValue.IdMessage;
                            return EvidenceDokladu(content, data, closing);
                        }
                    }))
                        .always(() => {
                        content.endOperation();
                    });
                }
                Detail.EvidenceDokladu = EvidenceDokladu;
                /**
                 * Zapnout rezim editace hlavicky prohlizeni/oprava()
                 * @param this
                 * @returns
                 */
                function RezimEditace() {
                    if (this.EditaceHlavicky && this.UcetniDokladDtoOrigin !== null) {
                        this.UcetniDokladDto = this.UcetniDokladDtoOrigin;
                        this.UcetniDokladDtoOrigin = null;
                        this.EditaceHlavicky = false;
                        if ("descProps_setup" in this /*&& this.UcetniDokladDto.HlavickaDokladu?.IsEvidovany*/)
                            this.descProps_setup({ readOnly: true, });
                        return fillForms(this);
                    }
                    return OpravitHlavicku(this);
                }
                Detail.RezimEditace = RezimEditace;
                /**
                 * Opravit hlavicku dokladu
                 * @param {GUctDetail} content
                 */
                function OpravitHlavicku(content) {
                    content.beginOperation();
                    // uschovani puvodni hodnoty
                    content.UcetniDokladDtoOrigin = content.UcetniDokladDto;
                    return content.isl.UctDoklad.readStavDokladu({
                        rq: {
                            EditHlavicka: false, EditZapisy: false,
                            HlavickaDokladu: content.UcetniDokladDto.HlavickaDokladu
                        }
                    })
                        .getData()
                        .then((result) => {
                        // uschovani puvodni hodnoty
                        //content.UcetniDokladDtoOrigin = null;
                        content.EditaceHlavicky = !content.EditaceHlavicky;
                        content.UcetniDokladDto.EnabledItems = result.EnabledItems;
                        content.UcetniDokladDto.HiddenItems = result.HiddenItems;
                        content.UcetniDokladDto.VisibledItems = result.VisibledItems;
                        // V pripade prechodu do editace hlavicky zpristupnim pole popisnych vlastnosti
                        if ("descProps_setup" in content && content.UcetniDokladDto.HlavickaDokladu?.IsEvidovany)
                            content.descProps_setup({ readOnly: !content.EditaceHlavicky, });
                        //content.UcetniDokladDto.HlavickaDokladu = result.HlavickaDokladu;
                        //content.UcetniDokladDto.Permissions.PermissionsZapis = result.Permissions.PermissionsZapis;
                        //content.UcetniDokladDto.Permissions.PermissionsHlavicka = result.Permissions.PermissionsHlavicka;
                        content.UcetniDokladDto.Permissions = result.Permissions;
                        //refreshDetail(content,);
                        //fillForms(content);
                        return;
                    })
                        .fail((ex) => {
                        ex.handled = true;
                        // nacteni celeho detailu znovu
                        return RefreshDetail(content, !content.EditaceHlavicky);
                    })
                        .always(() => content.endOperation());
                }
                /**
                 * Aktualizace detailu po provedeni akce
                 *
                 * */
                function RefreshContent(content, result, fillForm = false, callrefreshDetail = false) {
                    this.setPending(result);
                    return result.then((refresh) => callrefreshDetail || typeof refresh === "undefined" || refresh == true ?
                        refreshDetail.call(content, fillForm)
                        : void (0));
                }
                Detail.RefreshContent = RefreshContent;
                /**
                 * Obnovit detail bez requestu na server
                 *
                 * @param {GUctDetail} content
                 */
                function refreshDetail(fillForm = false) {
                    if (this.closed)
                        return $.Deferred().reject().promise();
                    //this.EditaceZapisu = false;
                    //this.ChangeEnable = false;
                    //this.newRowStart = false;
                    // vycisteni flash
                    this.hideFlash(Detail.flashResult);
                    // naplneni formulare - Zjistit, zda je to potreba?
                    let resolve = fillForm ? fillForms(this) : $.Deferred().resolve().promise();
                    return resolve
                        .then(() => {
                        RefreshMenu(this);
                        //if (this.EditaceHlavicky) {
                        // uprava pristupnosti poli
                        ZpristupneniPoli(this);
                        // Skryti nepotrebnych poli
                        ZobrazeniPoli(this);
                    });
                }
                Detail.refreshDetail = refreshDetail;
                /**
                 * Hromadny popis zapisu
                 * @param content
                 * @returns
                 */
                function HromadnyPopisZapisu(content) {
                    if (content.EditaceHlavicky || content.EditaceZapisu) {
                        content.dialogs.messageBox("jres:30250207", //RC 30250207 : Informace
                        "jres:30250206"); //RC 30250206 : V režimu editace akci nelze provést
                        return;
                    }
                    // zjisteni oznacenych radku
                    let oznaceneRadky = Gordic.Eko.Grid.checkedRows(GetGrid(content), false);
                    if (oznaceneRadky?.length === 0) {
                        content.dialogs.messageBox("jres:30250207", //RC 30250207 : Informace
                        "jres:30250208"); //RC 30250208 : Nejsou žádné účetní zápisy. Akci nelze provést
                        return;
                    }
                    let listID = oznaceneRadky?.map((item) => item.radek_z);
                    return ZadaniTextuPopisuRadku(content)
                        .createDialogPromise()
                        .then((result) => {
                        if (result && result.popis && typeof result.popis === "string" && result.popis.trim() != "") {
                            content.beginOperation("jres:30250120"); //RC 30250120 : Operace se provádí
                            content.isl.UctDokladZapis.hromadnePopsat({ PidDokladu: content.Ixp, listIDRows: listID, PopisRadku: result.popis, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena, PrepsatNeprazdnePopisy: result.prepis })
                                .get()
                                .then(function (result) {
                                content.endOperation();
                                content.UcetniDokladDto.HlavickaDokladu.dat_zmena = result.DatumZmenyDokladuNove;
                                // aktualizace gridu
                                RefreshGrid(content, result.Seznam);
                                content.showFlash({ id: Detail.flashResult, icon: "gi-tick", label: "jres:30250204".format(result.PocetOvlivnenychRadku), customClass: "g-state-success", timer: 5000 }); //RC 30250204 : Popis byl změněn. Počet ovlivněných zápisů: {0}
                                return result;
                            })
                                .always(() => {
                                content.endOperation();
                            });
                        }
                    });
                }
                Detail.HromadnyPopisZapisu = HromadnyPopisZapisu;
                /**
                    * Formular pro zadani popisu radku
                    * @param {GUctDetail} content
                    */
                function ZadaniTextuPopisuRadku(content) {
                    //var that = this;
                    let form = new Gordic.Forms.Form({ tabLabel: "jres:30250200" }) //RC 30250200 : Hromadný popis řádků
                        .addRow({ label: "jres:30250202" }) //RC 30250202 : Zadejte nový popis
                        .addField("gstringbox", {
                        name: "popis", disabled: false,
                        validators: [new Gordic.Validators.Length({ min: 0, max: 254, message: "jres:30250210" }), new Gordic.Validators.Required()], //RC 30250210 : Maximimální velikost textu je 254 znaků!
                    })
                        .addRow()
                        .addField("gcheck", "w-12", {
                        name: "prepis",
                        label: "jres:30250203", //RC 30250203 : Vložit i na zápisy, které mají popis
                    });
                    let simpleForm = content.dialogs.simpleForm("jres:30250200", form, {}, $.extend({ id: "IDPopisRadku" }, {
                        width: 500, height: 200, userSettings: content.userSettings,
                        commandBar: [
                            // TODO: texty do resource
                            {
                                customClass: "g-button--primary",
                                action: new GAction({
                                    name: "actOk", caption: GDlg.mbbOk.text, icon: "gi-tick", run: function (ev) {
                                        let dlg = simpleForm;
                                        console.log("dlg: ", dlg);
                                        if (dlg.gform("isValid", true)) {
                                            let data = /*data ||*/ {};
                                            dlg.findFields().gfield("model", "collect", data);
                                            dlg.gcontent().close(data);
                                        }
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "actZrusit", caption: GDlg.mbbCancel.text, icon: "gi-window-close", run: function (ev) {
                                        let dlg = simpleForm;
                                        dlg.gcontent().close();
                                    }
                                })
                            }
                        ]
                    }));
                    return simpleForm;
                }
                Detail.ZadaniTextuPopisuRadku = ZadaniTextuPopisuRadku;
                /**
                 * Zpravy, ktrere je potreba zpracovat rucne pri schvaleni
                 *
                 * @param {GUctDetail} content
                 * @param {Eko.Interface.GTransferMessage} message
                 * @param {any} deffer
                 * @returns {JQueryPromise<any>}
                 */
                function ExtendConditionsSchvaleni(content, message, object) {
                    //let deffer = $.Deferred();
                    if (message.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */
                        && message.TypeMessage === 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                        if (message.IdMessage == "KontrolaCislaDokladu_que") {
                            let uctDoklad = object;
                            return Gordic.Eko.WebClient.Common.Dotaz(content, message)
                                .then(function (vysledek) {
                                vysledek.Served = true;
                                if (vysledek.Result == 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    vysledek.Result = 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */;
                                    return vysledek;
                                    //return deffer.resolve(vysledek);
                                }
                                else {
                                    message.IdMessage = "30100410";
                                    message.Nastaveni["OtazkaVysledkuKontrolyCislaDokladu"] = 1;
                                    message.Result = 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */;
                                    return message;
                                    //return deffer.resolve(message);
                                }
                            });
                            //return deffer.promise();
                        }
                    }
                    message.Result = 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */;
                    return $.Deferred().resolve(message).promise();
                }
                /**
                 * export function SchvaleniDokladu
                 *
                 * @param {GUctDetail} content
                 * @returns {any}
                 */
                function SchvaleniDokladu(content, vstup) {
                    if (typeof vstup === "undefined") {
                        content.beginOperation("jres:30250352"); //RC 30250352 : Probíhá schvalování
                        vstup = {
                            IdMessage: "", PidDokladu: content.Ixp, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena
                        };
                    }
                    return content.isl.UctDoklad.schvalit(vstup)
                        .get()
                        .then((result) => {
                        //if (result.result.data.DokladPermissions && result.result.data.DokladPermissions.PermissionsHlavicka) 
                        content.UcetniDokladDto.Permissions = result.result.data.DokladPermissions;
                        content.UcetniDokladDto.HlavickaDokladu = result.result.data.Hlavicka;
                        content.UcetniDokladDto.DatumZmeny = result.result.data.Hlavicka?.dat_zmena;
                        const grid = GetGrid(content);
                        if (grid === null)
                            return;
                        content.UcetniDokladDto.Zapisy = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                        //Gordic.Eko.Grid.get<Gordic.Uct.Interface.GUctdpepDto>(GetGrid(content), false)
                        const nula = parseDecimal(0);
                        let zapisy = [];
                        // vyhodim zapisy s nulovymi MD a Dal
                        content.UcetniDokladDto.Zapisy?.
                            forEach((zapis) => {
                            const md = parseDecimal(zapis.c0 ?? 0);
                            const dal = parseDecimal(zapis.c1 ?? 0);
                            if (!md.eq(nula) || !dal.eq(nula)) {
                                if (zapis.up_stav == 0) {
                                    zapis.up_stav = 30, zapis.dat_zmena = content.UcetniDokladDto.HlavickaDokladu?.dat_zmena;
                                }
                                zapisy.push(zapis);
                            }
                        });
                        //zapisy.
                        //    forEach((zapis) => {
                        //        if (zapis.up_stav == 0)
                        //        { zapis.up_stav = 30, zapis.dat_zmena = content.UcetniDokladDto.HlavickaDokladu?.dat_zmena }
                        //    });
                        content.UcetniDokladDto.Zapisy = zapisy;
                        //content.UcetniDokladDto.Zapisy = result.result.data.Zapisy;
                        content.UcetniDokladDto.StavDokladu = result.result.data.StavDokladu;
                        content.UcetniDokladDto.StavTxt = result.result.data.StavTxt;
                        content.UcetniDokladDto.DatumZmeny = result.result.data.DatumZmeny;
                        RefreshAfterAction(content, true, false, true, false);
                        //addDocToRefresh(content.Ixp);
                        //refreshDetail(content);
                        //return RefreshDetail(content)
                        //    .then(() => { 
                        //        content.endOperation();
                        //        return result;
                        //    });
                    })
                        .catch((objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        externProcessed: ExtendConditionsSchvaleni,
                        repeat: (returnValue) => {
                            vstup.Nastaveni = returnValue.Nastaveni;
                            vstup.IdMessage = returnValue.IdMessage;
                            return SchvaleniDokladu(content, vstup);
                        }
                    }))
                        .always(() => {
                        content.endOperation();
                    });
                }
                Detail.SchvaleniDokladu = SchvaleniDokladu;
                /**
                 * export function SchvaleniDokladu
                 *
                 * @param {GUctDetail} content
                 * @returns {any}
                 */
                function OdSchvaleniDokladu(content, vstup) {
                    if (typeof vstup === "undefined") {
                        content.beginOperation("jres:30250357"); //RC 30250357 : Probíhá aktivace
                        vstup = {
                            IdMessage: "", PidDokladu: content.Ixp, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena
                        };
                    }
                    return content.isl.UctDoklad.odSchvalit(vstup)
                        .get()
                        .then((result) => {
                        //if (result.result.data.DokladPermissions && result.result.data.DokladPermissions.PermissionsHlavicka) 
                        content.UcetniDokladDto.Permissions = result.result.data.DokladPermissions;
                        content.UcetniDokladDto.HlavickaDokladu = result.result.data.Hlavicka;
                        content.UcetniDokladDto.Zapisy?.forEach((zapis) => { if (zapis.up_stav == 30) {
                            zapis.up_stav = 0;
                            zapis.dat_zmena = content.UcetniDokladDto.HlavickaDokladu?.dat_zmena;
                        } });
                        //content.UcetniDokladDto.Zapisy = result.result.data.Zapisy;
                        content.UcetniDokladDto.StavDokladu = result.result.data.StavDokladu;
                        content.UcetniDokladDto.StavTxt = result.result.data.StavTxt;
                        content.UcetniDokladDto.DatumZmeny = result.result.data.DatumZmeny;
                        RefreshAfterAction(content, true, false, true, false);
                        //RefreshAfterAction(content, false);
                        //// obcerstveni seznamu na pozadi   
                        //addDocToRefresh(content.Ixp);
                        //return RefreshDetail(content)
                        //    .then( ()=> {
                        //        content.endOperation();
                        //        return result;
                        //    });
                    })
                        .catch((objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        repeat: (returnValue) => {
                            vstup.Nastaveni = returnValue.Nastaveni;
                            vstup.IdMessage = returnValue.IdMessage;
                            return OdSchvaleniDokladu(content, vstup);
                        }
                    }))
                        .always(() => {
                        content.endOperation();
                    });
                }
                Detail.OdSchvaleniDokladu = OdSchvaleniDokladu;
                /**
                     * Aktulaizace detailu pro ukonceni akce
                     *
                     * @param {GUctDetail} content
                     * @param {any}
                     */
                function RefreshAfterActionN(opt) {
                    opt.aktualizovatZapisy = typeof opt.aktualizovatZapisy === "undefined" ? true : opt.aktualizovatZapisy;
                    opt.hardLoad = typeof opt.hardLoad === "undefined" ? false : opt.hardLoad;
                    opt.needRefreshSeznam = typeof opt.needRefreshSeznam === "undefined" ? false : opt.needRefreshSeznam;
                    opt.needRefreshDetail = typeof opt.needRefreshDetail === "undefined" ? true : opt.needRefreshDetail;
                    opt.fillForm = typeof opt.fillForm === "undefined" ? false : opt.fillForm;
                    opt.schvalProces = typeof opt.schvalProces === "undefined" ? true : opt.schvalProces;
                    return RefreshAfterAction(opt.content, opt.aktualizovatZapisy, opt.hardLoad, opt.needRefreshSeznam, opt.needRefreshDetail, opt.fillForm, opt.schvalProces);
                }
                /**
                 * Aktulaizace detailu pro ukonceni akce
                 *
                 * @param {GUctDetail} content
                 * @param {any}
                 */
                function RefreshAfterAction(content, aktualizovatZapisy = true, hardLoad = false, needRefreshSeznam = false, needRefreshDetail = true, fillForm = false, schvalProces = true) {
                    // rozhodnuti, zda je potreba nacist cely detail znovu
                    //TypeGuards.hasFunction(content, 'profilDokumentEkoComponentHasChanged');
                    if ('descProps_setup' in content)
                        content.descProps_setup({ readOnly: true });
                    hardLoad = hardLoad || !('saveEkoProfil' in content) || content.profilDokumentEkoComponentHasChanged();
                    if (needRefreshSeznam)
                        addDocToRefresh(content.Ixp);
                    if (hardLoad) {
                        return RefreshDetail(content)
                            .then(() => {
                            content.endOperation();
                            return;
                        });
                    }
                    if (schvalProces) {
                        // aktualizace schvalovaciho procesu
                        if ((content.Globals.Params?.PodporaSchvalovacihoProcesuGIN && content.Globals.Params?.PodporaSchvalovacihoProcesuUCT)
                            ||
                                (content.Globals.Params?.PodporaSchvalovacihoProcesuGIN && (content.Globals.Params?.PovoleniFinancniKontroly > 0 || content.Globals.Params?.PovoleniUcetniKontroly))) {
                            let ekoSchvalCnt = $.content(content.find("[data-param-id='tabEkoSchvalovani']"));
                            if (typeof ekoSchvalCnt !== "undefined") {
                                // povoleni zauctovat
                                // 7.8.2025 TK: povoleni FIK a UK jiz pred schvalenim
                                let enableZauctovani = content.UcetniDokladDto.Permissions.PermissionsHlavicka.PovoleniProuctovat ||
                                    (content.UcetniDokladDto.HlavickaDokladu?.IsEvidovany
                                        && (content.UcetniDokladDto.HlavickaDokladu?.IsNavrh
                                            || content.UcetniDokladDto.HlavickaDokladu?.StavDokladu == 0 /* Eko.Interface.GEStavyDokladu.Nezauctovano */));
                                let EnabledPodaniFk = enableZauctovani && !content.UcetniDokladDto.HlavickaDokladu?.IsZauctovany && content.Globals.Params?.PovoleniFinancniKontroly > 0; //povoluje podaní FK … musí být explicitně true, aby bylo povoleno
                                let EnabledPodaniUk = enableZauctovani && content.Globals.Params?.PovoleniUcetniKontroly && !content.UcetniDokladDto.HlavickaDokladu?.IsZauctovany; //povoluje podaní UK … musí být explicitně true, aby bylo povoleno
                                let EnabledStornoVyrizFk = enableZauctovani && !content.UcetniDokladDto.HlavickaDokladu?.IsZauctovany; //povoluje storno vyřizení FK … musí být explicitně true, aby bylo povoleno
                                let EnabledStornoVyrizUk = enableZauctovani && !content.UcetniDokladDto.HlavickaDokladu?.IsZauctovany; //povoluje storno vyřizení UK … musí být explicitně true, aby bylo povoleno
                                let EnabledTiskFk = content.UcetniDokladDto.Permissions.PermissionsHlavicka.PovoleniProuctovat.value; // povoluje generování elektronického obrazu … musí být explicitně false, aby bylo povoleno
                                let EnabledTiskUk = content.UcetniDokladDto.Permissions.PermissionsHlavicka.PovoleniProuctovat.value;
                                Gordic.Eko.WebClient.changeEkoSchvalFkSeznamEnabled(content, {
                                    EnabledPodaniFk: EnabledPodaniFk,
                                    EnabledPodaniUk: EnabledPodaniUk,
                                    EnabledStornoVyrizFk: EnabledStornoVyrizFk,
                                    EnabledStornoVyrizUk: EnabledStornoVyrizUk,
                                    EnabledTiskFk: EnabledTiskFk,
                                    EnabledTiskUk: EnabledTiskUk
                                }, ekoSchvalCnt);
                            }
                        }
                    }
                    if (aktualizovatZapisy)
                        AktualizaceZapisu(content);
                    let def = fillForm ? fillForms(content)
                        : $.Deferred().resolve().promise();
                    //RefreshMenu(content);
                    return needRefreshDetail ? def.then(() => refreshDetail.call(content))
                        : def;
                }
                Detail.RefreshAfterAction = RefreshAfterAction;
                /**
                 * Zpravy, ktrere je potreba zpracovat rucne pri prouctovani
                 *
                 * @param {GUctDetail} content
                 * @param {Eko.Interface.GTransferMessage} message
                 * @param {any} deffer
                 * @returns {JQueryPromise<any>}
                 */
                function ExtendConditionsProuctovat(content, message, object) {
                    if (message.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */
                        && message.TypeMessage === 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                        if (message.Message === "STAV") {
                            // Provedeni zmeny stavu zauctovani primarniho dokladu
                            return DotazNaZmenuPrimDokladu(content, message.PoleParam[0], message.PoleParam[1], message.PoleParam[2], false)
                                .then(function (zauctovani) {
                                message.Nastaveni.StavZauctovaniPrimDokladu = zauctovani;
                                if (zauctovani === -10)
                                    message.Result = 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */;
                                else
                                    message.Result = 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */;
                                //return deffer.resolve(message);
                                return message;
                            });
                            //return deffer.promise();
                        }
                        else if (message.Message === "UHR") {
                            // Zmena uhrady primarniho dokladu
                            return DotazNaZmenuPrimDokladu(content, message.PoleParam[0], message.PoleParam[0], message.PoleParam[1], true)
                                .then(function (uhrada) {
                                message.Nastaveni.StavUhradyPrimDokladu = uhrada;
                                if (uhrada === -10)
                                    message.Result = 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */;
                                else
                                    message.Result = 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */;
                                //return deffer.resolve(message);
                                return message;
                            });
                            //return deffer.promise();
                        }
                    }
                    message.Result = 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */;
                    //let deffer = $.Deferred();
                    return $.Deferred().resolve(message).promise();
                }
                /// <summary>
                /// Prouctovani dokladu
                /// </summary>
                function ProuctovaniDokladu(content, vstup) {
                    content.beginOperation("jres:30250358"); //RC 30250358 : Probíhá zaúčtování
                    if (typeof vstup === "undefined") {
                        vstup = {
                            IdMessage: "", PidDokladu: content.Ixp, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena
                        };
                    }
                    return content.isl.UctDoklad.zauctovat(vstup)
                        .get()
                        .then((result) => {
                        //RefreshAfterAction(content, false);
                        content.UcetniDokladDto.Permissions = result.result.data.DokladPermissions;
                        content.UcetniDokladDto.HlavickaDokladu = result.result.data.Hlavicka;
                        content.UcetniDokladDto.Zapisy = result.result.data.Zapisy;
                        content.UcetniDokladDto.StavDokladu = result.result.data.StavDokladu;
                        content.UcetniDokladDto.StavTxt = result.result.data.StavTxt;
                        content.UcetniDokladDto.DatumZmeny = result.result.data.DatumZmeny;
                        RefreshAfterAction(content, true, false, true, false, true);
                        //// obcerstveni seznamu na pozadi     
                        //addDocToRefresh(content.Ixp);
                        //return RefreshDetail(content)
                        //    .then(function () {
                        //        content.endOperation();
                        //        return result;
                        //    });
                    })
                        .catch((objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError, externProcessed: ExtendConditionsProuctovat,
                        repeat: (returnValue) => {
                            vstup.Nastaveni = returnValue.Nastaveni;
                            vstup.IdMessage = returnValue.IdMessage;
                            return ProuctovaniDokladu(content, vstup);
                        }
                    }))
                        .always(function () {
                        content.endOperation();
                    });
                }
                Detail.ProuctovaniDokladu = ProuctovaniDokladu;
                /**
                    * Vytvoreni predkontace ze zapisu
                    * @param content
                    * @param vsechnyRadky
                    */
                function PredkontaceZeZapisu(content, vsechnyRadky) {
                    let rowsDto;
                    let selectedRowsDto;
                    const grid = GetGrid(content);
                    if (grid == null)
                        return;
                    if (vsechnyRadky) {
                        rowsDto = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                        selectedRowsDto = rowsDto;
                    }
                    else {
                        rowsDto = Gordic.Eko.WebClient.Common.GetAllRows(grid); //Gordic.Eko.WebClient.Common.OznaceneRadky(content.GetGrid(that));
                        selectedRowsDto = Gordic.Eko.Grid.checkedRows(GetGrid(content));
                    }
                    content.navigate("Gordic.Eko.WebClient.GDetailPredkontace", {
                        Ixp: null,
                        id: "xxxDetailPredkontace",
                        ModeDetail: Gordic.Eko.WebClient.UctRoz.Enums.ModeDetail.PrevodZapisu,
                        SourceRecords: rowsDto,
                        EnableSmlouva: content.UcetniDokladDto.Permissions.PermissionsZapis.PovoleniSmlouvy?.visible ?? false,
                        SelectedRecords: selectedRowsDto,
                        TypAg: 40
                    })
                        .on("close", function (res) {
                        if (res.returnValue && res.returnValue.refresh === true) {
                            //that.reload(that);
                        }
                    });
                }
                Detail.PredkontaceZeZapisu = PredkontaceZeZapisu;
                /**
                    * Vytvoreni predkontace ze zapisu
                    * @param content
                    * @param vsechnyRadky
                    */
                function ZobrazitUctenku(content) {
                    const ixsUctenky = content.UcetniDokladDto?.IdentifikatorUctenky;
                    if (ixsUctenky) {
                        return Gordic.Wfl.Dialogs.IxsPrilohyDialog(content, {
                            visitors: [
                                new Gordic.Wfl.WebClient.Attachments.GIxsAttachmentVisitor({
                                    ixs: content.Ixp, //ixsUctenky,
                                    downloaderType: "Gordic.Uct.WebClient.GUctFileDownloader",
                                    dao: new Gordic.Wfl.WebClient.Attachments.GIxsAttachmentDAO({ ixs: content.Ixp, islName: "UctLoadAttachmentService" }),
                                    readonly: true
                                })
                            ]
                        }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                    }
                    else {
                        return $.Deferred().reject().promise();
                    }
                }
                Detail.ZobrazitUctenku = ZobrazitUctenku;
                /**
                 * Kopie dokladu
                 *
                 * @param {GUctDetail} content
                 * @param {boolean} seZapisy - true kopie se zapisy
                 * @param {string|null} [sejmutyPidDokladu]
                 * @param {any} [deffer]
                 * @returns {JQueryPromise<any>}
                 */
                function KopieDokladu(content, seZapisy, sejmutyPidDokladu) {
                    //if ( typeof sejmutyPidDokladu === "undefined") {            
                    content.beginOperation("jres:30250449"); //RC 30250449 : Probíhá kopie dokladu
                    //}        
                    return content.isl.UctDoklad.kopieDokladu({
                        rq: {
                            PidDokladu: content.Ixp, SejmutyPidDokladu: sejmutyPidDokladu, KopirovatZapisy: seZapisy,
                            SejnmoutStitek: Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(content, content.Globals.Params?.PovolitGenerovaniPiduDokladu ? "ano" : "ne") === "1"
                        }
                    })
                        .get()
                        .then((result) => {
                        content.endOperation();
                        // obcerstveni seznamu na pozadi      
                        addDocToRefresh(result.result.data.PidDokladu);
                        Gordic.Uct.WebClient.ZobrazDetailDleIXP({ content: content, ixp: result.result.data.PidDokladu, samostaneOkno: false, editace: false, polozky: false });
                        //Gordic.Uct.WebClient.ZobrazDetailDleIXPOld(content, result.result.data.PidDokladu as string, false, false);
                        return result;
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        repeat: (returnValue) => {
                            return KopieDokladu(content, seZapisy, sejmutyPidDokladu);
                        },
                        userMessage: (returnValue) => {
                            // zobrazit dialog zadani pidu 
                            return WebClient.ZobrazVyberPidu(content)
                                .then(function (param) {
                                return KopieDokladu(content, seZapisy, param.PidDokladu);
                            })
                                .catch(() => { throw new GError(); });
                        }
                    })
                    //function (objError:Error, type, obj) {
                    //    let returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(content, objError);
                    //    if (typeof returnMessage === "object") {
                    //        return returnMessage
                    //            .then(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed && returnValue.TypeMessage === Eko.Interface.GETypeTransferMessage.UserMessage) {
                    //                    content.endOperation();
                    //                    // zobrazit dialog zadani pidu 
                    //                    return ZobrazVyberPidu(content)
                    //                        .then(function (param) {
                    //                            return KopieDokladu(content, seZapisy, param!.PidDokladu,);
                    //                        })
                    //                        .catch(() => { throw GError; });
                    //                }
                    //                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                    return KopieDokladu(content, seZapisy, sejmutyPidDokladu);
                    //                }
                    //                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                    content.endOperation();
                    //                    throw GError;
                    //                }
                    //                else {
                    //                    content.endOperation();
                    //                    throw GError;
                    //                }
                    //            }
                    //            )
                    //    }
                    //    content.endOperation();
                    //    throw objError;
                    //}
                    )
                        .always(function () {
                        content.endOperation();
                    });
                }
                Detail.KopieDokladu = KopieDokladu;
                /**
                    * Kontrola cisla dokladu
                    * @param content
                    * @param value
                    * @param def
                    * @param idMessage
                    * @returns
                    */
                function KontrolaCislaDokladu(content, value, idMessage) {
                    if (typeof idMessage == "undefined")
                        idMessage = null;
                    //if (!def || typeof def === "undefined")
                    //    def = $.Deferred();
                    // vyberu data z hlavicky
                    let dtoSaveData = content.UcetniDokladDto.HlavickaDokladu;
                    content.findForms("formHeader,formDetail").findFields().gfield("model", "collect", dtoSaveData);
                    if (value) {
                        if (!value.isReceipt)
                            dtoSaveData.ac_ixe = "*" + value.subrada;
                        else
                            dtoSaveData.ac_ixe = value.subrada.toString();
                    }
                    //var newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, content.UcetniDokladDto.HlavickaDokladu?.ixp_den as any);
                    return content.isl.UctDoklad.kontrolaCislaDokladu({ idMessage: idMessage, dataHlavickyDokladu: dtoSaveData })
                        .get()
                        .then((result) => {
                        value._validatationMsg = "";
                        value._validatationState = "verified";
                        return value;
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        repeat: (returnValue) => KontrolaCislaDokladu(content, value, /*idMessage*/ returnValue.IdMessage),
                        error: (returnValue) => {
                            if (returnValue.IdMessage == "30100413" && returnValue.PoleParam.length == 1) {
                                // ok, jen dam navrhnute cislo a spustim znovu
                                value.subrada = parseInt(returnValue.PoleParam[0]);
                                return KontrolaCislaDokladu(content, value, idMessage);
                            }
                            else {
                                // chyba - konec
                                //value._validatationMsg = returnValue.Message;
                                //value._validatationState = "nonverified";                            
                                throw new GError();
                            }
                        }
                    })
                    //function (jqXHR, type, obj) {
                    //    //debugger;
                    //    //var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(content, obj, type);
                    //    var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(content, jqXHR);
                    //    if (typeof returnMessage === "object") {
                    //        return returnMessage
                    //            .then(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat /*30*/) {
                    //                    // nutne opakovani
                    //                    return KontrolaCislaDokladu(content, value,  /*idMessage*/returnValue.IdMessage as any);
                    //                }
                    //                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                    if (returnValue.IdMessage == "30100413" && returnValue.PoleParam!.length == 1) {
                    //                        // ok, jen dam navrhnute cislo a spustim znovu
                    //                        value.subrada = parseInt(returnValue.PoleParam![0] as any as string);
                    //                        return KontrolaCislaDokladu(content, value, idMessage);
                    //                    }
                    //                    else {
                    //                        // chyba - konec
                    //                        value._validatationMsg = returnValue.Message;
                    //                        value._validatationState = "nonverified";
                    //                        debugger;
                    //                        throw GError;
                    //                    }
                    //                }
                    //            }
                    //            )
                    //    }
                    //    content.endOperation();
                    //    throw jqXHR;
                    //}
                    )
                        .always(function () {
                        content.endOperation();
                    });
                }
                Detail.KontrolaCislaDokladu = KontrolaCislaDokladu;
                /**
                    * Atribut editace dokladu
                    * @param content
                    */
                function IsEditMode(content) {
                    //if (typeof content.EditaceHlavicky !== "undefined" && typeof content.EditaceZapisu === "undefined")
                    return (content.EditaceHlavicky) || content.EditaceZapisu;
                    //else
                    //return false;
                }
                Detail.IsEditMode = IsEditMode;
                /**
                 * Je mozno editovat radek
                 * @param content
                 * @returns
                 */
                function IsCanEditRow(content) {
                    if (IsEditMode(content)
                        || ((content.newRowStart && !content.UcetniDokladDto.Permissions.PermissionsZapis?.CanCreate.value)
                            || (!content.newRowStart && !content.UcetniDokladDto.Permissions.PermissionsZapis?.CanEdit.value)
                        //|| ((content.newRowStart && !content.UcetniDokladDto. PovoleniNovehoZapisu!.Enabled)
                        //   || (!content.newRowStart && !content.UcetniDokladDto.PovoleniEditaciZapisu!.Enabled)
                        ))
                        return false;
                    return true;
                }
                Detail.IsCanEditRow = IsCanEditRow;
                /**
                    * Formula pro vyber stavu prim. dokladu
                    * @param content
                    * @param preSelect
                    * @param puvodniStav
                    * @param pidPrim
                    * @param uhrada
                    */
                function DotazNaZmenuPrimDokladu(content, preSelect, puvodniStav, pidPrim, uhrada) {
                    //var that = this;
                    let stavy;
                    let title;
                    let oldStav = "";
                    let idStav = 0;
                    if (puvodniStav == 10)
                        idStav = 1;
                    else if (puvodniStav == 20)
                        idStav = 2;
                    if (uhrada) {
                        stavy = ["jres:30250123" //RC 30250123 : Neuhrazeno
                            ,
                            "jres:30250124" //RC 30250124 : Uhrazeno částečně
                            ,
                            "jres:30250125"]; //RC 30250125 : Uhrazeno
                        title = "jres:30250122"; //RC 30250122 : Vyberte stav úhrady primárního dokladu
                        oldStav = "jres:30250129" + " " + pidPrim + ": " + stavy[idStav]; //RC 30250129 : Původní stav zaúčtování primárního dokladu
                    }
                    else {
                        stavy = ["jres:30250126" //RC 30250126 : Nezaúčtováno
                            ,
                            "jres:30250127" //RC 30250127 : Zaúčtováno částečně
                            ,
                            "jres:30250128"]; //RC 30250128 : Zaúčtováno
                        title = "jres:30250121"; //RC 30250121 : Vyberte stav zaúčtování primárního dokladu
                        oldStav = "jres:30250129" + " " + pidPrim + ": " + stavy[idStav]; //RC 30250129 : Původní stav zaúčtování primárního dokladu
                    }
                    const form = new Gordic.Forms.Form("L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0")
                        .addField("gradio", {
                        name: "stavZauc",
                        initialValue: preSelect,
                        //itemClass: "w-3",
                        radios: [
                            { value: 0, label: stavy[0] },
                            { value: 10, label: stavy[1] },
                            { value: 20, label: stavy[2] }
                        ],
                    }) //Původní stav zaúčtování primárního dokladu
                        .addSection().addRow()
                        .addField("gstatic", {
                        caption: oldStav
                    });
                    const def = $.Deferred();
                    const simpleForm = content.dialogs.simpleForm(title, form, {}, $.extend({}, {
                        width: 500, height: 230,
                        commandBar: [
                            {
                                customClass: "g-button--primary",
                                action: new GAction({
                                    name: "actOk", caption: GDlg.mbbOk.text, icon: "gi-tick", run: function (ev) {
                                        //var dlg = simpleForm;
                                        //console.log("dlg: ", dlg);
                                        if (simpleForm.gform("isValid", true)) {
                                            let data = /*data ||*/ {};
                                            simpleForm.findFields().gfield("model", "collect", data);
                                            simpleForm.gcontent().close(data);
                                        }
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "actZrusit", caption: GDlg.mbbCancel.text, icon: "gi-window-close", run: function (ev) {
                                        //var dlg = simpleForm;
                                        simpleForm.gcontent().close();
                                    }
                                })
                            }
                        ]
                    }))
                        .on({
                        /*ok: function () {
                            return def.resolve($.content(this).findFields("stavZauc").gfield("getValue"));
                        },*/
                        close: function (ev, data) {
                            if (data)
                                return def.resolve(data.stavZauc);
                            else
                                return def.resolve(-10);
                        } //bude-li dialog zavren pred udalosti 'ok', dojde ke zruseni generovani
                    });
                    return def.promise();
                }
                Detail.DotazNaZmenuPrimDokladu = DotazNaZmenuPrimDokladu;
                /**
                    * Novy zapis
                    * @param {GUctDetail} content
                    */
                function NovyZapis(content, rowDefault) {
                    let def = $.Deferred();
                    if (content.UcetniDokladDto.IsMusiNavazat) {
                        WebClient.VazbyDokladu(content, content.UcetniDokladDto.HlavickaDokladu, false)
                            .then(function () {
                            //def.resolve().promise();
                            //return;
                            return def.reject().promise();
                        }, () => {
                            return def.reject().promise();
                        });
                    }
                    else
                        def.resolve().promise();
                    return def.then(() => {
                        let newRow = {};
                        if (rowDefault) {
                            $.extend(true, newRow, rowDefault);
                            //newRow = rowDefault;//{};
                            //newRow.ixp = null;
                            //newRow.rok = content.UcetniDokladDto.HlavickaDokladu?.rok;
                            //newRow.ac = content.UcetniDokladDto.HlavickaDokladu?.ac;
                            //newRow.mesic = content.UcetniDokladDto.HlavickaDokladu?.mesic;
                            //newRow.den = content.UcetniDokladDto.HlavickaDokladu?.den;
                            //newRow.typ_ag = 40;
                            //newRow.drd = content.UcetniDokladDto.HlavickaDokladu?.drd;
                            //newRow.zd = 0;
                            //newRow.ac_ixe = content.UcetniDokladDto.HlavickaDokladu?.ac_ixe;
                            //newRow.lic = content.UcetniDokladDto.HlavickaDokladu?.lic;
                            //newRow.aktivita = 100;
                            //newRow.radek_z = -1;
                            //newRow.up_stav = 0;
                        }
                        newRow = $.extend(true, newRow, {
                            ixp: null,
                            rok: content.UcetniDokladDto.HlavickaDokladu?.rok,
                            ac: content.UcetniDokladDto.HlavickaDokladu?.ac,
                            mesic: content.UcetniDokladDto.HlavickaDokladu?.mesic,
                            den: content.UcetniDokladDto.HlavickaDokladu?.den,
                            typ_ag: 40,
                            ico: content.Globals.EkoParams?.ICO,
                            ucs: content.UcetniDokladDto.HlavickaDokladu?.ucs,
                            drd: content.UcetniDokladDto.HlavickaDokladu?.drd,
                            zd: 0,
                            nks: content.Globals.EkoParams?.NKS,
                            ac_ixe: content.UcetniDokladDto.HlavickaDokladu?.ac_ixe,
                            uus: content.UcetniDokladDto.HlavickaDokladu?.uus,
                            lic: content.UcetniDokladDto.HlavickaDokladu?.lic,
                            aktivita: 100,
                            radek_z: -1,
                            up_stav: 0
                        });
                        const grid = GetGrid(content);
                        if (grid === null)
                            return $.Deferred().reject().promise();
                        content.newRowStart = true;
                        grid.ggridroweditor("addRow", newRow);
                        setStatus(content, "");
                        // zpristupneni akce textu z rozvrhu
                        content.actions.actPolozkyTextyZRozvrhu?.update({ enabled: true, tooltip: "" });
                        return $.Deferred().resolve(newRow).promise();
                    });
                }
                Detail.NovyZapis = NovyZapis;
                /**
                    *  Atribut noveho radku
                    * @param radek
                    * @returns
                    */
                function IsNewRow(radek) {
                    return radek.ixp == null || radek.ixp;
                }
                Detail.IsNewRow = IsNewRow;
                /**
                 * Ulozit zapis
                 * @param {GUctDetail} content
                 * @param {any} radek
                 */
                function UlozitRadek(content, radek) {
                    if (content.SavingRow)
                        return $.Deferred().reject().promise();
                    let vstup = {
                        IdMessage: "", PidDokladu: content.Ixp, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena,
                        Zapis: radek
                        // Povoleni nulovych hdonot dle parametru
                        ,
                        KontrolaNulovychHodnot: !(typeof radek.radek_z == "undefined" && // toto urcuje, ze se jedna o predkontaci (bohuzel to muze byt i import do porizovace)
                            (content.Globals.Params?.PovoleniNulVPredkontaci == 0 /* Gordic.Uct.Interface.GEPovoleniNulVPredkontace.Povoleno */ // povoleno
                                || (content.Globals.Params?.PovoleniNulVPredkontaci == 2 /* Gordic.Uct.Interface.GEPovoleniNulVPredkontace.DleUzivNastaveni */ &&
                                    // dle uzivatelskeho nastaveni
                                    (content.globalSettings.get("Global.Uct.AppSettings.UctSettingsForm.PredkontaceNuly") ?? false))))
                    };
                    return UlozitRadekDokladu(content, vstup);
                }
                Detail.UlozitRadek = UlozitRadek;
                /**
                 * Akcni metoda ukladani radku
                 * @param {GUctDetail} content
                 * @param {Gordic.Uct.Interface.GUctDokladZapisUlozRequestDto} vstup
                 * @param {any} deferrer?
                 */
                function UlozitRadekDokladu(content, vstup, deferrer) {
                    content.SavingRow = true;
                    let guid;
                    let row;
                    content.actions.actPolozkyUlozit?.update({ enabled: false });
                    content.actions.actPolozkyZrusit?.update({ enabled: false });
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        // pouze pri rucnim ukladani ???
                        //if (typeof vstup.Zapis?.radek_z!=="undefined")
                        // TODO: upravit pro predkontace, kdy se nebude zobrazovat progress
                        if (!content.isRunnigPredkontace())
                            content.beginOperation("jres:30250363"); //RC 30250363 : Probíhá ukládání zápisu 
                        guid = vstup.Zapis?.guid ?? "";
                        row = vstup.Zapis?.row ?? -1;
                    }
                    return content.isl.UctDokladZapis.upsert(vstup)
                        .getData(void 0, { progressState: false, })
                        .then((result) => {
                        // odeberu pocitadlo predkontace
                        if (content.isRunnigPredkontace())
                            content.pocetRadkuPredkontace--;
                        // preberu hodnoty
                        content.UcetniDokladDto.HlavickaDokladu.dat_zmena = result.DatumZmeny;
                        content.UcetniDokladDto.HlavickaDokladu.s_zau = result.StavDokladu;
                        content.UcetniDokladDto.StavDokladu = result.StavDokladu;
                        content.UcetniDokladDto.StavTxt = result.StavTxt;
                        // aktualizace radku
                        content.EditaceZapisu = false;
                        let findedRow = content.UcetniDokladDto.Zapisy?.find((row) => row.radek_z == result.Zapis.radek_z);
                        if (findedRow)
                            findedRow = result.Zapis;
                        else
                            content.UcetniDokladDto.Zapisy?.push(result.Zapis);
                        //for (let i = 0; i < content.UcetniDokladDto.Zapisy!.length; i++) {
                        //    if (content.UcetniDokladDto.Zapisy![i].radek_z == result.Zapis!.radek_z) { content.UcetniDokladDto.Zapisy![i] = result.Zapis as any; break; }
                        //}
                        if (result.StateChanged) {
                            content.UcetniDokladDto.Permissions = result.DokladPermissions;
                            // TODO: Mozna nebude treba, bude se volat pristupnost ve volajici funkci
                            RefreshAfterActionN({
                                content: content,
                                schvalProces: false,
                                aktualizovatZapisy: false
                            });
                            //addDocToRefresh( content.Ixp);
                        }
                        //if (!content.otevreniBezSeznamu)
                        //    Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(null, content.Ixp, true);
                        //debugger;
                        content.endOperation();
                        let zapis = result.Zapis;
                        zapis.guid = guid;
                        zapis.row = row;
                        return deferrer.resolve(result.Zapis);
                        //return deffer.promise();
                    }, (jqXHR, type, obj) => {
                        //debugger;
                        content.actions.actPolozkyUlozit?.update({ enabled: true });
                        content.actions.actPolozkyZrusit?.update({ enabled: true });
                        content.endOperation();
                        throw jqXHR;
                    })
                        .always(() => {
                        content.endOperation();
                        content.SavingRow = false;
                    });
                }
                Detail.UlozitRadekDokladu = UlozitRadekDokladu;
                /// <summary>
                /// Zrusit editaci zapis
                /// </summary>
                function ZrusitEditaciRadku(content) {
                    const grid = GetGrid(content);
                    if (grid === null)
                        return;
                    if (content.preFillInProgress) {
                        Gordic.Widget.GMagicPreFiller.cancelAction.run({ cellInfo: grid.ggrid("activeCellAddress") });
                    }
                    else {
                        grid.ggridroweditor("cancel");
                    }
                }
                Detail.ZrusitEditaciRadku = ZrusitEditaciRadku;
                /// <summary>
                /// Start editace zapisu
                /// </summary>
                function EditaceRadku(content) {
                    content.newRowStart = false;
                    let oznaceneRadky = Gordic.Eko.Grid.checkedRows(GetGrid(content));
                    if (!oznaceneRadky || oznaceneRadky.length == 0) {
                        content.dialogs.messageBox("jres:30250137" //RC 30250137 : Info
                        , "jres:30250141"); //RC 30250141 : Nenalezen řádek k editaci
                        return;
                    }
                    const grid = GetGrid(content);
                    if (grid === null)
                        return;
                    grid.ggridroweditor("start");
                }
                Detail.EditaceRadku = EditaceRadku;
                /**
                 * Odstraneni zapisu
                 * @param {GUctDetail} content
                 * @returns
                 */
                function OdstranitZapis(content, data) {
                    if (typeof data === "undefined" || data === null) {
                        data = {
                            Seznam: Gordic.Eko.Grid.checkedRows(GetGrid(content)),
                            IdMessage: "",
                            PidDokladu: content.Ixp,
                            DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena
                        };
                        content.beginOperation("jres:30250344"); //RC 30250344 : Probíhá mazání zápisů
                        //defer = $.Deferred();
                    }
                    if (data.Seznam == null || data.Seznam?.length === 0) {
                        content.endOperation();
                        content.dialogs.messageBox("jres:30250137" //RC 30250137 : Info
                        , "jres:30250345" //RC 30250345 : Nevybrány žádné zápisy
                        );
                        return $.Deferred().reject().promise();
                    }
                    return content.isl.UctDokladZapis.hromadneOdstranit(data)
                        .get()
                        .then(function (result) {
                        if (content.closed)
                            return;
                        // ok  - konec
                        // Pocet zmeneny radku                    
                        if (result.PocetOvlivnenychRadku > 0) {
                            // nastavim datum zmeny na hlavicku
                            // preberu hodnoty
                            content.UcetniDokladDto.HlavickaDokladu.dat_zmena = result.DatumZmeny;
                            content.UcetniDokladDto.HlavickaDokladu.s_zau = result.StavDokladu;
                            content.UcetniDokladDto.StavDokladu = result.StavDokladu;
                            content.UcetniDokladDto.StavTxt = result.StavTxt;
                            content.UcetniDokladDto.Zapisy = result.Zapisy;
                            content.UcetniDokladDto.Permissions = result.DokladPermissions;
                            RefreshAfterAction(content, true);
                            // aktualizace seznamu
                            addDocToRefresh(content.Ixp);
                            content.endOperation();
                        }
                        return result;
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        repeat: (returnValue) => {
                            content.beginOperation("jres:30250344"); //RC 30250344 : Probíhá mazání zápisů
                            // nutne opakovani
                            data.Nastaveni = returnValue.Nastaveni;
                            return OdstranitZapis(content, data);
                        }
                    })
                    //function (jqXHR, type, obj) {
                    //    if (type === "validation") {
                    //        // ziskani zprav poslanych ze serveru
                    //        let transMsgTst = Gordic.Eko.WebClient.Common.GetTranMessage(obj)
                    //        // test, zda jsou polsany nejaky zpravy
                    //        if (transMsgTst != null) {
                    //            let transMsg = transMsgTst as Gordic.Eko.Interface.GTransferMessage[];
                    //            Gordic.Eko.WebClient.Common.ZpracovaniZprav(content, transMsg)
                    //                .then(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                    if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                        // nutne opakovani
                    //                        data!.Nastaveni = returnValue.Nastaveni;
                    //                        return OdstranitZapis(content, data, defer);
                    //                    }
                    //                    else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                        // chyba, konec
                    //                        //return defer.reject();
                    //                        throw GError;
                    //                    }
                    //                    else
                    //                        throw GError;
                    //                        // chyba - konec
                    //                        //return defer.reject();
                    //                });
                    //        }
                    //    }
                    //    content.endOperation();
                    //    throw jqXHR;
                    //}
                    )
                        .always(function () {
                        content.endOperation();
                    });
                    //return defer.promise();
                }
                Detail.OdstranitZapis = OdstranitZapis;
                /**
                 * Vorovnani
                 * @param content
                 * @param columnName
                 * @param nks
                 * @param radek_z
                 * @param c0
                 * @param c1
                 * @returns
                 */
                function VyrovnatZapisy(content, columnName, nks, radek_z, c0, c1) {
                    $(".js-MD").closest(".gfield").hasClass("ui-disabled");
                    let policko = (columnName === "c0" ? $(".js-MD") : $(".js-DAL")).closest(".gfield");
                    if (policko.hasClass("ui-disabled"))
                        return $.Deferred().resolve().promise();
                    let radek;
                    let rq = {
                        ColumnName: columnName,
                        PidDokladu: content.Ixp,
                        nks: nks,
                        radek_z: radek_z,
                        c0: c0,
                        c1: c1
                    };
                    return content.isl.UctDokladZapis.vyrovnatRadekDokladu({ rq: rq })
                        .get()
                        .then((result) => policko.gfield("setValue", result.c));
                }
                Detail.VyrovnatZapisy = VyrovnatZapisy;
                /**
                    * Predkontace
                    * @param {GUctDetail} content
                    */
                function Predkontace(content) {
                    //content.dialogs.alert("Upozornění", "Akce se je v přípravě");
                    content.dialogs.showModalWindow([Gordic.Eko.WebClient.GVyberPredkontace, { uid: "GVyberPredkontace#" }], {}, "jres:30250599", 800, 600, true) //RC 30250599 : Výběr předkontací
                        .on("close", function (ev, ctx) {
                        if (ctx != null && typeof ctx.selected !== "undefined" && ctx.selected != "") {
                            //Gordic.Eko.Interface.GUctRozdkonDto
                            let filtr = { ixs_kon: ctx.selected };
                            Gordic.Isl.EkoPrekontaceSablonaRadek.list({ typAg: 40, rq: { filters: filtr } })
                                .get()
                                .then(function (result) {
                                // nastavi pocet radku predkontace
                                content.pocetRadkuPredkontace = result.data.length;
                                runPredkontace(content, result.data);
                            });
                        }
                        else {
                        }
                    });
                }
                Detail.Predkontace = Predkontace;
                /**
                    * Import ze schranky, souboru primo do db nebo do porizovacky
                    * @param {GUctDetailt} content
                    */
                function ImportDat(content, typImportu) {
                    PruvodceOperace(content, typImportu);
                }
                Detail.ImportDat = ImportDat;
                /**
                 * Viditelne sloupce na gridu
                 *
                 * @returns
                 */
                function getViditelneSloupce(gridFormat) {
                    let vstup = [];
                    gridFormat.columns.forEach(function (item) {
                        vstup.push({ HeaderText: item.caption, Name: item.name });
                    });
                    return vstup;
                }
                Detail.getViditelneSloupce = getViditelneSloupce;
                /**
                 * Spusteni predkontace
                 * @param content
                 * @param listDataForImport - seznam dat pro import
                 * @returns
                 */
                function runPredkontace(content, listDataForImport, disableBlicking = false) {
                    const grid = GetGrid(content);
                    if (grid === null)
                        return;
                    let nRS = content.newRowStart;
                    content.newRowStart = false;
                    content.preFillInProgress = true;
                    disableBlicking = disableBlicking ?? true;
                    grid.gmagicprefiller({
                        defaultData: {
                            rok: content.UcetniDokladDto.HlavickaDokladu?.rok,
                            nks: content.Globals.EkoParams?.NKS,
                            ucs: content.UcetniDokladDto.HlavickaDokladu?.ucs,
                            ico: content.UcetniDokladDto.HlavickaDokladu?.ico,
                            //ixp: that.UcetniDokladDto.HlavickaDokladu?.ixp,
                            ixp_den: content.UcetniDokladDto.HlavickaDokladu?.ixp_den,
                            up_stav: 0,
                            aktivita: 100
                        },
                        autoCommitRow: true,
                        headerValue: parseDecimal(content.UcetniDokladDto.HlavickaDokladu?.c),
                        //headerMDValue: parseDecimal(that.UcetniDokladDto.HlavickaDokladu?.c!),
                        ownNKS: content.Globals.EkoParams?.NKSVL,
                        setNKS: content.Globals.EkoParams?.NKS
                    });
                    let rules = Gordic.Widget.GMagicPreFiller.GMagicPreFiller.getDataWordsColumns(grid.ggrid("option", "columns"));
                    ;
                    rules.push({
                        column: "nks", type: Gordic.Widget.GMagicPreFiller.RuleType.topology, dataExtend: (val) => {
                            return { nks: val, ico: content.Globals.EkoParams?.ICO };
                        }
                    }, {
                        column: "c0", type: Gordic.Widget.GMagicPreFiller.RuleType.financial
                    }, {
                        column: "c1", type: Gordic.Widget.GMagicPreFiller.RuleType.financial
                    }, {
                        //column: "smlouva", type: Gordic.Widget.GMagicPreFiller.RuleType.other, field: "smlouva", templateName: "sml_t"
                        column: "smlouva", type: Gordic.Widget.GMagicPreFiller.RuleType.contract, field: "smlouva", templateName: "sml_t"
                        //, dataExtend: (val) => {
                        //    return { smlouva: val, ico: content.Globals.EkoParams?.ICO, nks: content.UcetniDokladDto.HlavickaDokladu?.nks };
                        //}
                    }, {
                        column: "popis", type: Gordic.Widget.GMagicPreFiller.RuleType.other, field: "popis", templateName: "naz_t"
                    });
                    // toto tady byt nemusi??
                    //RefreshMenu(content);
                    grid.gmagicprefiller("useTemplates", listDataForImport, rules, false /*disableBlicking*/).then(() => {
                        content.newRowStart = nRS;
                        return;
                    }, () => { content.newRowStart = false; }).always(() => { content.preFillInProgress = false; content.newRowStart = true; RefreshMenu(content); content.newRowStart = nRS; });
                }
                /**
                 * Hromadne operace
                 *
                 */
                function PruvodceOperace(content, typOperace) {
                    let operace;
                    let gridformat;
                    let title = "";
                    switch (typOperace) {
                        case "IMPFILEPOL":
                            // import ze souboru do porizovacky                
                            let form = new Gordic.Forms.Form("L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0");
                            form.addSection();
                            form.addRow("jres:30250525").addField("gfilefield", //RC 30250525 : Výběr souboru
                            {
                                name: "uploadTMPFile",
                                acceptExtension: ".csv",
                                maxFileCount: 1,
                                itemWidth: "w-L-4 w-S-12 w-M-6",
                                //fieldDownloaderClass: "Gordic.Documents.WebClient.GFtpClient",
                                fileUploaded: (ev, obj) => {
                                    //content.showFlash("jres:30250526".format(obj.fileInfo.filename as any), "success", "xx") //RC 30250526 : Soubor {0} nahrán.
                                }
                            });
                            let myform = content.dialogs.simpleForm("jres:30250851", form, {}, $.extend({}, {
                                title: "jres:30250851" //RC 30250851 : Import dat z CSV souboru
                            }));
                            myform.createDialogPromise()
                                .then(function (fileInfo) {
                                if (!fileInfo || typeof fileInfo.uploadTMPFile == "undefined" || fileInfo.uploadTMPFile.length === 0) {
                                    content.dialogs.warning("jres:30250520"); //RC 30250520 : Není vybrán žádný soubor!
                                    return;
                                }
                                if (fileInfo.uploadTMPFile[0].sizeB == 0) {
                                    content.dialogs.warning("jres:30250855"); //RC 30250855 :  Nulová velikost souboru!
                                    return;
                                }
                                content.isl.UctDokladZapis.prepareImportFromFileToADP({ rq: { ViditelneSloupce: getViditelneSloupce(createGridFormat(content)), FileInfo: fileInfo.uploadTMPFile[0] } })
                                    .getData()
                                    .then((returnData) => {
                                    content.pocetRadkuPredkontace = returnData.length;
                                    return runPredkontace(content, returnData);
                                })
                                    .always(() => content.endOperation());
                            });
                            return;
                        case "IMPCLIPPOL":
                            // import ze schranky do porizovacky                
                            Gordic.Utils.readFromClipboard({ parentContent: content })
                                .then(function (result) {
                                if (typeof result !== "undefined" && typeof result.text !== "undefined") {
                                    let contentClipBoard = result.text;
                                    if (typeof contentClipBoard !== "string" || contentClipBoard.trim() === "")
                                        return;
                                    content.isl.UctDokladZapis.prepareImportFromClipboardToADP({ rq: { ViditelneSloupce: getViditelneSloupce(createGridFormat(content)), DataZeSchranky: contentClipBoard } })
                                        .getData()
                                        .then((returnData) => {
                                        content.pocetRadkuPredkontace = returnData.length;
                                        return runPredkontace(content, returnData, true);
                                    })
                                        .always(() => content.endOperation());
                                    return;
                                }
                                else {
                                    if (typeof result !== "undefined" && typeof result.errorMessage !== "undefined")
                                        content.showFlash({ label: result.errorMessage, state: "warning", timer: 2000 });
                                    else
                                        content.showFlash({ label: "jres:30250808", state: "warning", timer: 2000 }); //RC 30250808 : Prázdný obsah schránky
                                }
                            })
                                .catch((error) => {
                                throw error;
                            });
                            return;
                        case "IMPFILE":
                            // import ze souboru
                            gridformat = createGridFormat(content);
                            operace = "GUctOperaceImport"; //File
                            title = "jres:30250819"; //RC 30250819 : Import zápisů ze souboru
                            break;
                        case "IMPCLIP":
                            // import ze schranky
                            gridformat = createGridFormat(content);
                            operace = "GUctOperaceImport"; //Clipboard
                            title = "jres:30250816"; //RC 30250816 : Import zápisů ze schránky
                            break;
                        default:
                            content.dialogs.alert("jres:30250035", //RC 30250035 : Upozornění
                            "jres:30250374"); //RC 30250374 : Neznámá operace
                            return;
                    }
                    content.navigate(Gordic.Uct.WebClient.GUctOperaceImport, { content: content, globals: content.Globals, title: title, type: typOperace, ixp: content.Ixp, grdFormat: gridformat, datZmeny: content.UcetniDokladDto.HlavickaDokladu?.dat_zmena })
                        .on("close", function (cntDiv) {
                        if (typeof cntDiv !== "undefined" && typeof cntDiv.content !== "undefined" && typeof cntDiv.content.successClose === "boolean" && cntDiv.content.successClose === true) {
                            // znovunacteni zapisu dokladu
                            return ReloadRecords(content)
                                .then(() => { SwitchToRecords(content); return; });
                            //return Gordic.Uct.WebClient.Detail.RefreshDetail(content as Gordic.Uct.WebClient.Detail.GUctDetail)
                            //    .then(() => { SwitchToRecords(content); return; });
                        }
                        return;
                    });
                }
                /**
                    * Zobrazeni podkladu KH DPH
                    * @param {GUctDetail} content
                    */
                function PodkladyKHDPH(content, editMode = false, vynulovatDatumyDPH = false, prvotniEvidenceDokladu = false, refresh = false) {
                    //debugger;
                    let objEditace = {};
                    let prava = 0 /* Gordic.Eko.Interface.GEKHPrava.Prohlizeni */;
                    if (content.UcetniDokladDto.HlavickaDokladu.StavDokladu === 2 /* Gordic.Eko.Interface.GEStavyDokladu.Evidovano */
                        || content.UcetniDokladDto.HlavickaDokladu.StavDokladu === 5 /* Gordic.Eko.Interface.GEStavyDokladu.Navrh */
                        || content.UcetniDokladDto.HlavickaDokladu.StavDokladu === 0 /* Gordic.Eko.Interface.GEStavyDokladu.Nezauctovano */) {
                        prava = 1 /* Gordic.Eko.Interface.GEKHPrava.Oprava */;
                    }
                    if (content.UcetniDokladDto.HlavickaDokladu.KategorieDokladu === 1005 /* Gordic.Eko.Interface.GEKategorieDokladu.InsolvencniDanovyDoklad */
                        || content.UcetniDokladDto.HlavickaDokladu.KategorieDokladu === 1006 /* Gordic.Eko.Interface.GEKategorieDokladu.InsolvencniDanovyDokladDlePar46 */
                        || content.UcetniDokladDto.HlavickaDokladu.KategorieDokladu === 1001 /* Gordic.Eko.Interface.GEKategorieDokladu.UcetniDokladDanovy */
                        || content.UcetniDokladDto.HlavickaDokladu.KategorieDokladu === 1793 /* Gordic.Eko.Interface.GEKategorieDokladu.DokladNesparovanychPlatebVydejDanovy */
                        || content.UcetniDokladDto.HlavickaDokladu.KategorieDokladu === 1794 /* Gordic.Eko.Interface.GEKategorieDokladu.DokladNesparovanychPlatebPrijemDanovy */) {
                        objEditace.dat_dor = true;
                        objEditace.dat_vyst = true;
                        objEditace.dat_zdan = true;
                        objEditace.dat_upd = true;
                        objEditace.dat_evid = true;
                        objEditace.ec_dd = true;
                        objEditace.polozkyKH = true;
                        objEditace.priz_inr = true;
                        objEditace.priz_ozp = true;
                        objEditace.priz_pdp = true;
                        objEditace.priz_pomer = true;
                        objEditace.priz_pomer = true;
                        objEditace.priz_zahr = true;
                        objEditace.priz_zpl = true;
                        objEditace.spec_ec_dd = false;
                    }
                    else if (content.UcetniDokladDto.TypAgHlaDokladu === 80) {
                        objEditace.spec_ec_dd = true;
                        objEditace.ec_dd = true;
                        objEditace.priz_pomer = false;
                    }
                    else if (content.UcetniDokladDto.TypAgHlaDokladu === 70) {
                        objEditace.spec_ec_dd = true;
                        objEditace.ec_dd = true;
                        objEditace.priz_pomer = true;
                        objEditace.dat_upd = true;
                        if (content.UcetniDokladDto.HlavickaKH.priz_pdp === 0)
                            // datum zdanit. plneni
                            objEditace.dat_zdan = true;
                    }
                    else {
                        // pokud opravuji UCT
                        if (content.UcetniDokladDto.TypAgHlaDokladu === 40) {
                            // datum vystaveni
                            objEditace.dat_vyst = true;
                        }
                        objEditace.spec_ec_dd = true;
                        objEditace.ec_dd = true;
                    }
                    if (content.UcetniDokladDto.HlavickaDokladu.int_dok === 1) {
                        // interni doklad, musi byt oznaceno OZP do 10 tis.
                        objEditace.priz_ozp = false;
                        // TODO: Jak to nastavim?
                        //objEditace.priz_ozp = 1;
                    }
                    return Gordic.Eko.Dialogs.GDanovaEvidence(content, {
                        ixp: content.Ixp,
                        radek: 0,
                        prava: prava,
                        editSettings: objEditace,
                        vynulovatDatumyDPH: vynulovatDatumyDPH,
                        prvotniEvidenceDokladu: prvotniEvidenceDokladu,
                        editMode: editMode
                    }).then((ulozeno) => {
                        if (ulozeno) {
                            if (refresh)
                                return ReloadRecords(content)
                                    .then(() => {
                                    return refreshDetail.call(content);
                                });
                            else
                                return refreshDetail.call(content);
                        }
                        //return RefreshDetail(content);            
                    });
                }
                Detail.PodkladyKHDPH = PodkladyKHDPH;
                /**
                    * Prevzeti dokladu
                    * @param {GUctDetail} content
                    */
                function PrevzetiDokladu(content) {
                    let that = content;
                    let width = 500;
                    let height = 300;
                    let form = that.dialogs.simpleForm("jres:30250644", WebClient.HromadnaOperaceform(0 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prevzeti */, that, "")
                    //PrevzittForm(content)
                    , { id: "IDPrevzit" }, $.extend({}, { width: width, height: height, userSettings: that.userSettings })) //RC 30250644 : Převzetí dokladu
                    ;
                    form.trigger("focus");
                    return form.createDialogPromise()
                        .then(function (data) {
                        if (typeof data === "undefined")
                            return $.Deferred().reject();
                        //return $.Deferred().reject();
                        let rq = {
                            PidDokladu: content.Ixp,
                            DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena, Duvod: data.duvod,
                            CisReal: data.cis_real,
                            IxsFunVyriz: data.ixs_fun_vyriz
                        };
                        content.beginOperation("jres:30250389"); //RC 30250389 : Probíhá převzetí dokladu
                        return content.isl.UctDoklad.prevzitDoklad(rq)
                            .get()
                            .then(function (result) {
                            RefreshAfterAction(content, false);
                            addDocToRefresh(content.Ixp);
                            //if (result.result.data.ResultMessage === null || typeof result.result.data.ResultMessage !== "string" || result.result.data.ResultMessage.trim() === "")
                            //    // text nebyl poslan za serveru
                            //    content.showFlash({ id: "flashPrevzit", icon: "gi-tick", label: "jres:30250391", customClass: "g-state-success", timer: 5000 })  //RC 30250391 : Doklad byl úspěšně převzat
                            //else
                            //    content.showFlash({ id: "flashPrevzit", icon: "gi-tick", label: result.result.data.ResultMessage, customClass: "g-state-success", timer: 5000 })
                            return RefreshDetail(content)
                                .then(function () {
                                content.endOperation();
                                return result;
                            });
                            //content.endOperation();                       
                            //def.promise();
                            //return;
                        })
                            .always(() => content.endOperation());
                        //return;
                    })
                        .always(() => content.endOperation());
                }
                Detail.PrevzetiDokladu = PrevzetiDokladu;
                /**
                 * Vraceni do WFL vrstvy
                 *
                 * */
                function VratitDoWFL(content, vstup) {
                    if (typeof vstup === "undefined") {
                        //deffer = $.Deferred();
                        content.beginOperation("jres:30250754"); //RC 30250754 : Probíhá vracení do WFL            
                        vstup = {
                            IdMessage: "", PidDokladu: content.Ixp, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena
                        };
                    }
                    return content.isl.UctDoklad.vratitDoWFL(vstup)
                        .get()
                        .then((result) => {
                        RefreshAfterAction(content, false);
                        // obcerstveni seznamu na pozadi    
                        addDocToRefresh(content.Ixp);
                        content.showFlash({ id: Detail.flashResult, icon: "gi-tick", label: "jres:30250755", customClass: "g-state-success", timer: 5000 }); //RC 30250755 : Doklad byl vrácen do WFL
                        //debugger;
                        return RefreshDetail(content, false, false)
                            .then(function () {
                            content.endOperation();
                            return result;
                        });
                        //return deffer?.promise();
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        repeat: (returnValue) => {
                            vstup.Nastaveni = returnValue.Nastaveni;
                            vstup.Duvod = returnValue.Nastaveni?.["Duvod"]; //returnValue["DuvodStorna"];
                            //vstup?.DuvodStorna = 
                            vstup.IdMessage = returnValue.IdMessage;
                            return VratitDoWFL(content, vstup);
                        }
                    })
                    //function (jqXHR, type, obj) {
                    //    let returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(content, jqXHR);
                    //    if (typeof returnMessage === "object") {
                    //        return returnMessage
                    //            .then(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                    debugger; 
                    //                    //vstup!.DuvodStorna = returnValue["DuvodStorna"];
                    //                    vstup!.Nastaveni = returnValue.Nastaveni;
                    //                    vstup!.Duvod = returnValue.Nastaveni?.["Duvod"];//returnValue["DuvodStorna"];
                    //                    //vstup?.DuvodStorna = 
                    //                    vstup!.IdMessage = returnValue.IdMessage;
                    //                    return VratitDoWFL(content, vstup);
                    //                }
                    //                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                    content.endOperation();
                    //                    throw GError;
                    //                    //return deffer?.reject();
                    //                }
                    //                else {
                    //                    content.endOperation();
                    //                    return returnValue;
                    //                    //return deffer?.resolve();
                    //                }
                    //            }
                    //            )
                    //        //return deffer?.promise();
                    //    }
                    //    content.endOperation();
                    //    throw jqXHR;
                    //}
                    )
                        .always(() => content.endOperation());
                }
                Detail.VratitDoWFL = VratitDoWFL;
                /**
                    * Zjisteni akutalniho editovaneho radku
                    * @param content
                    * @returns
                    */
                /*
                export function GetCurrentRow(content: GUctDetail) {
                    return content.CurrentRow;
                }
                */
                /**
                    * Nacteni typu dokladu z formulare
                    */
                function GetIxsTypAsync(content, async = true) {
                    if (content.closed)
                        return $.Deferred().resolve("").promise();
                    return content.findForms("formHeader,formDetail").findFields("ixs_typ").gfield("getValueAsync").then(function (value) {
                        if (value)
                            return (value.ixs_typ);
                        else
                            return "";
                    });
                }
                Detail.GetIxsTypAsync = GetIxsTypAsync;
                /**
                    * Nacteni typu dokladu z formulare
                    */
                function GetIxsTyp(content, async = true) {
                    if (content.closed)
                        return "";
                    let value = content.findFields("ixs_typ").gfield("getValue");
                    if (value)
                        return value.ixs_typ;
                    return "";
                }
                Detail.GetIxsTyp = GetIxsTyp;
                // Nacteni kategorie dokladu z formulare
                function GetKtgTyp(content) {
                    if (content.closed) {
                        return -1;
                    }
                    let value = content.findFields("ixs_typ").gfield("getValue");
                    if (value)
                        return value.ktg_typ;
                    return -1;
                }
                Detail.GetKtgTyp = GetKtgTyp;
                // Nacteni kategorie dokladu z formulare
                function GetKtgTypAsync(content) {
                    if (content.closed) {
                        return $.Deferred().resolve(-1).promise();
                    }
                    return content.findForms("formHeader,formDetail").findFields("ixs_typ").gfield("getValueAsync").then(function (value) {
                        if (value)
                            return (value.ktg_typ);
                        else
                            return -1;
                    });
                }
                Detail.GetKtgTypAsync = GetKtgTypAsync;
                // Nacteni mesice dokladu z formulare
                function GetMesic(content) {
                    if (content.closed) {
                        return $.Deferred().resolve(-1).promise();
                    }
                    return content.findForms("formHeader,formDetail").findFields("mesic").gfield("getValueAsync").then(function (value) {
                        if (value && value.cislo)
                            return (parseInt(value.cislo));
                        else
                            return -1;
                    });
                }
                Detail.GetMesic = GetMesic;
                /**
                    * Nacteni druhu dokladu (DRD) z formulare
                    * @param content obsah
                    * @returns {int} Druh dokladu
                    */
                function GetDrdAsync(content, synchro = false) {
                    if (content.closed)
                        return $.Deferred().resolve(-1).promise();
                    return content.findForms("formHeader,formDetail").findFields("drd").gfield("getValueAsync").then(function (value) {
                        if (value)
                            return value.drd;
                        else
                            return -1;
                    });
                }
                Detail.GetDrdAsync = GetDrdAsync;
                /**
                    * Nacteni druhu dokladu (DRD) z formulare
                    * @param content obsah
                    * @returns {int} Druh dokladu
                    */
                function GetDrd(content) {
                    if (content.closed)
                        return -1;
                    let value = content.findForms("formHeader,formDetail".format(Gordic.Eko.HeaderForm.Name)).findFields("drd").gfield("getValue");
                    if (value)
                        return value.drd;
                    return -1;
                }
                Detail.GetDrd = GetDrd;
                /**
                 * Nacteni roku DPH dokladu z formulare
                 *
                 * @param content
                 * @returns
                 */
                function GetDPHRok(content) {
                    if (content.closed)
                        return -1;
                    let value = content.findForms("formHeader,formDetail").findFields("rok_dph").gfield("getValue");
                    return value ? (parseInt(value)) : -1;
                }
                Detail.GetDPHRok = GetDPHRok;
                /**
                 * Nacteni mesice DPH dokladu z formulare
                 *
                 * @param content
                 * @returns
                 */
                function GetDPHMesic(content) {
                    if (content.closed)
                        return -1;
                    let value = content.findForms("formHeader,formDetail").findFields("mesic_dph").gfield("getValue");
                    return value && value.cislo ? parseInt(value.cislo) : -1;
                }
                Detail.GetDPHMesic = GetDPHMesic;
                /**
                 * Nacteni castky na hlavicce dokladu z formulare
                 *
                 * @param content
                 * @returns
                 */
                function GetValue(content) {
                    if (content.closed)
                        return "";
                    return content.findForms("formHeader,formDetail").findFields("c").gfield("getValue");
                }
                Detail.GetValue = GetValue;
                /**
                    * Zjisteni cisla dokladu
                    * @param {GUctDetail} content
                    * @returns
                    */
                function GetNumberDoc(content) {
                    if (content.closed)
                        return null;
                    return content.findForms("formHeader,formDetail").findFields("ac_ixe").gfield("getValue");
                }
                Detail.GetNumberDoc = GetNumberDoc;
                /**
                    *  ZJisteni typu uctu
                    * @param content
                    */
                function IsTypUctuPrijmovy(content) {
                    return GetCurrentEditRow(content)
                        .then((radek) => {
                        //debugger;
                        if (typeof radek === "undefined" || radek === null) {
                            return false;
                        }
                        return content.isl.UctDokladZapis.isPrijmovyUcet({ radek: radek })
                            .get()
                            .then((result) => result, () => false);
                    }, () => false);
                }
                Detail.IsTypUctuPrijmovy = IsTypUctuPrijmovy;
                /**
                    * Zjisteni pristupnosti smlouvy
                    * @param content
                    */
                function IsEnableSmlouva(content, relatedElement, cancelationToken) {
                    // docasne
                    //return $.Deferred().resolve(true);
                    return GetCurrentEditRow(content)
                        .then(function (currentRow) {
                        if (cancelationToken?.cancelled)
                            return $.Deferred().reject(false);
                        let vstup = { IdMessage: null, PidDokladu: content.Ixp, Zapis: currentRow };
                        if (vstup.Zapis?.priz_kur_roz !== null || typeof vstup.Zapis?.priz_kur_roz !== "undefined")
                            vstup.Zapis.priz_kur_roz = parseInt(vstup.Zapis.priz_kur_roz);
                        return _IsEnableSmlouva(content, vstup, relatedElement, cancelationToken);
                    }, () => $.Deferred().resolve(false));
                }
                Detail.IsEnableSmlouva = IsEnableSmlouva;
                /**
                    * Zjisteni pristupnosti smlouvy
                    * @param idMessage
                    * @param content
                    * @param curentRow
                    * @param idMessage
                    * @returns
                    */
                function _IsEnableSmlouva(content, vstup, relatedElement, cancelationToken) {
                    return content.isl.UctDokladZapis.isAllowedSmlouva({ rq: vstup }).get()
                        .then((result) => result, 
                    //(jqXHR, type, obj) =>
                    ((objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: content, erroObject: objError,
                        beforeStart: () => { return (cancelationToken?.cancelled) ? false : true; },
                        repeat: (returnValue) => {
                            if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                vstup.IdMessage = returnValue.IdMessage;
                                return _IsEnableSmlouva(content, vstup, relatedElement);
                            }
                        },
                        error: (returnValue) => {
                            return $.Deferred().resolve(false).promise();
                        },
                        success: (returnValue) => {
                            return $.Deferred().resolve(true).promise();
                        }
                    }))
                    //{
                    //    if (cancelationToken?.cancelled) return $.Deferred().reject(false);
                    //    //var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(content, obj, type, vstup, { relatedElement });
                    //    let returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(content, jqXHR, { relatedElement });
                    //    if (typeof returnMessage === "object") {
                    //        return returnMessage
                    //            .then(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                var ret = false;
                    //                if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                    vstup.IdMessage = returnValue.IdMessage;
                    //                    return _IsEnableSmlouva(content, vstup, relatedElement);
                    //                }
                    //                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error)
                    //                    ret = false;
                    //                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.OK)
                    //                    ret = true;
                    //                content.endOperation();
                    //                return ret;
                    //            })
                    //    }
                    //    throw jqXHR;
                    //}
                    )
                        .always(() => { content.endOperation(); });
                }
                /**
                    * Nejaka cekacka na hodnoty
                    * @param row
                    */
                function waitForValues(row) {
                    let f = row.find(".gfield").not(".js-smlField");
                    let p = f.get().map(function (it) { return $(it).gfield("waitingForValue"); }).filter(function (it) { return !!it; });
                    if (p.length)
                        return $.when.apply(null, p).then(row.gform.bind(f, "waitForValues"));
                    else
                        return $.Deferred().resolve().promise();
                }
                /**
                    *  Zjisteni aktualne editovaneho radku
                    * @param content
                */
                function GetCurrentEditRow(content, noValid = false) {
                    //var that = this;
                    const def = $.Deferred();
                    const grid = GetGrid(content);
                    if (grid === null)
                        return def.reject().promise();
                    let row = $(grid).find(".cell.editing").closest('.row').eq(0); //.row.editing nemusí být ještě nastaveno, toto je jistější
                    if (row.length) {
                        let ci = grid.ggrid("cellInfo", row, true);
                        ci.data["rok"] = content.UcetniDokladDto.HlavickaDokladu?.rok;
                        ci.data["ac"] = content.UcetniDokladDto.HlavickaDokladu?.ac;
                        ci.data["mesic"] = content.UcetniDokladDto.HlavickaDokladu?.mesic;
                        ci.data["den"] = content.UcetniDokladDto.HlavickaDokladu?.den;
                        ci.data["typ_ag"] = 40;
                        ci.data["ucs"] = content.UcetniDokladDto.HlavickaDokladu?.ucs;
                        ci.data["drd"] = content.UcetniDokladDto.HlavickaDokladu?.drd;
                        ci.data["zd"] = 0;
                        ci.data["nks"] = content.UcetniDokladDto.HlavickaDokladu?.nks;
                        ci.data["ac_ixe"] = content.UcetniDokladDto.HlavickaDokladu?.ac_ixe;
                        ci.data["uus"] = content.UcetniDokladDto.HlavickaDokladu?.uus;
                        ci.data["lic"] = content.UcetniDokladDto.HlavickaDokladu?.lic;
                        ci.data["aktivita"] = 100;
                        //ci!.data!["radek_z"] = -1;
                        ci.data["up_stav"] = 0;
                        if (noValid)
                            return def.resolve($.extend(true, {}, ci?.data)).promise();
                        waitForValues(row)
                            .then(function () {
                            if (content.closed)
                                return;
                            if (!row.gform("isValid"))
                                return $.Deferred().reject();
                            let tempData = $.extend(true, {}, ci?.data);
                            row.find(".cell.editing").each(function (cell, element) { $(element).data("editor").collect(tempData); });
                            return def.resolve(tempData);
                        });
                        return def.promise();
                    }
                    return def.reject().promise();
                }
                Detail.GetCurrentEditRow = GetCurrentEditRow;
                /// <summary>
                /// Zjisteni, zda se jedna o prijem nebo vydej
                /// </summary>
                /// <param name="c0">MD</param>
                /// <param name="c1">Dal</param>
                /// <param name="priznRezerChar">Rezervacni priznak</param>
                /// <returns></returns>
                function IsPrijem(c0, c1, priznRezerChar) {
                    let l_bPrijem = false;
                    switch (priznRezerChar) {
                        case 20:
                        case 30:
                        case 40:
                            l_bPrijem = true;
                            break;
                        case 25:
                        case 35:
                        case 45:
                            l_bPrijem = false;
                            break;
                        default:
                            l_bPrijem = !((c1.abs()) > (c0.abs()));
                            break;
                    }
                    return l_bPrijem;
                }
                Detail.IsPrijem = IsPrijem;
                /**
                 * Vytvoreni gridformatu ucetnich polozek
                 *
                 * @param content
                 * @returns
                 */
                function createGridFormat(content, wizard = false) {
                    let gridFormat = new Gordic.Data.GridFormat();
                    if (wizard) {
                        gridFormat.addIconColumn({
                            name: "wiz_kind", caption: "jres:30250815", width: 40, //RC 30250815 : Kontrola
                            hidden: false,
                            iconTemplate: function (data) {
                                if (data.wiz_kind === 200 /* Gordic.Uct.Interface.GEResultOperation.Success */) // vyhovující doklad
                                    return { icon: "fa-check-circle g-state-success g-state-text", tooltip: "jres:30250503" }; //RC 30250503 : OK
                                else if (data.wiz_kind === 206 /* Gordic.Uct.Interface.GEResultOperation.Warning */) // vyhovující doklad s upozrněním
                                    return { icon: "fa-exclamation-triangle g-state-warning g-state-text", tooltip: "jres:30250813" }; //RC 30250813 : Řádek s upozorněním
                                else if (data.wiz_kind === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */) // nevyhovující doklad
                                    return { icon: "fa-times-circle g-state-error g-state-text", tooltip: "jres:30250812" }; //RC 30250812 : Nevyhovující řádek
                                else // žádný výsledek neexistuje
                                    return { icon: "", text: "", tooltip: "" }; // neutrální doklad
                            }
                        })
                            .addTextColumn({
                            name: "wiz_txt_err", caption: "jres:30250814", width: 170, // vlastnosti přidaného sloupce //RC 30250814 : Kontrola - výsledek
                        });
                    }
                    else
                        gridFormat.addNumberColumn({
                            name: "radek_z",
                            caption: "#",
                            width: 40,
                            fixedWidth: true,
                            sortable: false,
                            customClass: "ui-disabled",
                        });
                    gridFormat.addNks({
                        //name: "nks",
                        //sysColumn: true,
                        //caption: Gordic.Consts.DbShortcuts.nks,
                        sortable: false,
                        width: 70,
                        editor: {
                            widget: "gselectbox",
                            options: [Gordic.Prefabs.Select.ekosnks(),
                                {
                                    name: "nks",
                                    itemTemplate: "{nks:trim:encode}",
                                    showSelectButton: false,
                                    validators: [new Gordic.Validators.Required()],
                                    change: function (ev, changeObj) {
                                        let nks = changeObj.value ? changeObj.value?.nks : "";
                                        $(this).gfield("resetErrors");
                                        if (!nks || nks === "") {
                                            $(this).gfield("setError", { stopping: true, errorType: "error", group: "reverifyErr", message: "jres:30250843".format(Gordic.Consts.DbShortcuts.nks) }); //RC 30250843 : {0} musí být zadáno.
                                            return;
                                        }
                                        Detail.nastavStavy(content, 0, 0);
                                        $(this).gfield("smartNavNext");
                                    },
                                    //customClass: "gporizovacConfig",                      
                                    serverFilters: {
                                        ico: content.Globals.EkoParams?.ICO, //content.serverContext.ico//content.datovaVeta.ico
                                        aktivita: 100,
                                        //ucs: content.Globals.EkoParams?.UCS,
                                        rok_od: "<= " + content.Globals.EkoParams?.Rok,
                                        rok_do: ">= " + content.Globals.EkoParams?.Rok,
                                        vazbaNksNaFunkci: content.Globals.Params?.VazbaNksNaFunkci ? content.Globals.Others?.IxsFun : void 0,
                                    },
                                    model: "model.ico=value.ico,model.nks=value.nks",
                                    customClass: "js-NKS"
                                }]
                        }
                    })
                        //Gordic.Consts.DbShortcuts.uus
                        //.addSortedEkoCfuSet(content, { isEditable: true, managerOptions: { showDataWordsInfos:true } })
                        .addSortedEkoCfuSet(content, { isEditable: true, managerOptions: { showDataWordsInfos: true, externalHelpDialog: true, useNonDigital: content.Globals.EkoParams?.PrizCheckUete } })
                        .addMD({
                        //name: "c0",
                        //structureLead:true,
                        //caption: "jres:30250019", //RC 30250019 : MD
                        //width: 110,
                        //customClass:"js-castka",
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            //start: alert("start MD"),
                            options: [
                                Gordic.Prefabs.Number.decimal(2, true), { name: "c0", customClass: "js-MD" /*, model: "model.c0=value",*/ }
                            ]
                        }
                    })
                        .addDal({
                        //name: "c1",
                        //caption: "jres:30250131", //RC 30250131 : Dal
                        //width: 110,
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            options: [
                                Gordic.Prefabs.Number.decimal(2, true), { name: "c1", customClass: "js-DAL" /*,model: "model.c1=value", */ }
                            ]
                        }
                    })
                        .addPopis({
                        //name: "popis",
                        //caption: "jres:30250024", //RC 30250024 : Popis
                        //width: 300,
                        sortable: false,
                        customClass: "js-popis",
                        editor: {
                            widget: "gstringbox",
                            options: [
                                { smartNavOnLength: 254 }
                            ]
                        }
                    });
                    if (content.UcetniDokladDto.Permissions.PermissionsZapis.PovoleniSmlouvy.visible) {
                        //if (wizard) {
                        //    gridFormat.addTextColumn({
                        //        name: "smlouva",
                        //        caption: "jres:30250746", //RC 30250746 : Smlouva
                        //        width: 150,
                        //        fixedWidth: true,
                        //        sortable: false,
                        //        customClass: "ui-disabled",
                        //    })
                        //}
                        //else
                        {
                            //if (content.UcetniDokladDto.PovoleniSmlouvy!.Visible) {
                            const observableState = {
                                customClass: "uct-sml-napocetState", id: "stateCheck", position: "right", icon: "fa-square-o", type: "static", tooltip: "jres:30250432" //RC 30250432 : Nebude proveden nápočet na položku smlouvy
                            };
                            const updateState = (status) => {
                                observableState.icon = status ? "fa-check-square-o" : "fa-square-o",
                                    observableState.tooltip = status ? "jres:30250431" //RC 30250431 : Bude proveden nápočet na položku smlouvy
                                        : "jres:30250432"; //RC 30250432 : Nebude proveden nápočet na položku smlouvy
                            };
                            let cancellationToken = null;
                            gridFormat.addHtmlColumn({
                                name: "smlouva",
                                caption: "jres:30250862", //RC 30250862 : Smlouva
                                width: 150,
                                sortable: false,
                                customClass: "js-smlField",
                                printable: (row) => (row.smlouva ? (row.smlouva + (row.cislo_sml ? "-" + (row.priz_rez_sml ? "ANO" : "NE") : "")) : ""),
                                cellTemplate: function (row) {
                                    if (row.ixp_sml != null) {
                                        let result = $.newDiv();
                                        result.append($.newSpan().text(row.smlouva));
                                        result.append($.newSpan().css("float", "right").gstatic({
                                            /*initialValue: true,*/
                                            //disabled: true,                            
                                            tooltip: row.priz_rez_sml ? "jres:30250431" //RC 30250431 : Bude proveden nápočet na položku smlouvy
                                                : "jres:30250432", //RC 30250432 : Nebude proveden nápočet na položku smlouvy
                                            icon: row.priz_rez_sml ? "fa-check-square-o" : "fa-square-o"
                                        }));
                                        return result;
                                    }
                                    return "";
                                },
                                editor: {
                                    widget: "gformbox",
                                    options: [{
                                            name: "smlouva",
                                            model: "model.ixp_sml=value.smlpol.ixp_sml_pri, model.rok_sml=value.smlpol.rok_sml, model.smlouva=value.smlpol.smlouva, model.ac_sml=value.smlpol.ac_sml, model.cislo_sml=value.smlpol.cislo, model.priz_rez_sml=value.isNapocet",
                                            modelValueTransform: {
                                                apply: function (modelValue) {
                                                    modelValue.smlpol.rok = modelValue.smlpol.rok_sml;
                                                    updateState(!!modelValue.isNapocet);
                                                    $(this).gfield('addState', observableState);
                                                    return modelValue;
                                                },
                                                collect: function (fieldValue) {
                                                    return fieldValue;
                                                }
                                            },
                                            change: function (ev, ctx) {
                                                updateState(!!ctx.value?.isNapocet);
                                                $(this).gfield('addState', observableState);
                                            },
                                            mode: "default",
                                            customClass: "js-smlField js-KR",
                                            dialogOptions: { width: 250 },
                                            states: [observableState],
                                            itemTemplate: function (item) {
                                                updateState(!!item.isNapocet);
                                                $(this).gfield('addState', observableState);
                                                if (item?.smlpol?.ixp_sml_pri != null || item?.smlpol?.ixp != null)
                                                    return createSmlPrefabField(content).itemTemplate.call(this, item.smlpol);
                                                else
                                                    return "jres:30250433"; //RC 30250433 : Zadat smlouvu
                                            }, //přesměrování na item template prefabu, aby to bylo stejné
                                            form: new Gordic.Forms.Form({
                                                complete: function () {
                                                    $(this).addClass('js-sml-not-init').findFields().gfield('disable');
                                                    if (cancellationToken !== null) {
                                                        cancellationToken.cancel();
                                                    }
                                                    cancellationToken = new Gordic.Utils.GCancellationToken();
                                                    $(this).on('ginlinedialogclose', () => { if (cancellationToken !== null)
                                                        cancellationToken.cancel(); });
                                                }
                                            })
                                                .addPrefab(GetFormSml(content).form.sections)
                                                .addSection({ customClass: 'hidden' }).addField('gdummyfield', 'w-h', {
                                                customClass: 'hidden',
                                                name: "temp",
                                                model: function (operation, dto, modelOptions) {
                                                    let field = this;
                                                    let form = $(this).gform();
                                                    if (operation == "apply" && form.hasClass('js-sml-not-init')) {
                                                        form.gcover();
                                                        form.removeClass('js-sml-not-init');
                                                        content.log.debug("Zjisteni pristupnosti smlouvy");
                                                        IsEnableSmlouva(content, $(this), cancellationToken).then((param) => {
                                                            if (param === true) {
                                                                content.log.debug("Vyber kurzovych rozdilu");
                                                                // spusteni vyberu typu kurzovych rozdilu
                                                                return AlgoritmusKurzovychRozdilu(content, 0 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.Zadny */, $(this), cancellationToken);
                                                            }
                                                            else { // pokud není -> převedeme na reject
                                                                content.log.debug("reject 1");
                                                                form.closest('.ginlinedialog').ginlinedialog('focus');
                                                                return $.Deferred().reject(null);
                                                            }
                                                        }).then((res) => {
                                                            if (res.PristupnostSmlouvy === 3 /* Interface.GEPristupnostSmlouvy.PristupnaNepovinna */
                                                                || res.PristupnostSmlouvy === 4 /* Interface.GEPristupnostSmlouvy.PristupnaPovinna */
                                                                || res.PristupnostSmlouvy === 1 /* Interface.GEPristupnostSmlouvy.Neurceno */) {
                                                                return true;
                                                            }
                                                            else {
                                                                // nutne vymazani smlouvy
                                                                content.log.debug("reject 2");
                                                                return $.Deferred().reject(null);
                                                            }
                                                        }).then(() => {
                                                            //var formDesc = GetFormSml(content);
                                                            //form.gform('createFrom', formDesc);
                                                            form.findFields().not(field).gfield('enable'); //.gfield('model', 'apply', dto, modelOptions);
                                                            form.findFields('isNapocet').gfield((!!content.Globals.EkoParams?.IsIssp || !content.Globals.Params?.PovolitNapocetNaFPSML || dto.isNew || dto.smlpol?.ac_sml?.trim() && dto.smlpol?.cislo == null) ? 'disable' : 'enable');
                                                            content.log.debug("return 1");
                                                            return;
                                                        }, () => {
                                                            content.log.debug("Smlouvu nelze vybrat.");
                                                            $.newDiv().insertBefore(form).gflashpanel({ label: "jres:30250797", state: "warning" }); //RC 30250797 : Smlouvu nelze vybrat.
                                                        }).always(() => {
                                                            if (form.hasClass('gcover')) {
                                                                form.gcover('destroy');
                                                                const f = form.findFields().filter(':visible').first();
                                                                if (!f.gfield('option', 'disabled'))
                                                                    f.gfield('focus');
                                                            }
                                                        });
                                                    }
                                                },
                                            }),
                                        },
                                    ]
                                }
                            });
                        }
                    }
                    if (content.Globals.EkoParams?.IsIssp) {
                        gridFormat.addTextColumn({
                            name: "id_hdr_ris",
                            caption: "jres:30250134", //RC 30250134 : ID IISSP
                            sortable: false,
                            width: 70,
                        })
                            .addNumberColumn({
                            name: "radek_hdr",
                            caption: "jres:30250135", //RC 30250135 : Řádek IISSP
                            width: 40,
                            fixedWidth: true,
                            sortable: false,
                            customClass: "ui-disabled"
                        })
                            .addHtmlColumn({
                            name: "priz_kur_roz",
                            caption: "jres:30250136", //RC 30250136 : KR
                            width: 300,
                            sortable: false,
                            customClass: "ui-disabled js-polkr",
                            editor: {
                                widget: "gformbox",
                                options: {
                                    disabled: true, tabindex: -1,
                                    itemTemplate: (item) => {
                                        if (item !== null) {
                                            let kr = GetTextKurzRozdilu(item);
                                            return kr.kod;
                                        }
                                        return "";
                                    },
                                    itemTooltipTemplate: (item) => {
                                        if (item !== null) {
                                            let kr = GetTextKurzRozdilu(item);
                                            return kr.name;
                                        }
                                        return "";
                                    }
                                }
                            },
                            cellTemplate: function (row) {
                                if (row.priz_kur_roz !== null) {
                                    let kr = GetTextKurzRozdilu(row.priz_kur_roz);
                                    return kr.kod;
                                }
                                return "";
                            },
                            tooltipTemplate: function (row) {
                                if (row.priz_kur_roz !== null) {
                                    let kr = GetTextKurzRozdilu(row.priz_kur_roz);
                                    return kr.name;
                                }
                                return "";
                            },
                        });
                    }
                    return gridFormat;
                }
                Detail.createGridFormat = createGridFormat;
                /**
                 *
                 * @param content
                 * @returns
                 */
                function createSmlPrefabField(content) {
                    const logovaniEsu = {
                        Ixp: content.Ixp,
                        AktZnacka: content.UcetniDokladDto.dokument?.akt_znacka ? content.UcetniDokladDto.dokument?.akt_znacka : "" //content.UcetniDokladDto.AktZnacka as string,
                    };
                    let inputDto = {
                        rokPol: content.Globals.EkoParams.Rok,
                        ixps: content.UcetniDokladDto.SeznamNavazanychSmluvKPrimDokladu,
                        pouzeSmlouvy: false,
                        navazaniNaSkladbu: true,
                        prijmy: function () { return IsTypUctuPrijmovy(content); } // zjisti ze serveru
                    };
                    return Gordic.Prefabs.Select.ekoVyberPolozkySmlouvy({
                        canNewAndRefund: !content.Globals.EkoParams?.IsIssp && content.Globals.Params?.PovolitNapocetNaFPSML,
                        parentContent: content,
                        // nutno doresit
                        esuLogovani: logovaniEsu,
                        inputDto: inputDto,
                        newPolSelectOptions: () => {
                            return {
                                canNewAndRefund: true,
                                esuLogovani: logovaniEsu,
                                inputDto: inputDto,
                                parentContent: content,
                            };
                        },
                        init: function (inputDto, filter) {
                            let values = {};
                            const grid = GetGrid(content);
                            if (grid == null)
                                return;
                            //získání gridu a sesbírání hodnot z aktuálně editovaného řádku – zkoušel jsem to v UCT, ostatní musí získat element gridu nějak po svém
                            grid.findFields().gfield("model", "collect", values);
                            //nastavení vyhovující položky
                            //tady to chce nějaký sofistikovanější přístup … možná z toho udělat nějakou funkci do utils (DTO -> uex) ?
                            inputDto.uex = (content.rozsirenaVeta) ? [values.uea, values.ueb, values.uec, values.ued, values.uee, values.uef, values.ueg, values.ueh, values.uei, values.uej, values.te0, values.te1, values.te2, values.te3, values.te4, values.uek, values.uel, values.uem, values.uen, values.te05, values.te06, values.te07, values.te08, values.te09]
                                :
                                    [values.uea, values.ueb, values.uec, values.ued, values.uee, values.uef, values.ueg, values.ueh, values.uei, values.uej, values.te0, values.te1, values.te2, values.te3, values.te4];
                            //priprava enumu
                            let pripady = Gordic.Eko.GVyberSmlouvy.PripadyEnum;
                            let prijmove = Gordic.Eko.GVyberSmlouvy.PrijmoveEnum;
                            let vydajove = Gordic.Eko.GVyberSmlouvy.VydajoveEnum;
                            //nastaveni checkboxu
                            //filter.prijmove_typ = [prijmove.Smlouvy, prijmove.Objednavky];
                            //filter.vydajove_typ = [vydajove.Smlouvy, vydajove.Objednavky];
                            filter.smluvni_pripady = [pripady.SeSchvalenouPolozkou, pripady.SVyhovujiciPolozkou];
                        }
                    });
                }
                Detail.createSmlPrefabField = createSmlPrefabField;
                function GetFormSml(content) {
                    let smlouvyPrefab = createSmlPrefabField(content);
                    let frm = new Gordic.Forms.Form({
                        layoutDescriptor: "L1M1S1 LMS-12-11-1"
                    });
                    frm.addRow("Smlouva").addField("gselectbox", smlouvyPrefab, {
                        change: function (ev, ctx) {
                            const smlField = content.element.find(".js-smlField").closest(".gfield");
                            const napocetField = $(".js-napocet").closest(".gfield");
                            const data = smlField.gfield("getValue");
                            if (!(ctx.value?.ixp_sml_pri || ctx.value?.ixp)) { // v podstatě null
                                napocetField.gfield("setValue", false).gfield('disable');
                                return;
                            }
                            if (ctx?.value?.isNew === true) {
                                // nastavim si, ze se jedna o novou polozku a povoleni zaskrtavatka
                                if (data) {
                                    data.isNew = true;
                                    data.isNapocet = true;
                                }
                                napocetField.gfield("setValue", true).gfield('disable');
                            }
                            else if (data) {
                                data.isNew = false;
                                napocetField.gfield('enable');
                            }
                            else {
                                // muze to zustat nepristupne, pokud jsem nejprve vybral novou polozku a pak jsem to chtel zmenit na jiz existujici
                                napocetField.gfield("option", "disabled", false);
                            }
                            // pokud je statni pokladna, nebo neni povolena parametrem, neni mozny napocet
                            if (!!content.Globals.EkoParams?.IsIssp || !content.Globals.Params?.PovolitNapocetNaFPSML)
                                napocetField.gfield("option", "disabled", true);
                            if (ctx?.value?.ixp) {
                                ctx.value.ixp_sml_pri = ctx.value.ixp;
                                if (data) {
                                    data.smlpol = data.smlpol || {};
                                    data.smlpol.ixp_sml_pri = ctx.value.ixp;
                                }
                            }
                        },
                        name: "smlpol",
                        model: function (op) {
                            if (op === "apply" || op === 'collect' && !$(this).gform().hasClass('gcover') /*&& $(this).gfield('getValueAsync').state() != 'pending'*/ && !$(this).gfield('option', 'disabled'))
                                return "smlpol";
                        },
                        verticalButtons: false,
                    }).addRow({ layoutDescriptor: 'L1M1S1 LMS-0-11-1' }).addField('gcheck', {
                        name: 'isNapocet',
                        modelValueTransform: {
                            apply: (value) => {
                                return !!value;
                            }
                        },
                        model: function (op) {
                            if (op === "apply" || op === 'collect' && !$(this).gform().hasClass('gcover') /*&& $(this).gfield('getValueAsync').state() != 'pending' */ && !$(this).gfield('option', 'disabled'))
                                return "isNapocet";
                        },
                        customClass: "js-napocet",
                        label: "jres:30250820", //RC 30250820 : Nápočet na položku smlouvy
                        disabled: !!content.Globals.EkoParams?.IsIssp || !content.Globals.Params?.PovolitNapocetNaFPSML,
                        initialValue: false,
                    });
                    return frm;
                }
                Detail.GetFormSml = GetFormSml;
                /*
                 *
                 * Prevod numericke hodnoty KR na textove hodnoty (kod/nazev)
                 *
                 * */
                function GetTextKurzRozdilu(typKurzRoz) {
                    if (typKurzRoz === 1 /* Interface.GETypKurzovychRozdilu.Zisk */)
                        return { kod: "ZK", name: "1 " + "jres:30250411" }; //RC 30250411 : Kurzový zisk
                    else if (typKurzRoz === 2 /* Interface.GETypKurzovychRozdilu.OpravaZisku */)
                        return { kod: "OZK", name: "2 " + "jres:30250412" }; //RC 30250412 : Oprava kurzového zisku
                    else if (typKurzRoz === 3 /* Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciVydaje */)
                        return { kod: "ZTV", name: "3 " + "jres:30250413" }; //RC 30250413 : Kurzová ztráta při realizaci výdaje
                    else if (typKurzRoz === 4 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciVydaje */)
                        return { kod: "OZTV", name: "4 " + "jres:30250414" }; //RC 30250414 : Oprava kurzové ztráty při realizaci výdaje
                    else if (typKurzRoz === 5 /* Interface.GETypKurzovychRozdilu.JinyVydaj */)
                        return { kod: "JV", name: "5 " + "jres:30250415" }; //RC 30250415 : Jiné výdaje
                    else if (typKurzRoz === 6 /* Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciPrijmu */)
                        return { kod: "ZTP", name: "6 " + "jres:30250416" }; //RC 30250416 : Kurzové ztráty při realizaci příjmu
                    else if (typKurzRoz === 7 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciPrijmu */)
                        return { kod: "OZTP", name: "7 " + "jres:30250417" }; //RC 30250417 : Oprava kurzové ztráty při realizaci příjmu
                    else
                        //Interface.GETypKurzovychRozdilu.Zadny
                        return { kod: " ", name: "jres:30250270" }; //RC 30250270 : Nenastaveno
                }
                Detail.GetTextKurzRozdilu = GetTextKurzRozdilu;
                /**
                    * Nacteni zapisu dokladu
                    *
                    * @param {GUctDetail} content
                    */
                function ReloadRecords(content, refresh = true) {
                    //debugger;
                    content.beginOperation("jres:30250564"); //RC 30250564 : Načítám...
                    let myfiltr = { ixp: content.UcetniDokladDto.ixp };
                    let newWay = true;
                    if (newWay) {
                        return content.isl.UctDoklad.readSimpleDoklad({ PidDokladu: content.UcetniDokladDto.ixp }).getData()
                            .then(function (result) {
                            //debugger;                
                            content.UcetniDokladDto.HlavickaDokladu = result.Hlavicka;
                            //content.UcetniDokladDto.HlavickaDokladu!.dat_zmena = result.DatumZmeny;
                            content.UcetniDokladDto.StavDokladu = result.StavDokladu;
                            content.UcetniDokladDto.StavTxt = result.StavTxt;
                            content.UcetniDokladDto.Zapisy = result.Zapisy;
                            content.UcetniDokladDto.Permissions = result.DokladPermissions;
                            content.UcetniDokladDto.IsMusiNavazat = result.IsMusiNavazat;
                            const grid = GetGrid(content);
                            if (grid === null)
                                return;
                            result.Zapisy.forEach((row) => {
                                row.enabled = row.enabled && content.UcetniDokladDto.HlavickaDokladu.s_zau !== 50;
                            });
                            //let view = grid.ggrid("getView");
                            //// 11.8.2025 uprava
                            //view.updateData(result.Zapisy);
                            if (refresh)
                                RefreshAfterAction(content, true, undefined, undefined, undefined, true);
                            return;
                        })
                            .always(() => { content.endOperation(); });
                    }
                    else {
                        return content.isl.UctDokladZapis.list({ filters: myfiltr }).getData()
                            .then(function (seznamZapisuDokladu) {
                            //debugger;                
                            const grid = GetGrid(content);
                            if (grid === null)
                                return;
                            seznamZapisuDokladu.forEach((row) => {
                                row.enabled = row.enabled && content.UcetniDokladDto.HlavickaDokladu.s_zau !== 50;
                            });
                            let view = grid.ggrid("getView");
                            // 11.8.2025 uprava
                            view.updateData(seznamZapisuDokladu);
                            //var view = new Gordic.Data.View(seznamZapisuDokladu, { key: "ixp,radek_z" });
                            //grid.ggrid("setData", view, true);
                            return;
                        })
                            .always(() => { content.endOperation(); });
                    }
                    //var myGrid = GetGrid(content);
                    //myGrid.ggrid("setData", new Gordic.Isl.View(Gordic.Isl.UctDokladZapis.list({ filters: myfiltr })));
                }
                Detail.ReloadRecords = ReloadRecords;
                /**
                    * Obnoveni gridu ze zaslanych dat
                    *
                    * @param {GUctDetail} content
                    */
                function RefreshGrid(content, data) {
                    const grid = GetGrid(content);
                    if (grid === null)
                        return;
                    grid.ggrid("setData", new Gordic.Data.View(data, { key: "ixp,radek_z" }), true);
                }
                Detail.RefreshGrid = RefreshGrid;
                /**
                 * function SwitchToRecords
                 *
                 *  Prepnuti na zalozku se zapisy
                 * @param {GUctDetail} content
                 */
                function SwitchToRecords(content) {
                    SwitchTab(content, content.myTabs.rows);
                }
                Detail.SwitchToRecords = SwitchToRecords;
                /**
                 * function SwitchTab
                 *
                 * Prepinani zalozek
                 * @param {GUctDetail} content
                 * @param {string} nameTabs
                 */
                function SwitchTab(content, nameTabs) {
                    if (content.PolozkyView == 0 /* && nameTabs !== content.myTabs.rows*/)
                        content.element.find(".gtabmanager").gtabmanager("setActive", nameTabs);
                }
                Detail.SwitchTab = SwitchTab;
                /**
                 * Oznaceni dokladu jako interni
                 *
                 * @param {GUctDetail} content
                 * @param {Gordic.Eko.Interface.GUctspidDto} [data]
                 * @returns {JQueryPromise<any>}
                 */
                function OznacitInterniDoklad(content, ico) {
                    return GetKtgTypAsync(content)
                        .then(function (value) {
                        //debugger;
                        if (!(content.Globals.EkoParams.ICO === ico &&
                            (value === 1001 /* Gordic.Eko.Interface.GEKategorieDokladu.UcetniDokladDanovy */
                            //|| value === Gordic.Eko.Interface.GEKategorieDokladu.OpravaUcetnihoDokladuDanoveho as number
                            ))) {
                            if (content.UcetniDokladDto.HlavickaDokladu.int_dok === 1)
                                content.showFlash({ id: Detail.flashResult, icon: "gi-tick", label: "jres:30250515", customClass: "g-state-success", timer: 5000 }); //RC 30250515 : Nastavení interního dokladu zrušeno
                            content.UcetniDokladDto.HlavickaDokladu.int_dok = 0;
                            content.InterniDoklad = 0;
                            RefreshStatus(content);
                            return $.Deferred().resolve();
                        }
                        else {
                            if (content.Globals.Params.PovoleniPraceSInternimDanDokladem) {
                                return Gordic.Eko.WebClient.Common.Dotaz(content, "jres:30250513") //RC 30250513 : Jedná se o interní doklad?
                                    .then(function (result) {
                                    if (result === "YES") {
                                        content.InterniDoklad = 1;
                                        content.UcetniDokladDto.HlavickaDokladu.int_dok = 1;
                                        content.showFlash({ id: Detail.flashResult, icon: "gi-tick", label: "jres:30250514", customClass: "g-state-success", timer: 5000 }); //RC 30250514 : Doklad byl nastaven jako interní
                                        RefreshStatus(content);
                                    }
                                    else {
                                        content.InterniDoklad = 0;
                                        content.UcetniDokladDto.HlavickaDokladu.int_dok = 0;
                                        content.showFlash({ id: Detail.flashResult, icon: "gi-tick", label: "jres:30250515", customClass: "g-state-success", timer: 5000 }); //RC 30250515 : Nastavení interního dokladu zrušeno
                                    }
                                    return $.Deferred().resolve();
                                });
                            }
                            else {
                                return $.Deferred().resolve();
                            }
                        }
                    });
                }
                Detail.OznacitInterniDoklad = OznacitInterniDoklad;
                /**
                 * Ma se zobrazit KPI
                 *
                 * @param {GUctDetail} content
                 * @returns {boolean}
                 */
                function IsShowKPI(content) {
                    return !IsEditMode(content);
                }
                Detail.IsShowKPI = IsShowKPI;
                /**
                 *  Aktualizace KPI
                 * function RefreshKPI
                 *
                 * @param {GUctDetail} content
                 */
                function RefreshKPI(content) {
                    if (IsEditMode(content))
                        return;
                    // pokud kpi nejsou videt, nic nedelej
                    if (!IsShowKPI(content))
                        return;
                    // stav dokladu
                    /*
                    if (content.UcetniDokladDto.HlavickaDokladu!.StavDokladu === Gordic.Eko.Interface.GEStavyDokladu.Storno) {
                        content.kpis!.kpiSTAV.data = { color: "red", text: "jres:30250355", value: " " ,};                      //RC 30250355 : Doklad je stornovaný
                        content.kpis!.kpiSTAV.visible = true;
                        content.kpis!.kpiSTAV.showTextIcon = true;
                        content.kpis!.kpiSTAV.chartVisible = true;
                        content.kpis!.kpiSTAV.text = "Storno";
                        content.kpis!.kpiSTAV.customClass = "kpi_stornovan";
                    }
                    else if (content.UcetniDokladDto.HlavickaDokladu!.StavDokladu === Gordic.Eko.Interface.GEStavyDokladu.Uzavreno) {
                        content.kpis!.kpiSTAV.data = { color: "blue",  text: "jres:30250353", value: " " };                      //RC 30250353 : Doklad je uzavřený
                        content.kpis!.kpiSTAV.visible = true;
                        content.kpis!.kpiSTAV.showTextIcon = false;
                        content.kpis!.kpiSTAV.chartVisible = false;
                    }
                    else if (content.UcetniDokladDto.HlavickaDokladu!.StavDokladu === Gordic.Eko.Interface.GEStavyDokladu.Zauctovano) {
                        content.kpis!.kpiSTAV.data = { color: "green",  text: "jres:30250354", value: " " };                      //RC 30250354 : Doklad je zaúčtovaný
                        content.kpis!.kpiSTAV.visible = true;
                        content.kpis!.kpiSTAV.showTextIcon = false;
                        content.kpis!.kpiSTAV.chartVisible = false;
                    }
            
                    else*/
                    //content.kpis!.kpiSTAV.visible = false;
                    //var values: Gordic.Uct.Interface.GUctdpepDto[] = [];
                    //var values: any = {};
                    //získání gridu a sesbírání hodnot z aktuálně editovaného řádku – zkoušel jsem to v UCT, ostatní musí získat element gridu nějak po svém
                    //Gordic.Uct.WebClient.Detail.GetGrid(content).findFields().gfield("model", "collect", values);
                    let grid = Gordic.Uct.WebClient.Detail.GetGrid(content);
                    if (grid == null)
                        return;
                    let values = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                    if (values == null)
                        return;
                    let suma = parseDecimal(0);
                    //content.UcetniDokladDto.Zapisy!.forEach((zapis) => { suma = suma.plus(parseDecimal(zapis.c0 as any).minus(parseDecimal(zapis.c1 as any))) });
                    values.forEach((zapis) => {
                        if (zapis == null)
                            return;
                        if (typeof zapis === "undefined")
                            return;
                        if (typeof zapis.c0 === "undefined" || zapis.c0 === null)
                            return;
                        if (typeof zapis.c1 === "undefined" || zapis.c1 === null)
                            return;
                        suma = suma.plus(parseDecimal(zapis.c0).minus(parseDecimal(zapis.c1)));
                    });
                    if (typeof content.kpis?.kpiSTAVY !== "undefined")
                        content.kpis.kpiSTAVY.update({ /* value: suma, meaning: suma.eq(0) ? "positive" : "negative",*/ visible: !suma.eq(0) });
                    //content.kpis!.kpiSTAV.update({ visible: true });
                    if (typeof content.kpis?.kpiPosZmena !== "undefined")
                        content.kpis.kpiPosZmena.update({ visible: true });
                    if (typeof content.kpis?.kpiRadky !== "undefined")
                        content.kpis.kpiRadky.update({ value: Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid), visible: true });
                    //content.UcetniDokladDto.PocetNavazanychDokladu
                    let visible = content.UcetniDokladDto.PocetNavazanychDokladu > 1;
                    if (typeof content.kpis?.kpiVAZBY !== "undefined") {
                        content.kpis.kpiVAZBY?.update({ value: content.UcetniDokladDto.PocetNavazanychDokladu, visible: visible });
                        content.kpis.kpiVAZBY?.update();
                    }
                    if (typeof content.kpis?.kpiSTAVStorno !== "undefined") {
                        if (content.UcetniDokladDto.IdentifikatorStorna === "")
                            content.kpis.kpiSTAVStorno.update({ primaryText: "", visible: false });
                        else {
                            //if (content.UcetniDokladDto.HlavickaDokladu?.eko_akt === 500) {
                            content.kpis.kpiSTAVStorno.update({
                                primaryText: content.UcetniDokladDto.HlavickaDokladu?.eko_akt === 500 ? "jres:30250838" //RC 30250838 : Stornovací doklad
                                    : "jres:30250835", //RC 30250835 : Stornovaný doklad
                                secondaryText: content.UcetniDokladDto.StavStornujicihoTxt,
                                visible: true,
                                meaning: content.UcetniDokladDto.HlavickaDokladu?.eko_akt === 500 ? content.UcetniDokladDto.StavStornujiciho < 40 /* Eko.Interface.GEStavyDokladu.Zauctovano */ ? "negative" : "positive"
                                    : undefined,
                            });
                            //}
                            //else
                            //    content.kpis!.kpiSTAVStorno.update({
                            //        primaryText: "jres:30250835",//RC 30250835 : Stornovaný doklad
                            //        visible: true,
                            //        secondaryText: content.UcetniDokladDto.StavStornujicihoTxt!
                            //    });
                        }
                    }
                    content.kpis?.update();
                }
                Detail.RefreshKPI = RefreshKPI;
                /**
                 * Zobrazeni dokladu dle pid
                 * @param content
                 */
                function showDoklad(content) {
                    if (typeof content.UcetniDokladDto.IdentifikatorStorna !== "undefined")
                        Gordic.Uct.WebClient.ZobrazDetailDleIXP({ content: content, ixp: content.UcetniDokladDto.IdentifikatorStorna, samostaneOkno: false, editace: false, polozky: false });
                    //Gordic.Uct.WebClient.ZobrazDetailDleIXPOld(content, content.UcetniDokladDto.IdentifikatorStorna as string, false, false);
                }
                Detail.showDoklad = showDoklad;
                // nastaveni statusoveho radku
                function setStatus(content, text) {
                    let grid = GetGrid(content);
                    // oprava z duvodu mozneho padani
                    if (grid == null)
                        return;
                    if (grid["ggrid"] == undefined)
                        return;
                    grid.ggrid('statusWidget', 'id-stavy-widgetu').html(text);
                }
                Detail.setStatus = setStatus;
                /**
                 * Kurzove rozdily
                 * @param content
                 * @param typKurzRoz
                 */
                function AlgoritmusKurzovychRozdilu(content, typKurzRoz, relatedElement, cancellationToken) {
                    if (cancellationToken?.cancelled)
                        return $.Deferred().reject(false).promise();
                    content.log.debug("AlgoritmusKurzovychRozdilu - start");
                    let pristupnostSmlouvy = 1 /* Interface.GEPristupnostSmlouvy.Neurceno */;
                    if (!content.Globals.EkoParams?.IsIssp) {
                        content.log.debug("Není IISSP - nesjou kurové rozdíly");
                        let returnValue = { PristupnostSmlouvy: 3 /* Interface.GEPristupnostSmlouvy.PristupnaNepovinna */, TypKurzRozdilu: typKurzRoz };
                        content.log.debug("returnValue {0}", returnValue);
                        return $.Deferred().resolve(returnValue).promise();
                    }
                    return GetCurrentEditRow(content, false)
                        .then((result) => {
                        if (cancellationToken?.cancelled)
                            return $.Deferred().reject(false);
                        let radek = result;
                        let vstup = {
                            IdMessage: "", IsPam: false, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena,
                            TypZpracovani: 1 /* Interface.GEUctTypZpracovani.BezKontrol */,
                            ixpDen: content.UcetniDokladDto.HlavickaDokladu.ixp_den,
                            Zapis: radek,
                            PidDokladu: content.UcetniDokladDto.HlavickaDokladu.ixp,
                        };
                        let castka = new Decimal(0); //= radek.c1 - radek.c0;
                        castka = castka.plus(parseDecimal(radek.c1).minus(parseDecimal(radek.c0)));
                        // pokud je vysledek nula, nikam se nepokracuje
                        if (castka.isZero()) {
                            content.log.debug("Rozdíl MD-DAL = 0");
                            // slozim vyslednou hodnotu
                            let returnValue = { PristupnostSmlouvy: 1 /* Interface.GEPristupnostSmlouvy.Neurceno */, TypKurzRozdilu: radek.priz_kur_roz };
                            content.log.debug("returnValue {0}", returnValue);
                            return $.Deferred().resolve(returnValue);
                        }
                        content.log.trace("doplneniZapisuPolozkamiIISSP - start");
                        return content.isl.UctDokladZapis.doplneniZapisuPolozkamiIISSP({ rq: vstup })
                            .get()
                            .then((result) => {
                            content.log.trace("doplneniZapisuPolozkamiIISSP - result: {0}", result);
                            //debugger;
                            if (cancellationToken?.cancelled)
                                return $.Deferred().reject(false);
                            //debugger;
                            if (result.IsKurzoveRozdily) {
                                content.log.debug("Jedná se o kurzové rozdíly");
                                let vstupDialog = {
                                    PristupnostSmlouvy: 1 /* Gordic.Uct.Interface.GEPristupnostSmlouvy.Neurceno */,
                                    TypKurzRozdilu: vstup.Zapis?.priz_kur_roz ?? 0,
                                    Pik: result.IISSPAttr.typ_pik,
                                    Hodnota: castka,
                                    KurzoveRozdilyPovinnaSmlouvaZRP: content.Globals.Params.KurzoveRozdilyPovinnaSmlouvaZRP,
                                };
                                let dlg = content.dialogs.showModalWindow(WebClient.GUctKurzoveRozdilyDlg, vstupDialog, { title: "", width: 800, height: 600, resizable: true, related: relatedElement });
                                const dfr = $.Deferred();
                                dlg.on("close", function (ev, obj) {
                                    debugger;
                                    if (cancellationToken?.cancelled)
                                        return dfr.reject();
                                    if (typeof obj !== "undefined") {
                                        //returnValue = obj;
                                        // zapisu vysledek
                                        //  vstup.Zapis.priz_kur_roz = obj.TypKurzRozdilu;
                                        //  vstup.Zapis.ac_sml = null;
                                        //  vstup.Zapis.ixp_sml = null;
                                        //  vstup.Zapis.cislo_sml = null;
                                        //  vstup.Zapis.rok_sml = null;
                                        //vstup.Zapis.smlouva = null;
                                        let editingRow = GetGrid(content).find(".row.editing");
                                        editingRow.findFields('priz_kur_roz').gfield('setValue', obj.TypKurzRozdilu).gfield('option', 'tooltip', GetTextKurzRozdilu(obj.TypKurzRozdilu).name);
                                        editingRow.findFields('smlouva').gfield('setValue', null);
                                        if (obj.PristupnostSmlouvy === 2 /* Gordic.Uct.Interface.GEPristupnostSmlouvy.Nepristupna */) {
                                            // nutne vymazani smlouvy
                                        }
                                    }
                                    content.log.debug("returnValue {0}", obj);
                                    return dfr.resolve(obj);
                                    //return def.resolve({ navrat })
                                    //GetDrd(that)
                                    //return def.resolve();
                                });
                                return dfr.promise();
                                ;
                            }
                            else if (result.IISSPAttr.priz_ssp !== null) {
                                content.log.debug("priz_ssp = {0}", result.IISSPAttr.priz_ssp);
                                // vsechny ostatni typy piku
                                pristupnostSmlouvy = (result.IISSPAttr.priz_ssp == 0) ? 2 /* Gordic.Uct.Interface.GEPristupnostSmlouvy.Nepristupna */ :
                                    pristupnostSmlouvy = 4 /* Gordic.Uct.Interface.GEPristupnostSmlouvy.PristupnaPovinna */;
                            }
                            // slozim vyslednou hodnotu
                            let returnValue = { PristupnostSmlouvy: pristupnostSmlouvy, TypKurzRozdilu: typKurzRoz };
                            content.log.debug("returnValue {0}", returnValue);
                            return $.Deferred().resolve(returnValue);
                        });
                    });
                }
                Detail.AlgoritmusKurzovychRozdilu = AlgoritmusKurzovychRozdilu;
                /**
                      * Formular pro zadani popisu radku
                      * @param {GUctDetail} content
                      */
                function VyberSmlouvy(content, currentData) {
                    let form = GetFormSml(content); // new Gordic.Forms.Form({ tabLabel: "jres:30250200" }) //RC 30250200 : Hromadný popis řádků
                    let simpleForm = content.dialogs.simpleForm("jres:30250455", form, currentData, $.extend({}, {
                        width: 500, height: 200,
                        commandBar: [
                            {
                                customClass: "g-button--primary",
                                action: new GAction({
                                    name: "actOk", caption: GDlg.mbbOk.text, icon: "gi-tick", run: function (ev) {
                                        let dlg = simpleForm;
                                        console.log("dlg: ", dlg);
                                        if (dlg.gform("isValid", true)) {
                                            let data = /*data ||*/ {};
                                            dlg.findFields().gfield("model", "collect", data);
                                            dlg.gcontent().close(data);
                                        }
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "actZrusit", caption: GDlg.mbbCancel.text, icon: "gi-window-close", run: function (ev) {
                                        let dlg = simpleForm;
                                        dlg.gcontent().close();
                                    }
                                })
                            }
                        ]
                    }));
                    return simpleForm;
                }
                Detail.VyberSmlouvy = VyberSmlouvy;
                /**
                 * Definice lokalni nabidky
                 */
                function getMenuActions() {
                    return ["actPolozkyNovyRadek", "actPolozkyOpravit", "actPolozkyZrusit", "actPolozkyOdstranit", "actKopieRadku",
                        "-", "actOznacitZapis", "-", "actPolozkyPredkontace",
                        "-", ["jres:30250275", //RC 30250275 : Import dat
                            "actImportZeSchrankyPruv", "actImportZeSouboruPruv", "-", "actImportZeSchranky", "actImportZeSouboru"],
                        ["jres:30250077", //RC 30250077 : Vytvořit předpis předkontace
                            "actPredkontaceOzn", "actPredkontaceVsech"],
                        "-", "actObcerstvit"];
                }
                Detail.getMenuActions = getMenuActions;
                /**
                 * Oznaceni radku
                 * @param content
                 * @param row
                 */
                function setMark(grid, row) {
                    grid.ggrid("mark", { row: row, col: 2 });
                }
                Detail.setMark = setMark;
                /**
                 * Kopie oznaceneho radku
                 * @param content
                 */
                function copyRow(content) {
                    let grid = GetGrid(content);
                    if (grid === null)
                        throw new GError();
                    let markedRow = grid.ggrid("mark");
                    if (!markedRow) {
                        // neni oznacen radek
                        const { row } = grid.ggrid("activeCellAddress");
                        setMark(grid, row);
                        markedRow = grid.ggrid("mark");
                    }
                    if (markedRow) {
                        return NovyZapis(content, $.extend({}, markedRow.data)).
                            then((result) => {
                            content.newRowStart = false;
                            if (grid === null)
                                return $.Deferred().reject();
                            grid.ggridroweditor("commit");
                            return result;
                        });
                    }
                    throw new GError();
                }
                Detail.copyRow = copyRow;
                /**
                * Predat doklad
                * @param {GUctDetail} content
                */
                function Predat(content) {
                    let that = content;
                    let dialog; // objekt dialogu pruvodce
                    let actTiskPredat = Gordic.Eko.Action.actionTisk({
                        name: "actTiskPredat",
                        tema: "wfl_ptm_hromprd",
                        serverParameterMethod: "Gordic.Uct.WebClient.GUctPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                        reportFinished: function (event, repInfo) {
                        },
                        enabled: true,
                        favorite: false,
                        parentContent: that,
                        reportStarting: function (rep) {
                            let seznam = [that.UcetniDokladDto.HlavickaDokladu];
                            let def = $.Deferred();
                            let form = dialog.findForms("wizParams").findFields();
                            if (typeof form === "undefined" || form == null)
                                return def.reject().promise();
                            const { ixs_fun: ixs_fun_akt } = form.findFields("ixs_fun_akt").gfield("getValue") ?? {};
                            //let ixs_fun_akt = form.findFields("ixs_fun_akt").gfield("getValue");
                            //if (ixs_fun_akt) 
                            //    ixs_fun_akt = ixs_fun_akt.ixs_fun;
                            let ixs_fun_vyriz = form.findFields("ixs_fun_vyriz").gfield("getValue");
                            if (ixs_fun_vyriz)
                                ixs_fun_vyriz = ixs_fun_vyriz.ixs_fun_vyriz;
                            if (typeof ixs_fun_akt === "undefined" || ixs_fun_akt === null) {
                                that.dialogs.warning("jres:30250682") //RC 30250682 :  Není vyplněn cíl předání
                                    .on("close", () => def.reject(false));
                                return def.promise();
                            }
                            let result = {
                                Seznam: seznam,
                                IxsFun: ixs_fun_akt,
                                IxsFunVyriz: ixs_fun_vyriz
                            };
                            rep.customDto = { Tema: rep.tema, IDSestavy: 12, SeznamPidu: seznam, Data: result };
                            return def.resolve(rep).promise();
                        }
                    });
                    let width = 500;
                    let height = 500;
                    dialog = that.dialogs.simpleForm("jres:30250651", WebClient.HromadnaOperaceform(7 /* Gordic.Uct.Interface.GEUctHromadneOperace.Predani */, that, that.UcetniDokladDto.HlavickaDokladu?.ixp_den)
                    //PredatForm(content, that.IxsSu, content.UcetniDokladDto.HlavickaDokladu?.ixp_den)
                    , { id: "IDpredani" }, { userSettings: that.userSettings, width: width, height: height //RC 30250651 : Předání
                        ,
                        commandBar: [{
                                favorite: true,
                                action: actTiskPredat
                            }, "ok!", "cancel"], title: "jres:30250651" //RC 30250651 : Předání
                     });
                    return dialog.createDialogPromise()
                        .then(function (data) {
                        if (typeof data === "undefined")
                            return $.Deferred().reject();
                        let rq = {
                            PidDokladu: content.Ixp,
                            DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena,
                            Duvod: data.duvod, CisReal: data.cis_real,
                            IxsFun: data.ixs_fun_akt,
                            IxsRef: data.ixs_ref,
                            IxsFunVyriz: data.ixs_fun_vyriz,
                            IxsSu: data.ixs_su
                        };
                        content.beginOperation("jres:30250652"); //RC 30250652 : Probíhá předání dokladu
                        return content.isl.UctDoklad.predat(rq)
                            .get()
                            .then(function (result) {
                            RefreshAfterAction(content, false);
                            addDocToRefresh(content.Ixp);
                            return RefreshDetail(content)
                                .then(function () {
                                content.endOperation();
                                return result;
                            });
                            //content.endOperation();                                               
                        })
                            .always(() => content.endOperation());
                    });
                }
                Detail.Predat = Predat;
                /**
                    * Pridelit doklad
                    * @param {GUctDetail} content
                    */
                function Pridelit(content) {
                    let that = content;
                    let width = 500;
                    let height = 300;
                    return that.dialogs.simpleForm("jres:30250654", WebClient.HromadnaOperaceform(6 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prideleni */, that, that.UcetniDokladDto.HlavickaDokladu?.ixp_den)
                    //PridelitForm(content, that.IxsSu, that.UcetniDokladDto.HlavickaDokladu?.ixp_den!, ($.content("main") as any).IxsFunAkt), { id: "IDPridelit" }
                    , { id: "IDpridelit" } /*$.extend({}*/, { width: width, height: height, userSettings: that.userSettings }) /*)*/ //RC 30250654 : Přidělení dokladu
                        .createDialogPromise()
                        .then(function (data) {
                        if (typeof data === "undefined")
                            return $.Deferred().reject();
                        let rq = {
                            PidDokladu: content.Ixp, DatumPosledniZmenyDokladu: content.UcetniDokladDto.HlavickaDokladu.dat_zmena, Duvod: data.duvod,
                            IxsFun: data.ixs_fun_akt
                        };
                        content.beginOperation("jres:30250655"); //RC 30250655 : Probíhá přidělení dokladu
                        return content.isl.UctDoklad.pridelit(rq)
                            .get()
                            .then(function (result) {
                            RefreshAfterAction(content, false);
                            return RefreshDetail(content)
                                .then(function () {
                                content.endOperation();
                                //return def.resolve();
                                return result;
                            });
                            //content.endOperation();                       
                            //def.promise();
                            //return;
                        }).always(() => content.endOperation());
                        //return;
                    });
                }
                Detail.Pridelit = Pridelit;
                /**
                 * Preevidovat doklad
                 * @param content
                 */
                function Preevidovat(content) {
                    let that = content;
                    let dialog; // objekt dialogu pruvodce
                    let actTiskPre = Gordic.Eko.Action.actionTisk({
                        name: "actTiskPre",
                        //            caption: "jres:30250680", //RC 30250680 : Tisk
                        //tooltip: "Tisk",
                        tema: "wfl_ptm_hromprk",
                        serverParameterMethod: "Gordic.Uct.WebClient.GUctPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                        reportFinished: function (event, repInfo) {
                        },
                        enabled: true,
                        favorite: false,
                        parentContent: that,
                        reportStarting: function (rep) {
                            let seznam = [that.UcetniDokladDto.HlavickaDokladu];
                            let def = $.Deferred();
                            let form = dialog.findForms("wizParams").findFields();
                            if (typeof form === "undefined" || form == null) {
                                return def.reject().promise();
                            }
                            const { ixp_den } = form.findFields("ixp_den").gfield("getValue") ?? {};
                            const { ixs_fun: ixs_fun_akt, ixs_ref } = form.findFields("ixs_fun_akt").gfield("getValue") ?? {};
                            //let ixs_fun_akt = form.findFields("ixs_fun_akt").gfield("getValue");
                            //let ixs_ref: string | null = null;
                            //if (ixs_fun_akt) {
                            //    ixs_fun_akt = ixs_fun_akt.ixs_fun;
                            //    ixs_ref = ixs_fun_akt.ixs_ref;
                            //}
                            if (typeof ixp_den === "undefined" || ixp_den === null || ixs_fun_akt === null) {
                                that.dialogs.warning("jres:30250682") //RC 30250682 :  Není vyplněn cíl předání
                                    .on("close", () => def.reject(false));
                                return def.promise();
                            }
                            let result = {
                                Seznam: seznam,
                                IxpDenNew: ixp_den,
                                IxsFunNew: ixs_fun_akt,
                                IxsRefNew: ixs_ref
                            };
                            rep.customDto = { Tema: rep.tema, IDSestavy: 12, SeznamPidu: seznam, Data: result };
                            return def.resolve(rep).promise();
                        }
                    });
                    let title = "jres:30250679"; //RC 30250679 : Přeevidence
                    let width = 500;
                    let height = 500;
                    dialog = that.dialogs.simpleForm(title, WebClient.HromadnaOperaceform(1 /* Gordic.Uct.Interface.GEUctHromadneOperace.Preevidence */, that, that.UcetniDokladDto.HlavickaDokladu?.ixp_den)
                    //Preevidovatform(content, that.UcetniDokladDto.HlavickaDokladu?.rok!, that.UcetniDokladDto.HlavickaDokladu?.ixp_den!)
                    , { id: "IDpreevidence" }, {
                        width: width, height: height, userSettings: that.userSettings, commandBar: [{
                                favorite: true,
                                action: actTiskPre
                            }, "ok!", "cancel"]
                    });
                    return dialog.createDialogPromise()
                        .then(function (data) {
                        if (data?.ixp_den && data?.ixs_fun_akt) {
                            return that.isl.UctDoklad.preevidovat({ IxpDenNew: data?.ixp_den, IxsFunNew: data?.ixs_fun_akt, Doklad: that.UcetniDokladDto.HlavickaDokladu, Duvod: data.duvod, IxsFunVyriz: data.ixs_fun_vyriz, CisReal: data.cis_real })
                                .get()
                                .then(() => {
                                //that.showFlash({ label: "jres:30250641", state: "success" }); //RC 30250641 : Přeevidence provedena
                                addDocToRefresh(content.Ixp);
                                return RefreshDetail(content)
                                    .then(function () {
                                    content.endOperation();
                                    return;
                                });
                                //return;
                            });
                        }
                        else
                            //throw new GError();
                            return $.Deferred().reject();
                        //return $.Deferred().reject();
                    });
                }
                Detail.Preevidovat = Preevidovat;
                /**
                 * Nacteni textu z rozvrhu
                 * @param content
                 * @param radek
                 * @param readAlways
                 * @returns
                 */
                function NactiTextyZRozvrhu(content, radek, readAlways = false) {
                    if (radek != null && (readAlways || (content.infoSelector != null && typeof content.infoSelector?.showedCnt !== "undefined" && content.infoSelector?.showedCnt))) {
                        return Gordic.Isl.EkoDatovaVeta.getTextyZRozvrhu({ typVety: 40 /* Gordic.Eko.Interface.TypVetyEnum.Ucetni */, ekoZapis: radek, pidRozvrhu: "" })
                            .get()
                            .then((result) => {
                            if (result !== null)
                                content.infoSelector?.updateData(result, { focus: true });
                            return result;
                        })
                            .catch(() => {
                            // TODO: that.infoSelector?.destroy();
                            content.infoSelector?.showedCnt?.tryClose();
                            content.infoSelector = null;
                            RefreshMenu(content);
                            return $.Deferred().reject();
                            //return def.reject();
                        });
                        //return def.promise();
                    }
                    return $.Deferred().resolve().promise();
                }
                Detail.NactiTextyZRozvrhu = NactiTextyZRozvrhu;
                /**
                 * Predat doklad
                 * @param {GUctDetail} content
                 */
                function VyberKategorieFIK(content, ixp, ktg_typ, rok) {
                    let that = content;
                    //let def = $.Deferred();
                    let form = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1", tabLabel: "jres:30250217" }) //RC 30250217 : Výběr kategorie finanční kontroly
                        .addSection()
                        .addRow()
                        //.addField("gselectbox", {
                        //    name: "typ", multi: false, list: true, itemWidth: ""
                        //    , dropdown: false
                        //    , model: "model.typ=value.typ"
                        //    , itemTemplate: "{txt}"
                        //    //, emptyValue: null
                        //    //, modelDefaults: { typ: -1 }
                        //    , data: new Gordic.Data.View([
                        //         { txt: "jres:30250659", typ: 0 } //RC 30250659 : Finanční kontrola po vzniku závazku
                        //        , { txt: "jres:30250660", typ: 1 } //RC 30250660 : Finanční kontrola po vzniku nároku
                        //    ], { key: "typ" })
                        //})
                        .addField("gradio", {
                        name: "typ",
                        initialValue: 0,
                        radios: [
                            { value: 0, label: "jres:30250659" }, //RC 30250659 : Finanční kontrola po vzniku závazku
                            { value: 1, label: "jres:30250660" }, //RC 30250660 : Finanční kontrola po vzniku nároku
                        ],
                    });
                    let width = 400;
                    let height = 200;
                    ;
                    return that.dialogs.simpleForm("jres:30250217", form, {}, $.extend({}, { width: width, height: height })) //RC 30250217 : Výběr kategorie finanční kontroly
                        .createDialogPromise()
                        .then(function (data) {
                        if (typeof data === "undefined" || data.typ === null)
                            return $.Deferred().reject();
                        if (data.typ === 0)
                            return 120;
                        return 140;
                    });
                }
                Detail.VyberKategorieFIK = VyberKategorieFIK;
                /**
                 * Zobrazení detailu zápočtového listu v nové zálozce
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
            })(Detail = WebClient.Detail || (WebClient.Detail = {}));
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdERldGFpbF9tZXRvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVWN0RGV0YWlsX21ldG9keS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7OztHQUdHO0FBQ0gsSUFBVSxNQUFNLENBdXRKZjtBQXZ0SkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdXRKbkI7SUF2dEpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F1dEo3QjtRQXZ0Sm9CLFdBQUEsU0FBUztZQUFDLElBQUEsTUFBTSxDQXV0SnBDO1lBdnRKOEIsV0FBQSxNQUFNO2dCQUVwQixlQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMscUNBQXFDO2dCQUNyRCxlQUFRLEdBQUcsQ0FDcEIsUUFBOEIsRUFDOUIsS0FBYyxFQUNoQixFQUFFO29CQUVBLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVzt3QkFDNUIsS0FBSyxHQUFHLE9BQUEsUUFBUSxDQUFDLENBQUMsdUJBQXVCO29CQUM3QyxJQUFJLFNBQVMsR0FBeUMsSUFBSSxDQUFDO29CQUMzRCxPQUFPLENBQUMsR0FBRyxJQUFPLEVBQUUsRUFBRTt3QkFDbEIsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNuQyxJQUFJLFNBQVMsS0FBSyxJQUFJOzRCQUNsQix1QkFBdUI7NEJBQ3ZCLFlBQVksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLENBQUM7d0JBQ3pDLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFOzRCQUN4QixTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsOENBQThDOzRCQUNoRSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDM0Isb0JBQW9CO3dCQUN4QixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2QsQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQztnQkFDRjs7O3FCQUdLO2dCQUNMLFNBQWdCLGNBQWMsQ0FBQyxP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RCxDQUFDLEVBdnRKb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdXRKN0I7SUFBRCxDQUFDLEVBdnRKZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdXRKbkI7QUFBRCxDQUFDLEVBdnRKUyxNQUFNLEtBQU4sTUFBTSxRQXV0SmYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIE1ldG9keSBwcm8gZGV0YWlsXHJcbiAqIFxyXG4gKi9cclxubmFtZXNwYWNlIEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbCB7XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IHdhaXRDYWxsID0gNTAwOyAvLyBjYXMgenBvemRlbmkgdm9sYW5pIG1ldG9keSAgICAgICAgXHJcbiAgICBleHBvcnQgY29uc3QgZGVib3VuY2UgPSA8VCBleHRlbmRzIHVua25vd25bXT4oXHJcbiAgICAgICAgY2FsbGJhY2s6ICguLi5hcmdzOiBUKSA9PiB2b2lkLFxyXG4gICAgICAgIGRlbGF5PzogbnVtYmVyLFxyXG4gICAgKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZGVsYXkgPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIGRlbGF5ID0gd2FpdENhbGw7IC8vIGRlZmF1bHRuaSBjYXMgY2VrYW5pXHJcbiAgICAgICAgbGV0IHRpbWVvdXRJRDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gKC4uLmFyZ3M6IFQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNhbGxOYW1lID0gY2FsbGJhY2sudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKHRpbWVvdXRJRCAhPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIC8vIHZ5bnVsb3ZhbmkgcG9jaXRhZGxhXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEID8/IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGltZW91dElEID0gbnVsbDsgLy8gTm90IHN0cmljdGx5IG5lY2Vzc2FyeSBidXQgZ29vZCB0byBkbyB0aGlzLlxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIE5hY3RlbmkgYWt0dWFsbmljaCBzdGF2dSBcclxuICAgICAqIFxyXG4gICAgICogKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBuYXN0YXZTdGF2eVNSQyhjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIG1kOiBhbnksIGRhbDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAvL3ZhciBzdGF0dXNFbGVtZW50ID0gZ3JpZC5nZ3JpZCgnc3RhdHVzV2lkZ2V0JywgJ2lkLXN0YXZ5LXdpZGdldHUnKTtcclxuXHJcbiAgICAgICAgbGV0IHR5cFN0YXZ1OiBJbnRlcmZhY2UuR0Vab2JyYXplbmlTdGF2dSA9IGNvbnRlbnQhLmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5ab2JyYXplbmlTdGF2dVwiKSBhcyBJbnRlcmZhY2UuR0Vab2JyYXplbmlTdGF2dTtcclxuICAgICAgICBpZiAodHlwU3RhdnUgPT09IG51bGwgfHwgdHlwZW9mIHR5cFN0YXZ1ID09PSBcInVuZGVmaW5lZFwiKSB0eXBTdGF2dSA9IEludGVyZmFjZS5HRVpvYnJhemVuaVN0YXZ1LlN0YXZEb2tsYWR1O1xyXG4gICAgICAgIGxldCByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEludGVyZmFjZS5HVWN0ZHBlcER0bz4oZ3JpZCk7XHJcbiAgICAgICAgaWYgKHJhZGVrICE9PSBudWxsICYmIHR5cGVvZiByYWRlayAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gcHJvIG5vdnkgamUgbnVsbFxyXG4gICAgICAgICAgICByYWRlay5peHAgPSBjb250ZW50Lkl4cDtcclxuICAgICAgICBsZXQgZWRpdGFjZU9sZCA9IGNvbnRlbnQuRWRpdGFjZVphcGlzdTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQuRWRpdGFjZVphcGlzdSkge1xyXG4gICAgICAgICAgICAvLyB2IGVkaXRhY2kgemFwaXN1XHJcbiAgICAgICAgICAgIC8vIG90ZXN0b3ZhdFxyXG4gICAgICAgICAgICByZXN1bHQgPSBHZXRDdXJyZW50RWRpdFJvdyhjb250ZW50LCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICByYWRlayA9IHJvdztcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmFkZWsuYzAgPSByYWRlay5jMD8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JhZGVrLmMxID0gcmFkZWsuYzE/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWsucHJpel9rdXJfcm96ID0gcGFyc2VJbnQocmFkZWsucHJpel9rdXJfcm96IGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHJhZGVrID09PSBudWxsIHx8IHR5cGVvZiByYWRlayA9PT0gXCJ1bmRlZmluZWRcIiB8fCAocmFkZWsudWVhID09PSBudWxsICYmIHR5cFN0YXZ1ICE9PSBJbnRlcmZhY2UuR0Vab2JyYXplbmlTdGF2dS5TdGF2RG9rbGFkdSkgfHwgcmFkZWsuaXhwID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXR1cyhjb250ZW50LCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0LnRoZW4oKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYgKHJhZGVrID09PSBudWxsIHx8IHR5cGVvZiByYWRlayA9PT0gXCJ1bmRlZmluZWRcIiB8fCAocmFkZWsudWVhID09PSBudWxsICYmIHR5cFN0YXZ1ICE9PSBJbnRlcmZhY2UuR0Vab2JyYXplbmlTdGF2dS5TdGF2RG9rbGFkdSkpIHtcclxuICAgICAgICAgICAgICAgIHNldFN0YXR1cyhjb250ZW50LCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2lmICh0eXBTdGF2dSA9PT0gbnVsbCB8fCB0eXBlb2YgdHlwU3RhdnUgPT09IFwidW5kZWZpbmVkXCIpIHR5cFN0YXZ1ID0gSW50ZXJmYWNlLkdFWm9icmF6ZW5pU3RhdnUuU3RhdkRva2xhZHU7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50LmlzbC5VY3REb2tsYWRaYXBpcy5zdGF2eU5hVWN0ZWNoKHsgcmFkZWs6IHJhZGVrIGFzIEludGVyZmFjZS5HVWN0ZHBlcER0bywgdHlwU3RhdnU6IHR5cFN0YXZ1LCBlZGl0YWNlUmFka3U6IGNvbnRlbnQuRWRpdGFjZVphcGlzdSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKGVkaXRhY2VPbGQgIT0gY29udGVudC5FZGl0YWNlWmFwaXN1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgc2V0U3RhdHVzKGNvbnRlbnQsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99IFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHJhZGVrVGVzdCA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5jdXJyZW50Um93PEludGVyZmFjZS5HVWN0ZHBlcER0bz4oZ3JpZCkgYXMgSW50ZXJmYWNlLkdVY3RkcGVwRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHJhZGVrVGVzdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmFkZWtUZXN0ID09PSBcInVuZGVmaW5lZFwiIHx8IHJhZGVrVGVzdC51ZWEgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBqaXoganNlbSB2IGVkaXRhY2ksIGppbmFrIHRvIG5lanNlbSBzY2hvcGVuIHBvem5hdCwgdWRhbG9zdGkganNlbSBqZG91IDR4IVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHNldFN0YXR1cyhjb250ZW50LCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcGlzID0gcmVzdWx0LlBvcGlzICsgXCIgezB9IDxiIGNsYXNzPSdnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmUnPnsxfTwvYj5cIi5mb3JtYXQoXCJNRFwiLCBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHJlc3VsdC5NRCBhcyBEZWNpbWFsLCBcIkNcIikpICsgXCIgezB9IDxiIGNsYXNzPSdnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmUnPnsxfTwvYj5cIi5mb3JtYXQoXCJEQUxcIiwgR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihyZXN1bHQuREFMIGFzIERlY2ltYWwsIFwiQ1wiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9waXMgPSBwb3BpcyArIFwiICAgezB9IDxiIGNsYXNzPSdnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmUnPnsxfTwvYj5cIi5mb3JtYXQoXCJNRC1EQUxcIiwgR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihyZXN1bHQuTUREQUwgYXMgRGVjaW1hbCwgXCJDXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRTdGF0dXMoY29udGVudCwgcG9waXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc3RhdHVzRWxlbWVudC5odG1sKHJlc3VsdC5Qb3BpcyArIFwiIE1EIDxiIGNsYXNzPSdnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmUnPnswfTwvYj5cIi5mb3JtYXQocmVzdWx0Lk1EIGFzIERlY2ltYWwpICsgXCIgREFMIDxiIGNsYXNzPSdnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmUnPnswfTwvYj5cIi5mb3JtYXQocmVzdWx0LkRBTCBhcyBEZWNpbWFsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGRlYm9uY292YW5lIHN0YXZ5XHJcbiAgICBleHBvcnQgY29uc3QgbmFzdGF2U3RhdnkgPSBkZWJvdW5jZShuYXN0YXZTdGF2eVNSQywgd2FpdENhbGwpO1xyXG4gICAgLy9leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYzogRnVuY3Rpb24sIHdhaXQ/OiBudW1iZXIpOiBGdW5jdGlvbiB7XHJcbiAgICAvLyAgICBsZXQgdGltZW91dElEOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xyXG4gICAgLy8gICAgaWYgKHR5cGVvZiB3YWl0ID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgLy8gICAgICAgIHdhaXQgPSAwOyAvLyBva2Fteml0ZSB6cHJhY3VqXHJcbiAgICAvLyAgICByZXR1cm4gZnVuY3Rpb24gKHRoaXM6IGFueSwgLi4uYXJnczogYW55W10pIHtcclxuICAgIC8vICAgICAgICAvLyBLZWVwIGEgcmVmZXJlbmNlIHRvIGB0aGlzYCBzbyB0aGF0XHJcbiAgICAvLyAgICAgICAgLy8gZnVuYy5hcHBseSgpIGNhbiBhY2Nlc3MgaXQuXHJcbiAgICAvLyAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXM7XHJcbiAgICAvLyAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCA/PyB1bmRlZmluZWQpO1xyXG5cclxuICAgIC8vICAgICAgICB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgICAgdGltZW91dElEID0gbnVsbDsgLy8gTm90IHN0cmljdGx5IG5lY2Vzc2FyeSBidXQgZ29vZCB0byBkbyB0aGlzLlxyXG4gICAgLy8gICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgLy8gICAgICAgIH0sIHdhaXQpO1xyXG4gICAgLy8gICAgfTtcclxuICAgIC8vfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRHcmlkKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSk6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCBudWxsIHtcclxuICAgICAgICBpZiAoY29udGVudC5Db250ZW50SW1wb3J0KVxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudC5Db250ZW50SW1wb3J0LkdldEdyaWQoKTtcclxuICAgICAgICBsZXQgZGF0YSA9IGNvbnRlbnQuZnVsbHNjcmVlbkVsZW1lbnQgPT0gbnVsbCA/IGNvbnRlbnQuZWxlbWVudC5maW5kKFwiLmdncmlkLmpzLVVjdFBvcml6b3ZhY2lHcmlkXCIpXHJcbiAgICAgICAgICAgIDogY29udGVudC5mdWxsc2NyZWVuRWxlbWVudC5maW5kKFwiLmdncmlkLmpzLVVjdFBvcml6b3ZhY2lHcmlkXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGZsYXNoLCBrdGVyeSBidWRlIHZ5bWF6YW4gcG8gbmFjdGVuaVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY29uc3QgZmxhc2hSZXN1bHQgPSBcImZsYXNoUmVzdWx0XCI7XHJcbiAgICAvKipcclxuICAgICAqIGZsYXNoLCBrdGVyeSBidWRlIHZ5bWF6YW4gcHJpIHphdWN0b3ZhbmlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNvbnN0IGZsYXNoUmVzdWx0WmF1Y3QgPSBcImZsYXNoUmVzdWx0WmF1Y3RcIjtcclxuICAgICAgICBcclxuICAgIC8qKlxyXG4gICAgICogTmFzdGF2ZW5pIHZhbGlkYXRvcnUgbmEgZm9ybXVsYXJpXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTmFzdGF2ZW5pVmFsaWRhdG9ydShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpIHtcclxuICAgICAgICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKFwicm9rX2RwaCxtZXNpY19kcGhcIikuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgX1ByaWRlak9kZWJlclZhbGlkYXRvclJlcXVpcmVkKCQoZWxlbWVudCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwidmFsaWRhdG9yc1wiKSwgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSXNUeXBEYW5vdnkgYXMgYW55KTtcclxuICAgICAgICAgICAgJChlbGVtZW50KS5nZmllbGQoXCJvcHRpb25cIiwgXCJmbGFnXCIsIChjb250ZW50LlVjZXRuaURva2xhZER0by5Jc1R5cERhbm92eSA/IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkIDogbnVsbCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKFwiaXhzX2VzdVwiKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICBfUHJpZGVqT2RlYmVyVmFsaWRhdG9yUmVxdWlyZWQoJChlbGVtZW50KS5nZmllbGQoXCJvcHRpb25cIiwgXCJ2YWxpZGF0b3JzXCIpLCBjb250ZW50LlVjZXRuaURva2xhZER0by5Jc1R5cERhbm92eSBhcyBhbnkgJiYgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5rdGdfdHlwID09IDEwMDEpO1xyXG4gICAgICAgICAgICAkKGVsZW1lbnQpLmdmaWVsZChcIm9wdGlvblwiLCBcImZsYWdcIiwgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLklzVHlwRGFub3Z5ICYmIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8ua3RnX3R5cCA9PSAxMDAxID8gR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQgOiBudWxsKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAgUHJpZGFuaSB2aWxpZGF0b3J1XHJcbiAgICAgKiBAcGFyYW0gcG9sZVxyXG4gICAgICogQHBhcmFtIHByaWRlalxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfUHJpZGVqT2RlYmVyVmFsaWRhdG9yUmVxdWlyZWQocG9sZTogYW55LCBwcmlkZWo6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBfTmFqZGlSZXF1aXJlZChwb2xlKTtcclxuICAgICAgICBwcmlkZWogPyAoaW5kZXggPT0gLTEpICYmIHBvbGUucHVzaChuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSk6XHJcbiAgICAgICAgICAgIChpbmRleCAhPSAtMSApJiZwb2xlLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgLy9pZiAocHJpZGVqKSB7XHJcbiAgICAgICAgLy8gICAgaWYgKGluZGV4ID09IC0xKVxyXG4gICAgICAgIC8vICAgICAgICBwb2xlLnB1c2gobmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCkpXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9lbHNlIHtcclxuICAgICAgICAvLyAgICBpZiAoaW5kZXggIT0gLTEpXHJcbiAgICAgICAgLy8gICAgICAgIHBvbGUuc3BsaWNlKGluZGV4LCAxKVxyXG5cclxuICAgICAgICAvL31cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogTmFsZXplbmkgcG9saWNrYSByZXF1aXJlZFxyXG4gICAgICogQHBhcmFtIHBvbGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIF9OYWpkaVJlcXVpcmVkKHBvbGU6IGFueSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9sZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocG9sZVtpXSBpbnN0YW5jZW9mIEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogWmppc3RlbmksIHpkYSBqZSBuYWN0ZW55IHNlem5hbVxyXG4gICAgICogKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBJc1Nlem5hbUV4aXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtICE9PSBcInVuZGVmaW5lZFwiO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmlkYW5pIGRva2xhZHUgZG8gemFzb2JuaWt1IHBybyBha3R1YWxpemFjZVxyXG4gICAgICogQHBhcmFtIHBpZERva2xhZHVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBhZGREb2NUb1JlZnJlc2gocGlkRG9rbGFkdTogc3RyaW5nIHwgbnVsbCB8IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIUlzU2V6bmFtRXhpc3QoKSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICghcGlkRG9rbGFkdSkgcmV0dXJuO1xyXG4gICAgICAgIEdvcmRpYy5VY3QuV2ViQ2xpZW50LlNlem5hbS5hZGRSZWZyZXNoUm93KHBpZERva2xhZHUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBPYm5vdmVuaSBzZXpuYW11IFxyXG4gICAgICogKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiByZWxvYWRTZXpuYW0oKSB7XHJcbiAgICAgICAgaWYgKCFJc1Nlem5hbUV4aXN0KCkpIHJldHVybjtcclxuICAgICAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0ucmVmcmVzaFJvd3MoR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLkdldENvbnRlbnRTZXpuYW0oKSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFrdHVhbGl6YWNlIGRldGFpbHUgZG9rbGFkdSBwb2RsZSBzdGF2dShtZW51LCBwb2xvemt5LCBwcmlzdHVwbm9zdClcclxuICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQWt0dWFsaXphY2VEb2tsYWR1KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGFrdHVhbGl6dWppIHJhZGt1IHNlem5hbXUgZG9rbGFkdSwgcG9rdWQgamUgZGFueSB6YXpuYW0gbmVwcmVjdGVuXHJcbiAgICAgICAgaWYgKElzU2V6bmFtRXhpc3QoKSkge1xyXG4gICAgICAgICAgICBsZXQgcmFkZWsgPSBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uTmFqZGlSYWRlayhjb250ZW50Lkl4cCk7XHJcbiAgICAgICAgICAgIGlmIChyYWRlayAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSB6bWVuYSwgbmljIG5lZGVsYW1cclxuICAgICAgICAgICAgICAgIGlmIChyYWRlay5wcml6X3ZpZXcgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrLnByaXpfdmlldyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlZnJlc2hTZXpuYW11KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vJC5jb250ZW50KFwiVUNUU2V6bmFtZG9rbGFkdSNcIikuJGdyaWQuZ2dyaWQoXCJyZWZyZXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG5hcGxuZW5pIHBvbGljZWtcclxuICAgICAgICAkLmV4dGVuZChjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUsIHsgcm9rQnV2bDogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5yb2sgfSk7XHJcblxyXG4gICAgICAgIC8vIG5hcGxuxJtuw60gcG9waXNuw71jaCB2bGFzdG5vc3TDrVxyXG4gICAgICAgIEdvcmRpYy5Qb3Bpc25lVmxhc3Rub3N0aS5hcHBseVZhbHVlcyhjb250ZW50LCBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LnZsYXN0bm9zdGkgPz8ge30pO1xyXG5cclxuICAgICAgICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgLy8geyBpbml0aWFsVmFsdWVzOiB0cnVlfSAtIG5ldnl2b2xhIHNlIHVkYWxvc3QgY2hhbmdlIHBvIG5hcGxuZW5pIGRhdFxyXG4gICAgICAgICAgICAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlICAtIG5ldnl2b2xhIHNlIHZhbGlkYWNlIHogZGF0YWJhemUsIHpkYSBqZSBob2Rub3RhIG9rXHJcblxyXG4gICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UsIH0gfSkgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSBcclxuICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCAkLmV4dGVuZChjb250ZW50LmRvY1ZhbGlkYXRvcnMpKVxyXG4gICAgICAgICAgICAuZ2ZpZWxkKFwiY29uZmlybVwiKVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICBjb250ZW50LkludGVybmlEb2tsYWQgPSBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmludF9kb2sgYXMgbnVtYmVyO1xyXG4gICAgICAgIC8vIG11c2ltIHZ5dm9sYXQgem1lbnUgbmEgdWN0ZWNoLCBhYnkgc2UgZG90YWhseSBsaW1pdHlcclxuICAgICAgICBpZiAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5idV92bCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZmluZEZvcm1zKFwiZm9ybUhlYWRlcixmb3JtRGV0YWlsXCIpLmZpbmRGaWVsZHMoXCJidV92bFwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWt0dWFsaXphY2UgemFwaXN1XHJcbiAgICAgICAgQWt0dWFsaXphY2VaYXBpc3UoY29udGVudCk7XHJcbiAgICAgICAgLy8gbmFzdGF2ZW5pIHByaXN0dXBub3N0aSBwb2xpIGRyZCBhIHN1YnJhZGFcclxuXHJcblxyXG4gICAgICAgIFdhaXRGb3JEYXRhKGNvbnRlbnQpXHJcbiAgICAgICAgICAgIC50aGVuKChhKSA9PiB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBSZWZyZXNoTWVudShjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIHVwcmF2YSBwcmlzdHVwbm9zdGkgcG9saVxyXG4gICAgICAgICAgICAgICAgWnByaXN0dXBuZW5pUG9saShjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIFNrcnl0aSBuZXBvdHJlYm55Y2ggcG9saVxyXG4gICAgICAgICAgICAgICAgWm9icmF6ZW5pUG9saShjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgcG9saSBkcmQgYSBzdWJyYWRhXHJcbiAgICAgICAgICAgICAgICBHZXRNZXNpYyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChtZXNpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIHphZGFuIGRyZCwgem5lcHJpc3R1cG5pIHN1YnJhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc2ljID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyLGZvcm1EZXRhaWxcIikuZmluZEZpZWxkcyhcImRyZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBHZXREcmRBc3luYyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSB6YWRhbiBkcmQsIHpuZXByaXN0dXBuaSBzdWJyYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmQgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKFwiYWNfaXhlXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBpZiAoY29udGVudC5FZGl0YWNlSGxhdmlja3kpIHtcclxuICAgICAgICAgICAgWnByaXN0dXBuZW5pUG9saShjb250ZW50KTtcclxuICAgICAgICAgICAgLy8gVE9ETzogSmUgdG8gcG9yYWQgbnV0bmU/P1xyXG4gICAgICAgICAgICBHRGJkLmdldEVsZW1lbnRUb0ZvY3VzKGNvbnRlbnQuZWxlbWVudCwgXCIuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpXCIpPy5maXJzdCgpLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGFrdHVhbGl6YWNlIHphcGlzdVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQWt0dWFsaXphY2VaYXBpc3UoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgbXlHcmlkID0gR2V0R3JpZChjb250ZW50KTtcclxuICAgICAgICBpZiAobXlHcmlkID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHZpZXcgPSBteUdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgIC8vIDExLjguMjAyNSB1cHJhdmFcclxuICAgICAgICB2aWV3LnVwZGF0ZURhdGEoY29udGVudC5VY2V0bmlEb2tsYWREdG8uWmFwaXN5ISk7XHJcbiAgICAgICAgLy9teUdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIG5ldyBHb3JkaWMuRGF0YS5WaWV3KGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeSBhcyBhbnksIHsga2V5OiBcIml4cCxyYWRla196XCIgfSksIHRydWUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBleHBvcnQgZnVuY3Rpb24gQWt0dWFsaXphY2VGb3JtdWxhcmVcclxuICAgICAqIEFrdHVhbGl6YWNlIGZvcm11bGFyZSBkbGUgbmFwbG5lbnljaCBwb2xpY2VrXHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEFrdHVhbGl6YWNlRm9ybXVsYXJlKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSkge1xyXG4gICAgICAgIC8vY29udGVudC5QZXJtaXNzaW9ucyA9IG51bGwgYXMgYW55O1xyXG4gICAgICAgIFJlZnJlc2hNZW51KGNvbnRlbnQpO1xyXG4gICAgICAgIC8vIFNrcnl0aSBuZXBvdHJlYm55Y2ggcG9saVxyXG4gICAgICAgIFpvYnJhemVuaVBvbGkoY29udGVudClcclxuICAgICAgICAvLyB1cHJhdmEgcHJpc3R1cG5vc3RpIHBvbGlcclxuICAgICAgICBacHJpc3R1cG5lbmlQb2xpKGNvbnRlbnQpO1xyXG5cclxuICAgICAgICBHZXRNZXNpYyhjb250ZW50KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobWVzaWMpIHtcclxuICAgICAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgemFkYW4gZHJkLCB6bmVwcmlzdHVwbmkgc3VicmFkdVxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc2ljID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZmluZEZvcm1zKFwiZm9ybUhlYWRlcixmb3JtRGV0YWlsXCIpLmZpbmRGaWVsZHMoXCJkcmRcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBHZXREcmRBc3luYyhjb250ZW50KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZHJkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIHphZGFuIGRyZCwgem5lcHJpc3R1cG5pIHN1YnJhZHVcclxuICAgICAgICAgICAgICAgIGlmIChkcmQgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyLGZvcm1EZXRhaWxcIikuZmluZEZpZWxkcyhcImFjX2l4ZVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY29udGVudC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyLGZvcm1EZXRhaWxcIikuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgIC8vIHsgaW5pdGlhbFZhbHVlczogdHJ1ZX0gLSBuZXZ5dm9sYSBzZSB1ZGFsb3N0IGNoYW5nZSBwbyBuYXBsbmVuaSBkYXRcclxuICAgICAgICAgICAgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSAgLSBuZXZ5dm9sYSBzZSB2YWxpZGFjZSB6IGRhdGFiYXplLCB6ZGEgamUgaG9kbm90YSBva1xyXG5cclxuICAgICAgICAgICAgLy8uZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UsIH0gfSkgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSBcclxuICAgICAgICAgICAgLy8uZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsICQuZXh0ZW5kKGNvbnRlbnQuZG9jVmFsaWRhdG9ycykpXHJcbiAgICAgICAgICAgIC5nZmllbGQoXCJyZXNldEVycm9yc1wiKVxyXG4gICAgICAgICAgICAuZ2ZpZWxkKFwiY29uZmlybVwiKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWeXBsbmVuaSBmb3JtdWxhcmUgaG9kbm90YW1pIHogRFRPXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZmlsbEZvcm1zKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSk6IEpRdWVyeVByb21pc2U8YW55PiAge1xyXG4gICAgICAgIC8vIG5hcGxuZW5pIHBvbGljZWtcclxuICAgICAgICAkLmV4dGVuZChjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUsIHsgcm9rQnV2bDogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5yb2sgfSk7XHJcblxyXG4gICAgICAgIC8vIG5hcGxuxJtuw60gcG9waXNuw71jaCB2bGFzdG5vc3TDrVxyXG4gICAgICAgIEdvcmRpYy5Qb3Bpc25lVmxhc3Rub3N0aS5hcHBseVZhbHVlcyhjb250ZW50LCBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LnZsYXN0bm9zdGkgPz8ge30pO1xyXG5cclxuICAgICAgICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgLy8geyBpbml0aWFsVmFsdWVzOiB0cnVlfSAtIG5ldnl2b2xhIHNlIHVkYWxvc3QgY2hhbmdlIHBvIG5hcGxuZW5pIGRhdFxyXG4gICAgICAgICAgICAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlICAtIG5ldnl2b2xhIHNlIHZhbGlkYWNlIHogZGF0YWJhemUsIHpkYSBqZSBob2Rub3RhIG9rXHJcblxyXG4gICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UsIH0gfSkgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSBcclxuICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCAkLmV4dGVuZChjb250ZW50LmRvY1ZhbGlkYXRvcnMpKVxyXG4gICAgICAgICAgICAuZ2ZpZWxkKFwiY29uZmlybVwiKVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICBjb250ZW50LkludGVybmlEb2tsYWQgPSBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmludF9kb2sgYXMgbnVtYmVyO1xyXG4gICAgICAgIC8vIG11c2ltIHZ5dm9sYXQgem1lbnUgbmEgdWN0ZWNoLCBhYnkgc2UgZG90YWhseSBsaW1pdHlcclxuICAgICAgICBpZiAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5idV92bCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZmluZEZvcm1zKFwiZm9ybUhlYWRlcixmb3JtRGV0YWlsXCIpLmZpbmRGaWVsZHMoXCJidV92bFwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWt0dWFsaXphY2UgemFwaXN1XHJcbiAgICAgICAgQWt0dWFsaXphY2VaYXBpc3UoY29udGVudCk7XHJcbiAgICAgICAgLy8gbmFzdGF2ZW5pIHByaXN0dXBub3N0aSBwb2xpIGRyZCBhIHN1YnJhZGFcclxuXHJcblxyXG4gICAgICAgIHJldHVybiBXYWl0Rm9yRGF0YShjb250ZW50KVxyXG4gICAgICAgICAgICAudGhlbigoYSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy9SZWZyZXNoTWVudShjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIC8vLy8gdXByYXZhIHByaXN0dXBub3N0aSBwb2xpXHJcbiAgICAgICAgICAgICAgICAvL1pwcmlzdHVwbmVuaVBvbGkoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAvLy8vIFNrcnl0aSBuZXBvdHJlYm55Y2ggcG9saVxyXG4gICAgICAgICAgICAgICAgLy9ab2JyYXplbmlQb2xpKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIHByaXN0dXBub3N0aSBwb2xpIGRyZCBhIHN1YnJhZGFcclxuICAgICAgICAgICAgICAgIEdldE1lc2ljKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1lc2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgemFkYW4gZHJkLCB6bmVwcmlzdHVwbmkgc3VicmFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzaWMgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKFwiZHJkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIEdldERyZEFzeW5jKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRyZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIHphZGFuIGRyZCwgem5lcHJpc3R1cG5pIHN1YnJhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRyZCA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZmluZEZvcm1zKFwiZm9ybUhlYWRlcixmb3JtRGV0YWlsXCIpLmZpbmRGaWVsZHMoXCJhY19peGVcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC5FZGl0YWNlSGxhdmlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBKZSB0byBwb3JhZCBudXRuZT8/XHJcbiAgICAgICAgICAgICAgICAgICAgR0RiZC5nZXRFbGVtZW50VG9Gb2N1cyhjb250ZW50LmVsZW1lbnQsIFwiLmdmaWVsZDpub3QoLnVpLXN0YXRlLWRpc2FibGVkKVwiKT8uZmlyc3QoKS50cmlnZ2VyKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBabm92dW5hY3RlbmkgZGV0YWlsdSBkb2tsYWR1XHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgLy8vIDxyZW1hcmtzPlR2YWdlbmtuZWNodCwgMy4zLjIwMTcuPC9yZW1hcmtzPlxyXG4gICAgLy8vIDxyZXR1cm5zPi48L3JldHVybnM+XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVmcmVzaERldGFpbChjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIGVkaXRhY2VIbGV2aWNreTogYm9vbGVhbiA9IGZhbHNlLCBjbGVhckZsYXNoPXRydWUpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIC8vY29udGVudC5FZGl0YWNlUmFka3UgPSBmYWxzZTtcclxuICAgICAgICBjb250ZW50LkVkaXRhY2VaYXBpc3UgPSBmYWxzZTtcclxuICAgICAgICAvL2NvbnRlbnQuQ2hhbmdlRW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgY29udGVudC5uZXdSb3dTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHZ5Y2lzdGVuaSBmbGFzaFxyXG4gICAgICAgIGlmIChjbGVhckZsYXNoKVxyXG4gICAgICAgICAgICBjb250ZW50LmhpZGVGbGFzaChmbGFzaFJlc3VsdCk7XHJcbiAgICAgICAgLy9jb250ZW50LnNob3dEb2N1bWVudCA9IGZhbHNlO1xyXG4gICAgICAgIC8vdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAvLyB6bmVwcmlzdHVwbmVuaSB2c2VjaCBha2NpXHJcbiAgICAgICAgZm9yIChsZXQgYWtjZSBpbiBjb250ZW50Lk93bkFjdGlvbnMpIHtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWN0aW9uc1tha2NlXSEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vbGV0IG9sZFZhbHVlID0gY29udGVudC5SZWxvYWRTZXpuYW07XHJcbiAgICAgICAgLy9sZXQgT2xkVGFiID0gY29udGVudC5lbGVtZW50LmZpbmQoXCIuZ3RhYm1hbmFnZXJcIikuZ3RhYm1hbmFnZXIoXCJnZXRBY3RpdmVcIik7XHJcblxyXG4gICAgICAgIGNvbnRlbnQuRWRpdGFjZUhsYXZpY2t5ID0gZWRpdGFjZUhsZXZpY2t5O1xyXG5cclxuXHJcbiAgICAgICAgLy8gbnV0bmUgc3B1c3RpdCwgYWJ5IHByb2JlaGx5IHZzZWNobnkgdWRhbG9zdGlcclxuICAgICAgICBjb250ZW50LmVsZW1lbnQudHJpZ2dlcigncmVtZW1iZXJpbml0aWFsb3BlbicpO1xyXG4gICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgY29udGVudC5lbGVtZW50Lm9uZShcImRldGFpbGJ1aWxkZXJmaW5pc2hlZFwiLCBmdW5jdGlvbiAoKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9yZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgKGNvbnRlbnQgYXMgR1VjdERldGFpbCkubG9hZCgpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gY29udGVudC5yZWFkeUF3YWl0LnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2NvbnRlbnQub24oXCJjb250ZW50cmVhZHlcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgY29udGVudC5vZmYoXCJjb250ZW50cmVhZHlcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIFdhaXRGb3JEYXRhKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIHByZXBudXRpIG5hIHB1dm9kbmkgemFsb3prdVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vaWYgKE9sZFRhYiAhPT0gbnVsbCkgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgU3dpdGNoVGFiKGNvbnRlbnQsIE9sZFRhYik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9yZXR1cm47IFxyXG4gICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3JldHVybjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogT2R1Y3RvdmFuaSB6YXBpc3UgeiB2YXplYm5pY2ggcmFka3VcclxuICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICogQHBhcmFtIHthbnl9IGZybVZhemJ5XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gemFwaXN5XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gT2R1Y3RvdmFuaVphcGlzdShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIGZybVZhemJ5OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCB6YXBpc3k6IEVrby5JbnRlcmZhY2UuR1phcGlzeUR0b1tdLCB2c3R1cD86IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRaYXBpc09kdWN0b3ZhdFJlcXVlc3REdG8pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IHZhemJ5Q250ID0gJC5jb250ZW50KGZybVZhemJ5KTtcclxuICAgICAgICBpZiAodHlwZW9mIHZzdHVwID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhemJ5Q250LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDE2NFwiLmZvcm1hdCh6YXBpc3kubGVuZ3RoKSk7IC8vUkMgMzAyNTAxNjQgOiBQcm9iw61ow6Egb2TDusSNdG92w6Fuw60sIHBvxI1ldCB6w6FwaXPFrzogezB9XHJcbiAgICAgICAgICAgIGNvbnRlbnQubG9nLnRyYWNlKCBcIlphY2F0ZWsgb2R1Y3RvdmFuaVwiLCB6YXBpc3kpO1xyXG4gICAgICAgICAgICB2c3R1cCA9IHtcclxuICAgICAgICAgICAgICAgIElkTWVzc2FnZTogXCJcIixcclxuICAgICAgICAgICAgICAgIFBpZERva2xhZHU6IGNvbnRlbnQuSXhwLFxyXG4gICAgICAgICAgICAgICAgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICBTZXpuYW06IHphcGlzeVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZFphcGlzLm9kdWN0b3ZhdFphcGlzeSh2c3R1cCBhcyBhbnkpXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcmViZXJ1IGhvZG5vdHlcclxuICAgICAgICAgICAgICAgIHZhemJ5Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gdXphdnJlbmkgb2tuYSB2YXplYlxyXG4gICAgICAgICAgICAgICAgdmF6YnlDbnQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT2R1Y3RvdmFuaSBwcm92ZWRlbm9cIiwgY29udGVudC5JeHApO1xyXG4gICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgYWRkRG9jVG9SZWZyZXNoKGNvbnRlbnQuSXhwKTtcclxuICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRhdCBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVsb2FkUmVjb3Jkcyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gUmVmcmVzaERldGFpbChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3dpdGNoVG9SZWNvcmRzKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hPZHVjdG92YW5pXCIsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMTY1XCIuZm9ybWF0KHphcGlzeS5sZW5ndGgpLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIiB9KSAvL1JDIDMwMjUwMTY1IDogw5pzcMSbxaFuxJsgb2TDusSNdG92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAsXHJcbiAgICAgICAgICAgIChvYmpFcnJvcjogRXJyb3IpID0+XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRXhjZXB0aW9uUHJvY2Vzc2luZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdmF6YnlDbnQsIGVycm9PYmplY3Q6IG9iakVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBPZHVjdG92YW5pWmFwaXN1KGNvbnRlbnQsIGZybVZhemJ5LCB6YXBpc3ksIHZzdHVwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmF6YnlDbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhemJ5Q250LmNsb3NlZClcclxuICAgICAgICAgICAgICAgIHZhemJ5Q250LnRyeUNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBOYXN0YXZlbmkgdWtsYWRhbmkgYm9rZW0gcHJvIHdmbCBEb2t1bWVudFxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG5hc3RhdlVsb3plbmkoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCBuYXN0YXZFZGl0YWNpKSB7XHJcbiAgICAgICAgLy8gb3ByYXZ1IGhsYXZpY2t5XHJcbiAgICAgICAgY29udGVudC5hY3Rpb25zLmFjdE9wcmF2aXRIbGF2aWNrdT8udXBkYXRlUGVybWlzc2lvbigobmFzdGF2RWRpdGFjaSA/IHsgdmFsdWU6IGZhbHNlIH0gOlxyXG4gICAgICAgICAgICAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMgPyBjb250ZW50LlVjZXRuaURva2xhZER0by5QZXJtaXNzaW9ucy5QZXJtaXNzaW9uc0hsYXZpY2thLkNhbkVkaXQgOiB2b2lkIDApKSk7XHJcbiAgICAgICAgLy8gZXZpZGVuY2UgICAgICAgICAgICBcclxuICAgICAgICBjb250ZW50LmFjdGlvbnMuYWN0RXZpZGVuY2UhLnVwZGF0ZVBlcm1pc3Npb24oKG5hc3RhdkVkaXRhY2kgPyB7IHZhbHVlOiB0cnVlIH0gOlxyXG4gICAgICAgICAgICAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMgPyBjb250ZW50LlVjZXRuaURva2xhZER0by5QZXJtaXNzaW9ucy5QZXJtaXNzaW9uc0hsYXZpY2thLkNhblVwZGF0ZSA6IHZvaWQgMCkpKTtcclxuXHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBa3R1YWxpemFjZSBtZW51IGEgS1BJXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJlZnJlc2hNZW51KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSBjb250ZW50O1xyXG4gICAgICAgIGNvbnN0IHsgYWN0aW9ucywgRWRpdGFjZUhsYXZpY2t5LCBjaGFuZ2VQcm9maWxlLCBFZGl0YWNlWmFwaXN1LCBVY2V0bmlEb2tsYWREdG8gfSA9IGNvbnRlbnQ7XHJcbiAgICAgICAgY29uc3QgeyBQZXJtaXNzaW9uc0hsYXZpY2thLCBQZXJtaXNzaW9uc1phcGlzIH0gPSBjb250ZW50LlVjZXRuaURva2xhZER0by5QZXJtaXNzaW9ucztcclxuICAgICAgICBcclxuICAgICAgICAvLyB6bmVwcmlzdHVwbmVuaSBkb2t1bWVudHUgd2ZsXHJcbiAgICAgICAgaWYgKCgnc2V0VGVtcG9yYXJ5RWRpdE1vZGUnIGluIGNvbnRlbnQpICYmIFVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LklzRXZpZG92YW55KVxyXG4gICAgICAgICAgICAoY29udGVudCBhcyBhbnkpLnNldFRlbXBvcmFyeUVkaXRNb2RlKCFFZGl0YWNlWmFwaXN1KTtcclxuICAgICAgICAvLyBwb2NldCB6YXBpc3UgZG9rbGFkdVxyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgICAgIFxyXG4gICAgICAgIGxldCBwb2NldFphcGlzdSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdShncmlkKTtcclxuICAgICAgICAvLyBwb2t1ZCBqc2VtIHByaWRhbCBub3Z5IHJhZGVrIG5hIHByYXpkbnkgZ3JpZCwgamUgcG90cmViYSBobyB6YWhybm91dFxyXG4gICAgICAgIGlmIChwb2NldFphcGlzdSA9PT0gMCAmJiBjb250ZW50Lm5ld1Jvd1N0YXJ0KVxyXG4gICAgICAgICAgICBwb2NldFphcGlzdSA9IDE7XHJcblxyXG4gICAgICAgIGxldCBpc0VkaXRNb2RlID0gSXNFZGl0TW9kZShjb250ZW50KTtcclxuICAgICAgICAvLyBzdG9ybm9cclxuICAgICAgICBhY3Rpb25zLmFjdFN0b3Jubz8udXBkYXRlUGVybWlzc2lvbihQZXJtaXNzaW9uc0hsYXZpY2thIS5Qb3ZvbGVuaVN0b3JuYSk7XHJcbiAgICAgICAgLy8gYWt0aXZhY2Ugc3Rvcm5hXHJcbiAgICAgICAgYWN0aW9ucy5hY3RBa3RpdmFjZVN0b3Jubz8udXBkYXRlUGVybWlzc2lvbihQZXJtaXNzaW9uc0hsYXZpY2thIS5Qb3ZvbGVuaUFrdGl2YWNlU3Rvcm5hKTtcclxuICAgICAgICAvLyB1emF2cmVuaSBkb2tsYWR1XHJcbiAgICAgICAgYWN0aW9ucy5hY3RVemF2cml0Py51cGRhdGVQZXJtaXNzaW9uKFBlcm1pc3Npb25zSGxhdmlja2EhLlBvdm9sZW5pVXphdnJlbmkpO1xyXG4gICAgICAgIC8vIHBvZGFuaSBkb2tsYWR1XHJcbiAgICAgICAgYWN0aW9ucy5hY3RQb2Rhbmk/LnVwZGF0ZVBlcm1pc3Npb24oUGVybWlzc2lvbnNIbGF2aWNrYSEuQ2FuQ3JlYXRlKTtcclxuXHJcbiAgICAgICAgLy8gb3ByYXZhIGhsYXZpY2t5XHJcbiAgICAgICAgLy8gemFtZW5hIGFrY2kgZGxlIHN0YXZ1XHJcbiAgICAgICAgYWN0aW9ucy5hY3RPcHJhdml0IS51cGRhdGUoRWRpdGFjZUhsYXZpY2t5ID8gY29udGVudC5hY3Rpb25acnVzaXRabWVueUhsYXZpY2t5IDogY29udGVudC5hY3Rpb25PcHJhdml0SGxhdmlja3UpOyAgICAgICAgXHJcbiAgICAgICAgYWN0aW9ucy5hY3RPcHJhdml0IS51cGRhdGVQZXJtaXNzaW9uKEVkaXRhY2VIbGF2aWNreSA/XHJcbiAgICAgICAgICAgIFBlcm1pc3Npb25zSGxhdmlja2EhLkNhbkVkaXQudmFsdWUgPyBQZXJtaXNzaW9uc0hsYXZpY2thIS5DYW5FZGl0OlBlcm1pc3Npb25zSGxhdmlja2EhLkNhblN0b3Jub0VkaXRcclxuICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICBQZXJtaXNzaW9uc0hsYXZpY2thIS5DYW5FZGl0KTtcclxuICAgICAgICBhY3Rpb25zLmFjdE9wcmF2aXRIbGF2aWNrdT8udXBkYXRlUGVybWlzc2lvbihQZXJtaXNzaW9uc0hsYXZpY2thIS5DYW5FZGl0KTtcclxuICAgICAgICBjb25zdCBlZGl0YWNlVG9vbHRpcCA9IFwianJlczozMDI1MDUzMFwiOyAvL1JDIDMwMjUwNTMwIDogQsSbaGVtIGVkaXRhY2UgbmVsemUgYWtjaSBwcm92w6lzdFxyXG4gICAgICAgIGFjdGlvbnMuYWN0T2JjZXJzdHZpdERva2xhZD8udXBkYXRlKHtcclxuICAgICAgICAgICAgZW5hYmxlZDogIWlzRWRpdE1vZGUsIHRvb2x0aXA6IGlzRWRpdE1vZGUgPyBlZGl0YWNlVG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgOiBcIlwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb25zdCBkZW55RWRpdDogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR1Blcm1pc3Npb24gPSB7IG1lc3NhZ2U6IGVkaXRhY2VUb29sdGlwLCB2YWx1ZTpmYWxzZSx2aXNpYmxlOnRydWUgfTtcclxuICAgICAgICAvLyB6cnVzaXQgb3ByYXZ1IGhsYXZpY2t5XHJcbiAgICAgICAgYWN0aW9ucy5hY3RacnVzaXRPcHJhdnV0SGxhdmlja3U/LnVwZGF0ZVBlcm1pc3Npb24oUGVybWlzc2lvbnNIbGF2aWNrYSEuQ2FuU3Rvcm5vRWRpdCk7XHJcbiAgICAgICAgLy8gZXZpZGVuY2UgICAgICAgICAgICBcclxuICAgICAgICBhY3Rpb25zLmFjdEV2aWRlbmNlPy51cGRhdGVQZXJtaXNzaW9uKFBlcm1pc3Npb25zSGxhdmlja2EhLkNhblVwZGF0ZSk7XHJcbiAgICAgICAgLy8gcG9rdWQgZWRpdHVqaSBobGF2aWNrdSwgbXVzaW0gbWl0IHByYXZvIGV2aWRlbmNlXHJcbiAgICAgICAgaWYgKEVkaXRhY2VIbGF2aWNreSlcclxuICAgICAgICAgICAgYWN0aW9ucy5hY3RFdmlkZW5jZT8udXBkYXRlKHsgZW5hYmxlZDogdHJ1ZSwgdG9vbHRpcDpcIlwiIH0pXHJcbiAgICAgICAgLy8ga29udHJvbG5pIGhsYXNlbmlcclxuICAgICAgICBhY3Rpb25zLmFjdEtvbnRIbGFzZW5pRFBIPy51cGRhdGVQZXJtaXNzaW9uKCBQZXJtaXNzaW9uc0hsYXZpY2thIS5Qb3ZvbGVuaUtvbnRyb2xuaWhvSGxhc2VuaSk7XHJcbiAgICAgICAgLy8gdmF6YnkgZG9rbGFkdVxyXG4gICAgICAgIGFjdGlvbnMuYWN0VmF6YmFEb2tsYWR1Py51cGRhdGVQZXJtaXNzaW9uKCBQZXJtaXNzaW9uc0hsYXZpY2thIS5Qb3ZvbGVuaVZhemViRG9rbGFkdSk7XHJcbiAgICAgICAgLy8gc2NodmFsZW5pXHJcbiAgICAgICAgYWN0aW9ucy5hY3RTY2h2YWxlbmk/LnVwZGF0ZVBlcm1pc3Npb24oIFBlcm1pc3Npb25zSGxhdmlja2EhLlBvdm9sZW5pU2NodmFsaXQpO1xyXG4gICAgICAgIC8vIG9kc2NodmFsZW5pXHJcbiAgICAgICAgYWN0aW9ucy5hY3RPZFNjaHZhbGVuaT8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNIbGF2aWNrYSEuUG92b2xlbmlPZHNjaHZhbGl0KTtcclxuXHJcbiAgICAgICAgLy8gcHJvdWN0b3ZhdFxyXG4gICAgICAgIGFjdGlvbnMuYWN0UHJvdWN0b3ZhdD8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNIbGF2aWNrYSEuUG92b2xlbmlQcm91Y3RvdmF0KTtcclxuICAgICAgICAvLyBwcmV2eml0XHJcbiAgICAgICAgYWN0aW9ucy5hY3RQcmV2emV0aURva2xhZHU/LnVwZGF0ZVBlcm1pc3Npb24oIFBlcm1pc3Npb25zSGxhdmlja2EhLlBvdm9sZW5pUHJldnppdCk7XHJcbiAgICAgICAgLy8gcHJlZXZpZG92YXRcclxuICAgICAgICBhY3Rpb25zLmFjdFByZWV2aWRvdmF0Py51cGRhdGVQZXJtaXNzaW9uKCBQZXJtaXNzaW9uc0hsYXZpY2thIS5Qb3ZvbGVuaVByZWV2aWRvdmF0KTtcclxuICAgICAgICAvLyBwcmVkYXRcclxuICAgICAgICBhY3Rpb25zLmFjdFByZWRhdD8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNIbGF2aWNrYSEuUG92b2xlbmlQcmVkYXQpO1xyXG4gICAgICAgIC8vIHByaWRlbGl0XHJcbiAgICAgICAgYWN0aW9ucy5hY3RQcmlkZWxpdD8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNIbGF2aWNrYSEuUG92b2xlbmlQcmlkZWxpdCk7XHJcbiAgICAgICAgLy8gdnJhdGl0IGRvIFdGTFxyXG4gICAgICAgIGFjdGlvbnMuYWN0aW9uVnJhdGl0RG9XZmw/LnVwZGF0ZVBlcm1pc3Npb24oIFBlcm1pc3Npb25zSGxhdmlja2EhLlBvdm9sZW5pVnJhY2VuaURvV0ZMKTtcclxuICAgICAgICAvLyB0aXNrIGRva2xhZHUgbyB6YXVjdG92YW5pXHJcbiAgICAgICAgYWN0aW9ucy5hY3RUaXNrWmF1Y0Rva2w/LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uSXNaYXVjdG92YW5vQ2FzdGVjbmUhIHx8IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uSXNaYXVjdG92YW55ISAmJiAhaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogaXNFZGl0TW9kZSA/IGVkaXRhY2VUb29sdGlwIDogXCJcIlxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGtvcGllXHJcbiAgICAgICAgYWN0aW9ucy5hY3RLb3BpZURva2xhZHU/LnVwZGF0ZVBlcm1pc3Npb24oIFBlcm1pc3Npb25zSGxhdmlja2EhLlBvdm9sZW5pS29waWVEb2tsYWR1KTtcclxuICAgICAgICAvLyBrb3BpZSBiZXogcG9sb3pla1xyXG4gICAgICAgIGFjdGlvbnMuYWN0S29waWVEb2tsYWR1QmV6UG9sb3plaz8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNIbGF2aWNrYSEuUG92b2xlbmlLb3BpZURva2xhZHVCZXpQb2xvemVrKTtcclxuICAgICAgICAvLyBrb3BpZSBiZXogcG9sb3pla1xyXG4gICAgICAgIGFjdGlvbnMuYWN0S29waWVEb2tsYWR1QmV6UG9sb3plaz8udXBkYXRlUGVybWlzc2lvbihQZXJtaXNzaW9uc0hsYXZpY2thIS5Qb3ZvbGVuaUtvcGllRG9rbGFkdUJlelBvbG96ZWspO1xyXG4gICAgICAgIC8vIHpvYnJhemVuaSB1Y3Rlbmt5IHogYmFua292bmlobyB2eXBpc3UgXHJcbiAgICAgICAgYWN0aW9ucy5hY1pvYnJheml0VWN0ZW5rdT8udXBkYXRlUGVybWlzc2lvbihQZXJtaXNzaW9uc0hsYXZpY2thIS5Qb3ZvbGVuaVpvYnJheml0VWN0ZW5rdSk7XHJcbiAgICAgICAgaWYgKFBlcm1pc3Npb25zSGxhdmlja2EhLlBvdm9sZW5pWm9icmF6aXRVY3Rlbmt1LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY1pvYnJheml0VWN0ZW5rdSFdLCB7IGVuYWJsZWQ6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvPy5JZGVudGlmaWthdG9yVWN0ZW5reSE9bnVsbCAmJiBjb250ZW50LlVjZXRuaURva2xhZER0by5JZGVudGlmaWthdG9yVWN0ZW5reS50cmltKCkhPVwiXCIgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0VkaXRNb2RlKSB7XHJcbiAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RQb2RhbmkhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY1pvYnJheml0VWN0ZW5rdSEsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLmFjdEtvcGllRG9rbGFkdUJlelBvbG96ZWshLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RLb3BpZURva2xhZHUhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3Rpb25WcmF0aXREb1dmbCEsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLmFjdFByaWRlbGl0ISxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMuYWN0UHJlZGF0ISxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMuYWN0UHJlZXZpZG92YXQhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RQcmV2emV0aURva2xhZHUhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RQcm91Y3RvdmF0ISxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMuYWN0T2RTY2h2YWxlbmkhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RTY2h2YWxlbmkhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RVemF2cml0ISxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMuYWN0U3Rvcm5vISxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMuYWN0QWt0aXZhY2VTdG9ybm8hLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RWYXpiYURva2xhZHUhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RLb250SGxhc2VuaURQSCEsXHJcbiAgICAgICAgICAgICAgICAvL2FjdGlvbnMuYWN0RXZpZGVuY2UhLFxyXG5cclxuXHJcbiAgICAgICAgICAgIF0sIHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogZWRpdGFjZVRvb2x0aXBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoRWRpdGFjZVphcGlzdSkge1xyXG4gICAgICAgICAgICBVcGRhdGVBY3Rpb24oW2FjdGlvbnMuYWN0T3ByYXZpdCEsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLmFjdEtvcGllRG9rbGFkdUJlelBvbG96ZWshLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RLb3BpZURva2xhZHUhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RQcmV2emV0aURva2xhZHUhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RQcmVldmlkb3ZhdCEsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLmFjdFByZWRhdCEsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLmFjdFByaWRlbGl0ISxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLmFjdE9kU2NodmFsZW5pISxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMuYWN0U2NodmFsZW5pISxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMuYWN0VXphdnJpdCEsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLmFjdFV6YXZyaXQhLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RTdG9ybm8hLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5hY3RBa3RpdmFjZVN0b3JubyEsXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIF0sIHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDYxNlwiIH0pIC8vUkMgMzAyNTA2MTYgOiBQcm9iw61ow6EgZWRpdGFjZSDFmcOhZGt1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAqKiogWmFwaXN5ICoqKlxyXG4gICAgICAgIC8vIG5vdnkgcmFkZWtcclxuICAgICAgICBhY3Rpb25zLmFjdFBvbG96a3lOb3Z5UmFkZWs/LnVwZGF0ZVBlcm1pc3Npb24oUGVybWlzc2lvbnNaYXBpcyEuQ2FuQ3JlYXRlKTtcclxuICAgICAgICBpZiAoY2hhbmdlUHJvZmlsZSB8fCBjb250ZW50LnByZUZpbGxJblByb2dyZXNzIHx8IGlzRWRpdE1vZGUpIFxyXG4gICAgICAgIC8vaWYgKEVkaXRhY2VaYXBpc3UgfHwgY2hhbmdlUHJvZmlsZSlgXHJcbiAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RQb2xvemt5Tm92eVJhZGVrIV0gLCB7IGVuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIC8vIHVsb3ppdCByYWRla1xyXG4gICAgICAgIGFjdGlvbnMuYWN0UG9sb3preVVsb3ppdD8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNaYXBpcyEuQ2FuVXBkYXRlKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB6cnVzaXQgZWRpdGFjaVxyXG4gICAgICAgIGFjdGlvbnMuYWN0UG9sb3preVpydXNpdD8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlacnVzaXRFZGl0YWNpWmFwaXN1KTtcclxuICAgICAgICAvL1VwZGF0ZUFjdGlvbihjb250ZW50LmFjdGlvbnMuYWN0UG9sb3preVpydXNpdCBhcyBHQWN0aW9uLCB7IGVuYWJsZWQ6IGNvbnRlbnQuRWRpdGFjZVphcGlzdSB9KTtcclxuICAgICAgICAvLy8vaWYgKEVkaXRhY2VSYWRrdSkge1xyXG4gICAgICAgIC8vVXBkYXRlQWN0aW9uKGNvbnRlbnQuYWN0aW9ucy5hY3RQb2xvemt5WnJ1c2l0IGFzIEdBY3Rpb24sIHsgZW5hYmxlZDogY29udGVudC5FZGl0YWNlWmFwaXN1IH0pXHJcblxyXG4gICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RQb2xvemt5VWxveml0ISwgYWN0aW9ucy5hY3RQb2xvemt5WnJ1c2l0ISwgYWN0aW9ucy5hY3RQb2xvemt5WnJ1c2l0IVxyXG4gICAgICAgIF0sIHsgZW5hYmxlZDogRWRpdGFjZVphcGlzdSB9KTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvLyBlZGl0YWNlXHJcbiAgICAgICAgYWN0aW9ucy5hY3RQb2xvemt5T3ByYXZpdD8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNaYXBpcyEuQ2FuRWRpdCk7XHJcbiAgICAgICAgaWYgKCBQZXJtaXNzaW9uc1phcGlzIS5DYW5FZGl0LnZhbHVlICYmIChpc0VkaXRNb2RlIHx8IHBvY2V0WmFwaXN1ID09PSAwIHx8IGNoYW5nZVByb2ZpbGUpKSB7XHJcbiAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RQb2xvemt5T3ByYXZpdCFdLCB7IGVuYWJsZWQ6IGZhbHNlIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vTsOhcG92xJtkYSBkYXQuc2xvdmFcclxuICAgICAgICBpZiAoY29udGVudC5pbmZvU2VsZWN0b3I9PW51bGwpXHJcbiAgICAgICAgICAgIGFjdGlvbnMuYWN0UG9sb3preVRleHR5WlJvenZyaHU/LnVwZGF0ZSh7IGVuYWJsZWQ6IHRydWUsIHRvb2x0aXA6IFwiXCIgfSk7XHJcbiAgICAgICAgaWYgKHBvY2V0WmFwaXN1ID09PSAwIHx8IGNoYW5nZVByb2ZpbGUgfHwgRWRpdGFjZUhsYXZpY2t5KVxyXG4gICAgICAgICAgICBVcGRhdGVBY3Rpb24oW2FjdGlvbnMuYWN0UG9sb3preVRleHR5WlJvenZyaHUhXSwgeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogXCJqcmVzOjMwMjUwNjIzXCIgfSk7IC8vUkMgMzAyNTA2MjMgOiBOZW7DrSDFmcOhZGVrIHrDoXBpc3VcclxuXHJcbiAgICAgICAgLy8gb2RzdHJhbml0XHJcbiAgICAgICAgYWN0aW9ucy5hY3RQb2xvemt5T2RzdHJhbml0Py51cGRhdGVQZXJtaXNzaW9uKCBQZXJtaXNzaW9uc1phcGlzIS5DYW5EZWxldGUpO1xyXG4gICAgICAgIGlmIChQZXJtaXNzaW9uc1phcGlzIS5DYW5EZWxldGUudmFsdWUgJiYgKGlzRWRpdE1vZGUgfHwgcG9jZXRaYXBpc3UgPT09IDApKSB7XHJcbiAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RQb2xvemt5T2RzdHJhbml0IV0sIHsgZW5hYmxlZDogZmFsc2UgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8ga29waWUgcmFka3VcclxuICAgICAgICBpZiAoISBQZXJtaXNzaW9uc1phcGlzIS5DYW5FZGl0LnZhbHVlKVxyXG4gICAgICAgICAgICBVcGRhdGVBY3Rpb24oW2FjdGlvbnMuYWN0S29waWVSYWRrdSFdLCB7IGVuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIGVsc2UgaWYgKGlzRWRpdE1vZGUpXHJcbiAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RLb3BpZVJhZGt1IV0sIHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDYyMlwiIH0pOyAvL1JDIDMwMjUwNjIyIDogViByZcW+aW11IGVkaXRhY2UgbmVsemUga29ww61yb3ZhdFxyXG4gICAgICAgIGVsc2UgaWYgKHBvY2V0WmFwaXN1ID09PSAwIHx8IGNoYW5nZVByb2ZpbGUpXHJcbiAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RLb3BpZVJhZGt1IV0sIHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDYyM1wiIH0pOyAvL1JDIDMwMjUwNjIzIDogTmVuw60gxZnDoWRlayB6w6FwaXN1XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vaWYgKCFHZXRHcmlkKGNvbnRlbnQpLmdncmlkKFwibWFya1wiKSlcclxuICAgICAgICAgICAgLy8gICAgVXBkYXRlQWN0aW9uKGNvbnRlbnQuYWN0aW9ucy5hY3RLb3BpZVJhZGt1IGFzIEdBY3Rpb24sIHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDYyNFwiIH0pOyAvL1JDIDMwMjUwNjI0IDogTmVuw60gb3puYcSNZW4gxZnDoWRla1xyXG4gICAgICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RLb3BpZVJhZGt1IV0sIHsgZW5hYmxlZDogdHJ1ZSwgdG9vbHRpcDogXCJqcmVzOjMwMjUwNjIxXCIgfSk7IC8vUkMgMzAyNTA2MjEgOiBLb3BpZSBvem5hxI1lbsOpaG8gxZnDoWRrdVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBvem5hY2l0XHJcbiAgICAgICAgLy9pZiAoIHBvY2V0WmFwaXN1ID09PSAwIHx8IGNvbnRlbnQuY2hhbmdlUHJvZmlsZSkpIHtcclxuICAgICAgICAgICAgVXBkYXRlQWN0aW9uKFthY3Rpb25zLmFjdE96bmFjaXRaYXBpcyFdLCB7IGVuYWJsZWQ6IHBvY2V0WmFwaXN1ID09PSAwIHx8IGNoYW5nZVByb2ZpbGUgPyBmYWxzZSA6IHRydWV9KTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2VcclxuICAgICAgICAvLyAgICBVcGRhdGVBY3Rpb24oW2FjdGlvbnMuYWN0T3puYWNpdFphcGlzIV0sIHsgZW5hYmxlZDogdHJ1ZSB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBwcmVka29udGFjZVxyXG4gICAgICAgIGFjdGlvbnMuYWN0UG9sb3preVByZWRrb250YWNlPy51cGRhdGVQZXJtaXNzaW9uKCBQZXJtaXNzaW9uc1phcGlzIS5Qb3ZvbGVuaVByZWRrb250YWNlKTtcclxuICAgICAgICBpZiAoUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlQcmVka29udGFjZS52YWx1ZSAmJiAoY2hhbmdlUHJvZmlsZSB8fCBjb250ZW50LnByZUZpbGxJblByb2dyZXNzIHx8IGlzRWRpdE1vZGUpKSB7XHJcbiAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RQb2xvemt5UHJlZGtvbnRhY2UhXSwgeyBlbmFibGVkOiBmYWxzZSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB2eXJvdm5hbmlcclxuICAgICAgICBhY3Rpb25zLmFjdFBvbG96a3lWeXJvdm5hdD8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlWeXJvdm5hbmlaYXBpc3UpO1xyXG4gICAgICAgIGxldCB0b29sdGlwOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmIChFZGl0YWNlWmFwaXN1ID09PSB0cnVlICYmIGNvbnRlbnQuY2FzdGt5RW5hYmxlID09PSB0cnVlKVxyXG4gICAgICAgICAgICB0b29sdGlwID0gXCJqcmVzOjMwMjUwNDM4XCI7Ly9SQyAzMDI1MDQzOCA6IFZ5cm92bsOhbsOtIGRva2xhZHVcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRvb2x0aXAgPSBcImpyZXM6MzAyNTA0MzlcIjsvL1JDIDMwMjUwNDM5IDogUG/FmWl6b3ZhxI0gw7rEjWV0bsOtY2ggesOhcGlzxa8gbXVzw60gYsO9dCB2IGVkaXRhY2kgYSBrdXJ6b3IgdmUgZSBzbG91cGPDrWNoIE1EIG5lYm8gREFMXHJcbiAgICAgICAgLy8gbWVudSB2eXJvdm5hbmkgZG9rbGFkdVxyXG4gICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RQb2xvemt5Vnlyb3ZuYXQhXSwge1xyXG4gICAgICAgICAgICBlbmFibGVkOiAoRWRpdGFjZVphcGlzdSA9PT0gdHJ1ZSAmJiBjb250ZW50LmNhc3RreUVuYWJsZSA9PT0gdHJ1ZSkgLFxyXG4gICAgICAgICAgICB0b29sdGlwOiB0b29sdGlwLFxyXG4gICAgICAgICAgICB2aXNpYmxlOmZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gaW1wb3J0IHplIHNvdWJvcnVcclxuICAgICAgICBhY3Rpb25zLmFjdEltcG9ydFplU291Ym9ydT8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlJbXBvcnR1WmVTb3Vib3J1KTtcclxuICAgICAgICBVcGRhdGVBY3Rpb24oW2FjdGlvbnMuYWN0SW1wb3J0WmVTb3Vib3J1IV0sIHtcclxuICAgICAgICAgICAgZW5hYmxlZDogKFBlcm1pc3Npb25zWmFwaXMhLlBvdm9sZW5pSW1wb3J0dVplU291Ym9ydS52YWx1ZSAmJiAhaXNFZGl0TW9kZSkgLFxyXG4gICAgICAgICAgICAvLyB0b29sdGlwOiBjb250ZW50LlVjZXRuaURva2xhZER0by5Qb3ZvbGVuaUltcG9ydHVaZVNvdWJvcnUhLlRvb2xUaXBcclxuICAgICAgICB9KTtcclxuICAgICAgICBhY3Rpb25zLmFjdEltcG9ydFplU291Ym9ydVBydXY/LnVwZGF0ZVBlcm1pc3Npb24oUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlJbXBvcnR1WmVTb3Vib3J1KTtcclxuICAgICAgICBVcGRhdGVBY3Rpb24oW2FjdGlvbnMuYWN0SW1wb3J0WmVTb3Vib3J1UHJ1diFdLCB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IChQZXJtaXNzaW9uc1phcGlzIS5Qb3ZvbGVuaUltcG9ydHVaZVNvdWJvcnUudmFsdWUgJiYgIWlzRWRpdE1vZGUpLFxyXG4gICAgICAgICAgICAvLyB0b29sdGlwOiBjb250ZW50LlVjZXRuaURva2xhZER0by5Qb3ZvbGVuaUltcG9ydHVaZVNvdWJvcnUhLlRvb2xUaXBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gbWVudSBpbXBvcnRcclxuICAgICAgICAvL1VwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RJbXBvcnQhXSwge1xyXG4gICAgICAgIC8vICAgIGVuYWJsZWQ6ICggUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlJbXBvcnR1WmVTb3Vib3J1LnZhbHVlICYmICFJc0VkaXRNb2RlKGNvbnRlbnQpKSAsXHJcbiAgICAgICAgLy8gICAgLy90b29sdGlwOiBjb250ZW50LlVjZXRuaURva2xhZER0by5Qb3ZvbGVuaUltcG9ydHVaZVNvdWJvcnUhLlRvb2xUaXBcclxuICAgICAgICAvL30pO1xyXG4gICAgICAgIC8vIGltcG9ydCB6ZSBzY2hyYW5reVxyXG4gICAgICAgIGFjdGlvbnMuYWN0SW1wb3J0WmVTY2hyYW5reT8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlJbXBvcnR1WmVTY2hyYW5reSk7XHJcbiAgICAgICAgVXBkYXRlQWN0aW9uKFthY3Rpb25zLmFjdEltcG9ydFplU2NocmFua3khXSwge1xyXG4gICAgICAgICAgICBlbmFibGVkOiAoUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlJbXBvcnR1WmVTY2hyYW5reS52YWx1ZSAmJiAhaXNFZGl0TW9kZSksXHJcbiAgICAgICAgICAgIC8vdG9vbHRpcDogY29udGVudC5VY2V0bmlEb2tsYWREdG8uUG92b2xlbmlJbXBvcnR1WmVTY2hyYW5reSEuVG9vbFRpcFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGltcG9ydCB6ZSBzY2hyYW5reSAtIHBydXZvZGNlXHJcbiAgICAgICAgYWN0aW9ucy5hY3RJbXBvcnRaZVNjaHJhbmt5UHJ1dj8udXBkYXRlUGVybWlzc2lvbihQZXJtaXNzaW9uc1phcGlzIS5Qb3ZvbGVuaUltcG9ydHVaZVNjaHJhbmt5KTtcclxuICAgICAgICBVcGRhdGVBY3Rpb24oW2FjdGlvbnMuYWN0SW1wb3J0WmVTY2hyYW5reVBydXYhXSwge1xyXG4gICAgICAgICAgICBlbmFibGVkOiAoUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlJbXBvcnR1WmVTY2hyYW5reS52YWx1ZSAmJiAhaXNFZGl0TW9kZSksXHJcbiAgICAgICAgICAgIC8vdG9vbHRpcDogY29udGVudC5VY2V0bmlEb2tsYWREdG8uUG92b2xlbmlJbXBvcnR1WmVTY2hyYW5reSEuVG9vbFRpcFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB2eXR2b3JlbmkgcHJlZGtvbnRhY2UgeiBvem5hY2VueWNoIHJhZGt1XHJcbiAgICAgICAgYWN0aW9ucy5hY3RQcmVka29udGFjZU96bj8udXBkYXRlUGVybWlzc2lvbihQZXJtaXNzaW9uc1phcGlzIS5Qb3ZvbGVuaVZ5dHZvcml0UHJlZGtvbnRhY2kpO1xyXG4gICAgICAgIC8vIHZ5dHZvcmVuaSBwcmVka29udGFjZSB6ZSB2c2VjaCByYWRrdVxyXG4gICAgICAgIGFjdGlvbnMuYWN0UHJlZGtvbnRhY2VWc2VjaD8udXBkYXRlUGVybWlzc2lvbihQZXJtaXNzaW9uc1phcGlzIS5Qb3ZvbGVuaVZ5dHZvcml0UHJlZGtvbnRhY2kpO1xyXG4gICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RQcmVka29udGFjZU96biEsIGFjdGlvbnMuYWN0UHJlZGtvbnRhY2VWc2VjaCFdLCB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IChQZXJtaXNzaW9uc1phcGlzIS5Qb3ZvbGVuaVZ5dHZvcml0UHJlZGtvbnRhY2kudmFsdWUgJiYgIWlzRWRpdE1vZGUpLFxyXG4gICAgICAgICAgICAvL3Rvb2x0aXA6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBvdm9sZW5pSW1wb3J0dVplU2NocmFua3khLlRvb2xUaXBcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoY29udGVudC5mdWxsc2NyZWVuRWxlbWVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIFVwZGF0ZUFjdGlvbihbYWN0aW9ucy5hY3RJbXBvcnRaZVNjaHJhbmt5UHJ1diEsIGFjdGlvbnMuYWN0SW1wb3J0WmVTb3Vib3J1UHJ1diFcclxuICAgICAgICAgICAgICAgICwgYWN0aW9ucy5hY3RQcmVka29udGFjZVZzZWNoISwgYWN0aW9ucy5hY3RQcmVka29udGFjZU96biFcclxuICAgICAgICAgICAgICAgIC8vLCBhY3Rpb25zLmFjdFBvbG96a3lUZXh0eVpSb3p2cmh1IVxyXG4gICAgICAgICAgICBdLCB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDg2N1wiIC8vUkMgMzAyNTA4NjcgOiBWIHRvbXRvIHJlxb5pbXUgem9icmF6ZW7DrSBuZW7DrSBha2NlIHBvdm9sZW5hXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGhyb21hZG55IHBvcGlzIHphcGlzdVxyXG4gICAgICAgIGFjdGlvbnMuYWN0SHJvbWFkbnlQb3Bpc1phcGlzdT8udXBkYXRlUGVybWlzc2lvbiggUGVybWlzc2lvbnNaYXBpcyEuUG92b2xlbmlIcm9tYWRuZWhvUG9waXN1WmFwaXN1KTtcclxuICAgICAgICBpZiAocG9jZXRaYXBpc3UgPT0gMCkge1xyXG4gICAgICAgICAgICBVcGRhdGVBY3Rpb24oW2FjdGlvbnMuYWN0SHJvbWFkbnlQb3Bpc1phcGlzdSFdLCB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDIwOVwiIC8vUkMgMzAyNTAyMDkgOiBEb2tsYWQgbmVvYnNhaHVqZSDDusSNZXRuw60gesOhcGlzeVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiAoSXNFZGl0TW9kZShjb250ZW50KSlcclxuICAgICAgICAvLyAgICB0b29sdGlwID0gXCJqcmVzOjMwMjUwNDQwXCIgLy9SQyAzMDI1MDQ0MCA6IERva2xhZCBqZSB2IHJlxb5pbXUgZWRpdGFjZSwgYWtjaSBuZWx6ZSBwcm92w6lzdFxyXG4gICAgICAgIC8vZWxzZVxyXG4gICAgICAgIC8vICAgIHRvb2x0aXAgPSBcImpyZXM6MzAyNTA0NDFcIiAvL1JDIDMwMjUwNDQxIDogTmHEjXRlbsOtIHrDoXBpc8WvIHogZGF0YWLDoXplXHJcbiAgICAgICAgYWN0aW9ucy5hY3RPYmNlcnN0dml0IS51cGRhdGUoe1xyXG4gICAgICAgICAgICBlbmFibGVkOiAhaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogaXNFZGl0TW9kZSA/XHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTA0NDBcIiAvL1JDIDMwMjUwNDQwIDogRG9rbGFkIGplIHYgcmXFvmltdSBlZGl0YWNlLCBha2NpIG5lbHplIHByb3bDqXN0XHJcbiAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTA0NDFcIiAvL1JDIDMwMjUwNDQxIDogTmHEjXRlbsOtIHrDoXBpc8WvIHogZGF0YWLDoXplXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gdXByYXZhIHN0YXR1c2JhcnUgICAgICAgIFxyXG4gICAgICAgIFJlZnJlc2hTdGF0dXMoY29udGVudCk7XHJcbiAgICAgICAgLy8gdXByYXZhIEtQSVxyXG4gICAgICAgIFJlZnJlc2hLUEkoY29udGVudCk7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBa3R1YWxpemFjZSBha2NlXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBha2NlXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBVcGRhdGVBY3Rpb24oYWtjZTogR0FjdGlvbltdLCBvcHRpb25zOiBHQWN0aW9uUGFyYW1zRGVmT2JqQmFzZSkge1xyXG4gICAgICAgIC8vbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGFrY2UuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAvL3RoYXQubG9nLnRyYWNlKGl0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBvcHRpb25zLmVuYWJsZWQsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBvcHRpb25zLnRvb2x0aXAgJiYgdHlwZW9mIG9wdGlvbnMudG9vbHRpcCAhPT0gXCJ1bmRlZmluZWRcIiA/IG9wdGlvbnMudG9vbHRpcCA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiAodHlwZW9mIG9wdGlvbnMudmlzaWJsZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvcHRpb25zLnZpc2libGUgPT0gbnVsbCkgPyB0cnVlIDogb3B0aW9ucy52aXNpYmxlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdHlwZW9mIG9wdGlvbnMuY2FwdGlvbiA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvcHRpb25zLmNhcHRpb24gPT0gbnVsbCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgIGljb246IHR5cGVvZiBvcHRpb25zLmljb24gIT09IFwidW5kZWZpbmVkXCIgJiYgb3B0aW9ucy5pY29uICE9IG51bGwgPyBvcHRpb25zLmljb24gOiB2b2lkIDAsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICBBa3R1YWxpemFjZSBzdGF0dXNiYXJ1XHJcbiAgICAgKiBleHBvcnQgZnVuY3Rpb24gUmVmcmVzaFN0YXR1c1xyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJlZnJlc2hTdGF0dXMoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFjb250ZW50LnN0YXR1c2VzKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGN1c3RvbUNsYXNzID0gXCJcIjtcclxuICAgICAgICBpZiAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uU3RhdkRva2xhZHUgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFU3RhdnlEb2tsYWR1LlN0b3Jubykge1xyXG4gICAgICAgICAgICAvLyBzdG9ybm9cclxuICAgICAgICAgICAgY3VzdG9tQ2xhc3MgPSBcImctdGF0ZS10ZXh0IFwiICsgR29yZGljLkdsb2JhbC5FbnVtcy5Db2xvclN0YXRlQ2xhc3MuZXJyb3I7XHJcbiAgICAgICAgICAgIC8vc3RhdkRva2xaa3IgPSBcIlNUT1wiO1xyXG4gICAgICAgICAgICAvLyRzdGF0dXNTdGF2LmFkZENsYXNzKFwiZy1zdGF0ZS13YXJuaW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuWmF1Y3RvdmFubykge1xyXG4gICAgICAgICAgICAvLyB6YXVjdG92YW5vXHJcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzID0gR29yZGljLkdsb2JhbC5FbnVtcy5Db2xvclN0YXRlQ2xhc3MuYWN0aXZlOy8vIFwiZy1zdGF0ZS1zdWNjZXNzXCI7XHJcbiAgICAgICAgICAgIC8vc3RhdkRva2xaa3IgPSBcIlpBw5pcIjtcclxuICAgICAgICAgICAgLy8kc3RhdHVzU3Rhdi5hZGRDbGFzcyhcImctc3RhdGUtc3VjY2Vzc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuTmV6YXVjdG92YW5vKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuZXphdWN0b3Zhbm9cclxuICAgICAgICAgICAgICAgIC8vc3RhdkRva2xaa3IgPSBcIk5FWlwiO1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3MgPSBcIlwiOy8vR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkNvbG9yU3RhdGVDbGFzcy5mYXZvcml0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuTmF2cmgpIHtcclxuICAgICAgICAgICAgICAgIC8vbmF2cmhcclxuICAgICAgICAgICAgICAgIC8vc3RhdkRva2xaa3IgPSBcIk7DgVZcIjtcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzID0gXCJcIjsvL0dvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5Db2xvclN0YXRlQ2xhc3MuZmF2b3JpdGU7Ly8gXCJnLXN0YXRlLWluZm9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuWmF1Y3RvdmFub0Nhc3RlY25lKSB7XHJcbiAgICAgICAgICAgICAgICAvL3phdWN0b3Zhbm8gY2FzdGVjbmUgXHJcbiAgICAgICAgICAgICAgICAvL3N0YXZEb2tsWmtyID0gXCJaw5rEjFwiO1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3MgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlN0YXZEb2tsYWR1ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVN0YXZ5RG9rbGFkdS5VemF2cmVubykge1xyXG4gICAgICAgICAgICAgICAgLy91emF2cmVub1xyXG4gICAgICAgICAgICAgICAgLy9zdGF2RG9rbFprciA9IFwiVVpBXCI7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzcyA9IEdvcmRpYy5HbG9iYWwuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLmluYWN0aXZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlN0YXZEb2tsYWR1ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVN0YXZ5RG9rbGFkdS5TY2h2YWxlbm8pIHtcclxuICAgICAgICAgICAgICAgIC8vdXphdnJlbm9cclxuICAgICAgICAgICAgICAgIC8vc3RhdkRva2xaa3IgPSBcIlNDSFwiO1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3MgPSBHb3JkaWMuR2xvYmFsLkVudW1zLkNvbG9yU3RhdGVDbGFzcy5zdWNjZXNzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzcyA9IEdvcmRpYy5HbG9iYWwuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLmluZm87Ly8gXCJnLXN0YXRlLWluZm9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb250ZW50LnN0YXR1c1N0YXZEb2tsYWR1LnVwZGF0ZSh7XHJcbiAgICAgICAgLy8gICAgY2FwdGlvbjogY29udGVudC5VY2V0bmlEb2tsYWREdG8hLlN0YXZUeHQ/LnRvVXBwZXJDYXNlKCkgYXMgYW55LFxyXG4gICAgICAgIC8vICAgIGN1c3RvbUNsYXNzOiBjdXN0b21DbGFzcyBhcyBhbnksXHJcbiAgICAgICAgLy8gICAgdG9vbHRpcDogY29udGVudC5VY2V0bmlEb2tsYWREdG8hLlN0YXZUeHQgYXMgYW55LFxyXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsXHJcblxyXG4gICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgIEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKGNvbnRlbnQuc3RhdHVzZXMhW1wic3RhdHVzU3RhdkRva2xhZHVcIl0hLypjb250ZW50LnN0YXR1c1N0YXZEb2tsYWR1Ki8sIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvIS5TdGF2VHh0Py50b1VwcGVyQ2FzZSgpISwgY3VzdG9tQ2xhc3MudHJpbSgpKTtcclxuXHJcbiAgICAgICAgbGV0IHRleHRTdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLnByaXpfZXVjdCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0ZXh0U3RhdHVzID0gXCJqcmVzOjMwMjUwMzc3XCI7Ly9cIklOVFwiLCAvL1JDIDMwMjUwMzc3IDogRG9rbGFkIEUtdcSNZXRuaWN0dsOtXHJcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzID0gXCJnLXN0YXRlLXRleHRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5pbnRfZG9rID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRleHRTdGF0dXMgPSBcImpyZXM6MzAyNTAzNzhcIjsvL1wiSU5UXCIsIC8vUkMgMzAyNTAzNzggOiBJTlRFUk7DjSBET0tMQURcclxuICAgICAgICAgICAgY3VzdG9tQ2xhc3MgPSBcImctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIjtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKGNvbnRlbnQuc3RhdHVzZXMhW1wic3RhdHVzVHlwRG9rbGFkdVwiXSEsIHRleHRTdGF0dXMsIGN1c3RvbUNsYXNzLnRyaW0oKSk7XHJcbiAgICAgICAgdGV4dFN0YXR1cyA9IFwiXCI7XHJcbiAgICAgICAgY3VzdG9tQ2xhc3MgPSBcIlwiO1xyXG4gICAgICAgIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLnNfc3RvID09PSAyMCkge1xyXG4gICAgICAgICAgICB0ZXh0U3RhdHVzID0gXCJqcmVzOjMwMjUwODM2XCI7IC8vUkMgMzAyNTA4MzYgOiBTVE9STk8gRE9LTEFEXHJcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzID0gXCJnLXN0YXRlLXRleHRcIiArIEdvcmRpYy5HbG9iYWwuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLmltcG9ydGFudDtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbShjb250ZW50LnN0YXR1c2VzIVtcInN0YXR1c1N0YXZTdG9ybm9cIl0hLCB0ZXh0U3RhdHVzLCBjdXN0b21DbGFzcy50cmltKCkpO1xyXG4gICAgfSBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNrcnl0aSBuZXZpZGl0ZWxueWNoIHBvbGlcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBab2JyYXplbmlQb2xpKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSkge1xyXG5cclxuICAgICAgICBpZiAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGlkZGVuSXRlbXMgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvIS5IaWRkZW5JdGVtcyBhcyBhbnkpLmdmb3Jtcm93KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBjb250ZW50LmZpbmRGb3JtU2VjdGlvbnMoJ3Nla0VYVERQSCcpLmNoaWxkcmVuKCdsYWJlbCcpLnRleHQoJ2pyZXM6MzAyNTA1NDgnKTsgLy9SQyAzMDI1MDU0OCA6IEV4dGVybsOtIHN1Ympla3RcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlZpc2libGVkSXRlbXMgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvIS5WaXNpYmxlZEl0ZW1zIGFzIGFueSkuZ2Zvcm1yb3coKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZmluZEZvcm1TZWN0aW9ucygnc2VrRVhURFBIJykuY2hpbGRyZW4oJ2xhYmVsJykudGV4dCgnanJlczozMDI1MDU0OScpOyAvL1JDIDMwMjUwNTQ5IDogRXh0ZXJuw60gc3ViamVrdCBhIMO6ZGFqZSBEUEhcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb250ZW50LmZpbmRGaWVsZHMoY29udGVudC5VY2V0bmlEb2tsYWREdG8hLkhpZGRlbkl0ZW1zIGFzIGFueSkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFpwcmlzdHVwbmVuaSBwb2xpIGZvcm11bGFyZVxyXG4gICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBacHJpc3R1cG5lbmlQb2xpKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSkge1xyXG4gICAgICAgIC8vdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vIE5lanBydmUgdnNlIHpuZXByaXN0dXBuaW1cclxuICAgICAgICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgLy8gZ3JpZCBidWRlIHByaXN0dXBueVxyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAvL2dyaWQuZmluZEZpZWxkcygpLmdmaWVsZFxyXG5cclxuICAgICAgICBpZiAoY29udGVudC5FZGl0YWNlSGxhdmlja3kpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkVuYWJsZWRJdGVtcyAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgY29udGVudC5lbGVtZW50LmZpbmRGaWVsZHMoY29udGVudC5VY2V0bmlEb2tsYWREdG8hLkVuYWJsZWRJdGVtcyBhcyBhbnkpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vTmFzdGF2ZW5pIHZhbGlkYXRvcnVcclxuICAgICAgICAgICAgTmFzdGF2ZW5pVmFsaWRhdG9ydShjb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRpc2FibGUgYWxsXHJcbiAgICAgICAgICAgIGNvbnRlbnQuZmluZEZvcm1zKFwiZm9ybUhlYWRlcixmb3JtRGV0YWlsXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgLy8gZ3JpZCBidWRlIHByaXN0dXBueVxyXG4gICAgICAgICAgICBncmlkLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSkgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgTmFzdGF2ZW5pVmFsaWRhdG9ydShjb250ZW50KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9ybm8vYWt0aXZhY2UgZG9rbGFkdVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSBha3Rpdm92YXQgLSB0cnVlLCBkb2tsYWQgc2UgYWt0aXZ1amVcclxuICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPGFueT59XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTdG9ybm9Eb2tsYWR1KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgYWt0aXZvdmF0OiBib29sZWFuID0gZmFsc2UpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gYWt0aXZvdmF0ID9cclxuICAgICAgICAgICAgQWt0aXZvdmF0RG9rbGFkKGNvbnRlbnQpIDpcclxuICAgICAgICAgICAgU3Rvcm5vdmF0RG9rbGFkKGNvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBleHBvcnQgZnVuY3Rpb24gU3Rvcm5vIGRva2xhZHVcclxuICAgICogXHJcbiAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTdG9ybm92YXREb2tsYWQoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCB2c3R1cD86IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRTdG9ybm92YXRSZXF1ZXN0RHRvKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB2c3R1cCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDM2MFwiKTsgLy9SQyAzMDI1MDM2MCA6IFByb2LDrWjDoSBzdG9ybm92YW7DrSBkb2tsYWR1XHJcbiAgICAgICAgICAgIHZzdHVwID0ge1xyXG4gICAgICAgICAgICAgICAgSWRNZXNzYWdlOiBcIlwiLCBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCwgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLnN0b3Jub3ZhdCh2c3R1cClcclxuICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9SZWZyZXNoQWZ0ZXJBY3Rpb24oY29udGVudCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBvYmNlcnN0dmVuaSBzZXpuYW11IG5hIHBvemFkaSAgICBcclxuICAgICAgICAgICAgICAgIC8vYWRkRG9jVG9SZWZyZXNoKCBjb250ZW50Lkl4cCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdC5kYXRhLlJlc3VsdE1lc3NhZ2UgIT09IG51bGwgJiYgdHlwZW9mIHJlc3VsdC5yZXN1bHQuZGF0YS5SZXN1bHRNZXNzYWdlID09PSBcInN0cmluZ1wiICYmIHJlc3VsdC5yZXN1bHQuZGF0YS5SZXN1bHRNZXNzYWdlLnRyaW0oKSAhPT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiByZXN1bHQucmVzdWx0LmRhdGEuWmF1Y3RvdmFueURva2xhZCA/IGZsYXNoUmVzdWx0IDogZmxhc2hSZXN1bHQsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogcmVzdWx0LnJlc3VsdC5kYXRhLlJlc3VsdE1lc3NhZ2UsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtc3VjY2Vzc1wiLCB0aW1lcjogNTAwMCB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LnJlc3VsdC5kYXRhLlBpZFN0b3JudWppY2lob0RvbGFkdSAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXN1bHQucmVzdWx0LmRhdGEuUGlkU3Rvcm51amljaWhvRG9sYWR1ICE9PSBudWxsICYmIChyZXN1bHQucmVzdWx0LmRhdGEhLlBpZFN0b3JudWppY2lob0RvbGFkdSBhcyBhbnkgYXMgc3RyaW5nKS50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBvYmNlcnN0dmVuaSBha3R1YWxuaWhvIHN0b3Jub3ZhbmVobyBkb2tsYWR1IG5hIHNlem5hbXVcclxuICAgICAgICAgICAgICAgICAgICBhZGREb2NUb1JlZnJlc2goY29udGVudC5JeHApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlZnJlc2ggc3Rvcm51amljaWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBhZGREb2NUb1JlZnJlc2gocmVzdWx0LnJlc3VsdC5kYXRhLlBpZFN0b3JudWppY2lob0RvbGFkdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlVjdC5XZWJDbGllbnQuWm9icmF6RGV0YWlsRGxlSVhQKHsgY29udGVudDogY29udGVudCwgaXhwOiByZXN1bHQucmVzdWx0LmRhdGEuUGlkU3Rvcm51amljaWhvRG9sYWR1ISwgc2Ftb3N0YW5lT2tubzogZmFsc2UsIGVkaXRhY2U6IGZhbHNlLCBwb2xvemt5OmZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vR29yZGljLlVjdC5XZWJDbGllbnQuWm9icmF6RGV0YWlsRGxlSVhQT2xkKGNvbnRlbnQsIHJlc3VsdC5yZXN1bHQuZGF0YS5QaWRTdG9ybnVqaWNpaG9Eb2xhZHUgYXMgYW55LCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAocmVzdWx0LnJlc3VsdC5kYXRhLkRva2xhZFBlcm1pc3Npb25zICYmIHJlc3VsdC5yZXN1bHQuZGF0YS5Eb2tsYWRQZXJtaXNzaW9ucy5QZXJtaXNzaW9uc0hsYXZpY2thKSBcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5QZXJtaXNzaW9ucyA9IHJlc3VsdC5yZXN1bHQuZGF0YS5Eb2tsYWRQZXJtaXNzaW9ucyE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1ID0gcmVzdWx0LnJlc3VsdC5kYXRhLkhsYXZpY2thO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeT8uZm9yRWFjaCgoemFwaXMpID0+IHsgemFwaXMuYWt0aXZpdGEgPSA1MDAsIHphcGlzLmRhdF96bWVuYSA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uZGF0X3ptZW5hIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29udGVudC5VY2V0bmlEb2tsYWREdG8uWmFwaXN5ID0gcmVzdWx0LnJlc3VsdC5kYXRhLlphcGlzeTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5TdGF2RG9rbGFkdTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2VHh0ID0gcmVzdWx0LnJlc3VsdC5kYXRhLlN0YXZUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uRGF0dW1abWVueSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5EYXR1bVptZW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBSZWZyZXNoQWZ0ZXJBY3Rpb24oY29udGVudCwgdHJ1ZSwgZmFsc2UsIHRydWUsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vUmVmcmVzaEFmdGVyQWN0aW9uKGNvbnRlbnQsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gUmVmcmVzaERldGFpbChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKG9iakVycm9yOiBFcnJvcikgPT5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5FeGNlcHRpb25Qcm9jZXNzaW5nKHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LCBlcnJvT2JqZWN0OiBvYmpFcnJvciwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5EdXZvZFN0b3JuYSA9IHJldHVyblZhbHVlPy5OYXN0YXZlbmkhW1wiRHV2b2RTdG9ybmFcIl07Ly9yZXR1cm5WYWx1ZVtcIkR1dm9kU3Rvcm5hXCJdOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3Rvcm5vdmF0RG9rbGFkKGNvbnRlbnQsIHZzdHVwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyBjb250ZW50LmVuZE9wZXJhdGlvbigpOyB9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleHBvcnQgZnVuY3Rpb24gQ2xvc2VEb2N1bWVudHNcclxuICAgICAqICBVemF2cmVuaSBkb2tsYWR1XHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSB7R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFV6YXZyaXRSZXF1ZXN0RHRvfSBbdnN0dXBdXHJcbiAgICAgKiBAcGFyYW0ge2FueS8qIEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueX0gW2RlZmZlcl1cclxuICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPGFueT59XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDbG9zZURvY3VtZW50cyhjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIHZzdHVwPzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFV6YXZyaXRSZXF1ZXN0RHRvKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB2c3R1cCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDQ1MVwiKTsgLy9SQyAzMDI1MDQ1MSA6IFByb2LDrWjDoSB1emF2w61yw6Fuw60gZG9rbGFkdVxyXG5cclxuICAgICAgICAgICAgdnN0dXAgPSB7XHJcbiAgICAgICAgICAgICAgICBJZE1lc3NhZ2U6IFwiXCIsIFBpZERva2xhZHU6IGNvbnRlbnQuSXhwLCBEYXR1bVBvc2xlZG5pWm1lbnlEb2tsYWR1OiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmRhdF96bWVuYSxcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb250ZW50LmlzbC5VY3REb2tsYWQudXphdnJpdCh2c3R1cClcclxuICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBwcmViZXJ1IGhvZG5vdHlcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuZGF0X3ptZW5hID0gcmVzdWx0LnJlc3VsdC5kYXRhLkRhdHVtWm1lbnk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5TdGF2RG9rbGFkdTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlN0YXZUeHQgPSByZXN1bHQucmVzdWx0LmRhdGEuU3RhdlR4dDtcclxuICAgICAgICAgICAgICAgIC8vIG5vdmVcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5IbGF2aWNrYTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBlcm1pc3Npb25zID0gcmVzdWx0LnJlc3VsdC5kYXRhLkRva2xhZFBlcm1pc3Npb25zIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0LmRhdGEuWmFwaXN5ICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5aYXBpc3k7XHJcbiAgICAgICAgICAgICAgICBSZWZyZXNoQWZ0ZXJBY3Rpb24oY29udGVudCx0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vIG9iY2Vyc3R2ZW5pIHNlem5hbXUgbmEgcG96YWRpICAgXHJcbiAgICAgICAgICAgICAgICBhZGREb2NUb1JlZnJlc2goY29udGVudC5JeHApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKG9iakVycm9yOiBFcnJvcikgPT5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5FeGNlcHRpb25Qcm9jZXNzaW5nKHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LCBlcnJvT2JqZWN0OiBvYmpFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ2xvc2VEb2N1bWVudHMoY29udGVudCwgdnN0dXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkgICAgICAgIFxyXG4gICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgY29udGVudC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIGV4cG9ydCBmdW5jdGlvbiBTdG9ybm8gZG9rbGFkdVxyXG4gICAgKiBcclxuICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEFrdGl2b3ZhdERva2xhZChjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIHZzdHVwPzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZE9kU3Rvcm5vdmF0UmVxdWVzdER0byk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdnN0dXAgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgY29udGVudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzNTdcIik7IC8vUkMgMzAyNTAzNTcgOiBQcm9iw61ow6EgYWt0aXZhY2VcclxuXHJcbiAgICAgICAgICAgIHZzdHVwID0ge1xyXG4gICAgICAgICAgICAgICAgSWRNZXNzYWdlOiBcIlwiLCBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCwgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZC5vZFN0b3Jub3ZhdCh2c3R1cClcclxuICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcmViZXJ1IGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAvL1JlZnJlc2hBZnRlckFjdGlvbihjb250ZW50LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMgPSByZXN1bHQucmVzdWx0LmRhdGEuRG9rbGFkUGVybWlzc2lvbnMhO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5IbGF2aWNrYTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5aYXBpc3k7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uWmFwaXN5Py5mb3JFYWNoKCh6YXBpcykgPT4geyB6YXBpcy5ha3Rpdml0YSA9IDEwMCwgemFwaXMuZGF0X3ptZW5hID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5kYXRfem1lbmEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uU3RhdkRva2xhZHUgPSByZXN1bHQucmVzdWx0LmRhdGEuU3RhdkRva2xhZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uU3RhdlR4dCA9IHJlc3VsdC5yZXN1bHQuZGF0YS5TdGF2VHh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkRhdHVtWm1lbnkgPSByZXN1bHQucmVzdWx0LmRhdGEuRGF0dW1abWVueTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVmcmVzaEFmdGVyQWN0aW9uKGNvbnRlbnQsIHRydWUsIGZhbHNlLCB0cnVlLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBvem5hY2VuaSwgemEgc2UgbWEgc2V6bmFtIG9iY2Vyc3R2aXRcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB0b3RvIG5lbmkgb3B0aW1hbG5pLCBvYmNhcyBwcmkgemF2cmVuaSBob2RpIGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udGVudC5SZWxvYWRTZXpuYW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9iY2Vyc3R2ZW5pIHNlem5hbXUgbmEgcG96YWRpIHMgYWt0dWFsbmltIGRva2xlZGVtICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZGREb2NUb1JlZnJlc2goIGNvbnRlbnQuSXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBvYmNlcnN0dmVuaSBzZXpuYW11IG5hIHBvemFkaSBzZSBzdG9ybnVqaWNlbSBkb2tsYWRlbVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0LmRhdGEuUGlkU3Rvcm51amljaWhEb2tsYWR1ICYmIHJlc3VsdC5yZXN1bHQuZGF0YS5QaWRTdG9ybnVqaWNpaERva2xhZHUgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkRG9jVG9SZWZyZXNoKHJlc3VsdC5yZXN1bHQuZGF0YS5QaWRTdG9ybnVqaWNpaERva2xhZHUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdC5kYXRhLlJlc3VsdE1lc3NhZ2UgIT09IG51bGwgJiYgdHlwZW9mIHJlc3VsdC5yZXN1bHQuZGF0YS5SZXN1bHRNZXNzYWdlID09PSBcInN0cmluZ1wiICYmIHJlc3VsdC5yZXN1bHQuZGF0YS5SZXN1bHRNZXNzYWdlLnRyaW0oKSAhPT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gdGV4dCBuZWJ5bCBwb3NsYW4gemEgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoU2NodmFsZW5pXCIsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMzU2XCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtc3VjY2Vzc1wiLCB0aW1lcjogNTAwMCB9KSAgLy9SQyAzMDI1MDM1NiA6IERva2xhZCBieWwgb2RzY2h2w6FsZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2hvd0ZsYXNoKHsgaWQ6IGZsYXNoUmVzdWx0LCBpY29uOiBcImdpLXRpY2tcIiwgbGFiZWw6IHJlc3VsdC5yZXN1bHQuZGF0YS5SZXN1bHRNZXNzYWdlLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgdGltZXI6IDUwMDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBSZWZyZXNoRGV0YWlsKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAob2JqRXJyb3I6IEVycm9yKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5FeGNlcHRpb25Qcm9jZXNzaW5nKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogY29udGVudCwgZXJyb09iamVjdDogb2JqRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2c3R1cCEuRHV2b2RBa3RpdmFjZVN0b3JuYSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuRHV2b2RBa3RpdmFjZVN0b3JuYSA9IHJldHVyblZhbHVlPy5OYXN0YXZlbmkhW1wiRHV2b2RBa3RpdmFjZVN0b3JuYVwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQWt0aXZvdmF0RG9rbGFkKGNvbnRlbnQsIHZzdHVwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgTmFjdGVuaSBob2Rub3QgeiBmb3JtdWxhcmVcclxuICAgICAqIGV4cG9ydCBmdW5jdGlvbiBXYWl0Rm9yRGF0YVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9hZERhdGFcclxuICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdVY3RzcGlkRHRvPn1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFdhaXRGb3JEYXRhKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgbG9hZERhdGE6IGJvb2xlYW4gPSBmYWxzZSk6IEpRdWVyeVByb21pc2U8R29yZGljLkVrby5JbnRlcmZhY2UuR1VjdHNwaWREdG8+IHtcclxuICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgIGxldCBmb3JteSA9IGNvbnRlbnQuZWxlbWVudC5maW5kRm9ybXMoKTtcclxuICAgICAgICAvL2lmIChjb250ZW50LmRlZmF1bHRGb3JtID09PSBudWxsKVxyXG4gICAgICAgIC8vICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSh7fSk7XHJcbiAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgcmV0dXJuIGZvcm15Lmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKVxyXG4gICAgICAgICAgICAudGhlbigobykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBsZXQgZHRvU2F2ZURhdGE6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdVY3RzcGlkRHRvID0gbnVsbCBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9hZERhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyLGZvcm1EZXRhaWxcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG9TYXZlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoZHRvU2F2ZURhdGEpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogWnByYXZ5LCBrdGVyZSBqZSBwb3RyZWJhIHpwcmFjb3ZhdCBydWNuZSBwcmkgZXZpZGVuY2VcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge0Vrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZX0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIHthbnl9IGRlZmZlclxyXG4gICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8YW55Pn1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEV4dGVuZENvbmRpdGlvbnNFdmlkZW5jZShjb250ZW50OiBHQ29udGVudCwgbWVzc2FnZTogRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlLCBvYmplY3Q/OiBvYmplY3QpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICBsZXQgZGVmZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGlmIChtZXNzYWdlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkXHJcbiAgICAgICAgICAgICYmIG1lc3NhZ2UuVHlwZU1lc3NhZ2UgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAvL3ZhciB1Y3REb2tsYWQgPSBvYmplY3QgYXMgR29yZGljLkVrby5JbnRlcmZhY2UuR1VjdHNwaWREdG87XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheihjb250ZW50LCBtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZ5c2xlZGVrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5JZE1lc3NhZ2UgPSBcIjMwMTAwNDEwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZ5c2xlZGVrLlJlc3VsdCA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnppdCBuYWJpZG51dGUgY2lzbG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5OYXN0YXZlbmkhW1wiT3RhemthVnlzbGVka3VLb250cm9seUNpc2xhRG9rbGFkdVwiXSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5OYXN0YXZlbmkhW1wiT3RhemthVnlzbGVka3VLb250cm9seUNpc2xhRG9rbGFkdVwiXSA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5SZXN1bHQgPSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZXNvbHZlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2UuUmVzdWx0ID0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yO1xyXG4gICAgICAgIHJldHVybiBkZWZmZXIucmVzb2x2ZShtZXNzYWdlKS5wcm9taXNlKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEV2aWRlbmNlIGRva2xhZHVcclxuICAgICAqIFxyXG4gICAgICogKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBFdmlkZW5jZShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIGRhdGE/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkRXZpZGVuY2VSZXF1ZXN0RHRvLCBjbG9zaW5nOiBib29sZWFuID0gZmFsc2UpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gRXZpZGVuY2VEb2tsYWR1KGNvbnRlbnQsIGRhdGEsIGNsb3NpbmcpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5Jc011c2lOYXZhemF0ICYmICh0eXBlb2YgY2xvc2luZyA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjbG9zaW5nID09PSBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5kaWFsb2dzLm1lc3NhZ2VCb3goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNTkyXCIsIC8vUkMgMzAyNTA1OTIgOiBPdMOhemthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IFwianJlczozMDI1MDU5M1wiLCBidXR0b25zOiBHRGxnLm1iYlllc05vLCBpY29uOiBHRGxnLm1iaVF1ZXN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgLy9SQyAzMDI1MDU5MyA6IE9wcmF2bsO9IGRva2xhZCBtdXPDrSBiw710IG5hdsOhesOhbiBuYSBwcmltw6FybsOtIGRva2xhZC4gQ2hjZXRlIHZhemJ1IHZ5dHZvxZlpdCBueW7DrT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlem5hbSBzZSBidWRlIGkgcMWZZXN0byBuYcSNw610YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBWYXpieURva2xhZHUoY29udGVudCwgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1ISwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25BZnRlckV2aWRlbmNlKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE5hY3RlbmkgcGFyYW1ldHJ1IGNvIGRlbGF0IHBvIGV2aWRlbmNpXHJcbiAgICAgKiBAcGFyYW0gdGhpc1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0QWtjZVBvRXZpZGVuY2kodGhpczogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLkV2aWRlbmNlQWtjZVwiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWtjZSBwbyBldmlkZW5jaSBkb2tsYWR1XHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFjdGlvbkFmdGVyRXZpZGVuY2UoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCBncmlkID0gR2V0R3JpZChjb250ZW50KTtcclxuICAgICAgICBjb25zdCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gcG9rdWQgbmVqc291IHphcGlzdSwgcHJvdmVkIGFrY2kgZGxlIG5hc3RhdmVuaVxyXG4gICAgICAgIGlmIChHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UoZ3JpZCkgPT09IDApIHtcclxuICAgICAgICAgICAgLy8gY28gZGVsYXQgcG8gZXZpZGVuY2lcclxuICAgICAgICAgICAgY29uc3QgaG9kbm90YSA9IGdldEFrY2VQb0V2aWRlbmNpLmNhbGwoY29udGVudCk7Ly9jb250ZW50Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5FdmlkZW5jZUFrY2VcIik7XHJcbiAgICAgICAgICAgIGlmIChob2Rub3RhID09PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gbm92eSByYWRlayAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFN3aXRjaFRvUmVjb3Jkcyhjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIHZ5dm9sYW0gYWtjaSBub3Z5IHJhZGVrXHJcbiAgICAgICAgICAgICAgICBXYWl0Rm9yRGF0YShjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50LmNsb3NlZCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG11c2lWYXphdCA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLklzTXVzaU5hdmF6YXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLklzTXVzaU5hdmF6YXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE5vdnlaYXBpcyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiBjb250ZW50LlVjZXRuaURva2xhZER0by5Jc011c2lOYXZhemF0ID0gbXVzaVZhemF0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb250ZW50LmFjdGlvbnNbXCJhY3RQb2xvemt5Tm92eVJhZGVrXCJdIS5ydW4oKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChob2Rub3RhID09PSBcIjJcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gc3B1c3RlbmkgcHJlZGtvbnRhY2VcclxuICAgICAgICAgICAgICAgIC8vIHByZXBudXRpIG5hIHphbG96a3UgemFwaXN1XHJcbiAgICAgICAgICAgICAgICBTd2l0Y2hUb1JlY29yZHMoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmFjdGlvbnMuYWN0UG9sb3preVByZWRrb250YWNlPy5ydW4oKTtcclxuICAgICAgICAgICAgICAgIC8vIHRvIG5ldmltLCB6ZGEgYnVkZSBmdW5nb3ZhdC4uLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBFdmlkZW5jZSBkb2tsYWR1XHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEV2aWRlbmNlRG9rbGFkdShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIGRhdGE/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkRXZpZGVuY2VSZXF1ZXN0RHRvLCBjbG9zaW5nOiBib29sZWFuID0gZmFsc2UpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAvL2xldCBkZWY6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PjtcclxuICAgICAgICBsZXQgZG9rdW1lbnQ6IGFueSA9IHZvaWQgKDApO1xyXG4gICAgICAgIC8vY29uc3Qgem1lbmFEb2t1bWVudHUgPSAoJ3Byb2ZpbERva3VtZW50RWtvQ29tcG9uZW50SGFzQ2hhbmdlZCcgaW4gY29udGVudCkgJiZjb250ZW50LnByb2ZpbERva3VtZW50RWtvQ29tcG9uZW50SGFzQ2hhbmdlZCgpIC8qfHwgISgnc2F2ZUVrb1Byb2ZpbCcgaW4gY29udGVudCkqLztcclxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwidW5kZWZpbmVkXCIgfHwgZGF0YSA9PT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgLy8gdmFsaWRhY2UgZm9ybXVsw6HFmWUgKHBvdXplIHYganMgYmV6IHNlcnZlcnUpXHJcbiAgICAgICAgICAgIGlmICghY29udGVudC5lbGVtZW50LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvLyBwb3NiaXJhbmkgaG9kbm90IHogZm9ybXVsYXJlIGRvIGR0b1xyXG4gICAgICAgICAgICBsZXQgZHRvU2F2ZURhdGEgPSBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZmluZEZvcm1zKFwiZm9ybURldGFpbCxmb3JtSGVhZGVyXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvU2F2ZURhdGEpIC8vIHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2VcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIG96bmFjZW5pIGludGVybmlobyBkb2tsYWR1XHJcbiAgICAgICAgICAgIGR0b1NhdmVEYXRhIS5pbnRfZG9rID0gY29udGVudC5JbnRlcm5pRG9rbGFkO1xyXG4gICAgICAgICAgICBpZiAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5Jc0V2aWRvdmFueSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQgbmVkb3NsbyBrZSB6bWVuZSwgbmljIG5lcG9zaWxhbSBuYSBzZXJ2ZXJcclxuICAgICAgICAgICAgICAgIGlmICgvKidzYXZlRWtvUHJvZmlsJyBpbiBjb250ZW50ICYmIHptZW5hRG9rdW1lbnR1Ki9Fa28uVXRpbHMuRG9rdW1lbnRIYXNDaGFuZ2VkKGNvbnRlbnQpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9rdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBkb2t1bWVudCA9ICQuZXh0ZW5kKHRydWUsIHt9LCAoY29udGVudCBhcyBhbnkpLnNhdmVFa29Qcm9maWwoKSwgKGNvbnRlbnQgYXMgYW55KS5zYXZlU3NsRGV0YWlsRG9ydWNlbmlFa28gPyAoY29udGVudCBhcyBhbnkpLnNhdmVTc2xEZXRhaWxEb3J1Y2VuaUVrbygpIDoge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRva3VtZW50Lml4c190eXAgPSBkb2t1bWVudC5peHNfdHlwID8/IGR0b1NhdmVEYXRhPy5peHNfdHlwO1xyXG4gICAgICAgICAgICAgICAgICAgIGRva3VtZW50Lm5hemV2ID0gZG9rdW1lbnQubmF6ZXYgPz8gZHRvU2F2ZURhdGEhLmRva3VtZW50Py5uYXpldjtcclxuICAgICAgICAgICAgICAgICAgICBkb2t1bWVudC5zdF91dGFqX2lkID0gZG9rdW1lbnQuc3RfdXRhal9pZCA/PyBkdG9TYXZlRGF0YSEuZG9rdW1lbnQ/LnN0X3V0YWpfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9rdW1lbnQuaXhzX2Z1bl9ha3QgPSBkb2t1bWVudC5peHNfZnVuX2FrdCA/PyBkdG9TYXZlRGF0YSEuZG9rdW1lbnQ/Lml4c19mdW5fYWt0O1xyXG4gICAgICAgICAgICAgICAgICAgIGR0b1NhdmVEYXRhIVtcImRva3VtZW50XCJdID0gZG9rdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgLy8gdmxhc3Rub3N0aSAtLSBwb3NpbGF0IGplbiBwb2t1ZCBkb3NsbyBrZSB6bWVuZSBhIGV4aXN0dWplIG1ldG9kYVxyXG4gICAgICAgICAgICAgICAgaWYgKEVrby5VdGlscy5WbGFzdG5vc3RpSGFzQ2hhbmdlZChjb250ZW50KSlcclxuICAgICAgICAgICAgICAgIC8vaWYgKCgnZGVzY1Byb3BzX3NldHVwJyBpbiBjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgJiYgR29yZGljLlBvcGlzbmVWbGFzdG5vc3RpLmhhc0NoYW5nZWQoY29udGVudClcclxuICAgICAgICAgICAgICAgIC8vKVxyXG4gICAgICAgICAgICAgICAgICAgIGR0b1NhdmVEYXRhIS52bGFzdG5vc3RpID0gR29yZGljLlBvcGlzbmVWbGFzdG5vc3RpLmNvbGxlY3RWYWx1ZXMoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgaWRNZXNzYWdlID0gXCJcIjtcclxuICAgICAgICAgICAgY29udGVudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzNDdcIikgLy9SQyAzMDI1MDM0NyA6IFByb2LDrWjDoSB1a2zDoWTDoW7DrVxyXG4gICAgICAgICAgICBkYXRhID0geyBIbGF2aWNrYTogZHRvU2F2ZURhdGEsIElkTWVzc2FnZTogaWRNZXNzYWdlLCBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLnNhdmVEb2N1bWVudChkYXRhKVxyXG4gICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXZpZGVuY2UgcHJvdmVkZW5hIFwiLCBjb250ZW50Lkl4cCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LkVkaXRhY2VIbGF2aWNreSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5FZGl0YWNlWmFwaXN1ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBkb3NsbyBrZSB6bWVuZSBkb2t1bWVudHUsIG11c2ltIGhhcmQgbG9hZCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBlcm1pc3Npb25zID0gcmVzdWx0LkRva2xhZFBlcm1pc3Npb25zITtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSA9IHJlc3VsdC5IbGF2aWNrYTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyB6YXBpc3kgbmVwcmViaXJhbSwgem1lbmEgcG91emUgZGF0OiB6bWVuYSBhIHN0YXZcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeT8uZm9yRWFjaCgoemFwaXMpID0+IHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHphcGlzLmRhdF96bWVuYSA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIHphcGlzLnptZW51X3Byb3YgPSBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LnptZW51X3Byb3ZcclxuICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlN0YXZEb2tsYWR1ID0gcmVzdWx0LlN0YXZEb2tsYWR1O1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uU3RhdlR4dCA9IHJlc3VsdC5TdGF2VHh0O1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uRGF0dW1abWVueSA9IHJlc3VsdC5EYXR1bVptZW55O1xyXG4gICAgICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlID0gISghKCdwcm9maWxEb2t1bWVudEVrb0NvbXBvbmVudEhhc0NoYW5nZWQnIGluIGNvbnRlbnQpIHx8IGNvbnRlbnQucHJvZmlsRG9rdW1lbnRFa29Db21wb25lbnRIYXNDaGFuZ2VkKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJldHVybkFjdGlvbjogSlF1ZXJ5UHJvbWlzZTxhbnk+O1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoISgnc2F2ZUVrb1Byb2ZpbCcgaW4gY29udGVudCkgfHwgem1lbmFEb2t1bWVudHUpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyBwdXZvZG5pIGRsb3VoZSBuYWN0ZW5pXHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm5BY3Rpb24gPSBSZWZyZXNoRGV0YWlsKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgICAgICAvL3sgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkFjdGlvbiA9IFJlZnJlc2hBZnRlckFjdGlvbihjb250ZW50LCB0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIHJldHVybkFjdGlvbi50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6aXQgS0ggRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuWm9icmF6aXRLSERQSCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBvZGtsYWR5S0hEUEgoY29udGVudCwgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Lkdsb2JhbHMuUGFyYW1zIS5BdXRvbWF0aWNrZU90ZXZyZW5pS0hEUEggPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBdXRvbWF0aWNrZU90ZXZyZW5pS29udHJvbG5paG9IbGFzZW5pLkFub0JlekRhdHVtdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcmVzdWx0LlBydm90bmlFdmlkZW5jZSEsdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVmcmVzaERldGFpbChjb250ZW50LClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbnV0bmUgbmFjaXQgZGF0dW0gem1lbnkgeiBkdXZvZHUgbW96bmUgem1lbmkgbmEgc2VydmVydSBwcmkgdWtsYWRhbmkgS0ggRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIFJlbG9hZFJlY29yZHMoY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGVudC5VY2V0bmlEb2tsYWREdG8uSXNNdXNpTmF2YXphdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQWZ0ZXJFdmlkZW5jZShjb250ZW50KS50aGVuKCgpID0+IHJldHVyblZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7Ly9yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbyBkZWxhdCBwbyBldmlkZW5jaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBuZWpzb3UgemFwaXN1IGEgbmVtdXNpIHZhemF0LCBwcm92ZWQgYWtjaSBkbGUgbmFzdGF2ZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGVudC5VY2V0bmlEb2tsYWREdG8uSXNNdXNpTmF2YXphdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkFmdGVyRXZpZGVuY2UoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlOy8vcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAob2JqRXJyb3I6IEVycm9yKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5FeGNlcHRpb25Qcm9jZXNzaW5nKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogY29udGVudCwgZXJyb09iamVjdDogb2JqRXJyb3IsIGV4dGVyblByb2Nlc3NlZDogRXh0ZW5kQ29uZGl0aW9uc0V2aWRlbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBFdmlkZW5jZURva2xhZHUoY29udGVudCwgZGF0YSwgY2xvc2luZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBaYXBub3V0IHJlemltIGVkaXRhY2UgaGxhdmlja3kgcHJvaGxpemVuaS9vcHJhdmEoKVxyXG4gICAgICogQHBhcmFtIHRoaXNcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZXppbUVkaXRhY2UodGhpczogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBpZiAodGhpcy5FZGl0YWNlSGxhdmlja3kgJiYgdGhpcy5VY2V0bmlEb2tsYWREdG9PcmlnaW4hPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVWNldG5pRG9rbGFkRHRvID0gdGhpcy5VY2V0bmlEb2tsYWREdG9PcmlnaW47XHJcbiAgICAgICAgICAgIHRoaXMuVWNldG5pRG9rbGFkRHRvT3JpZ2luID0gbnVsbDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5FZGl0YWNlSGxhdmlja3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKFwiZGVzY1Byb3BzX3NldHVwXCIgaW4gdGhpcyAvKiYmIHRoaXMuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uSXNFdmlkb3ZhbnkqLykgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2NQcm9wc19zZXR1cCh7IHJlYWRPbmx5OiB0cnVlLCB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbGxGb3Jtcyh0aGlzKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiBPcHJhdml0SGxhdmlja3UodGhpcyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE9wcmF2aXQgaGxhdmlja3UgZG9rbGFkdVxyXG4gICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIE9wcmF2aXRIbGF2aWNrdShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gdXNjaG92YW5pIHB1dm9kbmkgaG9kbm90eVxyXG4gICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvT3JpZ2luID0gY29udGVudC5VY2V0bmlEb2tsYWREdG87XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZC5yZWFkU3RhdkRva2xhZHUoe1xyXG4gICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgRWRpdEhsYXZpY2thOiBmYWxzZSwgRWRpdFphcGlzeTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBIbGF2aWNrYURva2xhZHU6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdXNjaG92YW5pIHB1dm9kbmkgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgLy9jb250ZW50LlVjZXRuaURva2xhZER0b09yaWdpbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LkVkaXRhY2VIbGF2aWNreSA9ICFjb250ZW50LkVkaXRhY2VIbGF2aWNreTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkVuYWJsZWRJdGVtcyA9IHJlc3VsdC5FbmFibGVkSXRlbXM7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5IaWRkZW5JdGVtcyA9IHJlc3VsdC5IaWRkZW5JdGVtcztcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlZpc2libGVkSXRlbXMgPSByZXN1bHQuVmlzaWJsZWRJdGVtcztcclxuICAgICAgICAgICAgICAgIC8vIFYgcHJpcGFkZSBwcmVjaG9kdSBkbyBlZGl0YWNlIGhsYXZpY2t5IHpwcmlzdHVwbmltIHBvbGUgcG9waXNueWNoIHZsYXN0bm9zdGlcclxuICAgICAgICAgICAgICAgIGlmIChcImRlc2NQcm9wc19zZXR1cFwiIGluIGNvbnRlbnQgJiYgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5Jc0V2aWRvdmFueSlcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmRlc2NQcm9wc19zZXR1cCh7IHJlYWRPbmx5OiAhY29udGVudC5FZGl0YWNlSGxhdmlja3ksIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9jb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUgPSByZXN1bHQuSGxhdmlja2FEb2tsYWR1O1xyXG4gICAgICAgICAgICAgICAgLy9jb250ZW50LlVjZXRuaURva2xhZER0by5QZXJtaXNzaW9ucy5QZXJtaXNzaW9uc1phcGlzID0gcmVzdWx0LlBlcm1pc3Npb25zLlBlcm1pc3Npb25zWmFwaXM7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBlcm1pc3Npb25zLlBlcm1pc3Npb25zSGxhdmlja2EgPSByZXN1bHQuUGVybWlzc2lvbnMuUGVybWlzc2lvbnNIbGF2aWNrYTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBlcm1pc3Npb25zID0gcmVzdWx0LlBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICAgICAgLy9yZWZyZXNoRGV0YWlsKGNvbnRlbnQsKTtcclxuICAgICAgICAgICAgICAgIC8vZmlsbEZvcm1zKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZmFpbCgoZXg6IEdFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXguaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBuYWN0ZW5pIGNlbGVobyBkZXRhaWx1IHpub3Z1XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmcmVzaERldGFpbChjb250ZW50LCAhY29udGVudC5FZGl0YWNlSGxhdmlja3kpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hbHdheXMoKCk9PmNvbnRlbnQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgIDsgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFrdHVhbGl6YWNlIGRldGFpbHUgcG8gcHJvdmVkZW5pIGFrY2VcclxuICAgICAqIFxyXG4gICAgICogKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZWZyZXNoQ29udGVudCh0aGlzOiBHQWN0aW9uLCBjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIHJlc3VsdDogSlF1ZXJ5UHJvbWlzZTxhbnk+LCBmaWxsRm9ybTogYm9vbGVhbiA9IGZhbHNlLCBjYWxscmVmcmVzaERldGFpbDogYm9vbGVhbiA9IGZhbHNlKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB0aGlzLnNldFBlbmRpbmcocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4oICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIChyZWZyZXNoKSA9PiBjYWxscmVmcmVzaERldGFpbCB8fCB0eXBlb2YgcmVmcmVzaCA9PT0gXCJ1bmRlZmluZWRcIiB8fCByZWZyZXNoID09IHRydWUgP1xyXG4gICAgICAgICAgICByZWZyZXNoRGV0YWlsLmNhbGwoY29udGVudCwgZmlsbEZvcm0pXHJcbiAgICAgICAgICAgIDp2b2lkICgwKSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE9ibm92aXQgZGV0YWlsIGJleiByZXF1ZXN0dSBuYSBzZXJ2ZXJcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiByZWZyZXNoRGV0YWlsKHRoaXM6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgZmlsbEZvcm06IGJvb2xlYW4gPSBmYWxzZSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAvL3RoaXMuRWRpdGFjZVphcGlzdSA9IGZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5DaGFuZ2VFbmFibGUgPSBmYWxzZTtcclxuICAgICAgICAvL3RoaXMubmV3Um93U3RhcnQgPSBmYWxzZTtcclxuICAgICAgICAvLyB2eWNpc3RlbmkgZmxhc2hcclxuICAgICAgICB0aGlzLmhpZGVGbGFzaChmbGFzaFJlc3VsdCk7XHJcbiAgICAgICAgLy8gbmFwbG5lbmkgZm9ybXVsYXJlIC0gWmppc3RpdCwgemRhIGplIHRvIHBvdHJlYmE/XHJcbiAgICAgICAgbGV0IHJlc29sdmU6IEpRdWVyeVByb21pc2U8YW55PiA9IGZpbGxGb3JtID8gZmlsbEZvcm1zKHRoaXMpIDogJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXNvbHZlXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIFJlZnJlc2hNZW51KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAodGhpcy5FZGl0YWNlSGxhdmlja3kpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVwcmF2YSBwcmlzdHVwbm9zdGkgcG9saVxyXG4gICAgICAgICAgICAgICAgWnByaXN0dXBuZW5pUG9saSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIC8vIFNrcnl0aSBuZXBvdHJlYm55Y2ggcG9saVxyXG4gICAgICAgICAgICAgICAgWm9icmF6ZW5pUG9saSh0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIcm9tYWRueSBwb3BpcyB6YXBpc3VcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSHJvbWFkbnlQb3Bpc1phcGlzdShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpIHtcclxuICAgICAgICBpZiAoY29udGVudC5FZGl0YWNlSGxhdmlja3kgfHwgY29udGVudC5FZGl0YWNlWmFwaXN1KSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDIwN1wiLCAvL1JDIDMwMjUwMjA3IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyMDZcIikgLy9SQyAzMDI1MDIwNiA6IFYgcmXFvmltdSBlZGl0YWNlIGFrY2kgbmVsemUgcHJvdsOpc3RcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB6amlzdGVuaSBvem5hY2VueWNoIHJhZGt1XHJcbiAgICAgICAgbGV0IG96bmFjZW5lUmFka3kgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGRwZXBEdG8+KEdldEdyaWQoY29udGVudCksIGZhbHNlKTtcclxuICAgICAgICBpZiAob3puYWNlbmVSYWRreT8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDIwN1wiLCAvL1JDIDMwMjUwMjA3IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyMDhcIikgLy9SQyAzMDI1MDIwOCA6IE5lanNvdSDFvsOhZG7DqSDDusSNZXRuw60gesOhcGlzeS4gQWtjaSBuZWx6ZSBwcm92w6lzdFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaXN0SUQ6IG51bWJlcltdIHwgdW5kZWZpbmVkfG51bGwgPSBvem5hY2VuZVJhZGt5Py5tYXAoKGl0ZW0pID0+IGl0ZW0ucmFkZWtfeiBhcyBudW1iZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBaYWRhbmlUZXh0dVBvcGlzdVJhZGt1KGNvbnRlbnQpXHJcbiAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5wb3BpcyAmJiB0eXBlb2YgcmVzdWx0LnBvcGlzID09PSBcInN0cmluZ1wiICYmIHJlc3VsdC5wb3Bpcy50cmltKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMTIwXCIpOyAvL1JDIDMwMjUwMTIwIDogT3BlcmFjZSBzZSBwcm92w6Fkw61cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmlzbC5VY3REb2tsYWRaYXBpcy5ocm9tYWRuZVBvcHNhdCh7IFBpZERva2xhZHU6IGNvbnRlbnQuSXhwLCBsaXN0SURSb3dzOiBsaXN0SUQsIFBvcGlzUmFka3U6IHJlc3VsdC5wb3BpcywgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmEsIFByZXBzYXROZXByYXpkbmVQb3Bpc3k6IHJlc3VsdC5wcmVwaXMgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmRhdF96bWVuYSA9IHJlc3VsdC5EYXR1bVptZW55RG9rbGFkdU5vdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVmcmVzaEdyaWQoY29udGVudCwgcmVzdWx0LlNlem5hbSBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5zaG93Rmxhc2goeyBpZDogZmxhc2hSZXN1bHQsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMjA0XCIuZm9ybWF0KHJlc3VsdC5Qb2NldE92bGl2bmVueWNoUmFka3UgYXMgYW55KSwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCIsIHRpbWVyOiA1MDAwIH0pOyAvL1JDIDMwMjUwMjA0IDogUG9waXMgYnlsIHptxJtuxJtuLiBQb8SNZXQgb3ZsaXZuxJtuw71jaCB6w6FwaXPFrzogezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgICAqIEZvcm11bGFyIHBybyB6YWRhbmkgcG9waXN1IHJhZGt1XHJcbiAgICAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFphZGFuaVRleHR1UG9waXN1UmFka3UoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KSB7XHJcbiAgICAgICAgLy92YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjMwMjUwMjAwXCIgfSkgLy9SQyAzMDI1MDIwMCA6IEhyb21hZG7DvSBwb3BpcyDFmcOhZGvFr1xyXG4gICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDIwMlwiIH0pIC8vUkMgMzAyNTAyMDIgOiBaYWRlanRlIG5vdsO9IHBvcGlzXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLCBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMCwgbWF4OiAyNTQsIG1lc3NhZ2U6IFwianJlczozMDI1MDIxMFwiIH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vUkMgMzAyNTAyMTAgOiBNYXhpbWltw6FsbsOtIHZlbGlrb3N0IHRleHR1IGplIDI1NCB6bmFrxa8hXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByZXBpc1wiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMDI1MDIwM1wiLCAvL1JDIDMwMjUwMjAzIDogVmxvxb5pdCBpIG5hIHrDoXBpc3ksIGt0ZXLDqSBtYWrDrSBwb3Bpc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIGxldCBzaW1wbGVGb3JtID0gY29udGVudC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjMwMjUwMjAwXCIsIGZvcm0sIHt9LCAkLmV4dGVuZCh7aWQ6XCJJRFBvcGlzUmFka3VcIn0sIHsgLy9SQyAzMDI1MDIwMCA6IEhyb21hZG7DvSBwb3BpcyDFmcOhZGvFr1xyXG4gICAgICAgICAgICB3aWR0aDogNTAwLCBoZWlnaHQ6IDIwMCwgdXNlclNldHRpbmdzOiBjb250ZW50LnVzZXJTZXR0aW5ncyxcclxuICAgICAgICAgICAgY29tbWFuZEJhcjogW1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogdGV4dHkgZG8gcmVzb3VyY2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9rXCIsIGNhcHRpb246IEdEbGcubWJiT2sudGV4dCwgaWNvbjogXCJnaS10aWNrXCIsIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGxnID0gc2ltcGxlRm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGxnOiBcIiwgZGxnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkbGcuZ2Zvcm0oXCJpc1ZhbGlkXCIsIHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSAvKmRhdGEgfHwqLyB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbGcuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbGcuZ2NvbnRlbnQoKS5jbG9zZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFpydXNpdFwiLCBjYXB0aW9uOiBHRGxnLm1iYkNhbmNlbC50ZXh0LCBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLCBydW46IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRsZyA9IHNpbXBsZUZvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbGcuZ2NvbnRlbnQoKS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4gc2ltcGxlRm9ybTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFpwcmF2eSwga3RyZXJlIGplIHBvdHJlYmEgenByYWNvdmF0IHJ1Y25lIHByaSBzY2h2YWxlbmlcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge0Vrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZX0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIHthbnl9IGRlZmZlclxyXG4gICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8YW55Pn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRXh0ZW5kQ29uZGl0aW9uc1NjaHZhbGVuaShjb250ZW50OiBHQ29udGVudCwgbWVzc2FnZTogRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlLCBvYmplY3Q6IG9iamVjdCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIC8vbGV0IGRlZmZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICBpZiAobWVzc2FnZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZFxyXG4gICAgICAgICAgICAmJiBtZXNzYWdlLlR5cGVNZXNzYWdlID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuSWRNZXNzYWdlID09IFwiS29udHJvbGFDaXNsYURva2xhZHVfcXVlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1Y3REb2tsYWQgPSBvYmplY3QgYXMgR29yZGljLkVrby5JbnRlcmZhY2UuR1VjdHNwaWREdG87XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkRvdGF6KGNvbnRlbnQsIG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZ5c2xlZGVrOiBFa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnlzbGVkZWsuU2VydmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eXNsZWRlay5SZXN1bHQgPT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eXNsZWRlay5SZXN1bHQgPSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdnlzbGVkZWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucmVzb2x2ZSh2eXNsZWRlayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLklkTWVzc2FnZSA9IFwiMzAxMDA0MTBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuTmFzdGF2ZW5pIVtcIk90YXprYVZ5c2xlZGt1S29udHJvbHlDaXNsYURva2xhZHVcIl0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5SZXN1bHQgPSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5yZXNvbHZlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2UuUmVzdWx0ID0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yO1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShtZXNzYWdlKS5wcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleHBvcnQgZnVuY3Rpb24gU2NodmFsZW5pRG9rbGFkdVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTY2h2YWxlbmlEb2tsYWR1KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgdnN0dXA/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkU2NodmFsaXRSZXF1ZXN0RHRvKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB2c3R1cCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDM1MlwiKTsgLy9SQyAzMDI1MDM1MiA6IFByb2LDrWjDoSBzY2h2YWxvdsOhbsOtXHJcbiAgICAgICAgICAgIHZzdHVwID0ge1xyXG4gICAgICAgICAgICAgICAgSWRNZXNzYWdlOiBcIlwiLCBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCwgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmEgXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZC5zY2h2YWxpdCh2c3R1cClcclxuICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKHJlc3VsdC5yZXN1bHQuZGF0YS5Eb2tsYWRQZXJtaXNzaW9ucyAmJiByZXN1bHQucmVzdWx0LmRhdGEuRG9rbGFkUGVybWlzc2lvbnMuUGVybWlzc2lvbnNIbGF2aWNrYSkgXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5QZXJtaXNzaW9ucyA9IHJlc3VsdC5yZXN1bHQuZGF0YS5Eb2tsYWRQZXJtaXNzaW9ucyE7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUgPSByZXN1bHQucmVzdWx0LmRhdGEuSGxhdmlja2E7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5EYXR1bVptZW55ID0gcmVzdWx0LnJlc3VsdC5kYXRhLkhsYXZpY2thPy5kYXRfem1lbmE7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gR2V0R3JpZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5aYXBpc3kgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0QWxsUm93czxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0ZHBlcER0bz4oZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAvL0dvcmRpYy5Fa28uR3JpZC5nZXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGRwZXBEdG8+KEdldEdyaWQoY29udGVudCksIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbnVsYSA9IHBhcnNlRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCB6YXBpc3k6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIC8vIHZ5aG9kaW0gemFwaXN5IHMgbnVsb3Z5bWkgTUQgYSBEYWxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeT8uXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yRWFjaCgoemFwaXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWQgPSBwYXJzZURlY2ltYWwoemFwaXMuYzAgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhbCA9IHBhcnNlRGVjaW1hbCh6YXBpcy5jMSA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtZC5lcShudWxhKSB8fCAhZGFsLmVxKG51bGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoemFwaXMudXBfc3RhdiA9PSAwKSB7IHphcGlzLnVwX3N0YXYgPSAzMCwgemFwaXMuZGF0X3ptZW5hID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5kYXRfem1lbmEgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemFwaXN5LnB1c2goemFwaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL3phcGlzeS5cclxuICAgICAgICAgICAgICAgIC8vICAgIGZvckVhY2goKHphcGlzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHphcGlzLnVwX3N0YXYgPT0gMClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB7IHphcGlzLnVwX3N0YXYgPSAzMCwgemFwaXMuZGF0X3ptZW5hID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5kYXRfem1lbmEgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5aYXBpc3kgPSB6YXBpc3k7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5aYXBpc3k7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5TdGF2RG9rbGFkdTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlN0YXZUeHQgPSByZXN1bHQucmVzdWx0LmRhdGEuU3RhdlR4dDtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkRhdHVtWm1lbnkgPSByZXN1bHQucmVzdWx0LmRhdGEuRGF0dW1abWVueTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBSZWZyZXNoQWZ0ZXJBY3Rpb24oY29udGVudCwgdHJ1ZSwgZmFsc2UsIHRydWUsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy9hZGREb2NUb1JlZnJlc2goY29udGVudC5JeHApO1xyXG4gICAgICAgICAgICAgICAgLy9yZWZyZXNoRGV0YWlsKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gUmVmcmVzaERldGFpbChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLnRoZW4oKCkgPT4geyBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChvYmpFcnJvcjogRXJyb3IpID0+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRXhjZXB0aW9uUHJvY2Vzc2luZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LCBlcnJvT2JqZWN0OiBvYmpFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVyblByb2Nlc3NlZDogRXh0ZW5kQ29uZGl0aW9uc1NjaHZhbGVuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gU2NodmFsZW5pRG9rbGFkdShjb250ZW50LCB2c3R1cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICAgLmFsd2F5cygoKT0+e1xyXG4gICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogZXhwb3J0IGZ1bmN0aW9uIFNjaHZhbGVuaURva2xhZHVcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gT2RTY2h2YWxlbmlEb2tsYWR1KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgdnN0dXA/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkT2RzY2h2YWxpdFJlcXVlc3REdG8pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHZzdHVwID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMzU3XCIpOyAvL1JDIDMwMjUwMzU3IDogUHJvYsOtaMOhIGFrdGl2YWNlXHJcbiAgICAgICAgICAgIHZzdHVwID0ge1xyXG4gICAgICAgICAgICAgICAgSWRNZXNzYWdlOiBcIlwiLCBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCwgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLm9kU2NodmFsaXQodnN0dXApXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChyZXN1bHQucmVzdWx0LmRhdGEuRG9rbGFkUGVybWlzc2lvbnMgJiYgcmVzdWx0LnJlc3VsdC5kYXRhLkRva2xhZFBlcm1pc3Npb25zLlBlcm1pc3Npb25zSGxhdmlja2EpIFxyXG4gICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMgPSByZXN1bHQucmVzdWx0LmRhdGEuRG9rbGFkUGVybWlzc2lvbnMhO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1ID0gcmVzdWx0LnJlc3VsdC5kYXRhLkhsYXZpY2thO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uWmFwaXN5Py5mb3JFYWNoKCh6YXBpcykgPT4geyBpZiAoemFwaXMudXBfc3RhdiA9PSAzMCkgeyB6YXBpcy51cF9zdGF2ID0gMDsgemFwaXMuZGF0X3ptZW5hID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5kYXRfem1lbmE7IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5aYXBpc3k7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5TdGF2RG9rbGFkdTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlN0YXZUeHQgPSByZXN1bHQucmVzdWx0LmRhdGEuU3RhdlR4dDtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkRhdHVtWm1lbnkgPSByZXN1bHQucmVzdWx0LmRhdGEuRGF0dW1abWVueTtcclxuICAgICAgICAgICAgICAgIFJlZnJlc2hBZnRlckFjdGlvbihjb250ZW50LCB0cnVlLCBmYWxzZSwgdHJ1ZSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvL1JlZnJlc2hBZnRlckFjdGlvbihjb250ZW50LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvLy8vIG9iY2Vyc3R2ZW5pIHNlem5hbXUgbmEgcG96YWRpICAgXHJcbiAgICAgICAgICAgICAgICAvL2FkZERvY1RvUmVmcmVzaChjb250ZW50Lkl4cCk7XHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiBSZWZyZXNoRGV0YWlsKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAudGhlbiggKCk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCggKG9iakVycm9yOiBFcnJvcikgPT5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5FeGNlcHRpb25Qcm9jZXNzaW5nKHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LCBlcnJvT2JqZWN0OiBvYmpFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2RTY2h2YWxlbmlEb2tsYWR1KGNvbnRlbnQsIHZzdHVwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hbHdheXMoKCk9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHRWtvS25paGFPcHRpb25zIHtcclxuICAgICAgICBjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHU7XHJcbiAgICAgICAgYWt0dWFsaXpvdmF0WmFwaXN5PzogYm9vbGVhbjtcclxuICAgICAgICBoYXJkTG9hZD86IGJvb2xlYW47XHJcbiAgICAgICAgbmVlZFJlZnJlc2hTZXpuYW0/OiBib29sZWFuO1xyXG4gICAgICAgIG5lZWRSZWZyZXNoRGV0YWlsPzogYm9vbGVhbjtcclxuICAgICAgICBmaWxsRm9ybT86IGJvb2xlYW47XHJcbiAgICAgICAgc2NodmFsUHJvY2VzPzogYm9vbGVhbjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHVsYWl6YWNlIGRldGFpbHUgcHJvIHVrb25jZW5pIGFrY2VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gXHJcbiAgICAgICAgICovXHJcbiAgICBmdW5jdGlvbiBSZWZyZXNoQWZ0ZXJBY3Rpb25OKG9wdDogSUdFa29LbmloYU9wdGlvbnMpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIG9wdC5ha3R1YWxpem92YXRaYXBpc3kgPSB0eXBlb2Ygb3B0LmFrdHVhbGl6b3ZhdFphcGlzeSA9PT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBvcHQuYWt0dWFsaXpvdmF0WmFwaXN5O1xyXG4gICAgICAgIG9wdC5oYXJkTG9hZCA9IHR5cGVvZiBvcHQuaGFyZExvYWQgPT09IFwidW5kZWZpbmVkXCIgPyBmYWxzZSA6IG9wdC5oYXJkTG9hZDtcclxuICAgICAgICBvcHQubmVlZFJlZnJlc2hTZXpuYW0gPSB0eXBlb2Ygb3B0Lm5lZWRSZWZyZXNoU2V6bmFtID09PSBcInVuZGVmaW5lZFwiID8gZmFsc2UgOiBvcHQubmVlZFJlZnJlc2hTZXpuYW07XHJcbiAgICAgICAgb3B0Lm5lZWRSZWZyZXNoRGV0YWlsID0gdHlwZW9mIG9wdC5uZWVkUmVmcmVzaERldGFpbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBvcHQubmVlZFJlZnJlc2hEZXRhaWw7XHJcbiAgICAgICAgb3B0LmZpbGxGb3JtID0gdHlwZW9mIG9wdC5maWxsRm9ybSA9PT0gXCJ1bmRlZmluZWRcIiA/IGZhbHNlIDogb3B0LmZpbGxGb3JtO1xyXG4gICAgICAgIG9wdC5zY2h2YWxQcm9jZXMgPSB0eXBlb2Ygb3B0LnNjaHZhbFByb2NlcyA9PT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBvcHQuc2NodmFsUHJvY2VzO1xyXG4gICAgICAgIHJldHVybiBSZWZyZXNoQWZ0ZXJBY3Rpb24ob3B0LmNvbnRlbnQsIG9wdC5ha3R1YWxpem92YXRaYXBpc3ksIG9wdC5oYXJkTG9hZCwgb3B0Lm5lZWRSZWZyZXNoU2V6bmFtLCBvcHQubmVlZFJlZnJlc2hEZXRhaWwsIG9wdC5maWxsRm9ybSwgb3B0LnNjaHZhbFByb2Nlcyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFrdHVsYWl6YWNlIGRldGFpbHUgcHJvIHVrb25jZW5pIGFrY2VcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZWZyZXNoQWZ0ZXJBY3Rpb24oY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCBha3R1YWxpem92YXRaYXBpc3k6IGJvb2xlYW4gPSB0cnVlLCBoYXJkTG9hZDogYm9vbGVhbiA9IGZhbHNlLCBuZWVkUmVmcmVzaFNlem5hbTogYm9vbGVhbiA9IGZhbHNlLCBuZWVkUmVmcmVzaERldGFpbDogYm9vbGVhbiA9IHRydWUsIGZpbGxGb3JtOiBib29sZWFuID0gZmFsc2UsIHNjaHZhbFByb2NlczogYm9vbGVhbiA9IHRydWUpOiBKUXVlcnlQcm9taXNlPGFueT4gIHtcclxuICAgICAgICAvLyByb3pob2RudXRpLCB6ZGEgamUgcG90cmViYSBuYWNpc3QgY2VseSBkZXRhaWwgem5vdnVcclxuICAgICAgICAvL1R5cGVHdWFyZHMuaGFzRnVuY3Rpb24oY29udGVudCwgJ3Byb2ZpbERva3VtZW50RWtvQ29tcG9uZW50SGFzQ2hhbmdlZCcpO1xyXG4gICAgICAgIGlmICgnZGVzY1Byb3BzX3NldHVwJyBpbiBjb250ZW50KSBjb250ZW50LmRlc2NQcm9wc19zZXR1cCh7IHJlYWRPbmx5OiB0cnVlIH0pO1xyXG5cclxuICAgICAgICBoYXJkTG9hZCA9IGhhcmRMb2FkIHx8ICEoJ3NhdmVFa29Qcm9maWwnIGluIGNvbnRlbnQpIHx8IGNvbnRlbnQucHJvZmlsRG9rdW1lbnRFa29Db21wb25lbnRIYXNDaGFuZ2VkKCk7XHJcbiAgICAgICAgaWYgKG5lZWRSZWZyZXNoU2V6bmFtKSBcclxuICAgICAgICAgICAgYWRkRG9jVG9SZWZyZXNoKGNvbnRlbnQuSXhwKTsgICAgICAgIFxyXG5cclxuICAgICAgICBpZiAoaGFyZExvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlZnJlc2hEZXRhaWwoY29udGVudClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNjaHZhbFByb2Nlcykge1xyXG4gICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzY2h2YWxvdmFjaWhvIHByb2Nlc3VcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKGNvbnRlbnQuR2xvYmFscy5QYXJhbXM/LlBvZHBvcmFTY2h2YWxvdmFjaWhvUHJvY2VzdUdJTiAmJiBjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5Qb2Rwb3JhU2NodmFsb3ZhY2lob1Byb2Nlc3VVQ1QpXHJcbiAgICAgICAgICAgICAgICB8fFxyXG4gICAgICAgICAgICAgICAgKGNvbnRlbnQuR2xvYmFscy5QYXJhbXM/LlBvZHBvcmFTY2h2YWxvdmFjaWhvUHJvY2VzdUdJTiAmJiAoY29udGVudC5HbG9iYWxzLlBhcmFtcz8uUG92b2xlbmlGaW5hbmNuaUtvbnRyb2x5ISA+IDAgfHwgY29udGVudC5HbG9iYWxzLlBhcmFtcz8uUG92b2xlbmlVY2V0bmlLb250cm9seSkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVrb1NjaHZhbENudCA9ICQuY29udGVudChjb250ZW50LmZpbmQoXCJbZGF0YS1wYXJhbS1pZD0ndGFiRWtvU2NodmFsb3ZhbmknXVwiKSkgYXMgR29yZGljLkVrby5XZWJDbGllbnQuR0Vrb1NjaHZhbG92YWNpUHJvY2VzU2V6bmFtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBla29TY2h2YWxDbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb3ZvbGVuaSB6YXVjdG92YXRcclxuICAgICAgICAgICAgICAgICAgICAvLyA3LjguMjAyNSBUSzogcG92b2xlbmkgRklLIGEgVUsgaml6IHByZWQgc2NodmFsZW5pbVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmFibGVaYXVjdG92YW5pID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMuUGVybWlzc2lvbnNIbGF2aWNrYS5Qb3ZvbGVuaVByb3VjdG92YXQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uSXNFdmlkb3ZhbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIChjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LklzTmF2cmhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LlN0YXZEb2tsYWR1ID09IEVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuTmV6YXVjdG92YW5vKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEVuYWJsZWRQb2RhbmlGayA9IGVuYWJsZVphdWN0b3ZhbmkgJiYgIWNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uSXNaYXVjdG92YW55ICYmIGNvbnRlbnQuR2xvYmFscy5QYXJhbXM/LlBvdm9sZW5pRmluYW5jbmlLb250cm9seSEgPiAwOyAvL3Bvdm9sdWplIHBvZGFuw60gRksg4oCmIG11c8OtIGLDvXQgZXhwbGljaXRuxJsgdHJ1ZSwgYWJ5IGJ5bG8gcG92b2xlbm9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgRW5hYmxlZFBvZGFuaVVrID0gZW5hYmxlWmF1Y3RvdmFuaSAmJiBjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5Qb3ZvbGVuaVVjZXRuaUtvbnRyb2x5ICYmICFjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LklzWmF1Y3RvdmFueTsgLy9wb3ZvbHVqZSBwb2RhbsOtIFVLIOKApiBtdXPDrSBiw710IGV4cGxpY2l0bsSbIHRydWUsIGFieSBieWxvIHBvdm9sZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEVuYWJsZWRTdG9ybm9WeXJpekZrID0gZW5hYmxlWmF1Y3RvdmFuaSAmJiAhY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5Jc1phdWN0b3Zhbnk7IC8vcG92b2x1amUgc3Rvcm5vIHZ5xZlpemVuw60gRksg4oCmIG11c8OtIGLDvXQgZXhwbGljaXRuxJsgdHJ1ZSwgYWJ5IGJ5bG8gcG92b2xlbm9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgRW5hYmxlZFN0b3Jub1Z5cml6VWsgPSBlbmFibGVaYXVjdG92YW5pICYmICFjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LklzWmF1Y3RvdmFueTsgLy9wb3ZvbHVqZSBzdG9ybm8gdnnFmWl6ZW7DrSBVSyDigKYgbXVzw60gYsO9dCBleHBsaWNpdG7EmyB0cnVlLCBhYnkgYnlsbyBwb3ZvbGVub1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBFbmFibGVkVGlza0ZrID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMuUGVybWlzc2lvbnNIbGF2aWNrYS5Qb3ZvbGVuaVByb3VjdG92YXQudmFsdWU7IC8vIHBvdm9sdWplIGdlbmVyb3bDoW7DrSBlbGVrdHJvbmlja8OpaG8gb2JyYXp1IOKApiBtdXPDrSBiw710IGV4cGxpY2l0bsSbIGZhbHNlLCBhYnkgYnlsbyBwb3ZvbGVub1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBFbmFibGVkVGlza1VrID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMuUGVybWlzc2lvbnNIbGF2aWNrYS5Qb3ZvbGVuaVByb3VjdG92YXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuY2hhbmdlRWtvU2NodmFsRmtTZXpuYW1FbmFibGVkKGNvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRW5hYmxlZFBvZGFuaUZrOiBFbmFibGVkUG9kYW5pRmssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVuYWJsZWRQb2RhbmlVazogRW5hYmxlZFBvZGFuaVVrISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRW5hYmxlZFN0b3Jub1Z5cml6Rms6IEVuYWJsZWRTdG9ybm9WeXJpekZrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbmFibGVkU3Rvcm5vVnlyaXpVazogRW5hYmxlZFN0b3Jub1Z5cml6VWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVuYWJsZWRUaXNrRms6IEVuYWJsZWRUaXNrRmssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVuYWJsZWRUaXNrVWs6IEVuYWJsZWRUaXNrVWtcclxuICAgICAgICAgICAgICAgICAgICB9LCBla29TY2h2YWxDbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChha3R1YWxpem92YXRaYXBpc3kpXHJcbiAgICAgICAgICAgIEFrdHVhbGl6YWNlWmFwaXN1KGNvbnRlbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkZWYgPSBmaWxsRm9ybSA/IGZpbGxGb3Jtcyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgOiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKVxyXG4gICAgICAgIC8vUmVmcmVzaE1lbnUoY29udGVudCk7XHJcbiAgICAgICAgcmV0dXJuIG5lZWRSZWZyZXNoRGV0YWlsID8gZGVmLnRoZW4oKCkgPT5cclxuICAgICAgICAgICAgICAgIHJlZnJlc2hEZXRhaWwuY2FsbChjb250ZW50KSlcclxuICAgICAgICAgICAgICAgIDogZGVmO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogWnByYXZ5LCBrdHJlcmUgamUgcG90cmViYSB6cHJhY292YXQgcnVjbmUgcHJpIHByb3VjdG92YW5pXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtFa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2V9IG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSB7YW55fSBkZWZmZXJcclxuICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPGFueT59XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEV4dGVuZENvbmRpdGlvbnNQcm91Y3RvdmF0KGNvbnRlbnQ6IEdDb250ZW50LCBtZXNzYWdlOiBFa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UsIG9iamVjdD86IG9iamVjdCk6IEpRdWVyeVByb21pc2U8R29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZT4ge1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBpZiAobWVzc2FnZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZFxyXG4gICAgICAgICAgICAmJiBtZXNzYWdlLlR5cGVNZXNzYWdlID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuTWVzc2FnZSA9PT0gXCJTVEFWXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFByb3ZlZGVuaSB6bWVueSBzdGF2dSB6YXVjdG92YW5pIHByaW1hcm5paG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIERvdGF6TmFabWVudVByaW1Eb2tsYWR1KGNvbnRlbnQsIG1lc3NhZ2UuUG9sZVBhcmFtIVswXSBhcyBhbnkgYXMgbnVtYmVyLCBtZXNzYWdlLlBvbGVQYXJhbSFbMV0gYXMgYW55IGFzIG51bWJlciwgbWVzc2FnZS5Qb2xlUGFyYW0hWzJdIGFzIGFueSBhcyBzdHJpbmcsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh6YXVjdG92YW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChtZXNzYWdlIS5OYXN0YXZlbmkgYXMgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFphdWN0b3ZhdE5hc3RhdmVuaUR0bykuU3RhdlphdWN0b3ZhbmlQcmltRG9rbGFkdSA9IHphdWN0b3Zhbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6YXVjdG92YW5pID09PSAtMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLlJlc3VsdCA9IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5SZXN1bHQgPSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5yZXNvbHZlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5NZXNzYWdlID09PSBcIlVIUlwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBabWVuYSB1aHJhZHkgcHJpbWFybmlobyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRG90YXpOYVptZW51UHJpbURva2xhZHUoY29udGVudCwgbWVzc2FnZS5Qb2xlUGFyYW0hWzBdIGFzIGFueSBhcyBudW1iZXIsIG1lc3NhZ2UuUG9sZVBhcmFtIVswXSBhcyBhbnkgYXMgbnVtYmVyLCBtZXNzYWdlLlBvbGVQYXJhbSFbMV0gYXMgYW55IGFzIHN0cmluZywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodWhyYWRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChtZXNzYWdlIS5OYXN0YXZlbmkgYXMgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFphdWN0b3ZhdE5hc3RhdmVuaUR0bykuU3RhdlVocmFkeVByaW1Eb2tsYWR1ID0gdWhyYWRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodWhyYWRhID09PSAtMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLlJlc3VsdCA9IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5SZXN1bHQgPSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5yZXNvbHZlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZS5SZXN1bHQgPSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3I7XHJcbiAgICAgICAgLy9sZXQgZGVmZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShtZXNzYWdlKS5wcm9taXNlKCk7XHJcbiAgICB9XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gUHJvdWN0b3ZhbmkgZG9rbGFkdVxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQcm91Y3RvdmFuaURva2xhZHUoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCB2c3R1cD86IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3REb2tsYWRaYXVjdG92YXRSZXF1ZXN0RHRvKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgY29udGVudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzNThcIik7IC8vUkMgMzAyNTAzNTggOiBQcm9iw61ow6EgemHDusSNdG92w6Fuw61cclxuICAgICAgICBpZiAodHlwZW9mIHZzdHVwID09PSBcInVuZGVmaW5lZFwiKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZzdHVwID0ge1xyXG4gICAgICAgICAgICAgICAgSWRNZXNzYWdlOiBcIlwiLCBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCwgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLnphdWN0b3ZhdCh2c3R1cClcclxuICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9SZWZyZXNoQWZ0ZXJBY3Rpb24oY29udGVudCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBlcm1pc3Npb25zID0gcmVzdWx0LnJlc3VsdC5kYXRhLkRva2xhZFBlcm1pc3Npb25zITtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUgPSByZXN1bHQucmVzdWx0LmRhdGEuSGxhdmlja2E7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uWmFwaXN5ID0gcmVzdWx0LnJlc3VsdC5kYXRhLlphcGlzeTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5TdGF2RG9rbGFkdTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2VHh0ID0gcmVzdWx0LnJlc3VsdC5kYXRhLlN0YXZUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uRGF0dW1abWVueSA9IHJlc3VsdC5yZXN1bHQuZGF0YS5EYXR1bVptZW55O1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlZnJlc2hBZnRlckFjdGlvbihjb250ZW50LCB0cnVlLCBmYWxzZSwgdHJ1ZSxmYWxzZSx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLy8vIG9iY2Vyc3R2ZW5pIHNlem5hbXUgbmEgcG96YWRpICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2FkZERvY1RvUmVmcmVzaChjb250ZW50Lkl4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gUmVmcmVzaERldGFpbChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkgXHJcbiAgICAgICAgICAgIC5jYXRjaCgob2JqRXJyb3I6IEVycm9yKSA9PlxyXG4gICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkV4Y2VwdGlvblByb2Nlc3Npbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsIGVycm9PYmplY3Q6IG9iakVycm9yLCBleHRlcm5Qcm9jZXNzZWQ6IEV4dGVuZENvbmRpdGlvbnNQcm91Y3RvdmF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm91Y3RvdmFuaURva2xhZHUoY29udGVudCwgdnN0dXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBWeXR2b3JlbmkgcHJlZGtvbnRhY2UgemUgemFwaXN1XHJcbiAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICogQHBhcmFtIHZzZWNobnlSYWRreVxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUHJlZGtvbnRhY2VaZVphcGlzdShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIHZzZWNobnlSYWRreTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGxldCByb3dzRHRvO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZFJvd3NEdG87XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh2c2VjaG55UmFka3kpIHtcclxuICAgICAgICAgICAgcm93c0R0byA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRBbGxSb3dzKGdyaWQpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFJvd3NEdG8gPSByb3dzRHRvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcm93c0R0byA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRBbGxSb3dzKGdyaWQpOy8vR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLk96bmFjZW5lUmFka3koY29udGVudC5HZXRHcmlkKHRoYXQpKTtcclxuICAgICAgICAgICAgc2VsZWN0ZWRSb3dzRHRvID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzKEdldEdyaWQoY29udGVudCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGVudC5uYXZpZ2F0ZShcIkdvcmRpYy5Fa28uV2ViQ2xpZW50LkdEZXRhaWxQcmVka29udGFjZVwiLCB7XHJcbiAgICAgICAgICAgIEl4cDogbnVsbFxyXG4gICAgICAgICAgICAsIGlkOiBcInh4eERldGFpbFByZWRrb250YWNlXCJcclxuICAgICAgICAgICAgLCBNb2RlRGV0YWlsOiBHb3JkaWMuRWtvLldlYkNsaWVudC5VY3RSb3ouRW51bXMuTW9kZURldGFpbC5QcmV2b2RaYXBpc3VcclxuICAgICAgICAgICAgLCBTb3VyY2VSZWNvcmRzOiByb3dzRHRvXHJcbiAgICAgICAgICAgICwgRW5hYmxlU21sb3V2YTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMuUGVybWlzc2lvbnNaYXBpcy5Qb3ZvbGVuaVNtbG91dnk/LnZpc2libGUgPz8gZmFsc2VcclxuICAgICAgICAgICAgLCBTZWxlY3RlZFJlY29yZHM6IHNlbGVjdGVkUm93c0R0b1xyXG4gICAgICAgICAgICAsIFR5cEFnOiA0MFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyEucmV0dXJuVmFsdWUgJiYgcmVzIS5yZXR1cm5WYWx1ZS5yZWZyZXNoID09PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWxvYWQodGhhdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAgICogVnl0dm9yZW5pIHByZWRrb250YWNlIHplIHphcGlzdVxyXG4gICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAqIEBwYXJhbSB2c2VjaG55UmFka3lcclxuICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFpvYnJheml0VWN0ZW5rdShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IGl4c1VjdGVua3kgPSBjb250ZW50LlVjZXRuaURva2xhZER0bz8uSWRlbnRpZmlrYXRvclVjdGVua3k7XHJcbiAgICAgICAgaWYgKGl4c1VjdGVua3kpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5XZmwuRGlhbG9ncy5JeHNQcmlsb2h5RGlhbG9nKGNvbnRlbnQsIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2aXNpdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBXZmwuV2ViQ2xpZW50LkF0dGFjaG1lbnRzLkdJeHNBdHRhY2htZW50VmlzaXRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4czogY29udGVudC5JeHAsLy9peHNVY3Rlbmt5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZGVyVHlwZTpcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3RGaWxlRG93bmxvYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW86IG5ldyBXZmwuV2ViQ2xpZW50LkF0dGFjaG1lbnRzLkdJeHNBdHRhY2htZW50REFPKHsgaXhzOiBjb250ZW50Lkl4cCwgaXNsTmFtZTogXCJVY3RMb2FkQXR0YWNobWVudFNlcnZpY2VcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgIH0sIEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogS29waWUgZG9rbGFkdVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VaYXBpc3kgLSB0cnVlIGtvcGllIHNlIHphcGlzeVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gW3Nlam11dHlQaWREb2tsYWR1XVxyXG4gICAgICogQHBhcmFtIHthbnl9IFtkZWZmZXJdXHJcbiAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxhbnk+fVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gS29waWVEb2tsYWR1KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgc2VaYXBpc3k6IGJvb2xlYW4sIHNlam11dHlQaWREb2tsYWR1Pzogc3RyaW5nIHwgbnVsbCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgLy9pZiAoIHR5cGVvZiBzZWptdXR5UGlkRG9rbGFkdSA9PT0gXCJ1bmRlZmluZWRcIikgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDQ0OVwiKTsgLy9SQyAzMDI1MDQ0OSA6IFByb2LDrWjDoSBrb3BpZSBkb2tsYWR1XHJcblxyXG4gICAgICAgIC8vfSAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZC5rb3BpZURva2xhZHUoe1xyXG4gICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgUGlkRG9rbGFkdTogY29udGVudC5JeHAsIFNlam11dHlQaWREb2tsYWR1OiBzZWptdXR5UGlkRG9rbGFkdSwgS29waXJvdmF0WmFwaXN5OiBzZVphcGlzeVxyXG4gICAgICAgICAgICAgICAgLCBTZWpubW91dFN0aXRlazogRWtvLlV0aWxzLkdldEVrb1VzZXJTZXR0aW5nc1BpZFNlam11dGkoY29udGVudCwgY29udGVudC5HbG9iYWxzLlBhcmFtcz8uUG92b2xpdEdlbmVyb3ZhbmlQaWR1RG9rbGFkdSA/IFwiYW5vXCIgOiBcIm5lXCIgKSA9PT0gXCIxXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gb2JjZXJzdHZlbmkgc2V6bmFtdSBuYSBwb3phZGkgICAgICBcclxuICAgICAgICAgICAgICAgIGFkZERvY1RvUmVmcmVzaChyZXN1bHQucmVzdWx0LmRhdGEuUGlkRG9rbGFkdSk7XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5ab2JyYXpEZXRhaWxEbGVJWFAoeyBjb250ZW50OiBjb250ZW50LCBpeHA6IHJlc3VsdC5yZXN1bHQuZGF0YS5QaWREb2tsYWR1ISwgc2Ftb3N0YW5lT2tubzogZmFsc2UsIGVkaXRhY2U6IGZhbHNlLCBwb2xvemt5OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIC8vR29yZGljLlVjdC5XZWJDbGllbnQuWm9icmF6RGV0YWlsRGxlSVhQT2xkKGNvbnRlbnQsIHJlc3VsdC5yZXN1bHQuZGF0YS5QaWREb2tsYWR1IGFzIHN0cmluZywgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAsXHJcbiAgICAgICAgICAgIChvYmpFcnJvcjogRXJyb3IpID0+XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRXhjZXB0aW9uUHJvY2Vzc2luZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogY29udGVudCwgZXJyb09iamVjdDogb2JqRXJyb3IsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBLb3BpZURva2xhZHUoY29udGVudCwgc2VaYXBpc3ksIHNlam11dHlQaWREb2tsYWR1KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6aXQgZGlhbG9nIHphZGFuaSBwaWR1IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWm9icmF6VnliZXJQaWR1KGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gS29waWVEb2tsYWR1KGNvbnRlbnQsIHNlWmFwaXN5LCBwYXJhbSEuUGlkRG9rbGFkdSwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7IHRocm93IG5ldyBHRXJyb3IoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vZnVuY3Rpb24gKG9iakVycm9yOkVycm9yLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGxldCByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbk5ldyhjb250ZW50LCBvYmpFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PT0gRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vIHpvYnJheml0IGRpYWxvZyB6YWRhbmkgcGlkdSBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gWm9icmF6VnliZXJQaWR1KGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEtvcGllRG9rbGFkdShjb250ZW50LCBzZVphcGlzeSwgcGFyYW0hLlBpZERva2xhZHUsKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHsgdGhyb3cgR0Vycm9yOyB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiBLb3BpZURva2xhZHUoY29udGVudCwgc2VaYXBpc3ksIHNlam11dHlQaWREb2tsYWR1KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aHJvdyBHRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRocm93IEdFcnJvcjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aHJvdyBvYmpFcnJvcjtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBLb250cm9sYSBjaXNsYSBkb2tsYWR1XHJcbiAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgICAgKiBAcGFyYW0gZGVmXHJcbiAgICAgICAgKiBAcGFyYW0gaWRNZXNzYWdlXHJcbiAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gS29udHJvbGFDaXNsYURva2xhZHUoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCB2YWx1ZTogYW55LCAgaWRNZXNzYWdlPzogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAodHlwZW9mIGlkTWVzc2FnZSA9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICBpZE1lc3NhZ2UgPSBudWxsIGFzIGFueTtcclxuXHJcbiAgICAgICAgLy9pZiAoIWRlZiB8fCB0eXBlb2YgZGVmID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIC8vICAgIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAvLyB2eWJlcnUgZGF0YSB6IGhsYXZpY2t5XHJcbiAgICAgICAgbGV0IGR0b1NhdmVEYXRhOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVWN0c3BpZER0byA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSBhcyBhbnk7XHJcbiAgICAgICAgY29udGVudC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyLGZvcm1EZXRhaWxcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG9TYXZlRGF0YSlcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKCF2YWx1ZS5pc1JlY2VpcHQpXHJcbiAgICAgICAgICAgICAgICBkdG9TYXZlRGF0YSEuYWNfaXhlID0gXCIqXCIgKyB2YWx1ZS5zdWJyYWRhO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBkdG9TYXZlRGF0YSEuYWNfaXhlID0gdmFsdWUuc3VicmFkYS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3ZhciBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoY29udGVudC5ncGMsIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uaXhwX2RlbiBhcyBhbnkpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLmtvbnRyb2xhQ2lzbGFEb2tsYWR1KHsgaWRNZXNzYWdlOiBpZE1lc3NhZ2UgYXMgYW55LCBkYXRhSGxhdmlja3lEb2tsYWR1OiBkdG9TYXZlRGF0YSB9KVxyXG4gICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuX3ZhbGlkYXRhdGlvbk1zZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5fdmFsaWRhdGF0aW9uU3RhdGUgPSBcInZlcmlmaWVkXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAob2JqRXJyb3I6IEVycm9yKSA9PlxyXG4gICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkV4Y2VwdGlvblByb2Nlc3Npbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsIGVycm9PYmplY3Q6IG9iakVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIEtvbnRyb2xhQ2lzbGFEb2tsYWR1KGNvbnRlbnQsIHZhbHVlLCAgLyppZE1lc3NhZ2UqL3JldHVyblZhbHVlLklkTWVzc2FnZSBhcyBhbnkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLklkTWVzc2FnZSA9PSBcIjMwMTAwNDEzXCIgJiYgcmV0dXJuVmFsdWUuUG9sZVBhcmFtIS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2ssIGplbiBkYW0gbmF2cmhudXRlIGNpc2xvIGEgc3B1c3RpbSB6bm92dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuc3VicmFkYSA9IHBhcnNlSW50KHJldHVyblZhbHVlLlBvbGVQYXJhbSFbMF0gYXMgYW55IGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gS29udHJvbGFDaXNsYURva2xhZHUoY29udGVudCwgdmFsdWUsIGlkTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaHliYSAtIGtvbmVjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhbHVlLl92YWxpZGF0YXRpb25Nc2cgPSByZXR1cm5WYWx1ZS5NZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YWx1ZS5fdmFsaWRhdGF0aW9uU3RhdGUgPSBcIm5vbnZlcmlmaWVkXCI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL3ZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbihjb250ZW50LCBvYmosIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uTmV3KGNvbnRlbnQsIGpxWEhSKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCAvKjMwKi8pIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBudXRuZSBvcGFrb3ZhbmlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gS29udHJvbGFDaXNsYURva2xhZHUoY29udGVudCwgdmFsdWUsICAvKmlkTWVzc2FnZSovcmV0dXJuVmFsdWUuSWRNZXNzYWdlIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5JZE1lc3NhZ2UgPT0gXCIzMDEwMDQxM1wiICYmIHJldHVyblZhbHVlLlBvbGVQYXJhbSEubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2ssIGplbiBkYW0gbmF2cmhudXRlIGNpc2xvIGEgc3B1c3RpbSB6bm92dVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zdWJyYWRhID0gcGFyc2VJbnQocmV0dXJuVmFsdWUuUG9sZVBhcmFtIVswXSBhcyBhbnkgYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEtvbnRyb2xhQ2lzbGFEb2tsYWR1KGNvbnRlbnQsIHZhbHVlLCBpZE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2h5YmEgLSBrb25lY1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5fdmFsaWRhdGF0aW9uTXNnID0gcmV0dXJuVmFsdWUuTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuX3ZhbGlkYXRhdGlvblN0YXRlID0gXCJub252ZXJpZmllZFwiO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgR0Vycm9yO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRocm93IGpxWEhSO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICA7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgICAqIEF0cmlidXQgZWRpdGFjZSBkb2tsYWR1XHJcbiAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXNFZGl0TW9kZShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpIHtcclxuICAgICAgICAvL2lmICh0eXBlb2YgY29udGVudC5FZGl0YWNlSGxhdmlja3kgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnRlbnQuRWRpdGFjZVphcGlzdSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICByZXR1cm4gKGNvbnRlbnQuRWRpdGFjZUhsYXZpY2t5KXx8IGNvbnRlbnQuRWRpdGFjZVphcGlzdTtcclxuICAgICAgICAvL2Vsc2VcclxuICAgICAgICAvL3JldHVybiBmYWxzZTtcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEplIG1vem5vIGVkaXRvdmF0IHJhZGVrXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIElzQ2FuRWRpdFJvdyhjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpIHtcclxuXHJcbiAgICAgICAgaWYgKElzRWRpdE1vZGUoY29udGVudClcclxuICAgICAgICAgICAgfHwgKChjb250ZW50Lm5ld1Jvd1N0YXJ0ICYmICFjb250ZW50LlVjZXRuaURva2xhZER0by5QZXJtaXNzaW9ucy5QZXJtaXNzaW9uc1phcGlzPy5DYW5DcmVhdGUudmFsdWUpXHJcbiAgICAgICAgICAgICAgICB8fCAoIWNvbnRlbnQubmV3Um93U3RhcnQgJiYgIWNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBlcm1pc3Npb25zLlBlcm1pc3Npb25zWmFwaXM/LkNhbkVkaXQhLnZhbHVlKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vfHwgKChjb250ZW50Lm5ld1Jvd1N0YXJ0ICYmICFjb250ZW50LlVjZXRuaURva2xhZER0by4gUG92b2xlbmlOb3ZlaG9aYXBpc3UhLkVuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICAvLyAgIHx8ICghY29udGVudC5uZXdSb3dTdGFydCAmJiAhY29udGVudC5VY2V0bmlEb2tsYWREdG8uUG92b2xlbmlFZGl0YWNpWmFwaXN1IS5FbmFibGVkKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAgICogRm9ybXVsYSBwcm8gdnliZXIgc3RhdnUgcHJpbS4gZG9rbGFkdVxyXG4gICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAqIEBwYXJhbSBwcmVTZWxlY3RcclxuICAgICAgICAqIEBwYXJhbSBwdXZvZG5pU3RhdlxyXG4gICAgICAgICogQHBhcmFtIHBpZFByaW1cclxuICAgICAgICAqIEBwYXJhbSB1aHJhZGFcclxuICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIERvdGF6TmFabWVudVByaW1Eb2tsYWR1KGNvbnRlbnQ6IEdDb250ZW50LCBwcmVTZWxlY3Q6IG51bWJlciwgcHV2b2RuaVN0YXY6IG51bWJlciwgcGlkUHJpbTogc3RyaW5nLCB1aHJhZGEpOiBhbnkge1xyXG4gICAgICAgIC8vdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzdGF2eTtcclxuICAgICAgICBsZXQgdGl0bGU7XHJcbiAgICAgICAgbGV0IG9sZFN0YXYgPSBcIlwiO1xyXG4gICAgICAgIGxldCBpZFN0YXYgPSAwO1xyXG4gICAgICAgIGlmIChwdXZvZG5pU3RhdiA9PSAxMClcclxuICAgICAgICAgICAgaWRTdGF2ID0gMTtcclxuICAgICAgICBlbHNlIGlmIChwdXZvZG5pU3RhdiA9PSAyMClcclxuICAgICAgICAgICAgaWRTdGF2ID0gMjtcclxuICAgICAgICBpZiAodWhyYWRhKSB7XHJcbiAgICAgICAgICAgIHN0YXZ5ID0gW1wianJlczozMDI1MDEyM1wiIC8vUkMgMzAyNTAxMjMgOiBOZXVocmF6ZW5vXHJcbiAgICAgICAgICAgICAgICAsIFwianJlczozMDI1MDEyNFwiIC8vUkMgMzAyNTAxMjQgOiBVaHJhemVubyDEjcOhc3RlxI1uxJtcclxuICAgICAgICAgICAgICAgICwgXCJqcmVzOjMwMjUwMTI1XCJdOyAvL1JDIDMwMjUwMTI1IDogVWhyYXplbm9cclxuICAgICAgICAgICAgdGl0bGUgPSBcImpyZXM6MzAyNTAxMjJcIjsgLy9SQyAzMDI1MDEyMiA6IFZ5YmVydGUgc3RhdiDDumhyYWR5IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgIG9sZFN0YXYgPSBcImpyZXM6MzAyNTAxMjlcIiArIFwiIFwiICsgcGlkUHJpbSArIFwiOiBcIiArIHN0YXZ5W2lkU3Rhdl07IC8vUkMgMzAyNTAxMjkgOiBQxa92b2Ruw60gc3RhdiB6YcO6xI10b3bDoW7DrSBwcmltw6FybsOtaG8gZG9rbGFkdVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3RhdnkgPSBbXCJqcmVzOjMwMjUwMTI2XCIgLy9SQyAzMDI1MDEyNiA6IE5lemHDusSNdG92w6Fub1xyXG4gICAgICAgICAgICAgICAgLCBcImpyZXM6MzAyNTAxMjdcIiAvL1JDIDMwMjUwMTI3IDogWmHDusSNdG92w6FubyDEjcOhc3RlxI1uxJtcclxuICAgICAgICAgICAgICAgICwgXCJqcmVzOjMwMjUwMTI4XCJdOyAvL1JDIDMwMjUwMTI4IDogWmHDusSNdG92w6Fub1xyXG4gICAgICAgICAgICB0aXRsZSA9IFwianJlczozMDI1MDEyMVwiOyAvL1JDIDMwMjUwMTIxIDogVnliZXJ0ZSBzdGF2IHphw7rEjXRvdsOhbsOtIHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgIG9sZFN0YXYgPSBcImpyZXM6MzAyNTAxMjlcIiArIFwiIFwiICsgcGlkUHJpbSArIFwiOiBcIiArIHN0YXZ5W2lkU3Rhdl07IC8vUkMgMzAyNTAxMjkgOiBQxa92b2Ruw60gc3RhdiB6YcO6xI10b3bDoW7DrSBwcmltw6FybsOtaG8gZG9rbGFkdVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMSwgTC0xMi0xMi0wLCBNLTEyLTEyLTAsIFMtMTItMTItMFwiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZaYXVjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBwcmVTZWxlY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pdGVtQ2xhc3M6IFwidy0zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiBzdGF2eVswXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxMCwgbGFiZWw6IHN0YXZ5WzFdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDIwLCBsYWJlbDogc3RhdnlbMl0gfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9KS8vUMWvdm9kbsOtIHN0YXYgemHDusSNdG92w6Fuw60gcHJpbcOhcm7DrWhvIGRva2xhZHVcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oKS5hZGRSb3coKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogb2xkU3RhdlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8uYWRkUm93SGVhZGVyKFwiUMWvdm9kbsOtIHN0YXYgemHDusSNdG92w6Fuw60gcHJpbcOhcm7DrWhvIGRva2xhZHU6XCIgKyBzdGF2eVtpZFN0YXZdKVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IHNpbXBsZUZvcm0gPSBjb250ZW50LmRpYWxvZ3Muc2ltcGxlRm9ybSh0aXRsZSwgZm9ybSwge30sICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA1MDAsIGhlaWdodDogMjMwLFxyXG4gICAgICAgICAgICBjb21tYW5kQmFyOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPa1wiLCBjYXB0aW9uOiBHRGxnLm1iYk9rLnRleHQsIGljb246IFwiZ2ktdGlja1wiLCBydW46IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgZGxnID0gc2ltcGxlRm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkbGc6IFwiLCBkbGcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpbXBsZUZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIsIHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSAvKmRhdGEgfHwqLyB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaW1wbGVGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2ltcGxlRm9ybS5nY29udGVudCgpLmNsb3NlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnJ1c2l0XCIsIGNhcHRpb246IEdEbGcubWJiQ2FuY2VsLnRleHQsIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBkbGcgPSBzaW1wbGVGb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2ltcGxlRm9ybS5nY29udGVudCgpLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5vbih7XHJcbiAgICAgICAgICAgICAgICAvKm9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCQuY29udGVudCh0aGlzKS5maW5kRmllbGRzKFwic3RhdlphdWNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpO1xyXG4gICAgICAgICAgICAgICAgfSwqL1xyXG4gICAgICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIChldiwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoZGF0YS5zdGF2WmF1Yyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoLTEwKTtcclxuICAgICAgICAgICAgICAgIH0gICAvL2J1ZGUtbGkgZGlhbG9nIHphdnJlbiBwcmVkIHVkYWxvc3RpICdvaycsIGRvamRlIGtlIHpydXNlbmkgZ2VuZXJvdmFuaVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBOb3Z5IHphcGlzXHJcbiAgICAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIE5vdnlaYXBpcyhjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIHJvd0RlZmF1bHQ/OiBJbnRlcmZhY2UuR1VjdGRwZXBEdG8pOiBKUXVlcnlQcm9taXNlPEludGVyZmFjZS5HVWN0ZHBlcER0bz4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLklzTXVzaU5hdmF6YXQpIHtcclxuICAgICAgICAgICAgVmF6YnlEb2tsYWR1KGNvbnRlbnQsIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICByZXR1cm4gZGVmLnRoZW4oICgpPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld1JvdzogSW50ZXJmYWNlLkdVY3RkcGVwRHRvID0ge307XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocm93RGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgbmV3Um93LCByb3dEZWZhdWx0KVxyXG4gICAgICAgICAgICAgICAgLy9uZXdSb3cgPSByb3dEZWZhdWx0Oy8ve307XHJcbiAgICAgICAgICAgICAgICAvL25ld1Jvdy5peHAgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy9uZXdSb3cucm9rID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5yb2s7XHJcbiAgICAgICAgICAgICAgICAvL25ld1Jvdy5hYyA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uYWM7XHJcbiAgICAgICAgICAgICAgICAvL25ld1Jvdy5tZXNpYyA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8ubWVzaWM7XHJcbiAgICAgICAgICAgICAgICAvL25ld1Jvdy5kZW4gPSBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmRlbjtcclxuICAgICAgICAgICAgICAgIC8vbmV3Um93LnR5cF9hZyA9IDQwO1xyXG4gICAgICAgICAgICAgICAgLy9uZXdSb3cuZHJkID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5kcmQ7XHJcbiAgICAgICAgICAgICAgICAvL25ld1Jvdy56ZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAvL25ld1Jvdy5hY19peGUgPSBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmFjX2l4ZTtcclxuICAgICAgICAgICAgICAgIC8vbmV3Um93LmxpYyA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8ubGljO1xyXG4gICAgICAgICAgICAgICAgLy9uZXdSb3cuYWt0aXZpdGEgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAvL25ld1Jvdy5yYWRla196ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAvL25ld1Jvdy51cF9zdGF2ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdSb3cgPSAkLmV4dGVuZCh0cnVlLCBuZXdSb3csIHtcclxuICAgICAgICAgICAgICAgIGl4cDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJvazogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5yb2ssXHJcbiAgICAgICAgICAgICAgICBhYzogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5hYyxcclxuICAgICAgICAgICAgICAgIG1lc2ljOiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/Lm1lc2ljLFxyXG4gICAgICAgICAgICAgICAgZGVuOiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmRlbixcclxuICAgICAgICAgICAgICAgIHR5cF9hZzogNDAsXHJcbiAgICAgICAgICAgICAgICBpY286IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LklDTyxcclxuICAgICAgICAgICAgICAgIHVjczogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py51Y3MsXHJcbiAgICAgICAgICAgICAgICBkcmQ6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uZHJkLFxyXG4gICAgICAgICAgICAgICAgemQ6IDAsXHJcbiAgICAgICAgICAgICAgICBua3M6IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/Lk5LUyxcclxuICAgICAgICAgICAgICAgIGFjX2l4ZTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5hY19peGUsXHJcbiAgICAgICAgICAgICAgICB1dXM6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8udXVzLFxyXG4gICAgICAgICAgICAgICAgbGljOiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmxpYyxcclxuICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICByYWRla196OiAtMSxcclxuICAgICAgICAgICAgICAgIHVwX3N0YXY6IDBcclxuICAgICAgICAgICAgfSApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgY29udGVudC5uZXdSb3dTdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIGdyaWQuZ2dyaWRyb3dlZGl0b3IoXCJhZGRSb3dcIiwgbmV3Um93KTtcclxuICAgICAgICAgICAgc2V0U3RhdHVzKGNvbnRlbnQsIFwiXCIpO1xyXG4gICAgICAgICAgICAvLyB6cHJpc3R1cG5lbmkgYWtjZSB0ZXh0dSB6IHJvenZyaHVcclxuICAgICAgICAgICAgY29udGVudC5hY3Rpb25zLmFjdFBvbG96a3lUZXh0eVpSb3p2cmh1Py51cGRhdGUoeyBlbmFibGVkOiB0cnVlLCB0b29sdGlwOiBcIlwiIH0pOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUobmV3Um93KS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgKiAgQXRyaWJ1dCBub3ZlaG8gcmFka3VcclxuICAgICAgICAqIEBwYXJhbSByYWRla1xyXG4gICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIElzTmV3Um93KHJhZGVrOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gcmFkZWsuaXhwID09IG51bGwgfHwgcmFkZWsuaXhwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVsb3ppdCB6YXBpc1xyXG4gICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmFkZWtcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFVsb3ppdFJhZGVrKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgcmFkZWs6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvICYgeyBndWlkPzogc3RyaW5nIH0pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmIChjb250ZW50LlNhdmluZ1JvdylcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgbGV0IHZzdHVwOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmFwaXNVbG96UmVxdWVzdER0byA9IHtcclxuICAgICAgICAgICAgSWRNZXNzYWdlOiBcIlwiLCBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCwgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmFcclxuICAgICAgICAgICAgLCBaYXBpczogcmFkZWtcclxuICAgICAgICAgICAgLy8gUG92b2xlbmkgbnVsb3Z5Y2ggaGRvbm90IGRsZSBwYXJhbWV0cnVcclxuICAgICAgICAgICAgLCBLb250cm9sYU51bG92eWNoSG9kbm90OiAhKHR5cGVvZiByYWRlay5yYWRla196ID09IFwidW5kZWZpbmVkXCIgJiYgLy8gdG90byB1cmN1amUsIHplIHNlIGplZG5hIG8gcHJlZGtvbnRhY2kgKGJvaHV6ZWwgdG8gbXV6ZSBieXQgaSBpbXBvcnQgZG8gcG9yaXpvdmFjZSlcclxuICAgICAgICAgICAgICAgIChjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5Qb3ZvbGVuaU51bFZQcmVka29udGFjaSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVBvdm9sZW5pTnVsVlByZWRrb250YWNlLlBvdm9sZW5vIC8vIHBvdm9sZW5vXHJcbiAgICAgICAgICAgICAgICB8fCAoY29udGVudC5HbG9iYWxzLlBhcmFtcz8uUG92b2xlbmlOdWxWUHJlZGtvbnRhY2kgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VQb3ZvbGVuaU51bFZQcmVka29udGFjZS5EbGVVeml2TmFzdGF2ZW5pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGxlIHV6aXZhdGVsc2tlaG8gbmFzdGF2ZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjb250ZW50IS5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLlVjdC5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uUHJlZGtvbnRhY2VOdWx5XCIpID8/IGZhbHNlIGFzIGJvb2xlYW4pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFVsb3ppdFJhZGVrRG9rbGFkdShjb250ZW50LCB2c3R1cCk7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBa2NuaSBtZXRvZGEgdWtsYWRhbmkgcmFka3VcclxuICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmFwaXNVbG96UmVxdWVzdER0b30gdnN0dXBcclxuICAgICAqIEBwYXJhbSB7YW55fSBkZWZlcnJlcj9cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFVsb3ppdFJhZGVrRG9rbGFkdShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIHZzdHVwOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmFwaXNVbG96UmVxdWVzdER0bywgZGVmZXJyZXI/OiBKUXVlcnkuRGVmZXJyZWQ8YW55Pik6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29udGVudC5TYXZpbmdSb3cgPSB0cnVlO1xyXG4gICAgICAgIGxldCBndWlkOiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHJvdzogbnVtYmVyO1xyXG4gICAgICAgIGNvbnRlbnQuYWN0aW9ucy5hY3RQb2xvemt5VWxveml0Py51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICBjb250ZW50LmFjdGlvbnMuYWN0UG9sb3preVpydXNpdD8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkZWZlcnJlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgLy8gcG91emUgcHJpIHJ1Y25pbSB1a2xhZGFuaSA/Pz9cclxuICAgICAgICAgICAgLy9pZiAodHlwZW9mIHZzdHVwLlphcGlzPy5yYWRla196IT09XCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdCBwcm8gcHJlZGtvbnRhY2UsIGtkeSBzZSBuZWJ1ZGUgem9icmF6b3ZhdCBwcm9ncmVzc1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250ZW50LmlzUnVubmlnUHJlZGtvbnRhY2UoKSlcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMzYzXCIpOyAvL1JDIDMwMjUwMzYzIDogUHJvYsOtaMOhIHVrbMOhZMOhbsOtIHrDoXBpc3UgXHJcbiAgICAgICAgICAgIGd1aWQgPSAodnN0dXAuWmFwaXMgYXMgKEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvICYgeyBndWlkPzogc3RyaW5nLCByb3c/OiBudW1iZXIgfSkpPy5ndWlkID8/IFwiXCI7XHJcbiAgICAgICAgICAgIHJvdyA9ICh2c3R1cC5aYXBpcyBhcyAoR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGRwZXBEdG8gJiB7IGd1aWQ/OiBzdHJpbmcsIHJvdz86IG51bWJlciB9KSk/LnJvdyA/PyAtMTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkWmFwaXMudXBzZXJ0KHZzdHVwKVxyXG4gICAgICAgICAgICAuZ2V0RGF0YSh2b2lkIDAsIHsgcHJvZ3Jlc3NTdGF0ZTpmYWxzZSwgfSlcclxuXHJcbiAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9kZWJlcnUgcG9jaXRhZGxvIHByZWRrb250YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuaXNSdW5uaWdQcmVka29udGFjZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnBvY2V0UmFka3VQcmVka29udGFjZS0tO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBwcmViZXJ1IGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmRhdF96bWVuYSA9IHJlc3VsdC5EYXR1bVptZW55O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuc196YXUgPSByZXN1bHQuU3RhdkRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9IHJlc3VsdC5TdGF2RG9rbGFkdTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlN0YXZUeHQgPSByZXN1bHQuU3RhdlR4dDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuRWRpdGFjZVphcGlzdSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaW5kZWRSb3cgPSBjb250ZW50LlVjZXRuaURva2xhZER0by5aYXBpc3k/LmZpbmQoKHJvdykgPT4gcm93LnJhZGVrX3ogPT0gcmVzdWx0LlphcGlzIS5yYWRla196KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluZGVkUm93KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5kZWRSb3cgPXJlc3VsdC5aYXBpcyE7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5aYXBpc3k/LnB1c2gocmVzdWx0LlphcGlzISlcclxuICAgICAgICAgICAgICAgICAgICAvL2ZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudC5VY2V0bmlEb2tsYWREdG8uWmFwaXN5IS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5aYXBpc3khW2ldLnJhZGVrX3ogPT0gcmVzdWx0LlphcGlzIS5yYWRla196KSB7IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeSFbaV0gPSByZXN1bHQuWmFwaXMgYXMgYW55OyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuU3RhdGVDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBlcm1pc3Npb25zID0gcmVzdWx0LkRva2xhZFBlcm1pc3Npb25zIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogTW96bmEgbmVidWRlIHRyZWJhLCBidWRlIHNlIHZvbGF0IHByaXN0dXBub3N0IHZlIHZvbGFqaWNpIGZ1bmtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWZyZXNoQWZ0ZXJBY3Rpb25OKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2h2YWxQcm9jZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0dWFsaXpvdmF0WmFwaXN5OmZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FkZERvY1RvUmVmcmVzaCggY29udGVudC5JeHApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2lmICghY29udGVudC5vdGV2cmVuaUJlelNlem5hbXUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlbG9hZFJvd0Zyb21EQihudWxsLCBjb250ZW50Lkl4cCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB6YXBpczogKEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvICYgeyBndWlkPzogc3RyaW5nLCByb3c/OiBudW1iZXIgfSkgPSByZXN1bHQuWmFwaXMgYXMgKEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvICYgeyBndWlkPzogc3RyaW5nLCByb3c/OiBudW1iZXIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgemFwaXMuZ3VpZCA9IGd1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgemFwaXMucm93ID0gcm93O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZShyZXN1bHQuWmFwaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLFxyXG5cclxuICAgICAgICAgICAgICAgIChqcVhIUiwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmFjdGlvbnMuYWN0UG9sb3preVVsb3ppdD8udXBkYXRlKHsgZW5hYmxlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmFjdGlvbnMuYWN0UG9sb3preVpydXNpdD8udXBkYXRlKHsgZW5hYmxlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGpxWEhSO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5TYXZpbmdSb3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFpydXNpdCBlZGl0YWNpIHphcGlzXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFpydXNpdEVkaXRhY2lSYWRrdShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpIHtcclxuICAgICAgICBjb25zdCBncmlkID0gR2V0R3JpZChjb250ZW50KTtcclxuICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChjb250ZW50LnByZUZpbGxJblByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIEdvcmRpYy5XaWRnZXQuR01hZ2ljUHJlRmlsbGVyLmNhbmNlbEFjdGlvbi5ydW4oeyBjZWxsSW5mbzogZ3JpZC5nZ3JpZChcImFjdGl2ZUNlbGxBZGRyZXNzXCIpIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZ3JpZC5nZ3JpZHJvd2VkaXRvcihcImNhbmNlbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gU3RhcnQgZWRpdGFjZSB6YXBpc3VcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gRWRpdGFjZVJhZGt1KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSkge1xyXG4gICAgICAgIGNvbnRlbnQubmV3Um93U3RhcnQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb3puYWNlbmVSYWRreSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93cyhHZXRHcmlkKGNvbnRlbnQpKTtcclxuICAgICAgICBpZiAoIW96bmFjZW5lUmFka3kgfHwgb3puYWNlbmVSYWRreS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxMzdcIiAvL1JDIDMwMjUwMTM3IDogSW5mb1xyXG4gICAgICAgICAgICAgICAgLCBcImpyZXM6MzAyNTAxNDFcIikgLy9SQyAzMDI1MDE0MSA6IE5lbmFsZXplbiDFmcOhZGVrIGsgZWRpdGFjaVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgZ3JpZC5nZ3JpZHJvd2VkaXRvcihcInN0YXJ0XCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9kc3RyYW5lbmkgemFwaXN1XHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBPZHN0cmFuaXRaYXBpcyhjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIGRhdGE/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkWmFwaXNWeW1hemF0UmVxdWVzdER0byk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBkYXRhID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBTZXpuYW06IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93cyhHZXRHcmlkKGNvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgLCBJZE1lc3NhZ2U6IFwiXCJcclxuICAgICAgICAgICAgICAgICwgUGlkRG9rbGFkdTogY29udGVudC5JeHBcclxuICAgICAgICAgICAgICAgICwgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29udGVudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzNDRcIik7IC8vUkMgMzAyNTAzNDQgOiBQcm9iw61ow6EgbWF6w6Fuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgLy9kZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLlNlem5hbSA9PSBudWxsIHx8IGRhdGEuU2V6bmFtPy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTM3XCIgLy9SQyAzMDI1MDEzNyA6IEluZm9cclxuICAgICAgICAgICAgICAgICwgXCJqcmVzOjMwMjUwMzQ1XCIgLy9SQyAzMDI1MDM0NSA6IE5ldnlicsOhbnkgxb7DoWRuw6kgesOhcGlzeVxyXG4gICAgICAgICAgICApOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZFphcGlzLmhyb21hZG5lT2RzdHJhbml0KGRhdGEpXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBvayAgLSBrb25lY1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBvY2V0IHptZW5lbnkgcmFka3UgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuUG9jZXRPdmxpdm5lbnljaFJhZGt1ISA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2aW0gZGF0dW0gem1lbnkgbmEgaGxhdmlja3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlYmVydSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuZGF0X3ptZW5hID0gcmVzdWx0LkRhdHVtWm1lbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuc196YXUgPSByZXN1bHQuU3RhdkRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uU3RhdkRva2xhZHUgPSByZXN1bHQuU3RhdkRva2xhZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlN0YXZUeHQgPSByZXN1bHQuU3RhdlR4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uWmFwaXN5ID0gcmVzdWx0LlphcGlzeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMgPSByZXN1bHQuRG9rbGFkUGVybWlzc2lvbnMgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVmcmVzaEFmdGVyQWN0aW9uKGNvbnRlbnQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZERvY1RvUmVmcmVzaChjb250ZW50Lkl4cCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAob2JqRXJyb3I6IEVycm9yKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5FeGNlcHRpb25Qcm9jZXNzaW5nKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogY29udGVudCwgZXJyb09iamVjdDogb2JqRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDM0NFwiKTsgLy9SQyAzMDI1MDM0NCA6IFByb2LDrWjDoSBtYXrDoW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbnV0bmUgb3Bha292YW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2RzdHJhbml0WmFwaXMoY29udGVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9mdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKHR5cGUgPT09IFwidmFsaWRhdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGxldCB0cmFuc01zZ1RzdCA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRUcmFuTWVzc2FnZShvYmopXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9sc2FueSBuZWpha3kgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHRyYW5zTXNnVHN0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IHRyYW5zTXNnID0gdHJhbnNNc2dUc3QgYXMgR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZVtdO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uWnByYWNvdmFuaVpwcmF2KGNvbnRlbnQsIHRyYW5zTXNnKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvLyBudXRuZSBvcGFrb3ZhbmlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2RzdHJhbml0WmFwaXMoY29udGVudCwgZGF0YSwgZGVmZXIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaHliYSwga29uZWNcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEdFcnJvcjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBHRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoeWJhIC0ga29uZWNcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhyb3cganFYSFI7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAvL3JldHVybiBkZWZlci5wcm9taXNlKCk7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWb3Jvdm5hbmlcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gY29sdW1uTmFtZVxyXG4gICAgICogQHBhcmFtIG5rc1xyXG4gICAgICogQHBhcmFtIHJhZGVrX3pcclxuICAgICAqIEBwYXJhbSBjMFxyXG4gICAgICogQHBhcmFtIGMxXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVnlyb3ZuYXRaYXBpc3koY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCBjb2x1bW5OYW1lOiBzdHJpbmcsIG5rczogc3RyaW5nLCByYWRla196OiBudW1iZXIsIGMwOiBKc29uRGVjaW1hbCwgYzE6IEpzb25EZWNpbWFsKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAkKFwiLmpzLU1EXCIpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmhhc0NsYXNzKFwidWktZGlzYWJsZWRcIilcclxuICAgICAgICBsZXQgcG9saWNrbyA9IChjb2x1bW5OYW1lID09PSBcImMwXCIgPyAkKFwiLmpzLU1EXCIpIDogJChcIi5qcy1EQUxcIikpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpO1xyXG4gICAgICAgIGlmIChwb2xpY2tvLmhhc0NsYXNzKFwidWktZGlzYWJsZWRcIikpXHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICBsZXQgcmFkZWs6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvO1xyXG4gICAgICAgIGxldCBycTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFphcGlzVnlyb3ZuYXRSZXF1ZXN0RHRvID0ge1xyXG4gICAgICAgICAgICBDb2x1bW5OYW1lOiBjb2x1bW5OYW1lXHJcbiAgICAgICAgICAgICwgUGlkRG9rbGFkdTogY29udGVudC5JeHBcclxuICAgICAgICAgICAgLCBua3M6IG5rc1xyXG4gICAgICAgICAgICAsIHJhZGVrX3o6IHJhZGVrX3pcclxuICAgICAgICAgICAgLCBjMDogYzBcclxuICAgICAgICAgICAgLCBjMTogYzFcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb250ZW50LmlzbC5VY3REb2tsYWRaYXBpcy52eXJvdm5hdFJhZGVrRG9rbGFkdSh7IHJxOiBycSB9KVxyXG4gICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4gcG9saWNrby5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXN1bHQuYylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICogUHJlZGtvbnRhY2VcclxuICAgICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUHJlZGtvbnRhY2UoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KSB7XHJcblxyXG4gICAgICAgIC8vY29udGVudC5kaWFsb2dzLmFsZXJ0KFwiVXBvem9ybsSbbsOtXCIsIFwiQWtjZSBzZSBqZSB2IHDFmcOtcHJhdsSbXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnRlbnQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coW0dvcmRpYy5Fa28uV2ViQ2xpZW50LkdWeWJlclByZWRrb250YWNlLCB7dWlkOlwiR1Z5YmVyUHJlZGtvbnRhY2UjXCJ9XSwge30sIFwianJlczozMDI1MDU5OVwiLCA4MDAsIDYwMCwgdHJ1ZSkgLy9SQyAzMDI1MDU5OSA6IFbDvWLEm3IgcMWZZWRrb250YWPDrVxyXG4gICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjdHggIT0gbnVsbCAmJiB0eXBlb2YgY3R4LnNlbGVjdGVkICE9PSBcInVuZGVmaW5lZFwiICYmIGN0eC5zZWxlY3RlZCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkludGVyZmFjZS5HVWN0Um96ZGtvbkR0b1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ciA9IHsgaXhzX2tvbjogY3R4LnNlbGVjdGVkIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuRWtvUHJla29udGFjZVNhYmxvbmFSYWRlay5saXN0KHsgdHlwQWc6IDQwLCBycTogeyBmaWx0ZXJzOiBmaWx0ciB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZpIHBvY2V0IHJhZGt1IHByZWRrb250YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnBvY2V0UmFka3VQcmVka29udGFjZSA9IHJlc3VsdC5kYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1blByZWRrb250YWNlKGNvbnRlbnQsIHJlc3VsdC5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBJbXBvcnQgemUgc2NocmFua3ksIHNvdWJvcnUgcHJpbW8gZG8gZGIgbmVibyBkbyBwb3Jpem92YWNreVxyXG4gICAgICAgICogQHBhcmFtIHtHVWN0RGV0YWlsdH0gY29udGVudFxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSW1wb3J0RGF0KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgdHlwSW1wb3J0dTogXCJJTVBDTElQXCIgfCBcIklNUEZJTEVcIiB8IFwiSU1QQ0xJUFBPTFwiIHwgXCJJTVBGSUxFUE9MXCIpIHtcclxuICAgICAgICBQcnV2b2RjZU9wZXJhY2UoY29udGVudCwgdHlwSW1wb3J0dSk7XHJcbiAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmlkaXRlbG5lIHNsb3VwY2UgbmEgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFZpZGl0ZWxuZVNsb3VwY2UoZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxhbnk+KTogR29yZGljLkVrby5JbnRlcmZhY2UuR1Zpc2libGVUYWJsZUNvbHVtbnNbXSB7XHJcbiAgICAgICAgbGV0IHZzdHVwOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVmlzaWJsZVRhYmxlQ29sdW1uc1tdID0gW107XHJcbiAgICAgICAgZ3JpZEZvcm1hdC5jb2x1bW5zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgdnN0dXAucHVzaCh7IEhlYWRlclRleHQ6IGl0ZW0uY2FwdGlvbiwgTmFtZTogaXRlbS5uYW1lIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB2c3R1cDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwdXN0ZW5pIHByZWRrb250YWNlXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHBhcmFtIGxpc3REYXRhRm9ySW1wb3J0IC0gc2V6bmFtIGRhdCBwcm8gaW1wb3J0XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBydW5QcmVka29udGFjZShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIGxpc3REYXRhRm9ySW1wb3J0OiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVWN0Um96ZGtvbkR0b1tdLCBkaXNhYmxlQmxpY2tpbmc6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWR7XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICBsZXQgblJTID0gY29udGVudC5uZXdSb3dTdGFydDtcclxuICAgICAgICBjb250ZW50Lm5ld1Jvd1N0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgY29udGVudC5wcmVGaWxsSW5Qcm9ncmVzcyA9IHRydWU7XHJcbiAgICAgICAgZGlzYWJsZUJsaWNraW5nID0gZGlzYWJsZUJsaWNraW5nID8/IHRydWU7XHJcbiAgICAgICAgZ3JpZC5nbWFnaWNwcmVmaWxsZXI8R29yZGljLkVrby5JbnRlcmZhY2UuR1VjdFJvemRrb25EdG8sIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvPih7XHJcbiAgICAgICAgICAgIGRlZmF1bHREYXRhOiB7XHJcbiAgICAgICAgICAgICAgICByb2s6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8ucm9rLFxyXG4gICAgICAgICAgICAgICAgbmtzOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5OS1MgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgdWNzOiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LnVjcyxcclxuICAgICAgICAgICAgICAgIGljbzogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5pY28sXHJcbiAgICAgICAgICAgICAgICAvL2l4cDogdGhhdC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5peHAsXHJcbiAgICAgICAgICAgICAgICBpeHBfZGVuOiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/Lml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICB1cF9zdGF2OiAwLFxyXG4gICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhdXRvQ29tbWl0Um93OiB0cnVlLFxyXG4gICAgICAgICAgICBoZWFkZXJWYWx1ZTogcGFyc2VEZWNpbWFsKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uYyEpLFxyXG4gICAgICAgICAgICAvL2hlYWRlck1EVmFsdWU6IHBhcnNlRGVjaW1hbCh0aGF0LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmMhKSxcclxuICAgICAgICAgICAgb3duTktTOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5OS1NWTCBhcyBhbnksXHJcbiAgICAgICAgICAgIHNldE5LUzogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uTktTIGFzIGFueVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcnVsZXM6IEdvcmRpYy5XaWRnZXQuR01hZ2ljUHJlRmlsbGVyLlByZWZpbGxlclJ1bGVbXSA9IEdvcmRpYy5XaWRnZXQuR01hZ2ljUHJlRmlsbGVyLkdNYWdpY1ByZUZpbGxlci5nZXREYXRhV29yZHNDb2x1bW5zKGdyaWQuZ2dyaWQoXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpKTs7XHJcblxyXG4gICAgICAgIHJ1bGVzLnB1c2goXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbjogXCJua3NcIiwgdHlwZTogR29yZGljLldpZGdldC5HTWFnaWNQcmVGaWxsZXIuUnVsZVR5cGUudG9wb2xvZ3ksIGRhdGFFeHRlbmQ6ICh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBua3M6IHZhbCwgaWNvOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IFwiYzBcIiwgdHlwZTogR29yZGljLldpZGdldC5HTWFnaWNQcmVGaWxsZXIuUnVsZVR5cGUuZmluYW5jaWFsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbjogXCJjMVwiLCB0eXBlOiBHb3JkaWMuV2lkZ2V0LkdNYWdpY1ByZUZpbGxlci5SdWxlVHlwZS5maW5hbmNpYWxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb2x1bW46IFwic21sb3V2YVwiLCB0eXBlOiBHb3JkaWMuV2lkZ2V0LkdNYWdpY1ByZUZpbGxlci5SdWxlVHlwZS5vdGhlciwgZmllbGQ6IFwic21sb3V2YVwiLCB0ZW1wbGF0ZU5hbWU6IFwic21sX3RcIlxyXG4gICAgICAgICAgICAgICAgY29sdW1uOiBcInNtbG91dmFcIiwgdHlwZTogR29yZGljLldpZGdldC5HTWFnaWNQcmVGaWxsZXIuUnVsZVR5cGUuY29udHJhY3QsIGZpZWxkOiBcInNtbG91dmFcIiwgdGVtcGxhdGVOYW1lOiBcInNtbF90XCJcclxuICAgICAgICAgICAgICAgIC8vLCBkYXRhRXh0ZW5kOiAodmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4geyBzbWxvdXZhOiB2YWwsIGljbzogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPLCBua3M6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8ubmtzIH07XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uOiBcInBvcGlzXCIsIHR5cGU6IEdvcmRpYy5XaWRnZXQuR01hZ2ljUHJlRmlsbGVyLlJ1bGVUeXBlLm90aGVyLCBmaWVsZDogXCJwb3Bpc1wiLCB0ZW1wbGF0ZU5hbWU6IFwibmF6X3RcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gdG90byB0YWR5IGJ5dCBuZW11c2k/P1xyXG4gICAgICAgIC8vUmVmcmVzaE1lbnUoY29udGVudCk7XHJcbiAgICAgICAgZ3JpZC5nbWFnaWNwcmVmaWxsZXIoXCJ1c2VUZW1wbGF0ZXNcIiwgbGlzdERhdGFGb3JJbXBvcnQsIHJ1bGVzLGZhbHNlIC8qZGlzYWJsZUJsaWNraW5nKi8pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250ZW50Lm5ld1Jvd1N0YXJ0ID0gblJTOyByZXR1cm47XHJcbiAgICAgICAgfSwgKCkgPT4geyBjb250ZW50Lm5ld1Jvd1N0YXJ0ID0gZmFsc2U7IH0pLmFsd2F5cygoKSA9PiB7IGNvbnRlbnQucHJlRmlsbEluUHJvZ3Jlc3MgPSBmYWxzZTsgY29udGVudC5uZXdSb3dTdGFydCA9IHRydWU7IFJlZnJlc2hNZW51KGNvbnRlbnQpOyBjb250ZW50Lm5ld1Jvd1N0YXJ0ID0gblJTOyB9KVxyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSHJvbWFkbmUgb3BlcmFjZVxyXG4gICAgICogIFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBQcnV2b2RjZU9wZXJhY2UoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCB0eXBPcGVyYWNlOiBcIklNUENMSVBcIiB8IFwiSU1QRklMRVwifCBcIklNUENMSVBQT0xcIiB8IFwiSU1QRklMRVBPTFwiKSB7XHJcbiAgICAgICAgbGV0IG9wZXJhY2U6IHN0cmluZztcclxuICAgICAgICBsZXQgZ3JpZGZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxhbnk+O1xyXG4gICAgICAgIGxldCB0aXRsZSA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoICh0eXBPcGVyYWNlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJJTVBGSUxFUE9MXCI6XHJcbiAgICAgICAgICAgICAgICAvLyBpbXBvcnQgemUgc291Ym9ydSBkbyBwb3Jpem92YWNreSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxLCBMLTItMTAtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczozMDI1MDUyNVwiKS5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwgLy9SQyAzMDI1MDUyNSA6IFbDvWLEm3Igc291Ym9ydVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBsb2FkVE1QRmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdEV4dGVuc2lvbjogXCIuY3N2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RmlsZUNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJ3LUwtNCB3LVMtMTIgdy1NLTZcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpZWxkRG93bmxvYWRlckNsYXNzOiBcIkdvcmRpYy5Eb2N1bWVudHMuV2ViQ2xpZW50LkdGdHBDbGllbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlVXBsb2FkZWQ6IChldiwgb2JqKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuc2hvd0ZsYXNoKFwianJlczozMDI1MDUyNlwiLmZvcm1hdChvYmouZmlsZUluZm8uZmlsZW5hbWUgYXMgYW55KSwgXCJzdWNjZXNzXCIsIFwieHhcIikgLy9SQyAzMDI1MDUyNiA6IFNvdWJvciB7MH0gbmFocsOhbi5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBteWZvcm0gPSBjb250ZW50LmRpYWxvZ3Muc2ltcGxlRm9ybShcImpyZXM6MzAyNTA4NTFcIiwgZm9ybSwge30sICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDg1MVwiIC8vUkMgMzAyNTA4NTEgOiBJbXBvcnQgZGF0IHogQ1NWIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIG15Zm9ybS5jcmVhdGVEaWFsb2dQcm9taXNlPGFueT4oKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChmaWxlSW5mbyApIHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlSW5mbyB8fCB0eXBlb2YgZmlsZUluZm8udXBsb2FkVE1QRmlsZSA9PSBcInVuZGVmaW5lZFwiIHx8IGZpbGVJbmZvLnVwbG9hZFRNUEZpbGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MzAyNTA1MjBcIikgLy9SQyAzMDI1MDUyMCA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gc291Ym9yIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlSW5mby51cGxvYWRUTVBGaWxlWzBdLnNpemVCID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDg1NVwiKSAvL1JDIDMwMjUwODU1IDogIE51bG92w6EgdmVsaWtvc3Qgc291Ym9ydSFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuVWN0RG9rbGFkWmFwaXMucHJlcGFyZUltcG9ydEZyb21GaWxlVG9BRFAoeyBycTogeyBWaWRpdGVsbmVTbG91cGNlOiBnZXRWaWRpdGVsbmVTbG91cGNlKGNyZWF0ZUdyaWRGb3JtYXQoY29udGVudCkpLCBGaWxlSW5mbzogZmlsZUluZm8udXBsb2FkVE1QRmlsZVswXSB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmV0dXJuRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucG9jZXRSYWRrdVByZWRrb250YWNlID0gcmV0dXJuRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1blByZWRrb250YWNlKGNvbnRlbnQsIHJldHVybkRhdGEpO1xyXG59IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiBjb250ZW50LmVuZE9wZXJhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBcIklNUENMSVBQT0xcIjpcclxuICAgICAgICAgICAgICAgIC8vIGltcG9ydCB6ZSBzY2hyYW5reSBkbyBwb3Jpem92YWNreSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5VdGlscy5yZWFkRnJvbUNsaXBib2FyZCh7IHBhcmVudENvbnRlbnQ6IGNvbnRlbnQgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiByZXN1bHQudGV4dCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRDbGlwQm9hcmQgPSByZXN1bHQudGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudENsaXBCb2FyZCAhPT0gXCJzdHJpbmdcIiB8fCBjb250ZW50Q2xpcEJvYXJkLnRyaW0oKSA9PT0gXCJcIikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuVWN0RG9rbGFkWmFwaXMucHJlcGFyZUltcG9ydEZyb21DbGlwYm9hcmRUb0FEUCh7IHJxOiB7IFZpZGl0ZWxuZVNsb3VwY2U6IGdldFZpZGl0ZWxuZVNsb3VwY2UoY3JlYXRlR3JpZEZvcm1hdChjb250ZW50KSksIERhdGFaZVNjaHJhbmt5OiBjb250ZW50Q2xpcEJvYXJkIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJldHVybkRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5wb2NldFJhZGt1UHJlZGtvbnRhY2UgPSByZXR1cm5EYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1blByZWRrb250YWNlKGNvbnRlbnQsIHJldHVybkRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiBjb250ZW50LmVuZE9wZXJhdGlvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiByZXN1bHQuZXJyb3JNZXNzYWdlICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2hvd0ZsYXNoKHsgbGFiZWw6IHJlc3VsdC5lcnJvck1lc3NhZ2UsIHN0YXRlOiBcIndhcm5pbmdcIiwgdGltZXI6IDIwMDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwODA4XCIsIHN0YXRlOiBcIndhcm5pbmdcIiwgdGltZXI6IDIwMDAgfSk7IC8vUkMgMzAyNTA4MDggOiBQcsOhemRuw70gb2JzYWggc2NocsOhbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBHRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJJTVBGSUxFXCI6XHJcbiAgICAgICAgICAgICAgICAvLyBpbXBvcnQgemUgc291Ym9ydVxyXG4gICAgICAgICAgICAgICAgZ3JpZGZvcm1hdCA9IGNyZWF0ZUdyaWRGb3JtYXQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBvcGVyYWNlID0gXCJHVWN0T3BlcmFjZUltcG9ydFwiOy8vRmlsZVxyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSBcImpyZXM6MzAyNTA4MTlcIjsgLy9SQyAzMDI1MDgxOSA6IEltcG9ydCB6w6FwaXPFryB6ZSBzb3Vib3J1XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIklNUENMSVBcIjpcclxuICAgICAgICAgICAgICAgIC8vIGltcG9ydCB6ZSBzY2hyYW5reVxyXG4gICAgICAgICAgICAgICAgZ3JpZGZvcm1hdCA9IGNyZWF0ZUdyaWRGb3JtYXQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBvcGVyYWNlID0gXCJHVWN0T3BlcmFjZUltcG9ydFwiOy8vQ2xpcGJvYXJkXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gXCJqcmVzOjMwMjUwODE2XCI7IC8vUkMgMzAyNTA4MTYgOiBJbXBvcnQgesOhcGlzxa8gemUgc2NocsOhbmt5XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMwMjUwMDM1XCIsIC8vUkMgMzAyNTAwMzUgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAzNzRcIik7ICAvL1JDIDMwMjUwMzc0IDogTmV6bsOhbcOhIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgIHJldHVybjsgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGVudC5uYXZpZ2F0ZShHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0T3BlcmFjZUltcG9ydCwgeyBjb250ZW50OiBjb250ZW50LCBnbG9iYWxzOiBjb250ZW50Lkdsb2JhbHMsIHRpdGxlOiB0aXRsZSwgdHlwZTogdHlwT3BlcmFjZSwgaXhwOiBjb250ZW50Lkl4cCwgZ3JkRm9ybWF0OiBncmlkZm9ybWF0LCBkYXRabWVueTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5kYXRfem1lbmEgfSlcclxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGNudERpdjphbnkgKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjbnREaXYgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNudERpdi5jb250ZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjbnREaXYuY29udGVudC5zdWNjZXNzQ2xvc2UgPT09IFwiYm9vbGVhblwiICYmIGNudERpdi5jb250ZW50LnN1Y2Nlc3NDbG9zZSA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB6bm92dW5hY3RlbmkgemFwaXN1IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVsb2FkUmVjb3Jkcyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7IFN3aXRjaFRvUmVjb3Jkcyhjb250ZW50KTsgcmV0dXJuOyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLlJlZnJlc2hEZXRhaWwoY29udGVudCBhcyBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR1VjdERldGFpbClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAudGhlbigoKSA9PiB7IFN3aXRjaFRvUmVjb3Jkcyhjb250ZW50KTsgcmV0dXJuOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgO1xyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgICAqIFpvYnJhemVuaSBwb2RrbGFkdSBLSCBEUEhcclxuICAgICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUG9ka2xhZHlLSERQSChjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIGVkaXRNb2RlOiBib29sZWFuID0gZmFsc2UsIHZ5bnVsb3ZhdERhdHVteURQSDogYm9vbGVhbiA9IGZhbHNlLCBwcnZvdG5pRXZpZGVuY2VEb2tsYWR1OiBib29sZWFuID0gZmFsc2UsIHJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZSk6SlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICBsZXQgb2JqRWRpdGFjZTogR29yZGljLkVrby5JbnRlcmZhY2UuR0Rhbm92YUV2aWRlbmNlRWRpdFNldHRpbmdzRHRvID0ge1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBwcmF2YSA9IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFS0hQcmF2YS5Qcm9obGl6ZW5pO1xyXG4gICAgICAgIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLlN0YXZEb2tsYWR1ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVN0YXZ5RG9rbGFkdS5Fdmlkb3Zhbm9cclxuICAgICAgICAgICAgfHwgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5TdGF2RG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuTmF2cmhcclxuICAgICAgICAgICAgfHwgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5TdGF2RG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuTmV6YXVjdG92YW5vXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHByYXZhID0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VLSFByYXZhLk9wcmF2YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuS2F0ZWdvcmllRG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VLYXRlZ29yaWVEb2tsYWR1Lkluc29sdmVuY25pRGFub3Z5RG9rbGFkXHJcbiAgICAgICAgICAgIHx8IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuS2F0ZWdvcmllRG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VLYXRlZ29yaWVEb2tsYWR1Lkluc29sdmVuY25pRGFub3Z5RG9rbGFkRGxlUGFyNDZcclxuICAgICAgICAgICAgfHwgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5LYXRlZ29yaWVEb2tsYWR1ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRUthdGVnb3JpZURva2xhZHUuVWNldG5pRG9rbGFkRGFub3Z5XHJcbiAgICAgICAgICAgIHx8IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuS2F0ZWdvcmllRG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VLYXRlZ29yaWVEb2tsYWR1LkRva2xhZE5lc3Bhcm92YW55Y2hQbGF0ZWJWeWRlakRhbm92eVxyXG4gICAgICAgICAgICB8fCBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLkthdGVnb3JpZURva2xhZHUgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFS2F0ZWdvcmllRG9rbGFkdS5Eb2tsYWROZXNwYXJvdmFueWNoUGxhdGViUHJpamVtRGFub3Z5XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2UuZGF0X2RvciA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2UuZGF0X3Z5c3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBvYmpFZGl0YWNlLmRhdF96ZGFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2JqRWRpdGFjZS5kYXRfdXBkID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2JqRWRpdGFjZS5kYXRfZXZpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2UuZWNfZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICBvYmpFZGl0YWNlLnBvbG96a3lLSCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2UucHJpel9pbnIgPSB0cnVlO1xyXG4gICAgICAgICAgICBvYmpFZGl0YWNlLnByaXpfb3pwID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2JqRWRpdGFjZS5wcml6X3BkcCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2UucHJpel9wb21lciA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2UucHJpel9wb21lciA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2UucHJpel96YWhyID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2JqRWRpdGFjZS5wcml6X3pwbCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2Uuc3BlY19lY19kZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uVHlwQWdIbGFEb2tsYWR1ID09PSA4MCkge1xyXG4gICAgICAgICAgICBvYmpFZGl0YWNlLnNwZWNfZWNfZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICBvYmpFZGl0YWNlLmVjX2RkID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2JqRWRpdGFjZS5wcml6X3BvbWVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlR5cEFnSGxhRG9rbGFkdSA9PT0gNzApIHtcclxuICAgICAgICAgICAgb2JqRWRpdGFjZS5zcGVjX2VjX2RkID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2JqRWRpdGFjZS5lY19kZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2UucHJpel9wb21lciA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iakVkaXRhY2UuZGF0X3VwZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYUtIIS5wcml6X3BkcCA9PT0gMClcclxuICAgICAgICAgICAgICAgIC8vIGRhdHVtIHpkYW5pdC4gcGxuZW5pXHJcbiAgICAgICAgICAgICAgICBvYmpFZGl0YWNlLmRhdF96ZGFuID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gcG9rdWQgb3ByYXZ1amkgVUNUXHJcbiAgICAgICAgICAgIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5UeXBBZ0hsYURva2xhZHUgPT09IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkYXR1bSB2eXN0YXZlbmlcclxuICAgICAgICAgICAgICAgIG9iakVkaXRhY2UuZGF0X3Z5c3QgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmpFZGl0YWNlLnNwZWNfZWNfZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICBvYmpFZGl0YWNlLmVjX2RkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuaW50X2RvayA9PT0gMSkge1xyXG4gICAgICAgICAgICAvLyBpbnRlcm5pIGRva2xhZCwgbXVzaSBieXQgb3puYWNlbm8gT1pQIGRvIDEwIHRpcy5cclxuICAgICAgICAgICAgb2JqRWRpdGFjZS5wcml6X296cCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBKYWsgdG8gbmFzdGF2aW0/XHJcbiAgICAgICAgICAgIC8vb2JqRWRpdGFjZS5wcml6X296cCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkRpYWxvZ3MuR0Rhbm92YUV2aWRlbmNlKFxyXG4gICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpeHA6IGNvbnRlbnQuSXhwLFxyXG4gICAgICAgICAgICAgICAgcmFkZWs6IDAsXHJcbiAgICAgICAgICAgICAgICBwcmF2YTogcHJhdmEsXHJcbiAgICAgICAgICAgICAgICBlZGl0U2V0dGluZ3M6IG9iakVkaXRhY2UsXHJcbiAgICAgICAgICAgICAgICB2eW51bG92YXREYXR1bXlEUEg6IHZ5bnVsb3ZhdERhdHVteURQSCxcclxuICAgICAgICAgICAgICAgIHBydm90bmlFdmlkZW5jZURva2xhZHU6IHBydm90bmlFdmlkZW5jZURva2xhZHUsXHJcbiAgICAgICAgICAgICAgICBlZGl0TW9kZTogZWRpdE1vZGVcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLmF1dG9cclxuICAgICAgICApLnRoZW4oKHVsb3plbm8pID0+IHtcclxuICAgICAgICAgICAgaWYgKHVsb3plbm8pIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWxvYWRSZWNvcmRzKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWZyZXNoRGV0YWlsLmNhbGwoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWZyZXNoRGV0YWlsLmNhbGwoY29udGVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIFJlZnJlc2hEZXRhaWwoY29udGVudCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgICAqIFByZXZ6ZXRpIGRva2xhZHVcclxuICAgICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUHJldnpldGlEb2tsYWR1KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gY29udGVudDtcclxuXHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IDUwMDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gMzAwO1xyXG5cclxuICAgICAgICBsZXQgZm9ybSA9IHRoYXQuZGlhbG9ncy5zaW1wbGVGb3JtKFwianJlczozMDI1MDY0NFwiLCBIcm9tYWRuYU9wZXJhY2Vmb3JtKEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlByZXZ6ZXRpLHRoYXQsXCJcIilcclxuICAgICAgICAgICAgLy9QcmV2eml0dEZvcm0oY29udGVudClcclxuICAgICAgICAgICAgLCB7IGlkOiBcIklEUHJldnppdFwiIH0sICQuZXh0ZW5kKHt9LCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIHVzZXJTZXR0aW5nczogdGhhdC51c2VyU2V0dGluZ3MgfSkpIC8vUkMgMzAyNTA2NDQgOiBQxZlldnpldMOtIGRva2xhZHVcclxuICAgICAgICAgICAgO1xyXG4gICAgICAgIGZvcm0udHJpZ2dlcihcImZvY3VzXCIpO1xyXG4gICAgICAgIHJldHVybiBmb3JtLmNyZWF0ZURpYWxvZ1Byb21pc2U8YW55PigpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhOiBJR1ByZWV2aWRlbmNlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIGxldCBycTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFByZXZ6aXRSZXF1ZXN0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFBpZERva2xhZHU6IGNvbnRlbnQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIERhdHVtUG9zbGVkbmlabWVueURva2xhZHU6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuZGF0X3ptZW5hLCBEdXZvZDogZGF0YS5kdXZvZFxyXG4gICAgICAgICAgICAgICAgICAgICwgQ2lzUmVhbDogZGF0YS5jaXNfcmVhbFxyXG4gICAgICAgICAgICAgICAgICAgICwgSXhzRnVuVnlyaXo6IGRhdGEuaXhzX2Z1bl92eXJpelxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMzg5XCIpOyAvL1JDIDMwMjUwMzg5IDogUHJvYsOtaMOhIHDFmWV2emV0w60gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZC5wcmV2eml0RG9rbGFkKHJxKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVmcmVzaEFmdGVyQWN0aW9uKGNvbnRlbnQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkRG9jVG9SZWZyZXNoKGNvbnRlbnQuSXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocmVzdWx0LnJlc3VsdC5kYXRhLlJlc3VsdE1lc3NhZ2UgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdC5yZXN1bHQuZGF0YS5SZXN1bHRNZXNzYWdlICE9PSBcInN0cmluZ1wiIHx8IHJlc3VsdC5yZXN1bHQuZGF0YS5SZXN1bHRNZXNzYWdlLnRyaW0oKSA9PT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gdGV4dCBuZWJ5bCBwb3NsYW4gemEgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoUHJldnppdFwiLCBpY29uOiBcImdpLXRpY2tcIiwgbGFiZWw6IFwianJlczozMDI1MDM5MVwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgdGltZXI6IDUwMDAgfSkgIC8vUkMgMzAyNTAzOTEgOiBEb2tsYWQgYnlsIMO6c3DEm8WhbsSbIHDFmWV2emF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoUHJldnppdFwiLCBpY29uOiBcImdpLXRpY2tcIiwgbGFiZWw6IHJlc3VsdC5yZXN1bHQuZGF0YS5SZXN1bHRNZXNzYWdlLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgdGltZXI6IDUwMDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZnJlc2hEZXRhaWwoY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29udGVudC5lbmRPcGVyYXRpb24oKTsgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiBjb250ZW50LmVuZE9wZXJhdGlvbigpKVxyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgLmFsd2F5cygoKSA9PiBjb250ZW50LmVuZE9wZXJhdGlvbigpKVxyXG4gICAgICAgICAgICA7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZyYWNlbmkgZG8gV0ZMIHZyc3R2eVxyXG4gICAgICogXHJcbiAgICAgKiAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFZyYXRpdERvV0ZMKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgdnN0dXA/OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkVnJhdGl0RG9XRkxSZXF1ZXN0RHRvKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2c3R1cCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvL2RlZmZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgY29udGVudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA3NTRcIik7IC8vUkMgMzAyNTA3NTQgOiBQcm9iw61ow6EgdnJhY2Vuw60gZG8gV0ZMICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZzdHVwID0ge1xyXG4gICAgICAgICAgICAgICAgSWRNZXNzYWdlOiBcIlwiLCBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCwgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5kYXRfem1lbmFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50LmlzbC5VY3REb2tsYWQudnJhdGl0RG9XRkwodnN0dXApXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgUmVmcmVzaEFmdGVyQWN0aW9uKGNvbnRlbnQsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYmNlcnN0dmVuaSBzZXpuYW11IG5hIHBvemFkaSAgICBcclxuICAgICAgICAgICAgICAgIGFkZERvY1RvUmVmcmVzaChjb250ZW50Lkl4cCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBmbGFzaFJlc3VsdCwgaWNvbjogXCJnaS10aWNrXCIsIGxhYmVsOiBcImpyZXM6MzAyNTA3NTVcIiwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCIsIHRpbWVyOiA1MDAwIH0pICAvL1JDIDMwMjUwNzU1IDogRG9rbGFkIGJ5bCB2csOhY2VuIGRvIFdGTFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmcmVzaERldGFpbChjb250ZW50LGZhbHNlLGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyPy5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIChvYmpFcnJvcjogRXJyb3IpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkV4Y2VwdGlvblByb2Nlc3Npbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LCBlcnJvT2JqZWN0OiBvYmpFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLkR1dm9kID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pPy5bXCJEdXZvZFwiXTsvL3JldHVyblZhbHVlW1wiRHV2b2RTdG9ybmFcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwPy5EdXZvZFN0b3JuYSA9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBWcmF0aXREb1dGTChjb250ZW50LCB2c3R1cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9mdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbGV0IHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uTmV3KGNvbnRlbnQsIGpxWEhSKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyOyBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5EdXZvZFN0b3JuYSA9IHJldHVyblZhbHVlW1wiRHV2b2RTdG9ybmFcIl07XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdnN0dXAhLk5hc3RhdmVuaSA9IHJldHVyblZhbHVlLk5hc3RhdmVuaTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2c3R1cCEuRHV2b2QgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk/LltcIkR1dm9kXCJdOy8vcmV0dXJuVmFsdWVbXCJEdXZvZFN0b3JuYVwiXTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwPy5EdXZvZFN0b3JuYSA9IFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZyYXRpdERvV0ZMKGNvbnRlbnQsIHZzdHVwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aHJvdyBHRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyPy5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlcj8ucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3JldHVybiBkZWZmZXI/LnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhyb3cganFYSFI7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICApXHJcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gY29udGVudC5lbmRPcGVyYXRpb24oKSlcclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBaamlzdGVuaSBha3V0YWxuaWhvIGVkaXRvdmFuZWhvIHJhZGt1XHJcbiAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgLypcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRDdXJyZW50Um93KGNvbnRlbnQ6IEdVY3REZXRhaWwpIHtcclxuICAgICAgICByZXR1cm4gY29udGVudC5DdXJyZW50Um93O1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIC8qKlxyXG4gICAgICAgICogTmFjdGVuaSB0eXB1IGRva2xhZHUgeiBmb3JtdWxhcmVcclxuICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEl4c1R5cEFzeW5jKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgYXN5bmM6IGJvb2xlYW4gPSB0cnVlKTogSlF1ZXJ5UHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBpZiAoY29udGVudC5jbG9zZWQpIFxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoXCJcIikucHJvbWlzZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKFwiaXhzX3R5cFwiKS5nZmllbGQoXCJnZXRWYWx1ZUFzeW5jXCIpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAodmFsdWUuaXhzX3R5cCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAgICAqIE5hY3RlbmkgdHlwdSBkb2tsYWR1IHogZm9ybXVsYXJlXHJcbiAgICAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRJeHNUeXAoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCBhc3luYzogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChjb250ZW50LmNsb3NlZCkgIHJldHVybiBcIlwiOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHZhbHVlID0gY29udGVudC5maW5kRmllbGRzKFwiaXhzX3R5cFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICBpZiAodmFsdWUpXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5peHNfdHlwO1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgLy8gTmFjdGVuaSBrYXRlZ29yaWUgZG9rbGFkdSB6IGZvcm11bGFyZVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEt0Z1R5cChjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChjb250ZW50LmNsb3NlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTEgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmFsdWUgPSBjb250ZW50LmZpbmRGaWVsZHMoXCJpeHNfdHlwXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgIGlmICh2YWx1ZSlcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmt0Z190eXA7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgLy8gTmFjdGVuaSBrYXRlZ29yaWUgZG9rbGFkdSB6IGZvcm11bGFyZVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEt0Z1R5cEFzeW5jKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSk6IEpRdWVyeVByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAgJC5EZWZlcnJlZCgpLnJlc29sdmUoLTEpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuZmluZEZvcm1zKFwiZm9ybUhlYWRlcixmb3JtRGV0YWlsXCIpLmZpbmRGaWVsZHMoXCJpeHNfdHlwXCIpLmdmaWVsZChcImdldFZhbHVlQXN5bmNcIikudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZS5rdGdfdHlwKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLyBOYWN0ZW5pIG1lc2ljZSBkb2tsYWR1IHogZm9ybXVsYXJlXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0TWVzaWMoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogSlF1ZXJ5UHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICBpZiAoY29udGVudC5jbG9zZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKC0xKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKFwibWVzaWNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVBc3luY1wiKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUuY2lzbG8pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHBhcnNlSW50KHZhbHVlLmNpc2xvKSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiAtIDE7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgICAqIE5hY3RlbmkgZHJ1aHUgZG9rbGFkdSAoRFJEKSB6IGZvcm11bGFyZVxyXG4gICAgICAgICogQHBhcmFtIGNvbnRlbnQgb2JzYWhcclxuICAgICAgICAqIEByZXR1cm5zIHtpbnR9IERydWggZG9rbGFkdVxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0RHJkQXN5bmMoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCBzeW5jaHJvOiBib29sZWFuID0gZmFsc2UpOiBKUXVlcnlQcm9taXNlIDxudW1iZXI+IHtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQuY2xvc2VkKSBcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKC0xKS5wcm9taXNlKCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKFwiZHJkXCIpLmdmaWVsZChcImdldFZhbHVlQXN5bmNcIikudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmRyZDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICogTmFjdGVuaSBkcnVodSBkb2tsYWR1IChEUkQpIHogZm9ybXVsYXJlXHJcbiAgICAgICAgKiBAcGFyYW0gY29udGVudCBvYnNhaFxyXG4gICAgICAgICogQHJldHVybnMge2ludH0gRHJ1aCBkb2tsYWR1XHJcbiAgICAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXREcmQoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogbnVtYmVyICB7XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50LmNsb3NlZCkgcmV0dXJuIC0xO1xyXG5cclxuICAgICAgICBsZXQgdmFsdWUgPSBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiLmZvcm1hdChHb3JkaWMuRWtvLkhlYWRlckZvcm0uTmFtZSkpLmZpbmRGaWVsZHMoXCJkcmRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZHJkO1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOYWN0ZW5pIHJva3UgRFBIIGRva2xhZHUgeiBmb3JtdWxhcmVcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXREUEhSb2soY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTpudW1iZXIge1xyXG5cclxuICAgICAgICBpZiAoY29udGVudC5jbG9zZWQpIFxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHZhbHVlID0gY29udGVudC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyLGZvcm1EZXRhaWxcIikuZmluZEZpZWxkcyhcInJva19kcGhcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gKHBhcnNlSW50KHZhbHVlKSkgOiAtIDE7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE5hY3RlbmkgbWVzaWNlIERQSCBkb2tsYWR1IHogZm9ybXVsYXJlXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0RFBITWVzaWMoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTpudW1iZXIge1xyXG4gICAgICAgIGlmIChjb250ZW50LmNsb3NlZCkgIHJldHVybiAtMTsgICAgICAgIFxyXG4gICAgICAgIGxldCB2YWx1ZSA9ICBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKFwibWVzaWNfZHBoXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5jaXNsbyA/IHBhcnNlSW50KHZhbHVlLmNpc2xvKSA6IC0gMTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogTmFjdGVuaSBjYXN0a3kgbmEgaGxhdmljY2UgZG9rbGFkdSB6IGZvcm11bGFyZVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldFZhbHVlKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSk6IEpzb25EZWNpbWFsIHtcclxuICAgICAgICBpZiAoY29udGVudC5jbG9zZWQpIHJldHVybiBcIlwiOyBcclxuICAgICAgICByZXR1cm4gY29udGVudC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyLGZvcm1EZXRhaWxcIikuZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAgICAqIFpqaXN0ZW5pIGNpc2xhIGRva2xhZHVcclxuICAgICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldE51bWJlckRvYyhjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpOiBhbnkge1xyXG4gICAgICAgIGlmIChjb250ZW50LmNsb3NlZCkgcmV0dXJuIG51bGw7IFxyXG4gICAgICAgIHJldHVybiBjb250ZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXIsZm9ybURldGFpbFwiKS5maW5kRmllbGRzKFwiYWNfaXhlXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICogIFpKaXN0ZW5pIHR5cHUgdWN0dVxyXG4gICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIElzVHlwVWN0dVByaWptb3Z5KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSk6IEpRdWVyeVByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiBHZXRDdXJyZW50RWRpdFJvdyhjb250ZW50KVxyXG4gICAgICAgICAgICAudGhlbigocmFkZWspID0+IHtcclxuICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrID09PSBcInVuZGVmaW5lZFwiIHx8IHJhZGVrID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkWmFwaXMuaXNQcmlqbW92eVVjZXQoeyByYWRlazogcmFkZWsgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiByZXN1bHQsICgpID0+IGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgKCkgPT4gZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgICAqIFpqaXN0ZW5pIHByaXN0dXBub3N0aSBzbWxvdXZ5XHJcbiAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXNFbmFibGVTbWxvdXZhKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgcmVsYXRlZEVsZW1lbnQ/OiBKUXVlcnksIGNhbmNlbGF0aW9uVG9rZW4/OiBHb3JkaWMuVXRpbHMuR0NhbmNlbGxhdGlvblRva2VuKTogSlF1ZXJ5UHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgLy8gZG9jYXNuZVxyXG4gICAgICAgIC8vcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIHJldHVybiBHZXRDdXJyZW50RWRpdFJvdyhjb250ZW50KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY3VycmVudFJvdykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbmNlbGF0aW9uVG9rZW4/LmNhbmNlbGxlZCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZzdHVwOiBJbnRlcmZhY2UuR1VjdFphcGlzQWN0aW9uUmVxdWVzdER0byA9IHsgSWRNZXNzYWdlOiBudWxsLCBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCwgWmFwaXM6IGN1cnJlbnRSb3cgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHZzdHVwLlphcGlzPy5wcml6X2t1cl9yb3ogIT09IG51bGwgfHwgdHlwZW9mIHZzdHVwLlphcGlzPy5wcml6X2t1cl9yb3ogIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdnN0dXAuWmFwaXMhLnByaXpfa3VyX3JveiA9IHBhcnNlSW50KHZzdHVwLlphcGlzIS5wcml6X2t1cl9yb3ogYXMgYW55KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfSXNFbmFibGVTbWxvdXZhKGNvbnRlbnQsIHZzdHVwLCByZWxhdGVkRWxlbWVudCwgY2FuY2VsYXRpb25Ub2tlbik7XHJcbiAgICAgICAgICAgIH0sICgpID0+ICQuRGVmZXJyZWQoKS5yZXNvbHZlKGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAgICAqIFpqaXN0ZW5pIHByaXN0dXBub3N0aSBzbWxvdXZ5XHJcbiAgICAgICAgKiBAcGFyYW0gaWRNZXNzYWdlXHJcbiAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICogQHBhcmFtIGN1cmVudFJvd1xyXG4gICAgICAgICogQHBhcmFtIGlkTWVzc2FnZVxyXG4gICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgZnVuY3Rpb24gX0lzRW5hYmxlU21sb3V2YShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIHZzdHVwOiBJbnRlcmZhY2UuR1VjdFphcGlzQWN0aW9uUmVxdWVzdER0bywgcmVsYXRlZEVsZW1lbnQ/OiBKUXVlcnksIGNhbmNlbGF0aW9uVG9rZW4/OiBHb3JkaWMuVXRpbHMuR0NhbmNlbGxhdGlvblRva2VuKTogYW55IHtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZFphcGlzLmlzQWxsb3dlZFNtbG91dmEoeyBycTogdnN0dXAgfSkuZ2V0KClcclxuICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAvLyhqcVhIUiwgdHlwZSwgb2JqKSA9PlxyXG4gICAgICAgICAgICAgICAgKChvYmpFcnJvcjogRXJyb3IpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkV4Y2VwdGlvblByb2Nlc3Npbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LCBlcnJvT2JqZWN0OiBvYmpFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlU3RhcnQ6ICgpID0+IHsgcmV0dXJuICAoY2FuY2VsYXRpb25Ub2tlbj8uY2FuY2VsbGVkKT9mYWxzZTp0cnVlOyAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0OiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX0lzRW5hYmxlU21sb3V2YShjb250ZW50LCB2c3R1cCwgcmVsYXRlZEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUodHJ1ZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKGNhbmNlbGF0aW9uVG9rZW4/LmNhbmNlbGxlZCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy92YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24oY29udGVudCwgb2JqLCB0eXBlLCB2c3R1cCwgeyByZWxhdGVkRWxlbWVudCB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIGxldCByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbk5ldyhjb250ZW50LCBqcVhIUiwgeyByZWxhdGVkRWxlbWVudCB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdmFyIHJldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHZzdHVwLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gX0lzRW5hYmxlU21sb3V2YShjb250ZW50LCB2c3R1cCwgcmVsYXRlZEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5PSylcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aHJvdyBqcVhIUjtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgY29udGVudC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICogTmVqYWthIGNla2Fja2EgbmEgaG9kbm90eVxyXG4gICAgICAgICogQHBhcmFtIHJvd1xyXG4gICAgICAgICovXHJcbiAgICBmdW5jdGlvbiB3YWl0Rm9yVmFsdWVzKHJvdzogSlF1ZXJ5KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBsZXQgZiA9IHJvdy5maW5kKFwiLmdmaWVsZFwiKS5ub3QoXCIuanMtc21sRmllbGRcIik7XHJcblxyXG4gICAgICAgIGxldCBwID0gZi5nZXQoKS5tYXAoZnVuY3Rpb24gKGl0KSB7IHJldHVybiAkKGl0KS5nZmllbGQoXCJ3YWl0aW5nRm9yVmFsdWVcIik7IH0pLmZpbHRlcihmdW5jdGlvbiAoaXQpIHsgcmV0dXJuICEhaXQ7IH0pO1xyXG4gICAgICAgIGlmIChwLmxlbmd0aCkgcmV0dXJuICQud2hlbi5hcHBseShudWxsLCBwKS50aGVuKHJvdy5nZm9ybS5iaW5kPGFueSwgVEdmb3JtTWV0aG9kc1tdLCBhbnksIGFueT4oZiwgXCJ3YWl0Rm9yVmFsdWVzXCIpKTtcclxuICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgKiAgWmppc3RlbmkgYWt0dWFsbmUgZWRpdG92YW5laG8gcmFka3VcclxuICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEN1cnJlbnRFZGl0Um93KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgbm9WYWxpZDogYm9vbGVhbiA9IGZhbHNlKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0ZHBlcER0bz4ge1xyXG4gICAgICAgIC8vdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGRlZiA9ICQuRGVmZXJyZWQoKTsgICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICBsZXQgcm93ID0gJChncmlkKS5maW5kKFwiLmNlbGwuZWRpdGluZ1wiKS5jbG9zZXN0KCcucm93JykuZXEoMCk7IC8vLnJvdy5lZGl0aW5nIG5lbXVzw60gYsO9dCBqZcWhdMSbIG5hc3RhdmVubywgdG90byBqZSBqaXN0xJtqxaHDrVxyXG4gICAgICAgIGlmIChyb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBjaSA9IGdyaWQuZ2dyaWQoXCJjZWxsSW5mb1wiLCByb3csIHRydWUpO1xyXG4gICAgICAgICAgICBjaSEuZGF0YSFbXCJyb2tcIl0gPSBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LnJvaztcclxuICAgICAgICAgICAgY2khLmRhdGEhW1wiYWNcIl0gPSBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmFjO1xyXG4gICAgICAgICAgICBjaSEuZGF0YSFbXCJtZXNpY1wiXSA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8ubWVzaWM7XHJcbiAgICAgICAgICAgIGNpIS5kYXRhIVtcImRlblwiXSA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uZGVuO1xyXG4gICAgICAgICAgICBjaSEuZGF0YSFbXCJ0eXBfYWdcIl0gPSA0MDtcclxuICAgICAgICAgICAgY2khLmRhdGEhW1widWNzXCJdID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py51Y3M7XHJcbiAgICAgICAgICAgIGNpIS5kYXRhIVtcImRyZFwiXSA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uZHJkO1xyXG4gICAgICAgICAgICBjaSEuZGF0YSFbXCJ6ZFwiXSA9IDA7XHJcbiAgICAgICAgICAgIGNpIS5kYXRhIVtcIm5rc1wiXSA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8ubmtzO1xyXG4gICAgICAgICAgICBjaSEuZGF0YSFbXCJhY19peGVcIl0gPSBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmFjX2l4ZTtcclxuICAgICAgICAgICAgY2khLmRhdGEhW1widXVzXCJdID0gY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py51dXM7XHJcbiAgICAgICAgICAgIGNpIS5kYXRhIVtcImxpY1wiXSA9IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8ubGljO1xyXG4gICAgICAgICAgICBjaSEuZGF0YSFbXCJha3Rpdml0YVwiXSA9IDEwMDtcclxuICAgICAgICAgICAgLy9jaSEuZGF0YSFbXCJyYWRla196XCJdID0gLTE7XHJcbiAgICAgICAgICAgIGNpIS5kYXRhIVtcInVwX3N0YXZcIl0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKG5vVmFsaWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoJC5leHRlbmQodHJ1ZSwge30sIGNpPy5kYXRhKSkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICB3YWl0Rm9yVmFsdWVzKHJvdylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudC5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJvdy5nZm9ybShcImlzVmFsaWRcIikpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBEYXRhID0gJC5leHRlbmQodHJ1ZSwge30sIGNpPy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICByb3cuZmluZChcIi5jZWxsLmVkaXRpbmdcIikuZWFjaChmdW5jdGlvbiAoY2VsbCwgZWxlbWVudCkgeyAkKGVsZW1lbnQpLmRhdGEoXCJlZGl0b3JcIikuY29sbGVjdCh0ZW1wRGF0YSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSh0ZW1wRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZWYucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBaamlzdGVuaSwgemRhIHNlIGplZG5hIG8gcHJpamVtIG5lYm8gdnlkZWpcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAvLy8gPHBhcmFtIG5hbWU9XCJjMFwiPk1EPC9wYXJhbT5cclxuICAgIC8vLyA8cGFyYW0gbmFtZT1cImMxXCI+RGFsPC9wYXJhbT5cclxuICAgIC8vLyA8cGFyYW0gbmFtZT1cInByaXpuUmV6ZXJDaGFyXCI+UmV6ZXJ2YWNuaSBwcml6bmFrPC9wYXJhbT5cclxuICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXNQcmlqZW0oYzA6IERlY2ltYWwsIGMxOiBEZWNpbWFsLCBwcml6blJlemVyQ2hhcjogTnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGxfYlByaWplbSA9IGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAocHJpem5SZXplckNoYXIpIHtcclxuICAgICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgICAgY2FzZSAzMDpcclxuICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgIGxfYlByaWplbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyNTpcclxuICAgICAgICAgICAgY2FzZSAzNTpcclxuICAgICAgICAgICAgY2FzZSA0NTpcclxuICAgICAgICAgICAgICAgIGxfYlByaWplbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBsX2JQcmlqZW0gPSAhKChjMS5hYnMoKSkgPiAoYzAuYWJzKCkpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbF9iUHJpamVtO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBWeXR2b3JlbmkgZ3JpZGZvcm1hdHUgdWNldG5pY2ggcG9sb3pla1xyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWRGb3JtYXQoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCB3aXphcmQ6IGJvb2xlYW4gPSBmYWxzZSk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8YW55PiB7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGxldCBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuXHJcbiAgICAgICAgaWYgKHdpemFyZCkge1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZEljb25Db2x1bW4oeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHbDvXNsZWRrb3bDqWhvIHNsb3VwY2UgZG8gZ3JpZHUgd2l6YXJkdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwid2l6X2tpbmRcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwODE1XCIsIHdpZHRoOiA0MCwgICAgICAgICAgICAgICAgICAgICAvL1JDIDMwMjUwODE1IDogS29udHJvbGFcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNsb3VwZWMgZG8gZ3JpZHUgdGltdSBJQ09OXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLndpel9raW5kID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5TdWNjZXNzKSAgICAgICAgICAvLyB2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXN1Y2Nlc3MgZy1zdGF0ZS10ZXh0XCIsIHRvb2x0aXA6IFwianJlczozMDI1MDUwM1wiIH07IC8vUkMgMzAyNTA1MDMgOiBPS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLndpel9raW5kID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5XYXJuaW5nKSAgICAgLy8gdnlob3Z1asOtY8OtIGRva2xhZCBzIHVwb3pybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsIHRvb2x0aXA6IFwianJlczozMDI1MDgxM1wiIH07IC8vUkMgMzAyNTA4MTMgOiDFmMOhZGVrIHMgdXBvem9ybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLndpel9raW5kID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5FcnJvcikgICAgICAgLy8gbmV2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0b29sdGlwOiBcImpyZXM6MzAyNTA4MTJcIiB9OyAvL1JDIDMwMjUwODEyIDogTmV2eWhvdnVqw61jw60gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIMW+w6FkbsO9IHbDvXNsZWRlayBuZWV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcIlwiLCB0ZXh0OiBcIlwiLCB0b29sdGlwOiBcIlwiIH0gYXMgYW55OyAgICAgICAgICAgICAgICAgICAgIC8vIG5ldXRyw6FsbsOtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gdsO9c2xlZGtvdsOpaG8gc2xvdXBjZSBkbyBncmlkdSB3aXphcmR1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ3aXpfdHh0X2VyclwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA4MTRcIiwgd2lkdGg6IDE3MCwgICAgICAgICAgICAgICAgICAgICAgLy8gdmxhc3Rub3N0aSBwxZlpZGFuw6lobyBzbG91cGNlIC8vUkMgMzAyNTA4MTQgOiBLb250cm9sYSAtIHbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfelwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIixcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgZ3JpZEZvcm1hdC5hZGROa3MoeyAgICAgICAgICAgICAgIC8vbmFrbGFkb3ZlIHN0cmVkaXNrb1xyXG4gICAgICAgICAgICAgICAgLy9uYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgLy9zeXNDb2x1bW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL2NhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMubmtzLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmtzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0QnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5rcyA9IGNoYW5nZU9iai52YWx1ZSA/IGNoYW5nZU9iai52YWx1ZT8ubmtzIDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFua3MgfHwgbmtzID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRFcnJvclwiLCB7IHN0b3BwaW5nOiB0cnVlLCBlcnJvclR5cGU6IFwiZXJyb3JcIiwgZ3JvdXA6IFwicmV2ZXJpZnlFcnJcIiwgbWVzc2FnZTogXCJqcmVzOjMwMjUwODQzXCIuZm9ybWF0KEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMubmtzKSB9KTsgIC8vUkMgMzAyNTA4NDMgOiB7MH0gbXVzw60gYsO9dCB6YWTDoW5vLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXN0YXZTdGF2eShjb250ZW50LCAwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic21hcnROYXZOZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcImdwb3Jpem92YWNDb25maWdcIiwgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPLCAvL2NvbnRlbnQuc2VydmVyQ29udGV4dC5pY28vL2NvbnRlbnQuZGF0b3ZhVmV0YS5pY29cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VjczogY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uVUNTLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rX29kOiBcIjw9IFwiICsgY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rX2RvOiBcIj49IFwiICsgY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmF6YmFOa3NOYUZ1bmtjaTogY29udGVudC5HbG9iYWxzLlBhcmFtcz8uVmF6YmFOa3NOYUZ1bmtjaSA/IGNvbnRlbnQuR2xvYmFscy5PdGhlcnM/Lkl4c0Z1bjogdm9pZCAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPXZhbHVlLmljbyxtb2RlbC5ua3M9dmFsdWUubmtzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBjdXN0b21DbGFzczogXCJqcy1OS1NcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy51dXNcclxuICAgICAgICAgICAgLy8uYWRkU29ydGVkRWtvQ2Z1U2V0KGNvbnRlbnQsIHsgaXNFZGl0YWJsZTogdHJ1ZSwgbWFuYWdlck9wdGlvbnM6IHsgc2hvd0RhdGFXb3Jkc0luZm9zOnRydWUgfSB9KVxyXG4gICAgICAgICAgICAuYWRkU29ydGVkRWtvQ2Z1U2V0KGNvbnRlbnQsIHsgaXNFZGl0YWJsZTogdHJ1ZSwgbWFuYWdlck9wdGlvbnM6IHsgc2hvd0RhdGFXb3Jkc0luZm9zOiB0cnVlLCBleHRlcm5hbEhlbHBEaWFsb2c6IHRydWUsIHVzZU5vbkRpZ2l0YWw6IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LlByaXpDaGVja1VldGUhIGFzIGFueSB9IH0pICAgICAgXHJcbiAgICAgICAgICAgIC5hZGRNRCh7ICAgICAgICAgICAgICAgLy9NRFxyXG4gICAgICAgICAgICAgICAgLy9uYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAvL3N0cnVjdHVyZUxlYWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vY2FwdGlvbjogXCJqcmVzOjMwMjUwMDE5XCIsIC8vUkMgMzAyNTAwMTkgOiBNRFxyXG4gICAgICAgICAgICAgICAgLy93aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczpcImpzLWNhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0OiBhbGVydChcInN0YXJ0IE1EXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuTnVtYmVyLmRlY2ltYWwoMiwgdHJ1ZSksIHsgbmFtZTogXCJjMFwiLCBjdXN0b21DbGFzczogXCJqcy1NRFwiLyosIG1vZGVsOiBcIm1vZGVsLmMwPXZhbHVlXCIsKi8gfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZERhbCh7ICAgICAgICAgICAgICAgLy8gREFMXHJcbiAgICAgICAgICAgICAgICAvL25hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgIC8vY2FwdGlvbjogXCJqcmVzOjMwMjUwMTMxXCIsIC8vUkMgMzAyNTAxMzEgOiBEYWxcclxuICAgICAgICAgICAgICAgIC8vd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5OdW1iZXIuZGVjaW1hbCgyLCB0cnVlKSwgeyBuYW1lOiBcImMxXCIsIGN1c3RvbUNsYXNzOiBcImpzLURBTFwiLyosbW9kZWw6IFwibW9kZWwuYzE9dmFsdWVcIiwgKi8gfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFBvcGlzKHtcclxuICAgICAgICAgICAgLy9uYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgIC8vY2FwdGlvbjogXCJqcmVzOjMwMjUwMDI0XCIsIC8vUkMgMzAyNTAwMjQgOiBQb3Bpc1xyXG4gICAgICAgICAgICAvL3dpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtcG9waXNcIixcclxuICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgc21hcnROYXZPbkxlbmd0aDogMjU0IH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBlcm1pc3Npb25zLlBlcm1pc3Npb25zWmFwaXMuUG92b2xlbmlTbWxvdXZ5LnZpc2libGUpIHtcclxuICAgICAgICAgICAgLy9pZiAod2l6YXJkKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInNtbG91dmFcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDc0NlwiLCAvL1JDIDMwMjUwNzQ2IDogU21sb3V2YVxyXG4gICAgICAgICAgICAvLyAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgLy8gICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiLFxyXG5cclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChjb250ZW50LlVjZXRuaURva2xhZER0by5Qb3ZvbGVuaVNtbG91dnkhLlZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmFibGVTdGF0ZTogTWVudVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1Y3Qtc21sLW5hcG9jZXRTdGF0ZVwiLCBpZDogXCJzdGF0ZUNoZWNrXCIsIHBvc2l0aW9uOiBcInJpZ2h0XCIsIGljb246IFwiZmEtc3F1YXJlLW9cIiwgdHlwZTogXCJzdGF0aWNcIiwgdG9vbHRpcDogXCJqcmVzOjMwMjUwNDMyXCIgLy9SQyAzMDI1MDQzMiA6IE5lYnVkZSBwcm92ZWRlbiBuw6Fwb8SNZXQgbmEgcG9sb8W+a3Ugc21sb3V2eVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGVTdGF0ZS5pY29uID0gc3RhdHVzID8gXCJmYS1jaGVjay1zcXVhcmUtb1wiIDogXCJmYS1zcXVhcmUtb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlU3RhdGUudG9vbHRpcCA9IHN0YXR1cyA/IFwianJlczozMDI1MDQzMVwiIC8vUkMgMzAyNTA0MzEgOiBCdWRlIHByb3ZlZGVuIG7DoXBvxI1ldCBuYSBwb2xvxb5rdSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczozMDI1MDQzMlwiIC8vUkMgMzAyNTA0MzIgOiBOZWJ1ZGUgcHJvdmVkZW4gbsOhcG/EjWV0IG5hIHBvbG/Fvmt1IHNtbG91dnlcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNhbmNlbGxhdGlvblRva2VuOiBHb3JkaWMuVXRpbHMuR0NhbmNlbGxhdGlvblRva2VuIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZEh0bWxDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic21sb3V2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDg2MlwiLCAvL1JDIDMwMjUwODYyIDogU21sb3V2YVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLXNtbEZpZWxkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbnRhYmxlOiAocm93OiBJbnRlcmZhY2UuR1VjdGRwZXBEdG8pID0+IChyb3cuc21sb3V2YSA/IChyb3cuc21sb3V2YSArIChyb3cuY2lzbG9fc21sPyBcIi1cIiArIChyb3cucHJpel9yZXpfc21sID8gXCJBTk9cIiA6IFwiTkVcIik6XCJcIikpIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaXhwX3NtbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gJC5uZXdEaXYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5hcHBlbmQoJC5uZXdTcGFuKCkudGV4dChyb3cuc21sb3V2YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFwcGVuZCgkLm5ld1NwYW4oKS5jc3MoXCJmbG9hdFwiLCBcInJpZ2h0XCIpLmdzdGF0aWMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qaW5pdGlhbFZhbHVlOiB0cnVlLCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kaXNhYmxlZDogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogcm93LnByaXpfcmV6X3NtbCA/IFwianJlczozMDI1MDQzMVwiIC8vUkMgMzAyNTA0MzEgOiBCdWRlIHByb3ZlZGVuIG7DoXBvxI1ldCBuYSBwb2xvxb5rdSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJqcmVzOjMwMjUwNDMyXCIsIC8vUkMgMzAyNTA0MzIgOiBOZWJ1ZGUgcHJvdmVkZW4gbsOhcG/EjWV0IG5hIHBvbG/Fvmt1IHNtbG91dnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiByb3cucHJpel9yZXpfc21sID8gXCJmYS1jaGVjay1zcXVhcmUtb1wiIDogXCJmYS1zcXVhcmUtb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic21sb3V2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX3NtbD12YWx1ZS5zbWxwb2wuaXhwX3NtbF9wcmksIG1vZGVsLnJva19zbWw9dmFsdWUuc21scG9sLnJva19zbWwsIG1vZGVsLnNtbG91dmE9dmFsdWUuc21scG9sLnNtbG91dmEsIG1vZGVsLmFjX3NtbD12YWx1ZS5zbWxwb2wuYWNfc21sLCBtb2RlbC5jaXNsb19zbWw9dmFsdWUuc21scG9sLmNpc2xvLCBtb2RlbC5wcml6X3Jlel9zbWw9dmFsdWUuaXNOYXBvY2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWUuc21scG9sLnJvayA9IG1vZGVsVmFsdWUuc21scG9sLnJva19zbWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKCEhbW9kZWxWYWx1ZS5pc05hcG9jZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZCgnYWRkU3RhdGUnLCBvYnNlcnZhYmxlU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKCEhY3R4LnZhbHVlPy5pc05hcG9jZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKCdhZGRTdGF0ZScsIG9ic2VydmFibGVTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJkZWZhdWx0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1zbWxGaWVsZCBqcy1LUlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nT3B0aW9uczogeyB3aWR0aDogMjUwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZXM6IFtvYnNlcnZhYmxlU3RhdGVdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKCEhaXRlbS5pc05hcG9jZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKCdhZGRTdGF0ZScsIG9ic2VydmFibGVTdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtPy5zbWxwb2w/Lml4cF9zbWxfcHJpICE9IG51bGwgfHwgaXRlbT8uc21scG9sPy5peHAgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChjcmVhdGVTbWxQcmVmYWJGaWVsZChjb250ZW50KS5pdGVtVGVtcGxhdGUgYXMgRnVuY3Rpb24pLmNhbGwodGhpcywgaXRlbS5zbWxwb2wpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMDI1MDQzM1wiOyAvL1JDIDMwMjUwNDMzIDogWmFkYXQgc21sb3V2dVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIC8vcMWZZXNtxJtyb3bDoW7DrSBuYSBpdGVtIHRlbXBsYXRlIHByZWZhYnUsIGFieSB0byBieWxvIHN0ZWpuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnanMtc21sLW5vdC1pbml0JykuZmluZEZpZWxkcygpLmdmaWVsZCgnZGlzYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuID0gbmV3IEdvcmRpYy5VdGlscy5HQ2FuY2VsbGF0aW9uVG9rZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbignZ2lubGluZWRpYWxvZ2Nsb3NlJywgKCkgPT4geyBpZiAoY2FuY2VsbGF0aW9uVG9rZW4gIT09IG51bGwpIGNhbmNlbGxhdGlvblRva2VuLmNhbmNlbCgpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFByZWZhYihHZXRGb3JtU21sKGNvbnRlbnQpLmZvcm0uc2VjdGlvbnMhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgY3VzdG9tQ2xhc3M6ICdoaWRkZW4nIH0pLmFkZEZpZWxkKCdnZHVtbXlmaWVsZCcsICd3LWgnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0ZW1wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gJCh0aGlzKS5nZm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uID09IFwiYXBwbHlcIiAmJiBmb3JtLmhhc0NsYXNzKCdqcy1zbWwtbm90LWluaXQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZ2NvdmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5yZW1vdmVDbGFzcygnanMtc21sLW5vdC1pbml0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5sb2cuZGVidWcoXCJaamlzdGVuaSBwcmlzdHVwbm9zdGkgc21sb3V2eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJc0VuYWJsZVNtbG91dmEoY29udGVudCwgJCh0aGlzKSwgY2FuY2VsbGF0aW9uVG9rZW4hKS50aGVuKChwYXJhbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubG9nLmRlYnVnKFwiVnliZXIga3Vyem92eWNoIHJvemRpbHVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcHVzdGVuaSB2eWJlcnUgdHlwdSBrdXJ6b3Z5Y2ggcm96ZGlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFsZ29yaXRtdXNLdXJ6b3Z5Y2hSb3pkaWx1KGNvbnRlbnQsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5aYWRueSwgJCh0aGlzKSwgY2FuY2VsbGF0aW9uVG9rZW4hKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgLy8gcG9rdWQgbmVuw60gLT4gcMWZZXZlZGVtZSBuYSByZWplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubG9nLmRlYnVnKFwicmVqZWN0IDFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNsb3Nlc3QoJy5naW5saW5lZGlhbG9nJykuZ2lubGluZWRpYWxvZygnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzOiBHQWxnb3JpdG11c0tSUmV0dXJuRHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuUHJpc3R1cG5vc3RTbWxvdXZ5ID09PSBJbnRlcmZhY2UuR0VQcmlzdHVwbm9zdFNtbG91dnkuUHJpc3R1cG5hTmVwb3Zpbm5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCByZXMuUHJpc3R1cG5vc3RTbWxvdXZ5ID09PSBJbnRlcmZhY2UuR0VQcmlzdHVwbm9zdFNtbG91dnkuUHJpc3R1cG5hUG92aW5uYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgcmVzLlByaXN0dXBub3N0U21sb3V2eSA9PT0gSW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5Lk5ldXJjZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBudXRuZSB2eW1hemFuaSBzbWxvdXZ5XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5sb2cuZGVidWcoXCJyZWplY3QgMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGZvcm1EZXNjID0gR2V0Rm9ybVNtbChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtLmdmb3JtKCdjcmVhdGVGcm9tJywgZm9ybURlc2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoKS5ub3QoZmllbGQpLmdmaWVsZCgnZW5hYmxlJyk7Ly8uZ2ZpZWxkKCdtb2RlbCcsICdhcHBseScsIGR0bywgbW9kZWxPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCdpc05hcG9jZXQnKS5nZmllbGQoKCEhY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcz8uSXNJc3NwIHx8ICFjb250ZW50Lkdsb2JhbHMuUGFyYW1zPy5Qb3ZvbGl0TmFwb2NldE5hRlBTTUwgfHwgZHRvLmlzTmV3IHx8IGR0by5zbWxwb2w/LmFjX3NtbD8udHJpbSgpICYmIGR0by5zbWxwb2w/LmNpc2xvID09IG51bGwpID8gJ2Rpc2FibGUnIDogJ2VuYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmxvZy5kZWJ1ZyhcInJldHVybiAxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmxvZy5kZWJ1ZyhcIlNtbG91dnUgbmVsemUgdnlicmF0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5pbnNlcnRCZWZvcmUoZm9ybSkuZ2ZsYXNocGFuZWwoeyBsYWJlbDogXCJqcmVzOjMwMjUwNzk3XCIsIHN0YXRlOiBcIndhcm5pbmdcIiB9KTsgLy9SQyAzMDI1MDc5NyA6IFNtbG91dnUgbmVsemUgdnlicmF0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtLmhhc0NsYXNzKCdnY292ZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5nY292ZXIoJ2Rlc3Ryb3knKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGYgPSBmb3JtLmZpbmRGaWVsZHMoKS5maWx0ZXIoJzp2aXNpYmxlJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZi5nZmllbGQoJ29wdGlvbicsICdkaXNhYmxlZCcpKSBmLmdmaWVsZCgnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LklzSXNzcCkge1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpZF9oZHJfcmlzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMzRcIiwgLy9SQyAzMDI1MDEzNCA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTM1XCIsIC8vUkMgMzAyNTAxMzUgOiDFmMOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVpLWRpc2FibGVkXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkSHRtbENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2t1cl9yb3pcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMzZcIiwgLy9SQyAzMDI1MDEzNiA6IEtSXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZCBqcy1wb2xrclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHRhYmluZGV4OiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga3IgPSBHZXRUZXh0S3VyelJvemRpbHUoaXRlbSBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga3Iua29kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVG9vbHRpcFRlbXBsYXRlOiAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrciA9IEdldFRleHRLdXJ6Um96ZGlsdShpdGVtIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKHJvdzogSW50ZXJmYWNlLkdVY3RkcGVwRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cucHJpel9rdXJfcm96ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga3IgPSBHZXRUZXh0S3VyelJvemRpbHUocm93LnByaXpfa3VyX3JveiBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtyLmtvZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogZnVuY3Rpb24gKHJvdzogSW50ZXJmYWNlLkdVY3RkcGVwRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cucHJpel9rdXJfcm96ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga3IgPSBHZXRUZXh0S3VyelJvemRpbHUocm93LnByaXpfa3VyX3JveiBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNtbFByZWZhYkZpZWxkKGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSkge1xyXG4gICAgICAgIGNvbnN0IGxvZ292YW5pRXN1OiBHaW4uR2xvYmFscy5EaWFsb2dzLklHTG9nb3ZhbmkgPSB7XHJcbiAgICAgICAgICAgIEl4cDogY29udGVudC5JeHAsXHJcbiAgICAgICAgICAgIEFrdFpuYWNrYTogY29udGVudC5VY2V0bmlEb2tsYWREdG8uZG9rdW1lbnQ/LmFrdF96bmFja2EgPyBjb250ZW50LlVjZXRuaURva2xhZER0by5kb2t1bWVudD8uYWt0X3puYWNrYSBhcyBzdHJpbmc6XCJcIi8vY29udGVudC5VY2V0bmlEb2tsYWREdG8uQWt0Wm5hY2thIGFzIHN0cmluZyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBpbnB1dER0bzogUHJlZmFicy5TZWxlY3QuR0Vrb1Z5YmVyU21sb3V2eUlucHV0RHRvICYgT2JqZWN0TGl0ZXJhbDxhbnk+ID0ge1xyXG4gICAgICAgICAgICByb2tQb2w6IGNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXMhLlJvayBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgIGl4cHM6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlNlem5hbU5hdmF6YW55Y2hTbWx1dktQcmltRG9rbGFkdSBhcyBzdHJpbmdbXVxyXG4gICAgICAgICAgICAsIHBvdXplU21sb3V2eTogZmFsc2VcclxuICAgICAgICAgICAgLCBuYXZhemFuaU5hU2tsYWRidTogdHJ1ZVxyXG4gICAgICAgICAgICAsIHByaWpteTogZnVuY3Rpb24gKCkgeyByZXR1cm4gSXNUeXBVY3R1UHJpam1vdnkoY29udGVudCk7IH0vLyB6amlzdGkgemUgc2VydmVydVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvVnliZXJQb2xvemt5U21sb3V2eSh7XHJcbiAgICAgICAgICAgIGNhbk5ld0FuZFJlZnVuZDogIWNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LklzSXNzcCBhcyBib29sZWFuICYmIGNvbnRlbnQuR2xvYmFscy5QYXJhbXM/LlBvdm9saXROYXBvY2V0TmFGUFNNTCBhcyBib29sZWFuLFxyXG4gICAgICAgICAgICBwYXJlbnRDb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAvLyBudXRubyBkb3Jlc2l0XHJcblxyXG4gICAgICAgICAgICBlc3VMb2dvdmFuaTogbG9nb3ZhbmlFc3UsXHJcbiAgICAgICAgICAgIGlucHV0RHRvOiBpbnB1dER0byxcclxuICAgICAgICAgICAgbmV3UG9sU2VsZWN0T3B0aW9uczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBjYW5OZXdBbmRSZWZ1bmQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAsIGVzdUxvZ292YW5pOiBsb2dvdmFuaUVzdSxcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dER0bzogaW5wdXREdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogY29udGVudCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChpbnB1dER0bywgZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVzOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy96w61za8OhbsOtIGdyaWR1IGEgc2VzYsOtcsOhbsOtIGhvZG5vdCB6IGFrdHXDoWxuxJsgZWRpdG92YW7DqWhvIMWZw6Fka3Ug4oCTIHprb3XFoWVsIGpzZW0gdG8gdiBVQ1QsIG9zdGF0bsOtIG11c8OtIHrDrXNrYXQgZWxlbWVudCBncmlkdSBuxJtqYWsgcG8gc3bDqW1cclxuICAgICAgICAgICAgICAgIGdyaWQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB2YWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL25hc3RhdmVuw60gdnlob3Z1asOtY8OtIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAvL3RhZHkgdG8gY2hjZSBuxJtqYWvDvSBzb2Zpc3Rpa292YW7Em2rFocOtIHDFmcOtc3R1cCDigKYgbW/Fvm7DoSB6IHRvaG8gdWTEm2xhdCBuxJtqYWtvdSBmdW5rY2kgZG8gdXRpbHMgKERUTyAtPiB1ZXgpID9cclxuICAgICAgICAgICAgICAgIGlucHV0RHRvLnVleCA9IChjb250ZW50LnJvenNpcmVuYVZldGEpID8gW3ZhbHVlcyEudWVhLCB2YWx1ZXMhLnVlYiwgdmFsdWVzIS51ZWMsIHZhbHVlcyEudWVkLCB2YWx1ZXMhLnVlZSwgdmFsdWVzIS51ZWYsIHZhbHVlcyEudWVnLCB2YWx1ZXMhLnVlaCwgdmFsdWVzIS51ZWksIHZhbHVlcyEudWVqLCB2YWx1ZXMhLnRlMCwgdmFsdWVzIS50ZTEsIHZhbHVlcyEudGUyLCB2YWx1ZXMhLnRlMywgdmFsdWVzIS50ZTQsIHZhbHVlcyEudWVrLCB2YWx1ZXMhLnVlbCwgdmFsdWVzIS51ZW0sIHZhbHVlcyEudWVuLCB2YWx1ZXMhLnRlMDUsIHZhbHVlcyEudGUwNiwgdmFsdWVzIS50ZTA3LCB2YWx1ZXMhLnRlMDgsIHZhbHVlcyEudGUwOV1cclxuICAgICAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZXMhLnVlYSwgdmFsdWVzIS51ZWIsIHZhbHVlcyEudWVjLCB2YWx1ZXMhLnVlZCwgdmFsdWVzIS51ZWUsIHZhbHVlcyEudWVmLCB2YWx1ZXMhLnVlZywgdmFsdWVzIS51ZWgsIHZhbHVlcyEudWVpLCB2YWx1ZXMhLnVlaiwgdmFsdWVzIS50ZTAsIHZhbHVlcyEudGUxLCB2YWx1ZXMhLnRlMiwgdmFsdWVzIS50ZTMsIHZhbHVlcyEudGU0XTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ByaXByYXZhIGVudW11XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJpcGFkeSA9IEdvcmRpYy5Fa28uR1Z5YmVyU21sb3V2eS5QcmlwYWR5RW51bTtcclxuICAgICAgICAgICAgICAgIGxldCBwcmlqbW92ZSA9IEdvcmRpYy5Fa28uR1Z5YmVyU21sb3V2eS5QcmlqbW92ZUVudW07XHJcbiAgICAgICAgICAgICAgICBsZXQgdnlkYWpvdmUgPSBHb3JkaWMuRWtvLkdWeWJlclNtbG91dnkuVnlkYWpvdmVFbnVtO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbmFzdGF2ZW5pIGNoZWNrYm94dVxyXG4gICAgICAgICAgICAgICAgLy9maWx0ZXIucHJpam1vdmVfdHlwID0gW3ByaWptb3ZlLlNtbG91dnksIHByaWptb3ZlLk9iamVkbmF2a3ldO1xyXG4gICAgICAgICAgICAgICAgLy9maWx0ZXIudnlkYWpvdmVfdHlwID0gW3Z5ZGFqb3ZlLlNtbG91dnksIHZ5ZGFqb3ZlLk9iamVkbmF2a3ldO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLnNtbHV2bmlfcHJpcGFkeSA9IFtwcmlwYWR5LlNlU2NodmFsZW5vdVBvbG96a291LCBwcmlwYWR5LlNWeWhvdnVqaWNpUG9sb3prb3VdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0Rm9ybVNtbChjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgICAgIGxldCBzbWxvdXZ5UHJlZmFiID0gY3JlYXRlU21sUHJlZmFiRmllbGQoY29udGVudCk7XHJcbiAgICAgICAgbGV0IGZybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0xMi0xMS0xXCJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnJtLmFkZFJvdyhcIlNtbG91dmFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHNtbG91dnlQcmVmYWIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbWxGaWVsZCA9IGNvbnRlbnQuZWxlbWVudC5maW5kKFwiLmpzLXNtbEZpZWxkXCIpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hcG9jZXRGaWVsZCA9ICQoXCIuanMtbmFwb2NldFwiKS5jbG9zZXN0KFwiLmdmaWVsZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gc21sRmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoY3R4LnZhbHVlPy5peHBfc21sX3ByaSB8fCBjdHgudmFsdWU/Lml4cCkpIHsgLy8gdiBwb2RzdGF0xJsgbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXBvY2V0RmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpLmdmaWVsZCgnZGlzYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4Py52YWx1ZT8uaXNOZXcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2aW0gc2ksIHplIHNlIGplZG5hIG8gbm92b3UgcG9sb3prdSBhIHBvdm9sZW5pIHphc2tydGF2YXRrYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pc05ldyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmlzTmFwb2NldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFwb2NldEZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpLmdmaWVsZCgnZGlzYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFwb2NldEZpZWxkLmdmaWVsZCgnZW5hYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXV6ZSB0byB6dXN0YXQgbmVwcmlzdHVwbmUsIHBva3VkIGpzZW0gbmVqcHJ2ZSB2eWJyYWwgbm92b3UgcG9sb3prdSBhIHBhayBqc2VtIHRvIGNodGVsIHptZW5pdCBuYSBqaXogZXhpc3R1amljaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXBvY2V0RmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBqZSBzdGF0bmkgcG9rbGFkbmEsIG5lYm8gbmVuaSBwb3ZvbGVuYSBwYXJhbWV0cmVtLCBuZW5pIG1vem55IG5hcG9jZXRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISFjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5Jc0lzc3AgfHwgIWNvbnRlbnQuR2xvYmFscy5QYXJhbXM/LlBvdm9saXROYXBvY2V0TmFGUFNNTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFwb2NldEZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4Py52YWx1ZT8uaXhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC52YWx1ZS5peHBfc21sX3ByaSA9IGN0eC52YWx1ZS5peHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuc21scG9sID0gZGF0YS5zbWxwb2wgfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnNtbHBvbC5peHBfc21sX3ByaSA9IGN0eC52YWx1ZS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbWxwb2xcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3AgPT09IFwiYXBwbHlcIiB8fCBvcCA9PT0gJ2NvbGxlY3QnICYmICEkKHRoaXMpLmdmb3JtKCkuaGFzQ2xhc3MoJ2djb3ZlcicpIC8qJiYgJCh0aGlzKS5nZmllbGQoJ2dldFZhbHVlQXN5bmMnKS5zdGF0ZSgpICE9ICdwZW5kaW5nJyovICYmICEkKHRoaXMpLmdmaWVsZCgnb3B0aW9uJywgJ2Rpc2FibGVkJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInNtbHBvbFwiO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsQnV0dG9uczogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pLmFkZFJvdyh7IGxheW91dERlc2NyaXB0b3I6ICdMMU0xUzEgTE1TLTAtMTEtMScgfSkuYWRkRmllbGQoXHJcbiAgICAgICAgICAgICAgICAnZ2NoZWNrJywge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2lzTmFwb2NldCcsXHJcbiAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISF2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3AgPT09IFwiYXBwbHlcIiB8fCBvcCA9PT0gJ2NvbGxlY3QnICYmICEkKHRoaXMpLmdmb3JtKCkuaGFzQ2xhc3MoJ2djb3ZlcicpIC8qJiYgJCh0aGlzKS5nZmllbGQoJ2dldFZhbHVlQXN5bmMnKS5zdGF0ZSgpICE9ICdwZW5kaW5nJyAqLyYmICEkKHRoaXMpLmdmaWVsZCgnb3B0aW9uJywgJ2Rpc2FibGVkJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJpc05hcG9jZXRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtbmFwb2NldFwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMDI1MDgyMFwiLCAvL1JDIDMwMjUwODIwIDogTsOhcG/EjWV0IG5hIHBvbG/Fvmt1IHNtbG91dnlcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhIWNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LklzSXNzcCB8fCAhY29udGVudC5HbG9iYWxzLlBhcmFtcz8uUG92b2xpdE5hcG9jZXROYUZQU01MLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZybTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiBcclxuICAgICAqIFByZXZvZCBudW1lcmlja2UgaG9kbm90eSBLUiBuYSB0ZXh0b3ZlIGhvZG5vdHkgKGtvZC9uYXpldilcclxuICAgICAqIFxyXG4gICAgICogKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRUZXh0S3VyelJvemRpbHUodHlwS3VyelJvejogSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdSk6IHsga29kLCBuYW1lIH0ge1xyXG5cclxuICAgICAgICBpZiAodHlwS3VyelJveiA9PT0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5aaXNrKVxyXG4gICAgICAgICAgICByZXR1cm4geyBrb2Q6IFwiWktcIiwgbmFtZTogXCIxIFwiICsgXCJqcmVzOjMwMjUwNDExXCIgfTsgLy9SQyAzMDI1MDQxMSA6IEt1cnpvdsO9IHppc2tcclxuICAgICAgICBlbHNlIGlmICh0eXBLdXJ6Um96ID09PSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Lk9wcmF2YVppc2t1KVxyXG4gICAgICAgICAgICByZXR1cm4geyBrb2Q6IFwiT1pLXCIsIG5hbWU6IFwiMiBcIiArIFwianJlczozMDI1MDQxMlwiIH07IC8vUkMgMzAyNTA0MTIgOiBPcHJhdmEga3Vyem92w6lobyB6aXNrdVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cEt1cnpSb3ogPT09IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuS3Vyem92YVp0cmF0YVByaVJlYWxpemFjaVZ5ZGFqZSlcclxuICAgICAgICAgICAgcmV0dXJuIHsga29kOiBcIlpUVlwiLCBuYW1lOiBcIjMgXCIgKyBcImpyZXM6MzAyNTA0MTNcIiB9OyAvL1JDIDMwMjUwNDEzIDogS3Vyem92w6EgenRyw6F0YSBwxZlpIHJlYWxpemFjaSB2w71kYWplXHJcbiAgICAgICAgZWxzZSBpZiAodHlwS3VyelJveiA9PT0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5PcHJhdmFLdXJ6b3ZlWnRyYXR5UHJpUmVhbGl6YWNpVnlkYWplKVxyXG4gICAgICAgICAgICByZXR1cm4geyBrb2Q6IFwiT1pUVlwiLCBuYW1lOiBcIjQgXCIgKyBcImpyZXM6MzAyNTA0MTRcIiB9OyAvL1JDIDMwMjUwNDE0IDogT3ByYXZhIGt1cnpvdsOpIHp0csOhdHkgcMWZaSByZWFsaXphY2kgdsO9ZGFqZVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cEt1cnpSb3ogPT09IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuSmlueVZ5ZGFqKVxyXG4gICAgICAgICAgICByZXR1cm4geyBrb2Q6IFwiSlZcIiwgbmFtZTogXCI1IFwiICsgXCJqcmVzOjMwMjUwNDE1XCIgfTsgLy9SQyAzMDI1MDQxNSA6IEppbsOpIHbDvWRhamVcclxuICAgICAgICBlbHNlIGlmICh0eXBLdXJ6Um96ID09PSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Lkt1cnpvdmFadHJhdGFQcmlSZWFsaXphY2lQcmlqbXUpXHJcbiAgICAgICAgICAgIHJldHVybiB7IGtvZDogXCJaVFBcIiwgbmFtZTogXCI2IFwiICsgXCJqcmVzOjMwMjUwNDE2XCIgfTsgLy9SQyAzMDI1MDQxNiA6IEt1cnpvdsOpIHp0csOhdHkgcMWZaSByZWFsaXphY2kgcMWZw61qbXVcclxuICAgICAgICBlbHNlIGlmICh0eXBLdXJ6Um96ID09PSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Lk9wcmF2YUt1cnpvdmVadHJhdHlQcmlSZWFsaXphY2lQcmlqbXUpXHJcbiAgICAgICAgICAgIHJldHVybiB7IGtvZDogXCJPWlRQXCIsIG5hbWU6IFwiNyBcIiArIFwianJlczozMDI1MDQxN1wiIH07IC8vUkMgMzAyNTA0MTcgOiBPcHJhdmEga3Vyem92w6kgenRyw6F0eSBwxZlpIHJlYWxpemFjaSBwxZnDrWptdVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgLy9JbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1LlphZG55XHJcbiAgICAgICAgICAgIHJldHVybiB7IGtvZDogXCIgXCIsIG5hbWU6IFwianJlczozMDI1MDI3MFwiIH07IC8vUkMgMzAyNTAyNzAgOiBOZW5hc3RhdmVub1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBOYWN0ZW5pIHphcGlzdSBkb2tsYWR1XHJcbiAgICAgICAgKiBcclxuICAgICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVsb2FkUmVjb3Jkcyhjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIHJlZnJlc2g6IGJvb2xlYW49dHJ1ZSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDU2NFwiKTsgLy9SQyAzMDI1MDU2NCA6IE5hxI3DrXTDoW0uLi5cclxuICAgICAgICBsZXQgbXlmaWx0ciA9XHJcbiAgICAgICAgICAgIHsgaXhwOiBjb250ZW50LlVjZXRuaURva2xhZER0by5peHAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgbGV0IG5ld1dheSA9IHRydWU7XHJcbiAgICAgICAgaWYgKG5ld1dheSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLnJlYWRTaW1wbGVEb2tsYWQoeyBQaWREb2tsYWR1OiBjb250ZW50LlVjZXRuaURva2xhZER0by5peHAgfSkuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1ID0gcmVzdWx0LkhsYXZpY2thITtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuZGF0X3ptZW5hID0gcmVzdWx0LkRhdHVtWm1lbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uU3RhdkRva2xhZHUgPSByZXN1bHQuU3RhdkRva2xhZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uU3RhdlR4dCA9IHJlc3VsdC5TdGF2VHh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeSA9IHJlc3VsdC5aYXBpc3k7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5VY2V0bmlEb2tsYWREdG8uUGVybWlzc2lvbnMgPSByZXN1bHQuRG9rbGFkUGVybWlzc2lvbnMhO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLklzTXVzaU5hdmF6YXQgPSByZXN1bHQuSXNNdXNpTmF2YXphdDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gR2V0R3JpZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5aYXBpc3khLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuZW5hYmxlZCA9IHJvdy5lbmFibGVkICYmIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuc196YXUgIT09IDUwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLy8gMTEuOC4yMDI1IHVwcmF2YVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmlldy51cGRhdGVEYXRhKHJlc3VsdC5aYXBpc3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWZyZXNoQWZ0ZXJBY3Rpb24oY29udGVudCwgdHJ1ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyBjb250ZW50LmVuZE9wZXJhdGlvbigpIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlVjdERva2xhZFphcGlzLmxpc3QoeyBmaWx0ZXJzOiBteWZpbHRyIH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHNlem5hbVphcGlzdURva2xhZHUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gR2V0R3JpZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlem5hbVphcGlzdURva2xhZHUuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5lbmFibGVkID0gcm93LmVuYWJsZWQgJiYgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5zX3phdSAhPT0gNTBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIDExLjguMjAyNSB1cHJhdmFcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEoc2V6bmFtWmFwaXN1RG9rbGFkdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHNlem5hbVphcGlzdURva2xhZHUsIHsga2V5OiBcIml4cCxyYWRla196XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IGNvbnRlbnQuZW5kT3BlcmF0aW9uKCkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdmFyIG15R3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgLy9teUdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5VY3REb2tsYWRaYXBpcy5saXN0KHsgZmlsdGVyczogbXlmaWx0ciB9KSkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBPYm5vdmVuaSBncmlkdSB6ZSB6YXNsYW55Y2ggZGF0XHJcbiAgICAgICAgKiBcclxuICAgICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVmcmVzaEdyaWQoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCBkYXRhOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0ZHBlcER0b1tdKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwLHJhZGVrX3pcIiB9KSwgdHJ1ZSk7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBmdW5jdGlvbiBTd2l0Y2hUb1JlY29yZHNcclxuICAgICAqIFxyXG4gICAgICogIFByZXBudXRpIG5hIHphbG96a3Ugc2UgemFwaXN5XHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFN3aXRjaFRvUmVjb3Jkcyhjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUpOiB2b2lkIHtcclxuICAgICAgICBTd2l0Y2hUYWIoY29udGVudCwgY29udGVudC5teVRhYnMucm93cyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGZ1bmN0aW9uIFN3aXRjaFRhYlxyXG4gICAgICogXHJcbiAgICAgKiBQcmVwaW5hbmkgemFsb3pla1xyXG4gICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVRhYnNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFN3aXRjaFRhYihjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIG5hbWVUYWJzOiBzdHJpbmcpIHsgICAgICAgIFxyXG4gICAgICAgIGlmIChjb250ZW50LlBvbG96a3lWaWV3ID09IDAvKiAmJiBuYW1lVGFicyAhPT0gY29udGVudC5teVRhYnMucm93cyovKVxyXG4gICAgICAgICAgICBjb250ZW50LmVsZW1lbnQuZmluZChcIi5ndGFibWFuYWdlclwiKS5ndGFibWFuYWdlcihcInNldEFjdGl2ZVwiLCBuYW1lVGFicyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE96bmFjZW5pIGRva2xhZHUgamFrbyBpbnRlcm5pXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtHb3JkaWMuRWtvLkludGVyZmFjZS5HVWN0c3BpZER0b30gW2RhdGFdXHJcbiAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxhbnk+fVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gT3puYWNpdEludGVybmlEb2tsYWQoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCBpY286IHN0cmluZyk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gR2V0S3RnVHlwQXN5bmMoY29udGVudClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoY29udGVudC5HbG9iYWxzLkVrb1BhcmFtcyEuSUNPID09PSBpY28gJiZcclxuICAgICAgICAgICAgICAgICAgICAodmFsdWUgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFS2F0ZWdvcmllRG9rbGFkdS5VY2V0bmlEb2tsYWREYW5vdnkgYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfHwgdmFsdWUgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFS2F0ZWdvcmllRG9rbGFkdS5PcHJhdmFVY2V0bmlob0Rva2xhZHVEYW5vdmVobyBhcyBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmludF9kb2sgPT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2hvd0ZsYXNoKHsgaWQ6IGZsYXNoUmVzdWx0LCBpY29uOiBcImdpLXRpY2tcIiwgbGFiZWw6IFwianJlczozMDI1MDUxNVwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgdGltZXI6IDUwMDAgfSkgLy9SQyAzMDI1MDUxNSA6IE5hc3RhdmVuw60gaW50ZXJuw61obyBkb2tsYWR1IHpydcWhZW5vXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmludF9kb2sgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuSW50ZXJuaURva2xhZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVmcmVzaFN0YXR1cyhjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50Lkdsb2JhbHMuUGFyYW1zIS5Qb3ZvbGVuaVByYWNlU0ludGVybmltRGFuRG9rbGFkZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheihjb250ZW50LCBcImpyZXM6MzAyNTA1MTNcIikgLy9SQyAzMDI1MDUxMyA6IEplZG7DoSBzZSBvIGludGVybsOtIGRva2xhZD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIllFU1wiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LkludGVybmlEb2tsYWQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmludF9kb2sgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBmbGFzaFJlc3VsdCwgaWNvbjogXCJnaS10aWNrXCIsIGxhYmVsOiBcImpyZXM6MzAyNTA1MTRcIiwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCIsIHRpbWVyOiA1MDAwIH0pIC8vUkMgMzAyNTA1MTQgOiBEb2tsYWQgYnlsIG5hc3RhdmVuIGpha28gaW50ZXJuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVmcmVzaFN0YXR1cyhjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LkludGVybmlEb2tsYWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmludF9kb2sgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBmbGFzaFJlc3VsdCwgaWNvbjogXCJnaS10aWNrXCIsIGxhYmVsOiBcImpyZXM6MzAyNTA1MTVcIiwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCIsIHRpbWVyOiA1MDAwIH0pIC8vUkMgMzAyNTA1MTUgOiBOYXN0YXZlbsOtIGludGVybsOtaG8gZG9rbGFkdSB6cnXFoWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWEgc2Ugem9icmF6aXQgS1BJXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBJc1Nob3dLUEkoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIHJldHVybiAhSXNFZGl0TW9kZShjb250ZW50KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogIEFrdHVhbGl6YWNlIEtQSVxyXG4gICAgICogZnVuY3Rpb24gUmVmcmVzaEtQSVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJlZnJlc2hLUEkoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmIChJc0VkaXRNb2RlKGNvbnRlbnQpKSByZXR1cm47XHJcbiAgICAgICAgLy8gcG9rdWQga3BpIG5lanNvdSB2aWRldCwgbmljIG5lZGVsZWpcclxuICAgICAgICBpZiAoIUlzU2hvd0tQSShjb250ZW50KSkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHN0YXYgZG9rbGFkdVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuU3RhdkRva2xhZHUgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFU3RhdnlEb2tsYWR1LlN0b3Jubykge1xyXG4gICAgICAgICAgICBjb250ZW50LmtwaXMhLmtwaVNUQVYuZGF0YSA9IHsgY29sb3I6IFwicmVkXCIsIHRleHQ6IFwianJlczozMDI1MDM1NVwiLCB2YWx1ZTogXCIgXCIgLH07ICAgICAgICAgICAgICAgICAgICAgIC8vUkMgMzAyNTAzNTUgOiBEb2tsYWQgamUgc3Rvcm5vdmFuw71cclxuICAgICAgICAgICAgY29udGVudC5rcGlzIS5rcGlTVEFWLnZpc2libGUgPSB0cnVlOyBcclxuICAgICAgICAgICAgY29udGVudC5rcGlzIS5rcGlTVEFWLnNob3dUZXh0SWNvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnRlbnQua3BpcyEua3BpU1RBVi5jaGFydFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb250ZW50LmtwaXMhLmtwaVNUQVYudGV4dCA9IFwiU3Rvcm5vXCI7XHJcbiAgICAgICAgICAgIGNvbnRlbnQua3BpcyEua3BpU1RBVi5jdXN0b21DbGFzcyA9IFwia3BpX3N0b3Jub3ZhblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLlN0YXZEb2tsYWR1ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVN0YXZ5RG9rbGFkdS5VemF2cmVubykge1xyXG4gICAgICAgICAgICBjb250ZW50LmtwaXMhLmtwaVNUQVYuZGF0YSA9IHsgY29sb3I6IFwiYmx1ZVwiLCAgdGV4dDogXCJqcmVzOjMwMjUwMzUzXCIsIHZhbHVlOiBcIiBcIiB9OyAgICAgICAgICAgICAgICAgICAgICAvL1JDIDMwMjUwMzUzIDogRG9rbGFkIGplIHV6YXbFmWVuw71cclxuICAgICAgICAgICAgY29udGVudC5rcGlzIS5rcGlTVEFWLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb250ZW50LmtwaXMhLmtwaVNUQVYuc2hvd1RleHRJY29uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnRlbnQua3BpcyEua3BpU1RBVi5jaGFydFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1IS5TdGF2RG9rbGFkdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuWmF1Y3RvdmFubykge1xyXG4gICAgICAgICAgICBjb250ZW50LmtwaXMhLmtwaVNUQVYuZGF0YSA9IHsgY29sb3I6IFwiZ3JlZW5cIiwgIHRleHQ6IFwianJlczozMDI1MDM1NFwiLCB2YWx1ZTogXCIgXCIgfTsgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMDI1MDM1NCA6IERva2xhZCBqZSB6YcO6xI10b3ZhbsO9XHJcbiAgICAgICAgICAgIGNvbnRlbnQua3BpcyEua3BpU1RBVi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29udGVudC5rcGlzIS5rcGlTVEFWLnNob3dUZXh0SWNvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb250ZW50LmtwaXMhLmtwaVNUQVYuY2hhcnRWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbHNlKi9cclxuICAgICAgICAvL2NvbnRlbnQua3BpcyEua3BpU1RBVi52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vdmFyIHZhbHVlczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGRwZXBEdG9bXSA9IFtdO1xyXG4gICAgICAgIC8vdmFyIHZhbHVlczogYW55ID0ge307XHJcblxyXG4gICAgICAgIC8vesOtc2vDoW7DrSBncmlkdSBhIHNlc2LDrXLDoW7DrSBob2Rub3QgeiBha3R1w6FsbsSbIGVkaXRvdmFuw6lobyDFmcOhZGt1IOKAkyB6a291xaFlbCBqc2VtIHRvIHYgVUNULCBvc3RhdG7DrSBtdXPDrSB6w61za2F0IGVsZW1lbnQgZ3JpZHUgbsSbamFrIHBvIHN2w6ltXHJcbiAgICAgICAgLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR2V0R3JpZChjb250ZW50KS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHZhbHVlcyk7XHJcbiAgICAgICAgbGV0IGdyaWQgPSBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR2V0R3JpZChjb250ZW50KTtcclxuICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHZhbHVlcyA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRBbGxSb3dzPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkcGVwRHRvPihncmlkKTtcclxuICAgICAgICBpZiAodmFsdWVzID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBsZXQgc3VtYTogRGVjaW1hbCA9IHBhcnNlRGVjaW1hbCgwKTtcclxuICAgICAgICAvL2NvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlphcGlzeSEuZm9yRWFjaCgoemFwaXMpID0+IHsgc3VtYSA9IHN1bWEucGx1cyhwYXJzZURlY2ltYWwoemFwaXMuYzAgYXMgYW55KS5taW51cyhwYXJzZURlY2ltYWwoemFwaXMuYzEgYXMgYW55KSkpIH0pO1xyXG4gICAgICAgIHZhbHVlcyEuZm9yRWFjaCgoemFwaXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHphcGlzID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB6YXBpcyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHphcGlzLmMwID09PSBcInVuZGVmaW5lZFwiIHx8IHphcGlzLmMwID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgemFwaXMuYzEgPT09IFwidW5kZWZpbmVkXCIgfHwgemFwaXMuYzEgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgc3VtYSA9IHN1bWEucGx1cyhwYXJzZURlY2ltYWwoemFwaXMuYzAgYXMgYW55KS5taW51cyhwYXJzZURlY2ltYWwoemFwaXMuYzEhKSkpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50LmtwaXM/LmtwaVNUQVZZICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICBjb250ZW50LmtwaXMhLmtwaVNUQVZZLnVwZGF0ZSh7LyogdmFsdWU6IHN1bWEsIG1lYW5pbmc6IHN1bWEuZXEoMCkgPyBcInBvc2l0aXZlXCIgOiBcIm5lZ2F0aXZlXCIsKi8gdmlzaWJsZTogIXN1bWEuZXEoMCkgfSk7XHJcbiAgICAgICAgLy9jb250ZW50LmtwaXMhLmtwaVNUQVYudXBkYXRlKHsgdmlzaWJsZTogdHJ1ZSB9KTtcclxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQua3Bpcz8ua3BpUG9zWm1lbmEgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIGNvbnRlbnQua3BpcyEua3BpUG9zWm1lbmEudXBkYXRlKHsgdmlzaWJsZTogdHJ1ZSB9KTtcclxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQua3Bpcz8ua3BpUmFka3kgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIGNvbnRlbnQua3BpcyEua3BpUmFka3kudXBkYXRlKHsgdmFsdWU6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdShncmlkKSBhcyBhbnksIHZpc2libGU6IHRydWUgfSk7XHJcbiAgICAgICAgLy9jb250ZW50LlVjZXRuaURva2xhZER0by5Qb2NldE5hdmF6YW55Y2hEb2tsYWR1XHJcbiAgICAgICAgbGV0IHZpc2libGUgPSBjb250ZW50LlVjZXRuaURva2xhZER0by5Qb2NldE5hdmF6YW55Y2hEb2tsYWR1ISA+IDE7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50LmtwaXM/LmtwaVZBWkJZICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQua3BpcyEua3BpVkFaQlk/LnVwZGF0ZSh7IHZhbHVlOiBjb250ZW50LlVjZXRuaURva2xhZER0by5Qb2NldE5hdmF6YW55Y2hEb2tsYWR1LCB2aXNpYmxlOiB2aXNpYmxlIH0pO1xyXG4gICAgICAgICAgICBjb250ZW50LmtwaXMhLmtwaVZBWkJZPy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50LmtwaXM/LmtwaVNUQVZTdG9ybm8gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLklkZW50aWZpa2F0b3JTdG9ybmEgPT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmtwaXMhLmtwaVNUQVZTdG9ybm8udXBkYXRlKHsgcHJpbWFyeVRleHQ6IFwiXCIsIHZpc2libGU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uZWtvX2FrdCA9PT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5rcGlzIS5rcGlTVEFWU3Rvcm5vLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0OiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHU/LmVrb19ha3QgPT09IDUwMCA/IFwianJlczozMDI1MDgzOFwiIC8vUkMgMzAyNTA4MzggOiBTdG9ybm92YWPDrSBkb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcImpyZXM6MzAyNTA4MzVcIiwgLy9SQyAzMDI1MDgzNSA6IFN0b3Jub3ZhbsO9IGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0OiBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2U3Rvcm51amljaWhvVHh0ISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogY29udGVudC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5la29fYWt0ID09PSA1MDAgPyBjb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2U3Rvcm51amljaWhvISA8IEVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuWmF1Y3RvdmFubyA/IFwibmVnYXRpdmVcIiA6IFwicG9zaXRpdmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgY29udGVudC5rcGlzIS5rcGlTVEFWU3Rvcm5vLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcHJpbWFyeVRleHQ6IFwianJlczozMDI1MDgzNVwiLC8vUkMgMzAyNTA4MzUgOiBTdG9ybm92YW7DvSBkb2tsYWRcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHNlY29uZGFyeVRleHQ6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlN0YXZTdG9ybnVqaWNpaG9UeHQhXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGVudC5rcGlzPy51cGRhdGUoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogWm9icmF6ZW5pIGRva2xhZHUgZGxlIHBpZFxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNob3dEb2tsYWQoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50LlVjZXRuaURva2xhZER0by5JZGVudGlmaWthdG9yU3Rvcm5hICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5ab2JyYXpEZXRhaWxEbGVJWFAoeyBjb250ZW50OiBjb250ZW50LCBpeHA6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLklkZW50aWZpa2F0b3JTdG9ybmEhLCBzYW1vc3RhbmVPa25vOiBmYWxzZSwgZWRpdGFjZTogZmFsc2UsIHBvbG96a3k6ZmFsc2UgfSk7XHJcbiAgICAgICAgLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5ab2JyYXpEZXRhaWxEbGVJWFBPbGQoY29udGVudCwgY29udGVudC5VY2V0bmlEb2tsYWREdG8uSWRlbnRpZmlrYXRvclN0b3JuYSBhcyBzdHJpbmcsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICAvLyBuYXN0YXZlbmkgc3RhdHVzb3ZlaG8gcmFka3VcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXRTdGF0dXMoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCB0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgZ3JpZCA9IEdldEdyaWQoY29udGVudCk7XHJcbiAgICAgICAgLy8gb3ByYXZhIHogZHV2b2R1IG1vem5laG8gcGFkYW5pXHJcbiAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChncmlkW1wiZ2dyaWRcIl0gPT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgZ3JpZC5nZ3JpZCgnc3RhdHVzV2lkZ2V0JywgJ2lkLXN0YXZ5LXdpZGdldHUnKS5odG1sKHRleHQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBLdXJ6b3ZlIHJvemRpbHkgXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICogQHBhcmFtIHR5cEt1cnpSb3pcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEFsZ29yaXRtdXNLdXJ6b3Z5Y2hSb3pkaWx1KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgdHlwS3VyelJvejogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1LCByZWxhdGVkRWxlbWVudD86IEpRdWVyeSwgY2FuY2VsbGF0aW9uVG9rZW4/OiBHb3JkaWMuVXRpbHMuR0NhbmNlbGxhdGlvblRva2VuKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWN0LldlYkNsaWVudC5HQWxnb3JpdG11c0tSUmV0dXJuRHRvPiB7XHJcbiAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuPy5jYW5jZWxsZWQpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KGZhbHNlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgY29udGVudC5sb2cuZGVidWcoXCJBbGdvcml0bXVzS3Vyem92eWNoUm96ZGlsdSAtIHN0YXJ0XCIpO1xyXG4gICAgICAgIGxldCBwcmlzdHVwbm9zdFNtbG91dnk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5ID0gSW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5Lk5ldXJjZW5vO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpZiAoIWNvbnRlbnQuR2xvYmFscy5Fa29QYXJhbXM/LklzSXNzcCkge1xyXG4gICAgICAgICAgICBjb250ZW50LmxvZy5kZWJ1ZyhcIk5lbsOtIElJU1NQIC0gbmVzam91IGt1cm92w6kgcm96ZMOtbHlcIik7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZTogR0FsZ29yaXRtdXNLUlJldHVybkR0byA9IHsgUHJpc3R1cG5vc3RTbWxvdXZ5OiBJbnRlcmZhY2UuR0VQcmlzdHVwbm9zdFNtbG91dnkuUHJpc3R1cG5hTmVwb3Zpbm5hLCBUeXBLdXJ6Um96ZGlsdTogdHlwS3VyelJveiB9O1xyXG4gICAgICAgICAgICBjb250ZW50LmxvZy5kZWJ1ZyhcInJldHVyblZhbHVlIHswfVwiLCByZXR1cm5WYWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXR1cm5WYWx1ZSkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIEdldEN1cnJlbnRFZGl0Um93KGNvbnRlbnQsIGZhbHNlKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4/LmNhbmNlbGxlZCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGVrOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0ZHBlcER0byA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGxldCB2c3R1cDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFphcGlzUmV6ZXJ2YWNlSUlTU1BSZXF1ZXN0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIElkTWVzc2FnZTogXCJcIiwgSXNQYW06IGZhbHNlLCBEYXR1bVBvc2xlZG5pWm1lbnlEb2tsYWR1OiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBUeXBacHJhY292YW5pOiBJbnRlcmZhY2UuR0VVY3RUeXBacHJhY292YW5pLkJlektvbnRyb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwRGVuOiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgWmFwaXM6IHJhZGVrLFxyXG4gICAgICAgICAgICAgICAgICAgIFBpZERva2xhZHU6IGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSEuaXhwLFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjYXN0a2E6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKTsvLz0gcmFkZWsuYzEgLSByYWRlay5jMDtcclxuICAgICAgICAgICAgICAgIGNhc3RrYSA9IGNhc3RrYS5wbHVzKHBhcnNlRGVjaW1hbChyYWRlay5jMSBhcyBhbnkpLm1pbnVzKHBhcnNlRGVjaW1hbChyYWRlay5jMCBhcyBhbnkpKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBqZSB2eXNsZWRlayBudWxhLCBuaWthbSBzZSBuZXBva3JhY3VqZVxyXG4gICAgICAgICAgICAgICAgaWYgKGNhc3RrYS5pc1plcm8oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubG9nLmRlYnVnKFwiUm96ZMOtbCBNRC1EQUwgPSAwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNsb3ppbSB2eXNsZWRub3UgaG9kbm90dVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZTogR0FsZ29yaXRtdXNLUlJldHVybkR0byA9IHsgUHJpc3R1cG5vc3RTbWxvdXZ5OiBJbnRlcmZhY2UuR0VQcmlzdHVwbm9zdFNtbG91dnkuTmV1cmNlbm8sIFR5cEt1cnpSb3pkaWx1OiByYWRlay5wcml6X2t1cl9yb3ogfTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmxvZy5kZWJ1ZyhcInJldHVyblZhbHVlIHswfVwiLCByZXR1cm5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJldHVyblZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRlbnQubG9nLnRyYWNlKFwiZG9wbG5lbmlaYXBpc3VQb2xvemthbWlJSVNTUCAtIHN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkWmFwaXMuZG9wbG5lbmlaYXBpc3VQb2xvemthbWlJSVNTUCh7IHJxOiB2c3R1cCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5sb2cudHJhY2UoXCJkb3BsbmVuaVphcGlzdVBvbG96a2FtaUlJU1NQIC0gcmVzdWx0OiB7MH1cIixyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4/LmNhbmNlbGxlZCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LklzS3Vyem92ZVJvemRpbHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubG9nLmRlYnVnKFwiSmVkbsOhIHNlIG8ga3Vyem92w6kgcm96ZMOtbHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdnN0dXBEaWFsb2c6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkdBbGdvcml0bXVzS1JSZXR1cm5EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJpc3R1cG5vc3RTbWxvdXZ5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVByaXN0dXBub3N0U21sb3V2eS5OZXVyY2VubyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBLdXJ6Um96ZGlsdTogdnN0dXAuWmFwaXM/LnByaXpfa3VyX3Jvej8/MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaWs6IHJlc3VsdC5JSVNTUEF0dHIhLnR5cF9waWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSG9kbm90YTogY2FzdGthLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEt1cnpvdmVSb3pkaWx5UG92aW5uYVNtbG91dmFaUlA6IGNvbnRlbnQuR2xvYmFscy5QYXJhbXMhLkt1cnpvdmVSb3pkaWx5UG92aW5uYVNtbG91dmFaUlAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkbGcgPSBjb250ZW50LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdVY3RLdXJ6b3ZlUm96ZGlseURsZywgdnN0dXBEaWFsb2csIHsgdGl0bGU6IFwiXCIsIHdpZHRoOiA4MDAsIGhlaWdodDogNjAwLCByZXNpemFibGU6IHRydWUsIHJlbGF0ZWQ6IHJlbGF0ZWRFbGVtZW50IH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGZyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGxnLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCBvYmo6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkdBbGdvcml0bXVzS1JSZXR1cm5EdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4/LmNhbmNlbGxlZCkgcmV0dXJuIGRmci5yZWplY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm5WYWx1ZSA9IG9iajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemFwaXN1IHZ5c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICB2c3R1cC5aYXBpcy5wcml6X2t1cl9yb3ogPSBvYmouVHlwS3VyelJvemRpbHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICB2c3R1cC5aYXBpcy5hY19zbWwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgdnN0dXAuWmFwaXMuaXhwX3NtbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICB2c3R1cC5aYXBpcy5jaXNsb19zbWwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgdnN0dXAuWmFwaXMucm9rX3NtbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAuWmFwaXMuc21sb3V2YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlZGl0aW5nUm93ID0gKEdldEdyaWQoY29udGVudCkgYXMgSlF1ZXJ5KS5maW5kKFwiLnJvdy5lZGl0aW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0aW5nUm93LmZpbmRGaWVsZHMoJ3ByaXpfa3VyX3JveicpLmdmaWVsZCgnc2V0VmFsdWUnLCBvYmouVHlwS3VyelJvemRpbHUpLmdmaWVsZCgnb3B0aW9uJywgJ3Rvb2x0aXAnLCBHZXRUZXh0S3VyelJvemRpbHUob2JqLlR5cEt1cnpSb3pkaWx1IGFzIGFueSkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRpbmdSb3cuZmluZEZpZWxkcygnc21sb3V2YScpLmdmaWVsZCgnc2V0VmFsdWUnLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5QcmlzdHVwbm9zdFNtbG91dnkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5Lk5lcHJpc3R1cG5hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBudXRuZSB2eW1hemFuaSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubG9nLmRlYnVnKFwicmV0dXJuVmFsdWUgezB9XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRmci5yZXNvbHZlKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnJlc29sdmUoeyBuYXZyYXQgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0dldERyZCh0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRmci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0LklJU1NQQXR0ciEucHJpel9zc3AgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubG9nLmRlYnVnKFwicHJpel9zc3AgPSB7MH1cIiwgcmVzdWx0LklJU1NQQXR0ciEucHJpel9zc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnNlY2hueSBvc3RhdG5pIHR5cHkgcGlrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpc3R1cG5vc3RTbWxvdXZ5ID0gKHJlc3VsdCEuSUlTU1BBdHRyIS5wcml6X3NzcCA9PSAwKSA/IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5Lk5lcHJpc3R1cG5hIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmlzdHVwbm9zdFNtbG91dnkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVByaXN0dXBub3N0U21sb3V2eS5QcmlzdHVwbmFQb3Zpbm5hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNsb3ppbSB2eXNsZWRub3UgaG9kbm90dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWU6IEdBbGdvcml0bXVzS1JSZXR1cm5EdG8gPSB7IFByaXN0dXBub3N0U21sb3V2eTogcHJpc3R1cG5vc3RTbWxvdXZ5LCBUeXBLdXJ6Um96ZGlsdTogdHlwS3VyelJveiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmxvZy5kZWJ1ZyhcInJldHVyblZhbHVlIHswfVwiLCByZXR1cm5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXR1cm5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICogRm9ybXVsYXIgcHJvIHphZGFuaSBwb3Bpc3UgcmFka3VcclxuICAgICAgICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFZ5YmVyU21sb3V2eShjb250ZW50OiBHVWN0RGV0YWlsIHwgR1VjdERldGFpbERva2xhZHUsIGN1cnJlbnREYXRhKSB7XHJcbiAgICAgICAgbGV0IGZvcm0gPSBHZXRGb3JtU21sKGNvbnRlbnQpOy8vIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MzAyNTAyMDBcIiB9KSAvL1JDIDMwMjUwMjAwIDogSHJvbWFkbsO9IHBvcGlzIMWZw6Fka8WvXHJcblxyXG4gICAgICAgIGxldCBzaW1wbGVGb3JtID0gY29udGVudC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjMwMjUwNDU1XCIsIGZvcm0sIGN1cnJlbnREYXRhLCAkLmV4dGVuZCh7fSwgeyAgLy9SQyAzMDI1MDQ1NSA6IFbDvWLEm3Igc21sb3V2eVxyXG4gICAgICAgICAgICB3aWR0aDogNTAwLCBoZWlnaHQ6IDIwMCxcclxuICAgICAgICAgICAgY29tbWFuZEJhcjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2tcIiwgY2FwdGlvbjogR0RsZy5tYmJPay50ZXh0LCBpY29uOiBcImdpLXRpY2tcIiwgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkbGcgPSBzaW1wbGVGb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkbGc6IFwiLCBkbGcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRsZy5nZm9ybShcImlzVmFsaWRcIiwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IC8qZGF0YSB8fCovIHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRsZy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRsZy5nY29udGVudCgpLmNsb3NlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnJ1c2l0XCIsIGNhcHRpb246IEdEbGcubWJiQ2FuY2VsLnRleHQsIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsIHJ1bjogZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGxnID0gc2ltcGxlRm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRsZy5nY29udGVudCgpLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHJldHVybiBzaW1wbGVGb3JtO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmljZSBsb2thbG5pIG5hYmlka3lcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldE1lbnVBY3Rpb25zKCk6IChzdHJpbmcgfCB1bmRlZmluZWQpW10gfCAoc3RyaW5nIHwgKHN0cmluZyB8IHVuZGVmaW5lZClbXSB8IHsgYWN0aW9uOiBHQWN0aW9uIHwgdW5kZWZpbmVkOyBwcmltYXJ5OiB0cnVlOyBmYXZvcml0ZTogdHJ1ZTsgfSlbXSB8IE1lbnVQYXJhbXNbXSB7XHJcblxyXG4gICAgICAgIHJldHVybiBbXCJhY3RQb2xvemt5Tm92eVJhZGVrXCIsIFwiYWN0UG9sb3preU9wcmF2aXRcIiwgXCJhY3RQb2xvemt5WnJ1c2l0XCIsIFwiYWN0UG9sb3preU9kc3RyYW5pdFwiLCBcImFjdEtvcGllUmFka3VcIlxyXG4gICAgICAgICAgICAsIFwiLVwiLCBcImFjdE96bmFjaXRaYXBpc1wiLCBcIi1cIiwgXCJhY3RQb2xvemt5UHJlZGtvbnRhY2VcIlxyXG4gICAgICAgICAgICAsIFwiLVwiLCBbXCJqcmVzOjMwMjUwMjc1XCIsIC8vUkMgMzAyNTAyNzUgOiBJbXBvcnQgZGF0XHJcbiAgICAgICAgICAgICAgICBcImFjdEltcG9ydFplU2NocmFua3lQcnV2XCIsIFwiYWN0SW1wb3J0WmVTb3Vib3J1UHJ1dlwiLCBcIi1cIiwgXCJhY3RJbXBvcnRaZVNjaHJhbmt5XCIsIFwiYWN0SW1wb3J0WmVTb3Vib3J1XCJdLFxyXG4gICAgICAgICAgICBbXCJqcmVzOjMwMjUwMDc3XCIsIC8vUkMgMzAyNTAwNzcgOiBWeXR2b8WZaXQgcMWZZWRwaXMgcMWZZWRrb250YWNlXHJcbiAgICAgICAgICAgICAgICBcImFjdFByZWRrb250YWNlT3puXCIsIFwiYWN0UHJlZGtvbnRhY2VWc2VjaFwiXSxcclxuICAgICAgICAgICAgXCItXCIsIFwiYWN0T2JjZXJzdHZpdFwiXTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPem5hY2VuaSByYWRrdVxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSByb3dcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldE1hcmsoZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50Piwgcm93OiBudW1iZXIpIHtcclxuICAgICAgICBncmlkLmdncmlkKFwibWFya1wiLCB7IHJvdzogcm93LCBjb2w6IDIgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogS29waWUgb3puYWNlbmVobyByYWRrdVxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNvcHlSb3coY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogSlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuR1VjdGRwZXBEdG8+IHtcclxuXHJcbiAgICAgICAgbGV0IGdyaWQgPSBHZXRHcmlkKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChncmlkID09PSBudWxsKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKCk7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtYXJrZWRSb3cgPSBncmlkLmdncmlkKFwibWFya1wiKTtcclxuICAgICAgICBpZiAoIW1hcmtlZFJvdykge1xyXG4gICAgICAgICAgICAvLyBuZW5pIG96bmFjZW4gcmFkZWtcclxuICAgICAgICAgICAgY29uc3QgeyByb3cgfSA9IGdyaWQuZ2dyaWQoXCJhY3RpdmVDZWxsQWRkcmVzc1wiKTtcclxuICAgICAgICAgICAgc2V0TWFyayhncmlkLCByb3cpO1xyXG4gICAgICAgICAgICBtYXJrZWRSb3cgPSBncmlkLmdncmlkKFwibWFya1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1hcmtlZFJvdykge1xyXG4gICAgICAgICAgICByZXR1cm4gTm92eVphcGlzKGNvbnRlbnQsICQuZXh0ZW5kKHt9LCBtYXJrZWRSb3cuZGF0YSkpLlxyXG4gICAgICAgICAgICAgICAgdGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5uZXdSb3dTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRyb3dlZGl0b3IoXCJjb21taXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBHRXJyb3IoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBQcmVkYXQgZG9rbGFkXHJcbiAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQcmVkYXQoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KSB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gY29udGVudDtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpYWxvZzogSlF1ZXJ5PEhUTUxFbGVtZW50PjsgLy8gb2JqZWt0IGRpYWxvZ3UgcHJ1dm9kY2VcclxuICAgICAgICBsZXQgYWN0VGlza1ByZWRhdCA9IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tQcmVkYXRcIixcclxuICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmRcIixcclxuICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3RQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgcmVwb3J0RmluaXNoZWQ6IGZ1bmN0aW9uIChldmVudCwgcmVwSW5mbykge1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHNlem5hbTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG9bXSA9IFt0aGF0LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHVdIGFzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvW107XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBkaWFsb2cuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpLmZpbmRGaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm9ybSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBmb3JtID09IG51bGwpIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaXhzX2Z1bjogaXhzX2Z1bl9ha3QgfSA9IGZvcm0uZmluZEZpZWxkcyhcIml4c19mdW5fYWt0XCIpLmdmaWVsZDxDb250cm9sc0xvZ2ljLkludGVyZmFjZS5HUmVhZGVyR2luc2Z1bkR0bz4oXCJnZXRWYWx1ZVwiKSA/PyB7fTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGl4c19mdW5fYWt0ID0gZm9ybS5maW5kRmllbGRzKFwiaXhzX2Z1bl9ha3RcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChpeHNfZnVuX2FrdCkgXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpeHNfZnVuX2FrdCA9IGl4c19mdW5fYWt0Lml4c19mdW47XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBpeHNfZnVuX3Z5cml6ID0gZm9ybS5maW5kRmllbGRzKFwiaXhzX2Z1bl92eXJpelwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpeHNfZnVuX3Z5cml6KVxyXG4gICAgICAgICAgICAgICAgICAgIGl4c19mdW5fdnlyaXogPSBpeHNfZnVuX3Z5cml6Lml4c19mdW5fdnlyaXo7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl4c19mdW5fYWt0ID09PSBcInVuZGVmaW5lZFwiIHx8IGl4c19mdW5fYWt0ID09PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDY4MlwiKSAvL1JDIDMwMjUwNjgyIDogIE5lbsOtIHZ5cGxuxJtuIGPDrWwgcMWZZWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiBkZWYucmVqZWN0KGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFByZWRhdHRIcm9tYWRuZVJlcXVlc3REdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2V6bmFtOiBzZXpuYW0sXHJcbiAgICAgICAgICAgICAgICAgICAgSXhzRnVuOiBpeHNfZnVuX2FrdCxcclxuICAgICAgICAgICAgICAgICAgICBJeHNGdW5WeXJpejogaXhzX2Z1bl92eXJpelxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgVGVtYTogcmVwLnRlbWEsIElEU2VzdGF2eTogMTIsIFNlem5hbVBpZHU6IHNlem5hbSwgRGF0YTogcmVzdWx0IH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVwKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgd2lkdGggPSA1MDA7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IDUwMDtcclxuXHJcbiAgICAgICAgZGlhbG9nID0gdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjMwMjUwNjUxXCIsIEhyb21hZG5hT3BlcmFjZWZvcm0oR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuUHJlZGFuaSwgdGhhdCwgdGhhdC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5peHBfZGVuISlcclxuICAgICAgICAgICAgLy9QcmVkYXRGb3JtKGNvbnRlbnQsIHRoYXQuSXhzU3UsIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uaXhwX2RlbilcclxuICAgICAgICAgICAgLCB7IGlkOiBcIklEcHJlZGFuaVwiIH0sXHJcbiAgICAgICAgICAgIHt1c2VyU2V0dGluZ3M6IHRoYXQudXNlclNldHRpbmdzLCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IC8vUkMgMzAyNTA2NTEgOiBQxZllZMOhbsOtXHJcbiAgICAgICAgICAgICwgY29tbWFuZEJhcjogW3tcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBhY3RUaXNrUHJlZGF0XHJcbiAgICAgICAgICAgIH0sIFwib2shXCIsIFwiY2FuY2VsXCJdIGFzIGFueSwgdGl0bGU6IFwianJlczozMDI1MDY1MVwiIC8vUkMgMzAyNTA2NTEgOiBQxZllZMOhbsOtXHJcbiAgICAgICAgfSk7IFxyXG4gICAgICAgIHJldHVybiBkaWFsb2cuY3JlYXRlRGlhbG9nUHJvbWlzZTwvKmFueSwqLyBJR1ByZWV2aWRlbmNlTW9kZWw+KClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkUHJlZGF0UmVxdWVzdER0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICBQaWREb2tsYWR1OiBjb250ZW50Lkl4cCxcclxuICAgICAgICAgICAgICAgICAgICBEYXR1bVBvc2xlZG5pWm1lbnlEb2tsYWR1OiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBEdXZvZDogZGF0YS5kdXZvZCwgQ2lzUmVhbDogZGF0YS5jaXNfcmVhbFxyXG4gICAgICAgICAgICAgICAgICAgICwgSXhzRnVuOiBkYXRhLml4c19mdW5fYWt0XHJcbiAgICAgICAgICAgICAgICAgICAgLCBJeHNSZWY6IGRhdGEuaXhzX3JlZlxyXG4gICAgICAgICAgICAgICAgICAgICwgSXhzRnVuVnlyaXo6IGRhdGEuaXhzX2Z1bl92eXJpelxyXG4gICAgICAgICAgICAgICAgICAgICwgSXhzU3U6IGRhdGEuaXhzX3N1XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA2NTJcIik7IC8vUkMgMzAyNTA2NTIgOiBQcm9iw61ow6EgcMWZZWTDoW7DrSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLnByZWRhdChycSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlZnJlc2hBZnRlckFjdGlvbihjb250ZW50LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZERvY1RvUmVmcmVzaChjb250ZW50Lkl4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZyZXNoRGV0YWlsKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuZW5kT3BlcmF0aW9uKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IGNvbnRlbnQuZW5kT3BlcmF0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgKiBQcmlkZWxpdCBkb2tsYWRcclxuICAgICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUHJpZGVsaXQoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSBjb250ZW50O1xyXG4gICAgICAgIGxldCB3aWR0aCA9IDUwMDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gMzAwO1xyXG4gICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcImpyZXM6MzAyNTA2NTRcIiwgSHJvbWFkbmFPcGVyYWNlZm9ybShHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmlkZWxlbmksIHRoYXQsIHRoYXQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uaXhwX2RlbiEpXHJcbiAgICAgICAgICAgIC8vUHJpZGVsaXRGb3JtKGNvbnRlbnQsIHRoYXQuSXhzU3UsIHRoYXQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uaXhwX2RlbiEsICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0KSwgeyBpZDogXCJJRFByaWRlbGl0XCIgfVxyXG4gICAgICAgICAgICAsICB7IGlkOiBcIklEcHJpZGVsaXRcIiB9LyokLmV4dGVuZCh7fSovLFxyXG4gICAgICAgICAgICB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIHVzZXJTZXR0aW5nczogdGhhdC51c2VyU2V0dGluZ3N9KS8qKSovIC8vUkMgMzAyNTA2NTQgOiBQxZlpZMSbbGVuw60gZG9rbGFkdVxyXG4gICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZTxhbnk+KClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGE6IElHUHJlZXZpZGVuY2VNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0RG9rbGFkUHJpZGVsaXRSZXF1ZXN0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFBpZERva2xhZHU6IGNvbnRlbnQuSXhwLCBEYXR1bVBvc2xlZG5pWm1lbnlEb2tsYWR1OiBjb250ZW50LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUhLmRhdF96bWVuYSwgRHV2b2Q6IGRhdGEuZHV2b2RcclxuICAgICAgICAgICAgICAgICAgICAsIEl4c0Z1bjogZGF0YS5peHNfZnVuX2FrdFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwNjU1XCIpOyAvL1JDIDMwMjUwNjU1IDogUHJvYsOtaMOhIHDFmWlkxJtsZW7DrSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5pc2wuVWN0RG9rbGFkLnByaWRlbGl0KHJxKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVmcmVzaEFmdGVyQWN0aW9uKGNvbnRlbnQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZnJlc2hEZXRhaWwoY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb250ZW50LmVuZE9wZXJhdGlvbigpOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IGNvbnRlbnQuZW5kT3BlcmF0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlZXZpZG92YXQgZG9rbGFkXHJcbiAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUHJlZXZpZG92YXQoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBsZXQgdGhhdCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaWFsb2c6IEpRdWVyeTxIVE1MRWxlbWVudD47IC8vIG9iamVrdCBkaWFsb2d1IHBydXZvZGNlXHJcbiAgICAgICAgbGV0IGFjdFRpc2tQcmUgPSBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrUHJlXCIsXHJcbi8vICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjgwXCIsIC8vUkMgMzAyNTA2ODAgOiBUaXNrXHJcbiAgICAgICAgICAgIC8vdG9vbHRpcDogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgIHRlbWE6IFwid2ZsX3B0bV9ocm9tcHJrXCIsICAgXHJcbiAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0UHJpbnRQYXJhbWV0ZXJzOlNlcnZlclBhcmFtZXRlck1ldGhvZFRpc2t5TmFTZXpuYW11XCIsXHJcbiAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbiAoZXZlbnQsIHJlcEluZm8pIHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgc2V6bmFtOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0b1tdID0gW3RoYXQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdV0gYXMgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG9bXTtcclxuICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRpYWxvZy5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIikuZmluZEZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtID09PSBcInVuZGVmaW5lZFwiIHx8IGZvcm0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaXhwX2RlbiB9ID0gZm9ybS5maW5kRmllbGRzKFwiaXhwX2RlblwiKS5nZmllbGQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdHNkZW5EdG8+KFwiZ2V0VmFsdWVcIik/P3sgfTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBpeHNfZnVuOiBpeHNfZnVuX2FrdCwgaXhzX3JlZiB9ID0gZm9ybS5maW5kRmllbGRzKFwiaXhzX2Z1bl9ha3RcIikuZ2ZpZWxkPENvbnRyb2xzTG9naWMuSW50ZXJmYWNlLkdSZWFkZXJHaW5zZnVuRHRvPihcImdldFZhbHVlXCIpID8/IHt9O1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgaXhzX2Z1bl9ha3QgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfZnVuX2FrdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGl4c19yZWY6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoaXhzX2Z1bl9ha3QpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGl4c19mdW5fYWt0ID0gaXhzX2Z1bl9ha3QuaXhzX2Z1bjtcclxuICAgICAgICAgICAgICAgIC8vICAgIGl4c19yZWYgPSBpeHNfZnVuX2FrdC5peHNfcmVmO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl4cF9kZW4gPT09IFwidW5kZWZpbmVkXCIgfHwgaXhwX2RlbiA9PT0gbnVsbCB8fCBpeHNfZnVuX2FrdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDY4MlwiKSAvL1JDIDMwMjUwNjgyIDogIE5lbsOtIHZ5cGxuxJtuIGPDrWwgcMWZZWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiBkZWYucmVqZWN0KGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdERva2xhZFByZWV2aWRvdmF0SHJvbWFkbmVSZXF1ZXN0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFNlem5hbTogc2V6bmFtLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4cERlbk5ldzogaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICBJeHNGdW5OZXc6IGl4c19mdW5fYWt0LFxyXG4gICAgICAgICAgICAgICAgICAgIEl4c1JlZk5ldzogaXhzX3JlZlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgVGVtYTogcmVwLnRlbWEsIElEU2VzdGF2eTogMTIsIFNlem5hbVBpZHU6IHNlem5hbSwgRGF0YTogcmVzdWx0IH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVwKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgdGl0bGUgPSBcImpyZXM6MzAyNTA2NzlcIjsgLy9SQyAzMDI1MDY3OSA6IFDFmWVldmlkZW5jZVxyXG4gICAgICAgIGxldCB3aWR0aCA9IDUwMDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gNTAwO1xyXG5cclxuXHJcbiAgICAgICAgZGlhbG9nID0gdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0odGl0bGUsIEhyb21hZG5hT3BlcmFjZWZvcm0oR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuUHJlZXZpZGVuY2UsIHRoYXQsIHRoYXQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uaXhwX2RlbiEpXHJcbiAgICAgICAgICAgIC8vUHJlZXZpZG92YXRmb3JtKGNvbnRlbnQsIHRoYXQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8ucm9rISwgdGhhdC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5peHBfZGVuISlcclxuICAgICAgICAgICAgLCB7IGlkOiBcIklEcHJlZXZpZGVuY2VcIiB9LCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIHVzZXJTZXR0aW5nczogdGhhdC51c2VyU2V0dGluZ3MsIGNvbW1hbmRCYXI6IFt7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogYWN0VGlza1ByZVxyXG4gICAgICAgICAgICB9LCBcIm9rIVwiLCBcImNhbmNlbFwiXSBhcyBhbnlcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGlhbG9nLmNyZWF0ZURpYWxvZ1Byb21pc2U8YW55PigpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhOiBJR1ByZWV2aWRlbmNlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhPy5peHBfZGVuICYmIGRhdGE/Lml4c19mdW5fYWt0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlVjdERva2xhZC5wcmVldmlkb3ZhdCh7IEl4cERlbk5ldzogZGF0YT8uaXhwX2RlbiwgSXhzRnVuTmV3OiBkYXRhPy5peHNfZnVuX2FrdCwgRG9rbGFkOiB0aGF0LlVjZXRuaURva2xhZER0by5IbGF2aWNrYURva2xhZHUsIER1dm9kOiBkYXRhLmR1dm9kLCBJeHNGdW5WeXJpejogZGF0YS5peHNfZnVuX3Z5cml6LCBDaXNSZWFsOiBkYXRhLmNpc19yZWFsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDY0MVwiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSk7IC8vUkMgMzAyNTA2NDEgOiBQxZllZXZpZGVuY2UgcHJvdmVkZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGREb2NUb1JlZnJlc2goIGNvbnRlbnQuSXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZyZXNoRGV0YWlsKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aHJvdyBuZXcgR0Vycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmFjdGVuaSB0ZXh0dSB6IHJvenZyaHVcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gcmFkZWtcclxuICAgICAqIEBwYXJhbSByZWFkQWx3YXlzXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTmFjdGlUZXh0eVpSb3p2cmh1KGNvbnRlbnQ6IEdVY3REZXRhaWwgfCBHVWN0RGV0YWlsRG9rbGFkdSwgcmFkZWs6IEVrby5JbnRlcmZhY2UuR0Vrb1phcGlzRHRvLCByZWFkQWx3YXlzOiBib29sZWFuID0gZmFsc2UpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmIChyYWRlayAhPSBudWxsICYmIChyZWFkQWx3YXlzIHx8IChjb250ZW50LmluZm9TZWxlY3RvciAhPSBudWxsICYmIHR5cGVvZiBjb250ZW50LmluZm9TZWxlY3Rvcj8uc2hvd2VkQ250ICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnRlbnQuaW5mb1NlbGVjdG9yPy5zaG93ZWRDbnQpKSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuRWtvRGF0b3ZhVmV0YS5nZXRUZXh0eVpSb3p2cmh1KHsgdHlwVmV0eTogR29yZGljLkVrby5JbnRlcmZhY2UuVHlwVmV0eUVudW0uVWNldG5pLCBla29aYXBpczogcmFkZWsgYXMgRWtvLkludGVyZmFjZS5HRWtvWmFwaXNEdG8sIHBpZFJvenZyaHU6IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQhPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmluZm9TZWxlY3Rvcj8udXBkYXRlRGF0YShyZXN1bHQsIHtmb2N1czp0cnVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHRoYXQuaW5mb1NlbGVjdG9yPy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5pbmZvU2VsZWN0b3I/LnNob3dlZENudD8udHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmluZm9TZWxlY3RvciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVmcmVzaE1lbnUoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFByZWRhdCBkb2tsYWRcclxuICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVnliZXJLYXRlZ29yaWVGSUsoY29udGVudDogR1VjdERldGFpbCB8IEdVY3REZXRhaWxEb2tsYWR1LCBpeHA6IHN0cmluZywga3RnX3R5cDogbnVtYmVyLCByb2s6IG51bWJlcik6SlF1ZXJ5UHJvbWlzZSA8bnVtYmVyPiB7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gY29udGVudDtcclxuXHJcbiAgICAgICAgLy9sZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG9wZW5lZDogdHJ1ZSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIsIHRhYkxhYmVsOiBcImpyZXM6MzAyNTAyMTdcIiB9KSAvL1JDIDMwMjUwMjE3IDogVsO9YsSbciBrYXRlZ29yaWUgZmluYW7EjW7DrSBrb250cm9seVxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcInR5cFwiLCBtdWx0aTogZmFsc2UsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAvLyAgICAsIGRyb3Bkb3duOiBmYWxzZVxyXG4gICAgICAgICAgICAvLyAgICAsIG1vZGVsOiBcIm1vZGVsLnR5cD12YWx1ZS50eXBcIlxyXG4gICAgICAgICAgICAvLyAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7dHh0fVwiXHJcbiAgICAgICAgICAgIC8vICAgIC8vLCBlbXB0eVZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgIC8vICAgIC8vLCBtb2RlbERlZmF1bHRzOiB7IHR5cDogLTEgfVxyXG4gICAgICAgICAgICAvLyAgICAsIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgLy8gICAgICAgICB7IHR4dDogXCJqcmVzOjMwMjUwNjU5XCIsIHR5cDogMCB9IC8vUkMgMzAyNTA2NTkgOiBGaW5hbsSNbsOtIGtvbnRyb2xhIHBvIHZ6bmlrdSB6w6F2YXprdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLCB7IHR4dDogXCJqcmVzOjMwMjUwNjYwXCIsIHR5cDogMSB9IC8vUkMgMzAyNTA2NjAgOiBGaW5hbsSNbsOtIGtvbnRyb2xhIHBvIHZ6bmlrdSBuw6Fyb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICBdLCB7IGtleTogXCJ0eXBcIiB9KVxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInR5cFwiLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOjAsXHJcbiAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAwLCBsYWJlbDogXCJqcmVzOjMwMjUwNjU5XCIgfSwgLy9SQyAzMDI1MDY1OSA6IEZpbmFuxI1uw60ga29udHJvbGEgcG8gdnpuaWt1IHrDoXZhemt1XHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6IFwianJlczozMDI1MDY2MFwiIH0sIC8vUkMgMzAyNTA2NjAgOiBGaW5hbsSNbsOtIGtvbnRyb2xhIHBvIHZ6bmlrdSBuw6Fyb2t1XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICA7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gNDAwO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSAyMDA7XHJcbiAgICAgICAgLy8gbW9kZWwgcHJvIHByaWRlbGl0XHJcbiAgICAgICAgaW50ZXJmYWNlIElUeXBGSUsge1xyXG4gICAgICAgICAgICB0eXA6IG51bWJlciB8IG51bGwsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5zaW1wbGVGb3JtKFwianJlczozMDI1MDIxN1wiLCBmb3JtLCB7fSwgJC5leHRlbmQoe30sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KSkgLy9SQyAzMDI1MDIxNyA6IFbDvWLEm3Iga2F0ZWdvcmllIGZpbmFuxI1uw60ga29udHJvbHlcclxuICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2U8SVR5cEZJSz4oKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwidW5kZWZpbmVkXCIgfHwgZGF0YS50eXAgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTIwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE0MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGRldGFpbHUgesOhcG/EjXRvdsOpaG8gbGlzdHUgdiBub3bDqSB6w6Fsb3pjZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=