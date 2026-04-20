Readers.Gexcdbs = {
	columns: ["dbstate","dbstate_txt","k_v","k_s"],	// keys: "dbstate"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gexcdbs = {
	dropdown: true,
	itemTemplate: "{dbstate_txt}",
	helperColumns: ["dbstate_txt"]
}
