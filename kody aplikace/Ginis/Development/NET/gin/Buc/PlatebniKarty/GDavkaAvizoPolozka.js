"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAVSeznam.ts                      </Name>
//    <Description> Dialog s položkami dávky avíza platební karty               </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-27                                                  </Created>
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
            /**Dialog s položkami dávky avíza platební karty */
            let GDavkaAvizoPolozka = class GDavkaAvizoPolozka extends Gordic.GContentBase {
                closing() {
                    return { changed: this.changed };
                }
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
                        actRozpis: {
                            caption: "jres:33600310", //RC 33600310 : Rozpis
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.rozpis());
                            }
                        },
                        actDohledat: {
                            caption: "jres:33600311", //RC 33600311 : Dohledání
                            description: "jres:33600337", //RC 33600337 : Automatické dohledání platby POK pro dosud neidentifikovanou položku avíza
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.dohledat());
                            }
                        },
                        actOznacNeznama: {
                            caption: "jres:33600312", //RC 33600312 : Neznámá
                            description: "jres:33600314", //RC 33600314 : Změna stavu položky na Neznámá platba
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.zmenaStavuPolozky(30));
                            }
                        },
                        actOznacNeidentifikovana: {
                            caption: "jres:33600313", //RC 33600313 : Neidentifikovaná
                            description: "jres:33600315", //RC 33600315 : Změna stavu položky na Neidentifikovaná platba
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.zmenaStavuPolozky(10));
                            }
                        },
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actRozpis*", "actDohledat*", "actOznacNeznama*", "actOznacNeidentifikovana*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridDavkaAvizoPolozka",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaAvizoPolozka.list({
                            filters: {
                                davka: this.davka,
                                //s_rozp: this.s_rozp,
                                mod: this.mod
                            },
                            fragments: ["Permissions"]
                        }), {
                            key: ["lic", "davka", "radek", "subradek"],
                        }),
                        defaultAction: this.actions.actRozpis,
                        defaultProfile: {
                            sort: "radek",
                            condFormats: [
                                {
                                    formula: "@s_ide == 10",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                                    description: "jres:33600316" //RC 33600316 : Položka neidentifikována
                                },
                                {
                                    formula: "@s_ide == 30",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue,
                                    description: "jres:33600317" //RC 33600317 : Položka neznámá
                                },
                                {
                                    formula: "@s_ide == 0",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.green,
                                    description: "jres:33600318" //RC 33600318 : Položka evidována
                                },
                            ]
                        },
                        selection: (ev, obj) => {
                            let row = Gordic.Eko.Grid.currentRow($(ev.target));
                            if (row != void 0) {
                                this.actions.actRozpis?.updatePermission(row.Permissions, "LzeRozpis");
                                if (this.mod != 0 || this.s_rozp == 30) {
                                    this.actions.actDohledat?.enabled(false);
                                    this.actions.actOznacNeznama?.enabled(false);
                                    this.actions.actOznacNeidentifikovana?.enabled(false);
                                }
                                else {
                                    this.actions.actDohledat?.updatePermission(row.Permissions, "LzeDohledat");
                                    this.actions.actOznacNeznama?.updatePermission(row.Permissions, "LzeOznacNeznama");
                                    this.actions.actOznacNeidentifikovana?.updatePermission(row.Permissions, "LzeOznacNeidentifikovana");
                                }
                            }
                            else {
                                this.actions.actRozpis?.enabled(false);
                                this.actions.actDohledat?.enabled(false);
                                this.actions.actOznacNeznama?.enabled(false);
                                this.actions.actOznacNeidentifikovana?.enabled(false);
                            }
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addTextColumn({
                        name: "s_ide_zkr" /* Interface.GDavkaAvizoPolozkaDtoNames.s_ide_zkr */,
                        caption: "jres:33600319", //RC 33600319 : S 
                        description: "jres:33600320", //RC 33600320 : Stav položky
                        width: 32,
                        cellTemplate: (data) => { return data.s_ide_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_ide_txt ?? ""; }
                    });
                    columns.addNumberColumn({
                        name: "cis_sum" /* Interface.GDavkaAvizoPolozkaDtoNames.cis_sum */,
                        caption: "jres:33600321", //RC 33600321 : Sum
                        width: 60
                    });
                    columns.addTextColumn({
                        name: "pos_id" /* Interface.GDavkaAvizoPolozkaDtoNames.pos_id */,
                        caption: "jres:33600322", //RC 33600322 : Pokladna
                        width: 80
                    });
                    columns.addDateColumn({
                        name: "dat_tra" /* Interface.GDavkaAvizoPolozkaDtoNames.dat_tra */,
                        caption: "jres:33600323", //RC 33600323 : Datum transakce
                        width: 110
                    });
                    columns.addTextColumn({
                        name: "karta_id" /* Interface.GDavkaAvizoPolozkaDtoNames.karta_id */,
                        caption: "jres:33600324", //RC 33600324 : Číslo karty
                        width: 140
                    });
                    columns.addTextColumn({
                        name: "aut_kod" /* Interface.GDavkaAvizoPolozkaDtoNames.aut_kod */,
                        caption: "jres:33600325", //RC 33600325 : Autor. kód
                        width: 120
                    });
                    columns.addCurrencyColumn({
                        name: "c_tra" /* Interface.GDavkaAvizoPolozkaDtoNames.c_tra */,
                        caption: "jres:33600326", //RC 33600326 : Částka
                        width: 120
                    });
                    columns.addCurrencyColumn({
                        name: "c_pop" /* Interface.GDavkaAvizoPolozkaDtoNames.c_pop */,
                        caption: "jres:33600327", //RC 33600327 : Poplatky
                        width: 120
                    });
                    columns.addCurrencyColumn({
                        name: "c_zau" /* Interface.GDavkaAvizoPolozkaDtoNames.c_zau */,
                        caption: "jres:33600328", //RC 33600328 : Uhrazeno
                        width: 120
                    });
                    columns.addVs({
                        name: "vs" /* Interface.GDavkaAvizoPolozkaDtoNames.vs */,
                    });
                    columns.addSs({
                        name: "ss" /* Interface.GDavkaAvizoPolozkaDtoNames.ss */,
                    });
                    columns.addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GDavkaAvizoDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GDavkaAvizoDtoNames.ucet_vl */,
                    });
                    columns.addTextColumn({
                        name: "ixp_pok" /* Interface.GDavkaAvizoPolozkaDtoNames.ixp_pok */,
                        caption: "jres:33600329", //RC 33600329 : Identifikátor POK
                        width: 120
                    });
                    columns.addTextColumn({
                        name: "poznamka" /* Interface.GDavkaAvizoPolozkaDtoNames.poznamka */,
                        caption: "jres:33600331", //RC 33600331 : Poznámka
                        width: 250
                    });
                    columns.addNumberColumn({
                        name: "ref_cislo" /* Interface.GDavkaAvizoPolozkaDtoNames.ref_cislo */,
                        caption: "jres:33600332", //RC 33600332 : Číslo platby
                        width: 80
                    });
                    columns.addNumberColumn({
                        name: "s_ide" /* Interface.GDavkaAvizoPolozkaDtoNames.s_ide */,
                        caption: "jres:33600333", //RC 33600333 : Stav položky (číselně)
                        hidden: true
                    });
                    return columns;
                }
                /**Změna stavu položky */
                zmenaStavuPolozky(stav) {
                    // aktuální vybraná položka
                    const row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    let textDotazu = "";
                    if (stav == 30) {
                        textDotazu = "jres:33600334"; //RC 33600334 : Opravdu chcete změnit stav položky na Neznámá platba?
                    }
                    else {
                        textDotazu = "jres:33600335"; //RC 33600335 : Opravdu chcete změnit stav položky na Neidentifikovaná platba?
                    }
                    return this.dialogs.confirm(textDotazu).createDialogPromise().then((res) => {
                        if (res === GDlg.mbbYes.id) {
                            return this.isl.BucDavkaAvizoPolozka.zmenaStavu({ data: { davka: row.davka, radek: row.radek, subradek: row.subradek, stav: stav } }).get().then(() => {
                                this.changed = true;
                                this.$grid.ggrid("getView").requestData();
                            });
                        }
                        else {
                            return $.Deferred().reject().promise();
                        }
                    });
                }
                /**Otevření rozpisu položky avíza*/
                rozpis() {
                    const row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaAvizoPolozkaRozpis", { uid: "GDavkaAvizoPolozkaRozpis#" }], {
                        davka: row.davka,
                        radek: row.radek,
                        mod: this.mod,
                    }).createDialogPromise();
                }
                /**Akce dohledání*/
                dohledat() {
                    const row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    return this.isl.BucDavkaAvizoPolozka.dohledatPlatbyTypPocet({ davka: row.davka, radek: row.radek, subradek: row.subradek }).getData().then((ctx) => {
                        if ((ctx?.typ_doh ?? 0) > 0 && (ctx?.poc_doh ?? 0) > 0) {
                            return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaAvizoPolozkaUhradaPOK", { uid: "GDavkaAvizoPolozkaUhradaPOK#" }], {
                                karta_id: row.karta_id,
                                typ_doh: ctx.typ_doh,
                                pos_id: row.pos_id,
                                c_tra: row.c_tra
                            }).createDialogPromise().then((uhradaPok) => {
                                if (uhradaPok) {
                                    //v TK je ještě dotaz, ale takhle daleko by neměl být snad už potřeba
                                    //TK dotaz: Opravdu chcete vybranou položku avíza identifikovat s dohledanou pokladní platbou ?
                                    return this.isl.BucDavkaAvizoPolozka.identifikovatPolozku({ davka: row.davka, radek: row.radek, ixp_pok: uhradaPok.ixp, por_cislo: uhradaPok.por_cislo }).get().then(() => {
                                        this.changed = true;
                                        this.$grid.ggrid("getView").requestData();
                                    });
                                }
                                else {
                                    $.Deferred().reject().promise();
                                }
                            });
                        }
                        else {
                            return this.dialogs.warning("jres:33600338").createDialogPromise().then(() => { return $.Deferred().reject().promise(); }); //RC 33600338 : Žádná odpovídající platba nenalezena
                        }
                    });
                }
            };
            GDavkaAvizoPolozka = __decorate([
                Decorators.gcontent
            ], GDavkaAvizoPolozka);
            WebClient.GDavkaAvizoPolozka = GDavkaAvizoPolozka;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQXZpem9Qb2xvemthLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RhdmthQXZpem9Qb2xvemthLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBZ1RmO0FBaFRELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdUbkI7SUFoVGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWdUN0I7UUFoVG9CLFdBQUEsU0FBUztZQUMxQixtREFBbUQ7WUFFbkQsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQVk7Z0JBYWhELE9BQU87b0JBQ0gsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JDLENBQUM7Z0JBRUQsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFNBQVMsRUFBRTs0QkFDUCxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDaEQsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7NEJBQ25DLENBQUM7eUJBQ0o7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O3dDQUN4SyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt3Q0FDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7b0NBQzlDLENBQUMsQ0FBQyxDQUFBO2dDQUNOLENBQUM7cUNBQU0sQ0FBQztvQ0FDSixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ3BDLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQzs2QkFBTSxDQUFDOzRCQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9EQUFvRDt3QkFDcEwsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQTtnQkFDTixDQUFDO2FBQ0osQ0FBQTtZQTVTWSxrQkFBa0I7Z0JBRDlCLFVBQVUsQ0FBQyxRQUFRO2VBQ1Asa0JBQWtCLENBNFM5QjtZQTVTWSw0QkFBa0IscUJBNFM5QixDQUFBO1FBQ0wsQ0FBQyxFQWhUb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBZ1Q3QjtJQUFELENBQUMsRUFoVGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWdUbkI7QUFBRCxDQUFDLEVBaFRTLE1BQU0sS0FBTixNQUFNLFFBZ1RmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUFWU2V6bmFtLnRzICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBEaWFsb2cgcyBwb2xvxb5rYW1pIGTDoXZreSBhdsOtemEgcGxhdGVibsOtIGthcnR5ICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wMy0yNyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKipEaWFsb2cgcyBwb2xvxb5rYW1pIGTDoXZreSBhdsOtemEgcGxhdGVibsOtIGthcnR5ICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEYXZrYUF2aXpvUG9sb3prYSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqxIzDrXNsbyBkw6F2a2EgKi9cclxuICAgICAgICBwdWJsaWMgZGF2a2E6IG51bWJlcjtcclxuICAgICAgICAvKipTdGF2IGTDoXZreSAqL1xyXG4gICAgICAgIHB1YmxpYyBzX3JvenA6IG51bWJlcjtcclxuICAgICAgICAvKiptw7NkICgxIC0gcG9kYW7DqSkqL1xyXG4gICAgICAgIHB1YmxpYyBtb2Q6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLyoqR3JpZCAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIFDFmcOtem5haywgemRhIGRvxaFsbyBrZSB6bcSbbsSbIHYgZGlhbG9ndSovXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjbG9zaW5nKCkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBjaGFuZ2VkOiB0aGlzLmNoYW5nZWQgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0Um96cGlzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzEwXCIsIC8vUkMgMzM2MDAzMTAgOiBSb3pwaXNcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnJvenBpcygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RG9obGVkYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMTFcIiwgLy9SQyAzMzYwMDMxMSA6IERvaGxlZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDMzN1wiLCAvL1JDIDMzNjAwMzM3IDogQXV0b21hdGlja8OpIGRvaGxlZMOhbsOtIHBsYXRieSBQT0sgcHJvIGRvc3VkIG5laWRlbnRpZmlrb3Zhbm91IHBvbG/Fvmt1IGF2w616YVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZG9obGVkYXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE96bmFjTmV6bmFtYToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMxMlwiLCAvL1JDIDMzNjAwMzEyIDogTmV6bsOhbcOhXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDMxNFwiLCAvL1JDIDMzNjAwMzE0IDogWm3Em25hIHN0YXZ1IHBvbG/Fvmt5IG5hIE5lem7DoW3DoSBwbGF0YmFcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnptZW5hU3RhdnVQb2xvemt5KDMwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE96bmFjTmVpZGVudGlmaWtvdmFuYToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMxM1wiLCAvL1JDIDMzNjAwMzEzIDogTmVpZGVudGlmaWtvdmFuw6FcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMzE1XCIsIC8vUkMgMzM2MDAzMTUgOiBabcSbbmEgc3RhdnUgcG9sb8W+a3kgbmEgTmVpZGVudGlmaWtvdmFuw6EgcGxhdGJhXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC56bWVuYVN0YXZ1UG9sb3preSgxMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gbWVudWJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFJvenBpcypcIiwgXCJhY3REb2hsZWRhdCpcIiwgXCJhY3RPem5hY05lem5hbWEqXCIsIFwiYWN0T3puYWNOZWlkZW50aWZpa292YW5hKlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RaYXZyaXRcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlZ5dHZvxZllbsOtIGdyaWR1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkRGF2a2FBdml6b1BvbG96a2FcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG8+KHRoaXMuaXNsLkJ1Y0RhdmthQXZpem9Qb2xvemthLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXZrYTogdGhpcy5kYXZrYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc19yb3pwOiB0aGlzLnNfcm96cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZDogdGhpcy5tb2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCJQZXJtaXNzaW9uc1wiXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1wibGljXCIsIFwiZGF2a2FcIiwgXCJyYWRla1wiLCBcInN1YnJhZGVrXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RSb3pwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJyYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQHNfaWRlID09IDEwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMzE2XCIgLy9SQyAzMzYwMDMxNiA6IFBvbG/FvmthIG5laWRlbnRpZmlrb3bDoW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQHNfaWRlID09IDMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDMxN1wiIC8vUkMgMzM2MDAzMTcgOiBQb2xvxb5rYSBuZXpuw6Ftw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc19pZGUgPT0gMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IENvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmVlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMzE4XCIgLy9SQyAzMzYwMDMxOCA6IFBvbG/FvmthIGV2aWRvdsOhbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG8+KCQoZXYudGFyZ2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Um96cGlzPy51cGRhdGVQZXJtaXNzaW9uKHJvdy5QZXJtaXNzaW9ucywgXCJMemVSb3pwaXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2QgIT0gMCB8fCB0aGlzLnNfcm96cCA9PSAzMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REb2hsZWRhdD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE96bmFjTmV6bmFtYT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE96bmFjTmVpZGVudGlmaWtvdmFuYT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REb2hsZWRhdD8udXBkYXRlUGVybWlzc2lvbihyb3cuUGVybWlzc2lvbnMsIFwiTHplRG9obGVkYXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE96bmFjTmV6bmFtYT8udXBkYXRlUGVybWlzc2lvbihyb3cuUGVybWlzc2lvbnMsIFwiTHplT3puYWNOZXpuYW1hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPem5hY05laWRlbnRpZmlrb3ZhbmE/LnVwZGF0ZVBlcm1pc3Npb24ocm93LlBlcm1pc3Npb25zLCBcIkx6ZU96bmFjTmVpZGVudGlmaWtvdmFuYVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RSb3pwaXM/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERvaGxlZGF0Py5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPem5hY05lem5hbWE/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE96bmFjTmVpZGVudGlmaWtvdmFuYT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIERlZmluaWNlIGdyaWRmb3Jtw6F0dSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBEYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0bz4ge1xyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0b05hbWVzLnNfaWRlX3prcixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMxOVwiLCAvL1JDIDMzNjAwMzE5IDogUyBcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAzMjBcIiwgLy9SQyAzMzYwMDMyMCA6IFN0YXYgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMixcclxuICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIGRhdGEuc19pZGVfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBkYXRhLnNfaWRlX3R4dCA/PyBcIlwiOyB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthRHRvTmFtZXMuY2lzX3N1bSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMyMVwiLCAvL1JDIDMzNjAwMzIxIDogU3VtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5wb3NfaWQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMjJcIiwgLy9SQyAzMzYwMDMyMiA6IFBva2xhZG5hXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5kYXRfdHJhLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzIzXCIsIC8vUkMgMzM2MDAzMjMgOiBEYXR1bSB0cmFuc2FrY2VcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5rYXJ0YV9pZCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMyNFwiLCAvL1JDIDMzNjAwMzI0IDogxIzDrXNsbyBrYXJ0eVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0b05hbWVzLmF1dF9rb2QsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMjVcIiwgLy9SQyAzMzYwMDMyNSA6IEF1dG9yLiBrw7NkXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0b05hbWVzLmNfdHJhLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzI2XCIsIC8vUkMgMzM2MDAzMjYgOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5jX3BvcCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMyN1wiLCAvL1JDIDMzNjAwMzI3IDogUG9wbGF0a3lcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthRHRvTmFtZXMuY196YXUsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMjhcIiwgLy9SQyAzMzYwMDMyOCA6IFVocmF6ZW5vXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVnMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFNzKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5zcyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRCYW5rb3ZuaVVjZXRWbGFzdG5pKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b0R0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdEYXZrYUF2aXpvRHRvTmFtZXMudWNldF92bCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5peHBfcG9rLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzI5XCIsIC8vUkMgMzM2MDAzMjkgOiBJZGVudGlmaWvDoXRvciBQT0tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5wb3puYW1rYSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDMzMVwiLCAvL1JDIDMzNjAwMzMxIDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjUwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG9OYW1lcy5yZWZfY2lzbG8sXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzMzJcIiwgLy9SQyAzMzYwMDMzMiA6IMSMw61zbG8gcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUF2aXpvUG9sb3prYUR0b05hbWVzLnNfaWRlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzMzXCIsIC8vUkMgMzM2MDAzMzMgOiBTdGF2IHBvbG/Fvmt5ICjEjcOtc2VsbsSbKVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlptxJtuYSBzdGF2dSBwb2xvxb5reSAqL1xyXG4gICAgICAgIHByaXZhdGUgem1lbmFTdGF2dVBvbG96a3koc3RhdjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gRWtvLkdyaWQuY3VycmVudFJvdzxJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthRHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0ZXh0RG90YXp1ID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKHN0YXYgPT0gMzApIHtcclxuICAgICAgICAgICAgICAgIHRleHREb3RhenUgPSBcImpyZXM6MzM2MDAzMzRcIjsgLy9SQyAzMzYwMDMzNCA6IE9wcmF2ZHUgY2hjZXRlIHptxJtuaXQgc3RhdiBwb2xvxb5reSBuYSBOZXpuw6Ftw6EgcGxhdGJhP1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGV4dERvdGF6dSA9IFwianJlczozMzYwMDMzNVwiOyAvL1JDIDMzNjAwMzM1IDogT3ByYXZkdSBjaGNldGUgem3Em25pdCBzdGF2IHBvbG/Fvmt5IG5hIE5laWRlbnRpZmlrb3ZhbsOhIHBsYXRiYT9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5jb25maXJtKHRleHREb3RhenUpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMgPT09IEdEbGcubWJiWWVzLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y0RhdmthQXZpem9Qb2xvemthLnptZW5hU3RhdnUoeyBkYXRhOiB7IGRhdmthOiByb3cuZGF2a2EsIHJhZGVrOiByb3cucmFkZWssIHN1YnJhZGVrOiByb3cuc3VicmFkZWssIHN0YXY6IHN0YXYgfSB9KS5nZXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKk90ZXbFmWVuw60gcm96cGlzdSBwb2xvxb5reSBhdsOtemEqL1xyXG4gICAgICAgIHByaXZhdGUgcm96cGlzKCkge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBFa28uR3JpZC5jdXJyZW50Um93PEludGVyZmFjZS5HRGF2a2FBdml6b1BvbG96a2FEdG8+KHRoaXMuJGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXJvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXHJcbiAgICAgICAgICAgICAgICBbXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HRGF2a2FBdml6b1BvbG96a2FSb3pwaXNcIiwgeyB1aWQ6IFwiR0RhdmthQXZpem9Qb2xvemthUm96cGlzI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdmthOiByb3cuZGF2a2EsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWs6IHJvdy5yYWRlayxcclxuICAgICAgICAgICAgICAgICAgICBtb2Q6IHRoaXMubW9kLFxyXG4gICAgICAgICAgICAgICAgfSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqQWtjZSBkb2hsZWTDoW7DrSovXHJcbiAgICAgICAgcHJpdmF0ZSBkb2hsZWRhdCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gRWtvLkdyaWQuY3VycmVudFJvdzxJbnRlcmZhY2UuR0RhdmthQXZpem9Qb2xvemthRHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNEYXZrYUF2aXpvUG9sb3prYS5kb2hsZWRhdFBsYXRieVR5cFBvY2V0KHsgZGF2a2E6IHJvdy5kYXZrYSEsIHJhZGVrOiByb3cucmFkZWshLCBzdWJyYWRlazogcm93LnN1YnJhZGVrISB9KS5nZXREYXRhKCkudGhlbigoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGN0eD8udHlwX2RvaCA/PyAwKSA+IDAgJiYgKGN0eD8ucG9jX2RvaCA/PyAwKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQXZpem9Qb2xvemthVWhyYWRhUE9LXCIsIHsgdWlkOiBcIkdEYXZrYUF2aXpvUG9sb3prYVVocmFkYVBPSyNcIiB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2FydGFfaWQ6IHJvdy5rYXJ0YV9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9kb2g6IGN0eC50eXBfZG9oLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zX2lkOiByb3cucG9zX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY190cmE6IHJvdy5jX3RyYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigodWhyYWRhUG9rKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodWhyYWRhUG9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92IFRLIGplIGplxaF0xJsgZG90YXosIGFsZSB0YWtobGUgZGFsZWtvIGJ5IG5lbcSbbCBiw710IHNuYWQgdcW+IHBvdMWZZWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9USyBkb3RhejogT3ByYXZkdSBjaGNldGUgdnlicmFub3UgcG9sb8W+a3UgYXbDrXphIGlkZW50aWZpa292YXQgcyBkb2hsZWRhbm91IHBva2xhZG7DrSBwbGF0Ym91ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjRGF2a2FBdml6b1BvbG96a2EuaWRlbnRpZmlrb3ZhdFBvbG96a3UoeyBkYXZrYTogcm93LmRhdmthISwgcmFkZWs6IHJvdy5yYWRlayEsIGl4cF9wb2s6IHVocmFkYVBvay5peHAsIHBvcl9jaXNsbzogdWhyYWRhUG9rLnBvcl9jaXNsbyB9KS5nZXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy53YXJuaW5nKFwianJlczozMzYwMDMzOFwiKS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoKSA9PiB7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9KTsgLy9SQyAzMzYwMDMzOCA6IMW9w6FkbsOhIG9kcG92w61kYWrDrWPDrSBwbGF0YmEgbmVuYWxlemVuYVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==