TST soubor je na jednotlivých řádcích uveden vždy jeden soubor instalace. U něj jsou uvedeny pomocné informace, 
případně příznaky pro jeho zpracování v rámci instalačního procesu

Třída [**Gordic.General.GDistributionFile**](./GDistributionFile.cs) obsahuje popis jednoho souboru uvedeného v TST.

U souboru mohou být uvedeny pomocné atributy

## s - Size
- Pokud je uvedena kladná hodnota, potom se jedná o velikost souboru v rámci distribučního balíku
- Pokud je uvedena záporná hodnota menší jak -3, potom se jedná o velikost souboru uvedenou v rámci distribučního balíku + příznak, že se soubor na uživatelské stanici nemá přepisovat, pokud tam již existuje. Toto se používá např. pro config soubory.
- Pokud se jedná o hodnotu **-1**, potom je to příznak/povel pro smazání souboru ze stanice klienta. V DB bude tento soubor zobrazen pro dočasné smazání s velikostí -1. Tímto způsobem např. programátor odstraňuje již nepotřebné soubory aplikace z disku zákazníků.
- Pokud se jedná o hodnotu **-2**, potom je to příznak/povel pro smazání souboru ze stanice klienta. V DB bude tento soubor zobrazen pro trvalé smazání s velikostí -2 a to znamená, že ani budoucí načítání balíků nemůže oživit tento soubor - tedy případné načítání tohoto souboru do databáze s reálnou velikostí bude ignorováno. Tímto způsobem si např. zákazník může označit sestavy, které již nikdy nechce používat.
- Pokud se jedná o hodnotu **-3**, potom je to příznak, že se soubor má odstranit z databáze ale na stanicích zákazníka se nemá na soubor zasahovat.

## c - Crc
Dříve se tato hodnota používala pro kontrolu, že se distribuční soubor nezměnil. Bylo nahrazeno silnější kontrolou podle SHA2. Aktuálně je již nadbytečná.

## sha2 - SHA256
Kontrolní součet distribuovaného souboru podle algoritmu [SHA256](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.sha256managed?view=netframework-4.8)
Pokud je uveden, potom se při použití instalačního balíku kontroluje - tedy při instalaci na stanici nebo při nahrávání distribučního balíku do databáze pro budoucí aktualizace stanic.

## t - Type
Může obsahovat konstantu **EXE,COM**. Jedná se o příznak, že se soubor má spustit nebo zaregistrovat ihned po nahrání na stanici zákazníka má spustit. Přípona souboru určuje, jaké akce se má realizovat


### Přípony souboru a odpovídající akce 
- **CMD** a **BAT** se před spuštěním textově projdou a nahradí se substituční proměnné popisující instalaci GINIS, potom se spustí
- **EXE** se pouze spustí
- **MSI** se nainstaluje
- ostatní spouští příkaz regsvr32.exe s uvedeným souborem

### Chování aplikací k příponám
- **COM** se načítá do databáze s příznakem spouštět - při použití instalačních nástrojů se má spuštění potlačit
- **EXE** se má spouštět v rámci instalačních nástrojů přímo na stanici ale při načítání do databáze se má spouštění potlačit



## Ukázka TST souboru:

```
[program]
revize=32ORA0139002S06
dat_akt=2023-02-28
db_enable_only=true
install_from=CD

[files]
@(ORAADR)@
  G32ORA01.TST
  README.txt
  cleanup.cmd       T=EXE 
  VC_redist.x64.exe
  VC_redist.x86.exe
  vcredist_x64.exe
  vcredist_x86.exe
  redistributables.cmd      T=EXE  
  uninstall.cmd     s=-775  T=EXE 
  install.cmd      T=EXE
```
