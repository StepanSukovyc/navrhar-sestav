/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       Adm.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Adm.WebControls\Gordic.Adm.WebControls.csproj
*    created     2026-02-16 14:33:43
*    files       Gin\Adm\Dto\BaseDetailObj.d.ts
*                Gin\Adm\Dto\DictionaryObject.d.ts
*                Gin\Adm\Dto\GAdmResultHromadnaOperace.d.ts
*                Gin\Adm\Dto\GSimplePermissionObj.d.ts
*                Gin\Adm\Wfl\CertifikacniAutorita\GValidationFileCertifikatDto.d.ts
*                Gin\Adm\Wfl\FormularSk\FormFileDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Adm.WebControls\Gin\Adm\Dto\BaseDetailObj.d.ts 

declare namespace Gordic.Adm.WebControls {
	/**Obecný detail pro získání detailu z obsahu výběrové skupiny*/
	interface BaseDetailObj {
		/**Seznam parametrů*/
		paramsList?: Gordic.Adm.WebControls.DictionaryObject[]|null;
		detailName?: string|null;
	}
	const enum BaseDetailObjNames { paramsList = "paramsList", detailName = "detailName",}
	const enum BaseDetailObjFragments { paramsList = "*", detailName = "*",}
	const enum BaseDetailObjTypes { paramsList = "Gordic.Adm.WebControls.DictionaryObject[]", detailName = "string",}
	const enum BaseDetailObjTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.WebControls\Gin\Adm\Dto\DictionaryObject.d.ts 

declare namespace Gordic.Adm.WebControls {
	/**Objekt repreyentující dvojici hodnot*/
	interface DictionaryObject {
		/**Klíč*/
		key?: string|null;
		/**Value*/
		value?: string|null;
	}
	const enum DictionaryObjectNames { key = "key", value = "value",}
	const enum DictionaryObjectFragments { key = "*", value = "*",}
	const enum DictionaryObjectTypes { key = "string", value = "string",}
	const enum DictionaryObjectTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.WebControls\Gin\Adm\Dto\GAdmResultHromadnaOperace.d.ts 

declare namespace Gordic.Adm.WebControls {
	/**Předpis pro výsledek hromadné operace*/
	interface GAdmResultHromadnaOperace<T> {
		/**Výsledek Enum*/
		result?: Gordic.Adm.WebControls.GAdmResultHromadnaOperaceEnum|null;
		/**Zpráva (význam při chybě)*/
		message?: string|null;
		/**Výsledná data*/
		data?: T|null;
	}
	const enum GAdmResultHromadnaOperaceNames { result = "result", message = "message", data = "data",}
	const enum GAdmResultHromadnaOperaceFragments { result = "*", message = "*", data = "*",}
	const enum GAdmResultHromadnaOperaceTypes { result = "Gordic.Adm.WebControls.GAdmResultHromadnaOperaceEnum", message = "string", data = "T",}
	const enum GAdmResultHromadnaOperaceTypeLengths {}
	/**Jednoduchý enum pro v´ýslewdek*/
	const enum GAdmResultHromadnaOperaceEnum {
		/**OK*/
		OK,
		/**Chyba*/
		Error,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.WebControls\Gin\Adm\Dto\GSimplePermissionObj.d.ts 

declare namespace Gordic.Adm.WebControls {
	interface GSimplePermissionObj {
		/**Write*/
		NewPermission?: boolean|null;
		/**Edit*/
		EditPermission?: boolean|null;
		/**Read*/
		ReadPermission?: boolean|null;
	}
	const enum GSimplePermissionObjNames { NewPermission = "NewPermission", EditPermission = "EditPermission", ReadPermission = "ReadPermission",}
	const enum GSimplePermissionObjFragments { NewPermission = "*", EditPermission = "*", ReadPermission = "*",}
	const enum GSimplePermissionObjTypes { NewPermission = "boolean", EditPermission = "boolean", ReadPermission = "boolean",}
	const enum GSimplePermissionObjTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.WebControls\Gin\Adm\Wfl\CertifikacniAutorita\GValidationFileCertifikatDto.d.ts 

declare namespace Gordic.Adm.WebControls {
	/**Validace certifikátu*/
	interface GValidationFileCertifikatDto {
		/**Soubor*/
		file?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Výsledek validace*/
		validationResult?: boolean|null;
		/**Content*/
		content?: string|null;
	}
	const enum GValidationFileCertifikatDtoNames { file = "file", validationResult = "validationResult", content = "content",}
	const enum GValidationFileCertifikatDtoFragments { file = "*", validationResult = "*", content = "*",}
	const enum GValidationFileCertifikatDtoTypes { file = "Gordic.General.ApplicationInterface.GFileInfoDto", validationResult = "boolean", content = "string",}
	const enum GValidationFileCertifikatDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.WebControls\Gin\Adm\Wfl\FormularSk\FormFileDto.d.ts 

declare namespace Gordic.Adm.WebControls {
	/**t59da pro ukládání souborů do ADM*/
	interface FormFileDto {
		/**Modelová hodnota*/
		modelValue?: string|null;
		/**Popis do políčka*/
		caption?: string|null;
		/**Zda se změnila hodnota*/
		changeValue?: boolean|null;
		/**Stará hodnota*/
		oldValue?: string|null;
		/**Stará hodnota*/
		newValue?: string|null;
		/**guid souboru*/
		guid?: string|null;
		/**filename*/
		filename?: string|null;
		/**Povolené přípony souborů*/
		allowExtension?: string|null;
	}
	const enum FormFileDtoNames { modelValue = "modelValue", caption = "caption", changeValue = "changeValue", oldValue = "oldValue", newValue = "newValue", guid = "guid", filename = "filename", allowExtension = "allowExtension",}
	const enum FormFileDtoFragments { modelValue = "*", caption = "*", changeValue = "*", oldValue = "*", newValue = "*", guid = "*", filename = "*", allowExtension = "*",}
	const enum FormFileDtoTypes { modelValue = "string", caption = "string", changeValue = "boolean", oldValue = "string", newValue = "string", guid = "string", filename = "string", allowExtension = "string",}
	const enum FormFileDtoTypeLengths {}
}

//#endregion

