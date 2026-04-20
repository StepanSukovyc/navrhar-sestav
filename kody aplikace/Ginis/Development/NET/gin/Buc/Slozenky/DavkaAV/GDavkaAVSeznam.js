"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GDavkaAVSeznam.ts                      </Name>
//    <Description> Dialog se seznamem složenek dávek A-V                       </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-13                                                  </Created>
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
            /**Dialog se seznamem složenek dávek A-V */
            let GDavkaAVSeznam = class GDavkaAVSeznam extends Gordic.GContentBase {
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
                        actNacist: {
                            caption: "jres:33600794", //RC 33600794 : Načíst
                            icon: "gi-send",
                            permission: that.Permissions.LzeNacist,
                            run: function (ev, ctx) {
                                this.setPending(that.nacist());
                            }
                        },
                        actObsah: {
                            caption: "jres:33600244", //RC 33600244 : Obsah
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                let data = that.$grid.ggrid("getSelection");
                                if (data.length == 1) {
                                    this.setPending(that.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaAVObsah", { uid: "GDavkaAVObsah#" }], {
                                        davka: data[0].davka,
                                        mod: 0,
                                    }, { /*width: 580, height: 450*/}).createDialogPromise());
                                }
                            }
                        },
                        actSeznamObsahu: {
                            caption: "jres:33600263", //RC 33600263 : Seznam obsahů
                            icon: "gi-list",
                            run: function (ev, ctx) {
                                this.setPending(that.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaAVObsah", { uid: "GDavkaAVObsah#" }], {
                                    mod: 1,
                                }, { /*width: 580, height: 450*/}).createDialogPromise());
                            }
                        },
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            enabled: true,
                            tema: "buc_ptm_davav",
                            ixsStr: this.buc_ptm_davav,
                            serverParameterMethod: "Gordic.Buc.WebClient.GDavkaAVSeznam:PrintParameters",
                            dialogOpening: function (rep) {
                                let rows = that.$grid.ggrid("getSelection");
                                return rows && rows.length == 1;
                            },
                            reportStarting: function (rep) {
                                const row = that.$grid.ggrid("getSelection")[0];
                                let where = " WHERE davka = {0} AND sk_vl = {1} AND bu_vl = {2}".format(row.davka, row.sk_vl, row.bu_vl);
                                rep.customDto = { where: where };
                            }
                        }),
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: this.mod == 1,
                            visible: this.mod == 1,
                            run: (ev, ctx) => {
                                let row = Gordic.Eko.Grid.currentRow(this.$grid);
                                this.tryClose(row?.davka);
                            }
                        }),
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
                    this.menuBar(this.actions.createBar(["actNacist*", "actObsah*", "actTisk*", "actSeznamObsahu*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridDavkaAVSeznam",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucDavkaAV.list({
                            filters: (this.mod != 0) ? {
                                sk_vl: this.sk_vl,
                                bu_vl: this.bu_vl,
                                vs: this.vs,
                                c: this.c_pre,
                                s_dav: 10
                            } : void 0
                        }), {
                            key: ["davka", "sk_vl", "bu_vl"]
                        }),
                        defaultAction: this.actions.actOk,
                        defaultProfile: {
                            sort: "!dat_pre",
                            condFormats: [
                                {
                                    formula: "@s_dav == 30",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue,
                                    description: "jres:33600245" //RC 33600245 : Dávka zpracována
                                }
                            ]
                        }
                    }).gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    let columns = new Gordic.Data.GridFormat();
                    columns.addTextColumn({
                        name: "ozn_dav" /* Interface.GDavkaAVDtoNames.ozn_dav */,
                        caption: "jres:33600246", //RC 33600246 : Dávka
                        width: 150
                    });
                    columns.addDateColumn({
                        name: "dat_pre" /* Interface.GDavkaAVDtoNames.dat_pre */,
                        caption: "jres:33600247", //RC 33600247 : Datum převodu
                        width: 110
                    });
                    columns.addKs({
                        name: "ks" /* Interface.GDavkaAVDtoNames.ks */,
                    });
                    columns.addVs({
                        name: "vs" /* Interface.GDavkaAVDtoNames.vs */,
                    });
                    columns.addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GDavkaAVDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GDavkaAVDtoNames.ucet_vl */,
                    });
                    columns.addNumberColumn({
                        name: "poc_pla" /* Interface.GDavkaAVDtoNames.poc_pla */,
                        caption: "jres:33600248", //RC 33600248 : Počet
                        width: 55
                    });
                    columns.addCurrencyColumn({
                        name: "c" /* Interface.GDavkaAVDtoNames.c */,
                        caption: "jres:33600249", //RC 33600249 : Částka
                        width: 120
                    });
                    columns.addCurrencyColumn({
                        name: "c_saz" /* Interface.GDavkaAVDtoNames.c_saz */,
                        caption: "jres:33600250", //RC 33600250 : Sazby
                        width: 120
                    });
                    columns.addNumberColumn({
                        name: "zi_saz" /* Interface.GDavkaAVDtoNames.zi_saz */,
                        caption: "jres:33600251", //RC 33600251 : ZIS
                        width: 40
                    });
                    columns.addNumberColumn({
                        name: "davka" /* Interface.GDavkaAVDtoNames.davka */,
                        caption: "jres:33600252", //RC 33600252 : Číslo dávky
                        width: 90
                    });
                    columns.addNumberColumn({
                        name: "s_dav" /* Interface.GDavkaAVDtoNames.s_dav */,
                        caption: "jres:33600253", //RC 33600253 : Stav dávky (číselně)
                        hidden: true
                    });
                    return columns;
                }
                /** Načtení dávky složenek A-V */
                nacist() {
                    const form = new Gordic.Forms.Form()
                        .addRow("jres:33600795", true) //RC 33600795 : Soubor
                        .addField("gfilefield", {
                        name: "soubor",
                        maxFileCount: 1,
                        validators: [
                            new Gordic.Validators.Required(),
                            new Gordic.Validators.Base({
                                validateWithMessage: (value, src) => {
                                    if ((value?.length ?? 0) == 1) {
                                        if (!value[0].filename.startsWith("S")) {
                                            return "jres:33600796".format("S*.*"); //RC 33600796 : Soubor nezačíná povolenými znaky ({0})
                                        }
                                        let subs = value[0].filename.substring(1, 1);
                                        if (subs == "C" || subs == "K") {
                                            return "jres:33600797"; //RC 33600797 : Nelze načíst soubor v kódovaném nebo komprimovaném tvaru
                                        }
                                    }
                                    return null;
                                }
                            })
                        ],
                    });
                    const dialog = this.dialogs.simpleForm("jres:33600798", form, void 0, { width: 350, height: 350 }); //RC 33600798 : Vyberte soubor složenek A-V
                    $.content(dialog).readyAwait.then(() => { dialog.findFields("soubor").gfilefield("addDropzone"); });
                    return dialog.createDialogPromise().then((ctx) => {
                        if ((ctx?.soubor?.length ?? 0) == 1) {
                            const guid = ctx?.soubor[0].guid;
                            const reqDto = {
                                guid: guid,
                            };
                            return this.isl.BucDavkaAV.nacti({
                                data: reqDto
                            }).use(this.repeatOnException((excInfo) => {
                                if (excInfo?.data?.clientMessageBoxProperty && excInfo?.data?.clientMessageBoxText) {
                                    // vyžádání potvrzení od uživatele
                                    excInfo.handled = true;
                                    return this.dialogs.confirm(excInfo.data.clientMessageBoxText, 600)
                                        .createDialogPromise(GDlg.mbbYes.id)
                                        .then(() => { let returnProp = {}; returnProp[excInfo.data.clientMessageBoxProperty] = true; return returnProp; });
                                }
                                // dialog není potřeba, pokračuje se dál
                                return $.Deferred().reject(excInfo).promise();
                            }))
                                .get().then((resDto) => {
                                if (resDto) {
                                    return this.dialogs.alert("jres:33600799".format(resDto.data.poc_pol ?? 0, (resDto.data.c_sum ?? 0).toString())).createDialogPromise().then(() => {
                                        this.$grid.ggrid("getView").requestData();
                                        return $.Deferred().resolve().promise();
                                    });
                                }
                            });
                        }
                        else {
                            return $.Deferred().reject().promise();
                        }
                    });
                }
                /**
                 * Zopakování volání ISL metody při chybě, pokud má být speciálně ošetřena
                 *
                 * @param {any} conditionalRequestModification
                 * @returns {any}
                 */
                repeatOnException(conditionalRequestModification) {
                    let recursiveCall = function (request, next, ctx) {
                        return next(request).catch((excInfo) => conditionalRequestModification(excInfo).then((changereq) => (changereq ? recursiveCall($.deepExtendWoArray({}, request, changereq), next, ctx) : $.Deferred().reject(excInfo)), () => $.Deferred().reject(excInfo).promise()));
                    };
                    return recursiveCall;
                }
            };
            GDavkaAVSeznam = __decorate([
                Decorators.gcontent
            ], GDavkaAVSeznam);
            WebClient.GDavkaAVSeznam = GDavkaAVSeznam;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdmthQVZTZXpuYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGF2a2FBVlNlem5hbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQXNSZjtBQXRSRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzUm5CO0lBdFJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzUjdCO1FBdFJvQixXQUFBLFNBQVM7WUFDMUIsMkNBQTJDO1lBRTNDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBb0I1QyxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxJQUFJLEVBQUUsU0FBUzs0QkFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTOzRCQUN0QyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzs0QkFDbkMsQ0FBQzt5QkFDSjt3QkFDRCxRQUFRLEVBQUU7NEJBQ04sT0FBTyxFQUFFLGVBQWUsRUFBRSxx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QUFpQixDQUFDLDhCQUFtQztvQkFDekQsSUFBSSxhQUFhLEdBQUcsVUFBVSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUc7d0JBQzVDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ25DLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDeEMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUUsQ0FBUyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQzFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FDcEQsQ0FBQztvQkFDTixDQUFDLENBQUE7b0JBQ0QsT0FBTyxhQUFhLENBQUM7Z0JBQ3pCLENBQUM7YUFDSixDQUFBO1lBbFJZLGNBQWM7Z0JBRDFCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsY0FBYyxDQWtSMUI7WUFsUlksd0JBQWMsaUJBa1IxQixDQUFBO1FBQ0wsQ0FBQyxFQXRSb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBc1I3QjtJQUFELENBQUMsRUF0UmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXNSbkI7QUFBRCxDQUFDLEVBdFJTLE1BQU0sS0FBTixNQUFNLFFBc1JmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUFWU2V6bmFtLnRzICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBEaWFsb2cgc2Ugc2V6bmFtZW0gc2xvxb5lbmVrIGTDoXZlayBBLVYgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDMtMTMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqRGlhbG9nIHNlIHNlem5hbWVtIHNsb8W+ZW5layBkw6F2ZWsgQS1WICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEYXZrYUFWU2V6bmFtIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogc23Em3JvdsO9IGvDs2QgYmFua3kgdmxhc3Ruw60qL1xyXG4gICAgICAgIHB1YmxpYyBza192bDogc3RyaW5nO1xyXG4gICAgICAgIC8qKmLEm8W+bsO9IMO6xI1ldCB2bGFzdG7DrSovXHJcbiAgICAgICAgcHVibGljIGJ1X3ZsOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqxI3DoXN0a2EgcMWZZXZvZHUqL1xyXG4gICAgICAgIHB1YmxpYyBjX3ByZTogRGVjaW1hbCB8IEpzb25EZWNpbWFsO1xyXG4gICAgICAgIC8qKm3Ds2QgKDEgLSBwb2RhbsOpKSovXHJcbiAgICAgICAgcHVibGljIG1vZDogbnVtYmVyO1xyXG4gICAgICAgIC8qKnZhcmlhYmlsbsOtIHN5bWJvbCovXHJcbiAgICAgICAgcHVibGljIHZzOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKiBTZXJ2aWNlIFBlcm1pc3Npb25zICovXHJcbiAgICAgICAgcHJpdmF0ZSBQZXJtaXNzaW9uczogSW50ZXJmYWNlLkdEYXZrYUFWU2VydmljZVBlcm1pc3Npb25zO1xyXG4gICAgICAgIC8qKkJVQyAtIFRUIETDoXZrYSBBLVYgc2xvxb5lbmVrIHDFmWVkYW7DoSBwb8WhdG91IChHUikgKi9cclxuICAgICAgICBwcml2YXRlIGJ1Y19wdG1fZGF2YXY6IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqR3JpZCAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0TmFjaXN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzk0XCIsIC8vUkMgMzM2MDA3OTQgOiBOYcSNw61zdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2VuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoYXQuUGVybWlzc2lvbnMuTHplTmFjaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQubmFjaXN0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPYnNhaDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI0NFwiLCAvL1JDIDMzNjAwMjQ0IDogT2JzYWhcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQVZPYnNhaFwiLCB7IHVpZDogXCJHRGF2a2FBVk9ic2FoI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF2a2E6IGRhdGFbMF0uZGF2a2EsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7IC8qd2lkdGg6IDU4MCwgaGVpZ2h0OiA0NTAqLyB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFNlem5hbU9ic2FodToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI2M1wiLCAvL1JDIDMzNjAwMjYzIDogU2V6bmFtIG9ic2Foxa9cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthQVZPYnNhaFwiLCB7IHVpZDogXCJHRGF2a2FBVk9ic2FoI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHsgLyp3aWR0aDogNTgwLCBoZWlnaHQ6IDQ1MCovIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJidWNfcHRtX2RhdmF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzU3RyOiB0aGlzLmJ1Y19wdG1fZGF2YXYsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUFWU2V6bmFtOlByaW50UGFyYW1ldGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ09wZW5pbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvd3MgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93cyAmJiByb3dzLmxlbmd0aCA9PSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdoZXJlID0gXCIgV0hFUkUgZGF2a2EgPSB7MH0gQU5EIHNrX3ZsID0gezF9IEFORCBidV92bCA9IHsyfVwiLmZvcm1hdChyb3cuZGF2a2EsIHJvdy5za192bCwgcm93LmJ1X3ZsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgd2hlcmU6IHdoZXJlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RPazogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMubW9kID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhpcy5tb2QgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxJbnRlcmZhY2UuR0RhdmthQVZEdG8+KHRoaXMuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKHJvdz8uZGF2a2EpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROYWNpc3QqXCIsIFwiYWN0T2JzYWgqXCIsIFwiYWN0VGlzaypcIiwgXCJhY3RTZXpuYW1PYnNhaHUqXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE9rIVwiLCBcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqVnl0dm/FmWVuw60gZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEludGVyZmFjZS5HRGF2a2FBVkR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZERhdmthQVZTZXpuYW1cIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HRGF2a2FBVkR0bz4odGhpcy5pc2wuQnVjRGF2a2FBVi5saXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogKHRoaXMubW9kICE9IDApID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tfdmw6IHRoaXMuc2tfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidV92bDogdGhpcy5idV92bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzOiB0aGlzLnZzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogdGhpcy5jX3ByZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNfZGF2OiAxMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gOiB2b2lkIDB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcImRhdmthXCIsIFwic2tfdmxcIiwgXCJidV92bFwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RPayxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIiFkYXRfcHJlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc19kYXYgPT0gMzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBDb21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMjQ1XCIgLy9SQyAzMzYwMDI0NSA6IETDoXZrYSB6cHJhY292w6FuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRGF2a2FBVkR0bz4ge1xyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRGF2a2FBVkR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQVZEdG9OYW1lcy5vem5fZGF2LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjQ2XCIsIC8vUkMgMzM2MDAyNDYgOiBEw6F2a2FcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBVkR0b05hbWVzLmRhdF9wcmUsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNDdcIiwgLy9SQyAzMzYwMDI0NyA6IERhdHVtIHDFmWV2b2R1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkS3Moe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWRHRvTmFtZXMua3MsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVnMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWRHRvTmFtZXMudnMsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQmFua292bmlVY2V0Vmxhc3RuaSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQVZEdG9OYW1lcy51Y2V0X3ZsLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HRGF2a2FBVkR0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRGF2a2FBVkR0b05hbWVzLnBvY19wbGEsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyNDhcIiwgLy9SQyAzMzYwMDI0OCA6IFBvxI1ldFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDU1XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWRHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI0OVwiLCAvL1JDIDMzNjAwMjQ5IDogxIzDoXN0a2FcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQVZEdG9OYW1lcy5jX3NheixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI1MFwiLCAvL1JDIDMzNjAwMjUwIDogU2F6YnlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEYXZrYUFWRHRvTmFtZXMuemlfc2F6LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjUxXCIsIC8vUkMgMzM2MDAyNTEgOiBaSVNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQVZEdG9OYW1lcy5kYXZrYSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI1MlwiLCAvL1JDIDMzNjAwMjUyIDogxIzDrXNsbyBkw6F2a3lcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0RhdmthQVZEdG9OYW1lcy5zX2RhdixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDI1M1wiLCAvL1JDIDMzNjAwMjUzIDogU3RhdiBkw6F2a3kgKMSNw61zZWxuxJspXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE5hxI10ZW7DrSBkw6F2a3kgc2xvxb5lbmVrIEEtViAqL1xyXG4gICAgICAgIHByaXZhdGUgbmFjaXN0KCkge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNzk1XCIsIHRydWUpIC8vUkMgMzM2MDA3OTUgOiBTb3Vib3JcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdmaWxlZmllbGRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic291Ym9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RmlsZUNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlV2l0aE1lc3NhZ2U6ICh2YWx1ZSwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh2YWx1ZT8ubGVuZ3RoID8/IDApID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZVswXS5maWxlbmFtZS5zdGFydHNXaXRoKFwiU1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzYwMDc5NlwiLmZvcm1hdChcIlMqLipcIik7IC8vUkMgMzM2MDA3OTYgOiBTb3Vib3IgbmV6YcSNw61uw6EgcG92b2xlbsO9bWkgem5ha3kgKHswfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VicyA9IHZhbHVlWzBdLmZpbGVuYW1lLnN1YnN0cmluZygxLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnMgPT0gXCJDXCIgfHwgc3VicyA9PSBcIktcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzYwMDc5N1wiOyAvL1JDIDMzNjAwNzk3IDogTmVsemUgbmHEjcOtc3Qgc291Ym9yIHYga8OzZG92YW7DqW0gbmVibyBrb21wcmltb3ZhbsOpbSB0dmFydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zdCBkaWFsb2cgPSB0aGlzLmRpYWxvZ3Muc2ltcGxlRm9ybShcImpyZXM6MzM2MDA3OThcIiwgZm9ybSwgdm9pZCAwLCB7IHdpZHRoOiAzNTAsIGhlaWdodDogMzUwIH0pOyAvL1JDIDMzNjAwNzk4IDogVnliZXJ0ZSBzb3Vib3Igc2xvxb5lbmVrIEEtVlxyXG4gICAgICAgICAgICAkLmNvbnRlbnQoZGlhbG9nKS5yZWFkeUF3YWl0LnRoZW4oKCkgPT4geyBkaWFsb2cuZmluZEZpZWxkcyhcInNvdWJvclwiKS5nZmlsZWZpZWxkKFwiYWRkRHJvcHpvbmVcIik7IH0pXHJcbiAgICAgICAgICAgIHJldHVybiBkaWFsb2cuY3JlYXRlRGlhbG9nUHJvbWlzZSgpLnRoZW4oKGN0eD86IHsgc291Ym9yOiBhbnlbXSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGN0eD8uc291Ym9yPy5sZW5ndGggPz8gMCkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGd1aWQgPSBjdHg/LnNvdWJvclswXS5ndWlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3VpZDogZ3VpZCxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNEYXZrYUFWLm5hY3RpKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVxRHRvXHJcbiAgICAgICAgICAgICAgICAgICAgfSkudXNlKHRoaXMucmVwZWF0T25FeGNlcHRpb24oKGV4Y0luZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4Y0luZm8/LmRhdGE/LmNsaWVudE1lc3NhZ2VCb3hQcm9wZXJ0eSAmJiBleGNJbmZvPy5kYXRhPy5jbGllbnRNZXNzYWdlQm94VGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnnFvsOhZMOhbsOtIHBvdHZyemVuw60gb2QgdcW+aXZhdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjSW5mby5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuY29uZmlybShleGNJbmZvLmRhdGEuY2xpZW50TWVzc2FnZUJveFRleHQsIDYwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7IGxldCByZXR1cm5Qcm9wID0ge307IHJldHVyblByb3BbZXhjSW5mby5kYXRhLmNsaWVudE1lc3NhZ2VCb3hQcm9wZXJ0eV0gPSB0cnVlOyByZXR1cm4gcmV0dXJuUHJvcDsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlhbG9nIG5lbsOtIHBvdMWZZWJhLCBwb2tyYcSNdWplIHNlIGTDoWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZXhjSW5mbykucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzRHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5hbGVydChcImpyZXM6MzM2MDA3OTlcIi5mb3JtYXQocmVzRHRvLmRhdGEucG9jX3BvbCA/PyAwLCAocmVzRHRvLmRhdGEuY19zdW0gPz8gMCkudG9TdHJpbmcoKSkpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKCgpID0+IHsgLy9SQyAzMzYwMDc5OSA6IETDoXZrYSBzbG/FvmVuZWsgQS1WIGJ5bGEgw7pzcMSbxaFuxJsgbmHEjXRlbmEuO1BvxI1ldCBwb2xvxb5lazogezB9O8SMw6FzdGthOiB7MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvcGFrb3bDoW7DrSB2b2zDoW7DrSBJU0wgbWV0b2R5IHDFmWkgY2h5YsSbLCBwb2t1ZCBtw6EgYsO9dCBzcGVjacOhbG7EmyBvxaFldMWZZW5hXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IGNvbmRpdGlvbmFsUmVxdWVzdE1vZGlmaWNhdGlvblxyXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZXBlYXRPbkV4Y2VwdGlvbihjb25kaXRpb25hbFJlcXVlc3RNb2RpZmljYXRpb246IGFueSk6IGFueSB7XHJcbiAgICAgICAgICAgIGxldCByZWN1cnNpdmVDYWxsID0gZnVuY3Rpb24gKHJlcXVlc3QsIG5leHQsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQocmVxdWVzdCkuY2F0Y2goKGV4Y0luZm8pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxSZXF1ZXN0TW9kaWZpY2F0aW9uKGV4Y0luZm8pLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2VyZXEpID0+IChjaGFuZ2VyZXEgPyByZWN1cnNpdmVDYWxsKCgkIGFzIGFueSkuZGVlcEV4dGVuZFdvQXJyYXkoe30sIHJlcXVlc3QsIGNoYW5nZXJlcSksIG5leHQsIGN0eCkgOiAkLkRlZmVycmVkKCkucmVqZWN0KGV4Y0luZm8pKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gJC5EZWZlcnJlZCgpLnJlamVjdChleGNJbmZvKS5wcm9taXNlKCkpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZWN1cnNpdmVDYWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==