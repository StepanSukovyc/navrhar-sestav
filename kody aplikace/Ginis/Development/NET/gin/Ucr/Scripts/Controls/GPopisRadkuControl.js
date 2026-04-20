"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            let GPopisRadkuControl = class GPopisRadkuControl extends Gordic.GContentBase {
                prepareContent(options) {
                    if (!options)
                        options = this.options;
                    else
                        this.options = options;
                    if (!this.options)
                        return;
                    this.init(this.options);
                }
                init(options) {
                    let that = this;
                    let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1", name: "popisDokladu" })
                        .addRow("jres:31100214") //RC 31100214 : Popis
                        .addField("gstringbox", {
                        name: "popis", rows: 5, disabled: true, change: () => {
                            let cnt = that.parentContent;
                            cnt.valueChanged = true;
                            cnt.nastaveniAkci();
                        }
                    });
                    $.newDiv().appendTo(this.element)
                        .gform("createFrom", form)
                        .findFields()
                        .gfield("model", "apply", options.popis);
                    let gf = new WebClient.GUcrStavRadkuGridFormat();
                    gf.addTextColumn({ name: "name", caption: "jres:31100215", width: 80 }) //RC 31100215 : Klíč
                        .addStavRadkuCol({ name: "val1", caption: "jres:31100019", width: 100 }, "val1", "val1Type") //RC 31100019 : Název
                        .addStavRadkuCol({ name: "val2", caption: "jres:31100216", width: 200 }, "val2", "val2Type"); //RC 31100216 : Hodnota
                    $.newDiv().appendTo(this.element)
                        .ggrid({
                        columns: gf,
                        data: new Gordic.Data.View(options.popis.grafickyPopis || []),
                        showTopPanel: false,
                        showBottomPanel: false
                    });
                }
            };
            GPopisRadkuControl = __decorate([
                Decorators.gcontent
            ], GPopisRadkuControl);
            WebClient.GPopisRadkuControl = GPopisRadkuControl;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvcGlzUmFka3VDb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1BvcGlzUmFka3VDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FvRGY7QUFwREQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb0RuQjtJQXBEZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBb0Q3QjtRQXBEb0IsV0FBQSxTQUFTO1lBTzFCLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsT0FBQSxZQUFZO2dCQUdoRCxjQUFjLENBQUMsT0FBbUM7b0JBQzlDLElBQUksQ0FBQyxPQUFPO3dCQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDOzt3QkFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBRTVCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzt3QkFDYixPQUFPO29CQUVYLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2dCQUVNLElBQUksQ0FBQyxPQUFrQztvQkFDMUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxjQUFjLEVBQUUsQ0FBQzt5QkFDaEYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHFCQUFxQjt5QkFDN0MsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTs0QkFDakQsSUFBSSxHQUFHLEdBQUksSUFBSSxDQUFDLGFBQXdDLENBQUM7NEJBQ3pELEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOzRCQUN4QixHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3hCLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUVQLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDNUIsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUM7eUJBQ3pCLFVBQVUsRUFBRTt5QkFDWixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRTdDLElBQUksRUFBRSxHQUFHLElBQUksVUFBQSx1QkFBdUIsRUFBRSxDQUFDO29CQUV2QyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQjt5QkFDdkYsZUFBZSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMscUJBQXFCO3lCQUNqSCxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtvQkFFekgsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUM1QixLQUFLLENBQW1CO3dCQUNyQixPQUFPLEVBQUUsRUFBRTt3QkFDWCxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7d0JBQzdELFlBQVksRUFBRSxLQUFLO3dCQUNuQixlQUFlLEVBQUUsS0FBSztxQkFDekIsQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFDSixDQUFBO1lBNUNZLGtCQUFrQjtnQkFEOUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxrQkFBa0IsQ0E0QzlCO1lBNUNZLDRCQUFrQixxQkE0QzlCLENBQUE7UUFDTCxDQUFDLEVBcERvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvRDdCO0lBQUQsQ0FBQyxFQXBEZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb0RuQjtBQUFELENBQUMsRUFwRFMsTUFBTSxLQUFOLE1BQU0sUUFvRGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1BvcGlzUmFka3VDb250cm9sT3B0aW9ucyB7XHJcbiAgICAgICAgcG9waXM6IEdQb3Bpc0Rva2xhZHVEdG87XHJcbiAgICB9XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9waXNSYWRrdUNvbnRyb2wgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogR1BvcGlzUmFka3VDb250cm9sT3B0aW9ucztcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9ucz86IEdQb3Bpc1JhZGt1Q29udHJvbE9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXQob3B0aW9uczogR1BvcGlzUmFka3VDb250cm9sT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiwgbmFtZTpcInBvcGlzRG9rbGFkdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTEwMDIxNFwiKSAvL1JDIDMxMTAwMjE0IDogUG9waXNcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIiwgcm93czogNSwgZGlzYWJsZWQ6IHRydWUsIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY250ID0gKHRoYXQucGFyZW50Q29udGVudCEgYXMgR0RldGFpbFN0YXZaYXBpc1JhZGt1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY250LnZhbHVlQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNudC5uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSlcclxuICAgICAgICAgICAgICAgIC5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG9wdGlvbnMucG9waXMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGdmID0gbmV3IEdVY3JTdGF2UmFka3VHcmlkRm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYW1lXCIsIGNhcHRpb246IFwianJlczozMTEwMDIxNVwiLCB3aWR0aDogODAgfSkgLy9SQyAzMTEwMDIxNSA6IEtsw63EjVxyXG4gICAgICAgICAgICAgICAgLmFkZFN0YXZSYWRrdUNvbCh7IG5hbWU6IFwidmFsMVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTlcIiwgd2lkdGg6IDEwMCB9LCBcInZhbDFcIiwgXCJ2YWwxVHlwZVwiKSAvL1JDIDMxMTAwMDE5IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAuYWRkU3RhdlJhZGt1Q29sKHsgbmFtZTogXCJ2YWwyXCIsIGNhcHRpb246IFwianJlczozMTEwMDIxNlwiLCB3aWR0aDogMjAwIH0sIFwidmFsMlwiLCBcInZhbDJUeXBlXCIpOyAvL1JDIDMxMTAwMjE2IDogSG9kbm90YVxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R1N0YXZSYWRrdVZhbER0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdmLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KG9wdGlvbnMucG9waXMuZ3JhZmlja3lQb3BpcyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcFBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=