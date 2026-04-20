(function ($) {
    "use strict";
    var Selectors = namespace("Gordic.Data.Selectors", {});
    var Contents = namespace("Gordic.Maj.Selectors", {});

        Selectors.GSelektorAkce = CreateClass(Selectors.BaseSelector, {
        _constructor: function (options, userOptions) {
            options = $.extend({}, options, userOptions);
            this._base({ content: Contents.AkceContent, data: options.data });
            if (!this.data)
                throw new Error("Nenastavené povinné options data");
            this.cislo = this.data.cislo;
            this.rok = this.data.rok;            
            this.multi = false;
            this.title = ""; 
            this.canSelectEmpty = options.canSelectEmpty === false ? false : true;
        },

        show: function (options) {
            options = $.extend({}, {
                width: 1200,
                height: 800,
                title: this.title
            }, options);

            var def = $.Deferred();

            var dlg = GDlg.showModalWindow("Gordic.Maj.WebClient.GDlgAkce", {
                cislo: this.cislo,
                rok: this.rok,                
                canSelectEmpty: this.canSelectEmpty,
                multi: this.multi
            }, options);

            var gDlgContent = dlg.gcontent();

            dlg.on("close", function (ev, retVal) {
                if (retVal) {
                    def.resolve(retVal);
                }
                else {
                    def.reject("jres:24534330"); //RC 24534330 : Uživatel zrušil nápovědu
                }
            });
            return def.promise();
        }
    });



})(jQuery);