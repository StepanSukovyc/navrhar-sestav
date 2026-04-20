Readers.GAdtReaderVerzeGDZBaliku = {
	columns: ["verze_db", "sub_verze_db", "revize_adz"],	// keys: "verze_db"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderVerzeGDZBaliku = {
	itemTemplate: "{verze_db}.{sub_verze_db}.{revize_adz}",
	helperColumns: ["verze_db", "sub_verze_db", "revize_adz"]
}
