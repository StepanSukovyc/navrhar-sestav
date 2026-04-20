declare namespace Gordic.Spi.Dialogs {
    /**
     * Otevře dialog detailu balíku dokumentu.
     *
     * @author  TFeik
     * @date    04.07.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.IxsZup Ixp dokumentu.
     * @param {boolean} [opt.Hromadne=false] (default = false) Příznak, zda se jedná ohromadné odeslání.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GDetailBalikuDlg(parentContent: GContent, opt: WebClient.GDetailBalikuDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GDetailBalikuDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    interface GHledaniBalikuDlgPreActionInput {
        filtrStruktura?: Wfl.Interface.GSslProfilStruktura;
        typHledani?: Interface.TypHledaniBaliku;
        /**
         * Příznak, zda se má balík vytvářet v režimu spisovny.
         * Tento příznak je použit pro seznam balíků pro případ, že uživatel balík nevybere, ale ze seznamu zakládá nový.
         * @type {boolean}
         */
        IsRezimSpisovna?: boolean;
        /**
         * Identifikátor dokumentu pro přednastavení hodnot při nově vytvářeném balíku.
         * @type {string}
         */
        IxpProPrednastaveniBaliku?: string | null;
        /**
         * Identifikátory entit pro vložení
         * @type {string}
         */
        IxpsProVlozeni?: string[] | null;
    }
    /**
     * GHledaniBalikuDlg.
     *
     * @author  TFeik
     * @date    18.06.2019
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GHledaniBalikuDlg(parentContent: GContent, opt?: GHledaniBalikuDlgPreActionInput, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<Interface.GSpiUniversalListDto[] | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * GHledaniBalikuDleIdentifikatoruDlg.
     *
     * @author  TFeik
     * @date    18.06.2019
     *
     * @param {GContent} parentContent
     * @param {{ filtrStruktura?: Wfl.Interface.GSslProfilStruktura }} [opt]
     * @param {Gordic.Global.Enums.ModOtevreni} [ModOtevreni]
     * @returns {JQueryPromise<Interface.GSpiUniversalListDto[]>}
     */
    function GHledaniBalikuDleIdentifikatoruDlg(parentContent: GContent, opt?: {
        /**
         * Výchozí hodnoty filtru.
         * @type {Wfl.Interface.GSslProfilStruktura}
         */
        filtrStruktura?: Wfl.Interface.GSslProfilStruktura;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<Interface.GSpiUniversalListDto[] | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    interface GDetailBalikuTiskStitkuDlgPreActionInput {
        /**
         * Ixs balíku.
         */
        IxsZup: string[];
        /**
         * TypTiskuStitku.
         */
        TypTiskuStitku?: Gordic.Spi.WebClient.TypTiskuStitkuEnum;
    }
    /**
     * Otevře dialog tisku štétků balíků.
     *
     * @author  TFeik
     * @date    22.08.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.IxsZup Ixp balíku.
     * @param {boolean} [opt.Hromadne=false] (default = false) Příznak, zda se jedná ohromadné odeslání.
     * @returns {JQueryPromise<undefined>} Promise.
     */
    function GDetailBalikuTiskStitkuDlg(parentContent: GContent, opt: GDetailBalikuTiskStitkuDlgPreActionInput, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog výběru spisovny
     *
     * @author  TFeik
     * @date    22.08.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.IxsZup Ixp balíku.
     * @param {boolean} [opt.Hromadne=false] (default = false) Příznak, zda se jedná ohromadné odeslání.
     * @returns {JQueryPromise<undefined>} Promise.
     */
    function GZadaniSpisovnyDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<Data.Readers.SpisspiDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře okno pro zadání úložného místa
     *
     * @author  JSindelka
     * @date    7.1.2019
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<undefined>} Promise.
     */
    function GUlozeniDoSpisovnyDlg(parentContent: GContent, opt?: {
        typZobrazeni?: Spi.Interface.TypZobrazeniUlozeniDoSpisovny;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Spi.Interface.GUlozeniDto | undefined>;
    /**
 * Otevře okno pro vyber úložného místa
 *
 * @author  JSindelka
 * @date    26.10.2023
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @returns {JQueryPromise<undefined>} Promise.
 */
    function UloznaMistaDlg(parentContent: GContent, opt?: {
        typZobrazeni?: Spi.Interface.TypZobrazeniUlozeniDoSpisovny;
        vyber: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Spi.Interface.GUlozeniDto | undefined>;
    /**
 * Otevře okno pro zadání úložného místa
 *
 * @author  JSindelka
 * @date    7.1.2019
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @returns {JQueryPromise<undefined>} Promise.
 */
    function VypujceniZeSpisovnyDlg(parentContent: GContent, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GVypujceniDto | undefined>;
    /**
 * Otevře okno pro zadání úložného místa
 *
 * @author  JSindelka
 * @date    7.1.2019
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @returns {JQueryPromise<undefined>} Promise.
 */
    function ZadostOVypujceniZeSpisovnyDlg(parentContent: GContent, zadostDto: Wfl.Interface.GEntitaKVypujceniInfoDto, odeslatZadost?: boolean, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GEntitaKVypujceniInfoDto>;
    /**
* Otevře okno pro vyjmuti ze spisovny
*
* @author  JSindelka
* @date    7.1.2019
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @returns {JQueryPromise<undefined>} Promise.
*/
    function VyjmoutZeSpisovnyDlg(parentContent: GContent, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Spi.Interface.GVyjmutiZeSpisovnyDto | undefined>;
    /**
 * Otevře okno pro zadání úložného místa
 *
 * @author  JSindelka
 * @date    7.1.2019
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @returns {JQueryPromise<undefined>} Promise.
 */
    function DoplneniSpousteciUdalostiDlg(parentContent: GContent, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Spi.Interface.GRokDto | undefined>;
    function ZaplneniVUloznemMisteDlg(parentContent: GContent, opt?: {
        umisteni: Interface.GUloznaMistaFilterDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GEditaceZasilkyDto>;
    /**
     * Otevře okno pro zadání úložného místa
     *
     * @author  TFeik
     * @date    7.1.2019
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<undefined>} Promise.
     */
    function GDetailNeevidovanehoDokumentuSpisuDlg(parentContent: GContent, opt: WebClient.GDetailNeevidovanehoDokumentuSpisuDlgInputDto, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GDetailNeevidovanehoDokumentuSpisuDlgRetValDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
* Otevře detaul úložného místa
*
* @author  JSindelka
* @date    7.1.2019
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @returns {JQueryPromise<undefined>} Promise.
*/
    function GDetailUloznehoMistaDlg(parentContent: GContent, opt: WebClient.GDetailUloznehoMistaDlgInputDto, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<WebClient.GDetailUloznehoMistaDlgRetValDto>;
    /**
 * Otevře detail vypujcniho listku
 *
 * @author  JSindelka
 * @date    7.1.2019
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @returns {JQueryPromise<undefined>} Promise.
 */
    function GDetailVypujcnihoListkuDlg(parentContent: GContent, opt: WebClient.GDetailVypujcnihoListkuDlgInputDto, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<WebClient.GDetailVypujcnihoListkuDlgRetValDto>;
    /**
     * Otevře dialog kontroly obsahu balíku.
     *
     * @author  TFeik
     * @date    13.03.2019
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.IxsZup Ixp balíku.
     * @returns {JQueryPromise<undefined>} Promise.
     */
    function GDetailBalikuKontrolaObsahuDlg(parentContent: GContent, opt: WebClient.GDetailBalikuKontrolaObsahuDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GDetailBalikuKontrolaObsahuDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Otevře okno pro zadání úložného místa
    *
    * @author  JSindelka
    * @date    7.1.2019
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @returns {JQueryPromise<undefined>} Promise.
    */
    function SpisovyZnakEditDlg(parentContent: GContent, opt?: {
        Default?: Wfl.Interface.GSslProfilStruktura;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.ZmenaSpisZnakuStru | undefined>;
    /**
* Otevře okno pro zadání skartacniho znaku místa
*
* @author  JSindelka
* @date    7.1.2019
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @returns {JQueryPromise<undefined>} Promise.
*/
    function SkartZnakEditDlg(parentContent: GContent, opt?: {
        Default?: Wfl.Interface.GSslProfilStruktura;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.ZmenaSpisZnakuStru | undefined>;
    /**
* Otevře okno pro zadání vlastnika znaku místa
*
* @author  JSindelka
* @date    7.1.2019
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @returns {JQueryPromise<undefined>} Promise.
*/
    function VlastnikEditDlg(parentContent: GContent, opt?: {
        Default?: Wfl.Interface.GSuFunRefDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GSuFunRefDto | undefined>;
    /**
* vyber uloznych mist
*
* @author  JSindelka
* @date    7.1.2019
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @returns {JQueryPromise<undefined>} Promise.
*/
    function UloznaMistaVyberDlg(parentContent: GContent, opt?: {
        Selected?: string[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<string[] | undefined>;
    /**
* automaticke ukladani
*
* @author  JSindelka
* @date    7.1.2019
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @returns {JQueryPromise<undefined>} Promise.
*/
    function AutomatickeUkladaniBalikuDlg(parentContent: GContent, opt?: {
        KUlozeni?: string[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean | undefined>;
}
declare namespace Gordic.Spi.PreActions {
    enum Names {
        OtevriDetailBaliku = "actOtevriDetailBaliku",
        UlozDetailBaliku = "actUlozDetailBaliku",
        GenerujSIPBaliky = "actGenerujSIPBaliky",
        GenerujSIPBalikyObsahuBaliku = "actGenerujSIPBalikyObsahuBaliku",
        VlozitDokumentSpisDoBaliku = "actVlozitDokumentSpisDoBaliku",
        VlozitNeevidovanyDokumentSpisDoBaliku = "actVlozitNeevidovanyDokumentSpisDoBaliku",
        NeevidovanyDokumentSpisDetail = "actNeevidovanyDokumentSpisDetail",
        NeevidovanyDokumentSpisSave = "actNeevidovanyDokumentSpisSave",
        DetailDokumentSpisuNeevidovanyDokumentSpis = "actDetailDokumentSpisuNeevidovanyDokumentSpis",
        VyjmoutPisemnostZBaliku = "actVyjmoutPisemnostZBaliku",
        KontrolaObsahuBaliku = "actKontrolaObsahuBaliku",
        OpravaNevalidnichNeevidovanyDokumentSpis = "actOpravaNevalidnichNeevidovanyDokumentSpis",
        VratitVypujcku = "actVratitVypujcku",
        VratitVypujckuZeSpisovnyHromadne = "actVratitVypujckuZeSpisovnyHromadne",
        ZtratitVypujcku = "actZtratitVypujcku",
        ZtratitVypujckuZeSpisovnyHromadne = "actZtratitVypujckuZeSpisovnyHromadne",
        ZtratitZeSpisovny = "actZtratitZeSpisovny",
        ZtratitZeSpisovnyHromadne = "actZtratitZeSpisovnyHromadne",
        VratitZtracenyZeSpisovny = "actVratitZtracenyZeSpisovny",
        VratitZtracenyZeSpisovnyHromadne = "actVratitZtracenyZeSpisovnyHromadne",
        ZmenitFormu = "actZmenitFormu",
        VypujcitZeSpisovny = "actVypujcitZeSpisovny",
        VypujcitZeSpisovnyHromadne = "actVypujcitZeSpisovnyHromadne",
        VytvoritZadostOVypujceniZeSpisovny = "actVytvoritZadostOVypujceniZeSpisovny",
        PremistitDokumentSpisDoJinehoBaliku = "actPremistitDokumentSpisDoJinehoBaliku",
        PridejBalikDoPoznamkovehoBloku = "actPridejBalikDoPoznamkovehoBloku",
        OtevriVytvoreniuBaliku = "actOtevriVytvoreniuBaliku"
    }
    /**
     * OtevriDetailBaliku
     *
     * @param {Gin.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailBalikuDialogParams>} [input]
     * @returns {GActionParams}
     */
    function OtevriDetailBaliku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDetailBalikuDlgInputParams>, WebClient.GDetailBalikuDlgReturnValue>): GActionParams;
    function UlozDetailBaliku(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        data: Interface.GBalikDto;
        isNew?: boolean;
        /**
         * Příznak, zda se má balík vytvářet v režimu spisovny. V případě že nenívyplněn se vezme dle režimu spisovny a fáze (při nejasnostech je false).
         * Pouze pro vytváření nového balíku.
         * @type {boolean}
         */
        isRezimSpisovna?: boolean;
    }, Interface.GBalikDto>): GActionParams;
    /**
     * export function GenerujSIPBaliky
     *
     * @author  TFeik
     * @date    02.01.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GGenerujSIPBalikyInputDto, WebClient.GGenerujSIPBalikyOutputDto>} input
     * @returns {GActionParams}
     */
    function GenerujSIPBaliky(input: Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GGenerujSIPBalikyInputDto, WebClient.GGenerujSIPBalikyOutputDto>): GActionParams;
    /**
 * export function NacistDavkuZNda - Tato funkčnost je nyní přístupná z přehledu skartačních návrhů/protokolů.
 *
 * @author  TFeik
 * @date    02.01.2019
 *
 * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GGenerujSIPBalikyInputDto, WebClient.GGenerujSIPBalikyOutputDto>} input
 * @returns {GActionParams}
 */
    /**
     * export function GenerujSIPBalikyObsahuBaliku
     *
     * @author  TFeik
     * @date    26.05.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GGenerujSIPBalikyObsahuBalikuInputDto, WebClient.GGenerujSIPBalikyObsahuBalikuOutputDto>} input
     * @returns {GActionParams}
     */
    function GenerujSIPBalikyObsahuBaliku(input: Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GGenerujSIPBalikyObsahuBalikuInputDto, WebClient.GGenerujSIPBalikyObsahuBalikuOutputDto>): GActionParams;
    interface VlozitDokumentSpisDoBalikuPreAcionOutput extends WebClient.VlozitDokumentySpisyDoBalikuOutput {
    }
    interface VlozitDokumentSpisDoBalikuPreAcionRejectOutput extends VlozitDokumentSpisDoBalikuPreAcionOutput {
        CanceledByUser: boolean;
    }
    /**
     * Vložení dokumentu či spisu do balíku.
     *
     * @author  TFeik
     * @date    04.01.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GVlozitDokumentSpisDoBalikuPreActionInputDto>} input
     * @returns {GActionParams}
     */
    function VlozitDokumentSpisDoBaliku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GVlozitDokumentSpisDoBalikuPreActionInputDto>, /*Gordic.Isl.GServiceActionResponse<WebClient.GVlozitDokumentSpisDoBalikuOutputDto>*/ VlozitDokumentSpisDoBalikuPreAcionOutput>): GActionParams;
    /**
     * Detail neevidovaného dokumentu či spisu.
     *
     * @author  TFeik
     * @date    17.01.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GGenerujSIPBalikyObsahuBalikuPreActionInputDto} input
     * @returns {GActionParams}
     */
    function NeevidovanyDokumentSpisDetail(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDetailNeevidovanehoDokumentuSpisuDlgInputDto>, Gordic.Isl.GServiceActionResponse<WebClient.GDetailNeevidovanehoDokumentuSpisuDlgRetValDto>>): GActionParams;
    /**
     * Vložení neevidovaného dokumentu či spisu do balíku.
     *
     * @author  TFeik
     * @date    17.01.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GGenerujSIPBalikyObsahuBalikuPreActionInputDto} input
     * @returns {GActionParams}
     */
    function VlozitNeevidovanyDokumentSpisDoBaliku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDetailNeevidovanehoDokumentuSpisuDlgInputDto>, Gordic.Isl.GServiceActionResponse<WebClient.GDetailNeevidovanehoDokumentuSpisuDlgRetValDto>>): GActionParams;
    interface NeevidovanyDokumentSpisSaveInput {
        data: Interface.GPisemnostNeevidovanaDto;
        /**
         * (Detault: "update")
         * @type {"createNew" | "update" | "opravitPoKontroleMetadat"}
         */
        action?: "createNew" | "update" | "opravitPoKontroleMetadat";
    }
    function NeevidovanyDokumentSpisSave(input: Gordic.Prefabs.Actions.BasePreActionsInput<NeevidovanyDokumentSpisSaveInput, Interface.GPisemnostNeevidovanaDto>): GActionParams;
    function DetailDokumentSpisuNeevidovanyDokumentSpis(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParamsWithRemoteControlGrid<{
        ixp: string;
        grid?: JQuery<HTMLElement>;
    } & Globals.IsNeevidovanyDokumentSpisInput>, undefined>): GActionParams;
    function VyjmoutPisemnostZBaliku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVyjmoutPisemnostGroupRequestDto, Isl.GServiceGroupResponse<Interface.GVyjmoutPisemnostGroupResponseDto> & {
        groupResult?: Wfl.WebClient.GroupResult[];
    }>, 
    /**
     * (default: false) Příznak zda chci do návratového objektu přidat Wfl.WebClient.GroupResult[] do vlastnosti groupResult.
     * @type {boolean}
     */
    addGroupResult?: boolean): GActionParams;
    /**
     * Kontrola obsahu balíku.
     *
     * @author  TFeik
     * @date    14.03.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDetailBalikuKontrolaObsahuDlgInputParams>, WebClient.GDetailBalikuKontrolaObsahuDlgReturnValue>} input
     * @returns {GActionParams}
     */
    function KontrolaObsahuBaliku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDetailBalikuKontrolaObsahuDlgInputParams>, WebClient.GDetailBalikuKontrolaObsahuDlgReturnValue>): GActionParams;
    /**
     * Vstupní parametry preakce VytvoritZadostOVypujceniZeSpisovny.
     *
     * @author  TFeik
     * @date    26.11.2020
     * @since   484.1.0.357
     */
    interface VytvoritZadostOVypujceniZeSpisovnyPreActionInput {
        /**
         * Identifikátor balíku, o který chceme zažádat.
         * @type {string}
         */
        ixsZup: string;
    }
    /**
     * Vytvoří žádost o vypůjčení balíku ze spisovny.
     *
     * @author  TFeik
     * @date    26.11.2020
     *
     * TO-DO: Místo stringů na vstupu a výstupu by měl být objekt s potřebnými vlastnostmi.
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<VytvoritZadostOVypujceniZeSpisovnyPreActionInput, string>} input Vstupní parametry
     * @returns {GActionParams}
     */
    function VytvoritZadostOVypujceniZeSpisovny(input: Gordic.Prefabs.Actions.BasePreActionsInput<VytvoritZadostOVypujceniZeSpisovnyPreActionInput, string>): GActionParams;
    /**
     * Oprava nevalidního neevidovaného dokumentu či spisu.
     *
     * @author  TFeik
     * @date    11.11.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GOpravaNevalidnichNeevidovanyDokumentSpisDlgInputDto} input
     * @returns {GActionParams}
     */
    function OpravaNevalidnichNeevidovanyDokumentSpis(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOpravaNevalidnichNeevidovanyDokumentSpisDlgInputDto>, Gordic.Isl.GServiceActionResponse<WebClient.GDetailNeevidovanehoDokumentuSpisuDlgRetValDto>>): GActionParams;
    /**
     * Vrácení výpůčky.
     *
     * @author  TFeik
     * @date    27.11.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function VratitVypujcku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto, Isl.GServiceGroupResponse<Interface.GVypujcniListekDto>>): GActionParams;
    /**
     * Vrácení výpůčky.
     *
     * @author  TFeik
     * @date    19.06.2024
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVratitVypujckuZeSpisovnyHromadneRequestDto, Isl.GServiceGroupResponse<Interface.GVratitVypujckuZeSpisovnyHromadneResponseDto>>} input
     * @returns {GActionParams}
     */
    function VratitVypujckuZeSpisovnyHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVratitVypujckuZeSpisovnyHromadneRequestDto, Isl.GServiceGroupResponse<Interface.GVratitVypujckuZeSpisovnyHromadneResponseDto>>): GActionParams;
    /**
     * Ztracení výpůjčky.
     *
     * @author  TFeik
     * @date    28.11.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function ZtratitVypujcku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto, Isl.GServiceGroupResponse<Interface.GVypujcniListekDto>>): GActionParams;
    /**
     * Ztracení výpůjčky.
     *
     * @author  TFeik
     * @date    28.11.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function ZtratitVypujckuZeSpisovnyHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GZtratitVypujckuZeSpisovnyHromadneRequestDto, Isl.GServiceGroupResponse<Interface.GZtratitVypujckuZeSpisovnyHromadneResponseDto>>): GActionParams;
    /**
     * Ztratit ze spisovny.
     *
     * @author  TFeik
     * @date    28.11.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function ZtratitZeSpisovny(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GZtraceniInputDto, Isl.GServiceActionResponse<Interface.GZtratitZeSpisovnyActionResponseDto>>): GActionParams;
    /**
     * Ztratit ze spisovny.
     *
     * @author  TFeik
     * @date    19.06.2024
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function ZtratitZeSpisovnyHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GZtratitZeSpisovnyHromadneRequestDto, Isl.GServiceGroupResponse<Interface.GZtratitZeSpisovnyHromadneResponseDto>>): GActionParams;
    /**
     * Vrátit ztracený ze spisovny.
     *
     * @author  TFeik
     * @date    28.11.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function VratitZtracenyZeSpisovny(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVratitZtracenyZeSpisovnyActionRequestDto, Isl.GServiceActionResponse<Interface.GVratitZtracenyZeSpisovnyActionResponseDto>>): GActionParams;
    /**
     * Vrátit ztracený ze spisovny.
     *
     * @author  TFeik
     * @date    19.06.2024
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function VratitZtracenyZeSpisovnyHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVratitZtracenyZeSpisovnyHromadneRequestDto, Isl.GServiceGroupResponse<Interface.GVratitZtracenyZeSpisovnyHromadneResponseDto>>): GActionParams;
    /**
 * Vrátit ztracený ze spisovny.
 *
 * @author  JSindelka
 * @date    06.12.2021
 *
 * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Wfl.Interface.GZmenitFormuActionRequestDto} input
 * @returns {GActionParams}
 */
    function ZmenitFormuDokumentSpis(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<PreActions.ZmeniFormuDokumentSpisPreActionInput>, Wfl.Interface.GZmenitFormuActionResponseDto>): GActionParams;
    interface VypujcitZeSpisovnyPreActionInput {
        /**
         * (Defaut: "DokumentyASpisy")
         */
        Rezim: /*"Dokumenty" | "Spisy" |*/ "DokumentyASpisy" | "Baliky";
        /**PID. (IxsObj)*/
        Ixs: string;
    }
    /**
     * Vypůjčí ze spisovny.
     *
     * @author  TFeik
     * @date    04.12.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function VypujcitZeSpisovny(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<VypujcitZeSpisovnyPreActionInput>, Isl.GServiceActionResponse<Gordic.Spi.Interface.GVypujcitZeSpisovnyResponseDto>>): GActionParams;
    interface VypujcitZeSpisovnyHromadnePreActionInput {
        /**
         * (Defaut: "DokumentyASpisy")
         */
        Rezim: /*"Dokumenty" | "Spisy" |*/ "DokumentyASpisy" | "Baliky";
        /**PID. (IxsObj)*/
        Ixss: string[];
    }
    /**
     * Vypůjčí ze spisovny.
     *
     * @author  TFeik
     * @date    19.06.2021=4
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function VypujcitZeSpisovnyHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<VypujcitZeSpisovnyHromadnePreActionInput>, Isl.GServiceGroupResponse<Gordic.Spi.Interface.GVypujcitZeSpisovnyHromadneResponseDto>>): GActionParams;
    interface PremistitDokumentSpisPreActionInput {
        /**
         * Identifikátory dokumentů / spisů, který budou přemístěny.
         * @type {string[]}
         */
        Ixps: string[];
        /**
         * Identifikátor balíku, ve kterém je dokument / spis nyní umístěn a bude z něj přesunut pryč.
         * @type {string}
         */
        IxsZupCurrent: string;
        /**
        * stav balíku
        * @type {number}
        */
        StavSul: Gordic.Ginis.DbModel.GSpicsulEnum;
    }
    interface ZmeniFormuDokumentSpisPreActionInput {
        /**
         * Identifikátor dokumentu / spisu, který bude přemístěn.
         * @type {string}
         */
        Selected: Gordic.General.ApplicationInterface.GIxpDatZmena[];
        IxsSpi: string;
    }
    /**
     * Přemístí dokument / spis (vloží) do jiného balíku.
     *
     * @author  TFeik
     * @date    04.12.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function PremistitDokumentSpisDoJinehoBaliku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<PremistitDokumentSpisPreActionInput>, Isl.GServiceActionResponse<Interface.GPremistitDokumentSpisActionResponseDto>>): GActionParams;
    /**
     * Přidá balík do poznámkového bloku balíků.
     *
     * @author  TFeik
     * @date    10.02.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GVypujckaGroupRequestDto} input
     * @returns {GActionParams}
     */
    function PridejBalikDoPoznamkovehoBloku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.GPridejBalikDoPoznamkovehoBlokuActionRequestDto, Isl.GServiceActionResponse<Interface.GPridejBalikDoPoznamkovehoBlokuActionResponseDto>>): GActionParams;
    /**
     * OtevriVytvoreniuBaliku
     *
     * @param {Gin.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailBalikuDialogParams>} [input]
     * @returns {GActionParams}
     */
    function OtevriVytvoreniuBaliku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Pick<WebClient.GDetailBalikuDlgInputParams, 'InputData' | 'IsRezimSpisovna'>>, WebClient.GDetailBalikuDlgReturnValue>): GActionParams;
}
declare namespace Gordic.Spi.Icons {
    enum ActionEnum {
        pridelitDoSpisovny = "gi-redistribuce",
        stornoPridelitDoSpisovny = "gi-ban",
        ulozit = "gi-download",
        pripravitSkartNavrh = "gi-list",
        provestSkartRizeni = "gi-list",
        zmenitSpisovyZnak = "gi-spis_skladani",
        generovatSIP = "gi-sip_balicek",
        generovatSIPProPosouzeni = "gi-sip_balicek_posouzeni",// "gi-sip_balicek|gi-stack-pos--rb gi-posoudit_vahy gi-bgw--rect",
        generovatSIPProArchivaci = "gi-sip_balicek_archivace",// "gi-sip_balicek|gi-stack-pos--rb gi-vyrizeno_archiv gi-bgw",
        generovatSIPProVyber = "gi-sip_balicek_vyber",// "gi-sip_balicek|gi-stack-pos--rb gi-check gi-bgw--rect",
        vypujcit = "gi-send",
        doplnitSpousteciUdalost = "gi-generate",
        prepocitatDleObsahu = "gi-generate",
        odemknout = "gi-unlock",
        odlozit = "fa-arrow-right"
    }
}
declare namespace Gordic.Spi.Globals {
    function VyberSpisovny(): JQuery<HTMLElement>;
    enum ActionsName {
        pridelitDoSpisovny = "actPridelitDoSpi",
        stornoPrideleniDoSpisovny = "actStornoPrideleniDoSpi",
        zobrazitDetailBaliku = "actDetailBaliku",
        zobrazitDetailVypujcnihoListku = "actDetailVypujcnihoListku",
        kontrolaPredPridelenimDoSpisovny = "actKontrolaPredPridelenimDoSpi",
        kontrolaPredPrevzetimDoSpisovny = "actKontrolaPredPrevzetiDoSpi",
        prevzitDoSpisovny = "actPrevzitDoSpi",
        vyjmoutZUloznehoMista = "actVyjmoutZUloznehoMista",
        pridatDoPracBlokuBaliku = "actPridatDoPracBlokuBaliku",
        pridatDoPracBlokuDokSpis = "actPridatDoPracBlokuDokSpis",
        vratitZVypujcky = "actVratitZVypujcky",
        ztratitZVypujcky = "actZtratitZVypujcky",
        vytvoritZadostOVypujceniZeSpisovny = "actVytvoritZadostOVypujceniZeSpisovny",
        schvalitZadostOVypujcku = "actSchvalitZadostOVypujcky",
        zamitnoutZadostOVypujcku = "actZamitnoutZadostOVypujcku",
        stornovatZadostOVypujcku = "actStornovatZadostOVypujcku",
        ztratit = "actNevracenoZVypujcky",
        zmenaTerminuVraceni = "actZmenaTerminuVraceni",
        pripravitSkartNavrh = "actPripravitSkartNavrh",
        provestSkartRizeni = "actProvestSkartRizeni",
        prejmenovat = "actPrejmenovat",
        delimitovat = "actDelimitovat",
        docasneVyraditZeSkartRizeni = "actVyraditZeSkartRizeni",
        vyraditZeSkartNavrhu = "actVyraditZeSkartNavrhu",
        pridatBalikDoSkartNavrhu = "actPridatBalikDoSkartNavrhu",
        pridatEntituDoSkartNavrhu = "actPridatEntituDoSkartNavrhu",
        precislovat = "actPrecislovat",
        preraditNaA = "actPreraditNaA",
        preraditNaS = "actPreraditNaS",
        zaraditZpetDoSkartRizeni = "actZaraditZpetDoSkartRizeni",
        prepocetRokuSkartace = "actPrepocetRokuSkartace",
        zmenitSpisovyZnak = "actZmenitSpisovyZnak",
        zmenitSkartRokSkartace = "actZmenitSkartRokSkartace",
        zmenitSkartZnak = "actZmenitSkartZnak",
        zmenitUlozeni = "actZmenitUlozeni",
        zmenitVlastnika = "actZmenitVlastnika",
        generovatSIP = "actGenerovatSIP",
        nacistDavkuZNDA = "actNacistDavkuZNDA",
        vymazatMetadata = "actVymazatMetadata",
        odemknout = "actOdemknout",
        oznacitJakoSmazane = "actOznacitJakoSmazane",
        kontrolaPredSmazanim = "actKontrolaPredSmazanim",
        pripravitKeSmazani = "actPripravitKeSmazanim",
        odebratVlastnictvi = "actOdebratVlastnictvi",
        zrusitOznaceniKeSmazani = "actZrusitOznaceniKeSmazani",
        zrusitPozastaveni = "actZrusitPozastaveni",
        vypujcit = "actVypujcit",
        vypujcitAZobrazit = "actVypujcitAZobrazit",
        prenestDoDigitSpi = "actPrenestDoDigitSpi",
        aktualizovatStav = "actAktualizovatStav",
        ulozit = "actUlozit",
        automatickyUlozit = "actAutomatickyUlozit",
        pregenerovatSIP = "actPregenerovatSIP",
        doplnitSpousteciUdalost = "actDoplnitSpousteciUdalost",
        vratitZtraceny = "actVratitZtraceny",
        setPredavajiciDleEntity = "actSetPredavajiciDleEntity",
        prepocitatDleObsahu = "actPrepocitatDleObsahu",
        vyjmoutZeSpisovny = "actVyjmoutZeSpisovny",
        vyjmoutZeSkartNavrhu = "actVyjmoutZeSkartNavrhu",
        vyjmoutZBaliku = "actVyjmoutZBaliku",
        predatSpisovne = "actPredatSpisovne",
        stornovatPrideleniSpisovne = "actStornovatPrideleniSpisovne",
        vyjmoutZeSkartNavrhuSVlozenimDoBaliku = "actVyjmoutZeSkartNavrhuSVlozenimDoBaliku",
        tiskStitkuBaliku = "actTiskStitkuBaliku",
        tiskVypujcnihoListku = "actTiskVypujcnihoListku",
        vybratPracovniBlok = "actVybratPracovniBlok",
        odlozirSpoUda = "actOdlozirSpoUda",
        posunRokSpoUda = "actPosunRokSpoUda"
    }
    function SekceFormaFilter(opt?: {
        value?: Gordic.Spi.Interface.GFormaEntityFilterDto;
    }): Gordic.Forms.FormRow[];
    function GenerovatSIPAsynchronne(input: Gordic.Spi.Interface.GGenerovaniSIPReguestDto): void;
    function GenerovatSIPAsynchronneDone(): void;
    function MazatMetadataAsynchronne(input: Gordic.Spi.Interface.GMazaniMetadatReguestDto): void;
    function MazatMetadataAsynchronneDone(): void;
    interface IsNeevidovanyDokumentSpisInput {
        priz_neevid?: number | null;
        stav_sul?: number | null;
    }
    /**
     * export function IsNeevidovanyDokumentSpis
     *
     * @param {{ priz_neevid?: number} input
     * @returns {boolean}
     */
    function IsNeevidovanyDokumentSpis(input: IsNeevidovanyDokumentSpisInput): boolean;
}
declare namespace Gordic.Spi.Utils {
    function NovyBalik(veSpisovne: boolean, ixpProPrednastaveniBaliku: string | null | undefined, SpisovyZnakDisabled: boolean | undefined, CloseAfterSave: boolean | undefined, parentContent: GContent): void;
    function NovyBalikDlg(parentContent: GContent, opt: Interface.GNovyBalikOptionsDto, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<WebClient.GDetailBalikuDlgReturnValue | undefined>;
    function ZmenaSpisovny(parentContent: GContent): void;
    function vlozitDoBaliku(content: GContent, promise: JQuery.Deferred<any>, IxpsProVlozeni: string[], IxsZup: string, noveVytvorenyBalik: boolean): void;
    function VytvoritZadostOVypujceniZeSpisovnySVyberemEntity(): JQuery.Promise<string>;
    function VytvoritZadostOVypujceniZeSpisovny(ixs: string): JQuery.Promise<string>;
    function GetSrv(): GContent<IGContentBase, any>;
    /**
     * Vybere spisovnu a vrátí ixsSpi.
     * V případě, že je k dispozici více než 1 spisovna, pak zobrazí dialog uživateli a ten zvolí konkrétní spisovnu.
     *
     * @author TFeik
     * @date    30.10.2018
     *
     * @param {GContent} parentContent Content sloužící pro případné zobrazní dialogu.
     * @returns {JQuery.Promise<string | undefined>} Promise ixs spisovny (ixsSpi).
     */
    function VyberSpisovnu(parentContent: GContent): JQuery.Promise<Data.Readers.SpisspiDto | undefined>;
    function registerSpiScripts(): void;
    /**
     * Zaregistruje vybraná hledání (searchResolvery) do obecného hledacího políčka.
     * Hledání balíků.
     *
     * @author  TFeik
     * @date    26.08.2019
     */
    function registerSearchResolvers(): void;
    /**
     * Vrátí IconTemplate pro stav balíku.
     *
     * @author  TFeik
     * @date    02.05.2022
     *
     * @param {Gordic.Ginis.DbModel.GSpicsulEnum | null} [value]
     * @returns {IconTemplate}
     */
    function GetSpicsulEnumIconTemplate(value?: Gordic.Ginis.DbModel.GSpicsulEnum | null): IconTemplate;
}
declare namespace Gordic.Spi.AppSettings {
    function SpiPrintSettingsForm(): Forms.Form;
}
declare namespace Gordic.Spi.AppSettings {
    /**
     * Cesta k objetu nastavení zásilky v GStore.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    const SettingsPath = "Global.Spi.AppSettings.SpiSettings";
    /**
     * Vrátí hodnoty uživatelského nastavení zásilky.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @returns {Gordic.Spi.WebClient.GSpiSettingsDto} Hodnoty uživatelského nastavení zásilky.
     */
    function GetSpiSettings(): Gordic.Spi.WebClient.GSpiSettingsDto;
    /**
     * Nastaví hodnoty uživatelského nastavení zásilky.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @param {Gordic.Spi.AppSettings.GSpiSettings | null} value Hodnoty uživatelského nastavení zásilky.
     */
    function SetSpiSettings(value: Gordic.Spi.WebClient.GSpiSettingsDto | null): void;
    /**
     * Formulář uživatelského nastavení vypravení.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    function SpiSettingsForm(modul: string): Forms.Form;
}
declare namespace Gordic.Spi.Lists {
    class AutomatickeUkladaniBalikuDlg extends GContentBase<BalikySObsahemListBaseAC> {
        model: Interface.GUkladaniDto;
        ActionOznacitJakoSmazaneEnabled: boolean;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        SetInfo(): void;
        LoadData(): void;
        ZpracujData(): void;
        ApplyModel(): void;
        ReloadData(): void;
        ExitClick(): void;
    }
}
declare namespace Gordic.Spi.Dlg {
    class DoplneniSpousteciUdalostiDlg extends GContentBase {
        IsGDUInstalace: boolean;
        model: Spi.Interface.GRokDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class ExportSpisovehoPlanuDlg extends GContentBase<Wfl.ListAC.WflListBaseAC> {
        model: Wfl.Interface.GTextDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Dlg {
    class RokSkartEditDlg extends GContentBase {
        model: Wfl.Interface.ZmenaSpisZnakuStru;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Dlg {
    class SkartZnakEditDlg extends GContentBase {
        model: Wfl.Interface.ZmenaSpisZnakuStru;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Dlg {
    class SpisovyZnakEditDlg extends GContentBase {
        model: Wfl.Interface.ZmenaSpisZnakuStru;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Dlg {
    class UlozeniDoSpisovnyDlg extends GContentBase {
        TypZobrazeni: Spi.Interface.TypZobrazeniUlozeniDoSpisovny;
        isInit: boolean;
        model: Spi.Interface.GUlozeniDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Dlg {
    class VlastnikEditDlg extends GContentBase {
        model: Wfl.Interface.GSuFunRefDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Dlg {
    class VyjmoutZeSpisovnyDlg extends GContentBase {
        IsGDUInstalace: boolean;
        model: Spi.Interface.GVyjmutiZeSpisovnyDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Dlg {
    class VypujceniZeSpisovnyDlg extends GContentBase {
        IsGDUInstalace: boolean;
        model: Wfl.Interface.GVypujceniDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Dlg {
    class ZadaniSpisovnyDlg extends GContentBase<Gordic.Wfl.AC.WflBaseAC> {
        onContentReady(): void;
        CreateActionSetVychoziSpisovna(): GAction;
        OKClick(): void;
        CloseWin(): void;
        /**
         * Vrátí hodnotu políčka spisovny.
         *
         * @author TFeik
         * @date    05.12.2018
         *
         * @returns {Gordic.Data.Readers.SpisspiDto} Dto vybrané spisovny.
         */
        private GetSelectedSpi;
    }
}
declare namespace Gordic.Spi.Dlg {
    class ZadostOVypujceniZeSpisovnyDlg extends GContentBase {
        IsGDUInstalace: boolean;
        model: Wfl.Interface.GEntitaKVypujceniInfoDto;
        OdeslatZadost: boolean;
        FormaEnabled: boolean;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.WebClient {
    interface GDetailBalikuDlgInputParams {
        /**
         * Ixs balíku.
         * @type {string}
         */
        IxsZup?: string;
        /**
         * Způsob ověvření detailu (View, Edit, New).
         * @type {Gin.Interface.TypZobrazeniEntity}
         */
        TypZobrazeniDetailu?: Gin.Interface.TypZobrazeniEntity;
        /**
         * Příznak, zda chceme získat standardní písemnosti (default) a nebo rozšířené.
         * @type {boolean}
         */
        RozbalenePisemnosti?: boolean;
        /**
         * Příznak, zda chceme získat standardní písemnosti (default) a nebo rozšířené.
         * @type {boolean}
         */
        SpisovyZnakDisabled?: boolean;
        /**
         * Grid - seznam balíků pro posun šipkami na předchozí/následující řádek.
         * @type {JQuery<HTMLElement>}
         */
        Grid?: JQuery<HTMLElement>;
        /**
         * Vstupní data pro přednastavení hodnot při nově vytvářeném balíku.
         * @type {Gordic.Spi.Interface.GBalikDto}
         */
        InputData?: Gordic.Spi.Interface.GBalikDto | null;
        /**
         * Identifikátor dokumentu pro přednastavení hodnot při nově vytvářeném balíku.
         * @type {string}
         */
        InputDataIxp?: string | null;
        /**
         * Pokud je true, pak je dialog po úspěšném uložení automaticky zavřen.
         * @type {boolean}
         */
        CloseAfterSave?: boolean;
        /**
         * TaskId
         * @type {string}
         */
        TaskId?: string;
        /**
         * Příznak, zda se má balík vytvářet v režimu spisovny.
         * @type {boolean}
         */
        IsRezimSpisovna?: boolean;
    }
    interface GDetailBalikuDlgReturnValue {
        Balik?: Interface.GBalikDto;
        IsSaved?: boolean;
    }
    /**
     * Interface dat gridu, po kterém je možné přesouvat se pomocí šipek na detailu.
     *
     * @author  TFeik
     * @date    08.07.2019
     * @since   482.1.0.520
     */
    interface GDetailBalikuDlgListSupportData {
        ixs_zup?: string;
        IxsZup?: string;
    }
    /**
     * GDetailBalikuDlg
     *
     * @author TFeik
     * @since 480.1.0.286
     */
    class GDetailBalikuDlg extends GContentBase implements DetailBuilderComponents.GSpiDetailBalikuComponentContentRequirements, DetailBuilderComponents.GSpiDetailBalikuObsahComponentContentRequirements {
        readonly Balik?: Interface.GBalikDto;
        private readonly TaskId?;
        IsSaved?: boolean;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    17.07.2017
         */
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(this: GDetailBalikuDlg & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<GDetailBalikuDlgListSupportData>, builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private _getListControlsSettings;
        closing(): JQueryPromise<GDetailBalikuDlgReturnValue>;
    }
}
declare namespace Gordic.Spi.WebClient {
    interface GroupResult {
        /**
         * Je identifikátor validní? (má validní metadata)
         * @type {boolean}
         */
        IsError: boolean;
        /**
         * Identifikátor
         * @type {string}
         */
        Key: string;
        /**
         * Zpráva o chybě
         * @type {string}
         */
        Error?: string;
        /**
         * Označení řádku:
         * Provedeno = 2 (Provedeno - akce se zdarila (modrá fajfka)),
         * Neprovedeno = 3 (Neprovedeno - akce se nepodarila (cervený krízek)),
         * ProvedenoSUpozornenim = 4 (bylo provedeno, ale nejaký problém se objevil (warning - zluty obdelnik))
         * @type {number}
         */
        OznaceniRadku: number;
    }
    interface VlozitDokumentySpisyDoBalikuOutput {
        IslResults: Gordic.Isl.GServiceActionResponse<GVlozitDokumentSpisDoBalikuOutputDto>[];
        GroupResult: GroupResult[];
        SuccessCount: number;
        FailedCount: number;
    }
    /**
     * GDetailBalikuHandler
     *
     * @author TFeik
     * @since 480.1.0.37
     */
    class GDetailBalikuHandler {
        /**
         * Serverový content pro GDetailBalikuHandler.
         * @type {GContent | undefined}
         */
        private static DetailBalikuHandlerServer;
        /**
         * GetServer
         *
         * @author TFeik
         * @date    22.08.2018
         */
        private static GetServer;
        /**
         * kontrolaMetadat
         *
         * @author TFeik
         * @date    22.08.2018
         *
         * @param {GContent} parentContent
         * @param {string} ixsZup
         * @returns {JQuery.Promise<boolean>}
         */
        static kontrolaMetadat(parentContent: GContent, ixsZup: string, jeVeSpisovne: boolean): JQueryPromise<Gin.Interface.GResultInfo[]>;
        /**
         * Vytvoří sloupce gridu Historie změn balíku.
         *
         * @author TFeik
         * @date    24.10.2018
         *
         * @returns {Gordic.Data.GridFormat<GHistorieZmenBalikuDto>}
         */
        static CreateHistorieZmenGridBalikuColumns(): Gordic.Data.GridFormat<Interface.GHistorieZmenBalikuDto>;
        /**
         * Vytvoří grid Historie změn balíku.
         *
         * @author TFeik
         * @date    24.10.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {GGridOptions<GHistorieZmenBalikuDto>} [gridOpt] Options gridu.
         * @returns {JQuery<HTMLElement>}
         */
        static CreateHistorieZmenBalikuGrid(appentTo: JQuery<HTMLElement>, gridOpt?: GGridOptions<Interface.GHistorieZmenBalikuDto>): JQuery<HTMLElement>;
        /**
         * Vytvoří sloupce gridu Historie pohybu balíku.
         *
         * @author TFeik
         * @date    24.10.2018
         *
         * @returns {Gordic.Data.GridFormat<GHistoriePohybuBalikuDto>}
         */
        static CreateHistoriePohybuBalikuGridColumns(): Gordic.Data.GridFormat<Interface.GHistoriePohybuBalikuDto>;
        /**
         * Vytvoří grid Historie pohybu balíku.
         *
         * @author TFeik
         * @date    24.10.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {GGridOptions<GHistoriePohybuBalikuDto>} [gridOpt] Options gridu.
         * @returns {JQuery<HTMLElement>}
         */
        static CreateHistoriePohybuBalikuGrid(appentTo: JQuery<HTMLElement>, gridOpt?: GGridOptions<Interface.GHistoriePohybuBalikuDto>): JQuery<HTMLElement>;
        /**
         * Vytvoří sloupce gridu Historie pohybu balíku.
         *
         * @author TFeik
         * @date    24.10.2018
         *
         * @returns {Gordic.Data.GridFormat<Interface.GBalikPisemnostDto>}
         */
        static CreateObsahBalikuGridColumns(multi: boolean | undefined | null, vecneSkupiny: boolean | undefined | null): Gordic.Data.GridFormat<Interface.GBalikPisemnostDto>;
        /**
         * Vytvoří grid Historie pohybu balíku.
         *
         * @author TFeik
         * @date    24.10.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {GGridOptions<GHistoriePohybuBalikuDto>} [gridOpt] Options gridu.
         * @returns {JQuery<HTMLElement>}
         */
        static CreateObsahBalikuGrid(appentTo: JQuery<HTMLElement>, gridOpt: GGridOptions<Interface.GBalikPisemnostDto> | undefined | null, vecneSkupiny: boolean | undefined | null): JQuery<HTMLElement>;
        /**
         * Přidělí balík spisovně.
         *
         * @author  TFeik
         * @date    02.11.2018
         *
         * @param {GContent} parentContent Nadřazený content.
         * @param {string | string[]} ixsZup Ixs balíku.
         * @returns {JQuery.Promise<Gin.WebClient.GBaseReturnDto<Interface.GBalikDto>>} Promise aktualizovaných dat balíku a informací o výsledku přidělení spisovně.
         */
        static PridelitBalikSpisovne(parentContent: GContent, ixsZup: string, readRequest?: Interface.GBalikActionReadRequestDto): JQuery.Promise<Isl.GServiceActionResponse<Interface.GPridelitSpisovneActionResponseDto>>;
        static PrepocetBalikuDleObsahu(parentContent: GContent, ixsZup: string): JQuery.Promise<Gin.WebClient.GBaseReturnDto<GPrepocetBalikuDleObsahuRetValDto>>;
        static VyberRokSpousteciUdalosti(parentContent: GContent): JQuery.Promise<number | undefined>;
        static VytvorSpousteciUdalostBaliku(parentContent: GContent, ixsZup: string, datZmena: JsonDate, readRequest?: Interface.GBalikActionReadRequestDto): JQuery.Promise<Isl.GServiceActionResponse<Interface.GBalikDto>>;
        static VymazatDataPoSkartacnimRizeni(parentContent: GContent, ixsZup: string, kontrola: boolean): JQuery.Promise<Gin.WebClient.GBaseReturnDto<Interface.GBalikDto>>;
        /**
         * HledatBaliky
         *
         * @author  TFeik
         * @date    10.12.2018
         *
         * @param {Hledani.GHledaniZasilekDto} dto
         * @returns {JQuery.Promise<Interface.GSeznamZasilekDto[]>}
         */
        static HledatBaliky(dto: Interface.GHledaniBalikuDto, typHledaniBaliku?: Interface.TypHledaniBaliku): JQuery.Promise<Interface.GSpiUniversalListDto[]>;
        /**
         * GenerujSIPBalikyObsahuBaliku
         *
         * @author  TFeik
         * @date    07.01.2019
         *
         * @param {GGenerujSIPBalikyObsahuBalikuInputDto} inputDto
         * @returns {JQuery.Promise<GGenerujSIPBalikyObsahuBalikuOutputDto>}
         */
        static GenerujSIPBalikyObsahuBaliku(inputDto: GGenerujSIPBalikyObsahuBalikuInputDto): JQuery.Promise<GGenerujSIPBalikyObsahuBalikuOutputDto>;
        /**
         * Vygeneruje sip balíky pro zadaný balík a dle nastavení stáhne vygenerovaný soubor.
         *
         * @author  TFeik
         * @date    26.05.2020
         *
         * @param {GGenerujSIPBalikyObsahuBalikuInputDto} inputDto
         * @returns {JQuery.Promise<Gordic.Isl.GServiceActionResponse<GGenerujSIPBalikyObsahuBalikuOutputDto>>}
         */
        static GenerujSIPBaliky(inputDto: GGenerujSIPBalikyInputDto): JQuery.Promise<GGenerujSIPBalikyOutputDto>;
        /**
         * VlozitDokumentySpisyDoBaliku
         *
         * @author  TFeik
         * @date    27.02.2020
         *
         * @param {GContent} parentContent
         * @param {Omit<GVlozitDokumentSpisDoBalikuInputDto, 'Ixp'> & { Ixps: (string | null | undefined)[]} inputDto
         * @returns {JQuery.Promise<Gordic.Isl.GServiceActionResponse<GVlozitDokumentSpisDoBalikuOutputDto>[]>}
         */
        static VlozitDokumentySpisyDoBaliku(parentContent: GContent, inputDto: Omit<GVlozitDokumentSpisDoBalikuInputDto, 'Ixp'> & {
            /**Ixp (pid) vkládaných písemností.*/
            Ixps?: (string | null | undefined)[] | null;
            /**
             * (default: false) Příznak, zda se má vykonat vložení pro všechny identifikátory nehledě na to jak dopane [true], nebo zda se má po chybném vložení oprace ukončit [false].
             * @type {boolean}
             */
            ContinueWhenNonFatal?: boolean | null;
        }): JQuery.Promise<VlozitDokumentySpisyDoBalikuOutput>;
        private static VlozitDokumentSpisDoBalikuVlozitParovyDokumentTemp?;
        /**
          * Vloží dokument / spis do balíku.
          *
          * @author  TFeik
          * @date    07.01.2019
          *
          * @param {GContent} parentContent Nadřazený content, na kterém se zobrazují případné dialogy.
          * @param {GVlozitDokumentSpisDoBalikuInputDto} inputDto Vstupní data metody.
          * @returns {JQuery.Promise<Gordic.Isl.GServiceActionResponse<GVlozitDokumentSpisDoBalikuOutputDto>>}
          */
        static VlozitDokumentSpisDoBaliku(parentContent: GContent, inputDto: GVlozitDokumentSpisDoBalikuInputDto): JQuery.Promise<Gordic.Isl.GServiceActionResponse<GVlozitDokumentSpisDoBalikuOutputDto & GVlozitDokumentSpisDoBalikuOutputUserChoicesDto>>;
        /**
         * Převede pole písmností na pole identifikátorů.
         *
         * @author  TFeik
         * @date    10.12.2019
         *
         * @param {Interface.GBalikPisemnostDto[]} [pisemnosti]
         * @returns {string[]}
         */
        static PisemnostiToIxp(pisemnosti?: Interface.GBalikPisemnostDto[]): string[];
        /**
         * checkPidFieldAndAdjustObsahField
         *
         * @author TFeik
         * @date    14.03.2019
         *
         * @param {{ parentContent: GContent, $ixpField: JQuery<HTMLElement>, $obsahBalikuField: JQuery<HTMLElement>} input
         * @returns {JQuery.Promise<}
         */
        static checkPidFieldAndAdjustObsahField(input: {
            parentContent: GContent;
            $ixpField: JQuery<HTMLElement>;
            $obsahBalikuField: JQuery<HTMLElement>;
            pisemnosti: Interface.GBalikPisemnostDto[];
        }): JQuery.Promise<{
            countToCheck?: number;
            countOfChecked?: number;
        } | undefined>;
        /**
         * Zkontroluje kolik z píseností je již ověřených a zobrazí informaci o aktuálním stavu na contentu.
         *
         * @author  TFeik
         * @date    09.12.2019
         *
         * @param {{ parentContent: GContent, $ixpField: JQuery<HTMLElement>, $obsahBalikuField: JQuery<HTMLElement>} input
         * @returns {JQuery.Promise<}
         */
        static zobrazitStavKontrolyObsahuBaliku(input: {
            parentContent: GContent;
            $ixpField: JQuery<HTMLElement>;
            $obsahBalikuField: JQuery<HTMLElement>;
            pisemnosti: Interface.GBalikPisemnostDto[];
        }): JQuery.Promise<{
            countToCheck?: number;
            countOfChecked?: number;
        }>;
    }
}
declare namespace Gordic.Spi.WebClient {
    /**
     * GDetailBalikuHistorieDlg
     *
     * @author TFeik
     * @since 480.1.0.20
     */
    class GDetailBalikuHistorieDlg extends GContentBase {
        /**
         * HistoriePohybuBaliku
         * @type {GHistoriePohybuBalikuDto[]}
         */
        private readonly HistoriePohybuBaliku?;
        /**
         * HistorieZmenBaliku
         * @type {GHistoriePohybuBalikuDto[]}
         */
        private readonly HistorieZmenBaliku?;
        /**
         * $GridHistoriePohybu
         * @type {JQuery}
         */
        private $GridHistoriePohybu?;
        /**
         * $GridHistorieZmen
         * @type {JQuery}
         */
        private $GridHistorieZmen?;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    17.07.2018
         */
        onContentReady(): void;
        /**
         * Zobrazí grid dle daného jména a skryje ostatní.
         *
         * @author  TFeik
         * @date    12.02.2019
         *
         * @param {gridNames} gridName Jméno gridu, který bude zobrazen.
         */
        private showGrid;
        /**
         * Vytvoří seznam historie pohybů balíku.
         *
         * @author  TFeik
         * @date    17.07.2018
         */
        private _createGridHistoriePohybu;
        /**
         * Vytvoří seznam historie změn balíku.
         *
         * @author  TFeik
         * @date    17.07.2018
         */
        private _createGridHistorieZmen;
    }
}
declare namespace Gordic.Spi.WebClient {
    interface GDetailBalikuKontrolaObsahuDlgInputParams {
        /**
         * Ixs balíku.
         */
        IxsZup: string;
        /**
         * (Default: null) Ixp dokumebtů / spisů, které budou rovnou označeny jako zkontrolované.
         */
        SelectexIxp?: string[];
        /**
         * (Default: false) Pokud je příznak nastaven, pak zobrzí dialog pro výběr souboru
         * s již zkontrolovanými identifikátory a ty následně rovnou označí jako zkontrolované.
         * @type {boolean}
         */
        SImportemJizProvedenych?: boolean;
    }
    interface GDetailBalikuKontrolaObsahuDlgReturnValue {
    }
    /**
     * "Dto" formuláře kontroly obsahu balíku.
     *
     * @author TFeik
     * @since 482.1.0.119
     */
    interface KontrolaObsahuDto {
        /**
         * PID písemnosti ke kontrole.
         * @type {string}
         */
        Ixp?: string;
        /**
         * Pole pidů písemnosti v balíku.
         * @type {string[]}
         */
        Ixps?: string[];
    }
    /**
     * Detail balíku - Kontrola obsahu.
     *
     * @author TFeik
     * @since 482.1.0.119
     * @date    13.03.2019
     */
    class GDetailBalikuKontrolaObsahuDlg extends GContentBase {
        /**
         * IxsZup
         * @type {string}
         */
        private readonly IxsZup?;
        /**
         * Ixp dokumebtů / spisů, kterébudou rovnou označeny jako zkontrolované.
         * @type {string[]}
         */
        private readonly SelectexIxp?;
        /**
         * Pokud je příznak nastaven, pak zobrzí dialog pro výběr souboru
         * s již zkontrolovanými identifikátory a ty následně rovnou označí jako zkontrolované.
         * @type {boolean}
         */
        private readonly SImportemJizProvedenych?;
        /**
         * Pisemnosti
         * @type {Interface.GBalikPisemnostDto[]}
         */
        private readonly Pisemnosti?;
        /**
         * Element s gfilefield (nezobrazuje se).
         * @type {JQuery<HTMLElement>}
         */
        private $FileField?;
        static BalikNeobsahujeIdentifikatorFlashessageId: string;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    13.03.2019
         */
        onContentReady(): void;
        /**
         * Vytvoří formulář kontroly obsahu balíku.
         *
         * @author  TFeik
         * @date    15.03.2019
         *
         * @param {{ parentContent: GContent, appentTo: JQuery<HTMLElement>, data?: Interface.GBalikPisemnostDto[]}} input
         * @returns {JQuery<HTMLElement>}
         */
        static CreateForm(input: {
            parentContent: GContent;
            appentTo: JQuery<HTMLElement>;
            data?: Interface.GBalikPisemnostDto[];
        }): JQuery<HTMLElement> | undefined;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    13.03.2019
         */
        private CreateMenu;
        private CreateFileField;
        private GetIxpsToSelectFromFile;
        private ReadIxpsToSelectFromFile;
        /**
         * Spustí serverovou logiku pro zpracování souboru
         * @param fileInfo
         */
        private ReadFile;
    }
}
declare namespace Gordic.Spi.WebClient {
    /**
     * GDetailBalikuTiskStitkuDlg
     *
     * @author TFeik
     * @since 480.1.0.37
     */
    class GDetailBalikuTiskStitkuDlg extends GContentBase {
        /**
         * IxsZup
         * @type {string[]}
         */
        private readonly IxsZup?;
        /**
         * TypTiskuStitku
         * @type {Gordic.Spi.WebClient.TypTiskuStitkuEnum}
         */
        private readonly TypTiskuStitku?;
        /**
         * $Form
         * @type {JQuery<HTMLElement> | undefined}
         */
        private $Form;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    21.08.2018
         */
        onContentReady(): void;
        /**
         * createForm
         *
         * @author  TFeik
         * @date    21.08.2018
         *
         * @param {JQuery<HTMLElement>} appentTo
         */
        createForm(appentTo: JQuery<HTMLElement>): JQuery<HTMLElement>;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    21.08.2018
         */
        private _createMenu;
    }
}
declare namespace Gordic.Spi.DetailBuilderComponents {
    interface changeEventFlags {
        initialValues?: boolean;
        ignoreChange?: boolean;
    }
    export interface GSpiDetailBalikuComponentContentRequirements extends GContent {
        Balik?: Interface.GBalikDto;
        IsSaved?: boolean;
        RokSkartaceLastUsedValue?: number;
    }
    export interface GSpiDetailBalikuComponentContentExtensions {
        tryReloadDetail: (this: GSpiDetailBalikuComponentContentRequirements, params?: any, opt?: any) => void;
        reloadDetail: (this: GSpiDetailBalikuComponentContentRequirements, params?: any, opt?: any) => void;
        beforeReloadDetail: (this: GSpiDetailBalikuComponentContentRequirements) => JQueryPromise<undefined>;
        zmenaEditace: (this: GSpiDetailBalikuComponentContentRequirements, componentDto: WebClient.GSpiDetailBalikuComponentDto, opt?: any) => void;
        reload: (this: GSpiDetailBalikuComponentContentRequirements, componentDto: WebClient.GSpiDetailBalikuComponentDto, opt?: any) => void;
        ulozit: (this: GSpiDetailBalikuComponentContentRequirements, componentDto: WebClient.GSpiDetailBalikuComponentDto, loadNewData?: boolean) => JQuery.Promise<WebClient.GSpiDetailBalikuComponentDto | undefined>;
        novyBalik: (this: GSpiDetailBalikuComponentContentRequirements) => void;
        tiskStitku: (this: GSpiDetailBalikuComponentContentRequirements) => JQueryPromise<undefined>;
        enableDetailBaliku: (this: GSpiDetailBalikuComponentContent, editMode: boolean, balik: Interface.GBalikDto) => void;
        enableDetailBalikuActions: (this: GSpiDetailBalikuComponentContent, permissions: Interface.GBalikActionsPermissionDto, isEditMode: boolean, isEmpty: boolean) => void;
        enableDetailBalikuFields: (this: GSpiDetailBalikuComponentContent, permissions: Interface.GBalikFieldsPermissionDto) => void;
        setDetailBalikuData: (this: GSpiDetailBalikuComponentContent, data: Interface.GBalikDto, flags?: changeEventFlags) => void;
        getDetailBalikuData: (this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto) => Interface.GBalikDto;
        updateDetailBalikuData: (this: GSpiDetailBalikuComponentContent, balik: Interface.GBalikDto, componentDto: WebClient.GSpiDetailBalikuComponentDto) => Interface.GBalikDto;
        setDetailBaliku: (this: GSpiDetailBalikuComponentContent, balik: Interface.GBalikDto, componentDto: WebClient.GSpiDetailBalikuComponentDto) => void;
        _createStatusBar: (data?: Interface.GBalikDto) => MenuParams[];
        updateStatusBar: (this: GSpiDetailBalikuComponentContent, data?: Interface.GBalikDto) => void;
        stornovat: (this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto) => JQuery.Promise<Gin.WebClient.GBaseReturnDto<Interface.GBalikDto>>;
        kontrolaMetadat: (this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto) => JQueryPromise<Gin.Interface.GResultInfo[]>;
        generujPidBaliku: (this: GSpiDetailBalikuComponentContent) => JQuery.Promise<string>;
        pridelitSpisovne: (this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto) => JQuery.Promise<Gin.WebClient.GBaseReturnDto<Interface.GBalikDto>>;
        stornoPrideleniBalikuSpisovne: (this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto) => JQuery.Promise<Gin.WebClient.GBaseReturnDto<Interface.GBalikDto>>;
        prepocetBalikuDleObsahu: (this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto) => JQuery.Promise<Gin.WebClient.GBaseReturnDto<WebClient.GPrepocetBalikuDleObsahuRetValDto>>;
        vytvorSpousteciUdalostBaliku: (this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto) => JQuery.Promise<Gin.WebClient.GBaseReturnDto<Interface.GBalikDto>>;
        vymazatDataPoSkartacnimRizeni: (this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto) => JQuery.Promise<Gin.WebClient.GBaseReturnDto<Interface.GBalikDto>>;
        GetValidationGroups: (this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto) => string[];
        prepocitatRokSkartace: (this: GSpiDetailBalikuComponentContent) => JQuery.Promise<any>;
        createReadActionRequest: (this: GSpiDetailBalikuComponentContent, componentDto?: WebClient.GSpiDetailBalikuComponentDto) => Interface.GBalikActionReadRequestDto | undefined;
    }
    export interface GSpiDetailBalikuComponentContent extends GSpiDetailBalikuComponentContentRequirements, GSpiDetailBalikuComponentContentExtensions {
    }
    /**
     * SslHeader
     *
     * @author TFeik
     * @since 480.1.0.11
     */
    export class GSpiDetailBalikuComponent {
        /**
         * create
         *
         * @author TFeik
         * @date    27.08.2018
         *
         * @param {any} content
         * @param {any} componentDto
         */
        static create(content: GSpiDetailBalikuComponentContentRequirements, componentDto: WebClient.GSpiDetailBalikuComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        private static _createContentExtensions;
        private static _createTabs;
        /**
         * _createHeaderForm
         *
         * @author TFeik
         * @date    28.08.2018
         *
         * @param {Interface.GBalikDto} componentDto
         * @param {boolean} isNovyBalik
         * @returns {Forms.Form}
         */
        private static _createHeaderForm;
        /**
         * generujPidBaliku
         *
         * @author TFeik
         * @date    28.08.2018
         *
         * @param {GContent} this
         */
        static generujPidBaliku(this: GSpiDetailBalikuComponentContent): JQuery.Promise<Isl.GServiceActionResponse<Interface.GBalikDto>>;
        /**
         * function createForm
         *
         * @author TFeik
         * @date    28.08.2018
         *
         * @param {JQuery<HTMLElement>} appentTo
         */
        private static _createUlozeniForm;
        private static _createActions;
        private static _createMenuBar;
        private static _createCommandBar;
        private static _createStatusBar;
        static updateStatusBar(this: GSpiDetailBalikuComponentContent, data?: Interface.GBalikDto): void;
        private static _createProfilForm;
        /**
         * enableDetailBaliku
         *
         * @author TFeik
         * @date    16.10.2018
         *
         * @param {GContent} this
         * @param {boolean} editMode
         */
        static enableDetailBaliku(this: GSpiDetailBalikuComponentContent, editMode: boolean, balik: Interface.GBalikDto): void;
        /**
         * Nastaví enable / disable na akcích balíku dle permissions.
         *
         * @author  TFeik
         * @date    11.09.2019
         *
         * @param {GSpiDetailBalikuComponentContent} this
         * @param {Interface.GBalikActionsPermissionDto} permissions
         * @param {boolean} isEditMode
         * @param {boolean} isEmpty
         */
        static enableDetailBalikuActions(this: GSpiDetailBalikuComponentContent, permissions: Interface.GBalikActionsPermissionDto, isEditMode: boolean, isEmpty: boolean): void;
        /**
         * Nastaví enable / disable na políčkách balíku dle permissions.
         *
         * @author  TFeik
         * @date    11.09.2019
         *
         * @param {GSpiDetailBalikuComponentContent} this
         * @param {Interface.GBalikFieldsPermissionDto} permissions
         */
        private static enableDetailBalikuFields;
        static tryReloadDetail(this: GSpiDetailBalikuComponentContent, params?: any, opt?: any): void;
        static reloadDetail(this: GSpiDetailBalikuComponentContent, params?: any, opt?: any): void;
        static beforeReloadDetail(this: GSpiDetailBalikuComponentContent): JQueryPromise<undefined>;
        static zmenaEditace(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto, opt?: any): void;
        static reload(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto, opt?: any): void;
        static novyBalik(this: GSpiDetailBalikuComponentContent): void;
        static tiskStitku(this: GSpiDetailBalikuComponentContent): JQueryPromise<undefined>;
        /**
         * setDetailBalikuData
         *
         * @author TFeik
         * @date    16.10.2018
         *
         * @param {GContent} this
         * @param {Interface.GBalikDto} data
         */
        static setDetailBalikuData(this: GSpiDetailBalikuComponentContent, data: Interface.GBalikDto, flags?: changeEventFlags): void;
        /**
         * setDetailBaliku
         *
         * @author  TFeik
         * @date    02.11.2018
         *
         * @param {GSpiDetailBalikuComponentContent} this
         * @param {Interface.GBalikDto} balik
         */
        static setDetailBaliku(this: GSpiDetailBalikuComponentContent, balik: Interface.GBalikDto, componentDto: WebClient.GSpiDetailBalikuComponentDto): void;
        /**
         * getDetailBalikuData
         *
         * @author  TFeik
         * @date    16.10.2018
         *
         * @param {GContent} this
         * @param {Interface.GBalikDto} data
         */
        static getDetailBalikuData(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): Interface.GBalikDto;
        static updateDetailBalikuData(this: GSpiDetailBalikuComponentContent, balik: Interface.GBalikDto, componentDto: WebClient.GSpiDetailBalikuComponentDto): Interface.GBalikDto;
        static GetValidationGroups(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): string[];
        /**
         * ulozit
         *
         * @param {GSpiDetailBalikuComponentContent} this
         * @param {WebClient.GSpiDetailBalikuComponentDto} componentDto
         * @param {boolean} [loadNewData] (default: false) Příznak, zda se mají načíst data balíku po uložení [true]
         * @returns {JQuery.Promise<WebClient.GSpiDetailBalikuComponentDto | undefined>}
         */
        static ulozit(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto, loadNewData?: boolean): JQuery.Promise<WebClient.GSpiDetailBalikuComponentDto | undefined>;
        static stornovat(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): JQuery.Promise<Isl.GServiceActionResponse<Interface.GStornovatResponseDto>>;
        static kontrolaMetadat(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): JQueryPromise<Gin.Interface.GResultInfo[]>;
        static pridelitSpisovne(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): JQuery.Promise</*Gin.WebClient.GBaseReturnDto*/ Isl.GServiceActionResponse<Interface.GPridelitSpisovneActionResponseDto>>;
        static stornoPrideleniBalikuSpisovne(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): JQuery.Promise<Isl.GServiceActionResponse<Interface.GStornoPrideleniSpisovneActionResponseDto>>;
        static prepocetBalikuDleObsahu(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): JQuery.Promise<Gin.WebClient.GBaseReturnDto<WebClient.GPrepocetBalikuDleObsahuRetValDto>>;
        static vytvorSpousteciUdalostBaliku(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): JQuery.Promise<Isl.GServiceActionResponse<Interface.GBalikDto>>;
        static vymazatDataPoSkartacnimRizeni(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): JQuery.Promise<Gin.WebClient.GBaseReturnDto<Interface.GBalikDto>>;
        /**
         * Na základě datumu vzniku, skartační lhůty a skratační lhůty spra přepočítá rok skartace a rok převodu do správního archivu.
         *
         * @author  TFeik
         * @date    24.11.2020
         *
         * @param {GSpiDetailBalikuComponentContent} this
         * @param {WebClient.GSpiDetailBalikuComponentDto} componentDto
         * @returns {JQuery.Promise<any>}
         */
        static prepocitatRokSkartace(this: GSpiDetailBalikuComponentContent, componentDto: WebClient.GSpiDetailBalikuComponentDto): JQuery.Promise<Interface.GGetRokSkartaceASpraBalikuActionResponseDto>;
        /**
         * Vytvoří dto na čtení dat po akci z componetDto.
         *
         * @author  TFeik
         * @date    25.11.2020
         *
         * @param {WebClient.GSpiDetailBalikuComponentDto} [componentDto]
         * @returns {Interface.GBalikActionReadRequestDto | undefined}
         */
        static createReadActionRequest(this: GSpiDetailBalikuComponentContent, componentDto?: WebClient.GSpiDetailBalikuComponentDto): Interface.GBalikActionReadRequestDto | undefined;
    }
    export {};
}
declare namespace Gordic.Spi.DetailBuilderComponents {
    class GSpiDetailBalikuHistoryComponent {
        static create(componentDto?: WebClient.GSpiDetailBalikuHistoryComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
    }
}
declare namespace Gordic.Spi.DetailBuilderComponents {
    export interface GSpiDetailBalikuObsahComponentContentRequirements {
    }
    interface GroupResult {
        ixp: string;
        resultIcon?: Gordic.Gin.Interface.TypVysledkuOperace | null;
        resultIconTooltip?: string | null;
    }
    export interface GSpiDetailBalikuObsahComponentContentExtensions {
        tryReloadDetail: (this: GSpiDetailBalikuObsahComponentContent, params?: any, opt?: any) => void;
        reloadDetail: (this: GSpiDetailBalikuObsahComponentContent, params?: any, opt?: any) => void;
        beforeReloadDetail: (this: GSpiDetailBalikuObsahComponentContent) => JQueryPromise<undefined>;
        reload: (this: GSpiDetailBalikuObsahComponentContent, componentDto: WebClient.GSpiDetailBalikuObsahComponentDto, opt?: any) => void;
        enableDetailBalikuObsah: (this: GSpiDetailBalikuObsahComponentContent, componentDto: WebClient.GSpiDetailBalikuObsahComponentDto, selectedRows: Interface.GBalikPisemnostDto[]) => void;
        getSelectedRows: (this: GSpiDetailBalikuObsahComponentContent) => Interface.GBalikPisemnostDto[];
        getSelectedRowsIxp: (this: GSpiDetailBalikuObsahComponentContent) => string[];
        GroupResultApply: (this: GSpiDetailBalikuObsahComponentContent) => void;
        GroupResultClear: (this: GSpiDetailBalikuObsahComponentContent) => void;
        GroupResultAdd: (this: GSpiDetailBalikuObsahComponentContent, items: (GroupResult | undefined | null)[] | undefined | null) => void;
        GroupResultAddVypujcniListek: (this: GSpiDetailBalikuObsahComponentContent, response: Isl.GServiceGroupResponse<Interface.GVypujcniListekDto> | undefined | null) => void;
    }
    export interface GSpiDetailBalikuObsahComponentContent extends GSpiDetailBalikuObsahComponentContentRequirements, GSpiDetailBalikuObsahComponentContentExtensions, GContent {
    }
    /**
     * GSpiDetailBalikuObsahComponent
     *
     * @author TFeik
     * @since 480.1.0.12
     */
    export class GSpiDetailBalikuObsahComponent {
        /**
         * create
         *
         * @param {GContent} content
         * @param {WebClient.GSpiDetailBalikuObsahComponentDto} [componentDto]
         * @returns {Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase}
         */
        static create(content: GContent, componentDto: WebClient.GSpiDetailBalikuObsahComponentDto, config: WebClient.GSpiDetailBalikuObsahConfigDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        private static _createContentExtensions;
        private static _createTabs;
        private static _createActions;
        private static _createMenuBarTab;
        static enableDetailBalikuObsah(this: GSpiDetailBalikuObsahComponentContent, componentDto: WebClient.GSpiDetailBalikuObsahComponentDto, selectedRows: Interface.GBalikPisemnostDto[]): void;
        /**
         * getSelectedRows
         *
         * @author TFeik
         * @date 03.01.2019
         *
         * @param {GSpiDetailBalikuObsahComponentContent} this
         * @returns {Interface.GBalikPisemnostDto[]}
         */
        static getSelectedRows(this: GSpiDetailBalikuObsahComponentContent): Interface.GBalikPisemnostDto[];
        /**
         * getSelectedRowsIxp
         *
         * @author TFeik
         * @date 18.06.2024
         *
         * @param {GSpiDetailBalikuObsahComponentContent} this
         * @returns {string[]}
         */
        static getSelectedRowsIxp(this: GSpiDetailBalikuObsahComponentContent): string[];
        /**
         * Převede pole GBalikPisemnostDto na pole stringů obsahující hodnotu ixp.
         * Hodnoty null či prázdné znaky jsou ignorovány.
         *
         * @author TFeik
         * @date 03.01.2019
         *
         * @param {Interface.GBalikPisemnostDto[]} obsahBalikuArray Pole GBalikPisemnostDto.
         * @returns {string[]} Pole stringů s hodnotou ixp.
         */
        static TransformObsahBalikuArrayToIxpArray(obsahBalikuArray: Interface.GBalikPisemnostDto[]): string[];
        static TransformIslGroupResult<TResultData>(islResult: Gordic.Isl.GOperationResult<TResultData>, ixp: string | undefined | null): GroupResult | undefined;
        static GroupResultApply(this: GSpiDetailBalikuObsahComponentContent): void;
        static GroupResultClear(this: GSpiDetailBalikuObsahComponentContent): void;
        static GroupResultAdd(this: GSpiDetailBalikuObsahComponentContent, items: (GroupResult | undefined | null)[] | undefined | null): void;
        static GroupResultAddVypujcniListek(this: GSpiDetailBalikuObsahComponentContent, response: Isl.GServiceGroupResponse<Interface.GVypujcniListekDto> | undefined | null): void;
        static tryReloadDetail(this: GSpiDetailBalikuObsahComponentContent, params?: any, opt?: any): void;
        static reloadDetail(this: GSpiDetailBalikuObsahComponentContent, params?: any, opt?: any): void;
        static beforeReloadDetail(this: GSpiDetailBalikuObsahComponentContent): JQueryPromise<undefined>;
        static reload(this: GSpiDetailBalikuObsahComponentContent, componentDto: WebClient.GSpiDetailBalikuObsahComponentDto, params?: any, opt?: any): void;
    }
    export {};
}
declare namespace Gordic.Spi.DetailBuilderComponents {
    interface GSpiDetailNeevidovanehoDokumentuSpisuContentRequirements extends GContent {
        DokumentSpis?: Interface.GPisemnostNeevidovanaDto;
        WasSaved?: boolean;
    }
    interface GSpiDetailNeevidovanehoDokumentuSpisuContentExtensions {
        tryReloadDetail: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, params?: {
            Ixp?: string;
            TypZobrazeniDetailu?: Gin.Interface.TypZobrazeniEntity;
            WasSaved?: boolean;
        }, opt?: any) => void;
        reloadDetail: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, params?: any, opt?: any) => void;
        beforeReloadDetail: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent) => JQueryPromise<undefined>;
        zmenaEditace: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, componentDto: WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto, wasSaved?: boolean, opt?: any) => void;
        reload: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, componentDto: WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto, wasSaved?: boolean, opt?: any) => void;
        enableFieldsAndActions: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, isEditMode: boolean, permissions: Interface.GPisemnostNeevidovanaPermissionsDto) => void;
        getDataNeevidovanyDokumentSpis: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, componentDto: WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto) => JQuery.Promise<Interface.GPisemnostNeevidovanaDto>;
        setDataNeevidovanyDokumentSpis: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, data: Interface.GPisemnostNeevidovanaDto) => void;
        enableFormaDokumentuSpisu: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, opt: {
            fields: {
                OriginalAnalogova: JQuery<HTMLElement>;
                OriginalDigitalni: JQuery<HTMLElement>;
                KonverzeAnalogova: JQuery<HTMLElement>;
                KonverzeDigitalni: JQuery<HTMLElement>;
            };
            data: {
                SFyz?: number | null;
                SEle?: number | null;
            };
            isEditMode?: boolean;
            pouzeFyzickaForma?: boolean;
        }) => void;
        enableFormaDokumentuSpisuInternal: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, opt: {
            data: {
                OriginalAnalogovy?: boolean;
                OriginalDigitalni?: boolean;
                KonverzeAnalogovy?: boolean;
                KonverzeDigitalni?: boolean;
            };
            isEditMode?: boolean;
            pouzeFyzickaForma?: boolean;
        }) => void;
        UpdateDokumentSpisAction: (this: GSpiDetailNeevidovanehoDokumentuSpisuContent, observableDokumentMenuParam: GObservableObject<MenuParams>, prizSpis?: number | string | null) => void;
        /**
        * Vrátí validační skupiny dle aktuálního nastavení.
        *
        * @author  TFeik
        * @date    23.02.2021
        *
        * @param {GSpiDetailNeevidovanehoDokumentuSpisuContent} this
        * @param {WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto} componentDto
        * @returns {string[]}
        */
        getValidationGroups(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, componentDto: WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto): string[];
    }
    interface GSpiDetailNeevidovanehoDokumentuSpisuContent extends GSpiDetailNeevidovanehoDokumentuSpisuContentRequirements, GSpiDetailNeevidovanehoDokumentuSpisuContentExtensions {
    }
    /**
     * SslHeader
     *
     * @author TFeik
     * @since 480.1.0.11
     */
    class GSpiDetailNeevidovanehoDokumentuSpisuComponent {
        /**
         * Create.
         *
         * @author  TFeik
         * @date    17.01.2019
         *
         * @param {GSpiDetailNeevidovanehoDokumentuSpisuContentRequirements} content
         * @param {WebClient.GDetailBalikuDto} [componentDto]
         * @returns {Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase}
         */
        static create(content: GSpiDetailNeevidovanehoDokumentuSpisuContentRequirements, componentDto?: WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GSpiDetailNeevidovanehoDokumentuSpisuContent>;
        private static _createContentExtensions;
        private static _createTabs;
        /**
         * _createHeaderForm
         *
         * @author TFeik
         * @date    17.01.2019
         *
         * @param {Interface.GPisemnostNeevidovanaDto} componentDto
         * @param {boolean} isNovyBalik
         * @returns {Forms.Form}
         */
        private static _createHeaderForm;
        private static _createProfilForm;
        private static _createActions;
        private static _createMenuBar;
        private static _createCommandBar;
        static UpdateDokumentSpisAction(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, observableDokumentMenuParam: GObservableObject<MenuParams>, prizSpis?: number | string | null): void;
        /**
         * enableDetailBaliku
         *
         * @author TFeik
         * @date    16.10.2018
         *
         * @param {GContent} this
         * @param {boolean} editMode
         */
        static enableFieldsAndActions(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, isEditMode: boolean, permissions: Interface.GPisemnostNeevidovanaPermissionsDto): void;
        /**
         * Vrátí validační skupiny dle aktuálního nastavení.
         *
         * @author  TFeik
         * @date    23.02.2021
         *
         * @param {GSpiDetailNeevidovanehoDokumentuSpisuContent} this
         * @param {WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto} componentDto
         * @returns {string[]}
         */
        private static getValidationGroups;
        /**
         *
         * @author TFeik
         * @date    28.01.2019
         *
         * @param {GSpiDetailNeevidovanehoDokumentuSpisuContent} this
         * @returns {Interface.GPisemnostNeevidovanaDto}
         */
        static getDataNeevidovanyDokumentSpis(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, componentDto: WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto): JQuery.Promise<Interface.GPisemnostNeevidovanaDto>;
        /**
         *
         * @author TFeik
         * @date    28.01.2019
         *
         * @param {GSpiDetailNeevidovanehoDokumentuSpisuContent} this
         * @returns {Interface.GPisemnostNeevidovanaDto}
         */
        static setDataNeevidovanyDokumentSpis(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, data: Interface.GPisemnostNeevidovanaDto): void;
        static enableFormaDokumentuSpisuInternal(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, opt: {
            data: {
                OriginalAnalogovy?: boolean;
                OriginalDigitalni?: boolean;
                KonverzeAnalogovy?: boolean;
                KonverzeDigitalni?: boolean;
            };
            isEditMode?: boolean;
            pouzeFyzickaForma?: boolean;
        }): void;
        static enableFormaDokumentuSpisu(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, opt: {
            fields: {
                OriginalAnalogova: JQuery<HTMLElement>;
                OriginalDigitalni: JQuery<HTMLElement>;
                KonverzeAnalogova: JQuery<HTMLElement>;
                KonverzeDigitalni: JQuery<HTMLElement>;
            };
            data: {
                SFyz?: number | null;
                SEle?: number | null;
            };
            isEditMode?: boolean;
            pouzeFyzickaForma?: boolean;
        }): void;
        static zmenaEditace(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, componentDto: WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto, wasSaved?: boolean, opt?: any): void;
        static tryReloadDetail(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, params?: {
            Ixp?: string;
            TypZobrazeniDetailu?: Gin.Interface.TypZobrazeniEntity;
            WasSaved?: boolean;
        }, opt?: any): void;
        static reloadDetail(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, params?: any, opt?: any): void;
        static beforeReloadDetail(this: GSpiDetailNeevidovanehoDokumentuSpisuContent): JQueryPromise<undefined>;
        static reload(this: GSpiDetailNeevidovanehoDokumentuSpisuContent, componentDto: WebClient.GSpiDetailNeevidovanehoDokumentuSpisuComponentDto, wasSaved?: boolean, opt?: any): void;
    }
}
declare namespace Gordic.Spi.DetailBuilderComponents {
    interface GSpiDetailUloznehoMistaContentRequirements extends GContent {
        WasSaved?: boolean;
        UlozneMisto: Interface.GUlozneMistoDto;
    }
    interface GSpiDetailUloznehoMistaContentExtensions {
        tryReloadDetail: (this: GSpiDetailUloznehoMistaContent, params?: {
            IxsUlm?: string;
            UlozneMisto?: Gordic.Spi.Interface.GUlozneMistoDto;
            TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity;
            WasSaved?: boolean;
        }, opt?: any) => void;
        reloadDetail: (this: GSpiDetailUloznehoMistaContent, params?: any, opt?: any) => void;
        beforeReloadDetail: (this: GSpiDetailUloznehoMistaContent) => JQueryPromise<undefined>;
        updateDetail: (this: GSpiDetailUloznehoMistaContent, data: Interface.GUlozneMistoDto, InputData: Interface.GUlozneMistoDto) => void;
        zmenaEditace: (this: GSpiDetailUloznehoMistaContent, componentDto: WebClient.GSpiDetailUloznehoMistaComponentDto, wasSaved?: boolean, opt?: any) => void;
        ulozit: (this: GSpiDetailUloznehoMistaContent, componentDto: WebClient.GSpiDetailUloznehoMistaComponentDto) => JQuery.Promise<Interface.GUlozneMistoDto | undefined>;
        zmenitAktivitu: (this: GSpiDetailUloznehoMistaContent, componentDto: WebClient.GSpiDetailUloznehoMistaComponentDto) => JQuery.Promise<Interface.GUlozneMistoDto | undefined>;
        novyZaznam: (this: GSpiDetailUloznehoMistaContent, componentDto: WebClient.GSpiDetailUloznehoMistaComponentDto, wasSaved?: boolean, opt?: any) => void;
        reload: (this: GSpiDetailUloznehoMistaContent, componentDto?: WebClient.GSpiDetailUloznehoMistaComponentDto, wasSaved?: boolean, opt?: any) => void;
        enableFieldsAndActions: (this: GSpiDetailUloznehoMistaContent, isEditMode: boolean, data: Interface.GUlozneMistoDto, TypZobrazeniDetailu: Gordic.Gin.Interface.TypZobrazeniEntity, InputData: Interface.GUlozneMistoDto) => void;
        getData: (this: GSpiDetailUloznehoMistaContent) => Interface.GUlozneMistoDto | undefined;
        setData: (this: GSpiDetailUloznehoMistaContent, data: Interface.GUlozneMistoDto) => void;
    }
    interface GSpiDetailUloznehoMistaContent extends GSpiDetailUloznehoMistaContentRequirements, GSpiDetailUloznehoMistaContentExtensions {
    }
    /**
     * SslHeader
     *
     * @author TFeik
     * @since 480.1.0.11
     */
    class GSpiDetailUloznehoMistaComponent {
        /**
         * Create.
         *
         * @author  JSindelka
         * @date    17.01.2019
         *
         * @param {GSpiDetailUloznehoMistaContentRequirements} content
         * @param {WebClient.GDetailBalikuDto} [componentDto]
         * @returns {Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase}
         */
        static create(content: GSpiDetailUloznehoMistaContentRequirements, componentDto?: WebClient.GSpiDetailUloznehoMistaComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GSpiDetailUloznehoMistaContent>;
        private static _createContentExtensions;
        private static _createTabs;
        private static _createHeaderForm;
        private static _createProfilForm;
        private static _createActions;
        private static _createMenuBar;
        private static _createCommandBar;
        static enableFieldsAndActions(this: GSpiDetailUloznehoMistaContent, isEditMode: boolean, data: Interface.GUlozneMistoDto, TypZobrazeniDetailu: Gordic.Gin.Interface.TypZobrazeniEntity, InputData: Interface.GUlozneMistoDto): void;
        static getData(this: GSpiDetailUloznehoMistaContent): Interface.GUlozneMistoDto | undefined;
        static setData(this: GSpiDetailUloznehoMistaContent, data: Interface.GUlozneMistoDto): void;
        static zmenaEditace(this: GSpiDetailUloznehoMistaContent, componentDto: WebClient.GSpiDetailUloznehoMistaComponentDto, wasSaved?: boolean, opt?: any): void;
        static ulozit(this: GSpiDetailUloznehoMistaContent, componentDto: WebClient.GSpiDetailUloznehoMistaComponentDto): JQuery.Promise<Interface.GUlozneMistoDto | undefined>;
        static zmenitAktivitu(this: GSpiDetailUloznehoMistaContent, componentDto: WebClient.GSpiDetailUloznehoMistaComponentDto): JQuery.Promise<Interface.GUlozneMistoDto | undefined>;
        static novyZaznam(this: GSpiDetailUloznehoMistaContent, componentDto: WebClient.GSpiDetailUloznehoMistaComponentDto, wasSaved?: boolean, opt?: any): void;
        static tryReloadDetail(this: GSpiDetailUloznehoMistaContent, params?: {
            IxsUlm?: string;
            TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity;
            WasSaved?: boolean;
        }, opt?: any): void;
        static updateDetail(this: GSpiDetailUloznehoMistaContent, data: Interface.GUlozneMistoDto, InputData: Interface.GUlozneMistoDto): void;
        static reloadDetail(this: GSpiDetailUloznehoMistaContent, params?: any, opt?: any): void;
        static beforeReloadDetail(this: GSpiDetailUloznehoMistaContent): JQueryPromise<undefined>;
        static reload(this: GSpiDetailUloznehoMistaContent, componentDto?: WebClient.GSpiDetailUloznehoMistaComponentDto, wasSaved?: boolean, opt?: any): void;
    }
}
declare namespace Gordic.Spi.DetailBuilderComponents {
    interface GSpiDetailVypujcnihoListkuContentRequirements extends GContent {
        WasSaved?: boolean;
        VypujcniListek: Interface.GVypujcniListekDto;
    }
    interface GSpiDetailVypujcnihoListkuContentExtensions {
        tryReloadDetail: (this: GSpiDetailVypujcnihoListkuContent, params?: {
            ixs_vyl?: string;
            TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity;
            WasSaved?: boolean;
        }, opt?: any) => void;
        reloadDetail: (this: GSpiDetailVypujcnihoListkuContent, params?: any, opt?: any) => void;
        beforeReloadDetail: (this: GSpiDetailVypujcnihoListkuContent) => JQueryPromise<undefined>;
        zmenaEditace: (this: GSpiDetailVypujcnihoListkuContent, componentDto: WebClient.GSpiDetailVypujcnihoListkuComponentDto, wasSaved?: boolean, opt?: any) => void;
        reload: (this: GSpiDetailVypujcnihoListkuContent, componentDto?: WebClient.GSpiDetailVypujcnihoListkuComponentDto, wasSaved?: boolean, opt?: any) => void;
        enableFieldsAndActions: (this: GSpiDetailVypujcnihoListkuContent, isEditMode: boolean, componentDto: WebClient.GSpiDetailVypujcnihoListkuComponentDto) => void;
        getData: (this: GSpiDetailVypujcnihoListkuContent) => Interface.GVypujcniListekDto | undefined;
        setData: (this: GSpiDetailVypujcnihoListkuContent, data: Interface.GVypujcniListekDto) => void;
    }
    interface GSpiDetailVypujcnihoListkuContent extends GSpiDetailVypujcnihoListkuContentRequirements, GSpiDetailVypujcnihoListkuContentExtensions {
    }
    /**
     * SslHeader
     *
     * @author TFeik
     * @since 480.1.0.11
     */
    class GSpiDetailVypujcnihoListkuComponent {
        /**
         * Create.
         *
         * @author  TFeik
         * @date    17.01.2019
         *
         * @param {GSpiDetailVypujcnihoListkuContentRequirements} content
         * @param {WebClient.GSpiDetailVypujcnihoListkuComponentDto} [componentDto]
         * @returns {Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase}
         */
        static create(content: GSpiDetailVypujcnihoListkuContentRequirements, componentDto?: WebClient.GSpiDetailVypujcnihoListkuComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GSpiDetailVypujcnihoListkuContent>;
        private static _createContentExtensions;
        private static _createTabs;
        private static _createHeaderForm;
        private static _createProfilForm;
        private static _createActions;
        private static _createMenuBar;
        private static _createCommandBar;
        private static CreateActionVratitVypujcku;
        private static CreateActionZtratitVypujcku;
        private static CreateActionSchvalitZadostOVypujcku;
        private static CreateActionZamitnouZadostOVypujcku;
        private static CreateActionStornovatZadostOVypujcku;
        private static CreateActionVypujcitSchvalene;
        private static VratitZtratitVypujcku;
        private static CreateActionZmenaTerminuVraceni;
        private static SchvalitZadostOVypujcku;
        private static StornovatZadostOVypujcku;
        private static VypujcitSchvalene;
        private static CreateActionTiskDetailu;
        static EnableFieldsAndActions(this: GSpiDetailVypujcnihoListkuContent, isEditMode: boolean, componentDto: WebClient.GSpiDetailVypujcnihoListkuComponentDto): void;
        static getData(this: GSpiDetailVypujcnihoListkuContent): Interface.GVypujcniListekDto | undefined;
        static setData(this: GSpiDetailVypujcnihoListkuContent, data: Interface.GVypujcniListekDto): void;
        static zmenaEditace(this: GSpiDetailVypujcnihoListkuContent, componentDto: WebClient.GSpiDetailVypujcnihoListkuComponentDto, wasSaved?: boolean, opt?: any): void;
        static tryReloadDetail(this: GSpiDetailVypujcnihoListkuContent, params?: {
            ixs_vyl?: string;
            TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity;
            WasSaved?: boolean;
        }, opt?: any): void;
        static reloadDetail(this: GSpiDetailVypujcnihoListkuContent, params?: any, opt?: any): void;
        static beforeReloadDetail(this: GSpiDetailVypujcnihoListkuContent): JQueryPromise<undefined>;
        static reload(this: GSpiDetailVypujcnihoListkuContent, componentDto?: WebClient.GSpiDetailVypujcnihoListkuComponentDto, wasSaved?: boolean, opt?: any): void;
    }
}
declare namespace Gordic.Spi.WebClient {
    /**
     * Interface dat gridu, po kterém je možné přesouvat se pomocí šipek na detailu.
     *
     * @author  TFeik
     * @date    08.07.2019
     * @since   482.1.0.520
     */
    interface GDetailNeevidovanehoDokumentuSpisuDlgListSupportData {
        ixp?: string;
        Ixp?: string;
        ixs_zup?: string;
        IxsZup?: string;
    }
    /**
     * GDetailNeevidovanehoDokumentuSpisuDlg
     *
     * @author TFeik
     * @since 480.1.0.286
     */
    class GDetailNeevidovanehoDokumentuSpisuDlg extends GContentBase implements DetailBuilderComponents.GSpiDetailNeevidovanehoDokumentuSpisuContentRequirements {
        readonly DokumentSpis?: Interface.GPisemnostNeevidovanaDto;
        readonly WasSaved?: boolean;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    17.07.2017
         */
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(this: GDetailNeevidovanehoDokumentuSpisuDlg & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<GDetailNeevidovanehoDokumentuSpisuDlgListSupportData>, builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private _getListControlsSettings;
        closing(): JQueryPromise<GDetailNeevidovanehoDokumentuSpisuDlgRetValDto>;
        /**
         * Zkontroluje, zda jsou vstupní parametry dialogu validní a půjde otevřít.
         *
         * @author  TFeik
         * @date    11.11.2019
         *
         * @param {GDetailNeevidovanehoDokumentuSpisuDlgInputDto} [inputParams]
         * @returns {boolean | Gui.Dialogs.OpenDialogRejectType}
         */
        static IsValid(inputParams: GDetailNeevidovanehoDokumentuSpisuDlgInputDto | null | undefined): boolean | Gui.Dialogs.OpenDialogRejectType;
    }
}
declare namespace Gordic.Spi.WebClient {
    /**
     * Detail Ulozneho mista
     *
     * @author JSindelka
     * @since 480.1.0.286
     */
    class GDetailUloznehoMistaDlg extends GContentBase implements DetailBuilderComponents.GSpiDetailUloznehoMistaContentRequirements {
        /**
         * Výchozí hodnota timeru FleshPanelu.
         */
        private readonly FlashPanelTimer;
        readonly WasSaved?: boolean;
        readonly UlozneMisto: Interface.GUlozneMistoDto;
        /**
         * onContentReady
         *
         * @author  JSindelka
         * @date    17.07.2017
         */
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        closing(): JQueryPromise<GDetailUloznehoMistaDlgRetValDto>;
    }
}
declare namespace Gordic.Spi.WebClient {
    /**
     * GDetailVypujcnihoListkuDlg
     *
     * @author JSindelka
     * @since 480.1.0.286
     */
    class GDetailVypujcnihoListkuDlg extends GContentBase implements DetailBuilderComponents.GSpiDetailVypujcnihoListkuContentRequirements {
        /**
         * Výchozí hodnota timeru FleshPanelu.
         */
        private readonly FlashPanelTimer;
        readonly VypujcniListek: Interface.GVypujcniListekDto;
        readonly WasSaved?: boolean;
        /**
         * onContentReady
         *
         * @author  JSindelka
         * @date    17.07.2017
         */
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        closing(): JQueryPromise<GDetailVypujcnihoListkuDlgRetValDto>;
    }
}
declare namespace Gordic.Spi.WebClient {
    type GBalikColumnNames = 'IxsZup' | 'IxsZupNad' | 'PrizNad' | 'PocetPis' | 'PocetJ' | 'StavSul' | 'PrizSkn' | 'PrizVyp' | 'KodTyz' | 'TypBalAdd' | 'SpisZnakNazev' | 'KodTyzTxt' | 'SpisovyPlan' | 'SpisovyZnak' | 'SkartacniZnak' | 'SkartacniLhuta' | 'Nazev' | 'Popis' | 'ZnackaZup' | 'PrevzatoOdTxt' | 'PrevzalTxt' | 'MErr' | 'RokSkartace' | 'Bm' | 'BmPos' | 'Umisteni' | 'Kubatura' | 'IxsSuOd' | 'IxsSpiDo' | 'IxsFunDo' | 'IxsSpiAkt' | 'IxsFunAkt' | 'DatSkartace' | 'DatVzniku' | 'DatUlozSpi' | 'DatPrijSpi' | 'DatZmena' | 'ZmenuProv' | 'PozSkar' | 'Vaha' | 'Police' | 'Paprsek' | 'Poznamka' | 'IxsZmpOd' | 'SkarLhutaSpra' | 'RokPredaniSpra' | 'RokOd' | 'RokDo' | 'PrepocitavatCasovyRozsahDokumentu' | 'PrepocitavatSkartacniRezim' | 'PocetKrabic' | 'PocetListu' | 'IxsLpc' | 'MVyber' | 'PocetPisJedTxtAdd' | 'RozsahAdd' | 'RozsahNewAdd' | 'IxsSka' | 'NazevSka' | 'SEle' | 'SFyz' | 'PorCislo' | 'Zkratka' | 'Rok' | 'UkladaciZnacka' | 'NazevSuOd' | 'NazevFunOd' | 'NazevRefOd' | 'PocetJFyz' | 'PocetPisFyz' | 'PrepocitavatPocty' | 'PrizSkznPrep' | 'InfoIkonAdd' | 'SkarZnakSpz' | 'SkarLhutaSpz' | 'PrizSkar' | 'IxbAip' | 'PrizTransLog' | 'Soubor' | 'IxsCerC' | 'DatDo' | 'Hash2' | 'AlgH2';
    type GBalikFieldNames = 'IxsZup' | 'IxsZupNad' | 'PrizNad' | 'PocetPis' | 'PocetJ' | 'StavSul' | 'PrizSkn' | 'PrizVyp' | 'KodTyz' | 'TypBalAdd' | 'SpisZnakNazev' | 'KodTyzTxt' | 'SpisovyPlan' | 'SpisovyZnak' | 'SkartacniZnak' | 'SkartacniLhuta' | 'Nazev' | 'Popis' | 'ZnackaZup' | 'PrevzatoOdTxt' | 'PrevzalTxt' | 'MErr' | 'RokSkartace' | 'Bm' | 'BmPos' | 'Umisteni' | 'Kubatura' | 'IxsSuOd' | 'IxsSpiDo' | 'IxsFunDo' | 'IxsSpiAkt' | 'IxsFunAkt' | 'DatSkartace' | 'DatVzniku' | 'DatUlozSpi' | 'DatPrijSpi' | 'DatZmena' | 'ZmenuProv' | 'PozSkar' | 'Vaha' | 'Police' | 'Paprsek' | 'Poznamka' | 'IxsZmpOd' | 'SkarLhutaSpra' | 'RokPredaniSpra' | 'RokOd' | 'RokDo' | 'PrepocitavatCasovyRozsahDokumentu' | 'PrepocitavatSkartacniRezim' | 'PocetKrabic' | 'PocetListu' | 'IxsLpc' | 'MVyber' | 'PocetPisJedTxtAdd' | 'RozsahAdd' | 'RozsahNewAdd' | 'IxsSka' | 'NazevSka' | 'SEle' | 'SFyz' | 'PorCislo' | 'Zkratka' | 'Rok' | 'UkladaciZnacka' | 'NazevSuOd' | 'NazevFunOd' | 'NazevRefOd' | 'PocetJFyz' | 'PocetPisFyz' | 'PrepocitavatPocty' | 'PrizSkznPrep' | 'InfoIkonAdd' | 'SkarZnakSpz' | 'SkarLhutaSpz' | 'PrizSkar' | 'IxbAip' | 'PrizTransLog' | 'Soubor' | 'IxsCerC' | 'DatDo' | 'Hash2' | 'AlgH2';
    class GBalikIsl {
        static Init(columns: Gin.WebClient.Names<GBalikColumnNames>, fields: Gin.WebClient.Names<GBalikFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GBalikColumnNames>, fields: Gin.WebClient.Names<GBalikFieldNames>): boolean;
        private static loadEnums;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GBalikDto>
         *
         * @author  TFeik
         * @date    29.04.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GBalikDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GBalikColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    29.04.2022
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GBalikColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GBalikIsl pomocí fukce GBalikIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    29.04.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GBalikColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GBalikFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GBalikFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GBalikFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GBalikFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Spi.WebClient {
    /**
     * GDetailBalikuDlg
     *
     * @author TFeik
     * @since 480.1.0.286
     */
    class GObsahBalikuAC extends GContentBase implements DetailBuilderComponents.GSpiDetailBalikuObsahComponentContentRequirements {
        readonly EditMode: boolean;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    17.07.2017
         */
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class BalikySObsahemListBaseAC extends GContentBase<SpiListBaseAC> {
        ObsahBalikuVisible: boolean;
        static InitList(content: GContentType<BalikySObsahemListBaseAC>): void;
        _isDebounced: boolean;
        static CreateGridBaliku(content: GContentType<BalikySObsahemListBaseAC>): void;
        static CreateGridBalikuSObsahem(content: BalikySObsahemListBaseAC): void;
        static CreateGridObsahBaliku(content: BalikySObsahemListBaseAC): void;
        static SetObsahBaliku(content: BalikySObsahemListBaseAC): void;
        static SetObsahBalikuRun(content: BalikySObsahemListBaseAC, row: any): void;
        static ClearObsah: ((content: GContentType<BalikySObsahemListBaseAC>) => void) & {
            cancel: () => void;
            flush: () => void;
            pending: () => boolean;
        };
        static ClearDataObsahu(content: GContentType<BalikySObsahemListBaseAC>): void;
        static BeforeLoadData(content: BalikySObsahemListBaseAC): void;
        static AfterLoadData(content: BalikySObsahemListBaseAC): void;
        static LoadObsahAktualnihoBaliku(content: BalikySObsahemListBaseAC): void;
        static LoadPreview: ((content: GContentType<BalikySObsahemListBaseAC>, ixsZup: string) => void) & {
            cancel: () => void;
            flush: () => void;
            pending: () => boolean;
        };
        static GetGridBaliku(content: GContentType<BalikySObsahemListBaseAC>, gridColumnsDefinition: Gordic.Data.GridFormat): JQuery;
        static CreateActionStornoPrideleniDoSpisovny(content: GContentType<BalikySObsahemListBaseAC>, favorite?: boolean): GAction;
        static CreateActionZmenitVlastnika(content: GContentType<SpiListBaseAC>, favorite?: boolean, refreshData?: boolean): GAction;
        static CreateActionVyjmoutZUloznehoMista(content: GContentType<BalikySObsahemListBaseAC>, favorite?: boolean): GAction;
        static CreateActionSaveSeznamIxpObsahuBalikuToFile(content: GContentType<BalikySObsahemListBaseAC>, favorite?: boolean): GAction;
        static CreateActionPrepocitatRozdíly(content: GContentType<BalikySObsahemListBaseAC>, favorite?: boolean): GAction;
        static CreateActionTiskPredavcihoProtokoluBalikuDoSpisovny(content: GContentType<BalikySObsahemListBaseAC>): GAction;
        static TiskPredavacihoProtokoluBalikuDoSpisovny(content: GContentType<BalikySObsahemListBaseAC>, event?: JQueryEventObject): void;
        static CreateActionTiskStitkuBaliku(content: GContentType<BalikySObsahemListBaseAC>, favorite?: boolean): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class DokSpisSpiListBaseAC extends GContentBase<SpiListBaseAC> {
        static InitList(content: GContentType<DokSpisSpiListBaseAC>): void;
        static CreateActionVyjmoutZBaliku(content: GContentType<SpiListBaseAC>): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    function CreateActionDetailBaliku(content: GContentType<SpiListBaseAC>): GAction;
    function CreateActionNovyBalik(content: GContentType<SpiListBaseAC>): GAction;
    function DelegatePrizObjIcon(): GGridColumn<any>;
    class SpiListBaseAC extends GContentBase<Gordic.Wfl.ListAC.WflListBaseAC> {
        SpiListContext: Spi.Interface.GSpiListContextDto;
        SpiSettings: Gordic.Spi.WebClient.GSpiSettingsDto;
        IxpProPrednastaveniBaliku?: string | null;
        CloseAfterSaveNovyBalik: boolean;
        static InitList(content: GContentType<SpiListBaseAC>): void;
        static AddBaseActionsDokSpis(content: GContentType<SpiListBaseAC>): void;
        static AddBaseActionsBaliku(content: GContentType<SpiListBaseAC>): void;
        static CreateActionSaveSeznamIxpObsahuBalikuToFile(content: GContentType<SpiListBaseAC>, favorite?: boolean): GAction;
        static GetGridDokSpis(content: GContentType<SpiListBaseAC>, gridColumnsDefinition: Gordic.Data.GridFormat): JQuery;
        static GetIxsZupArrayFromSelection(content: GContentType<SpiListBaseAC>): string[];
        static IfHromadneGenerovaniSIP(content: GContentType<SpiListBaseAC>): boolean;
        static IfGenerovaniSIP(content: GContentType<SpiListBaseAC>): boolean;
        static CreateActionsKontrolaAOpravaMetadat(content: GContentType<SpiListBaseAC>): void;
        static CreateGridDokSpis(content: GContentType<SpiListBaseAC>): void;
        static GetSelectedGSpiDataAkce(content: GContentType<SpiListBaseAC>): Spi.Interface.GSpiDataAkce[];
        static GetSelectedGDataAkceSslProfil(content: GContentType<SpiListBaseAC>): Wfl.Interface.GDataAkceSslProfilDto[];
        static CreateActionPridelitSpisovne(content: GContentType<SpiListBaseAC>, favorite?: boolean): GAction;
        static CreateActionOdlozitKontroluSpousteciUdalost(content: GContentType<SpiListBaseAC>, favorite?: boolean): GAction;
        static CreateActionTiskOznacenych(content: GContentType<SpiListBaseAC>, favorite?: boolean): GAction;
        static CreateActionSetPredavajiciDleEntity(content: GContentType<SpiListBaseAC>, favorite?: boolean): GAction;
        static CreateActionVytvoritZadostOVypujceniZeSpisovny(content: GContentType<SpiListBaseAC>, sVyberem: boolean, favorite?: boolean): GAction;
        static CreateActionZmenitSpisovyZnak(content: GContentType<SpiListBaseAC>, favorite?: boolean, refreshData?: boolean): GAction;
        static CreateActionZmenitSkartZnak(content: GContentType<SpiListBaseAC>, favorite?: boolean, refreshData?: boolean): GAction;
        static CreateActionZmenitUlozeni(content: GContentType<SpiListBaseAC>, favorite?: boolean, refreshData?: boolean): GAction;
        static CreateActionOdebratVlastnictvi(content: GContentType<KeSmazaniListBaseAC>): GAction;
        static PridelitSpisovne(_ixsSpi: any, _selected: any, content: GContentType<SpiListBaseAC>): void;
        static CreateActionUlozit(content: GContentType<SpiListBaseAC>, typZobrazeni: Spi.Interface.TypZobrazeniUlozeniDoSpisovny): GAction;
        static CreateActionPrepocetRokuSkartace(content: GContentType<SpiListBaseAC>, prepocitatVse: boolean): GAction;
        static CreateActionVypujcit(content: GContentType<SpiListBaseAC>): GAction;
        static TiskVypujcnihoListkuHromadne(content: GContentType<SpiListBaseAC>, ixsVyls: string[]): void;
        static CreateActionAutomatUkladani(content: GContentType<SpiListBaseAC>): GAction;
        static CreateActionDoplnitSpousteciUdalost(content: GContentType<SpiListBaseAC>): GAction;
        static GetSelectedGEntitaKvypujceniListDto(content: GContentType<SpiListBaseAC>): Spi.Interface.GEntitaKVypujceniDto[];
        static GetCaptionGenerovaniSIP(typ: Wfl.Interface.TypGenerovanehoBalickuDlePrijemce): string;
        static GetSelectedGenerovaniSipListDto(content: GContentType<SpiListBaseAC>): Interface.GenerovaniSipListDto[];
        static GetAllGenerovaniSipListDto(content: GContentType<SpiListBaseAC>): Interface.GenerovaniSipListDto[];
        static CreateActionGenerovatSIP(content: GContentType<SpiListBaseAC>, typ: Wfl.Interface.TypGenerovanehoBalickuDlePrijemce): GAction;
        static CreateActionTiskPredavcihoProtokolu(content: GContentType<SpiListBaseAC>, priprava: boolean): GAction;
        static CreateActionPosunRokSpoUda(content: GContentType<SpiListBaseAC>, favorite?: boolean): GAction;
        static CreateActionTiskVypujcnihoListku(content: GContentType<SpiListBaseAC>): GAction;
        static TiskPredavacihoProtokolu(content: GContentType<SpiListBaseAC>, priprava: boolean, _ixsSpi: string, event?: JQueryEventObject): void;
        static TiskVypujcnihoListku(content: GContent, ixsVyl: string, dotaz: boolean, event?: JQueryEventObject): void;
        static JeMozneVlozitDoJednohoBaliku(content: GContentType<SpiListBaseAC>): JQuery.Promise<Wfl.Interface.GSslProfilStruktura>;
    }
}
declare namespace Gordic.Spi.Lists {
    class BalikyTypuAIPVDigitSpiAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Interface.GPrehledBalikyVDigitSpiFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GPrehledBalikyVDigitSpiFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class KPredaniProSpravniArchivAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Interface.GProSpravniArchivFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        FiltrULM(): void;
        VyberULM(): void;
        LoadData(filtr?: Interface.GProSpravniArchivFilterDto): void;
        ReloadData(): void;
        CreateActionFiltrUlm(favorite?: boolean): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class KPredaniSpisovneAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Interface.GSpisovnaFilterDto;
        TypAutorizacePredani: Gordic.Wfl.Interface.TypAutorizacePredani;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GSpisovnaFilterDto): void;
        ReloadData(): void;
        CreateActionPredatSpisovne(favorite?: boolean): GAction;
        CreateActionStornoPrideleniSpisovne(favorite?: boolean): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class BalikyKPrevzetiAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Client.GSeznamKPrevzetiDoSpisovnyFilterDto;
        TypAutorizacePredani: Gordic.Wfl.Interface.TypAutorizacePredani;
        AsyncRunning: Gordic.Async.IGTask | null;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GSeznamKPrevzetiDoSpisovnyFilterDto): void;
        GetPredavajici(): Client.GSeznamKPrevzetiDoSpisovnyFilterDto;
        CreateActionPrevzitDoSpisovny(): GAction;
        closing(): boolean;
        PrevzitAsync(Selected: string[]): void;
        AfterPrevzeti(): void;
        CreateActionKontrolaPredPrevzetimDoSpisovny(): GAction;
        CreateActionPrepocetDleObsahu(): GAction;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class DokSpisKPrevzetiMulltiTaskAC extends GContentBase<DokSpisSpiListBaseAC> {
        model: Client.GSeznamKPrevzetiDoSpisovnyFilterDto;
        TypAutorizacePredani: Gordic.Wfl.Interface.TypAutorizacePredani;
        private _$fileField;
        onContentReady(): void;
        CreateList(): void;
        CreateFilterForms(): Forms.Form[];
        SuFunRefChange(_ixsSU: string): void;
        LoadData(filtr?: Gordic.Spi.Client.GSeznamKPrevzetiDoSpisovnyFilterDto): void;
        GetPredavajici(): void;
        SetPredavajici(): void;
        SetData(data: Gordic.Wfl.Interface.GDokSpisListDto[]): void;
        CreateActionPrevzitDoSpisovny(favorite?: boolean): GAction;
        PrevzitDoSpisovny(Selected: Wfl.Interface.GDokSpisListDto[]): void;
        PripravPrevzeti(Selected: Wfl.Interface.GDokSpisListDto[]): void;
        Prevzit(Selected: string[]): void;
        PrevzitAsync(Selected: string[]): void;
        CreateActionKontrolaPredPrevzetim(favorite?: boolean): GAction;
        KontrolaPredPrevzetim(Selected: string[], ixsZup: string): void;
        CreateActionPridat(): GAction;
        CreateActionNacistZeSouboru(): GAction;
        addFileDoc(): void;
        private _addFile;
        CreateActionTest(): GAction;
        PridatDleId(): void;
        ReloadData(): void;
        SetSubtask(typ: Interface.TypDokSpisKPrevzeti): void;
        CreateActionSubtask(typ: Interface.TypDokSpisKPrevzeti): GAction;
        EnabledAction(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class KPrevzetiZeSpisovnyAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Client.GSeznamKPrevzetiDoSpisovnyFilterDto;
        TypAutorizacePredani: Gordic.Wfl.Interface.TypAutorizacePredani;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GSeznamKPrevzetiDoSpisovnyFilterDto): void;
        GetPredavajici(): Client.GSeznamKPrevzetiDoSpisovnyFilterDto;
        CreateActionPrevzitDoSpisovny(): GAction;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class BalikyKUlozeniAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Interface.GSpiPrehledFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GSpiPrehledFilterDto): void;
        ReloadData(): void;
        CreateActionVyjmoutZeSpisovny(favorite?: boolean): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class DokSpisKUlozeniAC extends GContentBase<DokSpisSpiListBaseAC> {
        model: Client.GSeznamDokSpisFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GSeznamDokSpisFilterDto): void;
        ReloadData(): void;
        CreateActionVyjmoutZeSpisovny(favorite?: boolean): GAction;
        CreateActionVlozitDoBaliku(favorite?: boolean): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class KeSmazaniPoSkartRizeniAC extends GContentBase<KeSmazaniListBaseAC> {
        model: Spi.Interface.GSkartNavrhFiltrDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GSkartNavrhFiltrDto): void;
        CreateGrid(): void;
        ReloadData(): void;
        SetTypDuvDel(): void;
        CreateActionVymazatSouboryElPodani(): GAction;
        VymazatSouboryElPodaniPostupne(_selected: Gin.Interface.GIxsDateTime[]): JQuery.Promise<boolean>;
        VymazatSouboryElPodani(_item: Gin.Interface.GIxsDateTime): JQuery.Promise<boolean>;
    }
}
declare namespace Gordic.Spi.Lists {
    class NeaktivniListAC extends GContentBase<KeSmazaniListBaseAC> {
        model: Spi.Interface.GSeznamNeaktivniFilterDto;
        ImageDelegateStavPodani: ObjectLiteral<Gordic.Wfl.WebClient.GIcon>;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GSeznamNeaktivniFilterDto): void;
        AfterLoadDataThis(): void;
        CreateGridFormat(): void;
        ReloadData(): void;
        CreateActionVymazatSouboryElPodani(): GAction;
        VymazatSouboryElPodaniPostupne(_selected: Gin.Interface.GIxsDateTime[]): JQuery.Promise<boolean>;
        VymazatSouboryElPodani(_item: Gin.Interface.GIxsDateTime): JQuery.Promise<boolean>;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledSmazanychAC extends GContentBase<KeSmazaniListBaseAC> {
        model: Interface.GSmazaneFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PripraveneKeSmazaniAC extends GContentBase<KeSmazaniListBaseAC> {
        onContentReady(): void;
        LoadData(): void;
        ReloadData(): void;
        CreateActionVymazatMetadata(): GAction;
        CreateActionKontrolaPredSmazanimMetadat(): GAction;
        DoAkciMazani(typ: Interface.TypOperaceMazaniMetadat): void;
        DoAkciMazaniAtomicky(typ: Interface.TypOperaceMazaniMetadat): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class SouboryKeSmazaniAC extends GContentBase<KeSmazaniListBaseAC> {
        model: Interface.GSouboryKeSmazaniFilterDto;
        ActionOznacitJakoSmazaneEnabled: boolean;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        CreateGrid(): void;
        LoadData(filtr?: Interface.GSouboryKeSmazaniFilterDto): void;
        ReloadData(): void;
        CreateActionOznacitJakoSmazane(favorite: boolean): GAction;
        CreateActionVymazatSoubory(): GAction;
        CreateActionOdemknout(): GAction;
        GetSelectedSouboryKeSmazaniDto(): Interface.GDeleteFileDto[];
    }
}
declare namespace Gordic.Spi.Lists {
    class KeSmazaniListBaseAC extends GContentBase<SpiListBaseAC> {
        TypSeznamuMazani: Interface.TypSeznamuMazani;
        TypDuvDel: Wfl.Interface.WflctddEnum;
        PovolenoMazani: boolean;
        ProvedenaKontrolaArchivace: boolean;
        static InitList(content: GContentType<SpiListBaseAC>): void;
        static CreateActionVymazatSoubory(content: GContentType<KeSmazaniListBaseAC>): GAction;
        static CreateActionKontrolaPredSmazanimMetadat(content: GContentType<KeSmazaniListBaseAC>): GAction;
        static CreateActionPripravitKeSmazanimMetadat(content: GContentType<KeSmazaniListBaseAC>): GAction;
        static DoAkciMazani(content: GContentType<KeSmazaniListBaseAC>, typ: Interface.TypOperaceMazaniMetadat): void;
        static GetSelectedDataKeSmazaniDto(content: GContentType<KeSmazaniListBaseAC>): Interface.GNeaktivDokSpisDto[];
        static CreateActionZrusitOznaceniKeSmazani(content: GContentType<KeSmazaniListBaseAC>, favorite?: boolean): GAction;
        static CreateActionZnovusmazatMetadata(content: GContentType<KeSmazaniListBaseAC>, favorite?: boolean): GAction;
        static SmazFilesFyzicky(content: GContentType<KeSmazaniListBaseAC>): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class ArchivniKnihaAC extends GContentBase<BalikySObsahemListBaseAC> {
        vyberSpisovny: boolean;
        model: Interface.GSpiPrehledFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GSpiPrehledFilterDto): void;
        CreateActionTiskArchivniKnihy(): GAction;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class EntityListUniversal extends GContentBase<DokSpisSpiListBaseAC> {
        model: Client.GSeznamDokSpisFilterDto;
        TypSeznamu: Interface.TypSeznamuSpisovny;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GSeznamDokSpisFilterDto): void;
        ReloadData(): void;
        CreateActionVyjmoutZeSpisovny(favorite?: boolean): GAction;
        CreateActionVlozitDoBaliku(favorite?: boolean): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class GKontrolaMetadatSpiList extends GContentBase<Wfl.ListAC.KontrolaMetadatListAC> {
        NadCelouDbEnabled: boolean;
        PouzeTentoRokEnabled: boolean;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        SetSpisovyZnakEnabled(enabled: boolean): void;
        SetVlastnikEnabled(enabled: boolean): void;
        CreateGridFormat(): void;
        LoadData(filtr?: Wfl.Interface.GKontrolaMetadatFiltrDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class HledaniBalikultListAC extends GContentBase<BalikySObsahemListBaseAC> {
        vyberSpisovny: boolean;
        model: Interface.GSpiPrehledFilterDto;
        FiltrStruktura?: Wfl.Interface.GSslProfilStruktura;
        TypHledani: Interface.TypHledaniBaliku;
        IsRezimSpisovna: boolean;
        IxpsProVlozeni: string[];
        onContentReady(): void;
        CreateActionNovyBalikSVlozenim(): GAction;
        ReloadData(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class ObsahBalikuListAC extends GContentBase<SpiListBaseAC> {
        IxsZup: string;
        data: Gordic.Spi.Interface.GBalikPisemnostDto[];
        onContentReady(): void;
        updateData(ixsZup: string): void;
        LoadData(): void;
        SetData(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PracovniBlokAC extends GContentBase<BalikySObsahemListBaseAC> {
        ModelJS: Interface.GPracovniBlokSpiDto;
        ZmenaSkartZnakuVisible: boolean;
        onContentReady(): void;
        LoadData(model: Interface.GPracovniBlokSpiDto): void;
        ReloadData(): void;
        CreateActionPracovniBloky(): GAction;
        CreateActionVyjmout(): GAction;
        CreateActionVyjmoutVse(): GAction;
        CreateActionPridat(): GAction;
        Pridat(opakovat: boolean): JQuery.Promise<boolean>;
        CreateActionPridatOpakovane(): GAction;
        SetData(data: any): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class UloznaMistaDlg extends GContentBase<Wfl.ListAC.WflListBaseAC> {
        TypZobrazeni: Spi.Interface.TypZobrazeniUlozeniDoSpisovny;
        validators: any;
        stromList: Spi.Interface.GTreeNodeULMDto[];
        leftSbCnt$: any;
        leftSb$: any;
        gridStrom: any;
        Vyber: boolean;
        model: Spi.Interface.GUloznaMistaFilterDto;
        Selected: string[];
        aktRowId: string;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        NaplnGrid(): void;
        CreateGridFormat(): void;
        VytvoritStromoGrid(): void;
        NaplnStromGrid(refresh: boolean): void;
        ZmenaAktivity(pouzeAktivni: boolean): void;
        ZmenaRozbaleniStromu(rozbalit: boolean): void;
        RefreshStrom(): void;
        LoadDataListULM(): void;
        LoadDataStromu(refresh: boolean): void;
        UpdateActions(): void;
        UpdateActionzneaktivnitULM(skupinySel: any): void;
        UpdateActiondetailULM(skupinySel: any): void;
        UpdateActionNovy(skupinySel: any): void;
        UpdateActionOdstranit(skupinySel: any, esuSel: any): void;
        UpdateActionDetail(esuSel: any): void;
        _isDebounced: false;
        NacistUloznaMista(row: Interface.GTreeNodeULMDto): void;
        CreateActionDetailULM(): GAction;
        CreateActionNoveULM(): GAction;
        CreateActionPrehledZaplneni(favorite?: boolean): GAction;
        ReloadData(): void;
        OKClick(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Spi.Lists {
    class UloznaMistaListAC extends GContentBase<Wfl.ListAC.WflListBaseAC> {
        model: Interface.GUloznaMistaFilterDto;
        Vyber: boolean;
        Selected: string[];
        onContentReady(): void;
        CreateGridFormat(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Interface.GUloznaMistaFilterDto): void;
        CreateActionDetailULM(): GAction;
        CreateActionNoveULM(): GAction;
        CreateActionPrehledZaplneni(favorite?: boolean): GAction;
        ReloadData(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class ZaplneniVUloznemMisteAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Client.GPrehledUlozenychFilterDto;
        data: Interface.GSpiUniversalListDto[];
        posledniRezim: Gordic.Wfl.Interface.TypRezimuPraceSeznamu;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GPrehledUlozenychFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class BalikyMultiTaskAC extends GContentBase<PrehledyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
        SetSubtask(typ: Interface.TypSeznamuSpisovny): void;
        CreateActionSubtask(typ: Interface.TypSeznamuSpisovny): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class BalikyNepredaneSpisovneAC extends GContentBase<PrehledyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class BalikyPredaneDoSpisovnyAC extends GContentBase<PrehledyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class DokSpisPredaneDoSpisovnyAC extends GContentBase<SpiListBaseAC> {
        model: Client.GSeznamDokSpisFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GPrehledUlozenychFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class DokSpisProDigitSpisovnuAC extends GContentBase<SpiListBaseAC> {
        model: Interface.GDokSpisProDigitSpiDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Interface.GDokSpisProDigitSpiDto): void;
        ReloadData(): void;
        CreateActionPrenestDoDigitSpi(): GAction;
        CreateActionAktualizovatStavVDigitSpi(): GAction;
        CreateActionPregenerovatSIPAUlozitDoDigitSip(): GAction;
        CreateActionVratitZDigitSpis(): GAction;
        CreateActionVypujcitDipZDigitSpi(): GAction;
        CreateActionVypujcitAZobrazitDipZDigitSpi(): GAction;
        DoAkce(typAkce: Spi.Interface.TypOperaceProDigitSpi, zobrazitDIP?: Boolean): void;
        SaveDIPToClient(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledBalikuBezSpousteciUdalostiAC extends GContentBase<BalikySObsahemListBaseAC> {
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledBalikuPrevzatychAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Client.GPrehledPrevzatychFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GPrehledPrevzatychFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledBalikuSRozdilSPZListAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Wfl.Interface.GDleObsahuFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GDleObsahuFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledBalikuUlozenychAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Client.GPrehledUlozenychFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GPrehledUlozenychFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledDokSpisBezSpousteciUdalostiAC extends GContentBase<SpiListBaseAC> {
        model: Client.GTypSeznamuSpiFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GTypSeznamuSpiFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledDokSpisPrevzatychAC extends GContentBase<SpiListBaseAC> {
        model: Client.GPrehledPrevzatychFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GPrehledPrevzatychFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledDokSpisUlozenychAC extends GContentBase<SpiListBaseAC> {
        model: Client.GPrehledUlozenychFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GPrehledUlozenychFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledNahlizeniNaUlozeneEntityAC extends GContentBase<SpiListBaseAC> {
        model: Client.GPrehledPrevzatychFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
        CreateGridFormat(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledVypujcekAC extends GContentBase<SpiListBaseAC> {
        model: Client.GSeznamDokSpisFilterDto;
        onContentReady(): void;
        CreateGridFormat(): void;
        DelegateStavVypujceni(): GGridColumn<any>;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GSeznamDokSpisFilterDto): void;
        CreateActionVratitVypujcku(): GAction;
        CreateActionDetailu(): GAction;
        CreateActionZtratitVypujcku(): GAction;
        CreateActionDetailVypujcnihoListku(): GAction;
        CreateActionTiskVypujcniKnihy(): GAction;
        GetSelectedGVypujceniWorkDto(): Spi.Interface.GVypujceniWorkDto[];
        DoAkce(typAkce: Spi.Interface.TypAkceVeSpisovne): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledyMultiTaskAC extends GContentBase<PrehledyListBaseAC> {
        IsNewZtraceni: boolean;
        onContentReady(): void;
        ReloadData(): void;
        SetSubtask(typ: Interface.TypSeznamuSpisovny): void;
        CreateActionSubtask(typ: Interface.TypSeznamuSpisovny): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class VypujckyAC extends GContentBase<SpiListBaseAC> {
        model: Client.GPrehledVypujcekFilterDto;
        onContentReady(): void;
        CreateGridFormat(): void;
        DelegateStavVypujceniIcon(): GGridColumn<any>;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Gordic.Spi.Client.GPrehledVypujcekFilterDto): void;
        CreateActionVratitVypujcku(): GAction;
        CreateActionSchvalitVypujcku(): GAction;
        CreateActionZamitnoutVypujcku(): GAction;
        CreateActionVypujcitSchvalene(): GAction;
        CreateActionStornovatZadostOVypujcku(): GAction;
        CreateActionDetailu(): GAction;
        CreateActionZtratitVypujcku(): GAction;
        CreateActionDetailVypujcnihoListku(): GAction;
        CreateActionTiskVypujcniKnihy(): GAction;
        GetSelectedGVypujceniWorkDto(): Spi.Interface.GVypujceniWorkDto[];
        DoAkcePriprava(typAkce: Spi.Interface.TypAkceSVypujckami, poznamka?: string): void;
        DoAkceCall(typAkce: Spi.Interface.TypAkceSVypujckami, duvod: string): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrehledyListBaseAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Interface.GSpiPrehledFilterDto;
        static InitList(content: GContentType<PrehledyListBaseAC>): void;
        static CreateList(content: GContentType<PrehledyListBaseAC>): void;
        static LoadDataPrehledu(content: GContentType<PrehledyListBaseAC>, filtr?: Interface.GSpiPrehledFilterDto): void;
        static CreateFilterForms(content: GContentType<PrehledyListBaseAC>): Gordic.Forms.Form[];
        static SekceTypRezimuPraceSeznamu(initialValue: Interface.TypDokSpis): Gordic.Forms.FormRow[];
        static AfterLoadData(content: GContentType<PrehledyListBaseAC>): void;
        static CreateActions(content: GContentType<PrehledyListBaseAC>): void;
        static EnabledAction(content: GContentType<PrehledyListBaseAC>): void;
        static CreateActionVratitZtraceny(content: GContentType<PrehledyListBaseAC>): GAction;
        static CreateActionKontrolaPredPridelenimDoSpisovny(content: GContentType<PrehledyListBaseAC>, favorite?: boolean): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class PripravaNavrhuDelimitaAC extends GContentBase<GSkartNavrhListBaseAC> {
        onContentReady(): void;
        CreateGridFormat(): void;
        CreateActionPridat(): GAction;
        CreateActionPripravitNavrhDelimitace(): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class PripravaSkartNavrhAC extends GContentBase<GSkartNavrhListBaseAC> {
        private _$fileField;
        model: Interface.GPripravaSkartNavrhuFiltrDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GPripravaSkartNavrhuFiltrDto): void;
        CreateActionNacistZeSouboru(): GAction;
        FiltrULM(): void;
        VyberULM(): void;
        addFileDoc(): void;
        private _addFile;
        SekceTypMimoradneSkartace(opt?: GRadioOptions<any>): Gordic.Forms.FormRow[];
        CreateActionKontrola(): GAction;
        CreateActionPridat(): GAction;
        Pridat(selected: string[], vymazat: boolean): void;
        CreateActionVyjmout(): GAction;
        CreateActionZmenitSkartZnak(akce: Interface.TypAkceSkartacnihoRizeni): GAction;
        CreateActionDocasneVyradit(): GAction;
        CreateActionZaraditZpet(): GAction;
        CreateActionZrusitPozastaveni(): GAction;
        CreateActionPripravitSkartNavrh(): GAction;
        CreateActionZmenitRokSkartace(favorite?: boolean): GAction;
        DoAkciSeSkartacnimRizenim(akce: Interface.TypAkceSkartacnihoRizeni, input: Interface.SkartRizeniAkceInputDto): void;
        ProvedAkciSeSkartacnimRizenim(akce: Interface.TypAkceSkartacnihoRizeni, selected: Spi.Interface.GSkartRizeniListOperationDto[], input: Interface.SkartRizeniAkceInputDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class SkartNavrhyAProtokolyAC extends GContentBase<GSkartNavrhListBaseAC> {
        model: Interface.GSkartNavrhFiltrDto;
        private _$fileFieldDavkaZNDA;
        private _$fileFieldNacteniDat;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        ChangeOperaceSDokSpisy(OperaceSDokSpisy: boolean): void;
        ChangeVyber(IxsSkartace: string): void;
        /**
         * Metoda pro vyvolání okna pro upload souborů, interně se využívá
         * gfilefield
         * @param event metoda potřebuje originální event od uživatele, jinak se
         * může spouštění dialogu pro upload nezdařit, event od uživatele má na
         * sobě isThrusted, což nelze zcela umělým eventem udělat.
         */
        addFileDavkaZNDA(): void;
        LoadData(filtr?: Interface.GSkartNavrhFiltrDto): void;
        AfterLoadData(): void;
        EnabledActionNavrhu(): void;
        CreateGridFormatDelimitace(): void;
        ReloadData(): void;
        GetTypSkartacnihoRizeniBySkartZnak(SkarZnak: string): Interface.TypSkartacnihoRizeni;
        CreateActionProvestSkartRizeni(): GAction;
        ProvestSkartRizeni(_asSelected: Spi.Interface.GSkartRizeniListOperationDto[]): void;
        CreateActionPridatBalik(): GAction;
        CreateActionPridatEntitu(): GAction;
        PridatDleId(): void;
        SetData(data: Interface.GSpitskeDto[]): void;
        CleanData(): void;
        CreateActionPrejmenovatSkartRizeni(): GAction;
        CreateActionVyjmout(): GAction;
        CreateActionVyjmoutSVlozenimDoBaliku(): GAction;
        CreateActionPrejmenovat(): GAction;
        CreateActionOdstranit(): GAction;
        CreateActionOdeslatSN(): GAction;
        CreateActionVratitOdeslanySN(): GAction;
        CreateActionDelimitovat(): GAction;
        CreateActionNacistZeSouboru(): GAction;
        addFileIxsZup(): void;
        private _addFileIxsZup;
        CreateActionNacistInfoNDA(): GAction;
        /**
         * Spustí serverovou logiku pro přidání elektronické přílohy
         * @param fileInfo
         */
        private _addFile;
        CreateActionVyraditZeSkartNavrhu(): GAction;
        CreateActionPrecislovat(): GAction;
        GetSelectedIDsThis(): string[];
        CreateActionPreradit(typ: Spi.Interface.TypSkartacnihoZnaku): GAction;
    }
}
declare namespace Gordic.Spi.Lists {
    class GSkartNavrhListBaseAC extends GContentBase<BalikySObsahemListBaseAC> {
        SkartRizeniEnabled: boolean;
        SkartRizeniContext: Interface.SkartRizeniContext;
        IxsSkartace: string;
        UsedTypZobrazeniSeznamu: Interface.TypZobrazeniSeznamuSpi;
        OperaceSDokSpisy: boolean;
        ZobrazeniPoEntitach: boolean;
        TypZobrazeniSeznamuPoBalikachTyp: Interface.TypZobrazeniSeznamuSpi;
        static InitList(content: GContentType<GSkartNavrhListBaseAC>): void;
        static CreateGridFormat(content: GContentType<GSkartNavrhListBaseAC>): void;
        static SekceTypRezimuPraceSeznamu(content: GContentType<GSkartNavrhListBaseAC>, opt?: GRadioOptions<any>): Gordic.Forms.FormRow[];
        static SetEnableOperaceSDokSpisy(content: GContentType<GSkartNavrhListBaseAC>): void;
        static GetSelectedListDto(content: GContentType<SpiListBaseAC>): Spi.Interface.GSkartRizeniActionListDto[];
        static GetGridDokSpis(content: GContentType<GSkartNavrhListBaseAC>, gridColumnsDefinition: Gordic.Data.GridFormat, AkceDokspisEnabled: boolean, ZobrazeniPoEntitach: boolean): JQuery;
        static RowsCheckEnabled(row: MetaRow<any>, AkceDokspisEnabled: boolean): boolean;
        static GetSelectedDataOperationDto(content: GContentType<GSkartNavrhListBaseAC>): Spi.Interface.GSkartRizeniListOperationDto[];
        static EnabledAction(content: GContentType<GSkartNavrhListBaseAC>): void;
        static SetEnabledGenerovatSIP(content: GContentType<GSkartNavrhListBaseAC>, enabled: boolean): void;
        static CreateActionTiskSkartNavrhu(content: GContentType<GSkartNavrhListBaseAC>): GAction;
        static TiskSkartNavrhuNeboProtokolu(content: GContentType<GSkartNavrhListBaseAC>, typ: Interface.TypSkartacnihoDokladu, event?: JQueryEventObject): void;
    }
}
declare namespace Gordic.Spi.Lists {
    class KontrolaFormatuSouboruAC extends GContentBase<SpiListBaseAC> {
        model: Wfl.Interface.GElSouboryFilterDto;
        prepsatPromomId: boolean;
        onContentReady(): void;
        CreateDefaultForm(): Forms.Form;
        CreateGrid(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr: any): void;
        ReloadData(): void;
        CreateActionKontrolaFormatu(): GAction;
        KontrolaFormatuVybranych(_selected: Wfl.Interface.ElSouboryExtendedListDto[]): JQuery.Promise<boolean>;
        KontrolaFormatu(_row: Wfl.Interface.ElSouboryExtendedListDto): JQuery.Promise<boolean>;
    }
}
declare namespace Gordic.Spi.Lists {
    class PrepocetRokuSkartaceAC extends GContentBase<BalikySObsahemListBaseAC> {
        model: Interface.GSpiPrehledFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GPropocetRokuSkartaceFilterDto): void;
        ReloadData(): void;
        CreateActionPrepocetVse(): GAction;
        CreateActionPrepocetRokuSkartace(): GAction;
        PrepocetRokuSkartace(prepocitatVse: boolean): void;
    }
}
declare namespace Gordic.Spi.Other {
    class StartPage extends GContentBase<Wfl.AC.WflBaseAC> {
        model: Interface.GSpiSouhrnInfoDto;
        IsPovolenoZadostiOVypujcky: boolean;
        IfSpousteciUdalosti: boolean;
        IfSkartRizeniPoEntitach: boolean;
        scorecardItems: any[];
        divSection0: JQuery<HTMLElement> | undefined;
        divSection1: JQuery<HTMLElement> | undefined;
        divSection2: JQuery<HTMLElement> | undefined;
        onContentReady(): void;
        GenerateKpi(): void;
        NavigateVypujcky(stav: Interface.StavVypujceniEnum): void;
        NavigateZadostiOVypujcky(stav: Interface.StavVypujceniEnum): void;
        NavigateKPrevzetiBaliku(): void;
        NavigateTo(name: string): void;
        ShowCounts(): void;
        LoadData(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Spi.Prefabs {
    /**
     * Vytvoří sloupce gridu dle zadaných jmen.
     *
     * @param {("datumZmeny" | "zmenuProvedl" | "popisZmeny" | "poradoveCislo")[]} columnNames Pole názvů sloupců, pro které jsou připraveny prefaby.
     * @par-am {Gordic.Data.GridFormat<TRow>} [gridFormat] GridFormat na který se vloží nový sloupec. Pokud není definován, pak se vytvoří nový.
     * @returns {Gordic.Data.GridFormat<TRow>} Gridformat s nově vloženými sloupečky.
     */
    function columns<TRow>(columnNames: ("datumZmeny" | "zmenuProvedl" | "popisZmeny" | "poradoveCislo" | "spisovnaOd" | "referentOd" | "spisovyUzelOd" | "barva" | "ixp" | "znacka" | "nazev" | "datumSkartace" | "datumPrijetiDoSpisovny" | "datumPodani" | "datumUzavreni" | "datumVyrizeni" | "vypujceno" | "spisovyPlan" | "spisovyZnak" | "skartacniLhuta" | "stavVArchivu" | "idArchivu" | "posouzeniNDA" | "stavDokumnetuSpisu")[]): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Spisovna od.
     * Data: nazev_spi_od
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function spisovnaOdColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum přijetí do spisovny.
     * Data: dat_prij_spi
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumPrijetiDoSpisovnyColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Vypůjčeno.
     * Data: priz_vyp_txt
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function vypujcenoColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Stav v archivu.
     * Data: stav_ext_arch_txt
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function stavVArchivuColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
 * Vytvoří sloupec Stav v archivu.
 * Data: stav_ext_arch_txt
 *
 * @author  TFeik
 * @date    18.07.2018
 *
 * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
 * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
 */
    function poznamkaColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec ID archivu.
     * Data: id_ext_arch
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function idArchivuColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Posouzení NDA.
     * Data: priz_pos_na_txt
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function posouzeniNDAColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function ixsZupColumn(): GGridColumn<any>;
    function ZmenuProvNazevAddColumn(): GGridColumn<any>;
    function poradiAddColumn(): GGridColumn<any>;
    function ixsZnackaZupColumn(): GGridColumn<any>;
    function spisPlColumn(): GGridColumn<any>;
    function vskNazevColumn(): GGridColumn<any>;
    function spisZnakColumn(): GGridColumn<any>;
    function spisZnakNazev(): GGridColumn<any>;
    function stavSIPkColumn(): GGridColumn<any>;
    function datGenerSIPkColumn(): GGridColumn<any>;
    function datSmazaniColumn(): GGridColumn<any>;
    function skarZnakColumn(): GGridColumn<any>;
    function skarZnakDleSpZnakuColumn(): GGridColumn<any>;
    function skarZnakSPZColumn(): GGridColumn<any>;
    function skarLhutaColumn(): GGridColumn<any>;
    function skarLhutaDleSpZnaku(): GGridColumn<any>;
    function skarLhutaSPZColumn(): GGridColumn<any>;
    function budovaSegmentMistnostAddColumn(): GGridColumn<any>;
    function typBalikuTxtColumn(): GGridColumn<any>;
    function vecColumn(): GGridColumn<any>;
    function ixpTssColumn(): GGridColumn<any>;
    function typAgendyColumn(): GGridColumn<any>;
    function typDokSpisColumn(): GGridColumn<any>;
    function ixpDilColumn(): GGridColumn<any>;
    function nazevSpisuColumn(): GGridColumn<any>;
    function nazevDilColumn(): GGridColumn<any>;
    function stavSulTxtColumn(): GGridColumn<any>;
    function stavVArchivuTxtColumn(): GGridColumn<any>;
    function posouzeniNDATxtColumn(): GGridColumn<any>;
    function ÏDArchivuColumn(): GGridColumn<any>;
    function stav_sulColumn(): GGridColumn<any>;
    function priz_vypColumn(): GGridColumn<any>;
    function priz_sknColumn(): GGridColumn<any>;
    function ixsUlmColumn(): GGridColumn<any>;
    function popisUlmColumn(): GGridColumn<any>;
    function ixsUlmNadColumn(): GGridColumn<any>;
    function datPrijSpi(): GGridColumn<any>;
    function prevzatoOdTxtColumn(sloupec?: string): GGridColumn<any>;
    function prevzatoOdSUTxtColumn(sloupec?: string): GGridColumn<any>;
    function porCisloAddColumn(): GGridColumn<any>;
    function rokOdColumn(): GGridColumn<any>;
    function rokDoColumn(): GGridColumn<any>;
    function rokOdDoAddColumn(): GGridColumn<any>;
    function paprsekColumn(): GGridColumn<any>;
    function policeColumn(): GGridColumn<any>;
    function nazevZmenuProvAddColumn(): GGridColumn<any>;
    function vypujcilColumn(): GGridColumn<any>;
    function nazevZmenuProvColumn(): GGridColumn<any>;
    function ixsVylColumn(): GGridColumn<any>;
    function subVypTxtColumn(): GGridColumn<any>;
    function znackaVylColumn(): GGridColumn<any>;
    function ixsColumn(): GGridColumn<any>;
    function nahlizelColumn(): GGridColumn<any>;
    function nahlizeniColumn(): GGridColumn<any>;
    function obsahTextColumn(): GGridColumn<any>;
    function pocetPisJedTxtColumn(): GGridColumn<any>;
    function prevzalTxtColumn(JeVespisovne: boolean): GGridColumn<any>;
    function popisColumn(): GGridColumn<any>;
    function IDAipBalickuColumn(): GGridColumn<any>;
    function SpisZnakNazevColumn(): GGridColumn<any>;
    function rokSkartaceColumn(): GGridColumn<any>;
    function prizCelyZupColumn(): GGridColumn<any>;
    function rokDatVznikuColumn(sloupec?: string): GGridColumn<any>;
    function datVracColumn(): GGridColumn<any>;
    function datVypColumn(): GGridColumn<any>;
    function pocetPisJedTxtAddColumn(): GGridColumn<any>;
    function pocetKrabicColumn(): GGridColumn<any>;
    function pocetKrabicBalikuColumn(): GGridColumn<any>;
    function umisteniColumn(): GGridColumn<any>;
    function souvisejiciColumn(): GGridColumn<any>;
    function ukladaciZnackaColumn(): GGridColumn<any>;
    function idExtSpi(): GGridColumn<any>;
    function vlastnictviColumn(): GGridColumn<any>;
    function vypujceniColumn(): GGridColumn<any>;
    function GIdentifikatorVypujcnihoListku(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GIdentifikatorDokumentu(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GIdentifikatorSpisu(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GIdentifikatorBaliku(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GIdentifikatorUloznehoMista(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function DelegateTypBalikyIcon(): GGridColumn<any>;
    function DelegateStavVBaliku(): GGridColumn<any>;
    function DelegateStavVeSpisovneIcon(): GGridColumn<any>;
    function rokKonSpuColumn(): GGridColumn<any>;
}
declare namespace Gordic.Spi.Prefabs.Field {
    /**
     * Enum názvů políček použitých ve formuláři uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    11.12.2018
     */
    enum Names {
        umisteni = "Umisteni_2XpeEp",
        idBalikuVExterniSpisovne = "IdBalikuVExterniSpisovne_r4mQH5",
        police = "Police_pvUA6F",
        paprsek = "Paprsek_NJe8eE",
        vcetneVnorenych = "VcetneVnorenych_q4SLNL",
        vecVlozenehoDokumentu = "VecVlozenehoDokumentu_AQWk85",
        vecVlozenehoDokumentuPodrobne = "VecVlozenehoDokumentuPodrobne_Tbk6pM",
        ulozneMisto = "UlozneMisto_R2KmJc",
        ulozneMistoNadrizene = "UlozneMistoNad",
        typUloznehoMista = "TypUloznehoMista_W392zm",
        typUloznehoMistaNadrizeneho = "TypUloznehoMistaNadrizeneho",
        skartacniNavrh = "skartacniNavrh_R2KmAA",
        ixsUlm = "ixsUlm",
        popis = "popis",
        ixsUlmNadrizene = "ixsUlmNad",
        ixsZup = "ixsZup",
        vlhkost = "vlhkost",
        kapacita_krabic = "kapacita_krabic",
        referent = "referent",
        bm_c = "bm_c",
        kubatura_c = "kubatura_c",
        nosnost_c = "nosnost_c"
    }
    function Umisteni(opt?: GStringBoxOptions): GStringBoxOptions;
    function IdBalikuVExterniSpisovne(opt?: GStringBoxOptions): GStringBoxOptions;
    function Police(opt?: GStringBoxOptions): GStringBoxOptions;
    function Paprsek(opt?: GStringBoxOptions): GStringBoxOptions;
    function VcetneVnorenych(opt?: GCheckOptions): GCheckOptions;
    function VecVlozenehoDokumentu(opt?: GStringBoxOptions): GStringBoxOptions;
    function VecVlozenehoDokumentuPodrobne(opt?: GStringBoxOptions): GStringBoxOptions;
    function UlozneMisto(input: {
        /**
         * Ixs spisovny, ve které je uživatel aktuálně přihlášen.
         * @type {string}
         */
        ixsSpi: string;
        /**
         * (Default: true) Příznak, zda se má použí stromové [true], nebo standardní [false] zobrazení selectoru.
         * @type {boolean}
         */
        isTreeSelector?: boolean | null;
    }, opt?: GSelectBoxOptions<Gordic.Data.Readers.SpisulmDto>): GSelectBoxOptions<Gordic.Data.Readers.SpisulmDto>;
    function TypUloznehoMista(opt?: GSelectBoxOptions<Gordic.Data.Readers.SpictyuDto>): GSelectBoxOptions<Gordic.Data.Readers.SpictyuDto>;
    function SkartNavrhy(opt?: GSelectBoxOptions<Gordic.Data.Readers.SpisskaDto>): GSelectBoxOptions<Gordic.Data.Readers.SpisskaDto>;
}
declare namespace Gordic.Spi.Prefabs.Row {
    /**
     * Enum názvů políček použitých ve formuláři uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    11.12.2018
     */
    enum Names {
        ixsBaliku = "IxsBaliku",
        pocetDokumentu = "PocetDokumentu",
        pocetJednotek = "PocetJednotek",
        pocetListu = "PocetListu",
        pocetAnalogovychDokumentu = "PocetAnalogovychDokumentu",
        pocetAnalogovychAnalogovychJednotek = "PocetAnalogovychAnalogovychJednotek",
        vecnaSkupina = "VecnaSkupina",
        skartacniLhutaSpra = "SkartacniLhutaSpra",
        skartacniLhuta = "SkartacniLhuta",
        spisovyZnak = "SpisovyZnak",
        skartacniZnak = "SkartacniZnak",
        rokSkartace = "RokSkartace",
        doSpisovhoArchu = "DoSpisovhoArchu",
        spisovna = "Spisovna",
        police = "Police",
        paprsek = "Paprsek",
        mistnost = "Mistnost",
        cislo = "Cislo",
        rok = "Rok",
        vlastnikBaliku = "VlastnikBaliku"
    }
    /**
     * Prefab políčka Ixs balíku.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.WflcsdoDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GIxsBaliku(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions, mergeButtons?: boolean, others?: {
        showActionGenerujPid?: boolean;
        showActionOpenDetail?: boolean;
    }): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka PocetDokumnetuJednotekSpisu.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.WflcsdoDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GPocetDokumnetuJednotekListu(pocetDokumentuFieldOpt?: GNumberBoxOptions, pocetJednotekFieldOpt?: GNumberBoxOptions, pocetListuFieldOpt?: GNumberBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka PocetAnalogovychDokumnetuJednotek.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.WflcsdoDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GPocetAnalogovychDokumnetuJednotek(pocetAnalogovychDokumentuFieldOpt?: GNumberBoxOptions, pocetAnalogovychJednotekFieldOpt?: GNumberBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
 * Prefab políčka Skartacni znak.
 *
 * @author  TFeik
 * @date    11.12.2018
 * @see [xWiki]{@link }
 *
 * @param {GSelectBoxOptions<Gordic.Data.Readers.SslsspzDto>} [fieldOpt] Options políčka.
 * @param {GFormRowOptions} [rowOpt] Options řádku.
 * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
 */
    function GSkartZnakALhuta(skartacniZnakFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.SslcskzDto>, skartacniLhutaSpraFieldOpt?: GNumberBoxOptions, skartacniLhutaFieldOpt?: GNumberBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka SpisovyZnak.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.SslsspzDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GSpisovyPlanZnak(spisovyZnakFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.SslsspzDto>, skartacniLhutaSpraFieldOpt?: GNumberBoxOptions, skartacniLhutaFieldOpt?: GNumberBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka skartacni rezim.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.SslsspzDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GSkartacniRezim(skartacniZnakFieldOpt?: GStringBoxOptions, rokSkartaceFieldOpt?: GNumberBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka  Rok předání do správního archivu.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.WflcsdoDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GRokPredaniDoSpravnihoArchivu(opt?: {
        fieldOpt?: GNumberBoxOptions;
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka popis.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GSpisovna(opt?: GSelectBoxOptions<Gordic.Data.Readers.SpisspiDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka SpisovyZnak.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.SslsspzDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GMistnostPaprsekPolice(mistnostFieldOpt?: GStringBoxOptions, paprsekFieldOpt?: GStringBoxOptions, policeFieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka SpisovyZnak.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.SslsspzDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GCisloRok(cisloFieldOpt?: GNumberBoxOptions, rokFieldOpt?: GNumberBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GBudovaSegmentMistnost(budovaFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.GinsbudDto>, segmentFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.GinssbuDto>, mistnostFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.GinsmisDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GBudovaSegmentMistnostUmisteni(budovaFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.GinsbudDto>, segmentFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.GinssbuDto>, mistnostFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.GinsmisDto>, umisteniFieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GIdBalikuVExterniSpisovne(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GVecVnorenehoDokumnetu(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GVecVnorenehoDokumnetuPodrobne(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GPolicePaprsek(policeFieldOpt?: GStringBoxOptions, paprsekFieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GVcetneVnorenych(fieldOpt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GUlozneMistoTypUloznehoMista(opt: {
        input: {
            /**
             * Ixs spisovny, ve které je uživatel aktuálně přihlášen.
             * @type {string}
             */
            ixsSpi: string;
        };
        ulozneMistoFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.SpisulmDto>;
        typUloznehoMistaFieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.SpictyuDto>;
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
    /**
     * Prefab vlastníka dokumentu. Dle stavu balíku zobrazí (a případně zafiltruje) vhodné políčko vlastníka (GSpiFunRef nebo GSuFunRef).
     *
     * @author  TFeik
     * @date    13.11.2019
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.SslsspzDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GVlastnikBaliku(opt?: {
        /**
         * Options políčka.
         * @type {GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>}
        */
        fieldOpt?: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>;
        /**
         * Options řádku.
         * @type {GFormRowOptions}
         */
        rowOpt?: GFormRowOptions;
        /**
         * Nastavení prefabu.
         * @type {}
         */
        options?: {
            /**
             * Identifikátor spisovny, na kterou se má vlastník filtrovat (doplní do serverFilters na SPristupemDoSpisovny nebo ixs_su) dle stavu balíku.
             * @type {string}
             */
            ixsSpi?: string;
            /**
             * Stav balíku.
             * @type {number}
             */
            stavSul?: number;
        };
    }): Gordic.Forms.FormRow[];
}
declare namespace Gordic.Search {
    /**
     * Resolver hledající balíku.
     *
     * @author TFeik
     * @date 26.08.2019
     * @since 482.1.0.456
     */
    class GBalikSearchResolver extends Components.Search.GBaseSearchResolver {
        /**
         * Zde vracíme identifikátor resolveru.
         */
        protected getDefaultId(): string;
        /**
         * Zde vracíme informace o doméně resolveru.
         */
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Spi.WebClient {
    /**
     * GHledaniBalikuFilter
     *
     * @author TFeik
     * @date   26.11.2018
     * @since 480.1.0.714
     */
    class GHledaniBalikuFilter extends GContentBase {
        /**
         * Validators
         * @type {object}
         */
        private readonly Validators?;
        /**
         * LogovaniEsu
         * @type {Gin.Globals.Dialogs.IGLogovani}
         */
        private readonly LogovaniEsu?;
        /**
         * GetServer
         *
         * @author TFeik
         * @date    10.12.2018
         */
        private static GetServer;
        /**
         * GetFilterFormValidators
         *
         * @author TFeik
         * @date    10.12.2018
         *
         * @returns {JQuery.Promise<object>}
         */
        private static GetFilterFormValidators;
        /**
         * Na daný element vloží filtrpanel nastavený pro hledání zásilek
         *
         * @param {JQuery<HTMLElement>} appendTo Element, na tkerý je filtrpanel uložen (typicky content.element).
         * @param {(seznamZasilek: Interface.GSeznamZasilekDto[])} searchDoneFunction Funkce, která se zavolá po vyhledání zásilek. Jak vstup je seznma nalezených zásilek, který následně můžete například uložit do gridu.
         * @returns {JQuery.Promise<JQuery<HTMLElement>>} Vrací promise dovu, na kterém je filtrpanel.
         */
        static createFilterPanelHledaniBaliku(opt: {
            appendTo: JQuery<HTMLElement>;
            applyStartFunction?: () => void;
            searchDoneFunction?: (seznamBaliku: Interface.GSpiUniversalListDto[]) => void;
            typHledaniBaliku: Interface.TypHledaniBaliku;
            defaultFilter?: Spi.Interface.GHledaniBalikuDto;
            /**
             * Ixs spisovny, do které je uživatel aktuálně přihlášen.
             * @type {string}
             */
            ixsSpi: string;
            /**
             * (default: Uživatel si může vybrat ze všech dostupných módů) Povolení změny modu zobrazení filtru uživatelem.
             *
             * Zadejte módy filtru, mezi kterými může uživatel volit.
             * Možnost 'Deny' zakáže tuto volbu.
             *
             * Poznámka: Pokud chcete uživateli povolit pouze jeden mód, pak jej nastavte jako filterViewMode a filterViewModeUserSettings nastavte na 'Deny'.
             * @type {FilterViewMode[] | 'Deny'}
             */
            filterViewModeUserSettings?: FilterViewMode[] | 'Deny';
            identifikatorBalikuOptions?: Pick<Gin.Prefabs.Field.IdentifikatorOptions, 'onLengthGoalReached'>;
            globalSettings: Data.IGStorage | undefined | null;
            IfVecneSkupiny: boolean | null;
            parentContent: GContent;
        }): JQuery.Promise<JQuery<HTMLElement>>;
        /**
         * createFilterPanel
         *
         * @author  TFeik
         * @date    27.11.2018
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @param {filterFormOptions} fieldOptions
         * @param {object} [validators]
         * @returns {JQuery<HTMLElement>}
         */
        private static createFilterPanel;
        /**
         * Vytvoří formulář pro filtraci / hledání balíků.
         *
         * @author  TFeik
         * @date    27.11.2018
         *
         * @param {filterFormOptions} fieldOptions
         * @returns {Forms.Form} Definice formuláře.
         */
        private static createFilterForm;
    }
}
declare namespace Gordic.Search {
    /**
     * Resolver hledající neevidovaný dokument.
     *
     * @author  TFeik
     * @date    20.05.2021
     */
    class GNeevidovanyDokumentSearchResolver extends Components.Search.GBaseSearchResolver {
        readonly typeGuesser: Utils.GTypeGuesser;
        private readonly logger;
        /**
         * Zde vracíme identifikátor resolveru.
         */
        protected getDefaultId(): string;
        /**
         * Zde vracíme informace o doméně resolveru.
         */
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Search {
    /**
     * Resolver hledající neevidovaný spis.
     *
     * @author  TFeik
     * @date    20.05.2021
     */
    class GNeevidovanySpisSearchResolver extends Components.Search.GBaseSearchResolver {
        readonly typeGuesser: Utils.GTypeGuesser;
        private readonly logger;
        /**
         * Zde vracíme identifikátor resolveru.
         */
        protected getDefaultId(): string;
        /**
         * Zde vracíme informace o doméně resolveru.
         */
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
