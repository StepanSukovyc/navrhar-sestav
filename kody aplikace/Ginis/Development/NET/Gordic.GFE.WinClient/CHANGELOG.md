# Changelog

## 2026-04-22

### 19:02:00 Zprisneni pravidel vkladani datovych polozek do GRF regionu

- Opravena validace vkladani a presunu datovych polozek do konkretniho GRF regionu tak, aby neslo vlozit polozku do sourozeneckeho regionu na stejne urovni.
- Datova polozka se pri cili typu region nyni ridi pouze svym vlastnim regionem; sdileny nadrazeny region uz nestaci.
- Opravena i interni drag and drop validace v GRF editoru, aby se stejne pravidlo uplatnilo jak pri `dragover`, tak pri finalnim `drop` presunu mezi regiony.
- Pri presunu existujici polozky uz nelze pretahnout objekt z jednoho regionu do jineho nekompatibilniho regionu jen tim, ze jde o interni move uvnitr GRF plochy.
- Aktualizovana dokumentace [dokumentace/grf-regiony.md](dokumentace/grf-regiony.md), aby odpovidala zprisnenemu pravidlu pro datove polozky v regionu.

### 18:09:00 Doplneni dokumentace pravidel regionu v GRF sestavach

- Do projektu WinClient byla pridana udrzovana dokumentace [dokumentace/grf-regiony.md](dokumentace/grf-regiony.md) s aktualnimi pravidly pro regiony a datove polozky v GRF sestavach.
- Dokument shrnuje pravidla pro `insert`, `move` a `paste`, vcetne chovani pri neplatnem drag and drop a pozadavku na zachovani hierarchickeho vnoreni.
- Dokument ma slouzit jako referencni zdroj a ma se aktualizovat po kazde zmene regionovych pravidel v GRF editoru.

### 16:42:00 Oprava validace hierarchie regionu v GRF editoru

- Sjednocena validace regionove hierarchie v GRF editoru pro presun existujicich objektu, vkladani z datove struktury a vlozeni klonovanych objektu z clipboardu.
- Opravena logika kompatibility datovych polozek pri presunu mezi kontejnery, aby povolovala i bezne vztahy predka a potomka regionu a neblokovala validni presuny do vnorenych oblasti.
- Doplnen reset interakcniho resize stavu po zmene vyberu nebo odstraneni objektu, aby po smazani bunky nezustaval aktivni kurzor pro zmenu velikosti.
- Tato uprava stabilizuje GRF navrhar tak, aby pravidlo hierarchickeho vnoreni regionu a polozek odpovidalo dokumentaci konzistentne napric operacemi drag and drop, move a paste.

### 17:31:00 Zprisneni pravidel presunu datovych polozek v GRF

- Opraven presun datovych polozek z vnorenych regionu tak, aby neslo pretahnout polozku primo do jejiho nadrazeneho regionu.
- Validace presunu vice objektu probiha atomicky a ke zmene parentu dochazi az po uspesnem overeni vsech presouvanych objektu.
- Pri neplatnem dropu proto objekt zustava na puvodnim miste bez mezistavu a bez castecne provedene zmeny.

## 2026-04-21

### 08:34:00 Oprava generovani copy-and-fill v MSE a OXS sekcich

- Opravena tvorba fallback `copy-and-fill` pri generovani ALF z MSE a OXS sablon, aby se nevkladal do sekce `head`, `body` ani `foot`, pokud uz dana sekce obsahuje alespon jedno `value-of`.
- Uprava se propsala do XML generovani pres `OfficeUtil` i do textoveho skladani OXS v `OxsDocument`, aby se stejne pravidlo uplatnilo konzistentne ve vsech blocich sestavy.
- Tim se odstraňuje chybny vystup, kdy se do jednoho bloku kombinoval realny obsah `value-of` s prazdnym fallback `copy-and-fill`, coz vedlo k nefunkcnimu nebo zavadejicimu ALF kodu.

### 07:12:52 Oprava nacitani nove OXS sestavy bez fyzickeho souboru

- Upraveno vytvareni nove neulozene ALF/OXS sestavy, aby WinClient pro jeji obsah vytvoril docasny backing soubor a nepracoval jen s relativnim pseudo-nazvem.
- Oprava stabilizuje otevreni nove sestavy v XML editoru a brani tomu, aby se neexistujici cesta skladala proti aktualnimu pracovnimu adresari procesu.
- Tim se odstranuje pad pri zakladani nove OXS sestavy, kdy se aplikace pokousela otevrit soubor pod nahodnym podadresarem v `system32` nebo `bin`.

## 2026-04-20

### 19:51:51 Oprava zachovani custom fontu pri presunu objektu

- Opravena serializace stylu v grafickem editoru, aby se puvodni `font-face="custom"` s `font-name` pri posunu nebo jine uprave objektu neprepisoval na alias `arial`.
- Doplnena pomocna logika ve WinClientu, ktera pri generovani XML umi zachovat puvodni custom font ze stylu nacteneho do editoru.
- Upraven zapis stylu v `AbstractContent` a `ContentPArea`, aby custom fonty korektne prosly round-tripem mezi nactenim, editaci a ulozenim sestavy.

### 18:48:32 Oprava MSE embedu Excelu

- Zjednodusen `MseContainerControl`, aby pri otevreni MSE sestavy pouzival standardni zobrazeni dokumentu bez vlastni retry a reattach logiky.
- Odebrano dodatecne preparentovavani a odlozene prekreslovani Excel okna, ktere zpusobovalo nekorektni prvni zobrazeni MSE editoru.
- Chovani MSE embed kontejneru bylo sjednoceno s funkcnim pristupem pouzivanym v OXS editoru, aby prvni otevreni Excelu nabehlo korektne.

### Opravy OXS editoru a generovani ALF

- Opraveno rozpadani posledniho regionu po prepnuti OXS sestavy z Navrhu zpet do kodu pri zmene samotneho formatovani bunky.
- Opraveno nacitani atributu a promennych pri inicializaci `OfficeAtom`, aby se pri synchronizaci neztracely metadata regionu, skupin a polozek.
- Opravena deserializace `OfficeAtomRegionItem` a `OfficeAtomGroupItem`, aby se korektne obnovovala serializovana data z komentaru.
- Synchronizace komentaru novne doplnuje chybejici `name` z textu komentare, pokud je metadata neobsahuji.
- OXS synchronizace novne umi sparovat zkracene nazvy regionu z komentaru s plnymi nazvy ve strukture a preferuje identifikaci podle GUID.
- Opravena validace pri prepisu komentaru v `OxsOfficeDocument`, aby prijimala i suffix-match mezi zkracenym nazvem a plnou cestou regionu.
- Generovani ALF novne vypisuje relativni nazvy regionu misto plnych cest, aby vystup zustal validni pro zanorene regiony.
- Upraveno skladani XML v `OxsDocument`, aby vysledny ALF mel stabilni strukturalni odsazeni i po zpetnem generovani z komentaru.