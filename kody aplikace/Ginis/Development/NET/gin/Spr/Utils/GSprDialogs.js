"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var Dialogs;
        (function (Dialogs) {
            function VypocetLhutyDlg(parentContent, opt, ModOtevreni) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Spr.WebApp.GVypocetLhutyDlg',
                    id: 'VypocetLhutyDlg#',
                    openDialogParams: {
                        parentContent: parentContent,
                        ModOtevreni: ModOtevreni,
                        opt: opt
                    },
                    windowParams: { height: 350, width: 509 }
                });
            }
            Dialogs.VypocetLhutyDlg = VypocetLhutyDlg;
            function ZalozeniSprSpisu(mainContent, ixp) {
                var width = 650;
                var height = 650;
                var modal = true;
                var content;
                var def = $.Deferred();
                content = mainContent.createServiceContent("Gordic.Spr.WebApp.GSprUtils");
                content.call("ExistSprSpis", { ixp: ixp }) // kontrola zda jiz neni zalozeno
                    .done((zalozeno) => {
                    console.log("Zda je zalozeno ...", zalozeno);
                    if (!zalozeno) {
                        content.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDruhuRizeniProFunkci", {}], // vyber druhu rizeni 
                        { TypSr: 0 /* Gordic.Spr.Interface.TypSprSpisuEnum.NeniSpravniSpis */, showOkButton: true }, { width: width, height: height, modal: modal })
                            .on("close", (ev, retValue) => {
                            if (retValue != undefined && retValue.IxsDsr != undefined) {
                                console.log("Vybrany druh spravniho rizeni ...", retValue.IxsDsr);
                                mainContent.navigate(["Gordic.Spr.WebApp.GDetailSpravnihoRizeni", {}], {
                                    RezimDetailu: 2 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.New */,
                                    IxpSpis: ixp,
                                    IxsDsr: retValue.IxsDsr
                                })
                                    .on("close", () => {
                                    content.call("ExistSprSpis", { ixp: ixp })
                                        .done((zal) => {
                                        def.resolve(zal, ixp);
                                    })
                                        .fail(function (val) {
                                        def.reject(val);
                                    });
                                });
                            }
                            else {
                                def.reject();
                            }
                        });
                    }
                    else {
                        content.dialogs.alert("jres:25500202"); //RC 25500202 : Zadaný spis je již evidován.
                        def.reject();
                    }
                }).fail(function (val) {
                    def.reject(val);
                });
                return def.promise();
            }
            Dialogs.ZalozeniSprSpisu = ZalozeniSprSpisu;
            function ZapisDoDdpDlg(parentContent, opt, ModOtevreni) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Spr.WebApp.GZapisDoDdpDlg',
                    id: 'zapisDoDdpDlg#',
                    openDialogParams: {
                        parentContent: parentContent,
                        ModOtevreni: ModOtevreni,
                        opt: opt
                    },
                    windowParams: { height: 350, width: 509 }
                });
            }
            Dialogs.ZapisDoDdpDlg = ZapisDoDdpDlg;
            function TiskPrehleduDlg(parentContent, opt, ModOtevreni) {
                return Gordic.Gui.Dialogs.buildDialog({
                    dialogName: 'Gordic.Spr.WebApp.GTiskPrehleduDlg',
                    id: 'tiskPrehleduDlg#',
                    openDialogParams: {
                        parentContent: parentContent,
                        ModOtevreni: ModOtevreni,
                        opt: opt
                    },
                    windowParams: { height: 350, width: 509 }
                });
            }
            Dialogs.TiskPrehleduDlg = TiskPrehleduDlg;
        })(Dialogs = Spr.Dialogs || (Spr.Dialogs = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NwckRpYWxvZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU3ByRGlhbG9ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBeUdmO0FBekdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlHbkI7SUF6R2dCLFdBQUEsR0FBRztRQUFDLElBQUEsT0FBTyxDQXlHM0I7UUF6R29CLFdBQUEsT0FBTztZQUV4QixTQUFnQixlQUFlLENBQzNCLGFBQXVCLEVBQ3ZCLEdBQXVDLEVBQ3ZDLFdBQTZDO2dCQUU3QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBeUU7b0JBQzFHLFVBQVUsRUFBRSxvQ0FBb0M7b0JBQ2hELEVBQUUsRUFBRSxrQkFBa0I7b0JBQ3RCLGdCQUFnQixFQUFFO3dCQUNkLGFBQWEsRUFBRSxhQUFhO3dCQUM1QixXQUFXLEVBQUUsV0FBVzt3QkFDeEIsR0FBRyxFQUFFLEdBQUc7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2lCQUM1QyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBZmUsdUJBQWUsa0JBZTlCLENBQUE7WUFFRCxTQUFnQixnQkFBZ0IsQ0FDNUIsV0FBcUIsRUFDckIsR0FBVztnQkFFWCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ2hCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixJQUFJLE9BQWlCLENBQUM7Z0JBQ3RCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFdkIsT0FBTyxHQUFHLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUs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QU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBeUU7b0JBQzFHLFVBQVUsRUFBRSxvQ0FBb0M7b0JBQ2hELEVBQUUsRUFBRSxrQkFBa0I7b0JBQ3RCLGdCQUFnQixFQUFFO3dCQUNkLGFBQWEsRUFBRSxhQUFhO3dCQUM1QixXQUFXLEVBQUUsV0FBVzt3QkFDeEIsR0FBRyxFQUFFLEdBQUc7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2lCQUM1QyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBZmUsdUJBQWUsa0JBZTlCLENBQUE7UUFFTCxDQUFDLEVBekdvQixPQUFPLEdBQVAsV0FBTyxLQUFQLFdBQU8sUUF5RzNCO0lBQUQsQ0FBQyxFQXpHZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeUduQjtBQUFELENBQUMsRUF6R1MsTUFBTSxLQUFOLE1BQU0sUUF5R2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5EaWFsb2dzIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVnlwb2NldExodXR5RGxnKFxyXG4gICAgICAgIHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgIG9wdDogV2ViQXBwLkdWeXBvY2V0TGh1dHlEbGdJbnB1dFBhcmFtcyxcclxuICAgICAgICBNb2RPdGV2cmVuaT86IEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmlcclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiBHb3JkaWMuR3VpLkRpYWxvZ3MuYnVpbGREaWFsb2c8V2ViQXBwLkdWeXBvY2V0TGh1dHlEbGdJbnB1dFBhcmFtcywgV2ViQXBwLkdWeXBvY2V0TGh1dHlEbGdSZXR1cm5WYWx1ZT4oe1xyXG4gICAgICAgICAgICBkaWFsb2dOYW1lOiAnR29yZGljLlNwci5XZWJBcHAuR1Z5cG9jZXRMaHV0eURsZycsXHJcbiAgICAgICAgICAgIGlkOiAnVnlwb2NldExodXR5RGxnIycsXHJcbiAgICAgICAgICAgIG9wZW5EaWFsb2dQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHBhcmVudENvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogTW9kT3RldnJlbmksXHJcbiAgICAgICAgICAgICAgICBvcHQ6IG9wdFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB3aW5kb3dQYXJhbXM6IHsgaGVpZ2h0OiAzNTAsIHdpZHRoOiA1MDkgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBaYWxvemVuaVNwclNwaXN1KFxyXG4gICAgICAgIG1haW5Db250ZW50OiBHQ29udGVudCxcclxuICAgICAgICBpeHA6IHN0cmluZ1xyXG4gICAgKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gNjUwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSA2NTA7XHJcbiAgICAgICAgdmFyIG1vZGFsID0gdHJ1ZTtcclxuICAgICAgICB2YXIgY29udGVudDogR0NvbnRlbnQ7XHJcbiAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgY29udGVudCA9IG1haW5Db250ZW50LmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLlNwci5XZWJBcHAuR1NwclV0aWxzXCIpO1xyXG4gICAgICAgIGNvbnRlbnQuY2FsbChcIkV4aXN0U3ByU3Bpc1wiLCB7IGl4cDogaXhwIH0pIC8vIGtvbnRyb2xhIHpkYSBqaXogbmVuaSB6YWxvemVub1xyXG4gICAgICAgICAgICAuZG9uZSgoemFsb3plbm8pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWmRhIGplIHphbG96ZW5vIC4uLlwiLCB6YWxvemVubyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXphbG96ZW5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLnNob3dXaW5kb3coW1wiR29yZGljLlNwci5XZWJBcHAuR1Z5YmVyRHJ1aHVSaXplbmlQcm9GdW5rY2lcIiwge31dLCAvLyB2eWJlciBkcnVodSByaXplbmkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgVHlwU3I6IEdvcmRpYy5TcHIuSW50ZXJmYWNlLlR5cFNwclNwaXN1RW51bS5OZW5pU3ByYXZuaVNwaXMsIHNob3dPa0J1dHRvbjogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIG1vZGFsOiBtb2RhbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsdWUgIT0gdW5kZWZpbmVkICYmIHJldFZhbHVlLkl4c0RzciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZ5YnJhbnkgZHJ1aCBzcHJhdm5paG8gcml6ZW5pIC4uLlwiLCByZXRWYWx1ZS5JeHNEc3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNvbnRlbnQubmF2aWdhdGUoW1wiR29yZGljLlNwci5XZWJBcHAuR0RldGFpbFNwcmF2bmlob1JpemVuaVwiLCB7fV0sIHsgLy8gemF2b2xhbmkgZGV0YWlsdSBzcHJhdm5paG8gcml6ZW5pIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5OZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cFNwaXM6IGl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhzRHNyOiByZXRWYWx1ZS5JeHNEc3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNhbGwoXCJFeGlzdFNwclNwaXNcIiwgeyBpeHA6IGl4cCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCh6YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoemFsLCBpeHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjI1NTAwMjAyXCIpIC8vUkMgMjU1MDAyMDIgOiBaYWRhbsO9IHNwaXMgamUgamnFviBldmlkb3bDoW4uXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBkZWYucmVqZWN0KHZhbCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBaYXBpc0RvRGRwRGxnKFxyXG4gICAgICAgIHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgIG9wdDogV2ViQXBwLkdaYXBpc0RvRGRwRGxnSW5wdXRQYXJhbXMsXHJcbiAgICAgICAgTW9kT3RldnJlbmk/OiBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pXHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gR29yZGljLkd1aS5EaWFsb2dzLmJ1aWxkRGlhbG9nIDwgV2ViQXBwLkdaYXBpc0RvRGRwRGxnSW5wdXRQYXJhbXMsIFdlYkFwcC5HWmFwaXNEb0RkcERsZ1JldHVyblZhbHVlPiAoe1xyXG4gICAgICAgICAgICBkaWFsb2dOYW1lOiAnR29yZGljLlNwci5XZWJBcHAuR1phcGlzRG9EZHBEbGcnLFxyXG4gICAgICAgICAgICBpZDogJ3phcGlzRG9EZHBEbGcjJyxcclxuICAgICAgICAgICAgb3BlbkRpYWxvZ1BhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogcGFyZW50Q29udGVudCxcclxuICAgICAgICAgICAgICAgIE1vZE90ZXZyZW5pOiBNb2RPdGV2cmVuaSxcclxuICAgICAgICAgICAgICAgIG9wdDogb3B0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHdpbmRvd1BhcmFtczogeyBoZWlnaHQ6IDM1MCwgd2lkdGg6IDUwOSB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFRpc2tQcmVobGVkdURsZyhcclxuICAgICAgICBwYXJlbnRDb250ZW50OiBHQ29udGVudCxcclxuICAgICAgICBvcHQ6IFdlYkFwcC5HVGlza1ByZWhsZWR1RGxnSW5wdXRQYXJhbXMsXHJcbiAgICAgICAgTW9kT3RldnJlbmk/OiBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pXHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gR29yZGljLkd1aS5EaWFsb2dzLmJ1aWxkRGlhbG9nPFdlYkFwcC5HVGlza1ByZWhsZWR1RGxnSW5wdXRQYXJhbXMsIFdlYkFwcC5HVGlza1ByZWhsZWR1RGxnUmV0dXJuVmFsdWU+KHtcclxuICAgICAgICAgICAgZGlhbG9nTmFtZTogJ0dvcmRpYy5TcHIuV2ViQXBwLkdUaXNrUHJlaGxlZHVEbGcnLFxyXG4gICAgICAgICAgICBpZDogJ3Rpc2tQcmVobGVkdURsZyMnLFxyXG4gICAgICAgICAgICBvcGVuRGlhbG9nUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiBwYXJlbnRDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IE1vZE90ZXZyZW5pLFxyXG4gICAgICAgICAgICAgICAgb3B0OiBvcHRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgd2luZG93UGFyYW1zOiB7IGhlaWdodDogMzUwLCB3aWR0aDogNTA5IH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19