declare namespace Gordic.Smz.WebApp {
    class SmzAdminPrehledMobilnichZarizeni extends GContentBase {
        private grid;
        private sidebarCntGrid;
        onContentReady(): void;
        private init;
        private createActions;
        private createBreadcrumbs;
        private createMenubar;
        private createContextMenu;
        private createGrid;
        private createGridFormat;
        private setDataToGrid;
        private createSidebar;
        private createAplikaceUzivateleColumns;
        private getAplikaceUzivatele;
        private povolitZarizeni;
        private zakazatZarizeni;
        private smazatZarizeni;
    }
}
declare namespace Gordic.Smz.WebApp {
    class SmzChangePasswordExt extends GContentBase {
        private login;
        private ext_system;
        private srv;
        getSrv(): GContent;
        onContentReady(): void;
        private init;
        private createForm;
        private createActions;
        private createCommandBar;
        private saveNewPassword;
    }
}
declare namespace Gordic.Smz.WebApp {
    class SmzPrehledMobilnichZarizeni extends GContentBase {
        private previewController;
        private grid;
        private qrCodeElement;
        private changePasswordEnable;
        private allowAdminDevices;
        onContentReady(): void;
        private init;
        private createActions;
        private createBreadcrumbs;
        private createMenubar;
        private createContextBar;
        private setDataToGrid;
        private createGrid;
        private createGridFormat;
        private povolitZarizeni;
        private zakazatZarizeni;
        private uploadCerifikatDialog;
        private openDialogQrCode;
        private openChangePasswordExtUser;
        private openAdminMobileDevices;
    }
}
declare namespace Gordic.Smz.WebApp {
    class SmzQrCodeDialog extends GContentBase {
        private qrCodeElement;
        prepareContent(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createQrCode;
    }
}
declare namespace Gordic.Smz.WebApp {
    class SmzUploadCertifikat extends GContentBase {
        private formElement;
        private srv;
        private ixs_moz;
        private unique_id;
        private fileGuids;
        private getSrv;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createActions;
        private createCommandBar;
        private showFlashInfo;
        private createForm;
        private getDataFromForm;
        private deleteTmpFiles;
    }
}
declare namespace Gordic.Smz.WebApp.DetailForms {
    function FormSmzZarizeni(): Gordic.Forms.Form;
}
