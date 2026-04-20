"use strict";
var Gordic;
(function (Gordic) {
    var Search;
    (function (Search) {
        var Fuc;
        (function (Fuc) {
            /**
             * Hledání VS
             *
             * @author Martin Boček
             * @since 488.1.0.79
             */
            class GFucVsSearchResolver extends Gordic.Search.Eko.GEkoVsSearchResolver {
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
                                    { Label: "Agendové číslo", Value: pripad.ac_ag },
                                    { Label: "Evidenční číslo", Value: pripad.ac },
                                    //{ Label: "Kniha", Value: pripad.ixp_den_txt },
                                    //{ Label: "Rok", Value: pripad.rok!.toString() },
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
            Fuc.GFucVsSearchResolver = GFucVsSearchResolver;
        })(Fuc = Search.Fuc || (Search.Fuc = {}));
    })(Search = Gordic.Search || (Gordic.Search = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Z1Y1ZzU2VhcmNoUmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRnVjVnNTZWFyY2hSZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBa1FmO0FBbFFELFdBQVUsTUFBTTtJQUFDLElBQUEsTUFBTSxDQWtRdEI7SUFsUWdCLFdBQUEsTUFBTTtRQUFDLElBQUEsR0FBRyxDQWtRMUI7UUFsUXVCLFdBQUEsR0FBRztZQUV2Qjs7Ozs7ZUFLRztZQUNILE1BQWEsb0JBQXFCLFNBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CO2dCQUU1RTs7Ozs7bUJBS0c7Z0JBQ08sV0FBVyxDQUFDLE1BQWdCO29CQUVsQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBRWxDLElBQUksY0FBeUQsQ0FBQztvQkFDOUQsSUFBSSxhQUF3RCxDQUFDO29CQUU3RCxJQUFJLFFBQVEsR0FBeUIsRUFBRSxDQUFDO29CQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUNoQixrQkFBa0I7d0JBQ2xCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzRCQUNyQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFOzs7Z0NBR2hDLDBFQUEwRCxHQUFHLDJFQUEyRDtnQ0FDeEgsNEVBQTJELEdBQUcsNkRBQW1EOzZCQUNwSDt5QkFDSixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ3ZCLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxJQUFJ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QUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFO29DQUNqRSx1REFBdUQ7b0NBQ3ZELEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFBLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLElBQUksRUFBRSxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQSxzQ0FBc0MsQ0FBQyxFQUFFO29DQUMvSyx3SEFBd0g7b0NBQ3hILEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQSx3QkFBd0IsRUFBRTtvQ0FDdEUsMERBQTBEO2lDQUM3RDs2QkFDSixDQUNKLENBQUM7d0JBQ04sQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLEdBQUcsQ0FBQztnQkFDZixDQUFDO2FBRUo7WUF6UFksd0JBQW9CLHVCQXlQaEMsQ0FBQTtRQUNMLENBQUMsRUFsUXVCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtRMUI7SUFBRCxDQUFDLEVBbFFnQixNQUFNLEdBQU4sYUFBTSxLQUFOLGFBQU0sUUFrUXRCO0FBQUQsQ0FBQyxFQWxRUyxNQUFNLEtBQU4sTUFBTSxRQWtRZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU2VhcmNoLkZ1YyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIbGVkw6Fuw60gVlNcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0ODguMS4wLjc5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHRnVjVnNTZWFyY2hSZXNvbHZlciBleHRlbmRzIEdvcmRpYy5TZWFyY2guRWtvLkdFa29Wc1NlYXJjaFJlc29sdmVyIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGxlZMOhbsOtIFZTXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmdbXX0gdnNMaXN0IHNlem5hbSBobGVkYW7DvWNoIFZTXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvW10+fSBuYWxlemVuw6kgesOhem5hbXlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZmluZEZvckxpc3QodnNMaXN0OiBzdHJpbmdbXSk6IEpRdWVyeS5Qcm9taXNlPEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvW10+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNudCA9ICQuY29udGVudCgkKCcjbWFpbicpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXN1bHRaYXBMaXN0eTogR29yZGljLkVrby5JbnRlcmZhY2UuR1NlYXJjaFZzUmVzcG9uc2VEdG87XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRQcmlwYWR5OiBHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0bztcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm9taXNlczogSlF1ZXJ5UHJvbWlzZTxhbnk+W10gPSBbXTtcclxuICAgICAgICAgICAgdnNMaXN0LmZvckVhY2godnMgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gesOhcG/EjXRvdsOpIGxpc3R5XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKGNudC5pc2wuWmFwb2N0b3Z5TGlzdC5saXN0KHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7IHBvbF92czogdnMgfSwgZnJhZ21lbnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBvY3RvdnlMaXN0RHRvRnJhZ21lbnRzLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcG9jdG92eUxpc3REdG9GcmFnbWVudHMuaXhwX2Rlbl90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBvY3RvdnlMaXN0RHRvRnJhZ21lbnRzLnN1Ympla3QgKyBcIi5cIiArIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdFeHRlcm5pU3ViamVrdER0b0ZyYWdtZW50cy5lc3VfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HWmFwb2N0b3Z5TGlzdER0b0ZyYWdtZW50cy52bGFzdG5payArIFwiLlwiICsgR2luLkludGVyZmFjZS5HRnVua2NuaU1pc3RvRHRvRnJhZ21lbnRzLm5hemV2X3JmLFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pLmdldERhdGEoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WmFwTGlzdHkgPSB0aGF0LmFkZFphcG9jdG92eUxpc3QocmVzdWx0WmFwTGlzdHksIHZzLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwxZnDrXBhZHkgKCsgcG9ieWJ5IGEgcGxhdGJ5KVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogcMWZaWRhdCBpIG15bG7DqSBwbGF0Ynk/XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKGNudC5pc2wuRmluUHJpcGFkLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHsgdnM6IHZzIH0sIGZyYWdtZW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvRnJhZ21lbnRzLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9GcmFnbWVudHMuaXhwX2Rlbl90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9GcmFnbWVudHMuc3ViamVrdCArIFwiLlwiICsgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR0V4dGVybmlTdWJqZWt0RHRvRnJhZ21lbnRzLmVzdV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9GcmFnbWVudHMudmxhc3RuaWsgKyBcIi5cIiArIEdpbi5JbnRlcmZhY2UuR0Z1bmtjbmlNaXN0b0R0b0ZyYWdtZW50cy5uYXpldl9yZixcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KS5nZXREYXRhKCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFByaXBhZHkgPSB0aGF0LmFkZFByaXBhZChyZXN1bHRQcmlwYWR5LCB2cywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKGNudC5pc2wuRmluUHJpcGFkLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHsgdXBvX3ZzOiB2cyB9LCBmcmFnbWVudHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b0ZyYWdtZW50cy5peHBfdXByLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvRnJhZ21lbnRzLml4cF9kZW5fdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvRnJhZ21lbnRzLnN1Ympla3QgKyBcIi5cIiArIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdFeHRlcm5pU3ViamVrdER0b0ZyYWdtZW50cy5lc3VfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvRnJhZ21lbnRzLnZsYXN0bmlrICsgXCIuXCIgKyBHaW4uSW50ZXJmYWNlLkdGdW5rY25pTWlzdG9EdG9GcmFnbWVudHMubmF6ZXZfcmYsXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRQcmlwYWR5ID0gdGhhdC5hZGRQcmlwYWQocmVzdWx0UHJpcGFkeSwgdnMsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChjbnQuaXNsLkZpblByaXBhZC5saXN0KHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7IHBsYV92czogdnMgfSwgZnJhZ21lbnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9GcmFnbWVudHMuaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b0ZyYWdtZW50cy5peHBfZGVuX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b0ZyYWdtZW50cy5zdWJqZWt0ICsgXCIuXCIgKyBHb3JkaWMuRnVjLkludGVyZmFjZS5HRXh0ZXJuaVN1Ympla3REdG9GcmFnbWVudHMuZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b0ZyYWdtZW50cy52bGFzdG5payArIFwiLlwiICsgR2luLkludGVyZmFjZS5HRnVua2NuaU1pc3RvRHRvRnJhZ21lbnRzLm5hemV2X3JmLFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pLmdldERhdGEoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0UHJpcGFkeSA9IHRoYXQuYWRkUHJpcGFkKHJlc3VsdFByaXBhZHksIHZzLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiAkLndoZW4uYXBwbHkobnVsbCwgcHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogR29yZGljLkVrby5JbnRlcmZhY2UuR1NlYXJjaFZzUmVzcG9uc2VEdG9bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFphcExpc3R5Py5JdGVtcyAmJiByZXN1bHRaYXBMaXN0eT8uSXRlbXM/Lmxlbmd0aCA+IDApIHJlc3VsdC5wdXNoKHJlc3VsdFphcExpc3R5KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRQcmlwYWR5Py5JdGVtcyAmJiByZXN1bHRQcmlwYWR5Py5JdGVtcz8ubGVuZ3RoID4gMCkgcmVzdWx0LnB1c2gocmVzdWx0UHJpcGFkeSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkVrby5JbnRlcmZhY2UuR1NlYXJjaFZzUmVzcG9uc2VEdG99IGZpbmRpbmcgPz8/XHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNJdGVtfSBpdGVtIHpvYnJhem92YW7DoSBwb2xvxb5rYVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG9wZW5EZXRhaWxMb2NhbChmaW5kaW5nOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0bywgaXRlbTogR29yZGljLkVrby5JbnRlcmZhY2UuR1NlYXJjaFZzSXRlbSk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY250ID0gJC5jb250ZW50KCQoJyNtYWluJykpO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogdWTEm2xhdCBuxJtqYWvDqSBzcG9sZcSNbsOpIG1ldG9keSBwcm8gb3RldsWZZW7DrSBkZXRhaWx1IC0gdm9sYWxvIGJ5IHNlIHRvIG9kc3VkIChhIGRhbMWhw61jaCBobGVkYcSNZWspLCB6IGRhc2hib2FyZHUgYSB6IG90ZXbFmWVuw60gbW9kdWx1IHDFmWVzIFVSTFxyXG5cclxuICAgICAgICAgICAgLy8gem9icmF6ZW7DrSBkZXRhaWzFryBwb2RsZSB0b2hvLCBvIGpha8O9IHR5cCBqZGVcclxuICAgICAgICAgICAgLy8gVE9ETzogZG9kxJtsYXQgaGlzdG9yaWkgw7rEjXRvdsOhbsOtIGEgcG9kw612YXQgc2UsIGplc3RsaSBqc291IMWZZcWhZW55IGkgZGFsxaHDrSBlbnRpdHkgamFrbyBwb2h5YnkgYSBwb2RvYm7EmyAtIG5lYm8gdG8gamUgdiBqaW7DqSBtZXRvZMSbP1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5Db0pzZW1aYWMgPT09IFdmbC5JbnRlcmZhY2UuR0lkZW50aWZpa2F0b3JDb0pzZW1aYWMuU291cGlza2FQb2h5YnUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNvdXBpc2thIHBvaHlixa9cclxuICAgICAgICAgICAgICAgIGxldCBuZXdHcGMgPSAoaXRlbT8uRGF0YUluZm8/Lml4cF9kZW4gPyBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoY250LmdwYywgaXRlbT8uRGF0YUluZm8/Lml4cF9kZW4pIDogY250LmdwYyk7XHJcbiAgICAgICAgICAgICAgICBjbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgWydHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsU291cGlza3knLCB7IGdwYzogbmV3R3BjIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxTb3VwaXNreSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHA6IGl0ZW0uSXh4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXhwRGVuOiBpdGVtPy5EYXRhSW5mbz8uaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUodHJ1ZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0uQ29Kc2VtWmFjID09PSBXZmwuSW50ZXJmYWNlLkdJZGVudGlmaWthdG9yQ29Kc2VtWmFjLlphcG9jdG92eUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIC8vIHrDoXBvxI10b3bDvSBsaXN0XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3R3BjID0gKGl0ZW0/LkRhdGFJbmZvPy5peHBfZGVuID8gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGNudC5ncGMsIGl0ZW0/LkRhdGFJbmZvPy5peHBfZGVuKSA6IGNudC5ncGMpO1xyXG4gICAgICAgICAgICAgICAgY250Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFsnR29yZGljLkZ1Yy5XZWJDbGllbnQuR0RldGFpbFphcG9jdG92ZWhvTGlzdHUnLCB7IGdwYzogbmV3R3BjIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxaYXBvY3RvdmVob0xpc3R1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogaXRlbS5JeHgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHBEZW46IGl0ZW0/LkRhdGFJbmZvPy5peHBfZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZSh0cnVlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaXRlbS5Db0pzZW1aYWMgPT09IFdmbC5JbnRlcmZhY2UuR0lkZW50aWZpa2F0b3JDb0pzZW1aYWMuRmluYW5jbmlQcmlwYWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICBjbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0dvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxQcmlwYWR1JyxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsUHJpcGFkdSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHBVcHI6IGl0ZW0uSXh4MVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUodHJ1ZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gbmV6bsOhbcO9IHR5cFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKGZhbHNlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyw6FjZW7DrSBpbmZvcm1hY2UgbyBkb23DqW7Em1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXREZWZhdWx0RG9tYWluKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdERvbWFpbiA9IHN1cGVyLmdldERlZmF1bHREb21haW4oKTtcclxuICAgICAgICAgICAgZGVmYXVsdERvbWFpbi5pZCA9IFwiRnVjVnNEb21haW5cIjtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHREb21haW47XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnLDoWNlbsOtIGlkIHJlc29sdmVydVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXREZWZhdWx0SWQoKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gXCJGdWNWc1Jlc29sdmVyXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWbG/FvmVuw60gbmFsZXplbsO9Y2ggcMWZw61wYWTFryBkbyB2w71zbGVka8WvIGhsZWTDoW7DrVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkVrby5JbnRlcmZhY2UuR1NlYXJjaFZzUmVzcG9uc2VEdG99IHJlc3VsdCB2w71zbGVka3kgaGxlZMOhbsOtXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHZzIGhsZWRhbsO9IHZzXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvW119IHByaXBhZHkgbmFsZXplbsOpIHDFmcOtcGFkeVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0b30gdsO9c2xlZGt5IGhsZWTDoW7DrSB2xI1ldG7EmyBwxZlpZGFuw71jaCBwxZnDrXBhZMWvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBhZGRQcmlwYWQocmVzdWx0OiBHb3JkaWMuRWtvLkludGVyZmFjZS5HU2VhcmNoVnNSZXNwb25zZUR0bywgdnM6IHN0cmluZywgcHJpcGFkeTogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b1tdKTogR29yZGljLkVrby5JbnRlcmZhY2UuR1NlYXJjaFZzUmVzcG9uc2VEdG8ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcyA9IHJlc3VsdCB8fCB7IEZhemU6IFwiR1dBRlVDMDVcIiB9O1xyXG4gICAgICAgICAgICByZXMuSXRlbXMgPSByZXMuSXRlbXMgfHwgW107XHJcbiAgICAgICAgICAgIHByaXBhZHkuZm9yRWFjaChwcmlwYWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzSW5kZXggPSByZXMuSXRlbXMhLmZpbmRJbmRleCgocmVzSXRlbSkgPT4gcmVzSXRlbS5JeHgxICE9IG51bGwgJiYgcHJpcGFkLml4cF91cHIgIT0gbnVsbCAmJiByZXNJdGVtLkl4eDEgPT09IHByaXBhZC5peHBfdXByKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcz8uSXRlbXMgJiYgcmVzLkl0ZW1zW3Jlc0luZGV4XS5EYXRhSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLkl0ZW1zW3Jlc0luZGV4XS5EYXRhSW5mbyEudnMhLmZpbmRJbmRleCgodikgPT4gdiA9PT0gdnMpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5JdGVtc1tyZXNJbmRleF0uRGF0YUluZm8hLnZzIS5wdXNoKHZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5JdGVtcz8ucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXh4MTogcHJpcGFkLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhSW5mbzogeyB2czogW3ZzXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29Kc2VtWmFjOiBHb3JkaWMuV2ZsLkludGVyZmFjZS5HSWRlbnRpZmlrYXRvckNvSnNlbVphYy5GaW5hbmNuaVByaXBhZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcEluZm86IHsgVHlwQWdlbmR5OiAzMzAsIEZhemU6IFwiR1dBRlVDMDVcIiwgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hemV2OiBwcmlwYWQucG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYWxzaUluZm9ybWFjZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiQWdlbmRvdsOpIMSNw61zbG9cIiwgVmFsdWU6IHByaXBhZC5hY19hZyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiRXZpZGVuxI1uw60gxI3DrXNsb1wiLCBWYWx1ZTogcHJpcGFkLmFjIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy97IExhYmVsOiBcIktuaWhhXCIsIFZhbHVlOiBwcmlwYWQuaXhwX2Rlbl90eHQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sgTGFiZWw6IFwiUm9rXCIsIFZhbHVlOiBwcmlwYWQucm9rIS50b1N0cmluZygpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBMYWJlbDogXCJacHJhY292YXRlbFwiLCBWYWx1ZTogcHJpcGFkLnZsYXN0bmlrPy5uYXpldl9yZiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiU3ViamVrdFwiLCBWYWx1ZTogXCJ7MH0sIEnEjE86IHsxfVwiLyosIERJxIw6IHsyfSovLmZvcm1hdChwcmlwYWQuc3ViamVrdD8uZXN1X3R4dCA/PyBcIlwiLCBwcmlwYWQuc3ViamVrdD8uaWNvID8/IFwiXCIvKiwgcHJpcGFkLnN1Ympla3Q/LmRpYyA/PyBcIlwiKi8pIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbmVwb3XFvsOtdCBpeHNfdHlwX3R4dCBuZWJvIGt0Z190eXBfdHh0IChtdXNlbHkgYnkgYWxlIHYgUmVhZCBiw710IHDFmcOtc2x1xaFuw6kgZnJhZ21lbnR5KS4gSmFrIGplIHRvIHYgaGxlZMOhbsOtIFBJRHU/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBMYWJlbDogXCJQb3Bpc1wiLCBWYWx1ZTogcHJpcGFkLnBvcGlzLyogPz8gXCJaw6Fwb8SNdG92w70gbGlzdFwiKi8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBMYWJlbDogXCJWYXJpYWJpbG7DrSBzeW1ib2xcIiwgVmFsdWU6IHphcG9jdG92eUxpc3QudnMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmxvxb5lbsOtIG5hbGV6ZW7DvWNoIHrDoXBvxI10b3bDvWNoIGxpc3TFryBkbyB2w71zbGVka8WvIGhsZWTDoW7DrVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkVrby5JbnRlcmZhY2UuR1NlYXJjaFZzUmVzcG9uc2VEdG99IHJlc3VsdCB2w71zbGVka3kgaGxlZMOhbsOtXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHZzIGhsZWRhbsO9IHZzXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRnVjLkludGVyZmFjZS5HWmFwb2N0b3Z5TGlzdER0b1tdfSB6YXBvY3RvdmVMaXN0eSBuYWxlemVuw6kgesOhcG/EjXRvdsOpIGxpc3R5XHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvfSB2w71zbGVka3kgaGxlZMOhbsOtIHbEjWV0bsSbIHDFmWlkYW7DvWNoIHrDoXBvxI10b3bDvWNoIGxpc3TFr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWRkWmFwb2N0b3Z5TGlzdChyZXN1bHQ6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvLCB2czogc3RyaW5nLCB6YXBvY3RvdmVMaXN0eTogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcG9jdG92eUxpc3REdG9bXSk6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdTZWFyY2hWc1Jlc3BvbnNlRHRvIHtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXMgPSByZXN1bHQgfHwgeyBGYXplOiBcIkdXQUZVQzA1XCIgfTtcclxuICAgICAgICAgICAgcmVzLkl0ZW1zID0gcmVzLkl0ZW1zIHx8IFtdO1xyXG4gICAgICAgICAgICB6YXBvY3RvdmVMaXN0eS5mb3JFYWNoKHphcG9jdG92eUxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzSW5kZXggPSByZXMuSXRlbXMhLmZpbmRJbmRleCgocmVzSXRlbSkgPT4gcmVzSXRlbS5JeHgxICE9IG51bGwgJiYgemFwb2N0b3Z5TGlzdC5peHAgIT0gbnVsbCAmJiByZXNJdGVtLkl4eDEgPT09IHphcG9jdG92eUxpc3QuaXhwKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcz8uSXRlbXMgJiYgcmVzLkl0ZW1zW3Jlc0luZGV4XS5EYXRhSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLkl0ZW1zW3Jlc0luZGV4XS5EYXRhSW5mbyEudnMhLmZpbmRJbmRleCgodikgPT4gdiA9PT0gdnMpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5JdGVtc1tyZXNJbmRleF0uRGF0YUluZm8hLnZzIS5wdXNoKHZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5JdGVtcz8ucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXh4MTogemFwb2N0b3Z5TGlzdC5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhSW5mbzogeyB2czogW3ZzXSwgaXhwX2RlbjogemFwb2N0b3Z5TGlzdC5peHBfZGVuIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb0pzZW1aYWM6IEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdJZGVudGlmaWthdG9yQ29Kc2VtWmFjLlphcG9jdG92eUxpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBJbmZvOiB7IFR5cEFnZW5keTogMzMwLCBGYXplOiBcIkdXQUZVQzA1XCIsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYXpldjogemFwb2N0b3Z5TGlzdC5wb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhbHNpSW5mb3JtYWNlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBMYWJlbDogXCJLbmloYVwiLCBWYWx1ZTogemFwb2N0b3Z5TGlzdC5peHBfZGVuX3R4dCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvcGxuaXQgcm9rIGtuaWh5IChha3R1w6FsbsSbIHNlIG5lc2VsZWt0dWplKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBMYWJlbDogXCJSb2tcIiwgVmFsdWU6IHphcG9jdG92eUxpc3Qucm9rIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBMYWJlbDogXCJBZ2VuZG92w6kgxI3DrXNsb1wiLCBWYWx1ZTogemFwb2N0b3Z5TGlzdC5hY19hZyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiRXZpZGVuxI1uw60gxI3DrXNsb1wiLCBWYWx1ZTogemFwb2N0b3Z5TGlzdC5hYyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiWnByYWNvdmF0ZWxcIiwgVmFsdWU6IHphcG9jdG92eUxpc3Qudmxhc3RuaWs/Lm5hemV2X3JmIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBJxIxPIGEgREnEjCAocG9kbGUgS0RGMDUpIC0gaSBwcm8gcMWZw61wYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IExhYmVsOiBcIlN1Ympla3RcIiwgVmFsdWU6IFwiezB9LCBJxIxPOiB7MX1cIi8qLCBEScSMOiB7Mn0qLy5mb3JtYXQoemFwb2N0b3Z5TGlzdC5zdWJqZWt0Py5lc3VfdHh0ID8/IFwiXCIsIHphcG9jdG92eUxpc3Quc3ViamVrdD8uaWNvID8/IFwiXCIvKiwgemFwb2N0b3Z5TGlzdC5zdWJqZWt0Py5kaWMgPz8gXCJcIiovKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lcG91xb7DrXQgaXhzX3R5cF90eHQgbmVibyBrdGdfdHlwX3R4dCAobXVzZWx5IGJ5IGFsZSB2IFJlYWQgYsO9dCBwxZnDrXNsdcWhbsOpIGZyYWdtZW50eSkuIEphayBqZSB0byB2IGhsZWTDoW7DrSBQSUR1P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTGFiZWw6IFwiUG9waXNcIiwgVmFsdWU6IHphcG9jdG92eUxpc3QucG9waXMvKiA/PyBcIlrDoXBvxI10b3bDvSBsaXN0XCIqLyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBMYWJlbDogXCJWYXJpYWJpbG7DrSBzeW1ib2xcIiwgVmFsdWU6IHphcG9jdG92eUxpc3QudnMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19