//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.IGSessionInfo.cs             </Name>
//      <Description> rozhraní na informace o autorizované relaci </Description>
//      <Author>      Jan Kuttich                                 </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021          </Copyright>
//      <Created>     2004-01-30                                  </Created>
//  </FileHeader>

using System;
using System.Xml;

namespace Gordic.General {

    /// <summary>interface na informace o autorizované relaci</summary>
    public interface IGSessionInfo {
        
        #region vlastnosti

        /// <summary>èíslo chyby v autorizaèní proceduøe</summary>
        GInt32 ErrCode { get; set; }
        
        /// <summary>èíslo SQL chyby v autorizaèní proceduøe</summary>
        GInt32 SqlErr { get; set; }

        /// <summary>èíslo ISAM chyby v autorizaèní proceduøe</summary>
        GInt32 IsamErr { get; set; }

        /// <summary>text databázové chyby v autorizaèní proceduøe</summary>
        GString ErrText { get; set; }

        /// <summary>poøadové èíslo pøihlášení</summary>
        GInt32 LogPorCislo { get; set; }

        /// <summary>Pøíznak, že je pøiøazeno poøadové èíslo pøihlášení - tedy pøíznak, že již probìhlo GINIS pøihlášení</summary>
        bool IsLogPorCislo { get; }

        /// <summary>id referenta</summary>
        GString IxsRef { get; set; }

        /// <summary>název referenta</summary>
        GString NazevRef { get; set; }

        /// <summary>zkratka referenta</summary>
        GString Zkratka { get; set; }

        /// <summary>id funkce</summary>
        GString IxsFun { get; set; }

        /// <summary>název funkce</summary>
        GString NazevFun { get; set; }

        /// <summary>id pùvodce zmìny</summary>
        GString IxsZmp { get; set; }

        /// <summary>priorita max</summary>
        GInt32 PrioritaMax { get; set; }

        /// <summary>fc</summary>
        GString Fc { get; set; }

        /// <summary>id organizaèní jednotky</summary>
        GString IxsOrj { get; set; }

        /// <summary>název organizaèní jednotky</summary>
        GString NazevOrj { get; set; }

        /// <summary>kódovaný název silného uživatele</summary>
        GString Ldb { get; set; }

        /// <summary>kódované heslo silného uživatele</summary>
        GString Pdb { get; set; }

        /// <summary>id instance</summary>
        GString IxsIns { get; set; }

        /// <summary>id spisového uzlu</summary>
        GString IxsSu { get; set; }

        /// <summary>licence databáze</summary>
        GString LicAdr { get; set; }

        /// <summary>pøíznak cs</summary>
        GInt32 CsDb { get; set; }

        /// <summary>typ instalace</summary>
        /// <remarks>hodnota odpovídá èíselníku ginctyi (10=AÈR, 20=civil, 30=ISTA, 40=ÚP, 50=OkÚ)</remarks>
        GInt32 TypInst { get; set; }

        /// <summary>pøíznak archivace</summary>
        GInt32 PrizArchiv { get; set; }

        /// <summary>pøíznak blobù</summary>
        GInt32 PrizBlob { get; set; }

        /// <summary>id isu</summary>
        GString IxsIsu { get; set; }

        /// <summary>vzkaz</summary>
        GString Vzkazy { get; set; }

        /// <summary>datum aktualizace</summary>
        GDateTime DatAkt { get; set; }

        /// <summary>verze databáze</summary>
        GInt32 VerzeDb { get; set; }

        /// <summary>sub verze databáze</summary>
        GInt32 SubVerzeDb { get; set; }
        
        /// <summary>název rf</summary>
        GString NazevRf { get; set; }

        /// <summary>projekt</summary>
        GString Project { get; set; }

        /// <summary>pøíznak demo databáze</summary>
        GInt32 PrizD { get; set; }

        /// <summary>název spisového uzlu</summary>
        GString NazevSu { get; set; }

        /// <summary>zkratka spisového uzlu</summary>
        GString ZkratkaSu { get; set; }

        /// <summary>datum pøihlášení</summary>
        GDateTime DatLogin { get; set; }
        
        /// <summary>název instance</summary>
        GString NazevIns { get; set; }

        /// <summary>datum vypršení platnosti</summary>
        GDateTime DatExp { get; set; }

        /// <summary>režim</summary>
        GInt32 Rezim { get; set; }

        /// <summary>poøadí pro tøídìní</summary>
        GInt32 PoradiLog { get; set; }

        /// <summary>aktuální poèet pøihlášených funkcí na fázi</summary>
        GInt32 Aktuz { get; set; }

        /// <summary>typ agendy</summary>
        GInt16 TypAg { get; set; }

        /// <summary>identifikátor pøihlášení</summary>
        GString IxsLpc { get; set; }

        /// <summary>výsledek autorizaèní procedury</summary>
        GInt32 Vysledek { get; set; }

        /// <summary>seznam fází k reinstalaci</summary>
        GString FazeToReinst { get; set; }

        /// <summary>pøíznak privilegované funkce</summary>
        GInt16 PrizF { get; set; }

        /// <summary>expirace vstupenky do systému</summary>
        GInt32 ExpTic { get; set; }

        /// <summary>identifikátor relace databázového stroje</summary>
        GInt64 Sessid { get; set; }

        /// <summary>poøadové èíslo konkurenèního pøihlášení</summary>
        GInt32 LogPorCisloKon { get; set; }

        /// <summary>název referenta s konkurenèním pøihlášením</summary>
        GString NazevRefKon { get; set; }

        /// <summary>adresa poèítaèe s konkurenèním pøihlášením</summary>
        GString IpAdrKon { get; set; }

        /// <summary>datum pøihlášení uživatele s konkurenèním pøihlášením</summary>
        GDateTime DatLoginKon { get; set; }

        /// <summary>pøihlašovací jméno uživatele s konkurenèním pøihlášením</summary>
        GString LoginUzivKon { get; set; }

        /// <summary>sub verze ADZ</summary>
        GInt16 SubVerzeAdz { get; set; }

        /// <summary>vodotisk</summary>
        GString Vodotisk { get; set; }

        /// <summary>pøíznak testovací databáze</summary>
        GInt16 PrizTest { get; set; }

        /// <summary>vzkaz pro testovací databázi</summary>
        GString VzkazTest { get; set; }

        /// <summary>identifikátor externího uživatele typu veøejnost (tj. obèana)</summary>
        GString IxsExu { get; set; }

        /// <summary>poøadové èíslo pøihlášení externího uživatele typu veøejnost (tj. obèana)</summary>
        GInt32 PorCisExu { get; set; }

        /// <summary>identifikátor externího subjektu odpovídajícího aktuálnì pøihlášenému uživateli typu veøejnost (tj. obèanu)</summary>
        GString IxsEsuExu { get; set; }

        /// <summary>licence zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost (tj. obèanu)</summary>
        GString LicEsuExu { get; set; }

        /// <summary>poøadové èíslo zástupné osoby odpovídající aktuálnì pøihlášenému uživateli typu veøejnost (tj. obèanu)</summary>
        GInt32 PorZasExu { get; set; }

        /// <summary>stupeò pøidìlené dùvìryhodnosti uživatele typu veøejnost (tj. obèana)</summary>
        GInt16 StuVerExu { get; set; }

        /// <summary>identifikátor konfiguraèní skupiny uživatele typu veøejnost (tj. obèana)</summary>
        GString IxsUsrExu { get; set; }

        /// <summary>èas minulého úspìšného pøihlášení uživatele typu veøejnost (tj. obèana)</summary>
        GDateTime LastLoginExu { get; set; }

        /// <summary>revize databáze</summary>
        GInt32 RevizeAdz { get; set; }

        /// <summary>ièo</summary>
        GString Ico { get; set; }

        /// <summary>id konfiguraèní skupiny</summary>
        GString IxsUsr { get; set; }

        /// <summary>název konfiguraèní skupiny</summary>
        GString NazevUsr { get; set; }

        /// <summary>poøadové èíslo nadøazeného pøihlášení</summary>
        GInt32 LogPorCisloNad { get; set; }

        /// <summary>identifikátor nadøazeného pøihlášení</summary>
        GString IxsLpcNad { get; set; }

        /// <summary>identifikátor navázaného externího subjektu pro aktuálního uživatele typu veøejnost</summary>
        GString IxsPrevExu { get; set; }

        /// <summary>identifikátor navázaného externího uživatele typu veøejnost dle vazby na navázaný externí subjekt</summary>
        GString IxsExuPrev { get; set; }

        /// <summary>identifikátor støediska spisových uzlù</summary>
        GString IxsTre { get; set; }

        /// <summary>klíè pro vícefaktorovou autentizaci pomocí TOTP</summary>
        GString TotpKey { get; set; }

        /// <summary>identifikátor primárnì pøihlášeného externího uživatele typu veøejnost</summary>
        GString IxsExuLogin { get; set; }

        /// <summary>identifikátor externího subjektu odpovídajícího primárnì pøihlášenému uživateli typu veøejnost</summary>
        GString IxsEsuExuLogin { get; set; }

        /// <summary>stupeò pøidìlené dùvìryhodnosti primárnì pøihlášeného uživatele typu veøejnost</summary>
        GInt16 StuVerExuLogin { get; set; }

        /// <summary>èasový limit pro èekání na databázový zámek v sekundách</summary>
        /// <remarks>hodnota menší než jedna znamená použití výchozí hodnoty definované v objektu pro komunikaci s databází</remarks>
        GInt16 LockTimeout { get; set; }

        /// <summary>èasový limit pro vykonání databázového pøíkazu v sekundách</summary>
        /// <remarks>hodnota menší než jedna znamená použití výchozí hodnoty definované v objektu pro komunikaci s databází</remarks>
        GInt16 CommandTimeout { get; set; }

        /// <summary>pøíznak vývojové databáze</summary>
        GInt16 PrizVyvoj { get; set; }

        #endregion

        #region metody

        /// <summary>serializace hodnot do XML</summary>
        /// <returns>serializovaný XML tvar</returns>
        XmlNode ToXml();

        /// <summary>deserializace hodnot z XML</summary>
        /// <param name="node">serializovaný XML tvar</param>
        void ParseXml(XmlNode node);

        #endregion

    } // end interface

    /// <summary>
    /// Standalone Session info (AIB/DKS/XRG/...) for Gordic.Support.Mail
    /// </summary>
    public sealed class GStandaloneSessionInfo : IGSessionInfo
    {
        /// <summary>
        /// GStandaloneSessionInfo
        /// </summary>
        /// <param name="logPorCislo"></param>
        /// <param name="ixsZmp"></param>
        public GStandaloneSessionInfo(GInt32 logPorCislo, GString ixsZmp)
        {
            LogPorCislo = logPorCislo;
            IxsZmp = ixsZmp;
        }

        public GInt32 ErrCode { get ; set ; }
        public GInt32 SqlErr { get ; set ; }
        public GInt32 IsamErr { get ; set ; }
        public GString ErrText { get ; set ; }
        public GInt32 LogPorCislo { get ; set ; }

        public bool IsLogPorCislo { get; set; }

        public GString IxsRef { get ; set ; }
        public GString NazevRef { get ; set ; }
        public GString Zkratka { get ; set ; }
        public GString IxsFun { get ; set ; }
        public GString NazevFun { get ; set ; }
        public GString IxsZmp { get ; set ; }
        public GInt32 PrioritaMax { get ; set ; }
        public GString Fc { get ; set ; }
        public GString IxsOrj { get ; set ; }
        public GString NazevOrj { get ; set ; }
        public GString Ldb { get ; set ; }
        public GString Pdb { get ; set ; }
        public GString IxsIns { get ; set ; }
        public GString IxsSu { get ; set ; }
        public GString LicAdr { get ; set ; }
        public GInt32 CsDb { get ; set ; }
        public GInt32 TypInst { get ; set ; }
        public GInt32 PrizArchiv { get ; set ; }
        public GInt32 PrizBlob { get ; set ; }
        public GString IxsIsu { get ; set ; }
        public GString Vzkazy { get ; set ; }
        public GDateTime DatAkt { get ; set ; }
        public GInt32 VerzeDb { get ; set ; }
        public GInt32 SubVerzeDb { get ; set ; }
        public GString NazevRf { get ; set ; }
        public GString Project { get ; set ; }
        public GInt32 PrizD { get ; set ; }
        public GString NazevSu { get ; set ; }
        public GString ZkratkaSu { get ; set ; }
        public GDateTime DatLogin { get ; set ; }
        public GString NazevIns { get ; set ; }
        public GDateTime DatExp { get ; set ; }
        public GInt32 Rezim { get ; set ; }
        public GInt32 PoradiLog { get ; set ; }
        public GInt32 Aktuz { get ; set ; }
        public GInt16 TypAg { get ; set ; }
        public GString IxsLpc { get ; set ; }
        public GInt32 Vysledek { get ; set ; }
        public GString FazeToReinst { get ; set ; }
        public GInt16 PrizF { get ; set ; }
        public GInt32 ExpTic { get ; set ; }
        public GInt64 Sessid { get ; set ; }
        public GInt32 LogPorCisloKon { get ; set ; }
        public GString NazevRefKon { get ; set ; }
        public GString IpAdrKon { get ; set ; }
        public GDateTime DatLoginKon { get ; set ; }
        public GString LoginUzivKon { get ; set ; }
        public GInt16 SubVerzeAdz { get ; set ; }
        public GString Vodotisk { get ; set ; }
        public GInt16 PrizTest { get ; set ; }
        public GString VzkazTest { get ; set ; }
        public GString IxsExu { get ; set ; }
        public GInt32 PorCisExu { get ; set ; }
        public GString IxsEsuExu { get ; set ; }
        public GString LicEsuExu { get ; set ; }
        public GInt32 PorZasExu { get ; set ; }
        public GInt16 StuVerExu { get ; set ; }
        public GString IxsUsrExu { get ; set ; }
        public GDateTime LastLoginExu { get ; set ; }
        public GInt32 RevizeAdz { get ; set ; }
        public GString Ico { get ; set ; }
        public GString IxsUsr { get ; set ; }
        public GString NazevUsr { get ; set ; }
        public GInt32 LogPorCisloNad { get ; set ; }
        public GString IxsLpcNad { get ; set ; }
        public GString IxsPrevExu { get ; set ; }
        public GString IxsExuPrev { get ; set ; }
        public GString IxsTre { get ; set ; }
        public GString TotpKey { get ; set ; }
        public GString IxsExuLogin { get ; set ; }
        public GString IxsEsuExuLogin { get ; set ; }
        public GInt16 StuVerExuLogin { get ; set ; }
        public GInt16 LockTimeout { get ; set ; }
        public GInt16 CommandTimeout { get ; set ; }
        public GInt16 PrizVyvoj { get ; set ; }

        public void ParseXml(XmlNode node)
        {
        }

        public XmlNode ToXml() => null;
    }

} // end namespace

