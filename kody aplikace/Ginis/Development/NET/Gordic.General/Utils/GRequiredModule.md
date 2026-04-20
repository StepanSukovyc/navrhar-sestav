Třída [**Gordic.General.GRequiredModule**](./GRequiredModule.cs) je pouze DTO objekt používaný v rámci  [**Gordic.General.GTstFile**](./GTstFile.cs) a obsahuje jeden požadavek na instalaci konkrétního dalšího modulu.

Požadavek na modul se uvádí v TST souboru instalovaného distribučního balíku v sekci **REQUIRED**.

Vyjadřuje, že pro správnou funkci nainstalované komponenty je nutné nainstalovat také zde uvedenou požadovanou komponentu.

> U požadavku lze uvést minimální požadovanou subverzi balíku. V ukázce je to GINICA01_**SUB_VERZE_MIN**=3.
> Hlavní verze nainstalovaných komponent musí být vždy shodná, proto se nemusí uvádět. Ve vzorovém případě se jedná o verze 390.

Lze uvést, zda přítomnost balíku je povinná, nebo jen doporučená. GSANAH01_**mandatory**=FALSE

Nepovinná se nemusí instalovat. Pokud se ale jednou nainstaluje, potom se stává pro fungování komponenty povinnou a již se hlídá její verze ato na minimální požadovanou verzi a na proti DB povolenou verzi.  
Pokud není verze správná, potom se zkouší automatická aktualizace z databáze. Pokud nedopadne dobře, tak aplikace odmítne pracovat.

*Ukázka obsahu TST souboru:*

```
   ; 2023-05-17 - přidána jako požadovaná nepovinné komponenta GINICA01
   
   [program]
   revize=32GIN0139006X01
   dat_akt=2023-05-17
    
   [REQUIRED]
   MODULES=GSANAH01,GINICA01
   GSANAH01_mandatory=FALSE
   GINICA01_mandatory=FALSE
   GINICA01_SUB_VERZE_MIN=4
    
   [files]
   @(GINADR)@\SLG02\
     G32SLG02.EXE           s=5292032        c=15691     sha2=5B6426E9FE993FFB60EB9D97706D1417391364DDEBDD0AC20847A44461A997A6
   @(GINADR)@\GIN\schemas
     XAdES.xsd
     XAdESv141.xsd
     xmldsig-core-schema.xsd  
   @(GINADR)@\GIN\x64
     capi.dll		s=-1
     FreeSans.ttf
```
