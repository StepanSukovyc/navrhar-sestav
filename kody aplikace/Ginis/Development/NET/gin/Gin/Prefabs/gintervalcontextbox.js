//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gin.WebClient.gintervalcontextbox.js					</Name>
//    <Description> Prefab rozšíření intervalboxu								</Description>
//    <Author>      thazmuka													</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018                            </Copyright>
//    <Created>     2018-06-21                                                  </Created>
//  </FileHeader>

(function ($) {
	"use strict";

	//#region addDays

	/**
	 * přidat počet dní
	 */
	Date.prototype.addDays = function (days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}

	//#endregion

	//#region removeDays

	/**
	 * odebrat počet dní
	 */
	Date.prototype.removeDays = function (days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() - days);
		return date;
	}

	//#endregion


	/**
	 * získej rozsah
	 */
	var _getRange = function(cntPrefab){

		var gstore_pocet_dni = window.gstor.get("Global.Wfl.AppSettings.ListsSettings.PredplneniPoceDni");
		var range = cntPrefab.daysRange !== undefined ? cntPrefab.daysRange : gstore_pocet_dni === undefined ? 30 : gstore_pocet_dni;

		return range;
	}

	var _setContextMenu = function (cntPrefab, onChange, field) {

		/** hodnoty vytažené z gstoru */
		var value = cntPrefab.userSettings.get(cntPrefab.options.name);

		/** datum od */
		var start = value.date.start;
		/** datum do */
		var end = value.date.end;

		//#region Vždy předvyplnit posledních {0} dní

		if (value.btnPreFillTwo === true) {

			// rozsah - použit v pořadí:
			// 1. uživ.rozsah
			// 2. rozsah daný parametrem
			// 3. defaultní rozsah

			var range = _getRange(cntPrefab);

			// nastavení start a end data
			start = new Date();
			end = new Date();

			// odebrat určitý počet dnů
			start = start.removeDays(range);
		}

		//#endregion

		//#region Předplnit 'Datum Do' aktuálním datem

		else {

			// konverze do Date typu
			if (typeof start === "string") {
				start = new Date(start);
			}

			if (value.btnPreFillOne === true) {
				end = new Date();
			}

		}

		//#endregion

		if (onChange) {
			field.gfield("setValue", {
				start: start,
				end: end
			});
		}
		else {

			// nastavení inicializační hodnoty

			//cntPrefab.options.modelValueTransform = {
			//	apply: function (value) {

			//		if ((value.start === null) && (value.end === null)) {
			//			$(this).gfield("setValue", {
			//				start: start,
			//				end: end
			//			});
			//		}
			//		else {
			//			$(this).gfield("setValue", value);
			//		}
			//		return;
			//	},
			//}

			cntPrefab.options.initialValue = {
				start: start,
				end: end
			}

		}


		// nasetování ikon do menu
		var btnPreFillOneIcon = value.btnPreFillOne ? "fa-check-circle" : "fa-circle";
		var btnPreFillTwoIcon = value.btnPreFillTwo ? "fa-check-circle" : "fa-circle";

		cntPrefab.btnPreFillOne.update({ icon: btnPreFillOneIcon });
		cntPrefab.btnPreFillTwo.update({ icon: btnPreFillTwoIcon });

	}

	var _numIntervalRok = function (optionsInput) {

		var cntPrefab = {};

		cntPrefab.options = {};
		cntPrefab.options.name = optionsInput.name;
		cntPrefab.userSettings = optionsInput.userSettings;
		cntPrefab.daysRange = optionsInput.daysRange;
		cntPrefab.daysRangeMax = optionsInput.daysRangeMax;

		//#region nastavení daysRangeMax

		if (cntPrefab.daysRangeMax !== undefined) {
			// uživatelský rozsah
		}
		else {
			// defaultní - uživatelský nebyl zadán
			cntPrefab.daysRangeMax = 30;
			console.log("Byl zadán defaultní rozsah 'daysRangeMax' na 30 dní.");
		}

		//#endregion

		_createButtons(cntPrefab);

		_setStates(cntPrefab);

		_change(cntPrefab);

		cntPrefab.options.userSettings = cntPrefab.userSettings;

		// datum dnes
		var today = new Date();

		// nastavení min. a max. hodnoty políčka
		cntPrefab.options.minValue = today.removeDays(cntPrefab.daysRangeMax);
		cntPrefab.options.maxValue = today.addDays(cntPrefab.daysRangeMax);

		return cntPrefab.options;

	};

	//#region nastavení stavů

	var _setStates = function (cntPrefab) {

		// první field v contextmenu
		cntPrefab.btnPreFillOne = cntPrefab.options.buttons["0"].children["3"].action;
		cntPrefab.btnPreFillTwo = cntPrefab.options.buttons["0"].children["5"].action;

		var value = cntPrefab.userSettings.get(cntPrefab.options.name);

		// gstore není definován
		if ((value === undefined) || (value.date === null)) {

			// nastavení ikony
			cntPrefab.btnPreFillOne.update({ icon: "fa-check-circle" });

			// uložení hodnot contextmenu fieldu do gstoru
			cntPrefab.userSettings.set(cntPrefab.options.name + ".btnPreFillOne", true);
			cntPrefab.userSettings.set(cntPrefab.options.name + ".btnPreFillTwo", false);

			// nastavení datumu
			var end = new Date();
			var start = end.removeDays(30);

			// nastavení inicializační hodnoty
			cntPrefab.options.initialValue = {
				start: start,
				end: end
			}

			// uložení hodnot 'datumu'
			cntPrefab.userSettings.set(cntPrefab.options.name + ".date", {
				start: start,
				end: end
			});

		}
		else {
			_setContextMenu(cntPrefab, false);
		}

	}

	//#endregion

	//#region změna políčka

	var _change = function (cntPrefab) {

		cntPrefab.options.change = function (ev, obj) {

			// výchozí prázdná hodnota
			var value = null;
			// hodnota datumu není prázdná
			if (obj.value !== null) {
				value = {
					start: obj.value.start,		// od
					end: obj.value.end			// do
				}
			}
			// uložení hodnoty do gstoru
			cntPrefab.userSettings.set(cntPrefab.options.name + ".date", value);
		}

	}

	//#endregion

	/**
	 * získání, uložení hodnot tlačítek v contextmenu do userSettingu
	 *
	 * @param {any} cntPrefab global this
	 * @param {any} that button this
	 */
	var getSetValueInUserSetting = function (cntPrefab, that, buttonName) {

		// získání předešlé(aktuální) hodnoty z gstoru
		var value = cntPrefab.userSettings.get(cntPrefab.options.name + "." + buttonName);
		// uložení do gstoru inverzní hodnotu
		cntPrefab.userSettings.set(cntPrefab.options.name + "." + buttonName, !value);

		// update ikony
		that.update({
			icon: value ? "fa-circle" : "fa-check-circle"
		});

	}

	//#region vytvořit tlačítka

	var _createButtons = function (cntPrefab) {

		let daysRange = cntPrefab.daysRangeMax;


		// nad 365 dní - zobrazit na roky

		// pod 365 dní - zobrazit na dny

		// v případě hodnoty, která má zbytek, nechat výsledek ve dnech


		var today = new Date();

		var end = moment(today.addDays(cntPrefab.daysRangeMax)).format('l');
		var start = moment(today.removeDays(cntPrefab.daysRangeMax)).format('l');


		cntPrefab.options.buttons = [
			{
				type: "static",
				icon: "gi-menu",
				children: [

					//#region Ode dneška na {0} dní

					{
						action: new GAction({
							name: "btnDaysFromToday",
							caption: "jres:32000004 " + end, //RC 32000004 : Ode dneška do
							run: function (ev, ctx) {

								var date = new Date();

								ctx.field.gfield("setValue", {
									start: date,
									end: date.addDays(cntPrefab.daysRangeMax)
								});


							}
						})
					},

					//#endregion

					//#region Do dneška na {0} dní

					{
						action: new GAction({
							name: "btnDaysToToday",
							caption: "jres:32000005 " + start, //RC 32000005 : Do dneška od
							run: function (ev, ctx) {

								var date = new Date();

								ctx.field.gfield("setValue", {
									start: date.removeDays(cntPrefab.daysRangeMax),
									end: date
								});

							}
						})
					},

					//#endregion

					{
						type: "separator"
					},

					//#region Předplnit datum do aktuálním datem

					{
						action: new GAction({
							icon: "fa-circle",
							name: "btnPreFillOne",
							caption: "jres:32000001",									//RC 32000001 : Předplnit "datum do" aktuálním datem
							run: function (ev, ctx) {

								var field = ctx.field;

								// získání předešlé(aktuální) hodnoty z gstoru
								var value = cntPrefab.userSettings.get(cntPrefab.options.name + ".btnPreFillOne");
								// uložení do gstoru inverzní hodnotu
								cntPrefab.userSettings.set(cntPrefab.options.name + ".btnPreFillOne", !value);

								// update ikony
								this.update({
									icon: value ? "fa-circle" : "fa-check-circle"
								});

								_setContextMenu(cntPrefab, true, field);

							}
						})
					},

					//#endregion

					{
						type: "separator"
					},

					//#region Vždy předvyplnit posledních {0} dní

					{
						action: new GAction({
							icon: "fa-circle",
							name: "btnPreFillTwo",
							caption: "jres:32000002 " + cntPrefab.daysRange + " jres:32000003",		// Vždy předvyplnit posledních {0} dní
							run: function (ev, ctx) {

								var field = ctx.field;

								// získání předešlé(aktuální) hodnoty z gstoru
								var value = cntPrefab.userSettings.get(cntPrefab.options.name + ".btnPreFillTwo");
								// uložení do gstoru inverzní hodnotu
								cntPrefab.userSettings.set(cntPrefab.options.name + ".btnPreFillTwo", !value);

								// update ikony
								this.update({
									icon: value ? "fa-circle" : "fa-check-circle"
								});

								_setContextMenu(cntPrefab, true, field);


							}
						})
					}

					//#endregion
				]
			}
		];

	}

	//#endregion

	namespace("Gordic.Gin.Prefabs", {

		/**
		 * intervalcontextbox
		 */
		intervalContextBox: function (options) {

			return _numIntervalRok(options);
		}

	});

})(jQuery);