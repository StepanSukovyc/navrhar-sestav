(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinHistory: {
            openDelegateName: "_openHistory",
            /**
             * Creates a definition of button and openAction for ginHistory.
             * @author vmaca
             * @since 02.03.2017
             * @param componentDto
             * @returns Object with actionDefinitions and menuBarDefinitions ready for insert into content.
             */
            create: function (componentDto) {
                var actName = "actHistoryOpen";

                var result = {
                    actions: [{
                        name: actName,
                        run: function () {
                            var cnt = $.content(this);
                            var targetDto = componentDto.HistoryTargetDto;
                            var dto = { InputDto: typeof targetDto === "string" ? cnt[targetDto] : targetDto };

                            if (componentDto.IxsFunAkt != null && dto.InputDto && dto.InputDto.ixs_fun_akt == null) {
                               dto.InputDto.ixs_fun_akt = componentDto.IxsFunAkt;
                            }
                            var openDelegate = cnt[Gordic.Gin.DetailBuilderComponents.GinHistory.openDelegateName]
                            if (openDelegate) {
                                openDelegate(dto, componentDto);
                            } else {
                                cnt.dialogs.showModalWindow([componentDto.HistoryTargetClass, {uid:"historie#"}], dto, componentDto.HistoryTitle, 1000, 400); //dialogs.showWindow
                            }
                        },
                        caption: componentDto.HistoryTitle,
                        icon: "gi-history"
                    }],
                    menuBar: [{
                        action: actName, 
                        favorite: true
                    }]
                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);