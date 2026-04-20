
(function ($) {
    "use strict";
    namespace("Gordic.Ada.WebClient.GDatovaVetaGridLike", {
        title: "GDatovaVetaLikeGrid",
        onContentReady: function () {

            var formPrefab = Gordic.Eko.WebClient.GPorizovacPrefab(this);

            var _this = this;
            this.defaultForm = new Gordic.Forms
                .Form({ name: "PrefabForm" });

            this.defaultForm.addRow();
            if (!this.hideColumns || this.hideColumns.indexOf("ico") === -1) {
                this.defaultForm.addText("IČO", "right w-L-1 w-M-2 w-S-12");
            }
            if (!this.hideColumns || this.hideColumns.indexOf("ucs") === -1) {
                this.defaultForm.addText("UCS", "right w-L-1 w-M-2 w-S-12");
            }
            if (!this.hideColumns || this.hideColumns.indexOf("nks") === -1) {
                this.defaultForm.addText("NKS", "right w-L-1 w-M-2 w-S-12");
            }
            if (!this.hideColumns || this.hideColumns.indexOf("rok") === -1) {
                this.defaultForm.addText("ROK", "right w-L-1 w-M-2 w-S-12");
            }
            this.datovaVetaKeys.forEach(function (i) {
                (function (index) {
                    _this.defaultForm.addText(_this.datovaVeta.datovaSlova[index].Zkratka, "right w-L-1 w-M-2 w-S-12");
                }(i))
            });
            this.defaultForm.addText("MD", "right w-L-1 w-M-2 w-S-12");
            this.defaultForm.addText("DAL", "right w-L-1 w-M-2 w-S-12");
            this.defaultForm.addRow();
            if (!this.hideColumns || this.hideColumns.indexOf("ico") === -1) {
                this.defaultForm.addField("gselectbox", "w-1", { name: "ico", customClass: "porizovacConfig", model: "ico=", change: function (ev, obj) { _this.changeConfig(); console.log("zmena ico"); } }, Gordic.Prefabs.Select.ekosico());
            }
            if (!this.hideColumns || this.hideColumns.indexOf("ucs") === -1) {
                this.defaultForm.addField("gselectbox", "w-1", { name: "ucs", customClass: "porizovacConfig", change: function (ev, obj) { _this.changeConfig(); console.log("zmena ucs"); }, serverFilters: { ico: _this.model.ico }, model: "model.ucs=value.ucs,model.ico=value.ico" }, Gordic.Prefabs.Select.ekosucs());
            }
            if (!this.hideColumns || this.hideColumns.indexOf("nks") === -1) {
                this.defaultForm.addField("gselectbox", "w-1", Gordic.Prefabs.Select.ekosnks(), { name: "nks", itemTemplate: "{nks:trim:encode}", showSelectButton: false, customClass: "porizovacConfig", change: function (ev, obj) { _this.changeConfig(); console.log("zmena nks"); }, serverFilters: { ico: _this.model.ico }, model: "model.nks=value.nks,model.ico=value.ico" });
            }
            if (!this.hideColumns || this.hideColumns.indexOf("rok") === -1) {
                this.defaultForm.addField("gnumberbox", "w-1", { name: "rok", customClass: "porizovacConfig", change: function (ev, obj) { _this.changeConfig(); console.log("zmena rok"); } });
            }
            for (var index in formPrefab["0"].fields) {
                var porizovaciField = formPrefab["0"].fields[index];
                this.defaultForm.addField(porizovaciField.widget, porizovaciField.layout, porizovaciField.options);
            }

            this.defaultForm
                .addField("gnumberbox", "w-1", { name: "c0" }) // .addRow("MD")
                .addField("gnumberbox", "w-1", { name: "c1" }); //.addRow("DAL")
            //.addPrefab(formPrefab)

            this.commandBar([{
                customClass: "g-button--primary",
                action: new GAction({
                    name: "actChoice", caption: GDlg.mbbOk.text, run: function (ev, obj) { if (_this.isValid()) { _this.close(); }}
                })
            }])

            this.defaultForm.appendTo(this.element);
            this.findFields().gfield("model", "apply", this.model, { initialValues: true });

            var datovaVetaValues = {};
            this.findFields(".gporizovacfield").gfield("model", "collect", datovaVetaValues);
            this.loadInitValueToDatovaVeta(datovaVetaValues);
            this.initReadOnlyFields();


            if (this.datovaVeta.hasMDDal) {
                //this.datovaVeta.drd = 1;
                this.dataService
                    .call("SetMDDalFields", { poradi: this.datovaVeta.lastDatSlovo.Poradi, uroven: this.datovaVeta.lastDatSlovo.UrovenNum, datovaVeta: this.datovaVeta })
                    .done(function (fields) {
                        _this.setMDDalFields(fields.md, fields.dal);
                    })
            }

        },

        changeConfig: function () {
            var fields = this.findFields(".gporizovacfield");
            var fieldIndex;
            var fieldLength = fields.length;
            for (fieldIndex = 0; fieldIndex < fieldLength; fieldIndex++) {

                $(fields[fieldIndex]).gporizovacfield("setReverifyState", false);
            }
        },

        // metoda vyvolání uložení zapisu akce
        UlozZapis: function () {
            console.log("UlozZapis");
            var cislo = "0000000";
            var that = this;
            var $cDiv = $(this.contentDiv);
            //this.contentDiv.showFlash({ label: 'Ukladam akci ' + cislo });
            if ($cDiv.findForms().gform("isValid", true)) {
                //var dto = {};
                $cDiv.findFields().gfield("model", "collect", that.model);
                var srv = new GContent({ className: "Gordic.Ada.WebClient.GSeznamZapisu", serverParams: { rok: that.model.rok, ico: that.model.ico, cislo: that.model.cislo } });
                srv.call("SaveZapis", { dto: that.model })
                    .then(function (data) {
                        console.log("UlozAkci.then", data);
                        that.close({ state: "saved" });
                    });
            } else {
                console.log("UlozAkci", "Validace neprosla");
            }
        },

    }, { extendIntellisense: GContent });
})(jQuery);