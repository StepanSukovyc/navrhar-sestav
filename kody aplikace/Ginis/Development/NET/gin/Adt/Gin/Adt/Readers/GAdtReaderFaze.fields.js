Readers.GAdtReaderFaze = {
	columns: ["faze","faze_txt","submodel"],	 keys: "faze",
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderFaze = {
	itemTemplate: "{faze} | {faze_txt}",
	helperItemTemplate: "<b>{faze}</b> | {faze_txt}",
	helperColumns: ["faze", "faze_txt","submodel"]
}


