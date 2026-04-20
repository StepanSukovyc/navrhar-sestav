"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            /**
             * GUctKnihy
             *
             *  Seznam ucetnich knih
             *
             * @author Tomáš Kareš
             * @since 482.1.0.29
             */
            let GUctDokladKnihy = class GUctDokladKnihy extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actSeznamKnihTaskID";
                    this.logOptions = { name: "GUctDokladKnihy", authorCode: 302, file: "GUctDokladKnihy.ts" };
                    this.loadingData = false;
                    //private cardPanelItems(data: Gordic.Uct.Interface.GUctVybraneKnihyDto[]): any[] {
                    //    this.log.debug("Start cardPanelItems-GUctDokladKnihy");
                    //    var items: any[] = [];
                    //    data.forEach(function (row) {
                    //        var item = {
                    //            zkratka: row.zkratka,
                    //            nazev: row.nazev,
                    //            ixp_den: row.ixp_den,
                    //            stav_txt: row.stav_txt,
                    //            aktivita: row.aktivita,
                    //            pocet_vsech_dokladu: Gordic.Templates.Formatters.number(row.pocet_vsech_dokladu as number + (row.pocet_vsech_dokladu_archiv?row.pocet_vsech_dokladu_archiv as number:0), "# ###0"),
                    //            pocet_neuzavrenych_dokladu: Gordic.Templates.Formatters.number(row.pocet_neuzavrenych_dokladu, "# ###0"),
                    //            pocet_pripravenych_dokladu: Gordic.Templates.Formatters.number(row.pocet_vsech_dokladu as number - (row.pocet_neuzavrenych_dokladu as number), "# ###0"),                    
                    //        }
                    //        var styl = "";
                    //        if (row.akt_subrady === 400 || row.akt_subrady === 500 || row.akt_subrady === 900 || row.akt_subrady === 0)
                    //            // uzavreno odlito
                    //            styl = "color:red";
                    //        else if (row.akt_subrady === 300)
                    //            // pripraveno k uzaverce
                    //            styl = "color:blue";
                    //        item["styl_stavknihy"] = styl;
                    //        items.push(item);
                    //    });
                    //    return items;
                    //}
                }
                onContentReady() {
                    this.log.debug("Start onContentReady-GUctDokladKnihy");
                    // vytvoreni gridu
                    this.createGrid();
                    this.reload();
                    var that = this;
                    //debugger;
                    //Gordic.Isl.UctKniha.list(
                    //    rq => {
                    //        return {                        
                    //            fragments: ["rdac", "doklad", "ekocakr", "doklad_neuzavreno", "doklad_neuzavreno","doklad_vse"]
                    //        };
                    //    }
                    //).get().done(function (data) {
                    //    that.log.debug("Nacteni dat ", data);
                    //    debugger;
                    //    var myItemTemplate = "<div class='items gcard' style='display: block; float: left; background:#ffffff'>" +
                    //        "<div class='g-card'>" +
                    //        "<div class='g-rap-card'>" +
                    //        "<div class='g-card-header'>" +
                    //        "<div class='g-card-header-text gtooltip'>{zkratka}</div>" +
                    //        "</div>" +
                    //        "<div class='g-card-main'>" +
                    //        "<div style='font-weight : bold'>{nazev}</div>" +
                    //        "<hr>" +    
                    //        "</br>" +
                    //        "<span style='text-decoration : underline'><strong>Stav knihy</strong></span>" +
                    //        "<div style=\"{styl_stavknihy}\">{stav_txt}</div>" +
                    //        "</br>" +
                    //        "<div><span style='text-decoration : underline'><strong>Počty dokladů v knize</strong></span></div>" +
                    //        //"</br>" +
                    //        "<div><span>všechny doklady</span><span style ='float: right'><span>{pocet_vsech_dokladu}</span></span></div>" +
                    //        //"</br>" +
                    //        "<div><span> připravených k uzávěrce</span><span style ='float: right'><span>{pocet_pripravenych_dokladu}</span></span></div>" +
                    //        //"</br>" +
                    //        "<span> nepřipravených k uzávěrce</span><span style ='float: right'><span style=\"color:red\">{pocet_neuzavrenych_dokladu}</span></span>" +
                    //        "</br>" +
                    //        "</div>" + //g-card-main
                    //        "</div>" +
                    //        "</div>" +
                    //        "</div > "
                    //    var cardPanel = $.newDiv().appendTo(that.element).gcardpanel({
                    //        itemTemplate: myItemTemplate,
                    //        //opened: false,
                    //        data: that.cardPanelItems(data.data),
                    //        editable: false,
                    //        createTab: true,
                    //        defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                    //            name: "actUctDetailKnihy",
                    //            run: function (ev, ctx) {
                    //               // that.dialogs.alert("tu");
                    //                that.navigate(['Gordic.Uct.WebClient.GUctSeznamServiceContent', { gpc: Gordic.Eko.Utils.createBookGpc(that.gpc, ctx.item.data.ixp_den) }], {
                    //                    taskId: 'actSeznamdokladuID',
                    //                    ID: 'UCTSeznamdokladu#',
                    //                    //idKnihy: ctx.item.ixp_den,
                    //                    filtr: Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Vsechny,
                    //                });
                    //            }
                    //        })
                    //    });
                    //});
                }
                /**
                 * Vytvoreni gridu
                 * */
                createGrid() {
                    let that = this;
                    this.islView = this.createListView();
                    var condFormat = void 0;
                    condFormat = [
                        {
                            description: "jres:30250803", //RC 30250803 : Připraveno k uzávěrce
                            formula: "@akt_subrady==300",
                            applyTo: "stav_txt",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                        },
                        {
                            description: "jres:30250802", //RC 30250802 : Uzavřena odlita
                            formula: "@akt_subrady==400 or @akt_subrady==500 or @akt_subrady==900 or @akt_subrady==0",
                            applyTo: "stav_txt",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.red
                        }
                    ];
                    let gridFormat = that.createGridFormat();
                    $.newDiv("js-uctSeznamKnihGrid")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid({
                        columnMode: "full", //"fit",     // fit (defaultne by melo byt toto), full
                        multi: false,
                        data: this.islView,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                var radek = Gordic.Eko.Grid.currentRow(that.getGrid());
                                if (radek != null)
                                    that.navigate(['Gordic.Uct.WebClient.GUctSeznamServiceContent', { gpc: Gordic.Eko.Utils.createBookGpc(that.gpc, radek.ixp_den) }], {
                                        taskId: 'actSeznamdokladuID',
                                        ID: 'UCTSeznamdokladu#',
                                        //idKnihy: ctx.item.ixp_den,
                                        filtr: 20 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Vsechny */,
                                    });
                            }
                        }),
                        selection: function (ev, info) {
                            that.nastaveniPristupnosti();
                        },
                        columns: gridFormat,
                        defaultProfile: { columnList: gridFormat.columns.map((c) => c.name).join(","), condFormats: condFormat },
                    }).gautofit();
                }
                /**
                 * Nastaveni pristupnosti akci dle stavu a prav formulare
                 *
                 * */
                nastaveniPristupnosti() {
                    let grid = this.getGrid();
                    let emptyRows = true;
                    let emptyMsg = "jres:30250724"; //RC 30250724 : Není vybrána žádná kniha
                    let oznaceneRadky = [];
                    //if (grid !== null) {
                    //    oznaceneRadky = Gordic.Eko.Grid.checkedRows<Gordic.Uct.Interface.GUctVybraneKnihyDto>(grid, false);
                    //    if (oznaceneRadky !== null && oznaceneRadky !== undefined && oznaceneRadky.length > 0) {
                    //        emptyRows = false;
                    //    }
                    //}
                    //if (emptyRows) {
                    //    this.actions.actCloseBooks?.update({ enabled: false, tooltip: emptyMsg });
                    //    this.actions.actOpenBooks?.update({ enabled: false, tooltip: emptyMsg });
                    //}
                    //else {
                    //    let vybraneStavy = this.findOznaceneStavy(oznaceneRadky as any);
                    //    if (this.Permissions.EnableClosing.value) {
                    //        if (vybraneStavy.Otevrene)
                    //            this.actions.actCloseBooks?.updatePermission(this.Permissions.EnableClosing);
                    //        else
                    //            this.actions.actCloseBooks?.update({ enabled: false, tooltip: "jres:30250727" }) //RC 30250727 : Ve výběru není vybrána otevřená kniha
                    //        if (vybraneStavy.Uzavrene)
                    //            this.actions.actOpenBooks?.updatePermission(this.Permissions.EnableClosing);
                    //        else
                    //            this.actions.actOpenBooks?.update({ enabled: false, tooltip: "jres:30250728" }) //RC 30250728 : Ve výběru není vybrána uzavřená kniha
                    //    }
                    //    else {
                    //        this.actions.actCloseBooks?.updatePermission(this.Permissions.EnableClosing);
                    //        this.actions.actOpenBooks?.updatePermission(this.Permissions.EnableClosing);
                    //    }
                    //}
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.element.find(".ggrid.js-uctSeznamKnihGrid");
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Vytvoreni view pro list
                 *
                 * */
                createListView() {
                    let that = this;
                    return new Gordic.Isl.View(that.isl.UctKniha.list().use((req, next, ctx) => {
                        debugger;
                        //req.fragments=["rdac", "doklad", "ekocakr", "doklad_neuzavreno", "doklad_neuzavreno", "doklad_vse"];
                        return next(req);
                        //return this.getFilterData(that, req, next) as any;                    
                    }), {
                        //filterPanel: that.$filterPanel,
                        startEmpty: true,
                    });
                }
                /**
                 * Znovunacteni dat
                 *
                 * */
                reload() {
                    if (this.closed)
                        return;
                    let that = this;
                    if (that.loadingData)
                        return;
                    let grid = this.getGrid();
                    let view = grid.ggrid("getView");
                    that.loadingData = true;
                    view.requestData().always(() => {
                        if (this.closed)
                            return;
                        var view = grid.ggrid("getView");
                        let data = view.getDataRows();
                        that.loadingData = false;
                        that.nastaveniPristupnosti();
                    });
                }
                /**
                 * Vytvoreni gridformatu
                 * */
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addRok({
                        caption: "jres:30250756", //RC 30250756 : Rok
                        fragment: "sden" /* Gordic.Eko.Interface.GEkosdenBaseDtoFragments.rok */,
                        description: "jres:30250748" //RC 30250748 : Rok knihy
                    }) //RC 30250756 : Rok
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:30250863", //RC 30250863 : Název knihy
                        width: 170,
                        fragment: "uctsden" /* Gordic.Uct.Interface.GUctVybraneKnihyDtoFragments.nazev */
                        //fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addTextColumn({
                        name: "zkratka",
                        caption: "jres:30250757", //RC 30250757 : Zkratka
                        description: "jres:30250392", //RC 30250392 : Zkratka knihy
                        width: 70,
                        fragment: "*" /* Gordic.Uct.Interface.GUctVybraneKnihyDtoFragments.zkratka */
                        //fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addTextColumn({
                        name: "ktg_den_txt",
                        caption: "jres:30250758", //RC 30250758 : Kategorie
                        description: "jres:30250749", //RC 30250749 : Kategorie knihy
                        width: 120,
                        fragment: "uctcktd" /* Gordic.Eko.Interface.GEkoKnihaDtoFragments.ktg_den_txt */
                        //fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addTextColumn({
                        name: "stav_txt",
                        width: 150,
                        caption: "jres:30250182", //RC 30250182 : Stav knihy
                        fragment: "*" /* Gordic.Uct.Interface.GUctVybraneKnihyDtoFragments.stav_txt */ //"ekocakr"
                    })
                        .addNumberColumn({
                        name: "pocet_vsech_dokladu",
                        width: 150,
                        caption: "jres:30250760", //RC 30250760 : Evidováno dokladů
                        description: "jres:30250759", //RC 30250759 : Počet dokladů aktuálně evidovaných v knize
                        fragment: "doklad_vse"
                    })
                        .addNumberColumn({
                        name: "pocet_uzav",
                        width: 150,
                        cellTemplate: (row) => {
                            let suma = parseInt(row.pocet_vsech_dokladu) - parseInt(row.pocet_neuzavrenych_dokladu);
                            return suma.toString();
                        },
                        caption: "jres:30250762", //RC 30250762 : Uzavřeno dokladů
                        description: "jres:30250761", //RC 30250761 : Počet dokladů evidovaných a uzavřených
                        fragment: "doklad"
                    })
                        .addNumberColumn({
                        name: "pocet_neuzavrenych_dokladu",
                        width: 150,
                        caption: "jres:30250764", //RC 30250764 : Neuzavřeno dokladů
                        description: "jres:30250763", //RC 30250763 : Počet evidovaných neuzavřených dokladů bránících uzavření knihy
                        fragment: "doklad_neuzavreno"
                    })
                        .addNumberColumn({
                        name: "pocet_neevid_dokladu",
                        width: 150,
                        caption: "jres:30250753", //RC 30250753 : Neevidováno dokladů
                        description: "jres:30250765", //RC 30250765 : Počet dokladů podaných do knihy a nezaevidovaných, které rovněž mohou bránit uzávěrce
                        fragment: "doklad_neevid" /* Gordic.Eko.Interface.GEkoKnihaDtoFragments.pocet_neevid_dokladu */ // "doklad_neevid"
                    })
                        //.addIco({ fragment: "sden" })
                        .addPid({ name: "ixp_den", field: "ixp_den", fragment: "sden" /* Gordic.Eko.Interface.GEkosdenBaseDtoFragments.ixp_den */ })
                        .addUcs({ fragment: "sden" /* Gordic.Eko.Interface.GEkosdenBaseDtoFragments.ucs */ })
                        .addUus({ fragment: "sden" /* Gordic.Eko.Interface.GEkosdenBaseDtoFragments.uus */ })
                        .addNumberColumn({
                        name: "akt_subrady",
                        width: 150,
                        caption: "Aktivita subrady",
                        hidden: true,
                        fragment: "rdac" /* Gordic.Eko.Interface.GEkoKnihaDtoFragments.akt_subrady */ // "doklad_neevid"
                    });
                    return gridFormat;
                }
            };
            GUctDokladKnihy = __decorate([
                Decorators.gcontent
            ], GUctDokladKnihy);
            WebClient.GUctDokladKnihy = GUctDokladKnihy;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdERva2xhZEtuaWh5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1VjdERva2xhZEtuaWh5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E2WGY7QUE3WEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNlhuQjtJQTdYZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNlg3QjtRQTdYb0IsV0FBQSxTQUFTO1lBRTFCOzs7Ozs7O2VBT0c7WUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQUdJLFdBQU0sR0FBRyxxQkFBcUIsQ0FBQztvQkFDL0IsZUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLENBQUM7b0JBTzlFLGdCQUFXLEdBQVksS0FBSyxDQUFDO29CQThUckMsbUZBQW1GO29CQUVuRiw2REFBNkQ7b0JBRTdELDRCQUE0QjtvQkFFNUIsbUNBQW1DO29CQUVuQyxzQkFBc0I7b0JBQ3RCLG1DQUFtQztvQkFDbkMsK0JBQStCO29CQUMvQixtQ0FBbUM7b0JBQ25DLHFDQUFxQztvQkFDckMscUNBQXFDO29CQUNyQyxpTUFBaU07b0JBQ2pNLHVIQUF1SDtvQkFDdkgsMkxBQTJMO29CQUczTCxXQUFXO29CQUNYLHdCQUF3QjtvQkFDeEIscUhBQXFIO29CQUNySCxnQ0FBZ0M7b0JBQ2hDLGlDQUFpQztvQkFDakMsMkNBQTJDO29CQUMzQyxzQ0FBc0M7b0JBQ3RDLGtDQUFrQztvQkFFbEMsd0NBQXdDO29CQUN4QywyQkFBMkI7b0JBRTNCLFNBQVM7b0JBRVQsbUJBQW1CO29CQUVuQixHQUFHO2dCQUtQLENBQUM7Z0JBcFdVLGNBQWM7b0JBRWpCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7b0JBRXZELGtCQUFr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Q0FBQyxFQTdYZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNlhuQjtBQUFELENBQUMsRUE3WFMsTUFBTSxLQUFOLE1BQU0sUUE2WGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjdC5XZWJDbGllbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR1VjdEtuaWh5XHJcbiAgICAgKiBcclxuICAgICAqICBTZXpuYW0gdWNldG5pY2gga25paCBcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBUb23DocWhIEthcmXFoVxyXG4gICAgICogQHNpbmNlIDQ4Mi4xLjAuMjlcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVWN0RG9rbGFkS25paHkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RTZXpuYW1LbmloVGFza0lEXCI7XHJcbiAgICAgICAgbG9nT3B0aW9ucyA9IHsgbmFtZTogXCJHVWN0RG9rbGFkS25paHlcIiwgYXV0aG9yQ29kZTogMzAyLCBmaWxlOiBcIkdVY3REb2tsYWRLbmloeS50c1wiIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdGFzayBwcm8gc2V6bmFtXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgdGFza0xpc3Q6IElzbC5fVGFzazxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+O1xyXG4gICAgICAgIC8vIElzbCB2aWV3IFxyXG4gICAgICAgIHByb3RlY3RlZCBpc2xWaWV3OiBHb3JkaWMuSXNsLlZpZXc7XHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkaW5nRGF0YTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIlN0YXJ0IG9uQ29udGVudFJlYWR5LUdVY3REb2tsYWRLbmloeVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBncmlkdVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTsgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgLy9Hb3JkaWMuSXNsLlVjdEtuaWhhLmxpc3QoXHJcbiAgICAgICAgICAgIC8vICAgIHJxID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCJyZGFjXCIsIFwiZG9rbGFkXCIsIFwiZWtvY2FrclwiLCBcImRva2xhZF9uZXV6YXZyZW5vXCIsIFwiZG9rbGFkX25ldXphdnJlbm9cIixcImRva2xhZF92c2VcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQubG9nLmRlYnVnKFwiTmFjdGVuaSBkYXQgXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAvLyAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgLy8gICAgdmFyIG15SXRlbVRlbXBsYXRlID0gXCI8ZGl2IGNsYXNzPSdpdGVtcyBnY2FyZCcgc3R5bGU9J2Rpc3BsYXk6IGJsb2NrOyBmbG9hdDogbGVmdDsgYmFja2dyb3VuZDojZmZmZmZmJz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIjxkaXYgY2xhc3M9J2ctY2FyZCc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICAgICAgXCI8ZGl2IGNsYXNzPSdnLXJhcC1jYXJkJz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIjxkaXYgY2xhc3M9J2ctY2FyZC1oZWFkZXInPlwiICtcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiPGRpdiBjbGFzcz0nZy1jYXJkLWhlYWRlci10ZXh0IGd0b29sdGlwJz57emtyYXRrYX08L2Rpdj5cIiArXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiPGRpdiBjbGFzcz0nZy1jYXJkLW1haW4nPlwiICtcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC13ZWlnaHQgOiBib2xkJz57bmF6ZXZ9PC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICAgICAgXCI8aHI+XCIgKyAgICBcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiPC9icj5cIiArXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIjxzcGFuIHN0eWxlPSd0ZXh0LWRlY29yYXRpb24gOiB1bmRlcmxpbmUnPjxzdHJvbmc+U3RhdiBrbmloeTwvc3Ryb25nPjwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIjxkaXYgc3R5bGU9XFxcIntzdHlsX3N0YXZrbmloeX1cXFwiPntzdGF2X3R4dH08L2Rpdj5cIiArXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIjwvYnI+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICAgICAgXCI8ZGl2PjxzcGFuIHN0eWxlPSd0ZXh0LWRlY29yYXRpb24gOiB1bmRlcmxpbmUnPjxzdHJvbmc+UG/EjXR5IGRva2xhZMWvIHYga25pemU8L3N0cm9uZz48L3NwYW4+PC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9cIjwvYnI+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICAgICAgXCI8ZGl2PjxzcGFuPnbFoWVjaG55IGRva2xhZHk8L3NwYW4+PHNwYW4gc3R5bGUgPSdmbG9hdDogcmlnaHQnPjxzcGFuPntwb2NldF92c2VjaF9kb2tsYWR1fTwvc3Bhbj48L3NwYW4+PC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9cIjwvYnI+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICAgICAgXCI8ZGl2PjxzcGFuPiBwxZlpcHJhdmVuw71jaCBrIHV6w6F2xJtyY2U8L3NwYW4+PHNwYW4gc3R5bGUgPSdmbG9hdDogcmlnaHQnPjxzcGFuPntwb2NldF9wcmlwcmF2ZW55Y2hfZG9rbGFkdX08L3NwYW4+PC9zcGFuPjwvZGl2PlwiICtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vXCI8L2JyPlwiICtcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiPHNwYW4+IG5lcMWZaXByYXZlbsO9Y2ggayB1esOhdsSbcmNlPC9zcGFuPjxzcGFuIHN0eWxlID0nZmxvYXQ6IHJpZ2h0Jz48c3BhbiBzdHlsZT1cXFwiY29sb3I6cmVkXFxcIj57cG9jZXRfbmV1emF2cmVueWNoX2Rva2xhZHV9PC9zcGFuPjwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIjwvYnI+XCIgK1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIFwiPC9kaXY+XCIgKyAvL2ctY2FyZC1tYWluXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICAgICAgXCI8L2RpdiA+IFwiXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgdmFyIGNhcmRQYW5lbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nY2FyZHBhbmVsKHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpdGVtVGVtcGxhdGU6IG15SXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9vcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGF0YTogdGhhdC5jYXJkUGFuZWxJdGVtcyhkYXRhLmRhdGEpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY3JlYXRlVGFiOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oeyAgICAgLy9vYnNsdXpuYSBha2NlLCBrdGVyYSBzZSBzcG91c3RpIGRibCBjbGlja2VtIG5hZCByYWRrZW1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImFjdFVjdERldGFpbEtuaWh5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgIC8vIHRoYXQuZGlhbG9ncy5hbGVydChcInR1XCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFsnR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdFNlem5hbVNlcnZpY2VDb250ZW50JywgeyBncGM6IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyh0aGF0LmdwYywgY3R4Lml0ZW0uZGF0YS5peHBfZGVuKSB9XSwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGFza0lkOiAnYWN0U2V6bmFtZG9rbGFkdUlEJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIElEOiAnVUNUU2V6bmFtZG9rbGFkdSMnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9pZEtuaWh5OiBjdHguaXRlbS5peHBfZGVuLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZmlsdHI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5Wc2VjaG55LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy99KTtcclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuaXNsVmlldyA9IHRoaXMuY3JlYXRlTGlzdFZpZXcoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb25kRm9ybWF0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRbXSB8IHVuZGVmaW5lZCA9IHZvaWQgMDtcclxuICAgICAgICAgICAgY29uZEZvcm1hdCA9IFtcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA4MDNcIiwgLy9SQyAzMDI1MDgwMyA6IFDFmWlwcmF2ZW5vIGsgdXrDoXbEm3JjZVxyXG4gICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAYWt0X3N1YnJhZHk9PTMwMFwiXHJcbiAgICAgICAgICAgICAgICAsIGFwcGx5VG86IFwic3Rhdl90eHRcIlxyXG4gICAgICAgICAgICAgICAgLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsdWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDgwMlwiLCAvL1JDIDMwMjUwODAyIDogVXphdsWZZW5hIG9kbGl0YVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQGFrdF9zdWJyYWR5PT00MDAgb3IgQGFrdF9zdWJyYWR5PT01MDAgb3IgQGFrdF9zdWJyYWR5PT05MDAgb3IgQGFrdF9zdWJyYWR5PT0wXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGFwcGx5VG86IFwic3Rhdl90eHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWRcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGxldCBncmlkRm9ybWF0ID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgICQubmV3RGl2KFwianMtdWN0U2V6bmFtS25paEdyaWRcIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwvL1wiZml0XCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmlzbFZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oeyAgICAgLy9vYnNsdXpuYSBha2NlLCBrdGVyYSBzZSBzcG91c3RpIGRibCBjbGlja2VtIG5hZCByYWRrZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkVrby5JbnRlcmZhY2UuR0Vrb1Z5YnJhbmVLbmloeUR0bz4odGhhdC5nZXRHcmlkKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShbJ0dvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3RTZXpuYW1TZXJ2aWNlQ29udGVudCcsIHsgZ3BjOiBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhhdC5ncGMsIHJhZGVrLml4cF9kZW4gYXMgc3RyaW5nKSB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSWQ6ICdhY3RTZXpuYW1kb2tsYWR1SUQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogJ1VDVFNlem5hbWRva2xhZHUjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZEtuaWh5OiBjdHguaXRlbS5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0cjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlZzZWNobnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaVByaXN0dXBub3N0aSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHsgY29sdW1uTGlzdDogZ3JpZEZvcm1hdC5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSwgY29uZEZvcm1hdHM6IGNvbmRGb3JtYXQgfSxcclxuICAgICAgICAgICAgICAgIH0pLmdhdXRvZml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaSBkbGUgc3RhdnUgYSBwcmF2IGZvcm11bGFyZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZlbmlQcmlzdHVwbm9zdGkoKSB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGxldCBlbXB0eVJvd3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgZW1wdHlNc2cgPSBcImpyZXM6MzAyNTA3MjRcIjsgLy9SQyAzMDI1MDcyNCA6IE5lbsOtIHZ5YnLDoW5hIMW+w6FkbsOhIGtuaWhhXHJcbiAgICAgICAgICAgIGxldCBvem5hY2VuZVJhZGt5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvW10gfCBudWxsID0gW107XHJcbiAgICAgICAgICAgIC8vaWYgKGdyaWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgb3puYWNlbmVSYWRreSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvPihncmlkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vICAgIGlmIChvem5hY2VuZVJhZGt5ICE9PSBudWxsICYmIG96bmFjZW5lUmFka3kgIT09IHVuZGVmaW5lZCAmJiBvem5hY2VuZVJhZGt5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGVtcHR5Um93cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9pZiAoZW1wdHlSb3dzKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYWN0aW9ucy5hY3RDbG9zZUJvb2tzPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogZW1wdHlNc2cgfSk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYWN0aW9ucy5hY3RPcGVuQm9va3M/LnVwZGF0ZSh7IGVuYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiBlbXB0eU1zZyB9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICBsZXQgdnlicmFuZVN0YXZ5ID0gdGhpcy5maW5kT3puYWNlbmVTdGF2eShvem5hY2VuZVJhZGt5IGFzIGFueSk7XHJcbiAgICAgICAgICAgIC8vICAgIGlmICh0aGlzLlBlcm1pc3Npb25zLkVuYWJsZUNsb3NpbmcudmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmICh2eWJyYW5lU3RhdnkuT3RldnJlbmUpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdENsb3NlQm9va3M/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5QZXJtaXNzaW9ucy5FbmFibGVDbG9zaW5nKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Q2xvc2VCb29rcz8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDcyN1wiIH0pIC8vUkMgMzAyNTA3MjcgOiBWZSB2w71ixJtydSBuZW7DrSB2eWJyw6FuYSBvdGV2xZllbsOhIGtuaWhhXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAodnlicmFuZVN0YXZ5LlV6YXZyZW5lKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPcGVuQm9va3M/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5QZXJtaXNzaW9ucy5FbmFibGVDbG9zaW5nKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0T3BlbkJvb2tzPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogXCJqcmVzOjMwMjUwNzI4XCIgfSkgLy9SQyAzMDI1MDcyOCA6IFZlIHbDvWLEm3J1IG5lbsOtIHZ5YnLDoW5hIHV6YXbFmWVuw6Ega25paGFcclxuXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Q2xvc2VCb29rcz8udXBkYXRlUGVybWlzc2lvbih0aGlzLlBlcm1pc3Npb25zLkVuYWJsZUNsb3NpbmcpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE9wZW5Cb29rcz8udXBkYXRlUGVybWlzc2lvbih0aGlzLlBlcm1pc3Npb25zLkVuYWJsZUNsb3NpbmcpO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGdyaWR1XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IC8qfCBudWxswqgqLyB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuZ2dyaWQuanMtdWN0U2V6bmFtS25paEdyaWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgYXMgYW55IDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSB2aWV3IHBybyBsaXN0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTGlzdFZpZXcoKTogR29yZGljLklzbC5WaWV3IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Jc2wuVmlldyhcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlVjdEtuaWhhLmxpc3QoXHJcbiAgICAgICAgICAgICAgICApLnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAvL3JlcS5mcmFnbWVudHM9W1wicmRhY1wiLCBcImRva2xhZFwiLCBcImVrb2Nha3JcIiwgXCJkb2tsYWRfbmV1emF2cmVub1wiLCBcImRva2xhZF9uZXV6YXZyZW5vXCIsIFwiZG9rbGFkX3ZzZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChyZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuZ2V0RmlsdGVyRGF0YSh0aGF0LCByZXEsIG5leHQpIGFzIGFueTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbHRlclBhbmVsOiB0aGF0LiRmaWx0ZXJQYW5lbCxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCByZWxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKCkuYWx3YXlzKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICBkYXRhID12aWV3LmdldERhdGFSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pUHJpc3R1cG5vc3RpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkZm9ybWF0dVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbmVLbmloeUR0bz4ge1xyXG4gICAgICAgICAgICBsZXQgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRSb2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDc1NlwiLCAvL1JDIDMwMjUwNzU2IDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFa29zZGVuQmFzZUR0b0ZyYWdtZW50cy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDc0OFwiIC8vUkMgMzAyNTA3NDggOiBSb2sga25paHlcclxuICAgICAgICAgICAgICAgIH0pIC8vUkMgMzAyNTA3NTYgOiBSb2tcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwODYzXCIsIC8vUkMgMzAyNTA4NjMgOiBOw6F6ZXYga25paHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTcwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvRnJhZ21lbnRzLm5hemV2XHJcbiAgICAgICAgICAgICAgICAgICAgLy9maXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInprcmF0a2FcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA3NTdcIiwgLy9SQyAzMDI1MDc1NyA6IFprcmF0a2FcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMzkyXCIsIC8vUkMgMzAyNTAzOTIgOiBaa3JhdGthIGtuaWh5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvRnJhZ21lbnRzLnprcmF0a2FcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX2Rlbl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA3NThcIiwgLy9SQyAzMDI1MDc1OCA6IEthdGVnb3JpZVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA3NDlcIiwgLy9SQyAzMDI1MDc0OSA6IEthdGVnb3JpZSBrbmloeVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFa29LbmloYUR0b0ZyYWdtZW50cy5rdGdfZGVuX3R4dFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcInVpLWRpc2FibGVkXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTgyXCIsIC8vUkMgMzAyNTAxODIgOiBTdGF2IGtuaWh5XHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG9GcmFnbWVudHMuc3Rhdl90eHQvL1wiZWtvY2FrclwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF92c2VjaF9kb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA3NjBcIiwgLy9SQyAzMDI1MDc2MCA6IEV2aWRvdsOhbm8gZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNzU5XCIsIC8vUkMgMzAyNTA3NTkgOiBQb8SNZXQgZG9rbGFkxa8gYWt0dcOhbG7EmyBldmlkb3ZhbsO9Y2ggdiBrbml6ZVxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcImRva2xhZF92c2VcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9jZXRfdXphdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdW1hID0gcGFyc2VJbnQocm93LnBvY2V0X3ZzZWNoX2Rva2xhZHUpIC0gcGFyc2VJbnQocm93LnBvY2V0X25ldXphdnJlbnljaF9kb2tsYWR1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1bWEudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDc2MlwiLCAvL1JDIDMwMjUwNzYyIDogVXphdsWZZW5vIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDc2MVwiLCAvL1JDIDMwMjUwNzYxIDogUG/EjWV0IGRva2xhZMWvIGV2aWRvdmFuw71jaCBhIHV6YXbFmWVuw71jaFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcImRva2xhZFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF9uZXV6YXZyZW55Y2hfZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNzY0XCIsIC8vUkMgMzAyNTA3NjQgOiBOZXV6YXbFmWVubyBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA3NjNcIiwgLy9SQyAzMDI1MDc2MyA6IFBvxI1ldCBldmlkb3ZhbsO9Y2ggbmV1emF2xZllbsO9Y2ggZG9rbGFkxa8gYnLDoW7DrWPDrWNoIHV6YXbFmWVuw60ga25paHlcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJkb2tsYWRfbmV1emF2cmVub1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF9uZWV2aWRfZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNzUzXCIsIC8vUkMgMzAyNTA3NTMgOiBOZWV2aWRvdsOhbm8gZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNzY1XCIsIC8vUkMgMzAyNTA3NjUgOiBQb8SNZXQgZG9rbGFkxa8gcG9kYW7DvWNoIGRvIGtuaWh5IGEgbmV6YWV2aWRvdmFuw71jaCwga3RlcsOpIHJvdm7Em8W+IG1vaG91IGJyw6FuaXQgdXrDoXbEm3JjZVxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBHb3JkaWMuRWtvLkludGVyZmFjZS5HRWtvS25paGFEdG9GcmFnbWVudHMucG9jZXRfbmVldmlkX2Rva2xhZHUvLyBcImRva2xhZF9uZWV2aWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZEljbyh7IGZyYWdtZW50OiBcInNkZW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFBpZCh7IG5hbWU6IFwiaXhwX2RlblwiLCBmaWVsZDpcIml4cF9kZW5cIiwgZnJhZ21lbnQ6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFa29zZGVuQmFzZUR0b0ZyYWdtZW50cy5peHBfZGVuIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVWNzKHsgZnJhZ21lbnQ6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFa29zZGVuQmFzZUR0b0ZyYWdtZW50cy51Y3MgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRVdXMoeyBmcmFnbWVudDogR29yZGljLkVrby5JbnRlcmZhY2UuR0Vrb3NkZW5CYXNlRHRvRnJhZ21lbnRzLnV1cyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rfc3VicmFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBa3Rpdml0YSBzdWJyYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBHb3JkaWMuRWtvLkludGVyZmFjZS5HRWtvS25paGFEdG9GcmFnbWVudHMuYWt0X3N1YnJhZHkvLyBcImRva2xhZF9uZWV2aWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBjYXJkUGFuZWxJdGVtcyhkYXRhOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvW10pOiBhbnlbXSB7XHJcblxyXG4gICAgICAgIC8vICAgIHRoaXMubG9nLmRlYnVnKFwiU3RhcnQgY2FyZFBhbmVsSXRlbXMtR1VjdERva2xhZEtuaWh5XCIpO1xyXG5cclxuICAgICAgICAvLyAgICB2YXIgaXRlbXM6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIC8vICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHprcmF0a2E6IHJvdy56a3JhdGthLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgbmF6ZXY6IHJvdy5uYXpldixcclxuICAgICAgICAvLyAgICAgICAgICAgIGl4cF9kZW46IHJvdy5peHBfZGVuLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgc3Rhdl90eHQ6IHJvdy5zdGF2X3R4dCxcclxuICAgICAgICAvLyAgICAgICAgICAgIGFrdGl2aXRhOiByb3cuYWt0aXZpdGEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBwb2NldF92c2VjaF9kb2tsYWR1OiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHJvdy5wb2NldF92c2VjaF9kb2tsYWR1IGFzIG51bWJlciArIChyb3cucG9jZXRfdnNlY2hfZG9rbGFkdV9hcmNoaXY/cm93LnBvY2V0X3ZzZWNoX2Rva2xhZHVfYXJjaGl2IGFzIG51bWJlcjowKSwgXCIjICMjIzBcIiksXHJcbiAgICAgICAgLy8gICAgICAgICAgICBwb2NldF9uZXV6YXZyZW55Y2hfZG9rbGFkdTogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihyb3cucG9jZXRfbmV1emF2cmVueWNoX2Rva2xhZHUsIFwiIyAjIyMwXCIpLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgcG9jZXRfcHJpcHJhdmVueWNoX2Rva2xhZHU6IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIocm93LnBvY2V0X3ZzZWNoX2Rva2xhZHUgYXMgbnVtYmVyIC0gKHJvdy5wb2NldF9uZXV6YXZyZW55Y2hfZG9rbGFkdSBhcyBudW1iZXIpLCBcIiMgIyMjMFwiKSwgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgdmFyIHN0eWwgPSBcIlwiO1xyXG4gICAgICAgIC8vICAgICAgICBpZiAocm93LmFrdF9zdWJyYWR5ID09PSA0MDAgfHwgcm93LmFrdF9zdWJyYWR5ID09PSA1MDAgfHwgcm93LmFrdF9zdWJyYWR5ID09PSA5MDAgfHwgcm93LmFrdF9zdWJyYWR5ID09PSAwKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gdXphdnJlbm8gb2RsaXRvXHJcbiAgICAgICAgLy8gICAgICAgICAgICBzdHlsID0gXCJjb2xvcjpyZWRcIjtcclxuICAgICAgICAvLyAgICAgICAgZWxzZSBpZiAocm93LmFrdF9zdWJyYWR5ID09PSAzMDApXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBwcmlwcmF2ZW5vIGsgdXphdmVyY2VcclxuICAgICAgICAvLyAgICAgICAgICAgIHN0eWwgPSBcImNvbG9yOmJsdWVcIjtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIGl0ZW1bXCJzdHlsX3N0YXZrbmloeVwiXSA9IHN0eWw7XHJcbiAgICAgICAgLy8gICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICByZXR1cm4gaXRlbXM7XHJcblxyXG4gICAgICAgIC8vfVxyXG5cclxuXHJcblxyXG4gIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==