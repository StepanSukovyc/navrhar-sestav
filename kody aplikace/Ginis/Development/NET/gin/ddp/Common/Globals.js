"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.Globals.ts                             </Name>
//    <Description> Definice constant v modulu DDP                              </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>
/**
 * Definice constant v modulu DDP
 * @author Martin Hanuš
 * @date 16.5.2024
 * @since 524.1.0.0
 */
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Common;
            (function (Common) {
                var Globals;
                (function (Globals) {
                    // TODO: Časem předělat z WebClienta do Interface tak aby se do dostalo do TS a byl tak jednotný soubor
                    // TODO: N:\ginis\Development\NET\Gordic.Ddp.Interface\Base\GDdpGlobalsBase.cs
                    class sgStateColor {
                    }
                    //** error #C63C3C (červená) */
                    sgStateColor.cErrorRed = "error"; // #C63C3C (červená)
                    //** important #ED1E79 (růžová) */
                    sgStateColor.cImportantPink = "important"; // #ED1E79 (růžová)
                    //** warning #FFB266 (žlutá) */
                    sgStateColor.cWarningYellow = "warning"; // #FFB266 (žlutá)
                    //** success #27B779 (zelená) */
                    sgStateColor.cSuccesGreen = "success"; // #27B779 (zelená)
                    //** info #6699FF (modrá) */
                    sgStateColor.cInfoBlue = "info"; // #6699FF (modrá)
                    Globals.sgStateColor = sgStateColor;
                    class sgNull {
                    }
                    //#region ---Nulláky---
                    /**
                     * Nullák - identifikátor vlastního systému GINIS */
                    sgNull.nullIxsExt = '0000AIE00006'; //!identifikátor vlastního systému GINIS
                    /**
                     * Nullák - identifikátor (PID) */
                    sgNull.NullIxp = '0000P000000N'; //! IXP
                    /**
                     * Nullák - identifikátor X (PID X) */
                    sgNull.NullIxpX = '0000X0000003'; //! IXP-X
                    /**
                     * Nullák - Spisový uzel */
                    sgNull.NullSu = '0000SS00000O'; //! Spisový uzel
                    /**
                     * Nullák - Úložné místo */
                    sgNull.NullUlm = '0000SM00000I'; //! úložné místo
                    /**
                     * Nullák - Funkce */
                    sgNull.NullFun = '0000SF00000Z'; //! Funkce
                    /**
                     * Nullák - Ref */
                    sgNull.NullRef = '0000SR00000B'; // Ref
                    /**
                     * Nullák - Orj */
                    sgNull.NullOrj = '0000SG00000C'; // Orj
                    /**
                     * Nullák - Spz */
                    sgNull.NullSpz = '000003000003'; // Spz
                    /**
                     * Nullák - Typ písemnosti */
                    sgNull.NullTyp = '00000400000G'; //! typ písemnosti
                    /**
                     * Nullák - Jec - 0000J000000T */
                    sgNull.NullJec = '0000J000000T'; // Jec
                    /**
                     * Nullák - externího subjektu - 0000SE00000M */
                    sgNull.NullEsu = '0000SE00000M'; //! ext.subjekt
                    /**
                     * Nullák - způsob zaúčtování - 0000ADZ0000A */
                    sgNull.NullZpz = "0000ADZ0000A"; //! způsob zaúčtování
                    /** Nullák - varianty předkontací - 0000ADV0000E */
                    sgNull.NullVpk = "0000ADV0000E"; //! varianta předkontací
                    /** Nullák - skupina vymahani - 0000ANV00000 */
                    sgNull.nullSkv = "0000ANV00000"; //! skupina vymáhání
                    /// <summary>Nulák umístění (pro podání)</summary>
                    sgNull.nullUmisteni = "0000AWM00000";
                    /// <summary>Nulák kontace</summary>
                    sgNull.nullKontace = "0000ADK00007";
                    /// <summary>Nulák šablona IXS_DSU</summary>
                    sgNull.nullSablony = "PODANIBEZSABL";
                    //#endregion ---Nulláky---
                    //!347.1 07.08.05 vyhledávání dle RČ
                    sgNull.sg_rcvyhlNo = 0; //'0', // Ne
                    sgNull.sg_rcvyhlYes = 1; //'1', // Ano
                    Globals.sgNull = sgNull;
                    class ngAgenda {
                    }
                    //#region ---Typy agend---
                    ngAgenda.typAg_Core = 0; // typ agendy   0 = jádro
                    ngAgenda.typAg_Flow = 10; // typ agendy  10 = tok dokumentů
                    ngAgenda.typAg_Ssl = 20; // typ agendy  20 = SSL
                    ngAgenda.typAg_Eko = 30; // typ agendy  30 = eko jádro
                    ngAgenda.typAg_Uct = 40; // typ agendy  40 = účetnictví
                    ngAgenda.typAg_Roz = 50; // typ agendy  50 = rozpočet
                    ngAgenda.typAg_Mat = 60; // typ agendy  60 = majetek
                    ngAgenda.typAg_Kdf = 70; // typ agendy  70 = KDF
                    ngAgenda.typAg_Kof = 80; // typ agendy  80 = KOF
                    ngAgenda.typAg_Pok = 90; // typ agendy  90 = pokladna
                    ngAgenda.typAg_Ban = 100; // typ agendy 100 = komunikace s bankou
                    ngAgenda.typAg_Sml = 110; // typ agendy 110 = smlouvy
                    ngAgenda.typAg_Pla = 120; // typ agendy 120 = plán
                    ngAgenda.typAg_Odl = 130; // typ agendy 130 = odložené zpracování
                    ngAgenda.typAg_Uko = 140; // typ agendy 140 = úkoly
                    ngAgenda.typAg_Ucr = 150; // typ agendy 150 = UCR
                    ngAgenda.typAg_Rep = 160; // typ agendy 160 = přenosy dat
                    ngAgenda.typAg_Vpg = 170; // typ agendy 170 = vnitřní pošta
                    ngAgenda.typAg_Pou = 180; // typ agendy 180 = poukazy
                    ngAgenda.typAg_Pod = 190; // typ agendy 190 = podatelna
                    ngAgenda.typAg_Vyp = 200; // typ agendy 200 = výpravna
                    ngAgenda.typAg_Gbd = 210; // typ agendy 210 = generátor výkazů
                    ngAgenda.typAg_Obp = 220; // typ agendy 220 = ostatní bankovní pohyby
                    ngAgenda.typAg_Pre = 230; // typ agendy 230 = převodní poukazy
                    ngAgenda.typAg_Vyk = 240; // typ agendy 240 = výkazy
                    ngAgenda.typAg_Maj = 260; // typ agendy 260 = majetek civilní
                    Globals.ngAgenda = ngAgenda;
                })(Globals = Common.Globals || (Common.Globals = {}));
            })(Common = WebClient.Common || (WebClient.Common = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2xvYmFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdsb2JhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUVqQjs7Ozs7R0FLRztBQUNILElBQVUsTUFBTSxDQXlHZjtBQXpHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5R25CO0lBekdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5RzdCO1FBekdvQixXQUFBLFNBQVM7WUFBQyxJQUFBLE1BQU0sQ0F5R3BDO1lBekc4QixXQUFBLE1BQU07Z0JBQUMsSUFBQSxPQUFPLENBeUc1QztnQkF6R3FDLFdBQUEsT0FBTztvQkFDekMsdUdBQXVHO29CQUN2Ryw4RUFBOEU7b0JBQzlFLE1BQWEsWUFBWTs7b0JBQ3JCLCtCQUErQjtvQkFDZixzQkFBUyxHQUFXLE9BQU8sQ0FBQyxDQUFPLG9CQUFvQjtvQkFDdkUsa0NBQWtDO29CQUNsQiwyQkFBYyxHQUFXLFdBQVcsQ0FBQyxDQUFFLG1CQUFtQjtvQkFDMUUsK0JBQStCO29CQUNmLDJCQUFjLEdBQVcsU0FBUyxDQUFDLENBQUksa0JBQWtCO29CQUN6RSxnQ0FBZ0M7b0JBQ2hCLHlCQUFZLEdBQVcsU0FBUyxDQUFDLENBQUksbUJBQW1CO29CQUN4RSw0QkFBNEI7b0JBQ1osc0JBQVMsR0FBVyxNQUFNLENBQUMsQ0FBTSxrQkFBa0I7b0JBVjFELG9CQUFZLGVBV3hCLENBQUE7b0JBQ0QsTUFBYSxNQUFNOztvQkFFZix1QkFBdUI7b0JBQ3ZCO3dFQUNvRDtvQkFDcEMsaUJBQVUsR0FBRyxjQUFjLENBQUMsQ0FBQyx3Q0FBd0M7b0JBQ3JGO3NEQUNrQztvQkFDbEIsY0FBTyxHQUFHLGNBQWMsQ0FBQyxDQUFBLE9BQU87b0JBQ2hEOzBEQUNzQztvQkFDdEIsZUFBUSxHQUFH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b0M7b0JBQ3RELGtCQUFTLEdBQUcsR0FBRyxDQUFDLENBQUUsMkNBQTJDO29CQUM3RCxrQkFBUyxHQUFHLEdBQUcsQ0FBQyxDQUFFLG9DQUFvQztvQkFDdEQsa0JBQVMsR0FBRyxHQUFHLENBQUMsQ0FBRSwwQkFBMEI7b0JBQzVDLGtCQUFTLEdBQUcsR0FBRyxDQUFDLENBQUUsbUNBQW1DO29CQTNCNUQsZ0JBQVEsV0E2QnBCLENBQUE7Z0JBQ0wsQ0FBQyxFQXpHcUMsT0FBTyxHQUFQLGNBQU8sS0FBUCxjQUFPLFFBeUc1QztZQUFELENBQUMsRUF6RzhCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBeUdwQztRQUFELENBQUMsRUF6R29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXlHN0I7SUFBRCxDQUFDLEVBekdnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF5R25CO0FBQUQsQ0FBQyxFQXpHUyxNQUFNLEtBQU4sTUFBTSxRQXlHZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HbG9iYWxzLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gRGVmaW5pY2UgY29uc3RhbnQgdiBtb2R1bHUgRERQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0wNC0xNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuLyoqXHJcbiAqIERlZmluaWNlIGNvbnN0YW50IHYgbW9kdWx1IEREUFxyXG4gKiBAYXV0aG9yIE1hcnRpbiBIYW51xaFcclxuICogQGRhdGUgMTYuNS4yMDI0XHJcbiAqIEBzaW5jZSA1MjQuMS4wLjBcclxuICovXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uR2xvYmFscyB7XHJcbiAgICAvLyBUT0RPOiDEjGFzZW0gcMWZZWTEm2xhdCB6IFdlYkNsaWVudGEgZG8gSW50ZXJmYWNlIHRhayBhYnkgc2UgZG8gZG9zdGFsbyBkbyBUUyBhIGJ5bCB0YWsgamVkbm90bsO9IHNvdWJvclxyXG4gICAgLy8gVE9ETzogTjpcXGdpbmlzXFxEZXZlbG9wbWVudFxcTkVUXFxHb3JkaWMuRGRwLkludGVyZmFjZVxcQmFzZVxcR0RkcEdsb2JhbHNCYXNlLmNzXHJcbiAgICBleHBvcnQgY2xhc3Mgc2dTdGF0ZUNvbG9yIHtcclxuICAgICAgICAvLyoqIGVycm9yICNDNjNDM0MgKMSNZXJ2ZW7DoSkgKi9cclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgY0Vycm9yUmVkOiBHU3RhdGUgPSBcImVycm9yXCI7ICAgICAgIC8vICNDNjNDM0MgKMSNZXJ2ZW7DoSlcclxuICAgICAgICAvLyoqIGltcG9ydGFudCAjRUQxRTc5IChyxa/Fvm92w6EpICovXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IGNJbXBvcnRhbnRQaW5rOiBHU3RhdGUgPSBcImltcG9ydGFudFwiOyAgLy8gI0VEMUU3OSAocsWvxb5vdsOhKVxyXG4gICAgICAgIC8vKiogd2FybmluZyAjRkZCMjY2ICjFvmx1dMOhKSAqL1xyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBjV2FybmluZ1llbGxvdzogR1N0YXRlID0gXCJ3YXJuaW5nXCI7ICAgIC8vICNGRkIyNjYgKMW+bHV0w6EpXHJcbiAgICAgICAgLy8qKiBzdWNjZXNzICMyN0I3NzkgKHplbGVuw6EpICovXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IGNTdWNjZXNHcmVlbjogR1N0YXRlID0gXCJzdWNjZXNzXCI7ICAgIC8vICMyN0I3NzkgKHplbGVuw6EpXHJcbiAgICAgICAgLy8qKiBpbmZvICM2Njk5RkYgKG1vZHLDoSkgKi9cclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgY0luZm9CbHVlOiBHU3RhdGUgPSBcImluZm9cIjsgICAgICAvLyAjNjY5OUZGIChtb2Ryw6EpXHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3Mgc2dOdWxsIHtcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIC0tLU51bGzDoWt5LS0tXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE51bGzDoWsgLSBpZGVudGlmaWvDoXRvciB2bGFzdG7DrWhvIHN5c3TDqW11IEdJTklTICovXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IG51bGxJeHNFeHQgPSAnMDAwMEFJRTAwMDA2JzsgLy8haWRlbnRpZmlrw6F0b3Igdmxhc3Ruw61obyBzeXN0w6ltdSBHSU5JU1xyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBOdWxsw6FrIC0gaWRlbnRpZmlrw6F0b3IgKFBJRCkgKi9cclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgTnVsbEl4cCA9ICcwMDAwUDAwMDAwME4nOy8vISBJWFBcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogTnVsbMOhayAtIGlkZW50aWZpa8OhdG9yIFggKFBJRCBYKSAqL1xyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBOdWxsSXhwWCA9ICcwMDAwWDAwMDAwMDMnOy8vISBJWFAtWFxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBOdWxsw6FrIC0gU3Bpc292w70gdXplbCAqL1xyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBOdWxsU3UgPSAnMDAwMFNTMDAwMDBPJzsvLyEgU3Bpc292w70gdXplbFxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBOdWxsw6FrIC0gw5psb8W+bsOpIG3DrXN0byAqL1xyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBOdWxsVWxtID0gJzAwMDBTTTAwMDAwSSc7Ly8hIMO6bG/Fvm7DqSBtw61zdG9cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogTnVsbMOhayAtIEZ1bmtjZSAqL1xyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBOdWxsRnVuID0gJzAwMDBTRjAwMDAwWic7Ly8hIEZ1bmtjZVxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBOdWxsw6FrIC0gUmVmICovXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IE51bGxSZWYgPSAnMDAwMFNSMDAwMDBCJzsvLyBSZWZcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogTnVsbMOhayAtIE9yaiAqL1xyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBOdWxsT3JqID0gJzAwMDBTRzAwMDAwQyc7Ly8gT3JqXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE51bGzDoWsgLSBTcHogKi9cclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgTnVsbFNweiA9ICcwMDAwMDMwMDAwMDMnOy8vIFNwelxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBOdWxsw6FrIC0gVHlwIHDDrXNlbW5vc3RpICovXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IE51bGxUeXAgPSAnMDAwMDA0MDAwMDBHJzsvLyEgdHlwIHDDrXNlbW5vc3RpXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE51bGzDoWsgLSBKZWMgLSAwMDAwSjAwMDAwMFQgKi9cclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgTnVsbEplYyA9ICcwMDAwSjAwMDAwMFQnOy8vIEplY1xyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBOdWxsw6FrIC0gZXh0ZXJuw61obyBzdWJqZWt0dSAtIDAwMDBTRTAwMDAwTSAqL1xyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSBOdWxsRXN1ID0gJzAwMDBTRTAwMDAwTSc7Ly8hIGV4dC5zdWJqZWt0XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE51bGzDoWsgLSB6cMWvc29iIHphw7rEjXRvdsOhbsOtIC0gMDAwMEFEWjAwMDBBICovXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IE51bGxacHogPSBcIjAwMDBBRFowMDAwQVwiOy8vISB6cMWvc29iIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgLyoqIE51bGzDoWsgLSB2YXJpYW50eSBwxZllZGtvbnRhY8OtIC0gMDAwMEFEVjAwMDBFICovXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IE51bGxWcGsgPSBcIjAwMDBBRFYwMDAwRVwiOy8vISB2YXJpYW50YSBwxZllZGtvbnRhY8OtXHJcbiAgICAgICAgLyoqIE51bGzDoWsgLSBza3VwaW5hIHZ5bWFoYW5pIC0gMDAwMEFOVjAwMDAwICovXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IG51bGxTa3YgPSBcIjAwMDBBTlYwMDAwMFwiOy8vISBza3VwaW5hIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5Pk51bMOhayB1bcOtc3TEm27DrSAocHJvIHBvZMOhbsOtKTwvc3VtbWFyeT5cclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgbnVsbFVtaXN0ZW5pID0gXCIwMDAwQVdNMDAwMDBcIjtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+TnVsw6FrIGtvbnRhY2U8L3N1bW1hcnk+XHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IG51bGxLb250YWNlID0gXCIwMDAwQURLMDAwMDdcIjtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+TnVsw6FrIMWhYWJsb25hIElYU19EU1U8L3N1bW1hcnk+XHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IG51bGxTYWJsb255ID0gXCJQT0RBTklCRVpTQUJMXCI7XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIC0tLU51bGzDoWt5LS0tXHJcblxyXG4gICAgICAgIC8vITM0Ny4xIDA3LjA4LjA1IHZ5aGxlZMOhdsOhbsOtIGRsZSBSxIxcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgc2dfcmN2eWhsTm8gPSAwOyAgLy8nMCcsIC8vIE5lXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHNnX3JjdnlobFllcyA9IDE7IC8vJzEnLCAvLyBBbm9cclxuICAgICAgICBzdGF0aWMgc2dfTnVsbEVzdTogc3RyaW5nO1xyXG4gICAgICAgIHN0YXRpYyBzZ19OdWxsUmVmOiBzdHJpbmc7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgbmdBZ2VuZGEge1xyXG4gICAgICAgIC8vI3JlZ2lvbiAtLS1UeXB5IGFnZW5kLS0tXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHR5cEFnX0NvcmUgPSAwOyAgIC8vIHR5cCBhZ2VuZHkgICAwID0gasOhZHJvXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHR5cEFnX0Zsb3cgPSAxMDsgIC8vIHR5cCBhZ2VuZHkgIDEwID0gdG9rIGRva3VtZW50xa9cclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfU3NsID0gMjA7ICAgLy8gdHlwIGFnZW5keSAgMjAgPSBTU0xcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfRWtvID0gMzA7ICAgLy8gdHlwIGFnZW5keSAgMzAgPSBla28gasOhZHJvXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHR5cEFnX1VjdCA9IDQwOyAgIC8vIHR5cCBhZ2VuZHkgIDQwID0gw7rEjWV0bmljdHbDrVxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSB0eXBBZ19Sb3ogPSA1MDsgICAvLyB0eXAgYWdlbmR5ICA1MCA9IHJvenBvxI1ldFxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSB0eXBBZ19NYXQgPSA2MDsgICAvLyB0eXAgYWdlbmR5ICA2MCA9IG1hamV0ZWtcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfS2RmID0gNzA7ICAgLy8gdHlwIGFnZW5keSAgNzAgPSBLREZcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfS29mID0gODA7ICAgLy8gdHlwIGFnZW5keSAgODAgPSBLT0ZcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfUG9rID0gOTA7ICAgLy8gdHlwIGFnZW5keSAgOTAgPSBwb2tsYWRuYVxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSB0eXBBZ19CYW4gPSAxMDA7ICAvLyB0eXAgYWdlbmR5IDEwMCA9IGtvbXVuaWthY2UgcyBiYW5rb3VcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfU21sID0gMTEwOyAgLy8gdHlwIGFnZW5keSAxMTAgPSBzbWxvdXZ5XHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHR5cEFnX1BsYSA9IDEyMDsgIC8vIHR5cCBhZ2VuZHkgMTIwID0gcGzDoW5cclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfT2RsID0gMTMwOyAgLy8gdHlwIGFnZW5keSAxMzAgPSBvZGxvxb5lbsOpIHpwcmFjb3bDoW7DrVxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSB0eXBBZ19Va28gPSAxNDA7ICAvLyB0eXAgYWdlbmR5IDE0MCA9IMO6a29seVxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSB0eXBBZ19VY3IgPSAxNTA7ICAvLyB0eXAgYWdlbmR5IDE1MCA9IFVDUlxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSB0eXBBZ19SZXAgPSAxNjA7ICAvLyB0eXAgYWdlbmR5IDE2MCA9IHDFmWVub3N5IGRhdFxyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSB0eXBBZ19WcGcgPSAxNzA7ICAvLyB0eXAgYWdlbmR5IDE3MCA9IHZuaXTFmW7DrSBwb8WhdGFcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfUG91ID0gMTgwOyAgLy8gdHlwIGFnZW5keSAxODAgPSBwb3VrYXp5XHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHR5cEFnX1BvZCA9IDE5MDsgIC8vIHR5cCBhZ2VuZHkgMTkwID0gcG9kYXRlbG5hXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHR5cEFnX1Z5cCA9IDIwMDsgIC8vIHR5cCBhZ2VuZHkgMjAwID0gdsO9cHJhdm5hXHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHR5cEFnX0diZCA9IDIxMDsgIC8vIHR5cCBhZ2VuZHkgMjEwID0gZ2VuZXLDoXRvciB2w71rYXrFr1xyXG4gICAgICAgIHN0YXRpYyByZWFkb25seSB0eXBBZ19PYnAgPSAyMjA7ICAvLyB0eXAgYWdlbmR5IDIyMCA9IG9zdGF0bsOtIGJhbmtvdm7DrSBwb2h5YnlcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfUHJlID0gMjMwOyAgLy8gdHlwIGFnZW5keSAyMzAgPSBwxZlldm9kbsOtIHBvdWthenlcclxuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgdHlwQWdfVnlrID0gMjQwOyAgLy8gdHlwIGFnZW5keSAyNDAgPSB2w71rYXp5XHJcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IHR5cEFnX01haiA9IDI2MDsgIC8vIHR5cCBhZ2VuZHkgMjYwID0gbWFqZXRlayBjaXZpbG7DrVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiAtLS1UeXB5IGFnZW5kLS0tICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG59Il19