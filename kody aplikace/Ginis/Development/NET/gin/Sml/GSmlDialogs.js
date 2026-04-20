"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.GGinDialogs.ts                         </Name>
//    <Description> dialog pridani noveho PSC                                   </Description>
//    <Author>      TFeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2019                            </Copyright>
//    <Created>     2019-10-16                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var Dialogs;
        (function (Dialogs) {
            /**
             * [OBSOLITE] Použijte "Gordic.Gui.Dialogs._openDialog".
             * [INTERNAL] Pouze pro použití v Gordic.Gin/Esu/Wfl/Ssl/.../.Dialogs! Neslouží k otevření samostatného dialogu!
             * Vnitřní funkce pro zjednodušení obsluhy otevírání dialogů
             *
             * @auth TFeik
             * @date 12.03.2018
             *
             * @param {GContent | GDlgNamespace} pContent Nadřazený content.
             * @param {JQueryDeferred<TOutputData>} deferred Deferred zavření dialogu.
             * @param {string} dialogName Název (class) dialogu včetně namespace. Pokud je předáván v poli s dalšími parametry, pak musí být jméno na prvním místě pole (index 0).
             * @param {Gordic.Global.Enums.ModOtevreni} modOtevreni Mód otevření dialogu.
             * @param {any} options Options contentu (ID, JsonProperty).
             * @param {GDialogOptions} windowParams Options dialogu.
             * @returns
             */
            function _openDialog(pContent, deferred, dialogName, modOtevreni, options, windowParams) {
                return Gordic.Gui.Dialogs._openDialog(pContent, deferred, dialogName, modOtevreni, options, windowParams);
            }
            Dialogs._openDialog = _openDialog;
            function GSmlDetailOpenDlg(input) {
                const grid = input.opt?.Grid;
                if (input.opt?.Grid) {
                    input.opt.Grid = undefined;
                }
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSMLDetail',
                    openDialogParams: input,
                    newGpc: input.gpc,
                    remoteControlGrid: grid
                });
            }
            Dialogs.GSmlDetailOpenDlg = GSmlDetailOpenDlg;
            /**
             * Založení novýho partneru v detailu dokladu
             * @param input params
             */
            function GSmlPartneriNewDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSMLPartnerNew',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlPartneriNewDlg = GSmlPartneriNewDlg;
            function GSmlPolFPPripadRezervaceDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlPolFPPripadRezervace',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlPolFPPripadRezervaceDlg = GSmlPolFPPripadRezervaceDlg;
            /**
             * Zápisy
             * @param input params
             */
            function GSmlZapisyDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlZapisy',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlZapisyDlg = GSmlZapisyDlg;
            /**
             * Info dokladu
             * @param input params
             */
            function GSmlInfoDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlInfo',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlInfoDlg = GSmlInfoDlg;
            /**
             * Položky UP
             * @param input params
             */
            function GSmlPolozkyUPDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlPolozkyUP',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlPolozkyUPDlg = GSmlPolozkyUPDlg;
            /**
             * Položky FP
             * @param input params
             */
            function GSmlPolozkyFPDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlPolozkyFP',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlPolozkyFPDlg = GSmlPolozkyFPDlg;
            /**
             * Přesun prostředků z položky na jinou (Položky FP)
             * @param input params
             */
            function GSmlPolFPDokladPresunDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlPolFPDokladPresun',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlPolFPDokladPresunDlg = GSmlPolFPDokladPresunDlg;
            /**
             * Platební kalendář pro dodavatelské doklady
             * @param input params
             */
            function GSmlPlatbKalDodDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlPlatebKalDod',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlPlatbKalDodDlg = GSmlPlatbKalDodDlg;
            /**
             * Platební kalendář pro odběratelské doklady
             * @param input params
             */
            function GSmlPlatbKalOdbDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlPlatebKalOdb',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlPlatbKalOdbDlg = GSmlPlatbKalOdbDlg;
            /**
             * Platební kalendář pro odběratelské doklady - detail pohledávky
             * @param input params
             */
            function GSmlPlatbKalPohDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlPlatebKalPoh',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlPlatbKalPohDlg = GSmlPlatbKalPohDlg;
            /**
             * Uvolnění prostředků
             * @param input params
             */
            function GSmlUvolneniDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlUvolneni',
                    openDialogParams: input
                });
            }
            Dialogs.GSmlUvolneniDlg = GSmlUvolneniDlg;
            /**
             * Vytvoření kopie dokladu
             * @param input params
             */
            function GSmlMakeCopyDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlMakeCopy',
                    openDialogParams: input,
                    windowParams: { height: 640, width: 660 }
                });
            }
            Dialogs.GSmlMakeCopyDlg = GSmlMakeCopyDlg;
            /**
             * Vytvoření podřízené objednávky ze smlouvy
             * @param input params
             */
            function GSmlMakeObjDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Sml.WebClient.GSmlMakeObj',
                    openDialogParams: input,
                    windowParams: { height: 750, width: 660 }
                });
            }
            Dialogs.GSmlMakeObjDlg = GSmlMakeObjDlg;
        })(Dialogs = Sml.Dialogs || (Sml.Dialogs = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbERpYWxvZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU21sRGlhbG9ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBRWpCLElBQVUsTUFBTSxDQW9OZjtBQXBORCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvTm5CO0lBcE5nQixXQUFBLEdBQUc7UUFBQyxJQUFBLE9BQU8sQ0FvTjNCO1FBcE5vQixXQUFBLE9BQU87WUFDeEI7Ozs7Ozs7Ozs7Ozs7OztlQWVHO1lBQ0gsU0FBZ0IsV0FBVyxDQUN2QixRQUFrQyxFQUNsQyxRQUFxQyxFQUNyQyxVQUE0RSxFQUM1RSxXQUE0QyxFQUM1QyxPQUFhLEVBQ2IsWUFBNkI7Z0JBRTdCLE9BQU8sT0FBQSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3ZHLENBQUM7WUFUZSxtQkFBVyxjQVMxQixDQUFBO1lBRUQsU0FBZ0IsaUJBQWlCLENBQzdCLEtBQTZIO2dCQUU3SCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztnQkFDN0IsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUNsQixLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQy9CLENBQUM7Z0JBQ0QsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQXVGO29CQUN4SCxVQUFVLEVBQUUsaUNBQWlDO29CQUM3QyxnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUc7b0JBQ2pCLGlCQUFp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QU8sR0FBUCxXQUFPLEtBQVAsV0FBTyxRQW9OM0I7SUFBRCxDQUFDLEVBcE5nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFvTm5CO0FBQUQsQ0FBQyxFQXBOUyxNQUFNLEtBQU4sTUFBTSxRQW9OZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuR2luLldlYkNsaWVudC5HR2luRGlhbG9ncy50cyAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gZGlhbG9nIHByaWRhbmkgbm92ZWhvIFBTQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBURmVpayAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxOS0xMC0xNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuRGlhbG9ncyB7XHJcbiAgICAvKipcclxuICAgICAqIFtPQlNPTElURV0gUG91xb5panRlIFwiR29yZGljLkd1aS5EaWFsb2dzLl9vcGVuRGlhbG9nXCIuXHJcbiAgICAgKiBbSU5URVJOQUxdIFBvdXplIHBybyBwb3XFvml0w60gdiBHb3JkaWMuR2luL0VzdS9XZmwvU3NsLy4uLi8uRGlhbG9ncyEgTmVzbG91xb7DrSBrIG90ZXbFmWVuw60gc2Ftb3N0YXRuw6lobyBkaWFsb2d1IVxyXG4gICAgICogVm5pdMWZbsOtIGZ1bmtjZSBwcm8gemplZG5vZHXFoWVuw60gb2JzbHVoeSBvdGV2w61yw6Fuw60gZGlhbG9nxa9cclxuICAgICAqICBcclxuICAgICAqIEBhdXRoIFRGZWlrXHJcbiAgICAgKiBAZGF0ZSAxMi4wMy4yMDE4XHJcbiAgICAgKiAgXHJcbiAgICAgKiBAcGFyYW0ge0dDb250ZW50IHwgR0RsZ05hbWVzcGFjZX0gcENvbnRlbnQgTmFkxZlhemVuw70gY29udGVudC5cclxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5RGVmZXJyZWQ8VE91dHB1dERhdGE+fSBkZWZlcnJlZCBEZWZlcnJlZCB6YXbFmWVuw60gZGlhbG9ndS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaWFsb2dOYW1lIE7DoXpldiAoY2xhc3MpIGRpYWxvZ3UgdsSNZXRuxJsgbmFtZXNwYWNlLiBQb2t1ZCBqZSBwxZllZMOhdsOhbiB2IHBvbGkgcyBkYWzFocOtbWkgcGFyYW1ldHJ5LCBwYWsgbXVzw60gYsO9dCBqbcOpbm8gbmEgcHJ2bsOtbSBtw61zdMSbIHBvbGUgKGluZGV4IDApLlxyXG4gICAgICogQHBhcmFtIHtHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pfSBtb2RPdGV2cmVuaSBNw7NkIG90ZXbFmWVuw60gZGlhbG9ndS5cclxuICAgICAqIEBwYXJhbSB7YW55fSBvcHRpb25zIE9wdGlvbnMgY29udGVudHUgKElELCBKc29uUHJvcGVydHkpLlxyXG4gICAgICogQHBhcmFtIHtHRGlhbG9nT3B0aW9uc30gd2luZG93UGFyYW1zIE9wdGlvbnMgZGlhbG9ndS5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBfb3BlbkRpYWxvZzxUT3V0cHV0RGF0YT4oXHJcbiAgICAgICAgcENvbnRlbnQ6IEdDb250ZW50IHwgR0RsZ05hbWVzcGFjZSxcclxuICAgICAgICBkZWZlcnJlZDogSlF1ZXJ5RGVmZXJyZWQ8VE91dHB1dERhdGE+LFxyXG4gICAgICAgIGRpYWxvZ05hbWU6IHN0cmluZyB8IChzdHJpbmcgfCBPYmplY3RMaXRlcmFsPGFueT4pW10gfCBJR0NsaWVudENvbnRlbnRPYmplY3QsXHJcbiAgICAgICAgbW9kT3RldnJlbmk6IEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmksXHJcbiAgICAgICAgb3B0aW9ucz86IGFueSxcclxuICAgICAgICB3aW5kb3dQYXJhbXM/OiBHRGlhbG9nT3B0aW9uc1xyXG4gICAgKTogSlF1ZXJ5RGVmZXJyZWQ8VE91dHB1dERhdGE+IHtcclxuICAgICAgICByZXR1cm4gR3VpLkRpYWxvZ3MuX29wZW5EaWFsb2cocENvbnRlbnQsIGRlZmVycmVkLCBkaWFsb2dOYW1lLCBtb2RPdGV2cmVuaSwgb3B0aW9ucywgd2luZG93UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1NtbERldGFpbE9wZW5EbGcoXHJcbiAgICAgICAgaW5wdXQ6IEdvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPFNtbC5XZWJDbGllbnQuR1NNTERldGFpbElucHV0UGFyYW1zIHwgdW5kZWZpbmVkPiAmIHsgZ3BjPzogT2JqZWN0TGl0ZXJhbDxzdHJpbmc+IH1cclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IGdyaWQgPSBpbnB1dC5vcHQ/LkdyaWQ7XHJcbiAgICAgICAgaWYgKGlucHV0Lm9wdD8uR3JpZCkge1xyXG4gICAgICAgICAgICBpbnB1dC5vcHQuR3JpZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEdvcmRpYy5HdWkuRGlhbG9ncy5idWlsZERpYWxvZzxTbWwuV2ViQ2xpZW50LkdTTUxEZXRhaWxJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZCwgU21sLldlYkNsaWVudC5HU01MRGV0YWlsUmV0dXJuVmFsdWU+KHtcclxuICAgICAgICAgICAgZGlhbG9nTmFtZTogJ0dvcmRpYy5TbWwuV2ViQ2xpZW50LkdTTUxEZXRhaWwnLCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvcGVuRGlhbG9nUGFyYW1zOiBpbnB1dCxcclxuICAgICAgICAgICAgbmV3R3BjOiBpbnB1dC5ncGMsXHJcbiAgICAgICAgICAgIHJlbW90ZUNvbnRyb2xHcmlkOiBncmlkXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogWmFsb8W+ZW7DrSBub3bDvWhvIHBhcnRuZXJ1IHYgZGV0YWlsdSBkb2tsYWR1XHJcbiAgICAgKiBAcGFyYW0gaW5wdXQgcGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHU21sUGFydG5lcmlOZXdEbGcoXHJcbiAgICAgICAgaW5wdXQ6IEdvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPFNtbC5XZWJDbGllbnQuR1NNTFBhcnRuZXJOZXdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZD5cclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuR3VpLkRpYWxvZ3MuYnVpbGREaWFsb2c8U21sLldlYkNsaWVudC5HU01MUGFydG5lck5ld0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkLCBTbWwuV2ViQ2xpZW50LkdTTUxQYXJ0bmVyTmV3UmV0dXJuVmFsdWU+KHtcclxuICAgICAgICAgICAgZGlhbG9nTmFtZTogJ0dvcmRpYy5TbWwuV2ViQ2xpZW50LkdTTUxQYXJ0bmVyTmV3JyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczogaW5wdXRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHU21sUG9sRlBQcmlwYWRSZXplcnZhY2VEbGcoXHJcbiAgICAgICAgaW5wdXQ6IEdvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPFNtbC5XZWJDbGllbnQuR1NtbFBvbEZQUHJpcGFkUmV6ZXJ2YWNlSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQ+XHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gR29yZGljLkd1aS5EaWFsb2dzLmJ1aWxkRGlhbG9nPFNtbC5XZWJDbGllbnQuR1NtbFBvbEZQUHJpcGFkUmV6ZXJ2YWNlSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQsIFNtbC5XZWJDbGllbnQuR1NtbFBvbEZQUHJpcGFkUmV6ZXJ2YWNlUmV0dXJuVmFsdWU+KHtcclxuICAgICAgICAgICAgZGlhbG9nTmFtZTogJ0dvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxQb2xGUFByaXBhZFJlemVydmFjZScsXHJcbiAgICAgICAgICAgIG9wZW5EaWFsb2dQYXJhbXM6IGlucHV0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBaw6FwaXN5XHJcbiAgICAgKiBAcGFyYW0gaW5wdXQgcGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHU21sWmFwaXN5RGxnKFxyXG4gICAgICAgIGlucHV0OiBHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxTbWwuV2ViQ2xpZW50LkdTbWxaYXBpc3lJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZD5cclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuR3VpLkRpYWxvZ3MuYnVpbGREaWFsb2c8U21sLldlYkNsaWVudC5HU21sWmFwaXN5SW5wdXRQYXJhbXMgfCB1bmRlZmluZWQsIFNtbC5XZWJDbGllbnQuR1NtbFphcGlzeVJldHVyblZhbHVlPih7XHJcbiAgICAgICAgICAgIGRpYWxvZ05hbWU6ICdHb3JkaWMuU21sLldlYkNsaWVudC5HU21sWmFwaXN5JyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczogaW5wdXRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluZm8gZG9rbGFkdVxyXG4gICAgICogQHBhcmFtIGlucHV0IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1NtbEluZm9EbGcoXHJcbiAgICAgICAgaW5wdXQ6IEdvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPFNtbC5XZWJDbGllbnQuR1NtbEluZm9EbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZD5cclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuR3VpLkRpYWxvZ3MuYnVpbGREaWFsb2c8U21sLldlYkNsaWVudC5HU21sSW5mb0RsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkLCBTbWwuV2ViQ2xpZW50LkdTbWxJbmZvRGxnUmV0dXJuVmFsdWU+KHtcclxuICAgICAgICAgICAgZGlhbG9nTmFtZTogJ0dvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxJbmZvJyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczogaW5wdXRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvbG/Fvmt5IFVQXHJcbiAgICAgKiBAcGFyYW0gaW5wdXQgcGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHU21sUG9sb3preVVQRGxnKFxyXG4gICAgICAgIGlucHV0OiBHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxTbWwuV2ViQ2xpZW50LkdTTUxQb2xvemt5VVBEbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZD5cclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuR3VpLkRpYWxvZ3MuYnVpbGREaWFsb2c8U21sLldlYkNsaWVudC5HU01MUG9sb3preVVQRGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQsIFNtbC5XZWJDbGllbnQuR1NNTFBvbG96a3lVUERsZ1JldHVyblZhbHVlPih7XHJcbiAgICAgICAgICAgIGRpYWxvZ05hbWU6ICdHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUG9sb3preVVQJyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczogaW5wdXRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvbG/Fvmt5IEZQXHJcbiAgICAgKiBAcGFyYW0gaW5wdXQgcGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHU21sUG9sb3preUZQRGxnKFxyXG4gICAgICAgIGlucHV0OiBHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxTbWwuV2ViQ2xpZW50LkdTTUxQb2xvemt5RlBEbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZD5cclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuR3VpLkRpYWxvZ3MuYnVpbGREaWFsb2c8U21sLldlYkNsaWVudC5HU01MUG9sb3preUZQRGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQsIFNtbC5XZWJDbGllbnQuR1NNTFBvbG96a3lGUERsZ1JldHVyblZhbHVlPih7XHJcbiAgICAgICAgICAgIGRpYWxvZ05hbWU6ICdHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUG9sb3preUZQJyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczogaW5wdXRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFDFmWVzdW4gcHJvc3TFmWVka8WvIHogcG9sb8W+a3kgbmEgamlub3UgKFBvbG/Fvmt5IEZQKVxyXG4gICAgICogQHBhcmFtIGlucHV0IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1NtbFBvbEZQRG9rbGFkUHJlc3VuRGxnKFxyXG4gICAgICAgIGlucHV0OiBHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxTbWwuV2ViQ2xpZW50LkdTbWxQb2xGUERva2xhZFByZXN1bkRsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkPlxyXG4gICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIEdvcmRpYy5HdWkuRGlhbG9ncy5idWlsZERpYWxvZzxTbWwuV2ViQ2xpZW50LkdTbWxQb2xGUERva2xhZFByZXN1bkRsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkLCBTbWwuV2ViQ2xpZW50LkdTbWxQb2xGUERva2xhZFByZXN1bkRsZ1JldHVyblZhbHVlPih7XHJcbiAgICAgICAgICAgIGRpYWxvZ05hbWU6ICdHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUG9sRlBEb2tsYWRQcmVzdW4nLFxyXG4gICAgICAgICAgICBvcGVuRGlhbG9nUGFyYW1zOiBpbnB1dFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxhdGVibsOtIGthbGVuZMOhxZkgcHJvIGRvZGF2YXRlbHNrw6kgZG9rbGFkeVxyXG4gICAgICogQHBhcmFtIGlucHV0IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1NtbFBsYXRiS2FsRG9kRGxnKFxyXG4gICAgICAgIGlucHV0OiBHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxTbWwuV2ViQ2xpZW50LkdTbWxQbGF0ZWJLYWxEb2REbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZD5cclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuR3VpLkRpYWxvZ3MuYnVpbGREaWFsb2c8U21sLldlYkNsaWVudC5HU21sUGxhdGViS2FsRG9kRGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQsIFNtbC5XZWJDbGllbnQuR1NtbFBsYXRlYkthbERvZERsZ1JldHVyblZhbHVlPih7XHJcbiAgICAgICAgICAgIGRpYWxvZ05hbWU6ICdHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUGxhdGViS2FsRG9kJyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczogaW5wdXRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBsYXRlYm7DrSBrYWxlbmTDocWZIHBybyBvZGLEm3JhdGVsc2vDqSBkb2tsYWR5XHJcbiAgICAgKiBAcGFyYW0gaW5wdXQgcGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHU21sUGxhdGJLYWxPZGJEbGcoXHJcbiAgICAgICAgaW5wdXQ6IEdvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPFNtbC5XZWJDbGllbnQuR1NtbFBsYXRlYkthbE9kYkRsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkPlxyXG4gICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIEdvcmRpYy5HdWkuRGlhbG9ncy5idWlsZERpYWxvZzxTbWwuV2ViQ2xpZW50LkdTbWxQbGF0ZWJLYWxPZGJEbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZCwgU21sLldlYkNsaWVudC5HU21sUGxhdGViS2FsT2RiRGxnUmV0dXJuVmFsdWU+KHtcclxuICAgICAgICAgICAgZGlhbG9nTmFtZTogJ0dvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxQbGF0ZWJLYWxPZGInLFxyXG4gICAgICAgICAgICBvcGVuRGlhbG9nUGFyYW1zOiBpbnB1dFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxhdGVibsOtIGthbGVuZMOhxZkgcHJvIG9kYsSbcmF0ZWxza8OpIGRva2xhZHkgLSBkZXRhaWwgcG9obGVkw6F2a3lcclxuICAgICAqIEBwYXJhbSBpbnB1dCBwYXJhbXNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdTbWxQbGF0YkthbFBvaERsZyhcclxuICAgICAgICBpbnB1dDogR29yZGljLkd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8U21sLldlYkNsaWVudC5HU21sUGxhdGViS2FsUG9oRGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQ+XHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gR29yZGljLkd1aS5EaWFsb2dzLmJ1aWxkRGlhbG9nPFNtbC5XZWJDbGllbnQuR1NtbFBsYXRlYkthbFBvaERsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkLCBTbWwuV2ViQ2xpZW50LkdTbWxQbGF0ZWJLYWxQb2hEbGdSZXR1cm5WYWx1ZT4oe1xyXG4gICAgICAgICAgICBkaWFsb2dOYW1lOiAnR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFBsYXRlYkthbFBvaCcsXHJcbiAgICAgICAgICAgIG9wZW5EaWFsb2dQYXJhbXM6IGlucHV0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVdm9sbsSbbsOtIHByb3N0xZllZGvFr1xyXG4gICAgICogQHBhcmFtIGlucHV0IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1NtbFV2b2xuZW5pRGxnKFxyXG4gICAgICAgIGlucHV0OiBHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxTbWwuV2ViQ2xpZW50LkdTbWxVdm9sbmVuaURsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkPlxyXG4gICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIEdvcmRpYy5HdWkuRGlhbG9ncy5idWlsZERpYWxvZzxTbWwuV2ViQ2xpZW50LkdTbWxVdm9sbmVuaURsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkLCBTbWwuV2ViQ2xpZW50LkdTbWxVdm9sbmVuaURsZ1JldHVyblZhbHVlPih7XHJcbiAgICAgICAgICAgIGRpYWxvZ05hbWU6ICdHb3JkaWMuU21sLldlYkNsaWVudC5HU21sVXZvbG5lbmknLFxyXG4gICAgICAgICAgICBvcGVuRGlhbG9nUGFyYW1zOiBpbnB1dFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVnl0dm/FmWVuw60ga29waWUgZG9rbGFkdVxyXG4gICAgICogQHBhcmFtIGlucHV0IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1NtbE1ha2VDb3B5RGxnKFxyXG4gICAgICAgIGlucHV0OiBHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxTbWwuV2ViQ2xpZW50LkdTbWxNYWtlQ29weURsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkPlxyXG4gICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIEdvcmRpYy5HdWkuRGlhbG9ncy5idWlsZERpYWxvZzxTbWwuV2ViQ2xpZW50LkdTbWxNYWtlQ29weURsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkLCBTbWwuV2ViQ2xpZW50LkdTbWxNYWtlQ29weURsZ1JldHVyblZhbHVlPih7XHJcbiAgICAgICAgICAgIGRpYWxvZ05hbWU6ICdHb3JkaWMuU21sLldlYkNsaWVudC5HU21sTWFrZUNvcHknLFxyXG4gICAgICAgICAgICBvcGVuRGlhbG9nUGFyYW1zOiBpbnB1dCxcclxuICAgICAgICAgICAgd2luZG93UGFyYW1zOiB7IGhlaWdodDogNjQwLCB3aWR0aDogNjYwIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZ5dHZvxZllbsOtIHBvZMWZw616ZW7DqSBvYmplZG7DoXZreSB6ZSBzbWxvdXZ5XHJcbiAgICAgKiBAcGFyYW0gaW5wdXQgcGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHU21sTWFrZU9iakRsZyhcclxuICAgICAgICBpbnB1dDogR29yZGljLkd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8U21sLldlYkNsaWVudC5HU21sTWFrZU9iakRsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkPlxyXG4gICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIEdvcmRpYy5HdWkuRGlhbG9ncy5idWlsZERpYWxvZzxTbWwuV2ViQ2xpZW50LkdTbWxNYWtlT2JqRGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQsIFNtbC5XZWJDbGllbnQuR1NtbE1ha2VPYmpEbGdSZXR1cm5WYWx1ZT4oe1xyXG4gICAgICAgICAgICBkaWFsb2dOYW1lOiAnR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbE1ha2VPYmonLFxyXG4gICAgICAgICAgICBvcGVuRGlhbG9nUGFyYW1zOiBpbnB1dCxcclxuICAgICAgICAgICAgd2luZG93UGFyYW1zOiB7IGhlaWdodDogNzUwLCB3aWR0aDogNjYwIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==