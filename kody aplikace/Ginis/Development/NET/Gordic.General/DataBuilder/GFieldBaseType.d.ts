declare namespace Gordic.General {
	/**Třída pro práci se základními hodnotovými typy*/
	interface GFieldBaseType {
	}
	const enum GFieldBaseTypeNames {}
	const enum GFieldBaseTypeFragments {}
	const enum GFieldBaseTypeTypes {}
	const enum GFieldBaseTypeTypeLengths {}
	/**Základní datové typy polí redukované např. pro potřeby JavaScriptu*/
	const enum GFieldBaseTypeEnum {
		/**Bool*/
		BOOLEAN,
		/**Celočíselná čísla*/
		NUMBER,
		/**Desetinná čísla*/
		DECIMAL,
		/**Texty*/
		TEXT,
		/**Datumy*/
		DATE,
		/**DAtum a Čas*/
		DATETIME,
		/**Ostatní*/
		OTHER,
	}
}
