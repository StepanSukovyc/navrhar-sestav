/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       kce.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Idm.Interface\Gordic.Idm.Interface.csproj
*    created     2026-02-16 14:34:24
*    files       Controllers\Message.d.ts
*                Objects\AuditableObject.d.ts
*                Objects\EntityObject.d.ts
*                Objects\NamedObject.d.ts
*                Support\IdmGlobalSetting.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Idm.Interface\Controllers\Message.d.ts 

declare namespace Gordic.Idm.Interface.Controllers {
	/**Message*/
	const enum Message {
		/**Uzivatel nema opravneni zapisovat*/
		UserCannotWrite,
		/**Object jiz existuje*/
		ObjectIsExist,
		/**OK*/
		OK,
		/**Neznama chyba*/
		Error,
		/**Object neexistuje*/
		ObjectIsNotExist,
		/**Spusteno na pozadi, probiha*/
		InProgress,
		/**Není podporováno*/
		NotSupported,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Idm.Interface\Objects\AuditableObject.d.ts 

declare namespace Gordic.Idm.Interface.IdmObjects {
    /**Base auditable object*/
	interface AuditableObject extends Gordic.Idm.Interface.IdmObjects.NamedObject {
        /**Object's creation time*/
		DatumVytvoreni?: JsonDate|null;
        /**Object's modification time*/
		DatumZmeny?: JsonDate|null;
        /**Responsible person to last change*/
		ZmenuProv?: string|null;
        /**State of object*/
		Aktivita?: number|null;
	}
	const enum AuditableObjectNames { DatumVytvoreni = "DatumVytvoreni", DatumZmeny = "DatumZmeny", ZmenuProv = "ZmenuProv", Aktivita = "Aktivita", Name = "Name", Id = "Id",}
	const enum AuditableObjectFragments { DatumVytvoreni = "*", DatumZmeny = "*", ZmenuProv = "*", Aktivita = "*", Name = "*", Id = "*",}
	const enum AuditableObjectTypes { DatumVytvoreni = "JsonDate", DatumZmeny = "JsonDate", ZmenuProv = "string", Aktivita = "number", Name = "string", Id = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Idm.Interface\Objects\EntityObject.d.ts 

declare namespace Gordic.Idm.Interface.IdmObjects {
    /**Base class for all entities in DB*/
	interface EntityObject {
        /**Id*/
		Id?: number|null;
	}
	const enum EntityObjectNames { Id = "Id",}
	const enum EntityObjectFragments { Id = "*",}
	const enum EntityObjectTypes { Id = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Idm.Interface\Objects\NamedObject.d.ts 

declare namespace Gordic.Idm.Interface.IdmObjects {
    /**Object with name*/
	interface NamedObject extends Gordic.Idm.Interface.IdmObjects.EntityObject {
        /**Name of object*/
		Name?: string|null;
	}
	const enum NamedObjectNames { Name = "Name", Id = "Id",}
	const enum NamedObjectFragments { Name = "*", Id = "*",}
	const enum NamedObjectTypes { Name = "string", Id = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Idm.Interface\Support\IdmGlobalSetting.d.ts 

declare namespace Gordic.Idm.Interface.Support {
    /**IdmGlobalSetting*/
	interface IdmGlobalSetting extends Gordic.Idm.Interface.IdmObjects.AuditableObject {
        /**Value for specified key*/
		Value?: string|null;
	}
	const enum IdmGlobalSettingNames { Value = "Value", DatumVytvoreni = "DatumVytvoreni", DatumZmeny = "DatumZmeny", ZmenuProv = "ZmenuProv", Aktivita = "Aktivita", Name = "Name", Id = "Id",}
	const enum IdmGlobalSettingFragments { Value = "*", DatumVytvoreni = "*", DatumZmeny = "*", ZmenuProv = "*", Aktivita = "*", Name = "*", Id = "*",}
	const enum IdmGlobalSettingTypes { Value = "string", DatumVytvoreni = "JsonDate", DatumZmeny = "JsonDate", ZmenuProv = "string", Aktivita = "number", Name = "string", Id = "number",}
}

//#endregion

