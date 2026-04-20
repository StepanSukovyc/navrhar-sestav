declare namespace Gordic.Dks.WebControls {
    /**
     * DKS - online konverzní služba
     */
    class GDksConvertService extends GContentBase<any> {
        private utils;
        private view;
        private gfile;
        onContentReady(): void;
        private init;
        private createForm;
        private createMenubar;
        closing(): boolean;
        private removeInputFileOnClosing;
        private removeResultFileOnClosing;
        private removeFiles;
        /**
          * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
          *
          * @param {JQuery<HTMLElement>} form předaný element formuláře
          * @returns {JQueryPromise<boolean>} výsledek stavu
          */
        private waitForValues;
        private convert;
        private createGrid;
        private downloadMulti;
        private setFormatGrid;
    }
}
declare namespace Gordic.Dks.WebControls {
    class GDksSignatureVerification extends GContentBase<any> {
        private utils;
        private signatureResult;
        private view;
        private asyncTaskName;
        private overitUtils;
        onContentReady(): void;
        private init;
        private createForm;
        private loadSignatureVerification;
        private createMenubar;
        private run;
        private Dto;
        private _run;
        private createMainTree;
        private createGrid;
        createContextMenu(): MenuParams[];
        private addActionOveritPodpisDetail;
    }
}
declare namespace Gordic.Dks.WebControls {
    /** typ dialogu DKS05 */
    enum GDksDialogTypeEnum {
        konverze = 1,
        validacePdfa = 2,
        overeniPodpisu = 3
    }
    class GDksUtils {
        /** vrať sloupce na prohledávání */
        getSearchColumns(format: Gordic.Data.GridFormat): string[];
        createFileForm(element: JQuery<HTMLElement>, type: GDksDialogTypeEnum, multi: boolean, fileRemoved?: (ev: any, obj: any) => void, fileUploaded?: (ev: any, obj: any) => void): void;
    }
}
declare namespace Gordic.Dks.WebControls {
    /**
     * DKS - validace PDF/A
     */
    class GDksValidatePdfa extends GContentBase<any> {
        private fileInfo;
        private utils;
        private view;
        onContentReady(): void;
        private init;
        private createForm;
        private createMenubar;
        private runValidation;
        private setGroupingProcessor;
        private createGrid;
        private setFormatGrid;
    }
}
