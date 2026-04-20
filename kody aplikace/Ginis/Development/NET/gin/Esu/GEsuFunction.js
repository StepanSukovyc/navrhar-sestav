//(function ($) {
//    namespace("Gordic.Esu.Function", {

//        //#region Vyhodnocování ikonek podle stavu

//        //Vraceni ikonky a tooltipu pro Typ Adresy v seznamu externích subjektu
//        ColumnTypAdresy:function(){
//            return {
//                name: "icoAdresy",
//                caption: "jres:26265354", //RC 26265354 : Typ adresy
//                customClass: "center",
//                width: 40,

//                sortOrder: function SortSpzn(aObj, bObj) {
             
//                    var a = aObj.data;
//                    var b = bObj.data;

//                    var val1 = Gordic.Esu.Function.GridAdresyVratIkonkuTypuAdresy(a.typ_adr, a.typ_esu, a.poc_doruc, a.dat_umrti).sortValue;
//                    var val2 = Gordic.Esu.Function.GridAdresyVratIkonkuTypuAdresy(b.typ_adr, b.typ_esu, b.poc_doruc, b.dat_umrti).sortValue;


//                    var stejne = 0;
//                    var prvniJeVetsi = 1;
//                    var druheJeVetsi = -1;

//                    if (val1 === val2) {
//                        return stejne;
//                    } else if (val1 > val2) {
//                        return prvniJeVetsi;
//                    } else {
//                        return druheJeVetsi;
//                    }

//                    // asi už stejné
//                    return stejne;
//                },


//                iconTemplate: function (data) {

//                    if (data) {
//                        var objImg = Gordic.Esu.Function.GridAdresyVratIkonkuTypuAdresy(data.typ_adr, data.typ_esu, data.poc_doruc, data.dat_umrti);
//                        //var barva = Gordic.Esu.Function.sloupecBarvaTypuAdresdy(value.data);
//                        if (objImg)
//                            return { icon: objImg.img, tooltip: objImg.tooltip/*, text: (objImg.img ? "" : "<span title='" + objImg.tooltip + "'>&nbsp;&nbsp;&nbsp;</span>")*/ };
//                        //return { icon: objImg.img + " " + barva.fontcolor, tooltip: objImg.tooltip, text: (objImg.img ? "" : "<span title='" + objImg.tooltip + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>") }; //, text: value.data.typ_adr
//                    } else {
//                        return null;
//                    }
//                }
//            };
//        },


//        GridAdresyVratIkonkuTypuAdresy: function (typAdr, typEsu, pocDoruc, dat_umrti) {
//            if (dat_umrti) {
//                if (typEsu == 20)
//                    return { sortValue: 4, img: "fa-exclamation-circle g-state-text g-state-important", tooltip: "jres:31900022" + Gordic.Templates.Formatters.datetime(new Date(dat_umrti)) }; //RC 31900022 : Datum úmrtí je 
//                else
//                    return { sortValue: 4, img: "fa-exclamation-circle g-state-text g-state-important", tooltip: "jres:31900023" + Gordic.Templates.Formatters.datetime(new Date(dat_umrti)) }; //RC 31900023 : Datum ukončení činnosti je 
//            }
//            else {

//                if (typAdr === 0 && pocDoruc > 0 && typEsu === 20)
//                    return { sortValue: 1, img: "fa-exclamation-triangle", tooltip: "jres:31900016" }; //RC 31900016 : Pozor, subjekt má v systému zadanou i doručovací nebo kontaktní adresu(y).

//                if (typAdr === 0 && pocDoruc > 0 && typEsu !== 20)
//                    return { sortValue: 2, img: "fa-exclamation-triangle", tooltip: "jres:31900017" }; //RC 31900017 : Subjekt má v systému evidovány i další adresy poboček/provozoven.

//                if (typAdr === 10 && typEsu === 20)
//                    return { sortValue: 5, img: "gi-address", tooltip: "jres:31900019" }; //RC 31900019 : Doručovací adresa

//                if (typAdr === 10 && typEsu !== 20)
//                    return { sortValue: 5, img: "gi-address", tooltip: "jres:31900020" }; //RC 31900020 : Adresa pobočky/provozovny

//                if (typAdr === 30 && typEsu === 20)              // kontaktní pro FO 
//                    return { sortValue: 6, img: "fa-user", tooltip: "jres:31900021" }; //RC 31900021 : Kontaktní adresa

//                else
//                    return { sortValue: 3, img: "fa-fw", tooltip: "jres:26265355" }; //RC 26265355 : Trvalá adresa
//            }

//        },

        

//        // ziskani ikonky szr do tabulky s externimi subjekty

//        DatumOvereniVSZRColumn: function () {
//            return {
//                name: "iszr",
//                caption: "jres:26265366", //RC 26265366 : Datum ověření v SZR
//                customClass: "center",
//                width: 40,
//                iconTemplate: function (data) {

//                    if (data) {
//                        var objImg = Gordic.Esu.Function.GetSzrImageNove(data);
//                        if (objImg)
//                            return { icon: objImg.img, tooltip: objImg.tooltip };
//                    } else {
//                        return null;
//                    }
//                }
//            };
//        },

//        GetSzrImageNove: function (l_oSeznamRow) {
//            var ret = "";
//            if (l_oSeznamRow === null)
//                return ret;
//            if (l_oSeznamRow.stupen_ver == 65 || l_oSeznamRow.stupen_ver == 55 || l_oSeznamRow.stupen_ver == -65 || l_oSeznamRow.stupen_ver == -55) {
//                var prihlZmen = 0;
//                if (l_oSeznamRow.prihlaseni_zmen_rob !== null)   // ALF 20.11.2013
//                    prihlZmen = l_oSeznamRow.prihlaseni_zmen_rob;
//                if (l_oSeznamRow.dat_akt_rob !== null) {
//                    var d = new Date();
//                    d.setDate(d.getDate() - 1);
//                    var datAkt = new Date(l_oSeznamRow.dat_akt_rob);
//                    if (datAkt > d) // zkontrolovat
//                        if (prihlZmen == 1) {
//                            return {
//                                img: "gi-tick g-state-success g-state-text",
//                                tooltip: "jres:31900113"
//                            };//RC 31900113 : Subjekt byl ověřen v SZR aktuálně vybranou agendou, informace o ověření je aktuální. Je ZAPNUTO sledování změn subjektu v SZR.
//                            //return { img: "Ost/registr_SZR_overeno_aktualne_sledovani_zmen_zapnuto", tooltip: "jres:31900113" };//RC 31900113 : Subjekt byl ověřen v SZR aktuálně vybranou agendou, informace o ověření je aktuální. Je ZAPNUTO sledování změn subjektu v SZR.
//                        }
//                        else {
//                            return {
//                                img: "gi-tick",
//                                tooltip: "jres:26265362"
//                            };//RC 26265362 : Subjekt byl ověřen v SZR aktuálně vybranou agendou, informace o ověření je aktuální.
//                            //return { img: "Ost/registr_SZR_overeno_aktualne", tooltip: "jres:26265362" };//RC 26265362 : Subjekt byl ověřen v SZR aktuálně vybranou agendou, informace o ověření je aktuální.
//                        }
//                    else {
//                        return {
//                            img: "gi-time",
//                            tooltip: "jres:26265363"
//                        };//RC 26265363 : Subjekt byl ověřen jinou agendou nebo informace o ověření není aktuální.
//                        //return { img: "Ost/registr_SZR_overeno_cizi_agendou", tooltip: "jres:26265363" };//RC 26265363 : Subjekt byl ověřen jinou agendou nebo informace o ověření není aktuální.
//                    }
//                }
//                else if (l_oSeznamRow.dat_akt_ros != null) {
//                    var c = new Date();
//                    c.setDate(c.getDate() - 1);
//                    var datAktrob = new Date(l_oSeznamRow.dat_akt_ros);
//                    if (datAktrob > c) {
//                        return {
//                            img: "gi-tick",
//                            tooltip: "jres:26265364"
//                        };//RC 26265364 : Subjekt byl ověřen v SZR, informace o ověření je aktuální.
//                        //return { img: "Ost/registr_SZR_overeno_aktualne", tooltip: "jres:26265364" };//RC 26265364 : Subjekt byl ověřen v SZR, informace o ověření je aktuální.
//                    }
//                    else {
//                        return { img: "gi-time", 
//                            tooltip: "jres:26265365" }; //RC 26265365 : Informace o ověření není aktuální.
//                    }
//                }
//                else
//                    return ret; // vracim prazdny
//            }
//            else
//                return ret; // vracim prazdny
//        },


//        // vrací ikonu DS ze seznamu externích subjektů
//        ColumnDatovaSchrankaZIco_ds: function () { 
//            return {  // if (id ds) pak je datová schránka -> když je datum starej jak den tak černá jinak zelená když zrušená tak červená 
//                name: "ico_ds",
//                caption: "jres:31900191", //RC 31900191 : Datová schránka
//                customClass: "center",
//                width: 40,
//                iconTemplate: function (data) {
//                    if (data.ico_ds) {

//                        var IsSK = Gordic.Esu.Function.VyzkouesetZdaAdresaDatovkyJeSlovenska(data.id_ds);

//                        var objImg = Gordic.Esu.Function.GetDsImageNove(data.ico_ds, IsSK);
//                        if (objImg) {
//                            return { icon: objImg.img ? objImg.img : undefined, tooltip: objImg.tooltip };
//                        } else return null;
//                    }
//                }
//            };
//        },

//        GetIcoProDs: function (IsSkEdesk) {
//            var ico = "";
//            var isSK = IsSkEdesk;

//            if (isSK) {
//                ico = "gi-edesk";
//            } else {
//                ico = "gi-ds";
//            }
//            return ico;
//        },

//        VyzkouesetZdaAdresaDatovkyJeSlovenska: function (adresa) {
//            var ret = false;
//            if (adresa != null && (adresa.startsWith("rc://") || adresa.startsWith("ico://"))) {
//                ret = true;
//            }
//            return ret;
//        },

//        GetDsImageNove: function (icoDs,IsSkEdesk) {

//            // v težkém ale nevím jaký to má význam
//            //if (((idDs != null && !idDs.IsNullOrEmpty && idDs.Trim() != "") ||
//            //   (idGex != null && !idGex.IsNullOrEmpty && idGex.Trim() != ""))&&        // ALF 17.6.2013 oprava překlepu
//            //   icoDs!=null&&!icoDs.IsNullOrEmpty)

//            var dsIco = Gordic.Esu.Function.GetIcoProDs(IsSkEdesk);

//            switch (icoDs) {
//                case "gin/datova_schranka":
//                case "gin/datova_schranka_symbol":

//                    return { img: dsIco, tooltip: "jres:31900114" }; //RC 31900114 : Subjekt má datovou schránku. 
//                // ALF 12.12.2013 kvůli HZS
//                case "gin/datova_schranka_i_gex":
//                    return {

//                        img: [dsIco, "gi-gex g-state-text g-state-info gi-stack-fw gi-stack-pos--rb"],
//                        tooltip: "jres:26265402"
//                    };//RC 26265402 : Subjekt má datovou i GEX schránku.

//                case "gin/datova_schranka_zpristupnit":
//                    return {
//                        img: [dsIco, "gi-tick g-state-text g-state-success gi-stack-bcg"],
//                        tooltip: "jres:26265403"
//                    }; //RC 26265403 : Subjekt má aktivní datovou schránku
//                case "gin/datova_schranka_znepristupnit":
//                    return {
//                        // img: "gi-ds",
//                        img: [dsIco, "gi-window-close g-state-text g-state-important gi-stack-bcg"],
//                        tooltip: "jres:26265404"
//                    }; //RC 26265404 : Subjekt má neaktivní datovou schránku
//                case "gin/gex_symbol":
//                    return { img: "gi-gex", tooltip: "jres:26265405" }; //RC 26265405 : Subjekt má GEX schránku
//                default:
//                    return { img: "fa-fw", tooltip: "jres:26265406" }; //RC 26265406 : Subjekt nemá datovou schránku
//            }
//        },

//        // vrací ikonu DS ze seznamu externích subjektů
//        GetAktivitaImageNove: function (aktivita_esu) {

//            if(aktivita_esu != null){
//                switch (aktivita_esu) {
//                    case 100:
//                        return { img: "fa-fw", tooltip: "jres:31900243" };      // Subjekt je aktivní. //RC 31900243 : Subjekt je aktivní.
//                    case 500:
//                        return { img: "gi-generate g-state-text g-state-warning", tooltip: "jres:31900244" };   //Subjekt je neaktivní. //RC 31900244 : Subjekt je neaktivní.
//                    case 900:
//                        return { img: "gi-window-close ", tooltip: "jres:31900245" };  //Subjekt je zrušen, je napojen na novější verzi. //RC 31900245 : Subjekt je zrušen, je napojen na novější verzi.
//                    default:
//                        return null;
//                }//ui-state-disabled
//            }
//        },
//        //barva sloupce v gridu s typem adresy
//        sloupecBarvaTypuAdresdy: function (l_oSeznamRow) {
//            // podbarveni nazvu a ostatni stavy  TODO
//            var that = this;
//            var font = false;
//            var fontcolor = "";

//            if (l_oSeznamRow.aktivita !== 100)                                           // AKTIVITA
//            {
//                //fontcolor = "g-state-inactive g-state-text";//"rgb(112, 128, 144)";// "SlateGray";
//                font = true;//"Italic";
//            }

//            if (l_oSeznamRow.ixs_esu != l_oSeznamRow.ixs_nad)                           // Typ ADRESY
//            {
//                fontcolor = "g-state-info g-state-text";//"rgb(1, 130, 255)";//   "Blue";
//            }
//            else if (l_oSeznamRow.typ_adr === 10) {
//                fontcolor = "g-state-active g-state-text";//"rgb(0, 0, 255)";//"DarkBlue";
//            }
//            return { font: font, fontcolor: fontcolor };

//        },

//        ColumnIszrIkonka: function (gin_esu_inzobr, gin_iszr_zostv) {
//            return {
//                name: "IszrIkonka",
//                caption: "jres:31900290", //RC 31900290 : Ověřeno
//                customClass: "center",
//                width: 40,
//                iconTemplate: function (data) {

//                    if (data) {
//                        var objImg = Gordic.Esu.Function.szrSloupecOvereniNove(data, gin_esu_inzobr, gin_iszr_zostv);
//                        //var barva = Gordic.Esu.Function.sloupecBarvaTypuAdresdy(value.data);
//                        if (objImg)
//                            if (objImg.ico) {
//                                return { icon: objImg.ico, tooltip: objImg.text }; //, text: value.data.typ_adr
//                            } else return null;
//                    } else {
//                        return null;
//                    }
//                }
//            }


//        },

//        szrSloupecOvereniNove: function (l_oSeznamRow, gin_esu_inzobr, gin_iszr_zostv) {
//            // podbarveni nazvu a ostatni stavy  TODO
//            var that = this;
//            var ico = "";
//            var text = "";

//            var jeInsolvence = (gin_esu_inzobr && l_oSeznamRow.druh_stav_r_txt); //l_oSeznamRow.druh_stav_r_txt.BaseValueTrimmed.Length > 0
//            if (l_oSeznamRow.stupen_ver_txt || l_oSeznamRow.nazev) {

//                if (l_oSeznamRow.stupen_ver === 35 || l_oSeznamRow.stupen_ver === 30)    // je ověřeno RUIAN
//                {
//                    ico = "gi-ruian";        // tmavě fialová
//                    text = "jres:31900300"; //RC 31900300 : Ověřeno v RUIAN
//                }

//                if (l_oSeznamRow.stupen_ver === 20)    // ALF 20.8.2015 ověřeno administrátorem/správcem                    
//                {
//                    ico = "fa-cog";      // tmavější šedá
//                    text = "jres:31900301"; //RC 31900301 : Ověřeno administrátorem/správcem
//                }
//                if (jeInsolvence) {
//                    ico = "gi-ir g-state-text g-state-important";      // růžovoučká
//                    text = "jres:31900302"; //RC 31900302 : Insolvecne
//                }

//                if (gin_iszr_zostv) {                                                                                // Ověření

//                    // ověření v SZR - nejpodstatnější informace
//                    if (l_oSeznamRow.stupen_ver === 55)    // je ověřeno ROB
//                    {
//                        ico = "gi-rob";  //"ColorIszrROB"; // 253, 228, 215    // oranžová
//                        text = "jres:31900303"; //RC 31900303 : Ověřeno v ROB
//                    }
//                    if (l_oSeznamRow.stupen_ver === 65)    // je ověřeno ROS 
//                    {
//                        ico = "gi-ros";  //"ColorIszrROS";   // 253, 248, 215  // světle žluta
//                        text = "jres:31900304"; //RC 31900304 : Ověřeno v  ROS
//                    }
//                    if (l_oSeznamRow.stupen_ver === -65 || l_oSeznamRow.stupen_ver === 40 || l_oSeznamRow.stupen_ver === 60)    // je ověřováno asynchronně ROB nebo nevalidni v ROB či RRO
//                    {
//                        ico = "gi-question";            // hodně tmavá oranžová
//                        text = "jres:31900305"; //RC 31900305 : Data nejsou aktuálně ověřená
//                    }
//                    // nebo v SZR ROB
//                    if (l_oSeznamRow.stupen_ver === 50 || l_oSeznamRow.stupen_ver === 70) {
//                        ico = "gi-gordic";          // okrová nebo co
//                        text = "jres:31900306"; //RC 31900306 : Ověřeno v Ginis ROB
//                    }
//                }
//                return { ico: ico, text: text };
//            }
//        },

//        //#endregion
//        //#region "Nastavovátory" nových filedu

//        // upraví povinnost vyplnění políčka (upraví validatory)
//        upravRequiredNaFieldu: function (field, required) {

//            field.each(function (index, element) {
//                var puvodniValidatory = $(element).gfield("option", "validators");
//                var noveValidatory = puvodniValidatory.filter(function (Validator) {
//                    return !(Validator instanceof Gordic.Validators.Required);
//                });
//                if (required) {
//                    noveValidatory.push(new Gordic.Validators.Required());
//                }
//                $(element).gfield("option", "validators", noveValidatory);
//            });
//        },

//        trimObj: function (obj) {
//            for (var prop in obj) {
//                var value = obj[prop], type = typeof value;
//                if (value != null && (type == "string" || type == "object") && obj.hasOwnProperty(prop)) {
//                    if (type == "object") {
//                        Gordic.Esu.Function.trimObj(obj[prop]);
//                    } else {
//                        obj[prop] = obj[prop].trim();
//                    }
//                }
//            }
//        },

//        //#endregion

//        //#region Logovani
//        getIxp: function () {
//            return $.content($get("main")).EsuIxp;
//        },
//        setIxp: function (Ixp) {
//            $.content($get("main")).EsuIxp = Ixp;
//        },
//        getDuvodHledani: function () {
//            return $.content($get("main")).EsuDuvodHledani;
//        },
//        setDuvodHledani: function (DuvodHledani) {
//            $.content($get("main")).EsuDuvodHledani = DuvodHledani;
//        },
//        getAktZnacka: function () {
//            return $.content($get("main")).EsuAktZnacka;
//        },
//        setAktZnacka: function (AktZnacka) {
//            $.content($get("main")).EsuAktZnacka = AktZnacka;
//        },
//        getDuvodHledaniTxt: function () {
//            return $.content($get("main")).EsuDuvodHledaniTxt;
//        },
//        setDuvodHledaniTxt: function (DuvodHledaniTxt) {
//            $.content($get("main")).EsuDuvodHledaniTxt = DuvodHledaniTxt;
//        },

//        getLogovani: function () {
//            var Logovani = {
//                Ixp: Gordic.Esu.Function.getIxp(),
//                DuvodHledani: Gordic.Esu.Function.getDuvodHledani(),
//                AktZnacka: Gordic.Esu.Function.getAktZnacka(),
//                DuvodHledaniTxt: Gordic.Esu.Function.getDuvodHledaniTxt()

//            };
//            return Logovani;
//        },
//        setLogovani: function (Ixp, DuvodHledani, AktZnacka, DuvodHledaniTxt) {
//            Gordic.Esu.Function.setIxp(Ixp);
//            Gordic.Esu.Function.setDuvodHledani(DuvodHledani);
//            Gordic.Esu.Function.setAktZnacka(AktZnacka);
//            Gordic.Esu.Function.setDuvodHledaniTxt(DuvodHledaniTxt);
//        },
//        vymazLogovani: function () {
//            Gordic.Esu.Function.setIxp(null);
//            Gordic.Esu.Function.setDuvodHledani(null);
//            Gordic.Esu.Function.setAktZnacka(null);
//            Gordic.Esu.Function.setDuvodHledaniTxt(null);
//        },
//        //#endregion

//        /**
//         * vrátí lidský název db sloupce
//         *
//         * @author  Dsebesta
//         * @date    26.07.2017
//         *
//         * @param   dbSloupec   nazev sloupce
//         *
//         * @return  .
//         */

//        DejNazevDBSloupceTxt: function (dbSloupec) {
//            var nazev = "";

//            if (dbSloupec === "nazev") nazev = "jres:26265146"; //RC 26265146 : Název
//            if (dbSloupec === "ob_jmeno") nazev = "jres:32100017"; //RC 32100017 : Obchodní jméno
//            if (dbSloupec === "jmeno") nazev = "jres:26265153"; //RC 26265153 : Jméno
//            if (dbSloupec === "prijmeni") nazev = "jres:26265152"; //RC 26265152 : Příjmení
//            if (dbSloupec === "rod_prijmeni") nazev = "jres:31900087"; //RC 31900087 : Rodné příjmení
//            if (dbSloupec === "obec") nazev = "jres:26265149"; //RC 26265149 : Obec
//            if (dbSloupec === "ulice") nazev = "jres:26265147"; //RC 26265147 : Ulice
//            if (dbSloupec === "cast_obce") nazev = "jres:26265235"; //RC 26265235 : Část obce
//            if (dbSloupec === "psc") nazev = "jres:26265150"; //RC 26265150 : PSČ
//            if (dbSloupec === "cor") nazev = "jres:31900172"; //RC 31900172 : Číslo orientační
//            if (dbSloupec === "cpop") nazev = "jres:31900173"; //RC 31900173 : Číslo popisné
//            if (dbSloupec === "stat") nazev = "jres:26265294"; //RC 26265294 : Stát
//            if (dbSloupec === "ico") nazev = "jres:26265288"; //RC 26265288 : IČO
//            if (dbSloupec === "[ico]") nazev = "jres:31900312"; //RC 31900312 : IČO (pokud bude vyplněno IČO, pak se hledá pouze dle této položky)
//            if (dbSloupec === "rc") nazev = "jres:26265194"; //RC 26265194 : RČ
//            if (dbSloupec === "typ") nazev = "jres:31900194"; //RC 31900194 : Typ
//            if (dbSloupec === "typ_esu") nazev = "jres:31900194"; //RC 31900194 : Typ
//            if (dbSloupec === "id_ds") nazev = "jres:31900313"; //RC 31900313 : IDDS
//            if (dbSloupec === "id_gex") nazev = "jres:31900314"; //RC 31900314 : IDGEX
//            if (dbSloupec === "tit_pred") nazev = "jres:26265209"; //RC 26265209 : Titul před
//            if (dbSloupec === "tit_za") nazev = "jres:26265218"; //RC 26265218 : Titul za
//            if (dbSloupec === "dat_nar") nazev = "jres:26265158"; //RC 26265158 : Datum narození
//            if (dbSloupec === "misto_nar") nazev = "jres:31900315"; //RC 31900315 : Místo narození
//            if (dbSloupec === "mail") nazev = "jres:26265151"; //RC 26265151 : Email
//            if (dbSloupec === "tel") nazev = "jres:32100022"; //RC 32100022 : Telefon
//            if (dbSloupec === "prizdph") nazev = "jres:31900316"; //RC 31900316 : Plátce DPH
//            if (dbSloupec === "dic") nazev = "jres:32100016"; //RC 32100016 : DIČ
//            if (dbSloupec === "dat_zaniku") nazev = "jres:31900317"; //RC 31900317 : Datum ukončení

//            if (nazev === "") {
//                nazev = dbSloupec;
//            }
//            return nazev;
//        },

//        //#region ISZR Registry

//        /**
//         * Porovná a přidá ikonky
//         *
//         * @author  Dsebesta
//         * @date    18.08.2017
//         *
//         * @param   field       field kam se umístí ikonka
//         * @param   hodnota1    jeho hodnota
//         * @param   hodnota2    hodnota se kterou se to porovnává
//         *
//         * @return  .
//         */

//        PorovnejApridejIco: function (field, hodnota1, hodnota2) {
//            var ico = null;
//            var stav = null;
//            var trim = false;

//            if (typeof hodnota1 === "string" && typeof hodnota2 === "string") {
//                trim = true;
//            }

//            if (trim && hodnota1 !== null && hodnota1.trim().toLowerCase() === hodnota2.trim().toLowerCase()) {
//                stav = 10;
//            } else if (hodnota1 !== null && hodnota1 === hodnota2) {
//                stav = 10;
//            } else if (hodnota1 !== null && hodnota1 instanceof Date && hodnota2 instanceof Date && hodnota1.getTime() === hodnota2.getTime()) {
//                stav = 10;
//            } else if (hodnota1 == null && ((hodnota1 === hodnota2) || (hodnota2 === ""))) {
//                stav = null; //null;
//            } else {
//                stav = 20;
//            }

//            ico = Gordic.Esu.Function.GetImgporovnani(stav);
//            if (ico) {
//                field.gfield("addState", ico);
//            }
//        },

//        /**
//         * vrátí stavovou ikonku
//         *
//         * @author  Dsebesta
//         * @date    18.08.2017
//         *
//         * @param   stav    The stav.
//         *
//         * @return  The imgporovnani.
//         */

//        GetImgporovnani: function (stav) {
//            if (stav === 10 || stav === 0 ) // 10
//                return { id: "icoCompare", icon: "gi-tick", customClass: "g-state-success", tooltip: "✓ " + "jres:31900307" }; //RC 31900307 : Shoduje se
//            else if (stav === 20 || stav === 1 || stav === 2) //20
//                return { id: "icoCompare", icon: "gi-window-close", customClass: "g-state-important", tooltip: "✗ " + "jres:31900308" }; //RC 31900308 : Neshoduje se
//            else
//                return null;
//        },

//        cellTemplateZastupneOsoby: function (content, akcniTlacitko) {
//            return function (data) {
//                if (data.cnt_zo != null) { //&& data.cnt_zo !== 0 && data.cnt_zo !== "0"
//                    var text = "";
//                    var pocet = parseInt(data.cnt_zo);
//                    if (pocet > 4 || pocet === 0) {

//                        text = "jres:31900221" + " " + pocet + " " + "jres:31900222"; //RC 31900222 : zástupných osob.
//                    } else if (pocet > 1) {
//                        text = "jres:31900221" + " " + pocet + " " + "jres:31900223"; //RC 31900223 : zástupné osoby.
//                    } else if (pocet === 1) {
//                        text = "jres:31900221" + " " + pocet + " " + "jres:31900224"; //RC 31900224 : zástupnou osobu.
//                    } else {
//                        text = pocet.toString();
//                    }
//                    if (akcniTlacitko) {
                        
//                        var prvek = $("<a>").glink({
//                            params: {
//                                action: new GAction({
//                                    name: "actZo",
//                                    icon: pocet > 0 ? "gi-group" : "gi-minus", //fa-fw
//                                    customClass: "g-link--no-underline g-state-text",
//                                    run: function (event) {
//                                        event.preventDefault();
//                                        content.nactiZastupneOsoby(data.ixs_esu);
//                                    }
//                                })
//                            }
//                        });
//                        return prvek.prop('title', text);
                       
//                    } else {
//                        var ret = $("<span title='" + text + "'><i class='gi gi-group fa-fw grid-cell-icon'></i></span>");
//                        return ret;
//                    }
//                } else {
//                    return null;
//                }
//            };

//        },

//        getColorDleTypRegistr: function(typReg)
//        {
//            var obj = {};

//            // ověření v SZR - nejpodstatnější informace
//            if(typReg == 20)    // je ověřeno ROS
//            {
//                obj.ico = "gi-ros";  // ALF 20.7.2016 (252, 242, 186)
//                obj.text = "jres:31900309";  //RC 31900309 : Ověření ROS
//            }
//            if (typReg == 10)    // je ověřeno ROB
//            {
//                obj.ico = "gi-rob";
//                obj.text = "jres:31900310";  //RC 31900310 : Ověření ROB
//            }
//            if (typReg == 30)    // RUIAN
//            {
//                obj.ico = "gi-ruian";
//                obj.text = "jres:31900311"; //RC 31900311 : Ověření RUIAN
//            } 

//            return obj;
//        },
//        getKartotekaFilterForm: function (content, hromadneOvereni) {

//            var simple = false;
//            if (content && content.FieldsToFilterpanel && content.FieldsToFilterpanel.length > 0) {
//                simple = true;
//            }

//            var FiltryForm = new Gordic.Forms.Form({
//                tabLabel: "jres:31900464", //RC 31900464 : Údaje externího subjektu
//                name: "Filtry",
//                layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1"
//            })
//            .addSection();
//            FiltryForm.addRow({ label: "jres:26265145", name: "zkratka" }).addField("gstringbox", { name: "zkratka", }); //RC 26265145 : Zkratka

//            var nazevOperators = [];
//            var nazevDefaultoperator = "";
//            var podminka = false;
//            if (content.gin_esu_zphlena == 2) {
//                nazevOperators = ["CONTAINS", "LIKE"];
//                nazevDefaultoperator = "LIKE";
//            } else if (content.gin_esu_zphlena == 1) {
//                nazevOperators = ["CONTAINS", "LIKE"];
//                nazevDefaultoperator = "CONTAINS";
//            } else {
//                nazevOperators = ["LIKE"];
//                nazevDefaultoperator = "LIKE";
//            }

//            FiltryForm.addRow("jres:26265146").addField("gstringbox", { //RC 26265146 : Název
//                name: "nazev",
//                validators: [
//                    new Gordic.Validators.Length({ min: 2, message: "jres:31900938" }) //, max: 30 //RC 31900938 : Příliš málo znaků
//                   //, new Gordic.Validators.Required({ message: "Pole je povinné"})
//                ]

//            }, Gordic.Prefabs.String.withOperators({
//                operators: nazevOperators,
//                defaultOperator: nazevDefaultoperator
//            })
//            );
//            FiltryForm.addRow("jres:32100017").addField("gstringbox", { name: "ob_jmeno", }); //RC 32100017 : Obchodní jméno
//            FiltryForm.addRow("jres:31900465").addField("gstringbox", { name: "rc", }); //RC 31900465 : Rodné  číslo
//            FiltryForm.addRow("jres:26265195").addField("gstringbox", { name: "ico" }); //, initialValue:"pidli" , validators: [new Gordic.Validators.Required()] //RC 26265195 : Ičo
//            FiltryForm.addRow("jres:31900466").addField("gstringbox", { //RC 31900466 : Dič
//                name: "dic",
//                favoriteRequiredFields: ["ico"]
//            });
//            FiltryForm.addRow("jres:31900467").addField("gstringbox", { name: "oc", }); //RC 31900467 : Osobní číslo
//            FiltryForm.addRow("jres:31900468").addField("gstringbox", "w-9", { name: "bu_ci", }).addField("gstringbox", "w-3", { name: "sk_ci", }); //RC 31900468 : BÚ/SK
//            FiltryForm.addRow("jres:26265221").addField("gstringbox", { name: "ixs_esu", }); //RC 26265221 : ID

//            if (content.GEsuParamsDto.gin_ssl_datschr || (content.gin_odes_esj_po == 1)) {
//                FiltryForm
//                    .addRow("jres:31900366").addField("gstringbox", "w-6", { name: "id_ds", }) //RC 31900366 : ID DS
//                    .addField("gcheck", "w-4", {
//                        label: "Jen s DS",
//                        name: "Jenid_ds",
//                        model: "model.id_ds=value",
//                        modelValueTransform: {
//                            apply: function (modelValue) {
//                                if (modelValue === "_%") {
//                                    return true;
//                                } else {
//                                    return false;
//                                }
//                            },
//                            collect: function (fieldValue) {
//                                if (fieldValue === true) {
//                                    return "_%";
//                                } else {
//                                    return $(this).gformrow().findFields("id_ds").gfield("getValue");
//                                }
//                            }
//                        },
//                        change: function (ev, changeObj) {
//                            if (changeObj.value === true) {
//                                $(this).gformrow().findFields("id_ds").gfield("clear");
//                                $(this).gformrow().findFields("id_ds").gfield("option", "disabled", true);
//                            } else {
//                                $(this).gformrow().findFields("id_ds").gfield("option", "disabled", false);
//                            }
//                        },
//                    });
//            }
//            if (content.GEsuParamsDto.gin_upsr_povol ) {
//                FiltryForm.addRow("jres:31901117").addField("gstringbox", { name: "sk_edesk_id", });  //RC 31901117 : Číslo schránky
//            }

//            FiltryForm.addRow("jres:31900981").addField("gstringbox", { name: "id_ext_i_prev", }); //RC 31900981 : ID Ext
//            if (content.GEsuParamsDto.gin_iszr_povole && content.GEsuParamsDto.prizIszr) {
//                FiltryForm.addRow("jres:31900982").addField("gstringbox", { name: "cisloDokladuSzr", }); //RC 31900982 : Číslo dokladu SZR
//            }
//            FiltryForm.addRow({ label: "jres:26265270", customClass:"rowSimpleModeStrict"}).addField("gselectbox", { //RC 26265270 : Aktivita
//                name: "aktivita",
//                dropdown: true,
//                itemTemplate: "{nazev}",
//                helperColumns: ["nazev"],
//                initialValue: { nazev: "jres:31900469", aktivita: 100 }, //RC 31900469 : Jen Aktivní
//                defaultValue: { nazev: "jres:31900469", aktivita: 100 }, //RC 31900469 : Jen Aktivní
//                model: "model.aktivita=value.aktivita",
//                data: new Gordic.Data.View([
//                    { nazev: "jres:31900469", aktivita: 100 }, //RC 31900469 : Jen Aktivní
//                    { nazev: "jres:31900470", aktivita: 900 }, //RC 31900470 : Včetně neaktivních
//                    { nazev: "jres:31900471", aktivita: 999 }, //RC 31900471 : Všechny i zrušené

//                ], { key: "aktivita" }),
//            });
//            FiltryForm.addRow("jres:26265205").addField("gcheck", {
//                name: "oblibene",
//                labelFromRow: false,
//                initialValue: content.gin_esu_nabvla == 1 ? true : false

//            }); //RC 26265205 : Oblíbené

//            FiltryForm.addSection();
//            if (hromadneOvereni) {
//                FiltryForm.addRow("jres:31900205").addField("gselectbox", Gordic.Prefabs.Select.ginctyo(), { //RC 31900205 : Typ organizace
//                    model: "model.typ_org=value.typ_org",
//                    name: "typ_org",
//                });
//            } else {
//                FiltryForm.addRow("jres:31900472").addField("gselectbox", Gordic.Prefabs.Select.gincesu(), { //RC 31900472 : Typ Esu
//                    model: "model.typ_esu=value.typ_esu",
//                    name: "typ_esu"
//                });
//                FiltryForm.addRow("jres:31900205").addField("gselectbox", Gordic.Prefabs.Select.ginctyo(), { //RC 31900205 : Typ organizace
//                    model: "model.typ_org=value.typ_org",
//                    name: "typ_org",
//                    serverFilters: { // TODO Blbost vymazat
//                        typ_esu: new Gordic.Forms.Dependency("typ_esu", "typ_esu", false),

//                    }
//                });
//            }    
            
//            FiltryForm.addRow("jres:26265147").addField("gstringbox", { name: "ulice", }); //RC 26265147 : Ulice
//            FiltryForm.addRow("jres:26265149").addField("gstringbox", { name: "obec", }); //RC 26265149 : Obec
//            FiltryForm.addRow("jres:26265150").addField("gstringbox", { name: "psc", }); //RC 26265150 : PSČ
//            FiltryForm.addRow("jres:26265155").addField("gstringbox", {
//                name: "mail",
//                modelValueTransform: {
//                    apply: function (modelValue) {
//                        return ((modelValue && modelValue != null) ? modelValue.toLowerCase() : modelValue);
//                    },
//                    collect: function (fieldValue) {
//                        return ((fieldValue && fieldValue != null) ? fieldValue.toLowerCase() : fieldValue);
//                    }
//                }
//            }); //RC 26265155 : Mail
//            FiltryForm.addRow("jres:31900363").addField("gselectbox", Gordic.Prefabs.Select.gincsta(), { name: "stat", model: "model.stat=value.stat", }); //RC 31900363 : Státní přís.
//            if (content.GEsuParamsDto.gin_esu_dnvyhl ) {
//                FiltryForm.addRow("jres:26265158").addField("gdatebox", { name: "dat_nar" }, Gordic.Prefabs.Date.withOperators()); //RC 26265158 : Datum narození
//            }
                
//            FiltryForm.addRow("jres:31900473").addField("gstringbox", { name: "zast_prijmeni", }); //RC 31900473 : ZO přijmení
//            FiltryForm.addRow("jres:26265322").addField("gstringbox", { name: "zast_jmeno", }); //RC 26265322 : ZO jméno
//            FiltryForm.addRow("jres:31900474").addField("gstringbox", { name: "mi_prijmeni_lower", }); //RC 31900474 : Matriční přijmení
//            FiltryForm.addRow("jres:31900475").addField("gstringbox", { name: "mi_jmeno_lower", }); //RC 31900475 : Matriční jméno
//            var urpriopt = {
//                name: "ur_pri",
//                model: "model.ur_pri = value.ur_pri",

//            };
//            if (content.UrovnePristupuProVyberoveOknoArrInt != null && content.UrovnePristupuProVyberoveOknoArrInt.length > 0) {
//                urpriopt.serverFilters = {
//                    ur_pri: content.UrovnePristupuProVyberoveOknoArrInt
//                }
//            }
//            FiltryForm.addRow("jres:31900369").addField("gselectbox", Gordic.Prefabs.Select.ginsurp(), urpriopt); //RC 31900369 : Úr. přístupu

//            var stupVerArr = [
//                { nazev: "jres:26265203", ver: 15 }, //RC 26265203 : Všechny
//                { nazev: "jres:26265204", ver: 20 }, //RC 26265204 : Ověřené
//                { nazev: "jres:31900477", ver: 10 }, //RC 31900477 : Neověřené
//            ]
//            if (hromadneOvereni) {
//                stupVerArr.push({ nazev: "Neověřené v SZR ROB, ROS", ver: 300 });
//                stupVerArr.push({ nazev: "Ověřené v ROS", ver: 400 });
//            }

//            FiltryForm.addRow("jres:31900476").addField("gselectbox", { //RC 31900476 : Stup. verifikace
//                name: "stupen_ver",
//                dropdown: true,
//                itemTemplate: "{nazev}",
//                helperColumns: ["nazev"],
//                model: "model.stupen_ver=value.ver",
//                data: new Gordic.Data.View(stupVerArr, { key: "ver" }),
//            });
//            FiltryForm.addRow("jres:26265354").addField("gselectbox", { //RC 26265354 : Typ adresy
//                name: "TypAdr",
//                dropdown: true,
//                model: "model.typ_adr=value.typ",
//                itemTemplate: "{nazev}",
//                data: new Gordic.Data.View([
//                    { typ: 0, nazev: "jres:26265188" }, //RC 26265188 : Trvalá
//                    { typ: 10, nazev: "jres:31901231" }, //RC 31901231 : Doručovací/Pobočka
//                    { typ: 30, nazev: "jres:31900410" }, //RC 31900410 : Kontaktní
//                ], { key: "typ" }),

//            });
            

//            /* test více fieldu na jednom rowu :D 
            
//            FiltryForm.addSection()
//                .addRow({ label: "", name: "typ_datumu" })
//                .addField("gradio", "w-6", {
//                    name: "typ_datumu",

//                    radios: [
//                        { value: "a", label: "jres:25200007" }, //RC 25200007 : Datum podání
//                        { value: "b", label: "jres:25200008" }, //RC 25200008 : Datum zahájení
//                        { value: "c", label: "jres:25200009" } //RC 25200009 : Datum změny
//                    ]
//                    //favoriteRequiredFields: ["datum"]
//                })
//                //.addSection()
//                //.addRow({ label: "", name: "datum"}) //required: true
//                .addField("gdatebox", "w-3", { name: "dat_od", model: "model.dat_od=value", valueType: "date" })
//                .addField("gdatebox", "w-3", { name: "dat_do", model: "model.dat_do=value", valueType: "date" });

//            */
//            return FiltryForm;
//        },

//        getJmennyRejstrikFilterForm: function (content) {

//            var simple = false;
//            if (content && content.FieldsToFilterpanel && content.FieldsToFilterpanel.length > 0) {
//                simple = true;
//            }

//            var FiltryForm = new Gordic.Forms.Form({
//                tabLabel: "jres:31900464", //RC 31900464 : Údaje externího subjektu
//                name: "Filtry",
//                layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1"
//            })
//                .addSection();
//            FiltryForm.addRow({ label: "jres:26265145", name: "zkratka" }).addField("gstringbox", { name: "zkratka", }); //RC 26265145 : Zkratka

//            var nazevOperators = [];
//            var nazevDefaultoperator = "";
//            var podminka = false;
//            if (content.gin_esu_zphlena == 2) {
//                nazevOperators = ["CONTAINS", "LIKE"];
//                nazevDefaultoperator = "LIKE";
//            } else if (content.gin_esu_zphlena == 1) {
//                nazevOperators = ["CONTAINS", "LIKE"];
//                nazevDefaultoperator = "CONTAINS";
//            } else {
//                nazevOperators = ["LIKE"];
//                nazevDefaultoperator = "LIKE";
//            }

//            FiltryForm.addRow("jres:26265146").addField("gstringbox", { //RC 26265146 : Název
//                name: "nazev",
//                //validators: [
//                //    new Gordic.Validators.Length({ min: 0, max: 30, message: "Pole je příliš dlouhé" })
//                //    , new Gordic.Validators.Required({ message: "Pole je povinné"})
//                //]

//            }, Gordic.Prefabs.String.withOperators({
//                operators: nazevOperators,
//                defaultOperator: nazevDefaultoperator
//            })
//            );
//            FiltryForm.addRow("jres:32100017").addField("gstringbox", { name: "ob_jmeno", }); //RC 32100017 : Obchodní jméno
//            FiltryForm.addRow("jres:31900465").addField("gstringbox", { name: "rc", }); //RC 31900465 : Rodné  číslo
//            FiltryForm.addRow("jres:26265195").addField("gstringbox", { name: "ico" }); //, initialValue:"pidli" , validators: [new Gordic.Validators.Required()] //RC 26265195 : Ičo
//            FiltryForm.addRow("jres:31900466").addField("gstringbox", { //RC 31900466 : Dič
//                name: "dic",
//                favoriteRequiredFields: ["ico"]
//            });
//            FiltryForm.addRow("jres:31900467").addField("gstringbox", { name: "oc", }); //RC 31900467 : Osobní číslo
//            FiltryForm.addRow("jres:31900468").addField("gstringbox", "w-9", { name: "bu_ci", }).addField("gstringbox", "w-3", { name: "sk_ci", }); //RC 31900468 : BÚ/SK
//            FiltryForm.addRow("jres:26265221").addField("gstringbox", { name: "ixs_esu", }); //RC 26265221 : ID
//            if (content.GEsuParamsDto.gin_ssl_datschr || (content.gin_odes_esj_po == 1)) {
//                FiltryForm
//                    .addRow("jres:31900366").addField("gstringbox", "w-6", { name: "id_ds", }) //RC 31900366 : ID DS
//                    .addField("gcheck", "w-4", {
//                        label: "Jen s DS",
//                        name: "Jenid_ds",
//                        model: "model.id_ds=value",
//                        modelValueTransform: {
//                            apply: function (modelValue) {
//                                if (modelValue === "_%") {
//                                    return true;
//                                } else {
//                                    return false;
//                                }
//                            },
//                            collect: function (fieldValue) {
//                                if (fieldValue === true) {
//                                    return "_%";
//                                } else {
//                                    return $(this).gformrow().findFields("id_ds").gfield("getValue");
//                                }
//                            }
//                        },
//                        change: function (ev, changeObj) {
//                            if (changeObj.value === true) {
//                                $(this).gformrow().findFields("id_ds").gfield("clear");
//                                $(this).gformrow().findFields("id_ds").gfield("option", "disabled", true);
//                            } else {
//                                $(this).gformrow().findFields("id_ds").gfield("option", "disabled", false);
//                            }
//                        },
//                    });
//            }
//                /*
//                FiltryForm.addRow({ label: "jres:26265270", customClass: "rowSimpleModeStrict" }).addField("gselectbox", { //RC 26265270 : Aktivita
//                    name: "aktivita",
//                    dropdown: true,
//                    itemTemplate: "{nazev}",
//                    helperColumns: ["nazev"],
//                    initialValue: { nazev: "jres:31900469", aktivita: 100 }, //RC 31900469 : Jen Aktivní
//                    model: "model.aktivita=value.aktivita",
//                    data: new Gordic.Data.View([
//                        { nazev: "jres:31900469", aktivita: 100 }, //RC 31900469 : Jen Aktivní
//                        { nazev: "jres:31900470", aktivita: 900 }, //RC 31900470 : Včetně neaktivních
//                        { nazev: "jres:31900471", aktivita: 999 }, //RC 31900471 : Všechny i zrušené

//                    ], { key: "aktivita" }),
//                });
//                */
//            FiltryForm.addRow("jres:26265205").addField("gcheck", { name: "oblibene", labelFromRow: false }); //RC 26265205 : Oblíbené

//            FiltryForm.addSection();

//            FiltryForm.addRow("jres:31900472").addField("gselectbox", Gordic.Prefabs.Select.gincesu(), { //RC 31900472 : Typ Esu
//                model: "model.typ_esu=value.typ_esu",
//                name: "typ_esu"
//            });
//            FiltryForm.addRow("jres:31900205").addField("gselectbox", Gordic.Prefabs.Select.ginctyo(), { //RC 31900205 : Typ organizace
//                model: "model.typ_org=value.typ_org",
//                name: "typ_org",
//                serverFilters: { // TODO Blbost vymazat
//                    typ_esu: new Gordic.Forms.Dependency("typ_esu", "typ_esu", false),

//                }
//            });
//            FiltryForm.addRow("jres:26265147").addField("gstringbox", { name: "ulice", }); //RC 26265147 : Ulice
//            FiltryForm.addRow("jres:26265149").addField("gstringbox", { name: "obec", }); //RC 26265149 : Obec
//            FiltryForm.addRow("jres:26265150").addField("gstringbox", { name: "psc", }); //RC 26265150 : PSČ
//            FiltryForm.addRow("jres:26265155").addField("gstringbox", {
//                name: "mail",
//                modelValueTransform: {
//                    apply: function (modelValue) {
//                        return ((modelValue && modelValue != null) ? modelValue.toLowerCase() : modelValue);
//                    },
//                    collect: function (fieldValue) {
//                        return ((fieldValue && fieldValue != null) ? fieldValue.toLowerCase() : fieldValue);
//                    }
//                }
//            }); //RC 26265155 : Mail
//            FiltryForm.addRow("jres:31900363").addField("gselectbox", Gordic.Prefabs.Select.gincsta(), { name: "stat", model: "model.stat=value.stat", }); //RC 31900363 : Státní přís.
//            if (content.GEsuParamsDto.gin_esu_dnvyhl) {
//                FiltryForm.addRow("jres:26265158").addField("gdatebox", { name: "dat_nar" }, Gordic.Prefabs.Date.withOperators()); //RC 26265158 : Datum narození
//            }

//            FiltryForm.addRow("jres:31900473").addField("gstringbox", { name: "zast_prijmeni", }); //RC 31900473 : ZO přijmení
//            FiltryForm.addRow("jres:26265322").addField("gstringbox", { name: "zast_jmeno", }); //RC 26265322 : ZO jméno
//            FiltryForm.addRow("jres:31900474").addField("gstringbox", { name: "mi_prijmeni_lower", }); //RC 31900474 : Matriční přijmení
//            FiltryForm.addRow("jres:31900475").addField("gstringbox", { name: "mi_jmeno_lower", }); //RC 31900475 : Matriční jméno

//            var urpriopt = {
//                name: "ur_pri",
//                model: "model.ur_pri = value.ur_pri",
                
//            };
//            if (content.UrovnePristupuProVyberoveOknoArrInt != null && content.UrovnePristupuProVyberoveOknoArrInt.length  > 0 ) {
//                urpriopt.serverFilters = {
//                    ur_pri: content.UrovnePristupuProVyberoveOknoArrInt
//                }
//            }

//            FiltryForm.addRow("jres:31900369").addField("gselectbox", Gordic.Prefabs.Select.ginsurp(), urpriopt ); //RC 31900369 : Úr. přístupu
//            FiltryForm.addRow("jres:31900476").addField("gselectbox", { //RC 31900476 : Stup. verifikace
//                name: "stupen_ver",
//                dropdown: true,
//                itemTemplate: "{nazev}",
//                helperColumns: ["nazev"],
//                model: "model.stupen_ver=value.ver",
//                data: new Gordic.Data.View([
//                    { nazev: "jres:26265203", ver: 15 }, //RC 26265203 : Všechny
//                    { nazev: "jres:26265204", ver: 20 }, //RC 26265204 : Ověřené
//                    { nazev: "jres:31900477", ver: 10 }, //RC 31900477 : Neověřené
//                    { nazev: "jres:31900866", ver: 130 }, //RC 31900866 : Neověřené v SZR ROB, ROS
//                    { nazev: "jres:31900867", ver: 140 }, //RC 31900867 : Ověřené v ROS
//                ], { key: "ver" }),
//            });


//            FiltryForm.addRow("jres:26265354").addField("gselectbox", { //RC 26265354 : Typ adresy
//                name: "TypAdr",
//                dropdown: true,
//                model: "model.typ_adr=value.typ",
//                itemTemplate: "{nazev}",
//                data: new Gordic.Data.View([
//                    { typ: 0, nazev: "jres:26265188" }, //RC 26265188 : Trvalá
//                    { typ: 10, nazev: "jres:26265189" }, //RC 26265189 : Doručovací
//                    { typ: 30, nazev: "jres:31900410" }, //RC 31900410 : Kontaktní
//                ], { key: "typ" }),

//            });
            

//            return FiltryForm;
//        },

//        getKartotekaFilterForm2: function (content) {

//            var simple = false;
//            if (content && content.FieldsToFilterpanel && content.FieldsToFilterpanel.length > 0) {
//                simple = true;
//            }

//            var FiltryForm = new Gordic.Forms
//                .Form({
//                    tabLabel: "Údaje externího subjektu",
//                    name: "Filtry",
//                    layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1"
//                })
//                .addSection();
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Zkratka) > -1) )) {
//                FiltryForm.addRow({ label: "Zkratka", name: "zkratka" }).addField("gstringbox", { name: "zkratka", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Nazev) > -1))) {
//                FiltryForm.addRow("Název").addField("gstringbox", {
//                    name: "nazev",
//                    //validators: [
//                    //    new Gordic.Validators.Length({ min: 0, max: 30, message: "Pole je příliš dlouhé" })
//                    //    , new Gordic.Validators.Required({ message: "Pole je povinné"})
//                    //]

//                }, Gordic.Prefabs.String.withOperators({
//                    defaultOperator: "CONTAINS",
//                })
//                );
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.ObchodniJmeno) > -1))) {
//                FiltryForm.addRow("Obchodní jméno").addField("gstringbox", { name: "ob_jmeno", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.RodneCislo) > -1))) {
//                FiltryForm.addRow("Rodné  číslo").addField("gstringbox", { name: "rc", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Ico) > -1))) {
//                FiltryForm.addRow("Ičo").addField("gstringbox", { name: "ico" }); //, validators: [new Gordic.Validators.Required()]
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Dic) > -1))) {
//                FiltryForm.addRow("Dič").addField("gstringbox", {
//                    name: "dic",
//                    favoriteRequiredFields: ["ico"]
//                });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.OsobniCislo) > -1))) {
//                FiltryForm.addRow("Osobní číslo").addField("gstringbox", { name: "oc", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.BuSK) > -1))) {
//                FiltryForm.addRow("BÚ/SK").addField("gstringbox", "w-9", { name: "bu_ci", }).addField("gstringbox", "w-3", { name: "sk_ci", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.ID) > -1))) {
//                FiltryForm.addRow("ID").addField("gstringbox", { name: "ixs_esu", });
//            }
//            if ((!simple && (content.GEsuParamsDto.gin_ssl_datschr || (content.gin_odes_esj_po == 1))) || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.IDDS) > -1))) {
//                FiltryForm
//                    .addRow("ID DS").addField("gstringbox", "w-6", { name: "id_ds", })
//                    .addField("gcheck", "w-4", {
//                        label: "Jen s DS",
//                        name: "Jenid_ds",
//                        model: "model.id_ds=value",
//                        modelValueTransform: {
//                            apply: function (modelValue) {
//                                if (modelValue === "_%") {
//                                    return true;
//                                } else {
//                                    return false;
//                                }
//                            },
//                            collect: function (fieldValue) {
//                                if (fieldValue === true) {
//                                    return "_%";
//                                } else {
//                                    return $(this).gformrow().findFields("id_ds").gfield("getValue");
//                                }
//                            }
//                        },
//                        change: function (ev, changeObj) {
//                            if (changeObj.value === true) {
//                                $(this).gformrow().findFields("id_ds").gfield("clear");
//                                $(this).gformrow().findFields("id_ds").gfield("option", "disabled", true);
//                            } else {
//                                $(this).gformrow().findFields("id_ds").gfield("option", "disabled", false);
//                            }
//                        },
//                    });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Aktivita) > -1))) {
//                FiltryForm.addRow("Aktivita").addField("gselectbox", {
//                    name: "aktivita",
//                    dropdown: true,
//                    itemTemplate: "{nazev}",
//                    helperColumns: ["nazev"],
//                    initialValue: { nazev: "Jen Aktivní", aktivita: 100 },
//                    model: "model.aktivita=value.aktivita",
//                    data: new Gordic.Data.View([
//                        { nazev: "Jen Aktivní", aktivita: 100 },
//                        { nazev: "Včetně neaktivních", aktivita: 900 },
//                        { nazev: "Všechny i zrušené", aktivita: 999 },

//                    ], { key: "aktivita" }),
//                });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Oblibene) > -1))) {
//                FiltryForm.addRow("Oblíbené").addField("gcheck", { name: "oblibene", labelFromRow: false });
//            }
            
//            FiltryForm.addSection();
               
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.TypEsu) > -1))) {
//                FiltryForm.addRow("Typ Esu").addField("gselectbox", Gordic.Prefabs.Select.gincesu(), {
//                    model: "model.typ_esu=value.typ_esu",
//                    name: "typ_esuNmae",
//                });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.TypOrganizace) > -1))) {
//                FiltryForm.addRow("Typ organizace").addField("gselectbox", Gordic.Prefabs.Select.ginctyo(), {
//                    model: "model.typ_org=value.typ_org",
//                    name: "typ_org",
//                    serverFilters: { // TODO Blbost vymazat
//                        typ_esu: new Gordic.Forms.Dependency("typ_esuNmae", "typ_esu", false),

//                    }
//                });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Ulice) > -1))) {
//                FiltryForm.addRow("Ulice").addField("gstringbox", { name: "ulice", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Obec) > -1))) {
//                FiltryForm.addRow("Obec").addField("gstringbox", { name: "obec", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.PSC) > -1))) {
//                FiltryForm.addRow("PSČ").addField("gstringbox", { name: "psc", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Mail) > -1))) {
//                FiltryForm.addRow("Mail").addField("gstringbox", {
//                    name: "mail",
//                    modelValueTransform: {
//                        apply: function (modelValue) {
//                            return ((modelValue && modelValue != null) ? modelValue.toLowerCase() : modelValue);
//                        },
//                        collect: function (fieldValue) {
//                            return ((fieldValue && fieldValue != null) ? fieldValue.toLowerCase() : fieldValue);
//                        }
//                    }
//                });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.StatniPris) > -1))) {
//                FiltryForm.addRow("Státní přís.").addField("gselectbox", Gordic.Prefabs.Select.gincsta(), { name: "stat", model: "model.stat=value.stat", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.DatumNarozeni) > -1))) {
//                FiltryForm.addRow("Datum narození").addField("gdatebox", { name: "dat_nar" }, Gordic.Prefabs.Date.withOperators());
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.ZOPrijmeni) > -1))) {
//                FiltryForm.addRow("ZO přijmení").addField("gstringbox", { name: "zast_prijmeni", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.ZOJmeno) > -1))) {
//                FiltryForm.addRow("ZO jméno").addField("gstringbox", { name: "zast_jmeno", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.MatricniPeijmeni) > -1))) {
//                FiltryForm.addRow("Matriční přijmení").addField("gstringbox", { name: "mi_prijmeni_lower", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.MatricníJmeno) > -1))) {
//                FiltryForm.addRow("Matriční jméno").addField("gstringbox", { name: "mi_jmeno_lower", });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.UrPristupu) > -1))) {
//                FiltryForm.addRow("Úr. přístupu").addField("gselectbox", Gordic.Prefabs.Select.ginsurp(), { name: "ur_pri", model: "model.ur_pri = value.ur_pri" });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.StupVerifikace) > -1))) {
//                FiltryForm.addRow("Stup. verifikace").addField("gselectbox", {
//                    name: "stupen_ver",
//                    dropdown: true,
//                    itemTemplate: "{nazev}",
//                    helperColumns: ["nazev"],
//                    model: "model.stupen_ver=value.ver",
//                    data: new Gordic.Data.View([
//                        { nazev: "Všechny", ver: 15 },
//                        { nazev: "Ověřené", ver: 20 },
//                        { nazev: "Neověřené", ver: 10 },
//                    ], { key: "ver" }),
//                });
//            }
//            if (!simple || (simple && (content.FieldsToFilterpanel.indexOf(Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.TypAdresy) > -1))) {
//                FiltryForm.addRow("Typ adresy").addField("gselectbox", {
//                    name: "TypAdr",
//                    dropdown: true,
//                    model: "model.typ_adr=value.typ",
//                    itemTemplate: "{nazev}",
//                    data: new Gordic.Data.View([
//                        { typ: 0, nazev: "Trvalá" },
//                        { typ: 10, nazev: "Doručovací" },
//                        { typ: 30, nazev: "Kontaktní" },
//                    ], { key: "typ" }),

//                });
//            }

//            return FiltryForm;
//        },

//        jePovolenoZobrazeniKartotekyBezVazbyNaDokument: function (Ixp, dialogs) {
//            var param_gin_esu_vybvs = Gordic.Esu.Params.gin_esu_vybvs;
//            var ok = true;
//            if ((param_gin_esu_vybvs === 0) && (Ixp === "" || Ixp === "0000X000004J" || Ixp === "0000X0000003"))   // nejsou povoleny masky ani karotéka
//            {
//                ok = false;
//                if (dialogs) { 
//                    dialogs.alert("jres:31900323"); //RC 31900323 : Není povoleno zobrazení karotéky bez vazby na dokument/doklad.
//                }
//            }
//            return ok;

//        },

//        jePovolenaZobrazeniKartotekyZMasek: function (Ixp, dialogs) {
//            var param_gin_esu_vybvs = Gordic.Esu.Params.gin_esu_vybvs;
//            var ok = true;
//            if ((param_gin_esu_vybvs == 2) && (Ixp == "0000X000004J" || Ixp == ""))   // kartotéka ESU není povolena - jsou povoleny jen masky
//            {
//                ok = false;
//                if (dialogs) {
//                    dialogs.alert("jres:31900323"); //RC 31900323 : Není povoleno zobrazení karotéky bez vazby na dokument/doklad.
//                }
//            }
//            return ok;

//        },

//        zalogujGdprExportDat: function (listZaznamu, duvodUcel, content) {
//            if (listZaznamu != null && listZaznamu.length > 0) {
//                this.zalogujGdpr(listZaznamu, 440, duvodUcel);
//            } else {
//                console.log("jres:31900666"); //RC 31900666 : Do exportu dat přišlo 0 záznamů.
//            }
//        },

//        zalogujGdpr: function (listZaznamu, zmena, duvodUcel, content) {

//            var opt = {
//                listZaznamu: listZaznamu,
//                zmena: zmena,
//                duvodUcel: duvodUcel ? duvodUcel : ""
//            };

//            new Gordic.Isl.Task("GEsuUtils", "ZalogujGdpr", opt).getData() 
//                .done(function (retVal) {
//                    //asi bez reakce
//                }).fail(function () {
//                    //asi bez reakce
//                });
//        },

//        aktivitaNumberToText: function(aktivita) {
            
//            switch (aktivita) {
//                case 100: return "jres:31900717"; //RC 31900717 : Aktivní
//                case 300: return "jres:31900718"; //RC 31900718 : Připraven
//                case 500: return "jres:31900719"; //RC 31900719 : Neaktivní
//                case 600: return "jres:31900720"; //RC 31900720 : Návrh
//                case 900: return "jres:31900721"; //RC 31900721 : Zrušen
//                default: return "";
//            }

//        },

//        kartotekaGridFormat: function (gridKolonky, content,zastupneOsobyAkceniTlacitko) {
//            //gin_odes_esj_po
//            //gin_esu_dnzobr
//            var columnList = "";
            

//            gridKolonky
//                .addHtmlColumn({
//                    name: "cnt_zo",
//                    caption: "jres:26265207", //RC 26265207 : Zástupné osoby
//                    customClass: "center",
//                    width: 40,
//                    cellTemplate: Gordic.Esu.Function.cellTemplateZastupneOsoby(content, zastupneOsobyAkceniTlacitko) // internal call nactiZastupneOsoby(data.ixs_esu);

//                });
//            columnList = columnList + "cnt_zo";
//            gridKolonky
//                .addIconColumn({
//                    name: "bu_exist",
//                    caption: "jres:26265121", //RC 26265121 : Bankovní účty
//                    customClass: "center",
//                    width: 40,
//                    iconTemplate: function (data) {
//                        if (data.bu_exist) {
//                            return { icon: "fa-university", tooltip: "jres:31900112" }; //RC 31900112 : Subjekt má aktivní bankovní účet (účty).
//                        } else {
//                            return null;
//                        }
//                    }
//                });
//            columnList = columnList + ",bu_exist";
//            if (content.GEsuParamsDto.gin_ssl_datschr || (content.gin_odes_esj_po === 1)) {
//                gridKolonky.addIconColumn(Gordic.Esu.Function.ColumnDatovaSchrankaZIco_ds());
//                columnList = columnList + ",ico_ds";
//            }

//            gridKolonky
//                .addIconColumn(Gordic.Esu.Function.ColumnTypAdresy());
//            columnList = columnList + ",icoAdresy";
//            if ((content.GEsuParamsDto.gin_iszr_povole || content.GEsuParamsDto.gin_iszr_povopr) && content.GEsuParamsDto.gin_iszr_rozin) {
//                gridKolonky
//                    .addIconColumn(Gordic.Esu.Function.DatumOvereniVSZRColumn());

//                columnList = columnList + ",iszr";
//                gridKolonky
//                    .addIconColumn(Gordic.Esu.Function.ColumnIszrIkonka(content.GEsuParamsDto.gin_esu_inzobr, content.GEsuParamsDto.gin_iszr_zostv));
//                columnList = columnList + ",IszrIkonka";
//            }

//            gridKolonky.addTextColumn({
//                name: "zkratka",
//                caption: "jres:26265145", //RC 26265145 : Zkratka
//                description: "jres:26265145", //RC 26265145 : Zkratka
//                width: 100,
//                cellTemplate: "{zkratka}"
//            })
//            columnList = columnList + ",zkratka";
//            gridKolonky
//                .addHtmlColumn({ //addTextColumn
//                    name: "nazev",
//                    caption: "jres:26265146", //RC 26265146 : Název
//                    width: 250,
//                    description: "jres:26265146", //RC 26265146 : Název
//                    cellTemplate: "{nazev}"
//                });
//            columnList = columnList + ",nazev";
//            gridKolonky
//                .addTextColumn({
//                    name: "ico",
//                    caption: "jres:26265288", //RC 26265288 : IČO
//                    description: "jres:26265288", //RC 26265288 : IČO
//                    cellTemplate: "{ico}",
//                    width: 80,
//                    customClass: function (rowMeta) {
//                        var ret = "";
//                        var row = rowMeta.data;
//                        if (row.id_ds != null && row.id_ds.trim() !== "") {
//                            if ((row.ico != null && row.ico.trim() !== "") && (row.ico_isds != null && row.ico_isds.trim() !== "") && (row.ico.trim().lastIndexOf(row.ico_isds.trim()) === -1)) {
//                                ret = "g-state-text g-state-important";
//                            }

//                        }
//                        return ret;// metarow.data.fixedWidth === true ? "ui-disabled" : "";
//                    },
//                });
//            columnList = columnList + ",ico";
//            gridKolonky
//                .addTextColumn({
//                    name: "dic",
//                    width: 100,
//                    caption: "jres:32100016", //RC 32100016 : DIČ
//                    description: "jres:32100016", //RC 32100016 : DIČ
//                    cellTemplate: "{dic}"
//                })
//                ;
//            columnList = columnList + ",dic";
//            //if (content.GEsuParamsDto.gin_esu_inzobr) { // odebráno kuli formátování. 
//                gridKolonky.addTextColumn({ // TODO Insolvence
//                    name: "druh_stav_r_txt",
//                    width: 100,
//                    caption: "jres:26265284", //RC 26265284 : Insolvence
//                    description: "jres:26265284", //RC 26265284 : Insolvence
//                    cellTemplate: "{druh_stav_r_txt}"
//                });
//                //columnList = columnList + ",druh_stav_r_txt";
//            //}
//            if (content.GEsuParamsDto.gin_esu_inzobr) { 
//                columnList = columnList + ",druh_stav_r_txt";

//            }
//            gridKolonky
//                .addNumberColumn({
//                    name: "ur_pri",
//                    width: 60,
//                    caption: "jres:31900369", //RC 31900369 : Úr. přístupu
//                    description: "jres:26265382", //RC 26265382 : Úroveň přístupu
//                    cellTemplate: "{ur_pri}"
//                });
//            columnList = columnList + ",ur_pri";
//            gridKolonky
//                .addTextColumn({
//                    name: "ulice",
//                    width: 150,
//                    caption: "jres:26265147", //RC 26265147 : Ulice
//                    description: "jres:26265147", //RC 26265147 : Ulice
//                    cellTemplate: "{ulice}"
//                });
//            columnList = columnList + ",ulice";
//            gridKolonky
//                .addTextColumn({
//                    name: "cpop",
//                    width: 110,
//                    caption: "jres:31900173", //RC 31900173 : Číslo popisné
//                    description: "jres:31900173", //RC 31900173 : Číslo popisné
//                    cellTemplate: "{cpop}"
//                });
//            columnList = columnList + ",cpop";
//            gridKolonky
//                .addTextColumn({
//                    name: "cor",
//                    width: 110,
//                    caption: "jres:31900172", //RC 31900172 : Číslo orientační
//                    description: "jres:31900172", //RC 31900172 : Číslo orientační
//                    cellTemplate: "{cor}"
//                });
//            columnList = columnList + ",cor";
//            gridKolonky
//                .addTextColumn({
//                    name: "obec",
//                    caption: "jres:26265149", //RC 26265149 : Obec
//                    description: "jres:26265149", //RC 26265149 : Obec
//                    width: 110,
//                    cellTemplate: "{obec}"
//                });
//            columnList = columnList + ",obec";
//            gridKolonky
//                .addTextColumn({
//                    name: "cast_obce",
//                    caption: "jres:26265235", //RC 26265235 : Část obce
//                    width: 110,
//                    description: "jres:26265235", //RC 26265235 : Část obce
//                    cellTemplate: "{cast_obce}"
//                });
//            columnList = columnList + ",cast_obce";
//            gridKolonky
//                .addTextColumn({
//                    name: "psc",
//                    width: 50,
//                    caption: "jres:26265150", //RC 26265150 : PSČ
//                    description: "jres:26265150", //RC 26265150 : PSČ
//                    cellTemplate: "{psc}"
//                });
//            columnList = columnList + ",psc";
//            gridKolonky
//                .addTextColumn({
//                    name: "mail",
//                    width: 150,
//                    caption: "jres:26265155", //RC 26265155 : Mail
//                    description: "jres:26265155", //RC 26265155 : Mail
//                    cellTemplate: "{mail}"
//                });
//            columnList = columnList + ",mail";
//            if (content.GEsuParamsDto.gin_iszr_zostv) {
//                gridKolonky.addTextColumn({
//                    name: "stupen_ver_txt",
//                    width: 130,
//                    caption: "jres:26265323", //RC 26265323 : Stupeň verifikace
//                    description: "jres:26265323", //RC 26265323 : Stupeň verifikace
//                    cellTemplate: "{stupen_ver_txt}"
//                });
//                columnList = columnList + ",stupen_ver_txt";
//            }
//            if (content.GEsuParamsDto.gin_esu_poumid) {
//                gridKolonky.addTextColumn({
//                    name: "mi_jmeno",
//                    width: 100,
//                    caption: "jres:31900475", //RC 31900475 : Matriční jméno
//                    description: "jres:31900475", //RC 31900475 : Matriční jméno
//                    cellTemplate: "{mi_jmeno}"
//                });
//                columnList = columnList + ",mi_jmeno";
//                gridKolonky
//                    .addTextColumn({
//                        name: "mi_prijmeni",
//                        width: 100,
//                        caption: "jres:32115043", //RC 32115043 : Matriční příjmení
//                        description: "jres:32115043", //RC 32115043 : Matriční příjmení
//                        cellTemplate: "{mi_prijmeni}"
//                    });
//                columnList = columnList + ",mi_prijmeni";
//            }
//            if (content.GEsuParamsDto.gin_esu_rczobr) {
//                gridKolonky.addTextColumn({
//                    name: "rc",
//                    width: 100,
//                    caption: "jres:26265194", //RC 26265194 : RČ
//                    description: "jres:26265194", //RC 26265194 : RČ
//                    cellTemplate: "{rc}"
//                });
//                columnList = columnList + ",rc";
//            }
//            if (content.gin_esu_dnzobr == 1) {
//                gridKolonky.addDateColumn({
//                    name: "dat_nar",
//                    caption: "jres:26265158", //RC 26265158 : Datum narození
//                    description: "jres:26265158", //RC 26265158 : Datum narození
//                    //cellTemplate: "{dat_nar}"
//                });
//                columnList = columnList + ",dat_nar";
//            }
//            gridKolonky.addDateColumn({
//                name: "dat_umrti",
//                caption: "jres:32115044", //RC 32115044 : Datum úmrtí/ukončení činnosti
//                description: "jres:32115044", //RC 32115044 : Datum úmrtí/ukončení činnosti
//                //cellTemplate: "{dat_umrti}"
//            });
//            columnList = columnList + ",dat_umrti";
//            gridKolonky
//                .addTextColumn({
//                    name: "ixs_esu",
//                    caption: "jres:26265221", //RC 26265221 : ID
//                    description: "jres:26265221", //RC 26265221 : ID
//                    cellTemplate: "{ixs_esu}"
//                });
//            columnList = columnList + ",ixs_esu";
//            gridKolonky
//                .addTextColumn({
//                    name: "id_ds",
//                    width: 60,
//                    caption: "jres:31900366", //RC 31900366 : ID DS
//                    description: "jres:31900366", //RC 31900366 : ID DS
//                    cellTemplate: "{id_ds}"
//                });
//            columnList = columnList + ",id_ds";


//            if (content.GEsuParamsDto.gin_upsr_povol) {
//                gridKolonky
//                    .addTextColumn({
//                        name: "sk_edesk_id",
//                        width: 60,
//                        caption: "jres:31901116", //RC 31901116 : Číslo schránky
//                        description: "jres:31901116", //RC 31901116 : Číslo schránky
//                        cellTemplate: "{sk_edesk_id}"
//                    });
//                columnList = columnList + ",sk_edesk_id";
//            }
//            gridKolonky
//                .addTextColumn({
//                    name: "typ_upadku_txt",
//                    width: 100,
//                    caption: "jres:26265159", //RC 26265159 : Úpadek
//                    description: "jres:26265159", //RC 26265159 : Úpadek
//                    cellTemplate: "{typ_upadku_txt}"
//                });
//            columnList = columnList + ",typ_upadku_txt";
//            if (content.GEsuParamsDto.gin_esu_pcisdok) {
//                gridKolonky.addTextColumn({
//                    name: "oc",
//                    width: 100,
//                    caption: content.GEsuParamsDto.gin_esu_ocnazev || "jres:26265191", //RC 26265191 : OČ
//                    description: content.GEsuParamsDto.gin_esu_ocnazev || "jres:26265191", //RC 26265191 : OČ
//                    cellTemplate: "{oc}"
//                });
//                columnList = columnList + ",oc";
//            }
//            gridKolonky
//                .addDateColumn({
//                    name: "dat_zmena",
//                    caption: "jres:26265272", //RC 26265272 : Datum změny
//                    description: "jres:26265272", //RC 26265272 : Datum změny
//                    //cellTemplate: "{dat_zmena}"
//                });
//            columnList = columnList + ",dat_zmena";
//            gridKolonky
//                .addTextColumn({
//                    name: "zmenu_prov_rf",
//                    width: 100,
//                    caption: "jres:26265161", //RC 26265161 : Změnu provedl
//                    description: "jres:26265161",  //RC 26265161 : Změnu provedl
//                    cellTemplate: "{zmenu_prov_rf}"
//                });
//            columnList = columnList + ",zmenu_prov_rf";
//            gridKolonky
//                .addTextColumn({
//                    name: "ixs_eko",
//                    width: 150,
//                    caption: "jres:31900195", //RC 31900195 : ID ekonomického subjektu
//                    description: "jres:31900195", //RC 31900195 : ID ekonomického subjektu
//                    cellTemplate: "{ixs_eko}",
//                    groupings: {
//                        default: {
//                            _presetCaption: "test", //RC 31950319 : Spis. znak
//                            grouping: {
//                                //hash: function (meta, rows) {
//                                //    var d = meta.data;
//                                //    return d.spis_znak;
//                                //  //  return d.nazev && d.nazev.length > 0 ? d.nazev.charAt(0).toUpperCase() : null;
//                                //},
//                                captionText: function (row) {
//                                    var txt = row.data.ixs_eko;
//                                    if (content.TabulkaSubjektu != null && content.TabulkaSubjektu.length > 0) {
//                                        var vys = content.TabulkaSubjektu.filter(function (osoba) {
//                                            return osoba.ixs_esu === row.data.ixs_eko;
//                                        });
//                                        if (vys != null && vys.length > 0) {
//                                            txt = vys[0].nazev + " - " + txt;
//                                        }
//                                    }
//                                    return txt; //RC 32000744 : Neurčeno
//                                },
//                                sort: "icoAdresy",
//                                hideColumn: false
//                            }
//                        }
//                    },
//                });
//            columnList = columnList + ",ixs_eko";
//            gridKolonky
//                .addTextColumn({
//                    name: "st0",
//                    caption: "jres:31900384" + " 1", //RC 31900384 : Řádek
//                    description: "jres:31900384" + " 1", //RC 31900384 : Řádek
//                    cellTemplate: "{st0}"
//                });
//            columnList = columnList + ",st0";
//            gridKolonky
//                .addTextColumn({
//                    name: "st1",
//                    caption: "jres:31900384" + " 2", //RC 31900384 : Řádek
//                    description: "jres:31900384" + " 2", //RC 31900384 : Řádek
//                    cellTemplate: "{st1}"
//                });
//            columnList = columnList + ",st1";
//            gridKolonky
//                .addTextColumn({
//                    name: "st2",
//                    caption: "jres:31900384" + " 3", //RC 31900384 : Řádek
//                    description: "jres:31900384" + " 3", //RC 31900384 : Řádek
//                    cellTemplate: "{st2}"
//                });
//            columnList = columnList + ",st2";
//            gridKolonky
//                .addTextColumn({
//                    name: "st3",
//                    caption: "jres:31900384" + " 4", //RC 31900384 : Řádek
//                    description: "jres:31900384" + " 4", //RC 31900384 : Řádek
//                    cellTemplate: "{st3}"
//                });
//            columnList = columnList + ",st3";
//            gridKolonky
//                .addTextColumn({
//                    name: "st4",
//                    caption: "jres:31900384" + " 5", //RC 31900384 : Řádek
//                    description: "jres:31900384" + " 5", //RC 31900384 : Řádek
//                    cellTemplate: "{st4}"
//                });
//            columnList = columnList + ",st4";
//            gridKolonky
//                .addTextColumn({
//                    name: "st5",
//                    caption: "jres:31900384" + " 6", //RC 31900384 : Řádek
//                    description: "jres:31900384" + " 6", //RC 31900384 : Řádek
//                    cellTemplate: "{st5}"
//                });
//            columnList = columnList + ",st5";
//            gridKolonky
//                .addTextColumn({
//                    name: "st6",
//                    caption: "jres:31900384" + " 7", //RC 31900384 : Řádek
//                    description: "jres:31900384" + " 7", //RC 31900384 : Řádek
//                    cellTemplate: "{st6}"
//                });
//            columnList = columnList + ",st6";
//            gridKolonky
//                .addTextColumn({
//                    name: "st7",
//                    caption: "jres:31900384" + " 8", //RC 31900384 : Řádek
//                    description: "jres:31900384" + " 8", //RC 31900384 : Řádek
//                    cellTemplate: "{st7}"
//                })
//                ;
//            columnList = columnList + ",st7";
//            gridKolonky
//                .addTextColumn({
//                    name: "ixs_nad",
//                    width: 120,
//                    caption: "jres:31900979", //RC 31900979 : ID Hlavního ESU
//                    description: "jres:31900979", //RC 31900979 : ID Hlavního ESU
//                    cellTemplate: "{ixs_nad}"
//                });
//            columnList = columnList + ",ixs_nad";
//            gridKolonky
//                .addTextColumn({
//                    name: "typ_adr",
//                    width: 60,
//                    caption: "jres:31900980", //RC 31900980 : Typ adresy
//                    description: "jres:31900980", //RC 31900980 : Typ adresy
//                    cellTemplate: "{typ_adr}"
//                });
//            //columnList = columnList + ",typ_adr";
//            gridKolonky
//                .addNumberColumn({
//                    name: "stupen_ver",
//                    width: 50,
//                    caption: "jres:31900977", //RC 31900977 : Stupeň ver.
//                    description: "jres:31900978", //RC 31900978 : Stupeň verifikace
//                    cellTemplate: "{stupen_ver}",
//                    visible: false
//                });
//            //columnList = columnList + ",stupen_ver";
//            gridKolonky
//                .addTextColumn({
//                    name: "poznamka",
//                    width: 60,
//                    caption: "jres:31901102", //RC 31901102 : Poznámka
//                    description: "jres:31901102", //RC 31901102 : Poznámka
//                    cellTemplate: "{poznamka}"
//                });
//            columnList = columnList + ",poznamka";
//            if (content.GEsuParamsDto.gin_esuuzsl_en && content.GEsuParamsDto.gin_esuuzsl_en !== "") {
//                gridKolonky.addTextColumn({
//                    name: "uziv_sl_e",
//                    caption: content.GEsuParamsDto.gin_esuuzsl_en, 
//                    description: content.GEsuParamsDto.gin_esuuzsl_en, 
//                });
//                columnList = columnList + ",uziv_sl_e";
//            }
//            return columnList;
//        },

//        condFormatsForKartotekaGridGetApplyColumns: function (columnList) {
//            var columnsForApply = columnList
//                .replace("cnt_zo", "")
//                .replace(",bu_exist", "")
//                .replace(",ico_ds", "")
//                .replace(",icoAdresy", "")
//                .replace(",iszr", "")
//                .replace(",IszrIkonka", "")
//                ;
//            return columnsForApply;
//        },

//        condFormatsForKartotekaGrid: function (columnsForApply) {
//            const CondFormatBg = Gordic.Components.Grid.CondFormats.CondFormatBg;
//            //var ruianFormat: Gordic.Components.Grid.CondFormats.CondFormat = { description: "Indikace Ruian", formula: 'NOT(ISBLANK(@stupen_ver)) and (@stupen_ver == 35 or @stupen_ver == 30 )', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.gray, applyTo: "nazev,stupen_ver_txt" };
//            var ruianFormat = { description: "Indikace Ruian", formula: 'NOT(ISBLANK(@stupen_ver)) and (@stupen_ver == 35 or @stupen_ver == 30 )', bg: CondFormatBg.gray, applyTo: "nazev,stupen_ver_txt" };
//            var overenoSpravcemFormat = { description: "Indikace ověřeno správcem", formula: 'NOT(ISBLANK(@stupen_ver)) and @stupen_ver == 20', bg: CondFormatBg.darkgray, applyTo: "nazev,stupen_ver_txt" };
//            var insolvenceFormat = { description: "Indikace insolvence", formula: 'NOT(ISBLANK(@druh_stav_r_txt))', bg: CondFormatBg.lightred, applyTo: "nazev,stupen_ver_txt" };
//            var robFormat = { description: "Indikace SZR Rob", formula: 'NOT(ISBLANK(@stupen_ver)) and @stupen_ver == 55', bg: CondFormatBg.lightorange, applyTo: "nazev,stupen_ver_txt" };
//            var rosFormat = { description: "Indikace SZR Ros", formula: 'NOT(ISBLANK(@stupen_ver)) and @stupen_ver == 65', bg: CondFormatBg.lightyellow, applyTo: "nazev,stupen_ver_txt" };
//            var nevalidniRobFormat = { description: "Nevalidní Rob Pro", formula: 'NOT(ISBLANK(@stupen_ver)) and (@stupen_ver == 40 or @stupen_ver == 60 )', bg: CondFormatBg.orange, applyTo: "nazev,stupen_ver_txt" };
//            var robNeboPRO = { description: "Indikace Rob nebo PRO", formula: 'NOT(ISBLANK(@stupen_ver)) and (@stupen_ver == 50 or @stupen_ver == 70 )', bg: CondFormatBg.darkorange, applyTo: "nazev,stupen_ver_txt" };

//            // barva textu
//            var CondFormatText = Gordic.Components.Grid.CondFormats.CondFormatText;
//            var pobocka = { description: "Indikace pobočky", formula: 'NOT(ISBLANK(@ixs_esu)) and NOT(ISBLANK(@ixs_nad)) and NOT(EQUALS(@ixs_esu,@ixs_nad))', text: CondFormatText.blue, applyTo:columnsForApply };
//            var typAdresyDorucovaci = { description: "Typ adresy doručovací", formula: 'NOT(ISBLANK(@typ_adr)) and (@typ_adr == 10)', text: CondFormatText.blue, applyTo: columnsForApply };
//            var typAdresyKontaktní = { description: "Typ adresy kontaktní", formula: 'NOT(ISBLANK(@typ_adr)) and (@typ_adr == 30)', text: CondFormatText.blue, applyTo: columnsForApply };

//            var condFormats = [
//                overenoSpravcemFormat,
//                ruianFormat,
//                insolvenceFormat,
//                robFormat,
//                rosFormat,
//                nevalidniRobFormat,
//                robNeboPRO,


//                // barvy textu
//                pobocka,
//                typAdresyDorucovaci,
//                typAdresyKontaktní
//            ];

//            return condFormats;

//        },

//        jmennyRejstrikGridFormat: function (gridKolonky, content, zastupneOsobyAkceniTlacitko) {
//            //gin_odes_esj_po
//            //gin_esu_dnzobr

//            gridKolonky
//                .addHtmlColumn({
//                    name: "cnt_zo",
//                    caption: "jres:26265207", //RC 26265207 : Zástupné osoby
//                    customClass: "center",
//                    width: 40,
//                    cellTemplate: Gordic.Esu.Function.cellTemplateZastupneOsoby(content, zastupneOsobyAkceniTlacitko) // internal call nactiZastupneOsoby(data.ixs_esu);

//                });
//            if (content.GEsuParamsDto.gin_ssl_datschr || (content.gin_odes_esj_po === 1)) {
//                gridKolonky.addIconColumn(Gordic.Esu.Function.ColumnDatovaSchrankaZIco_ds());

//            }

//            gridKolonky
//                .addIconColumn(Gordic.Esu.Function.ColumnTypAdresy());

//            if ((content.GEsuParamsDto.gin_iszr_povole || content.GEsuParamsDto.gin_iszr_povopr) && content.GEsuParamsDto.gin_iszr_rozin) {
//                gridKolonky
//                    .addIconColumn(Gordic.Esu.Function.DatumOvereniVSZRColumn());


//                gridKolonky
//                    .addIconColumn(Gordic.Esu.Function.ColumnIszrIkonka(content.GEsuParamsDto.gin_esu_inzobr, content.GEsuParamsDto.gin_iszr_zostv));
//            }

//            gridKolonky
//                .addTextColumn({
//                    name: "typ_adr_txt",
//                    caption: "jres:31900868", //RC 31900868 : Typ adresy
//                    description: "jres:31900868", //RC 31900868 : Typ adresy
//                    cellTemplate: "{typ_adr_txt}"
//                })
//                .addHtmlColumn({ //addTextColumn
//                    name: "nazev",
//                    caption: "jres:26265146", //RC 26265146 : Název
//                    width: 200,
//                    description: "jres:26265146", //RC 26265146 : Název
//                    cellTemplate: "{nazev}"
//                })
//                .addTextColumn({
//                    name: "ob_jmeno",
//                    caption: "jres:31900869", //RC 31900869 : Obchodní jméno
//                    description: "jres:31900869", //RC 31900869 : Obchodní jméno
//                    cellTemplate: "{ob_jmeno}"
//                })
//                .addTextColumn({
//                    name: "ico",
//                    caption: "jres:26265288", //RC 26265288 : IČO
//                    description: "jres:26265288", //RC 26265288 : IČO
//                    cellTemplate: "{ico}"
//                })
//                ;
//            gridKolonky
                
//                .addTextColumn({
//                    name: "ulice",
//                    caption: "jres:26265147", //RC 26265147 : Ulice
//                    description: "jres:26265147", //RC 26265147 : Ulice
//                    cellTemplate: "{ulice}"
//                })
//                .addTextColumn({
//                    name: "cpop",
//                    caption: "jres:31900173", //RC 31900173 : Číslo popisné
//                    description: "jres:31900173", //RC 31900173 : Číslo popisné
//                    cellTemplate: "{cpop}"
//                })
//                .addTextColumn({
//                    name: "cor",
//                    caption: "jres:31900172", //RC 31900172 : Číslo orientační
//                    description: "jres:31900172", //RC 31900172 : Číslo orientační
//                    cellTemplate: "{cor}"
//                })
//                .addTextColumn({
//                    name: "obec",
//                    caption: "jres:26265149", //RC 26265149 : Obec
//                    description: "jres:26265149", //RC 26265149 : Obec
//                    cellTemplate: "{obec}"
//                })
//                .addTextColumn({
//                    name: "cast_obce",
//                    caption: "jres:26265235", //RC 26265235 : Část obce
//                    description: "jres:26265235", //RC 26265235 : Část obce
//                    cellTemplate: "{cast_obce}"
//                })
//                .addTextColumn({
//                    name: "psc",
//                    caption: "jres:26265150", //RC 26265150 : PSČ
//                    description: "jres:26265150", //RC 26265150 : PSČ
//                    cellTemplate: "{psc}"
//                })
//                .addTextColumn({
//                    name: "mail",
//                    caption: "jres:26265155", //RC 26265155 : Mail
//                    description: "jres:26265155", //RC 26265155 : Mail
//                    cellTemplate: "{mail}"
//                })
//                .addNumberColumn({
//                    name: "ur_pri",
//                    caption: "jres:31900369", //RC 31900369 : Úr. přístupu
//                    description: "jres:26265382", //RC 26265382 : Úroveň přístupu
//                    cellTemplate: "{ur_pri}"
//                });
//            if (content.GEsuParamsDto.gin_iszr_zostv) {
//                gridKolonky.addTextColumn({
//                    name: "stupen_ver_txt",
//                    caption: "jres:26265323", //RC 26265323 : Stupeň verifikace
//                    description: "jres:26265323", //RC 26265323 : Stupeň verifikace
//                    cellTemplate: "{stupen_ver_txt}"
//                });
//                gridKolonky
//                    .addNumberColumn({
//                        name: "stupen_ver",
//                        caption: "jres:31900977", //RC 31900977 : Stupeň ver.
//                        description: "jres:31900978", //RC 31900978 : Stupeň verifikace
//                        cellTemplate: "{stupen_ver}",
//                    });
//            }

//            if (content.gin_esu_dnzobr == 1) {
//                gridKolonky.addDateColumn({
//                    name: "dat_nar",
//                    caption: "jres:26265158", //RC 26265158 : Datum narození
//                    description: "jres:26265158", //RC 26265158 : Datum narození
//                    //cellTemplate: "{dat_nar}"
//                });
//            }
//            gridKolonky
//                .addTextColumn({
//                    name: "ixs_esu",
//                    caption: "jres:26265221", //RC 26265221 : ID
//                    description: "jres:26265221", //RC 26265221 : ID
//                    cellTemplate: "{ixs_esu}"
//                })
//                .addTextColumn({
//                    name: "id_ds",
//                    caption: "jres:31900366", //RC 31900366 : ID DS
//                    description: "jres:31900366", //RC 31900366 : ID DS
//                    cellTemplate: "{id_ds}"
//                })
//                .addTextColumn({
//                    name: "id_eu",
//                    caption: "jres:31900870", //RC 31900870 : ID EU (BSI)
//                    description: "jres:31900870", //RC 31900870 : ID EU (BSI)
//                    cellTemplate: "{id_eu}"
//                })

//                .addTextColumn({
//                    name: "ixs_eko",
//                    caption: "jres:31900195", //RC 31900195 : ID ekonomického subjektu
//                    description: "jres:31900195", //RC 31900195 : ID ekonomického subjektu
//                    cellTemplate: "{ixs_eko}"
//                })
//                .addTextColumn({
//                    name: "ixs_eko_nazev",
//                    caption: "jres:31900875", //RC 31900875 : ID hlavního subjektu + název
//                    description: "jres:31900875", //RC 31900875 : ID hlavního subjektu + název
//                    cellTemplate: "{ixs_eko_nazev}"
//                })
//                ;
//            if (content.GEsuParamsDto.gin_esuuzsl_en && content.GEsuParamsDto.gin_esuuzsl_en !== "") {
//                gridKolonky.addTextColumn({
//                    name: "uziv_sl_e",
//                    caption: content.GEsuParamsDto.gin_esuuzsl_en,
//                    description: content.GEsuParamsDto.gin_esuuzsl_en,
//                });
//            }

//        },

//        pridejNaDetailESUNeboDoKartotekyObsahZElPodani: function (content) {
//            var tempConent = content;
//            var nalezenyOBsah = null;
//            for (var i = 0; i < 3; i++) {
//                if (tempConent.parentContent) {
//                    tempConent = tempConent.parentContent // pokud je parent pracuju s ním
//                    if (tempConent.className == "Gordic.Pod.WebControls.GEvidenceElPodaniDlg") {
//                        if (tempConent.Obsah) {
//                            nalezenyOBsah = tempConent.Obsah;
//                        }
//                        break; // našel jsem tak končím s forem
//                    }
//                }
//            }
//            if (nalezenyOBsah) {
//                var divObsah = $("<div>").html(nalezenyOBsah);

//                content.element.gsidebar("addPanel", "right", {
//                    leaf: {
//                        caption: "jres:31900886", //RC 31900886 : Obsah el. podání
//                        //visible: true,
//                        //pinned: true,
//                    }, //RC 31900196 : Náhled
//                    right: {
//                        //pinned: true,
//                        //visible: false
//                    },
//                    //pinned: true,
//                    id: "panelObsahElPodani",
//                    customDiv: divObsah,
//                    icon: "gi-podatelna",
//                    //visible: false,
//                    open: function (ev, ctx) {
                       
//                    }
//                });
//            }

//        },

//        addFormObcanAISEO: function (Form) {
//            Form
//                .addSection("jres:31901025") //RC 31901025 : Občan v AISEO
//                .addRow("jres:26265153").addField("gstringbox", { name: "AJmeno", customClass: "js-ISZR js-hideField", model: "model.jmeno=value", disabled: true }) //RC 26265153 : Jméno
//                .addRow("jres:26265152").addField("gstringbox", { name: "APrijmeni", customClass: "js-ISZR js-hideField", model: "model.prijmeni=value", disabled: true }) //RC 26265152 : Příjmení
//                .addRow("jres:31901026").addField("gstringbox", { name: "ARC", customClass: "js-ISZR", model: "model.rc=value", disabled: true }) //RC 31901026 : Rodné číslo
//                .addRow("jres:31901027").addField("gstringbox", { name: "Pohlavi", customClass: "js-ISZR", model: "model.pohlavi=value", disabled: true }) //RC 31901027 : Pohlaví
//                .addRow("jres:31901028").addField("gstringbox", { name: "RodinyStav", customClass: "js-ISZR", model: "model.rod_stav_txt=value", disabled: true }) //RC 31901028 : Rodinný stav
//                .addRow("jres:31901019").addField("gdatebox", { name: "ADatNar", customClass: "js-ISZR", model: "model.datum_narozeni=value", valueType: "date", disabled: true })  //RC 31901019 : Datum narození
//                .addRow("jres:31901029").addField("gdatebox", { name: "ADatUmrti", customClass: "js-ISZR", model: "model.datum_umrti=value", valueType: "date", disabled: true })  //RC 31901029 : Datum úmrtí
//                .addRow("jres:31901030").addField("gstringbox", { name: "TypPobytu", customClass: "js-ISZR", model: "model.typ_pobyt_txt=value", disabled: true }) //RC 31901030 : Typ pobytu
//                .addRow("jres:31901031").addField("gstringbox", { name: "StatPrisl", customClass: "js-ISZR", model: "model.st_obcan_txt=value", disabled: true }) //RC 31901031 : Státní příslušnost

//                .addRow("jres:31901032").addField("gdatebox", { name: "PosledniAktualizace", customClass: "js-ISZR", model: "model.cas_odpovedi=value", disabled: true })  //RC 31901032 : Poslední aktualizace
//                ;
//        },

//        getFormDalsiInformaceZAISEO: function () {
//            var Formik = new Gordic.Forms
//                .Form({ name: "DalsiInformaceZAISEO", layoutDescriptor: "L1M1S1, L-3-9-0, M-12-12-0, S-12-12-0" })
//                .addSection() //RC 31901018 : Hledaný občan
//                .addRow("jres:31901036").addField("gstringbox", { name: "RodnePrijmeni", model: "model.rodne_prijm=value", disabled: true }) //RC 31901036 : Rodné příjmení
//                .addRow("jres:31901037").addField("gstringbox", { name: "PravZP", model: "model.os_zpus_txt=value", disabled: true }) //RC 31901037 : Způsobilost
//                ;
//            return Formik;
//        },

//        getColumnsDotceneOsobyZAISEO: function () {
//            var gridFormat  = new Gordic.Data.GridFormat()
//                //gridformat
//                .addTextColumn({
//                    name: "typ_vaifo_txt",  //gridformat1
//                    caption: "jres:31901038", //RC 31901038 : Typ osoby
//                })
//                .addTextColumn({
//                    name: "prijmeni",  //gridformat1
//                    caption: "jres:31901039", //RC 31901039 : Příjmení
//                })
//                .addTextColumn({
//                    name: "jmeno",  //gridformat1
//                    caption: "jres:31901040", //RC 31901040 : Jméno
//                })
//                .addDateColumn({
//                    name: "datum_narozeni",
//                    caption: "jres:31901041", //RC 31901041 : Datum narození
//                })
//                ;
//            return gridFormat;
//        },

//        getColumnsAdresyZAISEO: function () {
//            var gridFormat = new Gordic.Data.GridFormat()
//                //gridformat
//                .addTextColumn({
//                    name: "typ_ade_txt",
//                    caption: "jres:31901042", //RC 31901042 : Typ adresy
//                })
//                .addTextColumn({
//                    name: "stat_txt",
//                    caption: "jres:31901043", //RC 31901043 : Stát
//                })
//                .addTextColumn({
//                    name: "okres_txt",
//                    caption: "jres:31901044",  //RC 31901044 : Okres
//                })
//                .addTextColumn({
//                    name: "obec_txt",
//                    caption: "jres:31901045",  //RC 31901045 : Obec
//                })
//                .addTextColumn({
//                    name: "c_obec_txt",
//                    caption: "jres:31901046",  //RC 31901046 : Část obce
//                })
//                .addTextColumn({
//                    name: "mc_obec_txt",
//                    caption: "jres:31901047",  //RC 31901047 : Městská část
//                })
//                .addTextColumn({
//                    name: "ulice_txt",
//                    caption: "jres:31901048",  //RC 31901048 : Ulice
//                })
//                .addTextColumn({
//                    name: "cislo_o",
//                    caption: "jres:31901049",  //RC 31901049 : Číslo orientační
//                })
//                .addTextColumn({
//                    name: "psc",
//                    caption: "jres:31901050",  //RC 31901050 : Psc
//                })
//                .addTextColumn({
//                    name: "cislo_domu",
//                    caption: "jres:31901051",  //RC 31901051 : Číslo domovní
//                })
//                .addTextColumn({
//                    name: "typ_pobytu_od",
//                    caption: "jres:31901052",  //RC 31901052 : Datum adresy od
//                })
//                ;
//            return gridFormat;
//        }



//        //#endregion

//    }, { pure: true });
//})(jQuery);