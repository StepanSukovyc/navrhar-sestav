Readers.GAdtReaderIcoFakturace = {
	columns: ["ico_fakt", "nazev"],	// keys: "ico_fakt"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderIcoFakturace = {
	itemTemplate: "{ico_fakt} | {nazev}",
	helperItemTemplate: "<b>{ico_fakt}</b> | {nazev}",
	helperColumns: ["ico_fakt", "nazev"]
}