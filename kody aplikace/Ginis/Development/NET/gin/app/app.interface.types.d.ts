/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       app.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.App.Interface\Gordic.App.Interface.csproj
*    created     2026-02-16 14:33:44
*    files       Api\GAppInfoDTO.d.ts
*                Api\GParameter.d.ts
*                Api\GTicketDTO.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.App.Interface\Api\GAppInfoDTO.d.ts 

declare namespace Gordic.App.Interface {
	/**Information abou app application*/
	interface GAppInfoDTO {
		/**Name*/
		Name?: string|null;
		/**AppDomainId*/
		AppDomainId?: number|null;
		/**Running*/
		Running?: boolean|null;
		/**AssemblyName*/
		AssemblyName?: string|null;
		/**RootDir*/
		RootDir?: string|null;
		/**WhenCreated*/
		WhenCreated?: JsonDate|null;
		/**Configuration*/
		Configuration?: Gordic.App.Interface.GParameter[]|null;
	}
	const enum GAppInfoDTONames { Name = "Name", AppDomainId = "AppDomainId", Running = "Running", AssemblyName = "AssemblyName", RootDir = "RootDir", WhenCreated = "WhenCreated", Configuration = "Configuration",}
	const enum GAppInfoDTOFragments { Name = "*", AppDomainId = "*", Running = "*", AssemblyName = "*", RootDir = "*", WhenCreated = "*", Configuration = "*",}
	const enum GAppInfoDTOTypes { Name = "string", AppDomainId = "number", Running = "boolean", AssemblyName = "string", RootDir = "string", WhenCreated = "JsonDate", Configuration = "Gordic.App.Interface.GParameter[]",}
	const enum GAppInfoDTOTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.App.Interface\Api\GParameter.d.ts 

declare namespace Gordic.App.Interface {
	/**GParameter*/
	interface GParameter {
		/**Key*/
		Key?: string|null;
		/**Value*/
		Value?: string|null;
	}
	const enum GParameterNames { Key = "Key", Value = "Value",}
	const enum GParameterFragments { Key = "*", Value = "*",}
	const enum GParameterTypes { Key = "string", Value = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.App.Interface\Api\GTicketDTO.d.ts 

declare namespace Gordic.App.Interface {
	/**Information about tickets*/
	interface GTicketDTO {
		/**Ticket*/
		Ticket?: string|null;
		/**Created*/
		Created?: JsonDate|null;
		/**LastUsed*/
		LastUsed?: JsonDate|null;
		/**AppName*/
		AppName?: string|null;
		/**Info*/
		Info?: string|null;
	}
	const enum GTicketDTONames { Ticket = "Ticket", Created = "Created", LastUsed = "LastUsed", AppName = "AppName", Info = "Info",}
	const enum GTicketDTOFragments { Ticket = "*", Created = "*", LastUsed = "*", AppName = "*", Info = "*",}
	const enum GTicketDTOTypes { Ticket = "string", Created = "JsonDate", LastUsed = "JsonDate", AppName = "string", Info = "string",}
	const enum GTicketDTOTypeLengths {}
}

//#endregion

