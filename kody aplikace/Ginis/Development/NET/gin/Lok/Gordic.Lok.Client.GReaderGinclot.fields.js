Readers.Ginclot = {
	columns: ["typ_lot","typ_lot_txt","k_v"],	// keys: "typ_lot"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.ginclot = {
    itemTemplate: "{typ_lot_txt}",
    helperColumns: ["typ_lot_txt"],
    dropdown: true,
}
