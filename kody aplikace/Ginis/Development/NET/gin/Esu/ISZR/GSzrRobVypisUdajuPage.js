var m_oROBVYUD = null;

var ROBVYUD = {
    onContentReady: function () {
        m_oROBVYUD = this;

        this.EnableControls();
    },
    EnableControls: function() {

        var l_bVybranEsu = this.Obcan.GetIxsEsu().length > 0;
        var l_oVyuzitiSzrRB = this.VyuzitiSzrRadio;
        var l_oVyuzitiEsuRB = this.VyuzitiEsuRadio;

        var l_bDetailEsuDisabled = !this.EsuSelected;
        var l_bVypisUdajuDisabled = !(this.EsuSelected && this.DuvodTextBox.value != "");
        var l_bVypisVyzvednoutDisabled = !this.ZadanPozadavek;
        var l_bTiskSzrDisabled = !((this.UspesneVyzvednutPozadavek || this.EsuSelected) && this.DuvodTextBox.value != "" && l_oVyuzitiSzrRB.checked);
        var l_bTiskEsuDisabled = !(l_bVybranEsu && this.DuvodTextBox.value != "" && l_oVyuzitiEsuRB.checked);

        this.actions.actDetail.enabled(!l_bDetailEsuDisabled);
        this.actions.actVypisUdaju.enabled(!l_bVypisUdajuDisabled);
        this.actions.actVypisVyzvednout.enabled(!l_bVypisVyzvednoutDisabled);
        this.actions.actTiskSzr.enabled(!l_bTiskSzrDisabled);
        this.actions.actTiskEsu.enabled(!l_bTiskEsuDisabled);

        var l_sEsuTxt = this.Obcan.GetEsuTxt();

        if(l_oVyuzitiSzrRB.checked) {
            this.DuvodTextBox.value = this.BaseDuvod + " " + l_sEsuTxt;
        } else {
            this.DuvodTextBox.value = this.BaseDuvodEsu + " " + l_sEsuTxt;
        }
    },
    EsuChange: function() {
        var l_asInfoEsuArray = this.Obcan.GetIxsEsu();
        this.EsuSelected = l_asInfoEsuArray.length != 0;

        this.actions.actVypisUdaju.enabled(false);

        this.IdTextBox.value = "";
        this.IdProTiskTextBox.value = "";

        this.DatumDoImage.style.display = "none";

        this.EnableControls();
    },
    TypVypisuClick: function() {
        this.EnableControls();
    },
    DetailEsuClick: function() {
        var l_asInfoEsuArray = this.Obcan.GetIxsEsu();

        if(l_asInfoEsuArray.length > 0) {
            this.Obcan.ShowDetailEsu();
        }
    },
    VypisUdajuClick: function() {
        var l_oJSONPars = { "IxsEsu": this.Obcan.GetIxsEsu()[0], "FromDate": this.FromToDate.fromDate.getDate(), "ToDate": this.FromToDate.toDate.getDate(), "Duvod": this.DuvodTextBox.value };
        callAsync("~/Gin/Esu/WS/WSOperationsEsu.asmx/ROBVYUDVypisUdaju", l_oJSONPars, this.VypisUdajuOnSucceeded, null, this);
    },
    VypisUdajuOnSucceeded: function (result, userContext, methodName) {
        var _this = userContext;

        var l_bZadanPozadavek = false;

        if(result.ErrMessage != "") { // zde muze byt i nechybova hlaska
            if(result.RetVal != "" && result.RetVal != "-1") { // pokud dopadlo
                _this.IdTextBox.value = result.RetVal;
                l_bZadanPozadavek = true;
            }
            window.alert(result.ErrMessage);
        }

        _this.EsuSelected = true;
        _this.ZadanPozadavek = l_bZadanPozadavek;
    },
    VypisVyzvednoutClick: function() {
        var l_oJSONPars = { "IxsEsu": this.Obcan.GetIxsEsu()[0], "Id": this.IdTextBox.value, "Duvod": this.DuvodTextBox.value };
        callAsync("~/Gin/Esu/WS/WSOperationsEsu.asmx/ROBVYUDVypisVyzvednout", l_oJSONPars, this.VypisVyzvednoutOnSucceeded, null, this);
    },
    VypisVyzvednoutOnSucceeded: function(result, userContext, methodName) {
        var _this = userContext;

        var l_sDatumDoImageDisplay = "none";

        if(result.RetVal == "1") {
            _this.IdProTiskTextBox.value = _this.IdTextBox.value;
        }
        if(result.ErrMessage != "") { // zde muze byt i nechybova hlaska
            if(result.RetVal == "1" && result.ToDate != "") {
                var re = /-?\d+/;
                var m = re.exec(result.ToDate);
                var date = new Date(parseInt(m[0]));

                _this.FromToDate.toDate.setDate(date);

                l_sDatumDoImageDisplay = "inline";
            }

            window.alert(result.ErrMessage);
        }

        _this.EsuSelected = true;
        _this.ZadanPozadavek = true;
        _this.UspesneVyzvednutPozadavek = result.RetVal == "1";

        _this.DatumDoImage.style.display = l_sDatumDoImageDisplay;
    },
    StarsiVypisyClick: function() {
        if(true) {
            var l_oParamsJSON = { _tm: 'gin_ptm_szrrov' };

           // $.getScript(GinUrl + "/Reporter/Reporter.js", function (data, textStatus, jqxhr) {
                Rep_ShowEvid(l_oParamsJSON);
           // });
        } else {
            var url = encodeURI("~/Gin/Reporter/GEvid.aspx?tm=gin_ptm_szrrov");
            ShowModalWindowEx(url, "", 720, 280, false, true, true);
        }
    },
    TiskSzrClick: function() {
        this.TiskSzr.click();
    },
    TiskEsuClick: function() {
        this.TiskEsu.click();
    },
    TiskSzrRetreiveFc: function() {
        var l_sX0001 = "";
        var l_oX0009 = this.GReportX0009;
        var pouzeGinis = "";

        if(this.TisknoutPouzeGinisCheckbox.checked) {
            l_sX0001 = "1";
            pouzeGinis = " (pouze IS GINIS v této ogranizaci)";
        }

        l_oX0009 = l_oX0009 + "|POZNAMKA=" + this.Obcan.GetEsuTxt() + pouzeGinis;
        l_oX0009 = l_oX0009 + "|LOK_ICO=" + this.DuvodTextBox.value;

        // neni doreseno prenaseni CommonInfos. Dodelat!
     //   report.CommonInfos["IXS_TYP"] = new GString("00000400200Q"); // TEST !!!
        //   report.CommonInfos["DMS_BODY"] = new GString(GString.Left("Výpis pro " + m_oObcan.EsuText + pouzeGinis, 100)); 

        this.EsuSelected = true;
        this.ZadanPozadavek = true;
        this.UspesneVyzvednutPozadavek = true;

        return { X0000: this.IdProTiskTextBox.value, X0001: l_sX0001, X0002: this.FromToDate.fromDate.getDate(), X0003: this.FromToDate.toDate.getDate(), X0004: this.Obcan.GetIxsEsu()[0], X0005: '', X0006: '', X0007: '', X0008: '', X0009: l_oX0009 }
    },
    TiskEsuRetreiveFc: function() {
        var l_sX0001 = "";
        var l_oX0009 = this.GReportX0009;
        if (this.TisknoutPouzeGinisCheckbox.checked) {
            l_sX0001 = "1";
        }

        l_oX0009 = l_oX0009 + "|POZNAMKA=" + this.Obcan.GetEsuTxt();

        // neni doreseno prenaseni CommonInfos. Dodelat!
        //   report.CommonInfos["IXS_TYP"] = new GString("00000400200Q"); // TEST !!!
        //   report.CommonInfos["DMS_BODY"] = new GString(GString.Left("Výpis pro " + m_oObcan.EsuText + pouzeGinis, 100)); 

        this.EsuSelected = true;
        this.ZadanPozadavek = true;
        this.UspesneVyzvednutPozadavek = true;

        return { X0000: this.IdProTiskTextBox.value, X0001: l_sX0001, X0002: this.FromToDate.fromDate.getDate(), X0003: this.FromToDate.toDate.getDate(), X0004: this.Obcan.GetIxsEsu()[0], X0005: '', X0006: '', X0007: '', X0008: '', X0009: l_oX0009 }
    }
}