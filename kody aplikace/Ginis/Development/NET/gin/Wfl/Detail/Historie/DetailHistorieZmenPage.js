var DHZM = {
    onContentReady: function () {

    },
    OKClick: function() {
        var l_sZmena = this.ZmenaTextBox.value;
        var l_sPoznamka = this.PoznamkaTextBox.value;

        if(l_sZmena == "") {
            window.alert(this.RequiredZmenaErrMessage);
            return;
        }
        if(l_sPoznamka == "") {
            window.alert(this.RequiredPoznamkaErrMessage);
            return;
        }

        var l_oJSONPars = { "Ixp": this.Ixp, "Zmena": l_sZmena, "Poznamka": l_sPoznamka };
        callAsync("~/Gin/Wfl/WS/WSOperationWfl.asmx/PridejZmenuDoHistorie", l_oJSONPars, this.PridejZmenuDoHistorieOnSucceeded, null, this);
    },
    PridejZmenuDoHistorieOnSucceeded: function(result, userContext, methodName) {
        var _this = userContext;

        if(result.RetVal == "1") {
          /*  var jq = userContext.jq;
            var functionOnSucceeded = userContext.functionOnSucceeded;

            functionOnSucceeded(jq);*/
            _this.close(true);
        } else {
            if(result.ErrMessage != "") {
                window.alert(result.ErrMessage);
            }
        }
    }
}
