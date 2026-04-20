window.ginisDevelopMode = true; // globalni priznak pro komponenty

if (window.gscript) {
    window.gscript.getScript = function (url) {
        // zdroj:DEBUG.JS, protoze JQUERY.getScript nelze debuggovat
        var script = $("<script>").attr("async","false").attr("src", this.getUrl(url))[0];
        var deff = $.Deferred();

        // Handle Script loading
        var done = false;
        var timer = window.setTimeout(function () {
            script.parentNode.removeChild(script);
            window.gscript.__proto__.getScript.call(window.gscript, url).done(deff.resolve).fail(deff.reject);
        }, 4000); //fail timeout

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState ||
                this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                window.clearTimeout(timer);

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                deff.resolve();
            }
        };

        document.getElementsByTagName("head")[0].appendChild(script);

        return deff.promise();
    }
}