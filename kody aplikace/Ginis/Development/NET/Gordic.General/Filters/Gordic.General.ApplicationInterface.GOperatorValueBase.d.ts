declare namespace Gordic.General {
	/**Hodnota a operátor, podle kterých se provádí filtrace.*/
	interface GOperatorValueBase {
		/**Jaká podmínka je použita pro filtrování podle této hodnoty*/
		Operator?: Gordic.General.OperatorEnum|null;
	}
	const enum GOperatorValueBaseNames { Operator = "Operator",}
	const enum GOperatorValueBaseFragments { Operator = "*",}
	const enum GOperatorValueBaseTypes { Operator = "Gordic.General.OperatorEnum",}
	const enum GOperatorValueBaseTypeLengths {}
	/**Operátor pro filtr - podmínka, která je mezi hodnotou slopce a filtračním textem v WHERE podmínce*/
	const enum OperatorEnum {
		/**Znaménko =*/
		Equal=0,
		/**Znaménko !=*/
		NotEqual=1,
		/**LIKE. Pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla*/
		Like=2,
		/**LIKE. Pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla*/
		StartsWith=2,
		/**IN, očekává několik za sebou zřetězených values s OperatorEnum.In, ty poskládá v jeden IN*/
		In=3,
		/**IN, očekává na vstupu GString s hodnotami v textové podobě oddělené čárkou*/
		InText=4,
		/**větší*/
		Greater=5,
		/**menší*/
		Less=6,
		/**větší nebo rovno*/
		GreaterOrEqual=7,
		/**menší nebo rovno*/
		LessOrEqual=8,
		/**vynechává pravou stranu, nechává pouze název sloupce. Používá se v případě, že
		*     aplikační logika si překonstruuje filtr tak, že obsahuje složitější příkaz (například vnořené selecty)
		*     a ten uloží to Columname, filter.Where potom může vrátit jakoukoliv konstrukci
		*/
		OnlyColumname=9,
		/**LIKE. Pokud není v řetězci znak "%", doplní ho na konec i na začátek řetězce, jinak ponechá procenta tak jak byla*/
		Contains=10,
		/**IN, očekává několik za sebou zřetězených values s OperatorEnum.In, ty poskládá v jeden NOT IN*/
		NotIn=11,
		/**NOT LIKE, pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla...*/
		NotLike=12,
		/**menší*/
		IntervalLess=134,
		/**menší nebo rovno*/
		IntervalLessOrEqual=136,
		/**NEPOUŽÍVAT. maska pro intervaly*/
		IntervalMask=128,
	}
}
