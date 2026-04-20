(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZadaniProfiluNovehoDokDlg", {
        onContentReady: function () {
            var that = this;

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var hlavniForm = new Gordic.Forms
                .Form({ name: "HlavniForm" })
                .addPrefab(Gordic.Wfl.Prefabs.GVec(
                    that.userSettings,
                    {
                        model: "model.Vec=value.data",
                        disabled: false,
                        change: function (ev, item) {
                            if(item && item.value && item.value.data) {
                                that.SetVecPodrobnePokudJePrazdna(item.value.data);
                            }
                        }
                    }
                ))
                //.addSection()
                //.addRow("jres:26255425").addField("gstringbox", { //RC 26255425 : Věc
                //    name: "Vec",
                //})
                .addRow("jres:26255458").addField("gstringbox", { //RC 26255458 : Věc podrobně
                    name: "VecPodrobne",
                    rows: 2,
                    validators: [new Gordic.Validators.Length({ max: this.model.VecPodrobneLength, message: "jres:31937028" })] //RC 31937028 : Hodnota v poli je moc dlouhá
                })
                .addRow("jres:26255426") //RC 26255426 : Typ dokumentu
                .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(),
                    {
                        name: "IxsTyp",
                        model: "model.TypPisemnosti = value.ixs_typ",
                        serverFilters: {
                            aktivita_ssl: [100],
                        }
                    })
                ;
            //var prefab = Gordic.Wfl.Prefabs.PocetListu({ wflDBParams: $.content("main").wflDBParams });
            debugger;
            var prefab = Gordic.Wfl.Prefabs.GPocetListu(

                $.content("main").wflDBParams, // nejde zatím číst z mainu protože se používá i v hybridu
                {
                   
                },
                {
                    
                },
                {

                },
                {

                },
                {

                },
                {

                },
                null
            );





            hlavniForm
                .addPrefab(prefab)

            this.hlavniForm =  $("<div>").appendTo(this.element).gform("createFrom", hlavniForm);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.hlavniForm);
            }
        },
        SetVecPodrobnePokudJePrazdna: function (vec) {
            var fieldVecPodrobne = this.findFields("VecPodrobne");
            if (fieldVecPodrobne.length > 0) {
                var disabled = fieldVecPodrobne.gfield("option", "disabled");
                if(!disabled) {
                    var value = fieldVecPodrobne.gfield("getValue");
                    if(value == null || value === "") {
                        fieldVecPodrobne.gfield("setValue", vec);
                    }
                }
            }
        },
        okClick: function () {
            if (this.hlavniForm.gform("isValid")) {
                var dto = {};
                var filedy = this.findFields();
                filedy.gfield("model", "collect", dto);

                dto.PocListu = dto.PocListu ? dto.PocListu : null;
                dto.PocStran = dto.PocStran ? dto.PocStran : null;
                dto.PocPriloh = dto.PocPriloh ? dto.PocPriloh : null;
                dto.PocListuPriloh = dto.PocListuPriloh ? dto.PocListuPriloh : null;
                dto.PocKopii = dto.PocKopii ? dto.PocKopii : null;

                this.close(dto);

            }
        },
    }, { pure: true });
})(jQuery);