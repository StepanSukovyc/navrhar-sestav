"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Seznam TEST
             *
             * @author Martin Boček
             * @since 484.1.0.3
             */
            let GSeznamBanka = 
            //export class GSeznamTEST extends GContentBase {
            class GSeznamBanka extends Gordic.GContentBase {
                ///**
                // * Aktuální hodnoty filtru
                // * @type {any}
                // */
                //private currentFilter: any;
                ///**
                // * Filtr nad gridem
                // * @type {JQuery}
                // */
                //private $filterForm: JQuery;
                ///**
                // * ovladač pro náhledy
                // * @type {any}
                // */
                //private previewController: any;
                ///**
                // * oprávnění (k celému seznamu)
                // * @type {Gordic.Buc.Interface.GBankaServicePermission | undefined}
                // */
                //private permissions: Gordic.Buc.Interface.GBankaServicePermission | undefined;
                // vlastnosti z C#
                // definice view pro grid - test
                //private viewBanky: Gordic.Isl.View<Gordic.Buc.Interface.GBankaDto>;
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    // aktuální filtr
                    //this.currentFilter = null;
                    // akce seznamu
                    this.actions.addRange({
                        actDetail: Gordic.Eko.Action.actionDetail({ run: function () { that.detail(); } }),
                    });
                    // menubar
                    this.menuBar(this.actions.createBar([{ action: this.actions.actDetail, primary: true, favorite: true }]));
                    // breadcrumbs
                    this.setBreadcrumbs([{ caption: "Banky", defaultAction: true }]);
                    // filtry
                    let filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr" })
                        .addSection("")
                        .addRow("Popis").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "naz_ban" });
                    this.$filterForm = $.newDiv().appendTo(this.element)
                        .gfilterpanel(Gordic.Eko.Filters.getFilterParams([filterFormDef], 
                    // TODO: doplnit nějaké oblíbené filtry
                    ["XXXXXXXXX"], "buc_ptm_test", 
                    // TODO: má být nějaká *vlastní?
                    null, function (event, obj) {
                        // načtení dat podle filtrů
                        that.nacteniSeznamu(obj.filter);
                    }));
                    //test - nastavit do view "islTaks" objekt a nastavit prázdná data, aby k samovolnému načtení nedošlo a grid si "myslel", že již data má 
                    //this.viewBanky = new Gordic.Isl.View(Gordic.Isl.Banka.list({
                    //}), { data: [] as any });
                    // grid
                    $("<div class='SeznamBuc'>")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid({
                        columnMode: "full",
                        //test přiřadit view do vlastnosti data: daného gridu
                        //data: that.viewBanky,
                        multi: true,
                        // obslužná akce pro doubleclick pro zobrazení detailu platby
                        defaultAction: that.actions.actDetail,
                        // TODO: nebo použít selection místo cellActivate?
                        cellActivate: function (ev, obj) {
                            // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                            if (obj != null && obj.cellInfo != null && obj.cellInfo.data != null) {
                                that.enable();
                                that.previewController.enable(true);
                                that.previewController.show(obj.cellInfo.data);
                            }
                            else {
                                // TODO: může tohle vůbec nastat?
                                that.previewController.enable(false);
                            }
                        },
                        // TODO: upravit:
                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                        columns: WebClient.BucGrid.Banka.createGridFormat(that)
                    }).gautofit();
                    // náhled v pravém bočním panelu
                    this.element.gsidebar("option", { right: { width: 200, visible: false, leafsAutoHide: false } });
                    let previewPanelsDefinition = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                //linkProvider: function (loadParams) { return Gordic.WebApp.Utility.createCommandUrl(null, "OpenDetail", { ixp: loadParams.pla_ixp }, { ticketType: Gordic.Enums.TicketType.WithLoginAndContext }) },
                                viewId: "buc:Platba"
                            }),
                            Gordic.Previews.getFilePreviewTab({
                                ixpProvider: function (loadParams) { return loadParams.ixp; }
                            })
                        ]
                    };
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanelsDefinition);
                    this.previewController.registerPanel();
                    // oprávnění 
                    /*Gordic.Isl*/ this.isl.Banka.getServicePermissions()
                        .get()
                        .done(function (perm) {
                        // oprávnění (bez naplnění seznamu)
                        //that.permissions = perm;
                        // nastavení okna
                        that.enable();
                    });
                    // nastavení okna
                    //this.enable();
                }
                /**
                 * Naplnění seznamu plateb případů
                 *
                 * @param {any} [filterModel] aktuální filtry
                 */
                nacteniSeznamu(filterModel) {
                    let that = this;
                    // načtení dat do gridu
                    if (filterModel === undefined || filterModel === null) {
                        this.$filterForm.gfilterpanel("applyFilter");
                        // nastavení okna
                        that.enable();
                    }
                    else {
                        // načtení dat do seznamu
                        filterModel = filterModel || {};
                        ;
                        let returnObj = {
                            data: null
                        };
                        // deferred objekt pro zřetězení otázek
                        let def = $.Deferred().resolve(returnObj).promise();
                        // obsluha jednotlivých fází
                        this.beginOperation("Načítám data");
                        def.then(function (returnObj) {
                            let def = $.Deferred();
                            // načtení dat
                            /*Gordic.Isl*/
                            that.isl.Banka.list(rq => { return { /*filters: that.currentFilter!*/}; })
                                .get()
                                .done(function (response) {
                                returnObj.data = response.data;
                                ////that.permissions = <Gordic.Buc.Interface.GBankaServicePermission>response.servicePermissions;
                                def.resolve(returnObj);
                            })
                                .fail(function () {
                                // operace nedopadla
                                def.reject();
                            });
                            return def.promise();
                        })
                            .then(function (returnObj) {
                            let def = $.Deferred();
                            // úprava dat
                            WebClient.BucGrid.Banka.modifyDto(returnObj.data)
                                .done(function (data) {
                                returnObj.data = data;
                                def.resolve(returnObj);
                            });
                            return def.promise();
                        })
                            .done(function (returnObj) {
                            // pohled
                            let view = new Gordic.Data.View(returnObj.data, { key: "ixp,radek_uhr" });
                            // nastavení dat a překreslení gridu
                            that.element.find(".SeznamBuc.ggrid").ggrid("setData", view);
                            // nastavení okna
                            that.enable();
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                }
                /**
                 * Naplnění jednoho řádku do seznamu plateb
                 *
                 * @param {any} filterPK filtr pro aktualizaci dat
                 * @param {any} $grid (default = undefined) grid, který má být aktualizován (vždy je navíc aktualizován základní seznamový grid)
                 */
                nacteniRadku(filterPK, $grid = undefined) {
                    let that = this;
                    // volání obecné metody pro načtení řádku
                    WebClient.BucGrid.reloadRow(that, (rq) => { return that.isl.Banka.list(rq); }, WebClient.BucGrid.Banka.modifyDto, () => that.enable(), filterPK, $grid);
                }
                /**
                 * Zobrazení detailu platby případu
                 */
                detail() {
                    let that = this;
                    // aktuální vybraná položka
                    const $grid = this.element.find(".SeznamBuc.ggrid");
                    const aktRadek = $grid.ggrid("activeRow");
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        // otevření detailu
                        let $detailWindow = this.navigate(["Gordic.Buc.WebClient.GDetailTEST", { gridRemoteControl: new Gordic.Components.GridRC($grid) }], {
                            Ico: aktRadek.ico,
                            Ucs: aktRadek.ucs,
                            IxsEsu: aktRadek.ixs_esu,
                            Sbu: aktRadek.sbu
                        });
                        // obsluha aktivní operace na detailu
                        $.content($detailWindow).on(WebClient.BucDetail.triggerChange, (retVal) => {
                            //záznam byl změně, musí se načíst znovu
                            if (retVal != null && retVal.data && retVal.data.ixs_esu && retVal.data.sbu && retVal.data.ixs_esu != null && retVal.data.sbu != null) {
                                that.nacteniRadku({ ixs_esu: retVal.data.ixs_esu, sbu: retVal.data.sbu });
                            }
                        });
                    }
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // aktuální platba
                    const aktZaznam = this.element.find(".SeznamBuc.ggrid").ggrid("activeRow");
                    // akce seznamu
                    this.actions.actDetail.updatePermission(aktZaznam === null ? { value: false } : null /*this.permissions?.LzeZobrazit*/);
                }
            };
            GSeznamBanka = __decorate([
                gcontent
                //export class GSeznamTEST extends GContentBase {
            ], GSeznamBanka);
            WebClient.GSeznamBanka = GSeznamBanka;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUJhbmthLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUJhbmthLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FzUmY7QUF0UkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc1JuQjtJQXRSZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc1I3QjtRQXRSb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkM7Ozs7O2VBS0c7WUFHSCxJQUFhLFlBQVk7WUFEekIsaURBQWlEO1lBQ2pELE1BQWEsWUFBYSxTQUFRLE9BQUEsWUFBc0k7Z0JBRXBLLEtBQUs7Z0JBQ0wsNEJBQTRCO2dCQUM1QixnQkFBZ0I7Z0JBQ2hCLEtBQUs7Z0JBQ0wsNkJBQTZCO2dCQUM3QixLQUFLO2dCQUNMLHFCQUFxQjtnQkFDckIsbUJBQW1CO2dCQUNuQixLQUFLO2dCQUNMLDhCQUE4QjtnQkFDOUIsS0FBSztnQkFDTCx3QkFBd0I7Z0JBQ3hCLGdCQUFnQjtnQkFDaEIsS0FBSztnQkFDTCxpQ0FBaUM7Z0JBQ2pDLEtBQUs7Z0JBQ0wsaUNBQWlDO2dCQUNqQyxxRUFBcUU7Z0JBQ3JFLEtBQUs7Z0JBQ0wsZ0ZBQWdGO2dCQUVoRixrQkFBa0I7Z0JBRWxCLGdDQUFnQztnQkFDaEMscUVBQXFFO2dCQUdyRTs7bUJBRUc7Z0JBQ0ksY0FBYztvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixpQkFBaUI7b0JBQ2pCLDRCQUE0QjtvQkFFNUIsZUFBZTtvQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3FC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ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V6bmFtIFRFU1RcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjNcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICAvL2V4cG9ydCBjbGFzcyBHU2V6bmFtVEVTVCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUJhbmthIGV4dGVuZHMgR0NvbnRlbnRCYXNlPEJ1Y0dyaWQuSUdTdGFuZGFyZEJ1Y0dyaWQ8QnVjLkludGVyZmFjZS5HQmFua2FEdG8sIEJ1Yy5JbnRlcmZhY2UuR0JhbmthUGVybWlzc2lvbj4gJiBHb3JkaWMuRWtvLlV0aWxzLklHRWtvQm9va0V4dGVuc2lvbj4ge1xyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogQWt0dcOhbG7DrSBob2Rub3R5IGZpbHRydVxyXG4gICAgICAgIC8vICogQHR5cGUge2FueX1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBjdXJyZW50RmlsdGVyOiBhbnk7XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEZpbHRyIG5hZCBncmlkZW1cclxuICAgICAgICAvLyAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgJGZpbHRlckZvcm06IEpRdWVyeTtcclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogb3ZsYWRhxI0gcHJvIG7DoWhsZWR5XHJcbiAgICAgICAgLy8gKiBAdHlwZSB7YW55fVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIHByZXZpZXdDb250cm9sbGVyOiBhbnk7XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIG9wcsOhdm7Em27DrSAoayBjZWzDqW11IHNlem5hbXUpXHJcbiAgICAgICAgLy8gKiBAdHlwZSB7R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0JhbmthU2VydmljZVBlcm1pc3Npb24gfCB1bmRlZmluZWR9XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgcGVybWlzc2lvbnM6IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdCYW5rYVNlcnZpY2VQZXJtaXNzaW9uIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvLyB2bGFzdG5vc3RpIHogQyNcclxuXHJcbiAgICAgICAgLy8gZGVmaW5pY2UgdmlldyBwcm8gZ3JpZCAtIHRlc3RcclxuICAgICAgICAvL3ByaXZhdGUgdmlld0Jhbmt5OiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0JhbmthRHRvPjtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1w6FsbsOtIGZpbHRyXHJcbiAgICAgICAgICAgIC8vdGhpcy5jdXJyZW50RmlsdGVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoeyBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5kZXRhaWwoKTsgfSB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBtZW51YmFyXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFt7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdERldGFpbCwgcHJpbWFyeTogdHJ1ZSwgZmF2b3JpdGU6IHRydWUgfV0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGJyZWFkY3J1bWJzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogXCJCYW5reVwiLCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGZpbHRyeVxyXG4gICAgICAgICAgICBsZXQgZmlsdGVyRm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIktvbXBsZXRuw60gZmlsdHJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3Bpc1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoKSwgeyBuYW1lOiBcIm5hel9iYW5cIiB9KVxyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJGb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKEdvcmRpYy5Fa28uRmlsdGVycy5nZXRGaWx0ZXJQYXJhbXM8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0JhbmthRmlsdGVyPihcclxuICAgICAgICAgICAgICAgICAgICBbZmlsdGVyRm9ybURlZl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBuxJtqYWvDqSBvYmzDrWJlbsOpIGZpbHRyeVxyXG4gICAgICAgICAgICAgICAgICAgIFtcIlhYWFhYWFhYWFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBcImJ1Y19wdG1fdGVzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG3DoSBiw710IG7Em2pha8OhICp2bGFzdG7DrT9cclxuICAgICAgICAgICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXQgcG9kbGUgZmlsdHLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RlbmlTZXpuYW11KG9iai5maWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICAvL3Rlc3QgLSBuYXN0YXZpdCBkbyB2aWV3IFwiaXNsVGFrc1wiIG9iamVrdCBhIG5hc3Rhdml0IHByw6F6ZG7DoSBkYXRhLCBhYnkgayBzYW1vdm9sbsOpbXUgbmHEjXRlbsOtIG5lZG/FoWxvIGEgZ3JpZCBzaSBcIm15c2xlbFwiLCDFvmUgamnFviBkYXRhIG3DoSBcclxuICAgICAgICAgICAgLy90aGlzLnZpZXdCYW5reSA9IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5CYW5rYS5saXN0KHtcclxuICAgICAgICAgICAgLy99KSwgeyBkYXRhOiBbXSBhcyBhbnkgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBncmlkXHJcbiAgICAgICAgICAgICQoXCI8ZGl2IGNsYXNzPSdTZXpuYW1CdWMnPlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0JhbmthRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXN0IHDFmWnFmWFkaXQgdmlldyBkbyB2bGFzdG5vc3RpIGRhdGE6IGRhbsOpaG8gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAvL2RhdGE6IHRoYXQudmlld0Jhbmt5LFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ic2x1xb5uw6EgYWtjZSBwcm8gZG91YmxlY2xpY2sgcHJvIHpvYnJhemVuw60gZGV0YWlsdSBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lYm8gcG91xb7DrXQgc2VsZWN0aW9uIG3DrXN0byBjZWxsQWN0aXZhdGU/XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzdGF2dSBva25hIGEgbsOhaGxlZHUgcG9kbGUgYWt0dcOhbG7EmyB2eWJyYW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqICE9IG51bGwgJiYgb2JqLmNlbGxJbmZvICE9IG51bGwgJiYgb2JqLmNlbGxJbmZvLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KG9iai5jZWxsSW5mby5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG3Fr8W+ZSB0b2hsZSB2xa9iZWMgbmFzdGF0P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1cHJhdml0OlxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wiYWNfYWdcIiwgXCJhY1wiLCBcImljb19lc3VcIiwgXCJyY19lc3VcIiwgXCJuYXpldl9lc3VcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQnVjR3JpZC5CYW5rYS5jcmVhdGVHcmlkRm9ybWF0KHRoYXQpXHJcbiAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gbsOhaGxlZCB2IHByYXbDqW0gYm/EjW7DrW0gcGFuZWx1XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nc2lkZWJhcihcIm9wdGlvblwiLCB7IHJpZ2h0OiB7IHdpZHRoOiAyMDAsIHZpc2libGU6IGZhbHNlLCBsZWFmc0F1dG9IaWRlOiBmYWxzZSB9IH0pO1xyXG4gICAgICAgICAgICBsZXQgcHJldmlld1BhbmVsc0RlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9saW5rUHJvdmlkZXI6IGZ1bmN0aW9uIChsb2FkUGFyYW1zKSB7IHJldHVybiBHb3JkaWMuV2ViQXBwLlV0aWxpdHkuY3JlYXRlQ29tbWFuZFVybChudWxsLCBcIk9wZW5EZXRhaWxcIiwgeyBpeHA6IGxvYWRQYXJhbXMucGxhX2l4cCB9LCB7IHRpY2tldFR5cGU6IEdvcmRpYy5FbnVtcy5UaWNrZXRUeXBlLldpdGhMb2dpbkFuZENvbnRleHQgfSkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0lkOiBcImJ1YzpQbGF0YmFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmV2aWV3cy5nZXRGaWxlUHJldmlld1RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cFByb3ZpZGVyOiBmdW5jdGlvbiAobG9hZFBhcmFtcykgeyByZXR1cm4gbG9hZFBhcmFtcy5peHA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIgPSBuZXcgR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcih0aGlzLmVsZW1lbnQsIHByZXZpZXdQYW5lbHNEZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlci5yZWdpc3RlclBhbmVsKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBvcHLDoXZuxJtuw60gXHJcbiAgICAgICAgICAgIC8qR29yZGljLklzbCovdGhpcy5pc2wuQmFua2EuZ2V0U2VydmljZVBlcm1pc3Npb25zKClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHBlcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBvcHLDoXZuxJtuw60gKGJleiBuYXBsbsSbbsOtIHNlem5hbXUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnBlcm1pc3Npb25zID0gcGVybTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAgICAgLy90aGlzLmVuYWJsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFwbG7Em27DrSBzZXpuYW11IHBsYXRlYiBwxZnDrXBhZMWvXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IFtmaWx0ZXJNb2RlbF0gYWt0dcOhbG7DrSBmaWx0cnlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hY3RlbmlTZXpuYW11KGZpbHRlck1vZGVsPzogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IGRvIGdyaWR1XHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXJNb2RlbCA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlck1vZGVsID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCBkbyBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJNb2RlbCA9IGZpbHRlck1vZGVsIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgLy8gemFwYW1hdG92w6Fuw60gYWt0dcOhbG7DrWhvIGZpbHRydSBrdsWvbGkgdGlza8WvbVxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmN1cnJlbnRGaWx0ZXIgPSBmaWx0ZXJNb2RlbDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgLy8gb2JqZWt0IHBybyBwxZllZMOhdsOhbsOtIGhvZG5vdFxyXG4gICAgICAgICAgICAgICAgaW50ZXJmYWNlIHJldHVybk9ialR5cGUge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdCYW5rYUR0b1tdIHwgbnVsbFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGxldCByZXR1cm5PYmo6IHJldHVybk9ialR5cGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vIGRlZmVycmVkIG9iamVrdCBwcm8gesWZZXTEm3plbsOtIG90w6F6ZWtcclxuICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXR1cm5PYmopLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgamVkbm90bGl2w71jaCBmw6F6w61cclxuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJOYcSNw610w6FtIGRhdGFcIik7XHJcbiAgICAgICAgICAgICAgICBkZWYudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgLypHb3JkaWMuSXNsKi9cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5CYW5rYS5saXN0KHJxID0+IHsgcmV0dXJuIHsgLypmaWx0ZXJzOiB0aGF0LmN1cnJlbnRGaWx0ZXIhKi8gfTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLmRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vL3RoYXQucGVybWlzc2lvbnMgPSA8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0JhbmthU2VydmljZVBlcm1pc3Npb24+cmVzcG9uc2Uuc2VydmljZVBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0dXJuT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3BlcmFjZSBuZWRvcGFkbGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7pwcmF2YSBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgQnVjR3JpZC5CYW5rYS5tb2RpZnlEdG8ocmV0dXJuT2JqLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk9iai5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXR1cm5PYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhyZXR1cm5PYmouZGF0YSEsIHsga2V5OiBcIml4cCxyYWRla191aHJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbUJ1Yy5nZ3JpZFwiKS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXBsbsSbbsOtIGplZG5vaG8gxZnDoWRrdSBkbyBzZXpuYW11IHBsYXRlYlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBmaWx0ZXJQSyBmaWx0ciBwcm8gYWt0dWFsaXphY2kgZGF0XHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9ICRncmlkIChkZWZhdWx0ID0gdW5kZWZpbmVkKSBncmlkLCBrdGVyw70gbcOhIGLDvXQgYWt0dWFsaXpvdsOhbiAodsW+ZHkgamUgbmF2w61jIGFrdHVhbGl6b3bDoW4gesOha2xhZG7DrSBzZXpuYW1vdsO9IGdyaWQpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0ZW5pUmFka3UoZmlsdGVyUEs6IGFueSwgJGdyaWQ6IGFueSA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gb2JlY27DqSBtZXRvZHkgcHJvIG5hxI10ZW7DrSDFmcOhZGt1XHJcbiAgICAgICAgICAgIEJ1Y0dyaWQucmVsb2FkUm93KFxyXG4gICAgICAgICAgICAgICAgdGhhdCxcclxuICAgICAgICAgICAgICAgIChycSkgPT4geyByZXR1cm4gdGhhdC5pc2wuQmFua2EubGlzdChycSk7IH0sXHJcbiAgICAgICAgICAgICAgICBCdWNHcmlkLkJhbmthLm1vZGlmeUR0byxcclxuICAgICAgICAgICAgICAgICgpID0+IHRoYXQuZW5hYmxlKCksXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJQSyxcclxuICAgICAgICAgICAgICAgICRncmlkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGRldGFpbHUgcGxhdGJ5IHDFmcOtcGFkdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSB2eWJyYW7DoSBwb2xvxb5rYVxyXG4gICAgICAgICAgICBjb25zdCAkZ3JpZCA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbUJ1Yy5nZ3JpZFwiKTtcclxuICAgICAgICAgICAgY29uc3QgYWt0UmFkZWsgPSAkZ3JpZC5nZ3JpZDxHb3JkaWMuQnVjLkludGVyZmFjZS5HQmFua2FEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICBpZiAoYWt0UmFkZWsgJiYgIShha3RSYWRlayBpbnN0YW5jZW9mIGpRdWVyeSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHVcclxuICAgICAgICAgICAgICAgIGxldCAkZGV0YWlsV2luZG93ID0gdGhpcy5uYXZpZ2F0ZShbXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HRGV0YWlsVEVTVFwiLCB7IGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKCRncmlkKSB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIEljbzogYWt0UmFkZWsuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgIFVjczogYWt0UmFkZWsudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4c0VzdTogYWt0UmFkZWsuaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICBTYnU6IGFrdFJhZGVrLnNidVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb2JzbHVoYSBha3Rpdm7DrSBvcGVyYWNlIG5hIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICQuY29udGVudCgkZGV0YWlsV2luZG93KS5vbihCdWNEZXRhaWwudHJpZ2dlckNoYW5nZSwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy96w6F6bmFtIGJ5bCB6bcSbbsSbLCBtdXPDrSBzZSBuYcSNw61zdCB6bm92dVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gbnVsbCAmJiByZXRWYWwuZGF0YSAmJiByZXRWYWwuZGF0YS5peHNfZXN1ICYmIHJldFZhbC5kYXRhLnNidSAmJiByZXRWYWwuZGF0YS5peHNfZXN1ICE9IG51bGwgJiYgcmV0VmFsLmRhdGEuc2J1ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0ZW5pUmFka3UoeyBpeHNfZXN1OiByZXRWYWwuZGF0YS5peHNfZXN1LCBzYnU6IHJldFZhbC5kYXRhLnNidSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gdmUgZm9ybXVsw6HFmWlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gcGxhdGJhXHJcbiAgICAgICAgICAgIGNvbnN0IGFrdFphem5hbSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbUJ1Yy5nZ3JpZFwiKS5nZ3JpZDxHb3JkaWMuQnVjLkludGVyZmFjZS5HQmFua2FEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBzZXpuYW11XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWwhLnVwZGF0ZVBlcm1pc3Npb24oYWt0WmF6bmFtID09PSBudWxsID8geyB2YWx1ZTogZmFsc2UgfSA6IG51bGwvKnRoaXMucGVybWlzc2lvbnM/Lkx6ZVpvYnJheml0Ki8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19