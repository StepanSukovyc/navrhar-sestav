"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            var FilterPrefabs;
            (function (FilterPrefabs) {
                function getEsuDefaults() {
                    return Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                        ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                        Logovani: {
                            Ixp: "0000X0000003", // ALF 20.6.2017 speciální PID pro logování hledaček/masek
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                            AktZnacka: "",
                            DuvodHledaniTxt: ""
                        }
                    });
                }
                function esu_txt(options) {
                    options = $.extend({
                        model: 'esu_txt',
                        ixs_esuPath: "_esu_txt_ixs"
                    }, options);
                    return {
                        widget: "gformbox",
                        options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults(options), {
                            form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(options.caption || "")
                                .addField("gselectbox", $.extend(getEsuDefaults(), {
                                name: "esu_txt",
                                model: "model.esu_txt=value.nazev;model.ixs_esu=value.ixs_esu",
                                filterMinLength: 2,
                                strict: false,
                                stopping: false,
                                multi: false,
                                graphicInput: null,
                                itemTemplate: "{nazev:trim:encode}",
                                invalidTransform: (s) => { return s ? { nazev: s } : undefined; },
                                verify: function (v) { return v; }
                            })),
                            model: `model.${options.model}=value.esu_txt;model.${options.ixs_esuPath}=value.ixs_esu`,
                            itemTemplate: (v) => { return v && v.esu_txt ? v.esu_txt : Gordic.Eko.Filters.Utils.formatEmptyValue(options.caption); },
                        })
                    };
                }
                FilterPrefabs.esu_txt = esu_txt;
                function esu_ixs(options) {
                    options = $.extend({
                        model: 'isx_esu',
                        ixs_esuPath: "_esu_ixs"
                    }, options);
                    return {
                        widget: "gformbox",
                        options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults(options), {
                            form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(options.caption || "")
                                .addField("gselectbox", $.extend(getEsuDefaults(), {
                                name: "ixs_esu",
                                model: "model.ixs_esu=value.ixs_esu;model.nazev=value.nazev",
                                filterMinLength: 2,
                                strict: false,
                                stopping: false,
                                multi: false,
                                graphicInput: null,
                                itemTemplate: "{nazev:trim:encode}",
                                helperItemTemplate: "{ixs_esu:trim:encode} - {nazev:trim:encode}",
                                invalidTransform: (s) => { return s ? { ixs_esu: s } : undefined; },
                                verify: function (v) { return v; }
                            })),
                            model: `model.${options.model}=value.ixs_esu`,
                            itemTemplate: (v) => {
                                return v && v.ixs_esu ? v.ixs_esu : Gordic.Eko.Filters.Utils.formatEmptyValue(options.caption);
                            },
                        })
                    };
                }
                FilterPrefabs.esu_ixs = esu_ixs;
                function esu_ico(options) {
                    options = $.extend({
                        model: 'esu_ico',
                        ixs_esuPath: "_esu_ico_ixs"
                    }, options);
                    return {
                        widget: "gformbox",
                        options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults(options), {
                            form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(options.caption || "")
                                .addField("gselectbox", $.extend(getEsuDefaults(), {
                                name: "esu_ico",
                                model: "model.esu_ico=value.ico;model.ixs_esu=value.ixs_esu",
                                filterMinLength: 2,
                                strict: false,
                                stopping: false,
                                multi: false,
                                graphicInput: null,
                                itemTemplate: "{ico:trim:encode}",
                                helperItemTemplate: "{ico:trim:encode} - {nazev:trim:encode}",
                                invalidTransform: (s) => { return s ? { ico: s } : undefined; },
                                verify: function (v) { return v; }
                            })),
                            model: `model.${options.model}=value.esu_ico;model.${options.ixs_esuPath}=value.ixs_esu`,
                            itemTemplate: (v) => { return v && v.esu_ico ? v.esu_ico : Gordic.Eko.Filters.Utils.formatEmptyValue(options.caption); },
                        })
                    };
                }
                FilterPrefabs.esu_ico = esu_ico;
                function esu_rc(options) {
                    options = $.extend({
                        model: 'esu_rc',
                        ixs_esuPath: "_esu_rc_ixs"
                    }, options);
                    return {
                        widget: "gformbox",
                        options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults(options), {
                            form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(options.caption || "")
                                .addField("gselectbox", $.extend(getEsuDefaults(), {
                                name: "esu_txt",
                                model: "model.esu_rc=value.rc;model.ixs_esu=value.ixs_esu",
                                filterMinLength: 2,
                                strict: false,
                                stopping: false,
                                multi: false,
                                graphicInput: null,
                                disabled: !options.Rad_Esu_RcVyhl,
                                itemTemplate: "{rc:trim:encode}",
                                invalidTransform: (s) => { return s ? { rc: s } : undefined; },
                                verify: function (v) { return v; }
                            })),
                            model: `model.${options.model}=value.esu_rc;model.${options.ixs_esuPath}=value.ixs_esu`,
                            itemTemplate: (v) => {
                                return v && v.esu_rc ? v.esu_rc : Gordic.Eko.Filters.Utils.formatEmptyValue(options.caption);
                            },
                        })
                    };
                }
                FilterPrefabs.esu_rc = esu_rc;
                /** Typ agendy, model lze mapovat na Gordic.Data.Readers.GinctagDto */
                function s_vyriz_rezsp(options) {
                    options = $.extend(true, {
                        model: 's_vyriz_rezsp',
                        isRozpocet: false
                    }, options);
                    return {
                        widget: "gformbox",
                        options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults(options), {
                            form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(options.caption || "")
                                .addField("gselectbox", Gordic.Prefabs.Select.sspcsvy(), {
                                name: "s_vyriz_rezsp",
                                model: "model.s_vyriz_rezsp=value.s_vyriz_rezsp;model.s_vyriz_rezsp_txt=value.s_vyriz_rezsp_txt",
                                //serverFilters: { PouzeVazaneNaFaze: false, ExistujeVTabulce: options.isRozpocet ? "rozdxma" : "uctdxma" },
                            }),
                            itemTemplate: (v) => { return v && v.s_vyriz_rezsp ? v.s_vyriz_rezsp_txt : Gordic.Eko.Filters.Utils.formatEmptyValue(options.caption); },
                            model: `model.${options.model}=value.s_vyriz_rezsp;model.s_vyriz_rezsp_txt=value.s_vyriz_rezsp_txt` //NOTE: Pozor! na tento model se spoleham v GSeznamEkoZaznamuTS.dispatchFillServerGridEvent(). Pri zmene otestovat ctrl+click na seznamu!!!
                        })
                    };
                }
                FilterPrefabs.s_vyriz_rezsp = s_vyriz_rezsp;
                /** Typ agendy, model lze mapovat na Gordic.Data.Readers.GinctagDto */
                function typ_ag(options) {
                    options = $.extend(true, {
                        model: 'typ_ag',
                        isRozpocet: false
                    }, options);
                    return {
                        widget: "gformbox",
                        options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults(options), {
                            form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(options.caption || "")
                                .addField("gselectbox", Gordic.Prefabs.Select.ginctag(), {
                                name: "typ_ag",
                                model: "model.typ_ag=value.typ_ag;model.zkr_ag=value.zkr_ag",
                                serverFilters: { PouzeVazaneNaFaze: false, ExistujeVTabulce: options.isRozpocet ? "rozdxma" : "uctdxma" },
                            }),
                            itemTemplate: (v) => { return v && v.typ_ag ? v.zkr_ag : Gordic.Eko.Filters.Utils.formatEmptyValue(options.caption); },
                            model: `model.${options.model}=value.typ_ag;model.${options.zkr_agPath}=value.zkr_ag` //NOTE: Pozor! na tento model se spoleham v GSeznamEkoZaznamuTS.dispatchFillServerGridEvent(). Pri zmene otestovat ctrl+click na seznamu!!!
                        })
                    };
                }
                FilterPrefabs.typ_ag = typ_ag;
                /** Druh  GReaderEkocdch  */
                function druh_char(options) {
                    options = $.extend(true, {
                        model: 'druh_char',
                    }, options);
                    return {
                        widget: "gformbox",
                        options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults(options), {
                            form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(options.caption || "")
                                .addField("gselectbox", Gordic.Prefabs.Select.ekocdch(), {
                                name: "druh_char",
                                model: "model.druh_char=value.druh_char;model.druh_char_txt=value.druh_char_txt",
                                //serverFilters: { PouzeVazaneNaFaze: false, ExistujeVTabulce: options.isRozpocet ? "rozdxma" : "uctdxma" },
                            }),
                            itemTemplate: (v) => { return v && v.druh_char ? v.druh_char_txt : Gordic.Eko.Filters.Utils.formatEmptyValue(options.caption); },
                            model: `model.${options.model}=value.druh_char;model.${options.txt_name}=value.druh_char_txt`
                        })
                    };
                }
                FilterPrefabs.druh_char = druh_char;
                /** Charakter GReaderEkocpch */
                function priz_char(options) {
                    options = $.extend(true, {
                        model: 'priz_char',
                    }, options);
                    return {
                        widget: "gformbox",
                        options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults(options), {
                            form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(options.caption || "")
                                .addField("gselectbox", Gordic.Prefabs.Select.ekocpch(), {
                                name: "priz_char",
                                model: "model.priz_char=value.priz_char;model.priz_char_txt=value.priz_char_txt",
                                //serverFilters: { PouzeVazaneNaFaze: false, ExistujeVTabulce: options.isRozpocet ? "rozdxma" : "uctdxma" },
                            }),
                            itemTemplate: (v) => { return v && v.priz_char ? v.priz_char_txt : Gordic.Eko.Filters.Utils.formatEmptyValue(options.caption); },
                            //model: `model.${options.model}=value.priz_char`
                            model: `model.${options.model}=value.priz_char;model.priz_char_txt=value.priz_char_txt`
                            //model: function (op, dto, modelOptions) {
                            //    switch (op) {
                            //        case "apply": break;
                            //        case "collect":
                            //            debugger;
                            //            let val = $(this).gfield("getValue");
                            //            break;
                            //    }
                            //}
                        })
                    };
                }
                FilterPrefabs.priz_char = priz_char;
            })(FilterPrefabs = WebClient.FilterPrefabs || (WebClient.FilterPrefabs = {}));
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0ZpbHRlclByZWZhYnNUcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdGaWx0ZXJQcmVmYWJzVHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTRQZjtBQTVQRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0UG5CO0lBNVBnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E0UDdCO1FBNVBvQixXQUFBLFNBQVM7WUFBQyxJQUFBLGFBQWEsQ0E0UDNDO1lBNVA4QixXQUFBLGFBQWE7Z0JBbUJ4QyxTQUFTLGNBQWM7b0JBQ25CLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUMvQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFNBQVM7d0JBQzVELFdBQVcsRUFBRSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWU7d0JBQ3JELFFBQVEsRUFBRTs0QkFDTixHQUFHLEVBQUUsY0FBYyxFQUFNLDBEQUEwRDs0QkFDbkYsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCOzRCQUN4RSxTQUFTLEVBQUUsRUFBRTs0QkFDYixlQUFlLEVBQUUsRUFBRTt5QkFDdEI7cUJBQ0osQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsU0FBZ0IsT0FBTyxDQUFDLE9BQTBCO29CQUM5QyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDZixLQUFLLEVBQUUsU0FBUzt3QkFDaEIsV0FBVyxFQUFFLGNBQWM7cUJBQzlCLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRVosT0FBTzt3QkFDSCxNQUFNLEVBQUUsVUFBVTt3QkFDbEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUMxRSxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLENBQUM7aUNBQ3BGLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztpQ0FDakMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFO2dDQUMvQyxJQUFJLEVBQUUsU0FBUztnQ0FDZixLQUFLLEVBQUUsdURBQXVEO2dDQUM5RCxlQUFlLEVBQUUsQ0FBQztnQ0FDbEIsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsUUFBUSxFQUFFLEtBQUs7Z0NBQ2YsS0FBSyxFQUFFLEtBQUs7Z0NBQ1osWUFBWSxFQUFFLElBQUk7Z0NBQ2xCLFlBQVksRUFBRSxxQkFBcUI7Z0NBQ25DLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUM7Z0NBQ2hFLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3JDLENBQUMsQ0FBQzs0QkFDUCxLQUFLLEVBQUUsU0FBUyxPQUFPLENBQUMsS0FBSyx3QkFBd0IsT0FBTyxDQUFDLFdBQVcsZ0JBQWdCOzRCQUN4RixZQUFZLEVBQUUsQ0FBQyxDQUF3QyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDbEssQ0FBQztxQkFDTCxDQUFDO2dCQUNOLENBQUM7Z0JBM0JlLHFCQUFPLFVBMkJ0QixDQUFBO2dCQUVELFNBQWdCLE9BQU8sQ0FBQyxPQUEwQjtvQkFDOUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQ2YsS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLFdBQVcsRUFBRSxVQUFVO3FCQUMxQixFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUVaLE9BQU87d0JBQ0gsTUFBTSxFQUFFLFVBQVU7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDMUUsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxDQUFDO2lDQUNwRixVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7aUNBQ2pDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQ0FDL0MsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsS0FBSyxFQUFFLHFEQUFxRDtnQ0FDNUQsZUFBZSxFQUFFLENBQUM7Z0NBQ2xCLE1BQU0sRUFBRSxLQUFLO2dDQUNiLFFBQVEsRUFBRSxLQUFLO2dDQUNmLEtBQUssRUFBRSxLQUFLO2dDQUNaLFlBQVksRUFBRSxJQUFJO2dDQUNsQixZQUFZLEVBQUUscUJBQXFCO2dDQUNuQyxrQkFBa0IsRUFBRSw2Q0FBNkM7Z0NBQ2pFLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUM7Z0NBQ2xFLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3JDLENBQUMsQ0FBQzs0QkFDUCxLQUFLLEVBQUUsU0FBUyxPQUFPLENBQUMsS0FBSyxnQkFBZ0I7NEJBQzdDLFlBQVksRUFBRSxDQUFDLENBQXdCLEVBQUUsRUFBRTtnQ0FDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDbkcsQ0FBQzt5QkFDSixDQUFDO3FCQUNMLENBQUM7Z0JBQ04sQ0FBQztnQkE5QmUscUJBQU8sVUE4QnRCLENBQUE7Z0JBQ0QsU0FBZ0IsT0FBTyxDQUFDLE9BQTBCO29CQUM5QyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDZixLQUFLLEVBQUUsU0FBUzt3QkFDaEIsV0FBVyxFQUFFLGNBQWM7cUJBQzlCLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRVosT0FBTzt3QkFDSCxNQUFNLEVBQUUsVUFBVTt3QkFDbEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUMxRSxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLENBQUM7aUNBQ3BGLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztpQ0FDakMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFO2dDQUMvQyxJQUFJLEVBQUUsU0FBUztnQ0FDZixLQUFLLEVBQUUscURBQXFEO2dDQUM1RCxlQUFlLEVBQUUsQ0FBQztnQ0FDbEIsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsUUFBUSxFQUFFLEtBQUs7Z0NBQ2YsS0FBSyxFQUFFLEtBQUs7Z0NBQ1osWUFBWSxFQUFFLElBQUk7Z0NBQ2xCLFlBQVksRUFBRSxtQkFBbUI7Z0NBQ2pDLGtCQUFrQixFQUFFLHlDQUF5QztnQ0FDN0QsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBLENBQUMsQ0FBQztnQ0FDOUQsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDckMsQ0FBQyxDQUFDOzRCQUNQLEtBQUssRUFBRSxTQUFTLE9BQU8sQ0FBQyxLQUFLLHdCQUF3QixPQUFPLENBQUMsV0FBVyxnQkFBZ0I7NEJBQ3hGLFlBQVksRUFBRSxDQUFDLENBQXdDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNsSyxDQUFDO3FCQUNMLENBQUM7Z0JBQ04sQ0FBQztnQkE1QmUscUJBQU8sVUE0QnRCLENBQUE7Z0JBRUQsU0FBZ0IsTUFBTSxDQUFDLE9BQTRCO29CQUMvQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDZixLQUFLLEVBQUUsUUFBUTt3QkFDZixXQUFXLEVBQUUsYUFBYTtxQkFDN0IsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFWixPQUFPO3dCQUNILE1BQU0sRUFBRSxVQUFVO3dCQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQzFFLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsc0NBQXNDLEVBQUUsQ0FBQztpQ0FDcEYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO2lDQUNqQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUU7Z0NBQy9DLElBQUksRUFBRSxTQUFTO2dDQUNmLEtBQUssRUFBRSxtREFBbUQ7Z0NBQzFELGVBQWUsRUFBRSxDQUFDO2dDQUNsQixNQUFNLEVBQUUsS0FBSztnQ0FDYixRQUFRLEVBQUUsS0FBSztnQ0FDZixLQUFLLEVBQUUsS0FBSztnQ0FDWixZQUFZLEVBQUUsSUFBSTtnQ0FDbEIsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWM7Z0NBQ2pDLFlBQVksRUFBRSxrQkFBa0I7Z0NBQ2hDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUM7Z0NBQzdELE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3JDLENBQUMsQ0FBQzs0QkFDUCxLQUFLLEVBQUUsU0FBUyxPQUFPLENBQUMsS0FBSyx1QkFBdUIsT0FBTyxDQUFDLFdBQVcsZ0JBQWdCOzRCQUN2RixZQUFZLEVBQUUsQ0FBQyxDQUF1QyxFQUFFLEVBQUU7Z0NBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ2pHLENBQUM7eUJBQ0osQ0FBQztxQkFDTCxDQUFDO2dCQUNOLENBQUM7Z0JBOUJlLG9CQUFNLFNBOEJyQixDQUFBO2dCQUVELHNFQUFzRTtnQkFDdEUsU0FBZ0IsYUFBYSxDQUFDLE9BQXFEO29CQUMvRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7d0JBQ3JCLEtBQUssRUFBRSxlQUFlO3dCQUN0QixVQUFVLEVBQUUsS0FBSztxQkFDcEIsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFWixPQUFPO3dCQUNILE1BQU0sRUFBRSxVQUFVO3dCQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQzFFLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsc0NBQXNDLEVBQUUsQ0FBQztpQ0FDcEYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO2lDQUNqQyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dDQUNyRCxJQUFJLEVBQUUsZUFBZTtnQ0FDckIsS0FBSyxFQUFFLHlGQUF5RjtnQ0FDaEcsNEdBQTRHOzZCQUMvRyxDQUFDOzRCQUNOLFlBQVksRUFBRSxDQUFDLENBQXdELEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9MLEtBQUssRUFBRSxTQUFTLE9BQU8sQ0FBQyxLQUFLLHNFQUFzRSxDQUFDLDJJQUEySTt5QkFDbFAsQ0FBQztxQkFDTCxDQUFDO2dCQUNOLENBQUM7Z0JBcEJlLDJCQUFhLGdCQW9CNUIsQ0FBQTtnQkFDRCxzRUFBc0U7Z0JBQ3RFLFNBQWdCLE1BQU0sQ0FBQyxPQUE0QjtvQkFDL0MsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO3dCQUNyQixLQUFLLEVBQUUsUUFBUTt3QkFDZixVQUFVLEVBQUUsS0FBSztxQkFDcEIsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFWixPQUFPO3dCQUNILE1BQU0sRUFBRSxVQUFVO3dCQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQzFFLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsc0NBQXNDLEVBQUUsQ0FBQztpQ0FDcEYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO2lDQUNqQyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dDQUNyRCxJQUFJLEVBQUUsUUFBUTtnQ0FDZCxLQUFLLEVBQUUscURBQXFEO2dDQUM1RCxhQUFhLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUM7NkJBQzNHLENBQUM7NEJBQ04sWUFBWSxFQUFFLENBQUMsQ0FBc0MsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzNKLEtBQUssRUFBRSxTQUFTLE9BQU8sQ0FBQyxLQUFLLHVCQUF1QixPQUFPLENBQUMsVUFBVSxlQUFlLENBQUMsMklBQTJJO3lCQUNwTyxDQUFDO3FCQUNMLENBQUM7Z0JBQ04sQ0FBQztnQkFwQmUsb0JBQU0sU0FvQnJCLENBQUE7Z0JBQ0QsNEJBQTRCO2dCQUM1QixTQUFnQixTQUFTLENBQUMsT0FBOEI7b0JBQ3BELE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTt3QkFDckIsS0FBSyxFQUFFLFdBQVc7cUJBQ3JCLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRVosT0FBTzt3QkFDSCxNQUFNLEVBQUUsVUFBVTt3QkFDbEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUMxRSxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLENBQUM7aUNBQ3BGLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztpQ0FDakMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQ0FDckQsSUFBSSxFQUFFLFdBQVc7Z0NBQ2pCLEtBQUssRUFBRSx5RUFBeUU7Z0NBQ2hGLDRHQUE0Rzs2QkFDL0csQ0FBQzs0QkFDTixZQUFZLEVBQUUsQ0FBQyxDQUFnRCxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDL0ssS0FBSyxFQUFFLFNBQVMsT0FBTyxDQUFDLEtBQUssMEJBQTBCLE9BQU8sQ0FBQyxRQUFRLHNCQUFzQjt5QkFDaEcsQ0FBQztxQkFDTCxDQUFDO2dCQUNOLENBQUM7Z0JBbkJlLHVCQUFTLFlBbUJ4QixDQUFBO2dCQUNELCtCQUErQjtnQkFDL0IsU0FBZ0IsU0FBUyxDQUFDLE9BQThCO29CQUNwRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7d0JBQ3JCLEtBQUssRUFBRSxXQUFXO3FCQUNyQixFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUVaLE9BQU87d0JBQ0gsTUFBTSxFQUFFLFVBQVU7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDMUUsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxDQUFDO2lDQUNwRixVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7aUNBQ2pDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0NBQ3JELElBQUksRUFBRSxXQUFXO2dDQUNqQixLQUFLLEVBQUUseUVBQXlFO2dDQUNoRiw0R0FBNEc7NkJBQy9HLENBQUM7NEJBQ04sWUFBWSxFQUFFLENBQUMsQ0FBZ0QsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9LLGlEQUFpRDs0QkFDakQsS0FBSyxFQUFFLFNBQVMsT0FBTyxDQUFDLEtBQUssMERBQTBEOzRCQUN2RiwyQ0FBMkM7NEJBQzNDLG1CQUFtQjs0QkFDbkIsOEJBQThCOzRCQUM5Qix5QkFBeUI7NEJBQ3pCLHVCQUF1Qjs0QkFDdkIsbURBQW1EOzRCQUNuRCxvQkFBb0I7NEJBQ3BCLE9BQU87NEJBQ1AsR0FBRzt5QkFDTixDQUFDO3FCQUNMLENBQUM7Z0JBQ04sQ0FBQztnQkE3QmUsdUJBQVMsWUE2QnhCLENBQUE7WUFHTCxDQUFDLEVBNVA4QixhQUFhLEdBQWIsdUJBQWEsS0FBYix1QkFBYSxRQTRQM0M7UUFBRCxDQUFDLEVBNVBvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0UDdCO0lBQUQsQ0FBQyxFQTVQZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNFBuQjtBQUFELENBQUMsRUE1UFMsTUFBTSxLQUFOLE1BQU0sUUE0UGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR0ZpbHRlck9wdGlvbkVzdSBleHRlbmRzIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdGaWx0ZXJMYWJlbGVkT3B0aW9uRHRvIHtcclxuICAgICAgICAvKiogaW50ZXJuaSB1bG96ZW5pIGl4c19lc3UgbmEgbW9kZWx1ICovXHJcbiAgICAgICAgaXhzX2VzdVBhdGg6IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHRmlsdGVyT3B0aW9uRXN1UmMgZXh0ZW5kcyBJR0ZpbHRlck9wdGlvbkVzdSB7XHJcbiAgICAgICAgLyoqIE1vem5vc3QgdnlobGVkYXZhbmkgUkMgKi9cclxuICAgICAgICBSYWRfRXN1X1JjVnlobDogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHRmlsdGVyT3B0aW9uVHlwQWcgZXh0ZW5kcyBHb3JkaWMuRWtvLldlYkNsaWVudC5HRmlsdGVyTGFiZWxlZE9wdGlvbkR0byB7XHJcbiAgICAgICAgaXNSb3pwb2NldDogYm9vbGVhbjtcclxuICAgICAgICB6a3JfYWdQYXRoOiBzdHJpbmc7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHRmlsdGVyT3B0aW9uVHlwVWN0dSBleHRlbmRzIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdGaWx0ZXJMYWJlbGVkT3B0aW9uRHRvIHsgICAgICAgIFxyXG4gICAgICAgIHR4dF9uYW1lOiBzdHJpbmc7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRFc3VEZWZhdWx0cygpIHtcclxuICAgICAgICByZXR1cm4gR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgdHlwOiBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuVHlwWm9icmF6ZW5pS2Fyb3Rla2EuU2VsZWN0RXN1LFxyXG4gICAgICAgICAgICBNb2RPdGV2cmVuaTogR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyxcclxuICAgICAgICAgICAgTG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgIEl4cDogXCIwMDAwWDAwMDAwMDNcIiwgICAgIC8vIEFMRiAyMC42LjIwMTcgc3BlY2nDoWxuw60gUElEIHBybyBsb2dvdsOhbsOtIGhsZWRhxI1lay9tYXNla1xyXG4gICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaUVzdVZIbGVkYW5pLFxyXG4gICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZXN1X3R4dChvcHRpb25zOiBJR0ZpbHRlck9wdGlvbkVzdSk6IEdvcmRpYy5Fa28uRmlsdGVycy5TZXJ2ZXJGaWx0ZXJPcHRpb25zIHtcclxuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe1xyXG4gICAgICAgICAgICBtb2RlbDogJ2VzdV90eHQnLFxyXG4gICAgICAgICAgICBpeHNfZXN1UGF0aDogXCJfZXN1X3R4dF9peHNcIlxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyhvcHRpb25zKSwge1xyXG4gICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKG9wdGlvbnMuY2FwdGlvbiB8fCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgJC5leHRlbmQoZ2V0RXN1RGVmYXVsdHMoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZXN1X3R4dD12YWx1ZS5uYXpldjttb2RlbC5peHNfZXN1PXZhbHVlLml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyTWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wcGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie25hemV2OnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkVHJhbnNmb3JtOiAocykgPT4geyByZXR1cm4gcyA/IHsgbmF6ZXY6IHMgfSA6IHVuZGVmaW5lZCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2KSB7IHJldHVybiB2OyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke29wdGlvbnMubW9kZWx9PXZhbHVlLmVzdV90eHQ7bW9kZWwuJHtvcHRpb25zLml4c19lc3VQYXRofT12YWx1ZS5peHNfZXN1YCxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHY/OiB7IGVzdV90eHQ6IHN0cmluZywgaXhzX2VzdTogc3RyaW5nIH0pID0+IHsgcmV0dXJuIHYgJiYgdi5lc3VfdHh0ID8gdi5lc3VfdHh0IDogR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEVtcHR5VmFsdWUob3B0aW9ucy5jYXB0aW9uKTsgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBlc3VfaXhzKG9wdGlvbnM6IElHRmlsdGVyT3B0aW9uRXN1KTogRWtvLkZpbHRlcnMuU2VydmVyRmlsdGVyT3B0aW9ucyB7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgbW9kZWw6ICdpc3hfZXN1JyxcclxuICAgICAgICAgICAgaXhzX2VzdVBhdGg6IFwiX2VzdV9peHNcIlxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyhvcHRpb25zKSwge1xyXG4gICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKG9wdGlvbnMuY2FwdGlvbiB8fCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgJC5leHRlbmQoZ2V0RXN1RGVmYXVsdHMoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2VzdT12YWx1ZS5peHNfZXN1O21vZGVsLm5hemV2PXZhbHVlLm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlck1pbkxlbmd0aDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHBpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldjp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVySXRlbVRlbXBsYXRlOiBcIntpeHNfZXN1OnRyaW06ZW5jb2RlfSAtIHtuYXpldjp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZFRyYW5zZm9ybTogKHMpID0+IHsgcmV0dXJuIHMgPyB7IGl4c19lc3U6IHMgfSA6IHVuZGVmaW5lZCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2KSB7IHJldHVybiB2OyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke29wdGlvbnMubW9kZWx9PXZhbHVlLml4c19lc3VgLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodj86IHsgaXhzX2VzdT86IHN0cmluZyB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHYgJiYgdi5peHNfZXN1ID8gdi5peHNfZXN1IDogR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEVtcHR5VmFsdWUob3B0aW9ucy5jYXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBlc3VfaWNvKG9wdGlvbnM6IElHRmlsdGVyT3B0aW9uRXN1KTogRWtvLkZpbHRlcnMuU2VydmVyRmlsdGVyT3B0aW9ucyB7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgbW9kZWw6ICdlc3VfaWNvJyxcclxuICAgICAgICAgICAgaXhzX2VzdVBhdGg6IFwiX2VzdV9pY29faXhzXCJcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6ICQuZXh0ZW5kKEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5nZXRGb3JtQm94RmlsdGVyRGVmYXVsdHMob3B0aW9ucyksIHtcclxuICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihvcHRpb25zLmNhcHRpb24gfHwgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsICQuZXh0ZW5kKGdldEVzdURlZmF1bHRzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmVzdV9pY289dmFsdWUuaWNvO21vZGVsLml4c19lc3U9dmFsdWUuaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJNaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7aWNvOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXJJdGVtVGVtcGxhdGU6IFwie2ljbzp0cmltOmVuY29kZX0gLSB7bmF6ZXY6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRUcmFuc2Zvcm06IChzKSA9PiB7IHJldHVybiBzID8geyBpY286IHMgfSA6IHVuZGVmaW5lZCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2KSB7IHJldHVybiB2OyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke29wdGlvbnMubW9kZWx9PXZhbHVlLmVzdV9pY287bW9kZWwuJHtvcHRpb25zLml4c19lc3VQYXRofT12YWx1ZS5peHNfZXN1YCxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHY/OiB7IGVzdV9pY286IHN0cmluZywgaXhzX2VzdTogc3RyaW5nIH0pID0+IHsgcmV0dXJuIHYgJiYgdi5lc3VfaWNvID8gdi5lc3VfaWNvIDogR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEVtcHR5VmFsdWUob3B0aW9ucy5jYXB0aW9uKTsgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBlc3VfcmMob3B0aW9uczogSUdGaWx0ZXJPcHRpb25Fc3VSYyk6IEVrby5GaWx0ZXJzLlNlcnZlckZpbHRlck9wdGlvbnMge1xyXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIG1vZGVsOiAnZXN1X3JjJyxcclxuICAgICAgICAgICAgaXhzX2VzdVBhdGg6IFwiX2VzdV9yY19peHNcIlxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyhvcHRpb25zKSwge1xyXG4gICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKG9wdGlvbnMuY2FwdGlvbiB8fCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgJC5leHRlbmQoZ2V0RXN1RGVmYXVsdHMoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZXN1X3JjPXZhbHVlLnJjO21vZGVsLml4c19lc3U9dmFsdWUuaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJNaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhb3B0aW9ucy5SYWRfRXN1X1JjVnlobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntyYzp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZFRyYW5zZm9ybTogKHMpID0+IHsgcmV0dXJuIHMgPyB7IHJjOiBzIH0gOiB1bmRlZmluZWQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiBmdW5jdGlvbiAodikgeyByZXR1cm4gdjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBgbW9kZWwuJHtvcHRpb25zLm1vZGVsfT12YWx1ZS5lc3VfcmM7bW9kZWwuJHtvcHRpb25zLml4c19lc3VQYXRofT12YWx1ZS5peHNfZXN1YCxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHY/OiB7IGVzdV9yYzogc3RyaW5nLCBpeHNfZXN1OiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2ICYmIHYuZXN1X3JjID8gdi5lc3VfcmMgOiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0RW1wdHlWYWx1ZShvcHRpb25zLmNhcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUeXAgYWdlbmR5LCBtb2RlbCBsemUgbWFwb3ZhdCBuYSBHb3JkaWMuRGF0YS5SZWFkZXJzLkdpbmN0YWdEdG8gKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzX3Z5cml6X3JlenNwKG9wdGlvbnM6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdGaWx0ZXJMYWJlbGVkT3B0aW9uRHRvKTogR29yZGljLkVrby5GaWx0ZXJzLlNlcnZlckZpbHRlck9wdGlvbnMge1xyXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7XHJcbiAgICAgICAgICAgIG1vZGVsOiAnc192eXJpel9yZXpzcCcsXHJcbiAgICAgICAgICAgIGlzUm96cG9jZXQ6IGZhbHNlXHJcbiAgICAgICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZGdldDogXCJnZm9ybWJveFwiLFxyXG4gICAgICAgICAgICBvcHRpb25zOiAkLmV4dGVuZChHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZ2V0Rm9ybUJveEZpbHRlckRlZmF1bHRzKG9wdGlvbnMpLCB7XHJcbiAgICAgICAgICAgICAgICBmb3JtOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24ob3B0aW9ucy5jYXB0aW9uIHx8IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3NwY3N2eSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic192eXJpel9yZXpzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zX3Z5cml6X3JlenNwPXZhbHVlLnNfdnlyaXpfcmV6c3A7bW9kZWwuc192eXJpel9yZXpzcF90eHQ9dmFsdWUuc192eXJpel9yZXpzcF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXJzOiB7IFBvdXplVmF6YW5lTmFGYXplOiBmYWxzZSwgRXhpc3R1amVWVGFidWxjZTogb3B0aW9ucy5pc1JvenBvY2V0ID8gXCJyb3pkeG1hXCIgOiBcInVjdGR4bWFcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodj86IHsgc192eXJpel9yZXpzcDogbnVtYmVyLCBzX3Z5cml6X3JlenNwX3R4dDogc3RyaW5nIH0pID0+IHsgcmV0dXJuIHYgJiYgdi5zX3Z5cml6X3JlenNwID8gdi5zX3Z5cml6X3JlenNwX3R4dCA6IEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRFbXB0eVZhbHVlKG9wdGlvbnMuY2FwdGlvbik7IH0sXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7b3B0aW9ucy5tb2RlbH09dmFsdWUuc192eXJpel9yZXpzcDttb2RlbC5zX3Z5cml6X3JlenNwX3R4dD12YWx1ZS5zX3Z5cml6X3JlenNwX3R4dGAgLy9OT1RFOiBQb3pvciEgbmEgdGVudG8gbW9kZWwgc2Ugc3BvbGVoYW0gdiBHU2V6bmFtRWtvWmF6bmFtdVRTLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudCgpLiBQcmkgem1lbmUgb3Rlc3RvdmF0IGN0cmwrY2xpY2sgbmEgc2V6bmFtdSEhIVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKiogVHlwIGFnZW5keSwgbW9kZWwgbHplIG1hcG92YXQgbmEgR29yZGljLkRhdGEuUmVhZGVycy5HaW5jdGFnRHRvICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdHlwX2FnKG9wdGlvbnM6IElHRmlsdGVyT3B0aW9uVHlwQWcpOiBHb3JkaWMuRWtvLkZpbHRlcnMuU2VydmVyRmlsdGVyT3B0aW9ucyB7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHtcclxuICAgICAgICAgICAgbW9kZWw6ICd0eXBfYWcnLFxyXG4gICAgICAgICAgICBpc1JvenBvY2V0OiBmYWxzZVxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyhvcHRpb25zKSwge1xyXG4gICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKG9wdGlvbnMuY2FwdGlvbiB8fCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmN0YWcoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfYWc9dmFsdWUudHlwX2FnO21vZGVsLnprcl9hZz12YWx1ZS56a3JfYWdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBQb3V6ZVZhemFuZU5hRmF6ZTogZmFsc2UsIEV4aXN0dWplVlRhYnVsY2U6IG9wdGlvbnMuaXNSb3pwb2NldCA/IFwicm96ZHhtYVwiIDogXCJ1Y3RkeG1hXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodj86IHsgdHlwX2FnOiBudW1iZXIsIHprcl9hZzogc3RyaW5nIH0pID0+IHsgcmV0dXJuIHYgJiYgdi50eXBfYWcgPyB2Lnprcl9hZyA6IEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRFbXB0eVZhbHVlKG9wdGlvbnMuY2FwdGlvbik7IH0sXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7b3B0aW9ucy5tb2RlbH09dmFsdWUudHlwX2FnO21vZGVsLiR7b3B0aW9ucy56a3JfYWdQYXRofT12YWx1ZS56a3JfYWdgIC8vTk9URTogUG96b3IhIG5hIHRlbnRvIG1vZGVsIHNlIHNwb2xlaGFtIHYgR1Nlem5hbUVrb1phem5hbXVUUy5kaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoKS4gUHJpIHptZW5lIG90ZXN0b3ZhdCBjdHJsK2NsaWNrIG5hIHNlem5hbXUhISFcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLyoqIERydWggIEdSZWFkZXJFa29jZGNoICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRydWhfY2hhcihvcHRpb25zOiBJR0ZpbHRlck9wdGlvblR5cFVjdHUpOiBHb3JkaWMuRWtvLkZpbHRlcnMuU2VydmVyRmlsdGVyT3B0aW9ucyB7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHtcclxuICAgICAgICAgICAgbW9kZWw6ICdkcnVoX2NoYXInLFxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyhvcHRpb25zKSwge1xyXG4gICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKG9wdGlvbnMuY2FwdGlvbiB8fCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NkY2goKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRydWhfY2hhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5kcnVoX2NoYXI9dmFsdWUuZHJ1aF9jaGFyO21vZGVsLmRydWhfY2hhcl90eHQ9dmFsdWUuZHJ1aF9jaGFyX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcnM6IHsgUG91emVWYXphbmVOYUZhemU6IGZhbHNlLCBFeGlzdHVqZVZUYWJ1bGNlOiBvcHRpb25zLmlzUm96cG9jZXQgPyBcInJvemR4bWFcIiA6IFwidWN0ZHhtYVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2PzogeyBkcnVoX2NoYXI6IG51bWJlciwgZHJ1aF9jaGFyX3R4dDogc3RyaW5nIH0pID0+IHsgcmV0dXJuIHYgJiYgdi5kcnVoX2NoYXIgPyB2LmRydWhfY2hhcl90eHQgOiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0RW1wdHlWYWx1ZShvcHRpb25zLmNhcHRpb24pOyB9LFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke29wdGlvbnMubW9kZWx9PXZhbHVlLmRydWhfY2hhcjttb2RlbC4ke29wdGlvbnMudHh0X25hbWV9PXZhbHVlLmRydWhfY2hhcl90eHRgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qKiBDaGFyYWt0ZXIgR1JlYWRlckVrb2NwY2ggKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBwcml6X2NoYXIob3B0aW9uczogSUdGaWx0ZXJPcHRpb25UeXBVY3R1KTogR29yZGljLkVrby5GaWx0ZXJzLlNlcnZlckZpbHRlck9wdGlvbnMge1xyXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7XHJcbiAgICAgICAgICAgIG1vZGVsOiAncHJpel9jaGFyJyxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6ICQuZXh0ZW5kKEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5nZXRGb3JtQm94RmlsdGVyRGVmYXVsdHMob3B0aW9ucyksIHtcclxuICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihvcHRpb25zLmNhcHRpb24gfHwgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jcGNoKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2NoYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucHJpel9jaGFyPXZhbHVlLnByaXpfY2hhcjttb2RlbC5wcml6X2NoYXJfdHh0PXZhbHVlLnByaXpfY2hhcl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXJzOiB7IFBvdXplVmF6YW5lTmFGYXplOiBmYWxzZSwgRXhpc3R1amVWVGFidWxjZTogb3B0aW9ucy5pc1JvenBvY2V0ID8gXCJyb3pkeG1hXCIgOiBcInVjdGR4bWFcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodj86IHsgcHJpel9jaGFyOiBudW1iZXIsIHByaXpfY2hhcl90eHQ6IHN0cmluZyB9KSA9PiB7IHJldHVybiB2ICYmIHYucHJpel9jaGFyID8gdi5wcml6X2NoYXJfdHh0IDogR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEVtcHR5VmFsdWUob3B0aW9ucy5jYXB0aW9uKTsgfSxcclxuICAgICAgICAgICAgICAgIC8vbW9kZWw6IGBtb2RlbC4ke29wdGlvbnMubW9kZWx9PXZhbHVlLnByaXpfY2hhcmBcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBgbW9kZWwuJHtvcHRpb25zLm1vZGVsfT12YWx1ZS5wcml6X2NoYXI7bW9kZWwucHJpel9jaGFyX3R4dD12YWx1ZS5wcml6X2NoYXJfdHh0YFxyXG4gICAgICAgICAgICAgICAgLy9tb2RlbDogZnVuY3Rpb24gKG9wLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgc3dpdGNoIChvcCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNhc2UgXCJhcHBseVwiOiBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IHZhbCA9ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBcclxufSJdfQ==