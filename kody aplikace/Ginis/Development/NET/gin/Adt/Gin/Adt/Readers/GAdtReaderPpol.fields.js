Readers.GAdtReaderPpol = {
	columns: ["ppol","popis"], keys: "ppol",
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderPpol = {
	itemTemplate: "{ppol} | {popis}",
	helperItemTemplate: "<b>{ppol}</b> | {popis}",
	helperColumns: ["ppol", "popis"]
}
