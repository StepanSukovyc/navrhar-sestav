//Get meta tag - check when extension is installed
var meta = document.createElement('meta');
meta.name = "GBE_Version";
meta.content = chrome.runtime.getManifest().version;
if (document && document.getElementsByTagName('head').length !== 0 && document.getElementsByTagName('head')[0].appendChild)
    document.getElementsByTagName('head')[0].appendChild(meta);

//resend message to js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        window.postMessage(request, "*");
    });


window.addEventListener("message", function (event) {
    if (event.source !== window)
        return;
    if (event && event.data && event.data.src && event.data.src === "BrowserExtension") {
        event.data["origin"] = location.origin;
        try {
            if (event.data.msgID) {
                var data = event.data;
                //console.log("sendMessage", data, new Date().toJSON());
                chrome.runtime.sendMessage({
                    type: data.type,
                    cmd: data.cmd,
                    gen: data.gen,
                    msgID: data.msgID,
                    msgContent: data.msgContent,
                    sendID: data.sendID,
                    mID: data.mID,
                    logRequired: data.logRequired,
                    part: data.part,
                    totalParts: data.totalParts,
                    versionCheck: data.versionCheck,
                    versionState: data.versionState
                });
            }
            else if (event.data.type === "srv") {
                chrome.runtime.sendMessage({
                    type: "srv",
                    req: event.data.req
                });
            }

        } catch (ex) {

            window.postMessage({ errorMsg: "Communication error with native client", error: true, msgID: event.data.msgID, versionState: ex && ex.message === "Extension context invalidated." ? "commError" : "notSupported" }, "*");
        }
    }
}, false);