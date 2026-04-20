"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GTypyPohledavek2.ts                    </Name>
//    <Description> Typy pohled�vek - z�loha star�ho �e�en�                     </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   � GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-01-08                                                  </Created>
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
            var Controls;
            (function (Controls) {
                var TypyPohledavek2;
                (function (TypyPohledavek2) {
                    let GTypyPohledavek2 = 
                    //export class GTypyPohledavek extends GContentBase {
                    class GTypyPohledavek2 extends Gordic.GContentBase {
                        constructor() {
                            super(...arguments);
                            this.srv = new GContent("Gordic.Ddp.WebClient.Ajax.GTypPohledavky");
                            this.taskRunning = false;
                            this.currentTask = "#no_task#";
                        }
                        //!na�ten� contentu str�nky
                        onContentReady() {
                            debugger;
                            var that = this;
                            this.taskId = "actGTypyPohledavek2";
                            this.title = "Typy pohled�vek2";
                            //! vytvo�en� akc�
                            this.createActions();
                            //! nastaven� breadcrumbu
                            this.setBreadcrumbs([{
                                    caption: "Typy pohled�vek2",
                                    action: this.actions["actGTypyPohledavekZavritPotomky"]
                                }]);
                            //! menu
                            this.createMenu();
                            //! definice formul��e filterpanelu
                            this.filterForm = this.createForm();
                            //Xthis.filterForm.findFields("rok").gfield("model", "apply", { rok: this.rok });
                            //this.defaultForm = this.createForm();
                            //! filter
                            this.filter = $.newDiv().appendTo(this.element)
                                .gfilterpanel(Gordic.Eko.Filters.getFilterParams([this.filterForm], // formul��
                            [], // obl�ben�
                            "", // t�ma
                            null, // sloupec pro filtr *vlastn�
                            undefined));
                            //! View - star�
                            //this.view = new Gordic.Isl.View(that.isl.TypPohledavky.list(
                            //    rq => {
                            //        return {
                            //            //filters: this.filter,
                            //            filters: this.getFilters(),
                            //            //filterPanel: that.$filterForm,
                            //        };
                            //    }), { filterPanel: this.filter });
                            //! View - pokus mix oboj�ho.
                            //this.view = new Gordic.Isl.View(that.isl.TypPohledavky.list(
                            //    rq => {
                            //        return {
                            //            //filters: this.filter,
                            //            filters: this.getFilters(),
                            //            //filterPanel: that.$filterForm,
                            //        };
                            //    }),
                            //    {
                            //        filterPanel: this.filter,
                            //        key: ["typ_phl"],
                            //        startEmpty: true,
                            //    }
                            //);
                            //! View - podle p�edlohy
                            this.view = new Gordic.Isl.View(that.isl.TypPohledavky.list(rq => rq), {
                                filterPanel: this.filter,
                                key: ["typ_phl"],
                                startEmpty: true,
                            });
                            //! vytvo�en� ggridu
                            this.grid = this.createGrid();
                            //this.filter.findFields("rok").gfield("model", "apply", { rok: this.rok });
                            //if (this.userSettings != null) {
                            //    let savedFilter = this.userSettings.get("GTypyPohledavekFilter");
                            //    if (savedFilter != null) {
                            //        this.filter!
                            //            .findFields()
                            //            .gfield("model", "apply", savedFilter);
                            //    }
                            //}
                            //this.filter.gform("waitForValues").always(() => {
                            //    this.grid = this.createGrid();
                            //});
                            var focusFunc = function () {
                                that.grid.ggrid("focus");
                                that.view.off("change.focus", focusFunc);
                            };
                            this.view.on("change.focus", focusFunc);
                        }
                        createActions() {
                            this.actions.addRange([{
                                    name: "actGTypyPohledavekZavritPotomky",
                                    run: () => {
                                        this.tryCloseAllSignificants();
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekVyhledat",
                                    caption: "Vyhledat",
                                    run: () => {
                                        this.vyhledat();
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekUzHrom",
                                    caption: "Uzav��t hromadn�",
                                    run: () => {
                                        let sel = this.grid.ggrid("getSelection");
                                        if (sel.length === 0) {
                                            this.dialogs.error("��dn� polo�ky k uzav�en�", "Vyberte v seznamu v�echny typy pohled�vek, kter� chcete uzav��t.");
                                            return;
                                        }
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GDatumUzaverky", { ID: "DDPGDatumUzaverky#" }, "Zad�n� data uz�v�rky", 515, 400, true)
                                            .on("close", (ev, dat_uzav) => {
                                            if (dat_uzav == null)
                                                return;
                                            if (this.ddp_rad_hdauza !== "0" && dat_uzav > this.dnes) {
                                                this.dialogs.error("Chybn� datum uz�v�rky", "Nen� povoleno prov�d�t uz�v�rky k datu vy���mu ne� je dne�n�.");
                                                return;
                                            }
                                            if (sel.some(x => x.Nastaveni.rok !== dat_uzav.getFullYear())) {
                                                this.dialogs.error("Chybn� datum uz�v�rky", "Datum uz�v�rky nespad� do zpracov�van�ho obdob�.");
                                                return;
                                            }
                                            Gordic.Isl.TypPohledavky.datumUzavreniAktualnihoTypuPohledavky({})
                                                .get()
                                                .done((posledni_dat_uzav) => {
                                                let dat_uzav_typ_phl = parseDate(posledni_dat_uzav);
                                                if (dat_uzav.getFullYear() !== dat_uzav_typ_phl.getFullYear() && dat_uzav_typ_phl.getDay() != 30 && dat_uzav_typ_phl.getMonth() !== 11) {
                                                    this.dialogs.confirm("Pokra�ovat?", `Byla zad�na uz�v�rka do jin�ho roku (${dat_uzav.getFullYear()}) ne� je rok posledn� uz�v�rky (${dat_uzav_typ_phl.getFullYear()}).<br>Chcete pokra�ovat?`)
                                                        .on("close", (ev3, retVal3) => {
                                                        if (retVal3 === "yes") {
                                                            this.hlavniUzaverka(dat_uzav, sel);
                                                        }
                                                    });
                                                }
                                                else {
                                                    this.hlavniUzaverka(dat_uzav, sel);
                                                }
                                            });
                                        });
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekHistUz",
                                    caption: "Historie uz�v�rek",
                                    run: () => {
                                        let sel = this.grid.ggrid("getSelection");
                                        let pars;
                                        if (sel.length === 0) {
                                            pars = { vsechny: true };
                                        }
                                        else if (sel.length === 1)
                                            pars = { typ_phl: sel[0].typ_phl };
                                        else
                                            pars = null;
                                        this.dialogs.showWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GHistorieUzaverek", pars, "Historie uz�v�rek", 800, 600);
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekGenOprPol",
                                    caption: "Generovat opravn� polo�ky",
                                    run: () => {
                                        let sel = this.grid.ggrid("getSelection");
                                        if (sel.length === 0) {
                                            this.dialogs.error("Vyberte typy pohled�vek", "Vyberte v seznamu v�echny typy pohled�vek, kde chcete generovat opravn� polo�ky.");
                                            return;
                                        }
                                        this.dialogs.showModalWindow('Gordic.Ddp.WebClient.Controls.TypyPohledavek.GDatumOpravy', { ID: "DDPGDatumOpravy#", }, "Parametry generovan� opravn�ch polo�ek", 515, 215, true)
                                            .on("close", (ev, retVal) => {
                                            if (retVal == null)
                                                return;
                                            let data = {};
                                            let chyby = [];
                                            sel.forEach((x) => {
                                                if (x.gen_opr !== 0)
                                                    data[x.typ_phl] = x.nazev;
                                                else
                                                    chyby.push(`Generovan� opravn�ch polo�ek nen� povolen pro typ pohled�vky '${x.nazev}' (${x.typ_phl}).`);
                                            });
                                            if (this.ddp_rad_prenrz !== "0") {
                                                this.dialogs.confirm("P�e��tovat pohled�vky OPP - saldo?", "Chcete sou�asn� s generov�n�m opravn�ch polo�ek prov�st i p�e��tov�n� pohled�vky OPP - saldo?")
                                                    .on("close", (ev2, retVal2) => {
                                                    retVal.odpisy = (retVal2 === "yes" ? true : false);
                                                    this.opravy(retVal, data, chyby);
                                                });
                                            }
                                            else {
                                                retVal.odpisy = false;
                                                this.opravy(retVal, data, chyby);
                                            }
                                        });
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekPripKUzav",
                                    caption: "P��prava k uzav�en�",
                                    run: () => {
                                        let sel = this.grid.ggrid("getSelection");
                                        if (sel.length === 0) {
                                            this.dialogs.error("Vyberte polo�ky", "Vyberte typy pohled�vek pro p��pravu k uzav�en�.");
                                            return;
                                        }
                                        let roky = sel.map(x => x.Nastaveni.rok).filter((value, index, array) => array.indexOf(value) === index);
                                        this.beginOperation();
                                        let r = { roky: roky };
                                        Gordic.Isl.TypPohledavky.povolenaPripravaUzavreni(r)
                                            .get()
                                            .done((data) => {
                                            this.endOperation();
                                            if (!data) {
                                                this.dialogs.error("Nelze prov�st", "Nelze prov�st p��pravu k uzav�en� roku.<br><br><br>Zkontrolujte pros�m pro v�echny vybran� roky zda:<br>- byla zah�jena ro�n� uz�v�rka modulem INU<br>- je uzav�en modul INT");
                                                return;
                                            }
                                            this.dialogs.confirm("Prov�st p��pravu k ro�n� uz�v�rce?", "Opravdu chcete prov�st p��pravu k ro�n� uz�v�rce vybran�ch typ� pohled�vek?<br>Tato operace je nevratn�.")
                                                .on("close", (ev, retVal) => {
                                                if (retVal !== "yes")
                                                    return;
                                                let data2 = sel.map(x => {
                                                    return {
                                                        typ_phl: x.typ_phl,
                                                        rok: x.Nastaveni.rok,
                                                        dat_uzav: x.Nastaveni.dat_uzav,
                                                        priz_spr: x.Nastaveni.priz_spr,
                                                        stav_phl: x.Nastaveni.stav_phl,
                                                        nazev: x.nazev
                                                    };
                                                });
                                                this.beginOperation();
                                                this.srv.call("HromadnaPripravaUzavreni", { data: data2 })
                                                    .done((result) => {
                                                    this.endOperation();
                                                    if (result.chyby == null || result.chyby.length == 0) {
                                                        this.showFlash(result.zprava, "g-state-success", 10000);
                                                    }
                                                    else {
                                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek p��pravy k ro�n� uz�v�rce", 800, 600);
                                                    }
                                                    this.view.requestData();
                                                })
                                                    .fail(() => {
                                                    this.showFlash("Chyba p�i p��prav� k ro�n� uzav�rce.", "g-state-error", 10000);
                                                    this.endOperation();
                                                });
                                            });
                                        })
                                            .fail(() => {
                                            this.endOperation();
                                            this.showFlash("Nelze prov�st p��pravu k uzav�en� roku. Nezn�m� chyba.", "g-state-error", 10000);
                                        });
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekUzavreni",
                                    caption: "Uzav�en�",
                                    run: () => {
                                        let sel = this.grid.ggrid("getSelection");
                                        if (sel.length === 0) {
                                            this.dialogs.error("Vyberte polo�ky", "Vyberte typy pohled�vek k uzav�en�.");
                                            return;
                                        }
                                        if (this.ddp_rad_poupro) {
                                            this.dialogs.error("Pouze pro �ten�", "Je nastaven pouze re�im prohl�en� - nelze prov�st uz�v�rku.<br>'Parametr DDP - �P - re�im prohl�en�' dat m� hodnotu ANO.");
                                            return;
                                        }
                                        let roky = sel.map(x => x.Nastaveni.rok).filter((value, index, array) => array.indexOf(value) === index);
                                        let r = { roky: roky };
                                        this.beginOperation();
                                        Gordic.Isl.TypPohledavky.pocetNepripravenychKUzaverce(r)
                                            .get()
                                            .done((pocetNepripravenych) => {
                                            this.endOperation();
                                            if (pocetNepripravenych != 0) {
                                                this.dialogs.error("Chyba", `V�echny typy pohled�vek nejsou p�ipraveny k uz�v�rce.<br>Celkem nep�ipraven�ch typ� pohled�vek k uz�v�rce: ${pocetNepripravenych}.`);
                                                return;
                                            }
                                            this.beginOperation();
                                            Gordic.Isl.TypPohledavky.pocetNeuzavrenychAgend(r)
                                                .get()
                                                .done((pocetNeuzavrenych) => {
                                                this.endOperation();
                                                if (pocetNeuzavrenych != 0) {
                                                    this.dialogs.error("Chyba", `Nejsou uzav�eny (nebo vyjmuty u uz�v�rek) v�echny agendy (BUC, FUC, INT nebo POK).<br>Celkem neuzav�en�ch agend: ${pocetNeuzavrenych}.`);
                                                    return;
                                                }
                                                this.dialogs.confirm("Prov�st ro�n� uz�v�rku?", "Opravdu prov�st ro�n� uz�v�rku vybran�ch typ� pohled�vek?<br>Tato operace je nevratn�.")
                                                    .on("close", (ev, retVal) => {
                                                    if (retVal !== "yes")
                                                        return;
                                                    let data = sel.map(x => {
                                                        return {
                                                            typ_phl: x.typ_phl,
                                                            rok: x.Nastaveni.rok,
                                                            stav_phl: x.Nastaveni.stav_phl,
                                                            nazev: x.nazev
                                                        };
                                                    });
                                                    this.beginOperation();
                                                    this.srv.call("HromadneRocniUzavreni", { data: data })
                                                        .done((result) => {
                                                        this.endOperation();
                                                        if (result.chyby == null || result.chyby.length == 0) {
                                                            this.showFlash(result.zprava, "g-state-success", 10000);
                                                        }
                                                        else {
                                                            this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek uz�v�rky", 800, 600);
                                                        }
                                                        this.view.requestData();
                                                    })
                                                        .fail(() => {
                                                        this.showFlash("Chyba p�i hromadn� uz�v�rce.", "g-state-error", 10000);
                                                        this.endOperation();
                                                    });
                                                });
                                            })
                                                .fail(() => {
                                                this.endOperation();
                                                this.showFlash("Nelze prov�st k uzav�en�. Nezn�m� chyba.", "g-state-error", 10000);
                                            });
                                        })
                                            .fail(() => {
                                            this.endOperation();
                                            this.showFlash("Nelze prov�st k uzav�en�. Nezn�m� chyba.", "g-state-error", 10000);
                                        });
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekOtevreni",
                                    caption: "Otev�en�",
                                    run: () => {
                                        let sel = this.grid.ggrid("getSelection");
                                        if (sel.length === 0) {
                                            this.dialogs.error("Vyberte polo�ky", "Vyberte typy pohled�vek k otev�en�.");
                                            return;
                                        }
                                        this.dialogs.confirm("Prov�st hromadn� otev�en�?", `Opravdu prov�st hromadn� otev�en� vybran�ch typ� pohled�vek do roku ${this.rokDen}?<br>Tato operace je nevratn�.`)
                                            .on("close", (ev, retVal) => {
                                            if (retVal !== "yes")
                                                return;
                                            let data = sel.map(x => {
                                                return {
                                                    typ_phl: x.typ_phl,
                                                    rok: x.Nastaveni.rok,
                                                    stav_phl: x.Nastaveni.stav_phl,
                                                    nazev: x.nazev
                                                };
                                            });
                                            this.beginOperation();
                                            this.srv.call("HromadneRocniOtevreni", { data: data })
                                                .done((result) => {
                                                this.endOperation();
                                                if (result.chyby == null || result.chyby.length == 0) {
                                                    this.showFlash(result.zprava, "g-state-success", 10000);
                                                }
                                                else {
                                                    this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek otev�en�", 800, 600);
                                                }
                                                this.view.requestData();
                                            })
                                                .fail(() => {
                                                this.showFlash("Chyba p�i hromadn�m otev�r�n� typ� pohled�vek.", "g-state-error", 10000);
                                                this.endOperation();
                                            });
                                        });
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekOznOtev",
                                    caption: "Ozn. otev.",
                                    run: () => {
                                        let sel = this.grid.ggrid("getSelection");
                                        if (sel.length === 0) {
                                            this.dialogs.error("Vyberte polo�ky", "Vyberte typy pohled�vek, kter� chcete ozna�it jako otev�en�.");
                                            return;
                                        }
                                        let roky = sel.map(x => x.Nastaveni.rok).filter((value, index, array) => array.indexOf(value) === index).join(", ");
                                        this.dialogs.confirm("Ozna�it jako otev�en�?", `Opravdu ozna�it v�echny vybran� typy pohled�vek pro rok ${roky} jako otev�en�?<br>Neprob�hnou ��dn� v�po�ty souvisej�c� s otev�en�m typu pohled�vky do nov�ho roku.<br>Tato operace je nevratn�.`)
                                            .on("close", (ev, retVal) => {
                                            if (retVal !== "yes")
                                                return;
                                            let data = sel.map(x => {
                                                return {
                                                    typ_phl: x.typ_phl,
                                                    rok: x.Nastaveni.rok,
                                                    stav_phl: x.Nastaveni.stav_phl,
                                                    nazev: x.nazev
                                                };
                                            });
                                            this.beginOperation();
                                            this.srv.call("HromadneOznaceniJakoOtevrene", { data: data })
                                                .done((result) => {
                                                this.endOperation();
                                                if (result.chyby == null || result.chyby.length == 0) {
                                                    this.showFlash(result.zprava, "g-state-success", 10000);
                                                }
                                                else {
                                                    this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek ozna�en� jako otev�en�", 800, 600);
                                                }
                                                this.view.requestData();
                                            })
                                                .fail(() => {
                                                this.showFlash("Chyba p�i hromadn�m ozna�en� jako otev�en�.", "g-state-error", 10000);
                                                this.endOperation();
                                            });
                                        });
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekKopirovat",
                                    caption: "Kop�rovat",
                                    run: () => {
                                        let sel = this.grid.ggrid("getSelection");
                                        if (sel.length === 0) {
                                            this.dialogs.error("Vyberte polo�ky", "Vyberte typy pohled�vek, kter� chcete zkop�rovat do n�sleduj�c�ho roku.");
                                            return;
                                        }
                                        this.dialogs.confirm("Zkop�rovat do n�sleduj�c�ho roku?", `Opravdu zkop�rovat v�echny vybran� typy pohled�vek do n�sleduj�c�ho roku?<br>Neprob�hnou ��dn� v�po�ty souvisej�c� s otev�en�m typu pohled�vky do nov�ho roku.<br>Tato operace je nevratn�.`)
                                            .on("close", (ev, retVal) => {
                                            if (retVal !== "yes")
                                                return;
                                            let data = sel.map(x => {
                                                return {
                                                    typ_phl: x.typ_phl,
                                                    rok: x.Nastaveni.rok,
                                                    nazev: x.nazev
                                                };
                                            });
                                            this.beginOperation();
                                            this.srv.call("HromadneZkopirovatDoNasledujicihoRoku", { data: data })
                                                .done((result) => {
                                                this.endOperation();
                                                if (result.chyby == null || result.chyby.length == 0) {
                                                    this.showFlash(result.zprava, "g-state-success", 10000);
                                                }
                                                else {
                                                    this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek kop�rov�n� do n�sleduj�c�ho roku", 800, 600);
                                                }
                                                this.view.requestData();
                                            })
                                                .fail(() => {
                                                this.showFlash("Chyba p�i kop�rov�n� do n�sleduj�c�ho roku.", "g-state-error", 10000);
                                                this.endOperation();
                                            });
                                        });
                                    }
                                },
                                {
                                    name: "actGTypyPohledavekNapocetSt",
                                    caption: "N�po�et st.",
                                    run: () => {
                                        let sel = this.grid.ggrid("getSelection");
                                        if (sel.length === 0) {
                                            this.dialogs.error("Vyberte polo�ky", "Vyberte v seznamu v�echny p��jmy, pro kter� chcete napo��tat stavy.");
                                            return;
                                        }
                                        this.dialogs.confirm("Napo��tat stavy?", `Opravdu chcete prov�st hromadn� napo�ten� stav� vybran�ch typ� pohled�vek?`)
                                            .on("close", (ev, retVal) => {
                                            if (retVal !== "yes")
                                                return;
                                            let data = sel.map(x => x.typ_phl).filter((value, index, array) => array.indexOf(value) === index).map(x => { return { typ_phl: x }; });
                                            this.beginOperation();
                                            this.srv.call("HromadneNapocteniStavu", { data: data, natvrdo: false })
                                                .done((result) => {
                                                this.endOperation();
                                                if (result.chyby == null || result.chyby.length == 0) {
                                                    this.showFlash(result.zprava, "g-state-success", 10000);
                                                }
                                                else {
                                                    this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek napo�ten� stav�", 800, 600);
                                                }
                                                this.view.requestData();
                                            })
                                                .fail(() => {
                                                this.showFlash("Chyba p�i po��t�n� stav� pohled�vek.", "g-state-error", 10000);
                                                this.endOperation();
                                            });
                                        });
                                    }
                                },
                                {
                                    name: "actTypyPohledavekGTypPohledavky",
                                    caption: "Detail typu pohled�vky",
                                    run: () => {
                                        let row = this.grid.ggrid("activeRow");
                                        if (row == null) {
                                            this.dialogs.error("Vyberte polo�ku", "Vyberte polo�ku.");
                                            return;
                                        }
                                        this.navigate("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GTypPohledavky", { typ_phl: row.typ_phl, readOnly: this.readOnly, editMode: false });
                                    }
                                },
                                {
                                    name: "actTypyPohledavekGTypPohledavkyNastaveni",
                                    caption: "Detail typu pohled�vky pro rok a u�etn� st�edisko",
                                    run: () => {
                                        let row = this.grid.ggrid("activeRow");
                                        if (row == null) {
                                            this.dialogs.error("Vyberte polo�ku", "Vyberte polo�ku.");
                                            return;
                                        }
                                        this.navigate("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GTypPohledavkyNastaveni", { typ_phl: row.typ_phl, rok: row.Nastaveni.rok, ucs: row.Nastaveni.ucs, ico: row.Nastaveni.ico, readOnly: this.readOnly, editMode: false });
                                    }
                                },
                                {
                                    name: "actTypyPohledavekGSeznamSpravcu",
                                    caption: "Spr�vci",
                                    run: () => {
                                        let row = this.grid.ggrid("activeRow");
                                        if (row == null || row.Nastaveni.priz_spr !== 1) {
                                            this.dialogs.error("Vyberte polo�ku", "Vyberte polo�ku, kter� m� p��znak spr�vce.");
                                            return;
                                        }
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GSeznamSpravcu", { ID: "DDPGSeznamSpravcu#", typ_phl: row.typ_phl, rok: row.Nastaveni.rok }, "Seznam spr�vc�", 800, 600);
                                    }
                                },
                                {
                                    name: "actTypyPohledavekGStatistikaPouzitychTypuDok",
                                    caption: "Statistika pou�it�ch typ� dokument�",
                                    enabled: this.ddp_rez_zjedno,
                                    run: () => {
                                        let row = this.grid.ggrid("activeRow");
                                        if (row == null) {
                                            this.dialogs.error("Vyberte polo�ku", "Vyberte polo�ku.");
                                            return;
                                        }
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Vymahani.GStatistikaDokumentu", { ID: "DDPGStatistikaDokumentu#", Ixp: row.typ_phl }, `Statistika pou�it�ch typ� dokument� ${row.typ_phl}`, 800, 600);
                                    }
                                },
                                {
                                    name: "actTypyPohledavekGCiselniky",
                                    caption: "��seln�ky",
                                    enabled: this.ddp_rez_zjedno,
                                    run: () => {
                                        let row = this.grid.ggrid("activeRow");
                                        if (row == null) {
                                            this.dialogs.error("Vyberte polo�ku", "Vyberte polo�ku.");
                                            return;
                                        }
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.Ciselniky.GCiselniky", { ID: "DDPGCiselniky#", typ_phl: row.typ_phl }, `��seln�ky typu pohled�vky ${row.typ_phl}`, 800, 600);
                                    }
                                }]);
                        }
                        createMenu() {
                            let menu = [
                                {
                                    type: "static",
                                    caption: "Hlavn� uz�v�rka",
                                    favorite: true,
                                    children: [
                                        {
                                            action: this.actions["actGTypyPohledavekUzHrom"]
                                        },
                                        {
                                            action: this.actions["actGTypyPohledavekHistUz"]
                                        }
                                    ]
                                },
                                {
                                    type: "static",
                                    caption: "Opravn� polo�ky",
                                    favorite: true,
                                    children: [
                                        {
                                            action: this.actions["actGTypyPohledavekGenOprPol"]
                                        },
                                    ]
                                },
                                {
                                    type: "static",
                                    caption: "Ro�n� uz�v�rka",
                                    favorite: true,
                                    children: [
                                        {
                                            action: this.actions["actGTypyPohledavekPripKUzav"]
                                        },
                                        {
                                            action: this.actions["actGTypyPohledavekUzavreni"]
                                        },
                                        {
                                            action: this.actions["actGTypyPohledavekOtevreni"]
                                        },
                                    ]
                                },
                                {
                                    type: "static",
                                    caption: "Servis",
                                    favorite: true,
                                    children: [
                                        {
                                            action: this.actions["actGTypyPohledavekOznOtev"]
                                        },
                                        {
                                            action: this.actions["actGTypyPohledavekKopirovat"]
                                        },
                                        {
                                            action: this.actions["actGTypyPohledavekNapocetSt"]
                                        }
                                    ]
                                },
                                {
                                    type: "static",
                                    caption: "Informace",
                                    captionVisible: "important",
                                    favorite: true,
                                    children: [
                                        {
                                            action: this.actions["actTypyPohledavekGTypPohledavky"]
                                        },
                                        {
                                            action: this.actions["actTypyPohledavekGTypPohledavkyNastaveni"]
                                        },
                                        {
                                            action: this.actions["actTypyPohledavekGStatistikaPouzitychTypuDok"]
                                        },
                                        {
                                            action: this.actions["actTypyPohledavekGSeznamSpravcu"]
                                        },
                                        {
                                            action: this.actions["actTypyPohledavekGCiselniky"]
                                        }
                                    ]
                                }
                            ];
                            this.menuBar(menu);
                        }
                        createForm() {
                            return new Gordic.Forms.Form({ tabLabel: "Parametry pohled�vky", layoutDescriptor: "L1M1S1, M-12-12-0" })
                                .addRow("Typ pohled�vky")
                                .addField("gstringbox", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "="], userOperators: [] }), { name: "typ_phl", placeholder: "Typ" })
                                .addRow("N�zev")
                                .addField("gstringbox", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "CONTAINS", "="], userOperators: [] }), { name: "nazev", placeholder: "N�zev" })
                                .addRow("Obdob�")
                                .addField("gselectbox", Gordic.Prefabs.Select.nEkosobd(), {
                                name: "rok",
                                placeholder: "Obdob�",
                                //initialValue: this.rok,
                                model: "model.rok=value.rok",
                                change: (ev, obj) => {
                                    let field = this.filter.findFields("min_rok");
                                    if (obj.value == null) {
                                        field.gfield("disable");
                                        field.gfield("clear");
                                    }
                                    else {
                                        field.gfield("enable");
                                    }
                                }
                            })
                                .addRow("Stav pohled�vky")
                                .addField("gselectbox", Gordic.Prefabs.Select.ddpcstp(), {
                                name: "stav_phl",
                                placeholder: "Stav",
                                model: "model.stav_phl=value.stav_phl"
                            })
                                .addRow()
                                .addField("gcheck", { name: "min_rok", label: "Neotev�en� z min. roku" })
                                .addField("gcheck", { name: "priz_spr", label: "Pouze spravovan� typy" });
                            //! zakomentov�no, zbyte�n� pol��ka pro filterpanel
                            //.addField("gcheck", { name: "pouze_fav", label: "Pouze obl�ben�" })
                            //.addField("gcheck", { name: "ulozit_filtr", label: "Pamatovat si filtr" })
                            //!tla��tko vyhledat tak� zakomentov�no
                            //.addRow({ customClass: "right" })
                            //.addField("gbutton", { params: { primary: true, customClass: "right", id: "actGTypyPohledavekVyhledat_button", action: this.actions["actGTypyPohledavekVyhledat"] } });
                            //form.findFields("rok").gfield("model", "apply", { rok: this.rok });
                            // definice filtru
                            //this.filter = $("<div>").appendTo(this.element).
                            //    gfilterpanel({
                            //        forms: [form],
                            //        filterViewMode: FilterViewMode.Simple,
                            //        apply: (event, obj) => {
                            //            this.o_filtr = obj.filter
                            //            this.vyhledat();
                            //            //this.actions["actGTypyPohledavekVyhledat"];
                            //            //this.ziskejData(this.o_filtr)
                            //        }
                            //    })
                            // definice filtru
                            //var div = $("<div>")
                            //    .appendTo(this.element)
                            //    .gform("createFrom", form);
                        }
                        enableActions(row) {
                            this.actions["actGTypyPohledavekUzHrom"].enabled(true);
                            this.actions["actTypyPohledavekGSeznamSpravcu"].enabled(true);
                            this.actions["actGTypyPohledavekGenOprPol"].enabled(true);
                            this.actions["actGTypyPohledavekPripKUzav"].enabled(true);
                            this.actions["actGTypyPohledavekUzavreni"].enabled(true);
                            this.actions["actGTypyPohledavekOtevreni"].enabled(true);
                            if (row != null) {
                                if (row.Nastaveni.priz_spr === 1) {
                                    this.actions["actTypyPohledavekGSeznamSpravcu"].enabled(true);
                                    this.actions["actGTypyPohledavekUzHrom"].enabled(false);
                                }
                                else {
                                    this.actions["actTypyPohledavekGSeznamSpravcu"].enabled(false);
                                    this.actions["actGTypyPohledavekUzHrom"].enabled(true);
                                }
                                if (row.Nastaveni.stav_phl !== 100) {
                                    this.actions["actGTypyPohledavekUzHrom"].enabled(false);
                                    this.actions["actGTypyPohledavekGenOprPol"].enabled(false);
                                }
                                if (row.Nastaveni.stav_phl === 100) {
                                    this.actions["actGTypyPohledavekUzavreni"].enabled(false);
                                    this.actions["actGTypyPohledavekOtevreni"].enabled(false);
                                }
                                else if (row.Nastaveni.stav_phl === 200) {
                                    this.actions["actGTypyPohledavekOtevreni"].enabled(false);
                                    this.actions["actGTypyPohledavekPripKUzav"].enabled(false);
                                }
                                else if (row.Nastaveni.stav_phl === 300) {
                                    this.actions["actGTypyPohledavekPripKUzav"].enabled(false);
                                    this.actions["actGTypyPohledavekUzavreni"].enabled(false);
                                }
                            }
                        }
                        createGrid() {
                            return $("<div>")
                                .appendTo(this.element)
                                .gautofit()
                                .ggrid({
                                data: this.view,
                                columnMode: "fit", // fit, full
                                navigationMode: "row", // row, cell
                                multi: true,
                                //searchColumns: ["typ_phl", "nazev", "rok"],
                                searchColumns: ["*"],
                                cellActivate: (ev, obj) => {
                                    if (obj.cellInfo.row >= 0) {
                                        this.enableActions(obj.cellInfo.data);
                                    }
                                    else
                                        this.enableActions(null);
                                },
                                defaultAction: this.actions["actTypyPohledavekGTypPohledavky"],
                                //todo:!!! NEZAPOMENOUT POKUD TO BUDU VRACET NA P�VODN� VERZI ODKOMENTOVAT TENTO ��DEK KTER� TU V DUPLICIT� H��E CHYBU kv�li "THIS"
                                columns: Ddp.WebClient.Common.GridFormats.TypyPohledavek2(),
                                defaultProfile: {
                                    rowNumbers: true,
                                    columnList: "favourite, Nastaveni.rok, typ_phl, nazev, Nastaveni.dat_uzav, Nastaveni.stav_phl, Nastaveni.priz_spr, poznamka",
                                    columns: {
                                        "Nastaveni.stav_phl": { "width": 50 },
                                        "Nastaveni.priz_spr": { "width": 30 },
                                        "poznamka": { "width": 150 },
                                        "Nastaveni.rok": { "width": 20 },
                                        "typ_phl": { "width": 20 },
                                        "nazev": { "width": 90 },
                                        "Nastaveni.dat_uzav": { "width": 40 }
                                    }
                                },
                                profileChange: (ev, obj) => {
                                    if (this.grid != null) {
                                        let row = this.grid.ggrid("activeRow");
                                        this.enableActions(row);
                                    }
                                }
                            });
                        }
                        getFilters() {
                            let filter = {
                                ico: this.ico,
                                ucs: this.ucs
                            };
                            this.filter.findFields("rok", "stav_phl", "typ_phl", "nazev", "priz_spr").gfield("model", "collect", filter);
                            let pouze_fav = this.filter.findFields("pouze_fav").gfield("getValue");
                            if (pouze_fav) {
                                let favs = this.getFavourites();
                                if (favs.length == 0)
                                    favs = ["####"];
                                //#### to ensure nothing is found if there are no favourites
                                if (filter.typ_phl == null) {
                                    filter.typ_phl = { o: "IN", v: favs };
                                }
                                else if (typeof filter.typ_phl !== "object" && favs.indexOf(filter.typ_phl) < 0) {
                                    filter.typ_phl = "####";
                                }
                                else if (typeof filter.typ_phl === "object" && filter.typ_phl.o === "=" && favs.indexOf(filter.typ_phl.v) < 0) {
                                    filter.typ_phl = "####";
                                }
                                else if (typeof filter.typ_phl === "object" && filter.typ_phl.o === "LIKE") {
                                    let favs2 = favs.filter(x => x.indexOf(filter.typ_phl.v) == 0);
                                    if (favs2.length == 0)
                                        favs2 = ["####"];
                                    filter.typ_phl = { o: "IN", v: favs2 };
                                }
                            }
                            let min_rok = this.filter.findFields("min_rok").gfield("getValue");
                            if (min_rok) {
                                filter.min_rok = filter.rok - 1;
                            }
                            if (filter.priz_spr === false) {
                                filter.priz_spr = null;
                            }
                            return filter;
                        }
                        hlavniUzaverka(dat_uzav, items) {
                            this.dialogs.confirm("Prov�st uz�v�rku?", "Opravdu chcete prov�st uz�v�rku vybran�ch typ� pohled�vek?<br>Tato operace je nevratn�.")
                                .on("close", (ev2, retVal2) => {
                                if (retVal2 !== "yes")
                                    return;
                                var data = items.map(a => { return { typ_phl: a.typ_phl, rok: a.Nastaveni.rok, priz_spr: a.Nastaveni.priz_spr, nazev: a.nazev, dat_uzav: a.Nastaveni.dat_uzav, stav_phl: a.Nastaveni.stav_phl }; });
                                this.beginOperation();
                                var that = this;
                                this.taskRunning = true;
                                var className = "Gordic.Ddp.Server.LK.Async.GDdpTypyPohledavekHlavniUzaverkaAsyncTask";
                                Gordic.Async.GTaskManager.init({ delay: 1000 });
                                Gordic.Async.GTaskManager.getInitPromise().always(() => {
                                    var guid = Ddp.WebClient.Common.Base.CreateGuid();
                                    Gordic.Async.GTaskManager.on(`change.${guid}`, className, function (ctx, args) {
                                        if (this.id == that.currentTask) {
                                            if (ctx.progress != null) {
                                                //that.progressOperation(ctx.progress.text, ctx.progress.current);
                                            }
                                        }
                                    });
                                    Gordic.Async.GTaskManager.on(`done.${guid}`, className, function (ctx, args) {
                                        if (this.id == that.currentTask) {
                                            var result = ctx.result;
                                            if (result.chyby == null || result.chyby.length == 0) {
                                                that.showFlash(result.zprava, "g-state-success", 10000);
                                            }
                                            else {
                                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek �z�v�rky", 800, 600);
                                            }
                                            that.view.requestData();
                                        }
                                    });
                                    Gordic.Async.GTaskManager.on(`always.${guid}`, className, function (ctx, args) {
                                        if (this.id == that.currentTask) {
                                            that.endOperation();
                                            that.taskRunning = false;
                                            that.currentTask = "#no_task#";
                                            this.clean();
                                            Gordic.Async.GTaskManager.off(`change.${guid}`);
                                            Gordic.Async.GTaskManager.off(`done.${guid}`);
                                            Gordic.Async.GTaskManager.off(`always.${guid}`);
                                            Gordic.Async.GTaskManager.uninit();
                                        }
                                    });
                                    this.srv.call("StartAsyncTask", { className: className, dto: { datum: dat_uzav, polozky: data } })
                                        .done((taskId) => {
                                        this.currentTask = taskId;
                                        this.endOperation();
                                        this.beginOperation({
                                            text: "Prob�h� uz�v�rka typ� pohled�vek.",
                                            progress: 0,
                                            total: data.length,
                                            cancelAction: new GAction({
                                                name: "actGTypyPohledavekUzHrom_Zrusit",
                                                caption: "Zru�it",
                                                run: () => {
                                                    this.dialogs.confirm("Zru�it", "Opravdu chcete zru�it �lohu?")
                                                        .on("close", (evC, retValC) => {
                                                        if (retValC === "yes") {
                                                            let task = Gordic.Async.GTaskManager.findById(taskId);
                                                            if (task != null)
                                                                task.cancel();
                                                            else
                                                                this.dialogs.error("�loha nenalezena", "Nepoda�ilo se naj�t instanci pr�v� prob�haj�c� �lohy. �loha nebyla p�eru�ena.");
                                                        }
                                                    });
                                                }
                                            })
                                        });
                                    });
                                });
                                //#region this.srv.call("HlavniUzaverkaParametry")...
                                /*this.srv.call("HlavniUzaverkaParametry")
                                    .done((pars) => {
                                        let parametry = {
                                            datum: dat_uzav,
                                            cis_spr: pars["cis_spr"],
                                            ddp_rad_uzavhl: pars["ddp_rad_uzavhl"],
                                            ddp_uza_hromvy: pars["ddp_uza_hromvy"],
                                            ddp_rad_poupro: pars["ddp_rad_poupro"],
                                            ddp_rad_huzzpp: pars["ddp_rad_huzzpp"],
                                            polozky: data
                                        };
             
                                        var that = this;
                                        Async.GTaskManager.init({ delay: 500 });
                                        let task = Async.GTaskManager.start<Async.IGTaskProgress, Gordic.Ddp.Interface.LK.Dto.Common.GDdpVysledekDto>("Gordic.Ddp.Server.LK.Async.GDdpTypyPohledavekHlavniUzaverkaAsyncTask", parametry);
                                        this.endOperation();
                                        this.beginOperation({
                                            text: "Prob�h� uz�v�rka typ� pohled�vek.",
                                            progress: 0,
                                            total: data.length,
                                            cancelAction: new GAction({
                                                name: "actGTypyPohledavekUzHrom_Zrusit",
                                                caption: "Zru�it",
                                                run: () => {
                                                    this.dialogs.confirm("Zru�it", "Opravdu chcete zru�it �lohu?")
                                                        .on("close", (evC, retValC) => {
                                                            if (retValC === "yes")
                                                                task.cancel();
                                                        });
                                                }
                                            })
                                        });
             
                                        task.on("change", (ctx, args) => {
                                            if (ctx.progress != null) {
                                                this.progressOperation(ctx.progress.text, ctx.progress.current);
                                            }
                                        }).on("done", (ctx, args) => {
             
                                            var result = ctx.result!;
                                            if (result.chyby == null || result.chyby.length == 0) {
                                                this.showFlash(result.zprava!, "g-state-success", 10000);
                                            } else {
                                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek �z�v�rky", 800, 600);
                                            }
                                            this.view.refreshData();
                                        }).on("always", function (this: Async.IGTask, ctx, args) {
                                            that.endOperation();
                                            that.taskRunning = false;
                                            this.clean();
                                            Async.GTaskManager.uninit();
                                        });
                                    });
                                */
                                /* this.srv.call<Gordic.Ddp.Interface.LK.Dto.Common.GDdpVysledekDto>("HromadnaUzaverka", { dat_uzav: dat_uzav, data: data })
                                     .done((result) => {
                                         this.endOperation();
             
                                         if (result.chyby == null || result.chyby.length == 0) {
                                             this.showFlash(result.zprava!, "g-state-success", 10000);
                                         } else {
                                             this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek �z�v�rky", 800, 600);
                                         }
                                         this.view.refreshData();
                                     })
                                     .fail(() => {
                                         this.showFlash("Chyba p�i uzav�r�n� pohled�vek.", "g-state-error", 10000);
                                         this.endOperation();
                                     });*/
                                //#endregion 
                            });
                        }
                        opravy(params, data, chyby) {
                            this.dialogs.confirm("Pokra�ovat?", "Opravdu chcete generovat opravn� polo�ky pro vybran� typy pohled�vek?")
                                .on("close", (ev, retVal) => {
                                if (retVal !== "yes")
                                    return;
                                this.beginOperation("Prob�h� generov�n� opravn�ch polo�ek.");
                                this.srv.call("HromadneGenerovaniOpravnychPolozek", {
                                    datum: params.datum,
                                    odlozene: params.odlozene,
                                    odpisy: params.odpisy,
                                    data: data
                                })
                                    .done((result) => {
                                    this.endOperation();
                                    if (chyby.length > 0) {
                                        if (result.chyby == null || result.chyby.length == 0)
                                            result.chyby = chyby;
                                        else
                                            result.chyby = chyby.concat(result.chyby);
                                    }
                                    if (result.chyby == null || result.chyby.length == 0) {
                                        this.showFlash(result.zprava, "g-state-success", 10000);
                                    }
                                    else {
                                        this.dialogs.showModalWindow("Gordic.Ddp.WebClient.Controls.TypyPohledavek.GChyby", { ID: "DDPGChyby#", Chyby: result }, "V�sledek generov�n� opravn�ch polo�ek", 800, 600);
                                    }
                                    this.view.requestData();
                                })
                                    .fail(() => {
                                    this.showFlash("Chyba p�i uzav�r�n� pohled�vek.", "g-state-error", 10000);
                                    this.endOperation();
                                });
                            });
                        }
                        initFavourites() {
                            if (this.favourites == null) {
                                if (this.userSettings != null) {
                                    let tmp = this.userSettings.get("typ_phl_favourites");
                                    if (tmp != null) {
                                        this.favourites = tmp;
                                        return;
                                    }
                                }
                                this.favourites = [];
                            }
                        }
                        getFavourites() {
                            this.initFavourites();
                            return this.favourites.slice();
                        }
                        isFavourite(typ_phl) {
                            this.initFavourites();
                            let index = this.favourites.indexOf(typ_phl);
                            return index >= 0;
                        }
                        setFavourite(typ_phl, value) {
                            this.initFavourites();
                            let index = this.favourites.indexOf(typ_phl);
                            if (!value) {
                                if (index >= 0) {
                                    this.favourites.splice(index, 1);
                                }
                            }
                            else {
                                if (index < 0) {
                                    this.favourites.push(typ_phl);
                                }
                            }
                            if (this.userSettings != null) {
                                this.userSettings.set("typ_phl_favourites", this.favourites);
                                this.userSettings.save(true);
                            }
                            else {
                                this.dialogs.error("Neulo�eno", "Nepoda�ilo se ulo�it obl�ben� typy pohled�vek.");
                            }
                        }
                        vyhledat() {
                            //! test
                            //if (this.filter!.gform("isValid")) {
                            let filter = this.getFilters();
                            this.view.requestData();
                            this.grid.ggrid("instance").refresh();
                            this.view.getLoadingPromise()
                                .done(() => {
                                this.grid.ggrid("refreshRows");
                                let row = this.grid.ggrid("activeRow");
                                this.enableActions(row);
                            });
                            //!zakomentov�no, u filtrpanelu zbyte�nost.
                            //let ulozit = this.filter!.findFields("ulozit_filtr").gfield("getValue");
                            //if (ulozit === true && this.userSettings != null) {
                            //    let filterToSave: any = {};
                            //    this.filter!.findFields().gfield("model", "collect", filterToSave);
                            //    delete filterToSave.ulozit_filtr;
                            //    this.userSettings!.set("GTypyPohledavekFilter", filterToSave);
                            //}
                            //}
                        }
                        closing() {
                            var def = $.Deferred();
                            if (!this.taskRunning)
                                def.resolve();
                            else
                                this.dialogs.alert("Prob�h� �loha na pozad�. Vy�kejte na dokon�en� nebo �lohu zru�te.").on("close", () => { def.reject(); });
                            return def.promise();
                        }
                    };
                    GTypyPohledavek2 = __decorate([
                        Decorators.gcontent
                        //export class GTypyPohledavek extends GContentBase {
                    ], GTypyPohledavek2);
                    TypyPohledavek2.GTypyPohledavek2 = GTypyPohledavek2;
                })(TypyPohledavek2 = Controls.TypyPohledavek2 || (Controls.TypyPohledavek2 = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1R5cHlQb2hsZWRhdmVrMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdUeXB5UG9obGVkYXZlazIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0Ewb0NmO0FBMW9DRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0Ewb0NuQjtJQTFvQ2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTBvQzdCO1FBMW9Db0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxRQUFRLENBMG9DdEM7WUExb0M4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxlQUFlLENBMG9DdEQ7Z0JBMW9DdUMsV0FBQSxlQUFlO29CQUduRCxJQUFhLGdCQUFnQjtvQkFEN0IscURBQXFEO29CQUNyRCxNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBb0Y7d0JBQTFIOzs0QkFJWSxRQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMsMENBQTBDLENBQUMsQ0FBQzs0QkFVL0QsZ0JBQVcsR0FBWSxLQUFLLENBQUM7NEJBQzdCLGdCQUFXLEdBQVcsV0FBVyxDQUFDO3dCQXVuQzlDLENBQUM7d0JBeG1DRywyQkFBMkI7d0JBQzNCLGNBQWM7NEJBQ1YsUUFBUSxDQUFDOzRCQUVULElBQUksSUFBSSxHQUFHLElBQUksQ0FBQzs0QkFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQzs0QkFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQzs0QkFFaEMsa0JBQWtCOzRCQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBRXJCLHlCQUF5Qjs0QkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29DQUNqQixPQUFPLEVBQUUsa0JBQWtCO29DQUMzQixNQUFNLEVBQUUsSUFB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Q0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRWpJLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUN6QixDQUFDO3FCQUNKLENBQUE7b0JBdG9DWSxnQkFBZ0I7d0JBRjVCLFVBQVUsQ0FBQyxRQUFRO3dCQUNwQixxREFBcUQ7dUJBQ3hDLGdCQUFnQixDQXNvQzVCO29CQXRvQ1ksZ0NBQWdCLG1CQXNvQzVCLENBQUE7Z0JBQ0wsQ0FBQyxFQTFvQ3VDLGVBQWUsR0FBZix3QkFBZSxLQUFmLHdCQUFlLFFBMG9DdEQ7WUFBRCxDQUFDLEVBMW9DOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUEwb0N0QztRQUFELENBQUMsRUExb0NvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEwb0M3QjtJQUFELENBQUMsRUExb0NnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwb0NuQjtBQUFELENBQUMsRUExb0NTLE1BQU0sS0FBTixNQUFNLFFBMG9DZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HVHlweVBvaGxlZGF2ZWsyLnRzICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gVHlweSBwb2hsZWTvv712ZWsgLSB677+9bG9oYSBzdGFy77+9aG8g77+9Ze+/vWVu77+9ICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDvv70gR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDEtMDggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlazIge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIC8vZXhwb3J0IGNsYXNzIEdUeXB5UG9obGVkYXZlayBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgR1R5cHlQb2hsZWRhdmVrMiBleHRlbmRzIEdDb250ZW50QmFzZTxHb3JkaWMuRWtvLlV0aWxzLklHRWtvQm9va0V4dGVuc2lvbiAmIEdvcmRpYy5Fa28uVXRpbHMuSUdMb25nTGlzdExpbWl0PiB7XHJcblxyXG4gICAgICAgIHJlYWRPbmx5OiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNydiA9IG5ldyBHQ29udGVudChcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkFqYXguR1R5cFBvaGxlZGF2a3lcIik7XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvPjtcclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRm9ybTtcclxuXHJcbiAgICAgICAgcHVibGljIG9fZmlsdHI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmF2b3VyaXRlczogc3RyaW5nW107XHJcbiAgICAgICAgcHJpdmF0ZSB0YXNrUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFRhc2s6IHN0cmluZyA9IFwiI25vX3Rhc2sjXCI7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpeHBfZGVuOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGljbzogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCB1Y3M6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgcm9rOiBudW1iZXI7XHJcbiAgICAgICAgcHJvdGVjdGVkIHJva0RlbjogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZG5lczogRGF0ZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGRkcF9yYWRfcHJlbnJ6OiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGRkcF9yYWRfcG91cHJvOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBkZHBfcmFkX2hkYXV6YTogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBkZHBfcmV6X3pqZWRubzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLy8hbmHvv710ZW7vv70gY29udGVudHUgc3Ry77+9bmt5XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50YXNrSWQgPSBcImFjdEdUeXB5UG9obGVkYXZlazJcIjtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiVHlweSBwb2hsZWTvv712ZWsyXCI7XHJcblxyXG4gICAgICAgICAgICAvLyEgdnl0dm/vv71lbu+/vSBha2Pvv71cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICAvLyEgbmFzdGF2ZW7vv70gYnJlYWRjcnVtYnVcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUeXB5IHBvaGxlZO+/vXZlazJcIixcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrWmF2cml0UG90b21reVwiXVxyXG4gICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICAvLyEgbWVudVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vISBkZWZpbmljZSBmb3JtdWzvv73vv71lIGZpbHRlcnBhbmVsdVxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0gPSB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgLy9YdGhpcy5maWx0ZXJGb3JtLmZpbmRGaWVsZHMoXCJyb2tcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IHJvazogdGhpcy5yb2sgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy90aGlzLmRlZmF1bHRGb3JtID0gdGhpcy5jcmVhdGVGb3JtKCk7XHJcblxyXG4gICAgICAgICAgICAvLyEgZmlsdGVyXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKEdvcmRpYy5Fa28uRmlsdGVycy5nZXRGaWx0ZXJQYXJhbXM8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RmlsdGVyPihcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5maWx0ZXJGb3JtXSwgIC8vIGZvcm11bO+/ve+/vVxyXG4gICAgICAgICAgICAgICAgICAgIFtdLCAgICAgICAgICAgICAgICAgLy8gb2Js77+9YmVu77+9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJcIiwgICAgICAgICAgICAgICAgIC8vIHTvv71tYVxyXG4gICAgICAgICAgICAgICAgICAgIG51bGwsICAgICAgICAgICAgICAgLy8gc2xvdXBlYyBwcm8gZmlsdHIgKnZsYXN0bu+/vVxyXG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICkpXHJcblxyXG4gICAgICAgICAgICAvLyEgVmlldyAtIHN0YXLvv71cclxuICAgICAgICAgICAgLy90aGlzLnZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLlR5cFBvaGxlZGF2a3kubGlzdChcclxuICAgICAgICAgICAgLy8gICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2ZpbHRlcnM6IHRoaXMuZmlsdGVyLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZ2V0RmlsdGVycygpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vZmlsdGVyUGFuZWw6IHRoYXQuJGZpbHRlckZvcm0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyAgICB9KSwgeyBmaWx0ZXJQYW5lbDogdGhpcy5maWx0ZXIgfSk7XHJcbiAgICAgICAgICAgIC8vISBWaWV3IC0gcG9rdXMgbWl4IG9ib2rvv71oby5cclxuICAgICAgICAgICAgLy90aGlzLnZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLlR5cFBvaGxlZGF2a3kubGlzdChcclxuICAgICAgICAgICAgLy8gICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2ZpbHRlcnM6IHRoaXMuZmlsdGVyLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZ2V0RmlsdGVycygpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vZmlsdGVyUGFuZWw6IHRoYXQuJGZpbHRlckZvcm0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyAgICB9KSxcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyUGFuZWw6IHRoaXMuZmlsdGVyLFxyXG4gICAgICAgICAgICAvLyAgICAgICAga2V5OiBbXCJ0eXBfcGhsXCJdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgICAgIC8vISBWaWV3IC0gcG9kbGUgcO+/vWVkbG9oeVxyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0bz4oXHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5UeXBQb2hsZWRhdmt5Lmxpc3QocnEgPT4gcnEpLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGlzLmZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFtcInR5cF9waGxcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8hIHZ5dHZv77+9ZW7vv70gZ2dyaWR1XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZmlsdGVyLmZpbmRGaWVsZHMoXCJyb2tcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IHJvazogdGhpcy5yb2sgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2lmICh0aGlzLnVzZXJTZXR0aW5ncyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGxldCBzYXZlZEZpbHRlciA9IHRoaXMudXNlclNldHRpbmdzLmdldChcIkdUeXB5UG9obGVkYXZla0ZpbHRlclwiKTtcclxuICAgICAgICAgICAgLy8gICAgaWYgKHNhdmVkRmlsdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZmlsdGVyIVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBzYXZlZEZpbHRlcik7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZmlsdGVyLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmdyaWQgPSB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgZm9jdXNGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAodGhhdC52aWV3IGFzIGFueSkub2ZmKFwiY2hhbmdlLmZvY3VzXCIsIGZvY3VzRnVuYyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudmlldy5vbihcImNoYW5nZS5mb2N1c1wiLCBmb2N1c0Z1bmMpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1R5cHlQb2hsZWRhdmVrWmF2cml0UG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZUFsbFNpZ25pZmljYW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdUeXB5UG9obGVkYXZla1Z5aGxlZGF0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5aGxlZGF0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZ5aGxlZGF0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1R5cHlQb2hsZWRhdmVrVXpIcm9tXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlV6YXbvv73vv710IGhyb21hZG7vv71cIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWwgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCLvv73vv71kbu+/vSBwb2xv77+9a3kgayB1emF277+9ZW7vv71cIiwgXCJWeWJlcnRlIHYgc2V6bmFtdSB277+9ZWNobnkgdHlweSBwb2hsZWTvv712ZWssIGt0ZXLvv70gY2hjZXRlIHV6YXbvv73vv710LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrLkdEYXR1bVV6YXZlcmt5XCIsIHsgSUQ6IFwiRERQR0RhdHVtVXphdmVya3kjXCIgfSwgXCJaYWTvv71u77+9IGRhdGEgdXrvv71277+9cmt5XCIsIDUxNSwgNDAwLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIGRhdF91emF2OiBEYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0X3V6YXYgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGRwX3JhZF9oZGF1emEgIT09IFwiMFwiICYmIGRhdF91emF2ID4gdGhpcy5kbmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmVycm9yKFwiQ2h5Ym7vv70gZGF0dW0gdXrvv71277+9cmt5XCIsIFwiTmVu77+9IHBvdm9sZW5vIHByb3bvv71k77+9dCB1eu+/vXbvv71ya3kgayBkYXR1IHZ577+977+977+9bXUgbmXvv70gamUgZG5l77+9bu+/vS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWwuc29tZSh4ID0+IHguTmFzdGF2ZW5pIS5yb2shICE9PSBkYXRfdXphdi5nZXRGdWxsWWVhcigpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcIkNoeWJu77+9IGRhdHVtIHV677+9du+/vXJreVwiLCBcIkRhdHVtIHV677+9du+/vXJreSBuZXNwYWTvv70gZG8genByYWNvdu+/vXZhbu+/vWhvIG9iZG9i77+9LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXNsLlR5cFBvaGxlZGF2a3kuZGF0dW1VemF2cmVuaUFrdHVhbG5paG9UeXB1UG9obGVkYXZreSh7fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocG9zbGVkbmlfZGF0X3V6YXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdF91emF2X3R5cF9waGwgPSBwYXJzZURhdGUocG9zbGVkbmlfZGF0X3V6YXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0X3V6YXYuZ2V0RnVsbFllYXIoKSAhPT0gZGF0X3V6YXZfdHlwX3BobC5nZXRGdWxsWWVhcigpICYmIGRhdF91emF2X3R5cF9waGwuZ2V0RGF5KCkgIT0gMzAgJiYgZGF0X3V6YXZfdHlwX3BobC5nZXRNb250aCgpICE9PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJQb2tyYe+/vW92YXQ/XCIsIGBCeWxhIHphZO+/vW5hIHV677+9du+/vXJrYSBkbyBqaW7vv71obyByb2t1ICgke2RhdF91emF2LmdldEZ1bGxZZWFyKCl9KSBuZe+/vSBqZSByb2sgcG9zbGVkbu+/vSB1eu+/vXbvv71ya3kgKCR7ZGF0X3V6YXZfdHlwX3BobC5nZXRGdWxsWWVhcigpfSkuPGJyPkNoY2V0ZSBwb2tyYe+/vW92YXQ/YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYzLCByZXRWYWwzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwzID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhsYXZuaVV6YXZlcmthKGRhdF91emF2LCBzZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhsYXZuaVV6YXZlcmthKGRhdF91emF2LCBzZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdUeXB5UG9obGVkYXZla0hpc3RVelwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJIaXN0b3JpZSB1eu+/vXbvv71yZWtcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsID0gdGhpcy5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFycyA9IHsgdnNlY2hueTogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWwubGVuZ3RoID09PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzID0geyB0eXBfcGhsOiBzZWxbMF0udHlwX3BobCB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFycyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93V2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuVHlweVBvaGxlZGF2ZWsuR0hpc3RvcmllVXphdmVyZWtcIiwgcGFycywgXCJIaXN0b3JpZSB1eu+/vXbvv71yZWtcIiwgODAwLCA2MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdUeXB5UG9obGVkYXZla0dlbk9wclBvbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJHZW5lcm92YXQgb3ByYXZu77+9IHBvbG/vv71reVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgdHlweSBwb2hsZWTvv712ZWtcIiwgXCJWeWJlcnRlIHYgc2V6bmFtdSB277+9ZWNobnkgdHlweSBwb2hsZWTvv712ZWssIGtkZSBjaGNldGUgZ2VuZXJvdmF0IG9wcmF2bu+/vSBwb2xv77+9a3kuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KCdHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlay5HRGF0dW1PcHJhdnknLCB7IElEOiBcIkREUEdEYXR1bU9wcmF2eSNcIiwgfSwgXCJQYXJhbWV0cnkgZ2VuZXJvdmFu77+9IG9wcmF2bu+/vWNoIHBvbG/vv71la1wiLCA1MTUsIDIxNSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaHlieTogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWwuZm9yRWFjaCgoeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4Lmdlbl9vcHIgIT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbeC50eXBfcGhsIV0gPSB4Lm5hemV2ITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoeWJ5LnB1c2goYEdlbmVyb3Zhbu+/vSBvcHJhdm7vv71jaCBwb2xv77+9ZWsgbmVu77+9IHBvdm9sZW4gcHJvIHR5cCBwb2hsZWTvv712a3kgJyR7eC5uYXpldiF9JyAoJHt4LnR5cF9waGwhfSkuYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZHBfcmFkX3ByZW5yeiAhPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcIlDvv71l77+977+9dG92YXQgcG9obGVk77+9dmt5IE9QUCAtIHNhbGRvP1wiLCBcIkNoY2V0ZSBzb3Xvv71hc27vv70gcyBnZW5lcm9277+9bu+/vW0gb3ByYXZu77+9Y2ggcG9sb++/vWVrIHByb3bvv71zdCBpIHDvv71l77+977+9dG9277+9bu+/vSBwb2hsZWTvv712a3kgT1BQIC0gc2FsZG8/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldjIsIHJldFZhbDIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFZhbC5vZHBpc3kgPSAocmV0VmFsMiA9PT0gXCJ5ZXNcIiA/IHRydWUgOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wcmF2eShyZXRWYWwsIGRhdGEsIGNoeWJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFZhbC5vZHBpc3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wcmF2eShyZXRWYWwsIGRhdGEsIGNoeWJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1R5cHlQb2hsZWRhdmVrUHJpcEtVemF2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDvv73vv71wcmF2YSBrIHV6YXbvv71lbu+/vVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgcG9sb++/vWt5XCIsIFwiVnliZXJ0ZSB0eXB5IHBvaGxlZO+/vXZlayBwcm8gcO+/ve+/vXByYXZ1IGsgdXphdu+/vWVu77+9LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm9reSA9IHNlbC5tYXAoeCA9PiB4Lk5hc3RhdmVuaSEucm9rISkuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiBhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByOiBhbnkgPSB7IHJva3k6IHJva3kgfTtcclxuICAgICAgICAgICAgICAgICAgICBJc2wuVHlwUG9obGVkYXZreS5wb3ZvbGVuYVByaXByYXZhVXphdnJlbmkocilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmVycm9yKFwiTmVsemUgcHJvdu+/vXN0XCIsIFwiTmVsemUgcHJvdu+/vXN0IHDvv73vv71wcmF2dSBrIHV6YXbvv71lbu+/vSByb2t1Ljxicj48YnI+PGJyPlprb250cm9sdWp0ZSBwcm9z77+9bSBwcm8gdu+/vWVjaG55IHZ5YnJhbu+/vSByb2t5IHpkYTo8YnI+LSBieWxhIHphaO+/vWplbmEgcm/vv71u77+9IHV677+9du+/vXJrYSBtb2R1bGVtIElOVTxicj4tIGplIHV6YXbvv71lbiBtb2R1bCBJTlRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiUHJvdu+/vXN0IHDvv73vv71wcmF2dSBrIHJv77+9bu+/vSB1eu+/vXbvv71yY2U/XCIsIFwiT3ByYXZkdSBjaGNldGUgcHJvdu+/vXN0IHDvv73vv71wcmF2dSBrIHJv77+9bu+/vSB1eu+/vXbvv71yY2UgdnlicmFu77+9Y2ggdHlw77+9IHBvaGxlZO+/vXZlaz88YnI+VGF0byBvcGVyYWNlIGplIG5ldnJhdG7vv70uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPT0gXCJ5ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhMiA9IHNlbC5tYXAoeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHgudHlwX3BobCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB4Lk5hc3RhdmVuaSEucm9rISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfdXphdjogeC5OYXN0YXZlbmkhLmRhdF91emF2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfc3ByOiB4Lk5hc3RhdmVuaSEucHJpel9zcHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhdl9waGw6IHguTmFzdGF2ZW5pIS5zdGF2X3BobCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXY6IHgubmF6ZXYhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNydi5jYWxsPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5Db21tb24uR1Z5c2xlZGVrRHRvPihcIkhyb21hZG5hUHJpcHJhdmFVemF2cmVuaVwiLCB7IGRhdGE6IGRhdGEyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNoeWJ5ID09IG51bGwgfHwgcmVzdWx0LmNoeWJ5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHJlc3VsdC56cHJhdmEhLCBcImctc3RhdGUtc3VjY2Vzc1wiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrLkdDaHlieVwiLCB7IElEOiBcIkREUEdDaHlieSNcIiwgQ2h5Ynk6IHJlc3VsdCB9LCBcIlbvv71zbGVkZWsgcO+/ve+/vXByYXZ5IGsgcm/vv71u77+9IHV677+9du+/vXJjZVwiLCA4MDAsIDYwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChcIkNoeWJhIHDvv71pIHDvv73vv71wcmF277+9IGsgcm/vv71u77+9IHV6YXbvv71yY2UuXCIsIFwiZy1zdGF0ZS1lcnJvclwiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goXCJOZWx6ZSBwcm9277+9c3QgcO+/ve+/vXByYXZ1IGsgdXphdu+/vWVu77+9IHJva3UuIE5lem7vv71t77+9IGNoeWJhLlwiLCBcImctc3RhdGUtZXJyb3JcIiwgMTAwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHVHlweVBvaGxlZGF2ZWtVemF2cmVuaVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVemF277+9ZW7vv71cIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWwgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIHBvbG/vv71reVwiLCBcIlZ5YmVydGUgdHlweSBwb2hsZWTvv712ZWsgayB1emF277+9ZW7vv70uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZHBfcmFkX3BvdXBybykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJQb3V6ZSBwcm8g77+9dGVu77+9XCIsIFwiSmUgbmFzdGF2ZW4gcG91emUgcmXvv71pbSBwcm9obO+/vWVu77+9IC0gbmVsemUgcHJvdu+/vXN0IHV677+9du+/vXJrdS48YnI+J1BhcmFtZXRyIEREUCAtIO+/vVAgLSByZe+/vWltIHByb2hs77+9ZW7vv70nIGRhdCBt77+9IGhvZG5vdHUgQU5PLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJva3kgPSBzZWwubWFwKHggPT4geC5OYXN0YXZlbmkhLnJvayEpLmZpbHRlcigodmFsdWUsIGluZGV4LCBhcnJheSkgPT4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcjogYW55ID0geyByb2t5OiByb2t5IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBJc2wuVHlwUG9obGVkYXZreS5wb2NldE5lcHJpcHJhdmVueWNoS1V6YXZlcmNlKHIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocG9jZXROZXByaXByYXZlbnljaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2NldE5lcHJpcHJhdmVueWNoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBgVu+/vWVjaG55IHR5cHkgcG9obGVk77+9dmVrIG5lanNvdSBw77+9aXByYXZlbnkgayB1eu+/vXbvv71yY2UuPGJyPkNlbGtlbSBuZXDvv71pcHJhdmVu77+9Y2ggdHlw77+9IHBvaGxlZO+/vXZlayBrIHV677+9du+/vXJjZTogJHtwb2NldE5lcHJpcHJhdmVueWNofS5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXNsLlR5cFBvaGxlZGF2a3kucG9jZXROZXV6YXZyZW55Y2hBZ2VuZChyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChwb2NldE5ldXphdnJlbnljaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9jZXROZXV6YXZyZW55Y2ggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgYE5lanNvdSB1emF277+9ZW55IChuZWJvIHZ5am11dHkgdSB1eu+/vXbvv71yZWspIHbvv71lY2hueSBhZ2VuZHkgKEJVQywgRlVDLCBJTlQgbmVibyBQT0spLjxicj5DZWxrZW0gbmV1emF277+9ZW7vv71jaCBhZ2VuZDogJHtwb2NldE5ldXphdnJlbnljaH0uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiUHJvdu+/vXN0IHJv77+9bu+/vSB1eu+/vXbvv71ya3U/XCIsIFwiT3ByYXZkdSBwcm9277+9c3Qgcm/vv71u77+9IHV677+9du+/vXJrdSB2eWJyYW7vv71jaCB0eXDvv70gcG9obGVk77+9dmVrPzxicj5UYXRvIG9wZXJhY2UgamUgbmV2cmF0bu+/vS5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPT0gXCJ5ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHNlbC5tYXAoeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB4LnR5cF9waGwhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB4Lk5hc3RhdmVuaSEucm9rISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXZfcGhsOiB4Lk5hc3RhdmVuaSEuc3Rhdl9waGwhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXY6IHgubmF6ZXYhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3J2LmNhbGw8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNvbW1vbi5HVnlzbGVkZWtEdG8+KFwiSHJvbWFkbmVSb2NuaVV6YXZyZW5pXCIsIHsgZGF0YTogZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaHlieSA9PSBudWxsIHx8IHJlc3VsdC5jaHlieS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHJlc3VsdC56cHJhdmEhLCBcImctc3RhdGUtc3VjY2Vzc1wiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlay5HQ2h5YnlcIiwgeyBJRDogXCJERFBHQ2h5YnkjXCIsIENoeWJ5OiByZXN1bHQgfSwgXCJW77+9c2xlZGVrIHV677+9du+/vXJreVwiLCA4MDAsIDYwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goXCJDaHliYSBw77+9aSBocm9tYWRu77+9IHV677+9du+/vXJjZS5cIiwgXCJnLXN0YXRlLWVycm9yXCIsIDEwMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwiTmVsemUgcHJvdu+/vXN0IGsgdXphdu+/vWVu77+9LiBOZXpu77+9be+/vSBjaHliYS5cIiwgXCJnLXN0YXRlLWVycm9yXCIsIDEwMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwiTmVsemUgcHJvdu+/vXN0IGsgdXphdu+/vWVu77+9LiBOZXpu77+9be+/vSBjaHliYS5cIiwgXCJnLXN0YXRlLWVycm9yXCIsIDEwMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1R5cHlQb2hsZWRhdmVrT3RldnJlbmlcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT3Rldu+/vWVu77+9XCIsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsID0gdGhpcy5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSBwb2xv77+9a3lcIiwgXCJWeWJlcnRlIHR5cHkgcG9obGVk77+9dmVrIGsgb3Rldu+/vWVu77+9LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJQcm9277+9c3QgaHJvbWFkbu+/vSBvdGV277+9ZW7vv70/XCIsIGBPcHJhdmR1IHByb3bvv71zdCBocm9tYWRu77+9IG90ZXbvv71lbu+/vSB2eWJyYW7vv71jaCB0eXDvv70gcG9obGVk77+9dmVrIGRvIHJva3UgJHt0aGlzLnJva0Rlbn0/PGJyPlRhdG8gb3BlcmFjZSBqZSBuZXZyYXRu77+9LmApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9PSBcInllc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHNlbC5tYXAoeCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogeC50eXBfcGhsISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB4Lk5hc3RhdmVuaSEucm9rISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhdl9waGw6IHguTmFzdGF2ZW5pIS5zdGF2X3BobCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2OiB4Lm5hemV2IVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3J2LmNhbGw8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNvbW1vbi5HVnlzbGVkZWtEdG8+KFwiSHJvbWFkbmVSb2NuaU90ZXZyZW5pXCIsIHsgZGF0YTogZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaHlieSA9PSBudWxsIHx8IHJlc3VsdC5jaHlieS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2gocmVzdWx0LnpwcmF2YSEsIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDEwMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlay5HQ2h5YnlcIiwgeyBJRDogXCJERFBHQ2h5YnkjXCIsIENoeWJ5OiByZXN1bHQgfSwgXCJW77+9c2xlZGVrIG90ZXbvv71lbu+/vVwiLCA4MDAsIDYwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwiQ2h5YmEgcO+/vWkgaHJvbWFkbu+/vW0gb3Rldu+/vXLvv71u77+9IHR5cO+/vSBwb2hsZWTvv712ZWsuXCIsIFwiZy1zdGF0ZS1lcnJvclwiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdUeXB5UG9obGVkYXZla096bk90ZXZcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT3puLiBvdGV2LlwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgcG9sb++/vWt5XCIsIFwiVnliZXJ0ZSB0eXB5IHBvaGxlZO+/vXZlaywga3Rlcu+/vSBjaGNldGUgb3puYe+/vWl0IGpha28gb3Rldu+/vWVu77+9LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm9reSA9IHNlbC5tYXAoeCA9PiB4Lk5hc3RhdmVuaSEucm9rISkuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiBhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXgpLmpvaW4oXCIsIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcIk96bmHvv71pdCBqYWtvIG90ZXbvv71lbu+/vT9cIiwgYE9wcmF2ZHUgb3puYe+/vWl0IHbvv71lY2hueSB2eWJyYW7vv70gdHlweSBwb2hsZWTvv712ZWsgcHJvIHJvayAke3Jva3l9IGpha28gb3Rldu+/vWVu77+9Pzxicj5OZXByb2Lvv71obm91IO+/ve+/vWRu77+9IHbvv71wb++/vXR5IHNvdXZpc2Vq77+9Y++/vSBzIG90ZXbvv71lbu+/vW0gdHlwdSBwb2hsZWTvv712a3kgZG8gbm9277+9aG8gcm9rdS48YnI+VGF0byBvcGVyYWNlIGplIG5ldnJhdG7vv70uYClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT09IFwieWVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBzZWwubWFwKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHgudHlwX3BobCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogeC5OYXN0YXZlbmkhLnJvayEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXZfcGhsOiB4Lk5hc3RhdmVuaSEuc3Rhdl9waGwhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXpldjogeC5uYXpldiFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNydi5jYWxsPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5Db21tb24uR1Z5c2xlZGVrRHRvPihcIkhyb21hZG5lT3puYWNlbmlKYWtvT3RldnJlbmVcIiwgeyBkYXRhOiBkYXRhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNoeWJ5ID09IG51bGwgfHwgcmVzdWx0LmNoeWJ5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaChyZXN1bHQuenByYXZhISwgXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgMTAwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrLkdDaHlieVwiLCB7IElEOiBcIkREUEdDaHlieSNcIiwgQ2h5Ynk6IHJlc3VsdCB9LCBcIlbvv71zbGVkZWsgb3puYe+/vWVu77+9IGpha28gb3Rldu+/vWVu77+9XCIsIDgwMCwgNjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goXCJDaHliYSBw77+9aSBocm9tYWRu77+9bSBvem5h77+9ZW7vv70gamFrbyBvdGV277+9ZW7vv70uXCIsIFwiZy1zdGF0ZS1lcnJvclwiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdUeXB5UG9obGVkYXZla0tvcGlyb3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb3Dvv71yb3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgcG9sb++/vWt5XCIsIFwiVnliZXJ0ZSB0eXB5IHBvaGxlZO+/vXZlaywga3Rlcu+/vSBjaGNldGUgemtvcO+/vXJvdmF0IGRvIG7vv71zbGVkdWrvv71j77+9aG8gcm9rdS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiWmtvcO+/vXJvdmF0IGRvIG7vv71zbGVkdWrvv71j77+9aG8gcm9rdT9cIiwgYE9wcmF2ZHUgemtvcO+/vXJvdmF0IHbvv71lY2hueSB2eWJyYW7vv70gdHlweSBwb2hsZWTvv712ZWsgZG8gbu+/vXNsZWR1au+/vWPvv71obyByb2t1Pzxicj5OZXByb2Lvv71obm91IO+/ve+/vWRu77+9IHbvv71wb++/vXR5IHNvdXZpc2Vq77+9Y++/vSBzIG90ZXbvv71lbu+/vW0gdHlwdSBwb2hsZWTvv712a3kgZG8gbm9277+9aG8gcm9rdS48YnI+VGF0byBvcGVyYWNlIGplIG5ldnJhdG7vv70uYClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT09IFwieWVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBzZWwubWFwKHggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHgudHlwX3BobCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogeC5OYXN0YXZlbmkhLnJvayEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2OiB4Lm5hemV2IVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3J2LmNhbGw8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNvbW1vbi5HVnlzbGVkZWtEdG8+KFwiSHJvbWFkbmVaa29waXJvdmF0RG9OYXNsZWR1amljaWhvUm9rdVwiLCB7IGRhdGE6IGRhdGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuY2h5YnkgPT0gbnVsbCB8fCByZXN1bHQuY2h5YnkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHJlc3VsdC56cHJhdmEhLCBcImctc3RhdGUtc3VjY2Vzc1wiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuQ29udHJvbHMuVHlweVBvaGxlZGF2ZWsuR0NoeWJ5XCIsIHsgSUQ6IFwiRERQR0NoeWJ5I1wiLCBDaHlieTogcmVzdWx0IH0sIFwiVu+/vXNsZWRlayBrb3Dvv71yb3bvv71u77+9IGRvIG7vv71zbGVkdWrvv71j77+9aG8gcm9rdVwiLCA4MDAsIDYwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwiQ2h5YmEgcO+/vWkga29w77+9cm9277+9bu+/vSBkbyBu77+9c2xlZHVq77+9Y++/vWhvIHJva3UuXCIsIFwiZy1zdGF0ZS1lcnJvclwiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdUeXB5UG9obGVkYXZla05hcG9jZXRTdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJO77+9cG/vv71ldCBzdC5cIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWwgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIHBvbG/vv71reVwiLCBcIlZ5YmVydGUgdiBzZXpuYW11IHbvv71lY2hueSBw77+977+9am15LCBwcm8ga3Rlcu+/vSBjaGNldGUgbmFwb++/ve+/vXRhdCBzdGF2eS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiTmFwb++/ve+/vXRhdCBzdGF2eT9cIiwgYE9wcmF2ZHUgY2hjZXRlIHByb3bvv71zdCBocm9tYWRu77+9IG5hcG/vv710ZW7vv70gc3Rhdu+/vSB2eWJyYW7vv71jaCB0eXDvv70gcG9obGVk77+9dmVrP2ApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9PSBcInllc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gc2VsLm1hcCh4ID0+IHgudHlwX3BobCEpLmZpbHRlcigodmFsdWUsIGluZGV4LCBhcnJheSkgPT4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KS5tYXAoeCA9PiB7IHJldHVybiB7IHR5cF9waGw6IHggfSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNydi5jYWxsPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5Db21tb24uR1Z5c2xlZGVrRHRvPihcIkhyb21hZG5lTmFwb2N0ZW5pU3RhdnVcIiwgeyBkYXRhOiBkYXRhLCBuYXR2cmRvOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaHlieSA9PSBudWxsIHx8IHJlc3VsdC5jaHlieS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2gocmVzdWx0LnpwcmF2YSEsIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDEwMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlay5HQ2h5YnlcIiwgeyBJRDogXCJERFBHQ2h5YnkjXCIsIENoeWJ5OiByZXN1bHQgfSwgXCJW77+9c2xlZGVrIG5hcG/vv710ZW7vv70gc3Rhdu+/vVwiLCA4MDAsIDYwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwiQ2h5YmEgcO+/vWkgcG/vv73vv71077+9bu+/vSBzdGF277+9IHBvaGxlZO+/vXZlay5cIiwgXCJnLXN0YXRlLWVycm9yXCIsIDEwMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VHlweVBvaGxlZGF2ZWtHVHlwUG9obGVkYXZreVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWwgdHlwdSBwb2hsZWTvv712a3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmVycm9yKFwiVnliZXJ0ZSBwb2xv77+9a3VcIiwgXCJWeWJlcnRlIHBvbG/vv71rdS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlay5HVHlwUG9obGVkYXZreVwiLCB7IHR5cF9waGw6IHJvdy50eXBfcGhsISwgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHksIGVkaXRNb2RlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUeXB5UG9obGVkYXZla0dUeXBQb2hsZWRhdmt5TmFzdGF2ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbCB0eXB1IHBvaGxlZO+/vXZreSBwcm8gcm9rIGEgde+/vWV0bu+/vSBzdO+/vWVkaXNrb1wiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIHBvbG/vv71rdVwiLCBcIlZ5YmVydGUgcG9sb++/vWt1LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrLkdUeXBQb2hsZWRhdmt5TmFzdGF2ZW5pXCIsIHsgdHlwX3BobDogcm93LnR5cF9waGwhLCByb2s6IHJvdy5OYXN0YXZlbmkhLnJvayEsIHVjczogcm93Lk5hc3RhdmVuaSEudWNzLCBpY286IHJvdy5OYXN0YXZlbmkhLmljbywgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHksIGVkaXRNb2RlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUeXB5UG9obGVkYXZla0dTZXpuYW1TcHJhdmN1XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNwcu+/vXZjaVwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbCB8fCByb3cuTmFzdGF2ZW5pIS5wcml6X3NwciAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIHBvbG/vv71rdVwiLCBcIlZ5YmVydGUgcG9sb++/vWt1LCBrdGVy77+9IG3vv70gcO+/ve+/vXpuYWsgc3By77+9dmNlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrLkdTZXpuYW1TcHJhdmN1XCIsIHsgSUQ6XCJERFBHU2V6bmFtU3ByYXZjdSNcIiwgdHlwX3BobDogcm93LnR5cF9waGwhLCByb2s6IHJvdy5OYXN0YXZlbmkhLnJvayEgfSwgXCJTZXpuYW0gc3By77+9dmPvv71cIiwgODAwLCA2MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VHlweVBvaGxlZGF2ZWtHU3RhdGlzdGlrYVBvdXppdHljaFR5cHVEb2tcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdGlzdGlrYSBwb3Xvv71pdO+/vWNoIHR5cO+/vSBkb2t1bWVudO+/vVwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5kZHBfcmV6X3pqZWRubyxcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaVN0YXRpc3Rpa2FEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIHBvbG/vv71rdVwiLCBcIlZ5YmVydGUgcG9sb++/vWt1LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlZ5bWFoYW5pLkdTdGF0aXN0aWthRG9rdW1lbnR1XCIsIHsgSUQ6IFwiRERQR1N0YXRpc3Rpa2FEb2t1bWVudHUjXCIsIEl4cDogcm93LnR5cF9waGwgfSwgYFN0YXRpc3Rpa2EgcG9177+9aXTvv71jaCB0eXDvv70gZG9rdW1lbnTvv70gJHtyb3cudHlwX3BobCF9YCwgODAwLCA2MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUeXB5UG9obGVkYXZla0dDaXNlbG5pa3lcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwi77+977+9c2Vsbu+/vWt5XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLmRkcF9yZXpfemplZG5vLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIHBvbG/vv71rdVwiLCBcIlZ5YmVydGUgcG9sb++/vWt1LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLkNpc2VsbmlreS5HQ2lzZWxuaWt5XCIsIHsgSUQ6IFwiRERQR0Npc2VsbmlreSNcIiwgdHlwX3BobDogcm93LnR5cF9waGwhIH0sIGDvv73vv71zZWxu77+9a3kgdHlwdSBwb2hsZWTvv712a3kgJHtyb3cudHlwX3BobCF9YCwgODAwLCA2MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnUoKSB7XHJcbiAgICAgICAgICAgIGxldCBtZW51OiBNZW51UGFyYW1zW10gPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkhsYXZu77+9IHV677+9du+/vXJrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrVXpIcm9tXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrSGlzdFV6XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPcHJhdm7vv70gcG9sb++/vWt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHVHlweVBvaGxlZGF2ZWtHZW5PcHJQb2xcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb++/vW7vv70gdXrvv71277+9cmthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHVHlweVBvaGxlZGF2ZWtQcmlwS1V6YXZcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RHVHlweVBvaGxlZGF2ZWtVemF2cmVuaVwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdUeXB5UG9obGVkYXZla090ZXZyZW5pXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNlcnZpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrT3puT3RldlwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdUeXB5UG9obGVkYXZla0tvcGlyb3ZhdFwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdEdUeXB5UG9obGVkYXZla05hcG9jZXRTdFwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSW5mb3JtYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwiaW1wb3J0YW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnNbXCJhY3RUeXB5UG9obGVkYXZla0dUeXBQb2hsZWRhdmt5XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0VHlweVBvaGxlZGF2ZWtHVHlwUG9obGVkYXZreU5hc3RhdmVuaVwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdFR5cHlQb2hsZWRhdmVrR1N0YXRpc3Rpa2FQb3V6aXR5Y2hUeXB1RG9rXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0VHlweVBvaGxlZGF2ZWtHU2V6bmFtU3ByYXZjdVwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdFR5cHlQb2hsZWRhdmVrR0Npc2VsbmlreVwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKG1lbnUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiUGFyYW1ldHJ5IHBvaGxlZO+/vXZreVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTS0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcG9obGVk77+9dmt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoeyBkZWZhdWx0T3BlcmF0b3I6IFwiTElLRVwiLCBvcGVyYXRvcnM6IFtcIkxJS0VcIiwgXCI9XCJdLCB1c2VyT3BlcmF0b3JzOiBbXSB9KSwgeyBuYW1lOiBcInR5cF9waGxcIiwgcGxhY2Vob2xkZXI6IFwiVHlwXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJO77+9emV2XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoeyBkZWZhdWx0T3BlcmF0b3I6IFwiTElLRVwiLCBvcGVyYXRvcnM6IFtcIkxJS0VcIiwgXCJDT05UQUlOU1wiLCBcIj1cIl0sIHVzZXJPcGVyYXRvcnM6IFtdIH0pLCB7IG5hbWU6IFwibmF6ZXZcIiwgcGxhY2Vob2xkZXI6IFwiTu+/vXpldlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiT2Jkb2Lvv71cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0Lm5Fa29zb2JkKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIk9iZG9i77+9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IHRoaXMucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnJvaz12YWx1ZS5yb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZCA9IHRoaXMuZmlsdGVyIS5maW5kRmllbGRzKFwibWluX3Jva1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgcG9obGVk77+9dmt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5kZHBjc3RwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfcGhsPXZhbHVlLnN0YXZfcGhsXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwibWluX3Jva1wiLCBsYWJlbDogXCJOZW90ZXbvv71lbu+/vSB6IG1pbi4gcm9rdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInByaXpfc3ByXCIsIGxhYmVsOiBcIlBvdXplIHNwcmF2b3Zhbu+/vSB0eXB5XCIgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy8hIHpha29tZW50b3bvv71ubywgemJ5dGXvv71u77+9IHBvbO+/ve+/vWthIHBybyBmaWx0ZXJwYW5lbFxyXG4gICAgICAgICAgICAvLy5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwicG91emVfZmF2XCIsIGxhYmVsOiBcIlBvdXplIG9ibO+/vWJlbu+/vVwiIH0pXHJcbiAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJ1bG96aXRfZmlsdHJcIiwgbGFiZWw6IFwiUGFtYXRvdmF0IHNpIGZpbHRyXCIgfSlcclxuICAgICAgICAgICAgLy8hdGxh77+977+9dGtvIHZ5aGxlZGF0IHRha++/vSB6YWtvbWVudG9277+9bm9cclxuICAgICAgICAgICAgLy8uYWRkUm93KHsgY3VzdG9tQ2xhc3M6IFwicmlnaHRcIiB9KVxyXG4gICAgICAgICAgICAvLy5hZGRGaWVsZChcImdidXR0b25cIiwgeyBwYXJhbXM6IHsgcHJpbWFyeTogdHJ1ZSwgY3VzdG9tQ2xhc3M6IFwicmlnaHRcIiwgaWQ6IFwiYWN0R1R5cHlQb2hsZWRhdmVrVnlobGVkYXRfYnV0dG9uXCIsIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrVnlobGVkYXRcIl0gfSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vZm9ybS5maW5kRmllbGRzKFwicm9rXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyByb2s6IHRoaXMucm9rIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgZmlsdHJ1XHJcbiAgICAgICAgICAgIC8vdGhpcy5maWx0ZXIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5cclxuICAgICAgICAgICAgLy8gICAgZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGZvcm1zOiBbZm9ybV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgYXBwbHk6IChldmVudCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5vX2ZpbHRyID0gb2JqLmZpbHRlclxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMudnlobGVkYXQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3RoaXMuYWN0aW9uc1tcImFjdEdUeXB5UG9obGVkYXZla1Z5aGxlZGF0XCJdO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdGhpcy56aXNrZWpEYXRhKHRoaXMub19maWx0cilcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgZmlsdHJ1XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBkaXYgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgLy8gICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgLy8gICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlQWN0aW9ucyhyb3c6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0byB8IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrVXpIcm9tXCJdIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RUeXB5UG9obGVkYXZla0dTZXpuYW1TcHJhdmN1XCJdIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHVHlweVBvaGxlZGF2ZWtHZW5PcHJQb2xcIl0hLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdUeXB5UG9obGVkYXZla1ByaXBLVXphdlwiXSEuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrVXphdnJlbmlcIl0hLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdUeXB5UG9obGVkYXZla090ZXZyZW5pXCJdIS5lbmFibGVkKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJvdyAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy5OYXN0YXZlbmkhLnByaXpfc3ByID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0VHlweVBvaGxlZGF2ZWtHU2V6bmFtU3ByYXZjdVwiXSEuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHVHlweVBvaGxlZGF2ZWtVekhyb21cIl0hLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0VHlweVBvaGxlZGF2ZWtHU2V6bmFtU3ByYXZjdVwiXSEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrVXpIcm9tXCJdIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyb3cuTmFzdGF2ZW5pIS5zdGF2X3BobCAhPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrVXpIcm9tXCJdIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHVHlweVBvaGxlZGF2ZWtHZW5PcHJQb2xcIl0hLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyb3cuTmFzdGF2ZW5pIS5zdGF2X3BobCA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrVXphdnJlbmlcIl0hLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdUeXB5UG9obGVkYXZla090ZXZyZW5pXCJdIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93Lk5hc3RhdmVuaSEuc3Rhdl9waGwgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdEdUeXB5UG9obGVkYXZla090ZXZyZW5pXCJdIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHVHlweVBvaGxlZGF2ZWtQcmlwS1V6YXZcIl0hLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3cuTmFzdGF2ZW5pIS5zdGF2X3BobCA9PT0gMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0R1R5cHlQb2hsZWRhdmVrUHJpcEtVemF2XCJdIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbXCJhY3RHVHlweVBvaGxlZGF2ZWtVemF2cmVuaVwiXSEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpOiBKUXVlcnkge1xyXG4gICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1widHlwX3BobFwiLCBcIm5hemV2XCIsIFwicm9rXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIipcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmNlbGxJbmZvLnJvdyA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUFjdGlvbnMob2JqLmNlbGxJbmZvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQWN0aW9ucyhudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdFR5cHlQb2hsZWRhdmVrR1R5cFBvaGxlZGF2a3lcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy90b2RvOiEhISBORVpBUE9NRU5PVVQgUE9LVUQgVE8gQlVEVSBWUkFDRVQgTkEgUO+/vVZPRE7vv70gVkVSWkkgT0RLT01FTlRPVkFUIFRFTlRPIO+/ve+/vURFSyBLVEVS77+9IFRVIFYgRFVQTElDSVTvv70gSO+/ve+/vUUgQ0hZQlUga3bvv71saSBcIlRISVNcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IERkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlR5cHlQb2hsZWRhdmVrMigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiZmF2b3VyaXRlLCBOYXN0YXZlbmkucm9rLCB0eXBfcGhsLCBuYXpldiwgTmFzdGF2ZW5pLmRhdF91emF2LCBOYXN0YXZlbmkuc3Rhdl9waGwsIE5hc3RhdmVuaS5wcml6X3NwciwgcG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOYXN0YXZlbmkuc3Rhdl9waGxcIjogeyBcIndpZHRoXCI6IDUwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk5hc3RhdmVuaS5wcml6X3NwclwiOiB7IFwid2lkdGhcIjogMzAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicG96bmFta2FcIjogeyBcIndpZHRoXCI6IDE1MCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOYXN0YXZlbmkucm9rXCI6IHsgXCJ3aWR0aFwiOiAyMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBfcGhsXCI6IHsgXCJ3aWR0aFwiOiAyMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYXpldlwiOiB7IFwid2lkdGhcIjogOTAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTmFzdGF2ZW5pLmRhdF91emF2XCI6IHsgXCJ3aWR0aFwiOiA0MCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVDaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVBY3Rpb25zKHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RmlsdGVycygpIHtcclxuICAgICAgICAgICAgbGV0IGZpbHRlcjogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgaWNvOiB0aGlzLmljbyxcclxuICAgICAgICAgICAgICAgIHVjczogdGhpcy51Y3NcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyIS5maW5kRmllbGRzKFwicm9rXCIsIFwic3Rhdl9waGxcIiwgXCJ0eXBfcGhsXCIsIFwibmF6ZXZcIiwgXCJwcml6X3NwclwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwb3V6ZV9mYXY6IGJvb2xlYW4gPSB0aGlzLmZpbHRlciEuZmluZEZpZWxkcyhcInBvdXplX2ZhdlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKHBvdXplX2Zhdikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZhdnMgPSB0aGlzLmdldEZhdm91cml0ZXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChmYXZzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIGZhdnMgPSBbXCIjIyMjXCJdO1xyXG4gICAgICAgICAgICAgICAgLy8jIyMjIHRvIGVuc3VyZSBub3RoaW5nIGlzIGZvdW5kIGlmIHRoZXJlIGFyZSBubyBmYXZvdXJpdGVzXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnR5cF9waGwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci50eXBfcGhsID0geyBvOiBcIklOXCIsIHY6IGZhdnMgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmaWx0ZXIudHlwX3BobCAhPT0gXCJvYmplY3RcIiAmJiBmYXZzLmluZGV4T2YoZmlsdGVyLnR5cF9waGwpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci50eXBfcGhsID0gXCIjIyMjXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZmlsdGVyLnR5cF9waGwgPT09IFwib2JqZWN0XCIgJiYgZmlsdGVyLnR5cF9waGwubyA9PT0gXCI9XCIgJiYgZmF2cy5pbmRleE9mKGZpbHRlci50eXBfcGhsLnYpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci50eXBfcGhsID0gXCIjIyMjXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaWx0ZXIudHlwX3BobCA9PT0gXCJvYmplY3RcIiAmJiBmaWx0ZXIudHlwX3BobC5vID09PSBcIkxJS0VcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmF2czIgPSBmYXZzLmZpbHRlcih4ID0+IHguaW5kZXhPZihmaWx0ZXIudHlwX3BobC52KSA9PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmF2czIubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdnMyID0gW1wiIyMjI1wiXTtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIudHlwX3BobCA9IHsgbzogXCJJTlwiLCB2OiBmYXZzMiB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgbWluX3JvazogYm9vbGVhbiA9IHRoaXMuZmlsdGVyIS5maW5kRmllbGRzKFwibWluX3Jva1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKG1pbl9yb2spIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5taW5fcm9rID0gZmlsdGVyLnJvayEgLSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsdGVyLnByaXpfc3ByID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLnByaXpfc3ByID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGxhdm5pVXphdmVya2EoZGF0X3V6YXY6IERhdGUsIGl0ZW1zOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG9bXSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcIlByb3bvv71zdCB1eu+/vXbvv71ya3U/XCIsIFwiT3ByYXZkdSBjaGNldGUgcHJvdu+/vXN0IHV677+9du+/vXJrdSB2eWJyYW7vv71jaCB0eXDvv70gcG9obGVk77+9dmVrPzxicj5UYXRvIG9wZXJhY2UgamUgbmV2cmF0bu+/vS5cIilcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldjIsIHJldFZhbDIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsMiAhPT0gXCJ5ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGl0ZW1zLm1hcChhID0+IHsgcmV0dXJuIHsgdHlwX3BobDogYS50eXBfcGhsISwgcm9rOiBhLk5hc3RhdmVuaSEucm9rISwgcHJpel9zcHI6IGEuTmFzdGF2ZW5pIS5wcml6X3NwciEsIG5hemV2OiBhLm5hemV2ISwgZGF0X3V6YXY6IGEuTmFzdGF2ZW5pIS5kYXRfdXphdiwgc3Rhdl9waGw6IGEuTmFzdGF2ZW5pIS5zdGF2X3BobCEgfSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tSdW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gXCJHb3JkaWMuRGRwLlNlcnZlci5MSy5Bc3luYy5HRGRwVHlweVBvaGxlZGF2ZWtIbGF2bmlVemF2ZXJrYUFzeW5jVGFza1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIEFzeW5jLkdUYXNrTWFuYWdlci5pbml0KHsgZGVsYXk6IDEwMDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQXN5bmMuR1Rhc2tNYW5hZ2VyLmdldEluaXRQcm9taXNlKCkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGd1aWQgPSBEZHAuV2ViQ2xpZW50LkNvbW1vbi5CYXNlLkNyZWF0ZUd1aWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmMuR1Rhc2tNYW5hZ2VyLm9uKGBjaGFuZ2UuJHtndWlkfWAsIGNsYXNzTmFtZSwgZnVuY3Rpb24gKGN0eCwgYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaWQgPT0gdGhhdC5jdXJyZW50VGFzaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHgucHJvZ3Jlc3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucHJvZ3Jlc3NPcGVyYXRpb24oY3R4LnByb2dyZXNzLnRleHQsIGN0eC5wcm9ncmVzcy5jdXJyZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmMuR1Rhc2tNYW5hZ2VyLm9uPEFzeW5jLklHVGFza1Byb2dyZXNzLCBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uQ29tbW9uLkdWeXNsZWRla0R0bz4oYGRvbmUuJHtndWlkfWAsIGNsYXNzTmFtZSwgZnVuY3Rpb24gKGN0eCwgYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaWQgPT0gdGhhdC5jdXJyZW50VGFzaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjdHgucmVzdWx0ITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNoeWJ5ID09IG51bGwgfHwgcmVzdWx0LmNoeWJ5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHJlc3VsdC56cHJhdmEhLCBcImctc3RhdGUtc3VjY2Vzc1wiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrLkdDaHlieVwiLCB7IElEOiBcIkREUEdDaHlieSNcIiwgQ2h5Ynk6IHJlc3VsdCB9LCBcIlbvv71zbGVkZWsg77+9eu+/vXbvv71ya3lcIiwgODAwLCA2MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3luYy5HVGFza01hbmFnZXIub24oYGFsd2F5cy4ke2d1aWR9YCwgY2xhc3NOYW1lLCBmdW5jdGlvbiAoY3R4LCBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pZCA9PSB0aGF0LmN1cnJlbnRUYXNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRhc2tSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXJyZW50VGFzayA9IFwiI25vX3Rhc2sjXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jLkdUYXNrTWFuYWdlci5vZmYoYGNoYW5nZS4ke2d1aWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmMuR1Rhc2tNYW5hZ2VyLm9mZihgZG9uZS4ke2d1aWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmMuR1Rhc2tNYW5hZ2VyLm9mZihgYWx3YXlzLiR7Z3VpZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luYy5HVGFza01hbmFnZXIudW5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcnYuY2FsbChcIlN0YXJ0QXN5bmNUYXNrXCIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGR0bzogeyBkYXR1bTogZGF0X3V6YXYsIHBvbG96a3k6IGRhdGEgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHRhc2tJZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSB0YXNrSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJQcm9i77+9aO+/vSB1eu+/vXbvv71ya2EgdHlw77+9IHBvaGxlZO+/vXZlay5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsOiBkYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdUeXB5UG9obGVkYXZla1V6SHJvbV9acnVzaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ177+9aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiWnJ177+9aXRcIiwgXCJPcHJhdmR1IGNoY2V0ZSB6cnXvv71pdCDvv71sb2h1P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXZDLCByZXRWYWxDKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsQyA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrID0gQXN5bmMuR1Rhc2tNYW5hZ2VyLmZpbmRCeUlkKHRhc2tJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2sgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzay5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcIu+/vWxvaGEgbmVuYWxlemVuYVwiLCBcIk5lcG9kYe+/vWlsbyBzZSBuYWrvv710IGluc3RhbmNpIHBy77+9du+/vSBwcm9i77+9aGFq77+9Y++/vSDvv71sb2h5LiDvv71sb2hhIG5lYnlsYSBw77+9ZXJ177+9ZW5hLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gdGhpcy5zcnYuY2FsbChcIkhsYXZuaVV6YXZlcmthUGFyYW1ldHJ5XCIpLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgLyp0aGlzLnNydi5jYWxsKFwiSGxhdm5pVXphdmVya2FQYXJhbWV0cnlcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHBhcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbWV0cnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0dW06IGRhdF91emF2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc19zcHI6IHBhcnNbXCJjaXNfc3ByXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkcF9yYWRfdXphdmhsOiBwYXJzW1wiZGRwX3JhZF91emF2aGxcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGRwX3V6YV9ocm9tdnk6IHBhcnNbXCJkZHBfdXphX2hyb212eVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZHBfcmFkX3BvdXBybzogcGFyc1tcImRkcF9yYWRfcG91cHJvXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRkcF9yYWRfaHV6enBwOiBwYXJzW1wiZGRwX3JhZF9odXp6cHBcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sb3preTogZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmMuR1Rhc2tNYW5hZ2VyLmluaXQoeyBkZWxheTogNTAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2sgPSBBc3luYy5HVGFza01hbmFnZXIuc3RhcnQ8QXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5Db21tb24uR0RkcFZ5c2xlZGVrRHRvPihcIkdvcmRpYy5EZHAuU2VydmVyLkxLLkFzeW5jLkdEZHBUeXB5UG9obGVkYXZla0hsYXZuaVV6YXZlcmthQXN5bmNUYXNrXCIsIHBhcmFtZXRyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJQcm9i77+9aO+/vSB1eu+/vXbvv71ya2EgdHlw77+9IHBvaGxlZO+/vXZlay5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbDogZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1R5cHlQb2hsZWRhdmVrVXpIcm9tX1pydXNpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpyde+/vWl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJacnXvv71pdFwiLCBcIk9wcmF2ZHUgY2hjZXRlIHpyde+/vWl0IO+/vWxvaHU/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2QywgcmV0VmFsQykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsQyA9PT0gXCJ5ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2suY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2sub24oXCJjaGFuZ2VcIiwgKGN0eCwgYXJncykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHgucHJvZ3Jlc3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzT3BlcmF0aW9uKGN0eC5wcm9ncmVzcy50ZXh0LCBjdHgucHJvZ3Jlc3MuY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkub24oXCJkb25lXCIsIChjdHgsIGFyZ3MpID0+IHtcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjdHgucmVzdWx0ITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNoeWJ5ID09IG51bGwgfHwgcmVzdWx0LmNoeWJ5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHJlc3VsdC56cHJhdmEhLCBcImctc3RhdGUtc3VjY2Vzc1wiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrLkdDaHlieVwiLCB7IElEOiBcIkREUEdDaHlieSNcIiwgQ2h5Ynk6IHJlc3VsdCB9LCBcIlbvv71zbGVkZWsg77+9eu+/vXbvv71ya3lcIiwgODAwLCA2MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLm9uKFwiYWx3YXlzXCIsIGZ1bmN0aW9uICh0aGlzOiBBc3luYy5JR1Rhc2ssIGN0eCwgYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50YXNrUnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luYy5HVGFza01hbmFnZXIudW5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgKi9cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qIHRoaXMuc3J2LmNhbGw8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNvbW1vbi5HRGRwVnlzbGVkZWtEdG8+KFwiSHJvbWFkbmFVemF2ZXJrYVwiLCB7IGRhdF91emF2OiBkYXRfdXphdiwgZGF0YTogZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNoeWJ5ID09IG51bGwgfHwgcmVzdWx0LmNoeWJ5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHJlc3VsdC56cHJhdmEhLCBcImctc3RhdGUtc3VjY2Vzc1wiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrLkdDaHlieVwiLCB7IElEOiBcIkREUEdDaHlieSNcIiwgQ2h5Ynk6IHJlc3VsdCB9LCBcIlbvv71zbGVkZWsg77+9eu+/vXbvv71ya3lcIiwgODAwLCA2MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goXCJDaHliYSBw77+9aSB1emF277+9cu+/vW7vv70gcG9obGVk77+9dmVrLlwiLCBcImctc3RhdGUtZXJyb3JcIiwgMTAwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvcHJhdnkocGFyYW1zOiBhbnksIGRhdGE6IGFueSwgY2h5Ynk6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiUG9rcmHvv71vdmF0P1wiLCBcIk9wcmF2ZHUgY2hjZXRlIGdlbmVyb3ZhdCBvcHJhdm7vv70gcG9sb++/vWt5IHBybyB2eWJyYW7vv70gdHlweSBwb2hsZWTvv712ZWs/XCIpXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT09IFwieWVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbihcIlByb2Lvv71o77+9IGdlbmVyb3bvv71u77+9IG9wcmF2bu+/vWNoIHBvbG/vv71lay5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcnYuY2FsbDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uQ29tbW9uLkdWeXNsZWRla0R0bz4oXCJIcm9tYWRuZUdlbmVyb3ZhbmlPcHJhdm55Y2hQb2xvemVrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0dW06IHBhcmFtcy5kYXR1bSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Rsb3plbmU6IHBhcmFtcy5vZGxvemVuZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2RwaXN5OiBwYXJhbXMub2RwaXN5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2h5YnkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuY2h5YnkgPT0gbnVsbCB8fCByZXN1bHQuY2h5YnkubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jaHlieSA9IGNoeWJ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNoeWJ5ID0gY2h5YnkuY29uY2F0KHJlc3VsdC5jaHlieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaHlieSA9PSBudWxsIHx8IHJlc3VsdC5jaHlieS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHJlc3VsdC56cHJhdmEhLCBcImctc3RhdGUtc3VjY2Vzc1wiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5UeXB5UG9obGVkYXZlay5HQ2h5YnlcIiwgeyBJRDogXCJERFBHQ2h5YnkjXCIsIENoeWJ5OiByZXN1bHQgfSwgXCJW77+9c2xlZGVrIGdlbmVyb3bvv71u77+9IG9wcmF2bu+/vWNoIHBvbG/vv71la1wiLCA4MDAsIDYwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goXCJDaHliYSBw77+9aSB1emF277+9cu+/vW7vv70gcG9obGVk77+9dmVrLlwiLCBcImctc3RhdGUtZXJyb3JcIiwgMTAwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdEZhdm91cml0ZXMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZhdm91cml0ZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlclNldHRpbmdzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wID0gdGhpcy51c2VyU2V0dGluZ3MuZ2V0KFwidHlwX3BobF9mYXZvdXJpdGVzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0bXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdm91cml0ZXMgPSB0bXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhdm91cml0ZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGYXZvdXJpdGVzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0RmF2b3VyaXRlcygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmF2b3VyaXRlcy5zbGljZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzRmF2b3VyaXRlKHR5cF9waGw6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRGYXZvdXJpdGVzKCk7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmF2b3VyaXRlcy5pbmRleE9mKHR5cF9waGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPj0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRGYXZvdXJpdGUodHlwX3BobDogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRGYXZvdXJpdGVzKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZhdm91cml0ZXMuaW5kZXhPZih0eXBfcGhsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXZvdXJpdGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXZvdXJpdGVzLnB1c2godHlwX3BobCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJTZXR0aW5ncyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJTZXR0aW5ncy5zZXQoXCJ0eXBfcGhsX2Zhdm91cml0ZXNcIiwgdGhpcy5mYXZvdXJpdGVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzLnNhdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJOZXVsb++/vWVub1wiLCBcIk5lcG9kYe+/vWlsbyBzZSB1bG/vv71pdCBvYmzvv71iZW7vv70gdHlweSBwb2hsZWTvv712ZWsuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2eWhsZWRhdCgpIHtcclxuICAgICAgICAgICAgLy8hIHRlc3RcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5maWx0ZXIhLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyID0gdGhpcy5nZXRGaWx0ZXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKFwiaW5zdGFuY2VcIikucmVmcmVzaCgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKFwicmVmcmVzaFJvd3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQWN0aW9ucyhyb3cpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIXpha29tZW50b3bvv71ubywgdSBmaWx0cnBhbmVsdSB6Ynl0Ze+/vW5vc3QuXHJcbiAgICAgICAgICAgIC8vbGV0IHVsb3ppdCA9IHRoaXMuZmlsdGVyIS5maW5kRmllbGRzKFwidWxveml0X2ZpbHRyXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAvL2lmICh1bG96aXQgPT09IHRydWUgJiYgdGhpcy51c2VyU2V0dGluZ3MgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgLy8gICAgbGV0IGZpbHRlclRvU2F2ZTogYW55ID0ge307XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuZmlsdGVyIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZpbHRlclRvU2F2ZSk7XHJcbiAgICAgICAgICAgIC8vICAgIGRlbGV0ZSBmaWx0ZXJUb1NhdmUudWxveml0X2ZpbHRyO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgdGhpcy51c2VyU2V0dGluZ3MhLnNldChcIkdUeXB5UG9obGVkYXZla0ZpbHRlclwiLCBmaWx0ZXJUb1NhdmUpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2luZygpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGFza1J1bm5pbmcpXHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJQcm9i77+9aO+/vSDvv71sb2hhIG5hIHBvemFk77+9LiBWee+/vWtlanRlIG5hIGRva29u77+9ZW7vv70gbmVibyDvv71sb2h1IHpyde+/vXRlLlwiKS5vbihcImNsb3NlXCIsICgpID0+IHsgZGVmLnJlamVjdCgpOyB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4iXX0=