/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       pod.webapp.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Pod.WebApp\Gordic.Pod.WebApp.csproj
*    created     2026-02-16 14:35:08
*    files       Scripts\pod.webapp.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Pod.WebApp\Scripts\pod.webapp.d.ts 

declare namespace Gordic.Pod.WebApp {
    /**
     * Hlavní content POD.
     *
     * @author  JSindelka
     * @since   482.1.0.37
     * @date    21.03.2019
     */
    class Main extends GContentBase {
        TextAvizaExpiraceDS: string;
        TextKontrolaPodpisu: string;
        KontrolavatKonzistenceCertifikatu: boolean;
        FilesWithIncorrectlyAssignedCertificates: any;
        Warning: string;
        TextDisabledRun: string;
        onContentReady(): void;
    }
}

//#endregion

