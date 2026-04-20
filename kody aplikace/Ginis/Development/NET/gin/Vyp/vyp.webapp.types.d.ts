/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       vyp.webapp.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Vyp.WebApp\Gordic.Vyp.WebApp.csproj
*    created     2026-02-16 14:36:37
*    files       Scripts\vyp.webapp.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Vyp.WebApp\Scripts\vyp.webapp.d.ts 

declare namespace Gordic.Vyp.WebApp {
    /**
     * Hlavní content POD.
     *
     * @author  JSindelka
     * @since   482.1.0.37
     * @date    21.03.2019
     */
    class Main extends GContentBase {
        Info: string;
        TextAvizaExpiraceDS: string;
        onContentReady(): void;
    }
}

//#endregion

