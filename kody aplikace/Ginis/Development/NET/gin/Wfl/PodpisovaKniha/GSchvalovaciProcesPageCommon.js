var SCHVPCOM = {
    ZrusitUkonRequestText: 'jres:Gordic.Wfl.WebClient:26226522', //RC 26226522 : Opravdu chcete odstranit schvalovací úkon?
    ChangeCheckedEnabled: true, // semafor pro rizeni zaskrtnuti checkboxu

    SchvalovaciProcesEvent: function (actStr) {
        var l_oParamsJSON = { "EventId": actStr };
        this.post(null, GContent.createCall("SchvalovaciProcesEvent", l_oParamsJSON, false));
    },
    Reload: function () {
        this.SchvalovaciProcesEvent("Reload");
    },
    VratPredpisSelected: function() {
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
        //    window.alert("Není vybrán řádek.");
        }

        return IdEsu;
    },
    OznacPouzeJedenRadek: function(aCheckbox) {
        var VybraneRadky = document.getElementsByName("PredpisCheckbox");
        if (VybraneRadky != null) {
            for (var i = 0; i < VybraneRadky.length; i++) {
                if (VybraneRadky[i].value != aCheckbox.value) {
                    VybraneRadky[i].checked = false;
                }
            }
        }

        this.ChangeCheckedEnabled = false;
    },
    OznacRow: function(RowNum) {
        var VyberRadkuList = document.getElementsByName("PredpisCheckbox");

        if (VyberRadkuList != null) {
            if (this.ChangeCheckedEnabled) {
                var l_bChecked = VyberRadkuList[RowNum].checked;

                for (i = 0; i < VyberRadkuList.length; i++) {
                    VyberRadkuList[i].checked = false;
                }

                VyberRadkuList[RowNum].checked = !l_bChecked;
            }
        }

        this.ChangeCheckedEnabled = true;

        this.EnableButtonsForSelectedRow();
    },
    NovyUkonClick: function (IxsSpd) {
        var _this = this;
        var $div = Wfl_OtevriDetailUkonuSchvalovacihoProcesu(this.Ixp, "", IxsSpd);

        $div.on("close", function (ev, retValue, content) {
            if (retValue) {
                _this.Reload();
            }
        });

    },
    DetailUkonuClick: function() {
        var l_sSelectedRow = this.VratPredpisSelected();
        var l_sSerCislo = l_sSelectedRow;

        this.ShowDetailUkonu(this.Ixp, l_sSerCislo);
    },
    ShowDetailUkonu: function (Ixp, SerCisloUkonu) {
        var _this = this;
        var $div = Wfl_OtevriDetailUkonuSchvalovacihoProcesu(Ixp, SerCisloUkonu, "");

        $div.on("close", function (ev, retValue, content) {
            if(retValue) {
                _this.Reload();
            }
        });
    },
    ZrusitUkonClick: function() {
        var l_sSelectedRow = this.VratPredpisSelected();
        var l_sSerCislo = l_sSelectedRow;

        if(l_sSerCislo != "") {
            if(confirm(this.ZrusitUkonRequestText)) {
                this.SerCisloHidden.value = l_sSerCislo;
                this.SchvalovaciProcesEvent("ZrusitUkonClick");
            }
        }
    }
}