# Changelog

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