"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.Predpisy.ts                            </Name>
//    <Description> Sdílené metody a funkce pro práci s předpisama              </Description>
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
            var Common;
            (function (Common) {
                var Predpisy;
                (function (Predpisy) {
                    /**
                     * Funkce pro otevření detailu předpisu
                     * @param content GContent (this)
                     * @param Predpis Ddp.Interface.LK.Isl.GPredpisDto - předpis, který se má otevřít
                     * @param PidPripadu string - PID případu, který se má otevřít (pokud není zadaný, vezme se z předpisu)
                     * @param TypPhl string - Typ pohledávky (pokud není zadaný, vezme se z případu v .vs na detailu předpisu)
                     * @returns void - Po zavření okna předpisu se funkce vrátí do místa volání
                     */
                    function openDetailPredpisu(content, Predpis, // var selection = this.gridPredpisy.ggrid<Ddp.Interface.LK.Isl.GPredpisDto>("getSelection")[0];
                    PidPripadu, TypPhl) {
                        const that = content; // THIS
                        // Pokud na vstupu nemám data předpisu, vracím chybu
                        if (Predpis == null || Predpis == undefined) {
                            that.dialogs.error("Chyba", "Není vybrán žádný předpis");
                            return;
                        }
                        // Pokud nemám na vstupu platný předpis (chybějící řádek) vracím chybu
                        if (Predpis.radek_uhr == null || Predpis.radek_uhr == undefined) {
                            that.dialogs.error("Chyba", "Není vybrán validní předpis");
                            return;
                        }
                        // Pokud nebyl zadán PID případu, zkusím ho vzít z předpisu
                        if (PidPripadu == null || PidPripadu == undefined) {
                            // Pokud nemám na vstupu platný předpis (chybějící ixp) vracím chybu
                            if (Predpis.ixp == null || Predpis.ixp == undefined) {
                                that.dialogs.error("Chyba", "Nebyl nalezen případ nad předpisem");
                                return;
                            }
                            else {
                                // V opačném případě použiju pid z řádku předpisu
                                PidPripadu = Predpis.ixp;
                            }
                        }
                        // Provedu otevření předpisu
                        that.navigate("Gordic.Ddp.WebClient.GDetailPredpisu", {
                            ID: 'DDPGDetailPredpisu#', // ID okna
                            Titulek: `Detail předpisu č.${Predpis.radek_uhr}`, // Titulek okna
                            Ixp: PidPripadu, // Pid případu/předpisu !REQUIRED!
                            Radek_uhr: Predpis.radek_uhr, // Řádek předpisu !REQUIRED!
                            Typ_phl: TypPhl, // Typ pohledávky (pokud je zadaný, jinak se při otevření načte z případu)
                            Edit: true, // True, protože se jedná o otevření detailu (editace předpisu)
                            Test: false // Zda se jedná o testovací režim (false - nejedná se o testovací režim)
                        })
                            .on("close", (ev, retVal) => {
                            //that.loadPredpisy();
                            return (retVal);
                        });
                    }
                    Predpisy.openDetailPredpisu = openDetailPredpisu;
                    /////////////////////////////////////////////////////////////////////////
                    //////////////////// A K C E // P Ř E D P I S Ů /////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    //#region A K C E // P Ř E D P I S Ů
                    let Actions;
                    (function (Actions) {
                        function Storno(content, view, predpisy) {
                            if (predpisy.length > 0) {
                                content.dialogs.confirm("Stornovat?", "Opravdu chcete v stornovat všechny vybrané předpisy?")
                                    .on("close", (ev, retVal) => {
                                    if (retVal === "yes") {
                                        Common.Base.ProcessResponse(Gordic.Isl.Predpisy.storno({ rq: { RequestData: predpisy } }).get(), content, false)
                                            .always(() => {
                                            view.requestData();
                                        });
                                    }
                                });
                            }
                            else {
                                //content.showFlash("Vyberte předpisy ke stornu", "g-state-warning", 10000);
                                content.showFlash("Vyberte předpisy ke stornu", "warning");
                            }
                        }
                        Actions.Storno = Storno;
                        /**
                         *
                         * @param {GContent}     that - GContent (this)
                         * @param {string}       ixp - PID případu
                         * @param {string}       typ_phl - Id. číslo typu pohledávky
                         * @param {boolean}      actNovyPredpis - Perms. o dovolení zakládat nové předpisy na případu
                         * @param {GPredpisDto} predpis - DTO řádku předpisu
                         */
                        function PohybyPredpisu(that, ixp, typ_phl, 
                        //typ_upr: string,          * @param {string}       typ_upr - Id. Typu účetního případu
                        actNovyPredpis, predpis) {
                            var def = $.Deferred();
                            //if (ixp?.trim() == "") {
                            //    that.dialogs.error("Chyba", "Nelze přidávat do prázdného formuláře!");
                            //    return;
                            //}
                            //if (predpis?.radek_uhr == null || predpis?.radek_uhr == undefined) {
                            //    that.dialogs.error("Chyba", "Vyberte validní předpis");
                            //    return;
                            //}
                            //If SalTblQueryRowFlags(tbl_predpisy, SalTblQueryContext(tbl_predpisy), ROW_Edited | ROW_New | ROW_MarkDeleted)
                            //	Call gf_ZobrazChybu('Nejprve předpisy uložte, pak můžete nastavit jeho pohyby!')
                            //	Return 0
                            let editable = actNovyPredpis //? Budu mít vždy na řádku předpisu načtený údaj "stav_uz_pr" ?
                                && predpis.stav_uz_pr < 200
                                || predpis.stav_uz_pr == 610
                                || predpis.stav_uz_pr == 615
                                || predpis.stav_uz_pr == 620
                                || predpis.stav_uz_pr == 630;
                            that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPohybyPredpisu", {
                                ID: "DDPGPohybyPredpisu#",
                                Ixp: predpis.ixp ?? ixp, //? 
                                Radek_uhr: predpis.radek_uhr,
                                Typ_phl: typ_phl,
                                //Typ_Upr_Phl: typ_upr,
                                ActNovyPredpis: actNovyPredpis, // that.permsDto.pb_novy_predpis, true, //
                            }, `Úprava pohybů předpisu č.${predpis.radek_uhr}`, 790, 960) // height: 960px; width: 790px;
                                .on("close", (retData) => {
                                def.resolve(retData);
                            });
                            return def.promise();
                        }
                        Actions.PohybyPredpisu = PohybyPredpisu;
                    })(Actions = Predpisy.Actions || (Predpisy.Actions = {}));
                    //#endregion A K C E // P Ř E D P I S Ů
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    ///////////////// U L O Ž E N Í // P Ř E D P I S U //////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    //#region U L O Ž E N Í // P Ř E D P I S Ů
                    let Kontroly;
                    (function (Kontroly) {
                        function KontrolaMeny(content, pom_mena, pripad_mena) {
                            const that = content;
                            var povoleniJineMeny;
                            var def = $.Deferred();
                            // V případě že měna nesedí dám dotaz zda s tím uživatel souhlasí
                            if (!new Decimal(pom_mena).isZero() && pom_mena != pripad_mena) {
                                that.dialogs.confirm("Upozornění", // Titulek okna
                                "Předpis je v jiné měně než je vedena celá pohledávka! \n" +
                                    "Pokud případ má předpisy v jiné měně než je uvedeno v hlavičce případu a není to CZK, nebude možné provádět přecenění pohledávek! \n" +
                                    "Chcete pokračovat ?")
                                    .on("close", (ev, retVal) => {
                                    if (retVal === "yes") {
                                        povoleniJineMeny = true;
                                        def.resolve(povoleniJineMeny);
                                    }
                                    else {
                                        povoleniJineMeny = false;
                                        def.reject(povoleniJineMeny);
                                    }
                                });
                                return def.promise();
                            }
                            else {
                                povoleniJineMeny = true;
                                return def.resolve(povoleniJineMeny).promise();
                            }
                        }
                        Kontroly.KontrolaMeny = KontrolaMeny;
                    })(Kontroly = Predpisy.Kontroly || (Predpisy.Kontroly = {}));
                    //#endregion U L O Ž E N Í // P Ř E D P I S Ů
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    ////////////////// O P R A V N É // P O L O Ž K Y ///////////////////////
                    /////////////////////////////////////////////////////////////////////////
                    //#region O P R A V N É // P O L O Ž K Y
                    function akceTlacitkaGenerovaniOprPolozek(content, Ixp, ddp_rad_prenrz) {
                        const that = content;
                        //var cbGenOpr = that.findForms("formProfilPohledavky").findFields("gen_opr").gfield<boolean>("getValue");
                        //if (cbGenOpr == false) {
                        //    return that.dialogs.warning("Chyba", "Případ nemá nastaven příznak generování opravných položek, nelze generovat!");
                        //}
                        //TODO ??? If NOT KontrolaZmenyDokladu() return false
                        ZiskejDatumOpravnePolozky(that)
                            .done((datumOpr) => {
                            MaPripadOpravnePredpisyPoDatu(that, Ixp, datumOpr)
                                .done(() => {
                                ZjistiPreuctovaniPohledavkyProGenerovaniOprPolozek(that, ddp_rad_prenrz)
                                    .done((preuctovani) => {
                                    GenerujOpravnouPolozku(that, Ixp, datumOpr, preuctovani)
                                        .done(() => {
                                        that.dialogs.alert("Oznámení", "Generování opravných položek proběhlo úspěšně")
                                            .on("close", () => {
                                            //TODO: if (that.viewOpravnePolozk) that.viewOpravnePolozk.requestData();
                                            return;
                                        });
                                    })
                                        .fail(() => {
                                        return; // Chyba při generování opr.položek - info o chybě v rámci metody vrácená z ISLu
                                    });
                                })
                                    .fail(() => {
                                    return that.dialogs.warning("Chyba", "Při generování došlo k chybě");
                                });
                            })
                                .fail(() => {
                                return that.dialogs.warning("Upozornění", "Generování přerušeno uživatelem");
                            });
                        })
                            .fail(() => {
                            return that.dialogs.error("Chyba", "Datum bylo zadáno chybně nebo nebylo zadáno vůbec");
                        });
                    }
                    Predpisy.akceTlacitkaGenerovaniOprPolozek = akceTlacitkaGenerovaniOprPolozek;
                    function ZiskejDatumOpravnePolozky(content) {
                        const that = content;
                        var def = $.Deferred();
                        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDatum", { ID: "DDPGDatum#", DateBoxMode: 1, Datum: new Date(), }, "Datum vzniku", 400, 200)
                            .on("close", (obj, retVal) => {
                            if (!retVal || retVal.datum == null) {
                                def.reject(); //! Pokud nemám return z okna, nebo je datum null, vracím fail(=reject)
                                //that.dialogs.warning("Upozornění", "Datum bylo zadáno chybně nebo nebylo zadáno vůbec")
                                //    .on("close", () => {
                                //        def.reject();
                                //    });
                            }
                            else {
                                def.resolve(retVal.datum);
                            }
                        });
                        return def.promise();
                    }
                    Predpisy.ZiskejDatumOpravnePolozky = ZiskejDatumOpravnePolozky;
                    function MaPripadOpravnePredpisyPoDatu(content, ixp, datumOpr) {
                        const that = content;
                        var def = $.Deferred();
                        that.beginOperation("Kontroluji data...");
                        that.isl.OpravnePolozky.maPripadOpravnePredpisyPoDatu(rq => { return { ixp: ixp, datum: datumOpr }; })
                            .get()
                            .always(() => {
                            that.endOperation();
                        })
                            .done((ret) => {
                            if (ret == false) { //! Pokud je false, vracím resolve(done) a nic neřeším :-)
                                def.resolve();
                            }
                            else { //! v opačném případě upozorním uživatele a dotážu se zda to je v pořádku
                                that.dialogs.confirm("Upozornění", `Případ již má opravné položky od data ${datumOpr} (včetně), opravdu chcete generovat opravné položky k tomuto datu?`)
                                    .on("close", (obj, retVal) => {
                                    if (retVal === "yes") {
                                        def.resolve(); //! Uživ. zvolil ano, chce i přesto generovat, tka vracím resolve(done)
                                    }
                                    else {
                                        def.reject(); //! Tady ukončuji generování
                                    }
                                });
                            }
                        })
                            .fail(function (jqXHR, typ, obj) {
                            Common.Base.getFailFromIsl(that, jqXHR, typ, obj);
                            def.reject();
                        });
                        return def.promise();
                    }
                    Predpisy.MaPripadOpravnePredpisyPoDatu = MaPripadOpravnePredpisyPoDatu;
                    function ZjistiPreuctovaniPohledavkyProGenerovaniOprPolozek(content, ddp_rad_prenrz) {
                        const that = content;
                        var def = $.Deferred();
                        let odpisy = 0;
                        if (ddp_rad_prenrz == 0) {
                            // Nic se neděje a prom. odpisy zůstává na 0
                            //return odpisy; //odpisy = 0;//return 0; 
                            return def.resolve(odpisy).promise();
                        }
                        //Je aktivní parametr převodu, zeptám se uživatele zda s tím souhlasí.
                        that.dialogs.confirm("Upozornění", "Chcete současně s generováním opravných položek provést i přeúčtování pohledávky OPP - saldo?")
                            .on("close", (obj, retVal) => {
                            if (retVal === "yes") {
                                odpisy = 1;
                            }
                            def.resolve(odpisy);
                        });
                        return def.promise();
                    }
                    Predpisy.ZjistiPreuctovaniPohledavkyProGenerovaniOprPolozek = ZjistiPreuctovaniPohledavkyProGenerovaniOprPolozek;
                    //GenerovaniOpravnychPolozekPripadu(ixp: string, datum: Date, odpisy: number) {}
                    function GenerujOpravnouPolozku(content, pidPripadu, datumOpravy, preuctovaniPohledavky) {
                        const that = content;
                        var def = $.Deferred();
                        that.beginOperation("Probíhá generování opravné položky...");
                        that.isl.OpravnePolozky.generujOpravnouPolozku({ rq: { Data: { ixp: pidPripadu, dat_vzniku: datumOpravy, priz_opr: preuctovaniPohledavky } } })
                            .get()
                            .always(() => {
                            that.endOperation();
                        })
                            .done((ret) => {
                            //Common.Base.setNotificationAfterOperation(that, "idGPripadOpravnaPolozkaGenerovat", "Opravená položka byla úspěšně vygenerována");
                            def.resolve();
                        })
                            .fail((jqXHR, typ, obj) => {
                            Common.Base.getFailFromIsl(that, jqXHR, typ, obj);
                            def.reject();
                        });
                        return def.promise();
                    }
                    Predpisy.GenerujOpravnouPolozku = GenerujOpravnouPolozku;
                    //#endregion O P R A V N É // P O L O Ž K Y
                    /////////////////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////////////////
                })(Predpisy = Common.Predpisy || (Common.Predpisy = {}));
            })(Common = WebClient.Common || (WebClient.Common = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlZHBpc3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcmVkcGlzeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQStTZjtBQS9TRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0ErU25CO0lBL1NnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0ErUzdCO1FBL1NvQixXQUFBLFNBQVM7WUFBQyxJQUFBLE1BQU0sQ0ErU3BDO1lBL1M4QixXQUFBLE1BQU07Z0JBQUMsSUFBQSxRQUFRLENBK1M3QztnQkEvU3FDLFdBQUEsUUFBUTtvQkFDMUM7Ozs7Ozs7dUJBT0c7b0JBQ0gsU0FBZ0Isa0JBQWtCLENBQzlCLE9BQWlCLEVBQ2pCLE9BQXlDLEVBQUUsZ0dBQWdHO29CQUMzSSxVQUFtQixFQUNuQixNQUFlO3dCQUVmLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLE9BQU87d0JBQzdCLG9EQUFvRDt3QkFDcEQsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxTQUFTLEVBQUUsQ0FBQzs0QkFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLDJCQUEyQixDQUFDLENBQUE7NEJBQ3hELE9BQU87d0JBQ1gsQ0FBQzt3QkFDRCxzRUFBc0U7d0JBQ3RFLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUUsQ0FBQzs0QkFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLDZCQUE2QixDQUFDLENBQUE7NEJBQzFELE9BQU87d0JBQ1gsQ0FBQzt3QkFDRCwyREFBMkQ7d0JBQzNELElBQUksVUFBVSxJQUFJLElBQUks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O29CQUNELDJDQUEyQztvQkFDM0MseUVBQXlFO29CQUN6RSx5RUFBeUU7Z0JBQzdFLENBQUMsRUEvU3FDLFFBQVEsR0FBUixlQUFRLEtBQVIsZUFBUSxRQStTN0M7WUFBRCxDQUFDLEVBL1M4QixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQStTcEM7UUFBRCxDQUFDLEVBL1NvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUErUzdCO0lBQUQsQ0FBQyxFQS9TZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBK1NuQjtBQUFELENBQUMsRUEvU1MsTUFBTSxLQUFOLE1BQU0sUUErU2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuUHJlZHBpc3kudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFNkw61sZW7DqSBtZXRvZHkgYSBmdW5rY2UgcHJvIHByw6FjaSBzIHDFmWVkcGlzYW1hICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA0LTE0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uUHJlZHBpc3kge1xyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5rY2UgcHJvIG90ZXbFmWVuw60gZGV0YWlsdSBwxZllZHBpc3VcclxuICAgICAqIEBwYXJhbSBjb250ZW50IEdDb250ZW50ICh0aGlzKVxyXG4gICAgICogQHBhcmFtIFByZWRwaXMgRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8gLSBwxZllZHBpcywga3RlcsO9IHNlIG3DoSBvdGV2xZnDrXRcclxuICAgICAqIEBwYXJhbSBQaWRQcmlwYWR1IHN0cmluZyAtIFBJRCBwxZnDrXBhZHUsIGt0ZXLDvSBzZSBtw6Egb3RldsWZw610IChwb2t1ZCBuZW7DrSB6YWRhbsO9LCB2ZXptZSBzZSB6IHDFmWVkcGlzdSlcclxuICAgICAqIEBwYXJhbSBUeXBQaGwgc3RyaW5nIC0gVHlwIHBvaGxlZMOhdmt5IChwb2t1ZCBuZW7DrSB6YWRhbsO9LCB2ZXptZSBzZSB6IHDFmcOtcGFkdSB2IC52cyBuYSBkZXRhaWx1IHDFmWVkcGlzdSlcclxuICAgICAqIEByZXR1cm5zIHZvaWQgLSBQbyB6YXbFmWVuw60gb2tuYSBwxZllZHBpc3Ugc2UgZnVua2NlIHZyw6F0w60gZG8gbcOtc3RhIHZvbMOhbsOtXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBvcGVuRGV0YWlsUHJlZHBpc3UoXHJcbiAgICAgICAgY29udGVudDogR0NvbnRlbnQsXHJcbiAgICAgICAgUHJlZHBpczogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8sIC8vIHZhciBzZWxlY3Rpb24gPSB0aGlzLmdyaWRQcmVkcGlzeS5nZ3JpZDxEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgUGlkUHJpcGFkdT86IHN0cmluZyxcclxuICAgICAgICBUeXBQaGw/OiBzdHJpbmcpXHJcbiAgICAgICAgOiB2b2lkIHwgYW55IHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gY29udGVudDsgLy8gVEhJU1xyXG4gICAgICAgIC8vIFBva3VkIG5hIHZzdHVwdSBuZW3DoW0gZGF0YSBwxZllZHBpc3UsIHZyYWPDrW0gY2h5YnVcclxuICAgICAgICBpZiAoUHJlZHBpcyA9PSBudWxsIHx8IFByZWRwaXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmVuw60gdnlicsOhbiDFvsOhZG7DvSBwxZllZHBpc1wiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFBva3VkIG5lbcOhbSBuYSB2c3R1cHUgcGxhdG7DvSBwxZllZHBpcyAoY2h5YsSbasOtY8OtIMWZw6FkZWspIHZyYWPDrW0gY2h5YnVcclxuICAgICAgICBpZiAoUHJlZHBpcy5yYWRla191aHIgPT0gbnVsbCB8fCBQcmVkcGlzLnJhZGVrX3VociA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOZW7DrSB2eWJyw6FuIHZhbGlkbsOtIHDFmWVkcGlzXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUG9rdWQgbmVieWwgemFkw6FuIFBJRCBwxZnDrXBhZHUsIHprdXPDrW0gaG8gdnrDrXQgeiBwxZllZHBpc3VcclxuICAgICAgICBpZiAoUGlkUHJpcGFkdSA9PSBudWxsIHx8IFBpZFByaXBhZHUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIFBva3VkIG5lbcOhbSBuYSB2c3R1cHUgcGxhdG7DvSBwxZllZHBpcyAoY2h5YsSbasOtY8OtIGl4cCkgdnJhY8OtbSBjaHlidVxyXG4gICAgICAgICAgICBpZiAoUHJlZHBpcy5peHAgPT0gbnVsbCB8fCBQcmVkcGlzLml4cCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTmVieWwgbmFsZXplbiBwxZnDrXBhZCBuYWQgcMWZZWRwaXNlbVwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gViBvcGHEjW7DqW0gcMWZw61wYWTEmyBwb3XFvmlqdSBwaWQgeiDFmcOhZGt1IHDFmWVkcGlzdVxyXG4gICAgICAgICAgICAgICAgUGlkUHJpcGFkdSA9IFByZWRwaXMuaXhwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFByb3ZlZHUgb3RldsWZZW7DrSBwxZllZHBpc3VcclxuICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFByZWRwaXN1XCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElEOiAnRERQR0RldGFpbFByZWRwaXN1IycsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJRCBva25hXHJcbiAgICAgICAgICAgICAgICBUaXR1bGVrOiBgRGV0YWlsIHDFmWVkcGlzdSDEjS4ke1ByZWRwaXMucmFkZWtfdWhyfWAsICAvLyBUaXR1bGVrIG9rbmFcclxuICAgICAgICAgICAgICAgIEl4cDogUGlkUHJpcGFkdSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQaWQgcMWZw61wYWR1L3DFmWVkcGlzdSAhUkVRVUlSRUQhXHJcbiAgICAgICAgICAgICAgICBSYWRla191aHI6IFByZWRwaXMucmFkZWtfdWhyLCAgICAgICAgICAgICAgICAgICAgICAgLy8gxZjDoWRlayBwxZllZHBpc3UgIVJFUVVJUkVEIVxyXG4gICAgICAgICAgICAgICAgVHlwX3BobDogVHlwUGhsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cCBwb2hsZWTDoXZreSAocG9rdWQgamUgemFkYW7DvSwgamluYWsgc2UgcMWZaSBvdGV2xZllbsOtIG5hxI10ZSB6IHDFmcOtcGFkdSlcclxuICAgICAgICAgICAgICAgIEVkaXQ6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUcnVlLCBwcm90b8W+ZSBzZSBqZWRuw6EgbyBvdGV2xZllbsOtIGRldGFpbHUgKGVkaXRhY2UgcMWZZWRwaXN1KVxyXG4gICAgICAgICAgICAgICAgVGVzdDogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpkYSBzZSBqZWRuw6EgbyB0ZXN0b3ZhY8OtIHJlxb5pbSAoZmFsc2UgLSBuZWplZG7DoSBzZSBvIHRlc3RvdmFjw60gcmXFvmltKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmxvYWRQcmVkcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChyZXRWYWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLyBBIEsgQyBFIC8vIFAgxZggRSBEIFAgSSBTIMWuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vI3JlZ2lvbiBBIEsgQyBFIC8vIFAgxZggRSBEIFAgSSBTIMWuXHJcbiAgICBleHBvcnQgbmFtZXNwYWNlIEFjdGlvbnMge1xyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBTdG9ybm8oY29udGVudDogR0NvbnRlbnQsIHZpZXc6IElzbC5WaWV3PGFueT4sIHByZWRwaXN5OiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0b1tdKSB7XHJcbiAgICAgICAgICAgIGlmIChwcmVkcGlzeS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmRpYWxvZ3MuY29uZmlybShcIlN0b3Jub3ZhdD9cIiwgXCJPcHJhdmR1IGNoY2V0ZSB2IHN0b3Jub3ZhdCB2xaFlY2hueSB2eWJyYW7DqSBwxZllZHBpc3k/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKElzbC5QcmVkcGlzeS5zdG9ybm8oeyBycTogeyBSZXF1ZXN0RGF0YTogcHJlZHBpc3kgfSB9KS5nZXQoKSwgY29udGVudCwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9jb250ZW50LnNob3dGbGFzaChcIlZ5YmVydGUgcMWZZWRwaXN5IGtlIHN0b3JudVwiLCBcImctc3RhdGUtd2FybmluZ1wiLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LnNob3dGbGFzaChcIlZ5YmVydGUgcMWZZWRwaXN5IGtlIHN0b3JudVwiLCBcIndhcm5pbmdcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gICAgIHRoYXQgLSBHQ29udGVudCAodGhpcylcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgaXhwIC0gUElEIHDFmcOtcGFkdVxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICB0eXBfcGhsIC0gSWQuIMSNw61zbG8gdHlwdSBwb2hsZWTDoXZreVxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gICAgICBhY3ROb3Z5UHJlZHBpcyAtIFBlcm1zLiBvIGRvdm9sZW7DrSB6YWtsw6FkYXQgbm92w6kgcMWZZWRwaXN5IG5hIHDFmcOtcGFkdVxyXG4gICAgICAgICAqIEBwYXJhbSB7R1ByZWRwaXNEdG99IHByZWRwaXMgLSBEVE8gxZnDoWRrdSBwxZllZHBpc3VcclxuICAgICAgICAgKi9cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gUG9oeWJ5UHJlZHBpc3UoXHJcbiAgICAgICAgICAgIHRoYXQ6IEdDb250ZW50LFxyXG4gICAgICAgICAgICBpeHA6IHN0cmluZyxcclxuICAgICAgICAgICAgdHlwX3BobDogc3RyaW5nLFxyXG4gICAgICAgICAgICAvL3R5cF91cHI6IHN0cmluZywgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgdHlwX3VwciAtIElkLiBUeXB1IMO6xI1ldG7DrWhvIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICBhY3ROb3Z5UHJlZHBpczogYm9vbGVhbixcclxuICAgICAgICAgICAgcHJlZHBpczogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8pOiBKUXVlcnlQcm9taXNlPGFueT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKGl4cD8udHJpbSgpID09IFwiXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOZWx6ZSBwxZlpZMOhdmF0IGRvIHByw6F6ZG7DqWhvIGZvcm11bMOhxZllIVwiKTtcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9pZiAocHJlZHBpcz8ucmFkZWtfdWhyID09IG51bGwgfHwgcHJlZHBpcz8ucmFkZWtfdWhyID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIlZ5YmVydGUgdmFsaWRuw60gcMWZZWRwaXNcIik7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vSWYgU2FsVGJsUXVlcnlSb3dGbGFncyh0YmxfcHJlZHBpc3ksIFNhbFRibFF1ZXJ5Q29udGV4dCh0YmxfcHJlZHBpc3kpLCBST1dfRWRpdGVkIHwgUk9XX05ldyB8IFJPV19NYXJrRGVsZXRlZClcclxuICAgICAgICAgICAgLy9cdENhbGwgZ2ZfWm9icmF6Q2h5YnUoJ05lanBydmUgcMWZZWRwaXN5IHVsb8W+dGUsIHBhayBtxa/FvmV0ZSBuYXN0YXZpdCBqZWhvIHBvaHlieSEnKVxyXG4gICAgICAgICAgICAvL1x0UmV0dXJuIDBcclxuXHJcbiAgICAgICAgICAgIGxldCBlZGl0YWJsZSA9IGFjdE5vdnlQcmVkcGlzIC8vPyBCdWR1IG3DrXQgdsW+ZHkgbmEgxZnDoWRrdSBwxZllZHBpc3UgbmHEjXRlbsO9IMO6ZGFqIFwic3Rhdl91el9wclwiID9cclxuICAgICAgICAgICAgICAgICYmIHByZWRwaXMuc3Rhdl91el9wciEgPCAyMDBcclxuICAgICAgICAgICAgICAgIHx8IHByZWRwaXMuc3Rhdl91el9wciA9PSA2MTBcclxuICAgICAgICAgICAgICAgIHx8IHByZWRwaXMuc3Rhdl91el9wciA9PSA2MTVcclxuICAgICAgICAgICAgICAgIHx8IHByZWRwaXMuc3Rhdl91el9wciA9PSA2MjBcclxuICAgICAgICAgICAgICAgIHx8IHByZWRwaXMuc3Rhdl91el9wciA9PSA2MzA7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1BvaHlieVByZWRwaXN1XCIsIHtcclxuICAgICAgICAgICAgICAgIElEOiBcIkREUEdQb2h5YnlQcmVkcGlzdSNcIixcclxuICAgICAgICAgICAgICAgIEl4cDogcHJlZHBpcy5peHAgPz8gaXhwLCAvLz8gXHJcbiAgICAgICAgICAgICAgICBSYWRla191aHI6IHByZWRwaXMucmFkZWtfdWhyLFxyXG4gICAgICAgICAgICAgICAgVHlwX3BobDogdHlwX3BobCxcclxuICAgICAgICAgICAgICAgIC8vVHlwX1Vwcl9QaGw6IHR5cF91cHIsXHJcbiAgICAgICAgICAgICAgICBBY3ROb3Z5UHJlZHBpczogYWN0Tm92eVByZWRwaXMsIC8vIHRoYXQucGVybXNEdG8ucGJfbm92eV9wcmVkcGlzLCB0cnVlLCAvL1xyXG4gICAgICAgICAgICB9LCBgw5pwcmF2YSBwb2h5YsWvIHDFmWVkcGlzdSDEjS4ke3ByZWRwaXMucmFkZWtfdWhyfWAsIDc5MCwgOTYwKSAvLyBoZWlnaHQ6IDk2MHB4OyB3aWR0aDogNzkwcHg7XHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAocmV0RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvbiBBIEsgQyBFIC8vIFAgxZggRSBEIFAgSSBTIMWuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8gVSBMIE8gxb0gRSBOIMONIC8vIFAgxZggRSBEIFAgSSBTIFUgLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8jcmVnaW9uIFUgTCBPIMW9IEUgTiDDjSAvLyBQIMWYIEUgRCBQIEkgUyDFrlxyXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBLb250cm9seSB7XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIEtvbnRyb2xhTWVueShjb250ZW50OiBHQ29udGVudCwgcG9tX21lbmE6IG51bWJlciwgcHJpcGFkX21lbmE6IG51bWJlcik6IEpRdWVyeVByb21pc2U8Ym9vbGVhbj4geyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSBjb250ZW50O1xyXG4gICAgICAgICAgICB2YXIgcG92b2xlbmlKaW5lTWVueTogYm9vbGVhbjtcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgLy8gViBwxZnDrXBhZMSbIMW+ZSBtxJtuYSBuZXNlZMOtIGTDoW0gZG90YXogemRhIHMgdMOtbSB1xb5pdmF0ZWwgc291aGxhc8OtXHJcbiAgICAgICAgICAgIGlmICghbmV3IERlY2ltYWwocG9tX21lbmEhKS5pc1plcm8oKSAmJiBwb21fbWVuYSAhPSBwcmlwYWRfbWVuYSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgXCJVcG96b3JuxJtuw61cIiwgLy8gVGl0dWxlayBva25hXHJcbiAgICAgICAgICAgICAgICAgICAgXCJQxZllZHBpcyBqZSB2IGppbsOpIG3Em27EmyBuZcW+IGplIHZlZGVuYSBjZWzDoSBwb2hsZWTDoXZrYSEgXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiUG9rdWQgcMWZw61wYWQgbcOhIHDFmWVkcGlzeSB2IGppbsOpIG3Em27EmyBuZcW+IGplIHV2ZWRlbm8gdiBobGF2acSNY2UgcMWZw61wYWR1IGEgbmVuw60gdG8gQ1pLLCBuZWJ1ZGUgbW/Fvm7DqSBwcm92w6FkxJt0IHDFmWVjZW7Em27DrSBwb2hsZWTDoXZlayEgXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ2hjZXRlIHBva3JhxI1vdmF0ID9cIlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvdm9sZW5pSmluZU1lbnkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShwb3ZvbGVuaUppbmVNZW55KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvdm9sZW5pSmluZU1lbnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdChwb3ZvbGVuaUppbmVNZW55KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwb3ZvbGVuaUppbmVNZW55ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShwb3ZvbGVuaUppbmVNZW55KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyNlbmRyZWdpb24gVSBMIE8gxb0gRSBOIMONIC8vIFAgxZggRSBEIFAgSSBTIMWuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vIE8gUCBSIEEgViBOIMOJIC8vIFAgTyBMIE8gxb0gSyBZIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyNyZWdpb24gTyBQIFIgQSBWIE4gw4kgLy8gUCBPIEwgTyDFvSBLIFlcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBha2NlVGxhY2l0a2FHZW5lcm92YW5pT3ByUG9sb3playhjb250ZW50OiBHQ29udGVudCwgSXhwOiBzdHJpbmcsIGRkcF9yYWRfcHJlbnJ6OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gY29udGVudDtcclxuICAgICAgICAvL3ZhciBjYkdlbk9wciA9IHRoYXQuZmluZEZvcm1zKFwiZm9ybVByb2ZpbFBvaGxlZGF2a3lcIikuZmluZEZpZWxkcyhcImdlbl9vcHJcIikuZ2ZpZWxkPGJvb2xlYW4+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgLy9pZiAoY2JHZW5PcHIgPT0gZmFsc2UpIHtcclxuICAgICAgICAvLyAgICByZXR1cm4gdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJDaHliYVwiLCBcIlDFmcOtcGFkIG5lbcOhIG5hc3RhdmVuIHDFmcOtem5hayBnZW5lcm92w6Fuw60gb3ByYXZuw71jaCBwb2xvxb5laywgbmVsemUgZ2VuZXJvdmF0IVwiKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL1RPRE8gPz8/IElmIE5PVCBLb250cm9sYVptZW55RG9rbGFkdSgpIHJldHVybiBmYWxzZVxyXG4gICAgICAgIFppc2tlakRhdHVtT3ByYXZuZVBvbG96a3kodGhhdClcclxuICAgICAgICAgICAgLmRvbmUoKGRhdHVtT3ByKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBNYVByaXBhZE9wcmF2bmVQcmVkcGlzeVBvRGF0dSh0aGF0LCBJeHAsIGRhdHVtT3ByKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWmppc3RpUHJldWN0b3ZhbmlQb2hsZWRhdmt5UHJvR2VuZXJvdmFuaU9wclBvbG96ZWsodGhhdCwgZGRwX3JhZF9wcmVucnopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocHJldWN0b3ZhbmkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZW5lcnVqT3ByYXZub3VQb2xvemt1KHRoYXQsIEl4cCwgZGF0dW1PcHIsIHByZXVjdG92YW5pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJPem7DoW1lbsOtXCIsIFwiR2VuZXJvdsOhbsOtIG9wcmF2bsO9Y2ggcG9sb8W+ZWsgcHJvYsSbaGxvIMO6c3DEm8WhbsSbXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IGlmICh0aGF0LnZpZXdPcHJhdm5lUG9sb3prKSB0aGF0LnZpZXdPcHJhdm5lUG9sb3prLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vIENoeWJhIHDFmWkgZ2VuZXJvdsOhbsOtIG9wci5wb2xvxb5layAtIGluZm8gbyBjaHlixJsgdiByw6FtY2kgbWV0b2R5IHZyw6FjZW7DoSB6IElTTHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiQ2h5YmFcIiwgXCJQxZlpIGdlbmVyb3bDoW7DrSBkb8WhbG8gayBjaHlixJtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJVcG96b3JuxJtuw61cIiwgXCJHZW5lcm92w6Fuw60gcMWZZXJ1xaFlbm8gdcW+aXZhdGVsZW1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIkRhdHVtIGJ5bG8gemFkw6FubyBjaHlibsSbIG5lYm8gbmVieWxvIHphZMOhbm8gdsWvYmVjXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gWmlza2VqRGF0dW1PcHJhdm5lUG9sb3preShjb250ZW50OiBHQ29udGVudCk6IEpRdWVyeVByb21pc2UgPCBhbnkgPiB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEYXR1bVwiLCB7IElEOiBcIkREUEdEYXR1bSNcIiwgRGF0ZUJveE1vZGU6IDEsIERhdHVtOiBuZXcgRGF0ZSgpLCB9LCBcIkRhdHVtIHZ6bmlrdVwiLCA0MDAsIDIwMClcclxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKG9iaiwgcmV0VmFsOiB7IGRhdHVtOiBEYXRlIH0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmV0VmFsIHx8IHJldFZhbC5kYXR1bSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpOyAvLyEgUG9rdWQgbmVtw6FtIHJldHVybiB6IG9rbmEsIG5lYm8gamUgZGF0dW0gbnVsbCwgdnJhY8OtbSBmYWlsKD1yZWplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmRpYWxvZ3Mud2FybmluZyhcIlVwb3pvcm7Em27DrVwiLCBcIkRhdHVtIGJ5bG8gemFkw6FubyBjaHlibsSbIG5lYm8gbmVieWxvIHphZMOhbm8gdsWvYmVjXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXRWYWwuZGF0dW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBNYVByaXBhZE9wcmF2bmVQcmVkcGlzeVBvRGF0dShjb250ZW50OiBHQ29udGVudCwgaXhwOiBzdHJpbmcsIGRhdHVtT3ByOiBEYXRlKTogSlF1ZXJ5UHJvbWlzZSA8IHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gY29udGVudDtcclxuICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJLb250cm9sdWppIGRhdGEuLi5cIilcclxuICAgICAgICAgICAgdGhhdC5pc2wuT3ByYXZuZVBvbG96a3kubWFQcmlwYWRPcHJhdm5lUHJlZHBpc3lQb0RhdHUocnEgPT4geyByZXR1cm4geyBpeHA6IGl4cCwgZGF0dW06IGRhdHVtT3ByIH0gfSlcclxuICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldCA9PSBmYWxzZSkgeyAgICAgLy8hIFBva3VkIGplIGZhbHNlLCB2cmFjw61tIHJlc29sdmUoZG9uZSkgYSBuaWMgbmXFmWXFocOtbSA6LSlcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgLy8hIHYgb3BhxI1uw6ltIHDFmcOtcGFkxJsgdXBvem9ybsOtbSB1xb5pdmF0ZWxlIGEgZG90w6HFvnUgc2UgemRhIHRvIGplIHYgcG/FmcOhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJVcG96b3JuxJtuw61cIiwgYFDFmcOtcGFkIGppxb4gbcOhIG9wcmF2bsOpIHBvbG/Fvmt5IG9kIGRhdGEgJHtkYXR1bU9wcn0gKHbEjWV0bsSbKSwgb3ByYXZkdSBjaGNldGUgZ2VuZXJvdmF0IG9wcmF2bsOpIHBvbG/Fvmt5IGsgdG9tdXRvIGRhdHU/YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKG9iaiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTsgLy8hIFXFvml2LiB6dm9saWwgYW5vLCBjaGNlIGkgcMWZZXN0byBnZW5lcm92YXQsIHRrYSB2cmFjw61tIHJlc29sdmUoZG9uZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpOyAvLyEgVGFkeSB1a29uxI11amkgZ2VuZXJvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuZ2V0RmFpbEZyb21Jc2wodGhhdCwganFYSFIsIHR5cCwgb2JqKTtcclxuICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gWmppc3RpUHJldWN0b3ZhbmlQb2hsZWRhdmt5UHJvR2VuZXJvdmFuaU9wclBvbG96ZWsoY29udGVudDogR0NvbnRlbnQsIGRkcF9yYWRfcHJlbnJ6OiBudW1iZXIpOiBKUXVlcnlQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSBjb250ZW50O1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IG9kcGlzeSA9IDBcclxuICAgICAgICBpZiAoZGRwX3JhZF9wcmVucnogPT0gMCkge1xyXG4gICAgICAgICAgICAvLyBOaWMgc2UgbmVkxJtqZSBhIHByb20uIG9kcGlzeSB6xa9zdMOhdsOhIG5hIDBcclxuICAgICAgICAgICAgLy9yZXR1cm4gb2RwaXN5OyAvL29kcGlzeSA9IDA7Ly9yZXR1cm4gMDsgXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShvZHBpc3kpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9KZSBha3Rpdm7DrSBwYXJhbWV0ciBwxZlldm9kdSwgemVwdMOhbSBzZSB1xb5pdmF0ZWxlIHpkYSBzIHTDrW0gc291aGxhc8OtLlxyXG4gICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiVXBvem9ybsSbbsOtXCIsIFwiQ2hjZXRlIHNvdcSNYXNuxJsgcyBnZW5lcm92w6Fuw61tIG9wcmF2bsO9Y2ggcG9sb8W+ZWsgcHJvdsOpc3QgaSBwxZllw7rEjXRvdsOhbsOtIHBvaGxlZMOhdmt5IE9QUCAtIHNhbGRvP1wiKVxyXG4gICAgICAgICAgICAub24oXCJjbG9zZVwiLCAob2JqLCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZHBpc3kgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmLnJlc29sdmUob2RwaXN5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICB9XHJcbiAgICAvL0dlbmVyb3ZhbmlPcHJhdm55Y2hQb2xvemVrUHJpcGFkdShpeHA6IHN0cmluZywgZGF0dW06IERhdGUsIG9kcGlzeTogbnVtYmVyKSB7fVxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBHZW5lcnVqT3ByYXZub3VQb2xvemt1KGNvbnRlbnQ6IEdDb250ZW50LCBwaWRQcmlwYWR1OiBzdHJpbmcsIGRhdHVtT3ByYXZ5OiBEYXRlLCBwcmV1Y3RvdmFuaVBvaGxlZGF2a3k6IG51bWJlcik6IEpRdWVyeVByb21pc2UgPCB2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIGdlbmVyb3bDoW7DrSBvcHJhdm7DqSBwb2xvxb5reS4uLlwiKTtcclxuICAgICAgICB0aGF0LmlzbC5PcHJhdm5lUG9sb3preS5nZW5lcnVqT3ByYXZub3VQb2xvemt1KHsgcnE6IHsgRGF0YTogeyBpeHA6IHBpZFByaXBhZHUsIGRhdF92em5pa3U6IGRhdHVtT3ByYXZ5LCBwcml6X29wcjogcHJldWN0b3ZhbmlQb2hsZWRhdmt5IH0gfSB9KVxyXG4gICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL0NvbW1vbi5CYXNlLnNldE5vdGlmaWNhdGlvbkFmdGVyT3BlcmF0aW9uKHRoYXQsIFwiaWRHUHJpcGFkT3ByYXZuYVBvbG96a2FHZW5lcm92YXRcIiwgXCJPcHJhdmVuw6EgcG9sb8W+a2EgYnlsYSDDunNwxJvFoW7EmyB2eWdlbmVyb3bDoW5hXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZhaWwoKGpxWEhSLCB0eXAsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuZ2V0RmFpbEZyb21Jc2wodGhhdCwganFYSFIsIHR5cCwgb2JqKTtcclxuICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uIE8gUCBSIEEgViBOIMOJIC8vIFAgTyBMIE8gxb0gSyBZXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbn1cclxuIl19