(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinNavigator: {
            /**
             * Outline navigator in sidepanel
             * @fires goutline_refresh
             * @author vmaca
             */
            create: function (content) {
                var title = "jres:31700047";//RC 31700047 : Navigátor
                content.element.off('.goutline');
                var result = { 
                    sidePanels: {
                        panelNavigator: {
                            side: "right",
                            leaf: { caption: title, icon: "fa-tasks" }, 
                            title: title,
                            open: function (ev, ctx) {
                                var customDiv = $(this);
                                if (!customDiv.hasClass("g-outline")) {
                                    customDiv.goutline().goutline(
                                        "bindForm",
                                        content.element,
                                        function (tree) {
                                            var forms = content.find(".header-form").findForms();

                                            if (forms.length > 0) {
                                                tree.splice(0, 0, { caption: "jres:31700048", point: forms[0] }); //RC 31700048 : Hlavička
                                            }
                                            return tree;
                                        });
                                    content.element.on("goutline_refresh.goutline", function (ev, ctx) { if (customDiv.hasClass("g-outline")) customDiv.goutline("refresh")});
                                }else{
                                    customDiv.goutline("refresh");
                                }
                            } 
                        }
                    }
                };

                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);