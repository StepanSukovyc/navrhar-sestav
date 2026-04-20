declare namespace Gordic.Sko.PosledniNavstiveny {
    interface DataProPosledniNavstivenySko {
        ixp: string;
        evidencniCislo: string;
    }
    interface PosledniNavstivenySko {
        ixp: string;
        evidencniCislo: string;
    }
    function pridejPosledniNavstiveny(globalSettings: Gordic.Data.IGStorage | null | undefined, detail: DataProPosledniNavstivenySko): void;
}
