var statusBar = $("#statusBar");
$(document).ready(function () {
    statusBar.hide();
});
function testFunction() {
    var btn = $("#testBtn");
    statusBar.show();
    btn.prop("disabled", true);

    if (GBrowserExtras.gbeISSuported() && window.document.getElementsByName("GBE_Version").length === 0) {
        window.testCommExtension = $.Deferred().reject({
            reason: "jres:31850031",
            handled: false,
            type: EReasonType.extensionNotExists,
            operation: window.reqOperation
        }).promise(); //RC 31850031 : Doplněk není nainstalovaný nebo je zakázaný.
    }
    else {
        window.testCommExtension = GBrowserExtras.testCommunication(window.reqOperation);

        window.testCommExtension.always(function () {
            statusBar.hide();
            btn.prop("disabled", false);
        });
    }
}

window.addEventListener('beforeunload', function (event) {
    window.testCommExtension = window.testCommExtension || $.Deferred().reject({
        reason: "jres:31850032",
        handled: false,
        type: EReasonType.extensionNotExists,
        operation: window.reqOperation
    }).promise(); //RC 31850032 : Test se nezdařil.Opakujte ho znovu.
});