TST soubor je popisný soubor instalačních a distribučních balíků SW komponent systém GINIS.   
Každý balík musí obsahovat právě jeden TST soubor se jménem, které odpovídá programové fázi balíku.

Třída [**Gordic.General.GTstFile**](./GTstFile.cs) načítá popisná data z TST souboru.

Ukázka TST souboru:

```
[program]
revize=32INT0139002X01
dat_akt=2023-03-24
verze_db_min=524
sub_verze_db_min=4
rev_db_min=23
verze_db_min2=525
sub_verze_db_min2=2
rev_db_min2=16
apl_type=PB12

[REQUIRED]
modules=GINGRR01,GINDNP01,GINDEP02,GINDEP01,GINGIN01,GSAWSM01,GMSINTS1,GININTD1,GININTH1
GININTD1_mandatory=FALSE
GININTH1_mandatory=FALSE
GSAWSM01_mandatory=FALSE

[files]
@(GINADR)@\INT
  G32INT01.EXE          s=9446720       c=55701         sha2=449AFB1D118A21594804992398BE562FCC4C5FDCE2F8DDAF05FB799E870F7A83
  GDAV016.EXE           s=17712         c=58438         sha2=BC0CCBAC61B490D9CDAA06683735EEE4C4F301822BA615123DB99A27DD178FB2
  GDAV900.EXE           s=17200         c=10046         sha2=A1070610DEB9B86F78761466FEBE021FC6A812F0E3ACB3063F20D7682040207E
  GDAV901.EXE           s=17200         c=7018         sha2=12877169201113539BE498DD9A72CE485044B5553931A4603E3CB39043644C3D
  GSERVICE.EXE          s=80176         c=40881         sha2=18AB1180506F7580083960F714CE9BD2CBBC6C6F52E4AE1764428D57A61F6B6F
```

Může se jednat o licenční sestavy a potom se musí uvádět od které a pro kterou licenci je balík určen - takový balík má mít v revizi na třetím místě od zadu písmeno L a v sekci [program] musí být uvedeny položky licence_od a licence_pro. Například:

```
[program]
revize=20ADMS152501L01
dat_akt=2023-03-24
licence_od=0000
licence_pro=TEST

[REQUIRED]
modules=GINGRR01

[files]
@(GINADR)@\FRM
  exportAdt.ipa2
  GMSADMS1.TST
```
