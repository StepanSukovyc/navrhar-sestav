"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlHromUvolneni.ts                    </Name>
//    <Description> Průvodce hromadného uvolnění prostředků                     </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-05-02                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            /**
             * Průvodce hromadného uvolnění prostředků
             * @param cnt content
             * @param mode režim práce 0=uvolnění, 1 =ukončení, 2 = přeevidence
             * @param rows pole dokladů
             * @param gridFormat gridformát pro průvodce
             * @param gridProfile profil pro grid
             * @param keys klíče seznamu/dto
             * @returns Promise
             */
            function hromadneUvolneniWizard(cnt, mode, rows, gridFormat, gridProfile, keys) {
                if (rows.length < 1) {
                    return $.Deferred().reject().promise();
                } //nevybrán žádný řádek
                return cnt.createServiceContent("Gordic.Sml.WebClient.GSmlUvolneni").call("GetDbParamsForHromFree", { mode: mode }).then((params) => {
                    var wizardChanged = false;
                    var wizardForm = new Gordic.Forms.Form({
                        name: "formHromUvolneni",
                        layoutDescriptor: "L1M1S1"
                    })
                        .addSection()
                        .addRow("jres:33600281") //RC 33600281 : Upravit celkovou částku
                        .addField("gcheck", {
                        name: "make"
                    })
                        .addRow("jres:33600282") //RC 33600282 : Upravit rozpis částky
                        .addField("gcheck", {
                        name: "make_rozpis"
                    })
                        .addRow("jres:33600283") //RC 33600283 : Stornovat doklad FK/PK
                        .addField("gcheck", {
                        name: "make_storno_pfk",
                        //editace je přístupná v případě obsluhy FK
                        //možnost volby dle parametru 'sml_rad_pfksto', 'SML – ŘP Režim ukončení platnosti dokladu PFK v okamžiku ukončení dokladu SML' - hodnota se přednastaví dle režimu práce
                        disabled: !(params.eko_rad_dfken > 0 && params.sml_rad_pfksto == 2),
                        //možnost volby dle parametru 'sml_rad_pfksto', 'SML – ŘP Režim ukončení platnosti dokladu PFK v okamžiku ukončení dokladu SML' - hodnota se přednastaví dle režimu práce
                        //platí tvrdá volba daná parametrem
                        defaultValue: (params.eko_rad_dfken > 0 && params.sml_rad_pfksto != 2) ? params.sml_rad_pfksto == 1 : false
                    });
                    cnt.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "HromadneUvolneni#",
                        title: "jres:33600284", //RC 33600284 : Hromadné uvolnění prostředků
                        gridFormat: gridFormat,
                        gridProfile: gridProfile,
                        keys: keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            var ixps = data.map((val, idx, arr) => { return val.ixp; });
                            return cnt.isl.SmlUvolneni.checkMassPermissionsBeforeFree({ ixps: ixps }).get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600285", //RC 33600285 : Výběr dokladů
                            title: "jres:33600286", //RC 33600286 : Zadání uvolnění
                            description: "jres:33600287", //RC 33600287 : Akce uvolní prostředky u vybraných (zaškrtnutých) dokladů podle vyplněného formuláře
                            showIndicator: true,
                            form: wizardForm,
                            formTabTitle: "jres:33600288", //RC 33600288 : Parametry uvolnění
                            enableFormFields: true,
                            nextAction: (model, data) => {
                                var ixps = data.map((val, idx, arr) => { return val.ixp; });
                                return cnt.isl.SmlUvolneni.massFree({ ixps: ixps, mode: mode, make: model.make, make_rozpis: model.make_rozpis, make_storno_pfk: model.make_storno_pfk }).get().then((result) => {
                                    wizardChanged = true;
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                var ixps = data.map((val, idx, arr) => { return val.ixp; });
                                return cnt.isl.SmlUvolneni.checkMassPermissionsBeforeFree({ ixps: ixps }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600087", //RC 33600087 : Výsledek
                            title: "jres:33600088", //RC 33600088 : Výsledek hromadné operace
                            form: wizardForm,
                            formTabTitle: "jres:33600288", //RC 33600288 : Parametry uvolnění
                            enableFormFields: false
                        },
                        completeDelegate: () => { }
                    });
                });
            }
            WebClient.hromadneUvolneniWizard = hromadneUvolneniWizard;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbEhyb21Vdm9sbmVuaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTbWxIcm9tVXZvbG5lbmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUdqQixJQUFVLE1BQU0sQ0FzRmY7QUF0RkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc0ZuQjtJQXRGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc0Y3QjtRQXRGb0IsV0FBQSxTQUFTO1lBQzFCOzs7Ozs7Ozs7ZUFTRztZQUNILFNBQWdCLHNCQUFzQixDQUFDLEdBQWEsRUFBRSxJQUFZLEVBQUUsSUFBYyxFQUFFLFVBQWtDLEVBQUUsV0FBNkIsRUFBRSxJQUF3QjtnQkFDM0ssSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUFDLENBQUMsQ0FBQyxzQkFBc0I7Z0JBQ3ZGLE9BQU8sR0FBRyxDQUFDLG9CQUFvQixDQUFDLG1DQUFtQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBeUQsRUFBRSxFQUFFO29CQUNuTCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2xDO3dCQUNJLElBQUksRUFBRSxrQkFBa0I7d0JBQ3hCLGdCQUFnQixFQUFFLFFBQVE7cUJBQzdCLENBQUM7eUJBQ0QsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyx1Q0FBdUM7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eUJBMEVyQyxDQUFBO1FBQ0wsQ0FBQyxFQXRGb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBc0Y3QjtJQUFELENBQUMsRUF0RmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXNGbkI7QUFBRCxDQUFDLEVBdEZTLE1BQU0sS0FBTixNQUFNLFFBc0ZmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuU21sLldlYkNsaWVudC5HU21sSHJvbVV2b2xuZW5pLnRzICAgICAgICAgICAgICAgICAgICA8L05hbWU+XG4vLyAgICA8RGVzY3JpcHRpb24+IFByxa92b2RjZSBocm9tYWRuw6lobyB1dm9sbsSbbsOtIHByb3N0xZllZGvFryAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjMtMDUtMDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cbi8vICA8L0ZpbGVIZWFkZXI+XG5cblxyXG5uYW1lc3BhY2UgR29yZGljLlNtbC5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcsWvdm9kY2UgaHJvbWFkbsOpaG8gdXZvbG7Em27DrSBwcm9zdMWZZWRrxa9cclxuICAgICAqIEBwYXJhbSBjbnQgY29udGVudFxyXG4gICAgICogQHBhcmFtIG1vZGUgcmXFvmltIHByw6FjZSAwPXV2b2xuxJtuw60sIDEgPXVrb27EjWVuw60sIDIgPSBwxZllZXZpZGVuY2VcclxuICAgICAqIEBwYXJhbSByb3dzIHBvbGUgZG9rbGFkxa9cclxuICAgICAqIEBwYXJhbSBncmlkRm9ybWF0IGdyaWRmb3Jtw6F0IHBybyBwcsWvdm9kY2VcclxuICAgICAqIEBwYXJhbSBncmlkUHJvZmlsZSBwcm9maWwgcHJvIGdyaWRcclxuICAgICAqIEBwYXJhbSBrZXlzIGtsw63EjWUgc2V6bmFtdS9kdG9cclxuICAgICAqIEByZXR1cm5zIFByb21pc2VcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGhyb21hZG5lVXZvbG5lbmlXaXphcmQoY250OiBHQ29udGVudCwgbW9kZTogbnVtYmVyLCByb3dzOiBvYmplY3RbXSwgZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdCwgZ3JpZFByb2ZpbGU6IEdyaWRQcm9maWxlPGFueT4sIGtleXM6IERhdGEuVmlld0tleXM8YW55Pikge1xyXG4gICAgICAgIGlmIChyb3dzLmxlbmd0aCA8IDEpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH0gLy9uZXZ5YnLDoW4gxb7DoWRuw70gxZnDoWRla1xyXG4gICAgICAgIHJldHVybiBjbnQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU21sVXZvbG5lbmlcIikuY2FsbChcIkdldERiUGFyYW1zRm9ySHJvbUZyZWVcIiwgeyBtb2RlOiBtb2RlIH0pLnRoZW4oKHBhcmFtczogeyBzbWxfcmFkX3Bma3N0bzogbnVtYmVyLCBla29fcmFkX2Rma2VuOiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgd2l6YXJkQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgd2l6YXJkRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZvcm1Icm9tVXZvbG5lbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAyODFcIikgLy9SQyAzMzYwMDI4MSA6IFVwcmF2aXQgY2Vsa292b3UgxI3DoXN0a3VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtYWtlXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDI4MlwiKSAvL1JDIDMzNjAwMjgyIDogVXByYXZpdCByb3pwaXMgxI3DoXN0a3lcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtYWtlX3JvenBpc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAyODNcIikgLy9SQyAzMzYwMDI4MyA6IFN0b3Jub3ZhdCBkb2tsYWQgRksvUEtcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtYWtlX3N0b3Jub19wZmtcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2VkaXRhY2UgamUgcMWZw61zdHVwbsOhIHYgcMWZw61wYWTEmyBvYnNsdWh5IEZLXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb8W+bm9zdCB2b2xieSBkbGUgcGFyYW1ldHJ1ICdzbWxfcmFkX3Bma3N0bycsICdTTUwg4oCTIMWYUCBSZcW+aW0gdWtvbsSNZW7DrSBwbGF0bm9zdGkgZG9rbGFkdSBQRksgdiBva2Ftxb5pa3UgdWtvbsSNZW7DrSBkb2tsYWR1IFNNTCcgLSBob2Rub3RhIHNlIHDFmWVkbmFzdGF2w60gZGxlIHJlxb5pbXUgcHLDoWNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEocGFyYW1zLmVrb19yYWRfZGZrZW4gPiAwICYmIHBhcmFtcy5zbWxfcmFkX3Bma3N0byA9PSAyKSxcclxuICAgICAgICAgICAgICAgICAgICAvL21vxb5ub3N0IHZvbGJ5IGRsZSBwYXJhbWV0cnUgJ3NtbF9yYWRfcGZrc3RvJywgJ1NNTCDigJMgxZhQIFJlxb5pbSB1a29uxI1lbsOtIHBsYXRub3N0aSBkb2tsYWR1IFBGSyB2IG9rYW3FvmlrdSB1a29uxI1lbsOtIGRva2xhZHUgU01MJyAtIGhvZG5vdGEgc2UgcMWZZWRuYXN0YXbDrSBkbGUgcmXFvmltdSBwcsOhY2VcclxuICAgICAgICAgICAgICAgICAgICAvL3BsYXTDrSB0dnJkw6Egdm9sYmEgZGFuw6EgcGFyYW1ldHJlbVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogKHBhcmFtcy5la29fcmFkX2Rma2VuID4gMCAmJiBwYXJhbXMuc21sX3JhZF9wZmtzdG8gIT0gMikgPyBwYXJhbXMuc21sX3JhZF9wZmtzdG8gPT0gMSA6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjbnQubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxhbnk+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBJRDogXCJIcm9tYWRuZVV2b2xuZW5pI1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDI4NFwiLCAvL1JDIDMzNjAwMjg0IDogSHJvbWFkbsOpIHV2b2xuxJtuw60gcHJvc3TFmWVka8WvXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBncmlkRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgZ3JpZFByb2ZpbGU6IGdyaWRQcm9maWxlLFxyXG4gICAgICAgICAgICAgICAga2V5czoga2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJvd3MhLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIHByZUNoZWNrQWN0aW9uOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpeHBzID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHZhbC5peHAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNudC5pc2wuU21sVXZvbG5lbmkuY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVGcmVlKHsgaXhwczogaXhwcyB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAyODVcIiwgLy9SQyAzMzYwMDI4NSA6IFbDvWLEm3IgZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMjg2XCIsIC8vUkMgMzM2MDAyODYgOiBaYWTDoW7DrSB1dm9sbsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDI4N1wiLCAvL1JDIDMzNjAwMjg3IDogQWtjZSB1dm9sbsOtIHByb3N0xZllZGt5IHUgdnlicmFuw71jaCAoemHFoWtydG51dMO9Y2gpIGRva2xhZMWvIHBvZGxlIHZ5cGxuxJtuw6lobyBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogd2l6YXJkRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwianJlczozMzYwMDI4OFwiLCAvL1JDIDMzNjAwMjg4IDogUGFyYW1ldHJ5IHV2b2xuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhwcyA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB2YWwuaXhwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY250LmlzbC5TbWxVdm9sbmVuaS5tYXNzRnJlZSh7IGl4cHM6IGl4cHMsIG1vZGU6IG1vZGUsIG1ha2U6IG1vZGVsLm1ha2UsIG1ha2Vfcm96cGlzOiBtb2RlbC5tYWtlX3JvenBpcywgbWFrZV9zdG9ybm9fcGZrOiBtb2RlbC5tYWtlX3N0b3Jub19wZmsgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXphcmRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cHMgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4gdmFsLml4cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNudC5pc2wuU21sVXZvbG5lbmkuY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVGcmVlKHsgaXhwczogaXhwcyB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDA4N1wiLCAvL1JDIDMzNjAwMDg3IDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDA4OFwiLCAvL1JDIDMzNjAwMDg4IDogVsO9c2xlZGVrIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogd2l6YXJkRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwianJlczozMzYwMDI4OFwiLCAvL1JDIDMzNjAwMjg4IDogUGFyYW1ldHJ5IHV2b2xuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICgpID0+IHsgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19