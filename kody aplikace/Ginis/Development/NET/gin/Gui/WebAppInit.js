/* GORDIC GINIS loader */
"use strict";

class GINISApp {
    initialized = false;

    gup(name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    }

    failedPage(exc) {
        //    return; 
        var sanitize = exc && exc.htmlSafe !== true && typeof htmlEncode !== "undefined" ? htmlEncode : function (i) { return i; };
        if (exc && exc.handled !== true) {
            if (typeof exc === "string")
                document.body.innerHTML = "<h1>jres:25000154 - " + sanitize(exc) + "</h1>"; //RC 25000154 : Chyba aplikace
            else if (exc.nonFatalMessage)
                document.body.innerHTML = "<h1>" + sanitize(exc.nonFatalMessage, true) + "</h1>";
            else if (exc.errorType == "info")
                document.body.innerHTML = "<h1>" + sanitize(exc.message, true) + "</h1>";
            else
                document.body.innerHTML = "<h1>jres:25000154</h1>" + (exc.title ? "<b>" + sanitize(exc.title) + "</b><br><br>" : "") + (exc.message ? sanitize(exc.message, true) + "<br><br>" : "") + (exc.completeMessage || exc.stack ? sanitize(exc.completeMessage || exc.stack, true) : "");
            exc.handled = true;
        } else if (!exc)
            document.body.innerHTML = "<h1>jres:25000154</h1>"
    }

    logoutPage(opts) {
        window.__GINISApp = undefined;
        window.gjqServiceName = undefined;
        window.gstor = undefined;
        window.gscript = undefined;
        window.GDlg = undefined;
        window.GContent = undefined;
        window.Gordic = undefined;
        var highestId = window.setTimeout(function () { }, 0);
        for (var i = highestId; i >= 0; i--) window.clearInterval(i); // zastaveni vsech timeru

        opts = opts || {};
        document.body.innerHTML = "<h1 class='g-state-" + (opts.status || "success") + " g-state-lightbackground'>" + (opts.reason || "") + "</h1>" + (opts.backText && opts.backScript ? "<a id='backlink' href='" + opts.backScript + "'>" + opts.backText + "</a>" : "");
        $(document).trigger("applicationclosed", [opts]);

        if (opts.backAuto === true)
            window.setTimeout(function () { var a = document.getElementById("backlink"); a && a.click(); }, 2000);
    }

    error(e) {
        if (e instanceof ErrorEvent)
            this.failedPage({ title: "jres:25000152", htmlSafe: true, message: e.message, completeMessage: (e.error?.stack || e.error || "") + "<br>  at: " + e.filename + ":" + e.lineno + "," + e.colno }); //RC 25000152 : Chyba skriptu
        else if (e.target?.nodeName === "SCRIPT" || e.target?.nodeName === "LINK" || e.target?.nodeName === "IMG" || e.target?.nodeName === "IFRAME") {
            var src = e.target.src || e.target.href; 
            this.failedPage({ title: "jres:25000150", htmlSafe: true, message: "<a href='" + src + "'>" + src + "</a>", completeMessage: "<iframe src='" + src + "' style='width:100%' onload=\"this.style.height=(this.contentWindow.document.body.scrollHeight+30)+'px';\"/>" }); //RC 25000150 : Chyba při načítání skriptu
        } else if (e instanceof Event) {
            this.failedPage({ title: "jres:25000153", completeMessage: `type: ${e.type}\nmessage: ${e.message || ""}\nsource: ${e.target == window ? "window" : e.target?.outerHTML || "" }` }); //RC 25000150 : Chyba při načítání skriptu
        } else {
            var completeMessage;
            try { completeMessage = JSON.stringify(e); } catch { }
            this.failedPage({ title: "jres:25000153", completeMessage: completeMessage }); //RC 25000153 : Obecná chyba
        }
        console.error("jres:25000154", e); 
    }

    start(mainAppContent, params) {
        var $this = this;
        $("body").addClass("gwebapp");
        var queryObj = $.extend({ starting: true }, params, queryStringToObj());
        if (typeof queryObj.jsmin !== "undefined" && window.gscript && window.gscript.urlParams) window.gscript.urlParams.push("min=" + queryObj.jsmin);
        $("<div id='main' class='main'></div>")
            .gcontent(mainAppContent, {
                userSettings: false,
                loginDialogCreator: function () { return $("<div>").dialog({ modal: false }).dialog("dock").attr('role', 'main'); } // prvni login je fullscreen
            })  // pro jistotu vypneme US, globalni gstor se nacita az v onloadu
            //        .on("loginopen.main", function (ev, obj) { obj.loginWindow.dialog("dock"); })
            .on("contentloaded.main", function () { $(this).off(".main"); $.content(this).loginDialogCreator = null; $("body").html(this); })
            .on("contentworking", function (ev, working, status, content) {
                if (ev.isDefaultPrevented() || ev.target !== this) return;

                if (working === false && $(this).is(".gcover")) $(this).gcover("destroy").removeAttr('aria-busy');
                else if (working === true) $(this).gcover(status).attr('aria-busy', 'true');

                ev.preventDefault();
            })
            .on("closed", function (ev, result) { if (ev.target === this && ev.content.loaded === true) $this.logoutPage(result); })
            .gcontent("load", queryObj)
            .fail(function (jqXHR, type) { // TODO: vygenerovat vyjimky z beznych status kodu az bude funkcni exceptionInfo
                if (type != "exception" && jqXHR && jqXHR.status && !(jqXHR instanceof GError)) // uz by nemelo nastavat. Regulerni fail content.load by mel vzdycky vratit Error a ten by mel byt uz zobrazen dialogem
                    $this.failedPage(jqXHR.statusCode ? { title: jqXHR.status + " - " + jqXHR.statusText, message: jqXHR.url || "" } : type);
                else if (jqXHR instanceof Error) {
                    $("body").removeClass("gwebapp");
                    $this.failedPage(jqXHR);
                }
            });
    }
}
