"use strict";
var Gordic;
(function (Gordic) {
    var Search;
    (function (Search) {
        var Fuc;
        (function (Fuc) {
            /**
             * Hledání PIDu případu
             *
             * @author Martin Boček
             * @since
             */
            class GFucIxpUprSearchResolver extends Gordic.Search.Eko.GEkoVsSearchResolver {
                /**
                 * Hledání VS
                 *
                 * @param {string[]} vsList seznam hledaných VS
                 * @returns {JQuery.Promise<Gordic.Eko.Interface.GSearchVsResponseDto[]>} nalezené záznamy
                 */
                findForList(vsList) {
                    let that = this;
                    const cnt = $.content($('#main'));
                    let resultZapListy;
                    let resultPripady;
                    let promises = [];
                    vsList.forEach(vs => {
                        // zápočtové listy
                        promises.push(cnt.isl.ZapoctovyList.list({
                            filters: { pol_vs: vs }, fragments: [
                                "Base" /* Gordic.Fuc.Interface.GZapoctovyListDtoFragments.ixp */,
                                "kniha" /* Gordic.Fuc.Interface.GZapoctovyListDtoFragments.ixp_den_txt */,
                                "subjekt" /* Gordic.Fuc.Interface.GZapoctovyListDtoFragments.subjekt */ + "." + "esu_txt" /* Gordic.Fuc.Interface.GExterniSubjektDtoFragments.esu_txt */,
                                "vlastnik" /* Gordic.Fuc.Interface.GZapoctovyListDtoFragments.vlastnik */ + "." + "b" /* Gin.Interface.GFunkcniMistoDtoFragments.nazev_rf */,
                            ]
                        }).getData().then((data) => {
                            resultZapListy = that.addZapoctovyList(resultZapListy, vs, data);
                        }));
                        // případy (+ pobyby a platby)
                        // TODO: přidat i mylné platby?
                        promises.push(cnt.isl.FinPripad.list({
                            filters: { vs: vs }, fragments: [
                                "Base" /* Gordic.Fuc.Interface.GPripadDtoFragments.ixp_upr */,
                                "kniha" /* Gordic.Fuc.Interface.GPripadDtoFragments.ixp_den_txt */,
                                "subjekt" /* Gordic.Fuc.Interface.GPripadDtoFragments.subjekt */ + "." + "esu_txt" /* Gordic.Fuc.Interface.GExterniSubjektDtoFragments.esu_txt */,
                                "vlastnik" /* Gordic.Fuc.Interface.GPripadDtoFragments.vlastnik */ + "." + "b" /* Gin.Interface.GFunkcniMistoDtoFragments.nazev_rf */,
                            ]
                        }).getData().then((data) => {
                            resultPripady = that.addPripad(resultPripady, vs, data);
                        }));
                        promises.push(cnt.isl.FinPripad.list({
                            filters: { upo_vs: vs }, fragments: [
                                "Base" /* Gordic.Fuc.Interface.GPripadDtoFragments.ixp_upr */,
                                "kniha" /* Gordic.Fuc.Interface.GPripadDtoFragments.ixp_den_txt */,
                                "subjekt" /* Gordic.Fuc.Interface.GPripadDtoFragments.subjekt */ + "." + "esu_txt" /* Gordic.Fuc.Interface.GExterniSubjektDtoFragments.esu_txt */,
                                "vlastnik" /* Gordic.Fuc.Interface.GPripadDtoFragments.vlastnik */ + "." + "b" /* Gin.Interface.GFunkcniMistoDtoFragments.nazev_rf */,
                            ]
                        }).getData().then((data) => {
                            resultPripady = that.addPripad(resultPripady, vs, data);
                        }));
                        promises.push(cnt.isl.FinPripad.list({
                            filters: { pla_vs: vs }, fragments: [
                                "Base" /* Gordic.Fuc.Interface.GPripadDtoFragments.ixp_upr */,
                                "kniha" /* Gordic.Fuc.Interface.GPripadDtoFragments.ixp_den_txt */,
                                "subjekt" /* Gordic.Fuc.Interface.GPripadDtoFragments.subjekt */ + "." + "esu_txt" /* Gordic.Fuc.Interface.GExterniSubjektDtoFragments.esu_txt */,
                                "vlastnik" /* Gordic.Fuc.Interface.GPripadDtoFragments.vlastnik */ + "." + "b" /* Gin.Interface.GFunkcniMistoDtoFragments.nazev_rf */,
                            ]
                        }).getData().then((data) => {
                            resultPripady = that.addPripad(resultPripady, vs, data);
                        }));
                    });
                    return $.when.apply(null, promises).then(() => {
                        let result = [];
                        if (resultZapListy?.Items && resultZapListy?.Items?.length > 0)
                            result.push(resultZapListy);
                        if (resultPripady?.Items && resultPripady?.Items?.length > 0)
                            result.push(resultPripady);
                        return result;
                    });
                }
                /**
                 * Otevření detailu
                 *
                 * @param {Gordic.Eko.Interface.GSearchVsResponseDto} finding ???
                 * @param {Gordic.Eko.Interface.GSearchVsItem} item zobrazovaná položka
                 * @returns {JQuery.Promise<any>} promise
                 */
                openDetailLocal(finding, item) {
                    const cnt = $.content($('#main'));
                    // TODO: udělat nějaké společné metody pro otevření detailu - volalo by se to odsud (a dalších hledaček), z dashboardu a z otevření modulu přes URL
                    // zobrazení detailů podle toho, o jaký typ jde
                    // TODO: dodělat historii účtování a podívat se, jestli jsou řešeny i další entity jako pohyby a podobně - nebo to je v jiné metodě?
                    if (item.CoJsemZac === 401 /* Wfl.Interface.GIdentifikatorCoJsemZac.SoupiskaPohybu */) {
                        // soupiska pohybů
                        let newGpc = (item?.DataInfo?.ixp_den ? Gordic.Eko.Utils.createBookGpc(cnt.gpc, item?.DataInfo?.ixp_den) : cnt.gpc);
                        cnt.navigate(['Gordic.Fuc.WebClient.GDetailSoupisky', { gpc: newGpc }], {
                            ID: 'DetailSoupisky#',
                            Ixp: item.Ixx1,
                            IxpDen: item?.DataInfo?.ixp_den
                        });
                        return $.Deferred().resolve(true).promise();
                    }
                    else if (item.CoJsemZac === 402 /* Wfl.Interface.GIdentifikatorCoJsemZac.ZapoctovyList */) {
                        // zápočtový list
                        let newGpc = (item?.DataInfo?.ixp_den ? Gordic.Eko.Utils.createBookGpc(cnt.gpc, item?.DataInfo?.ixp_den) : cnt.gpc);
                        cnt.navigate(['Gordic.Fuc.WebClient.GDetailZapoctovehoListu', { gpc: newGpc }], {
                            ID: 'DetailZapoctovehoListu#',
                            Ixp: item.Ixx1,
                            IxpDen: item?.DataInfo?.ixp_den
                        });
                        return $.Deferred().resolve(true).promise();
                    }
                    else if (item.CoJsemZac === 400 /* Wfl.Interface.GIdentifikatorCoJsemZac.FinancniPripad */) {
                        // případ
                        cnt.navigate('Gordic.Fuc.WebClient.GDetailPripadu', {
                            ID: 'DetailPripadu#',
                            IxpUpr: item.Ixx1
                        });
                        return $.Deferred().resolve(true).promise();
                    }
                    else {
                        // neznámý typ
                        return $.Deferred().resolve(false).promise();
                    }
                }
                /**
                 * Vrácení informace o doméně
                 */
                getDefaultDomain() {
                    const defaultDomain = super.getDefaultDomain();
                    defaultDomain.id = "FucVsDomain";
                    return defaultDomain;
                }
                /**
                 * Vrácení id resolveru
                 */
                getDefaultId() {
                    return "FucVsResolver";
                }
                /**
                 * Vložení nalezených případů do výsledků hledání
                 *
                 * @param {Gordic.Eko.Interface.GSearchVsResponseDto} result výsledky hledání
                 * @param {string} vs hledaný vs
                 * @param {Gordic.Fuc.Interface.GPripadDto[]} pripady nalezené případy
                 * @returns {Gordic.Eko.Interface.GSearchVsResponseDto} výsledky hledání včetně přidaných případů
                 */
                addPripad(result, vs, pripady) {
                    let res = result || { Faze: "GWAFUC05" };
                    res.Items = res.Items || [];
                    pripady.forEach(pripad => {
                        const resIndex = res.Items.findIndex((resItem) => resItem.Ixx1 != null && pripad.ixp_upr != null && resItem.Ixx1 === pripad.ixp_upr);
                        if (resIndex >= 0) {
                            if (res?.Items && res.Items[resIndex].DataInfo) {
                                if (res.Items[resIndex].DataInfo.vs.findIndex((v) => v === vs) >= 0) {
                                }
                                else {
                                    res.Items[resIndex].DataInfo.vs.push(vs);
                                }
                            }
                        }
                        else {
                            res.Items?.push({
                                Ixx1: pripad.ixp_upr,
                                DataInfo: { vs: [vs] },
                                CoJsemZac: 400 /* Gordic.Wfl.Interface.GIdentifikatorCoJsemZac.FinancniPripad */,
                                AppInfo: { TypAgendy: 330, Faze: "GWAFUC05", },
                                Nazev: pripad.popis,
                                DalsiInformace: [
                                    { Label: "Kniha", Value: pripad.ixp_den_txt },
                                    { Label: "Rok", Value: pripad.rok.toString() },
                                    { Label: "Evidenční číslo", Value: pripad.ac },
                                    { Label: "Agendové číslo", Value: pripad.ac_ag },
                                    { Label: "Zpracovatel", Value: pripad.vlastnik?.nazev_rf },
                                    { Label: "Subjekt", Value: "{0}, IČO: {1}" /*, DIČ: {2}*/.format(pripad.subjekt?.esu_txt ?? "", pripad.subjekt?.ico ?? "" /*, pripad.subjekt?.dic ?? ""*/) },
                                    // TODO: nepoužít ixs_typ_txt nebo ktg_typ_txt (musely by ale v Read být příslušné fragmenty). Jak je to v hledání PIDu?
                                    { Label: "Popis", Value: pripad.popis /* ?? "Zápočtový list"*/ }
                                    //{ Label: "Variabilní symbol", Value: zapoctovyList.vs },
                                ]
                            });
                        }
                    });
                    return res;
                }
                /**
                 * Vložení nalezených zápočtových listů do výsledků hledání
                 *
                 * @param {Gordic.Eko.Interface.GSearchVsResponseDto} result výsledky hledání
                 * @param {string} vs hledaný vs
                 * @param {Gordic.Fuc.Interface.GZapoctovyListDto[]} zapoctoveListy nalezené zápočtové listy
                 * @returns {Gordic.Eko.Interface.GSearchVsResponseDto} výsledky hledání včetně přidaných zápočtových listů
                 */
                addZapoctovyList(result, vs, zapoctoveListy) {
                    let res = result || { Faze: "GWAFUC05" };
                    res.Items = res.Items || [];
                    zapoctoveListy.forEach(zapoctovyList => {
                        const resIndex = res.Items.findIndex((resItem) => resItem.Ixx1 != null && zapoctovyList.ixp != null && resItem.Ixx1 === zapoctovyList.ixp);
                        if (resIndex >= 0) {
                            if (res?.Items && res.Items[resIndex].DataInfo) {
                                if (res.Items[resIndex].DataInfo.vs.findIndex((v) => v === vs) >= 0) {
                                }
                                else {
                                    res.Items[resIndex].DataInfo.vs.push(vs);
                                }
                            }
                        }
                        else {
                            res.Items?.push({
                                Ixx1: zapoctovyList.ixp,
                                DataInfo: { vs: [vs], ixp_den: zapoctovyList.ixp_den },
                                CoJsemZac: 402 /* Gordic.Wfl.Interface.GIdentifikatorCoJsemZac.ZapoctovyList */,
                                AppInfo: { TypAgendy: 330, Faze: "GWAFUC05", },
                                Nazev: zapoctovyList.popis,
                                DalsiInformace: [
                                    { Label: "Kniha", Value: zapoctovyList.ixp_den_txt },
                                    // TODO: doplnit rok knihy (aktuálně se neselektuje)
                                    //{ Label: "Rok", Value: zapoctovyList.rok },
                                    { Label: "Agendové číslo", Value: zapoctovyList.ac_ag },
                                    { Label: "Evidenční číslo", Value: zapoctovyList.ac },
                                    { Label: "Zpracovatel", Value: zapoctovyList.vlastnik?.nazev_rf },
                                    // TODO: doplnit IČO a DIČ (podle KDF05) - i pro případ
                                    { Label: "Subjekt", Value: "{0}, IČO: {1}" /*, DIČ: {2}*/.format(zapoctovyList.subjekt?.esu_txt ?? "", zapoctovyList.subjekt?.ico ?? "" /*, zapoctovyList.subjekt?.dic ?? ""*/) },
                                    // TODO: nepoužít ixs_typ_txt nebo ktg_typ_txt (musely by ale v Read být příslušné fragmenty). Jak je to v hledání PIDu?
                                    { Label: "Popis", Value: zapoctovyList.popis /* ?? "Zápočtový list"*/ },
                                    //{ Label: "Variabilní symbol", Value: zapoctovyList.vs },
                                ]
                            });
                        }
                    });
                    return res;
                }
            }
            Fuc.GFucIxpUprSearchResolver = GFucIxpUprSearchResolver;
        })(Fuc = Search.Fuc || (Search.Fuc = {}));
    })(Search = Gordic.Search || (Gordic.Search = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Z1Y0l4cFVwclNlYXJjaFJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0Z1Y0l4cFVwclNlYXJjaFJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FrUWY7QUFsUUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxNQUFNLENBa1F0QjtJQWxRZ0IsV0FBQSxNQUFNO1FBQUMsSUFBQSxHQUFHLENBa1ExQjtRQWxRdUIsV0FBQSxHQUFHO1lBRXZCOzs7OztlQUtHO1lBQ0gsTUFBYSx3QkFBeUIsU0FBUSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7Z0JBRWhGOzs7OzttQkFLRztnQkFDTyxXQUFXLENBQUMsTUFBZ0I7b0JBRWxDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFFbEMsSUFBSSxjQUF5RCxDQUFDO29CQUM5RCxJQUFJLGFBQXdELENBQUM7b0JBRTdELElBQUksUUFBUSxHQUF5QixFQUFFLENBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7NEJBQ3JDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUU7OztnQ0FHaEMsMEVBQTBELEdBQUcsMkVBQTJEO2dDQUN4SCw0RUFBMkQsR0FBRyw2REFBbUQ7NkJBQ3BIO3lCQUNKLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDdkIsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNyRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUVKLDhCQUE4Qjt3QkFDOUIsK0JBQStCO3dCQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs0QkFDakMsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRTs7O2dDQUc1QixtRUFBbUQsR0FBRywyRUFBMkQ7Z0NBQ2pILHFFQUFvRCxHQUFHLDZEQUFtRDs2QkFDN0c7eUJBQ0osQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUN2QixhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUM1RCxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNKLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDOzRCQUNqQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFOzs7Z0NBR2hDLG1FQUFtRCxHQUFHLDJFQUEyRDtnQ0FDakgscUVBQW9ELEdBQUcsNkRBQW1EOzZCQUM3Rzt5QkFDSixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ3ZCLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzVELENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ0osUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7NEJBQ2pDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUU7OztnQ0FHaEMsbUVBQW1ELEdBQUcsMkVBQTJEO2dDQUNqSCxxRUFBb0QsR0FBRyw2REFBbUQ7NkJBQzdHO3lCQUNKLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDdkIsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDNUQsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDUixDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUMxQyxJQUFJLE1BQU0sR0FBZ0QsRUFBRSxDQUFDO3dCQUM3RCxJQUFJLGNBQWMsRUFBRSxLQUFLLElBQUksY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLEdBQUcsQ0FBQzs0QkFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUM1RixJQUFJLGFBQWEsRUFBRSxLQUFLLElBQUksYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLEdBQUcsQ0FBQzs0QkFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6RixPQUFPLE1BQU0sQ0FBQztvQkFDbEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRDs7Ozs7O21CQU1HO2dCQUNPLGVBQWUsQ0FBQyxPQUFrRCxFQUFFLElBQXdDO29CQUVsSCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUVsQyxtSkFBbUo7b0JBRW5KLCtDQUErQztvQkFDL0Msb0lBQW9JO29CQUNwSSxJQUFJLElBQUksQ0FBQyxTQUFTLG1FQUF5RCxFQUFFLENBQUM7d0JBQzFFLGtCQUFrQjt3QkFDbEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNwSCxHQUFHLENBQUMsUUFBUSxDQUNSLENBQUMsc0NBQXNDLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFDekQ7NEJBQ0ksRUFBRSxFQUFFLGlCQUFpQjs0QkFDckIsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJOzRCQUNkLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU87eUJBQ2xDLENBQ0osQ0FBQzt3QkFDRixPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3pELENBQUM7eUJBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxrRUFBd0QsRUFBRSxDQUFDO3dCQUM5RSxpQkFBaUI7d0JBQ2pCLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDcEgsR0FBRyxDQUFDLFFBQVEsQ0FDUixDQUFDLDhDQUE4QyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQ2pFOzRCQUNJLEVBQUUsRUFBRSx5QkFBeUI7NEJBQzdCLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFDZCxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPO3lCQUNsQyxDQUNKLENBQUM7d0JBQ0YsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN6RCxDQUFDO3lCQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsbUVBQXlELEVBQUUsQ0FBQzt3QkFDL0UsU0FBUzt3QkFDVCxHQUFHLENBQUMsUUFBUSxDQUNSLHFDQUFxQyxFQUNyQzs0QkFDSSxFQUFFLEVBQUUsZ0JBQWdCOzRCQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7eUJBQ3BCLENBQ0osQ0FBQzt3QkFDRixPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3pELENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixjQUFjO3dCQUNkLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDMUQsQ0FBQztnQkFDTCxDQUFDO2dCQUVEOzttQkFFRztnQkFDSSxnQkFBZ0I7b0JBRW5CLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUMvQyxhQUFhLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQztvQkFDakMsT0FBTyxhQUFhLENBQUM7Z0JBRXpCLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNJLFlBQVk7b0JBRWYsT0FBTyxlQUFlLENBQUM7Z0JBQzNCLENBQUM7Z0JBRUQ7Ozs7Ozs7bUJBT0c7Z0JBQ0ssU0FBUyxDQUFDLE1BQWlELEVBQUUsRUFBVSxFQUFFLE9BQTBDO29CQUV2SCxJQUFJLEdBQUcsR0FBRyxNQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7b0JBQ3pDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQ3JCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEksSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUM7NEJBQ2hCLElBQUksR0FBRyxFQUFFLEtBQUssSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUM3QyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUyxDQUFDLEVBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQ0FDeEUsQ0FBQztxQ0FDSSxDQUFDO29DQUNGLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUyxDQUFDLEVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0NBQy9DLENBQUM7NEJBQ0wsQ0FBQzt3QkFDTCxDQUFDOzZCQUNJLENBQUM7NEJBQ0YsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQ1g7Z0NBQ0ksSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPO2dDQUNwQixRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQ0FDdEIsU0FBUyx1RUFBNkQ7Z0NBQ3RFLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRztnQ0FDOUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2dDQUNuQixjQUFjLEVBQUU7b0NBQ1osRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFO29DQUM3QyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7b0NBQy9DLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFO29DQUM5QyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtvQ0FDaEQsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRTtvQ0FDMUQsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLENBQUEsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksRUFBRSxDQUFBLCtCQUErQixDQUFDLEVBQUU7b0NBQzFKLHdIQUF3SDtvQ0FDeEgsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFBLHdCQUF3QixFQUFFO29DQUMvRCwwREFBMEQ7aUNBQzdEOzZCQUNKLENBQ0osQ0FBQzt3QkFDTixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILE9BQU8sR0FBRyxDQUFDO2dCQUNmLENBQUM7Z0JBRUQ7Ozs7Ozs7bUJBT0c7Z0JBQ0ssZ0JBQWdCLENBQUMsTUFBaUQsRUFBRSxFQUFVLEVBQUUsY0FBd0Q7b0JBRTVJLElBQUksR0FBRyxHQUFHLE1BQU0sSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztvQkFDekMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDNUIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTt3QkFDbkMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLGFBQWEsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1SSxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQzs0QkFDaEIsSUFBSSxHQUFHLEVBQUUsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQzdDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFTLENBQUMsRUFBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dDQUN4RSxDQUFDO3FDQUNJLENBQUM7b0NBQ0YsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFTLENBQUMsRUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FDL0MsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUM7NkJBQ0ksQ0FBQzs0QkFDRixHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FDWDtnQ0FDSSxJQUFJLEVBQUUsYUFBYSxDQUFDLEdBQUc7Z0NBQ3ZCLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFO2dDQUN0RCxTQUFTLHNFQUE0RDtnQ0FDckUsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFHO2dDQUM5QyxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0NBQzFCLGNBQWMsRUFBRTtvQ0FDWixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxXQUFXLEVBQUU7b0NBQ3BELG9EQUFvRDtvQ0FDcEQsNkNBQTZDO29DQUM3QyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRTtvQ0FDdkQsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUU7b0NBQ3JELEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUU7b0NBQ2pFLHVEQUF1RDtvQ0FDdkQsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLENBQUEsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxFQUFFLEVBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksRUFBRSxDQUFBLHNDQUFzQyxDQUFDLEVBQUU7b0NBQy9LLHdIQUF3SDtvQ0FDeEgsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFBLHdCQUF3QixFQUFFO29DQUN0RSwwREFBMEQ7aUNBQzdEOzZCQUNKLENBQ0osQ0FBQzt3QkFDTixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILE9BQU8sR0FBRyxDQUFDO2dCQUNmLENBQUM7YUFFSjtZQXpQWSw0QkFBd0IsMkJBeVBwQyxDQUFBO1FBQ0wsQ0FBQyxFQWxRdUIsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa1ExQjtJQUFELENBQUMsRUFsUWdCLE1BQU0sR0FBTixhQUFNLEtBQU4sYUFBTSxRQWtRdEI7QUFBRCxDQUFDLEVBbFFTLE1BQU0sS0FBTixNQUFNLFFBa1FmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TZWFyY2guRnVjIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhsZWTDoW7DrSBQSUR1IHDFmcOtcGFkdVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgTWFydGluIEJvxI1la1xyXG4gICAgICogQHNpbmNlIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR0Z1Y0l4cFVwclNlYXJjaFJlc29sdmVyIGV4dGVuZHMgR29yZGljLlNlYXJjaC5Fa28uR0Vrb1ZzU2VhcmNoUmVzb2x2ZXIge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIbGVkw6Fuw60gVlNcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB2c0xpc3Qgc2V6bmFtIGhsZWRhbsO9Y2ggVlNcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8R29yZGljLkVrby5JbnRlcmZhY2UuR1NlYXJjaFZzUmVzcG9uc2VEdG9bXT59IG5hbGV6ZW7DqSB6w6F6bmFteVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBmaW5kRm9yTGlzdCh2c0xpc3Q6IHN0cmluZ1tdKTogSlF1ZXJ5LlByb21pc2U8R29yZGljLkVrby5JbnRlcmZhY2UuR1NlYXJjaFZzUmVzcG9uc2VEdG9bXT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY250ID0gJC5jb250ZW50KCQoJyNtYWluJykpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc3VsdFphcExpc3R5OiBHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0bztcclxuICAgICAgICAgICAgbGV0IHJlc3VsdFByaXBhZHk6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvO1xyXG5cclxuICAgICAgICAgICAgbGV0IHByb21pc2VzOiBKUXVlcnlQcm9taXNlPGFueT5bXSA9IFtdO1xyXG4gICAgICAgICAgICB2c0xpc3QuZm9yRWFjaCh2cyA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB6w6Fwb8SNdG92w6kgbGlzdHlcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goY250LmlzbC5aYXBvY3RvdnlMaXN0Lmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHsgcG9sX3ZzOiB2cyB9LCBmcmFnbWVudHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcG9jdG92eUxpc3REdG9GcmFnbWVudHMuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HWmFwb2N0b3Z5TGlzdER0b0ZyYWdtZW50cy5peHBfZGVuX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcG9jdG92eUxpc3REdG9GcmFnbWVudHMuc3ViamVrdCArIFwiLlwiICsgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR0V4dGVybmlTdWJqZWt0RHRvRnJhZ21lbnRzLmVzdV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBvY3RvdnlMaXN0RHRvRnJhZ21lbnRzLnZsYXN0bmlrICsgXCIuXCIgKyBHaW4uSW50ZXJmYWNlLkdGdW5rY25pTWlzdG9EdG9GcmFnbWVudHMubmF6ZXZfcmYsXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRaYXBMaXN0eSA9IHRoYXQuYWRkWmFwb2N0b3Z5TGlzdChyZXN1bHRaYXBMaXN0eSwgdnMsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHDFmcOtcGFkeSAoKyBwb2J5YnkgYSBwbGF0YnkpXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBwxZlpZGF0IGkgbXlsbsOpIHBsYXRieT9cclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goY250LmlzbC5GaW5QcmlwYWQubGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogeyB2czogdnMgfSwgZnJhZ21lbnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9GcmFnbWVudHMuaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b0ZyYWdtZW50cy5peHBfZGVuX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b0ZyYWdtZW50cy5zdWJqZWt0ICsgXCIuXCIgKyBHb3JkaWMuRnVjLkludGVyZmFjZS5HRXh0ZXJuaVN1Ympla3REdG9GcmFnbWVudHMuZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b0ZyYWdtZW50cy52bGFzdG5payArIFwiLlwiICsgR2luLkludGVyZmFjZS5HRnVua2NuaU1pc3RvRHRvRnJhZ21lbnRzLm5hemV2X3JmLFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pLmdldERhdGEoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0UHJpcGFkeSA9IHRoYXQuYWRkUHJpcGFkKHJlc3VsdFByaXBhZHksIHZzLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goY250LmlzbC5GaW5QcmlwYWQubGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogeyB1cG9fdnM6IHZzIH0sIGZyYWdtZW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvRnJhZ21lbnRzLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9GcmFnbWVudHMuaXhwX2Rlbl90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9GcmFnbWVudHMuc3ViamVrdCArIFwiLlwiICsgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR0V4dGVybmlTdWJqZWt0RHRvRnJhZ21lbnRzLmVzdV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9GcmFnbWVudHMudmxhc3RuaWsgKyBcIi5cIiArIEdpbi5JbnRlcmZhY2UuR0Z1bmtjbmlNaXN0b0R0b0ZyYWdtZW50cy5uYXpldl9yZixcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KS5nZXREYXRhKCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFByaXBhZHkgPSB0aGF0LmFkZFByaXBhZChyZXN1bHRQcmlwYWR5LCB2cywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKGNudC5pc2wuRmluUHJpcGFkLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHsgcGxhX3ZzOiB2cyB9LCBmcmFnbWVudHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b0ZyYWdtZW50cy5peHBfdXByLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvRnJhZ21lbnRzLml4cF9kZW5fdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvRnJhZ21lbnRzLnN1Ympla3QgKyBcIi5cIiArIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdFeHRlcm5pU3ViamVrdER0b0ZyYWdtZW50cy5lc3VfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvRnJhZ21lbnRzLnZsYXN0bmlrICsgXCIuXCIgKyBHaW4uSW50ZXJmYWNlLkdGdW5rY25pTWlzdG9EdG9GcmFnbWVudHMubmF6ZXZfcmYsXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRQcmlwYWR5ID0gdGhhdC5hZGRQcmlwYWQocmVzdWx0UHJpcGFkeSwgdnMsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuICQud2hlbi5hcHBseShudWxsLCBwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0b1tdID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0WmFwTGlzdHk/Lkl0ZW1zICYmIHJlc3VsdFphcExpc3R5Py5JdGVtcz8ubGVuZ3RoID4gMCkgcmVzdWx0LnB1c2gocmVzdWx0WmFwTGlzdHkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFByaXBhZHk/Lkl0ZW1zICYmIHJlc3VsdFByaXBhZHk/Lkl0ZW1zPy5sZW5ndGggPiAwKSByZXN1bHQucHVzaChyZXN1bHRQcmlwYWR5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0b30gZmluZGluZyA/Pz9cclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc0l0ZW19IGl0ZW0gem9icmF6b3ZhbsOhIHBvbG/FvmthXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgb3BlbkRldGFpbExvY2FsKGZpbmRpbmc6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvLCBpdGVtOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNJdGVtKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjbnQgPSAkLmNvbnRlbnQoJCgnI21haW4nKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiB1ZMSbbGF0IG7Em2pha8OpIHNwb2xlxI1uw6kgbWV0b2R5IHBybyBvdGV2xZllbsOtIGRldGFpbHUgLSB2b2xhbG8gYnkgc2UgdG8gb2RzdWQgKGEgZGFsxaHDrWNoIGhsZWRhxI1layksIHogZGFzaGJvYXJkdSBhIHogb3RldsWZZW7DrSBtb2R1bHUgcMWZZXMgVVJMXHJcblxyXG4gICAgICAgICAgICAvLyB6b2JyYXplbsOtIGRldGFpbMWvIHBvZGxlIHRvaG8sIG8gamFrw70gdHlwIGpkZVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdCBoaXN0b3JpaSDDusSNdG92w6Fuw60gYSBwb2TDrXZhdCBzZSwgamVzdGxpIGpzb3UgxZllxaFlbnkgaSBkYWzFocOtIGVudGl0eSBqYWtvIHBvaHlieSBhIHBvZG9ibsSbIC0gbmVibyB0byBqZSB2IGppbsOpIG1ldG9kxJs/XHJcbiAgICAgICAgICAgIGlmIChpdGVtLkNvSnNlbVphYyA9PT0gV2ZsLkludGVyZmFjZS5HSWRlbnRpZmlrYXRvckNvSnNlbVphYy5Tb3VwaXNrYVBvaHlidSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc291cGlza2EgcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0dwYyA9IChpdGVtPy5EYXRhSW5mbz8uaXhwX2RlbiA/IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjbnQuZ3BjLCBpdGVtPy5EYXRhSW5mbz8uaXhwX2RlbikgOiBjbnQuZ3BjKTtcclxuICAgICAgICAgICAgICAgIGNudC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICBbJ0dvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxTb3VwaXNreScsIHsgZ3BjOiBuZXdHcGMgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogJ0RldGFpbFNvdXBpc2t5IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogaXRlbS5JeHgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHBEZW46IGl0ZW0/LkRhdGFJbmZvPy5peHBfZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZSh0cnVlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaXRlbS5Db0pzZW1aYWMgPT09IFdmbC5JbnRlcmZhY2UuR0lkZW50aWZpa2F0b3JDb0pzZW1aYWMuWmFwb2N0b3Z5TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gesOhcG/EjXRvdsO9IGxpc3RcclxuICAgICAgICAgICAgICAgIGxldCBuZXdHcGMgPSAoaXRlbT8uRGF0YUluZm8/Lml4cF9kZW4gPyBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoY250LmdwYywgaXRlbT8uRGF0YUluZm8/Lml4cF9kZW4pIDogY250LmdwYyk7XHJcbiAgICAgICAgICAgICAgICBjbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgWydHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsWmFwb2N0b3ZlaG9MaXN0dScsIHsgZ3BjOiBuZXdHcGMgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogJ0RldGFpbFphcG9jdG92ZWhvTGlzdHUjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBpdGVtLkl4eDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cERlbjogaXRlbT8uRGF0YUluZm8/Lml4cF9kZW5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKHRydWUpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpdGVtLkNvSnNlbVphYyA9PT0gV2ZsLkludGVyZmFjZS5HSWRlbnRpZmlrYXRvckNvSnNlbVphYy5GaW5hbmNuaVByaXBhZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcMWZw61wYWRcclxuICAgICAgICAgICAgICAgIGNudC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAnR29yZGljLkZ1Yy5XZWJDbGllbnQuR0RldGFpbFByaXBhZHUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxQcmlwYWR1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cFVwcjogaXRlbS5JeHgxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZSh0cnVlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuZXpuw6Ftw70gdHlwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnLDoWNlbsOtIGluZm9ybWFjZSBvIGRvbcOpbsSbXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldERlZmF1bHREb21haW4oKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0RG9tYWluID0gc3VwZXIuZ2V0RGVmYXVsdERvbWFpbigpO1xyXG4gICAgICAgICAgICBkZWZhdWx0RG9tYWluLmlkID0gXCJGdWNWc0RvbWFpblwiO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdERvbWFpbjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcsOhY2Vuw60gaWQgcmVzb2x2ZXJ1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldERlZmF1bHRJZCgpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBcIkZ1Y1ZzUmVzb2x2ZXJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZsb8W+ZW7DrSBuYWxlemVuw71jaCBwxZnDrXBhZMWvIGRvIHbDvXNsZWRrxa8gaGxlZMOhbsOtXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0b30gcmVzdWx0IHbDvXNsZWRreSBobGVkw6Fuw61cclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdnMgaGxlZGFuw70gdnNcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9bXX0gcHJpcGFkeSBuYWxlemVuw6kgcMWZw61wYWR5XHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvfSB2w71zbGVka3kgaGxlZMOhbsOtIHbEjWV0bsSbIHDFmWlkYW7DvWNoIHDFmcOtcGFkxa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFkZFByaXBhZChyZXN1bHQ6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvLCB2czogc3RyaW5nLCBwcmlwYWR5OiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvW10pOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0byB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzID0gcmVzdWx0IHx8IHsgRmF6ZTogXCJHV0FGVUMwNVwiIH07XHJcbiAgICAgICAgICAgIHJlcy5JdGVtcyA9IHJlcy5JdGVtcyB8fCBbXTtcclxuICAgICAgICAgICAgcHJpcGFkeS5mb3JFYWNoKHByaXBhZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNJbmRleCA9IHJlcy5JdGVtcyEuZmluZEluZGV4KChyZXNJdGVtKSA9PiByZXNJdGVtLkl4eDEgIT0gbnVsbCAmJiBwcmlwYWQuaXhwX3VwciAhPSBudWxsICYmIHJlc0l0ZW0uSXh4MSA9PT0gcHJpcGFkLml4cF91cHIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc0luZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzPy5JdGVtcyAmJiByZXMuSXRlbXNbcmVzSW5kZXhdLkRhdGFJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuSXRlbXNbcmVzSW5kZXhdLkRhdGFJbmZvIS52cyEuZmluZEluZGV4KCh2KSA9PiB2ID09PSB2cykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLkl0ZW1zW3Jlc0luZGV4XS5EYXRhSW5mbyEudnMhLnB1c2godnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLkl0ZW1zPy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHgxOiBwcmlwYWQuaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGFJbmZvOiB7IHZzOiBbdnNdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb0pzZW1aYWM6IEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdJZGVudGlmaWthdG9yQ29Kc2VtWmFjLkZpbmFuY25pUHJpcGFkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwSW5mbzogeyBUeXBBZ2VuZHk6IDMzMCwgRmF6ZTogXCJHV0FGVUMwNVwiLCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmF6ZXY6IHByaXBhZC5wb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhbHNpSW5mb3JtYWNlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBMYWJlbDogXCJLbmloYVwiLCBWYWx1ZTogcHJpcGFkLml4cF9kZW5fdHh0IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBMYWJlbDogXCJSb2tcIiwgVmFsdWU6IHByaXBhZC5yb2shLnRvU3RyaW5nKCkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IExhYmVsOiBcIkV2aWRlbsSNbsOtIMSNw61zbG9cIiwgVmFsdWU6IHByaXBhZC5hYyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiQWdlbmRvdsOpIMSNw61zbG9cIiwgVmFsdWU6IHByaXBhZC5hY19hZyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiWnByYWNvdmF0ZWxcIiwgVmFsdWU6IHByaXBhZC52bGFzdG5paz8ubmF6ZXZfcmYgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IExhYmVsOiBcIlN1Ympla3RcIiwgVmFsdWU6IFwiezB9LCBJxIxPOiB7MX1cIi8qLCBEScSMOiB7Mn0qLy5mb3JtYXQocHJpcGFkLnN1Ympla3Q/LmVzdV90eHQgPz8gXCJcIiwgcHJpcGFkLnN1Ympla3Q/LmljbyA/PyBcIlwiLyosIHByaXBhZC5zdWJqZWt0Py5kaWMgPz8gXCJcIiovKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lcG91xb7DrXQgaXhzX3R5cF90eHQgbmVibyBrdGdfdHlwX3R4dCAobXVzZWx5IGJ5IGFsZSB2IFJlYWQgYsO9dCBwxZnDrXNsdcWhbsOpIGZyYWdtZW50eSkuIEphayBqZSB0byB2IGhsZWTDoW7DrSBQSUR1P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiUG9waXNcIiwgVmFsdWU6IHByaXBhZC5wb3Bpcy8qID8/IFwiWsOhcG/EjXRvdsO9IGxpc3RcIiovIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sgTGFiZWw6IFwiVmFyaWFiaWxuw60gc3ltYm9sXCIsIFZhbHVlOiB6YXBvY3RvdnlMaXN0LnZzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZsb8W+ZW7DrSBuYWxlemVuw71jaCB6w6Fwb8SNdG92w71jaCBsaXN0xa8gZG8gdsO9c2xlZGvFryBobGVkw6Fuw61cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvfSByZXN1bHQgdsO9c2xlZGt5IGhsZWTDoW7DrVxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2cyBobGVkYW7DvSB2c1xyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcG9jdG92eUxpc3REdG9bXX0gemFwb2N0b3ZlTGlzdHkgbmFsZXplbsOpIHrDoXBvxI10b3bDqSBsaXN0eVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0b30gdsO9c2xlZGt5IGhsZWTDoW7DrSB2xI1ldG7EmyBwxZlpZGFuw71jaCB6w6Fwb8SNdG92w71jaCBsaXN0xa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFkZFphcG9jdG92eUxpc3QocmVzdWx0OiBHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0bywgdnM6IHN0cmluZywgemFwb2N0b3ZlTGlzdHk6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBvY3RvdnlMaXN0RHRvW10pOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0byB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzID0gcmVzdWx0IHx8IHsgRmF6ZTogXCJHV0FGVUMwNVwiIH07XHJcbiAgICAgICAgICAgIHJlcy5JdGVtcyA9IHJlcy5JdGVtcyB8fCBbXTtcclxuICAgICAgICAgICAgemFwb2N0b3ZlTGlzdHkuZm9yRWFjaCh6YXBvY3RvdnlMaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc0luZGV4ID0gcmVzLkl0ZW1zIS5maW5kSW5kZXgoKHJlc0l0ZW0pID0+IHJlc0l0ZW0uSXh4MSAhPSBudWxsICYmIHphcG9jdG92eUxpc3QuaXhwICE9IG51bGwgJiYgcmVzSXRlbS5JeHgxID09PSB6YXBvY3RvdnlMaXN0Lml4cCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXM/Lkl0ZW1zICYmIHJlcy5JdGVtc1tyZXNJbmRleF0uRGF0YUluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5JdGVtc1tyZXNJbmRleF0uRGF0YUluZm8hLnZzIS5maW5kSW5kZXgoKHYpID0+IHYgPT09IHZzKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuSXRlbXNbcmVzSW5kZXhdLkRhdGFJbmZvIS52cyEucHVzaCh2cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuSXRlbXM/LnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4eDE6IHphcG9jdG92eUxpc3QuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YUluZm86IHsgdnM6IFt2c10sIGl4cF9kZW46IHphcG9jdG92eUxpc3QuaXhwX2RlbiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29Kc2VtWmFjOiBHb3JkaWMuV2ZsLkludGVyZmFjZS5HSWRlbnRpZmlrYXRvckNvSnNlbVphYy5aYXBvY3RvdnlMaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwSW5mbzogeyBUeXBBZ2VuZHk6IDMzMCwgRmF6ZTogXCJHV0FGVUMwNVwiLCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmF6ZXY6IHphcG9jdG92eUxpc3QucG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYWxzaUluZm9ybWFjZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiS25paGFcIiwgVmFsdWU6IHphcG9jdG92eUxpc3QuaXhwX2Rlbl90eHQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IHJvayBrbmloeSAoYWt0dcOhbG7EmyBzZSBuZXNlbGVrdHVqZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sgTGFiZWw6IFwiUm9rXCIsIFZhbHVlOiB6YXBvY3RvdnlMaXN0LnJvayB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiQWdlbmRvdsOpIMSNw61zbG9cIiwgVmFsdWU6IHphcG9jdG92eUxpc3QuYWNfYWcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IExhYmVsOiBcIkV2aWRlbsSNbsOtIMSNw61zbG9cIiwgVmFsdWU6IHphcG9jdG92eUxpc3QuYWMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IExhYmVsOiBcIlpwcmFjb3ZhdGVsXCIsIFZhbHVlOiB6YXBvY3RvdnlMaXN0LnZsYXN0bmlrPy5uYXpldl9yZiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvcGxuaXQgScSMTyBhIERJxIwgKHBvZGxlIEtERjA1KSAtIGkgcHJvIHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBMYWJlbDogXCJTdWJqZWt0XCIsIFZhbHVlOiBcInswfSwgScSMTzogezF9XCIvKiwgREnEjDogezJ9Ki8uZm9ybWF0KHphcG9jdG92eUxpc3Quc3ViamVrdD8uZXN1X3R4dCA/PyBcIlwiLCB6YXBvY3RvdnlMaXN0LnN1Ympla3Q/LmljbyA/PyBcIlwiLyosIHphcG9jdG92eUxpc3Quc3ViamVrdD8uZGljID8/IFwiXCIqLykgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZXBvdcW+w610IGl4c190eXBfdHh0IG5lYm8ga3RnX3R5cF90eHQgKG11c2VseSBieSBhbGUgdiBSZWFkIGLDvXQgcMWZw61zbHXFoW7DqSBmcmFnbWVudHkpLiBKYWsgamUgdG8gdiBobGVkw6Fuw60gUElEdT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IExhYmVsOiBcIlBvcGlzXCIsIFZhbHVlOiB6YXBvY3RvdnlMaXN0LnBvcGlzLyogPz8gXCJaw6Fwb8SNdG92w70gbGlzdFwiKi8gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sgTGFiZWw6IFwiVmFyaWFiaWxuw60gc3ltYm9sXCIsIFZhbHVlOiB6YXBvY3RvdnlMaXN0LnZzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==