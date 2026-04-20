/* GORDIC Ošetření vyjímky AIB */
"use strict";


(function ($) {
    /**
     * T32751
     */
    $(document.body).off(".aibexception").on("unhandledexception.aibexception", function (ev, err) {
        var exc = err && err.details;
        if (exc && exc.exceptionType == "Gordic.General.ApplicationServer.GAibException" && exc.data && (exc.data["FailReason"] == 8 || exc.data["FailReason"] == 9)) { //chybí ginis licence
            err.handled = true;
            const isGinisLicenceFail = exc.data["FailReason"] == 9;

            const message = `<span style="font-weight:normal">${(isGinisLicenceFail ? "jres:31750039" //RC 31750039 : Konektor {0} (AIB) není licencován v této databázi.
                : "jres:31750041")}<br/>jres:31750040</span>` //RC 31750041 : Konektor {0} není licencován na straně AIB.
                .format("<b>{0} [{1} {2}]</b>".format(exc.data["ModuleAttribute"]["Text"], exc.data["ModuleAttribute"]["Pol"], String(exc.data["ModuleAttribute"]["PPol"])?.padStart(3, "0")));  
            var newErr = {
                title: "jres:31750038", //RC 31750038 : Konektor (AIB) není licencován
                htmlSafe: true,
                message: message,
                completeMessage: message +"<br/><br/>" + htmlEncode(err.completeMessage || err.details || "", true) 
            }
            return Gordic.Dialogs.showException(newErr).createDialogPromise();
        }
        else if (exc && exc.exceptionType === "Gordic.General.ApplicationServer.GAibException" && exc.data && exc.data["RequestID"] ) {
            err.handled = true;
            var errCodePromise = $.when(exc.data["RequestID"]);

            var admFaze = Gordic && Gordic.Consts && Gordic.Consts.Apps && Gordic.Consts.Apps.filter(it => it.url && it.faze == "GWAADM05" || it.faze == "GWAADX05");
            admFaze = admFaze && admFaze[0] && admFaze[0].faze;
            if (admFaze) {
                errCodePromise = Gordic.WebApp.Utility.createCommandUrl(admFaze, "OpenDetail", {
                    Profile: exc.data["DbProfile"],
                    ixx1: "10280",
                    ixx2: exc.data["SerialID"], //"PID", // id cílového objektu v nově otevírané záložce
                    ixx3: exc.data["RequestID"], // druhé id cílového objektu v případě složeného klíče (nepovinné)
                } // název metody spuštěné po otevření nové záložky
                ).then(function (errUrl) { return ('<a style="color:#2650b9;" href="{0}" target="_blank">{1}' + Gordic.Utils.IconBuilder.defaultInst.createIcon("fa-external-link") + '</a>').format(errUrl, exc.data["RequestID"]); });
            }
            var title = (exc.data["Module"] || "?") + (exc.data["AIB"] === true ? " (AIB)" : "");
            errCodePromise.then(function (errorCode) {
                var newErr = {
                    title: "jres:31750029".format(title), //RC 31750029 : Chyba konektoru {0}
                    htmlSafe: true,
                    message: 'jres:31750035<br/><br/>jres:31750036<ul style="font-size:13px; font-weight:normal;"><li> jres:31750034<br/> jres:31750033<br/><br/></li><li>jres:31750032</li></ul><span  style="font-size:13px; font-weight:normal;">jres:31750031</span> <br/> <span class="center" style="display:block;">jres:31750030</span><br/>'.format(errorCode, title), //RC 31750036 : Co dál?
                    completeMessage: "jres:31750030<br>".format(exc.data["RequestID"]) + htmlEncode(err.completeMessage || (typeof err.details === "string" ? err.details : 'jres:31750028'.format(errorCode, title, err.stack)) , true) //RC 31750028 : Omlouváme se, v konektoru: {1} došlo k chybě. Kód chyby: {0} Zásobník volání: {2}
                }
                return Gordic.Dialogs.showException(newErr).createDialogPromise();
            });
        }
    })
   
})(jQuery);
