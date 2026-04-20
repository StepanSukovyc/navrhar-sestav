var GAnonymize = (function () {
    /**
      * Anonymizer se musi nachazet na "c:\\Program Files (x86)\\GORDIC\\GINIS\\ANM01\\", popripade zmenit path ve funkci anonymize
     */
    "use strict"

    function GAnonymize() {

    }

    var NepodariloSeOtevritElDokErrText = 'jres:Gordic.Wfl.WebClient:26225769'; // <resource value=26225769>Nepodařilo se otevřít elektronický dokument.</resource>
    var NepodariloSeZjistitInfoElObrazErrText = 'jres:Gordic.Wfl.WebClient:26226267'; //RC 26226267 : Nepodařilo se zjistit informace o el. obrazu.
    var NepodariloSeNacteniCestyKAnonymizeruText = 'jres:Gordic.Wfl.WebClient:31850001'; //RC 31850001 : Nebyla nalezena platná cesta k anonymizeru.
    var ProcessedIdentification = "";
    var WflEleFolderUrl = "";
    var UserContext = null;
    var IsAnonymized = null;
    var InputFile = "";
    var FileName = "";
    var isElObraz = true;
    var WflEleFolderUrl = "";
    var OnComplete = null;
    GAnonymize.prototype.setUrlAddr = function () {
        if (window.GinUrl) {
            WflEleFolderUrl = GinUrl + "Wfl/ElObrazPrilohy/";
        } else {
            var l_sHref = window.location.href;
            var l_nIndex = l_sHref.lastIndexOf("/");
            var l_sAppUrl = l_sHref.substring(0, l_nIndex);

            WflEleFolderUrl = l_sAppUrl + "/Gin/Wfl/ElObrazPrilohy/";
        }
    }

    GAnonymize.prototype.anonymizePriloha = function (IdRadku, onComplete) {
        this.setUrlAddr();

        if (onComplete) {
            OnComplete = onComplete;
        }
        isElObraz = false;
        ProcessedIdentification = IdRadku;

        try {
            var l_oJSONPars = { "IdRadku": IdRadku };
            callAsync("~/Gin/Wfl/WS/WSOperationWfl.asmx/PrilohaFilename", l_oJSONPars, __PrilohaFileNameOnSucceeded, __PrilohaFileNameFailed, this);
        } catch (vyj1) {
            window.alert(NepodariloSeOtevritElDokErrText);
        }

        //var aUrl = WflEleFolderUrl + "WSZobrazeniElektronickePrilohy.aspx?IdRadku=" + IdRadku + "&Priloha=a&AnmCheck=1";

        //ax_file_saveFromASPXWS(aUrl, __DownloadElObrazOnSucceeded, __DownloadElObrazOnFailed, false, false, this);
    }

    GAnonymize.prototype.anonymizeElObraz = function (Ixp, KonvertovatDoPDF, onComplete) {
        /// <summary>Anonymizuje dokument - el. obraz i prilohy</summary>
        /// <param name="Ixp" type="string">ixp dokumentu</param>
        /// <param name="KonvertovatDoPDF" type="bool">nePdf soubory pred podpisem zkonvertuje do PDF</param>
        /// <param name="IsHromadnaAkce" type="bool">priznak, zda se jedna o hromadnou akci nad vice dokumenty</param>
        /// <param name="onComplete" type="function">callBack funkce vyvolana po provedeni. V argumentech ma anonymni tridu s vlastnostmi retVal a errorText.</param>
        this.setUrlAddr();

        if (onComplete) {
            OnComplete = onComplete;
        }
        isElObraz = true;
        IsAnonymized = { state: "init" };
        // nastavim informace o zpracovavanem zaznamu
        ProcessedIdentification = Ixp;
        //ProcessedIxb = "";

        try {
            var l_oJSONPars = { "Ixp": Ixp, "KonvertovatDoPDF": KonvertovatDoPDF };
            callAsync("~/Gin/Wfl/WS/WSOperationWfl.asmx/ElObrazFilename", l_oJSONPars, __ElObrazFileNameOnSucceeded, __ElObrazFileNameFailed, this);
        } catch (vyj1) {
            window.alert(NepodariloSeOtevritElDokErrText);
        }
    }

    var __PrilohaFileNameOnSucceeded = function (result, userContext, methodName) {
        var _this = userContext;
        var IdRadku = ProcessedIdentification;
        FileName = result;

        var aUrl = WflEleFolderUrl + "WSZobrazeniElektronickePrilohy.aspx?IdRadku=" + IdRadku + "&Priloha=a&AnmCheck=1";

        ax_file_saveFromASPXWS(aUrl, __DownloadElObrazOnSucceeded, __DownloadElObrazOnFailed, false, false, _this);

    };
    var __PrilohaFileNameFailed = function (error, userContext) {
        var _this = userContext;
        __PotvrzeniPokracovani(NepodariloSeZjistitInfoElObrazErrText);
    };

    var __ElObrazFileNameOnSucceeded = function (result, userContext, methodName) {
        var _this = userContext;
        var l_sIxp = ProcessedIdentification;
        FileName = result;

        try {
            var aUrl = WflEleFolderUrl + "WSZobrazeniElektronickePrilohy.aspx?Ixp=" + l_sIxp + "&Obraz=a&AnmCheck=1";

            ax_file_saveFromASPXWS(aUrl, __DownloadElObrazOnSucceeded, __DownloadElObrazOnFailed, false, false, _this);
        } catch (vyj1) {
            __PotvrzeniPokracovani(NepodariloSeOtevritElDokErrText);
        }

    };
    var __ElObrazFileNameFailed = function (error, userContext) {
        var _this = userContext;
        __PotvrzeniPokracovani(NepodariloSeZjistitInfoElObrazErrText);
    };

    var __AnonymizerPathOnFailed = function (error, userContext) {
        __PotvrzeniPokracovani(NepodariloSeNacteniCestyKAnonymizeruText);
    }

    var __PotvrzeniPokracovani = function (ErrMessage) {
        if (window.confirm(ErrMessage)) {
            //__ProcessExitScript();
        }

    };


    var __DownloadElObrazOnSucceeded = function (result, userContext, methodName) {
        try {
            callAsync("~/Gin/Wfl/WS/WSOperationWfl.asmx/GetAnonymizerPath", {}, __AnonymizerPathOnSucceeded, __AnonymizerPathOnFailed, userContext);
            InputFile = result;
        } catch (exc1) {
            alert(exc1);
        } finally {

        }
    };
    var __AnonymizerPathOnSucceeded = function (result, userContext, methodName) {
        // anonymizace souboru
        userContext.anonymize(InputFile, result, __AnonymizeElObrazOnComplete, userContext);
    }
    var __DownloadElObrazOnFailed = function (error, userContext) {
        var _this = userContext;
        __PotvrzeniPokracovani(NepodariloSeOtevritElDokErrText);
    };



    GAnonymize.prototype.anonymize = function (inputPath, anonymizerPath, onAnonymizeComplete, userContext) {
        /**
         * Funkce anonymizuje soubor
         */
        if (anonymizerPath) {
            var l_oAX = new ActiveXObject("Gordic.ActiveX.Security");
            var result = l_oAX.Anonymize(anonymizerPath, inputPath);
            if (result) {
                onAnonymizeComplete(inputPath, result, userContext);
            }
            else {
                throw "Neanonymizováno";
            }
        }
        else {
            __AnonymizerPathOnFailed(); 
        }   
         


     }

     var __AnonymizeElObrazOnComplete = function(inputPath, outputPath, userContext) {
         var _this = userContext;
         var l_sId = ProcessedIdentification;
         try {

             // odeslani podpisu do uloziste
             var aUrl = WflEleFolderUrl + "WSUlozeniNoveVerzeDoEleUlo.aspx"
             if (isElObraz)
             {
                 aUrl = aUrl + "?Obraz=a&Ixp=" + l_sId + "&An=1" + "&Nazev=" + FileName.substr(0, FileName.lastIndexOf(".")) + ".pdf";
             }          
             else
             {
                 aUrl = aUrl + "?IdRadku=" + l_sId + "&An=1" + "&Nazev=" + FileName.substr(0, FileName.lastIndexOf(".")) + ".pdf";
             }
             aUrl = encodeURI(aUrl);
             var aStatus = ax_file_uploadToASPXWS(aUrl, outputPath, null, null);

             if (aStatus == 200 || aStatus == 201) { // 200, 201 OK; 502 vyjimka na serverove strane-lze presmerovat na ErrorPage
                 IsAnonymized = { state: "finished" };
             } else {
                 IsAnonymized = { state: "error" };
             }
             OnComplete(IsAnonymized, {output: outputPath});
         } catch (exc1) {
             alert(exc1); //alert(exc1.description);   
         } finally {
             ax_file_deleteTemp(inputPath);
         }
     };
     return GAnonymize;
 })();