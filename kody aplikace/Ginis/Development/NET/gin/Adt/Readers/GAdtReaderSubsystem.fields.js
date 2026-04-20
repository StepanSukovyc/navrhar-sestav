Readers.GAdtReaderSubsystem = {
	columns: ["subsyst","subsyst_txt"],	// keys: "subsyst"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderSubsystem = {
	itemTemplate: "{subsyst} | {subsyst_txt}",
	helperItemTemplate: "<b>{subsyst}</b> |{subsyst_txt}",
	helperColumns: ["subsyst", "subsyst_txt"]
}
