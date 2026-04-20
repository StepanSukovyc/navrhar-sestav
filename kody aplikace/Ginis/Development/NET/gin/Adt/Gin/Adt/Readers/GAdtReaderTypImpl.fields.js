Readers.GAdtReaderTypImpl = {
	columns: ["tyi","tyi_txt"],	// keys: "ixs_dif"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderTypImpl = {
	itemTemplate: "{tyi} | {tyi_txt}",
	helperItemTemplate: "<b>{tyi}</b> |{tyi_txt}",
	helperColumns: ["tyi","tyi_txt"]
}
