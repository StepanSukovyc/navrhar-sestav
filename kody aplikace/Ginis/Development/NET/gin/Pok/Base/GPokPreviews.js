"use strict";
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            Gordic.Previews.register("hpl:DokladPreview", {
                canRender: (dto) => {
                    return dto.ixp != null;
                },
                render: (div, dto) => {
                    var currentElement = $(div);
                    currentElement.empty();
                    // var srv = new GContent("Gordic.Ddp.WebClient.GWebDdpContent");
                    var form = $("<div>").appendTo(currentElement);
                    //  var grid = $("<div>").appendTo(currentElement);
                    let formBuilder = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-4-8-0, M-4-8-0, breaks-300-400" })
                        .addSection()
                        .addRow("Identifikátor")
                        .addField("gstringbox", {
                        name: "ixp",
                    })
                        .addRow("jres:31302012") //RC 31302012 : Agendové číslo    
                        .addField("gstringbox", { name: "ac" })
                        .addRow("Subjekt")
                        .addField("gstringbox", {
                        name: "esu_txt"
                    })
                        .addRow("Stav dokladu")
                        .addField("gstringbox", {
                        name: "up_stav_txt"
                    })
                        .addRow("jres:31302006")
                        .addField("gstringbox", {
                        name: "ktg_typ_txt"
                    })
                        .addRow("jres:31302029") //RC 31302029 : Druh dokladu
                        .addField("gstringbox", {
                        name: "druh_dok_txt",
                    })
                        .addRow("jres:31302121") //RC 31302121 : Způsob platby
                        .addField("gstringbox", {
                        name: "zpus_platby_txt",
                    })
                        .addRow("Celkem v CZK")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_celkem",
                    });
                    if (dto.mena != 0) {
                        formBuilder.addRow("Celkem v " + dto.mena_zkr)
                            .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                            name: "c_celkem_m",
                        })
                            .addRow("Kurz") //RC 31302263 : Počáteční stav                 
                            .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                            name: "kurz_doklad"
                        });
                    }
                    formBuilder.addRow("jres:31302167").addField("gdatebox", { name: "dat_vyst" }) //RC 31302167 : Datum podání
                        .addRow("jres:31302166").addField("gdatebox", { name: "dat_evid_time", valueType: "datetime" }) //RC 31302166 : Datum vystavení // ve stavu nárh dostupné pak už ne a doplní se časem evidence a ještě řízeni parametrem
                        .addRow("jres:31302131") //RC 31302131 : Popis dokladu
                        .addField("gstringbox", {
                        name: "popis",
                        rows: 4,
                    });
                    form.gform("createFrom", formBuilder).findFields().gfield("model", "apply", dto);
                    form.gform("viewMode", "view");
                }
            });
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1ByZXZpZXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva1ByZXZpZXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0EwRWY7QUExRUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMEVuQjtJQTFFZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMEU3QjtRQTFFb0IsV0FBQSxTQUFTO1lBRTFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO2dCQUMxQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDZixPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2dCQUMzQixDQUFDO2dCQUNELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QixjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXZCLGlFQUFpRTtvQkFFakUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDL0MsbURBQW1EO29CQUVuRCxJQUFJLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsMENBQTBDLEVBQUUsQ0FBQzt5QkFDcEcsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUM7eUJBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxLQUFLO3FCQUNkLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBLGtDQUFrQzt5QkFDekQsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzt5QkFDdEMsTUFBTSxDQUFDLFNBQVMsQ0FBQzt5QkFDakIsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQzt5QkFDdEIsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLGFBQWE7cUJBQ3RCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQzt5QkFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLGFBQWE7cUJBQ3RCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDRCQUE0Qjt5QkFDcEQsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLGNBQWM7cUJBQ3ZCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDZCQUE2Qjt5QkFDckQsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLGlCQUFpQjtxQkFDMUIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO3lCQUN0QixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUN0RCxJQUFJLEVBQUUsVUFBVTtxQkFDbkIsQ0FBQyxDQUFDO29CQUVQLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDaEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQzs2QkFDekMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTs0QkFDdEQsSUFBSSxFQUFFLFlBQVk7eUJBQ3JCLENBQUM7NkJBRUwsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLCtDQUErQzs2QkFDMUQsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTs0QkFDdEQsSUFBSSxFQUFFLGFBQWE7eUJBQ3RCLENBQUMsQ0FBQTtvQkFDVixDQUFDO29CQUNELFdBQVcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLDRCQUE0Qjt5QkFDdEcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLHdIQUF3SDt5QkFDdk4sTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDZCQUE2Qjt5QkFDckQsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLE9BQU87d0JBQ2IsSUFBSSxFQUFFLENBQUM7cUJBQ1YsQ0FBQyxDQUNEO29CQUlMLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNqRixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUMsRUExRW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBFN0I7SUFBRCxDQUFDLEVBMUVnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwRW5CO0FBQUQsQ0FBQyxFQTFFUyxNQUFNLEtBQU4sTUFBTSxRQTBFZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUG9rLldlYkNsaWVudCB7XHJcblxyXG4gICAgR29yZGljLlByZXZpZXdzLnJlZ2lzdGVyKFwiaHBsOkRva2xhZFByZXZpZXdcIiwge1xyXG4gICAgICAgIGNhblJlbmRlcjogKGR0bykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZHRvLml4cCAhPSBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiAoZGl2LCBkdG8pID0+IHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gJChkaXYpO1xyXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmFyIHNydiA9IG5ldyBHQ29udGVudChcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdXZWJEZHBDb250ZW50XCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oY3VycmVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAvLyAgdmFyIGdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oY3VycmVudEVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm1CdWlsZGVyID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtNC04LTAsIE0tNC04LTAsIGJyZWFrcy0zMDAtNDAwXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvclwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjAxMlwiKS8vUkMgMzEzMDIwMTIgOiBBZ2VuZG92w6kgxI3DrXNsbyAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImFjXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdWJqZWt0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV90eHRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IGRva2xhZHVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBfc3Rhdl90eHRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMDA2XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgLy9SQyAzMTMwMjAwNiA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdHlwX3R4dFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIwMjlcIikgLy9SQyAzMTMwMjAyOSA6IERydWggZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkcnVoX2Rva190eHRcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjEyMVwiKSAvL1JDIDMxMzAyMTIxIDogWnDFr3NvYiBwbGF0YnlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwienB1c19wbGF0YnlfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkNlbGtlbSB2IENaS1wiKSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2NlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZHRvLm1lbmEgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXIuYWRkUm93KFwiQ2Vsa2VtIHYgXCIgKyBkdG8ubWVuYV96a3IpICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19jZWxrZW1fbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkt1cnpcIikgLy9SQyAzMTMwMjI2MyA6IFBvxI3DoXRlxI1uw60gc3RhdiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt1cnpfZG9rbGFkXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcm1CdWlsZGVyLmFkZFJvdyhcImpyZXM6MzEzMDIxNjdcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X3Z5c3RcIiB9KSAvL1JDIDMxMzAyMTY3IDogRGF0dW0gcG9kw6Fuw61cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMTY2XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdF9ldmlkX3RpbWVcIiwgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSkgLy9SQyAzMTMwMjE2NiA6IERhdHVtIHZ5c3RhdmVuw60gLy8gdmUgc3RhdnUgbsOhcmggZG9zdHVwbsOpIHBhayB1xb4gbmUgYSBkb3BsbsOtIHNlIMSNYXNlbSBldmlkZW5jZSBhIGplxaF0xJsgxZnDrXplbmkgcGFyYW1ldHJlbVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIxMzFcIikgLy9SQyAzMTMwMjEzMSA6IFBvcGlzIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiA0LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcm0uZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1CdWlsZGVyKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkdG8pO1xyXG4gICAgICAgICAgICBmb3JtLmdmb3JtKFwidmlld01vZGVcIiwgXCJ2aWV3XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59Il19