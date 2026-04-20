"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.Previews.ts                                                        </Name>
//    <Description> Previews                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
Gordic.Previews.register("ada:Akce", {
    // Ověřování, zda je řádek kompletní
    canRender: function (dto) { return dto.cislo != null; },
    // Samotné vykreslení náhledu
    render: function (div, dto) {
        var that = this;
        var rightSbKpiCerpani;
        var rightSbKpiRezervace;
        var currentElement = $(div);
        //data jsou ready -> samotné vytvoření náhledu
        //currentElement.empty().append("<h3 class='g-state-text g-state-active' style='margin: 0.5rem;'>Akce '" + dto.nazev + "'</h3><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        currentElement.empty().append("<h3 class='g-state-text g-state-active' style='margin: 0.5rem;'>PP: " + dto.cislo + "</h3><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        if (this.rightSbKpiCerpani == null) { //pokud ještě nebylo vytvořeno kpi, vytvořit obálku pro kpi, zatím bez dat
            this.rightSbKpiCerpani = new GObservableObject({
                chartType: "liquid",
                value: 0,
                title: "Stav čerpání",
                text: "Stav čerpání v %",
                //width: 260,
                //height: 60,
                unit: "%",
                actionOnTitle: false,
                action: new GAction({
                    name: "selectBtn",
                    caption: 'Vybrat',
                    run: function (ev, ctx) {
                        // cnt.dialogs.alert("Klikl jste na KPI.");
                    }
                })
            });
        }
        this.rightSbKpiCerpani.fixedWidth = true;
        this.rightSbKpiCerpani.size = "small";
        this.rightSbKpiCerpani.textAlign = "center";
        if (this.rightSbKpiRezervace == null) { //pokud ještě nebylo vytvořeno kpi, vytvořit obálku pro kpi, zatím bez dat
            this.rightSbKpiRezervace = new GObservableObject({
                chartType: "liquid",
                value: 0,
                title: "Stav rezervace",
                text: "Stav rezervace v %",
                //width: 260,
                //height: 60,
                unit: "%",
                actionOnTitle: false,
                action: new GAction({
                    name: "selectBtn",
                    caption: 'Vybrat',
                    run: function (ev, ctx) {
                        // cnt.dialogs.alert("Klikl jste na KPI.");
                    }
                })
            });
        }
        this.rightSbKpiRezervace.fixedWidth = true;
        this.rightSbKpiRezervace.size = "small";
        this.rightSbKpiRezervace.textAlign = "center";
        var del_cislo;
        var akt_cislo_cer;
        var akt_cislo_rez;
        //        del_cislo = parseDecimal(dto.c_2!).plus(parseDecimal(dto.c_3!));
        del_cislo = (parseDecimal(dto.c_2)
            .plus(parseDecimal(dto.c_3))
            .plus(parseDecimal(dto.c_7))
            .plus(parseDecimal(dto.c_8))
            .plus(parseDecimal(dto.c_23))
            .plus(parseDecimal(dto.c_25))
            .plus(parseDecimal(dto.c_14))
            .plus(parseDecimal(dto.c_34))
            .plus(parseDecimal(dto.c_54))
            .plus(parseDecimal(dto.c_66)))
            .times(-1);
        akt_cislo_cer = new Decimal(0);
        akt_cislo_rez = new Decimal(0);
        if (del_cislo.cmp(0) == 0) {
            // akt_cislo_cer = new Decimal(0);
            // akt_cislo_rez = new Decimal(0);
            akt_cislo_cer = (parseDecimal(dto.c_0).div((parseDecimal(dto.c_2).plus(parseDecimal(dto.c_3)))));
            akt_cislo_rez = (parseDecimal(dto.c_6).plus(parseDecimal(dto.c_18))).div((parseDecimal(dto.c_2).plus(parseDecimal(dto.c_3))));
        }
        else {
            akt_cislo_cer = (parseDecimal(dto.c_0).div((parseDecimal(dto.c_2).plus(parseDecimal(dto.c_3)))));
            akt_cislo_rez = (parseDecimal(dto.c_6).plus(parseDecimal(dto.c_18))).div((parseDecimal(dto.c_2).plus(parseDecimal(dto.c_3))));
        }
        var liquidKpiDataCer;
        var liquidKpiDataRez;
        //var liquidKpiData = 100 * (Math.round(akt_cislo * 1000) / 1000);
        liquidKpiDataCer = (Decimal.round(akt_cislo_cer.times(10000))).div(100);
        liquidKpiDataRez = (Decimal.round(akt_cislo_rez.times(10000))).div(100);
        //aktualizace kpi
        if ((isNaN(liquidKpiDataCer.toNumber()) == true) || (isFinite(liquidKpiDataCer.toNumber()) == false)) {
            //this.rightSbKpiCerpani.visible = false;
            this.rightSbKpiCerpani.chartType = "valueCard";
            this.rightSbKpiCerpani.text = "";
            //this.rightSbKpiCerpani.value = "";
            this.rightSbKpiCerpani.data = { value: "***" };
            this.rightSbKpiCerpani.unit = "";
        }
        else {
            //this.rightSbKpiCerpani.visible = true;
            this.rightSbKpiCerpani.chartType = "liquid";
            this.rightSbKpiCerpani.data = parseDecimal(liquidKpiDataCer).toNumber();
            this.rightSbKpiCerpani.value = parseDecimal(liquidKpiDataCer).toNumber();
            this.rightSbKpiCerpani.unit = "%";
        }
        if ((isNaN(liquidKpiDataRez.toNumber()) == true) || (isFinite(liquidKpiDataRez.toNumber()) == false)) {
            //this.rightSbKpiRezervace.visible = false;
            this.rightSbKpiRezervace.chartType = "valueCard";
            this.rightSbKpiRezervace.text = "";
            //this.rightSbKpiRezervace.value = "";
            this.rightSbKpiRezervace.data = { value: "***" };
            this.rightSbKpiRezervace.unit = "";
        }
        else {
            //this.rightSbKpiRezervace.visible = true;
            this.rightSbKpiRezervace.chartType = "liquid";
            this.rightSbKpiRezervace.data = parseDecimal(liquidKpiDataRez).toNumber();
            this.rightSbKpiRezervace.value = parseDecimal(liquidKpiDataRez).toNumber();
            this.rightSbKpiRezervace.unit = "%";
        }
        this.rightSbKpiCerpani.update();
        this.rightSbKpiRezervace.update();
        ////naplnění KPI do panelu
        //var Kpi_nastaveni: GKpiItemOptions[] = new Array();
        //Kpi_nastaveni.push(this.rightSbKpiRezervace);
        //Kpi_nastaveni.push(this.rightSbKpiCerpani);
        //$("<div>").appendTo(currentElement).gkpipanel({
        //    displayMode: "panel",
        //    data: Kpi_nastaveni
        //});
        var konecny_rozpocet;
        var rezervace;
        var skutecnost;
        var rezervace_proc;
        var skutecnost_proc;
        var rezervace_str;
        var skutecnost_str;
        this.konecny_rozpocet = (parseDecimal(dto.c_2)
            .plus(parseDecimal(dto.c_3))
            .plus(parseDecimal(dto.c_7))
            .plus(parseDecimal(dto.c_8))
            .plus(parseDecimal(dto.c_23))
            .plus(parseDecimal(dto.c_25))
            .plus(parseDecimal(dto.c_14))
            .plus(parseDecimal(dto.c_34))
            .plus(parseDecimal(dto.c_54))
            .plus(parseDecimal(dto.c_66)))
            .times(-1);
        this.rezervace = (parseDecimal(dto.c_6).plus(parseDecimal(dto.c_18))).times(-1);
        this.skutecnost = (parseDecimal(dto.c_0)).times(-1);
        if (this.konecny_rozpocet.cmp(0) == 0) {
            this.rezervace_str = Gordic.Templates.Formatters.number(this.rezervace, "C").toString();
            this.skutecnost_str = Gordic.Templates.Formatters.number(this.skutecnost, "C").toString();
        }
        else {
            this.rezervace_proc = (this.rezervace).div(parseDecimal(this.konecny_rozpocet));
            this.rezervace_proc = (Decimal.round((this.rezervace_proc).times(10000))).div(100);
            this.skutecnost_proc = (this.skutecnost).div(parseDecimal(this.konecny_rozpocet));
            this.skutecnost_proc = (Decimal.round((this.skutecnost_proc).times(10000))).div(100);
            this.rezervace_str = Gordic.Templates.Formatters.number(this.rezervace, "C").toString() + " (" + Gordic.Templates.Formatters.number(this.rezervace_proc, "C").toString() + "%)";
            this.skutecnost_str = Gordic.Templates.Formatters.number(this.skutecnost, "C").toString() + " (" + Gordic.Templates.Formatters.number(this.skutecnost_proc, "C").toString() + "%)";
        }
        //Gordic.Previews.displayLinkButton(div, dto);
        var fornular = $("<div class='gform--view-mode'>").appendTo(currentElement)
            .gform("setup", { layoutDescriptor: "L1M1S1, breaks-300-400" })
            .gformsection("create", "Hlavička PP")
            .gformrow("addFieldsRow", "Název PP").gformtext(dto.nazev, "bold")
            .gformrow("addFieldsRow", "Zpracovatel").gformtext(dto.ixs_fun_akt_nazev, "bold")
            .gformrow("addFieldsRow", "Realizátor").gformtext(dto.cis_real, "bold")
            .gformrow("addFieldsRow", "Zadavatel").gformtext(dto.ixs_fun_zad_nazev, "bold")
            .gformrow("addFieldsRow", "Proces realizace").gformtext(dto.ixs_prr_txt, "bold");
        fornular = fornular
            .gformsection("create", "Financování PP")
            .gformrow("addFieldsRow", "Konečný rozpočet").gformtext(Gordic.Templates.Formatters.number(del_cislo, "C").toString(), "bold")
            .gformrow("addFieldsRow", "Stav rezervace").gformtext(this.rezervace_str, "bold")
            .gformrow("addFieldsRow", "Stav čerpání").gformtext(this.skutecnost_str, "bold")
            .gformrow("addFieldsRow", "Financování").gformtext(((dto.fin_od != null) ? dto.fin_od : "...") + " - " + ((dto.fin_do != null) ? dto.fin_do : "..."), "bold")
            .gformrow("addFieldsRow", "Realizace").gformtext(((dto.real_od != null) ? dto.real_od : "...") + " - " + ((dto.real_do != null) ? dto.real_do : "..."), "bold");
        fornular = fornular
            .gformsection("create", "Základní údaje"); //.addClass("bold");
        if ((dto.ixs_csp == null) || (dto.ixs_csp == "")) {
            fornular = fornular
                .gformrow("addFieldsRow", "Skupina").gformtext(dto.skp_akce, "bold")
                .gformrow("addFieldsRow", "Podskupina").gformtext(dto.psk_akce, "bold");
        }
        else {
            fornular = fornular
                .gformrow("addFieldsRow", dto.prev_nazev_skp).gformtext(dto.skp_akc, "bold")
                .gformrow("addFieldsRow", dto.prev_nazev_psk).gformtext(dto.psk_akc, "bold");
        }
        ;
        fornular = fornular
            .gformrow("addFieldsRow", "Plánované výdaje").gformtext(Gordic.Templates.Formatters.number(dto.c_celk, "C").toString(), "bold")
            .gformrow("addFieldsRow", "Forma následné akvizice").gformtext(dto.typ_vzb_txt, "bold")
            .gformrow("addFieldsRow", "Třída").gformtext(dto.ixs_tri_txt, "bold");
        //.gformsection("create", "Adresa")
        //.gformrow("addFieldsRow", "").gformtext(dto.adresa1, "bold")
        //.gformrow("addFieldsRow", "").gformtext(dto.adresa2, "bold")
        //.gformrow("addFieldsRow", "").gformtext(dto.psc, "bold")
        //.gformrow("addFieldsRow", "").gformtext(dto.adresa3, "bold");
        //currentElement.resize().find(".gform-section").children("label").first().addClass("g-state-text g-state-active");
    }
});
Gordic.Previews.register("ada:AkceVP", {
    // Ověřování, zda je řádek kompletní
    canRender: function (dto) {
        return true; // dto.cislo != null;
    },
    // Samotné vykreslení náhledu
    render: function (div, dto) {
        var datat = [];
        datat = dto.data;
        console.log('Pr', datat);
        var currentElement = $(div);
        currentElement.empty();
        //// zobrazení pomocí gtable
        //currentElement.appendTo(currentElement).gtable({
        //    data: datat,       //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
        //    columns: new Gordic.Data.GridFormat()
        //        .addNumberColumn({
        //            name: "rok_vp", caption: "Rok", description: "Rok"
        //        })
        //        .addCurrencyColumn({
        //            name: "c_plan", caption: "Částka VP", description: "Částka VP", align: "right"
        //        })
        //        .addCurrencyColumn({
        //            name: "c_fin", caption: "Částka FIN", description: "Částka FIN", align: "right"
        //        })
        //        .addCurrencyColumn({
        //            name: "c_rozdil", caption: "Rozdíl", description: "Rozdíl", align: "right"
        //        })
        //});
        // zobrazení pomocí KPI
        var result = [];
        var celkem_castka_vp = new Decimal(0);
        var celkem_castka_fin = new Decimal(0);
        var celkem_castka_rozdil = new Decimal(0);
        datat.forEach((r) => {
            celkem_castka_vp = parseDecimal(celkem_castka_vp).plus(parseDecimal(r.c_plan));
            celkem_castka_fin = parseDecimal(celkem_castka_fin).plus(parseDecimal(r.c_fin));
            celkem_castka_rozdil = parseDecimal(celkem_castka_rozdil).plus(parseDecimal(r.c_rozdil));
        });
        result.push(new GObservableObject({
            name: "kpiroz" + "CELKEM", title: "CELKEM", detailsDirection: "vertical",
            details: [{
                    description: "<b>Částka VP</b>",
                    value: celkem_castka_vp,
                    tooltip: "Částka VP",
                    formatter: "C",
                    unit: "Kč",
                    meaning: "normal",
                },
                {
                    description: "<b>Částka FIN</b>",
                    value: celkem_castka_fin,
                    tooltip: "Částka FIN",
                    formatter: "C",
                    unit: "Kč",
                    meaning: "normal",
                },
                {
                    description: "<b>Rozdíl</b>",
                    value: celkem_castka_rozdil,
                    tooltip: "Rozdíl",
                    formatter: "C",
                    unit: "Kč",
                    meaning: (parseDecimal(celkem_castka_rozdil).toNumber() == new Decimal(0).toNumber()) ? "positive" : "negative",
                }
            ]
        }));
        datat.forEach((r) => {
            result.push(new GObservableObject({
                name: "kpiroz" + r.rok_vp, title: r.rok_vp, detailsDirection: "vertical",
                details: [{
                        description: "<b>Částka VP</b>",
                        value: r.c_plan,
                        tooltip: "Částka VP",
                        formatter: "C",
                        unit: "Kč",
                        meaning: "normal",
                    },
                    {
                        description: "<b>Částka FIN</b>",
                        value: r.c_fin,
                        tooltip: "Částka FIN",
                        formatter: "C",
                        unit: "Kč",
                        meaning: "normal",
                    },
                    {
                        description: "<b>Rozdíl</b>",
                        value: r.c_rozdil,
                        tooltip: "Rozdíl",
                        formatter: "C",
                        unit: "Kč",
                        meaning: (parseDecimal(r.c_rozdil).toNumber() == new Decimal(0).toNumber()) ? "positive" : "negative",
                    }
                ]
            }));
        });
        $("<div>").appendTo(currentElement).gkpipanel({
            displayMode: "panel",
            data: result,
            fixedWidth: true,
            width: 240
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkYVByZXZpZXdzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dBZGFQcmV2aWV3cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTtBQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtJQUVqQyxvQ0FBb0M7SUFDcEMsU0FBUyxFQUFFLFVBQVUsR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXZELDZCQUE2QjtJQUM3QixNQUFNLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztRQUV0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsSUFBSSxpQkFBcUQsQ0FBQztRQUMxRCxJQUFJLG1CQUF1RCxDQUFDO1FBRTVELElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1Qiw4Q0FBOEM7UUFDOUMsNEtBQTRLO1FBQzVLLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0VBQXNFLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxrREFBa0QsQ0FBQyxDQUFDO1FBRXZLLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsMEVBQTBFO1lBQzVHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixDQUFrQjtnQkFDNUQsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxjQUFjO2dCQUNyQixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQztvQkFDaEIsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxRQUFRO29CQUNqQixH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QUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQzthQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQzthQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQzthQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsQ0FBQzthQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsQ0FBQzthQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsQ0FBQzthQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsQ0FBQzthQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsQ0FBQzthQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzlCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWYsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDckMsQ0FBQztZQUNHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVB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QUFVLENBQUMsQ0FBQyxDQUFDLFVBQVU7cUJBQ3pHO2lCQUNBO2FBQ1IsQ0FBQyxDQUFDLENBQUM7UUFFUixDQUFDLENBQUMsQ0FBQztRQUVILENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFDLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLElBQUksRUFBRSxNQUFNO1lBQ1osVUFBVSxFQUFFLElBQUk7WUFDaEIsS0FBSyxFQUFFLEdBQUc7U0FDYixDQUFDLENBQUM7SUFFUCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LlByZXZpZXdzLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gUHJldmlld3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuR29yZGljLlByZXZpZXdzLnJlZ2lzdGVyKFwiYWRhOkFrY2VcIiwge1xyXG5cclxuICAgIC8vIE92xJvFmW92w6Fuw60sIHpkYSBqZSDFmcOhZGVrIGtvbXBsZXRuw61cclxuICAgIGNhblJlbmRlcjogZnVuY3Rpb24gKGR0bykgeyByZXR1cm4gZHRvLmNpc2xvICE9IG51bGw7IH0sXHJcbiAgICBcclxuICAgIC8vIFNhbW90bsOpIHZ5a3Jlc2xlbsOtIG7DoWhsZWR1XHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIChkaXYsIGR0bykge1xyXG5cclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciByaWdodFNiS3BpQ2VycGFuaTogR09ic2VydmFibGVPYmplY3Q8R0twaUl0ZW1PcHRpb25zPjtcclxuICAgICAgICB2YXIgcmlnaHRTYktwaVJlemVydmFjZTogR09ic2VydmFibGVPYmplY3Q8R0twaUl0ZW1PcHRpb25zPjtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gJChkaXYpO1xyXG4gICAgICAgIC8vZGF0YSBqc291IHJlYWR5IC0+IHNhbW90bsOpIHZ5dHZvxZllbsOtIG7DoWhsZWR1XHJcbiAgICAgICAgLy9jdXJyZW50RWxlbWVudC5lbXB0eSgpLmFwcGVuZChcIjxoMyBjbGFzcz0nZy1zdGF0ZS10ZXh0IGctc3RhdGUtYWN0aXZlJyBzdHlsZT0nbWFyZ2luOiAwLjVyZW07Jz5Ba2NlICdcIiArIGR0by5uYXpldiArIFwiJzwvaDM+PGhyIHN0eWxlPSdtYXJnaW46IDAuNXJlbTsgb3BhY2l0eTogMC4yOycvPlwiKTtcclxuICAgICAgICBjdXJyZW50RWxlbWVudC5lbXB0eSgpLmFwcGVuZChcIjxoMyBjbGFzcz0nZy1zdGF0ZS10ZXh0IGctc3RhdGUtYWN0aXZlJyBzdHlsZT0nbWFyZ2luOiAwLjVyZW07Jz5QUDogXCIgKyBkdG8uY2lzbG8gKyBcIjwvaDM+PGhyIHN0eWxlPSdtYXJnaW46IDAuNXJlbTsgb3BhY2l0eTogMC4yOycvPlwiKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmlnaHRTYktwaUNlcnBhbmkgPT0gbnVsbCkgeyAvL3Bva3VkIGplxaF0xJsgbmVieWxvIHZ5dHZvxZllbm8ga3BpLCB2eXR2b8WZaXQgb2LDoWxrdSBwcm8ga3BpLCB6YXTDrW0gYmV6IGRhdFxyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0U2JLcGlDZXJwYW5pID0gbmV3IEdPYnNlcnZhYmxlT2JqZWN0PEdLcGlJdGVtT3B0aW9ucz4oe1xyXG4gICAgICAgICAgICAgICAgY2hhcnRUeXBlOiBcImxpcXVpZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJTdGF2IMSNZXJww6Fuw61cIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3RhdiDEjWVycMOhbsOtIHYgJVwiLFxyXG4gICAgICAgICAgICAgICAgLy93aWR0aDogMjYwLFxyXG4gICAgICAgICAgICAgICAgLy9oZWlnaHQ6IDYwLFxyXG4gICAgICAgICAgICAgICAgdW5pdDogXCIlXCIsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25PblRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsZWN0QnRuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogJ1Z5YnJhdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbnQuZGlhbG9ncy5hbGVydChcIktsaWtsIGpzdGUgbmEgS1BJLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmlnaHRTYktwaUNlcnBhbmkuZml4ZWRXaWR0aCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yaWdodFNiS3BpQ2VycGFuaS5zaXplID0gXCJzbWFsbFwiO1xyXG4gICAgICAgIHRoaXMucmlnaHRTYktwaUNlcnBhbmkudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmlnaHRTYktwaVJlemVydmFjZSA9PSBudWxsKSB7IC8vcG9rdWQgamXFoXTEmyBuZWJ5bG8gdnl0dm/FmWVubyBrcGksIHZ5dHZvxZlpdCBvYsOhbGt1IHBybyBrcGksIHphdMOtbSBiZXogZGF0XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRTYktwaVJlemVydmFjZSA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdDxHS3BpSXRlbU9wdGlvbnM+KHtcclxuICAgICAgICAgICAgICAgIGNoYXJ0VHlwZTogXCJsaXF1aWRcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdiByZXplcnZhY2VcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiU3RhdiByZXplcnZhY2UgdiAlXCIsXHJcbiAgICAgICAgICAgICAgICAvL3dpZHRoOiAyNjAsXHJcbiAgICAgICAgICAgICAgICAvL2hlaWdodDogNjAsXHJcbiAgICAgICAgICAgICAgICB1bml0OiBcIiVcIixcclxuICAgICAgICAgICAgICAgIGFjdGlvbk9uVGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxlY3RCdG5cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiAnVnlicmF0JyxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNudC5kaWFsb2dzLmFsZXJ0KFwiS2xpa2wganN0ZSBuYSBLUEkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yaWdodFNiS3BpUmV6ZXJ2YWNlLmZpeGVkV2lkdGggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmlnaHRTYktwaVJlemVydmFjZS5zaXplID0gXCJzbWFsbFwiO1xyXG4gICAgICAgIHRoaXMucmlnaHRTYktwaVJlemVydmFjZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cclxuICAgICAgICB2YXIgZGVsX2Npc2xvOiBEZWNpbWFsO1xyXG4gICAgICAgIHZhciBha3RfY2lzbG9fY2VyOiBEZWNpbWFsO1xyXG4gICAgICAgIHZhciBha3RfY2lzbG9fcmV6OiBEZWNpbWFsO1xyXG5cclxuLy8gICAgICAgIGRlbF9jaXNsbyA9IHBhcnNlRGVjaW1hbChkdG8uY18yISkucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMyEpKTtcclxuICAgICAgICBkZWxfY2lzbG8gPSAocGFyc2VEZWNpbWFsKGR0by5jXzIhKVxyXG4gICAgICAgICAgICAucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMyEpKVxyXG4gICAgICAgICAgICAucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfNyEpKVxyXG4gICAgICAgICAgICAucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfOCEpKVxyXG4gICAgICAgICAgICAucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMjMhKSlcclxuICAgICAgICAgICAgLnBsdXMocGFyc2VEZWNpbWFsKGR0by5jXzI1ISkpXHJcbiAgICAgICAgICAgIC5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY18xNCEpKVxyXG4gICAgICAgICAgICAucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMzQhKSlcclxuICAgICAgICAgICAgLnBsdXMocGFyc2VEZWNpbWFsKGR0by5jXzU0ISkpXHJcbiAgICAgICAgICAgIC5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY182NiEpKSlcclxuICAgICAgICAgICAgLnRpbWVzKC0xKTtcclxuXHJcbiAgICAgICAgYWt0X2Npc2xvX2NlciA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgIGFrdF9jaXNsb19yZXogPSBuZXcgRGVjaW1hbCgwKTtcclxuXHJcbiAgICAgICAgaWYgKGRlbF9jaXNsby5jbXAoMCkgPT0gMCApIHtcclxuICAgICAgICAgICAgLy8gYWt0X2Npc2xvX2NlciA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAvLyBha3RfY2lzbG9fcmV6ID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgIGFrdF9jaXNsb19jZXIgPSAocGFyc2VEZWNpbWFsKGR0by5jXzAhKS5kaXYoKHBhcnNlRGVjaW1hbChkdG8uY18yISkucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMyEpKSkpKTtcclxuICAgICAgICAgICAgYWt0X2Npc2xvX3JleiA9IChwYXJzZURlY2ltYWwoZHRvLmNfNiEpLnBsdXMocGFyc2VEZWNpbWFsKGR0by5jXzE4ISkpKS5kaXYoKHBhcnNlRGVjaW1hbChkdG8uY18yISkucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMyEpKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWt0X2Npc2xvX2NlciA9IChwYXJzZURlY2ltYWwoZHRvLmNfMCEpLmRpdigocGFyc2VEZWNpbWFsKGR0by5jXzIhKS5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY18zISkpKSkpO1xyXG4gICAgICAgICAgICBha3RfY2lzbG9fcmV6ID0gKHBhcnNlRGVjaW1hbChkdG8uY182ISkucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMTghKSkpLmRpdigocGFyc2VEZWNpbWFsKGR0by5jXzIhKS5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY18zISkpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGlxdWlkS3BpRGF0YUNlcjogRGVjaW1hbDtcclxuICAgICAgICB2YXIgbGlxdWlkS3BpRGF0YVJlejogRGVjaW1hbDtcclxuXHJcbiAgICAgICAgLy92YXIgbGlxdWlkS3BpRGF0YSA9IDEwMCAqIChNYXRoLnJvdW5kKGFrdF9jaXNsbyAqIDEwMDApIC8gMTAwMCk7XHJcbiAgICAgICAgbGlxdWlkS3BpRGF0YUNlciA9IChEZWNpbWFsLnJvdW5kKGFrdF9jaXNsb19jZXIudGltZXMoMTAwMDApKSkuZGl2KDEwMCk7XHJcbiAgICAgICAgbGlxdWlkS3BpRGF0YVJleiA9IChEZWNpbWFsLnJvdW5kKGFrdF9jaXNsb19yZXoudGltZXMoMTAwMDApKSkuZGl2KDEwMCk7XHJcblxyXG4gICAgICAgIC8vYWt0dWFsaXphY2Uga3BpXHJcbiAgICAgICAgaWYgKChpc05hTihsaXF1aWRLcGlEYXRhQ2VyLnRvTnVtYmVyKCkpID09IHRydWUpIHx8IChpc0Zpbml0ZShsaXF1aWRLcGlEYXRhQ2VyLnRvTnVtYmVyKCkpID09IGZhbHNlKSkge1xyXG4gICAgICAgICAgICAvL3RoaXMucmlnaHRTYktwaUNlcnBhbmkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0U2JLcGlDZXJwYW5pLmNoYXJ0VHlwZSA9IFwidmFsdWVDYXJkXCI7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRTYktwaUNlcnBhbmkudGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vdGhpcy5yaWdodFNiS3BpQ2VycGFuaS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRTYktwaUNlcnBhbmkuZGF0YSA9IHsgdmFsdWU6IFwiKioqXCIgfTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodFNiS3BpQ2VycGFuaS51bml0ID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5yaWdodFNiS3BpQ2VycGFuaS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodFNiS3BpQ2VycGFuaS5jaGFydFR5cGUgPSBcImxpcXVpZFwiO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0U2JLcGlDZXJwYW5pLmRhdGEgPSBwYXJzZURlY2ltYWwobGlxdWlkS3BpRGF0YUNlcikudG9OdW1iZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodFNiS3BpQ2VycGFuaS52YWx1ZSA9IHBhcnNlRGVjaW1hbChsaXF1aWRLcGlEYXRhQ2VyKS50b051bWJlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0U2JLcGlDZXJwYW5pLnVuaXQgPSBcIiVcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgoaXNOYU4obGlxdWlkS3BpRGF0YVJlei50b051bWJlcigpKSA9PSB0cnVlKSB8fCAoaXNGaW5pdGUobGlxdWlkS3BpRGF0YVJlei50b051bWJlcigpKSA9PSBmYWxzZSkpIHtcclxuICAgICAgICAgICAgLy90aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UuY2hhcnRUeXBlID0gXCJ2YWx1ZUNhcmRcIjtcclxuICAgICAgICAgICAgdGhpcy5yaWdodFNiS3BpUmV6ZXJ2YWNlLnRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAvL3RoaXMucmlnaHRTYktwaVJlemVydmFjZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRTYktwaVJlemVydmFjZS5kYXRhID0geyB2YWx1ZTogXCIqKipcIiB9O1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UudW5pdCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMucmlnaHRTYktwaVJlemVydmFjZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodFNiS3BpUmV6ZXJ2YWNlLmNoYXJ0VHlwZSA9IFwibGlxdWlkXCI7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRTYktwaVJlemVydmFjZS5kYXRhID0gcGFyc2VEZWNpbWFsKGxpcXVpZEtwaURhdGFSZXopLnRvTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRTYktwaVJlemVydmFjZS52YWx1ZSA9IHBhcnNlRGVjaW1hbChsaXF1aWRLcGlEYXRhUmV6KS50b051bWJlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UudW5pdCA9IFwiJVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yaWdodFNiS3BpQ2VycGFuaS51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIC8vLy9uYXBsbsSbbsOtIEtQSSBkbyBwYW5lbHVcclxuICAgICAgICAvL3ZhciBLcGlfbmFzdGF2ZW5pOiBHS3BpSXRlbU9wdGlvbnNbXSA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICAvL0twaV9uYXN0YXZlbmkucHVzaCh0aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UpO1xyXG4gICAgICAgIC8vS3BpX25hc3RhdmVuaS5wdXNoKHRoaXMucmlnaHRTYktwaUNlcnBhbmkpO1xyXG5cclxuICAgICAgICAvLyQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhjdXJyZW50RWxlbWVudCkuZ2twaXBhbmVsKHtcclxuICAgICAgICAvLyAgICBkaXNwbGF5TW9kZTogXCJwYW5lbFwiLFxyXG4gICAgICAgIC8vICAgIGRhdGE6IEtwaV9uYXN0YXZlbmlcclxuICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICB2YXIga29uZWNueV9yb3pwb2NldDogRGVjaW1hbDtcclxuICAgICAgICB2YXIgcmV6ZXJ2YWNlOiBEZWNpbWFsO1xyXG4gICAgICAgIHZhciBza3V0ZWNub3N0OiBEZWNpbWFsO1xyXG4gICAgICAgIHZhciByZXplcnZhY2VfcHJvYzogRGVjaW1hbDtcclxuICAgICAgICB2YXIgc2t1dGVjbm9zdF9wcm9jOiBEZWNpbWFsO1xyXG4gICAgICAgIHZhciByZXplcnZhY2Vfc3RyOiBTdHJpbmc7XHJcbiAgICAgICAgdmFyIHNrdXRlY25vc3Rfc3RyOiBTdHJpbmc7XHJcblxyXG4gICAgICAgIHRoaXMua29uZWNueV9yb3pwb2NldCA9IChwYXJzZURlY2ltYWwoZHRvLmNfMiEpXHJcbiAgICAgICAgICAgIC5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY18zISkpXHJcbiAgICAgICAgICAgIC5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY183ISkpXHJcbiAgICAgICAgICAgIC5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY184ISkpXHJcbiAgICAgICAgICAgIC5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY18yMyEpKVxyXG4gICAgICAgICAgICAucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMjUhKSlcclxuICAgICAgICAgICAgLnBsdXMocGFyc2VEZWNpbWFsKGR0by5jXzE0ISkpXHJcbiAgICAgICAgICAgIC5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY18zNCEpKVxyXG4gICAgICAgICAgICAucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfNTQhKSlcclxuICAgICAgICAgICAgLnBsdXMocGFyc2VEZWNpbWFsKGR0by5jXzY2ISkpKVxyXG4gICAgICAgICAgICAudGltZXMoLTEpO1xyXG5cclxuICAgICAgICB0aGlzLnJlemVydmFjZSA9IChwYXJzZURlY2ltYWwoZHRvLmNfNiEpLnBsdXMocGFyc2VEZWNpbWFsKGR0by5jXzE4ISkpKS50aW1lcygtMSk7XHJcbiAgICAgICAgdGhpcy5za3V0ZWNub3N0ID0gKHBhcnNlRGVjaW1hbChkdG8uY18wISkpLnRpbWVzKC0xKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMua29uZWNueV9yb3pwb2NldC5jbXAoMCkgPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmV6ZXJ2YWNlX3N0ciA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIodGhpcy5yZXplcnZhY2UsIFwiQ1wiKS50b1N0cmluZygpIFxyXG4gICAgICAgICAgICB0aGlzLnNrdXRlY25vc3Rfc3RyID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcih0aGlzLnNrdXRlY25vc3QsIFwiQ1wiKS50b1N0cmluZygpIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlemVydmFjZV9wcm9jID0gKHRoaXMucmV6ZXJ2YWNlKS5kaXYocGFyc2VEZWNpbWFsKHRoaXMua29uZWNueV9yb3pwb2NldCkpO1xyXG4gICAgICAgICAgICB0aGlzLnJlemVydmFjZV9wcm9jID0gKERlY2ltYWwucm91bmQoKHRoaXMucmV6ZXJ2YWNlX3Byb2MpLnRpbWVzKDEwMDAwKSkpLmRpdigxMDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5za3V0ZWNub3N0X3Byb2MgPSAodGhpcy5za3V0ZWNub3N0KS5kaXYocGFyc2VEZWNpbWFsKHRoaXMua29uZWNueV9yb3pwb2NldCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNrdXRlY25vc3RfcHJvYyA9IChEZWNpbWFsLnJvdW5kKCh0aGlzLnNrdXRlY25vc3RfcHJvYykudGltZXMoMTAwMDApKSkuZGl2KDEwMCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlemVydmFjZV9zdHIgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHRoaXMucmV6ZXJ2YWNlLCBcIkNcIikudG9TdHJpbmcoKSArIFwiIChcIiArIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIodGhpcy5yZXplcnZhY2VfcHJvYywgXCJDXCIpLnRvU3RyaW5nKCkgKyBcIiUpXCJcclxuICAgICAgICAgICAgdGhpcy5za3V0ZWNub3N0X3N0ciA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIodGhpcy5za3V0ZWNub3N0LCBcIkNcIikudG9TdHJpbmcoKSArIFwiIChcIiArIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIodGhpcy5za3V0ZWNub3N0X3Byb2MsIFwiQ1wiKS50b1N0cmluZygpICsgXCIlKVwiIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9Hb3JkaWMuUHJldmlld3MuZGlzcGxheUxpbmtCdXR0b24oZGl2LCBkdG8pO1xyXG4gICAgICAgIHZhciBmb3JudWxhciA9ICQoXCI8ZGl2IGNsYXNzPSdnZm9ybS0tdmlldy1tb2RlJz5cIikuYXBwZW5kVG8oY3VycmVudEVsZW1lbnQpXHJcbiAgICAgICAgICAgIC5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIGJyZWFrcy0zMDAtNDAwXCIgfSlcclxuICAgICAgICAgICAgLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIkhsYXZpxI1rYSBQUFwiKVxyXG4gICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJOw6F6ZXYgUFBcIikuZ2Zvcm10ZXh0KGR0by5uYXpldiwgXCJib2xkXCIpXHJcbiAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlpwcmFjb3ZhdGVsXCIpLmdmb3JtdGV4dChkdG8uaXhzX2Z1bl9ha3RfbmF6ZXYsIFwiYm9sZFwiKVxyXG4gICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJSZWFsaXrDoXRvclwiKS5nZm9ybXRleHQoZHRvLmNpc19yZWFsLCBcImJvbGRcIilcclxuICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiWmFkYXZhdGVsXCIpLmdmb3JtdGV4dChkdG8uaXhzX2Z1bl96YWRfbmF6ZXYsIFwiYm9sZFwiKVxyXG4gICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJQcm9jZXMgcmVhbGl6YWNlXCIpLmdmb3JtdGV4dChkdG8uaXhzX3Bycl90eHQsIFwiYm9sZFwiKTtcclxuXHJcbiAgICAgICAgZm9ybnVsYXIgPSBmb3JudWxhclxyXG4gICAgICAgICAgICAuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIsIFwiRmluYW5jb3bDoW7DrSBQUFwiKVxyXG4gICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJLb25lxI1uw70gcm96cG/EjWV0XCIpLmdmb3JtdGV4dChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKGRlbF9jaXNsbywgXCJDXCIpLnRvU3RyaW5nKCksIFwiYm9sZFwiKVxyXG4gICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJTdGF2IHJlemVydmFjZVwiKS5nZm9ybXRleHQodGhpcy5yZXplcnZhY2Vfc3RyLCBcImJvbGRcIilcclxuICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiU3RhdiDEjWVycMOhbsOtXCIpLmdmb3JtdGV4dCh0aGlzLnNrdXRlY25vc3Rfc3RyLCBcImJvbGRcIilcclxuICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiRmluYW5jb3bDoW7DrVwiKS5nZm9ybXRleHQoKChkdG8uZmluX29kICE9IG51bGwpID8gZHRvLmZpbl9vZCA6IFwiLi4uXCIpICsgXCIgLSBcIiArICgoZHRvLmZpbl9kbyAhPSBudWxsKSA/IGR0by5maW5fZG8gOiBcIi4uLlwiKSwgXCJib2xkXCIpXHJcbiAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlJlYWxpemFjZVwiKS5nZm9ybXRleHQoKChkdG8ucmVhbF9vZCAhPSBudWxsKSA/IGR0by5yZWFsX29kIDogXCIuLi5cIikgKyBcIiAtIFwiICsgKChkdG8ucmVhbF9kbyAhPSBudWxsKSA/IGR0by5yZWFsX2RvIDogXCIuLi5cIiksIFwiYm9sZFwiKTtcclxuXHJcbiAgICAgICAgZm9ybnVsYXIgPSBmb3JudWxhclxyXG4gICAgICAgICAgICAuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIsIFwiWsOha2xhZG7DrSDDumRhamVcIiwpIC8vLmFkZENsYXNzKFwiYm9sZFwiKTtcclxuXHJcbiAgICAgICAgaWYgKChkdG8uaXhzX2NzcCA9PSBudWxsKSB8fCAoZHRvLml4c19jc3AgPT0gXCJcIikpIHtcclxuICAgICAgICAgICAgZm9ybnVsYXIgPSBmb3JudWxhclxyXG4gICAgICAgICAgICAgICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiU2t1cGluYVwiKS5nZm9ybXRleHQoZHRvLnNrcF9ha2NlLCBcImJvbGRcIilcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlBvZHNrdXBpbmFcIikuZ2Zvcm10ZXh0KGR0by5wc2tfYWtjZSwgXCJib2xkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JudWxhciA9IGZvcm51bGFyXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgZHRvLnByZXZfbmF6ZXZfc2twKS5nZm9ybXRleHQoIGR0by5za3BfYWtjLCBcImJvbGRcIilcclxuICAgICAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBkdG8ucHJldl9uYXpldl9wc2spLmdmb3JtdGV4dCggZHRvLnBza19ha2MsIFwiYm9sZFwiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3JudWxhciA9IGZvcm51bGFyXHJcbiAgICAgICAgICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlBsw6Fub3ZhbsOpIHbDvWRhamVcIikuZ2Zvcm10ZXh0KEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIoZHRvLmNfY2VsaywgXCJDXCIpLnRvU3RyaW5nKCksIFwiYm9sZFwiKVxyXG4gICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJGb3JtYSBuw6FzbGVkbsOpIGFrdml6aWNlXCIpLmdmb3JtdGV4dChkdG8udHlwX3Z6Yl90eHQsIFwiYm9sZFwiKVxyXG4gICAgICAgICAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJUxZnDrWRhXCIpLmdmb3JtdGV4dChkdG8uaXhzX3RyaV90eHQsIFwiYm9sZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIkFkcmVzYVwiKVxyXG4gICAgICAgICAgICAvLy5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlwiKS5nZm9ybXRleHQoZHRvLmFkcmVzYTEsIFwiYm9sZFwiKVxyXG4gICAgICAgICAgICAvLy5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlwiKS5nZm9ybXRleHQoZHRvLmFkcmVzYTIsIFwiYm9sZFwiKVxyXG4gICAgICAgICAgICAvLy5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlwiKS5nZm9ybXRleHQoZHRvLnBzYywgXCJib2xkXCIpXHJcbiAgICAgICAgICAgIC8vLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiXCIpLmdmb3JtdGV4dChkdG8uYWRyZXNhMywgXCJib2xkXCIpO1xyXG5cclxuXHJcbiAgICAgICAgLy9jdXJyZW50RWxlbWVudC5yZXNpemUoKS5maW5kKFwiLmdmb3JtLXNlY3Rpb25cIikuY2hpbGRyZW4oXCJsYWJlbFwiKS5maXJzdCgpLmFkZENsYXNzKFwiZy1zdGF0ZS10ZXh0IGctc3RhdGUtYWN0aXZlXCIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbkdvcmRpYy5QcmV2aWV3cy5yZWdpc3RlcihcImFkYTpBa2NlVlBcIiwge1xyXG5cclxuICAgIC8vIE92xJvFmW92w6Fuw60sIHpkYSBqZSDFmcOhZGVrIGtvbXBsZXRuw61cclxuICAgIGNhblJlbmRlcjogZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBkdG8uY2lzbG8gIT0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gU2Ftb3Ruw6kgdnlrcmVzbGVuw60gbsOhaGxlZHVcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKGRpdiwgZHRvKSB7XHJcblxyXG4gICAgICAgIHZhciBkYXRhdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1ZlcHNwbGFTdW1hRHRvW10gPSBbXTtcclxuICAgICAgICBkYXRhdCA9IGR0by5kYXRhO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnUHInLCBkYXRhdCk7XHJcblxyXG4gICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9ICQoZGl2KTtcclxuICAgICAgICBjdXJyZW50RWxlbWVudC5lbXB0eSgpO1xyXG5cclxuICAgICAgICAvLy8vIHpvYnJhemVuw60gcG9tb2PDrSBndGFibGVcclxuICAgICAgICAvL2N1cnJlbnRFbGVtZW50LmFwcGVuZFRvKGN1cnJlbnRFbGVtZW50KS5ndGFibGUoe1xyXG4gICAgICAgIC8vICAgIGRhdGE6IGRhdGF0LCAgICAgICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAvLyAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJyb2tfdnBcIiwgY2FwdGlvbjogXCJSb2tcIiwgZGVzY3JpcHRpb246IFwiUm9rXCJcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiY19wbGFuXCIsIGNhcHRpb246IFwixIzDoXN0a2EgVlBcIiwgZGVzY3JpcHRpb246IFwixIzDoXN0a2EgVlBcIiwgYWxpZ246IFwicmlnaHRcIlxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjX2ZpblwiLCBjYXB0aW9uOiBcIsSMw6FzdGthIEZJTlwiLCBkZXNjcmlwdGlvbjogXCLEjMOhc3RrYSBGSU5cIiwgYWxpZ246IFwicmlnaHRcIlxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjX3JvemRpbFwiLCBjYXB0aW9uOiBcIlJvemTDrWxcIiwgZGVzY3JpcHRpb246IFwiUm96ZMOtbFwiLCBhbGlnbjogXCJyaWdodFwiXHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgLy8gem9icmF6ZW7DrSBwb21vY8OtIEtQSVxyXG4gICAgICAgIHZhciByZXN1bHQ6IGFueVtdID0gW107XHJcbiAgICAgICAgdmFyIGNlbGtlbV9jYXN0a2FfdnAgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICB2YXIgY2Vsa2VtX2Nhc3RrYV9maW4gPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICB2YXIgY2Vsa2VtX2Nhc3RrYV9yb3pkaWwgPSBuZXcgRGVjaW1hbCgwKTtcclxuXHJcbiAgICAgICAgZGF0YXQuZm9yRWFjaCgocikgPT4ge1xyXG4gICAgICAgICAgICBjZWxrZW1fY2FzdGthX3ZwID0gcGFyc2VEZWNpbWFsKGNlbGtlbV9jYXN0a2FfdnApLnBsdXMocGFyc2VEZWNpbWFsKHIuY19wbGFuISkpO1xyXG4gICAgICAgICAgICBjZWxrZW1fY2FzdGthX2ZpbiA9IHBhcnNlRGVjaW1hbChjZWxrZW1fY2FzdGthX2ZpbikucGx1cyhwYXJzZURlY2ltYWwoci5jX2ZpbiEpKTtcclxuICAgICAgICAgICAgY2Vsa2VtX2Nhc3RrYV9yb3pkaWwgPSBwYXJzZURlY2ltYWwoY2Vsa2VtX2Nhc3RrYV9yb3pkaWwpLnBsdXMocGFyc2VEZWNpbWFsKHIuY19yb3pkaWwhKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgIG5hbWU6IFwia3Bpcm96XCIgKyBcIkNFTEtFTVwiLCB0aXRsZTogXCJDRUxLRU1cIiwgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG5cclxuICAgICAgICAgICAgZGV0YWlsczpcclxuICAgICAgICAgICAgICAgIFt7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiPGI+xIzDoXN0a2EgVlA8L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNlbGtlbV9jYXN0a2FfdnAsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCLEjMOhc3RrYSBWUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdW5pdDogXCJLxI1cIixcclxuICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCI8Yj7EjMOhc3RrYSBGSU48L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNlbGtlbV9jYXN0a2FfZmluLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwixIzDoXN0a2EgRklOXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIkNcIixcclxuICAgICAgICAgICAgICAgICAgICB1bml0OiBcIkvEjVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIjxiPlJvemTDrWw8L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNlbGtlbV9jYXN0a2Ffcm96ZGlsLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUm96ZMOtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdW5pdDogXCJLxI1cIixcclxuICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiAocGFyc2VEZWNpbWFsKGNlbGtlbV9jYXN0a2Ffcm96ZGlsISkudG9OdW1iZXIoKSA9PSBuZXcgRGVjaW1hbCgwKS50b051bWJlcigpKSA/IFwicG9zaXRpdmVcIiA6IFwibmVnYXRpdmVcIixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICB9KSk7XHJcblxyXG5cclxuICAgICAgICBkYXRhdC5mb3JFYWNoKChyKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImtwaXJvelwiICsgci5yb2tfdnAsIHRpdGxlOiByLnJva192cCwgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGRldGFpbHM6XHJcbiAgICAgICAgICAgICAgICAgICAgW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiPGI+xIzDoXN0a2EgVlA8L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByLmNfcGxhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCLEjMOhc3RrYSBWUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBcIkvEjVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCI8Yj7EjMOhc3RrYSBGSU48L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByLmNfZmluLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIsSMw6FzdGthIEZJTlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBcIkvEjVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcIm5vcm1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCI8Yj5Sb3pkw61sPC9iPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogci5jX3JvemRpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJSb3pkw61sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiS8SNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IChwYXJzZURlY2ltYWwoci5jX3JvemRpbCEpLnRvTnVtYmVyKCkgPT0gbmV3IERlY2ltYWwoMCkudG9OdW1iZXIoKSkgPyBcInBvc2l0aXZlXCIgOiBcIm5lZ2F0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKGN1cnJlbnRFbGVtZW50KS5na3BpcGFuZWwoe1xyXG4gICAgICAgICAgICBkaXNwbGF5TW9kZTogXCJwYW5lbFwiLFxyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHQsXHJcbiAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgIHdpZHRoOiAyNDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=