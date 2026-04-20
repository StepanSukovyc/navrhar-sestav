"use strict";

//#region GReportClientOps (base)

function GReportClientOps() {
    /// <summary>Abstraktni trida pro operace s reporty u klienta na lokale</summary>
}

GReportClientOps.createInstanceFactory = function () {
    /// <summary>Podle moznosti prohlizece vytvori instanci GReportClientOps (ActiveX, Javu nebo jen tupy objekt, ktery jen vypisuje warningy)</summary>
    console.log("GReportClientOps.createInstanceFactory");

    if (window.ActiveXObject !== undefined)
        return new GReportClientOpsActiveX();

    //if (navigator.javaEnabled())
    //    return new GReportClientOpsJava();

    return new GReportClientOpsNoPlugin();
};

GReportClientOps.prototype.getInstanceInfo = function () {
    /// <summary>Abstraktni funkce, mela by vratit string obsahujici soubor a jeho verzi (napr.: ax2.ax2 256.01)</summary>
    console.log("getInstanceInfo is not implemented", this);
    throw "getInstanceInfo is not implemented";
};

GReportClientOps.prototype.getReportToModifications = function (url, sessionName) {
    console.log("getReportToModifications is not implemented", this);
    throw "getReportToModifications is not implemented";
}

//Pripony souboru, ktere je mozne lokalne upravovat uzivatelem
GReportClientOps.prototype.extensionsLocalEditAllowed = ["docx", "doc", "xlsx", "xls", "txt"];

GReportClientOps.prototype._waitTimer = null; //Timer cekajici na zavreni souboru

GReportClientOps.prototype._getFileExtension = function (fileName) {
    /// <summary>Z nazvu souboru vrati priponu</summary>
    /// <returns type='string'>Pripona souboru</returns>
    var fileParts = fileName.split(".");
    return fileParts[fileParts.length - 1];
};

GReportClientOps.prototype._isFileModificationsAllowed = function (fileName) {
    /// <summary>Podle pripony souboru detekuje, jestli je mozne soubor na lokale editovat</summary>
    /// <returns type='boolean'>Je mozne soubor na lokale editovat?</returns>
    var extension = this._getFileExtension(fileName).toLowerCase();
    for (var i = 0; i < this.extensionsLocalEditAllowed.length; i++) {
        if (this.extensionsLocalEditAllowed[i] === extension)
            return true;
    }
    return false;
};

GReportClientOps.prototype._getFileNameFromReqHeader = function (contentDisposition) {
    /// <summary>Z hodnoty hlavicky 'Content-Disposition' vrati nazev souboru</summary>
    /// <returns type='string'>Nazev souboru vc. pripony</returns>
    var regex = /(filename=)/g;
    regex.exec(contentDisposition);
    return contentDisposition.substr(regex.lastIndex, contentDisposition.length - 1);
};

GReportClientOps.prototype._getFileName = function (filePath) {
    /// <summary>Z cesty souboru (absolutni) vrati nazev souboru s priponou</summary>
    /// <param name='filePath' type='string'>Absolutni cesta k souboru (windows)</param>
    /// <returns type='string'>Nazev souboru s priponou</returns>
    var index = filePath.lastIndexOf("\\") + 1;
    return filePath.substr(index);
};

GReportClientOps.prototype._createWaitDialog = function () {
    var clientOps = this;
    this._waitDialog = $("<div><div class='detail-content'>Sestava je otevrena pro editaci</div></div>").dialog({
        title: "Sestava je otevrena pro editaci",
        width: 330,
        height: 220,
        modal: true,
        commandBar: [
            { action: new GAction({ name: "repWaitDlgCancel", caption: "Storno", run: function () { clearTimeout(clientOps._waitTimer); } }) }
        ]
    });
};

GReportClientOps.prototype._destroyWaitDialog = function () {
    if (this._waitDialog !== undefined){
        this._waitDialog.remove();
        delete this._waitDialog;
    }
};

GReportClientOps.prototype._isWaitDialogOpen = function() {
    if(this._waitDialog === undefined)
        return false;

    if(this._waitDialog.dialog("instance"))
        return this._waitDialog.dialog("isOpen");

    return false;
};

//#endregion

//#region ActiveX

function GReportClientOpsActiveX() {
    /// <summary></summary>

    console.log("Creating instance GReportClientOpsActiveX");
    //$(document.head).append("<object id=\"Gordic_General_AX_Object\" classid=\"clsid:A37D61CF-622A-4775-955E-492A0616D75F\" codebase=\"/Gordic.Test/gin/ax/ax2.cab#version=458,33\" style=\"display: none;\"></object>");
    this.activeX = new ActiveXObject("ax2.ax2");
}

GReportClientOpsActiveX.prototype = Object.create(GReportClientOps.prototype);

GReportClientOpsActiveX.prototype.getInstanceInfo = function () {
    return "GReportClientOpsActiveX: " + this.activeX.GetVersion();
};

GReportClientOpsActiveX.prototype.getReportToModifications = function (url, sessionName) {

    console.log("GReportClientOpsActiveX.getReportToModifications()", url, sessionName);

    var clientOps = this;
    var xhr = new XMLHttpRequest(); //new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var fileName = clientOps._getFileNameFromReqHeader(xhr.getResponseHeader("Content-Disposition"));
            console.log("getReportToModifications", fileName, sessionName);
            var filePath = clientOps.activeX.file_saveTempB(fileName, xhr.responseBody); //NOTE: Vyzaduje nacteni z xhr.responseBody, i kdyz konzole vzdy ukaze undefined!!!
            clientOps._showFile(filePath, sessionName);
            //if (clientOps._isFileModificationsAllowed(fileName)) {
            //    //try {
            //    clientOps.activeX.shell_open(localFilePath);
            //    //debugger;
            //    //try{
            //    //    var file = clientOps.activeX.file_loadB(localFilePath);
            //    //}
            //    //catch (e) {
            //    //    debugger;
            //    //    if (e.message)
            //    //        console.log(e.message);
            //    //    console.log(e);
            //    //}
                
            //        //clientOps.getLocalFile(localFilePath);
            //        //clientOps.activeX.shell_print(localFilePath); //Rovnou posle na tiskarnu
            //        //var ret = clientOps.activeX.shell_detect(localFilePath); //Pouze detekuje shell???
            //        //console.log("Editation complete", ret);
            //    //}
            //    //catch (e) {
            //    //    if (e.message && e.message.indexOf("Aplikace pro zobraz") >= 0)
            //    //        return;
            //    //    //TODO: Show error dlg 
            //    //}
            //}
        }
    }

    var paramString = "sessionName=" + sessionName;
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-length", paramString.length);
    xhr.send(paramString);
};

GReportClientOpsActiveX.prototype._showFile = function (filePath, sessionName) {
    /// <summary>Zobrazi stazeny soubor. Pokud je soubor editovatelny uzivatelem, spusti timer cekajici na zavreni. Pote soubor uploadne na server.</summary>
    /// <param name='filePath' type='string'>Cesta a nazev souboru</param>
    /// <param name='sessionName' type='string'>Nazev session obs. taskinfo (info o reportu)</param>
    if (this._isFileModificationsAllowed(filePath)) 
        this._waitForOpenFile(filePath, sessionName);

    try {
        this.activeX.shell_open(filePath);
    }
    catch (e) {
        if (e.message && e.message.indexOf("Aplikace pro zobraz") >= 0) {
            //TODO: Err dialog + localization
            GDlg.alert(e.message);
        }
    }
};

GReportClientOpsActiveX.prototype._uploadFile = function (filePath, sessionName) {
    /// <summary>Uploadne soubor na server (v base64 stringu)</summary>
    /// <param name='filePath' type='string'>Cesta a nazev souboru</param>
    /// <param name='sessionName' type='string'>Nazev session obs. taskinfo (info o reportu)</param>
    console.log("GReportClientOpsActiveX._uploadFile ", filePath, sessionName);
    var fileName = this._getFileName(filePath);
    var file = this.activeX.file_loadS(filePath); //NOTE: Pri otevrenem souboru (napr. ve wordu) vyhodi vyjimku
    var xhr = new XMLHttpRequest();
    xhr.open("POST",
        (window.Gordic_General_WebApplication_AppPath 
            ? window.Gordic_General_WebApplication_AppPath + "Gin/Reporter/SinglePage/Ws/GReports.asmx/UploadReport?ssName=" + sessionName
            : "Gin/Reporter/SinglePage/Ws/GReports.asmx/UploadReport?ssName=" + sessionName),
        true);
    xhr.setRequestHeader("Content-Disposition", "attachment; filename='" + fileName + "'");
    xhr.setRequestHeader("Content-Transfer-Encoding", "base64");
    xhr.setRequestHeader("X-Content-Transfer-Encoding", "base64");
    xhr.send(file);
};

GReportClientOpsActiveX.prototype._waitForOpenFile = function (filePath, sessionName) {
    /// <summary>Ceka na zavreni souboru (periodickou kontrolou)</summary>
    /// <param name='filePath' type='string'>Cesta a nazev souboru</param>
    /// <param name='sessionName' type='string'>Nazev session obs. taskinfo (info o reportu)</param>
    var clientOps = this;

    if(!this._isWaitDialogOpen())
        this._createWaitDialog();
    this._waitTimer = setTimeout(function () {
        try {
            clientOps._uploadFile(filePath, sessionName);
            clientOps._destroyWaitDialog();
            console.log("GReportClientOpsActiveX._waitForOpenFile file uploaded");
        }
        catch (e) {
            console.log("GReportClientOpsActiveX._waitForOpenFile exception", e);
            clientOps._waitForOpenFile(filePath, sessionName);
        }
    }, 3000);
};

//#endregion


//#region Java

function GReportClientOpsJava() {
    /// <summary></summary>
    console.log("Creating instance GReportClientOpsJava");
    $.getScript("http://www.java.com/js/deployJava.js")
    .done(function () {
        console.log("java loaded");
        console.log(deployJava.getJREs());  //nefungujeee
    });
}

GReportClientOpsJava.prototype = Object.create(GReportClientOps.prototype);

GReportClientOpsJava.prototype.getInstanceInfo = function () {
    return "GReportClientOpsJava: " + deployJava.getJREs();
};
//#endregion

//#region NoPlugin

function GReportClientOpsNoPlugin() {
    /// <summary>Pripad bez pouziti pluginu</summary>
    console.log("Creating instance GReportClientOpsNoPlugin");
}

GReportClientOpsNoPlugin.prototype = Object.create(GReportClientOps.prototype);

GReportClientOpsNoPlugin.prototype.getInstanceInfo = function () {
    return "GReportClientOpsNoPlugin v. 1";
};

GReportClientOpsNoPlugin.prototype.getReportToModifications = function (url, sessionName) {
    /// <summary>Nabidne soubor ke stazeni</summary>
    window.location = url + "?sessionName=" + sessionName;
};

//#endregion