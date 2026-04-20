"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Bar;
    (function (Bar) {
        var WebClient;
        (function (WebClient) {
            let GBarMainApp = class GBarMainApp extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    //            $("body").gsearchable("add", new GBarSearchResolver());
                    //Gordic.Dashboard.Providers.register(new Gordic.Dashboard.BlogProvider()); //zapojení blogů
                    //Gordic.Dashboard.Providers.register(new Gordic.Dashboard.ArticleProvider()); //zapojení článků (uživatelsky editovatelný text)
                    //Gordic.Dashboard.Providers.register(new Gordic.Dashboard.IslProvider()); //zapojení jakékoli dostupné ISL metody vracející seznam dat (je možné nastavit i volání detailu při kliknutí na položku)
                    //Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RssProvider()); //zapojení RSS zpráv (včetně stránkování, vyhledávání a filtrování podle kategorií)           
                    //Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RestProvider()); //zapojení externích REST služeb
                    //Gordic.Dashboard.Providers.register(new Gordic.Dashboard.FileProvider()); //zapojení načítání dat ze souboru typu JSON, který je vložen do složky Data v adresáři aplikace
                    //Gordic.Dashboard.Providers.register(new Gordic.Dashboard.XrgServiceProvider()); //zapojení načítání dat ze XRG služby uvedené ve web.config spolu s nastavenými přístupovými údaji
                    //Gordic.Dashboard.Providers.register(new Gordic.Dashboard.DataReportProvider()); //zapojení sestav
                }
            };
            GBarMainApp = __decorate([
                Decorators.gcontent
            ], GBarMainApp);
            WebClient.GBarMainApp = GBarMainApp;
        })(WebClient = Bar.WebClient || (Bar.WebClient = {}));
    })(Bar = Gordic.Bar || (Gordic.Bar = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkFwcC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiTWFpbkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBa0NmO0FBbENELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtDbkI7SUFsQ2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtDN0I7UUFsQ29CLFdBQUEsU0FBUztZQVMxQixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsT0FBQSxZQUFZO2dCQU16QyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFNUIscUVBQXFFO29CQUV6RCw0RkFBNEY7b0JBQzVGLGdJQUFnSTtvQkFDaEksb01BQW9NO29CQUNwTSx5S0FBeUs7b0JBQ3pLLDRHQUE0RztvQkFDNUcsNEtBQTRLO29CQUM1SyxvTEFBb0w7b0JBQ3BMLG1HQUFtRztnQkFHdkcsQ0FBQzthQUVKLENBQUE7WUF2QlksV0FBVztnQkFEdkIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxXQUFXLENBdUJ2QjtZQXZCWSxxQkFBVyxjQXVCdkIsQ0FBQTtRQUVMLENBQUMsRUFsQ29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtDN0I7SUFBRCxDQUFDLEVBbENnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrQ25CO0FBQUQsQ0FBQyxFQWxDUyxNQUFNLEtBQU4sTUFBTSxRQWtDZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQmFyLldlYkNsaWVudCB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHSHJvbWFkbmVPcGVyYWNlRGlhbG9nIHtcclxuICAgICAgICBnZXRGb3JtRGF0YSgpOiBvYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgR0hyb21hZG5lT3BlcmFjZURpYWxvZ1R5cGUgPSB7IG5ldygpOiBHSHJvbWFkbmVPcGVyYWNlRGlhbG9nIH1cclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdCYXJNYWluQXBwIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbi8vICAgICAgICBwcml2YXRlIGdsb2JhbHM6IERUTy5HQmFyR2xvYmFsc0R0bzsgLy8gPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFsczogR29yZGljLkJhci5XZWJDbGllbnQuRFRPLkdCYXJHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuLy8gICAgICAgICAgICAkKFwiYm9keVwiKS5nc2VhcmNoYWJsZShcImFkZFwiLCBuZXcgR0JhclNlYXJjaFJlc29sdmVyKCkpO1xyXG5cclxuICAgICAgICAgICAgLy9Hb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5CbG9nUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIGJsb2fFr1xyXG4gICAgICAgICAgICAvL0dvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkFydGljbGVQcm92aWRlcigpKTsgLy96YXBvamVuw60gxI1sw6Fua8WvICh1xb5pdmF0ZWxza3kgZWRpdG92YXRlbG7DvSB0ZXh0KVxyXG4gICAgICAgICAgICAvL0dvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLklzbFByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBqYWvDqWtvbGkgZG9zdHVwbsOpIElTTCBtZXRvZHkgdnJhY2Vqw61jw60gc2V6bmFtIGRhdCAoamUgbW/Fvm7DqSBuYXN0YXZpdCBpIHZvbMOhbsOtIGRldGFpbHUgcMWZaSBrbGlrbnV0w60gbmEgcG9sb8W+a3UpXHJcbiAgICAgICAgICAgIC8vR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuUnNzUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIFJTUyB6cHLDoXYgKHbEjWV0bsSbIHN0csOhbmtvdsOhbsOtLCB2eWhsZWTDoXbDoW7DrSBhIGZpbHRyb3bDoW7DrSBwb2RsZSBrYXRlZ29yacOtKSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuUmVzdFByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBleHRlcm7DrWNoIFJFU1Qgc2x1xb5lYlxyXG4gICAgICAgICAgICAvL0dvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkZpbGVQcm92aWRlcigpKTsgLy96YXBvamVuw60gbmHEjcOtdMOhbsOtIGRhdCB6ZSBzb3Vib3J1IHR5cHUgSlNPTiwga3RlcsO9IGplIHZsb8W+ZW4gZG8gc2xvxb5reSBEYXRhIHYgYWRyZXPDocWZaSBhcGxpa2FjZVxyXG4gICAgICAgICAgICAvL0dvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLlhyZ1NlcnZpY2VQcm92aWRlcigpKTsgLy96YXBvamVuw60gbmHEjcOtdMOhbsOtIGRhdCB6ZSBYUkcgc2x1xb5ieSB1dmVkZW7DqSB2ZSB3ZWIuY29uZmlnIHNwb2x1IHMgbmFzdGF2ZW7DvW1pIHDFmcOtc3R1cG92w71taSDDumRhamlcclxuICAgICAgICAgICAgLy9Hb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5EYXRhUmVwb3J0UHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIHNlc3RhdlxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iXX0=