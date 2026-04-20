declare namespace Gordic.Ado.WebControls {
    class GDetailMetodicky extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailMetodickyObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ado.Interface.GAdoMetodickyDto> {
        private adxCheckIcoNad;
        private admRpEdiextid;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        private CheckDates;
        saveData(data: Gordic.Ado.Interface.GAdoMetodickyDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ado.WebControls {
    class GDetailOkec extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailOkecObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ado.Interface.GOkecDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Ado.Interface.GAdoMetodickyDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ado.WebControls {
    class GDetailRegistrOrganizaci extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailRegistrOrganizaciObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ado.Interface.GAdoRegirstOrganizaciDto> {
        private adxCheckIcoNad;
        private admRpEdiextid;
        private RozsirenyProfilForm;
        private RozsirenyProfilArisForm;
        private isEsuPovin;
        private isPovolZmenaOrgnum;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Ado.Interface.GAdoRegirstOrganizaciDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        createDuvodForm(): Gordic.Forms.Form;
        saveDataInternal(data: Gordic.Ado.Interface.GAdoRegirstOrganizaciDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createRozsirenyProfilTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createRozsirenyProfilAris(): Gordic.Gin.DetailBuilder.TabParamsId;
        createSeznamMetodickyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createSeznamMetodickyHistoryTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createRozsirenyProfilGroup(): IGTabGroupOptions;
        createRozsirenyProfilArisGroup(): IGTabGroupOptions;
        createSeznamMailCertOrganizaceGroup(): IGTabGroupOptions;
        createSeznamMetodickyGroup(): IGTabGroupOptions;
        createSeznamMetodickyHistoryGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Ado.WebControls {
    class GDetailZuje extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailZujeObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ado.Interface.GZujeDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Ado.Interface.GAdoMetodickyDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ado.WebControls {
    class GSeznamMailCertOrganizaceObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixs: string;
        selectionGridAct(obj: IGGridSelection<any>): void;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
    class GSeznamMailCertOrganizace extends GContentBase<GSeznamMailCertOrganizaceObj> {
        private seznamObj;
        onContentReady(): void;
    }
}
declare namespace Gordic.Ado.WebControls {
    class GSeznamMetodickyObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixs_rar: string;
        selectionGridAct(obj: IGGridSelection<any>): void;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
    class GSeznamMetodicky extends GContentBase<GSeznamMetodickyObj> {
        private seznamObj;
        onContentReady(): void;
    }
}
declare namespace Gordic.Ado.WebControls {
    class GSeznamMetodickyHistoryObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixs_rar: string;
        selectionGridAct(obj: IGGridSelection<any>): void;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
    class GSeznamMetodickyHistory extends GContentBase<GSeznamMetodickyHistoryObj> {
        private seznamObj;
        onContentReady(): void;
    }
}
declare namespace Gordic.Ado.WebControls {
    class GSeznamOkecObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        selectionGridAct(obj: IGGridSelection<any>): void;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
    class GSeznamOkec extends GContentBase<GSeznamOkecObj> {
        private seznamObj;
        onContentReady(): void;
    }
}
declare namespace Gordic.Ado.WebControls {
    class GSeznamRegistrOrganizaciObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        selectionGridAct(obj: IGGridSelection<any>): void;
        create(): void;
        private getServiceCnt;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFileForm(): Gordic.Forms.Form;
        GenerateFile(): void;
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
    class GSeznamRegistrOrganizaci extends GContentBase<GSeznamRegistrOrganizaciObj> {
        private seznamObj;
        private isPovolDbFilter;
        onContentReady(): void;
    }
}
declare namespace Gordic.Ado.WebControls {
    class GSeznamZujeObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        selectionGridAct(obj: IGGridSelection<any>): void;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
    class GSeznamZuje extends GContentBase<GSeznamZujeObj> {
        private seznamObj;
        onContentReady(): void;
    }
}
