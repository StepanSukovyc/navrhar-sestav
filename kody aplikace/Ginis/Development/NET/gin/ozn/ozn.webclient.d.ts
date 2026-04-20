declare namespace Gordic.Ozn.WebClient.Base {
    function CreateGridReaded(): JQuery<HTMLElement>;
}
declare namespace Gordic.Ozn.WebClient.Utils {
    function InitAsyncTask(): any;
    function StartAsyncTask(): void;
    function CheckReaded(): void;
    /** Zobrazení Trvalých zpráv pouze 1x při startu modulu */
    function ShowStartingMessages(): void;
    function createNotification(message: any): void;
}
declare namespace Gordic.Ozn.WebClient {
    class GMessageDetail extends GContentBase {
        private message;
        private file;
        private fileBase64;
        private srv;
        confirmAct(): void;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createHeader;
        private createForm;
        private createFormElement;
        private createPreview;
        private createLogo;
        private getMessageType;
    }
}
declare namespace Gordic.Ozn.WebClient {
    class GMessageDetailAdm extends GContentBase {
        private message;
        private kpis;
        private currentFilter;
        private edit;
        private isNew;
        private file;
        private newMessage;
        private gridRC;
        private gridReaded;
        private povolEditNew;
        private faze;
        /** Předchozí fáze, pro možnost vrácení původní fáze před zaškrtnutím Všechny fáze */
        private prevFaze;
        private srv;
        ulozitZaznamMain(): void;
        closing(): JQuery.Deferred<any, any, any>;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private testDatumDo;
        private nextAndPreviousAction;
        private init;
        private createKpis;
        private createStatusBar;
        private actActiveFileds;
        private loadData;
        private reloadData;
        private saveData;
        private upsertMessage;
        private updateMaingrid;
        private testUpdate;
        private createForm;
        private createSpecialValidator;
        private createReadedTab;
        private setDataToGridReaded;
        private removeMessage;
        private endValidity;
        private archivMessage;
        private copyFromThis;
        private navigateCnt;
    }
}
declare namespace Gordic.Ozn.WebClient {
    class GMessageList extends GContentBase {
        private grid;
        private filterPanel;
        private currentFilter;
        private povolEditNew;
        private faze;
        onContentReady(): void;
        private init;
        private initCnt;
        private createActions;
        private createMenubar;
        private openDetail;
        private createNew;
        private setDataToGrid;
        private createGrid;
        private createColumns;
        private createDefaultData;
        private createFilterpanel;
        private createFilterForm;
        private removeMessages;
        private endValidity;
        private archiveMessages;
        private copyToNew;
    }
}
declare namespace Gordic.Ozn.WebClient {
    class GMessageResultHromadnaOperace extends GContentBase {
        private data;
        onContentReady(): void;
        private init;
        private updateData;
        private createGrid;
        private createGridFormat;
    }
}
