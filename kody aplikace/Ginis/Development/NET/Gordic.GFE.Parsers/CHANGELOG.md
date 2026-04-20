# Changelog

## 2026-04-20

### 19:51:51 Oprava inicializace custom fontu ze stylu

- Opravena inicializace `TagTextFont` z `GFEFormatStyle`, aby se pri nacitani stylu prednostne zachoval puvodni `font-name` a pripadne `font-face` misto uz normalizovaneho nazvu `FontFamily`.
- Custom fonty typu `font-face="custom" font-name="Microsoft Sans Serif"` se novne pri nacteni neprevedou na standardni alias `arial`.
- Oprava stabilizuje round-trip stylu mezi parserem a WinClientem pri editaci a zpetnem ulozeni sestavy.
