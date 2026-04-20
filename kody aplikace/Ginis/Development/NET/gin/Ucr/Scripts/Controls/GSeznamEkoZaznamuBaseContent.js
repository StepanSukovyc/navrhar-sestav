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
            let GSeznamEkoZaznamuBaseContent = class GSeznamEkoZaznamuBaseContent extends Gordic.GContentBase {
                constructor() {
                    //private ekoParams: Gordic.Ucr.WebClient.GEkoParamsDto;
                    //private tema: string;
                    super(...arguments);
                    this.loadingData = false; // atribut nacitani dat
                    this.logOptions = { name: "GSeznamEkoZaznamuBaseContent", authorCode: 302, file: "GSeznamEkoZaznamuBaseContent.ts" };
                }
                onContentReady() {
                    var that = this;
                    this.globals = this.globalParams;
                    this.log.trace("start onContentReady GSeznamEkoZaznamuBaseContent");
                    // ulozeni spustene ulohy
                    //this?.parentContent?.userSettings!.set("lastAction", this.taskId);
                    //this?.parentContent?.userSettings!.save();
                    this.element.trigger("saveAction", { lastAction: this.taskId });
                    switch (this.TypUlohy) {
                        case 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */:
                            this.log.debug("Uloha GSeznamIISSPPreuctovaniSkutecnostiNZ - nezarazene zapisy");
                            that.serviceObject = new WebClient.GSeznamIISSPPreuctovaniSkutecnostiNZ(this);
                            break;
                        case 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */:
                            this.log.debug("Uloha GSeznamEkoSaldokonto");
                            that.serviceObject = new WebClient.GSeznamEkoSaldokonto(this);
                            break;
                        case 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */:
                            this.log.debug("Uloha GSeznamEkoSaldokontoZapis");
                            that.serviceObject = new WebClient.GSeznamEkoSaldokontoZapis(this);
                            break;
                        case 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */:
                            this.log.debug("Uloha GSeznamEkoSaldokontoZapisVse");
                            that.serviceObject = new WebClient.GSeznamEkoSaldokontoZapisVse(this);
                            break;
                        case 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */:
                            this.log.debug("Uloha GSeznamEkoUctZapis");
                            that.serviceObject = new WebClient.GSeznamEkoUctZapis(this);
                            break;
                        case 2 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviStav */:
                            this.log.debug("Uloha GSeznamEkoUctStavy");
                            that.serviceObject = new WebClient.GSeznamEkoUctStavy(this);
                            break;
                        case 0 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetStav */:
                            this.log.debug("Uloha GSeznamEkoRozStavy");
                            that.serviceObject = new WebClient.GSeznamEkoRozStavy(this);
                            break;
                        case 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */:
                            this.log.debug("Uloha GSeznamEkoRozZapis");
                            that.serviceObject = new WebClient.GSeznamEkoRozZapis(this);
                            break;
                        case 9 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis */:
                            this.log.debug("Uloha GSeznamEkoFinancovani");
                            that.serviceObject = new WebClient.GSeznamEkoFinancovani(this);
                            break;
                        case 26 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PozadavekSeznam */:
                            this.log.debug("Uloha GSeznamPozadavek");
                            that.serviceObject = new WebClient.GSeznamPozadavek(this);
                            break;
                        case 28 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.KonsolidaceStavy */:
                            this.log.debug("Uloha GSeznamEkoStavyKonsolidace");
                            that.serviceObject = new WebClient.GSeznamEkoStavyKonsolidace(this);
                            break;
                        case 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */:
                            this.log.debug("Uloha GSeznamEkoPrimPozadavky");
                            that.serviceObject = new WebClient.GSeznamEkoPrimPozadavky(this);
                            break;
                        case 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */:
                            this.log.debug("Uloha GSeznamBalancovani");
                            that.serviceObject = new WebClient.GSeznamBalancovani(this);
                            break;
                        case 10 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RegistrPZ */:
                            this.log.debug("Uloha GSeznamEkoRegistr");
                            that.serviceObject = new WebClient.GSeznamEkoRegistr(this);
                            break;
                        case 15 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.AktualniObdobi */:
                        case 14 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.StrednedobyVyhled */:
                            this.log.debug("Uloha GSeznamEkoUkazatele");
                            that.serviceObject = new WebClient.GSeznamEkoUkazatele(this);
                            break;
                    }
                    if (that.serviceObject) {
                        if ((this.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                            || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                            || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */) && (this.userSettings?.get("rozsirenyPopisAutoAddGridColumns") ?? false)) {
                            this.addStrPopisColumns = this.userSettings?.get("rozsirenyPopisShowGridColumns");
                        }
                        that.serviceObject.onContentReady();
                    }
                    else
                        throw Error("Neznámý typ úlohy {0}".format(this.TypUlohy));
                    return;
                }
                /**
                  * Uzavirani okna
                  * @returns
                  */
                closing() {
                    if (typeof this.serviceObject !== "undefined")
                        return this.serviceObject.closing();
                    return $.Deferred().resolve().promise();
                }
            };
            GSeznamEkoZaznamuBaseContent = __decorate([
                Decorators.gcontent
            ], GSeznamEkoZaznamuBaseContent);
            WebClient.GSeznamEkoZaznamuBaseContent = GSeznamEkoZaznamuBaseContent;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1Fa29aYXpuYW11QmFzZUNvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWtLZjtBQWxLRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrS25CO0lBbEtnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FrSzdCO1FBbEtvQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2VBS0c7WUFFSCxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE2QixTQUFRLE9BQUEsWUFBWTtnQkFBOUQ7b0JBRUksd0RBQXdEO29CQUN4RCx1QkFBdUI7O29CQXNDaEIsZ0JBQVcsR0FBWSxLQUFLLENBQUMsQ0FBQyx1QkFBdUI7b0JBZTVELGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSw4QkFBOEIsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxDQUFDO2dCQWlHcEgsQ0FBQztnQkFoR0csY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztvQkFDcEUseUJBQXlCO29CQUN6QixvRUFBb0U7b0JBQ3BFLDRDQUE0QztvQkFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUNoRSxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDcEI7NEJBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQzs0QkFDakYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQUEsb0NBQW9DLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3BFLE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQzs0QkFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQUEsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3BELE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs0QkFDbEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQUEseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3pELE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQzs0QkFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQUEsNEJBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzVELE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQUEsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2xELE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQUEsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2xELE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQUEsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2xELE1BQU07d0JBQ1Y7NEJBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxL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eEMsQ0FBQTtRQUNMLENBQUMsRUFsS29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtLN0I7SUFBRCxDQUFDLEVBbEtnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrS25CO0FBQUQsQ0FBQyxFQWxLUyxNQUFNLEtBQU4sTUFBTSxRQWtLZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFN0YXZ5IGtvbnNvbGlkYWNlXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1Fa29aYXpuYW11QmFzZUNvbnRlbnQgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgZWtvUGFyYW1zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWtvUGFyYW1zRHRvO1xyXG4gICAgICAgIC8vcHJpdmF0ZSB0ZW1hOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8vIHBhcmFtZXRyeSBcclxuICAgICAgICBwdWJsaWMgZ2xvYmFsUGFyYW1zOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUGFyYW1zRHRvO1xyXG4gICAgICAgIHB1YmxpYyBmaWx0ZXJPcHRpb25zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR0ZpbHRlck9wdGlvbnNEdG87XHJcbiAgICAgICAgcHVibGljIGZpbHRlclBhcmFtczogR0ZpbHRlclBhcmFtc0R0bztcclxuICAgICAgICBwdWJsaWMgRmlsdGVyOiBHRWtvRmlsdGVyRHRvOyAvL011emUgYnl0IHByZWR2eXBsbmVubyB6IHZlbmt1XHJcbiAgICAgICAgcHVibGljIGFkZFN0clBvcGlzQ29sdW1ucz86IHN0cmluZ1tdOyAgIC8vU2V6bmFtIHNsb3VwY3Ugc3RyLiBwb3Bpc3UsIGt0ZXJlIGJ5IG1lbHkgYnl0IHByaWRhbnkgZG8gZ3JpZHUgKHBvdXplIHBybyBaYXBpc3lVY2V0bmljdHZpKSAoKVxyXG4gICAgICAgIHB1YmxpYyBFeHRlcm5pU3VtYXJpemFjZTogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgZGVidWc6IGJvb2xlYW4gICAgICAvLyBkZWJ1ZyBtb2RlXHJcbiAgICAgICAgcHVibGljIEN1cnJlbnRSb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bzsgLy8gYWt0dWFsbmkgdnlicmFueSByYWRlayB6ZSBzZXpuYW11XHJcbiAgICAgICAgcHVibGljIGZpbHRlclN0clBvcGlzPzogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdO1xyXG4gICAgICAgIHB1YmxpYyBSb3dzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG9bXTsgLy8gYWt0dWFsbmkgdnlicmFueSByYWRlayB6ZSBzZXpuYW11XHJcbiAgICAgICAgcHVibGljIFJhZGVrX0RQSDogc3RyaW5nOyAvL011emUgYnl0IHByZWR2eXBsbmVubyB6IHZlbmt1XHJcbiAgICAgICAgcHVibGljIFN0cmljdEZpbHRlcjogYm9vbGVhbjsgLy9NdXplIGJ5dCBwcmVkdnlwbG5lbm8geiB2ZW5rdVxyXG4gICAgICAgIHB1YmxpYyBBdXRvTG9hZERhdGE6IGJvb2xlYW47IC8vTXV6ZSBieXQgcHJlZHZ5cGxuZW5vIHogdmVua3VcclxuICAgICAgICBwdWJsaWMgRWNkZDogc3RyaW5nOyAvL011emUgYnl0IHByZWR2eXBsbmVubyB6IHZlbmt1XHJcbiAgICAgICAgcHVibGljIERpYzogc3RyaW5nOyAvL011emUgYnl0IHByZWR2eXBsbmVubyB6IHZlbmt1XHJcbiAgICAgICAgcHVibGljIEF2b2lkVXVzOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBBdm9pZE5rczogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgQXZvaWRFeHQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHVibGljIHR5cFNlc3Rhdnk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBTZXN0YXZ5XHJcbiAgICAgICAgLy9aYXBpc292YTogYm9vbGVhbjtcclxuICAgICAgICAvL3ByaXZhdGUgUm96cG9jZXQ6IGJvb2xlYW47XHJcbiAgICAgICAgLy9wcml2YXRlIFVjZXRuaWN0dmk6IGJvb2xlYW47XHJcbiAgICAgICAgLy9wcml2YXRlIEZpbk1pc3RvOiBzdHJpbmc7ICAgLy8gZmluYW5jbmkgbWlzdG9cclxuICAgICAgICAvLy8vIHpvYnJhemVuaSBzdHJlZGlza2EgYSB1Y3Rhcm55XHJcbiAgICAgICAgLy9wcml2YXRlIHNob3dVQ1NfVVVTOiBib29sZWFuXHJcbiAgICAgICAgLy8gZmlsdHJvdmFjaSBwYW5lbFxyXG4gICAgICAgIHB1YmxpYyAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICAvLyBncmlkIHNlIHNlbmFtZW1cclxuICAgICAgICBwdWJsaWMgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLy8gTmFzdGF2ZW5pXHJcbiAgICAgICAgcHVibGljIEdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JHbG9iYWxEdG87XHJcbiAgICAgICAgcHVibGljIGdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQYXJhbXNEdG87XHJcbiAgICAgICAgcHVibGljIFR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlO1xyXG4gICAgICAgIHB1YmxpYyB0ZW1hOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIFphcGlzb3ZhOiBib29sZWFuO1xyXG4gICAgICAgIHB1YmxpYyBsb2FkaW5nRGF0YTogYm9vbGVhbiA9IGZhbHNlOyAvLyBhdHJpYnV0IG5hY2l0YW5pIGRhdFxyXG4gICAgICAgIHB1YmxpYyBla29QYXJhbXM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdFa29QYXJhbXNEdG87ICAgICAgICBcclxuICAgICAgICAvLyBtb2RpZmlrb3ZhbmUgY2Z1IHBybyBzYWxkb2tvbnRvXHJcbiAgICAgICAgcHVibGljIG1vZGlmeUNmdTogR3VpLldlYkFwcC5HR3JpZEZvcm1hdER0bztcclxuICAgICAgICAvLyBjZnVzZXRcclxuICAgICAgICBwdWJsaWMgY2Z1U2V0U29ydGVkOiBHdWkuV2ViQXBwLkdHcmlkRm9ybWF0RHRvO1xyXG5cclxuICAgICAgICBwdWJsaWMgd29kck9yajogR3VpLldlYkFwcC5HR3JpZENvbHVtbkR0bztcclxuICAgICAgICBwdWJsaWMgd29kck9yZzogR3VpLldlYkFwcC5HR3JpZENvbHVtbkR0bztcclxuXHJcbiAgICAgICAgcHVibGljIGRldGFpbEluZjogc3RyaW5nOyAvLyBkb2RhdGVjbmUgaW5mb3JtYWNlIHZlIHN0YXR1c2JhcnVcclxuICAgICAgICBwdWJsaWMgUHJpeklpc3NwOiBib29sZWFuO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBfaXNBZ2dyZWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2VydmljZU9iamVjdDogR1Nlem5hbUVrb1phem5hbXVCYXNlO1xyXG4gICAgICAgIGxvZ09wdGlvbnMgPSB7IG5hbWU6IFwiR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudFwiLCBhdXRob3JDb2RlOiAzMDIsIGZpbGU6IFwiR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudC50c1wiIH07XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxzID0gdGhpcy5nbG9iYWxQYXJhbXM7XHJcbiAgICAgICAgICAgIHRoaXMubG9nLnRyYWNlKFwic3RhcnQgb25Db250ZW50UmVhZHkgR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudFwiKTtcclxuICAgICAgICAgICAgLy8gdWxvemVuaSBzcHVzdGVuZSB1bG9oeVxyXG4gICAgICAgICAgICAvL3RoaXM/LnBhcmVudENvbnRlbnQ/LnVzZXJTZXR0aW5ncyEuc2V0KFwibGFzdEFjdGlvblwiLCB0aGlzLnRhc2tJZCk7XHJcbiAgICAgICAgICAgIC8vdGhpcz8ucGFyZW50Q29udGVudD8udXNlclNldHRpbmdzIS5zYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwic2F2ZUFjdGlvblwiLCB7IGxhc3RBY3Rpb246IHRoaXMudGFza0lkIH0pO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuVHlwVWxvaHkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIlVsb2hhIEdTZXpuYW1JSVNTUFByZXVjdG92YW5pU2t1dGVjbm9zdGlOWiAtIG5lemFyYXplbmUgemFwaXN5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtSUlTU1BQcmV1Y3RvdmFuaVNrdXRlY25vc3RpTloodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIlVsb2hhIEdTZXpuYW1Fa29TYWxkb2tvbnRvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtRWtvU2FsZG9rb250byh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoXCJVbG9oYSBHU2V6bmFtRWtvU2FsZG9rb250b1phcGlzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtRWtvU2FsZG9rb250b1phcGlzKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2U6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoXCJVbG9oYSBHU2V6bmFtRWtvU2FsZG9rb250b1phcGlzVnNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtRWtvU2FsZG9rb250b1phcGlzVnNlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpczpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIlVsb2hhIEdTZXpuYW1Fa29VY3RaYXBpc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlcnZpY2VPYmplY3QgPSBuZXcgR1Nlem5hbUVrb1VjdFphcGlzKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlTdGF2OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nLmRlYnVnKFwiVWxvaGEgR1Nlem5hbUVrb1VjdFN0YXZ5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtRWtvVWN0U3RhdnkodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRTdGF2OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nLmRlYnVnKFwiVWxvaGEgR1Nlem5hbUVrb1JvelN0YXZ5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtRWtvUm96U3RhdnkodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpczpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIlVsb2hhIEdTZXpuYW1Fa29Sb3paYXBpc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlcnZpY2VPYmplY3QgPSBuZXcgR1Nlem5hbUVrb1JvelphcGlzKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlZpY2VsZXRlRmluYW5jb3ZhbmlaYXBpczpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIlVsb2hhIEdTZXpuYW1Fa29GaW5hbmNvdmFuaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlcnZpY2VPYmplY3QgPSBuZXcgR1Nlem5hbUVrb0ZpbmFuY292YW5pKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlBvemFkYXZla1Nlem5hbTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIlVsb2hhIEdTZXpuYW1Qb3phZGF2ZWtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXJ2aWNlT2JqZWN0ID0gbmV3IEdTZXpuYW1Qb3phZGF2ZWsodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuS29uc29saWRhY2VTdGF2eTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIlVsb2hhIEdTZXpuYW1Fa29TdGF2eUtvbnNvbGlkYWNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VydmljZU9iamVjdCA9IG5ldyBHU2V6bmFtRWtvU3RhdnlLb25zb2xpZGFjZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5QcmltYXJuaVBvemFkYXZreVphcGlzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nLmRlYnVnKFwiVWxvaGEgR1Nlem5hbUVrb1ByaW1Qb3phZGF2a3lcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXJ2aWNlT2JqZWN0ID0gbmV3IEdTZXpuYW1Fa29QcmltUG96YWRhdmt5KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkJhbGFuY292YW5pWmFwaXM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoXCJVbG9oYSBHU2V6bmFtQmFsYW5jb3ZhbmlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXJ2aWNlT2JqZWN0ID0gbmV3IEdTZXpuYW1CYWxhbmNvdmFuaSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5SZWdpc3RyUFo6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoXCJVbG9oYSBHU2V6bmFtRWtvUmVnaXN0clwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlcnZpY2VPYmplY3QgPSBuZXcgR1Nlem5hbUVrb1JlZ2lzdHIodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkFrdHVhbG5pT2Jkb2JpOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlN0cmVkbmVkb2J5VnlobGVkOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nLmRlYnVnKFwiVWxvaGEgR1Nlem5hbUVrb1VrYXphdGVsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlcnZpY2VPYmplY3QgPSBuZXcgR1Nlem5hbUVrb1VrYXphdGVsZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgaWYgKHRoYXQuc2VydmljZU9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICApICYmICh0aGlzLnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucyA9IHRoaXMudXNlclNldHRpbmdzPy5nZXQoXCJyb3pzaXJlbnlQb3Bpc1Nob3dHcmlkQ29sdW1uc1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnNlcnZpY2VPYmplY3Qub25Db250ZW50UmVhZHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIk5lem7DoW3DvSB0eXAgw7psb2h5IHswfVwiLmZvcm1hdCh0aGlzLlR5cFVsb2h5KSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VydmljZU9iamVjdCE9PVwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlT2JqZWN0LmNsb3NpbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==