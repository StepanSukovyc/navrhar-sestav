Readers.GAdtReaderDostupneVerzeRevize = {
	columns: ["verze_db", "sub_verze_db"],	// keys: "verze_db"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderDostupneVerzeRevize = {
	itemTemplate: "{verze_db}.{sub_verze_db}",
	helperColumns: ["verze_db", "sub_verze_db"]
}