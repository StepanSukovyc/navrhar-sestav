"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Adp;
    (function (Adp) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Hlavní content ADP
             *
             * @author Tomáš Kareš
             * @since 525.2.
             */
            let GMainApp = class GMainApp extends Gordic.GContentBase {
                onContentReady() {
                    const content = this;
                    // Dashboard
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.BlogProvider()); //zapojení blogů
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.ArticleProvider()); //zapojení článků (uživatelsky editovatelný text)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.IslProvider()); //zapojení jakékoli dostupné ISL metody vracející seznam dat (je možné nastavit i volání detailu při kliknutí na položku)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RssProvider()); //zapojení RSS zpráv (včetně stránkování, vyhledávání a filtrování podle kategorií)           
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RestProvider()); //zapojení externích REST služeb
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.FileProvider()); //zapojení načítání dat ze souboru typu JSON, který je vložen do složky Data v adresáři aplikace
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.XrgServiceProvider()); //zapojení načítání dat ze XRG služby uvedené ve web.config spolu s nastavenými přístupovými údaji
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.DataReportProvider()); //zapojení sestav
                }
            };
            GMainApp = __decorate([
                gcontent
            ], GMainApp);
            WebClient.GMainApp = GMainApp;
        })(WebClient = Adp.WebClient || (Adp.WebClient = {}));
    })(Adp = Gordic.Adp || (Gordic.Adp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01haW5BcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTWFpbkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNEJmO0FBNUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRCbkI7SUE1QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRCN0I7UUE1Qm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ25DOzs7OztlQUtHO1lBRUgsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFDL0IsY0FBYztvQkFDakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUVyQixZQUFZO29CQUNaLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtvQkFDMUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsaURBQWlEO29CQUM5SCxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyx5SEFBeUg7b0JBQ2xNLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLDhGQUE4RjtvQkFDdkssTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0NBQWdDO29CQUMxRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxnR0FBZ0c7b0JBQzFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0dBQWtHO29CQUNsTCxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjtnQkFFckcsQ0FBQzthQUlKLENBQUE7WUFsQlksUUFBUTtnQkFEcEIsUUFBUTtlQUNJLFFBQVEsQ0FrQnBCO1lBbEJZLGtCQUFRLFdBa0JwQixDQUFBO1FBQ0wsQ0FBQyxFQTVCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNEI3QjtJQUFELENBQUMsRUE1QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRCbkI7QUFBRCxDQUFDLEVBNUJTLE1BQU0sS0FBTixNQUFNLFFBNEJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5BZHAuV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcbiAgICAvKipcclxuICAgICAqIEhsYXZuw60gY29udGVudCBBRFBcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIFRvbcOhxaEgS2FyZcWhXHJcbiAgICAgKiBAc2luY2UgNTI1LjIuXHJcbiAgICAgKi8gICAgXHJcbiAgICBAZ2NvbnRlbnQgICAgXHJcbiAgICBleHBvcnQgY2xhc3MgR01haW5BcHAgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBEYXNoYm9hcmRcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuQmxvZ1Byb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBibG9nxa9cclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuQXJ0aWNsZVByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSDEjWzDoW5rxa8gKHXFvml2YXRlbHNreSBlZGl0b3ZhdGVsbsO9IHRleHQpXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLklzbFByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBqYWvDqWtvbGkgZG9zdHVwbsOpIElTTCBtZXRvZHkgdnJhY2Vqw61jw60gc2V6bmFtIGRhdCAoamUgbW/Fvm7DqSBuYXN0YXZpdCBpIHZvbMOhbsOtIGRldGFpbHUgcMWZaSBrbGlrbnV0w60gbmEgcG9sb8W+a3UpXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLlJzc1Byb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBSU1MgenByw6F2ICh2xI1ldG7EmyBzdHLDoW5rb3bDoW7DrSwgdnlobGVkw6F2w6Fuw60gYSBmaWx0cm92w6Fuw60gcG9kbGUga2F0ZWdvcmnDrSkgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5SZXN0UHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIGV4dGVybsOtY2ggUkVTVCBzbHXFvmViXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkZpbGVQcm92aWRlcigpKTsgLy96YXBvamVuw60gbmHEjcOtdMOhbsOtIGRhdCB6ZSBzb3Vib3J1IHR5cHUgSlNPTiwga3RlcsO9IGplIHZsb8W+ZW4gZG8gc2xvxb5reSBEYXRhIHYgYWRyZXPDocWZaSBhcGxpa2FjZVxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5YcmdTZXJ2aWNlUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIG5hxI3DrXTDoW7DrSBkYXQgemUgWFJHIHNsdcW+YnkgdXZlZGVuw6kgdmUgd2ViLmNvbmZpZyBzcG9sdSBzIG5hc3RhdmVuw71taSBwxZnDrXN0dXBvdsO9bWkgw7pkYWppXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkRhdGFSZXBvcnRQcm92aWRlcigpKTsgLy96YXBvamVuw60gc2VzdGF2XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH1cclxufSJdfQ==