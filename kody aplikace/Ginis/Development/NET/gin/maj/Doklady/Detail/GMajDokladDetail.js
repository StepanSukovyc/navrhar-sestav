(function ($) {
    "use strict";
    namespace("Gordic.Maj.WebClient.GMajDokladDetail", {
                
       
        onContentReady: function () {

            var that = this;
            if (that.cvDebug) console.log("GMajDokladDetail.onContentReady() - START");

            var colWidthIcon = 18;
            var bTblPolMatCisChanged = false;
            // mat_cis.matcis._putZev( )
            var nTblPolZev = 0;   // ng_zevNone     cfc_matCis.init( )
            var nTblPolSUnq = 0; // skupina_zkr.skupina.s_unique    cfc_MajSkupinaId.init( )
            var bTblPolNoExistKrt = false;
            var majpol = {}; // DTO
            var init_dph_priz = false; // příznak, že uživatel přenastavil "cb_with_dph" nebo "cb_odpocet_dph_no"
            var bTblPolFocusInvCis = false;

            //===  MAJETKOVÝ DOKLAD  =================================================================

            //gformrow(""). //Pravidla pro prázdné řádky: 1) místo zneviditelněných polí prázdný řádek 2) sekce vedle sebe stejný počet řádků. (graficky vyrovnané - měl by se postarat formulářový systém)


            $("<div data-break-L='900'>").appendTo(this.element).gform("setup", { name:"FormDoklad", layoutDescriptor: "L2M2S1" })
                //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1
                .gtab({ title: "jres:24534463", opened: true })  //RC 24534463 : Majetkový doklad
                .gformsection("create", "jres:24534450") //RC 24534450 : Údaje pohybu
                .gformrow("addFieldsRow", "jres:24534471").gselectbox(Gordic.Prefabs.Select.majspoh(), { //RC 24534471 : Kód a název pohybu
                    name: "df_kod_poh",
                    model: "model.kod_poh=value.kod_poh;model.dev=value.dev;model.typ_dok=value.typ_dok",
                    disabled: that.df_kod_poh.Edit === false,
                    tooltip: "jres:24534472", //RC 24534472 : Určení kódu majetkového pohybu v rámci dokladu
                    serverFilters: {
                        typ_dok: new Gordic.Forms.Dependency("df_typ_dok", "typ_dok", true, false, this),    //[name masterpolicka],[nazev klice],[ma-li byt zakazane pokud je master prazdny]
                        typ_pristup: 10,                        
                    },
                    flag: Gordic.Prefabs.Field.Flags.required,                    
                    change: function (ev, changeObj) { // GM_Change (výběr F4), {  frmMUDPor.changeKodPoh( )   }

                        // výběrem kódu se ovlivní: DEV, příznak STORNO pohybu, povinnost PS a případně filtr NKS cíle
                        
                        if (changeObj.value) { // mám k dispozici nějaký záznam?

                            if (that.DetailDto.pocet_pol == 0)
                                that.changeKodPoh(changeObj); // lze změnit, jinak je třeba provést test
                            else that.call("CheckChangeKodPoh", { ixp: that.DetailDto.ixp, kodPohNew: changeObj.value.kod_poh, pocetPol: that.DetailDto.pocet_pol })
                                .done(function (retVal, content) { that.changeKodPoh(changeObj); }); // end done

                        } // end if (obj.value)
                    } // end changeKodPoh( )
                })
                .gformrow("addFieldsRow", "jres:24534045").gselectbox(Gordic.Prefabs.Select.majcdem(), {   //RC 24534045 : Druh evidence  
                    name: "df_dev",
                    model: "model.dev=value.dev",
                    disabled: true
                })
                .gformrow("addFieldsRow", "jres:24534284" + // Datum UÚP
                    "/" + "jres:24534383", ["w-6", "w-6"]).gdatebox({  //RC 24534383 : Datum ZP
                        name: "df_dat_uup",
                        model: "dat_uup",
                        valueType: "date",
                        tooltip: "jres:24534474", //RC 24534474 : Určení datumu uskutečnění účetního případu
                        flag: Gordic.Prefabs.Field.Flags.required,
                        disabled: that.df_dat_uup.Edit === false,
                        change: function (ev, changeObj) { // GM_Change
                            
                            if (changeObj.value && that.df_dat_uup.Edit) {

                                // frmMUDPor.changeDatUup( ) - stejné kontroly jsou již implementovány na serveru

                                if (that.cvDebug) {
                                    console.log("EVENT df_dat_uup.change()");
                                    console.log("- value=" + changeObj.value);
                                    console.log("- maj_dok_priuup=" + that.maj_dok_priuup);
                                    console.log("- maj_dok_priuupm=" + that.maj_dok_priuupm);
                                } // end log
                            

                                //---------
                                // kontroly 
                                //---------
                                //var proceed = true;

                                // KO zadaného roku - zda sedí datum UUP s rokem knihy

                                if (that.cvEkoRokDen != changeObj.value.getFullYear()) {
                                    // rozhodnu zda chyba nebo jen upozornění
                                    if (that.maj_dok_priuup)
                                        // TODO: toto do validátoru, aby se nedalo pokračovat!
                                        that.dialogs.alert("jres:24534574"); //RC 24534574 : Datum uskutečnění účetního případu nesouhlasí s účetním obdobím knihy.
                                    else
                                        that.dialogs.warning("jres:24534574"); //RC 24534574 : Datum uskutečnění účetního případu nesouhlasí s účetním obdobím knihy.
                                } // end if (nesouhlasí rok knihy)

                                
                                // KO na definici měsíce a roku shodného se serverem
                                
                                if (that.maj_dok_priuupm) {                                    
                                    if (changeObj.value.getMonth() != that.cvNowYear || changeObj.value.getFullYear() != that.cvNowMonth)
                                        that.dialogs.alert("jres:24534575"); //RC 24534575 : Období uskutečnění účetního případu neodpovídá aktuálnímu období.
                                } // end if (nesouhlasí s aktuálním obdobím ROK-MES)


                                // načtení příznaku o plátcovství DPH

                                that.call("GetDph", { datumUup: changeObj.value })
                                    .done(function (platceDph, content) {

                                        if (that.cvDebug) console.log(" - cvEkoDphPlatce (EkoInit.PlatceDph):" + platceDph);
                                        that.cvEkoDphPlatce = platceDph; // musím si uložit EkoInit.PlatceDph do CV

                                        // řízení zobrazení sloupců závislých na DPH dle příznaku plátcovství
                                        //---------------------------
                                        // frmMUDPor.setVisibleDph( )
                                        //---------------------------
                                        // Call tblPol.setVisibleColDph( ) - to NEVÍM jestli v JS takto půjde...                                        
                                        // $tblPol.ggrid("refresh");

                                        if (that.DetailDto.mena == 0) {
                                            if (platceDph == 0) // ng_platcedphNo 
                                            {
                                                //that.kpis.df_c_c_dph.primaryText = "9999";
                                                //that.kpis.df_c_c_dph.update();
                                                that.kpis.df_c_c_dph.visible = false;
                                                that.kpis.df_c_c_dph.update();
                                            }
                                            else {
                                                that.kpis.df_c_c_dph.visible = true;
                                                that.kpis.df_c_c_dph.update();
                                            } // end if-else (plátce / neplátce)

                                            that.setCWithDph(); // nastavení kombáčů DPH
                                        
                                        } // end if (mena = 0)
                                        // <<<<<<<<<<<<<<<<<< setVisibleDph( ) END


                                        // kontrola datumu zdanitelného plnění
                                        // již provedeno v this.call("GetDph")


                                        // přiřazení do dat_zdan
                                        that.findFields("df_dat_zdan").gfield("setValue", changeObj.value)


                                        // TODO: kontrola vůči datu UUP primárního dokladu
                                        //var datUupIxpPrim = that.element.findFields("df_ps_fak").gfield("getValue").dat_uup;
                                        //if (datUupIxpPrim && datUupIxpPrim > changeObj.value)
                                            //that.dialogs.messageBox("jres:24534482", //RC 24534482 : Informace
                                            //    "jres:24534576");  //RC 24534576 : Datum UUP primárního dokladu je vyšší než datum UUP majetkového dokladu.


                                        // TODO: inicializace UUP do nákladových položek kvůli výběru akce
                                        // df_naklad_1._setRok( SalDateYear( df_dat_uup.date ) )


                                        that.setMena();

                                    }); // end GetDph().done                                                       

                            } // end if (changeObj)
                        } // end change
                    })
                .next().gdatebox({
                    name: "df_dat_zdan",
                    model: "dat_zdan",
                    tooltip: "jres:24534475", //RC 24534475 : Určení datumu zdanitelného plnění/období odpisu
                    flag: Gordic.Prefabs.Field.Flags.required,
                    disabled: that.df_dat_zdan.Edit === false                    
                })
                .gformrow("addFieldsRow", that.df_id_top.Label, ["w-6", "w-6"]).gselectbox(Gordic.Prefabs.Select.nksEvsKomp(), {
                    name: "df_id_top",
                    model: "id_top",
                    serverFilters: {
                        typ_okruh: 0, // ng_typokruhInter - pouze interní pohled na EVS, RW
                        typ_pristup: 10, // ng_typpristupRw
                        typ_idtop: that.cvMajInitIdTop
                    },  
                    tooltip: "jres:24534491", //RC 24534491 : Určení střediska výdejce, příjemce
                    disabled: that.df_id_top.Edit === false
                })
                .next().gselectbox(Gordic.Prefabs.Select.nksEvsKomp(), {
                    name: "df_nks_ext_pri",
                    modelDefaults: { item: this.cvNksExtPri },
                    serverFilters: {
                        typ_okruh: 0, // ng_typokruhInter - pouze interní
                        typ_pristup: 10, // ng_typpristupRw
                        typ_idtop: that.cvMajInitIdTop
                    },
                    tooltip: "jres:24534494", //RC 24534494 : Určení NS příjemce
                    disabled: that.df_nks_ext_pri.Edit === false
                })
                .gformrow("addFieldsRow", "jres:24534058", ["w-4", "w-8"]).gstringbox({   //RC 24534058 : Inventární číslo
                    name: "df_inv_cis_sou",
                    model: "inv_cis_soub",
                    tooltip: "jres:24534500", //RC 24534500 : Určení inventárního čísla souboru majetku
                    disabled: that.df_inv_cis_sou.Edit === false
                    // TODO: SelectBox! výběr karty MAJ (např. souboru)
                })
                .next().gstringbox({ name: "df_inv_cis_txt", model: "nazev_maj", disabled: true })
                .gformrow("addFieldsRow", "jres:24534467", ["w-6", "w-6"]).gdatebox({  //RC 24534467 : Termín vrácení a typ vydlužitele
                    name: "df_dat_termin",
                    model: "dat_termin",
                    tooltip: "jres:24534493", //RC 24534493 : Určení termínu vrácení majetku
                    disabled: that.df_dat_termin.Edit === false
                })
                .next().gselectbox({
                    name: "cmb_res_typ",
                    model: "res_typ_new = id",
                    dropdown: true,
                    data: new Gordic.Data.View([
                        { nazev: "jres:24534497", id: 10 },   //RC 24534497 : Referent
                        { nazev: "jres:24534153", id: 20 }],  //RC 24534153 : NKS  // TODO: toto je zjevně zavádějící v případě režimu EVS (id_top=EVS)
                        { key: "id" }),
                    emptyValue: { id: 10 },
                    initialValue: { nazev: "jres:24534497", id: 10 },
                    itemTemplate: "{nazev}",
                    disabled: that.cmb_res_typ.Edit === false,
                    change: function (ev, obj) {
                        that.setHeaderViewResI(that);                        
                    } // end change
                })

                .gformsection("create", "jres:24534454")	                 //RC 24534454 : Externí vazby

                // TODO: výběr vazby PS - pb_bind_doc_detail + showBindDocDetail( )
                .gformrow("addFieldsRow", "jres:24534035").gstringbox({   //RC 24534035 : Párovací symbol
                    name: "df_ps_fak",
                    model: "ps_fak",                   
                    tooltip: "jres:24534495", //RC 24534495 : Určení párovacího symbolu
                    validators: [ // frmMUDPor.setPovPs( )
                        new Gordic.Validators.Length({ max: that.maj_dok_lenps, message: "jres:24534496" }), //RC 24534496 : Nepovolená délka párovací symbolu
                        // TODO: cdf_SetPs._checkFormat( ) - anebo až na serveru?? to je blbý, bude asi třeba obojí
                        new Gordic.Validators.Base(
                            {
                                stopping: true,
                                errorType: "error",
                                validate: function (value, source) {

                                    if (that.cvDebug) console.log("df_ps_fak.Validate(): maj_dok_prizps=" + that.maj_dok_prizps);

                                    // PS je povinný v závislosti na maj.pohybu
                                    var povPS = that.element.findFields("df_kod_poh").gfield("getValue").priz_ps;

                                    if (that.cvDebug) console.log("df_ps_fak.Validate(): priz_ps=" + povPS);

                                    if (povPS === 1 && that.maj_dok_prizps === 1)
                                        return false; // povinné
                                    else
                                        return true;

                                }, getMessage: function () { return "Párovací symbol je povinný."; } //RC 26600744 : Požadovaná částka nesmí překročit plánovanou částku. Částka bude snížena na maximálně možnou.

                            })
                    ],
                    // TODO: ty formáty budou složitějšéí, viz. cdf_SetPs._checkFormat( )
                    // TODO: obsluha changePsFak( ) a dalších událostí nad df_ps_fak                    
                    // TODO: obsluha anyEdit
                    disabled: that.df_ps_fak.Edit === false
                })
                .gformrow("addFieldsRow", that.df_esu_txt.Label).gselectbox(Gordic.Prefabs.Select.ginsesu(), {
                    name: "df_esu_txt",
                    model: "model.ixs_esu_ext=value.ixs_esu",
                    itemTemplate: "{nazev:trim:encode}",
                    tooltip: "jres:24534498", //RC 24534498 : Určení dodavatele, odběratele
                    disabled: that.df_esu_txt.Edit === false,
                    validators: [ // TODO: JAK? povinné u typ_dok = 360, 362, 100, 0/s_prij, 330, 335, 340, 345
                        //new Gordic.Validators.Base(
                        //    {
                        //        stopping: true,
                        //        errorType: "error",
                        //        validate: function (value, source) {
                        //            console.log("ESU=" + value.ixs_esu);
                        //            return df_esu_txt.Required;
                        //        }, getMessage: function () { return "TEST!!!"; }

                        //    })
                    ]
                })
                .gformrow("addFieldsRow", "jres:24534502", ["w-4", "w-8"]).gdatebox({ //RC 24534502 : Datum a číslo dokladu
                    valueType: "date",
                    name: "df_dat_ext",
                    model: "dat_ext",
                    tooltip: "jres:24534503", //RC 24534503 : Určení datumu vystavení dokladu dodavatele, odběratele, výdejce, příjemce
                    disabled: that.df_ac_ext.Edit === false, // stejné jako df_ac_ext
                    validators: [new Gordic.Validators.Required(), new Gordic.Validators.Range({ min: new Date(1920, 1, 1).getTime(), max: new Date(2100, 1, 1).getTime(), message: "Rok zadaného data má nepovolenou hodnotu" })], // je-li přístupné, pak je povinné
                    //flag: Gordic.Prefabs.Field.Flags.required,
                    change: function (ev, changeObj) { // changeDatExt( )
                        // pouze KO min.data 1920 - zajištěno na serveru, zatím nevím jak validovat rozsah datumu
                    } // end-change
                }) // stejné jako AC_EXT
                .next().gstringbox({
                    name: "df_ac_ext",
                    model: "ac_ext",
                    tooltip: "jres:24534501", //RC 24534501 : Určení čísla dokladu dodavatele, odběratele, výdejce, příjemce
                    disabled: that.df_ac_ext.Edit === false,
                    validators: [
                        new Gordic.Validators.Base(
                            {
                                stopping: true,
                                errorType: "error",
                                validate: function (value, source) {
                                    var myTypDok = that.element.findFields("df_typ_dok").gfield("getValue").typ_dok;

                                    // a) povinné
                                    if ((myTypDok === 330 || myTypDok === 335 || myTypDok === 340 || myTypDok === 345) // zápůjčky, opravy a vrácení z nich
                                        && !value) return false;
                                    // b) někdy povinné
                                    if (myTypDok === 120 // PP - při majpid.priz_tunel není povinné, jinak ANO
                                        && (that.DetailDto.priz_tunel === false)  // při majpid.priz_tunel není povinné
                                        && !value) return false;

                                    return true;
                                }, getMessage: function () { return "Zadejte číslo dokladu"; }

                            })
                    ]
                })
                .gformrow("addFieldsRow") // prázdno
                // a) NS nebo REF - podle typu vydlužitele, výdejce
                .gformrow("addFieldsRow", that.df_nks_ext.Label).gselectbox(Gordic.Prefabs.Select.nksEvsKomp(), {  //RC 24534049 : Nákladové středisko
                    name: "df_nks_ext",
                    model: "model.nks_ext=value.item",
                    serverFilters: {
                        typ_okruh: that.cvTypOkruh, // podle zvoleného typ_dok
                        typ_pristup: -1, // ng_typpristupNone
                        typ_idtop: that.cvMajInitIdTop,
                        // df_nks_ext._putNksCil( df_kod_poh.majpoh.nks_cil )
                        nks_cil: new Gordic.Forms.Dependency("df_kod_poh", "nks_cil", true, function () { return {}; }, this.element)                        
                    },
                    tooltip: "jres:24534491", //RC 24534491 : Určení střediska výdejce, příjemce
                    validators: [
                        new Gordic.Validators.Base( // povinné u interní zápůjčky
                            {
                                stopping: true,
                                errorType: "error",
                                validate: function (value, source) {
                                    var myTypDok = that.element.findFields("df_typ_dok").gfield("getValue").typ_dok;                                    
                                    if (myTypDok === 332 && !value) return false;                                    
                                    return true;
                                }, getMessage: function () { return "Povinná hodnota"; }

                            })
                    ],
                    disabled: that.df_nks_ext.Edit === false
                    // TODO: GM_Change
                })
                // b) NS nebo REF - podle typu vydlužitele, výdejce
                .gformrow("addFieldsRow", that.df_ixs_ref.Label).gselectbox(Gordic.Prefabs.Select.ginsref(), {  //RC 24534497 : Referent
                    name: "df_ixs_ref",
                    model: "model.ixs_ref=value.ixs_ref",
                    disabled: that.df_ixs_ref.Edit === false,
                    //disabled: function (ev, data2) { return that.df_ixs_ref.Edit === false; },
                    change: function (ev, obj) {
                        // TODO: setEnableObject( )
                    } // end-change
                })


                //--------------------------------------------------------------------------------------------------------------
                .gformsection("create", "jres:24534517") //RC 24534517 : Korekce cen
                .gformrow("addFieldsRow", "jres:24534519", ["w-6", "w-6"]).gselectbox(Gordic.Prefabs.Select.ekocmen(),{ //RC 24534519 : Měna a kurz
                    name: "df_mena", // TODO: on change  - setMena( )
                    model: "model.mena=value.mena",
                    flag: Gordic.Prefabs.Field.Flags.required,
                    disabled: that.df_mena.Edit === false
                })
                .next().gnumberbox({
                    name: "df_kurz",
                    model: "kurz",
                    decimals: 3,
                    flag: Gordic.Prefabs.Field.Flags.required,
                    disabled: that.df_mena.Edit === false
                })
                .gformrow("addFieldsRow", "jres:24534520").gnumberbox({ //RC 24534520 : Změna ceny dokladu celkem
                    name: "df_c_c_zmena",
                    tooltip: "jres:24534521", //RC 24534521 : Definice celkové částky určené ke změně účetní ceny majetku vedeného primárním dokladem
                    model: "c_c_zmena",
                    disabled: that.df_c_c_zmena.Edit === false
                })
               
                //--------------------------------------------------------------------------------------------------------------                
                .gformsection("create", "jres:24534518") //RC 24534518 : Údaje DPH
                .gformrow("addFieldsRow", "", ["w-6", "w-6"]) 
                .gcheck({
                    name: "cb_with_dph",
                    label: "jres:24534470",   //RC 24534470 : Cena s DPH
                    disabled: that.cb_with_dph.Edit === false, // přístupné pouze při P / PNKS
                    initialValue: that.cb_with_dph.Checked,
                    change: function (ev, changeObj) {                                        
                        that.init_dph_priz = true; // nastavím, že uživatel do toho sáhl
                    }
                })
                .next().gcheck({
                    name: "cb_odpocet_dph_no",
                    label: "jres:24534469",   //RC 24534469 : Není uplatněn odpočet DPH
                    disabled: that.cb_odpocet_dph_no.Edit === false,
                    initialValue: that.cb_odpocet_dph_no.Checked,
                    change: function (ev, changeObj) {
                        that.init_dph_priz = true; // nastavím, že uživatel do toho sáhl
                    }
                })                

                //--------------------------------------------------------------------------------------------------------------
                .gformsection("create", "jres:24534464") //RC 24534464 : Rozšířený detail
                .gformrow("addFieldsRow", that.df_naklad_1.Label).gstringbox({ name: "df_naklad_1", model: "naklad_1", disabled: that.df_naklad_1.Edit === false })
                .gformrow("addFieldsRow", that.df_naklad_2.Label).gstringbox({ name: "df_naklad_2", model: "naklad_2", disabled: that.df_naklad_2.Edit === false })
                .gformrow("addFieldsRow", that.df_naklad_3.Label).gstringbox({ name: "df_naklad_3", model: "naklad_3", disabled: that.df_naklad_3.Edit === false });


            // === SPOTŘEBA ==========================================================================
            // zobrazí se pouze u typ_dok=201 (LV  - likvidace/vyřazení) 
            $("<div data-break-L='900'>").appendTo(this.element).gform("setup", { name: "FormSpotreba", layoutDescriptor: "L2M2S1" })
                .gtab({ title: "jres:24534346", opened: that.DetailDto.typ_dok === 201 }) //RC 24534346 : Spotřeba

                .gformsection("create", "")
                .gformrow("addFieldsRow", "jres:24534049").gselectbox(Gordic.Prefabs.Select.ekosnks(), {   //RC 24534049 : Nákladové středisko
                    name: "nks_ext_nak", // TODO: NEPOUŽITO! - to je asi speciální df_nks_ext pro případ spotřeby?
                    model: "model.nks_ext=value.nks",
                    modelDefaults: { ico: this.cvEkoIco },
                    disabled: that.df_ixs_orj_nak.Edit === false  // stejné jako df_ixs_orj_nak
                })
                .gformrow("addFieldsRow", that.df_stredisko.Label).gselectbox(Gordic.Prefabs.Select.ekosstr(), {   //RC 24534209 : Evidenční středisko
                    name: "df_stredisko",
                    serverFilters: { typ_pristup: 10 }, // ng_typpristupRw  inicializace typu přístupu - pouze RW                        
                    model: "model.stredisko=value.stredisko",
                    disabled: that.df_ixs_orj_nak.Edit === false   // stejné jako df_ixs_orj_nak
                })
                .gformrow("addFieldsRow", that.df_ixs_orj_nak.Label).gselectbox(Gordic.Prefabs.Select.ginsorj(), {  //RC 24534114 : Referát
                    name: "df_ixs_orj_nak",
                    model: "model.ixs_orj=value.ixs_orj",
                    disabled: that.df_ixs_orj_nak.Edit === false,
                    change: function (ev, obj) {
                        // TODO: setEnableObject( )
                    } // end-change
                }) 
                .gformrow("addFieldsRow", that.df_objekt.Label).gselectbox(Gordic.Prefabs.Select.ekosobj(), {  //RC 24534128 : Objekt
                    name: "df_objekt",
                    model: "model.objekt=value.objekt",
                    disabled: that.df_ixs_orj_nak.Edit === false // stejné jako df_ixs_orj_nak
                })

                .gformsection("create", "")
                .gformrow("addFieldsRow", that.df_ixs_ref_nak.Label).gselectbox(Gordic.Prefabs.Select.ginsref(), {  //RC 24534466 : Zodpovědná osoba
                    name: "df_ixs_ref_nak",
                    model: "model.ixs_ref=value.ixs_ref",
                    disabled: that.df_ixs_orj_nak.Edit === false, // stejné jako df_ixs_orj_nak
                    change: function (ev, obj) {
                        // TODO: setEnableObject( )
                    } // end-change
                })
                .gformrow("addFieldsRow", that.df_trida.Label).gselectbox(Gordic.Prefabs.Select.majstri(), {   //RC 24534108 : Třída
                    name: "df_trida",
                    model: "model.trida=value.trida",
                    disabled: that.df_ixs_orj_nak.Edit === false  // stejné jako df_ixs_orj_nak
                })
                .gformrow("addFieldsRow", that.df_ext_1.Label).gselectbox(Gordic.Prefabs.Select.majsel1(), {  //RC 24534143 : Externí lokace
                    name: "df_ext_1", model:
                        "model.ext_1=value.ext_1",
                    disabled: that.df_ixs_orj_nak.Edit === false // stejné jako df_ixs_orj_nak
                }) 
                .gformrow("addFieldsRow", that.df_ext_2.Label).gselectbox(Gordic.Prefabs.Select.majsel2(), {
                    name: "df_ext_2",
                    model: "model.ext_2=value.ext_2",
                    disabled: that.df_ixs_orj_nak.Edit === false // stejné jako df_ixs_orj_nak
                })
                .gformrow("addFieldsRow", that.df_ext_3.Label).gselectbox(Gordic.Prefabs.Select.majsel3(), {
                    name: "df_ext_3",
                    model: "model.ext_3=value.ext_3",
                    disabled: that.df_ixs_orj_nak.Edit === false // stejné jako df_ixs_orj_nak
                });

            if (that.cvDebug) console.log("GMajDokladDetail.onContentReady() - formulář vytvořen");

            // zde už builder dokončil práci a může následovat vlastní kód.
                        

            that.findFields().gfield("model", "apply", that.DetailDto);
            // naplním popis knihy
            that.findFields("knihaTxt").gfield("model", "apply", { knihaTxt: that.cvKnihaTxt});

            //.gfield("model", "validators", this.validators);

            if (that.cvDebug) console.log("GMajDokladDetail.onContentReady() - DTO aplikováno");
            
            // DetailBuilder je možné použít i bez C# strany.

            /*      new Gordic.Gin.DetailBuilder.builder(this) //vytvořit
                    .registerEventsToContent() // zaregistrovat onDetailBuilderInit a onDetailBuilderBuild nebo .on("beforeInit", customFunction) či .on("beforeBuild", customFunction2)
                    .withComponent("WflElDoc", Gordic.Wfl.DetailBuilderComponents.GWflElDoc.create(this, this.DetailDto)) //přidat komponenty
                    .init().build().done(function(){ // init a build

                        //pokračovat po dokončení buildu.

                    }); 

           */

            // === POLOŽKY ========================================================================
            var colWidthMoney = 100;
            var colWidthChar3 = 33; // zkratky
            var colWidthLongText = 220;
            var colWidthPid = 115;
            var colWidthUeab = 90;
            var colWidthDate = 90;
            var colWidthSuAu = 80;
            var colWidthDateTime = 140;
            var colWidthSmall = 40;           
            //var that = this;


            this.polActionList = new GActionList({
                pbNew: {
                    caption: "jres:24534332",  //RC 24534332 : Nová pol.
                    tooltip: "jres:24534597", //RC 24534597 : Pořízení nové položky dokladu
                    enabled: that.pbNew_Edit, // výjimečně jsem udělal jako disabled/enabled
                    run: function () {
                        that.jsInsertPol($tblPol);
                    }
                },                
                pbStornoPol: {
                    caption: "jres:24534577",   //RC 24534577 : Storno pol.
                    tooltip: "jres:24534600", //RC 24534600 : Stornování položky dokladu
                    run: function () {

                        if (that.cvDebug) console.log("pbStornoPol.click()");

                        var row = $tblPol.ggrid("getSelection")[0];

                        if (row) {

                            if (that.cvDebug) console.log("a) row.mp_stav:" + row.mp_stav);
                            if (that.cvDebug) console.log("b) row.status_com:" + row.status_com);
                            if (that.cvDebug) console.log("c) enable.storno_pol:" + that.cvEnblStornoPol);
                            if (that.cvDebug) console.log("d) enable.evid:" + that.cvEnblEvid);
                            if (that.cvDebug) console.log("e) cvCUS708:" + that.cvCUS708);
                            if (that.cvDebug) console.log("f) row.tka:" + row.tka);
                            if (that.cvDebug) console.log("g) row.typ_soubor:" + row.typ_soubor);

                            

                            // nejprve klientská KO (v MAJ32 disable tlačítek)
                            //-------------------------------
                            // { tblPol.getEnableButton( ) }
                            //-------------------------------

                            // storno pol - závislé na stavu dokladu a konkrétní položky, nesmí to být obsah účetní soupravy + nesmí mít příznak komunikace
                            var e_storno_pol = that.cvEnblStornoPol && row.mp_stav !== 50 && that.cvEnblEvid && that.DetailDto.status_mud < 100;
                            // povolení storna u položek dokladu typu VP
                            if (that.DetailDto.typ_dok !== 220) // ng_typdokVP
                                e_storno_pol = e_storno_pol && row.status_com === 0;

                            // pokud to není manipulace se souborem
                            if (!(that.DetailDto.typ_dok === 310 || that.DetailDto.typ_dok === 320)) {
                                // storno u TZH a změny ceny lze u účetního souboru pouze na prvcích
                                // + přidána obsluha regisru TZH
                                if ((
                                    that.DetailDto.typ_dok === 350 || // ng_typdokZcPlus
                                    that.DetailDto.typ_dok === 355 || // ng_typdokZcMinus
                                    that.DetailDto.typ_dok === 360 || // ng_typdokRegTzh
                                    that.DetailDto.typ_dok === 362 || // ng_typdokTzh
                                    that.DetailDto.typ_dok === 364 || // ng_typdokRegTzh2Na
                                    that.DetailDto.typ_dok === 365 || // ng_typdokRegTzh2Nv
                                    that.DetailDto.typ_dok === 366  // ng_typdokRegTzhNm2Na
                                ) && row.typ_soubor === 10) // ng_typsouborUct
                                
                                    e_storno_pol = e_storno_pol && (row.tka === 10 || row.tka === 30); //  ng_tkaSam nebo ng_tkaObsah 
                                
                                else 
                                    e_storno_pol = e_storno_pol && (row.tka !== 30 || (row.tka === 30 && row.typ_soubor === 20)); // ng_typsouborLog
                                
                            } // end if-else (TZH a ZmC)

                            // pokud to je účetní nebo daňový odpis nebo ZMO, zarazím
                            if (that.DetailDto.typ_dok === 370 ||
                                that.DetailDto.typ_dok === 372 ||
                                that.DetailDto.typ_dok === 371)
                                e_storno_pol = false;

                            //  pokud to je zařazení do užívání a položka je stornována, zarazím storno - kvůli stavům
                            if (that.DetailDto.typ_dok === 110 && row.mp_stav === 90)
                                e_storno_pol = false;

                            // storno IUO je možné pouze ve stavu < 90
                            if (that.DetailDto.typ_dok === 374)
                                if (row.mp_stav >= 50) e_storno_pol = false;
                                
                            // pokud odpisují dle cus708, pak nelze manipulovat s dokladem, pokud je dat_uup < období posledního odpisu
                            // POZOR - platí pro všechny typy dokladů
                            // pouze pro odpisovaný majetek
                            // neplatí pro drobný DM
//                            if (that.cvCUS708 && row.priz_odp === 10) 
  //                              if (!(row.ueab_evi.slice(0, 3) == "018" || row.ueab_evi.slice(0, 3) == "028")                            
                                    //  e_storno_pol  = e_storno_pol and ( SalDateYear( df_dat_uup._get(  ) ) * 100 + SalDateMonth( df_dat_uup._get(  ) ) >= majsod.rokobd_odp * 100 + majsod.mesobd_odp )
                            if (that.cvCUS708) // vyhodnoceno v CS a je-li "cvCUS708" naplněno, pak se jím řídím
                                e_storno_pol = e_storno_pol && that.cvCUS708 === true;
                                                                        
                            if (e_storno_pol)
                                that.jsStornoPol(row); // STORNO
                            else
                                that.showFlash("Tuto položku nelze stornovat.", "g-state-warning", 2500, "id-flash-correct-na"); //RC 24534604 : Tuto položku nelze stornovat.

                        }
                        else {
                            that.showFlash("jres:24534601", "g-state-warning", 2500, "id-flash-empty-grid-detail"); //RC 24534601 : Nejprve vyberte záznam z tabulky.
                        } // end if-else
                    } // end run
                },
                pbCorrectPol: {
                    caption: "jres:24534578",   //RC 24534578 : Oprava pol.
                    tooltip: "jres:24534598", //RC 24534598 : Oprava položky dokladu
                    run: function () { // tblPol.correctPol( )

                        if (that.cvDebug) console.log("pbCorrectPol.click()");

                        var row = $tblPol.ggrid("getSelection")[0];

                        if (row) {

                            if (that.cvDebug) console.log("a) mp_stav:" + row.mp_stav);
                            if (that.cvDebug) console.log("b) status_com:" + row.status_com);
                            if (that.cvDebug) console.log("c) enable.correct_pol:" + that.cvEnblCorrPol);
                            if (that.cvDebug) console.log("d) enable.evid:" + that.cvEnblEvid);


                            // nejprve klientská KO (v MAJ32 disable tlačítek)
                            //-------------------------------
                            // { tblPol.getEnableButton( ) }
                            //-------------------------------
                            var e_correct_pol = true;
                            e_correct_pol = that.cvEnblCorrPol && row.mp_stav === 30 &&
                                row.status_com === 0 && that.cvEnblEvid && that.DetailDto.status_mud < 100;

                            // pokud to je účetní nebo daňový odpis nebo ZMO, zarazím
                            if (that.DetailDto.typ_dok === 370 ||
                                that.DetailDto.typ_dok === 372 ||
                                that.DetailDto.typ_dok === 371)
                                e_correct_pol = false;

                            //  pokud to je zařazení do užívání a položka je stornována, zarazím storno - kvůli stavům
                            if (that.DetailDto.typ_dok === 110 && row.mp_stav === 90)
                                e_correct_pol = false;

                            // IUO
                            if (that.DetailDto.typ_dok === 374)
                                e_correct_pol = false;
                                                       

                            if (e_correct_pol) {
                                // serverová KO zda lze provést opravu
                                that.call("CorrPolClick", { ixp: row.ixp, serCislo: row.ser_cislo })
                                    .done(function (data) {
                                        
                                        // získám kontext dat a majpol
                                        that.setContextRowPol(row);

                                        //zobrazení karty
                                        that.dialogs.showModalWindow("Gordic.Maj.WebClient.GMajKarta", {
                                            argMode: 11, // ng_modefrmEditNoSave - bez gen. PID a uložení do DB!
                                            argMajpol: that.majpol, // TODO: majpolbuf
                                            argParent: 0, // ng_parentwinFrmDoc - z dokladu
                                            argModeReq: that.DetailDto.ps_fak_stav,
                                            // TODO: argTypZdroj: majreq.typ_zdroj
                                        }, "", 1024, 768, true);

                                    });

                                // TODO: otevřu kartu a možná si budu muset poslat příznak opravy položky?

                            }
                            else
                                that.showFlash("Tuto položku nelze upravit.", "g-state-warning", 2500, "id-flash-correct-na"); //RC 24534603 : Tuto položku nelze upravit.
                            
                        }                            
                        else
                            that.showFlash("jres:24534601", "g-state-warning", 2500, "id-flash-empty-grid-detail"); //RC 24534601 : Nejprve vyberte záznam z tabulky.

                    } // end RUN
                },
                pbPohyb: {
                    caption: "jres:24534008", //RC 24534008 : Pohyby
                    tooltip: "jres:24534599", //RC 24534599 : Zobrazení pohybů položky dokladu
                    run: function () {  // frmMUDPor.showPohyb( )
                        
                        var selection = $tblPol.ggrid("getSelection");                        
                        var row = selection[0];    //data, ze kterych byl vytvoren radek

                        if (row)
                            // Call SalModalDialog( dlg_MajPep,hWndForm,ng_modepepPol,majpid.ixp,majpid.ac,tblPol.ser_cislo,tblPol.ixs_maj,tblPol.inv_cis,tblPol.mat_cis,0 )
                            that.dialogs.showWindow("Gordic.Maj.WebClient.GPohybyJsGrid", {
                                argMode: 1,
                                argIxp: row.ixp,                            
                                argAc: row.ac,
                                argSerCislo: row.ser_cislo,
                                argIxsMaj: row.ixs_maj
                                //argInvCis: row.inv_cis, // nepotřebuji
                                //argMatCis: row.mat_cis, // nepotřebuji
                            }, "", 900, 600, true);
                        else
                            that.showFlash("jres:24534601", "g-state-warning", 2500, "id-flash-empty-grid-detail"); //RC 24534601 : Nejprve vyberte záznam z tabulky.
                    }
                },             
                pbKarta: {
                    caption: "jres:24534244",   //RC 24534244 : Karta
                    tooltip: "jres:24534596", //RC 24534596 : Zobrazení detailu evidenční karty majetku
                    run: function () {  // frm_MUDPor.showKarta( )                        
                        
                        var selection = $tblPol.ggrid("getSelection");
                        var row = selection[0];    //data, ze kterych byl vytvoren radek
                        if (row) {

                            // získám kontext dat a majpol
                            that.setContextRowPol(row);

                            //zobrazení karty
                            that.dialogs.showModalWindow("Gordic.Maj.WebClient.GMajKarta", {
                                argMode: 1, // ng_modefrmViewEdit (4) - prohlížení s možností zapnutí editace. Zapnutí = dlg_MajKarta.editKarta( ) => ng_modefrmEdit (1)
                                argMajpol: that.majpol,
                                argParent: 0, // ng_parentwinFrmDoc - z dokladu
                                argModeReq: that.DetailDto.ps_fak_stav,
                                // TODO: argTypZdroj: majreq.typ_zdroj
                            }, "", 1024, 768, true);
                           

                            if (that.MAJ_ICO_FILL_KR && that.cvDebug)
                                console.log("TODO: showKarta() - naplnit BUFFER"); // Call bufpol.maj._copy( majpol.maj )
                           
                        }
                        else
                            that.showFlash("jres:24534601", "g-state-warning", 2500, "id-flash-empty-grid-detail"); //RC 24534601 : Nejprve vyberte záznam z tabulky.
                    } // end run
                }
            });
         
            
            //rozbalí se pouze pocet_pol > 0            
            var $tab = $("<div>").appendTo(this.element);
            $tab.gtab({
                title: "jres:24534007", //RC 24534007 : Položky
                opened: that.DetailDto.pocet_pol > 0,                
                menuBar: that.polActionList.createBar(["pbNew", "pbStornoPol", "pbCorrectPol", "pbPohyb", "pbKarta"], true)
            });                

           

            var $tblPol = $("<div>")
                .css("height", "300px")
                .appendTo($tab)
                .ggrid({
                    selection: function (ev, ctx) { // tblPol.setContextRowAlw( ) - dělám ručně - manipuluji s daty až je potřebuji

                        that.polActionList.pbKarta.enabled(ctx.count > 0);
                        // pokud je v tabulce řádek, neumožní se již změna nks_ext
                        that.element.findFields("df_nks_ext").gfield("option", "disabled", ctx.count > 0);

                    },

                    columnMode: "full",

                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedPol",
                        run: function (ev, ctx) {

                            that.polActionList.pbKarta.run();
                        }
                    }),

                    // showTopPanel: false,
                    // showBottomPanel: false,

                    columns: new Gordic.Data.GridFormat()

                        .addIconColumn({  // tblPol.setRowColor( ):
                            name: "pic_color",
                            field: "color",
                            caption: "",
                            description: "Příznaky",
                            width: colWidthIcon,
                            iconTemplate: function (data) {
                                // stornované
                                if (data.mp_stav == 90) { // ng_sdStorno
                                    return {
                                        icon: "fa-ban g-state-important g-state-text",  // červená
                                        tooltip: "jres:24534358", //RC 24534358 : Stornovaná položka
                                    };
                                }
                                return null;  // default
                            } // end function
                        })
                        .addNumberColumn({
                            name: "ser_cislo",
                            caption: "#",
                            width: colWidthChar3
                            //fixedWidth: true,
                        })
                        .addTextColumn({
                            name: "mp_stav_zkr",
                            caption: "jres:24534580", //RC 24534580 : Stav
                            headerTemplate: "jres:24534581", //RC 24534581 : S                           
                            width: colWidthChar3
                        })
                        .addTextColumn({
                            name: "skupina_zkr", // obligatory
                            caption: "jres:24534086", //RC 24534086 : Skupina
                            headerTemplate: "jres:24534585", //RC 24534585 : Skup
                            width: 50,
                            editor: { // pouze u nové položky
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.majsskm(), {
                                    dropdown: false,
                                    name: "skupina_zkr",
                                    itemTemplate: "{skupina_zkr}",
                                    tooltip: "Určení skupiny majetku",
                                    model: "model.skupina_id = value.skupina_id",
                                    helperItemTemplate: "{skupina_zkr} - {skupina_txt}",
                                    //                                                                        ng_typdokP                        ng_typdokPNKS                      ng_typdokPP+obsluha havarijního režimu NKS                      ng_typdokIZad
                                    disabled: (!(that.cvTblPolEnabled && (that.cvNormalDok && (that.DetailDto.typ_dok === 100 || that.DetailDto.typ_dok === 140 || (that.DetailDto.typ_dok === 120 && that.DetailDto.priz_tunel) || that.DetailDto.typ_dok === 380)))),
                                    validators: [
                                        new Gordic.Validators.Base( // při pořízení musím donutit zadat skupinu
                                            {

                                                //-------------
                                                // SAM_Validate
                                                //-------------
                                                stopping: true,
                                                errorType: "error",
                                                message: "Je nezbytné definovat skupinu majetku",
                                                validate: function (value, source) {
                                                    if (that.cvDebug) {
                                                        console.log(" = skupina_zkr.validate():");
                                                        console.log(" - DetailDto.typ_dok = [" + that.DetailDto.typ_dok + "]");
                                                        console.log(" - value = [" + value + "]");
                                                    } // end if

                                                    if (that.DetailDto.typ_dok === 100 || that.DetailDto.typ_dok === 140) {
                                                        if (value && value.skupina_id > 0)
                                                            return true;
                                                        else
                                                            return false; // nepustím ho dál
                                                    }
                                                    else
                                                        return true;
                                                },
                                                // SAM_Validate - END
                                            })
                                    ],
                                    //verify: (ev, value) => {
                                    //    if (that.cvDebug) console.log("Metoda tblPol.skupina_zkr.varify()"); 
                                    //}, // end verfify
                                    change: (ev, changeObj) => {
                                        if (that.cvDebug) console.log("Metoda tblPol.skupina_zkr.change()");


                                        if (changeObj.value) {
                                            // vyčistím případnou chybu
                                            $(that.element).findFields("skupina_zkr").gfield("resetErrors");

                                            // TODO:
                                            //  MajInit.skupina_typ_l = skupina_zkr.skupina.typ
                                            // MajInit.skupina_unique_l = skupina_zkr.skupina.s_unique

                                            // KO předkontace pohybu
                                            if (that.cvDebug) {
                                                console.log(" = Kontrola předkontace pohybu:");
                                                console.log(" - DetailDto.kod_poh = [" + that.DetailDto.kod_poh + "]");
                                                console.log(" - DetailDto.typ_dok = [" + that.DetailDto.typ_dok + "]");
                                                console.log(" - DetailDto.dev = [" + that.DetailDto.dev + "]");
                                                console.log(" - skupina_id = [" + changeObj.value.skupina_id + "]");
                                            }
                                            //--------------------------
                                            // tblPol.checkPohElement( )
                                            //--------------------------                                                                                
                                            that.call("KontrolaPredkontace", {
                                                kodPoh: that.DetailDto.kod_poh,
                                                typDok: that.DetailDto.typ_dok,
                                                dev: that.DetailDto.dev,
                                                skupinaId: changeObj.value.skupina_id,
                                            })
                                                .then(function (result, content) {

                                                    // kontrola vůči datu UUP u pohybů typu příjem pro odpisovaný majetek

                                                    if (that.cvDebug) {
                                                        console.log(" = Kontrola data UUP proti OdpOrg:");
                                                        console.log(" - MAJ_ICO_MODPIS = [" + that.MAJ_ICO_MODPIS + "]");
                                                        console.log(" - cvOdpOrg708 = [" + that.cvOdpOrg708 + "]");
                                                        console.log(" - mode_odp = [" + changeObj.value.mode_odp + "]");
                                                        console.log(" - DetailDto.dat_uup = [" + that.DetailDto.dat_uup + "]");
                                                        console.log(" - cvOstryOdpR = [" + that.cvOstryOdpR + "]");
                                                        console.log(" - cvOstryOdpM = [" + that.cvOstryOdpM + "]");
                                                    } // end debug


                                                    var valReset = false;

                                                    if (that.MAJ_ICO_MODPIS && that.cvOdpOrg708 && (that.DetailDto.typ_dok === 100 || that.DetailDto.typ_dok === 140) && // ng_typdokP + ng_typdokPNKS
                                                        changeObj.value.mode_odp === 10) {

                                                        var uupDate = new Date(that.DetailDto.dat_uup);
                                                        var numUup = uupDate.getFullYear() * 100 + uupDate.getMonth();
                                                        var numOO = that.cvOstryOdpR * 100 + that.cvOstryOdpM;

                                                        if (numUup < that.cvObdOstryOdpis) {
                                                            that.dialogs.error("Pohyb nelze provést v období (Datum UUP), které je menší než období ostrého odpisu DM (" + that.cvOstryOdpM + "/" + that.cvOstryOdpR + ")");

                                                            // MyValue = ''
                                                            $(that.element).findFields("skupina_zkr").gfield("setValue", null);
                                                            valReset = true;

                                                        } // end if (KO ostrého odpisu)    

                                                    } // end if


                                                    if (!valReset) {
                                                        // jedná-li se o unik.kartu, nastavím si ZEV
                                                        if (changeObj.value.s_unique === 1) // ng_suniqueUnik
                                                            that.nTblPolZev = 10; // ng_zevUnik

                                                        // uložím si s_unique ( skupina_zkr.skupina.s_unique )
                                                        that.nTblPolSUnq = changeObj.value.s_unique;
                                                    } // end if


                                                    // TODO: posuny na další buňky editoru (zatím není, vývojáři WK to nedoporučují, ale uvidíme...)
                                                    //if (that.DetailDto.typ_dok === 100 || that.DetailDto.typ_dok === 140) // ng_typdokP  / ng_typdokPNKS
                                                    //{
                                                    //    if (changeObj.value.s_unique === 1) // ng_suniqueUnik
                                                    //    {
                                                    //        // posun na konec řádku
                                                    //    }
                                                    //    else {
                                                    //        // posun dále
                                                    //    } // end if-else
                                                    //}
                                                    //else if (that.DetailDto.typ_dok === 120) {  // ng_typdokPP
                                                    //    // posunu se dál na inv. číslo
                                                    //} // end if-else

                                                }) // end then
                                                .fail(function (xhr, type, vobj) {
                                                    if (type === "exception") {
                                                        if (vobj.baseType === "Gordic.General.GNonFatalException") {
                                                            vobj.handled = true;
                                                            //that.showFlash(vobj.baseMessage, "g-state-error");
                                                            that.dialogs.error(vobj.baseMessage);

                                                            // MyValue = ''
                                                            $(that.element).findFields("skupina_zkr").gfield("setValue", null);
                                                        }
                                                    }
                                                }
                                                ); // end fail

                                        } // end if (val)


                                    }, // end change                                   
                                }]
                            }
                        })
                        .addTextColumn({
                            name: "inv_cis", // obligatory
                            caption: "jres:24534058", //RC 24534058 : Inventární číslo
                            width: 120,
                            editor: { // pouze u nové položky
                                widget: "gstringbox",
                                options: [{
                                    name: "inv_cis",
                                    model: "model.inv_cis=value",
                                    //                                                                                                 ng_typdokPP+obsluha havarijního režimu NKS                      ng_typdokIZad                     ng_typdokAktVyr                   ng_typdokVMzOe                    ng_typdokZarUzi         ng_divtypdokV             ng_divtypdokZ
                                    disabled: (!(that.cvTblPolEnabled && ((!that.cvNormalDok) || (that.cvNormalDok && ((that.DetailDto.typ_dok === 120 && that.DetailDto.priz_tunel) || that.DetailDto.typ_dok === 380 || that.DetailDto.typ_dok === 102 || that.DetailDto.typ_dok === 150 || that.DetailDto.typ_dok === 110 || that.cvDivTypDok === 2 || that.cvDivTypDok === 3))))),
                                }]
                            }
                        })
                        .addTextColumn({
                            name: "mat_cis",  // obligatory
                            caption: "jres:24534060", //RC 24534060 : Materiálové číslo
                            width: 130,
                            editor: { // pouze u nově pořizované položky
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.majscim(), {
                                    dropdown: false,
                                    name: "mat_cis",
                                    tooltip: "Určení materiálového čísla majetku",
                                    itemTemplate: "{mat_cis}",
                                    helperItemTemplate: "{mat_cis} - {nazev}",
                                    serverFilters: {
                                        aktivita: 100, // ccol_SetMatCis._setSelect( )                                        
                                    },
                                    model: "model.mat_cis=value.mat_cis, model.nazev=value.nazev, model.skp=value.skp, model.dan_typ=value.dan_typ",
                                    // není přístupné u typů TZH
                                    disabled: that.cvTblPolEnabled === false || (that.DetailDto.typ_dok === 362 || that.DetailDto.typ_dok === 364 || that.DetailDto.typ_dok === 365 || that.DetailDto.typ_dok === 366),
                                    //validators: [
                                    //    new Gordic.Validators.Required(), // pokud není nic zadáno, nepustím ho dál                                        
                                    //    {
                                    //        validate: (value) => {
                                    //            return value != null && value.mat_cis.length > 0;
                                    //        },
                                    //        message: "Je vyžadováno zadání mat.čísla.",
                                    //    },
                                    //],
                                    change: (obj, changeObj) => {
                                        if (that.cvDebug) console.log("Metoda tblPol.mat_cis.change()");

                                        // vyčistím případná varování z minula
                                        $(obj.currentTarget).findFields("skupina_zkr").gfield("resetErrors");
                                        $(obj.currentTarget).findFields("mat_cis").gfield("resetErrors");


                                        // ZEV se později musí načíst externě a na to potřebuji mít už vybránu skupinu!
                                        var valSKM = $(that.element).findFields("skupina_zkr").gfield("getValue");

                                        if (valSKM) {
                                            if (that.cvDebug) console.log(" - skupina_id = [" + valSKM.skupina_id + "]");
                                            if (that.cvDebug) console.log(" - s_unique = [" + valSKM.s_unique + "]");
                                        }
                                        else {
                                            $(that.element).findFields("skupina_zkr").gfield("setError", {
                                                message: "Nejprve vyberte skupinu"
                                            });

                                            $(obj.currentTarget).findFields("mat_cis").gfield("setValue", null);
                                            //$(this).gfield("setValue", null);
                                        } // end if-else



                                        //-----------------
                                        // a nyní GM_Change / getF4 / _validateField
                                        //-----------------

                                        // díky modelu máme zajištěn přenos: "nazev" ("nazev_maj"), "skp" a "dan_typ"

                                        // toto budeme potřebovat, abychom vyčistili ixs_maj a inv_cis
                                        that.bTblPolMatCisChanged = true;

                                        if (changeObj.value && valSKM) {
                                            if (that.cvDebug) console.log(" - mat_cis = [" + changeObj.value.mat_cis + "]");


                                            // získám ZEV
                                            if (valSKM.s_unique)
                                                that.nTblPolZev = 10; // ng_zevUnik                                            
                                            else {

                                                //that = this;
                                                that.beginOperation("Načítám způsob evidence...."); // získání matcis.zev

                                                that.call("GetZEV", { matCis: changeObj.value.mat_cis, skupinaId: valSKM.skupina_id, skupinaSUniq: valSKM.s_unique })
                                                    .then(function (result, content) {

                                                        that.endOperation();

                                                        if (that.cvDebug) console.log(" - ZEV = [" + result + "]");
                                                        that.nTblPolZev = result; // přiřadíme dohledaný ZEV 


                                                        // kontrola definice zev pro ico, skupina_id, mat_cis
                                                        that.checkZev(changeObj.value.mat_cis, valSKM.skupina_id)
                                                            .then(function () {

                                                                if (that.DetailDto.typ_dok === 100 || that.DetailDto.typ_dok === 140) // ng_typdokP OR ng_typdokPNKS
                                                                {

                                                                    if (nTblPolZev === 10) // ng_zevUnik
                                                                    {
                                                                        // vynucení přechodu na konec řádku
                                                                        // Takto to NEFUNGUJE! that.tblPol.ggridroweditor("save");
                                                                    }
                                                                    else if (nTblPolZev == 100) { // ng_zevMnoz
                                                                        // // CONTINUE:   příjem  množinové karty - select jestli existuje
                                                                        that.dialogs.alert("TODO: ověření existence MNOZ karty");
                                                                    }
                                                                    else {
                                                                        // nastavení budoucího TEV - kvůli tomu se nenabízely evidované karty daného MČ + rozlišujícího údaje ( evi cis )
                                                                        // TODO: majpol.maj.tev = majpol.pol.tev_cil
                                                                        if (that.cvDebug) console.log("TODO: nastavit TEV_CIL");

                                                                        // vynucení přechodu na konec řádku
                                                                        // Takto to NEFUNGUJE! that.tblPol.ggridroweditor("save");
                                                                    }
                                                                } // end if ( P nebo PNKS )

                                                            }) // end checkZev().then
                                                            .fail(function () {

                                                                nTblPolZev === 0; // nenastaven

                                                                // validace neprojde
                                                                $(obj.currentTarget).findFields("mat_cis").gfield("setError", { message: "jres:24534605" }); //RC 24534605 : Požadované materiálové číslo nemá definován způsob evidence v rámci dané skupiny majetku.
                                                                //changeObj.value = null; // toto MAT_CIS nelze použít                                                                
                                                                //return;
                                                            }); // end checkZev().fail

                                                    }) // end GetZEV.then
                                                    .always(function () {
                                                        that.endOperation();
                                                    });

                                            } // end else

                                        } // end if (value)

                                    }, // end change
                                }]
                            }
                        })
                        .addTextColumn({
                            name: "ueab_evi",  // obligatory
                            caption: "jres:24534579", //RC 24534579 : SUAU evi.
                            width: colWidthUeab
                        })
                        .addTextColumn({
                            name: "nazev",
                            caption: that.tblPolItemNazev.Title,
                            width: colWidthLongText
                        })
                        // cílová skupina při výdeji MZ do OE - viditelné pouze pro majpid.typ_dok = ng_typdokVMzOe
                        .addTextColumn({
                            name: "skupina_cil_zkr",
                            caption: "jres:24534587",  //RC 24534587 : Cílová skupina
                            headerTemplate: "jres:24534586", //RC 24534586 : Cíl. skup.   
                            width: colWidthChar3,
                            hidden: that.DetailDto.typ_dok != 150, // viditelné pouze pro ng_typdokVMzOe
                            editor: { // pouze u nové položky
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.majsskm(), {
                                    dropdown: false,
                                    name: "skupina_cil_zkr",
                                    itemTemplate: "{skupina_zkr}",
                                    helperItemTemplate: "{skupina_zkr} - {skupina_txt}",
                                    disabled: (!(that.cvTblPolEnabled && that.cvNormalDok && that.DetailDto.typ_dok == 150)),
                                    change: (obj, v) => {
                                        //                                        
                                    },
                                    model: "model.skupina_cil_zkr=value.skupina_zkr",
                                }]
                            }
                        })
                        .addNumberColumn({
                            name: "m",  // obligatory
                            caption: "jres:24534423",  //RC 24534423 : Množství
                            decimals: 3,
                            width: 80,
                            editor: { // pouze u nově pořizované položky
                                widget: "gnumberbox",
                                options: [{
                                    name: "m",
                                    model: "model.m=value",
                                    // není přístupné u typů TZH a RozM
                                    disabled: that.cvTblPolEnabled === false || (that.DetailDto.typ_dok === 362 || that.DetailDto.typ_dok === 364 || that.DetailDto.typ_dok === 365 || that.DetailDto.typ_dok === 366 || that.DetailDto.typ_dok === 322),
                                    //validators: [
                                    //    new Gordic.Validators.Required(),
                                    //    new Gordic.Validators.Length({ min: 4, max: 4, message: "Délka musí být 4" })
                                    //]
                                }]
                            }
                        })
                        // cena položky v cizí měně + kurz - viditelné v případě, že doklad není v CZK - prozatím ReadOnly
                        .addCurrencyColumn({
                            name: "c_mena",
                            caption: "jres:24534583", //RC 24534583 : Cena v měně
                            width: colWidthMoney,
                            hidden: that.DetailDto.mena == 0
                        })
                        .addNumberColumn({
                            name: "kurz",
                            caption: "jres:24534343",  //RC 24534343 : Kurz
                            decimals: 3,
                            width: 50,
                            hidden: that.DetailDto.mena == 0
                        })
                        .addCurrencyColumn({
                            name: "c",  // obligatory
                            caption: "jres:24534584", //RC 24534584 : Cena v CZK
                            width: colWidthMoney,
                            editor: { // pouze u nově pořizované položky
                                widget: "gnumberbox",
                                options: Gordic.Eko.Prefabs.Fields.currency({
                                    name: "c",
                                    model: "model.c=value",
                                    customClass: "js-MD",
                                    // není přístupné u IZad a  RozM
                                    disabled: that.cvTblPolEnabled === false || (that.DetailDto.typ_dok === 380 || that.DetailDto.typ_dok === 322),
                                })
                            },
                        })
                        // cena s přirážkou - viditelné pouze v případě enable.prirazka                        
                        .addCurrencyColumn({
                            name: "c_pri",
                            caption: "jres:24534173", //RC 24534173 : Prodejní cena
                            width: colWidthMoney,
                            hidden: that.cvEnblPri == false
                        })
                        .addCurrencyColumn({
                            name: "cmj",
                            caption: "jres:24534097", //RC 24534097 : Cena za MJ
                            width: colWidthMoney,
                            //editor: { // pouze u nově pořizované položky
                            //    widget: "gnumberbox",
                            //    options: Gordic.Eko.Prefabs.Fields.currency({
                            //        name: "c_dph",
                            //        model: "model.cmj=value",
                            //        customClass: "js-MD",
                            //        //  řízení přístupu dle parametru pro příjmy 
                            //        disabled: (!( that.cvTblPolEnabled && that.MAJ_RAD_POLCMJ === 1 && (that.DetailDto.typ_dok === 100 || that.DetailDto.typ_dok === 140))),
                            //    })
                            //},
                        })
                        .addCurrencyColumn({
                            name: "c_dph",
                            caption: "jres:24534169", //RC 24534169 : DPH
                            width: colWidthMoney,
                            hidden: (that.cvEkoDphPlatce === 0 && that.cvMajDphPlatce), // TODO: jak to budeme dělat v run-time?
                            editor: { // pouze u nově pořizované položky
                                widget: "gnumberbox",
                                options: Gordic.Eko.Prefabs.Fields.currency({
                                    name: "c_dph",
                                    model: "model.c_dph=value",
                                    customClass: "js-MD",
                                    // není přístupné u IZad a  RozM a pokud není plátce DPH (což by měla zajistit vlastnost "hidden"!)
                                    disabled: that.cvTblPolEnabled == false || that.DetailDto.typ_dok == 380 || that.DetailDto.typ_dok == 322,
                                })
                            },
                        })
                        .addCurrencyColumn({
                            name: "c_dph_odpocet",
                            caption: "jres:24534170", //RC 24534170 : Odpočet DPH
                            width: colWidthMoney,
                            hidden: (that.cvEkoDphPlatce === 0 && that.cvMajDphPlatce), // TODO: jak to budeme dělat v run-time?
                            editor: { // pouze u nově pořizované položky
                                widget: "gnumberbox",
                                options: Gordic.Eko.Prefabs.Fields.currency({
                                    name: "c_dph_odpocet",
                                    model: "model.c_dph_odpocet=value",
                                    customClass: "js-MD",
                                    // není přístupné u IZad a  RozM a pokud není plátce DPH (což by měla zajistit vlastnost "hidden"!)
                                    disabled: that.cvTblPolEnabled == false || that.DetailDto.typ_dok == 380 || that.DetailDto.typ_dok == 322,
                                })
                            },
                        })
                        .addCurrencyColumn({
                            name: "c_c_dph",
                            caption: "jres:24534350", //RC 24534350 : Cena včetně DPH
                            width: colWidthMoney,
                            hidden: (that.cvEkoDphPlatce === 0 && that.cvMajDphPlatce), // TODO: jak to budeme dělat v run-time?
                            editor: { // pouze u nově pořizované položky
                                widget: "gnumberbox",
                                options: Gordic.Eko.Prefabs.Fields.currency({
                                    name: "c_c_dph",
                                    model: "model.c_c_dph=value",
                                    customClass: "js-MD",
                                    // není přístupné u IZad a  RozM a pokud není plátce DPH (což by měla zajistit vlastnost "hidden"!)
                                    disabled: that.cvTblPolEnabled == false || that.DetailDto.typ_dok == 380 || that.DetailDto.typ_dok == 322,
                                })
                            },
                        })
                        // naklad 1-3 : viditelné pouze při ktg_poh_spotreba
                        .addTextColumn({
                            name: "naklad_p1",
                            caption: "jres:24534346" + " 1", //RC 24534346 : Spotřeba
                            width: 100,
                            hidden: that.ktg_poh_spotreba == false,
                            editor: { // pouze u nové položky
                                widget: "gstringbox",
                                options: [{
                                    name: "naklad_p1",
                                    model: "model.naklad_p1=value",
                                    disabled: that.cvTblPolEnabled == false,
                                }]
                            }
                        })
                        .addTextColumn({
                            name: "naklad_p2",
                            caption: "jres:24534346" + " 2", //RC 24534346 : Spotřeba
                            width: 100,
                            hidden: that.ktg_poh_spotreba == false,
                            editor: { // pouze u nové položky
                                widget: "gstringbox",
                                options: [{
                                    name: "naklad_p2",
                                    model: "model.naklad_p2=value",
                                    disabled: that.cvTblPolEnabled == false,
                                }]
                            }
                        })
                        .addTextColumn({
                            name: "naklad_p3",
                            caption: "jres:24534346" + " 3", //RC 24534346 : Spotřeba
                            width: 100,
                            hidden: that.ktg_poh_spotreba == false,
                            editor: { // pouze u nové položky
                                widget: "gstringbox",
                                options: [{
                                    name: "naklad_p3",
                                    model: "model.naklad_p3=value",
                                    disabled: that.cvTblPolEnabled == false,
                                }]
                            }
                        })
                        // skryté není-li MAJ_RAD_DOKMPP=1
                        .addTextColumn({
                            name: "popis",
                            caption: "jres:24534028", //RC 24534028 : Popis
                            width: colWidthLongText,
                            hidden: that.MAJ_RAD_DOKMPP != 1,
                            editor: { // popis je jako jediný editovatelný u řádku, který je již v DB
                                widget: "gstringbox",
                                options: [{
                                    name: "popis",
                                    model: "model.popis=value",
                                    disabled: (!(that.cvTblPolEnabled && that.MAJ_RAD_DOKMPP === 1)),
                                }]
                            }
                        })
                        .addTextColumn({
                            name: "nazev_maj",
                            caption: that.tblPolItemNazevMaj.Title,
                            width: colWidthLongText
                        })
                        .addNumberColumn({
                            name: "pmj_krt",
                            caption: "jres:24534588", //RC 24534588 : Aktuální množství
                            decimals: 3,
                            width: 80
                        })
                        .addCurrencyColumn({
                            name: "c_krt",
                            caption: "jres:24534589", //RC 24534589 : Aktuální cena
                            width: colWidthMoney
                        })
                        .addTextColumn({
                            name: "skp",
                            caption: that.tblPolItemSkp.Title,
                            width: 80
                        })
                        .addTextColumn({
                            name: "mj",
                            caption: that.tblPolItemMj.Title,
                            width: colWidthChar3 + 10
                        })
                        .addTextColumn({
                            name: "drh_zkr",
                            caption: that.tblPolItemDruh.Title,
                            width: colWidthChar3 + 20
                        })
                        .addTextColumn({
                            name: "ueab_por",
                            caption: that.tblPolItemUeabPor.Title,
                            width: colWidthUeab
                        })
                        .addTextColumn({
                            name: "ueab_opr",
                            caption: that.tblPolItemUeabOpr.Title,
                            width: colWidthUeab
                        })
                        .addDateColumn({
                            name: "dat_zar",
                            caption: that.tblPolItemDatZar.Title,
                            width: colWidthDate
                        })
                        .addTextColumn({
                            name: "trida",
                            caption: that.tblPolItemTrida.Title,
                            width: 45
                        })
                        .addTextColumn({
                            name: "vyr_cis",
                            caption: that.tblPolItemVyrCis.Title,
                            width: 100
                        })
                        .addTextColumn({
                            name: "evi_cis",
                            caption: that.tblPolItemEviCis.Title,
                            width: 80
                        })
                        .addTextColumn({
                            name: "ser_cis",
                            caption: that.tblPolItemSerCis.Title,
                            width: 80
                        })
                        .addTextColumn({
                            name: "sarze",
                            caption: that.tblPolItemSarze.Title,
                            width: 85
                        })
                        .addTextColumn({
                            name: "stredisko",
                            caption: that.tblPolItemStredisko.Title,
                            width: 55
                        })
                        .addTextColumn({
                            name: "ixs_orj_txt",
                            caption: that.tblPolItemReferat.Title,
                            width: 55
                        })
                        .addTextColumn({
                            name: "ixs_ref_txt",
                            caption: that.tblPolItemIxsRef.Title,
                            width: 55
                        })
                        .addTextColumn({
                            name: "objekt",
                            caption: that.tblPolItemObjekt.Title,
                            width: 55
                        })
                        .addTextColumn({
                            name: "budova_kod",
                            caption: that.tblPolItemBudova.Title,
                            width: colWidthChar3 + 10
                        })
                        .addTextColumn({
                            name: "segment_kod",
                            caption: that.tblPolItemSegment.Title,
                            width: colWidthChar3 + 10
                        })
                        .addTextColumn({
                            name: "mistnost_kod",
                            caption: that.tblPolItemMistnost.Title,
                            width: colWidthChar3 + 10
                        })
                        .addTextColumn({
                            name: "akce",
                            caption: that.tblPolItemAkce.Title,
                            width: 100
                        })
                        .addDateColumn({
                            name: "dat_uct",
                            caption: "jres:24534582",  //RC 24534582 : Proúčtováno
                            width: colWidthDate
                        })
                        .addTextColumn({
                            name: "status_com_txt",
                            headerTemplate: "jres:24534590", //RC 24534590 : Kom
                            caption: "jres:24534591", //RC 24534591 : Příznak komunikace
                            width: colWidthChar3
                        }),
                    navigationMode: "row",
                })
                .ggridroweditor({

                    allowCopy: true,

                    start: function (ev, info) {

                        if (info.cellInfo.meta._newRow) {




                            //---------------------
                            // tblPol.initColumn( )  >>>>>>>>>>>>>>>>>>>>
                            //---------------------

                            that.call("MajpolInit", {})
                                .then(function (result, content) {

                                    that.majpol = result;


                                    that.majpol.pol.kod_poh = that.DetailDto.kod_poh; // majpid.kod_poh
                                    // noExistKrt = 0
                                    that.majpol.pol.typ_dok = that.DetailDto.typ_dok; //  majpid.typ_dok
                                    that.majpol.pol.dev = that.DetailDto.dev; // majpid.dev
                                    // skupina_id = 0
                                    //  skupina_id_cil = 0
                                    // por_poh = 0 - PSvoboda: shodné spol._init( )
                                    that.majpol.pol.ac = that.DetailDto.ac; // majpid.ac
                                    //  ixs_maj = '' - PSvoboda: shodné spol._init( )
                                    //  inv_cis = '' - PSvoboda: shodné spol._init( )
                                    // vyr_cis = '' - PSvoboda: shodné spol._init( )
                                    //  nazev = '' - PSvoboda: shodné spol._init( )
                                    // typ_poh = 0 - PSvoboda: shodné spol._init( )
                                    // druh_poh = 0 - PSvoboda: shodné spol._init( )
                                    // dat_poh = DATETIME_Null - PSvoboda: shodné spol._init( )
                                    // dat_uct = '' - PSvoboda: shodné spol._init( )
                                    //  ico = EkoInit.Ico - PSvoboda: shodné spol._init( )
                                    //  ucs = EkoInit.Ucs - PSvoboda: shodné spol._init( )
                                    //   nks = EkoInit.Nks - PSvoboda: shodné spol._init( )
                                    that.majpol.pol.mp_stav = 30;  // ng_sdBeforeUct - inicializace na stav before uct
                                    // st_stav = 0; - PSvoboda: shodné spol._init( )
                                    // status_com = 0; - PSvoboda: shodné spol._init( )
                                    that.majpol.pol.skp = "";
                                    that.majpol.pol.ueab_evi = "";
                                    that.majpol.pol.ueab_por = "";
                                    that.majpol.pol.ueab_opr = "";
                                    // skupina_odp = '0' - PSvoboda: shodné spol._init( )
                                    that.majpol.pol.trida = "";
                                    // typ_soubor = 0 - PSvoboda: shodné spol._init( )
                                    that.majpol.pol.ixs_maj_nad = ""; // TODO: Dbms._strInit( )
                                    // sloučení a rozdělení majetku
                                    if (that.DetailDto.typ_dok === 310 ||  // ng_typdokSIn
                                        that.DetailDto.typ_dok === 320 ||  // ng_typdokSOut
                                        that.DetailDto.typ_dok === 312 ||  // ng_typdokSlcM
                                        that.DetailDto.typ_dok === 322   // ng_typdokRozM
                                    )
                                        that.majpol.pol.ixs_maj_nad = that.DetailDto.ixs_maj_nad; // majpid.ixs_maj_nad
                                    // flag = 0  ng_fgNoDB
                                    // inicializace karty
                                    that.majpol.maj.dev = that.majpol.pol.dev;
                                    that.majpol.maj.nks = that.majpol.pol.nks;
                                    // id_ext = ""; - PSvoboda: shodné spol._init( )
                                    // TODO: pol_ext = 0  - tblPol má sloupec pol_ext
                                    // inicializace způsobu definice ceny - příznak ceny s nebo bez DPH, příznak pohybu typu příjem
                                    //--------------------
                                    // majpol._setCWithDph( cb_with_dph , majpid.typ_dok = ng_typdokP or majpid.typ_dok = ng_typdokPNKS, majpid.dat_uup, cb_odpocet_dph_no  )
                                    //--------------------                                    
                                    that.majpol.c_with_dph = that.findForms("FormDoklad").findFields("cb_with_dph").gfield("getValue");
                                    that.majpol.work_dph = that.DetailDto.typ_dok === 100 || that.DetailDto.typ_dok === 140; // ng_typdokP OR ng_typdokPNKS
                                    that.majpol.dat_uup = that.DetailDto.dat_uup; // majpid.dat_uup
                                    that.majpol.odpocet_dph_no = that.findForms("FormDoklad").findFields("cb_odpocet_dph_no").gfield("getValue");
                                    //-------------------- majpol._setCWithDph - END
                                    // 380.10 21.02.18 cizí měna
                                    that.majpol.pol.mena = that.DetailDto.mena;
                                    that.majpol.pol.kurz = that.DetailDto.kurz;
                                    that.majpol.pol.m_kurz = that.DetailDto.m_kurz;
                                    // c_mena = 0;; - PSvoboda: shodné spol._init( )

                                    if (that.cvDebug) console.log(" = MAJPOL nové karty iniciován");


                                    // focus jsem dal až sem - na začátku funkce NEFUNGOVAL!
                                    // focus (automaticky je na mat_cis)
                                    if (that.bTblPolFocusInvCis) $(ev.target).findFields("inv_cis").gfield("focus");

                                    //======================================

                                    // pokračování tblPol.initColumn( )                                     
                                    that.bTblPolNoExistKrt = false;
                                    that.nTblPolZev = 0; // init( )
                                    that.nTblPolSUnq = 0; // init( )
                                }) // end then

                            //---------------------
                            // tblPol.initColumn( ) - <<<<<<<<<<<<<<<<<<<<< END
                            //---------------------


                        }
                        else {
                            // není to nový řádek, a tak zpřístupním pouze POPIS
                            $(ev.target).findFields("skupina_zkr", "inv_cis", "mat_cis", "skupina_cil_zkr", "m", "c", "c_dph", "c_dph_odpocet", "c_c_dph", "naklad_p1", "naklad_p2", "naklad_p3", "cmj").gfield("option", "disabled", true);


                            // ještě je přístup k POPIS podmíněn:
                            if (that.MAJ_RAD_DOKPNEW !== 1)
                                $(ev.target).findFields("popis").gfield("option", "disabled", true)
                            else // PSvoboda: hodím tam hned focus
                                $(ev.target).findFields("popis").gfield("focus");

                        } // end if-else

                    }, // end start()

                    save: (data, info) => { // commit řádku "ggridroweditor" + spustí se validátory u položek "editor"


                        // přenos s mat_cis.GM_Change
                        if (that.bTblPolMatCisChanged) {
                            // zdusit identifikaci dříve identifikované karty
                            data.ixs_maj = "";
                            data.inv_cis = "";
                            //  shodit příznak editace
                            that.bTblPolMatCisChanged = false;
                        } // end if


                        //===================
                        //  tblPol.savePol( )
                        //===================
                        if (info.cellInfo.meta._newRow) {

                            data.ser_cislo = info.cellInfo.row + 1;
                           
                            return that.savePolozka(data);                                
                            
                        }
                        else {

                            // uložím popisek - vrátím promise
                            that.call("SetEditPopis", { ixp: data.ixp, serCislo: data.ser_cislo, popis: data.popis });
                        } // end if-else
                        //=================== - tblPol.savePol( ) - END
                        
                    },  // end save()
                });

            var view = new Gordic.Data.View(this.tblPol, { key: "ixp,ser_cislo,lic" });  //key je dulezity kvuli pripadnemu vyhledavani radku
            $tblPol.ggrid("setData", view);
            

            if (that.cvDebug) console.log("GMajDokladDetail.onContentReady() - záložka Položky vytvořena");

            // === POHYBY =========================================================================                       

            // v GUPTA dynamická záložka:  SalCreateWindowEx( dlg_MajPepDok, hWndForm, nLeft, nTop, 14.35, 4.286, CREATE_AsChild, ng_modetabYes, majpid.ixp )

            var colWidthAc = 85;


            that.tblMode = 3; // ctbl_MajPep.mode - zde napevno ng_modepepDok (dlg_MajPepDok.create ( ))
            that.tblTable == "majspep";


            this.actions.addRange({
                
                pbKartaPep: {
                    caption: "jres:24534244", //RC 24534244 : Karta
                    //icon: "fa-plus-square g-state-text",
                    tooltip: "jres:24534596", //RC 24534596 : Zobrazení detailu evidenční karty majetku
                    visible: true,
                    enabled: true,
                    run: function () { // frmMUDPor.showKartaPep( )

                        // dlg_MajPepDok.showKarta( )

                        // Call tbl_MajPep.getRow( ) 
                        var row = $tbl_MajPep.ggrid("getSelection")[0];                                              
                        if (row) {

                            // l_majpol.init( )
                            var l_majpol = {};
                            l_majpol.maj = {};
                            l_majpol.maj.zev = 0; 


                            l_majpol.maj.ixs_maj = row.ixs_maj;
                            l_majpol.maj.inv_cis = row.inv_cis;
                            l_majpol.maj.skupina_id = row.skupina_id;
                            l_majpol.maj.drh_id = row.drh_id;
                            l_majpol.maj.mat_cis = row.mat_cis;
                            l_majpol.maj.dev = row.dev;
                            
                          
                            //zobrazení karty
                            that.dialogs.showModalWindow("Gordic.Maj.WebClient.GMajKarta", {
                                argMode: 1, // ng_modefrmView (0) - prohlížení. Zapnutí = dlg_MajKarta.editKarta( ) => ng_modefrmEdit (1)
                                argMajpol: l_majpol,
                                argParent: 10, // ng_parentwinDlg
                                argModeReq: 0,
                                //argTypZdroj: ""
                            }, "", 1024, 768, true);

                        }
                        else
                            that.showFlash("jres:24534601", "g-state-warning", 2500, "id-flash-empty-grid-detail"); //RC 24534601 : Nejprve vyberte záznam z tabulky.
                    } // end run
                }                
            });

            $tab = $("<div>").appendTo(this.element);
            $tab.gtab({
                title: "jres:24534008", //RC 24534008 : Pohyby
                opened: false,  //ve výchozím stavu jsou nerozbaleny
                menuBar: [{ action: this.actions.pbKartaPep, favorite: true }],
                customLoad: function (ev, obj) {
                    
                    that.call("NactiSeznamPohybu", { ixp: that.DetailDto.ixp })
                        .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "ixp,ser_cislo,lic,ser_pcislo" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            $tbl_MajPep.ggrid("setData", view);                     //true = prekresleni gridu
                        });
                    
                }
            });

            //==========================================
            //  Grid s majetkovými pohyby { dynamicky vložený dlg_MajPepDok }
            //==========================================
            var $tbl_MajPep = $("<div>")
                    .css("height", "300px")
                    .appendTo($tab)
                .ggrid({

                        columnMode: "full", 

                        defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                            name: "gridRowSelectedPoh",
                            run: function (ev, ctx) {
                                that.actions.pbKartaPep.run();
                            }
                        }),   

                        //------------------------------------------------------
                        // { ctbl_MajPep } - stejný grid je také v GPohybyJsGrid a GMajPohyby
                        //------------------------------------------------------
                        
                    columns: new Gordic.Data.GridFormat()
                        .addIconColumn({  // ctbl_MajPep.fetchRowDone( ):
                            name: "pic_color",
                            field: "st_stav",
                            caption: "",
                            description: "jres:24534594", //RC 24534594 : Příznaky
                            width: colWidthIcon,
                            iconTemplate: function (data) {
                                switch (data.st_stav) {
                                    case 90: return {
                                        icon: "fa-trash g-state-important g-state-text",
                                        text: "jres:24534357", //RC 24534357 : Storno
                                        tooltip: "jres:24534358" //RC 24534358 : Stornovaná položka
                                    };
                                    default: return null;
                                }
                            }
                        })
                        .addTextColumn({
                            name: "ac",
                            caption: "jres:24534340", //RC 24534340 : Číslo dokladu
                            width: colWidthAc,
                            hidden: (that.tblMode == 3 || that.tblMode == 1) // ng_modepepPol OR ng_modepepDok
                        })
                        .addTextColumn({
                            name: "typ_dok_zkr",
                            caption: "jres:24534025", //RC 24534025 : Typ
                            width: colWidthChar3,
                            fixedWidth: true,                                
                        })
                        .addNumberColumn({
                            name: "kod_poh",
                            caption: "jres:24534026", //RC 24534026 : Kód
                            width: colWidthSmall
                        })
                        .addNumberColumn({
                            name: "ser_cislo",
                            caption: "# pol",
                            width: colWidthSmall,
                            hidden: that.tblMode == 1 // ng_modepepPol = 1
                        })
                        .addNumberColumn({
                            name: "ser_pcislo",
                            caption: "# poh",
                            width: colWidthSmall,
                            hidden: that.tblTable == "majspol"  // pro položky schovat
                        })
                        .addTextColumn({
                            name: "mp_stav_zkr",
                            caption: "jres:24534580", //RC 24534580 : Stav
                            headerTemplate: "jres:24534581", //RC 24534581 : S
                            width: colWidthSmall,
                            fixedWidth: true
                        })
                        .addTextColumn({
                            name: "skupina_zkr",
                            caption: "jres:24534086", //RC 24534086 : Skupina
                            headerTemplate: "jres:24534602", //RC 24534602 : Skup
                            width: 60
                        })
                        .addTextColumn({
                            name: "dev_zkr",
                            caption: "jres:24534027", //RC 24534027 : DEV
                            width: 80,
                        })                                                        
                        .addTextColumn({
                            name: "inv_cis",
                            caption: that.tblPepItemInvCis.Title,
                            width: 120,
                            hidden: that.tblPepItemInvCis.Visible === false
                        })
                        .addTextColumn({
                            name: "mat_cis",
                            caption: that.tblPepItemMatCis.Title,
                            width: 120,
                            hidden: that.tblPepItemMatCis.Visible === false
                        })
                        .addTextColumn({
                            name: "ueab_evi",
                            caption: that.tblPepItemUeabEvi.Title,
                            width: colWidthSuAu,
                            hidden: that.tblPepItemUeabEvi.Visible === false
                        })
                        .addTextColumn({
                            name: "nazev",
                            caption: that.tblPolItemNazev.Title,
                            width: 150,
                            hidden: that.tblPolItemNazev.Visible === false
                        })                                                            
                        .addCurrencyColumn({
                            name: "m",
                            caption: "jres:24534423",  //RC 24534423 : Množství
                            width: 90,
                            decimals: 3
                        })
                        // zobrazení měny, ceny v měně  - pokud budou všechny záznamy v CZK, sloupce nebudou vidět
                        .addCurrencyColumn({
                            name: "c_mena",
                            caption: "jres:24534341", //RC 24534341 : Cena v měně
                            width: colWidthMoney,
                            hidden: that.HideCiziMena   // GM_SetVisible - 380.21 12.07.18 zobrazení měny, ceny v měně  - pokud budou všechny záznamy v CZK, sloupce nebudou vidět
                        })
                        .addTextColumn({
                            name: "mena_zkr",
                            caption: "jres:24534342", //RC 24534342 : Měna
                            width: colWidthSmall,
                            hidden: that.HideCiziMena    // GM_SetVisible
                        })
                        .addNumberColumn({
                            name: "kurz",
                            caption: "jres:24534343", //RC 24534343 : Kurz
                            width: colWidthMoney,
                            hidden: that.HideCiziMena   // GM_SetVisible
                        })
                        .addCurrencyColumn({
                            name: "c",
                            caption: "jres:24534061", //RC 24534061 : Cena
                            width: colWidthMoney
                        })
                        .addCurrencyColumn({
                            name: "cmj",
                            caption: "jres:24534097", //RC 24534097 : Cena za MJ
                            width: colWidthMoney - 10
                        })
                        .addCurrencyColumn({
                            name: "c_dph",
                            caption: "jres:24534169", //RC 24534169 : DPH
                            width: colWidthMoney,
                            hidden: that.cvEkoDphPlatce == 0 // TODO: jak to budeme dělat v run-time?
                        })                        
                        .addCurrencyColumn({
                            name: "c_c_dph",
                            caption: "jres:24534350", //RC 24534350 : Cena včetně DPH
                            width: colWidthMoney,
                            hidden: that.cvEkoDphPlatce == 0 // TODO: jak to budeme dělat v run-time?
                        })
                        .addTextColumn({
                            name: "skp",
                            caption: that.tblPolItemSkp.Title,
                            width: 100
                        })
                        .addTextColumn({
                            name: "mj",
                            caption: that.tblPolItemMj.Title,
                            width: colWidthChar3 + 10
                        })
                        .addTextColumn({
                            name: "vyr_cis",
                            caption: "jres:24534151", //RC 24534151 : Výrobní číslo
                            width: 120
                        })
                        .addDateColumn({
                            name: "dat_uup",
                            caption: "jres:24534024",  //RC 24534024 : Datum UUP
                            width: colWidthDate
                        })
                        .addDateColumn({
                            name: "dat_poh",
                            caption: "jres:24534344",  //RC 24534344 : Datum pohybu
                            width: colWidthDateTime
                        })
                        .addDateColumn({
                            name: "dat_uct",
                            caption: "jres:24534582",  //RC 24534582 : Proúčtováno
                            width: colWidthDate
                        })
                        .addTextColumn({
                            name: "nazev_poh",
                            caption: "jres:24534345", //RC 24534345 : Název pohybu
                            width: 140
                        })
                        .addTextColumn({
                            name: "druh_poh_zkr",
                            caption: "jres:24534087", //RC 24534087 : Druh
                            width: colWidthChar3 + 10
                        })
                        // SKRYTÉ klíče ctbl_MajPep:
                        // typ_dok, skupina_id, drh_id, dev, por_poh, ixs_maj, typ_poh, druh_poh, ico, ucs
                        .addTextColumn({
                            name: "nks",
                            caption: "jres:24534037", //RC 24534037 : NS
                            width: colWidthPid - 20
                        })
                        .addTextColumn({
                            name: "id_top",
                            caption: "jres:24534351", //RC 24534351 : EVS vlastní
                            width: colWidthPid - 20,
                            hidden: that.cvMajInitIdTop === "NKS"
                        })
                        .addTextColumn({
                            name: "nks_ext",
                            caption: that.cvColNsExtTitle,
                            width: colWidthPid - 20
                        })                        
                        // SKRYTÉ klíče ctbl_MajPep:
                        // tka, mp_stav, st_stav, status_com 
                        .addTextColumn({
                            name: "ueab_por",
                            caption: that.tblPolItemUeabPor.Title,
                            width: colWidthSuAu,  // TODO: ccol_ItemNoEditUeab.SAM_Create( ) - nastavení šířky sloupce podle délky CFU
                            hidden: that.tblPolItemUeabPor.Visible === false
                        })
                        .addTextColumn({
                            name: "ueab_opr",
                            caption: that.tblPolItemUeabOpr.Title,
                            width: colWidthSuAu,
                            hidden: that.tblPolItemUeabOpr.Visible === false
                        })
                        // SKRYTÉ klíče ctbl_MajPep:
                        // skupina_odp, trida, ser_hst_maj, ser_hst_odp, typ_soubor, ixs_maj_nad
                        .addTextColumn({
                            name: "ixp",
                            caption: "jres:24534020", //RC 24534020 : Identifikátor
                            width: colWidthPid
                        })
                        // nákladové položky
                        .addTextColumn({
                            name: "naklad_p1",
                            caption: "jres:24534346" + " 1", //RC 24534346 : Spotřeba
                            width: 135  // char 16
                        })
                        .addTextColumn({
                            name: "naklad_p2",
                            caption: "jres:24534346" + " 2", //RC 24534346 : Spotřeba
                            width: 135 // char 16
                        })
                        .addTextColumn({
                            name: "naklad_p3",
                            caption: "jres:24534346" + " 3", //RC 24534346 : Spotřeba
                            width: 135 // char 16
                        })
                        // SKRYTÉ klíče ctbl_MajPep:
                        // mena
                        //=====================
                        // TODO: údaje karty
                        //=====================

                        /*
                        .addCurrencyColumn({
                            name: "c_dph_odpocet",
                            caption: "jres:24534170", //RC 24534170 : Odpočet DPH
                            width: colWidthMoney,
                            hidden: that.cvEkoDphPlatce == 0 // TODO: zatím nemám událost, ošetřující "PlaceDph" k datu UUP
                        })
                        */

                    });

            if (that.cvDebug) console.log("GMajDokladDetail.onContentReady() - záložka Pohyby vytvořena");

            //loadPepData($grid);                                       

            
            //=====================================================================================
            // úprava STATUS BAR
            //=====================================================================================
            var $statusStavEvi = $(".g-state-stav");
            $statusStavEvi.removeClass("g-state-success");
            $statusStavEvi.removeClass("g-state-info");
            $statusStavEvi.removeClass("g-state-inactive");
            $statusStavEvi.removeClass("g-state-warning");
            if (that.DetailDto.mp_stav >= 50) {
                $statusStavEvi.addClass("g-state-inactive");  // šedá => storno, uzavřeno 
            } else if (that.DetailDto.mp_stav <= 10) {
                $statusStavEvi.addClass("g-state-warning"); // oranžová => návrh
            } else if (that.DetailDto.mp_stav === 20) {
                $statusStavEvi.addClass("g-state-success"); // zelená => evidence
            } else                 
                $statusStavEvi.addClass("g-state-info"); // modrá => ostatní stavy

            //this.actions.actPodani.enabled(!this.Editace && this.PovolenaEditace && this.JeEvidovan);               
            this.actions.actPodani.enabled(that.pbPodani.Edit);
            this.actions.actElPodani.enabled(that.pbPodaniEle.Edit);
            this.actions.actEvidence.enabled(that.pbEvidence.Edit);
            this.actions.actSchvaleni.enabled(that.pbValidate.Edit);
            this.actions.actStorno.enabled(that.pbStornoMud.Edit);
            this.actions.actUct.enabled(that.pbUct.Edit);
            this.actions.actUzavreni.enabled(that.pbClose.Edit);
            this.actions.actPredatDoWfl.enabled(false);
            this.actions.actPrevzitZWfl.enabled(false);
            this.actions.actSave.enabled(that.pbEvidence.Edit);
            


            //Také je možné využít jednotlivé komponenty bez builderu či C# strany -> 
            var component = Gordic.Wfl.DetailBuilderComponents.WflHistory.create({ Title: "Moje Historie" }, "Gordic.Wfl.WebClient.Detail.GHistorie", { Ixp: this.DetailDto.Ixp });
            this.actions.add(component.actions[0]); // použití akce z komponenty historie.

            // TODO: otestováno, jen zjistit, zda tam není nějaký podmínky jako "Loaded" apod.
            // that.setHeaderView(that, that.DetailDto.typ_dok);

            if (that.cvDebug) console.log("GMajDokladDetail.onContentReady() - END");

        }, // end content-ready
               
        
        //loadPepData: function ($grid) {
        //    / <summary>Nacteni dat do gridu</summary>
        //    / <param name='$grid' type='jQuery'>Reference na ggrid</param>
                      
        //    var that = this;
        //    this.beginOperation("Nacitam data MAJSPEP");
        //    this.srv.call("NactiSeznamPohybu", { ixp: this.DetailDto.Ixp })
        //        .done(function (data) {
        //            var view = new Gordic.Data.View(data, { key: "ixp,ser_cislo,lic,ser_pcislo" });  //key je dulezity kvuli pripadnemu vyhledavani radku
        //            $grid.ggrid("setData", view);                     //true = prekresleni gridu
        //        })
        //        .always(function () { that.endOperation(); });
        //},
        



        //======================================================================================
        // PRÁCE S HLAVIČKOU
        //======================================================================================

        jsPodani: function () {
           
            var that = this;

            var options = {
                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp,
                ZpusobGenerovaniIxp: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.Opisem
            };

            Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow).done(function (retVal, content) {
                
                if (retVal) {                    
                    that.call("Podani", { ixpRec: retVal.Ixp })
                        .done(function (retVal2, content) { that.LoadDetail({ argIxp: retVal.Ixp }); });
                } // end if

            });
        }, // end function ( PODANI ) 

        //======================================================================================
        jsPodaniEle: function () {

            var that = this;

            
            var opt = { InitialValues: { Title: "Test" } };

            Gordic.Gin.Dialogs.GSelectFileDlg(that, opt, Gordic.Gin.Globals.Enums.ModOtevreni.navigate)
                .done(function (soubor) {

                    //console.log("Soubor:" + soubor.Title);
                    // 2019-08-05 - musím ošetřit, zda nebylo v dialogu el.podání vybráno "Zrušit" - to provedu testem na "undefined"

                    if (typeof soubor.Title !== 'undefined') that.call("InsertMUDEle", { souborDto: soubor })
                        .done(function (retVal, content) {

                            that.LoadDetail({ argIxp: retVal });

                        });
                });           
                        
        }, // end function ( PODANI-ELE )

        //======================================================================================
        jsEvidDoklad: function (prizZmenitStav) {
            // PSvoboda: EVIDENCE je téměř identická s uložením
            var that = this;

            // pokud je doklad schválen či proúčtován a měním pouze údaje hlavičky, pak neměním stav
            if (prizZmenitStav && (that.DetailDto.mp_stav == 30 || that.DetailDto.mp_stav == 40)) {

                // shodí stav úplnosti
                if (that.DetailDto.status_mud == 10 || that.DetailDto.status_mud == 110) {
                    that.DetailDto.status_mud = (that.DetailDto.status_mud - 10);
                } // end if

            }
            else {
                that.DetailDto.mp_stav = 20; // evidence
            } // end if-else


            // volání evidence dokladu
            that.jsSave();

            // TODO: v režimu nuceného podání s bufferem karet volám vynucené uložení položek dokladu           

        }, // end function ( jsEvidDoklad ) ------------------------------------------------------
        

        //======================================================================================

        getField: function () {
            var that = this;

            that.findForms("FormHeader").findFields(
                "df_ac, df_ac_ag, df_typ_dok, df_popis"
            ).gfield("model", "collect", that.DetailDto);

            that.findForms("FormDoklad").findFields(
                "df_kod_poh, df_dat_uup, df_dat_zdan, " +
                // seberu i "df_nks_ext" a na serveru v případě potřeby odmáznu
                // "df_dat_termin" asi mohu sebrat vždy, neb při změně typ_dok se případně resetuje v InitHdr dokladu
                "df_nks_ext, df_dat_termin, " +
                "df_mena, df_kurz, " +
                "df_id_top, " + // seberu vždy(!) id_top - pro EVS musí být nastaveno a pro NKS případně doplním z EkoParams
                "df_ac_ext, df_dat_ext, df_ps_fak, " +
                // TODO: majpid.ixp_prim = df_ps_fak._getIxpPrim(  )
                // TODO: majpid.typ_ag_prim = df_ps_fak._getTypAgPrim( )
                // TODO: sebrat "df_c_c" a "df_c_c_dph" a "df_pocet_pol"
                "df_c_c_zmena," +
                "df_naklad_1, df_naklad_2, df_naklad_3"
            ).gfield("model", "collect", that.DetailDto);

            that.findForms("FormSpotreba").findFields(
                "df_ixs_orj_nak, df_ixs_ref_nak, df_stredisko, df_trida, df_objekt, " +
                "df_ext_1, df_ext_2, df_ext_3"
            ).gfield("model", "collect", that.DetailDto);


            // sběr dat při určitých typech dokladu
            if (that.DetailDto.typ_dok == 332 || that.DetailDto.typ_dok == 342) // ng_typdokResZapI | ng_typdokResRetI
            {
                var myVal = that.findFields("cmb_res_typ").gfield("getValue").id;
                // při typu reservace na REFerenta
                if (myVal == 20)
                    that.DetailDto.ixs_esu_ext = that.findFields("df_ixs_ref").gfield("getValue").ixs_ref;
            }
            else if (that.DetailDto.typ_dok == 140) // ng_typdokPNKS
            {
                that.DetailDto.nks_ext = that.findFields("df_nks_ext_pri").gfield("getValue").nks;
            } // end if

        }, // end function ( getField ) ------------------------------------------------------


        jsSave: function () { // otestováno 486.01T09
            var that = this;

            // sebrání hodnot z formuláře
            that.getField();
            

            // KO zda se slíznou složitější položky:
            if (that.cvDebug) console.log("Metoda saveDoklad() - KONTROLA vazeb:");
            // a) majpid.dev = df_kod_poh.majpoh.dev
            if (that.cvDebug) console.log("a) DEV:" + that.DetailDto.dev);
            if (that.cvDebug) console.log("b) A.Č.:" + that.DetailDto.ac);
            


            //---------------------------------
            // Kontrola AČ prvního dokladu
            //---------------------------------

            if (that.DetailDto.ac.trim() == "") {

                // ověří, zda se jedná o první doklad a vrátí jeho a.č.

                that.call("CheckAc", { ac: that.DetailDto.ac })
                    .done(function (retAc, content) {

                        if (that.cvDebug) console.log("Kontrola AČ vrátila toto AČ:" + retAc);

                        if (retAc !== '-') {
                            var Msg = 'jres:24534486' + ' ' + retAc + '\n\n' + //RC 24534486 : První doklad v knize bude mít evidenční číslo:
                                'jres:24534487'; //RC 24534487 : Pokud je chybně, stiskněte <Ne> a upravte formát modulem ADE!

                            that.dialogs.confirm("jres:24534073", Msg).on("close", function (ev, retVal) { //RC 24534073 : Zkontrolujte
                                if (retVal) {
                                    if (retVal === "yes") {

                                        // uložím, protože formát AČ user schválil
                                        that.jsSavePart2();
                                    } // end "yes"
                                }
                            }); // end confirm-close

                        }
                        else {

                            // uložím, protože se nejedná o první doklad knihy
                            that.jsSavePart2();

                        } // end if-else
                    }); // end CheckAc.done

            }
            else {

                // uložím, neboť AČ je již vygenerováno
                that.jsSavePart2();
                
            } // end if-else
            

        }, // end function ( jsSave ) ------------------------------------------------------


        jsSavePart2: function () {
            var that = this;

            //  380.10 27.02.18 speciální úprava ceny - dotaz na správnou částku změny
            if (that.DetailDto.pocet_pol == 0 && that.DetailDto.mp_stav == 20 && that.DetailDto.typ_ag_prim == 260 && // evidence + agenda MAJ
                (that.DetailDto.typ_dok == 350 || that.DetailDto.typ_dok == 355)) { // změna ceny

                var Msg = 'jres:24534572'; //RC 24534572 : Je požadovaná celková částka přecenění zadána správně?

                that.dialogs.confirm("jres:24534074", Msg).on("close", function (ev, retVal) { //RC 24534074 : Potvrzení
                    if (retVal) {
                        if (retVal === "yes") that.saveDokladOnServer(that.DetailDto);
                    } // end retval
                }); // end confirm

            } // end if (dotaz na správný přepočet ceny)            
            else {

                that.saveDokladOnServer(that.DetailDto);

            } // end if-else

        },  // end function ( jsSavePart2 ) ------------------------------------------------------


        saveDokladOnServer: function (majpid) {
            var that = this;

            if (that.cvDebug) console.log("Metoda saveDokladOnServer() - UKLÁDÁM doklad " + majpid.ixp + ".");

            that.call("SaveDoklad", { majpid: majpid })
                .done(function (retVal, content) {

                    // refreshDoklad( ) / setField( )
                    that.LoadDetail({ argIxp: majpid.ixp });

                    // TODO: v insert režimu nebo je-li počet položek nulový => můžu generovat řádek pro položku dokladu do tblPol
                    // If modeWin = ng_modefrmInsert or majpid.pocet_pol = 0
                    // TODO: teď aktivace nové položky
                    
                });
        }, // end saveDokladOnServer
        
       
        //======================================================================================
        jsValidateMud: function () {
            var that = this;

            if (that.DetailDto)
                that.dialogs.alert("Validaci zatím nelze provést - není realizován kód changeDokC()");

                // TODO: validace je zčásti napsána, ale chybí obsluha frmMUDPor.changeDokC( )
            else {
                // sebrání hodnot z formuláře
                that.getField();

                that.call("ValidateMud", { data: that.DetailDto })
                    .done(function (retVal, content) {

                        // zobrazím výsledek schválení
                        if (retVal && retVal.trim().len > 0) that.dialogs.messageBox("jres:24534482", retVal); //RC 24534482 : Informace

                        // refreshPol / setEnableObject / refreshRowKniha
                        that.LoadDetail({ argIxp: that.DetailDto.ixp });

                    });

            } // end ELSE (dočasné)
            
        
            
        }, // end function ( validateMud ) 

        //======================================================================================
        jsStornoMud: function () { // otestováno 486.01T09
            var that = this;
            var Msg = 'jres:24534478'; //RC 24534478 : Opravdu požadujete stornovat doklad?

            that.dialogs.confirm("jres:24534074", Msg).on("close", function (ev, retVal) { //RC 24534074 : Potvrzení
                if (retVal) {
                    if (retVal === "yes") {
                        that.dialogs.prompt(
                            "jres:24534075",  //RC 24534075 : Dotaz
                            "jres:24534477") //RC 24534477 : Důvod storna dokladu
                            .on("ok", function (ev, duvod) {
                                if (duvod && duvod.trim() !== "") {

                                    that.call("StornoMud", { ixp: that.DetailDto.ixp, stornoDuvod: duvod })
                                        .done(function (retVal, content) {
                                            // refresh zobrazení stavu dokladu, přístupnosti objektů a statusů
                                            that.LoadDetail({ argIxp: that.DetailDto.ixp });
                                            that.dialogs.messageBox("jres:24534482", "jres:24534476"); //RC 24534476 : Doklad byl úspěšně stornován.
                                        });
                                }
                                else {
                                    that.dialogs.alert("jres:24534573"); //RC 24534573 : Důvod storna musí být vyplněn!
                                    //mainDef.reject();
                                } // end if-else

                            }); // end "ok"
                    }
                }
            });
        }, // end function ( jsStornoMud ) 

        //======================================================================================
        jsMakeUctDoklad: function () { // proúčtování
            var that = this;

            // použijí se data z MAJPID (nesbírám Form)
            that.call("MakeUctDoklad", {
                ixp: that.DetailDto.ixp,        
                idTop: that.DetailDto.id_top,   
                nksExt: that.DetailDto.nks_ext,
                psFak: that.DetailDto.ps_fak,
                datUup: that.DetailDto.dat_uup
            })
                .done(function (retVal, content) {

                    that.LoadDetail({ argIxp: that.DetailDto.ixp });
                    if (retVal) that.dialogs.messageBox("jres:24534482", retVal); // zobrazím výsledek ("proúčtováno")
            });

        }, // end function ( makeUct ) 

        //======================================================================================
        jsCloseMud: function () { // uzavření
            var that = this;

            var Msg = 'jres:24534479' + '\n\n' //RC 24534479 : POZOR - nevratná operace!
                + 'jres:24534480'; //RC 24534480 : Opravdu požadujete uzavřít doklad?

            that.dialogs.confirm("jres:24534074", Msg).on("close", function (ev, retVal) { //RC 24534074 : Potvrzení
                if (retVal) {
                    if (retVal === "yes") {
                        that.call("CloseMud", { ixp: that.DetailDto.ixp, pocetPol: that.DetailDto.pocet_pol })
                            .done(function (retVal, content) {
                                that.LoadDetail({ argIxp: that.DetailDto.ixp });
                                that.dialogs.messageBox("jres:24534482", "jres:24534481"); //RC 24534481 : Doklad byl úspěšně uzavřen.
                            }); 
                    }
                }
            });
        }, // end function ( jsCloseMud ) 
       
        

        //======================================================================================
        // PRÁCE S POLOŽKAMA
        //======================================================================================


        jsInsertPol: function (ctx) {  // frmMUDPor.insertPol( )
            var that = this;


            if (that.cvDebug) {
                console.log("CALL jsInsertPol()");
                console.log(" a) that.DetailDto.mp_stav = [" + that.DetailDto.mp_stav + "]");
                console.log(" b) that.cvDivTypDok = [" + that.cvDivTypDok + "]");
                console.log(" c) that.cvNormalDok = [" + that.cvNormalDok + "]");
                console.log(" c) that.DetailDto.typ_dok = [" + that.DetailDto.typ_dok + "]");
            } // end if DEBUG


            if (that.DetailDto.mp_stav === 30 || that.DetailDto.mp_stav === 40) {
                var Msg = 'jres:24534484' + //RC 24534484 : Doklad již byl schválen nebo proúčtován.
                    '\n\n' +
                    'jres:24534485'; //RC 24534485 : Opravdu požadujete přidat další položku?

                that.dialogs.confirm("jres:24534074", Msg).on("close", function (ev, retVal) { //RC 24534074 : Potvrzení
                    if (retVal) {
                        if (retVal === "yes") {
                            //TEST-ODKOMENTUJ! jsEvidDoklad(1);

                            // TODO>  356.3 21.02.07 pokud je to doklad zpracování žádosti, načtu si data žádosti
                            if (that.DetailDto.ps_fak_stav === 4000) that.dialogs.alert('NotImplemented: insertPol.getReqHeader( ).'); // ng_typagSEM
                        }
                    }
                });
            }
            else {
                // vždy seberu potřebné údaje
                // TODO:  getField( )

                // uložení změn
                //TODO: jsEvidDoklad(0); // pokud došlo k nějaké změně na hlavičce - uložit ... zatím ukládám vždy


            } // end if-else


            // zobrazení stavu dokladu - evidence
            // TODO: setStatusLine( )


            //--------------------------------
            // tblPol.insertRow( )
            //---------------------------------
            // naplním si buffer
            // If majpid.typ_dok = ng_typdokP or majpid.typ_dok = ng_typdokPNKS
            //  getPol( bufpol.pol, OBJ_Null )
            // Else getPol( bufpol.pol, bufpol.maj )


            // initColumn( ) <= provedeno níže v ctx.ggridroweditor("addRow") a následně události ggridroweditor.start()
            var new_ser_cislo = that.DetailDto.pocet_pol + 1; // ser_cislo nakonec finálně generuji až v ggridroweditor.save()  
            

            // řízení editovatelnosti sloupců { setEnableCol( ) } <= provedeno vlastností "editor.disabled"
                                        

           // TODO: pokud se jedná o obsluhu žádosti na založení dokladu (majpid.ps_fak_stav = ng_typagSEM), pak se uživateli nabídne výběr z položek dokladu
            if (that.DetailDto.ps_fak_stav === 4000)  // ng_typagSEM
                that.dialogs.error('NotImplemented: tblPol.getReqPol( ).');   // tblPol.getReqPol( )
            else {
                // obsluha klasických dokladů

                if (
                    (that.cvDivTypDok === 1 || that.DetailDto.typ_dok === 380) // ng_typdokIZad
                    &&
                    that.cvNormalDok
                    &&
                    that.DetailDto.typ_dok !== 102 // ng_typdokAktVyr
                    &&
                    that.DetailDto.typ_dok !== 150 // ng_typdokVMzOe 
                    &&
                    that.DetailDto.typ_dok !== 110 // ng_typdokZarUzi
                )
                    that.bTblPolFocusInvCis = false;
                else
                    that.bTblPolFocusInvCis = true;
              
                ctx.ggridroweditor("addRow", {
                    // iniciuji pouze potenciálně přístupné sloupce, protože celou kolekci pak zbytečně budu přepisovat do getPol( )
                    ser_cislo: new_ser_cislo,                   
                    skupina_id: 0,
                    skupina_id_cil: 0,                    
                    inv_cis: "",
                    mat_cis: "", // mat_cis.matcis._init( )
                    ixs_maj: "", // tblPol.initColumn( )
                });                
                ctx.ggridroweditor("start"); 

            } // end if-else
            // tblPol.insertRow( ) ------------------ END


            // tímto práce "končí" 
            // prochází se editovatelné sloupce gridu ...
            // ... a čeká se na události tblPol.SAM_RowValidate( ) nebo SAM_EndCellTab( ). Zde je shodně voláno tblPol.savePol()
            // - ve WK obslouženo ggridroweditor.save() !!!

        }, // end function ( jsInsertPol ) 

        //------------------------------------------------------------------------------------

        savePolozka: function (data) { // tblPol.savePolozka( )

            var that = this;         


            if (that.cvDebug) {
                console.log("FUNCTION --- tblPol.savePolozka() ---");
                console.log(" - data.nazev = [" + data.nazev + "]"); // popisek
                // if (that.cvDebug) console.log(" - data.nazev_maj = [" + data.nazev_maj + "]");
                console.log(" - data.skp = [" + data.skp + "]"); // známe z MAT_CIS
                console.log(" - data.dan_typ = [" + data.dan_typ + "]");
                console.log(" - nTblPolZev = [" + that.nTblPolZev + "]");
                console.log(" - data.inv_cis = [" + data.inv_cis + "]");
                console.log(" - data.ixs_maj = [" + data.ixs_maj + "]");
                console.log(" - data.skupina_id = [" + data.skupina_id + "]"); // SKM
                console.log(" - data.mat_cis = [" + data.mat_cis + "]");
                console.log(" - cvNormalDok = [" + that.cvNormalDok + "]");
            } // end if

            // SKM bude vždy vybráno jinak se sem řízení nedostane (validace řádku POL)
            var skm = $(that.element).findFields("skupina_zkr").gfield("getValue");
            that.logWatch("s_unique", skm.s_unique);
            that.logWatch("skupina_odp", skm.mode_odp);



            // sejmu zadané věcičky z řádku
            //--------------------------------
            // getPol( majpol.pol,majpol.maj ) >>>>>>>>>>>
            //--------------------------------
            if (!that.majpol.pol) {
                that.dialogs.error("Proměnná 'majpol.pol' nebyla iniciována.");
                return $.Deferred().reject().promise();
            } // end if

            // majpol.pol._init( ) - již je iniciováno
            that.majpol.dat_uup = that.DetailDto.dat_uup; // majpid.dat_uup


            that.initPolFromHeader();

        
            // přiřazení : položky - PSvoboda: přiřazuji pouze ty, které se v GRIDU mohou měnit
            that.majpol.pol.ixp = that.DetailDto.ixp;
            that.majpol.pol.ser_cislo = data.ser_cislo; // vypočteno
            that.majpol.pol.skupina_id = data.skupina_id; // 1. sloupec
            //
            that.majpol.pol.skupina_id_cil = data.skupina_id_cil;  // 1. optional sloupec
            that.majpol.pol.ixs_maj = data.ixs_maj;
            if (data.inv_cis) that.majpol.pol.inv_cis = data.inv_cis; // 2. sloupec
            if (data.mat_cis) that.majpol.pol.mat_cis = data.mat_cis; // 3. sloupec
            // v závislosti na hodnotě parametru maj_dok_nazpos
            if (that.MAJ_DOK_NAZPOS)
                that.majpol.pol.nazev = data.nazev;
            else
                that.majpol.pol.nazev = data.nazev_maj;
            that.majpol.pol.m = data.m; // 4. sloupec
            //
            that.majpol.pol.c = data.c; // 5. sloupec
            if (data.cmj) that.majpol.pol.cmj = data.cmj; // 6. sloupec (non-edit)
            that.majpol.pol.c_dph = data.c_dph; // 7. sloupec
            that.majpol.pol.c_c_dph = data.c_c_dph;  // 9. sloupec
            that.majpol.pol.c_dph_odpocet = data.c_dph_odpocet;  // 8. sloupec
            // tady to přerazím na soubor dle hlavičky dokladu,
            if (that.DetailDto.typ_dok === 320 || // ng_typdokSOut
                that.DetailDto.typ_dok === 312 || // ng_typdokSlcM
                that.DetailDto.typ_dok === 322)  // ng_typdokRozM
            {
                that.majpol.pol.ixs_maj_nad = that.DetailDto.ixs_maj_nad;
                that.majpol.pol.inv_cis_soubor = that.DetailDto.inv_cis;
            } // end if
            // oprava NUMBER_Null - PSvoboda: provedeno v C# v SavePolozka()
            if (data.popis) that.majpol.pol.popis = data.popis; // 10. sloupec
            if (data.naklad_p1) that.majpol.pol.naklad_p1 = data.naklad_p1;  // 2. optional sloupec
            if (data.naklad_p2) that.majpol.pol.naklad_p2 = data.naklad_p2;  // 3. optional sloupec
            if (data.naklad_p3) that.majpol.pol.naklad_p3 = data.naklad_p3;  // 4. optional sloupec


            // přiřazení z karty (je-li)
            if (that.majpol.maj) {
                if (that.MAJ_ICO_FILL_KR && (that.DetailDto.typ_dok === 100 || that.DetailDto.typ_dok === 140)) {  // ng_typdokP + ng_typdokPNKS
                    if (that.cvDebug) console.log(" - MAJ_ICO_FILL_KR (ANO) => předplňování karty z bufferu!");
                    that.dialogs.warning("Předplnění karty z bufferu není (zatím) realizováno");

                    // TODO: předplnění z bufferu karty + odpisy!

                } // end if
                // maj_p._put364( ixs_maj,inv_cis, mat_cis, skupina_id,dev, ixs_maj_nad, id_krt_dev )
                if (data.drh_id) that.majpol.maj.drh_id = data.drh_id; // přiřazení druhu majetku pouze pod podmínkou, že drh_id>0
                that.majpol.maj.ixs_maj = data.ixs_maj;
                if (data.inv_cis) that.majpol.maj.inv_cis = data.inv_cis;
                if (data.mat_cis) that.majpol.maj.mat_cis = data.mat_cis;
                that.majpol.maj.skupina_id = data.skupina_id;
                //if (that.majpol.maj.id_krt_dev === '') that.majpol.maj.id_krt_dev = " ";
                if (!that.majpol.maj.id_krt_dev) that.majpol.maj.id_krt_dev = " ";
                if (data.nazev) that.majpol.maj.nazev_skp = data.nazev; // mat_cis.matcis.nazev - získání přes MODEL
                that.majpol.maj.zev = that.nTblPolZev; // mat_cis.matcis.zev                
                that.majpol.maj.dat_vyr = that.DetailDto.dat_uup; // předplnění datumu vyřazení - SPL to v případě nutnosti vydusí
                // pomocné
                that.majpol.maj.skupina_zkr = data.skupina_zkr;
                // maj_p.poradi = poradi // pomocná
            } // end if (MAJ != null)


            // TYTO iniciace jsou provedeny na serveru
            // inicializace Id_top karty
            //that.majpol.maj.id_top = that.DetailDto.id_top; // majpid.id_top
            // stredisko pouze pro EVS
            //if (that.cvMajInitIdTop === "EVS") that.majpol.maj.stredisko = that.DetailDto.id_top;
            //that.majpol.nazev = that.DetailDto.popis; // naplnění hodnoty popisu dokladu
            //that.majpol.ac_ext = that.DetailDto.ac_ext;
            //that.majpol.ixs_esu = that.DetailDto.ixs_esu_ext); //  kvůli přenosu dodavatele na kartu
            if (that.DetailDto.ps_fak_stav === 4000) {
                that.majpol.pol.id_ext = data.id_ext;
                that.majpol.pol.cis_ext = data.pol_ext;
            } // end if                            
            //--------------------------------
            // getPol( majpol.pol,majpol.maj ) <<<<<<<<<<< END
            //--------------------------------



            // kontrola povinných položek <= je provedena na serveru, ale některé kontroly bude třeba dát i sem!
            if (!that.checkPol(skm)) // pošlu si políčko SKM
                return $.Deferred().reject().promise(); //resolve(2).promise(); // vracím 2, tím není splněna promise!

            
            
            
            // podle typu dokladu - uložení do DB     
            //-----------------------------------
            var lTypDok = that.DetailDto.typ_dok;
            //-----------------------------------
          

            if (that.cvDivTypDok === 1) // příjmy - ng_divtypdokP
            {
                // ng_typdokP + ng_typdokPNKS  
                if (lTypDok === 100 || lTypDok === 140) return that.savePrijem(2);  // ng_modefrmInsert
                else if (lTypDok === 120) return that.savePrijem(12);  // ng_modefrmInsertNoGen
                else if (lTypDok === 102) return that.saveAktVyr();
                else if (lTypDok === 150) return that.saveVMzOe();
                else if (lTypDok === 110) return that.saveZarUzi();
                else {
                    that.dialogs.error("Neznámý typ příjmového dokladu. (kód 24534034)");
                    return $.Deferred().reject().promise(); //return 34;
                }
            }
            else if (that.cvDivTypDok === 2) // ng_divtypdokV
            {
                return that.saveVydej();
            }
            else if (that.cvDivTypDok === 3) // ng_divtypdokZ
            {
                if (lTypDok === 300) return that.saveZmena();  //
                else if (lTypDok === 305) return that.saveZmenaSk();
                else if (lTypDok === 306) return that.saveZmenaDev();
                else if (lTypDok === 350 || lTypDok === 355) return that.saveZmenaC();
                else if (lTypDok === 310) return that.saveSouborIn();
                else if (lTypDok === 320) return that.saveSouborOut();
                else if (lTypDok === 330 || lTypDok === 335 || lTypDok === 332) return that.saveResZap();
                else if (lTypDok === 340 || lTypDok === 345 || lTypDok === 342) return that.saveResRet();
                else if (lTypDok === 360) return that.saveRegTzh();
                else if (lTypDok === 362) return that.saveTzh();
                else if (lTypDok === 380) return that.saveIZad();
                else if (lTypDok === 382) return that.saveIPoz();
                else if (lTypDok === 307) return that.saveZmenaTop();
                else if (lTypDok === 312) return that.saveSlcM();
                else if (lTypDok === 322) return that.saveRozM();
                else if (lTypDok === 374) return that.saveIUO();
                else if (lTypDok === 364 || lTypDok === 365 || lTypDok === 366) return that.saveRegTzh2Nx();
                else {
                    that.dialogs.error("Neznámý typ změnového dokladu. (kód 24534035)");
                    return $.Deferred().reject().promise(); //return 35;
                }
            }
            else {
                that.dialogs.error("Neznámý DIV typu dokladu. (kód 24534033)");
                return $.Deferred().reject().promise(); // return 33;
            } // end if-else (DIV typ dok.)            

        }, // end function (tblPol.savePolozka( ))



        //------------------------------------------------------------------------------------

        // kontrola položky
        // vrací BOOL
        checkPol: function (skupina_zkr) { // tblPol.checkPol( )
            var that = this;
            var showError = true; // režim dialogu s popisem chyby

            if (that.cvDebug) console.log("FUNCTION --- tblPol.checkPol() ---");


            var errUnqInvCis = "Unikátní karta musí mít inventární číslo";
            var errMnozMatCis = "Množinová karta musí mít definováno materiálové číslo";
            var errSkmMissing = "Není určena skupina majetku";
            var errNoKrt = "Není vybrána majetková karta";
            var errInvCisMandatory = "Karta musí mít inventární číslo";


            var sErrText = "";

            //------------------------------------
            var bOk = that.majpol.pol.kod_poh > 0; // tohle vždy - je to definované přenosem z hlavičky
            if (!bOk) sErrText = "Není zadán kód majetkového pohybu";
        

            if (that.cvNormalDok) {
                //================
                // normální doklad
                //================

                //-------------
                // TYP - příjem
                //-------------

                if (that.cvDivTypDok === 1 && bOk) // ng_divtypdokP
                {
                    if (that.DetailDto.typ_dok === 102 || that.DetailDto.typ_dok === 110) // ng_typdokAktVyr || ng_typdokZarUzi
                    {

                        // unikátní karta                                         
                        if (skupina_zkr.s_unique === 1 || that.nTblPolZev === 10) {

                            bOk = that.majpol.pol.inv_cis.length > 0;
                            if (!bOk) sErrText = errUnqInvCis;

                        } // end if


                    } // end if

                    if (that.DetailDto.typ_dok === 150) // ng_typdokVMzOe
                    {

                        // musí být definována cílová skupina a materiálové nebo inventární číslo 
                        
                            bOk = that.majpol.pol.skupina_id_cil > 0;
                            if (!bOk) sErrText = "Musí být definována cílová skupina majetku";                            
                        

                        if (bOk) {
                            bOk = that.majpol.pol.inv_cis.length > 0 || majpol.pol.mat_cis.length > 0;
                            if (!bOk) sErrText = "Musí být definována materiálové nebo inventární číslo";
                        }

                    }
                    else {

                        
                        bOk = that.majpol.pol.skupina_id > 0;
                        if (!bOk) sErrText = errSkmMissing;
                        

                        // blokace průchodu bez zadání
                        if (that.nTblPolZev != 10 && bOk) // != ng_zevUnik
                        {
                            bOk = that.majpol.pol.mat_cis.length > 0;
                            if (!bOk) sErrText = errMnozMatCis;
                        }

                    } // end if-else

                    // 376.2 22.09.15 pokud jsou rozdíílná znaménka m a c, dotaz
                    if (that.majpol.pol.m * that.majpol.pol.c < 0)
                        //that.showFlash("POZOR - dořešit: Položka dokladu s rozdílnými znaménky množství a ceny", "g-state-warning", 2500, "id-tblPol-row-MaC");
                        that.dialogs.warning("Položka dokladu má rozdílné znaménko ceny a množství.");
                    // bOk = Msg._question( 'Opravdu požadujete provést položku dokladu s rozdílnými znaménky množství a ceny' )

                } // end if (DIV P)

                //-------------
                // TYP - výdej
                //-------------
                else if (that.cvDivTypDok === 2 && bOk) // ng_divtypdokV
                {
                    // unikátní karta                    
                    if (skupina_zkr.s_unique === 1 || that.nTblPolZev === 10) {

                        bOk = that.majpol.pol.inv_cis.length > 0;
                        if (!bOk) sErrText = errUnqInvCis;

                    }
                    // množinová karta
                    else if (that.nTblPolZev !== 10) {

                        bOk = that.majpol.pol.mat_cis.length > 0;
                        if (!bOk) sErrText = errMnozMatCis;

                    }
                } // end else-if (DIV V)

                //-------------
                // TYP - změny
                //-------------
                else if (that.cvDivTypDok === 3 && bOk) // ng_divtypdokZ
                {
                    // ošetření interní žádanky
                    if (that.DetailDto.typ_dok === 380) // ng_typdokIZad
                    {
                        bOk = that.majpol.pol.ixs_maj.length === 12 || that.majpol.pol.skupina_id > 0;
                        if (!bOk) sErrText = "Není vybrána majetková karta anebo není určena skupina majetku";

                        // blokace průchodu bez zadání
                        if (that.nTblPolZev !== 10 && bOk) // mat_cis.matcis.zev
                        {
                            bOk = that.majpol.pol.mat_cis.length > 0;
                            if (!bOk) sErrText = errMnozMatCis;
                        }

                    }
                    else if (that.DetailDto.typ_dok === 322) // ng_typdokRozM
                    {

                        // pokud rozdělují kartu, může vzniknout karta nová
                        bOk = that.majpol.pol.skupina_id > 0;
                        if (!bOk) sErrText = errSkmMissing;

                    }
                    // manipulace s registrem TZH - záznamy se předávájí v tabulce
                    else if (that.DetailDto.typ_dok === 364 ||  // ng_typdokRegTzh2Na
                        that.DetailDto.typ_dok === 365 ||   // ng_typdokRegTzh2Nv
                        that.DetailDto.typ_dok === 366      // ng_typdokRegTzhNm2Na
                    ) {
                        // -nop-
                    }
                    else {

                        bOk = that.majpol.pol.ixs_maj.length === 12;
                        if (!bOk) sErrText = errNoKrt;

                    } // end if-else


                } // end if-else

            }
            //===================
            //  stornovací doklad
            //===================
            else {

                //-------------
                // TYP - změny
                //-------------
                if (that.cvDivTypDok === 3 && bOk) // ng_divtypdokZ
                {
                    // u storna tzh znám inv_cis
                    if (that.DetailDto.typ_dok === 362) // ng_typdokTzh
                    {

                        bOk = that.majpol.pol.inv_cis.length > 0;
                        if (!bOk) sErrText = errInvCisMandatory;

                    }
                    // manipulace s registrem TZH - záznamy se předávájí v tabulce
                    else if (that.DetailDto.typ_dok === 364 ||  // ng_typdokRegTzh2Na
                        that.DetailDto.typ_dok === 365 ||   // ng_typdokRegTzh2Nv
                        that.DetailDto.typ_dok === 366      // ng_typdokRegTzhNm2Na
                    ) {
                        // -nop-
                    }
                    else {

                        bOk = that.majpol.pol.ixs_maj.length === 12;
                        if (!bOk) sErrText = errNoKrt;

                    } // end if-else
                }

                //-------------
                // ostatní
                //-------------
                else if (bOk) {
                    
                    // unikátní karta                                                                      
                    if (skupina_zkr.s_unique === 1 || that.nTblPolZev === 10) // skupina_zkr.skupina.s_unique
                    {

                        bOk = that.majpol.pol.inv_cis.length > 0;
                        if (!bOk) sErrText = errUnqInvCis;

                    }
                    // množinová karta
                    else if (that.nTblPolZev !== 10) // 10 = ng_zevUnik
                    {

                        bOk = that.majpol.pol.mat_cis.length > 0;
                        if (!bOk) sErrText = errMnozMatCis;

                    }

                } // end if-else

            } // end if-else (normalDok / stornovací )


            
            if (bOk) {
                if (that.cvDebug) console.log(" - Položka byla validována - OK");
            }
            else {
                if (showError) that.dialogs.error(sErrText); // ukážu text chyby

                //that.showFlash("Pořizovaný řádek neprošel validací!", "g-state-warning", 2500, "id-tblPol-row-not-valid");                
                if (that.cvDebug) console.log(" - Položka byla validována - NENÍ VALIDNÍ");            
            } // end if (bOk)

            
            return bOk;

        }, // end function ( checkPol )

        //------------------------------------------------------------------------------------

        // kontrola existence ZEV pro danou SKM a MAT_CIS
        checkZev: function (matCis, skupinaId) {  // tblPol.checkZev( ) 
            var that = this;            

            if (that.cvDebug) console.log("FUNCTION --- tblPol.checkZev( ) ---");            
            that.logWatch("met_skl pro id_top", that.cvIdTopMetSkl);


            var def = $.Deferred();
            
            if (that.cvIdTopMetSkl === 0) //ng_metsklAvg 
            {
                // pokud je kmenový list definován, vracím OK
                if (that.nTblPolZev !== 0) // ng_zevNone
                {
                    // OK
                    def.resolve();
                }
                else {
                    //that.dialogs.warning("jres:24534605"); //RC 24534605 : Požadované materiálové číslo nemá prozatím definován způsob evidence v rámci dané skupiny majetku.                    
                   

                    Gordic.Maj.WebClient.Dialogs.GDlgZpusobEvMatCisla.showDlg({ // dlg_Klm
                        related: that, data: {
                            mat_cis: matCis,
                            skupina_id: skupinaId,
                            zev: null
                        }
                    })
                        .done(function (retVal, content) {
                            that.nTblPolZev = retVal.zev;
                            that.logWatch("Založen kmenový list se ZEV", retVal.zev);
                            def.resolve();
                        })
                        .fail(function () {
                            def.reject();
                        });

                    //def.reject();
                   
                } // end if-else

            }
            else { // 
                // pro FIFO a LIFO nastavím metodu rozlišení pomocí šarže
                that.nTblPolZev = 130; // ng_zevMnozSarze - množinová karty s rozlišením šarží
                def.resolve();
            } // end if*else


            return def.promise();
                                                       
        }, // end function ( checkZev )

       
        //------------------------------------------------------------------------------------
                                                   
        // logování WATCH
        logWatch: function (watchName, watchVal) {
            var that = this;

            if (that.cvDebug) console.log(" - @ " + watchName + ": [" + watchVal + "]");
        }, // end function ( logWatch )

        //------------------------------------------------------------------------------------

        // test unikátnosti majetku (buď podle příznaku na SKM anebo podle ZEV)
        _isMajUnique: function (s_unique, zev, noExistKrt) { // frmMUDPor.tblPol._isMajUnique( )

            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- tblPol._isMajUnique( ) ---");
            that.logWatch("s_unique", s_unique);
            that.logWatch("ZEV", zev);
            that.logWatch("noExistKrt", noExistKrt);

            var isUnq =
                s_unique === 1 // ng_suniqueUnik
                ||
                zev === 10 // ng_zevUnik
                ||
                (zev === 100 && noExistKrt) // ng_zevMnoz
                ||
                zev === 110 || zev === 112 || zev === 120 || zev === 130 || zev === 140;  // ng_zevMnozVyrCis / ng_zevMnozEviCis / ng_zevMnozSerCis / ng_zevMnozSarze / ng_zevMnozPorCis
            


            that.logWatch("RET", isUnq);

            return isUnq;
        }, // end function ( _isMajUnique )

        //------------------------------------------------------------------------------------

        savePrijem: function (mode) { // tblPol.savePrijem( )

            var that = this;
           
            
            if (that.cvDebug) console.log("FUNCTION --- tblPol.savePrijem() ---");
            that.logWatch("cvNormalDok", that.cvNormalDok);
            that.logWatch("mode_p", mode); // režim detailu karty



            if (that.cvNormalDok) {

                // obsluha havarijního režimu NKS
                if (that.DetailDto.typ_dok === 120 && that.DetailDto.priz_tunel) // ng_typdokPP
                {
                    // cena a množství zadané na kartě do pohybu
                    that.majpol.pol.m = that.majpol.maj.pmj;
                    that.majpol.pol.c = that.majpol.maj.c;
                    that.majpol.maj.dat_vyr = that.DetailDto.dat_uup;

                    // pokus o insert položky 
                    return that._setPohInsert();

                }
                else {


                    if (that.cvDebug) console.log("SRV-CALL --- CheckKtgPohGetPrizTzh() ---");                   
                    that.logWatch("skupinaId", that.majpol.pol.skupina_id);
                    that.logWatch("kodPoh", that.DetailDto.kod_poh);
                    that.logWatch("typDok", that.DetailDto.typ_dok);
                    that.logWatch("dev", that.DetailDto.dev);


                    // kontrola KTG_POH a načtení PRIZ_TZH
                    return that.call("CheckKtgPohGetPrizTzh", {
                        ktgPoh: 100, // ng_ktgpohPorizeni
                        skupinaId: that.majpol.pol.skupina_id,
                        //
                        kodPoh: that.DetailDto.kod_poh, // majpid.kod_poh 
                        typDok: that.DetailDto.typ_dok, // majpid.typ_dok
                        dev: that.DetailDto.dev, // majpid.dev
                    })
                        .then(function (retVal, content) {

                            // definice stavu karty dle kategorie pohybu
                            if (retVal.checkKtgPoh)
                                that.majpol.maj.mat_akt = 18; // ng_majaktPor
                            else
                                that.majpol.maj.mat_akt = 20; // ng_majaktEvi

                            // příznak realizace obsluhy TZH se předá dál
                            // TODO: ODPIS: Set majpol.uct.priz_tzh = majpoh.b_priz_tzh

                            if (that._isMajUnique(that.nTblPolSUnq, that.nTblPolZev, that.bTblPolNoExistKrt)) {

                                // inicializace dodavatele z dokladu
                                if (mode === 2) // ng_modefrmInsert
                                    that.majpol.maj.ixs_esu_dod = that.DetailDto.ixs_esu_ext; // majpid.ixs_esu_ext


                                var defKRT = $.Deferred();
                                // do karty musím poslat informaci o tom, že je zpracováván požadavek na založení dokladu  - pokud má existující inv. číslo, pak je nutné ho respektovat
                                // SalModalDialog( dlg_MajKarta,tblPol.hWndParent, mode_p, majpol, ng_parentwinFrmDoc, majpid.ps_fak_stav, majreq.typ_zdroj ) <= 0
                                that.dialogs.showModalWindow("Gordic.Maj.WebClient.GMajKarta", {
                                    argMode: mode,
                                    argMajpol: that.majpol,
                                    argParent: 0, // ng_parentwinFrmDoc
                                    argModeReq: that.DetailDto.ps_fak_stav,
                                    // TODO: majreq.typ_zdroj
                                }, "", 1024, 768, true) //zobrazení karty
                                    .on("close", function (ev, returnValue) {

                                        if (returnValue) { // bylo vráceno DTO

                                            that.majpol.maj = returnValue; // nové údaje MAJ karty

                                            // cena a množství zadané na kartě do pohybu
                                            that.majpol.pol.m = that.majpol.maj.pmj;
                                            that.majpol.pol.c = that.majpol.maj.c;
                                            // přiřazení ceny dph a celkové ceny
                                            that.majpol.pol.c_dph = that.majpol.maj.c_dph;
                                            that.majpol.pol.c_c_dph = that.majpol.maj.c_c_dph;
                                            that.majpol.pol.c_dph_odpocet = that.majpol.maj.c_dph_odpocet;
                                            // předplnění datumu vyřazení - SPL to v případě nutnosti vydusí
                                            // zde to je pro případ, že projde kartou a tam je dat_vyr nulován 
                                            // dat_vyr je inicializován pro případ výdeje ze zrcadla
                                            that.majpol.maj.dat_vyr = that.DetailDto.dat_uup; // majpid.dat_uup;


                                            that._setPohInsert()
                                                .then(function (result) {
                                                    defKRT.resolve(result); // dialog byl zavřen OK a data byla uložena
                                                })
                                                .fail(function () {
                                                    defKRT.reject(); // neúspěch
                                                });  
                                               
                                        }
                                        else defKRT.reject(); // end if-else (returnValue)

                                    });                               
                               
                                return defKRT.promise();

                            } // end if (isMajUnique)
                            else
                                return that._setPohInsert();

                        }); // end then (CheckKtgPohGetPrizTzh)
                    
                } // end if-else (priz_tunel)

            }
            else
                return that._setPohInsert();
                                    

        }, // end function (savePrijem)

          

        //----------------------------------------------
        // jednotný jeden blok pro volání uložení do DB
        //----------------------------------------------
        _setPohInsert: function () {

            var that = this;

            if (that.cvDebug) console.log("FUNCTION --- _setPohInsert() ---");
            

            // pokus o insert položky 
            return that.call("SetPohInsert", { // zkusím si poslat jen IXP a SER_CISLO - všechna data jsou na serveru a dojdu si pro ně na serveru
                majpid: that.DetailDto,
                majpol: that.majpol,
                normalDok: that.cvNormalDok,
            })
                .then(function (retVal, content) {
                    //that.showFlash("Uložení karty do databáze ZATÍM NEPROBĚHLO", "g-state-warning", 2500, "id-tblPol-row-not-saved");
                    that.showFlash("Položka byla uložena", "g-state-success", 2000, "id-tblPol-row-saved");


                    // KROK 1 - naplnit změněná DATA do tblPol
                    //data = retVal;

                    //-----------------
                    // tblPol.setPol( ) >>>>>>>>>>>>>>>>
                    //-----------------

                    // prozatímní načtení údajů o dokladu
                    if (!(that.cvDivTypDok === 1 || that.cvDivTypDok === 2)) // ng_divtypdokP OR ng_divtypdokV
                        // reload ! selectMUDOnly( )
                        //that.dialogs.warning("Doplnit prozatímní selectMUDOnly( )");
                        console.log("TODO: SetPohInsert().then() -  Doplnit prozatímní selectMUDOnly( ) ?")

                    // občerstvení okamžiku změny
                    that.DetailDto.dat_zmena = that.majpol.dat_zmena;

                    // počet položek a ceny
                    that.DetailDto.pocet_pol = that.majpol.pocet_pol;
                    that.DetailDto.c_c = that.majpol.c_c; // majpid.c_c = majpol.c_c
                    that.DetailDto.c_c_dph = that.majpol.c_c_dph; // majpid.c_c_dph = majpol.c_c_dph

                    // setStatusLine( ) <<<<<<<<<<                    
                    that.kpis.df_pocet_pol.data = that.DetailDto.pocet_pol;
                    that.kpis.df_pocet_pol.value = that.DetailDto.pocet_pol;
                    that.kpis.df_c_c.data = that.DetailDto.c_c;// TODO: neee!!! df_c_pri nebo df_c_c
                    that.kpis.df_c_c.value = that.DetailDto.c_c;
                    that.kpis.df_c_c_dph.data = that.DetailDto.c_c_dph; // TODO: neee!!! df_c_c_dph nebo df_c_c_mena
                    that.kpis.df_c_c_dph.value = that.DetailDto.c_c_dph;
                    that.kpis.update();
                    // >>>>>>>>>>>>>> setStatusLine( )

                    // po hromadné operaci reselect tblPol
                    if (that.majpol.countMaj > 1
                        || that.DetailDto.typ_dok === 362 // ng_typdokTzh
                        || that.DetailDto.typ_dok === 350 // ng_typdokZcPlus
                        || that.DetailDto.typ_dok === 355 // ng_typdokZcMinus
                        || that.DetailDto.typ_dok === 306 // ng_typdokZDev
                        || that.DetailDto.typ_dok === 374 // ng_typdokIUO
                        || that.DetailDto.typ_dok === 364 // ng_typdokRegTzh2Na
                        || that.DetailDto.typ_dok === 365 // ng_typdokRegTzh2Nv
                        || that.DetailDto.typ_dok === 366 // ng_typdokRegTzhNm2Na
                    ) {
                        that.dialogs.alert("NENÍ DOKONČENO - setPol( ) pro určité typ_dok nebo hromadné operace");
                    }
                    else {
                        // načtu si údaje položky a promítnu je do tbl
                        // majpol._selectPol( majpid.typ_dok )    PSvoboda: to už jsem provedl v C#

                        // TODO: název v závislosti na hodnotě parametru
                        // nazev =
                        // nazev_maj = 

                        // TODO: naplnění bufferu položky
                        // bufpol._copy( majpol )
                    } // end if-else

                    // <<<<<<<<<<<<<<< tblPol.setPol( )

                    // pořízený řádek tblPol
                    return $.Deferred().resolve(retVal).promise(); //return data;
                });
                //.fail(function () {
                //    return $.Deferred().reject().promise();
                //});          

        }, // end function (_setPohInsert)


        //------------------------------------------------------------------------------------

        setContextRowPol: function (polRow) {  // tblPol.setContextRowAlw( )
            var that = this;
            if (that.cvDebug) console.log("FUNCTION --- tblPol.setContextRowPol() ---");

            that.majpol = {};
            that.majpol.maj = {};

            //-------------------------
            // minimalistický getPol( )
            //-------------------------
            // přenos data UUP
            that.majpol.dat_uup = that.DetailDto.dat_uup;
            that.initPolFromHeader();
            that.majpol.maj.ixs_maj = polRow.ixs_maj;
            that.majpol.maj.skupina_id = polRow.skupina_id;
            that.majpol.maj.drh_id = polRow.drh_id;            
            that.majpol.maj.zev = 0; // matcis.init( )

        }, // end funct ( setContextRowPol )

        //------------------------------------------------------------------------------------

        initPolFromHeader: function () {  // tblPol.initPolFromHeader( )
            var that = this;
            if (that.cvDebug) console.log("FUNCTION --- tblPol.initPolFromHeader() ---");
           
            that.majpol.nks_ext = that.DetailDto.nks_ext; // majpid.nks_ext
            that.majpol.id_top = that.DetailDto.id_top;
            that.majpol.dat_zmena = that.DetailDto.dat_zmena;
            //  definice termínu u zápůjčky
            if (that.DetailDto.typ_dok === 330 || // ng_typdokResZap
                that.DetailDto.typ_dok === 335 || // ng_typdokResOpT
                that.DetailDto.typ_dok === 332)  // ng_typdokResZapI
            {
                that.majpol.dat_uup = that.DetailDto.dat_uup; // majpid.dat_uup
                that.majpol.dat_termin = that.DetailDto.dat_termin; // majpid.dat_termin
            }
            // definice vrácení majetku ze zápůjčky
            else if (that.DetailDto.typ_dok === 340 || // ng_typdokResRet
                that.DetailDto.typ_dok === 345 || // ng_typdokResOpF
                that.DetailDto.typ_dok === 342)  // ng_typdokResRetI
            {
                that.majpol.dat_uup = that.DetailDto.dat_uup; // majpid.dat_uup
                that.majpol.dat_termin = null; // TODO:  DATETIME_Null
            }
            // zařazení do užívání
            else if (that.DetailDto.typ_dok === 110) // ng_typdokZarUzi
            {
                that.majpol.dat_uup = that.DetailDto.dat_uup; // majpid.dat_uup
            }// end if-else
            // přiřadím si to vždy, bez ohledu na typ dokladu
            that.majpol.ixs_esu = that.DetailDto.ixs_esu_ext;
            if (that.DetailDto.esu_txt)
                that.majpol.esu_txt = that.DetailDto.esu_txt.substring(1, 50); // omezení délky kvůli Oracle                        

        }, // end funct ( initPolFromHeader )

       
        //------------------------------------------------------------------------------------

        jsStornoPol: function (polRow) {  // frmMUDPor.stornoPol( )

            var that = this;                        

            if (that.MAJ_RAD_DOKMPP == 1) that.dialogs.prompt(
                "jres:24534075",  //RC 24534075 : Dotaz
                "jres:24534593") //RC 24534593 : Důvod storna položky dokladu
                .on("ok", function (ev, duvod) {
                    if (duvod && duvod.trim() !== "") {
                        
                        that.jsStornoPol_2(polRow, duvod);
                        
                    }
                    else {

                        that.dialogs.alert("jres:24534573"); //RC 24534573 : Důvod storna musí být vyplněn!                        

                    } // end if-else

                }); // end "ok"          
            else {
                // není třeba zdůvodnit, tak jdeme rovnou stornovat
                that.jsStornoPol_2(polRow, "");
                
            } // end if-else            

        }, // end funct ( jsStornoPol ) ------------------------------------------------------


        jsStornoPol_2: function (polRow, duvodSto) {  // frmMUDPor.stornoPol( )
            var that = this;            

            var def0 = new $.Deferred();

            if (that.DetailDto.mp_stav === 30 || that.DetailDto.mp_stav === 40) {

                var Msg = 'jres:24534484' + //RC 24534484 : Doklad již byl schválen nebo proúčtován.
                    '\n\n' +
                    'jres:24534592'; //RC 24534592 : Opravdu požadujete storno vybrané položky?

                that.dialogs.confirm("jres:24534074", Msg).on("close", function (ev, retVal) { //RC 24534074 : Potvrzení
                    if (retVal && retVal === "yes")
                        def0.resolve();
                    else
                        def0.reject();

                });
            }
            else {
                // tblPol.stornoPol( )

                var Msg = 'jres:24534592'; //RC 24534592 : Opravdu požadujete storno vybrané položky?                    


                that.dialogs.confirm("jres:24534074", Msg).on("close", function (ev, retVal) { //RC 24534074 : Potvrzení
                    if (retVal && retVal === "yes")
                        def0.resolve();
                    else
                        def0.reject();

                });
            } // end if-else


            def0.done(() => {
                // nastavení stavu na Evidence // TODO: potřebuji??
                // TODO: Pozor, EvidDoklad provede reload a TO NECHCI!
                //that.jsEvidDoklad(1);

                // zobrazení stavu dokladu - evidence
                // Call setStatusLine(  )
              

                // pošlu si pozici řádku              
                if (that.cvDebug) console.log("SRV-CALL GMajDokladDetail.StornoPol(), ser_cislo=" + polRow.ser_cislo + ", duvod=" + duvodSto);

                that.call("StornoPol", { // zkusím si poslat jen IXP a SER_CISLO - všechna data jsou na serveru a dojdu si pro ně na serveru
                    ixp: that.DetailDto.ixp,
                    serCislo: polRow.ser_cislo,
                    duvod: duvodSto,
                })
                    .done(function (retVal, content) {
                        // that.LoadDetail({ argIxp: that.DetailDto.ixp });
                        that.dialogs.messageBox("Cajk"); // TODO: refresh gridu
                    });

                // po stornu ihned volám nastavení přístupů
                // TODO: Call setEnableObject( )
            });

        }, // end funct ( jsStornoPol ) ------------------------------------------------------
        

        //======================================================================================
        // OVLÁDÁNÍ UI
        //======================================================================================

        VyberDatumuDialog: function (datum) {
            if (datum === void 0) { datum = new Date(0); }
            return new Gordic.Forms.Form().addRow("Datum UÚP").addField("gdatebox", { name: "dat_uup", initialValue: moment(datum).isSame(new Date(0), "day") ? null : datum, validators: [new Gordic.Validators.Required()] });
        }, // end function

         
        VyberTextuDialog: function (boxtitle, len) {           
            if (boxtitle === null) { boxtitle = ""; }
            if (len === null) { len = 254; }
            return new Gordic.Forms.Form().addRow(boxtitle).addField("gstringbox", { name: "ret_str", initialValue: "", validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ max: len, message: "Maximální délka textu je " + len + "!" })] });
        }, // end function

        //======================================================================================

        //   378.9 09.03.17 zadání požadovaných topologických údajů pro budoucí umístění převáděného majetku - ty budou uloženy do tabulky s přenášenými údaji MAJXPOC
        changeKodPoh: function (obj) {
            var that = this;

            // změna DEV - DEV se přímo převezme z vybraného maj. pohybu
            that.findFields("df_dev").gfield("setValue", { dev: obj.value["dev"], dev_zkr: obj.value["dev_zkr"] }, true);


            // frmMUDPor.setNksExt( ) -------------------------
            // - nastaví filtr "nks_cil" na políčku df_nks_ext - zajištěno v .JS funkcí nad filtrem df_nks_ext.nks_cil

            // a pokud je to VP - vygumuju hodnotu (s výjimkou hospodáře na BIS) - zajištěno v .JS a také na serveru
            if (that.DetailDto.typ_dok == 220 || that.DetailDto.typ_dok == 380) // ng_typdokVP  /  ng_typdokIZad
            {
                var delNKS = true;

                if (that.cvBisHosp) {
                    var val = that.formsCollection.findFields("df_kod_poh").gfield("getValue");
                    if (val && val.nks_cil == "KOMP") delNKS = false;
                } // end if

                if (delNKS) that.findFields("df_nks_ext").gfield("setValue", "");
            } // end if
            //--------------------------------------------------


            // STORNO flag
            if (that.cvDebug) console.log("changeKodPoh(), df_kod_poh.storno_poh=" + obj.value["storno_poh"]);
            var stornoPohTxt = "";
            var stornoDok = obj.value["storno_poh"] == 1;      // příznak storno pohybu (např. 3091 - storno TZH)                              
            if (stornoDok) stornoPohTxt = "jres:24534357".toUpperCase(); //RC 24534357 : Storno

            var stornoStat = $(".maj-storno")[0]; // najdu komponentu
            stornoStat.innerText = stornoPohTxt; // nastavím
            
                       
            // nastavení povinnosti párovacího symbolu - kombinace klíče v číselníku a parametru DB
            if (that.cvDebug) console.log("changeKodPoh(), maj_dok_prizps=" + that.maj_dok_prizps);
            if (that.cvDebug) console.log("changeKodPoh(), df_kod_poh.priz_ps=" + obj.value["priz_ps"]);
            
            if (obj.value["priz_ps"] == 1 && that.maj_dok_prizps == 1) // FK
                that.findForms("FormDoklad").findFields("df_ps_fak").gfield("option", { flag: Gordic.Prefabs.Field.Flags.required });


            // TODO: naplnění příznaku, že se jedná o doklad s možností obsluhy přirážky
            // PSvoboda: máme to řešeno v CS v metodě SetKtgPoh(), tak zatím nevím, zda to bude třeba dávat do skriptu
            // frmMUDPor.setKtgPoh( )          
           

        },  // end function


        //====================================================================================== 

        //   378.9 09.03.17 zadání požadovaných topologických údajů pro budoucí umístění převáděného majetku - ty budou uloženy do tabulky s přenášenými údaji MAJXPOC
        jsGetNewTopolPP: function (ixpVaz) {

            // Call l_majpol._init(  )
            // Call l_majpolint._init(  )

            //  uloží vazební dokald
            // Set l_majpol.pol.ixp_bnd = ixp_vaz_p

            // If SalModalDialog( dlg_MajZmenaTop, hWndForm, l_majpol, l_majpolint, -1, FALSE ) > 0
            this.dialogs.showWindow("Gordic.Maj.WebClient.GZmenaTopologie", {}, "", 900, 600, true);

            //  uložení požadovaných hodnot
            // Set nRet = l_majpol._setNewTopolPP( )
            // TODO: volání GMajetek.ZmenaTopologie();

        },  // end function

        //======================================================================================


        setMena: function () {
            
            var that = this;
            if (that.cvDebug) console.log("frmMUDPor.setMena():");

            // that.findForms("FormDoklad").findFields("df_mena")            
            var mena_kod = that.findFields("df_mena").gfield("getValue") == null ? 0 : that.findFields("df_mena").gfield("getValue").mena;
            if (that.cvDebug) console.log(" - mena:" + mena_kod);                        

            
            //that.DetailDto.mena = mena_kod;

            if (mena_kod == 0) {
                that.findFields("df_kurz").gfield("setValue", 1);

              //  that.DetailDto.kurz = 1;
                that.DetailDto.m_kurz = 1;
            }
            else {
                // TODO: bOk = getKurz() 
                that.dialogs.alert("Nelze načíst kurz!")

                that.findFields("df_mena").gfield("setValue", { mena: 0, mena_zkr: "CZK" }, true);

                that.findFields("df_kurz").gfield("setValue", 1);

               // that.DetailDto.kurz = 1;
                that.DetailDto.m_kurz = 1;

            } // end if-else


            // TODO: jméno sloupce cizí měny v položce tblPol.c_mena            
            // Call SalTblSetColumnTitle( tblPol.c_mena, 'Cena v ' || df_mena )

            // TODO: řízení viditelnosti sloupce s měnou + kurzen
            // Call SalSendMsg( tblPol.c_mena, GM_SetVisible, 0, 0 )
            // Call SalSendMsg( tblPol.kurz, GM_SetVisible, 0, 0 )
            
        }, // end function

        //======================================================================================

        setCWithDph: function () { // frmMUDPor.setCWithDph( )

            var that = this;

            if (that.init_dph_priz) return true;

            // pokud byl příznak manuálně na dokladu nastaven, nastavení se zachová
            // If init_dph_priz  ret true;
            if (that.cvEkoDphPlatce == 0) {
                // nejsem plátce - zadávám s DPH                                                
                that.findFields("cb_with_dph").gfield("setValue", true)
            }
            else {
                // jsem plátce - zadávám bez DPH                                                
                that.findFields("cb_with_dph").gfield("setValue", false)
                that.findFields("cb_odpocet_dph_no").gfield("setValue", false)
                // defaultně bude uplatňován odpočet
            }

        }, // end function (setCWithDph)

        //======================================================================================

        // skrývání a zobrazování prvků
        //setHeaderView: function (that, typ_dok) {

        //    //--------------------------------------------------------------------
        //    console.log("GMajDokladDetail.setHeaderView();");
        //    console.log(" - typ_dok=" + typ_dok);
        //    console.log(" - DetailDto.typ_dok=" + that.DetailDto.typ_dok);
        //    console.log(" - cvDphPlatce=" + that.cvDphPlatce);
        //    console.log(" - cvPidSPrij=" + that.cvPidSPrij);

        //    //--------------------------------------------------------------------

        //    // zneviditelnění NKS příjemce pro PNKS
        //    that.element.findFields("df_nks_ext_pri").gfield("option", "disabled", typ_dok !== 140);  // zobrazeno/editovatelné pouze u PNKS

        //    // spotřeba (likvidace, TZH)
        //    var bSpotreba = typ_dok === 201 || typ_dok === 364 || typ_dok === 365 || typ_dok === 366;
        //    that.element.findForms("FormSpotreba").gtab("option", "visible", bSpotreba); // vyroluju formulář spotřeby
        //    that.element.findFields("df_ixs_orj_nak").gfield("option", "disabled", bSpotreba === false);
        //    that.element.findFields("df_ixs_ref_nak").gfield("option", "disabled", bSpotreba === false);
        //    that.element.findFields("df_stredisko").gfield("option", "disabled", bSpotreba === false);            
        //    that.element.findFields("df_trida").gfield("option", "disabled", bSpotreba === false);
        //    that.element.findFields("df_objekt").gfield("option", "disabled", bSpotreba === false);
        //    that.element.findFields("df_ext_1").gfield("option", "disabled", bSpotreba === false);
        //    that.element.findFields("df_ext_2").gfield("option", "disabled", bSpotreba === false);
        //    that.element.findFields("df_ext_3").gfield("option", "disabled", bSpotreba === false);
        //    // TODO: u spotřeby - SalShowWindow( tblPol.skupina_cil_zkr )  -354.12 23.03.06 - zobarzení cílové skupiny v tbl položek

        //    // zápůjčky (opravy)
        //    that.element.findFields("df_dat_termin").gfield("option", "disabled", (typ_dok === 330 || typ_dok === 332 || typ_dok === 335) === false); // viditelné a přístupné pouze u
        //    that.element.findFields("cmb_res_typ").gfield("option", "disabled", (typ_dok === 332 || typ_dok === 342) === false); // viditelné a přístupné pouze u interní zápůjčky
        //    // TODO: nezapomeň na obsluhu "cmb_res_typ"

        //    // manipulace se souborem
        //    that.element.findFields("df_inv_cis_sou").gfield("disable");   // povolí se až v setHeaderViewInvCis()
        //    // TODO: that.element.findFields("pbTzh").gfield("option", "disabled", true);
        //    // TODO: Call picTabs.HideWindow( pb_karta_h )  // povolí se až v setHeaderViewInvCis()

        //    // název ESU
        //    var sLblEsu = "jres:24534515"; //RC 24534515 : Dodavatel/Odběratel
        //    var sLblExt = that.df_nks_ext.Label;

        //    that.element.findFields("df_ixs_ref").gfield("disable");

        //    var bZmenyCen =
        //        typ_dok === 300 ||
        //        typ_dok === 305 ||
        //        typ_dok === 370 ||
        //        typ_dok === 305 ||
        //        typ_dok === 372 ||
        //        typ_dok === 307 ||
        //        typ_dok === 101 ||
        //        typ_dok === 102 ||
        //        typ_dok === 150 ||
        //        typ_dok === 110 ||
        //        typ_dok === 371 ||
        //        typ_dok === 374;

        //    that.element.findFields("df_ac_ext").gfield("option", "disabled", bSpotreba || bZmenyCen || typ_dok === 332 || typ_dok === 342);
        //    that.element.findFields("df_dat_ext").gfield("option", "disabled", bSpotreba || bZmenyCen || typ_dok === 332 || typ_dok === 342); // stejné jako "df_ac_ext"            

        //    // 341.1 07.09.01 - v případě, že doklad byl ukraden z WFL, pak má majpid.pid.s_prij = 1 
        //    // => vynutím zobrazení údajů o externím subjektu - 
        //    // => vpodstatě simuluju příjem
        //    // => doplním podmínku ng_typdokP o(majpid.pid.s_prij = 1  and df_typ_dok.typ_dok = ng_typdokNone) - nesmí být dán typ dokladu
        //    var bSimulP = typ_dok === 0 && that.cvPidSPrij;

        //    // řízení viditelnosti příznaku ceny s DPH            
        //    that.element.findFields("cb_with_dph").gfield("option", "disabled", (typ_dok === 100 || bSimulP || typ_dok === 140) === false); // Příjem či PNKS            
        //    that.element.findFields("cb_odpocet_dph_no").gfield("option", "disabled", ((typ_dok === 100 || bSimulP || typ_dok === 140) && that.cvDphPlatce) === false); // Příjem či PNKS + plátce DPH
        //    // TODO: df_c_dotace - toto zatím řídím jen při reloadu 
        //    //that.element.findFields("df_c_dotace").gfield("option", "disabled",(                
        //    //    typ_dok === 100 || bSimulP || typ_dok === 120 || typ_dok === 140 ||    // s_prij, Příjem, PP či PNKS
        //    //    typ_dok === 350 || typ_dok === 355 || typ_dok === 360 || typ_dok === 362  // navýšení + snížení ceny, RTZH a TZH 
        //    //    ) === false);            
        //    // TODO: odkomentovat: that.element.findFields("df_c_c_zmena").gfield("option", "disabled", (typ_dok === 350 || typ_dok === 355 || typ_dok === 360 || typ_dok === 362) === false); // navýšení + snížení ceny, RTZH a TZH            

        //    // TODO: Set divTypDok = gf_Div( df_typ_dok.typ_dok,100 )

        //    // Rozhodnu zda ESU nebo NS/ES
        //    var bEsuVisible = // viditelné u ...
        //        typ_dok === 100 || bSimulP || typ_dok === 140 || // Příjem a PNKS                
        //        typ_dok === 200 || typ_dok === 306 || // výdej a ZDev
        //        typ_dok === 350 || typ_dok === 355 || typ_dok === 360 || typ_dok === 362 || // navýšení + snížení ceny, RTZH a TZH - viditelný dodavatel
        //        typ_dok === 330 || typ_dok === 340 || // ext.zápůjčky a vrácení zápůjčky
        //        typ_dok === 335 || typ_dok === 345; // opravy a vrácení z opravy  
        //    // zpřístupním ESU/NS
        //    that.element.findFields("df_esu_txt").gfield("option", "disabled", bEsuVisible === false);
        //    that.element.findFields("df_nks_ext").gfield("option", "disabled", bEsuVisible); // ESU nebo NS


        //    //----------------------------------------------
        //    // název ESU a povinnosti polí
        //    //----------------------------------------------
        //    that.df_esu_txt.Required = false;

        //    if (typ_dok === 100 || bSimulP) { // Příjem 
        //        sLblEsu = "jres:24534072"; //RC 24534072 : Dodavatel
        //        //that.df_esu_txt.Required = true; // TODO: jak vyřeším? Je to totiž selectBox...               
        //    }
        //    else if (typ_dok === 140) { // PNKS                
        //        sLblEsu = "jres:24534072"; //RC 24534072 : Dodavatel
        //    }
        //    else if (typ_dok === 120) { // PP
        //        sLblExt = "jres:24534512"; //RC 24534512 : Výdejce
        //    }
        //    else if (typ_dok === 200 || typ_dok === 306) { // Výdej / ZDev                
        //        if (typ_dok === 200) sLblEsu = "jres:24534513"; //RC 24534513 : Odběratel
        //        if (typ_dok === 306) sLblEsu = "jres:24534514"; //RC 24534514 : Partner
        //    }
        //    else if (typ_dok === 220 || typ_dok === 380) { // VP nebo interní žádanka - shodný titulek "df_nks_ext"
        //        sLblExt = "jres:24534391"; //RC 24534391 : Příjemce
        //    }            
        //    else if (typ_dok === 350 || typ_dok === 355 || typ_dok === 360 || typ_dok === 362) {  // navýšení + snížení ceny, RTZH a TZH 
        //        sLblEsu = "jres:24534072"; //RC 24534072 : Dodavatel
        //        // TODO: 380.10 27.02.18 celková částka změny
        //        //  POZOR, přístupnost df_c_c_zmena je trochu komplikovanější, než jak mám napsáno o několik řádnů výše!
        //    }
        //    else if (typ_dok === 310 || typ_dok === 320) {  // vložení/vyjmutí do/ze soupravy
        //        that.element.findFields("df_inv_cis_sou").closest(".gform-row").find("label:first-child").text("Soubor");
        //        that.setHeaderViewInvCis(that);
        //    }
        //    else if (typ_dok === 330) { // Reservace/zápůjčka
        //        sLblEsu = "jres:24534071";  //RC 24534071 : Půjčuji komu
        //    }
        //    else if (typ_dok === 332) { // Interní zápůjčka na NS/REF
        //        sLblExt = "jres:24534071";  //RC 24534071 : Půjčuji komu
        //        that.setHeaderViewResI(that);
        //    }
        //    else if (typ_dok === 335 || typ_dok === 345) { // Oprava nebo návrat z opravy
        //        sLblEsu = "jres:24534511";        //RC 24534511 : Opravna
        //    }
        //    else if (typ_dok === 340) { // vrácení zápůjčky externí
        //        sLblEsu = "jres:24534510"; //RC 24534510 : Návrat od              
        //    }
        //    else if (typ_dok === 342) { // vrácení zápůjčky interní
        //        sLblExt = "jres:24534510"; //RC 24534510 : Návrat od
        //        that.setHeaderViewResI(that); // volání zobrazení polí  v závislosti na typu
        //    }
        //    else if (typ_dok === 382) { // 352.10 12.11.04 - interní požadavek
        //        sLblExt = "jres:24534516"; //RC 24534516 : Žadatel
        //    }
        //    else if (typ_dok === 312 || typ_dok === 322) {  // sloučení/rozdělení maj.
        //        if (typ_dok === 312) that.element.findFields("df_inv_cis_sou").closest(".gform-row").find("label:first-child").text("Cílový majetek");
        //        if (typ_dok === 322) that.element.findFields("df_inv_cis_sou").closest(".gform-row").find("label:first-child").text("Rozdělovaný majetek");
        //        that.setHeaderViewInvCis(that);
        //    }// end if-else                        
        //    // TODO: 354.12 23.03.06 - zobarzení cílové skupiny v tbl položek - u Z, ZSk, UO apod...  - Call SalShowWindow( tblPol.skupina_cil_zkr )
        //    // TODO: 354.12 23.03.06 - zobarzení cílové skupiny v tbl položek - u spotřeby  - Call SalShowWindow( tblPol.skupina_cil_zkr )
        //    // výsledné popisky ESU/NS/ES
        //    that.element.findFields("df_esu_txt").closest(".gform-row").find("label:first-child").text(sLblEsu);
        //    that.element.findFields("df_nks_ext").closest(".gform-row").find("label:first-child").text(sLblExt);
        //    //----------------------------------------------

        //    // TODO: zobrazení tlačítka TZH karty (záložka Položky)

        //    // TODO: nastavení id_top nad "df_nks_ext"


        //}, // end func


        //======================================================================================

        ////   378.9 09.03.17 zadání požadovaných topologických údajů pro budoucí umístění převáděného majetku - ty budou uloženy do tabulky s přenášenými údaji MAJXPOC
        //setHeaderViewInvCis: function (that) {
        //    that.element.findFields("df_esu_txt").gfield("option", "disabled", true);
        //    that.element.findFields("df_nks_ext").gfield("option", "disabled", true);
        //    that.element.findFields("df_ac_ext").gfield("option", "disabled", true);
        //    that.element.findFields("df_dat_ext").gfield("option", "disabled", true);
        //    that.element.findFields("df_inv_cis_sou").gfield("option", "disabled", false); // povolím výběr souboru
        //    // TODO: picTabs.ShowWindow( pb_karta_h )

        //}, // end func

        //======================================================================================

        //   378.9 09.03.17 zadání požadovaných topologických údajů pro budoucí umístění převáděného majetku - ty budou uloženy do tabulky s přenášenými údaji MAJXPOC
        setHeaderViewResI: function (that) {
            //window.alert("setHeaderViewResI");
            var myVal = this.findFields("cmb_res_typ").gfield("getValue").id;
            if (myVal === 10) {
                that.element.findFields("df_nks_ext").gfield("option", "disabled", true);
                that.element.findFields("df_ixs_ref").gfield("option", "disabled", false);
            }
            else {
                that.element.findFields("df_nks_ext").gfield("option", "disabled", false);                
                that.element.findFields("df_ixs_ref").gfield("option", "disabled", true);
                // TODO: chybí políčko Set lbl_esu_txt = 'Převzal'
            } // end if-else                                                

        }, // end func

        //======================================================================================

        ////   funkce, kterou externě nastavím vzhled prvků
        //jsSetFields: function (that) {

        //    //-----------------------------------------------------------------
        //    debugger;
        //    that.element.findFields("df_ac_ag").gfield("option", "disabled", that.df_ac_ag.Edit === false);
        //    that.element.findFields("df_typ_dok").gfield("option", "disabled", that.df_typ_dok.Edit === false);

        //    //-----------------------------------------------------------------

        //    that.element.findFields("df_kod_poh").gfield("option", "disabled", that.df_kod_poh.Edit === false);
        //    that.element.findFields("df_dat_uup").gfield("option", "disabled", that.df_dat_uup.Edit === false);
        //    that.element.findFields("df_dat_zdan").gfield("option", "disabled", that.df_dat_zdan.Edit === false);
        //    that.element.findFields("df_id_top").gfield("option", "disabled", that.df_id_top.Edit === false);
        //    that.element.findFields("df_nks_ext_pri").gfield("option", "disabled", that.df_nks_ext_pri.Edit === false);
        //    that.element.findFields("df_inv_cis_sou").gfield("option", "disabled", that.df_inv_cis_sou.Edit === false);
        //    that.element.findFields("df_dat_termin").gfield("option", "disabled", that.df_dat_termin.Edit === false);
        //    that.element.findFields("cmb_res_typ").gfield("option", "disabled", that.cmb_res_typ.Edit === false);

        //    that.element.findFields("df_ps_fak").gfield("option", "disabled", that.df_ps_fak.Edit === false);
        //    that.element.findFields("df_esu_txt").gfield("option", "disabled", that.df_esu_txt.Edit === false);                      
        //    that.element.findFields("df_ac_ext").gfield("option", "disabled", that.df_ac_ext.Edit === false);
        //    that.element.findFields("df_dat_ext").gfield("option", "disabled", that.df_ac_ext.Edit === false); // // přístup je úplně stejný jako u "df_ac_ext  
        //    that.element.findFields("df_nks_ext").gfield("option", "disabled", that.df_nks_ext.Edit === false);
        //    //that.element.findFields("df_ixs_ref").gfield("option", "disabled", that.df_ixs_ref.Edit === false);
            
        //    //-----------------------------------------------------------------

        //    that.element.findFields("df_mena").gfield("option", "disabled", that.df_mena.Edit === false);
        //    that.element.findFields("df_kurz").gfield("option", "disabled", that.df_mena.Edit === false); // přístupnost je stejná jako k "df_mena"
        //    that.element.findFields("df_c_c_zmena").gfield("option", "disabled", that.df_c_c_zmena.Edit === false);
        //    that.element.findFields("cb_odpocet_dph_no").gfield("option", "disabled", that.cb_odpocet_dph_no.Edit === false);
        //    that.element.findFields("cb_with_dph").gfield("option", "disabled", that.cb_with_dph.Edit === false);

        //    //-----------------------------------------------------------------

        //    that.element.findFields("df_popis").gfield("option", "disabled", that.df_typ_dok.Edit === false); // řídím stejně jako typ_dok

        //    that.element.findFields("df_naklad_1").gfield("option", "disabled", that.df_naklad_1.Edit === false);
        //    that.element.findFields("df_naklad_2").gfield("option", "disabled", that.df_naklad_2.Edit === false);
        //    that.element.findFields("df_naklad_3").gfield("option", "disabled", that.df_naklad_3.Edit === false);

        //    //-----------------------------------------------------------------
        //    //-----------------------------------------------------------------

        //    //var bSpotreba =  typ_dok === 201 || typ_dok === 364 || typ_dok === 365 || typ_dok === 366
        //    // gtab("open");
        //    // OK that.element.findForms("FormSpotreba").gtab("option", "opened", that.DetailDto.typ_dok === 201); // vyroluju formulář spotřeby
        //    var formLV = that.element.findForms("FormSpotreba");
        //    formLV.gtab("option", "opened", that.DetailDto.typ_dok === 201);
            
        //    that.element.findFields("nks_ext_nak").gfield("option", "disabled", that.df_ixs_orj_nak.Edit === false); // "nks_ext" při likvidaci
        //    that.element.findFields("df_ixs_orj_nak").gfield("option", "disabled", that.df_ixs_orj_nak.Edit === false);
        //    that.element.findFields("df_ixs_ref_nak").gfield("option", "disabled", that.df_ixs_orj_nak.Edit === false);
        //    that.element.findFields("df_stredisko").gfield("option", "disabled", that.df_ixs_orj_nak.Edit === false);
        //    that.element.findFields("df_trida").gfield("option", "disabled", that.df_ixs_orj_nak.Edit === false);
        //    that.element.findFields("df_objekt").gfield("option", "disabled", that.df_ixs_orj_nak.Edit === false);
        //    that.element.findFields("df_ext_1").gfield("option", "disabled", that.df_ixs_orj_nak.Edit === false);
        //    that.element.findFields("df_ext_2").gfield("option", "disabled", that.df_ixs_orj_nak.Edit === false);
        //    that.element.findFields("df_ext_3").gfield("option", "disabled", that.df_ixs_orj_nak.Edit === false);

        //}, // end func

        //======================================================================================

        // reload ajax-contentu
        LoadDetail: function (jsonParams) {
            console.log("GMajDokladDetail.LoadDetail() - provádím reload contentu.");
            //console.log("jsonParams=" + jsonParams);
            var l_oOldContent = this;
            new GContent(l_oOldContent.className, l_oOldContent.contentDiv, l_oOldContent.userSettings).load(jsonParams);
        }, // end function
       //======================================================================================


        onDetailBuilderInit: function (builder) {

            console.log("GMajDokladDetail.onDetailBuilderInit() - START");

            var that = this;
            // V této funkci je možné ovlivňovat komponenty, s kterými builder bude pracovat.

            // Zaregistrovat vlastní komponentu do builderu.
            builder.withComponent("mainMenu",
                {

                    actions: [    // akce pro menubar                    
                        {
                            name: "actPodani",
                            caption: "jres:24534050",  //RC 24534050 : Podat
                            icon: "gi-plus",
                            tooltip: "jres:24534505", //RC 24534505 : Podání nového dokladu
                            run: function () { that.jsPodani(); }
                        },
                        {
                            name: "actElPodani",
                            caption: "jres:24534051",    //RC 24534051 : Podat el.
                            icon: "gi-file",
                            run: function () { that.jsPodaniEle(); }
                        },
                        {
                            name: "actEvidence",
                            caption: "jres:24534052",      //RC 24534052 : Evidovat
                            icon: "gi-save", run:
                                function () { that.jsEvidDoklad(0); }
                        },
                        {
                            name: "actSchvaleni",
                            caption: "jres:24534053",   //RC 24534053 : Schválit
                            icon: "gi-tick",
                            tooltip: "jres:24534506", //RC 24534506 : Schválení dokladu
                            run: function () { that.jsValidateMud(); }
                        },
                        {
                            name: "actStorno",
                            caption: "jres:24534054",       //RC 24534054 : Stornovat
                            icon: "gi-bin",
                            tooltip: "jres:24534507", //RC 24534507 : Stornování dokladu
                            run: function () { that.jsStornoMud(); }
                        },
                        {
                            name: "actUct",
                            caption: "jres:24534055",      //RC 24534055 : Proúčtovat
                            icon: "gi-accept",
                            tooltip: "jres:24534508", //RC 24534508 : Proúčtování dokladu
                            run: function () { that.jsMakeUctDoklad(); }
                        },
                        {
                            name: "actUzavreni",
                            caption: "jres:24534056",    //RC 24534056 : Uzavřít
                            icon: "gi-window-close",
                            tooltip: "jres:24534509", //RC 24534509 : Uzavření dokladu
                            run: function () { that.jsCloseMud(); }
                        },
                        { name: "actPredatDoWfl", caption: "Předat"/*, run: function () {that.vraceniDoWfl();}*/ },
                        { name: "actPrevzitZWfl", caption: "Přidělit"/*, run: function () {that.vraceniDoWfl();}*/ },
                        {
                            name: "actSave",
                            caption: "jres:24534078",   //RC 24534078 : Uložit změny
                            icon: "gi-save",
                            run: function () {

                                that.jsSave();

                                // zobrazím echo
                                that.dialogs.messageBox("jres:24534482", //RC 24534482 : Informace
                                    "jres:24534483");  //RC 24534483 : Změny byly uloženy.
                            }
                        } 
                        // TODO: dořešit speciální akci pro tisk
                        //myOps.MenuBar.Add(new GStripAction(new GPrintAction(name: "tiskAct", "fuc_ptm_zlnav", caption: "Tisk", "# return $.content(this).reportStarting(rep);")) { Favorite = true });                    
                        // TODO: bude nějaké tlačítko?
                        //{ name: "actZavreni", caption: "Zavřít", icon: "gi-window-close", run: function () { that.ukonceniOkna(); } }                  
                    ],

                    menuBar: [
                        {
                            id: "menuAgenda", caption: "jres:24534057", type: "static", children: [ //RC 24534057 : Agenda
                                { id: "menuAgPodani", action: "actPodani", favorite: true },
                                { id: "menuAgElPodani", action: "actElPodani", favorite: true },
                                { id: "menuAgEvidence", action: "actEvidence", favorite: true },
                                { id: "menuAgSchvaleni", action: "actSchvaleni", favorite: true },
                                { id: "menuAgStorno", action: "actStorno", favorite: true },
                                { id: "menuAgUct", action: "actUct", favorite: true },
                                { id: "menuAgUzavreni", action: "actUzavreni", favorite: true },
                                { id: "menuAgPredatDoWfl", action: "actPredatDoWfl" },
                                { id: "menuAgPrevzitDoWfl", action: "actPrevzitZWfl" },
                                { id: "menuAgSave", action: "actSave", favorite: true }
                            ]
                        }
                    ],

                    headerForm: new Gordic.Forms.Form({ name: "FormHeader", layoutDescriptor: "L3M2S1, L-3-9-0, M-4-8-0, S-12-12-0" })
                        .addSection()
                        .addPrefab(Gordic.Wfl.Prefabs.GIdentifikatorDokumnetuSpisu({
                            fieldOpt: {
                                model: "model.ixp=value",
                                disabled: true
                            }
                        }, {
                            label: "jres:24534020" //RC 24534020 : Identifikátor
                        }))
                        .addRow("Agendové číslo").addField("gstringbox", {
                            name: "df_ac_ag",
                            model: "ac_ag",
                            disabled: this.df_ac_ag.Edit === false,
                            allowedChars: "0123456789",
                            flag: Gordic.Prefabs.Field.Flags.required,
                            change: function (ev, changeObj) {
                                if (changeObj.value && changeObj.value.ac_ag) {
                                    // TODO: Validate - duplic.AG - hned při změně anebo až na serveru? Nebo obojí?
                                    // cdf_AcAg validace => GMajspid.KontrolaDuplicityAcAg()
                                } // end if
                            } // end on-change
                        })
                        .addRow("Evidenční číslo").addField("gstringbox", {
                            name: "df_ac",
                            model: "ac",
                            disabled: true
                        })

                        //====================================================================
                        .addSection()
                        .addRow("Kniha").addField("gstringbox", {
                            name: "knihaTxt",
                            //value: this.cvKnihaTxt,
                            disabled: true
                        })
                        .addRow("Typ dokladu").addField("gselectbox", Gordic.Prefabs.Select.majcstp(), {
                            name: "df_typ_dok",
                            model: "model.typ_dok = value.typ_dok",
                            tooltip: "jres:24534473", //RC 24534473 : Určení typu majetkového dokladu
                            dropdown: false,
                            disabled: this.df_typ_dok.Edit === false,
                            flag: Gordic.Prefabs.Field.Flags.required,
                            change: function (ev, changeObj) { // frmMUDPor.changeTypDok( )   

                                // changeTypDok v GUPTA změní typ_dok a pak volá 

                                if (changeObj.value && changeObj.value.typ_dok !== that.DetailDto.typ_dok) { // GM_Change

                                    console.log("GMajDokladDetail.df_typ_dok.change(" + changeObj.value.typ_dok + ")");

                                    //var dto = {};
                                    that.findFields().gfield("model", "collect", that.DetailDto);

                                    that.DetailDto.typ_dok = changeObj.value.typ_dok; // TODO: že by zlobil collect?

                                    that.test = "chngTypDok"; // pokyn k provedení kódu "ChangeTypDok" na serveru



                                    // TODO: nastavení typu primární agendy dle typu - pro výdajové nastavím KOF
                                    // IF df_typ_dok.typ_dok = ng_typdokV
                                    //   df_ps_fak._setTypAgPrim( ng_typAgKOF )
                                    // ELSE df_ps_fak._setTypAgPrim( 0 )


                                    // pro PP nebo IZad teď nabídnu seznam dokladů k připojení
                                    if (changeObj.value.typ_dok == 120 || changeObj.value.typ_dok == 382) {
                                        //
                                        // mód výběru dat - tedy tlačítko OK, zrušit a výběr data (ng_modefrmSel = 5) 
                                        that.dialogs.showWindow("Gordic.Maj.WebClient.GDokladyVPrevodu", { argSmer: 0, argFrmMode: 5 }, "", 900, 600, true)
                                            .on("close", function (ev, returnValue) {

                                                console.log("Gordic.Maj.WebClient.GDokladyVPrevodu.closed");

                                                if (returnValue) {
                                                    console.log("Gordic.Maj.WebClient.GDokladyVPrevodu - vybrán IXP:[" + returnValue.ixp + "]");

                                                    // TODO: přenos údajů vybraného dokladu do DTO/modelu { dlg_DokPP.tbl_DokPP.getRow( ) }
                                                    that.DetailDto.ixp_vaz = returnValue.ixp;
                                                    that.DetailDto.nks_ext = returnValue.nks_ext;
                                                    that.DetailDto.ac_ext = returnValue.ac_ext;
                                                    that.DetailDto.dat_ext = returnValue.dat_ext;
                                                    that.DetailDto.popis = returnValue.popis;
                                                    that.DetailDto.kod_poh = returnValue.kod_poh;
                                                    that.DetailDto.typ_dok = returnValue.typ_dok;
                                                    that.DetailDto.dev = returnValue.dev;
                                                    that.DetailDto.ps_fak = returnValue.ps_fak;
                                                    that.DetailDto.uex = returnValue.uex;


                                                    // ještě je třeba doplnit DAT_UUP (v původním dlg_DokPP vlevo dole)

                                                    that.dialogs.simpleForm("Výběr datumu", that.VyberDatumuDialog(moment().toDate())) // majpid_p.dat_uup = df_dat_uup._get( )
                                                        .on("close", function (ev, data) {
                                                            if (data) {

                                                                console.log(" - dat_uup:[" + data.dat_uup + "]");

                                                                // 354.17 12.07.06 - pokud je manuální definice AC, pak si ho vyžádám
                                                                console.log(" - cvManualAcAg:[" + that.cvManualAcAg + "]");

                                                                if (that.cvManualAcAg === true) {

                                                                    console.log(" - agend.číslo bude generováno automaticky.");

                                                                    //   378.9 09.03.17 zadání požadovaných topologických údajů pro budoucí umístění převáděného majetku - ty budou uloženy do tabulky s přenášenými údaji MAJXPOC
                                                                    that.jsGetNewTopolPP(data.ixpVaz);

                                                                    //  reload dokladu
                                                                    //that.LoadDetail({ argIxp: retVal.Ixp });

                                                                }
                                                                else {

                                                                    console.log(" - agend.číslo bude zadáno ručně.");

                                                                    that.dialogs.simpleForm("Zadejte agendové číslo dokladu", that.VyberTextuDialog("Agendové číslo", 20)) // SalModalDialog( dlg_getStr, hWndForm, 'Agendové číslo dokladu', 20, majpid.ac_ag )
                                                                        .on("close", function (ev, data2) {
                                                                            if (data2) {

                                                                                console.log(" - ac_ag:[" + data2.ret_str + "]");

                                                                                // TODO: uložit si majpid.ac_ag

                                                                                //   378.9 09.03.17 zadání požadovaných topologických údajů pro budoucí umístění převáděného majetku - ty budou uloženy do tabulky s přenášenými údaji MAJXPOC
                                                                                that.jsGetNewTopolPP(data.ixpVaz);

                                                                                //  reload dokladu
                                                                                //that.LoadDetail({ argIxp: retVal.Ixp });                                                                                

                                                                            } // end if (data2)
                                                                        }); // end on-close

                                                                } // end if-else (parametr maj_def_acag)


                                                            } // end if (data) "Výběr datumu"
                                                        }); // end on-close "Výběr datumu"


                                                } // end if (returnValue) "Doklady v převodu"
                                            }); // end on.close "Doklady v převodu"
                                    }
                                    // pro ostatní provedu hned reload
                                    else {
                                        // pošlu na server aktualizované DTO (už ho pak nenačítám z DB)
                                        that.LoadDetail({ argIxp: that.DetailDto.ixp, DetailDto: that.DetailDto, changeObj: "chngTypDok" });
                                    }// end if-else

                                } // end change.value

                            } // end change
                        })
                        .addRow("Datum evidence").addField("gdatebox", {
                            name: "df_dat_prij_pod",
                            model: "dat_prij_pod",
                            valueType: "datetime",
                            disabled: true
                        })

                        //====================================================================
                        .addSection()
                        //.addRow("Datum změny").addField("gdatebox", {
                        //    name: "dat_zmena",
                        //    valueType: "datetime",
                        //    disabled: true
                        //})
                        .addRow("Zpracovatel").addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                            name: "df_akt_loc",
                            model: "model.pid.ixs_fun_akt=value.ixs_fun",
                            disabled: true
                        })

                        .addSection({ layoutDescriptor: "L-1-11-0, M-4-8-0, S-12-12-0" })
                        .addRow("Popis").addField("gstringbox", {
                            name: "df_popis",
                            model: "popis",
                            disabled: this.df_typ_dok.Edit === false
                        })
                    ,

                    statusBar: [
                        {
                            id: "statusStavEvi",
                            "caption": that.cvMpStavTxt,
                            "type": "static",
                            "customClass": "g-state-text g-state-stav"
                        },
                        {
                            id: "statusSeparator1",
                            "type": "separator"
                        },
                        {
                            id: "statusDEV",
                            "caption": that.DetailDto.dev_zkr,
                            "type": "static",
                            "customClass": "g-state-success g-state-text"
                        },
                        {
                            id: "statusSeparator2",
                            "type": "separator"
                        },
                        {
                            id: "statusStornoPoh",
                            //"caption": that.cvStornoPoh,
                            "type": "static",
                            "customClass": "g-state-text g-state-warning maj-storno"
                        }
                    ],

                    kpis: {
                        df_pocet_pol:
                        {                   
                            chartVisible: false,
                            //chartType: "liquid",
                            data: that.DetailDto.pocet_pol,
                            value: that.DetailDto.pocet_pol,
                            unit: " ",
                            title: "jres:24534462", //RC 24534462 : Položek
                            text: "",
                            meaning: "neutral", // "positive",
                            showTextIcon: false,
                            width: 100,
                            height: 60,
                            isCurrency: false,
                            customClass: "js-liq-z"
                        }, 
                        df_c_c: // + df_c_pri
                        {                            
                            chartVisible: false,
                            data: that.CcCPri,
                            value: that.CcCPri,
                            title: "jres:24534333", //RC 24534333 : Celková cena za doklad
                            text: that.lbl_prirazka,
                            meaning: "neutral",
                            showTextIcon: false,
                            width: 250,
                            height: 60,
                            customClass: "js-liq-p"
                        },
                        df_c_c_dph: // + df_c_c_mena
                        {                            
                            chartVisible: false,
                            data: that.CcDphCcMena,
                            value: that.CcDphCcMena,
                            title: "jres:24534333", //RC 24534333 : Celková cena za doklad
                            text: that.lbl_c_c_dph,
                            meaning: "neutral",
                            showTextIcon: false,
                            width: 250,
                            height: 60,
                            customClass: "js-liq-p"
                        },
                        df_c_dotace:
                        {
                            name: "",
                            chartVisible: false,
                            data: that.DetailDto.c_dotace,
                            value: that.DetailDto.c_dotace,
                            title: "jres:24534069", //RC 24534069 : Transfer
                            text: "",
                            meaning: "neutral",
                            showTextIcon: false,
                            width: 250,
                            height: 60,
                            customClass: "js-liq-p",
                            visible: that.df_c_dotace.Visible
                        }
                    }
                });

            //přesouvat componenty 
/*
            builder.moveComponentAfter("WflElDoc", "WflPrilohy");

            //lze získat komponentu z builderu a editovat jí ...
            var component = builder.getComponent("WflElDoc");
            if (component) {
                component.contentExtensions.wflElDoc_OtevreniElektronickehoObrazu = function () { console.log("Custom wfl el doc open."); };
           }
           */
                     
            console.log("GMajDokladDetail.onDetailBuilderInit() - END");
        },


        onDetailBuilderBuild: function (builder) {

            console.log("GMajDokladDetail.onDetailBuilderBuild() - START");

            var that = this;

            // příjem SML
            //if (that.DetailDto.pocet_pol_no_st)
            //console.log(this.cvKnihaTxt);

            console.log("GMajDokladDetail.onDetailBuilderBuild() - END");

        }, //  end function ( onDetailBuilderBuild ) ------------------------------------------------------  

        //closing: function () { //funkce pro zavření detailu
        //    var that = this;
        //    var def = $.Deferred();

        //    if (that.findForms().gform("hasChanged")) { //pokud je detail editovatelný a došlo ke změně, zobrazit dotaz.


        //        that.dialogs.messageBox("Dotaz", "Chcete uložit provedené změny?", GDlg.mbbYesNo, GDlg.mbiQuestion)
        //            .on("yes", function () { def.resolve(that.savedIxps); }) // informovat o změně můžeme i pomocí eventu close, do promise předáme seznam změněných dokumentů.
        //            .on("no", def.reject);

        //        return def.promise();
        //    }
        //}, //  end function ( closing ) ------------------------------------------------------

    }, {extendIntellisense: GContent});
})(jQuery);