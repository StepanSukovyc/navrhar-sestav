/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       esr.webapp.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Esr.WebApp\Gordic.Esr.WebApp.csproj
*    created     2026-02-16 14:34:17
*    files       Scripts\esr.webapp.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Esr.WebApp\Scripts\esr.webapp.d.ts 

declare namespace Gordic.Esr.WebApp {
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
    }
}

//#endregion

