Readers.Gexcdbt = {
	columns: ["dbtype","dbtype_txt"],	// keys: "dbtype"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gexcdbt = {
	dropdown: true,
	itemTemplate: "{dbtype_txt}",
	helperColumns: ["dbtype_txt"]
}
