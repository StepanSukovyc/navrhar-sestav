"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            var gcontent = Decorators.gcontent;
            let GVyberDotcenehoSubjektu = class GVyberDotcenehoSubjektu extends Gordic.GContentBase {
                //private filterForm: JQuery<HTMLElement>;
                onContentReady() {
                    var that = this;
                    this.CreateMenu();
                    this.grid = $("<div class='js-mujGrid'>");
                    this.grid
                        //.css("height", "calc(100% - " + that.$filterForm.height() + "px)") // nastavení výšky elementu, na který bude přidán grid.
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        navigationMode: "row",
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: (ev, ctx) => {
                                if (that.Jednotlive) {
                                    var row = ctx.cellInfo.data;
                                    that.okClick(row);
                                }
                            }
                        }),
                        multi: !that.Jednotlive,
                        columns: this.createGridFormat(),
                        searchColumns: ["ixs_esu"]
                    });
                    //dataView
                    this.dataView = new Gordic.Data.View(undefined, { key: "ixs_esu" });
                    //this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
                    that.loadData();
                }
                CreateMenu() {
                    const that = this;
                    const commandBarPole = [];
                    if (that.Jednotlive) {
                        commandBarPole.push({
                            action: that.actions.add(new GAction({
                                name: "actOk",
                                caption: "jres:25200124", //RC 25200124 : Vybrat
                                tooltip: "jres:25200124", //RC 25200124 : Vybrat
                                run: function () {
                                    var selection;
                                    selection = that.grid.ggrid("getSelection");
                                    if (selection.length == 1) {
                                        that.okClick(selection[0]);
                                    }
                                }
                            })),
                            favorite: true,
                            customClass: "g-button--primary"
                        });
                    }
                    if (!that.Jednotlive) {
                        commandBarPole.push({
                            action: that.actions.add(new GAction({
                                name: "actPridatDotcSubj",
                                caption: "jres:25200180", //RC 25200180 : Přidat
                                tooltip: "jres:25200180", //RC 25200180 : Přidat
                                run: function () {
                                    that.pridatDotcSubj();
                                }
                                //run: function () {
                                //    var selection: Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto[];
                                //    selection = that.grid.ggrid("getSelection");
                                //    if (selection.length > 0) {
                                //        selection.forEach(function (row) {
                                //            that.pridatDotcSubj(row)
                                //        });
                                //    //that.tryClose();
                                //    }
                                //}
                            })),
                            favorite: true,
                            customClass: "g-button--primary"
                        });
                    }
                    commandBarPole.push({
                        action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
                    });
                    that.commandBar(that.actions.createBar(commandBarPole));
                }
                //nahrani dat
                loadData(filter) {
                    var that = this;
                    //if (filter == undefined)
                    //    filter = new Object();
                    var prom = this.call("LoadData")
                        .done(function (ret) {
                        if (that.grid.hasClass("ggrid")) {
                            that.dataView.updateData(ret);
                            that.grid.ggrid("setData", that.dataView);
                        }
                    });
                    return prom;
                }
                createGridFormat() {
                    var gridFormat;
                    gridFormat = new Gordic.Data.GridFormat();
                    if (window.ginisDebugMode) {
                        gridFormat = gridFormat.addTextColumn({ name: "ixs_esu", caption: "IXS_ESU", width: 150, fixedWidth: false });
                    }
                    gridFormat = gridFormat
                        .addTextColumn({
                        name: "ixs_esu_txt",
                        caption: "jres:25200130", //RC 25200130 : Název
                        width: 300,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "ixs_dva_nazev",
                        caption: "jres:25200131", //RC 25200131 : Typ
                        width: 300,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "zastupce",
                        caption: "jres:25200132", //RC 25200132 : Zástupce subjektu
                        width: 100,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "poznamka",
                        caption: "jres:25200133", //RC 25200133 : Poznámka
                        width: 100,
                        fragment: ""
                    });
                    return gridFormat;
                }
                okClick(subjekt) {
                    var that = this;
                    console.log("Vybrane radky ", subjekt.ixs_esu);
                    this.dialogs.confirm("jres:25200135" + subjekt.ixs_esu_txt + "?") //RC 25200135 : Opravdu chcete zvolit dotčený subjekt 
                        .on('close', (ev, value) => {
                        if (value === "yes") {
                            that.close({ IxsEsu: subjekt.ixs_esu, PorZast: subjekt.por_zast, LicZast: subjekt.lic_zast });
                        }
                    });
                }
                pridatDotcSubj() {
                    var that = this;
                    var l_sText = "";
                    var selection;
                    selection = that.grid.ggrid("getSelection");
                    if (selection.length > 0) {
                        if (that.Zastupovani)
                            l_sText = "jres:25200440"; //RC 25200440 : Označené subjekty budou zařazeny jako zastupovaní.;Chcete Pokračovat?
                        else
                            l_sText = "jres:25200182"; //RC 25200182 : Označené subjekty budou zařazeny jako dotčené subjekty úkonu.\nChcete Pokračovat?
                        this.dialogs.confirm(l_sText)
                            .on('close', (ev, value) => {
                            if (value === "yes") {
                                that.call("PridatDotcSubjMulti", { detailDtoArray: selection }, {
                                    IdEsu: that.IxsEsu, TypVazby: that.TypVazby, LicZast: that.LicZast, PorZast: that.PorZast
                                }).done(function () {
                                    that.tryClose();
                                });
                            }
                        });
                    }
                }
            };
            GVyberDotcenehoSubjektu = __decorate([
                gcontent
            ], GVyberDotcenehoSubjektu);
            WebApp.GVyberDotcenehoSubjektu = GVyberDotcenehoSubjektu;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyRG90Y2VuZWhvU3ViamVrdHUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJEb3RjZW5laG9TdWJqZWt0dS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsSUFBVSxNQUFNLENBOE1mO0FBOU1ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThNbkI7SUE5TWdCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQThNMUI7UUE5TW9CLFdBQUEsTUFBTTtZQUV2QixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsT0FBQSxZQUFZO2dCQWFyRCwwQ0FBMEM7Z0JBRTFDLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxJQUFJO3dCQUNMLDRIQUE0SDt5QkFDM0gsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixhQUFhLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ3ZCLElBQUksRUFBRSxvQkFBb0I7NEJBQzFCLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQ0FDbEIsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0NBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ3RCLENBQUM7NEJBQ0wsQ0FBQzt5QkFDSixDQUFD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QUksSUFBSSxDQUFDLFdBQVc7NEJBQ2hCLE9BQU8sR0FBRyxlQUFlLENBQUMsQ0FBQyxxRkFBcUY7OzRCQUVoSCxPQUFPLEdBQUcsZUFBZSxDQUFBLENBQUUsaUdBQWlHO3dCQUVoSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7NkJBQ3hCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUU7NEJBQ3ZCLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRSxDQUFDO2dDQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxFQUFFO29DQUM1RCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87aUNBQzVGLENBQUMsQ0FBQyxJQUFJLENBQUM7b0NBQ0osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUNwQixDQUFDLENBQUMsQ0FBQzs0QkFHUCxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNYLENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUF4TVksdUJBQXVCO2dCQURuQyxRQUFRO2VBQ0ksdUJBQXVCLENBd01uQztZQXhNWSw4QkFBdUIsMEJBd01uQyxDQUFBO1FBQ0wsQ0FBQyxFQTlNb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBOE0xQjtJQUFELENBQUMsRUE5TWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThNbkI7QUFBRCxDQUFDLEVBOU1TLE1BQU0sS0FBTixNQUFNLFFBOE1mIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcblxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJEb3RjZW5laG9TdWJqZWt0dSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLy9JeHBTcGlzOiBzdHJpbmc7XHJcbiAgICAgICAgLy9UeXBWYXpieTogbnVtYmVyO1xyXG4gICAgICAgIC8vSXhzRHZhOiBzdHJpbmc7XHJcbiAgICAgICAgLy9CZXpaYXN0dXBjdTogYm9vbGVhbjtcclxuICAgICAgICBKZWRub3RsaXZlOiBib29sZWFuO1xyXG4gICAgICAgIFphc3R1cG92YW5pOiBib29sZWFuO1xyXG4gICAgICAgIEl4c0VzdTogc3RyaW5nO1xyXG4gICAgICAgIFR5cFZhemJ5OiBudW1iZXI7XHJcbiAgICAgICAgTGljWmFzdDogc3RyaW5nO1xyXG4gICAgICAgIFBvclphc3Q6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIGRhdGFWaWV3OiBHb3JkaWMuRGF0YS5WaWV3O1xyXG4gICAgICAgIC8vcHJpdmF0ZSBmaWx0ZXJGb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZU1lbnUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1tdWpHcmlkJz5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiY2FsYygxMDAlIC0gXCIgKyB0aGF0LiRmaWx0ZXJGb3JtLmhlaWdodCgpICsgXCJweClcIikgLy8gbmFzdGF2ZW7DrSB2w73FoWt5IGVsZW1lbnR1LCBuYSBrdGVyw70gYnVkZSBwxZlpZMOhbiBncmlkLlxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7ICAgICAvL29ic2x1em5hIGFrY2UsIGt0ZXJhIHNlIHNwb3VzdGkgZGJsIGNsaWNrZW0gbmFkIHJhZGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5KZWRub3RsaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGN0eC5jZWxsSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2tDbGljayhyb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6ICF0aGF0LkplZG5vdGxpdmUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiaXhzX2VzdVwiXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2RhdGFWaWV3XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh1bmRlZmluZWQsIHsga2V5OiBcIml4c19lc3VcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5maWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBDcmVhdGVNZW51KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRCYXJQb2xlOiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuSmVkbm90bGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZEJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMjRcIiwgLy9SQyAyNTIwMDEyNCA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjUyMDAxMjRcIiwgLy9SQyAyNTIwMDEyNCA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Pc3RhdG5pY2hTdWJqZWt0dUR0b1tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2tDbGljayhzZWxlY3Rpb25bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhhdC5KZWRub3RsaXZlKSB7XHJcbiAgICAgICAgICAgICAgICBjb21tYW5kQmFyUG9sZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByaWRhdERvdGNTdWJqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDE4MFwiLCAvL1JDIDI1MjAwMTgwIDogUMWZaWRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjUyMDAxODBcIiwgLy9SQyAyNTIwMDE4MCA6IFDFmWlkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaWRhdERvdGNTdWJqKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5kb25lKGZ1bmN0aW9uIChyZXR2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LnRyeUNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vLy8gUmVha2NlIG5hIG7DoXZyYXRvdm91IGhvZG5vdHUgZGlhbG9ndS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL2lmIChyZXR2YWwgJiYgcmV0dmFsLnVsb3plbm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBfY29udGVudC50cnlSZWxvYWREZXRhaWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3J1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB2YXIgc2VsZWN0aW9uOiBHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtT3N0YXRuaWNoU3ViamVrdHVEdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LnByaWRhdERvdGNTdWJqKHJvdylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3RoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBjb21tYW5kQmFyUG9sZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbihHb3JkaWMuUHJlZmFicy5BY3Rpb25zLlphdnJpdENvbnRlbnQoKSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihjb21tYW5kQmFyUG9sZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uYWhyYW5pIGRhdFxyXG4gICAgICAgIHB1YmxpYyBsb2FkRGF0YShmaWx0ZXI/OiBPYmplY3QpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL2lmIChmaWx0ZXIgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAvLyAgICBmaWx0ZXIgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvbSA9IHRoaXMuY2FsbChcIkxvYWREYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZC5oYXNDbGFzcyhcImdncmlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0YVZpZXcudXBkYXRlRGF0YShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQuZGF0YVZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbU9zdGF0bmljaFN1Ympla3R1RHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Pc3RhdG5pY2hTdWJqZWt0dUR0bz47XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtT3N0YXRuaWNoU3ViamVrdHVEdG8+KCk7XHJcbiAgICAgICAgICAgIGlmICgod2luZG93IGFzIGFueSkuZ2luaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19lc3VcIiwgY2FwdGlvbjogXCJJWFNfRVNVXCIsIHdpZHRoOiAxNTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEzMFwiLCAvL1JDIDI1MjAwMTMwIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kdmFfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMzFcIiwgLy9SQyAyNTIwMDEzMSA6IFR5cFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YXN0dXBjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEzMlwiLCAvL1JDIDI1MjAwMTMyIDogWsOhc3R1cGNlIHN1Ympla3R1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTMzXCIsIC8vUkMgMjUyMDAxMzMgOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2tDbGljayhzdWJqZWt0OiBHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtT3N0YXRuaWNoU3ViamVrdHVEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZ5YnJhbmUgcmFka3kgXCIsIHN1Ympla3QuaXhzX2VzdSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwianJlczoyNTIwMDEzNVwiICsgc3ViamVrdC5peHNfZXN1X3R4dCArIFwiP1wiKSAvL1JDIDI1MjAwMTM1IDogT3ByYXZkdSBjaGNldGUgenZvbGl0IGRvdMSNZW7DvSBzdWJqZWt0IFxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbG9zZScsIChldiwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSh7IEl4c0VzdTogc3ViamVrdC5peHNfZXN1LCBQb3JaYXN0OiBzdWJqZWt0LnBvcl96YXN0LCBMaWNaYXN0OiBzdWJqZWt0LmxpY196YXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmlkYXREb3RjU3ViaigpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbF9zVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Pc3RhdG5pY2hTdWJqZWt0dUR0b1tdO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuWmFzdHVwb3ZhbmkpXHJcbiAgICAgICAgICAgICAgICAgICAgbF9zVGV4dCA9IFwianJlczoyNTIwMDQ0MFwiOyAvL1JDIDI1MjAwNDQwIDogT3puYcSNZW7DqSBzdWJqZWt0eSBidWRvdSB6YcWZYXplbnkgamFrbyB6YXN0dXBvdmFuw60uO0NoY2V0ZSBQb2tyYcSNb3ZhdD9cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBsX3NUZXh0ID0gXCJqcmVzOjI1MjAwMTgyXCIgIC8vUkMgMjUyMDAxODIgOiBPem5hxI1lbsOpIHN1Ympla3R5IGJ1ZG91IHphxZlhemVueSBqYWtvIGRvdMSNZW7DqSBzdWJqZWt0eSDDumtvbnUuXFxuQ2hjZXRlIFBva3JhxI1vdmF0P1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKGxfc1RleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbG9zZScsIChldiwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJQcmlkYXREb3RjU3Viak11bHRpXCIsIHsgZGV0YWlsRHRvQXJyYXk6IHNlbGVjdGlvbiB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWRFc3U6IHRoYXQuSXhzRXN1LCBUeXBWYXpieTogdGhhdC5UeXBWYXpieSwgTGljWmFzdDogdGhhdC5MaWNaYXN0LCBQb3JaYXN0OiB0aGF0LlBvclphc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=