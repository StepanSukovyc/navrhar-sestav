Readers.DostupneVerzeRevize = {
	columns: ["verze_db","sub_verze_db"],	// keys: "verze_db"
	rowSize: 100,
	readAll: false,
	permanent: false,
	
}
Fields.dostupneVerzeRevize = {
	itemTemplate: "{verze_db}.{sub_verze_db}",
	helperItemTemplate: "{verze_db}.{sub_verze_db}",
	helperColumns: ["verze_db", "sub_verze_db", "verze_db_txt"],
}

