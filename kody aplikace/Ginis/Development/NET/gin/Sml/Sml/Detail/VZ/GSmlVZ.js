"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlVZ.ts                              </Name>
//    <Description> Záložka veřejné zakázky                                     </Description>
//    <Author>      Adam Černý                                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-04                                                  </Created>
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
            let GSmlVZ = class GSmlVZ extends Gordic.GContentBase {
                onContentReady() {
                    this._createForm();
                    this._createGrid();
                    this._fillForm();
                }
                _fillForm() {
                    Gordic.Isl.SmlVZ.listVZDetail({ filters: { ixs_pri: this.model.findoc?.smlblk?.ixs_pri, ixp_nab: this.model.findoc?.smlblk?.ixp_nab, typ_ag_blok: this.model.findoc?.smlblk?.typ_ag_blok } })
                        .getData()
                        .done((data) => {
                        if (data.length > 0)
                            this.$Form?.findFields().gfield("model", "apply", data[0]);
                    });
                }
                _createGrid() {
                    this.dataGrid = new Gordic.Isl.View(Gordic.Isl.SmlVZ.listVZFinancniStav({
                        filters: { ixs_pri: this.model.findoc?.smlblk?.ixs_pri, typ_ag_blok: this.model.findoc?.smlblk?.typ_ag_blok }
                    }));
                    this.$grid = $("<div class='Grid'>")
                        .css("max-height", "100%")
                        //.appendTo(this.element)
                        .appendTo(this.element)
                        .ggrid({
                        columnMode: "full",
                        columns: this.createColumns(),
                        data: this.dataGrid,
                    });
                }
                createColumns() {
                    let columns = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "rok",
                        caption: "jres:33500090", //RC 33500090 : Rok
                        description: "jres:33500090",
                    })
                        .addTextColumn({
                        name: "nks",
                        caption: "jres:33500091", //RC 33500091 : NS
                        description: "jres:33500092", //RC 33500092 : Nákladové středisko
                    })
                        .addSortedEkoCfuSet(Gordic.Eko.CfuUtils.getCfuSetServerFilters(this, {
                        isRoz: true, //patri k rozpoctu 
                        isUct: false, //patri do ucetnictvi                        
                    }))
                        .addTextColumn({
                        name: "c_12",
                        caption: "jres:33500093", //RC 33500093 : BLOKOVÁNO
                        description: "jres:33500093",
                    })
                        .addTextColumn({
                        name: "c_vz_sml",
                        caption: "jres:33500094", //RC 33500094 : NASMLOUVÁNO BLK
                        description: "jres:33500094",
                    })
                        .addTextColumn({
                        name: "c_18",
                        caption: "jres:33500095", //RC 33500095 : REZERVACE SML, OBJ
                        description: "jres:33500095",
                    });
                    return columns;
                }
                _createForm() {
                    const formVZ = new Gordic.Forms.Form({
                        name: "FormVZ",
                        layoutDescriptor: "L3M3S1, L-4-8-0, M-4-8-0, S-12-12-0",
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500436") //RC 33500436 : Evidenční číslo
                        .addField("gstringbox", {
                        name: "ac_ver_zak",
                        disabled: /*false*/ true,
                    })
                        .addRow("jres:33500437") //RC 33500437 : Agendový číslo
                        .addField("gstringbox", {
                        name: "ac_ag",
                        disabled: /*false*/ true,
                    })
                        .addRow("jres:33500438") //RC 33500438 : Stav
                        .addField("gstringbox", {
                        name: "s_vz_txt",
                        disabled: /*false*/ true,
                    })
                        .addRow("jres:33500439") //RC 33500439 : Název
                        .addField("gstringbox", {
                        name: "nazev",
                        disabled: /*false*/ true,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500440") //RC 33500440 : Datum založení
                        .addField("gstringbox", {
                        name: "dat_pri",
                        disabled: /*false*/ true,
                    })
                        .addRow("jres:33500441") //RC 33500441 : Schválená částka
                        .addField("gstringbox", {
                        name: "c_sch",
                        disabled: /*false*/ true,
                    })
                        .addRow("jres:33500442") //RC 33500442 : Celková částka
                        .addField("gstringbox", {
                        name: "c",
                        disabled: /*false*/ true,
                    })
                        .addRow("jres:33500443") //RC 33500443 : Druh soutěže
                        .addField("gstringbox", {
                        name: "soutez_txt",
                        disabled: /*false*/ true,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500444") //RC 33500444 : Věstníkové číslo
                        .addField("gstringbox", {
                        name: "vz_cislo_vevz",
                        disabled: /*false*/ true,
                    })
                        .addRow("jres:33500445") //RC 33500445 : Číslo z profilu zadavatele
                        .addField("gstringbox", {
                        name: "vz_cislo_prof",
                        disabled: /*false*/ true,
                    })
                        .addRow("jres:33500446") //RC 33500446 : Číslo v NEN
                        .addField("gstringbox", {
                        name: "vz_cislo_inen",
                        disabled: /*false*/ true,
                    })
                        .addRow("jres:33500447") //RC 33500447 : Číslo v elektronické tržišti
                        .addField("gstringbox", {
                        name: "vz_cislo_etrz",
                        disabled: /*false*/ true,
                    });
                    this.$Form = $("<div>").appendTo(this.element).gform("createFrom", formVZ);
                }
            };
            GSmlVZ = __decorate([
                gcontent
            ], GSmlVZ);
            WebClient.GSmlVZ = GSmlVZ;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFZaLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NtbFZaLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFLakIsSUFBVSxNQUFNLENBNExmO0FBNUxELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRMbkI7SUE1TGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRMN0I7UUE1TG9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBU25DLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU8sU0FBUSxPQUFBLFlBQVk7Z0JBT3BDLGNBQWM7b0JBRVYsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFLckIsQ0FBQztnQkFFTyxTQUFTO29CQUViLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQzt5QkFDeEwsT0FBTyxFQUFFO3lCQUNULElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNYLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDOzRCQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLFVB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TDdCO0lBQUQsQ0FBQyxFQTVMZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNExuQjtBQUFELENBQUMsRUE1TFMsTUFBTSxLQUFOLE1BQU0sUUE0TGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFZaLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFrDoWxvxb5rYSB2ZcWZZWpuw6kgemFrw6F6a3kgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBBZGFtIMSMZXJuw70gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIyLTAzLTA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlNtbC5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxWWklucHV0UGFyYW1zIHtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTbWxWWlJldHVyblZhbHVlIHtcclxuICAgIH1cclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU21sVlogZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsOiBJbnRlcmZhY2UuR1NtbF9EZXRhaWxEdG9cclxuICAgICAgICBwcml2YXRlICRGb3JtPzogSlF1ZXJ5PEhUTUxFbGVtZW50PlxyXG4gICAgICAgIGRhdGFHcmlkOiBJc2wuVmlldzxhbnksIElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8SW50ZXJmYWNlLkdTbWxkcG9sRHRvPj47XHJcbiAgICAgICAgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxGb3JtKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfZmlsbEZvcm0oKSB7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLlNtbFZaLmxpc3RWWkRldGFpbCh7IGZpbHRlcnM6IHsgaXhzX3ByaTogdGhpcy5tb2RlbC5maW5kb2M/LnNtbGJsaz8uaXhzX3ByaSwgaXhwX25hYjogdGhpcy5tb2RlbC5maW5kb2M/LnNtbGJsaz8uaXhwX25hYiwgdHlwX2FnX2Jsb2s6IHRoaXMubW9kZWwuZmluZG9jPy5zbWxibGs/LnR5cF9hZ19ibG9rIH0gfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRGb3JtPy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkYXRhWzBdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIF9jcmVhdGVHcmlkKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kYXRhR3JpZCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5TbWxWWi5saXN0VlpGaW5hbmNuaVN0YXZcclxuICAgICAgICAgICAgICAgICh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogeyBpeHNfcHJpOiB0aGlzLm1vZGVsLmZpbmRvYz8uc21sYmxrPy5peHNfcHJpLCB0eXBfYWdfYmxvazogdGhpcy5tb2RlbC5maW5kb2M/LnNtbGJsaz8udHlwX2FnX2Jsb2sgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkKFwiPGRpdiBjbGFzcz0nR3JpZCc+XCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwibWF4LWhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC8vLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlQ29sdW1ucygpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YUdyaWQsXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlQ29sdW1ucygpOiBHR3JpZENvbHVtbjxJbnRlcmZhY2UuR1JvemFhYXRGaW5hbmNuaVN0YXZEdG8+W10gfCBEYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdSb3phYWF0RmluYW5jbmlTdGF2RHRvPiB8IHVuZGVmaW5lZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMDkwXCIsIC8vUkMgMzM1MDAwOTAgOiBSb2tcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMDkwXCIsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwMDkxXCIsIC8vUkMgMzM1MDAwOTEgOiBOU1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAwOTJcIiwgLy9SQyAzMzUwMDA5MiA6IE7DoWtsYWRvdsOpIHN0xZllZGlza29cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU29ydGVkRWtvQ2Z1U2V0KFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uQ2Z1VXRpbHMuZ2V0Q2Z1U2V0U2VydmVyRmlsdGVycyh0aGlzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUm96OiB0cnVlLCAvL3BhdHJpIGsgcm96cG9jdHUgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVWN0OiBmYWxzZSwgIC8vcGF0cmkgZG8gdWNldG5pY3R2aSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY18xMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDA5M1wiLCAvL1JDIDMzNTAwMDkzIDogQkxPS09Ww4FOT1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDAwOTNcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY192el9zbWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDAwOTRcIiwgLy9SQyAzMzUwMDA5NCA6IE5BU01MT1VWw4FOTyBCTEtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwMDk0XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY18xOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDA5NVwiLCAvL1JDIDMzNTAwMDk1IDogUkVaRVJWQUNFIFNNTCwgT0JKXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDA5NVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX2NyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1WWiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkZvcm1WWlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDNNM1MxLCBMLTQtOC0wLCBNLTQtOC0wLCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCImbmJzcFwiLCBjdXN0b21DbGFzczogXCJcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDM2XCIpIC8vUkMgMzM1MDA0MzYgOiBFdmlkZW7EjW7DrSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOlwiYWNfdmVyX3pha1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAvKmZhbHNlKi90cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQzN1wiKSAvL1JDIDMzNTAwNDM3IDogQWdlbmRvdsO9IMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJhY19hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAvKmZhbHNlKi90cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDM4XCIpIC8vUkMgMzM1MDA0MzggOiBTdGF2XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfdnpfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IC8qZmFsc2UqL3RydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0MzlcIikgLy9SQyAzMzUwMDQzOSA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IC8qZmFsc2UqL3RydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiJm5ic3BcIiwgY3VzdG9tQ2xhc3M6IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDQwXCIpIC8vUkMgMzM1MDA0NDAgOiBEYXR1bSB6YWxvxb5lbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wcmlcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogLypmYWxzZSovdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ0MVwiKSAvL1JDIDMzNTAwNDQxIDogU2NodsOhbGVuw6EgxI3DoXN0a2FcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19zY2hcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogLypmYWxzZSovdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ0MlwiKSAvL1JDIDMzNTAwNDQyIDogQ2Vsa292w6EgxI3DoXN0a2FcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IC8qZmFsc2UqL3RydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NDNcIikgLy9SQyAzMzUwMDQ0MyA6IERydWggc291dMSbxb5lXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOlwic291dGV6X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAvKmZhbHNlKi90cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiJm5ic3BcIiwgY3VzdG9tQ2xhc3M6IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDQ0XCIpIC8vUkMgMzM1MDA0NDQgOiBWxJtzdG7DrWtvdsOpIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6XCJ2el9jaXNsb192ZXZ6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IC8qZmFsc2UqL3RydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDQ1XCIpIC8vUkMgMzM1MDA0NDUgOiDEjMOtc2xvIHogcHJvZmlsdSB6YWRhdmF0ZWxlXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOlwidnpfY2lzbG9fcHJvZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAvKmZhbHNlKi90cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDQ2XCIpIC8vUkMgMzM1MDA0NDYgOiDEjMOtc2xvIHYgTkVOXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOlwidnpfY2lzbG9faW5lblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAvKmZhbHNlKi90cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ0N1wiKSAvL1JDIDMzNTAwNDQ3IDogxIzDrXNsbyB2IGVsZWt0cm9uaWNrw6kgdHLFvmnFoXRpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ6X2Npc2xvX2V0cnpcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogLypmYWxzZSovdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy4kRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtVlopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==