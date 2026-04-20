declare namespace Gordic.General {
	/**OrderBy - struktura předepisující jak se má řadit seznam*/
	interface GOrderBy<TColumnId> {
		/**Směr řazení (sestupně/vzestupně)*/
		Direction?: Gordic.General.OrderDirection|null;
		/**Identifikace sloupce, podle kterého se má řadit*/
		ColumnId?: TColumnId|null;
		/**Textový název sloupce*/
		Column?: string|null;
	}
	const enum GOrderByNames { Direction = "Direction", ColumnId = "ColumnId", Column = "Column",}
	const enum GOrderByFragments { Direction = "*", ColumnId = "*", Column = "*",}
	const enum GOrderByTypes { Direction = "Gordic.General.OrderDirection", ColumnId = "TColumnId", Column = "string",}
	const enum GOrderByTypeLengths {}
	/**Směr v kterém se má provádět řazení*/
	const enum OrderDirection {
		/**Vzestupně*/
		Asc,
		/**Sestupně*/
		Desc,
	}
}
