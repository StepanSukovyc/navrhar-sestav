namespace Gordic.Spr.Globals.ListSupport {

    export function EleColumn(): GGridColumn<any> {  // Prevzato z GWflGlobals.ts
        return {
            name: "el_bitmap",
            caption: " ",
            description: "jres:25200019", //RC 25200019 : Obrázek elektronického dokumentu
            width: 40,
            customClass: "center",
            fixedWidth: true,
            iconTemplate: function (row: any) {
                switch (row["el_bitmap"]) {
                    case 4: return { icon: "gi-edoc", tooltip: "jres:25200038" }; // ElektronickyObraz //RC 25200038 : Elektronický obraz
                    case 5: return { icon: ["gi-edoc g-iconColumn-middle gi-stack-fw", "gi-sign g-state-text g-state-important gi-stack-fw gi-stack-pos--rb"], tooltip: "jres:25200039" }; // ElektronickyObrazPodepsany //RC 25200039 : Elektronický obraz podepsaný
                    //case 6: return { icon: ["gi-edoc  g-iconColumn-middle gi-stack-fw", "gi-sign g-state-text g-state-important gi-stack-fw gi-stack-pos--rb", "gi-stamp g-state-text g-state-info gi-stack-fw gi-stack-pos--rt"], tooltip: "jres:31926039" }; // ElektronickyObrazPodepsanySCasovymRazitkem //RC 31926039 : Elektronický obraz podepsaný s časovým razítkem
                    //case 7: return { icon: "gi-edoc", tooltip: "jres:31926040" }; // ElektronickyObrazSFyzickouPodobou //RC 31926040 : Elektronický obraz s fyzickou podobou
                    //case 8: return { icon: ["gi-edoc", "gi-sign g-state-text g-state-important"], tooltip: "jres:31926041" }; // ElektronickyObrazSFyzickouPodobouPodepsany //RC 31926041 : Elektronický obraz s fyzickou podobou podepsaný
                    //case 9: return { icon: ["gi-edoc", "gi-sign g-state-text g-state-important", "gi-stamp g-state-text g-state-info gi-stack-pos--rt"], tooltip: "jres:31926042" }; // ElektronickyObrazSFyzickouPodobouPodepsanySCasovymRazitkem //RC 31926042 : Elektronický obraz s fyzickou podobou podepsaný s časovým razítkem
                    default: return null;
                }
            }
        }
    }

    export function GetIconTerminVyrizeniSPR(row: any): IconTemplate | undefined | null { // Prevzato z GWflGlobals.ts
        switch (row["Img_vyr"]) {
            case 1: return { icon: "gi-time", tooltip: "jres:25200040" }; // TesnePredTerminem //RC 25200040 : Těsně před termínem
            case 2: return { icon: "gi-time g-state-text g-state-error", tooltip: "jres:25200041" }; // PoTerminu //RC 25200041 : Po termínu
            default: return null;
        }
    }

    export function ImgVyrColumn(): GGridColumn < any > { // Prevzato z GWflGlobals.ts
        return {
            name: "Img_vyr",
            caption: " ",
            description: "jres:25200020", //RC 25200020 : Obrázek vyr. dokumentu
            width: 40,
            customClass: "center",
            fixedWidth: true,
            iconTemplate: function (row: any) {
                return GetIconTerminVyrizeniSPR(row);
                //if (row.stav_pis == 10 && row.Img_vyr !== undefined) { //nevyrizeno
                //    return Gordic.Wfl.Globals.ListSupport.GetIconTerminVyrizeni(row);
                //} else {
                //    return Gordic.Wfl.Globals.ListSupport.GetIconStavDok(row);
                //}
            }
        }
    }

    export function TypDokumentuColumn(): GGridColumn < any > { // Prevzato z GWflGlobals.ts
        /// <summary> ikona gridu pro typ dokumentu </summary>
        return {
            name: "Spis_dok",
            caption: "",
            //caption: "D/S",
            description: "jres:25200018", //RC 25200018 : Obrázek typu dokumentu
            width: 40,
            customClass: "center",
            fixedWidth: true,
            iconTemplate: function (row: any) {
                // obslouzit cely PisemnostBitmap nemam sanci, tak alespon par nejdulezitejsich
                switch (row["doctype_bitmap"]) {
                    case 0: return null;
                    case 1: return { icon: "gi-paper  g-state-text g-state-info", tooltip: "jres:25200043" }; // AgendovaPisemnost //RC 25200043 : Dokument z cizí agendy
                    case 2: return { icon: "gi-paper", tooltip: "jres:25200044" }; // WorkflowPisemnost //RC 25200044 : Dokument
                    case 3: return { icon: ["gi-paper"/*, "gi-mail-open g-state-text g-state-info"*/], tooltip: "jres:25200045" }; // WorkflowCiziPisemnost //RC 25200045 : Cizí (doručený) dokument
                    case 4: return { icon: "gi-edoc", tooltip: "jres:25200046" }; // ElektronickyObraz //RC 25200046 : El. dokument
                    case 5: return { icon: "gi-edoc", tooltip: "jres:25200047" }; // ElektronickyObrazPodepsany //RC 25200047 : El. dokument - podepsaný
                    //case 6: return { icon: "gi-edoc", tooltip: "jres:31926045" }; // ElektronickyObrazPodepsanySCasovymRazitkem //RC 31926045 : El. dokument - podepsaný s čas. razítkem
                    //case 7: return { icon: "gi-edoc", tooltip: "jres:31926046" }; // ElektronickyObrazSFyzickouPodobou //RC 31926046 : El. dokument s fyz. podobou
                    //case 8: return { icon: "gi-edoc", tooltip: "jres:31926047" }; // ElektronickyObrazSFyzickouPodobouPodepsany //RC 31926047 : El. dokument s fyz. podobou - podepsaný
                    //case 9: return { icon: "gi-edoc", tooltip: "jres:31926048" }; // ElektronickyObrazSFyzickouPodobouPodepsanySCasovymRazitkem //RC 31926048 : El. dokument s fyz. podobou - podepsaný s čas. razítkem
                    ////  case 10: return { icon: ["gi-paper", "gi-folder g-state-text g-state-info"] }; // PisemnostVSpisu
                    case 10: return { icon: "gi-doc-in-folder", tooltip: "jres:25200048" }; // PisemnostVSpisu //RC 25200048 : Dokument vložený do spisu
                    case 11: return { icon: "gi-folder", tooltip: "jres:25200049" }; // Spis //RC 25200049 : Spis
                    //case 12: return { icon: "gi-folder", tooltip: "jres:31926049" }; // SpisAnalogovy //RC 31926049 : Analogový spis
                    //case 13: return { icon: "gi-folder", tooltip: "jres:31926050" }; // SpisElektronicky //RC 31926050 : Digitální spis
                    //case 14: return { icon: "gi-folder", tooltip: "jres:31926051" }; // SpisHybridni //RC 31926051 : Hybridní spis
                    //case 15: return { icon: "gi-paper", tooltip: "jres:31926052" }; // NeevidovanyDokument //RC 31926052 : Dokument neevidovaný
                    //case 16: return { icon: "gi-folder", tooltip: "jres:31926053" }; // NeevidovanySpis //RC 31926053 : Spis neevidovaný
                    //case 17: return { icon: ["gi-paper", "gi-ds g-state-text g-state-warning"], tooltip: "jres:31926054" }; // CiziPisemnostDatovaZprava //RC 31926054 : Cizí (doručený) el. dokument z datové schránky
                    //case 18: return { icon: ["gi-paper", "gi-mail-open g-state-text g-state-info"], tooltip: "jres:31926055" }; // CiziPisemnostEMail //RC 31926055 : Cizí (doručený) dokument přijatý e-podatelnou
                    //case 19: return { icon: ["gi-paper", "gi-mail-open g-state-text g-state-info"], tooltip: "jres:31926056" }; // CiziPisemnostInterface //RC 31926056 : Cizí (doručený) dokument přijatý přes interface a XRG
                    //case 20: return { icon: "gi-doc-in-folder", tooltip: "jres:31926059" }; // CiziDokumentVeSpisu //RC 31926059 : Cizí (doručený) dokument vložený ve spisu
                    //case 21: return { icon: ["gi-paper", "gi-ds g-state-text g-state-warning"], tooltip: "jres:31926057" }; // CiziPisemnostDatovaZpravaSFyzickym //RC 31926057 : Cizí (doručený) dokument z datové schránky
                    //case 22: return { icon: ["gi-paper", "gi-mail-open g-state-text g-state-info"], tooltip: "jres:31926055" }; // CiziPisemnostEMailSFyzickym //RC 31926055 : Cizí (doručený) dokument přijatý e-podatelnou
                    //case 23: return { icon: ["gi-paper", "gi-mail-open g-state-text g-state-info"], tooltip: "jres:31926056" }; // CiziPisemnostInterfaceSFyzickym //RC 31926056 : Cizí (doručený) dokument přijatý přes interface a XRG
                    //case 24: return { icon: ["gi-paper", "gi-mail-open g-state-text g-state-info"], tooltip: "jres:31926058" }; // CiziAgendovaPisemnost //RC 31926058 : Cizí (doručený) dokument z cizí agendy
                    //case 25: return { icon: "gi-question ", tooltip: "jres:31926060" }; // TypovySpis //RC 31926060 : Typový spis
                    //case 26: return { icon: "gi-question ", tooltip: "jres:31926061" }; // TypovySpisAnalogovy //RC 31926061 : Typový spis analogový
                    //case 27: return { icon: "gi-question ", tooltip: "jres:31926062" }; // TypovySpisElektronicky //RC 31926062 : Typový spis digitální
                    //case 28: return { icon: "gi-question ", tooltip: "jres:31926063" }; // TypovySpisHybridni //RC 31926063 : Typový spis hybridní
                    //case 29: return { icon: "gi-question ", tooltip: "jres:31926064" }; // Soucast //RC 31926064 : Součást
                    //case 30: return { icon: "gi-question ", tooltip: "jres:31926065" }; // Dil //RC 31926065 : Díl
                    //case 31: return { icon: "gi-question ", tooltip: "jres:31926066" }; // SoucastVTypovemSpisu //RC 31926066 : Součást vložená v typovém spisu
                    //case 32: return { icon: "gi-question ", tooltip: "jres:31926067" }; // DilVSoucasti //RC 31926067 : Díl vložený v součásti
                    //case 33: return { icon: ["gi-edoc", "gi-stamp g-state-text g-state-info"], tooltip: "jres:31926068" }; // ElektronickyObrazSCasovymRazitkem //RC 31926068 : El. dokument - s čas. razítkem
                    //case 34: return { icon: ["gi-edoc", "gi-stamp g-state-text g-state-info"], tooltip: "jres:31926069" }; // ElektronickyObrazSFyzickouPodobouSCasovymRazitkem //RC 31926069 : El. dokument s fyz. podobou - s čas. razítkem
                    case 500: return { icon: "<img src='./Seznamy/Images/tre_SpisSpr.gif'>", tooltip: "jres:25200042" }; //RC 25200042 : Správní řízení
                    default: return null;
                }
            }
        }
    }

    export function ImgVyrizujiciColumn(): GGridColumn<any> {
        return {
            name: "Img_vyrizujici",
            caption: " ",
            width: 50,
            customClass: "center",
            fixedWidth: true,
            iconTemplate: function (row: any) {
                if (row["s_vyriz"] == 1) {
                    return { icon: "gi-folder_bold g-state-text g-state-favorite|gi-tick g-state-text g-state-info gi-stack-pos--", tooltip: "jres:25200227" }; //RC 25200227 : Vyřizující úkon
                }
                else
                    return { icon: "gin/nic" };
            } 
        }
    }



}