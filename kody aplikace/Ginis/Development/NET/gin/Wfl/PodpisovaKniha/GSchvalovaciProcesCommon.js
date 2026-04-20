
var m_sZrusitUkonRequestText = 'jres:Gordic.Wfl.WebClient:26226522'; //RC 26226522 : Opravdu chcete odstranit schvalovací úkon?

var m_bChangeCheckedEnabled = true; // semafor pro rizeni zaskrtnuti checkboxu

function VratPredpisSelected() {
    var IdEsu = "";
    var PoleVyberEsu = document.getElementsByName("PredpisCheckbox");

    if(PoleVyberEsu.length == 0) {
        //return IdEsu;
    } else {
        var i;
        for (i = 0; i < PoleVyberEsu.length; i++) {
            if (PoleVyberEsu[i].checked) {
                IdEsu = PoleVyberEsu[i].value;
            }
        }
    }

    if(IdEsu == "") {
        alert("Není vybrán řádek.");
    }

    return IdEsu;
}

function OznacPouzeJedenRadek(aCheckbox) {
    var VybraneRadky = document.getElementsByName("PredpisCheckbox");
    if (VybraneRadky != null) {
        for (var i = 0; i < VybraneRadky.length; i++) {
            if (VybraneRadky[i].value != aCheckbox.value) {
                VybraneRadky[i].checked = false;
            }
        }
    }

    m_bChangeCheckedEnabled = false;
}

function OznacRow(RowNum) {
    var VyberRadkuList = document.getElementsByName("PredpisCheckbox");

    if(VyberRadkuList != null) {
        if(m_bChangeCheckedEnabled) {
            var l_bChecked = VyberRadkuList[RowNum].checked;

            for(i = 0; i < VyberRadkuList.length; i++) {
                VyberRadkuList[i].checked = false;
            }

            VyberRadkuList[RowNum].checked = !l_bChecked;
        }
    }

    m_bChangeCheckedEnabled = true;

    EnableButtonsForSelectedRow();
}

function NovyUkonClick(IxsSpd) {
    var retVal = Wfl_OtevriDetailUkonuSchvalovacihoProcesu(m_sIxp, "", IxsSpd);

    if(retVal != null) {
        $get(m_oReloadButtonCID).click();
    }
}

function DetailUkonuClick() {
    var l_sSelectedRow = VratPredpisSelected();
    var l_sSerCislo = l_sSelectedRow;

    ShowDetailUkonu(m_sIxp, l_sSerCislo);
}

function ShowDetailUkonu(Ixp, SerCisloUkonu) {
    var retVal = Wfl_OtevriDetailUkonuSchvalovacihoProcesu(Ixp, SerCisloUkonu);

    if(retVal != null) {
        $get(m_oReloadButtonCID).click();
    }
}

function ZrusitUkonClick() {
    var l_sSelectedRow = VratPredpisSelected();
    var l_sSerCislo = l_sSelectedRow;

    if(l_sSerCislo != "") {
        if(confirm(m_sZrusitUkonRequestText)) {
            $get(m_oSerCisloHiddenCID).value = l_sSerCislo;
            return true;
        }
    }

    return false;
}