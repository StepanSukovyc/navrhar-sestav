var server = server || {};
/// <summary>Detail Esu Items Dto</summary>
server.GEsuParamsDto = function() {
	/// <field name="gin_esu_kondup" type="String">GIN ESU - kontrola duplicit při vytvoření nového ESU (výčet sloupců kontroly duplicit) (pouze SSL) výčet sloupců, dle kterých se při uložení kontrolují duplicitní záznamy. Sloupce musí být odděleny čárkami, sloupce musí být z této množiny (a minimum je nazev, obec, ulice, cor): nazev, ob_jmeno,jmeno, prijmeni, obec, ulice, cor, cpop, typ_esu, typ_org, dic, rc, ico, dat_nar, zkratka.</field>
	this.gin_esu_kondup = '';
	/// <field name="gin_esu_duedit" type="Number">GIN ESU - povolení editace datumu úmrtí u FO\nPovoluje editaci datumu úmrtí</field>
	this.gin_esu_duedit = 0;
	/// <field name="gin_esu_kontico" type="Object">GIN ESU - kontrolovat existenci ESU se stejným IČO při vytvoření ESU (pouze některé moduly) Při nastavení totoho parametru je při vytvoření nebo opravě ESU zobrazeno upozornění v případě, že v DB existuje ESU se stejným IČO. Tento parametr je platný pouze pro některé moduly - zejména moduly Spisové služby - např. USU, POD, ... . 7.1.2010 doplněna nová hodnota Ano - neumožnit uložit ESU s duplicitním IČO. Tzn. pokud je nalezena duplicita, není vůbec možné uložit ESU - je to možné pouze v případě, kdy uživatel vytváří novou adresu / pobočku.</field>
	this.gin_esu_kontico = { };
	/// <field name="gin_esu_povicop" type="Number">GIN ESU - povinnost vyplnění IČO u právnické osoby (při vytvoření a editaci ESU) platí pro státy ČR</field>
	this.gin_esu_povicop = 0;
	/// <field name="gin_esu_obaladr" type="Boolean">GIN ESU - metodika tvorby obálkové adresy Parametr určuje jak se budou skládat údaje do obálkové adresy. Navazuje na dokumentaci k systému. Standardní skládání je dle doporučení pošty (tzn. na obálku se dávají jen údaje vyžadované poštou). Rozšířené skládání obálkové adresy je takové, při kterémse do obálkové adresy dává maximum údajů z externího subjektu. Přeputí parametru nezpůsobí přeskládání obálkových adres u již existujících externích subjektů!</field>
	this.gin_esu_obaladr = false;
	/// <field name="gin_esu_uir_new" type="Boolean">GIN ESU - nabízet výběr z UIR při vytv. nového ESU Při vytvoření nového ESU (pokud je zprovozněn UIR) se nejdříve zobrazí okno výběru z UIR. Po jeho uzavření může uživatel začít vyplňovat ostatní položky ESU.</field>
	this.gin_esu_uir_new = false;
	/// <field name="gin_esu_stavneu" type="Boolean">GIN ESU - Používat typ ESU neurčeno (a typ organizace). GIN ESU - Používat typ ESU neurčeno (a typ organizace) při editaci a vytvoření externího subjektu. Paramer řídí to zda se bude položka neurčeno zobrazovat v číselnících.</field>
	this.gin_esu_stavneu = false;
	/// <field name="gin_esu_pdicdph" type="Boolean">GIN ESU - povinnost vyplnění DIČ u plátce DPH Parametr určuje, zda má uživatel povinnost vyplnit DIČ u subjektu, který je plátcem DPH - při opravě i pořízení ESU.</field>
	this.gin_esu_pdicdph = false;
	/// <field name="ParametrGinEsuPovVPsc" type="Boolean">GIN ESU - Povinnost vyplnění PSČ pro adresy v ČR Parametrem lze nastavit povinnost vyplnění PSČ pro adresy v ČR na detailu externího subjektu.</field>
	this.ParametrGinEsuPovVPsc = false;
	/// <field name="gin_esu_povvpsc" type="Boolean">GIN ESU - Povinnost vyplnění PSČ pro adresy v ČR Parametrem lze nastavit povinnost vyplnění PSČ pro adresy v ČR na detailu externího subjektu.</field>
	this.gin_esu_povvpsc = false;
	/// <field name="gin_esu_rozsu" type="Boolean">GIN ESU - Povolení editovat skupiny (rozdělovníky) za SU (které vytvořil jiný referent) (od 356)</field>
	this.gin_esu_rozsu = false;
	/// <field name="gin_esu_overtri" type="Number">GIN ESU - Povolení ověření dat v seznamu subjektů z IS Triáda / VERA WS (od 358), jen některé fáze. jen některé fáze. Použití nutno konzultovat s pracovníky Gordic.</field>
	this.gin_esu_overtri = 0;
	/// <field name="gin_rad_esuppa" type="Boolean">GIN ESU - Povolení přidávání a odebírání adres (v okně adresy/pobočky) (od)</field>
	this.gin_rad_esuppa = false;
	/// <field name="gin_esu_buedit" type="Number">Práce s bankovními účty (viditelnost, editovatelnost) od 358 0 - Uživatel nemůže vidět bankovní účty ESU, 1 - Uživatel může vidět bankovní účty ESU, 2 - Uživatel může vidět i editovat bak. účty ESU</field>
	this.gin_esu_buedit = 0;
	/// <field name="gin_esu_predpto" type="String">GIN ESU - předplnění typu organizace pro typ ESU právnická osoba Hodnotou parametru je číslo odpovídající typu organizace (v ADM - Subjekty - typy organizací). Např. 30 práv. osoba - nespecif. Prázdná hodnota parametru znamená původní chování.</field>
	this.gin_esu_predpto = '';
	/// <field name="gin_esu_obecpre" type="Boolean">GIN ESU - předplňovat pole obec Parametr určuje, zda se bude uživateli předplňovat políčko obec hodnotou z políčka pošta (na detailu externího subjektu při jeho zadání nebo opravě). 0 - NEPolíčko obec se nebude předplňovat, 1 - ANOPolíčko obec se bude předplňovat (v případě že uživatel vyplnil poštu a obec ještě není vyplněná).</field>
	this.gin_esu_obecpre = false;
	/// <field name="gin_esuovertrio" type="Number">GIN ESU - Při ověření dat v seznamu subjektů z IS Triáda zobrazit přebírací okno. 0 - Ne, 1 - Ano, 2 - Ne - pouze ladící hlášku.</field>
	this.gin_esuovertrio = 0;
	/// <field name="gin_esu_nabvla" type="Number">GIN ESU - při výběru primárně nabízet vlastní externí subjekty Při výběru (ve výběrovém okně ESU) primárně nabízet vlastní (oblíbené) externí subjekty. 0 - Původní chováníAplikace se budou chovat tak, jako ve verzi modulů 346 (a starších), 1 - ANO, 2 - NE</field>
	this.gin_esu_nabvla = 0;
	/// <field name="gin_esu_bubikon" type="Number">GIN ESU - Rozšířená kontrola bankovního účtu (pobočka banky musí mít vyplněn BIC kód) Rozšířená kontrola bankovního účtu - při zadání - použitá pobočka banky musí mít vyplněn BIC kód 0 - Ne, 1 - Ano - varování - uživateli je zobrazeno varování, 2 - Ano - uživatel nemůže uložit bankovní účet nebo provést platbu pokud kontrola není splněna.</field>
	this.gin_esu_bubikon = 0;
	/// <field name="pam_rad_testesu" type="Number">PAM ŘP RV - kontrola při zakládání zaměstanance 0 - Ne, 1 - Pokud se uživatel pokouší založit externí subjekt se stejný rodným nebo osobním číslem je hlášeno varování. Po potvrzení lze uložit. 2 - Při zapnutí této kontroly nelze uložit externí subjekt, který má shodné rodné číslo (nebo osobní číslo) jako již vytvořený zaměstnanec</field>
	this.pam_rad_testesu = 0;
	/// <field name="gin_esu_burkon" type="Number">GIN ESU - Rozšířená kontrola bankovního účtu v cizí měně pro banky ČR (modulo 11) - při vytváření bankovního účtu. Pouze varování - při vytvoření účtu v cizí měně u banky se sídlem v ČR. 0 - Ne Bez rozšířené kontroly, 1 - Ano - VarováníS rozšířenou kontrolou, 2 - Ano S rozšířenou kontrolou - uživateli nebude mít možnost účet nesplňující tuto kontrolu uložit.</field>
	this.gin_esu_burkon = 0;
	/// <field name="gin_esu_oprazo" type="Number">GIN ESU - ŘP Oprava (a vytvoření) zástupných osob externího subjektu Určuje, zda uživatel může vytvářet a editovat zástupné osoby. 0 - Ne Uživatel nemá právo vytvářet ani opravovat, 1 - Ano Uživatel má právo vytvářet a opravovat, 2 - Ano - jenom pro ZO ze stejného SU.Uživatel má právo vytvářet a opravovat zástupné osoby, vytvořené nebo opravené uživatelem ze stejného spisového uzlu.</field>
	this.gin_esu_oprazo = 0;
	/// <field name="gin_esu_oprazox" type="Number">GIN ESU - ŘP Oprava (a vytvoření) zástupných osob ext.subj. i když uživatel nemá oprávnění editovat ESU - používá KVOP Určuje, zda uživatel může vytvářet a editovat zástupné osoby. 0 - Ne, 1 - Ano</field>
	this.gin_esu_oprazox = 0;
	/// <field name="gin_esu_rppsc" type="Boolean">GIN ESU - ŘP Oprava a vytvoření PSČ (povolení) (od 356)</field>
	this.gin_esu_rppsc = false;
	/// <field name="gin_esu_rp_bann" type="Boolean">GIN ESU - ŘP Vytvoření banky Parametr umožňuje nastavit, zda má uživatel právo vytvořit ESU typu banka.</field>
	this.gin_esu_rp_bann = false;
	/// <field name="gin_esu_rp_zety" type="String">GIN ESU - ŘP Zákaz editace typů organizací dle výčtu Parametr umožňuje nastavit, zda má uživatel právo vytvořit ESU typu banka.</field>
	this.gin_esu_rp_zety = '';
	/// <field name="gin_esu_rp_zvty" type="String">GIN ESU - ŘP Zákaz vytvoření typů organizací dle výčtu Parametr umožňuje nastavit, zda má uživatel právo vytvořit ESU typu banka.</field>
	this.gin_esu_rp_zvty = '';
	/// <field name="gin_esu_rp_ban" type="Boolean">GIN ESU - ŘP Oprava banky Parametr umožňuje nastavit, zda má uživatel právo editovat ESU typu banka.</field>
	this.gin_esu_rp_ban = false;
	/// <field name="ssl_opra_esu" type="Boolean">GIN ESU - ŘP Oprava externího subjektu. Určuje zda uživatel může opravovat externí subjekty.</field>
	this.ssl_opra_esu = false;
	/// <field name="ssl_rp_esu_obal" type="Boolean">GIN ESU - ŘP Oprava zásilkové adresy externího subjektu Povolení editace zásilkové adresy externího subjektu či zástupné osoby z detailu externího subjektu a okna pro editaci zásilkové adresy u zásilky. Pro detail ESU má povolení tohoto parametru smysl v případě, že uživatel nemá povolenu opravu ESU. 0 - Zakázáno Editace zásilkové adresy na externím subjektu je zakázána, 1 - Povoleno Editace zásilkové adresy na externím subjektu je povolena</field>
	this.ssl_rp_esu_obal = false;
	/// <field name="gin_esu_edprijm" type="Boolean">GIN ESU - ŘP Povolení editace tvarů jmen a příjmení</field>
	this.gin_esu_edprijm = false;
	/// <field name="gin_esu_zatypad" type="Boolean">GIN ESU - povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)</field>
	this.gin_esu_zatypad = false;
	/// <field name="gin_esu_zatypad_volnyRezim" type="Boolean">GIN ESU - povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)</field>
	this.gin_esu_zatypad_volnyRezim = false;
	/// <field name="gin_esu_zatypad_striktniRezim" type="Boolean">GIN ESU - povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)</field>
	this.gin_esu_zatypad_striktniRezim = false;
	/// <field name="gin_esu_zatypak" type="Boolean">GIN ESU - povolení práce s typem adresy - kontaktní</field>
	this.gin_esu_zatypak = false;
	/// <field name="gin_esu_rp_new" type="Boolean">GIN ESU - ŘP Vytvoření externího subjektu Parametr určuje, zda je možné vytvářet externí subjekty.</field>
	this.gin_esu_rp_new = false;
	/// <field name="gin_esu_rp_akt" type="Boolean">GIN ESU - ŘP Změna aktivity externího subjektu. Umožňuje nastavit, zda uživatel může měnit aktivitu ESU.</field>
	this.gin_esu_rp_akt = false;
	/// <field name="gin_rad_esusv" type="Boolean">GIN ESU - Úroveň přístupu - povolení vytvořit shodný ESU v případě, že již existuje v jiné úrovni přístupu. Pokud uživatel zadá při vytvoření nového ESU subjekt přesně tak, jak již je pořízen v databázi (i když třeba s úrovní přístupu, kterou nemá uživatel oprávnění vidět) pak dle nastavení tohoto parametru a) je buď updatována hodnota ur_pri na již existujícím ESU (v případě, že je parametr nastaven na hodnotu ANO) b) je vytvořen nový záznam v ESU (v případě, že je parametr nastaven na hodnotu NE). 0 Ne - nový záznam se nebude vytvářet. Bude se updatovat úroveň přístupu. Výchozí chování. 1 Ano - nový záznam se bude vytvářet i když v DB existuje shodný ESU s jinou úrovní přístupu.</field>
	this.gin_rad_esusv = false;
	/// <field name="gin_rad_esusa" type="String">GIN ESU - Úroveň přístupu k externím subjektům (editace) - výčet číselných hodnot oddělených čárkami (např. 1,2,5). Uživatel může editovat, nebo vytvářet ESU s těmito hodnotami úrovně přístupu. Pokud je nastaven tento parametr a není nastaven parametr: GIN ESU - Úroveň přístupu k externím subjektům (výběr, prohlížení), použije se hodnota z tohoto parametru i pro výběr nebo prohlížení ESU. Pomocí parametrů lze nastavit, že uživatel vidí nějakou množinu ESU a opravovat nebo vytvářet může pouze podmnožinu z této množiny. (Např. vidí ESU s úrovní 1,2,3, ale opravovat nebo vytvářet může ESU s úrovní přístupu 3)</field>
	this.gin_rad_esusa = '';
	/// <field name="gin_rad_esusap" type="String">GIN ESU - Úroveň přístupu k externím subjektům (výběr, prohlížení) - výčet číselných hodnot oddělených čárkami (např. 1,2,5). Uživatel může vybírat nebo prohlížet ESU s těmito hodnotami úrovně přístupu. Pokud není tento parametr a je nastaven parametr: GIN ESU - Úroveň přístupu k externím subjektům (editace), použije se hodnota z tohoto parametru i pro výběr nebo prohlížení ESU. Pomocí parametrů lze nastavit, že uživatel vidí nějakou množinu ESU a opravovat nebo vytvářet může pouze podmnožinu z této množiny. (Např. vidí ESU s úrovní 1,2,3, ale opravovat nebo vytvářet může ESU s úrovní přístupu 3)</field>
	this.gin_rad_esusap = '';
	/// <field name="gin_rad_esusazo" type="String">GIN ESU - Úroveň přístupu k zástupným osobám externím subjektů (nový, editace). Obdoba parametrů pro ESU - GIN ESU - Úroveň přístupu k externím subjektům, ... .</field>
	this.gin_rad_esusazo = '';
	/// <field name="gin_esu_urprnp" type="String">GIN ESU - Úroveň přístupu k externím subjektům - nový (předplnění úrovně přístupu při vytvoření ESU)</field>
	this.gin_esu_urprnp = '';
	/// <field name="gin_esu_vybpoc" type="String">GIN ESU - výběrové okno ESU - max. počet zobrazitelných záznamů (pouze LK, od 354)</field>
	this.gin_esu_vybpoc = '';
	/// <field name="gin_esu_dnvyhl" type="Boolean">GIN ESU - vyhledávat dle datumu narození Parametr určuje, zda bude mít uživatel možnost vyhledávat externí subjekty dle datumu narození.</field>
	this.gin_esu_dnvyhl = false;
	/// <field name="gin_esu_rcvyhl" type="Boolean">GIN ESU - vyhledávat dle RČ Parametr určuje, zda bude mít uživatel možnost vyhledávat externí subjekty dle rodného čísla.</field>
	this.gin_esu_rcvyhl = false;
	/// <field name="gin_esu_vybroi" type="Boolean">GIN ESU - Zobrazení rozšířených informací ve výběrovém okně ESU - obálk. adresa, ... (tooltipy) (356). Nastavení tohoto parametru na Ano může mít mírný vliv na zatížení serveru - na klientské počítače se dotahuje více dat.</field>
	this.gin_esu_vybroi = false;
	/// <field name="gin_iszr_povole" type="Boolean">GIN ISZR - Povolit práci se systémem základních registrů</field>
	this.gin_iszr_povole = false;
	/// <field name="gin_esu_iszrvar" type="String">GIN ESU - stupně verifikace ESU umožňující evidenci s varováním (ISZR, ... ) Aplikace při evidenci (či odpovídající jiné operaci) provede kontrolu stupně verifikace evidovaného ESU a v případě, že je stupeň verifikace ESU obsažen v hodnotě parametru, upozornií uživatele a umožní evidenci (umožní pokračování v práci). Pokud je parametr prázdný, tak neupozorňovat vůbec (default).</field>
	this.gin_esu_iszrvar = '';
	/// <field name="gin_esu_iszrblo" type="String">GIN ESU - stupně verifikace ESU neumožňující evidenci (ISZR) Aplikace při evidenci (či odpovídající jiné operaci) provede kontrolu stupně verifikace evidovaného ESU a v případě, že je stupeň verifikace ESU obsažen v hodnotě parametru, upozorní uživatelea neumožní evidenci (zabrání pokračování v práci). Pokud je parametr prázdný, neblokovat (default).</field>
	this.gin_esu_iszrblo = '';
	/// <field name="gin_iszr_zostv" type="Boolean">GIN ESU/ISZR - Zobrazení informací o ověření v SZR v seznamu externích subjektů (podbarvení, stupeň</field>
	this.gin_iszr_zostv = false;
	/// <field name="gin_esu_dnzobr" type="Boolean">GIN ESU - zobrazovat datum narození Parametr určuje, zda se bude zobrazovat datum narození v detailu externího subjektu a v seznamech ve výběrovém okně externích subjektů.</field>
	this.gin_esu_dnzobr = false;
	/// <field name="gin_esu_rczobr" type="Boolean">GIN ESU - zobrazovat RČ Parametr určuje, zda se bude zobrazovat rodné číslo v detailu externího subjektu a v seznamech ve výběrovém okně externích subjektů.</field>
	this.gin_esu_rczobr = false;
	/// <field name="gin_esu_rczadat" type="Boolean">GIN ESU - povolení zadat RČ na detailu ESU Tímto parametrem lze úplně vypnout možnost práce s RČ.</field>
	this.gin_esu_rczadat = false;
	/// <field name="gin_esu_rcnenum" type="Boolean">GIN ESU - povolení zadávat nenumerické znaky do RČ doporučujeme mít tento parametr nastaven na hodnotu NE.</field>
	this.gin_esu_rcnenum = false;
	/// <field name="gin_esu_torg" type="Boolean">GIN ESU - zobrazovat typ organizace na detailu Parametr určuje, zda se má zobrazovat typ organizace na detailu externího subjektu (při zadání).</field>
	this.gin_esu_torg = false;
	/// <field name="gin_rad_uir" type="Boolean">GIN - ŘP Přístup k datům UIR Povolení přístupu k datům UIR.</field>
	this.gin_rad_uir = false;
	/// <field name="gin_rad_rob" type="Boolean">GIN - ŘP Přístup k datům ROB Povolení přístupu k datům ROB - registru obyvatel (pomocí parametru lze např. v SSL nastavit, zda bude viditelné tlačítko ROB na kartě externího subjektu s možností zobrazení, případně vytvoření vazby na ROB).</field>
	this.gin_rad_rob = false;
	/// <field name="gin_esu_isds_id" type="Boolean">GIN ESU - Povolení ručně zadat id datové schránky na detailu ESU (hned po zadání bude ověřeno vISDS) Povolení ručně zadat id datové schránky na detailu ESU (hned po zadání bude ověřeno v ISDS)</field>
	this.gin_esu_isds_id = false;
	/// <field name="gin_esu_isdsods" type="Boolean">GIN ESU - povolení odstranit vazbu na datovou schránku ISDS z externího subjektu Pozor jde o citlivou věc - odstranění vazby by měl provádět pouze administrátor na žádost běžných uživatelů.</field>
	this.gin_esu_isdsods = false;
	/// <field name="gin_ssl_datschr" type="Boolean">GIN ISDS - povolení práce s datovými schránkami (odeslání, příjem, ověření ESU, ... ) Při přepnutí parametru budete informováni, zda je podpora práce s DS již plnohodnotná.</field>
	this.gin_ssl_datschr = false;
	/// <field name="gin_gex_povolen" type="Boolean">GIN GEX - povolení práce s Gordic exchange (odeslání, příjem, ověření ESU, ... )</field>
	this.gin_gex_povolen = false;
	/// <field name="gin_esu_isdsof" type="String">GIN ESU - Ověřovat ESU v ISDS (systému datových schránek) pro fyzickou osobu dle položek (DS, 360)</field>
	this.gin_esu_isdsof = '';
	/// <field name="gin_esu_isdsop" type="String">GIN ESU - Ověřovat ESU v ISDS (systému datových schránek) pro právnickou osobu dle položek (DS, 360)</field>
	this.gin_esu_isdsop = '';
	/// <field name="gin_esu_isdson" type="String">GIN ESU - Ověřovat ESU v ISDS (systému datových schránek) pro typ neurčeno dle položek (DS, 360)</field>
	this.gin_esu_isdson = '';
	/// <field name="gin_esu_pcisdok" type="Boolean">GIN ESU - zobrazovat čísla osobních dokladů na detailu ESU</field>
	this.gin_esu_pcisdok = false;
	/// <field name="gin_esu_ecisdok" type="Boolean">GIN ESU - možnost editovat čísla osobních dokladů na detailu ESU</field>
	this.gin_esu_ecisdok = false;
	/// <field name="gin_esu_hcisdok" type="Boolean">GIN ESU - vyhledávat dle čísla osobního dokladu OP, PAS, ... - povoluje vyhledávání v kartotéce dle jmenovaného údaje. Prozatím pouze pro moduly SSL.</field>
	this.gin_esu_hcisdok = false;
	/// <field name="gin_esu_pouoc" type="Boolean">GIN ESU - používat pole OČ (osobní číslo)</field>
	this.gin_esu_pouoc = false;
	/// <field name="gin_esu_isdsupr" type="String">GIN ESU - úroveň přístupu pro možnost ověření/převzetí údajů z ISDS pro uživ. bez oprávnění editovat</field>
	this.gin_esu_isdsupr = '';
	/// <field name="gin_esu_inzobr" type="Boolean">GIN ESU - zobrazovat stav insolvence (seznam a detail ESU)</field>
	this.gin_esu_inzobr = false;
	/// <field name="gin_esu_dnpov" type="Boolean">GIN ESU - povinnost vyplnění Datumu narození u fyzické osoby(při vytvoření a editaci ESU)</field>
	this.gin_esu_dnpov = false;
	/// <field name="gin_esu_mnzobr" type="Boolean">GIN ESU - zobrazovat datum narození Parametr určuje, zda se bude zobrazovat rodné přijmení a místo narození v detailu externího subjektu a v seznamech ve výběrovém okně externích subjektů.</field>
	this.gin_esu_mnzobr = false;
	/// <field name="gin_iszr_urprio" type="String">GIN ISZR - Úroveň přístupu ESU převzatých z ROS Je třeba i příslušně upravit parametry GIN ESU - úroveň přístupu * pro editaci a prohlížení ESU(tak aby měl uživatel oprávnění převzatá data z ROS uložit).</field>
	this.gin_iszr_urprio = '';
	/// <field name="gin_esu_buods" type="Number">GIN ESU GIN ESU - Povolení odstranit bankovní účet. Pro povolení odstranění účtů musí mít uživatel povolen i parametr GIN ESU - Práce s bankovními účty (viditelnost, editovatelnost).   NE / ANO vytvořený funkčním místem / Ano vytvořený stejným spisovým uzlem /Ano - všechny</field>
	this.gin_esu_buods = 0;
	/// <field name="gin_iszr_esuprf" type="Number">GIN ESU/ISZR – Převzetí právní formy z ROS(přednastaví se typ organizace). V číselníku právních forem(ADM-ISZR-Právní formy organizace) lze nastavit, jaký typ organizace přísluší ESU k právní formě. Pokud je toto správně zadministrováno pak se po ověření a převzetí dat z SZR-ROS přednastaví na ESU typ organizace.</field>
	this.gin_iszr_esuprf = 0;
	/// <field name="gin_iszr_rozin" type="Boolean">GIN ESU/ISZR - Zobrazení rozšířených informací o ověření v SZR v seznamu externích subjektů Parametrem lze zapnout indikaci, zda ověření proběhlo ve stejné agendě a zda již není starší než 24h.</field>
	this.gin_iszr_rozin = false;
	/// <field name="gin_esu_poumid" type="Boolean">GIN ESU - používat pole matriční identita(matriční jméno, matriční příjmení)</field>
	this.gin_esu_poumid = false;
	/// <field name="gin_esu_ocnazev" type="String">GIN ESU - název pole OČ (osobní číslo) na detailu a v seznamu ESU</field>
	this.gin_esu_ocnazev = '';
	/// <field name="gin_iszr_povopr" type="Boolean">GIN ISZR - Povolit prohlížení informací získaných ze SZR (bez aktivního přístupu do SZR). Pokud je nastaven na ANO, je třeba mít zadministrovány všechny příslušné subjekty a vazby viz.dokumentace(agendy, role, ... ) aby bylo možné zíkat informaci o datumu ověření pro vybranou agendu SZR.</field>
	this.gin_iszr_povopr = false;
};

