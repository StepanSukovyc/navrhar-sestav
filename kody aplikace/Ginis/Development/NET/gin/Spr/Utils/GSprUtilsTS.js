"use strict";
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            WebApp.VyberEsu_DuvodHledaniTxt = 'zadaniucastnikarizeni';
            function UpravRequiredNaFieldu(parentContent, fieldName, required) {
                parentContent.findFields(fieldName).each(function (index, element) {
                    var puvodniValidatory = $(element).gfield("option", "validators");
                    if (puvodniValidatory == undefined)
                        puvodniValidatory = [];
                    var noveValidatory = puvodniValidatory.filter(function (Validator) {
                        return !(Validator instanceof Gordic.Validators.Required);
                    });
                    if (required) {
                        noveValidatory.push(new Gordic.Validators.Required());
                    }
                    $(element).gfield("option", "validators", noveValidatory);
                    //var puvodniValidatory = $(element).gfield("option", "validators");
                    //var noveValidatory = puvodniValidatory.filter(function (Validator) {
                    //    return !(Validator instanceof Gordic.Validators.Required);
                    //});
                    //if (required) {
                    //    noveValidatory.push(new Gordic.Validators.Required());
                    //}
                    //$(element).gfield("option", "validators", noveValidatory);
                });
            }
            WebApp.UpravRequiredNaFieldu = UpravRequiredNaFieldu;
            function VyhledatDlePID_SPR(content, taskId) {
                Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(content, { taskId: taskId })
                    .done(function (retVal) {
                    if (retVal && retVal.ixp) {
                        var l_oContent;
                        l_oContent = content.createServiceContent("Gordic.Spr.WebApp.GSprUtils");
                        l_oContent.call("FindIxpInSpr", { ixp: retVal.ixp }) // kontrola zda existuje
                            .done((ixpSpis) => {
                            if (ixpSpis != "") {
                                content.navigate(["Gordic.Spr.WebApp.GDetailSpravnihoRizeni", {}], {
                                    RezimDetailu: 1 /* Gordic.Gin.Interface.RegSpa.GRezimContentu.View */,
                                    IxpSpis: ixpSpis,
                                    Id: "spravniRizeni_detail"
                                }, {});
                            }
                            else {
                                content.dialogs.alert("jres:25200395"); //RC 25200395 : Hledaný dokument/spis není v systému evidován.
                            }
                        });
                    }
                });
            }
            WebApp.VyhledatDlePID_SPR = VyhledatDlePID_SPR;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NwclV0aWxzVFMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU3ByVXRpbHNUUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBMERmO0FBMURELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTBEbkI7SUExRGdCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQTBEMUI7UUExRG9CLFdBQUEsTUFBTTtZQUdWLCtCQUF3QixHQUFHLHVCQUF1QixDQUFDO1lBSWhFLFNBQWdCLHFCQUFxQixDQUFDLGFBQXVCLEVBQUUsU0FBaUIsRUFBRSxRQUFpQjtnQkFDL0YsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUUsT0FBTztvQkFDN0QsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxpQkFBaUIsSUFBSSxTQUFTO3dCQUM5QixpQkFBaUIsR0FBRyxFQUFFLENBQUM7b0JBQzNCLElBQUksY0FBYyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFVLFNBQVM7d0JBQzdELE9BQU8sQ0FBQyxDQUFDLFNBQVMsWUFBWSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM5RCxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLFFBQVEsRUFBRSxDQUFDO3dCQUNYLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQzFELENBQUM7b0JBQ0QsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUUxRCxvRUFBb0U7b0JBQ3BFLHNFQUFzRTtvQkFDdEUsZ0VBQWdFO29CQUNoRSxLQUFLO29CQUNMLGlCQUFpQjtvQkFDakIsNERBQTREO29CQUM1RCxHQUFHO29CQUNILDREQUE0RDtnQkFDaEUsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBdEJlLDRCQUFxQix3QkFzQnBDLENBQUE7WUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxPQUFpQixFQUFFLE1BQWM7Z0JBQ2hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDakUsSUFBSSxDQUFDLFVBQVUsTUFBTTtvQkFDbEIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUN2QixJQUFJLFVBQW9CLENBQUM7d0JBQ3pCLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsNkJBQTZCLENBQUMsQ0FBQzt3QkFFekUsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsd0JBQXdCOzZCQUN4RSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs0QkFDZCxJQUFJLE9BQU8sSUFBSSxFQUFFLEVBQUUsQ0FBQztnQ0FDaEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLDBDQUEwQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO29DQUMvRCxZQUFZLHlEQUFpRDtvQ0FDN0QsT0FBTyxFQUFFLE9BQU87b0NBQ2hCLEVBQUUsRUFBRSxzQkFBc0I7aUNBQzdCLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ1gsQ0FBQztpQ0FDSSxDQUFDO2dDQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsOERBQThEOzRCQUMxRyxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNYLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDO1lBdEJlLHlCQUFrQixxQkFzQmpDLENBQUE7UUFLTCxDQUFDLEVBMURvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUEwRDFCO0lBQUQsQ0FBQyxFQTFEZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMERuQjtBQUFELENBQUMsRUExRFMsTUFBTSxLQUFOLE1BQU0sUUEwRGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIFVzZWRDb21wb25lbnRzTmV3ID0gR29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdCYXNlRGV0YWlsQ29tcG9uZW50RXh0ZW5zaW9ucyAmIFRoaXNUeXBlPEdDb250ZW50PEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQmFzZURldGFpbENvbXBvbmVudEV4dGVuc2lvbnM+PiAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HQ2hhbmdlQWt0aXZpdGFDb21wb25lbnRFeHRlbnNpb25zICYgVGhpc1R5cGU8R0NvbnRlbnQ8R29yZGljLkdpbi5XZWJDbGllbnQuUmVnU3BhLkdDaGFuZ2VBa3Rpdml0YUNvbXBvbmVudEV4dGVuc2lvbnM+PiAmIEdvcmRpYy5HaW4uV2ViQ2xpZW50LlJlZ1NwYS5HRGV0YWlsTW92ZUNvbXBvbmVudEV4dGVuc2lvbnMgJiBUaGlzVHlwZTxHQ29udGVudDxHb3JkaWMuR2luLldlYkNsaWVudC5SZWdTcGEuR0RldGFpbE1vdmVDb21wb25lbnRFeHRlbnNpb25zPj47XHJcbiAgICBleHBvcnQgY29uc3QgVnliZXJFc3VfRHV2b2RIbGVkYW5pVHh0ID0gJ3phZGFuaXVjYXN0bmlrYXJpemVuaSc7XHJcblxyXG5cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVXByYXZSZXF1aXJlZE5hRmllbGR1KHBhcmVudENvbnRlbnQ6IEdDb250ZW50LCBmaWVsZE5hbWU6IHN0cmluZywgcmVxdWlyZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBwYXJlbnRDb250ZW50LmZpbmRGaWVsZHMoZmllbGROYW1lKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgcHV2b2RuaVZhbGlkYXRvcnkgPSAkKGVsZW1lbnQpLmdmaWVsZChcIm9wdGlvblwiLCBcInZhbGlkYXRvcnNcIik7XHJcbiAgICAgICAgICAgIGlmIChwdXZvZG5pVmFsaWRhdG9yeSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBwdXZvZG5pVmFsaWRhdG9yeSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgbm92ZVZhbGlkYXRvcnkgPSBwdXZvZG5pVmFsaWRhdG9yeS5maWx0ZXIoZnVuY3Rpb24gKFZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEoVmFsaWRhdG9yIGluc3RhbmNlb2YgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICBub3ZlVmFsaWRhdG9yeS5wdXNoKG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKGVsZW1lbnQpLmdmaWVsZChcIm9wdGlvblwiLCBcInZhbGlkYXRvcnNcIiwgbm92ZVZhbGlkYXRvcnkpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgcHV2b2RuaVZhbGlkYXRvcnkgPSAkKGVsZW1lbnQpLmdmaWVsZChcIm9wdGlvblwiLCBcInZhbGlkYXRvcnNcIik7XHJcbiAgICAgICAgICAgIC8vdmFyIG5vdmVWYWxpZGF0b3J5ID0gcHV2b2RuaVZhbGlkYXRvcnkuZmlsdGVyKGZ1bmN0aW9uIChWYWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuICEoVmFsaWRhdG9yIGluc3RhbmNlb2YgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQpO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAvL2lmIChyZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAvLyAgICBub3ZlVmFsaWRhdG9yeS5wdXNoKG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vJChlbGVtZW50KS5nZmllbGQoXCJvcHRpb25cIiwgXCJ2YWxpZGF0b3JzXCIsIG5vdmVWYWxpZGF0b3J5KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVnlobGVkYXREbGVQSURfU1BSKGNvbnRlbnQ6IEdDb250ZW50LCB0YXNrSWQ6IHN0cmluZykge1xyXG4gICAgICAgIEdvcmRpYy5XZmwuRGlhbG9ncy5HSGxlZGF0SWRlbnREb2tTcGlzRGxnKGNvbnRlbnQsIHsgdGFza0lkOiB0YXNrSWQgfSlcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuaXhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxfb0NvbnRlbnQ6IEdDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGxfb0NvbnRlbnQgPSBjb250ZW50LmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLlNwci5XZWJBcHAuR1NwclV0aWxzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsX29Db250ZW50LmNhbGwoXCJGaW5kSXhwSW5TcHJcIiwgeyBpeHA6IHJldFZhbC5peHAgfSkgLy8ga29udHJvbGEgemRhIGV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChpeHBTcGlzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhwU3BpcyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5uYXZpZ2F0ZShbXCJHb3JkaWMuU3ByLldlYkFwcC5HRGV0YWlsU3ByYXZuaWhvUml6ZW5pXCIsIHt9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXppbURldGFpbHU6IEdvcmRpYy5HaW4uSW50ZXJmYWNlLlJlZ1NwYS5HUmV6aW1Db250ZW50dS5WaWV3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBTcGlzOiBpeHBTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZDogXCJzcHJhdm5pUml6ZW5pX2RldGFpbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5kaWFsb2dzLmFsZXJ0KFwianJlczoyNTIwMDM5NVwiKTsgLy9SQyAyNTIwMDM5NSA6IEhsZWRhbsO9IGRva3VtZW50L3NwaXMgbmVuw60gdiBzeXN0w6ltdSBldmlkb3bDoW4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcbiJdfQ==