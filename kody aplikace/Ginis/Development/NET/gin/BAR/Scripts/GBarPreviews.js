"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Bar.WebClient.Previews.ts                                                        </Name>
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
        //var rightSbKpiCerpani: GObservableObject<GKpiItemOptions>;
        //var rightSbKpiRezervace: GObservableObject<GKpiItemOptions>;
        //var currentElement = $(div);
        ////data jsou ready -> samotné vytvoření náhledu
        ////currentElement.empty().append("<h3 class='g-state-text g-state-active' style='margin: 0.5rem;'>Akce '" + dto.nazev + "'</h3><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        //currentElement.empty().append("<h3 class='g-state-text g-state-active' style='margin: 0.5rem;'>" + dto.nazev + "</h3><hr style='margin: 0.5rem; opacity: 0.2;'/>");
        //if (this.rightSbKpiCerpani == null) { //pokud ještě nebylo vytvořeno kpi, vytvořit obálku pro kpi, zatím bez dat
        //    this.rightSbKpiCerpani = new GObservableObject<GKpiItemOptions>({
        //        chartType: "liquid",
        //        value: 0,
        //        title: "Stav čerpání",
        //        text: "Stav čerpání v %",
        //        //width: 260,
        //        //height: 60,
        //        unit: "%",
        //        actionOnTitle: false,
        //        action: new GAction({
        //            name: "selectBtn",
        //            caption: 'Vybrat',
        //            run: function (ev, ctx) {
        //                // cnt.dialogs.alert("Klikl jste na KPI.");
        //            }
        //        })
        //    });
        //}
        //this.rightSbKpiCerpani.fixedWidth = true;
        //this.rightSbKpiCerpani.size = "small";
        //this.rightSbKpiCerpani.textAlign = "center";
        //if (this.rightSbKpiRezervace == null) { //pokud ještě nebylo vytvořeno kpi, vytvořit obálku pro kpi, zatím bez dat
        //    this.rightSbKpiRezervace = new GObservableObject<GKpiItemOptions>({
        //        chartType: "liquid",
        //        value: 0,
        //        title: "Stav rezervace",
        //        text: "Stav rezervace v %",
        //        //width: 260,
        //        //height: 60,
        //        unit: "%",
        //        actionOnTitle: false,
        //        action: new GAction({
        //            name: "selectBtn",
        //            caption: 'Vybrat',
        //            run: function (ev, ctx) {
        //                // cnt.dialogs.alert("Klikl jste na KPI.");
        //            }
        //        })
        //    });
        //}
        //this.rightSbKpiRezervace.fixedWidth = true;
        //this.rightSbKpiRezervace.size = "small";
        //this.rightSbKpiRezervace.textAlign = "center";
        //var del_cislo: Decimal;
        //var akt_cislo_cer: Decimal;
        //var akt_cislo_rez: Decimal;
        //del_cislo = parseDecimal(dto.c_2!).plus(parseDecimal(dto.c_3!));
        //akt_cislo_cer = new Decimal(0);
        //akt_cislo_rez = new Decimal(0);
        //if (del_cislo.cmp(0) == 0 ) {
        //    // akt_cislo_cer = new Decimal(0);
        //    // akt_cislo_rez = new Decimal(0);
        //    akt_cislo_cer = (parseDecimal(dto.c_0!).div((parseDecimal(dto.c_2!).plus(parseDecimal(dto.c_3!)))));
        //    akt_cislo_rez = (parseDecimal(dto.c_6!).plus(parseDecimal(dto.c_18!))).div((parseDecimal(dto.c_2!).plus(parseDecimal(dto.c_3!))));
        //}
        //else {
        //    akt_cislo_cer = (parseDecimal(dto.c_0!).div((parseDecimal(dto.c_2!).plus(parseDecimal(dto.c_3!)))));
        //    akt_cislo_rez = (parseDecimal(dto.c_6!).plus(parseDecimal(dto.c_18!))).div((parseDecimal(dto.c_2!).plus(parseDecimal(dto.c_3!))));
        //}
        //var liquidKpiDataCer: Decimal;
        //var liquidKpiDataRez: Decimal;
        ////var liquidKpiData = 100 * (Math.round(akt_cislo * 1000) / 1000);
        //liquidKpiDataCer = (Decimal.round(akt_cislo_cer.times(10000))).div(100);
        //liquidKpiDataRez = (Decimal.round(akt_cislo_rez.times(10000))).div(100);
        ////aktualizace kpi
        //if ((isNaN(liquidKpiDataCer.toNumber()) == true) || (isFinite(liquidKpiDataCer.toNumber()) == false)) {
        //    //this.rightSbKpiCerpani.visible = false;
        //    this.rightSbKpiCerpani.chartType = "valueCard";
        //    this.rightSbKpiCerpani.text = "";
        //    //this.rightSbKpiCerpani.value = "";
        //    this.rightSbKpiCerpani.data = { value: "***" };
        //    this.rightSbKpiCerpani.unit = "";
        //}
        //else {
        //    //this.rightSbKpiCerpani.visible = true;
        //    this.rightSbKpiCerpani.chartType = "liquid";
        //    this.rightSbKpiCerpani.data = parseDecimal(liquidKpiDataCer).toNumber();
        //    this.rightSbKpiCerpani.value = parseDecimal(liquidKpiDataCer).toNumber();
        //    this.rightSbKpiCerpani.unit = "%";
        //}
        //if ((isNaN(liquidKpiDataRez.toNumber()) == true) || (isFinite(liquidKpiDataRez.toNumber()) == false)) {
        //    //this.rightSbKpiRezervace.visible = false;
        //    this.rightSbKpiRezervace.chartType = "valueCard";
        //    this.rightSbKpiRezervace.text = "";
        //    //this.rightSbKpiRezervace.value = "";
        //    this.rightSbKpiRezervace.data = { value: "***" };
        //    this.rightSbKpiRezervace.unit = "";
        //}
        //else {
        //    //this.rightSbKpiRezervace.visible = true;
        //    this.rightSbKpiRezervace.chartType = "liquid";
        //    this.rightSbKpiRezervace.data = parseDecimal(liquidKpiDataRez).toNumber();
        //    this.rightSbKpiRezervace.value = parseDecimal(liquidKpiDataRez).toNumber();
        //    this.rightSbKpiRezervace.unit = "%";
        //}
        //this.rightSbKpiCerpani.update();
        //this.rightSbKpiRezervace.update();
        ////naplnění KPI do panelu
        //var Kpi_nastaveni: GKpiItemOptions[] = new Array();
        //Kpi_nastaveni.push(this.rightSbKpiRezervace);
        //Kpi_nastaveni.push(this.rightSbKpiCerpani);
        //$("<div>").appendTo(currentElement).gkpipanel({
        //    displayMode: "panel",
        //    data: Kpi_nastaveni
        //}); 
        ////Gordic.Previews.displayLinkButton(div, dto);
        //$("<div class='gform--view-mode'>").appendTo(currentElement)
        //    .gform("setup", { layoutDescriptor: "L1M1S1, breaks-300-400" })
        //    .gformsection("create", "Základní údaje")
        //    .gformrow("addFieldsRow", "Zpracovatel").gformtext(dto.ixs_fun_akt_nazev_ref, "bold")
        //    .gformrow("addFieldsRow", "ČPP").gformtext(dto.nks, "bold")
        //    .gformrow("addFieldsRow", "Název ČPP").gformtext(dto.nazev_nks, "bold")
        //    //.gformrow("addFieldsRow", "NS").gformtext(dto.nks, "bold")
        //    //.gformrow("addFieldsRow", "Název NS").gformtext(dto.nazev_nks, "bold")
        //    .gformsection("create", " ")
        //    .gformrow("addFieldsRow", "Financování").gformtext(((dto.fin_od != null) ? dto.fin_od : "..." ) + " - " + ((dto.fin_do != null) ? dto.fin_do : "..." ), "bold")
        //    .gformrow("addFieldsRow", "Realizace").gformtext(((dto.real_od != null) ? dto.real_od : "..." ) + " - " + ((dto.real_do != null) ? dto.real_do : "..." ), "bold")
        //    .gformsection("create", "Adresa")
        //    .gformrow("addFieldsRow", "").gformtext(dto.adresa1, "bold")
        //    .gformrow("addFieldsRow", "").gformtext(dto.adresa2, "bold")
        //    .gformrow("addFieldsRow", "").gformtext(dto.psc, "bold")
        //    .gformrow("addFieldsRow", "").gformtext(dto.adresa3, "bold");
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0JhclByZXZpZXdzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dCYXJQcmV2aWV3cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTtBQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtJQUVqQyxvQ0FBb0M7SUFDcEMsU0FBUyxFQUFFLFVBQVUsR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXZELDZCQUE2QjtJQUM3QixNQUFNLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztRQUV0Qiw0REFBNEQ7UUFDNUQsOERBQThEO1FBRTlELDhCQUE4QjtRQUM5QixnREFBZ0Q7UUFDaEQsOEtBQThLO1FBQzlLLHFLQUFxSztRQUVySyxrSEFBa0g7UUFDbEgsdUVBQXVFO1FBQ3ZFLDhCQUE4QjtRQUM5QixtQkFBbUI7UUFDbkIsZ0NBQWdDO1FBQ2hDLG1DQUFtQztRQUNuQyx1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLG9CQUFvQjtRQUNwQiwrQkFBK0I7UUFDL0IsK0JBQStCO1FBQy9CLGdDQUFnQztRQUNoQyxnQ0FBZ0M7UUFDaEMsdUNBQXVDO1FBQ3ZDLDZEQUE2RDtRQUM3RCxlQUFlO1FBQ2YsWUFBWTtRQUNaLFNBQVM7UUFDVCxHQUFHO1FBRUgsMkNBQTJDO1FBQzNDLHdDQUF3QztRQUN4Qyw4Q0FBOEM7UUFFOUMsb0hBQW9IO1FBQ3BILHlFQUF5RTtRQUN6RSw4QkFBOEI7UUFDOUIsbUJBQW1CO1FBQ25CLGtDQUFrQztRQUNsQyxxQ0FBcUM7UUFDckMsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2QixvQkFBb0I7UUFDcEIsK0JBQStCO1FBQy9CLCtCQUErQjtRQUMvQixnQ0FBZ0M7UUFDaEMsZ0NBQWdDO1FBQ2hDLHVDQUF1QztRQUN2Qyw2REFBNkQ7UUFDN0QsZUFBZTtRQUNmLFlBQVk7UUFDWixTQUFTO1FBQ1QsR0FBRztRQUVILDZDQUE2QztRQUM3QywwQ0FBMEM7UUFDMUMsZ0RBQWdEO1FBRWhELHlCQUF5QjtRQUN6Qiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBRTdCLGtFQUFrRTtRQUNsRSxpQ0FBaUM7UUFDakMsaUNBQWlDO1FBRWpDLCtCQUErQjtRQUMvQix3Q0FBd0M7UUFDeEMsd0NBQXdDO1FBQ3hDLDBHQUEwRztRQUMxRyx3SUFBd0k7UUFDeEksR0FBRztRQUNILFFBQVE7UUFDUiwwR0FBMEc7UUFDMUcsd0lBQXdJO1FBQ3hJLEdBQUc7UUFFSCxnQ0FBZ0M7UUFDaEMsZ0NBQWdDO1FBRWhDLG9FQUFvRTtRQUNwRSwwRUFBMEU7UUFDMUUsMEVBQTBFO1FBRTFFLG1CQUFtQjtRQUNuQix5R0FBeUc7UUFDekcsK0NBQStDO1FBQy9DLHFEQUFxRDtRQUNyRCx1Q0FBdUM7UUFDdkMsMENBQTBDO1FBQzFDLHFEQUFxRDtRQUNyRCx1Q0FBdUM7UUFDdkMsR0FBRztRQUNILFFBQVE7UUFDUiw4Q0FBOEM7UUFDOUMsa0RBQWtEO1FBQ2xELDhFQUE4RTtRQUM5RSwrRUFBK0U7UUFDL0Usd0NBQXdDO1FBQ3hDLEdBQUc7UUFFSCx5R0FBeUc7UUFDekcsaURBQWlEO1FBQ2pELHVEQUF1RDtRQUN2RCx5Q0FBeUM7UUFDekMsNENBQTRDO1FBQzVDLHVEQUF1RDtRQUN2RCx5Q0FBeUM7UUFDekMsR0FBRztRQUNILFFBQVE7UUFDUixnREFBZ0Q7UUFDaEQsb0RBQW9EO1FBQ3BELGdGQUFnRjtRQUNoRixpRkFBaUY7UUFDakYsMENBQTBDO1FBQzFDLEdBQUc7UUFFSCxrQ0FBa0M7UUFDbEMsb0NBQW9DO1FBRXBDLDBCQUEwQjtRQUMxQixxREFBcUQ7UUFFckQsK0NBQStDO1FBQy9DLDZDQUE2QztRQUU3QyxpREFBaUQ7UUFDakQsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QixNQUFNO1FBR04sZ0RBQWdEO1FBQ2hELDhEQUE4RDtRQUM5RCxxRUFBcUU7UUFDckUsK0NBQStDO1FBQy9DLDJGQUEyRjtRQUMzRixpRUFBaUU7UUFDakUsNkVBQTZFO1FBQzdFLGtFQUFrRTtRQUNsRSw4RUFBOEU7UUFDOUUsa0NBQWtDO1FBQ2xDLHFLQUFxSztRQUNySyx1S0FBdUs7UUFDdkssdUNBQXVDO1FBQ3ZDLGtFQUFrRTtRQUNsRSxrRUFBa0U7UUFDbEUsOERBQThEO1FBQzlELG1FQUFtRTtJQUd2RSxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CYXIuV2ViQ2xpZW50LlByZXZpZXdzLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gUHJldmlld3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuR29yZGljLlByZXZpZXdzLnJlZ2lzdGVyKFwiYWRhOkFrY2VcIiwge1xyXG5cclxuICAgIC8vIE92xJvFmW92w6Fuw60sIHpkYSBqZSDFmcOhZGVrIGtvbXBsZXRuw61cclxuICAgIGNhblJlbmRlcjogZnVuY3Rpb24gKGR0bykgeyByZXR1cm4gZHRvLmNpc2xvICE9IG51bGw7IH0sXHJcblxyXG4gICAgLy8gU2Ftb3Ruw6kgdnlrcmVzbGVuw60gbsOhaGxlZHVcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKGRpdiwgZHRvKSB7XHJcblxyXG4gICAgICAgIC8vdmFyIHJpZ2h0U2JLcGlDZXJwYW5pOiBHT2JzZXJ2YWJsZU9iamVjdDxHS3BpSXRlbU9wdGlvbnM+O1xyXG4gICAgICAgIC8vdmFyIHJpZ2h0U2JLcGlSZXplcnZhY2U6IEdPYnNlcnZhYmxlT2JqZWN0PEdLcGlJdGVtT3B0aW9ucz47XHJcblxyXG4gICAgICAgIC8vdmFyIGN1cnJlbnRFbGVtZW50ID0gJChkaXYpO1xyXG4gICAgICAgIC8vLy9kYXRhIGpzb3UgcmVhZHkgLT4gc2Ftb3Ruw6kgdnl0dm/FmWVuw60gbsOhaGxlZHVcclxuICAgICAgICAvLy8vY3VycmVudEVsZW1lbnQuZW1wdHkoKS5hcHBlbmQoXCI8aDMgY2xhc3M9J2ctc3RhdGUtdGV4dCBnLXN0YXRlLWFjdGl2ZScgc3R5bGU9J21hcmdpbjogMC41cmVtOyc+QWtjZSAnXCIgKyBkdG8ubmF6ZXYgKyBcIic8L2gzPjxociBzdHlsZT0nbWFyZ2luOiAwLjVyZW07IG9wYWNpdHk6IDAuMjsnLz5cIik7XHJcbiAgICAgICAgLy9jdXJyZW50RWxlbWVudC5lbXB0eSgpLmFwcGVuZChcIjxoMyBjbGFzcz0nZy1zdGF0ZS10ZXh0IGctc3RhdGUtYWN0aXZlJyBzdHlsZT0nbWFyZ2luOiAwLjVyZW07Jz5cIiArIGR0by5uYXpldiArIFwiPC9oMz48aHIgc3R5bGU9J21hcmdpbjogMC41cmVtOyBvcGFjaXR5OiAwLjI7Jy8+XCIpO1xyXG5cclxuICAgICAgICAvL2lmICh0aGlzLnJpZ2h0U2JLcGlDZXJwYW5pID09IG51bGwpIHsgLy9wb2t1ZCBqZcWhdMSbIG5lYnlsbyB2eXR2b8WZZW5vIGtwaSwgdnl0dm/FmWl0IG9iw6Fsa3UgcHJvIGtwaSwgemF0w61tIGJleiBkYXRcclxuICAgICAgICAvLyAgICB0aGlzLnJpZ2h0U2JLcGlDZXJwYW5pID0gbmV3IEdPYnNlcnZhYmxlT2JqZWN0PEdLcGlJdGVtT3B0aW9ucz4oe1xyXG4gICAgICAgIC8vICAgICAgICBjaGFydFR5cGU6IFwibGlxdWlkXCIsXHJcbiAgICAgICAgLy8gICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgIC8vICAgICAgICB0aXRsZTogXCJTdGF2IMSNZXJww6Fuw61cIixcclxuICAgICAgICAvLyAgICAgICAgdGV4dDogXCJTdGF2IMSNZXJww6Fuw60gdiAlXCIsXHJcbiAgICAgICAgLy8gICAgICAgIC8vd2lkdGg6IDI2MCxcclxuICAgICAgICAvLyAgICAgICAgLy9oZWlnaHQ6IDYwLFxyXG4gICAgICAgIC8vICAgICAgICB1bml0OiBcIiVcIixcclxuICAgICAgICAvLyAgICAgICAgYWN0aW9uT25UaXRsZTogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJzZWxlY3RCdG5cIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246ICdWeWJyYXQnLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIGNudC5kaWFsb2dzLmFsZXJ0KFwiS2xpa2wganN0ZSBuYSBLUEkuXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3RoaXMucmlnaHRTYktwaUNlcnBhbmkuZml4ZWRXaWR0aCA9IHRydWU7XHJcbiAgICAgICAgLy90aGlzLnJpZ2h0U2JLcGlDZXJwYW5pLnNpemUgPSBcInNtYWxsXCI7XHJcbiAgICAgICAgLy90aGlzLnJpZ2h0U2JLcGlDZXJwYW5pLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcblxyXG4gICAgICAgIC8vaWYgKHRoaXMucmlnaHRTYktwaVJlemVydmFjZSA9PSBudWxsKSB7IC8vcG9rdWQgamXFoXTEmyBuZWJ5bG8gdnl0dm/FmWVubyBrcGksIHZ5dHZvxZlpdCBvYsOhbGt1IHBybyBrcGksIHphdMOtbSBiZXogZGF0XHJcbiAgICAgICAgLy8gICAgdGhpcy5yaWdodFNiS3BpUmV6ZXJ2YWNlID0gbmV3IEdPYnNlcnZhYmxlT2JqZWN0PEdLcGlJdGVtT3B0aW9ucz4oe1xyXG4gICAgICAgIC8vICAgICAgICBjaGFydFR5cGU6IFwibGlxdWlkXCIsXHJcbiAgICAgICAgLy8gICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgIC8vICAgICAgICB0aXRsZTogXCJTdGF2IHJlemVydmFjZVwiLFxyXG4gICAgICAgIC8vICAgICAgICB0ZXh0OiBcIlN0YXYgcmV6ZXJ2YWNlIHYgJVwiLFxyXG4gICAgICAgIC8vICAgICAgICAvL3dpZHRoOiAyNjAsXHJcbiAgICAgICAgLy8gICAgICAgIC8vaGVpZ2h0OiA2MCxcclxuICAgICAgICAvLyAgICAgICAgdW5pdDogXCIlXCIsXHJcbiAgICAgICAgLy8gICAgICAgIGFjdGlvbk9uVGl0bGU6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwic2VsZWN0QnRuXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBjYXB0aW9uOiAnVnlicmF0JyxcclxuICAgICAgICAvLyAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBjbnQuZGlhbG9ncy5hbGVydChcIktsaWtsIGpzdGUgbmEgS1BJLlwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy90aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UuZml4ZWRXaWR0aCA9IHRydWU7XHJcbiAgICAgICAgLy90aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2Uuc2l6ZSA9IFwic21hbGxcIjtcclxuICAgICAgICAvL3RoaXMucmlnaHRTYktwaVJlemVydmFjZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cclxuICAgICAgICAvL3ZhciBkZWxfY2lzbG86IERlY2ltYWw7XHJcbiAgICAgICAgLy92YXIgYWt0X2Npc2xvX2NlcjogRGVjaW1hbDtcclxuICAgICAgICAvL3ZhciBha3RfY2lzbG9fcmV6OiBEZWNpbWFsO1xyXG5cclxuICAgICAgICAvL2RlbF9jaXNsbyA9IHBhcnNlRGVjaW1hbChkdG8uY18yISkucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMyEpKTtcclxuICAgICAgICAvL2FrdF9jaXNsb19jZXIgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAvL2FrdF9jaXNsb19yZXogPSBuZXcgRGVjaW1hbCgwKTtcclxuXHJcbiAgICAgICAgLy9pZiAoZGVsX2Npc2xvLmNtcCgwKSA9PSAwICkge1xyXG4gICAgICAgIC8vICAgIC8vIGFrdF9jaXNsb19jZXIgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAvLyAgICAvLyBha3RfY2lzbG9fcmV6ID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgLy8gICAgYWt0X2Npc2xvX2NlciA9IChwYXJzZURlY2ltYWwoZHRvLmNfMCEpLmRpdigocGFyc2VEZWNpbWFsKGR0by5jXzIhKS5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY18zISkpKSkpO1xyXG4gICAgICAgIC8vICAgIGFrdF9jaXNsb19yZXogPSAocGFyc2VEZWNpbWFsKGR0by5jXzYhKS5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY18xOCEpKSkuZGl2KChwYXJzZURlY2ltYWwoZHRvLmNfMiEpLnBsdXMocGFyc2VEZWNpbWFsKGR0by5jXzMhKSkpKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgIC8vICAgIGFrdF9jaXNsb19jZXIgPSAocGFyc2VEZWNpbWFsKGR0by5jXzAhKS5kaXYoKHBhcnNlRGVjaW1hbChkdG8uY18yISkucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMyEpKSkpKTtcclxuICAgICAgICAvLyAgICBha3RfY2lzbG9fcmV6ID0gKHBhcnNlRGVjaW1hbChkdG8uY182ISkucGx1cyhwYXJzZURlY2ltYWwoZHRvLmNfMTghKSkpLmRpdigocGFyc2VEZWNpbWFsKGR0by5jXzIhKS5wbHVzKHBhcnNlRGVjaW1hbChkdG8uY18zISkpKSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vdmFyIGxpcXVpZEtwaURhdGFDZXI6IERlY2ltYWw7XHJcbiAgICAgICAgLy92YXIgbGlxdWlkS3BpRGF0YVJlejogRGVjaW1hbDtcclxuXHJcbiAgICAgICAgLy8vL3ZhciBsaXF1aWRLcGlEYXRhID0gMTAwICogKE1hdGgucm91bmQoYWt0X2Npc2xvICogMTAwMCkgLyAxMDAwKTtcclxuICAgICAgICAvL2xpcXVpZEtwaURhdGFDZXIgPSAoRGVjaW1hbC5yb3VuZChha3RfY2lzbG9fY2VyLnRpbWVzKDEwMDAwKSkpLmRpdigxMDApO1xyXG4gICAgICAgIC8vbGlxdWlkS3BpRGF0YVJleiA9IChEZWNpbWFsLnJvdW5kKGFrdF9jaXNsb19yZXoudGltZXMoMTAwMDApKSkuZGl2KDEwMCk7XHJcblxyXG4gICAgICAgIC8vLy9ha3R1YWxpemFjZSBrcGlcclxuICAgICAgICAvL2lmICgoaXNOYU4obGlxdWlkS3BpRGF0YUNlci50b051bWJlcigpKSA9PSB0cnVlKSB8fCAoaXNGaW5pdGUobGlxdWlkS3BpRGF0YUNlci50b051bWJlcigpKSA9PSBmYWxzZSkpIHtcclxuICAgICAgICAvLyAgICAvL3RoaXMucmlnaHRTYktwaUNlcnBhbmkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgIHRoaXMucmlnaHRTYktwaUNlcnBhbmkuY2hhcnRUeXBlID0gXCJ2YWx1ZUNhcmRcIjtcclxuICAgICAgICAvLyAgICB0aGlzLnJpZ2h0U2JLcGlDZXJwYW5pLnRleHQgPSBcIlwiO1xyXG4gICAgICAgIC8vICAgIC8vdGhpcy5yaWdodFNiS3BpQ2VycGFuaS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yaWdodFNiS3BpQ2VycGFuaS5kYXRhID0geyB2YWx1ZTogXCIqKipcIiB9O1xyXG4gICAgICAgIC8vICAgIHRoaXMucmlnaHRTYktwaUNlcnBhbmkudW5pdCA9IFwiXCI7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9lbHNlIHtcclxuICAgICAgICAvLyAgICAvL3RoaXMucmlnaHRTYktwaUNlcnBhbmkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yaWdodFNiS3BpQ2VycGFuaS5jaGFydFR5cGUgPSBcImxpcXVpZFwiO1xyXG4gICAgICAgIC8vICAgIHRoaXMucmlnaHRTYktwaUNlcnBhbmkuZGF0YSA9IHBhcnNlRGVjaW1hbChsaXF1aWRLcGlEYXRhQ2VyKS50b051bWJlcigpO1xyXG4gICAgICAgIC8vICAgIHRoaXMucmlnaHRTYktwaUNlcnBhbmkudmFsdWUgPSBwYXJzZURlY2ltYWwobGlxdWlkS3BpRGF0YUNlcikudG9OdW1iZXIoKTtcclxuICAgICAgICAvLyAgICB0aGlzLnJpZ2h0U2JLcGlDZXJwYW5pLnVuaXQgPSBcIiVcIjtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy9pZiAoKGlzTmFOKGxpcXVpZEtwaURhdGFSZXoudG9OdW1iZXIoKSkgPT0gdHJ1ZSkgfHwgKGlzRmluaXRlKGxpcXVpZEtwaURhdGFSZXoudG9OdW1iZXIoKSkgPT0gZmFsc2UpKSB7XHJcbiAgICAgICAgLy8gICAgLy90aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgIHRoaXMucmlnaHRTYktwaVJlemVydmFjZS5jaGFydFR5cGUgPSBcInZhbHVlQ2FyZFwiO1xyXG4gICAgICAgIC8vICAgIHRoaXMucmlnaHRTYktwaVJlemVydmFjZS50ZXh0ID0gXCJcIjtcclxuICAgICAgICAvLyAgICAvL3RoaXMucmlnaHRTYktwaVJlemVydmFjZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yaWdodFNiS3BpUmV6ZXJ2YWNlLmRhdGEgPSB7IHZhbHVlOiBcIioqKlwiIH07XHJcbiAgICAgICAgLy8gICAgdGhpcy5yaWdodFNiS3BpUmV6ZXJ2YWNlLnVuaXQgPSBcIlwiO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgLy8gICAgLy90aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yaWdodFNiS3BpUmV6ZXJ2YWNlLmNoYXJ0VHlwZSA9IFwibGlxdWlkXCI7XHJcbiAgICAgICAgLy8gICAgdGhpcy5yaWdodFNiS3BpUmV6ZXJ2YWNlLmRhdGEgPSBwYXJzZURlY2ltYWwobGlxdWlkS3BpRGF0YVJleikudG9OdW1iZXIoKTtcclxuICAgICAgICAvLyAgICB0aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UudmFsdWUgPSBwYXJzZURlY2ltYWwobGlxdWlkS3BpRGF0YVJleikudG9OdW1iZXIoKTtcclxuICAgICAgICAvLyAgICB0aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UudW5pdCA9IFwiJVwiO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3RoaXMucmlnaHRTYktwaUNlcnBhbmkudXBkYXRlKCk7XHJcbiAgICAgICAgLy90aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIC8vLy9uYXBsbsSbbsOtIEtQSSBkbyBwYW5lbHVcclxuICAgICAgICAvL3ZhciBLcGlfbmFzdGF2ZW5pOiBHS3BpSXRlbU9wdGlvbnNbXSA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICAvL0twaV9uYXN0YXZlbmkucHVzaCh0aGlzLnJpZ2h0U2JLcGlSZXplcnZhY2UpO1xyXG4gICAgICAgIC8vS3BpX25hc3RhdmVuaS5wdXNoKHRoaXMucmlnaHRTYktwaUNlcnBhbmkpO1xyXG5cclxuICAgICAgICAvLyQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhjdXJyZW50RWxlbWVudCkuZ2twaXBhbmVsKHtcclxuICAgICAgICAvLyAgICBkaXNwbGF5TW9kZTogXCJwYW5lbFwiLFxyXG4gICAgICAgIC8vICAgIGRhdGE6IEtwaV9uYXN0YXZlbmlcclxuICAgICAgICAvL30pOyBcclxuXHJcblxyXG4gICAgICAgIC8vLy9Hb3JkaWMuUHJldmlld3MuZGlzcGxheUxpbmtCdXR0b24oZGl2LCBkdG8pO1xyXG4gICAgICAgIC8vJChcIjxkaXYgY2xhc3M9J2dmb3JtLS12aWV3LW1vZGUnPlwiKS5hcHBlbmRUbyhjdXJyZW50RWxlbWVudClcclxuICAgICAgICAvLyAgICAuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBicmVha3MtMzAwLTQwMFwiIH0pXHJcbiAgICAgICAgLy8gICAgLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIlrDoWtsYWRuw60gw7pkYWplXCIpXHJcbiAgICAgICAgLy8gICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiWnByYWNvdmF0ZWxcIikuZ2Zvcm10ZXh0KGR0by5peHNfZnVuX2FrdF9uYXpldl9yZWYsIFwiYm9sZFwiKVxyXG4gICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIsSMUFBcIikuZ2Zvcm10ZXh0KGR0by5ua3MsIFwiYm9sZFwiKVxyXG4gICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIk7DoXpldiDEjFBQXCIpLmdmb3JtdGV4dChkdG8ubmF6ZXZfbmtzLCBcImJvbGRcIilcclxuICAgICAgICAvLyAgICAvLy5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIk5TXCIpLmdmb3JtdGV4dChkdG8ubmtzLCBcImJvbGRcIilcclxuICAgICAgICAvLyAgICAvLy5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIk7DoXpldiBOU1wiKS5nZm9ybXRleHQoZHRvLm5hemV2X25rcywgXCJib2xkXCIpXHJcbiAgICAgICAgLy8gICAgLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIiBcIilcclxuICAgICAgICAvLyAgICAuZ2Zvcm1yb3coXCJhZGRGaWVsZHNSb3dcIiwgXCJGaW5hbmNvdsOhbsOtXCIpLmdmb3JtdGV4dCgoKGR0by5maW5fb2QgIT0gbnVsbCkgPyBkdG8uZmluX29kIDogXCIuLi5cIiApICsgXCIgLSBcIiArICgoZHRvLmZpbl9kbyAhPSBudWxsKSA/IGR0by5maW5fZG8gOiBcIi4uLlwiICksIFwiYm9sZFwiKVxyXG4gICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlJlYWxpemFjZVwiKS5nZm9ybXRleHQoKChkdG8ucmVhbF9vZCAhPSBudWxsKSA/IGR0by5yZWFsX29kIDogXCIuLi5cIiApICsgXCIgLSBcIiArICgoZHRvLnJlYWxfZG8gIT0gbnVsbCkgPyBkdG8ucmVhbF9kbyA6IFwiLi4uXCIgKSwgXCJib2xkXCIpXHJcbiAgICAgICAgLy8gICAgLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiLCBcIkFkcmVzYVwiKVxyXG4gICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlwiKS5nZm9ybXRleHQoZHRvLmFkcmVzYTEsIFwiYm9sZFwiKVxyXG4gICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlwiKS5nZm9ybXRleHQoZHRvLmFkcmVzYTIsIFwiYm9sZFwiKVxyXG4gICAgICAgIC8vICAgIC5nZm9ybXJvdyhcImFkZEZpZWxkc1Jvd1wiLCBcIlwiKS5nZm9ybXRleHQoZHRvLnBzYywgXCJib2xkXCIpXHJcbiAgICAgICAgLy8gICAgLmdmb3Jtcm93KFwiYWRkRmllbGRzUm93XCIsIFwiXCIpLmdmb3JtdGV4dChkdG8uYWRyZXNhMywgXCJib2xkXCIpO1xyXG5cclxuXHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=