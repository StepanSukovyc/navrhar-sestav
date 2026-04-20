(function ($) {
    "use strict";
    namespace("Gordic.Ssl.NOTR", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26255149"; //RC 26255149 : Nová trasa

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                 .Form({ name: "FormNOTR", layoutDescriptor: "L1M1S1" })
                   .addSection()
                       .addRow("jres:26256689") //RC 26256689 : Trasa
                           .addField("gselectbox", "w-12",
                                Gordic.Prefabs.Select.wflstra(),
                                {
                                    name: "trasaField",
                                    model: "IxsTra = ixs_tra",
                                   /* serverFilters: {
                                        aktivita: [100],
                                    },*/
                                    change: function (ev, data) {
                                        that.ZmenaTrasy(data.value);
                                    }
                                })
                   .addSection();


            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            this.LoadGrid();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addNumberColumn({
                    name: "poradi",
                    caption: "jres:26255472", //RC 26255472 : Pořadí
                    width: 40,
                })
                .addTextColumn({
                    name: "nazev_su",
                    caption: "jres:26255473", //RC 26255473 : Spis. uzel
                    width: 250,
                })
                .addTextColumn({
                    name: "nazev_fun_ref",
                    caption: "jres:26255474", //RC 26255474 : Referent, funkce
                    width: 300,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26255451", //RC 26255451 : Název
                    width: 250,
                });


            that.gridTrasy = $("<div>").appendTo(this.element)
                .css("height", "calc(100% - " + this.defaultForm.height() + "px)")
                .ggrid({
                    name: "GridTrasy",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    searchColumns: ["poradi", "nazev_su", "nazev_fun_ref", "nazev"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });

            //sluzba pro pristup k datum ze serveru //{className:"", params: {}

            this.LoadData();
        },
        LoadData: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            //nacteni dat do gridu
            this.call("SeznamKrokuTrasy", { IxsTra: this.model.IxsTra })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "poradi" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridTrasy.ggrid("setData", view, true);           //true = prekresleni gridu
                });
        },
        Reload: function () {
            this.LoadData();
        },
        ZmenaTrasy: function (IxsTra) {
            this.LoadData();
        },
        OKClick: function () {
            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            var l_oJSONPars = { "Ixp": this.Ixp, "IxsTra": this.model.IxsTra };

            this.call(["NovaTrasa", l_oJSONPars]).done(
                function (data, content) {
                    that.retValue = true;
                    that.tryClose();
                }
            );
        },

        closing: function () {
            var def = $.Deferred();

            if (this.retValue) {
                def.resolve(this.retValue);
            } else {
                def.resolve();
            }

            return def.promise();
        },
    }, { pure: true });
})(jQuery);