(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinCloseButton: {
            /**
             * Adds closing button to commandbar
             * @author vmaca
             */
            create: function (componentDto) {
                var result = {
                    actions: {
                        actCloseButtonClick: {
                            caption: GDlg.mbbClose.text,
                            icon: "gi-window-close",
                            tooltip: GDlg.mbbClose.text,
                            customClass: "js-VlastaFocus ",
                            run: function () {
                                $.content(this).ginCloseButtonClick();
                            }
                        },
                    },
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        ginCloseButtonClick: function () {
                            this.tryClose();
                        }
                    },
                    commandBar: ["actCloseButtonClick"],
                    onInit: [function (builder) {
                        builder.moveComponentAfter("GinCloseButton");
                    }]
                };
                
                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);