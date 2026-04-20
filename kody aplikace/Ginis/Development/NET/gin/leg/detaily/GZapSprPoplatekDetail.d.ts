declare namespace Gordic.Leg.WebClient {
	/**Zápis správního poplatku*/
	interface GZapSprPoplatekDetail extends Gordic.Gui.WebControls.GAjaxContent {
		/**identifikace overeni*/
		IxsVid?: string|null;
		/**info k poplatku*/
		Popis?: string|null;
		/**poplatek*/
		Poplatek?: JsonDecimal|null;
		/**ixs_fun*/
		IxsFun?: string|null;
	}
	const enum GZapSprPoplatekDetailNames { IxsVid = "IxsVid", Popis = "Popis", Poplatek = "Poplatek", IxsFun = "IxsFun", Title = "Title", Icon = "Icon", UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", ContentValues = "ContentValues", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum GZapSprPoplatekDetailFragments { IxsVid = "*", Popis = "*", Poplatek = "*", IxsFun = "*", Title = "*", Icon = "*", UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", ContentValues = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum GZapSprPoplatekDetailTypes { IxsVid = "string", Popis = "string", Poplatek = "JsonDecimal", IxsFun = "string", Title = "string", Icon = "string", UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
	const enum GZapSprPoplatekDetailTypeLengths {}
}
