Readers.GAdtReaderStavRevize = {
	columns: ["stav_revize_txt"],	// keys: "stav_revize"
	rowSize: 100,
	readAll: false,
	permanent: false
}
Fields.gAdtReaderStavRevize = {
	//itemTemplate: "{stav_revize_txt}",
	itemTemplate: (obj) => {
		if (obj.stav_revize == 0) {
			//"<div class='fa fa-file-archive-o minifoto'></div><b>{nazev}</b><br><i>archive/zip ({velikost})</i>"
			return "<div class='fa fa-check-circle g-state-text g-state-success'></div>  " +"<b>" + obj.stav_revize_txt + "</b>"; 
		}
		else if (obj.stav_revize == 20) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-warning'></div>  " + "<b>" + obj.stav_revize_txt + "</b>";
		}
		else if (obj.stav_revize == 50) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-important'></div>  " + "<b>" + obj.stav_revize_txt + "</b>";
		}
	},
	helperItemTemplate: (obj) => {
		if (obj.stav_revize == 0) {
			return "<div class='fa fa-check-circle g-state-text g-state-success minifoto'></div> " + "<b>" + obj.stav_revize_txt + "</b><br><i>" + "Doporučená revize distribučního balíku"; 
		}
		else if (obj.stav_revize == 20) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-warning minifoto'></div> " + "<b>" + obj.stav_revize_txt + "</b><br><i>" + "Testovací revize distribučního balíku";
		}
		else if (obj.stav_revize == 50) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-important minifoto'></div> " + "<b>" + "Nedoporučená" + "</b><br><i>" + "Nedoporučená revize, k omezenému použití";
		}
	},
	//helperItemTemplate: "{stav_revize_txt}",
	helperColumns: ["stav_revize_txt"]
}
