//<FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//<Name>        Gordic.Ssl.WebClient.Ssl.js                    </Name>
//<Description> JS s oteviranim oken SSL                       </Description>
//<Author>      Radek Tomes                                    </Author>
//<Copyright>   Copyright GORDIC spol. s r. o. 1993-2007       </Copyright>
//<Created>     2008-03-31                                     </Created>
//</FileHeader>	

//---------------------------------------------------------------------

// Zobrazi okno detailu dokumentu/spisu
// Parametry:
// ixp - identifikator dokumentu/spisu
// refreshRowAfterClose - nepovinny priznak obcerstveni radku v seznamu po zavreni detailu
// tato funkce nic nevraci
function Ssl_OtevriDetail(ixp, refreshRowAfterClose) {
    var l_sValue = ixp;

    if (refreshRowAfterClose != null) {
        if(refreshRowAfterClose == true) {
            l_sValue += "|1";
        }
    }

    GetGlobalManager().SendClassMessage(this, 'Default', 'OpenDetail', l_sValue);	
}

// Zobrazi okno pro zadani ID noveho dokumentu.
// Parametry:
// FlagVlastni - udava se, zda se jedna o vlastni (1) nebo cizi (0) dokument.
// FlagNevalidovatPid - udava se, zda se ma kotrolovat, zda je jiz PID v db (0) nebo nekontrolovat (1) - default (0).
// Vraci:
// String se zadanym 12ti mistnym identifikatorem. Pokud jiz identifikator v db existuje, pak se vrati string "IxpExist"
function Ssl_OtevriZadaniIdNovehoDokumentu(FlagVlastni, FlagNevalidovatPid) {
    var urlParams = "";

    if(FlagVlastni == 1) {
        urlParams = "?vlastni=" + FlagVlastni;
    }
    if(FlagNevalidovatPid == 1) {
        urlParams = "?ValidatePid=false";
    }
    SetStatusLoading();
    var url = encodeURI("~/Gin/Ssl/Detail/NovyDokument/NovyDokument.aspx" + urlParams);
	return ShowModalWindowEx(url, "", 360, 150, false, true, true);
}

// Zobrazi okno pro zadani ID noveho dokumentu.
// Parametry:
// FlagVlastni - udava se, zda se jedna o vlastni (1) nebo cizi (0) dokument.
// FlagNevalidovatPid - udava se, zda se ma kotrolovat, zda je jiz PID v db (0) nebo nekontrolovat (1) - default (0).
// Vraci:
// String se zadanym 12ti mistnym identifikatorem. Pokud jiz identifikator v db existuje, pak se vrati string "IxpExist"
function Ssl_OtevriZadaniIdNovehoDokumentuNG(FlagVlastni, FlagNevalidovatPid) {

    if(window.ginisResponsiveWindows) {
        var l_oTypDok = Gordic.Wfl.Globals.Enums.TypDok.Cizi;

        if(FlagVlastni == 1) {
            l_oTypDok = Gordic.Wfl.Globals.Enums.TypDok.Vlastni;
        }
        var options = {
            TypDok: l_oTypDok,
            TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
        };
        return Gordic.Wfl.Dialogs.GenerovaniIxpDlg(null,options);
    } else {
        var l_oParamsJSON = {};

        if (FlagVlastni == 1) {
            l_oParamsJSON.Vlastni = true;
        }
        if (FlagNevalidovatPid == 1) {
            l_oParamsJSON.ValidatePid = "false";
        } else {
            l_oParamsJSON.ValidatePid = "true";
        }

        return GDlg.showWindow("Gordic.Ssl.WebClient.GenerovaniIxpPage", l_oParamsJSON, { title: "", width: 330, height: 200, maxWidth: 330, maxHeight: 200 });
    }
}

// Zobrazi okno pro vyber deniku
// Vraci:
// Pole s jednim zaznamem: denik|rok|por. cislo - oddelene znakem "|"
function Ssl_OtevriVyberDeniku() {
	SetStatusLoading();
	var url = encodeURI("~/Gin/Ssl/Detail/NovyDokument/VyberDeniku.aspx");
    return ShowModalWindowEx(url, "", 490, 170, false, true, true);
}
// Zobrazi okno pro vyber deniku
function Ssl_OtevriVyberDeniku2() {
    if(window.ginisResponsiveWindows) {
        return Gordic.Ssl.Dialogs.VyberDenikuDlg(null, {});
    } else if(true) {

        var l_sTitle = "jres:Gordic.Ssl.WebClient:26255131"; //RC 26255131 : Vytvoøení/zmìna ÈJ

        var l_oParamsJSON = {};
        var $div = GDlg.showWindow("Gordic.Ssl.WebClient.VyberDenikuPage", l_oParamsJSON, { title: l_sTitle, width: 400, height: 220, minWidth: 400, minHeight: 220 });

        return $div;
    } else {
        SetStatusLoading();
        var url = encodeURI("~/Gin/Ssl/Detail/NovyDokument/VyberDeniku.aspx");
        return ShowModalWindowEx(url, "", 490, 170, false, true, true);
    }
}
// Zobrazi okno pro vyber deniku
function Ssl_OtevriTvorbuSpisuBezInicDok(ParamsJSON) {

    var l_sTitle = "jres:Gordic.Ssl.WebClient:26255197"; //RC 26255197 : Vytvoøení spisu

    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.VytvSpisBezInicPisPage", ParamsJSON, { title: l_sTitle, width: 400, height: 250, minHeight: 400, minHeight: 250 });

    return $div;
}
// Zobrazi okno odeslani.
// Parametry:
// Ixp - identifikator dokumentu/spisu
// Vraci:
// dialog
function Ssl_OtevriOdeslani(Ixp) {
    var l_oParamsJSON = { Ixp: Ixp };

    SetStatusLoading();

    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.OdeslaniPage", l_oParamsJSON, { title: "", width: 910, height: 550, minHeight: 550 });

    return $div;
}
// Zobrazi okno hromadneho odeslani.
// Parametry:
// OdeslatPosledneVlozene - ridi specialni funkcionalitu v poznamkovem bloku (1), default hodnota je 0
// Sxs - identifikator odesilane zasilky. Default hodnota je ""
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriHromadneOdeslani(OdeslatPosledneVlozene, Sxs)	{
    var urlParams = "";
    var l_oParamsJSON = null;
    
    if(OdeslatPosledneVlozene == 1) {
        urlParams = "?PoslVlozeneOdes=" + OdeslatPosledneVlozene;
        l_oParamsJSON = { PoslVlozeneOdes: true };
    }
    if(Sxs != "") {
        urlParams = "?sxs=" + Sxs;
        l_oParamsJSON = { Sxs: Sxs };
    }
    
    SetStatusLoading();

    if(true) {
        var $div = GDlg.showWindow("Gordic.Ssl.WebClient.HromadneOdeslaniPage", l_oParamsJSON, { title: "", width: 840, height: 450, maxHeight: 450 });

        return $div;
    } else {
	    var url = encodeURI("~/Gin/Ssl/Detail/Odeslani/HromadneOdeslani.aspx" + urlParams);
	    return ShowModalWindowEx(url, "", 910, 580, false, true, true);
    }
}
// Zobrazi okno odeslani emailu, ci DZ. 
// Parametry:
// ParamsJSON - parametry stranky
// Vraci:
// dialog s retVal - Pri jednoduchem odeslani nic nevraci (Ixp), jinak vraci pole s poctem nasledujicich radku k odeslani
function Ssl_OtevriOdeslaniEmailDZ(ParamsJSON) {
    SetStatusLoading();

  //  ParamsJSON = { Sxs: "DEMOX000Y9JODEMO33620" };// Email
  //  ParamsJSON = { Sxs: "DEMOX000Y9JODEMO33622" };// DZ
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.OdeslaniEmailDZPage", ParamsJSON, { title: "", width: 620, height: 790, minWidth: 620, minHeight: 790 });

    return $div;
}
// Zobrazi okno tisku obalek. 
// Parametry:
// QueryString - kompletni QueryString stranky. Muze a nemusi zacinat ?
// Vraci:
// Pri jednoduchem odeslani nic nevraci (ixp), jinak vraci pole s poctem nasledujicich radku k odeslani
function Ssl_OtevriOdeslaniElPostou(QueryString) {	
    var urlParams = "";
    
    if(QueryString != null) {
        if(QueryString != "") {
            if(QueryString.substring(0,1) != "?") {
                urlParams = "?";
            }
            urlParams += QueryString;
        }
    }
    
	SetStatusLoading();
    var url = encodeURI("~/Gin/Ssl/Detail/Odeslani/OdeslaniElPostou.aspx" + urlParams);
    return ShowModalWindowEx(url, "", 720, 660, false, true, true);
}
// Zobrazi okno tisku obalek.
// Parametry:
// Ixp - identifikator dokumentu/spisu
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriTiskObalek(ixp) {
    var urlParams = "";
    var l_oParamsJSON = null;
    
    if(ixp != "") {
        urlParams = "?IXP=" + ixp;
        l_oParamsJSON = { Ixp: ixp };
    }
    
    SetStatusLoading();

    if(!window.ginisLegacyModalWindows) {
        var $div = GDlg.showWindow("Gordic.Ssl.WebClient.OdeslaniTiskObalekPage", l_oParamsJSON, { title: "", width: 500, height: 450, maxHeight: 450 });

        return $div;
    } else {
	    url = encodeURI("~/Gin/Ssl/Detail/Odeslani/OdeslaniTiskObalek.aspx" + urlParams);
	    return ShowModalWindowEx(url, "", 555, 400, false, true, true);
    }
}
// Zobrazi okno ZA
function Ssl_OtevriZasilkovouAdresu(Radek) {
    if(true) {
        var l_sTitle = "jres:Gordic.Ssl.WebClient:26255134"; //RC 26255134 : Definice adresy zásilky

        var l_oParamsJSON = { Radek: Radek };
        return GDlg.showWindow("Gordic.Ssl.WebClient.OdeslaniZasilkovaAdresaPage", l_oParamsJSON, { title: l_sTitle, width: 650, height: 350, minWidth: 650, minHeight: 350 });
    } else {
        var urlParams = "?Ixp=" + Ixp;

        if (FlagPredani == 1) {
            urlParams += "&Predani=1";
        }

        SetStatusLoading();
        var url = encodeURI("~/Gin/Ssl/Detail/Trasy/TrasyDokumentu.aspx" + urlParams);
        return ShowModalWindowEx(url, "", 720, 400, false, true, true);
    }
}
// Zobrazi okno Trasy.
// Parametry:
// ixp - identifikator dokumentu/spisu
// FlagPredani - priznak, zda se okno vola z okna predani (0) ne, (1) ano
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriTrasyDokumentu(Ixp, FlagPredani) {
    if(window.ginisResponsiveWindows) {
        var l_bSelectRowEnabled = FlagPredani == 1 ? true : false;
        var options = {
            Ixp: Ixp,
            SelectRowEnabled: l_bSelectRowEnabled
        };
        return Gordic.Ssl.Dialogs.TrasyDokumentuDlg(null, options);
    } else if(true) {
        var l_sTitle = "jres:Gordic.Ssl.WebClient:26255201" + " " + Ixp; //RC 26255201 : Trasy
        var l_bFlagPredani = FlagPredani == 1 ? true : false;
        var l_oParamsJSON = { Ixp: Ixp, FlagPredani: l_bFlagPredani };
        return GDlg.showWindow("Gordic.Ssl.WebClient.TrasyDokumentuPage", l_oParamsJSON, { title: l_sTitle, width: 720, height: 450, minWidth: 720, minHeight: 450 });
    } else {
        var urlParams = "?Ixp=" + Ixp;

        if(FlagPredani == 1) {
            urlParams += "&Predani=1";
        }

        SetStatusLoading();
        var url = encodeURI("~/Gin/Ssl/Detail/Trasy/TrasyDokumentu.aspx" + urlParams);
        return ShowModalWindowEx(url, "", 720, 400, false, true, true);
    }
}
// Zobrazi okno zmeny terminu (lhuty) spisu.
// Parametry:
// Ixp - identifikator dokumentu/spisu
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriZmenuTerminu(ixp) {
    var urlParams = "";
    
    if(ixp != "") {
        urlParams += "?Ixp=" + ixp;
    }
    
    if(true) {
        var l_oParamsJSON = { Ixp: ixp };
        var $div = GDlg.showWindow("Gordic.Ssl.WebClient.ZmenaTerminuPage", l_oParamsJSON, { title: "", width: 450, height: 230, minWidth: 450, minHeight: 230 });

        return $div;
    } else {
        SetStatusLoading();
	    url = encodeURI("~/Gin/Ssl/Detail/ZmenaTerminu.aspx" + urlParams);
        return ShowModalWindowEx(url, "", 530, 180, false, true, true);       
    }                 
}
// Zobrazi okno schvaleni dokumentu.
// Parametry:
// Ixp - identifikator dokumentu/spisu
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriOknoSchvaleni(ixp) {
    var urlParams = "";
    
    if(ixp != "") {
        urlParams += "?Ixp=" + ixp;
    }
    
    SetStatusLoading();
	url = encodeURI("~/Gin/Ssl/Lists/Cinnosti/Schvaleni.aspx" + urlParams);
    return ShowModalWindowEx(url, "", 600, 180, false, true, true);
}
// Zobrazi okno schvaleni dokumentu.
function Ssl_OtevriOknoSchvaleniNG(ixp) {

    if (window.ginisResponsiveWindows) {
        var options = {
            Ixp: ixp,
        };
        return Gordic.Ssl.Dialogs.SchvaleniDlg(null, ixp);
    } else {
        var l_oParamsJSON = { Ixp: ixp };
        var $div = GDlg.showWindow("Gordic.Ssl.WebClient.SchvaleniPage", l_oParamsJSON, { title: "", width: 540, height: 230, minWidth: 540, minHeight: 230 });

        return $div;
    }
}
// Zobrazi okno moznosti aplikace.
// Parametry:
// SelTab - nastaveni aktivni zalozky. Moznosti - "detail","vyrizeni","typydok","zasilky",""
// Vraci:
// tato funkce nic nevraci
function Ssl_MoznostiAplikace(SelTab) {

    if(typeof(SelTab) == 'undefined') {
        SelTab = "";
    }

    var l_oParamsJSON = { SelTab: SelTab };
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.SslAppSettingsPage", l_oParamsJSON, { title: "jres:Gordic.Ssl.WebClient:26256091", width: 740, height: 800, minWidth: 720, minHeight: 580 }); //RC 26256091 : Možnosti aplikace

    return $div;
}
// Zobrazi okno moznosti aplikace.
// Parametry:
// SelTab - nastaveni aktivni zalozky. Moznosti - "detail","vyrizeni","typydok","zasilky",""
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriMoznostiAplikace(SelTab) {
    var l_sQueryString = "";
    
    if(SelTab != "") {
        l_sQueryString = "?SelTab=" + SelTab;
    }

    SetStatusLoading();
	var url = encodeURI("~/Gin/Ssl/Others/MoznostiAplikace.aspx" + l_sQueryString);	
	ShowModalWindowEx(url, "", 800, 530, false, true, true);
}
// Zobrazi okno historie navstivenych dokumentu/spisu.
// Vraci:
// String - ixp
function Ssl_OtevriHistoriiIxp() {	
    SetStatusLoading();		
	var url = encodeURI("~/Gin/Ssl/Others/HistorieNavstivenychDokumentu.aspx");	
	return ShowModalWindowEx(url, "", 500, 245, false, true, true);		
}
// Zobrazi okno kopii dokumentu. Oba vstupni parametry jsou povinne
// Parametry:
// Ixp - identifikator dokumentu
// IxpMaterskehoDok - identifikator materskeho dokumentu
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriKopieDokumentu(Ixp, IxpMaterskehoDok) {
    if(true) {
        var l_sTitle = "jres:Gordic.Ssl.WebClient:26255193"; //RC 26255193 : Kopie dokumentu

        var l_oParamsJSON = { Ixp: Ixp, IxpMother: IxpMaterskehoDok };
        var $div = GDlg.showWindow("Gordic.Ssl.WebClient.KopiePisemnostiPage", l_oParamsJSON, { title: l_sTitle, width: 700, height: 410, minWidth: 700, minHeight: 410 });
        return $div;
    } else {
        SetStatusLoading();
        var url = encodeURI("~/Gin/Ssl/Detail/KopiePisemnosti/KopiePisemnostiList.aspx?ixp=" + Ixp + "&ixpMother=" + IxpMaterskehoDok);
        return ShowModalWindowEx(url, "", 770, 390, false, true, true);
    }
}
// Zobrazi okno kopii dokumentu. Oba vstupni parametry jsou povinne
// Parametry:
// Ixp - identifikator dokumentu
// IxpMaterskehoDok - identifikator materskeho dokumentu
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriHromadneKopie(Ixp, GenerovatIxp) {

    var l_sTitle = "jres:Gordic.Ssl.WebClient:26255530"; //RC 26255530 : Vytvoøení kopií dokumentù s pøedáním/pøidìlením

    var l_oParamsJSON = { Ixp: Ixp, GenerovatIxp: GenerovatIxp };
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.HromadneKopiePage", l_oParamsJSON, { title: l_sTitle, width: 520, height: 390, minWidth: 520, minHeight: 390 });
    return $div;

}
// Zobrazi okno s dotaznikem, co vse se ma kopirovat na novou kopii dokumentu.
// Parametry:
// Ixp - identifikator dokumentu
// functionOnUpresneni - funkce pro zpracovani vysledku
// Vraci:
// serializovane uzivatelske volby
function Ssl_OtevriNovaKopieRequester(IxpMaterske, IxpNove) {
    var l_sTitle = "jres:Gordic.Ssl.WebClient:26256487" + " " + IxpMaterske; //RC 26256487 : Upøesnìní vytvoøení kopie z dokumentu

    var l_oParamsJSON = { IxpMaterske: IxpMaterske, IxpNove: IxpNove };
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.NovaKopieRequesterPage", l_oParamsJSON, { title: l_sTitle, width: 480, height: 350, minWidth: 480, minHeight: 350 });
    return $div;
}	

// Zobrazi okno s dotaznikem, co vse se ma kopirovat na novou kopii dokumentu.
// Parametry:
// Ixp - identifikator dokumentu
// Vraci:
// serializovane uzivatelske volby
function Ssl_OtevriKopieRequester(Ixp) {
    SetStatusLoading();
    var url = encodeURI("~/Gin/Ssl/Detail/KopiePisemnosti/NovaKopieRequester.aspx?ixp=" + Ixp);
    return ShowModalWindowEx(url, "", 580, 250, false, true, true);
}

var APOB_PagePars = null; // po prepisu dialogu na content, odstranit
// Zobrazi okno vyberu poznamkovych bloku.
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriVyberPoznamkovehoBlokuNG() {
    var l_sTitle = "jres:Gordic.Ssl.WebClient:26255553"; //RC 26255553 : Poznámkové bloky
    var l_oParamsJSON = {};
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.AddPoznBlokPage", l_oParamsJSON, { title: l_sTitle, width: 450, height: 450, minWidth:450, minHeight: 450 });

    return $div;
}

// Zobrazi okno vyberu poznamkovych bloku.
// Vraci:
// tato funkce nic nevraci
function Ssl_OtevriVyberPoznamkovehoBloku() {
    SetStatusLoading();
    var url = encodeURI("~/Gin/Ssl/Detail/Cinnosti/AddPoznBlok.aspx");	
	return ShowModalWindowEx(url, "", 450, 390, false, true, true);
}

function Ssl_NastavPristupDleTypuDokumentu(TypDokCID, PristupDropDownListCID) { // obsolete, volana na starych dialozich
    try {
        Ssl_NastavPristupDleTypuDokumentu2($get(TypDokCID), $get(PristupDropDownListCID));
    } catch (exc) {

    }
}

function Ssl_NastavPristupDleTypuDokumentu2(TypDokDBBox, PristupDropDownList) {
    try {
        var IxsTyp = TypDokDBBox.IxsTyp;
        var aPristup = TypDokDBBox.StUtajId;

        if(aPristup.length != 0) {

            for(i = 0; i < PristupDropDownList.options.length; i++) {
                if(PristupDropDownList.options[i].value == aPristup) {
                    PristupDropDownList.options[i].selected = true;
                }
            }
        }
    } catch (exc) {

    }
}

// obsolete
function Ssl_DotazIRPNaVlozeniDokumentuDoSpisu(IxpSpis, IxpDok, Ces) {
    Gordic.Ssl.WebClient.WSOperationSSL.ZobrazitDotazIRPPriVkladaniDokumentuDoSpisu(IxpSpis, IxpDok, Ssl_DotazIRPNaVlozeniDokumentuDoSpisuOnSucceeded, Ssl_DotazIRPNaVlozeniDokumentuDoSpisuOnFailed, Ces);
}
function Ssl_DotazIRPNaVlozeniDokumentuDoSpisuOnSucceeded(result, userContext, methodName) {
    var l_nSetRP = "0";

    if(result == "1") {
        if(confirm("jres:Gordic.Ssl.WebClient:26256444")) { //RC 26256444 : Spis má nastaven øízený pøístup. Požadujete nastavit øízený pøístup i u vkládaného dokumentu?
            l_nSetRP = "1";
        }
    }

    var l_sCes = userContext;
    l_sCes = l_sCes.replace("{0}", l_nSetRP);
    eval(l_sCes);
}
function Ssl_DotazIRPNaVlozeniDokumentuDoSpisuOnFailed() {

}

function Ssl_DotazIRPNaVlozeniDoSpisu(IxpSpis, IxpDok, context) {
    var l_oJSONPars = { "IxpSpis": IxpSpis, "IxpDok": IxpDok };
    callAsync("~/Gin/Ssl/WS/WSOperationSSL.asmx/ZobrazitDotazIRPPriVkladaniDokumentuDoSpisu", l_oJSONPars, Ssl_DotazIRPNaVlozeniDoSpisuOnSucceeded, null, context);
}
function Ssl_DotazIRPNaVlozeniDoSpisuOnSucceeded(result, userContext, methodName) {
    var l_nSetRP = "0";

    if (result == "1") {
        if (confirm("jres:Gordic.Ssl.WebClient:26256444")) { //RC 26256444 : Spis má nastaven øízený pøístup. Požadujete nastavit øízený pøístup i u vkládaného dokumentu?
            l_nSetRP = "1";
        }
    }

    var _this = userContext;
    _this.onDoneFunction(l_nSetRP);
}

// Zobrazi okno pro export spis. planu
// Vraci:
// 
function Ssl_OtevriExportSpisPlanu(pSrvExp) {
    SetStatusLoading();

    if(true) {
        var l_bSrvExp = pSrvExp == 1;

        var l_oParamsJSON = { SrvExp: l_bSrvExp };
        var $div = GDlg.showWindow("Gordic.Ssl.WebClient.GExportSpisPlanuPage", l_oParamsJSON, { title: "jres:Gordic.Ssl.WebClient:26256658", width: 380, height: 350, minWidth: 380, minHeight: 350 }); //RC 26256658 : Export spisového plánu

        if(l_bSrvExp) {
            return $div;
        }
    } else {
        var l_sQS = "";

        if(pSrvExp == 1) {
            l_sQS = "?SrvExp=1";
        }

        var url = encodeURI("~/Gin/Ssl/Others/Nsesss/GExportSpisPlanu.aspx" + l_sQS);
        return ShowModalWindowEx(url, "", 450, 140, false, true, true);
    }
}

// Zobrazi okno pridani nove prilohy.
function Ssl_OtevriVyberEmailoveSlozky(functionOnSelectFolder) {

    var isOutlook = 0;

    try {
        var outlook = new ActiveXObject("Outlook.Application");
        isOutlook = 1;
    } catch (vyj) {
        window.alert("jres:Gordic.Ssl.WebClient:26255948");
    }

    if (isOutlook == 1) {
        var foldersString;

        // nacteni mailu
        try {
            var InboxFolder = outlook.GetNamespace("MAPI").GetDefaultFolder(6);
            var i = 0;

            // vlozim nadrazenou slozku - Dorucena posta
            foldersString = foldersString + "|*|" + "1" + "|*|" + InboxFolder.Name + "|*|" + InboxFolder.FolderPath + "|&|";

            for (i = 1; i <= InboxFolder.Folders.Count; i++) {
                foldersString = foldersString + "|*|" + "0" + "|*|" + InboxFolder.Folders(i).Name + "|*|" + InboxFolder.Folders(i).FolderPath + "|&|";
            }
        } catch (vyj) {
            window.alert("jres:Gordic.Ssl.WebClient:26255949");
        }

        var l_oParamsJSON = { MailFolderSerialized: foldersString };
        var $div = GDlg.showWindow("Gordic.Ssl.WebClient.VyberEmailoveSlozkyPage", l_oParamsJSON, { title: "", width: 420, height: 350, minWidth: 420, minHeight: 350 });

        $div.on("close", function (ev, retVal) {
            if (retVal) {
                functionOnSelectFolder(retVal);
            }
        });
    }	

}

// Zobrazi okno pridani nove prilohy.
// WinTitle - titulek okna
// DateLabel - popisek datumoveho policka
function Ssl_OtevriOknoZmenyTerminu(WinTitle, DateLabel) {

    var l_oParamsJSON = { LabelText: DateLabel };
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.HromadnaZmenaTerminuPage", l_oParamsJSON, { title: WinTitle, width: 350, height: 200, minWidth: 350, minHeight: 200 });

    return $div;
}

// Zobrazi okno pridani nove prilohy.
// WinTitle - titulek okna
// DateLabel - popisek datumoveho policka
function Ssl_OtevriOknoKrokTrasy(WinTitle, Ixp, Poradi) {

    // otevreni okna
    var l_oParamsJSON = { Ixp: Ixp };

    if(Poradi != -1) {
        l_oParamsJSON = { Ixp: Ixp, Poradi: Poradi };
    }

    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.NovyKrokPage", l_oParamsJSON, { title: WinTitle, width: 480, height: 350, minWidth: 480, minHeight: 350 });

    return $div;
}

// Zobrazi okno zadani duvodu
// WinTitle - titulek okna
function Ssl_OtevriOknoZadaniDuvodu(WinTitle) {

    var l_oParamsJSON = { };
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.AddDuvodPage", l_oParamsJSON, { title: WinTitle, width: 430, height: 180, minWidth: 430, minHeight: 180 });

    return $div;
}

// Zobrazi okno zmeny umisteni
// WinTitle - titulek okna
function Ssl_OtevriOknoZmenaUmisteni(Ixp, WinTitle) {
    if (window.ginisResponsiveWindows) {
        var options = {
            Ixp: Ixp,
            winTitle: WinTitle
        };
        return Gordic.Ssl.Dialogs.DetailUlozitSpisDlg(null, options);
    } else {
        var l_oParamsJSON = { Ixp: Ixp };
        return GDlg.showWindow("Gordic.Ssl.WebClient.DetailUlozitSpisPage", l_oParamsJSON, { title: WinTitle, width: 430, height: 180, minWidth: 430, minHeight: 180 });
    }
}

// Zobrazi okno zmeny umisteni
// WinTitle - titulek okna
function Ssl_OtevriOknoPreruseni(Ixp, Dokument, FlagHromadne, WinTitle) {
  /*  // otevreni okna
    var l_oParamsJSON = { _ixp: Ixp, _dokument: Dokument, _flagHromadne: FlagHromadne };
    // prepsat na asynchronni, nyni jen na vyzkouseni
    var pageResult = callSync(GinUrl + "Ssl/Ws/SslWinsWS.asmx/DetailPrerusitDokumentPage", l_oParamsJSON);

    window.FlagHromadne = FlagHromadne;

    $("<div class='detPrerusitDialog' />").dialog({
        modal: true,
        title: WinTitle,
        autoOpen: true,
        buttons: {
            "OK": function (event) {
                var pagePars = new Object();
                pagePars.jq = $(this);

                if(window.FlagHromadne) {
                    pagePars.functionOnSucceeded = function (jq, datum, duvod) {
                        jq.dialog("close");
                        functionOnPreruseni(datum, duvod);
                    };
                } else {
                    pagePars.functionOnSucceeded = function (jq) {
                        jq.dialog("close");
                        functionOnPreruseni();
                    };
                }

                window.DPRD_OKClick(m_oDPRDCtrlCID, pagePars);
            },
            "jres:Gordic.Ssl.WebClient:26255319": function (event) { $(this).dialog("close"); }  //RC 26255319 : Zavøít
        },
        height: 210,
        maxHeight: 210,
        width: 390,
        show: { effect: "slide", duration: 500 },
        //   hide: { effect: "fade", duration: 500 },
        //   position: [currentMousePos.x + 5, currentMousePos.y + 5]
        //   position: [50, 70]
        //   position: window.CertDialogPosition,
        draggable: true,
        resizable: false,
        open: function (event, ui) {
            gscript.require(pageResult.Scripts, function () {
                $(event.target).html(pageResult.Html);
                eval(pageResult.JsToHead);
            });
        },
        close: function () { $(this).remove(); }
    });*/

    var l_oParamsJSON = { Ixp: Ixp, Dokument: Dokument, FlagHromadne: FlagHromadne };
    return GDlg.showWindow("Gordic.Ssl.WebClient.DetailPrerusitDokumentPage", l_oParamsJSON, { title: WinTitle, width: 390, height: 210, minWidth: 390, minHeight: 210 });
}

function Ssl_OtevriVyrizeniSpisu(Ixp) {
    var l_oParamsJSON = { Ixp: Ixp, PDok: false };
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.VyrizeniPage", l_oParamsJSON, { title: "", width: 570, height: 450, maxHeight: 450 });

    return $div;
}

function Ssl_OtevriVyrizeniDokumentu(Ixp) {
    var l_oParamsJSON = { Ixp: Ixp, PDok: true };
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.VyrizeniPage", l_oParamsJSON, { title: "", width: 570, height: 450, maxHeight: 450 });

    return $div;
}

function Ssl_OtevriZadaniIdSpisuExtSystemu() {
    var l_oParamsJSON = {};
    var $div = GDlg.showWindow("Gordic.Ssl.WebClient.ZadaniIxpSpZnPage", l_oParamsJSON, { title: "jres:Gordic.Ssl.WebClient:26256660", width: 250, height: 200, minWidth: 250, minHeight: 200 }); //RC 26256660 : Zadání identifikátoru

    return $div;
}

//************ privatni funkce ************************************************************************************************

function Default_OnOpenDetail(sender, message, value) {
	DetailDokumentu(value);
}	


