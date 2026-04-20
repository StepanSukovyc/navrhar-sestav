declare namespace Gordic.General {
	/**Vysledek validace*/
	interface GValidationResult {
		/**Error message*/
		message?: string|null;
		/**Cesta k memberu (property/fieldu) v hierarchii DTO*/
		member?: string|null;
		/**Možnost přidání vlastních dat. POZOR: Při použití s APG může být typu JObject!*/
		data?: object|null;
		/**Uroven vaznosti (default = Error)*/
		severity?: Gordic.General.GSeverityLevelEnum|null;
	}
	const enum GValidationResultNames { message = "message", member = "member", data = "data", severity = "severity",}
	const enum GValidationResultFragments { message = "*", member = "*", data = "*", severity = "*",}
	const enum GValidationResultTypes { message = "string", member = "string", data = "object", severity = "Gordic.General.GSeverityLevelEnum",}
	const enum GValidationResultTypeLengths {}
	/**Vysledek validace pres property nebo field*/
	interface GPropertyValidationResult extends Gordic.General.GValidationResult {
	}
	const enum GPropertyValidationResultNames { Success = "Success", message = "message", member = "member", Dto = "Dto", data = "data", severity = "severity",}
	const enum GPropertyValidationResultFragments { Success = "*", message = "*", member = "*", Dto = "*", data = "*", severity = "*",}
	const enum GPropertyValidationResultTypes { Success = "Gordic.General.GValidationResult", message = "string", member = "string", Dto = "object", data = "object", severity = "Gordic.General.GSeverityLevelEnum",}
	const enum GPropertyValidationResultTypeLengths {}
	/**Vysledek validace pomoci business rules.*/
	interface GBusinessValidationResult extends Gordic.General.GValidationResult {
	}
	const enum GBusinessValidationResultNames { Success = "Success", message = "message", member = "member", Dto = "Dto", data = "data", severity = "severity",}
	const enum GBusinessValidationResultFragments { Success = "*", message = "*", member = "*", Dto = "*", data = "*", severity = "*",}
	const enum GBusinessValidationResultTypes { Success = "Gordic.General.GValidationResult", message = "string", member = "string", Dto = "object", data = "object", severity = "Gordic.General.GSeverityLevelEnum",}
	const enum GBusinessValidationResultTypeLengths {}
}
