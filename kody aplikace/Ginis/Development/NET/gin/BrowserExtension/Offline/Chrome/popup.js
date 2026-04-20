// Once the DOM is ready...
document.addEventListener('DOMContentLoaded', function () {

    var testBtn = document.getElementById('testBtnOff');
    //testBtn.innerText = chrome.i18n.getMessage("testBtn");
    testBtn.addEventListener(
        'click',
        testBtnClicked);

    
    document.getElementById("extensionName").innerText = chrome.i18n.getMessage("appName");
    document.getElementById("description").innerText = chrome.i18n.getMessage("appDesc");

    document.getElementById("testBtnCntOff").innerText = chrome.i18n.getMessage("testBtn");

    //document.getElementById("manualRef").innerHTML = chrome.i18n.getMessage("readManualBtn");

});

function successCommunication(version) {
    var indicator = document.getElementById("indicator");
    document.getElementById('testBtnOff').classList.add("success");

    indicator.classList.remove("error", "info");
    indicator.classList.add("success");

    var icon = indicator.firstChild;
    icon.classList.remove("fa-times-circle", "fa-info-circle");
    icon.classList.add("fa-check-circle");

    document.getElementById("testText").innerText = chrome.i18n.getMessage("successMsg", version);


    setVisibility(true);
}

function errorCommunication(reason) {
    var indicator = document.getElementById("indicator");
    document.getElementById('testBtnOff').classList.add("error");
    indicator.classList.remove("success", "info");
    indicator.classList.add("error");

    var icon = indicator.firstChild;

    icon.classList.remove("fa-check-circle", "fa-info-circle");
    icon.classList.add("fa-times-circle");

   

    var errorText = chrome.i18n.getMessage("unknownTestMsg");
    switch (reason) {
        case "permissions":
            errorText = chrome.i18n.getMessage("permissionsText");
            break;
        case "notExisted":
            errorText = chrome.i18n.getMessage("notExistedText");
            break;
    }
    
    const parser = new DOMParser();
    const parsed = parser.parseFromString(errorText, `text/html`);
    const tags = parsed.getElementsByTagName(`body`);

    for (const tag of tags) {
        document.getElementById("testText").appendChild(tag);
    }

    setVisibility(true);
}

function setVisibility(isVisible) {
    var indicator = document.getElementById("indicator");
    var testText = document.getElementById("testText");
   
    if (isVisible) {
        indicator.classList.remove("hidden");
        testText.classList.remove("hidden");
        
    }
    else {
        indicator.classList.add("hidden");
        testText.classList.add("hidden");
        testText.innerText = "";
        indicator.firstChild.classList.remove("fa-times-circle", "fa-check-circle", "fa-info-circle");
    }
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request && request.type === "testCommunication" && request.result === "OK") {
            successCommunication(request.reason);
        }
        else if (request && request.type === "testCommunication" && request.result === "NOK") {
            errorCommunication(request.reason);
        }

    });


function testBtnClicked() {
    document.getElementById('testBtnOff').classList.remove("success", "error");
    setVisibility(false);
    chrome.runtime.sendMessage({ type: "testCommunication" });
}