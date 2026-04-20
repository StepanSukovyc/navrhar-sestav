(function ($) {
	"use strict";
	namespace("Gordic.Ssl.DetailBuilderComponents", {

		SslDetailSpisu: {

			create: function (content, componentDto) {
				var result = {
					flagEvidovat: false,
					onMenuBuild: [
						function (builder, menus) {
							this.enableSslDetailSpisu();
						}
					],
					onBuild: [
						function () {
							
						},
					],
					contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

						prioraceSpisu: function (behaviour) {
							var l_sIxp = componentDto.ixp;
							var that = this;
							if (behaviour != "") {
								var l_oOnVyhledaniFunction = function (retVal) {
									if (retVal && retVal.ixp) {
										var optZjistiZdaJdeOPrioraciVyrizenehoSpisu = { "PriorovatDoIxp": retVal.ixp };
										var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
										srv.call("ZjistiZdaJdeOPrioraciVyrizenehoSpisu", optZjistiZdaJdeOPrioraciVyrizenehoSpisu)
											.done(function (retValZjistiZdaJdeOPrioraciVyrizenehoSpisu) {
												var hlaska = "";
												if (retValZjistiZdaJdeOPrioraciVyrizenehoSpisu.StavBool) {
													hlaska = "jres:31937399"; //RC 31937399 : Všechny vložené dokumenty budou přesunuty do zadaného spisu a ty co jsou nevyřízené, budou vyřízeny. Opravdu přesunout do spisu?
												} else {
													hlaska = "jres:26255231"; //RC 26255231 : Všechny vložené dokumenty budou přesunuty do spisu se zadaným ČJ. Opravdu přesunout?
												}
												that.dialogs.confirm("jres:31937037", hlaska).on("closed", function (ev, retValConfirm) {
													if (retValConfirm === "yes") {
														var opt = { "Ixp": l_sIxp, "PriorovatDoIxp": retVal.ixp };
														var srv2 = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
														srv2.call("PrioraceSpisu", opt)
															.done(function (retVal) {
																if (retVal.StavBool) {
																	that.tryReloadDetail(undefined, {
																		flashMessage: "jres:31937038", //RC 31937038 : Úspěšně přesunuto do spisu 
																		flashMessageClass: "g-state-success",
																	});
																} else {
																	that.detailDocSpisShowFlash("asd", "g-state-error");
																}
															}).always(function () { srv2.close(); });
													}
												});



											}).always(function () { srv.close(); });
                                      
									}
								}
                                that.hledatIdentDokSpi(l_oOnVyhledaniFunction);

							} else {
								that.dialogs.confirm("jres:26255378", "jres:26255232").on("closed", function (ev, retValConfirm) { //RC 26255232 : Opravdu chcete Zrušit přesun obsahu spisu?
									//RC 26255232 : Opravdu chcete spis odpriorovat?
									if (retValConfirm === "yes") {
										var opt = { "Ixp": l_sIxp, "PriorovatDoIxp": "" };
										var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
										srv.call("PrioraceSpisu", opt)
											.done(function (retVal) {
												if (retVal.StavBool) {
													that.tryReloadDetail(undefined, {
														flashMessage: "jres:31937071", //RC 31937071 : Úspěšně odpriorováno
														flashMessageClass: "g-state-success",
													});
												}
											}).always(function () { srv.close(); });
									}

								});
							}
						},

						spr_ZalozitRizeni: function (ixpZdroj) {
							console.log("TODO"); // nevím zda furt potřeba 
							//if (ixpZdroj != "") {
							//    var oReturn = ShowModalWindowEx("~/Gin/Spr/Detail/SeznamDruhuRizeniProFunkci.aspx?TypSprSpisu=NeniSpravniSpis&TestIxpSpis=Ano&IxpSpis=" + ixpZdroj, "jres:26256469", 562, 400, false, true, true); //RC 26256469 : Výběr druhu správního postupu
							//    if (oReturn != null) {
							//        if (oReturn.values[0] == "EXIST")
							//            window.alert("jres:Gordic.Ssl.WebClient:26256468") //RC 26256468 : Zadaný spis je již evidován.
							//        else {
							//            var dialogResult1 = MessageBox("jres:Gordic.Ssl.WebClient:26256470" + " :\n\n " + oReturn.values[2] + "\n\n" + "jres:Gordic.Ssl.WebClient:26256471", GetGlobalManager().GetValue('GinFaze'), MessageBoxButtons.YesNo, MessageBoxIcon.Question); //RC 26256471 : Přejete si pokračovat?

							//            if (dialogResult1 == DialogResult.Yes) {
							//                var url = "~/Gin/Spr/Detail/DetailRizeni.aspx?ixp=" + ixpZdroj + "&Akce=NoveRizeni" + "&Zdroj=Spis" + "&TypSr=" + oReturn.values[1] + "&DruhRizeni=" + oReturn.values[0];
							//                var oReturn = ShowModalWindowEx(url, "DetailRizeni", 870, 550, false, true, true);
							//            }
							//        }
							//    }
							//}
						},
						SSLUlozitSpis: function () {
							this.ulozitSpis();

						},

						zruseniVyrizeniSpisu: function () {
							var that = this;
							var l_sIxp = componentDto.ixp;

							var opt = { "Ixp": l_sIxp };
							var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
							srv.call("ZruseniVyrizeniSpisu", opt)
								.done(function (retVal) {
									if (retVal.StavBool) {
										that.tryReloadDetail(undefined, {
											flashMessage: "jres:31937072", //RC 31937072 : Úspěšně zrušeno vyřízení
											flashMessageClass: "g-state-success",
										});
									}
								}).always(function () { srv.close(); });
						},

						zruseniUzavreniSpisu: function () {
							var that = this;

							var fceZruseniUzavreniSpisu = function (ixsVsk) {
								var l_sIxp = componentDto.ixp;
								var opt = {
									Ixp: l_sIxp,
									IxsVsk: ixsVsk != null ? ixsVsk : undefined
								};
								var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
								srv.call("ZruseniUzavreniSpisu", opt)
									.done(function (retVal) {
										if (retVal.StavBool) {
											that.tryReloadDetail(undefined, {
												flashMessage: "jres:31937073", //RC 31937073 : Úspěšně zrušeno uzavření
												flashMessageClass: "g-state-success",
											});
										}
									}).always(function () { srv.close(); });
							}

							if(componentDto.IxsVsk != null && (componentDto.IxpDil == null || componentDto.IxpDil == "")) { // ref T40380, T40971 , jen pokud není v dílu (spis totiž buď zůstane v původním otevřeném dílu nebo se automaticky přesune do nového neuzavřeného)

								var dataVsk = Gordic.Isl.VecnaSkupina.list({
									filters: { ixs_vsk: componentDto.IxsVsk },
									fragments: ['FRAGMENT_GINSVSK_BASE']
								}).getData({}).then(function (data) {

									if (data != null && data.length == 1) {
										var aktivita = data[0].aktivita;
										var ixsVskNext = data[0].ixs_vsk_next;

										if (aktivita !== 100) { //Pokud není VSK aktivní, nabídnu uživateli výběr nové s přednastavením
											Gordic.Ssl.Dialogs.GZmenaSpisovehoZnakuDlg(that, { IxsVskProPredplneni: ixsVskNext != null ? ixsVskNext : undefined }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
												.then(function (retVal) {
													if (retVal) {
														fceZruseniUzavreniSpisu(retVal.IxsVskSelected);
													}
												});
										} else {
											fceZruseniUzavreniSpisu();
										}
									}
								});

							} else {
								fceZruseniUzavreniSpisu();
							}

						},

						zmenaLhuty: function () {
							var l_sIxp = componentDto.ixp;
							var that = this;
							var options = {
								Ixp: l_sIxp
							};
							var $div = Gordic.Ssl.Dialogs.ZmenaTerminuSpisuDlg(this, options);

							$div.on("closed", function (ev, retVal) {
								if (retVal) {
									that.tryReloadDetail();
								}
							});
						   
						},
						sslSpisVyridit: function () {
							this.vyridit('Vyridit', 'Spis'); // sslDetailComponent
						},

						sslSpisUzavrit: function () {

							this.vyridit('Vyridit', 'Spis'); // sslDetailComponent
						},

						sslVyjmoutSpisZeSoucasti: function () {
							var that = this;

							Gordic.Ssl.Dialogs.GZmenaSpisovehoZnakuDlg(this, {}, Gordic.Global.Enums.ModOtevreni.showModalWindow)
								.then(function (retVal) {
									if(retVal) {
										var opt = {
											IxpNadrazeneEntity: componentDto.IxpDil,// Pozor!!! U spisu musí být Ixp dílu (ixp_dil nebo ixp_nad ???). Na jiných entitách pak IxpSpisWfl
											IxpVyjimaneEntity: componentDto.ixp,
											IxsVskSpisu: retVal.IxsVskSelected,
										};

										var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
										srv.call("VyjmoutZNadrizeneEntity", opt)
											.done(function (retVal) {
												if (retVal.StavBool) {
													that.tryReloadDetail(undefined, {
														flashMessage: "jres:31937191", //RC 31937191 : Úspěšně vyjmuto
														flashMessageClass: "g-state-success",
													});
												}
											}).always(function () { srv.close(); });
									}

								});
						},

						sslVlozitDoSoucasti: function () {
							var that = this;
							
							if (componentDto.wfl_typspisy != 0) {
								var typSpis = 3;
								if (componentDto.TypSpis === 3) {
									typSpis = 2; //new GInt16(2);
								}   // ALF 6.8.2019 pro součást by se měl nabídnout typový spisy
								//ok = l_oHledatDokumentTab.VyhledejPosledniNadrizenouEntitu(typSpis, DocInfo.Ixp);

								Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(this, { IxpVkladanehoDok: componentDto.IxpSpisWfl, TypSpis: typSpis }) // dříve IxpSpis
									.then(function (retVal) {
										if (retVal  && retVal.ixp) {
											var opt = {
												Ixp: componentDto.IxpSpisWfl, // dříve IxpSpis
												IxpDo: retVal.ixp
											};
											var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
											srv.call("VlozitDoSoucasti", opt)
												.done(function (retVal) {
													if (retVal.StavBool) {
														that.tryReloadDetail(undefined, {
															flashMessage: "jres:31937192", //RC 31937192 : Úspěšně vložení
															flashMessageClass: "g-state-success",
														});
													}
												}).always(function () { srv.close(); });
										}
									});
							}
						},

						sslOdstranitPosledniDil: function () {
							var that = this;
							var opt = {
								Ixp: componentDto.ixp
							};
							var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
							srv.call("OdstranitPosledniDil", opt)
								.done(function (retVal) {
									if (retVal.StavBool) {
										that.tryReloadDetail(undefined, {
											flashMessage: "jres:31937193", //RC 31937193 : Úspěšně odstraněno
											flashMessageClass: "g-state-success",
										});
									}
								}).always(function () { srv.close(); });
						},

						sslExportovatDoSlozky: function () {
							var options = {
								Ixp: componentDto.ixp
							};
							Gordic.Wfl.Dialogs.GExportElDokumentuDlg(this, options)
								.done(function (retVal, cnt) {
									;
							});
						},

						pozastaveniSkartacniOperace: function () {
							var that = this;
							var l_sIxp = componentDto.ixp;

							var l_oParamsJSON = { Ixp: l_sIxp };

							Gordic.Wfl.Dialogs.PozastSkartacniOperaceDlg({ parentContent: this, opt: l_oParamsJSON, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
								.done(function (retVal) {
									if (retVal && retVal.zmena) {
										that.tryReloadDetail();
									}
								});

						},

						
						enableSslDetailSpisu: function () {

							var l_bActionEnabled = true;
							if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
								l_bActionEnabled = false;
							}
							//#region Entita
							this.actions.actZobrazitTypovySpis.update({ enabled: (l_bActionEnabled && componentDto.LzeZobrazitTypovySpis) });
							this.actions.actZobrazitSoucast.update({ enabled: (l_bActionEnabled && componentDto.LzeZobrazitSoucast) });
							this.actions.actZobrazitDil.update({ enabled: (l_bActionEnabled && componentDto.LzeZobrazitDil) });
							this.actions.actExportovatDoSlozky.update({ enabled: (l_bActionEnabled && componentDto.LzeExportovatSpis) });

							
							//#endregion

							//#region Činnosti
							this.actions.actPriorovat.update({ enabled: (l_bActionEnabled && (componentDto.LzePriorovat || componentDto.LzeZrusitPrioraci)) });
							this.actions.actVytvoritSpisSPR.update({ enabled: (l_bActionEnabled) });
							this.actions.actVytvoritSpisSPR.update({ visible: ("GWASPR05GWARLS05".indexOf(componentDto.Faze) != -1) });
							this.actions.actVytvoritSpisSPR.update({ visible: false }); //14.04.2022 dsebesta  Schováno na žádost Jaroslava Šíra 

							this.actions.actVyriditSpis.update({ enabled: (l_bActionEnabled && componentDto.LzeVyriditAUzavrit) });
							this.actions.actUzavrit.update({ enabled: (l_bActionEnabled && !componentDto.LzeVyriditAUzavrit && componentDto.LzeUzavrit) });
							this.actions.actSSLUlozitSpis.update({ enabled: (l_bActionEnabled && componentDto.LzeZmenitUlozeni) });

							var lzeZrusitVyrizeni = (l_bActionEnabled && componentDto.LzeZrusitVyrizeni);
							if (componentDto.TypSpis > 1){ // součást typový spis díl
								lzeZrusitVyrizeni = (l_bActionEnabled && componentDto.LzeZrusitUzavreni);
							}
							this.actions.actZrusitVyrizeni.update({ enabled: lzeZrusitVyrizeni });

							var lzeZrusitUzavreni = (l_bActionEnabled && componentDto.LzeZrusitUzavreni);
							if (componentDto.TypSpis > 1) { // součást typový spis díl
								lzeZrusitUzavreni = false;
							}
							this.actions.actZrusitUzavreni.update({ enabled: lzeZrusitUzavreni });

							//this.actions.actVyjmoutSoucastZeSoucasti.update({ enabled: (l_bActionEnabled && componentDto.LzeVyjmoutZTypovehoSpisu) });
							this.actions.actVyjmoutSpisZeSoucasti.update({ enabled: (l_bActionEnabled && componentDto.LzeSpisVyjmoutZeSoucasti) });
							this.actions.actVlozitDoSoucasti.update({ enabled: (l_bActionEnabled && componentDto.LzeVlozitDoSoucasti) });
							this.actions.actOdstranitPosledniDil.update({ enabled: (l_bActionEnabled && componentDto.LzeOdstranitPosledniDil) });

							var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();

							this.actions.actSpisovaObalkaTisk.update({ enabled: (l_bActionEnabled && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false) ) });
							this.actions.actSbernyArchTisk.update({ enabled: (l_bActionEnabled && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false)) });

							this.actions.actPozastaveniSkartacniOperace.update({ enabled: (l_bActionEnabled && componentDto.LzeEditovatPozastaveniSkartacniOperace) });

							this.actions.actOdeslanePripominky.update({ enabled: l_bActionEnabled && componentDto.IsEKlepPripominka });
							this.actions.actOdeslanePripominky.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka });
							this.actions.actVytvorenePripominkoveRizeni.update({ enabled: l_bActionEnabled && componentDto.IsEKlepPripominka });
							this.actions.actVytvorenePripominkoveRizeni.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka });
						
							//#endregion

							//#region Vazby
							//#endregion

							//#region Tisk
							//#endregion

							//#region Ostatni
							//#endregion

							//m_oVec.ReadOnly = !EditMode;
							//m_oSpZnExt.ReadOnly = !EditMode;
							//if (EditMode) {
							//    // editace doplnku spzn
							//    int l_nSslEdiSzecis = UserProcess.Configuration.GetDatabaseParameter("ssl_edi_szecis", 0);

							//    if (l_nSslEdiSzecis == 1) {
							//        m_oSpZnExt.Visible = false;
							//        m_oSpZnExtFavourite.Visible = true;
							//    }
							//}


						},

						
					},

					actions: { //může být zadáno jako pole nebo jako objekt
						//#region Dokument
						actZobrazitTypovySpis: {
							caption: "jres:31937195", //RC 31937195 : Zobrazit typový spis
							visible:false,
							run: function () {
								$.content(this).otevriNovyDetail({ DetailDto: { ixp: componentDto.IxpTop } }); //DocInfo.IxpTop
							}
						},
						actZobrazitSoucast: {
							caption: "jres:31937196", //RC 31937196 : Zobrazit součást
							visible: false,
							run: function () {
								$.content(this).otevriNovyDetail({ DetailDto: { ixp: componentDto.IxpSpisWfl } }); // dříve IxpSpis
							}
						},
						actZobrazitDil: {
							caption: "jres:31937197", //RC 31937197 : Zobrazit díl
							visible: false,
							run: function () {
								$.content(this).otevriNovyDetail({ DetailDto: { ixp: componentDto.IxpSpisWfl } }); // dříve IxpSpis
							}
						},
						actExportovatDoSlozky: {
							caption: "jres:31937203", //RC 31937203 : Exportovat do složky
							//icon: "gi-pencil",
							//visible:false,
							run: function () {
								$.content(this).sslExportovatDoSlozky();
							}
						},
						//#endregion

						//#region Činnosti
						actPriorovat: {
                            caption: componentDto.LzeZrusitPrioraci ? "jres:31937074" :"jres:31937037", //RC 31937037 : Přesunout do spisu
                            icon: "gi-folder |gi-folder g-state-text gi-bgw |fa-level-down g-state-text g-state-info gi-stack-pos--rt gi-bgw",
							run: function () {
								if (componentDto.LzeZrusitPrioraci) {
									$.content(this).prioraceSpisu('');
								} else {
									$.content(this).prioraceSpisu('Priorovat');
								}
							}
						},
						actVytvoritSpisSPR: {
							caption: "jres:26256467", //RC 26256467 : Vytvořit spis SPR
							icon: "gi-spis_skladani|fa-usd g-state-text g-state-info gi-stack-fw gi-stack-pos--rt gi-bgw",
							run: function () {
								$.content(this).spr_ZalozitRizeni(componentDto.ixp);
							}
						},
						actVyriditSpis: {
							caption: "jres:26255379", //RC 26255379 : Vyřídit / Uzavřít
                            icon: "gi-vyrizeno",
							run: function () {
								$.content(this).sslSpisVyridit();
							}
						},
						actUzavrit: {
							caption: "jres:26255380", //RC 26255380 : Uzavřít
                            icon: "gi-vyrizenouza",
							run: function () {
								$.content(this).sslSpisUzavrit();
							}
						},
						actSSLUlozitSpis: {
							caption: "jres:26255270", //RC 26255270 : Uložit
                            icon: "fa-archive",
							run: function () {
								$.content(this).SSLUlozitSpis();
							}
						},
						actZrusitVyrizeni: {
							caption: "jres:26255330", //RC 26255330 : Zrušit vyřízení
                            icon: ["gi-vyrizeno", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
							run: function () {
								$.content(this).zruseniVyrizeniSpisu();
							}
						},
						actZrusitUzavreni: {
							caption: "jres:26255382", //RC 26255382 : Zrušit uzavření
                            icon: ["gi-vyrizenouza", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
							run: function () {
								$.content(this).zruseniUzavreniSpisu();
							}
						},
						actVyjmoutSpisZeSoucasti: {
							caption: "jres:26257331", //RC 26257331 : Vyjmout ze součásti
							icon: "gi-vyjmout_do_spisu",
							visible: componentDto.wfl_typspisy != 0,
							run: function () {
								$.content(this).sslVyjmoutSpisZeSoucasti();
							}
						},

						actVlozitDoSoucasti: {
							caption: "jres:26257281", //RC 26257281 : Vložit do součásti
							icon: "gi-vlozit_do_spisu",
							visible: componentDto.wfl_typspisy != 0,
							run: function () {
								$.content(this).sslVlozitDoSoucasti();
							}
						},

						actOdstranitPosledniDil: {
							caption: "jres:31937194", //RC 31937194 : Odstranit poslední díl
							//icon: "fa-archive",
							visible: false,
							run: function () {
								$.content(this).sslOdstranitPosledniDil();
							}
						},

						actPozastaveniSkartacniOperace: {
							caption: "jres:31937408", //RC 31937408 : Pozastavit skartační op.
							tooltip: "jres:31937409", //RC 31937409 : Pozastavit skartační operaci
							icon: ["gi-skartace", "fa-pause g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
							run: function () {
								$.content(this).pozastaveniSkartacniOperace();
							}
						},

						
						//#endregion

						//#region Vazby
						//#endregion

						//#region Tisk
						actSpisovaObalkaTisk: GAction.createPrintAction({
							name: "actSpisovaObalkaTisk",
							tema: "usu_ptm_spisdet",
							icon: "gi-print|gi-mail gi-bgw gi-stack-pos--rb g-state-text g-state-info",
							caption: "jres:26255383", //RC 26255383 : Spisová obálka
							reportStarting: function (rep) {
								rep.params.IXP = componentDto.ixp;
								rep.params.X0000 = componentDto.ixp;
								rep.params.Preselect = false;
							},
							reportFinished: function (ev, ri) {
								var cnt = $.content(this);
								if (ri) { 
									const zpUloz = parseInt(ri.customData["zpUloz"] != null ? ri.customData["zpUloz"] : "0");
									Gordic.Ginis.DbModel.GGinczulEnumValues()
										.then(function (vals) {
											const zpUlozDto = vals.find(function (v) {
												return v.value === zpUloz
											});
											var textFlash = "jres:31937278."; //RC 31937278 : Spisová obálka byla vygenerována
											if (zpUlozDto && zpUlozDto.meta.zpus_uloz_txt) {
												var zpusob = zpUlozDto.meta.zpus_uloz_txt;
												textFlash = textFlash + " " + String.Format("jres:31937395", zpusob); //RC 31937395 : Způsob uložení: {0}
												cnt.tryReloadDetail(undefined, {
													flashMessage: textFlash,
													flashMessageClass: "g-state-success",
												});
											} else {
												cnt.tryReloadDetail(undefined, {
													flashMessage: textFlash,
													flashMessageClass: "g-state-success",
												});
											}
										});
								}
							}
						}),
						actSbernyArchTisk: GAction.createPrintAction({
							name: "actSbernyArchTisk",
							tema: "usu_ptm_spisarc",
							icon: "gi-print|gi-spis_bold gi-bgw gi-stack-pos--rb g-state-text g-state-info",
							caption: "jres:26255384", //RC 26255384 : Sběrný arch (GRR)
							reportStarting: function (rep) {
								rep.params.X0000 = componentDto.ixp;
								rep.params.Preselect = false;
							},
						}),

						//#endregion

						//#region Ostatni
						actPriorovanoKam: {
							caption: "jres:26255257", //RC 26255257 : Spis
							//icon: "gi-pencil",
							run: function () {
								$.content(this).DetailSpisuPrirovanoKam();
							}
						},

						actOdeslanePripominky: new GAction(Gordic.Ssl.PreActions.OtevriEklepPripominkyPripominkovehoRizeni({
							actionParams: {
								name: "actOdeslanePripominky",
							},
							inputData: function (action, event, ctx, param) {
								var def = $.Deferred();
								def.resolve(
									{
										parentContent: content,
										requestDto: {
											StartFilter: {
												PripominkoveRizeniZpracovane_ixp_spis: componentDto.ixp
												//pid_eklep
											}
										}
									});
								return def.promise();

							},
							done: function (retVal) {
								;
							},
						})),

						actVytvorenePripominkoveRizeni: new GAction(Gordic.Ssl.PreActions.OtevriEklepPripominkovaRizeni({
							actionParams: {
								name: "actVytvorenePripominkoveRizeni",
							},
							inputData: function (action, event, ctx, param) {
								var def = $.Deferred();

								def.resolve({
									parentContent: content,
									opt: {
										StartFilter: {
											ixp_spis: componentDto.ixp
										}
									}
								});

								return def.promise();
							}
						})),

						//#endregion

						//#region comandbar
						//#endregion
					},

					menuBar: [

						//#region Dokument
						Gordic.Wfl.Globals.MenuDefinitions.detailDokument(),
						//{ id: "menuDokumentSeparator1", type: "separator", parent: "menuDokument", after: "menuFindRecord" },
						{ action: "actZobrazitTypovySpis", parent: "menuDokument" }, //after: "menuDokumentSeparator1"
						{ action: "actZobrazitSoucast", parent: "menuDokument" },
						{ action: "actZobrazitDil", parent: "menuDokument" },
						{ action: "actExportovatDoSlozky", parent: "menuDokument" },
						
						//#endregion

						//#region Činnosti
						Gordic.Wfl.Globals.MenuDefinitions.detailCinnosti(),
						{ action: "actVyriditSpis", parent: "menuWflCinnosti", before: "menuCinnostiSeparator1", favorite: true }, //menuCinnostiSeparator1
						{ action: "actUzavrit", parent: "menuWflCinnosti", after: "menuVyriditSpis" },
						{ action: "actSSLUlozitSpis", parent: "menuWflCinnosti", after: "menuUzavrit" },
						{ id: "menuCinnostiSeparator6", type: "separator", parent: "menuWflCinnosti", after: "menuSSLUlozitSpis" },
						{ action: "actZrusitVyrizeni", parent: "menuWflCinnosti", after: "menuCinnostiSeparator6" },
						{ action: "actZrusitUzavreni", parent: "menuWflCinnosti", after: "menuZrusitVyrizeni" },
						{ id: "menuCinnostiSeparator7", type: "separator", parent: "menuWflCinnosti", after: "menuZrusitUzavreni" },
						{ action: "actPriorovat", parent: "menuWflCinnosti", after: "menuCinnostiSeparator7" },
						//{ id: "menuCinnostiSeparator99", type: "separator", parent: "menuWflCinnosti", after: "menuPriorovat" },
						{ action: "actVyjmoutSpisZeSoucasti", parent: "menuWflCinnosti", favorite: true },
						{ action: "actVlozitDoSoucasti", parent: "menuWflCinnosti", favorite: true },
						{ action: "actOdstranitPosledniDil", parent: "menuWflCinnosti" },
						{ action: "actPozastaveniSkartacniOperace", parent: "menuWflCinnosti", before: "menuZmenaSpouUdalosti" }, //actZmenaSpouUdalosti menuZmenaSpouUdalosti
						
						//GWASPR01 
						{ action: "actVytvoritSpisSPR", parent: "menuWflCinnosti", before: "menuCinnostiSeparator1" }, //menuCinnostiSeparator1
						

						//#endregion

						//#region Vazby
						
						//#endregion

						//#region Tisk
						$.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailTisk(), { favorite: true }),
						{ action: "actSpisovaObalkaTisk", parent: "menuTisk", after: "menuTiskSablonyWord" },
						{ action: "actSbernyArchTisk", parent: "menuTisk", after: "menuSpisovaObalkaTisk" },

						//#endregion
						
					],

				};
				if (componentDto.IsEKlepPripominka) {
					result.menuBar.push($.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailEKlep()));
					result.menuBar.push({ action: "actOdeslanePripominky", parent: "menuEKlep" });
					//result.menuBar.push({ action: "actVytvorenePripominkoveRizeni", parent: "menuEKlep" });

				}

				return result;
			}

		}


	}, { pure: true, extendIntellisense: GContent });
})(jQuery);