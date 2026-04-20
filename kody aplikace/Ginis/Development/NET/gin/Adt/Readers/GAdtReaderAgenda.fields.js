Readers.GAdtReaderAgenda = {
	columns: ["typ_ag","typ_ag_txt"],	// keys: "typ_ag"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderAgenda = {
	itemTemplate: "{typ_ag} | {typ_ag_txt}",
	helperItemTemplate: "<b>{typ_ag}</b> |{typ_ag_txt}",
	helperColumns: ["typ_ag", "typ_ag_txt"]
}
