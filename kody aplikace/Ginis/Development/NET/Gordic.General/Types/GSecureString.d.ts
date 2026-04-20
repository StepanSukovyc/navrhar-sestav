declare namespace Gordic.General {
	/**
	*     Třída pro práci s tajemstvím v rámci paměti procesu - umožní pracovat rovnocenně s 
	*     předaným IPasswordSecret nebo s heslem předaným na vstupu jako string. 
	*     Na cílovém místě umožní použití tajemství přes property Secret
	*     Ta by se měla použít co nejblíže jejímu předání externímu kódu - např. těsně před DB připojením 
	*     
	*/
	interface GSecureString {
		/**
		*     Value of secret - IPasswordSecret
		*     Pokud tajemství nebylo nastaveno, vrací null
		*     
		*/
		readonly Secret?: string|null;
		/**příznak nenastavení nebo nastavení hodnoty null*/
		IsNull?: boolean|null;
		/**
		*     Příznak, že je nastaveno nějaké tajemství.
		*     
		*/
		readonly Exists?: boolean|null;
	}
	const enum GSecureStringNames { Secret = "Secret", IsNull = "IsNull", Exists = "Exists",}
	const enum GSecureStringFragments { Secret = "*", IsNull = "*", Exists = "*",}
	const enum GSecureStringTypes { Secret = "string", IsNull = "boolean", Exists = "boolean",}
	const enum GSecureStringTypeLengths {}
}
