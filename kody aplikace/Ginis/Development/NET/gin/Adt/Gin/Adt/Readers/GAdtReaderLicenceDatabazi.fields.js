Readers.GAdtReaderLicenceDatabazi = {
	columns: ["lic_fyz","nazev"],	// keys: "lic_fyz"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderLicenceDatabazi = {
	itemTemplate: "{lic_fyz} | {nazev}",
	helperItemTemplate: "<b>{lic_fyz}</b> | {nazev}",
	helperColumns: ["lic_fyz", "nazev"]
}
