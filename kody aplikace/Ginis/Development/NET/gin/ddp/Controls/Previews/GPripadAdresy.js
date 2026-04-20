"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadAdresy.ts                       </Name>
//    <Description> Preview pro adresy poplatníka                               </Description>
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
            // https://xwiki.gordic.cz/NET/guides/Náhled%20%28Souhrn%29%20k%20seznamu
            Gordic.Previews.register("ddp:GPripadAdresy", {
                canRender: (dto) => {
                    return dto.ixs_esu != null;
                },
                render: (div, dto) => {
                    var currentElement = $(div);
                    currentElement.empty();
                    var srv = new GContent("Gordic.Ddp.WebClient.GWebDdpContent");
                    var form = $("<div>").appendTo(currentElement);
                    //var grid = $("<div>").appendTo(currentElement);
                    const filter = {};
                    filter.ixs_esu = dto.ixs_esu;
                    srv.isl.PripadEsuAdresy.list((rq) => {
                        return {
                            filters: filter,
                        };
                    }).getData()
                        .done((data) => {
                        let formAdresy = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1", name: "adresyEsuForm" });
                        formAdresy.addSection();
                        if (dto.ixs_esu == '0000SE00000M') { //TODO: doplnit identifikátor "nulák" pro neurčenou ESU 
                            formAdresy.addRow().addText("Žádné dostupné adresy");
                        }
                        else {
                            for (let i = 0; i < data.length; i++) {
                                let typAdr = data[i].typ_adr;
                                //let adresa = data[i].esu_txt; //-zakomentováno, adresa by se měla dotahovat pomocí ST sloupců (=Řádků obálkové adresy)
                                let adresa = "";
                                let pocRadek = 0;
                                if (data[i].st1 != null) {
                                    adresa += `${data[i].st1} \n`;
                                    pocRadek++;
                                }
                                if (data[i].st2 != null) {
                                    adresa += `${data[i].st2} \n`;
                                    pocRadek++;
                                }
                                if (data[i].st3 != null) {
                                    adresa += `${data[i].st3} \n`;
                                    pocRadek++;
                                }
                                if (data[i].st4 != null) {
                                    adresa += `${data[i].st4} \n`;
                                    pocRadek++;
                                }
                                if (data[i].st5 != null) {
                                    adresa += `${data[i].st5} \n`;
                                    pocRadek++;
                                }
                                if (data[i].st6 != null) {
                                    adresa += `${data[i].st6} \n`;
                                    pocRadek++;
                                }
                                if (data[i].st7 != null) {
                                    adresa += `${data[i].st7} \n`;
                                    pocRadek++;
                                }
                                let nazev = "";
                                switch (typAdr) {
                                    case 0: {
                                        nazev = "Trvalá adresa";
                                        break;
                                    }
                                    case 10: {
                                        nazev = "Doručovací adresa";
                                        break;
                                    }
                                    case 20: {
                                        nazev = "Zaměstnavatel (adresa)";
                                        break;
                                    }
                                    case 30: {
                                        nazev = "Kontaktní adresa";
                                        break;
                                    }
                                    default: {
                                        nazev: "Jiná adresa";
                                        break;
                                    }
                                }
                                formAdresy.addRow(nazev);
                                //formAdresy.addField("gstringbox", { name: `adr${i}`, defaultValue: adresa, validators: [] });
                                formAdresy.addField("gstringbox", {
                                    name: `adr${i}`,
                                    defaultValue: adresa,
                                    rows: pocRadek,
                                    disabled: true,
                                });
                            }
                            //TODO: v tomto bodě se zamyslet, jak to má fungovat a zda je to vůbec potřeba...
                            if (formAdresy.form.sections == null || formAdresy.form.sections.length == 0 || formAdresy.form.sections[0].rows == null || formAdresy.form.sections[0].rows.length == 0) {
                                formAdresy.addRow().addText("Žádné dostupné adresy");
                            }
                        }
                        form.gform("createFrom", formAdresy); //.findFields().gfield("model", "apply", data);
                    });
                }
            });
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZEFkcmVzeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmlwYWRBZHJlc3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUVqQixJQUFVLE1BQU0sQ0E2RmY7QUE3RkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNkZuQjtJQTdGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNkY3QjtRQTdGb0IsV0FBQSxTQUFTO1lBQzFCLHlFQUF5RTtZQUN6RSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDMUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2YsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQztnQkFDL0IsQ0FBQztnQkFDRCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBRWpCLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUIsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUV2QixJQUFJLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO29CQUU5RCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUMvQyxpREFBaUQ7b0JBRWpELE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztvQkFDdkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO29CQUU3QixHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTt3QkFDaEMsT0FBTzs0QkFDSCxPQUFPLEVBQUUsTUFBTTt5QkFDbEIsQ0FBQTtvQkFDTCxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7eUJBQ1AsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBRVgsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQzt3QkFFOUYsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUV4QixJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksY0FBYyxFQUFFLENBQUMsQ0FBQyx3REFBd0Q7NEJBQ3pGLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzt3QkFDekQsQ0FBQzs2QkFBTSxDQUFDOzRCQUNKLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0NBQ25DLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0NBQzdCLHdIQUF3SDtnQ0FFeEgsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO2dDQUNoQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0NBQ2pCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7b0NBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQUMsQ0FBQztnQ0FDdkUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29DQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FBQyxDQUFDO2dDQUN2RSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO29DQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUFDLENBQUM7Z0NBQ3ZFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7b0NBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQUMsQ0FBQztnQ0FDdkUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29DQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FBQyxDQUFDO2dDQUN2RSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO29DQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUFDLENBQUM7Z0NBQ3ZFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7b0NBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQUMsQ0FBQztnQ0FFdkUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dDQUVmLFFBQVEsTUFBTSxFQUFFLENBQUM7b0NBQ2IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNMLEtBQUssR0FBRyxlQUFlLENBQUM7d0NBQ3hCLE1BQU07b0NBQ1YsQ0FBQztvQ0FDRCxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0NBQ04sS0FBSyxHQUFHLG1CQUFtQixDQUFDO3dDQUM1QixNQUFNO29DQUNWLENBQUM7b0NBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dDQUNOLEtBQUssR0FBRyx3QkFBd0IsQ0FBQzt3Q0FDakMsTUFBTTtvQ0FDVixDQUFDO29DQUNELEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt3Q0FDTixLQUFLLEdBQUcsa0JBQWtCLENBQUM7d0NBQzNCLE1BQU07b0NBQ1YsQ0FBQztvQ0FDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO3dDQUNOLEtBQUssRUFBRSxhQUFhLENBQUE7d0NBQ3BCLE1BQU07b0NBQ1YsQ0FBQztnQ0FDTCxDQUFDO2dDQUVELFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0NBQ3hCLCtGQUErRjtnQ0FDL0YsVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7b0NBQzlCLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRTtvQ0FDZixZQUFZLEVBQUUsTUFBTTtvQ0FDcEIsSUFBSSxFQUFFLFFBQVE7b0NBQ2QsUUFBUSxFQUFFLElBQUk7aUNBQ2pCLENBQUMsQ0FBQzs0QkFDUCxDQUFDOzRCQUVELGlGQUFpRjs0QkFDakYsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7Z0NBQ3ZLLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs0QkFDekQsQ0FBQzt3QkFDTCxDQUFDO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUEsK0NBQStDO29CQUV4RixDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQTdGb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNkY3QjtJQUFELENBQUMsRUE3RmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTZGbkI7QUFBRCxDQUFDLEVBN0ZTLE1BQU0sS0FBTixNQUFNLFFBNkZmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWRBZHJlc3kudHMgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBQcmV2aWV3IHBybyBhZHJlc3kgcG9wbGF0bsOta2EgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNC0xNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8vIGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC9ndWlkZXMvTsOhaGxlZCUyMCUyOFNvdWhybiUyOSUyMGslMjBzZXpuYW11XHJcbiAgICBHb3JkaWMuUHJldmlld3MucmVnaXN0ZXIoXCJkZHA6R1ByaXBhZEFkcmVzeVwiLCB7XHJcbiAgICAgICAgY2FuUmVuZGVyOiAoZHRvKSA9PiB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBkdG8uaXhzX2VzdSAhPSBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiAoZGl2LCBkdG8pID0+IHsgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgY3VycmVudEVsZW1lbnQgPSAkKGRpdik7IFxyXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNydiA9IG5ldyBHQ29udGVudChcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdXZWJEZHBDb250ZW50XCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oY3VycmVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAvL3ZhciBncmlkID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKGN1cnJlbnRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgICAgIGZpbHRlci5peHNfZXN1ID0gZHRvLml4c19lc3U7XHJcblxyXG4gICAgICAgICAgICBzcnYuaXNsLlByaXBhZEVzdUFkcmVzeS5saXN0KChycSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1BZHJlc3kgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiLCBuYW1lOiBcImFkcmVzeUVzdUZvcm1cIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybUFkcmVzeS5hZGRTZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkdG8uaXhzX2VzdSA9PSAnMDAwMFNFMDAwMDBNJykgeyAvL1RPRE86IGRvcGxuaXQgaWRlbnRpZmlrw6F0b3IgXCJudWzDoWtcIiBwcm8gbmV1csSNZW5vdSBFU1UgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1BZHJlc3kuYWRkUm93KCkuYWRkVGV4dChcIsW9w6FkbsOpIGRvc3R1cG7DqSBhZHJlc3lcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHlwQWRyID0gZGF0YVtpXS50eXBfYWRyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgYWRyZXNhID0gZGF0YVtpXS5lc3VfdHh0OyAvLy16YWtvbWVudG92w6FubywgYWRyZXNhIGJ5IHNlIG3Em2xhIGRvdGFob3ZhdCBwb21vY8OtIFNUIHNsb3VwY8WvICg9xZjDoWRrxa8gb2LDoWxrb3bDqSBhZHJlc3kpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFkcmVzYSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9jUmFkZWsgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0uc3QxICE9IG51bGwpIHsgYWRyZXNhICs9IGAke2RhdGFbaV0uc3QxfSBcXG5gOyBwb2NSYWRlaysrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXS5zdDIgIT0gbnVsbCkgeyBhZHJlc2EgKz0gYCR7ZGF0YVtpXS5zdDJ9IFxcbmA7IHBvY1JhZGVrKys7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnN0MyAhPSBudWxsKSB7IGFkcmVzYSArPSBgJHtkYXRhW2ldLnN0M30gXFxuYDsgcG9jUmFkZWsrKzsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0uc3Q0ICE9IG51bGwpIHsgYWRyZXNhICs9IGAke2RhdGFbaV0uc3Q0fSBcXG5gOyBwb2NSYWRlaysrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXS5zdDUgIT0gbnVsbCkgeyBhZHJlc2EgKz0gYCR7ZGF0YVtpXS5zdDV9IFxcbmA7IHBvY1JhZGVrKys7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnN0NiAhPSBudWxsKSB7IGFkcmVzYSArPSBgJHtkYXRhW2ldLnN0Nn0gXFxuYDsgcG9jUmFkZWsrKzsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0uc3Q3ICE9IG51bGwpIHsgYWRyZXNhICs9IGAke2RhdGFbaV0uc3Q3fSBcXG5gOyBwb2NSYWRlaysrOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hemV2ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cEFkcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXpldiA9IFwiVHJ2YWzDoSBhZHJlc2FcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXYgPSBcIkRvcnXEjW92YWPDrSBhZHJlc2FcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXYgPSBcIlphbcSbc3RuYXZhdGVsIChhZHJlc2EpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2ID0gXCJLb250YWt0bsOtIGFkcmVzYVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXpldjogXCJKaW7DoSBhZHJlc2FcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUFkcmVzeS5hZGRSb3cobmF6ZXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1BZHJlc3kuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogYGFkciR7aX1gLCBkZWZhdWx0VmFsdWU6IGFkcmVzYSwgdmFsaWRhdG9yczogW10gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQWRyZXN5LmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYGFkciR7aX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogYWRyZXNhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IHBvY1JhZGVrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogdiB0b210byBib2TEmyBzZSB6YW15c2xldCwgamFrIHRvIG3DoSBmdW5nb3ZhdCBhIHpkYSBqZSB0byB2xa9iZWMgcG90xZllYmEuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1BZHJlc3kuZm9ybS5zZWN0aW9ucyA9PSBudWxsIHx8IGZvcm1BZHJlc3kuZm9ybS5zZWN0aW9ucy5sZW5ndGggPT0gMCB8fCBmb3JtQWRyZXN5LmZvcm0uc2VjdGlvbnNbMF0ucm93cyA9PSBudWxsIHx8IGZvcm1BZHJlc3kuZm9ybS5zZWN0aW9uc1swXS5yb3dzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQWRyZXN5LmFkZFJvdygpLmFkZFRleHQoXCLFvcOhZG7DqSBkb3N0dXBuw6kgYWRyZXN5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1BZHJlc3kpOy8vLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iXX0=