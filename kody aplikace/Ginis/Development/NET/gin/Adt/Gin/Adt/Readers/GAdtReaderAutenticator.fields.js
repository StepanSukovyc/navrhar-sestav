Readers.GAdtReaderAutenticator = {
	columns: ["faze","level_exp","popis"],	// keys: "faze"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderAutenticator = {
	itemTemplate: "{faze} | {popis}",
	helperItemTemplate: "<b>{faze}</b> | {popis}",
	helperColumns: ["faze", "level_exp", "popis"]
}
