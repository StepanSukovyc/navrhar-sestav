namespace Gordic.Sko.WebApp {
    export class GEvidCisSkoResolver extends Gordic.Components.Search.GBaseSearchResolver {

        public modal: boolean = false;

        readonly terms: string[] = [
            'jres:25800234', //RC 25800234 : Záznam o škodě
            'skoda',
            'evidencni cislo',
            'evid cis',
            'doklad',
            'identifikator',
            'ixs'
        ];

        readonly typeGuesser = new GEvidCisSkoGuesser();

        /**
         * Zde vracíme identifikátor resolveru.
         */
        protected getDefaultId() {
            return 'EvidCisSkoResolverId';
        }

        /**
         * Zde vracíme informace o doméně resolveru.
         */
        protected getDefaultDomain() {
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
        protected getResult(input, task) {
            const result: Gordic.Components.Search.IGSearchResolverItem[] = [];

            // Otrimuji text a převedu na upperCase aby uživatel nemusel zadávat pid pouze velkýmy písmeny.
            const inputText = input.text?.trim()?.toUpperCase() ?? undefined;

            // 21.07.2020 - TFeik
            // Odstranění zpomalovače.
            if (task.wasCancelled() || !inputText || !this.typeGuesser.guess(inputText)?.some((value, index, array) => value && value.type === 'evidCis' && value.confidence >= 1)) {
                return result;
            }

            let currentContent = $.content<GContent>();
            var serviceContent = currentContent.createServiceContent("Gordic.Sko.WebApp.GDetailHledaniSkody");

            var filter = Object({ evidencni_cislo: inputText });

            var that = this;

            return serviceContent.call("LoadData", { filter: filter })
                .then(function (data) {
                    if (data == undefined || data == null) return result;

                    data.forEach(function (value) {
                        result.push({
                            domainId: that.domain!.id,
                            defaultAction: new GAction({
                                name: "actDetail",
                                caption: "jres:25800003", //RC 25800003 : Detail
                                icon: "gi-detail",
                                run: function (this: GAction, ev, ctx) {
                                    let currentContent = $.content<GContent>(this);
                                    const cnt = Gordic.Gui.Dialogs.zkontrolujContent(currentContent);

                                    var width = 800;
                                    var height = 500;
                                    //var modal = true;
                                    //(cnt as any).dialogs.showWindow(["Gordic.Sko.WebApp.GDetailSkody", {}], {
                                    //Gordic.Sko.Dialogs.OpenDetail((cnt as any), that.modal, ["Gordic.Sko.WebApp.GDetailSkody", {}], {
                                    Gordic.Sko.Dialogs.OpenDetail((cnt as any), false, ["Gordic.Sko.WebApp.GDetailSkody", {}], {
                                        RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View,
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

    function createItemInformationTable(
        dto: any
    ): string {
        let detailDescriptions: string[] = [];


        detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800005", dto.evid_cislo!)); //RC 25800005 : Evidenční číslo
        var datZji = "—";
        //if (dto.dat_zji != undefined) datZji = moment(dto.dat_zji!).format("DD.MM.YYYY");1.8.2022 - nahrazení momentu
        if (dto.dat_zji != undefined) datZji = Gordic.Templates.Formatters.datetime(dto.dat_zji!, "dd.MM.yyyy");
        detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800006", datZji)); //RC 25800006 : Datum zjištění
        var vyseSkody = "—";
        if (dto.c_celk_sko != undefined) vyseSkody = dto.c_celk_sko.toString();
        detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800011", vyseSkody)); //RC 25800011 : Výše škody

        return '<table style="text-align:left; width:100%;"><tr>{0}</tr></table>'.format(detailDescriptions.join('</tr><tr>'));
    }
}