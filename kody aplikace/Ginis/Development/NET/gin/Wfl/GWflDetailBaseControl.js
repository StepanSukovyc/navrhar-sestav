var WFL_DETAIL_BASE_CONTROL = {

    CallScriptForExecute: function() {
        var det = this.contentDiv;
        var _this = this;

        if(this.ScriptForExecute != "") {
            eval(this.ScriptForExecute);
            this.ScriptForExecute = "";
        }
    },
    DetailEvent: function (actStr) {
        var l_oParamsJSON = { "EventId": actStr };
        this.post(null, GContent.createCall("DetailEvent", l_oParamsJSON, false));
    },
    IsEditMode: function() {
        return this.EditMode;
    },
    Reload: function () {
        var det = this.contentDiv;

        var l_oParamsJSON = { "IdEntity": this.IdEntity };
        this.load(l_oParamsJSON);
    },
    ReloadWithNewContent: function () {
        var l_id = this.IdEntity;
        this.LoadData({ IdEntity: l_id });
    },
    LoadData: function (jsonParams) {
        var l_oOldContent = this;
        new GContent(l_oOldContent.className, l_oOldContent.contentDiv, l_oOldContent.userSettings).load(jsonParams);
    },

    PreviousDetailFromList: function () {
        var det = this.contentDiv;

        if(!this.IsEditMode()) {		
            var l_sIxp = this.PIDTextBox.value;

            var ListPageId = GetGlobalManager().SendClassMessage(this, 'Default', 'ListPageID', null)[0].retVal;
    	
            try { // nutne v try, aby to nevracelo chybu pokud neni nacteny seznam 
                var l_sPrevIxp = GetGlobalManager().SendMessage(this, ListPageId, 'GetPreviousIxpFromList', l_sIxp).retVal;

                this.LoadData({ Ixp: l_sPrevIxp });
            } catch(e) {
                window.alert(this.NejsteNadSeznamemText); 
            }
        } else {
            window.alert(this.JsteVEditacnimRezimuText);
        }
    },
    NextDetailFromList: function() {	
        var det = this.contentDiv;

	    if(!this.IsEditMode()) {		
	        var l_sIxp = this.PIDTextBox.value;
		
            var ListPageId = GetGlobalManager().SendClassMessage(this, 'Default', 'ListPageID', null)[0].retVal;
    	
            try { // nutne v try, aby to nevracelo chybu pokud neni nacteny seznam 
                var l_sNextIxp = GetGlobalManager().SendMessage(this, ListPageId, 'GetNextIxpFromList', l_sIxp).retVal;

                this.LoadData({ Ixp: l_sNextIxp });
            } catch(e) {
                window.alert(this.NejsteNadSeznamemText); 
            }
        } else {
	        window.alert(this.JsteVEditacnimRezimuText);
        }
    },
    // --- editace --------
    EditModeClick: function ()
    {
        if (this.EditModeEnabled) {
            //this.DetailEvent("EditModeClick");
            //this.post(null, GContent.createCall("EditModeClick"));
            var l_oParamsJSON = { IsPost: true, IdEntity: this.IdEntity, TypZobrazeniDetailu: 4 };
            this.load(l_oParamsJSON);
        } else {
            alert("jres:23900137"); //RC 23900137 : Editační režim není povolen.
        }
    },

    SaveChangesClick: function () {
        var l_bIsValid = true;
        //if(this.Vec.style.display != "none") {
        //    l_bIsValid = this.VecTextBox.value != "";
        //} else if(this.VecSslTextBox != null) {
        //    l_bIsValid = this.VecSslTextBox.value != "";
        //}

        if(l_bIsValid) {
            var _this = this;

            var l_oJsonPars = { IdEntity: this.IdEntity, TypZobrazeniDetailu: 2 };
            _this.postCall(["SaveData", l_oJsonPars]).done(function (data, content) { _this.ReloadWithNewContent(); });

            //var l_oFunOnSaveToCache = function () {
            //    console.log('Vse uspesne ulozeno do cache. Volani SaveData..');
            //    var l_oJsonPars = { EditMode: false };
            //    _this.postCall(["SaveData", l_oJsonPars]).done(function (data, content) { _this.ReloadWithNewContent(); });
            //};

            //var warr = new Array();

            //this.find(".gcontent.gdet-editable").each(function () {
            //    warr.push(this.content.SaveValuesToCache());
            //});

            //$.when.apply(this, warr).done(l_oFunOnSaveToCache);
        } else {
            alert("jres:26226992"); //RC 26226992 : Zadejte Věc
        }
    },

    RevertChangesClick: function ()
    {
        this.ReloadWithNewContent();
    },

    OKClick: function() {
        if (this.IsEditMode()) {
            this.SaveChangesClick();
        } else if (true) {
            window.close();
        }
    },

    Stornovat: function () {

        var l_this = this;
        var l_oParamsJSON = { IdEntity: l_this.IdEntity, TypZobrazeniDetailu: 2 };
        l_this.post(null, ["Stornovat", l_oParamsJSON]).done(function (data, content) { l_this.ReloadWithNewContent(); });
    },
}