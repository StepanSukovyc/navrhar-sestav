//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.IGApplicationInfo.cs              </Name>
//      <Description> rozhraní pro práci s obecnými parametry aplikace </Description>
//      <Author>      Jan Kuttich                                      </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021       </Copyright>
//      <Created>     2004-01-30                                       </Created>
//  </FileHeader>

using System;
using System.Xml;

namespace Gordic.General {

    /// <summary>rozhraní pro práci s obecnými parametry aplikace</summary>
    public interface IGApplicationInfo {
        
        #region vlastnosti

        /// <summary>fáze aplikace Ginis</summary>
        GString Faze { get; set; }
        
        /// <summary>fáze spoleèných komponent aplikace Ginis</summary>
        GString FazeGin { get; }

        /// <summary>fáze sestav aplikace Ginis</summary>
        GString FazeSes { get; set; }

        /// <summary>verze aplikace Ginis</summary>
        GInt32 Verze { get; set; } 
        
        /// <summary>sub verze aplikace Ginis</summary>
        GInt32 SubVerze { get; set; }
        
        /// <summary>revize aplikace Ginis</summary>
        GString Revize { get; set; }
        
        /// <summary>revize spoleèných komponent aplikace Ginis</summary>
        GString RevizeGin { get; set; }

        /// <summary>revize sestav aplikace Ginis</summary>
        GString RevizeSes { get; set; }

        /// <summary>minimální požadovaná verze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin2, je tato verze ta nižší</remarks>
        GInt32 VerzeDbMin { get; set; }

        /// <summary>minimální požadovaná subverze distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin2, je tato subverze ta nižší</remarks>
        GInt32 SubVerzeDbMin { get; set; }

        /// <summary>minimální požadovaná revize distribuèní databáze</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin2, je tato revize ta nižší</remarks>
        GInt32 RevizeAdzMin { get; set; }

        /// <summary>minimální požadovaná verze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení VerzeDbMin, je tato verze ta vyšší</remarks>
        GInt32 VerzeDbMin2 { get; set; }

        /// <summary>minimální požadovaná subverze databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení SubVerzeDbMin, je tato subverze ta vyšší</remarks>
        GInt32 SubVerzeDbMin2 { get; set; }

        /// <summary>minimální požadovaná revize databáze v testovací distribuci</summary>
        /// <remarks>v pøípadì souèasného nastavení RevizeAdzMin, je tato revize ta vyšší</remarks>
        GInt32 RevizeAdzMin2 { get; set; }

        /// <summary>seznam závislých fází oddìlených èárkami</summary>
        GString DependantModules { get; set; }

        /// <summary>seznam závislých revizí oddìlených èárkami</summary>
        GString DependantRevisions { get; set; }

        /// <summary>subsystém aplikace Ginis</summary>
        GCommon.Subsystem Subsystem { get; set; }

        /// <summary>zkrácený název aplikace</summary>
        GString ShortName { get; set; }

        /// <summary>název aplikace</summary>
        GString Name { get; set; }

        /// <summary>pøíznak provádìní testu verze databáze</summary>
        GBoolean TestVerzeDb { get; set; }

        /// <summary>pøíznak používání connect poolu pøi pøipojení k databázi</summary>
        GBoolean UseConnectPool { get; set; }

        /// <summary>pøíznak požadavku na naèítání databázové konfigurace</summary>
        GBoolean LoadDatabaseConfiguration { get; set; }

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

} // end namespace

