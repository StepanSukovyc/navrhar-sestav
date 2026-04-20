(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {
        GinNotes: {
            /**
             * Creates sidePanel with Notes
             * @author vmaca,thazmuka
             * @since 02.03.2017.
             * @returns  Object with sidePanel definition ready for insert into content.
             */
            create: function (content, componentDto) {
                var result = { sidePanels: []};
                if (typeof componentDto.serverParams === "string") {
                    componentDto.serverParams = content[componentDto.serverParams];
                }

                // dsebesta - neudělal si to jako eventu na kteoru bych mohl dát lisner, tak mi nezbylo než to takhle učunačit
                var poznamkaChange = function (param, data) { //param: "create" | "update" | "delete" | "changeColor", data: IGNoteDto | null
                    if (content && content.zmenaPoznamkyVUzivatelskychPoznamkach) {
                        content.zmenaPoznamkyVUzivatelskychPoznamkach(param, data);
                    }
                }

                var BadgeObject = new GObservableObject({ value: componentDto.count != null && componentDto.count > 0 ? componentDto.count.toString() : "" });
                var createNotes = function(element){
                    var GNotePanel = new Gordic.GNotePanel();
                    element.empty();

                    // *** todo: možnost dodělat pro sxs, typObj ***

                    // verze pro identifikátor ixp
                    if (componentDto.ixp !== undefined) {
                        GNotePanel.create(element, content, {
                            ixp: componentDto.ixp,
                            count: function (number) {
                                BadgeObject.value = number > 0 ?  String(number) : ""; BadgeObject.update();
                            },
                            change: poznamkaChange
                        }, !(componentDto.useColors == null ? true : componentDto.useColors));
                    }
                    // verze pro ostatní typy, které si sám zadáte v serverParams
                    else {
                        GNotePanel.create(element, content, {
                            sxs: componentDto.sxs,
                            typObj: componentDto.typObj,
                            count: function (number) {
                                BadgeObject.value = number > 0 ? String(number) : ""; BadgeObject.update();
                            },
                            className: componentDto.className,
                            serverParams: componentDto.serverParams,
                            change: poznamkaChange

                        }, !(componentDto.useColors == null ? true : componentDto.useColors) );
                    }

                    return GNotePanel;
                }

                var notePanel;

                result.sidePanels.push({
                    id: "panelNotes",
                    side: "right",
                    leaf: { caption: "jres:31700002", badge: BadgeObject, icon: "fa-sticky-note-o" }, //RC 31700002 : Uživ. poznámky
                    caption: "jres:31700003", //RC 31700003 : Uživatelské poznámky
                    visible: false,
                    minWidth: 400,
                    open: function (ev, ctx) { // fix pro reload detailu - sidebar neupdatuje customDiv
                        notePanel = notePanel || createNotes($(ev.target));
                    },
                });

                if (componentDto.className) {
                    result.onBuild = [function () {
                        var cnt = this;
                        cnt.loadingAwait.done(function () {
                            var serviceCnt = cnt.createServiceContent(GContent.createInitializer(componentDto.className, { serverParams: componentDto.serverParams }));
                            serviceCnt.call('List').done(function (data) {
                                BadgeObject.update({ value: data && data.length != null && data.length > 0 ? data.length.toString() : '' });
                            }).always(function () { serviceCnt.close(); });
                        });
                    }];
                }

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);