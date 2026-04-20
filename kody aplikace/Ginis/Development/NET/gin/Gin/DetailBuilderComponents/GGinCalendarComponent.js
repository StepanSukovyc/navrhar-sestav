(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinCalendar: {
            /**
             *  Creates detailbuilder component with action and menu item for calenar.
             * @author thazmuka
             */
            create: function (componentDto) {
                var actName = "actGinCalendarOpen";
                var result = {
                    actions: [{
                        name: actName,
                        caption: "jres:31700040", //RC 31700040 : Přidat událost do osobního kalendáře                    
                        captionVisible: GAction.captionVisibility.never,
                        icon: "fa-calendar-plus-o",
                        run: function (ev, ctx) {

                            var datesObj = Gordic.Gin.WebClient.GCalendarDateService.getDates();

                            // otevřít dlg pro vytvoření nové události
                            new Gordic.GCalendar.Event().createEvent({
                                data: {
                                    //ixs_fun: ctx.ixs_fun,			// sem předej ixs_fun identifikator funkcniho mista
                                    ixx: ctx.ixx,					// a sem ixx - identifikator dokumentu
                                    dat_od: datesObj.dateOd,
                                    dat_do: datesObj.dateDo,
                                    cely_den: 0     // 0 - Ne
                                }
                            });
                        }
                    }],
                    menuBar: [{
                        action: actName,
                        actionContext: {
                            ixx: componentDto.ixx,
                            //ixs_fun: componentDto.ixs_fun
                        },
                        align: "opposite",
                        favorite: true
                    }]
                };

                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);