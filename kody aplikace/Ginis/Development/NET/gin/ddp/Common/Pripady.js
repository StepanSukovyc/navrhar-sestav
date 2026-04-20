"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.Pripady.ts                            </Name>
//    <Description> Sdílené metody a funkceDDP pro práci s detailem (případem)  </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Sdílené metody DDP pro práci s detailem (případem)
             */
            let DdpDetail;
            (function (DdpDetail) {
                /**
                 * Trigger pro aktivní operaci na detailu
                 */
                DdpDetail.triggerChange = "ddp_change";
            })(DdpDetail = WebClient.DdpDetail || (WebClient.DdpDetail = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Common;
            (function (Common) {
                var Pripady;
                (function (Pripady) {
                    //export function createActionsPripad(content: GContent): ObjectLiteral<GActionParamsDefObj | GAction> {
                    //    const that = this;
                    //    return ({
                    //        actVytvoreniSouvUkolu: {
                    //            name: "actVytvoreniSouvUkolu",
                    //            caption: "Vytvoření souvisejícího úkolu",
                    //            icon: Common.Prefabs.Icons.VytvorSouvUkol(),
                    //            enabled: false, // that.permsDto.act.akceVytvoreniSouvUkolu!, //TODO: momentálně v akci NastavNeimplementovaneAkce ale používá už nové GPermission z ISLu
                    //            run: () => {
                    //                souvisejiciUkol()
                    //            }
                    //        },
                    //    });
                    //}
                    function createGridStavUhradyPripadu(ixp, element, content) {
                        let view = new Gordic.Isl.View(Gordic.Isl.PripadUhrady.list(rq => {
                            return {
                                filters: {
                                    ixp: ixp
                                }
                            };
                        }));
                        element.gautofit()
                            .ggrid({
                            data: view,
                            defaultProfile: {
                                columnList: "stav, c, c_uhr, c_dluh, dat_spl, dat_uhr, po_splatnosti, ktg_upo, pri_uhr"
                            },
                            searchColumns: ["c", "c_uhr", "c_dluh", "dat_spl", "dat_uhr", "po_splatnosti", "ktg_upo", "pri_uhr"],
                            columns: Ddp.WebClient.Common.GridFormats.UhradyPripadu()
                        })
                            .resize();
                    }
                    Pripady.createGridStavUhradyPripadu = createGridStavUhradyPripadu;
                    /**
                     * Funkce pro otevření detailu případu DDP
                     * Obsahuje kontrolu zda je možné detail otevřít/zobrazit
                     * Nově také obsahuje kontrolu na typ pohledávky a jeho možnou změnu
                     * @param {GContent} content Content (this)
                     * @param {string} pidPripadu PID/IXP - identifikátor případu DDP
                     * @param {string} kniha IXP_DEN - není-li kniha uvedena, dotahuje se na detailu případu
                     * @param {string} TypPhlPripadu ID Typu pohledávky ( není potřeba - dotahuje se ze serveru -> data. )
                     * @param {any} grid Data z gridu - slouží pro posouvání případu po něm - případné další změny pozavření
                     * @param {boolean} zmenenTypPhl Proměnná
                     * Kontroluje typ pohledavky na případu a v ekoinitu
                     */
                    function openPripadDetail(content, pidPripadu, kniha, TypPhlPripadu, grid, zmenenTypPhl) {
                        if (pidPripadu == null || pidPripadu == undefined || pidPripadu.length != 12)
                            return content.dialogs.error("Chyba", "Neplatný PID případu");
                        content.beginOperation({ id: "openPripadDetailOp", text: "Načítám..." });
                        zmenenTypPhl = zmenenTypPhl ?? false;
                        let testDdp = content.isl.Pripad.kontrolaPredOtevrenimPripaduExt(rq => {
                            return {
                                ip_ixp: pidPripadu
                            };
                        }).get();
                        var openingDetail = (inputVal) => {
                            var gridRemoteControl;
                            if (grid != null)
                                gridRemoteControl = new Gordic.Components.GridRC(grid);
                            if (kniha) {
                                const newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, kniha);
                                let $detailWindow1 = content.navigate(["Gordic.Ddp.WebClient.GPripadDetail", { gpc: newGpc, gridRemoteControl: gridRemoteControl }], inputVal);
                            }
                            else {
                                let $detailWindow2 = content.navigate(["Gordic.Ddp.WebClient.GPripadDetail", { gridRemoteControl: gridRemoteControl }], inputVal);
                            }
                        };
                        testDdp
                            .always(() => {
                            content.endOperation({ id: "openPripadDetailOp" });
                        })
                            .done((data) => {
                            switch (data.moznost_otevreni) {
                                // Když nejde o případ tak zobrazím obecný dokument 
                                case 1 /* Interface.GDdpGlobalsBase.OtevreniDetailu.DokumentNeniPripad */:
                                    Gordic.Wfl.Dialogs.DetailDokumentuSpisu(undefined, { SimpleMode: true, DetailDto: { ixp: pidPripadu } }, Gordic.Global.Enums.ModOtevreni.auto);
                                    break;
                                // Nemáte povoleno zobrazení případů z tohoto typu pohledávky nebo správce!
                                case 2 /* Interface.GDdpGlobalsBase.OtevreniDetailu.NeniPovolenoZobrazeniPripadu */:
                                    return content.dialogs.error("Chyba", "Nemáte povoleno zobrazení případů z tohoto typu pohledávky nebo správce!");
                                    break;
                                // V režimu práce pouze s vymáháním nelze případy DDP zobrazit! 
                                case 3 /* Interface.GDdpGlobalsBase.OtevreniDetailu.RezimPracePouzeVymahani */:
                                    return content.dialogs.error("Chyba", "V režimu práce pouze s vymáháním nelze případy DDP zobrazit!");
                                    break;
                                // Detail se otevře
                                case 4 /* Interface.GDdpGlobalsBase.OtevreniDetailu.OK */:
                                default:
                                    let inputValues = { ID: "DDPGPripadDetail#", Ixp: pidPripadu, TypPhl: data.typ_phl };
                                    // Tady by potom mělo nebo mohlo být něco jako if (zmenenTypPhl) rovnou otevři případ
                                    if (zmenenTypPhl) {
                                        openingDetail(inputValues);
                                    }
                                    else {
                                        zmenaTypuPohledavky(content, data.typ_phl, data.typ_phl_init, zmenenTypPhl, data.ddp_phl_prepno ?? 0, data.ddp_phl_prepns ?? 0, pidPripadu)
                                            .done(() => {
                                            return;
                                        })
                                            .fail(() => {
                                            openingDetail(inputValues);
                                        });
                                    }
                                    break;
                            }
                        });
                    }
                    Pripady.openPripadDetail = openPripadDetail;
                    function zmenaTypuPohledavky(content, typ_phl_new, typ_phl_old, zmenenTypPhl, 
                    //ZeSeznamuPhl: boolean,
                    ddp_phl_prepno, ddp_phl_prepns, ixp) {
                        const def = $.Deferred();
                        //if (zmenenTypPhl) {
                        //    return def.reject().promise();
                        //}
                        //if (!zeSeznamuNeboPripad) {
                        //    return def.reject().promise();
                        //}
                        if (typ_phl_old === typ_phl_new) {
                            return def.reject().promise();
                        }
                        const pokracuj = () => {
                            changeTypPhl(content, typ_phl_new, zmenenTypPhl, ixp)
                                .done(() => def.resolve())
                                .fail(() => def.reject());
                        };
                        // Test přepisu funkce dovnitř
                        //const change = () => {
                        //    zmenenTypPhl = true;
                        //    const newGPC = $.extend({}, content.gpc, {
                        //        typ_phl: typ_phl_new
                        //    });
                        //    content.changeContext(newGPC, true);
                        //    return $.Deferred().resolve().promise();
                        //}
                        // 2 = zeptat se
                        if (ddp_phl_prepno === 2) {
                            Common.Base.confirmAsync(content, "Upozornění", "Přejete si změnit typ pohledávky?")
                                .then(ok => {
                                if (!ok) {
                                    typ_phl_old = typ_phl_new;
                                    def.reject();
                                }
                                else {
                                    pokracuj();
                                }
                            });
                            return def.promise();
                        }
                        // 0 = nikdy neměnit
                        if (ddp_phl_prepno === 0) {
                            typ_phl_old = typ_phl_new;
                            return def.reject().promise();
                        }
                        // 1 = vždy změnit
                        pokracuj();
                        return def.promise();
                    }
                    Pripady.zmenaTypuPohledavky = zmenaTypuPohledavky;
                    /**
                     * Finální metoda pro změnu typu pohledávky, upravující GPC o nový typ pohledávky a volající changeContext() pro refresh stránky
                     * @param content GContent (this)
                     * @param typ_phl_new nový typ pohledávky
                     * @param zmenaTypPhl zda již proběhla změna
                     * @param ixpDpd identifikát případu k otevření
                     * @returns $.Deferred().resolve().promise();
                     */
                    function changeTypPhl(content, // GContent (this)
                    typ_phl_new, // nový typ pohledávky
                    //cis_spr_new: string, // nové číslo správce
                    zmenaTypPhl, // zda již proběhla změna
                    ixpDdp) {
                        const newGPC = $.extend({}, content.gpc, {
                            typ_phl: typ_phl_new,
                            //priz_spr: priz_spr_new,
                            zmenenTypPhl: true,
                            ixp_pro_otevreni: ixpDdp,
                        });
                        content.changeContext(newGPC, true).done(() => {
                            openPripadDetail(content, ixpDdp, undefined, undefined, undefined, true);
                        });
                        return $.Deferred().resolve().promise();
                    }
                    Pripady.changeTypPhl = changeTypPhl;
                    /**
                     * Metoda pro založení nového případu
                     * @param that Content
                     * @param l_ixpden Kniha do které se případ zakládá (při výběru "bez šablony" se volá klasické podání které podá případ do této knihy nebo vyvolá seznam obsahující knihy k výběru)
                     * @param ginGenIxp Parametr určující generování PIDu (při výběru "bez šablony" se volá klasické podání kde je potřeba dle parametru určite typ generování PIDu)
                     * @param typPhl Typ pohledávky, který se má nastavit u nově založeného případu (není povinný, pokud není zadán, nastaví se defaultní typ pohledávky)
                     * @param zobrazPripad Určuje, zda se má po založení případ zobrazit (otevřít detail) - defaultně true, pokud je false, vrátí se pouze DTO nově založeného případu bez otevření detailu
                     * @returns
                     */
                    function createPripad(that, l_ixpden, ginGenIxp, typPhl, zobrazPripad = true) {
                        var def = $.Deferred();
                        Gordic.Ddp.WebClient.Common.Pripady.sejmutiStitkem(that, ginGenIxp //that.GinGenIxp
                        ).then(function (ixpe) {
                            that.beginOperation("Probíhá zakládání nového případu...");
                            Common.Base.ProcessResponse(that.isl.Pripad.create((rq) => {
                                return {
                                    rq: {
                                        Data: {
                                            ixp_den: l_ixpden,
                                            ixp: ixpe,
                                            typ_phl: typPhl,
                                            gin_gen_mode: ginGenIxp, //that.GinGenIxp,
                                            zp: that.globalSettings?.get(`Global.Ddp.ObecneSettings.PredplneniZpUhr`) ?? 0
                                        },
                                    },
                                };
                            }).get(), that, false, false)
                                .done((data) => {
                                that.endOperation();
                                if (zobrazPripad) {
                                    openPripadDetail(that, data.Dto.ixp, data.Dto.ixp_den, data.Dto.typ_phl);
                                    def.resolve(data.Dto);
                                }
                                else {
                                    def.resolve(data.Dto);
                                }
                            })
                                .fail(function (jqXHR, typ, obj) {
                                that.endOperation();
                                if (typ === "exception") {
                                    obj.handled = true;
                                    that.dialogs.error("Chyba", obj.baseMessage);
                                }
                                def.reject();
                            });
                        });
                        return def.promise();
                    }
                    Pripady.createPripad = createPripad;
                    /** Metoda pro zavolání založení nového případu */
                    function podaniPripadu(that, ginGenIxp, IxpDen, vyberTypPhl = false) {
                        let l_ixpden = IxpDen;
                        let l_typhhl = "";
                        if (!l_ixpden) {
                            that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GVyberKnihy", { ID: "DDPGVyberKnihy#", VyberTypuPhl: vyberTypPhl /* další vstupní data zde nejsou potřeba (?) */ }, "Výběr knihy pro založení případu", 450, 250)
                                .on("close", (obj, retVal) => {
                                if (retVal) {
                                    l_ixpden = retVal._ixpDen.ixp_den;
                                    l_typhhl = vyberTypPhl ? retVal._typPhl?.typ_phl : undefined;
                                    createPripad(that, l_ixpden, ginGenIxp, l_typhhl);
                                }
                            });
                        }
                        else {
                            createPripad(that, l_ixpden, ginGenIxp);
                        }
                        //this.setPending(Gordic.Ddp.WebClient.Common.Pripady.sejmutiStitkem(that, that.GinGenIxp).then(function (ixpe) {
                        //     that.beginOperation("Probíhá zakládání nového případu...");
                        //     that.ddpMethod.ProcessResponse(that.isl.Pripad.create(rq => { return { rq: { Data: { ixp: ixpe, gin_gen_mode: that.GinGenIxp } } }; }).get(), that, false, false)
                        //         .done((data) => {
                        //             that.navigate("Gordic.Ddp.WebClient.GPripadDetail", { ID: 'DDPGPripadDetail#', Ixp: data.Dto!.ixp!, TypPhl: data.Dto!.typ_phl! });
                        //         })
                        //         //.fail(() => {
                        //         //    //todo:
                        //         //    that.endOperation();
                        //         //})
                        //         .fail(function (jqXHR, typ, obj) {
                        //             //něco se pokazilo
                        //             //vrátim hlášku o důvodu neúspěchu
                        //             //TEST:
                        //             if (typ === "exception") {
                        //                 obj.handled = true;
                        //                 that.dialogs.error("Chyba", obj.baseMessage);
                        //             }
                        //         }).always(function () {
                        //             that.endOperation();
                        //         });
                        // }))
                        //var data: Gordic.Ddp.Interface.LK.Isl.GPripadDto;
                        //that.beginOperation("Probíhá zakládání nového případu...");
                        //Gordic.Ddp.WebClient.Common.Pripady.promisePodaniDokladu(that, true, that.GinGenIxp)
                        //    .done(function () { //data: Gordic.Ddp.Interface.LK.Isl.GPripadDto
                        //        that.navigate("Gordic.Ddp.WebClient.Controls.Pripady.GPripadDetail", { ID: 'DDPGPripadDetail#', Ixp: data.ixp!, TypPhl: data.typ_phl! });
                        //        that.endOperation();
                        //        //that.openDetail(ixp, true);
                        //    })
                        //    .fail(function (zprava: string) {
                        //        that.endOperation();
                        //        //Gordic.Pok.WebClient.GPokFlash.showFlashError(that, zprava); //MSGBOX S ERRORREM
                        //    });
                    }
                    Pripady.podaniPripadu = podaniPripadu;
                    /**
                     * Funkce pro výběr způsobu získání PIDu
                     * * * * * *
                     * https://phabricator.gordic.cz/T20821
                     * https://xwiki.gordic.cz/NET/guides/Eko%20komponenty/Režim%20zadávání%20identifikátoru/
                     *
                     * @param that this
                     * @param gingenixp
                     */
                    function sejmutiStitkem(content, gingenixp) {
                        var def = $.Deferred();
                        var that = content;
                        if (Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(that, gingenixp) === "1") { //generování
                            Gordic.Wfl.Dialogs.GenerovaniIxpDlg(that, {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                                DotazPriExistenciVJineAgende: false,
                                HlaseniPriExistenciVAgende: false,
                                ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.Stitkem
                            }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .on("close", function (ev, retVal) {
                                if (retVal == "undefined" || retVal == null || retVal.values == "undefined") {
                                    def.reject();
                                }
                                else {
                                    def.resolve(retVal?.Ixp);
                                }
                            });
                        }
                        else {
                            def.resolve(undefined);
                        }
                        return def.promise();
                    }
                    Pripady.sejmutiStitkem = sejmutiStitkem;
                    /**
                     * Metoda pro podání případu ze šablony
                     * @param that GContent
                     * @param ginGenIxp Parametr učující generování PIDu (při výběru "bez šablony" se volá klasické podání kde je potřeba dle parametru určite typ generování PIDu)
                     * @param IxpDen Kniha do které se případ zakládá (při výběru "bez šablony" se volá klasické podání které podá případ do této knihy nebo vyvolá seznam obsahující knihy k výběru)
                     * @param ixp obsahuje NullIxp (0000P000000N)
                     */
                    function podaniPripaduZeSablony(that, ginGenIxp, IxpDen, ixp, vyberTypPhl = false) {
                        if (!ixp) {
                            ixp = Common.Globals.sgNull.NullIxp;
                        }
                        var windowOption = { title: `Variabilní symboly případu`, width: 490, height: 350 }; //nastavení okna - titulek se následně změní dle nastavení v okně
                        var ParamJSON = { ID: "DDPGPripadPodaniZeSablony#", zobraz_vyber_esu: true }; //přenášené parametry
                        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPripadPodaniZeSablony", ParamJSON, windowOption)
                            .on("close", (ev, retVal) => {
                            if (retVal) {
                                if (retVal.ixs_dsa == Common.Globals.sgNull.nullSablony) {
                                    podaniPripadu(that, ginGenIxp, IxpDen, vyberTypPhl);
                                }
                                else {
                                    that.beginOperation("Probíhá zakládání nového případu ze šablony...");
                                    if (retVal.ixs_esu == null || retVal.ixs_esu == undefined || retVal.ixs_esu.length != 12)
                                        return that.dialogs.error("Chyba při podání případu");
                                    //else 
                                    that.isl.Pripad.zalozPripadZeSablony({ data: retVal })
                                        .get()
                                        .done((retDto) => {
                                        that.endOperation();
                                        return that.dialogs.confirm("Případ byl úspěšně podán", `Identifikátor nového případu: <br/><b>${retDto.ixp}</b> <br/>Chcete jej otevřít?`)
                                            .on("close", (ev, ret) => {
                                            if (ret === "yes") {
                                                Common.Pripady.openPripadDetail(that, retDto.ixp, retDto.ixp_den);
                                            }
                                        });
                                    })
                                        .fail(function (jqXHR, typ, obj) {
                                        that.endOperation();
                                        Common.Base.getFailFromIsl(that, jqXHR, typ, obj);
                                    });
                                }
                            }
                            else
                                return that.dialogs.error("Chyba při podání případu");
                        });
                    }
                    Pripady.podaniPripaduZeSablony = podaniPripaduZeSablony;
                    //#endregion ZALOŽENÍ A OTEVŘENÍ PŘÍPADU
                    //########################################################################################
                    /**
                     * Vrácí definici badge pro počty
                     * @param {string} id id
                     * @returns {GBadgeOptions} badge
                     */
                    function createBadge(id) {
                        return new GObservableObject({
                            id: id,
                            value: "",
                            customClass: "g-state-info"
                        });
                    }
                    Pripady.createBadge = createBadge;
                    //########################################################################################
                    /**
                     * Aktualizuje počet v badge pro počty
                     * @param {GObservableObject<GBadgeOptions>} badge badge, který bude aktualizován
                     * @param {number | null | undefined} [count] počet (nebo null) - zobrazuje se jen nenulový
                     */
                    function updateBadge(badge, count) {
                        badge.update({
                            value: count != null && count > 0 ? count.toString() : "",
                        });
                    }
                    Pripady.updateBadge = updateBadge;
                    //########################################################################################
                    //TODO: předělat na JQUERY část =)
                    function napojPripad(content, ip_typ, phlPlatce, pidPripadu, typPohledavky) {
                        const that = content;
                        that.beginOperation();
                        //if (that.model.ixs_fun_akt != that.IxsFun) {
                        //    that.endOperation();
                        //    return that.dialogs.error("Chyba", "Nejste zpracovatelem dokumentu");
                        //}
                        that.isl.PripadPoplatnici.kontrolaPredNapojenim(rq => { return { ixp: pidPripadu, ip_typ: ip_typ }; })
                            .get()
                            .done(function (data) {
                            that.endOperation();
                            var windowOption = { title: "Výběr poplatníků pro napojení", width: 1250, height: 700 };
                            var ParamJSON = {
                                ID: "DDPGNovyNapPopl#",
                                Ixp: pidPripadu,
                                Typ_phl: typPohledavky,
                                StejnyTypPhl: phlPlatce,
                                Napojit: ip_typ,
                                //VyberPoplatnika: true,
                            };
                            that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GNovyNapPopl", ParamJSON, windowOption)
                                .on("close", (ev, retVal) => {
                                //TODO: Dodělat tady tu CLOSE část
                                //If ip_typ = 1
                                //	Set nPom1 = gf_VratCisloZDB('SELECT c_mena FROM vas.ddpspid A WHERE ixp=\'' || ddppid.ixp || '\'')
                                //	Call df_c_mena.NastavCislo(nPom1)
                                //	Call VypoctiCastkuKc()
                                //	Call tbl_poplatnici.Refresh()
                                //If ip_typ = 2
                                //	Call ZobrazPripad(ddppid.ixp, 1)
                                //TODO: vyřešit načtení dat v gridu ...
                                //if (that.viewPoplNapojeni) that.viewPoplNapojeni.requestData();
                            });
                        })
                            .fail(function (jqXHR, typ, obj) {
                            that.endOperation();
                            Common.Base.getFailFromIsl(that, jqXHR, typ, obj);
                        });
                    }
                    Pripady.napojPripad = napojPripad;
                    /**
                     * Metoda pro otevření Okna pro převod případu do jinhého typu pohledávky | nebo otevření okna pro zobrazení Vymáhacího Salda dle dańového řádu
                     * @param {GContent} that Content (this/that/...)
                     * @param {string} Ixp PID případu pro načtení dat předpisů a uhrád | PID původního případu ze kterého se má převádět
                     * @param {string} NovyIxp PID nového případu na který se bude převádět
                     * @param {Ddp.Interface.GDdpGlobalsBase.TypPrevoduPohledavky | number} TypPrevodu Typ převodu, když není zadán nebo je zadána 0 - okno se otevře v režimu zobrazení Salda, opačném případě MUSÍ BÝT ZADÁNO VALIDNÍ NOVÉ IXP
                     * 1-převod k exekuci, 2-převod k insolvenci, 3-převod na podrozvahu, 4-přesun, (Default - 0 - zobrazení Vymáhacího salda dle DŘ)
                     */
                    function prevodPripadu(that, Ixp, NovyIxp, TypPrevodu) {
                        let now = new Date(Date.now()); //!"dd.MM.yyyy"
                        let datumOd = new Date(now.getFullYear(), 0, 1);
                        let datumDo = new Date(now.getFullYear(), 11, 31);
                        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDatum", { ID: "DDPGDatum#", SaveName: "Ok", DateBoxMode: 2, DatumOd: datumOd, DatumDo: datumDo }, "Definice období", 400, 310)
                            .on("close", (obj, retVal) => {
                            if (retVal) {
                                var windowOption = (!TypPrevodu || TypPrevodu == 0) ? { width: 1000, height: 600 } : { width: 1200, height: 850 };
                                var ParamJSON = { ID: "DDPGSaldaVymDr#", Ixp: Ixp, DatOd: retVal.datum_od, DatDo: retVal.datum_do, NewIxp: NovyIxp ?? null, ZpusobPrevodu: TypPrevodu ?? 0 };
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GSaldaVymDr", ParamJSON, windowOption);
                            }
                            else {
                                return; // that.dialogs.error("Chyba", "Nepovedlo se zpracovat data");
                            }
                        });
                    }
                    Pripady.prevodPripadu = prevodPripadu;
                    //souvisejiciUkol
                    function souvisejiciUkol(content, ixp1, ixp2, ixp3) {
                        var that = content;
                        var isUko = false;
                        for (var i = 0; i < Gordic.Consts.Apps.length; i++) {
                            if (Gordic.Consts.Apps[i].faze === "GWAUKO05") {
                                isUko = true;
                            }
                        }
                        if (isUko) {
                            Gordic.WebApp.Utility.openApp("GWAUKO05", 'VytvorUkolZDokumentu', {
                                ixx1: ixp1,
                                ixx2: ixp2,
                                ixx3: ixp3
                            }
                            /*
                               ,
                               {
                                   ticketType: Gordic.Enums.TicketType.WithLoginAndContext
                               }
                               */
                            );
                        }
                        else {
                            that.dialogs.warning("Modul UKO nenalezen", // Modul UKO nenalezen
                            "Modul UKO nelze otevřít, kontaktujte prosím správce."); // Modul UKO nelze otevřít, kontaktujte prosím správce.
                        }
                    }
                    Pripady.souvisejiciUkol = souvisejiciUkol;
                    function ZmenaOdpovedneOsoby(content, ixp, ixs_ref_odp) {
                        const that = content;
                        const def = $.Deferred();
                        //var windowOption = { title: "", width: 1300, height: 670 };
                        var ParamJSON = { ID: "DDPGVyberOdpOsoby#", IxsRefOdp: ixs_ref_odp };
                        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GVyberOdpOsoby", ParamJSON) // , windowOption)// 
                            .on("close", (ev, retVal) => {
                            if (!retVal)
                                return def.reject();
                            //
                            that.beginOperation("Probíhá změna odpovědné osoby...");
                            that.isl.Pripad.zmenaOdpovedneOsoby({ Ixp: ixp, ixs_ref_odp: retVal.ixs_ref_odp }).get()
                                .always(() => {
                                that.endOperation();
                            })
                                .fail(function (jqXHR, typ, obj) {
                                Common.Base.getFailFromIslPromise(that, jqXHR, typ, obj)
                                    .fail(() => {
                                    return def.reject();
                                });
                            })
                                .done(function (ret) {
                                return def.resolve(retVal.ixs_ref_odp);
                            });
                        });
                        return def.promise();
                    }
                    Pripady.ZmenaOdpovedneOsoby = ZmenaOdpovedneOsoby;
                    //zmenaBankovnihoUctu(content: GContent, ixp: string, buVl: string, skVl: string): JQueryPromise<any> {
                    //    const that = GContent;
                    //    var def = $.Deferred();
                    //    var windowOption = { width: 460, height: 250 };
                    //    var ParamJSON = { ID: "DDPGPripadZmenaBuVl#", bu_vl_old: buVl, sk_vl_old: skVl };
                    //    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPripadZmenaBuVl", ParamJSON, windowOption)
                    //        .on("close", (ev, retVal) => {
                    //            if (retVal && retVal.bu_vl && retVal.sk_vl) {
                    //                that.beginOperation("Probíhá změna bankovního účtu...");
                    //                that.isl.PripadPrevody.zmenaBankovnihoUctu({ ixp: ixp, bu_vl: retVal.bu_vl, sk_vl: retVal.sk_vl }).get()
                    //                    .always(() => { that.endOperation(); })
                    //                    .done(function (ret) {
                    //                        that.model.bu_vl = retVal.bu_vl;
                    //                        that.model.sk_vl = retVal.sk_vl;
                    //                        //! 
                    //                        that.findForms("formZakladniInfo").findFields("bu_vl").gfield("setValue", { bu_vl: retVal.bu_vl, sk_vl: retVal.sk_vl });
                    //                        def.resolve(ret);
                    //                    })
                    //                    .fail(function (jqXHR, typ, obj) {
                    //                        Common.Base.getFailFromIslPromise(that, jqXHR, typ, obj)
                    //                            .always(() => {
                    //                                def.reject();
                    //                            })
                    //                    });       
                    //            } else {
                    //                console.log("Změna bankovního účtu přerušena uživatelem");
                    //                def.reject(); // "Zrušeno uživatelem - žádné data z okna"
                    //            }
                    //        });
                    //    return def.promise();
                    //}
                    ///**
                    // * Vraci objekt gridu
                    // * @param content
                    // * @returns
                    //*/
                    //export function GetGrid(content: GPripadKontace): JQuery<HTMLElement> | null {
                    //    if (content.ContentImport)
                    //        return content.ContentImport.GetGrid();
                    //    let data = content.element.find(".ggrid.js-UctPorizovaciGrid");
                    //    return (data.length == 0 ? null : data);
                    //}
                })(Pripady = Common.Pripady || (Common.Pripady = {}));
            })(Common = WebClient.Common || (WebClient.Common = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpcGFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByaXBhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSxzRkFBc0Y7QUFDdEYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUVqQixJQUFVLE1BQU0sQ0FZZjtBQVpELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQVluQjtJQVpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FZN0I7UUFab0IsV0FBQSxTQUFTO1lBQzFCOztlQUVHO1lBQ0gsSUFBaUIsU0FBUyxDQU96QjtZQVBELFdBQWlCLFNBQVM7Z0JBRXRCOzttQkFFRztnQkFDVSx1QkFBYSxHQUFHLFlBQVksQ0FBQztZQUU5QyxDQUFDLEVBUGdCLFNBQVMsR0FBVCxtQkFBUyxLQUFULG1CQUFTLFFBT3pCO1FBQ0wsQ0FBQyxFQVpvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFZN0I7SUFBRCxDQUFDLEVBWmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQVluQjtBQUFELENBQUMsRUFaUyxNQUFNLEtBQU4sTUFBTSxRQVlmO0FBRUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBK21CbkI7SUEvbUJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0ErbUI3QjtRQS9tQm9CLFdBQUEsU0FBUztZQUFDLElBQUEsTUFBTSxDQSttQnBDO1lBL21COEIsV0FBQSxNQUFNO2dCQUFDLElBQUEsT0FBTyxDQSttQjVDO2dCQS9tQnFDLFdBQUEsT0FBTztvQkFFekMsd0dBQXdHO29CQUN4Ryx3QkFBd0I7b0JBQ3hCLGVBQWU7b0JBQ2Ysa0NBQWtDO29CQUNsQyw0Q0FBNEM7b0JBQzVDLHVEQUF1RDtvQkFDdkQsMERBQTBEO29CQUMxRCx1S0FBdUs7b0JBQ3ZLLDBCQUEwQjtvQkFDMUIsbUNBQW1DO29CQUNuQyxlQUFlO29C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RUFBNEU7b0JBQzVFLDJFQUEyRTtvQkFDM0UsZUFBZTtvQkFDZixhQUFhO29CQUNiLDJCQUEyQjtvQkFDM0IsR0FBRztvQkFHSCxLQUFLO29CQUNMLHVCQUF1QjtvQkFDdkIsbUJBQW1CO29CQUNuQixhQUFhO29CQUNiLElBQUk7b0JBQ0osZ0ZBQWdGO29CQUNoRixnQ0FBZ0M7b0JBQ2hDLGlEQUFpRDtvQkFDakQscUVBQXFFO29CQUNyRSw4Q0FBOEM7b0JBQzlDLEdBQUc7Z0JBRVAsQ0FBQyxFQS9tQnFDLE9BQU8sR0FBUCxjQUFPLEtBQVAsY0FBTyxRQSttQjVDO1lBQUQsQ0FBQyxFQS9tQjhCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBK21CcEM7UUFBRCxDQUFDLEVBL21Cb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBK21CN0I7SUFBRCxDQUFDLEVBL21CZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBK21CbkI7QUFBRCxDQUFDLEVBL21CUyxNQUFNLEtBQU4sTUFBTSxRQSttQmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuUHJpcGFkeS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gU2TDrWxlbsOpIG1ldG9keSBhIGZ1bmtjZUREUCBwcm8gcHLDoWNpIHMgZGV0YWlsZW0gKHDFmcOtcGFkZW0pICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA0LTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZMOtbGVuw6kgbWV0b2R5IEREUCBwcm8gcHLDoWNpIHMgZGV0YWlsZW0gKHDFmcOtcGFkZW0pXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBuYW1lc3BhY2UgRGRwRGV0YWlsIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJpZ2dlciBwcm8gYWt0aXZuw60gb3BlcmFjaSBuYSBkZXRhaWx1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhwb3J0IGNvbnN0IHRyaWdnZXJDaGFuZ2UgPSBcImRkcF9jaGFuZ2VcIjtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uUHJpcGFkeSB7XHJcblxyXG4gICAgLy9leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uc1ByaXBhZChjb250ZW50OiBHQ29udGVudCk6IE9iamVjdExpdGVyYWw8R0FjdGlvblBhcmFtc0RlZk9iaiB8IEdBY3Rpb24+IHtcclxuICAgIC8vICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgLy8gICAgcmV0dXJuICh7XHJcbiAgICAvLyAgICAgICAgYWN0Vnl0dm9yZW5pU291dlVrb2x1OiB7XHJcbiAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiYWN0Vnl0dm9yZW5pU291dlVrb2x1XCIsXHJcbiAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwiVnl0dm/FmWVuw60gc291dmlzZWrDrWPDrWhvIMO6a29sdVwiLFxyXG4gICAgLy8gICAgICAgICAgICBpY29uOiBDb21tb24uUHJlZmFicy5JY29ucy5WeXR2b3JTb3V2VWtvbCgpLFxyXG4gICAgLy8gICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgLy8gdGhhdC5wZXJtc0R0by5hY3QuYWtjZVZ5dHZvcmVuaVNvdXZVa29sdSEsIC8vVE9ETzogbW9tZW50w6FsbsSbIHYgYWtjaSBOYXN0YXZOZWltcGxlbWVudG92YW5lQWtjZSBhbGUgcG91xb7DrXbDoSB1xb4gbm92w6kgR1Blcm1pc3Npb24geiBJU0x1XHJcbiAgICAvLyAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgc291dmlzZWppY2lVa29sKClcclxuICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgIH0sXHJcbiAgICAvLyAgICB9KTtcclxuICAgIC8vfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmlkU3RhdlVocmFkeVByaXBhZHUoaXhwOiBzdHJpbmcsIGVsZW1lbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNvbnRlbnQ/OiBHQ29udGVudCkge1xyXG4gICAgICAgIGxldCB2aWV3ID0gbmV3IElzbC5WaWV3KElzbC5QcmlwYWRVaHJhZHkubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiBpeHBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkdEZHBhc3RjRHRvPih7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInN0YXYsIGMsIGNfdWhyLCBjX2RsdWgsIGRhdF9zcGwsIGRhdF91aHIsIHBvX3NwbGF0bm9zdGksIGt0Z191cG8sIHByaV91aHJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcImNcIiwgXCJjX3VoclwiLCBcImNfZGx1aFwiLCBcImRhdF9zcGxcIiwgXCJkYXRfdWhyXCIsIFwicG9fc3BsYXRub3N0aVwiLCBcImt0Z191cG9cIiwgXCJwcmlfdWhyXCJdLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuVWhyYWR5UHJpcGFkdSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5yZXNpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuXHJcbiAgICAvLyNyZWdpb24gWkFMT8W9RU7DjSBBIE9URVbFmEVOw40gUMWYw41QQURVXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWc3R1cG7DrSBob2Rub3R5IHBybyBvdGV2xZllbsOtIGRldGFpbHUgcMWZw61wYWR1IEREUFxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IElEIElkZW50aWZpa8OhdG9yIG9rbmFcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBJeHAgSWRlbnRpZmlrw6F0b3IgcMWZw61wYWR1IEREUCAoUElEKVxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IFtUeXBQaGxdIFR5cCBwb2hsZWTDoXZreVxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IFtJeHBEZW5dIElkZW50aWZpa8OhdG9yIGtuaWh5IChJWFBfREVOKVxyXG4gICAgICovXHJcbiAgICB0eXBlIElucHV0VmFsdWUgPSB7XHJcbiAgICAgICAgSUQ6IHN0cmluZztcclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICBUeXBQaGw/OiBzdHJpbmc7XHJcbiAgICAgICAgSXhwRGVuPzogc3RyaW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmtjZSBwcm8gb3RldsWZZW7DrSBkZXRhaWx1IHDFmcOtcGFkdSBERFBcclxuICAgICAqIE9ic2FodWplIGtvbnRyb2x1IHpkYSBqZSBtb8W+bsOpIGRldGFpbCBvdGV2xZnDrXQvem9icmF6aXRcclxuICAgICAqIE5vdsSbIHRha8OpIG9ic2FodWplIGtvbnRyb2x1IG5hIHR5cCBwb2hsZWTDoXZreSBhIGplaG8gbW/Fvm5vdSB6bcSbbnVcclxuICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnQgQ29udGVudCAodGhpcylcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwaWRQcmlwYWR1IFBJRC9JWFAgLSBpZGVudGlmaWvDoXRvciBwxZnDrXBhZHUgRERQXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga25paGEgSVhQX0RFTiAtIG5lbsOtLWxpIGtuaWhhIHV2ZWRlbmEsIGRvdGFodWplIHNlIG5hIGRldGFpbHUgcMWZw61wYWR1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBUeXBQaGxQcmlwYWR1IElEIFR5cHUgcG9obGVkw6F2a3kgKCBuZW7DrSBwb3TFmWViYSAtIGRvdGFodWplIHNlIHplIHNlcnZlcnUgLT4gZGF0YS4gKVxyXG4gICAgICogQHBhcmFtIHthbnl9IGdyaWQgRGF0YSB6IGdyaWR1IC0gc2xvdcW+w60gcHJvIHBvc291dsOhbsOtIHDFmcOtcGFkdSBwbyBuxJttIC0gcMWZw61wYWRuw6kgZGFsxaHDrSB6bcSbbnkgcG96YXbFmWVuw61cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gem1lbmVuVHlwUGhsIFByb23Em25uw6EgXHJcbiAgICAgKiBLb250cm9sdWplIHR5cCBwb2hsZWRhdmt5IG5hIHDFmcOtcGFkdSBhIHYgZWtvaW5pdHVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9wZW5QcmlwYWREZXRhaWwoXHJcbiAgICAgICAgY29udGVudDogR0NvbnRlbnQsXHJcbiAgICAgICAgcGlkUHJpcGFkdTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICAgICAgICBrbmloYT86IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgVHlwUGhsUHJpcGFkdT86IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgZ3JpZD86IGFueSxcclxuICAgICAgICB6bWVuZW5UeXBQaGw/OiBib29sZWFuLFxyXG4gICAgKXsgICAgICAgXHJcblxyXG4gICAgICAgIGlmIChwaWRQcmlwYWR1ID09IG51bGwgfHwgcGlkUHJpcGFkdSA9PSB1bmRlZmluZWQgfHwgcGlkUHJpcGFkdS5sZW5ndGggIT0gMTIpXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk5lcGxhdG7DvSBQSUQgcMWZw61wYWR1XCIpO1xyXG5cclxuICAgICAgICBjb250ZW50LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwib3BlblByaXBhZERldGFpbE9wXCIsIHRleHQ6IFwiTmHEjcOtdMOhbS4uLlwiIH0pO1xyXG4gICAgICAgIHptZW5lblR5cFBobCA9IHptZW5lblR5cFBobCA/PyBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IHRlc3REZHAgPSBjb250ZW50LmlzbC5QcmlwYWQua29udHJvbGFQcmVkT3RldnJlbmltUHJpcGFkdUV4dChycSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpcF9peHA6IHBpZFByaXBhZHVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmdldCgpO1xyXG5cclxuICAgICAgICB2YXIgb3BlbmluZ0RldGFpbCA9IChpbnB1dFZhbDogSW5wdXRWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZFJlbW90ZUNvbnRyb2w6IGFueTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgIT0gbnVsbCkgZ3JpZFJlbW90ZUNvbnRyb2wgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKGdyaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGtuaWhhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoY29udGVudC5ncGMsIGtuaWhhKTtcclxuICAgICAgICAgICAgICAgIGxldCAkZGV0YWlsV2luZG93MSA9IGNvbnRlbnQubmF2aWdhdGUoW1wiR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZERldGFpbFwiLCB7IGdwYzogbmV3R3BjLCBncmlkUmVtb3RlQ29udHJvbDogZ3JpZFJlbW90ZUNvbnRyb2wgfV0sIGlucHV0VmFsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCAkZGV0YWlsV2luZG93MiA9IGNvbnRlbnQubmF2aWdhdGUoW1wiR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZERldGFpbFwiLCB7IGdyaWRSZW1vdGVDb250cm9sOiBncmlkUmVtb3RlQ29udHJvbCB9XSwgaW5wdXRWYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXN0RGRwXHJcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oeyBpZDogXCJvcGVuUHJpcGFkRGV0YWlsT3BcIiB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5tb3pub3N0X290ZXZyZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gS2R5xb4gbmVqZGUgbyBwxZnDrXBhZCB0YWsgem9icmF6w61tIG9iZWNuw70gZG9rdW1lbnQgXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuR0RkcEdsb2JhbHNCYXNlLk90ZXZyZW5pRGV0YWlsdS5Eb2t1bWVudE5lbmlQcmlwYWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdmbC5EaWFsb2dzLkRldGFpbERva3VtZW50dVNwaXN1KHVuZGVmaW5lZCBhcyB1bmtub3duIGFzIEdDb250ZW50LCB7IFNpbXBsZU1vZGU6IHRydWUsIERldGFpbER0bzogeyBpeHA6IHBpZFByaXBhZHUgfSB9LCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuYXV0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5lbcOhdGUgcG92b2xlbm8gem9icmF6ZW7DrSBwxZnDrXBhZMWvIHogdG9ob3RvIHR5cHUgcG9obGVkw6F2a3kgbmVibyBzcHLDoXZjZSFcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5HRGRwR2xvYmFsc0Jhc2UuT3RldnJlbmlEZXRhaWx1Lk5lbmlQb3ZvbGVub1pvYnJhemVuaVByaXBhZHU6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOZW3DoXRlIHBvdm9sZW5vIHpvYnJhemVuw60gcMWZw61wYWTFryB6IHRvaG90byB0eXB1IHBvaGxlZMOhdmt5IG5lYm8gc3Byw6F2Y2UhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvLyBWIHJlxb5pbXUgcHLDoWNlIHBvdXplIHMgdnltw6Fow6Fuw61tIG5lbHplIHDFmcOtcGFkeSBERFAgem9icmF6aXQhIFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkdEZHBHbG9iYWxzQmFzZS5PdGV2cmVuaURldGFpbHUuUmV6aW1QcmFjZVBvdXplVnltYWhhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIlYgcmXFvmltdSBwcsOhY2UgcG91emUgcyB2eW3DoWjDoW7DrW0gbmVsemUgcMWZw61wYWR5IEREUCB6b2JyYXppdCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERldGFpbCBzZSBvdGV2xZllXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuR0RkcEdsb2JhbHNCYXNlLk90ZXZyZW5pRGV0YWlsdS5PSzogXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlczogSW5wdXRWYWx1ZSA9IHsgSUQ6IFwiRERQR1ByaXBhZERldGFpbCNcIiwgSXhwOiBwaWRQcmlwYWR1LCBUeXBQaGw6IGRhdGEudHlwX3BobCEgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUYWR5IGJ5IHBvdG9tIG3Em2xvIG5lYm8gbW9obG8gYsO9dCBuxJtjbyBqYWtvIGlmICh6bWVuZW5UeXBQaGwpIHJvdm5vdSBvdGV2xZlpIHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6bWVuZW5UeXBQaGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pbmdEZXRhaWwoaW5wdXRWYWx1ZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6bWVuYVR5cHVQb2hsZWRhdmt5KGNvbnRlbnQsIGRhdGEudHlwX3BobCEsIGRhdGEudHlwX3BobF9pbml0ISwgem1lbmVuVHlwUGhsISwgZGF0YS5kZHBfcGhsX3ByZXBubyA/PyAwLCBkYXRhLmRkcF9waGxfcHJlcG5zID8/IDAsIHBpZFByaXBhZHUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7IC8vIGZhaWwgPT4gcHJvdG/FvmUga2R5xb4gc2Ugem3Em25hIG5lcHJvdmVkZSwgem5hbWVuw6EgdG8gxb5lIGsgbsOtIG5lbcOhIGRvasOtdCBhIG3Fr8W+ZSB0ZWR5IGRvasOtdCBrIG90ZXbFmWVuw60gcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pbmdEZXRhaWwoaW5wdXRWYWx1ZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiB6bWVuYVR5cHVQb2hsZWRhdmt5KFxyXG4gICAgICAgIGNvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgIHR5cF9waGxfbmV3OiBzdHJpbmcsXHJcbiAgICAgICAgdHlwX3BobF9vbGQ6IHN0cmluZyxcclxuICAgICAgICB6bWVuZW5UeXBQaGw6IGJvb2xlYW4sXHJcbiAgICAgICAgLy9aZVNlem5hbXVQaGw6IGJvb2xlYW4sXHJcbiAgICAgICAgZGRwX3BobF9wcmVwbm86IG51bWJlcixcclxuICAgICAgICBkZHBfcGhsX3ByZXBuczogbnVtYmVyLFxyXG4gICAgICAgIGl4cDogc3RyaW5nLFxyXG4gICAgKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZiA9ICQuRGVmZXJyZWQ8dm9pZD4oKTtcclxuXHJcbiAgICAgICAgLy9pZiAoem1lbmVuVHlwUGhsKSB7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vaWYgKCF6ZVNlem5hbXVOZWJvUHJpcGFkKSB7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIGlmICh0eXBfcGhsX29sZCA9PT0gdHlwX3BobF9uZXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwb2tyYWN1aiA9ICgpID0+IHtcclxuICAgICAgICAgICAgY2hhbmdlVHlwUGhsKGNvbnRlbnQsIHR5cF9waGxfbmV3LCB6bWVuZW5UeXBQaGwsIGl4cClcclxuICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IGRlZi5yZXNvbHZlKCkpXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiBkZWYucmVqZWN0KCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFRlc3QgcMWZZXBpc3UgZnVua2NlIGRvdm5pdMWZXHJcbiAgICAgICAgLy9jb25zdCBjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgem1lbmVuVHlwUGhsID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICBjb25zdCBuZXdHUEMgPSAkLmV4dGVuZCh7fSwgY29udGVudC5ncGMsIHtcclxuICAgICAgICAvLyAgICAgICAgdHlwX3BobDogdHlwX3BobF9uZXdcclxuICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAvLyAgICBjb250ZW50LmNoYW5nZUNvbnRleHQobmV3R1BDLCB0cnVlKTtcclxuICAgICAgICAvLyAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vIDIgPSB6ZXB0YXQgc2VcclxuICAgICAgICBpZiAoZGRwX3BobF9wcmVwbm8gPT09IDIpIHtcclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UuY29uZmlybUFzeW5jKGNvbnRlbnQsIFwiVXBvem9ybsSbbsOtXCIsIFwiUMWZZWpldGUgc2kgem3Em25pdCB0eXAgcG9obGVkw6F2a3k/XCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihvayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsX29sZCA9IHR5cF9waGxfbmV3O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9rcmFjdWooKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAwID0gbmlrZHkgbmVtxJtuaXRcclxuICAgICAgICBpZiAoZGRwX3BobF9wcmVwbm8gPT09IDApIHtcclxuICAgICAgICAgICAgdHlwX3BobF9vbGQgPSB0eXBfcGhsX25ldztcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAxID0gdsW+ZHkgem3Em25pdFxyXG4gICAgICAgIHBva3JhY3VqKCk7XHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW7DoWxuw60gbWV0b2RhIHBybyB6bcSbbnUgdHlwdSBwb2hsZWTDoXZreSwgdXByYXZ1asOtY8OtIEdQQyBvIG5vdsO9IHR5cCBwb2hsZWTDoXZreSBhIHZvbGFqw61jw60gY2hhbmdlQ29udGV4dCgpIHBybyByZWZyZXNoIHN0csOhbmt5IFxyXG4gICAgICogQHBhcmFtIGNvbnRlbnQgR0NvbnRlbnQgKHRoaXMpXHJcbiAgICAgKiBAcGFyYW0gdHlwX3BobF9uZXcgbm92w70gdHlwIHBvaGxlZMOhdmt5XHJcbiAgICAgKiBAcGFyYW0gem1lbmFUeXBQaGwgemRhIGppxb4gcHJvYsSbaGxhIHptxJtuYVxyXG4gICAgICogQHBhcmFtIGl4cERwZCBpZGVudGlmaWvDoXQgcMWZw61wYWR1IGsgb3RldsWZZW7DrVxyXG4gICAgICogQHJldHVybnMgJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VUeXBQaGwoXHJcbiAgICAgICAgY29udGVudDogR0NvbnRlbnQsIC8vIEdDb250ZW50ICh0aGlzKVxyXG4gICAgICAgIHR5cF9waGxfbmV3OiBzdHJpbmcsIC8vIG5vdsO9IHR5cCBwb2hsZWTDoXZreVxyXG4gICAgICAgIC8vY2lzX3Nwcl9uZXc6IHN0cmluZywgLy8gbm92w6kgxI3DrXNsbyBzcHLDoXZjZVxyXG4gICAgICAgIHptZW5hVHlwUGhsOiBib29sZWFuLCAvLyB6ZGEgamnFviBwcm9ixJtobGEgem3Em25hXHJcbiAgICAgICAgaXhwRGRwOiBzdHJpbmcsXHJcbiAgICApOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0dQQyA9ICQuZXh0ZW5kKHt9LCBjb250ZW50LmdwYywge1xyXG4gICAgICAgICAgICB0eXBfcGhsOiB0eXBfcGhsX25ldyxcclxuICAgICAgICAgICAgLy9wcml6X3NwcjogcHJpel9zcHJfbmV3LFxyXG4gICAgICAgICAgICB6bWVuZW5UeXBQaGw6IHRydWUsXHJcbiAgICAgICAgICAgIGl4cF9wcm9fb3RldnJlbmk6IGl4cERkcCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb250ZW50LmNoYW5nZUNvbnRleHQobmV3R1BDLCB0cnVlKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgb3BlblByaXBhZERldGFpbChjb250ZW50LCBpeHBEZHAsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldG9kYSBwcm8gemFsb8W+ZW7DrSBub3bDqWhvIHDFmcOtcGFkdVxyXG4gICAgICogQHBhcmFtIHRoYXQgQ29udGVudFxyXG4gICAgICogQHBhcmFtIGxfaXhwZGVuIEtuaWhhIGRvIGt0ZXLDqSBzZSBwxZnDrXBhZCB6YWtsw6Fkw6EgKHDFmWkgdsO9YsSbcnUgXCJiZXogxaFhYmxvbnlcIiBzZSB2b2zDoSBrbGFzaWNrw6kgcG9kw6Fuw60ga3RlcsOpIHBvZMOhIHDFmcOtcGFkIGRvIHTDqXRvIGtuaWh5IG5lYm8gdnl2b2zDoSBzZXpuYW0gb2JzYWh1asOtY8OtIGtuaWh5IGsgdsO9YsSbcnUpXHJcbiAgICAgKiBAcGFyYW0gZ2luR2VuSXhwIFBhcmFtZXRyIHVyxI11asOtY8OtIGdlbmVyb3bDoW7DrSBQSUR1IChwxZlpIHbDvWLEm3J1IFwiYmV6IMWhYWJsb255XCIgc2Ugdm9sw6Ega2xhc2lja8OpIHBvZMOhbsOtIGtkZSBqZSBwb3TFmWViYSBkbGUgcGFyYW1ldHJ1IHVyxI1pdGUgdHlwIGdlbmVyb3bDoW7DrSBQSUR1KVxyXG4gICAgICogQHBhcmFtIHR5cFBobCBUeXAgcG9obGVkw6F2a3ksIGt0ZXLDvSBzZSBtw6EgbmFzdGF2aXQgdSBub3bEmyB6YWxvxb5lbsOpaG8gcMWZw61wYWR1IChuZW7DrSBwb3Zpbm7DvSwgcG9rdWQgbmVuw60gemFkw6FuLCBuYXN0YXbDrSBzZSBkZWZhdWx0bsOtIHR5cCBwb2hsZWTDoXZreSlcclxuICAgICAqIEBwYXJhbSB6b2JyYXpQcmlwYWQgVXLEjXVqZSwgemRhIHNlIG3DoSBwbyB6YWxvxb5lbsOtIHDFmcOtcGFkIHpvYnJheml0IChvdGV2xZnDrXQgZGV0YWlsKSAtIGRlZmF1bHRuxJsgdHJ1ZSwgcG9rdWQgamUgZmFsc2UsIHZyw6F0w60gc2UgcG91emUgRFRPIG5vdsSbIHphbG/FvmVuw6lobyBwxZnDrXBhZHUgYmV6IG90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByaXBhZCh0aGF0OiBHQ29udGVudCwgbF9peHBkZW46IHN0cmluZywgZ2luR2VuSXhwOiBzdHJpbmcsIHR5cFBobD86IHN0cmluZywgem9icmF6UHJpcGFkOiBib29sZWFuID0gdHJ1ZSk6IEpRdWVyeVByb21pc2U8RGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0bz4ge1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbW1vbi5QcmlwYWR5LnNlam11dGlTdGl0a2VtKFxyXG4gICAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICBnaW5HZW5JeHAgLy90aGF0Lkdpbkdlbkl4cFxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAoaXhwZSkge1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIHpha2zDoWTDoW7DrSBub3bDqWhvIHDFmcOtcGFkdS4uLlwiKTtcclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkLmNyZWF0ZSgocnEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IGxfaXhwZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogaXhwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0eXBQaGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2luX2dlbl9tb2RlOiBnaW5HZW5JeHAsIC8vdGhhdC5HaW5HZW5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgenA6IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChgR2xvYmFsLkRkcC5PYmVjbmVTZXR0aW5ncy5QcmVkcGxuZW5pWnBVaHJgKSA/PyAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KS5nZXQoKSxcclxuICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoem9icmF6UHJpcGFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblByaXBhZERldGFpbCh0aGF0LCBkYXRhLkR0byEuaXhwISwgZGF0YS5EdG8hLml4cF9kZW4hLCBkYXRhLkR0byEudHlwX3BobCEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEuRHRvISk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEuRHRvISk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDaHliYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouYmFzZU1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIC8qKiBNZXRvZGEgcHJvIHphdm9sw6Fuw60gemFsb8W+ZW7DrSBub3bDqWhvIHDFmcOtcGFkdSAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHBvZGFuaVByaXBhZHUodGhhdDogR0NvbnRlbnQsIGdpbkdlbkl4cDogc3RyaW5nLCBJeHBEZW4/OiBzdHJpbmcsIHZ5YmVyVHlwUGhsOiBib29sZWFuID0gZmFsc2UgKSB7XHJcbiAgICAgICAgbGV0IGxfaXhwZGVuID0gSXhwRGVuO1xyXG4gICAgICAgIGxldCBsX3R5cGhobDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKCFsX2l4cGRlbikge1xyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5YmVyS25paHlcIiwgeyBJRDogXCJERFBHVnliZXJLbmloeSNcIiwgVnliZXJUeXB1UGhsOiB2eWJlclR5cFBobCAvKiBkYWzFocOtIHZzdHVwbsOtIGRhdGEgemRlIG5lanNvdSBwb3TFmWViYSAoPykgKi8gfSwgXCJWw71ixJtyIGtuaWh5IHBybyB6YWxvxb5lbsOtIHDFmcOtcGFkdVwiLCA0NTAsIDI1MClcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChvYmosIHJldFZhbDogeyBfaXhwRGVuLCBfdHlwUGhsIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxfaXhwZGVuID0gcmV0VmFsLl9peHBEZW4uaXhwX2RlbjsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbF90eXBoaGwgPSB2eWJlclR5cFBobCA/IHJldFZhbC5fdHlwUGhsPy50eXBfcGhsIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVQcmlwYWQodGhhdCwgbF9peHBkZW4hLCBnaW5HZW5JeHAsIGxfdHlwaGhsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjcmVhdGVQcmlwYWQodGhhdCwgbF9peHBkZW4sIGdpbkdlbkl4cClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLnNldFBlbmRpbmcoR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLlByaXBhZHkuc2VqbXV0aVN0aXRrZW0odGhhdCwgdGhhdC5HaW5HZW5JeHApLnRoZW4oZnVuY3Rpb24gKGl4cGUpIHtcclxuICAgICAgICAvLyAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSB6YWtsw6Fkw6Fuw60gbm92w6lobyBwxZnDrXBhZHUuLi5cIik7XHJcbiAgICAgICAgLy8gICAgIHRoYXQuZGRwTWV0aG9kLlByb2Nlc3NSZXNwb25zZSh0aGF0LmlzbC5QcmlwYWQuY3JlYXRlKHJxID0+IHsgcmV0dXJuIHsgcnE6IHsgRGF0YTogeyBpeHA6IGl4cGUsIGdpbl9nZW5fbW9kZTogdGhhdC5HaW5HZW5JeHAgfSB9IH07IH0pLmdldCgpLCB0aGF0LCBmYWxzZSwgZmFsc2UpXHJcbiAgICAgICAgLy8gICAgICAgICAuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkRGV0YWlsXCIsIHsgSUQ6ICdERFBHUHJpcGFkRGV0YWlsIycsIEl4cDogZGF0YS5EdG8hLml4cCEsIFR5cFBobDogZGF0YS5EdG8hLnR5cF9waGwhIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgIC8vLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgLy90b2RvOlxyXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vfSlcclxuICAgICAgICAvLyAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvL27Em2NvIHNlIHBva2F6aWxvXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy92csOhdGltIGhsw6HFoWt1IG8gZMWvdm9kdSBuZcO6c3DEm2NodVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vVEVTVDpcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAvLyB9KSlcclxuICAgICAgICAvL3ZhciBkYXRhOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0bztcclxuICAgICAgICAvL3RoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgemFrbMOhZMOhbsOtIG5vdsOpaG8gcMWZw61wYWR1Li4uXCIpO1xyXG4gICAgICAgIC8vR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLlByaXBhZHkucHJvbWlzZVBvZGFuaURva2xhZHUodGhhdCwgdHJ1ZSwgdGhhdC5HaW5HZW5JeHApXHJcbiAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKCkgeyAvL2RhdGE6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvXHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5Db250cm9scy5QcmlwYWR5LkdQcmlwYWREZXRhaWxcIiwgeyBJRDogJ0REUEdQcmlwYWREZXRhaWwjJywgSXhwOiBkYXRhLml4cCEsIFR5cFBobDogZGF0YS50eXBfcGhsISB9KTtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgLy90aGF0Lm9wZW5EZXRhaWwoaXhwLCB0cnVlKTtcclxuICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgIC8vICAgIC5mYWlsKGZ1bmN0aW9uICh6cHJhdmE6IHN0cmluZykge1xyXG4gICAgICAgIC8vICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAvL0dvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hFcnJvcih0aGF0LCB6cHJhdmEpOyAvL01TR0JPWCBTIEVSUk9SUkVNXHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEZ1bmtjZSBwcm8gdsO9YsSbciB6cMWvc29idSB6w61za8OhbsOtIFBJRHVcclxuICAgICAqICogKiAqICogKlxyXG4gICAgICogaHR0cHM6Ly9waGFicmljYXRvci5nb3JkaWMuY3ovVDIwODIxXHJcbiAgICAgKiBodHRwczovL3h3aWtpLmdvcmRpYy5jei9ORVQvZ3VpZGVzL0VrbyUyMGtvbXBvbmVudHkvUmXFvmltJTIwemFkw6F2w6Fuw60lMjBpZGVudGlmaWvDoXRvcnUvXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0aGF0IHRoaXNcclxuICAgICAqIEBwYXJhbSBnaW5nZW5peHBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNlam11dGlTdGl0a2VtKGNvbnRlbnQ6IGFueSwgZ2luZ2VuaXhwOiBzdHJpbmcpOiBKUXVlcnlQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgdmFyIHRoYXQgPSBjb250ZW50O1xyXG5cclxuICAgICAgICBpZiAoR29yZGljLkVrby5VdGlscy5HZXRFa29Vc2VyU2V0dGluZ3NQaWRTZWptdXRpKHRoYXQsIGdpbmdlbml4cCkgPT09IFwiMVwiKSB7IC8vZ2VuZXJvdsOhbsOtXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuRGlhbG9ncy5HZW5lcm92YW5pSXhwRGxnKHRoYXQsIHtcclxuICAgICAgICAgICAgICAgIFR5cERvazogR29yZGljLldmbC5HbG9iYWxzLkVudW1zLlR5cERvay5WbGFzdG5pLFxyXG4gICAgICAgICAgICAgICAgVHlwSWQ6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBJZC5JWFAsXHJcbiAgICAgICAgICAgICAgICBEb3RhelByaUV4aXN0ZW5jaVZKaW5lQWdlbmRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIEhsYXNlbmlQcmlFeGlzdGVuY2lWQWdlbmRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFpwdXNvYkdlbmVyb3Zhbmk6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5acHVzb2JHZW5lcm92YW5pSXhwLlN0aXRrZW1cclxuICAgICAgICAgICAgfSwgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpIVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09IFwidW5kZWZpbmVkXCIgfHwgcmV0VmFsID09IG51bGwgfHwgcmV0VmFsLnZhbHVlcyA9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXRWYWw/Lkl4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZWYucmVzb2x2ZSh1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH0gICBcclxuICAgIC8qKlxyXG4gICAgICogTWV0b2RhIHBybyBwb2TDoW7DrSBwxZnDrXBhZHUgemUgxaFhYmxvbnlcclxuICAgICAqIEBwYXJhbSB0aGF0IEdDb250ZW50XHJcbiAgICAgKiBAcGFyYW0gZ2luR2VuSXhwIFBhcmFtZXRyIHXEjXVqw61jw60gZ2VuZXJvdsOhbsOtIFBJRHUgKHDFmWkgdsO9YsSbcnUgXCJiZXogxaFhYmxvbnlcIiBzZSB2b2zDoSBrbGFzaWNrw6kgcG9kw6Fuw60ga2RlIGplIHBvdMWZZWJhIGRsZSBwYXJhbWV0cnUgdXLEjWl0ZSB0eXAgZ2VuZXJvdsOhbsOtIFBJRHUpXHJcbiAgICAgKiBAcGFyYW0gSXhwRGVuIEtuaWhhIGRvIGt0ZXLDqSBzZSBwxZnDrXBhZCB6YWtsw6Fkw6EgKHDFmWkgdsO9YsSbcnUgXCJiZXogxaFhYmxvbnlcIiBzZSB2b2zDoSBrbGFzaWNrw6kgcG9kw6Fuw60ga3RlcsOpIHBvZMOhIHDFmcOtcGFkIGRvIHTDqXRvIGtuaWh5IG5lYm8gdnl2b2zDoSBzZXpuYW0gb2JzYWh1asOtY8OtIGtuaWh5IGsgdsO9YsSbcnUpXHJcbiAgICAgKiBAcGFyYW0gaXhwIG9ic2FodWplIE51bGxJeHAgKDAwMDBQMDAwMDAwTilcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHBvZGFuaVByaXBhZHVaZVNhYmxvbnkodGhhdDogR0NvbnRlbnQsIGdpbkdlbkl4cDogc3RyaW5nLCBJeHBEZW4/OiBzdHJpbmcsIGl4cD86IHN0cmluZywgdnliZXJUeXBQaGw6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICghaXhwKSB7XHJcbiAgICAgICAgICAgIGl4cCA9IENvbW1vbi5HbG9iYWxzLnNnTnVsbC5OdWxsSXhwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgd2luZG93T3B0aW9uID0geyB0aXRsZTogYFZhcmlhYmlsbsOtIHN5bWJvbHkgcMWZw61wYWR1YCwgd2lkdGg6IDQ5MCwgaGVpZ2h0OiAzNTAgfTsgLy9uYXN0YXZlbsOtIG9rbmEgLSB0aXR1bGVrIHNlIG7DoXNsZWRuxJsgem3Em27DrSBkbGUgbmFzdGF2ZW7DrSB2IG9rbsSbXHJcbiAgICAgICAgdmFyIFBhcmFtSlNPTiA9IHsgSUQ6IFwiRERQR1ByaXBhZFBvZGFuaVplU2FibG9ueSNcIiwgem9icmF6X3Z5YmVyX2VzdTogdHJ1ZSB9OyAvL3DFmWVuw6HFoWVuw6kgcGFyYW1ldHJ5XHJcbiAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWRQb2RhbmlaZVNhYmxvbnlcIiwgUGFyYW1KU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsOiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRGF0YVByb1NhYmxvbnVEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsLml4c19kc2EgPT0gQ29tbW9uLkdsb2JhbHMuc2dOdWxsLm51bGxTYWJsb255KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvZGFuaVByaXBhZHUodGhhdCwgZ2luR2VuSXhwLCBJeHBEZW4sIHZ5YmVyVHlwUGhsKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIHpha2zDoWTDoW7DrSBub3bDqWhvIHDFmcOtcGFkdSB6ZSDFoWFibG9ueS4uLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsLml4c19lc3UgPT0gbnVsbCB8fCByZXRWYWwuaXhzX2VzdSA9PSB1bmRlZmluZWQgfHwgcmV0VmFsLml4c19lc3UubGVuZ3RoICE9IDEyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhIHDFmWkgcG9kw6Fuw60gcMWZw61wYWR1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2UgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZC56YWxvelByaXBhZFplU2FibG9ueSh7IGRhdGE6IHJldFZhbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmV0RHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJQxZnDrXBhZCBieWwgw7pzcMSbxaFuxJsgcG9kw6FuXCIsIGBJZGVudGlmaWvDoXRvciBub3bDqWhvIHDFmcOtcGFkdTogPGJyLz48Yj4ke3JldER0by5peHAhfTwvYj4gPGJyLz5DaGNldGUgamVqIG90ZXbFmcOtdD9gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5QcmlwYWR5Lm9wZW5QcmlwYWREZXRhaWwodGhhdCwgcmV0RHRvLml4cCEsIHJldER0by5peHBfZGVuISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuZ2V0RmFpbEZyb21Jc2wodGhhdCwganFYSFIsIHR5cCwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhIHDFmWkgcG9kw6Fuw60gcMWZw61wYWR1XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvbiBaQUxPxb1FTsONIEEgT1RFVsWYRU7DjSBQxZjDjVBBRFVcclxuXHJcbiAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZyw6Fjw60gZGVmaW5pY2kgYmFkZ2UgcHJvIHBvxI10eVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIGlkXHJcbiAgICAgKiBAcmV0dXJucyB7R0JhZGdlT3B0aW9uc30gYmFkZ2VcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhZGdlKGlkOiBzdHJpbmcpOiBHT2JzZXJ2YWJsZU9iamVjdCA8IEdCYWRnZU9wdGlvbnMgPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtaW5mb1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgIC8qKlxyXG4gICAgICogQWt0dWFsaXp1amUgcG/EjWV0IHYgYmFkZ2UgcHJvIHBvxI10eSAgICAgICAgICBcclxuICAgICAqIEBwYXJhbSB7R09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz59IGJhZGdlIGJhZGdlLCBrdGVyw70gYnVkZSBha3R1YWxpem92w6FuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9IFtjb3VudF0gcG/EjWV0IChuZWJvIG51bGwpIC0gem9icmF6dWplIHNlIGplbiBuZW51bG92w71cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUJhZGdlKGJhZGdlOiBHT2JzZXJ2YWJsZU9iamVjdDxHQmFkZ2VPcHRpb25zPiwgY291bnQgPzogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIGJhZGdlLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIHZhbHVlOiBjb3VudCAhPSBudWxsICYmIGNvdW50ID4gMCA/IGNvdW50LnRvU3RyaW5nKCkgOiBcIlwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcblxyXG4gICAgLy9UT0RPOiBwxZllZMSbbGF0IG5hIEpRVUVSWSDEjcOhc3QgPSlcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBuYXBvalByaXBhZChjb250ZW50OiBHQ29udGVudCwgaXBfdHlwOiBudW1iZXIsIHBobFBsYXRjZTogbnVtYmVyLCBwaWRQcmlwYWR1OiBzdHJpbmcsIHR5cFBvaGxlZGF2a3k/OiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gY29udGVudDtcclxuICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy9pZiAodGhhdC5tb2RlbC5peHNfZnVuX2FrdCAhPSB0aGF0Lkl4c0Z1bikge1xyXG4gICAgICAgIC8vICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmVqc3RlIHpwcmFjb3ZhdGVsZW0gZG9rdW1lbnR1XCIpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIHRoYXQuaXNsLlByaXBhZFBvcGxhdG5pY2kua29udHJvbGFQcmVkTmFwb2plbmltKHJxID0+IHsgcmV0dXJuIHsgaXhwOiBwaWRQcmlwYWR1LCBpcF90eXA6IGlwX3R5cCB9IH0pXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dPcHRpb24gPSB7IHRpdGxlOiBcIlbDvWLEm3IgcG9wbGF0bsOta8WvIHBybyBuYXBvamVuw61cIiwgd2lkdGg6IDEyNTAsIGhlaWdodDogNzAwIH07XHJcbiAgICAgICAgICAgICAgICB2YXIgUGFyYW1KU09OID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdOb3Z5TmFwUG9wbCNcIixcclxuICAgICAgICAgICAgICAgICAgICBJeHA6IHBpZFByaXBhZHUsXHJcbiAgICAgICAgICAgICAgICAgICAgVHlwX3BobDogdHlwUG9obGVkYXZreSxcclxuICAgICAgICAgICAgICAgICAgICBTdGVqbnlUeXBQaGw6IHBobFBsYXRjZSxcclxuICAgICAgICAgICAgICAgICAgICBOYXBvaml0OiBpcF90eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9WeWJlclBvcGxhdG5pa2E6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdOb3Z5TmFwUG9wbFwiLCBQYXJhbUpTT04sIHdpbmRvd09wdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IERvZMSbbGF0IHRhZHkgdHUgQ0xPU0UgxI3DoXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgaXBfdHlwID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1x0U2V0IG5Qb20xID0gZ2ZfVnJhdENpc2xvWkRCKCdTRUxFQ1QgY19tZW5hIEZST00gdmFzLmRkcHNwaWQgQSBXSEVSRSBpeHA9XFwnJyB8fCBkZHBwaWQuaXhwIHx8ICdcXCcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1x0Q2FsbCBkZl9jX21lbmEuTmFzdGF2Q2lzbG8oblBvbTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXHRDYWxsIFZ5cG9jdGlDYXN0a3VLYygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXHRDYWxsIHRibF9wb3BsYXRuaWNpLlJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0lmIGlwX3R5cCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cdENhbGwgWm9icmF6UHJpcGFkKGRkcHBpZC5peHAsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogdnnFmWXFoWl0IG5hxI10ZW7DrSBkYXQgdiBncmlkdSAuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC52aWV3UG9wbE5hcG9qZW5pKSB0aGF0LnZpZXdQb3BsTmFwb2plbmkucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLmdldEZhaWxGcm9tSXNsKHRoYXQsIGpxWEhSLCB0eXAsIG9iaik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0b2RhIHBybyBvdGV2xZllbsOtIE9rbmEgcHJvIHDFmWV2b2QgcMWZw61wYWR1IGRvIGppbmjDqWhvIHR5cHUgcG9obGVkw6F2a3kgfCBuZWJvIG90ZXbFmWVuw60gb2tuYSBwcm8gem9icmF6ZW7DrSBWeW3DoWhhY8OtaG8gU2FsZGEgZGxlIGRhxYRvdsOpaG8gxZnDoWR1XHJcbiAgICAgKiBAcGFyYW0ge0dDb250ZW50fSB0aGF0IENvbnRlbnQgKHRoaXMvdGhhdC8uLi4pXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gSXhwIFBJRCBwxZnDrXBhZHUgcHJvIG5hxI10ZW7DrSBkYXQgcMWZZWRwaXPFryBhIHVocsOhZCB8IFBJRCBwxa92b2Ruw61obyBwxZnDrXBhZHUgemUga3RlcsOpaG8gc2UgbcOhIHDFmWV2w6FkxJt0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gTm92eUl4cCBQSUQgbm92w6lobyBwxZnDrXBhZHUgbmEga3RlcsO9IHNlIGJ1ZGUgcMWZZXbDoWTEm3RcclxuICAgICAqIEBwYXJhbSB7RGRwLkludGVyZmFjZS5HRGRwR2xvYmFsc0Jhc2UuVHlwUHJldm9kdVBvaGxlZGF2a3kgfCBudW1iZXJ9IFR5cFByZXZvZHUgVHlwIHDFmWV2b2R1LCBrZHnFviBuZW7DrSB6YWTDoW4gbmVibyBqZSB6YWTDoW5hIDAgLSBva25vIHNlIG90ZXbFmWUgdiByZcW+aW11IHpvYnJhemVuw60gU2FsZGEsIG9wYcSNbsOpbSBwxZnDrXBhZMSbIE1VU8ONIELDnVQgWkFEw4FOTyBWQUxJRE7DjSBOT1bDiSBJWFBcclxuICAgICAqIDEtcMWZZXZvZCBrIGV4ZWt1Y2ksIDItcMWZZXZvZCBrIGluc29sdmVuY2ksIDMtcMWZZXZvZCBuYSBwb2Ryb3p2YWh1LCA0LXDFmWVzdW4sIChEZWZhdWx0IC0gMCAtIHpvYnJhemVuw60gVnltw6FoYWPDrWhvIHNhbGRhIGRsZSBExZgpIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcHJldm9kUHJpcGFkdSh0aGF0OiBHQ29udGVudCwgSXhwOiBzdHJpbmcsIE5vdnlJeHA/OiBzdHJpbmcsIFR5cFByZXZvZHU/OiBEZHAuSW50ZXJmYWNlLkdEZHBHbG9iYWxzQmFzZS5UeXBQcmV2b2R1UG9obGVkYXZreSB8IG51bWJlciApIHtcclxuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7Ly8hXCJkZC5NTS55eXl5XCJcclxuICAgICAgICBsZXQgZGF0dW1PZCA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCAwLCAxKTtcclxuICAgICAgICBsZXQgZGF0dW1EbyA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCAxMSwgMzEpO1xyXG4gICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGF0dW1cIiwgeyBJRDogXCJERFBHRGF0dW0jXCIsIFNhdmVOYW1lOiBcIk9rXCIsIERhdGVCb3hNb2RlOiAyLCBEYXR1bU9kOiBkYXR1bU9kLCBEYXR1bURvOiBkYXR1bURvIH0sIFwiRGVmaW5pY2Ugb2Jkb2LDrVwiLCA0MDAsIDMxMClcclxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKG9iaiwgcmV0VmFsOiB7IGRhdHVtX29kOiBEYXRlLCBkYXR1bV9kbzogRGF0ZSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9ICghVHlwUHJldm9kdSB8fCBUeXBQcmV2b2R1ID09IDApID8geyB3aWR0aDogMTAwMCwgaGVpZ2h0OiA2MDAgfSA6IHsgd2lkdGg6IDEyMDAsIGhlaWdodDogODUwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFBhcmFtSlNPTiA9IHsgSUQ6IFwiRERQR1NhbGRhVnltRHIjXCIsIEl4cDogSXhwLCBEYXRPZDogcmV0VmFsLmRhdHVtX29kLCBEYXREbzogcmV0VmFsLmRhdHVtX2RvLCBOZXdJeHA6IE5vdnlJeHAgPz8gbnVsbCwgWnB1c29iUHJldm9kdTogVHlwUHJldm9kdSA/PyAwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTYWxkYVZ5bURyXCIsIFBhcmFtSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIk5lcG92ZWRsbyBzZSB6cHJhY292YXQgZGF0YVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zb3V2aXNlamljaVVrb2xcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzb3V2aXNlamljaVVrb2woY29udGVudDogR0NvbnRlbnQsIGl4cDE6IHN0cmluZywgaXhwMj86IHN0cmluZywgaXhwMz86IHN0cmluZykgeyBcclxuICAgICAgICB2YXIgdGhhdCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIHZhciBpc1VrbyA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgR29yZGljLkNvbnN0cy5BcHBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChHb3JkaWMuQ29uc3RzLkFwcHNbaV0uZmF6ZSA9PT0gXCJHV0FVS08wNVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpc1VrbyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzVWtvKSB7XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgXCJHV0FVS08wNVwiLFxyXG4gICAgICAgICAgICAgICAgJ1Z5dHZvclVrb2xaRG9rdW1lbnR1JyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHgxOiBpeHAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4eDI6IGl4cDIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXh4MzogaXhwM1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aWNrZXRUeXBlOiBHb3JkaWMuRW51bXMuVGlja2V0VHlwZS5XaXRoTG9naW5BbmRDb250ZXh0XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy53YXJuaW5nKFxyXG4gICAgICAgICAgICAgICAgXCJNb2R1bCBVS08gbmVuYWxlemVuXCIsIC8vIE1vZHVsIFVLTyBuZW5hbGV6ZW5cclxuICAgICAgICAgICAgICAgIFwiTW9kdWwgVUtPIG5lbHplIG90ZXbFmcOtdCwga29udGFrdHVqdGUgcHJvc8OtbSBzcHLDoXZjZS5cIik7IC8vIE1vZHVsIFVLTyBuZWx6ZSBvdGV2xZnDrXQsIGtvbnRha3R1anRlIHByb3PDrW0gc3Byw6F2Y2UuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gWm1lbmFPZHBvdmVkbmVPc29ieShjb250ZW50OiBHQ29udGVudCwgaXhwOiBzdHJpbmcsIGl4c19yZWZfb2RwOiBzdHJpbmcpOiBKUXVlcnlQcm9taXNlPGFueT4geyBcclxuICAgICAgICBjb25zdCB0aGF0ID0gY29udGVudDtcclxuICAgICAgICBjb25zdCBkZWYgPSAkLkRlZmVycmVkPGFueT4oKTtcclxuICAgICAgICAvL3ZhciB3aW5kb3dPcHRpb24gPSB7IHRpdGxlOiBcIlwiLCB3aWR0aDogMTMwMCwgaGVpZ2h0OiA2NzAgfTtcclxuICAgICAgICB2YXIgUGFyYW1KU09OID0geyBJRDogXCJERFBHVnliZXJPZHBPc29ieSNcIiwgSXhzUmVmT2RwOiBpeHNfcmVmX29kcCB9O1xyXG4gICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HVnliZXJPZHBPc29ieVwiLCBQYXJhbUpTT04pIC8vICwgd2luZG93T3B0aW9uKS8vIFxyXG4gICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXRWYWwpIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSB6bcSbbmEgb2Rwb3bEm2Ruw6kgb3NvYnkuLi5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWQuem1lbmFPZHBvdmVkbmVPc29ieSh7IEl4cDogaXhwLCBpeHNfcmVmX29kcDogcmV0VmFsLml4c19yZWZfb2RwIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLmdldEZhaWxGcm9tSXNsUHJvbWlzZSh0aGF0LCBqcVhIUiwgdHlwLCBvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXRWYWwuaXhzX3JlZl9vZHApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3ptZW5hQmFua292bmlob1VjdHUoY29udGVudDogR0NvbnRlbnQsIGl4cDogc3RyaW5nLCBidVZsOiBzdHJpbmcsIHNrVmw6IHN0cmluZyk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAvLyAgICBjb25zdCB0aGF0ID0gR0NvbnRlbnQ7XHJcbiAgICAvLyAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgIC8vICAgIHZhciB3aW5kb3dPcHRpb24gPSB7IHdpZHRoOiA0NjAsIGhlaWdodDogMjUwIH07XHJcbiAgICAvLyAgICB2YXIgUGFyYW1KU09OID0geyBJRDogXCJERFBHUHJpcGFkWm1lbmFCdVZsI1wiLCBidV92bF9vbGQ6IGJ1VmwsIHNrX3ZsX29sZDogc2tWbCB9O1xyXG4gICAgLy8gICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWRabWVuYUJ1VmxcIiwgUGFyYW1KU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAvLyAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuYnVfdmwgJiYgcmV0VmFsLnNrX3ZsKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIHptxJtuYSBiYW5rb3Zuw61obyDDusSNdHUuLi5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRQcmV2b2R5LnptZW5hQmFua292bmlob1VjdHUoeyBpeHA6IGl4cCwgYnVfdmw6IHJldFZhbC5idV92bCwgc2tfdmw6IHJldFZhbC5za192bCB9KS5nZXQoKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5idV92bCA9IHJldFZhbC5idV92bDtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbC5za192bCA9IHJldFZhbC5za192bDtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy8hIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImZvcm1aYWtsYWRuaUluZm9cIikuZmluZEZpZWxkcyhcImJ1X3ZsXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYnVfdmw6IHJldFZhbC5idV92bCwgc2tfdmw6IHJldFZhbC5za192bCB9KTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0KTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuZ2V0RmFpbEZyb21Jc2xQcm9taXNlKHRoYXQsIGpxWEhSLCB0eXAsIG9iailcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJabcSbbmEgYmFua292bsOtaG8gw7rEjXR1IHDFmWVydcWhZW5hIHXFvml2YXRlbGVtXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpOyAvLyBcIlpydcWhZW5vIHXFvml2YXRlbGVtIC0gxb7DoWRuw6kgZGF0YSB6IG9rbmFcIlxyXG4gICAgLy8gICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgfSk7XHJcbiAgICAvLyAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIC8vfVxyXG5cclxuXHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgIC8vICogQHBhcmFtIGNvbnRlbnRcclxuICAgIC8vICogQHJldHVybnNcclxuICAgIC8vKi9cclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIEdldEdyaWQoY29udGVudDogR1ByaXBhZEtvbnRhY2UpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAvLyAgICBpZiAoY29udGVudC5Db250ZW50SW1wb3J0KVxyXG4gICAgLy8gICAgICAgIHJldHVybiBjb250ZW50LkNvbnRlbnRJbXBvcnQuR2V0R3JpZCgpO1xyXG4gICAgLy8gICAgbGV0IGRhdGEgPSBjb250ZW50LmVsZW1lbnQuZmluZChcIi5nZ3JpZC5qcy1VY3RQb3Jpem92YWNpR3JpZFwiKTtcclxuICAgIC8vICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgOiBkYXRhKTtcclxuICAgIC8vfVxyXG5cclxufSJdfQ==