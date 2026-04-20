"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GNevykazaneDokladyKHL = class GNevykazaneDokladyKHL extends Gordic.GContentBase {
                prepareContent(vstup) {
                    var that = this;
                    vstup.data.forEach((r) => {
                        if (r.s1 == "D") {
                            r.s5 = Gordic.Templates.Formatters.datetime(r.s5, "dd.MM.yyyy hh:mm:ss");
                        }
                    });
                    that.my_CondFormats = [];
                    that.my_CondFormat = { description: "Hlavicka", formula: "(EQUALS(@s1,'H') or EQUALS(@s1,'O'))", bold: true, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.gray };
                    that.my_CondFormats.push(that.my_CondFormat);
                    that.gridFormatSeznam = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "s1",
                        caption: " ",
                        width: 0,
                        hidden: true
                    })
                        .addTextColumn({
                        name: "s2",
                        caption: " ",
                        width: 120
                    })
                        .addTextColumn({
                        name: "s3",
                        caption: " ",
                        width: 120
                    })
                        .addTextColumn({
                        name: "s4",
                        caption: " ",
                        width: 120
                    })
                        .addTextColumn({
                        name: "s5",
                        caption: " ",
                        width: 170
                    })
                        .addTextColumn({
                        name: "s6",
                        caption: " ",
                        width: 120,
                    });
                    // definicie gridu
                    var grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        //.gtab({
                        //    title: "ROZ", opened: true, locked: true,
                        //})
                        .ggrid({
                        columnMode: "full",
                        name: "SeznamNevykazanychDokladu",
                        data: vstup.data, //[{ agenda: "UCT", doklad: "dsd" }],
                        //showHeaderRow:false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                //that.ZobrazDetail(ctx.cellInfo.data as any);
                                /*
                                var row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                                GDlg.showWindow("Gordic.Uct.WebClient.GUctDetail", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                                */
                            }
                        }),
                        columns: that.gridFormatSeznam,
                        defaultProfile: {
                            columnList: "s1,s2,s3,s4,s5,s6", condFormats: that.my_CondFormats
                        },
                        profiles: [],
                    });
                    that.commandBar([
                        {
                            id: "idclosedokladyneprouct",
                            customClass: "g-button--primary",
                            action: new GAction({ name: "actClose", caption: "jres:30250026", run: function () { that.tryClose(); } }) //RC 30250026 : Zavřít
                        },
                    ]);
                }
            };
            GNevykazaneDokladyKHL = __decorate([
                gcontent
            ], GNevykazaneDokladyKHL);
            WebClient.GNevykazaneDokladyKHL = GNevykazaneDokladyKHL;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05ldnlrYXphbmVEb2tsYWR5S0hMLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR05ldnlrYXphbmVEb2tsYWR5S0hMLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FtR2Y7QUFuR0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBbUduQjtJQW5HZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbUc3QjtRQW5Hb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLFlBQVk7Z0JBVW5ELGNBQWMsQ0FBQyxLQUE0RDtvQkFDdkUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNyQixJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7NEJBQ2QsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO3dCQUM3RSxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO29CQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDeEssSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUU3QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBNkM7eUJBQzFGLGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsR0FBRzt3QkFDWixLQUFLLEVBQUUsQ0FBQzt3QkFDUixNQUFNLEVBQUUsSUFBSTtxQkFDZixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsR0FBRzt3QkFDWixLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsR0FBRzt3QkFDWixLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsR0FBRzt3QkFDWixLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsR0FBRzt3QkFDWixLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsR0FBRzt3QkFDWixLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUM7b0JBRVAsa0JBQWtCO29CQUNsQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3lCQUNoQixHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQzt5QkFDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsRUFBRTt3QkFDWCxTQUFTO3dCQUNULCtDQUErQzt3QkFDL0MsSUFBSTt5QkFDSCxLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLElBQUksRUFBRSwyQkFBMkI7d0JBQ2pDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFDLHFDQUFxQzt3QkFDdEQsc0JBQXNCO3dCQUN0QixhQUFhLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ3ZCLElBQUksRUFBRSxvQkFBb0I7NEJBQzFCLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQiw4Q0FBOEM7Z0NBQzlDOzs7a0NBR0U7NEJBQ04sQ0FBQzt5QkFDSixDQUFDO3dCQUNGLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCO3dCQUM5QixjQUFjLEVBQUU7NEJBQ1osVUFBVSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYzt5QkFDcEU7d0JBQ0QsUUFBUSxFQUFFLEVBQUU7cUJBQ2YsQ0FBQyxDQUFDO29CQUVQLElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQ1o7NEJBQ0ksRUFBRSxFQUFFLHdCQUF3Qjs0QkFDNUIsV0FBVyxFQUFFLG1CQUFtQjs0QkFDaEMsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsc0JBQXNCO3lCQUNwSTtxQkFFSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNKLENBQUE7WUEvRlkscUJBQXFCO2dCQURqQyxRQUFRO2VBQ0kscUJBQXFCLENBK0ZqQztZQS9GWSwrQkFBcUIsd0JBK0ZqQyxDQUFBO1FBQ0wsQ0FBQyxFQW5Hb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBbUc3QjtJQUFELENBQUMsRUFuR2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW1HbkI7QUFBRCxDQUFDLEVBbkdTLE1BQU0sS0FBTixNQUFNLFFBbUdmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTmV2eWthemFuZURva2xhZHlLSEwgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlem5hbSBuZXphdWN0b3ZhbnljaCBkb2tsYWR1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICAvL3B1YmxpYyBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HTmVwcm91Y3RvdmFuZURva2xhZHVEdG9bXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBteV9Db25kRm9ybWF0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXQ7XHJcbiAgICAgICAgcHJpdmF0ZSBteV9Db25kRm9ybWF0czogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0W107XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkRm9ybWF0U2V6bmFtOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0O1xyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudCh2c3R1cDogeyBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRG9rbGFkSGxhc2VuaURQSER0b1tdIH0pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdnN0dXAuZGF0YS5mb3JFYWNoKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5zMSA9PSBcIkRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHIuczUgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoci5zNSwgXCJkZC5NTS55eXl5IGhoOm1tOnNzXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubXlfQ29uZEZvcm1hdHMgPSBbXTtcclxuICAgICAgICAgICAgdGhhdC5teV9Db25kRm9ybWF0ID0geyBkZXNjcmlwdGlvbjogXCJIbGF2aWNrYVwiLCBmb3JtdWxhOiBcIihFUVVBTFMoQHMxLCdIJykgb3IgRVFVQUxTKEBzMSwnTycpKVwiLCBib2xkOiB0cnVlLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZ3JheSB9O1xyXG4gICAgICAgICAgICB0aGF0Lm15X0NvbmRGb3JtYXRzLnB1c2godGhhdC5teV9Db25kRm9ybWF0KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZEZvcm1hdFNlem5hbSA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdEb2tsYWRIbGFzZW5pRFBIRHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAwLCBcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLy8uZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aXRsZTogXCJST1pcIiwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiU2V6bmFtTmV2eWthemFueWNoRG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZzdHVwLmRhdGEsLy9beyBhZ2VuZGE6IFwiVUNUXCIsIGRva2xhZDogXCJkc2RcIiB9XSxcclxuICAgICAgICAgICAgICAgICAgICAvL3Nob3dIZWFkZXJSb3c6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuWm9icmF6RGV0YWlsKGN0eC5jZWxsSW5mby5kYXRhIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHRGxnLnNob3dXaW5kb3coXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0RGV0YWlsXCIsIHsgSXhwOiByb3cuaXhwIH0sIFwiXCIsIDgwMCwgNjAwLCB0cnVlKTsgLy96b2JyYXplbmkgZGFsc2lobyBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5ncmlkRm9ybWF0U2V6bmFtLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiczEsczIsczMsczQsczUsczZcIiwgY29uZEZvcm1hdHM6IHRoYXQubXlfQ29uZEZvcm1hdHNcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbXSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKFsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaWRjbG9zZWRva2xhZHluZXByb3VjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7IG5hbWU6IFwiYWN0Q2xvc2VcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDI2XCIsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnRyeUNsb3NlKCk7IH0gfSkgLy9SQyAzMDI1MDAyNiA6IFphdsWZw610XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19