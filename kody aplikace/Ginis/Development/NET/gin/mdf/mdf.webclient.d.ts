/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       mdf.webclient.d.ts
*    project     q:\ginis\Development\NET\Gordic.Mdf.WebClient\Gordic.Mdf.WebClient.csproj
*    created     2026-02-16 14:35:11
*    files       GNavrharContent\GNavrharContent.d.ts
*                GWordsSelectorTest\GWordsSelectorTest.d.ts
*                GWordsSelectorTest\GWordsSelectorTest2.d.ts
*                GWordsSelectorTest\GWordsSelectorTest3.d.ts
*                MdfGrid\MdfGrid.d.ts
*                MdfGrid\MdfGridTS.d.ts
*                PohledSave\GPohledSave.d.ts
*                Scripts\Utils.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Mdf.WebClient\GNavrharContent\GNavrharContent.d.ts 

declare namespace Gordic.Mdf.WebClient {
    interface hierarchyDataView {
        name: string;
        dataView: Isl.View<any, Isl.GServiceListRequest, Isl.GServiceListResponse<Mdf.Interface.MemberDto>>;
        nacteno: boolean;
    }
    export class GNavrharContent extends GContent {
        icon: string;
        title: string;
        uid: string;
        $navrharForm: JQuery;
        hierarchies: Mdf.Interface.InputHierarchy[];
        actionList: GActionList;
        currentHierarchy: Mdf.Interface.InputHierarchy;
        hierarchyDataViews: hierarchyDataView[];
        $hierarchyGrid: JQuery;
        $draggedDiv: JQuery;
        draggedHierarchy: Mdf.Interface.InputHierarchy;
        $dragSelectBoxFrom: JQuery;
        /** Vola se jednou pri inicializaci (asynchronne) */
        prepareContent(inputParams: any): void;
        onDeactivate(): void;
        AktualizujCheckedMembers(): void;
        setDataView(hierarchy: Mdf.Interface.InputHierarchy): void;
        setNacteno(hierarchy: Mdf.Interface.InputHierarchy, value: boolean): void;
        CreateDataView(hierarchy: Mdf.Interface.InputHierarchy): void;
        setHierarchiesToSelectBox(placement: Gordic.Mdf.Interface.HierarchyPlacement): Interface.InputHierarchy[];
        ResethierarchyDataViews(hierarchies: Mdf.Interface.InputHierarchy[]): void;
    }
    export {};
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.WebClient\GWordsSelectorTest\GWordsSelectorTest.d.ts 

declare namespace Gordic.Mdf.WebClient {
    class GWordsSelectorTest extends GContentBase implements IGContent {
        $navrhar: JQuery;
        $navrharForm: JQuery;
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.WebClient\GWordsSelectorTest\GWordsSelectorTest2.d.ts 



//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.WebClient\GWordsSelectorTest\GWordsSelectorTest3.d.ts 

declare namespace Gordic.Mdf.WebClient {
    class GWordsSelectorTest3 extends GContentBase implements IGContent {
        private columnSelector;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.WebClient\MdfGrid\MdfGrid.d.ts 

declare namespace Gordic.Mdf.WebClient {
    class MdfGrid extends GContentBase implements IGContent {
        $table: JQuery;
        private statusRez;
        hierarchies: Mdf.Interface.InputHierarchy[];
        selectedReportId: string;
        ixsStrRootSoukromy: string;
        ixsStrRootVerejny: string;
        cube: Interface.GEkosdpoDto;
        subcontentNavrhar: GNavrharContent;
        subcontentVerejne: GContent;
        subcontentSoukrome: GContent;
        rezy: Interface.GEkosdpoDto[];
        jeVygenerovanyPohled: boolean;
        onContentReady(): void;
        GenerateResult(): void;
        refreshPohledy(saveEnabled: boolean): void;
        createNavrhar(): void;
        nactiPohled(): void;
        createPohledyContent(verejne: boolean, dock: boolean): GContent<IGContentBase, any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.WebClient\MdfGrid\MdfGridTS.d.ts 

declare namespace Gordic.Mdf.WebClient {
    class MdfGridTS extends GContentBase implements IGContent {
        $grid: JQuery;
        islViewPolozky: Gordic.Isl.View<any>;
        onContentReady(): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.WebClient\PohledSave\GPohledSave.d.ts 

declare namespace Gordic.Mdf.WebClient {
    class GPohledSave extends GContentBase implements IGContent {
        subcontent2: any;
        $tabUmisteni: JQuery;
        $tabNazev: JQuery;
        init: boolean;
        createUmisteniContent: any;
        selectedReportId: string;
        ixsStrRootSoukromy: string;
        ixsStrRootVerejny: string;
        pohledDto: Mdf.Interface.GPohledDto;
        onContentReady(): void;
        MakeForm(tema: string): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.WebClient\Scripts\Utils.d.ts 

declare namespace Gordic.Mdf.WebClient {
}

//#endregion

