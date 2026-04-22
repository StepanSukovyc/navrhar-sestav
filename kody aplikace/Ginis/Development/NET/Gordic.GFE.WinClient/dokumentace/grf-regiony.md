# GRF Regiony

Tento dokument popisuje aktualni pravidla pro praci s regiony a datovymi polozkami v GRF sestavach.

Dokument je udrzovany k implementaci ve WinClientu a ma se aktualizovat po kazde zmene pravidel.

## Rozsah

- Tyka se pouze GRF grafickeho editoru ve WinClientu.
- Tyka se operaci vlozeni z datove struktury, presunu existujicich objektu a vlozeni z clipboardu.
- Tyka se jen datove vazanych regionu a polozek. Bezne vizualni komponenty bez datove vazby timto dokumentem omezeny nejsou.

## Zakladni pravidlo

- V GRF musi byt zachovano hierarchicke vnoreni regionu a datovych polozek podle datove struktury.
- Stejna validacni pravidla se pouzivaji pro `insert`, `move` i `paste`, aby stejnou akci neslo obejit jinou cestou.
- Pokud operace pravidla porusi, nesmi se provest a objekt musi zustat na puvodnim miste.

## Terminologie

- `region polozky`: cast nazvu pred posledni teckou.
  Priklad: polozka `ISSUE.PRINOSY.prinos` patri do regionu `ISSUE.PRINOSY`.
- `nadrazeny region`: cast nazvu regionu pred posledni teckou.
  Priklad: region `ISSUE.PRINOSY` ma nadrazeny region `ISSUE`.
- `root`: koren datove struktury.

## Vkladani Regionu

- Region ze struktury lze vlozit jen tam, kde odpovida hierarchii datove struktury.
- Region lze vlozit do sveho bezprostredniho nadrazeneho regionu.
  Priklad: region `ISSUE.PRINOSY` lze vlozit do regionu `ISSUE`.
- Region lze vlozit i do sourozenecke vetve pod stejnym nadrazenym regionem, pokud tim zustane zachovana struktura nad spolecnym predkem.
- Region se nesmi vlozit na misto, ktere by porusilo jeho datovou hierarchii.

## Vkladani Datovych Polozek

- Datovou polozku lze vlozit do jejiho vlastniho regionu.
  Priklad: `ISSUE.PRINOSY.prinos` lze vlozit do `ISSUE.PRINOSY`.
- Datovou polozku nelze vlozit primo do nadrazeneho regionu.
  Priklad: `ISSUE.PRINOSY.prinos` nelze vlozit primo do `ISSUE`.
- Datovou polozku nelze vlozit do sourozeneckeho regionu na stejne urovni.
  Priklad: polozku z regionu `ISSUE.VYHODY` nelze vlozit do regionu `ISSUE.PRINOSY`.
- Stejne plati i opacne pri internim presunu existujici polozky mezi regiony.
  Priklad: `ISSUE.PRINOSY.prinos` nelze presunout do regionu `ISSUE.VYHODY`.
- Datovou polozku nelze vlozit do vetve, ktera neodpovida jejimu vlastnimu regionu.

## Presun Existujicich Objektu

- Pri presunu se pouzivaji stejna pravidla jako pri novem vlozeni z datove struktury.
- Presun v ramci stejneho kontejneru je povolen a meni pouze pozici objektu.
- Pri presunu do jineho kontejneru se nejdriv provede validace a teprve potom se meni parent objektu.
- Pri `dragover` se pouziva stejna regionova validace jako pri `drop`, jen bez zobrazeni varovneho dialogu.
- Interni drag and drop v GRF nesmi obchazet pravidla regionove kompatibility jen proto, ze zdroj i cil lezi na stejne navrhove plose.
- Pokud validace neprojde, presun se zrusi bez dilcich zmen.

## Vkladani Z Clipboardu

- Vlozeni klonovanych objektu z clipboardu pouziva stejnou hierarchickou validaci jako nove vlozeni a presun.
- Clipboard nesmi obchazet pravidla regionove kompatibility.

## Pravidlo Pro Cil Bez Primeho Regionu

- Pokud cilovy kontejner nema vlastni `DataRegionFullName`, hodnoti se kompatibilita podle jiz pritomnych datove vazanych objektu.
- Objekt je kompatibilni, pokud patri do stejneho regionu jako existujici objekt.
- Objekt je kompatibilni i tehdy, pokud ma s existujicim objektem stejny nadrazeny region.
- Toto pravidlo plati jen pro cil bez primeho regionu. Pokud je cilem konkretni region, datova polozka se ridi pouze vlastnim regionem.

## Chovani Pri Neplatne Operaci

- Neplatna operace zobrazi varovani.
- Objekt nebo region se nesmi ponechat v mezistavu.
- Po neplatnem drag and drop musi zustat puvodni parent i puvodni pozice.

## Udrzba Dokumentu

- Pri zmene validacnich pravidel v GRF editoru se musi aktualizovat i tento dokument.
- Pokud se pravidla rozchazeji s implementaci, rozhodujici je aktualni zamer zmeny potvrzeny v changelogu a nasledne upravena implementace.