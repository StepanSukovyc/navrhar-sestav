"use strict";
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            /**
             * Zobrazeni okna s detailem dokladu dle zadaneho pidu
             * @param {GContent} content - kontent ktery otevira prislusne okna s detailem
             * @param {string} ixp - pid dokladu
             * @param {Date} datumZmeny - datum posledni zmeny dokladu
             * @param {boolean} samostaneOkno - priznak zda okna otevrit samostante nebo v kontentu
             * @param {boolean} editace
             * @param {JQuery<HTMLElement>} grid - objekt gridu seznamu dokladu
             * @param {string} ixpDen - identifikator knihy
             */
            function ZobrazDetailDleIXP(content, ixp, datumZmeny, samostaneOkno = false, editace = false, grid = undefined, ixpDen) {
                debugger;
                // Pokud neni vyplneny identifikator dokladu, zobra mu pouze varovnou hlasku
                if (ixp == null) {
                    content.dialogs.messageBox("jres:30250067", //RC 30250067 : Upozornění
                    "jres:30250068" //RC 30250068 : Není poslán žádný identifikátor!
                    );
                    return; // Ukonci zpraCOVANI
                }
                // Tohle asi nebudu pouzivat, muzu to pozdeji vyhodit
                if (!editace)
                    editace = false;
                // Detaily a parametry oteviraneho okna (tridy)
                let nazevOkna = "Gordic.Roz.WebClient.GDetailDokladuTab";
                let options = {
                    ixp: ixp,
                    datumZmeny: datumZmeny,
                    inEdit: editace,
                    Id: "rozDetailDokladu",
                    action: 1 /* Gordic.Uct.Interface.GEAkceFormulare.Init */, // Prvotni nacteni detailu
                };
                // Otevreni dle pozadavku bud do okna nebo do contentu
                if (samostaneOkno) { // Toto je do okna, nepouziva se
                    content.dialogs.showWindow(nazevOkna, options, "", 800, 600, true)
                        .on("close", function (res) {
                        if (res.returnValue && res.returnValue === true) {
                            // znovunačtení seznamu (podle aktuálních filtrů)
                            //Gordic.Roz.WebClient.RefreshSeznamu(null);
                        }
                    });
                }
                else {
                    // objekt pro posun po detailech dle seznamu
                    var control;
                    if (typeof grid === "undefined")
                        control = undefined;
                    else
                        control = new Gordic.Components.GridRC(grid);
                    // Urceni GPC
                    let newGpc;
                    if (typeof ixpDen !== "undefined")
                        newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, ixpDen);
                    else
                        newGpc = undefined;
                    // Vlastni otevreni okna
                    content.navigate([nazevOkna, { gpc: newGpc, gridRemoteControl: control }], options)
                        .on("close", function (res) {
                        if (res.returnValue && res.returnValue.refresh === true) {
                            // nacteni aktualizovaneho dokladu
                            //Gordic.Roz.WebClient.ReloadRowFromDB(content, res.returnValue.ixp, true);
                            // nastaveni aktivniho radku
                            // Gordic.Uct.WebClient.Seznam.RefreshSeznamu(null);
                        }
                    });
                }
            }
            WebClient.ZobrazDetailDleIXP = ZobrazDetailDleIXP;
            /**
             * Rucni zadani pidu (zobrazeni WFL okna)
             * @param content
             * @param parametr
             * @returns
             */
            function ZobrazVyberPidu(content /*, parametr: Gordic.Uct.WebClient.GPodaniDto*/) {
                var def = $.Deferred();
                var l_bVlastni = false;
                var l_bValidatePid = true;
                Gordic.Wfl.Dialogs.GenerovaniIxpDlg(content, {
                    TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                    TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                    DotazPriExistenciVJineAgende: false,
                    HlaseniPriExistenciVAgende: false
                }, Gordic.Gin.Globals.Enums.ModOtevreni.showWindow).on("close", function (ev, retValue) {
                    if (retValue == "undefined" || retValue == null || retValue.values == "undefined")
                        def.reject();
                    else {
                        var parametr = { PidDokladu: retValue.Ixp, DokladJizExistuje: retValue.IxpExist };
                        //parametr.PidDokladu = retValue.Ixp;
                        def.resolve(parametr);
                    }
                });
                return def.promise();
            }
            WebClient.ZobrazVyberPidu = ZobrazVyberPidu;
            /// <summary>   Oznacit doklady prectene(true)/neprectene(false) </summary>
            /// <remarks>   Tvagenknecht, 3.3.2017. </remarks>
            /// <param name="prectene">true - oznacit za prestene </param>
            /// <param name="oznaceneRadky">vybrane radky</param>
            /// <returns>   . </returns>
            function OznacitDoklady(content, prectene, oznaceneRadky) {
                var that = content;
                let def = $.Deferred();
                debugger;
                that.beginOperation("jres:30250081"); //RC 30250081 :  Probíhá označování dokladů
                let rq = {
                    Oznacit: (prectene ? 0 /* Gordic.Uct.Interface.GETypOznaceniDokladu.Precteno */ : 10 /* Gordic.Uct.Interface.GETypOznaceniDokladu.Neprecteno */),
                    Seznam: oznaceneRadky
                };
                Gordic.Isl.RozDoklad.hromadneOznacit(rq)
                    .getData()
                    .done(function (returnData) {
                    returnData.forEach(function (radek, indek) {
                        Gordic.Roz.WebClient.ReplaceRow(content, radek, true);
                    });
                    if (prectene)
                        content.showFlash({ id: "idflashOznaceniRadkuPrectenne", icon: "gi-tick", label: "jres:30250079", customClass: "g-state-success", timer: 5000 }); //RC 30250079 : Vybrané řádky byly označeny za přečtené
                    else
                        content.showFlash({ id: "idflashOznaceniRadkuNeprectene", icon: "gi-tick", label: "jres:30250080", customClass: "g-state-success", timer: 5000 }); //RC 30250080 : Vybrané řádky byly označeny za nepřečtené
                    def.resolve();
                })
                    .always(function () {
                    that.endOperation();
                });
                return def.promise();
            }
            WebClient.OznacitDoklady = OznacitDoklady;
            ;
            ;
            ;
            ;
            /**
             * Preevidovat formular
             * @param content
             */
            function HromadnaOperaceform(action, content, ixp_den) {
                const rok = content.globals.EkoParams?.Rok;
                //let ixsFunAkt = ($.content("main") as any).IxsFunAkt;
                let FiltryKompetent = {
                    aktivita: 100, // aktivní kompetenti
                    priz_kom: 10, // musí být příznak kompetenta 
                    ico: (content.globals.DatabaseParams.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || content.globals.DatabaseParams.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? content.globals.EkoParams?.Ico : null),
                    uus: (content.globals.DatabaseParams.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? content.globals.EkoParams?.Uus : null),
                    ucs: (content.globals.DatabaseParams.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? content.globals.EkoParams?.Ucs : null),
                    cis_real: (content.globals.DatabaseParams.RezimProvozu == 3 /* Gordic.Uct.Interface.RezimProvozuEnum.realizator */ ? content.globals.EkoParams?.Uus : null)
                };
                switch (action) {
                    case 1 /* Gordic.Uct.Interface.GEUctHromadneOperace.Preevidence */:
                        return Gordic.Eko.Prefabs.PreevidenceDokladuForm({
                            KompetentViditelnost: true,
                            KompetentZmena: content.globals.DatabaseParams.PovoleniZmenitKompetenta,
                            StartFiltrKompetent: FiltryKompetent,
                            ZpracovatelAktualni: $.content("main").IxsFunAkt,
                            StartFiltrKniha: {
                                typ_ag: 50,
                                //ktg_den: ktgDen,
                                ico: content.globals.EkoParams?.Ico,
                                ucs: content.globals.EkoParams?.Ucs,
                                rok: rok,
                                aktivita: 100,
                                ixp_den: "!= " + ixp_den
                            },
                            StartFiltrZpracovatel: {
                                //DlePovolenychFazi: ["GSAUCT01", "GWAUCT05"],
                                VrfuTypAg: "roz",
                                VrfuAktivita: 100,
                                ReferentAktivita: 100,
                                VrfuSubrada: content.globals.EkoParams?.Subrada
                                //ixs_su: ixsSu
                            }
                        });
                    case 7 /* Gordic.Uct.Interface.GEUctHromadneOperace.Predani */:
                        return Gordic.Eko.Prefabs.PredaniDokladuForm({
                            KompetentViditelnost: true,
                            KompetentZmena: content.globals.DatabaseParams.PovoleniZmenitKompetenta,
                            StartFiltrKompetent: FiltryKompetent,
                            //SouvisejiciViditelnost: true,
                            //SouvisejiciZmena:true ,
                            StartFiltrZpracovatel: {
                                //DlePovolenychFazi: ["GSAUCT01", "GWAUCT05"],
                                DlePovolenychAgend: [50],
                                VrfuTypAg: "roz",
                                VrfuAktivita: 100,
                                ReferentAktivita: 100,
                                VrfuIxpDen: ixp_den,
                                //ixs_su: ixsSu,
                                ico: (content.globals.DatabaseParams.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || content.globals.DatabaseParams.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? content.globals.EkoParams?.Ico : null),
                                VrfuSubrada: content.globals.EkoParams?.Subrada,
                                //ixs_fun: "!= " + content.UcetniDokladDto.HlavickaDokladu?.ixs_fun_akt
                            }
                        });
                    case 6 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prideleni */:
                        return Gordic.Eko.Prefabs.PrideleniDokladuForm({
                            KompetentViditelnost: false,
                            KompetentZmena: false,
                            StartFiltrZpracovatel: {
                                //DlePovolenychFazi: ["GSAUCT01", "GWAUCT05"],
                                VrfuTypAg: "roz",
                                DlePovolenychAgend: true,
                                VrfuAktivita: 100,
                                ReferentAktivita: 100,
                                VrfuIxpDen: ixp_den,
                                //ixs_su: ixsSu,
                                ico: (content.globals.DatabaseParams.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || content.globals.DatabaseParams.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? content.globals.EkoParams?.Ico : null),
                                VrfuSubrada: content.globals.EkoParams?.Subrada,
                                //ixs_fun: "!= " + ixsFunAkt
                                //ixs_fun: "!= " + that.UcetniDokladDto.HlavickaDokladu?.ixs_fun_akt
                            }
                        });
                    case 0 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prevzeti */:
                        return Gordic.Eko.Prefabs.PrevzetiDokladuForm({
                            AktualniPrihlasenyZpracovatel: $.content("main").IxsFunAkt,
                            KompetentZmena: content.globals.DatabaseParams.PovoleniZmenitKompetenta,
                            KompetentViditelnost: true,
                            StartFiltrKompetent: FiltryKompetent,
                        });
                    default:
                        return Gordic.Eko.Prefabs.PrevzetiDokladuForm({
                            AktualniPrihlasenyZpracovatel: $.content("main").IxsFunAkt,
                            KompetentZmena: content.globals.DatabaseParams.PovoleniZmenitKompetenta,
                            KompetentViditelnost: true,
                            StartFiltrKompetent: FiltryKompetent,
                        });
                    //return undefined;
                }
                throw new Error("Chybna akce");
            }
            WebClient.HromadnaOperaceform = HromadnaOperaceform;
            /***
            * Nacteni parametru zadanych uzivatelem
            * */
            function HromadnaOperaceGetParam(/*action: Gordic.Uct.Interface.GEUctHromadneOperace,*/ dialogs, wiz, vybraneDoklady) {
                var that = wiz;
                //var def = $.Deferred();
                let form = that.findForms("wizParams");
                const ixp_den = form.findFields("ixp_den").gfield("getValue")?.ixp_den;
                //if(ixp_den)
                //        ixp_den = ixp_den.ixp_den;
                const { ixs_fun: ixs_fun_akt, ixs_ref } = form.findFields("ixs_fun_akt").gfield("getValue") ?? {};
                //let ixs_ref: string | null = null;
                //if(ixs_fun_akt) {
                //    ixs_fun_akt = ixs_fun_akt.ixs_fun;
                //    ixs_ref = ixs_fun_akt.ixs_ref;
                //}
                let duvod = form.findFields("duvod").gfield("getValue");
                //that.dialogData = that.myForm.getFormData();          // posbíraná data z dialogu
                if (typeof ixp_den === "undefined" || ixp_den === null || ixs_fun_akt === null) {
                    return dialogs.warning("jres:30250287") //RC 30250287 : Není vyplněn cíl předání
                        .createDialogPromise(false);
                    //.on("close", () => def.reject(false));
                    //return def.promise();
                }
                //var vybraneDoklady = Gordic.Eko.Grid.checkedRows<Gordic.Uct.Interface.GRozVybranyDokladDto>(that.$grid, true);
                if (typeof vybraneDoklady === "undefined" || vybraneDoklady == null || vybraneDoklady.length === 0) {
                    return dialogs.alert("jres:30250352") //RC 30250352 : Nebyly vybrány žádné doklady
                        .createDialogPromise(false);
                    //return def.reject().promise();
                }
                let result = {
                    Seznam: vybraneDoklady,
                    IxpDenNew: ixp_den,
                    IxsFunNew: ixs_fun_akt,
                    IxsRefNew: ixs_ref,
                    Duvod: duvod,
                    //CisReal
                };
                return $.when(result);
                //return result;
            }
            WebClient.HromadnaOperaceGetParam = HromadnaOperaceGetParam;
            /**
              * Otevření detailu v primární agendě (v jiné záložce)
              *
              * @param {number | undefined | null} typAg primární agenda
              * @param {string | undefined | null} id1 id detailu v primární agendě (PID a pod.)
              * @param {string | undefined | null} [id2] doplňující id detailu v primární agendě (PID a pod.)
              * @param {string | undefined | null} [id3] další doplňující id detailu v primární agendě (PID a pod.)
             */
            function openDetailInOtherTab(typAg, id1, id2, id3) {
                // TODO: doplnit test na vyjmenované agendy?
                if (typAg != null && id1 != null) {
                    // otevření nové záložky
                    return Gordic.WebApp.Utility.openApp(
                    // parametry
                    {
                        // identifikace
                        ixx1: id1,
                        ixx2: id2,
                        ixx3: id3,
                        // požadovaná agenda (a případně fáze)
                        typAg: typAg,
                        faze: null,
                        // povoleno použít aktuální fázi
                        banCurrentApp: false,
                        // výjimka při nenalezení žádné cílové fáze
                        noAppFail: false
                    }, 
                    // požadovaná metoda
                    "OpenDetail");
                }
                else
                    return $.Deferred().reject().promise();
            }
            WebClient.openDetailInOtherTab = openDetailInOtherTab;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0NvbW1ub25NZXRob2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHQ29tbW5vbk1ldGhvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBVSxNQUFNLENBK1dmO0FBL1dELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQStXbkI7SUEvV2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQStXN0I7UUEvV29CLFdBQUEsU0FBUztZQUUxQjs7Ozs7Ozs7O2VBU0c7WUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxPQUFpQixFQUFFLEdBQVcsRUFBRSxVQUFxQixFQUFFLGdCQUF5QixLQUFLLEVBQUUsVUFBbUIsS0FBSyxFQUFFLE9BQXdDLFNBQVMsRUFBRSxNQUFvQjtnQkFDdk4sUUFBUSxDQUFDO2dCQUVULDRFQUE0RTtnQkFDNUUsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQ3RCLGVBQWUsRUFBRSwwQkFBMEI7b0JBQzNDLGVBQWUsQ0FBQyxnREFBZ0Q7cUJBQ25FLENBQUM7b0JBQ0YsT0FBTyxDQUFDLG9CQUFvQjtnQkFDaEMsQ0FBQztnQkFFRCxxREFBcUQ7Z0JBQ3JELElBQUksQ0FBQyxPQUFPO29CQUFFLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBRTlCLCtDQUErQztnQkFDL0MsSUFBSSxTQUFTLEdBQUcsd0NBQXdDLENBQUM7Z0JBQ3pELElBQUksT0FBTyxHQUNYO29CQUNJLEdBQUcsRUFBRSxHQUFHO29CQUNSLFVBQVUsRUFBRSxVQUFVO29CQUN0QixNQUFNLEVBQUUsT0FBTztvQkFDZixFQUFFLEVBQUUsa0JBQWtCO29CQUN0QixNQUFNLG1EQUEyQyxFQUFFLDBCQUEwQjtpQkFDaEYsQ0FBQztnQkFFRixzREFBc0Q7Z0JBQ3RELElBQUksYUFBYSxFQUFFLENBQUMsQ0FBQyxnQ0FBZ0M7b0JBQ2pELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNB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QUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEQsQ0FBQztZQTFCZSw4QkFBb0IsdUJBMEJuQyxDQUFBO1FBR0wsQ0FBQyxFQS9Xb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBK1c3QjtJQUFELENBQUMsRUEvV2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQStXbkI7QUFBRCxDQUFDLEVBL1dTLE1BQU0sS0FBTixNQUFNLFFBK1dmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuUm96LldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBab2JyYXplbmkgb2tuYSBzIGRldGFpbGVtIGRva2xhZHUgZGxlIHphZGFuZWhvIHBpZHVcclxuICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnQgLSBrb250ZW50IGt0ZXJ5IG90ZXZpcmEgcHJpc2x1c25lIG9rbmEgcyBkZXRhaWxlbVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGl4cCAtIHBpZCBkb2tsYWR1XHJcbiAgICAgKiBAcGFyYW0ge0RhdGV9IGRhdHVtWm1lbnkgLSBkYXR1bSBwb3NsZWRuaSB6bWVueSBkb2tsYWR1XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNhbW9zdGFuZU9rbm8gLSBwcml6bmFrIHpkYSBva25hIG90ZXZyaXQgc2Ftb3N0YW50ZSBuZWJvIHYga29udGVudHUgICAgIFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBlZGl0YWNlXHJcbiAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IGdyaWQgLSBvYmpla3QgZ3JpZHUgc2V6bmFtdSBkb2tsYWR1XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXhwRGVuIC0gaWRlbnRpZmlrYXRvciBrbmloeVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gWm9icmF6RGV0YWlsRGxlSVhQKGNvbnRlbnQ6IEdDb250ZW50LCBpeHA6IHN0cmluZywgZGF0dW1abWVueTogRGF0ZXxudWxsLCBzYW1vc3RhbmVPa25vOiBib29sZWFuID0gZmFsc2UsIGVkaXRhY2U6IGJvb2xlYW4gPSBmYWxzZSwgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCwgaXhwRGVuPzogc3RyaW5nfG51bGwpIHtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgLy8gUG9rdWQgbmVuaSB2eXBsbmVueSBpZGVudGlmaWthdG9yIGRva2xhZHUsIHpvYnJhIG11IHBvdXplIHZhcm92bm91IGhsYXNrdVxyXG4gICAgICAgIGlmIChpeHAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MubWVzc2FnZUJveChcclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDA2N1wiLCAvL1JDIDMwMjUwMDY3IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAwNjhcIiAvL1JDIDMwMjUwMDY4IDogTmVuw60gcG9zbMOhbiDFvsOhZG7DvSBpZGVudGlmaWvDoXRvciFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyBVa29uY2kgenByYUNPVkFOSVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVG9obGUgYXNpIG5lYnVkdSBwb3V6aXZhdCwgbXV6dSB0byBwb3pkZWppIHZ5aG9kaXRcclxuICAgICAgICBpZiAoIWVkaXRhY2UpIGVkaXRhY2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gRGV0YWlseSBhIHBhcmFtZXRyeSBvdGV2aXJhbmVobyBva25hICh0cmlkeSlcclxuICAgICAgICBsZXQgbmF6ZXZPa25hID0gXCJHb3JkaWMuUm96LldlYkNsaWVudC5HRGV0YWlsRG9rbGFkdVRhYlwiO1xyXG4gICAgICAgIGxldCBvcHRpb25zID1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGl4cDogaXhwLFxyXG4gICAgICAgICAgICBkYXR1bVptZW55OiBkYXR1bVptZW55LFxyXG4gICAgICAgICAgICBpbkVkaXQ6IGVkaXRhY2UsXHJcbiAgICAgICAgICAgIElkOiBcInJvekRldGFpbERva2xhZHVcIixcclxuICAgICAgICAgICAgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuSW5pdCwgLy8gUHJ2b3RuaSBuYWN0ZW5pIGRldGFpbHVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBPdGV2cmVuaSBkbGUgcG96YWRhdmt1IGJ1ZCBkbyBva25hIG5lYm8gZG8gY29udGVudHVcclxuICAgICAgICBpZiAoc2Ftb3N0YW5lT2tubykgeyAvLyBUb3RvIGplIGRvIG9rbmEsIG5lcG91eml2YSBzZVxyXG4gICAgICAgICAgICBjb250ZW50LmRpYWxvZ3Muc2hvd1dpbmRvdyhuYXpldk9rbmEsIG9wdGlvbnMsIFwiXCIsIDgwMCwgNjAwLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gem5vdnVuYcSNdGVuw60gc2V6bmFtdSAocG9kbGUgYWt0dcOhbG7DrWNoIGZpbHRyxa8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLlJvei5XZWJDbGllbnQuUmVmcmVzaFNlem5hbXUobnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIG9iamVrdCBwcm8gcG9zdW4gcG8gZGV0YWlsZWNoIGRsZSBzZXpuYW11XHJcbiAgICAgICAgICAgIHZhciBjb250cm9sOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PjtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBncmlkID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgY29udHJvbCA9IHVuZGVmaW5lZCBhcyBhbnk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKGdyaWQgYXMgYW55KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVyY2VuaSBHUENcclxuICAgICAgICAgICAgbGV0IG5ld0dwYzogYW55O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl4cERlbiAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjb250ZW50LmdwYywgaXhwRGVuIGFzIGFueSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG5ld0dwYyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIC8vIFZsYXN0bmkgb3RldnJlbmkgb2tuYVxyXG4gICAgICAgICAgICBjb250ZW50Lm5hdmlnYXRlKFtuYXpldk9rbmEsIHsgZ3BjOiBuZXdHcGMsIGdyaWRSZW1vdGVDb250cm9sOiBjb250cm9sIH1dLCAgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMucmV0dXJuVmFsdWUgJiYgcmVzLnJldHVyblZhbHVlLnJlZnJlc2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFjdGVuaSBha3R1YWxpem92YW5laG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5Sb3ouV2ViQ2xpZW50LlJlbG9hZFJvd0Zyb21EQihjb250ZW50LCByZXMucmV0dXJuVmFsdWUuaXhwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIGFrdGl2bmlobyByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uUmVmcmVzaFNlem5hbXUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUnVjbmkgemFkYW5pIHBpZHUgKHpvYnJhemVuaSBXRkwgb2tuYSlcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldHJcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBab2JyYXpWeWJlclBpZHUoY29udGVudDogR0NvbnRlbnQvKiwgcGFyYW1ldHI6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkdQb2RhbmlEdG8qLyk6IEpRdWVyeVByb21pc2U8YW55IHwgdW5kZWZpbmVkIHwgbnVsbD4ge1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgdmFyIGxfYlZsYXN0bmkgPSBmYWxzZTtcclxuICAgICAgICB2YXIgbF9iVmFsaWRhdGVQaWQgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgR29yZGljLldmbC5EaWFsb2dzIS5HZW5lcm92YW5pSXhwRGxnKGNvbnRlbnQsIHtcclxuICAgICAgICAgICAgVHlwRG9rOiBHb3JkaWMuV2ZsLkdsb2JhbHMuRW51bXMuVHlwRG9rLlZsYXN0bmkgYXMgYW55XHJcbiAgICAgICAgICAgICwgVHlwSWQ6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBJZC5JWFAgYXMgYW55XHJcbiAgICAgICAgICAgICwgRG90YXpQcmlFeGlzdGVuY2lWSmluZUFnZW5kZTogZmFsc2VcclxuICAgICAgICAgICAgLCBIbGFzZW5pUHJpRXhpc3RlbmNpVkFnZW5kZTogZmFsc2VcclxuICAgICAgICB9LCBHaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93V2luZG93KSEub24oXCJjbG9zZVwiXHJcbiAgICAgICAgICAgICwgZnVuY3Rpb24gKGV2LCByZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbHVlID09IFwidW5kZWZpbmVkXCIgfHwgcmV0VmFsdWUgPT0gbnVsbCB8fCByZXRWYWx1ZS52YWx1ZXMgPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1ldHI6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkdQb2RhbmlEdG8gPSB7IFBpZERva2xhZHU6IHJldFZhbHVlLkl4cCwgRG9rbGFkSml6RXhpc3R1amU6IHJldFZhbHVlLkl4cEV4aXN0IH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXJhbWV0ci5QaWREb2tsYWR1ID0gcmV0VmFsdWUuSXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHBhcmFtZXRyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiBcclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+ICAgT3puYWNpdCBkb2tsYWR5IHByZWN0ZW5lKHRydWUpL25lcHJlY3RlbmUoZmFsc2UpIDwvc3VtbWFyeT5cclxuICAgIC8vLyA8cmVtYXJrcz4gICBUdmFnZW5rbmVjaHQsIDMuMy4yMDE3LiA8L3JlbWFya3M+XHJcbiAgICAvLy8gPHBhcmFtIG5hbWU9XCJwcmVjdGVuZVwiPnRydWUgLSBvem5hY2l0IHphIHByZXN0ZW5lIDwvcGFyYW0+XHJcbiAgICAvLy8gPHBhcmFtIG5hbWU9XCJvem5hY2VuZVJhZGt5XCI+dnlicmFuZSByYWRreTwvcGFyYW0+XHJcbiAgICAvLy8gPHJldHVybnM+ICAgLiA8L3JldHVybnM+XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIE96bmFjaXREb2tsYWR5KGNvbnRlbnQ6IEdDb250ZW50LCBwcmVjdGVuZTogYm9vbGVhbiwgb3puYWNlbmVSYWRreTogVWN0LkludGVyZmFjZS5HUm96T3puYWNpdERva2xhZHlEdG9bXCJTZXpuYW1cIl0pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHZhciB0aGF0ID0gY29udGVudDtcclxuICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDgxXCIpOyAvL1JDIDMwMjUwMDgxIDogIFByb2LDrWjDoSBvem5hxI1vdsOhbsOtIGRva2xhZMWvXHJcbiAgICAgICAgbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96T3puYWNpdERva2xhZHlEdG8gPSB7XHJcbiAgICAgICAgICAgIE96bmFjaXQ6IChwcmVjdGVuZSA/IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwT3puYWNlbmlEb2tsYWR1LlByZWN0ZW5vIDogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VUeXBPem5hY2VuaURva2xhZHUuTmVwcmVjdGVubylcclxuICAgICAgICAgICAgLCBTZXpuYW06IG96bmFjZW5lUmFka3lcclxuICAgICAgICB9O1xyXG4gICAgICAgIEdvcmRpYy5Jc2wuUm96RG9rbGFkLmhyb21hZG5lT3puYWNpdChycSlcclxuICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybkRhdGEuZm9yRWFjaChmdW5jdGlvbiAocmFkZWssIGluZGVrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlJvei5XZWJDbGllbnQuUmVwbGFjZVJvdyhjb250ZW50LCByYWRlaywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChwcmVjdGVuZSlcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBcImlkZmxhc2hPem5hY2VuaVJhZGt1UHJlY3Rlbm5lXCIsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMDc5XCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtc3VjY2Vzc1wiLCB0aW1lcjogNTAwMCB9KTsgLy9SQyAzMDI1MDA3OSA6IFZ5YnJhbsOpIMWZw6Fka3kgYnlseSBvem5hxI1lbnkgemEgcMWZZcSNdGVuw6lcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaCh7IGlkOiBcImlkZmxhc2hPem5hY2VuaVJhZGt1TmVwcmVjdGVuZVwiLCBpY29uOiBcImdpLXRpY2tcIiwgbGFiZWw6IFwianJlczozMDI1MDA4MFwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgdGltZXI6IDUwMDAgfSk7IC8vUkMgMzAyNTAwODAgOiBWeWJyYW7DqSDFmcOhZGt5IGJ5bHkgb3puYcSNZW55IHphIG5lcMWZZcSNdGVuw6lcclxuXHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW9kZWwgcHJvIHByZWRhbmlcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdQcmVkYXRNb2RlbCB7XHJcbiAgICAgICAgZHV2b2Q6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgaXhzX2Z1bl9ha3Q6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgaXhzX2Z1bl92eXJpejogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfc3U6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgaXhzX3JlZjogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBjaXNfcmVhbDogc3RyaW5nIHwgbnVsbCxcclxuXHJcbiAgICB9O1xyXG4gICAgLy8gbW9kZWwgcHJvIHByZXZ6ZXRpXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHUHJldnpldGlNb2RlbCB7XHJcbiAgICAgICAgZHV2b2Q6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgaXhzX2Z1bl9ha3Q6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgaXhzX2Z1bl92eXJpejogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfcmVmOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGNpc19yZWFsOiBzdHJpbmcgfCBudWxsLFxyXG5cclxuICAgIH07XHJcbiAgICAvLyBtb2RlbCBwcm8gcHJpZGVsaXRcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdQcmlkZWxpdE1vZGVsIHtcclxuICAgICAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICAgICAgICBpeHNfZnVuX2FrdDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfc3U6IHN0cmluZyB8IG51bGwsXHJcbiAgICB9O1xyXG4gICAgLy8gbW9kZWwgcHJvIHByZWV2aWRlbmNpXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHUHJlZXZpZGVuY2VNb2RlbCB7XHJcbiAgICAgICAgZHV2b2Q6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgaXhwX2Rlbjogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfZnVuX2FrdDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfcmVmOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGNpc19yZWFsOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGl4c19mdW5fdnlyaXo6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgaXhzX3N1OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIHN1YnJhZGE6IG51bWJlciB8IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlZXZpZG92YXQgZm9ybXVsYXJcclxuICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBIcm9tYWRuYU9wZXJhY2Vmb3JtKGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UsIGNvbnRlbnQ6IEdEZXRhaWxEb2tsYWR1VGFiIHwgR1Nlem5hbURva2xhZHVUYWIsIGl4cF9kZW46IHN0cmluZyk6IEdvcmRpYy5Gb3Jtcy5Gb3JtICB7XHJcbiAgICAgICAgY29uc3Qgcm9rID0gY29udGVudC5nbG9iYWxzLkVrb1BhcmFtcz8uUm9rITtcclxuICAgICAgICBcclxuICAgICAgICAvL2xldCBpeHNGdW5Ba3QgPSAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdDtcclxuICAgICAgICBsZXQgRmlsdHJ5S29tcGV0ZW50ID0geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb8SNw6F0ZcSNbsOtIGZpbHRyeSBuYSBrb21wZXRlbnRhXHJcbiAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0aXZuw60ga29tcGV0ZW50aVxyXG4gICAgICAgICAgICBwcml6X2tvbTogMTAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG11c8OtIGLDvXQgcMWZw616bmFrIGtvbXBldGVudGEgXHJcbiAgICAgICAgICAgIGljbzogKGNvbnRlbnQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuUmV6aW1Qcm92b3p1ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlJlemltUHJvdm96dUVudW0uemFrbGFkbmkgfHwgY29udGVudC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS51Y3Rhcm5hID8gY29udGVudC5nbG9iYWxzLkVrb1BhcmFtcz8uSWNvIDogbnVsbCksXHJcbiAgICAgICAgICAgIHV1czogKGNvbnRlbnQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuUmV6aW1Qcm92b3p1ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlJlemltUHJvdm96dUVudW0udWN0YXJuYSA/IGNvbnRlbnQuZ2xvYmFscy5Fa29QYXJhbXM/LlV1cyA6IG51bGwpLFxyXG4gICAgICAgICAgICB1Y3M6IChjb250ZW50Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXMhLlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnVjdGFybmEgPyBjb250ZW50Lmdsb2JhbHMuRWtvUGFyYW1zPy5VY3MgOiBudWxsKSxcclxuICAgICAgICAgICAgY2lzX3JlYWw6IChjb250ZW50Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXMhLlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnJlYWxpemF0b3IgPyBjb250ZW50Lmdsb2JhbHMuRWtvUGFyYW1zPy5VdXMgOiBudWxsKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmVldmlkZW5jZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuUHJlZXZpZGVuY2VEb2tsYWR1Rm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50VmlkaXRlbG5vc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50Wm1lbmE6IGNvbnRlbnQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuUG92b2xlbmlabWVuaXRLb21wZXRlbnRhISxcclxuICAgICAgICAgICAgICAgICAgICBTdGFydEZpbHRyS29tcGV0ZW50OiBGaWx0cnlLb21wZXRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgWnByYWNvdmF0ZWxBa3R1YWxuaTogKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3QsXHJcbiAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0cktuaWhhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9hZzogNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va3RnX2Rlbjoga3RnRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IGNvbnRlbnQuZ2xvYmFscy5Fa29QYXJhbXM/LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiBjb250ZW50Lmdsb2JhbHMuRWtvUGFyYW1zPy5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogcm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBcIiE9IFwiICsgaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0clpwcmFjb3ZhdGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRGxlUG92b2xlbnljaEZhemk6IFtcIkdTQVVDVDAxXCIsIFwiR1dBVUNUMDVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVUeXBBZzogXCJyb3pcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnJmdUFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlZmVyZW50QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVN1YnJhZGE6IGNvbnRlbnQuZ2xvYmFscy5Fa29QYXJhbXM/LlN1YnJhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaXhzX3N1OiBpeHNTdVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlByZWRhbmk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLlByZWRhbmlEb2tsYWR1Rm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50VmlkaXRlbG5vc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50Wm1lbmE6IGNvbnRlbnQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuUG92b2xlbmlabWVuaXRLb21wZXRlbnRhISxcclxuICAgICAgICAgICAgICAgICAgICBTdGFydEZpbHRyS29tcGV0ZW50OiBGaWx0cnlLb21wZXRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Tb3V2aXNlamljaVZpZGl0ZWxub3N0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vU291dmlzZWppY2labWVuYTp0cnVlICxcclxuICAgICAgICAgICAgICAgICAgICBTdGFydEZpbHRyWnByYWNvdmF0ZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9EbGVQb3ZvbGVueWNoRmF6aTogW1wiR1NBVUNUMDFcIiwgXCJHV0FVQ1QwNVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGxlUG92b2xlbnljaEFnZW5kOiBbNTBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1VHlwQWc6IFwicm96XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVBa3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWZlcmVudEFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVJeHBEZW46IGl4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaXhzX3N1OiBpeHNTdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiAoY29udGVudC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS56YWtsYWRuaSB8fCBjb250ZW50Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXMhLlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnVjdGFybmEgPyBjb250ZW50Lmdsb2JhbHMuRWtvUGFyYW1zPy5JY28gOiBudWxsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVN1YnJhZGE6IGNvbnRlbnQuZ2xvYmFscy5Fa29QYXJhbXM/LlN1YnJhZGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaXhzX2Z1bjogXCIhPSBcIiArIGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uaXhzX2Z1bl9ha3RcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlByaWRlbGVuaTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuUHJpZGVsZW5pRG9rbGFkdUZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgIEtvbXBldGVudFZpZGl0ZWxub3N0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRabWVuYTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0clpwcmFjb3ZhdGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRGxlUG92b2xlbnljaEZhemk6IFtcIkdTQVVDVDAxXCIsIFwiR1dBVUNUMDVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVUeXBBZzogXCJyb3pcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGxlUG92b2xlbnljaEFnZW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVmZXJlbnRBa3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWcmZ1SXhwRGVuOiBpeHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2l4c19zdTogaXhzU3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogKGNvbnRlbnQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuUmV6aW1Qcm92b3p1ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlJlemltUHJvdm96dUVudW0uemFrbGFkbmkgfHwgY29udGVudC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS51Y3Rhcm5hID8gY29udGVudC5nbG9iYWxzLkVrb1BhcmFtcz8uSWNvIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVTdWJyYWRhOiBjb250ZW50Lmdsb2JhbHMuRWtvUGFyYW1zPy5TdWJyYWRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2l4c19mdW46IFwiIT0gXCIgKyBpeHNGdW5Ba3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9peHNfZnVuOiBcIiE9IFwiICsgdGhhdC5VY2V0bmlEb2tsYWREdG8uSGxhdmlja2FEb2tsYWR1Py5peHNfZnVuX2FrdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmV2emV0aTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuUHJldnpldGlEb2tsYWR1Rm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgQWt0dWFsbmlQcmlobGFzZW55WnByYWNvdmF0ZWw6ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0LFxyXG4gICAgICAgICAgICAgICAgICAgIEtvbXBldGVudFptZW5hOiBjb250ZW50Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXMhLlBvdm9sZW5pWm1lbml0S29tcGV0ZW50YSEsXHJcbiAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50VmlkaXRlbG5vc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0cktvbXBldGVudDogRmlsdHJ5S29tcGV0ZW50LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLlByZXZ6ZXRpRG9rbGFkdUZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgIEFrdHVhbG5pUHJpaGxhc2VueVpwcmFjb3ZhdGVsOiAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCxcclxuICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRabWVuYTogY29udGVudC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5Qb3ZvbGVuaVptZW5pdEtvbXBldGVudGEhLFxyXG4gICAgICAgICAgICAgICAgICAgIEtvbXBldGVudFZpZGl0ZWxub3N0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0RmlsdHJLb21wZXRlbnQ6IEZpbHRyeUtvbXBldGVudCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaHlibmEgYWtjZVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgKiBOYWN0ZW5pIHBhcmFtZXRydSB6YWRhbnljaCB1eml2YXRlbGVtXHJcbiAgICAqICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSHJvbWFkbmFPcGVyYWNlR2V0UGFyYW0oLyphY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLCovIGRpYWxvZ3M6IEdEbGdOYW1lc3BhY2UsIHdpejogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgdnlicmFuZURva2xhZHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvW10pOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pIcm9tYWRueVJlcXVlc3REdG8gPiB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB3aXo7XHJcbiAgICAgICAgLy92YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBmb3JtID0gdGhhdC5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIik7XHJcbiAgICAgICAgY29uc3QgaXhwX2RlbiA9IGZvcm0uZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkPEVrby5JbnRlcmZhY2UuR0Vrb3NkZW5EdG8+KFwiZ2V0VmFsdWVcIik/Lml4cF9kZW47XHJcbiAgICAgICAgLy9pZihpeHBfZGVuKVxyXG4gICAgICAgIC8vICAgICAgICBpeHBfZGVuID0gaXhwX2Rlbi5peHBfZGVuO1xyXG4gICAgICAgIGNvbnN0IHsgaXhzX2Z1bjogaXhzX2Z1bl9ha3QsIGl4c19yZWYgfSA9IGZvcm0uZmluZEZpZWxkcyhcIml4c19mdW5fYWt0XCIpLmdmaWVsZDxDb250cm9sc0xvZ2ljLkludGVyZmFjZS5HUmVhZGVyR2luc2Z1bkR0bz4oXCJnZXRWYWx1ZVwiKSA/PyB7fTtcclxuICAgICAgICAvL2xldCBpeHNfcmVmOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvL2lmKGl4c19mdW5fYWt0KSB7XHJcbiAgICAgICAgLy8gICAgaXhzX2Z1bl9ha3QgPSBpeHNfZnVuX2FrdC5peHNfZnVuO1xyXG4gICAgICAgIC8vICAgIGl4c19yZWYgPSBpeHNfZnVuX2FrdC5peHNfcmVmO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIGxldCBkdXZvZCA9IGZvcm0uZmluZEZpZWxkcyhcImR1dm9kXCIpLmdmaWVsZChcImdldFZhbHVlXCIpXHJcblxyXG4gICAgICAgICAgICAvL3RoYXQuZGlhbG9nRGF0YSA9IHRoYXQubXlGb3JtLmdldEZvcm1EYXRhKCk7ICAgICAgICAgIC8vIHBvc2LDrXJhbsOhIGRhdGEgeiBkaWFsb2d1XHJcbiAgICAgICAgaWYodHlwZW9mIGl4cF9kZW4gPT09IFwidW5kZWZpbmVkXCIgfHwgaXhwX2RlbiA9PT0gbnVsbCB8fCBpeHNfZnVuX2FrdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDI4N1wiKSAvL1JDIDMwMjUwMjg3IDogTmVuw60gdnlwbG7Em24gY8OtbCBwxZllZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvLy5vbihcImNsb3NlXCIsICgpID0+IGRlZi5yZWplY3QoZmFsc2UpKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy92YXIgdnlicmFuZURva2xhZHkgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvelZ5YnJhbnlEb2tsYWREdG8+KHRoYXQuJGdyaWQsIHRydWUpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdnlicmFuZURva2xhZHkgPT09IFwidW5kZWZpbmVkXCIgfHwgdnlicmFuZURva2xhZHkgPT0gbnVsbCB8fCB2eWJyYW5lRG9rbGFkeSEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDM1MlwiKSAvL1JDIDMwMjUwMzUyIDogTmVieWx5IHZ5YnLDoW55IMW+w6FkbsOpIGRva2xhZHlcclxuICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pIcm9tYWRueVJlcXVlc3REdG8gPSB7XHJcbiAgICAgICAgICAgIFNlem5hbTogdnlicmFuZURva2xhZHksXHJcbiAgICAgICAgICAgIEl4cERlbk5ldzogaXhwX2RlbixcclxuICAgICAgICAgICAgSXhzRnVuTmV3OiBpeHNfZnVuX2FrdCxcclxuICAgICAgICAgICAgSXhzUmVmTmV3OiBpeHNfcmVmLFxyXG4gICAgICAgICAgICBEdXZvZDogZHV2b2QsXHJcbiAgICAgICAgICAgIC8vQ2lzUmVhbFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC53aGVuKHJlc3VsdCk7XHJcbiAgICAvL3JldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAgKiBPdGV2xZllbsOtIGRldGFpbHUgdiBwcmltw6FybsOtIGFnZW5kxJsgKHYgamluw6kgesOhbG/FvmNlKVxyXG4gICAgICAqIFxyXG4gICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbH0gdHlwQWcgcHJpbcOhcm7DrSBhZ2VuZGFcclxuICAgICAgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IGlkMSBpZCBkZXRhaWx1IHYgcHJpbcOhcm7DrSBhZ2VuZMSbIChQSUQgYSBwb2QuKVxyXG4gICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gW2lkMl0gZG9wbMWIdWrDrWPDrSBpZCBkZXRhaWx1IHYgcHJpbcOhcm7DrSBhZ2VuZMSbIChQSUQgYSBwb2QuKVxyXG4gICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gW2lkM10gZGFsxaHDrSBkb3BsxYh1asOtY8OtIGlkIGRldGFpbHUgdiBwcmltw6FybsOtIGFnZW5kxJsgKFBJRCBhIHBvZC4pXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBvcGVuRGV0YWlsSW5PdGhlclRhYih0eXBBZzogbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbCwgaWQxOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsLCBpZDI/OiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsLCBpZDM/OiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IGRvcGxuaXQgdGVzdCBuYSB2eWptZW5vdmFuw6kgYWdlbmR5P1xyXG4gICAgICAgIGlmICh0eXBBZyAhPSBudWxsICYmIGlkMSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBvdGV2xZllbsOtIG5vdsOpIHrDoWxvxb5reVxyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLldlYkFwcC5VdGlsaXR5Lm9wZW5BcHAoXHJcbiAgICAgICAgICAgICAgICAvLyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZGVudGlmaWthY2VcclxuICAgICAgICAgICAgICAgICAgICBpeHgxOiBpZDEsXHJcbiAgICAgICAgICAgICAgICAgICAgaXh4MjogaWQyLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4eDM6IGlkMyxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb8W+YWRvdmFuw6EgYWdlbmRhIChhIHDFmcOtcGFkbsSbIGbDoXplKVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cEFnOiB0eXBBZyxcclxuICAgICAgICAgICAgICAgICAgICBmYXplOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvdm9sZW5vIHBvdcW+w610IGFrdHXDoWxuw60gZsOhemlcclxuICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB2w71qaW1rYSBwxZlpIG5lbmFsZXplbsOtIMW+w6FkbsOpIGPDrWxvdsOpIGbDoXplXHJcbiAgICAgICAgICAgICAgICAgICAgbm9BcHBGYWlsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIHBvxb5hZG92YW7DoSBtZXRvZGFcclxuICAgICAgICAgICAgICAgIFwiT3BlbkRldGFpbFwiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuIl19