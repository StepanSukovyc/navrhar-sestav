/* ---------------------------------------
*   CONTENT pro obecnou napovedu
* 
*/

(function ($) {
    "use strict";

    namespace("Gordic.WebApp.HelpContent", {
        uid: "HelpContent#", 
        title: "jres:25000124", //RC 25000124 : Nápověda
        prepareContent: function (opts) {
            var _this = this;

            // EVENT CALL 
            this.contextElement = opts.contextElement;
            this.pages = this.pages || []

            $(this.contextElement || this.element).trigger("applicationhelp", [this.pages]);
            if (this.pages.length === 0) this.close(); 

            this.commandBar([{ primary: true, action: new GAction({ name: "actClose", caption: Gordic.Dialogs.Buttons.mbbClose.text, run: function () { _this.close(); } }) }]);

            // SUBTASKS INIT
            var subTasks = []; 
            var action = new GAction({
                name: "actShowPage", run: function (ev, ctx) {
                    _this.showPage(_this.pages[ctx.page]); 
                }
            });
            for (var i = 0; i < this.pages.length; i++) {
                var page = this.pages[i];
                subTasks.push($.extend({}, page.header, { action: action, actionContext: { page: i } }));
            }
            this.subTasksElement = $.newDiv().appendTo(this.element).gsubtasks({
                params: subTasks
            });

            // CONTENT INIT
            this.helpPage = $.newDiv().appendTo(this.element).gautofit();

            // PAGES[].init
            for (var i = 0; i < this.pages.length; i++) 
                (this.pages[i].init || $.noop)(this);

            // DEFAULT PAGE
            this.showPage(opts.page || 0); 
        },

        showPage: function (page, options) {
            if (typeof page === "number") page = this.pages[page];
            else if (typeof page === "string") page = this.pages.filter(function (pg) { return pg.id === page })[0];
            if (page == null) page = this.pages[0];

            this.helpPage.find(".gcontent").add(this.helpPage.filter(".gcontent")).gcontent("close");
            (page.activate || $.noop).call(page, this.helpPage.empty().attr("class", "")[0], $.extend({ contextElement: this.contextElement }, options));
            this.subTasksElement.gsubtasks("setActive", this.pages.indexOf(page));
        }

    });
})(jQuery);

