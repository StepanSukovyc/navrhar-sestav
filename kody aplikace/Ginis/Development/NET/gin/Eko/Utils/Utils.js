(function ($) {
    "use strict";

    namespace("Gordic.Eko.Utils", {
        calculateDPH: function (value, charge, fromBellow) {
            fromBellow = fromBellow == null ? true : fromBellow;
            if (fromBellow) {
                var tax = Decimal.mul(value, charge).div(100).toDP(2, 4);
                return { baseValue: value, tax: tax, sum: Decimal.add(value, tax) };
            }
            else {
                var baseValue = new Decimal(100).div(Decimal.add(100, charge)).toDP(4, 4).mul(value).toDP(2, 4);
                return { baseValue: baseValue, tax: Decimal.sub(value, baseValue), sum: value };
            }
        },

        porizovacFields : function () {

            var form = new Gordic.Forms.Form();
            var items = Gordic.Eko.Utils.EkoCfuItems;
            for (var i = 0; i < items.length; i++) {
                (function (index) {
                    form.addRow(items[index].name).addField("gstringbox", {
                        name: items[index].dbName,
                        validators: [
                            new Gordic.Validators.Length({ max: items[index].length })
                        ]
                    })
                })(i)
            }
            return form.form.sections[0].rows;

        },

        ResponseInfoKind: {
            success: 0,
            info: 1,
            warning: 2,
            error: 3
        },

        responseInfoToFlash: function (info, cnt, id) {
            var counts = { success: 0, info: 0, warning: 0, error: 0 };
            for (var infoItem in info) {
                var item = this.responseInfoItemToFlash(info[infoItem]);
                cnt.showFlash(item.flash, id);
                for (var key in Gordic.Eko.Utils.ResponseInfoKind) {
                    counts[key] += item.counts[key];
                }

            }

            return { counts: counts };
        },

        responseInfoItemToFlash: function (info, id) {
            var result = { counts: { success: 0, info: 0, warning: 0, error: 0 }, flash: { id: id, label: "", customClass: "g-state-info", icon: "" } };
            if (info != null) {
                result.flash.label = info.message;
                var statePrefix = "g-state-";
                switch (info.kind) {
                    case Gordic.Eko.Utils.ResponseInfoKind.success: { //success
                        result.flash.icon = "gi-tick";
                        result.flash.customClass = statePrefix + "success"; break;
                        result.counts.success++;
                    }
                    case Gordic.Eko.Utils.ResponseInfoKind.info: { //info
                        result.flash.icon = "gi-info";
                        result.flash.customClass = statePrefix + "info"; break;
                        result.counts.info++;
                    }
                    case Gordic.Eko.Utils.ResponseInfoKind.warning: {//warning
                        result.flash.icon = "gi-exclam";
                        result.flash.customClass = statePrefix + "warning"; break;
                        result.counts.warning++;
                    }
                    case Gordic.Eko.Utils.ResponseInfoKind.error: {//error
                        result.flash.icon = "gi-exclam";
                        result.flash.customClass = statePrefix + "error"; break;
                        result.counts.error++;
                    }

                }
            }

            return result;
        }
      
    });



})(jQuery);
