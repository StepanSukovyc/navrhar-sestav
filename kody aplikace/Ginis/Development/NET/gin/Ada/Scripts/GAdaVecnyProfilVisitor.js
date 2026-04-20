"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdaVecnyProfilVisitor.ts              </Name>
//    <Description> Visitor komponenty Věcného profilu                          </Description>
//    <Author>      jilecek                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-10-17                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            /** Visitor komponenty Věcného profilu (Umožňuje rozšířit společný základ) */
            class GAdaVecnyProfilVisitor {
                constructor(opts) {
                    this.dao = opts.dao;
                }
                visit(content) {
                    //console.log("visit from Ada");
                    this.cntSeznam = content;
                    content.setDao(this.dao);
                    content.vpEvents.on("selection", (ctx) => {
                        //console.log("selection z Ada");
                        //this.updateActions(ctx);
                    });
                    //prvotní načtení seznamu před vytvoření prvků contentu
                    content.vpEvents.on("prepareseznam", (ctx) => {
                        ctx.promise = ctx.promise.then(() => {
                            return content.createServiceContent("Gordic.Ada.WebClient.GAdaVecnyProfilServiceContent").call("LoadData", { akce_p: null, cislo: "" }).then((data) => {
                                $.extend(this, data);
                            });
                        });
                    });
                    content.vpEvents.on("loadseznam", (ctx) => {
                        this.getView().then((view) => { return content.setView(view); });
                    });
                    content.vpEvents.on("enhancegridformat", (ctx) => {
                        //ctx.gridFormat.add(this.getGridFormat());
                    });
                    //rozšíření/úprava formuláře při vytváření
                    content.vpEvents.on("enhanceform", (ctx) => {
                        this.enhanceForm(ctx.formDiv, ctx.formDefinition, ctx.dto);
                    });
                    //rozšíření/úprava sesbíraných dat formuláře - do Islu se poté posílá ctx.formData
                    content.vpEvents.on("enhacecollecteddata", (ctx) => {
                        ctx.formData = this.modifyDataBeforeSave(ctx.form, ctx.dto, ctx.formData);
                    });
                    content.vpEvents.on("enhancedefaulfprofile", (ctx) => {
                        //ctx.defaultProfile.condFormats?.push({
                        //    //384.7 04.03.20 pokud byla položka vp zpracována v MAJ, obarví se do modra i v případě blokace objednávkou se barví do modra
                        //    formula: "IF((@m_maj != 0 and ABS(@m_maj) <= ABS(@m_Ada)) or (@m_obj_Ada != 0), true, false)",
                        //    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                        //});
                        //ctx.defaultProfile.columnList = "znam,ixs_dup_txt,vp_stav_txt,kod_pol,nazev,skp,mat_cis,inv_cis,evi_cis,vyr_cis,ser_cis,sarze,mj,mena_zkr,m_Ada,m_obj_Ada,m_maj,c_Ada_mena_z," +
                        //"c_Ada_mena_dph,c_c_Ada_mena_dph,c_Ada,c_obj_Ada,c_maj,c_Ada_dph,c_c_Ada_dph,popis,ixp_smo,cis_smo,ixs_poz,ucs,nks,nks_zad,vp_stav";
                    });
                    content.vpEvents.on("loaddetail", (ctx) => {
                        //console.log("loaddetail - Ada");
                        //console.log(ctx);
                        this.cntDetail = ctx.content;
                        this.updateDetailActions(ctx.dto);
                        this.cntDetail.setStatusBarStav(ctx.dto.vp_stav_nazev ?? "Neurčeno");
                    });
                }
                getGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({
                        width: 40,
                        name: "znam",
                        caption: "P/V", //RC 33600056 : P/V
                        cellTemplate: (row, meta) => {
                            if (meta?._isVirtual) {
                                return "";
                            }
                            switch (row.znam) {
                                case 1:
                                    return "+";
                                case -1:
                                    return "-";
                                default:
                                    return "";
                            }
                        }
                    }).addTextColumn({
                        width: 130,
                        name: "evi_cis",
                        caption: "Evidenční číslo" //RC 33600047 : Evidenční číslo
                    }).addTextColumn({
                        width: 130,
                        name: "vyr_cis",
                        caption: "Výrobní číslo" //RC 33600048 : Výrobní číslo
                    }).addTextColumn({
                        width: 130,
                        name: "ser_cis",
                        caption: "Sériové číslo" //RC 33600049 : Sériové číslo
                    }).addCurrencyColumn({
                        //width: 40,
                        name: "c_Ada",
                        caption: "Částka v CZK" //RC 33600046 : Částka v CZK
                    });
                    return gridFormat;
                }
                updateDetailActions(dto) {
                    const acts = this.cntDetail.actions;
                    acts.actNovy?.updatePermission(dto.Permissions, "LzeNovy");
                    acts.actEvidovat?.updatePermission(dto.Permissions, "LzeEvidovat");
                    acts.actSchvalit?.updatePermission(dto.Permissions, "LzeSchvalit");
                    acts.actStornovat?.updatePermission(dto.Permissions, "LzeStornovat");
                    acts.actZrusitStorno?.updatePermission(dto.Permissions, "LzeZrusitStorno");
                }
                //updateActions(ctx: { selection: MetaRow<Interface.GVepssmoDto>[], activeRow: Interface.GVepssmoDto, onDetail?: boolean }) {
                //    const acts = this.content.actions;
                //    if (ctx.selection?.length > 0) {
                //        let enableDict: { [act: string]: boolean } = { ["actSchvalit"]: false, ["actStornovat"]: false, ["actZrusitStorno"]: false }
                //        if (ctx.onDetail) enableDict.actEvidovat = false;
                //        for (let row of ctx.selection) {
                //            if (ctx.onDetail && row.Permissions.LzeEvidovat.value) {
                //                enableDict["actEvidovat"] = true;
                //            }
                //            if (row.Permissions.LzeSchvalit.value) {
                //                enableDict["actSchvalit"] = true;
                //            }
                //            if (row.Permissions.LzeStornovat.value) {
                //                enableDict["actStornovat"] = true;
                //            }
                //            if (row.Permissions.LzeZrusitStorno.value) {
                //                enableDict["actZrusitStorno"] = true;
                //            }
                //        }
                //        //nastavení povolenosti tlačítek akcí
                //        for (let act of Object.keys(enableDict)) {
                //            acts[act]?.updatePermission({ value: enableDict[act] });
                //        }
                //    } else if (ctx.activeRow && ctx.activeRow.Permissions) {
                //        if (ctx.onDetail) acts.actEvidovat?.updatePermission(ctx.activeRow.Permissions, "LzeEvidovat");
                //        acts.actSchvalit?.updatePermission(ctx.activeRow.Permissions, "LzeSchvalit");
                //        acts.actStornovat?.updatePermission(ctx.activeRow.Permissions, "LzeStornovat");
                //        acts.actZrusitStorno?.updatePermission(ctx.activeRow.Permissions, "LzeZrusitStorno");
                //    }
                //}
                getView() {
                    return $.Deferred().resolve(new Gordic.Isl.View(this.cntSeznam.isl.AkceVecnyProfil.list({ filters: { rok: this.dao.opts.rok, ico: this.dao.opts.ico, cislo: this.dao.opts.cislo } }), {
                        onResponse: (data) => {
                            //nastavení servicePermissions
                            if (data.servicePermissions) {
                                this.cntSeznam.actions.actNovy?.updatePermission(data.servicePermissions, "LzeNovy");
                            }
                            return data;
                        },
                        key: ["rok", "ico", "cislo", "cis_plan"],
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions.*"])
                        }
                    })).promise();
                }
                /**
                 * Úprava sesbíraných dat z formuláře před uložením
                 * @param form Aktuální formulář
                 * @param dto Aktuální dto
                 * @param formData Sesbíraná data formuláře
                 */
                modifyDataBeforeSave(form, dto, formData) {
                    var row = {};
                    $.extend(true, row, dto);
                    row.rok = dto.rok;
                    row.ico = dto.ico;
                    row.cislo = dto.cislo;
                    row.cis_plan = dto.cis_plan ? dto.cis_plan : 0;
                    row.ixs_poz = formData.ixs_poz;
                    row.cis_poz = formData.cis_poz;
                    row.m_plan = formData.m_plan;
                    row.c_plan = formData.c_plan;
                    row.skp = formData.skp;
                    row.mat_cis = formData.mat_cis;
                    row.nazev_skp = formData.nazev_kla;
                    row.nazev = formData.nazev;
                    row.skupina_id = formData.skupina_id;
                    row.drh_id = formData.drh_id;
                    row.mj = formData.mj;
                    row.vyr_cis = formData.vyr_cis;
                    row.kod_pol = formData.kod_pol;
                    row.ucs = formData.ucs;
                    row.nks = formData.nks;
                    row.nks_zad = formData.nks_zad;
                    row.duvod_poz = formData.duvod_poz;
                    row.drh_poz = formData.drh_poz;
                    row.aktivita = formData.aktivita;
                    row.inv_cis = formData.inv_cis;
                    row.popis = formData.popis;
                    row.ixs_dup = formData.ixs_dup;
                    row.znam = formData.znam;
                    row.vp_stav = formData.vp_stav;
                    row.rok_vp = formData.rok_vp;
                    return row;
                }
                /**
                 * Rozšíření a upravení formuláře
                 * @param form Div formuláře
                 * @param formDefinition Definice formuláře
                 * @param dto Aktuální dto s daty
                 */
                enhanceForm(form, formDefinition, dto) {
                    for (let section of formDefinition.form.sections) {
                        switch (section.name) {
                            case "transakce":
                                break;
                            case "topologie":
                                //úprava UCS
                                var newRows = [{
                                        label: "UCS",
                                        fields: [{
                                                widget: "gselectbox",
                                                extensions: [{ widget: "gselectbox", options: Gordic.Prefabs.Select.ekosucs() }],
                                                options: {
                                                    name: "ucs",
                                                    model: "model.ico=>value.ico; model.ucs=value.ucs",
                                                    serverFilters: { ico: this.ico }
                                                }
                                            }]
                                    }];
                                section.rows?.push(...newRows);
                                break;
                            default:
                        }
                    }
                }
            }
            WebClient.GAdaVecnyProfilVisitor = GAdaVecnyProfilVisitor;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkYVZlY255UHJvZmlsVmlzaXRvci5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRhVmVjbnlQcm9maWxWaXNpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix3RkFBd0Y7QUFDeEYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFFakIsSUFBVSxNQUFNLENBdVBmO0FBdlBELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVQbkI7SUF2UGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXVQN0I7UUF2UG9CLFdBQUEsU0FBUztZQUUxQiw2RUFBNkU7WUFDN0UsTUFBYSxzQkFBc0I7Z0JBUS9CLFlBQVksSUFBc0Q7b0JBQzlELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxLQUFLLENBQUMsT0FBdUY7b0JBQ3pGLGdDQUFnQztvQkFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6QixPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFtRCxFQUFFLEVBQUU7d0JBQ3JGLGlDQUFpQzt3QkFDakMsMEJBQTBCO29CQUM5QixDQUFDLENBQUMsQ0FBQTtvQkFFRix1REFBdUQ7b0JBQ3ZELE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLEdBQW9DLEVBQUUsRUFBRTt3QkFDMUUsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQ2hDLE9BQU8sT0FBTyxDQUFDLG9CQUFvQixDQUFDLG9EQUFvRCxDQUFDLENBQUMsSUFBSSxD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UyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdVA3QjtJQUFELENBQUMsRUF2UGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXVQbkI7QUFBRCxDQUFDLEVBdlBTLE1BQU0sS0FBTixNQUFNLFFBdVBmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRhVmVjbnlQcm9maWxWaXNpdG9yLnRzICAgICAgICAgICAgICA8L05hbWU+XG4vLyAgICA8RGVzY3JpcHRpb24+IFZpc2l0b3Iga29tcG9uZW50eSBWxJtjbsOpaG8gcHJvZmlsdSAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cbi8vICAgIDxBdXRob3I+ICAgICAgamlsZWNlayAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIyICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIyLTEwLTE3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuXHJcbiAgICAvKiogVmlzaXRvciBrb21wb25lbnR5IFbEm2Nuw6lobyBwcm9maWx1IChVbW/FvsWIdWplIHJvesWhw63FmWl0IHNwb2xlxI1uw70gesOha2xhZCkgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHQWRhVmVjbnlQcm9maWxWaXNpdG9yIGltcGxlbWVudHMgR29yZGljLkVrby5XZWJDbGllbnQuSUdWZWNueVByb2ZpbFZpc2l0b3Ige1xyXG4gICAgICAgIHByb3RlY3RlZCBkYW86IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdWZWNueVByb2ZpbEFkYURBTztcclxuICAgICAgICBwcm90ZWN0ZWQgY250U2V6bmFtOiBHb3JkaWMuRWtvLldlYkNsaWVudC5JR1ZlY255UHJvZmlsU2V6bmFtPEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdWZXBzcGxhRHRvPiAmIEdDb250ZW50O1xyXG4gICAgICAgIHByb3RlY3RlZCBjbnREZXRhaWw6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LklHVmVjbnlQcm9maWxEZXRhaWw8R29yZGljLkFkYS5JbnRlcmZhY2UuR1ZlcHNwbGFEdG8+ICYgR0NvbnRlbnQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgaWNvOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSB1Y3M6IHN0cmluZztcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Iob3B0czogeyBkYW86IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdWZWNueVByb2ZpbEFkYURBTyB9KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGFvID0gb3B0cy5kYW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aXNpdChjb250ZW50OiBFa28uV2ViQ2xpZW50LklHVmVjbnlQcm9maWxTZXpuYW08R29yZGljLkFkYS5JbnRlcmZhY2UuR1ZlcHNwbGFEdG8+ICYgR0NvbnRlbnQpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInZpc2l0IGZyb20gQWRhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNudFNlem5hbSA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuc2V0RGFvKHRoaXMuZGFvKTtcclxuICAgICAgICAgICAgY29udGVudC52cEV2ZW50cy5vbihcInNlbGVjdGlvblwiLCAoY3R4OiB7IHNlbGVjdGlvbjogTWV0YVJvdzxJbnRlcmZhY2UuR1ZlcHNwbGFEdG8+W119KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwic2VsZWN0aW9uIHogQWRhXCIpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnVwZGF0ZUFjdGlvbnMoY3R4KTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vcHJ2b3Ruw60gbmHEjXRlbsOtIHNlem5hbXUgcMWZZWQgdnl0dm/FmWVuw60gcHJ2a8WvIGNvbnRlbnR1XHJcbiAgICAgICAgICAgIGNvbnRlbnQudnBFdmVudHMub24oXCJwcmVwYXJlc2V6bmFtXCIsIChjdHg6IHsgcHJvbWlzZTogSlF1ZXJ5UHJvbWlzZTxhbnk+IH0pID0+IHtcclxuICAgICAgICAgICAgICAgIGN0eC5wcm9taXNlID0gY3R4LnByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRhVmVjbnlQcm9maWxTZXJ2aWNlQ29udGVudFwiKS5jYWxsKFwiTG9hZERhdGFcIiwgeyBha2NlX3A6IG51bGwsIGNpc2xvOiBcIlwiIH0pLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodGhpcywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb250ZW50LnZwRXZlbnRzLm9uKFwibG9hZHNlem5hbVwiLCAoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFZpZXcoKS50aGVuKCh2aWV3KSA9PiB7IHJldHVybiBjb250ZW50LnNldFZpZXcodmlldyk7IH0pO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY29udGVudC52cEV2ZW50cy5vbihcImVuaGFuY2VncmlkZm9ybWF0XCIsIChjdHg6IHsgZ3JpZEZvcm1hdDogRGF0YS5HcmlkRm9ybWF0IH0pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY3R4LmdyaWRGb3JtYXQuYWRkKHRoaXMuZ2V0R3JpZEZvcm1hdCgpKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vcm96xaHDrcWZZW7DrS/DunByYXZhIGZvcm11bMOhxZllIHDFmWkgdnl0dsOhxZllbsOtXHJcbiAgICAgICAgICAgIGNvbnRlbnQudnBFdmVudHMub24oXCJlbmhhbmNlZm9ybVwiLCAoY3R4OiB7IGZvcm1EaXY6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGZvcm1EZWZpbml0aW9uOiBGb3Jtcy5Gb3JtLCBkdG86IEludGVyZmFjZS5HVmVwc3BsYUR0byB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuaGFuY2VGb3JtKGN0eC5mb3JtRGl2LCBjdHguZm9ybURlZmluaXRpb24sIGN0eC5kdG8pO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9yb3rFocOtxZllbsOtL8O6cHJhdmEgc2VzYsOtcmFuw71jaCBkYXQgZm9ybXVsw6HFmWUgLSBkbyBJc2x1IHNlIHBvdMOpIHBvc8OtbMOhIGN0eC5mb3JtRGF0YVxyXG4gICAgICAgICAgICBjb250ZW50LnZwRXZlbnRzLm9uKFwiZW5oYWNlY29sbGVjdGVkZGF0YVwiLCAoY3R4OiB7IGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4sIGR0bzogSW50ZXJmYWNlLkdWZXBzcGxhRHRvLCBmb3JtRGF0YTogYW55IH0pID0+IHtcclxuICAgICAgICAgICAgICAgIGN0eC5mb3JtRGF0YSA9IHRoaXMubW9kaWZ5RGF0YUJlZm9yZVNhdmUoY3R4LmZvcm0sIGN0eC5kdG8sIGN0eC5mb3JtRGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb250ZW50LnZwRXZlbnRzLm9uKFwiZW5oYW5jZWRlZmF1bGZwcm9maWxlXCIsIChjdHg6IHsgZGVmYXVsdFByb2ZpbGU6IEdyaWRQcm9maWxlPEludGVyZmFjZS5HVmVwc3BsYUR0bz4gfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jdHguZGVmYXVsdFByb2ZpbGUuY29uZEZvcm1hdHM/LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8zODQuNyAwNC4wMy4yMCBwb2t1ZCBieWxhIHBvbG/FvmthIHZwIHpwcmFjb3bDoW5hIHYgTUFKLCBvYmFydsOtIHNlIGRvIG1vZHJhIGkgdiBwxZnDrXBhZMSbIGJsb2thY2Ugb2JqZWRuw6F2a291IHNlIGJhcnbDrSBkbyBtb2RyYVxyXG4gICAgICAgICAgICAgICAgLy8gICAgZm9ybXVsYTogXCJJRigoQG1fbWFqICE9IDAgYW5kIEFCUyhAbV9tYWopIDw9IEFCUyhAbV9BZGEpKSBvciAoQG1fb2JqX0FkYSAhPSAwKSwgdHJ1ZSwgZmFsc2UpXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsdWVcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAvL2N0eC5kZWZhdWx0UHJvZmlsZS5jb2x1bW5MaXN0ID0gXCJ6bmFtLGl4c19kdXBfdHh0LHZwX3N0YXZfdHh0LGtvZF9wb2wsbmF6ZXYsc2twLG1hdF9jaXMsaW52X2NpcyxldmlfY2lzLHZ5cl9jaXMsc2VyX2NpcyxzYXJ6ZSxtaixtZW5hX3prcixtX0FkYSxtX29ial9BZGEsbV9tYWosY19BZGFfbWVuYV96LFwiICtcclxuICAgICAgICAgICAgICAgIC8vXCJjX0FkYV9tZW5hX2RwaCxjX2NfQWRhX21lbmFfZHBoLGNfQWRhLGNfb2JqX0FkYSxjX21haixjX0FkYV9kcGgsY19jX0FkYV9kcGgscG9waXMsaXhwX3NtbyxjaXNfc21vLGl4c19wb3osdWNzLG5rcyxua3NfemFkLHZwX3N0YXZcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnRlbnQudnBFdmVudHMub24oXCJsb2FkZGV0YWlsXCIsIChjdHg6IHsgY29udGVudDogRWtvLldlYkNsaWVudC5JR1ZlY255UHJvZmlsRGV0YWlsPEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdWZXBzcGxhRHRvPiAmIEdDb250ZW50LCBkdG86IEludGVyZmFjZS5HVmVwc3BsYUR0byB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibG9hZGRldGFpbCAtIEFkYVwiKTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY3R4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY250RGV0YWlsID0gY3R4LmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURldGFpbEFjdGlvbnMoY3R4LmR0byk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNudERldGFpbC5zZXRTdGF0dXNCYXJTdGF2KGN0eC5kdG8udnBfc3Rhdl9uYXpldiA/PyBcIk5ldXLEjWVub1wiKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRHcmlkRm9ybWF0KCk6IERhdGEuR3JpZEZvcm1hdDxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6bmFtXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlAvVlwiLCAvL1JDIDMzNjAwMDU2IDogUC9WXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChyb3csIG1ldGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWV0YT8uX2lzVmlydHVhbCkgeyByZXR1cm4gXCJcIjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocm93LnpuYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiK1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImV2aV9jaXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRXZpZGVuxI1uw60gxI3DrXNsb1wiIC8vUkMgMzM2MDAwNDcgOiBFdmlkZW7EjW7DrSDEjcOtc2xvXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEzMCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidnlyX2Npc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71yb2Juw60gxI3DrXNsb1wiIC8vUkMgMzM2MDAwNDggOiBWw71yb2Juw60gxI3DrXNsb1xyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNlcl9jaXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU8OpcmlvdsOpIMSNw61zbG9cIiAvL1JDIDMzNjAwMDQ5IDogU8OpcmlvdsOpIMSNw61zbG9cclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy93aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfQWRhXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsSMw6FzdGthIHYgQ1pLXCIgLy9SQyAzMzYwMDA0NiA6IMSMw6FzdGthIHYgQ1pLXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVEZXRhaWxBY3Rpb25zKGR0bzogSW50ZXJmYWNlLkdWZXBzcGxhRHRvKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdHMgPSB0aGlzLmNudERldGFpbC5hY3Rpb25zO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE5vdnk/LnVwZGF0ZVBlcm1pc3Npb24oZHRvLlBlcm1pc3Npb25zLCBcIkx6ZU5vdnlcIik7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RXZpZG92YXQ/LnVwZGF0ZVBlcm1pc3Npb24oZHRvLlBlcm1pc3Npb25zLCBcIkx6ZUV2aWRvdmF0XCIpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFNjaHZhbGl0Py51cGRhdGVQZXJtaXNzaW9uKGR0by5QZXJtaXNzaW9ucywgXCJMemVTY2h2YWxpdFwiKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RTdG9ybm92YXQ/LnVwZGF0ZVBlcm1pc3Npb24oZHRvLlBlcm1pc3Npb25zLCBcIkx6ZVN0b3Jub3ZhdFwiKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RacnVzaXRTdG9ybm8/LnVwZGF0ZVBlcm1pc3Npb24oZHRvLlBlcm1pc3Npb25zLCBcIkx6ZVpydXNpdFN0b3Jub1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdXBkYXRlQWN0aW9ucyhjdHg6IHsgc2VsZWN0aW9uOiBNZXRhUm93PEludGVyZmFjZS5HVmVwc3Ntb0R0bz5bXSwgYWN0aXZlUm93OiBJbnRlcmZhY2UuR1ZlcHNzbW9EdG8sIG9uRGV0YWlsPzogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgLy8gICAgY29uc3QgYWN0cyA9IHRoaXMuY29udGVudC5hY3Rpb25zO1xyXG4gICAgICAgIC8vICAgIGlmIChjdHguc2VsZWN0aW9uPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gICAgICAgIGxldCBlbmFibGVEaWN0OiB7IFthY3Q6IHN0cmluZ106IGJvb2xlYW4gfSA9IHsgW1wiYWN0U2NodmFsaXRcIl06IGZhbHNlLCBbXCJhY3RTdG9ybm92YXRcIl06IGZhbHNlLCBbXCJhY3RacnVzaXRTdG9ybm9cIl06IGZhbHNlIH1cclxuICAgICAgICAvLyAgICAgICAgaWYgKGN0eC5vbkRldGFpbCkgZW5hYmxlRGljdC5hY3RFdmlkb3ZhdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICBmb3IgKGxldCByb3cgb2YgY3R4LnNlbGVjdGlvbikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKGN0eC5vbkRldGFpbCAmJiByb3cuUGVybWlzc2lvbnMuTHplRXZpZG92YXQudmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBlbmFibGVEaWN0W1wiYWN0RXZpZG92YXRcIl0gPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHJvdy5QZXJtaXNzaW9ucy5MemVTY2h2YWxpdC52YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGVuYWJsZURpY3RbXCJhY3RTY2h2YWxpdFwiXSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAocm93LlBlcm1pc3Npb25zLkx6ZVN0b3Jub3ZhdC52YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGVuYWJsZURpY3RbXCJhY3RTdG9ybm92YXRcIl0gPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHJvdy5QZXJtaXNzaW9ucy5MemVacnVzaXRTdG9ybm8udmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBlbmFibGVEaWN0W1wiYWN0WnJ1c2l0U3Rvcm5vXCJdID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgICAgLy9uYXN0YXZlbsOtIHBvdm9sZW5vc3RpIHRsYcSNw610ZWsgYWtjw61cclxuICAgICAgICAvLyAgICAgICAgZm9yIChsZXQgYWN0IG9mIE9iamVjdC5rZXlzKGVuYWJsZURpY3QpKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBhY3RzW2FjdF0/LnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZW5hYmxlRGljdFthY3RdIH0pO1xyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgfSBlbHNlIGlmIChjdHguYWN0aXZlUm93ICYmIGN0eC5hY3RpdmVSb3cuUGVybWlzc2lvbnMpIHtcclxuICAgICAgICAvLyAgICAgICAgaWYgKGN0eC5vbkRldGFpbCkgYWN0cy5hY3RFdmlkb3ZhdD8udXBkYXRlUGVybWlzc2lvbihjdHguYWN0aXZlUm93LlBlcm1pc3Npb25zLCBcIkx6ZUV2aWRvdmF0XCIpO1xyXG4gICAgICAgIC8vICAgICAgICBhY3RzLmFjdFNjaHZhbGl0Py51cGRhdGVQZXJtaXNzaW9uKGN0eC5hY3RpdmVSb3cuUGVybWlzc2lvbnMsIFwiTHplU2NodmFsaXRcIik7XHJcbiAgICAgICAgLy8gICAgICAgIGFjdHMuYWN0U3Rvcm5vdmF0Py51cGRhdGVQZXJtaXNzaW9uKGN0eC5hY3RpdmVSb3cuUGVybWlzc2lvbnMsIFwiTHplU3Rvcm5vdmF0XCIpO1xyXG4gICAgICAgIC8vICAgICAgICBhY3RzLmFjdFpydXNpdFN0b3Jubz8udXBkYXRlUGVybWlzc2lvbihjdHguYWN0aXZlUm93LlBlcm1pc3Npb25zLCBcIkx6ZVpydXNpdFN0b3Jub1wiKTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBnZXRWaWV3KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUobmV3IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HVmVwc3BsYUR0bz4odGhpcy5jbnRTZXpuYW0uaXNsLkFrY2VWZWNueVByb2ZpbC5saXN0KHsgZmlsdGVyczogeyByb2s6IHRoaXMuZGFvLm9wdHMucm9rLCBpY286IHRoaXMuZGFvLm9wdHMuaWNvLCBjaXNsbzogdGhpcy5kYW8ub3B0cy5jaXNsbyB9IH0pLCB7XHJcbiAgICAgICAgICAgICAgICBvblJlc3BvbnNlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBzZXJ2aWNlUGVybWlzc2lvbnNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zZXJ2aWNlUGVybWlzc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbnRTZXpuYW0uYWN0aW9ucy5hY3ROb3Z5Py51cGRhdGVQZXJtaXNzaW9uKGRhdGEuc2VydmljZVBlcm1pc3Npb25zIGFzIEludGVyZmFjZS5HVmVwc3BsYVBlcm1pc3Npb25zLCBcIkx6ZU5vdnlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGtleTogW1wicm9rXCIsIFwiaWNvXCIsIFwiY2lzbG9cIiwgXCJjaXNfcGxhblwiXSxcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zLipcIl0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDDmnByYXZhIHNlc2LDrXJhbsO9Y2ggZGF0IHogZm9ybXVsw6HFmWUgcMWZZWQgdWxvxb5lbsOtbVxyXG4gICAgICAgICAqIEBwYXJhbSBmb3JtIEFrdHXDoWxuw60gZm9ybXVsw6HFmVxyXG4gICAgICAgICAqIEBwYXJhbSBkdG8gQWt0dcOhbG7DrSBkdG9cclxuICAgICAgICAgKiBAcGFyYW0gZm9ybURhdGEgU2VzYsOtcmFuw6EgZGF0YSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbW9kaWZ5RGF0YUJlZm9yZVNhdmUoZm9ybSwgZHRvLCBmb3JtRGF0YSk6IEludGVyZmFjZS5HVmVwc3BsYUR0byB7XHJcbiAgICAgICAgICAgIHZhciByb3c6IEludGVyZmFjZS5HVmVwc3BsYUR0byA9IHt9O1xyXG4gICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCByb3csIGR0byk7XHJcblxyXG4gICAgICAgICAgICByb3cucm9rID0gZHRvLnJvazsgXHJcbiAgICAgICAgICAgIHJvdy5pY28gPSBkdG8uaWNvOyBcclxuICAgICAgICAgICAgcm93LmNpc2xvID0gZHRvLmNpc2xvO1xyXG4gICAgICAgICAgICByb3cuY2lzX3BsYW4gPSBkdG8uY2lzX3BsYW4gPyBkdG8uY2lzX3BsYW4gOiAwOyBcclxuXHJcbiAgICAgICAgICAgIHJvdy5peHNfcG96ID0gZm9ybURhdGEuaXhzX3BvejtcclxuICAgICAgICAgICAgcm93LmNpc19wb3ogPSBmb3JtRGF0YS5jaXNfcG96O1xyXG4gICAgICAgICAgICByb3cubV9wbGFuID0gZm9ybURhdGEubV9wbGFuO1xyXG4gICAgICAgICAgICByb3cuY19wbGFuID0gZm9ybURhdGEuY19wbGFuO1xyXG4gICAgICAgICAgICByb3cuc2twID0gZm9ybURhdGEuc2twO1xyXG4gICAgICAgICAgICByb3cubWF0X2NpcyA9IGZvcm1EYXRhLm1hdF9jaXM7XHJcbiAgICAgICAgICAgIHJvdy5uYXpldl9za3AgPSBmb3JtRGF0YS5uYXpldl9rbGE7XHJcbiAgICAgICAgICAgIHJvdy5uYXpldiA9IGZvcm1EYXRhLm5hemV2O1xyXG4gICAgICAgICAgICByb3cuc2t1cGluYV9pZCA9IGZvcm1EYXRhLnNrdXBpbmFfaWQ7XHJcbiAgICAgICAgICAgIHJvdy5kcmhfaWQgPSBmb3JtRGF0YS5kcmhfaWQ7XHJcbiAgICAgICAgICAgIHJvdy5taiA9IGZvcm1EYXRhLm1qO1xyXG4gICAgICAgICAgICByb3cudnlyX2NpcyA9IGZvcm1EYXRhLnZ5cl9jaXM7XHJcbiAgICAgICAgICAgIHJvdy5rb2RfcG9sID0gZm9ybURhdGEua29kX3BvbDtcclxuICAgICAgICAgICAgcm93LnVjcyA9IGZvcm1EYXRhLnVjcztcclxuICAgICAgICAgICAgcm93Lm5rcyA9IGZvcm1EYXRhLm5rcztcclxuICAgICAgICAgICAgcm93Lm5rc196YWQgPSBmb3JtRGF0YS5ua3NfemFkO1xyXG4gICAgICAgICAgICByb3cuZHV2b2RfcG96ID0gZm9ybURhdGEuZHV2b2RfcG96O1xyXG4gICAgICAgICAgICByb3cuZHJoX3BveiA9IGZvcm1EYXRhLmRyaF9wb3o7XHJcbiAgICAgICAgICAgIHJvdy5ha3Rpdml0YSA9IGZvcm1EYXRhLmFrdGl2aXRhO1xyXG4gICAgICAgICAgICByb3cuaW52X2NpcyA9IGZvcm1EYXRhLmludl9jaXM7XHJcbiAgICAgICAgICAgIHJvdy5wb3BpcyA9IGZvcm1EYXRhLnBvcGlzO1xyXG4gICAgICAgICAgICByb3cuaXhzX2R1cCA9IGZvcm1EYXRhLml4c19kdXA7XHJcbiAgICAgICAgICAgIHJvdy56bmFtID0gZm9ybURhdGEuem5hbTtcclxuICAgICAgICAgICAgcm93LnZwX3N0YXYgPSBmb3JtRGF0YS52cF9zdGF2O1xyXG4gICAgICAgICAgICByb3cucm9rX3ZwID0gZm9ybURhdGEucm9rX3ZwO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJvdzsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSb3rFocOtxZllbsOtIGEgdXByYXZlbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICogQHBhcmFtIGZvcm0gRGl2IGZvcm11bMOhxZllXHJcbiAgICAgICAgICogQHBhcmFtIGZvcm1EZWZpbml0aW9uIERlZmluaWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgICogQHBhcmFtIGR0byBBa3R1w6FsbsOtIGR0byBzIGRhdHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuaGFuY2VGb3JtKGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4sIGZvcm1EZWZpbml0aW9uOiBGb3Jtcy5Gb3JtLCBkdG86IEludGVyZmFjZS5HVmVwc3BsYUR0bykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzZWN0aW9uIG9mIGZvcm1EZWZpbml0aW9uLmZvcm0uc2VjdGlvbnMhKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlY3Rpb24ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFuc2FrY2VcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3BvbG9naWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/DunByYXZhIFVDU1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1Jvd3M6IEZvcm1zLkZvcm1Sb3dbXSA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJVQ1NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IFt7IHdpZGdldDogXCJnc2VsZWN0Ym94XCIsIG9wdGlvbnM6IEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNzKCkgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289PnZhbHVlLmljbzsgbW9kZWwudWNzPXZhbHVlLnVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGljbzogdGhpcy5pY28gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24ucm93cz8ucHVzaCguLi5uZXdSb3dzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59Il19