Readers.GAdtReaderIcoAdministrace = {
	columns: ["ico_adm", "nazev"],	// keys: "ico_adm"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderIcoAdministrace = {
	itemTemplate: "{ico_adm} | {nazev}",
	helperItemTemplate: "<b>{ico_adm}</b> | {nazev}",
	helperColumns: ["ico_adm", "nazev"]
}

