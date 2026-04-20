(function ($) {
    "use strict";
    namespace("Gordic.Wfl.PDEA", {
        onContentReady: function () {
            var ixsExtFilter = undefined;

            if(this.FilterIxsExt != null) {
                ixsExtFilter = { o: ["IN"], v: this.FilterIxsExt.replaceAll("'", "").split(',') }
            }

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26225948", ["w-12"]).gselectbox( //RC 26225948 : Externí systém
                                Gordic.Prefabs.Select.intsext(),
                                {
                                    name: "AgendaField",
                                    model: "IxsExt = ixs_ext",
                                    //  validators: [new Gordic.Validators.Required()]

                                    serverFilters: {
                                        priz_ruc_pre_do_ea: this.model.FilterPrizRucPreDoEa ? this.model.FilterPrizRucPreDoEa : undefined,
                                        PovolenDleTypuDokumentuVIntvpty: ((this.gin_extag_pret === 1 ) && this.IxsTyp) ? this.IxsTyp : undefined,
                                        ZodpovednaOsobaDleIxsFun: (this.model.FilterZodpovednaOsobaDleIxsFun != null && this.model.FilterZodpovednaOsobaDleIxsFun !== "") ? this.model.FilterZodpovednaOsobaDleIxsFun : undefined,
                                        ixs_ext: ixsExtFilter
                                    },

                                })
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }
        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                var l_sSelectedIxsExt = this.findFields("AgendaField").gfield("getValue").ixs_ext;

                this.retValue = { IxsExt: l_sSelectedIxsExt };
                this.tryClose();
            }
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