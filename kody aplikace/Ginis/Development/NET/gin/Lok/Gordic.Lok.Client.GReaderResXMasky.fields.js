Readers.ResXMasky = {
	columns: ["verze_db","skup_resx","aktivita","nazev"],	// keys: "verze_db","skup_resx"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.resXMasky = {
    itemTemplate: "{skup_resx}",
    helperColumns: ["skup_resx", "nazev"],
    helperItemTemplate: function (row) { return fieldFunction.getSimpleInfoString(row.skup_resx, row.nazev, "fb");},
    dropdown: true,
}
