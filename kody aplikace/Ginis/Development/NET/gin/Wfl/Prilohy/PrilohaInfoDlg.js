(function ($) {
    "use strict";
    namespace("Gordic.Wfl.PrilohaInfoDlg", {
        FullInfo: "",
        data: [],
        DataList: null,
        div: null,

        onContentReady: function () {
            var _this = this;
            this.title = "jres:26225099"; //RC 26225099 : Informace o elektronickém dokumentu
            var l_oDataList = this.DataList;

            this.data = []; // .... nechápu, proč si to pamatuje z predchozich otevreni

            this.commandBar([
                { action: this.actions.actKopirovat, primary: true },
                { action: this.actions.actCancel },
            ]);

            if(this.ContainerCount > 0) {
                var formBaseInfoSettings = new Gordic.Forms
                    .Form({ name: "FormBaseInfo" })
                    .addSection()
                    .addRow()
                    .addText("jres:26228035", "bold"); //RC 26228035 : Soubor typu kontejner. Obsahuje vnořené soubory.

                // vytvoření 1. casti formuláře    
                this.formBaseInfo = $("<div>").appendTo(this.element).gform("createFrom", formBaseInfoSettings);
            }

            var forms = new Array();
            var pomForm = null;

         //   var l_nPomTabNum = 0;
            var l_nMaxPorCislo = new Number(l_oDataList[l_oDataList.length - 1].por_cislo);
            var l_nTabCountFloat = l_nMaxPorCislo / 1000;
         //   var l_nTabCount = Math.floor(l_nTabCountFloat);
            var l_nTabCount = Math.ceil(l_nTabCountFloat);

            this.div = $("<div>").css("display", "flex").css("align-items", "stretch").css("align-content", "stretch").css("flex-wrap", "wrap").appendTo(this.element);
            this.div.width("100%");

            // Kazda zalozka ma prostor 1000 zaznamu - prvni tisic jsou zakladni info, druhy tisic prvni podpis, treti tisic druhy podpis atd.
            for(var i = 0; i < l_nTabCount; i++) {
              //  var l_nPorCislo = new Number(entry.por_cislo);
                var l_sTitle = "jres:26226242"; //RC 26226242 : Základní informace

                if(i > 0) {
                    //l_sTitle = "jres:26225984"; //RC 26225984 : Elektronický podpis
                    l_sTitle = "jres:26226289"; //RC 26226289 : Zabezpečení
                }

                var form = new Gordic.Forms
                    .Form({ name: "FormPRIN" + i, layoutDescriptor: "L1M1S1" })
                    .addSection(l_sTitle);

                var l_oForm = { form: form, text: "" }
                forms.push(l_oForm);
                pomForm = l_oForm;

                var itemData = l_oDataList.filter(function (entry) {
                    var l_nPorCislo = new Number(entry.por_cislo);

                    return (l_nPorCislo > i * 1000) && (l_nPorCislo < (i + 1) * 1000);
                });

                var formData = [];
                var text = "";
                itemData.forEach(function (entry) {
                    //var l_nPorCislo = new Number(entry.por_cislo);
                    var l_sLabelText = entry.par_name.trim();
                    var l_sValueText = entry.par_value;

                    formData.push({ label: l_sLabelText, value: l_sValueText });
                    text += l_sLabelText + ": " + l_sValueText + "\n";
                });

                _this.data.push(formData);

                l_oForm.text = text;
            }

            var i = 0;
            forms.forEach(function (entry) {
                var l_sTitle = "jres:26226242"; //RC 26226242 : Základní informace

                if(i > 0) {
                    //l_sTitle = "jres:26225984"; //RC 26225984 : Elektronický podpis
                    l_sTitle = "jres:26226289"; //RC 26226289 : Zabezpečení
                }

                var divSection = $("<div>").width("45%").css("min-width", "400px")/*.css("max-width", "700px")*/.appendTo(_this.div);
                var divInner = $("<div>").width("95%").css("margin-left", "10px").appendTo(divSection);
                $("<div>").appendTo(divInner).gform("createFrom", entry.form);

                var gridColumnsDefinition = new Gordic.Data.GridFormat()
                    .addTextColumn({
                        name: "label",
                        caption: "jres:26225482", //RC 26225482 : Vlastnost
                        width: 150
                    })
                    .addTextColumn({
                        name: "value",
                        caption: "jres:26226074", //RC 26226074 : Hodnota
                        width: 300
                    });

                var viewData = new Gordic.Data.View(_this.data[i]); //,{key:"ixp"}

                var grid = $("<div>").appendTo(divInner)
                    .ggrid({
                        name: "GridInfoElFile_" + i,
                        data: viewData,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit (defaultne by melo byt toto), full
                        navigationMode: "row", // row, cell
                        searchColumns: ["label", "value"], //sloupce, podle kterych se vyhledava v searchboxu
                        columns: gridColumnsDefinition,
                        showTopPanel: false,
                        showHeaderRow: false,
                        showBottomPanel: false
                    });

                // Naplneni stringu pro pripadne kopirovani do schranky
                _this.FullInfo += "---------------------------\n";
                _this.FullInfo += l_sTitle + "\n";
                _this.FullInfo += "---------------------------\n";

                _this.FullInfo += entry.text + "\n";

                i++;
            });
        },
        CopyClick: function () {
            //window.SetToClipboard(this.FullInfo);
            Gordic.Utils.copyToClipboard(this.FullInfo, this);
        },
        closing: function () {
            var def = $.Deferred();

          //  this.div.remove();

            return def.resolve().promise();
        },
    }, { pure: true });
})(jQuery);