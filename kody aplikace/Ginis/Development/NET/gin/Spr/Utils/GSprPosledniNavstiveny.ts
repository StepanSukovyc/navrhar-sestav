namespace Gordic.Spr.Globals.PosledniNavstiveny {
    export interface DataProPosledniNavstivenySpr {
        //SEle: number
        //PrizSpis: number
        Ixp: string
        Nazev: string
        AktZnacka: string
        NazevDsr: string;
    }

    export interface PosledniNavstivenySpr {
        ixp: string
        //type: number
        vec: string
        poradi?: number
        akt_znacka: string
        nazev_dsr: string;
    }

    export function pridejPosledniNavstiveny(globalSettings: Gordic.Data.IGStorage | null | undefined, detailSSL: DataProPosledniNavstivenySpr) {
        if (globalSettings == null) {
            return;
        }

        //let l_nPDok = 0; // dokument

        //if (detailSSL.SEle == 1) {
        //    l_nPDok = 1; // el. dokument
        //} else if (detailSSL.SEle == 2) {
        //    l_nPDok = 2; // el. dokument
        //}
        //if (detailSSL.PrizSpis == 1) {
        //    l_nPDok = 3;
        //}
        let data: PosledniNavstivenySpr[] = globalSettings.get("contents.SPRHistorieNavstivenychDokumentuDlg#.HistNavstivDok", true) || [];

        //vytvorim novy
        var pridatNovyZaznam = true;
        var novyDoc: PosledniNavstivenySpr = {
            ixp: detailSSL.Ixp,
            vec: detailSSL.Nazev,
            akt_znacka: detailSSL.AktZnacka,
            //type: l_nPDok,
            nazev_dsr: detailSSL.NazevDsr,
        }

        //najdu stejny
        let lastIndex: number = 99999;
        for (var i = 0; i < data.length; i++) {
            if (data[i].ixp == novyDoc.ixp) {
                lastIndex = i;
            }
        }
        if (lastIndex == 0) {
            pridatNovyZaznam = false
        }

        //vymazu stejny nebo poslední
        if (lastIndex != 99999) {
            data.splice(lastIndex, 1);
        } else if (data.length === 15) {
            data.splice(14, 1);
        }

        if (pridatNovyZaznam) {
            data.unshift(novyDoc);
            globalSettings.set("contents.SPRHistorieNavstivenychDokumentuDlg#.HistNavstivDok", data);
        }
    }


}