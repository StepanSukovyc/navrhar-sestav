var DHUP = {
    onContentReady: function () {

    },
    OKClick: function () {
        var l_sPoznamka = this.PoznamkaTextBox.value;
        var l_oTypPoznamkyRBList = this.RadioList;

        var rbInputs = l_oTypPoznamkyRBList.getElementsByTagName("input");
        var l_nTypPoznamkySelectedIndex = 0;

        for(var i = 0; i < rbInputs.length; i++) {
            if(rbInputs[i].checked) {
                l_nTypPoznamkySelectedIndex = rbInputs[i].value;
                break;
            }
        }
  
        if(l_sPoznamka != "") {
            if(this.FlagHromadne) {
                this.close({ Poznamka: l_sPoznamka, DruhPoznamky: l_nTypPoznamkySelectedIndex });
            } else {
                var l_oJSONPars = { "Ixp": this.Ixp, "PorCislo": this.PorCislo, "TypPoznamkySelectedIndex": l_nTypPoznamkySelectedIndex, "Poznamka": l_sPoznamka };
                callAsync("~/Gin/Wfl/WS/WSOperationWfl.asmx/PridejUzivPoznDoHistorie", l_oJSONPars, this.PridejUzivPoznDoHistorieOnSucceeded, null, this);
            }
        } else {
            window.alert(this.RequiredErrMessage);
        } 
    },
    PridejUzivPoznDoHistorieOnSucceeded: function (result, userContext, methodName) {
        var _this = userContext;

        if(result.RetVal == "1") {
            _this.close(true);
        } else {
            if(result.ErrMessage != "") {
                window.alert(result.ErrMessage);
            }
        }
    }
}
