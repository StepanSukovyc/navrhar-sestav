(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflHistory: {
            create: function (componentDto) {
                var extension = {
                    contentExtensions: {}
                };

                extension.contentExtensions[Gordic.Gin.DetailBuilderComponents.GinHistory.openDelegateName] = function (dto, componentDto) {
                    Gordic.Wfl.Dialogs.GWflHistorieDlg(this, dto, "showModalWindow");
                }

                return $.extend(Gordic.Gin.DetailBuilderComponents.GinHistory.create(componentDto), extension);
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);