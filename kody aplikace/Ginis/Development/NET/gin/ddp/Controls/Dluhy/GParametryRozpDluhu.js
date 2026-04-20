"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GParametryRozpDluhu.ts                 </Name>
//    <Description> Parametry rozpuštění dluhu                                  </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-08-21                                                  </Created>
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
            let GParametryRozpDluhu = class GParametryRozpDluhu extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    //pokud je ixs_rdl dlouhý 12 znaku znamená to že se jedná o zobrazení detailu existující hodnoty, pokud ale není jedná se o vytvoření nového
                    if (that.data?.ixs_rdl?.length == 12) {
                        that.update = true;
                        that.initialValues();
                    }
                    else {
                        that.update = false;
                        that.makeNewIxsRdl();
                        //generace nového ixs_rdl
                    }
                    that.createForm();
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                createForm() {
                    var that = this;
                    that.form = new Gordic.Forms.Form({ name: "udajeForm", layoutDescriptor: "L1M1S1" })
                        .addRow({ label: "Identifikátor" })
                        .addField("gstringbox", {
                        name: "ixs_rdl",
                        disabled: true,
                        initialValue: that.ixs_rdl,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow({ label: "Název" })
                        .addField("gstringbox", {
                        name: "nazev",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow({ label: "Datum od" })
                        .addField("gdatebox", {
                        name: "dat_od",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow({ label: "Datum do" })
                        .addField("gdatebox", {
                        name: "dat_do",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow({ label: "Typ rozpuštění dluhu" })
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ddpTypRdl(), {
                        name: "typ_rdl",
                        model: "model.typ_rdl = value.typ_rdl; model.typ_rdl_txt = value.typ_rdl_txt",
                        initialValue: { typ_rdl: 0, typ_rdl_txt: "" },
                        dropdown: true,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow({ label: "Poznámka" })
                        .addField("gstringbox", {
                        name: "poznamka"
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "cb_pen",
                        label: "Penalizovat rozepisovaný dluh",
                        change: (ev, obj) => {
                            if (obj.value == false) {
                                that.findFields("proc_sazba_pen").gfield("disable");
                                that.findFields("proc_sazba_pen").gfield("reset");
                            }
                            else
                                that.findFields("proc_sazba_pen").gfield("enable");
                        }
                    })
                        .addRow()
                        .addField("gnumberbox", "w-3", Gordic.Prefabs.Number.decimal(2), {
                        name: "proc_sazba_pen",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addText("% z částky dluhu", "w-9");
                    that.form.appendTo(that.element);
                }
                initialValues() {
                    var that = this;
                    var dto = {};
                    dto.ixs_rdl = that.data.ixs_rdl;
                    that.isl.RozpusteniDluhu.ziskejDataDleIxsRdl(rq => { return { data: dto }; })
                        .get().done(function (dto) {
                        that.findForms("udajeForm").findFields().gfield("model", "apply", dto.data);
                        var proc_sazba_pen = that.findFields("proc_sazba_pen").gfield("getValue");
                        if (proc_sazba_pen != null && proc_sazba_pen != 0) {
                            that.findFields("cb_pen").gfield("setInitial", true);
                        }
                    });
                }
                makeNewIxsRdl() {
                    var that = this;
                    that.isl.RozpusteniDluhu.getNewIxsRdl()
                        .get()
                        .done(function (ixs_rdl) {
                        that.ixs_rdl = ixs_rdl;
                        that.findFields("ixs_rdl").gfield("setValue", ixs_rdl);
                        that.findFields("cb_pen").gfield("setInitial", false);
                        that.findFields("proc_sazba_pen").gfield("disable");
                    });
                }
                ok() {
                    const that = this;
                    var dto = {};
                    that.findForms("udajeForm").findFields().gfield("model", "collect", dto);
                    var req = rq => {
                        return {
                            rq: { Data: dto }
                        };
                    };
                    var task;
                    if (that.update) {
                        task = that.isl.RozpusteniDluhu.update(req);
                    }
                    else {
                        task = that.isl.RozpusteniDluhu.insert(req);
                    }
                    WebClient.Common.Base.ProcessResponse(task.get(), this, true);
                }
            };
            GParametryRozpDluhu = __decorate([
                Decorators.gcontent
            ], GParametryRozpDluhu);
            WebClient.GParametryRozpDluhu = GParametryRozpDluhu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BhcmFtZXRyeVJvenBEbHVodS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQYXJhbWV0cnlSb3pwRGx1aHUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FpS2Y7QUFqS0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaUtuQjtJQWpLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBaUs3QjtRQWpLb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsT0FBQSxZQUFZO2dCQVNqRCxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsNElBQTRJO29CQUM1SSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUUsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDekIsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLHlCQUF5QjtvQkFDN0IsQ0FBQztvQkFFRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixJQUFJLE9BQU8sQ0FBQzs0QkFFUixJQUFJLEVBQUUsU0FBUzs0QkFDZixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFD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QyxRQUFRO2VBQ1AsbUJBQW1CLENBNkovQjtZQTdKWSw2QkFBbUIsc0JBNkovQixDQUFBO1FBQ0wsQ0FBQyxFQWpLb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBaUs3QjtJQUFELENBQUMsRUFqS2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlLbkI7QUFBRCxDQUFDLEVBaktTLE1BQU0sS0FBTixNQUFNLFFBaUtmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQYXJhbWV0cnlSb3pwRGx1aHUudHMgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBQYXJhbWV0cnkgcm96cHXFoXTEm27DrSBkbHVodSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTA4LTIxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1BhcmFtZXRyeVJvenBEbHVodSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIGRhdGE6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUm96cHVzdGVuaURsdWh1RHRvO1xyXG4gICAgICAgIGZvcm07XHJcblxyXG4gICAgICAgIGl4c19yZGw6IHN0cmluZztcclxuICAgICAgICB1cGRhdGU6IGJvb2xlYW47XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL3Bva3VkIGplIGl4c19yZGwgZGxvdWjDvSAxMiB6bmFrdSB6bmFtZW7DoSB0byDFvmUgc2UgamVkbsOhIG8gem9icmF6ZW7DrSBkZXRhaWx1IGV4aXN0dWrDrWPDrSBob2Rub3R5LCBwb2t1ZCBhbGUgbmVuw60gamVkbsOhIHNlIG8gdnl0dm/FmWVuw60gbm92w6lob1xyXG4gICAgICAgICAgICBpZiAodGhhdC5kYXRhPy5peHNfcmRsPy5sZW5ndGggPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaW5pdGlhbFZhbHVlcygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC51cGRhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoYXQubWFrZU5ld0l4c1JkbCgpO1xyXG4gICAgICAgICAgICAgICAgLy9nZW5lcmFjZSBub3bDqWhvIGl4c19yZGxcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQub2soKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwidWRhamVGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJJZGVudGlmaWvDoXRvclwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19yZGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoYXQuaXhzX3JkbCxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIk7DoXpldlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJEYXR1bSBvZFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkRhdHVtIGRvXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiVHlwIHJvenB1xaF0xJtuw60gZGx1aHVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmRkcFR5cFJkbCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcmRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3JkbCA9IHZhbHVlLnR5cF9yZGw7IG1vZGVsLnR5cF9yZGxfdHh0ID0gdmFsdWUudHlwX3JkbF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX3JkbDogMCwgdHlwX3JkbF90eHQ6IFwiXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlBvem7DoW1rYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYl9wZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQZW5hbGl6b3ZhdCByb3plcGlzb3ZhbsO9IGRsdWhcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInByb2Nfc2F6YmFfcGVuXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJwcm9jX3NhemJhX3BlblwiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHRoYXQuZmluZEZpZWxkcyhcInByb2Nfc2F6YmFfcGVuXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5kZWNpbWFsKDIpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9jX3NhemJhX3BlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIiUgeiDEjcOhc3RreSBkbHVodVwiLCBcInctOVwiKTtcclxuXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbml0aWFsVmFsdWVzKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUm96cHVzdGVuaURsdWh1RHRvID0ge307XHJcblxyXG4gICAgICAgICAgICBkdG8uaXhzX3JkbCA9IHRoYXQuZGF0YS5peHNfcmRsO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5Sb3pwdXN0ZW5pRGx1aHUuemlza2VqRGF0YURsZUl4c1JkbChycSA9PiB7IHJldHVybiB7IGRhdGE6IGR0byB9IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJ1ZGFqZUZvcm1cIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgZHRvLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY19zYXpiYV9wZW4gPSB0aGF0LmZpbmRGaWVsZHMoXCJwcm9jX3NhemJhX3BlblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY19zYXpiYV9wZW4gIT0gbnVsbCAmJiBwcm9jX3NhemJhX3BlbiAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX3BlblwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1ha2VOZXdJeHNSZGwoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5pc2wuUm96cHVzdGVuaURsdWh1LmdldE5ld0l4c1JkbCgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChpeHNfcmRsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5peHNfcmRsID0gaXhzX3JkbFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIml4c19yZGxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgaXhzX3JkbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY2JfcGVuXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwicHJvY19zYXpiYV9wZW5cIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdSb3pwdXN0ZW5pRGx1aHVEdG8gPSB7fTtcclxuICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJ1ZGFqZUZvcm1cIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG4gICAgICAgICAgICB2YXIgcmVxID0gcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBycTogeyBEYXRhOiBkdG8gfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0YXNrO1xyXG4gICAgICAgICAgICBpZiAodGhhdC51cGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRhc2sgPSB0aGF0LmlzbC5Sb3pwdXN0ZW5pRGx1aHUudXBkYXRlKHJlcSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrID0gdGhhdC5pc2wuUm96cHVzdGVuaURsdWh1Lmluc2VydChyZXEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UodGFzay5nZXQoKSwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==