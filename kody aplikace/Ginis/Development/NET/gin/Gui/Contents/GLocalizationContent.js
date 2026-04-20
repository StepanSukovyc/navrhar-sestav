/* ---------------------------------------
*   CONTENT pro podporu dynamickych prekladu
*  ---------------------------------------
* 
*/

(function ($) {
    "use strict";

    namespace("Gordic.Gui.WebApp.LocalizationContent", {
        //title: "jres:25000054", //RC 25000054 : Pomůcka lokalizace
        onContentReady: function () {
            var _this = this;
            this.localizationListView = new Gordic.Data.View(this.resourceList, { key: "code" });
            if (!this.resourceList || this.resourceList.length === 0) this.showFlash("jres:25000071", "g-state-warning"); //RC 25000071 : Nenalezen žádný existující překlad. Zřejmě chybí nastavení aplikace <pre>&lt;Localization-dynamic-translation /&gt;<pre>
            // demo obsah contentu
            var grid = $("<div>").appendTo(this.element).css("height", "100%").ggrid({
                navigationMode: "cell",
                data: this.localizationListView,
                searchColumns: ["code", "orText", "ovText"],
                columns: new Gordic.Data.GridFormat()
                    .addTextColumn({
                        name: "code",
                        caption: "jres:25000055",
                        customClass: "ui-disabled",
                        groupings: { 
                            default: {
                                grouping: {
                                    _presetCaption: "jres:25000062", //RC 25000062 : Dle assembly
                                    hideColumn: false,
                                    captionText: function (meta) { return meta.structure.hash; },
                                    hash: "fullName"
                                }
                            }
                        },
                        tooltipTemplate: "{fullName:encode}",
                        width: 80
                    }) //RC 25000055 : Kód
                    .addTextColumn({
                        name: "text",
                        field: null,
                        caption: "jres:25000057", //RC 25000057 : Překlad
                        groupings: {
                            default: {
                                grouping: {
                                    _presetCaption: "jres:25000067", //RC 25000067 : Dle stavu překladu
                                    hideColumn: false,
                                    captionText: function (meta) { return meta.structure.hash; },
                                    hash: function (meta) { return meta.data.ovText ? "jres:25000065" : "jres:25000066"; } //RC 25000066 : Nepřeloženo
                                }
                            }
                        },
                        customClass: function (meta) { return meta.data.ovText ? "g-state-important g-state-text g-marker" : ""; },
                        cellTemplate: Gordic.Templates.nvlTemplate("{ovText:encode}", "{orText:encode}"),
                        tooltipTemplate: "{orText:encode}",
                        width: 250,
                        sortOrder: "orText", 
                        editor: { widget: "gstringbox", options: { model: "ovText" } }
                    }) //RC 25000057 : Překlad
                    .addTextColumn({
                        name: "orText",
                        customClass: "ui-disabled",
                        caption: "jres:25000056",
                        width: 250
                    }) //RC 25000056 : Originál
                    .addTextColumn({
                        name: "ovText",
                        caption: "jres:25000061",  //RC 25000061 : Dynamický překlad
                        width: 250,
                        groupings: {
                            default: {
                                grouping: {
                                    _presetCaption: "jres:25000067", //RC 25000067 : Dle stavu překladu
                                    hideColumn: false,
                                    captionText: function (meta) { return meta.structure.hash; },
                                    hash: function (meta) { return meta.data.ovText ? "jres:25000065" : "jres:25000066"; } //RC 25000066 : Původní překlady
                                }
                            }
                        },
                        editor: { widget: "gstringbox" }
                    }) 
                    .addTextColumn({ name: "fullName", caption: "jres:25000058", customClass: "ui-disabled", width: 120 }), //RC 25000058 : Assembly
                defaultProfile: {
                    name: "jres:25000063", //RC 25000063 : Základní
                    columnList: "code, text"
                },
                profiles: [
                    {
                        name: "jres:25000064", //RC 25000064 : Rozšířený
                        columnList: "code, orText, ovText"
                    }, {
                        name: "jres:25000062", //RC 25000062 : Dle assembly
                        grouping: "code",
                        columnList: "code, text"
                    }, {
                        name: "jres:25000067", //RC 25000067 : Dle stavu překladu
                        grouping: "text",
                        columnList: "code, text"
                    }
                ],
            }).ggridcelleditor({
                autoEdit: false,
                moveDirection: "down",
                change: function (ev, obj) {
                    var ci = obj.cellInfo;
                    _this.call("SaveOverride", {
                        data: { code: ci.meta.data.code, ovText: (ci.meta.data.ovText&&ci.meta.data.ovText.trim()) || null }
                    })
                        .done(function () { _this.notification("showToast", { icon: "fa-check", content: "jres:25000032", state: "success" }); }) //RC 25000032 : Uloženo
                        .fail(function () { _this.notification("showToast", { icon: "fa-times", content: "jres:25000068", state: "error" }); }) //RC 25000068 : Chyba
                }
            }).ggrid("focus");

            this.actions.addRange({
                actRefresh: {
                    icon: "gi-refresh", caption: "jres:25000070", captionVisible: "never", run: function () { //RC 25000070 : Znovu načíst
                        this.setPending(_this.call("List").done(function (data) { _this.localizationListView.updateData(data, "update"); }));
                    }
                }, //RC 25000070 : Aktualizovat
                actClose: {
                    caption: "jres:25000002", run: function () { _this.tryClose(); }//RC 25000002 : Zavřít
                }
            });

            this.commandBar(this.actions.createBar(["actClose"], ["actRefresh"]));
        },
    });
})(jQuery);

