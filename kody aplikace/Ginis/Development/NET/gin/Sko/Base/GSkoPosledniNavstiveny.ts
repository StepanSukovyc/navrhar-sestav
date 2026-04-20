namespace Gordic.Sko.PosledniNavstiveny {

    export interface DataProPosledniNavstivenySko {
        ixp: string
        evidencniCislo: string
    }

    export interface PosledniNavstivenySko {
        ixp: string
        evidencniCislo: string
    }

    export function pridejPosledniNavstiveny(globalSettings: Gordic.Data.IGStorage | null | undefined, detail: DataProPosledniNavstivenySko) {
        if (globalSettings == null) {
            return;
        }
        let data: PosledniNavstivenySko[] = globalSettings.get("contents.SkoHistorieNavstivenychDetailuDlg#.HistNavstivSko", true) || [];

        //vytvorim novy
        var pridatNovyZaznam = true;
        var novyZaznam: PosledniNavstivenySko = {
            ixp: detail.ixp,
            evidencniCislo: detail.evidencniCislo
        }

        //najdu stejny
        let lastIndex: number = 99999;
        for (var i = 0; i < data.length; i++) {
            if (data[i].ixp == novyZaznam.ixp) {
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
        data.unshift(novyZaznam);
        globalSettings.set("contents.SkoHistorieNavstivenychDetailuDlg#.HistNavstivSko", data);
    }
}