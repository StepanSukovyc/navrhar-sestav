Readers.GAdtReaderVlastniLicDB = {
	columns: ["lic", "nazev"], keys: "lic",
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderVlastniLicDB = {
	itemTemplate: "{lic} | {nazev}",
	helperItemTemplate: "<b>{lic}</b> | {nazev}",
	helperColumns: ["lic", "nazev"]
}
