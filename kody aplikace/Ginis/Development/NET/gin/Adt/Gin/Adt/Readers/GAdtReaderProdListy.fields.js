Readers.GAdtReaderProdListy = {
	columns: ["id_listu","nazev"],	// keys: "id_listu"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderProdListy = {
	itemTemplate: "{id_listu} | {nazev}",
	helperItemTemplate: "<b>{id_listu}</b> | {nazev}",
	helperColumns: ["id_listu", "nazev"]
}
