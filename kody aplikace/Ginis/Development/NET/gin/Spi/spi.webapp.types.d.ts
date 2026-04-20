/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       spi.webapp.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Spi.WebApp\Gordic.Spi.WebApp.csproj
*    created     2026-02-16 14:33:51
*    files       Scripts\spi.webapp.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Spi.WebApp\Scripts\spi.webapp.d.ts 

declare namespace Gordic.Spi.WebApp {
    /**
     * Hlavní content SPI.
     *
     * @author  JSindelka
     * @since   482.1.0.37
     * @date    21.03.2019
     */
    class Main extends GContentBase {
        Warning: string;
        onContentReady(): void;
        OtevriSouhrn(cnt: GContent): void;
    }
}

//#endregion

