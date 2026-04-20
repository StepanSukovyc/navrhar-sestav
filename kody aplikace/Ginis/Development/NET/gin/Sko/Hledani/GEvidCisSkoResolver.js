"use strict";
var Gordic;
(function (Gordic) {
    var Sko;
    (function (Sko) {
        var WebApp;
        (function (WebApp) {
            class GEvidCisSkoResolver extends Gordic.Components.Search.GBaseSearchResolver {
                constructor() {
                    super(...arguments);
                    this.modal = false;
                    this.terms = [
                        'jres:25800234', //RC 25800234 : Záznam o škodě
                        'skoda',
                        'evidencni cislo',
                        'evid cis',
                        'doklad',
                        'identifikator',
                        'ixs'
                    ];
                    this.typeGuesser = new WebApp.GEvidCisSkoGuesser();
                }
                /**
                 * Zde vracíme identifikátor resolveru.
                 */
                getDefaultId() {
                    return 'EvidCisSkoResolverId';
                }
                /**
                 * Zde vracíme informace o doméně resolveru.
                 */
                getDefaultDomain() {
                    return {
                        id: 'EvidCisSkoResolverDomainId',
                        name: 'jres:25800234', //RC 25800234 : Záznam o škodě
                        description: 'jres:25800237', //RC 25800237 : Najít záznam o škodě podle evidenčního čísla
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
                    if (task.wasCancelled() || !inputText || !this.typeGuesser.guess(inputText)?.some((value, index, array) => value && value.type === 'evidCis' && value.confidence >= 1)) {
                        return result;
                    }
                    let currentContent = $.content();
                    var serviceContent = currentContent.createServiceContent("Gordic.Sko.WebApp.GDetailHledaniSkody");
                    var filter = Object({ evidencni_cislo: inputText });
                    var that = this;
                    return serviceContent.call("LoadData", { filter: filter })
                        .then(function (data) {
                        if (data == undefined || data == null)
                            return result;
                        data.forEach(function (value) {
                            result.push({
                                domainId: that.domain.id,
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
                                            Ixp: value.ixp,
                                            Id: "detail_skody"
                                            //}, { width: width, height: height, modal: that.modal });
                                        }, { width: width, height: height, modal: false });
                                    }
                                }),
                                confidence: 1,
                                name: "jres:25800236", //RC 25800236 : Detail záznamu o škodě
                                icon: "gi-paper",
                                description: value.ixp,
                                detailDescription: createItemInformationTable(value)
                            });
                        });
                        return result;
                    });
                }
            }
            WebApp.GEvidCisSkoResolver = GEvidCisSkoResolver;
            function createItemInformationTable(dto) {
                let detailDescriptions = [];
                detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800005", dto.evid_cislo)); //RC 25800005 : Evidenční číslo
                var datZji = "—";
                //if (dto.dat_zji != undefined) datZji = moment(dto.dat_zji!).format("DD.MM.YYYY");1.8.2022 - nahrazení momentu
                if (dto.dat_zji != undefined)
                    datZji = Gordic.Templates.Formatters.datetime(dto.dat_zji, "dd.MM.yyyy");
                detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800006", datZji)); //RC 25800006 : Datum zjištění
                var vyseSkody = "—";
                if (dto.c_celk_sko != undefined)
                    vyseSkody = dto.c_celk_sko.toString();
                detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800011", vyseSkody)); //RC 25800011 : Výše škody
                return '<table style="text-align:left; width:100%;"><tr>{0}</tr></table>'.format(detailDescriptions.join('</tr><tr>'));
            }
        })(WebApp = Sko.WebApp || (Sko.WebApp = {}));
    })(Sko = Gordic.Sko || (Gordic.Sko = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0V2aWRDaXNTa29SZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdFdmlkQ2lzU2tvUmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQXlIZjtBQXpIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5SG5CO0lBekhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0F5SDFCO1FBekhvQixXQUFBLE1BQU07WUFDdkIsTUFBYSxtQkFBb0IsU0FBUSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7Z0JBQXJGOztvQkFFVyxVQUFLLEdBQVksS0FBSyxDQUFDO29CQUVyQixVQUFLLEdBQWE7d0JBQ3ZCLGVBQWUsRUFBRSw4QkFBOEI7d0JBQy9DLE9BQU87d0JBQ1AsaUJBQWlCO3dCQUNqQixVQUFVO3dCQUNWLFFBQVE7d0JBQ1IsZUFBZTt3QkFDZixLQUFLO3FCQUNSLENBQUM7b0JBRU8sZ0JBQVcsR0FBRyxJQUFJLE9BQUEsa0JBQWtCLEVBQUUsQ0FBQztnQkF1RnBELENBQUM7Z0JBckZHOzttQkFFRztnQkFDTyxZQUFZO29CQUNsQixPQUFPLHNCQUFzQixDQUFDO2dCQUNsQyxDQUFDO2dCQUVEOzttQkFFRztnQkFDTyxnQkFBZ0I7b0JBQ3RCLE9BQU87d0JBQ0gsRUFBRSxFQUFFLDRCQUE0Qjt3QkFDaEMsSUFBSSxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7d0JBQ3JELFdBQVcsRUFBRSxlQUFlLEVBQUUsNERBQTREO3dCQUMxRixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7cUJBQy9CLENBQUM7Z0JBQ04sQ0FBQztnQkFFRDs7Ozs7bUJBS0c7Z0JBQ08sU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJO29CQUMzQixNQUFNLE1BQU0sR0FBb0QsRUFBRSxDQUFDO29CQUVuRSwrRkFBK0Y7b0JBQy9GLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJ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ICAgZXhwb3J0IGNsYXNzIEdFdmlkQ2lzU2tvUmVzb2x2ZXIgZXh0ZW5kcyBHb3JkaWMuQ29tcG9uZW50cy5TZWFyY2guR0Jhc2VTZWFyY2hSZXNvbHZlciB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBtb2RhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICByZWFkb25seSB0ZXJtczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgICAgICdqcmVzOjI1ODAwMjM0JywgLy9SQyAyNTgwMDIzNCA6IFrDoXpuYW0gbyDFoWtvZMSbXHJcbiAgICAgICAgICAgICdza29kYScsXHJcbiAgICAgICAgICAgICdldmlkZW5jbmkgY2lzbG8nLFxyXG4gICAgICAgICAgICAnZXZpZCBjaXMnLFxyXG4gICAgICAgICAgICAnZG9rbGFkJyxcclxuICAgICAgICAgICAgJ2lkZW50aWZpa2F0b3InLFxyXG4gICAgICAgICAgICAnaXhzJ1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHJlYWRvbmx5IHR5cGVHdWVzc2VyID0gbmV3IEdFdmlkQ2lzU2tvR3Vlc3NlcigpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaZGUgdnJhY8OtbWUgaWRlbnRpZmlrw6F0b3IgcmVzb2x2ZXJ1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXREZWZhdWx0SWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnRXZpZENpc1Nrb1Jlc29sdmVySWQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmRlIHZyYWPDrW1lIGluZm9ybWFjZSBvIGRvbcOpbsSbIHJlc29sdmVydS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdERvbWFpbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiAnRXZpZENpc1Nrb1Jlc29sdmVyRG9tYWluSWQnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2pyZXM6MjU4MDAyMzQnLCAvL1JDIDI1ODAwMjM0IDogWsOhem5hbSBvIMWha29kxJtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnanJlczoyNTgwMDIzNycsIC8vUkMgMjU4MDAyMzcgOiBOYWrDrXQgesOhem5hbSBvIMWha29kxJsgcG9kbGUgZXZpZGVuxI1uw61obyDEjcOtc2xhXHJcbiAgICAgICAgICAgICAgICB0ZXJtczogdGhpcy50ZXJtcy50b1N0cmluZygpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaZGUgbmEgesOha2xhZMSbIHZzdHVwbsOtaG8gdGV4dHUgbmFiw616w61tZSB2w71zbGVka3kgaGxlZMOhbsOtLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBpbnB1dFxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSB0YXNrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldFJlc3VsdChpbnB1dCwgdGFzaykge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IEdvcmRpYy5Db21wb25lbnRzLlNlYXJjaC5JR1NlYXJjaFJlc29sdmVySXRlbVtdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBPdHJpbXVqaSB0ZXh0IGEgcMWZZXZlZHUgbmEgdXBwZXJDYXNlIGFieSB1xb5pdmF0ZWwgbmVtdXNlbCB6YWTDoXZhdCBwaWQgcG91emUgdmVsa8O9bXkgcMOtc21lbnkuXHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0VGV4dCA9IGlucHV0LnRleHQ/LnRyaW0oKT8udG9VcHBlckNhc2UoKSA/PyB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyAyMS4wNy4yMDIwIC0gVEZlaWtcclxuICAgICAgICAgICAgLy8gT2RzdHJhbsSbbsOtIHpwb21hbG92YcSNZS5cclxuICAgICAgICAgICAgaWYgKHRhc2sud2FzQ2FuY2VsbGVkKCkgfHwgIWlucHV0VGV4dCB8fCAhdGhpcy50eXBlR3Vlc3Nlci5ndWVzcyhpbnB1dFRleHQpPy5zb21lKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB2YWx1ZSAmJiB2YWx1ZS50eXBlID09PSAnZXZpZENpcycgJiYgdmFsdWUuY29uZmlkZW5jZSA+PSAxKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRDb250ZW50ID0gJC5jb250ZW50PEdDb250ZW50PigpO1xyXG4gICAgICAgICAgICB2YXIgc2VydmljZUNvbnRlbnQgPSBjdXJyZW50Q29udGVudC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5Ta28uV2ViQXBwLkdEZXRhaWxIbGVkYW5pU2tvZHlcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gT2JqZWN0KHsgZXZpZGVuY25pX2Npc2xvOiBpbnB1dFRleHQgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnQuY2FsbChcIkxvYWREYXRhXCIsIHsgZmlsdGVyOiBmaWx0ZXIgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkIHx8IGRhdGEgPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21haW5JZDogdGhhdC5kb21haW4hLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1ODAwMDAzXCIsIC8vUkMgMjU4MDAwMDMgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKHRoaXM6IEdBY3Rpb24sIGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRDb250ZW50ID0gJC5jb250ZW50PEdDb250ZW50Pih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY250ID0gR29yZGljLkd1aS5EaWFsb2dzLnprb250cm9sdWpDb250ZW50KGN1cnJlbnRDb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IDgwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IDUwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgbW9kYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyhjbnQgYXMgYW55KS5kaWFsb2dzLnNob3dXaW5kb3coW1wiR29yZGljLlNrby5XZWJBcHAuR0RldGFpbFNrb2R5XCIsIHt9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5Ta28uRGlhbG9ncy5PcGVuRGV0YWlsKChjbnQgYXMgYW55KSwgdGhhdC5tb2RhbCwgW1wiR29yZGljLlNrby5XZWJBcHAuR0RldGFpbFNrb2R5XCIsIHt9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuU2tvLkRpYWxvZ3MuT3BlbkRldGFpbCgoY250IGFzIGFueSksIGZhbHNlLCBbXCJHb3JkaWMuU2tvLldlYkFwcC5HRGV0YWlsU2tvZHlcIiwge31dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB2YWx1ZS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZDogXCJkZXRhaWxfc2tvZHlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgbW9kYWw6IHRoYXQubW9kYWwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgbW9kYWw6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlkZW5jZTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwianJlczoyNTgwMDIzNlwiLCAvL1JDIDI1ODAwMjM2IDogRGV0YWlsIHrDoXpuYW11IG8gxaFrb2TEm1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wYXBlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHZhbHVlLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbERlc2NyaXB0aW9uOiBjcmVhdGVJdGVtSW5mb3JtYXRpb25UYWJsZSh2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbUluZm9ybWF0aW9uVGFibGUoXHJcbiAgICAgICAgZHRvOiBhbnlcclxuICAgICk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGRldGFpbERlc2NyaXB0aW9uczogc3RyaW5nW10gPSBbXTtcclxuXHJcblxyXG4gICAgICAgIGRldGFpbERlc2NyaXB0aW9ucy5wdXNoKCc8dGQgc3R5bGU9XCJ0ZXh0LWFsaWduOmVuZDtcIj57MH06PC90ZD48dGQ+PGI+ezF9PC9iPjwvdGQ+Jy5mb3JtYXQoXCJqcmVzOjI1ODAwMDA1XCIsIGR0by5ldmlkX2Npc2xvISkpOyAvL1JDIDI1ODAwMDA1IDogRXZpZGVuxI1uw60gxI3DrXNsb1xyXG4gICAgICAgIHZhciBkYXRaamkgPSBcIuKAlFwiO1xyXG4gICAgICAgIC8vaWYgKGR0by5kYXRfemppICE9IHVuZGVmaW5lZCkgZGF0WmppID0gbW9tZW50KGR0by5kYXRfemppISkuZm9ybWF0KFwiREQuTU0uWVlZWVwiKTsxLjguMjAyMiAtIG5haHJhemVuw60gbW9tZW50dVxyXG4gICAgICAgIGlmIChkdG8uZGF0X3pqaSAhPSB1bmRlZmluZWQpIGRhdFpqaSA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShkdG8uZGF0X3pqaSEsIFwiZGQuTU0ueXl5eVwiKTtcclxuICAgICAgICBkZXRhaWxEZXNjcmlwdGlvbnMucHVzaCgnPHRkIHN0eWxlPVwidGV4dC1hbGlnbjplbmQ7XCI+ezB9OjwvdGQ+PHRkPjxiPnsxfTwvYj48L3RkPicuZm9ybWF0KFwianJlczoyNTgwMDAwNlwiLCBkYXRaamkpKTsgLy9SQyAyNTgwMDAwNiA6IERhdHVtIHpqacWhdMSbbsOtXHJcbiAgICAgICAgdmFyIHZ5c2VTa29keSA9IFwi4oCUXCI7XHJcbiAgICAgICAgaWYgKGR0by5jX2NlbGtfc2tvICE9IHVuZGVmaW5lZCkgdnlzZVNrb2R5ID0gZHRvLmNfY2Vsa19za28udG9TdHJpbmcoKTtcclxuICAgICAgICBkZXRhaWxEZXNjcmlwdGlvbnMucHVzaCgnPHRkIHN0eWxlPVwidGV4dC1hbGlnbjplbmQ7XCI+ezB9OjwvdGQ+PHRkPjxiPnsxfTwvYj48L3RkPicuZm9ybWF0KFwianJlczoyNTgwMDAxMVwiLCB2eXNlU2tvZHkpKTsgLy9SQyAyNTgwMDAxMSA6IFbDvcWhZSDFoWtvZHlcclxuXHJcbiAgICAgICAgcmV0dXJuICc8dGFibGUgc3R5bGU9XCJ0ZXh0LWFsaWduOmxlZnQ7IHdpZHRoOjEwMCU7XCI+PHRyPnswfTwvdHI+PC90YWJsZT4nLmZvcm1hdChkZXRhaWxEZXNjcmlwdGlvbnMuam9pbignPC90cj48dHI+JykpO1xyXG4gICAgfVxyXG59Il19