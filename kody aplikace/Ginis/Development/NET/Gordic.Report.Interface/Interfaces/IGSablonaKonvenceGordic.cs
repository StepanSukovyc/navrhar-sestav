//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGTemplatesGordic.cs                </Name>
//    <Description> Šablony konvence Gordic z databáze                          </Description>
//    <Author>      JKlusacek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-21                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Šablony konvence Gordic z databáze
    /// </summary>
    [System.Security.SecurityCritical]
    [ActivatedObject("Gordic.Report.Server.GSablonaKonvenceGordic")]
    [GInternalService(BusinessObject = "SablonaKonvenceGordic", Name = "SablonaKonvenceGordic")]
    public interface IGSablonaKonvenceGordic : IGAppLogic
    {
        /// <summary>
        /// Načtení šablony včetně obsahu (byte Array)
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        GServiceReadResponse<GSablonaKonvenceGordicDto> Read(GServiceReadRequest<GSablonaKonvenceGordicDto> rq);

        /// <summary>
        /// Načtení informací o šabloně (bez načtení obsahu šablony)
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        GServiceListResponse<GSablonaKonvenceGordicDto> List(GServiceListRequest<GSablonaKonvenceGordicEnum> rq);
    }

    public enum GSablonaKonvenceGordicEnum
    {
        /// <summary>
        /// Cesta k souboru
        /// </summary>
        cesta,
        /// <summary>
        /// Samotný soubor
        /// </summary>
        soubor,
        ///// <summary>
        ///// Boolean zda se jedná o spis nebo 
        ///// </summary>
        //isSpis,
        /// <summary>
        /// Příznak spisu
        /// </summary>
        priz_spis
    }

    public enum GTemplatesControlTypeEnum
    {
        /// <summary>
        /// Dokument
        /// </summary>
        Dokument = 0,
        /// <summary>
        /// Spis
        /// </summary>
        Spis = 1,
        /// <summary>
        /// Dolozka
        /// </summary>
        Dolozka = 2
    }
}
