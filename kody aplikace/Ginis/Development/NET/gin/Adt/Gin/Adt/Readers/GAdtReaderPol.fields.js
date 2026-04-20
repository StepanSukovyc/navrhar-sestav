Readers.GAdtReaderPol = {
	columns: ["pol","popis_pol"], keys: "pol",
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderPol = {
	itemTemplate: "{pol} | {popis_pol}",
	helperItemTemplate: "<b>{pol}</b> | {popis_pol}",
	helperColumns: ["pol", "popis_pol"]
}
