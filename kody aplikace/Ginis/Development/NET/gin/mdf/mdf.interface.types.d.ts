/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       mdf.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Mdf.Interface\Gordic.Mdf.Interface.csproj
*    created     2026-02-16 14:33:49
*    files       Data\IGISLMember.d.ts
*                Dto\FilterMemberDto.d.ts
*                Dto\GEkosdpoDto.d.ts
*                Dto\GPohledDto.d.ts
*                Dto\InputHierarchy.d.ts
*                Dto\MemberDto.d.ts
*                Dto\ResultDto.d.ts
*                Enums\HierarchyPlacement.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Mdf.Interface\Data\IGISLMember.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro ISL - Prvek dimenze*/
	interface PrvekDimenze {
		/**Seznam memberů*/
		list(rq?:Gordic.Mdf.Interface.FilterMemberDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mdf.Interface.MemberDto>>;
		/**Seznam datových řezů*/
		seznamDatovychRezu(rq?:CallParams<{}>): _Task<{},Gordic.Mdf.Interface.GEkosdpoDto[]>;
		/**Vrátí řádek stromu*/
		removeStrRow(rq?:CallParams<{tema:string,ixs_str:string}>): _Task<{tema:string,ixs_str:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PrvekDimenze: ServiceBase & Catalog.PrvekDimenze;
	}
	const PrvekDimenze: Client["PrvekDimenze"];
}
declare namespace Gordic.Mdf.Interface {
	/**Výčet filtračních kritérií pro filtr položek Globálního číselníku*/
	const enum FilterMemberEnum {
		/**Id Nadřazeného memberu*/
		parent,
		/**Id Hierarchie (např. MDFODP03)*/
		hierarchie,
		/**Úroveň nadřazeného memberu*/
		level,
		/**Zaškrtnuté prvky v hierarchii*/
		checkedMembers,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.Interface\Dto\FilterMemberDto.d.ts 

declare namespace Gordic.Mdf.Interface {
	/**Dto pro selectování children memberu*/
	interface FilterMemberDto {
		/**Id - jednoznačný identifikátor prvku v dimenzi*/
		parent?: string|null;
		/**Id Hierarchie (např. MDFODP03)*/
		hierarchie?: string|null;
		/**Úroveň ve stromu hierarchie*/
		level?: number|null;
		/**Za3krtnuté prvky hierarchie*/
		checkedMembers?: string[]|null;
	}
	const enum FilterMemberDtoNames { parent = "parent", hierarchie = "hierarchie", level = "level", checkedMembers = "checkedMembers",}
	const enum FilterMemberDtoFragments { parent = "*", hierarchie = "*", level = "*", checkedMembers = "*",}
	const enum FilterMemberDtoTypes { parent = "string", hierarchie = "string", level = "number", checkedMembers = "string[]",}
	const enum FilterMemberDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.Interface\Dto\GEkosdpoDto.d.ts 

declare namespace Gordic.Mdf.Interface {
	/**DBTABLE:ekosdpo*/
	interface GEkosdpoDto {
		/**DBCOLUMN:ekosdpo.id_dpo*/
		id_dpo?: string|null;
		/**DBCOLUMN:ekosdpo.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekosdpo.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ekosdpo.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ekosdpo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekosdpo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekosdpo.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GEkosdpoDtoNames { id_dpo = "id_dpo", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkosdpoDtoFragments { id_dpo = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkosdpoDtoTypes { id_dpo = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkosdpoDtoTypeLengths { id_dpo = 12, nazev = 50, zkratka = 16, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.Interface\Dto\GPohledDto.d.ts 

declare namespace Gordic.Mdf.Interface {
	/**Pohled v dimenzi*/
	interface GPohledDto {
		/**Identifikátor ALV*/
		ixs_alv?: string;
		/**Identifikátor stromu*/
		ixs_str?: string;
		/**Tema*/
		tema?: string;
		/**Název pohledu*/
		nazev?: string;
		/**Datový řez*/
		id_cub?: string;
		/**Všechny Hierarchie*/
		hierarchies?: Gordic.Mdf.Interface.InputHierarchy[];
	}
	const enum GPohledDtoNames { ixs_alv = "ixs_alv", ixs_str = "ixs_str", tema = "tema", nazev = "nazev", id_cub = "id_cub", hierarchies = "hierarchies",}
	const enum GPohledDtoFragments { ixs_alv = "*", ixs_str = "*", tema = "*", nazev = "*", id_cub = "*", hierarchies = "*",}
	const enum GPohledDtoTypes { ixs_alv = "string", ixs_str = "string", tema = "string", nazev = "string", id_cub = "string", hierarchies = "Gordic.Mdf.Interface.InputHierarchy[]",}
	const enum GPohledDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.Interface\Dto\InputHierarchy.d.ts 

declare namespace Gordic.Mdf.Interface {
	/**Hierarchie s konkretními vybranými prvky, která vstupuje do dotazu*/
	interface InputHierarchy {
		/**Name hierarchie*/
		name: string;
		/**Vybrané prvky hierarchie*/
		checkedMembers: string[];
		/**Umístění hierarchie*/
		placement: Gordic.Mdf.Interface.HierarchyPlacement;
		/**Index dimenze - kolikátá to je dimenze v řádcích nebo ve sloupcích*/
		index: number;
		/**Index dimenze - kolikátá to je dimenze v kostce*/
		hierarchyIndex?: number|null;
		/**Zkratka dimenze např. ODPA*/
		zkratka?: string|null;
	}
	const enum InputHierarchyNames { name = "name", checkedMembers = "checkedMembers", placement = "placement", index = "index", hierarchyIndex = "hierarchyIndex", zkratka = "zkratka",}
	const enum InputHierarchyFragments { name = "*", checkedMembers = "*", placement = "*", index = "*", hierarchyIndex = "*", zkratka = "*",}
	const enum InputHierarchyTypes { name = "string", checkedMembers = "string[]", placement = "Gordic.Mdf.Interface.HierarchyPlacement", index = "number", hierarchyIndex = "number", zkratka = "string",}
	const enum InputHierarchyTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.Interface\Dto\MemberDto.d.ts 

declare namespace Gordic.Mdf.Interface {
	/**Member v dimenzi*/
	interface MemberDto {
		/**Id - jednoznačný identifikátor prvku v dimenzi*/
		id: string;
		/**Hodnota a název*/
		hodnotaNazev: string;
		/**IdParent - nadřazený member*/
		idParent?: string|null;
		/**Úroveň ve stromu hierarchie*/
		level: number;
	}
	const enum MemberDtoNames { id = "id", hodnotaNazev = "hodnotaNazev", idParent = "idParent", level = "level",}
	const enum MemberDtoFragments { id = "*", hodnotaNazev = "*", idParent = "*", level = "*",}
	const enum MemberDtoTypes { id = "string", hodnotaNazev = "string", idParent = "string", level = "number",}
	const enum MemberDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.Interface\Dto\ResultDto.d.ts 

declare namespace Gordic.Mdf.Interface {
	/**Vysledek generovani pohledu v mdf*/
	interface ResultDto {
		/**data*/
		cells: string[][];
		/**Levels v řádcích*/
		levelsRows: number[][];
		/**Znaménka plus minus tecka v řádcích*/
		plusMinusRows: string[][];
		/**Names - identifikatory memberu v řádcích*/
		Rnames: string[][];
		/**Names - identifikatory memberu ve sloupcich*/
		Cnames: string[][];
		/**počet dimenzí v řádcích*/
		dimInRowsCount: number;
		/**počet dimenzí ve sloupcích*/
		dimInColumnsCount: number;
		/**Názvy dimenzí ve sloupcích*/
		dimInColumnsCaptions: string[];
		/**Indexy dimenzí v řádcích*/
		dimIndexesRows: number[];
		/**Indexy dimenzí ve sloupcích*/
		dimIndexesColumns: number[];
		/**Indexy dimenzí na pozadí*/
		dimIndexesBackground?: number[]|null;
	}
	const enum ResultDtoNames { cells = "cells", levelsRows = "levelsRows", plusMinusRows = "plusMinusRows", Rnames = "Rnames", Cnames = "Cnames", dimInRowsCount = "dimInRowsCount", dimInColumnsCount = "dimInColumnsCount", dimInColumnsCaptions = "dimInColumnsCaptions", dimIndexesRows = "dimIndexesRows", dimIndexesColumns = "dimIndexesColumns", dimIndexesBackground = "dimIndexesBackground",}
	const enum ResultDtoFragments { cells = "*", levelsRows = "*", plusMinusRows = "*", Rnames = "*", Cnames = "*", dimInRowsCount = "*", dimInColumnsCount = "*", dimInColumnsCaptions = "*", dimIndexesRows = "*", dimIndexesColumns = "*", dimIndexesBackground = "*",}
	const enum ResultDtoTypes { cells = "string[][]", levelsRows = "number[][]", plusMinusRows = "string[][]", Rnames = "string[][]", Cnames = "string[][]", dimInRowsCount = "number", dimInColumnsCount = "number", dimInColumnsCaptions = "string[]", dimIndexesRows = "number[]", dimIndexesColumns = "number[]", dimIndexesBackground = "number[]",}
	const enum ResultDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mdf.Interface\Enums\HierarchyPlacement.d.ts 

declare namespace Gordic.Mdf.Interface {
	/**Enum pro umístění hierarchie*/
	const enum HierarchyPlacement {
		/**Hierarchie umístěna v řádcích*/
		rows=0,
		/**Hierarchie umístěna ve sloupcích*/
		columns=1,
		/**Hierarchie umístěna na pozadí*/
		background=2,
	}
}

//#endregion

