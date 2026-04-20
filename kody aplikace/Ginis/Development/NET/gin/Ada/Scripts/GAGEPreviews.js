(function ($) {
    namespace("Gordic.Ada.AGEPreviews", {

        _defaultOptions: {
            fromServer: true
        },
        _ukaPreviewGContent: null,


        /**
        * 
        * Builds Preview for UKA detail.
        * 
        * @param {(HTMLElement|JQueryObject)} element - Element to build preview into
        *
        * @param {Object} data - DTO with data
        * @param {string} data.ixp - required key
        * 
        * @param {Object}   [options] - Optional options for building preview.
        * @param {boolean}  [options.fromServer=true] - Download data from server? Default is true.
        */
        buildAGEPreview: function (element, data, options) {
            var currentElement = $(element);

            var opts = $.extend({}, this._defaultOptions, options);
            var resultPromise = $.Deferred(); //promise pro vykreslení náhledu

            var dataPromise = $.Deferred(); //promise pro případné načtení/validace dat
            var dataPromise2 = $.Deferred(); //promise pro druhé načtení/validace dat

            var partialResultPromise = $.Deferred(); //promise pro vykreslení prvního async obsahu
            var partialResultPromise2 = $.Deferred(); //promise pro vykreslení druhého async obsahu

            // původní předaný řádek
            var dataZdroj = data;


            //příprava chlívečků pro async části náhledů
            currentElement.empty().append("<h2 class='g-state-text g-state-active' style='margin: 0.5rem;'>Doklad '" + dataZdroj.ixp + "'</h2><hr style='margin: 0.5rem; opacity: 0.2;'/>");

            var formp = $("<div class='viewMode'>").appendTo(currentElement)
                    .gform("setup", { layoutDescriptor: "L1M1S1, breaks-300-400" })
                        .gformsection("create", "Základní údaje", "secZaklad")
                              .gformrow("addFieldsRow", "Popis").gformtext(dataZdroj.popis, "bold")
                             .gformrow("addFieldsRow", "AC").gformtext(dataZdroj.ac, "bold")
                             .gformrow("addFieldsRow", "AC_SML").gformtext(dataZdroj.ac_sml, "bold")
                        .gformsection("create", "Dodavatelé", "secDodavatele");


            //sekvenčně připravit gridy, data pak doplnit asynchronně           
            var $mainTable_pre = $("<div>").appendTo(formp).ggrid({
                columnMode: "full",

                searchColumns: ["ixs_esu_txt"],
                columns: new Gordic.Data.GridFormat()
                             .addTextColumn({
                                 name: "ico_esu",
                                 caption: "IČ",
                                 width: 100
                             })
                             .addTextColumn({
                                 name: "ixs_esu_txt",
                                 caption: "Subjekt",
                                 width: 150
                             })
                             .addTextColumn({
                                 name: "bu_ci",
                                 caption: "BÚ",
                                 width: 80
                             })
                             .addTextColumn({
                                 name: "sk_ci",
                                 caption: "Banka",
                                 width: 80
                             })
            });


            formp = formp.gformsection("create", "Rozpis", "secRozpis");

            var $mainTable_pre2 = $("<div>").appendTo(formp).ggrid({
                columnMode: "full",

                searchColumns: ["rok"],
                columns: new Gordic.Data.GridFormat()
                             .addNumberColumn({
                                 name: "rok",
                                 caption: "Rok",
                                 width: 50
                             })
                             .addTextColumn({
                                 name: "mena_txt",
                                 caption: "Měna",
                                 width: 50
                             })
                             .addCurrencyColumn({
                                 name: "c_mena",
                                 caption: "Částka měna",
                                 width: 150
                             })

            });


            //ošetření dat
            if (opts.fromServer) {
                // this._ukaPreviewGContent = this._ukaPreviewGContent || new GContent("Gordic.Sml.WebClient.GSmlDetail", Ixp); //vytvoření gcontent a případná recyklace - vytvoří se jen jednou

                var sss = "KUZLP001N2DO";
                //první load
                this._ukaPreviewGContent = new GContent({ className: "Gordic.Sml.WebClient.GSmlDetail", serverParams: { Ixp: sss } }); //vytvoření gcontent

                this._ukaPreviewGContent.call("GetSeznamDodavatelu", { Ixp: sss, ixp: sss }).done(function (newData) { //získání kompletních dat na základě nutných klíčů.
//                this._ukaPreviewGContent.call("GSmlDataDetail", { Ixp: sss, ixp: sss }).done(function (newData) { //získání kompletních dat na základě nutných klíčů.
                    dataPromise.resolve(newData);
                }).fail(dataPromise.reject);

                //druhý load - běží asynchronně oba naráz - nečekají na sebe.
                this._ukaPreviewGContent2 = new GContent({ className: "Gordic.Sml.WebClient.GSmlDetail", serverParams: { Ixp: sss } }); //vytvoření gcontent

                this._ukaPreviewGContent2.call("GetPripad", { Ixp: sss, ixp: sss }).done(function (newData2) { //získání kompletních dat na základě nutných klíčů.
                    dataPromise2.resolve(newData2);
                }).fail(dataPromise2.reject);

            } else {
                dataPromise.resolve(data); // použít předaná data.
                dataPromise2.resolve(data); // použít předaná data.
            }


         
            dataPromise.done(function (dto) {
                
                var view = new Gordic.Data.View(dto); //lze zjednodušit přesunutím těchto dvou řádků do .call.done(  ) a jako partialResult použít dataPromise.
                $mainTable_pre.ggrid("setData", view );

                partialResultPromise.resolve(); //ukončení vykreslení prvního async obsahu

            }).fail(partialResultPromise.reject);


            dataPromise2.done(function (dto2) {

                var view2 = new Gordic.Data.View(dto2);
                $mainTable_pre2.ggrid("setData", view2 );

                partialResultPromise2.resolve(); //ukončení vykreslení druhého async obsahu

            }).fail(partialResultPromise2.reject);

           
            resultPromise.then(function () {
                currentElement.resize().find(".gform-section").children("label").addClass("g-state-text g-state-active");
            });

            //počkat na dokončení všech dílčích resultů
            $.when([partialResultPromise.promise(), partialResultPromise2.promise()]).then(resultPromise.resolve, resultPromise.reject);

            return resultPromise.promise(); // vrácení promise
        }


    });
})(jQuery);
