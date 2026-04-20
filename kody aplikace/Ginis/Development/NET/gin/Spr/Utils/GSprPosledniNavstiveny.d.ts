declare namespace Gordic.Spr.Globals.PosledniNavstiveny {
    interface DataProPosledniNavstivenySpr {
        Ixp: string;
        Nazev: string;
        AktZnacka: string;
        NazevDsr: string;
    }
    interface PosledniNavstivenySpr {
        ixp: string;
        vec: string;
        poradi?: number;
        akt_znacka: string;
        nazev_dsr: string;
    }
    function pridejPosledniNavstiveny(globalSettings: Gordic.Data.IGStorage | null | undefined, detailSSL: DataProPosledniNavstivenySpr): void;
}
