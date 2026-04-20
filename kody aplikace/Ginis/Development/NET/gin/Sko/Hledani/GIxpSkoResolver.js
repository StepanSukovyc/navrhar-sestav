"use strict";
var Gordic;
(function (Gordic) {
    var Sko;
    (function (Sko) {
        var WebApp;
        (function (WebApp) {
            class GIxpSkoResolver extends Gordic.Components.Search.GBaseSearchResolver {
                constructor() {
                    super(...arguments);
                    this.modal = false;
                    this.terms = [
                        'jres:25800234', //RC 25800234 : Záznam o škodě
                        'skoda',
                        'doklad',
                        'identifikator',
                        'ixs'
                    ];
                    this.typeGuesser = new WebApp.GIxpSkoGuesser();
                }
                /**
                 * Zde vracíme identifikátor resolveru.
                 */
                getDefaultId() {
                    return 'IxpSkoResolverId';
                }
                /**
                 * Zde vracíme informace o doméně resolveru.
                 */
                getDefaultDomain() {
                    return {
                        id: 'IxpSkoResolverDomainId',
                        name: 'jres:25800234', //RC 25800234 : Záznam o škodě
                        description: 'jres:25800235', //RC 25800235 : Najít záznam o škodě podle identifikátoru
                        terms: this.terms.toString()
                    };
                }
                /**
                 * Zde na základě vstupního textu nabízíme výsledky hledání.
                 *
                 * @param {any} input
                 * @param {any} task
                 */
                getResult(input, task) {
                    const result = [];
                    // Otrimuji text a převedu na upperCase aby uživatel nemusel zadávat pid pouze velkýmy písmeny.
                    const inputText = input.text?.trim()?.toUpperCase() ?? undefined;
                    // 21.07.2020 - TFeik
                    // Odstranění zpomalovače.
                    if (task.wasCancelled() || !inputText || !this.typeGuesser.guess(inputText)?.some((value, index, array) => value && value.type === 'ixp' && value.confidence >= 1)) {
                        return result;
                    }
                    var that = this;
                    return Gordic.Isl.Skoda.read({
                        ixp: inputText
                    }).getData()
                        .then((data) => {
                        const ixp = data?.ixp;
                        // 21.07.2020 - TFeik
                        // Odstranění zpomalovače.
                        if (!ixp?.trim()) {
                            return result;
                        }
                        // Ve chvíli, kdy byl pid nalezen a jedná se o zásilku               
                        result.push({
                            domainId: this.domain.id,
                            defaultAction: new GAction({
                                name: "actDetail",
                                caption: "jres:25800003", //RC 25800003 : Detail
                                icon: "gi-detail",
                                run: function (ev, ctx) {
                                    let currentContent = $.content(this);
                                    const cnt = Gordic.Gui.Dialogs.zkontrolujContent(currentContent);
                                    var width = 800;
                                    var height = 500;
                                    //var modal = true;
                                    //(cnt as any).dialogs.showWindow(["Gordic.Sko.WebApp.GDetailSkody", {}], {
                                    //Gordic.Sko.Dialogs.OpenDetail((cnt as any), that.modal, ["Gordic.Sko.WebApp.GDetailSkody", {}], {
                                    Gordic.Sko.Dialogs.OpenDetail(cnt, false, ["Gordic.Sko.WebApp.GDetailSkody", {}], {
                                        RezimDetailu: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */,
                                        Ixp: data.ixp,
                                        Id: "detail_skody"
                                        //}, { width: width, height: height, modal: that.modal});                                    
                                    }, { width: width, height: height, modal: false });
                                }
                            }),
                            confidence: 1,
                            name: "jres:25800236", //RC 25800236 : Detail záznamu o škodě
                            icon: "gi-paper",
                            description: data.ixp,
                            detailDescription: createItemInformationTable(data)
                        });
                        return result;
                    });
                }
            }
            WebApp.GIxpSkoResolver = GIxpSkoResolver;
            function createItemInformationTable(dto) {
                let detailDescriptions = [];
                detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800005", dto.evid_cislo)); //RC 25800005 : Evidenční číslo
                var datZji = "—";
                //if (dto.dat_zji != undefined) datZji = moment(dto.dat_zji!).format("DD.MM.YYYY");1.8.2022 - nahrazení momentu
                if (dto.dat_zji != undefined)
                    datZji = Gordic.Templates.Formatters.datetime(dto.dat_zji, "dd.MM.yyyy");
                detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800006", datZji)); //RC 25800006 : Datum zjištění
                var vyseSkody = "—";
                if (dto.mat_c_celk_sko != undefined)
                    vyseSkody = dto.mat_c_celk_sko.toString();
                detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800011", vyseSkody)); //RC 25800011 : Výše škody
                //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800160", dto.ag_cislo!)); //RC 25800160 : Agendové číslo
                //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800005", dto.evid_cislo!)); //RC 25800005 : Evidenční číslo
                //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800047", dto.nks!)); //RC 25800047 : NS
                //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800050", moment(dto.dat_zap!).format("DD.MM.YYYY"))); //RC 25800050 : Datum zápisu
                return '<table style="text-align:left; width:100%;"><tr>{0}</tr></table>'.format(detailDescriptions.join('</tr><tr>'));
            }
        })(WebApp = Sko.WebApp || (Sko.WebApp = {}));
    })(Sko = Gordic.Sko || (Gordic.Sko = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0l4cFNrb1Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0l4cFNrb1Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0E4SGY7QUE5SEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOEhuQjtJQTlIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBOEgxQjtRQTlIb0IsV0FBQSxNQUFNO1lBQ3ZCLE1BQWEsZUFBZ0IsU0FBUSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7Z0JBQWpGOztvQkFFVyxVQUFLLEdBQVksS0FBSyxDQUFDO29CQUVyQixVQUFLLEdBQWE7d0JBQ3ZCLGVBQWUsRUFBRSw4QkFBOEI7d0JBQy9DLE9BQU87d0JBQ1AsUUFBUTt3QkFDUixlQUFlO3dCQUNmLEtBQUs7cUJBQ1IsQ0FBQztvQkFFTyxnQkFBVyxHQUFHLElBQUksT0FBQSxjQUFjLEVBQUUsQ0FBQztnQkF3RmhELENBQUM7Z0JBdEZHOzttQkFFRztnQkFDTyxZQUFZO29CQUNsQixPQUFPLGtCQUFrQixDQUFDO2dCQUM5QixDQUFDO2dCQUVEOzttQkFFRztnQkFDTyxnQkFBZ0I7b0JBQ3RCLE9BQU87d0JBQ0gsRUFBRSxFQUFFLHdCQUF3Qjt3QkFDNUIsSUFBSSxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7d0JBQ3JELFdBQVcsRUFBRSxlQUFlLEVBQUUseURBQXlEO3dCQUN2RixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7cUJBQy9CLENBQUM7Z0JBQ04sQ0FBQztnQkFFRDs7Ozs7bUJBS0c7Z0JBQ08sU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJO29CQUUzQixNQUFNLE1BQU0sR0FBb0QsRUFBRSxDQUFDO29CQUVuRSwrRkFBK0Y7b0JBQy9GLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUks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LCtCQUErQjtnQkFFN0osSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO2dCQUNqQiwrR0FBK0c7Z0JBQy9HLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxTQUFTO29CQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDeEcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLDBEQUEwRCxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtnQkFDbkosSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUNwQixJQUFJLEdBQUcsQ0FBQyxjQUFjLElBQUksU0FBUztvQkFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDL0Usa0JBQWtCLENBQUMsSUFBSSxDQUFDLDBEQUEwRCxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtnQkFFbEosNEpBQTRKO2dCQUM1SiwrSkFBK0o7Z0JBQy9KLDJJQUEySTtnQkFDM0ksc0xBQXNMO2dCQUd0TCxPQUFPLGtFQUFrRSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzSCxDQUFDO1FBQ0wsQ0FBQyxFQTlIb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBOEgxQjtJQUFELENBQUMsRUE5SGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThIbkI7QUFBRCxDQUFDLEVBOUhTLE1BQU0sS0FBTixNQUFNLFFBOEhmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Ta28uV2ViQXBwIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHSXhwU2tvUmVzb2x2ZXIgZXh0ZW5kcyBHb3JkaWMuQ29tcG9uZW50cy5TZWFyY2guR0Jhc2VTZWFyY2hSZXNvbHZlciB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBtb2RhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICByZWFkb25seSB0ZXJtczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgICAgICdqcmVzOjI1ODAwMjM0JywgLy9SQyAyNTgwMDIzNCA6IFrDoXpuYW0gbyDFoWtvZMSbXHJcbiAgICAgICAgICAgICdza29kYScsXHJcbiAgICAgICAgICAgICdkb2tsYWQnLFxyXG4gICAgICAgICAgICAnaWRlbnRpZmlrYXRvcicsXHJcbiAgICAgICAgICAgICdpeHMnXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcmVhZG9ubHkgdHlwZUd1ZXNzZXIgPSBuZXcgR0l4cFNrb0d1ZXNzZXIoKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmRlIHZyYWPDrW1lIGlkZW50aWZpa8OhdG9yIHJlc29sdmVydS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdElkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0l4cFNrb1Jlc29sdmVySWQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmRlIHZyYWPDrW1lIGluZm9ybWFjZSBvIGRvbcOpbsSbIHJlc29sdmVydS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdERvbWFpbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiAnSXhwU2tvUmVzb2x2ZXJEb21haW5JZCcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnanJlczoyNTgwMDIzNCcsIC8vUkMgMjU4MDAyMzQgOiBaw6F6bmFtIG8gxaFrb2TEm1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdqcmVzOjI1ODAwMjM1JywgLy9SQyAyNTgwMDIzNSA6IE5hasOtdCB6w6F6bmFtIG8gxaFrb2TEmyBwb2RsZSBpZGVudGlmaWvDoXRvcnVcclxuICAgICAgICAgICAgICAgIHRlcm1zOiB0aGlzLnRlcm1zLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpkZSBuYSB6w6FrbGFkxJsgdnN0dXBuw61obyB0ZXh0dSBuYWLDrXrDrW1lIHbDvXNsZWRreSBobGVkw6Fuw60uXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IGlucHV0XHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHRhc2tcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0UmVzdWx0KGlucHV0LCB0YXNrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IEdvcmRpYy5Db21wb25lbnRzLlNlYXJjaC5JR1NlYXJjaFJlc29sdmVySXRlbVtdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBPdHJpbXVqaSB0ZXh0IGEgcMWZZXZlZHUgbmEgdXBwZXJDYXNlIGFieSB1xb5pdmF0ZWwgbmVtdXNlbCB6YWTDoXZhdCBwaWQgcG91emUgdmVsa8O9bXkgcMOtc21lbnkuXHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0VGV4dCA9IGlucHV0LnRleHQ/LnRyaW0oKT8udG9VcHBlckNhc2UoKSA/PyB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyAyMS4wNy4yMDIwIC0gVEZlaWtcclxuICAgICAgICAgICAgLy8gT2RzdHJhbsSbbsOtIHpwb21hbG92YcSNZS5cclxuICAgICAgICAgICAgaWYgKHRhc2sud2FzQ2FuY2VsbGVkKCkgfHwgIWlucHV0VGV4dCB8fCAhdGhpcy50eXBlR3Vlc3Nlci5ndWVzcyhpbnB1dFRleHQpPy5zb21lKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB2YWx1ZSAmJiB2YWx1ZS50eXBlID09PSAnaXhwJyAmJiB2YWx1ZS5jb25maWRlbmNlID49IDEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5Ta29kYS5yZWFkKHtcclxuICAgICAgICAgICAgICAgIGl4cDogaW5wdXRUZXh0XHJcbiAgICAgICAgICAgIH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpeHAgPSBkYXRhPy5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMjEuMDcuMjAyMCAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT2RzdHJhbsSbbsOtIHpwb21hbG92YcSNZS5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl4cD8udHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBWZSBjaHbDrWxpLCBrZHkgYnlsIHBpZCBuYWxlemVuIGEgamVkbsOhIHNlIG8gesOhc2lsa3UgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbWFpbklkOiB0aGlzLmRvbWFpbiEuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjU4MDAwMDNcIiwgLy9SQyAyNTgwMDAwMyA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudCA9ICQuY29udGVudDxHQ29udGVudD4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY250ID0gR29yZGljLkd1aS5EaWFsb2dzLnprb250cm9sdWpDb250ZW50KGN1cnJlbnRDb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IDgwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gNTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIG1vZGFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyhjbnQgYXMgYW55KS5kaWFsb2dzLnNob3dXaW5kb3coW1wiR29yZGljLlNrby5XZWJBcHAuR0RldGFpbFNrb2R5XCIsIHt9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLlNrby5EaWFsb2dzLk9wZW5EZXRhaWwoKGNudCBhcyBhbnkpLCB0aGF0Lm1vZGFsLCBbXCJHb3JkaWMuU2tvLldlYkFwcC5HRGV0YWlsU2tvZHlcIiwge31dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlNrby5EaWFsb2dzLk9wZW5EZXRhaWwoKGNudCBhcyBhbnkpLCBmYWxzZSwgW1wiR29yZGljLlNrby5XZWJBcHAuR0RldGFpbFNrb2R5XCIsIHt9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IGRhdGEuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfc2tvZHlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBtb2RhbDogdGhhdC5tb2RhbH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgbW9kYWw6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImpyZXM6MjU4MDAyMzZcIiwgLy9SQyAyNTgwMDIzNiA6IERldGFpbCB6w6F6bmFtdSBvIMWha29kxJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wYXBlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbERlc2NyaXB0aW9uOiBjcmVhdGVJdGVtSW5mb3JtYXRpb25UYWJsZShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtSW5mb3JtYXRpb25UYWJsZShcclxuICAgICAgICBkdG86IFNrby5JbnRlcmZhY2UuR1Nrb2RhRHRvXHJcbiAgICApOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBkZXRhaWxEZXNjcmlwdGlvbnM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGRldGFpbERlc2NyaXB0aW9ucy5wdXNoKCc8dGQgc3R5bGU9XCJ0ZXh0LWFsaWduOmVuZDtcIj57MH06PC90ZD48dGQ+PGI+ezF9PC9iPjwvdGQ+Jy5mb3JtYXQoXCJqcmVzOjI1ODAwMDA1XCIsIGR0by5ldmlkX2Npc2xvISkpOyAvL1JDIDI1ODAwMDA1IDogRXZpZGVuxI1uw60gxI3DrXNsb1xyXG5cclxuICAgICAgICB2YXIgZGF0WmppID0gXCLigJRcIjtcclxuICAgICAgICAvL2lmIChkdG8uZGF0X3pqaSAhPSB1bmRlZmluZWQpIGRhdFpqaSA9IG1vbWVudChkdG8uZGF0X3pqaSEpLmZvcm1hdChcIkRELk1NLllZWVlcIik7MS44LjIwMjIgLSBuYWhyYXplbsOtIG1vbWVudHVcclxuICAgICAgICBpZiAoZHRvLmRhdF96amkgIT0gdW5kZWZpbmVkKSBkYXRaamkgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoZHRvLmRhdF96amkhLCBcImRkLk1NLnl5eXlcIik7XHJcbiAgICAgICAgZGV0YWlsRGVzY3JpcHRpb25zLnB1c2goJzx0ZCBzdHlsZT1cInRleHQtYWxpZ246ZW5kO1wiPnswfTo8L3RkPjx0ZD48Yj57MX08L2I+PC90ZD4nLmZvcm1hdChcImpyZXM6MjU4MDAwMDZcIiwgZGF0WmppKSk7IC8vUkMgMjU4MDAwMDYgOiBEYXR1bSB6amnFoXTEm27DrVxyXG4gICAgICAgIHZhciB2eXNlU2tvZHkgPSBcIuKAlFwiO1xyXG4gICAgICAgIGlmIChkdG8ubWF0X2NfY2Vsa19za28gIT0gdW5kZWZpbmVkKSB2eXNlU2tvZHkgPSBkdG8ubWF0X2NfY2Vsa19za28udG9TdHJpbmcoKTtcclxuICAgICAgICBkZXRhaWxEZXNjcmlwdGlvbnMucHVzaCgnPHRkIHN0eWxlPVwidGV4dC1hbGlnbjplbmQ7XCI+ezB9OjwvdGQ+PHRkPjxiPnsxfTwvYj48L3RkPicuZm9ybWF0KFwianJlczoyNTgwMDAxMVwiLCB2eXNlU2tvZHkpKTsgLy9SQyAyNTgwMDAxMSA6IFbDvcWhZSDFoWtvZHlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vZGV0YWlsRGVzY3JpcHRpb25zLnB1c2goJzx0ZCBzdHlsZT1cInRleHQtYWxpZ246ZW5kO1wiPnswfTo8L3RkPjx0ZD48Yj57MX08L2I+PC90ZD4nLmZvcm1hdChcImpyZXM6MjU4MDAxNjBcIiwgZHRvLmFnX2Npc2xvISkpOyAvL1JDIDI1ODAwMTYwIDogQWdlbmRvdsOpIMSNw61zbG9cclxuICAgICAgICAvL2RldGFpbERlc2NyaXB0aW9ucy5wdXNoKCc8dGQgc3R5bGU9XCJ0ZXh0LWFsaWduOmVuZDtcIj57MH06PC90ZD48dGQ+PGI+ezF9PC9iPjwvdGQ+Jy5mb3JtYXQoXCJqcmVzOjI1ODAwMDA1XCIsIGR0by5ldmlkX2Npc2xvISkpOyAvL1JDIDI1ODAwMDA1IDogRXZpZGVuxI1uw60gxI3DrXNsb1xyXG4gICAgICAgIC8vZGV0YWlsRGVzY3JpcHRpb25zLnB1c2goJzx0ZCBzdHlsZT1cInRleHQtYWxpZ246ZW5kO1wiPnswfTo8L3RkPjx0ZD48Yj57MX08L2I+PC90ZD4nLmZvcm1hdChcImpyZXM6MjU4MDAwNDdcIiwgZHRvLm5rcyEpKTsgLy9SQyAyNTgwMDA0NyA6IE5TXHJcbiAgICAgICAgLy9kZXRhaWxEZXNjcmlwdGlvbnMucHVzaCgnPHRkIHN0eWxlPVwidGV4dC1hbGlnbjplbmQ7XCI+ezB9OjwvdGQ+PHRkPjxiPnsxfTwvYj48L3RkPicuZm9ybWF0KFwianJlczoyNTgwMDA1MFwiLCBtb21lbnQoZHRvLmRhdF96YXAhKS5mb3JtYXQoXCJERC5NTS5ZWVlZXCIpKSk7IC8vUkMgMjU4MDAwNTAgOiBEYXR1bSB6w6FwaXN1XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHJldHVybiAnPHRhYmxlIHN0eWxlPVwidGV4dC1hbGlnbjpsZWZ0OyB3aWR0aDoxMDAlO1wiPjx0cj57MH08L3RyPjwvdGFibGU+Jy5mb3JtYXQoZGV0YWlsRGVzY3JpcHRpb25zLmpvaW4oJzwvdHI+PHRyPicpKTtcclxuICAgIH1cclxufSJdfQ==