//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Adt.WebApp.Main.js										</Name>
//    <Description> Hlavní třída modulu ADT07										</Description>
//    <Author>      thazmuka														</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2019								</Copyright>
//    <Created>     2019-02-25														</Created>
//  </FileHeader>

// docasne reseni kvuli volani starsich skriptu (Ssl.js, Wfl.js) na nekterych dialozich

window.ginisResponsiveWindows = true;

(function ($) {

	"use strict";
	namespace("Gordic.Adt.WebApp.Main", {

		onContentReady: function () {

            var that = this;

            //// WFL resolver pro hledání revize do obecného hledacího políčka včetně dalších WFL hledání
            //Gordic.Wfl.Utils.registerSearchResolvers({
                
            //    pidSearchResolverParams: {
                    
            //        openDetail: (ixsInfo) => {
            //            // zobrazení detailů podle toho, o jaký typ jde
            //            if (ixsInfo.CoJsemZac === Wfl.Interface.GIdentifikatorCoJsemZac.) {
            //                //Revize
            //                //return content.isl.BankovniVypisBuc.read({ ixp: ixsInfo.Ixx1 })
            //                //    .getData()
            //                //    .then(function (data) {
            //                //        if (data?.ixp_den) {
            //                //            let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, data.ixp_den);
            //                //            content.navigate(
            //                //                ["Gordic.Buc.WebClient.GBankovniVypisDetail", { uid: "GBankovniVypisDetail", gpc: newGpc }],
            //                //                {
            //                //                    Ixp: ixsInfo.Ixx1,
            //                //                    IxpDen: data.ixp_den
            //                //                }
            //                //            );
            //                //            return $.Deferred < boolean > ().resolve(true);
            //                //        }
            //                //        else return $.Deferred < boolean > ().resolve(false);
            //                //    });
            //            }
            //            else {
            //                // neznámý typ
            //                return $.Deferred < boolean > ().resolve(false).promise();
            //            }
            //        }
            //    }
            //});


			// pošli notifikaci pouze pokud je aspoň 1 nový balíček
			if (this.CountNewBalicek > 0) {

                var titleNew = "";

                if (this.CountNewBalicek === 1) {
                    titleNew = "jres:32000038" + " <b>" + that.CountNewBalicek + "</b> " + "jres:32000043" + "."; //RC 32000043 : balík
                }
                else if (this.CountNewBalicek < 5) {
                    titleNew = "jres:32000037" + " <b>" + that.CountNewBalicek + "</b> " + "jres:32000045" + "."; //RC 32000045 : balíky
                }
                else {  // >= 5
                    titleNew = "jres:32000046" + " <b>" + that.CountNewBalicek + "</b> " + "jres:32000044" + "."; //RC 32000044 : balíků
                }

				setTimeout(function () {
					$.content($(".gcontent")).notification("add", {
						state: "important",
						group: "jres:32000039", //RC 32000039 : Událost
						title: "jres:32000040", //RC 32000040 : Upozornění
						icon: "fa-exclamation", // g-state-text g-state-error
                        content: titleNew,
						dateTime: new Date(),
						defaultAction: new GAction({
							name: "showNewBalicky",
							run: function (ev, ctx) {
								that.navigateTask('Gordic.Adt.WebControls.SeznamBalicku', { ID: 'SeznamBalickuAdt#', taskId: 'actAdtSeznamBalicku', noveBalickyFlag: true });
							}
						})
					});
				}, 500);

            }

            // pošli notifikaci pouze pokud je aspoň 1 změněný (dnes) balíček
            if (this.CountChangeBalicek > 0) {

                var titleChange = "";

                if (this.CountNewBalicek === 1) {
                    titleChange = "jres:32000041" + " <b>" + that.CountNewBalicek + "</b> " + "jres:32000043" + "."; //RC 32000041 : Dnes byl změněn
                }
                else if (this.CountNewBalicek < 5) {
                    titleChange = "jres:32000047" + " <b>" + that.CountNewBalicek + "</b> " + "jres:32000045" + "."; //RC 32000047 : Dnes byly změněny
                }
                else {  // >= 5
                    titleChange = "jres:32000042" + " <b>" + that.CountNewBalicek + "</b> " + "jres:32000044" + "."; //RC 32000042 : Dnes bylo změněno
                }

                setTimeout(function () {
                    $.content($(".gcontent")).notification("add", {
                        state: "important",
                        group: "jres:32000039", //RC 32000039 : Událost
                        title: "jres:32000040", //RC 32000040 : Upozornění
                        icon: "fa-exclamation", // g-state-text g-state-error
                        content: titleChange,
                        dateTime: new Date(),
                        defaultAction: new GAction({
                            name: "showNewBalicky",
                            run: function (ev, ctx) {

                                that.navigateTask('Gordic.Adt.WebControls.SeznamBalicku', {
                                    ID: 'SeznamBalickuAdt#',
                                    taskId: 'actAdtSeznamBalicku',
                                    changeBalickyFlag: true
                                });
                            }
                        })
                    });
                }, 500);

            }



		}

	}, { pure: true });
})(jQuery);