(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflNotes: {
            /**
             * Creates component for DetailBuilder - Wfl notes.
             * @param {type} content
             * @param {type} componentDto
             * @returns {type} 
             */
            create: function (content, inputDto, componentDto) {
                return Gordic.Gin.DetailBuilderComponents.GinNotes.create(content, $.extend(componentDto, { ixp: inputDto.ixp }));
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);