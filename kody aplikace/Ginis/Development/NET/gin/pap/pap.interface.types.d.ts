/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       pap.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Pap.Interface\Gordic.Pap.Interface.csproj
*    created     2026-02-16 14:34:03
*    files       pap.interface.fields.d.ts
*                Controls\Rza\Gordic.PAp.Inteface.GRzacrezDto.d.ts
*                Controls\Rza\dto\Gordic.Pap.Inteface.GRzacvriDto.d.ts
*                Controls\Rza\dto\Gordic.Pap.Interface.GRzacfzcDto.d.ts
*                Controls\Rza\dto\Gordic.Pap.Interface.GRzaclimDto.d.ts
*                Controls\Rza\dto\Gordic.Pap.Interface.GRzacpruDto.d.ts
*                Controls\Rza\dto\Gordic.Pap.Interface.GRzactzaDto.d.ts
*                Controls\Rza\dto\Gordic.Pap.Interface.GRzaczprDto.d.ts
*                Dto\Gordic.Pap.Interface.GAktualizujZakazkyInpDto.d.ts
*                Dto\Gordic.Pap.Interface.GAktualizujZakazkyOutDto.d.ts
*                Dto\Gordic.Pap.Interface.GCommonReturnDto.d.ts
*                Dto\Gordic.Pap.Interface.GDashBoardParamsDto.d.ts
*                Dto\Gordic.Pap.Interface.GDatVyhlInputDto.d.ts
*                Dto\Gordic.Pap.Interface.GDatVyhlReturnDto.d.ts
*                Dto\Gordic.Pap.Interface.GDoplnParamPripadDto.d.ts
*                Dto\Gordic.Pap.Interface.GDruhZadRizDto.d.ts
*                Dto\Gordic.Pap.Interface.GDruhZadRizOutDto.d.ts
*                Dto\Gordic.Pap.Interface.GEsuKontrolaDto.d.ts
*                Dto\Gordic.Pap.Interface.GEsuParametryDto.d.ts
*                Dto\Gordic.Pap.Interface.GEvzsazaDto.d.ts
*                Dto\Gordic.Pap.Interface.GEvzskdnDto.d.ts
*                Dto\Gordic.Pap.Interface.GEvzskpuDto.d.ts
*                Dto\Gordic.Pap.Interface.GEvzsoko.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GEvzvvzcDto.d.ts
*                Dto\Gordic.Pap.Interface.GGindkon.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GGinsesuDto.d.ts
*                Dto\Gordic.Pap.Interface.GHromPredatTiskDto.d.ts
*                Dto\Gordic.Pap.Interface.GIdentVZ.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GMzacddnDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapAddUpdFinDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapCfuFilterDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapCommomArrayStringDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapDashBoardDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapDashBoardFiltryDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapDashBoardPanel1Dto.d.ts
*                Dto\Gordic.Pap.Interface.GPapDashBoardPanel2Dto.d.ts
*                Dto\Gordic.Pap.Interface.GPapDashBoardPrehledDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapDashBoardStavDavekDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapDetailAccessDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapEditDatDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapGenerujSmlDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapHistDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapHromTiskDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapParamsPreevidDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapSeznamAccessDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapSeznamDokVZAccessDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapSmazatSmlDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapSpravaDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapUvolneniDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapUvolneniUpdDto.d.ts
*                Dto\Gordic.Pap.Interface.GPapWsHistDto.d.ts
*                Dto\Gordic.Pap.Interface.GParametryDetailXxx.d.ts
*                Dto\Gordic.Pap.Interface.GParametryPreevidence.d.ts
*                Dto\Gordic.Pap.Interface.GParamRozpocetReturnDto.d.ts
*                Dto\Gordic.Pap.Interface.GPodaniDto.d.ts
*                Dto\Gordic.Pap.Interface.GPridelPravaDto.d.ts
*                Dto\Gordic.Pap.Interface.GProcesDto.d.ts
*                Dto\Gordic.Pap.Interface.GRestrikceDto.d.ts
*                Dto\Gordic.Pap.Interface.GRozdxmaDto.d.ts
*                Dto\Gordic.Pap.Interface.GRozpocet.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GRzaskpuDto.d.ts
*                Dto\Gordic.Pap.Interface.GRzaslegDto.d.ts
*                Dto\Gordic.Pap.Interface.GRzavlek.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GSmldsbl.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GSmlsiab.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GSmlspid.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GSmlspol.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GSmlssbl.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GSmlUpdAddsbl.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GSmlxsbl.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GSrvdixp.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GSrvdroz.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GTab04VlastnostiDto.d.ts
*                Dto\Gordic.Pap.Interface.GVfpctdgDto.d.ts
*                Dto\Gordic.Pap.Interface.GVyberPripadDto.d.ts
*                Dto\Gordic.Pap.Interface.GVyberUkonDto.d.ts
*                Dto\Gordic.Pap.Interface.GWflhpisPapDto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxaaat.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxakfi.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxarok.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxsesu.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxsesuHr.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxspidPom.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxspol.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxspri.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxvpop.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxvpopTrans.Dto.d.ts
*                Dto\Gordic.Pap.Interface.GXxxvprc.Dto.d.ts
*                Dto\Gordic.Pap.InterfaceGVfpsobl.Dto.d.ts
*                Dto\Const\Gordic.Pap.Interface.GPapAddUpdFinConstDto.d.ts
*                Dto\Const\Gordic.Pap.Interface.GPapFinancovaniConstDto.d.ts
*                Dto\Const\Gordic.Pap.Interface.GPapNavrhyConstDto.d.ts
*                Dto\Const\Gordic.Pap.Interface.GPapPolozkyPlanuConstDto.d.ts
*                Dto\Const\Gordic.Pap.Interface.GPapPozadavkyConstDto.d.ts
*                Dto\Const\Gordic.Pap.Interface.GPapSchvalitParamConstDto.d.ts
*                Dto\Const\Gordic.Pap.Interface.GPapUvolneniConstDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GDdpstpp.Dto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GEkosrea.Dto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GGinsfun.Dto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GSmlcktsDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GSmlctycDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GSmlsden.Dto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GSmlssou.Dto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GSslstyp.Dto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GVfpspouohoorp.Dto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GXxxcdri.Dto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GXxxcduzDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GXxxcessDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GXxxcnerDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GXxxcpriDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GXxxcrezDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GXxxctfiDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GXxxctykDto.d.ts
*                Dto\Controls\Gordic.Pap.Interface.GXxxsesuVDto.d.ts
*                Dto\Controls\Gordic.PapInterface.GPapKnihaDto.d.ts
*                Dto\PapNen\Gordic.Pap.Interface.GMzasdodDto.d.ts
*                Dto\PapNen\Gordic.Pap.Interface.GMzaskozDto.d.ts
*                Dto\PapNen\Gordic.Pap.Interface.GMzasosbDto.d.ts
*                Dto\PapNen\Gordic.Pap.Interface.GMzasoutDto.d.ts
*                Dto\PapNen\Gordic.Pap.Interface.GMzasrolDto.d.ts
*                Dto\PapNen\Gordic.Pap.Interface.GMzassezDto.d.ts
*                Dto\PapNen\Nen\Gordic.Pap.Interface.PapnenDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacdruDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacrosDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacsouDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacstcDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacstzDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacsysDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactpoDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactraDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactydDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactysDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactzpDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacuveDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzaczdvDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacztzDto.d.ts
*                Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzaczzzDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic..Pap.Interface.GMzatdosDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic..Pap.Interface.GMzatpppDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic..Pap.Interface.GMzatzucDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzacceuDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatdinDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatdonDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatprzDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatsdoDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatsmlDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatsplDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatssuDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatzakDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatzkoDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatzokDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatzvdDto.d.ts
*                Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzavzccDto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GArchivInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GArchivOut.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDetail.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDetailSmlouvy.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDodavateleInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDodavateleOutDto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDruhyZRInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GKomunikaceZpInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GMzaKomunikace.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GOrgStruInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GOrgStruOutDto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GPodaniInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GPodaniOutDto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GSeznamPodaniZpInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GSeznamZpInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GSeznamZpOutDto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GSmazatInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GStahniDokumentInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GStahniDokumentyInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GZpAktOutDto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GZpInp.Dto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GZpOutDto.d.ts
*                Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GZpracovatInp.Dto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatdidDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatpprDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatsddDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatsdvDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatsmpDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatssdDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatsusDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzabDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzacDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzaoDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzapDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzasDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzauDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzavDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzayDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\CastiVz\Gordic.Pap.Interface.GMzatcadDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\CastiVz\Gordic.Pap.Interface.GMzatcaoDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\CastiVz\Gordic.Pap.Interface.GMzatcapDto.d.ts
*                Dto\PapNen\Nen\Vazebni tab\CastiVz\Gordic.Pap.Interface.GMzatcauDto.d.ts
*                Dto\Rza\Gordic.Pap.Interface.GRzascfDto.d.ts
*                Dto\Rza\Gordic.Pap.Interface.GRzaseszDto.d.ts
*                Dto\Rza\Gordic.Pap.Interface.GRzaspriDto.d.ts
*                Dto\Rza\Gordic.Pap.Interface.GRzaZadatelNovyWsDto.d.ts
*                Filters\Gordic.Epo.Interface.GEpoFiltrVyberIxsPriDto.d.ts
*                Filters\Gordic.Pap.Interface.GEpoFiltrVyberPorCisNabDto.d.ts
*                Filters\Gordic.Pap.Interface.GPapXxxaaatFiltrDto.d.ts
*                PAP\Obecne\Gordic.Vfp.Interface.VfpspriService.d.ts
*                Service\Administrace\Gordic.Pap.Interface.IGPapAdministrace.d.ts
*                Service\DashBoard\Gordic.Pap.Interface.IGDashBoard.d.ts
*                Service\Detail\RozsirenyPopis\Gordic.Pap.Interface.IGRozsirenyPopis.d.ts
*                Service\DetailSeznam\Schvaleni\Gordic.Pap.Interface.IGSchvaleni.d.ts
*                Service\DetailSeznam\Ukonceni\Gordic.Pap.Interface.IGUkonceni.d.ts
*                Service\Dodavatele\Gordic.Pap.Interface.IGPapDodavatele.d.ts
*                Service\Financovani\Gordic.Pap.Interface.IGFinancovani.d.ts
*                Service\Financovani\Gordic.Pap.Interface.IGStavFinancovani.d.ts
*                Service\Financovani\KontrolaFinancovani\Gordic.Pap.Interface.IGFinancovani.d.ts
*                Service\Financovani\PlanRozpocet\Gordic.Pap.Interface.IGFinancovani.d.ts
*                Service\Financovani\Pozadavky\Gordic.Pap.Interface.IGPozadavky.d.ts
*                Service\Financovani\Pozadavky\Gordic.Pap.Interface.IGPozadavkyNovy.d.ts
*                Service\Financovani\Uvolneni\Gordic.Pap.Interface.IGFinancovani.d.ts
*                Service\HromadneOperace\Gordic.Pap.Interface.IGPapHromadneOperace.d.ts
*                Service\Kniha\Gordic.Pap.Interface.IGPapKniha.d.ts
*                Service\KonektorNen\Gordic.Pap.Interface.IGPapNen.d.ts
*                Service\Menu\Gordic.Pap.Interface.IGNavrhyProhl.d.ts
*                Service\Navrhy\Gordic.Pap.Interface.IGNavrhy.d.ts
*                Service\Navrhy\Prohlizeni\Gordic.Pap.Interface.IGNavrhyProhl.d.ts
*                Service\Navrhy\Sablony\Gordic.Pap.Interface.IGSablony.d.ts
*                Service\Plan_Rozpis\Gordic.Pap.Interface.IGPolozkyPlanHl.d.ts
*                Service\Plan_Rozpis\Gordic.Pap.Interface.IGPolozkyPlanPol.d.ts
*                Service\Podani\VyberPorCisNab\Gordic.Pap.Interface.IGVyberPripad.d.ts
*                Service\Podani\VyberPripad\Gordic.Pap.Interface.IGVyberPripad.d.ts
*                Service\Podani\VyberUkon\Gordic.Pap.Interface.IGVyberPripad.d.ts
*                Service\PolozkyPlanu\Gordic.Pap.Interface.IGPolozkyPlanu.d.ts
*                Service\PolozkyPlanu\Gordic.Pap.Interface.IGPolozkyRozpisu.d.ts
*                Service\PolozkyPlanu\Gordic.Pap.Interface.IGPolozkyRozpisuBr.d.ts
*                Service\PolozkyPlanu\Gordic.Pap.Interface.IGPolozkyRozpisuMimo.d.ts
*                Service\Proces\Gordic.Pap.Interface.IGPapProces.d.ts
*                Service\Smlouvy\Gordic.Pap.Interface.IGSmlouvyHl.d.ts
*                Service\Smlouvy\Gordic.Pap.Interface.IGSmlouvyPol.d.ts
*                Service\Tisk\Gordic.Pap.Interface.IGPapTisk.d.ts
*                Service\ZadostNabidka\Gordic.Pap.Interface.IGZadostNabidka.d.ts
*                Service\Zapisy\Gordic.Pap.Interface.IGSmlouvyHl.d.ts
*                Service\ZpravyDSG\Gordic.Pap.Interface.IGZpravyDSG.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\pap.interface.fields.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Controls\Rza\Gordic.PAp.Inteface.GRzacrezDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzacrez*/
	interface GRzacrezDto {
		/**DBCOLUMN:rzacrez.rez_pri*/
		rez_pri?: number|null;
		/**DBCOLUMN:rzacrez.rez_pri_txt*/
		rez_pri_txt?: string|null;
		/**DBCOLUMN:rzacrez.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacrez.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:rzacrez.k_v*/
		aktivita?: number|null;
	}
	const enum GRzacrezDtoNames { rez_pri = "rez_pri", rez_pri_txt = "rez_pri_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita",}
	const enum GRzacrezDtoFragments { rez_pri = "*", rez_pri_txt = "*", k_v = "*", k_s = "*", aktivita = "*",}
	const enum GRzacrezDtoTypes { rez_pri = "number", rez_pri_txt = "string", k_v = "number", k_s = "string", aktivita = "number",}
	const enum GRzacrezDtoTypeLengths { rez_pri_txt = 100, k_s = 15,}
	/**ENUM:rzacrez*/
	const enum GRzacrezEnum {
		/**Neurčeno*/
		_0=0,
		/**Neutajovaná*/
		_10=10,
		/**Utajovaná realizace*/
		_20=20,
		/**Utajované zadání*/
		_30=30,
		/**Standardní zakázka*/
		_40=40,
		/**Evidenční zadání*/
		_50=50,
		/**Utajovaná zakázka*/
		_60=60,
		/**Zakázka v oblasti obrany a bezpečnosti*/
		_70=70,
		/**Zadání zakázky bez využití elektronického nástroje*/
		_80=80,
	}
	function GRzacrezEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacrezEnum, Gordic.Pap.Interface.GRzacrezDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Controls\Rza\dto\Gordic.Pap.Inteface.GRzacvriDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzacvri*/
	interface GRzacvriDto {
		/**DBCOLUMN:rzacvri.vri_pri*/
		vri_pri?: number|null;
		/**DBCOLUMN:rzacvri.vri_pri_txt*/
		vri_pri_txt?: string|null;
		/**DBCOLUMN:rzacvri.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacvri.k_s*/
		k_s?: string|null;
		vazba_es?: string|null;
		aktivita?: number|null;
	}
	const enum GRzacvriDtoNames { vri_pri = "vri_pri", vri_pri_txt = "vri_pri_txt", k_v = "k_v", k_s = "k_s", vazba_es = "vazba_es", aktivita = "aktivita",}
	const enum GRzacvriDtoFragments { vri_pri = "*", vri_pri_txt = "*", k_v = "*", k_s = "*", vazba_es = "*", aktivita = "*",}
	const enum GRzacvriDtoTypes { vri_pri = "number", vri_pri_txt = "string", k_v = "number", k_s = "string", vazba_es = "string", aktivita = "number",}
	const enum GRzacvriDtoTypeLengths { vri_pri_txt = 100, k_s = 15,}
	/**ENUM:rzacvri*/
	const enum GRzacvriEnum {
		/**Neurčeno*/
		_0=0,
		/**Jednorázová smlouva*/
		_10=10,
		/**Objednávka*/
		_20=20,
		/**Rámcová dohoda s jedním dodavatelem*/
		_30=30,
		/**Rámcová dohoda s více dodavateli*/
		_40=40,
		/**Řízení dynamického nákupního systému*/
		_50=50,
	}
	function GRzacvriEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacvriEnum, Gordic.Pap.Interface.GRzacvriDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Controls\Rza\dto\Gordic.Pap.Interface.GRzacfzcDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzacfzc*/
	interface GRzacfzcDto {
		/**DBCOLUMN:rzacfzc.def_fzc*/
		def_fzc?: number|null;
		/**DBCOLUMN:rzacfzc.def_fzc_txt*/
		def_fzc_txt?: string|null;
		/**DBCOLUMN:rzacfzc.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacfzc.k_s*/
		k_s?: string|null;
	}
	const enum GRzacfzcDtoNames { def_fzc = "def_fzc", def_fzc_txt = "def_fzc_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzacfzcDtoFragments { def_fzc = "*", def_fzc_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzacfzcDtoTypes { def_fzc = "number", def_fzc_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzacfzcDtoTypeLengths { def_fzc_txt = 254, k_s = 15,}
	/**ENUM:rzacfzc*/
	const enum GRzacfzcEnum {
		/**Neurčeno*/
		_0=0,
		/**Příprava zakázky*/
		_1=1,
		/**Naplnění podmínek*/
		_2=2,
		/**Vyhlášení zakázky*/
		_3=3,
		/**Přijetí nabídek*/
		_4=4,
		/**Vyhodnocení nabídek*/
		_5=5,
		/**Vypořádání zakázky*/
		_6=6,
	}
	function GRzacfzcEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacfzcEnum, Gordic.Pap.Interface.GRzacfzcDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Controls\Rza\dto\Gordic.Pap.Interface.GRzaclimDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzaclim*/
	interface GRzaclimDto {
		/**DBCOLUMN:rzaclim.lim_zak*/
		lim_zak?: number|null;
		/**DBCOLUMN:rzaclim.lim_zak_txt*/
		lim_zak_txt?: string|null;
		/**DBCOLUMN:rzaclim.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzaclim.k_s*/
		k_s?: string|null;
	}
	const enum GRzaclimDtoNames { lim_zak = "lim_zak", lim_zak_txt = "lim_zak_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzaclimDtoFragments { lim_zak = "*", lim_zak_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzaclimDtoTypes { lim_zak = "number", lim_zak_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzaclimDtoTypeLengths { lim_zak_txt = 100, k_s = 15,}
	/**ENUM:rzaclim*/
	const enum GRzaclimEnum {
		/**Neurčeno*/
		_0=0,
		/**Úplatný*/
		_10=10,
		/**Bezúplatný*/
		_20=20,
		/**Nadlimitní*/
		_30=30,
		/**Podlimitní*/
		_40=40,
		/**Malého rozsahu*/
		_50=50,
	}
	function GRzaclimEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzaclimEnum, Gordic.Pap.Interface.GRzaclimDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Controls\Rza\dto\Gordic.Pap.Interface.GRzacpruDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzacpru*/
	interface GRzacpruDto {
		/**DBCOLUMN:rzacpru.pre_urc*/
		pre_urc?: number|null;
		/**DBCOLUMN:rzacpru.pre_urc_txt*/
		pre_urc_txt?: string|null;
		/**DBCOLUMN:rzacpru.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzacpru.k_s*/
		k_s?: string|null;
		vazba_es?: string|null;
		/**DBCOLUMN:rzacrez.k_v*/
		aktivita?: number|null;
	}
	const enum GRzacpruDtoNames { pre_urc = "pre_urc", pre_urc_txt = "pre_urc_txt", k_v = "k_v", k_s = "k_s", vazba_es = "vazba_es", aktivita = "aktivita",}
	const enum GRzacpruDtoFragments { pre_urc = "*", pre_urc_txt = "*", k_v = "*", k_s = "*", vazba_es = "*", aktivita = "*",}
	const enum GRzacpruDtoTypes { pre_urc = "number", pre_urc_txt = "string", k_v = "number", k_s = "string", vazba_es = "string", aktivita = "number",}
	const enum GRzacpruDtoTypeLengths { pre_urc_txt = 100, k_s = 15,}
	/**ENUM:rzacpru*/
	const enum GRzacpruEnum {
		/**Neurčeno*/
		_0=0,
		/**Výpůjčka*/
		_10=10,
		/**Nájem*/
		_20=20,
		/**Převod*/
		_30=30,
		/**Dodávky*/
		_40=40,
		/**Služby*/
		_50=50,
		/**Stavební práce*/
		_60=60,
	}
	function GRzacpruEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzacpruEnum, Gordic.Pap.Interface.GRzacpruDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Controls\Rza\dto\Gordic.Pap.Interface.GRzactzaDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzactza*/
	interface GRzactzaDto {
		/**DBCOLUMN:rzactza.pap_tza*/
		pap_tza?: number|null;
		/**DBCOLUMN:rzactza.pap_tza_txt*/
		pap_tza_txt?: string|null;
		/**DBCOLUMN:rzactza.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzactza.k_s*/
		k_s?: string|null;
	}
	const enum GRzactzaDtoNames { pap_tza = "pap_tza", pap_tza_txt = "pap_tza_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRzactzaDtoFragments { pap_tza = "*", pap_tza_txt = "*", k_v = "*", k_s = "*",}
	const enum GRzactzaDtoTypes { pap_tza = "number", pap_tza_txt = "string", k_v = "number", k_s = "string",}
	const enum GRzactzaDtoTypeLengths { pap_tza_txt = 50, k_s = 15,}
	/**ENUM:rzactza*/
	const enum GRzactzaEnum {
		/**Neurčeno*/
		_0=0,
		/**Příjmový*/
		_10=10,
		/**Výdajový*/
		_20=20,
		/**Sloučený*/
		_30=30,
	}
	function GRzactzaEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzactzaEnum, Gordic.Pap.Interface.GRzactzaDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Controls\Rza\dto\Gordic.Pap.Interface.GRzaczprDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzaczpr*/
	interface GRzaczprDto {
		/**DBCOLUMN:rzaczpr.zpu_rea*/
		zpu_rea?: number|null;
		/**DBCOLUMN:rzaczpr.zpu_rea_txt*/
		zpu_rea_txt?: string|null;
		/**DBCOLUMN:rzaczpr.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzaczpr.k_s*/
		k_s?: string|null;
		aktivita?: number|null;
	}
	const enum GRzaczprDtoNames { zpu_rea = "zpu_rea", zpu_rea_txt = "zpu_rea_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita",}
	const enum GRzaczprDtoFragments { zpu_rea = "*", zpu_rea_txt = "*", k_v = "*", k_s = "*", aktivita = "*",}
	const enum GRzaczprDtoTypes { zpu_rea = "number", zpu_rea_txt = "string", k_v = "number", k_s = "string", aktivita = "number",}
	const enum GRzaczprDtoTypeLengths { zpu_rea_txt = 254, k_s = 15,}
	/**ENUM:rzaczpr*/
	const enum GRzaczprEnum {
		/**Neurčeno*/
		_0=0,
		/**Realizace v RZA*/
		_10=10,
		/**Realizace v EIS*/
		_20=20,
		/**Realizace v EVZ*/
		_30=30,
		/**Realizace v EPO*/
		_40=40,
		/**Akviziční záměr*/
		_50=50,
	}
	function GRzaczprEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRzaczprEnum, Gordic.Pap.Interface.GRzaczprDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GAktualizujZakazkyInpDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Vstupní Dto pro aktualizaci zakázek*/
	interface GAktualizujZakazkyInpDto {
		poleNen?: string[]|null;
		zobrazitData?: number|null;
		zpracovatData?: number|null;
		stahnoutData?: number|null;
	}
	const enum GAktualizujZakazkyInpDtoNames { poleNen = "poleNen", zobrazitData = "zobrazitData", zpracovatData = "zpracovatData", stahnoutData = "stahnoutData",}
	const enum GAktualizujZakazkyInpDtoFragments { poleNen = "*", zobrazitData = "*", zpracovatData = "*", stahnoutData = "*",}
	const enum GAktualizujZakazkyInpDtoTypes { poleNen = "string[]", zobrazitData = "number", zpracovatData = "number", stahnoutData = "number",}
	const enum GAktualizujZakazkyInpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GAktualizujZakazkyOutDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Výstupní Dto pro aktualizaci zakázek*/
	interface GAktualizujZakazkyOutDto {
		poleNen?: Gordic.Pap.Interface.GVystupAZ[]|null;
	}
	const enum GAktualizujZakazkyOutDtoNames { poleNen = "poleNen",}
	const enum GAktualizujZakazkyOutDtoFragments { poleNen = "*",}
	const enum GAktualizujZakazkyOutDtoTypes { poleNen = "Gordic.Pap.Interface.GVystupAZ[]",}
	const enum GAktualizujZakazkyOutDtoTypeLengths {}
	/**Vlastni filtr s CFU*/
	interface GVystupAZ {
		/**id NEN*/
		id_nen?: string|null;
		/**stav přenosu*/
		stav_prenosu?: boolean|null;
	}
	const enum GVystupAZNames { id_nen = "id_nen", stav_prenosu = "stav_prenosu",}
	const enum GVystupAZFragments { id_nen = "*", stav_prenosu = "*",}
	const enum GVystupAZTypes { id_nen = "string", stav_prenosu = "boolean",}
	const enum GVystupAZTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GCommonReturnDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro obecnou informaci ohledně serverové operace*/
	interface GCommonReturnDto {
		/**hlavička*/
		hlavicka?: string|null;
		/**dotaz*/
		dotaz?: string|null;
		/**návratová hláška*/
		hlas?: string|null;
		/**úspěch/neúspěch*/
		ok?: boolean|null;
		/**castka*/
		castka?: JsonDecimal|null;
		/**por_cis_nab*/
		por_cis_nab?: number|null;
		/**cis_por*/
		cis_por?: number|null;
	}
	const enum GCommonReturnDtoNames { hlavicka = "hlavicka", dotaz = "dotaz", hlas = "hlas", ok = "ok", castka = "castka", por_cis_nab = "por_cis_nab", cis_por = "cis_por",}
	const enum GCommonReturnDtoFragments { hlavicka = "*", dotaz = "*", hlas = "*", ok = "*", castka = "*", por_cis_nab = "*", cis_por = "*",}
	const enum GCommonReturnDtoTypes { hlavicka = "string", dotaz = "string", hlas = "string", ok = "boolean", castka = "JsonDecimal", por_cis_nab = "number", cis_por = "number",}
	const enum GCommonReturnDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GDashBoardParamsDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro parametry dashboardu*/
	interface GDashBoardParamsDto {
		/**limit1*/
		limit1?: JsonDecimal|null;
		/**limit1*/
		limit3?: JsonDecimal|null;
		/**limit1*/
		limit4?: JsonDecimal|null;
		/**vlastní + nevlastní*/
		allData?: boolean|null;
		pocetKnih?: number|null;
		paramSulPri?: string|null;
		rok?: number|null;
	}
	const enum GDashBoardParamsDtoNames { limit1 = "limit1", limit3 = "limit3", limit4 = "limit4", allData = "allData", pocetKnih = "pocetKnih", paramSulPri = "paramSulPri", rok = "rok",}
	const enum GDashBoardParamsDtoFragments { limit1 = "*", limit3 = "*", limit4 = "*", allData = "*", pocetKnih = "*", paramSulPri = "*", rok = "*",}
	const enum GDashBoardParamsDtoTypes { limit1 = "JsonDecimal", limit3 = "JsonDecimal", limit4 = "JsonDecimal", allData = "boolean", pocetKnih = "number", paramSulPri = "string", rok = "number",}
	const enum GDashBoardParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GDatVyhlInputDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro informaci ohledně pole dat_vyhl*/
	interface GDatVyhlInputDto {
		/**datum vyhlášení*/
		dat_vyhl?: JsonDate|null;
		/**měna*/
		mena?: number|null;
		/**lim_zac*/
		lim_zac?: number|null;
		/**identifikátor*/
		ixs_pri?: string|null;
		/**zda bylo využito zkrácení*/
		vyuzito_zkraceni?: boolean|null;
		/**možnost zkrácení*/
		lze_zkratit?: boolean|null;
		/**soutěž*/
		soutez?: string|null;
		/**z jaké obrazovky bylo voláno?*/
		obrazovka?: number|null;
		/**kontrola přes 137*/
		is137?: boolean|null;
	}
	const enum GDatVyhlInputDtoNames { dat_vyhl = "dat_vyhl", mena = "mena", lim_zac = "lim_zac", ixs_pri = "ixs_pri", vyuzito_zkraceni = "vyuzito_zkraceni", lze_zkratit = "lze_zkratit", soutez = "soutez", obrazovka = "obrazovka", is137 = "is137",}
	const enum GDatVyhlInputDtoFragments { dat_vyhl = "*", mena = "*", lim_zac = "*", ixs_pri = "*", vyuzito_zkraceni = "*", lze_zkratit = "*", soutez = "*", obrazovka = "*", is137 = "*",}
	const enum GDatVyhlInputDtoTypes { dat_vyhl = "JsonDate", mena = "number", lim_zac = "number", ixs_pri = "string", vyuzito_zkraceni = "boolean", lze_zkratit = "boolean", soutez = "string", obrazovka = "number", is137 = "boolean",}
	const enum GDatVyhlInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GDatVyhlReturnDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro informaci ohledně pole dat_vyhl*/
	interface GDatVyhlReturnDto {
		/**dotaz*/
		dotaz?: string|null;
		/**návratová hláška*/
		hlas?: string|null;
		/**úspěch/neúspěch*/
		ok?: boolean|null;
		/**castka*/
		castka?: JsonDecimal|null;
		/**kurz*/
		kurz?: JsonDecimal|null;
		/**m*/
		m?: JsonDecimal|null;
		/**vyuzit_zkraceni_po*/
		lze_zkratit?: boolean|null;
		/**titulek*/
		titulek?: string|null;
		/**dat_vyhl_true*/
		dat_vyhl_true?: JsonDate|null;
		/**dat_vyhl_false*/
		dat_vyhl_false?: JsonDate|null;
		/**readOnly*/
		readOnly?: boolean|null;
	}
	const enum GDatVyhlReturnDtoNames { dotaz = "dotaz", hlas = "hlas", ok = "ok", castka = "castka", kurz = "kurz", m = "m", lze_zkratit = "lze_zkratit", titulek = "titulek", dat_vyhl_true = "dat_vyhl_true", dat_vyhl_false = "dat_vyhl_false", readOnly = "readOnly",}
	const enum GDatVyhlReturnDtoFragments { dotaz = "*", hlas = "*", ok = "*", castka = "*", kurz = "*", m = "*", lze_zkratit = "*", titulek = "*", dat_vyhl_true = "*", dat_vyhl_false = "*", readOnly = "*",}
	const enum GDatVyhlReturnDtoTypes { dotaz = "string", hlas = "string", ok = "boolean", castka = "JsonDecimal", kurz = "JsonDecimal", m = "JsonDecimal", lze_zkratit = "boolean", titulek = "string", dat_vyhl_true = "JsonDate", dat_vyhl_false = "JsonDate", readOnly = "boolean",}
	const enum GDatVyhlReturnDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GDoplnParamPripadDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**návratové Dto pro doplnění eko parametrů pro seznam případů*/
	interface GDoplnParamPripadDto {
		zda_sml?: string|null;
		sta_sml?: string|null;
		poc_dokl?: number|null;
		sta_uko?: string|null;
		poc_zado?: number|null;
		c_poz_dt_celk?: JsonDecimal|null;
		c_predp_dt_celk?: JsonDecimal|null;
		c_real_dt_celk?: JsonDecimal|null;
		/**je_fin*/
		je_fin?: string|null;
		po_filuta?: number|null;
		ident_zpo?: number|null;
		po_case?: number|null;
	}
	const enum GDoplnParamPripadDtoNames { zda_sml = "zda_sml", sta_sml = "sta_sml", poc_dokl = "poc_dokl", sta_uko = "sta_uko", poc_zado = "poc_zado", c_poz_dt_celk = "c_poz_dt_celk", c_predp_dt_celk = "c_predp_dt_celk", c_real_dt_celk = "c_real_dt_celk", je_fin = "je_fin", po_filuta = "po_filuta", ident_zpo = "ident_zpo", po_case = "po_case",}
	const enum GDoplnParamPripadDtoFragments { zda_sml = "*", sta_sml = "*", poc_dokl = "*", sta_uko = "*", poc_zado = "*", c_poz_dt_celk = "*", c_predp_dt_celk = "*", c_real_dt_celk = "*", je_fin = "*", po_filuta = "*", ident_zpo = "*", po_case = "*",}
	const enum GDoplnParamPripadDtoTypes { zda_sml = "string", sta_sml = "string", poc_dokl = "number", sta_uko = "string", poc_zado = "number", c_poz_dt_celk = "JsonDecimal", c_predp_dt_celk = "JsonDecimal", c_real_dt_celk = "JsonDecimal", je_fin = "string", po_filuta = "number", ident_zpo = "number", po_case = "number",}
	const enum GDoplnParamPripadDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GDruhZadRizDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Výstupní Dto druh zadávacího řízení*/
	interface GDruhZadRizDto {
		nazev?: string|null;
		kod?: number|null;
	}
	const enum GDruhZadRizDtoNames { nazev = "nazev", kod = "kod",}
	const enum GDruhZadRizDtoFragments { nazev = "*", kod = "*",}
	const enum GDruhZadRizDtoTypes { nazev = "string", kod = "number",}
	const enum GDruhZadRizDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GDruhZadRizOutDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Výstupní Dto druh zadávacího řízení*/
	interface GDruhZadRizOutDto {
		list?: Gordic.Pap.Interface.GDruhZadRizDto[]|null;
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
	}
	const enum GDruhZadRizOutDtoNames { list = "list", navrat = "navrat",}
	const enum GDruhZadRizOutDtoFragments { list = "*", navrat = "*",}
	const enum GDruhZadRizOutDtoTypes { list = "Gordic.Pap.Interface.GDruhZadRizDto[]", navrat = "Gordic.Pap.Interface.GCommonReturnDto",}
	const enum GDruhZadRizOutDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GEsuKontrolaDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**návratové Dto pro obecnou informaci ohledně esu*/
	interface GEsuKontrolaDto {
		/**bu_ci*/
		esu?: Gordic.Pap.Interface.GEsuParametryDto|null;
		/**sk_ci*/
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
	}
	const enum GEsuKontrolaDtoNames { esu = "esu", navrat = "navrat",}
	const enum GEsuKontrolaDtoFragments { esu = "*", navrat = "*",}
	const enum GEsuKontrolaDtoTypes { esu = "Gordic.Pap.Interface.GEsuParametryDto", navrat = "Gordic.Pap.Interface.GCommonReturnDto",}
	const enum GEsuKontrolaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GEsuParametryDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro obecnou informaci esu*/
	interface GEsuParametryDto {
		/**bu_ci*/
		bu_ci?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**pr_forma*/
		pr_forma?: string|null;
	}
	const enum GEsuParametryDtoNames { bu_ci = "bu_ci", sk_ci = "sk_ci", pr_forma = "pr_forma",}
	const enum GEsuParametryDtoFragments { bu_ci = "*", sk_ci = "*", pr_forma = "*",}
	const enum GEsuParametryDtoTypes { bu_ci = "string", sk_ci = "string", pr_forma = "string",}
	const enum GEsuParametryDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GEvzsazaDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:evzsaza*/
	interface GEvzsazaDto {
		/**DBCOLUMN:evzsaza.ixs_aza*/
		ixs_aza?: string|null;
		/**DBCOLUMN:evzsaza.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:evzsaza.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:evzsaza.profil*/
		profil?: string|null;
		/**DBCOLUMN:evzsaza.telefon*/
		telefon?: string|null;
		/**DBCOLUMN:evzsaza.mail*/
		mail?: string|null;
		/**DBCOLUMN:evzsaza.obec*/
		obec?: string|null;
		/**DBCOLUMN:evzsaza.cast_obce*/
		cast_obce?: string|null;
		/**DBCOLUMN:evzsaza.ulice*/
		ulice?: string|null;
		/**DBCOLUMN:evzsaza.cislo_o*/
		cislo_o?: string|null;
		/**DBCOLUMN:evzsaza.cislo_p*/
		cislo_p?: string|null;
		/**DBCOLUMN:evzsaza.psc*/
		psc?: string|null;
		/**DBCOLUMN:evzsaza.ico*/
		ico?: string|null;
		/**DBCOLUMN:evzsaza.url_zadava*/
		url_zadava?: string|null;
		/**DBCOLUMN:evzsaza.url_profil*/
		url_profil?: string|null;
		/**DBCOLUMN:evzsaza.url_trzist*/
		url_trzist?: string|null;
		/**DBCOLUMN:evzsaza.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:evzsaza.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:evzsaza.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:evzsaza.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:evzsaza.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:evzsaza.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:evzsaza.ixs_fun*/
		ixs_fun?: string|null;
		ixs_fun_nazev?: string|null;
		/**DBCOLUMN:evzsaza.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:evzsaza.nazev_ref*/
		nazev_rf?: string|null;
		/**DBCOLUMN:evzsaza.cis_real*/
		cis_real?: string|null;
		cis_real_txt?: string|null;
		hlas?: string|null;
	}
	const enum GEvzsazaDtoNames { ixs_aza = "ixs_aza", zkratka = "zkratka", nazev = "nazev", profil = "profil", telefon = "telefon", mail = "mail", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cislo_o = "cislo_o", cislo_p = "cislo_p", psc = "psc", ico = "ico", url_zadava = "url_zadava", url_profil = "url_profil", url_trzist = "url_trzist", aktivita = "aktivita", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun = "ixs_fun", ixs_fun_nazev = "ixs_fun_nazev", nazev_ref = "nazev_ref", nazev_rf = "nazev_rf", cis_real = "cis_real", cis_real_txt = "cis_real_txt", hlas = "hlas",}
	const enum GEvzsazaDtoFragments { ixs_aza = "*", zkratka = "*", nazev = "*", profil = "*", telefon = "*", mail = "*", obec = "*", cast_obce = "*", ulice = "*", cislo_o = "*", cislo_p = "*", psc = "*", ico = "*", url_zadava = "*", url_profil = "*", url_trzist = "*", aktivita = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_fun = "*", ixs_fun_nazev = "*", nazev_ref = "*", nazev_rf = "*", cis_real = "*", cis_real_txt = "*", hlas = "*",}
	const enum GEvzsazaDtoTypes { ixs_aza = "string", zkratka = "string", nazev = "string", profil = "string", telefon = "string", mail = "string", obec = "string", cast_obce = "string", ulice = "string", cislo_o = "string", cislo_p = "string", psc = "string", ico = "string", url_zadava = "string", url_profil = "string", url_trzist = "string", aktivita = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun = "string", ixs_fun_nazev = "string", nazev_ref = "string", nazev_rf = "string", cis_real = "string", cis_real_txt = "string", hlas = "string",}
	const enum GEvzsazaDtoTypeLengths { ixs_aza = 12, zkratka = 16, nazev = 254, profil = 254, telefon = 33, mail = 254, obec = 48, cast_obce = 48, ulice = 48, cislo_o = 6, cislo_p = 8, psc = 12, ico = 10, url_zadava = 254, url_profil = 254, url_trzist = 254, poznamka = 50, zmenu_prov = 12, ixs_fun = 12, cis_real = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GEvzskdnDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:evzskdn*/
	interface GEvzskdnDto {
		/**DBCOLUMN:evzskdn.ixs_kdn*/
		ixs_kdn?: string|null;
		/**DBCOLUMN:evzskdn.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:evzskdn.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:evzskdn.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:evzskdn.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:evzskdn.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:evzskdn.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:evzskdn.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:evzskdn.zmenu_prov*/
		zmenu_prov?: string|null;
		/**příznak, jestli lze smazat kategorii*/
		smazat?: boolean|null;
		nazev_rf?: string|null;
		hlas?: string|null;
	}
	const enum GEvzskdnDtoNames { ixs_kdn = "ixs_kdn", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", smazat = "smazat", nazev_rf = "nazev_rf", hlas = "hlas",}
	const enum GEvzskdnDtoFragments { ixs_kdn = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", smazat = "*", nazev_rf = "*", hlas = "*",}
	const enum GEvzskdnDtoTypes { ixs_kdn = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", smazat = "boolean", nazev_rf = "string", hlas = "string",}
	const enum GEvzskdnDtoTypeLengths { ixs_kdn = 12, zkratka = 16, nazev = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GEvzskpuDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:evzskpu*/
	interface GEvzskpuDto {
		/**DBCOLUMN:evzskpu.kat_pru*/
		kat_pru?: number|null;
		/**DBCOLUMN:evzskpu.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:evzskpu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:evzskpu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:evzskpu.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:evzskpu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:evzskpu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**hlas*/
		hlas?: string|null;
	}
	const enum GEvzskpuDtoNames { kat_pru = "kat_pru", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", hlas = "hlas",}
	const enum GEvzskpuDtoFragments { kat_pru = "*", zkratka = "*", nazev = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", hlas = "*",}
	const enum GEvzskpuDtoTypes { kat_pru = "number", zkratka = "string", nazev = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", hlas = "string",}
	const enum GEvzskpuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GEvzsoko.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GEvzsokoDto {
		/**DBCOLUMN:Seznam.ixs_oko*/
		ixs_oko?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Seznam.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Seznam.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:Seznam.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		nazev_rf?: string|null;
		/**lze smazat*/
		smazat?: boolean|null;
		/**hlas*/
		hlas?: string|null;
	}
	const enum GEvzsokoDtoNames { ixs_oko = "ixs_oko", zkratka = "zkratka", nazev = "nazev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", aktivita = "aktivita", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ixs_ref = "ixs_ref", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf", smazat = "smazat", hlas = "hlas",}
	const enum GEvzsokoDtoFragments { ixs_oko = "*", zkratka = "*", nazev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", aktivita = "*", poznamka = "*", dat_od = "*", dat_do = "*", ixs_ref = "*", dat_zmena = "*", nazev_rf = "*", smazat = "*", hlas = "*",}
	const enum GEvzsokoDtoTypes { ixs_oko = "string", zkratka = "string", nazev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", aktivita = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ixs_ref = "string", dat_zmena = "JsonDate", nazev_rf = "string", smazat = "boolean", hlas = "string",}
	const enum GEvzsokoDtoTypeLengths { ixs_oko = 12, zkratka = 16, nazev = 100, jmeno = 24, prijmeni = 36, tit_pred = 35, tit_za = 35, poznamka = 50, ixs_ref = 12, nazev_rf = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GEvzvvzcDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:evzvvzc*/
	interface GEvzvvzcDto {
		/**DBCOLUMN:evzvvzc.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:evzvvzc.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:evzvvzc.ixs_pri_cast*/
		ixs_pri_cast?: string|null;
		/**DBCOLUMN:evzvvzc.c_cast*/
		c_cast?: JsonDecimal|null;
		/**DBCOLUMN:evzvvzc.proc_cast*/
		proc_cast?: JsonDecimal|null;
		/**DBCOLUMN:evzvvzc.odu_cast*/
		odu_cast?: string|null;
		/**DBCOLUMN:evzvvzc.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:evzvvzc.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:evzvvzc.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:evzvvzc.poznamka*/
		poznamka?: string|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
	}
	const enum GEvzvvzcDtoNames { ixs_pri = "ixs_pri", por_cis = "por_cis", ixs_pri_cast = "ixs_pri_cast", c_cast = "c_cast", proc_cast = "proc_cast", odu_cast = "odu_cast", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poznamka = "poznamka", ac_ag = "ac_ag", nazev_rf = "nazev_rf",}
	const enum GEvzvvzcDtoFragments { ixs_pri = "*", por_cis = "*", ixs_pri_cast = "*", c_cast = "*", proc_cast = "*", odu_cast = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", poznamka = "*", ac_ag = "*", nazev_rf = "*",}
	const enum GEvzvvzcDtoTypes { ixs_pri = "string", por_cis = "number", ixs_pri_cast = "string", c_cast = "JsonDecimal", proc_cast = "JsonDecimal", odu_cast = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", poznamka = "string", ac_ag = "string", nazev_rf = "string",}
	const enum GEvzvvzcDtoTypeLengths { ixs_pri = 12, ixs_pri_cast = 12, odu_cast = 254, zmenu_prov = 12, poznamka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GGindkon.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GGindkonDto {
		/**DBCOLUMN:Seznam.por_cis_kon*/
		por_cis_kon?: number|null;
		/**DBCOLUMN:Seznam.typ_kobj*/
		typ_kobj?: number|null;
		/**DBCOLUMN:Seznam.typ_vkon*/
		typ_vkon?: number|null;
		/**DBCOLUMN:Seznam.zav_kon*/
		zav_kon?: number|null;
		/**DBCOLUMN:Seznam.zav_kon_txt*/
		zav_kon_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixx_1*/
		ixx_1?: string|null;
		/**DBCOLUMN:Seznam.ixx_2*/
		ixx_2?: string|null;
		/**DBCOLUMN:Seznam.ixx_3*/
		ixx_3?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_avi*/
		ixs_fun_avi?: string|null;
		/**DBCOLUMN:Seznam.dat_navedomi*/
		dat_navedomi?: JsonDate|null;
		/**DBCOLUMN:Seznam.txt_1*/
		txt_1?: string|null;
		/**DBCOLUMN:Seznam.txt_2*/
		txt_2?: string|null;
		/**DBCOLUMN:Seznam.txt_3*/
		txt_3?: string|null;
		/**DBCOLUMN:Seznam.ixb_pri*/
		ixb_pri?: string|null;
		/**DBCOLUMN:Seznam.por_cis_oav*/
		por_cis_oav?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena_ginlkon*/
		dat_zmena_ginlkon?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_koch*/
		typ_koch?: number|null;
		/**DBCOLUMN:Seznam.typ_koch_txt*/
		typ_koch_txt?: string|null;
	}
	const enum GGindkonDtoNames { por_cis_kon = "por_cis_kon", typ_kobj = "typ_kobj", typ_vkon = "typ_vkon", zav_kon = "zav_kon", zav_kon_txt = "zav_kon_txt", dat_do = "dat_do", ixx_1 = "ixx_1", ixx_2 = "ixx_2", ixx_3 = "ixx_3", ixs_fun_akt = "ixs_fun_akt", nazev_rf = "nazev_rf", ixs_fun_avi = "ixs_fun_avi", dat_navedomi = "dat_navedomi", txt_1 = "txt_1", txt_2 = "txt_2", txt_3 = "txt_3", ixb_pri = "ixb_pri", por_cis_oav = "por_cis_oav", aktivita = "aktivita", dat_zmena = "dat_zmena", dat_zmena_ginlkon = "dat_zmena_ginlkon", zmenu_prov = "zmenu_prov", dat_od = "dat_od", typ_koch = "typ_koch", typ_koch_txt = "typ_koch_txt",}
	const enum GGindkonDtoFragments { por_cis_kon = "*", typ_kobj = "*", typ_vkon = "*", zav_kon = "*", zav_kon_txt = "*", dat_do = "*", ixx_1 = "*", ixx_2 = "*", ixx_3 = "*", ixs_fun_akt = "*", nazev_rf = "*", ixs_fun_avi = "*", dat_navedomi = "*", txt_1 = "*", txt_2 = "*", txt_3 = "*", ixb_pri = "*", por_cis_oav = "*", aktivita = "*", dat_zmena = "*", dat_zmena_ginlkon = "*", zmenu_prov = "*", dat_od = "*", typ_koch = "*", typ_koch_txt = "*",}
	const enum GGindkonDtoTypes { por_cis_kon = "number", typ_kobj = "number", typ_vkon = "number", zav_kon = "number", zav_kon_txt = "string", dat_do = "JsonDate", ixx_1 = "string", ixx_2 = "string", ixx_3 = "string", ixs_fun_akt = "string", nazev_rf = "string", ixs_fun_avi = "string", dat_navedomi = "JsonDate", txt_1 = "string", txt_2 = "string", txt_3 = "string", ixb_pri = "string", por_cis_oav = "number", aktivita = "number", dat_zmena = "JsonDate", dat_zmena_ginlkon = "JsonDate", zmenu_prov = "string", dat_od = "JsonDate", typ_koch = "number", typ_koch_txt = "string",}
	const enum GGindkonDtoTypeLengths { zav_kon_txt = 50, ixx_1 = 254, ixx_2 = 50, ixx_3 = 50, ixs_fun_akt = 12, nazev_rf = 50, ixs_fun_avi = 12, txt_1 = 254, txt_2 = 254, txt_3 = 254, ixb_pri = 12, zmenu_prov = 12, typ_koch_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GGinsesuDto.d.ts 

declare namespace Gordic.Pap.Interface.Dto {
	/**DBTABLE:ginsesu*/
	interface GGinsesuDto {
		/**DBCOLUMN:ginsesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:ginsesu.ob_jmeno*/
		ob_jmeno?: string|null;
		/**DBCOLUMN:ginsesu.obec*/
		obec?: string|null;
		/**DBCOLUMN:ginsesu.cast_obce*/
		cast_obce?: string|null;
		/**DBCOLUMN:ginsesu.ulice*/
		ulice?: string|null;
		/**DBCOLUMN:ginsesu.cor*/
		cor?: string|null;
		/**DBCOLUMN:ginsesu.cpop*/
		cpop?: string|null;
		/**DBCOLUMN:ginsesu.ico*/
		ico?: string|null;
		/**DBCOLUMN:ginsesu.dic*/
		dic?: string|null;
		/**DBCOLUMN:ginsesu.ixs_su*/
		ixs_su?: string|null;
		aktualni?: boolean|null;
	}
	const enum GGinsesuDtoNames { ixs_esu = "ixs_esu", ob_jmeno = "ob_jmeno", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", ico = "ico", dic = "dic", ixs_su = "ixs_su", aktualni = "aktualni",}
	const enum GGinsesuDtoFragments { ixs_esu = "*", ob_jmeno = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", ico = "*", dic = "*", ixs_su = "*", aktualni = "*",}
	const enum GGinsesuDtoTypes { ixs_esu = "string", ob_jmeno = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", ico = "string", dic = "string", ixs_su = "string", aktualni = "boolean",}
	const enum GGinsesuDtoTypeLengths { ixs_esu = 12, ob_jmeno = 254, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, ico = 14, dic = 15, ixs_su = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GHromPredatTiskDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto tisk předávacího protokolu*/
	interface GHromPredatTiskDto {
		/**seznam dokladů*/
		Seznam?: Gordic.Pap.Interface.GPapStruDto[]|null;
		/**IxsFunVyriz*/
		IxsFunVyriz?: string|null;
		/**IxsFun*/
		IxsFun?: string|null;
		/**Duvod*/
		Duvod?: string|null;
	}
	const enum GHromPredatTiskDtoNames { Seznam = "Seznam", IxsFunVyriz = "IxsFunVyriz", IxsFun = "IxsFun", Duvod = "Duvod",}
	const enum GHromPredatTiskDtoFragments { Seznam = "*", IxsFunVyriz = "*", IxsFun = "*", Duvod = "*",}
	const enum GHromPredatTiskDtoTypes { Seznam = "Gordic.Pap.Interface.GPapStruDto[]", IxsFunVyriz = "string", IxsFun = "string", Duvod = "string",}
	const enum GHromPredatTiskDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GIdentVZ.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Identifikace VZ*/
	interface GIdentVZDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**vz_cislo_etrz*/
		vz_cislo_etrz?: string|null;
		/**vz_cislo_inen*/
		vz_cislo_inen?: string|null;
		/**vz_cislo_prof*/
		vz_cislo_prof?: string|null;
		/**vz_cislo_vevz*/
		vz_cislo_vevz?: string|null;
		/**priz_zve_vevz*/
		priz_zve_vevz?: number|null;
		/**priz_zve_prof*/
		priz_zve_prof?: number|null;
		/**priz_zve_etrz*/
		priz_zve_etrz?: number|null;
		/**priz_zve_inen*/
		priz_zve_inen?: number|null;
		/**rezim_pri*/
		rezim_pri?: number|null;
	}
	const enum GIdentVZDtoNames { ixs_pri = "ixs_pri", vz_cislo_etrz = "vz_cislo_etrz", vz_cislo_inen = "vz_cislo_inen", vz_cislo_prof = "vz_cislo_prof", vz_cislo_vevz = "vz_cislo_vevz", priz_zve_vevz = "priz_zve_vevz", priz_zve_prof = "priz_zve_prof", priz_zve_etrz = "priz_zve_etrz", priz_zve_inen = "priz_zve_inen", rezim_pri = "rezim_pri",}
	const enum GIdentVZDtoFragments { ixs_pri = "*", vz_cislo_etrz = "*", vz_cislo_inen = "*", vz_cislo_prof = "*", vz_cislo_vevz = "*", priz_zve_vevz = "*", priz_zve_prof = "*", priz_zve_etrz = "*", priz_zve_inen = "*", rezim_pri = "*",}
	const enum GIdentVZDtoTypes { ixs_pri = "string", vz_cislo_etrz = "string", vz_cislo_inen = "string", vz_cislo_prof = "string", vz_cislo_vevz = "string", priz_zve_vevz = "number", priz_zve_prof = "number", priz_zve_etrz = "number", priz_zve_inen = "number", rezim_pri = "number",}
	const enum GIdentVZDtoTypeLengths { ixs_pri = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GMzacddnDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacddn*/
	interface GMzacddnDto {
		/**DBCOLUMN:mzacddn.druh_dn*/
		druh_dn?: number|null;
		/**DBCOLUMN:mzacddn.druh_dn_txt*/
		druh_dn_txt?: string|null;
		/**DBCOLUMN:mzacddn.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzacddn.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacddn.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzacddn.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzacddnDtoNames { druh_dn = "druh_dn", druh_dn_txt = "druh_dn_txt", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzacddnDtoFragments { druh_dn = "*", druh_dn_txt = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzacddnDtoTypes { druh_dn = "number", druh_dn_txt = "string", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzacddnDtoTypeLengths { druh_dn_txt = 50, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzacddn*/
	const enum GMzacddnEnum {
		/**Neurčeno*/
		_0=0,
	}
	function GMzacddnEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacddnEnum, Gordic.Pap.Interface.GMzacddnDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapAddUpdFinDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Struktura pro ukládání záznamu financování*/
	interface GPapAddUpdFinDto {
		/**true/false - update/insert*/
		is_update?: boolean|null;
		/**částka maximální*/
		c_max?: JsonDecimal|null;
		/**částka maximální pro rezervaci*/
		c_max_rez?: JsonDecimal|null;
		/**Chybová či jiná hláška*/
		hlas?: string|null;
		/**operace se zdařila?*/
		ok?: boolean|null;
		/**záznam financování*/
		zaznam?: Gordic.Pap.Interface.GXxxspolDto|null;
		/**kontrola?*/
		kontrola?: boolean|null;
		/**chyba*/
		chybaTvrda?: boolean|null;
	}
	const enum GPapAddUpdFinDtoNames { is_update = "is_update", c_max = "c_max", c_max_rez = "c_max_rez", hlas = "hlas", ok = "ok", zaznam = "zaznam", kontrola = "kontrola", chybaTvrda = "chybaTvrda",}
	const enum GPapAddUpdFinDtoFragments { is_update = "*", c_max = "*", c_max_rez = "*", hlas = "*", ok = "*", zaznam = "*", kontrola = "*", chybaTvrda = "*",}
	const enum GPapAddUpdFinDtoTypes { is_update = "boolean", c_max = "JsonDecimal", c_max_rez = "JsonDecimal", hlas = "string", ok = "boolean", zaznam = "Gordic.Pap.Interface.GXxxspolDto", kontrola = "boolean", chybaTvrda = "boolean",}
	const enum GPapAddUpdFinDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapCfuFilterDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Jedno rozsirene CFU*/
	interface GPapCfuDto extends Gordic.Eko.Interface.GCfuFilterDto {
		/**Nakladove stredisko*/
		nks?: GIntervalDto<string>|null;
	}
	const enum GPapCfuDtoNames { nks = "nks", cfu = "cfu",}
	const enum GPapCfuDtoFragments { nks = "*", cfu = "*",}
	const enum GPapCfuDtoTypes { nks = "GIntervalDto<string>", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GPapCfuDtoTypeLengths {}
	/**Vlastni filtr s CFU*/
	interface GPapCfuFilterDto {
		/**elementy cfu*/
		cfu?: Gordic.Pap.Interface.GPapCfuDto[]|null;
	}
	const enum GPapCfuFilterDtoNames { cfu = "cfu",}
	const enum GPapCfuFilterDtoFragments { cfu = "*",}
	const enum GPapCfuFilterDtoTypes { cfu = "Gordic.Pap.Interface.GPapCfuDto[]",}
	const enum GPapCfuFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapCommomArrayStringDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Obecné dto pro předávání polí identifikátorů ....*/
	interface GPapCommonArrayDto {
		/**seznam*/
		seznam?: Gordic.Pap.Interface.GPapStruDto[]|null;
		/**schvaleni/odschvaleni 
		*     ///
		*/
		akce?: string|null;
		/**odpověďi na dotazy -1/0/1 = Ne/Nepoužito/Ano*/
		odpoved?: number[]|null;
		/**parametr*/
		param?: number|null;
		/**Jde o Hromadné operace?*/
		HO?: boolean|null;
		/**Hromadné operace - kontrola = true, provedení akce = false;*/
		KontrolaHO?: boolean|null;
	}
	const enum GPapCommonArrayDtoNames { seznam = "seznam", akce = "akce", odpoved = "odpoved", param = "param", HO = "HO", KontrolaHO = "KontrolaHO",}
	const enum GPapCommonArrayDtoFragments { seznam = "*", akce = "*", odpoved = "*", param = "*", HO = "*", KontrolaHO = "*",}
	const enum GPapCommonArrayDtoTypes { seznam = "Gordic.Pap.Interface.GPapStruDto[]", akce = "string", odpoved = "number[]", param = "number", HO = "boolean", KontrolaHO = "boolean",}
	const enum GPapCommonArrayDtoTypeLengths {}
	/**Něco pro předávání*/
	interface GPapStruDto {
		/**ixp_pri pro schválení*/
		identifikator?: string|null;
		/**cis_zakon pro schválení*/
		cislo?: number|null;
		cisloDecBez?: JsonDecimal|null;
		cisloDec?: JsonDecimal|null;
		datum?: JsonDate|null;
		/**stav případu*/
		stav?: number|null;
		ac?: string|null;
		ac_ag?: string|null;
		nazev?: string|null;
		stav_txt?: string|null;
		vlastnik?: string|null;
		vlastnikIdent?: string|null;
		por_cis_nab?: number|null;
		cis_por?: number|null;
		pripad?: string|null;
		ixs_esu?: string|null;
		pripadNovy?: string|null;
		ixp_den?: string|null;
		/**popis*/
		popis?: string|null;
		/**ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**ixp_den_txt*/
		ixp_den_txt?: string|null;
		duvod?: string|null;
	}
	const enum GPapStruDtoNames { identifikator = "identifikator", cislo = "cislo", cisloDecBez = "cisloDecBez", cisloDec = "cisloDec", datum = "datum", stav = "stav", ac = "ac", ac_ag = "ac_ag", nazev = "nazev", stav_txt = "stav_txt", vlastnik = "vlastnik", vlastnikIdent = "vlastnikIdent", por_cis_nab = "por_cis_nab", cis_por = "cis_por", pripad = "pripad", ixs_esu = "ixs_esu", pripadNovy = "pripadNovy", ixp_den = "ixp_den", popis = "popis", ixs_typ_txt = "ixs_typ_txt", ixp_den_txt = "ixp_den_txt", duvod = "duvod",}
	const enum GPapStruDtoFragments { identifikator = "*", cislo = "*", cisloDecBez = "*", cisloDec = "*", datum = "*", stav = "*", ac = "*", ac_ag = "*", nazev = "*", stav_txt = "*", vlastnik = "*", vlastnikIdent = "*", por_cis_nab = "*", cis_por = "*", pripad = "*", ixs_esu = "*", pripadNovy = "*", ixp_den = "*", popis = "*", ixs_typ_txt = "*", ixp_den_txt = "*", duvod = "*",}
	const enum GPapStruDtoTypes { identifikator = "string", cislo = "number", cisloDecBez = "JsonDecimal", cisloDec = "JsonDecimal", datum = "JsonDate", stav = "number", ac = "string", ac_ag = "string", nazev = "string", stav_txt = "string", vlastnik = "string", vlastnikIdent = "string", por_cis_nab = "number", cis_por = "number", pripad = "string", ixs_esu = "string", pripadNovy = "string", ixp_den = "string", popis = "string", ixs_typ_txt = "string", ixp_den_txt = "string", duvod = "string",}
	const enum GPapStruDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapDashBoardDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro dashboard*/
	interface GPapDashboardDto {
		/**podíl financování*/
		podil?: JsonDecimal|null;
		/**počet bez financování*/
		bezFin?: number|null;
		/**podíl slm*/
		podilSml?: JsonDecimal|null;
		/**počet bez sml*/
		bezSml?: number|null;
		/**podíl rezervací*/
		podilRez?: JsonDecimal|null;
		/**počet bez rezervací*/
		bezRez?: number|null;
		/**10 posledních změněných záznamů*/
		hist?: Gordic.Pap.Interface.GPapHistDto[]|null;
		/**agenda*/
		countTxt?: string[]|null;
		/**10 posledních změněných knih*/
		prehled?: Gordic.Pap.Interface.GPapDashboardPrehledDto[]|null;
		/**Mza stav dávek*/
		stavDavek?: Gordic.Pap.Interface.GPapDashboardStavDavekDto[]|null;
	}
	const enum GPapDashboardDtoNames { podil = "podil", bezFin = "bezFin", podilSml = "podilSml", bezSml = "bezSml", podilRez = "podilRez", bezRez = "bezRez", hist = "hist", countTxt = "countTxt", prehled = "prehled", stavDavek = "stavDavek",}
	const enum GPapDashboardDtoFragments { podil = "*", bezFin = "*", podilSml = "*", bezSml = "*", podilRez = "*", bezRez = "*", hist = "*", countTxt = "*", prehled = "*", stavDavek = "*",}
	const enum GPapDashboardDtoTypes { podil = "JsonDecimal", bezFin = "number", podilSml = "JsonDecimal", bezSml = "number", podilRez = "JsonDecimal", bezRez = "number", hist = "Gordic.Pap.Interface.GPapHistDto[]", countTxt = "string[]", prehled = "Gordic.Pap.Interface.GPapDashboardPrehledDto[]", stavDavek = "Gordic.Pap.Interface.GPapDashboardStavDavekDto[]",}
	const enum GPapDashboardDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapDashBoardFiltryDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Filtr z dashboard*/
	interface GPapDashboardFiltryDto {
		/**pole*/
		pole?: string|null;
		/**operator*/
		oper?: string|null;
		/**hodnota*/
		hodnota?: string|null;
	}
	const enum GPapDashboardFiltryDtoNames { pole = "pole", oper = "oper", hodnota = "hodnota",}
	const enum GPapDashboardFiltryDtoFragments { pole = "*", oper = "*", hodnota = "*",}
	const enum GPapDashboardFiltryDtoTypes { pole = "string", oper = "string", hodnota = "string",}
	const enum GPapDashboardFiltryDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapDashBoardPanel1Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro dashboard*/
	interface GPapDashboardPanel1Dto {
		/**labely polí*/
		countTxt?: string[]|null;
		/**data pro tabulku*/
		prehled?: Gordic.Pap.Interface.GPapDashboardPrehledDto[]|null;
		/**data pro tabulku*/
		stavDavek?: Gordic.Pap.Interface.GPapDashboardStavDavekDto[]|null;
	}
	const enum GPapDashboardPanel1DtoNames { countTxt = "countTxt", prehled = "prehled", stavDavek = "stavDavek",}
	const enum GPapDashboardPanel1DtoFragments { countTxt = "*", prehled = "*", stavDavek = "*",}
	const enum GPapDashboardPanel1DtoTypes { countTxt = "string[]", prehled = "Gordic.Pap.Interface.GPapDashboardPrehledDto[]", stavDavek = "Gordic.Pap.Interface.GPapDashboardStavDavekDto[]",}
	const enum GPapDashboardPanel1DtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapDashBoardPanel2Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro dashboard*/
	interface GPapDashboardPanel2Dto {
		/**podíl financování*/
		podil?: JsonDecimal|null;
		/**počet bez financování*/
		bezFin?: number|null;
		/**podíl slm*/
		podilSml?: JsonDecimal|null;
		/**počet bez sml*/
		bezSml?: number|null;
		/**podíl rezervací*/
		podilRez?: JsonDecimal|null;
		/**počet bez rezervací*/
		bezRez?: number|null;
	}
	const enum GPapDashboardPanel2DtoNames { podil = "podil", bezFin = "bezFin", podilSml = "podilSml", bezSml = "bezSml", podilRez = "podilRez", bezRez = "bezRez",}
	const enum GPapDashboardPanel2DtoFragments { podil = "*", bezFin = "*", podilSml = "*", bezSml = "*", podilRez = "*", bezRez = "*",}
	const enum GPapDashboardPanel2DtoTypes { podil = "JsonDecimal", bezFin = "number", podilSml = "JsonDecimal", bezSml = "number", podilRez = "JsonDecimal", bezRez = "number",}
	const enum GPapDashboardPanel2DtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapDashBoardPrehledDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro dashboard*/
	interface GPapDashboardPrehledDto {
		ixp_den?: string|null;
		ixp_den_txt?: string|null;
		pole1?: number|null;
		pole2?: number|null;
		pole3?: number|null;
		pole4?: number|null;
		pole5?: number|null;
		pole6?: number|null;
		pole7?: number|null;
	}
	const enum GPapDashboardPrehledDtoNames { ixp_den = "ixp_den", ixp_den_txt = "ixp_den_txt", pole1 = "pole1", pole2 = "pole2", pole3 = "pole3", pole4 = "pole4", pole5 = "pole5", pole6 = "pole6", pole7 = "pole7",}
	const enum GPapDashboardPrehledDtoFragments { ixp_den = "*", ixp_den_txt = "*", pole1 = "*", pole2 = "*", pole3 = "*", pole4 = "*", pole5 = "*", pole6 = "*", pole7 = "*",}
	const enum GPapDashboardPrehledDtoTypes { ixp_den = "string", ixp_den_txt = "string", pole1 = "number", pole2 = "number", pole3 = "number", pole4 = "number", pole5 = "number", pole6 = "number", pole7 = "number",}
	const enum GPapDashboardPrehledDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapDashBoardStavDavekDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro dashboard*/
	interface GPapDashboardStavDavekDto {
		sluzba_nazev?: string|null;
		service?: string|null;
		pocet_davek?: number|null;
	}
	const enum GPapDashboardStavDavekDtoNames { sluzba_nazev = "sluzba_nazev", service = "service", pocet_davek = "pocet_davek",}
	const enum GPapDashboardStavDavekDtoFragments { sluzba_nazev = "*", service = "*", pocet_davek = "*",}
	const enum GPapDashboardStavDavekDtoTypes { sluzba_nazev = "string", service = "string", pocet_davek = "number",}
	const enum GPapDashboardStavDavekDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapDetailAccessDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto parametrů pro detail PAP*/
	interface GPapDetailAccessDto {
		podani?: boolean;
		preevidence?: boolean;
		predani?: boolean;
		prevzeti?: boolean;
		prideleni?: boolean;
		generuj_sml?: boolean;
		uvolni?: boolean;
		klicova_slova?: boolean;
		vs_s?: boolean;
		uvolneni?: boolean;
		schvaleni?: boolean;
		schvaleni_zrus?: boolean;
		ukonceni?: boolean;
		ukonceni_zrus?: boolean;
		financovani?: boolean;
		souteze?: boolean;
		zj?: boolean;
		casti?: boolean;
		formulare?: boolean;
		komodity?: boolean;
		dokumenty?: boolean;
		list?: boolean;
		cena?: boolean;
		epk?: boolean;
		navazat_nadlim?: boolean;
		pred_ozn?: boolean;
		tisk?: boolean;
		vprc?: boolean;
	}
	const enum GPapDetailAccessDtoNames { podani = "podani", preevidence = "preevidence", predani = "predani", prevzeti = "prevzeti", prideleni = "prideleni", generuj_sml = "generuj_sml", uvolni = "uvolni", klicova_slova = "klicova_slova", vs_s = "vs_s", uvolneni = "uvolneni", schvaleni = "schvaleni", schvaleni_zrus = "schvaleni_zrus", ukonceni = "ukonceni", ukonceni_zrus = "ukonceni_zrus", financovani = "financovani", souteze = "souteze", zj = "zj", casti = "casti", formulare = "formulare", komodity = "komodity", dokumenty = "dokumenty", list = "list", cena = "cena", epk = "epk", navazat_nadlim = "navazat_nadlim", pred_ozn = "pred_ozn", tisk = "tisk", vprc = "vprc",}
	const enum GPapDetailAccessDtoFragments { podani = "*", preevidence = "*", predani = "*", prevzeti = "*", prideleni = "*", generuj_sml = "*", uvolni = "*", klicova_slova = "*", vs_s = "*", uvolneni = "*", schvaleni = "*", schvaleni_zrus = "*", ukonceni = "*", ukonceni_zrus = "*", financovani = "*", souteze = "*", zj = "*", casti = "*", formulare = "*", komodity = "*", dokumenty = "*", list = "*", cena = "*", epk = "*", navazat_nadlim = "*", pred_ozn = "*", tisk = "*", vprc = "*",}
	const enum GPapDetailAccessDtoTypes { podani = "boolean", preevidence = "boolean", predani = "boolean", prevzeti = "boolean", prideleni = "boolean", generuj_sml = "boolean", uvolni = "boolean", klicova_slova = "boolean", vs_s = "boolean", uvolneni = "boolean", schvaleni = "boolean", schvaleni_zrus = "boolean", ukonceni = "boolean", ukonceni_zrus = "boolean", financovani = "boolean", souteze = "boolean", zj = "boolean", casti = "boolean", formulare = "boolean", komodity = "boolean", dokumenty = "boolean", list = "boolean", cena = "boolean", epk = "boolean", navazat_nadlim = "boolean", pred_ozn = "boolean", tisk = "boolean", vprc = "boolean",}
	const enum GPapDetailAccessDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapEditDatDto.d.ts 

declare namespace Gordic.Pap.Interface {
	interface GPapEditDatDto {
		hodnota?: string|null;
		prizEdiTp?: number|null;
	}
	const enum GPapEditDatDtoNames { hodnota = "hodnota", prizEdiTp = "prizEdiTp",}
	const enum GPapEditDatDtoFragments { hodnota = "*", prizEdiTp = "*",}
	const enum GPapEditDatDtoTypes { hodnota = "string", prizEdiTp = "number",}
	const enum GPapEditDatDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapGenerujSmlDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro generování smluv*/
	interface GPapGenerujSmlDto {
		/**dotaz*/
		ixs_sbl?: string|null;
		/**neptat se na nic a provést*/
		neptatSe?: boolean|null;
		/**seznam*/
		seznam?: Gordic.Pap.Interface.GXxxsesuDto[]|null;
	}
	const enum GPapGenerujSmlDtoNames { ixs_sbl = "ixs_sbl", neptatSe = "neptatSe", seznam = "seznam",}
	const enum GPapGenerujSmlDtoFragments { ixs_sbl = "*", neptatSe = "*", seznam = "*",}
	const enum GPapGenerujSmlDtoTypes { ixs_sbl = "string", neptatSe = "boolean", seznam = "Gordic.Pap.Interface.GXxxsesuDto[]",}
	const enum GPapGenerujSmlDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapHistDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro historii*/
	interface GPapHistDto {
		/**kniha*/
		ixp_den?: string|null;
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**ixs_zak*/
		ixs_zak?: string|null;
		/**id_nen_tsez*/
		id_nen_tsez?: string|null;
	}
	const enum GPapHistDtoNames { ixp_den = "ixp_den", ixs_pri = "ixs_pri", ac_ag = "ac_ag", nazev = "nazev", dat_zmena = "dat_zmena", ixs_zak = "ixs_zak", id_nen_tsez = "id_nen_tsez",}
	const enum GPapHistDtoFragments { ixp_den = "*", ixs_pri = "*", ac_ag = "*", nazev = "*", dat_zmena = "*", ixs_zak = "*", id_nen_tsez = "*",}
	const enum GPapHistDtoTypes { ixp_den = "string", ixs_pri = "string", ac_ag = "string", nazev = "string", dat_zmena = "JsonDate", ixs_zak = "string", id_nen_tsez = "string",}
	const enum GPapHistDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapHromTiskDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto tisk předávacího protokolu*/
	interface GPapHromTiskDto {
		/**Tema*/
		Tema?: string|null;
		/**IDSestavy*/
		IDSestavy?: number|null;
		/**Duvod*/
		Duvod?: string|null;
		/**Data*/
		Data?: Gordic.Pap.Interface.GHromPredatTiskDto|null;
	}
	const enum GPapHromTiskDtoNames { Tema = "Tema", IDSestavy = "IDSestavy", Duvod = "Duvod", Data = "Data",}
	const enum GPapHromTiskDtoFragments { Tema = "*", IDSestavy = "*", Duvod = "*", Data = "*",}
	const enum GPapHromTiskDtoTypes { Tema = "string", IDSestavy = "number", Duvod = "string", Data = "Gordic.Pap.Interface.GHromPredatTiskDto",}
	const enum GPapHromTiskDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapParamsPreevidDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro parametry přeevidence*/
	interface GPapParamsPreevidDto {
		/**ixp_den*/
		ixp_den?: string|null;
		/**subrada*/
		subrada?: number|null;
		/**cis_real*/
		cis_real?: string|null;
		/**ixs_fun_komp*/
		ixs_fun_vyriz?: string|null;
		/**ixs_fun_cil*/
		ixs_fun_akt?: string|null;
		/**1 ... Předání případu DT 2 ... 'Předání všech písemností případu DT 3 ... Předání písemnosti 4 ... 'Předání případu DT' + 'Předání všech písemností případu DT'*/
		typ_operace?: number|null;
		/**změna kompetenta*/
		zmena_kompetenta?: boolean|null;
		/**ixs_SU*/
		ixs_SU?: string|null;
		/**duvod*/
		duvod?: string|null;
		/**původní vlastník*/
		puv_vlastnik?: string|null;
		/**voláno z detailu*/
		zDetailu?: boolean|null;
	}
	const enum GPapParamsPreevidDtoNames { ixp_den = "ixp_den", subrada = "subrada", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_akt = "ixs_fun_akt", typ_operace = "typ_operace", zmena_kompetenta = "zmena_kompetenta", ixs_SU = "ixs_SU", duvod = "duvod", puv_vlastnik = "puv_vlastnik", zDetailu = "zDetailu",}
	const enum GPapParamsPreevidDtoFragments { ixp_den = "*", subrada = "*", cis_real = "*", ixs_fun_vyriz = "*", ixs_fun_akt = "*", typ_operace = "*", zmena_kompetenta = "*", ixs_SU = "*", duvod = "*", puv_vlastnik = "*", zDetailu = "*",}
	const enum GPapParamsPreevidDtoTypes { ixp_den = "string", subrada = "number", cis_real = "string", ixs_fun_vyriz = "string", ixs_fun_akt = "string", typ_operace = "number", zmena_kompetenta = "boolean", ixs_SU = "string", duvod = "string", puv_vlastnik = "string", zDetailu = "boolean",}
	const enum GPapParamsPreevidDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapSeznamAccessDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto parametrů pro seznam PAP*/
	interface GPapSeznamAccessDto {
		labelPodani?: string;
		labelDetail?: string;
		podani?: boolean;
		preevidence?: boolean;
		predani?: boolean;
		prevzeti?: boolean;
		prideleni?: boolean;
		generuj_sml?: boolean;
		uvolni?: boolean;
		klicova_slova?: boolean;
		vs_s?: boolean;
		uvolneni?: boolean;
		schvaleni?: boolean;
		schvaleni_zrus?: boolean;
		ukonceni?: boolean;
		ukonceni_zrus?: boolean;
		SeznamTitle?: string;
	}
	const enum GPapSeznamAccessDtoNames { labelPodani = "labelPodani", labelDetail = "labelDetail", podani = "podani", preevidence = "preevidence", predani = "predani", prevzeti = "prevzeti", prideleni = "prideleni", generuj_sml = "generuj_sml", uvolni = "uvolni", klicova_slova = "klicova_slova", vs_s = "vs_s", uvolneni = "uvolneni", schvaleni = "schvaleni", schvaleni_zrus = "schvaleni_zrus", ukonceni = "ukonceni", ukonceni_zrus = "ukonceni_zrus", SeznamTitle = "SeznamTitle",}
	const enum GPapSeznamAccessDtoFragments { labelPodani = "*", labelDetail = "*", podani = "*", preevidence = "*", predani = "*", prevzeti = "*", prideleni = "*", generuj_sml = "*", uvolni = "*", klicova_slova = "*", vs_s = "*", uvolneni = "*", schvaleni = "*", schvaleni_zrus = "*", ukonceni = "*", ukonceni_zrus = "*", SeznamTitle = "*",}
	const enum GPapSeznamAccessDtoTypes { labelPodani = "string", labelDetail = "string", podani = "boolean", preevidence = "boolean", predani = "boolean", prevzeti = "boolean", prideleni = "boolean", generuj_sml = "boolean", uvolni = "boolean", klicova_slova = "boolean", vs_s = "boolean", uvolneni = "boolean", schvaleni = "boolean", schvaleni_zrus = "boolean", ukonceni = "boolean", ukonceni_zrus = "boolean", SeznamTitle = "string",}
	const enum GPapSeznamAccessDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapSeznamDokVZAccessDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto parametrů pro seznam dod xx*/
	interface GPapSeznamDokVZAccessDto {
		podani?: boolean;
		podaniel?: boolean;
		detail?: boolean;
		schvalit?: boolean;
		predvyhodnoceni?: boolean;
		pripominka?: boolean;
		schvalproc?: boolean;
		predani_pis?: boolean;
		predani_vlapis?: boolean;
		predani?: boolean;
		prideleni?: boolean;
		prevzeti?: boolean;
		preevid_esu?: boolean;
		zamen_esu?: boolean;
		ukonceni_zrus?: boolean;
		ukonceni?: boolean;
		stornopis?: boolean;
		podani_hrom?: boolean;
		eviele_hrom?: boolean;
		generovani_dok?: boolean;
		konverse_dok?: boolean;
		cbx_financovan?: boolean;
		cbx_beznavrh?: boolean;
		dod?: boolean;
		dod_Visible?: boolean;
		jednoradek?: boolean;
		generovani_dok_Visible?: boolean;
		podani_hrom_Visible?: boolean;
		eviele_hrom_Visible?: boolean;
		konverse_dok_Visible?: boolean;
		podani_Visible?: boolean;
		podaniel_Visible?: boolean;
		detail_Visible?: boolean;
		schvalit_Visible?: boolean;
		maska_Visible?: boolean;
		el_otevri_Visible?: boolean;
		ulozit_vse_Visible?: boolean;
		zverejnit_Visible?: boolean;
		pripominka_Visible?: boolean;
		schvalproc_Visible?: boolean;
		predvyhodnoceni_Visible?: boolean;
		tisk_Visible?: boolean;
		obcerstvit_Visible?: boolean;
		el_otevri?: boolean;
		ulozit_vse?: boolean;
		zverejnit?: boolean;
		financovan?: boolean;
		beznavrh?: boolean;
		financovan_Visible?: boolean;
		beznavrh_Visible?: boolean;
		jednoradek_Visible?: boolean;
	}
	const enum GPapSeznamDokVZAccessDtoNames { podani = "podani", podaniel = "podaniel", detail = "detail", schvalit = "schvalit", predvyhodnoceni = "predvyhodnoceni", pripominka = "pripominka", schvalproc = "schvalproc", predani_pis = "predani_pis", predani_vlapis = "predani_vlapis", predani = "predani", prideleni = "prideleni", prevzeti = "prevzeti", preevid_esu = "preevid_esu", zamen_esu = "zamen_esu", ukonceni_zrus = "ukonceni_zrus", ukonceni = "ukonceni", stornopis = "stornopis", podani_hrom = "podani_hrom", eviele_hrom = "eviele_hrom", generovani_dok = "generovani_dok", konverse_dok = "konverse_dok", cbx_financovan = "cbx_financovan", cbx_beznavrh = "cbx_beznavrh", dod = "dod", dod_Visible = "dod_Visible", jednoradek = "jednoradek", generovani_dok_Visible = "generovani_dok_Visible", podani_hrom_Visible = "podani_hrom_Visible", eviele_hrom_Visible = "eviele_hrom_Visible", konverse_dok_Visible = "konverse_dok_Visible", podani_Visible = "podani_Visible", podaniel_Visible = "podaniel_Visible", detail_Visible = "detail_Visible", schvalit_Visible = "schvalit_Visible", maska_Visible = "maska_Visible", el_otevri_Visible = "el_otevri_Visible", ulozit_vse_Visible = "ulozit_vse_Visible", zverejnit_Visible = "zverejnit_Visible", pripominka_Visible = "pripominka_Visible", schvalproc_Visible = "schvalproc_Visible", predvyhodnoceni_Visible = "predvyhodnoceni_Visible", tisk_Visible = "tisk_Visible", obcerstvit_Visible = "obcerstvit_Visible", el_otevri = "el_otevri", ulozit_vse = "ulozit_vse", zverejnit = "zverejnit", financovan = "financovan", beznavrh = "beznavrh", financovan_Visible = "financovan_Visible", beznavrh_Visible = "beznavrh_Visible", jednoradek_Visible = "jednoradek_Visible",}
	const enum GPapSeznamDokVZAccessDtoFragments { podani = "*", podaniel = "*", detail = "*", schvalit = "*", predvyhodnoceni = "*", pripominka = "*", schvalproc = "*", predani_pis = "*", predani_vlapis = "*", predani = "*", prideleni = "*", prevzeti = "*", preevid_esu = "*", zamen_esu = "*", ukonceni_zrus = "*", ukonceni = "*", stornopis = "*", podani_hrom = "*", eviele_hrom = "*", generovani_dok = "*", konverse_dok = "*", cbx_financovan = "*", cbx_beznavrh = "*", dod = "*", dod_Visible = "*", jednoradek = "*", generovani_dok_Visible = "*", podani_hrom_Visible = "*", eviele_hrom_Visible = "*", konverse_dok_Visible = "*", podani_Visible = "*", podaniel_Visible = "*", detail_Visible = "*", schvalit_Visible = "*", maska_Visible = "*", el_otevri_Visible = "*", ulozit_vse_Visible = "*", zverejnit_Visible = "*", pripominka_Visible = "*", schvalproc_Visible = "*", predvyhodnoceni_Visible = "*", tisk_Visible = "*", obcerstvit_Visible = "*", el_otevri = "*", ulozit_vse = "*", zverejnit = "*", financovan = "*", beznavrh = "*", financovan_Visible = "*", beznavrh_Visible = "*", jednoradek_Visible = "*",}
	const enum GPapSeznamDokVZAccessDtoTypes { podani = "boolean", podaniel = "boolean", detail = "boolean", schvalit = "boolean", predvyhodnoceni = "boolean", pripominka = "boolean", schvalproc = "boolean", predani_pis = "boolean", predani_vlapis = "boolean", predani = "boolean", prideleni = "boolean", prevzeti = "boolean", preevid_esu = "boolean", zamen_esu = "boolean", ukonceni_zrus = "boolean", ukonceni = "boolean", stornopis = "boolean", podani_hrom = "boolean", eviele_hrom = "boolean", generovani_dok = "boolean", konverse_dok = "boolean", cbx_financovan = "boolean", cbx_beznavrh = "boolean", dod = "boolean", dod_Visible = "boolean", jednoradek = "boolean", generovani_dok_Visible = "boolean", podani_hrom_Visible = "boolean", eviele_hrom_Visible = "boolean", konverse_dok_Visible = "boolean", podani_Visible = "boolean", podaniel_Visible = "boolean", detail_Visible = "boolean", schvalit_Visible = "boolean", maska_Visible = "boolean", el_otevri_Visible = "boolean", ulozit_vse_Visible = "boolean", zverejnit_Visible = "boolean", pripominka_Visible = "boolean", schvalproc_Visible = "boolean", predvyhodnoceni_Visible = "boolean", tisk_Visible = "boolean", obcerstvit_Visible = "boolean", el_otevri = "boolean", ulozit_vse = "boolean", zverejnit = "boolean", financovan = "boolean", beznavrh = "boolean", financovan_Visible = "boolean", beznavrh_Visible = "boolean", jednoradek_Visible = "boolean",}
	const enum GPapSeznamDokVZAccessDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapSmazatSmlDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro smazání smluv*/
	interface GPapSmazatSmlDto {
		/**seznam*/
		seznam?: Gordic.Pap.Interface.GSmlsiabDto[]|null;
	}
	const enum GPapSmazatSmlDtoNames { seznam = "seznam",}
	const enum GPapSmazatSmlDtoFragments { seznam = "*",}
	const enum GPapSmazatSmlDtoTypes { seznam = "Gordic.Pap.Interface.GSmlsiabDto[]",}
	const enum GPapSmazatSmlDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapSpravaDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro správu ixs_esu*/
	interface GPapSpravaDto {
		s_ess?: number|null;
		c_vyd?: JsonDecimal|null;
		c_poz?: JsonDecimal|null;
		c_predp?: JsonDecimal|null;
		c_real?: JsonDecimal|null;
		/**c_real = c_poz*/
		copy_ppsp?: boolean|null;
		/**c_real = c_predp*/
		copy_ppnp?: boolean|null;
	}
	const enum GPapSpravaDtoNames { s_ess = "s_ess", c_vyd = "c_vyd", c_poz = "c_poz", c_predp = "c_predp", c_real = "c_real", copy_ppsp = "copy_ppsp", copy_ppnp = "copy_ppnp",}
	const enum GPapSpravaDtoFragments { s_ess = "*", c_vyd = "*", c_poz = "*", c_predp = "*", c_real = "*", copy_ppsp = "*", copy_ppnp = "*",}
	const enum GPapSpravaDtoTypes { s_ess = "number", c_vyd = "JsonDecimal", c_poz = "JsonDecimal", c_predp = "JsonDecimal", c_real = "JsonDecimal", copy_ppsp = "boolean", copy_ppnp = "boolean",}
	const enum GPapSpravaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapUvolneniDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Struktura pro uvolnění částky financování*/
	interface GPapUvolneniDto {
		/**id*/
		id?: number|null;
		/**true/false - update/insert*/
		titulek?: string|null;
		/**částka původní*/
		c_sch_puv?: JsonDecimal|null;
		/**částka uvolněná*/
		c_sch_uvo?: JsonDecimal|null;
		/**částka uvolněná*/
		c_sch_upr?: JsonDecimal|null;
		/**nevím*/
		c_lzeNaRadku?: JsonDecimal|null;
	}
	const enum GPapUvolneniDtoNames { id = "id", titulek = "titulek", c_sch_puv = "c_sch_puv", c_sch_uvo = "c_sch_uvo", c_sch_upr = "c_sch_upr", c_lzeNaRadku = "c_lzeNaRadku",}
	const enum GPapUvolneniDtoFragments { id = "*", titulek = "*", c_sch_puv = "*", c_sch_uvo = "*", c_sch_upr = "*", c_lzeNaRadku = "*",}
	const enum GPapUvolneniDtoTypes { id = "number", titulek = "string", c_sch_puv = "JsonDecimal", c_sch_uvo = "JsonDecimal", c_sch_upr = "JsonDecimal", c_lzeNaRadku = "JsonDecimal",}
	const enum GPapUvolneniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapUvolneniUpdDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Struktura pro provedení uvolnění částky financování*/
	interface GPapUvolneniUpdDto {
		/**por_cis*/
		por_cis?: number|null;
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**částka k uvolnění*/
		c?: JsonDecimal|null;
		/**upravit schválenou částku VZ*/
		upravitVZ?: boolean|null;
		/**návratový kód úspěch/neúspěch*/
		ok?: boolean|null;
		/**kontrola pro HO*/
		kontrola?: boolean|null;
		/**návratová hláška*/
		hlas?: string|null;
	}
	const enum GPapUvolneniUpdDtoNames { por_cis = "por_cis", ixs_pri = "ixs_pri", c = "c", upravitVZ = "upravitVZ", ok = "ok", kontrola = "kontrola", hlas = "hlas",}
	const enum GPapUvolneniUpdDtoFragments { por_cis = "*", ixs_pri = "*", c = "*", upravitVZ = "*", ok = "*", kontrola = "*", hlas = "*",}
	const enum GPapUvolneniUpdDtoTypes { por_cis = "number", ixs_pri = "string", c = "JsonDecimal", upravitVZ = "boolean", ok = "boolean", kontrola = "boolean", hlas = "string",}
	const enum GPapUvolneniUpdDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPapWsHistDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Historie WS*/
	interface GPapWsHistDto {
		/**service*/
		service?: string|null;
		/**DBCOLUMN:evzsaza.dat_zmena*/
		dat_zmena?: JsonDate|null;
		ixs_zmp?: string|null;
		nazev_rf?: string|null;
	}
	const enum GPapWsHistDtoNames { service = "service", dat_zmena = "dat_zmena", ixs_zmp = "ixs_zmp", nazev_rf = "nazev_rf",}
	const enum GPapWsHistDtoFragments { service = "*", dat_zmena = "*", ixs_zmp = "*", nazev_rf = "*",}
	const enum GPapWsHistDtoTypes { service = "string", dat_zmena = "JsonDate", ixs_zmp = "string", nazev_rf = "string",}
	const enum GPapWsHistDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GParametryDetailXxx.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro menu detailXxx*/
	interface GParametryDetailXxxDto {
		/**cbSou*/
		cbSou?: string|null;
		/**prouko1*/
		prouko1?: number|null;
		/**prouko2*/
		prouko2?: number|null;
		/**vlastnik*/
		vlastnik?: string|null;
		/**vprc*/
		vprc?: string|null;
		/**cisZakVZ*/
		cisZakVZ?: number|null;
		/**prouza*/
		proUza?: boolean|null;
		/**proUza*/
		proUzaEsu?: number|null;
		/**druhZadani*/
		druhZadani?: string|null;
		/**canUza*/
		canUza?: boolean|null;
		/**proUzaZrus*/
		proUzaZrus?: boolean|null;
		/**proUkoZrus*/
		proUkoZrus?: boolean|null;
		/**prizRelcasM*/
		prizRelcasM?: number|null;
		/**prizRsNad*/
		prizRsNad?: number|null;
		/**prChild*/
		prChild?: number|null;
		/**rsPodri*/
		rsPodri?: number|null;
		/**smlssouSou*/
		smlssouSou?: string|null;
		/**cisZakVZ*/
		stavPrip?: number|null;
	}
	const enum GParametryDetailXxxDtoNames { cbSou = "cbSou", prouko1 = "prouko1", prouko2 = "prouko2", vlastnik = "vlastnik", vprc = "vprc", cisZakVZ = "cisZakVZ", proUza = "proUza", proUzaEsu = "proUzaEsu", druhZadani = "druhZadani", canUza = "canUza", proUzaZrus = "proUzaZrus", proUkoZrus = "proUkoZrus", prizRelcasM = "prizRelcasM", prizRsNad = "prizRsNad", prChild = "prChild", rsPodri = "rsPodri", smlssouSou = "smlssouSou", stavPrip = "stavPrip",}
	const enum GParametryDetailXxxDtoFragments { cbSou = "*", prouko1 = "*", prouko2 = "*", vlastnik = "*", vprc = "*", cisZakVZ = "*", proUza = "*", proUzaEsu = "*", druhZadani = "*", canUza = "*", proUzaZrus = "*", proUkoZrus = "*", prizRelcasM = "*", prizRsNad = "*", prChild = "*", rsPodri = "*", smlssouSou = "*", stavPrip = "*",}
	const enum GParametryDetailXxxDtoTypes { cbSou = "string", prouko1 = "number", prouko2 = "number", vlastnik = "string", vprc = "string", cisZakVZ = "number", proUza = "boolean", proUzaEsu = "number", druhZadani = "string", canUza = "boolean", proUzaZrus = "boolean", proUkoZrus = "boolean", prizRelcasM = "number", prizRsNad = "number", prChild = "number", rsPodri = "number", smlssouSou = "string", stavPrip = "number",}
	const enum GParametryDetailXxxDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GParametryPreevidence.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro přeevidenci případu*/
	interface GParametryPreevidenceDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**uus*/
		uus?: string|null;
		/**param_zmekom*/
		paramZmekom?: string|null;
		/**param_zmekom*/
		kniha?: string|null;
		/**rezimProvozu*/
		rezimProvozu?: number|null;
		/**agenda*/
		agenda?: string|null;
		/**agenda číslo*/
		agenda_cis?: string|null;
		/**dlePovolenychFazi*/
		dlePovolenychFazi?: string|null;
		par_uvolneni?: boolean|null;
		/**ixs_su*/
		ixs_su?: string|null;
		/**pripad*/
		pripad?: boolean|null;
		/**aktuálně přihlášený zpracovatel*/
		zpracovatelAkt?: string|null;
		/**realizator*/
		realizator?: string|null;
	}
	const enum GParametryPreevidenceDtoNames { ico = "ico", ucs = "ucs", uus = "uus", paramZmekom = "paramZmekom", kniha = "kniha", rezimProvozu = "rezimProvozu", agenda = "agenda", agenda_cis = "agenda_cis", dlePovolenychFazi = "dlePovolenychFazi", par_uvolneni = "par_uvolneni", ixs_su = "ixs_su", pripad = "pripad", zpracovatelAkt = "zpracovatelAkt", realizator = "realizator",}
	const enum GParametryPreevidenceDtoFragments { ico = "*", ucs = "*", uus = "*", paramZmekom = "*", kniha = "*", rezimProvozu = "*", agenda = "*", agenda_cis = "*", dlePovolenychFazi = "*", par_uvolneni = "*", ixs_su = "*", pripad = "*", zpracovatelAkt = "*", realizator = "*",}
	const enum GParametryPreevidenceDtoTypes { ico = "string", ucs = "string", uus = "string", paramZmekom = "string", kniha = "string", rezimProvozu = "number", agenda = "string", agenda_cis = "string", dlePovolenychFazi = "string", par_uvolneni = "boolean", ixs_su = "string", pripad = "boolean", zpracovatelAkt = "string", realizator = "string",}
	const enum GParametryPreevidenceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GParamRozpocetReturnDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto parametrů podle kterých se hledají položky plánu*/
	interface GParamRozpocetReturnDto {
		/**hlavička*/
		cis_real?: string|null;
		/**dotaz*/
		kompetent?: string|null;
	}
	const enum GParamRozpocetReturnDtoNames { cis_real = "cis_real", kompetent = "kompetent",}
	const enum GParamRozpocetReturnDtoFragments { cis_real = "*", kompetent = "*",}
	const enum GParamRozpocetReturnDtoTypes { cis_real = "string", kompetent = "string",}
	const enum GParamRozpocetReturnDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPodaniDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro podání*/
	interface GPodaniDto {
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**ixs_krk*/
		ixs_krk?: string|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**ele*/
		ele?: boolean|null;
		/**ixp*/
		ixp?: string|null;
		/**soutez/typ_dgr*/
		soutez?: string|null;
		/**poradove cislo nabidky*/
		por_cis_nab?: number|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**Evidence dokladu*/
		evidence_dokladu?: boolean|null;
		/**ixp_den*/
		ixp_den?: string|null;
	}
	const enum GPodaniDtoNames { ixs_pri = "ixs_pri", ixs_krk = "ixs_krk", ktg_typ = "ktg_typ", ele = "ele", ixp = "ixp", soutez = "soutez", por_cis_nab = "por_cis_nab", ac_ag = "ac_ag", evidence_dokladu = "evidence_dokladu", ixp_den = "ixp_den",}
	const enum GPodaniDtoFragments { ixs_pri = "*", ixs_krk = "*", ktg_typ = "*", ele = "*", ixp = "*", soutez = "*", por_cis_nab = "*", ac_ag = "*", evidence_dokladu = "*", ixp_den = "*",}
	const enum GPodaniDtoTypes { ixs_pri = "string", ixs_krk = "string", ktg_typ = "number", ele = "boolean", ixp = "string", soutez = "string", por_cis_nab = "number", ac_ag = "string", evidence_dokladu = "boolean", ixp_den = "string",}
	const enum GPodaniDtoTypeLengths {}
	/**pole Dto pro podani*/
	interface GPodaniPoleDto {
		/**Pole dto*/
		pole?: Gordic.Pap.Interface.GPodaniDto[]|null;
	}
	const enum GPodaniPoleDtoNames { pole = "pole",}
	const enum GPodaniPoleDtoFragments { pole = "*",}
	const enum GPodaniPoleDtoTypes { pole = "Gordic.Pap.Interface.GPodaniDto[]",}
	const enum GPodaniPoleDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GPridelPravaDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro obecnou informaci ohledně přístupu k tlačítkům*/
	interface GPridelPravaDto {
		podani?: boolean|null;
		evidence?: boolean|null;
		elpri?: boolean|null;
		schvaleni?: boolean|null;
		storno?: boolean|null;
		financovani?: boolean|null;
		ovc?: boolean|null;
		kdn?: boolean|null;
		vlastnosti?: boolean|null;
		up_c_real?: boolean|null;
		okr?: boolean|null;
		pza?: boolean|null;
		oks?: boolean|null;
		tisk?: boolean|null;
		eleobraz?: boolean|null;
		predani?: boolean|null;
		prideleni?: boolean|null;
		prevzeti?: boolean|null;
		odschvaleni?: boolean|null;
		vlozspisnet?: boolean|null;
		vlozspisssl?: boolean|null;
		vlozspissslzad?: boolean|null;
		schvalproc?: boolean|null;
		odeslani_dokum?: boolean|null;
		hromadne_odeslani_dokum?: boolean|null;
		nastavprizdok?: boolean|null;
		vracenidokladudowfl?: boolean|null;
		spisdokument?: boolean|null;
		eleobraz_Visible?: boolean|null;
		predani_Visible?: boolean|null;
		odschvaleni_Visible?: boolean|null;
		vlozspisnet_Visible?: boolean|null;
		vlozspisssl_Visible?: boolean|null;
		vlozspissslzad_Visible?: boolean|null;
		schvalproc_Visible?: boolean|null;
		odeslani_dokum_Visible?: boolean|null;
		hromadne_odeslani_dokum_Visible?: boolean|null;
		nastavprizdok_Visible?: boolean|null;
		vracenidokladudowfl_Visible?: boolean|null;
		spisdokument_Visible?: boolean|null;
		financovani_Visible?: boolean|null;
		okr_Visible?: boolean|null;
		pza_Visible?: boolean|null;
		oks_Visible?: boolean|null;
		ovc_Visible?: boolean|null;
		kdn_Visible?: boolean|null;
		vlastnosti_Visible?: boolean|null;
	}
	const enum GPridelPravaDtoNames { podani = "podani", evidence = "evidence", elpri = "elpri", schvaleni = "schvaleni", storno = "storno", financovani = "financovani", ovc = "ovc", kdn = "kdn", vlastnosti = "vlastnosti", up_c_real = "up_c_real", okr = "okr", pza = "pza", oks = "oks", tisk = "tisk", eleobraz = "eleobraz", predani = "predani", prideleni = "prideleni", prevzeti = "prevzeti", odschvaleni = "odschvaleni", vlozspisnet = "vlozspisnet", vlozspisssl = "vlozspisssl", vlozspissslzad = "vlozspissslzad", schvalproc = "schvalproc", odeslani_dokum = "odeslani_dokum", hromadne_odeslani_dokum = "hromadne_odeslani_dokum", nastavprizdok = "nastavprizdok", vracenidokladudowfl = "vracenidokladudowfl", spisdokument = "spisdokument", eleobraz_Visible = "eleobraz_Visible", predani_Visible = "predani_Visible", odschvaleni_Visible = "odschvaleni_Visible", vlozspisnet_Visible = "vlozspisnet_Visible", vlozspisssl_Visible = "vlozspisssl_Visible", vlozspissslzad_Visible = "vlozspissslzad_Visible", schvalproc_Visible = "schvalproc_Visible", odeslani_dokum_Visible = "odeslani_dokum_Visible", hromadne_odeslani_dokum_Visible = "hromadne_odeslani_dokum_Visible", nastavprizdok_Visible = "nastavprizdok_Visible", vracenidokladudowfl_Visible = "vracenidokladudowfl_Visible", spisdokument_Visible = "spisdokument_Visible", financovani_Visible = "financovani_Visible", okr_Visible = "okr_Visible", pza_Visible = "pza_Visible", oks_Visible = "oks_Visible", ovc_Visible = "ovc_Visible", kdn_Visible = "kdn_Visible", vlastnosti_Visible = "vlastnosti_Visible",}
	const enum GPridelPravaDtoFragments { podani = "*", evidence = "*", elpri = "*", schvaleni = "*", storno = "*", financovani = "*", ovc = "*", kdn = "*", vlastnosti = "*", up_c_real = "*", okr = "*", pza = "*", oks = "*", tisk = "*", eleobraz = "*", predani = "*", prideleni = "*", prevzeti = "*", odschvaleni = "*", vlozspisnet = "*", vlozspisssl = "*", vlozspissslzad = "*", schvalproc = "*", odeslani_dokum = "*", hromadne_odeslani_dokum = "*", nastavprizdok = "*", vracenidokladudowfl = "*", spisdokument = "*", eleobraz_Visible = "*", predani_Visible = "*", odschvaleni_Visible = "*", vlozspisnet_Visible = "*", vlozspisssl_Visible = "*", vlozspissslzad_Visible = "*", schvalproc_Visible = "*", odeslani_dokum_Visible = "*", hromadne_odeslani_dokum_Visible = "*", nastavprizdok_Visible = "*", vracenidokladudowfl_Visible = "*", spisdokument_Visible = "*", financovani_Visible = "*", okr_Visible = "*", pza_Visible = "*", oks_Visible = "*", ovc_Visible = "*", kdn_Visible = "*", vlastnosti_Visible = "*",}
	const enum GPridelPravaDtoTypes { podani = "boolean", evidence = "boolean", elpri = "boolean", schvaleni = "boolean", storno = "boolean", financovani = "boolean", ovc = "boolean", kdn = "boolean", vlastnosti = "boolean", up_c_real = "boolean", okr = "boolean", pza = "boolean", oks = "boolean", tisk = "boolean", eleobraz = "boolean", predani = "boolean", prideleni = "boolean", prevzeti = "boolean", odschvaleni = "boolean", vlozspisnet = "boolean", vlozspisssl = "boolean", vlozspissslzad = "boolean", schvalproc = "boolean", odeslani_dokum = "boolean", hromadne_odeslani_dokum = "boolean", nastavprizdok = "boolean", vracenidokladudowfl = "boolean", spisdokument = "boolean", eleobraz_Visible = "boolean", predani_Visible = "boolean", odschvaleni_Visible = "boolean", vlozspisnet_Visible = "boolean", vlozspisssl_Visible = "boolean", vlozspissslzad_Visible = "boolean", schvalproc_Visible = "boolean", odeslani_dokum_Visible = "boolean", hromadne_odeslani_dokum_Visible = "boolean", nastavprizdok_Visible = "boolean", vracenidokladudowfl_Visible = "boolean", spisdokument_Visible = "boolean", financovani_Visible = "boolean", okr_Visible = "boolean", pza_Visible = "boolean", oks_Visible = "boolean", ovc_Visible = "boolean", kdn_Visible = "boolean", vlastnosti_Visible = "boolean",}
	const enum GPridelPravaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GProcesDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro označení současné pozice v životním cyklu*/
	interface GProcesDto {
		/**hlavička*/
		nazev?: string|null;
		/**dotaz*/
		ktg_typ?: number|null;
		/**návratová hláška*/
		ixs_krk_nas?: string|null;
	}
	const enum GProcesDtoNames { nazev = "nazev", ktg_typ = "ktg_typ", ixs_krk_nas = "ixs_krk_nas",}
	const enum GProcesDtoFragments { nazev = "*", ktg_typ = "*", ixs_krk_nas = "*",}
	const enum GProcesDtoTypes { nazev = "string", ktg_typ = "number", ixs_krk_nas = "string",}
	const enum GProcesDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GRestrikceDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro nastavení restrikcí tisků*/
	interface GRestrikceDto {
		/**id sestavy*/
		agenda?: string|null;
		/**id sestavy*/
		sestava?: string|null;
		/**subjekt*/
		ixs_esu?: string|null;
		/**identifikator*/
		identifikator?: string|null;
		/**ac*/
		ac?: string|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**el*/
		el?: boolean|null;
		/**pole knih*/
		knihy?: string[]|null;
	}
	const enum GRestrikceDtoNames { agenda = "agenda", sestava = "sestava", ixs_esu = "ixs_esu", identifikator = "identifikator", ac = "ac", ac_ag = "ac_ag", el = "el", knihy = "knihy",}
	const enum GRestrikceDtoFragments { agenda = "*", sestava = "*", ixs_esu = "*", identifikator = "*", ac = "*", ac_ag = "*", el = "*", knihy = "*",}
	const enum GRestrikceDtoTypes { agenda = "string", sestava = "string", ixs_esu = "string", identifikator = "string", ac = "string", ac_ag = "string", el = "boolean", knihy = "string[]",}
	const enum GRestrikceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GRozdxmaDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rozdxma*/
	interface GRozdxmaDto {
		/**DBCOLUMN:rozdxma.rok*/
		rok?: number|null;
		/**DBCOLUMN:rozdxma.lic*/
		lic?: string|null;
		/**DBCOLUMN:rozdxma.ico*/
		ico?: string|null;
		/**DBCOLUMN:rozdxma.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:rozdxma.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:rozdxma.ac*/
		ac?: string|null;
		/**DBCOLUMN:rozdxma.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:rozdxma.nks*/
		nks?: string|null;
		/**DBCOLUMN:rozdxma.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:rozdxma.drd*/
		drd?: number|null;
		/**DBCOLUMN:rozdxma.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:rozdxma.den*/
		den?: number|null;
		/**DBCOLUMN:rozdxma.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.c0*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.c0*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.c0*/
		c_vz?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.c0*/
		c_obj?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.m0*/
		m0?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.m1*/
		m1?: JsonDecimal|null;
		/**DBCOLUMN:rozdxma.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:rozdxma.stav_kch*/
		stav_kch?: number|null;
		/**DBCOLUMN:rozdxma.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rozdxma.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:rozdxma.te0*/
		te0?: string|null;
		/**DBCOLUMN:rozdxma.te1*/
		te1?: string|null;
		/**DBCOLUMN:rozdxma.te2*/
		te2?: string|null;
		/**DBCOLUMN:rozdxma.te3*/
		te3?: string|null;
		/**DBCOLUMN:rozdxma.te4*/
		te4?: string|null;
		/**DBCOLUMN:rozdxma.uea*/
		uea?: string|null;
		/**DBCOLUMN:rozdxma.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:rozdxma.uec*/
		uec?: string|null;
		/**DBCOLUMN:rozdxma.ued*/
		ued?: string|null;
		/**DBCOLUMN:rozdxma.uee*/
		uee?: string|null;
		/**DBCOLUMN:rozdxma.uef*/
		uef?: string|null;
		/**DBCOLUMN:rozdxma.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:rozdxma.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:rozdxma.uei*/
		uei?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uej?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uek?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uel?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uem?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uen?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te5?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te6?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te7?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te8?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te9?: string|null;
		/**DBCOLUMN:rozdxma.popis*/
		popis?: string|null;
		/**DBCOLUMN:rozdxma.s_prep*/
		s_prep?: number|null;
		/**DBCOLUMN:rozdxma.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:rozdxma.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:rozdxma.s_odu*/
		s_odu?: number|null;
		/**DBCOLUMN:rozdxma.uus*/
		uus?: string|null;
		/**DBCOLUMN:rozdxma.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:rozdxma.uea_uc*/
		uea_uc?: string|null;
		/**DBCOLUMN:rozdxma.ueb_uc*/
		ueb_uc?: string|null;
		/**DBCOLUMN:rozdxma.uec_uc*/
		uec_uc?: string|null;
		/**DBCOLUMN:rozdxma.ued_uc*/
		ued_uc?: string|null;
		/**DBCOLUMN:rozdxma.uee_uc*/
		uee_uc?: string|null;
		/**DBCOLUMN:rozdxma.uef_uc*/
		uef_uc?: string|null;
		/**DBCOLUMN:rozdxma.ueg_uc*/
		ueg_uc?: string|null;
		/**DBCOLUMN:rozdxma.ueh_uc*/
		ueh_uc?: string|null;
		/**DBCOLUMN:rozdxma.uei_uc*/
		uei_uc?: string|null;
		/**DBCOLUMN:rozdxma.uej_uc*/
		uej_uc?: string|null;
		/**DBCOLUMN:rozdxma.te0_uc*/
		te0_uc?: string|null;
		/**DBCOLUMN:rozdxma.te1_uc*/
		te1_uc?: string|null;
		/**DBCOLUMN:rozdxma.te2_uc*/
		te2_uc?: string|null;
		/**DBCOLUMN:rozdxma.te3_uc*/
		te3_uc?: string|null;
		/**DBCOLUMN:rozdxma.te4_uc*/
		te4_uc?: string|null;
		/**DBCOLUMN:rozdxma.priz_char*/
		priz_char?: number|null;
		/**DBCOLUMN:rozdxma.druh_char*/
		druh_char?: number|null;
		/**DBCOLUMN:rozdxma.ixp_den_ag*/
		ixp_den_ag?: string|null;
		/**DBCOLUMN:rozdxma.radek_ag*/
		radek_ag?: number|null;
		/**DBCOLUMN:rozdxma.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:rozdxma.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:rozdxma.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:rozdxma.nks_uc*/
		nks_uc?: string|null;
		/**DBCOLUMN:rozdxma.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:rozdxma.radek_hdr*/
		radek_hdr?: number|null;
		nazev_rf?: string|null;
		nazev_ref?: string|null;
	}
	const enum GRozdxmaDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c_sml = "c_sml", c_fak = "c_fak", c_vz = "c_vz", c_obj = "c_obj", c1 = "c1", m0 = "m0", m1 = "m1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", popis = "popis", s_prep = "s_prep", xuete = "xuete", dat_mpd = "dat_mpd", s_odu = "s_odu", uus = "uus", ixs_esu = "ixs_esu", uea_uc = "uea_uc", ueb_uc = "ueb_uc", uec_uc = "uec_uc", ued_uc = "ued_uc", uee_uc = "uee_uc", uef_uc = "uef_uc", ueg_uc = "ueg_uc", ueh_uc = "ueh_uc", uei_uc = "uei_uc", uej_uc = "uej_uc", te0_uc = "te0_uc", te1_uc = "te1_uc", te2_uc = "te2_uc", te3_uc = "te3_uc", te4_uc = "te4_uc", priz_char = "priz_char", druh_char = "druh_char", ixp_den_ag = "ixp_den_ag", radek_ag = "radek_ag", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", nks_uc = "nks_uc", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", nazev_rf = "nazev_rf", nazev_ref = "nazev_ref",}
	const enum GRozdxmaDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ac = "*", radek_z = "*", nks = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c_sml = "*", c_fak = "*", c_vz = "*", c_obj = "*", c1 = "*", m0 = "*", m1 = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", popis = "*", s_prep = "*", xuete = "*", dat_mpd = "*", s_odu = "*", uus = "*", ixs_esu = "*", uea_uc = "*", ueb_uc = "*", uec_uc = "*", ued_uc = "*", uee_uc = "*", uef_uc = "*", ueg_uc = "*", ueh_uc = "*", uei_uc = "*", uej_uc = "*", te0_uc = "*", te1_uc = "*", te2_uc = "*", te3_uc = "*", te4_uc = "*", priz_char = "*", druh_char = "*", ixp_den_ag = "*", radek_ag = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", nks_uc = "*", id_hdr_ris = "*", radek_hdr = "*", nazev_rf = "*", nazev_ref = "*",}
	const enum GRozdxmaDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c_sml = "JsonDecimal", c_fak = "JsonDecimal", c_vz = "JsonDecimal", c_obj = "JsonDecimal", c1 = "JsonDecimal", m0 = "JsonDecimal", m1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", popis = "string", s_prep = "number", xuete = "string", dat_mpd = "JsonDate", s_odu = "number", uus = "string", ixs_esu = "string", uea_uc = "string", ueb_uc = "string", uec_uc = "string", ued_uc = "string", uee_uc = "string", uef_uc = "string", ueg_uc = "string", ueh_uc = "string", uei_uc = "string", uej_uc = "string", te0_uc = "string", te1_uc = "string", te2_uc = "string", te3_uc = "string", te4_uc = "string", priz_char = "number", druh_char = "number", ixp_den_ag = "string", radek_ag = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", nks_uc = "string", id_hdr_ris = "string", radek_hdr = "number", nazev_rf = "string", nazev_ref = "string",}
	const enum GRozdxmaDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, popis = 254, xuete = 148, uus = 10, ixs_esu = 12, uea_uc = 3, ueb_uc = 4, uec_uc = 12, ued_uc = 12, uee_uc = 12, uef_uc = 3, ueg_uc = 16, ueh_uc = 4, uei_uc = 4, uej_uc = 12, te0_uc = 16, te1_uc = 16, te2_uc = 16, te3_uc = 6, te4_uc = 12, ixp_den_ag = 12, ixp_sml = 12, nks_uc = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GRozpocet.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Rozpočtová věta (srvdroz + rozaaat)*/
	interface GRozpocetDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:Seznam.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.c_sml*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uek?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uel?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uem?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uen?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te5?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te6?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te7?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te8?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.c_vz*/
		c_vz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_obj*/
		c_obj?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_ru*/
		c_ru?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_rez*/
		c_rez?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_disp*/
		c_disp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl_txt?: string|null;
	}
	const enum GRozpocetDtoNames { rok = "rok", ixs_pla = "ixs_pla", cislo = "cislo", ixs_fun = "ixs_fun", c_sml = "c_sml", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c_vz = "c_vz", c_obj = "c_obj", c_ru = "c_ru", c_rez = "c_rez", c_disp = "c_disp", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_vl_txt = "bu_vl_txt",}
	const enum GRozpocetDtoFragments { rok = "*", ixs_pla = "*", cislo = "*", ixs_fun = "*", c_sml = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", c_vz = "*", c_obj = "*", c_ru = "*", c_rez = "*", c_disp = "*", sk_vl = "*", bu_vl = "*", bu_vl_txt = "*",}
	const enum GRozpocetDtoTypes { rok = "number", ixs_pla = "string", cislo = "string", ixs_fun = "string", c_sml = "JsonDecimal", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", c_vz = "JsonDecimal", c_obj = "JsonDecimal", c_ru = "JsonDecimal", c_rez = "JsonDecimal", c_disp = "JsonDecimal", sk_vl = "string", bu_vl = "string", bu_vl_txt = "string",}
	const enum GRozpocetDtoTypeLengths { ixs_pla = 12, cislo = 16, ixs_fun = 12, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GRzaskpuDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzaskpu*/
	interface GRzaskpuDto {
		/**DBCOLUMN:rzaskpu.kpr_urc*/
		kpr_urc?: number|null;
		/**DBCOLUMN:rzaskpu.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:rzaskpu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:rzaskpu.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:rzaskpu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:rzaskpu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rzaskpu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**hlas*/
		hlas?: string|null;
	}
	const enum GRzaskpuDtoNames { kpr_urc = "kpr_urc", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", hlas = "hlas",}
	const enum GRzaskpuDtoFragments { kpr_urc = "*", zkratka = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", hlas = "*",}
	const enum GRzaskpuDtoTypes { kpr_urc = "number", zkratka = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", hlas = "string",}
	const enum GRzaskpuDtoTypeLengths { zkratka = 20, nazev = 150, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GRzaslegDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzasleg*/
	interface GRzaslegDto {
		/**DBCOLUMN:rzasleg.leg_usm_par*/
		leg_usm_par?: number|null;
		/**DBCOLUMN:rzasleg.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:rzasleg.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:rzasleg.pap_tza*/
		pap_tza?: number|null;
		/**DBCOLUMN:rzasleg.pap_tza*/
		pap_tza_txt?: string|null;
		/**DBCOLUMN:rzasleg.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rzasleg.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:rzasleg.pre_urc*/
		pre_urc?: number|null;
		/**DBCOLUMN:rzasleg.pre_urc*/
		pre_urc_txt?: string|null;
		/**DBCOLUMN:rzasleg.lim_zak*/
		lim_zak?: number|null;
		/**DBCOLUMN:rzasleg.lim_zak*/
		lim_zak_txt?: string|null;
		/**DBCOLUMN:rzasleg.lim_zak*/
		druh_zad_riz_txt?: string|null;
		/**DBCOLUMN:rzasleg.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:rzasleg.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:rzasleg.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:rzasleg.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rzasleg.zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		hlas?: string|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp1?: number|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp2?: number|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp3?: number|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp4?: number|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp5?: number|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp6?: number|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp7?: number|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp1_txt?: string|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp2_txt?: string|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp3_txt?: string|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp4_txt?: string|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp5_txt?: string|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp6_txt?: string|null;
		/**DBCOLUMN:priz_edi_tp*/
		priz_edi_tp7_txt?: string|null;
		/**DBCOLUMN:rzasleg.pap_tza*/
		rez_pri?: number|null;
		/**DBCOLUMN:rzasleg.pap_tza*/
		c_predp_bez?: JsonDecimal|null;
		/**DBCOLUMN:rzasleg.pap_tza*/
		priz_imp?: number|null;
		/**DBCOLUMN:rzasleg.pap_tza*/
		priz_neriz_vyb?: number|null;
	}
	const enum GRzaslegDtoNames { leg_usm_par = "leg_usm_par", zkratka = "zkratka", nazev = "nazev", pap_tza = "pap_tza", pap_tza_txt = "pap_tza_txt", k_v = "k_v", k_s = "k_s", pre_urc = "pre_urc", pre_urc_txt = "pre_urc_txt", lim_zak = "lim_zak", lim_zak_txt = "lim_zak_txt", druh_zad_riz_txt = "druh_zad_riz_txt", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", hlas = "hlas", priz_edi_tp1 = "priz_edi_tp1", priz_edi_tp2 = "priz_edi_tp2", priz_edi_tp3 = "priz_edi_tp3", priz_edi_tp4 = "priz_edi_tp4", priz_edi_tp5 = "priz_edi_tp5", priz_edi_tp6 = "priz_edi_tp6", priz_edi_tp7 = "priz_edi_tp7", priz_edi_tp1_txt = "priz_edi_tp1_txt", priz_edi_tp2_txt = "priz_edi_tp2_txt", priz_edi_tp3_txt = "priz_edi_tp3_txt", priz_edi_tp4_txt = "priz_edi_tp4_txt", priz_edi_tp5_txt = "priz_edi_tp5_txt", priz_edi_tp6_txt = "priz_edi_tp6_txt", priz_edi_tp7_txt = "priz_edi_tp7_txt", rez_pri = "rez_pri", c_predp_bez = "c_predp_bez", priz_imp = "priz_imp", priz_neriz_vyb = "priz_neriz_vyb",}
	const enum GRzaslegDtoFragments { leg_usm_par = "*", zkratka = "*", nazev = "*", pap_tza = "*", pap_tza_txt = "*", k_v = "*", k_s = "*", pre_urc = "*", pre_urc_txt = "*", lim_zak = "*", lim_zak_txt = "*", druh_zad_riz_txt = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", hlas = "*", priz_edi_tp1 = "*", priz_edi_tp2 = "*", priz_edi_tp3 = "*", priz_edi_tp4 = "*", priz_edi_tp5 = "*", priz_edi_tp6 = "*", priz_edi_tp7 = "*", priz_edi_tp1_txt = "*", priz_edi_tp2_txt = "*", priz_edi_tp3_txt = "*", priz_edi_tp4_txt = "*", priz_edi_tp5_txt = "*", priz_edi_tp6_txt = "*", priz_edi_tp7_txt = "*", rez_pri = "*", c_predp_bez = "*", priz_imp = "*", priz_neriz_vyb = "*",}
	const enum GRzaslegDtoTypes { leg_usm_par = "number", zkratka = "string", nazev = "string", pap_tza = "number", pap_tza_txt = "string", k_v = "number", k_s = "string", pre_urc = "number", pre_urc_txt = "string", lim_zak = "number", lim_zak_txt = "string", druh_zad_riz_txt = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", hlas = "string", priz_edi_tp1 = "number", priz_edi_tp2 = "number", priz_edi_tp3 = "number", priz_edi_tp4 = "number", priz_edi_tp5 = "number", priz_edi_tp6 = "number", priz_edi_tp7 = "number", priz_edi_tp1_txt = "string", priz_edi_tp2_txt = "string", priz_edi_tp3_txt = "string", priz_edi_tp4_txt = "string", priz_edi_tp5_txt = "string", priz_edi_tp6_txt = "string", priz_edi_tp7_txt = "string", rez_pri = "number", c_predp_bez = "JsonDecimal", priz_imp = "number", priz_neriz_vyb = "number",}
	const enum GRzaslegDtoTypeLengths { zkratka = 50, nazev = 254, k_s = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GRzavlek.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GRzavlekDto {
		/**DBCOLUMN:Seznam.ixs_oko*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		rok?: number|null;
		/**DBCOLUMN:Seznam.ixs_ref*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		nazev_rf?: string|null;
		leg_usm_par?: number|null;
		aktivita?: number|null;
		hlas?: string|null;
	}
	const enum GRzavlekDtoNames { ixp_den = "ixp_den", poznamka = "poznamka", nazev = "nazev", rok = "rok", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf", leg_usm_par = "leg_usm_par", aktivita = "aktivita", hlas = "hlas",}
	const enum GRzavlekDtoFragments { ixp_den = "*", poznamka = "*", nazev = "*", rok = "*", zmenu_prov = "*", dat_zmena = "*", nazev_rf = "*", leg_usm_par = "*", aktivita = "*", hlas = "*",}
	const enum GRzavlekDtoTypes { ixp_den = "string", poznamka = "string", nazev = "string", rok = "number", zmenu_prov = "string", dat_zmena = "JsonDate", nazev_rf = "string", leg_usm_par = "number", aktivita = "number", hlas = "string",}
	const enum GRzavlekDtoTypeLengths { ixp_den = 12, nazev = 100, zmenu_prov = 12, nazev_rf = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GSmldsbl.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSmldsblDto {
		/**DBCOLUMN:Seznam.ixs_sbl*/
		ixs_sbl?: string|null;
		/**DBCOLUMN:Seznam.id_tem*/
		id_tem?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.ks*/
		ks?: string|null;
		/**DBCOLUMN:Seznam.ss*/
		ss?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.subrada_p*/
		subrada_p?: number|null;
		/**DBCOLUMN:Seznam.mena*/
		mena?: number|null;
		/**DBCOLUMN:Seznam.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.s_tem*/
		s_tem?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:Seznam.typ_platnost*/
		typ_platnost?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ac_dok_1*/
		ac_dok_1?: string|null;
		/**DBCOLUMN:Seznam.ac_dok_2*/
		ac_dok_2?: string|null;
		/**DBCOLUMN:Seznam.ucinnost*/
		ucinnost?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_kurz*/
		typ_kurz?: number|null;
		/**DBCOLUMN:Seznam.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Seznam.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:Seznam.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:Seznam.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref_zast*/
		ixs_ref_zast?: string|null;
		/**DBCOLUMN:Seznam.c_sazba_pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.proc_sazba_pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_pen*/
		typ_pen?: number|null;
		/**DBCOLUMN:Seznam.zak_upr*/
		zak_upr?: number|null;
		/**DBCOLUMN:Seznam.priz_spo*/
		priz_spo?: number|null;
		/**DBCOLUMN:Seznam.typ_spo*/
		typ_spo?: number|null;
		/**DBCOLUMN:Seznam.c_spo*/
		c_spo?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.proc_spo*/
		proc_spo?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.priz_uroc*/
		priz_uroc?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_sgn*/
		dat_sgn?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sgn_ext*/
		dat_sgn_ext?: JsonDate|null;
	}
	const enum GSmldsblDtoNames { ixs_sbl = "ixs_sbl", id_tem = "id_tem", lic = "lic", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", ixp_den = "ixp_den", subrada_p = "subrada_p", mena = "mena", c_mena = "c_mena", s_tem = "s_tem", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", aktivita = "aktivita", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", poznamka = "poznamka", ktg_sml = "ktg_sml", typ_platnost = "typ_platnost", nazev = "nazev", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", cis_real = "cis_real", ixp_sml = "ixp_sml", m = "m", typ_kurz = "typ_kurz", dat_ucinnost = "dat_ucinnost", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", ixs_fun_akt = "ixs_fun_akt", ixs_ref_zast = "ixs_ref_zast", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", typ_pen = "typ_pen", zak_upr = "zak_upr", priz_spo = "priz_spo", typ_spo = "typ_spo", c_spo = "c_spo", proc_spo = "proc_spo", priz_uroc = "priz_uroc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext",}
	const enum GSmldsblDtoFragments { ixs_sbl = "*", id_tem = "*", lic = "*", ixs_esu = "*", ico_esu = "*", ico = "*", ucs = "*", nks = "*", ac_esu = "*", popis = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", ixp_den = "*", subrada_p = "*", mena = "*", c_mena = "*", s_tem = "*", ktg_typ = "*", ixs_typ = "*", aktivita = "*", dat_uzavreni = "*", dat_platnost = "*", dat_prij_pod = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", poznamka = "*", ktg_sml = "*", typ_platnost = "*", nazev = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", cis_real = "*", ixp_sml = "*", m = "*", typ_kurz = "*", dat_ucinnost = "*", fin_od = "*", fin_do = "*", sgn_stav = "*", typ_ceny = "*", ixs_fun_akt = "*", ixs_ref_zast = "*", c_sazba_pen = "*", proc_sazba_pen = "*", typ_pen = "*", zak_upr = "*", priz_spo = "*", typ_spo = "*", c_spo = "*", proc_spo = "*", priz_uroc = "*", dat_zmena = "*", zmenu_prov = "*", dat_sgn = "*", dat_sgn_ext = "*",}
	const enum GSmldsblDtoTypes { ixs_sbl = "string", id_tem = "string", lic = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", ixp_den = "string", subrada_p = "number", mena = "number", c_mena = "JsonDecimal", s_tem = "number", ktg_typ = "number", ixs_typ = "string", aktivita = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", poznamka = "string", ktg_sml = "number", typ_platnost = "number", nazev = "string", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", cis_real = "string", ixp_sml = "string", m = "JsonDecimal", typ_kurz = "number", dat_ucinnost = "JsonDate", fin_od = "number", fin_do = "number", sgn_stav = "number", typ_ceny = "number", ixs_fun_akt = "string", ixs_ref_zast = "string", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", typ_pen = "number", zak_upr = "number", priz_spo = "number", typ_spo = "number", c_spo = "JsonDecimal", proc_spo = "JsonDecimal", priz_uroc = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate",}
	const enum GSmldsblDtoTypeLengths { ixs_sbl = 12, id_tem = 20, lic = 4, ixs_esu = 12, ico_esu = 10, ico = 10, ucs = 10, nks = 12, ac_esu = 20, popis = 254, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ixp_den = 12, ixs_typ = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, poznamka = 254, nazev = 254, ac_dok_1 = 20, ac_dok_2 = 20, ucinnost = 20, ixs_orj = 12, cis_real = 6, ixp_sml = 12, ixs_fun_akt = 12, ixs_ref_zast = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GSmlsiab.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSmlsiabDto {
		/**DBCOLUMN:Seznam.ixp_ext*/
		ixp_ext?: string|null;
		/**DBCOLUMN:Seznam.typ_ag_ext*/
		typ_ag_ext?: number|null;
		/**typ_ag_txt*/
		typ_ag_txt?: string|null;
		/**DBCOLUMN:Seznam.stav_dok*/
		stav_dok?: number|null;
		/**DBCOLUMN:Seznam.ixp_den_p*/
		ixp_den_p?: string|null;
		/**ixp_den_txt*/
		ixp_den_txt?: string|null;
		/**ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:Seznam.subrada_p*/
		subrada_p?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_txt*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**nazev_vyriz*/
		nazev_vyriz?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**nazev_vyriz*/
		nazev_ref?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:Seznam.ktg_sml*/
		ktg_sml?: number|null;
		/**ktg_sml_txt*/
		ktg_sml_txt?: string|null;
		/**DBCOLUMN:Seznam.mena*/
		mena?: number|null;
		/**DBCOLUMN:Seznam.typ_platnost*/
		typ_platnost?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:Seznam.ac_dok_1*/
		ac_dok_1?: string|null;
		/**DBCOLUMN:Seznam.ac_dok_2*/
		ac_dok_2?: string|null;
		/**DBCOLUMN:Seznam.ucinnost*/
		ucinnost?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj*/
		ixs_orj?: string|null;
		/**ixs_orj_txt*/
		ixs_orj_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**cis_real_txt*/
		cis_real_txt?: string|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_kurz*/
		typ_kurz?: number|null;
		/**typ_kurz_txt*/
		typ_kurz_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Seznam.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:Seznam.sgn_stav*/
		sgn_stav?: number|null;
		/**sgn_stav_txt*/
		sgn_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_ceny*/
		typ_ceny?: number|null;
		/**typ_ceny_txt*/
		typ_ceny_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**nazev_vlastnik*/
		nazev_vlastnik?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_rf_zm*/
		nazev_rf_zm?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.c_rok*/
		c_rok?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_dph_od*/
		dat_dph_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_dph_do*/
		dat_dph_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.c_mena_z_osv*/
		c_mena_z_osv?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_bd*/
		c_mena_z_bd?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_ss*/
		c_mena_z_ss?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_ns*/
		c_mena_z_ns?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_dph_ss*/
		c_mena_dph_ss?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_dph_ns*/
		c_mena_dph_ns?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_ss*/
		c_c_mena_ss?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_ns*/
		c_c_mena_ns?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_okr*/
		c_c_mena_okr?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.c_mena_dph_3s*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_dph_4s*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_3s*/
		c_mena_z_3s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_4s*/
		c_mena_z_4s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_3s*/
		c_c_mena_3s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_4s*/
		c_c_mena_4s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_sgn*/
		dat_sgn?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sgn_ext*/
		dat_sgn_ext?: JsonDate|null;
		/**provedení aktivní operace - návratový kód success/fail true/false*/
		ok?: boolean|null;
	}
	const enum GSmlsiabDtoNames { ixp_ext = "ixp_ext", typ_ag_ext = "typ_ag_ext", typ_ag_txt = "typ_ag_txt", stav_dok = "stav_dok", ixp_den_p = "ixp_den_p", ixp_den_txt = "ixp_den_txt", ixp_den_nazev = "ixp_den_nazev", subrada_p = "subrada_p", ixs_esu = "ixs_esu", ixs_esu_txt = "ixs_esu_txt", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", sk_ci = "sk_ci", bu_ci = "bu_ci", ac = "ac", ac_sml = "ac_sml", ktg_typ = "ktg_typ", ktg_typ_txt = "ktg_typ_txt", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", ixs_fun_vyriz = "ixs_fun_vyriz", nazev_vyriz = "nazev_vyriz", ixs_fun_ref = "ixs_fun_ref", nazev_ref = "nazev_ref", poznamka = "poznamka", soutez = "soutez", ktg_sml = "ktg_sml", ktg_sml_txt = "ktg_sml_txt", mena = "mena", typ_platnost = "typ_platnost", nazev = "nazev", ac_ver_zak = "ac_ver_zak", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", ixs_orj_txt = "ixs_orj_txt", cis_real = "cis_real", cis_real_txt = "cis_real_txt", ixp_sml = "ixp_sml", ixs_pri = "ixs_pri", c_mena = "c_mena", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", typ_kurz_txt = "typ_kurz_txt", dat_ucinnost = "dat_ucinnost", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", sgn_stav_txt = "sgn_stav_txt", typ_ceny = "typ_ceny", typ_ceny_txt = "typ_ceny_txt", typ_ag_blok = "typ_ag_blok", por_cis_nab = "por_cis_nab", ixp_nab = "ixp_nab", ixs_fun_akt = "ixs_fun_akt", nazev_vlastnik = "nazev_vlastnik", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf_zm = "nazev_rf_zm", sk_vl = "sk_vl", bu_vl = "bu_vl", ixp = "ixp", c_rok = "c_rok", dat_dph_od = "dat_dph_od", dat_dph_do = "dat_dph_do", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", ok = "ok",}
	const enum GSmlsiabDtoFragments { ixp_ext = "*", typ_ag_ext = "*", typ_ag_txt = "*", stav_dok = "*", ixp_den_p = "*", ixp_den_txt = "*", ixp_den_nazev = "*", subrada_p = "*", ixs_esu = "*", ixs_esu_txt = "*", ico_esu = "*", ico = "*", ucs = "*", nks = "*", ac_esu = "*", popis = "*", sk_ci = "*", bu_ci = "*", ac = "*", ac_sml = "*", ktg_typ = "*", ktg_typ_txt = "*", ixs_typ = "*", ixs_typ_txt = "*", dat_uzavreni = "*", dat_platnost = "*", dat_prij_pod = "*", ixs_fun_vyriz = "*", nazev_vyriz = "*", ixs_fun_ref = "*", nazev_ref = "*", poznamka = "*", soutez = "*", ktg_sml = "*", ktg_sml_txt = "*", mena = "*", typ_platnost = "*", nazev = "*", ac_ver_zak = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", ixs_orj_txt = "*", cis_real = "*", cis_real_txt = "*", ixp_sml = "*", ixs_pri = "*", c_mena = "*", kurz = "*", m = "*", typ_kurz = "*", typ_kurz_txt = "*", dat_ucinnost = "*", fin_od = "*", fin_do = "*", sgn_stav = "*", sgn_stav_txt = "*", typ_ceny = "*", typ_ceny_txt = "*", typ_ag_blok = "*", por_cis_nab = "*", ixp_nab = "*", ixs_fun_akt = "*", nazev_vlastnik = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf_zm = "*", sk_vl = "*", bu_vl = "*", ixp = "*", c_rok = "*", dat_dph_od = "*", dat_dph_do = "*", c_mena_z_osv = "*", c_mena_z_bd = "*", c_mena_z_ss = "*", c_mena_z_ns = "*", c_mena_dph_ss = "*", c_mena_dph_ns = "*", c_c_mena_ss = "*", c_c_mena_ns = "*", c_c_mena_okr = "*", typ_phl = "*", vs = "*", c_mena_dph_3s = "*", c_mena_dph_4s = "*", c_mena_z_3s = "*", c_mena_z_4s = "*", c_c_mena_3s = "*", c_c_mena_4s = "*", dat_sgn = "*", dat_sgn_ext = "*", ok = "*",}
	const enum GSmlsiabDtoTypes { ixp_ext = "string", typ_ag_ext = "number", typ_ag_txt = "string", stav_dok = "number", ixp_den_p = "string", ixp_den_txt = "string", ixp_den_nazev = "string", subrada_p = "number", ixs_esu = "string", ixs_esu_txt = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", sk_ci = "string", bu_ci = "string", ac = "string", ac_sml = "string", ktg_typ = "number", ktg_typ_txt = "string", ixs_typ = "string", ixs_typ_txt = "string", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", ixs_fun_vyriz = "string", nazev_vyriz = "string", ixs_fun_ref = "string", nazev_ref = "string", poznamka = "string", soutez = "string", ktg_sml = "number", ktg_sml_txt = "string", mena = "number", typ_platnost = "number", nazev = "string", ac_ver_zak = "string", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", ixs_orj_txt = "string", cis_real = "string", cis_real_txt = "string", ixp_sml = "string", ixs_pri = "string", c_mena = "JsonDecimal", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", typ_kurz_txt = "string", dat_ucinnost = "JsonDate", fin_od = "number", fin_do = "number", sgn_stav = "number", sgn_stav_txt = "string", typ_ceny = "number", typ_ceny_txt = "string", typ_ag_blok = "number", por_cis_nab = "number", ixp_nab = "string", ixs_fun_akt = "string", nazev_vlastnik = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf_zm = "string", sk_vl = "string", bu_vl = "string", ixp = "string", c_rok = "JsonDecimal", dat_dph_od = "JsonDate", dat_dph_do = "JsonDate", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", ok = "boolean",}
	const enum GSmlsiabDtoTypeLengths { ixp_ext = 12, ixp_den_p = 12, ixs_esu = 12, ico_esu = 10, ico = 10, ucs = 10, nks = 12, ac_esu = 20, popis = 254, sk_ci = 11, bu_ci = 34, ac = 30, ac_sml = 30, ixs_typ = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, poznamka = 500, soutez = 50, nazev = 4000, ac_ver_zak = 30, ac_dok_1 = 20, ac_dok_2 = 20, ucinnost = 20, ixs_orj = 12, cis_real = 6, ixp_sml = 12, ixs_pri = 12, ixp_nab = 12, ixs_fun_akt = 12, zmenu_prov = 12, sk_vl = 11, bu_vl = 34, ixp = 12, typ_phl = 4, vs = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GSmlspid.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSmlspidDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.por_cislo_nab*/
		por_cislo_nab?: number|null;
		/**DBCOLUMN:Seznam.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:Seznam.sml_stav*/
		sml_stav?: number|null;
		/**DBCOLUMN:Seznam.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.zadavatel*/
		zadavatel?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:Seznam.mena*/
		mena?: number|null;
		/**DBCOLUMN:Seznam.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.c_pol*/
		c_pol?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dod*/
		c_dod?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_platnost*/
		typ_platnost?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:Seznam.ac_dok_1*/
		ac_dok_1?: string|null;
		/**DBCOLUMN:Seznam.ac_dok_2*/
		ac_dok_2?: string|null;
		/**DBCOLUMN:Seznam.ucinnost*/
		ucinnost?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.ac_nad*/
		ac_nad?: string|null;
		/**DBCOLUMN:Seznam.ac_sml_nad*/
		ac_sml_nad?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.num_obj*/
		num_obj?: number|null;
		/**DBCOLUMN:Seznam.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_kurz*/
		typ_kurz?: number|null;
		/**DBCOLUMN:Seznam.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Seznam.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:Seznam.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:Seznam.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Seznam.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:Seznam.typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref_zast*/
		ixs_ref_zast?: string|null;
		/**DBCOLUMN:Seznam.lic_zast_esu*/
		lic_zast_esu?: string|null;
		/**DBCOLUMN:Seznam.por_zast_esu*/
		por_zast_esu?: number|null;
		/**DBCOLUMN:Seznam.dat_dok_1*/
		dat_dok_1?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_dok_2*/
		dat_dok_2?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_zuk*/
		ixs_zuk?: string|null;
		/**DBCOLUMN:Seznam.ktg_zuk*/
		ktg_zuk?: number|null;
		/**DBCOLUMN:Seznam.dat_uko*/
		dat_uko?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_esu_zast*/
		ixs_esu_zast?: string|null;
		/**DBCOLUMN:Seznam.c_sazba_pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.proc_sazba_pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_pen*/
		typ_pen?: number|null;
		/**DBCOLUMN:Seznam.zak_upr*/
		zak_upr?: number|null;
		/**DBCOLUMN:Seznam.priz_spo*/
		priz_spo?: number|null;
		/**DBCOLUMN:Seznam.typ_spo*/
		typ_spo?: number|null;
		/**DBCOLUMN:Seznam.c_spo*/
		c_spo?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.proc_spo*/
		proc_spo?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.priz_uroc*/
		priz_uroc?: number|null;
		/**DBCOLUMN:Seznam.num_dod*/
		num_dod?: number|null;
		/**DBCOLUMN:Seznam.cislo_dod*/
		cislo_dod?: number|null;
		/**DBCOLUMN:Seznam.zp_def_ceny*/
		zp_def_ceny?: number|null;
		/**DBCOLUMN:Seznam.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:Seznam.priz_pzp*/
		priz_pzp?: number|null;
		/**DBCOLUMN:Seznam.dat_dph_od*/
		dat_dph_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_dph_do*/
		dat_dph_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.c_mena_z_osv*/
		c_mena_z_osv?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_bd*/
		c_mena_z_bd?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_ss*/
		c_mena_z_ss?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_ns*/
		c_mena_z_ns?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_dph_ss*/
		c_mena_dph_ss?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_dph_ns*/
		c_mena_dph_ns?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_ss*/
		c_c_mena_ss?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_ns*/
		c_c_mena_ns?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_okr*/
		c_c_mena_okr?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.c_mena_dph_3s*/
		c_mena_dph_3s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_dph_4s*/
		c_mena_dph_4s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_3s*/
		c_mena_z_3s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena_z_4s*/
		c_mena_z_4s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_3s*/
		c_c_mena_3s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_c_mena_4s*/
		c_c_mena_4s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_sgn*/
		dat_sgn?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sgn_ext*/
		dat_sgn_ext?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:Seznam.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:Seznam.sslstyp_nazev*/
		sslstyp_nazev?: string|null;
		/**DBCOLUMN:Seznam.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:Seznam.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:Seznam.nazev_vyriz*/
		nazev_vyriz?: string|null;
		/**DBCOLUMN:Seznam.typ_platnost_txt*/
		typ_platnost_txt?: string|null;
		/**DBCOLUMN:Seznam.ginsorj_nazev*/
		ginsorj_nazev?: string|null;
		/**DBCOLUMN:Seznam.castka*/
		castka?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:Seznam.s_sgn*/
		s_sgn?: number|null;
		/**stav///*/
		stav?: string|null;
	}
	const enum GSmlspidDtoNames { ixp = "ixp", lic = "lic", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", ac = "ac", ac_sml = "ac_sml", ixp_den = "ixp_den", subrada = "subrada", c = "c", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", por_cislo_nab = "por_cislo_nab", eko_akt = "eko_akt", sml_stav = "sml_stav", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", zadavatel = "zadavatel", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", rok = "rok", poznamka = "poznamka", soutez = "soutez", mena = "mena", ktg_sml = "ktg_sml", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_pol = "c_pol", c_dod = "c_dod", typ_platnost = "typ_platnost", nazev = "nazev", ac_ver_zak = "ac_ver_zak", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", cis_real = "cis_real", ixp_sml = "ixp_sml", ac_nad = "ac_nad", ac_sml_nad = "ac_sml_nad", ixs_pri = "ixs_pri", num_obj = "num_obj", c_mena = "c_mena", kurz = "kurz", m = "m", typ_kurz = "typ_kurz", dat_ucinnost = "dat_ucinnost", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", priz_view = "priz_view", typ_ceny = "typ_ceny", typ_ag_blok = "typ_ag_blok", ixp_nab = "ixp_nab", ixs_ref_zast = "ixs_ref_zast", lic_zast_esu = "lic_zast_esu", por_zast_esu = "por_zast_esu", dat_dok_1 = "dat_dok_1", dat_dok_2 = "dat_dok_2", ixs_zuk = "ixs_zuk", ktg_zuk = "ktg_zuk", dat_uko = "dat_uko", ixs_esu_zast = "ixs_esu_zast", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", typ_pen = "typ_pen", zak_upr = "zak_upr", priz_spo = "priz_spo", typ_spo = "typ_spo", c_spo = "c_spo", proc_spo = "proc_spo", priz_uroc = "priz_uroc", num_dod = "num_dod", cislo_dod = "cislo_dod", zp_def_ceny = "zp_def_ceny", ixp_sml_pri = "ixp_sml_pri", priz_pzp = "priz_pzp", dat_dph_od = "dat_dph_od", dat_dph_do = "dat_dph_do", c_mena_z_osv = "c_mena_z_osv", c_mena_z_bd = "c_mena_z_bd", c_mena_z_ss = "c_mena_z_ss", c_mena_z_ns = "c_mena_z_ns", c_mena_dph_ss = "c_mena_dph_ss", c_mena_dph_ns = "c_mena_dph_ns", c_c_mena_ss = "c_c_mena_ss", c_c_mena_ns = "c_c_mena_ns", c_c_mena_okr = "c_c_mena_okr", typ_phl = "typ_phl", vs = "vs", c_mena_dph_3s = "c_mena_dph_3s", c_mena_dph_4s = "c_mena_dph_4s", c_mena_z_3s = "c_mena_z_3s", c_mena_z_4s = "c_mena_z_4s", c_c_mena_3s = "c_c_mena_3s", c_c_mena_4s = "c_c_mena_4s", dat_sgn = "dat_sgn", dat_sgn_ext = "dat_sgn_ext", ixs_fun_akt = "ixs_fun_akt", mena_zkr = "mena_zkr", sslstyp_nazev = "sslstyp_nazev", esu_txt = "esu_txt", nazev_ref = "nazev_ref", nazev_vyriz = "nazev_vyriz", typ_platnost_txt = "typ_platnost_txt", ginsorj_nazev = "ginsorj_nazev", castka = "castka", s_ele = "s_ele", s_sgn = "s_sgn", stav = "stav",}
	const enum GSmlspidDtoFragments { ixp = "*", lic = "*", ixs_esu = "*", ico_esu = "*", ico = "*", ucs = "*", nks = "*", ac_esu = "*", popis = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", ac = "*", ac_sml = "*", ixp_den = "*", subrada = "*", c = "*", ktg_typ = "*", ixs_typ = "*", por_cislo_nab = "*", eko_akt = "*", sml_stav = "*", dat_uzavreni = "*", dat_platnost = "*", dat_prij_pod = "*", zadavatel = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", rok = "*", poznamka = "*", soutez = "*", mena = "*", ktg_sml = "*", dat_zmena = "*", zmenu_prov = "*", c_pol = "*", c_dod = "*", typ_platnost = "*", nazev = "*", ac_ver_zak = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", cis_real = "*", ixp_sml = "*", ac_nad = "*", ac_sml_nad = "*", ixs_pri = "*", num_obj = "*", c_mena = "*", kurz = "*", m = "*", typ_kurz = "*", dat_ucinnost = "*", fin_od = "*", fin_do = "*", sgn_stav = "*", priz_view = "*", typ_ceny = "*", typ_ag_blok = "*", ixp_nab = "*", ixs_ref_zast = "*", lic_zast_esu = "*", por_zast_esu = "*", dat_dok_1 = "*", dat_dok_2 = "*", ixs_zuk = "*", ktg_zuk = "*", dat_uko = "*", ixs_esu_zast = "*", c_sazba_pen = "*", proc_sazba_pen = "*", typ_pen = "*", zak_upr = "*", priz_spo = "*", typ_spo = "*", c_spo = "*", proc_spo = "*", priz_uroc = "*", num_dod = "*", cislo_dod = "*", zp_def_ceny = "*", ixp_sml_pri = "*", priz_pzp = "*", dat_dph_od = "*", dat_dph_do = "*", c_mena_z_osv = "*", c_mena_z_bd = "*", c_mena_z_ss = "*", c_mena_z_ns = "*", c_mena_dph_ss = "*", c_mena_dph_ns = "*", c_c_mena_ss = "*", c_c_mena_ns = "*", c_c_mena_okr = "*", typ_phl = "*", vs = "*", c_mena_dph_3s = "*", c_mena_dph_4s = "*", c_mena_z_3s = "*", c_mena_z_4s = "*", c_c_mena_3s = "*", c_c_mena_4s = "*", dat_sgn = "*", dat_sgn_ext = "*", ixs_fun_akt = "*", mena_zkr = "*", sslstyp_nazev = "*", esu_txt = "*", nazev_ref = "*", nazev_vyriz = "*", typ_platnost_txt = "*", ginsorj_nazev = "*", castka = "*", s_ele = "*", s_sgn = "*", stav = "*",}
	const enum GSmlspidDtoTypes { ixp = "string", lic = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", ac = "string", ac_sml = "string", ixp_den = "string", subrada = "number", c = "JsonDecimal", ktg_typ = "number", ixs_typ = "string", por_cislo_nab = "number", eko_akt = "number", sml_stav = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", zadavatel = "string", ixs_fun_vyriz = "string", ixs_fun_ref = "string", rok = "number", poznamka = "string", soutez = "string", mena = "number", ktg_sml = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_pol = "JsonDecimal", c_dod = "JsonDecimal", typ_platnost = "number", nazev = "string", ac_ver_zak = "string", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", cis_real = "string", ixp_sml = "string", ac_nad = "string", ac_sml_nad = "string", ixs_pri = "string", num_obj = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", m = "JsonDecimal", typ_kurz = "number", dat_ucinnost = "JsonDate", fin_od = "number", fin_do = "number", sgn_stav = "number", priz_view = "number", typ_ceny = "number", typ_ag_blok = "number", ixp_nab = "string", ixs_ref_zast = "string", lic_zast_esu = "string", por_zast_esu = "number", dat_dok_1 = "JsonDate", dat_dok_2 = "JsonDate", ixs_zuk = "string", ktg_zuk = "number", dat_uko = "JsonDate", ixs_esu_zast = "string", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", typ_pen = "number", zak_upr = "number", priz_spo = "number", typ_spo = "number", c_spo = "JsonDecimal", proc_spo = "JsonDecimal", priz_uroc = "number", num_dod = "number", cislo_dod = "number", zp_def_ceny = "number", ixp_sml_pri = "string", priz_pzp = "number", dat_dph_od = "JsonDate", dat_dph_do = "JsonDate", c_mena_z_osv = "JsonDecimal", c_mena_z_bd = "JsonDecimal", c_mena_z_ss = "JsonDecimal", c_mena_z_ns = "JsonDecimal", c_mena_dph_ss = "JsonDecimal", c_mena_dph_ns = "JsonDecimal", c_c_mena_ss = "JsonDecimal", c_c_mena_ns = "JsonDecimal", c_c_mena_okr = "JsonDecimal", typ_phl = "string", vs = "string", c_mena_dph_3s = "JsonDecimal", c_mena_dph_4s = "JsonDecimal", c_mena_z_3s = "JsonDecimal", c_mena_z_4s = "JsonDecimal", c_c_mena_3s = "JsonDecimal", c_c_mena_4s = "JsonDecimal", dat_sgn = "JsonDate", dat_sgn_ext = "JsonDate", ixs_fun_akt = "string", mena_zkr = "string", sslstyp_nazev = "string", esu_txt = "string", nazev_ref = "string", nazev_vyriz = "string", typ_platnost_txt = "string", ginsorj_nazev = "string", castka = "JsonDecimal", s_ele = "number", s_sgn = "number", stav = "string",}
	const enum GSmlspidDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, ico_esu = 10, ico = 10, ucs = 10, nks = 12, ac_esu = 20, popis = 254, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ac = 30, ac_sml = 30, ixp_den = 12, ixs_typ = 12, zadavatel = 30, ixs_fun_vyriz = 12, ixs_fun_ref = 12, poznamka = 500, soutez = 30, zmenu_prov = 12, nazev = 4000, ac_ver_zak = 30, ac_dok_1 = 25, ac_dok_2 = 25, ucinnost = 20, ixs_orj = 12, cis_real = 6, ixp_sml = 12, ac_nad = 30, ac_sml_nad = 30, ixs_pri = 12, ixp_nab = 12, ixs_ref_zast = 12, lic_zast_esu = 4, ixs_zuk = 12, ixs_esu_zast = 12, ixp_sml_pri = 12, typ_phl = 4, vs = 12, ixs_fun_akt = 12, mena_zkr = 16, sslstyp_nazev = 5, esu_txt = 254, nazev_ref = 50, nazev_vyriz = 50, typ_platnost_txt = 50, ginsorj_nazev = 25,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GSmlspol.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSmlspolPapDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.cislo*/
		cislo?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.cis_pol_pla*/
		cis_pol_pla?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.up_stav*/
		up_stav?: number|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixp_pla*/
		ixp_pla?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uek?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uel?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uem?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uen?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te5?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te6?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te7?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te8?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_vznik*/
		dat_vznik?: JsonDate|null;
		/**DBCOLUMN:Seznam.c_obj_sml*/
		c_obj_sml?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:Seznam.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:Seznam.uea_rr*/
		uea_rr?: string|null;
		/**DBCOLUMN:Seznam.ueb_rr*/
		ueb_rr?: string|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:Seznam.typ_ag_blok*/
		typ_ag_blok?: number|null;
		/**DBCOLUMN:Seznam.znam*/
		znam?: number|null;
		/**DBCOLUMN:Seznam.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:Seznam.priz_zaz*/
		priz_zaz?: number|null;
		/**DBCOLUMN:Seznam.eds_dok*/
		eds_dok?: string|null;
		/**DBCOLUMN:Seznam.id_hdr*/
		id_hdr?: number|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:Seznam.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:Seznam.typ_kurz*/
		typ_kurz?: number|null;
		/**DBCOLUMN:Seznam.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.dat_plneni*/
		dat_plneni?: JsonDate|null;
		/**DBCOLUMN:Seznam.c_sml*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.max_rok_pol*/
		max_rok_pol?: number|null;
		/**DBCOLUMN:Seznam.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.mj*/
		mj?: string|null;
		/**DBCOLUMN:Seznam.por_cis_blk*/
		por_cis_blk?: number|null;
		/**stav///*/
		stav?: string|null;
	}
	const enum GSmlspolPapDtoNames { ixp = "ixp", rok = "rok", cislo = "cislo", lic = "lic", cis_pol_pla = "cis_pol_pla", nazev = "nazev", up_stav = "up_stav", c = "c", ixp_pla = "ixp_pla", ico = "ico", ucs = "ucs", nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", sk_vl = "sk_vl", bu_vl = "bu_vl", c_fak = "c_fak", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_vznik = "dat_vznik", c_obj_sml = "c_obj_sml", drd = "drd", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", uea_rr = "uea_rr", ueb_rr = "ueb_rr", ixs_pri = "ixs_pri", por_cis = "por_cis", typ_ag_blok = "typ_ag_blok", znam = "znam", xuete = "xuete", priz_zaz = "priz_zaz", eds_dok = "eds_dok", id_hdr = "id_hdr", radek_hdr = "radek_hdr", ktg_sml = "ktg_sml", typ_ceny = "typ_ceny", typ_kurz = "typ_kurz", ixp_sml_pri = "ixp_sml_pri", ixs_fun = "ixs_fun", dat_plneni = "dat_plneni", c_sml = "c_sml", max_rok_pol = "max_rok_pol", m = "m", mj = "mj", por_cis_blk = "por_cis_blk", stav = "stav",}
	const enum GSmlspolPapDtoFragments { ixp = "*", rok = "*", cislo = "*", lic = "*", cis_pol_pla = "*", nazev = "*", up_stav = "*", c = "*", ixp_pla = "*", ico = "*", ucs = "*", nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", sk_vl = "*", bu_vl = "*", c_fak = "*", dat_zmena = "*", zmenu_prov = "*", dat_vznik = "*", c_obj_sml = "*", drd = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", uea_rr = "*", ueb_rr = "*", ixs_pri = "*", por_cis = "*", typ_ag_blok = "*", znam = "*", xuete = "*", priz_zaz = "*", eds_dok = "*", id_hdr = "*", radek_hdr = "*", ktg_sml = "*", typ_ceny = "*", typ_kurz = "*", ixp_sml_pri = "*", ixs_fun = "*", dat_plneni = "*", c_sml = "*", max_rok_pol = "*", m = "*", mj = "*", por_cis_blk = "*", stav = "*",}
	const enum GSmlspolPapDtoTypes { ixp = "string", rok = "number", cislo = "number", lic = "string", cis_pol_pla = "string", nazev = "string", up_stav = "number", c = "JsonDecimal", ixp_pla = "string", ico = "string", ucs = "string", nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", sk_vl = "string", bu_vl = "string", c_fak = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", dat_vznik = "JsonDate", c_obj_sml = "JsonDecimal", drd = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", uea_rr = "string", ueb_rr = "string", ixs_pri = "string", por_cis = "number", typ_ag_blok = "number", znam = "number", xuete = "string", priz_zaz = "number", eds_dok = "string", id_hdr = "number", radek_hdr = "number", ktg_sml = "number", typ_ceny = "number", typ_kurz = "number", ixp_sml_pri = "string", ixs_fun = "string", dat_plneni = "JsonDate", c_sml = "JsonDecimal", max_rok_pol = "number", m = "JsonDecimal", mj = "string", por_cis_blk = "number", stav = "string",}
	const enum GSmlspolPapDtoTypeLengths { ixp = 12, lic = 4, cis_pol_pla = 16, nazev = 254, ico = 10, ucs = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, sk_vl = 11, bu_vl = 34, zmenu_prov = 12, ixp_sml = 12, uea_rr = 3, ueb_rr = 4, ixs_pri = 12, xuete = 148, eds_dok = 16, ixp_sml_pri = 12, ixs_fun = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GSmlssbl.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSmlssblDto {
		/**DBCOLUMN:Seznam.ixs_sbl*/
		ixs_sbl?: string|null;
		/**DBCOLUMN:Seznam.id_ext*/
		id_ext?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_ste*/
		typ_ste?: number|null;
		/**DBCOLUMN:Seznam.s_opak*/
		s_opak?: number|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSmlssblDtoNames { ixs_sbl = "ixs_sbl", id_ext = "id_ext", aktivita = "aktivita", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", typ_ste = "typ_ste", s_opak = "s_opak", typ_ag = "typ_ag", ixs_fun = "ixs_fun", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSmlssblDtoFragments { ixs_sbl = "*", id_ext = "*", aktivita = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", typ_ste = "*", s_opak = "*", typ_ag = "*", ixs_fun = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSmlssblDtoTypes { ixs_sbl = "string", id_ext = "string", aktivita = "number", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", typ_ste = "number", s_opak = "number", typ_ag = "number", ixs_fun = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSmlssblDtoTypeLengths { ixs_sbl = 12, id_ext = 30, zkratka = 16, nazev = 50, poznamka = 254, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GSmlUpdAddsbl.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro Add/upd šablon*/
	interface GSmlUpdAddsblDto {
		/**hlavička*/
		sblHlav?: Gordic.Pap.Interface.GSmlssblDto|null;
		/**položky*/
		sblPol?: Gordic.Pap.Interface.GSmldsblDto|null;
		/**návratová hláška*/
		hlas?: string|null;
		/**úspěch/neúspěch*/
		ok?: boolean|null;
	}
	const enum GSmlUpdAddsblDtoNames { sblHlav = "sblHlav", sblPol = "sblPol", hlas = "hlas", ok = "ok",}
	const enum GSmlUpdAddsblDtoFragments { sblHlav = "*", sblPol = "*", hlas = "*", ok = "*",}
	const enum GSmlUpdAddsblDtoTypes { sblHlav = "Gordic.Pap.Interface.GSmlssblDto", sblPol = "Gordic.Pap.Interface.GSmldsblDto", hlas = "string", ok = "boolean",}
	const enum GSmlUpdAddsblDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GSmlxsbl.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Seznam šablon*/
	interface GSmlxsblDto {
		/**DBCOLUMN:Seznam.id_tem*/
		id_tem?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.ks*/
		ks?: string|null;
		/**DBCOLUMN:Seznam.ss*/
		ss?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.subrada_p*/
		subrada_p?: number|null;
		/**DBCOLUMN:Seznam.mena*/
		mena?: number|null;
		/**DBCOLUMN:Seznam.mena*/
		mena_txt?: string|null;
		/**DBCOLUMN:Seznam.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.s_tem*/
		s_tem?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.aktivita_dsbl*/
		aktivita_dsbl?: number|null;
		/**DBCOLUMN:Seznam.dat_uzavreni*/
		dat_uzavreni?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_platnost*/
		dat_platnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_ref*/
		ixs_fun_ref?: string|null;
		/**DBCOLUMN:Seznam.poznamka_dsbl*/
		poznamka_dsbl?: string|null;
		/**DBCOLUMN:Seznam.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:Seznam.ktg_sml*/
		ktg_sml_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_platnost*/
		typ_platnost?: number|null;
		/**DBCOLUMN:Seznam.typ_platnost_txt*/
		typ_platnost_txt?: string|null;
		/**DBCOLUMN:Seznam.nazev_dsbl*/
		nazev_dsbl?: string|null;
		/**DBCOLUMN:Seznam.ac_dok_1*/
		ac_dok_1?: string|null;
		/**DBCOLUMN:Seznam.ac_dok_2*/
		ac_dok_2?: string|null;
		/**DBCOLUMN:Seznam.ucinnost*/
		ucinnost?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.m*/
		m?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_kurz*/
		typ_kurz?: number|null;
		/**DBCOLUMN:Seznam.typ_kurz*/
		typ_kurz_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_ucinnost*/
		dat_ucinnost?: JsonDate|null;
		/**DBCOLUMN:Seznam.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Seznam.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:Seznam.sgn_stav*/
		sgn_stav?: number|null;
		/**DBCOLUMN:Seznam.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:Seznam.typ_ceny_txt*/
		typ_ceny_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref_zast*/
		ixs_ref_zast?: string|null;
		/**DBCOLUMN:Seznam.c_sazba_pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.proc_sazba_pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_pen*/
		typ_pen?: number|null;
		/**DBCOLUMN:Seznam.zak_upr*/
		zak_upr?: number|null;
		/**DBCOLUMN:Seznam.priz_spo*/
		priz_spo?: number|null;
		/**DBCOLUMN:Seznam.typ_spo*/
		typ_spo?: number|null;
		/**DBCOLUMN:Seznam.c_spo*/
		c_spo?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.proc_spo*/
		proc_spo?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.priz_uroc*/
		priz_uroc?: number|null;
		/**DBCOLUMN:Seznam.ixs_sbl*/
		ixs_sbl?: string|null;
		/**DBCOLUMN:Seznam.id_ext*/
		id_ext?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_ste*/
		typ_ste?: number|null;
		/**DBCOLUMN:Seznam.s_opak*/
		s_opak?: number|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.typ_ag_txt*/
		typ_ag_txt?: string|null;
		/**DBCOLUMN:Seznam.priznak*/
		priznak?: number|null;
		/**DBCOLUMN:Seznam.zdu_vyr*/
		zdu_vyr?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf_zm*/
		nazev_rf_zm?: string|null;
		/**DBCOLUMN:Seznam.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:Seznam.nazev_den*/
		nazev_den?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:Seznam.nazev_typ*/
		nazev_typ?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf_vyriz*/
		nazev_rf_vyriz?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf_ref*/
		nazev_rf_ref?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf_akt*/
		nazev_rf_akt?: string|null;
		/**DBCOLUMN:Seznam.nazev_orj*/
		nazev_orj?: string|null;
		/**DBCOLUMN:Seznam.kod_orj*/
		kod_orj?: string|null;
		/**DBCOLUMN:Seznam.id_knih*/
		id_knih?: string|null;
		/**DBCOLUMN:Seznam.naz_knih*/
		naz_knih?: string|null;
		/**DBCOLUMN:Seznam.nazev_ssl*/
		nazev_ssl?: string|null;
		/**návratová hláška*/
		hlas?: string|null;
		/**úspěch/neúspěch*/
		ok?: boolean|null;
	}
	const enum GSmlxsblDtoNames { id_tem = "id_tem", lic = "lic", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", ixp_den = "ixp_den", subrada_p = "subrada_p", mena = "mena", mena_txt = "mena_txt", c_mena = "c_mena", s_tem = "s_tem", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", aktivita_dsbl = "aktivita_dsbl", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_fun_ref = "ixs_fun_ref", poznamka_dsbl = "poznamka_dsbl", ktg_sml = "ktg_sml", ktg_sml_txt = "ktg_sml_txt", typ_platnost = "typ_platnost", typ_platnost_txt = "typ_platnost_txt", nazev_dsbl = "nazev_dsbl", ac_dok_1 = "ac_dok_1", ac_dok_2 = "ac_dok_2", ucinnost = "ucinnost", ixs_orj = "ixs_orj", cis_real = "cis_real", ixp_sml = "ixp_sml", m = "m", typ_kurz = "typ_kurz", typ_kurz_txt = "typ_kurz_txt", dat_ucinnost = "dat_ucinnost", fin_od = "fin_od", fin_do = "fin_do", sgn_stav = "sgn_stav", typ_ceny = "typ_ceny", typ_ceny_txt = "typ_ceny_txt", ixs_fun_akt = "ixs_fun_akt", ixs_ref_zast = "ixs_ref_zast", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", typ_pen = "typ_pen", zak_upr = "zak_upr", priz_spo = "priz_spo", typ_spo = "typ_spo", c_spo = "c_spo", proc_spo = "proc_spo", priz_uroc = "priz_uroc", ixs_sbl = "ixs_sbl", id_ext = "id_ext", aktivita = "aktivita", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", typ_ste = "typ_ste", s_opak = "s_opak", typ_ag = "typ_ag", typ_ag_txt = "typ_ag_txt", priznak = "priznak", zdu_vyr = "zdu_vyr", ixs_fun = "ixs_fun", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref", nazev_rf = "nazev_rf", nazev_rf_zm = "nazev_rf_zm", esu_txt = "esu_txt", nazev_den = "nazev_den", ktg_typ_txt = "ktg_typ_txt", nazev_typ = "nazev_typ", nazev_rf_vyriz = "nazev_rf_vyriz", nazev_rf_ref = "nazev_rf_ref", nazev_rf_akt = "nazev_rf_akt", nazev_orj = "nazev_orj", kod_orj = "kod_orj", id_knih = "id_knih", naz_knih = "naz_knih", nazev_ssl = "nazev_ssl", hlas = "hlas", ok = "ok",}
	const enum GSmlxsblDtoFragments { id_tem = "*", lic = "*", ixs_esu = "*", ico_esu = "*", ico = "*", ucs = "*", nks = "*", ac_esu = "*", popis = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", ixp_den = "*", subrada_p = "*", mena = "*", mena_txt = "*", c_mena = "*", s_tem = "*", ktg_typ = "*", ixs_typ = "*", aktivita_dsbl = "*", dat_uzavreni = "*", dat_platnost = "*", dat_prij_pod = "*", ixs_fun_vyriz = "*", ixs_fun_ref = "*", poznamka_dsbl = "*", ktg_sml = "*", ktg_sml_txt = "*", typ_platnost = "*", typ_platnost_txt = "*", nazev_dsbl = "*", ac_dok_1 = "*", ac_dok_2 = "*", ucinnost = "*", ixs_orj = "*", cis_real = "*", ixp_sml = "*", m = "*", typ_kurz = "*", typ_kurz_txt = "*", dat_ucinnost = "*", fin_od = "*", fin_do = "*", sgn_stav = "*", typ_ceny = "*", typ_ceny_txt = "*", ixs_fun_akt = "*", ixs_ref_zast = "*", c_sazba_pen = "*", proc_sazba_pen = "*", typ_pen = "*", zak_upr = "*", priz_spo = "*", typ_spo = "*", c_spo = "*", proc_spo = "*", priz_uroc = "*", ixs_sbl = "*", id_ext = "*", aktivita = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", typ_ste = "*", s_opak = "*", typ_ag = "*", typ_ag_txt = "*", priznak = "*", zdu_vyr = "*", ixs_fun = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*", nazev_rf = "*", nazev_rf_zm = "*", esu_txt = "*", nazev_den = "*", ktg_typ_txt = "*", nazev_typ = "*", nazev_rf_vyriz = "*", nazev_rf_ref = "*", nazev_rf_akt = "*", nazev_orj = "*", kod_orj = "*", id_knih = "*", naz_knih = "*", nazev_ssl = "*", hlas = "*", ok = "*",}
	const enum GSmlxsblDtoTypes { id_tem = "string", lic = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", ixp_den = "string", subrada_p = "number", mena = "number", mena_txt = "string", c_mena = "JsonDecimal", s_tem = "number", ktg_typ = "number", ixs_typ = "string", aktivita_dsbl = "number", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", ixs_fun_vyriz = "string", ixs_fun_ref = "string", poznamka_dsbl = "string", ktg_sml = "number", ktg_sml_txt = "string", typ_platnost = "number", typ_platnost_txt = "string", nazev_dsbl = "string", ac_dok_1 = "string", ac_dok_2 = "string", ucinnost = "string", ixs_orj = "string", cis_real = "string", ixp_sml = "string", m = "JsonDecimal", typ_kurz = "number", typ_kurz_txt = "string", dat_ucinnost = "JsonDate", fin_od = "number", fin_do = "number", sgn_stav = "number", typ_ceny = "number", typ_ceny_txt = "string", ixs_fun_akt = "string", ixs_ref_zast = "string", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", typ_pen = "number", zak_upr = "number", priz_spo = "number", typ_spo = "number", c_spo = "JsonDecimal", proc_spo = "JsonDecimal", priz_uroc = "number", ixs_sbl = "string", id_ext = "string", aktivita = "number", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", typ_ste = "number", s_opak = "number", typ_ag = "number", typ_ag_txt = "string", priznak = "number", zdu_vyr = "string", ixs_fun = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string", nazev_rf = "string", nazev_rf_zm = "string", esu_txt = "string", nazev_den = "string", ktg_typ_txt = "string", nazev_typ = "string", nazev_rf_vyriz = "string", nazev_rf_ref = "string", nazev_rf_akt = "string", nazev_orj = "string", kod_orj = "string", id_knih = "string", naz_knih = "string", nazev_ssl = "string", hlas = "string", ok = "boolean",}
	const enum GSmlxsblDtoTypeLengths { id_tem = 20, lic = 4, ixs_esu = 12, ico_esu = 10, ico = 10, ucs = 10, nks = 12, ac_esu = 20, popis = 254, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ixp_den = 12, ixs_typ = 12, ixs_fun_vyriz = 12, ixs_fun_ref = 12, poznamka_dsbl = 254, typ_platnost_txt = 50, nazev_dsbl = 254, ac_dok_1 = 20, ac_dok_2 = 20, ucinnost = 20, ixs_orj = 12, cis_real = 6, ixp_sml = 12, typ_kurz_txt = 50, typ_ceny_txt = 50, ixs_fun_akt = 12, ixs_ref_zast = 12, ixs_sbl = 12, id_ext = 30, zkratka = 16, nazev = 50, poznamka = 254, typ_ag_txt = 100, zdu_vyr = 12, ixs_fun = 12, zmenu_prov = 12, nazev_ref = 50, nazev_rf = 50, nazev_rf_zm = 50, esu_txt = 254, nazev_den = 50, ktg_typ_txt = 50, nazev_typ = 50, nazev_rf_vyriz = 50, nazev_rf_ref = 50, nazev_rf_akt = 50, nazev_orj = 25, kod_orj = 30, id_knih = 254, naz_knih = 254, nazev_ssl = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GSrvdixp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Struktura pro požadavky*/
	interface GSrvdixpDto {
		/**DBCOLUMN:Seznam.rok_srv*/
		rok_srv?: number|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.komp*/
		komp?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0*/
		c0_konto?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1_konto?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uek?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uel?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uem?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uen?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te5?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te6?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te7?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te8?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.t_ico*/
		t_ico?: string|null;
		/**DBCOLUMN:Seznam.t_nks*/
		t_nks?: string|null;
		/**DBCOLUMN:Seznam.c0_s*/
		c0_s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_s*/
		c1_s?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.xpf_pf*/
		xpf_pf?: string|null;
		/**DBCOLUMN:Seznam.xpf_fs*/
		xpf_fs?: string|null;
		/**DBCOLUMN:Seznam.komodita*/
		komodita?: string|null;
		/**DBCOLUMN:Seznam.typ_org*/
		typ_org?: number|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.priz_blok*/
		priz_blok?: number|null;
		/**DBCOLUMN:Seznam.ixp_prim*/
		ixp_prim?: string|null;
		/**DBCOLUMN:Seznam.ixp_roz*/
		ixp_roz?: string|null;
		/**DBCOLUMN:Seznam.c_sml*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vz*/
		c_vz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_obj*/
		c_obj?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_ru*/
		c_ru?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.cislo_akce*/
		cislo_akce?: string|null;
		/**DBCOLUMN:Seznam.vabu*/
		vabu?: string|null;
		/**DBCOLUMN:Seznam.esu*/
		esu?: string|null;
		/**agenda*/
		agenda?: string|null;
		/**příchozí hláška od serveru při aktivních operacích*/
		hlas?: string|null;
	}
	const enum GSrvdixpDtoNames { rok_srv = "rok_srv", ixp = "ixp", cislo = "cislo", radek_z = "radek_z", rok = "rok", ico = "ico", ucs = "ucs", mesic = "mesic", komp = "komp", nks = "nks", drd = "drd", den = "den", c0 = "c0", c1 = "c1", c0_konto = "c0_konto", c1_konto = "c1_konto", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", popis = "popis", t_ico = "t_ico", t_nks = "t_nks", c0_s = "c0_s", c1_s = "c1_s", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", xpf_pf = "xpf_pf", xpf_fs = "xpf_fs", komodita = "komodita", typ_org = "typ_org", uus = "uus", priz_blok = "priz_blok", ixp_prim = "ixp_prim", ixp_roz = "ixp_roz", c_sml = "c_sml", c_vz = "c_vz", c_obj = "c_obj", c_ru = "c_ru", cislo_akce = "cislo_akce", vabu = "vabu", esu = "esu", agenda = "agenda", hlas = "hlas",}
	const enum GSrvdixpDtoFragments { rok_srv = "*", ixp = "*", cislo = "*", radek_z = "*", rok = "*", ico = "*", ucs = "*", mesic = "*", komp = "*", nks = "*", drd = "*", den = "*", c0 = "*", c1 = "*", c0_konto = "*", c1_konto = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", popis = "*", t_ico = "*", t_nks = "*", c0_s = "*", c1_s = "*", dat_zmena = "*", zmenu_prov = "*", aktivita = "*", xpf_pf = "*", xpf_fs = "*", komodita = "*", typ_org = "*", uus = "*", priz_blok = "*", ixp_prim = "*", ixp_roz = "*", c_sml = "*", c_vz = "*", c_obj = "*", c_ru = "*", cislo_akce = "*", vabu = "*", esu = "*", agenda = "*", hlas = "*",}
	const enum GSrvdixpDtoTypes { rok_srv = "number", ixp = "string", cislo = "string", radek_z = "number", rok = "number", ico = "string", ucs = "string", mesic = "number", komp = "string", nks = "string", drd = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", c0_konto = "JsonDecimal", c1_konto = "JsonDecimal", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", popis = "string", t_ico = "string", t_nks = "string", c0_s = "JsonDecimal", c1_s = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", xpf_pf = "string", xpf_fs = "string", komodita = "string", typ_org = "number", uus = "string", priz_blok = "number", ixp_prim = "string", ixp_roz = "string", c_sml = "JsonDecimal", c_vz = "JsonDecimal", c_obj = "JsonDecimal", c_ru = "JsonDecimal", cislo_akce = "string", vabu = "string", esu = "string", agenda = "string", hlas = "string",}
	const enum GSrvdixpDtoTypeLengths { ixp = 12, cislo = 16, ico = 10, ucs = 10, komp = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, popis = 254, t_ico = 50, t_nks = 50, zmenu_prov = 12, xpf_pf = 63, xpf_fs = 20, komodita = 15, uus = 10, ixp_prim = 12, ixp_roz = 12, cislo_akce = 16, vabu = 1, esu = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GSrvdroz.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**IGDto*/
	interface GSrvdrozDto {
		/**0 - běžný 1 - special*/
		pruchod?: string|null;
		cislo?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:Seznam.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.typ*/
		typ?: number|null;
		/**DBCOLUMN:Seznam.typ_txt*/
		typ_txt?: string|null;
		/**DBCOLUMN:Seznam.adresa1*/
		adresa1?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.cis_real_txt*/
		cis_real_txt?: string|null;
		/**DBCOLUMN:Seznam.ktg_akce*/
		ktg_akce?: number|null;
		/**DBCOLUMN:Seznam.ktg_akce_txt*/
		ktg_akce_txt?: string|null;
		/**DBCOLUMN:Seznam.vyber*/
		vyber?: number|null;
		/**DBCOLUMN:Seznam.vyber_txt*/
		vyber_txt?: string|null;
		/**DBCOLUMN:Seznam.sip_val1*/
		sip_val1?: string|null;
		/**DBCOLUMN:Seznam.sip_val2*/
		sip_val2?: string|null;
		/**DBCOLUMN:Seznam.sip_val3*/
		sip_val3?: string|null;
		/**DBCOLUMN:Seznam.sip_val4*/
		sip_val4?: string|null;
		/**DBCOLUMN:Seznam.priz_sta1*/
		priz_sta1?: string|null;
		/**DBCOLUMN:Seznam.priz_sta2*/
		priz_sta2?: string|null;
		/**DBCOLUMN:Seznam.priz_az*/
		priz_az?: number|null;
		/**DBCOLUMN:Seznam.priz_az*/
		priz_az_txt?: string|null;
		/**DBCOLUMN:Seznam.stav_inp*/
		stav_inp?: number|null;
		/**DBCOLUMN:Seznam.stav_inp*/
		stav_inp_txt?: string|null;
		/**DBCOLUMN:Seznam.kompetent*/
		kompetent?: string|null;
		/**DBCOLUMN:Seznam.dia_pripad*/
		dia_pripad?: string|null;
		/**pripojRozaaat*/
		pripojRozaaat?: boolean|null;
	}
	const enum GSrvdrozDtoNames { pruchod = "pruchod", cislo = "cislo", nazev = "nazev", rok = "rok", ixs_cia = "ixs_cia", ixs_pla = "ixs_pla", ico = "ico", ucs = "ucs", typ = "typ", typ_txt = "typ_txt", adresa1 = "adresa1", cis_real = "cis_real", cis_real_txt = "cis_real_txt", ktg_akce = "ktg_akce", ktg_akce_txt = "ktg_akce_txt", vyber = "vyber", vyber_txt = "vyber_txt", sip_val1 = "sip_val1", sip_val2 = "sip_val2", sip_val3 = "sip_val3", sip_val4 = "sip_val4", priz_sta1 = "priz_sta1", priz_sta2 = "priz_sta2", priz_az = "priz_az", priz_az_txt = "priz_az_txt", stav_inp = "stav_inp", stav_inp_txt = "stav_inp_txt", kompetent = "kompetent", dia_pripad = "dia_pripad", pripojRozaaat = "pripojRozaaat",}
	const enum GSrvdrozDtoFragments { pruchod = "common", cislo = "common", nazev = "common", rok = "common", ixs_cia = "common", ixs_pla = "common", ico = "common", ucs = "common", typ = "common", typ_txt = "common", adresa1 = "common", cis_real = "common", cis_real_txt = "common", ktg_akce = "common", ktg_akce_txt = "common", vyber = "evz", vyber_txt = "evz", sip_val1 = "evz", sip_val2 = "evz", sip_val3 = "evz", sip_val4 = "evz", priz_sta1 = "evz", priz_sta2 = "evz", priz_az = "evz", priz_az_txt = "evz", stav_inp = "evz", stav_inp_txt = "evz", kompetent = "ostatni", dia_pripad = "ostatni", pripojRozaaat = "ostatni",}
	const enum GSrvdrozDtoTypes { pruchod = "string", cislo = "string", nazev = "string", rok = "number", ixs_cia = "string", ixs_pla = "string", ico = "string", ucs = "string", typ = "number", typ_txt = "string", adresa1 = "string", cis_real = "string", cis_real_txt = "string", ktg_akce = "number", ktg_akce_txt = "string", vyber = "number", vyber_txt = "string", sip_val1 = "string", sip_val2 = "string", sip_val3 = "string", sip_val4 = "string", priz_sta1 = "string", priz_sta2 = "string", priz_az = "number", priz_az_txt = "string", stav_inp = "number", stav_inp_txt = "string", kompetent = "string", dia_pripad = "string", pripojRozaaat = "boolean",}
	const enum GSrvdrozDtoTypeLengths { cislo = 16, nazev = 254, ixs_cia = 12, ixs_pla = 12, ico = 10, ucs = 10, typ_txt = 50, adresa1 = 50, cis_real = 6, cis_real_txt = 50, ktg_akce_txt = 50, sip_val1 = 16, sip_val2 = 16, sip_val3 = 16, sip_val4 = 16, priz_sta1 = 50, priz_sta2 = 50, kompetent = 12, dia_pripad = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GTab04VlastnostiDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Labels pro form04*/
	interface GTab04VlastnostiDto {
		/**dat_zad_p - label*/
		dat_zad_p_lab?: string|null;
		/**dat_kos_p - label*/
		dat_kos_p_lab?: string|null;
		/**dat_uza_p - label*/
		dat_uza_p_lab?: string|null;
		/**dat_sml_p - label*/
		dat_sml_p_lab?: string|null;
		/**dat_real_p - label*/
		dat_real_p_lab?: string|null;
	}
	const enum GTab04VlastnostiDtoNames { dat_zad_p_lab = "dat_zad_p_lab", dat_kos_p_lab = "dat_kos_p_lab", dat_uza_p_lab = "dat_uza_p_lab", dat_sml_p_lab = "dat_sml_p_lab", dat_real_p_lab = "dat_real_p_lab",}
	const enum GTab04VlastnostiDtoFragments { dat_zad_p_lab = "*", dat_kos_p_lab = "*", dat_uza_p_lab = "*", dat_sml_p_lab = "*", dat_real_p_lab = "*",}
	const enum GTab04VlastnostiDtoTypes { dat_zad_p_lab = "string", dat_kos_p_lab = "string", dat_uza_p_lab = "string", dat_sml_p_lab = "string", dat_real_p_lab = "string",}
	const enum GTab04VlastnostiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GVfpctdgDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:vfpctdg*/
	interface GVfpctdgDto {
		/**DBCOLUMN:vfpctdg.typ_dgr*/
		typ_dgr?: string|null;
		/**DBCOLUMN:vfpctdg.typ_dgr_txt*/
		typ_dgr_txt?: string|null;
		k_v?: number|null;
		k_s?: string|null;
		hlas?: string|null;
	}
	const enum GVfpctdgDtoNames { typ_dgr = "typ_dgr", typ_dgr_txt = "typ_dgr_txt", k_v = "k_v", k_s = "k_s", hlas = "hlas",}
	const enum GVfpctdgDtoFragments { typ_dgr = "*", typ_dgr_txt = "*", k_v = "*", k_s = "*", hlas = "*",}
	const enum GVfpctdgDtoTypes { typ_dgr = "string", typ_dgr_txt = "string", k_v = "number", k_s = "string", hlas = "string",}
	const enum GVfpctdgDtoTypeLengths { typ_dgr = 10, typ_dgr_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GVyberPripadDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro výběr případu*/
	interface GVyberPripadDto {
		/**nazev*/
		nazev?: string|null;
		/**ixp*/
		ixp?: string|null;
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**ac*/
		ac?: string|null;
		/**rok*/
		rok?: number|null;
		/**deník název*/
		ixp_den_nazev?: string|null;
		/**kompetent*/
		nazev_rf?: string|null;
		/**vlastník*/
		fun_naz?: string|null;
		/**ixs_krk*/
		ixs_krk?: string|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**soutez*/
		soutez?: string|null;
		/**stav*/
		stavZakazky?: number|null;
	}
	const enum GVyberPripadDtoNames { nazev = "nazev", ixp = "ixp", ixs_pri = "ixs_pri", ac_ag = "ac_ag", ac = "ac", rok = "rok", ixp_den_nazev = "ixp_den_nazev", nazev_rf = "nazev_rf", fun_naz = "fun_naz", ixs_krk = "ixs_krk", ktg_typ = "ktg_typ", soutez = "soutez", stavZakazky = "stavZakazky",}
	const enum GVyberPripadDtoFragments { nazev = "*", ixp = "*", ixs_pri = "*", ac_ag = "*", ac = "*", rok = "*", ixp_den_nazev = "*", nazev_rf = "*", fun_naz = "*", ixs_krk = "*", ktg_typ = "*", soutez = "*", stavZakazky = "*",}
	const enum GVyberPripadDtoTypes { nazev = "string", ixp = "string", ixs_pri = "string", ac_ag = "string", ac = "string", rok = "number", ixp_den_nazev = "string", nazev_rf = "string", fun_naz = "string", ixs_krk = "string", ktg_typ = "number", soutez = "string", stavZakazky = "number",}
	const enum GVyberPripadDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GVyberUkonDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro výběr ukon*/
	interface GVyberUkonDto {
		/**id kroku*/
		ixs_krk?: string|null;
		/**nazev kroku*/
		nazev?: string|null;
		/**nazev kroku*/
		ktg_typ?: number|null;
		/**možnost provedení kroku (ano/důvod nemožnosti provedení*/
		enable?: string|null;
		/**typ (soutěž, úkon, ...)*/
		typ?: string|null;
	}
	const enum GVyberUkonDtoNames { ixs_krk = "ixs_krk", nazev = "nazev", ktg_typ = "ktg_typ", enable = "enable", typ = "typ",}
	const enum GVyberUkonDtoFragments { ixs_krk = "*", nazev = "*", ktg_typ = "*", enable = "*", typ = "*",}
	const enum GVyberUkonDtoTypes { ixs_krk = "string", nazev = "string", ktg_typ = "number", enable = "string", typ = "string",}
	const enum GVyberUkonDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GWflhpisPapDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:wflhpis*/
	interface GWflhpisPapDto {
		/**DBCOLUMN:wflhpis.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:wflhpis.por_cislo*/
		por_cislo?: number|null;
		/**Změna (dlě číselníku wflczme)*/
		zmena?: number|null;
		/**Jemnější upřesnění změny*/
		zmena_ext?: number|null;
		/**DBCOLUMN:wflhpis.zmena_txt*/
		zmena_txt?: string|null;
		/**Kategorie změny (číselník wflczkt)*/
		zmena_ktg?: number|null;
		/**DBCOLUMN:wflhpis.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:wflhpis.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflhpis.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflhpis.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:wflhpis.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:wflhpis.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:wflhpis.ixx*/
		ixx?: string|null;
		nazev_rf?: string|null;
		kod_zmena_txt?: string|null;
	}
	const enum GWflhpisPapDtoNames { ixp = "ixp", por_cislo = "por_cislo", zmena = "zmena", zmena_ext = "zmena_ext", zmena_txt = "zmena_txt", zmena_ktg = "zmena_ktg", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", z_int = "z_int", ixs_lpc = "ixs_lpc", ixx = "ixx", nazev_rf = "nazev_rf", kod_zmena_txt = "kod_zmena_txt",}
	const enum GWflhpisPapDtoFragments { ixp = "*", por_cislo = "*", zmena = "*", zmena_ext = "*", zmena_txt = "*", zmena_ktg = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", typ_ag = "*", z_int = "*", ixs_lpc = "*", ixx = "*", nazev_rf = "*", kod_zmena_txt = "*",}
	const enum GWflhpisPapDtoTypes { ixp = "string", por_cislo = "number", zmena = "number", zmena_ext = "number", zmena_txt = "string", zmena_ktg = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", z_int = "number", ixs_lpc = "string", ixx = "string", nazev_rf = "string", kod_zmena_txt = "string",}
	const enum GWflhpisPapDtoTypeLengths { ixp = 12, zmena_txt = 160, poznamka = 254, zmenu_prov = 12, ixs_lpc = 12, ixx = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxaaat.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxaaatDto {
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uek?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uel?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uem?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uen?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te5?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te6?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te7?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te8?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_sml*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.cis_pol_pla*/
		cis_pol_pla?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.stav*/
		stav?: string|null;
		/**DBCOLUMN:Seznam.stav_txt*/
		stav_txt?: string|null;
		/**count*/
		count?: number|null;
		/**count*/
		priz_relcas_c?: number|null;
		/**vz_cislo_etrz*/
		vz_cislo_etrz?: string|null;
		/**vz_cislo_inen*/
		vz_cislo_inen?: string|null;
		/**vz_cislo_prof*/
		vz_cislo_prof?: string|null;
		/**vz_cislo_vevz*/
		vz_cislo_vevz?: string|null;
		/**priz_zve_vevz*/
		priz_zve_vevz?: number|null;
		/**priz_zve_prof*/
		priz_zve_prof?: number|null;
		/**priz_zve_etrz*/
		priz_zve_etrz?: number|null;
		/**priz_zve_inen*/
		priz_zve_inen?: number|null;
		/**DBCOLUMN:Seznam.vlastnik*/
		vlastnik?: boolean|null;
		/**rezim_pri*/
		rezim_pri?: number|null;
	}
	const enum GXxxaaatDtoNames { nks = "nks", ico = "ico", ucs = "ucs", rok = "rok", xuete = "xuete", drd = "drd", ixs_pri = "ixs_pri", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c = "c", c_sml = "c_sml", c_fak = "c_fak", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cis_pol_pla = "cis_pol_pla", nazev_rf = "nazev_rf", nazev = "nazev", ac = "ac", ac_ag = "ac_ag", stav = "stav", stav_txt = "stav_txt", count = "count", priz_relcas_c = "priz_relcas_c", vz_cislo_etrz = "vz_cislo_etrz", vz_cislo_inen = "vz_cislo_inen", vz_cislo_prof = "vz_cislo_prof", vz_cislo_vevz = "vz_cislo_vevz", priz_zve_vevz = "priz_zve_vevz", priz_zve_prof = "priz_zve_prof", priz_zve_etrz = "priz_zve_etrz", priz_zve_inen = "priz_zve_inen", vlastnik = "vlastnik", rezim_pri = "rezim_pri",}
	const enum GXxxaaatDtoFragments { nks = "*", ico = "*", ucs = "*", rok = "*", xuete = "*", drd = "*", ixs_pri = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", c = "*", c_sml = "*", c_fak = "*", dat_zmena = "*", zmenu_prov = "*", cis_pol_pla = "*", nazev_rf = "*", nazev = "*", ac = "*", ac_ag = "*", stav = "*", stav_txt = "*", count = "*", priz_relcas_c = "*", vz_cislo_etrz = "*", vz_cislo_inen = "*", vz_cislo_prof = "*", vz_cislo_vevz = "*", priz_zve_vevz = "*", priz_zve_prof = "*", priz_zve_etrz = "*", priz_zve_inen = "*", vlastnik = "*", rezim_pri = "*",}
	const enum GXxxaaatDtoTypes { nks = "string", ico = "string", ucs = "string", rok = "number", xuete = "string", drd = "number", ixs_pri = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", c = "JsonDecimal", c_sml = "JsonDecimal", c_fak = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", cis_pol_pla = "string", nazev_rf = "string", nazev = "string", ac = "string", ac_ag = "string", stav = "string", stav_txt = "string", count = "number", priz_relcas_c = "number", vz_cislo_etrz = "string", vz_cislo_inen = "string", vz_cislo_prof = "string", vz_cislo_vevz = "string", priz_zve_vevz = "number", priz_zve_prof = "number", priz_zve_etrz = "number", priz_zve_inen = "number", vlastnik = "boolean", rezim_pri = "number",}
	const enum GXxxaaatDtoTypeLengths { nks = 12, ico = 10, ucs = 10, xuete = 148, ixs_pri = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, zmenu_prov = 12, cis_pol_pla = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxakfi.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Struktura pro požadavky*/
	interface GXxxakfiDto {
		/**DBCOLUMN:Seznam.rok_srv*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.nks	DBCOLUMN:rozdxma.uej*/
		uek?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uel?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uem?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uen?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te5?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te6?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te7?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te8?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te9?: string|null;
		nks?: string|null;
		/**DBCOLUMN:Seznam.c0*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c_uct?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c_roz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c_roz_dis?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c_roz_kon?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**změnu provedl - jméno*/
		nazev_rf_zm?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		kon_txt?: string|null;
		cis_radek?: number|null;
	}
	const enum GXxxakfiDtoNames { rok = "rok", ixs_pri = "ixs_pri", por_cis = "por_cis", ico = "ico", ucs = "ucs", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", nks = "nks", c = "c", c_sml = "c_sml", c_fak = "c_fak", c_uct = "c_uct", c_roz = "c_roz", c_roz_dis = "c_roz_dis", c_roz_kon = "c_roz_kon", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf_zm = "nazev_rf_zm", ixp = "ixp", kon_txt = "kon_txt", cis_radek = "cis_radek",}
	const enum GXxxakfiDtoFragments { rok = "*", ixs_pri = "*", por_cis = "*", ico = "*", ucs = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", nks = "*", c = "*", c_sml = "*", c_fak = "*", c_uct = "*", c_roz = "*", c_roz_dis = "*", c_roz_kon = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf_zm = "*", ixp = "*", kon_txt = "*", cis_radek = "*",}
	const enum GXxxakfiDtoTypes { rok = "number", ixs_pri = "string", por_cis = "number", ico = "string", ucs = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", nks = "string", c = "JsonDecimal", c_sml = "JsonDecimal", c_fak = "JsonDecimal", c_uct = "JsonDecimal", c_roz = "JsonDecimal", c_roz_dis = "JsonDecimal", c_roz_kon = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf_zm = "string", ixp = "string", kon_txt = "string", cis_radek = "number",}
	const enum GXxxakfiDtoTypeLengths { ixs_pri = 12, ico = 10, ucs = 10, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, nks = 12, zmenu_prov = 12, ixp = 12, kon_txt = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxarok.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxarokDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.c_predp*/
		c_predp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_sml*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.c_par*/
		c_par?: JsonDecimal|null;
	}
	const enum GXxxarokDtoNames { ixs_pri = "ixs_pri", rok = "rok", c_predp = "c_predp", c_sml = "c_sml", c_fak = "c_fak", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_par = "c_par",}
	const enum GXxxarokDtoFragments { ixs_pri = "*", rok = "*", c_predp = "*", c_sml = "*", c_fak = "*", dat_zmena = "*", zmenu_prov = "*", c_par = "*",}
	const enum GXxxarokDtoTypes { ixs_pri = "string", rok = "number", c_predp = "JsonDecimal", c_sml = "JsonDecimal", c_fak = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", c_par = "JsonDecimal",}
	const enum GXxxarokDtoTypeLengths { ixs_pri = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxsesu.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxsesuDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.s_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:Seznam.s_ess_txt*/
		s_ess_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_vyz*/
		dat_vyz?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_pre_nab*/
		dat_pre_nab?: JsonDate|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**DBCOLUMN:Seznam.dat_vys*/
		dat_vys?: JsonDate|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.pr_forma*/
		pr_forma?: string|null;
		/**DBCOLUMN:Seznam.pr_forma_txt*/
		pr_forma_txt?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_kont*/
		ixs_esu_kont?: string|null;
		/**DBCOLUMN:Seznam.naz_prj*/
		naz_prj?: string|null;
		/**DBCOLUMN:Seznam.c_poz*/
		c_poz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vyd*/
		c_vyd?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_predp*/
		c_predp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_real*/
		c_real?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:Seznam.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:Seznam.priz_gen_sml*/
		priz_gen_sml?: number|null;
		/**DBCOLUMN:Seznam.vs_s*/
		vs_s?: string|null;
		/**DBCOLUMN:Seznam.proc_max_spol*/
		proc_max_spol?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_dmi*/
		c_dmi?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.zamer_prj*/
		zamer_prj?: string|null;
		/**DBCOLUMN:Seznam.c_nakl*/
		c_nakl?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_prj_v*/
		c_prj_v?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_prj_o*/
		c_prj_o?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_usk_p*/
		dat_usk_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_usk_s*/
		dat_usk_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.mesic_prj_pp*/
		mesic_prj_pp?: number|null;
		/**DBCOLUMN:Seznam.rok_prj_pp*/
		rok_prj_pp?: number|null;
		/**DBCOLUMN:Seznam.mesic_prj_zv*/
		mesic_prj_zv?: number|null;
		/**DBCOLUMN:Seznam.rok_prj_zv*/
		rok_prj_zv?: number|null;
		/**DBCOLUMN:Seznam.dat_pzz*/
		dat_pzz?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_dor_z*/
		dat_dor_z?: JsonDate|null;
		/**DBCOLUMN:Seznam.dor_z_pt*/
		dor_z_pt?: number|null;
		/**DBCOLUMN:Seznam.kompl_z*/
		kompl_z?: number|null;
		/**DBCOLUMN:Seznam.ecis_prj*/
		ecis_prj?: string|null;
		/**DBCOLUMN:Seznam.dat_uci_un*/
		dat_uci_un?: JsonDate|null;
		/**DBCOLUMN:Seznam.bhod_prj*/
		bhod_prj?: number|null;
		/**DBCOLUMN:Seznam.dat_sml1_o*/
		dat_sml1_o?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml1_v*/
		dat_sml1_v?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml2_o*/
		dat_sml2_o?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml2_v*/
		dat_sml2_v?: JsonDate|null;
		/**DBCOLUMN:Seznam.c_vratk*/
		c_vratk?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_pokut*/
		c_pokut?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_penal*/
		c_penal?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.por_rk*/
		por_rk?: number|null;
		/**DBCOLUMN:Seznam.cislo_usn*/
		cislo_usn?: string|null;
		/**DBCOLUMN:Seznam.c_nedoc*/
		c_nedoc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.nes_podg*/
		nes_podg?: number|null;
		/**DBCOLUMN:Seznam.projednal*/
		projednal?: string|null;
		/**DBCOLUMN:Seznam.dat_jedn_pl*/
		dat_jedn_pl?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_jedn*/
		dat_jedn?: JsonDate|null;
		/**DBCOLUMN:Seznam.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:Seznam.spu_rs_1*/
		spu_rs_1?: string|null;
		/**DBCOLUMN:Seznam.spu_rs_2*/
		spu_rs_2?: string|null;
		/**DBCOLUMN:Seznam.int_cis_zad*/
		int_cis_zad?: string|null;
		/**DBCOLUMN:Seznam.schvalil*/
		schvalil?: string|null;
		/**DBCOLUMN:Seznam.priz_zud*/
		priz_zud?: number|null;
		/**DBCOLUMN:Seznam.ver_pod*/
		ver_pod?: number|null;
		/**DBCOLUMN:Seznam.priz_ver_pod*/
		priz_ver_pod?: number|null;
		/**DBCOLUMN:Seznam.dat_ver_pod*/
		dat_ver_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.s_spis*/
		s_spis?: number|null;
		/**DBCOLUMN:Seznam.priz_gvyh*/
		priz_gvyh?: number|null;
		/**DBCOLUMN:Seznam.c_vratk_nas*/
		c_vratk_nas?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_vratk*/
		dat_vratk?: JsonDate|null;
		/**DBCOLUMN:Seznam.pro_urc*/
		pro_urc?: number|null;
		/**DBCOLUMN:Seznam.cis_reg_zad*/
		cis_reg_zad?: string|null;
		/**DBCOLUMN:Seznam.dat_reg_zad*/
		dat_reg_zad?: JsonDate|null;
		/**DBCOLUMN:Seznam.poc_det*/
		poc_det?: number|null;
		/**DBCOLUMN:Seznam.poc_mla*/
		poc_mla?: number|null;
		/**DBCOLUMN:Seznam.poc_dos*/
		poc_dos?: number|null;
		/**DBCOLUMN:Seznam.poc_duc*/
		poc_duc?: number|null;
		/**DBCOLUMN:Seznam.dat_vratk_nas*/
		dat_vratk_nas?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:Seznam.dat_pzz_t*/
		dat_pzz_t?: JsonDate|null;
		/**DBCOLUMN:Seznam.kont_prj*/
		kont_prj?: string|null;
		/**DBCOLUMN:Seznam.oduv_prj*/
		oduv_prj?: string|null;
		/**DBCOLUMN:Seznam.s_jis*/
		s_jis?: number|null;
		/**DBCOLUMN:Seznam.dat_jis*/
		dat_jis?: JsonDate|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.prijal*/
		prijal?: string|null;
		/**DBCOLUMN:Seznam.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:Seznam.priznak*/
		priznak?: number|null;
		/**DBCOLUMN:Seznam.rc*/
		rc?: string|null;
		/**DBCOLUMN:Seznam.dic*/
		dic?: string|null;
		/**DBCOLUMN:Seznam.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:Seznam.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:Seznam.kont_osoba*/
		kont_osoba?: string|null;
		/**DBCOLUMN:Seznam.zdu_vyr*/
		zdu_vyr?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		zdrojPopisu?: string|null;
	}
	const enum GXxxsesuDtoNames { ixs_pri = "ixs_pri", cis_por = "cis_por", ixs_esu = "ixs_esu", s_ess = "s_ess", s_ess_txt = "s_ess_txt", dat_vyz = "dat_vyz", dat_pre_nab = "dat_pre_nab", por_cis_nab = "por_cis_nab", dat_vys = "dat_vys", bu_ci = "bu_ci", sk_ci = "sk_ci", pr_forma = "pr_forma", pr_forma_txt = "pr_forma_txt", nazev = "nazev", ac_ag = "ac_ag", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_esu_kont = "ixs_esu_kont", naz_prj = "naz_prj", c_poz = "c_poz", c_vyd = "c_vyd", c_predp = "c_predp", c_real = "c_real", lic_zast = "lic_zast", por_zast = "por_zast", ixp_nab = "ixp_nab", priz_gen_sml = "priz_gen_sml", vs_s = "vs_s", proc_max_spol = "proc_max_spol", c_dmi = "c_dmi", zamer_prj = "zamer_prj", c_nakl = "c_nakl", c_prj_v = "c_prj_v", c_prj_o = "c_prj_o", dat_usk_p = "dat_usk_p", dat_usk_s = "dat_usk_s", mesic_prj_pp = "mesic_prj_pp", rok_prj_pp = "rok_prj_pp", mesic_prj_zv = "mesic_prj_zv", rok_prj_zv = "rok_prj_zv", dat_pzz = "dat_pzz", dat_dor_z = "dat_dor_z", dor_z_pt = "dor_z_pt", kompl_z = "kompl_z", ecis_prj = "ecis_prj", dat_uci_un = "dat_uci_un", bhod_prj = "bhod_prj", dat_sml1_o = "dat_sml1_o", dat_sml1_v = "dat_sml1_v", dat_sml2_o = "dat_sml2_o", dat_sml2_v = "dat_sml2_v", c_vratk = "c_vratk", c_pokut = "c_pokut", c_penal = "c_penal", por_rk = "por_rk", cislo_usn = "cislo_usn", c_nedoc = "c_nedoc", nes_podg = "nes_podg", projednal = "projednal", dat_jedn_pl = "dat_jedn_pl", dat_jedn = "dat_jedn", priz_ext = "priz_ext", spu_rs_1 = "spu_rs_1", spu_rs_2 = "spu_rs_2", int_cis_zad = "int_cis_zad", schvalil = "schvalil", priz_zud = "priz_zud", ver_pod = "ver_pod", priz_ver_pod = "priz_ver_pod", dat_ver_pod = "dat_ver_pod", s_spis = "s_spis", priz_gvyh = "priz_gvyh", c_vratk_nas = "c_vratk_nas", dat_vratk = "dat_vratk", pro_urc = "pro_urc", cis_reg_zad = "cis_reg_zad", dat_reg_zad = "dat_reg_zad", poc_det = "poc_det", poc_mla = "poc_mla", poc_dos = "poc_dos", poc_duc = "poc_duc", dat_vratk_nas = "dat_vratk_nas", typ_phl = "typ_phl", dat_pzz_t = "dat_pzz_t", kont_prj = "kont_prj", oduv_prj = "oduv_prj", s_jis = "s_jis", dat_jis = "dat_jis", ico = "ico", prijal = "prijal", esu_txt = "esu_txt", priznak = "priznak", rc = "rc", dic = "dic", jmeno = "jmeno", prijmeni = "prijmeni", kont_osoba = "kont_osoba", zdu_vyr = "zdu_vyr", ktg_typ = "ktg_typ", zdrojPopisu = "zdrojPopisu",}
	const enum GXxxsesuDtoFragments { ixs_pri = "*", cis_por = "*", ixs_esu = "*", s_ess = "*", s_ess_txt = "*", dat_vyz = "*", dat_pre_nab = "*", por_cis_nab = "*", dat_vys = "*", bu_ci = "*", sk_ci = "*", pr_forma = "*", pr_forma_txt = "*", nazev = "*", ac_ag = "*", dat_zmena = "*", zmenu_prov = "*", ixs_esu_kont = "*", naz_prj = "*", c_poz = "*", c_vyd = "*", c_predp = "*", c_real = "*", lic_zast = "*", por_zast = "*", ixp_nab = "*", priz_gen_sml = "*", vs_s = "*", proc_max_spol = "*", c_dmi = "*", zamer_prj = "*", c_nakl = "*", c_prj_v = "*", c_prj_o = "*", dat_usk_p = "*", dat_usk_s = "*", mesic_prj_pp = "*", rok_prj_pp = "*", mesic_prj_zv = "*", rok_prj_zv = "*", dat_pzz = "*", dat_dor_z = "*", dor_z_pt = "*", kompl_z = "*", ecis_prj = "*", dat_uci_un = "*", bhod_prj = "*", dat_sml1_o = "*", dat_sml1_v = "*", dat_sml2_o = "*", dat_sml2_v = "*", c_vratk = "*", c_pokut = "*", c_penal = "*", por_rk = "*", cislo_usn = "*", c_nedoc = "*", nes_podg = "*", projednal = "*", dat_jedn_pl = "*", dat_jedn = "*", priz_ext = "*", spu_rs_1 = "*", spu_rs_2 = "*", int_cis_zad = "*", schvalil = "*", priz_zud = "*", ver_pod = "*", priz_ver_pod = "*", dat_ver_pod = "*", s_spis = "*", priz_gvyh = "*", c_vratk_nas = "*", dat_vratk = "*", pro_urc = "*", cis_reg_zad = "*", dat_reg_zad = "*", poc_det = "*", poc_mla = "*", poc_dos = "*", poc_duc = "*", dat_vratk_nas = "*", typ_phl = "*", dat_pzz_t = "*", kont_prj = "*", oduv_prj = "*", s_jis = "*", dat_jis = "*", ico = "*", prijal = "*", esu_txt = "*", priznak = "*", rc = "*", dic = "*", jmeno = "*", prijmeni = "*", kont_osoba = "*", zdu_vyr = "*", ktg_typ = "*", zdrojPopisu = "*",}
	const enum GXxxsesuDtoTypes { ixs_pri = "string", cis_por = "number", ixs_esu = "string", s_ess = "number", s_ess_txt = "string", dat_vyz = "JsonDate", dat_pre_nab = "JsonDate", por_cis_nab = "number", dat_vys = "JsonDate", bu_ci = "string", sk_ci = "string", pr_forma = "string", pr_forma_txt = "string", nazev = "string", ac_ag = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_esu_kont = "string", naz_prj = "string", c_poz = "JsonDecimal", c_vyd = "JsonDecimal", c_predp = "JsonDecimal", c_real = "JsonDecimal", lic_zast = "string", por_zast = "number", ixp_nab = "string", priz_gen_sml = "number", vs_s = "string", proc_max_spol = "JsonDecimal", c_dmi = "JsonDecimal", zamer_prj = "string", c_nakl = "JsonDecimal", c_prj_v = "JsonDecimal", c_prj_o = "JsonDecimal", dat_usk_p = "JsonDate", dat_usk_s = "JsonDate", mesic_prj_pp = "number", rok_prj_pp = "number", mesic_prj_zv = "number", rok_prj_zv = "number", dat_pzz = "JsonDate", dat_dor_z = "JsonDate", dor_z_pt = "number", kompl_z = "number", ecis_prj = "string", dat_uci_un = "JsonDate", bhod_prj = "number", dat_sml1_o = "JsonDate", dat_sml1_v = "JsonDate", dat_sml2_o = "JsonDate", dat_sml2_v = "JsonDate", c_vratk = "JsonDecimal", c_pokut = "JsonDecimal", c_penal = "JsonDecimal", por_rk = "number", cislo_usn = "string", c_nedoc = "JsonDecimal", nes_podg = "number", projednal = "string", dat_jedn_pl = "JsonDate", dat_jedn = "JsonDate", priz_ext = "number", spu_rs_1 = "string", spu_rs_2 = "string", int_cis_zad = "string", schvalil = "string", priz_zud = "number", ver_pod = "number", priz_ver_pod = "number", dat_ver_pod = "JsonDate", s_spis = "number", priz_gvyh = "number", c_vratk_nas = "JsonDecimal", dat_vratk = "JsonDate", pro_urc = "number", cis_reg_zad = "string", dat_reg_zad = "JsonDate", poc_det = "number", poc_mla = "number", poc_dos = "number", poc_duc = "number", dat_vratk_nas = "JsonDate", typ_phl = "string", dat_pzz_t = "JsonDate", kont_prj = "string", oduv_prj = "string", s_jis = "number", dat_jis = "JsonDate", ico = "string", prijal = "string", esu_txt = "string", priznak = "number", rc = "string", dic = "string", jmeno = "string", prijmeni = "string", kont_osoba = "string", zdu_vyr = "string", ktg_typ = "number", zdrojPopisu = "string",}
	const enum GXxxsesuDtoTypeLengths { ixs_pri = 12, ixs_esu = 12, s_ess_txt = 50, bu_ci = 34, sk_ci = 11, pr_forma = 3, pr_forma_txt = 50, ac_ag = 20, zmenu_prov = 12, ixs_esu_kont = 12, naz_prj = 254, lic_zast = 4, ixp_nab = 12, vs_s = 12, zamer_prj = 254, ecis_prj = 50, cislo_usn = 50, projednal = 50, spu_rs_1 = 20, spu_rs_2 = 30, int_cis_zad = 40, schvalil = 100, cis_reg_zad = 30, typ_phl = 4, kont_prj = 254, oduv_prj = 254, ico = 14, prijal = 30, esu_txt = 254, rc = 10, dic = 15, jmeno = 24, prijmeni = 36, kont_osoba = 64, zdu_vyr = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxsesuHr.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam esu hromadně*/
	interface GXxxsesuHrDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu_txt*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:Seznam.s_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:Seznam.s_ess_txt*/
		s_ess_txt?: string|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
		/**navrhované*/
		c_predp?: JsonDecimal|null;
		/**navrhované*/
		dat_pre_nab?: JsonDate|null;
		/**DBCOLUMN:Seznam.s_ess_txt*/
		ixp_nab?: string|null;
	}
	const enum GXxxsesuHrDtoNames { ixs_pri = "ixs_pri", cis_por = "cis_por", ixs_esu = "ixs_esu", ixs_esu_txt = "ixs_esu_txt", s_ess = "s_ess", s_ess_txt = "s_ess_txt", por_cis_nab = "por_cis_nab", c_predp = "c_predp", dat_pre_nab = "dat_pre_nab", ixp_nab = "ixp_nab",}
	const enum GXxxsesuHrDtoFragments { ixs_pri = "*", cis_por = "*", ixs_esu = "*", ixs_esu_txt = "*", s_ess = "*", s_ess_txt = "*", por_cis_nab = "*", c_predp = "*", dat_pre_nab = "*", ixp_nab = "*",}
	const enum GXxxsesuHrDtoTypes { ixs_pri = "string", cis_por = "number", ixs_esu = "string", ixs_esu_txt = "string", s_ess = "number", s_ess_txt = "string", por_cis_nab = "number", c_predp = "JsonDecimal", dat_pre_nab = "JsonDate", ixp_nab = "string",}
	const enum GXxxsesuHrDtoTypeLengths { ixs_pri = 12, ixs_esu = 12, s_ess_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxspidPom.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxspidPomDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:Seznam.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:Seznam.vs*/
		vs?: string|null;
		/**DBCOLUMN:Seznam.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:Seznam.por_cis_nab*/
		por_cis_nab?: number|null;
	}
	const enum GXxxspidPomDtoNames { ixs_pri = "ixs_pri", ixs_esu = "ixs_esu", cis_real = "cis_real", bu_ci = "bu_ci", sk_ci = "sk_ci", ac_ag = "ac_ag", soutez = "soutez", vs = "vs", typ_phl = "typ_phl", por_cis_nab = "por_cis_nab",}
	const enum GXxxspidPomDtoFragments { ixs_pri = "*", ixs_esu = "*", cis_real = "*", bu_ci = "*", sk_ci = "*", ac_ag = "*", soutez = "*", vs = "*", typ_phl = "*", por_cis_nab = "*",}
	const enum GXxxspidPomDtoTypes { ixs_pri = "string", ixs_esu = "string", cis_real = "string", bu_ci = "string", sk_ci = "string", ac_ag = "string", soutez = "string", vs = "string", typ_phl = "string", por_cis_nab = "number",}
	const enum GXxxspidPomDtoTypeLengths { ixs_pri = 12, ixs_esu = 12, cis_real = 12, bu_ci = 34, sk_ci = 11, ac_ag = 20, vs = 12, typ_phl = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxspol.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxspolDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uek?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uel?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uem?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		uen?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te5?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te6?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te7?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te8?: string|null;
		/**DBCOLUMN:rozdxma.uej*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.pra_zad*/
		pra_zad?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		nazev_rf_zm?: string|null;
		/**DBCOLUMN:Seznam.up_stav*/
		up_stav?: number|null;
		/**DBCOLUMN:Seznam.up_stav*/
		up_stav_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu_txt?: string|null;
		/**DBCOLUMN:Seznam.por_cislo_nab*/
		por_cislo_nab?: number|null;
		/**DBCOLUMN:Seznam.ixp_nab*/
		ixp_nab?: string|null;
		/**DBCOLUMN:Seznam.cis_pol_pla*/
		cis_pol_pla?: string|null;
		/**DBCOLUMN:Seznam.uea_uc*/
		uea_uc?: string|null;
		/**DBCOLUMN:Seznam.ueb_uc*/
		ueb_uc?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl_txt?: string|null;
		/**DBCOLUMN:Seznam.ixp_ext*/
		ixp_ext?: string|null;
		/**DBCOLUMN:Seznam.c_poz*/
		c_poz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vaz*/
		c_vaz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_fak*/
		c_fak?: JsonDecimal|null;
	}
	const enum GXxxspolDtoNames { ixs_pri = "ixs_pri", por_cis = "por_cis", ico = "ico", ucs = "ucs", rok = "rok", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", nks = "nks", c = "c", popis = "popis", pra_zad = "pra_zad", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf_zm = "nazev_rf_zm", up_stav = "up_stav", up_stav_txt = "up_stav_txt", ixs_esu = "ixs_esu", ixs_esu_txt = "ixs_esu_txt", por_cislo_nab = "por_cislo_nab", ixp_nab = "ixp_nab", cis_pol_pla = "cis_pol_pla", uea_uc = "uea_uc", ueb_uc = "ueb_uc", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_vl_txt = "bu_vl_txt", ixp_ext = "ixp_ext", c_poz = "c_poz", c_vaz = "c_vaz", c_fak = "c_fak",}
	const enum GXxxspolDtoFragments { ixs_pri = "*", por_cis = "*", ico = "*", ucs = "*", rok = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", nks = "*", c = "*", popis = "*", pra_zad = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf_zm = "*", up_stav = "*", up_stav_txt = "*", ixs_esu = "*", ixs_esu_txt = "*", por_cislo_nab = "*", ixp_nab = "*", cis_pol_pla = "*", uea_uc = "*", ueb_uc = "*", sk_vl = "*", bu_vl = "*", bu_vl_txt = "*", ixp_ext = "*", c_poz = "*", c_vaz = "*", c_fak = "*",}
	const enum GXxxspolDtoTypes { ixs_pri = "string", por_cis = "number", ico = "string", ucs = "string", rok = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", nks = "string", c = "JsonDecimal", popis = "string", pra_zad = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf_zm = "string", up_stav = "number", up_stav_txt = "string", ixs_esu = "string", ixs_esu_txt = "string", por_cislo_nab = "number", ixp_nab = "string", cis_pol_pla = "string", uea_uc = "string", ueb_uc = "string", sk_vl = "string", bu_vl = "string", bu_vl_txt = "string", ixp_ext = "string", c_poz = "JsonDecimal", c_vaz = "JsonDecimal", c_fak = "JsonDecimal",}
	const enum GXxxspolDtoTypeLengths { ixs_pri = 12, ico = 10, ucs = 10, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, nks = 12, popis = 50, pra_zad = 30, zmenu_prov = 12, ixs_esu = 12, ixp_nab = 12, cis_pol_pla = 16, uea_uc = 3, ueb_uc = 4, sk_vl = 11, bu_vl = 34, ixp_ext = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxspri.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxspriDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.s_vz*/
		s_vz?: number|null;
		/**DBCOLUMN:Seznam.vys_riz*/
		vys_riz?: number|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.ev_cis*/
		ev_cis?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.s_dgr*/
		s_dgr?: number|null;
		/**DBCOLUMN:Seznam.s_dgr_txt*/
		s_dgr_txt?: string|null;
		/**DBCOLUMN:Seznam.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:Seznam.s_sdg*/
		s_sdg?: number|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zdg*/
		dat_zdg?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_sml_s*/
		dat_sml_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_real_s*/
		dat_real_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:Seznam.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:Seznam.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:Seznam.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:Seznam.stan_pig*/
		stan_pig?: number|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.cj_dgr*/
		cj_dgr?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:Seznam.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Seznam.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:Seznam.cis_prg*/
		cis_prg?: string|null;
		/**DBCOLUMN:Seznam.dat_p_lhu*/
		dat_p_lhu?: JsonDate|null;
		/**DBCOLUMN:Seznam.zpus_pd*/
		zpus_pd?: number|null;
		/**DBCOLUMN:Seznam.proc_max_spol*/
		proc_max_spol?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.priz_isprofin*/
		priz_isprofin?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.typ_dgr*/
		typ_dgr?: string|null;
		/**DBCOLUMN:Seznam.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:Seznam.zps_fin*/
		zps_fin?: number|null;
		/**DBCOLUMN:Seznam.cis_ucl*/
		cis_ucl?: string|null;
		/**DBCOLUMN:Seznam.dat_sch*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:Seznam.cislo_usn_dt*/
		cislo_usn_dt?: string|null;
		/**DBCOLUMN:Seznam.druh_dtp*/
		druh_dtp?: number|null;
		/**DBCOLUMN:Seznam.ixs_pri_dtp*/
		ixs_pri_dtp?: string|null;
		/**DBCOLUMN:Seznam.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:Seznam.oblast_dt*/
		oblast_dt?: string|null;
		/**DBCOLUMN:Seznam.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:Seznam.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:Seznam.soutez_txt*/
		soutez_txt?: string|null;
		priz_rs_nad?: number|null;
		priz_rs_dil?: number|null;
		priz_relcas_m?: number|null;
		priz_relcas_c?: number|null;
		priz_bfin?: number|null;
		lim_zac?: number|null;
	}
	const enum GXxxspriDtoNames { ixs_pri = "ixs_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", rok = "rok", s_vz = "s_vz", vys_riz = "vys_riz", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac = "ac", ev_cis = "ev_cis", nazev = "nazev", s_dgr = "s_dgr", s_dgr_txt = "s_dgr_txt", cis_por = "cis_por", s_sdg = "s_sdg", c = "c", dat_pri = "dat_pri", dat_zdg = "dat_zdg", dat_zad_p = "dat_zad_p", dat_sml_s = "dat_sml_s", dat_real_s = "dat_real_s", dat_zad_s = "dat_zad_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", stan_pig = "stan_pig", ixp = "ixp", cj_dgr = "cj_dgr", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixp_den = "ixp_den", ac_ag = "ac_ag", priz_view = "priz_view", typ_fin = "typ_fin", cis_prg = "cis_prg", dat_p_lhu = "dat_p_lhu", zpus_pd = "zpus_pd", proc_max_spol = "proc_max_spol", priz_isprofin = "priz_isprofin", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dgr = "typ_dgr", rezim_pri = "rezim_pri", zps_fin = "zps_fin", cis_ucl = "cis_ucl", dat_sch = "dat_sch", cislo_usn_dt = "cislo_usn_dt", druh_dtp = "druh_dtp", ixs_pri_dtp = "ixs_pri_dtp", priz_ext = "priz_ext", oblast_dt = "oblast_dt", typ_phl = "typ_phl", soutez = "soutez", soutez_txt = "soutez_txt", priz_rs_nad = "priz_rs_nad", priz_rs_dil = "priz_rs_dil", priz_relcas_m = "priz_relcas_m", priz_relcas_c = "priz_relcas_c", priz_bfin = "priz_bfin", lim_zac = "lim_zac",}
	const enum GXxxspriDtoFragments { ixs_pri = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", rok = "*", s_vz = "*", vys_riz = "*", cis_real = "*", ixs_fun_komp = "*", ac = "*", ev_cis = "*", nazev = "*", s_dgr = "*", s_dgr_txt = "*", cis_por = "*", s_sdg = "*", c = "*", dat_pri = "*", dat_zdg = "*", dat_zad_p = "*", dat_sml_s = "*", dat_real_s = "*", dat_zad_s = "*", dat_uza_p = "*", dat_uza_s = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", stan_pig = "*", ixp = "*", cj_dgr = "*", poznamka = "*", c_plan = "*", c_sch = "*", c_ps = "*", fin_od = "*", fin_do = "*", ixp_den = "*", ac_ag = "*", priz_view = "*", typ_fin = "*", cis_prg = "*", dat_p_lhu = "*", zpus_pd = "*", proc_max_spol = "*", priz_isprofin = "*", dat_zmena = "*", zmenu_prov = "*", typ_dgr = "*", rezim_pri = "*", zps_fin = "*", cis_ucl = "*", dat_sch = "*", cislo_usn_dt = "*", druh_dtp = "*", ixs_pri_dtp = "*", priz_ext = "*", oblast_dt = "*", typ_phl = "*", soutez = "*", soutez_txt = "*", priz_rs_nad = "*", priz_rs_dil = "*", priz_relcas_m = "*", priz_relcas_c = "*", priz_bfin = "*", lim_zac = "*",}
	const enum GXxxspriDtoTypes { ixs_pri = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", rok = "number", s_vz = "number", vys_riz = "number", cis_real = "string", ixs_fun_komp = "string", ac = "string", ev_cis = "string", nazev = "string", s_dgr = "number", s_dgr_txt = "string", cis_por = "number", s_sdg = "number", c = "JsonDecimal", dat_pri = "JsonDate", dat_zdg = "JsonDate", dat_zad_p = "JsonDate", dat_sml_s = "JsonDate", dat_real_s = "JsonDate", dat_zad_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", cis_duz = "number", cis_ner = "number", pri_pri = "number", stan_pig = "number", ixp = "string", cj_dgr = "string", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixp_den = "string", ac_ag = "string", priz_view = "number", typ_fin = "number", cis_prg = "string", dat_p_lhu = "JsonDate", zpus_pd = "number", proc_max_spol = "JsonDecimal", priz_isprofin = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dgr = "string", rezim_pri = "number", zps_fin = "number", cis_ucl = "string", dat_sch = "JsonDate", cislo_usn_dt = "string", druh_dtp = "number", ixs_pri_dtp = "string", priz_ext = "number", oblast_dt = "string", typ_phl = "string", soutez = "string", soutez_txt = "string", priz_rs_nad = "number", priz_rs_dil = "number", priz_relcas_m = "number", priz_relcas_c = "number", priz_bfin = "number", lim_zac = "number",}
	const enum GXxxspriDtoTypeLengths { ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac = 20, ev_cis = 30, nazev = 100, s_dgr_txt = 50, ixp = 12, cj_dgr = 30, poznamka = 254, ixp_den = 12, ac_ag = 20, cis_prg = 20, zmenu_prov = 12, typ_dgr = 10, cis_ucl = 8, cislo_usn_dt = 50, ixs_pri_dtp = 12, oblast_dt = 10, typ_phl = 4, soutez = 30, soutez_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxvpop.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxvpopDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.nazev_bld*/
		nazev_bld?: string|null;
		/**DBCOLUMN:Seznam.obsah_bld*/
		obsah_bld?: string|null;
		/**DBCOLUMN:Seznam.autor_bld*/
		autor_bld?: string|null;
		/**DBCOLUMN:Seznam.dat_bld*/
		dat_bld?: JsonDate|null;
		/**DBCOLUMN:Seznam.poznamka_bld*/
		poznamka_bld?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
	}
	const enum GXxxvpopDtoNames { ixp = "ixp", por_cislo = "por_cislo", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_bld = "nazev_bld", obsah_bld = "obsah_bld", autor_bld = "autor_bld", dat_bld = "dat_bld", poznamka_bld = "poznamka_bld", nazev_rf = "nazev_rf",}
	const enum GXxxvpopDtoFragments { ixp = "*", por_cislo = "*", popis = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev_bld = "*", obsah_bld = "*", autor_bld = "*", dat_bld = "*", poznamka_bld = "*", nazev_rf = "*",}
	const enum GXxxvpopDtoTypes { ixp = "string", por_cislo = "number", popis = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_bld = "string", obsah_bld = "string", autor_bld = "string", dat_bld = "JsonDate", poznamka_bld = "string", nazev_rf = "string",}
	const enum GXxxvpopDtoTypeLengths { ixp = 12, popis = 254, zmenu_prov = 12, nazev_bld = 254, obsah_bld = 254, autor_bld = 254, poznamka_bld = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxvpopTrans.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxvpopTransDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
	}
	const enum GXxxvpopTransDtoNames { ixp = "ixp", popis = "popis",}
	const enum GXxxvpopTransDtoFragments { ixp = "*", popis = "*",}
	const enum GXxxvpopTransDtoTypes { ixp = "string", popis = "string",}
	const enum GXxxvpopTransDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.Interface.GXxxvprc.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxvprcDto {
		/**DBCOLUMN:Seznam.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:Seznam.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp*/
		ixs_zmp?: string|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**hlas*/
		hlas?: string|null;
	}
	const enum GXxxvprcDtoNames { ixs_pri = "ixs_pri", ixs_cia = "ixs_cia", rok = "rok", cislo = "cislo", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", nazev = "nazev", ixs_zmp = "ixs_zmp", nazev_rf = "nazev_rf", hlas = "hlas",}
	const enum GXxxvprcDtoFragments { ixs_pri = "*", ixs_cia = "*", rok = "*", cislo = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*", nazev = "*", ixs_zmp = "*", nazev_rf = "*", hlas = "*",}
	const enum GXxxvprcDtoTypes { ixs_pri = "string", ixs_cia = "string", rok = "number", cislo = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", nazev = "string", ixs_zmp = "string", nazev_rf = "string", hlas = "string",}
	const enum GXxxvprcDtoTypeLengths { ixs_pri = 12, ixs_cia = 12, cislo = 16, zmenu_prov = 12, ico = 10, nazev = 254, ixs_zmp = 12, nazev_rf = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Gordic.Pap.InterfaceGVfpsobl.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:vfsobl*/
	interface GVfpsoblDto {
		/**oblast_dt*/
		oblast_dt?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**poznamka*/
		poznamka?: string|null;
		/**evzskpu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
		/**hlas*/
		hlas?: string|null;
	}
	const enum GVfpsoblDtoNames { oblast_dt = "oblast_dt", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", hlas = "hlas",}
	const enum GVfpsoblDtoFragments { oblast_dt = "*", zkratka = "*", nazev = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", hlas = "*",}
	const enum GVfpsoblDtoTypes { oblast_dt = "string", zkratka = "string", nazev = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", hlas = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Const\Gordic.Pap.Interface.GPapAddUpdFinConstDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Konstanty pro TS novou/opravu položku/y*/
	interface GPapAddUpdFinConstDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**rok*/
		rok?: number|null;
		/**rozpočtový záznam, je-li jediný*/
		zaznam?: Gordic.Pap.Interface.GRozpocetDto|null;
	}
	const enum GPapAddUpdFinConstDtoNames { ico = "ico", ucs = "ucs", rok = "rok", zaznam = "zaznam",}
	const enum GPapAddUpdFinConstDtoFragments { ico = "*", ucs = "*", rok = "*", zaznam = "*",}
	const enum GPapAddUpdFinConstDtoTypes { ico = "string", ucs = "string", rok = "number", zaznam = "Gordic.Pap.Interface.GRozpocetDto",}
	const enum GPapAddUpdFinConstDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Const\Gordic.Pap.Interface.GPapFinancovaniConstDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Konstanty pro TS financování*/
	interface GPapFinancovaniConstDto {
		/**is_pri*/
		isPri?: boolean|null;
		/**xxxspid*/
		xxxspid?: string|null;
		/**prixxxspid*/
		prixxxspid?: string|null;
		/**xxxspid_ESU*/
		xxxspidEsu?: string|null;
		/**xxxspidPorNab*/
		xxxspidPorNab?: number|null;
		/**xxxspidPorNab*/
		obsluzPrizGenSml?: string|null;
		/**jeToDiblik*/
		jeToDiblik?: boolean|null;
		/**maxCastkaPripad*/
		maxCastkaPripad?: JsonDecimal|null;
		/**parametry financování*/
		ftcpRoro?: Gordic.Pap.Interface.GPapFinancovaniFinDto|null;
		/**parametry měnící se při změně*/
		changeFin?: Gordic.Pap.Interface.GPapChangeFinDto|null;
		/**prizGenSml*/
		prizGenSml?: number|null;
		/**sleEsuPol*/
		sleEsuPol?: Gordic.Pap.Interface.GPapSleEsuPolDto|null;
		/**parametr xxx_rad_finnew*/
		param_rad_finnew?: string|null;
		/**parametr param_rad_finval*/
		param_rad_finval?: string|null;
		/**parametr param_rad_finsto*/
		param_rad_finsto?: string|null;
		/**parametr param_rad_finedt*/
		param_rad_finedt?: string|null;
		/**parametr param_rad_zpufin*/
		param_rad_zpufin?: string|null;
		/**rezimKnihy*/
		rezimKnihy?: number|null;
		/**dle stav roku - provádění aktivních operací*/
		rokAktOperace?: boolean|null;
		/**ekoparams.rok*/
		rok?: number|null;
		/**newPriz*/
		newPriz?: boolean|null;
		/**titulek*/
		titulek?: string|null;
		/**titulek stav*/
		titulekStav?: string|null;
		/**titulekFinancovani*/
		titulekFinancovani?: string|null;
		/**hlasimParam*/
		hlasimParam?: boolean|null;
		mode_gen_drd?: number|null;
	}
	const enum GPapFinancovaniConstDtoNames { isPri = "isPri", xxxspid = "xxxspid", prixxxspid = "prixxxspid", xxxspidEsu = "xxxspidEsu", xxxspidPorNab = "xxxspidPorNab", obsluzPrizGenSml = "obsluzPrizGenSml", jeToDiblik = "jeToDiblik", maxCastkaPripad = "maxCastkaPripad", ftcpRoro = "ftcpRoro", changeFin = "changeFin", prizGenSml = "prizGenSml", sleEsuPol = "sleEsuPol", param_rad_finnew = "param_rad_finnew", param_rad_finval = "param_rad_finval", param_rad_finsto = "param_rad_finsto", param_rad_finedt = "param_rad_finedt", param_rad_zpufin = "param_rad_zpufin", rezimKnihy = "rezimKnihy", rokAktOperace = "rokAktOperace", rok = "rok", newPriz = "newPriz", titulek = "titulek", titulekStav = "titulekStav", titulekFinancovani = "titulekFinancovani", hlasimParam = "hlasimParam", mode_gen_drd = "mode_gen_drd",}
	const enum GPapFinancovaniConstDtoFragments { isPri = "*", xxxspid = "*", prixxxspid = "*", xxxspidEsu = "*", xxxspidPorNab = "*", obsluzPrizGenSml = "*", jeToDiblik = "*", maxCastkaPripad = "*", ftcpRoro = "*", changeFin = "*", prizGenSml = "*", sleEsuPol = "*", param_rad_finnew = "*", param_rad_finval = "*", param_rad_finsto = "*", param_rad_finedt = "*", param_rad_zpufin = "*", rezimKnihy = "*", rokAktOperace = "*", rok = "*", newPriz = "*", titulek = "*", titulekStav = "*", titulekFinancovani = "*", hlasimParam = "*", mode_gen_drd = "*",}
	const enum GPapFinancovaniConstDtoTypes { isPri = "boolean", xxxspid = "string", prixxxspid = "string", xxxspidEsu = "string", xxxspidPorNab = "number", obsluzPrizGenSml = "string", jeToDiblik = "boolean", maxCastkaPripad = "JsonDecimal", ftcpRoro = "Gordic.Pap.Interface.GPapFinancovaniFinDto", changeFin = "Gordic.Pap.Interface.GPapChangeFinDto", prizGenSml = "number", sleEsuPol = "Gordic.Pap.Interface.GPapSleEsuPolDto", param_rad_finnew = "string", param_rad_finval = "string", param_rad_finsto = "string", param_rad_finedt = "string", param_rad_zpufin = "string", rezimKnihy = "number", rokAktOperace = "boolean", rok = "number", newPriz = "boolean", titulek = "string", titulekStav = "string", titulekFinancovani = "string", hlasimParam = "boolean", mode_gen_drd = "number",}
	const enum GPapFinancovaniConstDtoTypeLengths {}
	/**Konstanty pro TS financování*/
	interface GPapFinancovaniFinDto {
		/**fin_od*/
		fin_od?: number|null;
		/**fin_do*/
		fin_do?: number|null;
		/**stav - s_vz, s_dgr, s_po*/
		stav?: number|null;
		/**rok*/
		rok?: number|null;
		/**vlastnik*/
		vlastnik?: boolean|null;
	}
	const enum GPapFinancovaniFinDtoNames { fin_od = "fin_od", fin_do = "fin_do", stav = "stav", rok = "rok", vlastnik = "vlastnik",}
	const enum GPapFinancovaniFinDtoFragments { fin_od = "*", fin_do = "*", stav = "*", rok = "*", vlastnik = "*",}
	const enum GPapFinancovaniFinDtoTypes { fin_od = "number", fin_do = "number", stav = "number", rok = "number", vlastnik = "boolean",}
	const enum GPapFinancovaniFinDtoTypeLengths {}
	/**Konstanty pro TS financování*/
	interface GPapSleEsuPolDto {
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**por_cis*/
		por_cis?: number|null;
	}
	const enum GPapSleEsuPolDtoNames { ixs_pri = "ixs_pri", por_cis = "por_cis",}
	const enum GPapSleEsuPolDtoFragments { ixs_pri = "*", por_cis = "*",}
	const enum GPapSleEsuPolDtoTypes { ixs_pri = "string", por_cis = "number",}
	const enum GPapSleEsuPolDtoTypeLengths {}
	/**Konstanty, co se mění po změne financování*/
	interface GPapChangeFinDto {
		/**CastkaEsu*/
		castkaEsu?: JsonDecimal|null;
		/**canNewEsu*/
		canNewEsu?: boolean|null;
		/**maxCastkaEsuReal*/
		maxCastkaEsuReal?: JsonDecimal|null;
	}
	const enum GPapChangeFinDtoNames { castkaEsu = "castkaEsu", canNewEsu = "canNewEsu", maxCastkaEsuReal = "maxCastkaEsuReal",}
	const enum GPapChangeFinDtoFragments { castkaEsu = "*", canNewEsu = "*", maxCastkaEsuReal = "*",}
	const enum GPapChangeFinDtoTypes { castkaEsu = "JsonDecimal", canNewEsu = "boolean", maxCastkaEsuReal = "JsonDecimal",}
	const enum GPapChangeFinDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Const\Gordic.Pap.Interface.GPapNavrhyConstDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Konstanty pro návrhy*/
	interface GPapNavrhyConstDto {
		/**zkr*/
		zkr?: string|null;
	}
	const enum GPapNavrhyConstDtoNames { zkr = "zkr",}
	const enum GPapNavrhyConstDtoFragments { zkr = "*",}
	const enum GPapNavrhyConstDtoTypes { zkr = "string",}
	const enum GPapNavrhyConstDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Const\Gordic.Pap.Interface.GPapPolozkyPlanuConstDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Konstanty pro TS položky plánu*/
	interface GPapPolozkyPlanuConstDto {
		/**Vlastník*/
		vlastnik?: string|null;
		/**ixs_fun*/
		ixs_fun?: string|null;
		/**xxx_rad_eppbro*/
		xxx_rad_eppbro?: string|null;
		/**jeVprc*/
		jeVprc?: string|null;
	}
	const enum GPapPolozkyPlanuConstDtoNames { vlastnik = "vlastnik", ixs_fun = "ixs_fun", xxx_rad_eppbro = "xxx_rad_eppbro", jeVprc = "jeVprc",}
	const enum GPapPolozkyPlanuConstDtoFragments { vlastnik = "*", ixs_fun = "*", xxx_rad_eppbro = "*", jeVprc = "*",}
	const enum GPapPolozkyPlanuConstDtoTypes { vlastnik = "string", ixs_fun = "string", xxx_rad_eppbro = "string", jeVprc = "string",}
	const enum GPapPolozkyPlanuConstDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Const\Gordic.Pap.Interface.GPapPozadavkyConstDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Konstanty pro TS požadavků*/
	interface GPapPozadavkyConstDto {
		/**Vlastník*/
		vlastnik?: string|null;
		/**ixs_fun*/
		ixs_fun?: string|null;
		/**jeVprc*/
		jeVprc?: string|null;
		/**ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**rok*/
		rok?: number|null;
	}
	const enum GPapPozadavkyConstDtoNames { vlastnik = "vlastnik", ixs_fun = "ixs_fun", jeVprc = "jeVprc", ixs_fun_komp = "ixs_fun_komp", rok = "rok",}
	const enum GPapPozadavkyConstDtoFragments { vlastnik = "*", ixs_fun = "*", jeVprc = "*", ixs_fun_komp = "*", rok = "*",}
	const enum GPapPozadavkyConstDtoTypes { vlastnik = "string", ixs_fun = "string", jeVprc = "string", ixs_fun_komp = "string", rok = "number",}
	const enum GPapPozadavkyConstDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Const\Gordic.Pap.Interface.GPapSchvalitParamConstDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Konstanty pro schvalování*/
	interface GPapSchvalParamConstDto {
		/**ixs_pri*/
		ixs_pri?: string|null;
		/**castka*/
		castka?: JsonDecimal|null;
		/**castka_bez*/
		castka_bez?: JsonDecimal|null;
		/**titulek*/
		titulek?: string|null;
		/**datum*/
		datum?: JsonDate|null;
		/**pro serverovou kontrolu dat odpověď na dotaz*/
		dotazAno?: boolean|null;
	}
	const enum GPapSchvalParamConstDtoNames { ixs_pri = "ixs_pri", castka = "castka", castka_bez = "castka_bez", titulek = "titulek", datum = "datum", dotazAno = "dotazAno",}
	const enum GPapSchvalParamConstDtoFragments { ixs_pri = "*", castka = "*", castka_bez = "*", titulek = "*", datum = "*", dotazAno = "*",}
	const enum GPapSchvalParamConstDtoTypes { ixs_pri = "string", castka = "JsonDecimal", castka_bez = "JsonDecimal", titulek = "string", datum = "JsonDate", dotazAno = "boolean",}
	const enum GPapSchvalParamConstDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Const\Gordic.Pap.Interface.GPapUvolneniConstDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Konstanty pro uvolnění*/
	interface GPapUvolneniConstDto {
		/**ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**titulek*/
		titulek?: string|null;
	}
	const enum GPapUvolneniConstDtoNames { ac_ver_zak = "ac_ver_zak", titulek = "titulek",}
	const enum GPapUvolneniConstDtoFragments { ac_ver_zak = "*", titulek = "*",}
	const enum GPapUvolneniConstDtoTypes { ac_ver_zak = "string", titulek = "string",}
	const enum GPapUvolneniConstDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GDdpstpp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GDdpstppDto {
		/**DBCOLUMN:Seznam.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
	}
	const enum GDdpstppDtoNames { typ_phl = "typ_phl", nazev = "nazev", aktivita = "aktivita",}
	const enum GDdpstppDtoFragments { typ_phl = "*", nazev = "*", aktivita = "*",}
	const enum GDdpstppDtoTypes { typ_phl = "string", nazev = "string", aktivita = "number",}
	const enum GDdpstppDtoTypeLengths { typ_phl = 4, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GEkosrea.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosreaDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.vsxs*/
		vsxs?: string|null;
		/**DBCOLUMN:Seznam.rodicIco*/
		rodicIco?: string|null;
		/**DBCOLUMN:Seznam.rodicPid*/
		rodicPid?: string|null;
	}
	const enum GEkosreaDtoNames { ico = "ico", cis_real = "cis_real", aktivita = "aktivita", poznamka = "poznamka", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ucs = "ucs", uus = "uus", vsxs = "vsxs", rodicIco = "rodicIco", rodicPid = "rodicPid",}
	const enum GEkosreaDtoFragments { ico = "*", cis_real = "*", aktivita = "*", poznamka = "*", nazev = "*", dat_zmena = "*", zmenu_prov = "*", ucs = "*", uus = "*", vsxs = "*", rodicIco = "*", rodicPid = "*",}
	const enum GEkosreaDtoTypes { ico = "string", cis_real = "string", aktivita = "number", poznamka = "string", nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ucs = "string", uus = "string", vsxs = "string", rodicIco = "string", rodicPid = "string",}
	const enum GEkosreaDtoTypeLengths { ico = 10, cis_real = 6, poznamka = 50, nazev = 50, zmenu_prov = 12, ucs = 10, uus = 10, rodicIco = 12, rodicPid = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GGinsfun.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GGinsfunDto {
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.arw*/
		arw?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:Seznam.nazev_su*/
		nazev_su?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.uroven_fun*/
		uroven_fun?: number|null;
		/**DBCOLUMN:Seznam.priorita_max*/
		priorita_max?: number|null;
		/**DBCOLUMN:Seznam.fc*/
		fc?: string|null;
		/**DBCOLUMN:Seznam.ixs_nad*/
		ixs_nad?: string|null;
		/**DBCOLUMN:Seznam.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:Seznam.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:Seznam.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:Seznam.nazev_orj*/
		nazev_orj?: string|null;
		/**DBCOLUMN:Seznam.mistnost_kod*/
		mistnost_kod?: string|null;
		/**DBCOLUMN:Seznam.ur_hod*/
		ur_hod?: string|null;
		/**DBCOLUMN:Seznam.tel*/
		tel?: string|null;
		/**DBCOLUMN:Seznam.mail*/
		mail?: string|null;
		/**DBCOLUMN:Seznam.fax*/
		fax?: string|null;
		/**DBCOLUMN:Seznam.ofic_nazev*/
		ofic_nazev?: string|null;
		/**DBCOLUMN:Seznam.status_fun*/
		status_fun?: number|null;
		/**DBCOLUMN:Seznam.pri_fun*/
		pri_fun?: number|null;
		/**DBCOLUMN:Seznam.ixs_zmp*/
		ixs_zmp?: string|null;
		/**DBCOLUMN:Seznam.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:Seznam.num_pod*/
		num_pod?: number|null;
		/**DBCOLUMN:Seznam.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Seznam.zkratka_su*/
		zkratka_su?: string|null;
		/**DBCOLUMN:Seznam.url*/
		url?: string|null;
		/**DBCOLUMN:Seznam.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:Seznam.aktuz*/
		aktuz?: number|null;
		/**DBCOLUMN:Seznam.poradi_log*/
		poradi_log?: number|null;
		/**DBCOLUMN:Seznam.ixs_ose*/
		ixs_ose?: string|null;
		/**DBCOLUMN:Seznam.priz_servis*/
		priz_servis?: number|null;
		/**DBCOLUMN:Seznam.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_navrh*/
		ixs_su_navrh?: string|null;
		/**DBCOLUMN:Seznam.barva*/
		barva?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.pripoj_xxxvrfu*/
		pripoj_xxxvrfu?: number|null;
	}
	const enum GGinsfunDtoNames { ixs_fun = "ixs_fun", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", nazev_su = "nazev_su", zkratka = "zkratka", nazev = "nazev", uroven_fun = "uroven_fun", priorita_max = "priorita_max", fc = "fc", ixs_nad = "ixs_nad", ixs_ref = "ixs_ref", nazev_ref = "nazev_ref", ixs_orj = "ixs_orj", nazev_orj = "nazev_orj", mistnost_kod = "mistnost_kod", ur_hod = "ur_hod", tel = "tel", mail = "mail", fax = "fax", ofic_nazev = "ofic_nazev", status_fun = "status_fun", pri_fun = "pri_fun", ixs_zmp = "ixs_zmp", cs_nazev = "cs_nazev", num_pod = "num_pod", dat_mpd = "dat_mpd", nazev_rf = "nazev_rf", zkratka_su = "zkratka_su", url = "url", z_int = "z_int", aktuz = "aktuz", poradi_log = "poradi_log", ixs_ose = "ixs_ose", priz_servis = "priz_servis", ixs_lpc = "ixs_lpc", ixs_su_navrh = "ixs_su_navrh", barva = "barva", cis_real = "cis_real", pripoj_xxxvrfu = "pripoj_xxxvrfu",}
	const enum GGinsfunDtoFragments { ixs_fun = "*", ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", nazev_su = "*", zkratka = "*", nazev = "*", uroven_fun = "*", priorita_max = "*", fc = "*", ixs_nad = "*", ixs_ref = "*", nazev_ref = "*", ixs_orj = "*", nazev_orj = "*", mistnost_kod = "*", ur_hod = "*", tel = "*", mail = "*", fax = "*", ofic_nazev = "*", status_fun = "*", pri_fun = "*", ixs_zmp = "*", cs_nazev = "*", num_pod = "*", dat_mpd = "*", nazev_rf = "*", zkratka_su = "*", url = "*", z_int = "*", aktuz = "*", poradi_log = "*", ixs_ose = "*", priz_servis = "*", ixs_lpc = "*", ixs_su_navrh = "*", barva = "*", cis_real = "*", pripoj_xxxvrfu = "*",}
	const enum GGinsfunDtoTypes { ixs_fun = "string", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", nazev_su = "string", zkratka = "string", nazev = "string", uroven_fun = "number", priorita_max = "number", fc = "string", ixs_nad = "string", ixs_ref = "string", nazev_ref = "string", ixs_orj = "string", nazev_orj = "string", mistnost_kod = "string", ur_hod = "string", tel = "string", mail = "string", fax = "string", ofic_nazev = "string", status_fun = "number", pri_fun = "number", ixs_zmp = "string", cs_nazev = "string", num_pod = "number", dat_mpd = "JsonDate", nazev_rf = "string", zkratka_su = "string", url = "string", z_int = "number", aktuz = "number", poradi_log = "number", ixs_ose = "string", priz_servis = "number", ixs_lpc = "string", ixs_su_navrh = "string", barva = "string", cis_real = "string", pripoj_xxxvrfu = "number",}
	const enum GGinsfunDtoTypeLengths { ixs_fun = 12, ixp_den = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, nazev_su = 25, zkratka = 16, nazev = 25, fc = 30, ixs_nad = 12, ixs_ref = 12, nazev_ref = 50, ixs_orj = 12, nazev_orj = 25, mistnost_kod = 8, ur_hod = 50, tel = 33, mail = 254, fax = 33, ofic_nazev = 254, ixs_zmp = 12, cs_nazev = 25, nazev_rf = 50, zkratka_su = 16, url = 254, ixs_ose = 12, ixs_lpc = 12, ixs_su_navrh = 12, barva = 10, cis_real = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GSmlcktsDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:smlckts*/
	interface GSmlcktsDto {
		/**DBCOLUMN:smlckts.ktg_sml*/
		ktg_sml?: number|null;
		/**DBCOLUMN:smlckts.ktg_sml_txt*/
		ktg_sml_txt?: string|null;
		/**DBCOLUMN:smlckts.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:smlckts.k_s*/
		k_s?: string|null;
	}
	const enum GSmlcktsDtoNames { ktg_sml = "ktg_sml", ktg_sml_txt = "ktg_sml_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSmlcktsDtoFragments { ktg_sml = "*", ktg_sml_txt = "*", k_v = "*", k_s = "*",}
	const enum GSmlcktsDtoTypes { ktg_sml = "number", ktg_sml_txt = "string", k_v = "number", k_s = "string",}
	const enum GSmlcktsDtoTypeLengths { ktg_sml_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GSmlctycDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:smlctyc Ciselnik Typ ceny smlouvy*/
	interface GSmlctycDto {
		/**DBCOLUMN:smlctyc.typ_ceny*/
		typ_ceny?: number|null;
		/**DBCOLUMN:smlctyc.typ_ceny_txt*/
		typ_ceny_txt?: string|null;
		/**DBCOLUMN:smlctyc.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:smlctyc.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:smlctyc.k_xml*/
		k_xml?: string|null;
	}
	const enum GSmlctycDtoNames { typ_ceny = "typ_ceny", typ_ceny_txt = "typ_ceny_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GSmlctycDtoFragments { typ_ceny = "*", typ_ceny_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GSmlctycDtoTypes { typ_ceny = "number", typ_ceny_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GSmlctycDtoTypeLengths { typ_ceny_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GSmlsden.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSmlsdenDto {
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.arw*/
		arw?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.typ_den*/
		typ_den?: number|null;
		/**DBCOLUMN:Seznam.ktg_den*/
		ktg_den?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.por_cislo_max*/
		por_cislo_max?: number|null;
		/**DBCOLUMN:Seznam.subrada_max*/
		subrada_max?: number|null;
		/**DBCOLUMN:Seznam.subrada_max*/
		subrada?: number|null;
		/**DBCOLUMN:Seznam.len_ac*/
		len_ac?: number|null;
		/**DBCOLUMN:Seznam.krok_uza*/
		krok_uza?: number|null;
		/**DBCOLUMN:Seznam.ixp_den_old*/
		ixp_den_old?: string|null;
		/**DBCOLUMN:Seznam.prefix*/
		prefix?: string|null;
		/**DBCOLUMN:Seznam.suffix*/
		suffix?: string|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.text1*/
		text1?: string|null;
		/**DBCOLUMN:Seznam.text2*/
		text2?: string|null;
	}
	const enum GSmlsdenDtoNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada = "subrada", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", prefix = "prefix", suffix = "suffix", uus = "uus", text1 = "text1", text2 = "text2",}
	const enum GSmlsdenDtoFragments { ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", subrada = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", prefix = "*", suffix = "*", uus = "*", text1 = "*", text2 = "*",}
	const enum GSmlsdenDtoTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", subrada = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", prefix = "string", suffix = "string", uus = "string", text1 = "string", text2 = "string",}
	const enum GSmlsdenDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, prefix = 30, suffix = 30, uus = 10, text1 = 128, text2 = 128,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GSmlssou.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSmlssouDto {
		/**DBCOLUMN:Seznam.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:Seznam.soutez_txt*/
		soutez_txt?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**nad typ soutěže*/
		nadtypsou?: number|null;
	}
	const enum GSmlssouDtoNames { soutez = "soutez", soutez_txt = "soutez_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", ktg_typ = "ktg_typ", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_od = "dat_od", dat_do = "dat_do", nadtypsou = "nadtypsou",}
	const enum GSmlssouDtoFragments { soutez = "*", soutez_txt = "*", k_v = "*", k_s = "*", aktivita = "*", ktg_typ = "*", dat_zmena = "*", zmenu_prov = "*", dat_od = "*", dat_do = "*", nadtypsou = "*",}
	const enum GSmlssouDtoTypes { soutez = "string", soutez_txt = "string", k_v = "number", k_s = "string", aktivita = "number", ktg_typ = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_od = "JsonDate", dat_do = "JsonDate", nadtypsou = "number",}
	const enum GSmlssouDtoTypeLengths { soutez = 30, soutez_txt = 50, k_s = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GSslstyp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSslstypDto {
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ_od*/
		ktg_typ_od?: number|null;
		/**DBCOLUMN:Seznam.ktg_typ_do*/
		ktg_typ_do?: number|null;
	}
	const enum GSslstypDtoNames { ixs_typ = "ixs_typ", soutez = "soutez", nazev = "nazev", ktg_typ = "ktg_typ", ktg_typ_od = "ktg_typ_od", ktg_typ_do = "ktg_typ_do",}
	const enum GSslstypDtoFragments { ixs_typ = "*", soutez = "*", nazev = "*", ktg_typ = "*", ktg_typ_od = "*", ktg_typ_do = "*",}
	const enum GSslstypDtoTypes { ixs_typ = "string", soutez = "string", nazev = "string", ktg_typ = "number", ktg_typ_od = "number", ktg_typ_do = "number",}
	const enum GSslstypDtoTypeLengths { ixs_typ = 12, soutez = 30, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GVfpspouohoorp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GVfpspouohoorpDto {
		/**DBCOLUMN:Seznam.xxx_dt*/
		xxx_dt?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.tabulka*/
		tabulka?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GVfpspouohoorpDtoNames { xxx_dt = "xxx_dt", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", tabulka = "tabulka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GVfpspouohoorpDtoFragments { xxx_dt = "*", nazev = "*", zkratka = "*", poznamka = "*", tabulka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GVfpspouohoorpDtoTypes { xxx_dt = "string", nazev = "string", zkratka = "string", poznamka = "string", tabulka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GVfpspouohoorpDtoTypeLengths { xxx_dt = 10, nazev = 254, zkratka = 30, poznamka = 254, tabulka = 7, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GXxxcdri.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GXxxcdriDto {
		/**DBCOLUMN:Seznam.dru_riz*/
		dru_riz?: number|null;
		/**DBCOLUMN:Seznam.dru_riz_txt*/
		dru_riz_txt?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.k_s*/
		k_s?: string|null;
		/**zákon*/
		zakon?: string|null;
	}
	const enum GXxxcdriDtoNames { dru_riz = "dru_riz", dru_riz_txt = "dru_riz_txt", k_v = "k_v", k_s = "k_s", zakon = "zakon",}
	const enum GXxxcdriDtoFragments { dru_riz = "*", dru_riz_txt = "*", k_v = "*", k_s = "*", zakon = "*",}
	const enum GXxxcdriDtoTypes { dru_riz = "number", dru_riz_txt = "string", k_v = "number", k_s = "string", zakon = "string",}
	const enum GXxxcdriDtoTypeLengths { dru_riz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GXxxcduzDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:epocduz*/
	interface GXxxcduzDto {
		/**DBCOLUMN:epocduz.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:epocduz.cis_duz_txt*/
		cis_duz_txt?: string|null;
		/**nadTyp3*/
		nadTyp3?: number|null;
		/**zakon*/
		zakon?: number|null;
	}
	const enum GXxxcduzDtoNames { cis_duz = "cis_duz", cis_duz_txt = "cis_duz_txt", nadTyp3 = "nadTyp3", zakon = "zakon",}
	const enum GXxxcduzDtoFragments { cis_duz = "*", cis_duz_txt = "*", nadTyp3 = "*", zakon = "*",}
	const enum GXxxcduzDtoTypes { cis_duz = "number", cis_duz_txt = "string", nadTyp3 = "number", zakon = "number",}
	const enum GXxxcduzDtoTypeLengths { cis_duz_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GXxxcessDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:papcess*/
	interface GXxxcessDto {
		/**DBCOLUMN:vfpcess.s_ess*/
		s_ess?: number|null;
		/**DBCOLUMN:vfpcess.s_ess_txt*/
		s_ess_txt?: string|null;
		/**předvyhodnocení*/
		predvyhodnoceni?: boolean|null;
		/**podmínka pro výběr stavu žádosti*/
		podminkaEss?: string|null;
		nabedo?: number|null;
	}
	const enum GXxxcessDtoNames { s_ess = "s_ess", s_ess_txt = "s_ess_txt", predvyhodnoceni = "predvyhodnoceni", podminkaEss = "podminkaEss", nabedo = "nabedo",}
	const enum GXxxcessDtoFragments { s_ess = "*", s_ess_txt = "*", predvyhodnoceni = "*", podminkaEss = "*", nabedo = "*",}
	const enum GXxxcessDtoTypes { s_ess = "number", s_ess_txt = "string", predvyhodnoceni = "boolean", podminkaEss = "string", nabedo = "number",}
	const enum GXxxcessDtoTypeLengths { s_ess_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GXxxcnerDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:epocner*/
	interface GXxxcnerDto {
		/**DBCOLUMN:epocner.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:epocner.cis_ner_txt*/
		cis_ner_txt?: string|null;
	}
	const enum GXxxcnerDtoNames { cis_ner = "cis_ner", cis_ner_txt = "cis_ner_txt",}
	const enum GXxxcnerDtoFragments { cis_ner = "*", cis_ner_txt = "*",}
	const enum GXxxcnerDtoTypes { cis_ner = "number", cis_ner_txt = "string",}
	const enum GXxxcnerDtoTypeLengths { cis_ner_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GXxxcpriDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:epocpri*/
	interface GXxxcpriDto {
		/**DBCOLUMN:epocpri.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:epocpri.pri_pri_txt*/
		pri_pri_txt?: string|null;
	}
	const enum GXxxcpriDtoNames { pri_pri = "pri_pri", pri_pri_txt = "pri_pri_txt",}
	const enum GXxxcpriDtoFragments { pri_pri = "*", pri_pri_txt = "*",}
	const enum GXxxcpriDtoTypes { pri_pri = "number", pri_pri_txt = "string",}
	const enum GXxxcpriDtoTypeLengths { pri_pri_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GXxxcrezDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:epocrez*/
	interface GXxxcrezDto {
		/**DBCOLUMN:epocrez.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:epocrez.rezim_pri_txt*/
		rezim_pri_txt?: string|null;
	}
	const enum GXxxcrezDtoNames { rezim_pri = "rezim_pri", rezim_pri_txt = "rezim_pri_txt",}
	const enum GXxxcrezDtoFragments { rezim_pri = "*", rezim_pri_txt = "*",}
	const enum GXxxcrezDtoTypes { rezim_pri = "number", rezim_pri_txt = "string",}
	const enum GXxxcrezDtoTypeLengths { rezim_pri_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GXxxctfiDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:epoctfi*/
	interface GXxxctfiDto {
		/**DBCOLUMN:epoctfi.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:epoctfi.typ_fin_txt*/
		typ_fin_txt?: string|null;
	}
	const enum GXxxctfiDtoNames { typ_fin = "typ_fin", typ_fin_txt = "typ_fin_txt",}
	const enum GXxxctfiDtoFragments { typ_fin = "*", typ_fin_txt = "*",}
	const enum GXxxctfiDtoTypes { typ_fin = "number", typ_fin_txt = "string",}
	const enum GXxxctfiDtoTypeLengths { typ_fin_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GXxxctykDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**xxxctyk*/
	interface GXxxctykDto {
		/**typ_kurz*/
		typ_kurz?: number|null;
		/**typ_kurz_txt*/
		typ_kurz_txt?: string|null;
	}
	const enum GXxxctykDtoNames { typ_kurz = "typ_kurz", typ_kurz_txt = "typ_kurz_txt",}
	const enum GXxxctykDtoFragments { typ_kurz = "*", typ_kurz_txt = "*",}
	const enum GXxxctykDtoTypes { typ_kurz = "number", typ_kurz_txt = "string",}
	const enum GXxxctykDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.Pap.Interface.GXxxsesuVDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro výbě esu*/
	interface GXxxsesuVDto {
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**nazev projektu*/
		naz_prj?: string|null;
		/**misto podani*/
		misto_pod?: string|null;
		/**esu_txt*/
		esu_txt?: string|null;
		/**ico*/
		ico?: string|null;
		por_cis_nab?: number|null;
		dat_pis?: JsonDate|null;
		dat_jis?: JsonDate|null;
		/**prijal*/
		prijal?: string|null;
		/**cj_vz*/
		cj_vz?: string|null;
		/**cj_dgr*/
		cj_dgr?: string|null;
		/**cj_po*/
		cj_po?: string|null;
		/**popis*/
		popis?: string|null;
		/**s_spis*/
		s_spis?: number|null;
		s_jis?: number|null;
		s_jis_txt?: string|null;
		/**filtr ixs_pri*/
		ixs_pri?: string|null;
		/**filtr ktg_typ*/
		ktg_typ?: number|null;
		/**filtr cis_por*/
		cis_por?: number|null;
	}
	const enum GXxxsesuVDtoNames { ixs_esu = "ixs_esu", nazev = "nazev", naz_prj = "naz_prj", misto_pod = "misto_pod", esu_txt = "esu_txt", ico = "ico", por_cis_nab = "por_cis_nab", dat_pis = "dat_pis", dat_jis = "dat_jis", prijal = "prijal", cj_vz = "cj_vz", cj_dgr = "cj_dgr", cj_po = "cj_po", popis = "popis", s_spis = "s_spis", s_jis = "s_jis", s_jis_txt = "s_jis_txt", ixs_pri = "ixs_pri", ktg_typ = "ktg_typ", cis_por = "cis_por",}
	const enum GXxxsesuVDtoFragments { ixs_esu = "*", nazev = "*", naz_prj = "*", misto_pod = "*", esu_txt = "*", ico = "*", por_cis_nab = "*", dat_pis = "*", dat_jis = "*", prijal = "*", cj_vz = "*", cj_dgr = "*", cj_po = "*", popis = "*", s_spis = "*", s_jis = "*", s_jis_txt = "*", ixs_pri = "*", ktg_typ = "*", cis_por = "*",}
	const enum GXxxsesuVDtoTypes { ixs_esu = "string", nazev = "string", naz_prj = "string", misto_pod = "string", esu_txt = "string", ico = "string", por_cis_nab = "number", dat_pis = "JsonDate", dat_jis = "JsonDate", prijal = "string", cj_vz = "string", cj_dgr = "string", cj_po = "string", popis = "string", s_spis = "number", s_jis = "number", s_jis_txt = "string", ixs_pri = "string", ktg_typ = "number", cis_por = "number",}
	const enum GXxxsesuVDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Controls\Gordic.PapInterface.GPapKnihaDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Dto pro výběr knihy*/
	interface GPapKnihaDto {
		/**nazev*/
		nazev?: string|null;
		/**nazev*/
		id?: string|null;
		/**rok*/
		rok?: number|null;
		/**smlsden.ktg_den*/
		ktg_den?: number|null;
		/**ixp_den*/
		ixp_den?: string|null;
		/**subrada*/
		subrada?: number|null;
	}
	const enum GPapKnihaDtoNames { nazev = "nazev", id = "id", rok = "rok", ktg_den = "ktg_den", ixp_den = "ixp_den", subrada = "subrada",}
	const enum GPapKnihaDtoFragments { nazev = "*", id = "*", rok = "*", ktg_den = "*", ixp_den = "*", subrada = "*",}
	const enum GPapKnihaDtoTypes { nazev = "string", id = "string", rok = "number", ktg_den = "number", ixp_den = "string", subrada = "number",}
	const enum GPapKnihaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Gordic.Pap.Interface.GMzasdodDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzasdod*/
	interface GMzasdodDto {
		/**DBCOLUMN:mzasdod.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:mzasdod.por_cis*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzasdod.por_cis*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzasdod.por_cis*/
		ser_cis?: number|null;
		/**DBCOLUMN:mzasdod.ixs_dod*/
		ixs_dod?: string|null;
		/**DBCOLUMN:mzasdod.id_dod_ci*/
		id_dod_ci?: string|null;
		/**DBCOLUMN:mzasdod.ured_nazev*/
		ured_nazev?: string|null;
		/**DBCOLUMN:mzasdod.ico_dod*/
		ico_dod?: string|null;
		/**DBCOLUMN:mzasdod.ident_dod_oth*/
		ident_dod_oth?: string|null;
		/**DBCOLUMN:mzasdod.obec*/
		obec?: string|null;
		/**DBCOLUMN:mzasdod.stat*/
		stat?: string|null;
		/**DBCOLUMN:mzasdod.kont_email*/
		kont_email?: string|null;
		/**DBCOLUMN:mzasdod.kont_telef*/
		kont_telef?: string|null;
		/**DBCOLUMN:mzasdod.dic_dod*/
		dic_dod?: string|null;
		/**DBCOLUMN:mzasdod.dod_zahran*/
		dod_zahran?: number|null;
		/**DBCOLUMN:mzasdod.dod_zahran*/
		dod_zahran_txt?: string|null;
		/**DBCOLUMN:mzasdod.prav_forma_imp*/
		prav_forma_imp?: string|null;
		/**DBCOLUMN:mzasdod.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzasdod.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		ixs_esu?: string|null;
		/**0 - nenašel, 1 - nesouhlasí ICO, 2 - nesouhlasí název, 3 - OK, 4 - nesouhlasí obojí*/
		stav?: number|null;
		nacist?: boolean|null;
	}
	const enum GMzasdodDtoNames { por_cis = "por_cis", log_por_cislo = "log_por_cislo", ikc = "ikc", ser_cis = "ser_cis", ixs_dod = "ixs_dod", id_dod_ci = "id_dod_ci", ured_nazev = "ured_nazev", ico_dod = "ico_dod", ident_dod_oth = "ident_dod_oth", obec = "obec", stat = "stat", kont_email = "kont_email", kont_telef = "kont_telef", dic_dod = "dic_dod", dod_zahran = "dod_zahran", dod_zahran_txt = "dod_zahran_txt", prav_forma_imp = "prav_forma_imp", dat_zmena = "dat_zmena", zmenu_prov_txt = "zmenu_prov_txt", zmenu_prov = "zmenu_prov", ixs_esu = "ixs_esu", stav = "stav", nacist = "nacist",}
	const enum GMzasdodDtoFragments { por_cis = "*", log_por_cislo = "*", ikc = "*", ser_cis = "*", ixs_dod = "*", id_dod_ci = "*", ured_nazev = "*", ico_dod = "*", ident_dod_oth = "*", obec = "*", stat = "*", kont_email = "*", kont_telef = "*", dic_dod = "*", dod_zahran = "*", dod_zahran_txt = "*", prav_forma_imp = "*", dat_zmena = "*", zmenu_prov_txt = "*", zmenu_prov = "*", ixs_esu = "*", stav = "*", nacist = "*",}
	const enum GMzasdodDtoTypes { por_cis = "number", log_por_cislo = "number", ikc = "JsonDecimal", ser_cis = "number", ixs_dod = "string", id_dod_ci = "string", ured_nazev = "string", ico_dod = "string", ident_dod_oth = "string", obec = "string", stat = "string", kont_email = "string", kont_telef = "string", dic_dod = "string", dod_zahran = "number", dod_zahran_txt = "string", prav_forma_imp = "string", dat_zmena = "JsonDate", zmenu_prov_txt = "string", zmenu_prov = "string", ixs_esu = "string", stav = "number", nacist = "boolean",}
	const enum GMzasdodDtoTypeLengths { id_dod_ci = 50, ured_nazev = 254, ico_dod = 50, ident_dod_oth = 50, obec = 254, stat = 254, kont_email = 200, kont_telef = 254, dic_dod = 20, prav_forma_imp = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Gordic.Pap.Interface.GMzaskozDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatkoz*/
	interface GMzaskozDto {
		/**DBCOLUMN:mzatkoz.identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatkoz.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatkoz.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatkoz.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:mzatkoz.por_cis_det*/
		por_cis_det?: number|null;
		/**DBCOLUMN:mzatkoz.dat_ode*/
		dat_ode?: JsonDate|null;
		/**DBCOLUMN:mzatkoz.id_koz*/
		id_koz?: string|null;
		/**DBCOLUMN:mzatkoz.id_koz_odpo*/
		id_koz_odpo?: string|null;
		/**DBCOLUMN:mzatkoz.koz_cil*/
		koz_cil?: string|null;
		/**DBCOLUMN:mzatkoz.koz_cil*/
		koz_cilic?: string|null;
		/**DBCOLUMN:mzatkoz.koz_cil*/
		koz_ciluid?: string|null;
		/**DBCOLUMN:mzatkoz.koz_soub*/
		koz_soub?: string|null;
		/**DBCOLUMN:mzatkoz.koz_ident*/
		koz_ident?: string|null;
		/**DBCOLUMN:mzatkoz.ods_org*/
		ods_org?: string|null;
		/**DBCOLUMN:mzatkoz.ods_uziv*/
		ods_uziv?: string|null;
		/**DBCOLUMN:mzatkoz.koz_predm*/
		koz_predm?: string|null;
		/**DBCOLUMN:mzatkoz.koz_text*/
		koz_text?: string|null;
		/**DBCOLUMN:mzatkoz.typ_zpra*/
		typ_zpra?: number|null;
		/**DBCOLUMN:mzatkoz.typ_zpra_txt*/
		typ_zpra_txt?: string|null;
		/**DBCOLUMN:mzatkoz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzatkoz.id_koz*/
		ixs_koz?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		id_nen_tsez?: string|null;
	}
	const enum GMzaskozDtoNames { identifikace = "identifikace", log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", por_cis_det = "por_cis_det", dat_ode = "dat_ode", id_koz = "id_koz", id_koz_odpo = "id_koz_odpo", koz_cil = "koz_cil", koz_cilic = "koz_cilic", koz_ciluid = "koz_ciluid", koz_soub = "koz_soub", koz_ident = "koz_ident", ods_org = "ods_org", ods_uziv = "ods_uziv", koz_predm = "koz_predm", koz_text = "koz_text", typ_zpra = "typ_zpra", typ_zpra_txt = "typ_zpra_txt", dat_zmena = "dat_zmena", ixs_koz = "ixs_koz", zmenu_prov_txt = "zmenu_prov_txt", zmenu_prov = "zmenu_prov", id_nen_tsez = "id_nen_tsez",}
	const enum GMzaskozDtoFragments { identifikace = "*", log_por_cislo = "*", ikc = "*", por_cis = "*", por_cis_det = "*", dat_ode = "*", id_koz = "*", id_koz_odpo = "*", koz_cil = "*", koz_cilic = "*", koz_ciluid = "*", koz_soub = "*", koz_ident = "*", ods_org = "*", ods_uziv = "*", koz_predm = "*", koz_text = "*", typ_zpra = "*", typ_zpra_txt = "*", dat_zmena = "*", ixs_koz = "*", zmenu_prov_txt = "*", zmenu_prov = "*", id_nen_tsez = "*",}
	const enum GMzaskozDtoTypes { identifikace = "string", log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", por_cis_det = "number", dat_ode = "JsonDate", id_koz = "string", id_koz_odpo = "string", koz_cil = "string", koz_cilic = "string", koz_ciluid = "string", koz_soub = "string", koz_ident = "string", ods_org = "string", ods_uziv = "string", koz_predm = "string", koz_text = "string", typ_zpra = "number", typ_zpra_txt = "string", dat_zmena = "JsonDate", ixs_koz = "string", zmenu_prov_txt = "string", zmenu_prov = "string", id_nen_tsez = "string",}
	const enum GMzaskozDtoTypeLengths { id_koz = 50, id_koz_odpo = 50, koz_soub = 254, koz_ident = 50, ods_org = 254, ods_uziv = 254, koz_predm = 254, koz_text = 254, ixs_koz = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Gordic.Pap.Interface.GMzasosbDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzasosb*/
	interface GMzasosbDto {
		/**DBCOLUMN:mzasosb.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:mzasosb.por_cis*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzasosb.ixs_osa*/
		ixs_osa?: string|null;
		/**DBCOLUMN:mzasosb.id_osb_ci*/
		id_osb_ci?: string|null;
		/**DBCOLUMN:mzasosb.id_osb_go*/
		id_osb_go?: string|null;
		/**DBCOLUMN:mzasosb.id_out_ci*/
		id_out_ci?: string|null;
		/**DBCOLUMN:mzasosb.id_out_go*/
		id_out_go?: string|null;
		/**DBCOLUMN:mzasosb.id_out_go*/
		nazev_utvar?: string|null;
		/**DBCOLUMN:mzasosb.email*/
		email?: string|null;
		/**DBCOLUMN:mzasosb.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:mzasosb.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:mzasosb.kont_osb*/
		kont_osb?: number|null;
		/**DBCOLUMN:mzasosb.kont_osb*/
		kont_osb_txt?: string|null;
		/**DBCOLUMN:mzasosb.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:mzasosb.prostr_jmeno*/
		prostr_jmeno?: string|null;
		/**DBCOLUMN:mzasosb.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:mzasosb.telefon*/
		telefon?: string|null;
		/**DBCOLUMN:mzasosb.mobil*/
		mobil?: string|null;
		/**DBCOLUMN:mzasosb.fax*/
		fax?: string|null;
		/**DBCOLUMN:mzasosb.prac_pozice*/
		prac_pozice?: string|null;
		/**DBCOLUMN:mzasosb.nen_platny*/
		nen_platny?: number|null;
		/**DBCOLUMN:mzasosb.nen_platny*/
		nen_platny_txt?: string|null;
		/**DBCOLUMN:mzasosb.pov_prih_syst*/
		pov_prih_syst?: number|null;
		/**DBCOLUMN:mzasosb.pov_prih_syst*/
		pov_prih_syst_txt?: string|null;
		/**DBCOLUMN:mzasosb.plny_prist_zp*/
		plny_prist_zp?: number|null;
		/**DBCOLUMN:mzasosb.plny_prist_zp*/
		plny_prist_zp_txt?: string|null;
		/**DBCOLUMN:mzasosb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzasdod.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:mzasdod.ixs_ref*/
		ixs_ref?: string|null;
		nacist?: boolean|null;
		/**0 - nevyplněno, 1 - nesouhlasí jméno, 2 - ok*/
		stav?: number|null;
		/**DBCOLUMN:mzasdod.nen_uzivid*/
		nen_uzivid?: string|null;
	}
	const enum GMzasosbDtoNames { por_cis = "por_cis", ikc = "ikc", ixs_osa = "ixs_osa", id_osb_ci = "id_osb_ci", id_osb_go = "id_osb_go", id_out_ci = "id_out_ci", id_out_go = "id_out_go", nazev_utvar = "nazev_utvar", email = "email", jmeno = "jmeno", prijmeni = "prijmeni", kont_osb = "kont_osb", kont_osb_txt = "kont_osb_txt", tit_pred = "tit_pred", prostr_jmeno = "prostr_jmeno", tit_za = "tit_za", telefon = "telefon", mobil = "mobil", fax = "fax", prac_pozice = "prac_pozice", nen_platny = "nen_platny", nen_platny_txt = "nen_platny_txt", pov_prih_syst = "pov_prih_syst", pov_prih_syst_txt = "pov_prih_syst_txt", plny_prist_zp = "plny_prist_zp", plny_prist_zp_txt = "plny_prist_zp_txt", dat_zmena = "dat_zmena", zmenu_prov_txt = "zmenu_prov_txt", zmenu_prov = "zmenu_prov", ixs_ref = "ixs_ref", nacist = "nacist", stav = "stav", nen_uzivid = "nen_uzivid",}
	const enum GMzasosbDtoFragments { por_cis = "*", ikc = "*", ixs_osa = "*", id_osb_ci = "*", id_osb_go = "*", id_out_ci = "*", id_out_go = "*", nazev_utvar = "*", email = "*", jmeno = "*", prijmeni = "*", kont_osb = "*", kont_osb_txt = "*", tit_pred = "*", prostr_jmeno = "*", tit_za = "*", telefon = "*", mobil = "*", fax = "*", prac_pozice = "*", nen_platny = "*", nen_platny_txt = "*", pov_prih_syst = "*", pov_prih_syst_txt = "*", plny_prist_zp = "*", plny_prist_zp_txt = "*", dat_zmena = "*", zmenu_prov_txt = "*", zmenu_prov = "*", ixs_ref = "*", nacist = "*", stav = "*", nen_uzivid = "*",}
	const enum GMzasosbDtoTypes { por_cis = "number", ikc = "JsonDecimal", ixs_osa = "string", id_osb_ci = "string", id_osb_go = "string", id_out_ci = "string", id_out_go = "string", nazev_utvar = "string", email = "string", jmeno = "string", prijmeni = "string", kont_osb = "number", kont_osb_txt = "string", tit_pred = "string", prostr_jmeno = "string", tit_za = "string", telefon = "string", mobil = "string", fax = "string", prac_pozice = "string", nen_platny = "number", nen_platny_txt = "string", pov_prih_syst = "number", pov_prih_syst_txt = "string", plny_prist_zp = "number", plny_prist_zp_txt = "string", dat_zmena = "JsonDate", zmenu_prov_txt = "string", zmenu_prov = "string", ixs_ref = "string", nacist = "boolean", stav = "number", nen_uzivid = "string",}
	const enum GMzasosbDtoTypeLengths { id_osb_ci = 50, id_osb_go = 50, id_out_ci = 50, id_out_go = 50, email = 254, jmeno = 254, prijmeni = 254, tit_pred = 50, prostr_jmeno = 254, tit_za = 50, telefon = 254, mobil = 254, fax = 254, prac_pozice = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Gordic.Pap.Interface.GMzasoutDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzasout*/
	interface GMzasoutDto {
		/**DBCOLUMN:mzasout.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:mzasout.ixs_out*/
		ixs_out?: string|null;
		/**DBCOLUMN:mzasout.id_out_ci*/
		id_out_ci?: string|null;
		/**DBCOLUMN:mzasout.id_out_go*/
		id_out_go?: string|null;
		/**DBCOLUMN:mzasout.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:mzasout.id_out_ci_nad*/
		id_out_ci_nad?: string|null;
		/**DBCOLUMN:mzasout.id_out_go_nad*/
		id_out_go_nad?: string|null;
		/**DBCOLUMN:mzasout.nen_platny*/
		nen_platny?: number|null;
		/**DBCOLUMN:mzasout.nen_platny*/
		nen_platny_txt?: string|null;
		/**DBCOLUMN:mzasout.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzasdod.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GMzasoutDtoNames { por_cis = "por_cis", ixs_out = "ixs_out", id_out_ci = "id_out_ci", id_out_go = "id_out_go", nazev = "nazev", id_out_ci_nad = "id_out_ci_nad", id_out_go_nad = "id_out_go_nad", nen_platny = "nen_platny", nen_platny_txt = "nen_platny_txt", dat_zmena = "dat_zmena", zmenu_prov_txt = "zmenu_prov_txt", zmenu_prov = "zmenu_prov",}
	const enum GMzasoutDtoFragments { por_cis = "*", ixs_out = "*", id_out_ci = "*", id_out_go = "*", nazev = "*", id_out_ci_nad = "*", id_out_go_nad = "*", nen_platny = "*", nen_platny_txt = "*", dat_zmena = "*", zmenu_prov_txt = "*", zmenu_prov = "*",}
	const enum GMzasoutDtoTypes { por_cis = "number", ixs_out = "string", id_out_ci = "string", id_out_go = "string", nazev = "string", id_out_ci_nad = "string", id_out_go_nad = "string", nen_platny = "number", nen_platny_txt = "string", dat_zmena = "JsonDate", zmenu_prov_txt = "string", zmenu_prov = "string",}
	const enum GMzasoutDtoTypeLengths { id_out_ci = 50, id_out_go = 50, nazev = 254, id_out_ci_nad = 50, id_out_go_nad = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Gordic.Pap.Interface.GMzasrolDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzasrol*/
	interface GMzasrolDto {
		/**DBCOLUMN:mzasrol.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:mzasrol.ixs_rol*/
		ixs_rol?: string|null;
		/**DBCOLUMN:mzasrol.id_osb_ci*/
		id_osb_ci?: string|null;
		/**DBCOLUMN:mzasrol.id_osb_go*/
		id_osb_go?: string|null;
		/**DBCOLUMN:mzasrol.role_txt*/
		role_txt?: string|null;
		/**DBCOLUMN:mzasrol.role_txt*/
		role_ez_txt?: string|null;
		/**DBCOLUMN:mzasrol.role_txt*/
		role_ez?: number|null;
		/**DBCOLUMN:mzasrol.id_out_ci*/
		id_out_ci?: string|null;
		/**DBCOLUMN:mzasrol.id_out_go*/
		id_out_go?: string|null;
		/**DBCOLUMN:mzasrol.id_zpvz_ci*/
		id_zpvz_ci?: string|null;
		/**DBCOLUMN:mzasrol.pov_podr_out*/
		pov_podr_out?: number|null;
		/**DBCOLUMN:mzasrol.pov_podr_out*/
		pov_podr_out_txt?: string|null;
		/**DBCOLUMN:mzasrol.nen_platny*/
		nen_platny?: number|null;
		/**DBCOLUMN:mzasrol.nen_platny*/
		nen_platny_txt?: string|null;
		/**DBCOLUMN:mzasrol.plny_prist_zpout*/
		plny_prist_zpout?: number|null;
		/**DBCOLUMN:mzasrol.plny_prist_zpout*/
		plny_prist_zpout_txt?: string|null;
		/**DBCOLUMN:mzasrol.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzasdod.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		jmeno?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		prijmeni?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		email?: string|null;
		/**DBCOLUMN:mzasdod.zmenu_prov*/
		nazev_utvar?: string|null;
	}
	const enum GMzasrolDtoNames { por_cis = "por_cis", ixs_rol = "ixs_rol", id_osb_ci = "id_osb_ci", id_osb_go = "id_osb_go", role_txt = "role_txt", role_ez_txt = "role_ez_txt", role_ez = "role_ez", id_out_ci = "id_out_ci", id_out_go = "id_out_go", id_zpvz_ci = "id_zpvz_ci", pov_podr_out = "pov_podr_out", pov_podr_out_txt = "pov_podr_out_txt", nen_platny = "nen_platny", nen_platny_txt = "nen_platny_txt", plny_prist_zpout = "plny_prist_zpout", plny_prist_zpout_txt = "plny_prist_zpout_txt", dat_zmena = "dat_zmena", zmenu_prov_txt = "zmenu_prov_txt", zmenu_prov = "zmenu_prov", jmeno = "jmeno", prijmeni = "prijmeni", email = "email", nazev_utvar = "nazev_utvar",}
	const enum GMzasrolDtoFragments { por_cis = "*", ixs_rol = "*", id_osb_ci = "*", id_osb_go = "*", role_txt = "*", role_ez_txt = "*", role_ez = "*", id_out_ci = "*", id_out_go = "*", id_zpvz_ci = "*", pov_podr_out = "*", pov_podr_out_txt = "*", nen_platny = "*", nen_platny_txt = "*", plny_prist_zpout = "*", plny_prist_zpout_txt = "*", dat_zmena = "*", zmenu_prov_txt = "*", zmenu_prov = "*", jmeno = "*", prijmeni = "*", email = "*", nazev_utvar = "*",}
	const enum GMzasrolDtoTypes { por_cis = "number", ixs_rol = "string", id_osb_ci = "string", id_osb_go = "string", role_txt = "string", role_ez_txt = "string", role_ez = "number", id_out_ci = "string", id_out_go = "string", id_zpvz_ci = "string", pov_podr_out = "number", pov_podr_out_txt = "string", nen_platny = "number", nen_platny_txt = "string", plny_prist_zpout = "number", plny_prist_zpout_txt = "string", dat_zmena = "JsonDate", zmenu_prov_txt = "string", zmenu_prov = "string", jmeno = "string", prijmeni = "string", email = "string", nazev_utvar = "string",}
	const enum GMzasrolDtoTypeLengths { id_osb_ci = 50, id_osb_go = 50, role_txt = 50, id_out_ci = 50, id_out_go = 50, id_zpvz_ci = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Gordic.Pap.Interface.GMzassezDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzasout*/
	interface GMzassezDto {
		ikc?: JsonDecimal|null;
		/**id_zak_ci*/
		id_zak_ci?: string|null;
		/**id_zak_go*/
		id_zak_go?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**id_out_ci*/
		id_out_ci?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**ixs_fun*/
		ixs_fun?: string|null;
		ixs_hpo?: string|null;
	}
	const enum GMzassezDtoNames { ikc = "ikc", id_zak_ci = "id_zak_ci", id_zak_go = "id_zak_go", nazev = "nazev", id_out_ci = "id_out_ci", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun = "ixs_fun", ixs_hpo = "ixs_hpo",}
	const enum GMzassezDtoFragments { ikc = "*", id_zak_ci = "*", id_zak_go = "*", nazev = "*", id_out_ci = "*", dat_zmena = "*", zmenu_prov = "*", ixs_fun = "*", ixs_hpo = "*",}
	const enum GMzassezDtoTypes { ikc = "JsonDecimal", id_zak_ci = "string", id_zak_go = "string", nazev = "string", id_out_ci = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun = "string", ixs_hpo = "string",}
	const enum GMzassezDtoTypeLengths { id_zak_ci = 50, id_zak_go = 50, nazev = 254, id_out_ci = 50, zmenu_prov = 12, ixs_fun = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Gordic.Pap.Interface.PapnenDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:evzspid*/
	interface PapNenDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:Detail.ixp*/
		ixp?: string|null;
	}
	const enum PapNenDtoNames { ixp = "ixp", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum PapNenDtoFragments { ixp = "common", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum PapNenDtoTypes { ixp = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum PapNenDtoTypeLengths { ixp = 12,}
	const enum FilPapNen {
		ixp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacdruDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacdru*/
	interface GMzacdruDto {
		/**DBCOLUMN:mzacdru.druh_zak*/
		druh_zak?: number|null;
		/**DBCOLUMN:mzacdru.druh_zak_txt*/
		druh_zak_txt?: string|null;
		/**DBCOLUMN:mzacdru.syst_ez*/
		syst_ez?: number|null;
		/**DBCOLUMN:mzacdru.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzacdru.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacdru.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzacdru.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzacdruDtoNames { druh_zak = "druh_zak", druh_zak_txt = "druh_zak_txt", syst_ez = "syst_ez", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzacdruDtoFragments { druh_zak = "*", druh_zak_txt = "*", syst_ez = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzacdruDtoTypes { druh_zak = "number", druh_zak_txt = "string", syst_ez = "number", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzacdruDtoTypeLengths { druh_zak_txt = 254, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzacdru*/
	const enum GMzacdruEnum {
		/**Dodávky*/
		Dodavky=101,
		/**Služby*/
		Sluzby=102,
		/**Stavební práce*/
		Stavebniprace=103,
		/**Koncese na služby*/
		Koncesenasluzby=104,
		/**Koncese na stavební práce*/
		Koncesenastavebniprace=105,
	}
	function GMzacdruEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacdruEnum, Gordic.Pap.Interface.GMzacdruDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacrosDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacros*/
	interface GMzacrosDto {
		/**DBCOLUMN:mzacros.role_ez*/
		role_ez?: number|null;
		/**DBCOLUMN:mzacros.role_ez_txt*/
		role_ez_txt?: string|null;
		/**DBCOLUMN:mzacros.syst_ez*/
		syst_ez?: number|null;
		/**DBCOLUMN:mzacros.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzacros.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacros.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzacros.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzacrosDtoNames { role_ez = "role_ez", role_ez_txt = "role_ez_txt", syst_ez = "syst_ez", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzacrosDtoFragments { role_ez = "*", role_ez_txt = "*", syst_ez = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzacrosDtoTypes { role_ez = "number", role_ez_txt = "string", syst_ez = "number", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzacrosDtoTypeLengths { role_ez_txt = 50, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzacros*/
	const enum GMzacrosEnum {
		/**Správce zadávacího postupu*/
		SPRAVCE_ZP=101,
		/**Pozorovatel*/
		POZOROVATEL_ZAD=102,
		/**Správce E-aukce*/
		SPR_EAUKCE=103,
		/**Pozorovatel E-aukce za zadavatele*/
		POZ_EAUKCE_ZAD=104,
		/**Administrátor subjektu*/
		SUPERUZ=105,
		/**Administrátor organizačního útvaru*/
		ADMIN_UTVAR=106,
		/**Řídící pracovník*/
		RIDICI_PRACOVNIK=107,
		/**Administrátor CZ*/
		ADMIN_CZ=108,
		/**Schvalovatel CZ*/
		SCHVALOVATEL_CZ=109,
		/**Účastník CZ*/
		UCAST_CZ=110,
		/**Metodik*/
		METODIK=111,
	}
	function GMzacrosEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacrosEnum, Gordic.Pap.Interface.GMzacrosDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacsouDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacsou*/
	interface GMzacsouDto {
		/**DBCOLUMN:mzacsou.druh_zad_riz*/
		druh_zad_riz?: number|null;
		/**DBCOLUMN:mzacsou.druh_zad_riz_txt*/
		druh_zad_riz_txt?: string|null;
		/**DBCOLUMN:mzacsou.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzacsou.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacsou.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzacsou.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzacsouDtoNames { druh_zad_riz = "druh_zad_riz", druh_zad_riz_txt = "druh_zad_riz_txt", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzacsouDtoFragments { druh_zad_riz = "*", druh_zad_riz_txt = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzacsouDtoTypes { druh_zad_riz = "number", druh_zad_riz_txt = "string", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzacsouDtoTypeLengths { druh_zad_riz_txt = 254, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzacsou*/
	const enum GMzacsouEnum {
		/**Otevřené řízení*/
		Otevrenerizeni=10,
		/**Užší řízení*/
		Uzsirizeni=20,
		/**Jednací řízení s uveřejněním*/
		Jednacirizenisuverejnenim=30,
		/**Jednací řízení bez uveřejnění*/
		Jednacirizenibezuverejneni=40,
		/**Soutěžní dialog*/
		Souteznidialog=50,
		/**Zjednodušené podlimitní řízení*/
		Zjednodusenepodlimitnirizeni=60,
		/**Otevřená soutěž o návrh*/
		Otevrenasoutezonavrh=70,
		/**Užší soutěž o návrh*/
		Uzsisoutezonavrh=80,
		/**Zadávání VZ v DNS*/
		ZadavaniVZvDNS=90,
		/**E-aukce malého rozsahu*/
		E_aukcemalehorozsahu=100,
		/**Jednací řízení s uveřejněním (bez uveřejnění) - dle § 22 odst. 2 ZVZ*/
		Jednacirizenisuverejnenimbezuverejneni_dle22odst2ZVZ=110,
		/**Otevřená výzva*/
		Otevrenavyzva=120,
		/**Přímé zadání u VZMR*/
		PrimezadaniuVZMR=130,
		/**Přímé zadání (v případě aplikace zákonné výjimky dle § 18-20 ZVZ)*/
		Primezadanivpripadeaplikacezakonnevyjimkydle18_20ZVZ=140,
		/**Uzavřená výzva*/
		Uzavrenavyzva=150,
		/**Zadávání VZ na základě RS s jedním uchazečem v režimu ZVZ*/
		ZadavaniVZnazakladeRSsjednimuchazecemvrezimuZVZ=160,
		/**Zadávání VZ na základě RS s více uchazeči v režimu ZVZ*/
		ZadavaniVZnazakladeRSsviceuchazecivrezimuZVZ=170,
		/**Zadávání VZ na základě RS s jedním uchazečem (mimo režim ZVZ)*/
		ZadavaniVZnazakladeRSsjednimuchazecemmimorezimZVZ=180,
		/**Zadávání VZ na základě RS s více uchazeči (mimo režim ZVZ)*/
		ZadavaniVZnazakladeRSsviceuchazecimimorezimZVZ=190,
		/**Zavedení DNS v otevřeném řízení*/
		ZavedeniDNSvotevrenemrizeni=200,
		/**Koncesní řízení*/
		Koncesnirizeni=210,
		/**Průzkum trhu*/
		Pruzkumtrhu=220,
		/**Předběžné tržní konzultace*/
		Predbeznetrznikonzultace=230,
		/**Zadávání VZ na základě rámcové dohody bez obnovení soutěže (mimo režim ZZVZ)*/
		ZadavaniVZnazakladeramcovedohodybezobnovenisoutezemimorezimZZVZ=240,
		/**Zadávání VZ na základě rámcové dohody s obnovením soutěže (mimo režim ZZVZ)*/
		ZadavaniVZnazakladeramcovedohodysobnovenimsoutezemimorezimZZVZ=250,
		/**Zadávání VZ na základě rámcové dohody bez obnovení soutěže (v režimu ZZVZ)*/
		ZadavaniVZnazakladeramcovedohodybezobnovenisoutezevrezimuZZVZ=260,
		/**Zadávání VZ na základě rámcové dohody s obnovením soutěže (v režimu ZZVZ)*/
		ZadavaniVZnazakladeramcovedohodysobnovenimsoutezevrezimuZZVZ=270,
		/**Řízení pro zadání veřejné zakázky ve zjednodušeném režimu*/
		Rizeniprozadaniverejnezakazkyvezjednodusenemrezimu=280,
		/**Řízení o inovačním partnerství*/
		Rizenioinovacnimpartnerstvi=290,
		/**Minitendr (zadání na základě rámcové dohody)*/
		Minitendrzadaninazakladeramcovedohody=300,
		/**Minitendr (zadání na základě rámcové smlouvy)*/
		Minitendrzadaninazakladeramcovesmlouvy=310,
		/**Zakázka malého rozsahu*/
		Zakazkamalehorozsahu=320,
		/**Zakázka zadaná na základě výjimky*/
		Zakazkazadananazakladevyjimky=330,
		/**Zavedení DNS*/
		ZavedeniDNS=340,
		/**Systém kvalifikace*/
		Systemkvalifikace=350,
		/**Jednací řízení s uveřejněním (bez uveřejnění) - dle § 61 odst. 3 ZZVZ*/
		Jednacirizenisuverejnenimbezuverejneni_dle61odst3ZZVZ=360,
	}
	function GMzacsouEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacsouEnum, Gordic.Pap.Interface.GMzacsouDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacstcDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacstc*/
	interface GMzacstcDto {
		/**DBCOLUMN:mzacstc.stav_caza*/
		stav_caza?: number|null;
		/**DBCOLUMN:mzacstc.stav_caza_txt*/
		stav_caza_txt?: string|null;
		/**DBCOLUMN:mzacstc.syst_ez*/
		syst_ez?: number|null;
		/**DBCOLUMN:mzacstc.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzacstc.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacstc.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzacstc.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzacstcDtoNames { stav_caza = "stav_caza", stav_caza_txt = "stav_caza_txt", syst_ez = "syst_ez", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzacstcDtoFragments { stav_caza = "*", stav_caza_txt = "*", syst_ez = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzacstcDtoTypes { stav_caza = "number", stav_caza_txt = "string", syst_ez = "number", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzacstcDtoTypeLengths { stav_caza_txt = 254, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzacstc*/
	const enum GMzacstcEnum {
		/**Část VZ neukončena*/
		CastVZneukoncena=101,
		/**Část VZ byla zadána*/
		CastVZbylazadana=102,
		/**Část VZ byla zrušena*/
		CastVZbylazrusena=103,
		/**Ukončeno plnění smlouvy části VZ*/
		UkoncenoplnenismlouvycastiVZ=104,
	}
	function GMzacstcEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacstcEnum, Gordic.Pap.Interface.GMzacstcDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacstzDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacstz*/
	interface GMzacstzDto {
		/**DBCOLUMN:mzacstz.stav_zak*/
		stav_zak?: number|null;
		/**DBCOLUMN:mzacstz.stav_zak_txt*/
		stav_zak_txt?: string|null;
		/**DBCOLUMN:mzacstz.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzacstz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacstz.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzacstz.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzacstzDtoNames { stav_zak = "stav_zak", stav_zak_txt = "stav_zak_txt", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzacstzDtoFragments { stav_zak = "*", stav_zak_txt = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzacstzDtoTypes { stav_zak = "number", stav_zak_txt = "string", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzacstzDtoTypeLengths { stav_zak_txt = 254, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzacstz*/
	const enum GMzacstzEnum {
		/**VZ neukončena*/
		VZneukoncena=10,
		/**VZ byla zadána*/
		VZbylazadana=20,
		/**VZ byla zrušena*/
		VZbylazrusena=30,
		/**Ukončeno plnění smlouvy na základě VZ*/
		UkoncenoplnenismlouvynazakladeVZ=40,
	}
	function GMzacstzEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacstzEnum, Gordic.Pap.Interface.GMzacstzDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacsysDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacsys*/
	interface GMzacsysDto {
		/**DBCOLUMN:mzacsys.syst_ez*/
		syst_ez?: number|null;
		/**DBCOLUMN:mzacsys.syst_ez_txt*/
		syst_ez_txt?: string|null;
		/**DBCOLUMN:mzacsys.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacsys.k_s*/
		k_s?: string|null;
	}
	const enum GMzacsysDtoNames { syst_ez = "syst_ez", syst_ez_txt = "syst_ez_txt", k_v = "k_v", k_s = "k_s",}
	const enum GMzacsysDtoFragments { syst_ez = "*", syst_ez_txt = "*", k_v = "*", k_s = "*",}
	const enum GMzacsysDtoTypes { syst_ez = "number", syst_ez_txt = "string", k_v = "number", k_s = "string",}
	const enum GMzacsysDtoTypeLengths { syst_ez_txt = 254, k_s = 15,}
	/**ENUM:mzacsys*/
	const enum GMzacsysEnum {
		/**Neurčeno*/
		_0=0,
		/**Národní elektronický nástroj (NEN)*/
		NEN=1,
	}
	function GMzacsysEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacsysEnum, Gordic.Pap.Interface.GMzacsysDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactpoDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzactpo*/
	interface GMzactpoDto {
		/**DBCOLUMN:mzactpo.typ_poza*/
		typ_poza?: number|null;
		/**DBCOLUMN:mzactpo.typ_poza_txt*/
		typ_poza_txt?: string|null;
		/**DBCOLUMN:mzactpo.syst_ez*/
		syst_ez?: number|null;
		/**DBCOLUMN:mzactpo.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzactpo.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzactpo.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzactpoDtoNames { typ_poza = "typ_poza", typ_poza_txt = "typ_poza_txt", syst_ez = "syst_ez", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzactpoDtoFragments { typ_poza = "*", typ_poza_txt = "*", syst_ez = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzactpoDtoTypes { typ_poza = "number", typ_poza_txt = "string", syst_ez = "number", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzactpoDtoTypeLengths { typ_poza_txt = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzactpo*/
	const enum GMzactpoEnum {
		/**Nabídka*/
		Nabidka=101,
		/**Předběžný zájem*/
		Predbeznyzajem=102,
		/**Potvrzení zájmu o účast*/
		Potvrzenizajmuoucast=103,
		/**Žádost o účast*/
		Zadostoucast=104,
		/**Předběžná nabídka*/
		Predbeznanabidka=105,
		/**Informace*/
		Informace=106,
		/**Slouží pouze pro odpověd metody ZiskejZP*/
		Jiny=107,
	}
	function GMzactpoEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzactpoEnum, Gordic.Pap.Interface.GMzactpoDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactraDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzactra*/
	interface GMzactraDto {
		/**DBCOLUMN:mzactra.typ_ram_sml*/
		typ_ram_sml?: number|null;
		/**DBCOLUMN:mzactra.typ_ram_sml_txt*/
		typ_ram_sml_txt?: string|null;
		/**DBCOLUMN:mzactra.syst_ez*/
		syst_ez?: number|null;
		/**DBCOLUMN:mzactra.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzactra.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzactra.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzactra.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzactraDtoNames { typ_ram_sml = "typ_ram_sml", typ_ram_sml_txt = "typ_ram_sml_txt", syst_ez = "syst_ez", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzactraDtoFragments { typ_ram_sml = "*", typ_ram_sml_txt = "*", syst_ez = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzactraDtoTypes { typ_ram_sml = "number", typ_ram_sml_txt = "string", syst_ez = "number", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzactraDtoTypeLengths { typ_ram_sml_txt = 254, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzactra*/
	const enum GMzactraEnum {
		/**Bez obnovení soutěže mezi účastníky*/
		Bezobnovenisoutezemeziucastniky=101,
		/**S obnovením soutěže mezi účastníky*/
		Sobnovenimsoutezemeziucastniky=102,
		/**Kombinace postupů*/
		Kombinacepostupu=103,
	}
	function GMzactraEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzactraEnum, Gordic.Pap.Interface.GMzactraDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactydDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzactyd*/
	interface GMzactydDto {
		/**DBCOLUMN:mzactyd.typ_doza*/
		typ_doza?: number|null;
		/**DBCOLUMN:mzactyd.typ_doza_txt*/
		typ_doza_txt?: string|null;
		/**DBCOLUMN:mzactyd.syst_ez*/
		syst_ez?: number|null;
		/**DBCOLUMN:mzactyd.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzactyd.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzactyd.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzactyd.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzactydDtoNames { typ_doza = "typ_doza", typ_doza_txt = "typ_doza_txt", syst_ez = "syst_ez", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzactydDtoFragments { typ_doza = "*", typ_doza_txt = "*", syst_ez = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzactydDtoTypes { typ_doza = "number", typ_doza_txt = "string", syst_ez = "number", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzactydDtoTypeLengths { typ_doza_txt = 254, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzactyd*/
	const enum GMzactydEnum {
		/**Zadávací dokumentace*/
		Zadavacidokumentace=101,
		/**Záznamový soubor*/
		Zaznamovysoubor=102,
		/**Písemná výzva ve zjednodušeném podlimitním řízení*/
		Pisemnavyzvavezjednodusenempodlimitnimrizeni=103,
		/**Písemná výzva*/
		Pisemnavyzva=104,
		/**Dodatečné informace*/
		Dodatecneinformace=105,
		/**Výzva k podání nabídek na základě rámcové smlouvy*/
		Vyzvakpodaninabideknazakladeramcovesmlouvy=106,
		/**Oznámení o výběru nejvhodnější nabídky*/
		Oznameniovyberunejvhodnejsinabidky=107,
		/**Písemná zpráva zadavatele*/
		Pisemnazpravazadavatele=108,
		/**Smlouva o sdružení zadavatelů*/
		Smlouvaosdruzenizadavatelu=109,
		/**Smlouva s dodavatelem*/
		Smlouvasdodavatelem=110,
		/**Dodatek smlouvy*/
		Dodateksmlouvy=111,
		/**Jiný dokument*/
		Jinydokument=112,
		/**Výzva k podání nabídky*/
		Vyzvakpodaninabidky=113,
		/**Výzva k podání předběžné nabídky*/
		Vyzvakpodanipredbeznenabidky=114,
		/**Výzva k poskytnutí plnění*/
		Vyzvakposkytnutiplneni=115,
		/**Výzva k doplnění nabídky*/
		Vyzvakdoplneninabidky=116,
		/**Výzva k předložení návrhu smlouvy*/
		Vyzvakpredlozeninavrhusmlouvy=117,
		/**Výzva k jednání*/
		Vyzvakjednani=118,
		/**Výzva k podání žádosti o účast*/
		Vyzvakpodanizadostioucast=119,
		/**Zpráva o hodnocení nabídek*/
		Zpravaohodnoceninabidek=120,
		/**Zpráva o hodnocení předběžných nabídek*/
		Zpravaohodnocenipredbeznychnabidek=121,
		/**Protokol o otevírání nabídek*/
		Protokolooteviraninabidek=122,
	}
	function GMzactydEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzactydEnum, Gordic.Pap.Interface.GMzactydDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactysDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzactys*/
	interface GMzactysDto {
		/**DBCOLUMN:mzactys.typ_sml*/
		typ_sml?: number|null;
		/**DBCOLUMN:mzactys.typ_sml_txt*/
		typ_sml_txt?: string|null;
		/**DBCOLUMN:mzactys.syst_ez*/
		syst_ez?: number|null;
		/**DBCOLUMN:mzactys.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzactys.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzactys.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzactys.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzactysDtoNames { typ_sml = "typ_sml", typ_sml_txt = "typ_sml_txt", syst_ez = "syst_ez", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzactysDtoFragments { typ_sml = "*", typ_sml_txt = "*", syst_ez = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzactysDtoTypes { typ_sml = "number", typ_sml_txt = "string", syst_ez = "number", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzactysDtoTypeLengths { typ_sml_txt = 254, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzactys*/
	const enum GMzactysEnum {
		/**Dohoda s jedním*/
		Dohodasjednim=101,
		/**Dohoda s více*/
		Dohodasvice=102,
		/**Jednorázová*/
		Jednorazova=103,
		/**Koncese*/
		Koncese=104,
		/**Rámcová s jedním*/
		Ramcovasjednim=105,
		/**Rámcová s více*/
		Ramcovasvice=106,
	}
	function GMzactysEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzactysEnum, Gordic.Pap.Interface.GMzactysDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzactzpDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzactzp*/
	interface GMzactzpDto {
		/**DBCOLUMN:mzactzp.typ_zpra*/
		typ_zpra?: number|null;
		/**DBCOLUMN:mzactzp.typ_zpra_txt*/
		typ_zpra_txt?: string|null;
		/**DBCOLUMN:mzactzp.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzactzp.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzactzp.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzactzpDtoNames { typ_zpra = "typ_zpra", typ_zpra_txt = "typ_zpra_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzactzpDtoFragments { typ_zpra = "*", typ_zpra_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzactzpDtoTypes { typ_zpra = "number", typ_zpra_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzactzpDtoTypeLengths { typ_zpra_txt = 254, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacuveDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacuve*/
	interface GMzacuveDto {
		/**DBCOLUMN:mzacuve.priz_uve*/
		priz_uve?: number|null;
		/**DBCOLUMN:mzacuve.priz_uve_txt*/
		priz_uve_txt?: string|null;
		/**DBCOLUMN:mzacuve.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacuve.k_s*/
		k_s?: string|null;
	}
	const enum GMzacuveDtoNames { priz_uve = "priz_uve", priz_uve_txt = "priz_uve_txt", k_v = "k_v", k_s = "k_s",}
	const enum GMzacuveDtoFragments { priz_uve = "*", priz_uve_txt = "*", k_v = "*", k_s = "*",}
	const enum GMzacuveDtoTypes { priz_uve = "number", priz_uve_txt = "string", k_v = "number", k_s = "string",}
	const enum GMzacuveDtoTypeLengths { priz_uve_txt = 254, k_s = 15,}
	/**ENUM:mzacuve*/
	const enum GMzacuveEnum {
		/**Neurčeno*/
		_0=0,
		/**Uveřejnit*/
		_1=1,
		/**Oduveřejnit*/
		_2=2,
	}
	function GMzacuveEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacuveEnum, Gordic.Pap.Interface.GMzacuveDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzaczdvDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzaczdv*/
	interface GMzaczdvDto {
		/**DBCOLUMN:mzaczdv.duv_vyra*/
		duv_vyra?: number|null;
		/**DBCOLUMN:mzaczdv.duv_vyra_txt*/
		duv_vyra_txt?: string|null;
		/**DBCOLUMN:mzaczdv.syst_ez*/
		syst_ez?: number|null;
		/**DBCOLUMN:mzaczdv.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzaczdv.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzaczdv.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzaczdvDtoNames { duv_vyra = "duv_vyra", duv_vyra_txt = "duv_vyra_txt", syst_ez = "syst_ez", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzaczdvDtoFragments { duv_vyra = "*", duv_vyra_txt = "*", syst_ez = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzaczdvDtoTypes { duv_vyra = "number", duv_vyra_txt = "string", syst_ez = "number", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzaczdvDtoTypeLengths { duv_vyra_txt = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzaczdv*/
	const enum GMzaczdvEnum {
		/**Omezení počtu uchazečů*/
		Omezenipoctuuchazecu=101,
		/**Nesplnění kvalifikačních předpokladů*/
		Nesplnenikvalifikacnichpredpokladu=102,
		/**Mimořádně nízká nabídková cena*/
		Mimoradnenizkanabidkovacena=103,
		/**Neúplná nebo nepřijatelná nabídka*/
		Neuplnaneboneprijatelnanabidka=104,
		/**Jiný důvod vyloučení nabídky*/
		Jinyduvodvylouceninabidky=105,
	}
	function GMzaczdvEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzaczdvEnum, Gordic.Pap.Interface.GMzaczdvDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzacztzDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacztz*/
	interface GMzacztzDto {
		/**DBCOLUMN:mzacztz.typ_ez*/
		typ_ez?: number|null;
		/**DBCOLUMN:mzacztz.typ_ez_txt*/
		typ_ez_txt?: string|null;
		/**DBCOLUMN:mzacztz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacztz.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzacztz.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzacztzDtoNames { typ_ez = "typ_ez", typ_ez_txt = "typ_ez_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzacztzDtoFragments { typ_ez = "*", typ_ez_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzacztzDtoTypes { typ_ez = "number", typ_ez_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzacztzDtoTypeLengths { typ_ez_txt = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzacztz*/
	const enum GMzacztzEnum {
		/**Nadlimitní*/
		Nadlimitni=1,
		/**Podlimitní*/
		Podlimitni=2,
		/**Malého rozsahu*/
		Malehorozsahu=3,
	}
	function GMzacztzEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacztzEnum, Gordic.Pap.Interface.GMzacztzDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Controls\Gordic.Pap.Interface.GMzaczzzDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzaczzz*/
	interface GMzaczzzDto {
		/**DBCOLUMN:mzaczzz.zpus_zah*/
		zpus_zah?: number|null;
		/**DBCOLUMN:mzaczzz.zpus_zah_txt*/
		zpus_zah_txt?: string|null;
		/**DBCOLUMN:mzaczzz.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzaczzz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzaczzz.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzaczzz.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzaczzzDtoNames { zpus_zah = "zpus_zah", zpus_zah_txt = "zpus_zah_txt", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzaczzzDtoFragments { zpus_zah = "*", zpus_zah_txt = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzaczzzDtoTypes { zpus_zah = "number", zpus_zah_txt = "string", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzaczzzDtoTypeLengths { zpus_zah_txt = 254, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzaczzz*/
	const enum GMzaczzzEnum {
		/**Odeslání výzvy k podání žádosti o účast*/
		Odeslanivyzvykpodanizadostioucast=10,
		/**Odeslání výzvy k podání předběžné nabídky*/
		Odeslanivyzvykpodanipredbeznenabidky=20,
		/**Odeslání výzvy k podání nabídky*/
		Odeslanivyzvykpodaninabidky=30,
		/**Odeslání pravidelného předběžného oznámení*/
		Odeslanipravidelnehopredbeznehooznameni=40,
		/**Odeslání oznámení o zahájení zadávacího řízení*/
		Odeslanioznameniozahajenizadavacihorizeni=50,
		/**Odeslání oznámení systému kvalifikace*/
		Odeslanioznamenisystemukvalifikace=60,
		/**Jednání s dodavatelem*/
		Jednanisdodavatelem=70,
		/**Odeslání výzvy k jednání*/
		Odeslanivyzvykjednani=80,
		/**Evidence výsledků zadání mimo NEN*/
		EvidencevysledkuzadanimimoNEN=90,
		/**Odeslání výzvy k podání nabídky jednomu dodavateli*/
		Odeslanivyzvykpodaninabidkyjednomudodavateli=100,
		/**Odeslání výzvy k podání nabídek*/
		Odeslanivyzvykpodaninabidek=110,
		/**Odeslání předběžného oznámení*/
		Odeslanipredbeznehooznameni=120,
		/**Odeslání výzvy k podání předběžných nabídek*/
		Odeslanivyzvykpodanipredbeznychnabidek=130,
		/**Odeslání výzvy k doplnění nabídky*/
		Odeslanivyzvykdoplneninabidky=150,
		/**Odeslání výzvy k poskytnutí plnění*/
		Odeslanivyzvykposkytnutiplneni=160,
		/**Odeslání výzvy k předložení návrhu smlouvy*/
		Odeslanivyzvykpredlozeninavrhusmlouvy=170,
	}
	function GMzaczzzEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzaczzzEnum, Gordic.Pap.Interface.GMzaczzzDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic..Pap.Interface.GMzatdosDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzuc*/
	interface GMzatdosDto {
		/**DBCOLUMN:mzatzuc.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzuc.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzuc.por_cis*/
		por_cis?: number|null;
		/**ixs_dos*/
		ixs_dos?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatsml.sml_dod*/
		sml_dod?: string|null;
		/**DBCOLUMN:mzatsml.id_dod_ci*/
		id_dod_ci?: string|null;
		/**DBCOLUMN:mzatsml.ico_dod*/
		ico_dod?: string|null;
		/**DBCOLUMN:mzatsml.ured_nazev_dod*/
		ured_nazev_dod?: string|null;
		/**DBCOLUMN:mzatzuc.dat_uve*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatdosDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", ixs_dos = "ixs_dos", identifikace = "identifikace", sml_dod = "sml_dod", id_dod_ci = "id_dod_ci", ico_dod = "ico_dod", ured_nazev_dod = "ured_nazev_dod", dat_zmena = "dat_zmena",}
	const enum GMzatdosDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", ixs_dos = "*", identifikace = "*", sml_dod = "*", id_dod_ci = "*", ico_dod = "*", ured_nazev_dod = "*", dat_zmena = "*",}
	const enum GMzatdosDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", ixs_dos = "string", identifikace = "string", sml_dod = "string", id_dod_ci = "string", ico_dod = "string", ured_nazev_dod = "string", dat_zmena = "JsonDate",}
	const enum GMzatdosDtoTypeLengths { sml_dod = 50, id_dod_ci = 50, ico_dod = 50, ured_nazev_dod = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic..Pap.Interface.GMzatpppDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzuc*/
	interface GMzatpppDto {
		/**DBCOLUMN:mzatzuc.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzuc.ikc*/
		ikc?: JsonDecimal|null;
		/**ixs_ppp*/
		ixs_ppp?: string|null;
		/**ixs_prz*/
		ixs_prz?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatzuc.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:mzatsml.sml_dod*/
		nazev_param_prz?: string|null;
		/**DBCOLUMN:mzatsml.sml_dod*/
		hodnota_param_prz?: string|null;
		/**DBCOLUMN:mzatsml.sml_dod*/
		operat_param_prz?: string|null;
		/**DBCOLUMN:mzatzuc.dat_uve*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatpppDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", ixs_ppp = "ixs_ppp", ixs_prz = "ixs_prz", identifikace = "identifikace", por_cis = "por_cis", nazev_param_prz = "nazev_param_prz", hodnota_param_prz = "hodnota_param_prz", operat_param_prz = "operat_param_prz", dat_zmena = "dat_zmena",}
	const enum GMzatpppDtoFragments { log_por_cislo = "*", ikc = "*", ixs_ppp = "*", ixs_prz = "*", identifikace = "*", por_cis = "*", nazev_param_prz = "*", hodnota_param_prz = "*", operat_param_prz = "*", dat_zmena = "*",}
	const enum GMzatpppDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", ixs_ppp = "string", ixs_prz = "string", identifikace = "string", por_cis = "number", nazev_param_prz = "string", hodnota_param_prz = "string", operat_param_prz = "string", dat_zmena = "JsonDate",}
	const enum GMzatpppDtoTypeLengths { nazev_param_prz = 254, hodnota_param_prz = 254, operat_param_prz = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic..Pap.Interface.GMzatzucDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzuc*/
	interface GMzatzucDto {
		/**DBCOLUMN:mzatzuc.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzuc.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzuc.por_cis*/
		por_cis?: number|null;
		/**ixs_zuc*/
		ixs_zuc?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		id_dod_ci?: string|null;
		/**DBCOLUMN:mzatzuc.id_zuc_ci*/
		id_zuc_ci?: string|null;
		/**DBCOLUMN:mzatzuc.ico_zuc*/
		ico_zuc?: string|null;
		/**DBCOLUMN:mzatzuc.uverejnil*/
		uverejnil?: string|null;
		/**DBCOLUMN:mzatzuc.dat_uve*/
		dat_uve?: JsonDate|null;
		/**DBCOLUMN:mzatzuc.uverejnit*/
		uverejnit?: number|null;
		/**DBCOLUMN:mzatzuc.ured_nazev_dod*/
		ured_nazev_dod?: string|null;
		/**DBCOLUMN:mzatzuc.typ_poza*/
		typ_poza?: number|null;
		/**DBCOLUMN:mzatzuc.typ_poza*/
		typ_poza_txt?: string|null;
		/**DBCOLUMN:mzatzuc.dic_zuc*/
		dic_zuc?: string|null;
		/**DBCOLUMN:mzatzuc.dat_narozen*/
		dat_narozen?: JsonDate|null;
		/**DBCOLUMN:mzatzuc.obec*/
		obec?: string|null;
		/**DBCOLUMN:mzatzuc.cast_obce*/
		cast_obce?: string|null;
		/**DBCOLUMN:mzatzuc.ulice*/
		ulice?: string|null;
		/**DBCOLUMN:mzatzuc.cislo_popisne*/
		cislo_popisne?: string|null;
		/**DBCOLUMN:mzatzuc.psc*/
		psc?: string|null;
		/**DBCOLUMN:mzatzuc.stat*/
		stat?: string|null;
		/**DBCOLUMN:mzatzuc.c_zuc_s*/
		c_zuc_s?: JsonDecimal|null;
		/**DBCOLUMN:mzatzuc.c_zuc_bez*/
		c_zuc_bez?: JsonDecimal|null;
		/**DBCOLUMN:mzatzuc.sdruzeni*/
		sdruzeni?: number|null;
		/**DBCOLUMN:mzatzuc.ved_uc_ico_zuc*/
		ved_uc_ico_zuc?: string|null;
		/**DBCOLUMN:mzatzuc.ved_uc_ured_naz*/
		ved_uc_ured_naz?: string|null;
		/**DBCOLUMN:mzatzuc.dat_podani*/
		dat_podani?: JsonDate|null;
		/**DBCOLUMN:mzatzuc.vyr_ods_odmi*/
		vyr_ods_odmi?: number|null;
		/**DBCOLUMN:mzatzuc.duv_vyra*/
		duv_vyra?: number|null;
		/**DBCOLUMN:mzatzuc.duv_vyra*/
		duv_vyra_txt?: string|null;
		/**DBCOLUMN:mzatzuc.vyr_mimo_cena*/
		vyr_mimo_cena?: number|null;
		/**DBCOLUMN:mzatzuc.vyr_mimo_odu*/
		vyr_mimo_odu?: string|null;
		/**DBCOLUMN:mzatzuc.dat_zmena*/
		dat_zmena?: JsonDate|null;
		sdruzeni_an?: string|null;
		vyr_ods_odmi_an?: string|null;
		vyr_mimo_cena_an?: string|null;
		uverejnit_an?: string|null;
	}
	const enum GMzatzucDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", ixs_zuc = "ixs_zuc", identifikace = "identifikace", id_dod_ci = "id_dod_ci", id_zuc_ci = "id_zuc_ci", ico_zuc = "ico_zuc", uverejnil = "uverejnil", dat_uve = "dat_uve", uverejnit = "uverejnit", ured_nazev_dod = "ured_nazev_dod", typ_poza = "typ_poza", typ_poza_txt = "typ_poza_txt", dic_zuc = "dic_zuc", dat_narozen = "dat_narozen", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cislo_popisne = "cislo_popisne", psc = "psc", stat = "stat", c_zuc_s = "c_zuc_s", c_zuc_bez = "c_zuc_bez", sdruzeni = "sdruzeni", ved_uc_ico_zuc = "ved_uc_ico_zuc", ved_uc_ured_naz = "ved_uc_ured_naz", dat_podani = "dat_podani", vyr_ods_odmi = "vyr_ods_odmi", duv_vyra = "duv_vyra", duv_vyra_txt = "duv_vyra_txt", vyr_mimo_cena = "vyr_mimo_cena", vyr_mimo_odu = "vyr_mimo_odu", dat_zmena = "dat_zmena", sdruzeni_an = "sdruzeni_an", vyr_ods_odmi_an = "vyr_ods_odmi_an", vyr_mimo_cena_an = "vyr_mimo_cena_an", uverejnit_an = "uverejnit_an",}
	const enum GMzatzucDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", ixs_zuc = "*", identifikace = "*", id_dod_ci = "*", id_zuc_ci = "*", ico_zuc = "*", uverejnil = "*", dat_uve = "*", uverejnit = "*", ured_nazev_dod = "*", typ_poza = "*", typ_poza_txt = "*", dic_zuc = "*", dat_narozen = "*", obec = "*", cast_obce = "*", ulice = "*", cislo_popisne = "*", psc = "*", stat = "*", c_zuc_s = "*", c_zuc_bez = "*", sdruzeni = "*", ved_uc_ico_zuc = "*", ved_uc_ured_naz = "*", dat_podani = "*", vyr_ods_odmi = "*", duv_vyra = "*", duv_vyra_txt = "*", vyr_mimo_cena = "*", vyr_mimo_odu = "*", dat_zmena = "*", sdruzeni_an = "*", vyr_ods_odmi_an = "*", vyr_mimo_cena_an = "*", uverejnit_an = "*",}
	const enum GMzatzucDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", ixs_zuc = "string", identifikace = "string", id_dod_ci = "string", id_zuc_ci = "string", ico_zuc = "string", uverejnil = "string", dat_uve = "JsonDate", uverejnit = "number", ured_nazev_dod = "string", typ_poza = "number", typ_poza_txt = "string", dic_zuc = "string", dat_narozen = "JsonDate", obec = "string", cast_obce = "string", ulice = "string", cislo_popisne = "string", psc = "string", stat = "string", c_zuc_s = "JsonDecimal", c_zuc_bez = "JsonDecimal", sdruzeni = "number", ved_uc_ico_zuc = "string", ved_uc_ured_naz = "string", dat_podani = "JsonDate", vyr_ods_odmi = "number", duv_vyra = "number", duv_vyra_txt = "string", vyr_mimo_cena = "number", vyr_mimo_odu = "string", dat_zmena = "JsonDate", sdruzeni_an = "string", vyr_ods_odmi_an = "string", vyr_mimo_cena_an = "string", uverejnit_an = "string",}
	const enum GMzatzucDtoTypeLengths { id_dod_ci = 50, id_zuc_ci = 50, ico_zuc = 50, uverejnil = 254, ured_nazev_dod = 254, dic_zuc = 20, obec = 254, cast_obce = 50, ulice = 100, cislo_popisne = 50, psc = 5, stat = 5, ved_uc_ico_zuc = 50, ved_uc_ured_naz = 254, vyr_mimo_odu = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzacceuDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzacceu*/
	interface GMzacceuDto {
		/**DBCOLUMN:mzacceu.cis_ceu*/
		cis_ceu?: number|null;
		/**DBCOLUMN:mzacceu.cis_ceu_txt*/
		cis_ceu_txt?: string|null;
		/**DBCOLUMN:mzacceu.popis*/
		popis?: string|null;
		/**DBCOLUMN:mzacceu.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:mzacceu.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:mzacceu.k_xml*/
		k_xml?: string|null;
	}
	const enum GMzacceuDtoNames { cis_ceu = "cis_ceu", cis_ceu_txt = "cis_ceu_txt", popis = "popis", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GMzacceuDtoFragments { cis_ceu = "*", cis_ceu_txt = "*", popis = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GMzacceuDtoTypes { cis_ceu = "number", cis_ceu_txt = "string", popis = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GMzacceuDtoTypeLengths { cis_ceu_txt = 50, popis = 254, k_s = 15, k_xml = 254,}
	/**ENUM:mzacceu*/
	const enum GMzacceuEnum {
		/**Neurčeno*/
		_0=0,
	}
	function GMzacceuEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GMzacceuEnum, Gordic.Pap.Interface.GMzacceuDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatdinDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatdin*/
	interface GMzatdinDto {
		/**DBCOLUMN:mzatdin.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatdin.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatdin.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:mzatdin.id_din_ci*/
		id_din_ci?: string|null;
		/**DBCOLUMN:mzatdin.id_din_go*/
		id_din_go?: string|null;
		/**DBCOLUMN:mzatdin.odpoved_din*/
		odpoved_din?: string|null;
		/**DBCOLUMN:mzatdin.priz_uve*/
		priz_uve?: number|null;
		/**DBCOLUMN:mzatdin.uverejnil*/
		uverejnil?: string|null;
		/**DBCOLUMN:mzatdin.dat_uve*/
		dat_uve?: JsonDate|null;
		/**DBCOLUMN:mzatdin.dat_odu*/
		dat_odu?: JsonDate|null;
		/**DBCOLUMN:mzatdin.oduverejnil*/
		oduverejnil?: string|null;
		/**DBCOLUMN:mzatdin.ico_dod*/
		ico_dod?: string|null;
		/**DBCOLUMN:mzatdin.dotaz_din*/
		dotaz_din?: string|null;
		/**DBCOLUMN:mzatdin.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatdinDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", id_din_ci = "id_din_ci", id_din_go = "id_din_go", odpoved_din = "odpoved_din", priz_uve = "priz_uve", uverejnil = "uverejnil", dat_uve = "dat_uve", dat_odu = "dat_odu", oduverejnil = "oduverejnil", ico_dod = "ico_dod", dotaz_din = "dotaz_din", dat_zmena = "dat_zmena",}
	const enum GMzatdinDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", id_din_ci = "*", id_din_go = "*", odpoved_din = "*", priz_uve = "*", uverejnil = "*", dat_uve = "*", dat_odu = "*", oduverejnil = "*", ico_dod = "*", dotaz_din = "*", dat_zmena = "*",}
	const enum GMzatdinDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", id_din_ci = "string", id_din_go = "string", odpoved_din = "string", priz_uve = "number", uverejnil = "string", dat_uve = "JsonDate", dat_odu = "JsonDate", oduverejnil = "string", ico_dod = "string", dotaz_din = "string", dat_zmena = "JsonDate",}
	const enum GMzatdinDtoTypeLengths { id_din_ci = 50, id_din_go = 50, odpoved_din = 2000, uverejnil = 254, oduverejnil = 254, ico_dod = 50, dotaz_din = 2000,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatdonDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatdon*/
	interface GMzatdonDto {
		/**DBCOLUMN:mzatdon.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatdon.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatdon.por_cis*/
		por_cis?: number|null;
		/**ixs_don*/
		ixs_don?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatdon.id_don_ci*/
		id_don_ci?: string|null;
		/**DBCOLUMN:mzatdon.id_don_go*/
		id_don_go?: string|null;
		/**DBCOLUMN:mzatdon.url_don*/
		url_don?: string|null;
		/**DBCOLUMN:mzatdon.file_don*/
		file_don?: JsonBlob|null;
		/**DBCOLUMN:mzatdon.nazev_don*/
		nazev_don?: string|null;
		/**DBCOLUMN:mzatdon.typ_doza*/
		typ_doza?: number|null;
		/**DBCOLUMN:mzatdon.typ_doza*/
		typ_doza_txt?: string|null;
		/**DBCOLUMN:mzatdon.popis_don*/
		popis_don?: string|null;
		/**DBCOLUMN:mzatdon.dat_vlo_pro*/
		dat_vlo_pro?: JsonDate|null;
		/**DBCOLUMN:mzatdon.priz_uve*/
		priz_uve?: number|null;
		/**DBCOLUMN:mzatdon.uverejnil*/
		uverejnil?: string|null;
		/**DBCOLUMN:mzatdon.dat_odu_pro*/
		dat_odu_pro?: JsonDate|null;
		/**DBCOLUMN:mzatdon.oduverejnil*/
		oduverejnil?: string|null;
		/**DBCOLUMN:mzatdon.cislo_verze*/
		cislo_verze?: number|null;
		/**DBCOLUMN:mzatdon.datovy_otisk*/
		datovy_otisk?: string|null;
		/**DBCOLUMN:mzatdon.smazat*/
		smazat?: number|null;
		/**DBCOLUMN:mzatdon.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzatdon.soubor_jmeno*/
		soubor_jmeno?: string|null;
		/**ixs_sdo*/
		ixs_sdo?: string|null;
		priz_uve_an?: string|null;
		smazat_an?: string|null;
	}
	const enum GMzatdonDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", ixs_don = "ixs_don", identifikace = "identifikace", id_don_ci = "id_don_ci", id_don_go = "id_don_go", url_don = "url_don", file_don = "file_don", nazev_don = "nazev_don", typ_doza = "typ_doza", typ_doza_txt = "typ_doza_txt", popis_don = "popis_don", dat_vlo_pro = "dat_vlo_pro", priz_uve = "priz_uve", uverejnil = "uverejnil", dat_odu_pro = "dat_odu_pro", oduverejnil = "oduverejnil", cislo_verze = "cislo_verze", datovy_otisk = "datovy_otisk", smazat = "smazat", dat_zmena = "dat_zmena", soubor_jmeno = "soubor_jmeno", ixs_sdo = "ixs_sdo", priz_uve_an = "priz_uve_an", smazat_an = "smazat_an",}
	const enum GMzatdonDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", ixs_don = "*", identifikace = "*", id_don_ci = "*", id_don_go = "*", url_don = "*", file_don = "*", nazev_don = "*", typ_doza = "*", typ_doza_txt = "*", popis_don = "*", dat_vlo_pro = "*", priz_uve = "*", uverejnil = "*", dat_odu_pro = "*", oduverejnil = "*", cislo_verze = "*", datovy_otisk = "*", smazat = "*", dat_zmena = "*", soubor_jmeno = "*", ixs_sdo = "*", priz_uve_an = "*", smazat_an = "*",}
	const enum GMzatdonDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", ixs_don = "string", identifikace = "string", id_don_ci = "string", id_don_go = "string", url_don = "string", file_don = "JsonBlob", nazev_don = "string", typ_doza = "number", typ_doza_txt = "string", popis_don = "string", dat_vlo_pro = "JsonDate", priz_uve = "number", uverejnil = "string", dat_odu_pro = "JsonDate", oduverejnil = "string", cislo_verze = "number", datovy_otisk = "string", smazat = "number", dat_zmena = "JsonDate", soubor_jmeno = "string", ixs_sdo = "string", priz_uve_an = "string", smazat_an = "string",}
	const enum GMzatdonDtoTypeLengths { id_don_ci = 50, id_don_go = 50, url_don = 254, nazev_don = 500, popis_don = 500, uverejnil = 254, oduverejnil = 254, datovy_otisk = 128,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatprzDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatprz*/
	interface GMzatprzDto {
		/**DBCOLUMN:mzatprz.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatprz.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatprz.por_cis*/
		por_cis?: number|null;
		/**ixs_prz*/
		ixs_prz?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatprz.nazev_prz*/
		nazev_prz?: string|null;
		/**DBCOLUMN:mzatprz.cpv*/
		cpv?: string|null;
		/**DBCOLUMN:mzatprz.popis_prz*/
		popis_prz?: string|null;
		/**DBCOLUMN:mzatprz.nipez*/
		nipez?: string|null;
		/**DBCOLUMN:mzatprz.m_prz*/
		m_prz?: JsonDecimal|null;
		/**DBCOLUMN:mzatprz.jednot_prz*/
		jednot_prz?: string|null;
		/**DBCOLUMN:mzatprz.nuts_mist_pln*/
		nuts_mist_pln?: string|null;
		/**DBCOLUMN:mzatprz.mist_pln*/
		mist_pln?: string|null;
		/**DBCOLUMN:mzatprz.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatprzDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", ixs_prz = "ixs_prz", identifikace = "identifikace", nazev_prz = "nazev_prz", cpv = "cpv", popis_prz = "popis_prz", nipez = "nipez", m_prz = "m_prz", jednot_prz = "jednot_prz", nuts_mist_pln = "nuts_mist_pln", mist_pln = "mist_pln", dat_zmena = "dat_zmena",}
	const enum GMzatprzDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", ixs_prz = "*", identifikace = "*", nazev_prz = "*", cpv = "*", popis_prz = "*", nipez = "*", m_prz = "*", jednot_prz = "*", nuts_mist_pln = "*", mist_pln = "*", dat_zmena = "*",}
	const enum GMzatprzDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", ixs_prz = "string", identifikace = "string", nazev_prz = "string", cpv = "string", popis_prz = "string", nipez = "string", m_prz = "JsonDecimal", jednot_prz = "string", nuts_mist_pln = "string", mist_pln = "string", dat_zmena = "JsonDate",}
	const enum GMzatprzDtoTypeLengths { nazev_prz = 128, cpv = 20, popis_prz = 2000, nipez = 20, jednot_prz = 128, nuts_mist_pln = 5, mist_pln = 250,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatsdoDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatsdo*/
	interface GMzatsdoDto {
		/**DBCOLUMN:mzatsdo.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatsdo.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatsdo.por_cis*/
		por_cis?: number|null;
		/**ixs_sdo*/
		ixs_sdo?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatsdo.id_sdo_ci*/
		id_sdo_ci?: string|null;
		/**DBCOLUMN:mzatsdo.id_sdo_go*/
		id_sdo_go?: string|null;
		/**DBCOLUMN:mzatsdo.dat_podpis*/
		dat_podpis?: JsonDate|null;
		/**DBCOLUMN:mzatsdo.zmenene_udj*/
		zmenene_udj?: string|null;
		/**DBCOLUMN:mzatsdo.odkaz_sdo*/
		odkaz_sdo?: string|null;
		/**DBCOLUMN:mzatsdo.priz_uve*/
		priz_uve?: number|null;
		priz_uve_an?: string|null;
		/**DBCOLUMN:mzatsdo.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatsdoDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", ixs_sdo = "ixs_sdo", identifikace = "identifikace", id_sdo_ci = "id_sdo_ci", id_sdo_go = "id_sdo_go", dat_podpis = "dat_podpis", zmenene_udj = "zmenene_udj", odkaz_sdo = "odkaz_sdo", priz_uve = "priz_uve", priz_uve_an = "priz_uve_an", dat_zmena = "dat_zmena",}
	const enum GMzatsdoDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", ixs_sdo = "*", identifikace = "*", id_sdo_ci = "*", id_sdo_go = "*", dat_podpis = "*", zmenene_udj = "*", odkaz_sdo = "*", priz_uve = "*", priz_uve_an = "*", dat_zmena = "*",}
	const enum GMzatsdoDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", ixs_sdo = "string", identifikace = "string", id_sdo_ci = "string", id_sdo_go = "string", dat_podpis = "JsonDate", zmenene_udj = "string", odkaz_sdo = "string", priz_uve = "number", priz_uve_an = "string", dat_zmena = "JsonDate",}
	const enum GMzatsdoDtoTypeLengths { id_sdo_ci = 50, id_sdo_go = 50, zmenene_udj = 2000, odkaz_sdo = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatsmlDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatsml*/
	interface GMzatsmlDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:mzatsml.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatsml.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatsml.por_cis*/
		por_cis?: number|null;
		ixp?: string|null;
		/**ixs_sml*/
		ixs_sml?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatsml.id_sml_ci*/
		id_sml_ci?: string|null;
		/**DBCOLUMN:mzatsml.id_sml_go*/
		id_sml_go?: string|null;
		/**DBCOLUMN:mzatsml.priz_uve*/
		priz_uve?: number|null;
		/**DBCOLUMN:mzatsml.uverejnil*/
		uverejnil?: string|null;
		/**DBCOLUMN:mzatsml.dat_uve*/
		dat_uve?: JsonDate|null;
		/**DBCOLUMN:mzatsml.c_celk_sml_bez*/
		c_celk_sml_bez?: JsonDecimal|null;
		/**DBCOLUMN:mzatsml.c_celk_sml_s*/
		c_celk_sml_s?: JsonDecimal|null;
		/**DBCOLUMN:mzatsml.dat_podpis*/
		dat_podpis?: JsonDate|null;
		/**DBCOLUMN:mzatsml.evid_cislo_sml*/
		evid_cislo_sml?: string|null;
		/**DBCOLUMN:mzatsml.neurc_doba*/
		neurc_doba?: number|null;
		/**DBCOLUMN:mzatsml.uver_jinak*/
		uver_jinak?: number|null;
		/**DBCOLUMN:mzatsml.odkaz_sml*/
		odkaz_sml?: string|null;
		/**DBCOLUMN:mzatsml.platnost*/
		platnost?: number|null;
		/**DBCOLUMN:mzatsml.dat_odu*/
		dat_odu?: JsonDate|null;
		/**DBCOLUMN:mzatsml.oduverejnil*/
		oduverejnil?: string|null;
		/**DBCOLUMN:mzatsml.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**priz_uve_an*/
		priz_uve_an?: string|null;
		/**neurc_doba_an*/
		neurc_doba_an?: string|null;
		/**uver_jinak_an*/
		uver_jinak_an?: string|null;
		/**platnost_an*/
		platnost_an?: string|null;
	}
	const enum GMzatsmlDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", ixp = "ixp", ixs_sml = "ixs_sml", identifikace = "identifikace", id_sml_ci = "id_sml_ci", id_sml_go = "id_sml_go", priz_uve = "priz_uve", uverejnil = "uverejnil", dat_uve = "dat_uve", c_celk_sml_bez = "c_celk_sml_bez", c_celk_sml_s = "c_celk_sml_s", dat_podpis = "dat_podpis", evid_cislo_sml = "evid_cislo_sml", neurc_doba = "neurc_doba", uver_jinak = "uver_jinak", odkaz_sml = "odkaz_sml", platnost = "platnost", dat_odu = "dat_odu", oduverejnil = "oduverejnil", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", priz_uve_an = "priz_uve_an", neurc_doba_an = "neurc_doba_an", uver_jinak_an = "uver_jinak_an", platnost_an = "platnost_an", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum GMzatsmlDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", ixp = "*", ixs_sml = "*", identifikace = "*", id_sml_ci = "*", id_sml_go = "*", priz_uve = "*", uverejnil = "*", dat_uve = "*", c_celk_sml_bez = "*", c_celk_sml_s = "*", dat_podpis = "*", evid_cislo_sml = "*", neurc_doba = "*", uver_jinak = "*", odkaz_sml = "*", platnost = "*", dat_odu = "*", oduverejnil = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*", priz_uve_an = "*", neurc_doba_an = "*", uver_jinak_an = "*", platnost_an = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum GMzatsmlDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", ixp = "string", ixs_sml = "string", identifikace = "string", id_sml_ci = "string", id_sml_go = "string", priz_uve = "number", uverejnil = "string", dat_uve = "JsonDate", c_celk_sml_bez = "JsonDecimal", c_celk_sml_s = "JsonDecimal", dat_podpis = "JsonDate", evid_cislo_sml = "string", neurc_doba = "number", uver_jinak = "number", odkaz_sml = "string", platnost = "number", dat_odu = "JsonDate", oduverejnil = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", priz_uve_an = "string", neurc_doba_an = "string", uver_jinak_an = "string", platnost_an = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum GMzatsmlDtoTypeLengths { id_sml_ci = 50, id_sml_go = 50, uverejnil = 254, evid_cislo_sml = 128, odkaz_sml = 254, oduverejnil = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatsplDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatspl*/
	interface GMzatsplDto {
		/**DBCOLUMN:mzatspl.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatspl.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatspl.por_cis*/
		por_cis?: number|null;
		/**ixs_spl*/
		ixs_spl?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatspl.sml_dod*/
		sml_dod?: string|null;
		/**DBCOLUMN:mzatspl.id_dod_ci*/
		id_dod_ci?: string|null;
		/**DBCOLUMN:mzatspl.ico_dod*/
		ico_dod?: string|null;
		/**DBCOLUMN:mzatspl.ured_nazev_dod*/
		ured_nazev_dod?: string|null;
		/**DBCOLUMN:mzatspl.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:mzatspl.c_rok_sml_bez*/
		c_rok_sml_bez?: JsonDecimal|null;
		/**DBCOLUMN:mzatspl.c_rok_sml_s*/
		c_rok_sml_s?: JsonDecimal|null;
		/**DBCOLUMN:mzatspl.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatsplDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", ixs_spl = "ixs_spl", identifikace = "identifikace", sml_dod = "sml_dod", id_dod_ci = "id_dod_ci", ico_dod = "ico_dod", ured_nazev_dod = "ured_nazev_dod", rok_sml = "rok_sml", c_rok_sml_bez = "c_rok_sml_bez", c_rok_sml_s = "c_rok_sml_s", dat_zmena = "dat_zmena",}
	const enum GMzatsplDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", ixs_spl = "*", identifikace = "*", sml_dod = "*", id_dod_ci = "*", ico_dod = "*", ured_nazev_dod = "*", rok_sml = "*", c_rok_sml_bez = "*", c_rok_sml_s = "*", dat_zmena = "*",}
	const enum GMzatsplDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", ixs_spl = "string", identifikace = "string", sml_dod = "string", id_dod_ci = "string", ico_dod = "string", ured_nazev_dod = "string", rok_sml = "number", c_rok_sml_bez = "JsonDecimal", c_rok_sml_s = "JsonDecimal", dat_zmena = "JsonDate",}
	const enum GMzatsplDtoTypeLengths { sml_dod = 50, id_dod_ci = 50, ico_dod = 50, ured_nazev_dod = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatssuDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatssu*/
	interface GMzatssuDto {
		/**DBCOLUMN:mzatssu.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatssu.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatssu.por_cis*/
		por_cis?: number|null;
		/**ixs_ssd*/
		ixs_ssd?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatssu.ssu_dod*/
		ssu_dod?: string|null;
		/**DBCOLUMN:mzatssu.ured_nazev_ssu*/
		ured_nazev_ssu?: string|null;
		/**DBCOLUMN:mzatssu.ico_ssu*/
		ico_ssu?: string|null;
		/**DBCOLUMN:mzatssu.dic_ssu*/
		dic_ssu?: string|null;
		/**DBCOLUMN:mzatssu.dat_narozen*/
		dat_narozen?: JsonDate|null;
		/**DBCOLUMN:mzatssu.obec*/
		obec?: string|null;
		/**DBCOLUMN:mzatssu.cast_obce*/
		cast_obce?: string|null;
		/**DBCOLUMN:mzatssu.ulice*/
		ulice?: string|null;
		/**DBCOLUMN:mzatssu.cislo_popisne*/
		cislo_popisne?: string|null;
		/**DBCOLUMN:mzatssu.psc*/
		psc?: string|null;
		/**DBCOLUMN:mzatssu.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatssuDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", ixs_ssd = "ixs_ssd", identifikace = "identifikace", ssu_dod = "ssu_dod", ured_nazev_ssu = "ured_nazev_ssu", ico_ssu = "ico_ssu", dic_ssu = "dic_ssu", dat_narozen = "dat_narozen", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cislo_popisne = "cislo_popisne", psc = "psc", dat_zmena = "dat_zmena",}
	const enum GMzatssuDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", ixs_ssd = "*", identifikace = "*", ssu_dod = "*", ured_nazev_ssu = "*", ico_ssu = "*", dic_ssu = "*", dat_narozen = "*", obec = "*", cast_obce = "*", ulice = "*", cislo_popisne = "*", psc = "*", dat_zmena = "*",}
	const enum GMzatssuDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", ixs_ssd = "string", identifikace = "string", ssu_dod = "string", ured_nazev_ssu = "string", ico_ssu = "string", dic_ssu = "string", dat_narozen = "JsonDate", obec = "string", cast_obce = "string", ulice = "string", cislo_popisne = "string", psc = "string", dat_zmena = "JsonDate",}
	const enum GMzatssuDtoTypeLengths { ssu_dod = 50, ured_nazev_ssu = 254, ico_ssu = 50, dic_ssu = 20, obec = 254, cast_obce = 50, ulice = 100, cislo_popisne = 50, psc = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatzakDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzak*/
	interface GMzatzakDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		ixs_zak?: string|null;
		/**DBCOLUMN:mzatzak.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzak.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzak.por_cis*/
		por_cis?: number|null;
		/**
		*     identifikace
		*     
		*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatzak.id_zak_ci*/
		ixp?: string|null;
		/**DBCOLUMN:mzatzak.id_zak_ci*/
		id_zak_ci?: string|null;
		/**DBCOLUMN:mzatzak.id_zak_go*/
		id_zak_go?: string|null;
		/**DBCOLUMN:mzatzak.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:mzatzak.stav_zak*/
		stav_zak?: number|null;
		/**DBCOLUMN:mzatzak.stav_zak*/
		stav_zak_txt?: string|null;
		/**DBCOLUMN:mzatzak.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:mzatzak.ixp_den*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:mzatzak.postup_zad  !!(gin_nen_poszad)!!*/
		postup_zad?: string|null;
		/**DBCOLUMN:mzatzak.druh_zad_riz*/
		druh_zad_riz?: number|null;
		/**DBCOLUMN:mzatzak.druh_zad_riz*/
		druh_zad_riz_txt?: string|null;
		/**DBCOLUMN:mzatzak.na_zaklad_zvz*/
		na_zaklad_zvz?: number|null;
		/**DBCOLUMN:mzatzak.zak_planov*/
		zak_planov?: number|null;
		/**DBCOLUMN:mzatzak.spis_cislo*/
		spis_cislo?: string|null;
		/**DBCOLUMN:mzatzak.kod_vz_profil*/
		kod_vz_profil?: string|null;
		/**DBCOLUMN:mzatzak.puv_kod_vz_pro*/
		puv_kod_vz_pro?: string|null;
		/**DBCOLUMN:mzatzak.kod_souvz_profil*/
		kod_souvz_profil?: string|null;
		/**DBCOLUMN:mzatzak.evi_cislo_vevz*/
		evi_cislo_vevz?: string|null;
		/**DBCOLUMN:mzatzak.evi_cislo_ted*/
		evi_cislo_ted?: string|null;
		/**DBCOLUMN:mzatzak.evi_cislo_int*/
		evi_cislo_int?: string|null;
		/**DBCOLUMN:mzatzak.jednaci_cislo*/
		jednaci_cislo?: string|null;
		/**DBCOLUMN:mzatzak.syst_cislo_ien*/
		syst_cislo_ien?: string|null;
		/**DBCOLUMN:mzatzak.dalsi_spec*/
		dalsi_spec?: string|null;
		/**DBCOLUMN:mzatzak.typ_ez*/
		typ_ez?: number|null;
		/**DBCOLUMN:mzatzak.typ_ez*/
		typ_ez_txt?: string|null;
		/**DBCOLUMN:mzatzak.typ_sml*/
		typ_sml?: number|null;
		/**DBCOLUMN:mzatzak.typ_sml*/
		typ_sml_txt?: string|null;
		/**DBCOLUMN:mzatzak.uver_sez_uc*/
		uver_sez_uc?: number|null;
		/**DBCOLUMN:mzatzak.typ_ram_sml*/
		typ_ram_sml?: number|null;
		/**DBCOLUMN:mzatzak.typ_ram_sml*/
		typ_ram_sml_txt?: string|null;
		/**DBCOLUMN:mzatzak.vz_obr_bezp*/
		vz_obr_bezp?: number|null;
		/**DBCOLUMN:mzatzak.vz_soc_sluz*/
		vz_soc_sluz?: number|null;
		/**DBCOLUMN:mzatzak.druh_zak*/
		druh_zak?: number|null;
		/**DBCOLUMN:mzatzak.druh_zak*/
		druh_zak_txt?: string|null;
		/**DBCOLUMN:mzatzak.typ_poza*/
		typ_poza?: number|null;
		/**DBCOLUMN:mzatzak.typ_poza*/
		typ_poza_txt?: string|null;
		/**DBCOLUMN:mzatzak.zpus_zah*/
		zpus_zah?: number|null;
		/**DBCOLUMN:mzatzak.zpus_zah*/
		zpus_zah_txt?: string|null;
		/**DBCOLUMN:mzatzak.lhu_pod_nab*/
		lhu_pod_nab?: JsonDate|null;
		/**DBCOLUMN:mzatzak.dat_ote_nab*/
		dat_ote_nab?: JsonDate|null;
		/**DBCOLUMN:mzatzak.lhu_pod_nav*/
		lhu_pod_nav?: JsonDate|null;
		/**DBCOLUMN:mzatzak.dat_ote_nav*/
		dat_ote_nav?: JsonDate|null;
		/**DBCOLUMN:mzatzak.lhu_pod_inf*/
		lhu_pod_inf?: JsonDate|null;
		/**DBCOLUMN:mzatzak.dat_ote_inf*/
		dat_ote_inf?: JsonDate|null;
		/**DBCOLUMN:mzatzak.lhu_pod_uca*/
		lhu_pod_uca?: JsonDate|null;
		/**DBCOLUMN:mzatzak.dat_ote_uca*/
		dat_ote_uca?: JsonDate|null;
		/**DBCOLUMN:mzatzak.lhu_pod_pre*/
		lhu_pod_pre?: JsonDate|null;
		/**DBCOLUMN:mzatzak.dat_ote_pre*/
		dat_ote_pre?: JsonDate|null;
		/**DBCOLUMN:mzatzak.lhu_pod_pza*/
		lhu_pod_pza?: JsonDate|null;
		/**DBCOLUMN:mzatzak.dat_ote_pza*/
		dat_ote_pza?: JsonDate|null;
		/**DBCOLUMN:mzatzak.zpus_podani*/
		zpus_podani?: string|null;
		/**DBCOLUMN:mzatzak.sifr_podani*/
		sifr_podani?: number|null;
		/**DBCOLUMN:mzatzak.variant_nab*/
		variant_nab?: number|null;
		/**DBCOLUMN:mzatzak.popis_predmet*/
		popis_predmet?: string|null;
		/**DBCOLUMN:mzatzak.hlavni_cpv*/
		hlavni_cpv?: string|null;
		/**DBCOLUMN:mzatzak.hlavni_nipez*/
		hlavni_nipez?: string|null;
		/**DBCOLUMN:mzatzak.nuts_mist_pln*/
		nuts_mist_pln?: string|null;
		/**DBCOLUMN:mzatzak.mist_pln*/
		mist_pln?: string|null;
		/**DBCOLUMN:mzatzak.dns_ref_kod*/
		dns_ref_kod?: string|null;
		/**DBCOLUMN:mzatzak.dns_ref_nazev*/
		dns_ref_nazev?: string|null;
		/**DBCOLUMN:mzatzak.c_predp_bez*/
		c_predp_bez?: JsonDecimal|null;
		/**DBCOLUMN:mzatzak.hodnota_uve*/
		hodnota_uve?: number|null;
		/**DBCOLUMN:mzatzak.rs_smlouva*/
		rs_smlouva?: number|null;
		/**DBCOLUMN:mzatzak.evi_cislo_rs*/
		evi_cislo_rs?: string|null;
		/**DBCOLUMN:mzatzak.c_predp_s*/
		c_predp_s?: JsonDecimal|null;
		/**DBCOLUMN:mzatzak.central_zad*/
		central_zad?: number|null;
		/**DBCOLUMN:mzatzak.zaved_dns*/
		zaved_dns?: number|null;
		/**DBCOLUMN:mzatzak.kriter_hodnoc*/
		kriter_hodnoc?: number|null;
		/**DBCOLUMN:mzatzak.dat_uve*/
		dat_uve?: JsonDate|null;
		/**DBCOLUMN:mzatzak.dat_zah*/
		dat_zah?: JsonDate|null;
		/**DBCOLUMN:mzatzak.dat_zru*/
		dat_zru?: JsonDate|null;
		/**DBCOLUMN:mzatzak.uverejnit*/
		uverejnit?: number|null;
		/**DBCOLUMN:mzatzak.uzamknout*/
		uzamknout?: number|null;
		/**DBCOLUMN:mzatzak.vyjim_ze_zvz*/
		vyjim_ze_zvz?: number|null;
		/**DBCOLUMN:mzatzak.duvod_vyjim*/
		ko_osoba_nazev?: string|null;
		/**DBCOLUMN:mzatzak.duvod_vyjim*/
		duvod_vyjim?: string|null;
		/**DBCOLUMN:mzatzak.duvod_vyjim*/
		id_nen_tsez?: string|null;
		/**DBCOLUMN:mzatzak.ver_klic_utv*/
		ver_klic_utv?: number|null;
		/**DBCOLUMN:mzatzak.spec_lhu_cest*/
		spec_lhu_cest?: number|null;
		/**DBCOLUMN:mzatzak.spec_lhu_cest*/
		priz_cast_go?: number|null;
		/**DBCOLUMN:mzatzak.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzatzak.spec_lhu_cest*/
		count?: number|null;
		/**DBCOLUMN:Detail.zmenu_prov*/
		zmenu_prov?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**ano-ne pole*/
		uver_sez_uc_an?: string|null;
		/**ano-ne pole*/
		vz_obr_bezp_an?: string|null;
		/**ano-ne pole*/
		vz_soc_sluz_an?: string|null;
		/**ano-ne pole*/
		sifr_podani_an?: string|null;
		/**ano-ne pole*/
		variant_nab_an?: string|null;
		/**ano-ne pole*/
		priz_cast_go_an?: string|null;
		/**ano-ne pole*/
		na_zaklad_zvz_an?: string|null;
		/**ano-ne pole*/
		zak_planov_an?: string|null;
		/**ano-ne pole*/
		uverejnit_an?: string|null;
		/**ano-ne pole*/
		uzamknout_an?: string|null;
		/**ano-ne pole*/
		vyjim_ze_zvz_an?: string|null;
		/**ano-ne pole*/
		ver_klic_utv_an?: string|null;
		/**ano-ne pole*/
		spec_lhu_cest_an?: string|null;
		/**ano-ne pole*/
		central_zad_an?: string|null;
		/**ano-ne pole*/
		zaved_dns_an?: string|null;
		/**ano-ne pole*/
		kriter_hodnoc_an?: string|null;
		/**ano-ne pole*/
		hodnota_uve_an?: string|null;
		/**ano-ne pole*/
		rs_smlouva_an?: string|null;
		/**PocetDokumentu*/
		pocetDokumentu?: number|null;
	}
	const enum GMzatzakDtoNames { ixs_zak = "ixs_zak", log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", identifikace = "identifikace", ixp = "ixp", id_zak_ci = "id_zak_ci", id_zak_go = "id_zak_go", nazev = "nazev", stav_zak = "stav_zak", stav_zak_txt = "stav_zak_txt", ixp_den = "ixp_den", ixp_den_nazev = "ixp_den_nazev", postup_zad = "postup_zad", druh_zad_riz = "druh_zad_riz", druh_zad_riz_txt = "druh_zad_riz_txt", na_zaklad_zvz = "na_zaklad_zvz", zak_planov = "zak_planov", spis_cislo = "spis_cislo", kod_vz_profil = "kod_vz_profil", puv_kod_vz_pro = "puv_kod_vz_pro", kod_souvz_profil = "kod_souvz_profil", evi_cislo_vevz = "evi_cislo_vevz", evi_cislo_ted = "evi_cislo_ted", evi_cislo_int = "evi_cislo_int", jednaci_cislo = "jednaci_cislo", syst_cislo_ien = "syst_cislo_ien", dalsi_spec = "dalsi_spec", typ_ez = "typ_ez", typ_ez_txt = "typ_ez_txt", typ_sml = "typ_sml", typ_sml_txt = "typ_sml_txt", uver_sez_uc = "uver_sez_uc", typ_ram_sml = "typ_ram_sml", typ_ram_sml_txt = "typ_ram_sml_txt", vz_obr_bezp = "vz_obr_bezp", vz_soc_sluz = "vz_soc_sluz", druh_zak = "druh_zak", druh_zak_txt = "druh_zak_txt", typ_poza = "typ_poza", typ_poza_txt = "typ_poza_txt", zpus_zah = "zpus_zah", zpus_zah_txt = "zpus_zah_txt", lhu_pod_nab = "lhu_pod_nab", dat_ote_nab = "dat_ote_nab", lhu_pod_nav = "lhu_pod_nav", dat_ote_nav = "dat_ote_nav", lhu_pod_inf = "lhu_pod_inf", dat_ote_inf = "dat_ote_inf", lhu_pod_uca = "lhu_pod_uca", dat_ote_uca = "dat_ote_uca", lhu_pod_pre = "lhu_pod_pre", dat_ote_pre = "dat_ote_pre", lhu_pod_pza = "lhu_pod_pza", dat_ote_pza = "dat_ote_pza", zpus_podani = "zpus_podani", sifr_podani = "sifr_podani", variant_nab = "variant_nab", popis_predmet = "popis_predmet", hlavni_cpv = "hlavni_cpv", hlavni_nipez = "hlavni_nipez", nuts_mist_pln = "nuts_mist_pln", mist_pln = "mist_pln", dns_ref_kod = "dns_ref_kod", dns_ref_nazev = "dns_ref_nazev", c_predp_bez = "c_predp_bez", hodnota_uve = "hodnota_uve", rs_smlouva = "rs_smlouva", evi_cislo_rs = "evi_cislo_rs", c_predp_s = "c_predp_s", central_zad = "central_zad", zaved_dns = "zaved_dns", kriter_hodnoc = "kriter_hodnoc", dat_uve = "dat_uve", dat_zah = "dat_zah", dat_zru = "dat_zru", uverejnit = "uverejnit", uzamknout = "uzamknout", vyjim_ze_zvz = "vyjim_ze_zvz", ko_osoba_nazev = "ko_osoba_nazev", duvod_vyjim = "duvod_vyjim", id_nen_tsez = "id_nen_tsez", ver_klic_utv = "ver_klic_utv", spec_lhu_cest = "spec_lhu_cest", priz_cast_go = "priz_cast_go", dat_zmena = "dat_zmena", count = "count", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", uver_sez_uc_an = "uver_sez_uc_an", vz_obr_bezp_an = "vz_obr_bezp_an", vz_soc_sluz_an = "vz_soc_sluz_an", sifr_podani_an = "sifr_podani_an", variant_nab_an = "variant_nab_an", priz_cast_go_an = "priz_cast_go_an", na_zaklad_zvz_an = "na_zaklad_zvz_an", zak_planov_an = "zak_planov_an", uverejnit_an = "uverejnit_an", uzamknout_an = "uzamknout_an", vyjim_ze_zvz_an = "vyjim_ze_zvz_an", ver_klic_utv_an = "ver_klic_utv_an", spec_lhu_cest_an = "spec_lhu_cest_an", central_zad_an = "central_zad_an", zaved_dns_an = "zaved_dns_an", kriter_hodnoc_an = "kriter_hodnoc_an", hodnota_uve_an = "hodnota_uve_an", rs_smlouva_an = "rs_smlouva_an", pocetDokumentu = "pocetDokumentu", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum GMzatzakDtoFragments { ixs_zak = "minimum", log_por_cislo = "*", ikc = "*", por_cis = "*", identifikace = "*", ixp = "minimum", id_zak_ci = "minimum", id_zak_go = "minimum", nazev = "minimum", stav_zak = "minimum", stav_zak_txt = "minimum", ixp_den = "ostatni", ixp_den_nazev = "ostatni", postup_zad = "ostatni", druh_zad_riz = "minimum", druh_zad_riz_txt = "minimum", na_zaklad_zvz = "ostatni", zak_planov = "ostatni", spis_cislo = "ostatni", kod_vz_profil = "ostatni", puv_kod_vz_pro = "ostatni", kod_souvz_profil = "ostatni", evi_cislo_vevz = "minimum", evi_cislo_ted = "ostatni", evi_cislo_int = "ostatni", jednaci_cislo = "ostatni", syst_cislo_ien = "ostatni", dalsi_spec = "ostatni", typ_ez = "ostatni", typ_ez_txt = "ostatni", typ_sml = "ostatni", typ_sml_txt = "ostatni", uver_sez_uc = "ostatni", typ_ram_sml = "ostatni", typ_ram_sml_txt = "ostatni", vz_obr_bezp = "ostatni", vz_soc_sluz = "ostatni", druh_zak = "ostatni", druh_zak_txt = "ostatni", typ_poza = "ostatni", typ_poza_txt = "ostatni", zpus_zah = "ostatni", zpus_zah_txt = "ostatni", lhu_pod_nab = "ostatni", dat_ote_nab = "ostatni", lhu_pod_nav = "ostatni", dat_ote_nav = "ostatni", lhu_pod_inf = "ostatni", dat_ote_inf = "ostatni", lhu_pod_uca = "ostatni", dat_ote_uca = "ostatni", lhu_pod_pre = "ostatni", dat_ote_pre = "ostatni", lhu_pod_pza = "ostatni", dat_ote_pza = "ostatni", zpus_podani = "ostatni", sifr_podani = "ostatni", variant_nab = "ostatni", popis_predmet = "ostatni", hlavni_cpv = "minimum", hlavni_nipez = "minimum", nuts_mist_pln = "ostatni", mist_pln = "ostatni", dns_ref_kod = "ostatni", dns_ref_nazev = "ostatni", c_predp_bez = "minimum", hodnota_uve = "ostatni", rs_smlouva = "ostatni", evi_cislo_rs = "ostatni", c_predp_s = "minimum", central_zad = "ostatni", zaved_dns = "ostatni", kriter_hodnoc = "ostatni", dat_uve = "ostatni", dat_zah = "ostatni", dat_zru = "ostatni", uverejnit = "ostatni", uzamknout = "ostatni", vyjim_ze_zvz = "ostatni", ko_osoba_nazev = "ostatni", duvod_vyjim = "ostatni", id_nen_tsez = "minimum", ver_klic_utv = "ostatni", spec_lhu_cest = "ostatni", priz_cast_go = "ostatni", dat_zmena = "ostatni", count = "ostatni", zmenu_prov = "ostatni", zmenu_prov_txt = "ostatni", uver_sez_uc_an = "ostatni", vz_obr_bezp_an = "ostatni", vz_soc_sluz_an = "ostatni", sifr_podani_an = "ostatni", variant_nab_an = "ostatni", priz_cast_go_an = "ostatni", na_zaklad_zvz_an = "ostatni", zak_planov_an = "ostatni", uverejnit_an = "ostatni", uzamknout_an = "ostatni", vyjim_ze_zvz_an = "ostatni", ver_klic_utv_an = "ostatni", spec_lhu_cest_an = "ostatni", central_zad_an = "ostatni", zaved_dns_an = "ostatni", kriter_hodnoc_an = "ostatni", hodnota_uve_an = "ostatni", rs_smlouva_an = "ostatni", pocetDokumentu = "ostatni", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum GMzatzakDtoTypes { ixs_zak = "string", log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", identifikace = "string", ixp = "string", id_zak_ci = "string", id_zak_go = "string", nazev = "string", stav_zak = "number", stav_zak_txt = "string", ixp_den = "string", ixp_den_nazev = "string", postup_zad = "string", druh_zad_riz = "number", druh_zad_riz_txt = "string", na_zaklad_zvz = "number", zak_planov = "number", spis_cislo = "string", kod_vz_profil = "string", puv_kod_vz_pro = "string", kod_souvz_profil = "string", evi_cislo_vevz = "string", evi_cislo_ted = "string", evi_cislo_int = "string", jednaci_cislo = "string", syst_cislo_ien = "string", dalsi_spec = "string", typ_ez = "number", typ_ez_txt = "string", typ_sml = "number", typ_sml_txt = "string", uver_sez_uc = "number", typ_ram_sml = "number", typ_ram_sml_txt = "string", vz_obr_bezp = "number", vz_soc_sluz = "number", druh_zak = "number", druh_zak_txt = "string", typ_poza = "number", typ_poza_txt = "string", zpus_zah = "number", zpus_zah_txt = "string", lhu_pod_nab = "JsonDate", dat_ote_nab = "JsonDate", lhu_pod_nav = "JsonDate", dat_ote_nav = "JsonDate", lhu_pod_inf = "JsonDate", dat_ote_inf = "JsonDate", lhu_pod_uca = "JsonDate", dat_ote_uca = "JsonDate", lhu_pod_pre = "JsonDate", dat_ote_pre = "JsonDate", lhu_pod_pza = "JsonDate", dat_ote_pza = "JsonDate", zpus_podani = "string", sifr_podani = "number", variant_nab = "number", popis_predmet = "string", hlavni_cpv = "string", hlavni_nipez = "string", nuts_mist_pln = "string", mist_pln = "string", dns_ref_kod = "string", dns_ref_nazev = "string", c_predp_bez = "JsonDecimal", hodnota_uve = "number", rs_smlouva = "number", evi_cislo_rs = "string", c_predp_s = "JsonDecimal", central_zad = "number", zaved_dns = "number", kriter_hodnoc = "number", dat_uve = "JsonDate", dat_zah = "JsonDate", dat_zru = "JsonDate", uverejnit = "number", uzamknout = "number", vyjim_ze_zvz = "number", ko_osoba_nazev = "string", duvod_vyjim = "string", id_nen_tsez = "string", ver_klic_utv = "number", spec_lhu_cest = "number", priz_cast_go = "number", dat_zmena = "JsonDate", count = "number", zmenu_prov = "string", zmenu_prov_txt = "string", uver_sez_uc_an = "string", vz_obr_bezp_an = "string", vz_soc_sluz_an = "string", sifr_podani_an = "string", variant_nab_an = "string", priz_cast_go_an = "string", na_zaklad_zvz_an = "string", zak_planov_an = "string", uverejnit_an = "string", uzamknout_an = "string", vyjim_ze_zvz_an = "string", ver_klic_utv_an = "string", spec_lhu_cest_an = "string", central_zad_an = "string", zaved_dns_an = "string", kriter_hodnoc_an = "string", hodnota_uve_an = "string", rs_smlouva_an = "string", pocetDokumentu = "number", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum GMzatzakDtoTypeLengths { ixp = 50, id_zak_ci = 50, id_zak_go = 50, nazev = 254, postup_zad = 20, spis_cislo = 100, kod_vz_profil = 20, puv_kod_vz_pro = 254, kod_souvz_profil = 20, evi_cislo_vevz = 100, evi_cislo_ted = 100, evi_cislo_int = 150, jednaci_cislo = 100, syst_cislo_ien = 100, dalsi_spec = 2000, zpus_podani = 20, popis_predmet = 2000, hlavni_cpv = 20, hlavni_nipez = 20, nuts_mist_pln = 5, mist_pln = 250, dns_ref_kod = 150, dns_ref_nazev = 254, evi_cislo_rs = 100, duvod_vyjim = 2000,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatzkoDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzak*/
	interface GMzatzkoDto {
		/**DBCOLUMN:mzatzuc.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzuc.ikc*/
		ikc?: JsonDecimal|null;
		/**identifikace*/
		identifikace?: string|null;
		/**ixs_zko*/
		ixs_zko?: string|null;
		/**DBCOLUMN:mzatzuc.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:mzasosb.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:mzasosb.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:mzasosb.jmeno*/
		jmenoPrijm?: string|null;
		/**DBCOLUMN:mzasosb.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:mzasosb.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:mzasosb.prac_pozice*/
		prac_pozice?: string|null;
		/**DBCOLUMN:mzasosb.email*/
		email?: string|null;
		/**DBCOLUMN:mzasosb.telefon*/
		telefon?: string|null;
		/**DBCOLUMN:mzasosb.mobil*/
		mobil?: string|null;
		/**DBCOLUMN:mzasosb.fax*/
		fax?: string|null;
		/**DBCOLUMN:mzasosb.fax*/
		dal_info?: string|null;
		/**DBCOLUMN:mzasosb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzasosb.id_osb_ci*/
		id_osb_ci?: string|null;
	}
	const enum GMzatzkoDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", identifikace = "identifikace", ixs_zko = "ixs_zko", por_cis = "por_cis", jmeno = "jmeno", prijmeni = "prijmeni", jmenoPrijm = "jmenoPrijm", tit_pred = "tit_pred", tit_za = "tit_za", prac_pozice = "prac_pozice", email = "email", telefon = "telefon", mobil = "mobil", fax = "fax", dal_info = "dal_info", dat_zmena = "dat_zmena", id_osb_ci = "id_osb_ci",}
	const enum GMzatzkoDtoFragments { log_por_cislo = "*", ikc = "*", identifikace = "*", ixs_zko = "*", por_cis = "*", jmeno = "*", prijmeni = "*", jmenoPrijm = "*", tit_pred = "*", tit_za = "*", prac_pozice = "*", email = "*", telefon = "*", mobil = "*", fax = "*", dal_info = "*", dat_zmena = "*", id_osb_ci = "*",}
	const enum GMzatzkoDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", identifikace = "string", ixs_zko = "string", por_cis = "number", jmeno = "string", prijmeni = "string", jmenoPrijm = "string", tit_pred = "string", tit_za = "string", prac_pozice = "string", email = "string", telefon = "string", mobil = "string", fax = "string", dal_info = "string", dat_zmena = "JsonDate", id_osb_ci = "string",}
	const enum GMzatzkoDtoTypeLengths { jmeno = 254, prijmeni = 254, tit_pred = 50, tit_za = 50, prac_pozice = 254, email = 254, telefon = 254, mobil = 254, fax = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatzokDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzok*/
	interface GMzatzokDto {
		/**DBCOLUMN:mzatzok.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzok.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzok.por_cis_zak*/
		por_cis_zak?: number|null;
		/**DBCOLUMN:mzatzok.por_cis_koz*/
		por_cis_koz?: number|null;
		/**DBCOLUMN:mzatzok.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatzokDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zak = "por_cis_zak", por_cis_koz = "por_cis_koz", dat_zmena = "dat_zmena",}
	const enum GMzatzokDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zak = "*", por_cis_koz = "*", dat_zmena = "*",}
	const enum GMzatzokDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zak = "number", por_cis_koz = "number", dat_zmena = "JsonDate",}
	const enum GMzatzokDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzatzvdDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzvd*/
	interface GMzatzvdDto {
		/**DBCOLUMN:mzatzuc.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzuc.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzuc.por_cis*/
		por_cis?: number|null;
		/**ixs_zvd*/
		ixs_zvd?: string|null;
		/**identifikace*/
		identifikace?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		zak_dod?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		id_dod_ci?: string|null;
		/**DBCOLUMN:mzatzuc.ico_zuc*/
		ico_dod?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		ured_nazev_dod?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		pod_jedn_nab?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		pod_jedn_nab_txt?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		kval_nepro_jd?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		kval_nepro_jd_txt?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		spln_pod_uc?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		spln_pod_uc_txt?: string|null;
		/**DBCOLUMN:mzasosb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:mzatzuc.id_dod_ci*/
		zmenu_prov_txt?: string|null;
	}
	const enum GMzatzvdDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis = "por_cis", ixs_zvd = "ixs_zvd", identifikace = "identifikace", zak_dod = "zak_dod", id_dod_ci = "id_dod_ci", ico_dod = "ico_dod", ured_nazev_dod = "ured_nazev_dod", pod_jedn_nab = "pod_jedn_nab", pod_jedn_nab_txt = "pod_jedn_nab_txt", kval_nepro_jd = "kval_nepro_jd", kval_nepro_jd_txt = "kval_nepro_jd_txt", spln_pod_uc = "spln_pod_uc", spln_pod_uc_txt = "spln_pod_uc_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GMzatzvdDtoFragments { log_por_cislo = "*", ikc = "*", por_cis = "*", ixs_zvd = "*", identifikace = "*", zak_dod = "*", id_dod_ci = "*", ico_dod = "*", ured_nazev_dod = "*", pod_jedn_nab = "*", pod_jedn_nab_txt = "*", kval_nepro_jd = "*", kval_nepro_jd_txt = "*", spln_pod_uc = "*", spln_pod_uc_txt = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*",}
	const enum GMzatzvdDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis = "number", ixs_zvd = "string", identifikace = "string", zak_dod = "string", id_dod_ci = "string", ico_dod = "string", ured_nazev_dod = "string", pod_jedn_nab = "string", pod_jedn_nab_txt = "string", kval_nepro_jd = "string", kval_nepro_jd_txt = "string", spln_pod_uc = "string", spln_pod_uc_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string",}
	const enum GMzatzvdDtoTypeLengths { id_dod_ci = 50, ico_dod = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Kmenove tab\Gordic.Pap.Interface.GMzavzccDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzavzcc*/
	interface GMzavzccDto {
		/**DBCOLUMN:mzavzcc.ixs_zak*/
		ixs_zak?: string|null;
		id_nen_tsez?: string|null;
		/**DBCOLUMN:mzavzcc.por_cis_zcc*/
		por_cis_zcc?: number|null;
		/**DBCOLUMN:mzavzcc.cis_ceu*/
		cis_ceu?: number|null;
		/**DBCOLUMN:mzavzcc.cis_ceu_txt*/
		cis_ceu_txt?: string|null;
		/**DBCOLUMN:mzavzcc.cis_ceu_nazev*/
		cis_ceu_nazev?: string|null;
		/**DBCOLUMN:mzavzcc.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:mzavzcc.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:mzavzcc.zmenu_prov*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:mzavzcc.dat_vytv_uko*/
		dat_vytv_uko?: JsonDate|null;
		/**DBCOLUMN:mzavzcc.uko_autor*/
		uko_autor?: string|null;
		/**DBCOLUMN:mzavzcc.id_dod_ci*/
		id_dod_ci?: string|null;
		/**DBCOLUMN:mzavzcc.id_dod_ci_txt*/
		id_dod_ci_txt?: string|null;
	}
	const enum GMzavzccDtoNames { ixs_zak = "ixs_zak", id_nen_tsez = "id_nen_tsez", por_cis_zcc = "por_cis_zcc", cis_ceu = "cis_ceu", cis_ceu_txt = "cis_ceu_txt", cis_ceu_nazev = "cis_ceu_nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", dat_vytv_uko = "dat_vytv_uko", uko_autor = "uko_autor", id_dod_ci = "id_dod_ci", id_dod_ci_txt = "id_dod_ci_txt",}
	const enum GMzavzccDtoFragments { ixs_zak = "*", id_nen_tsez = "*", por_cis_zcc = "*", cis_ceu = "*", cis_ceu_txt = "*", cis_ceu_nazev = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*", dat_vytv_uko = "*", uko_autor = "*", id_dod_ci = "*", id_dod_ci_txt = "*",}
	const enum GMzavzccDtoTypes { ixs_zak = "string", id_nen_tsez = "string", por_cis_zcc = "number", cis_ceu = "number", cis_ceu_txt = "string", cis_ceu_nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", dat_vytv_uko = "JsonDate", uko_autor = "string", id_dod_ci = "string", id_dod_ci_txt = "string",}
	const enum GMzavzccDtoTypeLengths { zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GArchivInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Data pro archiv*/
	interface GArchivInp {
		service?: string|null;
		dat_zmena?: JsonDate|null;
		ixs_zmp?: string|null;
	}
	const enum GArchivInpNames { service = "service", dat_zmena = "dat_zmena", ixs_zmp = "ixs_zmp",}
	const enum GArchivInpFragments { service = "*", dat_zmena = "*", ixs_zmp = "*",}
	const enum GArchivInpTypes { service = "string", dat_zmena = "JsonDate", ixs_zmp = "string",}
	const enum GArchivInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GArchivOut.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Výstup archivních dat*/
	interface GMzaArchivOutDto {
		dodavatele?: Gordic.Pap.Interface.GMzasdodDto[]|null;
		osoby?: Gordic.Pap.Interface.GMzasosbDto[]|null;
		utvary?: Gordic.Pap.Interface.GMzasoutDto[]|null;
		role?: Gordic.Pap.Interface.GMzasrolDto[]|null;
		seznamZp?: Gordic.Pap.Interface.GMzassezDto[]|null;
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
		detailZp?: Gordic.Pap.Interface.GZpOutDto|null;
		komunikace?: Gordic.Pap.Interface.GMzaKomunikaceDto|null;
	}
	const enum GMzaArchivOutDtoNames { dodavatele = "dodavatele", osoby = "osoby", utvary = "utvary", role = "role", seznamZp = "seznamZp", navrat = "navrat", detailZp = "detailZp", komunikace = "komunikace",}
	const enum GMzaArchivOutDtoFragments { dodavatele = "*", osoby = "*", utvary = "*", role = "*", seznamZp = "*", navrat = "*", detailZp = "*", komunikace = "*",}
	const enum GMzaArchivOutDtoTypes { dodavatele = "Gordic.Pap.Interface.GMzasdodDto[]", osoby = "Gordic.Pap.Interface.GMzasosbDto[]", utvary = "Gordic.Pap.Interface.GMzasoutDto[]", role = "Gordic.Pap.Interface.GMzasrolDto[]", seznamZp = "Gordic.Pap.Interface.GMzassezDto[]", navrat = "Gordic.Pap.Interface.GCommonReturnDto", detailZp = "Gordic.Pap.Interface.GZpOutDto", komunikace = "Gordic.Pap.Interface.GMzaKomunikaceDto",}
	const enum GMzaArchivOutDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDetail.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Detail zakázky*/
	interface GDetailDto {
		/**Návratové hodnoty*/
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
		/**mzatzak, index mzatzac*/
		zakladniInformace?: Gordic.Pap.Interface.GMzatzakDto|null;
		/**mzatzko, index mzatzab*/
		kontaktniOsoba?: Gordic.Pap.Interface.GMzatzkoDto|null;
		/**mzatdon, index mzatzao*/
		dokumentyZakazky?: Gordic.Pap.Interface.GMzatdonDto[]|null;
		/**mzatdon, index mzatzav*/
		verejnyKlicZakazky?: Gordic.Pap.Interface.GMzatdonDto|null;
		/**mzatprz, index mzatzap*/
		polozkaPredmetZakazky?: Gordic.Pap.Interface.GMzatprzDto[]|null;
		/**mzatppp, index mzatppr*/
		pracovniPolozkyPredmet?: Gordic.Pap.Interface.GMzatpppDto[]|null;
		/**mzatzvd, index mzatzay*/
		vybraniDodavatele?: Gordic.Pap.Interface.GMzatzvdDto[]|null;
		/**mzatsml, index mzatzas*/
		smlouvy?: Gordic.Pap.Interface.GMzatsmlDto[]|null;
		/**mzatzuc, index mzatzau*/
		uchazeci?: Gordic.Pap.Interface.GMzatzucDto[]|null;
		/**mzatdon, index mzatzaz*/
		zadavaciDokumenty?: Gordic.Pap.Interface.GMzatdonDto[]|null;
	}
	const enum GDetailDtoNames { navrat = "navrat", zakladniInformace = "zakladniInformace", kontaktniOsoba = "kontaktniOsoba", dokumentyZakazky = "dokumentyZakazky", verejnyKlicZakazky = "verejnyKlicZakazky", polozkaPredmetZakazky = "polozkaPredmetZakazky", pracovniPolozkyPredmet = "pracovniPolozkyPredmet", vybraniDodavatele = "vybraniDodavatele", smlouvy = "smlouvy", uchazeci = "uchazeci", zadavaciDokumenty = "zadavaciDokumenty",}
	const enum GDetailDtoFragments { navrat = "*", zakladniInformace = "*", kontaktniOsoba = "*", dokumentyZakazky = "*", verejnyKlicZakazky = "*", polozkaPredmetZakazky = "*", pracovniPolozkyPredmet = "*", vybraniDodavatele = "*", smlouvy = "*", uchazeci = "*", zadavaciDokumenty = "*",}
	const enum GDetailDtoTypes { navrat = "Gordic.Pap.Interface.GCommonReturnDto", zakladniInformace = "Gordic.Pap.Interface.GMzatzakDto", kontaktniOsoba = "Gordic.Pap.Interface.GMzatzkoDto", dokumentyZakazky = "Gordic.Pap.Interface.GMzatdonDto[]", verejnyKlicZakazky = "Gordic.Pap.Interface.GMzatdonDto", polozkaPredmetZakazky = "Gordic.Pap.Interface.GMzatprzDto[]", pracovniPolozkyPredmet = "Gordic.Pap.Interface.GMzatpppDto[]", vybraniDodavatele = "Gordic.Pap.Interface.GMzatzvdDto[]", smlouvy = "Gordic.Pap.Interface.GMzatsmlDto[]", uchazeci = "Gordic.Pap.Interface.GMzatzucDto[]", zadavaciDokumenty = "Gordic.Pap.Interface.GMzatdonDto[]",}
	const enum GDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDetailSmlouvy.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Detail smlouvy*/
	interface GDetailSmlouvyDto {
		/**Návratové hodnoty*/
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
		/**mzatsml, index mzatzas*/
		smlouva?: Gordic.Pap.Interface.GMzatsmlDto|null;
		/**mzatspl, index mzatsmp*/
		plneniSmlouvy?: Gordic.Pap.Interface.GMzatsplDto[]|null;
		/**mzatdos, index mzatsdv*/
		dodavateleSmlouvy?: Gordic.Pap.Interface.GMzatdosDto[]|null;
		/**mzatssu, index mzatsus*/
		subdodavatelSmlouvy?: Gordic.Pap.Interface.GMzatssuDto[]|null;
		/**mzatsdo, index mzatssd*/
		dodatkySmlouvy?: Gordic.Pap.Interface.GMzatsdoDto[]|null;
		/**mzatdon, index mzatsdd*/
		dokumentDodatky?: Gordic.Pap.Interface.GMzatdonDto[]|null;
	}
	const enum GDetailSmlouvyDtoNames { navrat = "navrat", smlouva = "smlouva", plneniSmlouvy = "plneniSmlouvy", dodavateleSmlouvy = "dodavateleSmlouvy", subdodavatelSmlouvy = "subdodavatelSmlouvy", dodatkySmlouvy = "dodatkySmlouvy", dokumentDodatky = "dokumentDodatky",}
	const enum GDetailSmlouvyDtoFragments { navrat = "*", smlouva = "*", plneniSmlouvy = "*", dodavateleSmlouvy = "*", subdodavatelSmlouvy = "*", dodatkySmlouvy = "*", dokumentDodatky = "*",}
	const enum GDetailSmlouvyDtoTypes { navrat = "Gordic.Pap.Interface.GCommonReturnDto", smlouva = "Gordic.Pap.Interface.GMzatsmlDto", plneniSmlouvy = "Gordic.Pap.Interface.GMzatsplDto[]", dodavateleSmlouvy = "Gordic.Pap.Interface.GMzatdosDto[]", subdodavatelSmlouvy = "Gordic.Pap.Interface.GMzatssuDto[]", dodatkySmlouvy = "Gordic.Pap.Interface.GMzatsdoDto[]", dokumentDodatky = "Gordic.Pap.Interface.GMzatdonDto[]",}
	const enum GDetailSmlouvyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDodavateleInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GDodavateleInp {
		zobrazitData?: number|null;
		zpracovatData?: number|null;
		/**DBCOLUMN:Seznam.zav_kon_txt*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.dat_do*/
		datum_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.identifikátor*/
		int_id?: string|null;
	}
	const enum GDodavateleInpNames { zobrazitData = "zobrazitData", zpracovatData = "zpracovatData", ico = "ico", datum_od = "datum_od", int_id = "int_id",}
	const enum GDodavateleInpFragments { zobrazitData = "*", zpracovatData = "*", ico = "*", datum_od = "*", int_id = "*",}
	const enum GDodavateleInpTypes { zobrazitData = "number", zpracovatData = "number", ico = "string", datum_od = "JsonDate", int_id = "string",}
	const enum GDodavateleInpTypeLengths { ico = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDodavateleOutDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**GDodaveteleOutDto*/
	interface GDodavateleOutDto {
		/**Návratové hodnoty*/
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
		/**tabulka dodavatelu*/
		dodavatele?: Gordic.Pap.Interface.GMzasdodDto[]|null;
	}
	const enum GDodavateleOutDtoNames { navrat = "navrat", dodavatele = "dodavatele",}
	const enum GDodavateleOutDtoFragments { navrat = "*", dodavatele = "*",}
	const enum GDodavateleOutDtoTypes { navrat = "Gordic.Pap.Interface.GCommonReturnDto", dodavatele = "Gordic.Pap.Interface.GMzasdodDto[]",}
	const enum GDodavateleOutDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GDruhyZRInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GDruhyZRInp {
		/**cena*/
		c_predp?: JsonDecimal|null;
		/**druh_zak*/
		pre_urc?: number|null;
		/**typ_ez*/
		lim_zak?: number|null;
		/**typ_sml*/
		vri_pri?: number|null;
	}
	const enum GDruhyZRInpNames { c_predp = "c_predp", pre_urc = "pre_urc", lim_zak = "lim_zak", vri_pri = "vri_pri",}
	const enum GDruhyZRInpFragments { c_predp = "*", pre_urc = "*", lim_zak = "*", vri_pri = "*",}
	const enum GDruhyZRInpTypes { c_predp = "JsonDecimal", pre_urc = "number", lim_zak = "number", vri_pri = "number",}
	const enum GDruhyZRInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GKomunikaceZpInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GKomunikaceZpInp {
		zobrazitData?: number|null;
		/**id interní*/
		id_int?: string|null;
		/**id NEN*/
		id_nen?: string|null;
		/**typ zprávy*/
		typ_zpravy?: string|null;
		/**Datum přijetí zprávy*/
		datum_prijeti_zpravy?: JsonDate|null;
		/**Datum vytvoření zprávy*/
		datum_vytvoreni_zpravy?: JsonDate|null;
		zpracovatData?: number|null;
		stahnoutData?: number|null;
	}
	const enum GKomunikaceZpInpNames { zobrazitData = "zobrazitData", id_int = "id_int", id_nen = "id_nen", typ_zpravy = "typ_zpravy", datum_prijeti_zpravy = "datum_prijeti_zpravy", datum_vytvoreni_zpravy = "datum_vytvoreni_zpravy", zpracovatData = "zpracovatData", stahnoutData = "stahnoutData",}
	const enum GKomunikaceZpInpFragments { zobrazitData = "*", id_int = "*", id_nen = "*", typ_zpravy = "*", datum_prijeti_zpravy = "*", datum_vytvoreni_zpravy = "*", zpracovatData = "*", stahnoutData = "*",}
	const enum GKomunikaceZpInpTypes { zobrazitData = "number", id_int = "string", id_nen = "string", typ_zpravy = "string", datum_prijeti_zpravy = "JsonDate", datum_vytvoreni_zpravy = "JsonDate", zpracovatData = "number", stahnoutData = "number",}
	const enum GKomunikaceZpInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GMzaKomunikace.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Detail komunikace*/
	interface GMzaKomunikaceDto {
		/**Návratové hodnoty*/
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
		komunikace?: Gordic.Pap.Interface.GMzaskozDto[]|null;
		soubory?: Gordic.Pap.Interface.GMzatdonDto[]|null;
	}
	const enum GMzaKomunikaceDtoNames { navrat = "navrat", komunikace = "komunikace", soubory = "soubory",}
	const enum GMzaKomunikaceDtoFragments { navrat = "*", komunikace = "*", soubory = "*",}
	const enum GMzaKomunikaceDtoTypes { navrat = "Gordic.Pap.Interface.GCommonReturnDto", komunikace = "Gordic.Pap.Interface.GMzaskozDto[]", soubory = "Gordic.Pap.Interface.GMzatdonDto[]",}
	const enum GMzaKomunikaceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GOrgStruInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GOrgStruInp {
		zobrazitData?: number|null;
		zpracovatData?: number|null;
	}
	const enum GOrgStruInpNames { zobrazitData = "zobrazitData", zpracovatData = "zpracovatData",}
	const enum GOrgStruInpFragments { zobrazitData = "*", zpracovatData = "*",}
	const enum GOrgStruInpTypes { zobrazitData = "number", zpracovatData = "number",}
	const enum GOrgStruInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GOrgStruOutDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**OrgStruOut*/
	interface GOrgStruOutDto {
		/**Návratové hodnoty*/
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
		/**tabulka útvarů*/
		utvary?: Gordic.Pap.Interface.GMzasoutDto[]|null;
		/**tabulka osob*/
		osoby?: Gordic.Pap.Interface.GMzasosbDto[]|null;
		/**tabulka rolí*/
		role?: Gordic.Pap.Interface.GMzasrolDto[]|null;
	}
	const enum GOrgStruOutDtoNames { navrat = "navrat", utvary = "utvary", osoby = "osoby", role = "role",}
	const enum GOrgStruOutDtoFragments { navrat = "*", utvary = "*", osoby = "*", role = "*",}
	const enum GOrgStruOutDtoTypes { navrat = "Gordic.Pap.Interface.GCommonReturnDto", utvary = "Gordic.Pap.Interface.GMzasoutDto[]", osoby = "Gordic.Pap.Interface.GMzasosbDto[]", role = "Gordic.Pap.Interface.GMzasrolDto[]",}
	const enum GOrgStruOutDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GPodaniInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GPodaniInp {
		/**id NEN*/
		id_nen?: string|null;
		ixs_zak?: string|null;
	}
	const enum GPodaniInpNames { id_nen = "id_nen", ixs_zak = "ixs_zak",}
	const enum GPodaniInpFragments { id_nen = "*", ixs_zak = "*",}
	const enum GPodaniInpTypes { id_nen = "string", ixs_zak = "string",}
	const enum GPodaniInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GPodaniOutDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**PodaniOut*/
	interface GPodaniZpOutDto {
		sezPodani?: Gordic.Pap.Interface.GSezPodaniDto[]|null;
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
	}
	const enum GPodaniZpOutDtoNames { sezPodani = "sezPodani", navrat = "navrat",}
	const enum GPodaniZpOutDtoFragments { sezPodani = "*", navrat = "*",}
	const enum GPodaniZpOutDtoTypes { sezPodani = "Gordic.Pap.Interface.GSezPodaniDto[]", navrat = "Gordic.Pap.Interface.GCommonReturnDto",}
	const enum GPodaniZpOutDtoTypeLengths {}
	interface GSezPodaniDto {
		id_zuc_ci?: string|null;
		ured_nazev_dod?: string|null;
		typ_poza?: number|null;
		id_dod_ci?: string|null;
	}
	const enum GSezPodaniDtoNames { id_zuc_ci = "id_zuc_ci", ured_nazev_dod = "ured_nazev_dod", typ_poza = "typ_poza", id_dod_ci = "id_dod_ci",}
	const enum GSezPodaniDtoFragments { id_zuc_ci = "*", ured_nazev_dod = "*", typ_poza = "*", id_dod_ci = "*",}
	const enum GSezPodaniDtoTypes { id_zuc_ci = "string", ured_nazev_dod = "string", typ_poza = "number", id_dod_ci = "string",}
	const enum GSezPodaniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GSeznamPodaniZpInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSeznamPodaniZpInp {
		zobrazitData?: number|null;
		/**id interní*/
		id_int?: string|null;
		/**id NEN*/
		id_nen?: string|null;
		/**typ podání*/
		typ_podani?: string|null;
	}
	const enum GSeznamPodaniZpInpNames { zobrazitData = "zobrazitData", id_int = "id_int", id_nen = "id_nen", typ_podani = "typ_podani",}
	const enum GSeznamPodaniZpInpFragments { zobrazitData = "*", id_int = "*", id_nen = "*", typ_podani = "*",}
	const enum GSeznamPodaniZpInpTypes { zobrazitData = "number", id_int = "string", id_nen = "string", typ_podani = "string",}
	const enum GSeznamPodaniZpInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GSeznamZpInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GSeznamZpInp {
		zobrazitData?: number|null;
		zpracovatData?: number|null;
		/**DBCOLUMN:Seznam.dat_do*/
		datum_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		datum_do?: JsonDate|null;
	}
	const enum GSeznamZpInpNames { zobrazitData = "zobrazitData", zpracovatData = "zpracovatData", datum_od = "datum_od", datum_do = "datum_do",}
	const enum GSeznamZpInpFragments { zobrazitData = "*", zpracovatData = "*", datum_od = "*", datum_do = "*",}
	const enum GSeznamZpInpTypes { zobrazitData = "number", zpracovatData = "number", datum_od = "JsonDate", datum_do = "JsonDate",}
	const enum GSeznamZpInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GSeznamZpOutDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**SeznamZpOut*/
	interface GSeznamZpOutDto {
		/**Návratové hodnoty*/
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
		/**tabulka útvarů*/
		seznamZp?: Gordic.Pap.Interface.GMzassezDto[]|null;
	}
	const enum GSeznamZpOutDtoNames { navrat = "navrat", seznamZp = "seznamZp",}
	const enum GSeznamZpOutDtoFragments { navrat = "*", seznamZp = "*",}
	const enum GSeznamZpOutDtoTypes { navrat = "Gordic.Pap.Interface.GCommonReturnDto", seznamZp = "Gordic.Pap.Interface.GMzassezDto[]",}
	const enum GSeznamZpOutDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GSmazatInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Smazat archiv*/
	interface GSmazatInp {
		service?: string|null;
		dat_zmena?: JsonDate|null;
	}
	const enum GSmazatInpNames { service = "service", dat_zmena = "dat_zmena",}
	const enum GSmazatInpFragments { service = "*", dat_zmena = "*",}
	const enum GSmazatInpTypes { service = "string", dat_zmena = "JsonDate",}
	const enum GSmazatInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GStahniDokumentInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Stáhnout dokument*/
	interface GStahniDokumentInp {
		datum?: JsonDate|null;
		por_cis?: number|null;
		id_don_ci?: string|null;
	}
	const enum GStahniDokumentInpNames { datum = "datum", por_cis = "por_cis", id_don_ci = "id_don_ci",}
	const enum GStahniDokumentInpFragments { datum = "*", por_cis = "*", id_don_ci = "*",}
	const enum GStahniDokumentInpTypes { datum = "JsonDate", por_cis = "number", id_don_ci = "string",}
	const enum GStahniDokumentInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GStahniDokumentyInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Stáhnout dokumenty*/
	interface GStahniDokumentyInp {
		datum?: JsonDate|null;
	}
	const enum GStahniDokumentyInpNames { datum = "datum",}
	const enum GStahniDokumentyInpFragments { datum = "*",}
	const enum GStahniDokumentyInpTypes { datum = "JsonDate",}
	const enum GStahniDokumentyInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GZpAktOutDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Aktualizace output*/
	interface GZpAktOutDto {
		/**Návratové hodnoty*/
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
		/**mzatzak, index mzatzac*/
		zakladniInformace?: Gordic.Pap.Interface.GMzatzakDto|null;
	}
	const enum GZpAktOutDtoNames { navrat = "navrat", zakladniInformace = "zakladniInformace",}
	const enum GZpAktOutDtoFragments { navrat = "*", zakladniInformace = "*",}
	const enum GZpAktOutDtoTypes { navrat = "Gordic.Pap.Interface.GCommonReturnDto", zakladniInformace = "Gordic.Pap.Interface.GMzatzakDto",}
	const enum GZpAktOutDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GZpInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:Seznam*/
	interface GZpInp {
		zobrazitData?: number|null;
		zpracovatData?: number|null;
		stahnoutData?: number|null;
		/**id interní*/
		id_int?: string|null;
		/**id NEN*/
		id_nen?: string|null;
		ixp_den?: string|null;
		aktualizace?: number|null;
		ixs_zak?: string|null;
	}
	const enum GZpInpNames { zobrazitData = "zobrazitData", zpracovatData = "zpracovatData", stahnoutData = "stahnoutData", id_int = "id_int", id_nen = "id_nen", ixp_den = "ixp_den", aktualizace = "aktualizace", ixs_zak = "ixs_zak",}
	const enum GZpInpFragments { zobrazitData = "*", zpracovatData = "*", stahnoutData = "*", id_int = "*", id_nen = "*", ixp_den = "*", aktualizace = "*", ixs_zak = "*",}
	const enum GZpInpTypes { zobrazitData = "number", zpracovatData = "number", stahnoutData = "number", id_int = "string", id_nen = "string", ixp_den = "string", aktualizace = "number", ixs_zak = "string",}
	const enum GZpInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GZpOutDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**OrgStruOut*/
	interface GZpOutDto {
		/**Návratové hodnoty*/
		navrat?: Gordic.Pap.Interface.GCommonReturnDto|null;
		/**mzatzak, index mzatzac*/
		zakladniInformace?: Gordic.Pap.Interface.GMzatzakDto[]|null;
		/**mzatzko, index mzatzab*/
		kontaktniOsoba?: Gordic.Pap.Interface.GMzatzkoDto[]|null;
		/**mzatdon, index mzatzao*/
		dokumentyZakazky?: Gordic.Pap.Interface.GMzatdonDto[]|null;
		/**mzatdon, index mzatzav*/
		verejnyKlicZakazky?: Gordic.Pap.Interface.GMzatdonDto[]|null;
		/**mzatprz, index mzatzap*/
		polozkaPredmetZakazky?: Gordic.Pap.Interface.GMzatprzDto[]|null;
		/**mzatppp, index mzatppr*/
		pracovniPolozkyPredmet?: Gordic.Pap.Interface.GMzatpppDto[]|null;
		/**mzatzvd, index mzatzay*/
		vybraniDodavatele?: Gordic.Pap.Interface.GMzatzvdDto[]|null;
		/**mzatsml, index mzatzas*/
		smlouvy?: Gordic.Pap.Interface.GMzatsmlDto[]|null;
		/**mzatspl, index mzatsmp*/
		plneniSmlouvy?: Gordic.Pap.Interface.GMzatsplDto[]|null;
		/**mzatdos, index mzatsdv*/
		dodavateleSmlouvy?: Gordic.Pap.Interface.GMzatdosDto[]|null;
		/**mzatssu, index mzatsus*/
		subdodavatelSmlouvy?: Gordic.Pap.Interface.GMzatssuDto[]|null;
		/**mzatsdo, index mzatssd*/
		dodatkySmlouvy?: Gordic.Pap.Interface.GMzatsdoDto[]|null;
		/**mzatdon, index mzatsdd*/
		dokumentDodatky?: Gordic.Pap.Interface.GMzatdonDto[]|null;
		/**mzatzuc, index mzatzau*/
		uchazeci?: Gordic.Pap.Interface.GMzatzucDto[]|null;
		/**mzatdon, index mzatzaz*/
		zadavaciDokumenty?: Gordic.Pap.Interface.GMzatdonDto[]|null;
	}
	const enum GZpOutDtoNames { navrat = "navrat", zakladniInformace = "zakladniInformace", kontaktniOsoba = "kontaktniOsoba", dokumentyZakazky = "dokumentyZakazky", verejnyKlicZakazky = "verejnyKlicZakazky", polozkaPredmetZakazky = "polozkaPredmetZakazky", pracovniPolozkyPredmet = "pracovniPolozkyPredmet", vybraniDodavatele = "vybraniDodavatele", smlouvy = "smlouvy", plneniSmlouvy = "plneniSmlouvy", dodavateleSmlouvy = "dodavateleSmlouvy", subdodavatelSmlouvy = "subdodavatelSmlouvy", dodatkySmlouvy = "dodatkySmlouvy", dokumentDodatky = "dokumentDodatky", uchazeci = "uchazeci", zadavaciDokumenty = "zadavaciDokumenty",}
	const enum GZpOutDtoFragments { navrat = "*", zakladniInformace = "*", kontaktniOsoba = "*", dokumentyZakazky = "*", verejnyKlicZakazky = "*", polozkaPredmetZakazky = "*", pracovniPolozkyPredmet = "*", vybraniDodavatele = "*", smlouvy = "*", plneniSmlouvy = "*", dodavateleSmlouvy = "*", subdodavatelSmlouvy = "*", dodatkySmlouvy = "*", dokumentDodatky = "*", uchazeci = "*", zadavaciDokumenty = "*",}
	const enum GZpOutDtoTypes { navrat = "Gordic.Pap.Interface.GCommonReturnDto", zakladniInformace = "Gordic.Pap.Interface.GMzatzakDto[]", kontaktniOsoba = "Gordic.Pap.Interface.GMzatzkoDto[]", dokumentyZakazky = "Gordic.Pap.Interface.GMzatdonDto[]", verejnyKlicZakazky = "Gordic.Pap.Interface.GMzatdonDto[]", polozkaPredmetZakazky = "Gordic.Pap.Interface.GMzatprzDto[]", pracovniPolozkyPredmet = "Gordic.Pap.Interface.GMzatpppDto[]", vybraniDodavatele = "Gordic.Pap.Interface.GMzatzvdDto[]", smlouvy = "Gordic.Pap.Interface.GMzatsmlDto[]", plneniSmlouvy = "Gordic.Pap.Interface.GMzatsplDto[]", dodavateleSmlouvy = "Gordic.Pap.Interface.GMzatdosDto[]", subdodavatelSmlouvy = "Gordic.Pap.Interface.GMzatssuDto[]", dodatkySmlouvy = "Gordic.Pap.Interface.GMzatsdoDto[]", dokumentDodatky = "Gordic.Pap.Interface.GMzatdonDto[]", uchazeci = "Gordic.Pap.Interface.GMzatzucDto[]", zadavaciDokumenty = "Gordic.Pap.Interface.GMzatdonDto[]",}
	const enum GZpOutDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Nacitani\Gordic.Pap.Interface.GZpracovatInp.Dto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Zpracovat dávku*/
	interface GZpracovatInp {
		zobrazitData?: number|null;
		service?: string|null;
		dat_zmena?: JsonDate|null;
		ixp_den?: string|null;
	}
	const enum GZpracovatInpNames { zobrazitData = "zobrazitData", service = "service", dat_zmena = "dat_zmena", ixp_den = "ixp_den",}
	const enum GZpracovatInpFragments { zobrazitData = "*", service = "*", dat_zmena = "*", ixp_den = "*",}
	const enum GZpracovatInpTypes { zobrazitData = "number", service = "string", dat_zmena = "JsonDate", ixp_den = "string",}
	const enum GZpracovatInpTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatdidDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatdid*/
	interface GMzatdidDto {
		/**DBCOLUMN:mzatcap.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcap.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcap.por_cis_zca*/
		por_cis_din?: number|null;
		/**DBCOLUMN:mzatcap.por_cis_prz*/
		por_cis_don?: number|null;
		/**DBCOLUMN:mzatcap.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatdidDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_din = "por_cis_din", por_cis_don = "por_cis_don", dat_zmena = "dat_zmena",}
	const enum GMzatdidDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_din = "*", por_cis_don = "*", dat_zmena = "*",}
	const enum GMzatdidDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_din = "number", por_cis_don = "number", dat_zmena = "JsonDate",}
	const enum GMzatdidDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatpprDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatcap*/
	interface GMzatpprDto {
		/**DBCOLUMN:mzatcap.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcap.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcap.por_cis_zca*/
		por_cis_prz?: number|null;
		/**DBCOLUMN:mzatcap.por_cis_prz*/
		por_cis_ppp?: number|null;
		/**DBCOLUMN:mzatcap.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatpprDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_prz = "por_cis_prz", por_cis_ppp = "por_cis_ppp", dat_zmena = "dat_zmena",}
	const enum GMzatpprDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_prz = "*", por_cis_ppp = "*", dat_zmena = "*",}
	const enum GMzatpprDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_prz = "number", por_cis_ppp = "number", dat_zmena = "JsonDate",}
	const enum GMzatpprDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatsddDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatsdd*/
	interface GMzatsddDto {
		/**DBCOLUMN:mzatsdd.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatsdd.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatsdd.por_cis_sdo*/
		por_cis_sdo?: number|null;
		/**DBCOLUMN:mzatsdd.por_cis_don*/
		por_cis_don?: number|null;
		/**DBCOLUMN:mzatsdd.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatsddDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_sdo = "por_cis_sdo", por_cis_don = "por_cis_don", dat_zmena = "dat_zmena",}
	const enum GMzatsddDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_sdo = "*", por_cis_don = "*", dat_zmena = "*",}
	const enum GMzatsddDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_sdo = "number", por_cis_don = "number", dat_zmena = "JsonDate",}
	const enum GMzatsddDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatsdvDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzao*/
	interface GMzatsdvDto {
		/**DBCOLUMN:mzatzao.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzao.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzao.por_cis_zak*/
		por_cis_sml?: number|null;
		/**DBCOLUMN:mzatzao.por_cis_don*/
		por_cis_dos?: number|null;
		/**DBCOLUMN:mzatzao.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatsdvDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_sml = "por_cis_sml", por_cis_dos = "por_cis_dos", dat_zmena = "dat_zmena",}
	const enum GMzatsdvDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_sml = "*", por_cis_dos = "*", dat_zmena = "*",}
	const enum GMzatsdvDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_sml = "number", por_cis_dos = "number", dat_zmena = "JsonDate",}
	const enum GMzatsdvDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatsmpDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatsmp*/
	interface GMzatsmpDto {
		/**DBCOLUMN:mzatsmp.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatsmp.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatsmp.por_cis_sml*/
		por_cis_sml?: number|null;
		/**DBCOLUMN:mzatsmp.por_cis_spl*/
		por_cis_spl?: number|null;
		/**DBCOLUMN:mzatsmp.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatsmpDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_sml = "por_cis_sml", por_cis_spl = "por_cis_spl", dat_zmena = "dat_zmena",}
	const enum GMzatsmpDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_sml = "*", por_cis_spl = "*", dat_zmena = "*",}
	const enum GMzatsmpDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_sml = "number", por_cis_spl = "number", dat_zmena = "JsonDate",}
	const enum GMzatsmpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatssdDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzao*/
	interface GMzatssdDto {
		/**DBCOLUMN:mzatzao.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzao.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzao.por_cis_zak*/
		por_cis_sml?: number|null;
		/**DBCOLUMN:mzatzao.por_cis_don*/
		por_cis_sdo?: number|null;
		/**DBCOLUMN:mzatzao.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatssdDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_sml = "por_cis_sml", por_cis_sdo = "por_cis_sdo", dat_zmena = "dat_zmena",}
	const enum GMzatssdDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_sml = "*", por_cis_sdo = "*", dat_zmena = "*",}
	const enum GMzatssdDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_sml = "number", por_cis_sdo = "number", dat_zmena = "JsonDate",}
	const enum GMzatssdDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatsusDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatsus*/
	interface GMzatsusDto {
		/**DBCOLUMN:mzatsus.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatsus.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatsus.por_cis_sml*/
		por_cis_sml?: number|null;
		/**DBCOLUMN:mzatsus.por_cis_ssu*/
		por_cis_ssu?: number|null;
		/**DBCOLUMN:mzatsus.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatsusDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_sml = "por_cis_sml", por_cis_ssu = "por_cis_ssu", dat_zmena = "dat_zmena",}
	const enum GMzatsusDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_sml = "*", por_cis_ssu = "*", dat_zmena = "*",}
	const enum GMzatsusDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_sml = "number", por_cis_ssu = "number", dat_zmena = "JsonDate",}
	const enum GMzatsusDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzabDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzau*/
	interface GMzatzabDto {
		/**DBCOLUMN:mzatzau.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzau.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzau.por_cis_zak*/
		por_cis_zak?: number|null;
		/**DBCOLUMN:mzatzau.por_cis_zko*/
		por_cis_zko?: number|null;
		/**DBCOLUMN:mzatzau.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatzabDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zak = "por_cis_zak", por_cis_zko = "por_cis_zko", dat_zmena = "dat_zmena",}
	const enum GMzatzabDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zak = "*", por_cis_zko = "*", dat_zmena = "*",}
	const enum GMzatzabDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zak = "number", por_cis_zko = "number", dat_zmena = "JsonDate",}
	const enum GMzatzabDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzacDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzac*/
	interface GMzatzacDto {
		/**DBCOLUMN:mzatcap.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcap.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcap.por_cis_zca*/
		por_cis_zak?: number|null;
		/**DBCOLUMN:mzatcap.por_cis_prz*/
		por_cis_zca?: number|null;
		/**DBCOLUMN:mzatcap.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatzacDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zak = "por_cis_zak", por_cis_zca = "por_cis_zca", dat_zmena = "dat_zmena",}
	const enum GMzatzacDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zak = "*", por_cis_zca = "*", dat_zmena = "*",}
	const enum GMzatzacDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zak = "number", por_cis_zca = "number", dat_zmena = "JsonDate",}
	const enum GMzatzacDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzaoDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzao*/
	interface GMzatzaoDto {
		/**DBCOLUMN:mzatzao.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzao.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzao.por_cis_zak*/
		por_cis_zak?: number|null;
		/**DBCOLUMN:mzatzao.por_cis_don*/
		por_cis_don?: number|null;
		/**DBCOLUMN:mzatzao.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatzaoDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zak = "por_cis_zak", por_cis_don = "por_cis_don", dat_zmena = "dat_zmena",}
	const enum GMzatzaoDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zak = "*", por_cis_don = "*", dat_zmena = "*",}
	const enum GMzatzaoDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zak = "number", por_cis_don = "number", dat_zmena = "JsonDate",}
	const enum GMzatzaoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzapDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzap*/
	interface GMzatzapDto {
		/**DBCOLUMN:mzatzap.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzap.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzap.por_cis_zak*/
		por_cis_zak?: number|null;
		/**DBCOLUMN:mzatzap.por_cis_prz*/
		por_cis_prz?: number|null;
		/**DBCOLUMN:mzatzap.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatzapDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zak = "por_cis_zak", por_cis_prz = "por_cis_prz", dat_zmena = "dat_zmena",}
	const enum GMzatzapDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zak = "*", por_cis_prz = "*", dat_zmena = "*",}
	const enum GMzatzapDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zak = "number", por_cis_prz = "number", dat_zmena = "JsonDate",}
	const enum GMzatzapDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzasDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzas*/
	interface GMzatzasDto {
		/**DBCOLUMN:mzatcap.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcap.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcap.por_cis_zca*/
		por_cis_zak?: number|null;
		/**DBCOLUMN:mzatcap.por_cis_prz*/
		por_cis_sml?: number|null;
		/**DBCOLUMN:mzatcap.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatzasDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zak = "por_cis_zak", por_cis_sml = "por_cis_sml", dat_zmena = "dat_zmena",}
	const enum GMzatzasDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zak = "*", por_cis_sml = "*", dat_zmena = "*",}
	const enum GMzatzasDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zak = "number", por_cis_sml = "number", dat_zmena = "JsonDate",}
	const enum GMzatzasDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzauDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzau*/
	interface GMzatzauDto {
		/**DBCOLUMN:mzatzau.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatzau.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatzau.por_cis_zak*/
		por_cis_zak?: number|null;
		/**DBCOLUMN:mzatzau.por_cis_zuc*/
		por_cis_zuc?: number|null;
		/**DBCOLUMN:mzatzau.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatzauDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zak = "por_cis_zak", por_cis_zuc = "por_cis_zuc", dat_zmena = "dat_zmena",}
	const enum GMzatzauDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zak = "*", por_cis_zuc = "*", dat_zmena = "*",}
	const enum GMzatzauDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zak = "number", por_cis_zuc = "number", dat_zmena = "JsonDate",}
	const enum GMzatzauDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzavDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatcap*/
	interface GMzatzavDto {
		/**DBCOLUMN:mzatcap.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcap.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcap.por_cis_zca*/
		por_cis_zak?: number|null;
		/**DBCOLUMN:mzatcap.por_cis_prz*/
		por_cis_vek?: number|null;
		/**DBCOLUMN:mzatcap.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatzavDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zak = "por_cis_zak", por_cis_vek = "por_cis_vek", dat_zmena = "dat_zmena",}
	const enum GMzatzavDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zak = "*", por_cis_vek = "*", dat_zmena = "*",}
	const enum GMzatzavDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zak = "number", por_cis_vek = "number", dat_zmena = "JsonDate",}
	const enum GMzatzavDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\Gordic.Pap.Interface.GMzatzayDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatzay*/
	interface GMzatzayDto {
		/**DBCOLUMN:mzatcap.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcap.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcap.por_cis_zca*/
		por_cis_zak?: number|null;
		/**DBCOLUMN:mzatcap.por_cis_prz*/
		por_cis_zvd?: number|null;
		/**DBCOLUMN:mzatcap.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatzayDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zak = "por_cis_zak", por_cis_zvd = "por_cis_zvd", dat_zmena = "dat_zmena",}
	const enum GMzatzayDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zak = "*", por_cis_zvd = "*", dat_zmena = "*",}
	const enum GMzatzayDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zak = "number", por_cis_zvd = "number", dat_zmena = "JsonDate",}
	const enum GMzatzayDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\CastiVz\Gordic.Pap.Interface.GMzatcadDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatcad*/
	interface GMzatcadDto {
		/**DBCOLUMN:mzatcad.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcad.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcad.por_cis_zca*/
		por_cis_zca?: number|null;
		/**DBCOLUMN:mzatcad.por_cis_din*/
		por_cis_din?: number|null;
		/**DBCOLUMN:mzatcad.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatcadDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zca = "por_cis_zca", por_cis_din = "por_cis_din", dat_zmena = "dat_zmena",}
	const enum GMzatcadDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zca = "*", por_cis_din = "*", dat_zmena = "*",}
	const enum GMzatcadDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zca = "number", por_cis_din = "number", dat_zmena = "JsonDate",}
	const enum GMzatcadDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\CastiVz\Gordic.Pap.Interface.GMzatcaoDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatcao*/
	interface GMzatcaoDto {
		/**DBCOLUMN:mzatcao.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcao.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcao.por_cis_zca*/
		por_cis_zca?: number|null;
		/**DBCOLUMN:mzatcao.por_cis_don*/
		por_cis_don?: number|null;
		/**DBCOLUMN:mzatcao.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatcaoDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zca = "por_cis_zca", por_cis_don = "por_cis_don", dat_zmena = "dat_zmena",}
	const enum GMzatcaoDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zca = "*", por_cis_don = "*", dat_zmena = "*",}
	const enum GMzatcaoDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zca = "number", por_cis_don = "number", dat_zmena = "JsonDate",}
	const enum GMzatcaoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\CastiVz\Gordic.Pap.Interface.GMzatcapDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatcap*/
	interface GMzatcapDto {
		/**DBCOLUMN:mzatcap.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcap.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcap.por_cis_zca*/
		por_cis_zca?: number|null;
		/**DBCOLUMN:mzatcap.por_cis_prz*/
		por_cis_prz?: number|null;
		/**DBCOLUMN:mzatcap.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatcapDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zca = "por_cis_zca", por_cis_prz = "por_cis_prz", dat_zmena = "dat_zmena",}
	const enum GMzatcapDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zca = "*", por_cis_prz = "*", dat_zmena = "*",}
	const enum GMzatcapDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zca = "number", por_cis_prz = "number", dat_zmena = "JsonDate",}
	const enum GMzatcapDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\PapNen\Nen\Vazebni tab\CastiVz\Gordic.Pap.Interface.GMzatcauDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:mzatcau*/
	interface GMzatcauDto {
		/**DBCOLUMN:mzatcau.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:mzatcau.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:mzatcau.por_cis_zca*/
		por_cis_zca?: number|null;
		/**DBCOLUMN:mzatcau.por_cis_zuc*/
		por_cis_zuc?: number|null;
		/**DBCOLUMN:mzatcau.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GMzatcauDtoNames { log_por_cislo = "log_por_cislo", ikc = "ikc", por_cis_zca = "por_cis_zca", por_cis_zuc = "por_cis_zuc", dat_zmena = "dat_zmena",}
	const enum GMzatcauDtoFragments { log_por_cislo = "*", ikc = "*", por_cis_zca = "*", por_cis_zuc = "*", dat_zmena = "*",}
	const enum GMzatcauDtoTypes { log_por_cislo = "number", ikc = "JsonDecimal", por_cis_zca = "number", por_cis_zuc = "number", dat_zmena = "JsonDate",}
	const enum GMzatcauDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Rza\Gordic.Pap.Interface.GRzascfDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzascfp*/
	interface GRzascfpDto {
		/**DBCOLUMN:por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:nazev*/
		nazev?: string|null;
		/**DBCOLUMN:popis*/
		popis?: string|null;
		/**DBCOLUMN:dat_dav_od*/
		dat_dav_od?: JsonDate|null;
		/**DBCOLUMN:dat_dav_do*/
		dat_dav_do?: JsonDate|null;
		/**DBCOLUMN:priz_ini_kni*/
		priz_ini_kni?: number|null;
		/**DBCOLUMN:priz_kon_ivz*/
		priz_kon_ivz?: number|null;
		/**DBCOLUMN:s_cfp1*/
		s_cfp1?: number|null;
		/**DBCOLUMN:s_cfp2*/
		s_cfp2?: number|null;
		/**DBCOLUMN:s_cfp3*/
		s_cfp3?: number|null;
		/**DBCOLUMN:dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamEvz.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:priz_ini_kni*/
		priz_ini_kni_text?: string|null;
		/**DBCOLUMN:priz_kon_ivz*/
		priz_kon_ivz_text?: string|null;
		/**DBCOLUMN:s_cfp1*/
		s_cfp1_text?: string|null;
		/**DBCOLUMN:s_cfp2*/
		s_cfp2_text?: string|null;
		/**DBCOLUMN:s_cfp3*/
		s_cfp3_text?: string|null;
		hlas?: string|null;
	}
	const enum GRzascfpDtoNames { por_cis = "por_cis", nazev = "nazev", popis = "popis", dat_dav_od = "dat_dav_od", dat_dav_do = "dat_dav_do", priz_ini_kni = "priz_ini_kni", priz_kon_ivz = "priz_kon_ivz", s_cfp1 = "s_cfp1", s_cfp2 = "s_cfp2", s_cfp3 = "s_cfp3", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", priz_ini_kni_text = "priz_ini_kni_text", priz_kon_ivz_text = "priz_kon_ivz_text", s_cfp1_text = "s_cfp1_text", s_cfp2_text = "s_cfp2_text", s_cfp3_text = "s_cfp3_text", hlas = "hlas",}
	const enum GRzascfpDtoFragments { por_cis = "*", nazev = "*", popis = "*", dat_dav_od = "*", dat_dav_do = "*", priz_ini_kni = "*", priz_kon_ivz = "*", s_cfp1 = "*", s_cfp2 = "*", s_cfp3 = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", priz_ini_kni_text = "*", priz_kon_ivz_text = "*", s_cfp1_text = "*", s_cfp2_text = "*", s_cfp3_text = "*", hlas = "*",}
	const enum GRzascfpDtoTypes { por_cis = "number", nazev = "string", popis = "string", dat_dav_od = "JsonDate", dat_dav_do = "JsonDate", priz_ini_kni = "number", priz_kon_ivz = "number", s_cfp1 = "number", s_cfp2 = "number", s_cfp3 = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", priz_ini_kni_text = "string", priz_kon_ivz_text = "string", s_cfp1_text = "string", s_cfp2_text = "string", s_cfp3_text = "string", hlas = "string",}
	const enum GRzascfpDtoTypeLengths { zmenu_prov = 12, nazev_rf = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Rza\Gordic.Pap.Interface.GRzaseszDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzasesz*/
	interface GRzaseszDto {
		/**DBCOLUMN:rzasesz.ixs_zak*/
		ixs_zak?: string|null;
		/**DBCOLUMN:rzasesz.por_cis*/
		por_cis?: number|null;
		/**DBCOLUMN:rzasesz.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:rzasesz.cis_ver*/
		cis_ver?: number|null;
		/**DBCOLUMN:rzasesz.sta_exp*/
		sta_exp?: number|null;
		/**DBCOLUMN:rzasesz.sta_exp*/
		sta_exp_txt?: string|null;
		/**DBCOLUMN:rzasesz.dat_exp*/
		dat_exp?: JsonDate|null;
		/**DBCOLUMN:rzasesz.druh_dn*/
		druh_dn?: number|null;
		/**DBCOLUMN:rzasesz.druh_dn*/
		druh_dn_txt?: string|null;
		/**DBCOLUMN:rzasesz.typ_doza*/
		typ_doza?: number|null;
		/**DBCOLUMN:rzasesz.druh_dn*/
		priz_zd?: number|null;
		/**DBCOLUMN:rzasesz.druh_dn*/
		priz_spis?: number|null;
		/**DBCOLUMN:typ_doza_txt*/
		typ_doza_txt?: string|null;
		/**DBCOLUMN:rzasesz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:rzasesz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:rzasesz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rzasesz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:soubor*/
		soubor?: string|null;
		/**DBCOLUMN:popis*/
		popis?: string|null;
		/**DBCOLUMN:popis*/
		ixp?: string|null;
		/**DBCOLUMN:popis*/
		akt_znacka?: string|null;
		/**DBCOLUMN:popis*/
		wfl_nazev?: string|null;
		/**DBCOLUMN:popis*/
		typ_nazev_txt?: string|null;
		/**DBCOLUMN:rzasesz.stav_pis*/
		stav_pis?: number|null;
		/**DBCOLUMN:rzasesz.stav_pis*/
		stav_pis_txt?: string|null;
		/**DBCOLUMN:rzasesz.odkud*/
		odkud?: number|null;
		/**DBCOLUMN:rzasesz.odkud*/
		typ_elp?: number|null;
		/**DBCOLUMN:rzasesz.stav_pis*/
		soubor_pri?: string|null;
		/**DBCOLUMN:rzasesz.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:rzasesz.por_cislo*/
		por_v_spis?: number|null;
		/**DBCOLUMN:rzasesz.por_cislo*/
		por_v_spis_uziv?: number|null;
		/**DBCOLUMN:popis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:popis*/
		ixp_spis_prir?: string|null;
		/**DBCOLUMN:popis*/
		id_gor_dok?: string|null;
	}
	const enum GRzaseszDtoNames { ixs_zak = "ixs_zak", por_cis = "por_cis", ixb = "ixb", cis_ver = "cis_ver", sta_exp = "sta_exp", sta_exp_txt = "sta_exp_txt", dat_exp = "dat_exp", druh_dn = "druh_dn", druh_dn_txt = "druh_dn_txt", typ_doza = "typ_doza", priz_zd = "priz_zd", priz_spis = "priz_spis", typ_doza_txt = "typ_doza_txt", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", soubor = "soubor", popis = "popis", ixp = "ixp", akt_znacka = "akt_znacka", wfl_nazev = "wfl_nazev", typ_nazev_txt = "typ_nazev_txt", stav_pis = "stav_pis", stav_pis_txt = "stav_pis_txt", odkud = "odkud", typ_elp = "typ_elp", soubor_pri = "soubor_pri", por_cislo = "por_cislo", por_v_spis = "por_v_spis", por_v_spis_uziv = "por_v_spis_uziv", ixp_spis = "ixp_spis", ixp_spis_prir = "ixp_spis_prir", id_gor_dok = "id_gor_dok",}
	const enum GRzaseszDtoFragments { ixs_zak = "*", por_cis = "*", ixb = "*", cis_ver = "*", sta_exp = "*", sta_exp_txt = "*", dat_exp = "*", druh_dn = "*", druh_dn_txt = "*", typ_doza = "*", priz_zd = "*", priz_spis = "*", typ_doza_txt = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", soubor = "*", popis = "*", ixp = "*", akt_znacka = "*", wfl_nazev = "*", typ_nazev_txt = "*", stav_pis = "*", stav_pis_txt = "*", odkud = "*", typ_elp = "*", soubor_pri = "*", por_cislo = "*", por_v_spis = "*", por_v_spis_uziv = "*", ixp_spis = "*", ixp_spis_prir = "*", id_gor_dok = "*",}
	const enum GRzaseszDtoTypes { ixs_zak = "string", por_cis = "number", ixb = "string", cis_ver = "number", sta_exp = "number", sta_exp_txt = "string", dat_exp = "JsonDate", druh_dn = "number", druh_dn_txt = "string", typ_doza = "number", priz_zd = "number", priz_spis = "number", typ_doza_txt = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", soubor = "string", popis = "string", ixp = "string", akt_znacka = "string", wfl_nazev = "string", typ_nazev_txt = "string", stav_pis = "number", stav_pis_txt = "string", odkud = "number", typ_elp = "number", soubor_pri = "string", por_cislo = "number", por_v_spis = "number", por_v_spis_uziv = "number", ixp_spis = "string", ixp_spis_prir = "string", id_gor_dok = "string",}
	const enum GRzaseszDtoTypeLengths { ixs_zak = 12, ixb = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Rza\Gordic.Pap.Interface.GRzaspriDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**DBTABLE:rzaspri*/
	interface GRzaspriDto extends Gordic.Wfl.Interface.GIconCalculatorDto {
		/**DBCOLUMN:rzaspri.ixs_zak*/
		ixs_zak?: string|null;
		/**DBCOLUMN:SeznamEvz.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:SeznamEvz.hlav_pred_pop*/
		hlav_pred_pop?: string|null;
		/**DBCOLUMN:rzaspri.lic*/
		lic?: string|null;
		/**DBCOLUMN:rzaspri.ico*/
		ico?: string|null;
		/**DBCOLUMN:rzaspri.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:rzaspri.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:pocet_kompetentu.rok_zal*/
		pocet_kompetentu?: number|null;
		/**DBCOLUMN:rzaspri.zpu_rea*/
		zpu_rea?: number|null;
		/**DBCOLUMN:rzaspri.zpu_rea*/
		zpu_rea_txt?: string|null;
		/**DBCOLUMN:rzaspri.kat_pza*/
		kat_pza?: number|null;
		/**DBCOLUMN:rzaspri.kat_pza*/
		kat_pza_txt?: string|null;
		/**DBCOLUMN:rzaspri.pap_tza*/
		pap_tza?: number|null;
		/**DBCOLUMN:rzaspri.pap_tza*/
		pap_tza_txt?: string|null;
		/**DBCOLUMN:rzaspri.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:rzaspri.ac*/
		ac?: string|null;
		/**DBCOLUMN:rzaspri.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:rzaspri.leg_usm*/
		leg_usm?: number|null;
		/**DBCOLUMN:rzaspri.leg_usm*/
		lze_poslat_dokumenty?: boolean|null;
		/**DBCOLUMN:rzaspri.leg_usm*/
		lze_uverejnit_zakazku?: boolean|null;
		ac_sml?: string|null;
		pocet_sml?: number|null;
		/**DBCOLUMN:rzaspri.leg_usm*/
		leg_usm_txt?: string|null;
		/**DBCOLUMN:rzaspri.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:rzaspri.cis_real*/
		cis_real_ena?: boolean|null;
		/**DBCOLUMN:rzaspri.cis_real*/
		cis_real_nazev?: string|null;
		/**DBCOLUMN:rzaspri.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:rzaspri.ixs_fun_komp*/
		ixs_fun_komp_ena?: boolean|null;
		/**DBCOLUMN:rzaspri.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:rzaspri.ixs_fun_akt*/
		ixs_fun_akt_txt?: string|null;
		/**DBCOLUMN:rzaspri.def_fzc*/
		def_fzc?: number|null;
		/**DBCOLUMN:rzaspri.def_fzc*/
		def_fzc_txt?: string|null;
		/**DBCOLUMN:rzaspri.s_zak*/
		s_zak?: number|null;
		/**DBCOLUMN:rzaspri.s_zak_txt*/
		s_zak_txt?: string|null;
		/**DBCOLUMN:rzaspri.dat_zal*/
		dat_zal?: JsonDate|null;
		/**DBCOLUMN:rzaspri.pre_urc*/
		pre_urc?: number|null;
		/**DBCOLUMN:rzaspri.pre_urc*/
		pre_urc_txt?: string|null;
		/**DBCOLUMN:rzaspri.lim_zak*/
		lim_zak?: number|null;
		/**DBCOLUMN:rzaspri.lim_zak*/
		lim_zak_txt?: string|null;
		/**DBCOLUMN:rzaspri.rez_pri*/
		rez_pri?: number|null;
		/**DBCOLUMN:rzaspri.rez_pri*/
		rez_pri_txt?: string|null;
		/**DBCOLUMN:rzaspri.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:rzaspri.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:rzaspri.tfi_pri*/
		tfi_pri?: number|null;
		/**DBCOLUMN:rzaspri.tfi_pri*/
		tfi_pri_txt?: string|null;
		/**DBCOLUMN:rzaspri.rokMes_od*/
		rokMes_od?: string|null;
		/**DBCOLUMN:rzaspri.leg_usm_par*/
		leg_usm_par?: number|null;
		/**DBCOLUMN:rzaspri.leg_usm_par_txt*/
		leg_usm_par_txt?: string|null;
		/**DBCOLUMN:rzaspri.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:rzaspri.dan_typ*/
		dan_typ_txt?: string|null;
		/**DBCOLUMN:rzaspri.dan_proc*/
		dan_proc?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.dan_proc*/
		castka_sml?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.c_predp_bez*/
		c_sum?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.c_predp_bez*/
		c_predp_bez?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.c_predp*/
		c_predp?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.priz_cast*/
		jrb_urc?: number|null;
		/**DBCOLUMN:rzaspri.priz_cast*/
		priz_uza_zak?: number|null;
		/**DBCOLUMN:rzaspri.priz_cast*/
		priz_rea_aukce?: number|null;
		/**DBCOLUMN:rzaspri.mena*/
		mena?: number|null;
		/**DBCOLUMN:rzaspri.mena*/
		mena_txt?: string|null;
		/**DBCOLUMN:rzaspri.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:rzaspri.priz_cast*/
		priz_cast?: number|null;
		/**DBCOLUMN:rzaspri.priz_relcas*/
		priz_relcas?: number|null;
		/**DBCOLUMN:rzaspri.ixs_pri_nad*/
		ixs_pri_nad?: string|null;
		/**DBCOLUMN:rzaspri.ixs_pri_nad*/
		ac_ag_nad?: string|null;
		/**DBCOLUMN:rzaspri.vri_pri*/
		vri_pri?: number|null;
		/**DBCOLUMN:rzaspri.vri_pri*/
		vri_pri_txt?: string|null;
		/**DBCOLUMN:rzaspri.dri_pri*/
		dri_pri?: number|null;
		/**DBCOLUMN:rzaspri.dri_pri*/
		dri_pri_txt?: string|null;
		/**DBCOLUMN:rzaspri.pri_zak*/
		pri_zak?: number|null;
		/**DBCOLUMN:rzaspri.pri_zak*/
		pri_zak_txt?: string|null;
		/**DBCOLUMN:rzaspri.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_zmena*/
		dat_nen?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_zmena*/
		dat_poslPrenosNen?: JsonDate|null;
		/**DBCOLUMN:rzaspri.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:rzaspri.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:rzaspri.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:rzaspri.ixp_den_nazev*/
		ixp_den_nazev?: string|null;
		/**DBCOLUMN:rzaspri.ner_zak*/
		ner_zak?: number|null;
		/**DBCOLUMN:rzaspri.ner_zak*/
		ner_zak_txt?: string|null;
		/**DBCOLUMN:rzaspri.duz_zak*/
		duz_zak?: number|null;
		/**DBCOLUMN:rzaspri.ner_zak*/
		duz_zak_txt?: string|null;
		/**DBCOLUMN:rzaspri.dat_zru*/
		dat_zru?: JsonDate|null;
		/**DBCOLUMN:rzaspri.kpr_urc*/
		kpr_urc?: number|null;
		/**DBCOLUMN:rzaspri.kpr_urc*/
		kpr_urc_txt?: string|null;
		/**DBCOLUMN:rzaspri.priz_bfin*/
		priz_bfin?: number|null;
		/**DBCOLUMN:rzaspri.dat_pred_ozn*/
		dat_pred_ozn?: JsonDate|null;
		/**DBCOLUMN:rzaspri.priz_pred_ozn*/
		priz_pred_ozn?: number|null;
		/**DBCOLUMN:rzaspri.priz_spis*/
		priz_vaz_spis?: number|null;
		/**DBCOLUMN:rzaspri.def_vaz_sml*/
		def_vaz_sml?: number|null;
		/**DBCOLUMN:rzaspri.dat_tp1_p*/
		dat_tp1_p?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp1_s*/
		dat_tp1_s?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp2_p*/
		dat_tp2_p?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp2_s*/
		dat_tp2_s?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp3_p*/
		dat_tp3_p?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp3_s*/
		dat_tp3_s?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp4_p*/
		dat_tp4_p?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp4_s*/
		dat_tp4_s?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp5_p*/
		dat_tp5_p?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp5_s*/
		dat_tp5_s?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp5_p*/
		dat_tp6_p?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp5_s*/
		dat_tp6_s?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp5_p*/
		dat_tp7_p?: JsonDate|null;
		/**DBCOLUMN:rzaspri.dat_tp5_s*/
		dat_tp7_s?: JsonDate|null;
		/**DBCOLUMN:rzaspri.c_fprof*/
		c_fprof?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.c_sch_bez*/
		c_sch_bez?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.dat_sch*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:rzaspri.c_uhr_bez*/
		c_uhr_bez?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.c_uhr*/
		c_uhr?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.priz_zve_inen*/
		priz_zve_inen?: number|null;
		/**DBCOLUMN:rzaspri.priz_zve_vevz*/
		priz_zve_vevz?: number|null;
		/**DBCOLUMN:rzaspri.priz_zve_prof*/
		priz_zve_prof?: number|null;
		/**DBCOLUMN:rzaspri.priz_zve_etrz*/
		priz_zve_etrz?: number|null;
		/**DBCOLUMN:rzaspri.vz_cislo_inen*/
		vz_cislo_inen?: string|null;
		/**DBCOLUMN:rzaspri.vz_cislo_vevz*/
		vz_cislo_vevz?: string|null;
		/**DBCOLUMN:rzaspri.vz_cislo_prof*/
		vz_cislo_prof?: string|null;
		/**DBCOLUMN:rzaspri.vz_cislo_etrz*/
		vz_cislo_etrz?: string|null;
		/**DBCOLUMN:rzaspri.vz_cislo_ivz*/
		vz_cislo_ivz?: string|null;
		/**DBCOLUMN:rzaspri.duz_zak*/
		poc_casti?: number|null;
		/**DBCOLUMN:rzaspri.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Detail.financovani 0/1/2*/
		financovani?: number|null;
		/**vazbyPP*/
		vazbyPP?: number|null;
		/**vazbyPPRok*/
		vazbyPPRok?: number|null;
		/**DBCOLUMN:Detail.zda_fk_pri*/
		zda_fk_pri?: string|null;
		/**DBCOLUMN:SeznamEvz.zda_revo*/
		zda_revo?: string|null;
		/**DBCOLUMN:SeznamEvz.zda_revo_p*/
		zda_revo_p?: number|null;
		preevidence?: number|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**id_kraj*/
		id_kraj?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
		/**id_zak_ci*/
		id_zak_ci?: string|null;
		priz_spec_slu?: number|null;
		priz_pred_vyj?: number|null;
		priz_mimo_zzvz?: number|null;
		predm_as_nab?: number|null;
		ext_admin?: number|null;
		evi_vysl?: number|null;
		spec_lhu_cast?: number|null;
		hodnot_uver?: number|null;
		proved_hodn?: number|null;
		sifr_podani?: number|null;
		priz_blok_dok?: number|null;
		zpus_zah?: number|null;
		/**
		*     vlastnosti
		*     
		*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		ControlsSystemAggregated?: Gordic.Gin.Interface.GControlsSystemAggregatedDto|null;
		/**stav finanční kontroly*/
		stav_fk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav účetní kontroly*/
		stav_uk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav průběžné kontroly*/
		stav_pk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		autor?: boolean|null;
		prideleno?: boolean|null;
		kod_tzp?: number|null;
		/**znak_s*/
		znak_s?: string|null;
		/**count*/
		count?: number|null;
		readOnly?: boolean|null;
		readOnlyDopl?: boolean|null;
		readOnlyBezZR?: boolean|null;
		readOnlyBezZRTP?: boolean|null;
		/**DBCOLUMN:Detail.kpi_financovani*/
		kpi_financovani?: JsonDecimal|null;
		/**DBCOLUMN:Detail.kpi_financovani*/
		kpi_harmonogram?: boolean|null;
		/**DBCOLUMN:Detail.kpi_financovani*/
		kpi_vazbaNaPlan?: boolean|null;
		/**DBCOLUMN:Detail.kpi_financovani*/
		kpi_blokaceZdroju?: boolean|null;
		/**DBCOLUMN:Detail.kpi_financovani*/
		kpi_prirazenoKeSpisu?: boolean|null;
		ixs_zak_mza?: string|null;
		akt_znacka?: string|null;
		pocet_nabidek?: number|null;
		ser_cis?: number|null;
		mode_gen_drd?: number|null;
		mode_gen_drd_txt?: string|null;
		pocetPKS?: number|null;
		ixp_dok_vaz?: string|null;
		ac_dok_vaz?: string|null;
		ixs_pri_evz?: string|null;
		cj_vz_evz?: string|null;
		priz_dns_kat?: number|null;
		priz_utaj?: number|null;
		evi_zve_nen?: number|null;
		evi_zve_nen_txt?: string|null;
		/**DBCOLUMN:rzaspri.dan_proc*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:rzaspri.dan_proc*/
		m?: JsonDecimal|null;
		zapisHist?: boolean|null;
		generovaneDecko?: boolean|null;
		zahajeni?: number|null;
		pocet_casti?: number|null;
		/**DBCOLUMN:rzaspri.vri_pri*/
		vri_pri_matky?: number|null;
	}
	const enum GRzaspriDtoNames { ixs_zak = "ixs_zak", nazev_rf = "nazev_rf", hlav_pred_pop = "hlav_pred_pop", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", pocet_kompetentu = "pocet_kompetentu", zpu_rea = "zpu_rea", zpu_rea_txt = "zpu_rea_txt", kat_pza = "kat_pza", kat_pza_txt = "kat_pza_txt", pap_tza = "pap_tza", pap_tza_txt = "pap_tza_txt", nazev = "nazev", ac = "ac", ac_ag = "ac_ag", leg_usm = "leg_usm", lze_poslat_dokumenty = "lze_poslat_dokumenty", lze_uverejnit_zakazku = "lze_uverejnit_zakazku", ac_sml = "ac_sml", pocet_sml = "pocet_sml", leg_usm_txt = "leg_usm_txt", cis_real = "cis_real", cis_real_ena = "cis_real_ena", cis_real_nazev = "cis_real_nazev", ixs_fun_komp = "ixs_fun_komp", ixs_fun_komp_ena = "ixs_fun_komp_ena", ixs_fun_akt = "ixs_fun_akt", ixs_fun_akt_txt = "ixs_fun_akt_txt", def_fzc = "def_fzc", def_fzc_txt = "def_fzc_txt", s_zak = "s_zak", s_zak_txt = "s_zak_txt", dat_zal = "dat_zal", pre_urc = "pre_urc", pre_urc_txt = "pre_urc_txt", lim_zak = "lim_zak", lim_zak_txt = "lim_zak_txt", rez_pri = "rez_pri", rez_pri_txt = "rez_pri_txt", fin_od = "fin_od", fin_do = "fin_do", tfi_pri = "tfi_pri", tfi_pri_txt = "tfi_pri_txt", rokMes_od = "rokMes_od", leg_usm_par = "leg_usm_par", leg_usm_par_txt = "leg_usm_par_txt", dan_typ = "dan_typ", dan_typ_txt = "dan_typ_txt", dan_proc = "dan_proc", castka_sml = "castka_sml", c_sum = "c_sum", c_predp_bez = "c_predp_bez", c_predp = "c_predp", jrb_urc = "jrb_urc", priz_uza_zak = "priz_uza_zak", priz_rea_aukce = "priz_rea_aukce", mena = "mena", mena_txt = "mena_txt", c_mena = "c_mena", poznamka = "poznamka", priz_cast = "priz_cast", priz_relcas = "priz_relcas", ixs_pri_nad = "ixs_pri_nad", ac_ag_nad = "ac_ag_nad", vri_pri = "vri_pri", vri_pri_txt = "vri_pri_txt", dri_pri = "dri_pri", dri_pri_txt = "dri_pri_txt", pri_zak = "pri_zak", pri_zak_txt = "pri_zak_txt", dat_zmena = "dat_zmena", dat_nen = "dat_nen", dat_poslPrenosNen = "dat_poslPrenosNen", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", ixp_den = "ixp_den", ixp_den_nazev = "ixp_den_nazev", ner_zak = "ner_zak", ner_zak_txt = "ner_zak_txt", duz_zak = "duz_zak", duz_zak_txt = "duz_zak_txt", dat_zru = "dat_zru", kpr_urc = "kpr_urc", kpr_urc_txt = "kpr_urc_txt", priz_bfin = "priz_bfin", dat_pred_ozn = "dat_pred_ozn", priz_pred_ozn = "priz_pred_ozn", priz_vaz_spis = "priz_vaz_spis", def_vaz_sml = "def_vaz_sml", dat_tp1_p = "dat_tp1_p", dat_tp1_s = "dat_tp1_s", dat_tp2_p = "dat_tp2_p", dat_tp2_s = "dat_tp2_s", dat_tp3_p = "dat_tp3_p", dat_tp3_s = "dat_tp3_s", dat_tp4_p = "dat_tp4_p", dat_tp4_s = "dat_tp4_s", dat_tp5_p = "dat_tp5_p", dat_tp5_s = "dat_tp5_s", dat_tp6_p = "dat_tp6_p", dat_tp6_s = "dat_tp6_s", dat_tp7_p = "dat_tp7_p", dat_tp7_s = "dat_tp7_s", c_fprof = "c_fprof", c_sch_bez = "c_sch_bez", c_sch = "c_sch", dat_sch = "dat_sch", c_uhr_bez = "c_uhr_bez", c_uhr = "c_uhr", priz_zve_inen = "priz_zve_inen", priz_zve_vevz = "priz_zve_vevz", priz_zve_prof = "priz_zve_prof", priz_zve_etrz = "priz_zve_etrz", vz_cislo_inen = "vz_cislo_inen", vz_cislo_vevz = "vz_cislo_vevz", vz_cislo_prof = "vz_cislo_prof", vz_cislo_etrz = "vz_cislo_etrz", vz_cislo_ivz = "vz_cislo_ivz", poc_casti = "poc_casti", ixp = "ixp", financovani = "financovani", vazbyPP = "vazbyPP", vazbyPPRok = "vazbyPPRok", zda_fk_pri = "zda_fk_pri", zda_revo = "zda_revo", zda_revo_p = "zda_revo_p", preevidence = "preevidence", el_obraz_typ = "el_obraz_typ", id_kraj = "id_kraj", el_obraz_soubor = "el_obraz_soubor", id_zak_ci = "id_zak_ci", priz_spec_slu = "priz_spec_slu", priz_pred_vyj = "priz_pred_vyj", priz_mimo_zzvz = "priz_mimo_zzvz", predm_as_nab = "predm_as_nab", ext_admin = "ext_admin", evi_vysl = "evi_vysl", spec_lhu_cast = "spec_lhu_cast", hodnot_uver = "hodnot_uver", proved_hodn = "proved_hodn", sifr_podani = "sifr_podani", priz_blok_dok = "priz_blok_dok", zpus_zah = "zpus_zah", vlastnosti = "vlastnosti", ControlsSystemAggregated = "ControlsSystemAggregated", stav_fk = "stav_fk", stav_uk = "stav_uk", stav_pk = "stav_pk", autor = "autor", prideleno = "prideleno", kod_tzp = "kod_tzp", znak_s = "znak_s", count = "count", readOnly = "readOnly", readOnlyDopl = "readOnlyDopl", readOnlyBezZR = "readOnlyBezZR", readOnlyBezZRTP = "readOnlyBezZRTP", kpi_financovani = "kpi_financovani", kpi_harmonogram = "kpi_harmonogram", kpi_vazbaNaPlan = "kpi_vazbaNaPlan", kpi_blokaceZdroju = "kpi_blokaceZdroju", kpi_prirazenoKeSpisu = "kpi_prirazenoKeSpisu", ixs_zak_mza = "ixs_zak_mza", akt_znacka = "akt_znacka", pocet_nabidek = "pocet_nabidek", ser_cis = "ser_cis", mode_gen_drd = "mode_gen_drd", mode_gen_drd_txt = "mode_gen_drd_txt", pocetPKS = "pocetPKS", ixp_dok_vaz = "ixp_dok_vaz", ac_dok_vaz = "ac_dok_vaz", ixs_pri_evz = "ixs_pri_evz", cj_vz_evz = "cj_vz_evz", priz_dns_kat = "priz_dns_kat", priz_utaj = "priz_utaj", evi_zve_nen = "evi_zve_nen", evi_zve_nen_txt = "evi_zve_nen_txt", kurz = "kurz", m = "m", zapisHist = "zapisHist", generovaneDecko = "generovaneDecko", zahajeni = "zahajeni", pocet_casti = "pocet_casti", vri_pri_matky = "vri_pri_matky", priz_spis = "priz_spis", typ_spis = "typ_spis", typ_ag = "typ_ag", s_fyz = "s_fyz", s_ele = "s_ele", s_odes = "s_odes", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico",}
	const enum GRzaspriDtoFragments { ixs_zak = "minimum", nazev_rf = "full", hlav_pred_pop = "minimum", lic = "remnants", ico = "remnants", ucs = "remnants", rok_zal = "full", pocet_kompetentu = "full", zpu_rea = "minimum", zpu_rea_txt = "minimum", kat_pza = "minimum", kat_pza_txt = "minimum", pap_tza = "full", pap_tza_txt = "full", nazev = "minimum", ac = "minimum", ac_ag = "minimum", leg_usm = "minimum", lze_poslat_dokumenty = "minimum", lze_uverejnit_zakazku = "minimum", ac_sml = "minimum", pocet_sml = "minimum", leg_usm_txt = "minimum", cis_real = "full", cis_real_ena = "full", cis_real_nazev = "full", ixs_fun_komp = "remnants", ixs_fun_komp_ena = "remnants", ixs_fun_akt = "minimum", ixs_fun_akt_txt = "minimum", def_fzc = "full", def_fzc_txt = "full", s_zak = "minimum", s_zak_txt = "minimum", dat_zal = "minimum", pre_urc = "full", pre_urc_txt = "full", lim_zak = "full", lim_zak_txt = "full", rez_pri = "full", rez_pri_txt = "full", fin_od = "full", fin_do = "full", tfi_pri = "full", tfi_pri_txt = "full", rokMes_od = "full", leg_usm_par = "minimum", leg_usm_par_txt = "minimum", dan_typ = "full", dan_typ_txt = "full", dan_proc = "full", castka_sml = "minimum", c_sum = "full", c_predp_bez = "full", c_predp = "full", jrb_urc = "full", priz_uza_zak = "minimum", priz_rea_aukce = "full", mena = "remnants", mena_txt = "remnants", c_mena = "remnants", poznamka = "remnants", priz_cast = "remnants", priz_relcas = "remnants", ixs_pri_nad = "full", ac_ag_nad = "full", vri_pri = "full", vri_pri_txt = "full", dri_pri = "full", dri_pri_txt = "full", pri_zak = "full", pri_zak_txt = "full", dat_zmena = "full", dat_nen = "full", dat_poslPrenosNen = "full", zmenu_prov = "full", zmenu_prov_txt = "full", ixp_den = "minimum", ixp_den_nazev = "minimum", ner_zak = "remnants", ner_zak_txt = "remnants", duz_zak = "remnants", duz_zak_txt = "remnants", dat_zru = "full", kpr_urc = "full", kpr_urc_txt = "full", priz_bfin = "full", dat_pred_ozn = "full", priz_pred_ozn = "full", priz_vaz_spis = "remnants", def_vaz_sml = "remnants", dat_tp1_p = "full", dat_tp1_s = "full", dat_tp2_p = "full", dat_tp2_s = "full", dat_tp3_p = "full", dat_tp3_s = "full", dat_tp4_p = "full", dat_tp4_s = "full", dat_tp5_p = "full", dat_tp5_s = "full", dat_tp6_p = "full", dat_tp6_s = "full", dat_tp7_p = "full", dat_tp7_s = "full", c_fprof = "full", c_sch_bez = "full", c_sch = "full", dat_sch = "full", c_uhr_bez = "remnants", c_uhr = "remnants", priz_zve_inen = "minimum", priz_zve_vevz = "remnants", priz_zve_prof = "remnants", priz_zve_etrz = "remnants", vz_cislo_inen = "minimum", vz_cislo_vevz = "remnants", vz_cislo_prof = "remnants", vz_cislo_etrz = "remnants", vz_cislo_ivz = "remnants", poc_casti = "remnants", ixp = "remnants", financovani = "foreach", vazbyPP = "foreach", vazbyPPRok = "foreach", zda_fk_pri = "foreach", zda_revo = "foreach", zda_revo_p = "foreach", preevidence = "remnants", el_obraz_typ = "remnants", id_kraj = "remnants", el_obraz_soubor = "remnants", id_zak_ci = "remnants", priz_spec_slu = "remnants", priz_pred_vyj = "remnants", priz_mimo_zzvz = "remnants", predm_as_nab = "remnants", ext_admin = "remnants", evi_vysl = "remnants", spec_lhu_cast = "remnants", hodnot_uver = "remnants", proved_hodn = "remnants", sifr_podani = "remnants", priz_blok_dok = "remnants", zpus_zah = "remnants", vlastnosti = "*", ControlsSystemAggregated = "DSG_FRAGMENT", stav_fk = "WFL_FK", stav_uk = "WFL_UK", stav_pk = "WFL_PK", autor = "minimum", prideleno = "minimum", kod_tzp = "*", znak_s = "minimum", count = "full", readOnly = "detail", readOnlyDopl = "detail", readOnlyBezZR = "detail", readOnlyBezZRTP = "detail", kpi_financovani = "remnants", kpi_harmonogram = "remnants", kpi_vazbaNaPlan = "remnants", kpi_blokaceZdroju = "remnants", kpi_prirazenoKeSpisu = "remnants", ixs_zak_mza = "remnants", akt_znacka = "remnants", pocet_nabidek = "minimum", ser_cis = "remnants", mode_gen_drd = "remnants", mode_gen_drd_txt = "remnants", pocetPKS = "remnants", ixp_dok_vaz = "remnants", ac_dok_vaz = "remnants", ixs_pri_evz = "remnants", cj_vz_evz = "remnants", priz_dns_kat = "remnants", priz_utaj = "remnants", evi_zve_nen = "minimum", evi_zve_nen_txt = "minimum", kurz = "remnants", m = "remnants", zapisHist = "*", generovaneDecko = "*", zahajeni = "*", pocet_casti = "*", vri_pri_matky = "*", priz_spis = "wflIconCalculator", typ_spis = "wflIconCalculator", typ_ag = "wflIconCalculator", s_fyz = "wflIconCalculator", s_ele = "wflIconCalculator", s_odes = "wflIconCalculator", s_prij = "wflIconCalculator", puvod = "wflIconCalculator", s_sgn = "wflIconCalculator", stav_pis = "wflIconCalculator", priz_cj = "wflIconCalculator", dat_vyriz_do = "wflIconCalculator", dat_vyriz = "wflIconCalculator", s_schval = "wflIconCalculator", stav_dist = "wflIconCalculator", ixs_fun = "wflIconCalculator", s_orig = "wflIconCalculator", ixp_spis_prir = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", typ_entity_ico = "wflIconCalculator", vlastnictvi_doruceni_ico = "wflIconCalculator", technicke_vlastnosti_ico = "wflIconCalculator", stav_zpracovani_ico = "wflIconCalculator", vlastnictvi_redistribuce_ico = "wflIconCalculator", pozice_spis_ico = "wflIconCalculator", termin_ico = "wflIconCalculator", doplnujici_informace_ico = "wflIconCalculator",}
	const enum GRzaspriDtoTypes { ixs_zak = "string", nazev_rf = "string", hlav_pred_pop = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", pocet_kompetentu = "number", zpu_rea = "number", zpu_rea_txt = "string", kat_pza = "number", kat_pza_txt = "string", pap_tza = "number", pap_tza_txt = "string", nazev = "string", ac = "string", ac_ag = "string", leg_usm = "number", lze_poslat_dokumenty = "boolean", lze_uverejnit_zakazku = "boolean", ac_sml = "string", pocet_sml = "number", leg_usm_txt = "string", cis_real = "string", cis_real_ena = "boolean", cis_real_nazev = "string", ixs_fun_komp = "string", ixs_fun_komp_ena = "boolean", ixs_fun_akt = "string", ixs_fun_akt_txt = "string", def_fzc = "number", def_fzc_txt = "string", s_zak = "number", s_zak_txt = "string", dat_zal = "JsonDate", pre_urc = "number", pre_urc_txt = "string", lim_zak = "number", lim_zak_txt = "string", rez_pri = "number", rez_pri_txt = "string", fin_od = "number", fin_do = "number", tfi_pri = "number", tfi_pri_txt = "string", rokMes_od = "string", leg_usm_par = "number", leg_usm_par_txt = "string", dan_typ = "number", dan_typ_txt = "string", dan_proc = "JsonDecimal", castka_sml = "JsonDecimal", c_sum = "JsonDecimal", c_predp_bez = "JsonDecimal", c_predp = "JsonDecimal", jrb_urc = "number", priz_uza_zak = "number", priz_rea_aukce = "number", mena = "number", mena_txt = "string", c_mena = "JsonDecimal", poznamka = "string", priz_cast = "number", priz_relcas = "number", ixs_pri_nad = "string", ac_ag_nad = "string", vri_pri = "number", vri_pri_txt = "string", dri_pri = "number", dri_pri_txt = "string", pri_zak = "number", pri_zak_txt = "string", dat_zmena = "JsonDate", dat_nen = "JsonDate", dat_poslPrenosNen = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", ixp_den = "string", ixp_den_nazev = "string", ner_zak = "number", ner_zak_txt = "string", duz_zak = "number", duz_zak_txt = "string", dat_zru = "JsonDate", kpr_urc = "number", kpr_urc_txt = "string", priz_bfin = "number", dat_pred_ozn = "JsonDate", priz_pred_ozn = "number", priz_vaz_spis = "number", def_vaz_sml = "number", dat_tp1_p = "JsonDate", dat_tp1_s = "JsonDate", dat_tp2_p = "JsonDate", dat_tp2_s = "JsonDate", dat_tp3_p = "JsonDate", dat_tp3_s = "JsonDate", dat_tp4_p = "JsonDate", dat_tp4_s = "JsonDate", dat_tp5_p = "JsonDate", dat_tp5_s = "JsonDate", dat_tp6_p = "JsonDate", dat_tp6_s = "JsonDate", dat_tp7_p = "JsonDate", dat_tp7_s = "JsonDate", c_fprof = "JsonDecimal", c_sch_bez = "JsonDecimal", c_sch = "JsonDecimal", dat_sch = "JsonDate", c_uhr_bez = "JsonDecimal", c_uhr = "JsonDecimal", priz_zve_inen = "number", priz_zve_vevz = "number", priz_zve_prof = "number", priz_zve_etrz = "number", vz_cislo_inen = "string", vz_cislo_vevz = "string", vz_cislo_prof = "string", vz_cislo_etrz = "string", vz_cislo_ivz = "string", poc_casti = "number", ixp = "string", financovani = "number", vazbyPP = "number", vazbyPPRok = "number", zda_fk_pri = "string", zda_revo = "string", zda_revo_p = "number", preevidence = "number", el_obraz_typ = "string", id_kraj = "string", el_obraz_soubor = "string", id_zak_ci = "string", priz_spec_slu = "number", priz_pred_vyj = "number", priz_mimo_zzvz = "number", predm_as_nab = "number", ext_admin = "number", evi_vysl = "number", spec_lhu_cast = "number", hodnot_uver = "number", proved_hodn = "number", sifr_podani = "number", priz_blok_dok = "number", zpus_zah = "number", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ControlsSystemAggregated = "Gordic.Gin.Interface.GControlsSystemAggregatedDto", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_uk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_pk = "Gordic.Wfl.Interface.GWflvdfkDto", autor = "boolean", prideleno = "boolean", kod_tzp = "number", znak_s = "string", count = "number", readOnly = "boolean", readOnlyDopl = "boolean", readOnlyBezZR = "boolean", readOnlyBezZRTP = "boolean", kpi_financovani = "JsonDecimal", kpi_harmonogram = "boolean", kpi_vazbaNaPlan = "boolean", kpi_blokaceZdroju = "boolean", kpi_prirazenoKeSpisu = "boolean", ixs_zak_mza = "string", akt_znacka = "string", pocet_nabidek = "number", ser_cis = "number", mode_gen_drd = "number", mode_gen_drd_txt = "string", pocetPKS = "number", ixp_dok_vaz = "string", ac_dok_vaz = "string", ixs_pri_evz = "string", cj_vz_evz = "string", priz_dns_kat = "number", priz_utaj = "number", evi_zve_nen = "number", evi_zve_nen_txt = "string", kurz = "JsonDecimal", m = "JsonDecimal", zapisHist = "boolean", generovaneDecko = "boolean", zahajeni = "number", pocet_casti = "number", vri_pri_matky = "number", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", typ_ag = "number", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_odes = "number", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]",}
	const enum GRzaspriDtoTypeLengths { ixs_zak = 12, nazev_rf = 50, lic = 4, ico = 10, ucs = 10, nazev = 254, ac = 30, ac_ag = 20, ixs_fun_komp = 12, ixs_fun_akt = 12, poznamka = 254, ixs_pri_nad = 12, ac_ag_nad = 12, zmenu_prov = 12, ixp_den = 12, vz_cislo_vevz = 30, vz_cislo_prof = 30, vz_cislo_etrz = 30, vz_cislo_ivz = 30, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Dto\Rza\Gordic.Pap.Interface.GRzaZadatelNovyWsDto.d.ts 

declare namespace Gordic.Pap.Interface {
	interface GRzaZadavatelNovyWsDto {
		ico?: string|null;
		identifikator?: string|null;
		nazev?: string|null;
		obec?: string|null;
		mail?: string|null;
		stat?: string|null;
		pravni_forma?: string|null;
	}
	const enum GRzaZadavatelNovyWsDtoNames { ico = "ico", identifikator = "identifikator", nazev = "nazev", obec = "obec", mail = "mail", stat = "stat", pravni_forma = "pravni_forma",}
	const enum GRzaZadavatelNovyWsDtoFragments { ico = "*", identifikator = "*", nazev = "*", obec = "*", mail = "*", stat = "*", pravni_forma = "*",}
	const enum GRzaZadavatelNovyWsDtoTypes { ico = "string", identifikator = "string", nazev = "string", obec = "string", mail = "string", stat = "string", pravni_forma = "string",}
	const enum GRzaZadavatelNovyWsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Filters\Gordic.Epo.Interface.GEpoFiltrVyberIxsPriDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Filtrovací dto pro výběr ixs_pri*/
	interface GEpoFiltrVyberIxsPriDto {
		/**název subjektu*/
		ixs_esu?: string|null;
		/**případ*/
		ixs_pri?: string|null;
		/**nabedo*/
		nabedo?: boolean|null;
		/**kniha*/
		ixp_den?: string|null;
	}
	const enum GEpoFiltrVyberIxsPriDtoNames { ixs_esu = "ixs_esu", ixs_pri = "ixs_pri", nabedo = "nabedo", ixp_den = "ixp_den",}
	const enum GEpoFiltrVyberIxsPriDtoFragments { ixs_esu = "*", ixs_pri = "*", nabedo = "*", ixp_den = "*",}
	const enum GEpoFiltrVyberIxsPriDtoTypes { ixs_esu = "string", ixs_pri = "string", nabedo = "boolean", ixp_den = "string",}
	const enum GEpoFiltrVyberIxsPriDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Filters\Gordic.Pap.Interface.GEpoFiltrVyberPorCisNabDto.d.ts 

declare namespace Gordic.Pap.Interface {
	/**Filtrovací dto pro výběr por_cis_nab*/
	interface GFiltrVyberPorCisNabDto {
		/**název subjektu*/
		ixs_esu?: string|null;
		/**případ*/
		ixs_pri?: string|null;
	}
	const enum GFiltrVyberPorCisNabDtoNames { ixs_esu = "ixs_esu", ixs_pri = "ixs_pri",}
	const enum GFiltrVyberPorCisNabDtoFragments { ixs_esu = "*", ixs_pri = "*",}
	const enum GFiltrVyberPorCisNabDtoTypes { ixs_esu = "string", ixs_pri = "string",}
	const enum GFiltrVyberPorCisNabDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Filters\Gordic.Pap.Interface.GPapXxxaaatFiltrDto.d.ts 

declare namespace Gordic.Pap.Interface {
	interface GPapXxxaaatFiltrDto {
		/**Evidenční číslo*/
		ac?: GIntervalDto<string>|null;
		/**Agendové číslo*/
		ac_ag?: GIntervalDto<string>|null;
		/**kompetent*/
		ixs_fun_komp?: string|null;
		/**vlastník*/
		ixs_fun_vl?: string|null;
		/**ico*/
		ico?: string|null;
		/**dič*/
		dic?: string|null;
		/**rč	elm*/
		elm?: Gordic.Pap.Interface.GPapCfuDto[]|null;
	}
	const enum GPapXxxaaatFiltrDtoNames { ac = "ac", ac_ag = "ac_ag", ixs_fun_komp = "ixs_fun_komp", ixs_fun_vl = "ixs_fun_vl", ico = "ico", dic = "dic", elm = "elm",}
	const enum GPapXxxaaatFiltrDtoFragments { ac = "*", ac_ag = "*", ixs_fun_komp = "*", ixs_fun_vl = "*", ico = "*", dic = "*", elm = "*",}
	const enum GPapXxxaaatFiltrDtoTypes { ac = "GIntervalDto<string>", ac_ag = "GIntervalDto<string>", ixs_fun_komp = "string", ixs_fun_vl = "string", ico = "string", dic = "string", elm = "Gordic.Pap.Interface.GPapCfuDto[]",}
	const enum GPapXxxaaatFiltrDtoTypeLengths {}
	/**DTO ulozeneho filtru*/
	interface GPapXxxaaatFilterStoredDto extends Gordic.Pap.Interface.GPapXxxaaatFiltrDto {
		/**Id*/
		id?: string|null;
		/**Name*/
		name?: string|null;
		/**Description*/
		description?: string|null;
	}
	const enum GPapXxxaaatFilterStoredDtoNames { id = "id", name = "name", description = "description", ac = "ac", ac_ag = "ac_ag", ixs_fun_komp = "ixs_fun_komp", ixs_fun_vl = "ixs_fun_vl", ico = "ico", dic = "dic", elm = "elm",}
	const enum GPapXxxaaatFilterStoredDtoFragments { id = "*", name = "*", description = "*", ac = "*", ac_ag = "*", ixs_fun_komp = "*", ixs_fun_vl = "*", ico = "*", dic = "*", elm = "*",}
	const enum GPapXxxaaatFilterStoredDtoTypes { id = "string", name = "string", description = "string", ac = "GIntervalDto<string>", ac_ag = "GIntervalDto<string>", ixs_fun_komp = "string", ixs_fun_vl = "string", ico = "string", dic = "string", elm = "Gordic.Pap.Interface.GPapCfuDto[]",}
	const enum GPapXxxaaatFilterStoredDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\PAP\Obecne\Gordic.Vfp.Interface.VfpspriService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Obecné metody*/
	interface PapObecneService {
		/**Nastaví režim podle Ekoparams.IxpDen*/
		nastavRezim(rq?:CallParams<{}>): _Task<{},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapObecneService: ServiceBase & Catalog.PapObecneService;
	}
	const PapObecneService: Client["PapObecneService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Administrace\Gordic.Pap.Interface.IGPapAdministrace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Administrace tabulek*/
	interface PapAdministrace {
		/**Kategorie*/
		listEvzskpu(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GEvzskpuDto>>;
		/**Oblasti*/
		listVfpsobl(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GVfpsoblDto>>;
		/**AZ*/
		listEvzsaza(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GEvzsazaDto>>;
		/**Typ dgr*/
		listVfpctdg(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GVfpctdgDto>>;
		/**Komise*/
		listEvzsoko(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GEvzsokoDto>>;
		/**Kategorie*/
		listEvzskdn(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GEvzskdnDto>>;
		/**Určení*/
		listRzaskpu(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GRzaskpuDto>>;
		/**Legislativa*/
		listMzactyd(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GMzactydDto>>;
		/**Určení*/
		listMzacsou(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GMzacsouDto>>;
		/**Legislativa*/
		listRzasleg(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GRzaslegDto>>;
		listRzavlek(rq?:CallParams<{leg_usm_par:number}>): _Task<{leg_usm_par:number},GServiceListResponse<Gordic.Pap.Interface.GRzavlekDto>>;
		listRzacrez(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GRzacrezDto>>;
		listRzacpru(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GRzacpruDto>>;
		listRzacvri(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GRzacvriDto>>;
		listRzaczpr(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GRzaczprDto>>;
		listRzascfp(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GRzascfpDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktEvzskpu(rq?:CallParams<{kat_pru:number,aktivita:number}>): _Task<{kat_pru:number,aktivita:number},GServiceSaveResponse<Gordic.Pap.Interface.GEvzskpuDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktVfpsobl(rq?:CallParams<{oblast_dt:string,aktivita:number}>): _Task<{oblast_dt:string,aktivita:number},GServiceSaveResponse<Gordic.Pap.Interface.GVfpsoblDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktEvzsaza(rq?:CallParams<{ixs_aza:string,aktivita:number}>): _Task<{ixs_aza:string,aktivita:number},GServiceSaveResponse<Gordic.Pap.Interface.GEvzsazaDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktEvzsoko(rq?:CallParams<{ixs_oko:string,aktivita:number}>): _Task<{ixs_oko:string,aktivita:number},GServiceSaveResponse<Gordic.Pap.Interface.GEvzsokoDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktEvzskdn(rq?:CallParams<{ixs_kdn:string,aktivita:number}>): _Task<{ixs_kdn:string,aktivita:number},GServiceSaveResponse<Gordic.Pap.Interface.GEvzskdnDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktRzaskpu(rq?:CallParams<{kpr_urc:number,aktivita:number}>): _Task<{kpr_urc:number,aktivita:number},GServiceSaveResponse<Gordic.Pap.Interface.GRzaskpuDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktRzasleg(rq?:CallParams<{leg_usm_par:number,aktivita:number}>): _Task<{leg_usm_par:number,aktivita:number},GServiceSaveResponse<Gordic.Pap.Interface.GRzaslegDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktRzavlek(rq?:CallParams<{leg_usm_par:number,ixp_den:string,aktivita:number}>): _Task<{leg_usm_par:number,ixp_den:string,aktivita:number},GServiceSaveResponse<Gordic.Pap.Interface.GRzavlekDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktRzacrez(rq?:Gordic.Pap.Interface.GRzacrezDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzacrezDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzacrezDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzacrezDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktRzacpru(rq?:Gordic.Pap.Interface.GRzacpruDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzacpruDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzacpruDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzacpruDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktRzacvri(rq?:Gordic.Pap.Interface.GRzacvriDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzacvriDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzacvriDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzacvriDto>>;
		/**Zaktivní/zneaktivní záznam*/
		updateAktRzaczpr(rq?:Gordic.Pap.Interface.GRzaczprDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzaczprDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzaczprDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzaczprDto>>;
		/**Vloží záznam do seznamu*/
		createEvzskpu(rq?:Gordic.Pap.Interface.GEvzskpuDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskpuDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskpuDto>,GServiceSaveResponse<Gordic.Pap.Interface.GEvzskpuDto>>;
		/**Vloží záznam do seznamu*/
		createVfpsobl(rq?:Gordic.Pap.Interface.GVfpsoblDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GVfpsoblDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GVfpsoblDto>,GServiceSaveResponse<Gordic.Pap.Interface.GVfpsoblDto>>;
		/**Vloží záznam do seznamu*/
		createEvzsaza(rq?:Gordic.Pap.Interface.GEvzsazaDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsazaDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsazaDto>,GServiceSaveResponse<Gordic.Pap.Interface.GEvzsazaDto>>;
		/**Vloží záznam do seznamu*/
		createVfpctdg(rq?:Gordic.Pap.Interface.GVfpctdgDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GVfpctdgDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GVfpctdgDto>,GServiceSaveResponse<Gordic.Pap.Interface.GVfpctdgDto>>;
		/**Vloží záznam do seznamu*/
		createEvzsoko(rq?:Gordic.Pap.Interface.GEvzsokoDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>,GServiceSaveResponse<Gordic.Pap.Interface.GEvzsokoDto>>;
		/**Vloží záznam do seznamu*/
		createEvzskdn(rq?:Gordic.Pap.Interface.GEvzskdnDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>,GServiceSaveResponse<Gordic.Pap.Interface.GEvzskdnDto>>;
		/**Vloží záznam do seznamu*/
		createRzaskpu(rq?:Gordic.Pap.Interface.GRzaskpuDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzaskpuDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzaskpuDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzaskpuDto>>;
		/**Vloží záznam do seznamu*/
		createRzasleg(rq?:Gordic.Pap.Interface.GRzaslegDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzaslegDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzaslegDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzaslegDto>>;
		/**Vloží záznam do seznamu*/
		createRzavlek(rq?:Gordic.Pap.Interface.GRzavlekDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzavlekDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzavlekDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzavlekDto>>;
		/**Vloží záznam do seznamu*/
		createRzascfp(rq?:Gordic.Pap.Interface.GRzascfpDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzascfpDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzascfpDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzascfpDto>>;
		/**update záznamu*/
		updateEvzskpu(rq?:Gordic.Pap.Interface.GEvzskpuDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskpuDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskpuDto>,GServiceSaveResponse<Gordic.Pap.Interface.GEvzskpuDto>>;
		/**update záznamu*/
		updateVfpsobl(rq?:Gordic.Pap.Interface.GVfpsoblDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GVfpsoblDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GVfpsoblDto>,GServiceSaveResponse<Gordic.Pap.Interface.GVfpsoblDto>>;
		/**update záznamu*/
		updateEvzsaza(rq?:Gordic.Pap.Interface.GEvzsazaDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsazaDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsazaDto>,GServiceSaveResponse<Gordic.Pap.Interface.GEvzsazaDto>>;
		/**update záznamu*/
		updateVfpctdg(rq?:Gordic.Pap.Interface.GVfpctdgDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GVfpctdgDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GVfpctdgDto>,GServiceSaveResponse<Gordic.Pap.Interface.GVfpctdgDto>>;
		/**update záznamu*/
		updateEvzsoko(rq?:Gordic.Pap.Interface.GEvzsokoDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzsokoDto>,GServiceSaveResponse<Gordic.Pap.Interface.GEvzsokoDto>>;
		/**update záznamu*/
		updateEvzskdn(rq?:Gordic.Pap.Interface.GEvzskdnDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GEvzskdnDto>,GServiceSaveResponse<Gordic.Pap.Interface.GEvzskdnDto>>;
		/**update záznamu*/
		updateRzasleg(rq?:Gordic.Pap.Interface.GRzaslegDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzaslegDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzaslegDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzaslegDto>>;
		/**update záznamu*/
		updateRzaskpu(rq?:Gordic.Pap.Interface.GRzaskpuDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzaskpuDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzaskpuDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzaskpuDto>>;
		/**update záznamu*/
		updateRzascfp(rq?:Gordic.Pap.Interface.GRzascfpDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GRzascfpDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GRzascfpDto>,GServiceSaveResponse<Gordic.Pap.Interface.GRzascfpDto>>;
		/**detail*/
		readEvzskpu(rq?:CallParams<{kat_pru:number}>): _Task<{kat_pru:number},GServiceReadResponse<Gordic.Pap.Interface.GEvzskpuDto>>;
		/**detail*/
		readEvzsaza(rq?:CallParams<{ixs_aza:string}>): _Task<{ixs_aza:string},GServiceReadResponse<Gordic.Pap.Interface.GEvzsazaDto>>;
		/**detail*/
		readVfpsobl(rq?:CallParams<{oblast_dt:string}>): _Task<{oblast_dt:string},GServiceReadResponse<Gordic.Pap.Interface.GVfpsoblDto>>;
		/**detail*/
		readVfpctdg(rq?:CallParams<{typ_dgr:string}>): _Task<{typ_dgr:string},GServiceReadResponse<Gordic.Pap.Interface.GVfpctdgDto>>;
		/**detail*/
		readEvzsoko(rq?:CallParams<{ixs_oko:string}>): _Task<{ixs_oko:string},GServiceReadResponse<Gordic.Pap.Interface.GEvzsokoDto>>;
		/**detail*/
		readEvzskdn(rq?:CallParams<{ixs_kdn:string}>): _Task<{ixs_kdn:string},GServiceReadResponse<Gordic.Pap.Interface.GEvzskdnDto>>;
		/**detail*/
		readRzaskpu(rq?:CallParams<{kpr_urc:number}>): _Task<{kpr_urc:number},GServiceReadResponse<Gordic.Pap.Interface.GRzaskpuDto>>;
		/**detail*/
		readRzasleg(rq?:CallParams<{leg_usm_par:number}>): _Task<{leg_usm_par:number},GServiceReadResponse<Gordic.Pap.Interface.GRzaslegDto>>;
		/**detail*/
		readMzacsou(rq?:CallParams<{druh_zad_riz:number}>): _Task<{druh_zad_riz:number},GServiceReadResponse<Gordic.Pap.Interface.GMzacsouDto>>;
		/**detail*/
		readMzactyd(rq?:CallParams<{typ_doza:number}>): _Task<{typ_doza:number},GServiceReadResponse<Gordic.Pap.Interface.GMzactydDto>>;
		/**detail*/
		readRzacrez(rq?:CallParams<{rez_pri:number}>): _Task<{rez_pri:number},GServiceReadResponse<Gordic.Pap.Interface.GRzacrezDto>>;
		/**detail*/
		readRzacpru(rq?:CallParams<{pre_urc:number}>): _Task<{pre_urc:number},GServiceReadResponse<Gordic.Pap.Interface.GRzacpruDto>>;
		/**detail*/
		readRzacvri(rq?:CallParams<{vri_pri:number}>): _Task<{vri_pri:number},GServiceReadResponse<Gordic.Pap.Interface.GRzacvriDto>>;
		/**detail*/
		readRzaczpr(rq?:CallParams<{zpu_rea:number}>): _Task<{zpu_rea:number},GServiceReadResponse<Gordic.Pap.Interface.GRzaczprDto>>;
		/**detail*/
		readRzascfp(rq?:CallParams<{por_cis:number}>): _Task<{por_cis:number},GServiceReadResponse<Gordic.Pap.Interface.GRzascfpDto>>;
		/**update záznamu*/
		updateRzavlekHrom(rq?:CallParams<{leg_usm_par:number,ixp_den:string[]}>): _Task<{leg_usm_par:number,ixp_den:string[]},boolean>;
		vyberKnihy(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Pap.Interface.GRzavlekDto>>;
		vyradit(rq?:CallParams<{leg_usm_par:number,nazev:string,vyradit:boolean}>): _Task<{leg_usm_par:number,nazev:string,vyradit:boolean},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapAdministrace: ServiceBase & Catalog.PapAdministrace;
	}
	const PapAdministrace: Client["PapAdministrace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\DashBoard\Gordic.Pap.Interface.IGDashBoard.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Data pro dashboard*/
	interface PapDashBoard {
		/**podklady pro dashboard*/
		read(rq?:Gordic.Pap.Interface.GDashBoardParamsDto|CallParams<GServiceReadRequest<Gordic.Pap.Interface.GDashBoardParamsDto>>): _Task<GServiceReadRequest<Gordic.Pap.Interface.GDashBoardParamsDto>,GServiceReadResponse<Gordic.Pap.Interface.GPapDashboardDto>>;
		/**podklady pro dashboard*/
		readPanel1(rq?:Gordic.Pap.Interface.GDashBoardParamsDto|CallParams<GServiceReadRequest<Gordic.Pap.Interface.GDashBoardParamsDto>>): _Task<GServiceReadRequest<Gordic.Pap.Interface.GDashBoardParamsDto>,GServiceReadResponse<Gordic.Pap.Interface.GPapDashboardPanel1Dto>>;
		/**podklady pro dashboard*/
		readPanel2(rq?:Gordic.Pap.Interface.GDashBoardParamsDto|CallParams<GServiceReadRequest<Gordic.Pap.Interface.GDashBoardParamsDto>>): _Task<GServiceReadRequest<Gordic.Pap.Interface.GDashBoardParamsDto>,GServiceReadResponse<Gordic.Pap.Interface.GPapDashboardPanel2Dto>>;
		/**podklady pro dashboard*/
		readPanel3(rq?:Gordic.Pap.Interface.GDashBoardParamsDto|CallParams<GServiceReadRequest<Gordic.Pap.Interface.GDashBoardParamsDto>>): _Task<GServiceReadRequest<Gordic.Pap.Interface.GDashBoardParamsDto>,GServiceListResponse<Gordic.Pap.Interface.GPapHistDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapDashBoard: ServiceBase & Catalog.PapDashBoard;
	}
	const PapDashBoard: Client["PapDashBoard"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Detail\RozsirenyPopis\Gordic.Pap.Interface.IGRozsirenyPopis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Návrhy*/
	interface PapRozsirenyPopis {
		/**seznam podkladů pro návrhy*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxvpopTransDto>>;
		/**generování návrhů smluv*/
		insert(rq?:Gordic.Pap.Interface.GXxxvpopTransDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GXxxvpopTransDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GXxxvpopTransDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapRozsirenyPopis: ServiceBase & Catalog.PapRozsirenyPopis;
	}
	const PapRozsirenyPopis: Client["PapRozsirenyPopis"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\DetailSeznam\Schvaleni\Gordic.Pap.Interface.IGSchvaleni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Návrhy - prohlížení*/
	interface PapSchvaleni {
		/**odstranit záznam*/
		schvaleni(rq?:Gordic.Pap.Interface.GPapCommonArrayDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPapCommonArrayDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPapCommonArrayDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Kontrola polí částka a datum při schvalování*/
		kontrola(rq?:Gordic.Pap.Interface.GPapSchvalParamConstDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPapSchvalParamConstDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPapSchvalParamConstDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapSchvaleni: ServiceBase & Catalog.PapSchvaleni;
	}
	const PapSchvaleni: Client["PapSchvaleni"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\DetailSeznam\Ukonceni\Gordic.Pap.Interface.IGUkonceni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Ukončení*/
	interface PapUkonceni {
		/**odstranit záznam*/
		ukonceni(rq?:Gordic.Pap.Interface.GPapCommonArrayDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPapCommonArrayDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPapCommonArrayDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapUkonceni: ServiceBase & Catalog.PapUkonceni;
	}
	const PapUkonceni: Client["PapUkonceni"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Dodavatele\Gordic.Pap.Interface.IGPapDodavatele.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Dodavatele
	* @domain PapDodavatele
	*/
	interface PapDodavatele {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GMzasdodDto>>;
		/**párování Ginis/NEN*/
		parovani(rq?:CallParams<{vse:boolean}>): _Task<{vse:boolean},Gordic.Pap.Interface.GCommonReturnDto>;
		/**detail dokumentu*/
		listDod(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.Dto.GGinsesuDto>>;
		/**update mzasdod*/
		update(rq?:Gordic.Pap.Interface.GMzasdodDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GMzasdodDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GMzasdodDto>,GServiceSaveResponse<Gordic.Pap.Interface.GMzasdodDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapDodavatele: ServiceBase & Catalog.PapDodavatele;
	}
	const PapDodavatele: Client["PapDodavatele"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Financovani\Gordic.Pap.Interface.IGFinancovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Položky financování*/
	interface PapFinancovani {
		/**Seznam položek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxspolDto>>;
		/**Insert/update záznamu financování*/
		upsert(rq?:Gordic.Pap.Interface.GPapAddUpdFinDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPapAddUpdFinDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPapAddUpdFinDto>,GServiceSaveResponse<Gordic.Pap.Interface.GPapAddUpdFinDto>>;
		/**Update záznamu (storno/evidence/schválení - up_stav 90/20/30)*/
		update(rq?:Gordic.Pap.Interface.GPapAddUpdFinDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPapAddUpdFinDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPapAddUpdFinDto>,GServiceSaveResponse<Gordic.Pap.Interface.GPapAddUpdFinDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapFinancovani: ServiceBase & Catalog.PapFinancovani;
	}
	const PapFinancovani: Client["PapFinancovani"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Financovani\Gordic.Pap.Interface.IGStavFinancovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Stav financování*/
	interface PapStavFinancovani {
		/**Plán*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxaaatDto>>;
		/**Seznam financování*/
		seznamList(rq?:Gordic.Pap.Interface.GPapXxxaaatFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxaaatDto>>;
		/**počet záznamů*/
		count(rq?:Gordic.Pap.Interface.GPapXxxaaatFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Načte celkovou částku financování*/
		nactiCastku(rq?:CallParams<{ixs_pri:string}>): _Task<{ixs_pri:string},JsonDecimal>;
		vratIxsPriVyhodnotCastky(rq?:CallParams<{a_hodnota:string,a_priznak:number,a_c_sch:JsonDecimal,stav:number,vlastnik:boolean}>): _Task<{a_hodnota:string,a_priznak:number,a_c_sch:JsonDecimal,stav:number,vlastnik:boolean},Gordic.Pap.Interface.GCommonReturnDto>;
		upravCastku(rq?:CallParams<{ixs_pri:string}>): _Task<{ixs_pri:string},Gordic.Pap.Interface.GCommonReturnDto>;
		/**Naplnění parametrů pro formulář detailu*/
		ulozIdentifikaceVZ(rq?:Gordic.Pap.Interface.GIdentVZDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GIdentVZDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GIdentVZDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapStavFinancovani: ServiceBase & Catalog.PapStavFinancovani;
	}
	const PapStavFinancovani: Client["PapStavFinancovani"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Financovani\KontrolaFinancovani\Gordic.Pap.Interface.IGFinancovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kontrola financování*/
	interface PapKontrolaFinancovani {
		/**Seznam položek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxakfiDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapKontrolaFinancovani: ServiceBase & Catalog.PapKontrolaFinancovani;
	}
	const PapKontrolaFinancovani: Client["PapKontrolaFinancovani"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Financovani\PlanRozpocet\Gordic.Pap.Interface.IGFinancovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Položky plánu rozpočtu*/
	interface PapPlanRozpocet {
		/**Seznam položek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GRozpocetDto>>;
		/**Parametry pro vyhledávání položek*/
		nactiParametryVyhledavani(rq?:CallParams<{ixs_pri:string}>): _Task<{ixs_pri:string},Gordic.Pap.Interface.GParamRozpocetReturnDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapPlanRozpocet: ServiceBase & Catalog.PapPlanRozpocet;
	}
	const PapPlanRozpocet: Client["PapPlanRozpocet"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Financovani\Pozadavky\Gordic.Pap.Interface.IGPozadavky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Požadavky*/
	interface PapPozadavky {
		/**seznam požadavků*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSrvdixpDto>>;
		/**upravit záznam*/
		update(rq?:Gordic.Pap.Interface.GSrvdixpDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GSrvdixpDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GSrvdixpDto>,GServiceSaveResponse<Gordic.Pap.Interface.GSrvdixpDto>>;
		/**vložení záznamu*/
		insert(rq?:Gordic.Pap.Interface.GSrvdixpDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GSrvdixpDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GSrvdixpDto>,GServiceSaveResponse<Gordic.Pap.Interface.GSrvdixpDto>>;
		/**odstranit záznam*/
		delete(rq?:Gordic.Pap.Interface.GSrvdixpDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GSrvdixpDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GSrvdixpDto>,GServiceSaveResponse<Gordic.Pap.Interface.GSrvdixpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapPozadavky: ServiceBase & Catalog.PapPozadavky;
	}
	const PapPozadavky: Client["PapPozadavky"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Financovani\Pozadavky\Gordic.Pap.Interface.IGPozadavkyNovy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Požadavky*/
	interface PapPozadavkyNovy {
		/**seznam požadavků*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSrvdixpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapPozadavkyNovy: ServiceBase & Catalog.PapPozadavkyNovy;
	}
	const PapPozadavkyNovy: Client["PapPozadavkyNovy"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Financovani\Uvolneni\Gordic.Pap.Interface.IGFinancovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Položky plánu rozpočtu*/
	interface PapUvolneni {
		/**Seznam položek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GPapUvolneniDto>>;
		/**uvolnění částky*/
		update(rq?:Gordic.Pap.Interface.GPapUvolneniUpdDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPapUvolneniUpdDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPapUvolneniUpdDto>,GServiceSaveResponse<Gordic.Pap.Interface.GPapUvolneniUpdDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapUvolneni: ServiceBase & Catalog.PapUvolneni;
	}
	const PapUvolneni: Client["PapUvolneni"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\HromadneOperace\Gordic.Pap.Interface.IGPapHromadneOperace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hromadné operace
	*     ///
	*/
	interface PapHromadneOperace {
		/**Kontrola dat před spuštěním HO*/
		kontrolaHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string}>): _Task<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Provedení HO*/
		provedeniHO(rq?:CallParams<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string,paramPriEsu:string}>): _Task<{rq:GServiceReadRequest<Gordic.Pap.Interface.GPapStruDto>,akce:string,paramPriEsu:string},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Provedení HO*/
		provedeniPreevid(rq?:CallParams<{list:string[],akce:string,parammetry:Gordic.Pap.Interface.GPapParamsPreevidDto,uvolneni:boolean}>): _Task<{list:string[],akce:string,parammetry:Gordic.Pap.Interface.GPapParamsPreevidDto,uvolneni:boolean},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
		/**Provedení HO*/
		provedeniPrXxxxx(rq?:CallParams<{list:string[],akce:string,parammetry:Gordic.Pap.Interface.GPapParamsPreevidDto}>): _Task<{list:string[],akce:string,parammetry:Gordic.Pap.Interface.GPapParamsPreevidDto},GServiceReadResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapHromadneOperace: ServiceBase & Catalog.PapHromadneOperace;
	}
	const PapHromadneOperace: Client["PapHromadneOperace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Kniha\Gordic.Pap.Interface.IGPapKniha.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\KonektorNen\Gordic.Pap.Interface.IGPapNen.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Konektor NEN
	*     
	* @domain PapNen
	*/
	interface PapNen {
		/**
		*     Import z NEN - seznam dodavatelů
		*     
		*/
		ziskejSeznamDodavatelu(rq?:CallParams<{inp:Gordic.Pap.Interface.GDodavateleInp}>): _Task<{inp:Gordic.Pap.Interface.GDodavateleInp},Gordic.Pap.Interface.GDodavateleOutDto>;
		/**
		*     Import z NEN - organizační struktura
		*     
		*/
		ziskejOrgStru(rq?:CallParams<{inp:Gordic.Pap.Interface.GOrgStruInp}>): _Task<{inp:Gordic.Pap.Interface.GOrgStruInp},Gordic.Pap.Interface.GOrgStruOutDto>;
		/**
		*     Import z NEN - seznam VZ
		*     
		*/
		ziskejSeznamZp(rq?:CallParams<{inp:Gordic.Pap.Interface.GSeznamZpInp,insert:boolean}>): _Task<{inp:Gordic.Pap.Interface.GSeznamZpInp,insert:boolean},Gordic.Pap.Interface.GSeznamZpOutDto>;
		/**
		*     Import vybrané dávky archivních dat
		*     
		*/
		ziskejDavku(rq?:CallParams<{inp:Gordic.Pap.Interface.GArchivInp}>): _Task<{inp:Gordic.Pap.Interface.GArchivInp},Gordic.Pap.Interface.GMzaArchivOutDto>;
		/**
		*     Import dokumentů davky
		*     
		*/
		stahniDokumentyDavky(rq?:CallParams<{inp:Gordic.Pap.Interface.GStahniDokumentyInp}>): _Task<{inp:Gordic.Pap.Interface.GStahniDokumentyInp},Gordic.Pap.Interface.GZpOutDto>;
		/**
		*     Import dokumentu
		*     
		*/
		stahniDokument(rq?:CallParams<{inp:Gordic.Pap.Interface.GStahniDokumentInp}>): _Task<{inp:Gordic.Pap.Interface.GStahniDokumentInp},Gordic.Pap.Interface.GZpOutDto>;
		/**
		*     Import dokumentu
		*     
		*/
		stahniDokumentKom(rq?:CallParams<{inp:Gordic.Pap.Interface.GStahniDokumentInp}>): _Task<{inp:Gordic.Pap.Interface.GStahniDokumentInp},Gordic.Pap.Interface.GMzaKomunikaceDto>;
		/**
		*     Import z NEN - detail VZ
		*     
		*/
		ziskejZp(rq?:CallParams<{inp:Gordic.Pap.Interface.GZpInp}>): _Task<{inp:Gordic.Pap.Interface.GZpInp},Gordic.Pap.Interface.GZpOutDto>;
		/**
		*     Test spojení
		*     
		*/
		test(rq?:CallParams<{}>): _Task<{},Gordic.Gin.Interface.GAibConnectorInfoDto>;
		/**
		*     Smazání dávky nebo všech dat
		*     
		*/
		smazat(rq?:CallParams<{inp:Gordic.Pap.Interface.GSmazatInp}>): _Task<{inp:Gordic.Pap.Interface.GSmazatInp},Gordic.Pap.Interface.GCommonReturnDto>;
		/**
		*     Zpracování dávky 
		*     
		*/
		zpracovat(rq?:CallParams<{inp:Gordic.Pap.Interface.GZpracovatInp}>): _Task<{inp:Gordic.Pap.Interface.GZpracovatInp},Gordic.Pap.Interface.GMzaArchivOutDto>;
		/**
		*     Vrátí obsah vcetne souboru
		*     
		*/
		getFile(rq?:CallParams<{id:string,typTabulky:string}>): _Task<{id:string,typTabulky:string},Gordic.Pap.Interface.GMzatdonDto>;
		/**
		*     Export do NEN
		*     
		*/
		exportNEN(rq?:CallParams<{data:Gordic.Pap.Interface.GRzaspriDto}>): _Task<{data:Gordic.Pap.Interface.GRzaspriDto},Gordic.Pap.Interface.GCommonReturnDto>;
		/**
		*     Export souborů do NEN
		*     
		*/
		exportSoubNEN(rq?:CallParams<{soubory:Gordic.Pap.Interface.GRzaseszDto[],ixs_zak:string,vz_cislo_inen:string}>): _Task<{soubory:Gordic.Pap.Interface.GRzaseszDto[],ixs_zak:string,vz_cislo_inen:string},Gordic.Pap.Interface.GCommonReturnDto>;
		/**
		*     KontrolaUchaDod
		*     
		*/
		kontrolaUchaDod(rq?:CallParams<{param:Gordic.Pap.Interface.GPodaniInp}>): _Task<{param:Gordic.Pap.Interface.GPodaniInp},Gordic.Pap.Interface.GPodaniZpOutDto>;
		/**
		*     Prvotní import dat
		*     
		*/
		prvotniImportZp(rq?:CallParams<{pocet:number,rok:number}>): _Task<{pocet:number,rok:number},Gordic.Pap.Interface.GCommonReturnDto>;
		ziskejDruhyZadavacihoRizeni(rq?:CallParams<{inp:Gordic.Pap.Interface.GDruhyZRInp}>): _Task<{inp:Gordic.Pap.Interface.GDruhyZRInp},Gordic.Pap.Interface.GDruhZadRizOutDto>;
		ziskejKomunikaciZP(rq?:CallParams<{inp:Gordic.Pap.Interface.GKomunikaceZpInp}>): _Task<{inp:Gordic.Pap.Interface.GKomunikaceZpInp},Gordic.Pap.Interface.GMzaKomunikaceDto>;
		/**
		*     Doplnění úkonů
		*     
		*/
		ukonyZp(rq?:CallParams<{rok:number,mesic:number}>): _Task<{rok:number,mesic:number},Gordic.Pap.Interface.GCommonReturnDto>;
		exportDetiNEN(rq?:CallParams<{zaznam:Gordic.Pap.Interface.GRzaspriDto}>): _Task<{zaznam:Gordic.Pap.Interface.GRzaspriDto},Gordic.Pap.Interface.GCommonReturnDto>;
		zverejnitExportNEN(rq?:CallParams<{data:Gordic.Pap.Interface.GRzaspriDto}>): _Task<{data:Gordic.Pap.Interface.GRzaspriDto},Gordic.Pap.Interface.GCommonReturnDto>;
		doplExportNEN(rq?:CallParams<{data:Gordic.Pap.Interface.GRzaspriDto}>): _Task<{data:Gordic.Pap.Interface.GRzaspriDto},Gordic.Pap.Interface.GCommonReturnDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapNen: ServiceBase & Catalog.PapNen;
	}
	const PapNen: Client["PapNen"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Menu\Gordic.Pap.Interface.IGNavrhyProhl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**utility pro základní menu*/
	interface PapMenu {
		/**Vrátí ixp dokumentu podle zadaných kriterií*/
		nactiId(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,Gordic.Pap.Interface.GVyberPripadDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapMenu: ServiceBase & Catalog.PapMenu;
	}
	const PapMenu: Client["PapMenu"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Navrhy\Gordic.Pap.Interface.IGNavrhy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Návrhy*/
	interface PapNavrhy {
		/**seznam podkladů pro návrhy*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxsesuDto>>;
		/**generování návrhů smluv*/
		generuj(rq?:Gordic.Pap.Interface.GPapGenerujSmlDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPapGenerujSmlDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPapGenerujSmlDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapNavrhy: ServiceBase & Catalog.PapNavrhy;
	}
	const PapNavrhy: Client["PapNavrhy"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Navrhy\Prohlizeni\Gordic.Pap.Interface.IGNavrhyProhl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Návrhy - prohlížení*/
	interface PapNavrhyProhl {
		/**seznam podkladů pro návrhy*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSmlsiabDto>>;
		/**odstranit záznam*/
		delete(rq?:Gordic.Pap.Interface.GPapSmazatSmlDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GPapSmazatSmlDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GPapSmazatSmlDto>,GServiceSaveResponse<Gordic.Pap.Interface.GCommonReturnDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapNavrhyProhl: ServiceBase & Catalog.PapNavrhyProhl;
	}
	const PapNavrhyProhl: Client["PapNavrhyProhl"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Navrhy\Sablony\Gordic.Pap.Interface.IGSablony.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Šablony*/
	interface PapSablony {
		/**detail dokumentů*/
		read(rq?:Gordic.Pap.Interface.GSmlxsblDto|CallParams<GServiceReadRequest<Gordic.Pap.Interface.GSmlxsblDto>>): _Task<GServiceReadRequest<Gordic.Pap.Interface.GSmlxsblDto>,GServiceReadResponse<Gordic.Pap.Interface.GSmlUpdAddsblDto>>;
		/**Seznam šablon*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSmlxsblDto>>;
		/**upravit šablonu*/
		update(rq?:Gordic.Pap.Interface.GSmlUpdAddsblDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GSmlUpdAddsblDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GSmlUpdAddsblDto>,GServiceSaveResponse<Gordic.Pap.Interface.GSmlUpdAddsblDto>>;
		/**vložení šablony*/
		insert(rq?:Gordic.Pap.Interface.GSmlUpdAddsblDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GSmlUpdAddsblDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GSmlUpdAddsblDto>,GServiceSaveResponse<Gordic.Pap.Interface.GSmlUpdAddsblDto>>;
		/**odstranit šablonu*/
		delete(rq?:Gordic.Pap.Interface.GSmlxsblDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GSmlxsblDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GSmlxsblDto>,GServiceSaveResponse<Gordic.Pap.Interface.GSmlxsblDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapSablony: ServiceBase & Catalog.PapSablony;
	}
	const PapSablony: Client["PapSablony"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Plan_Rozpis\Gordic.Pap.Interface.IGPolozkyPlanHl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hlavička záložky plán*/
	interface PapPolozkyPlanHl {
		/**Plán*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxvprcDto>>;
		/**Zaktivní/zneaktivní záznam*/
		update(rq?:Gordic.Pap.Interface.GXxxvprcDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GXxxvprcDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GXxxvprcDto>,GServiceSaveResponse<Gordic.Pap.Interface.GXxxvprcDto>>;
		/**Vloží záznam do seznamu*/
		create(rq?:Gordic.Pap.Interface.GXxxvprcDto|CallParams<GServiceSaveRequest<Gordic.Pap.Interface.GXxxvprcDto>>): _Task<GServiceSaveRequest<Gordic.Pap.Interface.GXxxvprcDto>,GServiceSaveResponse<Gordic.Pap.Interface.GXxxvprcDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapPolozkyPlanHl: ServiceBase & Catalog.PapPolozkyPlanHl;
	}
	const PapPolozkyPlanHl: Client["PapPolozkyPlanHl"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Plan_Rozpis\Gordic.Pap.Interface.IGPolozkyPlanPol.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Položky záložky plán*/
	interface PapPolozkyPlanPol {
		/**Seznam položek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxarokDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapPolozkyPlanPol: ServiceBase & Catalog.PapPolozkyPlanPol;
	}
	const PapPolozkyPlanPol: Client["PapPolozkyPlanPol"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Podani\VyberPorCisNab\Gordic.Pap.Interface.IGVyberPripad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Výběr por_cis_nab*/
	interface PapVyberPorCisNab {
		/**detail dokumentu*/
		list(rq?:Gordic.Pap.Interface.GFiltrVyberPorCisNabDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GXxxsesuVDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapVyberPorCisNab: ServiceBase & Catalog.PapVyberPorCisNab;
	}
	const PapVyberPorCisNab: Client["PapVyberPorCisNab"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Podani\VyberPripad\Gordic.Pap.Interface.IGVyberPripad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Výběr případu*/
	interface PapVyberPripad {
		/**detail dokumentu*/
		list(rq?:Gordic.Pap.Interface.GEpoFiltrVyberIxsPriDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GVyberPripadDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapVyberPripad: ServiceBase & Catalog.PapVyberPripad;
	}
	const PapVyberPripad: Client["PapVyberPripad"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Podani\VyberUkon\Gordic.Pap.Interface.IGVyberPripad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Výběr úkonu*/
	interface PapVyberUkon {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GVyberUkonDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapVyberUkon: ServiceBase & Catalog.PapVyberUkon;
	}
	const PapVyberUkon: Client["PapVyberUkon"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\PolozkyPlanu\Gordic.Pap.Interface.IGPolozkyPlanu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Výběr položek plánu*/
	interface PapPolozkyPlanu {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSmlspidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapPolozkyPlanu: ServiceBase & Catalog.PapPolozkyPlanu;
	}
	const PapPolozkyPlanu: Client["PapPolozkyPlanu"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\PolozkyPlanu\Gordic.Pap.Interface.IGPolozkyRozpisu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Výběr položek rozpisu*/
	interface PapPolozkyRozpisu {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSrvdrozDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapPolozkyRozpisu: ServiceBase & Catalog.PapPolozkyRozpisu;
	}
	const PapPolozkyRozpisu: Client["PapPolozkyRozpisu"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\PolozkyPlanu\Gordic.Pap.Interface.IGPolozkyRozpisuBr.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Výběr položek rozpisu bez rozpisu*/
	interface PapPolozkyRozpisuBr {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSrvdrozDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapPolozkyRozpisuBr: ServiceBase & Catalog.PapPolozkyRozpisuBr;
	}
	const PapPolozkyRozpisuBr: Client["PapPolozkyRozpisuBr"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\PolozkyPlanu\Gordic.Pap.Interface.IGPolozkyRozpisuMimo.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Výběr položek rozpisu mimořádný*/
	interface PapPolozkyRozpisuMimo {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSrvdrozDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapPolozkyRozpisuMimo: ServiceBase & Catalog.PapPolozkyRozpisuMimo;
	}
	const PapPolozkyRozpisuMimo: Client["PapPolozkyRozpisuMimo"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Proces\Gordic.Pap.Interface.IGPapProces.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Procesy*/
	interface PapProces {
		/**seznam podkladů pro zobrazení procesu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GProcesDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapProces: ServiceBase & Catalog.PapProces;
	}
	const PapProces: Client["PapProces"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Smlouvy\Gordic.Pap.Interface.IGSmlouvyHl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hlavička záložky smluv příslušejících danému případu*/
	interface PapSmlouvyHl {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSmlspidDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapSmlouvyHl: ServiceBase & Catalog.PapSmlouvyHl;
	}
	const PapSmlouvyHl: Client["PapSmlouvyHl"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Smlouvy\Gordic.Pap.Interface.IGSmlouvyPol.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Položky záložky smluv příslušejících danému ixp*/
	interface PapSmlouvyPol {
		/**Seznam položek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GSmlspolPapDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapSmlouvyPol: ServiceBase & Catalog.PapSmlouvyPol;
	}
	const PapSmlouvyPol: Client["PapSmlouvyPol"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Tisk\Gordic.Pap.Interface.IGPapTisk.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Tisk*/
	interface PapTisk {
		/**seznam podkladů pro návrhy*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkosdenDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapTisk: ServiceBase & Catalog.PapTisk;
	}
	const PapTisk: Client["PapTisk"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\ZadostNabidka\Gordic.Pap.Interface.IGZadostNabidka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**žádost/nabídka*/
	interface PapZadostNabidka {
		/**seznam dokumentů případu*/
		listIxp(rq?:CallParams<{ixs_pri:string,cis_por:number,por_cis_nab:number}>): _Task<{ixs_pri:string,cis_por:number,por_cis_nab:number},string[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapZadostNabidka: ServiceBase & Catalog.PapZadostNabidka;
	}
	const PapZadostNabidka: Client["PapZadostNabidka"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\Zapisy\Gordic.Pap.Interface.IGSmlouvyHl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozpočtové zápisy příslušejících danému případu*/
	interface PapRozpoctoveZapisy {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GRozdxmaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapRozpoctoveZapisy: ServiceBase & Catalog.PapRozpoctoveZapisy;
	}
	const PapRozpoctoveZapisy: Client["PapRozpoctoveZapisy"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pap.Interface\Service\ZpravyDSG\Gordic.Pap.Interface.IGZpravyDSG.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Zpravy DSG*/
	interface PapZpravyDSG {
		/**detail dokumentu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Pap.Interface.GGindkonDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PapZpravyDSG: ServiceBase & Catalog.PapZpravyDSG;
	}
	const PapZpravyDSG: Client["PapZpravyDSG"];
}

//#endregion

