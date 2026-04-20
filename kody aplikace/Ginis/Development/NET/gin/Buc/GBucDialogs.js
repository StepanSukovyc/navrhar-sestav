"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GBucDialogs.ts                         </Name>
//    <Description> Třída s dialogy modulu BUC                                  </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-05-15                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var Dialogs;
        (function (Dialogs) {
            /**
             * Dialog pro výběr banky pro načtení dávky
             * @param input params
             */
            function GVyberBankyDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Buc.WebClient.GVyberBanky',
                    openDialogParams: input,
                    windowParams: { width: 350, height: 350 }
                });
            }
            Dialogs.GVyberBankyDlg = GVyberBankyDlg;
            /**
             * Dialog pro kontrolu disponibility bank. účtu
             *
             * @param {Gordic.Gui.Dialogs.OpenDialogParams<Buc.WebClient.GDisponibilitaDlgInputParams | undefined>} input  vstupní parametry
             */
            function GDisponibilitaDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Buc.WebClient.GDisponibilitaDlg',
                    openDialogParams: input,
                    windowParams: { width: 950, height: 400 }
                });
            }
            Dialogs.GDisponibilitaDlg = GDisponibilitaDlg;
            /**
             * Dialog pro seznam výpisů s nedokončeným párováním
             *
             * @param {Gordic.Gui.Dialogs.OpenDialogParams<undefined | undefined>} input  vstupní parametry
             */
            function GNedokonceneParovaniDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Buc.WebClient.GNedokonceneParovani',
                    openDialogParams: input,
                    windowParams: { width: 950, height: 400 }
                });
            }
            Dialogs.GNedokonceneParovaniDlg = GNedokonceneParovaniDlg;
            /**
             * Dialog pro výběr úhrady k párování
             *
             * @param {Gordic.Gui.Dialogs.OpenDialogParams<Buc.WebClient.GVyberUhradyDlgInputParams | undefined>} input  vstupní parametry
             */
            function GVyberUhradyDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Buc.WebClient.GVyberUhrady',
                    openDialogParams: input
                    //windowParams: { width: 950, height: 400 }
                });
            }
            Dialogs.GVyberUhradyDlg = GVyberUhradyDlg;
            //nakonec voláno napřímo
            ///**
            // * Dialog pro zadání částky v měně předpisu
            // *
            // * @param {Gordic.Gui.Dialogs.OpenDialogParams<Buc.WebClient.GVyberUhradyDlgInputParams | undefined>} input  vstupní parametry
            // */
            //export function GManualniParovaniCiziMenaDlg(
            //    input: Gordic.Gui.Dialogs.OpenDialogParams<Buc.WebClient.GManualniParovaniCiziMenaDlgInputParams | undefined>
            //) {
            //    return Gordic.Gui.Dialogs.buildDialog<Buc.WebClient.GManualniParovaniCiziMenaDlgInputParams | undefined, Buc.WebClient.GManualniParovaniCiziMenaDlgReturnValue>({
            //        dialogName: Gordic.Buc.WebClient.GManualniParovaniCiziMena,
            //        openDialogParams: input
            //        //windowParams: { width: 950, height: 400 }
            //    });
            //}
            /**
             * Dialog pro výběr šablony pro likvidaci FUC
             *
             * @param {Gordic.Gui.Dialogs.OpenDialogParams<Buc.WebClient.GSablonaLikvidaceFucSeznamDlgInputParams | undefined>} input  vstupní parametry
             */
            function GSablonaLikvidaceFucSeznamDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Buc.WebClient.GSablonaLikvidaceFucSeznam',
                    openDialogParams: input
                    //windowParams: { width: 950, height: 400 }
                });
            }
            Dialogs.GSablonaLikvidaceFucSeznamDlg = GSablonaLikvidaceFucSeznamDlg;
            /**
             * Dialog pro generování dávek složenek B - zobrazení souborů, tisknutí a uhrazení
             *
             * @param {Gordic.Gui.Dialogs.OpenDialogParams<Buc.WebClient.GDavkaBGenerovaniSouboryDlgInputParams | undefined>} input  vstupní parametry
             */
            function GDavkaBGenerovaniSouboryDlg(input) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Buc.WebClient.GDavkaBGenerovaniSoubory',
                    openDialogParams: input,
                    windowParams: { width: 500, height: 400 }
                });
            }
            Dialogs.GDavkaBGenerovaniSouboryDlg = GDavkaBGenerovaniSouboryDlg;
        })(Dialogs = Buc.Dialogs || (Buc.Dialogs = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0J1Y0RpYWxvZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHQnVjRGlhbG9ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBRWpCLElBQVUsTUFBTSxDQXlHZjtBQXpHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5R25CO0lBekdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE9BQU8sQ0F5RzNCO1FBekdvQixXQUFBLE9BQU87WUFDeEI7OztlQUdHO1lBQ0gsU0FBZ0IsY0FBYyxDQUMxQixLQUErRjtnQkFFL0YsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQStGO29CQUNoSSxVQUFVLEVBQUUsa0NBQWtDO29CQUM5QyxnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7aUJBQzVDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFSZSxzQkFBYyxpQkFRN0IsQ0FBQTtZQUVEOzs7O2VBSUc7WUFDSCxTQUFnQixpQkFBaUIsQ0FDN0IsS0FBa0c7Z0JBRWxHLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFxRztvQkFDdEksVUFBVSxFQUFFLHdDQUF3QztvQkFDcEQsZ0JBQWdCLEVBQUUsS0FBSztvQkFDdkIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO2lCQUM1QyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBUmUseUJBQWlCLG9CQVFoQyxDQUFBO1lBRUQ7Ozs7ZUFJRztZQUNILFNBQWdCLHVCQUF1QixDQUNuQyxLQUFpRTtnQkFFakUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQW1DO29CQUNwRSxVQUFVLEVBQUUsMkNBQTJDO29CQUN2RCxnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7aUJBQzVDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFSZSwrQkFBdUIsMEJBUXRDLENBQUE7WUFFRDs7OztlQUlHO1lBQ0gsU0FBZ0IsZUFBZSxDQUMzQixLQUFnRztnQkFFaEcsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQW9GO29CQUNySCxVQUFVLEVBQUUsbUNBQW1DO29CQUMvQyxnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QiwyQ0FBMkM7aUJBQzlDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFSZSx1QkFBZSxrQkFROUIsQ0FBQTtZQUVELHdCQUF3QjtZQUN4QixLQUFLO1lBQ0wsNkNBQTZDO1lBQzdDLElBQUk7WUFDSixnSUFBZ0k7WUFDaEksS0FBSztZQUNMLCtDQUErQztZQUMvQyxtSEFBbUg7WUFDbkgsS0FBSztZQUNMLHVLQUF1SztZQUN2SyxxRUFBcUU7WUFDckUsaUNBQWlDO1lBQ2pDLHFEQUFxRDtZQUNyRCxTQUFTO1lBQ1QsR0FBRztZQUVIOzs7O2VBSUc7WUFDSCxTQUFnQiw2QkFBNkIsQ0FDekMsS0FBOEc7Z0JBRTlHLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUE2RTtvQkFDOUcsVUFBVSxFQUFFLGlEQUFpRDtvQkFDN0QsZ0JBQWdCLEVBQUUsS0FBSztvQkFDdkIsMkNBQTJDO2lCQUM5QyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBUmUscUNBQTZCLGdDQVE1QyxDQUFBO1lBRUQ7Ozs7ZUFJRztZQUNILFNBQWdCLDJCQUEyQixDQUN2QyxLQUE0RztnQkFFNUcsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQXlIO29CQUMxSixVQUFVLEVBQUUsK0NBQStDO29CQUMzRCxnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7aUJBQzVDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFSZSxtQ0FBMkIsOEJBUTFDLENBQUE7UUFDTCxDQUFDLEVBekdvQixPQUFPLEdBQVAsV0FBTyxLQUFQLFdBQU8sUUF5RzNCO0lBQUQsQ0FBQyxFQXpHZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeUduQjtBQUFELENBQUMsRUF6R1MsTUFBTSxLQUFOLE1BQU0sUUF5R2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR0J1Y0RpYWxvZ3MudHMgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFTFmcOtZGEgcyBkaWFsb2d5IG1vZHVsdSBCVUMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNS0xNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5CdWMuRGlhbG9ncyB7XHJcbiAgICAvKipcclxuICAgICAqIERpYWxvZyBwcm8gdsO9YsSbciBiYW5reSBwcm8gbmHEjXRlbsOtIGTDoXZreVxyXG4gICAgICogQHBhcmFtIGlucHV0IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1Z5YmVyQmFua3lEbGcoXHJcbiAgICAgICAgaW5wdXQ6IEdvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPEJ1Yy5XZWJDbGllbnQuR1Z5YmVyQmFua3lEbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZD5cclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuR3VpLkRpYWxvZ3MuYnVpbGREaWFsb2c8QnVjLldlYkNsaWVudC5HVnliZXJCYW5reURsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkLCBCdWMuV2ViQ2xpZW50LkdWeWJlckJhbmt5RGxnUmV0dXJuVmFsdWU+KHtcclxuICAgICAgICAgICAgZGlhbG9nTmFtZTogJ0dvcmRpYy5CdWMuV2ViQ2xpZW50LkdWeWJlckJhbmt5JyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczogaW5wdXQsXHJcbiAgICAgICAgICAgIHdpbmRvd1BhcmFtczogeyB3aWR0aDogMzUwLCBoZWlnaHQ6IDM1MCB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaWFsb2cgcHJvIGtvbnRyb2x1IGRpc3BvbmliaWxpdHkgYmFuay4gw7rEjXR1XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7R29yZGljLkd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8QnVjLldlYkNsaWVudC5HRGlzcG9uaWJpbGl0YURsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkPn0gaW5wdXQgIHZzdHVwbsOtIHBhcmFtZXRyeVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR0Rpc3BvbmliaWxpdGFEbGcoXHJcbiAgICAgICAgaW5wdXQ6IEdvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPEJ1Yy5XZWJDbGllbnQuR0Rpc3BvbmliaWxpdGFEbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZD5cclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuR3VpLkRpYWxvZ3MuYnVpbGREaWFsb2c8QnVjLldlYkNsaWVudC5HRGlzcG9uaWJpbGl0YURsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkLCBCdWMuV2ViQ2xpZW50LkdEaXNwb25pYmlsaXRhRGxnUmV0dXJuVmFsdWU+KHtcclxuICAgICAgICAgICAgZGlhbG9nTmFtZTogJ0dvcmRpYy5CdWMuV2ViQ2xpZW50LkdEaXNwb25pYmlsaXRhRGxnJyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczogaW5wdXQsXHJcbiAgICAgICAgICAgIHdpbmRvd1BhcmFtczogeyB3aWR0aDogOTUwLCBoZWlnaHQ6IDQwMCB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaWFsb2cgcHJvIHNlem5hbSB2w71waXPFryBzIG5lZG9rb27EjWVuw71tIHDDoXJvdsOhbsOtbVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPHVuZGVmaW5lZCB8IHVuZGVmaW5lZD59IGlucHV0ICB2c3R1cG7DrSBwYXJhbWV0cnlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdOZWRva29uY2VuZVBhcm92YW5pRGxnKFxyXG4gICAgICAgIGlucHV0OiBHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczx1bmRlZmluZWQgfCB1bmRlZmluZWQ+XHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gR29yZGljLkd1aS5EaWFsb2dzLmJ1aWxkRGlhbG9nPHVuZGVmaW5lZCB8IHVuZGVmaW5lZCwgdW5kZWZpbmVkPih7XHJcbiAgICAgICAgICAgIGRpYWxvZ05hbWU6ICdHb3JkaWMuQnVjLldlYkNsaWVudC5HTmVkb2tvbmNlbmVQYXJvdmFuaScsXHJcbiAgICAgICAgICAgIG9wZW5EaWFsb2dQYXJhbXM6IGlucHV0LFxyXG4gICAgICAgICAgICB3aW5kb3dQYXJhbXM6IHsgd2lkdGg6IDk1MCwgaGVpZ2h0OiA0MDAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlhbG9nIHBybyB2w71ixJtyIMO6aHJhZHkgayBww6Fyb3bDoW7DrVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPEJ1Yy5XZWJDbGllbnQuR1Z5YmVyVWhyYWR5RGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQ+fSBpbnB1dCAgdnN0dXBuw60gcGFyYW1ldHJ5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHVnliZXJVaHJhZHlEbGcoXHJcbiAgICAgICAgaW5wdXQ6IEdvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPEJ1Yy5XZWJDbGllbnQuR1Z5YmVyVWhyYWR5RGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQ+XHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gR29yZGljLkd1aS5EaWFsb2dzLmJ1aWxkRGlhbG9nPEJ1Yy5XZWJDbGllbnQuR1Z5YmVyVWhyYWR5RGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQsIEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9bXT4oe1xyXG4gICAgICAgICAgICBkaWFsb2dOYW1lOiAnR29yZGljLkJ1Yy5XZWJDbGllbnQuR1Z5YmVyVWhyYWR5JyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczogaW5wdXRcclxuICAgICAgICAgICAgLy93aW5kb3dQYXJhbXM6IHsgd2lkdGg6IDk1MCwgaGVpZ2h0OiA0MDAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vbmFrb25lYyB2b2zDoW5vIG5hcMWZw61tb1xyXG4gICAgLy8vKipcclxuICAgIC8vICogRGlhbG9nIHBybyB6YWTDoW7DrSDEjcOhc3RreSB2IG3Em27EmyBwxZllZHBpc3VcclxuICAgIC8vICpcclxuICAgIC8vICogQHBhcmFtIHtHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxCdWMuV2ViQ2xpZW50LkdWeWJlclVocmFkeURsZ0lucHV0UGFyYW1zIHwgdW5kZWZpbmVkPn0gaW5wdXQgIHZzdHVwbsOtIHBhcmFtZXRyeVxyXG4gICAgLy8gKi9cclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIEdNYW51YWxuaVBhcm92YW5pQ2l6aU1lbmFEbGcoXHJcbiAgICAvLyAgICBpbnB1dDogR29yZGljLkd1aS5EaWFsb2dzLk9wZW5EaWFsb2dQYXJhbXM8QnVjLldlYkNsaWVudC5HTWFudWFsbmlQYXJvdmFuaUNpemlNZW5hRGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQ+XHJcbiAgICAvLykge1xyXG4gICAgLy8gICAgcmV0dXJuIEdvcmRpYy5HdWkuRGlhbG9ncy5idWlsZERpYWxvZzxCdWMuV2ViQ2xpZW50LkdNYW51YWxuaVBhcm92YW5pQ2l6aU1lbmFEbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZCwgQnVjLldlYkNsaWVudC5HTWFudWFsbmlQYXJvdmFuaUNpemlNZW5hRGxnUmV0dXJuVmFsdWU+KHtcclxuICAgIC8vICAgICAgICBkaWFsb2dOYW1lOiBHb3JkaWMuQnVjLldlYkNsaWVudC5HTWFudWFsbmlQYXJvdmFuaUNpemlNZW5hLFxyXG4gICAgLy8gICAgICAgIG9wZW5EaWFsb2dQYXJhbXM6IGlucHV0XHJcbiAgICAvLyAgICAgICAgLy93aW5kb3dQYXJhbXM6IHsgd2lkdGg6IDk1MCwgaGVpZ2h0OiA0MDAgfVxyXG4gICAgLy8gICAgfSk7XHJcbiAgICAvL31cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpYWxvZyBwcm8gdsO9YsSbciDFoWFibG9ueSBwcm8gbGlrdmlkYWNpIEZVQ1xyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPEJ1Yy5XZWJDbGllbnQuR1NhYmxvbmFMaWt2aWRhY2VGdWNTZXpuYW1EbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZD59IGlucHV0ICB2c3R1cG7DrSBwYXJhbWV0cnlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdTYWJsb25hTGlrdmlkYWNlRnVjU2V6bmFtRGxnKFxyXG4gICAgICAgIGlucHV0OiBHb3JkaWMuR3VpLkRpYWxvZ3MuT3BlbkRpYWxvZ1BhcmFtczxCdWMuV2ViQ2xpZW50LkdTYWJsb25hTGlrdmlkYWNlRnVjU2V6bmFtRGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQ+XHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gR29yZGljLkd1aS5EaWFsb2dzLmJ1aWxkRGlhbG9nPEJ1Yy5XZWJDbGllbnQuR1NhYmxvbmFMaWt2aWRhY2VGdWNTZXpuYW1EbGdJbnB1dFBhcmFtcyB8IHVuZGVmaW5lZCwgbnVtYmVyPih7XHJcbiAgICAgICAgICAgIGRpYWxvZ05hbWU6ICdHb3JkaWMuQnVjLldlYkNsaWVudC5HU2FibG9uYUxpa3ZpZGFjZUZ1Y1Nlem5hbScsXHJcbiAgICAgICAgICAgIG9wZW5EaWFsb2dQYXJhbXM6IGlucHV0XHJcbiAgICAgICAgICAgIC8vd2luZG93UGFyYW1zOiB7IHdpZHRoOiA5NTAsIGhlaWdodDogNDAwIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpYWxvZyBwcm8gZ2VuZXJvdsOhbsOtIGTDoXZlayBzbG/FvmVuZWsgQiAtIHpvYnJhemVuw60gc291Ym9yxa8sIHRpc2tudXTDrSBhIHVocmF6ZW7DrVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPEJ1Yy5XZWJDbGllbnQuR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5RGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQ+fSBpbnB1dCAgdnN0dXBuw60gcGFyYW1ldHJ5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHRGF2a2FCR2VuZXJvdmFuaVNvdWJvcnlEbGcoXHJcbiAgICAgICAgaW5wdXQ6IEdvcmRpYy5HdWkuRGlhbG9ncy5PcGVuRGlhbG9nUGFyYW1zPEJ1Yy5XZWJDbGllbnQuR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5RGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQ+XHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gR29yZGljLkd1aS5EaWFsb2dzLmJ1aWxkRGlhbG9nPEJ1Yy5XZWJDbGllbnQuR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5RGxnSW5wdXRQYXJhbXMgfCB1bmRlZmluZWQsIEJ1Yy5XZWJDbGllbnQuR0RhdmthQkdlbmVyb3ZhbmlTb3Vib3J5RGxnUmV0dXJuVmFsdWU+KHtcclxuICAgICAgICAgICAgZGlhbG9nTmFtZTogJ0dvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUJHZW5lcm92YW5pU291Ym9yeScsXHJcbiAgICAgICAgICAgIG9wZW5EaWFsb2dQYXJhbXM6IGlucHV0LFxyXG4gICAgICAgICAgICB3aW5kb3dQYXJhbXM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA0MDAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19