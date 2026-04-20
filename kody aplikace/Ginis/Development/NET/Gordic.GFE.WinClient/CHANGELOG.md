# Changelog

## 2026-04-20

### Opravy OXS editoru a generovani ALF

- Opraveno rozpadani posledniho regionu po prepnuti OXS sestavy z Navrhu zpet do kodu pri zmene samotneho formatovani bunky.
- Opraveno nacitani atributu a promennych pri inicializaci `OfficeAtom`, aby se pri synchronizaci neztracely metadata regionu, skupin a polozek.
- Opravena deserializace `OfficeAtomRegionItem` a `OfficeAtomGroupItem`, aby se korektne obnovovala serializovana data z komentaru.
- Synchronizace komentaru novne doplnuje chybejici `name` z textu komentare, pokud je metadata neobsahuji.
- OXS synchronizace novne umi sparovat zkracene nazvy regionu z komentaru s plnymi nazvy ve strukture a preferuje identifikaci podle GUID.
- Opravena validace pri prepisu komentaru v `OxsOfficeDocument`, aby prijimala i suffix-match mezi zkracenym nazvem a plnou cestou regionu.
- Generovani ALF novne vypisuje relativni nazvy regionu misto plnych cest, aby vystup zustal validni pro zanorene regiony.
- Upraveno skladani XML v `OxsDocument`, aby vysledny ALF mel stabilni strukturalni odsazeni i po zpetnem generovani z komentaru.