Readers.DostupneLicence = {
	columns: ["lic_fyz", "nazev", "verze_db", "sub_verze_db", "revize_adz"],	// keys: "lic_fyz"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.dostupneLicence = {
	itemTemplate: "{lic_fyz} | {nazev}",
	helperItemTemplate: "<b>{lic_fyz}</b> | {nazev}",
	helperColumns: ["lic_fyz", "nazev"]
}
//Selectors.dostupneLicence = {

//}
