//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGReportAdmin.cs                    </Name>
//    <Description> Administraèní seznamy a akce systému sestav                 </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2011-04-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.Report.Interface
{

    /// <summary>
    /// Administraèní seznamy a akce systému sestav
    /// </summary>
    [ActivatedObject("Gordic.Report.Server.GReportAdmin")]
    [System.Security.SecurityCritical]
    public interface IGReportAdmin
    {
        /// <summary>Vrací seznam všech fází sestav, pøípadnì filtrovaný</summary>
        SeznamFaziSestavDataSet SeznamFaziSestav(params GFilter<FilSeznamFaziSestav>[] filters);

        /// <summary>Kotrola existence formátu dané sestavy s daným jménem pro kontrolu duplicity</summary>
        bool KontrolaExistenceFormatuSeJmenem(GString ixsAlv, GString formatNazev);

        /// <summary>Uloží zmìny ALV do databáze</summary>
        void UpdateAlv(GString ixsAlv, GInt16 prizDotaz, GInt16 zpusUloz, GInt16 prizPodp, GInt16 aktivita, GString ixsTyp, GString formVyst, GString ixsDpo);
        /// <summary>Uloží ALF do databáze</summary>
        void RegisterAlfToDatabase(
            GString ixsFrm, GString ixsXme, GInt32 xmetaVer, GInt32 xmetaSubver, GString ixsAlv, GString nazev, GString poznamka, GEkoDate rokmesOd, GEkoDate rokmesDo,
            GString fileName, GString formatSkup, GString filtrFrm, GString formVyst, GInt16 ktg_typ_pri);
        /// <summary>Uloží vazbu ALF/STR do databáze</summary>
        void RegisterAlfToTree(GString ixsStr, GString ixsAlv, GString ixsFrm, GString ixsStrOld, GString nazev);

        /// <summary>Nový PID pro formát ALF</summary>
        GString NewIxsFrm();

        /// <summary>Nový PID pro formát ALV</summary>
        GString NewIxsAlv();

        /// <summary>Uloží ALV do databáze</summary>
        void RegisterAlvToDatabase(
            GString ixsAlv, GString nazev, GString poznamka, GEkoDate rokmesOd, GEkoDate rokmesDo, GEkoDate rokmesOd_vaz, GEkoDate rokmesDo_vaz,
            GString tema, GString idSes,
            GString ixsStr, GString ixsXme, GInt32 xmetaVer, GInt32 xmetaSubver, GString ixsFrmDefault,
            GString fileName, GDateTime datModif, GString maker,
            GString typAlg, GString typVyst, GString typAlv,
            GInt16 prizDist, GInt16 prizVaz, GInt16 prizZmeny, GInt16 prizDotaz, GInt16 zpusUloz,
            GInt16 prizDeb, GInt16 prizIpa, //GInt16 prizSor,
            GString ktgTyp, GString ixsTyp,
            GString filtr_alv, GString formVyst, GInt16 prizOdloz,
            GString popis, GInt16 kv = null
            );


        /// <summary>
        /// Preradi ALV do jineho stromu na urcite misto nebo prejmenovava
        /// </summary>
        void UpdateVazbaAlv(GString ixsAlv, GString ixsStr, GInt16 kv, GString nazev = null);
        
        /// <summary>
        /// Odstraní ALV ze stromu
        /// </summary>
        void RemoveAlvFromStr(GString ixsAlv, GString ixsStr);
        

        /// <summary>Nový PID pro formát XME</summary>
        GString NewIxsXme();

        /// <summary>Uloží XME do databáze</summary>
        void RegisterXmeToDatabase(
            GString ixsXme, GInt32 xmetaVer, GInt32 xmetaSubver, GString nazev, GString poznamka);

        /// <summary>Uloží vazbu DOCFORM formuláøe na dokument do databáze</summary>
        void RegisterDocFormToDatabase(
            GString ixsFrm, GString ixsTyp, bool ixsTypSpis);

        /// <summary>
        /// Insert nebo Update stromu
        /// </summary>
        /// <param name="str"></param>
        void InsertOrUpdateStr(GReportListDataSet.StrRow str);

         /// <summary>
        /// Vráti root strom pro danou funkci
        /// </summary>
        GString ReturnIxsStrRoot(GString ixsFun, GString tema);
        
        
    }

    /// <summary>Výèet filtraèních kritérií pro seznam fází sestav</summary>
    public enum FilSeznamFaziSestav
    {
        /// <summary>jméno fáze</summary>
        faze,
        /// <summary>popis fáze</summary>
        faze_txt,
        /// <summary>pouze ty fáze, které mají alespoò jednu sestavu tohoto typu výstupu</summary>
        typ_vyst,
    }

}
