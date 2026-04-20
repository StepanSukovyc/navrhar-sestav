declare namespace Gordic.Leg.WebClient {
    class GLegPrehledVyuzitiOsUdaju extends GContentBase {
        private grid;
        private filterForm;
        dataView: Data.View<any>;
        FilterDateInterval: Gordic.Wfl.Interface.Lists.WflComboDateIntervalDto;
        FilterDateIntervalMin: Gordic.Wfl.Interface.Lists.WflComboDateIntervalDto;
        completDto: Gordic.Leg.WebClient.GLegPrehledGDPRDto;
        debug: boolean;
        onContentReady(): void;
        loadData(filter: any): JQueryPromise<any>;
        createFilterForm(): Gordic.Forms.Form;
        createGridFormat(): Gordic.Data.GridFormat<Gordic.Leg.WebClient.GLegSeznUcastGdprDto>;
    }
}
