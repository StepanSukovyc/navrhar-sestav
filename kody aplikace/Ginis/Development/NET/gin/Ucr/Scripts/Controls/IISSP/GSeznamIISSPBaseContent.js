"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * Stavy konsolidace
             *
             * @author tkares
             * @since 484.1.0.69
             */
            let GSeznamIISSPBaseContent = class GSeznamIISSPBaseContent extends Gordic.GContentBase {
                constructor() {
                    //private ekoParams: Gordic.Ucr.WebClient.GEkoParamsDto;
                    //private tema: string;
                    super(...arguments);
                    this.loadingData = false; // atribut nacitani dat
                    this._isAggregation = true;
                }
                // nastaveni id a titulku okna
                //taskId = "seznamStavyKonsolidace";
                onContentReady() {
                    var that = this;
                    switch (this.TypUlohy) {
                        case 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */:
                            that.serviceObject = new WebClient.GSeznamIISSPPreuctovaniSkutecnostiStavy(this);
                            break;
                        case 18 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty */:
                            that.serviceObject = new WebClient.GSeznamIISSPPreuctovaniSkutecnostiBanka(this);
                            break;
                        case 19 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_RegistrDavek */:
                            that.serviceObject = new WebClient.GSeznamIISSPPreuctovaniSkutecnostiRegistr(this);
                            break;
                        case 20 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Stavy_StavyRozpoctu */:
                            that.serviceObject = new WebClient.GSeznamIISSPStavyStavyRozpoctu(this);
                            break;
                        case 21 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Stavy_StavyCerpaniRozpoctu */:
                            that.serviceObject = new WebClient.GSeznamIISSPStavyStavyCerpaniRozpoctu(this);
                            break;
                        case 22 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Stavy_StavySkutecnosti */:
                            that.serviceObject = new WebClient.GSeznamIISSPStavyStavySkutecnosti(this);
                            break;
                        case 23 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Stavy_Inbox */:
                            that.serviceObject = new WebClient.GSeznamIISSPStavyStavyVolaniInbox(this);
                            break;
                        case 24 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Stavy_StavyRezervaci */:
                            that.serviceObject = new WebClient.GSeznamIISSPStavyStavyRezervaci(this);
                            break;
                        case 25 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Stavy_StavyRezervaciChyby */:
                            that.serviceObject = new WebClient.GSeznamIISSPStavyStavyRezervaciChyby(this);
                            break;
                    }
                    that.serviceObject.onContentReady();
                    return;
                }
            };
            GSeznamIISSPBaseContent = __decorate([
                Decorators.gcontent
            ], GSeznamIISSPBaseContent);
            WebClient.GSeznamIISSPBaseContent = GSeznamIISSPBaseContent;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQQmFzZUNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtSUlTU1BCYXNlQ29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNkVmO0FBN0VELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZFbkI7SUE3RWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZFN0I7UUE3RW9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7ZUFLRztZQUVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsT0FBQSxZQUFZO2dCQUF6RDtvQkFFSSx3REFBd0Q7b0JBQ3hELHVCQUF1Qjs7b0JBZ0JoQixnQkFBVyxHQUFZLEtBQUssQ0FBQyxDQUFDLHVCQUF1QjtvQkFDcEQsbUJBQWMsR0FBWSxJQUFJLENBQUM7Z0JBZ0QzQyxDQUFDO2dCQTNDRyw4QkFBOEI7Z0JBQzlCLG9DQUFvQztnQkFDcEMsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNwQjs0QkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBQSx1Q0FBdUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdkUsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBQSx1Q0FBdUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdkUsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBQSx5Q0FBeUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDekUsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBQSw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDOUQsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBQSxxQ0FBcUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDckUsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBQSxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakUsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBQSxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakUsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBQSwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDL0QsTUFBTTt3QkFDVjs0QkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBQSxvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDcEUsTUFBTTtvQkFJZCxDQUFDO29CQUVELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3BDLE9BQU87Z0JBRVgsQ0FBQzthQUVKLENBQUE7WUFwRVksdUJBQXVCO2dCQURuQyxVQUFVLENBQUMsUUFBUTtlQUNQLHVCQUF1QixDQW9FbkM7WUFwRVksaUNBQXVCLDBCQW9FbkMsQ0FBQTtRQUNMLENBQUMsRUE3RW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTZFN0I7SUFBRCxDQUFDLEVBN0VnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2RW5CO0FBQUQsQ0FBQyxFQTdFUyxNQUFNLEtBQU4sTUFBTSxRQTZFZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFN0YXZ5IGtvbnNvbGlkYWNlXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1JSVNTUEJhc2VDb250ZW50IGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIGVrb1BhcmFtczogR29yZGljLlVjci5XZWJDbGllbnQuR0Vrb1BhcmFtc0R0bztcclxuICAgICAgICAvL3ByaXZhdGUgdGVtYTogc3RyaW5nO1xyXG5cclxuICAgICAgICAvLyBwYXJhbWV0cnlcclxuICAgICAgICBwdWJsaWMgZ2xvYmFsUGFyYW1zOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUGFyYW1zRHRvO1xyXG4gICAgICAgIGZpbHRlck9wdGlvbnM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HRmlsdGVyT3B0aW9uc0R0bztcclxuICAgICAgICBwdWJsaWMgZGVidWc6IGJvb2xlYW4gICAgICAvLyBkZWJ1ZyBtb2RlXHJcbiAgICAgICAgLy9wcml2YXRlIEZpbk1pc3RvOiBzdHJpbmc7ICAgLy8gZmluYW5jbmkgbWlzdG9cclxuICAgICAgICAvLy8vIHpvYnJhemVuaSBzdHJlZGlza2EgYSB1Y3Rhcm55XHJcbiAgICAgICAgLy9wcml2YXRlIHNob3dVQ1NfVVVTOiBib29sZWFuXHJcbiAgICAgICAgLy8gZmlsdHJvdmFjaSBwYW5lbFxyXG4gICAgICAgIHB1YmxpYyAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICAvLyBncmlkIHNlIHNlbmFtZW1cclxuICAgICAgICBwdWJsaWMgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLy8gTmFzdGF2ZW5pXHJcbiAgICAgICAgcHVibGljIEdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JHbG9iYWxEdG87XHJcbiAgICAgICAgcHVibGljIFR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlO1xyXG4gICAgICAgIHB1YmxpYyBsb2FkaW5nRGF0YTogYm9vbGVhbiA9IGZhbHNlOyAvLyBhdHJpYnV0IG5hY2l0YW5pIGRhdFxyXG4gICAgICAgIHByaXZhdGUgX2lzQWdncmVnYXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHB1YmxpYyBhdXRvUmVsb2FkOiBib29sZWFuOyAvLyBhdHJpYnV0IGF1dG9tYXRpY2tlaG8gbmFjaXRhbmlcclxuICAgICAgICBwdWJsaWMgbWFza2E6IGFueTtcclxuICAgICAgICBwdWJsaWMgYWt0RGF0dW06IERhdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBzZXJ2aWNlT2JqZWN0OiBHU2V6bmFtSUlTU1BCYXNlO1xyXG4gICAgICAgIC8vIG5hc3RhdmVuaSBpZCBhIHRpdHVsa3Ugb2tuYVxyXG4gICAgICAgIC8vdGFza0lkID0gXCJzZXpuYW1TdGF2eUtvbnNvbGlkYWNlXCI7XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5UeXBVbG9oeSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtSUlTU1BQcmV1Y3RvdmFuaVNrdXRlY25vc3RpU3RhdnkodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3ZhbmlfQmFua292bmlVY3R5OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtSUlTU1BQcmV1Y3RvdmFuaVNrdXRlY25vc3RpQmFua2EodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3ZhbmlfUmVnaXN0ckRhdmVrOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtSUlTU1BQcmV1Y3RvdmFuaVNrdXRlY25vc3RpUmVnaXN0cih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9TdGF2eV9TdGF2eVJvenBvY3R1OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtSUlTU1BTdGF2eVN0YXZ5Um96cG9jdHUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfU3RhdnlfU3RhdnlDZXJwYW5pUm96cG9jdHU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXJ2aWNlT2JqZWN0ID0gbmV3IEdTZXpuYW1JSVNTUFN0YXZ5U3RhdnlDZXJwYW5pUm96cG9jdHUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfU3RhdnlfU3RhdnlTa3V0ZWNub3N0aTpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlcnZpY2VPYmplY3QgPSBuZXcgR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVNrdXRlY25vc3RpKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1N0YXZ5X0luYm94OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtSUlTU1BTdGF2eVN0YXZ5Vm9sYW5pSW5ib3godGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfU3RhdnlfU3RhdnlSZXplcnZhY2k6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXJ2aWNlT2JqZWN0ID0gbmV3IEdTZXpuYW1JSVNTUFN0YXZ5U3RhdnlSZXplcnZhY2kodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfU3RhdnlfU3RhdnlSZXplcnZhY2lDaHlieTpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlcnZpY2VPYmplY3QgPSBuZXcgR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVJlemVydmFjaUNoeWJ5KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdC5vbkNvbnRlbnRSZWFkeSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=