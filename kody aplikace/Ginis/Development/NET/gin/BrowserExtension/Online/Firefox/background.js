
/**
 * Stavy zpracování zpráv
 */
var states = {
    "Error": { value: -2, name: "Error" },
    "Unknown": { value: -1, name: "Unknown" },
    "Started": { value: 0, name: "Started" },
    "Working": { value: 1, name: "Working" },
    "Finished": { value: 2, name: "Finished" }
};

var badCommMsg = unescape(encodeURIComponent(chrome.i18n.getMessage("badComm")));
var badArgsMsg = unescape(encodeURIComponent(chrome.i18n.getMessage("processCntMsgBadArgs")));
var badStateMsg = unescape(encodeURIComponent(chrome.i18n.getMessage("getPartBadState")));
var nativeMsgWPCMsg = unescape(encodeURIComponent(chrome.i18n.getMessage("processNatMsgWPC")));
var nativeMsgDIM = unescape(encodeURIComponent(chrome.i18n.getMessage("processNatMsgDIM")));
var procBadStateMsg = unescape(encodeURIComponent(chrome.i18n.getMessage("processNatMsgBS")));

/**
 * Funkce pro vygenerování pseudonáhodného identifikátoru
 * @returns {string} ID 
 */
function generateNewId() {
    var newId = "";
    var possibleChars = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 24; i++) newId += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    return newId;
}

function Defer() {
    var res, rej, p = new Promise(function (rs, rj) { res = rs; rej = rj; });
    p.resolve = res;
    p.reject = rej;
    return p;
}

//#region TransferedData
/**
 * Objekt reprezentující přenášená data
 * @param {number} totalParts Pocet částí přenášených dat
 */
function TransferedData(totalParts) {
    this.content = [];
    this.part = 0;
    this.totalParts = totalParts;
}

/**
 * Přidání dat do přenášených dat
 * @param {number} part Číslo části
 * @param {string} data Přidávaná data
 */
TransferedData.prototype.appendData = function (part, data) {
    if (part === (this.part + 1)) {
        this.content.push(data);
        this.part = this.part + 1;
        data = null;
    }
};
/**
 * Metoda pro uvolnění přenášených dat z paměti
 */
TransferedData.prototype.dispose = function () {
    delete this.content;
    this.part = this.totalParts = 0;
};

/**
 * Metoda pro přípravu dat před poslaní na klienta
 * @param {number} part Číslo části posílaných dat
 * @returns {string[]} Posílaná data
 */
TransferedData.prototype.getNextPartToContentMsg = function (part) {
    if (part + 1 < this.totalParts) {
        return this.content.splice(0, maxContentFileIndex);
    } else {
        return this.content.splice(0);
    }
};
//#endregion

//#region BaseManager - predek vsech manageru
class BaseManager {
    constructor(tabId, comunicator) {
        if (this.constructor == BaseManager) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.id = generateNewId();
        this.tabId = tabId;
        this.state = states.Unknown;
        this.comunicator = comunicator;
    }

    getId() {
        return this.id;
    }

    /**
     * Metoda pro poslání chyby na klienta
     * @param {string} reason Důvod chyby
     * @param {string} msgID ID zprávy
     * @param {string} versionState stav verze
     */
    sendErrorToContent(reason, msgID, versionState) {
        //this.state = states.Error;
        this.comunicator.sendContentMessage(this.tabId, { mID: this.getId(), response: "NOK", reason: reason, src: "background.js", msgID: msgID, versionState: versionState });
    };


    sendResponseToContent(message) {
        throw new Error("Method 'sendResponseToContent()' must be implemented.");
    }

    processContentMessage(message) {
        throw new Error("Method 'processContentMessage()' must be implemented.");
    }

    sendNativeMessage(message) {
        
        message.mID = this.id;
        //message.sendID = atob(message.sendID);
        this.comunicator.sendNativeMessage(message);
    }
    /**
     * Obsluha příchozí zpravy z nativní aplikace
     * @param {any} message Příchozí zpráva
     * @inheritdoc 
     */
    processNativeMessage(message) {
        throw new Error("Method 'processNativeMessage()' must be implemented.");
    }

}
//#endregion


//#region ChunkManager - novy manager, ktery se stara o rozdeleni zprav z klienta a do webove aplikace
class ChunkManager extends BaseManager {
    processContentMessage(message) {
        if (message.msgID && ((message.sendID && message.msgContent) || message.type === "service")) {
            var _this = this;
            this.comunicator.connect().then(function () { _this.sendNativeMessage(message); }, function (reason) {
                _this.sendErrorToContent(btoa(reason), message.msgID, "commError");
            });
        }
        else {
            this.sendErrorToContent(badArgsMsg, message.msgID, message.versionState);
        }
    }

    /**
    * Metoda pro poslání zprávy do webové aplikace
    * @param {string} message Posílaná zpráva
    */
    sendResponseToContent(message) {
        message.src = "background.js";
        this.comunicator.sendContentMessage(this.tabId, message);
    }

    processNativeMessage(message) {
        this.sendResponseToContent(message);
    }
}

//#endregion

//#region FMPartManager - manager který se stará o rozdělení zpráv z klienta a do webové aplikace
/**
 * @classdesc Manager který se stará o rozdělení zpráv z klienta a do webové aplikace
 * @class
 * @augments FunctionManager
 * @param {number} tabId Číslo tabu
 * @param {any} comunicator Komunikační objekt s nativní aplikací
 * @param {any} messageType Typ zpráv
 */
class FMPartManager extends BaseManager {


    /**
     * Metoda pro poslání zprávy do webové aplikace
     * @param {string} message Posílaná zpráva
     */
    sendResponseToContent(message) {
        message.src = "background.js";
        this.state = states.Finished;
        this.comunicator.sendContentMessage(this.tabId, message);
    }

    processContentMessage(message) {
        if (message.msgID && message.msgContent && message.sendID) {
            var _this = this;
            this.state = states.Started;
            this.comunicator.connect().then(function () { _this.sendNativeMessage(message); }, function (reason) {
                _this.sendErrorToContent(btoa(reason), message.msgID, "commError");
            });
        }
        else if (message.type === "srv" && message.req === "communication") {
            this.comunicator.comMsg = message;


        }
        else if (message.type === "srv" && message.req === "tryExit" && communicator) {
            communicator.connect().then(function () { communicator.sendNativeMessage({ msgID: "abcsda", text: "exit", type: "service", versionState: "actualVersion" }); })

        }
        else if (message.type === "srv" && message.req) {


            if (message.req.hasError === true) {
                chrome.action.setBadgeBackgroundColor({ color: "#C63C3C" });
            }
            else if (message.req.hasError === false) {
                chrome.action.setBadgeBackgroundColor({ color: "#339933" });
            }

            if (message.req.indicator != null) {
                chrome.action.setBadgeText({ text: message.req.indicator });
            }
            if (message.req.notification) {
                chrome.notifications.create({ type: "basic", message: message.req.notification, title: "Message", iconUrl: "logo_gordic.png" });
            }

            if (message.req.tooltip != null) {
                chrome.action.setTitle({ title: message.req.tooltip });

            }
        }
        else {
            this.sendErrorToContent(badArgsMsg, message.msgID, message.versionState);


        }
    }

    /**
     * Metoda pro získání další části z nativní aplikace
     * @param {number} partNumber číslo další části
     * @param {string} msgID ID zprávy
     * @param {string} versionState stav verze
     * @param {boolean} versionCheck priznak, ze se jedna o test verzi
     */
    getPartFromNativeClient(partNumber, msgID, versionState, versionCheck) {
        if (this.state === states.Working) {
            this.sendNativeMessage({ msgID: msgID, cmd: "getPart", part: partNumber, type: "service", versionState: versionState, versionCheck: versionCheck });
        } else {
            this.sendErrorToContent(badStateMsg, msgID, versionState);
        }

    };
    /**
    * Obsluha příchozí zpravy z nativní aplikace
    * @param {any} message Příchozí zpráva
    * @inheritdoc 
    */
    processNativeMessage(message) {
        if (message.response === "OK") {
            switch (this.state) {
                case states.Started:
                    if (message.totalParts) {
                        this.totalParts = Number(message.totalParts);
                        this.state = states.Working;
                        this.getPartFromNativeClient(1, message.msgID, message.versionState, message.versionCheck);
                    } else {
                        this.sendErrorToContent(nativeMsgWPCMsg, message.msgID, message.versionState);
                    }
                    break;
                case states.Working:
                    if (message.part) {
                        if (message.data != null) {
                            var part = Number(message.part);
                            if (part === 1) {
                                this.transFile = new TransferedData(this.totalParts);
                            }
                            this.transFile.appendData(part, message.data);
                            /*na firefoxu smazat =>neni podporovano*/
                            if (chrome.notifications.update) {
                                chrome.notifications.update("nofifProgress", {
                                    progress: Math.round((part / this.totalParts) * 100)
                                }, function (wasUpdated) { });
                            }
                            if (part === this.totalParts) {
                                this.sendNativeMessage({ msgID: message.msgID, cmd: "isCompleted", type: "service", versionState: message.versionState, versionCheck: message.versionCheck });
                            } else {
                                this.getPartFromNativeClient(part + 1, message.msgID, message.versionState, message.versionCheck);
                            }

                        } else {
                            this.sendErrorToContent(nativeMsgDIM, message.msgID, message.versionState);
                        }

                    } else if (message.res4cmd === "isCompleted") {
                        //  console.log("FMPartManager completed" + new Date().toJSON());

                        if (this.transFile.totalParts <= maxContentFileIndex) {
                            message.transFile = this.transFile.content;
                            message.isCompleted = true;
                            message.parts = 1;
                            this.sendResponseToContent(message);
                        } else {
                            var parts = Math.floor(this.transFile.totalParts / maxContentFileIndex);
                            message.parts = parts;
                            for (var messagePart = 0; messagePart <= parts; part++) {
                                if (messagePart === parts) {
                                    message.isCompleted = true;
                                }
                                message.transFile = this.transFile.getNextPartToContentMsg(messagePart);
                                this.sendResponseToContent(message);
                            }
                        }

                        this.transFile.dispose();
                        delete this.transFile;

                    } else {
                        this.sendErrorToContent(procBadStateMsg, message.msgID, message.versionState);
                    }

                    break;
                default:
                    this.sendErrorToContent(procBadStateMsg, message.msgID, message.versionState);
                    break;

            }


        } else {
            this.sendNativeMessage({ msgID: message.msgID, cmd: "tryToExit", type: "service", versionState: message.versionState });
            this.sendErrorToContent(message.reason, message.msgID, message.versionState);
        }

    }


}
//#endregion


const maxContentFileIndex = 300;

//#region Comunicator
/** Predek komunikace */
class BaseComunicator {
    constructor() {
        if (this.constructor == BaseComunicator) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.port = null;
        this.msgProcess = {};
        this.platformInfo = "unknown";
        this.hasAnyResponse = false;
    }

    connectNative() {
        try {
            this.port = chrome.runtime.connectNative("cz.gordic.chrome.gbe");
            this.port.onMessage.addListener(this.listenNativeMessage.bind(this));
            this.port.onDisconnect.addListener(this.onDisconnected.bind(this));
            chrome.action.setBadgeBackgroundColor({ color: "#27B779" });
            if (this.port) {
                chrome.action.setBadgeText({ text: "✓" });
                return { result: true };
            } else {
                chrome.action.setBadgeText({ text: "" });
                return { result: false, reason: badCommMsg };
            }

        }
        catch (ex) {
            return { result: false, reason: ex };
        }
    }

    /**
     * Metoda pro připojení k nativní aplikaci
     * @returns {Promise} Promise pripojeni
     */
    connect() {

        var _this = this;
        var resultDto;
        var connPromise = new Promise(function (resolve, reject) {
            if (_this.notResponding) {
                reject(badCommMsg);
            }
            else if (!_this.port && !_this.exiting) {
                resultDto = _this.connectNative();
                if (resultDto.result) {
                    resolve();
                }
                else {

                    reject(resultDto.reason || badCommMsg);
                }
            }
            else if (_this.exiting) {
                _this.exitingPromise.then(function () {
                    resultDto = _this.connectNative();
                    if (resultDto.result) {
                        resolve();
                    }
                    else {
                        reject(resultDto.reason || badCommMsg);
                    }
                });

            }
            else {
                resolve();
            }

        });



        return connPromise;
    }
    /**
     * Obsluha odpojení nativní aplikace 
     */
    onDisconnected() {
        this.port.disconnect();
        this.port = null;
        chrome.action.setBadgeText({ text: "" });
        this.exiting = false;
    }

    /**
     * Poslání zprávy nativní aplikaci
     * @param {any} message Posílaná zpráva
     */
    sendNativeMessage(message) {
        try {
            var that = this;
            if (!(message && message.type === "service" && message.cmd === "tryToExit" && Object.getOwnPropertyNames(this.msgProcess).filter(function (processor) { return processor !== message.mID; }).length > 0)) {
                if (message.cmd === "tryToExit") {
                    this.exiting = true;
                    this.exitingPromise = new Defer();
                }
                else {
                    setTimeout(function () {
                        if (!that.hasAnyResponse) {
                            that.sendContentMessage(that.msgProcess[message.mID].tabId, { response: "NOK", reason: btoa(badCommMsg), src: "background.js", msgID: message.msgID, versionState: "badComm" });
                        }
                    }, 10000); // kvuli detekci chybejiciho doplnku
                }
                if (this.port) {
                    this.port.postMessage(message);
                }
            }
        } catch (ex) {
            if (ex && ex.message === "Attempting to use a disconnected port object" || ex.message === "Specified native messaging host not found") {
                chrome.action.setBadgeText({ text: "" });
                if (message && message.mID && this.msgProcess[message.mID]) {
                    if (this.platformInfo === "win") {
                        notify("notExisted");
                        this.sendContentMessage(this.msgProcess[message.mID].tabId, { response: "NOK", reason: btoa(ex.message), src: "background.js", msgID: message.msgID, versionState: "notExists" });
                    }
                    else {
                        this.sendContentMessage(this.msgProcess[message.mID].tabId, { response: "NOK", reason: btoa(ex.message), src: "background.js", msgID: message.msgID, versionState: "OSNotSupported" });
                    }
                }
            }
            if (message && message.mID) {
                delete this.msgProcess[message.mID];
                this.port.disconnect();
                this.port = null;
            }
            console.error(ex);
        }
    }
    /**
     * Obsluha příchozí zprávy z webové aplikace
     * @param {any} message Příchozí zpráva
     * @param {any} sender Odesílatel zprávy
     * @param {any} sendResponse Delegát po odeslání zprávy
     */
    listenContentMessage(message, sender, sendResponse) {
        throw new Error("Method 'listenContentMessage()' must be implemented.");
    }


    /**
       * Obsluha příchozí zprávy z nativní aplikace
       * @param {any} message Příchozí zpráva
       */
    listenNativeMessage(message) {
        this.hasAnyResponse = !!message;
        if (message.cmd === "keepAlive") {
            this.sendNativeMessage({ msgID: message.msgID, response: "keepAlive" })
        }
        else if (message.mID) {
            var manager = this.msgProcess[message.mID];
            if (manager) {
                manager.processNativeMessage(message);
            } else {
                this.sendNativeMessage({ msgID: message.msgID, cmd: "tryToExit", type: "service", versionState: message.versionState });
            }
        }
        else if (message.msgID && message.type === "exitState") {
            if (message.state === "exiting") {
                this.onDisconnected();
            }
            this.exitingPromise.resolve();
        }
        else {
            console.error("Comunicator listenNativeMessage - Incomming message:");
            console.error(JSON.stringify(message));
            console.error("Comunicator listenNativeMessage - Manager is not registred");
        }
    }
}


/**
 * Manager pro komunikaci s nativní aplikací
 */
class Comunicator extends BaseComunicator {
    
    /**
     * Poslání zprávy web.aplikaci
     * @param {number} tabId Číslo tabu
     * @param {any} message Posílaná zpráva
     */
    sendContentMessage(tabId, message) {
        //console.info(tabId.id, message);
        chrome.tabs.sendMessage(tabId.id, message);
        if (message.parts != null && message.isCompleted === true) {
            delete this.msgProcess[message.mID];
        } else if (!message.parts) {
            delete this.msgProcess[message.mID];
        }

    }

    /**
     * Obsluha příchozí zprávy z webové aplikace
     * @param {any} message Příchozí zpráva
     * @param {any} sender Odesílatel zprávy
     * @param {any} sendResponse Delegát po odeslání zprávy
     */
    listenContentMessage(message, sender, sendResponse) {
        //console.log("recievedContentMsg", new Date().toJSON(), JSON.stringify(message));
        var manager = new FMPartManager(sender.tab, this);
        if (manager) {
            this.msgProcess[manager.getId()] = manager;
            manager.processContentMessage(message);
        }
    }

}
/**
 * Nový manager pro komunikaci s nativní aplikací
 */
class NewComunicator extends BaseComunicator {
    
    /**
     * Poslání zprávy web.aplikaci
     * @param {number} tabId Číslo tabu
     * @param {any} message Posílaná zpráva
     */
    sendContentMessage(tabId, message) {
        chrome.tabs.sendMessage(tabId.id, message);
    }

    /**
     * Obsluha příchozí zprávy z webové aplikace
     * @param {any} message Příchozí zpráva
     * @param {any} sender Odesílatel zprávy
     * @param {any} sendResponse Delegát po odeslání zprávy
     */
    listenContentMessage(message, sender, sendResponse) {
        var manager;
        if (message.mID && (message.type === "service" || (message.totalParts && message.part)) && this.msgProcess[message.mID]) {
            manager = this.msgProcess[message.mID];
        } else {
            manager = new ChunkManager(sender.tab, this);
            this.msgProcess[manager.getId()] = manager;       
        }
        manager.processContentMessage(message);
    }
}


//#endregion

var communicator = new Comunicator();
var newCommunicator = new NewComunicator();
chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message && message.type === "testCommunication") {
        try {

            testNativeHost().then(
                function (version) {
                    chrome.runtime.sendMessage({
                        type: "testCommunication",
                        result: "OK",
                        reason: version.responseData
                    });
                },
                function (reason) {
                    chrome.runtime.sendMessage({
                        type: "testCommunication",
                        result: "NOK",
                        reason: reason
                    });
                });
        }
        catch (ex) {
            chrome.runtime.sendMessage({
                type: "testCommunication",
                result: "NOK",
                reason: "Communication error"
            });
        }

    }
    else if (message && message.type === "install") {
        downloadMSI();
    }
    else if (message && message.gen === 1) {
        if (communicator.port) {
            communicator.sendNativeMessage({ msgID: "abcsda", text: "exit", type: "service", versionState: "actualVersion" });
            communicator.onDisconnected();
        }
        newCommunicator.listenContentMessage(message, sender, response);
    }
    else {
        communicator.listenContentMessage(message, sender, response);
    }

});

chrome.runtime.getPlatformInfo(function (platformInfo) {
    communicator.platformInfo = platformInfo.os;
    newCommunicator.platformInfo = platformInfo.os;
});

function downloadMSI() {
    setTimeout(function () {
        //chrome.tabs.create({ url: "https://www.seznam.cz", active: false })

        chrome.tabs.create({ url: "https://www.gordic.cz/browser_extensions/GordicBrowserExtension_win_x86.msi", active: false })
    }, 1500);
    // window.open("https://www.gordic.cz/browser_extensions/GordicBrowserExtension_win_x86.msi", "_blank");
}

chrome.notifications.onButtonClicked.addListener(function (notifId, btnIdx) {
    if (notifId === "notifyExtension") {
        if (btnIdx === 0) {
            downloadMSI();
        }
    }
});


/*na firefoxu smazat =>neni podporovano*/
chrome.runtime.onSuspend.addListener(function () {
    this.sendContentMessage(communicator.msgProcess[communicator.comMsg.mID].tabId, { response: "NOK", reason: btoa(badCommMsg), src: "background.js", msgID: communicator.comMsg.msgID, versionState: "commError" });

    console.log("Unloading.");
    chrome.action.setBadgeText({ text: "" });
});

chrome.windows.onRemoved.addListener(handleRemoved);
function handleRemoved(windowID) {

    chrome.windows.getAll({ windowTypes: ["normal"] }, function (windows) {
        if (windows.length === 0 && communicator.port) {
            communicator.connect().then(function () { communicator.sendNativeMessage({ msgID: "abcsda", text: "exit", type: "service", versionState: "actualVersion" }); })
        }

    })

}

function notify(reason) {
    if (reason === "notExisted") {
        chrome.notifications.create("notifyExtension", {
            type: "basic",
            iconUrl: "logo_gordic.png",
            title: "Gordic Browser Extension",
            message: chrome.i18n.getMessage("nativeClientNotExist"),
            //buttons: [{ title: chrome.i18n.getMessage("yesBtn") },
            //{ title: chrome.i18n.getMessage("noBtn") }]

        });
    }
    else if (reason === "permissions") {
        chrome.notifications.create("notifyExtensionPermissions", {
            type: "basic",
            iconUrl: "logo_gordic.png",
            title: "Gordic Browser Extension",
            message: chrome.i18n.getMessage("nativeClientBadPermissions"),
            //buttons: [{ title: chrome.i18n.getMessage("yesBtn") },
            //{ title: chrome.i18n.getMessage("noBtn") }]

        });
    }

}

function testNativeHost() {

    return new Promise(function (resolve, reject) {
        try {
            chrome.runtime.sendNativeMessage("cz.gordic.chrome.gbe", { type: "settings", msgID: generateNewId().substring(0, 12), mID: generateNewId(), req: "getVersion", text: "exit" }, function (response) {
                communicator.notResponding = !response;
                if (communicator.notResponding) {
                    console.log("TEST: Chyba " + chrome.runtime.lastError);
                    var permText = "Access to the specified native messaging host is forbidden.";
                    var missText = "Specified native messaging host not found.";
                    if (chrome.runtime.lastError && chrome.runtime.lastError.message === permText) {
                        notify("permissions");
                        reject("permissions");
                    } else if (chrome.runtime.lastError && chrome.runtime.lastError.message === missText) {
                        notify("notExisted");
                        reject("notExisted");
                    } else {
                        reject("unknownError");
                    }

                }
                else {
                    resolve(response);
                }
                //else {       
                //    chrome.runtime.sendNativeMessage("cz.gordic.chrome.gbe", { text: "exit" });
                //}

            });
        }
        catch (ex) {
            reject(ex);
        }
    });
}