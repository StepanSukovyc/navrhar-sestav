"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            function GUkonyControl(content) {
                const predek = Gordic.Gin.WebClient.RegSpa.GSubListControl;
                return $.extend({}, predek, {
                    idSettings: "GUkonyControl",
                    detailContent: content,
                    serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GUkonyControl"),
                    dataViewKey: ["ixp_ukon"],
                    searchColumns: ["ixp_ukon"],
                    detailHeight: 1000,
                    showDelete: false,
                    showRestore: false,
                    showFilters: false,
                    createGridFormat: function () {
                        var that = this;
                        var gridFormat;
                        gridFormat = new Gordic.Data.GridFormat();
                        if (that.detailContent.contextProp("debugMode")) {
                            //if ((window as any).ginisDebugMode) {
                            gridFormat = gridFormat.addTextColumn({ name: "ixs_duk", caption: "IXS_DUK", width: 150, fixedWidth: false });
                        }
                        gridFormat = gridFormat
                            .addTextColumn({
                            name: "ixp_ukon",
                            caption: "jres:25200100", //RC 25200100 : Identifikátor
                            width: 150,
                            fragment: ""
                        })
                            .addDateTimeColumn({
                            name: "dat_pod",
                            caption: "jres:25200101", //RC 25200101 : Datum podání
                            width: 100,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "cj_dok",
                            caption: "jres:25200102", //RC 25200102 : Označení dokumentu
                            width: 200,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "akt_znacka",
                            caption: "jres:25200103", //RC 25200103 : ČJ dokumentu
                            width: 200,
                            fragment: ""
                        })
                            .addDateColumn({
                            name: "dat_pr_moc",
                            caption: "jres:25200106", //RC 25200106 : Datum PM
                            width: 100,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "nazev_duk",
                            caption: "jres:25200104", //RC 25200104 : Název
                            width: 300,
                            fragment: ""
                        })
                            .addBooleanColumn({ name: "s_vypraveno", caption: "Vypraveno", width: 90, fixedWidth: false })
                            .addDateColumn({
                            name: "dat_vypraveni",
                            caption: "jres:25300037", //RC 25300037 : Datum vypravení
                            width: 130,
                            fragment: ""
                        })
                            .addBooleanColumn({ name: "s_doruceno", caption: "Doručeno", width: 85, fixedWidth: false })
                            .addDateColumn({
                            name: "dat_doruceni",
                            caption: "jres:25200234", //RC 25200234 : Datum doručení
                            width: 130,
                            fragment: ""
                        });
                        return gridFormat;
                    },
                    beforeOpenDetail: function (row, rezim, gridRc) {
                        console.log("Before open detail - ukony");
                        var def = $.Deferred();
                        var that = this;
                        if (rezim == 2 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.New */) {
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                                ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremUsuGenPid
                            };
                            console.log("GenerovaniIxp");
                            Gordic.Wfl.Dialogs.GenerovaniIxp(content, options, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow).done(function (rv, cont) {
                                console.log("rv...");
                                console.log(rv);
                                if (rv) {
                                    if (rv.IxpExist === false) {
                                        def.resolve({ ixp_spis: content.model.ixp_spis, ixp_ukon: rv.Ixp });
                                    }
                                    else {
                                        def.reject();
                                    }
                                }
                                else
                                    def.reject();
                            });
                        }
                        else
                            def.resolve(row);
                        return def.promise();
                    },
                    openDetail: function (row, rezim, gridRc, width, height, modal) {
                        var that = this;
                        var ixpSpis;
                        var ixpUkon;
                        if (row != null && row != undefined) {
                            ixpSpis = row.ixp_spis;
                            ixpUkon = row.ixp_ukon;
                        }
                        else if (this.detailContent != null) {
                            ixpSpis = this.detailContent.originalModel.ixp_spis;
                        }
                        return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailUkonu", { gridRemoteControl: gridRc }], {
                            RezimDetailu: rezim,
                            IxpSpis: ixpSpis,
                            IxpUkon: ixpUkon,
                            IxsDsr: content.model.ixs_dsr,
                            Id: "detail_ukon"
                        });
                    },
                    onCloseDetail: function (ev, r) {
                        var that = this;
                        // Pokud je přidán nebo změněn úkon, předej id nadřazenému detailu pro nové načtení dat a nastavení activeRow.
                        if (r != undefined && r.Zmena) {
                            var gTabManager = content.find(".gtabmanager");
                            var active;
                            if (gTabManager != null && gTabManager != undefined)
                                active = gTabManager.gtabmanager("getActive");
                            content.load({ RezimDetailu: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */, internal: true, selectedTabGroup: active, identifikatorUkonu: r.Model["ixp_ukon"] });
                        }
                    }
                });
            }
            WebApp.GUkonyControl = GUkonyControl;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Vrb255Q29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdVa29ueUNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTJJZjtBQTNJRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EySW5CO0lBM0lnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0EySTFCO1FBM0lvQixXQUFBLE1BQU07WUFDdkIsU0FBZ0IsYUFBYSxDQUFDLE9BQWdLO2dCQUMxTCxNQUFNLE1BQU0sR0FBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBc0UsQ0FBQztnQkFDbkgsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUU7b0JBQ3hCLFVBQVUsRUFBRSxlQUFlO29CQUMzQixhQUFhLEVBQUUsT0FBTztvQkFDdEIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBaUMsQ0FBQztvQkFDL0UsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUN6QixhQUFhLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQzNCLFlBQVksRUFBRSxJQUFJO29CQUNsQixVQUFVLEVBQUUsS0FBSztvQkFDakIsV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLFdBQVcsRUFBRSxLQUFLO29CQUNsQixnQkFBZ0IsRUFBRTt3QkFDZCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQ2hCLElBQUksVUFBd0UsQ0FBQzt3QkFDN0UsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQXdDLENBQUM7d0JBQ2hGLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQzs0QkFDbEQsdUNBQXVDOzRCQUNuQyxVQUFVLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxF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QyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3ZLLENBQUM7b0JBQ0wsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1lBekllLG9CQUFhLGdCQXlJNUIsQ0FBQTtRQUNMLENBQUMsRUEzSW9CLE1BQU0sR0FBTixVQUFNLEtBQU4sVUFBTSxRQTJJMUI7SUFBRCxDQUFDLEVBM0lnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEySW5CO0FBQUQsQ0FBQyxFQTNJUyxNQUFNLEtBQU4sTUFBTSxRQTJJZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR1Vrb255Q29udHJvbChjb250ZW50OiAoR0NvbnRlbnQgJiBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0Jhc2VEZXRhaWxDb21wb25lbnRFeHRlbnNpb25zKSB8IChHQ29udGVudCAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbFJlbG9hZENvbXBvbmVudEV4dGVuc2lvbnMpKTogR0NvbnRlbnQge1xyXG4gICAgICAgIGNvbnN0IHByZWRlayA9IChHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sIGFzIGFueSBhcyBHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR1N1Ykxpc3RDb250cm9sKTtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIHByZWRlaywge1xyXG4gICAgICAgICAgICBpZFNldHRpbmdzOiBcIkdVa29ueUNvbnRyb2xcIixcclxuICAgICAgICAgICAgZGV0YWlsQ29udGVudDogY29udGVudCxcclxuICAgICAgICAgICAgc2VydmljZUNvbnRlbnQ6IGNvbnRlbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuU3ByLldlYkFwcC5HVWtvbnlDb250cm9sXCIpLFxyXG4gICAgICAgICAgICBkYXRhVmlld0tleTogW1wiaXhwX3Vrb25cIl0sXHJcbiAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIml4cF91a29uXCJdLCAgXHJcbiAgICAgICAgICAgIGRldGFpbEhlaWdodDogMTAwMCxcclxuICAgICAgICAgICAgc2hvd0RlbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dSZXN0b3JlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0ZpbHRlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICBjcmVhdGVHcmlkRm9ybWF0OiBmdW5jdGlvbiAoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtVWtvbnVEdG8+IHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBncmlkRm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Va29udUR0bz47XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbVVrb251RHRvPigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuZGV0YWlsQ29udGVudC5jb250ZXh0UHJvcChcImRlYnVnTW9kZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoKHdpbmRvdyBhcyBhbnkpLmdpbmlzRGVidWdNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX2R1a1wiLCBjYXB0aW9uOiBcIklYU19EVUtcIiwgd2lkdGg6IDE1MCwgZml4ZWRXaWR0aDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfdWtvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMDBcIiwgLy9SQyAyNTIwMDEwMCA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wb2RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTAxXCIsIC8vUkMgMjUyMDAxMDEgOiBEYXR1bSBwb2TDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNqX2Rva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMDJcIiwgLy9SQyAyNTIwMDEwMiA6IE96bmHEjWVuw60gZG9rdW1lbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0X3puYWNrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMDNcIiwgLy9SQyAyNTIwMDEwMyA6IMSMSiBkb2t1bWVudHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcHJfbW9jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEwNlwiLCAvL1JDIDI1MjAwMTA2IDogRGF0dW0gUE1cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9kdWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTA0XCIsIC8vUkMgMjUyMDAxMDQgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRCb29sZWFuQ29sdW1uKHsgbmFtZTogXCJzX3Z5cHJhdmVub1wiLCBjYXB0aW9uOiBcIlZ5cHJhdmVub1wiLCB3aWR0aDogOTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eXByYXZlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MzAwMDM3XCIsIC8vUkMgMjUzMDAwMzcgOiBEYXR1bSB2eXByYXZlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQm9vbGVhbkNvbHVtbih7IG5hbWU6IFwic19kb3J1Y2Vub1wiLCBjYXB0aW9uOiBcIkRvcnXEjWVub1wiLCB3aWR0aDogODUsIGZpeGVkV2lkdGg6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb3J1Y2VuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyMzRcIiwgLy9SQyAyNTIwMDIzNCA6IERhdHVtIGRvcnXEjWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0OyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGJlZm9yZU9wZW5EZXRhaWw6IGZ1bmN0aW9uIChyb3c6IGFueSwgcmV6aW06IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dSwgZ3JpZFJjOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkM8YW55PiB8IHVuZGVmaW5lZCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJlZm9yZSBvcGVuIGRldGFpbCAtIHVrb255XCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmV6aW0gPT0gR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1Lk5ldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBEb2s6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBEb2suVmxhc3RuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHlwSWQ6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBJZC5JWFAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFpwdXNvYkdlbmVyb3Zhbmk6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5acHVzb2JHZW5lcm92YW5pSXhwLlBhcmFtZXRyZW1Vc3VHZW5QaWRcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2VuZXJvdmFuaUl4cFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkRpYWxvZ3MuR2VuZXJvdmFuaUl4cChjb250ZW50LCBvcHRpb25zLCBHaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpLmRvbmUoZnVuY3Rpb24gKHJ2LCBjb250KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicnYuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJ2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnYuSXhwRXhpc3QgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoeyBpeHBfc3BpczogY29udGVudC5tb2RlbC5peHBfc3BpcywgaXhwX3Vrb246IHJ2Lkl4cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyb3cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvcGVuRGV0YWlsOiBmdW5jdGlvbiAocm93OiBhbnksIHJlemltOiBHb3JkaWMuR2luLkludGVyZmFjZS5SZWdTcGEuR1JlemltQ29udGVudHUsIGdyaWRSYzogR29yZGljLkNvbXBvbmVudHMuR3JpZFJDPGFueT4gfCB1bmRlZmluZWQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBtb2RhbDogYm9vbGVhbik6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl4cFNwaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXhwVWtvbjtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbCAmJiByb3cgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwU3BpcyA9IHJvdy5peHBfc3BpcztcclxuICAgICAgICAgICAgICAgICAgICBpeHBVa29uID0gcm93Lml4cF91a29uXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGV0YWlsQ29udGVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwU3BpcyA9IHRoaXMuZGV0YWlsQ29udGVudC5vcmlnaW5hbE1vZGVsLml4cF9zcGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFpbENvbnRlbnQubmF2aWdhdGUoW1wiR29yZGljLlNwci5XZWJBcHAuR0RldGFpbFVrb251XCIsIHsgZ3JpZFJlbW90ZUNvbnRyb2w6IGdyaWRSYyB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIFJlemltRGV0YWlsdTogcmV6aW0sXHJcbiAgICAgICAgICAgICAgICAgICAgSXhwU3BpczogaXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICBJeHBVa29uOiBpeHBVa29uLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4c0RzcjogY29udGVudC5tb2RlbC5peHNfZHNyLFxyXG4gICAgICAgICAgICAgICAgICAgIElkOiBcImRldGFpbF91a29uXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgb25DbG9zZURldGFpbDogZnVuY3Rpb24gKGV2LCByKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAvLyBQb2t1ZCBqZSBwxZlpZMOhbiBuZWJvIHptxJtuxJtuIMO6a29uLCBwxZllZGVqIGlkIG5hZMWZYXplbsOpbXUgZGV0YWlsdSBwcm8gbm92w6kgbmHEjXRlbsOtIGRhdCBhIG5hc3RhdmVuw60gYWN0aXZlUm93LlxyXG4gICAgICAgICAgICAgICAgaWYgKHIgIT0gdW5kZWZpbmVkICYmIHIuWm1lbmEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ1RhYk1hbmFnZXIgPSBjb250ZW50LmZpbmQoXCIuZ3RhYm1hbmFnZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ1RhYk1hbmFnZXIgIT0gbnVsbCAmJiBnVGFiTWFuYWdlciAhPSB1bmRlZmluZWQpIGFjdGl2ZSA9IGdUYWJNYW5hZ2VyLmd0YWJtYW5hZ2VyKFwiZ2V0QWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubG9hZCh7IFJlemltRGV0YWlsdTogR29yZGljLkdpbi5JbnRlcmZhY2UuUmVnU3BhLkdSZXppbUNvbnRlbnR1LlZpZXcsIGludGVybmFsOiB0cnVlLCBzZWxlY3RlZFRhYkdyb3VwOiBhY3RpdmUsIGlkZW50aWZpa2F0b3JVa29udTogci5Nb2RlbFtcIml4cF91a29uXCJdIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=