declare namespace Gordic.Adx.WebClient {
    class GMainApp extends GContentBase {
    }
}
declare namespace Gordic.Adx.WebClient {
    class Dashboard extends GContentBase {
        private NazevRef;
        private NazevFun;
        private DatLoginTxt;
        onContentReady(): void;
        private createActions;
        private loadModuleInfo;
    }
}
declare namespace Gordic.Adx.WebClient {
    class GAdxTaskList extends GContentBase {
        isAuthService: boolean;
        onContentReady(): void;
    }
}
declare namespace Gordic.Adx.WebClient.Utils {
    class GResultGpcObject {
        value: string;
        caption: string;
        valueTitle: string;
        captionTitle: string;
    }
    function ContentReadyAdx(ev: any): void;
    function GetGPC(/*faze*/ sharedContext: any): any;
    function createInfoFlash(currentCnt: GContent, contextName: string): void;
    function removeContextGpc(contextName: any): void;
}
