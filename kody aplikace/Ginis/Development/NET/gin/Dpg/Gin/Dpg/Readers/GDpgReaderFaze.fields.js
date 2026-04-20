Readers.GDpgReaderFaze = {
	columns: ["faze", "faze_txt"], keys: "faze",
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gDpgReaderFaze = {
	itemTemplate: "{faze} | {faze_txt}",
	helperItemTemplate: "<b>{faze}</b> | {faze_txt}",
	helperColumns: ["faze", "faze_txt"]
}
