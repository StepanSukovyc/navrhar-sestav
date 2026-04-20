/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       par.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Par.WebControls\Gordic.Par.WebControls.csproj
*    created     2026-02-16 14:34:47
*    files       Gin\Par\GParEnums.d.ts
*                Gin\Par\Dto\GParKonvertovatelneActionDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Par.WebControls\Gin\Par\GParEnums.d.ts 

declare namespace Gordic.Par.WebControls {
    /**Enumy v PAR05
    *     - dialog Konvertovatelné
    */
	interface GParEnums {
	}
	const enum GParEnumsNames {}
	const enum GParEnumsFragments {}
	const enum GParEnumsTypes {}
}
declare namespace Gordic.Par.WebControls.GParEnums {
    /**Typy seznamů v PAR05*/
	const enum TypSeznamuParEnum {
		Nekonvertovatelne=0,
		Konvertovatelne=1,
		NepodepsanePDF=2,
		PodepsanePDF=3,
		Overitelne=4,
		NeovereneVerze=5,
		IxsCerNeurceno=6,
		PodepsaneBezTs=7,
		Expirace=8,
		ExpiraceTs=9,
		ZadostAutorizovanaKonverze=10,
		NespravneAnonymizovane=11,
	}
    /**akce na dialozích v PAR05*/
	const enum GParAkce {
        /**podepsat*/
		podepsat=10,
        /**podepsat s časovým razítkem*/
		podepsatCasRazitko=20,
        /**časové razítko*/
		casRazitko=30,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Par.WebControls\Gin\Par\Dto\GParKonvertovatelneActionDto.d.ts 

declare namespace Gordic.Par.WebControls {
	/**KonverzePdfDto*/
	interface GParKonvertovatelneActionDto {
		/**ktgDpoSupportDbParamsDto*/
		ktgDpoSupportDbParamsDto?: any;
		/**ixsDpo*/
		ixsDpo?: string|null;
		/**duvodPodpisuTxt*/
		duvodPodpisuTxt?: string|null;
	}
	const enum GParKonvertovatelneActionDtoNames { ktgDpoSupportDbParamsDto = "ktgDpoSupportDbParamsDto", ixsDpo = "ixsDpo", duvodPodpisuTxt = "duvodPodpisuTxt",}
	const enum GParKonvertovatelneActionDtoFragments { ktgDpoSupportDbParamsDto = "*", ixsDpo = "*", duvodPodpisuTxt = "*",}
	const enum GParKonvertovatelneActionDtoTypes { ktgDpoSupportDbParamsDto = "Gordic.Gin.WebClient.GKtgDpoSupportDbParamsDto", ixsDpo = "string", duvodPodpisuTxt = "string",}
}

//#endregion

