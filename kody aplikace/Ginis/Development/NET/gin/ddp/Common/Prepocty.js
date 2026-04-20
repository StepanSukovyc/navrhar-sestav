"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.Prepocty.ts                            </Name>
//    <Description> Sdílené metody a funkce DDP pro práci s částkamy a měnou    </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
/**
 * Sdílené metody a funkce DDP pro práci s částkamy a měnou
 *
 * @author Martin Hanuš
 */
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Common;
            (function (Common) {
                var Prepocty;
                (function (Prepocty) {
                    /**
                    * Funkce pro vrácení daného kurzu měny, dle o_mena
                    * @param IslClient Content
                    * @param o_mena Druh měny
                    * @param o_kurz Typ kurzu | N - nákup | S - střed | P - prodej |
                    */
                    function getKurzMeny(IslClient, o_mena, o_kurz) {
                        let ret = new Decimal(1);
                        let kurzyMenyDto;
                        // Naplnění DTO objektu pro kurzy měn
                        let Kurzy = IslClient.Predpisy.vratKurzMeny().getData();
                        return Kurzy.then((kurzyMenyDto) => {
                            //xkurzyMenyDto = data.data;
                            if (kurzyMenyDto != null) {
                                kurzyMenyDto.forEach(function (x) {
                                    if (x.mena == o_mena) {
                                        switch (o_kurz) {
                                            case "N": {
                                                ret = new Decimal(x.kurz_n ?? 0);
                                                break;
                                            }
                                            case "P": {
                                                ret = new Decimal(x.kurz_p ?? 0);
                                                break;
                                            }
                                            default: {
                                                ret = new Decimal(x.kurz_s ?? 0);
                                                break;
                                            }
                                        }
                                    }
                                });
                            }
                            return ret;
                        });
                    }
                    Prepocty.getKurzMeny = getKurzMeny;
                    /**
                            * Přidání sloupce Bez DPH do existujícího gridformatu
                            *
                            * @param {Gordic.Data.GridFormat} columns gridformat
                            * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_z0", caption: "Bez DPH", description: ...)
                            * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                            */
                    function addCastkaZ0(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_z0",
                            field: "c_z0",
                            caption: "Bez DPH",
                            description: "částka bez DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaZ0 = addCastkaZ0;
                    /**
                     * Přidání sloupce Osvobozeno do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_d0", caption: "Osvobozeno", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaD0(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_d0",
                            field: "c_d0",
                            caption: "Osvobozeno",
                            description: "osvobozeno od DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaD0 = addCastkaD0;
                    /**
                     * Přidání sloupce Základ první snížená do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_z1", caption: "Základ první snížená", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaZ1(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_z1",
                            field: "c_z1",
                            caption: "Základ první snížená",
                            description: "základ v první snížené sazbě DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaZ1 = addCastkaZ1;
                    /**
                     * Přidání sloupce DPH první snížená do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_d1", caption: "DPH první snížená", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaD1(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_d1",
                            field: "c_d1",
                            caption: "DPH první snížená",
                            description: "daň v první snížené sazbě DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaD1 = addCastkaD1;
                    /**
                     * Přidání sloupce Základ základní do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_z2", caption: "Základ základní", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaZ2(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_z2",
                            field: "c_z2",
                            caption: "Základ základní",
                            description: "základ v základní sazbě DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaZ2 = addCastkaZ2;
                    /**
                     * Přidání sloupce DPH základní do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_d2", caption: "DPH základní", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaD2(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_d2",
                            field: "c_d2",
                            caption: "DPH základní",
                            description: "daň v základní sazbě DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaD2 = addCastkaD2;
                    /**
                     * Přidání sloupce Základ druhá snížená do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_z3", caption: "Základ druhá snížená", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaZ3(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_z3",
                            field: "c_z3",
                            caption: "Základ druhá snížená",
                            description: "základ v druhé snížené sazbě DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaZ3 = addCastkaZ3;
                    /**
                     * Přidání sloupce DPH druhá snížená do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_d3", caption: "DPH druhá snížená", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaD3(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_d3",
                            field: "c_d3",
                            caption: "DPH druhá snížená",
                            description: "daň v druhé snížené sazbě DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaD3 = addCastkaD3;
                    /**
                     * Přidání sloupce Základ třetí snížená do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_z4", caption: "Základ třetí snížená", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaZ4(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_z4",
                            field: "c_z4",
                            caption: "Základ třetí snížená",
                            description: "základ ve třetí snížené sazbě DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaZ4 = addCastkaZ4;
                    /**
                     * Přidání sloupce DPH třetí snížená do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_d4", caption: "DPH třetí snížená", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaD4(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_d4",
                            field: "c_d4",
                            caption: "DPH třetí snížená",
                            description: "daň v třetí snížené sazbě DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaD4 = addCastkaD4;
                    /**
                     * Přidání sloupce Zaokrouhleno do existujícího gridformatu
                     *
                     * @param {Gordic.Data.GridFormat} columns gridformat
                     * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_zao", caption: "Zaokrouhleno", description: ...)
                     * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
                     */
                    function addCastkaZao(columns, params, scope) {
                        // přidání sloupce pro částku
                        columns.addCurrencyColumn(Gordic.Eko.Grid.Column.addScopeToColumnParams($.extend({
                            name: "c_zao",
                            field: "c_zao",
                            caption: "Zaokrouhleno",
                            description: "zaokrouhlení rekapitulace DPH"
                        }, params), scope));
                    }
                    Prepocty.addCastkaZao = addCastkaZao;
                })(Prepocty = Common.Prepocty || (Common.Prepocty = {}));
            })(Common = WebClient.Common || (WebClient.Common = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlcG9jdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcmVwb2N0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBRWpCOzs7O0dBSUc7QUFDSCxJQUFVLE1BQU0sQ0E2UWY7QUE3UUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNlFuQjtJQTdRZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNlE3QjtRQTdRb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxNQUFNLENBNlFwQztZQTdROEIsV0FBQSxNQUFNO2dCQUFDLElBQUEsUUFBUSxDQTZRN0M7Z0JBN1FxQyxXQUFBLFFBQVE7b0JBR3RDOzs7OztzQkFLRTtvQkFDRixTQUFnQixXQUFXLENBQUMsU0FBcUIsRUFBRSxNQUFjLEVBQUUsTUFBYzt3QkFDN0UsSUFBSSxHQUFHLEdBQVksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLElBQUksWUFBdUQsQ0FBQzt3QkFFNUQscUNBQXFDO3dCQUNyQyxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUV4RCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTs0QkFDL0IsNEJBQTRCOzRCQUU1QixJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDdkIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7b0NBQzVCLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQzt3Q0FDbkIsUUFBUSxNQUFNLEVBQUUsQ0FBQzs0Q0FDYixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0RBQ1AsR0FBRyxHQUFHLElBQUksT0FBTyxDQUFD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ZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5QcmVwb2N0eS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gU2TDrWxlbsOpIG1ldG9keSBhIGZ1bmtjZSBERFAgcHJvIHByw6FjaSBzIMSNw6FzdGthbXkgYSBtxJtub3UgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNC0xNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuLyoqXHJcbiAqIFNkw61sZW7DqSBtZXRvZHkgYSBmdW5rY2UgRERQIHBybyBwcsOhY2kgcyDEjcOhc3RrYW15IGEgbcSbbm91XHJcbiAqXHJcbiAqIEBhdXRob3IgTWFydGluIEhhbnXFoVxyXG4gKi9cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbW1vbi5QcmVwb2N0eSB7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEZ1bmtjZSBwcm8gdnLDoWNlbsOtIGRhbsOpaG8ga3VyenUgbcSbbnksIGRsZSBvX21lbmFcclxuICAgICAgICAqIEBwYXJhbSBJc2xDbGllbnQgQ29udGVudFxyXG4gICAgICAgICogQHBhcmFtIG9fbWVuYSBEcnVoIG3Em255XHJcbiAgICAgICAgKiBAcGFyYW0gb19rdXJ6IFR5cCBrdXJ6dSB8IE4gLSBuw6FrdXAgfCBTIC0gc3TFmWVkIHwgUCAtIHByb2RlaiB8XHJcbiAgICAgICAgKi9cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gZ2V0S3Vyek1lbnkoSXNsQ2xpZW50OiBJc2wuQ2xpZW50LCBvX21lbmE6IG51bWJlciwgb19rdXJ6OiBzdHJpbmcpOiBKUXVlcnkuUHJvbWlzZTxEZWNpbWFsPiB7IFxyXG4gICAgICAgICAgICBsZXQgcmV0OiBEZWNpbWFsID0gbmV3IERlY2ltYWwoMSk7XHJcbiAgICAgICAgICAgIGxldCBrdXJ6eU1lbnlEdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRWtvZGt1ckR0b1tdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gTmFwbG7Em27DrSBEVE8gb2JqZWt0dSBwcm8ga3VyenkgbcSbblxyXG4gICAgICAgICAgICBsZXQgS3VyenkgPSBJc2xDbGllbnQuUHJlZHBpc3kudnJhdEt1cnpNZW55KCkuZ2V0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEt1cnp5LnRoZW4oKGt1cnp5TWVueUR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy94a3VyenlNZW55RHRvID0gZGF0YS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChrdXJ6eU1lbnlEdG8gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGt1cnp5TWVueUR0by5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4Lm1lbmEgPT0gb19tZW5hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9fa3Vyeikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJOXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbmV3IERlY2ltYWwoeC5rdXJ6X24gPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IG5ldyBEZWNpbWFsKHgua3Vyel9wID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBuZXcgRGVjaW1hbCh4Lmt1cnpfcyA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgKiBQxZlpZMOhbsOtIHNsb3VwY2UgQmV6IERQSCBkbyBleGlzdHVqw61jw61obyBncmlkZm9ybWF0dVxyXG4gICAgICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRGF0YS5HcmlkRm9ybWF0fSBjb2x1bW5zIGdyaWRmb3JtYXRcclxuICAgICAgICAgICAgICAgICogQHBhcmFtIHtHR3JpZENvbHVtbn0gW3BhcmFtc10gZGFsxaHDrSB2bGFzdG5vc3RpIHNsb3VwY2UgKHDFmWVkZGVmaW5vdsOpIGpzb3UgbmFtZTogXCJjX3owXCIsIGNhcHRpb246IFwiQmV6IERQSFwiLCBkZXNjcmlwdGlvbjogLi4uKVxyXG4gICAgICAgICAgICAgICAgKiBAcGFyYW0ge0dpbi5XZWJDbGllbnQuR1Njb3BlT3B0aW9uTGV2ZWxbXX0gW3Njb3BlXSBwxZnDrXBhZG7DvSBzY29wZVxyXG4gICAgICAgICAgICAgICAgKi9cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gYWRkQ2FzdGthWjAoY29sdW1uczogR29yZGljLkRhdGEuR3JpZEZvcm1hdCwgcGFyYW1zPzogR0dyaWRDb2x1bW4sIHNjb3BlPzogR2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHNsb3VwY2UgcHJvIMSNw6FzdGt1XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oRWtvLkdyaWQuQ29sdW1uLmFkZFNjb3BlVG9Db2x1bW5QYXJhbXMoJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3owXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiY196MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQmV6IERQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIsSNw6FzdGthIGJleiBEUEhcIlxyXG4gICAgICAgICAgICAgICAgfSwgcGFyYW1zKSwgc2NvcGVcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlpZMOhbsOtIHNsb3VwY2UgT3N2b2JvemVubyBkbyBleGlzdHVqw61jw61obyBncmlkZm9ybWF0dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkRhdGEuR3JpZEZvcm1hdH0gY29sdW1ucyBncmlkZm9ybWF0XHJcbiAgICAgICAgICogQHBhcmFtIHtHR3JpZENvbHVtbn0gW3BhcmFtc10gZGFsxaHDrSB2bGFzdG5vc3RpIHNsb3VwY2UgKHDFmWVkZGVmaW5vdsOpIGpzb3UgbmFtZTogXCJjX2QwXCIsIGNhcHRpb246IFwiT3N2b2JvemVub1wiLCBkZXNjcmlwdGlvbjogLi4uKVxyXG4gICAgICAgICAqIEBwYXJhbSB7R2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdfSBbc2NvcGVdIHDFmcOtcGFkbsO9IHNjb3BlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGFkZENhc3RrYUQwKGNvbHVtbnM6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQsIHBhcmFtcz86IEdHcmlkQ29sdW1uLCBzY29wZT86IEdpbi5XZWJDbGllbnQuR1Njb3BlT3B0aW9uTGV2ZWxbXSk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBzbG91cGNlIHBybyDEjcOhc3RrdVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKEVrby5HcmlkLkNvbHVtbi5hZGRTY29wZVRvQ29sdW1uUGFyYW1zKCQuZXh0ZW5kKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImNfZDBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9zdm9ib3plbm9cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJvc3ZvYm96ZW5vIG9kIERQSFwiXHJcbiAgICAgICAgICAgICAgICB9LCBwYXJhbXMpLCBzY29wZVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWlkw6Fuw60gc2xvdXBjZSBaw6FrbGFkIHBydm7DrSBzbsOtxb5lbsOhIGRvIGV4aXN0dWrDrWPDrWhvIGdyaWRmb3JtYXR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRGF0YS5HcmlkRm9ybWF0fSBjb2x1bW5zIGdyaWRmb3JtYXRcclxuICAgICAgICAgKiBAcGFyYW0ge0dHcmlkQ29sdW1ufSBbcGFyYW1zXSBkYWzFocOtIHZsYXN0bm9zdGkgc2xvdXBjZSAocMWZZWRkZWZpbm92w6kganNvdSBuYW1lOiBcImNfejFcIiwgY2FwdGlvbjogXCJaw6FrbGFkIHBydm7DrSBzbsOtxb5lbsOhXCIsIGRlc2NyaXB0aW9uOiAuLi4pXHJcbiAgICAgICAgICogQHBhcmFtIHtHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW119IFtzY29wZV0gcMWZw61wYWRuw70gc2NvcGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gYWRkQ2FzdGthWjEoY29sdW1uczogR29yZGljLkRhdGEuR3JpZEZvcm1hdCwgcGFyYW1zPzogR0dyaWRDb2x1bW4sIHNjb3BlPzogR2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHNsb3VwY2UgcHJvIMSNw6FzdGt1XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oRWtvLkdyaWQuQ29sdW1uLmFkZFNjb3BlVG9Db2x1bW5QYXJhbXMoJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3oxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiY196MVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWsOha2xhZCBwcnZuw60gc27DrcW+ZW7DoVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInrDoWtsYWQgdiBwcnZuw60gc27DrcW+ZW7DqSBzYXpixJsgRFBIXCJcclxuICAgICAgICAgICAgICAgIH0sIHBhcmFtcyksIHNjb3BlXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaWTDoW7DrSBzbG91cGNlIERQSCBwcnZuw60gc27DrcW+ZW7DoSBkbyBleGlzdHVqw61jw61obyBncmlkZm9ybWF0dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkRhdGEuR3JpZEZvcm1hdH0gY29sdW1ucyBncmlkZm9ybWF0XHJcbiAgICAgICAgICogQHBhcmFtIHtHR3JpZENvbHVtbn0gW3BhcmFtc10gZGFsxaHDrSB2bGFzdG5vc3RpIHNsb3VwY2UgKHDFmWVkZGVmaW5vdsOpIGpzb3UgbmFtZTogXCJjX2QxXCIsIGNhcHRpb246IFwiRFBIIHBydm7DrSBzbsOtxb5lbsOhXCIsIGRlc2NyaXB0aW9uOiAuLi4pXHJcbiAgICAgICAgICogQHBhcmFtIHtHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW119IFtzY29wZV0gcMWZw61wYWRuw70gc2NvcGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gYWRkQ2FzdGthRDEoY29sdW1uczogR29yZGljLkRhdGEuR3JpZEZvcm1hdCwgcGFyYW1zPzogR0dyaWRDb2x1bW4sIHNjb3BlPzogR2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHNsb3VwY2UgcHJvIMSNw6FzdGt1XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oRWtvLkdyaWQuQ29sdW1uLmFkZFNjb3BlVG9Db2x1bW5QYXJhbXMoJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiY19kMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRFBIIHBydm7DrSBzbsOtxb5lbsOhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiZGHFiCB2IHBydm7DrSBzbsOtxb5lbsOpIHNhemLEmyBEUEhcIlxyXG4gICAgICAgICAgICAgICAgfSwgcGFyYW1zKSwgc2NvcGVcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlpZMOhbsOtIHNsb3VwY2UgWsOha2xhZCB6w6FrbGFkbsOtIGRvIGV4aXN0dWrDrWPDrWhvIGdyaWRmb3JtYXR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRGF0YS5HcmlkRm9ybWF0fSBjb2x1bW5zIGdyaWRmb3JtYXRcclxuICAgICAgICAgKiBAcGFyYW0ge0dHcmlkQ29sdW1ufSBbcGFyYW1zXSBkYWzFocOtIHZsYXN0bm9zdGkgc2xvdXBjZSAocMWZZWRkZWZpbm92w6kganNvdSBuYW1lOiBcImNfejJcIiwgY2FwdGlvbjogXCJaw6FrbGFkIHrDoWtsYWRuw61cIiwgZGVzY3JpcHRpb246IC4uLilcclxuICAgICAgICAgKiBAcGFyYW0ge0dpbi5XZWJDbGllbnQuR1Njb3BlT3B0aW9uTGV2ZWxbXX0gW3Njb3BlXSBwxZnDrXBhZG7DvSBzY29wZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBhZGRDYXN0a2FaMihjb2x1bW5zOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0LCBwYXJhbXM/OiBHR3JpZENvbHVtbiwgc2NvcGU/OiBHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW10pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gc2xvdXBjZSBwcm8gxI3DoXN0a3VcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbihFa28uR3JpZC5Db2x1bW4uYWRkU2NvcGVUb0NvbHVtblBhcmFtcygkLmV4dGVuZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejJcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJjX3oyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaw6FrbGFkIHrDoWtsYWRuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ6w6FrbGFkIHYgesOha2xhZG7DrSBzYXpixJsgRFBIXCJcclxuICAgICAgICAgICAgICAgIH0sIHBhcmFtcyksIHNjb3BlXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaWTDoW7DrSBzbG91cGNlIERQSCB6w6FrbGFkbsOtIGRvIGV4aXN0dWrDrWPDrWhvIGdyaWRmb3JtYXR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRGF0YS5HcmlkRm9ybWF0fSBjb2x1bW5zIGdyaWRmb3JtYXRcclxuICAgICAgICAgKiBAcGFyYW0ge0dHcmlkQ29sdW1ufSBbcGFyYW1zXSBkYWzFocOtIHZsYXN0bm9zdGkgc2xvdXBjZSAocMWZZWRkZWZpbm92w6kganNvdSBuYW1lOiBcImNfZDJcIiwgY2FwdGlvbjogXCJEUEggesOha2xhZG7DrVwiLCBkZXNjcmlwdGlvbjogLi4uKVxyXG4gICAgICAgICAqIEBwYXJhbSB7R2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdfSBbc2NvcGVdIHDFmcOtcGFkbsO9IHNjb3BlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGFkZENhc3RrYUQyKGNvbHVtbnM6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQsIHBhcmFtcz86IEdHcmlkQ29sdW1uLCBzY29wZT86IEdpbi5XZWJDbGllbnQuR1Njb3BlT3B0aW9uTGV2ZWxbXSk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBzbG91cGNlIHBybyDEjcOhc3RrdVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKEVrby5HcmlkLkNvbHVtbi5hZGRTY29wZVRvQ29sdW1uUGFyYW1zKCQuZXh0ZW5kKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImNfZDJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRQSCB6w6FrbGFkbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiZGHFiCB2IHrDoWtsYWRuw60gc2F6YsSbIERQSFwiXHJcbiAgICAgICAgICAgICAgICB9LCBwYXJhbXMpLCBzY29wZVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWlkw6Fuw60gc2xvdXBjZSBaw6FrbGFkIGRydWjDoSBzbsOtxb5lbsOhIGRvIGV4aXN0dWrDrWPDrWhvIGdyaWRmb3JtYXR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRGF0YS5HcmlkRm9ybWF0fSBjb2x1bW5zIGdyaWRmb3JtYXRcclxuICAgICAgICAgKiBAcGFyYW0ge0dHcmlkQ29sdW1ufSBbcGFyYW1zXSBkYWzFocOtIHZsYXN0bm9zdGkgc2xvdXBjZSAocMWZZWRkZWZpbm92w6kganNvdSBuYW1lOiBcImNfejNcIiwgY2FwdGlvbjogXCJaw6FrbGFkIGRydWjDoSBzbsOtxb5lbsOhXCIsIGRlc2NyaXB0aW9uOiAuLi4pXHJcbiAgICAgICAgICogQHBhcmFtIHtHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW119IFtzY29wZV0gcMWZw61wYWRuw70gc2NvcGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gYWRkQ2FzdGthWjMoY29sdW1uczogR29yZGljLkRhdGEuR3JpZEZvcm1hdCwgcGFyYW1zPzogR0dyaWRDb2x1bW4sIHNjb3BlPzogR2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHNsb3VwY2UgcHJvIMSNw6FzdGt1XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oRWtvLkdyaWQuQ29sdW1uLmFkZFNjb3BlVG9Db2x1bW5QYXJhbXMoJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3ozXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiY196M1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWsOha2xhZCBkcnVow6Egc27DrcW+ZW7DoVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInrDoWtsYWQgdiBkcnVow6kgc27DrcW+ZW7DqSBzYXpixJsgRFBIXCJcclxuICAgICAgICAgICAgICAgIH0sIHBhcmFtcyksIHNjb3BlXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaWTDoW7DrSBzbG91cGNlIERQSCBkcnVow6Egc27DrcW+ZW7DoSBkbyBleGlzdHVqw61jw61obyBncmlkZm9ybWF0dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkRhdGEuR3JpZEZvcm1hdH0gY29sdW1ucyBncmlkZm9ybWF0XHJcbiAgICAgICAgICogQHBhcmFtIHtHR3JpZENvbHVtbn0gW3BhcmFtc10gZGFsxaHDrSB2bGFzdG5vc3RpIHNsb3VwY2UgKHDFmWVkZGVmaW5vdsOpIGpzb3UgbmFtZTogXCJjX2QzXCIsIGNhcHRpb246IFwiRFBIIGRydWjDoSBzbsOtxb5lbsOhXCIsIGRlc2NyaXB0aW9uOiAuLi4pXHJcbiAgICAgICAgICogQHBhcmFtIHtHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW119IFtzY29wZV0gcMWZw61wYWRuw70gc2NvcGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gYWRkQ2FzdGthRDMoY29sdW1uczogR29yZGljLkRhdGEuR3JpZEZvcm1hdCwgcGFyYW1zPzogR0dyaWRDb2x1bW4sIHNjb3BlPzogR2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHNsb3VwY2UgcHJvIMSNw6FzdGt1XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oRWtvLkdyaWQuQ29sdW1uLmFkZFNjb3BlVG9Db2x1bW5QYXJhbXMoJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiY19kM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRFBIIGRydWjDoSBzbsOtxb5lbsOhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiZGHFiCB2IGRydWjDqSBzbsOtxb5lbsOpIHNhemLEmyBEUEhcIlxyXG4gICAgICAgICAgICAgICAgfSwgcGFyYW1zKSwgc2NvcGVcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlpZMOhbsOtIHNsb3VwY2UgWsOha2xhZCB0xZlldMOtIHNuw63FvmVuw6EgZG8gZXhpc3R1asOtY8OtaG8gZ3JpZGZvcm1hdHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5EYXRhLkdyaWRGb3JtYXR9IGNvbHVtbnMgZ3JpZGZvcm1hdFxyXG4gICAgICAgICAqIEBwYXJhbSB7R0dyaWRDb2x1bW59IFtwYXJhbXNdIGRhbMWhw60gdmxhc3Rub3N0aSBzbG91cGNlIChwxZllZGRlZmlub3bDqSBqc291IG5hbWU6IFwiY196NFwiLCBjYXB0aW9uOiBcIlrDoWtsYWQgdMWZZXTDrSBzbsOtxb5lbsOhXCIsIGRlc2NyaXB0aW9uOiAuLi4pXHJcbiAgICAgICAgICogQHBhcmFtIHtHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW119IFtzY29wZV0gcMWZw61wYWRuw70gc2NvcGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gYWRkQ2FzdGthWjQoY29sdW1uczogR29yZGljLkRhdGEuR3JpZEZvcm1hdCwgcGFyYW1zPzogR0dyaWRDb2x1bW4sIHNjb3BlPzogR2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHNsb3VwY2UgcHJvIMSNw6FzdGt1XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oRWtvLkdyaWQuQ29sdW1uLmFkZFNjb3BlVG9Db2x1bW5QYXJhbXMoJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3o0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiY196NFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWsOha2xhZCB0xZlldMOtIHNuw63FvmVuw6FcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ6w6FrbGFkIHZlIHTFmWV0w60gc27DrcW+ZW7DqSBzYXpixJsgRFBIXCJcclxuICAgICAgICAgICAgICAgIH0sIHBhcmFtcyksIHNjb3BlXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaWTDoW7DrSBzbG91cGNlIERQSCB0xZlldMOtIHNuw63FvmVuw6EgZG8gZXhpc3R1asOtY8OtaG8gZ3JpZGZvcm1hdHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5EYXRhLkdyaWRGb3JtYXR9IGNvbHVtbnMgZ3JpZGZvcm1hdFxyXG4gICAgICAgICAqIEBwYXJhbSB7R0dyaWRDb2x1bW59IFtwYXJhbXNdIGRhbMWhw60gdmxhc3Rub3N0aSBzbG91cGNlIChwxZllZGRlZmlub3bDqSBqc291IG5hbWU6IFwiY19kNFwiLCBjYXB0aW9uOiBcIkRQSCB0xZlldMOtIHNuw63FvmVuw6FcIiwgZGVzY3JpcHRpb246IC4uLilcclxuICAgICAgICAgKiBAcGFyYW0ge0dpbi5XZWJDbGllbnQuR1Njb3BlT3B0aW9uTGV2ZWxbXX0gW3Njb3BlXSBwxZnDrXBhZG7DvSBzY29wZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBhZGRDYXN0a2FENChjb2x1bW5zOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0LCBwYXJhbXM/OiBHR3JpZENvbHVtbiwgc2NvcGU/OiBHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW10pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gc2xvdXBjZSBwcm8gxI3DoXN0a3VcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbihFa28uR3JpZC5Db2x1bW4uYWRkU2NvcGVUb0NvbHVtblBhcmFtcygkLmV4dGVuZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDRcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJjX2Q0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEUEggdMWZZXTDrSBzbsOtxb5lbsOhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiZGHFiCB2IHTFmWV0w60gc27DrcW+ZW7DqSBzYXpixJsgRFBIXCJcclxuICAgICAgICAgICAgICAgIH0sIHBhcmFtcyksIHNjb3BlXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaWTDoW7DrSBzbG91cGNlIFphb2tyb3VobGVubyBkbyBleGlzdHVqw61jw61obyBncmlkZm9ybWF0dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkRhdGEuR3JpZEZvcm1hdH0gY29sdW1ucyBncmlkZm9ybWF0XHJcbiAgICAgICAgICogQHBhcmFtIHtHR3JpZENvbHVtbn0gW3BhcmFtc10gZGFsxaHDrSB2bGFzdG5vc3RpIHNsb3VwY2UgKHDFmWVkZGVmaW5vdsOpIGpzb3UgbmFtZTogXCJjX3phb1wiLCBjYXB0aW9uOiBcIlphb2tyb3VobGVub1wiLCBkZXNjcmlwdGlvbjogLi4uKVxyXG4gICAgICAgICAqIEBwYXJhbSB7R2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdfSBbc2NvcGVdIHDFmcOtcGFkbsO9IHNjb3BlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGFkZENhc3RrYVphbyhjb2x1bW5zOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0LCBwYXJhbXM/OiBHR3JpZENvbHVtbiwgc2NvcGU/OiBHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW10pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gc2xvdXBjZSBwcm8gxI3DoXN0a3VcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbihFa28uR3JpZC5Db2x1bW4uYWRkU2NvcGVUb0NvbHVtblBhcmFtcygkLmV4dGVuZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemFvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiY196YW9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphb2tyb3VobGVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInphb2tyb3VobGVuw60gcmVrYXBpdHVsYWNlIERQSFwiXHJcbiAgICAgICAgICAgICAgICB9LCBwYXJhbXMpLCBzY29wZVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcblxyXG59Il19