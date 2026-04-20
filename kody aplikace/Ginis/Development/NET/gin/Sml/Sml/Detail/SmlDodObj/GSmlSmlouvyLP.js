"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlSmlouvyLP.ts                  </Name>
//    <Description>                                                             </Description>
//    <Author>      Adam Černý                                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-07-22                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GSmlSmlouvyLP = class GSmlSmlouvyLP extends Gordic.GContentBase {
                onContentReady() {
                    this.$gridHlavicky = $("<div>").ggrid({
                        columnMode: "full",
                        columns: this.createColumnsproHlavicky(),
                    }).appendTo(this.element);
                    this.$gridPolozky = $("<div>").ggrid({
                        columnMode: "full",
                    }).gautofit().appendTo(this.element);
                }
                createColumnsproHlavicky() {
                    var columns = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "Z",
                        width: 40,
                        caption: "Z"
                    })
                        .addTextColumn({
                        name: "FK",
                        width: 40,
                        caption: "FK"
                    })
                        .addTextColumn({
                        name: "poradi",
                        width: 60,
                        caption: "# ePRi"
                    })
                        .addTextColumn({
                        name: "stav",
                        width: 30,
                        caption: "S"
                    })
                        .addTextColumn({
                        name: "ixp",
                        width: 140,
                        caption: "Identifikátor",
                    })
                        .addTextColumn({
                        name: "ac_sml",
                        width: 130,
                        caption: "Agendové číslo",
                    })
                        .addTextColumn({
                        name: "popis",
                        width: 200,
                        caption: "Popis"
                    })
                        .addTextColumn({
                        name: "mena_zkr",
                        caption: "Měna",
                        width: 100,
                    })
                        .addNumberColumn({
                        name: "mena",
                        caption: "Celková cena",
                        width: 100,
                    })
                        .addCurrencyColumn({
                        name: "c_mena",
                        caption: "Celková částka",
                        width: 100,
                    })
                        .addCurrencyColumn({
                        name: "c",
                        width: 120,
                        caption: "Rozpis CZK",
                    })
                        .addCurrencyColumn({
                        name: "rozpis_v_mene",
                        width: 120,
                        caption: "Rozpis v měně"
                    })
                        .addNumberColumn({
                        name: "mena",
                        caption: "Cena bez DPH",
                        width: 100,
                    })
                        .addNumberColumn({
                        name: "DPH",
                        caption: "DPH",
                        width: 100,
                    })
                        .addNumberColumn({
                        name: "cena_s_dph",
                        caption: "Cena s DPH",
                        width: 100,
                    })
                        .addDateColumn({
                        name: "uzav",
                        width: 80,
                        caption: "Uzavření"
                    })
                        .addDateColumn({
                        name: "dat_platnost",
                        width: 80,
                        caption: "Ukončení platnosti"
                    })
                        .addDateColumn({
                        name: "dat_ucinnost",
                        width: 80,
                        caption: "Účinnost"
                    })
                        .addDateColumn({
                        name: "dat_sign",
                        width: 80,
                        caption: "Datum podpisu"
                    })
                        .addNumberColumn({
                        name: "fin_od",
                        width: 75,
                        caption: "Začátek financování"
                    })
                        .addNumberColumn({
                        name: "fin_do",
                        width: 75,
                        caption: "Konec financování"
                    })
                        .addTextColumn({
                        name: "sml_typ",
                        width: 200,
                        caption: "Typ dokladu",
                    })
                        .addNumberColumn({
                        name: "polozy_fp",
                        width: 75,
                        caption: "Položky FP"
                    })
                        .addTextColumn({
                        name: "ixs_fun_vyriz",
                        width: 100,
                        caption: "Kompetent"
                    })
                        .addDateColumn({
                        name: "dat_sign_ext",
                        width: 80,
                        caption: "Datum protistrany"
                    })
                        .addTextColumn({
                        name: "ixs_fun_ref",
                        width: 100,
                        caption: "Referent",
                    })
                        .addTextColumn({
                        name: "cis_real",
                        width: 100,
                        caption: "Realizátor",
                    })
                        .addNumberColumn({
                        name: "vz_dt_po",
                        width: 75,
                        caption: "Číslo VZ, DT, PO"
                    })
                        .addTextColumn({
                        name: "nks",
                        width: 100,
                        caption: "NS",
                    })
                        .addCurrencyColumn({
                        name: "cerpani",
                        width: 100,
                        caption: "Očekávané čerpání případu",
                    })
                        .addCurrencyColumn({
                        name: "c_obj_sml",
                        caption: "Objednáno SML",
                        width: 120,
                    })
                        .addCurrencyColumn({
                        name: "rozpis",
                        caption: "Rozpis případu v akt. obd. CZK",
                        width: 120,
                    })
                        .addCurrencyColumn({
                        name: "ocek_2",
                        caption: "Položky FP případu v akt. obd CZK",
                        width: 120,
                    })
                        .addCurrencyColumn({
                        name: "ocek",
                        caption: "Očekávané čerpání případem v akt. obd. CZK",
                        width: 120,
                    })
                        .addDateColumn({
                        name: "dat_zver",
                        width: 80,
                        caption: "Datum zveřejnění"
                    })
                        .addTextColumn({
                        name: "priz_spis",
                        width: 100,
                        caption: "Přiřazený spis",
                    })
                        .addTextColumn({
                        name: "ver_zak",
                        width: 100,
                        caption: "Veřejná zakázka",
                    })
                        .addTextColumn({
                        name: "opce",
                        width: 75,
                        caption: "Možnost opce",
                    });
                    return columns;
                }
            };
            GSmlSmlouvyLP = __decorate([
                gcontent
            ], GSmlSmlouvyLP);
            WebClient.GSmlSmlouvyLP = GSmlSmlouvyLP;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFNtbG91dnlMUC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTbWxTbWxvdXZ5TFAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSxrRkFBa0Y7QUFDbEYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0FpUGY7QUFqUEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaVBuQjtJQWpQZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBaVA3QjtRQWpQb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFTbkMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLE9BQUEsWUFBWTtnQkFLM0MsY0FBYztvQkFFVixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ2xDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixFQUFFO3FCQUUzQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFHMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUNqQyxVQUFVLEVBQUUsTUFBTTtxQkFHckIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRXpDLENBQUM7Z0JBR0Qsd0JBQXdCO29CQUNwQixJQUFJLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3lCQUNyQyxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLEdBQUc7d0JBQ1QsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsT0FBTyxF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aVA3QjtJQUFELENBQUMsRUFqUGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlQbkI7QUFBRCxDQUFDLEVBalBTLE1BQU0sS0FBTixNQUFNLFFBaVBmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxTbWxvdXZ5TFAudHMgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBBZGFtIMSMZXJuw70gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIxLTA3LTIyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sU21sb3V2eUxQSW5wdXRQYXJhbXMge1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbFNtbG91dnlMUFJldHVyblZhbHVlIHtcclxuICAgIH1cclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU21sU21sb3V2eUxQIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZEhsYXZpY2t5OiBKUXVlcnk8SFRNTEVsZW1lbnQ+XHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFBvbG96a3k6IEpRdWVyeTxIVE1MRWxlbWVudD5cclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRncmlkSGxhdmlja3kgPSAkKFwiPGRpdj5cIikuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUNvbHVtbnNwcm9IbGF2aWNreSgpLCAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0pLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZ3JpZFBvbG96a3kgPSAkKFwiPGRpdj5cIikuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcblxyXG5cclxuICAgICAgICAgICAgfSkuZ2F1dG9maXQoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpOyAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBjcmVhdGVDb2x1bW5zcHJvSGxhdmlja3koKTogR0dyaWRDb2x1bW48YW55PltdIHwgRGF0YS5HcmlkRm9ybWF0PGFueT4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICB2YXIgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlpcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJGS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkZLXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3JhZGlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjIGVQUmlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSWRlbnRpZmlrw6F0b3JcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19zbWxcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQWdlbmRvdsOpIMSNw61zbG9cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3Bpc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVuYV96a3JcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk3Em25hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkNlbGtvdsOhIGNlbmFcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX21lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkNlbGtvdsOhIMSNw6FzdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb3pwaXMgQ1pLXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJvenBpc192X21lbmVcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm96cGlzIHYgbcSbbsSbXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkNlbmEgYmV6IERQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjZW5hX3NfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJDZW5hIHMgRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1emF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVXphdsWZZW7DrVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3BsYXRub3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWtvbsSNZW7DrSBwbGF0bm9zdGlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF91Y2lubm9zdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsOaxI1pbm5vc3RcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9zaWduXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gcG9kcGlzdVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmluX29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDc1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmHEjcOhdGVrIGZpbmFuY292w6Fuw61cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmluX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDc1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS29uZWMgZmluYW5jb3bDoW7DrVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic21sX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUeXAgZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvbG96eV9mcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvbG/Fvmt5IEZQXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX3Z5cml6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvbXBldGVudFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NpZ25fZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gcHJvdGlzdHJhbnlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fcmVmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJlZmVyZW50XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzX3JlYWxcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUmVhbGl6w6F0b3JcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ6X2R0X3BvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDc1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwixIzDrXNsbyBWWiwgRFQsIFBPXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTlNcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNlcnBhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT8SNZWvDoXZhbsOpIMSNZXJww6Fuw60gcMWZw61wYWR1XCIsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfb2JqX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2JqZWRuw6FubyBTTUxcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm96cGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb3pwaXMgcMWZw61wYWR1IHYgYWt0LiBvYmQuIENaS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm9jZWtfMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9sb8W+a3kgRlAgcMWZw61wYWR1IHYgYWt0LiBvYmQgQ1pLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib2Nla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT8SNZWvDoXZhbsOpIMSNZXJww6Fuw60gcMWZw61wYWRlbSB2IGFrdC4gb2JkLiBDWktcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfenZlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHp2ZcWZZWpuxJtuw61cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfc3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlpxZlhemVuw70gc3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlcl96YWtcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVmXFmWVqbsOhIHpha8OhemthXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3BjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk1vxb5ub3N0IG9wY2VcIixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbnM7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG5cclxuXHJcbiAgICB9XHJcbn0iXX0=