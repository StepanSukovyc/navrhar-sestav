/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       sud.webapp.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Sud.WebApp\Gordic.Sud.WebApp.csproj
*    created     2026-02-16 14:36:07
*    files       Scripts\sud.webapp.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Sud.WebApp\Scripts\sud.webapp.d.ts 

declare namespace Gordic.Sud.WebApp {
    /**
     * Hlavní content SPI.
     *
     * @author  JSindelka
     * @since   482.1.0.37
     * @date    21.03.2019
     */
    class Main extends GContentBase {
        IsPouzeJednaSpisovna: boolean;
        onContentReady(): void;
        OtevriSouhrn(cnt: GContent): void;
    }
}

//#endregion

