(function ($) {
    "use strict";
    namespace("Gordic.Maj.WebClient.GMajKarta", {

        onContentReady: function () {

            console.log("FUNCTION GMajKarta.onContentReady()");

            var that = this;

            // pomocné proměnné
            this.bInvCisLenDrivenByPar = false; // délka df_inv_cis není parametricky řízena
            this.ucty = {};
            //  this.ucty.uea_evi = null;
            this.ucty.uea_opr = null;
            this.ucty.uea_por = null;
            this.matcis_zev = 0; // ng_zevNone, cfc_MatCis.init( )
            this.akceOdRoku = 0; // predestinace filtru dlg_Akce (selektor df_akce)
            this.modeOdpDrh = 0; // ng_modeodpNo  MajInit.mode_odp_drh
            this.modeOdpKrt = 0; // ng_modeodpNo  MajInit.mode_odp_krt
            //            this.loadingPage = true;



            var jsShowTabPodmProvoz = null;
            if (that.tbl_provoz_podm.Edit) jsShowTabPodmProvoz = this.element;  // přidání záložky s podmínkama provozu

            var jsShowTabOdpisU = null;
            if (that.cvShowTabOdpU) jsShowTabOdpisU = this.element;  // přidání záložky s odpisem

            var jsShowTabOdpisD = null;
            if (that.cvShowTabOdpD) jsShowTabOdpisD = this.element;  // přidání záložky s odpisem

            var jsShowTabZodpOsb = null;
            if (that.cvShowTabRef) jsShowTabZodpOsb = this.element;  // přidání záložky "Zodpovídá"

            var jsShowTabFoto = null;
            if (that.cvShowTabFoto) jsShowTabFoto = this.element;  // přidání záložky "Dokumentace"

            var jsShowTabTrf = null;
            if (that.cvShowTabTrf) jsShowTabTrf = this.element;  // přidání záložky "Transfery"

            var jsShowTabPrislus = null;
            if (that.cvShowTabPrislus) jsShowTabPrislus = this.element;  // přidání záložky "Příslušenství"

            var jsShowTabINV = jsShowTabPodmProvoz;     // záložka "INV"    

            var jsShowTabRPP = null;
            if (that.cvShowTabRPP) jsShowTabRPP = this.element;  // přidání záložky "RPP"

            var jsShowTabPartner = null;
            if (that.cvShowTabPartner) jsShowTabPartner = this.element;  // přidání záložky "Partneři"

            var jsShowTabBudova = null;
            if (that.cvTypRpp > 0) jsShowTabBudova = this.element;  // přidání záložky "Budova"

            var jsShowTabKatastr = null;
            if (that.cvTypRpp > 10) jsShowTabKatastr = this.element;  // přidání záložky "Katastr"

            var jsShowTabSML = null;
            if (that.cvShowTabSML) jsShowTabSML = this.element;  // přidání záložky "SML"

            var jsShowTabProdej = null;
            if (that.DetailDto.dev === 42 || that.DetailDto.dev === 32 || that.DetailDto.dev === 12) jsShowTabProdej = this.element;  // přidání záložky "Prodej"


            this.myValidators = { // private myValidators: ObjectLiteral<any> = {

                validatePositive: new Gordic.Validators.Range({ min: 0, message: "jres:24534622" }),   //RC 24534622 : Hodnota nesmí být záporná.

            } // end (myValidators)


            //===  KPI  ================================================================



            //===  IDENTIFIKACE KARTY  =================================================================
            $("<div data-break-L='900'>").appendTo(this.element).gform("setup", { name: "FormIDs", layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534148", opened: true }). //RC 24534148 : Identifikace karty

                gformsection("create").
                gformrow("addFieldsRow", that.df_drh_id.Label).gselectbox(Gordic.Prefabs.Select.majsdrm(), {  //RC 24534149 : Druh majetku
                    name: "df_drh_id",
                    // OK: 1/3 při validaci chceme kontrolu účtů: viz cdf_SetDrhId._validateField( ) df_drh_id._getUcty( )
                    // TODO: 2/3 změna kontextu při volání generátoru inv.č.
                    // TODO: 3/3 výběr hodnoty dbl-clickem
                    model: "model.skupina_id=value.skupina_id, model.drh_id=value.drh_id",
                    serverFilters: {
                        aktivita: 100,
                        skupina_id: that.DetailDto.skupina_id,
                    },
                    // validators: that.df_drh_id.Required ? [new Gordic.Validators.Required()] : undefined,
                    validators: [
                        new Gordic.Validators.Base({
                            validate: function (value, source) {

                                // if (that.cvDebug) console.log(" - EVENT df_drh_id.validate(" + value + ")");

                                // povinnost
                                if (that.df_drh_id.Required && (!value)) {
                                    this.stopping = true;
                                    this.errorType = "error";
                                    this.group = "error";
                                    this.message = "jres:24534619"; //RC 24534619 : Povinná položka

                                    return false;
                                } // end if


                                // TODO: nahradit cvUae a cvUeab za "ucty"
                                // PSvoboda: při pořízení karty POTŘEBUJI znát úč.osnovu (jinak ji mám už načtenu v C# a ContentValues)
                                if (that.cvModMode === 2 && that.ucty.uea_evi === undefined) {
                                    this.stopping = true;
                                    this.errorType = "error";
                                    this.group = "error";
                                    this.message = "Nebyla vybrána účetní osnova"; //RC 24534619 : Povinná položka

                                    return false;
                                } // end if

                                return true; // OK

                            } // end validate
                        })
                    ],
                    flag: that.df_drh_id.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_drh_id.Edit === false,
                    selector: function (s) {

                        if (that.cvDebug) console.log(" - EVENT df_drh_id.selector()");

                        var myVal = $(this).gfield("getValue");

                        return that.dialogs.showModalWindow("Gordic.Maj.WebClient.GDlgDrhId", { argSkupinaId: that.DetailDto.skupina_id, argDrhId: that.DetailDto.drh_id }, "Druhy majetku", 800, 700).createDialogPromise().then((result) => {

                            that.ucty = result.uctOsnova; // uložím si vybranou účetní osnovu
                            that.DetailDto.drh_id = result.policko.drh_id; // rovnou nastavím do detailu

                            return result.policko;
                        })
                    },
                    change: function (ev, changeObj) {

                        // PSvoboda: při pořízení nové karty vynutím validaci HNED, kvůli účtům
                        if (that.cvModMode === 2) $(this).gfield("instance").validate();


                        //--------------------------------
                        // cdf_SetDrhId._validateField( )
                        //--------------------------------
                        // cdf_SetDrhId._getUcty( )
                        // a) vnutím výběr, pokud je to režim frmInsert a účty dosud nebyly nasáty
                        // b) jsou-li data získána selektorem, pak účty mám načtené a validní !
                        if (that.cvModMode === 2 && that.ucty.uea_evi === undefined)
                            $(this).gfield("instance").actions.actSelector.run(new Event("click"));

                        //--------------------------------


                        if (that.cvDebug) {
                            // debugger;
                            console.log(" - EVENT df_drh_id.change() ");
                            console.log(" - value UCTY.uea_evi: " + that.ucty.uea_evi);
                        } // end debug


                        if (changeObj && changeObj.value) {
                            that.modeOdpDrh = changeObj.value.mode_odp; // PSvoboda: bude se hodit pro vyhodnocení MajInit.mode_odp_krt
                            that.changeDrhId(0, changeObj.value.drh_id);
                        } // end if (value)

                    } // end-change
                }).

                gformrow("addFieldsRow", that.df_inv_cis.Label).gstringbox({  //RC 24534058 : Inventární číslo
                    name: "df_inv_cis",
                    model: "inv_cis",
                    validators: that.df_inv_cis.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_inv_cis.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    // pokud se jedná o unikátní skupinu nebo o unikátní materiálové číslo, bude viditelné inventární číslo 
                    disabled: that.df_inv_cis.Edit === false,
                    validators: [
                        new Gordic.Validators.Base({
                            validate: function (value, source) {

                                if (that.bInvCisLenDrivenByPar) {
                                    var maxLen = that.MAJ_CIS_INVCDFL;

                                    this.message = "Překročena administrovaná délka " + maxLen + " znaků";

                                    if (value && value.length > maxLen) return false;
                                }
                                else {
                                    // délka max.50
                                    this.message = "Překročena povolená délka"; //RC xxx
                                    //this.errorType = 'warning';

                                    if (value && value.length > 50) return false;
                                } // end if-else

                                return true;

                            } // end validate
                        })
                    ],
                    //change: function (ev, obj) {                    
                    //} // end-change
                    verify: (ev, value) => { // df_inv_cis.SAM_Validate( )
                        if (value && that.cvModMode === 2) // ng_modefrmInsert
                        {
                            if (that.cvDebug) console.log(" = dlg_MajKarta.checkDuplInvCis( )");

                            that.call("CheckDuplInvCis", { invCis: value })
                                .then(function (result, content) {
                                    // OK
                                }) // end then
                                .fail(function (xhr, type, vobj) {
                                    if (type === "exception") {
                                        if (vobj.baseType === "Gordic.General.GNonFatalException") {
                                            vobj.handled = true;

                                            that.dialogs.error(vobj.baseMessage);
                                        }
                                    }
                                }) // end fail

                        } // end if
                    }, // end verify
                }).
                gformrow("addFieldsRow", that.df_id_maj.Label).gstringbox({ // identifikátor majetku
                    name: "df_id_maj",
                    model: "id_maj",
                    //validators: that.df_id_maj.Required ? [new Gordic.Validators.Required()] : undefined,
                    validators: [
                        new Gordic.Validators.Base( // pokud je povinná položka a je vidět
                            {
                                stopping: true,
                                errorType: "error",
                                validate: function (value, source) {
                                    if (that.df_id_maj.Required && that.df_id_maj.Visible && that.cvMajInitSkmTypL) // v C# už znám PRIZ_POV a 'maj_rad_idmex'
                                    {
                                        if (!value) return false;
                                    }
                                    return true;
                                }, getMessage: function () { return "Povinná hodnota"; }

                            })
                    ],
                    verify: (ev, value) => { // df_inv_cis.SAM_Validate( )

                        if (value && that.cvModMode === 2) // ng_modefrmInsert                        
                            that.jsCheckDuplIdMaj(value.id_maj);

                    }, // end verify
                    //flag: that.df_id_maj.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    flag: function () {
                        if (that.df_id_maj.Required && that.df_id_maj.Visible && that.cvMajInitSkmTypL) // v C# už znám PRIZ_POV a 'maj_rad_idmex'
                            return true;
                        else
                            return false;
                    },
                    disabled: that.df_id_maj.Edit === false, // viditelnost řídí DB parametr 'maj_rad_idmex'
                }).
                gformrow("addFieldsRow", that.df_evi_cis.Label).gstringbox({  //RC 24534017 : Evidenční číslo
                    name: "df_evi_cis",
                    // TODO: df_evi_cis.GM_Change( ) + SAM_Validate + WM_KEYDOWN = incializace identifikátorů množ. karty
                    // TODO: pokud délka řetězce je delší než počet zobrazených znaků, uloží se text do tooltipu (to by mělo snad fungovat automaticky)
                    model: "evi_cis",
                    //validators: that.df_evi_cis.Required ? [new Gordic.Validators.Required()] : undefined,
                    validators: [
                        new Gordic.Validators.Base( // pokud je povinná položka a je vidět
                            {
                                validate: function (value, source) {
                                    // povinnost
                                    if (that.df_evi_cis.Required && value === false) {
                                        this.stopping = true;
                                        this.errorType = "error";
                                        this.group = "error";
                                        this.message = "jres:24534619"; //RC 24534619 : Povinná položka

                                        return false;
                                    } // end if

                                    // pokud je zapnuta kontrola duplicity, ověřím si jí
                                    if (that.MAJ_RAD_SREZEC >= 1 && value) {

                                        that.call("CheckDuplEviCis", { eviCis: value }) // checkDuplEviCis( )
                                            .then(function (result, content) {

                                                if (result) {
                                                    that.dialogs.error("Evidenční karta se zadaným evidenčním číslem již existuje");
                                                    // 
                                                    this.stopping = true;
                                                    this.errorType = "error"; // warning
                                                    this.group = "error"; // warning
                                                    this.message = "Evidenční číslo už existuje";

                                                    return false;
                                                }

                                            }) // end then                                        
                                    } // end if

                                    return true; // OK
                                } // end function (validate)
                            })
                    ],
                    flag: that.df_evi_cis.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_evi_cis.Edit === false,
                    change: function (ev, changeObj) {

                        if (changeObj.value && that.DetailDto.zev === 112) // ng_zevMnozEviCis                        
                            that.jsChangeIdMnozKrt("");

                    } // end-change
                }).
                gformrow("addFieldsRow", that.df_ser_cis.Label).gstringbox({  //RC 24534150 : Sériové číslo
                    name: "df_ser_cis",
                    // TODO: df_ser_cis.GM_Change( ) + SAM_Validate + WM_KEYDOWN = incializace identifikátorů množ. karty
                    // TODO: pokud délka řetězce je delší než počet zobrazených znaků, uloží se text do tooltipu (to by mělo snad fungovat automaticky)
                    model: "ser_cis",
                    validators: that.df_ser_cis.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ser_cis.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ser_cis.Edit === false,
                    change: function (ev, changeObj) {

                        if (changeObj.value && that.DetailDto.zev === 120) // ng_zevMnozSerCis                    
                            that.jsChangeIdMnozKrt("");

                    } // end-change
                }).
                gformrow("addFieldsRow", that.df_vyr_cis.Label).gstringbox({ //RC 24534151 : Výrobní číslo
                    name: "df_vyr_cis",
                    // TODO: df_vyr_cis.GM_Change( ) + SAM_Validate + WM_KEYDOWN = incializace identifikátorů množ. karty
                    // TODO: pokud délka řetězce je delší než počet zobrazených znaků, uloží se text do tooltipu (to by mělo snad fungovat automaticky)
                    model: "vyr_cis",
                    validators: that.df_vyr_cis.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_vyr_cis.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_vyr_cis.Edit === false,
                    change: function (ev, changeObj) {

                        if (changeObj.value && that.DetailDto.zev === 110) // ng_zevMnozVyrCis                        
                            that.jsChangeIdMnozKrt("");

                    } // end-change
                }).
                gformrow("addFieldsRow", that.df_sarze.Label).gstringbox({  //RC 24534112 : Šarže
                    name: "df_sarze",
                    // TODO: df_sarze.GM_Change( ) + SAM_Validate + WM_KEYDOWN = incializace identifikátorů množ. karty
                    model: "sarze",
                    validators: that.df_sarze.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_sarze.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_sarze.Edit === false,
                    change: function (ev, changeObj) {

                        if (changeObj.value && that.DetailDto.zev === 130) // ng_zevMnozSarze
                            that.jsChangeIdMnozKrt("");

                    } // end-change
                }).
                gformrow("addFieldsRow", that.df_ean.Label).gstringbox({   //RC 24534125 : EAN
                    name: "df_ean",
                    model: "ean",
                    validators: that.df_ean.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ean.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ean.Edit === false
                }).
                gformrow("addFieldsRow").


                gformsection("create").
                // cdf_SetMatCis - (a) po výběru si načte ZEV   (b) selectbox bude mít filtr aktivity - default je 100 (zajištěno readerem)
                // TODO: máme reader majscim2, který budeme muset asi použít pro dotažení položek potřebných ve validatePmj()
                gformrow("addFieldsRow", that.df_mat_cis.Label).gselectbox(Gordic.Prefabs.Select.majscim(), {  //RC 24534060 : Materiálové číslo 
                    name: "df_mat_cis",
                    model: "model.mat_cis=value.mat_cis",
                    serverFilters: { aktivita: 100 }, // 100 je default ale je to čitelnější
                    validators: that.df_mat_cis.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_mat_cis.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_mat_cis.Edit === false,
                    change: function (ev, changeObj) {

                        if (that.cvDebug) console.log("EVENT df_mat_cis.change()");

                        //------------------------------
                        // cdf_SetMatCis._validateField
                        //------------------------------

                        if (changeObj.value) {

                            // když se mění MAT_CIS, tak se dotahuje jiné ZEV
                            that.call("GetZEV", { matCis: changeObj.value.mat_cis, skupinaId: that.DetailDto.skupina_id, skupinaSUniq: that.cvMajInitSkmUnqL })
                                .then(function (result, content) {

                                    // that.endOperation();

                                    if (that.cvDebug) console.log(" - that.matcis_zev = [" + result + "]");
                                    that.matcis_zev = result;


                                    // TODO: PROMISE??:  if not setMatCis(1) -> CLOSE !
                                    that.setMatCis(1);

                                }); // end GetZEV.done

                        } // end if

                    }, // end-change
                }).
                gformrow("addFieldsRow", that.df_skp.Label).gselectbox(Gordic.Prefabs.Select.ekoskla(), { //RC 24534093 : Klasifikace
                    name: "df_skp",
                    model: "model.skp = value.skp",
                    serverFilters: { aktivita: 100 },
                    //  emptyValue: null,
                    validators: that.df_skp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_skp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_skp.Edit === false,
                    change: function (ev, changeObj) { // df_skp.GM_Change

                        if (changeObj.value) {
                            // změna SKP => nutná inicializace pole pro definici odpisové skupiny
                            if ((that.DetailDto.priz_odp === 10 && that.cvMajInitSkmTypL === 1) || that.cvMode === 6) // ng_skupinatypIM    or ng_modefrmFill
                            {
                                // TODO: předplnění do recordů odpisu
                                //----------------------------
                                if (that.cvDebug) console.log("NOT IMPLEMENTED: dlg_MajKarta.df_skp.change() - ODPISY");


                                // předplnění do datového pole
                                //----------------------------

                                // df_skp_odp na U odpisu není v MAJ32 dostupné
                                //that.findForms("FormOdpU").findFields("df_skp_odpU").gfield("setValue", changeObj.value.skp);
                                // předplnění klasifikace závislé na odpisech
                                // - vyřešeno dependencí na "df_skupina_odpU"

                            } // end if
                        } // end if (value)

                    }, // end-change
                }).
                gformrow("addFieldsRow", that.ml_nazev_skp.Label).gstringbox({  //RC 24534059 : Název
                    name: "ml_nazev_skp",
                    model: "nazev_skp",
                    // validátor a flag vynechán (neb prvek je disabled) - na serveru se však vyhodnocuje, kdyby bylo třeba jej "aktivovat"
                    disabled: true
                }).css("height", "60px").
                gformrow("addFieldsRow", that.ml_nazev.Label).gstringbox({ //RC 24534099 : Technický název
                    name: "ml_nazev",
                    model: "nazev",
                    validators: that.ml_nazev.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.ml_nazev.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.ml_nazev.Edit === false
                }).css("height", "60px").
                gformrow("addFieldsRow", that.df_mj.Label).gselectbox(Gordic.Prefabs.Select.gincmej(), {  //RC 24534253 : Měrná jednotka
                    name: "df_mj",
                    model: "model.mj=value.mj",
                    validators: that.df_mj.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_mj.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_mj.Edit === false,
                    tooltip: function () {
                        var myVal = $(this).gfield("getValue");
                        if (myVal) return myVal.mj_txt;
                    },
                    change: function (ev, changeObj) { // cdf_SetMj._getF4

                        // TODO: If cdf_SetMj.selAkt = ng_Neaktivni and Dbms._strTrim( item ) = Dbms.sNull
                        // THEN MyValue = 'neurčeno'

                    }, // end-change
                }).


                gformsection("create").
                gformrow("addFieldsRow", that.cmb_dan_typ.Label).gselectbox({  //RC 24534152 : Sazba DPH
                    name: "cmb_dan_typ",
                    model: "model.dan_typ = value.dan_typ",
                    itemTemplate: "{dan_typ_txt} ({dan_proc:number(C0)}%)",
                    dropdown: true,
                    data: new Gordic.Data.View(this.cvEkocdap, { key: "dan_typ" }),
                    disabled: that.cmb_dan_typ.Edit === false,
                    initialValue: 0,
                }).
                //políčko df_id_top je hned vedle NKS, ale mají společný titulek                
                gformrow("addFieldsRow", that.cvLblIdTop).gstringbox({ // NKS
                    name: "df_nks",
                    model: "nks_show",
                    disabled: that.df_nks.Edit === false
                }).
                gformrow("addFieldsRow", that.df_dat_por.Label).gdatebox({ //RC 24534154 : Datum pořízení
                    name: "df_dat_por",
                    model: "dat_por",
                    validators: that.df_dat_por.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_dat_por.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_dat_por.Edit === false,
                    change: function (ev, changeObj) {  // SAM_Validate

                        if (that.cvDebug) console.log("EVENT df_dat_por.change() ");

                        var nepristupne = $(this).gfield("option", "disabled");

                        if (!nepristupne && changeObj.value) {

                            // pouze pokud nejsem ve stavu pořízení
                            if (that.DetailDto.mat_akt !== 18) // ng_majaktPor
                            {
                                var datZar = that.findForms("FormIDs").findFields("df_dat_zar").gfield("getValue");
                                if (!datZar)
                                    that.findForms("FormIDs").findFields("df_dat_zar").gfield("setValue", changeObj.value);
                            } // end if

                            // inicializace období pro výběr akce                             
                            that.akceOdRoku = changeObj.value.getFullYear(); // potřebuji to dostat do toho filtru!
                            if (that.cvDebug) that.logWatch("that.akceOdRoku", that.akceOdRoku);
                        } // end SAM_Validate

                    }, // end-change
                }).
                gformrow("addFieldsRow", that.df_dat_zar.Label).gdatebox({ //RC 24534155 : Datum zařazení
                    name: "df_dat_zar",
                    model: "dat_zar",
                    validators: that.df_dat_zar.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_dat_zar.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_dat_zar.Edit === false,
                    change: function (ev, changeObj) { // df_dat_zar.SAM_Validate
                        // pokud je již zadán typ odpisu na mimořádný, nepovolím změnu 
                        if (!that.checkTypOdp()) return 0; // TODO!!

                        // zadání datumu zařazení predestinuji nabídku filtru typů odpisu
                        // - vyřešeno funkcí na df_typ_odp : _setFiltr( )

                        // nastavení filtru odpisových skupin dle období
                        // - vyřešeno funkcí na df_skupina_odp : _setRok( SalDateYear( df_dat_zar._get(  ) ) )

                        //-----------------------------
                        // dlg_MajKarta.changeDatZar( ) - voláno zatím pouze zde
                        //-----------------------------
                        if (that.DetailDto.priz_odp === 10) {
                            // pokud již karta existuje a má zadaný typ odpisu
                            that.DetailDto.dat_zar = changeObj.value;

                            that.setDobaUziti();
                        } // end if
                        //-----------------------------

                    }, // end-change
                }).
                gformrow("addFieldsRow", that.df_dat_vyr.Label).gdatebox({  //RC 24534156 : Datum vyřazení
                    name: "df_dat_vyr",
                    model: "dat_vyr_show",
                    validators: that.df_dat_vyr.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_dat_vyr.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_dat_vyr.Edit === false
                }).


                gformsection("create").

                gformrow("addFieldsRow", that.df_poznamka.Label).gstringbox({   //RC 24534028 : Popis  
                    name: "df_poznamka",
                    model: "poznamka",
                    validators: that.df_poznamka.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_poznamka.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_poznamka.Edit === false
                }).css("height", "60px").
                gformrow("addFieldsRow", "jres:24534088").gselectbox( {   //RC 24534088 : Typ karty
                    name: 'cmb_tka',
                    model: "model.typ_soubor  = id", // sbírám do typ_soubor !!
                    dropdown: true,
                    data: new Gordic.Data.View([ // výčet není z MAJCTYK, ale typu souboru!
                        { nazev: "jres:24534627", id: 0 },   //RC 24534627 : Samostatná
                        { nazev: "jres:24534628", id: 10 },   //RC 24534628 : Účetní soubor
                        { nazev: "jres:24534629", id: 20 }],  //RC 24534629 : Logistrický soubor
                        { key: "id" }),
                    emptyValue: { id: 0 },
                    initialValue: { nazev: "jres:24534627", id: 0 },
                    itemTemplate: "{nazev}",
                    change: function (ev, changeObj) { // SAM_Click

                        var nepristupne = $(this).gfield("option", "disabled");

                        if (!nepristupne) {
                            // přístup k údajům souboru
                            that.findForms("FormIDs").findFields("df_jmeno_soubor").gfield("option", "disabled", changeObj.value.id === 0);

                            // předplném do názvu souboru technický název                            
                            if (changeObj.value.id === 0) {
                                that.findForms("FormIDs").findFields("df_jmeno_soubor").gfield("setValue", "");
                            } // end if
                            else if (changeObj.value.id > 0) {
                                var nazev = that.findForms("FormIDs").findFields("ml_nazev").gfield("getValue");
                                if (nazev) that.findForms("FormIDs").findFields("df_jmeno_soubor").gfield("setValue", nazev.substring(0, 50));
                            } // end if
                        } // end if

                    }, // end-change
                }).
                gformrow("addFieldsRow", that.df_jmeno_soubor.Label, ["w-3", "w-9"]).gstringbox({  //RC 24534157 : Soubor
                    name: "df_inv_cis_soubor",
                    model: "inv_cis_soubor",
                    disabled: true   // cdf_NoEdit
                }).
                next().gstringbox({
                    name: "df_jmeno_soubor",
                    model: "jmeno_soubor",
                    validators: that.df_jmeno_soubor.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_jmeno_soubor.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_jmeno_soubor.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534245").gdatebox({    //RC 24534245 : Datum UUP změny
                    name: "df_dat_uup",                   
                    model: "dat_uup",                    
                    flag: that.df_dat_uup.Edit, // povinné je-li zpřístupněno
                    validators: [new Gordic.Validators.Required()],
                    disabled: that.df_dat_uup.Edit === false,
                    change: function (ev, changeObj) { // SAM_Validate
                        var nepristupne = $(this).gfield("option", "disabled");
                        if (!nepristupne) that.validateDatUup($(this), changeObj.value);
                    }, // end-change
                })


            // === ÚČETNÍ A CENOVÉ ÚDAJE ==========================================================================
            $("<div data-break-L='900'>").appendTo(this.element).gform("setup", { name: "FormCeny", layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534158", opened: true }).  //RC 24534158 : Účetní a cenové údaje

                gformsection("create", "jres:24534159"). //RC 24534159 : Účetní zatřídění
                gformrow("addFieldsRow", that.df_dat_uct_0123.Label).gdatebox({   // Datum zaúčtování 
                    name: "df_dat_uct_0123",
                    model: "dat_uct_0123",
                    validators: that.df_dat_uct_0123.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_dat_uct_0123.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_dat_uct_0123.Edit === false
                }).
                gformrow("addFieldsRow", that.df_ueab_por.Label).gselectbox(Gordic.Prefabs.Select.majsuea(), { //RC 24534160 : SÚAÚ Pořízení
                    name: "df_ueab_por",
                    model: "model.ueab_por = value.ueab_xxx, model.dev => value.dev, model.drh_id => value.drh_id",
                    modelDefaults: { ixs_vue: this.cvIxsVue, uea: this.cvUeaPor, ueb: this.cvUebPor },
                    validators: that.df_ueab_por.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ueab_por.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ueab_por.Edit === false,
                    serverFilters: {
                        //[name masterpolicka],[nazev klice],[ma-li byt zakazane pokud je master prazdny]
                        drh_id: new Gordic.Forms.Dependency("df_drh_id", "drh_id", true, false, this), // changeDrhId( )
                        dev: that.DetailDto.dev,  // changeDrhId( )
                        ixs_vue: that.cvIxsVue, // bez toho to bude padat
                        // uea: that.ucty.uea_por, // changeDrhId( )
                    },
                    change: function (ev, changeObj) { // df_ueab_por.SAM_AnyEdit + GM_Change

                        // při pokusu vygumovat pole, vnutím tam nastavení dle druhu
                        if (!changeObj.value) {

                            if (that.ucty.uea_por) {
                                $(this).gfield("setValue", { drh_id: that.DetailDto.drh_id, dev: that.DetailDto.dev, uea: that.ucty.uea_por, ixs_vue: that.cvIxsVue, ueab_xxx: that.ucty.uea_por });
                            } // end if

                        } // end if

                    }, // end-change
                }).
                gformrow("addFieldsRow", that.df_ueab_evi.Label).gselectbox(Gordic.Prefabs.Select.majsuea(), {  //RC 24534161 : SÚAÚ Evidence
                    name: "df_ueab_evi",
                    model: "model.ueab_evi = value.ueab_xxx, model.dev => value.dev, model.drh_id => value.drh_id",
                    // validace aktuální hodnoty proti DB
                    modelDefaults: { ixs_vue: this.cvIxsVue, uea: this.cvUeaEvi, ueb: this.cvUebEvi },
                    validators: that.df_ueab_evi.Required ? [new Gordic.Validators.Required()] : undefined,
                    // TODO: povinnost je závislá na  MajInit.skupina_typ_l, což není ještě dotažené (viz GM_Check( ))
                    flag: that.df_ueab_evi.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ueab_evi.Edit === false,
                    // emptyValue: that.cvUeabNull,
                    serverFilters: {
                        //  pouze ve stavu evidence - řešeno v changeDrhId( )
                        //   drh_id: new Gordic.Forms.Dependency("df_drh_id", "drh_id", true, false, this), // changeDrhId( )
                        //   dev: that.DetailDto.dev,  // changeDrhId( )
                        ixs_vue: that.cvIxsVue, // bez toho to bude padat
                    },
                    change: function (ev, changeObj) { // df_ueab_evi.SAM_AnyEdit + GM_Change

                        if (that.cvDebug) {
                            console.log("EVENT df_ueab_evi.change()");
                            console.log(" WATCH - that.ucty = [" + that.ucty + "]");
                            if (that.ucty) console.log(" WATCH - that.ucty.uea_evi = [" + that.ucty.uea_evi + "]");
                        } // end if


                        // při pokusu vygumovat pole, vnutím tam nastavení dle druhu
                        if (!changeObj.value) {

                            if (that.ucty.uea_evi) {
                                $(this).gfield("setValue", { drh_id: that.DetailDto.drh_id, dev: that.DetailDto.dev, uea: that.ucty.uea_evi, ixs_vue: that.cvIxsVue, ueab_xxx: that.ucty.uea_evi });
                            } // end if

                        } // end if

                        // pokud se jedná o drobný dlouhodobý majetek, naplní se ke_pap hodnotou 018000 nebo 0280000
                        if (changeObj.value && changeObj.value.ueab_xxx) {
                            var myUeA = changeObj.value.ueab_xxx.substring(0, 3);
                            if (myUeA === "018" || myUeA === "028")
                                that.findForms("FormCeny").findFields("df_ke_pap").gfield("setValue", { ke_pap: myUeA + "00" });
                        } // end if

                    }, // end-change
                }).
                gformrow("addFieldsRow", that.df_ueab_opr.Label).gselectbox(Gordic.Prefabs.Select.majsuea(), { //RC 24534162 : SÚAÚ Oprávky
                    name: "df_ueab_opr",
                    model: "model.ueab_opr = value.ueab_xxx, model.dev = value.dev, model.drh_id = value.drh_id",
                    modelDefaults: { ixs_vue: this.cvIxsVue, uea: this.cvUeaOpr, ueb: this.cvUebOpr },
                    validators: that.df_ueab_opr.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ueab_opr.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ueab_opr.Edit === false,
                    serverFilters: {
                        drh_id: new Gordic.Forms.Dependency("df_drh_id", "drh_id", true, false, this), // changeDrhId( )
                        dev: that.DetailDto.dev,  // changeDrhId( )
                        ixs_vue: that.cvIxsVue, // bez toho to bude padat
                        //   uea: that.ucty.uea_opr, // changeDrhId( )
                    },
                    change: function (ev, changeObj) { // df_ueab_opr.SAM_AnyEdit + GM_Change

                        // při pokusu vygumovat pole, vnutím tam nastavení dle druhu
                        if (!changeObj.value) {

                            if (that.ucty.uea_opr) {
                                $(this).gfield("setValue", { drh_id: that.DetailDto.drh_id, dev: that.DetailDto.dev, uea: that.ucty.uea_opr, ixs_vue: that.cvIxsVue, ueab_xxx: that.ucty.uea_opr });
                            } // end if

                        } // end if

                    }, // end-change
                }).
                gformrow("addFieldsRow", "jres:24534163").gstringbox({ placeholder: this.cvUeaOpp, disabled: true }). //RC 24534163 : SÚ Opravné položky                
                gformrow("addFieldsRow", that.df_ke_pap.Label).gselectbox({   //RC 24534147 : Analytika PAP
                    name: "df_ke_pap",
                    // TODO: nefunguje "helper"
                    itemTemplate: "{ke_pap:trim:encode}",
                    helperColumns: ["ke_pap", "ke_pap_txt"],
                    helperItemTemplate: "<b>{ke_pap}</b> {ke_pap_txt}",
                    model: "model.ke_pap=value.ke_pap",
                    validators: that.df_ke_pap.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ke_pap.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ke_pap.Edit === false,
                    selector: function (options) { // selektor mám proto, že jsem tehdy nejspíš neměl reader nad MAJCKEP
                        return new Gordic.Data.Selectors.DefaultSelector({ // cdf_SetKePap._setUeaPorFromEvi( )                            
                            data: function () {
                                return that.call("NactiPAP", {
                                    dev: that.DetailDto.dev, // 
                                    tev: that.DetailDto.tev,
                                    ueaPor: that.ucty.uea_por, // df_drh_id.drh.uea_por
                                    ueaEvi: that.ucty.uea_evi, //  df_drh_id.drh.uea_evi
                                })
                            },
                            canSelectEmpty: false,
                            title: "jres:24534331", //RC 24534331 : Výběr analytiky PAP/POR
                            gridOpts: {
                                searchColumns: ["ke_pap", "ke_pap_txt"],
                            },
                            gridFormat: new Gordic.Data.GridFormat()
                                .addTextColumn({
                                    name: "ke_pap",
                                    caption: "jres:24534026", //RC 24534026 : Kód
                                    width: 70
                                })
                                .addTextColumn({
                                    name: "ke_pap_txt",
                                    caption: "",
                                    width: 150
                                })
                        }, { parentElement: that.element, related: that.element }).show();
                    }
                }).
                gformrow("addFieldsRow", that.df_akce.Label).gselectbox({   //RC 24534164 : Akce  
                    name: "df_akce",
                    // TODO: nefunguje "helper"
                    itemTemplate: "{cislo:trim:encode}",
                    helperColumns: ["cislo"],
                    helperItemTemplate: "<b>{cislo}</b>",
                    model: "model.akce=value.cislo",
                    validators: that.df_akce.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_akce.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_akce.Edit === false,
                    selector: function (s) {

                        if (that.cvDebug) console.log(" - EVENT df_akce.selector()");

                        //var myVal = $(this).gfield("getValue");

                        return that.dialogs.showModalWindow("Gordic.Maj.WebClient.GDlgAkce", { argOdRoku: that.akceOdRoku }, "Akce", 800, 700).createDialogPromise().then((result) => {

                            if (that.cvDebug) console.log(" WATCH GDlgAkce.return = [" + result.cislo + "]");

                            return result;
                        })
                    },
                }).
                gformrow("addFieldsRow", that.df_kod_por.Label, ["w-3", "w-9"]).gnumberbox({   //RC 24534122 : Kód pořízení
                    name: "df_kod_por",
                    model: "kod_por",
                    //validators: that.df_kod_por.Required ? [new Gordic.Validators.Required()] : undefined,
                    //flag: that.df_kod_por.Required ? Gordic.Prefabs.Field.Flags.required : undefined,                  
                    disabled: true // pouze čtení
                }).
                next().gstringbox({ name: "df_kod_por_txt", model: "kod_por_txt", disabled: true }).
                gformrow("addFieldsRow", that.df_kod_vyr.Label, ["w-3", "w-9"]).gnumberbox({   //RC 24534123 : Kód vyřazení
                    name: "df_kod_vyr",
                    model: "kod_vyr",
                    //validators: that.df_kod_vyr.Required ? [new Gordic.Validators.Required()] : undefined,
                    //flag: that.df_kod_vyr.Required ? Gordic.Prefabs.Field.Flags.required : undefined,                 
                    disabled: true // pouze čtení
                }).
                next().gstringbox({ name: "df_kod_vyr_txt", model: "kod_vyr_txt", disabled: true }).


                gformsection("create", "jres:24534165"). //RC 24534165 : Ocenění
                gformrow("addFieldsRow", that.df_c.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534096 : Účetní cena
                    name: "df_c",
                    model: "c",
                    initialValue: 0,
                    //validators: that.df_c.Required ? [new Gordic.Validators.Required()] : undefined,
                    // flag: that.df_c.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c.Edit === false,
                    change: function (ev, changeObj) { // SAM_Validate
                        var nepristupne = $(this).gfield("option", "disabled");
                        if (!nepristupne) that.validateC(changeObj.value);
                    },
                }).
                gformrow("addFieldsRow", that.df_c_poriz.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {  //RC 24534146 : Pořizovací cena
                    name: "df_c_poriz",
                    model: "c_poriz",
                    validators: that.df_c_poriz.Required ? [new Gordic.Validators.Required()] : undefined,
                    //flag: that.df_c_poriz.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_poriz.Edit === false
                }).
                gformrow("addFieldsRow", that.df_pmj.Label + // Počet MJ + Cena za MJ
                    "/" + that.df_cmj.Label, ["w-3", "w-9"]).gnumberbox({
                        name: "df_pmj",
                        model: "pmj",
                        decimals: 3,
                        validators: that.df_pmj.Required ? [new Gordic.Validators.Required()] : undefined,
                        // flag: that.df_pmj.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                        disabled: that.df_pmj.Edit === false,
                        change: function (ev, changeObj) { // SAM_Validate
                            var nepristupne = $(this).gfield("option", "disabled");
                            if (!nepristupne) that.validatePmj(changeObj.value);
                        },
                    }).
                next().gnumberbox(Gordic.Prefabs.Number.currency(), {
                    name: "df_cmj",
                    model: "cmj",
                    validators: that.df_cmj.Required ? [new Gordic.Validators.Required()] : undefined,
                    //  flag: that.df_cmj.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_cmj.Edit === false,
                    change: function (ev, changeObj) { // SAM_Validate
                        var nepristupne = $(this).gfield("option", "disabled");
                        if (!nepristupne) {
                            // přepočet ceny: C = CMJ + PMJ
                            var pmj = that.findForms("FormCeny").findFields("df_pmj").gfield("getValue");
                            that.findForms("FormCeny").findFields("df_c").gfield("setValue", changeObj.value * pmj); // df_c = df_cmj * df_pmj
                            //that.validateC(?); // setValue snad odstartuje trigger change()
                        } // end if
                    }, // end change
                }).
                gformrow("addFieldsRow", that.df_c_real.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {  //RC 24534166 : Reálná hodnota
                    name: "df_c_real",
                    model: "c_real",
                    validators: that.df_c_real.Required ? [new Gordic.Validators.Required()] : undefined,
                    // flag: that.df_c_real.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_real.Edit === false
                }).
                gformrow("addFieldsRow", that.df_c_opr_pol.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {  //RC 24534167 : Opravné položky
                    name: "df_c_opr_pol",
                    model: "c_opr_pol",
                    validators: that.df_c_opr_pol.Required ? [new Gordic.Validators.Required()] : undefined,
                    // flag: that.df_c_opr_pol.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_opr_pol.Edit === false
                }).
                gformrow("addFieldsRow", that.df_c_dotace.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534069 : Transfer
                    name: "df_c_dotace",
                    model: "c_dotace",
                    initialValue: 0,
                    //validators: that.df_c_dotace.Required ? [new Gordic.Validators.Required(), this.myValidators.validatePositive] : [this.myValidators.validatePositive],
                    validators: [this.myValidators.validatePositive],
                    //flag: that.df_c_dotace.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_dotace.Edit === false,
                    change: function (ev, changeObj) { // SAM_Validate
                        var nepristupne = $(this).gfield("option", "disabled");
                        if (!nepristupne) that.validateCDotace(changeObj.value, $(this));
                    }, // end change
                }).
                gformrow("addFieldsRow", "PMJ res./min./max.", ["w-3", "w-3", "w-3"]).gnumberbox({
                    name: "df_pmj_res",
                    // TODO: není lokalizováno + tady ten popisek lze asi těžko vyskládat z ItemsSet!
                    model: "pmj_res",
                    decimals: 3,
                    // validators: that.df_pmj_res.Required ? [new Gordic.Validators.Required()] : undefined,
                    // flag: that.df_pmj_res.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: true, // that.df_pmj_res.Edit === false
                }).
                next().gnumberbox({
                    name: "df_pmj_min",
                    model: "pmj_min",
                    decimals: 3,
                    validators: that.df_pmj_min.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_pmj_min.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_pmj_min.Edit === false
                }).
                next().gnumberbox({
                    name: "df_pmj_max",
                    model: "pmj_max",
                    decimals: 3,
                    validators: that.df_pmj_max.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_pmj_max.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_pmj_max.Edit === false
                }).


                gformsection("create", "jres:24534168"). //RC 24534168 : Rozpis DPH
                gformrow("addFieldsRow", "jres:24534169").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534169 : DPH
                    name: "df_c_dph",
                    model: "c_dph",
                    initialValue: 0,
                    //  flag: that.df_c_dph.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_dph.Edit === false,
                    change: function (ev, changeObj) { //  SAM_Validate

                        var nepristupne = $(this).gfield("option", "disabled");

                        if (!nepristupne) {
                            // BOOKMARK: TODO: tuto validaci dát také na server

                            var c_dph_odpocet = that.findForms("FormCeny").findFields("df_c_dph_odpocet").gfield("getValue");
                            var c = that.findForms("FormCeny").findFields("df_c").gfield("getValue");

                            if (that.cvDebug) {
                                that.logWatch("df_c_dph_odpocet", c_dph_odpocet);
                                that.logWatch("df_c", c);
                            } // end if


                            // předplnění odpočtu                            
                            if (!(c_dph_odpocet > 0)) {
                                that.findForms("FormCeny").findFields("df_c_dph_odpocet").gfield("setValue", changeObj.value);
                                c_dph_odpocet = changeObj.value; // budu potřebovat o pár řádků níže, tak až se znova nemusí hledat políčko
                            } // end if

                            // předplnění celkové ceny - dle příznaku, je-li plátce či ne
                            if (that.cvEkoPlatceDph === 0 && that.cvMajPlatceDph === 0) {
                                // není plátce - bude to PC

                                that.findForms("FormCeny").findFields("df_c_c_dph").gfield("setValue", c);
                            }
                            else {

                                // 378.17 20.09.17 pokud je zadán odpočet, použije se pro výpočet celkové ceny s DPH 
                                if (c_dph_odpocet > 0) {
                                    // df_c_c_dph = df_c + df_c_dph_odpocet
                                    that.findForms("FormCeny").findFields("df_c_c_dph").gfield("setValue", c + c_dph_odpocet);
                                }
                                else {
                                    // df_c_c_dph = df_c + MyValue
                                    that.findForms("FormCeny").findFields("df_c_c_dph").gfield("setValue", c + changeObj.value);
                                } // end if-else

                            } // end if-else

                            that.validateDph();

                        } // end if (nepristupne)
                    }, // end change()
                }).
                gformrow("addFieldsRow", that.df_c_dph_odpocet.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534170 : Odpočet DPH
                    name: "df_c_dph_odpocet",
                    model: "c_dph_odpocet",
                    initialValue: 0,
                    //   validators: that.df_c_dph_odpocet.Required ? [new Gordic.Validators.Required()] : undefined,
                    //    flag: that.df_c_dph_odpocet.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_dph_odpocet.Edit === false,
                    change: function (ev, changeObj) { // SAM_Validate

                        var nepristupne = $(this).gfield("option", "disabled");

                        if (!nepristupne) {

                            // pokud je zadán odpočet, použije se pro výpočet celkové ceny s DPH
                            if (changeObj.value > 0)
                                if (!(that.cvEkoPlatceDph === 0 && that.cvMajPlatceDph === 0)) {

                                    var c = that.findForms("FormCeny").findFields("df_c").gfield("getValue");
                                    // Set df_c_c_dph = df_c + df_c_dph_odpocet
                                    that.findForms("FormCeny").findFields("df_c_c_dph").gfield("setValue", c + changeObj.value);

                                } // end if

                            that.validateDph();
                        } // end if (nepristupne)

                    }, // end change()
                }).
                gformrow("addFieldsRow", that.df_c_c_dph.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534171 : Celková cena s DPH
                    name: "df_c_c_dph",
                    model: "c_c_dph",
                    initialValue: 0,
                    //   validators: that.df_c_c_dph.Required ? [new Gordic.Validators.Required()] : undefined,
                    //    flag: that.df_c_c_dph.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_c_dph.Edit === false,
                    change: function (ev, changeObj) { // SAM_Validate

                        var nepristupne = $(this).gfield("option", "disabled");

                        if (!nepristupne) that.validateDph();

                    }, // end change()
                }).


                gformsection("create", "jres:24534172"). //RC 24534172 : Prodejní ceny                
                gformrow("addFieldsRow", that.df_cmj_pro1.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {
                    name: "df_cmj_pro1",
                    model: "cmj_pro1",
                    validators: that.df_cmj_pro1.Required ? [new Gordic.Validators.Required(), this.myValidators.validatePositive] : [this.myValidators.validatePositive],
                    flag: that.df_cmj_pro1.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_cmj_pro1.Edit === false,
                    change: function (ev, changeObj) { // SAM_Validate

                        var nepristupne = $(this).gfield("option", "disabled");
                        // hned to zvaliduji, pokud je pole přístupné
                        if (!nepristupne) $(this).gfield("instance").validate();

                    }, // end change()
                }).
                gformrow("addFieldsRow", that.df_cmj_pro2.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {
                    name: "df_cmj_pro2",
                    model: "cmj_pro2",
                    validators: that.df_cmj_pro2.Required ? [new Gordic.Validators.Required(), this.myValidators.validatePositive] : [this.myValidators.validatePositive],
                    flag: that.df_cmj_pro2.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_cmj_pro2.Edit === false,
                    change: function (ev, changeObj) { // SAM_Validate

                        var nepristupne = $(this).gfield("option", "disabled");
                        // hned to zvaliduji, pokud je pole přístupné
                        if (!nepristupne) $(this).gfield("instance").validate();

                    }, // end change()
                }).
                gformrow("addFieldsRow", that.df_cmj_pro2.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {
                    name: "df_cmj_pro3",
                    model: "cmj_pro3",
                    validators: that.df_cmj_pro3.Required ? [new Gordic.Validators.Required(), this.myValidators.validatePositive] : [this.myValidators.validatePositive],
                    flag: that.df_cmj_pro3.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_cmj_pro3.Edit === false,
                    change: function (ev, changeObj) { // SAM_Validate

                        var nepristupne = $(this).gfield("option", "disabled");
                        // hned to zvaliduji, pokud je pole přístupné
                        if (!nepristupne) $(this).gfield("instance").validate();

                    }, // end change()
                })


            // === ÚČETNÍ ODPISY ==========================================================================
            $("<div data-break-L='900'>").appendTo(jsShowTabOdpisU).gform("setup", { name: "FormOdpU", layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534174", opened: false }).  //RC 24534174 : Účetní odpisy

                gformsection("create", "jres:24534175"). //RC 24534175 : Parametry odpisu

                gformrow("addFieldsRow", "jres:24534176").gselectbox(Gordic.Prefabs.Select.ekovkzo(), {   //RC 24534176 : Odpisová skupina 
                    name: "df_skupina_odpU",
                    model: "model.skp => value.skp, model.odp.skupina_odp_u=value.skupina_odp, model.odp.polozka_odp_u=value.polozka_odp, model.odp.rok_skp_od_u=value.rok_od", //  - do modelu seberu i "rok_od" - viz getKartaItemsOdp( )
                    serverFilters: {
                        // skupina je dána podle df_skp
                        skp: new Gordic.Forms.Dependency("df_skp", "skp", true, false, this),
                        skupina_odp: new Gordic.Forms.Dependency("df_skp", "skupina_odp", true, false, this),
                        polozka_odp: new Gordic.Forms.Dependency("df_skp", "polozka_odp", true, false, this),
                        // funkce ve filtru: df_dat_zar.SAM_Validate( )
                        rok_od: function () {
                            var datZar = that.findForms("FormIDs").findFields("df_dat_zar").gfield("getValue");
                            if (datZar)
                                return datZar.getFullYear();
                            else
                                return that.cvEkoRok; // cfc_Skp.init( )
                        },
                    },
                    validators: that.df_skupina_odpU.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_skupina_odpU.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_skupina_odpU.Edit === false
                    // TODO: GM_Change
                }).
                gformrow("addFieldsRow", "jres:24534177").gselectbox(Gordic.Prefabs.Select.majstod(), {   //RC 24534177 : Typ odpisu
                    // dlg_majTypOdp
                    name: "df_typ_odpU",
                    model: "model.odp.typ_odp_u = value.typ_odp, model.odp.rok_start_typ_u = value.rok_start_typ", // { dlg_majTypOdp }
                    // filtr typu odpisu je různý, v závislosti na typu DM, ale i roce zařazení
                    serverFilters: {
                        aktivita: 100,
                        // df_dat_zar.SAM_Validate - NEVÍM, JESTLI TO PLATÍ OBECNĚ (!) - proč to přebírat z "df_skupina_odp" když tak se to přebírá z "df_skp"?
                        filtr: function () {
                            //----------------------------
                            // cdf_SetTypOdp.__setFiltr( )
                            //----------------------------
                            var datZar = that.findForms("FormIDs").findFields("df_dat_zar").gfield("getValue");

                            if (that.cvSkupinaTypDm === 10 && datZar && datZar.getFullYear >= 2004 && that.cvEkoRok >= 2004) // ng_typdmNM
                                // od roku 2004 je DNM odepisován rovnoměrně dle druhu
                                return new Gordic.Forms.Dependency("df_drh_id", "drh_id", true, false, this);
                            else
                                // většinově však definuju fltr na základě období a druhu majetku
                                return new Gordic.Forms.Dependency("df_skp", "skupina_odp", true, false, this);
                            //----------------------------
                        } // end function (filtr)
                    },
                    validators: that.df_typ_odpU.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_typ_odpU.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_typ_odpU.Edit === false,
                }).
                gformrow("addFieldsRow", "jres:24534178" + " R").gnumberbox({  //RC 24534178 : Předpokl. doba používání                
                    name: "df_doba_uziti",
                    // TODO: setDobaUziti( )
                    model: "odp.doba_uziti_u",
                    validators: that.df_doba_uziti.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_doba_uziti.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_doba_uziti.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534179" + " R/M", ["w-6", "w-6"]).gnumberbox({   //RC 24534179 : Odpis realizován
                    name: "df_pro_r",
                    model: "pro_r", // vypočtený sloupec 
                    validators: that.df_pro_rm.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_pro_rm.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_pro_rm.Edit === false // je-li parametry dovoleno (UVUJRov)
                }).
                next().gnumberbox({
                    name: "df_pro_m",
                    model: "pro_m",  // vypočtený sloupec 
                    validators: that.df_pro_rm.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_pro_rm.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_pro_rm.Edit === false // je-li parametry dovoleno (UVUJRov)
                }).
                gformrow("addFieldsRow", "jres:24534180").gnumberbox({   //RC 24534180 : Aktuální rok odpisu   
                    name: "df_rok_odpisovU",
                    model: "odp.rok_odpisov_u",
                    disabled: that.df_rok_odpisovU.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534181" + " R/M", ["w-6", "w-6"]).gnumberbox({ name: "df_doba_uziti_ind", model: "doba_uziti_ind_u", disabled: true }). //RC 24534181 : Zbývající doba
                next().gnumberbox({ name: "df_doba_uziti_indm", model: "doba_uziti_indm_u", disabled: true }).
                gformrow("addFieldsRow", "jres:24534182").gstringbox({ name: "df_obd_odp1", model: "exp_odbodp_d", disabled: true }). //RC 24534182 : Období odpisu
                gformrow("addFieldsRow", "jres:24534183").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534183 : Sazba
                    name: "df_c_sazba_odpU",
                    model: "odp.c_sazba_odp_u",
                    emptyValue: 0, // gf_NVL( df_c_sazba_odp, 0 )
                    disabled: true
                }).

                gformsection("create", "jres:24534165"). //RC 24534165 : Ocenění

                gformrow("addFieldsRow", "jres:24534146").gnumberbox(Gordic.Prefabs.Number.currency(), {  //RC 24534146 : Pořizovací cena
                    name: "df_c_porU",
                    model: "c_poriz", // přebírá se z c_poriz karty
                    disabled: true
                }).
                gformrow("addFieldsRow", "jres:24534184").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534184 : Vstupní cena
                    name: "df_c_vstupU",
                    model: "odp.c_vstup_u",
                    emptyValue: 0, // gf_NVL( df_c_vstup, 0 )
                    validators: that.df_c_vstupU.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_vstupU.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_vstupU.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534185").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534185 : Oprávky
                    name: "df_c_opravkaU",
                    model: "odp.c_opr_u",
                    emptyValue: 0, // gf_NVL( df_c_opravka, 0 )
                    validators: that.df_c_opravkaU.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_opravkaU.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_opravkaU.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534186").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534186 : Zůstatková cena  
                    name: "df_c_zustU",
                    model: "odp.c_zust_u",
                    emptyValue: 0, // gf_NVL( df_c_zust, 0 )
                    validators: that.df_c_zustU.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_zustU.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_zustU.Edit === false
                }).
                gformrow("addFieldsRow", "%PC/" + "jres:24534187", ["w-2", "w-10"]).gnumberbox({    //RC 24534187 : Zbytková hodnota
                    name: "df_c_zbytek_proc", // zbytková hodnota v PC%
                    model: "odp.c_zbytek_proc_u",
                    validators: that.df_c_zbytek_proc.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_zbytek_proc.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_zbytek_proc.Edit === false
                }).
                next().gnumberbox(Gordic.Prefabs.Number.currency(), {
                    name: "df_c_zbytekU", // zbytková hodnota - částka
                    model: "odp.c_zbytek_u",
                    validators: that.df_c_zbytekU.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_zbytekU.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_zbytekU.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534188").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534188 : Poslední odpis 
                    name: "df_c_last_odpU",
                    model: "odp.c_last_odp_u",
                    disabled: true
                }).
                gformrow("addFieldsRow", "jres:24534189").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534189 : Odpis za rok
                    name: "df_c_rok_odpU",
                    model: "odp.c_rok_odp_u",
                    emptyValue: 0, // gf_NVL( df_c_rok_odp, 0 )
                    validators: that.df_c_rok_odpU.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_rok_odpU.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_rok_odpU.Edit === false
                }).


                gformsection("create", "jres:24534190"). //RC 24534190 : Výkonový odpis    
                // TODO: odemčení výkoového odpisu!

                gformrow("addFieldsRow", "jres:24534191").gselectbox(Gordic.Prefabs.Select.gincmej(), {  //RC 24534191 : Měřitelná jednotka 
                    name: "df_mj_odp",
                    model: "model.odp.mj_u=value.mj",
                    validators: that.df_mj_odp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_mj_odp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_mj_odp.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534192").gnumberbox({  //RC 24534192 : Předpokládaný počet užití MJ celkem
                    name: "df_pc_poc_uzi_mj",
                    model: "odp.pc_poc_uzi_mj_u",
                    validators: that.df_mj_odp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_mj_odp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_mj_odp.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534193").gnumberbox({  //RC 24534193 : Předpokládaný počet užití MJ za rok
                    name: "df_py_poc_uzi_mj",
                    model: "odp.py_poc_uzi_mj_u",
                    validators: that.df_mj_odp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_mj_odp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_mj_odp.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534194").gnumberbox(Gordic.Prefabs.Number.currency(), {  //RC 24534194 : Částka odpisu za jednu MJ
                    name: "df_c_odp_mj",
                    model: "odp.c_odp_mj_u",
                    disabled: true
                }).
                gformrow("addFieldsRow", "jres:24534195").gnumberbox({   //RC 24534195 : Skutečný počet užití MJ celkem
                    name: "df_rc_poc_uzi_mj",
                    model: "odp.rc_poc_uzi_mj_u",
                    emptyValue: 0, // gf_NVL( df_rc_poc_uzi_mj, 0 )
                    disabled: true
                }).
                gformrow("addFieldsRow", "jres:24534196").gnumberbox({   //RC 24534196 : Skutečný počet užití MJ za období odpisu
                    name: "df_ro_poc_uzi_mj",
                    model: "odp.ro_poc_uzi_mj_u",
                    disabled: that.df_mj_odp.Edit === false
                }).


                gformsection("create", "jres:24534197"). //RC 24534197 : Transfery                
                //gformrow("addFieldsRow", "jres:24534069").gnumberbox(Gordic.Prefabs.Number.currency(), { name: "df_c_dotace2", model: "c_dotace", disabled: true }). //RC 24534069 : Transfer
                gformrow("addFieldsRow", "jres:24534198").gnumberbox(Gordic.Prefabs.Number.currency(), { name: "df_c_dotace_opr", model: "c_dotace_opr_u", disabled: true }). //RC 24534198 : Rozpuštěný transfer
                gformrow("addFieldsRow", "jres:24534199").gnumberbox(Gordic.Prefabs.Number.currency(), { name: "df_c_dotace_rest", model: "c_dotace_ner", disabled: true }). //RC 24534199 : Nerozpuštěný transfer
                gformrow("addFieldsRow", "jres:24534200").gnumberbox(Gordic.Prefabs.Number.currency(), { name: "df_c_dotace_odp", model: "c_dotace_odp_u", disabled: true }) //RC 24534200 : Časové rozlišení transferu


            // === DAŇOVÉ ODPISY ==========================================================================
            $("<div data-break-L='900'>").appendTo(jsShowTabOdpisD).gform("setup", { layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534201", opened: false }).  //RC 24534201 : Daňové odpisy

                gformsection("create", "jres:24534175"). //RC 24534175 : Parametry odpisu
                gformrow("addFieldsRow", "jres:24534523").gselectbox(Gordic.Prefabs.Select.ekoskla(), {   //RC 24534523 : CZ-CPA
                    name: "df_skp_odp",
                    model: "odp.skp_d = value.skp",
                    serverFilters: { aktivita: 100 },
                    validators: that.df_skp_odp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_skp_odp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_skp_odp.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534176").gselectbox(Gordic.Prefabs.Select.ekovkzo(), {   //RC 24534176 : Odpisová skupina 
                    name: "df_skupina_odpD",
                    model: "model.odp.skp_d = value.skp, model.odp.skupina_odp_d = value.skupina_odp, model.odp.polozka_odp_d = value.polozka_odp, model.odp.rok_skp_od_d = value.rok_od", //  - do modelu seberu i "rok_od" - viz getKartaItemsOdp( )                    
                    validators: that.df_skupina_odpD.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_skupina_odpD.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_skupina_odpD.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534177").gselectbox(Gordic.Prefabs.Select.majstod(), {  //RC 24534177 : Typ odpisu
                    name: "df_typ_odpD",
                    model: "model.odp.typ_odp_d = value.typ_odp, model.odp.rok_start_typ_d = value.rok_start_typ",
                    // filtr typu odpisu je různý, v závislosti na typu DM, ale i roce zařazení
                    serverFilters: {
                        aktivita: 100,
                    },
                    validators: that.df_typ_odpD.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_typ_odpD.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_typ_odpD.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534202").gnumberbox({   //RC 24534202 : Rok počátku odpisu
                    name: "df_rok_start_odp",
                    model: "odp.rok_start_odp_d",
                    emptyValue: 0, // gf_NVL( df_rok_start_odp, 0 )
                    validators: that.df_rok_start_odp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_rok_start_odp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_rok_start_odp.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534180").gnumberbox({  //RC 24534180 : Aktuální rok odpisu
                    name: "df_rok_odpisovD",
                    model: "odp.rok_odpisov_d",
                    disabled: that.df_rok_odpisovD.Edit === false
                }).
                gformrow("addFieldsRow", that.df_dp_ode.Label).gnumberbox({  //RC 24534203 : Odpočet ze základu DP
                    name: "df_dp_ode",
                    model: "dp_ode", // maj.dp_ode
                    validators: that.df_dp_ode.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_dp_ode.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_dp_ode.Edit === false
                }).
                gformrow("addFieldsRow", that.df_c_sazba_odpD.Label).gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534183 : Sazba
                    name: "df_c_sazba_odpD",
                    model: "odp.c_sazba_odp_d",
                    emptyValue: 0, // gf_NVL( df_c_sazba_odp, 0 )
                    disabled: true
                }).
                gformrow("addFieldsRow", "jres:24534182").gstringbox({ name: "df_obd_odp2", model: "exp_odbodp_d", disabled: true }). //RC 24534182 : Období odpisu
                gformrow("addFieldsRow", "jres:24534204").gnumberbox({  //RC 24534204 : Rok technického zhodnocení
                    name: "df_rok_zvys_vc",
                    model: "odp.rok_zvys_vc_d",
                    emptyValue: 0, // gf_NVL( df_rok_zvys_vc, 0 )
                    disabled: true
                }).
                gformrow("addFieldsRow", "jres:24534205").gnumberbox({   //RC 24534205 : Aktuální rok odpisu ze ZVC
                    name: "df_rok_odpisov_zvc",
                    model: "odp.rok_odpisov_zvc_d",
                    emptyValue: 0, // gf_NVL( df_rok_odpisov_zvc, 0 )
                    disabled: true
                }).
                gformrow("addFieldsRow", "jres:24534206").gnumberbox({   //RC 24534206 : Počet roků přerušení odpisu
                    name: "df_stop_rok_odp",
                    model: "odp.stop_rok_odp_d",
                    emptyValue: 0, // gf_NVL( df_stop_rok_odp, 0 )
                    disabled: true
                }).
                gformrow("addFieldsRow", "jres:24534207").gnumberbox({   //RC 24534207 : Počet roků přerušení odpisu ze ZVC
                    name: "df_stop_rok_odp_zvc",
                    model: "odp.stop_rok_odp_zvc_d",
                    emptyValue: 0, // gf_NVL( df_stop_rok_odp_zvc, 0 )
                    disabled: true
                }).


                gformsection("create", "jres:24534165"). //RC 24534165 : Ocenění
                gformrow("addFieldsRow", "jres:24534146").gnumberbox(Gordic.Prefabs.Number.currency(), { name: "df_c_porD", model: "c_poriz", disabled: true }). //RC 24534146 : Pořizovací cena
                gformrow("addFieldsRow", "jres:24534184").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534184 : Vstupní cena
                    name: "df_c_vstupD",
                    model: "odp.c_vstup_d",
                    emptyValue: 0, // gf_NVL( df_c_vstup, 0 )
                    validators: that.df_c_vstupD.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_vstupD.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_vstupD.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534185").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534185 : Oprávky
                    name: "df_c_opravkaD",
                    model: "odp.c_opr_d",
                    emptyValue: 0, // gf_NVL( df_c_opravka, 0 )
                    validators: that.df_c_opravkaD.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_opravkaD.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_opravkaD.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534186").gnumberbox(Gordic.Prefabs.Number.currency(), {  //RC 24534186 : Zůstatková cena
                    name: "df_c_zustD",
                    model: "odp.c_zust_d",
                    emptyValue: 0, // gf_NVL( df_c_zust, 0 )
                    validators: that.df_c_zustD.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_zustD.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_zustD.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534187").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534187 : Zbytková hodnota
                    name: "df_c_zbytekD",
                    model: "odp.c_zbytek_d",
                    validators: that.df_c_zbytekD.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_zbytekD.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_zbytekD.Edit === false
                }).
                gformrow("addFieldsRow", "jres:24534188").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534188 : Poslední odpis
                    name: "df_c_last_odpD",
                    model: "odp.c_last_odp_d",
                    disabled: true
                }).
                gformrow("addFieldsRow", "jres:24534189").gnumberbox(Gordic.Prefabs.Number.currency(), {   //RC 24534189 : Odpis za rok
                    name: "df_c_rok_odpD",
                    model: "odp.c_rok_odp_d",
                    emptyValue: 0, // gf_NVL( df_c_rok_odp, 0 )
                    validators: that.df_c_rok_odpD.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_c_rok_odpD.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_c_rok_odpD.Edit === false
                })

            // === TOPOLOGIE ==========================================================================
            $("<div data-break-L='900'>").appendTo(this.element).gform("setup", { name: "FormTopol", layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534208", opened: false }). //RC 24534208 : Topologie

                gformsection("create").
                gformrow("addFieldsRow", that.df_trida.Label).gselectbox(Gordic.Prefabs.Select.majstri(), {   //RC 24534108 : Třída
                    name: "df_trida",
                    // TODO: df_trida._getTooltip( majpol_p.maj.trida )
                    model: "model.trida=value.trida",
                    validators: that.df_trida.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_trida.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_trida.Edit === false,
                    emptyValue: { trida: " ", nazev: "" }, // TODO: pozor na Dbms._strInit( )!
                }).
                gformrow("addFieldsRow", that.df_stredisko.Label).gselectbox(Gordic.Prefabs.Select.ekosstr(), {   //RC 24534209 : Evidenční středisko  
                    name: "df_stredisko",
                    // TODO: df_stredisko._getTooltip( majpol_p.maj.stredisko )
                    model: "model.stredisko=value.stredisko",
                    validators: that.df_stredisko.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_stredisko.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_stredisko.Edit === false
                }).
                gformrow("addFieldsRow", that.df_objekt.Label).gselectbox(Gordic.Prefabs.Select.ekosobj(), {  //RC 24534128 : Objekt
                    name: "df_objekt",
                    // TODO: df_objekt._getTooltip( majpol_p.maj.objekt )
                    model: "model.objekt=value.objekt",
                    serverFilters: { aktivita: [100] },
                    validators: that.df_objekt.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_objekt.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_objekt.Edit === false
                }).
                gformrow("addFieldsRow", that.df_ixs_orj.Label).gselectbox(Gordic.Prefabs.Select.ginsorj(), {   //RC 24534114 : Referát
                    name: "df_ixs_orj",
                    model: "model.ixs_orj=value.ixs_orj",
                    validators: that.df_ixs_orj.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ixs_orj.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ixs_orj.Edit === false
                }).
                gformrow("addFieldsRow", that.df_ixs_ref.Label).gselectbox(Gordic.Prefabs.Select.ginsref(), {   //RC 24534210 : Zodpovídá
                    name: "df_ixs_ref",
                    model: "model.ixs_ref=value.ixs_ref",
                    validators: that.df_ixs_ref.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ixs_ref.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ixs_ref.Edit === false
                }).


                gformsection("create").
                // { cdf_SetBudova } 
                gformrow("addFieldsRow", that.df_budova_kod.Label).gselectbox(Gordic.Prefabs.Select.ginsbudmaj(), {   //RC 24534115 : Budova
                    name: "df_budova_kod",
                    model: "model.budova_kod=value.budova_kod",
                    serverFilters: { aktivita: 100 },
                    validators: that.df_budova_kod.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_budova_kod.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_budova_kod.Edit === false,
                    tooltip: function () {
                        var myVal = $(this).gfield("getValue");
                        if (myVal) return myVal.budova_naz;
                    },
                }).
                // { cdf_SetSegment }   
                gformrow("addFieldsRow", that.df_segment_kod.Label).gselectbox(Gordic.Prefabs.Select.ginssbumaj(), {    //RC 24534211 : Segment
                    name: "df_segment_kod",
                    model: "model.budova_kod=value.budova_kod;model.segment_kod=value.segment_kod",
                    serverFilters: {
                        aktivita: 100,
                        budova_kod: new Gordic.Forms.Dependency("df_budova_kod", "budova_kod", false, false, this),    //[name masterpolicka],[nazev klice],[ma-li byt zakazane pokud je master prazdny]
                    },
                    validators: that.df_segment_kod.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_segment_kod.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_segment_kod.Edit === false,
                    tooltip: function () {
                        var myVal = $(this).gfield("getValue");
                        if (myVal) return myVal.segment_naz;
                    },
                }).
                // { cdf_SetMistnost }
                // TODO: BOOKMARK: prověřit! - políčko místnost v případě MMB vrací ještě další sloupce (ixs_orj apod.)
                gformrow("addFieldsRow", that.df_mistnost_kod.Label).gselectbox(Gordic.Prefabs.Select.ginsmismaj(), {    //RC 24534116 : Místnost
                    name: "df_mistnost_kod",
                    model: "model.budova_kod=value.budova_kod;model.segment_kod=value.segment_kod;model.mistnost_kod=value.mistnost_kod",
                    serverFilters: {
                        aktivita: 100,
                        budova_kod: new Gordic.Forms.Dependency("df_budova_kod", "budova_kod", false, false, this),    //[name masterpolicka],[nazev klice],[ma-li byt zakazane pokud je master prazdny]
                        segment_kod: new Gordic.Forms.Dependency("df_segment_kod", "segment_kod", false, false, this),    //[name masterpolicka],[nazev klice],[ma-li byt zakazane pokud je master prazdny]
                    },
                    validators: that.df_mistnost_kod.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_mistnost_kod.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_mistnost_kod.Edit === false,
                    tooltip: function () {
                        var myVal = $(this).gfield("getValue");
                        if (myVal) return myVal.mistnost_naz;
                    },
                }).


                gformsection("create").   //RC 24534143 : Externí lokace
                gformrow("addFieldsRow", that.df_ext_1.Label).gselectbox(Gordic.Prefabs.Select.majsel1(), {
                    name: "df_ext_1",
                    model: "model.ext_1=value.ext_1;cvEkoIco=value.ico",
                    validators: that.df_ext_1.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ext_1.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ext_1.Edit === false
                }).
                gformrow("addFieldsRow", that.df_ext_2.Label).gselectbox(Gordic.Prefabs.Select.majsel2(), {
                    name: "df_ext_2",
                    model: "model.ext_2=value.ext_2;cvEkoIco=value.ico",
                    validators: that.df_ext_2.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ext_2.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ext_2.Edit === false
                }).
                gformrow("addFieldsRow", that.df_ext_3.Label).gselectbox(Gordic.Prefabs.Select.majsel3(), {
                    name: "df_ext_3",
                    model: "model.ext_3=value.ext_3;cvEkoIco=value.ico",
                    validators: that.df_ext_3.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ext_3.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ext_3.Edit === false
                }).


                gformsection("create").
                gformrow("addFieldsRow", that.df_gps_sirka.Label).gstringbox(Gordic.Prefabs.GStringBox.gps(), {   //RC 24534213 : Zeměpisná šířka
                    name: "df_gps_sirka",
                    model: "gps_sirka",
                    validators: that.df_gps_sirka.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_gps_sirka.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_gps_sirka.Edit === false
                }).
                gformrow("addFieldsRow", that.df_gps_delka.Label).gstringbox(Gordic.Prefabs.GStringBox.gps(), {
                    name: "df_gps_delka",
                    model: "gps_delka",
                    validators: that.df_gps_delka.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_gps_delka.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_gps_delka.Edit === false
                })

            // === EXTERNÍ SUBJEKTY ==========================================================================
            $("<div data-break-L='900'>").appendTo(this.element).gform("setup", { name: "FormEsu", layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534215", opened: false }).  //RC 24534215 : Externí subjekty

                gformsection("create", "").
                gformrow("addFieldsRow", "jres:24534130").gselectbox(Gordic.Prefabs.Select.ginsesu(), {   //RC 24534130 : Výrobce
                    name: 'df_ixs_esu_vyr',
                    model: "model.ixs_esu_vyr=value.ixs_esu",
                    validators: that.df_ixs_esu_vyr.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ixs_esu_vyr.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ixs_esu_vyr.Edit === false // TODO: měly by být přístupné, ale nejsou :-(
                }).
                gformrow("addFieldsRow", "jres:24534072").gselectbox(Gordic.Prefabs.Select.ginsesu(), {  //RC 24534072 : Dodavatel
                    name: 'df_ixs_esu_dod',
                    model: "model.ixs_esu_dod=value.ixs_esu",
                    validators: that.df_ixs_esu_dod.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ixs_esu_dod.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ixs_esu_dod.Edit === false
                }).
                gformsection("create", "").
                gformrow("addFieldsRow", "jres:24534216").gselectbox(Gordic.Prefabs.Select.ginsesu(), {   //RC 24534216 : Servisní organizace
                    name: 'df_ixs_esu_servis',
                    model: "model.ixs_esu_servis=value.ixs_esu",
                    validators: that.df_ixs_esu_servis.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ixs_esu_servis.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ixs_esu_servis.Edit === false
                }).
                gformrow("addFieldsRow", that.df_ixs_esu_vla.Label).gselectbox(Gordic.Prefabs.Select.ginsesu(), {   //RC 24534142 : Vlastník 
                    name: 'df_ixs_esu_vla',
                    model: "model.ixs_esu_vla=value.ixs_esu",
                    validators: that.df_ixs_esu_vla.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ixs_esu_vla.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ixs_esu_vla.Edit === false
                })

            // === TECHNICKÉ ÚDAJE ==========================================================================
            $("<div data-break-L='900'>").appendTo(this.element).gform("setup", { name: "FormTech", layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534217", opened: false }).  //RC 24534217 : Technické údaje

                gformsection("create", "jres:24534218"). //RC 24534218 : Rozměry a hmotnost
                gformrow("addFieldsRow", that.df_rozmer_l.Label).gnumberbox({   //RC 24534134 : Délka
                    name: "df_rozmer_l",
                    model: "rozmer_l",
                    decimals: 2,
                    validators: that.df_rozmer_l.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_rozmer_l.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_rozmer_l.Edit === false
                }).
                gformrow("addFieldsRow", that.df_rozmer_w.Label).gnumberbox({   //RC 24534135 : Šířka
                    name: "df_rozmer_w",
                    model: "rozmer_w",
                    decimals: 2,
                    validators: that.df_rozmer_w.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_rozmer_w.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_rozmer_w.Edit === false
                }).
                gformrow("addFieldsRow", that.df_rozmer_h.Label).gnumberbox({   //RC 24534136 : Výška
                    name: "df_rozmer_h",
                    model: "rozmer_h",
                    decimals: 2,
                    validators: that.df_rozmer_h.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_rozmer_h.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_rozmer_h.Edit === false
                }).
                gformrow("addFieldsRow", that.df_hmotnost.Label).gnumberbox({   //RC 24534137 : Hmotnost
                    name: "df_hmotnost",
                    model: "hmotnost",
                    decimals: 2,
                    validators: that.df_hmotnost.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_hmotnost.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_hmotnost.Edit === false
                }).


                gformsection("create", "jres:24534219"). //RC 24534219 : Časové údaje
                gformrow("addFieldsRow", that.df_rok_vyr.Label).gnumberbox({ //RC 24534220 : Rok výroby
                    name: "df_rok_vyr",
                    model: "rok_vyr",
                    validators: that.df_rok_vyr.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_rok_vyr.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_rok_vyr.Edit === false
                }).
                gformrow("addFieldsRow", that.df_expirace.Label).gdatebox({   //RC 24534124 : Životnost
                    name: "df_expirace",
                    model: "expirace",
                    validators: that.df_expirace.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_expirace.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_expirace.Edit === false
                }).
                gformrow("addFieldsRow", that.df_lhuta_zaruka.Label).gnumberbox({  //RC 24534127 : Záruční lhůta
                    name: "df_lhuta_zaruka",
                    model: "lhuta_zaruka",
                    validators: that.df_lhuta_zaruka.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_lhuta_zaruka.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_lhuta_zaruka.Edit === false
                }).


                gformsection("create", "jres:24534221"). //RC 24534221 : Technická specifikace
                gformrow("addFieldsRow", that.df_kod_vyu.Label).gselectbox(Gordic.Prefabs.Select.ginskov(), {   //RC 24534222 : Způsob využití
                    name: "df_kod_vyu",
                    model: "model.kod_vyu=value.kod_vyu",
                    validators: that.df_kod_vyu.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_kod_vyu.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_kod_vyu.Edit === false
                }).
                gformrow("addFieldsRow", that.df_typ_maj.Label).gstringbox({   //RC 24534132 : Typ výrobku
                    name: "df_typ_maj",
                    model: "typ_maj",
                    validators: that.df_typ_maj.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_typ_maj.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_typ_maj.Edit === false
                }).
                // TODO: gincsta.aktivita=100
                gformrow("addFieldsRow", that.df_stat_puvod.Label).gselectbox(Gordic.Prefabs.Select.gincsta(), {   //RC 24534129 : Země původu
                    name: 'df_stat_puvod',
                    model: "model.stat_puvod=value.stat",
                    validators: that.df_stat_puvod.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_stat_puvod.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_stat_puvod.Edit === false
                }).
                gformrow("addFieldsRow", that.df_ktg_zar.Label).gselectbox(Gordic.Prefabs.Select.majsktz(), {   //RC 24534133 : Kategorie zařízení
                    name: 'df_ktg_zar',
                    model: "model.ktg_zar=value.ktg_zar",
                    validators: that.df_ktg_zar.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_ktg_zar.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_ktg_zar.Edit === false
                }).
                gformrow("addFieldsRow", that.df_prev_stav.Label).gselectbox(Gordic.Prefabs.Select.majsstp(), {   //RC 24534138 : Stav při převzetí
                    name: 'df_prev_stav',
                    model: "model.prev_stav=value.prev_stav",
                    validators: that.df_prev_stav.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_prev_stav.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_prev_stav.Edit === false
                }).
                gformrow("addFieldsRow", that.df_mobilita.Label).gselectbox(Gordic.Prefabs.Select.majsmob(), {   //RC 24534139 : Mobilita
                    name: 'df_mobilita',
                    model: "model.mobilita=value.mobilita",
                    validators: that.df_mobilita.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_mobilita.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_mobilita.Edit === false
                }).
                gformrow("addFieldsRow", that.df_trida_bezp.Label).gselectbox(Gordic.Prefabs.Select.majstrb(), {   //RC 24534141 : Třída bezpečnosti
                    name: 'df_trida_bezp',
                    model: "model.trida_bezp=value.trida_bezp",
                    validators: that.df_trida_bezp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_trida_bezp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_trida_bezp.Edit === false
                }).
                gformrow("addFieldsRow", that.df_riziko_por.Label).gselectbox(Gordic.Prefabs.Select.majsrip(), {   //RC 24534140 : Riziko při poruše    
                    name: 'df_riziko_por',
                    model: "model.riziko_por=value.riziko_por",
                    validators: that.df_riziko_por.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_riziko_por.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_riziko_por.Edit === false
                }).


                gformsection("create", "jres:24534223"). //RC 24534223 : Kulturní památky
                gformrow("addFieldsRow", that.cmb_ktg_kp.Label).gselectbox(Gordic.Prefabs.Select.majckkp(), {   //RC 24534224 : Typ památky
                    name: 'cmb_ktg_kp',
                    model: "model.ktg_kp=value.ktg_kp",
                    validators: that.cmb_ktg_kp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.cmb_ktg_kp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.cmb_ktg_kp.Edit === false
                }).
                gformrow("addFieldsRow", that.df_cis_rejstrik_kp.Label).gstringbox({  //RC 24534225 : Číslo rejstříku
                    name: "df_cis_rejstrik_kp",
                    model: "cis_rejstrik_kp",
                    validators: that.df_cis_rejstrik_kp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_cis_rejstrik_kp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_cis_rejstrik_kp.Edit === false
                }).
                gformrow("addFieldsRow", that.df_id_rejstrik_kp.Label).gstringbox({   //RC 24534226 : Identifikátor rejstříku
                    name: "df_id_rejstrik_kp",
                    model: "id_rejstrik_kp",
                    validators: that.df_id_rejstrik_kp.Required ? [new Gordic.Validators.Required()] : undefined,
                    flag: that.df_id_rejstrik_kp.Required ? Gordic.Prefabs.Field.Flags.required : undefined,
                    disabled: that.df_id_rejstrik_kp.Edit === false
                }).


                gformsection("create", "")

            // === RPP ==========================================================================
            $("<div data-break-L='900'>").appendTo(jsShowTabRPP).gform("setup", { layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534281", opened: false }).  //RC 24534281 : Rozšířený profil

                gformsection("create", "TODO: RPP - komponenta?")

            // === BUDOVA { dlg_MajRpBud } ==========================================================================
            $("<div data-break-L='900'>").appendTo(jsShowTabBudova).gform("setup", { layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534115" + " / " + "jres:24534558", opened: false }).  //RC 24534558 : Pozemek

                gformsection("create", "").
                gformrow("addFieldsRow", "jres:24534115").gselectbox(Gordic.Prefabs.Select.ginsbudmaj(), { name: "df_budova_kod_rpb", model: "model.rpb_budova_kod=value.budova_kod", itemTemplate: "{budova_naz}", disabled: that.df_budova_kod.Edit === false }). //RC 24534115 : Budova
                gformrow("addFieldsRow", "jres:24534227").gselectbox(Gordic.Prefabs.Select.ginsesu(), { name: 'df_ixs_esu', model: "model.rpb_ixs_esu=value.ixs_esu", disabled: that.cvRpbDisabled }). //RC 24534227 : Adresa                
                gformrow("addFieldsRow", "jres:24534228").gselectbox(Gordic.Prefabs.Select.ginsesu(), { name: 'df_ixs_esu_spr', model: "model.rpb_ixs_esu_spr=value.ixs_esu", disabled: that.cvRpbDisabled }). //RC 24534228 : Správce
                gformrow("addFieldsRow", "jres:24534229").gselectbox(Gordic.Prefabs.Select.ginsesu(), { name: 'df_ixs_esu_uziv', model: "model.rpb_ixs_esu_uziv=value.ixs_esu", disabled: that.cvRpbDisabled }). //RC 24534229 : Uživatel


                gformsection("create", "").
                gformrow("addFieldsRow", "jres:24534087").gselectbox(Gordic.Prefabs.Select.gincbud(), { name: "df_budova_druh", model: "model.rpb_budova_druh=value.budova_druh", disabled: that.cvRpbDisabled }). //RC 24534087 : Druh
                gformrow("addFieldsRow", "jres:24534230").gstringbox({ name: "df_cj_kol", model: "rpb_cj_kol", disabled: that.cvRpbDisabled }). //RC 24534230 : ČJ kolaudace
                gformrow("addFieldsRow", "jres:24534231").gdatebox({ name: "df_dat_kol", model: "rpb_dat_kol", disabled: that.cvRpbDisabled }). //RC 24534231 : Datum kolaudace


                gformsection("create", "").
                gformrow("addFieldsRow", "jres:24534232").gnumberbox({ name: "df_obest_prostor", model: "rpb_obest_prostor", disabled: that.cvRpbDisabled }). //RC 24534232 : Obestavěný prostor
                gformrow("addFieldsRow", "jres:24534233").gnumberbox({ name: "df_zast_plocha", model: "rpb_zast_plocha", disabled: that.cvRpbDisabled }). //RC 24534233 : Zastavěná plocha
                gformrow("addFieldsRow", "jres:24534234").gnumberbox({ name: "df_podlazi", model: "rpb_podlazi", disabled: that.cvRpbDisabled }). //RC 24534234 : Počet podlaží


                gformsection("create", "").
                gformrow("addFieldsRow", "jres:24534235").gnumberbox(Gordic.Prefabs.Number.currency(), { name: "df_c_pos", model: "rpb_c_pos", disabled: that.cvRpbDisabled }). //RC 24534235 : Cena posudku
                gformrow("addFieldsRow", "jres:24534236").gnumberbox(Gordic.Prefabs.Number.currency(), { name: "df_c_upr", model: "rpb_c_upr", disabled: that.cvRpbDisabled }) //RC 24534236 : Cena upravená

            // === DOKUMENTACE  ==========================================================================
            $("<div data-break-L='900'>").appendTo(jsShowTabFoto).gform("setup", { layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534256", opened: false }).  //RC 24534256 : Dokumentace

                gformsection("create", "TODO: Sem je třeba přidat grid s fotodokumentací")

            // === SML  ==========================================================================
            $("<div data-break-L='900'>").appendTo(jsShowTabSML).gform("setup", { layoutDescriptor: "L2M2S1" }).gtab({ title: "jres:24534317", opened: false }).  //RC 24534317 : SML

                gformsection("create", "TODO: Submodel SML je aktivní - sem je třeba přidat grid se smlouvama")

            // =================================================================================
            // zde už builder dokončil práci a může následovat vlastní kód.            

            this.findFields().gfield("model", "apply", this.DetailDto, { initialValues: true });

            console.log("INFO: GMajKarta - model applied.");

            //.gfield("model", "validators", this.validators);


            // DetailBuilder je možné použít i bez C# strany.

            /*      new Gordic.Gin.DetailBuilder.builder(this) //vytvořit
                    .registerEventsToContent() // zaregistrovat onDetailBuilderInit a onDetailBuilderBuild nebo .on("beforeInit", customFunction) či .on("beforeBuild", customFunction2)
                    .withComponent("WflElDoc", Gordic.Wfl.DetailBuilderComponents.GWflElDoc.create(this, this.DetailDto)) //přidat komponenty
                    .init().build().done(function(){ // init a build

                        //pokračovat po dokončení buildu.

                    }); 

           */

            var colWidthNo = 25;
            var colWidthSmall = 40;
            var colWidthDate = 90;
            var colWidthUsualText = 140;
            var colWidthTextLong = 230;
            var colWidthMoney = 130;


            //=============================
            // PODMÍNKY PROVOZU { dlg_MajKarta.tbl_provoz_podm } ============================================================
            //=============================
            // 
            var that = this;
            var $tab = $("<div>").appendTo(jsShowTabPodmProvoz);
            $tab.gtab({
                title: "jres:24534252", //RC 24534252 : Podmínky provozu
                opened: false,  //ve výchozím stavu nerozbaleno
                menuBar: [],
                customLoad: function (ev, obj) {

                    that.call("TabUserRequestPodmProvozu", { invCis: that.DetailDto.inv_cis })
                        .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "provoz_podm" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            $gridPodmProv.ggrid("setData", view, true);                     //true = prekresleni gridu
                        })

                }
            });

            var $gridPodmProv = $("<div>")
                .css("height", "300px")
                .appendTo($tab)
                .ggrid({
                    columnMode: "full",

                    columns: new Gordic.Data.GridFormat()

                        .addIconColumn({
                            name: "aktivita_vpop",
                            caption: "jres:24534325", //RC 24534325 : Stav
                            width: 60,
                            iconTemplate: function (meta) { return meta.aktivita_vpop === 100 ? "gi-tick" : "gi-box" },
                            editor: {
                                widget: "gcheck", options: {
                                    name: "aktivita_vpop",
                                    modelValueTransform: {
                                        apply: function (modelValue) {
                                            return modelValue === 100;
                                        },
                                        collect: function (fieldValue) {
                                            return fieldValue === true ? 100 : 900;
                                        }
                                    }
                                }
                            }
                        })

                        .addTextColumn({
                            name: "provoz_podm_txt",
                            caption: "jres:24534059", //RC 24534059 : Název
                            width: colWidthTextLong + 150,
                        })
                }).ggridroweditor(); // end grid (Podmínky provozu)

            //==========================
            // ZODPOVÍDÁ { dlg_MajRef } ========================================================================
            //==========================
            that = this;
            $tab = $("<div>").appendTo(jsShowTabZodpOsb);
            $tab.gtab({
                title: "jres:24534255", //RC 24534255 : Zodpovědné osoby
                opened: false,  //ve výchozím stavu nerozbaleno
                menuBar: [],
                customLoad: function (ev, obj) {

                    that.call("TabUserRequestRef", { ixsMaj: that.DetailDto.ixs_maj, pouzeAktivni: true })
                        .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "ixs_ref" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            $gridRef.ggrid("setData", view, true);                     //true = prekresleni gridu
                        })

                }
            });

            var $gridRef = $("<div>")
                .css("height", "300px")
                .appendTo($tab)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full

                    columns: new Gordic.Data.GridFormat()
                        .addTextColumn({
                            name: "typ_zodp_txt",
                            caption: "jres:24534264", //RC 24534264 : Typ zodpovědnosti
                            width: 100,
                        })
                        .addTextColumn({
                            name: "nazev",
                            caption: "jres:24534210", //RC 24534210 : Zodpovídá
                            width: 180
                        })
                        .addDateColumn({
                            name: "dat_od",
                            caption: "jres:24534265", //RC 24534265 : Počátek platnosti
                            width: colWidthDate,
                        })
                        .addDateColumn({
                            name: "dat_do",
                            caption: "jres:24534266", //RC 24534266 : Konec platnosti
                            width: colWidthDate
                        })
                        .addTextColumn({
                            name: "tit_pred",
                            caption: "jres:24534267", //RC 24534267 : Titul před
                            width: 60,
                        })
                        .addTextColumn({
                            name: "jmeno",
                            caption: "jres:24534268", //RC 24534268 : Jméno
                            width: 100,
                        })
                        .addTextColumn({
                            name: "prijmeni",
                            caption: "jres:24534269", //RC 24534269 : Příjmení
                            width: 160,
                        })
                        .addTextColumn({
                            name: "tit_za",
                            caption: "jres:24534270", //RC 24534270 : Titul za
                            width: 60,
                        })
                        .addTextColumn({
                            name: "oc",
                            caption: "jres:24534271", //RC 24534271 : Osob. č.
                            width: 90,
                        })
                        .addTextColumn({
                            name: "ixs_su_txt",
                            caption: "jres:24534272", //RC 24534272 : Spisový uzel
                            width: 140,
                        })
                        .addTextColumn({
                            name: "poznamka",
                            caption: "jres:24534121", //RC 24534121 : Poznámka
                            width: 180,
                        })
                        .addTextColumn({
                            name: "zkratka",
                            caption: "jres:24534273", //RC 24534273 : Zkratka
                            width: 80,
                        })
                        .addTextColumn({
                            name: "mail",
                            caption: "jres:24534274", //RC 24534274 : E-mail
                            width: 180,
                        })
                        .addTextColumn({
                            name: "tel",
                            caption: "jres:24534275", //RC 24534275 : Telefon
                            width: 120,
                        })
                        .addTextColumn({
                            name: "tel_private",
                            caption: "jres:24534276", //RC 24534276 : Telefon - privat
                            width: 120,
                        })
                        .addTextColumn({
                            name: "tel_mobil",
                            caption: "jres:24534277", //RC 24534277 : Telefon - mobil
                            width: 120,
                        })
                }); // end grid

            //==========================
            // UCT { dlg_xxxx } ========================================================================
            //==========================

            // TODO: tab UCT

            //========================================
            // PŘÍSLUŠENSTVÍ { dlg_MajPrislusenstvi } ========================================================================
            //========================================
            that = this;
            $tab = $("<div>").appendTo(jsShowTabPrislus);
            $tab.gtab({
                title: "jres:24534278", //RC 24534278 : Příslušenství
                opened: false,  //ve výchozím stavu nerozbaleno
                menuBar: [],
                customLoad: function (ev, obj) {

                    //debugger;                                                                               

                    that.call("TabUserRequestPrislusenstvi", { invCis: that.DetailDto.inv_cis })
                        .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "inv_cis, por_cis" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            $gridPrislusenstvi.ggrid("setData", view, true);                     //true = prekresleni gridu
                        })

                }
            });

            var $gridPrislusenstvi = $("<div>")
                .css("height", "300px")
                .appendTo($tab)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full

                    // TODO: editovatelnost, viditelnost a názvy sloupců řídí MajInit.items_set  - viz. ccol_ItemNoEdit

                    columns: new Gordic.Data.GridFormat()
                        .addNumberColumn({
                            name: "por_cis",
                            caption: "#",
                            width: colWidthNo,
                        })
                        .addTextColumn({
                            name: "id_pri",
                            caption: "jres:24534020", //RC 24534020 : Identifikátor
                            width: colWidthUsualText
                        })
                        .addDateColumn({
                            name: "dat_in",
                            caption: "jres:24534279", //RC 24534279 : Přiřazeno
                            width: colWidthDate,
                        })
                        .addDateColumn({
                            name: "dat_out",
                            caption: "jres:24534280", //RC 24534280 : Odstraněno
                            width: colWidthDate
                        })
                        .addTextColumn({
                            name: "mat_cis",
                            caption: that.cvPrisItemsSet[42 - 1].nazev, // řízeno ccol_ItemNoEdit.SAM_Create( )
                            width: 90,
                            visible: that.cvPrisItemsSet[42 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "skp",
                            caption: that.cvPrisItemsSet[6 - 1].nazev,
                            width: 90,
                            visible: that.cvPrisItemsSet[6 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "nazev",
                            caption: that.cvPrisItemsSet[8 - 1].nazev,
                            width: colWidthUsualText,
                            visible: that.cvPrisItemsSet[8 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "popis",
                            caption: that.cvPrisItemsSet[26 - 1].nazev,
                            width: colWidthUsualText,
                            visible: that.cvPrisItemsSet[26 - 1].priz_vid > 0
                        })
                        .addNumberColumn({
                            name: "pmj",
                            format: "N:3",
                            caption: that.cvPrisItemsSet[29 - 1].nazev,
                            width: 40,
                            visible: that.cvPrisItemsSet[29 - 1].priz_vid > 0
                        })
                        .addCurrencyColumn({
                            name: "c",
                            caption: that.cvPrisItemsSet[28 - 1].nazev,
                            width: 80,
                            visible: that.cvPrisItemsSet[28 - 1].priz_vid > 0
                        })
                        .addDateColumn({
                            name: "dat_por",
                            caption: that.cvPrisItemsSet[12 - 1].nazev,
                            width: colWidthDate,
                            visible: that.cvPrisItemsSet[12 - 1].priz_vid > 0
                        })
                        .addDateColumn({
                            name: "dat_zar",
                            caption: that.cvPrisItemsSet[13 - 1].nazev,
                            width: colWidthDate,
                            visible: that.cvPrisItemsSet[13 - 1].priz_vid > 0
                        })
                        .addDateColumn({
                            name: "dat_vyr",
                            caption: that.cvPrisItemsSet[14 - 1].nazev,
                            width: colWidthDate,
                            visible: that.cvPrisItemsSet[14 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "mj",
                            caption: that.cvPrisItemsSet[11 - 1].nazev,
                            width: 40,
                            visible: that.cvPrisItemsSet[11 - 1].priz_vid > 0
                        })
                        .addNumberColumn({
                            name: "rok_vyr",
                            caption: that.cvPrisItemsSet[10 - 1].nazev,
                            width: 40,
                            visible: that.cvPrisItemsSet[10 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "evi_cis",
                            caption: that.cvPrisItemsSet[2 - 1].nazev,
                            width: 70,
                            visible: that.cvPrisItemsSet[2 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "vyr_cis",
                            caption: that.cvPrisItemsSet[4 - 1].nazev,
                            width: 70,
                            visible: that.cvPrisItemsSet[4 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "ser_cis",
                            caption: that.cvPrisItemsSet[5 - 1].nazev,
                            width: 70,
                            visible: that.cvPrisItemsSet[5 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "sarze",
                            caption: that.cvPrisItemsSet[43 - 1].nazev,
                            width: 70,
                            visible: that.cvPrisItemsSet[43 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "stat_puvod_txt",
                            caption: that.cvPrisItemsSet[56 - 1].nazev,
                            width: colWidthUsualText,
                            visible: that.cvPrisItemsSet[56 - 1].priz_vid > 0
                        })

                        .addTextColumn({
                            name: "ixs_esu_vyr_txt",
                            caption: that.cvPrisItemsSet[57 - 1].nazev,
                            width: colWidthUsualText + 20,
                            visible: that.cvPrisItemsSet[57 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "ixs_esu_dod_txt",
                            caption: that.cvPrisItemsSet[58 - 1].nazev,
                            width: colWidthUsualText + 20,
                            visible: that.cvPrisItemsSet[58 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "ixs_esu_servis_txt",
                            caption: that.cvPrisItemsSet[59 - 1].nazev,
                            width: colWidthUsualText + 20,
                            visible: that.cvPrisItemsSet[59 - 1].priz_vid > 0
                        })

                        .addTextColumn({
                            name: "typ_maj",
                            caption: that.cvPrisItemsSet[60 - 1].nazev,
                            width: colWidthUsualText,
                            visible: that.cvPrisItemsSet[60 - 1].priz_vid > 0
                        })
                        .addTextColumn({
                            name: "ktg_zar_txt",
                            caption: that.cvPrisItemsSet[61 - 1].nazev,
                            width: colWidthUsualText,
                            visible: that.cvPrisItemsSet[61 - 1].priz_vid > 0
                        })

                        .addNumberColumn({
                            name: "rozmer_l",
                            caption: that.cvPrisItemsSet[62 - 1].nazev,
                            width: 60,
                            visible: that.cvPrisItemsSet[62 - 1].priz_vid > 0
                        })
                        .addNumberColumn({
                            name: "rozmer_w",
                            caption: that.cvPrisItemsSet[63 - 1].nazev,
                            width: 60,
                            visible: that.cvPrisItemsSet[63 - 1].priz_vid > 0
                        })
                        .addNumberColumn({
                            name: "rozmer_h",
                            caption: that.cvPrisItemsSet[64 - 1].nazev,
                            width: 60,
                            visible: that.cvPrisItemsSet[64 - 1].priz_vid > 0
                        })
                        .addNumberColumn({
                            name: "hmotnost",
                            caption: that.cvPrisItemsSet[65 - 1].nazev,
                            width: 60,
                            visible: that.cvPrisItemsSet[65 - 1].priz_vid > 0
                        })
                }); // end grid (příslušenství)

            //===============================
            // TRANSFERY { dlg_MajTransfer } ========================================================================
            //===============================
            // TODO: tlačíka, checkbox, součty
            that = this;
            $tab = $("<div>").appendTo(jsShowTabTrf);
            $tab.gtab({
                title: "jres:24534197", //RC 24534197 : Transfery
                opened: false,  //ve výchozím stavu nerozbaleno
                menuBar: [],
                customLoad: function (ev, obj) {

                    that.call("TabUserRequestTransf", { invCis: that.DetailDto.inv_cis, pouzeAktivni: true })
                        .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "inv_cis, ixs_esu, dat_pri, ueg" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            $gridTrf.ggrid("setData", view, true);                     //true = prekresleni gridu
                        })

                }
            });

            var $gridTrf = $("<div>")
                .css("height", "300px")
                .appendTo($tab)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full

                    columns: new Gordic.Data.GridFormat()
                        .addTextColumn({
                            name: "ico_esu",
                            caption: "jres:24534282", //RC 24534282 : IČO
                            width: 80,
                            fixedWidth: true,
                        })
                        .addTextColumn({
                            name: "ixs_esu_txt",
                            caption: "jres:24534059", //RC 24534059 : Název
                            width: colWidthTextLong,
                        })
                        .addDateColumn({
                            name: "dat_pri",
                            caption: "jres:24534284", //RC 24534284 : Datum UÚP
                            width: colWidthDate + 10,
                        })
                        .addCurrencyColumn({
                            name: "c_dotace",
                            caption: "jres:24534069", //RC 24534069 : Transfer
                            width: colWidthMoney,
                        })
                        .addCurrencyColumn({
                            name: "c_dotace_opr",
                            caption: "jres:24534198", //RC 24534198 : Rozpuštěný transfer
                            width: colWidthMoney,
                        })
                        .addCurrencyColumn({
                            name: "c_opr_pol",
                            caption: "jres:24534285", //RC 24534285 : Opravná položka
                            width: colWidthMoney,
                        })
                        .addTextColumn({
                            name: "kt_pap",
                            caption: "jres:24534286", //RC 24534286 : Analytika PAP/Výnosy
                            width: 120,
                        })
                        .addTextColumn({
                            name: "kt_pap_tr",
                            caption: "jres:24534287", //RC 24534287 : Analytika PAP/Transfery
                            width: 120,
                        })
                        .addTextColumn({
                            name: "ueb_tr",
                            caption: "jres:24534288", //RC 24534288 : AU Transferu
                            width: 100,
                        })
                        .addTextColumn({
                            name: "ueb_vyn",
                            caption: "jres:24534289", //RC 24534289 : AU Výnosu
                            width: 100,
                        })
                        .addTextColumn({
                            name: "ueg_v",
                            caption: "POL", // TODO: ekoscfu?
                            width: 110,
                        })
                        .addTextColumn({
                            name: "ueg",
                            caption: "UZ", // TODO: ekoscfu?
                            width: 110,
                        })
                        .addTextColumn({
                            name: "te1",
                            caption: "ORG", // TODO: ekoscfu?
                            width: 110,
                        })
                        .addTextColumn({
                            name: "poznamka",
                            caption: "jres:24534121", //RC 24534121 : Poznámka
                            width: colWidthUsualText + 20,
                        })
                }); // end grid (Transfery)

            //========================
            //  INV { dlg_MajInvHst } ========================================================================
            //========================
            that = this;
            $tab = $("<div>").appendTo(jsShowTabINV);
            $tab.gtab({
                title: "jres:24534067", //RC 24534067 : Historie inventarizace
                opened: false,  //ve výchozím stavu nerozbaleno
                menuBar: [],
                customLoad: function (ev, obj) {

                    that.call("TabUserRequestINV", { invCis: that.DetailDto.inv_cis })
                        .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "inv_cis, ico, ucs, nks, rok_obd, ser_cislo" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            $gridInv.ggrid("setData", view, true);                     //true = prekresleni gridu
                        })

                }
            });

            var $gridInv = $("<div>")
                .css("height", "300px")
                .appendTo($tab)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full

                    columns: new Gordic.Data.GridFormat()
                        .addTextColumn({
                            name: "flag_inv",
                            caption: "jres:24534263", //RC 24534263 : PI
                            width: colWidthSmall,
                            fixedWidth: true,
                        })
                        .addTextColumn({
                            name: "zpusob_dohled_zkr",
                            caption: "jres:24534262", //RC 24534262 : Dohledání
                            width: 110,
                            fixedWidth: true,
                        })
                        //.addCurrencyColumn({
                        //    name: "c",
                        //    caption: "jres:24534096", //RC 24534096 : Účetní cena
                        //    width: 90,
                        //})
                        .addDateTimeColumn({
                            name: "dat_inv",
                            caption: "jres:24534261", //RC 24534261 : Okamžik kontroly
                            width: 150,
                            //fixedWidth: true,                                
                        })
                        .addTextColumn({
                            name: "id_snz",
                            caption: "jres:24534260", //RC 24534260 : Snímací zařízení
                            width: 180,
                            //fixedWidth: true,                                
                        }) // TODO: BOOKMARK: Honza - je v gridu, ale není v SELECTu
                        //.addTextColumn({
                        //    name: "ixp",
                        //    caption: "jres:24534259", //RC 24534259 : PID dokladu
                        //    width: 120,
                        //})
                        .addTextColumn({
                            name: "nks",
                            caption: "jres:24534037", //RC 24534037 : NS
                            width: 80,
                        })
                }); // end grid (INV)


            //=============================
            // PARTNEŘI { dlg_MajPartner } ========================================================================
            //=============================
            // TODO: tlačíko, checkbox, součty
            that = this;
            $tab = $("<div>").appendTo(jsShowTabPartner);
            $tab.gtab({
                title: "jres:24534258", //RC 24534258 : Konsolidovaní partneři
                opened: false,  //ve výchozím stavu nerozbaleno
                menuBar: [],
                customLoad: function (ev, obj) {

                    that.call("TabUserRequestPartneri", { invCis: that.DetailDto.inv_cis, pouzeAktivni: true })
                        .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "inv_cis, ixs_esu, dat_pri" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            $gridPartneri.ggrid("setData", view, true);                     //true = prekresleni gridu
                        })

                }
            });

            var $gridPartneri = $("<div>")
                .css("height", "300px")
                .appendTo($tab)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full

                    columns: new Gordic.Data.GridFormat()
                        .addTextColumn({
                            name: "ico_esu",
                            caption: "jres:24534282", //RC 24534282 : IČO
                            width: 80,
                            fixedWidth: true,
                        })
                        .addTextColumn({
                            name: "ixs_esu_txt",
                            caption: "jres:24534283", //RC 24534283 : Název partnera
                            width: colWidthTextLong,
                        })
                        .addDateColumn({
                            name: "dat_pri",
                            caption: "jres:24534284", //RC 24534284 : Datum UÚP
                            width: colWidthDate + 10,
                        })
                        .addCurrencyColumn({
                            name: "c_vstup",
                            caption: "jres:24534184", //RC 24534184 : Vstupní cena
                            width: colWidthMoney,
                        })
                        .addCurrencyColumn({
                            name: "c_opr",
                            caption: "jres:24534185", //RC 24534185 : Oprávky
                            width: colWidthMoney,
                        })
                        .addCurrencyColumn({
                            name: "c_zust",
                            caption: "jres:24534186", //RC 24534186 : Zůstatková cena
                            width: colWidthMoney,
                        })
                        //372.9 05.06.14 přidán sloupec opravná položka
                        .addCurrencyColumn({
                            name: "c_opr_pol",
                            caption: "jres:24534285", //RC 24534285 : Opravná položka
                            width: colWidthMoney,
                        })
                }); // end grid (Partneři)


            //=============================
            // KATASTR { dlg_MajRpPoz.tbl_MajRpp  { ctbl_MajRpp }   } ========================================================================
            //=============================                        

            that = this;
            var l_bRen02 = true;
            $tab = $("<div>").appendTo(jsShowTabKatastr);
            $tab.gtab({
                title: "jres:24534291", //RC 24534291 : Katastr
                opened: false,  //ve výchozím stavu nerozbaleno
                menuBar: [],
                customLoad: function (ev, obj) {

                    that.call("TabUserRequestKatastr", { ixsMaj: that.DetailDto.ixs_maj })
                        .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "ixs_maj, ser_cislo" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            $gridKatastr.ggrid("setData", view, true);                     //true = prekresleni gridu
                        })

                }
            });

            // TODO: formátují se řádky dle aktivity? viz. ctbl_MajRpp._fetchRowDone( ) - 500 nebo 600 jsou červeně
            // TODO: vyřešit příznaky Ano/Ne
            var $gridKatastr = $("<div>")
                .css("height", "300px")
                .appendTo($tab)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full

                    columns: new Gordic.Data.GridFormat() //  ctbl_MajRpp 
                        .addTextColumn({
                            name: "typ_obj_txt",
                            caption: "jres:24534292", //RC 24534292 : Typ objektu
                            width: 80,
                            visible: l_bRen02
                        })
                        .addTextColumn({
                            name: "katuz_nazev",
                            caption: "jres:24534293", //RC 24534293 : Katastrální území
                            width: 80,
                        })
                        .addNumberColumn({
                            name: "druh_cis_par",
                            caption: "jres:24534294", //RC 24534294 : DČ
                            width: colWidthSmall,
                            visible: l_bRen02
                        })
                        .addTextColumn({
                            name: "parcela",
                            caption: "jres:24534295", //RC 24534295 : Parcela
                            width: colWidthSmall,
                        })
                        .addNumberColumn({
                            name: "dil_parcely",
                            caption: "jres:24534296", //RC 24534296 : Díl
                            width: colWidthSmall,
                            visible: l_bRen02
                        })
                        // id_parcely - neviditelé
                        .addNumberColumn({
                            name: "vymera",
                            caption: "jres:24534297", //RC 24534297 : Výměra
                            width: 60,
                        })
                        .addTextColumn({
                            name: "pomer_vlast",
                            caption: "jres:24534298", //RC 24534298 : Majetkový podíl
                            width: 80,
                        })
                        .addNumberColumn({
                            name: "vymera_vlast",
                            caption: "jres:24534299", //RC 24534299 : Výměra ve vlastnictví
                            decimals: 2,
                            width: 80,
                        })
                        .addTextColumn({
                            name: "typ_parcely_txt",
                            caption: "jres:24534300", //RC 24534300 : Typ parcely
                            width: colWidthUsualText,
                        })
                        .addTextColumn({
                            name: "zp_vyuz_poz_txt",
                            caption: "jres:24534222", //RC 24534222 : Způsob využití
                            width: colWidthUsualText,
                        })
                        // 372.15 24.09.14 druh pozemku + příznaky zástavního práva a věcného břemene
                        .addTextColumn({
                            name: "druh_poz_txt",
                            caption: "jres:24534301", //RC 24534301 : Druh pozemku
                            width: colWidthUsualText,
                        })
                        // TODO: ano/ne
                        //.addTextColumn({
                        //    name: "s_zast_pravo_txt",
                        //    caption: "jres:24534302", //RC 24534302 : Zástavní právo
                        //    width: colWidthSmall,
                        //    fixedWidth: true,                            
                        //})
                        // TODO: ano/ne
                        //.addTextColumn({
                        //    name: "s_vec_brem_txt",
                        //    caption: "jres:24534303", //RC 24534303 : Věcné břemeno
                        //    width: colWidthSmall,
                        //    fixedWidth: true,                            
                        //})
                        .addCurrencyColumn({
                            name: "c_cena_oc",  // c_cena
                            caption: "jres:24534304", //RC 24534304 : Ocenění pozemku
                            width: colWidthMoney,
                            visible: l_bRen02,
                        })
                        .addDateColumn({
                            name: "dat_oc",  // dat_ceny
                            caption: "jres:24534305", //RC 24534305 : Datum oc. pozemku
                            width: colWidthDate + 10,
                            visible: l_bRen02,
                        })
                        // REN02 BUDOVA ====================================================
                        // id_budovy - neviditelné
                        .addNumberColumn({
                            name: "cislo_domovni",
                            caption: "jres:24534309", //RC 24534309 : Číslo domovní
                            width: 60,
                            visible: l_bRen02,
                        })
                        .addTextColumn({
                            name: "typ_budovy_txt",
                            caption: "jres:24534310", //RC 24534310 : Typ budovy
                            width: 80,
                            visible: l_bRen02,
                        })
                        .addTextColumn({
                            name: "zp_vyuz_bud_txt",
                            caption: "jres:24534306", //RC 24534306 : Způsob využití budovy
                            width: colWidthUsualText,
                        })
                        .addCurrencyColumn({
                            name: "c_cena_bud",
                            caption: "jres:24534311", //RC 24534311 : Ocenění budovy
                            width: colWidthMoney,
                            visible: l_bRen02,
                        })
                        .addDateColumn({
                            name: "dat_cena_bud",
                            caption: "jres:24534312", //RC 24534312 : Datum oc. budovy
                            width: colWidthDate + 10,
                            visible: l_bRen02,
                        })
                        // REN02 JEDNOTKA =================================================
                        // id_jednotky - neviditelné
                        .addTextColumn({
                            name: "typ_jednotky_txt",
                            caption: "jres:24534313", //RC 24534313 : Typ jednotky
                            width: 80,
                            visible: l_bRen02,
                        })
                        .addNumberColumn({
                            name: "cislo_jednotky",
                            caption: "jres:24534314", //RC 24534314 : Číslo jednotky
                            width: 60,
                            visible: l_bRen02,
                        })
                        .addCurrencyColumn({
                            name: "c_cena_jed",
                            caption: "jres:24534315", //RC 24534315 : Ocenění jednotky
                            width: colWidthMoney,
                            visible: l_bRen02,
                        })
                        .addDateColumn({
                            name: "dat_cena_jed",
                            caption: "jres:24534316", //RC 24534316 : Datum oc. jednotky
                            width: colWidthDate + 10,
                            visible: l_bRen02,
                        })
                        // údaje z MAJSRPP - MAJSPRN ======================================
                        .addDateColumn({
                            name: "dat_od",
                            caption: "jres:24534307", //RC 24534307 : Datum přiřazení
                            width: colWidthDate + 10,
                        })
                        .addDateColumn({
                            name: "dat_do",
                            caption: "jres:24534156", //RC 24534156 : Datum vyřazení
                            width: colWidthDate + 10,
                        })
                        .addTextColumn({
                            name: "sml_esu",
                            caption: "jres:24534308", //RC 24534308 : Číslo smlouvy
                            width: 110,
                        })
                        .addTextColumn({
                            name: "uziv_txt",
                            caption: "jres:24534229", //RC 24534229 : Uživatel
                            width: colWidthUsualText,
                        })
                }); // end grid (Partneři)

            // TODO: KAT.NEM { dlg_MajRpPoz.tbl_zaz }
            // - zatím jsem náhled přímo do tabulek do REN nedělal - asi bych ani dělat neměl, Ren.Server je napsán, snad bych ho využil...


            //=============================
            // PRODEJ { dlg_MajProdej } ========================================================================
            //=============================
            // 
            that = this;
            $tab = $("<div>").appendTo(jsShowTabProdej);
            $tab.gtab({
                title: "jres:24534318", //RC 24534318 : Prodej
                opened: false,  //ve výchozím stavu nerozbaleno
                menuBar: [],
                customLoad: function (ev, obj) {

                    that.call("TabUserRequestProdej", { invCis: that.DetailDto.inv_cis })
                        .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "ixs_maj, ser_cislo" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            $gridProdej.ggrid("setData", view, true);                     //true = prekresleni gridu
                        })

                }
            });

            var $gridProdej = $("<div>")
                .css("height", "300px")
                .appendTo($tab)
                .ggrid({
                    columnMode: "fit",

                    columns: new Gordic.Data.GridFormat()
                        .addNumberColumn({
                            name: "ser_cislo",
                            caption: "#",
                            width: colWidthNo,
                            fixedWidth: true,
                        })
                        .addDateColumn({
                            name: "dat_rop",
                            caption: "jres:24534319", //RC 24534319 : Dat. rozh. o prodeji
                            width: colWidthDate,
                        })
                        .addDateColumn({
                            name: "dat_pro",
                            caption: "jres:24534320", //RC 24534320 : Dat. uvaž. prodeje
                            width: colWidthDate,
                        })
                        .addCurrencyColumn({
                            name: "c_real",
                            caption: "jres:24534322", //RC 24534322 : Reálná cena v CZK
                            width: colWidthMoney,
                        })
                        .addTextColumn({
                            name: "mena_zkr",
                            caption: "jres:24534321", //RC 24534321 : Cizí měna
                            width: 50,
                        })
                        .addCurrencyColumn({
                            name: "c_mena_real",
                            caption: "jres:24534323", //RC 24534323 : Reálná cena v cizí měně
                            width: colWidthMoney,
                        })
                        .addDateColumn({
                            name: "dat_zru_rop",
                            caption: "jres:24534324", //RC 24534324 : Dat. zrušení uvaž. prodeje
                            width: colWidthDate,
                        })
                        .addTextColumn({
                            name: "poznamka",
                            caption: "jres:24534121", //RC 24534121 : Poznámka
                            width: colWidthTextLong,
                        })
                }); // end grid (Prodej)

            //=====================================================================================
            // úprava STATUS BAR
            //=====================================================================================
            var $df_mat_akt = $(".g-state-stav");
            $df_mat_akt.removeClass("g-state-success");
            $df_mat_akt.removeClass("g-state-info");
            $df_mat_akt.removeClass("g-state-active");
            $df_mat_akt.removeClass("g-state-important");
            $df_mat_akt.removeClass("g-state-warning");
            if (this.DetailDto.mat_akt === 30 | this.DetailDto.mat_akt === 40) {
                $df_mat_akt.addClass("g-state-inactive"); // šedá  => vyřazeno 30, storno 40
            } else if (this.DetailDto.mat_akt === 10 || this.DetailDto.mat_akt === 18) {
                $df_mat_akt.addClass("g-state-important"); // růžová => návrh, v pořízení
            } else if (this.DetailDto.mat_akt === 35) {
                $df_mat_akt.addClass("g-state-active");  //  modrá =>  vydáno
            } else if (this.DetailDto.mat_akt === 20) {
                $df_mat_akt.addClass("g-state-success"); // zelená  => EVIDENCE
            } else
                $df_mat_akt.addClass("g-state-info"); // modrá => ostatní stavy


            this.actions.actDI.enabled(that.pbDI.Edit);
            this.actions.actTypKarty.enabled(that.pbSoubor.Edit);
            this.actions.actPrvky.enabled(that.pbPrvky.Edit);
            //this.actions.actPohyby.enabled(_this.pbPohyb.Edit);
            //this.actions.actHistorie.enabled(_this.pbHst.Edit);
            //this.actions.actReservace.enabled(_this.pbRes.Edit);
            //this.actions.actUzavreni.enabled(_this.pbClose.Edit);  
            this.actions.actPoznBlok.enabled(that.pbVlozPoznBlok.Edit);
            this.actions.actWwwMap.enabled(that.pb_gps.Edit);
            this.actions.actGis.enabled(that.pbGis.Edit);
            //this.actions.actSave.enabled(_this.pbEvidence.Edit);



            //Také je možné využít jednotlivé komponenty bez builderu či C# strany -> 
            //var component = Gordic.Wfl.DetailBuilderComponents.WflHistory.create({ Title: "Moje Historie" }, "Gordic.Wfl.WebClient.Detail.GHistorie", { Ixp: this.DetailDto.Ixp });
            //this.actions.add(component.actions[0]); // použití akce z komponenty historie.

            that.createComplete();

            // MAJ05 - rovnou otevřu výběr DRH_ID
            //that.findForms("FormIDs").findFields("df_drh_id").gfield("instance").actions.actSelector.run(new Event("click"));

            // this.loadingPage = false;

        }, // end (onContentReady)


        //loadPepData: function ($grid) {
        //    / <summary>Nacteni dat do gridu</summary>
        //    / <param name='$grid' type='jQuery'>Reference na ggrid</param>

        //    var that = this;
        //    this.beginOperation("Nacitam data MAJSPEP");
        //    this.srv.call("NactiSeznamPohybu", { ixp: this.DetailDto.Ixp })
        //        .done(function (data) {
        //            var view = new Gordic.Data.View(data, { key: "ixp,ser_cislo,lic,ser_pcislo" });  //key je dulezity kvuli pripadnemu vyhledavani radku
        //            $grid.ggrid("setData", view, true);                     //true = prekresleni gridu
        //        })
        //        .always(function () { that.endOperation(); });
        //},

        //======================================================================================
        createComplete: function () {
            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- createComplete() --- ");

            // hodně toho je v C#

            if (that.cvModMode === 2) // ng_modefrmInsert
                that.createCompleteEditNoSave();
            else if (that.cvMode === 6) // ng_modefrmFill
            {
                // TODO>
                that.dialogs.error("Režim ng_modefrmFill není ošetřen");

            }
            else {
                if (that.cvMode === 11) // ng_modefrmEditNoSave
                {
                    that.createCompleteEditNoSave();

                    // přetluču inicializaci v nadřazené funkci
                    // TODO> Set df_skp = VisStrTrim( majpol_p.maj.skp )
                }

            } // end if-else

        }, // end function

        createCompleteEditNoSave: function () {
            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- createCompleteEditNoSave() --- ");

            // pro množinovou kartu je nutné načtení pmj_min a pmj_max z číselníku - nastavení příznaku editace - pak přes Validate dojde k načtení
            // TODO: Call SalSetFieldEdit( df_mat_cis, 1 )

            // tohle je kvůli odpisové skupině
            // TODO: Call SalSetFieldEdit( df_skp, 1 )

            //  i pro druh majetku
            // TODO: Call SalSetFieldEdit( df_drh_id, 1 )                        


            // TODO: promise
            // 380.22 08.08.18 pošlu příznak, že record nebyl načten
            //If not setMatCis(0) Call SalPostMsg(hWndForm, SAM_Close, 0, 0)           
            that.setMatCis(0);  // tím vynutím i kaskádu závislostí po výběru v df_mat_cis

            // PSvoboda: vynutím výběr účtů MAJVDRO
            that.findForms("FormIDs").findFields("df_drh_id").gfield("model", "apply", that.DetailDto, { initialValues: false });
        }, // end function

        //======================================================================================
        saveKarta: function () { // dlg_MajKarta.saveKarta( ) 
            var that = this;

            var def = new $.Deferred();

            if (that.cvDebug) console.log("FUNCTION --- saveKarta() ---"); // debug echo                

            // prohlížení režim
            if (that.cvMode === 0) // ng_modefrmView
            {
                def.resolve(); // neprovedu uložení
            }
            else
                that.element.findForms().gform("waitForValues").done(function () {

                    if (that.cvDebug) {
                        that.logWatch("ixs_maj", that.DetailDto.ixs_maj);
                        //var test = that.findForms("FormIDs").findFields("df_skp").gfield("getValue");
                        //that.logWatch("df_skp.value", test);
                        //if (test.skp) that.logWatch("df_skp.value.skp", test.skp);
                    } // end if (debug)

                    // režim předplnění položek
                    if (that.cvMode === 6) // ng_modefrmFill
                    {
                        // spustit validátor dat_uup
                        if (that.findForms("FormIDs").findFields("df_dat_uup").gfield("instance").validate()) {

                            that.getKartaItems();

                            // TODO: datum UUP změny karty se přenese do recodu
                            // Set majpol_p.dat_uup = majpol_p.maj.dat_uup

                            // pro hromadné změny zpřístupním mat_cis - pokud je zadáno, pak vyhodím info, že změna proběhne pouze u unikátních karet
                            if (that.DetailDto.mat_cis) {
                                that.dialogs.messageBox(
                                    "jres:24534482", //RC 24534482 : Informace
                                    "jres:24534626")  //RC 24534626 : Hodnota materiálového čísla bude změněna pouze u unikátních evidenčních karet majetku
                                    .on("close", () => { def.resolve(); });
                            }
                            else
                                def.resolve();

                            // Return 1
                        }
                    }                                        
                    else if (that.element.findForms().gform("isValid")) {
                        // kontrola zadání povinných položek - v gupta se to děje posláním zprávy "GM_Check" políčkům


                        // teď můžu pokračovat
                        // seberu data z polí
                        that.getKartaItems();                        


                        // kontrola diplicity - PSvoboda: to by měla zajistit validace
                        // if testDuplInvCis and not checkDuplInvCis( df_inv_cis ) Return 0


                        // TODO: test duplicity ID MAJ - PSvoboda: to by měla zajistit validace
                        // If testDuplIdMaj and not checkDuplIdMaj( df_id_maj )  Return 0


                        // kontrola odpisových věcí
                        // TODO: ODPISY !
                        // If not checkInformaceOdp(  ) Return 0


                        // uložení karty do bufferu - pouze pokud se jedná o pořizování nové karty
                        //majbuff._copy(majpol_p.maj)
                        if (that.cvModMode === 2) // ng_modefrmInsert
                        {
                            // majbuff._copy( majpol_p.maj )
                            if (that.cvDebug) console.log("TODO: BUFFER KARTY");
                        } // end if


                        // v případě rozdělování karty vymaže buffer kvůli mršení následných karet
                        if (that.cvMode === 32) // ng_modefrmInsertRozM
                        {
                            // majbuff._init(  )
                            // odpbuff._initRec( )
                            if (that.cvDebug) console.log("TODO: INIT BUFFERU KARTY");
                        } // end if


                       // var defSave = new $.Deferred();

                        // insert + dokladový režim implementace
                        if (that.cvModMode === 2 || that.cvMode === 11 || that.cvMode === 21)  // ng_modefrmInsert OR ng_modefrmEditNoSave OR ng_modefrmEditZarUzi
                        {
                            // pokud je nulová částka, dotaz 
                            // - varování nevyhodím u souboru
                            // - režim ng_modefrmInsertNoGenZad - v tomto případě se neptám
                            if (that.DetailDto.c === 0 && that.cvMode !== 22 && that.DetailDto.tka !== 20) // ng_modefrmInsertNoGenZad  ng_tkaSoubor
                                that.dialogs.confirm("jres:24534075")
                                    .on("yes", () => {

                                        // TODO: getEditRpp( )
                                        if (that.cvDebug) console.log("TODO: sebrat data RPP");
                                        if (that.cvDebug) console.log(" INFO - uložení karty proběhne v jiném Contentu");

                                        def.resolve(); // vše se zařídí nad majpol v okně dokladu
                                    });
                            else {
                                // TODO: getEditRpp( )
                                if (that.cvDebug) console.log("TODO: sebrat data RPP");
                                if (that.cvDebug) console.log(" INFO - uložení karty proběhne v jiném Contentu");

                                def.resolve(); // vše se zařídí nad majpol v okně dokladu
                            }

                            //   Return 1
                        }
                        else {

                            // TODO: getEditRpp( )
                            if (that.cvDebug) console.log("TODO: sebrat data RPP");
                            // uložení RPP
                            // TODO: If not saveRpp( ) Return 0


                            // TODO: ošetření editace rozpisu transferů
                            if (that.cvDebug) console.log("TODO: ošetření editace rozpisu transferů");


                            // datum UUP změny karty se přenese do recodu
                            // TODO: Set majpol_p.dat_uup = majpol_p.maj.dat_uup


                            // jdeme na server
                            if (that.cvDebug) console.log("SRV-CALL --- SaveKarta() ---");
                            that.logWatch("DetailDto.ixs_maj", that.DetailDto.ixs_maj);
                            that.logWatch("cvPolDatZmena", that.cvPolDatZmena);
                            
                            // uložení karty s ukončením transakce
                            that.call("SaveKarta", { dto: that.DetailDto, datUup: that.cvDatumUup })
                                .done(function (retVal, content) {

                                    if (that.cvDebug) console.log("Karta byla uložena");

                                    // změna režimu okna
                                    // l_mode = ng_modefrmViewEdit

                                    // zpřístupnění možných polí
                                    // setEnableObject( )

                                    // Set changeTopMmb = FALSE


                                    //that.showFlash("jres:24534559", "g-state-success", 2000, "idKrtSaved"); //RC 24534559 : Karta byla uložena.
                                    def.resolve(); // OK
                                })
                                .fail(function () {

                                    if (that.cvDebug) console.log("Karta NEBYLA uložena");

                                    that.showFlash("jres:24534625", "g-state-error", 2000, "idKrtSaved"); //RC 24534625 : Karta NEBYLA uložena z důvodu chyby.

                                    def.reject();
                                });

                        } // end if-else (INSERT nebo UPDATE)

                    } // end if (isValid)
                    //else def.reject();


                }); // end (waitForValues)

           
            return def.promise();

        }, // end function ( saveKarta ) 

        //------------------------------------------------------------------------------------

        // sebrání hodnot z formuláře

        getKartaItems: function () {
            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- getKartaItems() ---");



            that.findForms("FormIDs").findFields(
                "df_drh_id, df_inv_cis, df_id_maj, df_evi_cis, df_ser_cis, df_vyr_cis, df_sarze, df_ean," +
                "df_mat_cis, df_skp, ml_nazev_skp, ml_nazev, df_mj," +
                "cmb_dan_typ, df_nks, df_dat_por, df_dat_zar," +
                "df_poznamka, cmb_tka, df_jmeno_soubor, df_dat_uup"
            ).gfield("model", "collect", that.DetailDto);
          

            //// je-li karta vyřazená
            //if (that.DetailDto.mat_akt >= 30) {
            //    that.findForms("FormIDs").findFields("df_dat_vyr").gfield("model", "collect", that.DetailDto);
            //    that.DetailDto.dat_vyr = that.DetailDto.dat_vyr_show; // políčk je totiž napojeno na "dat_vyr_show"
            //} // end if

            that.findForms("FormCeny").findFields(
                "df_dat_uct_0123, df_ueab_por, df_ueab_evi, df_ueab_opr, df_ke_pap, df_akce, df_kod_por, df_kod_vyr," +
                "df_c, df_c_poriz, df_pmj, df_cmj, df_c_real, df_c_opr_pol, df_c_dotace, df_pmj_res, df_pmj_min, df_pmj_max," +
                "df_c_dph, df_c_dph_odpocet, df_c_c_dph," +
                "df_cmj_pro1, df_cmj_pro2, df_cmj_pro3"
            ).gfield("model", "collect", that.DetailDto);

            // sběr Ú odpisu
            that.findForms("FormOdpU").findFields( // that.cvShowTabOdpU
                "df_skupina_odpU, df_typ_odpU, df_doba_uziti," + // skp_odp u účetního nesbírám (přebere se z SKP karty)
                "df_c_zbytek_proc, df_c_zbytekU, " +
                "df_mj_odp, df_pc_poc_uzi_mj, df_py_poc_uzi_mj, df_c_odp_mj, df_rc_poc_uzi_mj, df_ro_poc_uzi_mj," + // výkonový odpis
                "df_c_vstupU, df_c_zustU, df_c_opravkaU, df_c_rok_odpU, df_rok_odpisovU, " +
                "df_c_sazba_odpU"
            ).gfield("model", "collect", that.DetailDto);

            // TODO:  Set odprec_p.doba_uziti_ind = df_doba_uziti != df_skupina_odp.skp.doba_uc


            // sběr D odpisu
            that.findForms("FormOdpD").findFields(
                "df_skp_odp, df_skupina_odpD, df_typ_odpD, df_c_zbytekD," + //
                "df_c_vstupD, df_c_zustD, df_c_opravkaD, df_c_rok_odpD, df_rok_start_odp, df_rok_odpisovD, " +
                "df_rok_zvys_vc, df_rok_odpisov_zvc, df_stop_rok_odp, df_stop_rok_odp_zvc, " +
                "df_c_sazba_odpD, " +
                "df_dp_ode"
            ).gfield("model", "collect", that.DetailDto);

            // TODO: Set majpol_p.odp.change = df_c_vstup.editFrm or majpol_p.odp.change

            that.findForms("FormTopol").findFields(
                "df_trida, df_stredisko, df_objekt, df_ixs_orj, df_ixs_ref, df_budova_kod, df_segment_kod, df_mistnost_kod," + // OPTIM: při spec.režimu bych nemusel sbírat ORJ,REF,bud,seg,mis.
                "df_ext_1, df_ext_2, df_ext_3, df_gps_sirka, df_gps_delka"
            ).gfield("model", "collect", that.DetailDto);

            that.findForms("FormEsu").findFields("df_ixs_esu_vyr, df_ixs_esu_dod, df_ixs_esu_servis, df_ixs_esu_vla").gfield("model", "collect", that.DetailDto);

            that.findForms("FormTech").findFields(
                "df_rozmer_l, df_rozmer_w, df_rozmer_h, df_hmotnost, df_rok_vyr, df_expirace, df_lhuta_zaruka," +
                "df_kod_vyu, df_typ_maj, df_stat_puvod, df_ktg_zar, df_prev_stav, df_mobilita, df_trida_bezp, df_riziko_por," +
                "cmb_ktg_kp, df_cis_rejstrik_kp, df_id_rejstrik_kp"
            ).gfield("model", "collect", that.DetailDto);

            // TODO: sběr dat RPB-P

            // TODO: sběr dat RPP (popisné vl.)


            //-----------------------------
            // ÚPRAVY dat z getKartaItems() - většina obsloužena na serveru v GKartaMaj.UlozKartu() !!!
            //-----------------------------
            // TODO: cizí měna - pouze v případě, že dochází k obsluze
            // If isVisibleCMena
            // majpol_p.pol.c_mena = df_c_mena
            // majpol_p.pol.kurz = df_kurz

            if (that.cvModMode === 2 && that.DetailDto.zev === 10) // ng_modefrmInsert  ng_zevUnik
            {
                if (that.DetailDto.typ_soubor === 0) { // vybrána samost.karta
                    that.DetailDto.tka = 10; // ng_tkaSam
                }
                else {
                    that.DetailDto.tka = 20; // ng_tkaSoubor
                    that.DetailDto.inv_cis_soubor = that.DetailDto.inv_cis;
                    // majpol_p.maj.typ_soubor = cmb_tka.nfcDv_N - PSvoboda: typ souboru už mi vybere kombáč
                }
                
            }
            else {
                if (that.DetailDto.tka === 0) that.DetailDto.tka === 10; // ng_tkaSam
            } // end if-else (rozhodnoutí o TKA)


            //------------------------------
            // TESTY
            //------------------------------
            if (that.cvDebug) console.log("Výsledky po collect (jsou-li):");
            that.logWatch("skp", that.DetailDto.skp);                        


        }, // end function ( getKartaItems )

        //------------------------------------------------------------------------------------

        jsShowLocationOnMapyCz: function () {
            window.alert("Není dokončeno - dlg_MajKarta.showLocationOnMapyCz( )");

        }, // end function

        jsCallGis: function () {
            window.alert("Není dokončeno - dlg_MajKarta.callGis( )");

        }, // end function


        //------------------------------------------------------------------------------------

        // logování WATCH
        logWatch: function (watchName, watchVal) {
            var that = this;

            if (that.cvDebug) console.log(" - @ " + watchName + ": [" + watchVal + "]");
        }, // end function ( logWatch )


        //======================================================================================     

        setInvCisMax: function (rezim_por_p) {
            var that = this;

            if (that.cvDebug) {
                console.log("FUNCTION --- setInvCisMax() ---");
                console.log(" - DetailDto.drh_id = [" + that.DetailDto.drh_id + "]");
            }

            //----------------
            // unuikátní karta
            //----------------
            if (that.MajInitSkupUniq === 1 || that.DetailDto.zev === 10)// skupina_unique_l + df_mat_cis.matcis.zev
            {
                that.findForms("FormCeny").findFields("df_pmj").gfield("option", "disabled", true);
                that.findForms("FormCeny").findFields("df_pmj_min").gfield("option", "disabled", true);
                that.findForms("FormCeny").findFields("df_pmj_max").gfield("option", "disabled", true);
                that.findForms("FormCeny").findFields("df_pmj").gfield("setValue", 1);
                that.findForms("FormCeny").findFields("df_pmj_min").gfield("setValue", 0);
                that.findForms("FormCeny").findFields("df_pmj_max").gfield("setValue", 0);

                if (that.argModeReq === 4000) // TODO: If mode_req_p = ng_typagSEM and VisStrTrim( majbuff.inv_cis ) != '' 
                {
                    // předplním zaslané inv.číslo
                    // Set df_inv_cis = majbuff.inv_cis 
                    that.dialogs.error("NOT_IMPLEMENTED majbuff");

                    // TODO:

                }
                else {

                    if (that.cvMode === 2 || that.cvMode === 22) {  // ng_modefrmInsert + ng_modefrmInsertRozM


                        //------------------------------
                        // pokud je inv. číslo ve tvaru ixs_maj
                        //------------------------------
                        if (that.MAJ_ICO_FRM_INV) {


                            if (that.MAJ_ICO_GEN_INV)
                                // pokud je inv. číslo generované zamezím jeho editaci
                                that.findForms("FormIDs").findFields("df_inv_cis").gfield("option", "disabled", true);
                            else {
                                // nastavení na velká písmena
                                // TODO: SalFmtSetFormat( df_inv_cis, FMT_Format_UpperCase )

                                // pokud negenuruju ale lízám štítky, pak zpřístupním pole
                                that.findForms("FormIDs").findFields("df_inv_cis").gfield("option", "disabled", false);

                                // předplnění inv. čísla dle hodnoty Možnosti... ale pokud již bylo zadáno, tak ponechám
                                var myVal = that.findForms("FormIDs").findFields("df_inv_cis").gfield("getValue");
                                if (myVal.inv_cis.length !== 12) {
                                    that.findForms("FormIDs").findFields("df_inv_cis").gfield("setValue", that.cvLocKrfFillInvCis); // předplnění dle "UserSettings"
                                } // end if (již zadané inv.č.)

                                // nastavím příznak nutný pro vyhodnocení duplicity
                                that.testDuplInvCis = true;
                            } // end if-else (MAJ_ICO_GEN_INV)

                        }
                        else
                        //------------------------------
                        // inv. číslo nemá tvar ixs_maj
                        //------------------------------
                        {

                            if (that.MAJ_ICO_GEN_INV) {

                                if (that.DetailDto.inv_cis.length === 0) // If VisStrTrim( majpol_p.maj.inv_cis ) = ''
                                {
                                    if (that.cvDebug) {
                                        console.log(" INFO - inv. číslo nemá tvar ixs_maj");
                                        console.log(" WATCH - DetailDto.trida = [" + that.DetailDto.trida + "]");
                                        //console.log(" - DetailDto.typ_dok = [" + that.DetailDto.typ_dok + "]");

                                    }
                                    // rozhodnutí o spuštění generátoru dle  závislosti generátoru na subjektech
                                    // - generuju tehdy, pokud není závislost na druhu či je závislé na druhu a l_mode=1
                                    // - přidána i závislost na třídě
                                    // - pokud je již definovaná třída, pak generuju - platí pro ISTA
                                    var bGenInvCisDrh = that.MAJ_ZAV_INV_CIS === 3010 && rezim_por_p === 1; // ng_urovencfgricDrhId
                                    var bGenInvCisTri = that.MAJ_ZAV_INV_CIS === 3020 && // ng_urovencfgricTrida
                                        (rezim_por_p === 2 || that.DetailDto.trida.length > 0); // ... or VisStrTrim( majpol_p.maj.trida ) != ''
                                    if (((that.MAJ_ZAV_INV_CIS === 3010 || that.MAJ_ZAV_INV_CIS === 3020) === false) || bGenInvCisDrh || bGenInvCisTri) {

                                        // generátor
                                        that.call("GetInvCisMax", {
                                            idTop: that.DetailDto.id_top,
                                            skupinaId: that.DetailDto.skupina_id,
                                            drhId: that.DetailDto.drh_id,
                                            trida: that.DetailDto.trida,
                                        })
                                            .then(function (result, content) {

                                                that.DetailDto.inv_cis = result;
                                                // propíšu nastavené inv_cis do políčka
                                                that.findForms("FormIDs").findFields("df_inv_cis").gfield("setValue", that.DetailDto.inv_cis);

                                            }); // end then

                                    }
                                    else
                                        that.DetailDto.inv_cis = "";

                                } // end if (inv_cis.length === 0)

                                // propíšu nastavené inv_cis
                                that.findForms("FormIDs").findFields("df_inv_cis").gfield("setValue", that.DetailDto.inv_cis);
                                // pokud je inv. číslo generované zamezím jeho editaci
                                that.findForms("FormIDs").findFields("df_inv_cis").gfield("option", "disabled", true);

                            }
                            else {

                                // pouze mimo režim 2 - gumovalo to inv. číslo po průchodu třídou
                                if (rezim_por_p != 2) {
                                    that.findForms("FormIDs").findFields("df_inv_cis").gfield("option", "disabled", false);

                                    // předplnění inv. čísla dle hodnoty Možnosti ...
                                    that.findForms("FormIDs").findFields("df_inv_cis").gfield("setValue", that.cvLocKrfFillInvCis);

                                    // TODO> vnutím příznak, že bylo editováno
                                    // Call SalSetFieldEdit( df_inv_cis, 1 )

                                    // TODO>nastavím příznak nutný pro vyhodnocení duplicity
                                    // Set testDuplInvCis = 1

                                    // pokud je nastavena kontrola délky, pak jí nastavím - PSvoboda: zde je jediné místo kde se to nastavuje
                                    if (that.MAJ_CIS_INVCDFL > 0 && that.MAJ_CIS_INVCDFL <= 12)
                                        that.bInvCisLenDrivenByPar = true;

                                } // end if (rezim_por_p != 2)

                            } // end if-else (MAJ_ICO_GEN_INV)

                        } // end if-else (MAJ_ICO_FRM_INV)

                    }
                    else if (that.cvModMode !== 2) // ng_modefrmInsert
                        // nepřístupním inv. číslo pouze tehdy, když nejde o insertovací režim
                        that.findForms("FormIDs").findFields("df_inv_cis").gfield("option", "disabled", true);

                } // end if-else (SEM / Inserty)

            }
            //----------------
            // množinová karta
            //----------------
            else {

                that.findForms("FormIDs").findFields("df_inv_cis").gfield("setValue", ""); // nuluju inv. číslo                
                that.findForms("FormIDs").findFields("df_inv_cis").gfield("option", "disabled", true);

                that.findForms("FormCeny").findFields("df_pmj").gfield("option", "disabled", false);
                that.findForms("FormCeny").findFields("df_pmj_min").gfield("option", "disabled", false);
                that.findForms("FormCeny").findFields("df_pmj_max").gfield("option", "disabled", false);


                // TODO: přiřazení hodnot množství min a max z mat_cis
                // TODO: Set df_pmj_min = df_mat_cis.matcis.pmj_min
                // TODO: df_pmj_max = df_mat_cis.matcis.pmj_max

                // řízení přístupu na cmj - dle parametru pro příjmy 
                if (that.MAJ_RAD_POLCMJ)
                    that.findForms("FormCeny").findFields("df_cmj").gfield("option", "disabled", false);

                // přístup k cenám
                var InsertOrEdit = that.cvModMode === 2 || that.cvModMode === 3; // ng_modefrmInsert či ng_modefrmEdit
                that.findForms("FormCeny").findFields("df_c").gfield("option", "disabled", InsertOrEdit === false); // přístupné v insert režimu či editaci
                if (that.cvMode === 22) // ng_modefrmInsertNoGenZad - insert nové položky bez gen.ID
                {
                    that.findForms("FormCeny").findFields("df_c").gfield("option", "disabled", true);
                    that.findForms("FormCeny").findFields("df_c_dph").gfield("option", "disabled", true);
                    that.findForms("FormCeny").findFields("df_c_c_dph").gfield("option", "disabled", true);
                } // end if (ng_modefrmInsertNoGenZad)
                if (that.argModeReq === 4000) // obsluha žádosti ng_typagSEM
                {
                    if (that.DetailDto.c > 0) // majpol_p.maj.c 
                    {
                        that.findForms("FormCeny").findFields("df_c").gfield("option", "disabled", true);
                        that.findForms("FormCeny").findFields("df_c_dph").gfield("option", "disabled", true);
                        that.findForms("FormCeny").findFields("df_c_c_dph").gfield("option", "disabled", true);
                        that.findForms("FormCeny").findFields("df_c_dotace").gfield("option", "disabled", true);
                    } // end if
                } // end if (ng_typagSEM)


                // focus na df_mat_cis
                if (that.df_mat_cis.Edit) that.findForms("FormIDs").findFields("df_mat_cis").gfield("focus");


            } // end if-else (UNQ / MN karta)
        }, // end function (setInvCisMax)

        //--------------------------------------------------------------------------------

        changeDrhId: function (rezim, myVal) { // dlg_MajKarta.changeDrhId( )
            var that = this;


            if (that.cvDebug) {
                console.log("CALL --- changeDrhId() --- ");
                console.log(" WATCH - drh_id = [" + myVal + "]");
                console.log(" WATCH - ucty.uea_evi = [" + that.ucty.uea_evi + "]");
                console.log(" WATCH - ucty.uea_por = [" + that.ucty.uea_por + "]");
                console.log(" WATCH - ucty.uea_opr = [" + that.ucty.uea_opr + "]");
            } // end if (debug)


            if (that.df_drh_id.Edit) { // vypadne, když není pole editovatelné

                // var myVal = that.findFields("df_drh_id").gfield("getValue").drh_id;


                // pokud se v opravném režimu nezmění druh, není důvod mazat účty
                // - přidán režim pořízení s předplňováním
                // - přidáno vyhodnocení, že se nejedná o režim převzetí žádosti
                if ((that.cvMode === 11 || // ng_modefrmEditNoSave
                    (that.argModeReq !== 4000 && that.MAJ_ICO_FILL_KR && that.argMode === 2 && that.DetailDto.ueab_evi !== that.cvUeabNull && that.DetailDto.ueab_por !== that.cvUeabNull)) // TODO: trim() UEAB_EVI a POR // ng_typagSEM + ng_modefrmInsert
                    && that.DetailDto.drh_id === myVal) // hodnota se neliší od původní
                {
                    // obsluha případné generace inv. čísla závislého na druhu majetku
                    // NOP - obsluha je úplně dole, neb se provede vždy
                } // end if (ng_modefrmEditNoSave)
                else {

                    // pouze ve stavu evidence
                    // iniciace SU-AU                 
                    if (that.DetailDto.mat_akt !== 18) // ng_majaktPor
                        that.findFields("df_ueab_evi").gfield("option", "serverFilters", {
                            drh_id: myVal,
                            dev: that.DetailDto.dev,
                            ixs_vue: that.cvIxsVue,
                            //  uea: that.ucty.uea_evi
                        });


                    //--------------------                    
                    // uložím si, že DRH je odpisován - již provedeno v df_drh_id.change() // Set MajInit.mode_odp_drh =  df_drh_id.drh.mode_odp

                    // definice příznaku odpisu aktuální karty
                    //---------------------------
                    // MajInit._setModeOdpKrt( )
                    //---------------------------
                    that.modeOdpKrt = 0;
                    if (that.MAJ_ICO_MODPIS && that.cvMajInitModeOdpSkp === 10 && that.modeOdpDrh === 10) that.modeOdpKrt = 10;

                    if (that.cvDebug) {
                        console.log(" WATCH - cvMajInitModeOdpSkp = [" + that.cvMajInitModeOdpSkp + "]");
                        console.log(" WATCH - modeOdpDrh = [" + that.modeOdpDrh + "]");
                        console.log(" WATCH - MAJ_ICO_MODPIS = [" + that.MAJ_ICO_MODPIS + "]");
                        console.log(" WATCH - modeOdpKrt = [" + that.modeOdpKrt + "]");
                    } // end if (debug)
                    //--------------------

                    // výběrem jiného druhu mohlo dojít ke změně režimu odpisu karty => řízení přístupnosti záložek
                    that.DetailDto.priz_odp = that.modeOdpKrt;

                    // TODO: prověři! - setEnableTab( )
                    // minimálně nějaký zákaz formuláře ODP-U či ODP-D

                    // řízení viditelnosti oprávek                    
                    that.element.findFields("df_ueab_opr").gfield("option", "disabled", that.DetailDto.priz_odp !== 10); // ng_modeodpYes


                    // iniciace SU-AU - PSvoboda: zařízeno napevno vazbou this.ucty.uea_por
                    that.findFields("df_ueab_por").gfield("option", "serverFilters", {
                        drh_id: myVal,
                        dev: that.DetailDto.dev,
                        ixs_vue: that.cvIxsVue,
                        uea: that.ucty.uea_por
                    });


                    // pokud je na vstupu WS účet, ponechá se
                    if (that.cvMode === 2 && that.argModeReq === 4000 && that.DetailDto.ueab_por && that.DetailDto.ueab_por.length === 7 && that.DetailDto.ueab_por !== "0000000") // ng_modefrmInsert
                    {
                        // df_ueab_por = majpol_p.maj.ueab_por
                    }
                    else {
                        // pokud existuje jedna kombinace, dotáhne jí - pokud existuje více kombinací, přiřadí pouze SU

                        if (that.ucty.uea_por)  // PSvoboda: ale pouze pokud znám vybrané UEA (což je při založení) + ještě to pojistím mod módem
                            that.call("GetUeabOnlyOne", { drhId: myVal, dev: that.DetailDto.dev, ixsVue: that.cvIxsVue, uea: that.ucty.uea_por, ueabXxx: "" })
                                .done(function (data) {

                                    if (that.cvDebug) {
                                        console.log("SRV-CALL - GetUeabOnlyOne(df_ueab_por).done ");
                                        console.log(" WATCH - data = [" + data + "]");
                                    } // end if (debug)

                                    // set hodnoty do políčka (buď celé UEAB_XXX nebo jen část UEA)
                                    that.findForms("FormCeny").findFields("df_ueab_por").gfield("setValue", { drh_id: that.DetailDto.drh_id, dev: that.DetailDto.dev, uea: that.ucty.uea_por, ixs_vue: that.cvIxsVue, ueab_xxx: data });

                                    // v případě požadavku z WS naplní record
                                    if (rezim === 1) that.DetailDto.ueab_por = data;

                                }); // end call.done

                    } // end if-else                    


                    // pouze ve stavu evidence
                    if (that.DetailDto.mat_akt !== 18) // ng_majaktPor
                    {
                        that.findFields("df_ueab_evi").gfield("option", "serverFilters", {
                            drh_id: myVal,
                            dev: that.DetailDto.dev,
                            ixs_vue: that.cvIxsVue,
                            uea: that.ucty.uea_evi // i filtr na UEA
                        });


                        var l_ueab_evi = "";
                        if (rezim === 1) l_ueab_evi = that.DetailDto.ueab_evi;
                        // pokud je na vstupu WS účet, ponechá se
                        if (that.cvMode === 2 && that.argModeReq === 4000 && that.DetailDto.ueab_evi && that.DetailDto.ueab_evi.length === 7 && that.DetailDto.ueab_evi !== "0000000") // ng_modefrmInsert
                        {
                            // df_ueab_por = majpol_p.maj.ueab_evi
                        }
                        else {

                            // pokud existuje jedna kombinace, dotáhne jí - pokud existuje více kombinací, přiřadí pouze SU                            

                            if (that.ucty.uea_evi)  // PSvoboda: ale pouze pokud znám vybrané UEA (což je při založení) + ještě to pojistím mod módem
                                that.call("GetUeabOnlyOne", { drhId: myVal, dev: that.DetailDto.dev, ixsVue: that.cvIxsVue, uea: that.ucty.uea_evi, ueabXxx: l_ueab_evi })
                                    .done(function (data) {

                                        if (that.cvDebug) {
                                            console.log("SRV-CALL - GetUeabOnlyOne(df_ueab_evi).done ");
                                            console.log(" WATCH - data = [" + data + "]");
                                        } // end if (debug)

                                        // set hodnoty do políčka (buď celé UEAB_XXX nebo jen část UEA)
                                        that.findForms("FormCeny").findFields("df_ueab_evi").gfield("setValue", { drh_id: that.DetailDto.drh_id, dev: that.DetailDto.dev, uea: that.ucty.uea_evi, ixs_vue: that.cvIxsVue, ueab_xxx: data });

                                        // pokud je pole naplněno, je to OK - jinak shodím požadavek v recordu
                                        if (rezim === 1 && data !== l_ueab_evi) that.DetailDto.ueab_evi = data;

                                    }); // end call.done

                        } // end if-else                        

                    } // end if (mat_akt !== 18)


                    if (that.DetailDto.priz_odp === 10) {

                        // iniciace SU-AU  - PSvoboda: zařízeno napevno vazbou this.ucty.uea_opr
                        that.findFields("df_ueab_opr").gfield("option", "serverFilters", {
                            drh_id: myVal,
                            dev: that.DetailDto.dev,
                            ixs_vue: that.cvIxsVue,
                            uea: that.ucty.uea_opr // i filtr na UEA
                        });

                        // pokud je na vstupu WS účet, ponechá se
                        if (that.cvMode === 2 && that.argModeReq === 4000 && that.DetailDto.ueab_opr && that.DetailDto.ueab_opr.length === 7 && that.DetailDto.ueab_opr !== "0000000") // ng_modefrmInsert
                        {
                            // df_ueab_por = majpol_p.maj.ueab_por
                        }
                        else {

                            // pokud existuje jedna kombinace, dotáhne jí - pokud existuje více kombinací, přiřadí pouze SU

                            if (that.ucty.uea_opr)  // PSvoboda: ale pouze pokud znám vybrané UEA (což je při založení) + ještě to pojistím mod módem
                            {
                                //that.beginOperation("Předplňuji SU-AU...");

                                that.call("GetUeabOnlyOne", { drhId: myVal, dev: that.DetailDto.dev, ixsVue: that.cvIxsVue, uea: that.ucty.uea_opr, ueabXxx: "" })
                                    .done(function (data) {

                                        if (that.cvDebug) {
                                            console.log("SRV-CALL - GetUeabOnlyOne(df_ueab_opr).done ");
                                            console.log(" WATCH - data = [" + data + "]");
                                        } // end if (debug)

                                        // set hodnoty do políčka (buď celé UEAB_XXX nebo jen část UEA)
                                        that.findForms("FormCeny").findFields("df_ueab_opr").gfield("setValue", { drh_id: that.DetailDto.drh_id, dev: that.DetailDto.dev, uea: that.ucty.uea_opr, ixs_vue: that.cvIxsVue, ueab_xxx: data });

                                        // v případě požadavku z WS naplní record
                                        if (rezim === 1) that.DetailDto.ueab_opr = data;

                                        //that.endOperation();

                                    }); // end call.done
                            } // end if

                        } // end if-else

                    } // end if (priz_odp === 10)


                    // parametrizace "df_ke_pap" - PSvoboda: to je ošetřené v selektoru políčka


                    // sejmu si typ rozš. profilu do proměnné - PSvoboda: to kdyžtak udělám v "change:"
                    // n_typ_rp = df_drh_id.drh.typ_rp

                } // end if-else


                // obsluha případné generace inv. čísla závislého na druhu majetku                
                that.jsTryDrhIdGenInvCis(myVal);

            } // end if
        }, // end function ( changeDrhId )

        //--------------------------------------------------------------------------------

        jsTryDrhIdGenInvCis: function (myVal) { // dlg_MajKarta.tryDrhIdGenInvCis( )
            var that = this;

            if (that.cvDebug) {
                console.log("CALL --- jsTryDrhIdGenInvCis() ---");
                console.log(" WATCH - drh_id = [" + myVal + "]");
            } // end if (debug)

            // volání generování inv. čísla v případě závislosti na druhu 
            // díky vynucenému průchodu událostí GM_Change v createCompleteEditNoSave()!!!

            // nastavím si příznak změny
            var zmena = that.findForms("FormIDs").findFields("df_drh_id").gfield("hasChanged");

            // inicializace úrovně kontextu db parametrů - to by mělo umožnit pro různé druhy majetku měnit formát inv. čísla
            // EkoInit._setUrovenCfg( ng_urovencfgricDrhId, SalNumberToStrX( df_drh_id.drh.id, 0 ) )
            // PSvoboda: já s tou úrovní asi manipulovat globálně nebudu
            // v GINCCFG je uroven_cfg, ta je pak nastavena i v GINSPAR


            // změna kontextu - úrovně čtení parametrů !!!
            that.call("SaveExtParContext", {
                urovenCfg: 3010, // ng_urovencfgricDrhId
                subjCfg: myVal,     // df_drh_id.drh.id
            })
                .then(function (result, content) {

                    // pokud došlo ke změně druhu a generuju v závislosti na druhu majetku - pak musím vygumovat inv. číslo
                    if (that.MAJ_ZAV_INV_CIS === 3010 && zmena) // ng_urovencfgricDrhId
                    {
                        that.findForms("FormIDs").findFields("df_inv_cis").gfield("setValue", "");
                        that.DetailDto.inv_cis = "";

                        // přebudování db parametrů
                        // - úroveň par. je změněma, kontext by mi je měl vrátit z nové úrovně - to budu potřebovat pro generátor INV_CIS

                    } // end if


                    // přiřazení nového druhu majetku do DTO
                    that.DetailDto.drh_id = myVal; // majpol_p.maj.drh_id = df_drh_id.drh.id

                    that.setInvCisMax(1);

                }); // end then   

        }, // end function ( jsTryDrhIdGenInvCis )

        //--------------------------------------------------------------------------------

        setMatCis: function () { // dlg_MajKarta.setMatCis( )
            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- setMatCis() --- ");


            var myVal = that.findForms("FormIDs").findFields("df_mat_cis").gfield("getValue");


            if (that.cvDebug) {
                console.log(" WATCH - df_mat_cis.matcis.zev = [" + that.matcis_zev + "]");
                if (myVal) console.log(" WATCH - df_mat_cis.matcis.dan_typ = [" + myVal.dan_typ + "]");
                if (myVal) console.log(" WATCH - df_mat_cis.matcis.mj = [" + myVal.mj + "]");
                if (myVal) console.log(" WATCH - df_mat_cis.matcis.skp = [" + myVal.skp + "]");
            } // end if (debug)

            // při opravě SKP musím znemožnit změnu UNIQUE karty na MNOŽINOVOU a opačně u množinové karty
            if (that.cvMode === 1) // ng_modefrmEdit
            {

                // unikátní
                // pro skupinu unikátní, či kartu, která má inv_cis, klidně povolím změnu na množinové SKP a vnutím tam s_unique=1
                if (that.cvMajInitSkmUnqL || that.DetailDto.zev === 10) // MajInit.skupina_unique_l = 1 OR ng_zevUnik
                    that.DetailDto.zev = 10;
                // množinový případ
                else {
                    if (that.DetailDto.zev !== that.matcis_zev && that.df_mat_cis.Edit) {
                        that.dialogs.error("Nepovolená změna materiálového čísla - nelze měnit množinovou kartu na unikátní!");

                        // TODO: vrátím to zpět
                        // df_mat_cis.matcis.skp = majpol_p.maj.mat_cis
                        // df_mat_cis.matcis.nazev = majpol_p.maj.nazev_skp
                        // df_mat_cis = majpol_p.maj.mat_cis
                        // ml_nazev_skp = majpol_p.maj.nazev_skp
                        // df_mat_cis.matcis.zev = majpol_p.maj.zev                                             

                        return;
                    } // end if
                } // end if-else (UNQ/MN)

            }
            else {

                // tady musím zařídit příslušnou změnu v povolených případech
                // pro unikátní skupinu vnutím UNQ
                if (that.cvMajInitSkmUnqL) // MajInit.skupina_unique_l = 1
                    that.DetailDto.zev = 10;
                else
                    that.DetailDto.zev = matcis_zev;

            } // end if-else


            // nastavím sazbu DPH podle "df_mat_cis" - pouze v případě, že sazba nebyla zatím zadána
            var cmbVal = that.findForms("FormIDs").findFields("cmb_dan_typ").gfield("getValue");
            if (cmbVal.dan_typ === 0 && myVal && myVal.dan_typ)
                //that.findForms("FormIDs").findFields("cmb_dan_typ").gfield("setValue", myVal.dan_typ);
                that.findForms("FormIDs").findFields("cmb_dan_typ").gfield("model", "apply", { dan_typ: myVal.dan_typ });


            // toto platí pouze pro pořízení nové karty a editační režim ( rozhodně ne pro hromadné změny )
            // + přidáno rozdělení karty
            if (that.cvMode === 1 || that.cvMode === 2 || that.cvMode === 32) // edit / insert / RozM
            {

                if (myVal && myVal.nazev)
                    that.findForms("FormIDs").findFields("ml_nazev_skp").gfield("setValue", myVal.nazev);


                // přiřazení SKP z definice MATCIS
                if (myVal && myVal.skp) {

                    var skpField = that.findForms("FormIDs").findFields("df_skp");
                    var skpVal = skpField.gfield("getValue");

                    // pouze tehdy, je-li skp prázdné
                    // změna je povolena na parametr maj_rad_chskpmc
                    // pokud se jedná režim předplňování karty, neprovede se přeražení klasifikace
                    // pokud se rozděluje karta, nebude měnit klasifikaci                                    
                    if ((skpVal && !skpVal.skp)
                        ||
                        (that.MAJ_RAD_CHSKPMC && !(that.MAJ_ICO_FILL_KR && (that.cvMode === 2 || that.cvMode === 32))))  // ng_modefrmInsert + ng_modefrmInsertRozM
                    {
                        //that.findForms("FormIDs").findFields("df_skp").gfield("model", "apply", { skp: myVal.skp });
                        skpField.gfield("setValue", { skp: myVal.skp });
                        // inicializace odpisové skupiny
                        that.findForms("FormOdpU").findFields("df_skupina_odpU").gfield("setValue", "");
                        that.findForms("FormOdpD").findFields("df_skupina_odpD").gfield("setValue", "");
                    } // end if
                }

                // přenos MJ - pouze v případě, že MJ != 0 a pokud není MJ null nebo prázdný řetězec
                if (myVal && myVal.mj && myVal.mj !== 0)
                    //that.findForms("FormIDs").findFields("df_mj").gfield("setValue", myVal.mj); // TODO: toto nefunguje
                    that.findForms("FormIDs").findFields("df_mj").gfield("model", "apply", { mj: myVal.mj });

            }
            else if (that.cvMode === 6) { // ng_modefrmFill

                if (myVal && myVal.nazev)
                    that.findForms("FormIDs").findFields("ml_nazev_skp").gfield("setValue", myVal.nazev);

            } // end if-else (módy)

            that.jsSetVisibleTka();


            // pokud je zadáván doklad v cizí měně a tato měna souhlasí s jednotkovu cenou v číselníku, předplní se nákupní cena
            // musím sem dostat majpol.pol
            console.log("NOT IMPLEMENTED: dlg_MajKarta.setMatCis - předplnění cizí měny");
                    

            that.setInvCisMax(0);        
        
        }, // end function ( setMatCis ) 

        //--------------------------------------------------------------------------------

        jsSetVisibleTka: function () { // dlg_MajKarta.setVisibleTka( )
            var that = this;

            if (that.cvDebug) {
                console.log("CALL --- jsSetVisibleTka() ---");
            } // end if (debug)


            console.log("NOT IMPLEMENTED: dlg_MajKarta.cmb_tka")
            // pro definici unikátní karty zpřístupním zadání věcí kolem souboru majetku
            if (that.cvModMode === 2 && that.DetailDto.zev === 10 && that.DetailDto.mat_akt === 20) // ng_modefrmInsert / ng_zevUnik / ng_majaktEvi
            {
                // cmb_tka.edit = 1                
            }
            else {
                // cmb_tka.edit = 0                
            } // end if-else


            if (that.DetailDto.dev === 20) // ng_devNevlastni
            {
                that.findForms("FormEsu").findFields("df_ixs_esu_vla").gfield("option", "disabled", false);
            }
            else {
                that.findForms("FormEsu").findFields("df_ixs_esu_vla").gfield("option", "disabled", true);
            } // end if-else


            that.actions.actWwwMap.enabled(true); // icTabs.ShowWindow( pb_gps )	


            // řízení viditelnosti částky v cizí měně + kurzu
            // PSvoboda: musím sem dostat celý objekt majpol (nebo alespoň majpol.pol) - což je teda trochu neohrabanej paskvil...
            console.log("NOT IMPLEMENTED: dlg_MajKarta.jsSetVisibleTka() - řízení částky v CM")

        }, // end function ( jsSetVisibleTka ) 
        
        //--------------------------------------------------------------------------------
        
        jsCheckDuplIdMaj: function (value) { // dlg_MajKarta.checkDuplIdMaj( )
            var that = this;

            if (that.cvDebug) {
                console.log("CALL --- jsCheckDuplIdMaj() ---");
                console.log(" WATCH - id_maj = [" + value + "]");
            } // end if

            that.call("CheckDuplIdMaj", { idMaj: value })
                .then(function (result, content) {

                    if (result) that.dialogs.error("Evidenční karta se zadaným identifikátorem majetku již existuje!");

                }) // end then
        }, // end function ( jsCheckDuplIdMaj ) 

        //--------------------------------------------------------------------------------

        jsEviCisKeyDown: function () {
            // kontrola duplicitního zadání v případě zadávání inv. čísel rukama
            // TODO !   df_evi_cis.WM_KEYDOWN( ) 
            // 376.2 01.10.15 vynucené generování speciálního EČ
            // If wParam = VK_F12 and EkoInit.Rad._getValue( 'maj_rad_srezec' ) >= '1' and ( MajInit.skupina_unique_l = ng_suniqueUnik or df_mat_cis.matcis.zev = ng_zevUnik ) and l_mode = ng_modefrmEdit
        },

        setEviCisMax: function () {
            // setEviCisMax se bude volat pouze při nastaveném 'maj_rad_srezec'
            var that = this;

            if (that.cvDebug) {
                console.log("CALL --- setEviCisMax() ---");
               // console.log(" WATCH - matcis_zev = [" + that.matcis_zev + "]");
                console.log(" WATCH - cvMajInitSkmUnqL = [" + that.cvMajInitSkmUnqL + "]");
                console.log(" WATCH - cvMajInitLenSRezEc = [" + that.cvMajInitLenSRezEc + "]");
            } // end if

            
            //  Speciální obsluha EČ bude aktivní pouze pro unikátní majetek (nese inventární číslo) !
            //if (!(that.cvMajInitSkmUnqL === 1 || that.matcis_zev === 10)) // 1 = ng_suniqueUnik, 10 = ng_zevUnik
            if (!(that.cvMajInitSkmUnqL === 1 || that.DetailDto.zev === 10)) // 1 = ng_suniqueUnik, 10 = ng_zevUnik
                return true; // jdeme pryč

            var def0 = new $.Deferred();

            // dotaz na délku
            if (that.cvMajInitLenSRezEc === 0)
                // TODO: SalModalDialog( dlg_getNum, hWndForm, 'Požadovaná délka evidenčního čísla', 2, 6, 1, l_len_ec )
                // 2 = min
                // 6 = max
                that.dialogs.prompt("Zadejte", "Požadovaná délka evidenčního čísla")
                    .on("close", function (event, retValue) {

                        // Akce po uzavreni
                        if (retValue == "undefined" || retValue == null || retValue.values == "undefined") {
                            def0.reject();
                            //return false;
                        }                            
                        else {
                            if (retValue)
                                def0.resolve(retValue);
                            else
                                def0.reject();
                        }

                    });
            else
                def0.resolve(that.cvMajInitLenSRezEc);


            def0.then(function (evcLen) {

                that.call("SetEviCisMax", { evcLen: evcLen })
                    .done(function (data) {

                        that.findForms("FormIDs").findFields("df_evi_cis").gfield("setValue", data);
                        // evi_cis je nadále editovatelný
                        that.findForms("FormIDs").findFields("df_evi_cis").gfield("option", "disabled", false);

                    });


                // call (evcLen)
            })
            def0.fail(function () { return false; });

        }, // end function ( setEviCisMax )

        //--------------------------------------------------------------------------------

        jsChangeIdMnozKrt: function (ixsMaj) { // dlg_MajKarta.changeIdMnozKrt( )
            var that = this;

            console.log("NOT IMPLEMENTED: dlg_MajKarta.changeIdMnozKrt( )")

            if (that.cvDebug) {
                console.log("CALL --- jsChangeIdMnozKrt() ---");
                console.log(" WATCH - ixs_maj = [" + ixsMaj + "]");
            } // end if

            if (ixsMaj && (that.cvModMode === 2 || that.cvMode === 12 || that.cvMode === 22)) // ng_modefrmInsert OR ng_modefrmInsertNoGen OR ng_modefrmInsertNoGenZad
            {
                // TODO: načtení karty

                // TODO: přiřazení důležitých údajů na kartu

                // blokace zásadních údajů   
                that.findForms("FormCeny").findFields("df_ueab_por").gfield("option", "disabled", true);
                that.findForms("FormCeny").findFields("df_ueab_opr").gfield("option", "disabled", true);
                that.findForms("FormCeny").findFields("df_ueab_evi").gfield("option", "disabled", true);
                that.findForms("FormIDs").findFields("df_dat_por").gfield("option", "disabled", true);
                that.findForms("FormIDs").findFields("df_dat_zar").gfield("option", "disabled", true);
                that.findForms("FormIDs").findFields("df_mj").gfield("option", "disabled", true);

            } // end if            
                                                
        }, // end function ( jsChangeIdMnozKrt ) 

        //--------------------------------------------------------------------------------

        checkTypOdp: function () {
            var that = this;

            console.log("NOT IMPLEMENTED: checkTypOdp( ) - ODPIS")

            if (that.cvDebug) {
                console.log("CALL --- checkTypOdp() ---");
                console.log(" WATCH - cvSkupinaTypDm = [" + that.cvSkupinaTypDm + "]");
            } // end if

            // pokud se jedná o DNM a období je >= 21, nelze odpisovat
            var myDatZar = that.findForms("FormIDs").findFields("df_dat_zar").gfield("getValue");
            //if (that.cvSkupinaTypDm === 10 && myDatZar.getFullYear() >= 2021) // ng_typdmNM (nehmotný)
            //    // TODO: majpol_p.odp.dan.typ_odp = typodp_none
            //    console.log("NOT IMPLEMENTED: checkTypOdp( ) - ODPIS")

            return true;
        }, // end function ( checkTypOdp )

        //--------------------------------------------------------------------------------

        setDobaUziti: function () {
            var that = this;

            console.log("NOT IMPLEMENTED: setDobaUziti( )")

            if (that.cvDebug) {
                console.log("CALL --- setDobaUziti() ---");
             //   console.log(" WATCH - cvSkupinaTypDm = [" + that.cvSkupinaTypDm + "]");
            } // end if

            // je-li záložka odpisů viditelná, rozhodují údaje na ní, pokud pracuje se s recordem
            // TODO: již mám napsáno v C# !
                       
        }, // end function ( setDobaUziti )

        //--------------------------------------------------------------------------------                                           

        // logování WATCH
        logWatch: function (watchName, watchVal) {
            console.log(" - @ " + watchName + ": [" + watchVal + "]");
        }, // end function ( logWatch )
       
        //--------------------------------------------------------------------------------

        validateDatUup: function (element, value) {
            var that = this;


            if (that.cvDebug) console.log("FUNCTION --- validateDatUup() ---");

            if (value) {
                
                if (that.cvDebug) {                    
                    console.log(" WATCH - value = [" + value + "]");
                    console.log(" WATCH - MAJ_DOK_PRIUUP = [" + that.MAJ_DOK_PRIUUP + "]");
                    console.log(" WATCH - MAJ_DOK_PRIUUPM = [" + that.MAJ_DOK_PRIUUPM + "]");
                    console.log(" WATCH - EkoParams.RokDen = [" + that.cvEkoRokDen + "]");
                    console.log(" WATCH - cvCurrent = [" + that.cvCurrent + "]");
                } // end if


                // (1) KO proti poslednímu odpisu
                if (value.getFullYear() * 100 + value.getMonth() < 3000) {

                    //this.stopping = true;
                    //this.errorType = "error";
                    //this.group = "error";
                    //this.message = "Datum UUP změny karty nesmí být nižší než období posledního odpisu";
                    that.dialogs.error("Datum UUP změny karty nesmí být nižší než období posledního odpisu");

                    return false;
                } // end if 


                // (2) kontrola zadaného roku - pokud nesedí datum UUP s rokem knihy - varovat dle příznaku povinnosti definice datumu UUP tak, aby období odpovídalo knize
                if (that.MAJ_DOK_PRIUUP) {

                    if (value && value.getFullYear() !== that.cvEkoRokDen) {

                        //this.stopping = true;
                        //this.errorType = "error";
                        //this.group = "error";
                        //this.message = "Datum uskutečnění účetního případu nesouhlasí s účetním obdobím knihy";

                        that.dialogs.error("Datum uskutečnění účetního případu nesouhlasí s účetním obdobím knihy");

                        // vymazat
                        //var myVal = $(this).gfield("clear");
                        element.gfield("clear");

                        return false;
                    } // end if (nesouhlasí ROK deníku)

                }
                else { // bez omezení povinnosti

                    if (value && value.getFullYear() !== that.cvEkoRokDen) {
                        //this.stopping = false;
                        //this.errorType = "warning";
                        //this.group = "warning";
                        //this.message = "POZOR - Datum uskutečnění účetního případu nesouhlasí s účetním obdobím knihy";
                        that.dialogs.warning("POZOR", "Datum uskutečnění účetního případu nesouhlasí s účetním obdobím knihy");
                    } // end if (nesouhlasí ROK deníku)

                } // end if-else (MAJ_DOK_PRIUUP)


                // (3) kontrola na definici měsíce a roku shodného se serverem
                if (that.MAJ_DOK_PRIUUPM && value) {
                    if (value.getFullYear() !== cvCurrent.getFullYear() || value.getMonth() !== cvCurrent.getMonth()) {

                        that.dialogs.confirm("Dotaz", "Období uskutečnění účetního případu neodpovídá aktuálnímu období. \nChcete skutečně pokračovat?")
                            .on("yes", function () {
                                // OK
                            })
                            .on("close", function () {
                                //this.stopping = true;
                                //this.errorType = "error";
                                //this.group = "error";
                                //this.message = "Období uskutečnění účetního případu musí odpovídat aktuálnímu období";
                                that.dialogs.error("Období uskutečnění účetního případu musí odpovídat aktuálnímu období");

                                // vymazat
                                //var myVal = $(this).gfield("clear");
                                element.gfield("clear");

                                return false;
                            });
                    }
                } // end if (MAJ_DOK_PRIUUPM)


                // (4) kontrola vůči datu zařazení
                // If ( majpol_p.maj.mat_akt = ng_majaktPor and df_dat_uup.date != DATETIME_Null and df_dat_uup.date < majpol_p.maj.dat_por ) or ( majpol_p.maj.mat_akt = ng_majaktEvi and df_dat_uup.date != DATETIME_Null and df_dat_uup.date < majpol_p.maj.dat_zar )
                if (value) {

                    var dat_porValue = that.findForms("FormIDs").findFields("df_dat_por").gfield("getValue");
                    var dat_zarValue = that.findForms("FormIDs").findFields("df_dat_zar").gfield("getValue");

                    // debug
                    if (that.cvDebug) {
                        console.log(" WATCH - dat_porValue = [" + dat_porValue + "]");
                        console.log(" WATCH - dat_zarValue = [" + dat_zarValue + "]");
                        console.log(" WATCH - mat_akt = [" + that.DetailDto.mat_akt + "]");
                    } // end if

                    var bDatPor = that.DetailDto.mat_akt === 18 && value < that.dat_porValue; // ng_majaktPor
                    var bDatZar = that.DetailDto.mat_akt === 20 && value < that.dat_zarValue; // ng_majaktEvi

                    if (bDatPor || bDatZar) {

                        //this.stopping = true;
                        //this.errorType = "error";
                        //this.group = "error";
                        //if (bDatPor) this.message = "Datum uskutečnění účetního případu je menší než datum pořízení majetku";
                        //if (bDatZar) this.message = "Datum uskutečnění účetního případu je menší než datum zařazení majetku";
                        if (bDatPor) that.dialogs.error("Datum uskutečnění účetního případu je menší než datum pořízení majetku");
                        if (bDatZar) that.dialogs.error("Datum uskutečnění účetního případu je menší než datum zařazení majetku");

                        // vymazat
                        //var myVal = $(this).gfield("clear");
                        element.gfield("clear");

                        return false;

                    } // end if (bDatPor || bDatZar)

                } // end if (value)
            }

        }, // end function ( validateDatUup )

        //--------------------------------------------------------------------------------        

        // Poznámky
        // validace cen by mohla být dost komplikovaná, protože do validátoru to spadne z df_cmj, df_pmj nebo df_c,
        // ale v skutečnosti je df_pmj a df_cmj skoro vždy needistovatelné, takže si nemusím dělat starost s cyklickou závislostí
        validateC: function (c) {

            var that = this;

            if (that.cvDebug) {
                console.log("FUNCTION --- validateC() ---");
                if (that.cvDebug) that.logWatch("c", c);
                //console.log(" WATCH - cvMajInitSkmUnqL = [" + that.cvMajInitSkmUnqL + "]");
                //console.log(" WATCH - cvMajInitLenSRezEc = [" + that.cvMajInitLenSRezEc + "]");
            } // end if

            

            // pokud je nastaven příznak účetního souboru, nulují se ceny
            if (that.DetailDto.tka === 20) that.nulovaniCen();


            // přepočet dle příznaků práce s DPH
            c = that._setCFlagDph(c, true, false);           
            //that.findForms("FormCeny").findFields("df_c").gfield("setValue", c);
            that.findForms("FormCeny").findFields("df_c").gfield("model", "apply", { c: c });
            if (that.cvDebug) that.logWatch("nová částka", c);

            // kontrola vůči hranicím pořizovacích cen
            // nebude se to sledovat u majetku určeného k prodeji (ng_devVlastniProdej, ng_devFkspProdej, ng_devBezuplatneNabytyProdej)
            var urcenKProdeji = that.DetailDto.dev === 12 || that.DetailDto.dev === 32 || that.DetailDto.dev === 42;
            if (!urcenKProdeji)
                that.call("CheckSkupinaDruhPc", {
                    skupinaId: that.DetailDto.skupina_id,                    
                    drhId: that.DetailDto.drh_id, // selektor "df_drh_id" mi to uložil rovnou do DTO
                    c: c,
                })
                    .then(function (result, content) {

                        if (that.cvDebug) console.log(" - SRV-CALL: CheckSkupinaDruhPc() = kontrola proběhla OK");


                        // vznik karty v důsledku rozdělení - cena nesmí být vyšší
                        if (that.cvMode === 32) // ng_modefrmInsertRozM
                        {
                            if (that.majbuff == null) {
                                that.dialogs.error("Není nastaven CV-objekt majbuff");
                                return;
                            } // end if

                            if (c > that.majbuff.c) that.dialogs.error("Účetní cena nesmí převýšit cenu rozdělovaného majetku: " + that.majbuff.c + " Kč");

                            // v případě rozdělování odpisované karty provede výpočet všech cen v poměru mezi účetní cenou nového a rozdělovaného majetku
                            // výpočet poměru a rozpočítání transferu, pořizovací ceny se provede bez ohledu na odpis
                            var l_c_pomer = 0;
                            if (that.majbuff.c !== 0) l_c_pomer = c / that.majbuff.c; // ošetření dělení nulou
                            that.findForms("FormCeny").findFields("df_c_dph_odpocet").gfield("setValue", majbuff.c_dph_odpocet * l_c_pomer);
                            that.findForms("FormCeny").findFields("df_c_dph").gfield("setValue", majbuff.c_dph * l_c_pomer);
                            that.findForms("FormCeny").findFields("df_c_c_dph").gfield("setValue", majbuff.c_c_dph * l_c_pomer);
                            that.findForms("FormCeny").findFields("df_c_dotace").gfield("setValue", majbuff.c_dotace * l_c_pomer);
                            that.findForms("FormCeny").findFields("df_c_poriz").gfield("setValue", majbuff.c_poriz * l_c_pomer);

                            // teď odpisy - vložím si údaje z bufferu do recordu
                            if (that.majbuff.priz_odp === 10) // ng_modeodpYes
                            {
                                // TODO: odpbuff
                                that.dialogs.error("NOT IMPLEMENTED odpbuff");
                            } // end if (odpisy)
                        } // end if (InsertRozM)


                        if (that.DetailDto.dev === 40 || // ng_devBezuplatneNabyty
                            that.DetailDto.dev === 30 || // ng_devFksp
                            that.DetailDto.dev === 20 || // ng_devNevlastni
                            that.DetailDto.dev === 10)  // ng_devVlastni
                        {
                            that.findForms("FormCeny").findFields("df_c_poriz").gfield("setValue", c); // df_c_poriz = df_c
                            that.findForms("FormOdpU").findFields("df_c_porU").gfield("setValue", c); // df_c_por = df_c
                            that.findForms("FormOdpD").findFields("df_c_porD").gfield("setValue", c);
                            that.findForms("FormOdpU").findFields("df_c_vstupU").gfield("setValue", c); // df_c_vstup = df_c
                            that.findForms("FormOdpD").findFields("df_c_vstupD").gfield("setValue", c);
                            // PSvoboda: "df_c_zust" je ale přiřazeno "df_c", tak tam dám rovnou "c"
                            var c_opr_u = that.findForms("FormOdpU").findFields("df_c_opravkaU").gfield("getValue");
                            var c_opr_d = that.findForms("FormOdpD").findFields("df_c_opravkaD").gfield("getValue");
                            that.findForms("FormOdpU").findFields("df_c_zustU").gfield("setValue", c - c_opr_u); // df_c_zust = df_c_vstup - df_c_opravka
                            that.findForms("FormOdpD").findFields("df_c_zustD").gfield("setValue", c - c_opr_d);

                        }
                        else if (urcenKProdeji)
                        {
                            // df_c_real = df_c
                            that.findForms("FormCeny").findFields("df_c_real").gfield("setValue", c);
                        } // end if-else


                        // přepočet celkové ceny s DPH, pokud je již zadána
                        that.validateDph();


                    })// end then
                    .fail(function (xhr, type, vobj) {
                        if (type === "exception") {
                            if (vobj.baseType === "Gordic.General.GNonFatalException") {
                                vobj.handled = true;
                                // TODO: nenastavíme třeba seterror na políčku df_c ?

                                that.dialogs.error(vobj.baseMessage);
                            }
                        }
                    }); // end fail
            
        }, // end function ( ValidateC )

        //--------------------------------------------------------------------------------

        // toto je kopie funkce v GMajMajPol !!! ale pro JavaScript
        _setCFlagDph: function (castka, prizDklCenyVcetneDph, prizDklBezOdpoctuDph) {
            var that = this;           

            var cmb = that.findForms("FormIDs").findFields("cmb_dan_typ").gfield("getValue");

            // kontroly
            if (that.cvDebug) {
                console.log("FUNCTION --- _setCFlagDph() ---");
                that.logWatch("castka", castka);
                that.logWatch("CenyVcetneDph", prizDklCenyVcetneDph);
                that.logWatch("BezOdpoctuDph", prizDklBezOdpoctuDph);
           //     that.logWatch("df_c_dph_odpocet", c_dph_odpocet);
          //      that.logWatch("cmb_dan_typ", cmb);
                if (cmb) that.logWatch("cmb_dan_typ.dan_typ", cmb.dan_typ);
                if (cmb) that.logWatch("cmb_dan_typ.dan_proc", cmb.dan_proc);
            } // end if
            if (!cmb) that.dialogs.error("Nebyla nalezena sazba DPH. \nKód chyby: 24534032");
            if (!cmb) return;

            var danTyp = cmb.dan_typ;
            var sazbaDane = cmb.dan_proc;

            //----------------------------------------------------

            // pokud je typ_dan = ng_dantypNone, vracím to samé
            if (danTyp === 0) return castka;

            // nejsem plátce => normálně zadávám cenu s DPH
            if (that.cvEkoPlatceDph === 0) {
                if (prizDklCenyVcetneDph) // c_with_dph
                    return castka;  // pokud dávám cenu s DPH, vracím to samé
                else
                    return castka * ((100 + sazbaDane) / 100);
            }
            else // jsem plátce
            {

                if (prizDklCenyVcetneDph) // c_with_dph
                    return castka * (100 / (100 + sazbaDane));
                else {
                    // pokud se neuplatňuje odpočet a je cena zadávána bez dph -přepočítá se
                    if (prizDklBezOdpoctuDph) // odpocet_dph_no
                        return castka * ((100 + sazbaDane) / 100);
                    else
                        return castka; // pokud dávám cenu BEZ(!) DPH, vracím to samé
                } // end if-else                

            } // end if-else (neplátce/plátce DPH)


        }, // end function ( _setCFlagDph )

        //--------------------------------------------------------------------------------

        nulovaniCen: function () {

            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- nulovaniCen() ---");
                            

            var myC = that.findForms("FormCeny").findFields("df_c").gfield("getValue");
            if (myC > 0) //that.dialogs.warning("Ocenění účetního souboru musí být nulové");
                that.dialogs.messageBox("Informace", "Ocenění účetního souboru musí být nulové", [GDlg.mbbOk], GDlg.mbiInfo);

            that.findForms("FormCeny").findFields("df_c").gfield("setValue", 0);
            that.findForms("FormCeny").findFields("df_c_dph").gfield("setValue", 0);
            that.findForms("FormCeny").findFields("df_c_dph_odpocet").gfield("setValue", 0);
            that.findForms("FormCeny").findFields("df_c_c_dph").gfield("setValue", 0);
            that.findForms("FormCeny").findFields("df_c_dotace").gfield("setValue", 0);
            that.findForms("FormCeny").findFields("df_c_poriz").gfield("setValue", 0);
            that.findForms("FormCeny").findFields("df_c_real").gfield("setValue", 0);
            that.findForms("FormCeny").findFields("df_c_opr_pol").gfield("setValue", 0);
            // 
            that.findForms("FormCeny").findFields("df_cmj_pro1").gfield("setValue", 0);
            that.findForms("FormCeny").findFields("df_cmj_pro2").gfield("setValue", 0);
            that.findForms("FormCeny").findFields("df_cmj_pro3").gfield("setValue", 0);

            // odpisy
            that.findForms("FormOdpU").findFields("df_c_porU").gfield("setValue", 0);
            that.findForms("FormOdpU").findFields("df_c_vstupU").gfield("setValue", 0);
            that.findForms("FormOdpU").findFields("df_c_zbytekU").gfield("setValue", 0);
            that.findForms("FormOdpU").findFields("df_c_opravkaU").gfield("setValue", 0);
            that.findForms("FormOdpU").findFields("df_c_zustU").gfield("setValue", 0);

            that.findForms("FormOdpD").findFields("df_c_porD").gfield("setValue", 0);
            that.findForms("FormOdpD").findFields("df_c_vstupD").gfield("setValue", 0);
            that.findForms("FormOdpD").findFields("df_c_zbytekD").gfield("setValue", 0);
            that.findForms("FormOdpD").findFields("df_c_opravkaD").gfield("setValue", 0);
            that.findForms("FormOdpD").findFields("df_c_zustD").gfield("setValue", 0);
            

            // cizí měna
            that.findForms("FormCeny").findFields("df_c_mena").gfield("setValue", 0);

            console.log("NOT IMPLEMENTED - nulování rekordu ODPISU !!! ")
            // nulování odpisového recordu
            /*
            that.DetailDto.odp.c_vstup_u = 0;
            that.DetailDto.odp.c_zust_u = 0;
            that.DetailDto.odp.c_opr_u = 0;
            that.DetailDto.odp.c_zbytek_u = 0;
            that.DetailDto.odp.c_sazba_odp_u = 0;

            that.DetailDto.odp.c_vstup_d = 0;
            that.DetailDto.odp.c_zust_d = 0;
            that.DetailDto.odp.c_opr_d = 0;
            that.DetailDto.odp.c_zbytek_d = 0;
            that.DetailDto.odp.c_sazba_odp_d = 0;
            */

        }, // end function ( nulovaniCen )

        //--------------------------------------------------------------------------------

        validateDph: function () {
            var that = this;
          

            if (that.cvDebug) console.log("FUNCTION --- validateDph() ---");


            var c_c_dph = that.findForms("FormCeny").findFields("df_c_c_dph").gfield("getValue");
            var c = that.findForms("FormCeny").findFields("df_c").gfield("getValue");
            var c_dph_odpocet = that.findForms("FormCeny").findFields("df_c_dph_odpocet").gfield("getValue");
            var c_dph = that.findForms("FormCeny").findFields("df_c_dph").gfield("getValue");
            var cmb = that.findForms("FormIDs").findFields("cmb_dan_typ").gfield("getValue");


            // kontroly
            if (that.cvDebug) {
                that.logWatch("df_c", c);
                that.logWatch("df_c_dph", c_dph);
                that.logWatch("df_c_c_dph", c_c_dph);
                that.logWatch("df_c_dph_odpocet", c_dph_odpocet);
                that.logWatch("cmb_dan_typ", cmb);
                if (cmb) that.logWatch("cmb_dan_typ.dan_typ", cmb.dan_typ);
            } // end if
            if (!cmb) that.dialogs.error("Nebyla nalezena sazba DPH. \nKód chyby: 24534031");
            if (!cmb) return;



            // (1/2)  kontrola případu, kdy je zadán odpočet - c_c_dph = c + c_dph nebo nebyl proveden odpočet - c_c_dph = c
            if (c_c_dph > 0 && c > 0) {

                // přidána podmínka, že součet účetní ceny df_c a odpočtu df_c_dph_odpocet je roven celkové ceně s DPH
                if (!(
                    c_c_dph === c_dph + c   // cena s DPH = účetní cena + DPH
                    ||
                    c_c_dph === c
                    ||
                    c_c_dph === c + c_dph_odpocet  // cena s DPH = účetní cena + odpočet DPH
                ))
                    that.dialogs.messageBox("Informace",
                        "Chybné zadání cen - hodnoty cen musí splňovat pravidlo:\n\n" +
                        " a) cena s DPH = účetní cena + DPH \n\nNEBO\n\n" +
                        " b) cena s DPH = účetní cena + odpočet DPH." +
                        "", [GDlg.mbbOk], GDlg.mbiInfo);

                // pokus o nastavení sazby - v případě odpočtu
                if (c_dph > 0 && c_c_dph === c + c_dph && cmb.dan_typ === 0) {
                    // použiju odhad - pokud je c_dph*100/c > 15 - pak je to normální sazba
                    if (c_dph * 100 / c > 15)
                        that.findForms("FormIDs").findFields("cmb_dan_typ").gfield("model", "apply", { dan_typ: 10 }); // základní
                    else
                        that.findForms("FormIDs").findFields("cmb_dan_typ").gfield("model", "apply", { dan_typ: 20 }); // snížená
                } // end if (nastavení sazby)                

            } // end if 


            // (2/2) odpočet nemůže být vyšší než DPH
            if (c_dph_odpocet > 0 && c_dph > 0 && c_dph_odpocet > c_dph) {

                that.dialogs.messageBox("Informace",
                    "Chybné zadání cen - odpočet DPH nemůže být vyšší než hodnota DPH.\n\n" +
                    "Odpočet DPH bude nastaven na hodnotu DPH.", [GDlg.mbbOk], GDlg.mbiInfo);

                that.findForms("FormCeny").findFields("df_c_dph_odpocet").gfield("setValue", c_dph);

            } // end if

        }, // end function ( validateDph ) 

        //--------------------------------------------------------------------------------

        validatePmj: function (pmj) {
            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- validatePmj() ---");

            
            var c = that.findForms("FormCeny").findFields("df_c").gfield("getValue");
            var isVisibleCMena = that.findForms("FormIDs").findFields("df_c_mena").gfield("option", "disabled") === false;            

            // kontroly
            if (that.cvDebug) {
                that.logWatch("pmj", pmj);
                that.logWatch("c", c);
                that.logWatch("isVisibleCMena", isVisibleCMena);
            } // end if


            // výpočet CMJ
            if (pmj > 0)
                that.findForms("FormCeny").findFields("df_cmj").gfield("setValue", c / pmj);


            // pokud je zadáván doklad v cizí měně a tato měna souhlasí s jednotkovu cenou v číselníku, předplní se nákupní cena            
            if (isVisibleCMena) // TODO> If isVisibleCMena and majpol_p.pol.mena = df_mat_cis.matcis.mena
            {
                var c_mena = that.findForms("FormCeny").findFields("df_c_mena").gfield("getValue");
                
                // pro množinovou kartu, pokud prozatím nebyla zadána
                //if (c_mena === 0)
                // Set df_c_mena = df_mat_cis.matcis.cmj_mena_nak * df_pmj
                //    that.findForms("FormCeny").findFields("df_c_mena").gfield("setValue", );

                // nastavím i prodejní cenu
                // Set df_cmj_pro1 = df_mat_cis.matcis.cmj_pro
                that.dialogs.alert("NOT IMPLEMENTED : df_mat_cis.matcis.cmj_mena_nak (+cmj_pro)");
            } // end if (isVisibleCMena)

        }, // end function (validatePmj)

        //--------------------------------------------------------------------------------
        
        validateCDotace: function (c_dotace, ctl) {

            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- validateCDotace() ---");

            // smažu výsledky předchozí validace            
            ctl.gfield("resetErrors");

            var c = that.findForms("FormCeny").findFields("df_c").gfield("getValue");
          //  var isVisibleCMena = that.findForms("FormIDs").findFields("df_c_mena").gfield("option", "disabled") === false;

            // kontroly
            if (that.cvDebug) {
                that.logWatch("c_dotace", c_dotace);
                that.logWatch("c", c);
                //that.logWatch("isVisibleCMena", isVisibleCMena);
            } // end if


            // *** tělo funkce ***

            // validace kladné hodnoty
            ctl.gfield("instance").validate(); // spustím validátor kladné hodnoty


            // v případě hromadné změny vypadnu
            if (that.cvMode === 6) return;


            // dotace nemůže být vyšší než c
            if (c_dotace > c) {
                //that.dialogs.error("Chybné zadání ceny. Transfer nesmí být vyšší než pořizovací cena");                
                ctl.gfield("setError", {
                    message: "Transfer nesmí být vyšší než pořizovací cena." // TODO: formátování ceny 
                });
                //  df_c_dotace = 0
                return;
            } // end if


            // porovnání cen v případě rozdělení majetku
            if (that.cvMode === 32) // ng_modefrmInsertRozM
            {
                if (that.majbuff == null) {
                    that.dialogs.error("Není nastaven CV-objekt majbuff");
                    return;
                } // end if

                var l_c_pomer = 0;
                if (that.majbuff.c_dotace > 0) l_c_pomer = c_dotace / that.majbuff.c_dotace; // nedělit nulou
                // definice druhého poměru 
                var l_c_pomer_2 = 0;
                if (that.majbuff.c > 0) l_c_pomer = c / that.majbuff.c; // nedělit nulou


                // (1)
                if (c_dotace >= that.majbuff.c_dotace) {
                    //that.dialogs.error("");                
                    ctl.gfield("setError", {
                        message: "Částka dotace nesmí převýšit částku dotace rozdělovaného majetku." // TODO: formátování ceny
                    });
                    //  df_c_dotace = 0
                    return;
                } // end if


                // (2) kontrola poklesu pořizovací ceny pod transfer u rozdělované karty
                if (that.majbuff.c_dotace - c_dotace > majbuff.c - c) {
                    //that.dialogs.error("");                
                    ctl.gfield("setError", {
                        message: "Částka dotace rozdělovaného majetku nesmí převýšit jeho účetní cenu." // TODO: formátování ceny
                    });
                    //  df_c_dotace = majbuff.c_dotace - majbuff.c + df_c
                    return;
                } // end if


                // přepočet údajů závislých na transferu
                if (that.majbuff.priz_odp === 10) // ng_modeodpYes
                {
                    // TODO: odpbuff
                    that.dialogs.error("NOT IMPLEMENTED odpbuff");
                } // end if

            } // end if (ng_modefrmInsertRozM)


            // kontrola vůči rozpisu transferu na poskytovatele
            if (that.cvDebug) {
                console.log(" - SRV-CALL: SumaRozpisuTransferu()");
                that.logWatch("inv_cis", that.DetailDto.inv_cis);
            } // end if (debug)

            that.call("SumaRozpisuTransferu", { invCis: that.DetailDto.inv_cis })
                .then(function (result, content) {

                    if (that.cvDebug) that.logWatch("rozpis transferu", result);

                    if (c_dotace < result) {
                        that.dialogs.error("Chybné zadání ceny. Transfer nesmí klesnou pod hodnotu rozpisu na poskytovatele");
                        ctl.gfield("setError", {
                            message: "Transfer nesmí být nižší než rozpis na poskytovatele."
                        });
                    } // end if

                }) // end then  

        }, // end function (validateCDotace)

        //--------------------------------------------------------------------------------
        
        validateCMena: function (pmj) {
            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- validateCMena() ---");

            // pokud je nastaven příznak účetního souboru, nulují se ceny
            if (that.DetailDto.tka === 20) // ng_tkaSoubor
                that.nulovaniCen();


            // přepočet na Kč podle zadaného kursu
            if (that.argMajpol.pol.m_kurz > 0) {
                //  df_c = df_c_mena * df_kurz / majpol_p.pol.m_kurz
                that.validateC(c);
            } // end if

        }, // end function (validateCMena)

        //--------------------------------------------------------------------------------
        
        jsTridaChange: function () {
            // TODO !  setInvCisMax( 2 );
        },
        // end functions ( df_trida ) ------------------------------------------------------

        jsStrediskoChange: function () {
            // TODO !  natsavení df_objekt, df_ixs_orj, df_budova_kod, df_segment_kod, df_mistnost_kod
        },
        // end functions ( df_stredisko ) ------------------------------------------------------

        jsBudovaKodChange: function () {
            // TODO !  nastavení kód budovy do segmentu a místnosti
        },
        // end functions ( df_budova_kod ) ------------------------------------------------------

        jsSegmentKodChange: function () {
            // TODO !  nastavení kódu místnosti
        },
        // end functions ( df_segment_kod ) ------------------------------------------------------

        jsMistnostKodChange: function () {
            // TODO !  nastavení střediska, objektu, IXS_ORJ při 'maj_rad_topmmb'
        },
        // end functions ( df_mistnost_kod ) ------------------------------------------------------

        jsIxsOrjChange: function () {
            // TODO !  nastavení MMB
        },
        // end functions ( df_ixs_orj ) ------------------------------------------------------

        jsObjektChange: function () {
            // TODO !   Set changeTopMmb = TRUE
        },
        // end functions ( df_objekt ) ------------------------------------------------------
        

        jsSkOdpChange: function () {
            // TODO: changeSkupinaOdp()
        },
        // end functions ( df_skupina_odp )
        
        

        //======================================================================================

        //======================================================================================
        



        LoadDetail: function (jsonParams) {
            var l_oOldContent = this;          
            new GContent(l_oOldContent.className, l_oOldContent.contentDiv, l_oOldContent.userSettings).load(jsonParams);
        }, // end function
       


        onDetailBuilderInit: function (builder) {

            console.log("FUNCTION GMajKarta.onDetailBuilderInit()");

            var that = this;
            // V této funkci je možné ovlivňovat komponenty, s kterými builder bude pracovat.
            
           // Zaregistrovat vlastní komponentu do builderu.
           builder.withComponent("mainMenu",
                {

                    actions: [    // akce pro menubar                    
                        {
                            name: "actSave", caption: "jres:24534524",   //RC 24534524 : Uložit
                            tooltip: "jres:24534078",//RC 24534078 : Uložit změny
                            icon: "gi-save", run: function () {
                                that.saveKarta().then(() => {

                                    if (that.cvDebug) console.log("Metoda saveKarta ÚSPĚŠNÁ.")
                                    // TEST
                                    that.logWatch("skp", that.DetailDto.skp);                                

                                    that.tryClose(that.DetailDto);  // pošlu CLOSE pouze pokud projde metoda saveKarta() - to nemusí jít do DB!

                                }); 
                            }
                        },
                        { name: "actDI", caption: "jres:24534247", icon: "gi-label", run: function () { ; } },  //RC 24534247 : DI
                        { name: "actTypKarty", caption: "jres:24534088", icon: "gi-folderty", tooltip: "Změna typu karty na soubor majetku", run: function () { ; } },  //RC 24534088 : Typ karty
                        { name: "actPrvky", caption: "jres:24534248", icon: "gi-apps", run: function () { ; } },  //RC 24534248 : Prvky
                        // { name: "actPohyby", caption: "jres:24534008", icon: "gi-list", run: function () { ; } },  //RC 24534008 : Pohyby
                       // { name: "actHistorie", caption: "jres:24534249", icon: "gi-history", run: function () { ; } },  //RC 24534249 : Historie
                       // { name: "actReservace", caption: "jres:24534250", icon: "gi-register", run: function () { ; } },  //RC 24534250 : Reservace
                        { name: "actPoznBlok", caption: "jres:24534251", icon: "gi-paper2", tooltip: "Vložení evidenční karty do poznámkového bloku", run: function () { ; } },  //RC 24534251 : Vložit do PB
                        { name: "actWwwMap", caption: "mapy.cz", icon: "gi-gps", run: function () { that.jsShowLocationOnMapyCz(); } }, // tlačítko u GPS
                        { name: "actGis", caption: "jres:24534246", icon: "gi-gps", tooltip:"Zobrazení pozice majetku v GIS", run: function () { that.jsCallGis(); } },  //RC 24534246 : Mapa
                    ],

                    menuBar: [
                     {
                            id: "menuAgenda", caption: "jres:24534057", type: "static", children: [ //RC 24534057 : Agenda
                             { id: "menuSave", action: "actSave", favorite: true },
                             { id: "menuDI", action: "actDI", favorite: true },
                             { id: "menuTypKarty", action: "actTypKarty", favorite: true },
                             { id: "menuPrvky", action: "actPrvky", favorite: true },
                             //   { id: "menuPohyby", action: "actPohyby", favorite: true },
                             //   { id: "menuHistorie", action: "actHistorie", favorite: true },
                               // { id: "menuReservace", action: "actReservace", favorite: true },
                             { id: "menuPoznBlok", action: "actPoznBlok", favorite: true },
                             { id: "menuGis", action: "actGis", favorite: true },
                             { id: "menuWwwMap", action: "actWwwMap", favorite: false }, // podle GPS
                           
                         ]
                     }
                    ],

                    statusBar: [
                        {
                            id: "df_mat_akt",
                            "caption": that.cvMatAktTxt,
                            "type": "static",
                            "customClass": "g-state-text g-state-stav"
                        },    
                        {
                            id: "sep1", "caption": that.cvSeparator, "type": "static", "customClass": "g-state-text"
                        },   
                        {
                            id: "df_inv_in",
                            "caption": that.cvInvInTxt,
                            "type": "static",
                            "customClass": "g-state-text g-state-important"  // růžová
                        }, 
                        {
                            id: "sep2", "caption": that.cvSeparator, "type": "static", "customClass": "g-state-text"
                        },   
                        {
                            id: "df_tev",
                            "caption": "jres:24534090" + ": " + that.DetailDto.tev_zkr, //that.cvTevTxt,
                            "type": "static",
                            "customClass": "g-state-text"
                        },  
                        {
                            id: "sep3", "caption": that.cvSeparator, "type": "static", "customClass": "g-state-text"
                        },   
                        {
                            id: "df_dev",
                            "caption": "jres:24534027" + ": " + that.DetailDto.dev_zkr, //that.cvDevTxt,
                            "type": "static",
                            "customClass": "g-state-text"
                        },  
                        {
                            id: "sep4", "caption": that.cvSeparator, "type": "static", "customClass": "g-state-text"
                        },   
                        {
                            id: "df_tka",
                            "caption": that.cvTkaTxt, // TKA je převedeno ToUpper()
                            "type": "static",
                            "customClass": "g-state-text g-state-info"      // modrá
                        },
                        {
                            id: "sep5", "caption": that.cvSeparator, "type": "static", "customClass": "g-state-text"
                        },   
                        {
                            id: "df_zev",
                            "caption": "jres:24534528" + ": " + that.DetailDto.zev_zkr, // that.cvZevTxt,
                            "type": "static",
                            "customClass": "g-state-text"
                        },  
                        {
                            id: "sep6", "caption": that.cvSeparator, "type": "static", "customClass": "g-state-text"
                        },   
                        {
                            id: "df_typ_soubor",
                            "caption": that.cvTypSoubTxt,
                            "type": "static",
                            "customClass": "g-state-text g-state-info"      // modrá
                        },  
                        {
                            id: "sep7", "caption": that.cvSeparator, "type": "static", "customClass": "g-state-text"
                        },   
                        {
                            id: "df_tisk_eti",
                            "caption": that.cvTiskEtiTxt,
                            "type": "static",
                            "customClass": "g-state-text g-state-inactive"   // šedá
                        },  
                        {
                            id: "sep8", "caption": that.cvSeparator, "type": "static", "customClass": "g-state-text"
                        },   
                        {
                            id: "df_di",
                            "caption": that.cvDITxt,
                            "type": "static",
                            "customClass": "g-state-text g-state-warning"   // oranžová
                        },  
                    ]
                });
                                
           
        }, // end function (onDetailBuilderInit)


        onDetailBuilderBuild: function(builder){
            console.log("FUNCTION GMajKarta.onDetailBuilderBuild()");

            // V této metodě už builder sjednotil všechny definice z komponent.
            // Je možné je upravovat v závislosti na ostatních - např. řadit.
                             

        }, // end - onDetailBuilderBuild()


    }, {extendIntellisense: GContent});
})(jQuery);