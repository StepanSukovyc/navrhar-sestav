namespace Gordic.Sko.WebApp {
    export class GIxpSkoResolver extends Gordic.Components.Search.GBaseSearchResolver {

        public modal: boolean = false;

        readonly terms: string[] = [
            'jres:25800234', //RC 25800234 : Záznam o škodě
            'skoda',
            'doklad',
            'identifikator',
            'ixs'
        ];

        readonly typeGuesser = new GIxpSkoGuesser();

        /**
         * Zde vracíme identifikátor resolveru.
         */
        protected getDefaultId() {
            return 'IxpSkoResolverId';
        }

        /**
         * Zde vracíme informace o doméně resolveru.
         */
        protected getDefaultDomain() {
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
        protected getResult(input, task) {

            const result: Gordic.Components.Search.IGSearchResolverItem[] = [];

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
                        domainId: this.domain!.id,
                        defaultAction: new GAction({
                            name: "actDetail",
                            caption: "jres:25800003", //RC 25800003 : Detail
                            icon: "gi-detail",
                            run: function (this: GAction,ev, ctx) {
                                let currentContent = $.content<GContent>(this);
                                const cnt = Gordic.Gui.Dialogs.zkontrolujContent(currentContent);
                                                                
                                var width = 800;
                                var height = 500;
                                //var modal = true;
                                //(cnt as any).dialogs.showWindow(["Gordic.Sko.WebApp.GDetailSkody", {}], {
                                //Gordic.Sko.Dialogs.OpenDetail((cnt as any), that.modal, ["Gordic.Sko.WebApp.GDetailSkody", {}], {
                                Gordic.Sko.Dialogs.OpenDetail((cnt as any), false, ["Gordic.Sko.WebApp.GDetailSkody", {}], {
                                    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View,
                                    Ixp: data.ixp,
                                    Id: "detail_skody"
                                //}, { width: width, height: height, modal: that.modal});                                    
                                }, { width: width, height: height, modal: false});
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

    function createItemInformationTable(
        dto: Sko.Interface.GSkodaDto
    ): string {
        let detailDescriptions: string[] = [];

        detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800005", dto.evid_cislo!)); //RC 25800005 : Evidenční číslo

        var datZji = "—";
        //if (dto.dat_zji != undefined) datZji = moment(dto.dat_zji!).format("DD.MM.YYYY");1.8.2022 - nahrazení momentu
        if (dto.dat_zji != undefined) datZji = Gordic.Templates.Formatters.datetime(dto.dat_zji!, "dd.MM.yyyy");
        detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800006", datZji)); //RC 25800006 : Datum zjištění
        var vyseSkody = "—";
        if (dto.mat_c_celk_sko != undefined) vyseSkody = dto.mat_c_celk_sko.toString();
        detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800011", vyseSkody)); //RC 25800011 : Výše škody
                
        //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800160", dto.ag_cislo!)); //RC 25800160 : Agendové číslo
        //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800005", dto.evid_cislo!)); //RC 25800005 : Evidenční číslo
        //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800047", dto.nks!)); //RC 25800047 : NS
        //detailDescriptions.push('<td style="text-align:end;">{0}:</td><td><b>{1}</b></td>'.format("jres:25800050", moment(dto.dat_zap!).format("DD.MM.YYYY"))); //RC 25800050 : Datum zápisu
        

        return '<table style="text-align:left; width:100%;"><tr>{0}</tr></table>'.format(detailDescriptions.join('</tr><tr>'));
    }
}