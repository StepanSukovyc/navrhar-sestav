//<FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//<Name>        Gordic.Gin.WebClient.Gin.js                    </Name>
//<Description> JS s oteviranim oken GIN                       </Description>
//<Author>      Radek Tomes                                   </Author>
//<Copyright>   Copyright © GORDIC spol. s r. o. 1993-2007     </Copyright>
//<Created>     2007-06-21                                     </Created>
//</FileHeader>	

//---------------------------------------------------------------------
//Zobrazi vyber masky navazane na danne tiskove tema (seznam). Prepinacem "bezFiltru" lze zapnout ci vypnout tlacitko "Bez filtru".
// Vraci:
// Pole s jednim argumentem obsahujicim v pripade stisknuti "OK" identifikator vybrane masky, v pripade stisknuti "Bez filtru" prazny retezec
// Pole s dvema argumenty v pripade stisknuti tlacitka "detail". Na indexu 0 je id vybrane masky, na 1 je klicove slovo "detail"
// Pole s tremi prazdnymi argumenty v pripade stisknuti tlacitka "novy".
function VyberMasky(textZahlaviOkna, tema, bezFiltru){
    var l_sUrl = "~/Gin/Gin/Masky/VyberMasky.aspx?a=1&tema="+tema;    
    if(bezFiltru) {
        l_sUrl += "&bezFiltru=true";
    }
    return ShowModalWindowEx(l_sUrl,textZahlaviOkna,660,363,false,true,true);													
}

function OtevriVyberMasky(tema, bezFiltru){
    var l_sUrl = "~/Gin/Gin/Masky/VyberMasky.aspx?a=1"+
        "&tema="+tema;    
    if(bezFiltru) l_sUrl += "&bezFiltru=true";
    return ShowModalWindowEx(
        l_sUrl,
        "",
        760,420,
        false,true,true
    );
}

//Zobrazi vyber masky navazane na danne tiskove tema (seznam). Prepinacem "bezFiltru" lze zapnout ci vypnout tlacitko "Bez filtru".
// Vraci:
// Pole s jednim argumentem obsahujicim v pripade stisknuti "OK" identifikator vybrane masky, v pripade stisknuti "Bez filtru" prazny retezec
// Pole s dvema argumenty v pripade stisknuti tlacitka "detail". Na indexu 0 je id vybrane masky, na 1 je klicove slovo "detail"
// Pole s tremi prazdnymi argumenty v pripade stisknuti tlacitka "novy".
function OtevriVyberMaskyNG(textZahlaviOkna, tema, bezFiltru) {
    if(textZahlaviOkna == "") {
        textZahlaviOkna = "jres:Gordic.Gin.WebClient:26275094"; //RC 26275094 : Výbìrové filtry
    }

    var l_oParamsJSON = { Tema: tema, BezFiltru: bezFiltru };

    var $div = GDlg.showWindow("Gordic.Gin.WebClient.VyberMaskyPage", l_oParamsJSON, { title: textZahlaviOkna, width: 580, height: 415, minWidth: 580, minHeight: 415 });
    return $div;
}

// Zobrazi rozdelovnik internich subjektu. Prepinacem SelectDisabled lze ridit aktivitu tlacitka OK (lze nebo nelze provest vyber) - 1 / 0.
// Vraci:
// Pole radku vybranych ISU - "ixs","ixs_ssu","ix"
function Gin_OtevriRozdelovnikISU(SelectEnabled) {
 //   if(true) {

        var l_oParamsJSON = { SelectEnabled: SelectEnabled };
        var $div = GDlg.showWindow("Gordic.Gin.WebClient.RozdelovnikIsuPage", l_oParamsJSON, { title: "", width: 800, height: 500, maxHeight: 500 });

        return $div;
   /* } else {
        var urlParams = "";

        if (SelectDisabled == 1) {
            urlParams = "?SelectDisabled=1";
        }

        var url = encodeURI("~/Gin/Gin/InterniSubjekty/RozdelovnikIsu/RozdelovnikIsu.aspx" + urlParams);
        var retVal = ShowModalWindowEx(url, "", 850, 360, false, true, true);

        return retVal;
    }*/
}
