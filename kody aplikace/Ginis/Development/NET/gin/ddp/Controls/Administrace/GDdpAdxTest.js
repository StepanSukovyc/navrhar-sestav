"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDdpAdxTest.ts                         </Name>
//    <Description> Testovací okno pro ADX administraci                         </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-02-14                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GDdpAdxTest = class GDdpAdxTest extends Gordic.GContentBase {
                //ddpContentFile: DdpFiles;
                onContentReady() {
                    const that = this;
                    that.taskId = "actGDdpAdxTest";
                    //that.taskId = that.ddpContentFile.GDdpAdxTest?.TaskID!;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            enabled: false,
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            enabled: true,
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                    that.createSettingsADX();
                    that.form = $.newDiv().appendTo(this.element).gform("createFrom", new Gordic.Forms.Form({ name: "formDatumu", layoutDescriptor: "L1M1S1" })
                        .addSection()
                        //.addPrefab(Gordic.Wfl.Prefabs.GIdentifikatorDokumentuSpisu({ isPid: true, fieldOpt: { name: "ixp", disabled: true } },{ label: "Identifikátor" }))
                        .addRow("Identifikátor")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        disabled: true,
                    })
                        .addRow("Datum")
                        .addField("gdatebox", {
                        name: "datum"
                    })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ddpstpp(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                        disabled: false,
                    }));
                    that.loadIxp();
                }
                createSettingsADX() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actGNastaveniSpravcuAdm",
                            caption: "Správci-ADM",
                            tooltip: "Nastavení správců ADM",
                            icon: "gi-file",
                            enabled: true,
                            run: function () {
                                that.navigate("Gordic.Ddp.WebClient.GNastaveniSpravcuADM", {
                                    ID: "DDPGNastaveniSpravcuADM#",
                                });
                            }
                        }),
                        new GAction({
                            name: "actGNastaveniSpravcu",
                            caption: "Správci",
                            tooltip: "Nastavení správců",
                            icon: "gi-file",
                            enabled: true,
                            run: function () {
                                that.navigate("Gordic.Ddp.WebClient.GNastaveniSpravcu", {
                                    ID: "DDPGNastaveniSpravcu#"
                                });
                            }
                        }),
                        new GAction({
                            name: "actGNastaveniCiselnikuAdm",
                            caption: "Číselníky-ADM",
                            tooltip: "Nastavení číselníků ADM",
                            icon: "fa-list-ol",
                            enabled: true,
                            run: function () {
                                that.navigate("Gordic.Ddp.WebClient.GNastaveniCiselnikuADM", {
                                    ID: "DDPGNastaveniCiselnikuADM#"
                                });
                            }
                        }),
                        new GAction({
                            name: "actGNastaveniCiselniku",
                            caption: "Číselníky",
                            tooltip: "Nastavení číselníků",
                            icon: "fa-list-ol",
                            enabled: true,
                            run: function () {
                                that.navigate("Gordic.Ddp.WebClient.GNastaveniCiselniku", {
                                    ID: "DDPGNastaveniCiselniku#"
                                });
                            }
                        }),
                        new GAction({
                            name: "actGSkupinyVymahaniAdm",
                            caption: "Vymáhání-ADM",
                            tooltip: "Nastavení skupin vymáhání",
                            icon: "fa-money",
                            enabled: true,
                            run: function () {
                                that.navigate("Gordic.Ddp.WebClient.GSkupinyVymahaniADM", {
                                    ID: "DDPGSkupinyVymahaniADM#"
                                });
                            }
                        }),
                        new GAction({
                            name: "actGSkupinyVymahani",
                            caption: "Vymáhání",
                            tooltip: "Nastavení skupin vymáhání ADM",
                            icon: "fa-money",
                            enabled: true,
                            run: function () {
                                that.navigate("Gordic.Ddp.WebClient.GSkupinyVymahani", {
                                    ID: "DDPGSkupinyVymahani#"
                                });
                            }
                        }),
                    ]);
                    let menu = [
                        {
                            action: that.actions["actGNastaveniSpravcuAdm"],
                            favorite: true,
                        },
                        {
                            action: that.actions["actGNastaveniSpravcu"],
                            favorite: true,
                        },
                        {
                            action: that.actions["actGNastaveniCiselnikuAdm"],
                            favorite: true,
                        },
                        {
                            action: that.actions["actGNastaveniCiselniku"],
                            favorite: true,
                        },
                        {
                            action: that.actions["actGSkupinyVymahaniAdm"],
                            favorite: true,
                        },
                        {
                            action: that.actions["actGSkupinyVymahani"],
                            favorite: true,
                        },
                    ];
                    that.menuBar(menu);
                }
                loadIxp() {
                    const that = this;
                    that.form.findFields("ixp").gfield("setValue", "UP76X001P93H");
                }
                ok() {
                    this.close();
                }
            };
            GDdpAdxTest = __decorate([
                Decorators.gcontent
            ], GDdpAdxTest);
            WebClient.GDdpAdxTest = GDdpAdxTest;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RkcEFkeFRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGRwQWR4VGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQWtNZjtBQWxNRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrTW5CO0lBbE1nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FrTTdCO1FBbE1vQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTtnQkFHekMsMkJBQTJCO2dCQUUzQixjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztvQkFDL0IseURBQXlEO29CQUV6RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxhQUFhOzRCQUNuQixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNsQyxDQUFDO3dCQUNGLElBQUksT0FBTyxDQUFDOzRCQUNSLElBQUksRUFBRSxVQUFVOzRCQUNoQixPQUFPLEVBQUUsSUFBSTs0QkFDYixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDckMsQ0FBQztxQkFDTCxDQUFDLENBQUE7b0JBQ0YsSUFBSSxDQUFDLFVB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Q2pCO3dCQUNEOzRCQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDOzRCQUM5QyxRQUFRLEVBQUUsSUFBSTt5QkFDakI7d0JBQ0Q7NEJBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7NEJBQzlDLFFBQVEsRUFBRSxJQUFJO3lCQUNqQjt3QkFDRDs0QkFDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQzs0QkFDM0MsUUFBUSxFQUFFLElBQUk7eUJBQ2pCO3FCQUNKLENBQUM7b0JBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztnQkFFTyxPQUFPO29CQUNYLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFFbkUsQ0FBQztnQkFFRCxFQUFFO29CQUNFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDakIsQ0FBQzthQUNKLENBQUE7WUEvTFksV0FBVztnQkFEdkIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxXQUFXLENBK0x2QjtZQS9MWSxxQkFBVyxjQStMdkIsQ0FBQTtRQUNMLENBQUMsRUFsTW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtNN0I7SUFBRCxDQUFDLEVBbE1nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrTW5CO0FBQUQsQ0FBQyxFQWxNUyxNQUFNLEtBQU4sTUFBTSxRQWtNZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwQWR4VGVzdC50cyAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gVGVzdG92YWPDrSBva25vIHBybyBBRFggYWRtaW5pc3RyYWNpICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDItMTQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZHBBZHhUZXN0IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgLy9kZHBDb250ZW50RmlsZTogRGRwRmlsZXM7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHRGRwQWR4VGVzdFwiO1xyXG4gICAgICAgICAgICAvL3RoYXQudGFza0lkID0gdGhhdC5kZHBDb250ZW50RmlsZS5HRGRwQWR4VGVzdD8uVGFza0lEITtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9rKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlU2V0dGluZ3NBRFgoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIixcclxuICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybURhdHVtdVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLmFkZFByZWZhYihHb3JkaWMuV2ZsLlByZWZhYnMuR0lkZW50aWZpa2F0b3JEb2t1bWVudHVTcGlzdSh7IGlzUGlkOiB0cnVlLCBmaWVsZE9wdDogeyBuYW1lOiBcIml4cFwiLCBkaXNhYmxlZDogdHJ1ZSB9IH0seyBsYWJlbDogXCJJZGVudGlmaWvDoXRvclwiIH0pKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIikgXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXR1bVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpIFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5kZHBzdHBwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgIFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5sb2FkSXhwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVNldHRpbmdzQURYKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTmFzdGF2ZW5pU3ByYXZjdUFkbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Byw6F2Y2ktQURNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJOYXN0YXZlbsOtIHNwcsOhdmPFryBBRE1cIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWZpbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HTmFzdGF2ZW5pU3ByYXZjdUFETVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdOYXN0YXZlbmlTcHJhdmN1QURNI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R05hc3RhdmVuaVNwcmF2Y3VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNwcsOhdmNpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJOYXN0YXZlbsOtIHNwcsOhdmPFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdOYXN0YXZlbmlTcHJhdmN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR05hc3RhdmVuaVNwcmF2Y3UjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdOYXN0YXZlbmlDaXNlbG5pa3VBZG1cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsSMw61zZWxuw61reS1BRE1cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc3RhdmVuw60gxI3DrXNlbG7DrWvFryBBRE1cIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWxpc3Qtb2xcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HTmFzdGF2ZW5pQ2lzZWxuaWt1QURNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR05hc3RhdmVuaUNpc2VsbmlrdUFETSNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R05hc3RhdmVuaUNpc2VsbmlrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwixIzDrXNlbG7DrWt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJOYXN0YXZlbsOtIMSNw61zZWxuw61rxa9cIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWxpc3Qtb2xcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HTmFzdGF2ZW5pQ2lzZWxuaWt1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR05hc3RhdmVuaUNpc2VsbmlrdSNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1NrdXBpbnlWeW1haGFuaUFkbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnltw6Fow6Fuw60tQURNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJOYXN0YXZlbsOtIHNrdXBpbiB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtbW9uZXlcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HU2t1cGlueVZ5bWFoYW5pQURNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR1NrdXBpbnlWeW1haGFuaUFETSNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1NrdXBpbnlWeW1haGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnltw6Fow6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc3RhdmVuw60gc2t1cGluIHZ5bcOhaMOhbsOtIEFETVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtbW9uZXlcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HU2t1cGlueVZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR1NrdXBpbnlWeW1haGFuaSNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICBsZXQgbWVudTogTWVudVBhcmFtc1tdID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R05hc3RhdmVuaVNwcmF2Y3VBZG1cIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R05hc3RhdmVuaVNwcmF2Y3VcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R05hc3RhdmVuaUNpc2VsbmlrdUFkbVwiXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHTmFzdGF2ZW5pQ2lzZWxuaWt1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdTa3VwaW55VnltYWhhbmlBZG1cIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1NrdXBpbnlWeW1haGFuaVwiXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIobWVudSk7ICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9hZEl4cCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIFwiVVA3NlgwMDFQOTNIXCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19