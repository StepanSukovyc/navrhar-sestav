declare namespace Gordic.Inu.Client {
	/**Globální nastavení Inu*/
	interface GInuGlobals extends Gordic.Inu.Interface.GInuGlobalsBase {
	}
	const enum GInuGlobalsNames { Globalni_Parametry = "Globalni_Parametry", RezimProvozu = "RezimProvozu", cis_real = "cis_real", te1_msk = "te1_msk", b_te1_msk_full = "b_te1_msk_full", te1_msk_start = "te1_msk_start", te1_msk_stop = "te1_msk_stop", rok_srv = "rok_srv",}
	const enum GInuGlobalsFragments { Globalni_Parametry = "*", RezimProvozu = "*", cis_real = "*", te1_msk = "*", b_te1_msk_full = "*", te1_msk_start = "*", te1_msk_stop = "*", rok_srv = "*",}
	const enum GInuGlobalsTypes { Globalni_Parametry = "Gordic.Inu.Interface.GInuGlobalParams", RezimProvozu = "Gordic.Inu.Interface.RezimProvozuEnum", cis_real = "string", te1_msk = "string", b_te1_msk_full = "boolean", te1_msk_start = "number", te1_msk_stop = "number", rok_srv = "number",}
	const enum GInuGlobalsTypeLengths {}
}
