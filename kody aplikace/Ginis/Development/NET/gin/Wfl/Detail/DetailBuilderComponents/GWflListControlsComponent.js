(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflListControls: {
            create: function (content) {
                var detailControls = Gordic.Gin.DetailBuilderComponents.GinListControls.create(content);
                detailControls.contentExtensions.detailControls_GetDataCaption = function (data) {
                    return data.ixp;
                };
                return detailControls;
            }
        },
    }, { pure: true });
})(jQuery);