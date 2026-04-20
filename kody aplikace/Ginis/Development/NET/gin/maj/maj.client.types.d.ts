/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       maj.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Maj.Client\Gordic.Maj.Client.csproj
*    created     2026-02-16 14:33:51
*    files       Controls\GGuptaBtn.d.ts
*                Controls\GGuptaDbBox.d.ts
*                Controls\GGuptaKrtDbBox.d.ts
*                Controls\KlasifikaceSkupina.fields.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Maj.Client\Controls\GGuptaBtn.d.ts 

declare namespace Gordic.Maj.Client {
	/**Wrapper tlačítka v GPT*/
	interface GGuptaBtn {
		/**Popiska*/
		Title?: string|null;
		/**Přístupnost*/
		Edit?: boolean|null;
		/**Viditelnost*/
		Visible?: boolean|null;
		/**Zaškrtnuto ano/ne*/
		Checked?: boolean|null;
	}
	const enum GGuptaBtnNames { Title = "Title", Edit = "Edit", Visible = "Visible", Checked = "Checked",}
	const enum GGuptaBtnFragments { Title = "*", Edit = "*", Visible = "*", Checked = "*",}
	const enum GGuptaBtnTypes { Title = "string", Edit = "boolean", Visible = "boolean", Checked = "boolean",}
	const enum GGuptaBtnTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Client\Controls\GGuptaDbBox.d.ts 

declare namespace Gordic.Maj.Client {
	/**Wrapper DB políčka v GUPTA*/
	interface GGuptaDbBox {
		/**Přístupnost*/
		Edit?: boolean|null;
		Editable?: boolean|null;
		/**příznak že bylo editováno*/
		EditFrm?: boolean|null;
		Visible?: boolean|null;
		Required?: boolean|null;
		/**Titulek komponenty*/
		Label?: string|null;
		/**Max. počet znaků políčka*/
		MaxLen?: number|null;
	}
	const enum GGuptaDbBoxNames { Edit = "Edit", Editable = "Editable", EditFrm = "EditFrm", Visible = "Visible", Required = "Required", Label = "Label", MaxLen = "MaxLen",}
	const enum GGuptaDbBoxFragments { Edit = "*", Editable = "*", EditFrm = "*", Visible = "*", Required = "*", Label = "*", MaxLen = "*",}
	const enum GGuptaDbBoxTypes { Edit = "boolean", Editable = "boolean", EditFrm = "boolean", Visible = "boolean", Required = "boolean", Label = "string", MaxLen = "number",}
	const enum GGuptaDbBoxTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Client\Controls\GGuptaKrtDbBox.d.ts 

declare namespace Gordic.Maj.Client {
	/**Wrapper DB políčka v GPT  - pro kartu MAJ (má navíc "ModeEdit") - poděděno z { cdf_KartaItem }*/
	interface GGuptaKrtDbBox extends Gordic.Maj.Client.GGuptaDbBox {
		/**cgw_BaseItem._setModeEdit( )*/
		ModeEdit?: number|null;
	}
	const enum GGuptaKrtDbBoxNames { ModeEdit = "ModeEdit", Edit = "Edit", Editable = "Editable", EditFrm = "EditFrm", Visible = "Visible", Required = "Required", Label = "Label", MaxLen = "MaxLen",}
	const enum GGuptaKrtDbBoxFragments { ModeEdit = "*", Edit = "*", Editable = "*", EditFrm = "*", Visible = "*", Required = "*", Label = "*", MaxLen = "*",}
	const enum GGuptaKrtDbBoxTypes { ModeEdit = "number", Edit = "boolean", Editable = "boolean", EditFrm = "boolean", Visible = "boolean", Required = "boolean", Label = "string", MaxLen = "number",}
	const enum GGuptaKrtDbBoxTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Maj.Client\Controls\KlasifikaceSkupina.fields.d.ts 



declare namespace Gordic.Prefabs.Select {

    interface GMajKlasifikaceSkupinaInputDto {
        skp?: string | null | undefined;
        //uex?: string[];
        //uea_rr?: string;
        //ueb_rr?: string;
        //rokPol?: number;
        //rokSml?: string | number
        //prijmy?: boolean | (() => JQueryPromise<boolean>);
        //pouzeSmlouvy?: boolean;
        //nks?: string;
        //kryLik?: number;
        //ixps?: string[];
        //ixs_fun_vyriz?: string;
        //castka?: Decimal;
        //filtrovatPodlePol?: boolean;
        //navazaniNaSkladbu?: boolean;
    }

    interface GMajKlasifikaceSkupinaOptions {
      //  serverFilters?: Eko.Client.GVyberSmluvFilterDto & {
      //      /**OBSOLETE - use ixp_sml_pri */
      //      ixp?: string;
      //  };
      ///**
      // * Eko věci
      // * @type {GEkoVyberSmlouvyInputDto&ObjectLiteral<any>}
      // */
        inputDto: GMajKlasifikaceSkupinaInputDto & ObjectLiteral<any> | GObservableObject<GMajKlasifikaceSkupinaInputDto & ObjectLiteral<any>>;
      //mode?: 'sml';
      //canNewAndRefund?: boolean;
      //canSelectEmpty?: boolean;
      //multi?: boolean;
      ///** @default false */
      //  init?: (inputDto: GEkoVyberSmlouvyInputDto, defaultFilter: GEkoVyberSmlouvyInitFilter) => void
      //esuLogovani: Gin.Globals.Dialogs.IGLogovani
      ///** @obsolete Použijte related! */
      //parentContent?: GContent;
      related?:GContent
      /*smlSelectName?: string;*/
    }
    

    function majKlasifikaceSkupina(options: GMajKlasifikaceSkupinaOptions): GSelectBoxOptions<any>
}




//#endregion

