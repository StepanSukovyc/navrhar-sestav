"use strict";
var Gordic;
(function (Gordic) {
    var Fuc;
    (function (Fuc) {
        var WebClient;
        (function (WebClient) {
            /**
             * Vyhledávač podle PIDu případu
             *
             * @author Martin Boček
             * @since 52530.15
             */
            class GIxpUprSearchResolver extends Gordic.Components.Search.GBaseSearchResolver {
                constructor() {
                    super(...arguments);
                    this.terms = [
                        "Případ",
                        "pripad",
                        "upr",
                        "doklad",
                        "identifikator",
                        "ixp"
                    ];
                    this.typeGuesser = new WebClient.GIxpUprGuesser();
                }
                /**
                 * Vrací identifikátor resolveru
                 */
                getDefaultId() {
                    return "IxpUprResolverId";
                }
                /**
                 * Vrací informace o doméně resolveru
                 */
                getDefaultDomain() {
                    return {
                        id: "IxpUprResolverDomainId",
                        name: "Případ",
                        description: "Najít případ podle identifikátoru",
                        terms: this.terms.toString()
                    };
                }
                /**
                 * Vrací výsledky hledání na základě vstupního textu
                 *
                 * @param {any} input
                 * @param {any} task
                 */
                getResult(input, task) {
                    const result = [];
                    // otrimování textu a převod na upperCase, aby uživatel nemusel zadávat pid pouze velkýmy písmeny
                    const inputText = input.text?.trim()?.toUpperCase() ?? undefined;
                    // odstranění zpomalovače.
                    if (task.wasCancelled() || !inputText || !this.typeGuesser.guess(inputText)?.some((value, index, array) => value && value.type === 'ixp' && value.confidence >= 1)) {
                        return result;
                    }
                    var that = this;
                    return Gordic.Isl.FinPripad.read({
                        ixp_upr: inputText
                    }).getData()
                        .then((data) => {
                        const ixp = data?.ixp_upr;
                        // odstranění zpomalovače.
                        if (!ixp?.trim()) {
                            return result;
                        }
                        // ve chvíli, kdy byl pid nalezen a jedná se o případ
                        result.push({
                            domainId: this.domain.id,
                            defaultAction: new GAction({
                                name: "actDetail",
                                caption: "Otevřít",
                                icon: "gi-arrow",
                                run: function (ev, ctx) {
                                    let currentContent = $.content(this);
                                    const cnt = Gordic.Gui.Dialogs.zkontrolujContent(currentContent);
                                    var that = this;
                                    //var width = 1500;
                                    //var height = 1100;
                                    //var modal = true;
                                    cnt.navigate(["Gordic.Fuc.WebClient.GDetailPripadu", {}], {
                                        ID: "DetailPripadu#",
                                        IxpUpr: ixp,
                                    } /*, { width: width, height: height, modal: modal }*/);
                                }
                            }),
                            confidence: 1,
                            name: "Případ",
                            icon: "gi-paper",
                            description: getDescription(data),
                            detailDescription: createItemInformationTable(data)
                        });
                        return result;
                    });
                }
            }
            WebClient.GIxpUprSearchResolver = GIxpUprSearchResolver;
            /**
             * Vrátí popis vyhledaného případu
             *
             * @param {Gordic.Fuc.Interface.GPripadDto} dto data případu
             * @returns {string} popis
             */
            function getDescription(dto) {
                let desc = dto.ac_ag ?? dto.ixp_upr ?? "";
                if (dto.popis_zkr)
                    desc += "<br>" + dto.popis_zkr;
                return desc;
            }
            /**
             * Vytvoří detailní informace o vyhledaném případu
             *
             * @param {Gordic.Fuc.Interface.GPripadDto} dto data případu
             * @returns {string} detailní informace
             */
            function createItemInformationTable(dto) {
                let detailDescriptions = [];
                detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("Identifikátor", dto.ixp_upr));
                detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("Agendové číslo", dto.ac_ag));
                detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("Evidenční číslo", dto.ac));
                // TODO: pokud by se měl zobrazovat typ dokumentu, kategorie typu dokumentu nebo kategorie případu, tak by se musely texty vyselektovat (buď dodatečně nebo přes list a fragmenty)
                // TODO: název knihy by se musel vyselektovat (obdobně jako poznámka výše)
                //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("Kniha", dto.ixp_den_txt!));
                //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("Rok", dto.rok!));
                if (dto.popis_zkr)
                    detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("Popis", dto.popis_zkr));
                return '<table style="text-align:left; width:100%;"><tr>{0}</tr></table>'.format(detailDescriptions.join('</tr><tr>'));
            }
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0l4cFVwclNlYXJjaFJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0l4cFVwclNlYXJjaFJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0EwSWY7QUExSUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMEluQjtJQTFJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMEk3QjtRQTFJb0IsV0FBQSxTQUFTO1lBRTFCOzs7OztlQUtHO1lBQ0gsTUFBYSxxQkFBc0IsU0FBUSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7Z0JBQXZGOztvQkFFYSxVQUFLLEdBQWE7d0JBQ3ZCLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixLQUFLO3dCQUNMLFFBQVE7d0JBQ1IsZUFBZTt3QkFDZixLQUFLO3FCQUNSLENBQUM7b0JBRU8sZ0JBQVcsR0FBRyxJQUFJLFVBQUEsY0FBYyxFQUFFLENBQUM7Z0JBa0ZoRCxDQUFDO2dCQWhGRzs7bUJBRUc7Z0JBQ08sWUFBWTtvQkFDbEIsT0FBTyxrQkFBa0IsQ0FBQztnQkFDOUIsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ08sZ0JBQWdCO29CQUN0QixPQUFPO3dCQUNILEVBQUUsRUFBRSx3QkFBd0I7d0JBQzVCLElBQUksRUFBRSxRQUFRO3dCQUNkLFdBQVcsRUFBRSxtQ0FBbUM7d0JBQ2hELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtxQkFDL0IsQ0FBQztnQkFDTixDQUFDO2dCQUVEOzs7OzttQkFLRztnQkFDTyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUk7b0JBRTNCLE1BQU0sTUFBTSxHQUFvRCxFQUFFLENBQUM7b0JBRW5FLGlHQUFpRztvQkFDakcsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxTQUFTLENBQUM7b0JBRWpFLDBCQUEwQjtv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QUMsSUFBSSxDQUFDLDBEQUEwRCxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsS0FBTSxDQUFDLENBQUMsQ0FBQztnQkFDekgsa0JBQWtCLENBQUMsSUFBSSxDQUFDLDBEQUEwRCxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsRUFBRyxDQUFDLENBQUMsQ0FBQztnQkFDdkgsa0xBQWtMO2dCQUNsTCwwRUFBMEU7Z0JBQzFFLHdIQUF3SDtnQkFDeEgsOEdBQThHO2dCQUM5RyxJQUFJLEdBQUcsQ0FBQyxTQUFTO29CQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQywwREFBMEQsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxTQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUV2SSxPQUFPLGtFQUFrRSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzSCxDQUFDO1FBQ0wsQ0FBQyxFQTFJb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMEk3QjtJQUFELENBQUMsRUExSWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTBJbkI7QUFBRCxDQUFDLEVBMUlTLE1BQU0sS0FBTixNQUFNLFFBMElmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5GdWMuV2ViQ2xpZW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZ5aGxlZMOhdmHEjSBwb2RsZSBQSUR1IHDFmcOtcGFkdVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA1MjUzMC4xNVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR0l4cFVwclNlYXJjaFJlc29sdmVyIGV4dGVuZHMgR29yZGljLkNvbXBvbmVudHMuU2VhcmNoLkdCYXNlU2VhcmNoUmVzb2x2ZXIge1xyXG5cclxuICAgICAgICByZWFkb25seSB0ZXJtczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgICAgIFwiUMWZw61wYWRcIixcclxuICAgICAgICAgICAgXCJwcmlwYWRcIixcclxuICAgICAgICAgICAgXCJ1cHJcIixcclxuICAgICAgICAgICAgXCJkb2tsYWRcIixcclxuICAgICAgICAgICAgXCJpZGVudGlmaWthdG9yXCIsXHJcbiAgICAgICAgICAgIFwiaXhwXCJcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICByZWFkb25seSB0eXBlR3Vlc3NlciA9IG5ldyBHSXhwVXByR3Vlc3NlcigpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjw60gaWRlbnRpZmlrw6F0b3IgcmVzb2x2ZXJ1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldERlZmF1bHRJZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiSXhwVXByUmVzb2x2ZXJJZFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY8OtIGluZm9ybWFjZSBvIGRvbcOpbsSbIHJlc29sdmVydVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXREZWZhdWx0RG9tYWluKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiSXhwVXByUmVzb2x2ZXJEb21haW5JZFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJQxZnDrXBhZFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTmFqw610IHDFmcOtcGFkIHBvZGxlIGlkZW50aWZpa8OhdG9ydVwiLFxyXG4gICAgICAgICAgICAgICAgdGVybXM6IHRoaXMudGVybXMudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY8OtIHbDvXNsZWRreSBobGVkw6Fuw60gbmEgesOha2xhZMSbIHZzdHVwbsOtaG8gdGV4dHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gaW5wdXRcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gdGFza1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRSZXN1bHQoaW5wdXQsIHRhc2spIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogR29yZGljLkNvbXBvbmVudHMuU2VhcmNoLklHU2VhcmNoUmVzb2x2ZXJJdGVtW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIG90cmltb3bDoW7DrSB0ZXh0dSBhIHDFmWV2b2QgbmEgdXBwZXJDYXNlLCBhYnkgdcW+aXZhdGVsIG5lbXVzZWwgemFkw6F2YXQgcGlkIHBvdXplIHZlbGvDvW15IHDDrXNtZW55XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0VGV4dCA9IGlucHV0LnRleHQ/LnRyaW0oKT8udG9VcHBlckNhc2UoKSA/PyB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyBvZHN0cmFuxJtuw60genBvbWFsb3ZhxI1lLlxyXG4gICAgICAgICAgICBpZiAodGFzay53YXNDYW5jZWxsZWQoKSB8fCAhaW5wdXRUZXh0IHx8ICF0aGlzLnR5cGVHdWVzc2VyLmd1ZXNzKGlucHV0VGV4dCk/LnNvbWUoKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHZhbHVlICYmIHZhbHVlLnR5cGUgPT09ICdpeHAnICYmIHZhbHVlLmNvbmZpZGVuY2UgPj0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkZpblByaXBhZC5yZWFkKHtcclxuICAgICAgICAgICAgICAgIGl4cF91cHI6IGlucHV0VGV4dFxyXG4gICAgICAgICAgICB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXhwID0gZGF0YT8uaXhwX3VwcjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBvZHN0cmFuxJtuw60genBvbWFsb3ZhxI1lLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXhwPy50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZlIGNodsOtbGksIGtkeSBieWwgcGlkIG5hbGV6ZW4gYSBqZWRuw6Egc2UgbyBwxZnDrXBhZFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tYWluSWQ6IHRoaXMuZG9tYWluIS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT3RldsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWFycm93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICh0aGlzOiBHQWN0aW9uLCBldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRDb250ZW50ID0gJC5jb250ZW50PEdDb250ZW50Pih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbnQgPSBHb3JkaWMuR3VpLkRpYWxvZ3MuemtvbnRyb2x1akNvbnRlbnQoY3VycmVudENvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgd2lkdGggPSAxNTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGhlaWdodCA9IDExMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgbW9kYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbnQgYXMgYW55KS5uYXZpZ2F0ZShbXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsUHJpcGFkdVwiLCB7fV0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRGV0YWlsUHJpcGFkdSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwVXByOiBpeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfS8qLCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIG1vZGFsOiBtb2RhbCB9Ki8pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlkZW5jZTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJQxZnDrXBhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBhcGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBnZXREZXNjcmlwdGlvbihkYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsRGVzY3JpcHRpb246IGNyZWF0ZUl0ZW1JbmZvcm1hdGlvblRhYmxlKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZyw6F0w60gcG9waXMgdnlobGVkYW7DqWhvIHDFmcOtcGFkdVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0dvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG99IGR0byBkYXRhIHDFmcOtcGFkdVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gcG9waXNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oZHRvOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgbGV0IGRlc2MgPSBkdG8uYWNfYWcgPz8gZHRvLml4cF91cHIgPz8gXCJcIjtcclxuICAgICAgICBpZiAoZHRvLnBvcGlzX3prcikgZGVzYyArPSBcIjxicj5cIiArIGR0by5wb3Bpc196a3I7XHJcblxyXG4gICAgICAgIHJldHVybiBkZXNjO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVnl0dm/FmcOtIGRldGFpbG7DrSBpbmZvcm1hY2UgbyB2eWhsZWRhbsOpbSBwxZnDrXBhZHVcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvfSBkdG8gZGF0YSBwxZnDrXBhZHVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGRldGFpbG7DrSBpbmZvcm1hY2VcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbUluZm9ybWF0aW9uVGFibGUoZHRvOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgbGV0IGRldGFpbERlc2NyaXB0aW9uczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgZGV0YWlsRGVzY3JpcHRpb25zLnB1c2goJzx0ZCBzdHlsZT1cInRleHQtYWxpZ246ZW5kO1wiPnswfTo8L3RkPjx0ZD48Yj57MX08L2I+PC90ZD4nLmZvcm1hdChcIklkZW50aWZpa8OhdG9yXCIsIGR0by5peHBfdXByISkpO1xyXG4gICAgICAgIGRldGFpbERlc2NyaXB0aW9ucy5wdXNoKCc8dGQgc3R5bGU9XCJ0ZXh0LWFsaWduOmVuZDtcIj57MH06PC90ZD48dGQ+PGI+ezF9PC9iPjwvdGQ+Jy5mb3JtYXQoXCJBZ2VuZG92w6kgxI3DrXNsb1wiLCBkdG8uYWNfYWchKSk7XHJcbiAgICAgICAgZGV0YWlsRGVzY3JpcHRpb25zLnB1c2goJzx0ZCBzdHlsZT1cInRleHQtYWxpZ246ZW5kO1wiPnswfTo8L3RkPjx0ZD48Yj57MX08L2I+PC90ZD4nLmZvcm1hdChcIkV2aWRlbsSNbsOtIMSNw61zbG9cIiwgZHRvLmFjISkpO1xyXG4gICAgICAgIC8vIFRPRE86IHBva3VkIGJ5IHNlIG3Em2wgem9icmF6b3ZhdCB0eXAgZG9rdW1lbnR1LCBrYXRlZ29yaWUgdHlwdSBkb2t1bWVudHUgbmVibyBrYXRlZ29yaWUgcMWZw61wYWR1LCB0YWsgYnkgc2UgbXVzZWx5IHRleHR5IHZ5c2VsZWt0b3ZhdCAoYnXEjyBkb2RhdGXEjW7EmyBuZWJvIHDFmWVzIGxpc3QgYSBmcmFnbWVudHkpXHJcbiAgICAgICAgLy8gVE9ETzogbsOhemV2IGtuaWh5IGJ5IHNlIG11c2VsIHZ5c2VsZWt0b3ZhdCAob2Jkb2JuxJsgamFrbyBwb3puw6Fta2EgdsO9xaFlKVxyXG4gICAgICAgIC8vZGV0YWlsRGVzY3JpcHRpb25zLnB1c2goJzx0ZCBzdHlsZT1cInRleHQtYWxpZ246ZW5kO1wiPnswfTo8L3RkPjx0ZD48Yj57MX08L2I+PC90ZD4nLmZvcm1hdChcIktuaWhhXCIsIGR0by5peHBfZGVuX3R4dCEpKTtcclxuICAgICAgICAvL2RldGFpbERlc2NyaXB0aW9ucy5wdXNoKCc8dGQgc3R5bGU9XCJ0ZXh0LWFsaWduOmVuZDtcIj57MH06PC90ZD48dGQ+PGI+ezF9PC9iPjwvdGQ+Jy5mb3JtYXQoXCJSb2tcIiwgZHRvLnJvayEpKTtcclxuICAgICAgICBpZiAoZHRvLnBvcGlzX3prcikgZGV0YWlsRGVzY3JpcHRpb25zLnB1c2goJzx0ZCBzdHlsZT1cInRleHQtYWxpZ246ZW5kO1wiPnswfTo8L3RkPjx0ZD48Yj57MX08L2I+PC90ZD4nLmZvcm1hdChcIlBvcGlzXCIsIGR0by5wb3Bpc196a3IhKSk7XHJcblxyXG4gICAgICAgIHJldHVybiAnPHRhYmxlIHN0eWxlPVwidGV4dC1hbGlnbjpsZWZ0OyB3aWR0aDoxMDAlO1wiPjx0cj57MH08L3RyPjwvdGFibGU+Jy5mb3JtYXQoZGV0YWlsRGVzY3JpcHRpb25zLmpvaW4oJzwvdHI+PHRyPicpKTtcclxuICAgIH1cclxufVxyXG4iXX0=