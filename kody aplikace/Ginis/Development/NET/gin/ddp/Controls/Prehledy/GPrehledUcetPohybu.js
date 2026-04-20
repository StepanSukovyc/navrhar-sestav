"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPrehledUcetPohybu.ts                  </Name>
//    <Description> Okno přehledu účetních pohybů                               </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-10-13                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GPrehledUcetPohybu = 
            //zavolat z jiného místa pomocí: that.navigate("Gordic.Ddp.WebClient.Controls.Prehledy.GPrehledUcetPohybu", { ID: "DDPGPrehledUcetPohybu#", Typ_phl: that.TypPhl }) nebo { IXP: that.IXP }
            class GPrehledUcetPohybu extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    this.celkem = 0;
                }
                //Program začíná zde, využívám pro vytvoření tabu s akcí TISK
                onDetailBuilderInit(builder) {
                    var that = this;
                    that.createActions();
                    builder.withComponent("pripad", {
                        tabs: {
                            gridMenuForm: {
                                tabParams: {
                                    id: "gridTab", opened: true,
                                    menuBar: [
                                        {
                                            action: that.actions["actTisk"],
                                            favorite: true
                                        }
                                    ]
                                },
                                init: function (tab) {
                                    that.grid = $.newDiv().appendTo(tab)
                                        .gautofit({ resizersOnTab: false })
                                        .ggrid({
                                        data: [],
                                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                        columnMode: "fit", // fit, full
                                        navigationMode: "row", // row, cell
                                        rowNumbers: false,
                                        columns: WebClient.Common.GridFormats.PrehledUcetPohybu()
                                    }).ggridrowscalc();
                                }
                            },
                        },
                    });
                }
                //Toto se načte drůhé a onContentReady následovně
                onDetailBuilderBuild() {
                    var that = this;
                    that.createForms();
                    that.loadOdJinud();
                }
                onContentReady() {
                    var that = this;
                    that.title = `Účetní pohyby`;
                    that.taskId = "actGPrehledUcetPohybu";
                    //inicializace saldových políček na spodku gridu
                    var statusWidget = $(".status-widget"); //najití počtového okýnka
                    //salda
                    $(statusWidget).before('<div class="status-widget" id="saldo">Celkem: </div>'); //nalepení salda k počtu
                    that.saldoStatusWidget = $("#saldo");
                    that.saldoStatusWidget.append('<b class="g-state-text g-state-active">0</b>');
                }
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actVyhledatData: {
                            name: "vyhledatData",
                            caption: "Vyhledat",
                            run: () => {
                                let form = that.findForms("mainForm");
                                var ixp = form.findFields("ixp").gfield("getValue");
                                var phl = form.findFields("typ_phl").gfield("getValue");
                                if (phl != null || ixp != null) {
                                    that.getFilterData();
                                    that.ziskejData(that.getFilters());
                                }
                                else {
                                    that.showFlash("Není vyplněn - Typ pohledávky/PID případu", "error");
                                }
                            },
                            customClass: "g-button--primary"
                        },
                        actReset: {
                            name: "reset",
                            caption: "Reset",
                            run: () => {
                                that.defaultForm.findFields().gfield("reset");
                                that.view = undefined;
                                that.saldoStatusWidget.find('b.g-state-text.g-state-active').text(0);
                                that.grid.ggrid("setData", [], true);
                            }
                        },
                        actTisk: {
                            name: "actTisk",
                            caption: "Tisk",
                            icon: "gi-print",
                            run: () => {
                                that.tiskDokladu();
                            }
                        }
                    });
                }
                // Načtení výchozí hodnoty na základě volání od jinud
                loadOdJinud() {
                    var that = this;
                    if (that.IXP != null) {
                        let form = that.findForms("mainForm");
                        form.findFields("ixp").gfield("option", "disabled", false); //zapnuto
                        form.findFields("phl").gfield("setValue", 1); //zapnuto
                        form.findFields("ixp").gfield("setInitial", that.IXP); //nastavení pole na aktuální ixp
                    }
                }
                createForms() {
                    var that = this;
                    let form = new Gordic.Forms.Form({ name: "mainForm", layoutDescriptor: "L1M1S1" })
                        .addSection("Parametry hledání")
                        .addRow("PID případu")
                        .addField("gstringbox", "w-12", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        disabled: false,
                    })
                        .addRow("Datum od/do")
                        .addField("gdatebox", "w-6", {
                        name: "dat_od",
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_do"
                    })
                        .addRow("Kategorie/Stav pohybu")
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo",
                        model: "model.ktg_upo=value.ktg_upo", //MODEL ŘÍKÁ JAKÁ DATA SE POŠLOU NA SERVER VE FILTRU, když nezadám model nic neprojde               
                        //model: "model.ktg_upo=value.ktg_upo;model.ktg_upo_txt=value.ktg_upo_txt",
                        itemTemplate: "{ktg_upo} - {ktg_upo_txt}"
                    })
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.stavPohybu(), {
                        name: "s_upo",
                        model: "model.s_upo=value.s_upo",
                    })
                        .addField("gbutton", {
                        params: {
                            id: "actVyhledat_button",
                            action: that.actions.actVyhledatData
                        }
                    });
                    that.defaultForm = $.newDiv()
                        .appendTo(that.element)
                        .gform("createFrom", form);
                    //CSS vyhledávajícího tlačítka a vytvoření tlačítka na RESET
                    $("[data-param-id='actVyhledat_button']").css("margin-top", "5px");
                    $("[data-param-id='actVyhledat_button']").after($("<button>").css("margin-left", "5px").gbutton({ params: { action: that.actions["actReset"] } })); //Reset button
                    return form;
                }
                ziskejData(filter) {
                    var that = this;
                    that.celkem = 0;
                    that.beginOperation();
                    that.isl.DdpPrehledUcetPohybu.list(() => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        that.view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", that.view);
                        that.getCelkovouCastku(dto.data);
                        that.endOperation();
                    });
                }
                getFilters() {
                    var that = this;
                    let filter = {};
                    that.defaultForm.findFields("dat_do", "dat_od", "typ_phl", "ixp", "ktg_upo", "s_upo").gfield("model", "collect", filter);
                    return filter;
                }
                //načtení dat z políček pro využití při vytváření Tisk
                getFilterData() {
                    var that = this;
                    let form = that.findForms("mainForm");
                    that.dat_od = form.findFields("dat_od").gfield("getValue");
                    that.dat_do = form.findFields("dat_do").gfield("getValue");
                    that.typ_phl = form.findFields("typ_phl").gfield("getValue");
                    if (that.typ_phl != null)
                        that.typ_phl = that.typ_phl["typ_phl"];
                    that.ixp = form.findFields("ixp").gfield("getValue");
                    that.ktg_upo = form.findFields("ktg_upo").gfield("getValue");
                    if (that.ktg_upo != null)
                        that.ktg_upo = that.ktg_upo["ktg_upo"];
                }
                formatNumberWithSpacesAndDecimals(number) {
                    const formattedNumber = new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(number);
                    return formattedNumber.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',');
                }
                //vypočet celkové částky dat v gridu
                getCelkovouCastku(data) {
                    var that = this;
                    data.forEach(function (value) {
                        that.celkem = that.celkem + parseFloat(value.c_upo);
                    });
                    var saldo = that.formatNumberWithSpacesAndDecimals(that.celkem);
                    var itemCount = Object.keys(data).length;
                    if (itemCount > 0) {
                        that.saldoStatusWidget.find('b.g-state-text.g-state-active').text(saldo);
                    }
                    else {
                        that.saldoStatusWidget.find('b.g-state-text.g-state-active').text(0);
                    }
                }
                tiskDokladu() {
                    var that = this;
                    if (that.view != null) {
                        if (that.dat_do != null && that.dat_od != null) {
                            const actTiskUcetPohybu = GAction.createPrintAction({
                                name: "actTiskUcetPohybu",
                                tema: "ddp_ptm_tskupo",
                                // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                                serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:UcetniPohyby", //zde se plní téma
                                reportStarting: function (rep) {
                                    rep.customDto = {
                                        ixp: that.ixp,
                                        datumOd: that.dat_od,
                                        datumDo: that.dat_do,
                                        ktg_upo: that.ktg_upo,
                                        typ_phl: that.typ_phl
                                    };
                                },
                            });
                            actTiskUcetPohybu.run();
                        }
                        else {
                            that.showFlash("Není vyplněn rozsah období - tisk není možný", "error");
                        }
                    }
                    else {
                        that.showFlash("Nejsou načtena žádná data", "error");
                    }
                }
            };
            GPrehledUcetPohybu = __decorate([
                Decorators.gcontent
                //zavolat z jiného místa pomocí: that.navigate("Gordic.Ddp.WebClient.Controls.Prehledy.GPrehledUcetPohybu", { ID: "DDPGPrehledUcetPohybu#", Typ_phl: that.TypPhl }) nebo { IXP: that.IXP }
            ], GPrehledUcetPohybu);
            WebClient.GPrehledUcetPohybu = GPrehledUcetPohybu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZWhsZWRVY2V0UG9oeWJ1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ByZWhsZWRVY2V0UG9oeWJ1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBbVJmO0FBblJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1SbkI7SUFuUmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW1SN0I7UUFuUm9CLFdBQUEsU0FBUztZQUsxQixJQUFhLGtCQUFrQjtZQUYvQiwwTEFBMEw7WUFFMUwsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLHFCQUFxQjtnQkFBN0Q7O29CQVVXLFdBQU0sR0FBRyxDQUFDLENBQUM7Z0JBbVF0QixDQUFDO2dCQXhQRyw2REFBNkQ7Z0JBQzdELG1CQUFtQixDQUFDLE9BQWdEO29CQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFFckIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7d0JBQzVCLElBQUksRUFBRTs0QkFDRixZQUFZLEVBQUU7Z0NBQ1YsU0FBUyxFQUFFO29DQUNQLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUk7b0NBQzNCLE9BQU8sRUFBRTt3Q0FDTDs0Q0FDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7NENBQy9CLFFBQVEsRUFBRSxJQUFJO3lDQUNqQjtxQ0FDSjtpQ0FDSjtnQ0FDRCxJQUFJLEVBQUUsVUFBVSxHQUFHO29DQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7eUNBQy9CLFFBQVEsQ0FBQyxF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QUMsQ0FBQztvQkFDekQsQ0FBQztnQkFDTCxDQUFDO2FBQ0osQ0FBQTtZQTdRWSxrQkFBa0I7Z0JBSDlCLFVBQVUsQ0FBQyxRQUFRO2dCQUNwQiwwTEFBMEw7ZUFFN0ssa0JBQWtCLENBNlE5QjtZQTdRWSw0QkFBa0IscUJBNlE5QixDQUFBO1FBQ0wsQ0FBQyxFQW5Sb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBbVI3QjtJQUFELENBQUMsRUFuUmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW1SbkI7QUFBRCxDQUFDLEVBblJTLE1BQU0sS0FBTixNQUFNLFFBbVJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmVobGVkVWNldFBvaHlidS50cyAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHDFmWVobGVkdSDDusSNZXRuw61jaCBwb2h5YsWvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjMtMTAtMTMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIC8vemF2b2xhdCB6IGppbsOpaG8gbcOtc3RhIHBvbW9jw606IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QcmVobGVkeS5HUHJlaGxlZFVjZXRQb2h5YnVcIiwgeyBJRDogXCJERFBHUHJlaGxlZFVjZXRQb2h5YnUjXCIsIFR5cF9waGw6IHRoYXQuVHlwUGhsIH0pIG5lYm8geyBJWFA6IHRoYXQuSVhQIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR1ByZWhsZWRVY2V0UG9oeWJ1IGV4dGVuZHMgR0RldGFpbEJ1aWxkZXJDb250ZW50IHsgLy9HQ29udGVudEJhc2VcclxuXHJcbiAgICAgICAgLyoqIFRleHQgdnLDoWNlbsO9IHBvIGluaXR1IEtuaWh5IGEgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICBJbml0RXJyb3JUZXh0OiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgbm90RGVmYXVsdEZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHVibGljIHZpZXc6IGFueTtcclxuICAgICAgICBJWFA6IHN0cmluZzsgICAgLy9JWFAgesOtc2thbsO9IHDFmWkgdm9sw6Fuw60gb2QgamludWRcclxuXHJcbiAgICAgICAgcHVibGljIGNlbGtlbSA9IDA7XHJcblxyXG4gICAgICAgIC8vcHJvbcSbbm7DqSB2eXXFvml0w6kgcHJvIFRJU0tcclxuICAgICAgICBwcml2YXRlIGRhdF9vZDogYW55O1xyXG4gICAgICAgIHByaXZhdGUgZGF0X2RvOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSB0eXBfcGhsOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBpeHA6IGFueTtcclxuICAgICAgICBwcml2YXRlIGt0Z191cG86IGFueTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYWxkb1N0YXR1c1dpZGdldDogYW55O1xyXG5cclxuICAgICAgICAvL1Byb2dyYW0gemHEjcOtbsOhIHpkZSwgdnl1xb7DrXbDoW0gcHJvIHZ5dHZvxZllbsOtIHRhYnUgcyBha2PDrSBUSVNLXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudChcInByaXBhZFwiLCB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZE1lbnVGb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZ3JpZFRhYlwiLCBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdFRpc2tcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KSAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAgICAgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUHJlaGxlZFVjZXRQb2h5YnUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdncmlkcm93c2NhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9Ub3RvIHNlIG5hxI10ZSBkcsWvaMOpIGEgb25Db250ZW50UmVhZHkgbsOhc2xlZG92bsSbXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVyQnVpbGQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtcygpO1xyXG4gICAgICAgICAgICB0aGF0LmxvYWRPZEppbnVkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYMOaxI1ldG7DrSBwb2h5YnlgO1xyXG4gICAgICAgICAgICB0aGF0LnRhc2tJZCA9IFwiYWN0R1ByZWhsZWRVY2V0UG9oeWJ1XCI7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaW5pY2lhbGl6YWNlIHNhbGRvdsO9Y2ggcG9sw63EjWVrIG5hIHNwb2RrdSBncmlkdVxyXG4gICAgICAgICAgICB2YXIgc3RhdHVzV2lkZ2V0ID0gJChcIi5zdGF0dXMtd2lkZ2V0XCIpOyAvL25haml0w60gcG/EjXRvdsOpaG8gb2vDvW5rYVxyXG4gICAgICAgICAgICAvL3NhbGRhXHJcbiAgICAgICAgICAgICQoc3RhdHVzV2lkZ2V0KS5iZWZvcmUoJzxkaXYgY2xhc3M9XCJzdGF0dXMtd2lkZ2V0XCIgaWQ9XCJzYWxkb1wiPkNlbGtlbTogPC9kaXY+Jyk7IC8vbmFsZXBlbsOtIHNhbGRhIGsgcG/EjXR1XHJcbiAgICAgICAgICAgIHRoYXQuc2FsZG9TdGF0dXNXaWRnZXQgPSAkKFwiI3NhbGRvXCIpXHJcbiAgICAgICAgICAgIHRoYXQuc2FsZG9TdGF0dXNXaWRnZXQuYXBwZW5kKCc8YiBjbGFzcz1cImctc3RhdGUtdGV4dCBnLXN0YXRlLWFjdGl2ZVwiPjA8L2I+JylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFZ5aGxlZGF0RGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnlobGVkYXREYXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeWhsZWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwibWFpbkZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHAgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHBcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwaGwgPSBmb3JtLmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGhsICE9IG51bGwgfHwgaXhwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2V0RmlsdGVyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoYXQuZ2V0RmlsdGVycygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVuw60gdnlwbG7Em24gLSBUeXAgcG9obGVkw6F2a3kvUElEIHDFmcOtcGFkdVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UmVzZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJlc2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSZXNldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zYWxkb1N0YXR1c1dpZGdldC5maW5kKCdiLmctc3RhdGUtdGV4dC5nLXN0YXRlLWFjdGl2ZScpLnRleHQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgW10sIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlza0Rva2xhZHUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTmHEjXRlbsOtIHbDvWNob3rDrSBob2Rub3R5IG5hIHrDoWtsYWTEmyB2b2zDoW7DrSBvZCBqaW51ZFxyXG4gICAgICAgIHByaXZhdGUgbG9hZE9kSmludWQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICBpZiAodGhhdC5JWFAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcIm1haW5Gb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTsgLy96YXBudXRvXHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJwaGxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMSk7IC8vemFwbnV0b1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgdGhhdC5JWFApOyAvL25hc3RhdmVuw60gcG9sZSBuYSBha3R1w6FsbsOtIGl4cFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm1zKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJtYWluRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlBhcmFtZXRyeSBobGVkw6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQSUQgcMWZw61wYWR1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gb2QvZG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkthdGVnb3JpZS9TdGF2IHBvaHlidVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNlwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvXCIsICAgICAvL01PREVMIMWYw41Lw4EgSkFLw4EgREFUQSBTRSBQT8WgTE9VIE5BIFNFUlZFUiBWRSBGSUxUUlUsIGtkecW+IG5lemFkw6FtIG1vZGVsIG5pYyBuZXByb2pkZSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvO21vZGVsLmt0Z191cG9fdHh0PXZhbHVlLmt0Z191cG9fdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntrdGdfdXBvfSAtIHtrdGdfdXBvX3R4dH1cIlxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zdGF2UG9oeWJ1KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc191cG89dmFsdWUuc191cG9cIixcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFjdFZ5aGxlZGF0X2J1dHRvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RWeWhsZWRhdERhdGFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgLy9DU1MgdnlobGVkw6F2YWrDrWPDrWhvIHRsYcSNw610a2EgYSB2eXR2b8WZZW7DrSB0bGHEjcOtdGthIG5hIFJFU0VUXHJcbiAgICAgICAgICAgICQoXCJbZGF0YS1wYXJhbS1pZD0nYWN0VnlobGVkYXRfYnV0dG9uJ11cIikuY3NzKFwibWFyZ2luLXRvcFwiLCBcIjVweFwiKTsgIFxyXG4gICAgICAgICAgICAkKFwiW2RhdGEtcGFyYW0taWQ9J2FjdFZ5aGxlZGF0X2J1dHRvbiddXCIpLmFmdGVyKCQoXCI8YnV0dG9uPlwiKS5jc3MoXCJtYXJnaW4tbGVmdFwiLCBcIjVweFwiKS5nYnV0dG9uKHsgcGFyYW1zOiB7IGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0UmVzZXRcIl0gfSB9KSk7IC8vUmVzZXQgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YShmaWx0ZXI6IGFueSk6IHZvaWQgeyAgIC8vesOtc2vDoW7DrSBkYXQgemUgc2VydmVydSBhIG5hcGxuxJtuw60gZ3JpZHUgYSBjZWxrb3ZlIGNhc3RreVxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuY2Vsa2VtID0gMDsgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLkRkcFByZWhsZWRVY2V0UG9oeWJ1Lmxpc3RcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdldENlbGtvdm91Q2FzdGt1KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpOyAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXJzKCkgeyAvL2Rvc3TDoW7DrSBmaWx0csWvIGplbGlrb8W+IGZvcm0gbmVuw60gdnl0dm/FmWVuIHDFmWV6IGZpbHRlcnBhbmVsICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiZGF0X2RvXCIsIFwiZGF0X29kXCIsIFwidHlwX3BobFwiLCBcIml4cFwiLCBcImt0Z191cG9cIiwgXCJzX3Vwb1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZmlsdGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmHEjXRlbsOtIGRhdCB6IHBvbMOtxI1layBwcm8gdnl1xb5pdMOtIHDFmWkgdnl0dsOhxZllbsOtIFRpc2tcclxuICAgICAgICBwcml2YXRlIGdldEZpbHRlckRhdGEoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcIm1haW5Gb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kYXRfb2QgPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfb2RcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHRoYXQuZGF0X2RvID0gZm9ybS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnR5cF9waGwgPSBmb3JtLmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC50eXBfcGhsICE9IG51bGwpIHRoYXQudHlwX3BobCA9IHRoYXQudHlwX3BobFtcInR5cF9waGxcIl07XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuaXhwID0gZm9ybS5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB0aGF0Lmt0Z191cG8gPSBmb3JtLmZpbmRGaWVsZHMoXCJrdGdfdXBvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5rdGdfdXBvICE9IG51bGwpIHRoYXQua3RnX3VwbyA9IHRoYXQua3RnX3Vwb1tcImt0Z191cG9cIl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyhudW1iZXI6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZE51bWJlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgIH0pLmZvcm1hdChudW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlci5yZXBsYWNlKC8sL2csICcnKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnICcpLnJlcGxhY2UoJy4nLCAnLCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy92eXBvxI1ldCBjZWxrb3bDqSDEjcOhc3RreSBkYXQgdiBncmlkdVxyXG4gICAgICAgIHByaXZhdGUgZ2V0Q2Vsa292b3VDYXN0a3UoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNlbGtlbSA9IHRoYXQuY2Vsa2VtICsgcGFyc2VGbG9hdCh2YWx1ZS5jX3Vwbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgc2FsZG8gPSB0aGF0LmZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyh0aGF0LmNlbGtlbSk7XHJcbiAgICAgICAgICAgIHZhciBpdGVtQ291bnQgPSBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChpdGVtQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0LmZpbmQoJ2IuZy1zdGF0ZS10ZXh0Lmctc3RhdGUtYWN0aXZlJykudGV4dChzYWxkbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhhdC5zYWxkb1N0YXR1c1dpZGdldC5maW5kKCdiLmctc3RhdGUtdGV4dC5nLXN0YXRlLWFjdGl2ZScpLnRleHQoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGlza0Rva2xhZHUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoYXQudmlldyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5kYXRfZG8gIT0gbnVsbCAmJiB0aGF0LmRhdF9vZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0VGlza1VjZXRQb2h5YnUgPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrVWNldFBvaHlidVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImRkcF9wdG1fdHNrdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOKGkyBNZXRvZGEsIGt0ZXLDoSBqZSB6YXZvbMOhbmEgdMSbc27EmyBwxZllZCBnZW5lcm92w6Fuw61tIHNlc3RhdnkgYSBrZGUgbHplIG5hIHN0cmFuxJsgc2VydmVydSBvdmxpdm5pdCBwYXJhbWV0cnkgc2VzdGF2eSDihpNcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZHBXZWJUaXNrOlVjZXRuaVBvaHlieVwiLCAgLy96ZGUgc2UgcGxuw60gdMOpbWFcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7ICAgLy9wb3PDrWzDoW7DrSBkYXQgbmEgc2VydmVyUGFyYW1ldGVyTWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXR1bU9kOiB0aGF0LmRhdF9vZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXR1bURvOiB0aGF0LmRhdF9kbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiB0aGF0Lmt0Z191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhhdC50eXBfcGhsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VGlza1VjZXRQb2h5YnUucnVuKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVuw60gdnlwbG7Em24gcm96c2FoIG9iZG9iw60gLSB0aXNrIG5lbsOtIG1vxb5uw71cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVqc291IG5hxI10ZW5hIMW+w6FkbsOhIGRhdGFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==