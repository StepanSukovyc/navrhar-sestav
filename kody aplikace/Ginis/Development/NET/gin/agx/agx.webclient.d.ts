declare namespace Gordic.Agx.WebClient {
    class GDataBoxDetail extends GContentBase {
        private model;
        private isNew;
        private isEditmode;
        private gridRc;
        private gridOpravneneOsoby;
        private gridPovoleniAdresati;
        private opraveneOsoby;
        private povoleniAdresati;
        private currentOwner;
        private opravnenaosobaTmp;
        private souvisejiciOsoby;
        private previewController;
        onContentReady(): void;
        saveAndCloseDatabox(closeAct: boolean): void;
        private addOwnerToOpravnenaOsoba;
        closeDataboxDetail(): void;
        private init;
        closing(): JQuery.Deferred<any, any, any>;
        private cancelEdit;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createActions;
        private createMenuBar;
        private createForm;
        private enabledFields;
        private updateMainGrid;
        private previousAndNextAction;
        private createTabGroups;
        private createTabs;
        private createGridOpravneneOsoby;
        private createGridFormatOpravneneOsoby;
        private loadOpravneneOsoby;
        private addOpravneneOsoby;
        private removeOpravnenaOsoba;
        private createSpecialValidator;
        private openDetailOpravnenaOsoba;
        private createGridPovoleniAdresati;
        private createGridFormatPovoleniAdresati;
        private loadPovoleniAdresati;
        private addPovolenyAdresat;
        private createDataboxSelectForm;
        private removePovolenyAdresat;
    }
}
declare namespace Gordic.Agx.WebClient {
    class GDataBoxUserDetail extends GContentBase {
        private model;
        private isNew;
        private isEditmode;
        private gridRc;
        closeDataboxUser(): void;
        saveDataboxUser(closeAct: boolean): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        private init;
        closing(): JQuery.Deferred<any, any, any>;
        private cancelEdit;
        private enabledFields;
        private createActions;
        private createMenuBar;
        private createHeaderForm;
        private updateMainGrid;
        private checkExistUser;
        private previousAndNextAction;
    }
}
declare namespace Gordic.Agx.WebClient {
    class GOpravnenaOsobaDetail extends GContentBase {
        private databox;
        private model;
        private gridRc;
        private isNew;
        private isEditMode;
        saveAndClosePrivil(close: boolean): void;
        closePrivilDetail(): void;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        closing(): JQuery.Deferred<any, any, any>;
        private init;
        private updateMainGrid;
        private enableFields;
        private createActions;
        private createMenubar;
        private createStatusBar;
        private createHeaderForm;
        private notificationSuccess;
        private cancelEdit;
        private previousAndNextAction;
    }
}
declare namespace Gordic.Agx.WebClient {
    class GDataBoxList extends GContentBase {
        private grid;
        private currentFilter;
        private dbTypes;
        private dbStates;
        onContentReady(): void;
        private init;
        private initContent;
        private createActions;
        private createMenuBar;
        private createFilterForm;
        private createGrid;
        private createGridFormat;
        private loadData;
        private openDetail;
    }
}
declare namespace Gordic.Agx.WebClient {
    class GDataBoxUserList extends GContentBase {
        private grid;
        private previewController;
        onContentReady(): void;
        private init;
        private createGrid;
        private createSidebar;
        private setDataToGrid;
        private createGridFormat;
        private createActions;
        private createMenubar;
        private initContent;
        private openDetail;
    }
}
declare namespace Gordic.Agx.WebClient.Forms {
    function CreateAgxUserPreviewForm(): Gordic.Forms.Form;
}
