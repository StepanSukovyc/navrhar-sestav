(function ($) {
    "use strict";

    var Fields = namespace("Gordic.Prefabs.Select");

    Fields.gmail = function () {
        var service = new GContent("Gordic.Gin.WebClient.GMailDataService");
        var cache = {};

        function getData(ds) {
            if (cache[ds])
                return cache[ds];
            cache[ds] = service.call("GetMails", { dataSource: ds });
            return cache[ds];
        }

        var mailRegex = new RegExp("^[a-z\.0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

        return {
            selector: function (opts) {
                return new Gordic.Data.Selectors.DefaultSelector({
                    data: getData("Refs"),
                    //title: "",
                    gridFormat: new Gordic.Data.GridFormat()
                        .addTextColumn({ name: "Owner", caption: "jres:26275051" })  //RC 26275051 : Název
                        .addTextColumn({ name: "Email", caption: "jres:31110030" }), //RC 31110030 : Email
                    gridOpts: {
                        searchColumns: ["Owner", "Email"]
                    },
                    subTaskOpts: {
                        activeItem: 0,
                        params: [
                            {
                                action: new GAction({
                                    name: "refsAct", caption: "jres:31110026", //RC 31110026 : Seznam referentů
                                    run: function (ev, ctx) {
                                        var cnt = ctx.cnt;
                                        ctx.cnt.setData(getData("Refs"));
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "funcsAct", caption: "jres:31110027", //RC 31110027 : Seznam funkcí
                                    run: function (ev, ctx) {
                                        var cnt = ctx.cnt;
                                        ctx.cnt.setData(getData("Funcs"));
                                    }
                                })
                            },
                            //NOTE: BMartinek (23.4.2018): Zruseno na doporuceni APrasila kvuli GDPR
                            //{
                            //    action: new GAction({
                            //        name: "esuAct", caption: "jres:31110028", //RC 31110028 : Esu
                            //        run: function (ev, ctx) { ctx.cnt.setData(getData("Esu")); }
                            //    })
                            //},
                            {
                                action: new GAction({
                                    name: "ldapAct", caption: "jres:31110029", //RC 31110029 : Adresářové sluzby
                                    run: function (ev, ctx) {
                                        var cnt = ctx.cnt;
                                        ctx.cnt.setData(getData("Ldap"));
                                    }
                                })
                            }
                        ]
                    }
                }, opts).show()
            },
            data: function () {
                return getData("Refs");
            },
            helperColumns: ["Owner", "Email"],
            itemTemplate: "<span class='g-state-text {CustomClass}'>{Email:trim:encode}</span>",
            graphicInput: "always",
            multi: true,
            strict: false,
            itemWidth: "",
            invalidTransform: function (s) {
                var o = { Owner: "", Email: s };
                if (!mailRegex.test(s))
                    o.CustomClass = "g-state-error";
                return o;
            },
            modelValueTransform: {
                apply: function (val) {
                    /// <param name='val' type='Array'>[""]</param>
                    return val.map(function (o) { return { Email: o }; });
                },
                collect: function (val) {
                    /// <param name='val' type='Array'>[{Owner: "", Email: ""}]</param>
                    return val.map(function (o) { return o.Email; });
                }
            }
        };
    };
})(jQuery);