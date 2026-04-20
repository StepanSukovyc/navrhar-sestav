/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       slg.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Slg.Interface\Gordic.Slg.Interface.csproj
*    created     2026-02-16 14:34:28
*    files       IGIlgModuleServices.d.ts
*                IGSlgModules.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Slg.Interface\IGIlgModuleServices.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro třídu služby ISL která se použává pro spouštěcí lištu.*/
	interface SlgModuleServices {
		getModuleList(rq?:CallParams<{}>): _Task<{},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SlgModuleServices: ServiceBase & Catalog.SlgModuleServices;
	}
	const SlgModuleServices: Client["SlgModuleServices"];
}
declare namespace Gordic.Slg.Interface {
	const enum ModulFilter {
		ixs_fun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Slg.Interface\IGSlgModules.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Panel nástěnky*/
	interface SlgModules {
		/**Vrátí detail panelu.*/
		read(rq?:Gordic.ControlsLogic.Interface.GModuleDto|CallParams<GServiceReadRequest<Gordic.ControlsLogic.Interface.GModuleDto>>): _Task<GServiceReadRequest<Gordic.ControlsLogic.Interface.GModuleDto>,GServiceReadResponse<Gordic.ControlsLogic.Interface.GModuleDto>>;
		/**Vrátí seznam panelů.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.ControlsLogic.Interface.GModuleDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SlgModules: ServiceBase & Catalog.SlgModules;
	}
	const SlgModules: Client["SlgModules"];
}

//#endregion

