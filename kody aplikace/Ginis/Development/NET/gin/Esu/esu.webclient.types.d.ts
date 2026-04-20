/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       esu.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Esu.WebClient\Gordic.Esu.WebClient.csproj
*    created     2026-02-16 14:33:47
*    files       Gin\Esu\GEsuParams.d.ts
*                Gin\Esu\Adk\Dto\GRuzneADKDto.d.ts
*                Gin\Esu\Adk\Dto\NapojovaniEsuDto.d.ts
*                Gin\Esu\Adk\Dto\PripravenostGdprDto.d.ts
*                Gin\Esu\Adk\Dto\SeznamNepouzitychDto.d.ts
*                Gin\Esu\Adk\Dto\SeznamOdstranenychDto.d.ts
*                Gin\Esu\Dto\GBankovniUctyDto.d.ts
*                Gin\Esu\Dto\GDetailEsuItemsDto.d.ts
*                Gin\Esu\Dto\GDetailInsolvencnihoRizeniDto.d.ts
*                Gin\Esu\Dto\GEsuParamsDto.d.ts
*                Gin\Esu\Dto\GInfoNespPlatceDphDto.d.ts
*                Gin\Esu\Dto\GKarotekaDto.d.ts
*                Gin\Esu\Dto\GKartotekaFilterDto.d.ts
*                Gin\Esu\Dto\GOsobniDokladyDto.d.ts
*                Gin\Esu\Dto\GRetValFromFunctionDto.d.ts
*                Gin\Esu\Dto\GSeznamInsolvenceDataDto.d.ts
*                Gin\Esu\Dto\GSeznamInsolvenceFilterDto.d.ts
*                Gin\Esu\Dto\GSeznamZastupnychDto.d.ts
*                Gin\Esu\Dto\GTabulkaAdresDto.d.ts
*                Gin\Esu\ISZR\Aiseo\Dto\SzrAiseoDto.d.ts
*                Gin\Esu\ISZR\Dto\GIszrCommonDto.d.ts
*                Gin\Esu\ISZR\Dto\GSzrsrobDto.d.ts
*                Gin\Esu\ISZR\Dto\GSzrsrosDto.d.ts
*                Gin\Esu\ISZR\Dto\GVyberZRobItemsDto.d.ts
*                Gin\Esu\ISZR\Dto\GVyberZRostemsDto.d.ts
*                Gin\Esu\Ostatni\Dto\HistorieEsuInputDto.d.ts
*                Gin\Esu\Prefabs\Prefabs.d.ts
*                Gin\Esu\Prefabs\Dto\GAdresaDto.d.ts
*                Gin\Esu\Psr\Dto\GVyberZRobItemsDto.d.ts
*                Gin\Esu\Rozdelovnik\Dto\GSkupinyTreeNode.d.ts
*                Gin\Esu\Rozdelovnik\Dto\RozdelovnikESUDto.d.ts
*                Gin\Esu\Rozdelovnik\Dto\SeznamSubjektuVRozdelovnikuDto.d.ts
*                Gin\Esu\Ruian\Dto\GNacteniRuianDto - Copy.d.ts
*                Gin\Esu\Ruian\Dto\GNacteniRuianDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\GEsuParams.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Třída zapouzdřující přístup k parametrům Esu*/
	interface GEsuParams {
		/**GIN ESU - kontrola duplicit při vytvoření nového ESU (výčet sloupců kontroly duplicit) (pouze SSL)
		*     výčet sloupců, dle kterých se při uložení kontrolují duplicitní záznamy. Sloupce musí být odděleny čárkami, sloupce musí být z této množiny (a minimum je nazev, obec, ulice, cor): nazev, ob_jmeno,jmeno, prijmeni, obec, ulice, cor, cpop, typ_esu, typ_org, dic, rc, ico, dat_nar, zkratka.
		*/
		readonly gin_esu_kondup?: string|null;
		/**GIN ESU - povolit vytvořit bankovní účet v případě, že již existuje u ESU s jiným IČO*/
		readonly gin_esu_budui?: number|null;
		/**GIN ESU - povolení editace datumu úmrtí u FO\nPovoluje editaci datumu úmrtí*/
		readonly gin_esu_duedit?: number|null;
		/**GIN ESU - kontrolovat existenci ESU se stejným IČO při vytvoření ESU (pouze některé moduly)
		*     Při nastavení totoho parametru je při vytvoření nebo opravě ESU zobrazeno upozornění v případě, že v DB existuje ESU se stejným IČO. Tento parametr je platný pouze pro některé moduly - zejména moduly Spisové služby - např. USU, POD, ... . 7.1.2010 doplněna nová hodnota Ano - neumožnit uložit ESU s duplicitním IČO. Tzn. pokud je nalezena duplicita, není vůbec možné uložit ESU - je to možné pouze v případě, kdy uživatel vytváří novou adresu / pobočku.
		*/
		readonly gin_esu_kontico?: Gordic.Esu.WebClient.KontIco|null;
		/**GIN ESU - povinnost vyplnění IČO u právnické osoby (při vytvoření a editaci ESU)
		*     platí pro státy ČR  Ne Ano - povinné zadat, při nevalidním upozornění Ano - povinné zadat validní IČO
		*/
		readonly gin_esu_povicop?: number|null;
		/**GIN ESU - metodika tvorby obálkové adresy
		*     Parametr určuje jak se budou skládat údaje do obálkové adresy. Navazuje na dokumentaci k systému. Standardní skládání je dle doporučení pošty (tzn. na obálku se dávají jen údaje vyžadované poštou). Rozšířené skládání obálkové adresy je takové, při kterémse do obálkové adresy dává maximum údajů z externího subjektu. Přeputí parametru nezpůsobí přeskládání obálkových adres u již existujících externích subjektů!
		*/
		readonly gin_esu_obaladr?: boolean|null;
		/**GIN ESU - nabízet výběr z UIR při vytv. nového ESU
		*     Při vytvoření nového ESU (pokud je zprovozněn UIR) se nejdříve zobrazí okno výběru z UIR. Po jeho uzavření může uživatel začít vyplňovat ostatní položky ESU.
		*/
		readonly gin_esu_uir_new?: boolean|null;
		/**GIN ESU - Používat typ ESU neurčeno (a typ organizace).
		*     GIN ESU - Používat typ ESU neurčeno (a typ organizace) při editaci a vytvoření externího subjektu. Paramer řídí to zda se bude položka neurčeno zobrazovat v číselnících.
		*/
		readonly gin_esu_stavneu?: boolean|null;
		/**GIN ESU - povinnost vyplnění DIČ u plátce DPH
		*     Parametr určuje, zda má uživatel povinnost vyplnit DIČ u subjektu, který je plátcem DPH - při opravě i pořízení ESU.
		*/
		readonly gin_esu_pdicdph?: boolean|null;
		/**GIN ESU - Povinnost vyplnění PSČ pro adresy v ČR
		*     Parametrem lze nastavit povinnost vyplnění PSČ pro adresy v ČR na detailu externího subjektu.
		*/
		readonly ParametrGinEsuPovVPsc?: boolean|null;
		/**GIN ESU - Povinnost vyplnění PSČ pro adresy v ČR
		*     Parametrem lze nastavit povinnost vyplnění PSČ pro adresy v ČR na detailu externího subjektu.
		*/
		readonly gin_esu_povvpsc?: boolean|null;
		/**GIN ESU - Povolení editovat skupiny (rozdělovníky) za SU (které vytvořil jiný referent) (od 356)*/
		readonly gin_esu_rozsu?: boolean|null;
		/**GIN ESU - Povolení ověření dat v seznamu subjektů z IS Triáda / VERA WS (od 358), jen některé fáze.
		*     jen některé fáze. Použití nutno konzultovat s pracovníky Gordic.
		*/
		readonly gin_esu_overtri?: number|null;
		/**GIN ESU - Povolení přidávání a odebírání adres (v okně adresy/pobočky) (od)*/
		readonly gin_rad_esuppa?: boolean|null;
		/**Práce s bankovními účty (viditelnost, editovatelnost) od 358
		*     0 - Uživatel nemůže vidět bankovní účty ESU, 1 - Uživatel může vidět bankovní účty ESU, 2 - Uživatel může vidět i editovat bak. účty ESU
		*/
		readonly gin_esu_buedit?: number|null;
		/**GIN ESU - předplnění typu organizace pro typ ESU právnická osoba
		*     Hodnotou parametru je číslo odpovídající typu organizace (v ADM - Subjekty - typy organizací). Např. 30 práv. osoba - nespecif. Prázdná hodnota parametru znamená původní chování.
		*/
		readonly gin_esu_predpto?: string|null;
		/**GIN ESU - předplňovat pole obec
		*     Parametr určuje, zda se bude uživateli předplňovat políčko obec hodnotou z políčka pošta (na detailu externího subjektu při jeho zadání nebo opravě). 
		*     0 - NEPolíčko obec se nebude předplňovat, 1 - ANOPolíčko obec se bude předplňovat (v případě že uživatel vyplnil poštu a obec ještě není vyplněná).
		*/
		readonly gin_esu_obecpre?: boolean|null;
		/**GIN ESU - Při ověření dat v seznamu subjektů z IS Triáda zobrazit přebírací okno.
		*     0 - Ne, 1 - Ano, 2 - Ne - pouze ladící hlášku.
		*/
		readonly gin_esuovertrio?: number|null;
		/**GIN ESU - při výběru primárně nabízet vlastní externí subjekty
		*     Při výběru (ve výběrovém okně ESU) primárně nabízet vlastní (oblíbené) externí subjekty. 
		*     0 - Původní chováníAplikace se budou chovat tak, jako ve verzi modulů 346 (a starších), 1 - ANO, 2 - NE
		*/
		readonly gin_esu_nabvla?: number|null;
		/**GIN ESU - Rozšířená kontrola bankovního účtu (pobočka banky musí mít vyplněn BIC kód)
		*     Rozšířená kontrola bankovního účtu - při zadání - použitá pobočka banky musí mít vyplněn BIC kód
		*     0 - Ne, 1 - Ano - varování - uživateli je zobrazeno varování, 2 - Ano - uživatel nemůže uložit bankovní účet nebo provést platbu pokud kontrola není splněna.
		*/
		readonly gin_esu_bubikon?: number|null;
		/**PAM ŘP RV - kontrola při zakládání zaměstanance
		*     0 - Ne, 1 - Pokud se uživatel pokouší založit externí subjekt se stejný rodným nebo osobním číslem je hlášeno varování. Po potvrzení lze uložit.
		*     2 - Při zapnutí této kontroly nelze uložit externí subjekt, který má shodné rodné číslo (nebo osobní číslo) jako již vytvořený zaměstnanec
		*/
		readonly pam_rad_testesu?: number|null;
		/**GIN ESU - Rozšířená kontrola bankovního účtu v cizí měně pro banky ČR (modulo 11) - při vytváření bankovního účtu. Pouze varování - při vytvoření účtu v cizí měně u banky se sídlem v ČR.
		*     0 - Ne Bez rozšířené kontroly, 1 - Ano - VarováníS rozšířenou kontrolou, 2 - Ano S rozšířenou kontrolou - uživateli nebude mít možnost účet nesplňující tuto kontrolu uložit.
		*/
		readonly gin_esu_burkon?: number|null;
		/**GIN ESU - ŘP Oprava (a vytvoření) zástupných osob externího subjektu
		*     Určuje, zda uživatel může vytvářet a editovat zástupné osoby. 
		*     0 - Ne Uživatel nemá právo vytvářet ani opravovat, 1 - Ano Uživatel má právo vytvářet a opravovat, 2 - Ano - jenom pro ZO ze stejného SU.Uživatel má právo vytvářet a opravovat zástupné osoby, vytvořené nebo opravené uživatelem ze stejného spisového uzlu.
		*/
		readonly gin_esu_oprazo?: number|null;
		/**GIN ESU - ŘP Oprava (a vytvoření) zástupných osob ext.subj. i když uživatel nemá oprávnění editovat ESU - používá KVOP
		*     Určuje, zda uživatel může vytvářet a editovat zástupné osoby. 
		*     0 - Ne, 1 - Ano
		*/
		readonly gin_esu_oprazox?: number|null;
		/**GIN ESU - ŘP Oprava a vytvoření PSČ (povolení) (od 356)*/
		readonly gin_esu_rppsc?: boolean|null;
		/**GIN ESU - ŘP Vytvoření banky
		*     Parametr umožňuje nastavit, zda má uživatel právo vytvořit ESU typu banka.
		*/
		readonly gin_esu_rp_bann?: boolean|null;
		/**GIN ESU - ŘP Zákaz editace typů organizací dle výčtu
		*     Parametr umožňuje nastavit, zda má uživatel právo vytvořit ESU typu banka.
		*/
		readonly gin_esu_rp_zety?: string|null;
		/**GIN ESU - ŘP Zákaz vytvoření typů organizací dle výčtu
		*     Parametr umožňuje nastavit, zda má uživatel právo vytvořit ESU typu banka.
		*/
		readonly gin_esu_rp_zvty?: string|null;
		/**GIN ESU - ŘP Oprava banky
		*     Parametr umožňuje nastavit, zda má uživatel právo editovat ESU typu banka.
		*/
		readonly gin_esu_rp_ban?: boolean|null;
		/**GIN ESU - ŘP Oprava externího subjektu.
		*     Určuje zda uživatel může opravovat externí subjekty.
		*/
		readonly ssl_opra_esu?: boolean|null;
		/**GIN ESU - ŘP Oprava zásilkové adresy externího subjektu
		*     Povolení editace zásilkové adresy externího subjektu či zástupné osoby z detailu externího subjektu a okna pro editaci zásilkové adresy u zásilky.
		*     Pro detail ESU má povolení tohoto parametru smysl v případě, že uživatel nemá povolenu opravu ESU.
		*     0 - Zakázáno Editace zásilkové adresy na externím subjektu je zakázána, 1 - Povoleno Editace zásilkové adresy na externím subjektu je povolena
		*/
		readonly ssl_rp_esu_obal?: boolean|null;
		/**GIN ESU - ŘP Povolení editace tvarů jmen a příjmení*/
		readonly gin_esu_edprijm?: boolean|null;
		/**GIN ESU - povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)*/
		readonly gin_esu_zatypad?: boolean|null;
		/**GIN ESU - povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)*/
		readonly gin_esu_zatypad_volnyRezim?: boolean|null;
		/**GIN ESU - povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)*/
		readonly gin_esu_zatypad_striktniRezim?: boolean|null;
		/**GIN ESU - povolení práce s typem adresy - kontaktní*/
		readonly gin_esu_zatypak?: boolean|null;
		/**GIN ESU - ŘP Vytvoření externího subjektu
		*     Parametr určuje, zda je možné vytvářet externí subjekty.
		*/
		readonly gin_esu_rp_new?: boolean|null;
		/**GIN ESU - ŘP Změna aktivity externího subjektu.
		*     Umožňuje nastavit, zda uživatel může měnit aktivitu ESU.
		*/
		readonly gin_esu_rp_akt?: boolean|null;
		/**GIN ESU - Úroveň přístupu - povolení vytvořit shodný ESU v případě, že již existuje v jiné úrovni přístupu.
		*      Pokud uživatel zadá při vytvoření nového ESU subjekt přesně tak, jak již je pořízen v databázi (i když třeba s úrovní přístupu, kterou nemá uživatel oprávnění vidět) pak dle nastavení tohoto parametru
		*      a) je buď updatována hodnota ur_pri na již existujícím ESU (v případě, že je parametr nastaven na hodnotu ANO)
		*      b) je vytvořen nový záznam v ESU (v případě, že je parametr nastaven na hodnotu NE).
		*     
		*      0 Ne - nový záznam se nebude vytvářet. Bude se updatovat úroveň přístupu. Výchozí chování. 
		*      1 Ano - nový záznam se bude vytvářet i když v DB existuje shodný ESU s jinou úrovní přístupu.
		*/
		readonly gin_rad_esusv?: boolean|null;
		/**GIN ESU - Úroveň přístupu k externím subjektům (editace) - výčet číselných hodnot oddělených čárkami (např. 1,2,5). 
		*     Uživatel může editovat, nebo vytvářet ESU s těmito hodnotami úrovně přístupu. 
		*     Pokud je nastaven tento parametr a není nastaven parametr:
		*     GIN ESU - Úroveň přístupu k externím subjektům (výběr, prohlížení), 
		*     použije se hodnota z tohoto parametru i pro výběr nebo prohlížení ESU.
		*     
		*     Pomocí parametrů lze nastavit, že uživatel vidí nějakou množinu ESU a opravovat nebo vytvářet může pouze podmnožinu z této množiny. 
		*     (Např. vidí ESU s úrovní 1,2,3, ale opravovat nebo vytvářet může ESU s úrovní přístupu 3)
		*/
		readonly gin_rad_esusa?: string|null;
		/**GIN ESU - Úroveň přístupu k externím subjektům (výběr, prohlížení)- výčet číselných hodnot oddělených čárkami (např. 1,2,5). 
		*     Pomocí parametrů lze nastavit, že uživatel vidí nějakou množinu ESU a opravovat nebo vytvářet může pouze podmnožinu z této množiny. 
		*     (Např. vidí ESU s úrovní 1,2,3, ale opravovat nebo vytvářet může ESU s úrovní přístupu 3)
		*/
		readonly gin_rad_esusv0?: string|null;
		/**UrovnePristupuProVyberoveOkno*/
		readonly UrovnePristupuProVyberoveOkno?: string|null;
		/**UrovnePristupuProVyberoveOknoArrInt*/
		readonly UrovnePristupuProVyberoveOknoArrInt?: number[]|null;
		/**GIN ESU - Úroveň přístupu k externím subjektům (výběr, prohlížení) - výčet číselných hodnot oddělených čárkami (např. 1,2,5). 
		*     Uživatel může vybírat nebo prohlížet ESU s těmito hodnotami úrovně přístupu. 
		*     Pokud není tento parametr a je nastaven parametr:
		*     GIN ESU - Úroveň přístupu k externím subjektům (editace), 
		*     použije se hodnota z tohoto parametru i pro výběr nebo prohlížení ESU.
		*     
		*     Pomocí parametrů lze nastavit, že uživatel vidí nějakou množinu ESU a opravovat nebo vytvářet může pouze podmnožinu z této množiny. 
		*     (Např. vidí ESU s úrovní 1,2,3, ale opravovat nebo vytvářet může ESU s úrovní přístupu 3)
		*/
		readonly gin_rad_esusap?: string|null;
		/**GIN ESU - Úroveň přístupu k zástupným osobám externím subjektů (nový, editace).
		*     Obdoba parametrů pro ESU - GIN ESU - Úroveň přístupu k externím subjektům, ... .
		*/
		readonly gin_rad_esusazo?: string|null;
		/**GIN ESU - Úroveň přístupu k externím subjektům - nový (předplnění úrovně přístupu při vytvoření ESU)*/
		readonly gin_esu_urprnp?: string|null;
		/**GIN ESU - výběrové okno ESU - max. počet zobrazitelných záznamů (pouze LK, od 354)*/
		readonly gin_esu_vybpoc?: string|null;
		/**GIN ESU - vyhledávat dle datumu narození
		*     Parametr určuje, zda bude mít uživatel možnost vyhledávat externí subjekty dle datumu narození.
		*/
		readonly gin_esu_dnvyhl?: boolean|null;
		/**GIN ESU - vyhledávat dle RČ
		*     Parametr určuje, zda bude mít uživatel možnost vyhledávat externí subjekty dle rodného čísla.
		*/
		readonly gin_esu_rcvyhl?: boolean|null;
		/**GIN ESU - Zobrazení rozšířených informací ve výběrovém okně ESU - obálk. adresa, ... (tooltipy) (356).
		*     Nastavení tohoto parametru na Ano může mít mírný vliv na zatížení serveru - na klientské počítače se dotahuje více dat.
		*/
		readonly gin_esu_vybroi?: boolean|null;
		/**GIN ISZR - Povolit práci se systémem základních registrů*/
		readonly gin_iszr_povole?: boolean|null;
		/**GIN ESU - stupně verifikace ESU umožňující evidenci s varováním (ISZR, ... )
		*     Aplikace při evidenci (či odpovídající jiné operaci) provede kontrolu stupně verifikace evidovaného ESU a v případě, že je stupeň verifikace ESU obsažen v hodnotě parametru, upozornií uživatele a umožní evidenci (umožní pokračování v práci). Pokud je parametr prázdný, tak neupozorňovat vůbec (default).
		*/
		readonly gin_esu_iszrvar?: string|null;
		/**GIN ESU - stupně verifikace ESU neumožňující evidenci (ISZR)
		*     Aplikace při evidenci (či odpovídající jiné operaci) provede kontrolu stupně verifikace evidovaného ESU a v případě, že je stupeň verifikace ESU obsažen v hodnotě parametru, upozorní uživatelea neumožní evidenci (zabrání pokračování v práci). Pokud je parametr prázdný, neblokovat (default).
		*/
		readonly gin_esu_iszrblo?: string|null;
		/**GIN ESU/ISZR - Zobrazení informací o ověření v SZR v seznamu externích subjektů (podbarvení, stupeň*/
		readonly gin_iszr_zostv?: boolean|null;
		/**GIN ESU - zobrazovat datum narození
		*     Parametr určuje, zda se bude zobrazovat datum narození v detailu externího subjektu a v seznamech ve výběrovém okně externích subjektů.
		*/
		readonly gin_esu_dnzobr?: boolean|null;
		/**GIN ESU - zobrazovat RČ
		*     Parametr určuje, zda se bude zobrazovat rodné číslo v detailu externího subjektu a v seznamech ve výběrovém okně externích subjektů.
		*/
		readonly gin_esu_rczobr?: boolean|null;
		/**GIN ESU - povolení zadat RČ na detailu ESU
		*     Tímto parametrem lze úplně vypnout možnost práce s RČ.
		*/
		readonly gin_esu_rczadat?: boolean|null;
		/**GIN ESU - povolení zadávat nenumerické znaky do RČ
		*     doporučujeme mít tento parametr nastaven na hodnotu NE.
		*/
		readonly gin_esu_rcnenum?: boolean|null;
		/**GIN ESU - zobrazovat typ organizace na detailu
		*     Parametr určuje, zda se má zobrazovat typ organizace na detailu externího subjektu (při zadání).
		*/
		readonly gin_esu_torg?: boolean|null;
		/**GIN - ŘP Přístup k datům UIR
		*     Povolení přístupu k datům UIR.
		*/
		readonly gin_rad_uir?: boolean|null;
		/**GIN - ŘP Přístup k datům ROB
		*     Povolení přístupu k datům ROB - registru obyvatel (pomocí parametru lze např. v SSL nastavit, zda bude viditelné tlačítko ROB na kartě externího subjektu s možností zobrazení, případně vytvoření vazby na ROB).
		*/
		readonly gin_rad_rob?: boolean|null;
		/**GIN ESU - Povolení ručně zadat id datové schránky na detailu ESU (hned po zadání bude ověřeno vISDS) 
		*     Povolení ručně zadat id datové schránky na detailu ESU (hned po zadání bude ověřeno v ISDS)
		*/
		readonly gin_esu_isds_id?: boolean|null;
		/**GIN ESU - povolení odstranit vazbu na datovou schránku ISDS z externího subjektu
		*     Pozor jde o citlivou věc - odstranění vazby by měl provádět pouze administrátor na žádost běžných uživatelů.
		*/
		readonly gin_esu_isdsods?: boolean|null;
		/**GIN ISDS - povolení práce s datovými schránkami (odeslání, příjem, ověření ESU, ... )
		*     Při přepnutí parametru budete informováni, zda je podpora práce s DS již plnohodnotná.
		*/
		readonly gin_ssl_datschr?: boolean|null;
		/**GIN GEX - povolení práce s Gordic exchange (odeslání, příjem, ověření ESU, ... )*/
		readonly gin_gex_povolen?: boolean|null;
		/**GIN ESU - Ověřovat ESU v ISDS (systému datových schránek) pro fyzickou osobu dle položek (DS, 360)*/
		readonly gin_esu_isdsof?: string|null;
		/**GIN ESU - Ověřovat ESU v ISDS (systému datových schránek) pro právnickou osobu dle položek (DS, 360)*/
		readonly gin_esu_isdsop?: string|null;
		/**GIN ESU - Ověřovat ESU v ISDS (systému datových schránek) pro typ neurčeno dle položek (DS, 360)*/
		readonly gin_esu_isdson?: string|null;
		/**GIN ESU - zobrazovat čísla osobních dokladů na detailu ESU*/
		readonly gin_esu_pcisdok?: boolean|null;
		/**GIN ESU - možnost editovat čísla osobních dokladů na detailu ESU*/
		readonly gin_esu_ecisdok?: boolean|null;
		/**GIN ESU - vyhledávat dle čísla osobního dokladu OP, PAS, ... - povoluje vyhledávání v kartotéce dle jmenovaného údaje. Prozatím pouze pro moduly SSL.*/
		readonly gin_esu_hcisdok?: boolean|null;
		/**GIN ESU - používat pole OČ (osobní číslo)*/
		readonly gin_esu_pouoc?: boolean|null;
		/**GIN ESU - úroveň přístupu pro možnost ověření/převzetí údajů z ISDS pro uživ. bez oprávnění editovat*/
		readonly gin_esu_isdsupr?: string|null;
		/**GIN ESU - zobrazovat stav insolvence (seznam a detail ESU)*/
		readonly gin_esu_inzobr?: boolean|null;
		/**GIN ESU - povinnost vyplnění Datumu narození u fyzické osoby (při vytvoření a editaci ESU)*/
		readonly gin_esu_dnpov?: boolean|null;
		/**GIN ESU - zobrazovat datum narození
		*     Parametr určuje, zda se bude zobrazovat datum narození v detailu externího subjektu a v seznamech ve výběrovém okně externích subjektů.
		*/
		readonly gin_esu_mnzobr?: boolean|null;
		/**GIN ISZR - Úroveň přístupu ESU převzatých z ROS
		*     Je třeba i příslušně upravit parametry GIN ESU - úroveň přístupu * pro editaci a prohlížení ESU(tak aby měl uživatel oprávnění převzatá data z ROS uložit).
		*/
		readonly gin_iszr_urprio?: string|null;
		/**GIN ESU
		*     GIN ESU - Povolení odstranit bankovní účet. Pro povolení odstranění účtů musí mít uživatel povolen i parametr GIN ESU - Práce s bankovními účty (viditelnost, editovatelnost).   NE / ANO vytvořený funkčním místem / Ano vytvořený stejným spisovým uzlem /Ano - všechny
		*/
		readonly gin_esu_buods?: number|null;
		/**GIN ESU/ISZR – Převzetí právní formy z ROS(přednastaví se typ organizace).
		*     V číselníku právních forem(ADM-ISZR-Právní formy organizace) lze nastavit, jaký typ organizace přísluší ESU k právní formě.
		*     Pokud je toto správně zadministrováno pak se po ověření a převzetí dat z SZR-ROS přednastaví na ESU typ organizace.
		*/
		readonly gin_iszr_esuprf?: number|null;
		/**GIN ESU/ISZR - Zobrazení rozšířených informací o ověření v SZR v seznamu externích subjektů
		*     Parametrem lze zapnout indikaci, zda ověření proběhlo ve stejné agendě a zda již není starší než 24h.
		*/
		readonly gin_iszr_rozin?: boolean|null;
		/**GIN ESU - používat pole matriční identita(matriční jméno, matriční příjmení)*/
		readonly gin_esu_poumid?: boolean|null;
		/**GIN ESU - název pole OČ (osobní číslo) na detailu a v seznamu ESU*/
		readonly gin_esu_ocnazev?: string|null;
		/**GIN ISZR - Povolit prohlížení informací získaných ze SZR (bez aktivního přístupu do SZR).
		*     Pokud je nastaven na ANO, je třeba mít zadministrovány všechny příslušné subjekty a vazby viz.dokumentace(agendy, role, ... ) aby bylo možné zíkat informaci o datumu ověření pro vybranou agendu SZR.
		*/
		readonly gin_iszr_povopr?: boolean|null;
		/**GIN ESU - povolení zadat a editovat IČO na pobočce/adrese ESU*/
		readonly gin_esu_pobico?: boolean|null;
		/**GIN ESU - zobrazovat e-mailovou adresu*/
		readonly gin_esu_emzobr?: number|null;
		/**GIN ESU - používat pole DIČ*/
		readonly gin_esu_poudi?: boolean|null;
		/**GIN ESU - používat pole GPS na detailu ESU*/
		readonly gin_esu_pogps?: boolean|null;
		/**GIN ESU - používat pole pohlaví*/
		readonly gin_esu_poupo?: boolean|null;
		/**GIN ESU - používat pole rodinný stav*/
		readonly gin_esu_pours?: boolean|null;
		/**GIN ESU - používat pole URL na detailu ESU*/
		readonly gin_esu_pourl?: boolean|null;
		/**Nadpis uživatelského sloupce*/
		readonly gin_esuuzsl_en?: string|null;
		/**Nadpis uživatelského sloupce*/
		readonly gin_esu_bizobr?: number|null;
		/**gin_esu_povpri*/
		readonly gin_esu_povpri?: number|null;
		/**gin_upsr_povol*/
		readonly gin_upsr_povol?: number|null;
	}
	const enum GEsuParamsNames { gin_esu_kondup = "gin_esu_kondup", gin_esu_budui = "gin_esu_budui", gin_esu_duedit = "gin_esu_duedit", gin_esu_kontico = "gin_esu_kontico", gin_esu_povicop = "gin_esu_povicop", gin_esu_obaladr = "gin_esu_obaladr", gin_esu_uir_new = "gin_esu_uir_new", gin_esu_stavneu = "gin_esu_stavneu", gin_esu_pdicdph = "gin_esu_pdicdph", ParametrGinEsuPovVPsc = "ParametrGinEsuPovVPsc", gin_esu_povvpsc = "gin_esu_povvpsc", gin_esu_rozsu = "gin_esu_rozsu", gin_esu_overtri = "gin_esu_overtri", gin_rad_esuppa = "gin_rad_esuppa", gin_esu_buedit = "gin_esu_buedit", gin_esu_predpto = "gin_esu_predpto", gin_esu_obecpre = "gin_esu_obecpre", gin_esuovertrio = "gin_esuovertrio", gin_esu_nabvla = "gin_esu_nabvla", gin_esu_bubikon = "gin_esu_bubikon", pam_rad_testesu = "pam_rad_testesu", gin_esu_burkon = "gin_esu_burkon", gin_esu_oprazo = "gin_esu_oprazo", gin_esu_oprazox = "gin_esu_oprazox", gin_esu_rppsc = "gin_esu_rppsc", gin_esu_rp_bann = "gin_esu_rp_bann", gin_esu_rp_zety = "gin_esu_rp_zety", gin_esu_rp_zvty = "gin_esu_rp_zvty", gin_esu_rp_ban = "gin_esu_rp_ban", ssl_opra_esu = "ssl_opra_esu", ssl_rp_esu_obal = "ssl_rp_esu_obal", gin_esu_edprijm = "gin_esu_edprijm", gin_esu_zatypad = "gin_esu_zatypad", gin_esu_zatypad_volnyRezim = "gin_esu_zatypad_volnyRezim", gin_esu_zatypad_striktniRezim = "gin_esu_zatypad_striktniRezim", gin_esu_zatypak = "gin_esu_zatypak", gin_esu_rp_new = "gin_esu_rp_new", gin_esu_rp_akt = "gin_esu_rp_akt", gin_rad_esusv = "gin_rad_esusv", gin_rad_esusa = "gin_rad_esusa", gin_rad_esusv0 = "gin_rad_esusv0", UrovnePristupuProVyberoveOkno = "UrovnePristupuProVyberoveOkno", UrovnePristupuProVyberoveOknoArrInt = "UrovnePristupuProVyberoveOknoArrInt", gin_rad_esusap = "gin_rad_esusap", gin_rad_esusazo = "gin_rad_esusazo", gin_esu_urprnp = "gin_esu_urprnp", gin_esu_vybpoc = "gin_esu_vybpoc", gin_esu_dnvyhl = "gin_esu_dnvyhl", gin_esu_rcvyhl = "gin_esu_rcvyhl", gin_esu_vybroi = "gin_esu_vybroi", gin_iszr_povole = "gin_iszr_povole", gin_esu_iszrvar = "gin_esu_iszrvar", gin_esu_iszrblo = "gin_esu_iszrblo", gin_iszr_zostv = "gin_iszr_zostv", gin_esu_dnzobr = "gin_esu_dnzobr", gin_esu_rczobr = "gin_esu_rczobr", gin_esu_rczadat = "gin_esu_rczadat", gin_esu_rcnenum = "gin_esu_rcnenum", gin_esu_torg = "gin_esu_torg", gin_rad_uir = "gin_rad_uir", gin_rad_rob = "gin_rad_rob", gin_esu_isds_id = "gin_esu_isds_id", gin_esu_isdsods = "gin_esu_isdsods", gin_ssl_datschr = "gin_ssl_datschr", gin_gex_povolen = "gin_gex_povolen", gin_esu_isdsof = "gin_esu_isdsof", gin_esu_isdsop = "gin_esu_isdsop", gin_esu_isdson = "gin_esu_isdson", gin_esu_pcisdok = "gin_esu_pcisdok", gin_esu_ecisdok = "gin_esu_ecisdok", gin_esu_hcisdok = "gin_esu_hcisdok", gin_esu_pouoc = "gin_esu_pouoc", gin_esu_isdsupr = "gin_esu_isdsupr", gin_esu_inzobr = "gin_esu_inzobr", gin_esu_dnpov = "gin_esu_dnpov", gin_esu_mnzobr = "gin_esu_mnzobr", gin_iszr_urprio = "gin_iszr_urprio", gin_esu_buods = "gin_esu_buods", gin_iszr_esuprf = "gin_iszr_esuprf", gin_iszr_rozin = "gin_iszr_rozin", gin_esu_poumid = "gin_esu_poumid", gin_esu_ocnazev = "gin_esu_ocnazev", gin_iszr_povopr = "gin_iszr_povopr", gin_esu_pobico = "gin_esu_pobico", gin_esu_emzobr = "gin_esu_emzobr", gin_esu_poudi = "gin_esu_poudi", gin_esu_pogps = "gin_esu_pogps", gin_esu_poupo = "gin_esu_poupo", gin_esu_pours = "gin_esu_pours", gin_esu_pourl = "gin_esu_pourl", gin_esuuzsl_en = "gin_esuuzsl_en", gin_esu_bizobr = "gin_esu_bizobr", gin_esu_povpri = "gin_esu_povpri", gin_upsr_povol = "gin_upsr_povol",}
	const enum GEsuParamsFragments { gin_esu_kondup = "*", gin_esu_budui = "*", gin_esu_duedit = "*", gin_esu_kontico = "*", gin_esu_povicop = "*", gin_esu_obaladr = "*", gin_esu_uir_new = "*", gin_esu_stavneu = "*", gin_esu_pdicdph = "*", ParametrGinEsuPovVPsc = "*", gin_esu_povvpsc = "*", gin_esu_rozsu = "*", gin_esu_overtri = "*", gin_rad_esuppa = "*", gin_esu_buedit = "*", gin_esu_predpto = "*", gin_esu_obecpre = "*", gin_esuovertrio = "*", gin_esu_nabvla = "*", gin_esu_bubikon = "*", pam_rad_testesu = "*", gin_esu_burkon = "*", gin_esu_oprazo = "*", gin_esu_oprazox = "*", gin_esu_rppsc = "*", gin_esu_rp_bann = "*", gin_esu_rp_zety = "*", gin_esu_rp_zvty = "*", gin_esu_rp_ban = "*", ssl_opra_esu = "*", ssl_rp_esu_obal = "*", gin_esu_edprijm = "*", gin_esu_zatypad = "*", gin_esu_zatypad_volnyRezim = "*", gin_esu_zatypad_striktniRezim = "*", gin_esu_zatypak = "*", gin_esu_rp_new = "*", gin_esu_rp_akt = "*", gin_rad_esusv = "*", gin_rad_esusa = "*", gin_rad_esusv0 = "*", UrovnePristupuProVyberoveOkno = "*", UrovnePristupuProVyberoveOknoArrInt = "*", gin_rad_esusap = "*", gin_rad_esusazo = "*", gin_esu_urprnp = "*", gin_esu_vybpoc = "*", gin_esu_dnvyhl = "*", gin_esu_rcvyhl = "*", gin_esu_vybroi = "*", gin_iszr_povole = "*", gin_esu_iszrvar = "*", gin_esu_iszrblo = "*", gin_iszr_zostv = "*", gin_esu_dnzobr = "*", gin_esu_rczobr = "*", gin_esu_rczadat = "*", gin_esu_rcnenum = "*", gin_esu_torg = "*", gin_rad_uir = "*", gin_rad_rob = "*", gin_esu_isds_id = "*", gin_esu_isdsods = "*", gin_ssl_datschr = "*", gin_gex_povolen = "*", gin_esu_isdsof = "*", gin_esu_isdsop = "*", gin_esu_isdson = "*", gin_esu_pcisdok = "*", gin_esu_ecisdok = "*", gin_esu_hcisdok = "*", gin_esu_pouoc = "*", gin_esu_isdsupr = "*", gin_esu_inzobr = "*", gin_esu_dnpov = "*", gin_esu_mnzobr = "*", gin_iszr_urprio = "*", gin_esu_buods = "*", gin_iszr_esuprf = "*", gin_iszr_rozin = "*", gin_esu_poumid = "*", gin_esu_ocnazev = "*", gin_iszr_povopr = "*", gin_esu_pobico = "*", gin_esu_emzobr = "*", gin_esu_poudi = "*", gin_esu_pogps = "*", gin_esu_poupo = "*", gin_esu_pours = "*", gin_esu_pourl = "*", gin_esuuzsl_en = "*", gin_esu_bizobr = "*", gin_esu_povpri = "*", gin_upsr_povol = "*",}
	const enum GEsuParamsTypes { gin_esu_kondup = "string", gin_esu_budui = "number", gin_esu_duedit = "number", gin_esu_kontico = "Gordic.Esu.WebClient.KontIco", gin_esu_povicop = "number", gin_esu_obaladr = "boolean", gin_esu_uir_new = "boolean", gin_esu_stavneu = "boolean", gin_esu_pdicdph = "boolean", ParametrGinEsuPovVPsc = "boolean", gin_esu_povvpsc = "boolean", gin_esu_rozsu = "boolean", gin_esu_overtri = "number", gin_rad_esuppa = "boolean", gin_esu_buedit = "number", gin_esu_predpto = "string", gin_esu_obecpre = "boolean", gin_esuovertrio = "number", gin_esu_nabvla = "number", gin_esu_bubikon = "number", pam_rad_testesu = "number", gin_esu_burkon = "number", gin_esu_oprazo = "number", gin_esu_oprazox = "number", gin_esu_rppsc = "boolean", gin_esu_rp_bann = "boolean", gin_esu_rp_zety = "string", gin_esu_rp_zvty = "string", gin_esu_rp_ban = "boolean", ssl_opra_esu = "boolean", ssl_rp_esu_obal = "boolean", gin_esu_edprijm = "boolean", gin_esu_zatypad = "boolean", gin_esu_zatypad_volnyRezim = "boolean", gin_esu_zatypad_striktniRezim = "boolean", gin_esu_zatypak = "boolean", gin_esu_rp_new = "boolean", gin_esu_rp_akt = "boolean", gin_rad_esusv = "boolean", gin_rad_esusa = "string", gin_rad_esusv0 = "string", UrovnePristupuProVyberoveOkno = "string", UrovnePristupuProVyberoveOknoArrInt = "number[]", gin_rad_esusap = "string", gin_rad_esusazo = "string", gin_esu_urprnp = "string", gin_esu_vybpoc = "string", gin_esu_dnvyhl = "boolean", gin_esu_rcvyhl = "boolean", gin_esu_vybroi = "boolean", gin_iszr_povole = "boolean", gin_esu_iszrvar = "string", gin_esu_iszrblo = "string", gin_iszr_zostv = "boolean", gin_esu_dnzobr = "boolean", gin_esu_rczobr = "boolean", gin_esu_rczadat = "boolean", gin_esu_rcnenum = "boolean", gin_esu_torg = "boolean", gin_rad_uir = "boolean", gin_rad_rob = "boolean", gin_esu_isds_id = "boolean", gin_esu_isdsods = "boolean", gin_ssl_datschr = "boolean", gin_gex_povolen = "boolean", gin_esu_isdsof = "string", gin_esu_isdsop = "string", gin_esu_isdson = "string", gin_esu_pcisdok = "boolean", gin_esu_ecisdok = "boolean", gin_esu_hcisdok = "boolean", gin_esu_pouoc = "boolean", gin_esu_isdsupr = "string", gin_esu_inzobr = "boolean", gin_esu_dnpov = "boolean", gin_esu_mnzobr = "boolean", gin_iszr_urprio = "string", gin_esu_buods = "number", gin_iszr_esuprf = "number", gin_iszr_rozin = "boolean", gin_esu_poumid = "boolean", gin_esu_ocnazev = "string", gin_iszr_povopr = "boolean", gin_esu_pobico = "boolean", gin_esu_emzobr = "number", gin_esu_poudi = "boolean", gin_esu_pogps = "boolean", gin_esu_poupo = "boolean", gin_esu_pours = "boolean", gin_esu_pourl = "boolean", gin_esuuzsl_en = "string", gin_esu_bizobr = "number", gin_esu_povpri = "number", gin_upsr_povol = "number",}
	const enum GEsuParamsTypeLengths {}
	/**Způsob kontroly IČO*/
	const enum KontIco {
		/**Nekontrolovat*/
		Ne=0,
		/**Kontrolovat existenci IČA*/
		AnoVarovani=1,
		/**Neumožnit uložit ESU s duplicitním IČO*/
		AnoChyba=2,
		/**Neumožnit uložit ESU s duplicitním IČO a duplicitní hledat i dle parametru GIN ESU - Úroveň přístupu k externím subjektům (výběr ve výběrovém okně kartotéky)*/
		AnoChybaUrPriDleVyberu=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Adk\Dto\GRuzneADKDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**ADK ruzne Dto*/
	interface GPrevodAisvDto {
		/**InfoPocetSzrvoso*/
		InfoPocetSzrvoso?: string|null;
		/**PocetIcoAisv*/
		PocetIcoAisv?: string|null;
		/**RobAifo*/
		RobAifo?: string|null;
		/**RobAifoAISV*/
		RobAifoAISV?: string|null;
	}
	const enum GPrevodAisvDtoNames { InfoPocetSzrvoso = "InfoPocetSzrvoso", PocetIcoAisv = "PocetIcoAisv", RobAifo = "RobAifo", RobAifoAISV = "RobAifoAISV",}
	const enum GPrevodAisvDtoFragments { InfoPocetSzrvoso = "*", PocetIcoAisv = "*", RobAifo = "*", RobAifoAISV = "*",}
	const enum GPrevodAisvDtoTypes { InfoPocetSzrvoso = "string", PocetIcoAisv = "string", RobAifo = "string", RobAifoAISV = "string",}
	const enum GPrevodAisvDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Adk\Dto\NapojovaniEsuDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Kartoteka dto*/
	interface NapojovaniEsuDto extends Gordic.Esu.WebClient.GKartotekaDto {
	}
	const enum NapojovaniEsuDtoNames { ixs_esu = "ixs_esu", typ_esu = "typ_esu", typ_esu_txt = "typ_esu_txt", nazev = "nazev", nazev_isds = "nazev_isds", ico_isds = "ico_isds", zkratka = "zkratka", poznamka = "poznamka", typ_org_txt = "typ_org_txt", stupen_ver = "stupen_ver", stupen_ver_txt = "stupen_ver_txt", stat = "stat", stat_txt = "stat_txt", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", adresa_kod = "adresa_kod", pobox = "pobox", tel = "tel", mail = "mail", fax = "fax", ob_jmeno = "ob_jmeno", typ_org = "typ_org", aktivita = "aktivita", ico = "ico", dic = "dic", rc = "rc", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", esu_txt = "esu_txt", dat_zmena = "dat_zmena", dat_mpd = "dat_mpd", cnt_zo = "cnt_zo", dat_nar = "dat_nar", dat_umrti = "dat_umrti", url = "url", zmenu_prov = "zmenu_prov", zmenu_prov_rf = "zmenu_prov_rf", revize = "revize", dat_akt_rob = "dat_akt_rob", dat_akt_ros = "dat_akt_ros", prihlaseni_zmen_rob = "prihlaseni_zmen_rob", typ_upadku_txt = "typ_upadku_txt", ur_pri = "ur_pri", poc_adres = "poc_adres", poc_doruc = "poc_doruc", bu_exist = "bu_exist", ixs_nad = "ixs_nad", ixs_prev = "ixs_prev", ixs_eko = "ixs_eko", ixs_eko2 = "ixs_eko2", nazev_tooltip = "nazev_tooltip", adresa_tooltip = "adresa_tooltip", st0 = "st0", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", typ_upadku = "typ_upadku", typ_adr = "typ_adr", oc = "oc", typ_adr_txt = "typ_adr_txt", id_ds = "id_ds", id_eu = "id_eu", id_gex = "id_gex", dat_akt_info_o_ds = "dat_akt_info_o_ds", dbstatus = "dbstatus", druh_stav_r_txt1 = "druh_stav_r_txt1", druh_stav_r_txt2 = "druh_stav_r_txt2", druh_stav_r_txt3 = "druh_stav_r_txt3", druh_stav_r_txt = "druh_stav_r_txt", mi_jmeno = "mi_jmeno", mi_prijmeni = "mi_prijmeni", uziv_sl_e = "uziv_sl_e", ico_ds = "ico_ds", pr_forma = "pr_forma", pr_forma_ares = "pr_forma_ares", m_vyber = "m_vyber", m_err = "m_err", pocet_ixs_eko = "pocet_ixs_eko", pocet_ixs_prev = "pocet_ixs_prev", pocet_id_int = "pocet_id_int", pocet_vaz_wfl = "pocet_vaz_wfl", pocet_ext_uz = "pocet_ext_uz", pocet_oso_uda = "pocet_oso_uda", ixs_eko_nazev = "ixs_eko_nazev", color = "color", typ_txt = "typ_txt", nazev_ext = "nazev_ext", esu_txt_ext = "esu_txt_ext", lic = "lic", por_zast = "por_zast",}
	const enum NapojovaniEsuDtoFragments { ixs_esu = "*", typ_esu = "*", typ_esu_txt = "*", nazev = "*", nazev_isds = "*", ico_isds = "*", zkratka = "*", poznamka = "*", typ_org_txt = "*", stupen_ver = "*", stupen_ver_txt = "*", stat = "*", stat_txt = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", adresa_kod = "*", pobox = "*", tel = "*", mail = "*", fax = "*", ob_jmeno = "*", typ_org = "*", aktivita = "*", ico = "*", dic = "*", rc = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", esu_txt = "*", dat_zmena = "*", dat_mpd = "*", cnt_zo = "*", dat_nar = "*", dat_umrti = "*", url = "*", zmenu_prov = "*", zmenu_prov_rf = "*", revize = "*", dat_akt_rob = "*", dat_akt_ros = "*", prihlaseni_zmen_rob = "*", typ_upadku_txt = "*", ur_pri = "*", poc_adres = "*", poc_doruc = "*", bu_exist = "*", ixs_nad = "*", ixs_prev = "*", ixs_eko = "*", ixs_eko2 = "*", nazev_tooltip = "*", adresa_tooltip = "*", st0 = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", typ_upadku = "*", typ_adr = "*", oc = "*", typ_adr_txt = "*", id_ds = "*", id_eu = "*", id_gex = "*", dat_akt_info_o_ds = "*", dbstatus = "*", druh_stav_r_txt1 = "*", druh_stav_r_txt2 = "*", druh_stav_r_txt3 = "*", druh_stav_r_txt = "*", mi_jmeno = "*", mi_prijmeni = "*", uziv_sl_e = "*", ico_ds = "*", pr_forma = "*", pr_forma_ares = "*", m_vyber = "*", m_err = "*", pocet_ixs_eko = "*", pocet_ixs_prev = "*", pocet_id_int = "*", pocet_vaz_wfl = "*", pocet_ext_uz = "*", pocet_oso_uda = "*", ixs_eko_nazev = "*", color = "*", typ_txt = "*", nazev_ext = "*", esu_txt_ext = "*", lic = "*", por_zast = "*",}
	const enum NapojovaniEsuDtoTypes { ixs_esu = "string", typ_esu = "number", typ_esu_txt = "string", nazev = "string", nazev_isds = "string", ico_isds = "JsonDecimal", zkratka = "string", poznamka = "string", typ_org_txt = "string", stupen_ver = "number", stupen_ver_txt = "string", stat = "number", stat_txt = "string", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", adresa_kod = "string", pobox = "string", tel = "string", mail = "string", fax = "string", ob_jmeno = "string", typ_org = "number", aktivita = "number", ico = "string", dic = "string", rc = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", esu_txt = "string", dat_zmena = "JsonDate", dat_mpd = "JsonDate", cnt_zo = "JsonDecimal", dat_nar = "JsonDate", dat_umrti = "JsonDate", url = "string", zmenu_prov = "string", zmenu_prov_rf = "string", revize = "string", dat_akt_rob = "JsonDate", dat_akt_ros = "JsonDate", prihlaseni_zmen_rob = "number", typ_upadku_txt = "string", ur_pri = "number", poc_adres = "JsonDecimal", poc_doruc = "JsonDecimal", bu_exist = "JsonDecimal", ixs_nad = "string", ixs_prev = "string", ixs_eko = "string", ixs_eko2 = "string", nazev_tooltip = "string", adresa_tooltip = "string", st0 = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", typ_upadku = "number", typ_adr = "number", oc = "string", typ_adr_txt = "string", id_ds = "string", id_eu = "string", id_gex = "string", dat_akt_info_o_ds = "JsonDate", dbstatus = "string", druh_stav_r_txt1 = "string", druh_stav_r_txt2 = "string", druh_stav_r_txt3 = "string", druh_stav_r_txt = "string", mi_jmeno = "string", mi_prijmeni = "string", uziv_sl_e = "string", ico_ds = "string", pr_forma = "string", pr_forma_ares = "string", m_vyber = "number", m_err = "string", pocet_ixs_eko = "JsonDecimal", pocet_ixs_prev = "JsonDecimal", pocet_id_int = "JsonDecimal", pocet_vaz_wfl = "JsonDecimal", pocet_ext_uz = "JsonDecimal", pocet_oso_uda = "JsonDecimal", ixs_eko_nazev = "string", color = "string", typ_txt = "string", nazev_ext = "string", esu_txt_ext = "string", lic = "string", por_zast = "number",}
	/**SubtaskNapojovaniEsu*/
	const enum SubtaskNapojovaniEsu {
		/**Vschny*/
		Vsechny=0,
		/**DnesniPrace*/
		DnesniPrace=2,
		/**PracovniSeznam*/
		PracovniSeznam=3,
		/**VybranyNapojeneEKO*/
		VybranyNapojeneEKO=4,
		/**VybranyNapojene*/
		VybranyNapojene=5,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Adk\Dto\PripravenostGdprDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Kartoteka dto*/
	interface PripravenostGdprDto {
		/**GdprPlus*/
		GdprPlus?: string|null;
		/**xxxx*/
		NeurcenoImg?: boolean|null;
		/**xxxx*/
		Neurceno?: string|null;
		/**xxxx*/
		VznikuNeurcenoImg?: boolean|null;
		/**xxxx*/
		VznikuNeurceno?: string|null;
		/**xxxx*/
		PocetFoImg?: boolean|null;
		/**xxxx*/
		PocetFo?: string|null;
		/**xxxx*/
		PocetNeurceno?: string|null;
		/**xxxx*/
		UrovneImg?: boolean|null;
		/**xxxx*/
		Urovne?: string|null;
		/**xxxx*/
		TypOrgImg?: boolean|null;
		/**xxxx*/
		TypOrg?: string|null;
		/**xxxx*/
		LogovaniGdprImg?: boolean|null;
		/**xxxx*/
		LogovaniGdpr?: string|null;
		/**xxxx*/
		LogovaniImg?: boolean|null;
		/**xxxx*/
		Logovani?: string|null;
		/**xxxx*/
		RozhraniImg?: boolean|null;
		/**xxxx*/
		Rozhrani?: string|null;
		/**xxxx*/
		DemoDbImg?: boolean|null;
		/**xxxx*/
		DemoDb?: string|null;
		/**xxxx*/
		DuvodyImg?: boolean|null;
		/**xxxx*/
		Duvody?: string|null;
		/**xxxx*/
		DuvodyTooltip?: string|null;
		/**xxxx*/
		AvizaceVisible?: boolean|null;
		/**xxxx*/
		Avizace?: string|null;
		/**xxxx*/
		Hodnoceni?: string|null;
		/**xxxx*/
		ScoreVisible?: boolean|null;
		/**xxxx*/
		PocetAktivnich?: string|null;
		/**xxxx*/
		PocetNahledu?: string|null;
	}
	const enum PripravenostGdprDtoNames { GdprPlus = "GdprPlus", NeurcenoImg = "NeurcenoImg", Neurceno = "Neurceno", VznikuNeurcenoImg = "VznikuNeurcenoImg", VznikuNeurceno = "VznikuNeurceno", PocetFoImg = "PocetFoImg", PocetFo = "PocetFo", PocetNeurceno = "PocetNeurceno", UrovneImg = "UrovneImg", Urovne = "Urovne", TypOrgImg = "TypOrgImg", TypOrg = "TypOrg", LogovaniGdprImg = "LogovaniGdprImg", LogovaniGdpr = "LogovaniGdpr", LogovaniImg = "LogovaniImg", Logovani = "Logovani", RozhraniImg = "RozhraniImg", Rozhrani = "Rozhrani", DemoDbImg = "DemoDbImg", DemoDb = "DemoDb", DuvodyImg = "DuvodyImg", Duvody = "Duvody", DuvodyTooltip = "DuvodyTooltip", AvizaceVisible = "AvizaceVisible", Avizace = "Avizace", Hodnoceni = "Hodnoceni", ScoreVisible = "ScoreVisible", PocetAktivnich = "PocetAktivnich", PocetNahledu = "PocetNahledu",}
	const enum PripravenostGdprDtoFragments { GdprPlus = "*", NeurcenoImg = "*", Neurceno = "*", VznikuNeurcenoImg = "*", VznikuNeurceno = "*", PocetFoImg = "*", PocetFo = "*", PocetNeurceno = "*", UrovneImg = "*", Urovne = "*", TypOrgImg = "*", TypOrg = "*", LogovaniGdprImg = "*", LogovaniGdpr = "*", LogovaniImg = "*", Logovani = "*", RozhraniImg = "*", Rozhrani = "*", DemoDbImg = "*", DemoDb = "*", DuvodyImg = "*", Duvody = "*", DuvodyTooltip = "*", AvizaceVisible = "*", Avizace = "*", Hodnoceni = "*", ScoreVisible = "*", PocetAktivnich = "*", PocetNahledu = "*",}
	const enum PripravenostGdprDtoTypes { GdprPlus = "string", NeurcenoImg = "boolean", Neurceno = "string", VznikuNeurcenoImg = "boolean", VznikuNeurceno = "string", PocetFoImg = "boolean", PocetFo = "string", PocetNeurceno = "string", UrovneImg = "boolean", Urovne = "string", TypOrgImg = "boolean", TypOrg = "string", LogovaniGdprImg = "boolean", LogovaniGdpr = "string", LogovaniImg = "boolean", Logovani = "string", RozhraniImg = "boolean", Rozhrani = "string", DemoDbImg = "boolean", DemoDb = "string", DuvodyImg = "boolean", Duvody = "string", DuvodyTooltip = "string", AvizaceVisible = "boolean", Avizace = "string", Hodnoceni = "string", ScoreVisible = "boolean", PocetAktivnich = "string", PocetNahledu = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Adk\Dto\SeznamNepouzitychDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Kartoteka dto*/
	interface SeznamNepouzitychDto {
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		zkr_ag?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		ur_pri?: number|null;
		/**Autogenerated.*/
		ur_pri_txt?: string|null;
		/**Autogenerated.*/
		typ_duv_del_txt?: string|null;
		/**Autogenerated.*/
		dat_mpd?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmenu_prov_nazev_rf?: string|null;
		/**Autogenerated.*/
		revize?: string|null;
		/**Autogenerated.*/
		esu_txt?: string|null;
		/**Autogenerated.*/
		m_vyber?: number|null;
		/**Autogenerated.*/
		m_err?: string|null;
		/**Autogenerated.*/
		typ_esu_txt?: string|null;
		/**Autogenerated.*/
		dat_mpd_datetime?: JsonDate|null;
	}
	const enum SeznamNepouzitychDtoNames { ixs_esu = "ixs_esu", typ_ag = "typ_ag", zkr_ag = "zkr_ag", aktivita = "aktivita", ur_pri = "ur_pri", ur_pri_txt = "ur_pri_txt", typ_duv_del_txt = "typ_duv_del_txt", dat_mpd = "dat_mpd", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_nazev_rf = "zmenu_prov_nazev_rf", revize = "revize", esu_txt = "esu_txt", m_vyber = "m_vyber", m_err = "m_err", typ_esu_txt = "typ_esu_txt", dat_mpd_datetime = "dat_mpd_datetime",}
	const enum SeznamNepouzitychDtoFragments { ixs_esu = "*", typ_ag = "*", zkr_ag = "*", aktivita = "*", ur_pri = "*", ur_pri_txt = "*", typ_duv_del_txt = "*", dat_mpd = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_nazev_rf = "*", revize = "*", esu_txt = "*", m_vyber = "*", m_err = "*", typ_esu_txt = "*", dat_mpd_datetime = "*",}
	const enum SeznamNepouzitychDtoTypes { ixs_esu = "string", typ_ag = "number", zkr_ag = "string", aktivita = "number", ur_pri = "number", ur_pri_txt = "string", typ_duv_del_txt = "string", dat_mpd = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_nazev_rf = "string", revize = "string", esu_txt = "string", m_vyber = "number", m_err = "string", typ_esu_txt = "string", dat_mpd_datetime = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Adk\Dto\SeznamOdstranenychDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Kartoteka dto*/
	interface SeznamOdstranenychDto {
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		zkr_ag?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_mpd?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmenu_prov_nazev_rf?: string|null;
		/**Autogenerated.*/
		duvod_ucel?: string|null;
		/**Autogenerated.*/
		seznam_udaju?: string|null;
		/**Autogenerated.*/
		ixp?: string|null;
		/**Autogenerated.*/
		esu_txt?: string|null;
	}
	const enum SeznamOdstranenychDtoNames { ixs_esu = "ixs_esu", typ_ag = "typ_ag", zkr_ag = "zkr_ag", aktivita = "aktivita", dat_mpd = "dat_mpd", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_nazev_rf = "zmenu_prov_nazev_rf", duvod_ucel = "duvod_ucel", seznam_udaju = "seznam_udaju", ixp = "ixp", esu_txt = "esu_txt",}
	const enum SeznamOdstranenychDtoFragments { ixs_esu = "*", typ_ag = "*", zkr_ag = "*", aktivita = "*", dat_mpd = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_nazev_rf = "*", duvod_ucel = "*", seznam_udaju = "*", ixp = "*", esu_txt = "*",}
	const enum SeznamOdstranenychDtoTypes { ixs_esu = "string", typ_ag = "number", zkr_ag = "string", aktivita = "number", dat_mpd = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_nazev_rf = "string", duvod_ucel = "string", seznam_udaju = "string", ixp = "string", esu_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GBankovniUctyDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto se seznamem Adres externího subjektu*/
	interface GBankovniUctyDto {
		/**Autogenerated.*/
		zahranicni?: number|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		bu_ci?: string|null;
		/**Autogenerated.*/
		sk_ci?: string|null;
		/**Autogenerated.*/
		sk_num?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov_rf?: string|null;
		/**Autogenerated.*/
		ixs_esu_ban?: string|null;
		/**Autogenerated.*/
		ixs_esu_ban_txt?: string|null;
		/**Autogenerated.*/
		mena?: number|null;
		/**Autogenerated.*/
		mena_zkr?: string|null;
		/**Autogenerated.*/
		bic?: string|null;
		/**Autogenerated.*/
		bic_ban?: string|null;
		/**Autogenerated.*/
		typ_ban?: number|null;
		/**Autogenerated.*/
		typ_ban_txt?: string|null;
		/**Autogenerated.*/
		obec?: string|null;
		/**Autogenerated.*/
		priz_fu?: number|null;
		/**Autogenerated.*/
		reg_dph_ok?: number|null;
		/**Autogenerated.*/
		nazev_uctu?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		ixs_fun?: string|null;
		/**Autogenerated.*/
		ixs_su?: string|null;
		/**CisloUctuZaloha pro zalohovani ve specialnim případě kdy se neukládá IBAN ale cislo uctu*/
		cisloUctuZaloha?: string|null;
		/**idEsuBanky.*/
		idEsuBanky?: string|null;
	}
	const enum GBankovniUctyDtoNames { zahranicni = "zahranicni", ixs_esu = "ixs_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", sk_num = "sk_num", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov_rf = "zmenu_prov_rf", ixs_esu_ban = "ixs_esu_ban", ixs_esu_ban_txt = "ixs_esu_ban_txt", mena = "mena", mena_zkr = "mena_zkr", bic = "bic", bic_ban = "bic_ban", typ_ban = "typ_ban", typ_ban_txt = "typ_ban_txt", obec = "obec", priz_fu = "priz_fu", reg_dph_ok = "reg_dph_ok", nazev_uctu = "nazev_uctu", aktivita = "aktivita", ixs_fun = "ixs_fun", ixs_su = "ixs_su", cisloUctuZaloha = "cisloUctuZaloha", idEsuBanky = "idEsuBanky",}
	const enum GBankovniUctyDtoFragments { zahranicni = "*", ixs_esu = "*", bu_ci = "*", sk_ci = "*", sk_num = "*", nazev = "*", dat_zmena = "*", zmenu_prov_rf = "*", ixs_esu_ban = "*", ixs_esu_ban_txt = "*", mena = "*", mena_zkr = "*", bic = "*", bic_ban = "*", typ_ban = "*", typ_ban_txt = "*", obec = "*", priz_fu = "*", reg_dph_ok = "*", nazev_uctu = "*", aktivita = "*", ixs_fun = "*", ixs_su = "*", cisloUctuZaloha = "*", idEsuBanky = "*",}
	const enum GBankovniUctyDtoTypes { zahranicni = "number", ixs_esu = "string", bu_ci = "string", sk_ci = "string", sk_num = "string", nazev = "string", dat_zmena = "JsonDate", zmenu_prov_rf = "string", ixs_esu_ban = "string", ixs_esu_ban_txt = "string", mena = "number", mena_zkr = "string", bic = "string", bic_ban = "string", typ_ban = "number", typ_ban_txt = "string", obec = "string", priz_fu = "number", reg_dph_ok = "number", nazev_uctu = "string", aktivita = "number", ixs_fun = "string", ixs_su = "string", cisloUctuZaloha = "string", idEsuBanky = "string",}
	const enum GBankovniUctyDtoTypeLengths { ixs_esu = 12, bu_ci = 34, sk_ci = 11, nazev = 50, ixs_esu_ban = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GDetailEsuItemsDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Detail Esu Items Dto*/
	interface GDetailEsuItemsDto {
		/**Zkontroluje zda lze editovat ZO*/
		LzeEditovatZastupnouOsobu?: boolean|null;
		/**Identifikátor externího subjektu*/
		IxsEsu?: string|null;
		/**Typ externího subjektu*/
		TypEsu?: number|null;
		/**Typ externího subjektu String*/
		TypEsuString?: string|null;
		/**Název externího subjektu*/
		Nazev?: string|null;
		/**Zratka*/
		Zkratka?: string|null;
		/**Poznámka*/
		Poznamka?: string|null;
		/**StupenVerifikace*/
		StupenVerifikace?: number|null;
		/**Stat*/
		Stat?: number|null;
		/**Stat*/
		Stat_String?: string|null;
		/**Statni prislusnost*/
		StatSp?: number|null;
		/**Psc*/
		Psc?: string|null;
		/**Obec*/
		Obec?: string|null;
		/**CastObce*/
		CastObce?: string|null;
		/**Ulice*/
		Ulice?: string|null;
		/**CisloOrientacni*/
		CisloOrientacni?: string|null;
		/**CisloPopisne*/
		CisloPopisne?: string|null;
		/**KodUirAdr*/
		KodUirAdr?: string|null;
		/**KodUirAdrDoruc - doručovací adresy*/
		KodUirAdrDoruc?: string|null;
		/**PoBox*/
		PoBox?: string|null;
		/**KodUirAdr*/
		Telefon?: string|null;
		/**EMail*/
		EMail?: string|null;
		/**Fax*/
		Fax?: string|null;
		/**ObchodniJmeno*/
		ObchodniJmeno?: string|null;
		/**TypOrganizace*/
		TypOrganizace?: number|null;
		/**Ico*/
		Ico?: string|null;
		/**Dic*/
		Dic?: string|null;
		/**RodneCislo*/
		RodneCislo?: string|null;
		/**Jméno*/
		Jmeno?: string|null;
		/**Prijmeni*/
		Prijmeni?: string|null;
		/**TitulPred*/
		TitulPred?: string|null;
		/**TitulPred*/
		TitulZa?: string|null;
		/**Obálková adresa řádek 0*/
		St0?: string|null;
		/**Obálková adresa řádek 1*/
		St1?: string|null;
		/**Obálková adresa řádek 2*/
		St2?: string|null;
		/**Obálková adresa řádek 3*/
		St3?: string|null;
		/**Obálková adresa řádek 4*/
		St4?: string|null;
		/**Obálková adresa řádek 5*/
		St5?: string|null;
		/**Obálková adresa řádek 6*/
		St6?: string|null;
		/**Obálková adresa řádek 7*/
		St7?: string|null;
		/**Úroveň přístupu*/
		UrPri?: number|null;
		/**Textové vyjádření esu*/
		EsuTxt?: string|null;
		/**Příznak, zda je plátce DPH*/
		PrizDph?: number|null;
		/**neaktualizovat obálkovou adresu z modulu INT*/
		NeaktObaInt?: number|null;
		/**url adresa organizace nebo občana*/
		Url?: string|null;
		/**datum narození*/
		DatNar?: JsonDate|null;
		/**bezvýznamový identifikátor osoby*/
		Bio?: JsonDecimal|null;
		/**kód oblasti (pro RRO)*/
		KodO?: number|null;
		/**kód oblasti (pro RRO)*/
		Pco?: number|null;
		/**idenitifikátor osoby (ROB)*/
		ixsOso?: string|null;
		/**změnu provedl*/
		ZmenuProv?: string|null;
		/**identifikátor hlavního ESU (pro pobočky)*/
		IxsNad?: string|null;
		/**identifikátor hlavního eko ESU (pro pobočky a ekonomické subjekty)*/
		IxsEko?: string|null;
		/**identifikátor hlavního  ESU (při opravách esu vazba na nejnovější aktivní)*/
		IxsPrev?: string|null;
		/**agendový identifikátor v ROB*/
		Aifo?: string|null;
		/**agendový identifikátor v AISEO*/
		AifoIseo?: string|null;
		/**příznak náhradního aifo*/
		NahradniAifo?: number|null;
		/**identifikátor AgendaZadostId*/
		RegOdpovedId?: string|null;
		/**identifikátor AgendaZadostId*/
		AgendaZadostId?: string|null;
		/**identifikátor asynchronní žádosti do SZR*/
		FrontaIszrZadostId?: string|null;
		/**identifikátor žádosti do SZR (pro uložení do "V" tabulek)*/
		IszrZadostId?: string|null;
		/**typ úpadku txt*/
		TypUpadkuTxt?: string|null;
		/**url úpadku*/
		UrlUpadku?: string|null;
		/**gps šířka*/
		GpsSirka?: string|null;
		/**GPS délka*/
		GpsDelka?: string|null;
		/**Příznak úmrtí*/
		PrizUmrti?: number|null;
		/**Datum úmrtí*/
		DatUmrti?: JsonDate|null;
		/**Osobní číslo*/
		Oc?: string|null;
		/**m_nPohlavi*/
		Pohlavi?: number|null;
		/**m_nRodStav*/
		RodStav?: number|null;
		/**m_nTypAdr*/
		TypAdr?: number|null;
		/**Příznak interní adresy*/
		PrizInt?: number|null;
		/**m_sRodPrijmeni*/
		RodPrijmeni?: string|null;
		/**m_sRodPrijmeni*/
		RodneJmeno?: string|null;
		/**m_sMistoNar*/
		MistoNar?: string|null;
		/**m_sPrezdivka*/
		Prezdivka?: string|null;
		/**m_sIxsEsuZam*/
		IxsEsuZam?: string|null;
		/**IdDs*/
		IdDs?: string|null;
		/**IdDs*/
		SkEdeskId?: string|null;
		/**IdGex*/
		IdGex?: string|null;
		/**PartnerUct*/
		PartnerUct?: string|null;
		/**Aktivita*/
		Aktivita?: number|null;
		/**datum změny*/
		DatZmena?: JsonDate|null;
		/**MiJmeno*/
		MiJmeno?: string|null;
		/**MiPrijmeni*/
		MiPrijmeni?: string|null;
		/**m_sBic*/
		Bic?: string|null;
		/**m_sBic*/
		BicPoznamka?: string|null;
		/**BicAktivita*/
		BicAktivita?: number|null;
		/**BicTypBan*/
		BicTypBan?: number|null;
		/**Automatické generování obálkové adresy*/
		GenerateSt?: boolean|null;
		/**Určuje, zda se má automaticky provádět načítání detailů do objektů po volání metod, které provádí změnu dat v detailu.*/
		AutomatickeNacteniDetailu?: boolean|null;
		/**Insolvence*/
		Insolvence?: string|null;
		/**IcoOrig*/
		IcoOrig?: string|null;
		/**FlagUlozeno saveESU old*/
		FlagUlozeno?: boolean|null;
		/**zaškrtávátko opravit u obálkové adresy*/
		CheckBoxOpravit?: boolean|null;
		/**Obsah políčka ISZRtxt*/
		ISZRtxt?: string|null;
		/**Dto s osobnímy doklady*/
		doklady?: Gordic.Esu.WebClient.GOsobniDokladyDto[]|null;
		/**kod obce v adrese*/
		obec_kod?: number|null;
		/**Wfldkou*/
		Wfldkou?: string|null;
		/**IdExt*/
		IdExt?: string|null;
		/**IdExtWarning*/
		IdExtWarning?: string|null;
		/**IdExtVisible*/
		IdExtVisible?: boolean|null;
		/**PocetGinsexuWarning*/
		PocetGinsexuWarning?: string|null;
		/**ExistujeDorucovaci*/
		ExistujeDorucovaci?: boolean|null;
		/**EuId*/
		EuId?: string|null;
		/**IdEu*/
		IdEu?: string|null;
		/**Lei*/
		Lei?: string|null;
		/**Eori*/
		Eori?: string|null;
		/**SeedId*/
		SeedId?: string|null;
	}
	const enum GDetailEsuItemsDtoNames { LzeEditovatZastupnouOsobu = "LzeEditovatZastupnouOsobu", IxsEsu = "IxsEsu", TypEsu = "TypEsu", TypEsuString = "TypEsuString", Nazev = "Nazev", Zkratka = "Zkratka", Poznamka = "Poznamka", StupenVerifikace = "StupenVerifikace", Stat = "Stat", Stat_String = "Stat_String", StatSp = "StatSp", Psc = "Psc", Obec = "Obec", CastObce = "CastObce", Ulice = "Ulice", CisloOrientacni = "CisloOrientacni", CisloPopisne = "CisloPopisne", KodUirAdr = "KodUirAdr", KodUirAdrDoruc = "KodUirAdrDoruc", PoBox = "PoBox", Telefon = "Telefon", EMail = "EMail", Fax = "Fax", ObchodniJmeno = "ObchodniJmeno", TypOrganizace = "TypOrganizace", Ico = "Ico", Dic = "Dic", RodneCislo = "RodneCislo", Jmeno = "Jmeno", Prijmeni = "Prijmeni", TitulPred = "TitulPred", TitulZa = "TitulZa", St0 = "St0", St1 = "St1", St2 = "St2", St3 = "St3", St4 = "St4", St5 = "St5", St6 = "St6", St7 = "St7", UrPri = "UrPri", EsuTxt = "EsuTxt", PrizDph = "PrizDph", NeaktObaInt = "NeaktObaInt", Url = "Url", DatNar = "DatNar", Bio = "Bio", KodO = "KodO", Pco = "Pco", ixsOso = "ixsOso", ZmenuProv = "ZmenuProv", IxsNad = "IxsNad", IxsEko = "IxsEko", IxsPrev = "IxsPrev", Aifo = "Aifo", AifoIseo = "AifoIseo", NahradniAifo = "NahradniAifo", RegOdpovedId = "RegOdpovedId", AgendaZadostId = "AgendaZadostId", FrontaIszrZadostId = "FrontaIszrZadostId", IszrZadostId = "IszrZadostId", TypUpadkuTxt = "TypUpadkuTxt", UrlUpadku = "UrlUpadku", GpsSirka = "GpsSirka", GpsDelka = "GpsDelka", PrizUmrti = "PrizUmrti", DatUmrti = "DatUmrti", Oc = "Oc", Pohlavi = "Pohlavi", RodStav = "RodStav", TypAdr = "TypAdr", PrizInt = "PrizInt", RodPrijmeni = "RodPrijmeni", RodneJmeno = "RodneJmeno", MistoNar = "MistoNar", Prezdivka = "Prezdivka", IxsEsuZam = "IxsEsuZam", IdDs = "IdDs", SkEdeskId = "SkEdeskId", IdGex = "IdGex", PartnerUct = "PartnerUct", Aktivita = "Aktivita", DatZmena = "DatZmena", MiJmeno = "MiJmeno", MiPrijmeni = "MiPrijmeni", Bic = "Bic", BicPoznamka = "BicPoznamka", BicAktivita = "BicAktivita", BicTypBan = "BicTypBan", GenerateSt = "GenerateSt", AutomatickeNacteniDetailu = "AutomatickeNacteniDetailu", Insolvence = "Insolvence", IcoOrig = "IcoOrig", FlagUlozeno = "FlagUlozeno", CheckBoxOpravit = "CheckBoxOpravit", ISZRtxt = "ISZRtxt", doklady = "doklady", obec_kod = "obec_kod", Wfldkou = "Wfldkou", IdExt = "IdExt", IdExtWarning = "IdExtWarning", IdExtVisible = "IdExtVisible", PocetGinsexuWarning = "PocetGinsexuWarning", ExistujeDorucovaci = "ExistujeDorucovaci", EuId = "EuId", IdEu = "IdEu", Lei = "Lei", Eori = "Eori", SeedId = "SeedId",}
	const enum GDetailEsuItemsDtoFragments { LzeEditovatZastupnouOsobu = "*", IxsEsu = "*", TypEsu = "*", TypEsuString = "*", Nazev = "*", Zkratka = "*", Poznamka = "*", StupenVerifikace = "*", Stat = "*", Stat_String = "*", StatSp = "*", Psc = "*", Obec = "*", CastObce = "*", Ulice = "*", CisloOrientacni = "*", CisloPopisne = "*", KodUirAdr = "*", KodUirAdrDoruc = "*", PoBox = "*", Telefon = "*", EMail = "*", Fax = "*", ObchodniJmeno = "*", TypOrganizace = "*", Ico = "*", Dic = "*", RodneCislo = "*", Jmeno = "*", Prijmeni = "*", TitulPred = "*", TitulZa = "*", St0 = "*", St1 = "*", St2 = "*", St3 = "*", St4 = "*", St5 = "*", St6 = "*", St7 = "*", UrPri = "*", EsuTxt = "*", PrizDph = "*", NeaktObaInt = "*", Url = "*", DatNar = "*", Bio = "*", KodO = "*", Pco = "*", ixsOso = "*", ZmenuProv = "*", IxsNad = "*", IxsEko = "*", IxsPrev = "*", Aifo = "*", AifoIseo = "*", NahradniAifo = "*", RegOdpovedId = "*", AgendaZadostId = "*", FrontaIszrZadostId = "*", IszrZadostId = "*", TypUpadkuTxt = "*", UrlUpadku = "*", GpsSirka = "*", GpsDelka = "*", PrizUmrti = "*", DatUmrti = "*", Oc = "*", Pohlavi = "*", RodStav = "*", TypAdr = "*", PrizInt = "*", RodPrijmeni = "*", RodneJmeno = "*", MistoNar = "*", Prezdivka = "*", IxsEsuZam = "*", IdDs = "*", SkEdeskId = "*", IdGex = "*", PartnerUct = "*", Aktivita = "*", DatZmena = "*", MiJmeno = "*", MiPrijmeni = "*", Bic = "*", BicPoznamka = "*", BicAktivita = "*", BicTypBan = "*", GenerateSt = "*", AutomatickeNacteniDetailu = "*", Insolvence = "*", IcoOrig = "*", FlagUlozeno = "*", CheckBoxOpravit = "*", ISZRtxt = "*", doklady = "*", obec_kod = "*", Wfldkou = "*", IdExt = "*", IdExtWarning = "*", IdExtVisible = "*", PocetGinsexuWarning = "*", ExistujeDorucovaci = "*", EuId = "*", IdEu = "*", Lei = "*", Eori = "*", SeedId = "*",}
	const enum GDetailEsuItemsDtoTypes { LzeEditovatZastupnouOsobu = "boolean", IxsEsu = "string", TypEsu = "number", TypEsuString = "string", Nazev = "string", Zkratka = "string", Poznamka = "string", StupenVerifikace = "number", Stat = "number", Stat_String = "string", StatSp = "number", Psc = "string", Obec = "string", CastObce = "string", Ulice = "string", CisloOrientacni = "string", CisloPopisne = "string", KodUirAdr = "string", KodUirAdrDoruc = "string", PoBox = "string", Telefon = "string", EMail = "string", Fax = "string", ObchodniJmeno = "string", TypOrganizace = "number", Ico = "string", Dic = "string", RodneCislo = "string", Jmeno = "string", Prijmeni = "string", TitulPred = "string", TitulZa = "string", St0 = "string", St1 = "string", St2 = "string", St3 = "string", St4 = "string", St5 = "string", St6 = "string", St7 = "string", UrPri = "number", EsuTxt = "string", PrizDph = "number", NeaktObaInt = "number", Url = "string", DatNar = "JsonDate", Bio = "JsonDecimal", KodO = "number", Pco = "number", ixsOso = "string", ZmenuProv = "string", IxsNad = "string", IxsEko = "string", IxsPrev = "string", Aifo = "string", AifoIseo = "string", NahradniAifo = "number", RegOdpovedId = "string", AgendaZadostId = "string", FrontaIszrZadostId = "string", IszrZadostId = "string", TypUpadkuTxt = "string", UrlUpadku = "string", GpsSirka = "string", GpsDelka = "string", PrizUmrti = "number", DatUmrti = "JsonDate", Oc = "string", Pohlavi = "number", RodStav = "number", TypAdr = "number", PrizInt = "number", RodPrijmeni = "string", RodneJmeno = "string", MistoNar = "string", Prezdivka = "string", IxsEsuZam = "string", IdDs = "string", SkEdeskId = "string", IdGex = "string", PartnerUct = "string", Aktivita = "number", DatZmena = "JsonDate", MiJmeno = "string", MiPrijmeni = "string", Bic = "string", BicPoznamka = "string", BicAktivita = "number", BicTypBan = "number", GenerateSt = "boolean", AutomatickeNacteniDetailu = "boolean", Insolvence = "string", IcoOrig = "string", FlagUlozeno = "boolean", CheckBoxOpravit = "boolean", ISZRtxt = "string", doklady = "Gordic.Esu.WebClient.GOsobniDokladyDto[]", obec_kod = "number", Wfldkou = "string", IdExt = "string", IdExtWarning = "string", IdExtVisible = "boolean", PocetGinsexuWarning = "string", ExistujeDorucovaci = "boolean", EuId = "string", IdEu = "string", Lei = "string", Eori = "string", SeedId = "string",}
	const enum GDetailEsuItemsDtoTypeLengths { IxsEsu = 12, Nazev = 100, Zkratka = 16, Poznamka = 254, Psc = 12, Obec = 48, CastObce = 48, Ulice = 48, CisloOrientacni = 10, CisloPopisne = 8, PoBox = 8, Telefon = 33, EMail = 254, Fax = 33, ObchodniJmeno = 254, Ico = 14, Dic = 15, RodneCislo = 10, Jmeno = 100, Prijmeni = 100, TitulPred = 35, TitulZa = 35, St0 = 50, St1 = 50, St2 = 50, St3 = 50, St4 = 50, St5 = 50, St6 = 50, St7 = 50, EsuTxt = 254, Url = 254, ZmenuProv = 12, IxsNad = 12, IxsPrev = 12, GpsSirka = 12, GpsDelka = 12, Oc = 30, RodPrijmeni = 36, RodneJmeno = 36, MistoNar = 48, Prezdivka = 254, IdDs = 100, SkEdeskId = 12, IdGex = 100, PartnerUct = 10, MiJmeno = 24, MiPrijmeni = 36,}
	/**navratové dto z funkce ObcerstviIszr*/
	interface GObcerstvitISZRRetDto {
		/**ISZR text*/
		gDatIszr?: string|null;
		/**adresa uradu txt*/
		adresaUraduTxt?: string|null;
	}
	const enum GObcerstvitISZRRetDtoNames { gDatIszr = "gDatIszr", adresaUraduTxt = "adresaUraduTxt",}
	const enum GObcerstvitISZRRetDtoFragments { gDatIszr = "*", adresaUraduTxt = "*",}
	const enum GObcerstvitISZRRetDtoTypes { gDatIszr = "string", adresaUraduTxt = "string",}
	const enum GObcerstvitISZRRetDtoTypeLengths {}
	/**navratové dto z funkce ObcerstviIszr*/
	interface UpdateObalkovaAdresaCallCountDto {
		/**ISZR text*/
		ObalkovaAdresaDto?: Gordic.Esu.WebClient.UpdateObalkovaAdresaRetDto|null;
		/**adresa uradu txt*/
		PocitadloVolaniObalkoveAdresy?: number|null;
	}
	const enum UpdateObalkovaAdresaCallCountDtoNames { ObalkovaAdresaDto = "ObalkovaAdresaDto", PocitadloVolaniObalkoveAdresy = "PocitadloVolaniObalkoveAdresy",}
	const enum UpdateObalkovaAdresaCallCountDtoFragments { ObalkovaAdresaDto = "*", PocitadloVolaniObalkoveAdresy = "*",}
	const enum UpdateObalkovaAdresaCallCountDtoTypes { ObalkovaAdresaDto = "Gordic.Esu.WebClient.UpdateObalkovaAdresaRetDto", PocitadloVolaniObalkoveAdresy = "number",}
	const enum UpdateObalkovaAdresaCallCountDtoTypeLengths {}
	/**Dto pro navrat z funkce obalkovaAdresaState*/
	interface UpdateObalkovaAdresaStateDto {
		/**RozdilnaObalkovaAdresa*/
		RozdilnaObalkovaAdresa?: boolean|null;
		/**St2*/
		St2?: string|null;
		/**St3*/
		St3?: string|null;
		/**St4*/
		St4?: string|null;
		/**St5*/
		St5?: string|null;
		/**St6*/
		St6?: string|null;
		/**RozdilnaObalkovaAdresa*/
		GenerovaniObalkoveAdresyDosloKOriznuti?: boolean|null;
	}
	const enum UpdateObalkovaAdresaStateDtoNames { RozdilnaObalkovaAdresa = "RozdilnaObalkovaAdresa", St2 = "St2", St3 = "St3", St4 = "St4", St5 = "St5", St6 = "St6", GenerovaniObalkoveAdresyDosloKOriznuti = "GenerovaniObalkoveAdresyDosloKOriznuti",}
	const enum UpdateObalkovaAdresaStateDtoFragments { RozdilnaObalkovaAdresa = "*", St2 = "*", St3 = "*", St4 = "*", St5 = "*", St6 = "*", GenerovaniObalkoveAdresyDosloKOriznuti = "*",}
	const enum UpdateObalkovaAdresaStateDtoTypes { RozdilnaObalkovaAdresa = "boolean", St2 = "string", St3 = "string", St4 = "string", St5 = "string", St6 = "string", GenerovaniObalkoveAdresyDosloKOriznuti = "boolean",}
	const enum UpdateObalkovaAdresaStateDtoTypeLengths {}
	/**Dto pro navrat z funkce obalkovaAdresaState*/
	interface UpdateObalkovaAdresaRetDto {
		/**DetailEsuItemsDto*/
		DetailEsuItemsDto?: Gordic.Esu.WebClient.GDetailEsuItemsDto|null;
		/**St2*/
		UpdateObalkovaAdresaState?: Gordic.Esu.WebClient.UpdateObalkovaAdresaStateDto|null;
	}
	const enum UpdateObalkovaAdresaRetDtoNames { DetailEsuItemsDto = "DetailEsuItemsDto", UpdateObalkovaAdresaState = "UpdateObalkovaAdresaState",}
	const enum UpdateObalkovaAdresaRetDtoFragments { DetailEsuItemsDto = "*", UpdateObalkovaAdresaState = "*",}
	const enum UpdateObalkovaAdresaRetDtoTypes { DetailEsuItemsDto = "Gordic.Esu.WebClient.GDetailEsuItemsDto", UpdateObalkovaAdresaState = "Gordic.Esu.WebClient.UpdateObalkovaAdresaStateDto",}
	const enum UpdateObalkovaAdresaRetDtoTypeLengths {}
	/**Typ zobrazení detailu externího subjektu*/
	const enum ModJmennyRejstrikEnum {
		/**Normální mod zobrazení*/
		Normal,
		/**Mod jmeneho rejstriku*/
		JmennyRejstrik,
	}
	/**Doplnkove akce, ktere se spusti pro spuštění detailu*/
	const enum DoplnkovaAkcePoSpusteniDetailuESUEnum {
		/**neurceno*/
		neurceno=0,
		/**spustitAres*/
		spustitAres=100,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GDetailInsolvencnihoRizeniDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**GDetailInsolvencnihoRizeniDto*/
	interface GDetailInsolvencnihoRizeniDto {
		/**Autogenerated.*/
		id_isir?: number|null;
		/**Autogenerated.*/
		dat_vznik?: JsonDate|null;
		/**Autogenerated.*/
		id_dokument?: string|null;
		/**Autogenerated.*/
		spis_znacka?: string|null;
		/**Autogenerated.*/
		typ_udal?: number|null;
		/**Autogenerated.*/
		oddil?: string|null;
		/**Autogenerated.*/
		poradi_v_oddilu?: number|null;
		/**Autogenerated.*/
		druh_stav_rizeni?: number|null;
		/**Autogenerated.*/
		id_osoby?: string|null;
		/**Autogenerated.*/
		dat_pravni_moci?: JsonDate|null;
		/**Autogenerated.*/
		priz_vedl_udal?: number|null;
		/**Autogenerated.*/
		priz_vedl_dok?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		typ_zazn_isir?: number|null;
		/**Autogenerated.*/
		id_isir_rus?: number|null;
		/**Autogenerated.*/
		typ_udal_txt?: string|null;
		/**Autogenerated.*/
		poradi_komb?: string|null;
		/**Autogenerated.*/
		oddil_int?: number|null;
		/**Autogenerated.*/
		id_vedl_dok?: string|null;
		/**Autogenerated.*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**Autogenerated.*/
		zob_dok?: string|null;
		/**Autogenerated.*/
		zob_vedl_dok?: string|null;
		/**Zobrazeni odkazu na hlavní dokument*/
		readonly hlavniDokumentHtml?: string|null;
		/**Vedlejsi dokument HTML*/
		readonly vedlejsiDokumentHtml?: string|null;
	}
	const enum GDetailInsolvencnihoRizeniDtoNames { id_isir = "id_isir", dat_vznik = "dat_vznik", id_dokument = "id_dokument", spis_znacka = "spis_znacka", typ_udal = "typ_udal", oddil = "oddil", poradi_v_oddilu = "poradi_v_oddilu", druh_stav_rizeni = "druh_stav_rizeni", id_osoby = "id_osoby", dat_pravni_moci = "dat_pravni_moci", priz_vedl_udal = "priz_vedl_udal", priz_vedl_dok = "priz_vedl_dok", dat_zmena = "dat_zmena", typ_zazn_isir = "typ_zazn_isir", id_isir_rus = "id_isir_rus", typ_udal_txt = "typ_udal_txt", poradi_komb = "poradi_komb", oddil_int = "oddil_int", id_vedl_dok = "id_vedl_dok", aktivita = "aktivita", zob_dok = "zob_dok", zob_vedl_dok = "zob_vedl_dok", hlavniDokumentHtml = "hlavniDokumentHtml", vedlejsiDokumentHtml = "vedlejsiDokumentHtml",}
	const enum GDetailInsolvencnihoRizeniDtoFragments { id_isir = "*", dat_vznik = "*", id_dokument = "*", spis_znacka = "*", typ_udal = "*", oddil = "*", poradi_v_oddilu = "*", druh_stav_rizeni = "*", id_osoby = "*", dat_pravni_moci = "*", priz_vedl_udal = "*", priz_vedl_dok = "*", dat_zmena = "*", typ_zazn_isir = "*", id_isir_rus = "*", typ_udal_txt = "*", poradi_komb = "*", oddil_int = "*", id_vedl_dok = "*", aktivita = "*", zob_dok = "*", zob_vedl_dok = "*", hlavniDokumentHtml = "*", vedlejsiDokumentHtml = "*",}
	const enum GDetailInsolvencnihoRizeniDtoTypes { id_isir = "number", dat_vznik = "JsonDate", id_dokument = "string", spis_znacka = "string", typ_udal = "number", oddil = "string", poradi_v_oddilu = "number", druh_stav_rizeni = "number", id_osoby = "string", dat_pravni_moci = "JsonDate", priz_vedl_udal = "number", priz_vedl_dok = "number", dat_zmena = "JsonDate", typ_zazn_isir = "number", id_isir_rus = "number", typ_udal_txt = "string", poradi_komb = "string", oddil_int = "number", id_vedl_dok = "string", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", zob_dok = "string", zob_vedl_dok = "string", hlavniDokumentHtml = "string", vedlejsiDokumentHtml = "string",}
	const enum GDetailInsolvencnihoRizeniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GEsuParamsDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Detail Esu Items Dto*/
	interface GEsuParamsDto {
		/**GIN ESU - kontrola duplicit při vytvoření nového ESU (výčet sloupců kontroly duplicit) (pouze SSL)
		*     výčet sloupců, dle kterých se při uložení kontrolují duplicitní záznamy. Sloupce musí být odděleny čárkami, sloupce musí být z této množiny (a minimum je nazev, obec, ulice, cor): nazev, ob_jmeno,jmeno, prijmeni, obec, ulice, cor, cpop, typ_esu, typ_org, dic, rc, ico, dat_nar, zkratka.
		*/
		gin_esu_kondup?: string|null;
		/**GIN ESU - povolení editace datumu úmrtí u FO\nPovoluje editaci datumu úmrtí*/
		gin_esu_duedit?: number|null;
		/**GIN ESU - kontrolovat existenci ESU se stejným IČO při vytvoření ESU (pouze některé moduly)
		*     Při nastavení totoho parametru je při vytvoření nebo opravě ESU zobrazeno upozornění v případě, že v DB existuje ESU se stejným IČO. Tento parametr je platný pouze pro některé moduly - zejména moduly Spisové služby - např. USU, POD, ... . 7.1.2010 doplněna nová hodnota Ano - neumožnit uložit ESU s duplicitním IČO. Tzn. pokud je nalezena duplicita, není vůbec možné uložit ESU - je to možné pouze v případě, kdy uživatel vytváří novou adresu / pobočku.
		*/
		gin_esu_kontico?: Gordic.Esu.WebClient.KontIco|null;
		/**GIN ESU - povinnost vyplnění IČO u právnické osoby (při vytvoření a editaci ESU)
		*     platí pro státy ČR
		*/
		gin_esu_povicop?: number|null;
		/**GIN ESU - metodika tvorby obálkové adresy
		*     Parametr určuje jak se budou skládat údaje do obálkové adresy. Navazuje na dokumentaci k systému. Standardní skládání je dle doporučení pošty (tzn. na obálku se dávají jen údaje vyžadované poštou). Rozšířené skládání obálkové adresy je takové, při kterémse do obálkové adresy dává maximum údajů z externího subjektu. Přeputí parametru nezpůsobí přeskládání obálkových adres u již existujících externích subjektů!
		*/
		gin_esu_obaladr?: boolean|null;
		/**GIN ESU - nabízet výběr z UIR při vytv. nového ESU
		*     Při vytvoření nového ESU (pokud je zprovozněn UIR) se nejdříve zobrazí okno výběru z UIR. Po jeho uzavření může uživatel začít vyplňovat ostatní položky ESU.
		*/
		gin_esu_uir_new?: boolean|null;
		/**GIN ESU - Používat typ ESU neurčeno (a typ organizace).
		*     GIN ESU - Používat typ ESU neurčeno (a typ organizace) při editaci a vytvoření externího subjektu. Paramer řídí to zda se bude položka neurčeno zobrazovat v číselnících.
		*/
		gin_esu_stavneu?: boolean|null;
		/**GIN ESU - povinnost vyplnění DIČ u plátce DPH
		*     Parametr určuje, zda má uživatel povinnost vyplnit DIČ u subjektu, který je plátcem DPH - při opravě i pořízení ESU.
		*/
		gin_esu_pdicdph?: boolean|null;
		/**GIN ESU - Povinnost vyplnění PSČ pro adresy v ČR
		*     Parametrem lze nastavit povinnost vyplnění PSČ pro adresy v ČR na detailu externího subjektu.
		*/
		gin_esu_povvpsc?: boolean|null;
		/**GIN ESU - Povolení editovat skupiny (rozdělovníky) za SU (které vytvořil jiný referent) (od 356)*/
		gin_esu_rozsu?: boolean|null;
		/**GIN ESU - Povolení ověření dat v seznamu subjektů z IS Triáda / VERA WS (od 358), jen některé fáze.
		*     jen některé fáze. Použití nutno konzultovat s pracovníky Gordic.
		*/
		gin_esu_overtri?: number|null;
		/**GIN ESU - Povolení přidávání a odebírání adres (v okně adresy/pobočky) (od)*/
		gin_rad_esuppa?: boolean|null;
		/**Práce s bankovními účty (viditelnost, editovatelnost) od 358
		*     0 - Uživatel nemůže vidět bankovní účty ESU, 1 - Uživatel může vidět bankovní účty ESU, 2 - Uživatel může vidět i editovat bak. účty ESU
		*/
		gin_esu_buedit?: number|null;
		/**GIN ESU - předplnění typu organizace pro typ ESU právnická osoba
		*     Hodnotou parametru je číslo odpovídající typu organizace (v ADM - Subjekty - typy organizací). Např. 30 práv. osoba - nespecif. Prázdná hodnota parametru znamená původní chování.
		*/
		gin_esu_predpto?: string|null;
		/**GIN ESU - předplňovat pole obec
		*     Parametr určuje, zda se bude uživateli předplňovat políčko obec hodnotou z políčka pošta (na detailu externího subjektu při jeho zadání nebo opravě).
		*     0 - NEPolíčko obec se nebude předplňovat, 1 - ANOPolíčko obec se bude předplňovat (v případě že uživatel vyplnil poštu a obec ještě není vyplněná).
		*/
		gin_esu_obecpre?: boolean|null;
		/**GIN ESU - Při ověření dat v seznamu subjektů z IS Triáda zobrazit přebírací okno.
		*     0 - Ne, 1 - Ano, 2 - Ne - pouze ladící hlášku.
		*/
		gin_esuovertrio?: number|null;
		/**GIN ESU - při výběru primárně nabízet vlastní externí subjekty
		*     Při výběru (ve výběrovém okně ESU) primárně nabízet vlastní (oblíbené) externí subjekty.
		*     0 - Původní chováníAplikace se budou chovat tak, jako ve verzi modulů 346 (a starších), 1 - ANO, 2 - NE
		*/
		gin_esu_nabvla?: number|null;
		/**GIN ESU - Rozšířená kontrola bankovního účtu (pobočka banky musí mít vyplněn BIC kód)
		*     Rozšířená kontrola bankovního účtu - při zadání - použitá pobočka banky musí mít vyplněn BIC kód
		*     0 - Ne, 1 - Ano - varování - uživateli je zobrazeno varování, 2 - Ano - uživatel nemůže uložit bankovní účet nebo provést platbu pokud kontrola není splněna.
		*/
		gin_esu_bubikon?: number|null;
		/**PAM ŘP RV - kontrola při zakládání zaměstanance
		*     0 - Ne, 1 - Pokud se uživatel pokouší založit externí subjekt se stejný rodným nebo osobním číslem je hlášeno varování. Po potvrzení lze uložit.
		*     2 - Při zapnutí této kontroly nelze uložit externí subjekt, který má shodné rodné číslo (nebo osobní číslo) jako již vytvořený zaměstnanec
		*/
		pam_rad_testesu?: number|null;
		/**GIN ESU - Rozšířená kontrola bankovního účtu v cizí měně pro banky ČR (modulo 11) - při vytváření bankovního účtu. Pouze varování - při vytvoření účtu v cizí měně u banky se sídlem v ČR.
		*     0 - Ne Bez rozšířené kontroly, 1 - Ano - VarováníS rozšířenou kontrolou, 2 - Ano S rozšířenou kontrolou - uživateli nebude mít možnost účet nesplňující tuto kontrolu uložit.
		*/
		gin_esu_burkon?: number|null;
		/**GIN ESU - ŘP Oprava (a vytvoření) zástupných osob externího subjektu
		*     Určuje, zda uživatel může vytvářet a editovat zástupné osoby.
		*     0 - Ne Uživatel nemá právo vytvářet ani opravovat, 1 - Ano Uživatel má právo vytvářet a opravovat, 2 - Ano - jenom pro ZO ze stejného SU.Uživatel má právo vytvářet a opravovat zástupné osoby, vytvořené nebo opravené uživatelem ze stejného spisového uzlu.
		*/
		gin_esu_oprazo?: number|null;
		/**GIN ESU - ŘP Oprava (a vytvoření) zástupných osob ext.subj. i když uživatel nemá oprávnění editovat ESU - používá KVOP
		*     Určuje, zda uživatel může vytvářet a editovat zástupné osoby.
		*     0 - Ne, 1 - Ano
		*/
		gin_esu_oprazox?: number|null;
		/**GIN ESU - ŘP Oprava a vytvoření PSČ (povolení) (od 356)*/
		gin_esu_rppsc?: boolean|null;
		/**GIN ESU - ŘP Vytvoření banky
		*     Parametr umožňuje nastavit, zda má uživatel právo vytvořit ESU typu banka.
		*/
		gin_esu_rp_bann?: boolean|null;
		/**GIN ESU - ŘP Zákaz editace typů organizací dle výčtu
		*     Parametr umožňuje nastavit, zda má uživatel právo vytvořit ESU typu banka.
		*/
		gin_esu_rp_zety?: string|null;
		/**GIN ESU - ŘP Zákaz vytvoření typů organizací dle výčtu
		*     Parametr umožňuje nastavit, zda má uživatel právo vytvořit ESU typu banka.
		*/
		gin_esu_rp_zvty?: string|null;
		/**GIN ESU - ŘP Oprava banky
		*     Parametr umožňuje nastavit, zda má uživatel právo editovat ESU typu banka.
		*/
		gin_esu_rp_ban?: boolean|null;
		/**GIN ESU - ŘP Oprava externího subjektu.
		*     Určuje zda uživatel může opravovat externí subjekty.
		*/
		ssl_opra_esu?: boolean|null;
		/**GIN ESU - ŘP Oprava zásilkové adresy externího subjektu
		*     Povolení editace zásilkové adresy externího subjektu či zástupné osoby z detailu externího subjektu a okna pro editaci zásilkové adresy u zásilky.
		*     Pro detail ESU má povolení tohoto parametru smysl v případě, že uživatel nemá povolenu opravu ESU.
		*     0 - Zakázáno Editace zásilkové adresy na externím subjektu je zakázána, 1 - Povoleno Editace zásilkové adresy na externím subjektu je povolena
		*/
		ssl_rp_esu_obal?: boolean|null;
		/**GIN ESU - ŘP Povolení editace tvarů jmen a příjmení*/
		gin_esu_edprijm?: boolean|null;
		/**GIN ESU - povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)*/
		gin_esu_zatypad?: boolean|null;
		/**GIN ESU - povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)*/
		gin_esu_zatypad_volnyRezim?: boolean|null;
		/**GIN ESU - povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)*/
		gin_esu_zatypad_striktniRezim?: boolean|null;
		/**GIN ESU - povolení práce s typem adresy - kontaktní*/
		gin_esu_zatypak?: boolean|null;
		/**GIN ESU - ŘP Vytvoření externího subjektu
		*     Parametr určuje, zda je možné vytvářet externí subjekty.
		*/
		gin_esu_rp_new?: boolean|null;
		/**GIN ESU - ŘP Změna aktivity externího subjektu.
		*     Umožňuje nastavit, zda uživatel může měnit aktivitu ESU.
		*/
		gin_esu_rp_akt?: boolean|null;
		/**GIN ESU - Úroveň přístupu - povolení vytvořit shodný ESU v případě, že již existuje v jiné úrovni přístupu.
		*     Pokud uživatel zadá při vytvoření nového ESU subjekt přesně tak, jak již je pořízen v databázi (i když třeba s úrovní přístupu, kterou nemá uživatel oprávnění vidět) pak dle nastavení tohoto parametru
		*     a) je buď updatována hodnota ur_pri na již existujícím ESU (v případě, že je parametr nastaven na hodnotu ANO)
		*     b) je vytvořen nový záznam v ESU (v případě, že je parametr nastaven na hodnotu NE).
		*     
		*     0 Ne - nový záznam se nebude vytvářet. Bude se updatovat úroveň přístupu. Výchozí chování.
		*     1 Ano - nový záznam se bude vytvářet i když v DB existuje shodný ESU s jinou úrovní přístupu.
		*/
		gin_rad_esusv?: boolean|null;
		/**GIN ESU - Úroveň přístupu k externím subjektům (editace) - výčet číselných hodnot oddělených čárkami (např. 1,2,5).
		*     Uživatel může editovat, nebo vytvářet ESU s těmito hodnotami úrovně přístupu.
		*     Pokud je nastaven tento parametr a není nastaven parametr:
		*     GIN ESU - Úroveň přístupu k externím subjektům (výběr, prohlížení),
		*     použije se hodnota z tohoto parametru i pro výběr nebo prohlížení ESU.
		*     
		*     Pomocí parametrů lze nastavit, že uživatel vidí nějakou množinu ESU a opravovat nebo vytvářet může pouze podmnožinu z této množiny.
		*     (Např. vidí ESU s úrovní 1,2,3, ale opravovat nebo vytvářet může ESU s úrovní přístupu 3)
		*/
		gin_rad_esusa?: string|null;
		/**GIN ESU - Úroveň přístupu k externím subjektům (výběr, prohlížení) - výčet číselných hodnot oddělených čárkami (např. 1,2,5).
		*     Uživatel může vybírat nebo prohlížet ESU s těmito hodnotami úrovně přístupu.
		*     Pokud není tento parametr a je nastaven parametr:
		*     GIN ESU - Úroveň přístupu k externím subjektům (editace),
		*     použije se hodnota z tohoto parametru i pro výběr nebo prohlížení ESU.
		*     
		*     Pomocí parametrů lze nastavit, že uživatel vidí nějakou množinu ESU a opravovat nebo vytvářet může pouze podmnožinu z této množiny.
		*     (Např. vidí ESU s úrovní 1,2,3, ale opravovat nebo vytvářet může ESU s úrovní přístupu 3)
		*/
		gin_rad_esusap?: string|null;
		/**GIN ESU - Úroveň přístupu k zástupným osobám externím subjektů (nový, editace).
		*     Obdoba parametrů pro ESU - GIN ESU - Úroveň přístupu k externím subjektům, ... .
		*/
		gin_rad_esusazo?: string|null;
		/**GIN ESU - Úroveň přístupu k externím subjektům - nový (předplnění úrovně přístupu při vytvoření ESU)*/
		gin_esu_urprnp?: string|null;
		/**GIN ESU - výběrové okno ESU - max. počet zobrazitelných záznamů (pouze LK, od 354)*/
		gin_esu_vybpoc?: string|null;
		/**GIN ESU - vyhledávat dle datumu narození
		*     Parametr určuje, zda bude mít uživatel možnost vyhledávat externí subjekty dle datumu narození.
		*/
		gin_esu_dnvyhl?: boolean|null;
		/**GIN ESU - vyhledávat dle RČ
		*     Parametr určuje, zda bude mít uživatel možnost vyhledávat externí subjekty dle rodného čísla.
		*/
		gin_esu_rcvyhl?: boolean|null;
		/**GIN ESU - Zobrazení rozšířených informací ve výběrovém okně ESU - obálk. adresa, ... (tooltipy) (356).
		*     Nastavení tohoto parametru na Ano může mít mírný vliv na zatížení serveru - na klientské počítače se dotahuje více dat.
		*/
		gin_esu_vybroi?: boolean|null;
		/**GIN ISZR - Povolit práci se systémem základních registrů*/
		gin_iszr_povole?: boolean|null;
		/**GIN ESU - stupně verifikace ESU umožňující evidenci s varováním (ISZR, ... )
		*     Aplikace při evidenci (či odpovídající jiné operaci) provede kontrolu stupně verifikace evidovaného ESU a v případě, že je stupeň verifikace ESU obsažen v hodnotě parametru, upozornií uživatele a umožní evidenci (umožní pokračování v práci). Pokud je parametr prázdný, tak neupozorňovat vůbec (default).
		*/
		gin_esu_iszrvar?: string|null;
		/**GIN ESU - stupně verifikace ESU neumožňující evidenci (ISZR)
		*     Aplikace při evidenci (či odpovídající jiné operaci) provede kontrolu stupně verifikace evidovaného ESU a v případě, že je stupeň verifikace ESU obsažen v hodnotě parametru, upozorní uživatelea neumožní evidenci (zabrání pokračování v práci). Pokud je parametr prázdný, neblokovat (default).
		*/
		gin_esu_iszrblo?: string|null;
		/**GIN ESU/ISZR - Zobrazení informací o ověření v SZR v seznamu externích subjektů (podbarvení, stupeň*/
		gin_iszr_zostv?: boolean|null;
		/**GIN ESU - zobrazovat datum narození
		*     Parametr určuje, zda se bude zobrazovat datum narození v detailu externího subjektu a v seznamech ve výběrovém okně externích subjektů.
		*/
		gin_esu_dnzobr?: boolean|null;
		/**GIN ESU - zobrazovat RČ
		*     Parametr určuje, zda se bude zobrazovat rodné číslo v detailu externího subjektu a v seznamech ve výběrovém okně externích subjektů.
		*/
		gin_esu_rczobr?: boolean|null;
		/**GIN ESU - povolení zadat RČ na detailu ESU
		*     Tímto parametrem lze úplně vypnout možnost práce s RČ.
		*/
		gin_esu_rczadat?: boolean|null;
		/**GIN ESU - povolení zadávat nenumerické znaky do RČ
		*     doporučujeme mít tento parametr nastaven na hodnotu NE.
		*/
		gin_esu_rcnenum?: boolean|null;
		/**GIN ESU - zobrazovat typ organizace na detailu
		*     Parametr určuje, zda se má zobrazovat typ organizace na detailu externího subjektu (při zadání).
		*/
		gin_esu_torg?: boolean|null;
		/**GIN - ŘP Přístup k datům UIR
		*     Povolení přístupu k datům UIR.
		*/
		gin_rad_uir?: boolean|null;
		/**GIN - ŘP Přístup k datům ROB
		*     Povolení přístupu k datům ROB - registru obyvatel (pomocí parametru lze např. v SSL nastavit, zda bude viditelné tlačítko ROB na kartě externího subjektu s možností zobrazení, případně vytvoření vazby na ROB).
		*/
		gin_rad_rob?: boolean|null;
		/**GIN ESU - Povolení ručně zadat id datové schránky na detailu ESU (hned po zadání bude ověřeno vISDS)
		*     Povolení ručně zadat id datové schránky na detailu ESU (hned po zadání bude ověřeno v ISDS)
		*/
		gin_esu_isds_id?: boolean|null;
		/**GIN ESU - povolení odstranit vazbu na datovou schránku ISDS z externího subjektu
		*     Pozor jde o citlivou věc - odstranění vazby by měl provádět pouze administrátor na žádost běžných uživatelů.
		*/
		gin_esu_isdsods?: boolean|null;
		/**GIN ISDS - povolení práce s datovými schránkami (odeslání, příjem, ověření ESU, ... )
		*     Při přepnutí parametru budete informováni, zda je podpora práce s DS již plnohodnotná.
		*/
		gin_ssl_datschr?: boolean|null;
		/**GIN GEX - povolení práce s Gordic exchange (odeslání, příjem, ověření ESU, ... )*/
		gin_gex_povolen?: boolean|null;
		/**GIN ESU - Ověřovat ESU v ISDS (systému datových schránek) pro fyzickou osobu dle položek (DS, 360)*/
		gin_esu_isdsof?: string|null;
		/**GIN ESU - Ověřovat ESU v ISDS (systému datových schránek) pro právnickou osobu dle položek (DS, 360)*/
		gin_esu_isdsop?: string|null;
		/**GIN ESU - Ověřovat ESU v ISDS (systému datových schránek) pro typ neurčeno dle položek (DS, 360)*/
		gin_esu_isdson?: string|null;
		/**GIN ESU - zobrazovat čísla osobních dokladů na detailu ESU*/
		gin_esu_pcisdok?: boolean|null;
		/**GIN ESU - možnost editovat čísla osobních dokladů na detailu ESU*/
		gin_esu_ecisdok?: boolean|null;
		/**GIN ESU - vyhledávat dle čísla osobního dokladu OP, PAS, ... - povoluje vyhledávání v kartotéce dle jmenovaného údaje. Prozatím pouze pro moduly SSL.*/
		gin_esu_hcisdok?: boolean|null;
		/**GIN ESU - používat pole OČ (osobní číslo)*/
		gin_esu_pouoc?: boolean|null;
		/**GIN ESU - úroveň přístupu pro možnost ověření/převzetí údajů z ISDS pro uživ. bez oprávnění editovat*/
		gin_esu_isdsupr?: string|null;
		/**GIN ESU - zobrazovat stav insolvence (seznam a detail ESU)*/
		gin_esu_inzobr?: boolean|null;
		/**GIN ESU - povinnost vyplnění Datumu narození u fyzické osoby(při vytvoření a editaci ESU)*/
		gin_esu_dnpov?: boolean|null;
		/**GIN ESU - zobrazovat datum narození
		*     Parametr určuje, zda se bude zobrazovat rodné přijmení a místo narození v detailu externího subjektu a v seznamech ve výběrovém okně externích subjektů.
		*/
		gin_esu_mnzobr?: boolean|null;
		/**GIN ISZR - Úroveň přístupu ESU převzatých z ROS
		*     Je třeba i příslušně upravit parametry GIN ESU - úroveň přístupu * pro editaci a prohlížení ESU(tak aby měl uživatel oprávnění převzatá data z ROS uložit).
		*/
		gin_iszr_urprio?: string|null;
		/**GIN ESU
		*     GIN ESU - Povolení odstranit bankovní účet. Pro povolení odstranění účtů musí mít uživatel povolen i parametr GIN ESU - Práce s bankovními účty (viditelnost, editovatelnost).   NE / ANO vytvořený funkčním místem / Ano vytvořený stejným spisovým uzlem /Ano - všechny
		*/
		gin_esu_buods?: number|null;
		/**GIN ESU/ISZR – Převzetí právní formy z ROS(přednastaví se typ organizace).
		*     V číselníku právních forem(ADM-ISZR-Právní formy organizace) lze nastavit, jaký typ organizace přísluší ESU k právní formě.
		*     Pokud je toto správně zadministrováno pak se po ověření a převzetí dat z SZR-ROS přednastaví na ESU typ organizace.
		*/
		gin_iszr_esuprf?: number|null;
		/**GIN ESU/ISZR - Zobrazení rozšířených informací o ověření v SZR v seznamu externích subjektů
		*     Parametrem lze zapnout indikaci, zda ověření proběhlo ve stejné agendě a zda již není starší než 24h.
		*/
		gin_iszr_rozin?: boolean|null;
		/**GIN ESU - používat pole matriční identita(matriční jméno, matriční příjmení)*/
		gin_esu_poumid?: boolean|null;
		/**GIN ESU - název pole OČ (osobní číslo) na detailu a v seznamu ESU*/
		gin_esu_ocnazev?: string|null;
		/**GIN ISZR - Povolit prohlížení informací získaných ze SZR (bez aktivního přístupu do SZR).
		*     Pokud je nastaven na ANO, je třeba mít zadministrovány všechny příslušné subjekty a vazby viz.dokumentace(agendy, role, ... ) aby bylo možné zíkat informaci o datumu ověření pro vybranou agendu SZR.
		*/
		gin_iszr_povopr?: boolean|null;
		/**GIN ESU - povolení zadat a editovat IČO na pobočce/adrese ESU*/
		gin_esu_pobico?: boolean|null;
		/**GIN ESU - používat pole DIČ*/
		gin_esu_poudi?: boolean|null;
		/**GIN ESU - používat pole GPS na detailu ESU*/
		gin_esu_pogps?: boolean|null;
		/**GIN ESU - používat pole pohlaví*/
		gin_esu_poupo?: boolean|null;
		/**GIN ESU - používat pole rodinný stav*/
		gin_esu_pours?: boolean|null;
		/**GIN ESU - používat pole URL na detailu ESU*/
		gin_esu_pourl?: boolean|null;
		/**Nadpis uživatelského sloupce*/
		gin_esuuzsl_en?: string|null;
		/**gin_esu_bizobr*/
		gin_esu_bizobr?: number|null;
		/**gin_esu_povpri*/
		gin_esu_povpri?: number|null;
		/**gin_upsr_povol*/
		gin_upsr_povol?: number|null;
		/**PrizIszr*/
		prizIszr?: boolean|null;
	}
	const enum GEsuParamsDtoNames { gin_esu_kondup = "gin_esu_kondup", gin_esu_duedit = "gin_esu_duedit", gin_esu_kontico = "gin_esu_kontico", gin_esu_povicop = "gin_esu_povicop", gin_esu_obaladr = "gin_esu_obaladr", gin_esu_uir_new = "gin_esu_uir_new", gin_esu_stavneu = "gin_esu_stavneu", gin_esu_pdicdph = "gin_esu_pdicdph", gin_esu_povvpsc = "gin_esu_povvpsc", gin_esu_rozsu = "gin_esu_rozsu", gin_esu_overtri = "gin_esu_overtri", gin_rad_esuppa = "gin_rad_esuppa", gin_esu_buedit = "gin_esu_buedit", gin_esu_predpto = "gin_esu_predpto", gin_esu_obecpre = "gin_esu_obecpre", gin_esuovertrio = "gin_esuovertrio", gin_esu_nabvla = "gin_esu_nabvla", gin_esu_bubikon = "gin_esu_bubikon", pam_rad_testesu = "pam_rad_testesu", gin_esu_burkon = "gin_esu_burkon", gin_esu_oprazo = "gin_esu_oprazo", gin_esu_oprazox = "gin_esu_oprazox", gin_esu_rppsc = "gin_esu_rppsc", gin_esu_rp_bann = "gin_esu_rp_bann", gin_esu_rp_zety = "gin_esu_rp_zety", gin_esu_rp_zvty = "gin_esu_rp_zvty", gin_esu_rp_ban = "gin_esu_rp_ban", ssl_opra_esu = "ssl_opra_esu", ssl_rp_esu_obal = "ssl_rp_esu_obal", gin_esu_edprijm = "gin_esu_edprijm", gin_esu_zatypad = "gin_esu_zatypad", gin_esu_zatypad_volnyRezim = "gin_esu_zatypad_volnyRezim", gin_esu_zatypad_striktniRezim = "gin_esu_zatypad_striktniRezim", gin_esu_zatypak = "gin_esu_zatypak", gin_esu_rp_new = "gin_esu_rp_new", gin_esu_rp_akt = "gin_esu_rp_akt", gin_rad_esusv = "gin_rad_esusv", gin_rad_esusa = "gin_rad_esusa", gin_rad_esusap = "gin_rad_esusap", gin_rad_esusazo = "gin_rad_esusazo", gin_esu_urprnp = "gin_esu_urprnp", gin_esu_vybpoc = "gin_esu_vybpoc", gin_esu_dnvyhl = "gin_esu_dnvyhl", gin_esu_rcvyhl = "gin_esu_rcvyhl", gin_esu_vybroi = "gin_esu_vybroi", gin_iszr_povole = "gin_iszr_povole", gin_esu_iszrvar = "gin_esu_iszrvar", gin_esu_iszrblo = "gin_esu_iszrblo", gin_iszr_zostv = "gin_iszr_zostv", gin_esu_dnzobr = "gin_esu_dnzobr", gin_esu_rczobr = "gin_esu_rczobr", gin_esu_rczadat = "gin_esu_rczadat", gin_esu_rcnenum = "gin_esu_rcnenum", gin_esu_torg = "gin_esu_torg", gin_rad_uir = "gin_rad_uir", gin_rad_rob = "gin_rad_rob", gin_esu_isds_id = "gin_esu_isds_id", gin_esu_isdsods = "gin_esu_isdsods", gin_ssl_datschr = "gin_ssl_datschr", gin_gex_povolen = "gin_gex_povolen", gin_esu_isdsof = "gin_esu_isdsof", gin_esu_isdsop = "gin_esu_isdsop", gin_esu_isdson = "gin_esu_isdson", gin_esu_pcisdok = "gin_esu_pcisdok", gin_esu_ecisdok = "gin_esu_ecisdok", gin_esu_hcisdok = "gin_esu_hcisdok", gin_esu_pouoc = "gin_esu_pouoc", gin_esu_isdsupr = "gin_esu_isdsupr", gin_esu_inzobr = "gin_esu_inzobr", gin_esu_dnpov = "gin_esu_dnpov", gin_esu_mnzobr = "gin_esu_mnzobr", gin_iszr_urprio = "gin_iszr_urprio", gin_esu_buods = "gin_esu_buods", gin_iszr_esuprf = "gin_iszr_esuprf", gin_iszr_rozin = "gin_iszr_rozin", gin_esu_poumid = "gin_esu_poumid", gin_esu_ocnazev = "gin_esu_ocnazev", gin_iszr_povopr = "gin_iszr_povopr", gin_esu_pobico = "gin_esu_pobico", gin_esu_poudi = "gin_esu_poudi", gin_esu_pogps = "gin_esu_pogps", gin_esu_poupo = "gin_esu_poupo", gin_esu_pours = "gin_esu_pours", gin_esu_pourl = "gin_esu_pourl", gin_esuuzsl_en = "gin_esuuzsl_en", gin_esu_bizobr = "gin_esu_bizobr", gin_esu_povpri = "gin_esu_povpri", gin_upsr_povol = "gin_upsr_povol", prizIszr = "prizIszr",}
	const enum GEsuParamsDtoFragments { gin_esu_kondup = "*", gin_esu_duedit = "*", gin_esu_kontico = "*", gin_esu_povicop = "*", gin_esu_obaladr = "*", gin_esu_uir_new = "*", gin_esu_stavneu = "*", gin_esu_pdicdph = "*", gin_esu_povvpsc = "*", gin_esu_rozsu = "*", gin_esu_overtri = "*", gin_rad_esuppa = "*", gin_esu_buedit = "*", gin_esu_predpto = "*", gin_esu_obecpre = "*", gin_esuovertrio = "*", gin_esu_nabvla = "*", gin_esu_bubikon = "*", pam_rad_testesu = "*", gin_esu_burkon = "*", gin_esu_oprazo = "*", gin_esu_oprazox = "*", gin_esu_rppsc = "*", gin_esu_rp_bann = "*", gin_esu_rp_zety = "*", gin_esu_rp_zvty = "*", gin_esu_rp_ban = "*", ssl_opra_esu = "*", ssl_rp_esu_obal = "*", gin_esu_edprijm = "*", gin_esu_zatypad = "*", gin_esu_zatypad_volnyRezim = "*", gin_esu_zatypad_striktniRezim = "*", gin_esu_zatypak = "*", gin_esu_rp_new = "*", gin_esu_rp_akt = "*", gin_rad_esusv = "*", gin_rad_esusa = "*", gin_rad_esusap = "*", gin_rad_esusazo = "*", gin_esu_urprnp = "*", gin_esu_vybpoc = "*", gin_esu_dnvyhl = "*", gin_esu_rcvyhl = "*", gin_esu_vybroi = "*", gin_iszr_povole = "*", gin_esu_iszrvar = "*", gin_esu_iszrblo = "*", gin_iszr_zostv = "*", gin_esu_dnzobr = "*", gin_esu_rczobr = "*", gin_esu_rczadat = "*", gin_esu_rcnenum = "*", gin_esu_torg = "*", gin_rad_uir = "*", gin_rad_rob = "*", gin_esu_isds_id = "*", gin_esu_isdsods = "*", gin_ssl_datschr = "*", gin_gex_povolen = "*", gin_esu_isdsof = "*", gin_esu_isdsop = "*", gin_esu_isdson = "*", gin_esu_pcisdok = "*", gin_esu_ecisdok = "*", gin_esu_hcisdok = "*", gin_esu_pouoc = "*", gin_esu_isdsupr = "*", gin_esu_inzobr = "*", gin_esu_dnpov = "*", gin_esu_mnzobr = "*", gin_iszr_urprio = "*", gin_esu_buods = "*", gin_iszr_esuprf = "*", gin_iszr_rozin = "*", gin_esu_poumid = "*", gin_esu_ocnazev = "*", gin_iszr_povopr = "*", gin_esu_pobico = "*", gin_esu_poudi = "*", gin_esu_pogps = "*", gin_esu_poupo = "*", gin_esu_pours = "*", gin_esu_pourl = "*", gin_esuuzsl_en = "*", gin_esu_bizobr = "*", gin_esu_povpri = "*", gin_upsr_povol = "*", prizIszr = "*",}
	const enum GEsuParamsDtoTypes { gin_esu_kondup = "string", gin_esu_duedit = "number", gin_esu_kontico = "Gordic.Esu.WebClient.KontIco", gin_esu_povicop = "number", gin_esu_obaladr = "boolean", gin_esu_uir_new = "boolean", gin_esu_stavneu = "boolean", gin_esu_pdicdph = "boolean", gin_esu_povvpsc = "boolean", gin_esu_rozsu = "boolean", gin_esu_overtri = "number", gin_rad_esuppa = "boolean", gin_esu_buedit = "number", gin_esu_predpto = "string", gin_esu_obecpre = "boolean", gin_esuovertrio = "number", gin_esu_nabvla = "number", gin_esu_bubikon = "number", pam_rad_testesu = "number", gin_esu_burkon = "number", gin_esu_oprazo = "number", gin_esu_oprazox = "number", gin_esu_rppsc = "boolean", gin_esu_rp_bann = "boolean", gin_esu_rp_zety = "string", gin_esu_rp_zvty = "string", gin_esu_rp_ban = "boolean", ssl_opra_esu = "boolean", ssl_rp_esu_obal = "boolean", gin_esu_edprijm = "boolean", gin_esu_zatypad = "boolean", gin_esu_zatypad_volnyRezim = "boolean", gin_esu_zatypad_striktniRezim = "boolean", gin_esu_zatypak = "boolean", gin_esu_rp_new = "boolean", gin_esu_rp_akt = "boolean", gin_rad_esusv = "boolean", gin_rad_esusa = "string", gin_rad_esusap = "string", gin_rad_esusazo = "string", gin_esu_urprnp = "string", gin_esu_vybpoc = "string", gin_esu_dnvyhl = "boolean", gin_esu_rcvyhl = "boolean", gin_esu_vybroi = "boolean", gin_iszr_povole = "boolean", gin_esu_iszrvar = "string", gin_esu_iszrblo = "string", gin_iszr_zostv = "boolean", gin_esu_dnzobr = "boolean", gin_esu_rczobr = "boolean", gin_esu_rczadat = "boolean", gin_esu_rcnenum = "boolean", gin_esu_torg = "boolean", gin_rad_uir = "boolean", gin_rad_rob = "boolean", gin_esu_isds_id = "boolean", gin_esu_isdsods = "boolean", gin_ssl_datschr = "boolean", gin_gex_povolen = "boolean", gin_esu_isdsof = "string", gin_esu_isdsop = "string", gin_esu_isdson = "string", gin_esu_pcisdok = "boolean", gin_esu_ecisdok = "boolean", gin_esu_hcisdok = "boolean", gin_esu_pouoc = "boolean", gin_esu_isdsupr = "string", gin_esu_inzobr = "boolean", gin_esu_dnpov = "boolean", gin_esu_mnzobr = "boolean", gin_iszr_urprio = "string", gin_esu_buods = "number", gin_iszr_esuprf = "number", gin_iszr_rozin = "boolean", gin_esu_poumid = "boolean", gin_esu_ocnazev = "string", gin_iszr_povopr = "boolean", gin_esu_pobico = "boolean", gin_esu_poudi = "boolean", gin_esu_pogps = "boolean", gin_esu_poupo = "boolean", gin_esu_pours = "boolean", gin_esu_pourl = "boolean", gin_esuuzsl_en = "string", gin_esu_bizobr = "number", gin_esu_povpri = "number", gin_upsr_povol = "number", prizIszr = "boolean",}
	const enum GEsuParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GInfoNespPlatceDphDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto pro práci s dialogem nespolehlivého plátce*/
	interface GInfoNespPlatceDphDto {
		/**Nespolehlivý plátce kolonka*/
		nespolehlivyPlatce?: string|null;
		/**Zpráva stavu kontroly*/
		datZver?: JsonDate|null;
		/**starý název ikonky*/
		imgStaryNazev?: string|null;
		/**starý název ikonky*/
		dic?: string|null;
		/**starý název ikonky*/
		nazev?: string|null;
	}
	const enum GInfoNespPlatceDphDtoNames { nespolehlivyPlatce = "nespolehlivyPlatce", datZver = "datZver", imgStaryNazev = "imgStaryNazev", dic = "dic", nazev = "nazev",}
	const enum GInfoNespPlatceDphDtoFragments { nespolehlivyPlatce = "*", datZver = "*", imgStaryNazev = "*", dic = "*", nazev = "*",}
	const enum GInfoNespPlatceDphDtoTypes { nespolehlivyPlatce = "string", datZver = "JsonDate", imgStaryNazev = "string", dic = "string", nazev = "string",}
	const enum GInfoNespPlatceDphDtoTypeLengths {}
	/**Dto pro práci s dialogem nespolehlivého plátce*/
	interface GAktualizaceNespPlatceDphDto {
		/**Nespolehlivý plátce kolonka*/
		dtoInfo?: Gordic.Esu.WebClient.GInfoNespPlatceDphDto|null;
		/**Zpráva stavu kontroly*/
		listDtoDoGridu?: Gordic.Esu.WebClient.GEkosducDto[]|null;
	}
	const enum GAktualizaceNespPlatceDphDtoNames { dtoInfo = "dtoInfo", listDtoDoGridu = "listDtoDoGridu",}
	const enum GAktualizaceNespPlatceDphDtoFragments { dtoInfo = "*", listDtoDoGridu = "*",}
	const enum GAktualizaceNespPlatceDphDtoTypes { dtoInfo = "Gordic.Esu.WebClient.GInfoNespPlatceDphDto", listDtoDoGridu = "Gordic.Esu.WebClient.GEkosducDto[]",}
	const enum GAktualizaceNespPlatceDphDtoTypeLengths {}
	/**Dto pro práci s dialogem nespolehlivého plátce*/
	interface GEkosducDto {
		/**Autogenerated.*/
		dic_cz?: JsonDecimal|null;
		/**Autogenerated.*/
		bu_txt?: string|null;
		/**Autogenerated.*/
		bu_ci?: string|null;
		/**Autogenerated.*/
		sk_ci?: string|null;
		/**Autogenerated.*/
		typ_zver_uctu?: number|null;
		/**Autogenerated.*/
		typ_zver_uctu_txt?: string|null;
		/**Autogenerated.*/
		dat_zverejneni_od?: JsonDate|null;
		/**Autogenerated.*/
		dat_zverejneni_do?: JsonDate|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmenu_prov_rf?: string|null;
	}
	const enum GEkosducDtoNames { dic_cz = "dic_cz", bu_txt = "bu_txt", bu_ci = "bu_ci", sk_ci = "sk_ci", typ_zver_uctu = "typ_zver_uctu", typ_zver_uctu_txt = "typ_zver_uctu_txt", dat_zverejneni_od = "dat_zverejneni_od", dat_zverejneni_do = "dat_zverejneni_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_rf = "zmenu_prov_rf",}
	const enum GEkosducDtoFragments { dic_cz = "*", bu_txt = "*", bu_ci = "*", sk_ci = "*", typ_zver_uctu = "*", typ_zver_uctu_txt = "*", dat_zverejneni_od = "*", dat_zverejneni_do = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_rf = "*",}
	const enum GEkosducDtoTypes { dic_cz = "JsonDecimal", bu_txt = "string", bu_ci = "string", sk_ci = "string", typ_zver_uctu = "number", typ_zver_uctu_txt = "string", dat_zverejneni_od = "JsonDate", dat_zverejneni_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_rf = "string",}
	const enum GEkosducDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GKarotekaDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Kartoteka dto*/
	interface GKartotekaDto {
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_esu?: number|null;
		/**Autogenerated.*/
		typ_esu_txt?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		nazev_isds?: string|null;
		/**Autogenerated.*/
		ico_isds?: JsonDecimal|null;
		/**Autogenerated.*/
		zkratka?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		typ_org_txt?: string|null;
		/**Autogenerated.*/
		stupen_ver?: number|null;
		/**Autogenerated.*/
		stupen_ver_txt?: string|null;
		/**Autogenerated.*/
		stat?: number|null;
		/**Autogenerated.*/
		stat_txt?: string|null;
		/**Autogenerated.*/
		psc?: string|null;
		/**Autogenerated.*/
		obec?: string|null;
		/**Autogenerated.*/
		cast_obce?: string|null;
		/**Autogenerated.*/
		ulice?: string|null;
		/**Autogenerated.*/
		cor?: string|null;
		/**Autogenerated.*/
		cpop?: string|null;
		/**Autogenerated.*/
		adresa_kod?: string|null;
		/**Autogenerated.*/
		pobox?: string|null;
		/**Autogenerated.*/
		tel?: string|null;
		/**Autogenerated.*/
		mail?: string|null;
		/**Autogenerated.*/
		fax?: string|null;
		/**Autogenerated.*/
		ob_jmeno?: string|null;
		/**Autogenerated.*/
		typ_org?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		ico?: string|null;
		/**Autogenerated.*/
		dic?: string|null;
		/**Autogenerated.*/
		rc?: string|null;
		/**Autogenerated.*/
		jmeno?: string|null;
		/**Autogenerated.*/
		prijmeni?: string|null;
		/**Autogenerated.*/
		tit_pred?: string|null;
		/**Autogenerated.*/
		tit_za?: string|null;
		/**Autogenerated.*/
		esu_txt?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		dat_mpd?: JsonDate|null;
		/**Autogenerated.*/
		cnt_zo?: JsonDecimal|null;
		/**Autogenerated.*/
		dat_nar?: JsonDate|null;
		/**Autogenerated.*/
		dat_umrti?: JsonDate|null;
		/**Autogenerated.*/
		url?: string|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmenu_prov_rf?: string|null;
		/**Autogenerated.*/
		revize?: string|null;
		/**Autogenerated.*/
		dat_akt_rob?: JsonDate|null;
		/**Autogenerated.*/
		dat_akt_ros?: JsonDate|null;
		/**Autogenerated.*/
		prihlaseni_zmen_rob?: number|null;
		/**Autogenerated.*/
		typ_upadku_txt?: string|null;
		/**Autogenerated.*/
		ur_pri?: number|null;
		/**Autogenerated.*/
		poc_adres?: JsonDecimal|null;
		/**Autogenerated.*/
		poc_doruc?: JsonDecimal|null;
		/**Autogenerated.*/
		bu_exist?: JsonDecimal|null;
		/**Autogenerated.*/
		ixs_nad?: string|null;
		/**Autogenerated.*/
		ixs_prev?: string|null;
		/**Autogenerated.*/
		ixs_eko?: string|null;
		/**Autogenerated.*/
		ixs_eko2?: string|null;
		/**Autogenerated.*/
		nazev_tooltip?: string|null;
		/**Autogenerated.*/
		adresa_tooltip?: string|null;
		/**Autogenerated.*/
		st0?: string|null;
		/**Autogenerated.*/
		st1?: string|null;
		/**Autogenerated.*/
		st2?: string|null;
		/**Autogenerated.*/
		st3?: string|null;
		/**Autogenerated.*/
		st4?: string|null;
		/**Autogenerated.*/
		st5?: string|null;
		/**Autogenerated.*/
		st6?: string|null;
		/**Autogenerated.*/
		st7?: string|null;
		/**Autogenerated.*/
		typ_upadku?: number|null;
		/**Autogenerated.*/
		typ_adr?: number|null;
		/**Autogenerated.*/
		oc?: string|null;
		/**Autogenerated.*/
		typ_adr_txt?: string|null;
		/**Autogenerated.*/
		id_ds?: string|null;
		/**Autogenerated.*/
		id_eu?: string|null;
		/**Autogenerated.*/
		id_gex?: string|null;
		/**Autogenerated.*/
		dat_akt_info_o_ds?: JsonDate|null;
		/**Autogenerated.*/
		dbstatus?: string|null;
		/**Autogenerated.*/
		druh_stav_r_txt1?: string|null;
		/**Autogenerated.*/
		druh_stav_r_txt2?: string|null;
		/**Autogenerated.*/
		druh_stav_r_txt3?: string|null;
		/**Autogenerated.*/
		druh_stav_r_txt?: string|null;
		/**Autogenerated.*/
		mi_jmeno?: string|null;
		/**Autogenerated.*/
		mi_prijmeni?: string|null;
		/**Autogenerated.*/
		uziv_sl_e?: string|null;
		/**Autogenerated.*/
		ico_ds?: string|null;
		/**Autogenerated.*/
		pr_forma?: string|null;
		/**Autogenerated.*/
		pr_forma_ares?: string|null;
		/**Autogenerated.*/
		m_vyber?: number|null;
		/**Autogenerated.*/
		m_err?: string|null;
		/**Autogenerated.*/
		pocet_ixs_eko?: JsonDecimal|null;
		/**Autogenerated.*/
		pocet_ixs_prev?: JsonDecimal|null;
		/**Autogenerated.*/
		pocet_id_int?: JsonDecimal|null;
		/**Autogenerated.*/
		pocet_vaz_wfl?: JsonDecimal|null;
		/**Autogenerated.*/
		pocet_ext_uz?: JsonDecimal|null;
		/**Autogenerated.*/
		pocet_oso_uda?: JsonDecimal|null;
		/**Autogenerated.*/
		ixs_eko_nazev?: string|null;
		/**color*/
		color?: string|null;
		/**typ_txt*/
		typ_txt?: string|null;
		/**nazev_ext*/
		nazev_ext?: string|null;
		/**esu_txt_ext*/
		esu_txt_ext?: string|null;
		/**Autogenerated.*/
		lic?: string|null;
		/**Autogenerated.*/
		por_zast?: number|null;
		/**sk_edesk_id.*/
		sk_edesk_id?: string|null;
	}
	const enum GKartotekaDtoNames { ixs_esu = "ixs_esu", typ_esu = "typ_esu", typ_esu_txt = "typ_esu_txt", nazev = "nazev", nazev_isds = "nazev_isds", ico_isds = "ico_isds", zkratka = "zkratka", poznamka = "poznamka", typ_org_txt = "typ_org_txt", stupen_ver = "stupen_ver", stupen_ver_txt = "stupen_ver_txt", stat = "stat", stat_txt = "stat_txt", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", adresa_kod = "adresa_kod", pobox = "pobox", tel = "tel", mail = "mail", fax = "fax", ob_jmeno = "ob_jmeno", typ_org = "typ_org", aktivita = "aktivita", ico = "ico", dic = "dic", rc = "rc", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", esu_txt = "esu_txt", dat_zmena = "dat_zmena", dat_mpd = "dat_mpd", cnt_zo = "cnt_zo", dat_nar = "dat_nar", dat_umrti = "dat_umrti", url = "url", zmenu_prov = "zmenu_prov", zmenu_prov_rf = "zmenu_prov_rf", revize = "revize", dat_akt_rob = "dat_akt_rob", dat_akt_ros = "dat_akt_ros", prihlaseni_zmen_rob = "prihlaseni_zmen_rob", typ_upadku_txt = "typ_upadku_txt", ur_pri = "ur_pri", poc_adres = "poc_adres", poc_doruc = "poc_doruc", bu_exist = "bu_exist", ixs_nad = "ixs_nad", ixs_prev = "ixs_prev", ixs_eko = "ixs_eko", ixs_eko2 = "ixs_eko2", nazev_tooltip = "nazev_tooltip", adresa_tooltip = "adresa_tooltip", st0 = "st0", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", typ_upadku = "typ_upadku", typ_adr = "typ_adr", oc = "oc", typ_adr_txt = "typ_adr_txt", id_ds = "id_ds", id_eu = "id_eu", id_gex = "id_gex", dat_akt_info_o_ds = "dat_akt_info_o_ds", dbstatus = "dbstatus", druh_stav_r_txt1 = "druh_stav_r_txt1", druh_stav_r_txt2 = "druh_stav_r_txt2", druh_stav_r_txt3 = "druh_stav_r_txt3", druh_stav_r_txt = "druh_stav_r_txt", mi_jmeno = "mi_jmeno", mi_prijmeni = "mi_prijmeni", uziv_sl_e = "uziv_sl_e", ico_ds = "ico_ds", pr_forma = "pr_forma", pr_forma_ares = "pr_forma_ares", m_vyber = "m_vyber", m_err = "m_err", pocet_ixs_eko = "pocet_ixs_eko", pocet_ixs_prev = "pocet_ixs_prev", pocet_id_int = "pocet_id_int", pocet_vaz_wfl = "pocet_vaz_wfl", pocet_ext_uz = "pocet_ext_uz", pocet_oso_uda = "pocet_oso_uda", ixs_eko_nazev = "ixs_eko_nazev", color = "color", typ_txt = "typ_txt", nazev_ext = "nazev_ext", esu_txt_ext = "esu_txt_ext", lic = "lic", por_zast = "por_zast", sk_edesk_id = "sk_edesk_id",}
	const enum GKartotekaDtoFragments { ixs_esu = "*", typ_esu = "*", typ_esu_txt = "*", nazev = "*", nazev_isds = "*", ico_isds = "*", zkratka = "*", poznamka = "*", typ_org_txt = "*", stupen_ver = "*", stupen_ver_txt = "*", stat = "*", stat_txt = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", adresa_kod = "*", pobox = "*", tel = "*", mail = "*", fax = "*", ob_jmeno = "*", typ_org = "*", aktivita = "*", ico = "*", dic = "*", rc = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", esu_txt = "*", dat_zmena = "*", dat_mpd = "*", cnt_zo = "*", dat_nar = "*", dat_umrti = "*", url = "*", zmenu_prov = "*", zmenu_prov_rf = "*", revize = "*", dat_akt_rob = "*", dat_akt_ros = "*", prihlaseni_zmen_rob = "*", typ_upadku_txt = "*", ur_pri = "*", poc_adres = "*", poc_doruc = "*", bu_exist = "*", ixs_nad = "*", ixs_prev = "*", ixs_eko = "*", ixs_eko2 = "*", nazev_tooltip = "*", adresa_tooltip = "*", st0 = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", typ_upadku = "*", typ_adr = "*", oc = "*", typ_adr_txt = "*", id_ds = "*", id_eu = "*", id_gex = "*", dat_akt_info_o_ds = "*", dbstatus = "*", druh_stav_r_txt1 = "*", druh_stav_r_txt2 = "*", druh_stav_r_txt3 = "*", druh_stav_r_txt = "*", mi_jmeno = "*", mi_prijmeni = "*", uziv_sl_e = "*", ico_ds = "*", pr_forma = "*", pr_forma_ares = "*", m_vyber = "*", m_err = "*", pocet_ixs_eko = "*", pocet_ixs_prev = "*", pocet_id_int = "*", pocet_vaz_wfl = "*", pocet_ext_uz = "*", pocet_oso_uda = "*", ixs_eko_nazev = "*", color = "*", typ_txt = "*", nazev_ext = "*", esu_txt_ext = "*", lic = "*", por_zast = "*", sk_edesk_id = "*",}
	const enum GKartotekaDtoTypes { ixs_esu = "string", typ_esu = "number", typ_esu_txt = "string", nazev = "string", nazev_isds = "string", ico_isds = "JsonDecimal", zkratka = "string", poznamka = "string", typ_org_txt = "string", stupen_ver = "number", stupen_ver_txt = "string", stat = "number", stat_txt = "string", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", adresa_kod = "string", pobox = "string", tel = "string", mail = "string", fax = "string", ob_jmeno = "string", typ_org = "number", aktivita = "number", ico = "string", dic = "string", rc = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", esu_txt = "string", dat_zmena = "JsonDate", dat_mpd = "JsonDate", cnt_zo = "JsonDecimal", dat_nar = "JsonDate", dat_umrti = "JsonDate", url = "string", zmenu_prov = "string", zmenu_prov_rf = "string", revize = "string", dat_akt_rob = "JsonDate", dat_akt_ros = "JsonDate", prihlaseni_zmen_rob = "number", typ_upadku_txt = "string", ur_pri = "number", poc_adres = "JsonDecimal", poc_doruc = "JsonDecimal", bu_exist = "JsonDecimal", ixs_nad = "string", ixs_prev = "string", ixs_eko = "string", ixs_eko2 = "string", nazev_tooltip = "string", adresa_tooltip = "string", st0 = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", typ_upadku = "number", typ_adr = "number", oc = "string", typ_adr_txt = "string", id_ds = "string", id_eu = "string", id_gex = "string", dat_akt_info_o_ds = "JsonDate", dbstatus = "string", druh_stav_r_txt1 = "string", druh_stav_r_txt2 = "string", druh_stav_r_txt3 = "string", druh_stav_r_txt = "string", mi_jmeno = "string", mi_prijmeni = "string", uziv_sl_e = "string", ico_ds = "string", pr_forma = "string", pr_forma_ares = "string", m_vyber = "number", m_err = "string", pocet_ixs_eko = "JsonDecimal", pocet_ixs_prev = "JsonDecimal", pocet_id_int = "JsonDecimal", pocet_vaz_wfl = "JsonDecimal", pocet_ext_uz = "JsonDecimal", pocet_oso_uda = "JsonDecimal", ixs_eko_nazev = "string", color = "string", typ_txt = "string", nazev_ext = "string", esu_txt_ext = "string", lic = "string", por_zast = "number", sk_edesk_id = "string",}
	const enum GKartotekaDtoTypeLengths { ixs_esu = 12, typ_esu_txt = 254, nazev = 100, nazev_isds = 254, zkratka = 16, poznamka = 254, typ_org_txt = 254, stupen_ver_txt = 254, stat_txt = 254, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, adresa_kod = 10, pobox = 8, tel = 33, mail = 254, fax = 33, ob_jmeno = 254, ico = 14, dic = 15, rc = 10, jmeno = 24, prijmeni = 36, tit_pred = 35, tit_za = 35, esu_txt = 254, url = 254, zmenu_prov = 12, zmenu_prov_rf = 254, revize = 30, typ_upadku_txt = 50, ixs_nad = 12, ixs_prev = 12, ixs_eko = 12, ixs_eko2 = 12, nazev_tooltip = 254, adresa_tooltip = 254, st0 = 50, st1 = 50, st2 = 50, st3 = 50, st4 = 50, st5 = 50, st6 = 50, st7 = 50, oc = 30, typ_adr_txt = 50, id_ds = 100, id_eu = 200, id_gex = 100, dbstatus = 1, druh_stav_r_txt1 = 50, druh_stav_r_txt2 = 50, druh_stav_r_txt3 = 50, druh_stav_r_txt = 50, mi_jmeno = 24, mi_prijmeni = 36, uziv_sl_e = 254, ico_ds = 254, pr_forma = 3, pr_forma_ares = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GKartotekaFilterDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**dto filtru na kartotece*/
	interface GKartotekaFilterDto {
		/**Zkratka*/
		zkratka?: string|null;
		/**Nazev*/
		nazev?: GBaseFilter<string>|null;
		/**ObjJmeno*/
		ob_jmeno?: string|null;
		/**Poznamka*/
		rc?: string|null;
		/**Dič*/
		dic?: string|null;
		/**ico*/
		ico?: string|null;
		/**oc*/
		oc?: string|null;
		/**bu_ci*/
		bu_ci?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**id_ds*/
		id_ds?: string|null;
		/**id_ds*/
		sk_edesk_id?: string|null;
		/**id_ext_i_prev*/
		id_ext_i_prev?: string|null;
		/**cisloDokladuSzr*/
		cisloDokladuSzr?: string|null;
		/**corcpop*/
		corcpop?: string|null;
		/**cor*/
		cor?: string|null;
		/**cpop*/
		cpop?: string|null;
		/**ulice*/
		ulice?: string|null;
		/**obec*/
		obec?: string|null;
		/**psc*/
		psc?: string|null;
		/**mail*/
		mail?: string|null;
		/**zast_prijmeni*/
		zast_prijmeni?: string|null;
		/**zast_jmeno*/
		zast_jmeno?: string|null;
		/**stupen_ver*/
		stupen_ver?: number|null;
		/**ur_pri*/
		ur_pri?: number|null;
		/**typ_org*/
		typ_org?: number|null;
		/**typ_esu*/
		typ_esu?: number[]|null;
		/**stat*/
		stat?: number|null;
		/**dat_nar*/
		dat_nar?: GBaseFilter<JsonDate>|null;
		/**mi_jmeno_lower*/
		mi_jmeno_lower?: string|null;
		/**mi_prijmeni_lower*/
		mi_prijmeni_lower?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**oblibene*/
		oblibene?: boolean|null;
		/**Typ adresy*/
		typ_adr?: number|null;
		/**jmeno*/
		jmeno?: string|null;
		/**prijmeni*/
		prijmeni?: string|null;
	}
	const enum GKartotekaFilterDtoNames { zkratka = "zkratka", nazev = "nazev", ob_jmeno = "ob_jmeno", rc = "rc", dic = "dic", ico = "ico", oc = "oc", bu_ci = "bu_ci", sk_ci = "sk_ci", ixs_esu = "ixs_esu", id_ds = "id_ds", sk_edesk_id = "sk_edesk_id", id_ext_i_prev = "id_ext_i_prev", cisloDokladuSzr = "cisloDokladuSzr", corcpop = "corcpop", cor = "cor", cpop = "cpop", ulice = "ulice", obec = "obec", psc = "psc", mail = "mail", zast_prijmeni = "zast_prijmeni", zast_jmeno = "zast_jmeno", stupen_ver = "stupen_ver", ur_pri = "ur_pri", typ_org = "typ_org", typ_esu = "typ_esu", stat = "stat", dat_nar = "dat_nar", mi_jmeno_lower = "mi_jmeno_lower", mi_prijmeni_lower = "mi_prijmeni_lower", aktivita = "aktivita", oblibene = "oblibene", typ_adr = "typ_adr", jmeno = "jmeno", prijmeni = "prijmeni",}
	const enum GKartotekaFilterDtoFragments { zkratka = "*", nazev = "*", ob_jmeno = "*", rc = "*", dic = "*", ico = "*", oc = "*", bu_ci = "*", sk_ci = "*", ixs_esu = "*", id_ds = "*", sk_edesk_id = "*", id_ext_i_prev = "*", cisloDokladuSzr = "*", corcpop = "*", cor = "*", cpop = "*", ulice = "*", obec = "*", psc = "*", mail = "*", zast_prijmeni = "*", zast_jmeno = "*", stupen_ver = "*", ur_pri = "*", typ_org = "*", typ_esu = "*", stat = "*", dat_nar = "*", mi_jmeno_lower = "*", mi_prijmeni_lower = "*", aktivita = "*", oblibene = "*", typ_adr = "*", jmeno = "*", prijmeni = "*",}
	const enum GKartotekaFilterDtoTypes { zkratka = "string", nazev = "GBaseFilter<string>", ob_jmeno = "string", rc = "string", dic = "string", ico = "string", oc = "string", bu_ci = "string", sk_ci = "string", ixs_esu = "string", id_ds = "string", sk_edesk_id = "string", id_ext_i_prev = "string", cisloDokladuSzr = "string", corcpop = "string", cor = "string", cpop = "string", ulice = "string", obec = "string", psc = "string", mail = "string", zast_prijmeni = "string", zast_jmeno = "string", stupen_ver = "number", ur_pri = "number", typ_org = "number", typ_esu = "number[]", stat = "number", dat_nar = "GBaseFilter<JsonDate>", mi_jmeno_lower = "string", mi_prijmeni_lower = "string", aktivita = "number", oblibene = "boolean", typ_adr = "number", jmeno = "string", prijmeni = "string",}
	const enum GKartotekaFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GOsobniDokladyDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Osobní Doklady Dto*/
	interface GOsobniDokladyDto {
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_pruk?: number|null;
		/**Autogenerated.*/
		id_pruk?: string|null;
		/**Autogenerated.*/
		vydal?: string|null;
		/**Autogenerated.*/
		dat_vydani?: JsonDate|null;
		/**Autogenerated.*/
		dat_platnost_do?: JsonDate|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		ixs_lpc?: string|null;
		/**Autogenerated.*/
		typ_pruk_txt?: string|null;
		/**Autogenerated.*/
		zmenu_prov_rf?: string|null;
	}
	const enum GOsobniDokladyDtoNames { ixs_esu = "ixs_esu", typ_pruk = "typ_pruk", id_pruk = "id_pruk", vydal = "vydal", dat_vydani = "dat_vydani", dat_platnost_do = "dat_platnost_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", typ_pruk_txt = "typ_pruk_txt", zmenu_prov_rf = "zmenu_prov_rf",}
	const enum GOsobniDokladyDtoFragments { ixs_esu = "*", typ_pruk = "*", id_pruk = "*", vydal = "*", dat_vydani = "*", dat_platnost_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", typ_pruk_txt = "*", zmenu_prov_rf = "*",}
	const enum GOsobniDokladyDtoTypes { ixs_esu = "string", typ_pruk = "number", id_pruk = "string", vydal = "string", dat_vydani = "JsonDate", dat_platnost_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", typ_pruk_txt = "string", zmenu_prov_rf = "string",}
	const enum GOsobniDokladyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GRetValFromFunctionDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto pro práci s s kontrolami*/
	interface OvereniRet {
		/**Indikátor stavu kontroly*/
		stav?: string|null;
		/**Zpráva stavu kontroly*/
		zprava?: string|null;
		/**nalezena DS*/
		NalezeneDS?: Gordic.Esu.Interface.GISDSSubjektDto[]|null;
		/**nalezena DS*/
		NalezeneVERA?: Gordic.Esu.Interface.GVERAOrganizacetDto[]|null;
		/**nalezena DS*/
		PolozekKPorovnani?: Gordic.Esu.Interface.GExtRegRozdilyDto[]|null;
		/**URL v esu v registrech*/
		UrlEsuVReg?: string|null;
	}
	const enum OvereniRetNames { stav = "stav", zprava = "zprava", NalezeneDS = "NalezeneDS", NalezeneVERA = "NalezeneVERA", PolozekKPorovnani = "PolozekKPorovnani", UrlEsuVReg = "UrlEsuVReg",}
	const enum OvereniRetFragments { stav = "*", zprava = "*", NalezeneDS = "*", NalezeneVERA = "*", PolozekKPorovnani = "*", UrlEsuVReg = "*",}
	const enum OvereniRetTypes { stav = "string", zprava = "string", NalezeneDS = "Gordic.Esu.Interface.GISDSSubjektDto[]", NalezeneVERA = "Gordic.Esu.Interface.GVERAOrganizacetDto[]", PolozekKPorovnani = "Gordic.Esu.Interface.GExtRegRozdilyDto[]", UrlEsuVReg = "string",}
	const enum OvereniRetTypeLengths {}
	/**Dto pro práci s s kontrolami*/
	interface SaveDetailEsuRetDto {
		/**Indikátor stavu kontroly*/
		Stav?: string|null;
		/**Indikátor stavu kontroly*/
		Model?: Gordic.Esu.WebClient.GDetailEsuItemsDto|null;
		/**Podobné*/
		Podobne?: Gordic.Esu.WebClient.GKartotekaDto[]|null;
	}
	const enum SaveDetailEsuRetDtoNames { Stav = "Stav", Model = "Model", Podobne = "Podobne",}
	const enum SaveDetailEsuRetDtoFragments { Stav = "*", Model = "*", Podobne = "*",}
	const enum SaveDetailEsuRetDtoTypes { Stav = "string", Model = "Gordic.Esu.WebClient.GDetailEsuItemsDto", Podobne = "Gordic.Esu.WebClient.GKartotekaDto[]",}
	const enum SaveDetailEsuRetDtoTypeLengths {}
	/**Dto pro práci s s kontrolami*/
	interface OvereniVERARet {
		/**Indikátor stavu kontroly*/
		stav?: string|null;
		/**Indikátor stavu kontroly*/
		IDreg?: string|null;
		/**Zpráva stavu kontroly*/
		zprava?: string|null;
		/**nalezené organizace VERA*/
		NalezeneOrganizaceVERA?: Gordic.Esu.Interface.GVERAOrganizacetDto[]|null;
		/**nalezení obyvatelé VERA*/
		NalezeniObyvateleVERA?: Gordic.Esu.Interface.GVERAObyvateltDto[]|null;
		/**nalezena DS*/
		PolozekKPorovnani?: Gordic.Esu.Interface.GExtRegRozdilyDto[]|null;
		/**URL v esu v registrech*/
		UrlEsuVReg?: string|null;
	}
	const enum OvereniVERARetNames { stav = "stav", IDreg = "IDreg", zprava = "zprava", NalezeneOrganizaceVERA = "NalezeneOrganizaceVERA", NalezeniObyvateleVERA = "NalezeniObyvateleVERA", PolozekKPorovnani = "PolozekKPorovnani", UrlEsuVReg = "UrlEsuVReg",}
	const enum OvereniVERARetFragments { stav = "*", IDreg = "*", zprava = "*", NalezeneOrganizaceVERA = "*", NalezeniObyvateleVERA = "*", PolozekKPorovnani = "*", UrlEsuVReg = "*",}
	const enum OvereniVERARetTypes { stav = "string", IDreg = "string", zprava = "string", NalezeneOrganizaceVERA = "Gordic.Esu.Interface.GVERAOrganizacetDto[]", NalezeniObyvateleVERA = "Gordic.Esu.Interface.GVERAObyvateltDto[]", PolozekKPorovnani = "Gordic.Esu.Interface.GExtRegRozdilyDto[]", UrlEsuVReg = "string",}
	const enum OvereniVERARetTypeLengths {}
	/**Dto pro práci s s kontrolami*/
	interface GPrevistDataZEctRegNaDetailESU {
		/**Indikátor stavu kontroly*/
		esuDto?: Gordic.Esu.WebClient.GDetailEsuItemsDto|null;
		/**Zpráva stavu kontroly*/
		ZmenaNazvu?: boolean|null;
		/**nalezena DS*/
		ZmenaRadku5?: boolean|null;
		/**URL v esu v registrech*/
		ZmenaTypu?: boolean|null;
	}
	const enum GPrevistDataZEctRegNaDetailESUNames { esuDto = "esuDto", ZmenaNazvu = "ZmenaNazvu", ZmenaRadku5 = "ZmenaRadku5", ZmenaTypu = "ZmenaTypu",}
	const enum GPrevistDataZEctRegNaDetailESUFragments { esuDto = "*", ZmenaNazvu = "*", ZmenaRadku5 = "*", ZmenaTypu = "*",}
	const enum GPrevistDataZEctRegNaDetailESUTypes { esuDto = "Gordic.Esu.WebClient.GDetailEsuItemsDto", ZmenaNazvu = "boolean", ZmenaRadku5 = "boolean", ZmenaTypu = "boolean",}
	const enum GPrevistDataZEctRegNaDetailESUTypeLengths {}
	/**Dto pro práci s s kontrolami*/
	interface GPrevzitDataPoOvereniISDS {
		/**Indikátor stavu kontroly*/
		stav?: string|null;
		/**Zpráva stavu kontroly*/
		IxsEsuNove?: string|null;
		/**nalezena DS*/
		IDDSNove?: string|null;
		/**URL v esu v registrech*/
		GexNove?: string|null;
	}
	const enum GPrevzitDataPoOvereniISDSNames { stav = "stav", IxsEsuNove = "IxsEsuNove", IDDSNove = "IDDSNove", GexNove = "GexNove",}
	const enum GPrevzitDataPoOvereniISDSFragments { stav = "*", IxsEsuNove = "*", IDDSNove = "*", GexNove = "*",}
	const enum GPrevzitDataPoOvereniISDSTypes { stav = "string", IxsEsuNove = "string", IDDSNove = "string", GexNove = "string",}
	const enum GPrevzitDataPoOvereniISDSTypeLengths {}
	/**Dto s ruznymy Ixs*/
	interface GSeznamIxsDto {
		/**IxsEsu*/
		IxsEsu?: string|null;
		/**IxsNad*/
		IxsNad?: string|null;
		/**IxsEko*/
		IxsEko?: string|null;
	}
	const enum GSeznamIxsDtoNames { IxsEsu = "IxsEsu", IxsNad = "IxsNad", IxsEko = "IxsEko",}
	const enum GSeznamIxsDtoFragments { IxsEsu = "*", IxsNad = "*", IxsEko = "*",}
	const enum GSeznamIxsDtoTypes { IxsEsu = "string", IxsNad = "string", IxsEko = "string",}
	const enum GSeznamIxsDtoTypeLengths {}
	/**Dto Pro vyhledání možných adress*/
	interface GVyhledaniAdresDto {
		/**ixsEsu*/
		ixsEsu?: string|null;
		/**název subjektu*/
		nazev?: string|null;
		/**Ico*/
		ico?: string|null;
		/**Idds*/
		idDs?: string|null;
		/**Adresy které se mají vypustit*/
		m_asEsuListForRemove?: string[]|null;
	}
	const enum GVyhledaniAdresDtoNames { ixsEsu = "ixsEsu", nazev = "nazev", ico = "ico", idDs = "idDs", m_asEsuListForRemove = "m_asEsuListForRemove",}
	const enum GVyhledaniAdresDtoFragments { ixsEsu = "*", nazev = "*", ico = "*", idDs = "*", m_asEsuListForRemove = "*",}
	const enum GVyhledaniAdresDtoTypes { ixsEsu = "string", nazev = "string", ico = "string", idDs = "string", m_asEsuListForRemove = "string[]",}
	const enum GVyhledaniAdresDtoTypeLengths {}
	/**Dto pro vracení změn z detailuESu*/
	interface GRetFromDetailEsuDto {
		/**ixsEsu*/
		ulozeno?: boolean|null;
		/**ixsEsu*/
		flagNovehoEsu?: boolean|null;
		/**název subjektu*/
		data?: Gordic.Esu.WebClient.GDetailEsuItemsDto|null;
		/**název subjektu*/
		puvodniEsu?: string|null;
	}
	const enum GRetFromDetailEsuDtoNames { ulozeno = "ulozeno", flagNovehoEsu = "flagNovehoEsu", data = "data", puvodniEsu = "puvodniEsu",}
	const enum GRetFromDetailEsuDtoFragments { ulozeno = "*", flagNovehoEsu = "*", data = "*", puvodniEsu = "*",}
	const enum GRetFromDetailEsuDtoTypes { ulozeno = "boolean", flagNovehoEsu = "boolean", data = "Gordic.Esu.WebClient.GDetailEsuItemsDto", puvodniEsu = "string",}
	const enum GRetFromDetailEsuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GSeznamInsolvenceDataDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**GSeznamInsolvenceDto*/
	interface GSeznamInsolvenceDataDto {
		/**Autogenerated.*/
		spis_znacka?: string|null;
		/**Autogenerated.*/
		ico?: string|null;
		/**Autogenerated.*/
		rc?: string|null;
		/**Autogenerated.*/
		druh_stav_rizeni?: number|null;
		/**Autogenerated.*/
		aktivita?: Gordic.Ginis.DbModel.GGincaktEnum|null;
		/**Autogenerated.*/
		nazev_osoby?: string|null;
		/**Autogenerated.*/
		jmeno?: string|null;
		/**Autogenerated.*/
		titul_pred?: string|null;
		/**Autogenerated.*/
		titul_za?: string|null;
		/**Autogenerated.*/
		mesto?: string|null;
		/**Autogenerated.*/
		ulice?: string|null;
		/**Autogenerated.*/
		cislo_popisne?: string|null;
		/**Autogenerated.*/
		okres?: string|null;
		/**Autogenerated.*/
		zeme?: string|null;
		/**Autogenerated.*/
		psc?: string|null;
		/**Autogenerated.*/
		osoba_puvodce_txt?: string|null;
		/**Autogenerated.*/
		druh_stav_r_txt?: string|null;
		/**Autogenerated.*/
		dat_narozeni?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Spisová značka připojeného dokumnetu.*/
		prip_spis_znacka?: string|null;
		/**Jméno složené z titulů, jména a příjmení.*/
		readonly fullName?: string|null;
	}
	const enum GSeznamInsolvenceDataDtoNames { spis_znacka = "spis_znacka", ico = "ico", rc = "rc", druh_stav_rizeni = "druh_stav_rizeni", aktivita = "aktivita", nazev_osoby = "nazev_osoby", jmeno = "jmeno", titul_pred = "titul_pred", titul_za = "titul_za", mesto = "mesto", ulice = "ulice", cislo_popisne = "cislo_popisne", okres = "okres", zeme = "zeme", psc = "psc", osoba_puvodce_txt = "osoba_puvodce_txt", druh_stav_r_txt = "druh_stav_r_txt", dat_narozeni = "dat_narozeni", dat_zmena = "dat_zmena", prip_spis_znacka = "prip_spis_znacka", fullName = "fullName",}
	const enum GSeznamInsolvenceDataDtoFragments { spis_znacka = "*", ico = "*", rc = "*", druh_stav_rizeni = "*", aktivita = "*", nazev_osoby = "*", jmeno = "*", titul_pred = "*", titul_za = "*", mesto = "*", ulice = "*", cislo_popisne = "*", okres = "*", zeme = "*", psc = "*", osoba_puvodce_txt = "*", druh_stav_r_txt = "*", dat_narozeni = "*", dat_zmena = "*", prip_spis_znacka = "*", fullName = "*",}
	const enum GSeznamInsolvenceDataDtoTypes { spis_znacka = "string", ico = "string", rc = "string", druh_stav_rizeni = "number", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", nazev_osoby = "string", jmeno = "string", titul_pred = "string", titul_za = "string", mesto = "string", ulice = "string", cislo_popisne = "string", okres = "string", zeme = "string", psc = "string", osoba_puvodce_txt = "string", druh_stav_r_txt = "string", dat_narozeni = "string", dat_zmena = "JsonDate", prip_spis_znacka = "string", fullName = "string",}
	const enum GSeznamInsolvenceDataDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GSeznamInsolvenceFilterDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**GSeznamInsolvenceDto*/
	interface GSeznamInsolvenceFilterDto {
		/**Autogenerated.*/
		spis_znacka?: string|null;
		/**Autogenerated.*/
		spis_znacka2?: string|null;
		/**Autogenerated.*/
		ico?: string|null;
		/**Autogenerated.*/
		rc?: string|null;
		/**Autogenerated.*/
		druh_stav_rizeni?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		nazev_osoby?: string|null;
		/**Autogenerated.*/
		mesto?: string|null;
		/**Autogenerated.*/
		dat_narozeni?: JsonDate|null;
		/**Autogenerated.*/
		obdobi?: number|null;
		/**Ixs Esu.*/
		ixs_esu?: string|null;
	}
	const enum GSeznamInsolvenceFilterDtoNames { spis_znacka = "spis_znacka", spis_znacka2 = "spis_znacka2", ico = "ico", rc = "rc", druh_stav_rizeni = "druh_stav_rizeni", aktivita = "aktivita", nazev_osoby = "nazev_osoby", mesto = "mesto", dat_narozeni = "dat_narozeni", obdobi = "obdobi", ixs_esu = "ixs_esu",}
	const enum GSeznamInsolvenceFilterDtoFragments { spis_znacka = "*", spis_znacka2 = "*", ico = "*", rc = "*", druh_stav_rizeni = "*", aktivita = "*", nazev_osoby = "*", mesto = "*", dat_narozeni = "*", obdobi = "*", ixs_esu = "*",}
	const enum GSeznamInsolvenceFilterDtoTypes { spis_znacka = "string", spis_znacka2 = "string", ico = "string", rc = "string", druh_stav_rizeni = "number", aktivita = "number", nazev_osoby = "string", mesto = "string", dat_narozeni = "JsonDate", obdobi = "number", ixs_esu = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GSeznamZastupnychDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto se seznamem Adres externího subjektu*/
	interface GSeznamZastupnychDto {
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		lic?: string|null;
		/**Autogenerated.*/
		por_zast?: number|null;
		/**Autogenerated.*/
		tit_pred?: string|null;
		/**Autogenerated.*/
		zo_txt?: string|null;
		/**Autogenerated.*/
		jmeno?: string|null;
		/**Autogenerated.*/
		prijmeni?: string|null;
		/**Autogenerated.*/
		tit_za?: string|null;
		/**Autogenerated.*/
		funkce?: string|null;
		/**Autogenerated.*/
		tel?: string|null;
		/**Autogenerated.*/
		mail?: string|null;
		/**Autogenerated.*/
		fax?: string|null;
		/**Autogenerated.*/
		st0?: string|null;
		/**Autogenerated.*/
		st1?: string|null;
		/**Autogenerated.*/
		st2?: string|null;
		/**Autogenerated.*/
		st3?: string|null;
		/**Autogenerated.*/
		st4?: string|null;
		/**Autogenerated.*/
		st5?: string|null;
		/**Autogenerated.*/
		st6?: string|null;
		/**Autogenerated.*/
		st7?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		ur_pri?: number|null;
		/**Autogenerated.*/
		id_vnitr_adr?: string|null;
		/**Autogenerated.*/
		utvar?: string|null;
		/**Autogenerated.*/
		zast_txt?: string|null;
		/**Autogenerated.*/
		typ_zo?: number|null;
		/**Autogenerated.*/
		pristup?: number|null;
		/**Text Změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**Dohledany přístup podle změny provedl*/
		zmenu_prov_pristup?: number|null;
		/**Přístup Txt*/
		zmenu_prov_pristup_txt?: string|null;
		/**Mód ukládání*/
		mod?: string|null;
		/**Autogenerated.*/
		zmenu_prov_ixs_su?: string|null;
	}
	const enum GSeznamZastupnychDtoNames { ixs_esu = "ixs_esu", lic = "lic", por_zast = "por_zast", tit_pred = "tit_pred", zo_txt = "zo_txt", jmeno = "jmeno", prijmeni = "prijmeni", tit_za = "tit_za", funkce = "funkce", tel = "tel", mail = "mail", fax = "fax", st0 = "st0", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", aktivita = "aktivita", zmenu_prov = "zmenu_prov", ur_pri = "ur_pri", id_vnitr_adr = "id_vnitr_adr", utvar = "utvar", zast_txt = "zast_txt", typ_zo = "typ_zo", pristup = "pristup", zmenu_prov_txt = "zmenu_prov_txt", zmenu_prov_pristup = "zmenu_prov_pristup", zmenu_prov_pristup_txt = "zmenu_prov_pristup_txt", mod = "mod", zmenu_prov_ixs_su = "zmenu_prov_ixs_su",}
	const enum GSeznamZastupnychDtoFragments { ixs_esu = "*", lic = "*", por_zast = "*", tit_pred = "*", zo_txt = "*", jmeno = "*", prijmeni = "*", tit_za = "*", funkce = "*", tel = "*", mail = "*", fax = "*", st0 = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", aktivita = "*", zmenu_prov = "*", ur_pri = "*", id_vnitr_adr = "*", utvar = "*", zast_txt = "*", typ_zo = "*", pristup = "*", zmenu_prov_txt = "*", zmenu_prov_pristup = "*", zmenu_prov_pristup_txt = "*", mod = "*", zmenu_prov_ixs_su = "*",}
	const enum GSeznamZastupnychDtoTypes { ixs_esu = "string", lic = "string", por_zast = "number", tit_pred = "string", zo_txt = "string", jmeno = "string", prijmeni = "string", tit_za = "string", funkce = "string", tel = "string", mail = "string", fax = "string", st0 = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", aktivita = "number", zmenu_prov = "string", ur_pri = "number", id_vnitr_adr = "string", utvar = "string", zast_txt = "string", typ_zo = "number", pristup = "number", zmenu_prov_txt = "string", zmenu_prov_pristup = "number", zmenu_prov_pristup_txt = "string", mod = "string", zmenu_prov_ixs_su = "string",}
	const enum GSeznamZastupnychDtoTypeLengths { ixs_esu = 12, tit_pred = 35, jmeno = 24, prijmeni = 36, tit_za = 35, funkce = 50, tel = 33, mail = 254, fax = 33, st0 = 50, st1 = 50, st2 = 50, st3 = 50, st4 = 50, st5 = 50, st6 = 50, st7 = 50, id_vnitr_adr = 100, utvar = 100, zast_txt = 254, zmenu_prov_ixs_su = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Dto\GTabulkaAdresDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto se seznamem Adres externího subjektu*/
	interface GTabulkaAdresDto {
		/**Autogenerated.*/
		trideni?: number|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_esu?: number|null;
		/**Autogenerated.*/
		typ_esu_txt?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		obec?: string|null;
		/**Autogenerated.*/
		ulice?: string|null;
		/**Autogenerated.*/
		cor?: string|null;
		/**Autogenerated.*/
		cpop?: string|null;
		/**Autogenerated.*/
		typ_org?: number|null;
		/**Autogenerated.*/
		esu_txt?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		dat_umrti?: JsonDate|null;
		/**Autogenerated.*/
		poc_doruc?: JsonDecimal|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmenu_prov_rf?: string|null;
		/**Autogenerated.*/
		ixs_nad?: string|null;
		/**Autogenerated.*/
		ixs_eko?: string|null;
		/**Autogenerated.*/
		ixs_prev?: string|null;
		/**Autogenerated.*/
		ico?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		stupen_ver?: number|null;
		/**Autogenerated.*/
		ur_pri?: number|null;
		/**Autogenerated.*/
		esu_txt_nad?: string|null;
		/**Autogenerated.*/
		typ_adr?: number|null;
		/**Autogenerated.*/
		typ_adr_txt?: string|null;
		/**Autogenerated.*/
		cnt_zo?: number|null;
		/**Autogenerated.*/
		id_ds?: string|null;
		/**Autogenerated.*/
		id_gex?: string|null;
		/**Autogenerated.*/
		dat_akt_info_o_ds?: JsonDate|null;
		/**Autogenerated.*/
		dbstatus?: string|null;
		/**Indikátor stavu ikonky DS*/
		ico_ds?: string|null;
		/**color*/
		color?: string|null;
		/**typ_txt*/
		typ_txt?: string|null;
		/**nazev_ext*/
		nazev_ext?: string|null;
		/**esu_txt_ext*/
		esu_txt_ext?: string|null;
		/**pravoEditace*/
		pravoEditace?: boolean|null;
		/**pravoEdotace*/
		pravoProhlizeni?: boolean|null;
	}
	const enum GTabulkaAdresDtoNames { trideni = "trideni", ixs_esu = "ixs_esu", typ_esu = "typ_esu", typ_esu_txt = "typ_esu_txt", nazev = "nazev", obec = "obec", ulice = "ulice", cor = "cor", cpop = "cpop", typ_org = "typ_org", esu_txt = "esu_txt", dat_zmena = "dat_zmena", dat_umrti = "dat_umrti", poc_doruc = "poc_doruc", zmenu_prov = "zmenu_prov", zmenu_prov_rf = "zmenu_prov_rf", ixs_nad = "ixs_nad", ixs_eko = "ixs_eko", ixs_prev = "ixs_prev", ico = "ico", aktivita = "aktivita", stupen_ver = "stupen_ver", ur_pri = "ur_pri", esu_txt_nad = "esu_txt_nad", typ_adr = "typ_adr", typ_adr_txt = "typ_adr_txt", cnt_zo = "cnt_zo", id_ds = "id_ds", id_gex = "id_gex", dat_akt_info_o_ds = "dat_akt_info_o_ds", dbstatus = "dbstatus", ico_ds = "ico_ds", color = "color", typ_txt = "typ_txt", nazev_ext = "nazev_ext", esu_txt_ext = "esu_txt_ext", pravoEditace = "pravoEditace", pravoProhlizeni = "pravoProhlizeni",}
	const enum GTabulkaAdresDtoFragments { trideni = "*", ixs_esu = "*", typ_esu = "*", typ_esu_txt = "*", nazev = "*", obec = "*", ulice = "*", cor = "*", cpop = "*", typ_org = "*", esu_txt = "*", dat_zmena = "*", dat_umrti = "*", poc_doruc = "*", zmenu_prov = "*", zmenu_prov_rf = "*", ixs_nad = "*", ixs_eko = "*", ixs_prev = "*", ico = "*", aktivita = "*", stupen_ver = "*", ur_pri = "*", esu_txt_nad = "*", typ_adr = "*", typ_adr_txt = "*", cnt_zo = "*", id_ds = "*", id_gex = "*", dat_akt_info_o_ds = "*", dbstatus = "*", ico_ds = "*", color = "*", typ_txt = "*", nazev_ext = "*", esu_txt_ext = "*", pravoEditace = "*", pravoProhlizeni = "*",}
	const enum GTabulkaAdresDtoTypes { trideni = "number", ixs_esu = "string", typ_esu = "number", typ_esu_txt = "string", nazev = "string", obec = "string", ulice = "string", cor = "string", cpop = "string", typ_org = "number", esu_txt = "string", dat_zmena = "JsonDate", dat_umrti = "JsonDate", poc_doruc = "JsonDecimal", zmenu_prov = "string", zmenu_prov_rf = "string", ixs_nad = "string", ixs_eko = "string", ixs_prev = "string", ico = "string", aktivita = "number", stupen_ver = "number", ur_pri = "number", esu_txt_nad = "string", typ_adr = "number", typ_adr_txt = "string", cnt_zo = "number", id_ds = "string", id_gex = "string", dat_akt_info_o_ds = "JsonDate", dbstatus = "string", ico_ds = "string", color = "string", typ_txt = "string", nazev_ext = "string", esu_txt_ext = "string", pravoEditace = "boolean", pravoProhlizeni = "boolean",}
	const enum GTabulkaAdresDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\ISZR\Aiseo\Dto\SzrAiseoDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	interface AiseoInitDto extends Gordic.Esu.WebClient.AiseoNactiDataBaseDto {
		/**Autogenerated.*/
		Duvod?: string|null;
		/**Autogenerated.*/
		Agenda?: string|null;
		/**Autogenerated.*/
		AgendovaRole?: string|null;
		/**ReadDbMessage.*/
		ReadDbMessage?: string|null;
	}
	const enum AiseoInitDtoNames { Duvod = "Duvod", Agenda = "Agenda", AgendovaRole = "AgendovaRole", ReadDbMessage = "ReadDbMessage", SzrAiseoSzrsieo = "SzrAiseoSzrsieo", Osoby = "Osoby", Adresy = "Adresy",}
	const enum AiseoInitDtoFragments { Duvod = "*", Agenda = "*", AgendovaRole = "*", ReadDbMessage = "*", SzrAiseoSzrsieo = "*", Osoby = "*", Adresy = "*",}
	const enum AiseoInitDtoTypes { Duvod = "string", Agenda = "string", AgendovaRole = "string", ReadDbMessage = "string", SzrAiseoSzrsieo = "Gordic.Esu.WebClient.SzrAiseoSzrsieoDto[]", Osoby = "Gordic.Esu.WebClient.SzrAiseoSezSzrvieoDto[]", Adresy = "Gordic.Esu.WebClient.SzrAiseoSzrsadeoDto[]",}
	const enum AiseoInitDtoTypeLengths {}
	interface AiseoNactiDataDto {
		/**Autogenerated.*/
		Aifo?: string|null;
		/**Autogenerated.*/
		Duvod?: string|null;
		/**Autogenerated.*/
		Agenda?: string|null;
		/**Autogenerated.*/
		AgendovaRole?: string|null;
		/**Autogenerated.*/
		TypHledani?: string|null;
		/**Autogenerated.*/
		RodneCislo?: string|null;
		/**Autogenerated.*/
		Jmeno?: string|null;
		/**Autogenerated.*/
		Prijmeni?: string|null;
		/**Autogenerated.*/
		RodPrijmeni?: string|null;
		/**Autogenerated.*/
		DatNar?: JsonDate|null;
		/**.*/
		Diakritika?: boolean|null;
	}
	const enum AiseoNactiDataDtoNames { Aifo = "Aifo", Duvod = "Duvod", Agenda = "Agenda", AgendovaRole = "AgendovaRole", TypHledani = "TypHledani", RodneCislo = "RodneCislo", Jmeno = "Jmeno", Prijmeni = "Prijmeni", RodPrijmeni = "RodPrijmeni", DatNar = "DatNar", Diakritika = "Diakritika",}
	const enum AiseoNactiDataDtoFragments { Aifo = "*", Duvod = "*", Agenda = "*", AgendovaRole = "*", TypHledani = "*", RodneCislo = "*", Jmeno = "*", Prijmeni = "*", RodPrijmeni = "*", DatNar = "*", Diakritika = "*",}
	const enum AiseoNactiDataDtoTypes { Aifo = "string", Duvod = "string", Agenda = "string", AgendovaRole = "string", TypHledani = "string", RodneCislo = "string", Jmeno = "string", Prijmeni = "string", RodPrijmeni = "string", DatNar = "JsonDate", Diakritika = "boolean",}
	const enum AiseoNactiDataDtoTypeLengths {}
	interface AiseoNactiDataBaseDto {
		/**ReadDbMessage.*/
		SzrAiseoSzrsieo?: Gordic.Esu.WebClient.SzrAiseoSzrsieoDto[]|null;
		/**ReadDbMessage.*/
		Osoby?: Gordic.Esu.WebClient.SzrAiseoSezSzrvieoDto[]|null;
		/**ReadDbMessage.*/
		Adresy?: Gordic.Esu.WebClient.SzrAiseoSzrsadeoDto[]|null;
	}
	const enum AiseoNactiDataBaseDtoNames { SzrAiseoSzrsieo = "SzrAiseoSzrsieo", Osoby = "Osoby", Adresy = "Adresy",}
	const enum AiseoNactiDataBaseDtoFragments { SzrAiseoSzrsieo = "*", Osoby = "*", Adresy = "*",}
	const enum AiseoNactiDataBaseDtoTypes { SzrAiseoSzrsieo = "Gordic.Esu.WebClient.SzrAiseoSzrsieoDto[]", Osoby = "Gordic.Esu.WebClient.SzrAiseoSezSzrvieoDto[]", Adresy = "Gordic.Esu.WebClient.SzrAiseoSzrsadeoDto[]",}
	const enum AiseoNactiDataBaseDtoTypeLengths {}
	interface AiseoNactiDataRetDto extends Gordic.Esu.WebClient.AiseoNactiDataBaseDto {
		/**Autogenerated.*/
		StatusText?: string|null;
		/**Autogenerated.*/
		IszrZadostId?: string|null;
	}
	const enum AiseoNactiDataRetDtoNames { StatusText = "StatusText", IszrZadostId = "IszrZadostId", SzrAiseoSzrsieo = "SzrAiseoSzrsieo", Osoby = "Osoby", Adresy = "Adresy",}
	const enum AiseoNactiDataRetDtoFragments { StatusText = "*", IszrZadostId = "*", SzrAiseoSzrsieo = "*", Osoby = "*", Adresy = "*",}
	const enum AiseoNactiDataRetDtoTypes { StatusText = "string", IszrZadostId = "string", SzrAiseoSzrsieo = "Gordic.Esu.WebClient.SzrAiseoSzrsieoDto[]", Osoby = "Gordic.Esu.WebClient.SzrAiseoSezSzrvieoDto[]", Adresy = "Gordic.Esu.WebClient.SzrAiseoSzrsadeoDto[]",}
	const enum AiseoNactiDataRetDtoTypeLengths {}
	/**dto oveření ROS*/
	interface SzrAiseoSzrsieoDto {
		/**Autogenerated.*/
		aifo?: string|null;
		/**Autogenerated.*/
		nahradni_aifo?: number|null;
		/**Autogenerated.*/
		rc?: string|null;
		/**Autogenerated.*/
		jmeno?: string|null;
		/**Autogenerated.*/
		prijmeni?: string|null;
		/**Autogenerated.*/
		datum_narozeni?: JsonDate|null;
		/**Autogenerated.*/
		datum_umrti?: JsonDate|null;
		/**Autogenerated.*/
		pohlavi?: string|null;
		/**Autogenerated.*/
		rodne_prijm?: string|null;
		/**Autogenerated.*/
		rod_stav_kod?: string|null;
		/**Autogenerated.*/
		rod_stav_txt?: string|null;
		/**Autogenerated.*/
		rod_stav_pl?: string|null;
		/**Autogenerated.*/
		stav_dat_kod?: string|null;
		/**Autogenerated.*/
		stav_dat_txt?: string|null;
		/**Autogenerated.*/
		st_obcan_txt?: string|null;
		/**Autogenerated.*/
		typ_pobyt_kod?: string|null;
		/**Autogenerated.*/
		typ_pobyt_txt?: string|null;
		/**Autogenerated.*/
		st_obcan_csu?: string|null;
		/**Autogenerated.*/
		prohl_umr?: string|null;
		/**Autogenerated.*/
		umr_interval?: string|null;
		/**Autogenerated.*/
		stav_osoby_do?: JsonDate|null;
		/**Autogenerated.*/
		umr_platnost?: string|null;
		/**Autogenerated.*/
		umr_dat_npm?: string|null;
		/**Autogenerated.*/
		umr_cj?: string|null;
		/**Autogenerated.*/
		tpcrod?: string|null;
		/**Autogenerated.*/
		tpcrdo?: string|null;
		/**Autogenerated.*/
		os_zpus_kod?: string|null;
		/**Autogenerated.*/
		os_zpus_txt?: string|null;
		/**Autogenerated.*/
		os_zpus_promez?: string|null;
		/**Autogenerated.*/
		os_zpus_przbav?: string|null;
		/**Autogenerated.*/
		zz_nazev?: string|null;
		/**Autogenerated.*/
		zz_rc?: string|null;
		/**Autogenerated.*/
		zz_adresa1?: string|null;
		/**Autogenerated.*/
		zz_adresa2?: string|null;
		/**Autogenerated.*/
		zz_adresa3?: string|null;
		/**Autogenerated.*/
		manzdnpmnepl?: string|null;
		/**Autogenerated.*/
		manzdnpmneex?: string|null;
		/**Autogenerated.*/
		manzdnpmrozv?: string|null;
		/**Autogenerated.*/
		manzzanikumr?: string|null;
		/**Autogenerated.*/
		partdnpmnepl?: string|null;
		/**Autogenerated.*/
		partdnpmneex?: string|null;
		/**Autogenerated.*/
		partdnpmzrus?: string|null;
		/**Autogenerated.*/
		partzanikumr?: string|null;
		/**Autogenerated.*/
		umrdatnpm?: string|null;
		/**Autogenerated.*/
		datum_uzp?: string|null;
		/**Autogenerated.*/
		osvojeni_pr?: string|null;
		/**Autogenerated.*/
		ovm?: string|null;
		/**Autogenerated.*/
		ais?: number|null;
		/**Autogenerated.*/
		agenda?: string|null;
		/**Autogenerated.*/
		agendova_role?: string|null;
		/**Autogenerated.*/
		uzivatel?: string|null;
		/**Autogenerated.*/
		duvod_ucel?: string|null;
		/**Autogenerated.*/
		agenda_zadost_id?: string|null;
		/**Autogenerated.*/
		iszr_zadost_id?: string|null;
		/**Autogenerated.*/
		reg_zadost_id?: string|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**StatForEsu.*/
		StatForEsu?: number|null;
	}
	const enum SzrAiseoSzrsieoDtoNames { aifo = "aifo", nahradni_aifo = "nahradni_aifo", rc = "rc", jmeno = "jmeno", prijmeni = "prijmeni", datum_narozeni = "datum_narozeni", datum_umrti = "datum_umrti", pohlavi = "pohlavi", rodne_prijm = "rodne_prijm", rod_stav_kod = "rod_stav_kod", rod_stav_txt = "rod_stav_txt", rod_stav_pl = "rod_stav_pl", stav_dat_kod = "stav_dat_kod", stav_dat_txt = "stav_dat_txt", st_obcan_txt = "st_obcan_txt", typ_pobyt_kod = "typ_pobyt_kod", typ_pobyt_txt = "typ_pobyt_txt", st_obcan_csu = "st_obcan_csu", prohl_umr = "prohl_umr", umr_interval = "umr_interval", stav_osoby_do = "stav_osoby_do", umr_platnost = "umr_platnost", umr_dat_npm = "umr_dat_npm", umr_cj = "umr_cj", tpcrod = "tpcrod", tpcrdo = "tpcrdo", os_zpus_kod = "os_zpus_kod", os_zpus_txt = "os_zpus_txt", os_zpus_promez = "os_zpus_promez", os_zpus_przbav = "os_zpus_przbav", zz_nazev = "zz_nazev", zz_rc = "zz_rc", zz_adresa1 = "zz_adresa1", zz_adresa2 = "zz_adresa2", zz_adresa3 = "zz_adresa3", manzdnpmnepl = "manzdnpmnepl", manzdnpmneex = "manzdnpmneex", manzdnpmrozv = "manzdnpmrozv", manzzanikumr = "manzzanikumr", partdnpmnepl = "partdnpmnepl", partdnpmneex = "partdnpmneex", partdnpmzrus = "partdnpmzrus", partzanikumr = "partzanikumr", umrdatnpm = "umrdatnpm", datum_uzp = "datum_uzp", osvojeni_pr = "osvojeni_pr", ovm = "ovm", ais = "ais", agenda = "agenda", agendova_role = "agendova_role", uzivatel = "uzivatel", duvod_ucel = "duvod_ucel", agenda_zadost_id = "agenda_zadost_id", iszr_zadost_id = "iszr_zadost_id", reg_zadost_id = "reg_zadost_id", cas_odpovedi = "cas_odpovedi", StatForEsu = "StatForEsu",}
	const enum SzrAiseoSzrsieoDtoFragments { aifo = "*", nahradni_aifo = "*", rc = "*", jmeno = "*", prijmeni = "*", datum_narozeni = "*", datum_umrti = "*", pohlavi = "*", rodne_prijm = "*", rod_stav_kod = "*", rod_stav_txt = "*", rod_stav_pl = "*", stav_dat_kod = "*", stav_dat_txt = "*", st_obcan_txt = "*", typ_pobyt_kod = "*", typ_pobyt_txt = "*", st_obcan_csu = "*", prohl_umr = "*", umr_interval = "*", stav_osoby_do = "*", umr_platnost = "*", umr_dat_npm = "*", umr_cj = "*", tpcrod = "*", tpcrdo = "*", os_zpus_kod = "*", os_zpus_txt = "*", os_zpus_promez = "*", os_zpus_przbav = "*", zz_nazev = "*", zz_rc = "*", zz_adresa1 = "*", zz_adresa2 = "*", zz_adresa3 = "*", manzdnpmnepl = "*", manzdnpmneex = "*", manzdnpmrozv = "*", manzzanikumr = "*", partdnpmnepl = "*", partdnpmneex = "*", partdnpmzrus = "*", partzanikumr = "*", umrdatnpm = "*", datum_uzp = "*", osvojeni_pr = "*", ovm = "*", ais = "*", agenda = "*", agendova_role = "*", uzivatel = "*", duvod_ucel = "*", agenda_zadost_id = "*", iszr_zadost_id = "*", reg_zadost_id = "*", cas_odpovedi = "*", StatForEsu = "*",}
	const enum SzrAiseoSzrsieoDtoTypes { aifo = "string", nahradni_aifo = "number", rc = "string", jmeno = "string", prijmeni = "string", datum_narozeni = "JsonDate", datum_umrti = "JsonDate", pohlavi = "string", rodne_prijm = "string", rod_stav_kod = "string", rod_stav_txt = "string", rod_stav_pl = "string", stav_dat_kod = "string", stav_dat_txt = "string", st_obcan_txt = "string", typ_pobyt_kod = "string", typ_pobyt_txt = "string", st_obcan_csu = "string", prohl_umr = "string", umr_interval = "string", stav_osoby_do = "JsonDate", umr_platnost = "string", umr_dat_npm = "string", umr_cj = "string", tpcrod = "string", tpcrdo = "string", os_zpus_kod = "string", os_zpus_txt = "string", os_zpus_promez = "string", os_zpus_przbav = "string", zz_nazev = "string", zz_rc = "string", zz_adresa1 = "string", zz_adresa2 = "string", zz_adresa3 = "string", manzdnpmnepl = "string", manzdnpmneex = "string", manzdnpmrozv = "string", manzzanikumr = "string", partdnpmnepl = "string", partdnpmneex = "string", partdnpmzrus = "string", partzanikumr = "string", umrdatnpm = "string", datum_uzp = "string", osvojeni_pr = "string", ovm = "string", ais = "number", agenda = "string", agendova_role = "string", uzivatel = "string", duvod_ucel = "string", agenda_zadost_id = "string", iszr_zadost_id = "string", reg_zadost_id = "string", cas_odpovedi = "JsonDate", StatForEsu = "number",}
	const enum SzrAiseoSzrsieoDtoTypeLengths {}
	/**dto oveření ROS*/
	interface SzrAiseoSezSzrvieoDto {
		/**Autogenerated.*/
		aifo?: string|null;
		/**Autogenerated.*/
		nahradni_aifo?: number|null;
		/**Autogenerated.*/
		typ_vaifo?: number|null;
		/**Autogenerated.*/
		typ_vaifo_txt?: string|null;
		/**Autogenerated.*/
		rc?: string|null;
		/**Autogenerated.*/
		jmeno?: string|null;
		/**Autogenerated.*/
		prijmeni?: string|null;
		/**Autogenerated.*/
		datum_narozeni?: JsonDate|null;
		/**Autogenerated.*/
		datum_umrti?: JsonDate|null;
		/**Autogenerated.*/
		pohlavi?: string|null;
		/**Autogenerated.*/
		rodne_prijm?: string|null;
		/**Autogenerated.*/
		rod_stav_kod?: string|null;
		/**Autogenerated.*/
		rod_stav_txt?: string|null;
		/**Autogenerated.*/
		rod_stav_pl?: string|null;
		/**Autogenerated.*/
		stav_dat_kod?: string|null;
		/**Autogenerated.*/
		stav_dat_txt?: string|null;
		/**Autogenerated.*/
		st_obcan_txt?: string|null;
		/**Autogenerated.*/
		typ_pobyt_kod?: string|null;
		/**Autogenerated.*/
		typ_pobyt_txt?: string|null;
		/**Autogenerated.*/
		st_obcan_csu?: string|null;
		/**Autogenerated.*/
		prohl_umr?: string|null;
		/**Autogenerated.*/
		umr_interval?: string|null;
		/**Autogenerated.*/
		stav_osoby_do?: JsonDate|null;
		/**Autogenerated.*/
		umr_platnost?: string|null;
		/**Autogenerated.*/
		umr_dat_npm?: string|null;
		/**Autogenerated.*/
		umr_cj?: string|null;
		/**Autogenerated.*/
		tpcrod?: string|null;
		/**Autogenerated.*/
		tpcrdo?: string|null;
		/**Autogenerated.*/
		os_zpus_kod?: string|null;
		/**Autogenerated.*/
		os_zpus_txt?: string|null;
		/**Autogenerated.*/
		os_zpus_promez?: string|null;
		/**Autogenerated.*/
		os_zpus_przbav?: string|null;
		/**Autogenerated.*/
		zz_nazev?: string|null;
		/**Autogenerated.*/
		zz_rc?: string|null;
		/**Autogenerated.*/
		zz_adresa1?: string|null;
		/**Autogenerated.*/
		zz_adresa2?: string|null;
		/**Autogenerated.*/
		zz_adresa3?: string|null;
		/**Autogenerated.*/
		manzdnpmnepl?: string|null;
		/**Autogenerated.*/
		manzdnpmneex?: string|null;
		/**Autogenerated.*/
		manzdnpmrozv?: string|null;
		/**Autogenerated.*/
		manzzanikumr?: string|null;
		/**Autogenerated.*/
		partdnpmnepl?: string|null;
		/**Autogenerated.*/
		partdnpmneex?: string|null;
		/**Autogenerated.*/
		partdnpmzrus?: string|null;
		/**Autogenerated.*/
		partzanikumr?: string|null;
		/**Autogenerated.*/
		umrdatnpm?: string|null;
		/**Autogenerated.*/
		datum_uzp?: string|null;
		/**Autogenerated.*/
		osvojeni_pr?: string|null;
		/**Autogenerated.*/
		ovm?: string|null;
		/**Autogenerated.*/
		ais?: number|null;
		/**Autogenerated.*/
		agenda?: string|null;
		/**Autogenerated.*/
		agendova_role?: string|null;
		/**Autogenerated.*/
		uzivatel?: string|null;
		/**Autogenerated.*/
		duvod_ucel?: string|null;
		/**Autogenerated.*/
		agenda_zadost_id?: string|null;
		/**Autogenerated.*/
		iszr_zadost_id?: string|null;
		/**Autogenerated.*/
		reg_zadost_id?: string|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
	}
	const enum SzrAiseoSezSzrvieoDtoNames { aifo = "aifo", nahradni_aifo = "nahradni_aifo", typ_vaifo = "typ_vaifo", typ_vaifo_txt = "typ_vaifo_txt", rc = "rc", jmeno = "jmeno", prijmeni = "prijmeni", datum_narozeni = "datum_narozeni", datum_umrti = "datum_umrti", pohlavi = "pohlavi", rodne_prijm = "rodne_prijm", rod_stav_kod = "rod_stav_kod", rod_stav_txt = "rod_stav_txt", rod_stav_pl = "rod_stav_pl", stav_dat_kod = "stav_dat_kod", stav_dat_txt = "stav_dat_txt", st_obcan_txt = "st_obcan_txt", typ_pobyt_kod = "typ_pobyt_kod", typ_pobyt_txt = "typ_pobyt_txt", st_obcan_csu = "st_obcan_csu", prohl_umr = "prohl_umr", umr_interval = "umr_interval", stav_osoby_do = "stav_osoby_do", umr_platnost = "umr_platnost", umr_dat_npm = "umr_dat_npm", umr_cj = "umr_cj", tpcrod = "tpcrod", tpcrdo = "tpcrdo", os_zpus_kod = "os_zpus_kod", os_zpus_txt = "os_zpus_txt", os_zpus_promez = "os_zpus_promez", os_zpus_przbav = "os_zpus_przbav", zz_nazev = "zz_nazev", zz_rc = "zz_rc", zz_adresa1 = "zz_adresa1", zz_adresa2 = "zz_adresa2", zz_adresa3 = "zz_adresa3", manzdnpmnepl = "manzdnpmnepl", manzdnpmneex = "manzdnpmneex", manzdnpmrozv = "manzdnpmrozv", manzzanikumr = "manzzanikumr", partdnpmnepl = "partdnpmnepl", partdnpmneex = "partdnpmneex", partdnpmzrus = "partdnpmzrus", partzanikumr = "partzanikumr", umrdatnpm = "umrdatnpm", datum_uzp = "datum_uzp", osvojeni_pr = "osvojeni_pr", ovm = "ovm", ais = "ais", agenda = "agenda", agendova_role = "agendova_role", uzivatel = "uzivatel", duvod_ucel = "duvod_ucel", agenda_zadost_id = "agenda_zadost_id", iszr_zadost_id = "iszr_zadost_id", reg_zadost_id = "reg_zadost_id", cas_odpovedi = "cas_odpovedi",}
	const enum SzrAiseoSezSzrvieoDtoFragments { aifo = "*", nahradni_aifo = "*", typ_vaifo = "*", typ_vaifo_txt = "*", rc = "*", jmeno = "*", prijmeni = "*", datum_narozeni = "*", datum_umrti = "*", pohlavi = "*", rodne_prijm = "*", rod_stav_kod = "*", rod_stav_txt = "*", rod_stav_pl = "*", stav_dat_kod = "*", stav_dat_txt = "*", st_obcan_txt = "*", typ_pobyt_kod = "*", typ_pobyt_txt = "*", st_obcan_csu = "*", prohl_umr = "*", umr_interval = "*", stav_osoby_do = "*", umr_platnost = "*", umr_dat_npm = "*", umr_cj = "*", tpcrod = "*", tpcrdo = "*", os_zpus_kod = "*", os_zpus_txt = "*", os_zpus_promez = "*", os_zpus_przbav = "*", zz_nazev = "*", zz_rc = "*", zz_adresa1 = "*", zz_adresa2 = "*", zz_adresa3 = "*", manzdnpmnepl = "*", manzdnpmneex = "*", manzdnpmrozv = "*", manzzanikumr = "*", partdnpmnepl = "*", partdnpmneex = "*", partdnpmzrus = "*", partzanikumr = "*", umrdatnpm = "*", datum_uzp = "*", osvojeni_pr = "*", ovm = "*", ais = "*", agenda = "*", agendova_role = "*", uzivatel = "*", duvod_ucel = "*", agenda_zadost_id = "*", iszr_zadost_id = "*", reg_zadost_id = "*", cas_odpovedi = "*",}
	const enum SzrAiseoSezSzrvieoDtoTypes { aifo = "string", nahradni_aifo = "number", typ_vaifo = "number", typ_vaifo_txt = "string", rc = "string", jmeno = "string", prijmeni = "string", datum_narozeni = "JsonDate", datum_umrti = "JsonDate", pohlavi = "string", rodne_prijm = "string", rod_stav_kod = "string", rod_stav_txt = "string", rod_stav_pl = "string", stav_dat_kod = "string", stav_dat_txt = "string", st_obcan_txt = "string", typ_pobyt_kod = "string", typ_pobyt_txt = "string", st_obcan_csu = "string", prohl_umr = "string", umr_interval = "string", stav_osoby_do = "JsonDate", umr_platnost = "string", umr_dat_npm = "string", umr_cj = "string", tpcrod = "string", tpcrdo = "string", os_zpus_kod = "string", os_zpus_txt = "string", os_zpus_promez = "string", os_zpus_przbav = "string", zz_nazev = "string", zz_rc = "string", zz_adresa1 = "string", zz_adresa2 = "string", zz_adresa3 = "string", manzdnpmnepl = "string", manzdnpmneex = "string", manzdnpmrozv = "string", manzzanikumr = "string", partdnpmnepl = "string", partdnpmneex = "string", partdnpmzrus = "string", partzanikumr = "string", umrdatnpm = "string", datum_uzp = "string", osvojeni_pr = "string", ovm = "string", ais = "number", agenda = "string", agendova_role = "string", uzivatel = "string", duvod_ucel = "string", agenda_zadost_id = "string", iszr_zadost_id = "string", reg_zadost_id = "string", cas_odpovedi = "JsonDate",}
	const enum SzrAiseoSezSzrvieoDtoTypeLengths {}
	/**dto oveření ROS*/
	interface SzrAiseoSzrsadeoDto {
		/**Autogenerated.*/
		aifo?: string|null;
		/**Autogenerated.*/
		typ_ade?: number|null;
		/**Autogenerated.*/
		typ_ade_txt?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		cislo_domu?: string|null;
		/**Autogenerated.*/
		cislo_domu_dr?: string|null;
		/**Autogenerated.*/
		cislo_o?: string|null;
		/**Autogenerated.*/
		cislo_oznak?: string|null;
		/**Autogenerated.*/
		psc?: string|null;
		/**Autogenerated.*/
		adr_statut_kod?: string|null;
		/**Autogenerated.*/
		adr_statut_txt?: string|null;
		/**Autogenerated.*/
		ulice_kod?: string|null;
		/**Autogenerated.*/
		ulice_txt?: string|null;
		/**Autogenerated.*/
		c_obec_kod?: string|null;
		/**Autogenerated.*/
		c_obec_txt?: string|null;
		/**Autogenerated.*/
		mc_obec_kod?: string|null;
		/**Autogenerated.*/
		mc_obec_txt?: string|null;
		/**Autogenerated.*/
		obec_kod?: string|null;
		/**Autogenerated.*/
		obec_txt?: string|null;
		/**Autogenerated.*/
		okres_kod?: string|null;
		/**Autogenerated.*/
		okres_txt?: string|null;
		/**Autogenerated.*/
		sp_obec_kod?: string|null;
		/**Autogenerated.*/
		sp_obec_txt?: string|null;
		/**Autogenerated.*/
		typ_pobytu_kod?: string|null;
		/**Autogenerated.*/
		typ_pobytu_txt?: string|null;
		/**Autogenerated.*/
		typ_pobytu_od?: string|null;
		/**Autogenerated.*/
		c_obec_csu?: string|null;
		/**Autogenerated.*/
		mc_obec_csu?: string|null;
		/**Autogenerated.*/
		obec_csu?: string|null;
		/**Autogenerated.*/
		okres_csu?: string|null;
		/**Autogenerated.*/
		sp_obec_csu?: string|null;
		/**Autogenerated.*/
		stat_kod?: string|null;
		/**Autogenerated.*/
		stat_txt?: string|null;
		/**Autogenerated.*/
		stat_csu?: string|null;
		/**Autogenerated.*/
		ovm?: string|null;
		/**Autogenerated.*/
		ais?: number|null;
		/**Autogenerated.*/
		agenda?: string|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
	}
	const enum SzrAiseoSzrsadeoDtoNames { aifo = "aifo", typ_ade = "typ_ade", typ_ade_txt = "typ_ade_txt", por_cislo = "por_cislo", cislo_domu = "cislo_domu", cislo_domu_dr = "cislo_domu_dr", cislo_o = "cislo_o", cislo_oznak = "cislo_oznak", psc = "psc", adr_statut_kod = "adr_statut_kod", adr_statut_txt = "adr_statut_txt", ulice_kod = "ulice_kod", ulice_txt = "ulice_txt", c_obec_kod = "c_obec_kod", c_obec_txt = "c_obec_txt", mc_obec_kod = "mc_obec_kod", mc_obec_txt = "mc_obec_txt", obec_kod = "obec_kod", obec_txt = "obec_txt", okres_kod = "okres_kod", okres_txt = "okres_txt", sp_obec_kod = "sp_obec_kod", sp_obec_txt = "sp_obec_txt", typ_pobytu_kod = "typ_pobytu_kod", typ_pobytu_txt = "typ_pobytu_txt", typ_pobytu_od = "typ_pobytu_od", c_obec_csu = "c_obec_csu", mc_obec_csu = "mc_obec_csu", obec_csu = "obec_csu", okres_csu = "okres_csu", sp_obec_csu = "sp_obec_csu", stat_kod = "stat_kod", stat_txt = "stat_txt", stat_csu = "stat_csu", ovm = "ovm", ais = "ais", agenda = "agenda", cas_odpovedi = "cas_odpovedi",}
	const enum SzrAiseoSzrsadeoDtoFragments { aifo = "*", typ_ade = "*", typ_ade_txt = "*", por_cislo = "*", cislo_domu = "*", cislo_domu_dr = "*", cislo_o = "*", cislo_oznak = "*", psc = "*", adr_statut_kod = "*", adr_statut_txt = "*", ulice_kod = "*", ulice_txt = "*", c_obec_kod = "*", c_obec_txt = "*", mc_obec_kod = "*", mc_obec_txt = "*", obec_kod = "*", obec_txt = "*", okres_kod = "*", okres_txt = "*", sp_obec_kod = "*", sp_obec_txt = "*", typ_pobytu_kod = "*", typ_pobytu_txt = "*", typ_pobytu_od = "*", c_obec_csu = "*", mc_obec_csu = "*", obec_csu = "*", okres_csu = "*", sp_obec_csu = "*", stat_kod = "*", stat_txt = "*", stat_csu = "*", ovm = "*", ais = "*", agenda = "*", cas_odpovedi = "*",}
	const enum SzrAiseoSzrsadeoDtoTypes { aifo = "string", typ_ade = "number", typ_ade_txt = "string", por_cislo = "number", cislo_domu = "string", cislo_domu_dr = "string", cislo_o = "string", cislo_oznak = "string", psc = "string", adr_statut_kod = "string", adr_statut_txt = "string", ulice_kod = "string", ulice_txt = "string", c_obec_kod = "string", c_obec_txt = "string", mc_obec_kod = "string", mc_obec_txt = "string", obec_kod = "string", obec_txt = "string", okres_kod = "string", okres_txt = "string", sp_obec_kod = "string", sp_obec_txt = "string", typ_pobytu_kod = "string", typ_pobytu_txt = "string", typ_pobytu_od = "string", c_obec_csu = "string", mc_obec_csu = "string", obec_csu = "string", okres_csu = "string", sp_obec_csu = "string", stat_kod = "string", stat_txt = "string", stat_csu = "string", ovm = "string", ais = "number", agenda = "string", cas_odpovedi = "JsonDate",}
	const enum SzrAiseoSzrsadeoDtoTypeLengths {}
	/**dto oveření ROS*/
	interface DetAdresyAiseoDlgInputDto {
		/**Autogenerated.*/
		aifo?: string|null;
		/**typAde.*/
		typAde?: number|null;
		/**porCislo.*/
		porCislo?: number|null;
	}
	const enum DetAdresyAiseoDlgInputDtoNames { aifo = "aifo", typAde = "typAde", porCislo = "porCislo",}
	const enum DetAdresyAiseoDlgInputDtoFragments { aifo = "*", typAde = "*", porCislo = "*",}
	const enum DetAdresyAiseoDlgInputDtoTypes { aifo = "string", typAde = "number", porCislo = "number",}
	const enum DetAdresyAiseoDlgInputDtoTypeLengths {}
	/**dto oveření ROS*/
	interface DetOsobyAiseoDlgInputDto {
		/**Autogenerated.*/
		aifo?: string|null;
	}
	const enum DetOsobyAiseoDlgInputDtoNames { aifo = "aifo",}
	const enum DetOsobyAiseoDlgInputDtoFragments { aifo = "*",}
	const enum DetOsobyAiseoDlgInputDtoTypes { aifo = "string",}
	const enum DetOsobyAiseoDlgInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\ISZR\Dto\GIszrCommonDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**dto pro navrat z hledani*/
	interface GIszrDtoNavratZHledani {
		/**list SZRS OST*/
		SzrsrosDtoOst?: Gordic.Esu.WebClient.GSzrsrosDtoOst[]|null;
		/**list SZRS Oag*/
		SzrsrosDtoOag?: Gordic.Esu.WebClient.GSzrsrosDtoOag[]|null;
		/**list SZRS Pro*/
		SzrsrosDtoPro?: Gordic.Esu.WebClient.GSzrsrosDtoPro[]|null;
		/**list SZRS Das vyfiltrovany datovky*/
		SzrsrosDtoDas?: Gordic.Esu.WebClient.GSzrsrosDtoDas[]|null;
		/**list SZRS Das vyfiltrovany datovky*/
		SzrsrosDtoDasDetail?: Gordic.Esu.WebClient.GSzrsrosDtoDas[]|null;
		/**Rob osoby*/
		SzrsosfDto?: Gordic.Esu.WebClient.GSzrsosfDto[]|null;
		/**Rob osoby*/
		SzrsossDto?: Gordic.Esu.WebClient.GSzrsossDto[]|null;
		/**Rob osoby*/
		SzrsosaDto?: Gordic.Esu.WebClient.GSzrsosaDto[]|null;
		/**Rob osoby*/
		SzrsosoDto?: Gordic.Esu.WebClient.GSzrsosoDto[]|null;
		/**Rob osoby*/
		SzrsprfDto?: Gordic.Esu.WebClient.GSzrsprfDto[]|null;
		/**Rob osoby*/
		SzrsprsDto?: Gordic.Esu.WebClient.GSzrsprsDto[]|null;
		/**Rob osoby*/
		SzrsosnDto?: Gordic.Esu.WebClient.GSzrsosnDto[]|null;
		/**Szrsosn*/
		PocetSzrsosn?: number|null;
		/**priznak*/
		prizSzrsoag?: boolean|null;
		/**vybranny radek*/
		selectedoagRow?: Gordic.Esu.WebClient.GSzrsrosDtoOag|null;
		/**vybranny radek*/
		VyberZRosItemsDto?: Gordic.Esu.WebClient.GVyberZRosItemsDto|null;
		/**typ Organizace*/
		TypOrg?: number|null;
		/**Právní forma*/
		PrForma?: string|null;
	}
	const enum GIszrDtoNavratZHledaniNames { SzrsrosDtoOst = "SzrsrosDtoOst", SzrsrosDtoOag = "SzrsrosDtoOag", SzrsrosDtoPro = "SzrsrosDtoPro", SzrsrosDtoDas = "SzrsrosDtoDas", SzrsrosDtoDasDetail = "SzrsrosDtoDasDetail", SzrsosfDto = "SzrsosfDto", SzrsossDto = "SzrsossDto", SzrsosaDto = "SzrsosaDto", SzrsosoDto = "SzrsosoDto", SzrsprfDto = "SzrsprfDto", SzrsprsDto = "SzrsprsDto", SzrsosnDto = "SzrsosnDto", PocetSzrsosn = "PocetSzrsosn", prizSzrsoag = "prizSzrsoag", selectedoagRow = "selectedoagRow", VyberZRosItemsDto = "VyberZRosItemsDto", TypOrg = "TypOrg", PrForma = "PrForma",}
	const enum GIszrDtoNavratZHledaniFragments { SzrsrosDtoOst = "*", SzrsrosDtoOag = "*", SzrsrosDtoPro = "*", SzrsrosDtoDas = "*", SzrsrosDtoDasDetail = "*", SzrsosfDto = "*", SzrsossDto = "*", SzrsosaDto = "*", SzrsosoDto = "*", SzrsprfDto = "*", SzrsprsDto = "*", SzrsosnDto = "*", PocetSzrsosn = "*", prizSzrsoag = "*", selectedoagRow = "*", VyberZRosItemsDto = "*", TypOrg = "*", PrForma = "*",}
	const enum GIszrDtoNavratZHledaniTypes { SzrsrosDtoOst = "Gordic.Esu.WebClient.GSzrsrosDtoOst[]", SzrsrosDtoOag = "Gordic.Esu.WebClient.GSzrsrosDtoOag[]", SzrsrosDtoPro = "Gordic.Esu.WebClient.GSzrsrosDtoPro[]", SzrsrosDtoDas = "Gordic.Esu.WebClient.GSzrsrosDtoDas[]", SzrsrosDtoDasDetail = "Gordic.Esu.WebClient.GSzrsrosDtoDas[]", SzrsosfDto = "Gordic.Esu.WebClient.GSzrsosfDto[]", SzrsossDto = "Gordic.Esu.WebClient.GSzrsossDto[]", SzrsosaDto = "Gordic.Esu.WebClient.GSzrsosaDto[]", SzrsosoDto = "Gordic.Esu.WebClient.GSzrsosoDto[]", SzrsprfDto = "Gordic.Esu.WebClient.GSzrsprfDto[]", SzrsprsDto = "Gordic.Esu.WebClient.GSzrsprsDto[]", SzrsosnDto = "Gordic.Esu.WebClient.GSzrsosnDto[]", PocetSzrsosn = "number", prizSzrsoag = "boolean", selectedoagRow = "Gordic.Esu.WebClient.GSzrsrosDtoOag", VyberZRosItemsDto = "Gordic.Esu.WebClient.GVyberZRosItemsDto", TypOrg = "number", PrForma = "string",}
	/**dto pro navrat z hledani*/
	interface GOveritOsobuVRobZRosRetVal {
		/**jmeno*/
		Jmeno?: string|null;
		/**Právní forma*/
		Prijmeni?: string|null;
	}
	const enum GOveritOsobuVRobZRosRetValNames { Jmeno = "Jmeno", Prijmeni = "Prijmeni",}
	const enum GOveritOsobuVRobZRosRetValFragments { Jmeno = "*", Prijmeni = "*",}
	const enum GOveritOsobuVRobZRosRetValTypes { Jmeno = "string", Prijmeni = "string",}
	/**dto k vyberu z ros DataTab*/
	interface GVyberZRosDataTabDto {
		/**jmeno*/
		txtIco?: string|null;
		/**aifo*/
		txtAifo?: string|null;
		/**txtNazev*/
		txtNazev?: string|null;
		/**PravniForma*/
		txtPravniForma?: string|null;
		/**PravniStav*/
		txtPravniStav?: string|null;
		/**Adresa*/
		txtAdresa?: string|null;
		/**GridProvozovna*/
		GridProvozovna?: Gordic.Esu.WebClient.GVyberZRosDataTabGridProvozovnaDto[]|null;
		/**GridStatutari*/
		GridStatutari?: Gordic.Esu.WebClient.GVyberZRosDataTabGridStatutariDto[]|null;
		/**Datovky*/
		GridDatovky?: Gordic.Esu.WebClient.GVyberZRosDataTabGridDatovkyDto[]|null;
	}
	const enum GVyberZRosDataTabDtoNames { txtIco = "txtIco", txtAifo = "txtAifo", txtNazev = "txtNazev", txtPravniForma = "txtPravniForma", txtPravniStav = "txtPravniStav", txtAdresa = "txtAdresa", GridProvozovna = "GridProvozovna", GridStatutari = "GridStatutari", GridDatovky = "GridDatovky",}
	const enum GVyberZRosDataTabDtoFragments { txtIco = "*", txtAifo = "*", txtNazev = "*", txtPravniForma = "*", txtPravniStav = "*", txtAdresa = "*", GridProvozovna = "*", GridStatutari = "*", GridDatovky = "*",}
	const enum GVyberZRosDataTabDtoTypes { txtIco = "string", txtAifo = "string", txtNazev = "string", txtPravniForma = "string", txtPravniStav = "string", txtAdresa = "string", GridProvozovna = "Gordic.Esu.WebClient.GVyberZRosDataTabGridProvozovnaDto[]", GridStatutari = "Gordic.Esu.WebClient.GVyberZRosDataTabGridStatutariDto[]", GridDatovky = "Gordic.Esu.WebClient.GVyberZRosDataTabGridDatovkyDto[]",}
	/**dto k vyberu z ros DataTab grid Provozovna*/
	interface GVyberZRosDataTabGridProvozovnaDto {
		/**icp*/
		icp?: JsonDecimal|null;
		/**adresa*/
		adresa?: string|null;
		/**dat_zahaj_cinnosti*/
		dat_zahaj_cinnosti?: JsonDate|null;
		/**dat_ukonc_cinnosti*/
		dat_ukonc_cinnosti?: JsonDate|null;
	}
	const enum GVyberZRosDataTabGridProvozovnaDtoNames { icp = "icp", adresa = "adresa", dat_zahaj_cinnosti = "dat_zahaj_cinnosti", dat_ukonc_cinnosti = "dat_ukonc_cinnosti",}
	const enum GVyberZRosDataTabGridProvozovnaDtoFragments { icp = "*", adresa = "*", dat_zahaj_cinnosti = "*", dat_ukonc_cinnosti = "*",}
	const enum GVyberZRosDataTabGridProvozovnaDtoTypes { icp = "JsonDecimal", adresa = "string", dat_zahaj_cinnosti = "JsonDate", dat_ukonc_cinnosti = "JsonDate",}
	/**dto k vyberu z ros DataTab grid Provozovna*/
	interface GVyberZRosDataTabGridStatutariDto {
		/**osoba_ico*/
		osoba_ico?: number|null;
		/**aifo*/
		aifo?: string|null;
		/**nazev_osoby*/
		nazev_osoby?: string|null;
		/**adresa*/
		adresa?: string|null;
	}
	const enum GVyberZRosDataTabGridStatutariDtoNames { osoba_ico = "osoba_ico", aifo = "aifo", nazev_osoby = "nazev_osoby", adresa = "adresa",}
	const enum GVyberZRosDataTabGridStatutariDtoFragments { osoba_ico = "*", aifo = "*", nazev_osoby = "*", adresa = "*",}
	const enum GVyberZRosDataTabGridStatutariDtoTypes { osoba_ico = "number", aifo = "string", nazev_osoby = "string", adresa = "string",}
	/**dto k vyberu z ros DataTab grid Datovky*/
	interface GVyberZRosDataTabGridDatovkyDto {
		/**ico_ds*/
		ico_ds?: string|null;
		/**id_ds*/
		id_ds?: string|null;
		/**typ_dat_schranky*/
		typ_dat_schranky?: string|null;
		/**typ_dat_schranky_txt*/
		typ_dat_schranky_txt?: string|null;
		/**dat_schr_stav*/
		dat_schr_stav?: number|null;
	}
	const enum GVyberZRosDataTabGridDatovkyDtoNames { ico_ds = "ico_ds", id_ds = "id_ds", typ_dat_schranky = "typ_dat_schranky", typ_dat_schranky_txt = "typ_dat_schranky_txt", dat_schr_stav = "dat_schr_stav",}
	const enum GVyberZRosDataTabGridDatovkyDtoFragments { ico_ds = "*", id_ds = "*", typ_dat_schranky = "*", typ_dat_schranky_txt = "*", dat_schr_stav = "*",}
	const enum GVyberZRosDataTabGridDatovkyDtoTypes { ico_ds = "string", id_ds = "string", typ_dat_schranky = "string", typ_dat_schranky_txt = "string", dat_schr_stav = "number",}
	/**dto k vyberu z ros DataTab grid Datovky*/
	interface GVypisudajuRetDto {
		/**Message*/
		Message?: string|null;
		/**Id_txt*/
		Id_txt?: string|null;
		/**ZadanPozadavek*/
		ZadanPozadavek?: boolean|null;
	}
	const enum GVypisudajuRetDtoNames { Message = "Message", Id_txt = "Id_txt", ZadanPozadavek = "ZadanPozadavek",}
	const enum GVypisudajuRetDtoFragments { Message = "*", Id_txt = "*", ZadanPozadavek = "*",}
	const enum GVypisudajuRetDtoTypes { Message = "string", Id_txt = "string", ZadanPozadavek = "boolean",}
	/**dto k vyberu z ros DataTab grid Datovky*/
	interface GDonacteniAifaRetDto {
		/**Message*/
		Aifo?: string|null;
		/**Id_txt*/
		Stupen_ver?: number|null;
	}
	const enum GDonacteniAifaRetDtoNames { Aifo = "Aifo", Stupen_ver = "Stupen_ver",}
	const enum GDonacteniAifaRetDtoFragments { Aifo = "*", Stupen_ver = "*",}
	const enum GDonacteniAifaRetDtoTypes { Aifo = "string", Stupen_ver = "number",}
	/**dto k vyberu z ros DataTab grid Datovky*/
	interface GVypisVyzvednoutRetDto {
		/**Message*/
		Message?: string|null;
		/**Id_txt*/
		IdTisk?: string|null;
		/**ZadanPozadavek*/
		UspesneVyzvednutPozadavek?: boolean|null;
		/**ZadanPozadavek*/
		datumDo?: JsonDate|null;
	}
	const enum GVypisVyzvednoutRetDtoNames { Message = "Message", IdTisk = "IdTisk", UspesneVyzvednutPozadavek = "UspesneVyzvednutPozadavek", datumDo = "datumDo",}
	const enum GVypisVyzvednoutRetDtoFragments { Message = "*", IdTisk = "*", UspesneVyzvednutPozadavek = "*", datumDo = "*",}
	const enum GVypisVyzvednoutRetDtoTypes { Message = "string", IdTisk = "string", UspesneVyzvednutPozadavek = "boolean", datumDo = "JsonDate",}
	/**dto k vyberu z ros DataTab grid Datovky*/
	interface GRuianOrigAdresaDto {
		/**Obec*/
		OrigObec?: string|null;
		/**CastObce*/
		OrigCastObce?: string|null;
		/**Ulice*/
		OrigUlice?: string|null;
		/**typ*/
		Origtyp?: string|null;
		/**CisOrTyp*/
		OrigCisOrTyp?: string|null;
		/**CisOrTyp*/
		OrigCisOrPismeno?: string|null;
		/**CisOrientacni*/
		OrigCisOrientacni?: string|null;
		/**OrigPosta*/
		OrigPosta?: string|null;
		/**OrigCisPopisne*/
		OrigCisPopisne?: string|null;
		/**OrigObecKod*/
		OrigObec_Kod?: number|null;
		/**OrigObecKod*/
		OrigOkres_Kod?: number|null;
		/**OrigCast_Obce_Kod*/
		OrigCast_Obce_Kod?: number|null;
		/**OrigUlice_Kod*/
		OrigUlice_Kod?: number|null;
		/**OrigPosta_kod*/
		OrigPosta_Kod?: number|null;
		/**adresni_misto_kod*/
		Adresni_misto_kod?: number|null;
	}
	const enum GRuianOrigAdresaDtoNames { OrigObec = "OrigObec", OrigCastObce = "OrigCastObce", OrigUlice = "OrigUlice", Origtyp = "Origtyp", OrigCisOrTyp = "OrigCisOrTyp", OrigCisOrPismeno = "OrigCisOrPismeno", OrigCisOrientacni = "OrigCisOrientacni", OrigPosta = "OrigPosta", OrigCisPopisne = "OrigCisPopisne", OrigObec_Kod = "OrigObec_Kod", OrigOkres_Kod = "OrigOkres_Kod", OrigCast_Obce_Kod = "OrigCast_Obce_Kod", OrigUlice_Kod = "OrigUlice_Kod", OrigPosta_Kod = "OrigPosta_Kod", Adresni_misto_kod = "Adresni_misto_kod",}
	const enum GRuianOrigAdresaDtoFragments { OrigObec = "*", OrigCastObce = "*", OrigUlice = "*", Origtyp = "*", OrigCisOrTyp = "*", OrigCisOrPismeno = "*", OrigCisOrientacni = "*", OrigPosta = "*", OrigCisPopisne = "*", OrigObec_Kod = "*", OrigOkres_Kod = "*", OrigCast_Obce_Kod = "*", OrigUlice_Kod = "*", OrigPosta_Kod = "*", Adresni_misto_kod = "*",}
	const enum GRuianOrigAdresaDtoTypes { OrigObec = "string", OrigCastObce = "string", OrigUlice = "string", Origtyp = "string", OrigCisOrTyp = "string", OrigCisOrPismeno = "string", OrigCisOrientacni = "string", OrigPosta = "string", OrigCisPopisne = "string", OrigObec_Kod = "number", OrigOkres_Kod = "number", OrigCast_Obce_Kod = "number", OrigUlice_Kod = "number", OrigPosta_Kod = "number", Adresni_misto_kod = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\ISZR\Dto\GSzrsrobDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**dto szr ROB*/
	interface GSzrsrobDto {
		/**Autogenerated.*/
		aifo?: string|null;
		/**Autogenerated.*/
		adresni_misto_kod?: number|null;
		/**Autogenerated.*/
		stav_adr_pobytu?: number|null;
		/**Autogenerated.*/
		datum_narozeni?: JsonDate|null;
		/**Autogenerated.*/
		datum_umrti?: JsonDate|null;
		/**Autogenerated.*/
		dat_prav_moc_umrti?: JsonDate|null;
		/**Autogenerated.*/
		jmeno?: string|null;
		/**Autogenerated.*/
		prijmeni?: string|null;
		/**Autogenerated.*/
		stav_doruc_adr?: number|null;
		/**Autogenerated.*/
		doruc_adr_cr?: number|null;
		/**Autogenerated.*/
		doruc_adr_ostatni?: string|null;
		/**Autogenerated.*/
		stav_misto_naroz?: number|null;
		/**Autogenerated.*/
		misto_naroz_cr?: number|null;
		/**Autogenerated.*/
		misto_naroz_svet?: string|null;
		/**Autogenerated.*/
		stav_misto_umrti?: number|null;
		/**Autogenerated.*/
		misto_umrti_cr?: number|null;
		/**Autogenerated.*/
		misto_umrti_svet?: string|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		ovm?: string|null;
		/**Autogenerated.*/
		ais?: number|null;
		/**Autogenerated.*/
		agenda?: string|null;
		/**Autogenerated.*/
		stat_kod_narozeni?: number|null;
		/**Autogenerated.*/
		stat_kod_umrti?: number|null;
		/**Autogenerated.*/
		id_ds?: string|null;
		/**Autogenerated.*/
		misto_nar_obec?: number|null;
		/**Autogenerated.*/
		misto_umr_obec?: number|null;
		/**Autogenerated.*/
		stav_id_ds?: number|null;
		/**Autogenerated.*/
		stav_datum_naroz?: number|null;
		/**Autogenerated.*/
		stav_datum_umrti?: number|null;
		/**Autogenerated.*/
		stav_dat_pra_umr?: number|null;
		/**Autogenerated.*/
		stav_jmeno?: number|null;
		/**Autogenerated.*/
		stav_prijmeni?: number|null;
		/**Autogenerated.*/
		stav_aifo?: number|null;
		/**Autogenerated.*/
		zmn_aifo?: JsonDate|null;
		/**Autogenerated.*/
		zmn_adr_pobytu?: JsonDate|null;
		/**Autogenerated.*/
		zmn_doruc_adr?: JsonDate|null;
		/**Autogenerated.*/
		zmn_misto_naroz?: JsonDate|null;
		/**Autogenerated.*/
		zmn_misto_umrti?: JsonDate|null;
		/**Autogenerated.*/
		zmn_id_ds?: JsonDate|null;
		/**Autogenerated.*/
		zmn_datum_naroz?: JsonDate|null;
		/**Autogenerated.*/
		zmn_datum_umrti?: JsonDate|null;
		/**Autogenerated.*/
		zmn_dat_pra_umr?: JsonDate|null;
		/**Autogenerated.*/
		zmn_jmeno?: JsonDate|null;
		/**Autogenerated.*/
		zmn_prijmeni?: JsonDate|null;
		/**Adresní místo textem*/
		AdresaRobRuianTxt?: string|null;
		/**Doručovací místo textem*/
		DorucAdresaRobRuianTxt?: string|null;
		/**Doručovací místo textem*/
		adresa_urad?: number|null;
	}
	const enum GSzrsrobDtoNames { aifo = "aifo", adresni_misto_kod = "adresni_misto_kod", stav_adr_pobytu = "stav_adr_pobytu", datum_narozeni = "datum_narozeni", datum_umrti = "datum_umrti", dat_prav_moc_umrti = "dat_prav_moc_umrti", jmeno = "jmeno", prijmeni = "prijmeni", stav_doruc_adr = "stav_doruc_adr", doruc_adr_cr = "doruc_adr_cr", doruc_adr_ostatni = "doruc_adr_ostatni", stav_misto_naroz = "stav_misto_naroz", misto_naroz_cr = "misto_naroz_cr", misto_naroz_svet = "misto_naroz_svet", stav_misto_umrti = "stav_misto_umrti", misto_umrti_cr = "misto_umrti_cr", misto_umrti_svet = "misto_umrti_svet", cas_odpovedi = "cas_odpovedi", ovm = "ovm", ais = "ais", agenda = "agenda", stat_kod_narozeni = "stat_kod_narozeni", stat_kod_umrti = "stat_kod_umrti", id_ds = "id_ds", misto_nar_obec = "misto_nar_obec", misto_umr_obec = "misto_umr_obec", stav_id_ds = "stav_id_ds", stav_datum_naroz = "stav_datum_naroz", stav_datum_umrti = "stav_datum_umrti", stav_dat_pra_umr = "stav_dat_pra_umr", stav_jmeno = "stav_jmeno", stav_prijmeni = "stav_prijmeni", stav_aifo = "stav_aifo", zmn_aifo = "zmn_aifo", zmn_adr_pobytu = "zmn_adr_pobytu", zmn_doruc_adr = "zmn_doruc_adr", zmn_misto_naroz = "zmn_misto_naroz", zmn_misto_umrti = "zmn_misto_umrti", zmn_id_ds = "zmn_id_ds", zmn_datum_naroz = "zmn_datum_naroz", zmn_datum_umrti = "zmn_datum_umrti", zmn_dat_pra_umr = "zmn_dat_pra_umr", zmn_jmeno = "zmn_jmeno", zmn_prijmeni = "zmn_prijmeni", AdresaRobRuianTxt = "AdresaRobRuianTxt", DorucAdresaRobRuianTxt = "DorucAdresaRobRuianTxt", adresa_urad = "adresa_urad",}
	const enum GSzrsrobDtoFragments { aifo = "*", adresni_misto_kod = "*", stav_adr_pobytu = "*", datum_narozeni = "*", datum_umrti = "*", dat_prav_moc_umrti = "*", jmeno = "*", prijmeni = "*", stav_doruc_adr = "*", doruc_adr_cr = "*", doruc_adr_ostatni = "*", stav_misto_naroz = "*", misto_naroz_cr = "*", misto_naroz_svet = "*", stav_misto_umrti = "*", misto_umrti_cr = "*", misto_umrti_svet = "*", cas_odpovedi = "*", ovm = "*", ais = "*", agenda = "*", stat_kod_narozeni = "*", stat_kod_umrti = "*", id_ds = "*", misto_nar_obec = "*", misto_umr_obec = "*", stav_id_ds = "*", stav_datum_naroz = "*", stav_datum_umrti = "*", stav_dat_pra_umr = "*", stav_jmeno = "*", stav_prijmeni = "*", stav_aifo = "*", zmn_aifo = "*", zmn_adr_pobytu = "*", zmn_doruc_adr = "*", zmn_misto_naroz = "*", zmn_misto_umrti = "*", zmn_id_ds = "*", zmn_datum_naroz = "*", zmn_datum_umrti = "*", zmn_dat_pra_umr = "*", zmn_jmeno = "*", zmn_prijmeni = "*", AdresaRobRuianTxt = "*", DorucAdresaRobRuianTxt = "*", adresa_urad = "*",}
	const enum GSzrsrobDtoTypes { aifo = "string", adresni_misto_kod = "number", stav_adr_pobytu = "number", datum_narozeni = "JsonDate", datum_umrti = "JsonDate", dat_prav_moc_umrti = "JsonDate", jmeno = "string", prijmeni = "string", stav_doruc_adr = "number", doruc_adr_cr = "number", doruc_adr_ostatni = "string", stav_misto_naroz = "number", misto_naroz_cr = "number", misto_naroz_svet = "string", stav_misto_umrti = "number", misto_umrti_cr = "number", misto_umrti_svet = "string", cas_odpovedi = "JsonDate", ovm = "string", ais = "number", agenda = "string", stat_kod_narozeni = "number", stat_kod_umrti = "number", id_ds = "string", misto_nar_obec = "number", misto_umr_obec = "number", stav_id_ds = "number", stav_datum_naroz = "number", stav_datum_umrti = "number", stav_dat_pra_umr = "number", stav_jmeno = "number", stav_prijmeni = "number", stav_aifo = "number", zmn_aifo = "JsonDate", zmn_adr_pobytu = "JsonDate", zmn_doruc_adr = "JsonDate", zmn_misto_naroz = "JsonDate", zmn_misto_umrti = "JsonDate", zmn_id_ds = "JsonDate", zmn_datum_naroz = "JsonDate", zmn_datum_umrti = "JsonDate", zmn_dat_pra_umr = "JsonDate", zmn_jmeno = "JsonDate", zmn_prijmeni = "JsonDate", AdresaRobRuianTxt = "string", DorucAdresaRobRuianTxt = "string", adresa_urad = "number",}
	const enum GSzrsrobDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\ISZR\Dto\GSzrsrosDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**dto oveření ROS*/
	interface GSzrsrosDtoOst {
		/**Autogenerated.*/
		ico?: number|null;
		/**Autogenerated.*/
		fo_textem?: string|null;
		/**Autogenerated.*/
		fo_textem_stav?: number|null;
		/**Autogenerated.*/
		adresni_misto_kod?: number|null;
		/**Autogenerated.*/
		adresa_textem?: string|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GSzrsrosDtoOstNames { ico = "ico", fo_textem = "fo_textem", fo_textem_stav = "fo_textem_stav", adresni_misto_kod = "adresni_misto_kod", adresa_textem = "adresa_textem", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSzrsrosDtoOstFragments { ico = "*", fo_textem = "*", fo_textem_stav = "*", adresni_misto_kod = "*", adresa_textem = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSzrsrosDtoOstTypes { ico = "number", fo_textem = "string", fo_textem_stav = "number", adresni_misto_kod = "number", adresa_textem = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	/**dto oveření ROS*/
	interface GSzrsrosDtoOag {
		/**Autogenerated.*/
		ico?: number|null;
		/**Autogenerated.*/
		kod_agendy?: string|null;
		/**Autogenerated.*/
		kod_ovm?: string|null;
		/**Autogenerated.*/
		nazev_osoby?: string|null;
		/**Autogenerated.*/
		stav_nazev_osoby?: number|null;
		/**Autogenerated.*/
		dat_vzniku_opravn?: JsonDate|null;
		/**Autogenerated.*/
		stav_dat_vzn_opr?: number|null;
		/**Autogenerated.*/
		dat_zaniku_opravn?: JsonDate|null;
		/**Autogenerated.*/
		stav_dat_zan_opr?: number|null;
		/**Autogenerated.*/
		adresni_misto_kod?: number|null;
		/**Autogenerated.*/
		adresa_textem?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		stav_adresa?: number|null;
	}
	const enum GSzrsrosDtoOagNames { ico = "ico", kod_agendy = "kod_agendy", kod_ovm = "kod_ovm", nazev_osoby = "nazev_osoby", stav_nazev_osoby = "stav_nazev_osoby", dat_vzniku_opravn = "dat_vzniku_opravn", stav_dat_vzn_opr = "stav_dat_vzn_opr", dat_zaniku_opravn = "dat_zaniku_opravn", stav_dat_zan_opr = "stav_dat_zan_opr", adresni_misto_kod = "adresni_misto_kod", adresa_textem = "adresa_textem", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cas_odpovedi = "cas_odpovedi", stav_adresa = "stav_adresa",}
	const enum GSzrsrosDtoOagFragments { ico = "*", kod_agendy = "*", kod_ovm = "*", nazev_osoby = "*", stav_nazev_osoby = "*", dat_vzniku_opravn = "*", stav_dat_vzn_opr = "*", dat_zaniku_opravn = "*", stav_dat_zan_opr = "*", adresni_misto_kod = "*", adresa_textem = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", cas_odpovedi = "*", stav_adresa = "*",}
	const enum GSzrsrosDtoOagTypes { ico = "number", kod_agendy = "string", kod_ovm = "string", nazev_osoby = "string", stav_nazev_osoby = "number", dat_vzniku_opravn = "JsonDate", stav_dat_vzn_opr = "number", dat_zaniku_opravn = "JsonDate", stav_dat_zan_opr = "number", adresni_misto_kod = "number", adresa_textem = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cas_odpovedi = "JsonDate", stav_adresa = "number",}
	/**dto oveření ROS*/
	interface GSzrsrosDtoPro {
		/**Autogenerated.*/
		icp?: JsonDecimal|null;
		/**Autogenerated.*/
		ico?: number|null;
		/**Autogenerated.*/
		dat_zahaj_cinnosti?: JsonDate|null;
		/**Autogenerated.*/
		stav_dat_zah_cin?: number|null;
		/**Autogenerated.*/
		dat_ukonc_cinnosti?: JsonDate|null;
		/**Autogenerated.*/
		stav_dat_uk_cin?: number|null;
		/**Autogenerated.*/
		adresni_misto_kod?: number|null;
		/**Autogenerated.*/
		adresa_textem?: string|null;
		/**Autogenerated.*/
		stav_adr_provoz?: number|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GSzrsrosDtoProNames { icp = "icp", ico = "ico", dat_zahaj_cinnosti = "dat_zahaj_cinnosti", stav_dat_zah_cin = "stav_dat_zah_cin", dat_ukonc_cinnosti = "dat_ukonc_cinnosti", stav_dat_uk_cin = "stav_dat_uk_cin", adresni_misto_kod = "adresni_misto_kod", adresa_textem = "adresa_textem", stav_adr_provoz = "stav_adr_provoz", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSzrsrosDtoProFragments { icp = "*", ico = "*", dat_zahaj_cinnosti = "*", stav_dat_zah_cin = "*", dat_ukonc_cinnosti = "*", stav_dat_uk_cin = "*", adresni_misto_kod = "*", adresa_textem = "*", stav_adr_provoz = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSzrsrosDtoProTypes { icp = "JsonDecimal", ico = "number", dat_zahaj_cinnosti = "JsonDate", stav_dat_zah_cin = "number", dat_ukonc_cinnosti = "JsonDate", stav_dat_uk_cin = "number", adresni_misto_kod = "number", adresa_textem = "string", stav_adr_provoz = "number", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	/**dto oveření ROS*/
	interface GSzrsrosDtoDas {
		/**Autogenerated.*/
		ico?: number|null;
		/**Autogenerated.*/
		id_ds?: string|null;
		/**Autogenerated.*/
		typ_dat_schranky?: number|null;
		/**Autogenerated.*/
		dat_schr_stav?: number|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GSzrsrosDtoDasNames { ico = "ico", id_ds = "id_ds", typ_dat_schranky = "typ_dat_schranky", dat_schr_stav = "dat_schr_stav", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSzrsrosDtoDasFragments { ico = "*", id_ds = "*", typ_dat_schranky = "*", dat_schr_stav = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSzrsrosDtoDasTypes { ico = "number", id_ds = "string", typ_dat_schranky = "number", dat_schr_stav = "number", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	/**dto oveření ros osoby*/
	interface GSzrsosfDto {
		/**Autogenerated.*/
		ico?: number|null;
		/**Autogenerated.*/
		aifo?: string|null;
		/**Autogenerated.*/
		fo_stav?: number|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		ovm?: string|null;
		/**Autogenerated.*/
		ais?: number|null;
		/**Autogenerated.*/
		agenda?: string|null;
	}
	const enum GSzrsosfDtoNames { ico = "ico", aifo = "aifo", fo_stav = "fo_stav", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ovm = "ovm", ais = "ais", agenda = "agenda",}
	const enum GSzrsosfDtoFragments { ico = "*", aifo = "*", fo_stav = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ovm = "*", ais = "*", agenda = "*",}
	const enum GSzrsosfDtoTypes { ico = "number", aifo = "string", fo_stav = "number", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ovm = "string", ais = "number", agenda = "string",}
	/**dto oveření ros osoby*/
	interface GSzrsossDto {
		/**Autogenerated.*/
		ico?: number|null;
		/**Autogenerated.*/
		osoba_ico?: number|null;
		/**Autogenerated.*/
		osoba_ico_stav?: number|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GSzrsossDtoNames { ico = "ico", osoba_ico = "osoba_ico", osoba_ico_stav = "osoba_ico_stav", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSzrsossDtoFragments { ico = "*", osoba_ico = "*", osoba_ico_stav = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSzrsossDtoTypes { ico = "number", osoba_ico = "number", osoba_ico_stav = "number", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	/**dto oveření ros osoby*/
	interface GSzrsosaDto {
		/**Autogenerated.*/
		ico?: number|null;
		/**Autogenerated.*/
		aifo?: string|null;
		/**Autogenerated.*/
		fo_stav?: number|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		ovm?: string|null;
		/**Autogenerated.*/
		ais?: number|null;
		/**Autogenerated.*/
		agenda?: string|null;
	}
	const enum GSzrsosaDtoNames { ico = "ico", aifo = "aifo", fo_stav = "fo_stav", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ovm = "ovm", ais = "ais", agenda = "agenda",}
	const enum GSzrsosaDtoFragments { ico = "*", aifo = "*", fo_stav = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ovm = "*", ais = "*", agenda = "*",}
	const enum GSzrsosaDtoTypes { ico = "number", aifo = "string", fo_stav = "number", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ovm = "string", ais = "number", agenda = "string",}
	/**dto oveření ros osoby*/
	interface GSzrsosoDto {
		/**Autogenerated.*/
		ico?: number|null;
		/**Autogenerated.*/
		id_zmeny?: JsonDecimal|null;
		/**Autogenerated.*/
		kod_pravni_formy?: number|null;
		/**Autogenerated.*/
		stav_prav_formy?: number|null;
		/**Autogenerated.*/
		kod_pravniho_stavu?: number|null;
		/**Autogenerated.*/
		stav_prav_stavu?: number|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GSzrsosoDtoNames { ico = "ico", id_zmeny = "id_zmeny", kod_pravni_formy = "kod_pravni_formy", stav_prav_formy = "stav_prav_formy", kod_pravniho_stavu = "kod_pravniho_stavu", stav_prav_stavu = "stav_prav_stavu", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSzrsosoDtoFragments { ico = "*", id_zmeny = "*", kod_pravni_formy = "*", stav_prav_formy = "*", kod_pravniho_stavu = "*", stav_prav_stavu = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSzrsosoDtoTypes { ico = "number", id_zmeny = "JsonDecimal", kod_pravni_formy = "number", stav_prav_formy = "number", kod_pravniho_stavu = "number", stav_prav_stavu = "number", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	/**dto oveření ros osoby*/
	interface GSzrsprfDto {
		/**Autogenerated.*/
		kod_pravni_formy?: number|null;
		/**Autogenerated.*/
		nazev_prav_formy?: string|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		typ_org?: number|null;
	}
	const enum GSzrsprfDtoNames { kod_pravni_formy = "kod_pravni_formy", nazev_prav_formy = "nazev_prav_formy", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_org = "typ_org",}
	const enum GSzrsprfDtoFragments { kod_pravni_formy = "*", nazev_prav_formy = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_org = "*",}
	const enum GSzrsprfDtoTypes { kod_pravni_formy = "number", nazev_prav_formy = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_org = "number",}
	/**dto oveření ros osoby*/
	interface GSzrsprsDto {
		/**Autogenerated.*/
		kod_pravniho_stavu?: number|null;
		/**Autogenerated.*/
		nazev_prav_stavu?: string|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
	}
	const enum GSzrsprsDtoNames { kod_pravniho_stavu = "kod_pravniho_stavu", nazev_prav_stavu = "nazev_prav_stavu", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSzrsprsDtoFragments { kod_pravniho_stavu = "*", nazev_prav_stavu = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSzrsprsDtoTypes { kod_pravniho_stavu = "number", nazev_prav_stavu = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	/**dto oveření ros osoby*/
	interface GSzrsosnDto {
		/**Autogenerated.*/
		ico?: number|null;
		/**Autogenerated.*/
		nazev_osoby?: string|null;
		/**Autogenerated.*/
		adresni_misto_kod?: number|null;
		/**Autogenerated.*/
		adresa_textem?: string|null;
		/**Autogenerated.*/
		cas_odpovedi?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		stav_stat_org?: number|null;
	}
	const enum GSzrsosnDtoNames { ico = "ico", nazev_osoby = "nazev_osoby", adresni_misto_kod = "adresni_misto_kod", adresa_textem = "adresa_textem", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_stat_org = "stav_stat_org",}
	const enum GSzrsosnDtoFragments { ico = "*", nazev_osoby = "*", adresni_misto_kod = "*", adresa_textem = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", stav_stat_org = "*",}
	const enum GSzrsosnDtoTypes { ico = "number", nazev_osoby = "string", adresni_misto_kod = "number", adresa_textem = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_stat_org = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\ISZR\Dto\GVyberZRobItemsDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto pro práci s  rob*/
	interface GVyberZRobItemsDto {
		/**IszrZadostId*/
		IszrZadostId?: string|null;
		/**IxsEsu*/
		IxsEsu?: string|null;
		/**IxsEko*/
		IxsEko?: string|null;
		/**Nazev*/
		Nazev?: string|null;
		/**AdrKod*/
		AdrKod?: number|null;
		/**Duvod*/
		Duvod?: string|null;
		/**Agenda*/
		Agenda?: string|null;
		/**AgendovaRole*/
		AgendovaRole?: string|null;
		/**ResultImageUrl*/
		ResultImageUrl?: string|null;
		/**StatusText*/
		StatusText?: string|null;
		/**CasOdpovedi*/
		CasOdpovedi?: string|null;
		/**IszrEnabled*/
		IszrEnabled?: boolean|null;
		/**PostaKod*/
		PostaKod?: string|null;
		/**AdresaTxt*/
		AdresaTxt?: string|null;
		/**AdresaCheckboxChecked*/
		AdresaCheckboxChecked?: boolean|null;
		/**DiakritikaCheckboxChecked*/
		DiakritikaCheckboxChecked?: boolean|null;
		/**AifoText*/
		AifoText?: string|null;
		/**Prukaz*/
		Prukaz?: string|null;
		/**TypPrukazu*/
		TypPrukazu?: string|null;
		/**DatNarozeni*/
		DatNarozeni?: JsonDate|null;
		/**LicAdr*/
		LicAdr?: string|null;
		/**TypAdr*/
		TypAdr?: string|null;
		/**MistoNarozeniProPrebrani*/
		MistoNarozeniProPrebrani?: string|null;
		/**SrzAsynchronneCheckboxChecked*/
		SrzAsynchronneCheckboxChecked?: boolean|null;
		/**JmenoValue*/
		JmenoValue?: string|null;
		/**PrijmeniValue*/
		PrijmeniValue?: string|null;
		/**VysledekOvereni*/
		VysledekOvereni?: any|null;
		/**OdpovedInfo*/
		OdpovedInfo?: any|null;
		/**EditMode*/
		EditMode?: boolean|null;
		/**AfterFind*/
		AfterFind?: boolean|null;
		Ixp?: string|null;
		AktZnacka?: string|null;
		StavRobPrihlaseniZmen?: boolean|null;
		/**ScriptForExecute*/
		Message?: string|null;
	}
	const enum GVyberZRobItemsDtoNames { IszrZadostId = "IszrZadostId", IxsEsu = "IxsEsu", IxsEko = "IxsEko", Nazev = "Nazev", AdrKod = "AdrKod", Duvod = "Duvod", Agenda = "Agenda", AgendovaRole = "AgendovaRole", ResultImageUrl = "ResultImageUrl", StatusText = "StatusText", CasOdpovedi = "CasOdpovedi", IszrEnabled = "IszrEnabled", PostaKod = "PostaKod", AdresaTxt = "AdresaTxt", AdresaCheckboxChecked = "AdresaCheckboxChecked", DiakritikaCheckboxChecked = "DiakritikaCheckboxChecked", AifoText = "AifoText", Prukaz = "Prukaz", TypPrukazu = "TypPrukazu", DatNarozeni = "DatNarozeni", LicAdr = "LicAdr", TypAdr = "TypAdr", MistoNarozeniProPrebrani = "MistoNarozeniProPrebrani", SrzAsynchronneCheckboxChecked = "SrzAsynchronneCheckboxChecked", JmenoValue = "JmenoValue", PrijmeniValue = "PrijmeniValue", VysledekOvereni = "VysledekOvereni", OdpovedInfo = "OdpovedInfo", EditMode = "EditMode", AfterFind = "AfterFind", Ixp = "Ixp", AktZnacka = "AktZnacka", StavRobPrihlaseniZmen = "StavRobPrihlaseniZmen", Message = "Message",}
	const enum GVyberZRobItemsDtoFragments { IszrZadostId = "*", IxsEsu = "*", IxsEko = "*", Nazev = "*", AdrKod = "*", Duvod = "*", Agenda = "*", AgendovaRole = "*", ResultImageUrl = "*", StatusText = "*", CasOdpovedi = "*", IszrEnabled = "*", PostaKod = "*", AdresaTxt = "*", AdresaCheckboxChecked = "*", DiakritikaCheckboxChecked = "*", AifoText = "*", Prukaz = "*", TypPrukazu = "*", DatNarozeni = "*", LicAdr = "*", TypAdr = "*", MistoNarozeniProPrebrani = "*", SrzAsynchronneCheckboxChecked = "*", JmenoValue = "*", PrijmeniValue = "*", VysledekOvereni = "*", OdpovedInfo = "*", EditMode = "*", AfterFind = "*", Ixp = "*", AktZnacka = "*", StavRobPrihlaseniZmen = "*", Message = "*",}
	const enum GVyberZRobItemsDtoTypes { IszrZadostId = "string", IxsEsu = "string", IxsEko = "string", Nazev = "string", AdrKod = "number", Duvod = "string", Agenda = "string", AgendovaRole = "string", ResultImageUrl = "string", StatusText = "string", CasOdpovedi = "string", IszrEnabled = "boolean", PostaKod = "string", AdresaTxt = "string", AdresaCheckboxChecked = "boolean", DiakritikaCheckboxChecked = "boolean", AifoText = "string", Prukaz = "string", TypPrukazu = "string", DatNarozeni = "JsonDate", LicAdr = "string", TypAdr = "string", MistoNarozeniProPrebrani = "string", SrzAsynchronneCheckboxChecked = "boolean", JmenoValue = "string", PrijmeniValue = "string", VysledekOvereni = "any", OdpovedInfo = "any", EditMode = "boolean", AfterFind = "boolean", Ixp = "string", AktZnacka = "string", StavRobPrihlaseniZmen = "boolean", Message = "string",}
	const enum GVyberZRobItemsDtoTypeLengths {}
	interface GVyberZRobHledatRet {
		/**IszrZadostId*/
		SzrList?: Gordic.Esu.WebClient.GSzrsrobDto[]|null;
		/**gen*/
		IszrZadostId?: string|null;
		/**gen*/
		StatusText?: string|null;
		/**gen*/
		VysledekOvereni?: any|null;
		/**gen*/
		OdpovedInfo?: any|null;
		/**gen*/
		Message?: string|null;
	}
	const enum GVyberZRobHledatRetNames { SzrList = "SzrList", IszrZadostId = "IszrZadostId", StatusText = "StatusText", VysledekOvereni = "VysledekOvereni", OdpovedInfo = "OdpovedInfo", Message = "Message",}
	const enum GVyberZRobHledatRetFragments { SzrList = "*", IszrZadostId = "*", StatusText = "*", VysledekOvereni = "*", OdpovedInfo = "*", Message = "*",}
	const enum GVyberZRobHledatRetTypes { SzrList = "Gordic.Esu.WebClient.GSzrsrobDto[]", IszrZadostId = "string", StatusText = "string", VysledekOvereni = "any", OdpovedInfo = "any", Message = "string",}
	const enum GVyberZRobHledatRetTypeLengths {}
	interface GVyberZRobCallRet {
		/**gen*/
		StatusText?: string|null;
		/**gen*/
		Message?: string|null;
	}
	const enum GVyberZRobCallRetNames { StatusText = "StatusText", Message = "Message",}
	const enum GVyberZRobCallRetFragments { StatusText = "*", Message = "*",}
	const enum GVyberZRobCallRetTypes { StatusText = "string", Message = "string",}
	const enum GVyberZRobCallRetTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\ISZR\Dto\GVyberZRostemsDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto pro práci s ros*/
	interface GVyberZRosItemsDto {
		/**IszrZadostId*/
		IszrZadostId?: string|null;
		/**IxsEsu*/
		IxsEsu?: string|null;
		/**Nazev*/
		Nazev?: string|null;
		/**AdrKod*/
		AdrKod?: number|null;
		/**Duvod*/
		Duvod?: string|null;
		/**Agenda*/
		Agenda?: string|null;
		/**AgendovaRole*/
		AgendovaRole?: string|null;
		/**ResultImageUrl*/
		ResultImageUrl?: string|null;
		/**StatusText*/
		StatusText?: string|null;
		/**CasOdpovedi*/
		CasOdpovedi?: string|null;
		/**IszrEnabled*/
		IszrEnabled?: boolean|null;
		/**PostaKod*/
		PostaKod?: string|null;
		/**LicAdr*/
		LicAdr?: string|null;
		/**TypAdr*/
		TypAdr?: string|null;
		/**IcoValue*/
		IcoValue?: string|null;
		/**SrzAsynchronneCheckboxChecked*/
		SrzAsynchronneCheckboxChecked?: boolean|null;
		/**IdValue*/
		IdValue?: string|null;
		/**VysledekOvereni*/
		VysledekOvereni?: any|null;
		/**OdpovedInfo*/
		OdpovedInfo?: any|null;
		/**iXP*/
		Ixp?: string|null;
		/**Akt znacka*/
		AktZnacka?: string|null;
		/**Stav RosPrihlaseniZmen*/
		StavRosPrihlaseniZmen?: boolean|null;
		/**zpráva*/
		Message?: string|null;
		/**Stav RosPrihlaseniZmen*/
		provedenoOvereni?: boolean|null;
	}
	const enum GVyberZRosItemsDtoNames { IszrZadostId = "IszrZadostId", IxsEsu = "IxsEsu", Nazev = "Nazev", AdrKod = "AdrKod", Duvod = "Duvod", Agenda = "Agenda", AgendovaRole = "AgendovaRole", ResultImageUrl = "ResultImageUrl", StatusText = "StatusText", CasOdpovedi = "CasOdpovedi", IszrEnabled = "IszrEnabled", PostaKod = "PostaKod", LicAdr = "LicAdr", TypAdr = "TypAdr", IcoValue = "IcoValue", SrzAsynchronneCheckboxChecked = "SrzAsynchronneCheckboxChecked", IdValue = "IdValue", VysledekOvereni = "VysledekOvereni", OdpovedInfo = "OdpovedInfo", Ixp = "Ixp", AktZnacka = "AktZnacka", StavRosPrihlaseniZmen = "StavRosPrihlaseniZmen", Message = "Message", provedenoOvereni = "provedenoOvereni",}
	const enum GVyberZRosItemsDtoFragments { IszrZadostId = "*", IxsEsu = "*", Nazev = "*", AdrKod = "*", Duvod = "*", Agenda = "*", AgendovaRole = "*", ResultImageUrl = "*", StatusText = "*", CasOdpovedi = "*", IszrEnabled = "*", PostaKod = "*", LicAdr = "*", TypAdr = "*", IcoValue = "*", SrzAsynchronneCheckboxChecked = "*", IdValue = "*", VysledekOvereni = "*", OdpovedInfo = "*", Ixp = "*", AktZnacka = "*", StavRosPrihlaseniZmen = "*", Message = "*", provedenoOvereni = "*",}
	const enum GVyberZRosItemsDtoTypes { IszrZadostId = "string", IxsEsu = "string", Nazev = "string", AdrKod = "number", Duvod = "string", Agenda = "string", AgendovaRole = "string", ResultImageUrl = "string", StatusText = "string", CasOdpovedi = "string", IszrEnabled = "boolean", PostaKod = "string", LicAdr = "string", TypAdr = "string", IcoValue = "string", SrzAsynchronneCheckboxChecked = "boolean", IdValue = "string", VysledekOvereni = "any", OdpovedInfo = "any", Ixp = "string", AktZnacka = "string", StavRosPrihlaseniZmen = "boolean", Message = "string", provedenoOvereni = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Ostatni\Dto\HistorieEsuInputDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Vstupní Dto pro Esu Historii*/
	interface HistorieEsuInputDto {
		/**Identifikátor Ixp*/
		ixsEsu?: string|null;
		/**identifikator*/
		ixs_fun_akt?: string|null;
	}
	const enum HistorieEsuInputDtoNames { ixsEsu = "ixsEsu", ixs_fun_akt = "ixs_fun_akt",}
	const enum HistorieEsuInputDtoFragments { ixsEsu = "*", ixs_fun_akt = "*",}
	const enum HistorieEsuInputDtoTypes { ixsEsu = "string", ixs_fun_akt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Prefabs\Prefabs.d.ts 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Esu.WebClient.Prefabs.d.ts                           </Name>
//    <Description>                                                             </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018                            </Copyright>
//    <Created>     2018-03-20                                                  </Created>
//  </FileHeader>


declare namespace Gordic.Esu.Prefabs {
    
    /**
     * prefab vyberu esu
     * @autor DSebesta
     * @param {object} options
     */
    function vyberEsu(options: {
        /**
        * Default=Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectMultiEsuAndZo
        */
        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka, 
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani, //{ Ixp: '', DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.xxx, AktZnacka: '', DuvodHledaniTxt:"" }
        FieldsToFilterpanel?: Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter []
        IdSimpleMode?: string, // por různe uložení oblbíbených
        VyberEsuTypItemTemplateOpt?: Gordic.Esu.Globals.Enums.VyberEsuTypItemTemplate, // přetižení itemTemplate
        InsolvecneButtonEnable?: boolean, // povplovačka indikace INsolvence 
        IszrButtonEnable?: boolean, // povplovačka indikace ISZR
        BuButtonEnable?: boolean, // povplovačka indikace BU
        DPHButtonEnable?: boolean, // povplovačka indikace DPH
        EditmodeDetailEsuEnable?: boolean, // zda otvírat detail ESU v Editačním modu
        StrictEnableChangeZoInDisabled?: boolean, //  specialita
        ModOtevreni?: Gordic.Global.Enums.ModOtevreni, // Mod otevření kartoteky
        VyberESUDialogClose?: (opt: any, retVal: any) => void // eventa, která informuje, že dialog otevřený z políčka esu byl zavřený => na základě toho lze předpokládat, že mohlo dojít ke změně dat ESU. 
    }): GSelectBoxOptions<Gordic.Esu.Interface.GGinsesuPolDto> 

    /**
     * prefab adresy
     * @autor DSebesta
     * @param {object} options
     */
    function adresa(options: {

        serverFilters?: boolean,
        change?: (ev: any, changeObj:object)=>void,
        pathInModel?: string

    }): Gordic.Forms.FormRow

}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Prefabs\Dto\GAdresaDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto k prefabu adresy*/
	interface GAdresaDto {
		/**ulice*/
		ulice?: string|null;
		/**Číslo popisné.*/
		cPop?: string|null;
		/**Směrovačka.*/
		psc?: string|null;
		/**Číslo orientační*/
		cOr?: string|null;
		/**Část obce*/
		castObce?: string|null;
		/**Část obce*/
		obec?: string|null;
		/**Pobox*/
		pobox?: string|null;
		/**Stát*/
		stat?: number|null;
	}
	const enum GAdresaDtoNames { ulice = "ulice", cPop = "cPop", psc = "psc", cOr = "cOr", castObce = "castObce", obec = "obec", pobox = "pobox", stat = "stat",}
	const enum GAdresaDtoFragments { ulice = "*", cPop = "*", psc = "*", cOr = "*", castObce = "*", obec = "*", pobox = "*", stat = "*",}
	const enum GAdresaDtoTypes { ulice = "string", cPop = "string", psc = "string", cOr = "string", castObce = "string", obec = "string", pobox = "string", stat = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Psr\Dto\GVyberZRobItemsDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto pro práci s  psr*/
	interface GVyberZPsrItemsDto {
		/**IszrZadostId*/
		IszrZadostId?: string|null;
		/**IxsEsu*/
		IxsEsu?: string|null;
		/**IxsEko*/
		IxsEko?: string|null;
		/**Nazev*/
		Nazev?: string|null;
		/**AdrKod*/
		AdrKod?: number|null;
		/**Duvod*/
		Duvod?: string|null;
		/**Agenda*/
		Agenda?: string|null;
		/**AgendovaRole*/
		AgendovaRole?: string|null;
		/**ResultImageUrl*/
		ResultImageUrl?: string|null;
		/**StatusText*/
		StatusText?: string|null;
		/**CasOdpovedi*/
		CasOdpovedi?: string|null;
		/**IszrEnabled*/
		IszrEnabled?: boolean|null;
		/**PostaKod*/
		PostaKod?: string|null;
		/**AdresaTxt*/
		AdresaTxt?: string|null;
		/**AdresaCheckboxChecked*/
		AdresaCheckboxChecked?: boolean|null;
		/**DiakritikaCheckboxChecked*/
		DiakritikaCheckboxChecked?: boolean|null;
		/**AifoText*/
		AifoText?: string|null;
		/**Prukaz*/
		Prukaz?: string|null;
		/**TypPrukazu*/
		TypPrukazu?: string|null;
		/**DatNarozeni*/
		DatNarozeni?: JsonDate|null;
		/**LicAdr*/
		LicAdr?: string|null;
		/**TypAdr*/
		TypAdr?: string|null;
		/**MistoNarozeniProPrebrani*/
		MistoNarozeniProPrebrani?: string|null;
		/**SrzAsynchronneCheckboxChecked*/
		SrzAsynchronneCheckboxChecked?: boolean|null;
		/**JmenoValue*/
		JmenoValue?: string|null;
		/**PrijmeniValue*/
		PrijmeniValue?: string|null;
		/**VysledekOvereni*/
		VysledekOvereni?: any|null;
		/**OdpovedInfo*/
		OdpovedInfo?: any|null;
		/**EditMode*/
		EditMode?: boolean|null;
		/**AfterFind*/
		AfterFind?: boolean|null;
		Ixp?: string|null;
		AktZnacka?: string|null;
		StavpsrPrihlaseniZmen?: boolean|null;
		/**ScriptForExecute*/
		Message?: string|null;
	}
	const enum GVyberZPsrItemsDtoNames { IszrZadostId = "IszrZadostId", IxsEsu = "IxsEsu", IxsEko = "IxsEko", Nazev = "Nazev", AdrKod = "AdrKod", Duvod = "Duvod", Agenda = "Agenda", AgendovaRole = "AgendovaRole", ResultImageUrl = "ResultImageUrl", StatusText = "StatusText", CasOdpovedi = "CasOdpovedi", IszrEnabled = "IszrEnabled", PostaKod = "PostaKod", AdresaTxt = "AdresaTxt", AdresaCheckboxChecked = "AdresaCheckboxChecked", DiakritikaCheckboxChecked = "DiakritikaCheckboxChecked", AifoText = "AifoText", Prukaz = "Prukaz", TypPrukazu = "TypPrukazu", DatNarozeni = "DatNarozeni", LicAdr = "LicAdr", TypAdr = "TypAdr", MistoNarozeniProPrebrani = "MistoNarozeniProPrebrani", SrzAsynchronneCheckboxChecked = "SrzAsynchronneCheckboxChecked", JmenoValue = "JmenoValue", PrijmeniValue = "PrijmeniValue", VysledekOvereni = "VysledekOvereni", OdpovedInfo = "OdpovedInfo", EditMode = "EditMode", AfterFind = "AfterFind", Ixp = "Ixp", AktZnacka = "AktZnacka", StavpsrPrihlaseniZmen = "StavpsrPrihlaseniZmen", Message = "Message",}
	const enum GVyberZPsrItemsDtoFragments { IszrZadostId = "*", IxsEsu = "*", IxsEko = "*", Nazev = "*", AdrKod = "*", Duvod = "*", Agenda = "*", AgendovaRole = "*", ResultImageUrl = "*", StatusText = "*", CasOdpovedi = "*", IszrEnabled = "*", PostaKod = "*", AdresaTxt = "*", AdresaCheckboxChecked = "*", DiakritikaCheckboxChecked = "*", AifoText = "*", Prukaz = "*", TypPrukazu = "*", DatNarozeni = "*", LicAdr = "*", TypAdr = "*", MistoNarozeniProPrebrani = "*", SrzAsynchronneCheckboxChecked = "*", JmenoValue = "*", PrijmeniValue = "*", VysledekOvereni = "*", OdpovedInfo = "*", EditMode = "*", AfterFind = "*", Ixp = "*", AktZnacka = "*", StavpsrPrihlaseniZmen = "*", Message = "*",}
	const enum GVyberZPsrItemsDtoTypes { IszrZadostId = "string", IxsEsu = "string", IxsEko = "string", Nazev = "string", AdrKod = "number", Duvod = "string", Agenda = "string", AgendovaRole = "string", ResultImageUrl = "string", StatusText = "string", CasOdpovedi = "string", IszrEnabled = "boolean", PostaKod = "string", AdresaTxt = "string", AdresaCheckboxChecked = "boolean", DiakritikaCheckboxChecked = "boolean", AifoText = "string", Prukaz = "string", TypPrukazu = "string", DatNarozeni = "JsonDate", LicAdr = "string", TypAdr = "string", MistoNarozeniProPrebrani = "string", SrzAsynchronneCheckboxChecked = "boolean", JmenoValue = "string", PrijmeniValue = "string", VysledekOvereni = "any", OdpovedInfo = "any", EditMode = "boolean", AfterFind = "boolean", Ixp = "string", AktZnacka = "string", StavpsrPrihlaseniZmen = "boolean", Message = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Rozdelovnik\Dto\GSkupinyTreeNode.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Stromové uzly*/
	interface GSkupinyTreeNode {
		/**Typ uzlu*/
		Typ?: Gordic.Esu.WebClient.TypUzluSkupiny|null;
		/**DataRow*/
		SkupinaRow?: any|null;
		/**Text*/
		Text?: string|null;
		/**icona*/
		ImageIndex?: number|null;
		/**typ_rzd*/
		typ_rzd?: number|null;
		/**poduzly*/
		Nodes?: Gordic.Esu.WebClient.GSkupinyTreeNode[]|null;
	}
	const enum GSkupinyTreeNodeNames { Typ = "Typ", SkupinaRow = "SkupinaRow", Text = "Text", ImageIndex = "ImageIndex", typ_rzd = "typ_rzd", Nodes = "Nodes",}
	const enum GSkupinyTreeNodeFragments { Typ = "*", SkupinaRow = "*", Text = "*", ImageIndex = "*", typ_rzd = "*", Nodes = "*",}
	const enum GSkupinyTreeNodeTypes { Typ = "Gordic.Esu.WebClient.TypUzluSkupiny", SkupinaRow = "any", Text = "string", ImageIndex = "number", typ_rzd = "number", Nodes = "Gordic.Esu.WebClient.GSkupinyTreeNode[]",}
	const enum GSkupinyTreeNodeTypeLengths {}
	/**Typ uzlu*/
	const enum TypUzluSkupiny {
		/**Skupina*/
		Skupina,
		/**Urad*/
		Urad,
		/**SpisovyUzel*/
		SpisovyUzel,
		/**Referent*/
		Referent,
	}
	/**Pracovní režim pro okno skupiny subjektů*/
	const enum EsuSkupinyWorkingMode {
		/**Běžný režim - neprobíhá automatické označení subjektů*/
		Normal,
		/**Režim výběru subjektů - při výběru skupiny probíhá automatické označení všech subjektů ze skupiny*/
		Select,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Rozdelovnik\Dto\RozdelovnikESUDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto pro esu audit*/
	interface RozdelovnikESUDto {
		/**Typ uzlu*/
		Typ?: Gordic.Esu.WebClient.TypUzluSkupiny|null;
		/**DataRow*/
		SkupinaRow?: any|null;
		/**Text*/
		Text?: string|null;
		/**Text*/
		TextNameOfGroup?: string|null;
		/**icona*/
		ImageIndex?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**ixs_fun_zal*/
		ixs_fun_zal?: string|null;
		/**ixs_rzd*/
		ixs_rzd?: string|null;
		/**odkaz na parenta*/
		p_ixs_rzd?: string|null;
		/**ixs_vlastnik*/
		ixs_vlastnik?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**typ_rzd*/
		typ_rzd?: number|null;
		/**typ_rzd_txt*/
		typ_rzd_txt?: string|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**zmenu_prov*/
		pravoModifikovat?: boolean|null;
		/**zmenu_prov*/
		pravoVytvoritNovy?: boolean|null;
	}
	const enum RozdelovnikESUDtoNames { Typ = "Typ", SkupinaRow = "SkupinaRow", Text = "Text", TextNameOfGroup = "TextNameOfGroup", ImageIndex = "ImageIndex", aktivita = "aktivita", dat_zmena = "dat_zmena", ixs_fun_zal = "ixs_fun_zal", ixs_rzd = "ixs_rzd", p_ixs_rzd = "p_ixs_rzd", ixs_vlastnik = "ixs_vlastnik", nazev = "nazev", poznamka = "poznamka", typ_rzd = "typ_rzd", typ_rzd_txt = "typ_rzd_txt", zmenu_prov = "zmenu_prov", pravoModifikovat = "pravoModifikovat", pravoVytvoritNovy = "pravoVytvoritNovy",}
	const enum RozdelovnikESUDtoFragments { Typ = "*", SkupinaRow = "*", Text = "*", TextNameOfGroup = "*", ImageIndex = "*", aktivita = "*", dat_zmena = "*", ixs_fun_zal = "*", ixs_rzd = "*", p_ixs_rzd = "*", ixs_vlastnik = "*", nazev = "*", poznamka = "*", typ_rzd = "*", typ_rzd_txt = "*", zmenu_prov = "*", pravoModifikovat = "*", pravoVytvoritNovy = "*",}
	const enum RozdelovnikESUDtoTypes { Typ = "Gordic.Esu.WebClient.TypUzluSkupiny", SkupinaRow = "any", Text = "string", TextNameOfGroup = "string", ImageIndex = "number", aktivita = "number", dat_zmena = "JsonDate", ixs_fun_zal = "string", ixs_rzd = "string", p_ixs_rzd = "string", ixs_vlastnik = "string", nazev = "string", poznamka = "string", typ_rzd = "number", typ_rzd_txt = "string", zmenu_prov = "string", pravoModifikovat = "boolean", pravoVytvoritNovy = "boolean",}
	const enum RozdelovnikESUDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Rozdelovnik\Dto\SeznamSubjektuVRozdelovnikuDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**Dto se Seznamem subjektu v rozdelovniku Dto*/
	interface SeznamSubjektuVRozdelovnikuDto {
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		typ_esu?: number|null;
		/**Autogenerated.*/
		esu_txt?: string|null;
		/**Autogenerated.*/
		lic?: string|null;
		/**Autogenerated.*/
		por_zast?: number|null;
		/**Autogenerated.*/
		zast_txt?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		aktivita_esu?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		dat_zmena_esu?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmp_txt?: string|null;
		/**Autogenerated.*/
		typ_vazby?: number|null;
		/**Autogenerated.*/
		ixs_dva?: string|null;
		/**Autogenerated.*/
		id_ds?: string|null;
		/**Autogenerated.*/
		id_gex?: string|null;
		/**Autogenerated.*/
		dat_akt_info_o_ds?: JsonDate|null;
		/**Autogenerated.*/
		dbstatus?: string|null;
		/**Autogenerated.*/
		nazev_dva?: string|null;
		/**Autogenerated.*/
		typ_vazby_txt?: string|null;
		/**Autogenerated.*/
		ico_ds?: string|null;
		/**Autogenerated.*/
		ico?: string|null;
	}
	const enum SeznamSubjektuVRozdelovnikuDtoNames { ixs_esu = "ixs_esu", typ_esu = "typ_esu", esu_txt = "esu_txt", lic = "lic", por_zast = "por_zast", zast_txt = "zast_txt", aktivita = "aktivita", aktivita_esu = "aktivita_esu", dat_zmena = "dat_zmena", dat_zmena_esu = "dat_zmena_esu", zmenu_prov = "zmenu_prov", zmp_txt = "zmp_txt", typ_vazby = "typ_vazby", ixs_dva = "ixs_dva", id_ds = "id_ds", id_gex = "id_gex", dat_akt_info_o_ds = "dat_akt_info_o_ds", dbstatus = "dbstatus", nazev_dva = "nazev_dva", typ_vazby_txt = "typ_vazby_txt", ico_ds = "ico_ds", ico = "ico",}
	const enum SeznamSubjektuVRozdelovnikuDtoFragments { ixs_esu = "*", typ_esu = "*", esu_txt = "*", lic = "*", por_zast = "*", zast_txt = "*", aktivita = "*", aktivita_esu = "*", dat_zmena = "*", dat_zmena_esu = "*", zmenu_prov = "*", zmp_txt = "*", typ_vazby = "*", ixs_dva = "*", id_ds = "*", id_gex = "*", dat_akt_info_o_ds = "*", dbstatus = "*", nazev_dva = "*", typ_vazby_txt = "*", ico_ds = "*", ico = "*",}
	const enum SeznamSubjektuVRozdelovnikuDtoTypes { ixs_esu = "string", typ_esu = "number", esu_txt = "string", lic = "string", por_zast = "number", zast_txt = "string", aktivita = "number", aktivita_esu = "number", dat_zmena = "JsonDate", dat_zmena_esu = "JsonDate", zmenu_prov = "string", zmp_txt = "string", typ_vazby = "number", ixs_dva = "string", id_ds = "string", id_gex = "string", dat_akt_info_o_ds = "JsonDate", dbstatus = "string", nazev_dva = "string", typ_vazby_txt = "string", ico_ds = "string", ico = "string",}
	const enum SeznamSubjektuVRozdelovnikuDtoTypeLengths { ixs_esu = 12, esu_txt = 254, lic = 4, zast_txt = 254, zmenu_prov = 12, zmp_txt = 254, ixs_dva = 12, dbstatus = 1, nazev_dva = 100, typ_vazby_txt = 50, ico_ds = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Ruian\Dto\GNacteniRuianDto - Copy.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**GNacteniRuianDto*/
	interface GEsuNastaveniDto {
		/**pocet*/
		Url?: string|null;
		/**pocet*/
		Certifikat?: string|null;
		/**pocet*/
		CertHash?: string|null;
		/**pocet*/
		Agenda?: string|null;
		/**pocet*/
		AIS?: string|null;
		/**pocet*/
		Ovm?: string|null;
		/**pocet*/
		Role?: string|null;
		/**pocet*/
		DuvodUcel?: string|null;
		/**pocet*/
		SyncMode?: string|null;
	}
	const enum GEsuNastaveniDtoNames { Url = "Url", Certifikat = "Certifikat", CertHash = "CertHash", Agenda = "Agenda", AIS = "AIS", Ovm = "Ovm", Role = "Role", DuvodUcel = "DuvodUcel", SyncMode = "SyncMode",}
	const enum GEsuNastaveniDtoFragments { Url = "*", Certifikat = "*", CertHash = "*", Agenda = "*", AIS = "*", Ovm = "*", Role = "*", DuvodUcel = "*", SyncMode = "*",}
	const enum GEsuNastaveniDtoTypes { Url = "string", Certifikat = "string", CertHash = "string", Agenda = "string", AIS = "string", Ovm = "string", Role = "string", DuvodUcel = "string", SyncMode = "string",}
	const enum GEsuNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Esu.WebClient\Gin\Esu\Ruian\Dto\GNacteniRuianDto.d.ts 

declare namespace Gordic.Esu.WebClient {
	/**GNacteniRuianDto*/
	interface GNacteniRuianDto {
		/**pocet*/
		Pocet?: string|null;
		/**AktRuianColour*/
		AktRuianColour?: string|null;
		/**pocet*/
		AktRuian?: JsonDate|null;
		/**AktRuianTxt*/
		AktRuianTxt?: string|null;
		/**AktRobColour*/
		AktRobColour?: string|null;
		/**pocet*/
		AktRob?: JsonDate|null;
		/**AktRosColour*/
		AktRosColour?: string|null;
		/**AktRos*/
		AktRos?: JsonDate|null;
		/**AktRosColour*/
		InfoPoslSoubor?: string|null;
		/**AktRosColour*/
		PocetOk?: string|null;
		/**SzrInfo*/
		SzrInfo?: string|null;
		/**SzrInfo*/
		SzrInfoVisible?: boolean|null;
		/**SzrInfo*/
		Soubory?: string|null;
		/**SzrInfo*/
		ZmenyNacitat?: boolean|null;
		/**SzrInfo*/
		Docasne?: boolean|null;
		/**SzrInfo*/
		Akt?: boolean|null;
		/**SzrInfo*/
		Pokracovat?: boolean|null;
	}
	const enum GNacteniRuianDtoNames { Pocet = "Pocet", AktRuianColour = "AktRuianColour", AktRuian = "AktRuian", AktRuianTxt = "AktRuianTxt", AktRobColour = "AktRobColour", AktRob = "AktRob", AktRosColour = "AktRosColour", AktRos = "AktRos", InfoPoslSoubor = "InfoPoslSoubor", PocetOk = "PocetOk", SzrInfo = "SzrInfo", SzrInfoVisible = "SzrInfoVisible", Soubory = "Soubory", ZmenyNacitat = "ZmenyNacitat", Docasne = "Docasne", Akt = "Akt", Pokracovat = "Pokracovat",}
	const enum GNacteniRuianDtoFragments { Pocet = "*", AktRuianColour = "*", AktRuian = "*", AktRuianTxt = "*", AktRobColour = "*", AktRob = "*", AktRosColour = "*", AktRos = "*", InfoPoslSoubor = "*", PocetOk = "*", SzrInfo = "*", SzrInfoVisible = "*", Soubory = "*", ZmenyNacitat = "*", Docasne = "*", Akt = "*", Pokracovat = "*",}
	const enum GNacteniRuianDtoTypes { Pocet = "string", AktRuianColour = "string", AktRuian = "JsonDate", AktRuianTxt = "string", AktRobColour = "string", AktRob = "JsonDate", AktRosColour = "string", AktRos = "JsonDate", InfoPoslSoubor = "string", PocetOk = "string", SzrInfo = "string", SzrInfoVisible = "boolean", Soubory = "string", ZmenyNacitat = "boolean", Docasne = "boolean", Akt = "boolean", Pokracovat = "boolean",}
	const enum GNacteniRuianDtoTypeLengths {}
}

//#endregion

