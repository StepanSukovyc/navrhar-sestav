"use strict";
/**
 * Seznam výše exekucí
 *
 * @author Vojtěch Čech
 * @date 01.04.2024
 */
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
            let GSeznamVyseExekuci = class GSeznamVyseExekuci extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    that.title = "Nastavení výše nákladů řízení";
                    that.actions.addRange([
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actClose"]));
                    that.createForm();
                    that.createGrid();
                    that.loadData();
                }
                createForm() {
                    var that = this;
                    var form = new Gordic.Forms.Form({ name: "headerForm", layoutDescriptor: "L2M2S1 LMS-2-9-1" })
                        .addSection()
                        .addRow("IČO")
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosico(), {
                        name: "ico",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        initialValue: that.ico,
                        change: () => {
                            that.loadData();
                        }
                    })
                        .addRow("Rok")
                        .addField("gselectbox", Gordic.Prefabs.Select.rok(), {
                        name: "rok",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        initialValue: { rok: that.rok },
                        change: () => {
                            that.loadData();
                        }
                    })
                        .addSection()
                        .addRow("UCS")
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosucs(), {
                        name: "ucs",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        initialValue: { ucs: that.ucs, ico: that.ico },
                        change: () => {
                            that.loadData();
                        }
                    })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                        name: "typ_phl",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        initialValue: { typ_phl: that.typPhl },
                        change: () => {
                            that.loadData();
                        }
                    });
                    $.newDiv().appendTo(that.element).gform("createFrom", form);
                }
                createGrid() {
                    var that = this;
                    that.grid = $.newDiv().appendTo(that.element).gautofit({ resizersOnTab: false })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                        },
                        multi: false,
                        columnMode: "full",
                        name: "grid",
                        columns: WebClient.Common.GridFormats.VyseExekuci()
                    });
                }
                loadData() {
                    var that = this;
                    that.beginOperation({ id: "loadVyseExekuci", text: "Načítání dat... (Výše exekucí)" });
                    var filter = {};
                    that.findForms("headerForm").findFields().gfield("model", "collect", filter);
                    // Pokud nejsou vyplněny některé hodnoty (stává se při prvním zavolání), použijeme inializační hodnoty
                    if (filter.ucs == null || filter.typ_phl == null || filter.ico == null || filter.rok == null) {
                        filter.ucs = that.ucs;
                        filter.ico = that.ico;
                        filter.typ_phl = that.typPhl;
                        filter.rok = that.rok;
                    }
                    else {
                        filter.ucs = filter.ucs.ucs;
                        filter.ico = filter.ico.ico;
                        filter.typ_phl = filter.typ_phl.typ_phl;
                        filter.rok = filter.rok.rok;
                    }
                    that.isl.VyseExekuci.list(() => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", view);
                    }).always(() => {
                        that.endOperation({ id: "loadVyseExekuci" });
                    });
                }
            };
            GSeznamVyseExekuci = __decorate([
                Decorators.gcontent
            ], GSeznamVyseExekuci);
            WebClient.GSeznamVyseExekuci = GSeznamVyseExekuci;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVZ5c2VFeGVrdWNpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbVZ5c2VFeGVrdWNpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7Ozs7OztBQUVILElBQVUsTUFBTSxDQXNJZjtBQXRJRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzSW5CO0lBdElnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzSTdCO1FBdElvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQVk7Z0JBYWhELGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLCtCQUErQixDQUFDO29CQUU3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNyQyxDQUFDO3FCQUNMLENBQUMsQ0FBQTtvQkFFRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV0RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNwQixDQUFDO2dCQUVELFVBQVU7b0JBQ04sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFB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S0FBSCxVQUFHLFFBc0luQjtBQUFELENBQUMsRUF0SVMsTUFBTSxLQUFOLE1BQU0sUUFzSWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU2V6bmFtIHbDvcWhZSBleGVrdWPDrVxyXG4gKiBcclxuICogQGF1dGhvciBWb2p0xJtjaCDEjGVjaFxyXG4gKiBAZGF0ZSAwMS4wNC4yMDI0XHJcbiAqL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVZ5c2VFeGVrdWNpIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLyoqIHR5cCBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIHByaXZhdGUgdHlwUGhsOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIHJvayAqL1xyXG4gICAgICAgIHByaXZhdGUgcm9rOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIEnEjE8gKi9cclxuICAgICAgICBwcml2YXRlIGljbzogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBVQ1MgKi9cclxuICAgICAgICBwcml2YXRlIHVjczogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gXCJOYXN0YXZlbsOtIHbDvcWhZSBuw6FrbGFkxa8gxZnDrXplbsOtXCI7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG5cclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Q2xvc2VcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiaGVhZGVyRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSBMTVMtMi05LTFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIknEjE9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZWtvc2ljbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlJva1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5yb2soKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgcm9rOiB0aGF0LnJvayB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlVDU1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5la29zdWNzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHVjczogdGhhdC51Y3MsIGljbzogdGhhdC5pY28gfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnR5cFBvaGxlZGF2a3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHR5cF9waGw6IHRoYXQudHlwUGhsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5ncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVsO9Y2hvesOtIHBvaGxlZFwiLCBfbG9ja2VkOiB0cnVlLCBfZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuVnlzZUV4ZWt1Y2koKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2FkRGF0YSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWRWeXNlRXhla3VjaVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQuLi4gKFbDvcWhZSBleGVrdWPDrSlcIiB9KVxyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge31cclxuICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJoZWFkZXJGb3JtXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZmlsdGVyKTtcclxuICAgICAgICAgICAgLy8gUG9rdWQgbmVqc291IHZ5cGxuxJtueSBuxJtrdGVyw6kgaG9kbm90eSAoc3TDoXbDoSBzZSBwxZlpIHBydm7DrW0gemF2b2zDoW7DrSksIHBvdcW+aWplbWUgaW5pYWxpemHEjW7DrSBob2Rub3R5XHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIudWNzID09IG51bGwgfHwgZmlsdGVyLnR5cF9waGwgPT0gbnVsbCB8fCBmaWx0ZXIuaWNvID09IG51bGwgfHwgZmlsdGVyLnJvayA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIudWNzID0gdGhhdC51Y3M7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuaWNvID0gdGhhdC5pY287XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIudHlwX3BobCA9IHRoYXQudHlwUGhsO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLnJvayA9IHRoYXQucm9rO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLnVjcyA9IGZpbHRlci51Y3MudWNzO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLmljbyA9IGZpbHRlci5pY28uaWNvO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLnR5cF9waGwgPSBmaWx0ZXIudHlwX3BobC50eXBfcGhsO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLnJvayA9IGZpbHRlci5yb2sucm9rO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeXNlRXhla3VjaS5saXN0KFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFZ5c2VFeGVrdWNpXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==