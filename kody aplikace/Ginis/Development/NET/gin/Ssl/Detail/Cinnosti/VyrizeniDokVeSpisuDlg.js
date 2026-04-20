(function ($) {
    "use strict";
    namespace("Gordic.Ssl.VDVS", {
        onContentReady: function () {
            var _this = this;
            var that = this;

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.createForm();

        },

        createForm: function () {
            var that = this;
            var form = null;
 
            if (this.ginN23VeddPar == 0) {
                form = new Gordic.Forms.Form()
                    .addSection()
                    .addRow({ label: "jres:26257422", required: true }) //RC 26257422 : Způsob vyřízení
                    .addField("gstringbox", {
                        name: "zpusobVyrizField",
                        model: "ZpusobVyriz",
                        initialValue: this.model.ZpusobVyriz,
                    })

                    .addRow({ label: "jres:26257413" }) //RC 26257413 : Poznámka
                    .addField("gstringbox", {
                        name: "poznamkaField",
                        model: "Poznamka",
                        initialValue: this.model.Poznamka,
                    })

                    .addRow({
                        label: "jres:26257423", //RC 26257423 : Datum vyřízení
                    })
                    .addField("gdatebox", {
                        minValue: new Date(1),
                        validators: [new Gordic.Validators.Required()],
                        name: "datumVyrizeniField",
                        model: "DatVyrizeni",
                        valueType: "datetime",
                        customClass: "w-6",
                        change: function (ev, data) {
                            that.CheckDateVyriz(data.value);
                        },
                        flag: "required"
                    });

            } else {
                form = new Gordic.Forms.Form()
                    .addSection()
                    .addRow({ label: "jres:26257422", required: true }) //RC 26257422 : Způsob vyřízení
                    .addField("gselectbox", Gordic.Prefabs.Select.sslszvs(), {
                        validators: [new Gordic.Validators.Required()],
                        name: "zpusobVyrizeniField",
                        model: "model.ZpusobVyrizeni=value.zp_vyriz",
                        customClass: "w-6",
                        change: (ev, obj) => {
                            //this.changeZpusobVyrizeni();
                        },
                        serverFilters: {
                            aktivita: [100],
                            priz_cj_only: 1
                        },
                        flag: "required",
                        // graphicInput: "hidden"
                    })

                    .addField("gdatebox", {
                        minValue: new Date(1),
                        validators: [new Gordic.Validators.Required()],
                        name: "datumVyrizeniField",
                        model: "DatVyrizeni",
                        valueType: "datetime",
                        customClass: "w-6",
                        change: function (ev, data) {
                            that.CheckDateVyriz(data.value);
                        },
                        flag: "required"
                    })
                    .addRow({
                        label: "jres:26255517", //RC 26255517 : Zpracovatel
                    })
                    .addField("gselectbox", "w-12",
                        Gordic.Gin.Fields.ginsfunSSU(
                            {
                                name: "zpracovatelField",
                                model: "model.IxsZpracovatel=value.ixs_fun",
                                itemTemplate: function (output) {
                                    return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                                },
                                change: (ev, obj) => {
                                  //  this.changeEnableActions();
                                },
                                serverFilters: {
                                    aktivita: [100]
                                },
                                flag: "required"
                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))

                .addRow({
                    label: "jres:26255826", //RC 26255826 : Schvalovatel
                })
                .addField("gselectbox", "w-12",
                    Gordic.Gin.Fields.ginsfunSSU(
                        {
                            name: "schvalovatelField",
                            model: "model.IxsSchvalovatel=value.ixs_fun",
                            itemTemplate: function (output) {
                                return $("<div class='gi gi-user microfoto'></div><b>" + output.nazev_rf + "</b>");
                            },
                            //change: (ev, obj) => {
                            //    this.changeEnableActions();
                            //},
                            serverFilters: {
                                aktivita: [100],
                            },
                            flag: "required"
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))

                .addRow({ label: "jres:26257413" }) //RC 26257413 : Poznámka
                .addField("gstringbox", {
                    name: "poznamkaField",
                    model: "Poznamka",
                    initialValue: this.model.Poznamka,
                });
            }

            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            Gordic.Utils.Form.markRequired(this.findFields());
            this.findFields().gfield("model", "apply", this.model);

        },

        OKClick: function () {
            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            if(this.ViceIxp !== true) { // kontrola data pouze u jednotliveho vyrizeni
                var l_oDatVyrizeni = this.findFields("datumVyrizeniField").gfield("getValue");

                if (!this.CheckDateVyriz(l_oDatVyrizeni)) {
                    return;
                }
            }

            this.findFields().gfield("model", "collect", this.model);

            var _this = this;

            this.call(["VyrizeniPisemnostiVlozeneVeSpisuProStarouMetodiku", { model: this.model }]).done(
                function (data, content) {
                    _this.retValue = { GroupResult: data };
                    _this.tryClose();
                }
            );
        },
        CheckDateVyriz: function (data) {
            var l_oDatVyrizUzav = data;
          //  var l_oDatPod = this.model.DatPod;
            var returnValue = true;

            if(this.model.DatPodStr != "") {
                var l_oDatPod = this.GetDate(this.model.DatPodStr);
                l_oDatPod.setHours(0, 0, 0, 0); // ref dsebesta vyhazivaki špatně, když dokument byl podanej dnes => na žádost aprasil
                if(l_oDatPod.getTime() > l_oDatVyrizUzav.getTime()) {
                    returnValue = false;
                    GDlg.alert("jres:26256372"); //RC 26256372 : Není možné zadat dřívější datum než je datum podání!
                  //  DateTextBox.focus();
                  //  this.findFields("datVyrizeniField").gfield("getValue");
                }
            }

            return returnValue;
        },
        GetDate: function (datum) {
            var Datum = new Date();
            var tempdateyear = datum.substring((datum.lastIndexOf(".") + 1), datum.length);
            var datumDen = parseInt(datum.substring(0, (datum.indexOf(".")), 10));
            var datumMesic = parseInt(datum.substring((datum.indexOf(".") + 1), datum.lastIndexOf(".")), 10);
            var datumRok = parseInt(datum.substring((datum.lastIndexOf(".") + 1), datum.length), 10);
            Datum.setFullYear(datumRok);
            Datum.setMonth(datumMesic - 1);
            Datum.setDate(datumDen);
            return Datum;
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