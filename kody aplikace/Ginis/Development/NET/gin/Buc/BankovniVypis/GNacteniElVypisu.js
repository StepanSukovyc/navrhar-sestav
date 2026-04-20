"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GVyberBanky.ts                         </Name>
//    <Description> Třída pro načtení elektronického bankovního výpisu          </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-05-15                                                  </Created>
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
            /**Třída pro načtení elektronického bankovního výpisu */
            let GNacteniElVypisu = class GNacteniElVypisu extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    Buc.Dialogs.GVyberBankyDlg({
                        parentContent: this,
                        opt: { mod: 1 },
                        ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow
                    }).then((vyberBankyDto) => {
                        if (!vyberBankyDto?.bankaDto) {
                            return this.dialogs.error("jres:33600786").createDialogPromise().then(() => { this.tryClose(); }); //RC 33600786 : Nevybrána/nenalezena banka pro načtení výpisů
                        }
                        if (vyberBankyDto.kod_ban_num == 106 && this.CNBWSEnabled) {
                            //WS ČNB
                            return this.isl.BucNacteniElVypisu.ziskejDatumVypisuProWSCNB({ sk_vl: vyberBankyDto.bankaDto?.sk_vl ?? "" }).get().then((preset_dat_vyp) => {
                                let form = new Gordic.Forms.Form()
                                    .addRow("jres:33600787", true) //RC 33600787 : Datum výpisu
                                    .addField("gdatebox", {
                                    name: "dat_vyp",
                                    initialValue: preset_dat_vyp
                                })
                                    .addRow("jres:33600788") //RC 33600788 : Dodatkový výpis
                                    .addField("gcheck", {
                                    name: "rez_vyp",
                                    modelValueTransform: {
                                        apply: function (modelValue) { return modelValue === 1; },
                                        collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                    }
                                });
                                return this.dialogs.simpleForm("jres:33600789", form, void 0, { height: 280, width: 300 }).createDialogPromise().then((formData) => {
                                    if (!formData) {
                                        return $.Deferred().reject().promise();
                                    }
                                    const reqDto = {
                                        ico: vyberBankyDto.bankaDto?.ico,
                                        ucs: vyberBankyDto.bankaDto?.ucs,
                                        ixs_esu: vyberBankyDto.bankaDto?.ixs_esu,
                                        sbu: vyberBankyDto.bankaDto?.sbu,
                                        mod: 1,
                                        for_dav: vyberBankyDto.for_dav,
                                        typ_tra_vyp: vyberBankyDto.typ_tra_vyp,
                                        dod_pri: vyberBankyDto.dod_pri,
                                        dat_vyp: formData.dat_vyp,
                                        rez_vyp: formData.rez_vyp,
                                        ikc: this.ikc
                                    };
                                    return this.asyncTasks.start("Gordic.Buc.Server.GNacteniElVypisuAsyncTask", {
                                        type: 2 /* Interface.GNacteniElVypisuAsyncType.WSCNB */,
                                        reqWSDto: reqDto
                                    })?.always(() => {
                                        this.tryClose();
                                    });
                                    //this.beginOperation("jres:33600790"); //RC 33600790 : Probíhá stažení výpisů pomocí WS a jejich nahrání
                                    //return this.isl.BucNacteniElVypisu.nacteniElVypisuWSCNB({
                                    //    data: {
                                    //        ico: vyberBankyDto.bankaDto?.ico,
                                    //        ucs: vyberBankyDto.bankaDto?.ucs,
                                    //        ixs_esu: vyberBankyDto.bankaDto?.ixs_esu,
                                    //        sbu: vyberBankyDto.bankaDto?.sbu,
                                    //        mod: 1,
                                    //        for_dav: vyberBankyDto.for_dav,
                                    //        typ_tra_vyp: vyberBankyDto.typ_tra_vyp,
                                    //        dod_pri: vyberBankyDto.dod_pri,
                                    //        dat_vyp: formData.dat_vyp,
                                    //        rez_vyp: formData.rez_vyp,
                                    //        ikc: this.ikc
                                    //    }
                                    //}).get().then((resDto) => {
                                    //    if ((resDto?.items ?? []).length > 0) {
                                    //        return this.dialogs.showModalWindow(Gordic.Buc.WebClient.GNacteniElVypisuResult, { data: resDto }, { height: 500, width: 1000 }).createDialogPromise()
                                    //            .then(() => { return this.tryClose(); });
                                    //    } else {
                                    //        return this.tryClose();
                                    //    }
                                    //}).always(() => { this.endOperation(); })
                                });
                            });
                        }
                        else if (vyberBankyDto.kod_ban_num != 124 && vyberBankyDto.kod_ban_num != 112) {
                            //Ostatní banky - soubory
                            return this.isl.BucNacteniElVypisu.povoleneSouboryDleKodBanNum({ kod_ban_num: vyberBankyDto.kod_ban_num ?? -1 }).get().then((povoleneSouboryDto) => {
                                const form = new Gordic.Forms.Form()
                                    .addRow("jres:33600791", true) //RC 33600791 : Soubory
                                    .addField("gfilefield", {
                                    name: "soubory",
                                    acceptExtension: povoleneSouboryDto.koncovka ?? "",
                                    validators: [
                                        new Gordic.Validators.Required(),
                                        new Gordic.Validators.Base({
                                            validateWithMessage: (value, src) => {
                                                if ((value?.length ?? 0) > 0 && povoleneSouboryDto.nazev) {
                                                    for (let fileInfo of value) {
                                                        if (!fileInfo.filename.startsWith(povoleneSouboryDto.nazev)) {
                                                            return "jres:33600792".format(povoleneSouboryDto.nazev ?? ""); //RC 33600792 : Soubor/y nezačínají povolenými znaky ({0})
                                                        }
                                                    }
                                                }
                                                return null;
                                            }
                                        })
                                    ],
                                });
                                const dialog = this.dialogs.simpleForm("jres:33600793u", form, void 0, { width: 350, height: 350 }); //RC 33600793 : Vyberte soubory pro načtení výpis
                                $.content(dialog).readyAwait.then(() => { dialog.findFields("soubory").gfilefield("addDropzone"); });
                                return dialog.createDialogPromise().then((ctx) => {
                                    if ((ctx?.soubory?.length ?? 0) > 0) {
                                        const guids = ctx?.soubory.map((val, idx, arr) => { return val.guid; });
                                        const reqDto = {
                                            ico: vyberBankyDto.bankaDto?.ico,
                                            ucs: vyberBankyDto.bankaDto?.ucs,
                                            ixs_esu: vyberBankyDto.bankaDto?.ixs_esu,
                                            sbu: vyberBankyDto.bankaDto?.sbu,
                                            mod: 1,
                                            for_dav: vyberBankyDto.for_dav,
                                            typ_tra_vyp: vyberBankyDto.typ_tra_vyp,
                                            dod_pri: vyberBankyDto.dod_pri,
                                            guids: guids,
                                            ikc: this.ikc
                                        };
                                        return this.asyncTasks.start("Gordic.Buc.Server.GNacteniElVypisuAsyncTask", {
                                            type: 0 /* Interface.GNacteniElVypisuAsyncType.File */,
                                            reqFileDto: reqDto
                                        });
                                        //this.beginOperation("Nahrání výpisu");
                                        //return this.isl.BucNacteniElVypisu.nacteniElVypisu({
                                        //    data: reqDto
                                        //}).get().then((resDto) => {
                                        //    if ((resDto?.items ?? []).length > 0) {
                                        //        return this.dialogs.showModalWindow(Gordic.Buc.WebClient.GNacteniElVypisuResult, { data: resDto }, { height: 500, width: 1000 }).createDialogPromise()
                                        //            .then(() => { return this.tryClose(); });
                                        //    } else {
                                        //        return this.tryClose();
                                        //    }
                                        //}).always(() => { this.endOperation(); })
                                    }
                                    else {
                                        return $.Deferred().reject().promise();
                                    }
                                }).always(() => { this.tryClose(); });
                            });
                        }
                        else if (vyberBankyDto.kod_ban_num == 124 || vyberBankyDto.kod_ban_num == 112) {
                            //API - PPF, ČS
                            const reqDto = {
                                ico: vyberBankyDto.bankaDto?.ico,
                                ucs: vyberBankyDto.bankaDto?.ucs,
                                ixs_esu: vyberBankyDto.bankaDto?.ixs_esu,
                                sbu: vyberBankyDto.bankaDto?.sbu,
                                mod: 1,
                                for_dav: vyberBankyDto.for_dav,
                                typ_tra_vyp: vyberBankyDto.typ_tra_vyp,
                                dod_pri: vyberBankyDto.dod_pri,
                                ikc: this.ikc
                            };
                            return this.asyncTasks.start("Gordic.Buc.Server.GNacteniElVypisuAsyncTask", {
                                type: 1 /* Interface.GNacteniElVypisuAsyncType.API */,
                                reqAPIDto: reqDto
                            })?.always(() => {
                                this.tryClose();
                            });
                            //this.beginOperation("Stažení výpisů pomocí API a nahrání");
                            //return this.isl.BucNacteniElVypisu.nacteniElVypisuAPI({
                            //    data: {
                            //        ico: vyberBankyDto.bankaDto?.ico,
                            //        ucs: vyberBankyDto.bankaDto?.ucs,
                            //        ixs_esu: vyberBankyDto.bankaDto?.ixs_esu,
                            //        sbu: vyberBankyDto.bankaDto?.sbu,
                            //        mod: 1,
                            //        for_dav: vyberBankyDto.for_dav,
                            //        typ_tra_vyp: vyberBankyDto.typ_tra_vyp,
                            //        dod_pri: vyberBankyDto.dod_pri,
                            //        ikc: this.ikc
                            //    }
                            //}).get().then((resDto) => {
                            //    if ((resDto?.items ?? []).length > 0) {
                            //        return this.dialogs.showModalWindow(Gordic.Buc.WebClient.GNacteniElVypisuResult, { data: resDto }, { height: 500, width: 1000 }).createDialogPromise()
                            //            .then(() => { return this.tryClose(); });
                            //    } else {
                            //        return this.tryClose();
                            //    }
                            //}).always(() => { this.endOperation(); })
                        }
                    }).fail(() => {
                        this.tryClose();
                    });
                }
                /** Vytvoření akcí */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tema: "buc_ptm_bvydalv",
                            ixsStr: that.buc_ptm_bvydalv,
                            enabled: true,
                            serverParameterMethod: "Gordic.Buc.WebClient.GNacteniElVypisu:PrintParameters",
                            reportStarting: function (rep) {
                                rep.customDto = { ikc: that.ikc };
                            },
                            reportFinished: () => {
                                that.tryClose();
                            },
                            reportCancelled: () => {
                                that.tryClose();
                            }
                        }),
                    });
                }
            };
            GNacteniElVypisu = __decorate([
                Decorators.gcontent
            ], GNacteniElVypisu);
            WebClient.GNacteniElVypisu = GNacteniElVypisu;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hY3RlbmlFbFZ5cGlzdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdOYWN0ZW5pRWxWeXBpc3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0F5TmY7QUF6TkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBeU5uQjtJQXpOZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBeU43QjtRQXpOb0IsV0FBQSxTQUFTO1lBQzFCLHdEQUF3RDtZQUV4RCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFROUMsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBRXJCLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO3dCQUN2QixhQUFhLEVBQUUsSUFBSTt3QkFDbkIsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTt3QkFDZixXQUFXLEVBQUUsT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlO3FCQUN4RCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7d0JBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLENBQUM7NEJBQzNCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyw2REFBNkQ7d0JBQ3BLLENBQUM7d0JBQ0QsSUFBSSxhQUFhLENBQUMsV0FBVyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7NEJBQ3hELFFBQVE7NEJBQ1IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHlCQUF5QixDQUFDLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7Z0NBQ3ZJLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7cUNBQzdCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMsNEJBQTRCO3FDQUMxRCxRQUFRLENBQUMsVUFBVSxFQUFFO29DQUNsQixJQUFJLEVBQUUsU0FBUztvQ0FDZixZQUFZLEVBQUUsY0FBYztpQ0FDL0IsQ0FBQztxQ0FDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsK0JBQStCO3FDQUN2RCxRQUFRLENBQUMsUUFBUSxFQUFFO29DQUNoQixJQUFJLEVBQUUsU0FBUztvQ0FDZixtQkFBbUIsRUFBRTt3Q0FDakIsS0FBSyxFQUFFLFVBQVUsVUFBVSxJQUFJLE9BQU8sVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQ3pELE9BQU8sRUFBRSxVQUFVLFVBQVUsSUFBSSxPQUFPLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQ0FDekU7aUNBQ0osQ0FBQyxDQUFDO2dDQUVQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQ0FDL0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUFDLENBQUM7b0NBQzFELE1BQU0sTUFBTSxHQUFHO3dDQUNYLEdBQUcsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUc7d0NBQ2hDLEdBQUcsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUc7d0NBQ2hDLE9BQU8sRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLE9BQU87d0NBQ3hDLEdBQUcsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUc7d0NBQ2hDLEdBQUcsRUFBRSxDQUFDO3dDQUNOLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTzt3Q0FDOUIsV0FBVyxFQUFFLGFBQWEsQ0FBQyxXQUFXO3dDQUN0QyxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87d0NBQzlCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTzt3Q0FDekIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO3dDQUN6QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7cUNBQ2hCLENBQUM7b0NBQ0YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBTSw2Q0FBNkMsRUFBRTt3Q0FDN0UsSUFBSSxtREFBMkM7d0NBQy9DLFFBQVEsRUFBRSxNQUFNO3FDQUNuQixDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTt3Q0FDWixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0NBQ3BCLENBQUMsQ0FBQyxDQUFDO29DQUNILHlHQUF5RztvQ0FDekcsMkRBQTJEO29DQUMzRCxhQUFhO29DQUNiLDJDQUEyQztvQ0FDM0MsMkNBQTJDO29DQUMzQyxtREFBbUQ7b0NBQ25ELDJDQUEyQztvQ0FDM0MsaUJBQWlCO29DQUNqQix5Q0FBeUM7b0NBQ3pDLGlEQUFpRDtvQ0FDakQseUNBQXlDO29DQUN6QyxvQ0FBb0M7b0NBQ3BDLG9DQUFvQztvQ0FDcEMsdUJBQXVCO29DQUN2QixPQUFPO29DQUNQLDZCQUE2QjtvQ0FDN0IsNkNBQTZDO29DQUM3QyxnS0FBZ0s7b0NBQ2hLLHVEQUF1RDtvQ0FDdkQsY0FBYztvQ0FDZCxpQ0FBaUM7b0NBQ2pDLE9BQU87b0NBQ1AsMkNBQTJDO2dDQUMvQyxDQUFDLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsQ0FBQTt3QkFDTixDQUFDOzZCQUFNLElBQUksYUFBYSxDQUFDLFdBQVcsSUFBSSxHQUFHLElBQUksYUFBYSxDQUFDLFdBQVcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs0QkFDOUUseUJBQXlCOzRCQUN6QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsMkJBQTJCLENBQUMsRUFBRSxXQUFXLEVBQUUsYUFBYSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtnQ0FDL0ksTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtxQ0FDL0IsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyx1QkFBdUI7cUNBQ3JELFFBQVEsQ0FBQyxZQUFZLEVBQUU7b0NBQ3BCLElBQUksRUFBRSxTQUFTO29DQUNmLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLElBQUksRUFBRTtvQ0FDbEQsVUFBVSxFQUFFO3dDQUNSLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7d0NBQ2hDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7NENBQ3ZCLG1CQUFtQixFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dEQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7b0RBQ3ZELEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFLENBQUM7d0RBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDOzREQUMxRCxPQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsMERBQTBEO3dEQUM3SCxDQUFDO29EQUNMLENBQUM7Z0RBQ0wsQ0FBQztnREFDRCxPQUFPLElBQUksQ0FBQzs0Q0FDaEIsQ0FBQzt5Q0FDSixDQUFDO3FDQUNMO2lDQUNKLENBQUMsQ0FBQTtnQ0FDTixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsaURBQWlEO2dDQUN0SixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDcEcsT0FBTyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUF3QixFQUFFLEVBQUU7b0NBQ2xFLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzt3Q0FDbEMsTUFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7d0NBQ3ZFLE1BQU0sTUFBTSxHQUFHOzRDQUNYLEdBQUcsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUc7NENBQ2hDLEdBQUcsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUc7NENBQ2hDLE9BQU8sRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLE9BQU87NENBQ3hDLEdBQUcsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUc7NENBQ2hDLEdBQUcsRUFBRSxDQUFDOzRDQUNOLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTzs0Q0FDOUIsV0FBVyxFQUFFLGFBQWEsQ0FBQyxXQUFXOzRDQUN0QyxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87NENBQzlCLEtBQUssRUFBRSxLQUFLOzRDQUNaLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzt5Q0FDaEIsQ0FBQzt3Q0FDRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFNLDZDQUE2QyxFQUFFOzRDQUM3RSxJQUFJLGtEQUEwQzs0Q0FDOUMsVUFBVSxFQUFFLE1BQU07eUNBQ3JCLENBQUMsQ0FBQzt3Q0FDSCx3Q0FBd0M7d0NBQ3hDLHNEQUFzRDt3Q0FDdEQsa0JBQWtCO3dDQUNsQiw2QkFBNkI7d0NBQzdCLDZDQUE2Qzt3Q0FDN0MsZ0tBQWdLO3dDQUNoSyx1REFBdUQ7d0NBQ3ZELGNBQWM7d0NBQ2QsaUNBQWlDO3dDQUNqQyxPQUFPO3dDQUNQLDJDQUEyQztvQ0FDL0MsQ0FBQzt5Q0FBTSxDQUFDO3dDQUNKLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUMzQyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUMsQ0FBQyxDQUFDLENBQUE7d0JBQ04sQ0FBQzs2QkFBTSxJQUFJLGFBQWEsQ0FBQyxXQUFXLElBQUksR0FBRyxJQUFJLGFBQWEsQ0FBQyxXQUFXLElBQUksR0FBRyxFQUFFLENBQUM7NEJBQzlFLGVBQWU7NEJBQ2YsTUFBTSxNQUFNLEdBQUc7Z0NBQ1gsR0FBRyxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRztnQ0FDaEMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRztnQ0FDaEMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTztnQ0FDeEMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRztnQ0FDaEMsR0FBRyxFQUFFLENBQUM7Z0NBQ04sT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO2dDQUM5QixXQUFXLEVBQUUsYUFBYSxDQUFDLFdBQVc7Z0NBQ3RDLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTztnQ0FDOUIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHOzZCQUNoQixDQUFDOzRCQUNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQU0sNkNBQTZDLEVBQUU7Z0NBQzdFLElBQUksaURBQXlDO2dDQUM3QyxTQUFTLEVBQUUsTUFBTTs2QkFDcEIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0NBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDLENBQUMsQ0FBQzs0QkFDSCw2REFBNkQ7NEJBQzdELHlEQUF5RDs0QkFDekQsYUFBYTs0QkFDYiwyQ0FBMkM7NEJBQzNDLDJDQUEyQzs0QkFDM0MsbURBQW1EOzRCQUNuRCwyQ0FBMkM7NEJBQzNDLGlCQUFpQjs0QkFDakIseUNBQXlDOzRCQUN6QyxpREFBaUQ7NEJBQ2pELHlDQUF5Qzs0QkFDekMsdUJBQXVCOzRCQUN2QixPQUFPOzRCQUNQLDZCQUE2Qjs0QkFDN0IsNkNBQTZDOzRCQUM3QyxnS0FBZ0s7NEJBQ2hLLHVEQUF1RDs0QkFDdkQsY0FBYzs0QkFDZCxpQ0FBaUM7NEJBQ2pDLE9BQU87NEJBQ1AsMkNBQTJDO3dCQUMvQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQTtnQkFDTixDQUFDO2dCQUVELHFCQUFxQjtnQkFDYixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDOzRCQUNsQyxJQUFJLEVBQUUsU0FBUzs0QkFDZixJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWU7NEJBQzVCLE9BQU8sRUFBRSxJQUFJOzRCQUNiLHFCQUFxQixFQUFFLHVEQUF1RDs0QkFDOUUsY0FBYyxFQUFFLFVBQVUsR0FBRztnQ0FDekIsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQ3RDLENBQUM7NEJBQ0QsY0FBYyxFQUFFLEdBQUcsRUFBRTtnQ0FDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDOzRCQUNELGVBQWUsRUFBRSxHQUFHLEVBQUU7Z0NBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEIsQ0FBQzt5QkFDSixDQUFDO3FCQUNMLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0osQ0FBQTtZQXJOWSxnQkFBZ0I7Z0JBRDVCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZ0JBQWdCLENBcU41QjtZQXJOWSwwQkFBZ0IsbUJBcU41QixDQUFBO1FBQ0wsQ0FBQyxFQXpOb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeU43QjtJQUFELENBQUMsRUF6TmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlObkI7QUFBRCxDQUFDLEVBek5TLE1BQU0sS0FBTixNQUFNLFFBeU5mIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdWeWJlckJhbmt5LnRzICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBUxZnDrWRhIHBybyBuYcSNdGVuw60gZWxla3Ryb25pY2vDqWhvIGJhbmtvdm7DrWhvIHbDvXBpc3UgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNS0xNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKipUxZnDrWRhIHBybyBuYcSNdGVuw60gZWxla3Ryb25pY2vDqWhvIGJhbmtvdm7DrWhvIHbDvXBpc3UgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR05hY3RlbmlFbFZ5cGlzdSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIEl4c1N0ciB0aXNrb3bDqWhvIHTDqW1hdHUqL1xyXG4gICAgICAgIHByaXZhdGUgYnVjX3B0bV9idnlkYWx2OiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIElrYyBwcm8gdGlza3kqL1xyXG4gICAgICAgIHByaXZhdGUgaWtjOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFDFmcOtem5haywgemRhIGplIHN0YWhvdsOhbsOtIHbDvXBpc8WvIHDFmWVzIFdTIHBvdm9sZW5vIHBybyDEjE5CIChrb2RfYmFuX251bSA9PSAxMDYpKi9cclxuICAgICAgICBwcml2YXRlIENOQldTRW5hYmxlZDogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBCdWMuRGlhbG9ncy5HVnliZXJCYW5reURsZyh7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgb3B0OiB7IG1vZDogMSB9LFxyXG4gICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3dcclxuICAgICAgICAgICAgfSkudGhlbigodnliZXJCYW5reUR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2eWJlckJhbmt5RHRvPy5iYW5rYUR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjMzNjAwNzg2XCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKCgpID0+IHsgdGhpcy50cnlDbG9zZSgpOyB9KTsgLy9SQyAzMzYwMDc4NiA6IE5ldnlicsOhbmEvbmVuYWxlemVuYSBiYW5rYSBwcm8gbmHEjXRlbsOtIHbDvXBpc8WvXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodnliZXJCYW5reUR0by5rb2RfYmFuX251bSA9PSAxMDYgJiYgdGhpcy5DTkJXU0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1dTIMSMTkJcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjTmFjdGVuaUVsVnlwaXN1Lnppc2tlakRhdHVtVnlwaXN1UHJvV1NDTkIoeyBza192bDogdnliZXJCYW5reUR0by5iYW5rYUR0bz8uc2tfdmwgPz8gXCJcIiB9KS5nZXQoKS50aGVuKChwcmVzZXRfZGF0X3Z5cCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDc4N1wiLCB0cnVlKSAvL1JDIDMzNjAwNzg3IDogRGF0dW0gdsO9cGlzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogcHJlc2V0X2RhdF92eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDc4OFwiKSAvL1JDIDMzNjAwNzg4IDogRG9kYXRrb3bDvSB2w71waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZXpfdnlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIG1vZGVsVmFsdWUgPT09IDE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiBmaWVsZFZhbHVlID09PSB0cnVlID8gMSA6IDA7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2ltcGxlRm9ybShcImpyZXM6MzM2MDA3ODlcIiwgZm9ybSwgdm9pZCAwLCB7IGhlaWdodDogMjgwLCB3aWR0aDogMzAwIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKChmb3JtRGF0YSkgPT4geyAvL1JDIDMzNjAwNzg5IDogRGF0dW0gdsO9cGlzdSBwcm8gc3Rhxb5lbsOtIFdTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZvcm1EYXRhKSB7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXFEdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB2eWJlckJhbmt5RHRvLmJhbmthRHRvPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB2eWJlckJhbmt5RHRvLmJhbmthRHRvPy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2VzdTogdnliZXJCYW5reUR0by5iYW5rYUR0bz8uaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYnU6IHZ5YmVyQmFua3lEdG8uYmFua2FEdG8/LnNidSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2Q6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yX2RhdjogdnliZXJCYW5reUR0by5mb3JfZGF2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF90cmFfdnlwOiB2eWJlckJhbmt5RHRvLnR5cF90cmFfdnlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvZF9wcmk6IHZ5YmVyQmFua3lEdG8uZG9kX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfdnlwOiBmb3JtRGF0YS5kYXRfdnlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlel92eXA6IGZvcm1EYXRhLnJlel92eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWtjOiB0aGlzLmlrY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFzeW5jVGFza3Muc3RhcnQ8YW55PihcIkdvcmRpYy5CdWMuU2VydmVyLkdOYWN0ZW5pRWxWeXBpc3VBc3luY1Rhc2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEludGVyZmFjZS5HTmFjdGVuaUVsVnlwaXN1QXN5bmNUeXBlLldTQ05CLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcVdTRHRvOiByZXFEdG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pPy5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmJlZ2luT3BlcmF0aW9uKFwianJlczozMzYwMDc5MFwiKTsgLy9SQyAzMzYwMDc5MCA6IFByb2LDrWjDoSBzdGHFvmVuw60gdsO9cGlzxa8gcG9tb2PDrSBXUyBhIGplamljaCBuYWhyw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuaXNsLkJ1Y05hY3RlbmlFbFZ5cGlzdS5uYWN0ZW5pRWxWeXBpc3VXU0NOQih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWNvOiB2eWJlckJhbmt5RHRvLmJhbmthRHRvPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdWNzOiB2eWJlckJhbmt5RHRvLmJhbmthRHRvPy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaXhzX2VzdTogdnliZXJCYW5reUR0by5iYW5rYUR0bz8uaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBzYnU6IHZ5YmVyQmFua3lEdG8uYmFua2FEdG8/LnNidSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtb2Q6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9yX2RhdjogdnliZXJCYW5reUR0by5mb3JfZGF2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHR5cF90cmFfdnlwOiB2eWJlckJhbmt5RHRvLnR5cF90cmFfdnlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGRvZF9wcmk6IHZ5YmVyQmFua3lEdG8uZG9kX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkYXRfdnlwOiBmb3JtRGF0YS5kYXRfdnlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJlel92eXA6IGZvcm1EYXRhLnJlel92eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWtjOiB0aGlzLmlrY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KS5nZXQoKS50aGVuKChyZXNEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICgocmVzRHRvPy5pdGVtcyA/PyBbXSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdOYWN0ZW5pRWxWeXBpc3VSZXN1bHQsIHsgZGF0YTogcmVzRHRvIH0sIHsgaGVpZ2h0OiA1MDAsIHdpZHRoOiAxMDAwIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLnRyeUNsb3NlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KS5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZ5YmVyQmFua3lEdG8ua29kX2Jhbl9udW0gIT0gMTI0ICYmIHZ5YmVyQmFua3lEdG8ua29kX2Jhbl9udW0gIT0gMTEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Pc3RhdG7DrSBiYW5reSAtIHNvdWJvcnlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjTmFjdGVuaUVsVnlwaXN1LnBvdm9sZW5lU291Ym9yeURsZUtvZEJhbk51bSh7IGtvZF9iYW5fbnVtOiB2eWJlckJhbmt5RHRvLmtvZF9iYW5fbnVtID8/IC0xIH0pLmdldCgpLnRoZW4oKHBvdm9sZW5lU291Ym9yeUR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNzkxXCIsIHRydWUpIC8vUkMgMzM2MDA3OTEgOiBTb3Vib3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZmlsZWZpZWxkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNvdWJvcnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHRFeHRlbnNpb246IHBvdm9sZW5lU291Ym9yeUR0by5rb25jb3ZrYSA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlV2l0aE1lc3NhZ2U6ICh2YWx1ZSwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh2YWx1ZT8ubGVuZ3RoID8/IDApID4gMCAmJiBwb3ZvbGVuZVNvdWJvcnlEdG8ubmF6ZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmlsZUluZm8gb2YgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsZUluZm8uZmlsZW5hbWUuc3RhcnRzV2l0aChwb3ZvbGVuZVNvdWJvcnlEdG8ubmF6ZXYpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzYwMDc5MlwiLmZvcm1hdChwb3ZvbGVuZVNvdWJvcnlEdG8ubmF6ZXYgPz8gXCJcIik7IC8vUkMgMzM2MDA3OTIgOiBTb3Vib3IveSBuZXphxI3DrW5hasOtIHBvdm9sZW7DvW1pIHpuYWt5ICh7MH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMuZGlhbG9ncy5zaW1wbGVGb3JtKFwianJlczozMzYwMDc5M3VcIiwgZm9ybSwgdm9pZCAwLCB7IHdpZHRoOiAzNTAsIGhlaWdodDogMzUwIH0pOyAvL1JDIDMzNjAwNzkzIDogVnliZXJ0ZSBzb3Vib3J5IHBybyBuYcSNdGVuw60gdsO9cGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudChkaWFsb2cpLnJlYWR5QXdhaXQudGhlbigoKSA9PiB7IGRpYWxvZy5maW5kRmllbGRzKFwic291Ym9yeVwiKS5nZmlsZWZpZWxkKFwiYWRkRHJvcHpvbmVcIik7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkaWFsb2cuY3JlYXRlRGlhbG9nUHJvbWlzZSgpLnRoZW4oKGN0eD86IHsgc291Ym9yeTogYW55W10gfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjdHg/LnNvdWJvcnk/Lmxlbmd0aCA/PyAwKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBndWlkcyA9IGN0eD8uc291Ym9yeS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHZhbC5ndWlkOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB2eWJlckJhbmt5RHRvLmJhbmthRHRvPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdnliZXJCYW5reUR0by5iYW5rYUR0bz8udWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZXN1OiB2eWJlckJhbmt5RHRvLmJhbmthRHRvPy5peHNfZXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYnU6IHZ5YmVyQmFua3lEdG8uYmFua2FEdG8/LnNidSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JfZGF2OiB2eWJlckJhbmt5RHRvLmZvcl9kYXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF90cmFfdnlwOiB2eWJlckJhbmt5RHRvLnR5cF90cmFfdnlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2RfcHJpOiB2eWJlckJhbmt5RHRvLmRvZF9wcmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRzOiBndWlkcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWtjOiB0aGlzLmlrY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXN5bmNUYXNrcy5zdGFydDxhbnk+KFwiR29yZGljLkJ1Yy5TZXJ2ZXIuR05hY3RlbmlFbFZ5cGlzdUFzeW5jVGFza1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEludGVyZmFjZS5HTmFjdGVuaUVsVnlwaXN1QXN5bmNUeXBlLkZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcUZpbGVEdG86IHJlcUR0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5iZWdpbk9wZXJhdGlvbihcIk5haHLDoW7DrSB2w71waXN1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuaXNsLkJ1Y05hY3RlbmlFbFZ5cGlzdS5uYWN0ZW5pRWxWeXBpc3Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGRhdGE6IHJlcUR0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSkuZ2V0KCkudGhlbigocmVzRHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKChyZXNEdG8/Lml0ZW1zID8/IFtdKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdOYWN0ZW5pRWxWeXBpc3VSZXN1bHQsIHsgZGF0YTogcmVzRHRvIH0sIHsgaGVpZ2h0OiA1MDAsIHdpZHRoOiAxMDAwIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy50cnlDbG9zZSgpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGlzLnRyeUNsb3NlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZ5YmVyQmFua3lEdG8ua29kX2Jhbl9udW0gPT0gMTI0IHx8IHZ5YmVyQmFua3lEdG8ua29kX2Jhbl9udW0gPT0gMTEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9BUEkgLSBQUEYsIMSMU1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB2eWJlckJhbmt5RHRvLmJhbmthRHRvPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdnliZXJCYW5reUR0by5iYW5rYUR0bz8udWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfZXN1OiB2eWJlckJhbmt5RHRvLmJhbmthRHRvPy5peHNfZXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYnU6IHZ5YmVyQmFua3lEdG8uYmFua2FEdG8/LnNidSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JfZGF2OiB2eWJlckJhbmt5RHRvLmZvcl9kYXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF90cmFfdnlwOiB2eWJlckJhbmt5RHRvLnR5cF90cmFfdnlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2RfcHJpOiB2eWJlckJhbmt5RHRvLmRvZF9wcmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogdGhpcy5pa2NcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFzeW5jVGFza3Muc3RhcnQ8YW55PihcIkdvcmRpYy5CdWMuU2VydmVyLkdOYWN0ZW5pRWxWeXBpc3VBc3luY1Rhc2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBJbnRlcmZhY2UuR05hY3RlbmlFbFZ5cGlzdUFzeW5jVHlwZS5BUEksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcUFQSUR0bzogcmVxRHRvXHJcbiAgICAgICAgICAgICAgICAgICAgfSk/LmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYmVnaW5PcGVyYXRpb24oXCJTdGHFvmVuw60gdsO9cGlzxa8gcG9tb2PDrSBBUEkgYSBuYWhyw6Fuw61cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5pc2wuQnVjTmFjdGVuaUVsVnlwaXN1Lm5hY3RlbmlFbFZ5cGlzdUFQSSh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpY286IHZ5YmVyQmFua3lEdG8uYmFua2FEdG8/LmljbyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdWNzOiB2eWJlckJhbmt5RHRvLmJhbmthRHRvPy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGl4c19lc3U6IHZ5YmVyQmFua3lEdG8uYmFua2FEdG8/Lml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHNidTogdnliZXJCYW5reUR0by5iYW5rYUR0bz8uc2J1LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtb2Q6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGZvcl9kYXY6IHZ5YmVyQmFua3lEdG8uZm9yX2RhdixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdHlwX3RyYV92eXA6IHZ5YmVyQmFua3lEdG8udHlwX3RyYV92eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGRvZF9wcmk6IHZ5YmVyQmFua3lEdG8uZG9kX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWtjOiB0aGlzLmlrY1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pLmdldCgpLnRoZW4oKHJlc0R0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICgocmVzRHRvPy5pdGVtcyA/PyBbXSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuQnVjLldlYkNsaWVudC5HTmFjdGVuaUVsVnlwaXN1UmVzdWx0LCB7IGRhdGE6IHJlc0R0byB9LCB7IGhlaWdodDogNTAwLCB3aWR0aDogMTAwMCB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMudHJ5Q2xvc2UoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KS5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpOyB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VGlzazogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVGlzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJidWNfcHRtX2J2eWRhbHZcIixcclxuICAgICAgICAgICAgICAgICAgICBpeHNTdHI6IHRoYXQuYnVjX3B0bV9idnlkYWx2LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdOYWN0ZW5pRWxWeXBpc3U6UHJpbnRQYXJhbWV0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgaWtjOiB0aGF0LmlrYyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0RmluaXNoZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0Q2FuY2VsbGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19