"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Adx;
    (function (Adx) {
        var WebClient;
        (function (WebClient) {
            let GMainApp = class GMainApp extends Gordic.GContentBase {
            };
            GMainApp = __decorate([
                Decorators.gcontent
            ], GMainApp);
            WebClient.GMainApp = GMainApp;
        })(WebClient = Adx.WebClient || (Adx.WebClient = {}));
    })(Adx = Gordic.Adx || (Gordic.Adx = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Adx;
    (function (Adx) {
        var WebClient;
        (function (WebClient) {
            let Dashboard = class Dashboard extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.setBreadcrumbs({ action: this.actions.actReload });
                    this.loadModuleInfo();
                }
                createActions() {
                    this.actions.addRange({
                        actReload: {
                            caption: "jres:33000011", //RC 33000011 : Úvodní stránka
                            run: (ev, ctx) => {
                                this.tryCloseAllSignificants();
                                this.navigate('Gordic.Adx.WebClient.Dashboard', { ID: 'startModuleAdx', taskId: 'startModuleAdx' });
                            }
                        }
                    });
                }
                loadModuleInfo() {
                    var result = [];
                    var secondaryText = this.NazevRef + " | " + this.NazevFun + " | " + "jres:33000009" + ": " + this.DatLoginTxt; //RC 33000009 : Poslední přihlášení
                    result.push(new GObservableObject({
                        name: "kpiLastUsed_0",
                        image: Gordic.Utils.IconBuilder.defaultInst.createModuleIcon("GWAADX05"),
                        primaryText: "jres:33000010", //RC 33000010 : Administrace
                        secondaryText: secondaryText,
                    }));
                    var moduleInfoItems = new Gordic.Data.View([{
                            id: "moduleInfo",
                            title: "",
                            zone: 1,
                            mode: "vertical",
                            itemTemplate: Gordic.Prefabs.Panels.kpiImageTwoRowsTextTemplate().itemTemplate,
                            defaultSelected: false,
                            data: new Gordic.Data.View(result)
                        }], { key: ["id"] });
                    $("<div>").appendTo(this.element).gdashboardpanel({
                        data: moduleInfoItems,
                        layout: "horizontal",
                        title: "",
                        sortable: true
                    });
                }
            };
            Dashboard = __decorate([
                Decorators.gcontent
            ], Dashboard);
            WebClient.Dashboard = Dashboard;
        })(WebClient = Adx.WebClient || (Adx.WebClient = {}));
    })(Adx = Gordic.Adx || (Gordic.Adx = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Adx;
    (function (Adx) {
        var WebClient;
        (function (WebClient) {
            let GAdxTaskList = class GAdxTaskList extends Gordic.GContentBase {
                onContentReady() {
                    const runWithChildren = new GAction({
                        name: "runWithChildren",
                        run: (ev, ctx) => {
                            $.content("main").navigateTask([
                                Gordic.Gui.WebApp.GSignpost,
                                {
                                    menuParams: ctx.children,
                                    uid: ctx.id,
                                    cntId: ctx.id,
                                    ID: ctx.id,
                                    icon: ctx.icon,
                                    caption: ctx.caption,
                                    isAuthService: this.isAuthService,
                                    addOpenInNewTab: true
                                }
                            ]);
                        }
                    });
                    $("body").on("gtasklistinternalbeforerefresh", ".gtasklist", (ev, mp) => {
                        for (let i = 0; i < mp.length; i++) {
                            const p = mp[i];
                            if (p.children) {
                                p.type = "action";
                                p.action = runWithChildren;
                                p.actionContext = {
                                    children: p.children,
                                    icon: p.icon,
                                    id: p.id,
                                    caption: p.caption
                                };
                                delete p.children;
                            }
                        }
                    });
                }
            };
            GAdxTaskList = __decorate([
                Decorators.gcontent
            ], GAdxTaskList);
            WebClient.GAdxTaskList = GAdxTaskList;
        })(WebClient = Adx.WebClient || (Adx.WebClient = {}));
    })(Adx = Gordic.Adx || (Gordic.Adx = {}));
})(Gordic || (Gordic = {}));
var Gordic;
(function (Gordic) {
    var Adx;
    (function (Adx) {
        var WebClient;
        (function (WebClient) {
            var Utils;
            (function (Utils) {
                class GResultGpcObject {
                }
                Utils.GResultGpcObject = GResultGpcObject;
                function ContentReadyAdx(ev) {
                    var currentCnt = $.content(ev.target);
                    var mainCnt = $.content('main');
                    // Test pro fáze
                    //if (mainCnt.fazeAdx == null || mainCnt.fazeAdx == undefined)
                    //    mainCnt.fazeAdx = [];
                    //var finded = mainCnt.fazeAdx.find(el => el.faze == currentCnt.fazeADX)
                    //if (finded == undefined || finded == null)
                    //    mainCnt.fazeAdx.push({ faze: currentCnt.fazeADX, gpc: currentCnt.gpc })
                    // Test pro sharedContext
                    if (currentCnt.sharedContext != "" && currentCnt.sharedContext != undefined && currentCnt.sharedContext != null) {
                        if (mainCnt.sharedContextAdx == null || mainCnt.sharedContextAdx == undefined)
                            mainCnt.sharedContextAdx = [];
                        var finded = mainCnt.sharedContextAdx.find(el => el.sharedContext == currentCnt.sharedContext);
                        if (finded == undefined || finded == null)
                            mainCnt.sharedContextAdx.push({ sharedContext: currentCnt.sharedContext, gpc: currentCnt.gpc });
                        // Create Flash 
                        createInfoFlash(currentCnt, currentCnt.sharedContext);
                    }
                }
                Utils.ContentReadyAdx = ContentReadyAdx;
                function GetGPC(/*faze*/ sharedContext) {
                    var mainCnt = $.content('main');
                    // Test pro fáze
                    //if (mainCnt.fazeAdx == null || mainCnt.fazeAdx == undefined)
                    //    return undefined;
                    //var finded = mainCnt.fazeAdx.find(el => el.faze == faze)
                    //if (finded != undefined && finded != null)
                    //    return finded.gpc;
                    //else
                    //    return undefined;
                    // Test pro sharedcontext
                    if (mainCnt.sharedContextAdx == null || mainCnt.sharedContextAdx == undefined)
                        return undefined;
                    var finded = mainCnt.sharedContextAdx.find(el => el.sharedContext == sharedContext);
                    if (finded != undefined && finded != null)
                        return finded.gpc;
                    else
                        return undefined;
                }
                Utils.GetGPC = GetGPC;
                function createInfoFlash(currentCnt, contextName) {
                    var gpc = currentCnt.gpc;
                    var keys = Object.keys(gpc);
                    var promises = [];
                    for (var i = 0; i < keys.length; i++) {
                        switch (keys[i]) {
                            case "ixs_ulz":
                                promises.push(new Gordic.Data.Readers.Wflsulz().getData({ ixs_ulz: gpc[keys[i]] }).then((res) => {
                                    var def = $.Deferred();
                                    var result = {
                                        caption: "jres:33000012", //RC 33000012 : Úřední deska
                                        captionTitle: "",
                                        value: (res[0].nazev) ? res[0].nazev : "",
                                        valueTitle: ""
                                    };
                                    return def.resolve(result);
                                }));
                                break;
                            case "nks":
                                promises.push(new Gordic.Data.Readers.Ekosnks().getData({ ico: gpc['ico'], nks: gpc['nks'] }).then((res) => {
                                    var def = $.Deferred();
                                    var result = {
                                        caption: "jres:33000013", //RC 33000013 : NS
                                        captionTitle: "jres:33000015", //RC 33000015 : Nákladové středisko
                                        value: gpc['nks'].toString(),
                                        valueTitle: (res[0].nazev) ? res[0].nazev : ""
                                    };
                                    return def.resolve(result);
                                }));
                                break;
                            case "ico":
                                if (contextName == "adminit") {
                                    promises.push(new Gordic.Data.Readers.Ginsico().getData({ ico: gpc['ico'] }).then((res) => {
                                        var def = $.Deferred();
                                        var result = {
                                            caption: "jres:33000014", //RC 33000014 : IČO
                                            captionTitle: "",
                                            value: gpc['ico'].toString() + " - " + ((res[0].nazev) ? res[0].nazev : ""),
                                            valueTitle: "",
                                        };
                                        return def.resolve(result);
                                    }));
                                }
                                else {
                                    promises.push(new Gordic.Data.Readers.Ekosico().getData({ ico: gpc['ico'] }).then((res) => {
                                        var def = $.Deferred();
                                        var result = {
                                            caption: "jres:33000014", //RC 33000014 : IČO
                                            captionTitle: "",
                                            value: gpc['ico'].toString(),
                                            valueTitle: (res[0].nazev) ? res[0].nazev : ""
                                        };
                                        return def.resolve(result);
                                    }));
                                }
                                break;
                            case "ucs":
                                promises.push(new Gordic.Data.Readers.Ekosucs().getData({ ico: gpc['ico'], ucs: gpc['ucs'] }).then((res) => {
                                    var def = $.Deferred();
                                    var result = {
                                        caption: "jres:33000016", //RC 33000016 : UCS
                                        captionTitle: "jres:33000017", //RC 33000017 : Účetní středisko
                                        value: gpc['ucs'].toString(),
                                        valueTitle: (res[0].nazev) ? res[0].nazev : ""
                                    };
                                    return def.resolve(result);
                                }));
                                break;
                            case "rok":
                                var promise = $.Deferred(function () {
                                    var def = this;
                                    var result = {
                                        caption: "jres:33000018", //RC 33000018 : ROK
                                        captionTitle: "",
                                        value: gpc['rok'].toString(),
                                        valueTitle: ""
                                    };
                                    return def.resolve(result);
                                });
                                promises.push(promise);
                                break;
                            case "mesic":
                                if (contextName?.includes("paminit")) {
                                    var promise = $.Deferred(function () {
                                        var def = this;
                                        var result = {
                                            caption: "MĚSÍC",
                                            captionTitle: "",
                                            value: gpc['mesic'].toString(),
                                            valueTitle: ""
                                        };
                                        return def.resolve(result);
                                    });
                                    promises.push(promise);
                                }
                                break;
                        }
                    }
                    if (promises.length != 0) {
                        var flashCnt = $("<div>");
                        var result = $("<span>").appendTo(flashCnt).text("jres:33000019");
                        var i = 0;
                        promises.forEach((promise) => {
                            promise.then((o) => {
                                i++;
                                $("<span>").appendTo(result).attr("title", (o.captionTitle != "") ? o.captionTitle : null).html("&nbsp;" + o.caption + ":");
                                $("<span>").appendTo(result).attr("title", (o.valueTitle != "") ? o.valueTitle : null).html("&nbsp;{0}{1}".format(o.value, (i == promises.length) ? "." : ","));
                                return i;
                            }).then((o) => {
                                if (o == promises.length) {
                                    $("<a>").appendTo(result).glink({
                                        params: {
                                            actionContext: { contextName: contextName },
                                            action: new GAction({
                                                name: "actDeleteContext",
                                                caption: "jres:33000020", //RC 33000020 : Smazat přihlášené informace
                                                tooltip: "jres:33000021", //RC 33000021 : Smaže příslušné informace nastavené pro tento content a jemu podobné contenty. Při opětovném načtení budete vyzváni k novému zadání doplňujících informací.
                                                run: (ev, ctx) => {
                                                    removeContextGpc(ctx.contextName);
                                                }
                                            })
                                        }
                                    });
                                    currentCnt.hideFlash("context-flash");
                                    currentCnt.showFlash({
                                        id: "context-flash",
                                        content: result,
                                        state: "info",
                                    });
                                }
                            });
                        });
                    }
                }
                Utils.createInfoFlash = createInfoFlash;
                //export function ShowFlashAccess() {
                //    debugger;
                //    $("<body>").children.on("oncontentready", (ev) => {
                //        debugger;
                //    })
                //}
                function removeContextGpc(contextName) {
                    var mainCnt = $.content('main');
                    var sharedGpcs = mainCnt.sharedContextAdx;
                    var sharedGpcsNew = sharedGpcs.filter((obj) => {
                        return obj.sharedContext !== contextName;
                    });
                    mainCnt.sharedContextAdx = sharedGpcsNew;
                    $.content('main').dialogs.confirm("Otázka", "Opravdu si přejete uvedené kontextové informace smazat?<br /><br />Při dalším přístupu na contenty této oblasti může být vyzváni k doplnění informací.");
                }
                Utils.removeContextGpc = removeContextGpc;
            })(Utils = WebClient.Utils || (WebClient.Utils = {}));
        })(WebClient = Adx.WebClient || (Adx.WebClient = {}));
    })(Adx = Gordic.Adx || (Gordic.Adx = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR4LndlYmNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuL0Vrby8iLCJzb3VyY2VzIjpbIk1haW5BcHAudHMiLCJDb250ZW50cy9EYXNoYm9hcmQudHMiLCJDb250ZW50cy9HQWR4VGFza0xpc3QudHMiLCJDb250ZW50cy9hZHh1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBS2Y7QUFMRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FLbkI7SUFMZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBSzdCO1FBTG9CLFdBQUEsU0FBUztZQUUxQixJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFTLFNBQVEsT0FBQSxZQUFZO2FBRXpDLENBQUE7WUFGWSxRQUFRO2dCQURwQixVQUFVLENBQUMsUUFBUTtlQUNQLFFBQVEsQ0FFcEI7WUFGWSxrQkFBUSxXQUVwQixDQUFBO1FBQ0wsQ0FBQyxFQUxvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFLN0I7SUFBRCxDQUFDLEVBTGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQUtuQjtBQUFELENBQUMsRUFMUyxNQUFNLEtBQU4sTUFBTSxRQUtmO0FDTEQsSUFBVSxNQUFNLENBcURmO0FBckRELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXFEbkI7SUFyRGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXFEN0I7UUFyRG9CLFdBQUEsU0FBUztZQUUxQixJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsT0FBQSxZQUFZO2dCQUt2QyxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7b0JBQ3ZELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFFTyxhQUFhO29C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QyxPQUFPLENBQUMsUUFBUSxFQUFFLHdKQUF3SixDQUFDLENBQUE7Z0JBQ3pNLENBQUM7Z0JBUmUsc0JBQWdCLG1CQVEvQixDQUFBO1lBQ0wsQ0FBQyxFQXZNOEIsS0FBSyxHQUFMLGVBQUssS0FBTCxlQUFLLFFBdU1uQztRQUFELENBQUMsRUF2TW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXVNN0I7SUFBRCxDQUFDLEVBdk1nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1TW5CO0FBQUQsQ0FBQyxFQXZNUyxNQUFNLEtBQU4sTUFBTSxRQXVNZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuQWR4LldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdNYWluQXBwIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBHb3JkaWMuQWR4LldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIERhc2hib2FyZCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBOYXpldlJlZjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgTmF6ZXZGdW46IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIERhdExvZ2luVHh0OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyh7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFJlbG9hZCB9KVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRNb2R1bGVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RSZWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMTFcIiwgLy9SQyAzMzAwMDAxMSA6IMOadm9kbsOtIHN0csOhbmthXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZSgnR29yZGljLkFkeC5XZWJDbGllbnQuRGFzaGJvYXJkJywgeyBJRDogJ3N0YXJ0TW9kdWxlQWR4JywgdGFza0lkOiAnc3RhcnRNb2R1bGVBZHgnIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkTW9kdWxlSW5mbygpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgdmFyIHNlY29uZGFyeVRleHQgPSB0aGlzLk5hemV2UmVmICsgXCIgfCBcIiArIHRoaXMuTmF6ZXZGdW4gKyBcIiB8IFwiICsgXCJqcmVzOjMzMDAwMDA5XCIgKyBcIjogXCIgKyB0aGlzLkRhdExvZ2luVHh0OyAvL1JDIDMzMDAwMDA5IDogUG9zbGVkbsOtIHDFmWlobMOhxaFlbsOtXHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrcGlMYXN0VXNlZF8wXCIsXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogR29yZGljLlV0aWxzLkljb25CdWlsZGVyLmRlZmF1bHRJbnN0LmNyZWF0ZU1vZHVsZUljb24oXCJHV0FBRFgwNVwiKSxcclxuICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0OiBcImpyZXM6MzMwMDAwMTBcIiwgLy9SQyAzMzAwMDAxMCA6IEFkbWluaXN0cmFjZVxyXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dDogc2Vjb25kYXJ5VGV4dCxcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIHZhciBtb2R1bGVJbmZvSXRlbXMgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwibW9kdWxlSW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB6b25lOiAxLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpSW1hZ2VUd29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJlc3VsdClcclxuICAgICAgICAgICAgfV0sIHsga2V5OiBbXCJpZFwiXSB9KVxyXG5cclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Rhc2hib2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IG1vZHVsZUluZm9JdGVtcyxcclxuICAgICAgICAgICAgICAgIGxheW91dDogXCJob3Jpem9udGFsXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZHguV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FkeFRhc2tMaXN0IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBpc0F1dGhTZXJ2aWNlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgcnVuV2l0aENoaWxkcmVuID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJydW5XaXRoQ2hpbGRyZW5cIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHg6IHsgY2hpbGRyZW46IE1lbnVQYXJhbXNbXSwgaWNvbjogc3RyaW5nLCBpZDogc3RyaW5nLCBjYXB0aW9uOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkubmF2aWdhdGVUYXNrKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkd1aS5XZWJBcHAuR1NpZ25wb3N0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51UGFyYW1zOiBjdHguY2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IGN0eC5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudElkOiBjdHguaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogY3R4LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogY3R4Lmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjdHguY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQXV0aFNlcnZpY2U6IHRoaXMuaXNBdXRoU2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZE9wZW5Jbk5ld1RhYjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5vbihcImd0YXNrbGlzdGludGVybmFsYmVmb3JlcmVmcmVzaFwiLCBcIi5ndGFza2xpc3RcIiwgKGV2LCBtcDogTWVudVBhcmFtc1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1wLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IG1wW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAudHlwZSA9IFwiYWN0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAuYWN0aW9uID0gcnVuV2l0aENoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLmFjdGlvbkNvbnRleHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogcC5jaGlsZHJlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IHAuaWNvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogcC5jYXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEdvcmRpYy5BZHguV2ViQ2xpZW50LlV0aWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHUmVzdWx0R3BjT2JqZWN0IHtcclxuICAgICAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgICAgIGNhcHRpb246IHN0cmluZztcclxuICAgICAgICB2YWx1ZVRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgY2FwdGlvblRpdGxlOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvbnRlbnRSZWFkeUFkeChldikge1xyXG4gICAgICAgIHZhciBjdXJyZW50Q250ID0gJC5jb250ZW50KGV2LnRhcmdldCkgYXMgYW55O1xyXG4gICAgICAgIHZhciBtYWluQ250ID0gKCQuY29udGVudCgnbWFpbicpIGFzIGFueSlcclxuICAgICAgICAvLyBUZXN0IHBybyBmw6F6ZVxyXG4gICAgICAgIC8vaWYgKG1haW5DbnQuZmF6ZUFkeCA9PSBudWxsIHx8IG1haW5DbnQuZmF6ZUFkeCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgLy8gICAgbWFpbkNudC5mYXplQWR4ID0gW107XHJcbiAgICAgICAgLy92YXIgZmluZGVkID0gbWFpbkNudC5mYXplQWR4LmZpbmQoZWwgPT4gZWwuZmF6ZSA9PSBjdXJyZW50Q250LmZhemVBRFgpXHJcbiAgICAgICAgLy9pZiAoZmluZGVkID09IHVuZGVmaW5lZCB8fCBmaW5kZWQgPT0gbnVsbClcclxuICAgICAgICAvLyAgICBtYWluQ250LmZhemVBZHgucHVzaCh7IGZhemU6IGN1cnJlbnRDbnQuZmF6ZUFEWCwgZ3BjOiBjdXJyZW50Q250LmdwYyB9KVxyXG4gICAgICAgIC8vIFRlc3QgcHJvIHNoYXJlZENvbnRleHRcclxuICAgICAgICBpZiAoY3VycmVudENudC5zaGFyZWRDb250ZXh0ICE9IFwiXCIgJiYgY3VycmVudENudC5zaGFyZWRDb250ZXh0ICE9IHVuZGVmaW5lZCAmJiBjdXJyZW50Q250LnNoYXJlZENvbnRleHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAobWFpbkNudC5zaGFyZWRDb250ZXh0QWR4ID09IG51bGwgfHwgbWFpbkNudC5zaGFyZWRDb250ZXh0QWR4ID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIG1haW5DbnQuc2hhcmVkQ29udGV4dEFkeCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZmluZGVkID0gbWFpbkNudC5zaGFyZWRDb250ZXh0QWR4LmZpbmQoZWwgPT4gZWwuc2hhcmVkQ29udGV4dCA9PSBjdXJyZW50Q250LnNoYXJlZENvbnRleHQpXHJcbiAgICAgICAgICAgIGlmIChmaW5kZWQgPT0gdW5kZWZpbmVkIHx8IGZpbmRlZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWFpbkNudC5zaGFyZWRDb250ZXh0QWR4LnB1c2goeyBzaGFyZWRDb250ZXh0OiBjdXJyZW50Q250LnNoYXJlZENvbnRleHQsIGdwYzogY3VycmVudENudC5ncGMgfSlcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIEZsYXNoIFxyXG4gICAgICAgICAgICBjcmVhdGVJbmZvRmxhc2goY3VycmVudENudCwgY3VycmVudENudC5zaGFyZWRDb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEdQQygvKmZhemUqLyBzaGFyZWRDb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIG1haW5DbnQgPSAoJC5jb250ZW50KCdtYWluJykgYXMgYW55KVxyXG4gICAgICAgIC8vIFRlc3QgcHJvIGbDoXplXHJcbiAgICAgICAgLy9pZiAobWFpbkNudC5mYXplQWR4ID09IG51bGwgfHwgbWFpbkNudC5mYXplQWR4ID09IHVuZGVmaW5lZClcclxuICAgICAgICAvLyAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIC8vdmFyIGZpbmRlZCA9IG1haW5DbnQuZmF6ZUFkeC5maW5kKGVsID0+IGVsLmZhemUgPT0gZmF6ZSlcclxuICAgICAgICAvL2lmIChmaW5kZWQgIT0gdW5kZWZpbmVkICYmIGZpbmRlZCAhPSBudWxsKVxyXG4gICAgICAgIC8vICAgIHJldHVybiBmaW5kZWQuZ3BjO1xyXG4gICAgICAgIC8vZWxzZVxyXG4gICAgICAgIC8vICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgLy8gVGVzdCBwcm8gc2hhcmVkY29udGV4dFxyXG4gICAgICAgIGlmIChtYWluQ250LnNoYXJlZENvbnRleHRBZHggPT0gbnVsbCB8fCBtYWluQ250LnNoYXJlZENvbnRleHRBZHggPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHZhciBmaW5kZWQgPSBtYWluQ250LnNoYXJlZENvbnRleHRBZHguZmluZChlbCA9PiBlbC5zaGFyZWRDb250ZXh0ID09IHNoYXJlZENvbnRleHQpXHJcbiAgICAgICAgaWYgKGZpbmRlZCAhPSB1bmRlZmluZWQgJiYgZmluZGVkICE9IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmaW5kZWQuZ3BjO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbmZvRmxhc2goY3VycmVudENudDogR0NvbnRlbnQsIGNvbnRleHROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgZ3BjID0gY3VycmVudENudC5ncGM7XHJcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhncGMpO1xyXG4gICAgICAgIHZhciBwcm9taXNlczogYW55ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIml4c191bHpcIjpcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLldmbHN1bHooKS5nZXREYXRhKHsgaXhzX3VsejogZ3BjW2tleXNbaV1dIH0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0OiBHUmVzdWx0R3BjT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDEyXCIsIC8vUkMgMzMwMDAwMTIgOiDDmsWZZWRuw60gZGVza2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb25UaXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAocmVzWzBdLm5hemV2KSA/IHJlc1swXS5uYXpldiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVRpdGxlOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJua3NcIjpcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLkVrb3Nua3MoKS5nZXREYXRhKHsgaWNvOiBncGNbJ2ljbyddLCBua3M6IGdwY1snbmtzJ10gfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQ6IEdSZXN1bHRHcGNPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMTNcIiwgLy9SQyAzMzAwMDAxMyA6IE5TXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVGl0bGU6IFwianJlczozMzAwMDAxNVwiLCAvL1JDIDMzMDAwMDE1IDogTsOha2xhZG92w6kgc3TFmWVkaXNrb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGdwY1snbmtzJ10udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVGl0bGU6IChyZXNbMF0ubmF6ZXYpID8gcmVzWzBdLm5hemV2IDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWNvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHROYW1lID09IFwiYWRtaW5pdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuR2luc2ljbygpLmdldERhdGEoeyBpY286IGdwY1snaWNvJ10gfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdDogR1Jlc3VsdEdwY09iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMwMDAwMTRcIiwgLy9SQyAzMzAwMDAxNCA6IEnEjE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGdwY1snaWNvJ10udG9TdHJpbmcoKSArIFwiIC0gXCIgKyAoKHJlc1swXS5uYXpldikgPyByZXNbMF0ubmF6ZXYgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgR29yZGljLkRhdGEuUmVhZGVycy5Fa29zaWNvKCkuZ2V0RGF0YSh7IGljbzogZ3BjWydpY28nXSB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0OiBHUmVzdWx0R3BjT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxNFwiLCAvL1JDIDMzMDAwMDE0IDogScSMT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb25UaXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZ3BjWydpY28nXS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVGl0bGU6IChyZXNbMF0ubmF6ZXYpID8gcmVzWzBdLm5hemV2IDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVjc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuRWtvc3VjcygpLmdldERhdGEoeyBpY286IGdwY1snaWNvJ10sIHVjczogZ3BjWyd1Y3MnXSB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdDogR1Jlc3VsdEdwY09iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzAwMDAxNlwiLCAvL1JDIDMzMDAwMDE2IDogVUNTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uVGl0bGU6IFwianJlczozMzAwMDAxN1wiLCAvL1JDIDMzMDAwMDE3IDogw5rEjWV0bsOtIHN0xZllZGlza29cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBncGNbJ3VjcyddLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVRpdGxlOiAocmVzWzBdLm5hemV2KSA/IHJlc1swXS5uYXpldiA6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJva1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gJC5EZWZlcnJlZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0OiBHUmVzdWx0R3BjT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDE4XCIsIC8vUkMgMzMwMDAwMTggOiBST0tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb25UaXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBncGNbJ3JvayddLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVRpdGxlOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtZXNpY1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0TmFtZT8uaW5jbHVkZXMoXCJwYW1pbml0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gJC5EZWZlcnJlZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQ6IEdSZXN1bHRHcGNPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNxJpTw41DXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvblRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBncGNbJ21lc2ljJ10udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVRpdGxlOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJvbWlzZXMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgdmFyIGZsYXNoQ250OiBKUXVlcnk8SFRNTEVsZW1lbnQ+ID0gJChcIjxkaXY+XCIpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJChcIjxzcGFuPlwiKS5hcHBlbmRUbyhmbGFzaENudCkudGV4dChcImpyZXM6MzMwMDAwMTlcIik7XHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgcHJvbWlzZXMuZm9yRWFjaCgocHJvbWlzZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKChvOiBHUmVzdWx0R3BjT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCI8c3Bhbj5cIikuYXBwZW5kVG8ocmVzdWx0KS5hdHRyKFwidGl0bGVcIiwgKG8uY2FwdGlvblRpdGxlICE9IFwiXCIpID8gby5jYXB0aW9uVGl0bGUgOiBudWxsKS5odG1sKFwiJm5ic3A7XCIgKyBvLmNhcHRpb24gKyBcIjpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIjxzcGFuPlwiKS5hcHBlbmRUbyhyZXN1bHQpLmF0dHIoXCJ0aXRsZVwiLCAoby52YWx1ZVRpdGxlICE9IFwiXCIpID8gby52YWx1ZVRpdGxlIDogbnVsbCkuaHRtbChcIiZuYnNwO3swfXsxfVwiLmZvcm1hdChvLnZhbHVlLCAoaSA9PSBwcm9taXNlcy5sZW5ndGgpID8gXCIuXCIgOiBcIixcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8gPT0gcHJvbWlzZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCI8YT5cIikuYXBwZW5kVG8ocmVzdWx0KS5nbGluayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25Db250ZXh0OiB7IGNvbnRleHROYW1lOiBjb250ZXh0TmFtZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERlbGV0ZUNvbnRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMDAwMDIwXCIsIC8vUkMgMzMwMDAwMjAgOiBTbWF6YXQgcMWZaWhsw6HFoWVuw6kgaW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzAwMDAyMVwiLCAvL1JDIDMzMDAwMDIxIDogU21hxb5lIHDFmcOtc2x1xaFuw6kgaW5mb3JtYWNlIG5hc3RhdmVuw6kgcHJvIHRlbnRvIGNvbnRlbnQgYSBqZW11IHBvZG9ibsOpIGNvbnRlbnR5LiBQxZlpIG9wxJt0b3Zuw6ltIG5hxI10ZW7DrSBidWRldGUgdnl6dsOhbmkgayBub3bDqW11IHphZMOhbsOtIGRvcGzFiHVqw61jw61jaCBpbmZvcm1hY8OtLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDb250ZXh0R3BjKGN0eC5jb250ZXh0TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q250LmhpZGVGbGFzaChcImNvbnRleHQtZmxhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDbnQuc2hvd0ZsYXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImNvbnRleHQtZmxhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlc3VsdCBhcyBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9leHBvcnQgZnVuY3Rpb24gU2hvd0ZsYXNoQWNjZXNzKCkge1xyXG4gICAgLy8gICAgZGVidWdnZXI7XHJcbiAgICAvLyAgICAkKFwiPGJvZHk+XCIpLmNoaWxkcmVuLm9uKFwib25jb250ZW50cmVhZHlcIiwgKGV2KSA9PiB7XHJcbiAgICAvLyAgICAgICAgZGVidWdnZXI7XHJcbiAgICAvLyAgICB9KVxyXG4gICAgLy99XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNvbnRleHRHcGMoY29udGV4dE5hbWUpIHtcclxuICAgICAgICB2YXIgbWFpbkNudCA9ICgkLmNvbnRlbnQoJ21haW4nKSBhcyBhbnkpO1xyXG4gICAgICAgIHZhciBzaGFyZWRHcGNzID0gbWFpbkNudC5zaGFyZWRDb250ZXh0QWR4O1xyXG4gICAgICAgIHZhciBzaGFyZWRHcGNzTmV3ID0gc2hhcmVkR3Bjcy5maWx0ZXIoKG9iaikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqLnNoYXJlZENvbnRleHQgIT09IGNvbnRleHROYW1lO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWFpbkNudC5zaGFyZWRDb250ZXh0QWR4ID0gc2hhcmVkR3Bjc05ldztcclxuICAgICAgICAkLmNvbnRlbnQoJ21haW4nKS5kaWFsb2dzLmNvbmZpcm0oXCJPdMOhemthXCIsIFwiT3ByYXZkdSBzaSBwxZllamV0ZSB1dmVkZW7DqSBrb250ZXh0b3bDqSBpbmZvcm1hY2Ugc21hemF0PzxiciAvPjxiciAvPlDFmWkgZGFsxaHDrW0gcMWZw61zdHVwdSBuYSBjb250ZW50eSB0w6l0byBvYmxhc3RpIG3Fr8W+ZSBiw710IHZ5enbDoW5pIGsgZG9wbG7Em27DrSBpbmZvcm1hY8OtLlwiKVxyXG4gICAgfVxyXG59Il19