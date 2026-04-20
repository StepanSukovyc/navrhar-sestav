/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       report.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Report.Client\Gordic.Report.Client.csproj
*    created     2026-02-16 14:33:45
*    files       Scheduling\GScheduleZastZnakDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Report.Client\Scheduling\GScheduleZastZnakDto.d.ts 

declare namespace Gordic.Report.Client {
    /**Dto pro zastupny znak*/
	interface GScheduleZastZnakDto {
        /**Znak*/
		wildcard?: string|null;
        /**Popis*/
		desc?: string|null;
        /**Ukazka*/
		preview?: string|null;
	}
	const enum GScheduleZastZnakDtoNames { wildcard = "wildcard", desc = "desc", preview = "preview",}
	const enum GScheduleZastZnakDtoFragments { wildcard = "*", desc = "*", preview = "*",}
	const enum GScheduleZastZnakDtoTypes { wildcard = "string", desc = "string", preview = "string",}
}

//#endregion

