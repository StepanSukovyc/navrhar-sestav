# Changelog

## 2026-04-21

### 07:12:52 Oprava nacitani obsahu ze streamu nebo ze souboru

- Upraveno `TextEditorControlBase.LoadFile(string fileName, Stream stream, ...)`, aby metodu slo pouzit jak pro nacitani z dodaneho streamu, tak pro nacitani z platne cesty k souboru.
- Pokud ma stream obsah, editor nacte data ze streamu; pokud je stream prazdny, ale `fileName` ukazuje na existujici soubor, nacte obsah z teto cesty.
- Pokud neni k dispozici ani validni stream ani existujici soubor, editor korektne nastavi prazdny obsah misto vyvolani chyby pri pokusu o otevreni neplatne cesty.