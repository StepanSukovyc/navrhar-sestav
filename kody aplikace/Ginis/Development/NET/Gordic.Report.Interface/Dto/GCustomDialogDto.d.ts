declare namespace Gordic.Report.Interface {
	/**Custom dialog sestavy*/
	interface GCustomDialogDto {
		/**Titulek okna*/
		title?: string|null;
		/**id*/
		id?: string|null;
		/**Pozice X*/
		posX?: number|null;
		/**Pozice Y*/
		posY?: number|null;
		/**Sirka*/
		width?: number|null;
		/**Vyska*/
		height?: number|null;
		/**Typ dialogu (default = "Custom")*/
		dialogType?: string|null;
		/**Seznam ovl. prvku*/
		controls?: Gordic.Report.Interface.GCustomDialogControlDto[]|null;
		/**Dalsi property dialogu*/
		props?: ObjectLiteral<any>|null;
	}
	const enum GCustomDialogDtoNames { title = "title", id = "id", posX = "posX", posY = "posY", width = "width", height = "height", dialogType = "dialogType", controls = "controls", props = "props",}
	const enum GCustomDialogDtoFragments { title = "*", id = "*", posX = "*", posY = "*", width = "*", height = "*", dialogType = "*", controls = "*", props = "*",}
	const enum GCustomDialogDtoTypes { title = "string", id = "string", posX = "number", posY = "number", width = "number", height = "number", dialogType = "string", controls = "Gordic.Report.Interface.GCustomDialogControlDto[]", props = "ObjectLiteral<any>",}
	const enum GCustomDialogDtoTypeLengths {}
	/**Ovl. prvek (obecne)*/
	interface GCustomDialogControlDto {
		/**Nazev*/
		name?: string|null;
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Pozice X*/
		left?: number|null;
		/**Pozice Y*/
		top?: number|null;
		/**Sirka*/
		width?: number|null;
		/**Vyska*/
		height?: number|null;
		/**Property (serializovatelne!!!)*/
		props?: ObjectLiteral<any>|null;
	}
	const enum GCustomDialogControlDtoNames { name = "name", controlType = "controlType", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogControlDtoFragments { name = "*", controlType = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogControlDtoTypes { name = "string", controlType = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogControlDtoTypeLengths {}
	/**Label*/
	interface GCustomDialogLabelDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Popisek*/
		caption?: string|null;
	}
	const enum GCustomDialogLabelDtoNames { controlType = "controlType", caption = "caption", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogLabelDtoFragments { controlType = "*", caption = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogLabelDtoTypes { controlType = "string", caption = "string", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogLabelDtoTypeLengths {}
	/**Checkbox*/
	interface GCustomDialogCheckBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Popisek*/
		caption?: string|null;
		/**Hodnota*/
		value?: boolean|null;
	}
	const enum GCustomDialogCheckBoxDtoNames { controlType = "controlType", caption = "caption", value = "value", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogCheckBoxDtoFragments { controlType = "*", caption = "*", value = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogCheckBoxDtoTypes { controlType = "string", caption = "string", value = "boolean", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogCheckBoxDtoTypeLengths {}
	/**Datebox*/
	interface GCustomDialogDateBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Hodnota*/
		value?: JsonDate|null;
	}
	const enum GCustomDialogDateBoxDtoNames { controlType = "controlType", value = "value", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogDateBoxDtoFragments { controlType = "*", value = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogDateBoxDtoTypes { controlType = "string", value = "JsonDate", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogDateBoxDtoTypeLengths {}
	/**Editbox*/
	interface GCustomDialogEditBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Hodnota*/
		value?: string|null;
		/**Maximalni delka (hodnota 0 = nedefinovano)*/
		maxLength?: number;
	}
	const enum GCustomDialogEditBoxDtoNames { controlType = "controlType", value = "value", maxLength = "maxLength", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogEditBoxDtoFragments { controlType = "*", value = "*", maxLength = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogEditBoxDtoTypes { controlType = "string", value = "string", maxLength = "number", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogEditBoxDtoTypeLengths {}
	/**Memo*/
	interface GCustomDialogMemoDto extends Gordic.Report.Interface.GCustomDialogEditBoxDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
	}
	const enum GCustomDialogMemoDtoNames { controlType = "controlType", value = "value", maxLength = "maxLength", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogMemoDtoFragments { controlType = "*", value = "*", maxLength = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogMemoDtoTypes { controlType = "string", value = "string", maxLength = "number", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogMemoDtoTypeLengths {}
	/**Numberbox*/
	interface GCustomDialogNumberBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**Hodnota*/
		value?: JsonDecimal|null;
		/**Minimalni hodnota*/
		minValue?: JsonDecimal|null;
		/**Maximalni hodnota*/
		maxValue?: JsonDecimal|null;
		/**Maximalni delka?*/
		maxLength?: number|null;
		/**Presnost*/
		decimals?: number|null;
	}
	const enum GCustomDialogNumberBoxDtoNames { controlType = "controlType", value = "value", minValue = "minValue", maxValue = "maxValue", maxLength = "maxLength", decimals = "decimals", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogNumberBoxDtoFragments { controlType = "*", value = "*", minValue = "*", maxValue = "*", maxLength = "*", decimals = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogNumberBoxDtoTypes { controlType = "string", value = "JsonDecimal", minValue = "JsonDecimal", maxValue = "JsonDecimal", maxLength = "number", decimals = "number", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogNumberBoxDtoTypeLengths {}
	interface GCustomDialogSelectBoxDto extends Gordic.Report.Interface.GCustomDialogControlDto {
		/**Predvybrana hodnota*/
		selectedIndex?: number|null;
		/**Polozky*/
		items?: Gordic.Report.Interface.GCustomDialogSelectOptionDto[]|null;
	}
	const enum GCustomDialogSelectBoxDtoNames { selectedIndex = "selectedIndex", items = "items", name = "name", controlType = "controlType", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogSelectBoxDtoFragments { selectedIndex = "*", items = "*", name = "*", controlType = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogSelectBoxDtoTypes { selectedIndex = "number", items = "Gordic.Report.Interface.GCustomDialogSelectOptionDto[]", name = "string", controlType = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogSelectBoxDtoTypeLengths {}
	/**Listbox*/
	interface GCustomDialogListBoxDto extends Gordic.Report.Interface.GCustomDialogSelectBoxDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**?*/
		checks?: string|null;
		/**Styl (Gordic.Report.Interface.GCheckListStyle)*/
		style?: number|null;
	}
	const enum GCustomDialogListBoxDtoNames { controlType = "controlType", checks = "checks", style = "style", selectedIndex = "selectedIndex", items = "items", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogListBoxDtoFragments { controlType = "*", checks = "*", style = "*", selectedIndex = "*", items = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogListBoxDtoTypes { controlType = "string", checks = "string", style = "number", selectedIndex = "number", items = "Gordic.Report.Interface.GCustomDialogSelectOptionDto[]", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogListBoxDtoTypeLengths {}
	/**Combobox*/
	interface GCustomDialogComboBoxDto extends Gordic.Report.Interface.GCustomDialogSelectBoxDto {
		/**Typ ovl. prvku*/
		readonly controlType?: string|null;
		/**?*/
		returnIndex?: boolean|null;
	}
	const enum GCustomDialogComboBoxDtoNames { controlType = "controlType", returnIndex = "returnIndex", selectedIndex = "selectedIndex", items = "items", name = "name", left = "left", top = "top", width = "width", height = "height", props = "props",}
	const enum GCustomDialogComboBoxDtoFragments { controlType = "*", returnIndex = "*", selectedIndex = "*", items = "*", name = "*", left = "*", top = "*", width = "*", height = "*", props = "*",}
	const enum GCustomDialogComboBoxDtoTypes { controlType = "string", returnIndex = "boolean", selectedIndex = "number", items = "Gordic.Report.Interface.GCustomDialogSelectOptionDto[]", name = "string", left = "number", top = "number", width = "number", height = "number", props = "ObjectLiteral<any>",}
	const enum GCustomDialogComboBoxDtoTypeLengths {}
	/**Polozka seznamu*/
	interface GCustomDialogSelectOptionDto {
		/**Nazev option*/
		text?: string|null;
		/**Hodnota (value) option*/
		value?: string|null;
		/**?*/
		check?: string|null;
	}
	const enum GCustomDialogSelectOptionDtoNames { text = "text", value = "value", check = "check",}
	const enum GCustomDialogSelectOptionDtoFragments { text = "*", value = "*", check = "*",}
	const enum GCustomDialogSelectOptionDtoTypes { text = "string", value = "string", check = "string",}
	const enum GCustomDialogSelectOptionDtoTypeLengths {}
}
