(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflStatusBar: {
            create: function (componentDto) {
                var vytvorStatusActionParams = function (koleckeIkonDoStatusBaru) {
                    var statusActionParamsTemp = koleckeIkonDoStatusBaru;
                    var statusActionParams = {
                        icon: statusActionParamsTemp.icon,
                        caption: statusActionParamsTemp.caption,
                        tooltip: statusActionParamsTemp.tooltip,
                        name: statusActionParamsTemp.name
                    };

                    if (statusActionParams.icon === "fa-fw" || (Array.isArray(statusActionParams.icon) && statusActionParams.icon.length > 0 && statusActionParams.icon[0] === "fa-fw")) {
                        statusActionParams.icon = "gi-radio";
                        statusActionParams.enabled = false;
                    }

                    return statusActionParams;
                };

                var result = {
                    contentExtensions: { // sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        WflStatusBar_Dto: componentDto, // aby byla jistota, že tam bude
                        // Refresh statusbaru
                        setWflStatusBar_Dto: function (newWflStatusBar_Dto) {
                            var that = this;
                            this.WflStatusBar_Dto = newWflStatusBar_Dto;
                            if (this.WflStatusBar_Dto.IconCalculatorDto) {
                                this.WflStatusBar_Dto.koleckeIkonDoStatusBaru = Gordic.Wfl.Globals.ListSupport.StatusBarKolekceIkon(this.WflStatusBar_Dto.IconCalculatorDto, { PrizVBaliku: componentDto.PrizVBaliku, TypSpis: componentDto.TypSpis, withNevyrizenoIcon:true});

                                var pedantuvArrayLength = this.WflStatusBar_Dto.koleckeIkonDoStatusBaru.length;
                                for (var i = 0; i < pedantuvArrayLength; i++) {
                                    var statusActionParams = vytvorStatusActionParams(this.WflStatusBar_Dto.koleckeIkonDoStatusBaru[i]);
                                    that.actions[statusActionParams.name].update(statusActionParams);
                                }
                            }
                        },
                    },
                    actions: {}
                };

                // vytvoření akcí do statusbaru statusbaru
                if (componentDto.IconCalculatorDto) {
                    componentDto.koleckeIkonDoStatusBaru = Gordic.Wfl.Globals.ListSupport.StatusBarKolekceIkon(componentDto.IconCalculatorDto, { PrizVBaliku: componentDto.PrizVBaliku, TypSpis: componentDto.TypSpis, withNevyrizenoIcon: true });
                    // inicializuju statusbar      
                    if (result.statusBar === null || result.statusBar === undefined) { result.statusBar = []; }

                    var pedantuvArrayLength = componentDto.koleckeIkonDoStatusBaru.length;
                    for (var i = 0; i < pedantuvArrayLength; i++) {
                        var statusActionParams = vytvorStatusActionParams(componentDto.koleckeIkonDoStatusBaru[i]);
                        result.actions[statusActionParams.name] = statusActionParams;
                        // přidám do statusbaru
                        result.statusBar.push({ action: statusActionParams.name });
                    }
                }

                //PrioritniInfo
                if (componentDto.PrioritniInfo != null && componentDto.PrioritniInfo !=="" ) {
                    if (result.statusBar === null || result.statusBar === undefined) { result.statusBar = []; }
                    result.statusBar.push(
                        {
                            type: "static",
                            id: "staticPrioritniInfo",
                            caption: componentDto.PrioritniInfo,
                            tooltip: componentDto.PrioritniInfo,
                            customClass: "g-state-text g-state-important"
                            //action: new GAction({
                            //    name: "actPrioritniInfo",
                            //    caption: componentDto.PrioritniInfo,
                            //    run: function () {
                            //        ;
                            //    }
                            //})
                        });
                }

                //existuje žádost v RAK
                if (componentDto.IsZadostVRak) {
                    if (result.statusBar === null || result.statusBar === undefined) { result.statusBar = []; }
                    result.statusBar.push(
                        {
                            type: "static",
                            id: "staticExistujeZadostVRakInfo",
                            caption: "jres:31926606", //RC 31926606 : ŽÁDOST V RAK
                            tooltip: "jres:31926605", //RC 31926605 : Existuje nevyřízená žádost v RAK
                            customClass: "g-state-text g-state-warning"
                            //action: new GAction({
                            //    name: "actPrioritniInfo",
                            //    caption: componentDto.PrioritniInfo,
                            //    run: function () {
                            //        ;
                            //    }
                            //})
                        });
                }
           

                return result;
            }           
        },
    }, { extendIntellisense: GContent, pure: true });
})(jQuery);