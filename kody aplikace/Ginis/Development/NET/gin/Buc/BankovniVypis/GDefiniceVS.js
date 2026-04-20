"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDefiniceVS.ts                         </Name>
//    <Description> Content pro definici VS pro hledání v poli AV při načítání bankovního výpisu </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-09-10                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /** Content pro definici VS pro hledání v poli AV při načítání bankovního výpisu */
            let GDefiniceVS = class GDefiniceVS extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actNovy: Gordic.Eko.Action.actionNovy({
                            permission: this.Permissions.LzeNovy,
                            run: function (ev, ctx) {
                                that.$grid.ggridroweditor("addRow");
                            }
                        }),
                        actStornovat: Gordic.Eko.Action.actionStornovat({
                            enabled: false,
                            run: function (ev, ctx) {
                                let row = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (!row) {
                                    this.setPending($.Deferred().reject().promise());
                                    return;
                                }
                                this.setPending(that.isl.BucDefiniceVS.stornovat({ data: { sk_vl: row.sk_vl, bu_vl: row.bu_vl, vs_def: row.vs_def } }).get().then(() => {
                                    that.$grid.ggrid("getView").requestData();
                                }));
                            }
                        }),
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        },
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actNovy*", "actStornovat*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření gridu */
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element).ggrid({
                        name: "gridDefiniceVS",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDefiniceVS.list({ filters: { aktivita: 100 }, fragments: ["*"] }), {
                            key: ["sk_vl", "bu_vl", "vs_def"]
                        }),
                        columnMode: "full",
                        selection: (ev, obj) => {
                            //kontrola na normální řádek a nastavení permission
                            if (!(obj.count == 0 || (this.$grid?.find(".row.editing")?.length ?? 1) > 0 || obj.count == 1 && obj.getSelection(false, false).length == 0)) {
                                this.actions.actStornovat?.updatePermission(obj.getSelection()[0].Permissions?.LzeStornovat);
                            }
                            else {
                                this.actions.actStornovat?.updatePermission({ value: false });
                            }
                        }
                    }).ggridroweditor({
                        defaultData: { rok_knihy: this.rok, Permissions: { LzeEditovat: { value: true } } },
                        beforeStart: (ev, info) => {
                            //kontrola povolení editace
                            //permission pro editaci
                            if (!(info.cellInfo.data.Permissions?.LzeEditovat?.value ?? false)) {
                                ev.preventDefault();
                                return void 0;
                            }
                        },
                        start: (ev, obj) => {
                            this.actions.actNovy?.enabled(false);
                            this.actions.actStornovat?.enabled(false);
                        },
                        save: (data, obj) => {
                            const saveDto = {
                                sk_vl: data.sk_vl,
                                bu_vl: data.bu_vl,
                                vs_def: data.vs_def,
                                typ_kum: data.typ_kum,
                                nazev: data.nazev
                            };
                            return this.isl.BucDefiniceVS.upsert(saveDto).get().then((res) => {
                                this.actions.actNovy.updatePermission(this.Permissions?.LzeNovy);
                                this.actions.actStornovat.updatePermission(obj.cellInfo.data.Permissions?.LzeStornovat);
                                this.$grid.ggrid("getView").requestData();
                                return res.data;
                            }).fail((xhr, type, o) => {
                                if (type === "validation") {
                                    //o.handled = true;
                                    this.$grid.findFields().gfield("model", "validations", o);
                                }
                            });
                        },
                        cancel: (ev, obj) => {
                            this.actions.actNovy.updatePermission(this.Permissions?.LzeNovy);
                            this.actions.actStornovat.updatePermission(obj.cellInfo.data.Permissions?.LzeStornovat);
                        }
                    }).gautofit();
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "ucet_vl" /* Interface.GDefiniceVSDtoNames.ucet_vl */,
                        caption: "jres:33600477", //RC 33600477 : Účet
                        width: 200,
                        editor: {
                            widget: "gselectbox",
                            options: [Gordic.Prefabs.Select.ekosuvl(), {
                                    name: "ucet_vl" /* Interface.GDefiniceVSDtoNames.ucet_vl */,
                                    model: "sk_vl=sk_vl;bu_vl=bu_vl;rok_knihy=rok",
                                    serverFilters: {
                                        pristupKBU: 1,
                                        urovenPristupuKBU: 1,
                                        rezimVyberuDleKnihy: 0
                                    },
                                    validators: [new Gordic.Validators.Required()],
                                }]
                        }
                    })
                        .addTextColumn({
                        name: "vs_def" /* Interface.GDefiniceVSDtoNames.vs_def */,
                        caption: "jres:33600478", //RC 33600478 : Začátek VS
                        width: 120,
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "vs_def" /* Interface.GDefiniceVSDtoNames.vs_def */,
                                    validators: [new Gordic.Validators.Required(), new Gordic.Validators.Length({ max: 12 })],
                                }]
                        }
                    })
                        .addTextColumn({
                        name: "typ_kum_txt" /* Interface.GDefiniceVSDtoNames.typ_kum_txt */,
                        caption: "jres:33600479", //RC 33600479 : Typ
                        width: 100,
                        editor: {
                            widget: "gselectbox",
                            options: [Gordic.Prefabs.Select.bucctyk(), {
                                    name: "typ_kum" /* Interface.GDefiniceVSDtoNames.typ_kum */,
                                    model: "typ_kum=typ_kum",
                                    validators: [new Gordic.Validators.Required()],
                                }]
                        }
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GDefiniceVSDtoNames.nazev */,
                        caption: "jres:33600480", //RC 33600480 : Název
                        width: 250,
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "nazev" /* Interface.GDefiniceVSDtoNames.nazev */,
                                }]
                        }
                    });
                }
            };
            GDefiniceVS = __decorate([
                Decorators.gcontent
            ], GDefiniceVS);
            WebClient.GDefiniceVS = GDefiniceVS;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RlZmluaWNlVlMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGVmaW5pY2VWUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2RiwrR0FBK0c7QUFDL0cseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQW1MZjtBQW5MRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtTG5CO0lBbkxnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FtTDdCO1FBbkxvQixXQUFBLFNBQVM7WUFDMUIsbUZBQW1GO1lBRW5GLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxPQUFBLFlBQVk7Z0JBT3pDLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDOzRCQUNsQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPOzRCQUNwQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3hDLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOzRCQUM1QyxP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dXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQnVjLldlYkNsaWVudC5HRGVmaW5pY2VWUy50cyAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gQ29udGVudCBwcm8gZGVmaW5pY2kgVlMgcHJvIGhsZWTDoW7DrSB2IHBvbGkgQVYgcMWZaSBuYcSNw610w6Fuw60gYmFua292bsOtaG8gdsO9cGlzdSA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA5LTEwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5CdWMuV2ViQ2xpZW50IHtcclxuICAgIC8qKiBDb250ZW50IHBybyBkZWZpbmljaSBWUyBwcm8gaGxlZMOhbsOtIHYgcG9saSBBViBwxZlpIG5hxI3DrXTDoW7DrSBiYW5rb3Zuw61obyB2w71waXN1ICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZWZpbmljZVZTIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwdWJsaWMgUGVybWlzc2lvbnM6IEludGVyZmFjZS5HRGVmaW5pY2VWU1NlcnZpY2VQZXJtaXNzaW9ucztcclxuICAgICAgICAvKipSb2sga25paHkqL1xyXG4gICAgICAgIHByaXZhdGUgcm9rOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0Tm92eTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uTm92eSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5QZXJtaXNzaW9ucy5MemVOb3Z5LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZHJvd2VkaXRvcihcImFkZFJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFN0b3Jub3ZhdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uU3Rvcm5vdmF0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxJbnRlcmZhY2UuR0RlZmluaWNlVlNEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKCQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmlzbC5CdWNEZWZpbmljZVZTLnN0b3Jub3ZhdCh7IGRhdGE6IHsgc2tfdmw6IHJvdy5za192bCwgYnVfdmw6IHJvdy5idV92bCwgdnNfZGVmOiByb3cudnNfZGVmIH0gfSkuZ2V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBtZW51YmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Tm92eSpcIiwgXCJhY3RTdG9ybm92YXQqXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWR1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdncmlkPEludGVyZmFjZS5HRGVmaW5pY2VWU0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkRGVmaW5pY2VWU1wiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HRGVmaW5pY2VWU0R0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2wuQnVjRGVmaW5pY2VWUy5saXN0KHsgZmlsdGVyczogeyBha3Rpdml0YTogMTAwIH0sIGZyYWdtZW50czogW1wiKlwiXX0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJza192bFwiLCBcImJ1X3ZsXCIsIFwidnNfZGVmXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2tvbnRyb2xhIG5hIG5vcm3DoWxuw60gxZnDoWRlayBhIG5hc3RhdmVuw60gcGVybWlzc2lvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKG9iai5jb3VudCA9PSAwIHx8ICh0aGlzLiRncmlkPy5maW5kKFwiLnJvdy5lZGl0aW5nXCIpPy5sZW5ndGggPz8gMSkgPiAwIHx8IG9iai5jb3VudCA9PSAxICYmIG9iai5nZXRTZWxlY3Rpb24oZmFsc2UsIGZhbHNlKS5sZW5ndGggPT0gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFN0b3Jub3ZhdD8udXBkYXRlUGVybWlzc2lvbihvYmouZ2V0U2VsZWN0aW9uKClbMF0uUGVybWlzc2lvbnM/Lkx6ZVN0b3Jub3ZhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFN0b3Jub3ZhdD8udXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmdncmlkcm93ZWRpdG9yPEludGVyZmFjZS5HRGVmaW5pY2VWU0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdERhdGE6IHsgcm9rX2tuaWh5OiB0aGlzLnJvaywgUGVybWlzc2lvbnM6IHsgTHplRWRpdG92YXQ6IHsgdmFsdWU6IHRydWUgfSB9IH0sXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTdGFydDogKGV2LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9rb250cm9sYSBwb3ZvbGVuw60gZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcGVybWlzc2lvbiBwcm8gZWRpdGFjaVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGluZm8uY2VsbEluZm8uZGF0YS5QZXJtaXNzaW9ucz8uTHplRWRpdG92YXQ/LnZhbHVlID8/IGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdGFydDogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Tm92eT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFN0b3Jub3ZhdD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2F2ZTogKGRhdGEsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhdmVEdG86IEludGVyZmFjZS5HRGVmaW5pY2VWU1Vwc2VydFJlcUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2tfdmw6IGRhdGEuc2tfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1X3ZsOiBkYXRhLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2c19kZWY6IGRhdGEudnNfZGVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfa3VtOiBkYXRhLnR5cF9rdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2OiBkYXRhLm5hemV2XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjRGVmaW5pY2VWUy51cHNlcnQoc2F2ZUR0bykuZ2V0KCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5IS51cGRhdGVQZXJtaXNzaW9uKHRoaXMuUGVybWlzc2lvbnM/Lkx6ZU5vdnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U3Rvcm5vdmF0IS51cGRhdGVQZXJtaXNzaW9uKG9iai5jZWxsSW5mby5kYXRhLlBlcm1pc3Npb25zPy5MemVTdG9ybm92YXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbCgoeGhyLCB0eXBlLCBvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInZhbGlkYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9vLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCBvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbDogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Tm92eSEudXBkYXRlUGVybWlzc2lvbih0aGlzLlBlcm1pc3Npb25zPy5MemVOb3Z5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U3Rvcm5vdmF0IS51cGRhdGVQZXJtaXNzaW9uKG9iai5jZWxsSW5mby5kYXRhLlBlcm1pc3Npb25zPy5MemVTdG9ybm92YXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWRmb3Jtw6F0dSBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGVmaW5pY2VWU0R0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDc3XCIsIC8vUkMgMzM2MDA0NzcgOiDDmsSNZXRcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEZWZpbmljZVZTRHRvTmFtZXMudWNldF92bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNrX3ZsPXNrX3ZsO2J1X3ZsPWJ1X3ZsO3Jva19rbmloeT1yb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmlzdHVwS0JVOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVyb3ZlblByaXN0dXB1S0JVOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlemltVnliZXJ1RGxlS25paHk6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEZWZpbmljZVZTRHRvTmFtZXMudnNfZGVmLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQ3OFwiLCAvL1JDIDMzNjAwNDc4IDogWmHEjcOhdGVrIFZTXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGVmaW5pY2VWU0R0b05hbWVzLnZzX2RlZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMTIgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEZWZpbmljZVZTRHRvTmFtZXMudHlwX2t1bV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDc5XCIsIC8vUkMgMzM2MDA0NzkgOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y2N0eWsoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEZWZpbmljZVZTRHRvTmFtZXMudHlwX2t1bSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInR5cF9rdW09dHlwX2t1bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGVmaW5pY2VWU0R0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQ4MFwiLCAvL1JDIDMzNjAwNDgwIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1MCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGVmaW5pY2VWU0R0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==