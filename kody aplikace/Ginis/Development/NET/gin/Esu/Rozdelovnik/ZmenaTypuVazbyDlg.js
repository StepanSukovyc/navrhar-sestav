(function ($) {
    "use strict";
    namespace("Gordic.Esu.EZTV", {
        onContentReady: function () {
            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26265100", ["w-12"]).gselectbox( //RC 26265100 : Typ vazby
                                Gordic.Prefabs.Select.wflctyv(),
                                {
                                    name: "typVazbyField",
                                    model: "model.typ_vazby=value.typ_vazby",
                                })
                            .gformrow("addFieldsRow", "jres:26265101", ["w-12"]).gselectbox( //RC 26265101 : Důvod
                                Gordic.Prefabs.Select.wflsdva(),
                                {
                                    name: "duvodVazbyField",
                                    model: "model.ixs_dva=value.ixs_dva",
                                    serverFilters: {
                                        aktivita: [100],
                                        typ_vazby: new Gordic.Forms.Dependency("typVazbyField", "typ_vazby")
                                    }
                                })
                .gform("complete");

            this.model = {
                typ_vazby: this.typ_vazby,
                ixs_dva: this.ixs_dva
            };

            this.findFields()
                .gfield("model", "apply", this.model)
                .gfield("model", "validators", this.validators);
        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                var l_TypVazby = this.findFields("typVazbyField").gfield("getValue").typ_vazby;
                var l_DuvodVazby = this.findFields("duvodVazbyField").gfield("getValue").ixs_dva;

                var l_oRetVal = { typVazby: l_TypVazby, duvodVazby: l_DuvodVazby };

                this.close(l_oRetVal);
            }
        },
    }, { pure: true });
})(jQuery);