Readers.GAdtReaderSkupinyDatabazi = {
	columns: ["ixs_sdb", "nazev"],	// keys: "ixs_sdb"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderSkupinyDatabazi = {
	itemTemplate: "{ixs_sdb} | {nazev}",
	helperItemTemplate: "<b>{ixs_sdb}</b> | {nazev}",
	helperColumns: ["ixs_sdb", "nazev"]
}
