Readers.GAdtReaderAgt = {
	columns: ["agt","agt_txt"],	// keys: "agt"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderAgt = {
	itemTemplate: "{agt} | {agt_txt}",
	helperItemTemplate: "<b>{agt}</b> |{agt_txt}",
	helperColumns: ["agt", "agt_txt"]
}
