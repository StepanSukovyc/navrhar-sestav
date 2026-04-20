(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflCalendar: {
            create: function (content,componentDto) {
                return Gordic.Gin.DetailBuilderComponents.GinCalendar.create(content,componentDto);
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);