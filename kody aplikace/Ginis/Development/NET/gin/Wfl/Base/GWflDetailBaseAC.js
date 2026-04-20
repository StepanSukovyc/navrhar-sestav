var WFLABASE = {
    JsEvent: function (actStr) {
        debugger;
        var l_oParamsJSON = { "EventId": actStr };
        var that = this;
        that.call({
            methodName: "JsEvent",
            methodParams: l_oParamsJSON
        }).done(function (ret) {
            switch (actStr) {
                case "SaveData":
                    if (ret === true) that.close({ a: actStr, res: ret });
                    else GDlg.warning("jres:23900098"); //RC 23900098 : Akce se nepodařila.
                    break;
            }
        });
    },

}



