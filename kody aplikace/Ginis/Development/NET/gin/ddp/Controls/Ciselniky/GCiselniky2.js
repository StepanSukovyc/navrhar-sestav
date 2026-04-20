"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GCiselniky2.ts                         </Name>
//    <Description> Číselníky (záloha)                                          </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
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
            let GCiselniky2 = class GCiselniky2 extends Gordic.GContentBase {
                onContentReady() {
                    this.taskId = "actGCiselniky2";
                    this.title = `Číselníky typu pohledávky ${this.typ_phl}`;
                    this.createActions();
                    //this.setBreadcrumbs([{
                    //    caption: this.title,
                    //    action: this.actions["actGCiselnikyZavritPotomky"]
                    //}]);
                    this.createGui();
                }
                createGui() {
                    let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                        change: (ev, obj) => {
                            this.refresh();
                        }
                    })
                        .addRow("Číselník")
                        .addField("gselectbox", {
                        name: "ciselnik",
                        model: "model.ciselnik=value.Typ",
                        dropdown: true,
                        data: new Gordic.Data.View(this.ciselniky, { key: "Typ" }),
                        itemTemplate: (value) => {
                            if (value == null || value.Typ == null)
                                return "";
                            else if (value.Nazev == null)
                                return `${value.Typ}`;
                            else
                                return value.Nazev;
                        },
                        change: (ev, obj) => {
                            this.refresh();
                        }
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "pouze_aktivni",
                        label: "Zobrazit pouze aktivní",
                        initialValue: false,
                        change: (ev, obj) => {
                            this.refresh();
                        }
                    })
                        .addRow({ customClass: "right" })
                        .addField("gbutton", { params: { primary: true, customClass: "right", id: "actGCiselnikyVyhledat_button", action: this.actions["actGCiselnikyVyhledat"] } });
                    this.defaultForm = $.newDiv()
                        .appendTo(this.element)
                        .gform("createFrom", form);
                    this.menuBar([{
                            action: this.actions["actGCiselnikyPridat"],
                            favorite: true
                        },
                        {
                            action: this.actions["actGCiselnikyOdebrat"],
                            favorite: true
                        },
                        {
                            action: this.actions["actGCiselnikyObnovit"],
                            favorite: true
                        },
                        {
                            action: this.actions["actGCiselnikyUpravit"],
                            favorite: true
                        },
                        {
                            action: this.actions["actGCiselnikyKopirovat"],
                            favorite: true
                        }]);
                    this.grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        data: new Gordic.Data.View([])
                    });
                    this.element.resize(); //TODO: pokud nedojde k smazání souboru, nutno vyřešit tento problém.
                    this.defaultForm.findFields().gfield("model", "apply", { typ_phl: this.typ_phl, ciselnik: 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */ });
                }
                cleanGrid() {
                    this.grid.ggrid("destroy");
                    this.grid.ggrid({ data: new Gordic.Data.View([]) });
                    this.enableActions2(undefined);
                }
                getView(ciselnik) {
                    const that = this;
                    let getRq = (akt = true) => {
                        var filter = {
                            typ_phl: this.typ_phl
                        };
                        if (akt)
                            filter.aktivita = this.defaultForm.findFields("pouze_aktivni").gfield("getValue") === true ? 100 : undefined;
                        return rq => {
                            return {
                                filters: $.extend({}, filter),
                                fragments: ["*", "Permissions"]
                            };
                        };
                    };
                    let task;
                    switch (ciselnik) {
                        case 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */:
                            task = that.isl.CiselnikRadku.list(getRq());
                            break;
                        case 1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */:
                            task = that.isl.CiselnikCtvrti.list(getRq());
                            break;
                        case 2 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.VazbyRadkuACtvrti */:
                            task = that.isl.VazbyRadkuACtvrti.list(getRq());
                            break;
                        case 3 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.SazbyPripadu */:
                            task = that.isl.SazbyPripadu.list(getRq());
                            break;
                        case 4 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.TypPhlPrevodVyjimkyKtgUPO */:
                            task = that.isl.VyjimkyKategoriiPohybu.list(getRq());
                            break;
                        case 5 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniUPO */:
                            task = that.isl.GenerovaniUPO.list(getRq(false));
                            break;
                        case 6 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniOPR */:
                            task = that.isl.GenerovaniOPR.list(getRq(false));
                            break;
                        case 8 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.PolozkySMLProKatPohybu */:
                            task = that.isl.PolozkySML.list(getRq(false));
                            break;
                        default:
                            return undefined;
                    }
                    return new Gordic.Isl.View(task, {
                        processors: {
                            permissionFragments: new Gordic.Data.FragmentManager(["Permissions"])
                        }
                    });
                }
                getDefaultProfile(ciselnik) {
                    switch (ciselnik) {
                        case 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */:
                            return { columnList: "ddp_radek, nazev, ixp_den, poznamka, aktivita", rowNumbers: true };
                        case 1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */:
                            return { columnList: "ddp_ctvrt, nazev, ixp_den, poznamka, aktivita", rowNumbers: true };
                        case 2 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.VazbyRadkuACtvrti */:
                            return { columnList: "ixp_den, ddp_radek, ddp_ctvrt, poznamka, aktivita", rowNumbers: true };
                        case 3 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.SazbyPripadu */:
                            return { columnList: "cis_sazby, popis, sazba, pocet, poc_splatek, c_celk, poznamka, aktivita, c_z0, c_d0, c_z1, c_d1, c_z3, c_d3, c_z2, c_d2, c_zao", rowNumbers: true };
                        case 4 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.TypPhlPrevodVyjimkyKtgUPO */:
                            return { columnList: "typ_phl_z, typ_phl_do, ktg_upo_z, ktg_upo_do, aktivita", rowNumbers: true };
                        case 5 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniUPO */:
                            return { columnList: "typ_phl, rok, ico, ucs, ktg_upo, priz_gen_upo", rowNumbers: true };
                        case 6 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniOPR */:
                            return { columnList: "typ_phl, rok, ico, ucs, ktg_upo, priz_gen_opr", rowNumbers: true };
                        case 8 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.PolozkySMLProKatPohybu */:
                            return { columnList: "typ_phl, ktg_upo, typ_vsm", rowNumbers: true };
                        default:
                            return undefined;
                    }
                }
                setContentTitle() {
                    this.title = `Číselníky typu pohledávky ${this.typ_phl}`;
                    this.element
                        .parent(".ui-dialog")
                        .children(".ui-dialog-titlebar")
                        .children(".ui-dialog-title")
                        .text(this.title);
                }
                refresh() {
                    let filter = {};
                    this.defaultForm.findFields("typ_phl", "ciselnik").gfield("model", "collect", filter);
                    if (filter.typ_phl == null || filter.ciselnik == null) {
                        this.cleanGrid();
                        return;
                    }
                    this.typ_phl = filter.typ_phl;
                    this.setContentTitle();
                    let view = this.getView(filter.ciselnik);
                    if (!view) {
                        this.cleanGrid();
                        return;
                    }
                    let aca = this.grid.ggrid("activeCellAddress");
                    this.grid.ggrid("destroy");
                    this.enableActions2(undefined);
                    this.grid.ggrid({
                        name: "ddp_typy_pohledavek_ciselnik_" + filter.ciselnik,
                        columns: Ddp.WebClient.Common.GridFormats.Ciselnik(filter.ciselnik),
                        defaultProfile: this.getDefaultProfile(filter.ciselnik),
                        data: view,
                        cellActivate: (ev, obj) => {
                            this.enableActions2(obj.cellInfo.row >= 0 ? obj.cellInfo.data.Permissions : undefined);
                        }
                    });
                    if (aca != null && aca.row >= 0) {
                        this.grid.ggrid("getView")
                            .getLoadingPromise()
                            .always(() => {
                            this.grid.ggrid("activeCellAddress", aca.row, aca.col);
                        });
                    }
                }
                enableActions2(perm) {
                    if (perm) {
                        this.actions["actGCiselnikyPridat"].updatePermission(perm, "CanCreate");
                        this.actions["actGCiselnikyOdebrat"].updatePermission(perm, "CanDelete");
                        this.actions["actGCiselnikyObnovit"].updatePermission(perm, "CanRestore");
                        this.actions["actGCiselnikyUpravit"].updatePermission(perm, "CanEdit");
                        this.actions["actGCiselnikyKopirovat"].updatePermission(perm, "CanCopy");
                    }
                    else {
                        let ciselnik = this.defaultForm.findFields("ciselnik").gfield("getValue");
                        this.actions["actGCiselnikyPridat"].updatePermission({ value: ciselnik != null });
                        this.actions["actGCiselnikyOdebrat"].updatePermission({ value: false });
                        this.actions["actGCiselnikyObnovit"].updatePermission({ value: false });
                        this.actions["actGCiselnikyUpravit"].updatePermission({ value: false });
                        this.actions["actGCiselnikyKopirovat"].updatePermission({ value: false });
                    }
                    this.actions["actGCiselnikyPridat"].visible(this.actions["actGCiselnikyPridat"].enabled());
                    this.actions["actGCiselnikyOdebrat"].visible(this.actions["actGCiselnikyOdebrat"].enabled());
                    this.actions["actGCiselnikyObnovit"].visible(this.actions["actGCiselnikyObnovit"].enabled());
                    this.actions["actGCiselnikyUpravit"].visible(this.actions["actGCiselnikyUpravit"].enabled());
                    this.actions["actGCiselnikyKopirovat"].visible(this.actions["actGCiselnikyKopirovat"].enabled());
                }
                pridatAction() {
                    let ciselnik = this.defaultForm.findFields("ciselnik").gfield("getValue");
                    if (!ciselnik)
                        return;
                    switch (ciselnik.Typ) {
                        case 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */:
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GCiselnikRadku", { data: { typ_phl: this.typ_phl, ixp_den: this.ixp_den }, editMode: false }, "Nový řádek", 600, 300);
                        case 1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */:
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GCiselnikCtvrti", { data: { typ_phl: this.typ_phl, ixp_den: this.ixp_den }, editMode: false }, "Nová čtvrť", 600, 300);
                        case 2 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.VazbyRadkuACtvrti */:
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVazbyRadkuACtvrti", { data: { typ_phl: this.typ_phl, ixp_den: this.ixp_den }, editMode: false }, "Nová vazba", 600, 300);
                        case 3 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.SazbyPripadu */:
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GSazbyPripadu", { data: { typ_phl: this.typ_phl }, editMode: false }, "Nová sazba", 850, 500);
                        case 4 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.TypPhlPrevodVyjimkyKtgUPO */:
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVyjimkyKategoriiPohybu", { data: { typ_phl_z: this.typ_phl }, editMode: false }, "Nová výjimka", 600, 300);
                        case 5 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniUPO */:
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniUPO", { data: { typ_phl: this.typ_phl, rok: this.rok, ico: this.ico, ucs: this.ucs }, editMode: false }, "Nový záznam", 600, 300);
                        case 6 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniOPR */:
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniOPR", { data: { typ_phl: this.typ_phl, rok: this.rok, ico: this.ico, ucs: this.ucs }, editMode: false }, "Nový záznam", 600, 300);
                        case 8 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.PolozkySMLProKatPohybu */:
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GPolozkySML", { data: { typ_phl: this.typ_phl }, editMode: false }, "Nový záznam", 600, 300);
                        default:
                            return;
                    }
                }
                odebratAction() {
                    const that = this;
                    let ciselnik = this.defaultForm.findFields("ciselnik").gfield("getValue");
                    if (!ciselnik)
                        return;
                    let row = this.grid.ggrid("activeRow");
                    if (row == null)
                        return;
                    switch (ciselnik.Typ) {
                        case 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */:
                            let rowTyped = row;
                            return that.isl.CiselnikRadku.delete(rq => {
                                return {
                                    rq: {
                                        Data: {
                                            ixp_den: rowTyped.ixp_den,
                                            typ_phl: rowTyped.typ_phl,
                                            ddp_radek: rowTyped.ddp_radek
                                        }
                                    }
                                };
                            }).get();
                        case 1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */:
                            let rowTyped2 = row;
                            return that.isl.CiselnikCtvrti.delete(rq => {
                                return {
                                    rq: {
                                        Data: {
                                            ixp_den: rowTyped2.ixp_den,
                                            typ_phl: rowTyped2.typ_phl,
                                            ddp_ctvrt: rowTyped2.ddp_ctvrt
                                        }
                                    }
                                };
                            }).get();
                        case 2 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.VazbyRadkuACtvrti */:
                            let rowTyped3 = row;
                            return that.isl.VazbyRadkuACtvrti.delete(rq => {
                                return {
                                    rq: {
                                        Data: {
                                            ixp_den: rowTyped3.ixp_den,
                                            typ_phl: rowTyped3.typ_phl,
                                            ddp_radek: rowTyped3.ddp_radek,
                                            ddp_ctvrt: rowTyped3.ddp_ctvrt
                                        }
                                    }
                                };
                            }).get();
                        case 3 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.SazbyPripadu */:
                            let rowTyped4 = row;
                            return that.isl.SazbyPripadu.delete(rq => {
                                return {
                                    rq: {
                                        Data: {
                                            typ_phl: rowTyped4.typ_phl,
                                            cis_sazby: rowTyped4.cis_sazby
                                        }
                                    }
                                };
                            }).get();
                        case 4 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.TypPhlPrevodVyjimkyKtgUPO */:
                            let rowTyped5 = row;
                            return that.isl.VyjimkyKategoriiPohybu.delete(rq => {
                                return {
                                    rq: {
                                        Data: {
                                            typ_phl_z: rowTyped5.typ_phl_z,
                                            typ_phl_do: rowTyped5.typ_phl_do,
                                            ktg_upo_z: rowTyped5.ktg_upo_z,
                                            ktg_upo_do: rowTyped5.ktg_upo_do
                                        }
                                    }
                                };
                            }).get();
                        case 5 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniUPO */:
                            let rowTyped6 = row;
                            return that.isl.GenerovaniUPO.delete(rq => {
                                return {
                                    rq: {
                                        Data: {
                                            typ_phl: rowTyped6.typ_phl,
                                            rok: rowTyped6.rok,
                                            ucs: rowTyped6.ucs,
                                            ico: rowTyped6.ico,
                                            ktg_upo: rowTyped6.ktg_upo
                                        }
                                    }
                                };
                            }).get();
                        case 6 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniOPR */:
                            let rowTyped7 = row;
                            return that.isl.GenerovaniOPR.delete(rq => {
                                return {
                                    rq: {
                                        Data: {
                                            typ_phl: rowTyped7.typ_phl,
                                            rok: rowTyped7.rok,
                                            ucs: rowTyped7.ucs,
                                            ico: rowTyped7.ico,
                                            ktg_upo: rowTyped7.ktg_upo
                                        }
                                    }
                                };
                            }).get();
                        case 8 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.PolozkySMLProKatPohybu */:
                            let rowTyped8 = row;
                            return that.isl.PolozkySML.delete(rq => {
                                return {
                                    rq: {
                                        Data: {
                                            typ_phl: rowTyped8.typ_phl,
                                            ktg_upo: rowTyped8.ktg_upo
                                        }
                                    }
                                };
                            }).get();
                        default:
                            return;
                    }
                }
                obnovitAction() {
                    const that = this;
                    let ciselnik = this.defaultForm.findFields("ciselnik").gfield("getValue");
                    if (!ciselnik)
                        return;
                    let row = this.grid.ggrid("activeRow");
                    if (row == null)
                        return;
                    switch (ciselnik.Typ) {
                        case 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */:
                            let rowTyped = row;
                            rowTyped.aktivita = 100;
                            return that.isl.CiselnikRadku.update(rq => {
                                return {
                                    rq: {
                                        Data: rowTyped
                                    }
                                };
                            })
                                .get();
                        case 1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */:
                            let rowTyped2 = row;
                            rowTyped2.aktivita = 100;
                            return that.isl.CiselnikCtvrti.update(rq => {
                                return {
                                    rq: {
                                        Data: rowTyped2
                                    }
                                };
                            })
                                .get();
                        case 2 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.VazbyRadkuACtvrti */:
                            let rowTyped3 = row;
                            rowTyped3.aktivita = 100;
                            return that.isl.VazbyRadkuACtvrti.update(rq => {
                                return {
                                    rq: {
                                        Data: rowTyped3
                                    }
                                };
                            })
                                .get();
                        case 3 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.SazbyPripadu */:
                            let rowTyped4 = row;
                            rowTyped4.aktivita = 100;
                            return that.isl.SazbyPripadu.update(rq => {
                                return {
                                    rq: {
                                        Data: rowTyped4
                                    }
                                };
                            })
                                .get();
                        case 4 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.TypPhlPrevodVyjimkyKtgUPO */:
                            let rowTyped5 = row;
                            rowTyped5.aktivita = 100;
                            return that.isl.VyjimkyKategoriiPohybu.update(rq => {
                                return {
                                    rq: {
                                        Data: {
                                            typ_phl_z: rowTyped5.typ_phl_z,
                                            typ_phl_do: rowTyped5.typ_phl_do,
                                            ktg_upo_z: rowTyped5.ktg_upo_z,
                                            ktg_upo_do: rowTyped5.ktg_upo_do,
                                            editedData: rowTyped5
                                        }
                                    }
                                };
                            })
                                .get();
                        case 8 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.PolozkySMLProKatPohybu */:
                            let rowTyped6 = row;
                            return that.isl.PolozkySML.update(rq => {
                                return {
                                    rq: {
                                        Data: rowTyped6
                                    }
                                };
                            })
                                .get();
                        default:
                            return;
                    }
                }
                upravitAction() {
                    const that = this;
                    let ciselnik = this.defaultForm.findFields("ciselnik").gfield("getValue");
                    if (!ciselnik)
                        return;
                    let row = this.grid.ggrid("activeRow");
                    if (row == null)
                        return;
                    switch (ciselnik.Typ) {
                        case 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */:
                            let rowTyped = row;
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GCiselnikRadku", { data: rowTyped, editMode: true }, `Detail řádku ${rowTyped.ddp_radek}`, 600, 300);
                        case 1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */:
                            let rowTyped2 = row;
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GCiselnikCtvrti", { data: rowTyped2, editMode: true }, `Detail čtvrti ${rowTyped2.ddp_ctvrt}`, 600, 300);
                        case 2 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.VazbyRadkuACtvrti */:
                            let rowTyped3 = row;
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVazbyRadkuACtvrti", { data: rowTyped3, editMode: true }, "Detail vazby", 600, 300);
                        case 3 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.SazbyPripadu */:
                            let rowTyped4 = row;
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GSazbyPripadu", { data: rowTyped4, editMode: true }, `Detail sazby ${rowTyped4.cis_sazby}`, 850, 500);
                        case 4 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.TypPhlPrevodVyjimkyKtgUPO */:
                            let rowTyped5 = row;
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVyjimkyKategoriiPohybu", { data: rowTyped5, editMode: true }, `Detail výjimky ${rowTyped5.typ_phl_z} -> ${rowTyped5.typ_phl_do}, ${rowTyped5.ktg_upo_z} -> ${rowTyped5.ktg_upo_do}`, 600, 300);
                        case 5 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniUPO */:
                            let rowTyped6 = row;
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniUPO", { data: rowTyped6, editMode: true }, `Detail záznamu`, 600, 300);
                        case 6 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.GenerovaniOPR */:
                            let rowTyped7 = row;
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GGenerovaniOPR", { data: rowTyped7, editMode: true }, `Detail záznamu`, 600, 300);
                        case 8 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.PolozkySMLProKatPohybu */:
                            let rowTyped8 = row;
                            return this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GPolozkySML", { data: rowTyped8, editMode: true }, `Detail záznamu`, 600, 300);
                        default:
                            return;
                    }
                }
                kopirovatAction() {
                    const that = this;
                    let ciselnik = this.defaultForm.findFields("ciselnik").gfield("getValue");
                    if (!ciselnik)
                        return;
                    let row = this.grid.ggrid("activeRow");
                    if (row == null)
                        return;
                    switch (ciselnik.Typ) {
                        case 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */:
                        case 1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */:
                            let rowTyped = row;
                            var def = $.Deferred();
                            this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GVyberTypuPohledavky", { typ_phl: rowTyped.typ_phl }, "Výběr zdrojového typu pohledávky", 600, 300)
                                .on("close", (ev, retVal) => {
                                if (retVal == null) {
                                    def.reject();
                                    return;
                                }
                                let prom = null;
                                switch (ciselnik.Typ) {
                                    case 0 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikRadku */:
                                        prom = that.isl.CiselnikRadku.copy(rq => { return { rq: { Data: { ixp_den: this.ixp_den, typ_phl: rowTyped.typ_phl, typ_phl_source: retVal.typ_phl } } }; })
                                            .get();
                                        break;
                                    case 1 /* Gordic.Ddp.Interface.LK.Enums.Ciselniky.GTypCiselniku.CiselnikCtvrti */:
                                        prom = that.isl.CiselnikCtvrti.copy(rq => { return { rq: { Data: { ixp_den: this.ixp_den, typ_phl: rowTyped.typ_phl, typ_phl_source: retVal.typ_phl } } }; })
                                            .get();
                                        break;
                                }
                                if (prom != null) {
                                    WebClient.Common.Base.ProcessResponse(prom, this, false)
                                        .done(() => {
                                        def.resolve(true);
                                    })
                                        .fail(() => {
                                        def.reject();
                                    });
                                }
                                else
                                    def.reject();
                            });
                            return def.promise();
                        default:
                            return;
                    }
                }
                finishAction(act) {
                    if (act != null) {
                        WebClient.Common.Base.ProcessResponse(act, this, false)
                            .always(() => {
                            this.refresh();
                        });
                    }
                }
                finishAction2(act) {
                    if (act != null) {
                        act.on("close", (ev, retVal) => {
                            if (retVal) {
                                this.refresh();
                            }
                        });
                    }
                }
                createActions() {
                    this.actions.addRange([{
                            name: "actGCiselnikyZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actGCiselnikyVyhledat",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                this.refresh();
                            }
                        },
                        {
                            name: "actGCiselnikyPridat",
                            caption: "Přidat",
                            icon: "fa-plus",
                            run: () => {
                                let act = this.pridatAction();
                                this.finishAction2(act);
                            }
                        },
                        {
                            name: "actGCiselnikyOdebrat",
                            caption: "Odebrat",
                            icon: "fa-trash",
                            run: () => {
                                let act = this.odebratAction();
                                this.finishAction(act);
                            }
                        },
                        {
                            name: "actGCiselnikyObnovit",
                            caption: "Obnovit",
                            icon: "fa-refresh",
                            run: () => {
                                let act = this.obnovitAction();
                                this.finishAction(act);
                            }
                        },
                        {
                            name: "actGCiselnikyUpravit",
                            caption: "Upravit",
                            icon: "fa-pencil",
                            run: () => {
                                let act = this.upravitAction();
                                this.finishAction2(act);
                            }
                        },
                        {
                            name: "actGCiselnikyKopirovat",
                            caption: "Kopírovat",
                            icon: "fa-clone",
                            run: () => {
                                let act = this.kopirovatAction();
                                if (act != null) {
                                    act.done((res) => {
                                        if (res)
                                            this.refresh();
                                    });
                                }
                            }
                        }]);
                }
            };
            GCiselniky2 = __decorate([
                Decorators.gcontent
            ], GCiselniky2);
            WebClient.GCiselniky2 = GCiselniky2;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Npc2VsbmlreTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHQ2lzZWxuaWt5Mi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQXlxQmY7QUF6cUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlxQm5CO0lBenFCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBeXFCN0I7UUF6cUJvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTtnQkFjekMsY0FBYztvQkFDVixJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDO29CQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLDZCQUE2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3pELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsd0JBQXdCO29CQUN4QiwwQkFBMEI7b0JBQzFCLHdEQUF3RDtvQkFDeEQsTUFBTTtvQkFFTixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRU8sU0FBUztvQkFDYixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUM7eUJBQzNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzt5QkFDeEIsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUU7d0JBQ3BELElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSw2QkFBNkI7d0JBQ3BDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFD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RyxDQUFDLENBQUM7d0JBQ3BMOzRCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsc0NBQXNDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNyTDs0QkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLDREQUE0RCxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDM007NEJBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyx1REFBdUQsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQy9LOzRCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsaUVBQWlFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUM3TDs0QkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLHdEQUF3RCxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FB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RyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0NBQ2pDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29DQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3Q0FDYixJQUFJLEdBQUc7NENBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUN2QixDQUFDLENBQUMsQ0FBQztnQ0FDUCxDQUFDOzRCQUNMLENBQUM7eUJBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsQ0FBQzthQUNKLENBQUE7WUF0cUJZLFdBQVc7Z0JBRHZCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsV0FBVyxDQXNxQnZCO1lBdHFCWSxxQkFBVyxjQXNxQnZCLENBQUE7UUFDTCxDQUFDLEVBenFCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeXFCN0I7SUFBRCxDQUFDLEVBenFCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeXFCbkI7QUFBRCxDQUFDLEVBenFCUyxNQUFNLEtBQU4sTUFBTSxRQXlxQmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR0Npc2VsbmlreTIudHMgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IMSMw61zZWxuw61reSAoesOhbG9oYSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnXFoSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNC0xNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0Npc2VsbmlreTIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0eXBfcGhsOiBzdHJpbmc7XHJcbiAgICAgICAgaXhzX2Z1bjogc3RyaW5nO1xyXG4gICAgICAgIGl4cF9kZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgcm9rOiBudW1iZXI7XHJcbiAgICAgICAgaWNvOiBzdHJpbmc7XHJcbiAgICAgICAgdWNzOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNpc2VsbmlreTogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG9bXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrSWQgPSBcImFjdEdDaXNlbG5pa3kyXCI7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBgxIzDrXNlbG7DrWt5IHR5cHUgcG9obGVkw6F2a3kgJHt0aGlzLnR5cF9waGx9YDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAvLyAgICBjYXB0aW9uOiB0aGlzLnRpdGxlLFxyXG4gICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3laYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIC8vfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHdWkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3VpKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcG9obGVkw6F2a3lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QudHlwUG9obGVkYXZreSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw61zZWxuw61rXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc2VsbmlrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuY2lzZWxuaWs9dmFsdWUuVHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhpcy5jaXNlbG5pa3ksIHsga2V5OiBcIlR5cFwiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHZhbHVlPzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUuVHlwID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUuTmF6ZXYgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHt2YWx1ZS5UeXB9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLk5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG91emVfYWt0aXZuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlpvYnJheml0IHBvdXplIGFrdGl2bsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgY3VzdG9tQ2xhc3M6IFwicmlnaHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCB7IHBhcmFtczogeyBwcmltYXJ5OiB0cnVlLCBjdXN0b21DbGFzczogXCJyaWdodFwiLCBpZDogXCJhY3RHQ2lzZWxuaWt5VnlobGVkYXRfYnV0dG9uXCIsIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVZ5aGxlZGF0XCJdIH0gfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW3tcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdFwiXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXRcIl0sXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0XCJdLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdFwiXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdFwiXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgRGF0YS5WaWV3KFtdKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVzaXplKCk7IC8vVE9ETzogcG9rdWQgbmVkb2pkZSBrIHNtYXrDoW7DrSBzb3Vib3J1LCBudXRubyB2ecWZZcWhaXQgdGVudG8gcHJvYmzDqW0uXHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgdHlwX3BobDogdGhpcy50eXBfcGhsLCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xlYW5HcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoXCJkZXN0cm95XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoeyBkYXRhOiBuZXcgRGF0YS5WaWV3KFtdKSB9KTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVBY3Rpb25zMih1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRWaWV3KGNpc2VsbmlrOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdSkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdldFJxID0gKGFrdDogYm9vbGVhbiA9IHRydWUpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhpcy50eXBfcGhsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChha3QpXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmFrdGl2aXRhID0gdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcInBvdXplX2FrdGl2bmlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT09IHRydWUgPyAxMDAgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiAkLmV4dGVuZCh7fSwgZmlsdGVyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCIqXCIsIFwiUGVybWlzc2lvbnNcIl1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0YXNrOiBJc2wuX1Rhc2s8YW55LCBhbnk+O1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkNpc2VsbmlrUmFka3U6XHJcbiAgICAgICAgICAgICAgICAgICAgdGFzayA9IHRoYXQuaXNsLkNpc2VsbmlrUmFka3UubGlzdChnZXRScSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGFzayA9IHRoYXQuaXNsLkNpc2VsbmlrQ3R2cnRpLmxpc3QoZ2V0UnEoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlZhemJ5UmFka3VBQ3R2cnRpOlxyXG4gICAgICAgICAgICAgICAgICAgIHRhc2sgPSB0aGF0LmlzbC5WYXpieVJhZGt1QUN0dnJ0aS5saXN0KGdldFJxKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5TYXpieVByaXBhZHU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGFzayA9IHRoYXQuaXNsLlNhemJ5UHJpcGFkdS5saXN0KGdldFJxKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5UeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPOlxyXG4gICAgICAgICAgICAgICAgICAgIHRhc2sgPSB0aGF0LmlzbC5WeWppbWt5S2F0ZWdvcmlpUG9oeWJ1Lmxpc3QoZ2V0UnEoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkdlbmVyb3ZhbmlVUE86XHJcbiAgICAgICAgICAgICAgICAgICAgdGFzayA9IHRoYXQuaXNsLkdlbmVyb3ZhbmlVUE8ubGlzdChnZXRScShmYWxzZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5HZW5lcm92YW5pT1BSOlxyXG4gICAgICAgICAgICAgICAgICAgIHRhc2sgPSB0aGF0LmlzbC5HZW5lcm92YW5pT1BSLmxpc3QoZ2V0UnEoZmFsc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuUG9sb3preVNNTFByb0thdFBvaHlidTpcclxuICAgICAgICAgICAgICAgICAgICB0YXNrID0gdGhhdC5pc2wuUG9sb3preVNNTC5saXN0KGdldFJxKGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLklzbC5WaWV3KHRhc2ssXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXREZWZhdWx0UHJvZmlsZShjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UpOiBHcmlkUHJvZmlsZTxvYmplY3Q+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgc3dpdGNoIChjaXNlbG5paykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5DaXNlbG5pa1JhZGt1OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbHVtbkxpc3Q6IFwiZGRwX3JhZGVrLCBuYXpldiwgaXhwX2RlbiwgcG96bmFta2EsIGFrdGl2aXRhXCIsIHJvd051bWJlcnM6IHRydWUgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY29sdW1uTGlzdDogXCJkZHBfY3R2cnQsIG5hemV2LCBpeHBfZGVuLCBwb3puYW1rYSwgYWt0aXZpdGFcIiwgcm93TnVtYmVyczogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5WYXpieVJhZGt1QUN0dnJ0aTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBjb2x1bW5MaXN0OiBcIml4cF9kZW4sIGRkcF9yYWRlaywgZGRwX2N0dnJ0LCBwb3puYW1rYSwgYWt0aXZpdGFcIiwgcm93TnVtYmVyczogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5TYXpieVByaXBhZHU6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY29sdW1uTGlzdDogXCJjaXNfc2F6YnksIHBvcGlzLCBzYXpiYSwgcG9jZXQsIHBvY19zcGxhdGVrLCBjX2NlbGssIHBvem5hbWthLCBha3Rpdml0YSwgY196MCwgY19kMCwgY196MSwgY19kMSwgY196MywgY19kMywgY196MiwgY19kMiwgY196YW9cIiwgcm93TnVtYmVyczogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5UeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbHVtbkxpc3Q6IFwidHlwX3BobF96LCB0eXBfcGhsX2RvLCBrdGdfdXBvX3osIGt0Z191cG9fZG8sIGFrdGl2aXRhXCIsIHJvd051bWJlcnM6IHRydWUgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuR2VuZXJvdmFuaVVQTzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBjb2x1bW5MaXN0OiBcInR5cF9waGwsIHJvaywgaWNvLCB1Y3MsIGt0Z191cG8sIHByaXpfZ2VuX3Vwb1wiLCByb3dOdW1iZXJzOiB0cnVlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkdlbmVyb3ZhbmlPUFI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY29sdW1uTGlzdDogXCJ0eXBfcGhsLCByb2ssIGljbywgdWNzLCBrdGdfdXBvLCBwcml6X2dlbl9vcHJcIiwgcm93TnVtYmVyczogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5Qb2xvemt5U01MUHJvS2F0UG9oeWJ1OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbHVtbkxpc3Q6IFwidHlwX3BobCwga3RnX3VwbywgdHlwX3ZzbVwiLCByb3dOdW1iZXJzOiB0cnVlIH07XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0Q29udGVudFRpdGxlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYMSMw61zZWxuw61reSB0eXB1IHBvaGxlZMOhdmt5ICR7dGhpcy50eXBfcGhsfWA7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgLnBhcmVudChcIi51aS1kaWFsb2dcIilcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbihcIi51aS1kaWFsb2ctdGl0bGViYXJcIilcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbihcIi51aS1kaWFsb2ctdGl0bGVcIilcclxuICAgICAgICAgICAgICAgIC50ZXh0KHRoaXMudGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWZyZXNoKCkge1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyOiB7IHR5cF9waGw/OiBzdHJpbmcsIGNpc2VsbmlrPzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UgfSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcInR5cF9waGxcIiwgXCJjaXNlbG5pa1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIudHlwX3BobCA9PSBudWxsIHx8IGZpbHRlci5jaXNlbG5payA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFuR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR5cF9waGwgPSBmaWx0ZXIudHlwX3BobDtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50VGl0bGUoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5nZXRWaWV3KGZpbHRlci5jaXNlbG5payk7XHJcbiAgICAgICAgICAgIGlmICghdmlldykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhbkdyaWQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGFjYSA9IHRoaXMuZ3JpZC5nZ3JpZChcImFjdGl2ZUNlbGxBZGRyZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKFwiZGVzdHJveVwiKTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVBY3Rpb25zMih1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkZHBfdHlweV9wb2hsZWRhdmVrX2Npc2VsbmlrX1wiICsgZmlsdGVyLmNpc2VsbmlrLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuQ2lzZWxuaWsoZmlsdGVyLmNpc2VsbmlrKSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB0aGlzLmdldERlZmF1bHRQcm9maWxlKGZpbHRlci5jaXNlbG5payksXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQWN0aW9uczIob2JqLmNlbGxJbmZvLnJvdyA+PSAwID8gb2JqLmNlbGxJbmZvLmRhdGEuUGVybWlzc2lvbnMgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhY2EgIT0gbnVsbCAmJiBhY2Eucm93ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5nZ3JpZChcImdldFZpZXdcIilcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0TG9hZGluZ1Byb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWQuZ2dyaWQoXCJhY3RpdmVDZWxsQWRkcmVzc1wiLCBhY2Eucm93LCBhY2EuY29sKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVBY3Rpb25zMihwZXJtOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKHBlcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXRcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5DcmVhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdFwiXSEudXBkYXRlUGVybWlzc2lvbihwZXJtLCBcIkNhbkRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuUmVzdG9yZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lVcHJhdml0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHBlcm0sIFwiQ2FuRWRpdFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXRcIl0hLnVwZGF0ZVBlcm1pc3Npb24ocGVybSwgXCJDYW5Db3B5XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNpc2VsbmlrOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uQ2lzZWxuaWt5LkdDaXNlbG5pa0R0byA9IHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJjaXNlbG5pa1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXRcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogY2lzZWxuaWsgIT0gbnVsbCB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPZGVicmF0XCJdIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9ibm92aXRcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdFwiXSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lLb3Bpcm92YXRcIl0hLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lQcmlkYXRcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreVByaWRhdFwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXRcIl0hLnZpc2libGUodGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreU9kZWJyYXRcIl0hLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0XCJdIS52aXNpYmxlKHRoaXMuYWN0aW9uc1tcImFjdEdDaXNlbG5pa3lPYm5vdml0XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdFwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5VXByYXZpdFwiXSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdFwiXSEudmlzaWJsZSh0aGlzLmFjdGlvbnNbXCJhY3RHQ2lzZWxuaWt5S29waXJvdmF0XCJdIS5lbmFibGVkKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmlkYXRBY3Rpb24oKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgIGxldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmICghY2lzZWxuaWspXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrLlR5cCEpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdDaXNlbG5pa1JhZGt1XCIsIHsgZGF0YTogeyB0eXBfcGhsOiB0aGlzLnR5cF9waGwsIGl4cF9kZW46IHRoaXMuaXhwX2RlbiB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDvSDFmcOhZGVrXCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HQ2lzZWxuaWtDdHZydGlcIiwgeyBkYXRhOiB7IHR5cF9waGw6IHRoaXMudHlwX3BobCwgaXhwX2RlbjogdGhpcy5peHBfZGVuIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIk5vdsOhIMSNdHZyxaVcIiwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5WYXpieVJhZGt1QUN0dnJ0aTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HVmF6YnlSYWRrdUFDdHZydGlcIiwgeyBkYXRhOiB7IHR5cF9waGw6IHRoaXMudHlwX3BobCwgaXhwX2RlbjogdGhpcy5peHBfZGVuIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIk5vdsOhIHZhemJhXCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuU2F6YnlQcmlwYWR1OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdTYXpieVByaXBhZHVcIiwgeyBkYXRhOiB7IHR5cF9waGw6IHRoaXMudHlwX3BobCB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDoSBzYXpiYVwiLCA4NTAsIDUwMCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlR5cFBobFByZXZvZFZ5amlta3lLdGdVUE86XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR1Z5amlta3lLYXRlZ29yaWlQb2h5YnVcIiwgeyBkYXRhOiB7IHR5cF9waGxfejogdGhpcy50eXBfcGhsIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIk5vdsOhIHbDvWppbWthXCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuR2VuZXJvdmFuaVVQTzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HR2VuZXJvdmFuaVVQT1wiLCB7IGRhdGE6IHsgdHlwX3BobDogdGhpcy50eXBfcGhsLCByb2s6IHRoaXMucm9rLCBpY286IHRoaXMuaWNvLCB1Y3M6IHRoaXMudWNzIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIk5vdsO9IHrDoXpuYW1cIiwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5HZW5lcm92YW5pT1BSOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdHZW5lcm92YW5pT1BSXCIsIHsgZGF0YTogeyB0eXBfcGhsOiB0aGlzLnR5cF9waGwsIHJvazogdGhpcy5yb2ssIGljbzogdGhpcy5pY28sIHVjczogdGhpcy51Y3MgfSwgZWRpdE1vZGU6IGZhbHNlIH0sIFwiTm92w70gesOhem5hbVwiLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlBvbG96a3lTTUxQcm9LYXRQb2h5YnU6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR1BvbG96a3lTTUxcIiwgeyBkYXRhOiB7IHR5cF9waGw6IHRoaXMudHlwX3BobCB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJOb3bDvSB6w6F6bmFtXCIsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9kZWJyYXRBY3Rpb24oKTogSlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuTEsuSXNsLkNvbW1vbi5HUmVzcG9uc2U8YW55Pj4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGNpc2VsbmlrOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uQ2lzZWxuaWt5LkdDaXNlbG5pa0R0byA9IHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJjaXNlbG5pa1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKCFjaXNlbG5paylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2lzZWxuaWsuVHlwISkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5DaXNlbG5pa1JhZGt1OlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Npc2VsbmlrUmFka3VEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5DaXNlbG5pa1JhZGt1LmRlbGV0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbjogcm93VHlwZWQuaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogcm93VHlwZWQudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGRwX3JhZGVrOiByb3dUeXBlZC5kZHBfcmFkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkNpc2VsbmlrQ3R2cnRpOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDIgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdDaXNlbG5pa0N0dnJ0aUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkNpc2VsbmlrQ3R2cnRpLmRlbGV0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbjogcm93VHlwZWQyLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHJvd1R5cGVkMi50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZHBfY3R2cnQ6IHJvd1R5cGVkMi5kZHBfY3R2cnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlZhemJ5UmFka3VBQ3R2cnRpOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDMgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWYXpieVJhZGt1QUN0dnJ0aUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlZhemJ5UmFka3VBQ3R2cnRpLmRlbGV0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbjogcm93VHlwZWQzLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHJvd1R5cGVkMy50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZHBfcmFkZWs6IHJvd1R5cGVkMy5kZHBfcmFkZWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkcF9jdHZydDogcm93VHlwZWQzLmRkcF9jdHZydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuU2F6YnlQcmlwYWR1OlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDQgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTYXpieVByaXBhZHVEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5TYXpieVByaXBhZHUuZGVsZXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3dUeXBlZDQudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzX3NhemJ5OiByb3dUeXBlZDQuY2lzX3NhemJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5UeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDUgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeWppbWt5S2F0ZWdvcmlpUG9oeWJ1RHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuVnlqaW1reUthdGVnb3JpaVBvaHlidS5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGxfejogcm93VHlwZWQ1LnR5cF9waGxfeixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobF9kbzogcm93VHlwZWQ1LnR5cF9waGxfZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG9fejogcm93VHlwZWQ1Lmt0Z191cG9feixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3Vwb19kbzogcm93VHlwZWQ1Lmt0Z191cG9fZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkdlbmVyb3ZhbmlVUE86XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNiA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0dlbmVyb3ZhbmlVUE9EdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5HZW5lcm92YW5pVVBPLmRlbGV0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogcm93VHlwZWQ2LnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogcm93VHlwZWQ2LnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiByb3dUeXBlZDYudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHJvd1R5cGVkNi5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IHJvd1R5cGVkNi5rdGdfdXBvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5HZW5lcm92YW5pT1BSOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDcgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdHZW5lcm92YW5pT1BSRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuR2VuZXJvdmFuaU9QUi5kZWxldGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHJvd1R5cGVkNy50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHJvd1R5cGVkNy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogcm93VHlwZWQ3LnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiByb3dUeXBlZDcuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiByb3dUeXBlZDcua3RnX3Vwb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuUG9sb3preVNNTFByb0thdFBvaHlidTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ4ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUG9sb3preVNNTER0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlBvbG96a3lTTUwuZGVsZXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3dUeXBlZDgudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3Vwbzogcm93VHlwZWQ4Lmt0Z191cG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvYm5vdml0QWN0aW9uKCk6IEpRdWVyeVByb21pc2U8SW50ZXJmYWNlLkxLLklzbC5Db21tb24uR1Jlc3BvbnNlPGFueT4+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmICghY2lzZWxuaWspXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrLlR5cCEpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdDaXNlbG5pa1JhZGt1RHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByb3dUeXBlZC5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuQ2lzZWxuaWtSYWRrdS51cGRhdGUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiByb3dUeXBlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkMiA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Npc2VsbmlrQ3R2cnRpRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByb3dUeXBlZDIuYWt0aXZpdGEgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkNpc2VsbmlrQ3R2cnRpLnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1R5cGVkMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuVmF6YnlSYWRrdUFDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkMyA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ZhemJ5UmFka3VBQ3R2cnRpRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByb3dUeXBlZDMuYWt0aXZpdGEgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlZhemJ5UmFka3VBQ3R2cnRpLnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1R5cGVkM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuU2F6YnlQcmlwYWR1OlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDQgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTYXpieVByaXBhZHVEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd1R5cGVkNC5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuU2F6YnlQcmlwYWR1LnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHJvd1R5cGVkNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuVHlwUGhsUHJldm9kVnlqaW1reUt0Z1VQTzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ1ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnlqaW1reUthdGVnb3JpaVBvaHlidUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93VHlwZWQ1LmFrdGl2aXRhID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5WeWppbWt5S2F0ZWdvcmlpUG9oeWJ1LnVwZGF0ZShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobF96OiByb3dUeXBlZDUudHlwX3BobF96LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsX2RvOiByb3dUeXBlZDUudHlwX3BobF9kbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3Vwb196OiByb3dUeXBlZDUua3RnX3Vwb196LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvX2RvOiByb3dUeXBlZDUua3RnX3Vwb19kbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGVkRGF0YTogcm93VHlwZWQ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuUG9sb3preVNNTFByb0thdFBvaHlidTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ2ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUG9sb3preVNNTER0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlBvbG96a3lTTUwudXBkYXRlKHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YTogcm93VHlwZWQ2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXByYXZpdEFjdGlvbigpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmICghY2lzZWxuaWspXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrLlR5cCEpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdDaXNlbG5pa1JhZGt1RHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdDaXNlbG5pa1JhZGt1XCIsIHsgZGF0YTogcm93VHlwZWQsIGVkaXRNb2RlOiB0cnVlIH0sIGBEZXRhaWwgxZnDoWRrdSAke3Jvd1R5cGVkLmRkcF9yYWRla31gLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LkNpc2VsbmlrQ3R2cnRpOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDIgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdDaXNlbG5pa0N0dnJ0aUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HQ2lzZWxuaWtDdHZydGlcIiwgeyBkYXRhOiByb3dUeXBlZDIsIGVkaXRNb2RlOiB0cnVlIH0sIGBEZXRhaWwgxI10dnJ0aSAke3Jvd1R5cGVkMi5kZHBfY3R2cnR9YCwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5WYXpieVJhZGt1QUN0dnJ0aTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQzID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVmF6YnlSYWRrdUFDdHZydGlEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdWYXpieVJhZGt1QUN0dnJ0aVwiLCB7IGRhdGE6IHJvd1R5cGVkMywgZWRpdE1vZGU6IHRydWUgfSwgXCJEZXRhaWwgdmF6YnlcIiwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5TYXpieVByaXBhZHU6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkNCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NhemJ5UHJpcGFkdUR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR1NhemJ5UHJpcGFkdVwiLCB7IGRhdGE6IHJvd1R5cGVkNCwgZWRpdE1vZGU6IHRydWUgfSwgYERldGFpbCBzYXpieSAke3Jvd1R5cGVkNC5jaXNfc2F6Ynl9YCwgODUwLCA1MDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5UeXBQaGxQcmV2b2RWeWppbWt5S3RnVVBPOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDUgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeWppbWt5S2F0ZWdvcmlpUG9oeWJ1RHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HVnlqaW1reUthdGVnb3JpaVBvaHlidVwiLCB7IGRhdGE6IHJvd1R5cGVkNSwgZWRpdE1vZGU6IHRydWUgfSwgYERldGFpbCB2w71qaW1reSAke3Jvd1R5cGVkNS50eXBfcGhsX3p9IC0+ICR7cm93VHlwZWQ1LnR5cF9waGxfZG99LCAke3Jvd1R5cGVkNS5rdGdfdXBvX3p9IC0+ICR7cm93VHlwZWQ1Lmt0Z191cG9fZG99YCwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5FbnVtcy5DaXNlbG5pa3kuR1R5cENpc2VsbmlrdS5HZW5lcm92YW5pVVBPOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dUeXBlZDYgPSA8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdHZW5lcm92YW5pVVBPRHRvPnJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HR2VuZXJvdmFuaVVQT1wiLCB7IGRhdGE6IHJvd1R5cGVkNiwgZWRpdE1vZGU6IHRydWUgfSwgYERldGFpbCB6w6F6bmFtdWAsIDYwMCwgMzAwKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuR2VuZXJvdmFuaU9QUjpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93VHlwZWQ3ID0gPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HR2VuZXJvdmFuaU9QUkR0bz5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR0dlbmVyb3ZhbmlPUFJcIiwgeyBkYXRhOiByb3dUeXBlZDcsIGVkaXRNb2RlOiB0cnVlIH0sIGBEZXRhaWwgesOhem5hbXVgLCA2MDAsIDMwMCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkVudW1zLkNpc2VsbmlreS5HVHlwQ2lzZWxuaWt1LlBvbG96a3lTTUxQcm9LYXRQb2h5YnU6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkOCA9IDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1BvbG96a3lTTUxEdG8+cm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuQ2lzZWxuaWt5LkdQb2xvemt5U01MXCIsIHsgZGF0YTogcm93VHlwZWQ4LCBlZGl0TW9kZTogdHJ1ZSB9LCBgRGV0YWlsIHrDoXpuYW11YCwgNjAwLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUga29waXJvdmF0QWN0aW9uKCk6IEpRdWVyeS5Qcm9taXNlPGFueSwgYW55LCBhbnk+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBjaXNlbG5pazogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNpc2VsbmlreS5HQ2lzZWxuaWtEdG8gPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiY2lzZWxuaWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmICghY2lzZWxuaWspXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICBpZiAocm93ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrLlR5cCEpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd1R5cGVkID0gPHsgdHlwX3BobDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB9PnJvdztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5DaXNlbG5pa3kuR1Z5YmVyVHlwdVBvaGxlZGF2a3lcIiwgeyB0eXBfcGhsOiByb3dUeXBlZC50eXBfcGhsIH0sIFwiVsO9YsSbciB6ZHJvam92w6lobyB0eXB1IHBvaGxlZMOhdmt5XCIsIDYwMCwgMzAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvbTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNpc2VsbmlrLlR5cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtSYWRrdTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbSA9IHRoYXQuaXNsLkNpc2VsbmlrUmFka3UuY29weShycSA9PiB7IHJldHVybiB7IHJxOiB7IERhdGE6IHsgaXhwX2RlbjogdGhpcy5peHBfZGVuLCB0eXBfcGhsOiByb3dUeXBlZC50eXBfcGhsLCB0eXBfcGhsX3NvdXJjZTogcmV0VmFsLnR5cF9waGwgfSB9IH07IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRW51bXMuQ2lzZWxuaWt5LkdUeXBDaXNlbG5pa3UuQ2lzZWxuaWtDdHZydGk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb20gPSB0aGF0LmlzbC5DaXNlbG5pa0N0dnJ0aS5jb3B5KHJxID0+IHsgcmV0dXJuIHsgcnE6IHsgRGF0YTogeyBpeHBfZGVuOiB0aGlzLml4cF9kZW4sIHR5cF9waGw6IHJvd1R5cGVkLnR5cF9waGwsIHR5cF9waGxfc291cmNlOiByZXRWYWwudHlwX3BobCB9IH0gfTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb20gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLlByb2Nlc3NSZXNwb25zZShwcm9tLCB0aGlzLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGZpbmlzaEFjdGlvbihhY3Q6IEpRdWVyeVByb21pc2U8SW50ZXJmYWNlLkxLLklzbC5Db21tb24uR1Jlc3BvbnNlPGFueT4+IHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChhY3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKGFjdCwgdGhpcywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGZpbmlzaEFjdGlvbjIoYWN0OiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChhY3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYWN0Lm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZShbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5WmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lWeWhsZWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lQcmlkYXRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy5wcmlkYXRBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaEFjdGlvbjIoYWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2RlYnJhdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZGVicmF0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy5vZGVicmF0QWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5pc2hBY3Rpb24oYWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHQ2lzZWxuaWt5T2Jub3ZpdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLm9ibm92aXRBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaEFjdGlvbihhY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdDaXNlbG5pa3lVcHJhdml0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVwcmF2aXRcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtcGVuY2lsXCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy51cHJhdml0QWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5pc2hBY3Rpb24yKGFjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0Npc2VsbmlreUtvcGlyb3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb3DDrXJvdmF0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNsb25lXCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWN0ID0gdGhpcy5rb3Bpcm92YXRBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0LmRvbmUoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19