/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       adm.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Adm.Interface\Gordic.Adm.Interface.csproj
*    created     2026-02-16 14:33:43
*    files       adm.interface.fields.d.ts
*                Ade\GEkoKnihaDto.d.ts
*                Ade\GXxxrdac.d.ts
*                Ade\GXxxsden.d.ts
*                Ade\GXxxvrfu.d.ts
*                Ade\Ddp\GDdpstpp.d.ts
*                Ade\Eko\GEkocpovDto.d.ts
*                Ade\Eko\GEkocprkDto.d.ts
*                Ade\Eko\GEkocrefDto.d.ts
*                Ade\Eko\GEkocrprDto.d.ts
*                Ade\Eko\GEkoctelDto.d.ts
*                Ade\Eko\GEkoctiiDto.d.ts
*                Ade\Eko\GEkodktoDto.d.ts
*                Ade\Eko\GEkodreaDto.d.ts
*                Ade\Eko\GEkosdroDto.d.ts
*                Ade\Eko\GEkoskomDto.d.ts
*                Ade\Eko\GEkosnksDto.d.ts
*                Ade\Eko\GEkososeDto.d.ts
*                Ade\Eko\GEkospdoDto.d.ts
*                Ade\Eko\GEkosreaDto.d.ts
*                Ade\Eko\GEkosucsDto.d.ts
*                Ade\Eko\GEkosuusDto.d.ts
*                Ade\Eko\GEkosuvlDto.d.ts
*                Ade\Eko\GEkovagoDto.d.ts
*                Ade\Eko\GEkovfnsDto.d.ts
*                Ade\Eko\GEkovfseDto.d.ts
*                Ade\Eko\GEkovfteDto.d.ts
*                Ade\Eko\GEkovfusDto.d.ts
*                Ade\Readers\IGReaderAdeDdpstpp.d.ts
*                Ade\Readers\IGReaderAdeGinspod.d.ts
*                Ade\Readers\IGReaderAdeMzacktd.d.ts
*                Ade\Readers\IGReaderEkosose.d.ts
*                Ade\Readers\IGReaderSrvspla.d.ts
*                Ade\Sml\GSmlssteDto.d.ts
*                Ade\Srv\GSrvcrreDto.d.ts
*                Ade\Srv\GSrvctspDto.d.ts
*                Ade\Srv\GSrvczddDto.d.ts
*                Ade\Srv\GSrvczpsDto.d.ts
*                Ade\Srv\GSrvscspDto.d.ts
*                Ade\Srv\GSrvsddeDto.d.ts
*                Ade\Srv\GSrvsobdDto.d.ts
*                Ade\Srv\GSrvsoblDto.d.ts
*                Ade\Srv\GSrvsplaDto.d.ts
*                Ade\Srv\GSrvsprrDto.d.ts
*                Ade\Srv\GSrvstipDto.d.ts
*                Ade\Srv\GSrvstriDto.d.ts
*                Ade\Srv\GSrvstzdDto.d.ts
*                Ade\Srv\GSrvsvybDto.d.ts
*                Ade\Srv\GSrvsxpfDto.d.ts
*                Ade\Srv\GSrvvippDto.d.ts
*                Ade\Srv\GSrvvoblDto.d.ts
*                Ade\Srv\GSrvvprkDto.d.ts
*                Ade\Srv\GSrvvprrDto.d.ts
*                Ade\Srv\GSrvvrfuDto.d.ts
*                Ade\Srv\GSrvvtipDto.d.ts
*                Ade\Srv\GSrvvtypDto.d.ts
*                Ade\Uct\GUctdrozOrjDto.d.ts
*                Dto\GConfigSelectBoxDto.d.ts
*                Dto\GExterniIdentifikaceDto.d.ts
*                Dto\GReaderAdmGincaktDto.d.ts
*                Dto\GReaderDbLoginsDto.d.ts
*                Dto\GReaderGincparDto.d.ts
*                Dto\GReaderGinctauDto.d.ts
*                Dto\GReaderGincuvlDto.d.ts
*                Dto\GReaderWindowsLoginsDto.d.ts
*                Dto\GSelectBoxBaseDto.d.ts
*                Dto\Eko\GEkocpiiDto.d.ts
*                Dto\Eko\GEkoctygDto.d.ts
*                Dto\Eko\GEkoctyoDto.d.ts
*                Dto\Eko\GEkodicoDto.d.ts
*                Dto\Eko\GEkodsesDto.d.ts
*                Dto\Eko\GEkosktoDto.d.ts
*                Dto\Eko\GEkovuvlDto.d.ts
*                Dto\Ele\GWflsdisDto.d.ts
*                Dto\Ele\GWflsdizDto.d.ts
*                Dto\Ele\GWflsserDto.d.ts
*                Dto\Ele\GWflssezDto.d.ts
*                Dto\Ele\GWflsulzDto.d.ts
*                Dto\Epk\GWfldssaDto.d.ts
*                Dto\Epk\GWflssroDto.d.ts
*                Dto\Epk\GWflsssaDto.d.ts
*                Dto\Epk\GWflsstpDto.d.ts
*                Dto\Epk\GWflvsfuDto.d.ts
*                Dto\Epk\GWflvsrfDto.d.ts
*                Dto\Epk\GWflvssaDto.d.ts
*                Dto\Gin\GGincaivDto.d.ts
*                Dto\Gin\GGincaktDto.d.ts
*                Dto\Gin\GGinccfgDto.d.ts
*                Dto\Gin\GGinccstDto.d.ts
*                Dto\Gin\GGincdatDto.d.ts
*                Dto\Gin\GGincdsdDto.d.ts
*                Dto\Gin\GGincevnDto.d.ts
*                Dto\Gin\GGincfatDto.d.ts
*                Dto\Gin\GGincfazDto.d.ts
*                Dto\Gin\GGinchopDto.d.ts
*                Dto\Gin\GGinckatDto.d.ts
*                Dto\Gin\GGincktsDto.d.ts
*                Dto\Gin\GGincmbxDto.d.ts
*                Dto\Gin\GGincmisDto.d.ts
*                Dto\Gin\GGincoapDto.d.ts
*                Dto\Gin\GGincorjDto.d.ts
*                Dto\Gin\GGincpafDto.d.ts
*                Dto\Gin\GGincparDto.d.ts
*                Dto\Gin\GGincpatDto.d.ts
*                Dto\Gin\GGincpauDto.d.ts
*                Dto\Gin\GGincpavDto.d.ts
*                Dto\Gin\GGincpipDto.d.ts
*                Dto\Gin\GGincpkfDto.d.ts
*                Dto\Gin\GGincpnaDto.d.ts
*                Dto\Gin\GGincprvDto.d.ts
*                Dto\Gin\GGincpveDto.d.ts
*                Dto\Gin\GGincsbuDto.d.ts
*                Dto\Gin\GGincstaDto.d.ts
*                Dto\Gin\GGincsveDto.d.ts
*                Dto\Gin\GGinctvpDto.d.ts
*                Dto\Gin\GGinctyoDto.d.ts
*                Dto\Gin\GGincvauDto.d.ts
*                Dto\Gin\GGincvpsDto.d.ts
*                Dto\Gin\GGincvskDto.d.ts
*                Dto\Gin\GGindcisDto.d.ts
*                Dto\Gin\GGinddbpDto.d.ts
*                Dto\Gin\GGindevnDto.d.ts
*                Dto\Gin\GGindforDto.d.ts
*                Dto\Gin\GGindgdtDto.d.ts
*                Dto\Gin\GGindhopDto.d.ts
*                Dto\Gin\GGindoatDto.d.ts
*                Dto\Gin\GGindpozDto.d.ts
*                Dto\Gin\GGindproDto.d.ts
*                Dto\Gin\GGindsfuDto.d.ts
*                Dto\Gin\GGindstvDto.d.ts
*                Dto\Gin\GGindwgpDto.d.ts
*                Dto\Gin\GGinhobjDto.d.ts
*                Dto\Gin\GGinladlDto.d.ts
*                Dto\Gin\GGinlaibDto.d.ts
*                Dto\Gin\GGinlgdtDto.d.ts
*                Dto\Gin\GGinllogDto.d.ts
*                Dto\Gin\GGinloapDto.d.ts
*                Dto\Gin\GGinqbudDto.d.ts
*                Dto\Gin\GGinqmisDto.d.ts
*                Dto\Gin\GGinqsbuDto.d.ts
*                Dto\Gin\GGinsaivDto.d.ts
*                Dto\Gin\GGinsalvDto.d.ts
*                Dto\Gin\GGinsausDto.d.ts
*                Dto\Gin\GGinsbudDto.d.ts
*                Dto\Gin\GGinscfdDto.d.ts
*                Dto\Gin\GGinscisDto.d.ts
*                Dto\Gin\GGinsdbpDto.d.ts
*                Dto\Gin\GGinsepaDto.d.ts
*                Dto\Gin\GGinsesuDto.d.ts
*                Dto\Gin\GGinsevnDto.d.ts
*                Dto\Gin\GGinsfapDto.d.ts
*                Dto\Gin\GGinsfrmDto.d.ts
*                Dto\Gin\GGinsfspDto.d.ts
*                Dto\Gin\GGinsfunDto.d.ts
*                Dto\Gin\GGinsgdtDto.d.ts
*                Dto\Gin\GGinshvlDto.d.ts
*                Dto\Gin\GGinsicoDto.d.ts
*                Dto\Gin\GGinsinsDto.d.ts
*                Dto\Gin\GGinskalDto.d.ts
*                Dto\Gin\GGinskeyDto.d.ts
*                Dto\Gin\GGinskovDto.d.ts
*                Dto\Gin\GGinslapDto.d.ts
*                Dto\Gin\GGinsldiDto.d.ts
*                Dto\Gin\GGinsldzDto.d.ts
*                Dto\Gin\GGinslicDto.d.ts
*                Dto\Gin\GGinslmdDto.d.ts
*                Dto\Gin\GGinslpsDto.d.ts
*                Dto\Gin\GGinslscDto.d.ts
*                Dto\Gin\GGinsmbxDto.d.ts
*                Dto\Gin\GGinsmisDto.d.ts
*                Dto\Gin\GGinsoapDto.d.ts
*                Dto\Gin\GGinsoatDto.d.ts
*                Dto\Gin\GGinsobdDto.d.ts
*                Dto\Gin\GGinsobjDto.d.ts
*                Dto\Gin\GGinsorjDto.d.ts
*                Dto\Gin\GGinsparDto.d.ts
*                Dto\Gin\GGinsparhhDto.d.ts
*                Dto\Gin\GGinspodDto.d.ts
*                Dto\Gin\GGinsppwDto.d.ts
*                Dto\Gin\GGinsproDto.d.ts
*                Dto\Gin\GGinspscDto.d.ts
*                Dto\Gin\GGinsrefDto.d.ts
*                Dto\Gin\GGinssagDto.d.ts
*                Dto\Gin\GGinssbuDto.d.ts
*                Dto\Gin\GGinssfuDto.d.ts
*                Dto\Gin\GGinssgnDto.d.ts
*                Dto\Gin\GGinsskrDto.d.ts
*                Dto\Gin\GGinsspnDto.d.ts
*                Dto\Gin\GGinsspuDto.d.ts
*                Dto\Gin\GGinsstaDto.d.ts
*                Dto\Gin\GGinsstvDto.d.ts
*                Dto\Gin\GGinstreDto.d.ts
*                Dto\Gin\GGinsurdDto.d.ts
*                Dto\Gin\GGinsurlDto.d.ts
*                Dto\Gin\GGinsurpDto.d.ts
*                Dto\Gin\GGinsusrDto.d.ts
*                Dto\Gin\GGinsvauDto.d.ts
*                Dto\Gin\GGinsvlaDto.d.ts
*                Dto\Gin\GGinsvskDto.d.ts
*                Dto\Gin\GGinswgpDto.d.ts
*                Dto\Gin\GGinszahDto.d.ts
*                Dto\Gin\GGintlisDto.d.ts
*                Dto\Gin\GGintsesDto.d.ts
*                Dto\Gin\GGinvadiDto.d.ts
*                Dto\Gin\GGinvdbpDto.d.ts
*                Dto\Gin\GGinvfmsDto.d.ts
*                Dto\Gin\GGinvfusDto.d.ts
*                Dto\Gin\GGinvinuDto.d.ts
*                Dto\Gin\GGinvlgcDto.d.ts
*                Dto\Gin\GGinvlscDto.d.ts
*                Dto\Gin\GGinvovkDto.d.ts
*                Dto\Gin\GGinvovlDto.d.ts
*                Dto\Gin\GGinvovpDto.d.ts
*                Dto\Gin\GGinvpodDto.d.ts
*                Dto\Gin\GGinvpsuDto.d.ts
*                Dto\Gin\GGinvreuDto.d.ts
*                Dto\Gin\GGinvsfuDto.d.ts
*                Dto\Gin\GGinvstfDto.d.ts
*                Dto\Gin\GGinvtvlDto.d.ts
*                Dto\Gin\GGinvusrDto.d.ts
*                Dto\Gin\GGinvvskDto.d.ts
*                Dto\Gin\GGinvzasDto.d.ts
*                Dto\Gin\GWflcrspDto.d.ts
*                Dto\Grf\GGindgrfDto.d.ts
*                Dto\Grf\GGinsgrfDto.d.ts
*                Dto\Int\GIntcpesDto.d.ts
*                Dto\Int\GIntddavDto.d.ts
*                Dto\Int\GIntsextDto.d.ts
*                Dto\Int\GIntvatyDto.d.ts
*                Dto\Int\GIntvptyDto.d.ts
*                Dto\Iszr\GSzrsageDto.d.ts
*                Dto\Iszr\GSzrsagrDto.d.ts
*                Dto\Iszr\GSzrsaroDto.d.ts
*                Dto\Iszr\GSzrsisuDto.d.ts
*                Dto\Iszr\GSzrsprfDto.d.ts
*                Dto\Iszr\GSzrvagsDto.d.ts
*                Dto\Iszr\GSzrvaroDto.d.ts
*                Dto\Iszr\GSzrvfarDto.d.ts
*                Dto\Rak\GRakcdenDto.d.ts
*                Dto\Rak\GRaksdenDto.d.ts
*                Dto\Rak\GRakvdenDto.d.ts
*                Dto\Rss\GRssvtypDto.d.ts
*                Dto\Spi\GSpisspiDto.d.ts
*                Dto\Spi\GSpivktgDto.d.ts
*                Dto\Spi\GSpivmisDto.d.ts
*                Dto\Spi\GSpivspiDto.d.ts
*                Dto\Ssl\GSslcpcoDto.d.ts
*                Dto\Ssl\GSslcpdcDto.d.ts
*                Dto\Ssl\GSslcpuzDto.d.ts
*                Dto\Ssl\GSslcstuDto.d.ts
*                Dto\Ssl\GSslctydDto.d.ts
*                Dto\Ssl\GSslczpcDto.d.ts
*                Dto\Ssl\GSslddenDto.d.ts
*                Dto\Ssl\GSsldforDto.d.ts
*                Dto\Ssl\GSsldtypDto.d.ts
*                Dto\Ssl\GSslrdcjDto.d.ts
*                Dto\Ssl\GSslscfdDto.d.ts
*                Dto\Ssl\GSslsdenDto.d.ts
*                Dto\Ssl\GSslssplDto.d.ts
*                Dto\Ssl\GSslsspzDto.d.ts
*                Dto\Ssl\GSslstypDto.d.ts
*                Dto\Ssl\GSslsumiDto.d.ts
*                Dto\Ssl\GSslsumpDto.d.ts
*                Dto\Ssl\GSslszvsDto.d.ts
*                Dto\Ssl\GSslvrfuDto.d.ts
*                Dto\Ssl\GSslvrojDto.d.ts
*                Dto\Ssl\GSslvrstDto.d.ts
*                Dto\Ssl\GSslvrsuDto.d.ts
*                Dto\Ssl\GSslvsplDto.d.ts
*                Dto\Ssl\GSslvstuDto.d.ts
*                Dto\Ssl\GSslvtysDto.d.ts
*                Dto\Ssl\GSslvzvsDto.d.ts
*                Dto\Wfl\GWflcdrzDto.d.ts
*                Dto\Wfl\GWflcgraDto.d.ts
*                Dto\Wfl\GWflcktpDto.d.ts
*                Dto\Wfl\GWflckzdDto.d.ts
*                Dto\Wfl\GWflcltvDto.d.ts
*                Dto\Wfl\GWflcozvDto.d.ts
*                Dto\Wfl\GWflcpkvDto.d.ts
*                Dto\Wfl\GWflcposDto.d.ts
*                Dto\Wfl\GWflcpriDto.d.ts
*                Dto\Wfl\GWflcprpDto.d.ts
*                Dto\Wfl\GWflcptsDto.d.ts
*                Dto\Wfl\GWflcpvpDto.d.ts
*                Dto\Wfl\GWflcsvpDto.d.ts
*                Dto\Wfl\GWflctdzDto.d.ts
*                Dto\Wfl\GWflctkrDto.d.ts
*                Dto\Wfl\GWflctsuDto.d.ts
*                Dto\Wfl\GWflctvpDto.d.ts
*                Dto\Wfl\GWflctypDto.d.ts
*                Dto\Wfl\GWflcwslDto.d.ts
*                Dto\Wfl\GWflczpdDto.d.ts
*                Dto\Wfl\GWflczveDto.d.ts
*                Dto\Wfl\GWfldblkDto.d.ts
*                Dto\Wfl\GWfldcauDto.d.ts
*                Dto\Wfl\GWfldcerDto.d.ts
*                Dto\Wfl\GWfldcftDto.d.ts
*                Dto\Wfl\GWfldgraDto.d.ts
*                Dto\Wfl\GWfldtraDto.d.ts
*                Dto\Wfl\GWflsblkDto.d.ts
*                Dto\Wfl\GWflscauDto.d.ts
*                Dto\Wfl\GWflscerDto.d.ts
*                Dto\Wfl\GWflsdpoDto.d.ts
*                Dto\Wfl\GWflsepoDto.d.ts
*                Dto\Wfl\GWflsgraDto.d.ts
*                Dto\Wfl\GWflskslDto.d.ts
*                Dto\Wfl\GWflsozvDto.d.ts
*                Dto\Wfl\GWflssskDto.d.ts
*                Dto\Wfl\GWflssslDto.d.ts
*                Dto\Wfl\GWflstraDto.d.ts
*                Dto\Wfl\GWflstysDto.d.ts
*                Dto\Wfl\GWflszpvDto.d.ts
*                Dto\Wfl\GWflvcerDto.d.ts
*                Dto\Wfl\GWflvcexDto.d.ts
*                Dto\Wfl\GWflvdzsDto.d.ts
*                Dto\Wfl\GWflvkslDto.d.ts
*                Dto\Wfl\GWflvsslDto.d.ts
*                Dto\Wfl\GWflvszvDto.d.ts
*                Dto\Wfl\GWflvtraDto.d.ts
*                Dto\Wfl\GWflvzepDto.d.ts
*                Dto\Wfl\GWflvzpvDto.d.ts
*                Dto\Wfl\GWflvzslDto.d.ts
*                Dto\Wfl\GWflvzzaDto.d.ts
*                Gin\IGReaderAdmGincpba - Copy.d.ts
*                Gin\IGReaderAdmGincpba.d.ts
*                Gin\IGReaderAdmGinctao.d.ts
*                Gin\IGReaderAdmGinctcl - Copy.d.ts
*                Gin\IGReaderAdmGinctcl.d.ts
*                Gin\IGReaderGincoat.d.ts
*                Gin\IGReaderGincprf.d.ts
*                Gin\IGReaderGincpri.d.ts
*                Gin\IGReaderGincstf.d.ts
*                Gin\IGReaderGincufu.d.ts
*                Gin\IGReaderGinsspu.d.ts
*                Gin\IGReaderGinszap.d.ts
*                Gin\Dto\GReaderAdmGincpbaDto.d.ts
*                Gin\Dto\GReaderAdmGincrenDto.d.ts
*                Gin\Dto\GReaderAdmGinctaoDto.d.ts
*                Gin\Dto\GReaderGincoatDto.d.ts
*                Gin\Dto\GReaderGincoseDto.d.ts
*                Gin\Dto\GReaderGincprfDto.d.ts
*                Gin\Dto\GReaderGincpriDto.d.ts
*                Gin\Dto\GReaderGincstfDto.d.ts
*                Gin\Dto\GReaderGinctclDto.d.ts
*                Gin\Dto\GReaderGincufuDto.d.ts
*                Gin\Dto\GReaderGinsspuDto.d.ts
*                Gin\Dto\GReaderGinszapDto.d.ts
*                GinReaders\IGGincorj.d.ts
*                GinReaders\IGReaderAdmGinstre.d.ts
*                GinReaders\IGReaderAdmInterniSubjekt.d.ts
*                GinReaders\IGReaderDbLogins.d.ts
*                GinReaders\IGReaderGincaut.d.ts
*                GinReaders\IGReaderGinccfg.d.ts
*                GinReaders\IGReaderGinccst.d.ts
*                GinReaders\IGReaderGincdat.d.ts
*                GinReaders\IGReaderGincevn.d.ts
*                GinReaders\IGReaderGinchop.d.ts
*                GinReaders\IGReaderGincmbx.d.ts
*                GinReaders\IGReaderGincpar.d.ts
*                GinReaders\IGReaderGinctau.d.ts
*                GinReaders\IGReaderGinctvp.d.ts
*                GinReaders\IGReaderGincuvl.d.ts
*                GinReaders\IGReaderGincvau.d.ts
*                GinReaders\IGReaderGinsins.d.ts
*                GinReaders\IGReaderGinssta.d.ts
*                GinReaders\IGReaderSslcpco.d.ts
*                GinReaders\IGReaderSslsump.d.ts
*                GinReaders\IGReaderWflcpak.d.ts
*                GinReaders\IGReaderWindowsLogins.d.ts
*                Int\IGReaderIntcpes.d.ts
*                Pravidlo\GAdmGdessloDto.d.ts
*                Pravidlo\GAdmGdestabDto.d.ts
*                Pravidlo\GAdmGdevpraDto.d.ts
*                Ssl\IGReaderAdmSsldden.d.ts
*                Ssl\IGReaderAdmSslsspz - Copy.d.ts
*                Ssl\IGReaderAdmSslsspz.d.ts
*                Ssl\IGReaderSslcpfy.d.ts
*                Ssl\IGReaderSslcusz.d.ts
*                Ssl\IGReaderSslsden.d.ts
*                Ssl\IGReaderSslsspl.d.ts
*                Ssl\IGReaderSslsspz.d.ts
*                Ssl\Dto\GReaderAdmSslsspzDto.d.ts
*                Ssl\Dto\GReaderSslcpfyDto.d.ts
*                Ssl\Dto\GReaderSslcuszDto.d.ts
*                Ssl\Dto\GReaderSslsdenDto.d.ts
*                Ssl\Dto\GReaderSslssplDto.d.ts
*                Ssl\Dto\GReaderSslsspzDto.d.ts
*                Wfl\GWflsfskDto.d.ts
*                Wfl\IGReaderAdmWflckzd.d.ts
*                Wfl\IGReaderAdmWflcpri - Copy.d.ts
*                Wfl\IGReaderAdmWflcpri.d.ts
*                Wfl\IGReaderAdmWflctsu.d.ts
*                Wfl\IGReaderAdmWflctyp.d.ts
*                Wfl\IGReaderAdmWflsblk.d.ts
*                Wfl\IGReaderAdmWflsssk.d.ts
*                Wfl\IGReaderWflcpso.d.ts
*                Wfl\IGReaderWflscau.d.ts
*                Wfl\IGReaderWflscer.d.ts
*                Wfl\Dto\GReaderWflcpdoDto.d.ts
*                Wfl\Dto\GReaderWflcpsoDto.d.ts
*                Wfl\Dto\GReaderWflscauDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\adm.interface.fields.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\GEkoKnihaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Obecná EKO kniha*/
	interface GEkoKnihaDto {
		/**Identifikátor knihy*/
		ixp_den?: string|null;
		/**Ičo*/
		ico?: string|null;
		/**Název knihy*/
		nazev?: string|null;
		/**Rok*/
		rok?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Agenda*/
		agenda?: string|null;
		/**Textová reprezentace stavu*/
		stav_txt?: string|null;
		/**Účetní středisko*/
		ucs?: string|null;
	}
	const enum GEkoKnihaDtoNames { ixp_den = "ixp_den", ico = "ico", nazev = "nazev", rok = "rok", aktivita = "aktivita", agenda = "agenda", stav_txt = "stav_txt", ucs = "ucs",}
	const enum GEkoKnihaDtoFragments { ixp_den = "*", ico = "*", nazev = "*", rok = "*", aktivita = "*", agenda = "*", stav_txt = "*", ucs = "*",}
	const enum GEkoKnihaDtoTypes { ixp_den = "string", ico = "string", nazev = "string", rok = "number", aktivita = "number", agenda = "string", stav_txt = "string", ucs = "string",}
	const enum GEkoKnihaDtoTypeLengths {}
	/**Informace o tabulce*/
	interface GEkoKnihaTableInfoDto {
		/**Identifikátor*/
		ix?: string|null;
		/**Submodel*/
		submodel?: string|null;
		/**Název tabulky*/
		tablename?: string|null;
		/**Agenda*/
		agenda?: string|null;
	}
	const enum GEkoKnihaTableInfoDtoNames { ix = "ix", submodel = "submodel", tablename = "tablename", agenda = "agenda",}
	const enum GEkoKnihaTableInfoDtoFragments { ix = "*", submodel = "*", tablename = "*", agenda = "*",}
	const enum GEkoKnihaTableInfoDtoTypes { ix = "string", submodel = "string", tablename = "string", agenda = "string",}
	const enum GEkoKnihaTableInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\GXxxrdac.d.ts 

declare namespace Gordic.Adm.Interface {
	interface GXxxrdac {
		/**Identifikátor knihy
		*      Identifikátor knihy dokladů
		*/
		ixp_den?: string|null;
		/**Číslo subřady
		*      Číslo subřady knihy
		*/
		subrada?: number|null;
		/**Zkratka
		*      Zkratka
		*/
		zkratka?: string|null;
		/**Název subřady
		*      Název subřady
		*/
		nazev?: string|null;
		/**Aktivita subřady
		*      Aktivita subřady
		*/
		akt_subrady?: number|null;
		/**Konec subřady
		*      Konec subřady
		*/
		ac_cislo_do?: number|null;
		/**Začátek subřady
		*      Začátek subřady
		*/
		ac_cislo_od?: number|null;
		/**Poslední použité číslo
		*      Poslední použité číslo
		*/
		ac_cislo_max?: number|null;
		/**Měsíc subřady
		*      Měsíc subřady
		*/
		mesic?: number|null;
		/**Datum a čas poslední změny tohoto záznamu
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp
		*      Změnil
		*/
		zmenu_prov?: string|null;
		/**Spisový uzel
		*      Spisový uzel
		*/
		ixs_su?: string|null;
	}
	const enum GXxxrdacNames { ixp_den = "ixp_den", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", akt_subrady = "akt_subrady", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", ac_cislo_max = "ac_cislo_max", mesic = "mesic", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su",}
	const enum GXxxrdacFragments { ixp_den = "*", subrada = "*", zkratka = "*", nazev = "*", akt_subrady = "*", ac_cislo_do = "*", ac_cislo_od = "*", ac_cislo_max = "*", mesic = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*",}
	const enum GXxxrdacTypes { ixp_den = "string", subrada = "number", zkratka = "string", nazev = "string", akt_subrady = "number", ac_cislo_do = "number", ac_cislo_od = "number", ac_cislo_max = "number", mesic = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string",}
	const enum GXxxrdacTypeLengths { ixp_den = 12, zkratka = 16, nazev = 50, zmenu_prov = 12, ixs_su = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\GXxxsden.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Obecný předek pro deníky - slouží pro generické předky*/
	interface GXxxsden {
		/**Identifikátor knihy
		*      Identifikátor knihy dokladů
		*/
		ixp_den?: string|null;
		/**Licence
		*      Mělo by jít o licenci shodnou s licencí v ixp_den
		*/
		lic?: string|null;
		/**Aktivita
		*      Aktivita záznamu dle gincakt
		*/
		aktivita?: number|null;
		/**Nyní již nepoužívaný údaj, za který není náhrada
		*      Jméno identifikátoru znamená Atribut Read/Write
		*/
		arw?: number|null;
		/**Poznámka
		*      Poznámku zadává administrátor a jemu také slouží. Ostatním uživatelům se nezobrazuje.
		*/
		poznamka?: string|null;
		/**Počátek platnosti knihy
		*      Omezení zadává administrátor a jemu také slouží pro orientaci. Ostatním uživatelům
		*/
		dat_od?: JsonDate|null;
		/**Konec platnosti knihy
		*      Omezení zadává administrátor a jemu také slouží pro orientaci. Ostatním uživatelům
		*/
		dat_do?: JsonDate|null;
		/**IČO
		*      IČO určující dostupnost knihy pro přihlášeného uživatele = příslušnost knihy k účetní jednotce
		*/
		ico?: string|null;
		/**Účetní středisko
		*      Účetní středisko určující dostupnost knihy pro přihlášeného uživatele = příslušnost knihy k účetnímu středisku
		*/
		ucs?: string|null;
		/**Název knihy
		*      Název zadává administrátor (napřiklad: "Kniha monitoru zakázek roku XXXX")
		*/
		nazev?: string|null;
		/**Rok deníku
		*      Rok určující dostupnost knihy pro přihlášeného uživatele = příslušnost knihy pro účetní období
		*/
		rok?: number|null;
		/**Typ číselné řady
		*      Typ knihy se v praxi nepoužívá. Výjimkou je účetní deník v tabulce
		*/
		typ_den?: number|null;
		/**Kategorie knihy
		*      Kategorie knihy ovlivňuje agendově závislé algoritmy. To znamená, že někde může být kód říkající:
		*/
		ktg_den?: number|null;
		/**Změněno
		*      Datum a čas poslední změny tohoto záznamu
		*/
		dat_zmena?: JsonDate|null;
		/**Změnil
		*      Autor poslední změny záznamu dle ginszmp
		*/
		zmenu_prov?: string|null;
		/**Maximální pořadové číslo dokladu v knize
		*      Tento údaj administrátor nezadává. Při založení knihy se nastaví na nulu.
		*/
		por_cislo_max?: number|null;
		/**Maximální pořadové číslo subřady v knize
		*      Tento údaj administrátor nezadává. Při založení knihy se nastaví na nulu.
		*/
		subrada_max?: number|null;
		/**Délka evidenčního čísla dokladu bez prefixu a suffixu
		*      Evidenční číslo s prefixem a suffixem může být maximálně 20 znaků dlouhé
		*/
		len_ac?: number|null;
		/**Krok uzávěrky
		*      Stavová informace (uzávěrka knih je roční)
		*/
		krok_uza?: number|null;
		/**Kniha použitá jako vzor při generování této knihy
		*      Kniha použitá jako vzor při generování této knihy
		*/
		ixp_den_old?: string|null;
		/**Účtárna účetního střediska
		*      Účtárna účetního střediska určující dostupnost knihy pro přihlášeného uživatele = příslušnost knihy k účtárně
		*/
		uus?: string|null;
		/**Prefix evidenčního čísla dokladu
		*      Prefix evidenčního čísla dokladu
		*/
		prefix?: string|null;
		/**Suffix evidenčního čísla dokladu
		*      Suffix evidenčního čísla dokladu
		*/
		suffix?: string|null;
	}
	const enum GXxxsdenNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix",}
	const enum GXxxsdenFragments { ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*",}
	const enum GXxxsdenTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string",}
	const enum GXxxsdenTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\GXxxvrfu.d.ts 

declare namespace Gordic.Adm.Interface {
	interface GXxxvrfu {
		/**Funkční místo
		*      Interní identifikace funkčního místa
		*/
		ixs_fun?: string|null;
		/**Identifikátor knihy
		*      Identifikátor knihy dokladů
		*/
		ixp_den?: string|null;
		/**Číslo subřady
		*      Číslo subřady deníku
		*/
		subrada?: number|null;
		/**Aktivita záznamu dle gincakt
		*      Aktivita záznamu
		*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu
		*      Datum počátku platnosti záznamu
		*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu
		*      Datum konce platnosti záznamu
		*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp
		*      Změnil
		*/
		zmenu_prov?: string|null;
	}
	const enum GXxxvrfuNames { ixs_fun = "ixs_fun", ixp_den = "ixp_den", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GXxxvrfuFragments { ixs_fun = "*", ixp_den = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GXxxvrfuTypes { ixs_fun = "string", ixp_den = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GXxxvrfuTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Ddp\GDdpstpp.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ddpstpp
	*      Režim financování
	*/
	interface GDdpstppDto {
		/**Typ pohledávky*/
		typ_phl?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
	}
	const enum GDdpstppDtoNames { typ_phl = "typ_phl", nazev = "nazev", aktivita = "aktivita",}
	const enum GDdpstppDtoFragments { typ_phl = "*", nazev = "*", aktivita = "*",}
	const enum GDdpstppDtoTypes { typ_phl = "string", nazev = "string", aktivita = "number",}
	const enum GDdpstppDtoTypeLengths { typ_phl = 4, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkocpovDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekocpov
	*      Viditelnost seskupení
	*/
	interface GEkocpovDto {
		/**viditelnost seskupení*/
		priz_osv?: number|null;
		priz_osv_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GEkocpovDtoNames { priz_osv = "priz_osv", priz_osv_txt = "priz_osv_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEkocpovDtoFragments { priz_osv = "*", priz_osv_txt = "*", k_v = "*", k_s = "*",}
	const enum GEkocpovDtoTypes { priz_osv = "number", priz_osv_txt = "string", k_v = "number", k_s = "string",}
	const enum GEkocpovDtoTypeLengths { priz_osv_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkocprkDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekocprk
	*      Příznak kompetenta
	*/
	interface GEkocprkDto {
		/**Příznak kompetenta*/
		priz_kom?: number|null;
		/**název*/
		priz_kom_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GEkocprkDtoNames { priz_kom = "priz_kom", priz_kom_txt = "priz_kom_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEkocprkDtoFragments { priz_kom = "*", priz_kom_txt = "*", k_v = "*", k_s = "*",}
	const enum GEkocprkDtoTypes { priz_kom = "number", priz_kom_txt = "string", k_v = "number", k_s = "string",}
	const enum GEkocprkDtoTypeLengths { priz_kom_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkocrefDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekocref
	*      Režim financování
	*/
	interface GEkocrefDto {
		/**režim financování*/
		rezim_fin?: number|null;
		rezim_fin_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GEkocrefDtoNames { rezim_fin = "rezim_fin", rezim_fin_txt = "rezim_fin_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEkocrefDtoFragments { rezim_fin = "*", rezim_fin_txt = "*", k_v = "*", k_s = "*",}
	const enum GEkocrefDtoTypes { rezim_fin = "number", rezim_fin_txt = "string", k_v = "number", k_s = "string",}
	const enum GEkocrefDtoTypeLengths { rezim_fin_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkocrprDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekocrpr
	*      Řád pořizování rozpočtu
	*/
	interface GEkocrprDto {
		/**Řád pořizování rozpočtu*/
		priz_rpr?: number|null;
		priz_rpr_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GEkocrprDtoNames { priz_rpr = "priz_rpr", priz_rpr_txt = "priz_rpr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEkocrprDtoFragments { priz_rpr = "*", priz_rpr_txt = "*", k_v = "*", k_s = "*",}
	const enum GEkocrprDtoTypes { priz_rpr = "number", priz_rpr_txt = "string", k_v = "number", k_s = "string",}
	const enum GEkocrprDtoTypeLengths { priz_rpr_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkoctelDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekoctel
	*      Typy elementů seskupení
	*/
	interface GEkoctelDto {
		typ_elem?: number|null;
		typ_elem_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GEkoctelDtoNames { typ_elem = "typ_elem", typ_elem_txt = "typ_elem_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEkoctelDtoFragments { typ_elem = "*", typ_elem_txt = "*", k_v = "*", k_s = "*",}
	const enum GEkoctelDtoTypes { typ_elem = "number", typ_elem_txt = "string", k_v = "number", k_s = "string",}
	const enum GEkoctelDtoTypeLengths { typ_elem_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkoctiiDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekoctii*/
	interface GEkoctiiDto {
		/**DBCOLUMN:ekoctii.typ_kom_iissp*/
		typ_kom_iissp?: number|null;
		/**DBCOLUMN:ekoctii.typ_kom_iissp_txt*/
		typ_kom_iissp_txt?: string|null;
		/**DBCOLUMN:ekoctii.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekoctii.k_s*/
		k_s?: string|null;
	}
	const enum GEkoctiiDtoNames { typ_kom_iissp = "typ_kom_iissp", typ_kom_iissp_txt = "typ_kom_iissp_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEkoctiiDtoFragments { typ_kom_iissp = "*", typ_kom_iissp_txt = "*", k_v = "*", k_s = "*",}
	const enum GEkoctiiDtoTypes { typ_kom_iissp = "number", typ_kom_iissp_txt = "string", k_v = "number", k_s = "string",}
	const enum GEkoctiiDtoTypeLengths { typ_kom_iissp_txt = 100, k_s = 15,}
	/**ENUM:ekoctii*/
	const enum GEkoctiiEnum {
		/**Simulace online komunikace s IISSP přes WS (testovací)*/
		simulace=1,
		/**Online komunikace s IISSP přes WS (provozní)*/
		online=2,
		/**Offline komunikace s IISSP pomocí dávky XML (provozní)*/
		offline=4,
		/**Výběr mezi simulací, online a offline komunikací (nepoužívat, určeno pouze pro vývojáře!)*/
		vyber_uzivatele=8,
	}
	function GEkoctiiEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkoctiiEnum, Gordic.Adm.Interface.GEkoctiiDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkodktoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekodkto
	*      Názvy úrovní kategorie seskupení
	*/
	interface GEkodktoDto {
		ixs_kto?: string|null;
		typ_ose?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GEkodktoDtoNames { ixs_kto = "ixs_kto", typ_ose = "typ_ose", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkodktoDtoFragments { ixs_kto = "*", typ_ose = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkodktoDtoTypes { ixs_kto = "string", typ_ose = "number", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkodktoDtoTypeLengths { ixs_kto = 12, nazev = 50, zkratka = 16, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkodreaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekodrea
	*      Vlastní nákladová stř.realizátora
	*/
	interface GEkodreaDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		cis_real?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		nks_vl?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GEkodreaDtoNames { ico = "ico", cis_real = "cis_real", rok = "rok", nks_vl = "nks_vl", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkodreaDtoFragments { ico = "*", cis_real = "*", rok = "*", nks_vl = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkodreaDtoTypes { ico = "string", cis_real = "string", rok = "number", nks_vl = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkodreaDtoTypeLengths { ico = 10, cis_real = 6, nks_vl = 12, poznamka = 50, zmenu_prov = 12,}
	/**Rozšíření nákladového střediska o název*/
	interface GEkodreaExtDto extends Gordic.Adm.Interface.GEkodreaDto {
		/**Textová reprezentace nákladového střediska*/
		nks_vl_txt?: string|null;
	}
	const enum GEkodreaExtDtoNames { nks_vl_txt = "nks_vl_txt", ico = "ico", cis_real = "cis_real", rok = "rok", nks_vl = "nks_vl", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkodreaExtDtoFragments { nks_vl_txt = "*", ico = "*", cis_real = "*", rok = "*", nks_vl = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkodreaExtDtoTypes { nks_vl_txt = "string", ico = "string", cis_real = "string", rok = "number", nks_vl = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkodreaExtDtoTypeLengths { ico = 10, cis_real = 6, nks_vl = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkosdroDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekosdro*/
	interface GEkosdroDto {
		/**Druh ÚJ*/
		id_druh?: number|null;
		/**DBCOLUMN:ekosdro.kod_druh*/
		kod_druh?: number|null;
		/**DBCOLUMN:ekosdro.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekosdro.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ekosdro.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekosdro.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekosdro.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GEkosdroDtoNames { id_druh = "id_druh", kod_druh = "kod_druh", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkosdroDtoFragments { id_druh = "*", kod_druh = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkosdroDtoTypes { id_druh = "number", kod_druh = "number", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkosdroDtoTypeLengths { nazev = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkoskomDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekoskom
	*      Seznam kompetentů
	*/
	interface GEkoskomDto {
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**číslo kompetenta*/
		num_komp?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		cis_real?: string|null;
		/**Příznak kompetenta*/
		priz_kom?: number|null;
		priz_zad?: number|null;
	}
	const enum GEkoskomDtoNames { ixs_fun = "ixs_fun", num_komp = "num_komp", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", cis_real = "cis_real", priz_kom = "priz_kom", priz_zad = "priz_zad",}
	const enum GEkoskomDtoFragments { ixs_fun = "*", num_komp = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*", cis_real = "*", priz_kom = "*", priz_zad = "*",}
	const enum GEkoskomDtoTypes { ixs_fun = "string", num_komp = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", cis_real = "string", priz_kom = "number", priz_zad = "number",}
	const enum GEkoskomDtoTypeLengths { ixs_fun = 12, num_komp = 4, zmenu_prov = 12, ico = 10, cis_real = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkosnksDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekosnks
	*      Nákladové středisko
	*/
	interface GEkosnksDto {
		/**IČO
		*      IČO - Identifikační číslo vlastní - IČO zpracující organizace
		*/
		ico?: string|null;
		/**Nákladové středisko
		*      NKS - Nákladové středisko - NKS zpracující organizace
		*/
		nks?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Spisový uzel*/
		ixs_su?: string|null;
		orgnum?: number|null;
		/**pseudoičo*/
		ico_p?: string|null;
		priz_isl?: number|null;
		/**ODPA - Paragraf*/
		ued?: string|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		rok_od?: number|null;
		rok_do?: number|null;
		akt_prohl?: number|null;
		acckey?: string|null;
		/**SU - Syntetický účet*/
		uea?: string|null;
		/**AU - Analytický účet*/
		ueb?: string|null;
		/**ZDR - Zdroj*/
		uec?: string|null;
		/**POL - Položka*/
		uee?: string|null;
		/**ZJ - Záznamová jednotka*/
		uef?: string|null;
		/**UZ - Účelový znak*/
		ueg?: string|null;
		/**POPA - Podpararagraf*/
		ueh?: string|null;
		/**FIN - Financování*/
		uei?: string|null;
		/**PRJ - Projekt*/
		uej?: string|null;
		/**ORJ - ORJ*/
		te0?: string|null;
		/**ORG - ORG*/
		te1?: string|null;
		/**COR - Cílově orientované rozpočtování*/
		te2?: string|null;
		/**KZ - Konsolidační záznam*/
		te3?: string|null;
		/**UKO - Úkol*/
		te4?: string|null;
		ico_ext?: string|null;
		nks_ext?: string|null;
		priz_pam?: number|null;
		id_okres?: string|null;
		priz_ped?: number|null;
		ixs_oce?: string|null;
		/**Příznak přesunu NKS*/
		priz_prev_nks?: number|null;
		priz_zdrav?: number|null;
		priz_mise?: number|null;
		drzar?: string|null;
		pcz?: string|null;
		fm_iissp?: string|null;
		dat_od_issp?: JsonDate|null;
		dat_do_issp?: JsonDate|null;
	}
	const enum GEkosnksDtoNames { ico = "ico", nks = "nks", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", zkratka = "zkratka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", orgnum = "orgnum", ico_p = "ico_p", priz_isl = "priz_isl", ued = "ued", cs_nazev = "cs_nazev", ixs_esu = "ixs_esu", rok_od = "rok_od", rok_do = "rok_do", akt_prohl = "akt_prohl", acckey = "acckey", uea = "uea", ueb = "ueb", uec = "uec", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", ico_ext = "ico_ext", nks_ext = "nks_ext", priz_pam = "priz_pam", id_okres = "id_okres", priz_ped = "priz_ped", ixs_oce = "ixs_oce", priz_prev_nks = "priz_prev_nks", priz_zdrav = "priz_zdrav", priz_mise = "priz_mise", drzar = "drzar", pcz = "pcz", fm_iissp = "fm_iissp", dat_od_issp = "dat_od_issp", dat_do_issp = "dat_do_issp",}
	const enum GEkosnksDtoFragments { ico = "*", nks = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", nazev = "*", zkratka = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", orgnum = "*", ico_p = "*", priz_isl = "*", ued = "*", cs_nazev = "*", ixs_esu = "*", rok_od = "*", rok_do = "*", akt_prohl = "*", acckey = "*", uea = "*", ueb = "*", uec = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", ico_ext = "*", nks_ext = "*", priz_pam = "*", id_okres = "*", priz_ped = "*", ixs_oce = "*", priz_prev_nks = "*", priz_zdrav = "*", priz_mise = "*", drzar = "*", pcz = "*", fm_iissp = "*", dat_od_issp = "*", dat_do_issp = "*",}
	const enum GEkosnksDtoTypes { ico = "string", nks = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", zkratka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", orgnum = "number", ico_p = "string", priz_isl = "number", ued = "string", cs_nazev = "string", ixs_esu = "string", rok_od = "number", rok_do = "number", akt_prohl = "number", acckey = "string", uea = "string", ueb = "string", uec = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", ico_ext = "string", nks_ext = "string", priz_pam = "number", id_okres = "string", priz_ped = "number", ixs_oce = "string", priz_prev_nks = "number", priz_zdrav = "number", priz_mise = "number", drzar = "string", pcz = "string", fm_iissp = "string", dat_od_issp = "JsonDate", dat_do_issp = "JsonDate",}
	const enum GEkosnksDtoTypeLengths { ico = 10, nks = 12, lic = 4, poznamka = 50, nazev = 60, zkratka = 20, zmenu_prov = 12, ixs_su = 12, ico_p = 10, ued = 12, cs_nazev = 60, ixs_esu = 12, acckey = 12, uea = 3, ueb = 4, uec = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, ico_ext = 10, nks_ext = 12, id_okres = 6, ixs_oce = 12, drzar = 3, pcz = 3, fm_iissp = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkososeDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekosose
	*      Deklarace obecných seskupení
	*/
	interface GEkososeDto {
		ixs_ose?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		priz_osv?: number|null;
		typ_elem?: number|null;
		typ_ose?: number|null;
		wradek1?: string|null;
		wradek2?: string|null;
		wradek3?: string|null;
		wradek4?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		h_elem_od?: string|null;
		h_elem_do?: string|null;
		ixs_dwd?: string|null;
		ixs_kto?: string|null;
		rokmes_od?: string|null;
		rokmes_do?: string|null;
	}
	const enum GEkososeDtoNames { ixs_ose = "ixs_ose", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", zkratka = "zkratka", priz_osv = "priz_osv", typ_elem = "typ_elem", typ_ose = "typ_ose", wradek1 = "wradek1", wradek2 = "wradek2", wradek3 = "wradek3", wradek4 = "wradek4", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", h_elem_od = "h_elem_od", h_elem_do = "h_elem_do", ixs_dwd = "ixs_dwd", ixs_kto = "ixs_kto", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do",}
	const enum GEkososeDtoFragments { ixs_ose = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", nazev = "*", zkratka = "*", priz_osv = "*", typ_elem = "*", typ_ose = "*", wradek1 = "*", wradek2 = "*", wradek3 = "*", wradek4 = "*", dat_zmena = "*", zmenu_prov = "*", h_elem_od = "*", h_elem_do = "*", ixs_dwd = "*", ixs_kto = "*", rokmes_od = "*", rokmes_do = "*",}
	const enum GEkososeDtoTypes { ixs_ose = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", zkratka = "string", priz_osv = "number", typ_elem = "number", typ_ose = "number", wradek1 = "string", wradek2 = "string", wradek3 = "string", wradek4 = "string", dat_zmena = "JsonDate", zmenu_prov = "string", h_elem_od = "string", h_elem_do = "string", ixs_dwd = "string", ixs_kto = "string", rokmes_od = "string", rokmes_do = "string",}
	const enum GEkososeDtoTypeLengths { ixs_ose = 12, poznamka = 50, nazev = 50, zkratka = 16, wradek1 = 254, wradek2 = 254, wradek3 = 254, wradek4 = 254, zmenu_prov = 12, h_elem_od = 20, h_elem_do = 20, ixs_dwd = 12, ixs_kto = 12, rokmes_od = 6, rokmes_do = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkospdoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekospdo*/
	interface GEkospdoDto {
		/**Druh ÚJ*/
		id_druh?: number|null;
		/**Poddruh ÚJ*/
		id_poddruh?: number|null;
		/**DBCOLUMN:ekospdo.kod_poddruh*/
		kod_poddruh?: number|null;
		/**DBCOLUMN:ekospdo.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekospdo.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ekospdo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekospdo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekospdo.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GEkospdoDtoNames { id_druh = "id_druh", id_poddruh = "id_poddruh", kod_poddruh = "kod_poddruh", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkospdoDtoFragments { id_druh = "*", id_poddruh = "*", kod_poddruh = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkospdoDtoTypes { id_druh = "number", id_poddruh = "number", kod_poddruh = "number", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkospdoDtoTypeLengths { nazev = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkosreaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekosrea
	*      Číselník realizátorů
	*/
	interface GEkosreaDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		cis_real?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
	}
	const enum GEkosreaDtoNames { ico = "ico", cis_real = "cis_real", aktivita = "aktivita", poznamka = "poznamka", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ucs = "ucs", uus = "uus",}
	const enum GEkosreaDtoFragments { ico = "*", cis_real = "*", aktivita = "*", poznamka = "*", nazev = "*", dat_zmena = "*", zmenu_prov = "*", ucs = "*", uus = "*",}
	const enum GEkosreaDtoTypes { ico = "string", cis_real = "string", aktivita = "number", poznamka = "string", nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ucs = "string", uus = "string",}
	const enum GEkosreaDtoTypeLengths { ico = 10, cis_real = 6, poznamka = 50, nazev = 50, zmenu_prov = 12, ucs = 10, uus = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkosucsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekosucs
	*      Účetní středisko
	*/
	interface GEkosucsDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Účetní středisko*/
		ucs?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Spisový uzel*/
		ixs_su?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		rok_od?: number|null;
		rok_do?: number|null;
		akt_prohl?: number|null;
		rezim_fin?: number|null;
		ixs_ose?: string|null;
		ico_ext?: string|null;
		ucs_ext?: string|null;
		fm_iissp?: string|null;
		blok_iissp?: number|null;
	}
	const enum GEkosucsDtoNames { ico = "ico", ucs = "ucs", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", zkratka = "zkratka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", ixs_esu = "ixs_esu", rok_od = "rok_od", rok_do = "rok_do", akt_prohl = "akt_prohl", rezim_fin = "rezim_fin", ixs_ose = "ixs_ose", ico_ext = "ico_ext", ucs_ext = "ucs_ext", fm_iissp = "fm_iissp", blok_iissp = "blok_iissp",}
	const enum GEkosucsDtoFragments { ico = "*", ucs = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", nazev = "*", zkratka = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", ixs_esu = "*", rok_od = "*", rok_do = "*", akt_prohl = "*", rezim_fin = "*", ixs_ose = "*", ico_ext = "*", ucs_ext = "*", fm_iissp = "*", blok_iissp = "*",}
	const enum GEkosucsDtoTypes { ico = "string", ucs = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", zkratka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", ixs_esu = "string", rok_od = "number", rok_do = "number", akt_prohl = "number", rezim_fin = "number", ixs_ose = "string", ico_ext = "string", ucs_ext = "string", fm_iissp = "string", blok_iissp = "number",}
	const enum GEkosucsDtoTypeLengths { ico = 10, ucs = 10, lic = 4, poznamka = 50, nazev = 50, zkratka = 16, zmenu_prov = 12, ixs_su = 12, ixs_esu = 12, ixs_ose = 12, ico_ext = 10, ucs_ext = 10, fm_iissp = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkosuusDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekosuus
	*      Účtárny
	*/
	interface GEkosuusDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Spisový uzel*/
		ixs_su?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		rok_od?: number|null;
		rok_do?: number|null;
		akt_prohl?: number|null;
		rezim_fin?: number|null;
		ico_ext?: string|null;
		ucs_ext?: string|null;
		uus_ext?: string|null;
		id_okres?: string|null;
		fm_iissp?: string|null;
	}
	const enum GEkosuusDtoNames { ico = "ico", ucs = "ucs", uus = "uus", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", zkratka = "zkratka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", ixs_esu = "ixs_esu", rok_od = "rok_od", rok_do = "rok_do", akt_prohl = "akt_prohl", rezim_fin = "rezim_fin", ico_ext = "ico_ext", ucs_ext = "ucs_ext", uus_ext = "uus_ext", id_okres = "id_okres", fm_iissp = "fm_iissp",}
	const enum GEkosuusDtoFragments { ico = "*", ucs = "*", uus = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", nazev = "*", zkratka = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", ixs_esu = "*", rok_od = "*", rok_do = "*", akt_prohl = "*", rezim_fin = "*", ico_ext = "*", ucs_ext = "*", uus_ext = "*", id_okres = "*", fm_iissp = "*",}
	const enum GEkosuusDtoTypes { ico = "string", ucs = "string", uus = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", zkratka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", ixs_esu = "string", rok_od = "number", rok_do = "number", akt_prohl = "number", rezim_fin = "number", ico_ext = "string", ucs_ext = "string", uus_ext = "string", id_okres = "string", fm_iissp = "string",}
	const enum GEkosuusDtoTypeLengths { ico = 10, ucs = 10, uus = 10, lic = 4, poznamka = 50, nazev = 50, zkratka = 16, zmenu_prov = 12, ixs_su = 12, ixs_esu = 12, ico_ext = 10, ucs_ext = 10, uus_ext = 10, id_okres = 6, fm_iissp = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkosuvlDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekosuvl
	*      Bankovní účty vlastní
	*/
	interface GEkosuvlDto {
		/**Rok deníku*/
		rok?: number|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**Vlastní bankovní účet 
		*      Bankovní účet vlastní - číslo účtu zpracující organizace
		*/
		bu_vl?: string|null;
		/**Směrový kód vlastního bankovního účtu
		*      Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet
		*/
		sk_vl?: string|null;
		/**Bankovní účet
		*      Textová standardně formátovaná podoba vlastního bankovního účtu.
		*/
		bu_txt?: string|null;
		ktg_bu?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		uea_lim?: string|null;
		ueb_lim?: string|null;
		/**identifikátor popisu banky*/
		ixs_esu_ban?: string|null;
		/**limit*/
		c_lim?: JsonDecimal|null;
		/**k úhradě*/
		c_kuhr?: JsonDecimal|null;
		/**uhrazeno*/
		c_uhr?: JsonDecimal|null;
		typ_bu?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Kód měny dle ekocmen*/
		mena?: number|null;
		uea_uc?: string|null;
		ueb_uc?: string|null;
		subrada_duz?: number|null;
		/**příznak použití rozšiřujícího účetního profilu bankovního účtu*/
		priz_up_bu?: number|null;
		ixp_den_buc?: string|null;
		/**Skupina*/
		sbu?: number|null;
		dat_bvy?: JsonDate|null;
		c_ps?: JsonDecimal|null;
		c_rok_db?: JsonDecimal|null;
		c_rok_kr?: JsonDecimal|null;
		c_zust?: JsonDecimal|null;
		/**Druh*/
		druh_bu?: number|null;
		/**číslo posledního ban.výpisu*/
		cis_bvy?: number|null;
		/**identifikátor posledního ban.výpisu*/
		ixp_bvy?: string|null;
		c_lim_max?: JsonDecimal|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		iban?: string|null;
		zc_vyp?: number|null;
		per_vyp?: number|null;
		ur_prist_bu?: number|null;
		priz_isprofin?: number|null;
		/**kód výstavce*/
		kod_vys?: string|null;
		kon_maxlim?: number|null;
		par_vyp?: number|null;
		c_lim_ban?: JsonDecimal|null;
		c_zust_ban?: JsonDecimal|null;
		dat_bvy_ban?: JsonDate|null;
		dat_ttv?: JsonDate|null;
		/**Účet státního rozpočtu*/
		priz_sr?: number|null;
		id_hdr_ris_kr?: string|null;
		radek_hdr_kr?: number|null;
		priz_rozp?: number|null;
		priz_spol_u?: number|null;
		ode_sp?: number|null;
		ukl_pri?: number|null;
		id_nt_max?: string|null;
		fidoo?: number|null;
	}
	const enum GEkosuvlDtoNames { rok = "rok", ico = "ico", ucs = "ucs", bu_vl = "bu_vl", sk_vl = "sk_vl", bu_txt = "bu_txt", ktg_bu = "ktg_bu", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", uea_lim = "uea_lim", ueb_lim = "ueb_lim", ixs_esu_ban = "ixs_esu_ban", c_lim = "c_lim", c_kuhr = "c_kuhr", c_uhr = "c_uhr", typ_bu = "typ_bu", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", zkratka = "zkratka", mena = "mena", uea_uc = "uea_uc", ueb_uc = "ueb_uc", subrada_duz = "subrada_duz", priz_up_bu = "priz_up_bu", ixp_den_buc = "ixp_den_buc", sbu = "sbu", dat_bvy = "dat_bvy", c_ps = "c_ps", c_rok_db = "c_rok_db", c_rok_kr = "c_rok_kr", c_zust = "c_zust", druh_bu = "druh_bu", cis_bvy = "cis_bvy", ixp_bvy = "ixp_bvy", c_lim_max = "c_lim_max", uus = "uus", iban = "iban", zc_vyp = "zc_vyp", per_vyp = "per_vyp", ur_prist_bu = "ur_prist_bu", priz_isprofin = "priz_isprofin", kod_vys = "kod_vys", kon_maxlim = "kon_maxlim", par_vyp = "par_vyp", c_lim_ban = "c_lim_ban", c_zust_ban = "c_zust_ban", dat_bvy_ban = "dat_bvy_ban", dat_ttv = "dat_ttv", priz_sr = "priz_sr", id_hdr_ris_kr = "id_hdr_ris_kr", radek_hdr_kr = "radek_hdr_kr", priz_rozp = "priz_rozp", priz_spol_u = "priz_spol_u", ode_sp = "ode_sp", ukl_pri = "ukl_pri", id_nt_max = "id_nt_max", fidoo = "fidoo",}
	const enum GEkosuvlDtoFragments { rok = "*", ico = "*", ucs = "*", bu_vl = "*", sk_vl = "*", bu_txt = "*", ktg_bu = "*", aktivita = "*", dat_od = "*", dat_do = "*", uea_lim = "*", ueb_lim = "*", ixs_esu_ban = "*", c_lim = "*", c_kuhr = "*", c_uhr = "*", typ_bu = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", zkratka = "*", mena = "*", uea_uc = "*", ueb_uc = "*", subrada_duz = "*", priz_up_bu = "*", ixp_den_buc = "*", sbu = "*", dat_bvy = "*", c_ps = "*", c_rok_db = "*", c_rok_kr = "*", c_zust = "*", druh_bu = "*", cis_bvy = "*", ixp_bvy = "*", c_lim_max = "*", uus = "*", iban = "*", zc_vyp = "*", per_vyp = "*", ur_prist_bu = "*", priz_isprofin = "*", kod_vys = "*", kon_maxlim = "*", par_vyp = "*", c_lim_ban = "*", c_zust_ban = "*", dat_bvy_ban = "*", dat_ttv = "*", priz_sr = "*", id_hdr_ris_kr = "*", radek_hdr_kr = "*", priz_rozp = "*", priz_spol_u = "*", ode_sp = "*", ukl_pri = "*", id_nt_max = "*", fidoo = "*",}
	const enum GEkosuvlDtoTypes { rok = "number", ico = "string", ucs = "string", bu_vl = "string", sk_vl = "string", bu_txt = "string", ktg_bu = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", uea_lim = "string", ueb_lim = "string", ixs_esu_ban = "string", c_lim = "JsonDecimal", c_kuhr = "JsonDecimal", c_uhr = "JsonDecimal", typ_bu = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", zkratka = "string", mena = "number", uea_uc = "string", ueb_uc = "string", subrada_duz = "number", priz_up_bu = "number", ixp_den_buc = "string", sbu = "number", dat_bvy = "JsonDate", c_ps = "JsonDecimal", c_rok_db = "JsonDecimal", c_rok_kr = "JsonDecimal", c_zust = "JsonDecimal", druh_bu = "number", cis_bvy = "number", ixp_bvy = "string", c_lim_max = "JsonDecimal", uus = "string", iban = "string", zc_vyp = "number", per_vyp = "number", ur_prist_bu = "number", priz_isprofin = "number", kod_vys = "string", kon_maxlim = "number", par_vyp = "number", c_lim_ban = "JsonDecimal", c_zust_ban = "JsonDecimal", dat_bvy_ban = "JsonDate", dat_ttv = "JsonDate", priz_sr = "number", id_hdr_ris_kr = "string", radek_hdr_kr = "number", priz_rozp = "number", priz_spol_u = "number", ode_sp = "number", ukl_pri = "number", id_nt_max = "string", fidoo = "number",}
	const enum GEkosuvlDtoTypeLengths { ico = 10, ucs = 10, bu_vl = 34, sk_vl = 11, bu_txt = 46, uea_lim = 3, ueb_lim = 4, ixs_esu_ban = 12, zmenu_prov = 12, nazev = 50, zkratka = 16, uea_uc = 3, ueb_uc = 4, ixp_den_buc = 12, ixp_bvy = 12, uus = 10, iban = 34, kod_vys = 4, id_hdr_ris_kr = 10, id_nt_max = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkovagoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekovago
	*      Platnost EKO agend v účetním období
	*/
	interface GEkovagoDto {
		/**Rok deníku*/
		rok?: number|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GEkovagoDtoNames { rok = "rok", ico = "ico", ucs = "ucs", lic = "lic", typ_ag = "typ_ag", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkovagoDtoFragments { rok = "*", ico = "*", ucs = "*", lic = "*", typ_ag = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkovagoDtoTypes { rok = "number", ico = "string", ucs = "string", lic = "string", typ_ag = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkovagoDtoTypeLengths { ico = 10, ucs = 10, lic = 4, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkovfnsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekovfns
	*      Funkce účetního střediska
	*/
	interface GEkovfnsDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**funkce*/
		ixs_fun?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GEkovfnsDtoNames { ico = "ico", ucs = "ucs", ixs_fun = "ixs_fun", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkovfnsDtoFragments { ico = "*", ucs = "*", ixs_fun = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkovfnsDtoTypes { ico = "string", ucs = "string", ixs_fun = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkovfnsDtoTypeLengths { ico = 10, ucs = 10, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkovfseDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekovfse
	*      Přístupové masky na funkci - DWH
	*/
	interface GEkovfseDto {
		/**Funkční místo*/
		ixs_fun?: string|null;
		typ_ose?: number|null;
		element_ose?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GEkovfseDtoNames { ixs_fun = "ixs_fun", typ_ose = "typ_ose", element_ose = "element_ose", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkovfseDtoFragments { ixs_fun = "*", typ_ose = "*", element_ose = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkovfseDtoTypes { ixs_fun = "string", typ_ose = "number", element_ose = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkovfseDtoTypeLengths { ixs_fun = 12, element_ose = 20, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkovfteDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekovfte
	*      Vazba nákladového střediska na fukční místa
	*/
	interface GEkovfteDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**funkce*/
		ixs_fun?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GEkovfteDtoNames { ico = "ico", nks = "nks", ixs_fun = "ixs_fun", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkovfteDtoFragments { ico = "*", nks = "*", ixs_fun = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkovfteDtoTypes { ico = "string", nks = "string", ixs_fun = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkovfteDtoTypeLengths { ico = 10, nks = 12, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Eko\GEkovfusDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekovfus
	*      Funkce účtárny
	*/
	interface GEkovfusDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		/**funkce*/
		ixs_fun?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GEkovfusDtoNames { ico = "ico", ucs = "ucs", uus = "uus", ixs_fun = "ixs_fun", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkovfusDtoFragments { ico = "*", ucs = "*", uus = "*", ixs_fun = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkovfusDtoTypes { ico = "string", ucs = "string", uus = "string", ixs_fun = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkovfusDtoTypeLengths { ico = 10, ucs = 10, uus = 10, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Readers\IGReaderAdeDdpstpp.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filter*/
	const enum FilterGAdeDdpstpp {
		/**typ_phl*/
		typ_phl,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Readers\IGReaderAdeGinspod.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filter*/
	const enum FilterGAdeGinspod {
		/**Spisový uzel*/
		ixs_su,
		/**Ico*/
		ico,
		/**Účetní středisko*/
		ucs,
		/**Rok*/
		rok,
		/**aktivita (když je vytvořeno nekontrolovat aktivitu)*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Readers\IGReaderAdeMzacktd.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filter*/
	const enum FilterGAdeMzacktd {
		/**Kategorie deníku*/
		ktg_den,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Readers\IGReaderEkosose.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Obecná seskupení*/
	interface GEkososeExtDto extends Gordic.Adm.Interface.GEkososeDto {
		/**Kategorie seskupení*/
		ixs_kto_txt?: string|null;
		/**Textová reprezentace typu seskupení*/
		typ_ose_txt?: string|null;
	}
	const enum GEkososeExtDtoNames { ixs_kto_txt = "ixs_kto_txt", typ_ose_txt = "typ_ose_txt", ixs_ose = "ixs_ose", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", zkratka = "zkratka", priz_osv = "priz_osv", typ_elem = "typ_elem", typ_ose = "typ_ose", wradek1 = "wradek1", wradek2 = "wradek2", wradek3 = "wradek3", wradek4 = "wradek4", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", h_elem_od = "h_elem_od", h_elem_do = "h_elem_do", ixs_dwd = "ixs_dwd", ixs_kto = "ixs_kto", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do",}
	const enum GEkososeExtDtoFragments { ixs_kto_txt = "*", typ_ose_txt = "*", ixs_ose = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", nazev = "*", zkratka = "*", priz_osv = "*", typ_elem = "*", typ_ose = "*", wradek1 = "*", wradek2 = "*", wradek3 = "*", wradek4 = "*", dat_zmena = "*", zmenu_prov = "*", h_elem_od = "*", h_elem_do = "*", ixs_dwd = "*", ixs_kto = "*", rokmes_od = "*", rokmes_do = "*",}
	const enum GEkososeExtDtoTypes { ixs_kto_txt = "string", typ_ose_txt = "string", ixs_ose = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", zkratka = "string", priz_osv = "number", typ_elem = "number", typ_ose = "number", wradek1 = "string", wradek2 = "string", wradek3 = "string", wradek4 = "string", dat_zmena = "JsonDate", zmenu_prov = "string", h_elem_od = "string", h_elem_do = "string", ixs_dwd = "string", ixs_kto = "string", rokmes_od = "string", rokmes_do = "string",}
	const enum GEkososeExtDtoTypeLengths { ixs_ose = 12, poznamka = 50, nazev = 50, zkratka = 16, wradek1 = 254, wradek2 = 254, wradek3 = 254, wradek4 = 254, zmenu_prov = 12, h_elem_od = 20, h_elem_do = 20, ixs_dwd = 12, ixs_kto = 12, rokmes_od = 6, rokmes_do = 6,}
	/**Filter*/
	const enum FilterGEkosose {
		/**ixs_ose*/
		ixs_ose,
		/**typ_ose*/
		typ_ose,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Readers\IGReaderSrvspla.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filter*/
	const enum FilterGSrvspla {
		/**ixs_pla*/
		ixs_pla,
		/**Aktivita*/
		aktivita,
		/**Ičo*/
		ico,
	}
	/**Rozšíření GSrvPlatExtDto*/
	interface GSrvPlaExtDto extends Gordic.Adm.Interface.GSrvsplaDto {
		/**nazev_ico*/
		nazev_ico?: string|null;
	}
	const enum GSrvPlaExtDtoNames { nazev_ico = "nazev_ico", ixs_pla = "ixs_pla", rok = "rok", ico = "ico", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", ktg_akce = "ktg_akce", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cpps_msk = "cpps_msk", ixp_den_old = "ixp_den_old", priz_az_def = "priz_az_def", priz_gen_cis = "priz_gen_cis", ixs_csp = "ixs_csp", priz_ram_doh = "priz_ram_doh", ixs_prr_def = "ixs_prr_def", ixs_sro_az = "ixs_sro_az", ixs_tri_def = "ixs_tri_def",}
	const enum GSrvPlaExtDtoFragments { nazev_ico = "*", ixs_pla = "*", rok = "*", ico = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", ktg_akce = "*", dat_zmena = "*", zmenu_prov = "*", cpps_msk = "*", ixp_den_old = "*", priz_az_def = "*", priz_gen_cis = "*", ixs_csp = "*", priz_ram_doh = "*", ixs_prr_def = "*", ixs_sro_az = "*", ixs_tri_def = "*",}
	const enum GSrvPlaExtDtoTypes { nazev_ico = "string", ixs_pla = "string", rok = "number", ico = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", ktg_akce = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cpps_msk = "string", ixp_den_old = "string", priz_az_def = "number", priz_gen_cis = "number", ixs_csp = "string", priz_ram_doh = "number", ixs_prr_def = "string", ixs_sro_az = "string", ixs_tri_def = "string",}
	const enum GSrvPlaExtDtoTypeLengths { ixs_pla = 12, ico = 10, nazev = 50, zkratka = 16, poznamka = 50, zmenu_prov = 12, cpps_msk = 13, ixp_den_old = 12, ixs_csp = 12, ixs_prr_def = 12, ixs_sro_az = 12, ixs_tri_def = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Sml\GSmlssteDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:smlsste
	*      Šablona pro generování pohledávek
	*/
	interface GSmlssteDto {
		/**Šablona
		*      Identifikátor šablony pro správu pohledávek
		*/
		ixs_ste?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název šablony*/
		nazev?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Typ pohledávky
		*      Typ pohledávek vedených v DDP
		*/
		typ_phl?: string|null;
		/**Způsob platby, používá se k rozlišení jak bude uhrazena očekávaná platba*/
		zp?: number|null;
		/**Počet splátek*/
		poc_splatek?: number|null;
		/**Způsob vytvoření předpisů
		*      Atribut definuje, jak bude vytvořen předpis pohledávjy
		*/
		typ_gen?: number|null;
		/**Příznak periodičnosti úhrady*/
		priz_per?: number|null;
		/**Kategorie předpisu
		*      Kategorie předpisu - týká se atributu FUC
		*/
		ktg_upo?: number|null;
		/**Počet dnů pro posun data splatnosti od data vzniku*/
		posun_dat_spl?: number|null;
		/**Příznak zaokrouhlení*/
		priz_zaok?: number|null;
		/**Perioda opakování jednotlivých předpisů
		*      Definuje periodu opakování jednotlivých předpisů
		*/
		perioda?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSmlssteDtoNames { ixs_ste = "ixs_ste", aktivita = "aktivita", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", typ_phl = "typ_phl", zp = "zp", poc_splatek = "poc_splatek", typ_gen = "typ_gen", priz_per = "priz_per", ktg_upo = "ktg_upo", posun_dat_spl = "posun_dat_spl", priz_zaok = "priz_zaok", perioda = "perioda", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSmlssteDtoFragments { ixs_ste = "*", aktivita = "*", zkratka = "*", nazev = "*", poznamka = "*", typ_phl = "*", zp = "*", poc_splatek = "*", typ_gen = "*", priz_per = "*", ktg_upo = "*", posun_dat_spl = "*", priz_zaok = "*", perioda = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSmlssteDtoTypes { ixs_ste = "string", aktivita = "number", zkratka = "string", nazev = "string", poznamka = "string", typ_phl = "string", zp = "number", poc_splatek = "number", typ_gen = "number", priz_per = "number", ktg_upo = "number", posun_dat_spl = "number", priz_zaok = "number", perioda = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSmlssteDtoTypeLengths { ixs_ste = 12, zkratka = 16, nazev = 50, poznamka = 254, typ_phl = 4, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvcrreDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvcrre
	*      Režim realizace institucionálního předpokladu
	*/
	interface GSrvcrreDto {
		/**Režim realizace institucionálního předpokladu*/
		rezim_real?: number|null;
		/**název*/
		rezim_real_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GSrvcrreDtoNames { rezim_real = "rezim_real", rezim_real_txt = "rezim_real_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSrvcrreDtoFragments { rezim_real = "*", rezim_real_txt = "*", k_v = "*", k_s = "*",}
	const enum GSrvcrreDtoTypes { rezim_real = "number", rezim_real_txt = "string", k_v = "number", k_s = "string",}
	const enum GSrvcrreDtoTypeLengths { rezim_real_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvctspDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvctsp
	*      srvctsp
	*/
	interface GSrvctspDto {
		typ_spec?: number|null;
		typ_spec_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GSrvctspDtoNames { typ_spec = "typ_spec", typ_spec_txt = "typ_spec_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSrvctspDtoFragments { typ_spec = "*", typ_spec_txt = "*", k_v = "*", k_s = "*",}
	const enum GSrvctspDtoTypes { typ_spec = "number", typ_spec_txt = "string", k_v = "number", k_s = "string",}
	const enum GSrvctspDtoTypeLengths { typ_spec_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvczddDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvczdd
	*      srvczdd
	*/
	interface GSrvczddDto {
		zdroj_dok?: number|null;
		zdroj_dok_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GSrvczddDtoNames { zdroj_dok = "zdroj_dok", zdroj_dok_txt = "zdroj_dok_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSrvczddDtoFragments { zdroj_dok = "*", zdroj_dok_txt = "*", k_v = "*", k_s = "*",}
	const enum GSrvczddDtoTypes { zdroj_dok = "number", zdroj_dok_txt = "string", k_v = "number", k_s = "string",}
	const enum GSrvczddDtoTypeLengths { zdroj_dok_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvczpsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvczps
	*      srvczps
	*/
	interface GSrvczpsDto {
		zpusob_schv?: number|null;
		zpusob_schv_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GSrvczpsDtoNames { zpusob_schv = "zpusob_schv", zpusob_schv_txt = "zpusob_schv_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSrvczpsDtoFragments { zpusob_schv = "*", zpusob_schv_txt = "*", k_v = "*", k_s = "*",}
	const enum GSrvczpsDtoTypes { zpusob_schv = "number", zpusob_schv_txt = "string", k_v = "number", k_s = "string",}
	const enum GSrvczpsDtoTypeLengths { zpusob_schv_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvscspDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvscsp*/
	interface GSrvscspDto {
		/**DBCOLUMN:srvscsp.ixs_csp*/
		ixs_csp?: string|null;
		/**DBCOLUMN:srvscsp.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:srvscsp.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:srvscsp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:srvscsp.nazev_skp*/
		nazev_skp?: string|null;
		/**DBCOLUMN:srvscsp.zkratka_skp*/
		zkratka_skp?: string|null;
		/**DBCOLUMN:srvscsp.delka_skp*/
		delka_skp?: number|null;
		/**DBCOLUMN:srvscsp.nazev_psk*/
		nazev_psk?: string|null;
		/**DBCOLUMN:srvscsp.zkratka_psk*/
		zkratka_psk?: string|null;
		/**DBCOLUMN:srvscsp.delka_psk*/
		delka_psk?: number|null;
		/**DBCOLUMN:srvscsp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:srvscsp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:srvscsp.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSrvscspDtoNames { ixs_csp = "ixs_csp", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", nazev_skp = "nazev_skp", zkratka_skp = "zkratka_skp", delka_skp = "delka_skp", nazev_psk = "nazev_psk", zkratka_psk = "zkratka_psk", delka_psk = "delka_psk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvscspDtoFragments { ixs_csp = "*", nazev = "*", zkratka = "*", poznamka = "*", nazev_skp = "*", zkratka_skp = "*", delka_skp = "*", nazev_psk = "*", zkratka_psk = "*", delka_psk = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvscspDtoTypes { ixs_csp = "string", nazev = "string", zkratka = "string", poznamka = "string", nazev_skp = "string", zkratka_skp = "string", delka_skp = "number", nazev_psk = "string", zkratka_psk = "string", delka_psk = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvscspDtoTypeLengths { ixs_csp = 12, nazev = 254, zkratka = 50, poznamka = 254, nazev_skp = 254, zkratka_skp = 50, nazev_psk = 254, zkratka_psk = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvsddeDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvsdde
	*      Řady čísel akcí
	*/
	interface GSrvsddeDto {
		/**Rok deníku*/
		rok?: number|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kniha PLA*/
		ixs_pla?: string|null;
		/**Číslo subřady*/
		subrada?: number|null;
		/**Název*/
		nazev?: string|null;
		maska?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		cislo_od?: string|null;
		cislo_do?: string|null;
	}
	const enum GSrvsddeDtoNames { rok = "rok", ico = "ico", ixs_pla = "ixs_pla", subrada = "subrada", nazev = "nazev", maska = "maska", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cislo_od = "cislo_od", cislo_do = "cislo_do",}
	const enum GSrvsddeDtoFragments { rok = "*", ico = "*", ixs_pla = "*", subrada = "*", nazev = "*", maska = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", cislo_od = "*", cislo_do = "*",}
	const enum GSrvsddeDtoTypes { rok = "number", ico = "string", ixs_pla = "string", subrada = "number", nazev = "string", maska = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cislo_od = "string", cislo_do = "string",}
	const enum GSrvsddeDtoTypeLengths { ico = 10, ixs_pla = 12, nazev = 50, maska = 50, zmenu_prov = 12, cislo_od = 16, cislo_do = 16,}
}


//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvsobdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvsobd
	*      Vlastnosti účetního období pro SRV
	*/
	interface GSrvsobdDto {
		/**Rok deníku*/
		rok?: number|null;
		ixs_roz?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Příznak průběhu balancování*/
		priz_bal?: number|null;
		ipf_rok?: string|null;
		pocet_let_plan?: number|null;
	}
	const enum GSrvsobdDtoNames { rok = "rok", ixs_roz = "ixs_roz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_bal = "priz_bal", ipf_rok = "ipf_rok", pocet_let_plan = "pocet_let_plan",}
	const enum GSrvsobdDtoFragments { rok = "*", ixs_roz = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_bal = "*", ipf_rok = "*", pocet_let_plan = "*",}
	const enum GSrvsobdDtoTypes { rok = "number", ixs_roz = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_bal = "number", ipf_rok = "string", pocet_let_plan = "number",}
	const enum GSrvsobdDtoTypeLengths { ixs_roz = 12, zmenu_prov = 12, ipf_rok = 36,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvsoblDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvsobl
	*      Oblasti limitů
	*/
	interface GSrvsoblDto {
		/**IČO*/
		ico?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		id_tzd?: string|null;
		id_vyb?: string|null;
		id_eds?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GSrvsoblDtoNames { ico = "ico", rok = "rok", id_tzd = "id_tzd", id_vyb = "id_vyb", id_eds = "id_eds", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvsoblDtoFragments { ico = "*", rok = "*", id_tzd = "*", id_vyb = "*", id_eds = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvsoblDtoTypes { ico = "string", rok = "number", id_tzd = "string", id_vyb = "string", id_eds = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvsoblDtoTypeLengths { ico = 10, id_tzd = 20, id_vyb = 20, id_eds = 63, zmenu_prov = 12,}
	/**Rozšíření dto txt hodnoty*/
	interface GSrvsoblExtDto extends Gordic.Adm.Interface.GSrvsoblDto {
		/**Textová reprrezentace - typ zdroje pro rozpis*/
		id_tzd_txt?: string|null;
		/**Textová reprrezentace - výdajové bloky*/
		id_vyb_txt?: string|null;
		/**Textová reprrezentace - strukturální fondy EU - ISPROFIN*/
		id_eds_txt?: string|null;
	}
	const enum GSrvsoblExtDtoNames { id_tzd_txt = "id_tzd_txt", id_vyb_txt = "id_vyb_txt", id_eds_txt = "id_eds_txt", ico = "ico", rok = "rok", id_tzd = "id_tzd", id_vyb = "id_vyb", id_eds = "id_eds", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvsoblExtDtoFragments { id_tzd_txt = "*", id_vyb_txt = "*", id_eds_txt = "*", ico = "*", rok = "*", id_tzd = "*", id_vyb = "*", id_eds = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvsoblExtDtoTypes { id_tzd_txt = "string", id_vyb_txt = "string", id_eds_txt = "string", ico = "string", rok = "number", id_tzd = "string", id_vyb = "string", id_eds = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvsoblExtDtoTypeLengths { ico = 10, id_tzd = 20, id_vyb = 20, id_eds = 63, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvsplaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvspla
	*      Kniha PLA
	*/
	interface GSrvsplaDto {
		/**Kniha PLA
		*      Kniha PLA
		*/
		ixs_pla?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**IČO*/
		ico?: string|null;
		/**Název
		*      Název knihy
		*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita
		*      Aktivita záznamu
		*/
		aktivita?: number|null;
		/**Typ akce*/
		ktg_akce?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**rozpad čísla akce*/
		cpps_msk?: string|null;
		ixp_den_old?: string|null;
		priz_az_def?: number|null;
		priz_gen_cis?: number|null;
		ixs_csp?: string|null;
		priz_ram_doh?: number|null;
		ixs_prr_def?: string|null;
		/**Schvalovací role AZ*/
		ixs_sro_az?: string|null;
		/**Třída akce*/
		ixs_tri_def?: string|null;
		priz_lim?: number|null;
	}
	const enum GSrvsplaDtoNames { ixs_pla = "ixs_pla", rok = "rok", ico = "ico", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", ktg_akce = "ktg_akce", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cpps_msk = "cpps_msk", ixp_den_old = "ixp_den_old", priz_az_def = "priz_az_def", priz_gen_cis = "priz_gen_cis", ixs_csp = "ixs_csp", priz_ram_doh = "priz_ram_doh", ixs_prr_def = "ixs_prr_def", ixs_sro_az = "ixs_sro_az", ixs_tri_def = "ixs_tri_def", priz_lim = "priz_lim",}
	const enum GSrvsplaDtoFragments { ixs_pla = "*", rok = "*", ico = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", ktg_akce = "*", dat_zmena = "*", zmenu_prov = "*", cpps_msk = "*", ixp_den_old = "*", priz_az_def = "*", priz_gen_cis = "*", ixs_csp = "*", priz_ram_doh = "*", ixs_prr_def = "*", ixs_sro_az = "*", ixs_tri_def = "*", priz_lim = "*",}
	const enum GSrvsplaDtoTypes { ixs_pla = "string", rok = "number", ico = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", ktg_akce = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cpps_msk = "string", ixp_den_old = "string", priz_az_def = "number", priz_gen_cis = "number", ixs_csp = "string", priz_ram_doh = "number", ixs_prr_def = "string", ixs_sro_az = "string", ixs_tri_def = "string", priz_lim = "number",}
	const enum GSrvsplaDtoTypeLengths { ixs_pla = 12, ico = 10, nazev = 50, zkratka = 16, poznamka = 50, zmenu_prov = 12, cpps_msk = 13, ixp_den_old = 12, ixs_csp = 12, ixs_prr_def = 12, ixs_sro_az = 12, ixs_tri_def = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvsprrDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvsprr
	*      Procesy realizace položky plánu
	*/
	interface GSrvsprrDto {
		ixs_prr?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Rok od*/
		rok_od?: number|null;
		/**Rok do*/
		rok_do?: number|null;
		/**Schavlovací role AZ*/
		ixs_sro_az?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		priz_lim?: number|null;
	}
	const enum GSrvsprrDtoNames { ixs_prr = "ixs_prr", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", rok_od = "rok_od", rok_do = "rok_do", ixs_sro_az = "ixs_sro_az", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_lim = "priz_lim",}
	const enum GSrvsprrDtoFragments { ixs_prr = "*", nazev = "*", zkratka = "*", poznamka = "*", rok_od = "*", rok_do = "*", ixs_sro_az = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_lim = "*",}
	const enum GSrvsprrDtoTypes { ixs_prr = "string", nazev = "string", zkratka = "string", poznamka = "string", rok_od = "number", rok_do = "number", ixs_sro_az = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_lim = "number",}
	const enum GSrvsprrDtoTypeLengths { ixs_prr = 12, nazev = 100, zkratka = 16, poznamka = 254, ixs_sro_az = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvstipDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvstip
	*      Typ institucionálního předpokladu
	*/
	interface GSrvstipDto {
		/**Typ institucionálního předpokladu
		*      Typ institucionálního předpokladu
		*/
		ixs_tip?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Druh dokumentu*/
		ixs_typ?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		rezim_real?: number|null;
		priz_nevyzad?: number|null;
		zdroj_dok?: number|null;
		typ_spec?: number|null;
	}
	const enum GSrvstipDtoNames { ixs_tip = "ixs_tip", nazev = "nazev", aktivita = "aktivita", ixs_typ = "ixs_typ", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", k_v = "k_v", rezim_real = "rezim_real", priz_nevyzad = "priz_nevyzad", zdroj_dok = "zdroj_dok", typ_spec = "typ_spec",}
	const enum GSrvstipDtoFragments { ixs_tip = "*", nazev = "*", aktivita = "*", ixs_typ = "*", dat_zmena = "*", zmenu_prov = "*", k_v = "*", rezim_real = "*", priz_nevyzad = "*", zdroj_dok = "*", typ_spec = "*",}
	const enum GSrvstipDtoTypes { ixs_tip = "string", nazev = "string", aktivita = "number", ixs_typ = "string", dat_zmena = "JsonDate", zmenu_prov = "string", k_v = "number", rezim_real = "number", priz_nevyzad = "number", zdroj_dok = "number", typ_spec = "number",}
	const enum GSrvstipDtoTypeLengths { ixs_tip = 12, nazev = 50, ixs_typ = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvstriDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvstri
	*      Třída akce
	*/
	interface GSrvstriDto {
		ixs_tri?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		rok_od?: number|null;
		rok_do?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GSrvstriDtoNames { ixs_tri = "ixs_tri", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", rok_od = "rok_od", rok_do = "rok_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvstriDtoFragments { ixs_tri = "*", nazev = "*", zkratka = "*", poznamka = "*", rok_od = "*", rok_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvstriDtoTypes { ixs_tri = "string", nazev = "string", zkratka = "string", poznamka = "string", rok_od = "number", rok_do = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvstriDtoTypeLengths { ixs_tri = 12, nazev = 100, zkratka = 16, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvstzdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvstzd
	*      Typ zdroje pro rozpis
	*/
	interface GSrvstzdDto {
		id_tzd?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSrvstzdDtoNames { id_tzd = "id_tzd", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvstzdDtoFragments { id_tzd = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvstzdDtoTypes { id_tzd = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvstzdDtoTypeLengths { id_tzd = 20, nazev = 254, zkratka = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvsvybDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvsvyb
	*      Výdajové bloky
	*/
	interface GSrvsvybDto {
		/**IČO*/
		ico?: string|null;
		id_vyb?: string|null;
		kod?: string|null;
		/**Název*/
		nazev?: string|null;
		rok_od?: number|null;
		rok_do?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GSrvsvybDtoNames { ico = "ico", id_vyb = "id_vyb", kod = "kod", nazev = "nazev", rok_od = "rok_od", rok_do = "rok_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvsvybDtoFragments { ico = "*", id_vyb = "*", kod = "*", nazev = "*", rok_od = "*", rok_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvsvybDtoTypes { ico = "string", id_vyb = "string", kod = "string", nazev = "string", rok_od = "number", rok_do = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvsvybDtoTypeLengths { ico = 10, id_vyb = 20, kod = 20, nazev = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvsxpfDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvsxpf
	*      Strukturální fondy EU - ISPROFIN
	*/
	interface GSrvsxpfDto {
		xpf_pf?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Úroveň projektu*/
		uroven?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		rok_od?: number|null;
		rok_do?: number|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**hodnota slova PRJ*/
		kod_uct?: string|null;
		priz_eds?: number|null;
	}
	const enum GSrvsxpfDtoNames { xpf_pf = "xpf_pf", nazev = "nazev", uroven = "uroven", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", rok_od = "rok_od", rok_do = "rok_do", ico = "ico", kod_uct = "kod_uct", priz_eds = "priz_eds",}
	const enum GSrvsxpfDtoFragments { xpf_pf = "*", nazev = "*", uroven = "*", dat_zmena = "*", zmenu_prov = "*", aktivita = "*", rok_od = "*", rok_do = "*", ico = "*", kod_uct = "*", priz_eds = "*",}
	const enum GSrvsxpfDtoTypes { xpf_pf = "string", nazev = "string", uroven = "string", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", rok_od = "number", rok_do = "number", ico = "string", kod_uct = "string", priz_eds = "number",}
	const enum GSrvsxpfDtoTypeLengths { xpf_pf = 63, nazev = 254, uroven = 15, zmenu_prov = 12, ico = 10, kod_uct = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvvippDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvvipp
	*      Přístup k plnění IP
	*/
	interface GSrvvippDto {
		/**Kniha PLA*/
		ixs_pla?: string|null;
		/**Typ institucionálního předpokladu*/
		ixs_tip?: string|null;
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GSrvvippDtoNames { ixs_pla = "ixs_pla", ixs_tip = "ixs_tip", ixs_fun = "ixs_fun", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvvippDtoFragments { ixs_pla = "*", ixs_tip = "*", ixs_fun = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvvippDtoTypes { ixs_pla = "string", ixs_tip = "string", ixs_fun = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvvippDtoTypeLengths { ixs_pla = 12, ixs_tip = 12, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvvoblDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvvobl
	*      Funkční místa oblasti limitů
	*/
	interface GSrvvoblDto {
		/**IČO*/
		ico?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		id_tzd?: string|null;
		id_vyb?: string|null;
		id_eds?: string|null;
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GSrvvoblDtoNames { ico = "ico", rok = "rok", id_tzd = "id_tzd", id_vyb = "id_vyb", id_eds = "id_eds", ixs_fun = "ixs_fun", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvvoblDtoFragments { ico = "*", rok = "*", id_tzd = "*", id_vyb = "*", id_eds = "*", ixs_fun = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvvoblDtoTypes { ico = "string", rok = "number", id_tzd = "string", id_vyb = "string", id_eds = "string", ixs_fun = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvvoblDtoTypeLengths { ico = 10, id_tzd = 20, id_vyb = 20, id_eds = 63, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvvprkDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvvprk
	*      Povolené vazby realizace na knihu
	*/
	interface GSrvvprkDto {
		/**Proces realizace plánu*/
		ixs_prr?: string|null;
		/**Kniha*/
		ixs_pla?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GSrvvprkDtoNames { ixs_prr = "ixs_prr", ixs_pla = "ixs_pla", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvvprkDtoFragments { ixs_prr = "*", ixs_pla = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvvprkDtoTypes { ixs_prr = "string", ixs_pla = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvvprkDtoTypeLengths { ixs_prr = 12, ixs_pla = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvvprrDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvvprr
	*      Institucionální předpoklad pro proces realizace
	*/
	interface GSrvvprrDto {
		/**Proces realizace*/
		ixs_prr?: string|null;
		/**Typ institucionálního předpokladu*/
		ixs_tip?: string|null;
		/**Povinnost*/
		priz_pov?: number|null;
		/**Povinnost přílohy*/
		priz_pov_ixb?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Povinná hodnota Nepožadováno*/
		priz_nevyzad?: number|null;
		/**Role předkladatele*/
		ixs_sro_predklad?: string|null;
		/**Role schvalovatele*/
		ixs_sro_schvalov?: string|null;
		/**Následující IP*/
		ixs_tip_next?: string|null;
		/**Povinné pro zaplánování*/
		priz_pov_zapl?: number|null;
		/**Povinné pro kompletaci*/
		priz_pov_kompl?: number|null;
		priz_pov_schv?: number|null;
		zpusob_schv?: number|null;
		priz_blok_vp?: number|null;
		priz_blok_rz?: number|null;
		priz_blok_sdp?: number|null;
		priz_blok_eds?: number|null;
		priz_blok_rv?: number|null;
		priz_blok_pri?: number|null;
	}
	const enum GSrvvprrDtoNames { ixs_prr = "ixs_prr", ixs_tip = "ixs_tip", priz_pov = "priz_pov", priz_pov_ixb = "priz_pov_ixb", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_nevyzad = "priz_nevyzad", ixs_sro_predklad = "ixs_sro_predklad", ixs_sro_schvalov = "ixs_sro_schvalov", ixs_tip_next = "ixs_tip_next", priz_pov_zapl = "priz_pov_zapl", priz_pov_kompl = "priz_pov_kompl", priz_pov_schv = "priz_pov_schv", zpusob_schv = "zpusob_schv", priz_blok_vp = "priz_blok_vp", priz_blok_rz = "priz_blok_rz", priz_blok_sdp = "priz_blok_sdp", priz_blok_eds = "priz_blok_eds", priz_blok_rv = "priz_blok_rv", priz_blok_pri = "priz_blok_pri",}
	const enum GSrvvprrDtoFragments { ixs_prr = "*", ixs_tip = "*", priz_pov = "*", priz_pov_ixb = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_nevyzad = "*", ixs_sro_predklad = "*", ixs_sro_schvalov = "*", ixs_tip_next = "*", priz_pov_zapl = "*", priz_pov_kompl = "*", priz_pov_schv = "*", zpusob_schv = "*", priz_blok_vp = "*", priz_blok_rz = "*", priz_blok_sdp = "*", priz_blok_eds = "*", priz_blok_rv = "*", priz_blok_pri = "*",}
	const enum GSrvvprrDtoTypes { ixs_prr = "string", ixs_tip = "string", priz_pov = "number", priz_pov_ixb = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_nevyzad = "number", ixs_sro_predklad = "string", ixs_sro_schvalov = "string", ixs_tip_next = "string", priz_pov_zapl = "number", priz_pov_kompl = "number", priz_pov_schv = "number", zpusob_schv = "number", priz_blok_vp = "number", priz_blok_rz = "number", priz_blok_sdp = "number", priz_blok_eds = "number", priz_blok_rv = "number", priz_blok_pri = "number",}
	const enum GSrvvprrDtoTypeLengths { ixs_prr = 12, ixs_tip = 12, zmenu_prov = 12, ixs_sro_predklad = 12, ixs_sro_schvalov = 12, ixs_tip_next = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvvrfuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvvrfu
	*      Povolené funkce pro plány
	*/
	interface GSrvvrfuDto {
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Identifikátor knihy*/
		ixp_den?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSrvvrfuDtoNames { ixs_fun = "ixs_fun", ixp_den = "ixp_den", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvvrfuDtoFragments { ixs_fun = "*", ixp_den = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvvrfuDtoTypes { ixs_fun = "string", ixp_den = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvvrfuDtoTypeLengths { ixs_fun = 12, ixp_den = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvvtipDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvvtip
	*      Institucionální předpoklady pro plány
	*/
	interface GSrvvtipDto {
		/**Kniha PLA*/
		ixs_pla?: string|null;
		/**Typ institucionálního předpokladu*/
		ixs_tip?: string|null;
		/**Povinnost*/
		priz_pov?: number|null;
		priz_pov_ixb?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		priz_nevyzad?: number|null;
		ixs_sro_predklad?: string|null;
		ixs_sro_schvalov?: string|null;
		ixs_tip_next?: string|null;
		priz_pov_zapl?: number|null;
		priz_pov_kompl?: number|null;
		priz_pov_schv?: number|null;
		zpusob_schv?: number|null;
		priz_blok_vp?: number|null;
		priz_blok_rz?: number|null;
		priz_blok_sdp?: number|null;
		priz_blok_eds?: number|null;
		priz_blok_rv?: number|null;
		priz_blok_pri?: number|null;
	}
	const enum GSrvvtipDtoNames { ixs_pla = "ixs_pla", ixs_tip = "ixs_tip", priz_pov = "priz_pov", priz_pov_ixb = "priz_pov_ixb", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_nevyzad = "priz_nevyzad", ixs_sro_predklad = "ixs_sro_predklad", ixs_sro_schvalov = "ixs_sro_schvalov", ixs_tip_next = "ixs_tip_next", priz_pov_zapl = "priz_pov_zapl", priz_pov_kompl = "priz_pov_kompl", priz_pov_schv = "priz_pov_schv", zpusob_schv = "zpusob_schv", priz_blok_vp = "priz_blok_vp", priz_blok_rz = "priz_blok_rz", priz_blok_sdp = "priz_blok_sdp", priz_blok_eds = "priz_blok_eds", priz_blok_rv = "priz_blok_rv", priz_blok_pri = "priz_blok_pri",}
	const enum GSrvvtipDtoFragments { ixs_pla = "*", ixs_tip = "*", priz_pov = "*", priz_pov_ixb = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_nevyzad = "*", ixs_sro_predklad = "*", ixs_sro_schvalov = "*", ixs_tip_next = "*", priz_pov_zapl = "*", priz_pov_kompl = "*", priz_pov_schv = "*", zpusob_schv = "*", priz_blok_vp = "*", priz_blok_rz = "*", priz_blok_sdp = "*", priz_blok_eds = "*", priz_blok_rv = "*", priz_blok_pri = "*",}
	const enum GSrvvtipDtoTypes { ixs_pla = "string", ixs_tip = "string", priz_pov = "number", priz_pov_ixb = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_nevyzad = "number", ixs_sro_predklad = "string", ixs_sro_schvalov = "string", ixs_tip_next = "string", priz_pov_zapl = "number", priz_pov_kompl = "number", priz_pov_schv = "number", zpusob_schv = "number", priz_blok_vp = "number", priz_blok_rz = "number", priz_blok_sdp = "number", priz_blok_eds = "number", priz_blok_rv = "number", priz_blok_pri = "number",}
	const enum GSrvvtipDtoTypeLengths { ixs_pla = 12, ixs_tip = 12, zmenu_prov = 12, ixs_sro_predklad = 12, ixs_sro_schvalov = 12, ixs_tip_next = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Srv\GSrvvtypDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:srvvtyp
	*      Povolen� typy pro institucion�ln� p�edpoklad
	*/
	interface GSrvvtypDto {
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		/**Typ institucion�ln�ho p�edpokladu*/
		ixs_tip?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Zm�n�no*/
		dat_zmena?: JsonDate|null;
		/**Zm�nil*/
		zmenu_prov?: string|null;
	}
	const enum GSrvvtypDtoNames { ixs_typ = "ixs_typ", ixs_tip = "ixs_tip", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvvtypDtoFragments { ixs_typ = "*", ixs_tip = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSrvvtypDtoTypes { ixs_typ = "string", ixs_tip = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvvtypDtoTypeLengths { ixs_typ = 12, ixs_tip = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ade\Uct\GUctdrozOrjDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:uctdroz
	*      Kompletní definice rozvrhu (všechny úrovně)
	*/
	interface GUctdrozOrjDto {
		/**ORJ - ORJ*/
		te0?: string|null;
		/**Nazev*/
		nazev?: string|null;
		/**úroveň větve rozvrhu*/
		uroven_kon?: string|null;
	}
	const enum GUctdrozOrjDtoNames { te0 = "te0", nazev = "nazev", uroven_kon = "uroven_kon",}
	const enum GUctdrozOrjDtoFragments { te0 = "*", nazev = "*", uroven_kon = "*",}
	const enum GUctdrozOrjDtoTypes { te0 = "string", nazev = "string", uroven_kon = "string",}
	const enum GUctdrozOrjDtoTypeLengths { te0 = 16, uroven_kon = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\GConfigSelectBoxDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Objekt pro select box využívaný hlavně pro načtení možných hodnot parametrů*/
	interface GConfigSelectBoxItemDto {
		/**nečitelná hodnota (primární klíč)*/
		param?: string|null;
		/**nečitelná hodnota (primární klíč)*/
		config?: string|null;
		/**čitelná hodnota*/
		config_txt?: string|null;
		/**popis*/
		popis?: string|null;
		/**Param_rsx*/
		param_rsx?: number|null;
	}
	const enum GConfigSelectBoxItemDtoNames { param = "param", config = "config", config_txt = "config_txt", popis = "popis", param_rsx = "param_rsx",}
	const enum GConfigSelectBoxItemDtoFragments { param = "*", config = "*", config_txt = "*", popis = "*", param_rsx = "*",}
	const enum GConfigSelectBoxItemDtoTypes { param = "string", config = "string", config_txt = "string", popis = "string", param_rsx = "number",}
	const enum GConfigSelectBoxItemDtoTypeLengths {}
	/**Konfigurace políčka pro výběr hodnot*/
	interface GConfigSelectBoxDto {
		/**konfigurační data*/
		configData?: Gordic.Adm.Interface.GConfigSelectBoxItemDto[]|null;
		/**popisek políčka*/
		select_box_label?: string|null;
	}
	const enum GConfigSelectBoxDtoNames { configData = "configData", select_box_label = "select_box_label",}
	const enum GConfigSelectBoxDtoFragments { configData = "*", select_box_label = "*",}
	const enum GConfigSelectBoxDtoTypes { configData = "Gordic.Adm.Interface.GConfigSelectBoxItemDto[]", select_box_label = "string",}
	const enum GConfigSelectBoxDtoTypeLengths {}
	/**Parametr pro nalezení*/
	const enum GConfigSelectBoxFilterEnum {
		/**název paramentru*/
		param,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\GExterniIdentifikaceDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Dto reprezentující externi identifikaci*/
	interface GExterniIdentifikaceDto {
		/**Externí systém*/
		ixs_ext?: string|null;
		/**Textová reprezentace externího systému*/
		ixs_ext_txt?: string|null;
		/**Segment INTu*/
		id_seg?: string|null;
		/**Externí ID objektu
		*      Externí systém přiřadí objektu se kterým v rámci rozhraní GINIS pracuje svou unikátní identifikaci. Systém GINIS ji při prvním zachyceném výskytu zaregistruje do převodní tabulky a následně již objekt externím systémem takto identifikovaný dokáže přiřadit k vnitřní identifikaci systému GINIS
		*/
		id_ext?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Textová reprezentace aktivity*/
		aktivita_txt?: string|null;
	}
	const enum GExterniIdentifikaceDtoNames { ixs_ext = "ixs_ext", ixs_ext_txt = "ixs_ext_txt", id_seg = "id_seg", id_ext = "id_ext", aktivita = "aktivita", aktivita_txt = "aktivita_txt",}
	const enum GExterniIdentifikaceDtoFragments { ixs_ext = "*", ixs_ext_txt = "*", id_seg = "*", id_ext = "*", aktivita = "*", aktivita_txt = "*",}
	const enum GExterniIdentifikaceDtoTypes { ixs_ext = "string", ixs_ext_txt = "string", id_seg = "string", id_ext = "string", aktivita = "number", aktivita_txt = "string",}
	const enum GExterniIdentifikaceDtoTypeLengths { ixs_ext = 12, id_seg = 12, id_ext = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\GReaderAdmGincaktDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Dto pro zvláštní prefab výběru aktivity*/
	interface GReaderAdmGincaktDto {
		/**Aktivita*/
		aktivita?: number|null;
		/**Popis*/
		aktivita_txt?: string|null;
	}
	const enum GReaderAdmGincaktDtoNames { aktivita = "aktivita", aktivita_txt = "aktivita_txt",}
	const enum GReaderAdmGincaktDtoFragments { aktivita = "*", aktivita_txt = "*",}
	const enum GReaderAdmGincaktDtoTypes { aktivita = "number", aktivita_txt = "string",}
	const enum GReaderAdmGincaktDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\GReaderDbLoginsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpar*/
	interface GReaderDbLoginsDto {
		/**DBCOLUMN:sys.server_principals.name*/
		name?: string|null;
	}
	const enum GReaderDbLoginsDtoNames { name = "name",}
	const enum GReaderDbLoginsDtoFragments { name = "*",}
	const enum GReaderDbLoginsDtoTypes { name = "string",}
	const enum GReaderDbLoginsDtoTypeLengths { name = 255,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\GReaderGincparDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpar*/
	interface GReaderGincparDto {
		/**DBCOLUMN:gincpar.param*/
		param?: string|null;
		/**DBCOLUMN:gincpar.param_txt*/
		param_txt?: string|null;
		/**DBCOLUMN:gincpar.priz_num*/
		priz_num?: number|null;
		/**DBCOLUMN:gincpar.priz_num*/
		priz_zobr?: number|null;
		/**DBCOLUMN:gincpar.priz_num*/
		aktivita?: number|null;
		/**DBCOLUMN:gincpar.popis*/
		popis?: string|null;
		/**DBCOLUMN:gincpar.typ_par*/
		typ_par?: number|null;
		/**DBCOLUMN:gincpar.ixs_cis*/
		ixs_cis?: string|null;
		/**DBCOLUMN:gincpar.config_txt*/
		config_txt?: string|null;
		/**DBCOLUMN:gincpar.priz_multi*/
		priz_multi?: number|null;
		/**DBCOLUMN:gincpar.priz_passwd*/
		priz_passwd?: number|null;
		/**DBCOLUMN:gincpar.priz_long*/
		priz_long?: number|null;
		/**DBCOLUMN:gincpar.povol_null*/
		povol_null?: number|null;
		/**DBCOLUMN:gincpar.param_rsx*/
		param_rsx?: number|null;
		priz_zobr_adm?: number|null;
	}
	const enum GReaderGincparDtoNames { param = "param", param_txt = "param_txt", priz_num = "priz_num", priz_zobr = "priz_zobr", aktivita = "aktivita", popis = "popis", typ_par = "typ_par", ixs_cis = "ixs_cis", config_txt = "config_txt", priz_multi = "priz_multi", priz_passwd = "priz_passwd", priz_long = "priz_long", povol_null = "povol_null", param_rsx = "param_rsx", priz_zobr_adm = "priz_zobr_adm",}
	const enum GReaderGincparDtoFragments { param = "*", param_txt = "*", priz_num = "*", priz_zobr = "*", aktivita = "*", popis = "*", typ_par = "*", ixs_cis = "*", config_txt = "*", priz_multi = "*", priz_passwd = "*", priz_long = "*", povol_null = "*", param_rsx = "*", priz_zobr_adm = "*",}
	const enum GReaderGincparDtoTypes { param = "string", param_txt = "string", priz_num = "number", priz_zobr = "number", aktivita = "number", popis = "string", typ_par = "number", ixs_cis = "string", config_txt = "string", priz_multi = "number", priz_passwd = "number", priz_long = "number", povol_null = "number", param_rsx = "number", priz_zobr_adm = "number",}
	const enum GReaderGincparDtoTypeLengths { param = 15, param_txt = 100, popis = 254, ixs_cis = 12, config_txt = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\GReaderGinctauDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginctau*/
	interface GReaderGinctauDto {
		/**DBCOLUMN:ginctau.typ_aut*/
		typ_aut?: number|null;
		/**DBCOLUMN:ginctau.typ_aut_txt*/
		typ_aut_txt?: string|null;
	}
	const enum GReaderGinctauDtoNames { typ_aut = "typ_aut", typ_aut_txt = "typ_aut_txt",}
	const enum GReaderGinctauDtoFragments { typ_aut = "*", typ_aut_txt = "*",}
	const enum GReaderGinctauDtoTypes { typ_aut = "number", typ_aut_txt = "string",}
	const enum GReaderGinctauDtoTypeLengths { typ_aut_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\GReaderGincuvlDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincuvl*/
	interface GReaderGincuvlDto {
		/**DBCOLUMN:gincuvl.uroven_vla*/
		uroven_vla?: number|null;
		/**DBCOLUMN:gincuvl.uroven_vla_txt*/
		uroven_vla_txt?: string|null;
		/**DBCOLUMN:gincuvl.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincuvl.k_s*/
		k_s?: string|null;
	}
	const enum GReaderGincuvlDtoNames { uroven_vla = "uroven_vla", uroven_vla_txt = "uroven_vla_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderGincuvlDtoFragments { uroven_vla = "*", uroven_vla_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderGincuvlDtoTypes { uroven_vla = "number", uroven_vla_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderGincuvlDtoTypeLengths { uroven_vla_txt = 50, k_s = 15,}
	/**ENUM:gincuvl*/
	const enum GReaderGincuvlEnum {
		/**Základní*/
		_0=0,
		/**Šanon*/
		_50=50,
		/**Formuláře*/
		_60=60,
		/**Kybez*/
		_100=100,
	}
	function GReaderGincuvlEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GReaderGincuvlEnum, Gordic.Adm.Interface.GReaderGincuvlDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\GReaderWindowsLoginsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpar*/
	interface GReaderWindowsLoginsDto {
		/**DBCOLUMN:sys.server_principals.name*/
		name?: string|null;
	}
	const enum GReaderWindowsLoginsDtoNames { name = "name",}
	const enum GReaderWindowsLoginsDtoFragments { name = "*",}
	const enum GReaderWindowsLoginsDtoTypes { name = "string",}
	const enum GReaderWindowsLoginsDtoTypeLengths { name = 255,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\GSelectBoxBaseDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Základní select pro výběr subjektu využívaný v seskupeních*/
	interface GSelectBoxBaseDto {
		/**Ixs*/
		ixs?: string|null;
		/**Název*/
		nazev?: string|null;
	}
	const enum GSelectBoxBaseDtoNames { ixs = "ixs", nazev = "nazev",}
	const enum GSelectBoxBaseDtoFragments { ixs = "*", nazev = "*",}
	const enum GSelectBoxBaseDtoTypes { ixs = "string", nazev = "string",}
	const enum GSelectBoxBaseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Eko\GEkocpiiDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekocpii*/
	interface GEkocpiiDto {
		/**DBCOLUMN:ekocpii.priz_iissp*/
		priz_iissp?: number|null;
		/**DBCOLUMN:ekocpii.priz_iissp_txt*/
		priz_iissp_txt?: string|null;
		/**DBCOLUMN:ekocpii.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekocpii.k_s*/
		k_s?: string|null;
	}
	const enum GEkocpiiDtoNames { priz_iissp = "priz_iissp", priz_iissp_txt = "priz_iissp_txt", k_v = "k_v", k_s = "k_s",}
	const enum GEkocpiiDtoFragments { priz_iissp = "*", priz_iissp_txt = "*", k_v = "*", k_s = "*",}
	const enum GEkocpiiDtoTypes { priz_iissp = "number", priz_iissp_txt = "string", k_v = "number", k_s = "string",}
	const enum GEkocpiiDtoTypeLengths { priz_iissp_txt = 100, k_s = 15,}
	/**ENUM:ekocpii*/
	const enum GEkocpiiEnum {
		/**Aplikace nekomunikuje s IISSP*/
		_0=0,
		/**Pasivní varianta komunikace s IISSP – vzhledem k EDS/SMVS*/
		_1=1,
		/**Aktivní varianta komunikace s IISSP – vzhledem k EDS/SMVS*/
		_2=2,
	}
	function GEkocpiiEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkocpiiEnum, Gordic.Adm.Interface.GEkocpiiDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Eko\GEkoctygDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekoctyg
	*      Typy seskupení
	*/
	interface GEkoctygDto {
		typ_ose?: number|null;
		typ_ose_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		tyi?: string|null;
	}
	const enum GEkoctygDtoNames { typ_ose = "typ_ose", typ_ose_txt = "typ_ose_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", tyi = "tyi",}
	const enum GEkoctygDtoFragments { typ_ose = "*", typ_ose_txt = "*", k_v = "*", k_s = "*", aktivita = "*", tyi = "*",}
	const enum GEkoctygDtoTypes { typ_ose = "number", typ_ose_txt = "string", k_v = "number", k_s = "string", aktivita = "number", tyi = "string",}
	const enum GEkoctygDtoTypeLengths { typ_ose_txt = 50, k_s = 15, tyi = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Eko\GEkoctyoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekoctyo
	*      Typy seskupení a jejich obsahů
	*/
	interface GEkoctyoDto {
		typ_ose?: number|null;
		typ_ose_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
	}
	const enum GEkoctyoDtoNames { typ_ose = "typ_ose", typ_ose_txt = "typ_ose_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita",}
	const enum GEkoctyoDtoFragments { typ_ose = "*", typ_ose_txt = "*", k_v = "*", k_s = "*", aktivita = "*",}
	const enum GEkoctyoDtoTypes { typ_ose = "number", typ_ose_txt = "string", k_v = "number", k_s = "string", aktivita = "number",}
	const enum GEkoctyoDtoTypeLengths { typ_ose_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Eko\GEkodicoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekodico
	*      Vlastnosti pro IČO platné pro ROK
	*/
	interface GEkodicoDto {
		/**Rok deníku*/
		rok?: number|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		ixs_sax?: string|null;
		nks_vl?: string|null;
		/**Příznak řízení nápočtu P/V*/
		priz_npv?: number|null;
		cfu?: string|null;
		priz_xpf?: number|null;
		uete_mpl?: string|null;
		c_toler?: JsonDecimal|null;
		priz_vuj?: number|null;
		priz_iissp?: number|null;
		priz_rsp_vcl?: number|null;
		typ_kom_iissp?: number|null;
		priz_kons?: number|null;
		disp_lim_proc?: JsonDecimal|null;
		ixs_roz?: string|null;
		ixs_roz_vlzr?: string|null;
		rezim_dph?: number|null;
		/**Druh ÚJ*/
		id_druh?: number|null;
		/**Poddruh ÚJ*/
		id_poddruh?: number|null;
		priz_check_uete?: number|null;
	}
	const enum GEkodicoDtoNames { rok = "rok", ico = "ico", ixs_sax = "ixs_sax", nks_vl = "nks_vl", priz_npv = "priz_npv", cfu = "cfu", priz_xpf = "priz_xpf", uete_mpl = "uete_mpl", c_toler = "c_toler", priz_vuj = "priz_vuj", priz_iissp = "priz_iissp", priz_rsp_vcl = "priz_rsp_vcl", typ_kom_iissp = "typ_kom_iissp", priz_kons = "priz_kons", disp_lim_proc = "disp_lim_proc", ixs_roz = "ixs_roz", ixs_roz_vlzr = "ixs_roz_vlzr", rezim_dph = "rezim_dph", id_druh = "id_druh", id_poddruh = "id_poddruh", priz_check_uete = "priz_check_uete",}
	const enum GEkodicoDtoFragments { rok = "*", ico = "*", ixs_sax = "*", nks_vl = "*", priz_npv = "*", cfu = "*", priz_xpf = "*", uete_mpl = "*", c_toler = "*", priz_vuj = "*", priz_iissp = "*", priz_rsp_vcl = "*", typ_kom_iissp = "*", priz_kons = "*", disp_lim_proc = "*", ixs_roz = "*", ixs_roz_vlzr = "*", rezim_dph = "*", id_druh = "*", id_poddruh = "*", priz_check_uete = "*",}
	const enum GEkodicoDtoTypes { rok = "number", ico = "string", ixs_sax = "string", nks_vl = "string", priz_npv = "number", cfu = "string", priz_xpf = "number", uete_mpl = "string", c_toler = "JsonDecimal", priz_vuj = "number", priz_iissp = "number", priz_rsp_vcl = "number", typ_kom_iissp = "number", priz_kons = "number", disp_lim_proc = "JsonDecimal", ixs_roz = "string", ixs_roz_vlzr = "string", rezim_dph = "number", id_druh = "number", id_poddruh = "number", priz_check_uete = "number",}
	const enum GEkodicoDtoTypeLengths { ico = 10, ixs_sax = 12, nks_vl = 12, cfu = 1, uete_mpl = 30, ixs_roz = 12, ixs_roz_vlzr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Eko\GEkodsesDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekodses
	*      Definice obsahu seskupení
	*/
	interface GEkodsesDto {
		ixs_ose?: string|null;
		element_ose?: string|null;
		rokmes_od?: string|null;
		rokmes_do?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
	}
	const enum GEkodsesDtoNames { ixs_ose = "ixs_ose", element_ose = "element_ose", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", k_v = "k_v",}
	const enum GEkodsesDtoFragments { ixs_ose = "*", element_ose = "*", rokmes_od = "*", rokmes_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", k_v = "*",}
	const enum GEkodsesDtoTypes { ixs_ose = "string", element_ose = "string", rokmes_od = "string", rokmes_do = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", k_v = "number",}
	const enum GEkodsesDtoTypeLengths { ixs_ose = 12, element_ose = 20, rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
	interface GEkodsesExtDto extends Gordic.Adm.Interface.GEkodsesDto {
		/**Typ ose*/
		typ_ose?: number|null;
		/**Typ_ose_k_v*/
		typ_ose_k_v?: string|null;
	}
	const enum GEkodsesExtDtoNames { typ_ose = "typ_ose", typ_ose_k_v = "typ_ose_k_v", ixs_ose = "ixs_ose", element_ose = "element_ose", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", k_v = "k_v",}
	const enum GEkodsesExtDtoFragments { typ_ose = "*", typ_ose_k_v = "*", ixs_ose = "*", element_ose = "*", rokmes_od = "*", rokmes_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", k_v = "*",}
	const enum GEkodsesExtDtoTypes { typ_ose = "number", typ_ose_k_v = "string", ixs_ose = "string", element_ose = "string", rokmes_od = "string", rokmes_do = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", k_v = "number",}
	const enum GEkodsesExtDtoTypeLengths { ixs_ose = 12, element_ose = 20, rokmes_od = 6, rokmes_do = 6, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Eko\GEkosktoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:Ekoskto
	*      Kategorie seskupení
	*/
	interface GEkosktoDto {
		ixs_kto?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		max_typ_ose?: number|null;
		rokmes_od?: string|null;
		rokmes_do?: string|null;
	}
	const enum GEkosktoDtoNames { ixs_kto = "ixs_kto", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", max_typ_ose = "max_typ_ose", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do",}
	const enum GEkosktoDtoFragments { ixs_kto = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", max_typ_ose = "*", rokmes_od = "*", rokmes_do = "*",}
	const enum GEkosktoDtoTypes { ixs_kto = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", max_typ_ose = "number", rokmes_od = "string", rokmes_do = "string",}
	const enum GEkosktoDtoTypeLengths { ixs_kto = 12, nazev = 50, zkratka = 16, poznamka = 50, zmenu_prov = 12, rokmes_od = 6, rokmes_do = 6,}
	interface GEkosktoExtDto extends Gordic.Adm.Interface.GEkosktoDto {
		/**Max typ ose txt*/
		max_typ_ose_txt?: string|null;
	}
	const enum GEkosktoExtDtoNames { max_typ_ose_txt = "max_typ_ose_txt", ixs_kto = "ixs_kto", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", max_typ_ose = "max_typ_ose", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do",}
	const enum GEkosktoExtDtoFragments { max_typ_ose_txt = "*", ixs_kto = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", max_typ_ose = "*", rokmes_od = "*", rokmes_do = "*",}
	const enum GEkosktoExtDtoTypes { max_typ_ose_txt = "string", ixs_kto = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", max_typ_ose = "number", rokmes_od = "string", rokmes_do = "string",}
	const enum GEkosktoExtDtoTypeLengths { ixs_kto = 12, nazev = 50, zkratka = 16, poznamka = 50, zmenu_prov = 12, rokmes_od = 6, rokmes_do = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Eko\GEkovuvlDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ekovuvl
	*      Bankovní účty na knihu
	*/
	interface GEkovuvlDto {
		/**Identifikátor knihy
		*      Identifkátor agendové knihy z xxxSDEN
		*/
		ixp_den?: string|null;
		/**Rok
		*      Účetní období
		*/
		rok?: number|null;
		/**Bankovní účet vlastní
		*      Bankovní účet vlastní - číslo účtu zpracující organizace
		*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu vlastního
		*      Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet
		*/
		sk_vl?: string|null;
		/**Aktivita
		*      Aktivita záznamu
		*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GEkovuvlDtoNames { ixp_den = "ixp_den", rok = "rok", bu_vl = "bu_vl", sk_vl = "sk_vl", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkovuvlDtoFragments { ixp_den = "*", rok = "*", bu_vl = "*", sk_vl = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkovuvlDtoTypes { ixp_den = "string", rok = "number", bu_vl = "string", sk_vl = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkovuvlDtoTypeLengths { ixp_den = 12, bu_vl = 34, sk_vl = 11, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ele\GWflsdisDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsdis
	*      Disk elektronického úložiště
	*/
	interface GWflsdisDto {
		/**Jméno serveru elektronického úložiště*/
		server_name?: string|null;
		/**Jméno disku elektronického úložiště
		*      Jméno disku elektronického úložiště.Slouží jako technický identifikátor, který se již nikdy dodatečně nesmí změnit.
		*/
		disk_name?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Typ média
		*      Asi nepoužito
		*/
		typ_media?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Výchozí velikost disku
		*      Výchozí velikost vyhrazená na fyzickém disku pro systém GINIS
		*/
		vel_max?: JsonDecimal|null;
		/**Velikost volná
		*      Zbývající velikost do zaplnění disku. V průběhu ukládání se aplikační logikou postupně zmenšuje. Pokud místo dojde, nastaví se automaticky priorita na nulu
		*/
		vel_free?: JsonDecimal|null;
		/**Velikost minimální
		*      Minimální velikost při které se disk uzavře
		*/
		vel_min?: JsonDecimal|null;
		/**Maximální počet souborů
		*      Maximální počet suborů, při kterých se automaticky uzavírá generovaný podadresář. Některé operační systémy mají s větším počtem souborů v adresáři problémy. Doporučená hodnota je okolo 1000
		*/
		files_max?: number|null;
		/**Maximální velikost adresáře
		*      Maximální velikost adresáře, kři které dojde k jeho automatickému uzavření a vytvoří se nový adresář
		*/
		dir_vel_max?: JsonDecimal|null;
		/**Minimální volné místo v adresáři
		*      Minimální velikost adresáře, při které dojde k jeho autmatickém u uzavření a automaticky se otevře adresář nový.
		*/
		dir_vel_min?: JsonDecimal|null;
		/**Pouze pro čtení
		*      Příznak, že disk je určen pouze pro čtení
		*/
		priz_ro?: number|null;
		/**Priorita disku
		*      Při ukládání se preferují  otevřené disky s vyšší prioritou. Disk s prioritou 0 je určen pouze pro čtení
		*/
		priorita?: number|null;
		/**Otevřená transakce
		*      Pomocný interní sloupec pomáhá aplikační logice pracovat s dlouhotrvající transakcí (akce vykonávaná nad externím elektronickým úložištěm)
		*/
		s_trans?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Fyzické jméno disku pro tenké aplikace*/
		disk_name_wo?: string|null;
		/**Způsob uložení
		*      Příznak, zda se ukládaný soubor ZIPuje
		*/
		typ_zip?: number|null;
		/**Fyzické jméno disku
		*      Fyzické označení disku, které je aplikační logikou použito pro fyzické přístup. Tato položka se může v průběhu času měnit, tak jak se mění fyzická infrastruktura použitá pro provoz elektronického úložiště souboru GINIS
		*/
		disk_name_fyz?: string|null;
		/**Skupina úložišť
		*      Přiřazení disku ke skupině úložišť. Ta jsou v ADM definována a navazována na různé typy ukládaných dat.
		*/
		ixs_ulz?: string|null;
		/**Typ DB stroje
		*      Ochranný údaj, který je použit při kontrole, zda je úložiště přiřazeno k aktuálně běžící instanci databáze.
		*/
		typ_db?: string|null;
		/**Jméno databáze
		*      Ochranný údaj, který je použit při kontrole, zda je úložiště přiřazeno k aktuálně běžící instanci databáze.
		*/
		db_name?: string|null;
		/**Jméno DB serveru
		*      Ochranný údaj, který je použit při kontrole, zda je úložiště přiřazeno k aktuálně běžící instanci databáze.
		*/
		servername32?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Č.posledně vytvořeného adresáře
		*      Č.posledně vytvořeného adresáře
		*/
		path_name_max_int?: number|null;
		/**Poslední založený adresář
		*      Pouze pro orientaci obsluhy. Toto je název posledně generovaného adresáře.
		*/
		path_name_max?: string|null;
	}
	const enum GWflsdisDtoNames { server_name = "server_name", disk_name = "disk_name", poznamka = "poznamka", typ_media = "typ_media", aktivita = "aktivita", vel_max = "vel_max", vel_free = "vel_free", vel_min = "vel_min", files_max = "files_max", dir_vel_max = "dir_vel_max", dir_vel_min = "dir_vel_min", priz_ro = "priz_ro", priorita = "priorita", s_trans = "s_trans", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", disk_name_wo = "disk_name_wo", typ_zip = "typ_zip", disk_name_fyz = "disk_name_fyz", ixs_ulz = "ixs_ulz", typ_db = "typ_db", db_name = "db_name", servername32 = "servername32", ixs_lpc = "ixs_lpc", dat_od = "dat_od", dat_do = "dat_do", path_name_max_int = "path_name_max_int", path_name_max = "path_name_max",}
	const enum GWflsdisDtoFragments { server_name = "*", disk_name = "*", poznamka = "*", typ_media = "*", aktivita = "*", vel_max = "*", vel_free = "*", vel_min = "*", files_max = "*", dir_vel_max = "*", dir_vel_min = "*", priz_ro = "*", priorita = "*", s_trans = "*", dat_zmena = "*", zmenu_prov = "*", disk_name_wo = "*", typ_zip = "*", disk_name_fyz = "*", ixs_ulz = "*", typ_db = "*", db_name = "*", servername32 = "*", ixs_lpc = "*", dat_od = "*", dat_do = "*", path_name_max_int = "*", path_name_max = "*",}
	const enum GWflsdisDtoTypes { server_name = "string", disk_name = "string", poznamka = "string", typ_media = "number", aktivita = "number", vel_max = "JsonDecimal", vel_free = "JsonDecimal", vel_min = "JsonDecimal", files_max = "number", dir_vel_max = "JsonDecimal", dir_vel_min = "JsonDecimal", priz_ro = "number", priorita = "number", s_trans = "number", dat_zmena = "JsonDate", zmenu_prov = "string", disk_name_wo = "string", typ_zip = "number", disk_name_fyz = "string", ixs_ulz = "string", typ_db = "string", db_name = "string", servername32 = "string", ixs_lpc = "string", dat_od = "JsonDate", dat_do = "JsonDate", path_name_max_int = "number", path_name_max = "string",}
	const enum GWflsdisDtoTypeLengths { server_name = 30, disk_name = 30, poznamka = 50, zmenu_prov = 12, disk_name_wo = 254, disk_name_fyz = 254, ixs_ulz = 12, typ_db = 3, db_name = 100, servername32 = 100, ixs_lpc = 12, path_name_max = 190,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ele\GWflsdizDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsdiz
	*      Zrcadlo disku
	*/
	interface GWflsdizDto {
		/**DBCOLUMN:wflsdiz.server_name
		*      Jméno serveru elektronického úložiště
		*/
		server_name?: string|null;
		/**DBCOLUMN:wflsdiz.disk_name
		*      Jméno disku elektronického úložiště
		*/
		disk_name?: string|null;
		/**DBCOLUMN:wflsdiz.poznamka
		*      Poznámka
		*/
		poznamka?: string|null;
		/**DBCOLUMN:wflsdiz.aktivita
		*      Aktivita
		*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsdiz.dat_zmena
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsdiz.zmenu_prov
		*      Změnil
		*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflsdiz.disk_name_wo
		*      Fyzické jméno disku pro tenké aplikace
		*/
		disk_name_wo?: string|null;
		/**DBCOLUMN:wflsdiz.typ_zip
		*      Způsob uložení
		*/
		typ_zip?: number|null;
		/**DBCOLUMN:wflsdiz.disk_name_fyz
		*      Fyzické jméno disku
		*/
		disk_name_fyz?: string|null;
		/**DBCOLUMN:wflsdiz.typ_db
		*      Typ DB stroje
		*/
		typ_db?: string|null;
		/**DBCOLUMN:wflsdiz.db_name
		*      Jméno databáze
		*/
		db_name?: string|null;
		/**DBCOLUMN:wflsdiz.servername32
		*      Jméno DB serveru
		*/
		servername32?: string|null;
		/**DBCOLUMN:wflsdiz.ixs_lpc
		*      ID přihlášení
		*/
		ixs_lpc?: string|null;
	}
	const enum GWflsdizDtoNames { server_name = "server_name", disk_name = "disk_name", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", disk_name_wo = "disk_name_wo", typ_zip = "typ_zip", disk_name_fyz = "disk_name_fyz", typ_db = "typ_db", db_name = "db_name", servername32 = "servername32", ixs_lpc = "ixs_lpc",}
	const enum GWflsdizDtoFragments { server_name = "*", disk_name = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", disk_name_wo = "*", typ_zip = "*", disk_name_fyz = "*", typ_db = "*", db_name = "*", servername32 = "*", ixs_lpc = "*",}
	const enum GWflsdizDtoTypes { server_name = "string", disk_name = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", disk_name_wo = "string", typ_zip = "number", disk_name_fyz = "string", typ_db = "string", db_name = "string", servername32 = "string", ixs_lpc = "string",}
	const enum GWflsdizDtoTypeLengths { server_name = 30, disk_name = 30, poznamka = 50, zmenu_prov = 12, disk_name_wo = 254, disk_name_fyz = 254, typ_db = 3, db_name = 100, servername32 = 100, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ele\GWflsserDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsser
	*      Server elektronického úložiště
	*/
	interface GWflsserDto {
		/**DBCOLUMN:wflsser.server_name
		*      Jméno serveru elektronického úložiště
		*/
		server_name?: string|null;
		/**DBCOLUMN:wflsser.nazev
		*      Název serveru
		*/
		nazev?: string|null;
		/**DBCOLUMN:wflsser.poznamka
		*      Poznámka
		*/
		poznamka?: string|null;
		/**DBCOLUMN:wflsser.typ_srv
		*      Typ úložiště
		*/
		typ_srv?: number|null;
		/**DBCOLUMN:wflsser.ldb
		*      Login k serveru
		*/
		ldb?: string|null;
		/**DBCOLUMN:wflsser.pdb
		*      Heslo
		*/
		pdb?: string|null;
		/**DBCOLUMN:wflsser.priorita
		*      Priorita serveru
		*/
		priorita?: number|null;
		/**DBCOLUMN:wflsser.aktivita
		*      Aktivita
		*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsser.dat_zmena
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsser.zmenu_prov
		*      Změnil
		*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflsser.typ_eps
		*      Typ WWW
		*/
		typ_eps?: number|null;
		/**DBCOLUMN:wflsser.server_name_fyz
		*      Fyzické jméno serveru elektronického úložiště
		*/
		server_name_fyz?: string|null;
		/**DBCOLUMN:wflsser.srv_cert*/
		srv_cert?: JsonBlob|null;
		/**DBCOLUMN:wflsser.ixs_lpc
		*      ID přihlášení
		*/
		ixs_lpc?: string|null;
	}
	const enum GWflsserDtoNames { server_name = "server_name", nazev = "nazev", poznamka = "poznamka", typ_srv = "typ_srv", ldb = "ldb", pdb = "pdb", priorita = "priorita", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_eps = "typ_eps", server_name_fyz = "server_name_fyz", srv_cert = "srv_cert", ixs_lpc = "ixs_lpc",}
	const enum GWflsserDtoFragments { server_name = "*", nazev = "*", poznamka = "*", typ_srv = "*", ldb = "*", pdb = "*", priorita = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_eps = "*", server_name_fyz = "*", srv_cert = "*", ixs_lpc = "*",}
	const enum GWflsserDtoTypes { server_name = "string", nazev = "string", poznamka = "string", typ_srv = "number", ldb = "string", pdb = "string", priorita = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_eps = "number", server_name_fyz = "string", srv_cert = "JsonBlob", ixs_lpc = "string",}
	const enum GWflsserDtoTypeLengths { server_name = 30, nazev = 50, poznamka = 50, ldb = 254, pdb = 254, zmenu_prov = 12, server_name_fyz = 254, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ele\GWflssezDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflssez
	*      Zrcadlo serveru
	*/
	interface GWflssezDto {
		/**DBCOLUMN:wflssez.server_name
		*      Jméno serveru elektronického úložiště
		*/
		server_name?: string|null;
		/**DBCOLUMN:wflssez.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflssez.poznamka
		*      Poznámka
		*/
		poznamka?: string|null;
		/**DBCOLUMN:wflssez.typ_srv
		*      Typ úložiště
		*/
		typ_srv?: number|null;
		/**DBCOLUMN:wflssez.ldb
		*      Login k serveru
		*/
		ldb?: string|null;
		/**DBCOLUMN:wflssez.pdb
		*      Heslo
		*/
		pdb?: string|null;
		/**DBCOLUMN:wflssez.aktivita
		*      Aktivita
		*/
		aktivita?: number|null;
		/**DBCOLUMN:wflssez.dat_zmena
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflssez.zmenu_prov
		*      Změnil
		*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflssez.server_name_fyz
		*      Fyzické jméno serveru elektronického úložiště
		*/
		server_name_fyz?: string|null;
		/**DBCOLUMN:wflssez.srv_cert*/
		srv_cert?: JsonBlob|null;
		/**DBCOLUMN:wflssez.ixs_lpc
		*      ID přihlášení
		*/
		ixs_lpc?: string|null;
	}
	const enum GWflssezDtoNames { server_name = "server_name", nazev = "nazev", poznamka = "poznamka", typ_srv = "typ_srv", ldb = "ldb", pdb = "pdb", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", server_name_fyz = "server_name_fyz", srv_cert = "srv_cert", ixs_lpc = "ixs_lpc",}
	const enum GWflssezDtoFragments { server_name = "*", nazev = "*", poznamka = "*", typ_srv = "*", ldb = "*", pdb = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", server_name_fyz = "*", srv_cert = "*", ixs_lpc = "*",}
	const enum GWflssezDtoTypes { server_name = "string", nazev = "string", poznamka = "string", typ_srv = "number", ldb = "string", pdb = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", server_name_fyz = "string", srv_cert = "JsonBlob", ixs_lpc = "string",}
	const enum GWflssezDtoTypeLengths { server_name = 30, nazev = 50, poznamka = 50, ldb = 254, pdb = 254, zmenu_prov = 12, server_name_fyz = 254, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ele\GWflsulzDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsulz
	*      Skupina úložišť
	*/
	interface GWflsulzDto {
		/**DBCOLUMN:wflsulz.ixs_ulz
		*      Skupina úložišť
		*/
		ixs_ulz?: string|null;
		/**DBCOLUMN:wflsulz.nazev
		*      Název skupiny
		*/
		nazev?: string|null;
		/**DBCOLUMN:wflsulz.poznamka
		*      Poznámka
		*/
		poznamka?: string|null;
		/**DBCOLUMN:wflsulz.aktivita
		*      Aktivita
		*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsulz.dat_zmena
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsulz.zmenu_prov
		*      Změnil
		*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflsulz.priz_pub
		*      Publikační
		*/
		priz_pub?: number|null;
		/**DBCOLUMN:wflsulz.priz_ud
		*      Úřední deska
		*/
		priz_ud?: number|null;
		/**DBCOLUMN:wflsulz.priz_vycet
		*      Určeno pro výčet středisek
		*/
		priz_vycet?: number|null;
	}
	const enum GWflsulzDtoNames { ixs_ulz = "ixs_ulz", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_pub = "priz_pub", priz_ud = "priz_ud", priz_vycet = "priz_vycet",}
	const enum GWflsulzDtoFragments { ixs_ulz = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_pub = "*", priz_ud = "*", priz_vycet = "*",}
	const enum GWflsulzDtoTypes { ixs_ulz = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_pub = "number", priz_ud = "number", priz_vycet = "number",}
	const enum GWflsulzDtoTypeLengths { ixs_ulz = 12, nazev = 50, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Epk\GWfldssaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wfldssa
	*      Úkon schvalovací šablony
	*/
	interface GWfldssaDto {
		/**Schvalovací šablona*/
		ixs_ssa?: string|null;
		/**ID Úkonu
		*      Pořadové číslo úkonu v šabloně
		*/
		radek_sab?: number|null;
		/**Schvalovací role EPK
		*      Schvalovací role
		*/
		ixs_sro?: string|null;
		/**Příznak opakovatelnosti role*/
		priz_opak_role?: number|null;
		/**Schvalovací povinnost
		*      Schvalovací povinnost úkonu pro vyřízení schvalovacího procesu jako celku (WFLCSPU)
		*/
		sch_pov?: number|null;
		/**Schvalovací úroveň úkonu*/
		sch_uroven?: number|null;
		/**Typ požadovaného úkonu.*/
		typ_pozad_pod?: number|null;
		/**Text upřesnění k požadovanému úkonu*/
		typ_pozad_pod_pozn?: string|null;
		/**Maximální počet dnů na vyřízení úkonu*/
		dnu_pozad?: number|null;
		/**Systémový schvalovací úkon*/
		ktg_typ?: number|null;
		/**Systémový schvalovací úkon - řádek*/
		radek_ktg?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		hodin_poz_abs?: number|null;
		priz_den_poz_prac?: number|null;
		priz_edit_termin?: number|null;
		/**Příznak opakovatelnosti*/
		priz_opak?: number|null;
		/**Varianta pro kategorii*/
		var_proc?: number|null;
		/**Algoritmus*/
		id_alg?: string|null;
		/**Příznak opakovatelnosti úoknu v procesu pro stejnou osobu
		*      1-jedna osoba může být v procesu pouze 1x bez ohledu na typ požadavku, 0 osoba může být víckrát, ale pokaždé musí mít jiný typ požadavku
		*/
		priz_opa?: number|null;
		/**Šablona elektronických podpisů*/
		ixs_dpo?: string|null;
		/**Stupeň schválení*/
		stav_schvproc?: number|null;
		/**Šablona pro povoleno
		*      ID šablony, která se má vykonat v případě, že úkon je vyřízen způsobem Povoleno.
		*/
		ixs_ssa_1?: string|null;
		/**Šablona pro vráceno
		*      ID šablony, která se má vykonat v případě, že úkon je vyřízen způsobem Vráceno.
		*/
		ixs_ssa_2?: string|null;
		/**Fikce schválení*/
		priz_fikce_vyrizen?: number|null;
		akce_epk?: number|null;
		priz_konv?: number|null;
		typ_pril?: string|null;
	}
	const enum GWfldssaDtoNames { ixs_ssa = "ixs_ssa", radek_sab = "radek_sab", ixs_sro = "ixs_sro", priz_opak_role = "priz_opak_role", sch_pov = "sch_pov", sch_uroven = "sch_uroven", typ_pozad_pod = "typ_pozad_pod", typ_pozad_pod_pozn = "typ_pozad_pod_pozn", dnu_pozad = "dnu_pozad", ktg_typ = "ktg_typ", radek_ktg = "radek_ktg", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", hodin_poz_abs = "hodin_poz_abs", priz_den_poz_prac = "priz_den_poz_prac", priz_edit_termin = "priz_edit_termin", priz_opak = "priz_opak", var_proc = "var_proc", id_alg = "id_alg", priz_opa = "priz_opa", ixs_dpo = "ixs_dpo", stav_schvproc = "stav_schvproc", ixs_ssa_1 = "ixs_ssa_1", ixs_ssa_2 = "ixs_ssa_2", priz_fikce_vyrizen = "priz_fikce_vyrizen", akce_epk = "akce_epk", priz_konv = "priz_konv", typ_pril = "typ_pril",}
	const enum GWfldssaDtoFragments { ixs_ssa = "*", radek_sab = "*", ixs_sro = "*", priz_opak_role = "*", sch_pov = "*", sch_uroven = "*", typ_pozad_pod = "*", typ_pozad_pod_pozn = "*", dnu_pozad = "*", ktg_typ = "*", radek_ktg = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", hodin_poz_abs = "*", priz_den_poz_prac = "*", priz_edit_termin = "*", priz_opak = "*", var_proc = "*", id_alg = "*", priz_opa = "*", ixs_dpo = "*", stav_schvproc = "*", ixs_ssa_1 = "*", ixs_ssa_2 = "*", priz_fikce_vyrizen = "*", akce_epk = "*", priz_konv = "*", typ_pril = "*",}
	const enum GWfldssaDtoTypes { ixs_ssa = "string", radek_sab = "number", ixs_sro = "string", priz_opak_role = "number", sch_pov = "number", sch_uroven = "number", typ_pozad_pod = "number", typ_pozad_pod_pozn = "string", dnu_pozad = "number", ktg_typ = "number", radek_ktg = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", hodin_poz_abs = "number", priz_den_poz_prac = "number", priz_edit_termin = "number", priz_opak = "number", var_proc = "number", id_alg = "string", priz_opa = "number", ixs_dpo = "string", stav_schvproc = "number", ixs_ssa_1 = "string", ixs_ssa_2 = "string", priz_fikce_vyrizen = "number", akce_epk = "number", priz_konv = "number", typ_pril = "string",}
	const enum GWfldssaDtoTypeLengths { ixs_ssa = 12, ixs_sro = 12, typ_pozad_pod_pozn = 254, zmenu_prov = 12, id_alg = 15, ixs_dpo = 12, ixs_ssa_1 = 12, ixs_ssa_2 = 12, typ_pril = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Epk\GWflssroDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflssro*/
	interface GWflssroDto {
		/**DBCOLUMN:wflssro.ixs_sro*/
		ixs_sro?: string|null;
		/**DBCOLUMN:wflssro.ico*/
		ico?: string|null;
		/**DBCOLUMN:wflssro.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:wflssro.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflssro.ktg_sch_role*/
		ktg_sch_role?: number|null;
		/**DBCOLUMN:wflssro.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflssro.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflssro.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GWflssroDtoNames { ixs_sro = "ixs_sro", ico = "ico", zkratka = "zkratka", nazev = "nazev", ktg_sch_role = "ktg_sch_role", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflssroDtoFragments { ixs_sro = "*", ico = "*", zkratka = "*", nazev = "*", ktg_sch_role = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflssroDtoTypes { ixs_sro = "string", ico = "string", zkratka = "string", nazev = "string", ktg_sch_role = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflssroDtoTypeLengths { ixs_sro = 12, ico = 10, zkratka = 25, nazev = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Epk\GWflsssaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsssa*/
	interface GWflsssaDto {
		/**DBCOLUMN:wflsssa.ixs_ssa*/
		ixs_ssa?: string|null;
		/**DBCOLUMN:wflsssa.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflsssa.ico*/
		ico?: string|null;
		/**DBCOLUMN:wflsssa.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:wflsssa.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:wflsssa.sch_wfl_typ*/
		sch_wfl_typ?: number|null;
		/**DBCOLUMN:wflsssa.rezim_sch*/
		rezim_sch?: number|null;
		/**DBCOLUMN:wflsssa.dnu_celk*/
		dnu_celk?: number|null;
		/**DBCOLUMN:wflsssa.id_def_wwf*/
		id_def_wwf?: string|null;
		/**DBCOLUMN:wflsssa.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsssa.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsssa.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflsssa.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:wflsssa.var_proc*/
		var_proc?: number|null;
		/**DBCOLUMN:wflsssa.id_alg*/
		id_alg?: string|null;
		/**DBCOLUMN:wflsssa.poc_akt_vazeb*/
		poc_akt_vazeb?: number|null;
		/**DBCOLUMN:wflsssa.stav_schvproc*/
		stav_schvproc?: number|null;
		/**DBCOLUMN:wflsssa.krg_rsp*/
		krg_rsp?: number|null;
		/**DBCOLUMN:wflsssa.podminka*/
		podminka?: string|null;
		/**DBCOLUMN:wflsssa.podminka_txt*/
		podminka_txt?: string|null;
	}
	const enum GWflsssaDtoNames { ixs_ssa = "ixs_ssa", nazev = "nazev", ico = "ico", dat_od = "dat_od", dat_do = "dat_do", sch_wfl_typ = "sch_wfl_typ", rezim_sch = "rezim_sch", dnu_celk = "dnu_celk", id_def_wwf = "id_def_wwf", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_typ = "ktg_typ", var_proc = "var_proc", id_alg = "id_alg", poc_akt_vazeb = "poc_akt_vazeb", stav_schvproc = "stav_schvproc", krg_rsp = "krg_rsp", podminka = "podminka", podminka_txt = "podminka_txt",}
	const enum GWflsssaDtoFragments { ixs_ssa = "*", nazev = "*", ico = "*", dat_od = "*", dat_do = "*", sch_wfl_typ = "*", rezim_sch = "*", dnu_celk = "*", id_def_wwf = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ktg_typ = "*", var_proc = "*", id_alg = "*", poc_akt_vazeb = "*", stav_schvproc = "*", krg_rsp = "*", podminka = "*", podminka_txt = "*",}
	const enum GWflsssaDtoTypes { ixs_ssa = "string", nazev = "string", ico = "string", dat_od = "JsonDate", dat_do = "JsonDate", sch_wfl_typ = "number", rezim_sch = "number", dnu_celk = "number", id_def_wwf = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ktg_typ = "number", var_proc = "number", id_alg = "string", poc_akt_vazeb = "number", stav_schvproc = "number", krg_rsp = "number", podminka = "string", podminka_txt = "string",}
	const enum GWflsssaDtoTypeLengths { ixs_ssa = 12, nazev = 50, ico = 10, id_def_wwf = 254, zmenu_prov = 12, id_alg = 15, podminka = 254, podminka_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Epk\GWflsstpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsstp
	*      Stupeň schválení EPK
	*/
	interface GWflsstpDto {
		/**DBCOLUMN:wflsstp.stav_schvproc*/
		stav_schvproc?: number|null;
		/**DBCOLUMN:wflsstp.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:wflsstp.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflsstp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsstp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsstp.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GWflsstpDtoNames { stav_schvproc = "stav_schvproc", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflsstpDtoFragments { stav_schvproc = "*", zkratka = "*", nazev = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflsstpDtoTypes { stav_schvproc = "number", zkratka = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflsstpDtoTypeLengths { zkratka = 16, nazev = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Epk\GWflvsfuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvsfu*/
	interface GWflvsfuDto {
		/**DBCOLUMN:wflvsfu.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:wflvsfu.ixs_sro*/
		ixs_sro?: string|null;
		/**DBCOLUMN:wflvsfu.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:wflvsfu.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:wflvsfu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflvsfu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflvsfu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Priorita vazby funkce na roli - vyšší má přednost*/
		priorita?: number|null;
	}
	const enum GWflvsfuDtoNames { ixs_fun = "ixs_fun", ixs_sro = "ixs_sro", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priorita = "priorita",}
	const enum GWflvsfuDtoFragments { ixs_fun = "*", ixs_sro = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priorita = "*",}
	const enum GWflvsfuDtoTypes { ixs_fun = "string", ixs_sro = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priorita = "number",}
	const enum GWflvsfuDtoTypeLengths { ixs_fun = 12, ixs_sro = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Epk\GWflvsrfDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**GWflvsrfDto*/
	interface GWflvsrfDto {
		/**DBCOLUMN:wflvsrf.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:wflvsrf.ixs_ssa*/
		ixs_ssa?: string|null;
		/**DBCOLUMN:wflvsrf.ixs_sro*/
		ixs_sro?: string|null;
		/**DBCOLUMN:wflvsrf.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:wflvsrf.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:wflvsrf.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflvsrf.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflvsrf.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GWflvsrfDtoNames { ixs_fun = "ixs_fun", ixs_ssa = "ixs_ssa", ixs_sro = "ixs_sro", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvsrfDtoFragments { ixs_fun = "*", ixs_ssa = "*", ixs_sro = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvsrfDtoTypes { ixs_fun = "string", ixs_ssa = "string", ixs_sro = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvsrfDtoTypeLengths { ixs_fun = 12, ixs_ssa = 12, ixs_sro = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Epk\GWflvssaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvssa*/
	interface GWflvssaDto {
		/**DBCOLUMN:wflvssa.ixs_ssa*/
		ixs_ssa?: string|null;
		/**DBCOLUMN:wflvssa.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:wflvssa.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:wflvssa.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:wflvssa.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflvssa.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflvssa.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GWflvssaDtoNames { ixs_ssa = "ixs_ssa", ixs_typ = "ixs_typ", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvssaDtoFragments { ixs_ssa = "*", ixs_typ = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvssaDtoTypes { ixs_ssa = "string", ixs_typ = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvssaDtoTypeLengths { ixs_ssa = 12, ixs_typ = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincaivDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincaiv
	*      gincaiv
	*/
	interface GGincaivDto {
		aiv_poskyt?: number|null;
		aiv_poskyt_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GGincaivDtoNames { aiv_poskyt = "aiv_poskyt", aiv_poskyt_txt = "aiv_poskyt_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincaivDtoFragments { aiv_poskyt = "*", aiv_poskyt_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincaivDtoTypes { aiv_poskyt = "number", aiv_poskyt_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincaivDtoTypeLengths { aiv_poskyt_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincaktDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincakt*/
	interface GGincaktDto {
		/**DBCOLUMN:gincakt.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincakt.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:gincakt.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincakt.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincakt.k_xml*/
		k_xml?: string|null;
		/**DBCOLUMN:gincakt.aktivita_rsx*/
		aktivita_rsx?: number|null;
	}
	const enum GGincaktDtoNames { aktivita = "aktivita", aktivita_txt = "aktivita_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", aktivita_rsx = "aktivita_rsx",}
	const enum GGincaktDtoFragments { aktivita = "*", aktivita_txt = "*", k_v = "*", k_s = "*", k_xml = "*", aktivita_rsx = "*",}
	const enum GGincaktDtoTypes { aktivita = "number", aktivita_txt = "string", k_v = "number", k_s = "string", k_xml = "string", aktivita_rsx = "number",}
	const enum GGincaktDtoTypeLengths { aktivita_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinccfgDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginccfg*/
	interface GGinccfgDto {
		/**DBCOLUMN:ginccfg.uroven_cfg*/
		uroven_cfg?: number|null;
		/**DBCOLUMN:ginccfg.uroven_cfg_txt*/
		uroven_cfg_txt?: string|null;
		/**DBCOLUMN:ginccfg.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginccfg.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ginccfg.typ_cfg*/
		typ_cfg?: number|null;
		/**DBCOLUMN:ginccfg.ixs_cis*/
		ixs_cis?: string|null;
		/**DBCOLUMN:ginccfg.aktivita_usr*/
		aktivita_usr?: number|null;
	}
	const enum GGinccfgDtoNames { uroven_cfg = "uroven_cfg", uroven_cfg_txt = "uroven_cfg_txt", k_v = "k_v", k_s = "k_s", typ_cfg = "typ_cfg", ixs_cis = "ixs_cis", aktivita_usr = "aktivita_usr",}
	const enum GGinccfgDtoFragments { uroven_cfg = "*", uroven_cfg_txt = "*", k_v = "*", k_s = "*", typ_cfg = "*", ixs_cis = "*", aktivita_usr = "*",}
	const enum GGinccfgDtoTypes { uroven_cfg = "number", uroven_cfg_txt = "string", k_v = "number", k_s = "string", typ_cfg = "number", ixs_cis = "string", aktivita_usr = "number",}
	const enum GGinccfgDtoTypeLengths { uroven_cfg_txt = 50, k_s = 15, ixs_cis = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinccstDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginccst
	*      ginccst
	*/
	interface GGinccstDto {
		csas_type?: number|null;
		csas_type_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GGinccstDtoNames { csas_type = "csas_type", csas_type_txt = "csas_type_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinccstDtoFragments { csas_type = "*", csas_type_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinccstDtoTypes { csas_type = "number", csas_type_txt = "string", k_v = "number", k_s = "string",}
	const enum GGinccstDtoTypeLengths { csas_type_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincdatDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincdat*/
	interface GGincdatDto {
		/**DBCOLUMN:gincdat.dat_typ*/
		dat_typ?: number|null;
		/**DBCOLUMN:gincdat.dat_typ_txt*/
		dat_typ_txt?: string|null;
		/**DBCOLUMN:gincdat.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincdat.k_s*/
		k_s?: string|null;
	}
	const enum GGincdatDtoNames { dat_typ = "dat_typ", dat_typ_txt = "dat_typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincdatDtoFragments { dat_typ = "*", dat_typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincdatDtoTypes { dat_typ = "number", dat_typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincdatDtoTypeLengths { dat_typ_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincdsdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincdsd
	*      Příznak pro šablony koncvence Gordic
	*/
	interface GGincdsdDto {
		/**Příznak entity (dokument/spis)*/
		priz_spis?: number|null;
		priz_spis_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GGincdsdDtoNames { priz_spis = "priz_spis", priz_spis_txt = "priz_spis_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincdsdDtoFragments { priz_spis = "*", priz_spis_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincdsdDtoTypes { priz_spis = "number", priz_spis_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincdsdDtoTypeLengths { priz_spis_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincevnDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincevn
	*      Kategorie událostí
	*/
	interface GGincevnDto {
		/**Kategorie události*/
		ktg_evn?: number|null;
		/**Název kategorie
		*      Lidský název kategorie události TP
		*/
		ktg_evn_txt?: string|null;
		k_v?: number|null;
		k_s?: string|null;
		/**Datum sledování DO
		*      Datum a čas, do kterého byly události sledovány a zapsány. Příští hledání výskytu událostí této kategorie se bude realizovat od tohoto datumu
		*/
		dat_do?: JsonDate|null;
		/**Příznak sledování
		*      Příznak, že se události této kategorie mají sledovat = zaznamenávat do interního TP
		*/
		priz_gen?: number|null;
		/**Exportovat do PDF
		*      Příznak, že se události této kategorie mají exportovat do PDF formy TP
		*/
		priz_prn?: number|null;
		/**Externího log.systému
		*      Příznak, že se události této kategorie mají exportovat do externího logovacího systému ( syslog atd.. )
		*/
		priz_exp?: number|null;
		/**Exportovat do XML
		*      Příznak generování do XML
		*/
		priz_xml?: number|null;
		/**Exportovat do  ESB*/
		priz_evn?: number|null;
		/**Poslední čas exportu do log.systému*/
		dat_do_exp?: JsonDate|null;
		/**Poslední čas exportu do PDF*/
		dat_do_prn?: JsonDate|null;
		/**Poslední čas exportu do XML*/
		dat_do_xml?: JsonDate|null;
		/**Poslední čas exportu do ESB*/
		dat_do_evn?: JsonDate|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Zobrazovat
		*      Příznak, zda se má tato kategorie událostí zobrazovat běžným uživatelům
		*/
		priz_zobr?: number|null;
		dat_do_akt?: JsonDate|null;
	}
	const enum GGincevnDtoNames { ktg_evn = "ktg_evn", ktg_evn_txt = "ktg_evn_txt", k_v = "k_v", k_s = "k_s", dat_do = "dat_do", priz_gen = "priz_gen", priz_prn = "priz_prn", priz_exp = "priz_exp", priz_xml = "priz_xml", priz_evn = "priz_evn", dat_do_exp = "dat_do_exp", dat_do_prn = "dat_do_prn", dat_do_xml = "dat_do_xml", dat_do_evn = "dat_do_evn", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", priz_zobr = "priz_zobr", dat_do_akt = "dat_do_akt",}
	const enum GGincevnDtoFragments { ktg_evn = "*", ktg_evn_txt = "*", k_v = "*", k_s = "*", dat_do = "*", priz_gen = "*", priz_prn = "*", priz_exp = "*", priz_xml = "*", priz_evn = "*", dat_do_exp = "*", dat_do_prn = "*", dat_do_xml = "*", dat_do_evn = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", priz_zobr = "*", dat_do_akt = "*",}
	const enum GGincevnDtoTypes { ktg_evn = "number", ktg_evn_txt = "string", k_v = "number", k_s = "string", dat_do = "JsonDate", priz_gen = "number", priz_prn = "number", priz_exp = "number", priz_xml = "number", priz_evn = "number", dat_do_exp = "JsonDate", dat_do_prn = "JsonDate", dat_do_xml = "JsonDate", dat_do_evn = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", priz_zobr = "number", dat_do_akt = "JsonDate",}
	const enum GGincevnDtoTypeLengths { ktg_evn_txt = 50, k_s = 15, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincfatDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincfat
	*      Typ fáze
	*/
	interface GGincfatDto {
		/**Typ fáze
		*      Typ fáze
		*/
		faze_typ?: number|null;
		/**název*/
		faze_typ_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GGincfatDtoNames { faze_typ = "faze_typ", faze_typ_txt = "faze_typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincfatDtoFragments { faze_typ = "*", faze_typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincfatDtoTypes { faze_typ = "number", faze_typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincfatDtoTypeLengths { faze_typ_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincfazDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincfaz*/
	interface GGincfazDto {
		/**DBCOLUMN:gincfaz.faze*/
		faze?: string|null;
		/**DBCOLUMN:gincfaz.faze_txt*/
		faze_txt?: string|null;
		/**DBCOLUMN:gincfaz.faze_typ*/
		faze_typ?: number|null;
		/**DBCOLUMN:gincfaz.verze*/
		verze?: number|null;
		/**DBCOLUMN:gincfaz.sub_verze*/
		sub_verze?: number|null;
		/**DBCOLUMN:gincfaz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincfaz.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincfaz.akt_faze*/
		akt_faze?: number|null;
		/**DBCOLUMN:gincfaz.vzkaz*/
		vzkaz?: string|null;
		/**DBCOLUMN:gincfaz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gincfaz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gincfaz.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:gincfaz.dat_avi*/
		dat_avi?: JsonDate|null;
		/**DBCOLUMN:gincfaz.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gincfaz.tavi*/
		tavi?: string|null;
		/**DBCOLUMN:gincfaz.tstop*/
		tstop?: string|null;
		/**DBCOLUMN:gincfaz.pocet*/
		pocet?: number|null;
		/**DBCOLUMN:gincfaz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincfaz.uee*/
		uee?: string|null;
		/**DBCOLUMN:gincfaz.uei*/
		uei?: string|null;
		/**DBCOLUMN:gincfaz.submodel*/
		submodel?: string|null;
		/**DBCOLUMN:gincfaz.priz_adm*/
		priz_adm?: number|null;
		/**DBCOLUMN:gincfaz.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:gincfaz.exp_tic*/
		exp_tic?: number|null;
		/**DBCOLUMN:gincfaz.priz_gentag*/
		priz_gentag?: number|null;
		/**DBCOLUMN:gincfaz.rpp_w_x*/
		rpp_w_x?: number|null;
		/**DBCOLUMN:gincfaz.rpp_w_y*/
		rpp_w_y?: number|null;
		/**DBCOLUMN:gincfaz.priz_f*/
		priz_f?: number|null;
		/**DBCOLUMN:gincfaz.faze_adr*/
		faze_adr?: string|null;
		/**DBCOLUMN:gincfaz.faze_exe*/
		faze_exe?: string|null;
		/**DBCOLUMN:gincfaz.priz_uninstall*/
		priz_uninstall?: number|null;
		/**DBCOLUMN:gincfaz.agt*/
		agt?: string|null;
		/**DBCOLUMN:gincfaz.subsyst*/
		subsyst?: string|null;
		/**DBCOLUMN:gincfaz.priz_exu*/
		priz_exu?: number|null;
		/**DBCOLUMN:gincfaz.priz_arch*/
		priz_arch?: number|null;
		/**DBCOLUMN:gincfaz.pocet_lic*/
		pocet_lic?: number|null;
		/**DBCOLUMN:gincfaz.pocet_adm*/
		pocet_adm?: number|null;
		/**DBCOLUMN:gincfaz.pocet_prihl*/
		pocet_prihl?: number|null;
		/**DBCOLUMN:gincfaz.priz_zobr_lic*/
		priz_zobr_lic?: number|null;
		/**DBCOLUMN:gincfaz.priz_bsl*/
		priz_bsl?: number|null;
		/**DBCOLUMN:gincfaz.pocet_lic_srv*/
		pocet_lic_srv?: number|null;
		/**DBCOLUMN:gincfaz.pocet_skut_srv*/
		pocet_skut_srv?: number|null;
		/**DBCOLUMN:gincfaz.pozn_srv*/
		pozn_srv?: string|null;
	}
	const enum GGincfazDtoNames { faze = "faze", faze_txt = "faze_txt", faze_typ = "faze_typ", verze = "verze", sub_verze = "sub_verze", k_v = "k_v", k_s = "k_s", akt_faze = "akt_faze", vzkaz = "vzkaz", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", dat_avi = "dat_avi", dat_do = "dat_do", tavi = "tavi", tstop = "tstop", pocet = "pocet", aktivita = "aktivita", uee = "uee", uei = "uei", submodel = "submodel", priz_adm = "priz_adm", priz_ext = "priz_ext", exp_tic = "exp_tic", priz_gentag = "priz_gentag", rpp_w_x = "rpp_w_x", rpp_w_y = "rpp_w_y", priz_f = "priz_f", faze_adr = "faze_adr", faze_exe = "faze_exe", priz_uninstall = "priz_uninstall", agt = "agt", subsyst = "subsyst", priz_exu = "priz_exu", priz_arch = "priz_arch", pocet_lic = "pocet_lic", pocet_adm = "pocet_adm", pocet_prihl = "pocet_prihl", priz_zobr_lic = "priz_zobr_lic", priz_bsl = "priz_bsl", pocet_lic_srv = "pocet_lic_srv", pocet_skut_srv = "pocet_skut_srv", pozn_srv = "pozn_srv",}
	const enum GGincfazDtoFragments { faze = "*", faze_txt = "*", faze_typ = "*", verze = "*", sub_verze = "*", k_v = "*", k_s = "*", akt_faze = "*", vzkaz = "*", dat_zmena = "*", zmenu_prov = "*", typ_ag = "*", dat_avi = "*", dat_do = "*", tavi = "*", tstop = "*", pocet = "*", aktivita = "*", uee = "*", uei = "*", submodel = "*", priz_adm = "*", priz_ext = "*", exp_tic = "*", priz_gentag = "*", rpp_w_x = "*", rpp_w_y = "*", priz_f = "*", faze_adr = "*", faze_exe = "*", priz_uninstall = "*", agt = "*", subsyst = "*", priz_exu = "*", priz_arch = "*", pocet_lic = "*", pocet_adm = "*", pocet_prihl = "*", priz_zobr_lic = "*", priz_bsl = "*", pocet_lic_srv = "*", pocet_skut_srv = "*", pozn_srv = "*",}
	const enum GGincfazDtoTypes { faze = "string", faze_txt = "string", faze_typ = "number", verze = "number", sub_verze = "number", k_v = "number", k_s = "string", akt_faze = "number", vzkaz = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", dat_avi = "JsonDate", dat_do = "JsonDate", tavi = "string", tstop = "string", pocet = "number", aktivita = "number", uee = "string", uei = "string", submodel = "string", priz_adm = "number", priz_ext = "number", exp_tic = "number", priz_gentag = "number", rpp_w_x = "number", rpp_w_y = "number", priz_f = "number", faze_adr = "string", faze_exe = "string", priz_uninstall = "number", agt = "string", subsyst = "string", priz_exu = "number", priz_arch = "number", pocet_lic = "number", pocet_adm = "number", pocet_prihl = "number", priz_zobr_lic = "number", priz_bsl = "number", pocet_lic_srv = "number", pocet_skut_srv = "number", pozn_srv = "string",}
	const enum GGincfazDtoTypeLengths { faze = 8, faze_txt = 50, k_s = 15, vzkaz = 254, zmenu_prov = 12, tavi = 254, tstop = 254, uee = 12, uei = 4, submodel = 3, faze_adr = 254, faze_exe = 254, agt = 3, subsyst = 4, pozn_srv = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinchopDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginchop*/
	interface GGinchopDto {
		/**DBCOLUMN:ginchop.param*/
		param?: string|null;
		/**DBCOLUMN:ginchop.config*/
		config?: string|null;
		/**DBCOLUMN:ginchop.config_txt*/
		config_txt?: string|null;
		/**DBCOLUMN:ginchop.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ginchop.popis*/
		popis?: string|null;
		/**DBCOLUMN:ginchop.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginchop.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginchop.form_pop*/
		form_pop?: number|null;
		/**DBCOLUMN:ginchop.dat_mpd*/
		dat_mpd?: JsonDate|null;
	}
	const enum GGinchopDtoNames { param = "param", config = "config", config_txt = "config_txt", k_s = "k_s", popis = "popis", aktivita = "aktivita", dat_zmena = "dat_zmena", form_pop = "form_pop", dat_mpd = "dat_mpd",}
	const enum GGinchopDtoFragments { param = "*", config = "*", config_txt = "*", k_s = "*", popis = "*", aktivita = "*", dat_zmena = "*", form_pop = "*", dat_mpd = "*",}
	const enum GGinchopDtoTypes { param = "string", config = "string", config_txt = "string", k_s = "string", popis = "string", aktivita = "number", dat_zmena = "JsonDate", form_pop = "number", dat_mpd = "JsonDate",}
	const enum GGinchopDtoTypeLengths { param = 15, config = 200, config_txt = 200, k_s = 15, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinckatDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginckat
	*      Kategorie dokumentu
	*/
	interface GGinckatDto {
		/**Kategorie typu dokumentu
		*      ID kategorie typu dokumentu
		*/
		ktg_typ?: number|null;
		/**Kategorie typu dokumentu*/
		ktg_typ_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Identifikátor typu agendy*/
		typ_ag?: number|null;
		/**Spisový plán*/
		spis_pl?: string|null;
		/**Spisový znak*/
		spis_znak?: string|null;
		drd?: number|null;
		/**Příznak daňového dokladu*/
		priz_dd?: number|null;
		priz_vaz?: number|null;
		/**Oficiální název*/
		ofic_nazev?: string|null;
		priz_val_esu?: number|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
		/**CS název*/
		cs_nazev?: string|null;
		ktg_isdoc?: number|null;
		priz_rpr?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		priz_aut_vyriz?: number|null;
		zakon_duvod_gdpr?: string|null;
		/**Účel zpracování*/
		ixs_zap?: string|null;
	}
	const enum GGinckatDtoNames { ktg_typ = "ktg_typ", ktg_typ_txt = "ktg_typ_txt", k_v = "k_v", k_s = "k_s", typ_ag = "typ_ag", spis_pl = "spis_pl", spis_znak = "spis_znak", drd = "drd", priz_dd = "priz_dd", priz_vaz = "priz_vaz", ofic_nazev = "ofic_nazev", priz_val_esu = "priz_val_esu", k_xml = "k_xml", cs_nazev = "cs_nazev", ktg_isdoc = "ktg_isdoc", priz_rpr = "priz_rpr", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_aut_vyriz = "priz_aut_vyriz", zakon_duvod_gdpr = "zakon_duvod_gdpr", ixs_zap = "ixs_zap",}
	const enum GGinckatDtoFragments { ktg_typ = "*", ktg_typ_txt = "*", k_v = "*", k_s = "*", typ_ag = "*", spis_pl = "*", spis_znak = "*", drd = "*", priz_dd = "*", priz_vaz = "*", ofic_nazev = "*", priz_val_esu = "*", k_xml = "*", cs_nazev = "*", ktg_isdoc = "*", priz_rpr = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_aut_vyriz = "*", zakon_duvod_gdpr = "*", ixs_zap = "*",}
	const enum GGinckatDtoTypes { ktg_typ = "number", ktg_typ_txt = "string", k_v = "number", k_s = "string", typ_ag = "number", spis_pl = "string", spis_znak = "string", drd = "number", priz_dd = "number", priz_vaz = "number", ofic_nazev = "string", priz_val_esu = "number", k_xml = "string", cs_nazev = "string", ktg_isdoc = "number", priz_rpr = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_aut_vyriz = "number", zakon_duvod_gdpr = "string", ixs_zap = "string",}
	const enum GGinckatDtoTypeLengths { ktg_typ_txt = 50, k_s = 15, spis_pl = 5, spis_znak = 50, ofic_nazev = 50, k_xml = 254, cs_nazev = 50, zmenu_prov = 12, zakon_duvod_gdpr = 1000, ixs_zap = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincktsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginckts
	*      Kategorie spouštěcí události
	*/
	interface GGincktsDto {
		/**Kategorie spouštěcí události
		*      Kategorie spouštěcí události
		*/
		ktg_spu?: number|null;
		/**Kategorie spouštěcí události
		*      Kategorie spouštěcí události
		*/
		ktg_spu_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GGincktsDtoNames { ktg_spu = "ktg_spu", ktg_spu_txt = "ktg_spu_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincktsDtoFragments { ktg_spu = "*", ktg_spu_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincktsDtoTypes { ktg_spu = "number", ktg_spu_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincktsDtoTypeLengths { ktg_spu_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincmbxDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincmbx*/
	interface GGincmbxDto {
		/**DBCOLUMN:gincmbx.typ_mbx*/
		typ_mbx?: number|null;
		/**DBCOLUMN:gincmbx.typ_mbx_txt*/
		typ_mbx_txt?: string|null;
		/**DBCOLUMN:gincmbx.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincmbx.k_s*/
		k_s?: string|null;
	}
	const enum GGincmbxDtoNames { typ_mbx = "typ_mbx", typ_mbx_txt = "typ_mbx_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincmbxDtoFragments { typ_mbx = "*", typ_mbx_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincmbxDtoTypes { typ_mbx = "number", typ_mbx_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincmbxDtoTypeLengths { typ_mbx_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincmisDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincmis
	*      Druh místnosti
	*/
	interface GGincmisDto {
		/**Druh místnosti
		*      Druh místnosti
		*/
		mistnost_druh?: number|null;
		/**Druh místnosti
		*      Druh místnosti
		*/
		mistnost_druh_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		mistnost_druh_rsx?: number|null;
	}
	const enum GGincmisDtoNames { mistnost_druh = "mistnost_druh", mistnost_druh_txt = "mistnost_druh_txt", k_v = "k_v", k_s = "k_s", mistnost_druh_rsx = "mistnost_druh_rsx",}
	const enum GGincmisDtoFragments { mistnost_druh = "*", mistnost_druh_txt = "*", k_v = "*", k_s = "*", mistnost_druh_rsx = "*",}
	const enum GGincmisDtoTypes { mistnost_druh = "number", mistnost_druh_txt = "string", k_v = "number", k_s = "string", mistnost_druh_rsx = "number",}
	const enum GGincmisDtoTypeLengths { mistnost_druh_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincoapDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincoap
	*      gincoap
	*/
	interface GGincoapDto {
		prompt?: number|null;
		prompt_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GGincoapDtoNames { prompt = "prompt", prompt_txt = "prompt_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincoapDtoFragments { prompt = "*", prompt_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincoapDtoTypes { prompt = "number", prompt_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincoapDtoTypeLengths { prompt_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincorjDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincorj*/
	interface GGincorjDto {
		/**DBCOLUMN:gincorj.uroven_orj*/
		uroven_orj?: number|null;
		/**DBCOLUMN:gincorj.uroven_orj_txt*/
		uroven_orj_txt?: string|null;
		/**DBCOLUMN:gincorj.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincorj.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincorj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincorj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gincorj.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GGincorjDtoNames { uroven_orj = "uroven_orj", uroven_orj_txt = "uroven_orj_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGincorjDtoFragments { uroven_orj = "*", uroven_orj_txt = "*", k_v = "*", k_s = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGincorjDtoTypes { uroven_orj = "number", uroven_orj_txt = "string", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGincorjDtoTypeLengths { uroven_orj_txt = 50, k_s = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincpafDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpaf
	*      Povolení parametru pro fázi
	*/
	interface GGincpafDto {
		/**Programová fáze*/
		faze?: string|null;
		/**Databázový parametr*/
		param?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Uživatelská aktivita
		*      Byla myšlena původně tak, že implementátor nebo administrátor mohl zrušit vazbu parametru na patametr. Toto se ale nepoužívá
		*/
		aktivita_usr?: number|null;
	}
	const enum GGincpafDtoNames { faze = "faze", param = "param", aktivita = "aktivita", aktivita_usr = "aktivita_usr",}
	const enum GGincpafDtoFragments { faze = "*", param = "*", aktivita = "*", aktivita_usr = "*",}
	const enum GGincpafDtoTypes { faze = "string", param = "string", aktivita = "number", aktivita_usr = "number",}
	const enum GGincpafDtoTypeLengths { faze = 8, param = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincparDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpar*/
	interface GGincparDto {
		/**DBCOLUMN:gincpar.param*/
		param?: string|null;
		/**DBCOLUMN:gincpar.param_txt*/
		param_txt?: string|null;
		/**DBCOLUMN:gincpar.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincpar.priz_num*/
		priz_num?: number|null;
		/**DBCOLUMN:gincpar.priz_zobr*/
		priz_zobr?: number|null;
		/**DBCOLUMN:gincpar.popis*/
		popis?: string|null;
		/**DBCOLUMN:gincpar.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gincpar.priz_cen*/
		priz_cen?: number|null;
		/**DBCOLUMN:gincpar.priz_tem*/
		priz_tem?: number|null;
		/**DBCOLUMN:gincpar.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincpar.submodel*/
		submodel?: string|null;
		/**DBCOLUMN:gincpar.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gincpar.login_uziv*/
		login_uziv?: string|null;
		/**DBCOLUMN:gincpar.priz_rp*/
		priz_rp?: number|null;
		/**DBCOLUMN:gincpar.typ_par*/
		typ_par?: number|null;
		/**DBCOLUMN:gincpar.ixs_cis*/
		ixs_cis?: string|null;
		/**DBCOLUMN:gincpar.priz_glob*/
		priz_glob?: number|null;
		/**DBCOLUMN:gincpar.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:gincpar.form_pop*/
		form_pop?: number|null;
		/**DBCOLUMN:gincpar.param_sgrp*/
		param_sgrp?: string|null;
		/**DBCOLUMN:gincpar.spl_1*/
		spl_1?: string|null;
		/**DBCOLUMN:gincpar.spl_2*/
		spl_2?: string|null;
		/**DBCOLUMN:gincpar.spl_3*/
		spl_3?: string|null;
		/**DBCOLUMN:gincpar.priz_hrom*/
		priz_hrom?: number|null;
		/**DBCOLUMN:gincpar.config*/
		config?: string|null;
		/**DBCOLUMN:gincpar.config_txt*/
		config_txt?: string|null;
		/**DBCOLUMN:gincpar.priz_multi*/
		priz_multi?: number|null;
		/**DBCOLUMN:gincpar.priz_passwd*/
		priz_passwd?: number|null;
		/**DBCOLUMN:gincpar.povol_null*/
		povol_null?: number|null;
		/**DBCOLUMN:gincpar.priz_crypt*/
		priz_crypt?: number|null;
		/**DBCOLUMN:gincpar.priz_hash*/
		priz_hash?: number|null;
		/**DBCOLUMN:gincpar.priz_long*/
		priz_long?: number|null;
		/**DBCOLUMN:gincpar.priz_zobr_adm*/
		priz_zobr_adm?: number|null;
	}
	const enum GGincparDtoNames { param = "param", param_txt = "param_txt", k_v = "k_v", priz_num = "priz_num", priz_zobr = "priz_zobr", popis = "popis", aktivita = "aktivita", priz_cen = "priz_cen", priz_tem = "priz_tem", k_s = "k_s", submodel = "submodel", dat_zmena = "dat_zmena", login_uziv = "login_uziv", priz_rp = "priz_rp", typ_par = "typ_par", ixs_cis = "ixs_cis", priz_glob = "priz_glob", dat_mpd = "dat_mpd", form_pop = "form_pop", param_sgrp = "param_sgrp", spl_1 = "spl_1", spl_2 = "spl_2", spl_3 = "spl_3", priz_hrom = "priz_hrom", config = "config", config_txt = "config_txt", priz_multi = "priz_multi", priz_passwd = "priz_passwd", povol_null = "povol_null", priz_crypt = "priz_crypt", priz_hash = "priz_hash", priz_long = "priz_long", priz_zobr_adm = "priz_zobr_adm",}
	const enum GGincparDtoFragments { param = "*", param_txt = "*", k_v = "*", priz_num = "*", priz_zobr = "*", popis = "*", aktivita = "*", priz_cen = "*", priz_tem = "*", k_s = "*", submodel = "*", dat_zmena = "*", login_uziv = "*", priz_rp = "*", typ_par = "*", ixs_cis = "*", priz_glob = "*", dat_mpd = "*", form_pop = "*", param_sgrp = "*", spl_1 = "*", spl_2 = "*", spl_3 = "*", priz_hrom = "*", config = "*", config_txt = "*", priz_multi = "*", priz_passwd = "*", povol_null = "*", priz_crypt = "*", priz_hash = "*", priz_long = "*", priz_zobr_adm = "*",}
	const enum GGincparDtoTypes { param = "string", param_txt = "string", k_v = "number", priz_num = "number", priz_zobr = "number", popis = "string", aktivita = "number", priz_cen = "number", priz_tem = "number", k_s = "string", submodel = "string", dat_zmena = "JsonDate", login_uziv = "string", priz_rp = "number", typ_par = "number", ixs_cis = "string", priz_glob = "number", dat_mpd = "JsonDate", form_pop = "number", param_sgrp = "string", spl_1 = "string", spl_2 = "string", spl_3 = "string", priz_hrom = "number", config = "string", config_txt = "string", priz_multi = "number", priz_passwd = "number", povol_null = "number", priz_crypt = "number", priz_hash = "number", priz_long = "number", priz_zobr_adm = "number",}
	const enum GGincparDtoTypeLengths { param = 15, param_txt = 100, popis = 254, k_s = 15, submodel = 3, login_uziv = 60, ixs_cis = 12, param_sgrp = 15, spl_1 = 254, spl_2 = 254, spl_3 = 254, config = 200, config_txt = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincpatDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpat
	*      Režim automatického vybírání schránky
	*/
	interface GGincpatDto {
		/**Režim automatického vybírání schránky*/
		priz_automat?: number|null;
		/**popis*/
		priz_automat_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GGincpatDtoNames { priz_automat = "priz_automat", priz_automat_txt = "priz_automat_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincpatDtoFragments { priz_automat = "*", priz_automat_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincpatDtoTypes { priz_automat = "number", priz_automat_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincpatDtoTypeLengths { priz_automat_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincpauDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpau
	*      Úrovně parametrům
	*/
	interface GGincpauDto {
		/**Úroveň konfigurace*/
		uroven_cfg?: number|null;
		/**Databázový parametr*/
		param?: string|null;
		/**Uživatelská aktivita
		*      Uživatelem definovaná aktivita úrovně jednotlivých parametrů
		*/
		aktivita_usr?: number|null;
	}
	const enum GGincpauDtoNames { uroven_cfg = "uroven_cfg", param = "param", aktivita_usr = "aktivita_usr",}
	const enum GGincpauDtoFragments { uroven_cfg = "*", param = "*", aktivita_usr = "*",}
	const enum GGincpauDtoTypes { uroven_cfg = "number", param = "string", aktivita_usr = "number",}
	const enum GGincpauDtoTypeLengths { param = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincpavDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpav
	*      Příznak možnosti automatického vyřízení v rámci schvalovacího procesu
	*/
	interface GGincpavDto {
		/**Příznak možnosti automatického vyřízení v rámci schvalovacího procesu*/
		priz_aut_vyriz?: number|null;
		/**název*/
		priz_aut_vyriz_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GGincpavDtoNames { priz_aut_vyriz = "priz_aut_vyriz", priz_aut_vyriz_txt = "priz_aut_vyriz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincpavDtoFragments { priz_aut_vyriz = "*", priz_aut_vyriz_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincpavDtoTypes { priz_aut_vyriz = "number", priz_aut_vyriz_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincpavDtoTypeLengths { priz_aut_vyriz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincpipDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpip
	*      gincpip
	*/
	interface GGincpipDto {
		priz_ip_adr?: number|null;
		priz_ip_adr_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GGincpipDtoNames { priz_ip_adr = "priz_ip_adr", priz_ip_adr_txt = "priz_ip_adr_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincpipDtoFragments { priz_ip_adr = "*", priz_ip_adr_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincpipDtoTypes { priz_ip_adr = "number", priz_ip_adr_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincpipDtoTypeLengths { priz_ip_adr_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincpkfDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpkf*/
	interface GGincpkfDto {
		/**DBCOLUMN:gincpkf.priz_kon_form*/
		priz_kon_form?: number|null;
		/**DBCOLUMN:gincpkf.priz_kon_form_txt*/
		priz_kon_form_txt?: string|null;
		/**DBCOLUMN:gincpkf.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincpkf.k_s*/
		k_s?: string|null;
	}
	const enum GGincpkfDtoNames { priz_kon_form = "priz_kon_form", priz_kon_form_txt = "priz_kon_form_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincpkfDtoFragments { priz_kon_form = "*", priz_kon_form_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincpkfDtoTypes { priz_kon_form = "number", priz_kon_form_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincpkfDtoTypeLengths { priz_kon_form_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincpnaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpna
	*      gincpna
	*/
	interface GGincpnaDto {
		priz_povol_nda?: number|null;
		priz_povol_nda_txt?: string|null;
		ktg_povol_nda?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGincpnaDtoNames { priz_povol_nda = "priz_povol_nda", priz_povol_nda_txt = "priz_povol_nda_txt", ktg_povol_nda = "ktg_povol_nda", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGincpnaDtoFragments { priz_povol_nda = "*", priz_povol_nda_txt = "*", ktg_povol_nda = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGincpnaDtoTypes { priz_povol_nda = "number", priz_povol_nda_txt = "string", ktg_povol_nda = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGincpnaDtoTypeLengths { priz_povol_nda_txt = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincprvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincprv
	*      Příznak povolené vazby
	*/
	interface GGincprvDto {
		/**Příznak povolené vazby*/
		priz_vaz?: number|null;
		/**název*/
		priz_vaz_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GGincprvDtoNames { priz_vaz = "priz_vaz", priz_vaz_txt = "priz_vaz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincprvDtoFragments { priz_vaz = "*", priz_vaz_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincprvDtoTypes { priz_vaz = "number", priz_vaz_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincprvDtoTypeLengths { priz_vaz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincpveDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpve
	*      Příznak vyžadování pouze validovaných esu
	*/
	interface GGincpveDto {
		/**Příznak povolené vazby*/
		priz_val_esu?: number|null;
		/**název*/
		priz_val_esu_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GGincpveDtoNames { priz_val_esu = "priz_val_esu", priz_val_esu_txt = "priz_val_esu_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincpveDtoFragments { priz_val_esu = "*", priz_val_esu_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincpveDtoTypes { priz_val_esu = "number", priz_val_esu_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincpveDtoTypeLengths { priz_val_esu_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincsbuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincsbu
	*      Druh segmentu budovy
	*/
	interface GGincsbuDto {
		/**Druh segmentu budovy
		*      Druh segmentu budovy
		*/
		segment_druh?: number|null;
		/**Druh segmentu budovy
		*      Druh segmentu budovy
		*/
		segment_druh_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		segment_druh_rsx?: number|null;
	}
	const enum GGincsbuDtoNames { segment_druh = "segment_druh", segment_druh_txt = "segment_druh_txt", k_v = "k_v", k_s = "k_s", segment_druh_rsx = "segment_druh_rsx",}
	const enum GGincsbuDtoFragments { segment_druh = "*", segment_druh_txt = "*", k_v = "*", k_s = "*", segment_druh_rsx = "*",}
	const enum GGincsbuDtoTypes { segment_druh = "number", segment_druh_txt = "string", k_v = "number", k_s = "string", segment_druh_rsx = "number",}
	const enum GGincsbuDtoTypeLengths { segment_druh_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincstaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincsta
	*      Stát
	*/
	interface GGincstaDto {
		/**Stát*/
		stat?: number|null;
		/**Stát*/
		stat_txt?: string|null;
		/**Plný anglický název (ISO 3166-1)*/
		stat_txt_orig?: string|null;
		/**Zkrácený český název*/
		stat_zkr?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Dvoumístný alfabetický kód (A-2)
		*      Kódy podle Standardů státního informačního systému - Dvoumístný alfabetický kód (A-2)
		*/
		stat_sis_aa?: string|null;
		/**Trojmístný alfabetický kód (A-3)
		*      Kódy podle Standardů státního informačního systému - Trojmístný alfabetický kód (A-3)
		*/
		stat_sis_aaa?: string|null;
		/**Trojmístný numerický kód (N-3)
		*       Kódy podle Standardů státního informačního systému - Trojmístný numerický kód (N-3)
		*/
		stat_sis_nnn?: number|null;
		/**Aktivita
		*      Aktivita záznamu
		*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**CS podoba názvu
		*      Pomocná forma uložení názvu státu podel pravidel CS sloupců
		*/
		cs_stat_txt?: string|null;
		/**Příznak EU
		*      Příznak, že stát patří do skupiny států EU
		*/
		priz_eu?: number|null;
		/**Kód EU*/
		kod_zeme_eu?: string|null;
		/**Světadíl*/
		svetadil?: number|null;
		/**Příznak IBAN*/
		priz_iban?: number|null;
		/**Kód podle ARI*/
		stat_csu?: number|null;
		/**?*/
		stat_mf?: number|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Zkrácený anglický název*/
		stat_zkr_orig?: string|null;
		/**?*/
		priz_sepa?: number|null;
	}
	const enum GGincstaDtoNames { stat = "stat", stat_txt = "stat_txt", stat_txt_orig = "stat_txt_orig", stat_zkr = "stat_zkr", k_v = "k_v", k_s = "k_s", stat_sis_aa = "stat_sis_aa", stat_sis_aaa = "stat_sis_aaa", stat_sis_nnn = "stat_sis_nnn", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cs_stat_txt = "cs_stat_txt", priz_eu = "priz_eu", kod_zeme_eu = "kod_zeme_eu", svetadil = "svetadil", priz_iban = "priz_iban", stat_csu = "stat_csu", stat_mf = "stat_mf", ixs_lpc = "ixs_lpc", stat_zkr_orig = "stat_zkr_orig", priz_sepa = "priz_sepa",}
	const enum GGincstaDtoFragments { stat = "*", stat_txt = "*", stat_txt_orig = "*", stat_zkr = "*", k_v = "*", k_s = "*", stat_sis_aa = "*", stat_sis_aaa = "*", stat_sis_nnn = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", cs_stat_txt = "*", priz_eu = "*", kod_zeme_eu = "*", svetadil = "*", priz_iban = "*", stat_csu = "*", stat_mf = "*", ixs_lpc = "*", stat_zkr_orig = "*", priz_sepa = "*",}
	const enum GGincstaDtoTypes { stat = "number", stat_txt = "string", stat_txt_orig = "string", stat_zkr = "string", k_v = "number", k_s = "string", stat_sis_aa = "string", stat_sis_aaa = "string", stat_sis_nnn = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cs_stat_txt = "string", priz_eu = "number", kod_zeme_eu = "string", svetadil = "number", priz_iban = "number", stat_csu = "number", stat_mf = "number", ixs_lpc = "string", stat_zkr_orig = "string", priz_sepa = "number",}
	const enum GGincstaDtoTypeLengths { stat_txt = 254, stat_txt_orig = 254, stat_zkr = 100, k_s = 15, stat_sis_aa = 2, stat_sis_aaa = 3, zmenu_prov = 12, cs_stat_txt = 50, kod_zeme_eu = 2, ixs_lpc = 12, stat_zkr_orig = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincsveDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincsve*/
	interface GGincsveDto {
		/**DBCOLUMN:gincsve.svetadil*/
		svetadil?: number|null;
		/**DBCOLUMN:gincsve.svetadil_txt*/
		svetadil_txt?: string|null;
		/**DBCOLUMN:gincsve.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:gincsve.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:gincsve.svetadil_rsx*/
		svetadil_rsx?: number|null;
	}
	const enum GGincsveDtoNames { svetadil = "svetadil", svetadil_txt = "svetadil_txt", k_v = "k_v", k_s = "k_s", svetadil_rsx = "svetadil_rsx",}
	const enum GGincsveDtoFragments { svetadil = "*", svetadil_txt = "*", k_v = "*", k_s = "*", svetadil_rsx = "*",}
	const enum GGincsveDtoTypes { svetadil = "number", svetadil_txt = "string", k_v = "number", k_s = "string", svetadil_rsx = "number",}
	const enum GGincsveDtoTypeLengths { svetadil_txt = 50, k_s = 15,}
	/**ENUM:gincsve*/
	const enum GGincsveEnum {
		/**Neurčeno*/
		_0=0,
		/**Afrika*/
		_10=10,
		/**Antarktida*/
		_20=20,
		/**Austrálie a Oceánie*/
		_30=30,
		/**Amerika*/
		_40=40,
		/**Asie*/
		_50=50,
		/**Evropa*/
		_60=60,
	}
	function GGincsveEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GGincsveEnum, Gordic.Adm.Interface.GGincsveDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinctvpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginctvp*/
	interface GGinctvpDto {
		/**DBCOLUMN:ginctvp.typ_vla*/
		typ_vla?: number|null;
		/**DBCOLUMN:ginctvp.typ_vla_txt*/
		typ_vla_txt?: string|null;
		/**DBCOLUMN:ginctvp.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ginctvp.k_s*/
		k_s?: string|null;
	}
	const enum GGinctvpDtoNames { typ_vla = "typ_vla", typ_vla_txt = "typ_vla_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGinctvpDtoFragments { typ_vla = "*", typ_vla_txt = "*", k_v = "*", k_s = "*",}
	const enum GGinctvpDtoTypes { typ_vla = "number", typ_vla_txt = "string", k_v = "number", k_s = "string",}
	const enum GGinctvpDtoTypeLengths { typ_vla_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinctyoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginctyo
	*      Typ organizace
	*/
	interface GGinctyoDto {
		/**Typ organizace
		*      Definuje typ organizace interního subjektu
		*/
		typ_org?: number|null;
		/**Typ organizace*/
		typ_org_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Právní subjektivita*/
		typ_esu?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Identifikátor právní formy*/
		pr_forma?: string|null;
		/**Příznak banky
		*      Příznak, že tento typ subjektu odpovídá bance
		*/
		priz_banka?: number|null;
		/**Typ subjektu pro ISDS*/
		typ_isds?: string|null;
		/**Resource ID 
		*      Interní ID resource textů pro dynamickou lokalizaci číselníků za běhu aplikací
		*/
		typ_org_rsx?: number|null;
	}
	const enum GGinctyoDtoNames { typ_org = "typ_org", typ_org_txt = "typ_org_txt", k_v = "k_v", k_s = "k_s", typ_esu = "typ_esu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", pr_forma = "pr_forma", priz_banka = "priz_banka", typ_isds = "typ_isds", typ_org_rsx = "typ_org_rsx",}
	const enum GGinctyoDtoFragments { typ_org = "*", typ_org_txt = "*", k_v = "*", k_s = "*", typ_esu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", pr_forma = "*", priz_banka = "*", typ_isds = "*", typ_org_rsx = "*",}
	const enum GGinctyoDtoTypes { typ_org = "number", typ_org_txt = "string", k_v = "number", k_s = "string", typ_esu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", pr_forma = "string", priz_banka = "number", typ_isds = "string", typ_org_rsx = "number",}
	const enum GGinctyoDtoTypeLengths { typ_org_txt = 254, k_s = 15, zmenu_prov = 12, pr_forma = 3, typ_isds = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincvauDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincvau
	*      gincvau
	*/
	interface GGincvauDto {
		typ_vau?: number|null;
		typ_vau_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GGincvauDtoNames { typ_vau = "typ_vau", typ_vau_txt = "typ_vau_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincvauDtoFragments { typ_vau = "*", typ_vau_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincvauDtoTypes { typ_vau = "number", typ_vau_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincvauDtoTypeLengths { typ_vau_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincvpsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincvps
	*      Typ vlastnosti
	*/
	interface GGincvpsDto {
		/**Typ vlastnosti*/
		typ_vps?: number|null;
		/**Typ vlastnosti
		*      Typ vlastnosti
		*/
		typ_vps_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GGincvpsDtoNames { typ_vps = "typ_vps", typ_vps_txt = "typ_vps_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincvpsDtoFragments { typ_vps = "*", typ_vps_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincvpsDtoTypes { typ_vps = "number", typ_vps_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincvpsDtoTypeLengths { typ_vps_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGincvskDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincvsk
	*      gincvsk
	*/
	interface GGincvskDto {
		obd_vsk?: number|null;
		obd_vsk_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GGincvskDtoNames { obd_vsk = "obd_vsk", obd_vsk_txt = "obd_vsk_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincvskDtoFragments { obd_vsk = "*", obd_vsk_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincvskDtoTypes { obd_vsk = "number", obd_vsk_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincvskDtoTypeLengths { obd_vsk_txt = 254, k_s = 15,}
	/**Rozšíření GGincvskDto*/
	interface GGincvskExtDto extends Gordic.Adm.Interface.GGincvskDto {
		/**Poznámka*/
		poznamka?: string|null;
	}
	const enum GGincvskExtDtoNames { poznamka = "poznamka", obd_vsk = "obd_vsk", obd_vsk_txt = "obd_vsk_txt", k_v = "k_v", k_s = "k_s",}
	const enum GGincvskExtDtoFragments { poznamka = "*", obd_vsk = "*", obd_vsk_txt = "*", k_v = "*", k_s = "*",}
	const enum GGincvskExtDtoTypes { poznamka = "string", obd_vsk = "number", obd_vsk_txt = "string", k_v = "number", k_s = "string",}
	const enum GGincvskExtDtoTypeLengths { obd_vsk_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindcisDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindcis*/
	interface GGindcisDto {
		/**DBCOLUMN:gindcis.ixs_cis*/
		ixs_cis?: string|null;
		/**DBCOLUMN:gindcis.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:gindcis.sql_prik*/
		sql_prik?: string|null;
	}
	const enum GGindcisDtoNames { ixs_cis = "ixs_cis", por_cislo = "por_cislo", sql_prik = "sql_prik",}
	const enum GGindcisDtoFragments { ixs_cis = "*", por_cislo = "*", sql_prik = "*",}
	const enum GGindcisDtoTypes { ixs_cis = "string", por_cislo = "number", sql_prik = "string",}
	const enum GGindcisDtoTypeLengths { ixs_cis = 12, sql_prik = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinddbpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginddbp*/
	interface GGinddbpDto {
		/**DBCOLUMN:ginddbp.dbprofil*/
		dbprofil?: string|null;
		/**ID parametru odvozené od jména položky v registrech*/
		dbp_klic?: string|null;
		/**Hodnota parametru DB profilu*/
		dbp_hodnota?: string|null;
	}
	const enum GGinddbpDtoNames { dbprofil = "dbprofil", dbp_klic = "dbp_klic", dbp_hodnota = "dbp_hodnota",}
	const enum GGinddbpDtoFragments { dbprofil = "*", dbp_klic = "*", dbp_hodnota = "*",}
	const enum GGinddbpDtoTypes { dbprofil = "string", dbp_klic = "string", dbp_hodnota = "string",}
	const enum GGinddbpDtoTypeLengths { dbprofil = 15, dbp_klic = 30, dbp_hodnota = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindevnDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindevn
	*      Parametr události
	*/
	interface GGindevnDto {
		/**ID události*/
		evn_por_cislo?: number|null;
		/**Číslo řádku
		*      Číslo řádku v rámci popisu těla události v TP
		*/
		radek?: number|null;
		/**Označení parametru události
		*      Interní prog.název parametru
		*/
		var_name?: string|null;
		/**Parametr události
		*      Uživatelský název parametru události
		*/
		var_name_txt?: string|null;
		/**Hodnota parametru události
		*      Interní hodnota parametru události
		*/
		var_value?: string|null;
		/**Hodnota parametru
		*      Uživatelská podoba hodnoty parametru události
		*/
		var_value_txt?: string|null;
		/**Datový typ hodnoty
		*      Datový typ hodnoty parametru události
		*/
		dat_typ?: number|null;
		/**Zobrazovat
		*      Příznak, že parametr události se má zobrazovat běžným uživatelům.
		*/
		priz_zobr?: number|null;
	}
	const enum GGindevnDtoNames { evn_por_cislo = "evn_por_cislo", radek = "radek", var_name = "var_name", var_name_txt = "var_name_txt", var_value = "var_value", var_value_txt = "var_value_txt", dat_typ = "dat_typ", priz_zobr = "priz_zobr",}
	const enum GGindevnDtoFragments { evn_por_cislo = "*", radek = "*", var_name = "*", var_name_txt = "*", var_value = "*", var_value_txt = "*", dat_typ = "*", priz_zobr = "*",}
	const enum GGindevnDtoTypes { evn_por_cislo = "number", radek = "number", var_name = "string", var_name_txt = "string", var_value = "string", var_value_txt = "string", dat_typ = "number", priz_zobr = "number",}
	const enum GGindevnDtoTypeLengths { var_name = 254, var_name_txt = 254, var_value = 254, var_value_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindforDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindfor
	*      Položky formuláře
	*/
	interface GGindforDto {
		ixs_for?: string|null;
		/**Sloupec*/
		sloupec?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
		priz_pouz?: number|null;
		druh_pole?: number|null;
		ukaz_hodnota?: string|null;
		/**Příznak pole*/
		priz_pole?: number|null;
		/**Datový typ*/
		dat_typ?: number|null;
		velikost?: number|null;
		/**Kód formuláře*/
		kod_form?: string|null;
		xml_xpath?: string|null;
		/**Typ mapování*/
		typ_mapovani?: number|null;
		/**Pevná hodnota, pokud je typ_mapovani nastaven na 10*/
		pevna_hodnota?: string|null;
	}
	const enum GGindforDtoNames { ixs_for = "ixs_for", sloupec = "sloupec", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", popis = "popis", priz_pouz = "priz_pouz", druh_pole = "druh_pole", ukaz_hodnota = "ukaz_hodnota", priz_pole = "priz_pole", dat_typ = "dat_typ", velikost = "velikost", kod_form = "kod_form", xml_xpath = "xml_xpath", typ_mapovani = "typ_mapovani", pevna_hodnota = "pevna_hodnota",}
	const enum GGindforDtoFragments { ixs_for = "*", sloupec = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", popis = "*", priz_pouz = "*", druh_pole = "*", ukaz_hodnota = "*", priz_pole = "*", dat_typ = "*", velikost = "*", kod_form = "*", xml_xpath = "*", typ_mapovani = "*", pevna_hodnota = "*",}
	const enum GGindforDtoTypes { ixs_for = "string", sloupec = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", popis = "string", priz_pouz = "number", druh_pole = "number", ukaz_hodnota = "string", priz_pole = "number", dat_typ = "number", velikost = "number", kod_form = "string", xml_xpath = "string", typ_mapovani = "number", pevna_hodnota = "string",}
	const enum GGindforDtoTypeLengths { ixs_for = 12, sloupec = 240, poznamka = 254, zmenu_prov = 12, nazev = 254, popis = 254, ukaz_hodnota = 254, kod_form = 254, xml_xpath = 4000,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindgdtDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindgdt*/
	interface GGindgdtDto {
		/**DBCOLUMN:gindgdt.ixs_gdt*/
		ixs_gdt?: string|null;
		/**DBCOLUMN:gindgdt.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:gindgdt.pripona*/
		pripona?: string|null;
		/**DBCOLUMN:gindgdt.popis*/
		popis?: string|null;
		/**DBCOLUMN:gindgdt.kopie*/
		kopie?: JsonBlob|null;
	}
	const enum GGindgdtDtoNames { ixs_gdt = "ixs_gdt", soubor = "soubor", pripona = "pripona", popis = "popis", kopie = "kopie",}
	const enum GGindgdtDtoFragments { ixs_gdt = "*", soubor = "*", pripona = "*", popis = "*", kopie = "*",}
	const enum GGindgdtDtoTypes { ixs_gdt = "string", soubor = "string", pripona = "string", popis = "string", kopie = "JsonBlob",}
	const enum GGindgdtDtoTypeLengths { ixs_gdt = 12, soubor = 200, pripona = 3, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindhopDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindhop
	*      Popis hodnoty parametru
	*/
	interface GGindhopDto {
		/**Databázový parametr*/
		param?: string|null;
		/**Hodnota parametru
		*      Interní podoba hodnoty parametru
		*/
		config?: string|null;
		/**Po5ad9 fragmentu textu*/
		por_cislo?: number|null;
		/**Text fragmentu popisu hodnoty parametru*/
		popis?: string|null;
		/**Datum a čas vzniku záznamu*/
		dat_mpd?: JsonDate|null;
	}
	const enum GGindhopDtoNames { param = "param", config = "config", por_cislo = "por_cislo", popis = "popis", dat_mpd = "dat_mpd",}
	const enum GGindhopDtoFragments { param = "*", config = "*", por_cislo = "*", popis = "*", dat_mpd = "*",}
	const enum GGindhopDtoTypes { param = "string", config = "string", por_cislo = "number", popis = "string", dat_mpd = "JsonDate",}
	const enum GGindhopDtoTypeLengths { param = 15, config = 200, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindoatDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindoat
	*      Scope pro Oauth token
	*/
	interface GGindoatDto {
		oauth_token?: string|null;
		/**Interní ID zásilky*/
		por_cislo?: number|null;
		service_scope?: string|null;
	}
	const enum GGindoatDtoNames { oauth_token = "oauth_token", por_cislo = "por_cislo", service_scope = "service_scope",}
	const enum GGindoatDtoFragments { oauth_token = "*", por_cislo = "*", service_scope = "*",}
	const enum GGindoatDtoTypes { oauth_token = "string", por_cislo = "number", service_scope = "string",}
	const enum GGindoatDtoTypeLengths { oauth_token = 36, service_scope = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindpozDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindpoz*/
	interface GGindpozDto {
		/**DBCOLUMN:gindpoz.sxs*/
		sxs?: string|null;
		/**DBCOLUMN:gindpoz.typ_obj*/
		typ_obj?: number|null;
		/**DBCOLUMN:gindpoz.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:gindpoz.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:gindpoz.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:gindpoz.verejna*/
		verejna?: number|null;
		/**DBCOLUMN:gindpoz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gindpoz.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gindpoz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gindpoz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:gindpoz.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:gindpoz.tiskova*/
		tiskova?: number|null;
		/**DBCOLUMN:gindpoz.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:gindpoz.dat_plat_do*/
		dat_plat_do?: JsonDate|null;
		/**DBCOLUMN:gindpoz.nazev*/
		nazev?: string|null;
	}
	const enum GGindpozDtoNames { sxs = "sxs", typ_obj = "typ_obj", por_cislo = "por_cislo", typ_ag = "typ_ag", ixs_fun = "ixs_fun", verejna = "verejna", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_mpd = "dat_mpd", tiskova = "tiskova", ixs_lpc = "ixs_lpc", dat_plat_do = "dat_plat_do", nazev = "nazev",}
	const enum GGindpozDtoFragments { sxs = "*", typ_obj = "*", por_cislo = "*", typ_ag = "*", ixs_fun = "*", verejna = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dat_mpd = "*", tiskova = "*", ixs_lpc = "*", dat_plat_do = "*", nazev = "*",}
	const enum GGindpozDtoTypes { sxs = "string", typ_obj = "number", por_cislo = "number", typ_ag = "number", ixs_fun = "string", verejna = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_mpd = "JsonDate", tiskova = "number", ixs_lpc = "string", dat_plat_do = "JsonDate", nazev = "string",}
	const enum GGindpozDtoTypeLengths { sxs = 50, ixs_fun = 12, poznamka = 254, zmenu_prov = 12, ixs_lpc = 12, nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindproDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindpro
	*      Obsah profilu vlastností
	*/
	interface GGindproDto {
		/**Obsah profilu vlastnistí*/
		ixs_pro?: string|null;
		/**struktura vlastností*/
		ixs_stv?: string|null;
		/**Název profilu
		*      Název profilu vlastností
		*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Povinnost*/
		priz_pov?: number|null;
		/**Příznak pole*/
		priz_pole?: number|null;
		/**Editovatelnost*/
		priz_edit?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Přístup*/
		priz_ro?: number|null;
		/**Kód profilu
		*      Kód profilu
		*/
		kod?: string|null;
		/**Virtuální*/
		priz_vir?: number|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Kód formuláře
		*      Kód formuláře
		*/
		kod_form?: string|null;
	}
	const enum GGindproDtoNames { ixs_pro = "ixs_pro", ixs_stv = "ixs_stv", nazev = "nazev", aktivita = "aktivita", priz_pov = "priz_pov", priz_pole = "priz_pole", priz_edit = "priz_edit", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_ro = "priz_ro", kod = "kod", priz_vir = "priz_vir", k_v = "k_v", kod_form = "kod_form",}
	const enum GGindproDtoFragments { ixs_pro = "*", ixs_stv = "*", nazev = "*", aktivita = "*", priz_pov = "*", priz_pole = "*", priz_edit = "*", dat_zmena = "*", zmenu_prov = "*", priz_ro = "*", kod = "*", priz_vir = "*", k_v = "*", kod_form = "*",}
	const enum GGindproDtoTypes { ixs_pro = "string", ixs_stv = "string", nazev = "string", aktivita = "number", priz_pov = "number", priz_pole = "number", priz_edit = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_ro = "number", kod = "string", priz_vir = "number", k_v = "number", kod_form = "string",}
	const enum GGindproDtoTypeLengths { ixs_pro = 12, ixs_stv = 12, nazev = 50, zmenu_prov = 12, kod = 13, kod_form = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindsfuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindsfu
	*      Členové skupiny
	*/
	interface GGindsfuDto {
		/**Skupina funkcí*/
		ixs_sfu?: string|null;
		/**Funkční místo
		*      Člen skupiny
		*/
		ixs_fun?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGindsfuDtoNames { ixs_sfu = "ixs_sfu", ixs_fun = "ixs_fun", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGindsfuDtoFragments { ixs_sfu = "*", ixs_fun = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGindsfuDtoTypes { ixs_sfu = "string", ixs_fun = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGindsfuDtoTypeLengths { ixs_sfu = 12, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindstvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindstv
	*      Obsah struktury vlastností
	*/
	interface GGindstvDto {
		/**Struktura*/
		ixs_stv?: string|null;
		/**Vlastnost*/
		ixs_vla?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Kód
		*      Kód vlastnosti v rámci struktury
		*/
		kod?: string|null;
		/**Virtuální*/
		priz_vir?: number|null;
		/**Kód pro formuláře
		*      Kód pro formuláře vlastnosti v rámci struktury
		*/
		kod_form?: string|null;
	}
	const enum GGindstvDtoNames { ixs_stv = "ixs_stv", ixs_vla = "ixs_vla", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", k_v = "k_v", k_s = "k_s", kod = "kod", priz_vir = "priz_vir", kod_form = "kod_form",}
	const enum GGindstvDtoFragments { ixs_stv = "*", ixs_vla = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", k_v = "*", k_s = "*", kod = "*", priz_vir = "*", kod_form = "*",}
	const enum GGindstvDtoTypes { ixs_stv = "string", ixs_vla = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", k_v = "number", k_s = "string", kod = "string", priz_vir = "number", kod_form = "string",}
	const enum GGindstvDtoTypeLengths { ixs_stv = 12, ixs_vla = 12, zmenu_prov = 12, k_s = 15, kod = 13, kod_form = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGindwgpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindwgp
	*      Členové pracovní skupiny pro IRP
	*/
	interface GGindwgpDto {
		ixs_wgp?: string|null;
		ixs?: string|null;
		/**Typ subjektu*/
		ix?: string|null;
		/**IRP Úroveň oprávnění*/
		uroven_prist?: number|null;
		duvod_zarazeni?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
	}
	const enum GGindwgpDtoNames { ixs_wgp = "ixs_wgp", ixs = "ixs", ix = "ix", uroven_prist = "uroven_prist", duvod_zarazeni = "duvod_zarazeni", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc",}
	const enum GGindwgpDtoFragments { ixs_wgp = "*", ixs = "*", ix = "*", uroven_prist = "*", duvod_zarazeni = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*",}
	const enum GGindwgpDtoTypes { ixs_wgp = "string", ixs = "string", ix = "string", uroven_prist = "number", duvod_zarazeni = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string",}
	const enum GGindwgpDtoTypeLengths { ixs_wgp = 12, ixs = 12, ix = 3, duvod_zarazeni = 254, poznamka = 254, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinhobjDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginhobj
	*      Historie změn objektů
	*/
	interface GGinhobjDto {
		/**Interní ID zásilky*/
		por_cislo?: number|null;
		/**Složený klíč identifikující objekt*/
		sxs?: string|null;
		/**Typu subjektu*/
		typ_obj?: number|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název*/
		nazev?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		typ_op?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**ID externího systému*/
		ixs_ext?: string|null;
		/**CS název*/
		cs_nazev?: string|null;
	}
	const enum GGinhobjDtoNames { por_cislo = "por_cislo", sxs = "sxs", typ_obj = "typ_obj", typ_ag = "typ_ag", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ixs_lpc = "ixs_lpc", typ_op = "typ_op", poznamka = "poznamka", ixs_ext = "ixs_ext", cs_nazev = "cs_nazev",}
	const enum GGinhobjDtoFragments { por_cislo = "*", sxs = "*", typ_obj = "*", typ_ag = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", ixs_lpc = "*", typ_op = "*", poznamka = "*", ixs_ext = "*", cs_nazev = "*",}
	const enum GGinhobjDtoTypes { por_cislo = "number", sxs = "string", typ_obj = "number", typ_ag = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ixs_lpc = "string", typ_op = "number", poznamka = "string", ixs_ext = "string", cs_nazev = "string",}
	const enum GGinhobjDtoTypeLengths { sxs = 200, zmenu_prov = 12, nazev = 254, ixs_lpc = 12, poznamka = 254, ixs_ext = 12, cs_nazev = 254,}
	interface GGinhobjExtDto extends Gordic.Adm.Interface.GGinhobjDto {
		/**Název funkčního místa*/
		nazev_rf?: string|null;
		/**Faze*/
		faze?: string|null;
	}
	const enum GGinhobjExtDtoNames { nazev_rf = "nazev_rf", faze = "faze", por_cislo = "por_cislo", sxs = "sxs", typ_obj = "typ_obj", typ_ag = "typ_ag", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ixs_lpc = "ixs_lpc", typ_op = "typ_op", poznamka = "poznamka", ixs_ext = "ixs_ext", cs_nazev = "cs_nazev",}
	const enum GGinhobjExtDtoFragments { nazev_rf = "*", faze = "*", por_cislo = "*", sxs = "*", typ_obj = "*", typ_ag = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", ixs_lpc = "*", typ_op = "*", poznamka = "*", ixs_ext = "*", cs_nazev = "*",}
	const enum GGinhobjExtDtoTypes { nazev_rf = "string", faze = "string", por_cislo = "number", sxs = "string", typ_obj = "number", typ_ag = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ixs_lpc = "string", typ_op = "number", poznamka = "string", ixs_ext = "string", cs_nazev = "string",}
	const enum GGinhobjExtDtoTypeLengths { sxs = 200, zmenu_prov = 12, nazev = 254, ixs_lpc = 12, poznamka = 254, ixs_ext = 12, cs_nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinladlDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginladl
	*      ADL soubor
	*/
	interface GGinladlDto {
		/**Jméno ADL souboru
		*      LIC + "_" + "T" pro testovací databázi nebo "P" pro provozní databázi + "_" + ID GDZ balíku + datum a čas spuštění balíku ve formátu "yyyyMMddHHmmssfff"
		*/
		adl?: string|null;
		/**Čas spuštění GDZ balíku*/
		dat_start?: JsonDate|null;
		/**Balík GDZ*/
		ixs_gdt?: string|null;
		/**Obsah ADL souboru*/
		kopie?: JsonBlob|null;
		/**ID souštění*/
		run_id?: number|null;
	}
	const enum GGinladlDtoNames { adl = "adl", dat_start = "dat_start", ixs_gdt = "ixs_gdt", kopie = "kopie", run_id = "run_id",}
	const enum GGinladlDtoFragments { adl = "*", dat_start = "*", ixs_gdt = "*", kopie = "*", run_id = "*",}
	const enum GGinladlDtoTypes { adl = "string", dat_start = "JsonDate", ixs_gdt = "string", kopie = "JsonBlob", run_id = "number",}
	const enum GGinladlDtoTypeLengths { adl = 100, ixs_gdt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinlaibDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginlaib
	*      ginlaib
	*/
	interface GGinlaibDto {
		ser_cislo?: number|null;
		modul_aib?: string|null;
		request_id?: string|null;
		dat_start?: JsonDate|null;
		/**Por.číslo přihlášení*/
		log_por_cislo?: number|null;
		vysledek?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		vysledek_ext?: number|null;
		chyba_txt_ext?: string|null;
		/**URL*/
		url?: string|null;
		metoda_aib?: string|null;
		/**Web config hash*/
		web_config_hash?: string|null;
		/**Revize aib*/
		revize_aib?: string|null;
		doba_v_konektoru?: JsonDecimal|null;
	}
	const enum GGinlaibDtoNames { ser_cislo = "ser_cislo", modul_aib = "modul_aib", request_id = "request_id", dat_start = "dat_start", log_por_cislo = "log_por_cislo", vysledek = "vysledek", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", vysledek_ext = "vysledek_ext", chyba_txt_ext = "chyba_txt_ext", url = "url", metoda_aib = "metoda_aib", web_config_hash = "web_config_hash", revize_aib = "revize_aib", doba_v_konektoru = "doba_v_konektoru",}
	const enum GGinlaibDtoFragments { ser_cislo = "*", modul_aib = "*", request_id = "*", dat_start = "*", log_por_cislo = "*", vysledek = "*", dat_zmena = "*", zmenu_prov = "*", vysledek_ext = "*", chyba_txt_ext = "*", url = "*", metoda_aib = "*", web_config_hash = "*", revize_aib = "*", doba_v_konektoru = "*",}
	const enum GGinlaibDtoTypes { ser_cislo = "number", modul_aib = "string", request_id = "string", dat_start = "JsonDate", log_por_cislo = "number", vysledek = "number", dat_zmena = "JsonDate", zmenu_prov = "string", vysledek_ext = "number", chyba_txt_ext = "string", url = "string", metoda_aib = "string", web_config_hash = "string", revize_aib = "string", doba_v_konektoru = "JsonDecimal",}
	const enum GGinlaibDtoTypeLengths { modul_aib = 15, request_id = 36, zmenu_prov = 12, chyba_txt_ext = 254, url = 1000, metoda_aib = 254, web_config_hash = 254, revize_aib = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinlgdtDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginlgdt
	*      Historie spuštění GDZ
	*/
	interface GGinlgdtDto {
		/**Balík GDZ*/
		ixs_gdt?: string|null;
		/**Čas spuštění*/
		dat_start?: JsonDate|null;
		/**Čas spuštění
		*      Pokud není nastaven, potom balík nedoběhl dokonce.
		*/
		dat_stop?: JsonDate|null;
		/**Výsledek spuštění
		*      Textový popis výsledku akce
		*/
		vysledek_txt?: string|null;
		/**Verze balíku*/
		verze?: number|null;
		/**ID souštění
		*      Generované, unikátní ID spuštění balíku
		*/
		run_id?: number|null;
		pc_name?: string|null;
		user_name?: string|null;
		/**Verze ADT*/
		verze_adt?: string|null;
		/**Revize*/
		revize?: string|null;
		/**Por.číslo přihlášení*/
		log_por_cislo?: number|null;
		/**Osoba, funkce*/
		nazev_rf?: string|null;
		vysledek?: number|null;
	}
	const enum GGinlgdtDtoNames { ixs_gdt = "ixs_gdt", dat_start = "dat_start", dat_stop = "dat_stop", vysledek_txt = "vysledek_txt", verze = "verze", run_id = "run_id", pc_name = "pc_name", user_name = "user_name", verze_adt = "verze_adt", revize = "revize", log_por_cislo = "log_por_cislo", nazev_rf = "nazev_rf", vysledek = "vysledek",}
	const enum GGinlgdtDtoFragments { ixs_gdt = "*", dat_start = "*", dat_stop = "*", vysledek_txt = "*", verze = "*", run_id = "*", pc_name = "*", user_name = "*", verze_adt = "*", revize = "*", log_por_cislo = "*", nazev_rf = "*", vysledek = "*",}
	const enum GGinlgdtDtoTypes { ixs_gdt = "string", dat_start = "JsonDate", dat_stop = "JsonDate", vysledek_txt = "string", verze = "number", run_id = "number", pc_name = "string", user_name = "string", verze_adt = "string", revize = "string", log_por_cislo = "number", nazev_rf = "string", vysledek = "number",}
	const enum GGinlgdtDtoTypeLengths { ixs_gdt = 12, vysledek_txt = 254, pc_name = 254, user_name = 254, verze_adt = 16, revize = 15, nazev_rf = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinllogDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginllog*/
	interface GGinllogDto {
		/**DBCOLUMN:ginllog.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginllog.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:ginllog.faze*/
		faze?: string|null;
		/**DBCOLUMN:ginllog.verze*/
		verze?: number|null;
		/**DBCOLUMN:ginllog.sub_verze*/
		sub_verze?: number|null;
		/**DBCOLUMN:ginllog.revize*/
		revize?: string|null;
		/**DBCOLUMN:ginllog.dat_login*/
		dat_login?: JsonDate|null;
		/**DBCOLUMN:ginllog.dat_ping*/
		dat_ping?: JsonDate|null;
		/**DBCOLUMN:ginllog.dat_logout*/
		dat_logout?: JsonDate|null;
		/**DBCOLUMN:ginllog.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:ginllog.ip_adr*/
		ip_adr?: string|null;
		/**DBCOLUMN:ginllog.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ginllog.rezim*/
		rezim?: number|null;
		/**DBCOLUMN:ginllog.ixs_ins*/
		ixs_ins?: string|null;
		/**DBCOLUMN:ginllog.login_uziv*/
		login_uziv?: string|null;
		/**DBCOLUMN:ginllog.login_usr*/
		login_usr?: string|null;
		/**DBCOLUMN:ginllog.sessid*/
		sessid?: number|null;
		/**DBCOLUMN:ginllog.ixs_zmp*/
		ixs_zmp?: string|null;
		/**DBCOLUMN:ginllog.login_win*/
		login_win?: string|null;
		/**DBCOLUMN:ginllog.comp_name*/
		comp_name?: string|null;
		/**DBCOLUMN:ginllog.dat_login_fun*/
		dat_login_fun?: JsonDate|null;
		/**DBCOLUMN:ginllog.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginllog.sub_verze_db*/
		sub_verze_db?: number|null;
		/**DBCOLUMN:ginllog.sub_verze_adz*/
		sub_verze_adz?: number|null;
		/**DBCOLUMN:ginllog.kultura*/
		kultura?: number|null;
		/**DBCOLUMN:ginllog.ixs_exu*/
		ixs_exu?: string|null;
		/**DBCOLUMN:ginllog.por_cislo_exu*/
		por_cislo_exu?: number|null;
		/**DBCOLUMN:ginllog.ixs_usr*/
		ixs_usr?: string|null;
		/**DBCOLUMN:ginllog.ixs_ext*/
		ixs_ext?: string|null;
		/**DBCOLUMN:ginllog.priz_remote*/
		priz_remote?: number|null;
		/**DBCOLUMN:ginllog.typ_remote*/
		typ_remote?: number|null;
		/**DBCOLUMN:ginllog.login_remote*/
		login_remote?: string|null;
		/**DBCOLUMN:ginllog.comp_name_remote*/
		comp_name_remote?: string|null;
		/**DBCOLUMN:ginllog.ip_adr_remote*/
		ip_adr_remote?: string|null;
		/**DBCOLUMN:ginllog.dat_login_remote*/
		dat_login_remote?: JsonDate|null;
		/**DBCOLUMN:ginllog.ico*/
		ico?: string|null;
	}
	const enum GGinllogDtoNames { lic = "lic", log_por_cislo = "log_por_cislo", faze = "faze", verze = "verze", sub_verze = "sub_verze", revize = "revize", dat_login = "dat_login", dat_ping = "dat_ping", dat_logout = "dat_logout", ixs_ref = "ixs_ref", ip_adr = "ip_adr", ixs_fun = "ixs_fun", rezim = "rezim", ixs_ins = "ixs_ins", login_uziv = "login_uziv", login_usr = "login_usr", sessid = "sessid", ixs_zmp = "ixs_zmp", login_win = "login_win", comp_name = "comp_name", dat_login_fun = "dat_login_fun", ixs_lpc = "ixs_lpc", sub_verze_db = "sub_verze_db", sub_verze_adz = "sub_verze_adz", kultura = "kultura", ixs_exu = "ixs_exu", por_cislo_exu = "por_cislo_exu", ixs_usr = "ixs_usr", ixs_ext = "ixs_ext", priz_remote = "priz_remote", typ_remote = "typ_remote", login_remote = "login_remote", comp_name_remote = "comp_name_remote", ip_adr_remote = "ip_adr_remote", dat_login_remote = "dat_login_remote", ico = "ico",}
	const enum GGinllogDtoFragments { lic = "*", log_por_cislo = "*", faze = "*", verze = "*", sub_verze = "*", revize = "*", dat_login = "*", dat_ping = "*", dat_logout = "*", ixs_ref = "*", ip_adr = "*", ixs_fun = "*", rezim = "*", ixs_ins = "*", login_uziv = "*", login_usr = "*", sessid = "*", ixs_zmp = "*", login_win = "*", comp_name = "*", dat_login_fun = "*", ixs_lpc = "*", sub_verze_db = "*", sub_verze_adz = "*", kultura = "*", ixs_exu = "*", por_cislo_exu = "*", ixs_usr = "*", ixs_ext = "*", priz_remote = "*", typ_remote = "*", login_remote = "*", comp_name_remote = "*", ip_adr_remote = "*", dat_login_remote = "*", ico = "*",}
	const enum GGinllogDtoTypes { lic = "string", log_por_cislo = "number", faze = "string", verze = "number", sub_verze = "number", revize = "string", dat_login = "JsonDate", dat_ping = "JsonDate", dat_logout = "JsonDate", ixs_ref = "string", ip_adr = "string", ixs_fun = "string", rezim = "number", ixs_ins = "string", login_uziv = "string", login_usr = "string", sessid = "number", ixs_zmp = "string", login_win = "string", comp_name = "string", dat_login_fun = "JsonDate", ixs_lpc = "string", sub_verze_db = "number", sub_verze_adz = "number", kultura = "number", ixs_exu = "string", por_cislo_exu = "number", ixs_usr = "string", ixs_ext = "string", priz_remote = "number", typ_remote = "number", login_remote = "string", comp_name_remote = "string", ip_adr_remote = "string", dat_login_remote = "JsonDate", ico = "string",}
	const enum GGinllogDtoTypeLengths { lic = 4, faze = 8, revize = 30, ixs_ref = 12, ip_adr = 50, ixs_fun = 12, ixs_ins = 12, login_uziv = 60, login_usr = 60, ixs_zmp = 12, login_win = 60, comp_name = 254, ixs_lpc = 12, ixs_exu = 12, ixs_usr = 12, ixs_ext = 12, login_remote = 254, comp_name_remote = 254, ip_adr_remote = 254, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinloapDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginloap
	*      ginloap
	*/
	interface GGinloapDto {
		ser_cislo?: number|null;
		request_id?: string|null;
		/**OAuth profil*/
		ixs_oap?: string|null;
		chyba_txt_ext?: string|null;
		/**Programová fáze*/
		faze?: string|null;
		/**Revize*/
		revize?: string|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		id_udalost?: Gordic.General.OAuthJournalEvents|null;
		/**Popis akce*/
		proces_txt?: string|null;
	}
	const enum GGinloapDtoNames { ser_cislo = "ser_cislo", request_id = "request_id", ixs_oap = "ixs_oap", chyba_txt_ext = "chyba_txt_ext", faze = "faze", revize = "revize", dat_zmena = "dat_zmena", id_udalost = "id_udalost", proces_txt = "proces_txt",}
	const enum GGinloapDtoFragments { ser_cislo = "*", request_id = "*", ixs_oap = "*", chyba_txt_ext = "*", faze = "*", revize = "*", dat_zmena = "*", id_udalost = "*", proces_txt = "*",}
	const enum GGinloapDtoTypes { ser_cislo = "number", request_id = "string", ixs_oap = "string", chyba_txt_ext = "string", faze = "string", revize = "string", dat_zmena = "JsonDate", id_udalost = "Gordic.General.OAuthJournalEvents", proces_txt = "string",}
	const enum GGinloapDtoTypeLengths { request_id = 55, ixs_oap = 12, chyba_txt_ext = 1000, faze = 8, revize = 15, proces_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinqbudDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginqbud
	*      Přístupový klíč na budovy
	*/
	interface GGinqbudDto {
		acckey?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinqbudDtoNames { acckey = "acckey", ico = "ico", budova_kod = "budova_kod", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinqbudDtoFragments { acckey = "*", ico = "*", budova_kod = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinqbudDtoTypes { acckey = "string", ico = "string", budova_kod = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinqbudDtoTypeLengths { acckey = 12, ico = 10, budova_kod = 8, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinqmisDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginqmis
	*      Přístupový klíč na místnosti
	*/
	interface GGinqmisDto {
		acckey?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy*/
		segment_kod?: string|null;
		/**Místnost*/
		mistnost_kod?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinqmisDtoNames { acckey = "acckey", ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinqmisDtoFragments { acckey = "*", ico = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinqmisDtoTypes { acckey = "string", ico = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinqmisDtoTypeLengths { acckey = 12, ico = 10, budova_kod = 8, segment_kod = 8, mistnost_kod = 8, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinqsbuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginqsbu
	*      Přístupový klíč na segmenty budov
	*/
	interface GGinqsbuDto {
		acckey?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy*/
		segment_kod?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinqsbuDtoNames { acckey = "acckey", ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinqsbuDtoFragments { acckey = "*", ico = "*", budova_kod = "*", segment_kod = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinqsbuDtoTypes { acckey = "string", ico = "string", budova_kod = "string", segment_kod = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinqsbuDtoTypeLengths { acckey = 12, ico = 10, budova_kod = 8, segment_kod = 8, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsaivDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsaiv
	*      Administrace OCR vytěžovačů
	*/
	interface GGinsaivDto {
		/**Identifikátor OCR vytěžovače*/
		ixs_aiv?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Poskytovatele OCR vytěžovače*/
		aiv_poskyt?: number|null;
		/**OAuth profil*/
		ixs_oap?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Název*/
		nazev?: string|null;
	}
	const enum GGinsaivDtoNames { ixs_aiv = "ixs_aiv", ico = "ico", aiv_poskyt = "aiv_poskyt", ixs_oap = "ixs_oap", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev",}
	const enum GGinsaivDtoFragments { ixs_aiv = "*", ico = "*", aiv_poskyt = "*", ixs_oap = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*",}
	const enum GGinsaivDtoTypes { ixs_aiv = "string", ico = "string", aiv_poskyt = "number", ixs_oap = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string",}
	const enum GGinsaivDtoTypeLengths { ixs_aiv = 12, ico = 10, ixs_oap = 12, zmenu_prov = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsalvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsalv
	*      Sestavy - generátor
	*/
	interface GGinsalvDto {
		/**Identifikátor sestavy*/
		ixs_alv?: string|null;
		id_ses?: string|null;
		/**Název sestavy*/
		nazev?: string|null;
		dat_modif?: JsonDate|null;
		rokmes_od?: string|null;
		rokmes_do?: string|null;
		tema?: string|null;
		typ_alg?: string|null;
		typ_vyst?: string|null;
		typ_alv?: string|null;
		priz_sor?: number|null;
		verze_db_min?: number|null;
		/**Submodel*/
		submodel?: string|null;
		sub_verze_db_min?: number|null;
		/**Identifikátor stromu sestav*/
		ixs_str?: string|null;
		xmeta_ver?: number|null;
		xmeta_subver?: number|null;
		maker?: string|null;
		file_name?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		priz_dist?: number|null;
		ixs_frm?: string|null;
		ixs_xme?: string|null;
		xmeta?: string|null;
		/**Kategorie typu dokumentu*/
		ktg_typ?: number|null;
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		priz_vazby?: number|null;
		zpus_uloz?: number|null;
		priz_zmeny?: number|null;
		priz_dotaz?: number|null;
		priz_podr?: number|null;
		filtr_alv?: string|null;
		/**Datum a čas vzniku záznamu*/
		dat_mpd?: JsonDate|null;
		priz_podp?: number|null;
		priz_deb?: number|null;
		priz_ipa?: number|null;
		ixs_vkz?: string|null;
		form_vyst?: string|null;
		priz_odloz?: number|null;
		priz_zud?: number|null;
		revize_db_min?: string|null;
		/**Šablona elektronických podpisů*/
		ixs_dpo?: string|null;
		compiler_version?: string|null;
		compile_version?: number|null;
		compile_build?: number|null;
		compile_revision?: number|null;
	}
	const enum GGinsalvDtoNames { ixs_alv = "ixs_alv", id_ses = "id_ses", nazev = "nazev", dat_modif = "dat_modif", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", tema = "tema", typ_alg = "typ_alg", typ_vyst = "typ_vyst", typ_alv = "typ_alv", priz_sor = "priz_sor", verze_db_min = "verze_db_min", submodel = "submodel", sub_verze_db_min = "sub_verze_db_min", ixs_str = "ixs_str", xmeta_ver = "xmeta_ver", xmeta_subver = "xmeta_subver", maker = "maker", file_name = "file_name", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_dist = "priz_dist", ixs_frm = "ixs_frm", ixs_xme = "ixs_xme", xmeta = "xmeta", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", priz_vazby = "priz_vazby", zpus_uloz = "zpus_uloz", priz_zmeny = "priz_zmeny", priz_dotaz = "priz_dotaz", priz_podr = "priz_podr", filtr_alv = "filtr_alv", dat_mpd = "dat_mpd", priz_podp = "priz_podp", priz_deb = "priz_deb", priz_ipa = "priz_ipa", ixs_vkz = "ixs_vkz", form_vyst = "form_vyst", priz_odloz = "priz_odloz", priz_zud = "priz_zud", revize_db_min = "revize_db_min", ixs_dpo = "ixs_dpo", compiler_version = "compiler_version", compile_version = "compile_version", compile_build = "compile_build", compile_revision = "compile_revision",}
	const enum GGinsalvDtoFragments { ixs_alv = "*", id_ses = "*", nazev = "*", dat_modif = "*", rokmes_od = "*", rokmes_do = "*", tema = "*", typ_alg = "*", typ_vyst = "*", typ_alv = "*", priz_sor = "*", verze_db_min = "*", submodel = "*", sub_verze_db_min = "*", ixs_str = "*", xmeta_ver = "*", xmeta_subver = "*", maker = "*", file_name = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", priz_dist = "*", ixs_frm = "*", ixs_xme = "*", xmeta = "*", ktg_typ = "*", ixs_typ = "*", priz_vazby = "*", zpus_uloz = "*", priz_zmeny = "*", priz_dotaz = "*", priz_podr = "*", filtr_alv = "*", dat_mpd = "*", priz_podp = "*", priz_deb = "*", priz_ipa = "*", ixs_vkz = "*", form_vyst = "*", priz_odloz = "*", priz_zud = "*", revize_db_min = "*", ixs_dpo = "*", compiler_version = "*", compile_version = "*", compile_build = "*", compile_revision = "*",}
	const enum GGinsalvDtoTypes { ixs_alv = "string", id_ses = "string", nazev = "string", dat_modif = "JsonDate", rokmes_od = "string", rokmes_do = "string", tema = "string", typ_alg = "string", typ_vyst = "string", typ_alv = "string", priz_sor = "number", verze_db_min = "number", submodel = "string", sub_verze_db_min = "number", ixs_str = "string", xmeta_ver = "number", xmeta_subver = "number", maker = "string", file_name = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_dist = "number", ixs_frm = "string", ixs_xme = "string", xmeta = "string", ktg_typ = "number", ixs_typ = "string", priz_vazby = "number", zpus_uloz = "number", priz_zmeny = "number", priz_dotaz = "number", priz_podr = "number", filtr_alv = "string", dat_mpd = "JsonDate", priz_podp = "number", priz_deb = "number", priz_ipa = "number", ixs_vkz = "string", form_vyst = "string", priz_odloz = "number", priz_zud = "number", revize_db_min = "string", ixs_dpo = "string", compiler_version = "string", compile_version = "number", compile_build = "number", compile_revision = "number",}
	const enum GGinsalvDtoTypeLengths { ixs_alv = 12, id_ses = 16, nazev = 254, rokmes_od = 6, rokmes_do = 6, tema = 15, typ_alg = 20, typ_vyst = 3, typ_alv = 3, submodel = 3, ixs_str = 12, maker = 4, file_name = 12, poznamka = 254, zmenu_prov = 12, ixs_frm = 12, ixs_xme = 12, xmeta = 8, ixs_typ = 12, filtr_alv = 25, ixs_vkz = 12, form_vyst = 10, revize_db_min = 12, ixs_dpo = 12, compiler_version = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsausDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsaus*/
	interface GGinsausDto {
		/**DBCOLUMN:ginsaus.ixs_aus*/
		ixs_aus?: string|null;
		/**DBCOLUMN:ginsaus.ixs_aus_nad*/
		ixs_aus_nad?: string|null;
		/**DBCOLUMN:ginsaus.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginsaus.iud_por*/
		iud_por?: number|null;
		/**DBCOLUMN:ginsaus.iud_por_end*/
		iud_por_end?: number|null;
		/**DBCOLUMN:ginsaus.dat_aus*/
		dat_aus?: JsonDate|null;
		/**DBCOLUMN:ginsaus.dat_aus_end*/
		dat_aus_end?: JsonDate|null;
		/**DBCOLUMN:ginsaus.proces_id*/
		proces_id?: string|null;
		/**DBCOLUMN:ginsaus.proces_txt*/
		proces_txt?: string|null;
		/**DBCOLUMN:ginsaus.ktg_uziv_akce*/
		ktg_uziv_akce?: number|null;
		/**DBCOLUMN:ginsaus.path_akce*/
		path_akce?: string|null;
		/**DBCOLUMN:ginsaus.class_akce*/
		class_akce?: string|null;
		/**DBCOLUMN:ginsaus.param_akce*/
		param_akce?: string|null;
		/**DBCOLUMN:ginsaus.typ_obj*/
		typ_obj?: number|null;
		/**DBCOLUMN:ginsaus.sxs*/
		sxs?: string|null;
		/**DBCOLUMN:ginsaus.aus_trvani_ms*/
		aus_trvani_ms?: number|null;
	}
	const enum GGinsausDtoNames { ixs_aus = "ixs_aus", ixs_aus_nad = "ixs_aus_nad", ixs_lpc = "ixs_lpc", iud_por = "iud_por", iud_por_end = "iud_por_end", dat_aus = "dat_aus", dat_aus_end = "dat_aus_end", proces_id = "proces_id", proces_txt = "proces_txt", ktg_uziv_akce = "ktg_uziv_akce", path_akce = "path_akce", class_akce = "class_akce", param_akce = "param_akce", typ_obj = "typ_obj", sxs = "sxs", aus_trvani_ms = "aus_trvani_ms",}
	const enum GGinsausDtoFragments { ixs_aus = "*", ixs_aus_nad = "*", ixs_lpc = "*", iud_por = "*", iud_por_end = "*", dat_aus = "*", dat_aus_end = "*", proces_id = "*", proces_txt = "*", ktg_uziv_akce = "*", path_akce = "*", class_akce = "*", param_akce = "*", typ_obj = "*", sxs = "*", aus_trvani_ms = "*",}
	const enum GGinsausDtoTypes { ixs_aus = "string", ixs_aus_nad = "string", ixs_lpc = "string", iud_por = "number", iud_por_end = "number", dat_aus = "JsonDate", dat_aus_end = "JsonDate", proces_id = "string", proces_txt = "string", ktg_uziv_akce = "number", path_akce = "string", class_akce = "string", param_akce = "string", typ_obj = "number", sxs = "string", aus_trvani_ms = "number",}
	const enum GGinsausDtoTypeLengths { ixs_aus = 12, ixs_aus_nad = 12, ixs_lpc = 12, proces_id = 254, proces_txt = 254, path_akce = 254, class_akce = 254, param_akce = 254, sxs = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsbudDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsbud
	*      Budova
	*/
	interface GGinsbudDto {
		/**IČO*/
		ico?: string|null;
		/**Kód budovy
		*      Kód budovy
		*/
		budova_kod?: string|null;
		/**Název budovy
		*      Název budovy
		*/
		budova_naz?: string|null;
		/**Platnost OD
		*      Platnost OD
		*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Uživatel
		*      Interní subjekt - uživatel objektu
		*/
		ixs_esu_uziv?: string|null;
		/**Správce budovy
		*      Interní subjekt - Správce objektu
		*/
		ixs_esu_spr?: string|null;
		/**Druh budovy
		*      Druh budovy
		*/
		budova_druh?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Čárový kód
		*      Čárový kód
		*/
		id_kod?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Elementární objekt*/
		ixs_elo?: string|null;
		inv_cis?: string|null;
	}
	const enum GGinsbudDtoNames { ico = "ico", budova_kod = "budova_kod", budova_naz = "budova_naz", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", budova_druh = "budova_druh", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_kod = "id_kod", ixs_lpc = "ixs_lpc", ixs_elo = "ixs_elo", inv_cis = "inv_cis",}
	const enum GGinsbudDtoFragments { ico = "*", budova_kod = "*", budova_naz = "*", dat_od = "*", dat_do = "*", poznamka = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", budova_druh = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_kod = "*", ixs_lpc = "*", ixs_elo = "*", inv_cis = "*",}
	const enum GGinsbudDtoTypes { ico = "string", budova_kod = "string", budova_naz = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", budova_druh = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_kod = "string", ixs_lpc = "string", ixs_elo = "string", inv_cis = "string",}
	const enum GGinsbudDtoTypeLengths { ico = 10, budova_kod = 8, budova_naz = 50, poznamka = 254, ixs_esu_uziv = 12, ixs_esu_spr = 12, zmenu_prov = 12, id_kod = 12, ixs_lpc = 12, ixs_elo = 12, inv_cis = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinscfdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginscfd
	*      Konfigurace databáze
	*/
	interface GGinscfdDto {
		cs_db?: number|null;
		/**Typ instalace*/
		typ_inst?: number|null;
		/**Příznak archivní databáze*/
		priz_archiv?: number|null;
		/**Typ uložení elektronických písemností*/
		priz_blob?: number|null;
		/**Zámek databáze
		*      Příznak zámku celé databáze pro běžné aplikace a běžné uživatele. Používá se např. při reinstalacích databáze.
		*/
		stav_db?: number|null;
		/**Vzkaz pro uživatele
		*      Vzkaz pro uživatele.
		*/
		vzkaz?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**příznak zda má adm01 povolit měnit blokace*/
		priz_adm?: number|null;
		/**Čas avizace
		*      Datum a čas, od kdy se uživatelům začne zobrazovat avizacační text ze sloupce ginscfd.tavi
		*/
		dat_avi?: JsonDate|null;
		/**Čas platnosti licence celé DB
		*      Čas do kterého platí licence celé DB. Po tomto čase se systém uzamkne.
		*/
		dat_do?: JsonDate|null;
		/**Text časové avizace
		*      Viz. popis sloupce dat_avi
		*/
		tavi?: string|null;
		/**Text po časovém uzamčení
		*      Měl to být text zobrazovaný při uzamčení databáze vypršením licenčního certifikátu. Ve výsledku se nepoužívá.
		*/
		tstop?: string|null;
		/**Příznak EKO části databáze*/
		s_eko?: number|null;
		/**Příznak SSL části databáze*/
		s_ssl?: number|null;
		s_reg?: number|null;
		/**Hlavní verze databáze GINIS
		*      Hlavní verze databáze systému GINIS
		*/
		verze_db?: number|null;
		/**Subverze databáze
		*      Druhá část kompletní verze databáze. Tzv. subverze
		*/
		sub_verze_db?: number|null;
		pwstat?: string|null;
		/**Licence*/
		lic?: string|null;
		/**Jeden
		*      Pomocný technologický sloupec zajišťující jednořádkovou tabulku
		*/
		jeden?: number|null;
		xxdb?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		blobsp?: string|null;
		vzkaz_16?: string|null;
		vzkaz_32?: string|null;
		vzkaz_ww?: string|null;
		/**příznak povolení fulltextu*/
		priz_ftx?: number|null;
		/**Povolení subsystému el. úložišť*/
		priz_ele?: number|null;
		/**Povolení e-Podatelny a e-Výpravny*/
		priz_eps?: number|null;
		/**typ serveru pro ukládání el. písemností*/
		typ_srv?: number|null;
		/**Název projektu (databáze)*/
		projekt?: string|null;
		/**Příznak DEMO
		*      Příznak, že se jedné o DEMO/TESTOVACI/SKOLICI databázi
		*/
		priz_d?: number|null;
		/**Příznak pro povolení vícenásobného přihlášení na jednu funkci na testovacích databázích*/
		priz_f?: number|null;
		/**OS command pro změnu hesla uživatele
		*      Platí pouze pro INFORMIX a možná už ani tam ne. Jedná se o OS příkaz, určený pro změnu hesla uživatele
		*/
		zmenaa?: string|null;
		/**Typ DB stroje
		*      Identifikace typu DB stroje, na kterém je aktuální databáze GINIS provozována
		*/
		typ_db?: string|null;
		/**Jméno databáze
		*      Pojmenování databáze na databázovém serveru
		*/
		db_name?: string|null;
		/**Jméno databázového serveru
		*      Jedná se o sítové jméno databázového serveru na kterém aktuálně běží instance GINIS databáze
		*/
		servername?: string|null;
		/**Mail pro chyby
		*      Mail o zaslání hlášení o chybách
		*/
		err_mail?: string|null;
		sub_verze_dbo?: number|null;
		priz_edit_do?: number|null;
		int_blok_aut?: number|null;
		rrdb?: string|null;
		/**Přepnuto na testovací databázi od*/
		dat_test_od?: JsonDate|null;
		vzkaz_test?: string|null;
		vodotisk?: string|null;
		/**Povolení událostního systému*/
		s_gor_event?: number|null;
		cfg_uda?: string|null;
		s_prep?: number|null;
		/**Subverze databáze pro ADT04. Nastavují ho jen balíky typu M, K, R*/
		sub_verze_adz?: number|null;
		/**Typ implementace*/
		tyi?: string|null;
		/**Kultura databáze
		*      Hlavní kultura databáze
		*/
		kultura?: number|null;
		gin_typ_inst?: string|null;
		/**Čas posledního rebootu databázevého server
		*      Čas posledního detekovaného rebootu databázového stroje
		*/
		dat_last_reboot?: JsonDate|null;
		/**Nastavení testu aktuálnosti ADZ při povyšování databáze*/
		netest_akt_adz?: number|null;
		priz_new_db?: number|null;
		/**Nastavení odesílání ADL po povýšení databáze*/
		priz_mail_adl?: number|null;
		db_name_test?: string|null;
		servername_test?: string|null;
		/**Revize subverze databáze 
		*      Třetí část kompletní verze databáze.
		*/
		revize_adz?: number|null;
		/**Příznak cluster DB serveru
		*      Příznak, že databáze je provozována na cluster DB serveru
		*/
		priz_cluster?: number|null;
		pnsdb?: string|null;
		pnsxxdb?: string|null;
		/**Stát umístění databáze*/
		stat_sis_aaa?: string|null;
		/**Multi kulturní databáze
		*      Příznak, že aplikace i databáze mají uživateli zajistit možnost přepnutí lokalizace aplikace, číselníků a textů v rámci SP
		*/
		priz_multikult?: number|null;
		pruh_barva?: number|null;
		pruh_zkratka?: string|null;
		priz_min_rgt?: number|null;
		/**Mail ADL*/
		mail_adl?: string|null;
		tel_adl?: string|null;
		/**Poznámka pro ADL*/
		pozn_adl?: string|null;
		url_histxml?: string|null;
		url_gordic?: string|null;
		url_vsprava?: string|null;
		ftp_dist?: string|null;
		ftp_dist_ldb?: string|null;
		ftp_dist_pdb?: string|null;
		url_histxmldebug?: string|null;
		/**adresa pro avízo o ukončení reinstalace*/
		mail_adl_info?: string|null;
		/**Mail pro chyby*/
		mail_chyby?: string|null;
		/**Telefon pro chyby*/
		tel_chyby?: string|null;
		/**Poznámka k hlášení o chybě*/
		pozn_chyby?: string|null;
		url_teamviewer?: string|null;
		klon_id?: string|null;
		hhdb?: string|null;
		/**Čas vzniku DB
		*      Čas vzniku této databáze - prvotní inicializace databáze
		*/
		dat_vznik_db?: JsonDate|null;
		/**HASH lic.cert.
		*      Kontrolní hash aktuálně platného/načteného licenčního certifikátu systému GINIS
		*/
		crc_lic?: string|null;
		pocet_lic_r?: number|null;
		pocet_lic_t?: number|null;
		pocet_lic_m?: number|null;
		pocet_lic_s?: number|null;
		dat_ldcl?: JsonDate|null;
		/**Heslo do DEBUG režimu
		*      Zakódovaná podoba hesla do debug.režimu. Může být NULL a potom je heslo pevně stanoveno pro každou verzi databáze GINIS.
		*/
		pbug?: string|null;
		/**Edice databáze
		*      Písmeno přidělené pro edici systému GINIS - toto písmeno určuje rozsah funkcionality celého systému
		*/
		edi?: string|null;
		/**Příznak UNICODE databáze
		*      Příznak, že celá databáze je provozována v UNICODE režimu
		*/
		priz_unicode?: number|null;
		/**Datum a čas vzniku záznamu*/
		dat_mpd?: JsonDate|null;
		/**Příznak AZURE DB
		*      Příznak, že databáze je provozována na cloud platformě AZURE
		*/
		priz_azure?: number|null;
		/**Počet sekund po kterých by aplikace v nečinnosti měla zavolat databázový ping ( volání spg_login_refresh ) a nebo se od databáze odpojit. Odpojení se má realizovat pokud priz_disconnect = 1 nebo priz_azure = 1 ( aplikace se následně má připojit až ve chvíli, kdy to bude potřebovat )*/
		idle_ping?: number|null;
		/**Příznak, že Win aplikace se mají od databáze odpojovat a nemají tedy držet trvalý konekt.*/
		priz_disconnect?: number|null;
		priz_session_audit?: number|null;
		/**Anonymizovat DEMO
		*      Příznak že při přepnutí ostré databáze na DEMO databázi se může spustit proces anonymizace osobních dat
		*/
		priz_demo_del_esu?: number|null;
		sessid_anon?: JsonDecimal|null;
		/**ID instance databáze
		*      Unikátně generované ID pro každou instanci databáze - snaží se odlišit instalace ostré databáze od jejich jednotlivých kopií
		*/
		db_guid?: string|null;
		/**Více organizací
		*      Příznak, že v databázi provozuje systém GINIS více samostatných organizací současně - jejich data by za všech okolností měla být oddělena na základě hodnoty ICO - které je pro každou samostatnou databázi unikátní.
		*/
		priz_multitenant?: number|null;
		priz_ginsfil?: number|null;
		priz_ginssou?: number|null;
		priz_vyvoj?: number|null;
		dat_zmena_lock?: JsonDate|null;
		zmenu_prov_lock?: string|null;
		dat_zmena_vzkaz?: JsonDate|null;
		zmenu_prov_vzkaz?: string|null;
		/**Nekontrolovat GDZ
		*      Příznak, že pro tuto databázi není síťově dostupný GDT portál podpory a proto se nemají on-line kontrolovat verze spouštěných GDZ balíků
		*/
		gdz_nocheckversion?: number|null;
		/**Vícefaktorové autentizace
		*      Povolení v rámci databáze používat vícefaktorovou autentizaci
		*/
		priz_totp?: number|null;
		p_contained_users?: number|null;
		url_skoleni?: string|null;
		/**Režim licencování*/
		rezim_lic_cert?: number|null;
		collation_cs_col?: string|null;
		lock_timeout?: number|null;
		command_timeout?: number|null;
	}
	const enum GGinscfdDtoNames { cs_db = "cs_db", typ_inst = "typ_inst", priz_archiv = "priz_archiv", priz_blob = "priz_blob", stav_db = "stav_db", vzkaz = "vzkaz", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_adm = "priz_adm", dat_avi = "dat_avi", dat_do = "dat_do", tavi = "tavi", tstop = "tstop", s_eko = "s_eko", s_ssl = "s_ssl", s_reg = "s_reg", verze_db = "verze_db", sub_verze_db = "sub_verze_db", pwstat = "pwstat", lic = "lic", jeden = "jeden", xxdb = "xxdb", poznamka = "poznamka", blobsp = "blobsp", vzkaz_16 = "vzkaz_16", vzkaz_32 = "vzkaz_32", vzkaz_ww = "vzkaz_ww", priz_ftx = "priz_ftx", priz_ele = "priz_ele", priz_eps = "priz_eps", typ_srv = "typ_srv", projekt = "projekt", priz_d = "priz_d", priz_f = "priz_f", zmenaa = "zmenaa", typ_db = "typ_db", db_name = "db_name", servername = "servername", err_mail = "err_mail", sub_verze_dbo = "sub_verze_dbo", priz_edit_do = "priz_edit_do", int_blok_aut = "int_blok_aut", rrdb = "rrdb", dat_test_od = "dat_test_od", vzkaz_test = "vzkaz_test", vodotisk = "vodotisk", s_gor_event = "s_gor_event", cfg_uda = "cfg_uda", s_prep = "s_prep", sub_verze_adz = "sub_verze_adz", tyi = "tyi", kultura = "kultura", gin_typ_inst = "gin_typ_inst", dat_last_reboot = "dat_last_reboot", netest_akt_adz = "netest_akt_adz", priz_new_db = "priz_new_db", priz_mail_adl = "priz_mail_adl", db_name_test = "db_name_test", servername_test = "servername_test", revize_adz = "revize_adz", priz_cluster = "priz_cluster", pnsdb = "pnsdb", pnsxxdb = "pnsxxdb", stat_sis_aaa = "stat_sis_aaa", priz_multikult = "priz_multikult", pruh_barva = "pruh_barva", pruh_zkratka = "pruh_zkratka", priz_min_rgt = "priz_min_rgt", mail_adl = "mail_adl", tel_adl = "tel_adl", pozn_adl = "pozn_adl", url_histxml = "url_histxml", url_gordic = "url_gordic", url_vsprava = "url_vsprava", ftp_dist = "ftp_dist", ftp_dist_ldb = "ftp_dist_ldb", ftp_dist_pdb = "ftp_dist_pdb", url_histxmldebug = "url_histxmldebug", mail_adl_info = "mail_adl_info", mail_chyby = "mail_chyby", tel_chyby = "tel_chyby", pozn_chyby = "pozn_chyby", url_teamviewer = "url_teamviewer", klon_id = "klon_id", hhdb = "hhdb", dat_vznik_db = "dat_vznik_db", crc_lic = "crc_lic", pocet_lic_r = "pocet_lic_r", pocet_lic_t = "pocet_lic_t", pocet_lic_m = "pocet_lic_m", pocet_lic_s = "pocet_lic_s", dat_ldcl = "dat_ldcl", pbug = "pbug", edi = "edi", priz_unicode = "priz_unicode", dat_mpd = "dat_mpd", priz_azure = "priz_azure", idle_ping = "idle_ping", priz_disconnect = "priz_disconnect", priz_session_audit = "priz_session_audit", priz_demo_del_esu = "priz_demo_del_esu", sessid_anon = "sessid_anon", db_guid = "db_guid", priz_multitenant = "priz_multitenant", priz_ginsfil = "priz_ginsfil", priz_ginssou = "priz_ginssou", priz_vyvoj = "priz_vyvoj", dat_zmena_lock = "dat_zmena_lock", zmenu_prov_lock = "zmenu_prov_lock", dat_zmena_vzkaz = "dat_zmena_vzkaz", zmenu_prov_vzkaz = "zmenu_prov_vzkaz", gdz_nocheckversion = "gdz_nocheckversion", priz_totp = "priz_totp", p_contained_users = "p_contained_users", url_skoleni = "url_skoleni", rezim_lic_cert = "rezim_lic_cert", collation_cs_col = "collation_cs_col", lock_timeout = "lock_timeout", command_timeout = "command_timeout",}
	const enum GGinscfdDtoFragments { cs_db = "*", typ_inst = "*", priz_archiv = "*", priz_blob = "*", stav_db = "*", vzkaz = "*", dat_zmena = "*", zmenu_prov = "*", priz_adm = "*", dat_avi = "*", dat_do = "*", tavi = "*", tstop = "*", s_eko = "*", s_ssl = "*", s_reg = "*", verze_db = "*", sub_verze_db = "*", pwstat = "*", lic = "*", jeden = "*", xxdb = "*", poznamka = "*", blobsp = "*", vzkaz_16 = "*", vzkaz_32 = "*", vzkaz_ww = "*", priz_ftx = "*", priz_ele = "*", priz_eps = "*", typ_srv = "*", projekt = "*", priz_d = "*", priz_f = "*", zmenaa = "*", typ_db = "*", db_name = "*", servername = "*", err_mail = "*", sub_verze_dbo = "*", priz_edit_do = "*", int_blok_aut = "*", rrdb = "*", dat_test_od = "*", vzkaz_test = "*", vodotisk = "*", s_gor_event = "*", cfg_uda = "*", s_prep = "*", sub_verze_adz = "*", tyi = "*", kultura = "*", gin_typ_inst = "*", dat_last_reboot = "*", netest_akt_adz = "*", priz_new_db = "*", priz_mail_adl = "*", db_name_test = "*", servername_test = "*", revize_adz = "*", priz_cluster = "*", pnsdb = "*", pnsxxdb = "*", stat_sis_aaa = "*", priz_multikult = "*", pruh_barva = "*", pruh_zkratka = "*", priz_min_rgt = "*", mail_adl = "*", tel_adl = "*", pozn_adl = "*", url_histxml = "*", url_gordic = "*", url_vsprava = "*", ftp_dist = "*", ftp_dist_ldb = "*", ftp_dist_pdb = "*", url_histxmldebug = "*", mail_adl_info = "*", mail_chyby = "*", tel_chyby = "*", pozn_chyby = "*", url_teamviewer = "*", klon_id = "*", hhdb = "*", dat_vznik_db = "*", crc_lic = "*", pocet_lic_r = "*", pocet_lic_t = "*", pocet_lic_m = "*", pocet_lic_s = "*", dat_ldcl = "*", pbug = "*", edi = "*", priz_unicode = "*", dat_mpd = "*", priz_azure = "*", idle_ping = "*", priz_disconnect = "*", priz_session_audit = "*", priz_demo_del_esu = "*", sessid_anon = "*", db_guid = "*", priz_multitenant = "*", priz_ginsfil = "*", priz_ginssou = "*", priz_vyvoj = "*", dat_zmena_lock = "*", zmenu_prov_lock = "*", dat_zmena_vzkaz = "*", zmenu_prov_vzkaz = "*", gdz_nocheckversion = "*", priz_totp = "*", p_contained_users = "*", url_skoleni = "*", rezim_lic_cert = "*", collation_cs_col = "*", lock_timeout = "*", command_timeout = "*",}
	const enum GGinscfdDtoTypes { cs_db = "number", typ_inst = "number", priz_archiv = "number", priz_blob = "number", stav_db = "number", vzkaz = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_adm = "number", dat_avi = "JsonDate", dat_do = "JsonDate", tavi = "string", tstop = "string", s_eko = "number", s_ssl = "number", s_reg = "number", verze_db = "number", sub_verze_db = "number", pwstat = "string", lic = "string", jeden = "number", xxdb = "string", poznamka = "string", blobsp = "string", vzkaz_16 = "string", vzkaz_32 = "string", vzkaz_ww = "string", priz_ftx = "number", priz_ele = "number", priz_eps = "number", typ_srv = "number", projekt = "string", priz_d = "number", priz_f = "number", zmenaa = "string", typ_db = "string", db_name = "string", servername = "string", err_mail = "string", sub_verze_dbo = "number", priz_edit_do = "number", int_blok_aut = "number", rrdb = "string", dat_test_od = "JsonDate", vzkaz_test = "string", vodotisk = "string", s_gor_event = "number", cfg_uda = "string", s_prep = "number", sub_verze_adz = "number", tyi = "string", kultura = "number", gin_typ_inst = "string", dat_last_reboot = "JsonDate", netest_akt_adz = "number", priz_new_db = "number", priz_mail_adl = "number", db_name_test = "string", servername_test = "string", revize_adz = "number", priz_cluster = "number", pnsdb = "string", pnsxxdb = "string", stat_sis_aaa = "string", priz_multikult = "number", pruh_barva = "number", pruh_zkratka = "string", priz_min_rgt = "number", mail_adl = "string", tel_adl = "string", pozn_adl = "string", url_histxml = "string", url_gordic = "string", url_vsprava = "string", ftp_dist = "string", ftp_dist_ldb = "string", ftp_dist_pdb = "string", url_histxmldebug = "string", mail_adl_info = "string", mail_chyby = "string", tel_chyby = "string", pozn_chyby = "string", url_teamviewer = "string", klon_id = "string", hhdb = "string", dat_vznik_db = "JsonDate", crc_lic = "string", pocet_lic_r = "number", pocet_lic_t = "number", pocet_lic_m = "number", pocet_lic_s = "number", dat_ldcl = "JsonDate", pbug = "string", edi = "string", priz_unicode = "number", dat_mpd = "JsonDate", priz_azure = "number", idle_ping = "number", priz_disconnect = "number", priz_session_audit = "number", priz_demo_del_esu = "number", sessid_anon = "JsonDecimal", db_guid = "string", priz_multitenant = "number", priz_ginsfil = "number", priz_ginssou = "number", priz_vyvoj = "number", dat_zmena_lock = "JsonDate", zmenu_prov_lock = "string", dat_zmena_vzkaz = "JsonDate", zmenu_prov_vzkaz = "string", gdz_nocheckversion = "number", priz_totp = "number", p_contained_users = "number", url_skoleni = "string", rezim_lic_cert = "number", collation_cs_col = "string", lock_timeout = "number", command_timeout = "number",}
	const enum GGinscfdDtoTypeLengths { vzkaz = 254, zmenu_prov = 12, tavi = 254, tstop = 254, pwstat = 50, lic = 4, xxdb = 18, poznamka = 50, blobsp = 20, vzkaz_16 = 254, vzkaz_32 = 254, vzkaz_ww = 254, projekt = 16, zmenaa = 50, typ_db = 3, db_name = 100, servername = 100, err_mail = 254, rrdb = 18, vzkaz_test = 254, vodotisk = 254, cfg_uda = 254, tyi = 1, gin_typ_inst = 3, db_name_test = 100, servername_test = 100, pnsdb = 18, pnsxxdb = 18, stat_sis_aaa = 3, pruh_zkratka = 25, mail_adl = 254, tel_adl = 254, pozn_adl = 254, url_histxml = 254, url_gordic = 254, url_vsprava = 254, ftp_dist = 254, ftp_dist_ldb = 254, ftp_dist_pdb = 254, url_histxmldebug = 254, mail_adl_info = 254, mail_chyby = 254, tel_chyby = 254, pozn_chyby = 254, url_teamviewer = 254, klon_id = 18, hhdb = 18, crc_lic = 254, pbug = 254, edi = 1, db_guid = 36, zmenu_prov_lock = 12, zmenu_prov_vzkaz = 12, url_skoleni = 254, collation_cs_col = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinscisDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginscis*/
	interface GGinscisDto {
		/**DBCOLUMN:ginscis.ixs_cis*/
		ixs_cis?: string|null;
		/**DBCOLUMN:ginscis.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginscis.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginscis.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginscis.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginscis.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginscis.sloupec1*/
		sloupec1?: string|null;
		/**DBCOLUMN:ginscis.sloupec2*/
		sloupec2?: string|null;
		/**DBCOLUMN:ginscis.nazev1*/
		nazev1?: string|null;
		/**DBCOLUMN:ginscis.nazev2*/
		nazev2?: string|null;
		/**DBCOLUMN:ginscis.priz_velcis*/
		priz_velcis?: number|null;
	}
	const enum GGinscisDtoNames { ixs_cis = "ixs_cis", nazev = "nazev", zkratka = "zkratka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", sloupec1 = "sloupec1", sloupec2 = "sloupec2", nazev1 = "nazev1", nazev2 = "nazev2", priz_velcis = "priz_velcis",}
	const enum GGinscisDtoFragments { ixs_cis = "*", nazev = "*", zkratka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", sloupec1 = "*", sloupec2 = "*", nazev1 = "*", nazev2 = "*", priz_velcis = "*",}
	const enum GGinscisDtoTypes { ixs_cis = "string", nazev = "string", zkratka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", sloupec1 = "string", sloupec2 = "string", nazev1 = "string", nazev2 = "string", priz_velcis = "number",}
	const enum GGinscisDtoTypeLengths { ixs_cis = 12, nazev = 50, zkratka = 16, zmenu_prov = 12, sloupec1 = 254, sloupec2 = 254, nazev1 = 50, nazev2 = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsdbpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsdbp
	*      Databázový profil
	*/
	interface GGinsdbpDto {
		/**Databázový profil
		*      Interní ID (označení) databázového profilu. Je vhodné, aby toto označení bylo identické s případným nastavením DP profilu v registrech na stanicích
		*/
		dbprofil?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Reinstalace
		*      Pouze jeden databázový profil může být označen příznakem, že slouží jako zdroj pro reinstalace modulů z databáze na stanice
		*/
		auto_inst?: number|null;
		priz_msm?: number|null;
		/**Je GINIS
		*      Příznak, že databáze je plně podle standardu GINIS
		*/
		priz_ginis?: number|null;
		/**Název profilu*/
		nazev?: string|null;
		/**Příznak zámku
		*      Příznak, že profil je pro použití v SLG uzamčen
		*/
		priz_akt?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Zástupy
		*      Příznak, že se při zakládání nebo editaci zástupu v rámci SLG mají zástupy automaticky přenést i do databáze označené tímto příznakem. Platí pouze pro SLG a pouze pro MO ČR
		*/
		priz_zast?: number|null;
		priz_mat?: number|null;
		/**Příznek SLG*/
		priz_slg?: number|null;
		priz_zip?: number|null;
	}
	const enum GGinsdbpDtoNames { dbprofil = "dbprofil", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", auto_inst = "auto_inst", priz_msm = "priz_msm", priz_ginis = "priz_ginis", nazev = "nazev", priz_akt = "priz_akt", lic = "lic", priz_zast = "priz_zast", priz_mat = "priz_mat", priz_slg = "priz_slg", priz_zip = "priz_zip",}
	const enum GGinsdbpDtoFragments { dbprofil = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", auto_inst = "*", priz_msm = "*", priz_ginis = "*", nazev = "*", priz_akt = "*", lic = "*", priz_zast = "*", priz_mat = "*", priz_slg = "*", priz_zip = "*",}
	const enum GGinsdbpDtoTypes { dbprofil = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", auto_inst = "number", priz_msm = "number", priz_ginis = "number", nazev = "string", priz_akt = "number", lic = "string", priz_zast = "number", priz_mat = "number", priz_slg = "number", priz_zip = "number",}
	const enum GGinsdbpDtoTypeLengths { dbprofil = 15, poznamka = 254, zmenu_prov = 12, nazev = 30, lic = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsepaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsepa
	*      Motor pro zpracování EPA
	*/
	interface GGinsepaDto {
		/**Identifikátor motoru pro EPA
		*      PK pro motory
		*/
		ixs_epa?: string|null;
		/**Název
		*      Název motoru EPA
		*/
		nazev?: string|null;
		/**Schránka
		*      Vazba na jakou schránku je tento motor pro EPA navázán
		*/
		mailbox?: string|null;
		/**Odesilatel
		*      Identifkace odesilatele od kterého mají být příslušná el. podání následně zpracovávána daným motorem EPA
		*/
		adr_odes?: string|null;
		/**Předmět (název) začíná na
		*      Texty na jaké má začínat předmět či věc příslušného el. podání pro zpracování daným motorem EPA
		*/
		subj_start?: string|null;
		/**Předmět (název) obsahuje
		*      Texty jaké obsahuje předmět či věc příslušného el. podání pro zpracování daným motorem EPA
		*/
		subj_obsah?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Pořadí (priorita)
		*      Určuje v jakém pořadí se určuje k jakému motoru příslušné el. podání bude přiřazeno
		*/
		poradi?: number|null;
		/**Typ dokumentu
		*      Typ dokumentu na jaký se příslušný motor EPA váže
		*/
		ixs_typ?: string|null;
		/**Způsob doručení
		*      Způsob doručení na jaký se příslušný motor EPA váže (je to místo položky mailbox)
		*/
		zpusob_dor?: number|null;
		/**Formulář SK*/
		ixs_fsk?: string|null;
	}
	const enum GGinsepaDtoNames { ixs_epa = "ixs_epa", nazev = "nazev", mailbox = "mailbox", adr_odes = "adr_odes", subj_start = "subj_start", subj_obsah = "subj_obsah", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poradi = "poradi", ixs_typ = "ixs_typ", zpusob_dor = "zpusob_dor", ixs_fsk = "ixs_fsk",}
	const enum GGinsepaDtoFragments { ixs_epa = "*", nazev = "*", mailbox = "*", adr_odes = "*", subj_start = "*", subj_obsah = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", poradi = "*", ixs_typ = "*", zpusob_dor = "*", ixs_fsk = "*",}
	const enum GGinsepaDtoTypes { ixs_epa = "string", nazev = "string", mailbox = "string", adr_odes = "string", subj_start = "string", subj_obsah = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", poradi = "number", ixs_typ = "string", zpusob_dor = "number", ixs_fsk = "string",}
	const enum GGinsepaDtoTypeLengths { ixs_epa = 12, nazev = 100, mailbox = 100, adr_odes = 254, subj_start = 254, subj_obsah = 254, poznamka = 254, zmenu_prov = 12, ixs_typ = 12, ixs_fsk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsesuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsesu*/
	interface GGinsesuDto {
		/**DBCOLUMN:ginsesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:ginsesu.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginsesu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsesu.arw*/
		arw?: number|null;
		/**DBCOLUMN:ginsesu.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsesu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsesu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsesu.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsesu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsesu.ob_jmeno*/
		ob_jmeno?: string|null;
		/**DBCOLUMN:ginsesu.typ_esu*/
		typ_esu?: number|null;
		/**DBCOLUMN:ginsesu.stupen_ver*/
		stupen_ver?: number|null;
		/**DBCOLUMN:ginsesu.ixs_nad*/
		ixs_nad?: string|null;
		/**DBCOLUMN:ginsesu.stat*/
		stat?: number|null;
		/**DBCOLUMN:ginsesu.psc*/
		psc?: string|null;
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
		/**DBCOLUMN:ginsesu.tel*/
		tel?: string|null;
		/**DBCOLUMN:ginsesu.mail*/
		mail?: string|null;
		/**DBCOLUMN:ginsesu.fax*/
		fax?: string|null;
		/**DBCOLUMN:ginsesu.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:ginsesu.priz_eko*/
		priz_eko?: number|null;
		/**DBCOLUMN:ginsesu.priz_int*/
		priz_int?: number|null;
		/**DBCOLUMN:ginsesu.num_pod*/
		num_pod?: number|null;
		/**DBCOLUMN:ginsesu.num_zast*/
		num_zast?: number|null;
		/**DBCOLUMN:ginsesu.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:ginsesu.cs_zkratka*/
		cs_zkratka?: string|null;
		/**DBCOLUMN:ginsesu.typ_org*/
		typ_org?: number|null;
		/**DBCOLUMN:ginsesu.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:ginsesu.cs_ulice*/
		cs_ulice?: string|null;
		/**DBCOLUMN:ginsesu.cs_obec*/
		cs_obec?: string|null;
		/**DBCOLUMN:ginsesu.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:ginsesu.rc*/
		rc?: string|null;
		/**DBCOLUMN:ginsesu.ixs_prev*/
		ixs_prev?: string|null;
		/**DBCOLUMN:ginsesu.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:ginsesu.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:ginsesu.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:ginsesu.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:ginsesu.pobox*/
		pobox?: string|null;
		/**DBCOLUMN:ginsesu.st1*/
		st1?: string|null;
		/**DBCOLUMN:ginsesu.st2*/
		st2?: string|null;
		/**DBCOLUMN:ginsesu.st3*/
		st3?: string|null;
		/**DBCOLUMN:ginsesu.st4*/
		st4?: string|null;
		/**DBCOLUMN:ginsesu.st5*/
		st5?: string|null;
		/**DBCOLUMN:ginsesu.st6*/
		st6?: string|null;
		/**DBCOLUMN:ginsesu.st7*/
		st7?: string|null;
		/**DBCOLUMN:ginsesu.priz_vp*/
		priz_vp?: number|null;
		/**DBCOLUMN:ginsesu.ixs_puv*/
		ixs_puv?: string|null;
		/**DBCOLUMN:ginsesu.ixs_obj*/
		ixs_obj?: string|null;
		/**DBCOLUMN:ginsesu.ixs_adr*/
		ixs_adr?: string|null;
		/**DBCOLUMN:ginsesu.ixs_org*/
		ixs_org?: string|null;
		/**DBCOLUMN:ginsesu.ixs_oso*/
		ixs_oso?: string|null;
		/**DBCOLUMN:ginsesu.ixs_eko*/
		ixs_eko?: string|null;
		/**DBCOLUMN:ginsesu.ur_pri*/
		ur_pri?: number|null;
		/**DBCOLUMN:ginsesu.adresa_kod*/
		adresa_kod?: string|null;
		/**DBCOLUMN:ginsesu.priz_dph*/
		priz_dph?: number|null;
		/**DBCOLUMN:ginsesu.st0*/
		st0?: string|null;
		/**DBCOLUMN:ginsesu.pco*/
		pco?: number|null;
		/**DBCOLUMN:ginsesu.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:ginsesu.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:ginsesu.neakt_oba_int*/
		neakt_oba_int?: number|null;
		/**DBCOLUMN:ginsesu.dat_nar*/
		dat_nar?: JsonDate|null;
		/**DBCOLUMN:ginsesu.bio*/
		bio?: JsonDecimal|null;
		/**DBCOLUMN:ginsesu.url*/
		url?: string|null;
		/**DBCOLUMN:ginsesu.typ_upadku*/
		typ_upadku?: number|null;
		/**DBCOLUMN:ginsesu.dat_akt_rob*/
		dat_akt_rob?: JsonDate|null;
		/**DBCOLUMN:ginsesu.kod_o*/
		kod_o?: number|null;
		/**DBCOLUMN:ginsesu.stat_sp*/
		stat_sp?: number|null;
		/**DBCOLUMN:ginsesu.gps_sirka*/
		gps_sirka?: string|null;
		/**DBCOLUMN:ginsesu.gps_delka*/
		gps_delka?: string|null;
		/**DBCOLUMN:ginsesu.priz_umrti*/
		priz_umrti?: number|null;
		/**DBCOLUMN:ginsesu.dat_umrti*/
		dat_umrti?: JsonDate|null;
		/**DBCOLUMN:ginsesu.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginsesu.oc*/
		oc?: string|null;
		/**DBCOLUMN:ginsesu.pohlavi*/
		pohlavi?: number|null;
		/**DBCOLUMN:ginsesu.rod_stav*/
		rod_stav?: number|null;
		/**DBCOLUMN:ginsesu.typ_adr*/
		typ_adr?: number|null;
		/**DBCOLUMN:ginsesu.s_pruk*/
		s_pruk?: number|null;
		/**DBCOLUMN:ginsesu.rod_prijmeni*/
		rod_prijmeni?: string|null;
		/**DBCOLUMN:ginsesu.misto_nar*/
		misto_nar?: string|null;
		/**DBCOLUMN:ginsesu.prezdivka*/
		prezdivka?: string|null;
		/**DBCOLUMN:ginsesu.ixs_esu_zam*/
		ixs_esu_zam?: string|null;
		/**DBCOLUMN:ginsesu.id_ds*/
		id_ds?: string|null;
		/**DBCOLUMN:ginsesu.id_gex*/
		id_gex?: string|null;
		/**DBCOLUMN:ginsesu.partner_uct*/
		partner_uct?: string|null;
		/**DBCOLUMN:ginsesu.mi_jmeno*/
		mi_jmeno?: string|null;
		/**DBCOLUMN:ginsesu.mi_prijmeni*/
		mi_prijmeni?: string|null;
		/**DBCOLUMN:ginsesu.up_nazev*/
		up_nazev?: string|null;
		/**DBCOLUMN:ginsesu.up_prijmeni*/
		up_prijmeni?: string|null;
	}
	const enum GGinsesuDtoNames { ixs_esu = "ixs_esu", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", ob_jmeno = "ob_jmeno", typ_esu = "typ_esu", stupen_ver = "stupen_ver", ixs_nad = "ixs_nad", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", ico = "ico", dic = "dic", tel = "tel", mail = "mail", fax = "fax", ixs_su = "ixs_su", priz_eko = "priz_eko", priz_int = "priz_int", num_pod = "num_pod", num_zast = "num_zast", cs_nazev = "cs_nazev", cs_zkratka = "cs_zkratka", typ_org = "typ_org", dat_mpd = "dat_mpd", cs_ulice = "cs_ulice", cs_obec = "cs_obec", esu_txt = "esu_txt", rc = "rc", ixs_prev = "ixs_prev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", pobox = "pobox", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", priz_vp = "priz_vp", ixs_puv = "ixs_puv", ixs_obj = "ixs_obj", ixs_adr = "ixs_adr", ixs_org = "ixs_org", ixs_oso = "ixs_oso", ixs_eko = "ixs_eko", ur_pri = "ur_pri", adresa_kod = "adresa_kod", priz_dph = "priz_dph", st0 = "st0", pco = "pco", z_int = "z_int", typ_ag = "typ_ag", neakt_oba_int = "neakt_oba_int", dat_nar = "dat_nar", bio = "bio", url = "url", typ_upadku = "typ_upadku", dat_akt_rob = "dat_akt_rob", kod_o = "kod_o", stat_sp = "stat_sp", gps_sirka = "gps_sirka", gps_delka = "gps_delka", priz_umrti = "priz_umrti", dat_umrti = "dat_umrti", ixs_lpc = "ixs_lpc", oc = "oc", pohlavi = "pohlavi", rod_stav = "rod_stav", typ_adr = "typ_adr", s_pruk = "s_pruk", rod_prijmeni = "rod_prijmeni", misto_nar = "misto_nar", prezdivka = "prezdivka", ixs_esu_zam = "ixs_esu_zam", id_ds = "id_ds", id_gex = "id_gex", partner_uct = "partner_uct", mi_jmeno = "mi_jmeno", mi_prijmeni = "mi_prijmeni", up_nazev = "up_nazev", up_prijmeni = "up_prijmeni",}
	const enum GGinsesuDtoFragments { ixs_esu = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", ob_jmeno = "*", typ_esu = "*", stupen_ver = "*", ixs_nad = "*", stat = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", ico = "*", dic = "*", tel = "*", mail = "*", fax = "*", ixs_su = "*", priz_eko = "*", priz_int = "*", num_pod = "*", num_zast = "*", cs_nazev = "*", cs_zkratka = "*", typ_org = "*", dat_mpd = "*", cs_ulice = "*", cs_obec = "*", esu_txt = "*", rc = "*", ixs_prev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", pobox = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", priz_vp = "*", ixs_puv = "*", ixs_obj = "*", ixs_adr = "*", ixs_org = "*", ixs_oso = "*", ixs_eko = "*", ur_pri = "*", adresa_kod = "*", priz_dph = "*", st0 = "*", pco = "*", z_int = "*", typ_ag = "*", neakt_oba_int = "*", dat_nar = "*", bio = "*", url = "*", typ_upadku = "*", dat_akt_rob = "*", kod_o = "*", stat_sp = "*", gps_sirka = "*", gps_delka = "*", priz_umrti = "*", dat_umrti = "*", ixs_lpc = "*", oc = "*", pohlavi = "*", rod_stav = "*", typ_adr = "*", s_pruk = "*", rod_prijmeni = "*", misto_nar = "*", prezdivka = "*", ixs_esu_zam = "*", id_ds = "*", id_gex = "*", partner_uct = "*", mi_jmeno = "*", mi_prijmeni = "*", up_nazev = "*", up_prijmeni = "*",}
	const enum GGinsesuDtoTypes { ixs_esu = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", ob_jmeno = "string", typ_esu = "number", stupen_ver = "number", ixs_nad = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", ico = "string", dic = "string", tel = "string", mail = "string", fax = "string", ixs_su = "string", priz_eko = "number", priz_int = "number", num_pod = "number", num_zast = "number", cs_nazev = "string", cs_zkratka = "string", typ_org = "number", dat_mpd = "JsonDate", cs_ulice = "string", cs_obec = "string", esu_txt = "string", rc = "string", ixs_prev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", pobox = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", priz_vp = "number", ixs_puv = "string", ixs_obj = "string", ixs_adr = "string", ixs_org = "string", ixs_oso = "string", ixs_eko = "string", ur_pri = "number", adresa_kod = "string", priz_dph = "number", st0 = "string", pco = "number", z_int = "number", typ_ag = "number", neakt_oba_int = "number", dat_nar = "JsonDate", bio = "JsonDecimal", url = "string", typ_upadku = "number", dat_akt_rob = "JsonDate", kod_o = "number", stat_sp = "number", gps_sirka = "string", gps_delka = "string", priz_umrti = "number", dat_umrti = "JsonDate", ixs_lpc = "string", oc = "string", pohlavi = "number", rod_stav = "number", typ_adr = "number", s_pruk = "number", rod_prijmeni = "string", misto_nar = "string", prezdivka = "string", ixs_esu_zam = "string", id_ds = "string", id_gex = "string", partner_uct = "string", mi_jmeno = "string", mi_prijmeni = "string", up_nazev = "string", up_prijmeni = "string",}
	const enum GGinsesuDtoTypeLengths { ixs_esu = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 100, ob_jmeno = 254, ixs_nad = 12, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, ico = 14, dic = 15, tel = 33, mail = 254, fax = 33, ixs_su = 12, cs_nazev = 100, cs_zkratka = 16, cs_ulice = 30, cs_obec = 30, esu_txt = 254, rc = 10, ixs_prev = 12, jmeno = 24, prijmeni = 36, tit_pred = 35, tit_za = 35, pobox = 8, st1 = 50, st2 = 50, st3 = 50, st4 = 50, st5 = 50, st6 = 50, st7 = 50, ixs_puv = 12, ixs_obj = 12, ixs_adr = 12, ixs_org = 12, ixs_oso = 12, ixs_eko = 12, adresa_kod = 10, st0 = 50, url = 254, gps_sirka = 12, gps_delka = 12, ixs_lpc = 12, oc = 30, rod_prijmeni = 36, misto_nar = 48, prezdivka = 254, ixs_esu_zam = 12, id_ds = 100, id_gex = 100, partner_uct = 10, mi_jmeno = 24, mi_prijmeni = 36, up_nazev = 100, up_prijmeni = 36,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsevnDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsevn
	*      Událost
	*/
	interface GGinsevnDto {
		/**ID události
		*      Unikátní identifikátor zachycené události
		*/
		evn_por_cislo?: number|null;
		/**Por.číslo přihlášení*/
		log_por_cislo?: number|null;
		/**ID akce s daty OD*/
		iud_por_od?: number|null;
		/**ID akce s daty DO*/
		iud_por_do?: number|null;
		/**Čas události
		*      Datum a čas události
		*/
		dat_evn?: JsonDate|null;
		/**Kategorie události*/
		ktg_evn?: number|null;
		/**Typ události
		*      Typ události. Např. editace, zneaktivnění atd.. Jedná se o hrubou kategorizaci typu akce. Hodnoty v tabulce ginctev. Jedná se o pomocnou kategorizaci a většinou nastavenou na 0.
		*/
		typ_evn?: number|null;
		/**Výsledek akce
		*      Výsledek akce. Hodnoty podle tabulky gincrvn. Pro audit akcí to bude většinou 1 - Úspěch. Pro log chyb bude  -1 - Neúspěch.
		*/
		res_evn?: number|null;
		/**Interní prog.identifikace typu události
		*      Interní prog.identifikace typu události
		*/
		proces_id?: string|null;
		/**Typ události
		*      Uživatelský textový popis události. Např. Akce: [Odstranění přihlašovacího účtu] pro uživatele [Tomeš Radek ; DiS.] a jeho [primární] login [GORDIC\rtomes]
		*/
		proces_txt?: string|null;
		/**Typ objektu*/
		typ_subj?: number|null;
		/**ID objektu*/
		sxs_subj?: string|null;
		/**Interní položka. Jméno DB tabulky, která je deklarativní tabulkou objektu*/
		tab_name?: string|null;
		proces_src?: string|null;
		/**Klasifikce události
		*      Klasifikace události. Hrubé zakategorizování události podle číselníku z tabulky ginckla Více viz
		*/
		klas_evn?: number|null;
		/**ID akce
		*      ID uživatelské akce, v rámci které k události došlo.
		*/
		ixs_aus?: string|null;
		/**Zobrazovat
		*      Příznak, zda se má zobrazovat událost běžným uživatelům
		*/
		priz_zobr?: number|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinsevnDtoNames { evn_por_cislo = "evn_por_cislo", log_por_cislo = "log_por_cislo", iud_por_od = "iud_por_od", iud_por_do = "iud_por_do", dat_evn = "dat_evn", ktg_evn = "ktg_evn", typ_evn = "typ_evn", res_evn = "res_evn", proces_id = "proces_id", proces_txt = "proces_txt", typ_subj = "typ_subj", sxs_subj = "sxs_subj", tab_name = "tab_name", proces_src = "proces_src", klas_evn = "klas_evn", ixs_aus = "ixs_aus", priz_zobr = "priz_zobr", zmenu_prov = "zmenu_prov",}
	const enum GGinsevnDtoFragments { evn_por_cislo = "*", log_por_cislo = "*", iud_por_od = "*", iud_por_do = "*", dat_evn = "*", ktg_evn = "*", typ_evn = "*", res_evn = "*", proces_id = "*", proces_txt = "*", typ_subj = "*", sxs_subj = "*", tab_name = "*", proces_src = "*", klas_evn = "*", ixs_aus = "*", priz_zobr = "*", zmenu_prov = "*",}
	const enum GGinsevnDtoTypes { evn_por_cislo = "number", log_por_cislo = "number", iud_por_od = "number", iud_por_do = "number", dat_evn = "JsonDate", ktg_evn = "number", typ_evn = "number", res_evn = "number", proces_id = "string", proces_txt = "string", typ_subj = "number", sxs_subj = "string", tab_name = "string", proces_src = "string", klas_evn = "number", ixs_aus = "string", priz_zobr = "number", zmenu_prov = "string",}
	const enum GGinsevnDtoTypeLengths { proces_id = 254, proces_txt = 254, sxs_subj = 254, tab_name = 10, proces_src = 254, ixs_aus = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsfapDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsfap
	*      Povolené revize aplikací
	*/
	interface GGinsfapDto {
		/**zkratka programové fáze*/
		faze?: string|null;
		/**verze prog. fáze*/
		verze?: number|null;
		/**subverze prog. fáze*/
		sub_verze?: number|null;
		/**Revize*/
		revize?: string|null;
		var_faze?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		sub_verze_db_min?: number|null;
		revize_ins?: string|null;
		priz_nemazat?: number|null;
	}
	const enum GGinsfapDtoNames { faze = "faze", verze = "verze", sub_verze = "sub_verze", revize = "revize", var_faze = "var_faze", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", sub_verze_db_min = "sub_verze_db_min", revize_ins = "revize_ins", priz_nemazat = "priz_nemazat",}
	const enum GGinsfapDtoFragments { faze = "*", verze = "*", sub_verze = "*", revize = "*", var_faze = "*", dat_zmena = "*", zmenu_prov = "*", sub_verze_db_min = "*", revize_ins = "*", priz_nemazat = "*",}
	const enum GGinsfapDtoTypes { faze = "string", verze = "number", sub_verze = "number", revize = "string", var_faze = "number", dat_zmena = "JsonDate", zmenu_prov = "string", sub_verze_db_min = "number", revize_ins = "string", priz_nemazat = "number",}
	const enum GGinsfapDtoTypeLengths { faze = 8, revize = 30, zmenu_prov = 12, revize_ins = 40,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsfrmDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsfrm
	*      Sestavy - formáter
	*/
	interface GGinsfrmDto {
		ixs_frm?: string|null;
		/**název osoby*/
		nazev?: string|null;
		tema?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		rokmes_od?: string|null;
		rokmes_do?: string|null;
		file_name?: string|null;
		xmeta_ver?: number|null;
		xmeta_subver_min?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		ixs_xme?: string|null;
		/**povolené formáty výstupu*/
		form_vyst?: string|null;
		format_skup?: string|null;
		zpus_uloz?: number|null;
		priz_zmeny?: number|null;
		filtr_frm?: string|null;
		/**Kategorie příloh*/
		ktg_typ_pri?: number|null;
	}
	const enum GGinsfrmDtoNames { ixs_frm = "ixs_frm", nazev = "nazev", tema = "tema", poznamka = "poznamka", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", file_name = "file_name", xmeta_ver = "xmeta_ver", xmeta_subver_min = "xmeta_subver_min", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_xme = "ixs_xme", form_vyst = "form_vyst", format_skup = "format_skup", zpus_uloz = "zpus_uloz", priz_zmeny = "priz_zmeny", filtr_frm = "filtr_frm", ktg_typ_pri = "ktg_typ_pri",}
	const enum GGinsfrmDtoFragments { ixs_frm = "*", nazev = "*", tema = "*", poznamka = "*", rokmes_od = "*", rokmes_do = "*", file_name = "*", xmeta_ver = "*", xmeta_subver_min = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_xme = "*", form_vyst = "*", format_skup = "*", zpus_uloz = "*", priz_zmeny = "*", filtr_frm = "*", ktg_typ_pri = "*",}
	const enum GGinsfrmDtoTypes { ixs_frm = "string", nazev = "string", tema = "string", poznamka = "string", rokmes_od = "string", rokmes_do = "string", file_name = "string", xmeta_ver = "number", xmeta_subver_min = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_xme = "string", form_vyst = "string", format_skup = "string", zpus_uloz = "number", priz_zmeny = "number", filtr_frm = "string", ktg_typ_pri = "number",}
	const enum GGinsfrmDtoTypeLengths { ixs_frm = 12, nazev = 254, tema = 15, poznamka = 254, rokmes_od = 6, rokmes_do = 6, file_name = 254, zmenu_prov = 12, ixs_xme = 12, form_vyst = 10, format_skup = 3, filtr_frm = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsfspDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsfsp
	*      Formát souboru dle PRONOM
	*/
	interface GGinsfspDto {
		/**Pronom Id*/
		pronom_id?: number|null;
		/**Puid*/
		puid?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Verze*/
		verze?: string|null;
		/**MIME Type*/
		mimetype?: string|null;
		/**Koncovky*/
		koncovky?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Formát určený pro vstup do SPI*/
		priz_arch_form?: number|null;
		/**Formát určený k migraci*/
		priz_migr_form?: number|null;
		/**Formát určený pro vstup do NDA*/
		priz_povol_nda?: number|null;
		/**Povolení konverze do PDF s přílohami (PDF/A-3b s vloženými přílohami)
		*      Povolení konverze do PDF s přílohami (PDF/A-3b s vloženými přílohami)
		*/
		konv_pdf_s_pri?: number|null;
		/**Povolení vložení v nezkonvertované podobě do PDF při konverzi*/
		povol_pri_do_pdf?: number|null;
		/**Povolený pro NDA*/
		priz_arch_mimetype?: number|null;
		/**MIME pro zápis do SIP
		*      MIME Type určený pro zápis do generovaného SIP balíčku
		*/
		mimetype_arch?: string|null;
	}
	const enum GGinsfspDtoNames { pronom_id = "pronom_id", puid = "puid", nazev = "nazev", verze = "verze", mimetype = "mimetype", koncovky = "koncovky", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_arch_form = "priz_arch_form", priz_migr_form = "priz_migr_form", priz_povol_nda = "priz_povol_nda", konv_pdf_s_pri = "konv_pdf_s_pri", povol_pri_do_pdf = "povol_pri_do_pdf", priz_arch_mimetype = "priz_arch_mimetype", mimetype_arch = "mimetype_arch",}
	const enum GGinsfspDtoFragments { pronom_id = "*", puid = "*", nazev = "*", verze = "*", mimetype = "*", koncovky = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_arch_form = "*", priz_migr_form = "*", priz_povol_nda = "*", konv_pdf_s_pri = "*", povol_pri_do_pdf = "*", priz_arch_mimetype = "*", mimetype_arch = "*",}
	const enum GGinsfspDtoTypes { pronom_id = "number", puid = "string", nazev = "string", verze = "string", mimetype = "string", koncovky = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_arch_form = "number", priz_migr_form = "number", priz_povol_nda = "number", konv_pdf_s_pri = "number", povol_pri_do_pdf = "number", priz_arch_mimetype = "number", mimetype_arch = "string",}
	const enum GGinsfspDtoTypeLengths { puid = 15, nazev = 254, verze = 150, mimetype = 254, koncovky = 100, zmenu_prov = 12, mimetype_arch = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsfunDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsfun
	*      Funkční místo
	*/
	interface GGinsfunDto {
		/**Funkční místo
		*      Interní identifikace funkčního místa
		*/
		ixs_fun?: string|null;
		/**Licence*/
		lic?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Nepoužívá se - kandidát na zrušení*/
		arw?: number|null;
		/**Poznámka
		*      Poznámka administrátora systému k funkčnímu místu.
		*/
		poznamka?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Spisový uzel
		*      Spisový uzel, ke kterému funkční místo náleží.
		*/
		ixs_su?: string|null;
		/**Spisový uzel*/
		nazev_su?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název funkce*/
		nazev?: string|null;
		/**Úroveň funkce*/
		uroven_fun?: number|null;
		/**Priorita funkce*/
		priorita_max?: number|null;
		/**Kód funkčního místa*/
		fc?: string|null;
		/**Nadřízená funkce
		*      ID nadřízeného funkčního místa
		*/
		ixs_nad?: string|null;
		/**Osoba
		*      ID osoby, která aktuálně zastává funkční místo
		*/
		ixs_ref?: string|null;
		/**Osoba
		*      Skládaný tvar názvu osoby, která aktuálně zastává funkční místo.
		*/
		nazev_ref?: string|null;
		/**Organizační jednotka
		*      ID organizační jednotky, ke které funkční místo aktuálně patří
		*/
		ixs_orj?: string|null;
		/**Organizační jednotka*/
		nazev_orj?: string|null;
		/**Místnost*/
		mistnost_kod?: string|null;
		/**Úřední hodiny*/
		ur_hod?: string|null;
		/**Telefon*/
		tel?: string|null;
		/**Mail*/
		mail?: string|null;
		/**Fax*/
		fax?: string|null;
		/**Oficiální název
		*      Oficiální název pracovní pozice použitelné např. tisky
		*/
		ofic_nazev?: string|null;
		/**Status funkce
		*      Status funkce
		*/
		status_fun?: number|null;
		/**Typ funkce*/
		pri_fun?: number|null;
		/**ID do kumulativní tabulky držící unikátní ID, kdo realizoval změnu dat ( je to kumulace FUN, REF, SU )*/
		ixs_zmp?: string|null;
		/**CS název
		*      Pomocný sloupec vypočítaná podle sloupce název. Slouží pro vyhledávání a třídění s ingnorováním české diakritiky a ignorováním velkých a malých písmen
		*/
		cs_nazev?: string|null;
		/**Počet podřízených*/
		num_pod?: number|null;
		/**Čas zápisu*/
		dat_mpd?: JsonDate|null;
		/**Osoba, funkce*/
		nazev_rf?: string|null;
		/**Zkratka su.
		*      Zkratka spisového uzlu
		*/
		zkratka_su?: string|null;
		/**URL*/
		url?: string|null;
		/**Z interface*/
		z_int?: number|null;
		aktuz?: number|null;
		poradi_log?: number|null;
		ixs_ose?: string|null;
		/**Servisní uživatel
		*      Příznak, že se nejedná o běžného fyzického uživatele, ale o technický účet.
		*/
		priz_servis?: number|null;
		/**Změnil
		*      Kdo provedl změnu podle ID přihlášení
		*/
		ixs_lpc?: string|null;
		/**Budoucí spisový uzel
		*      Zatím nevyužito. Jedná se o spisový uzel, na který se má funkční místo a jeho dokumenty přesunout v rámci plánované odložené úlohy. Toto je pro dlouho trvající akce ve změně struktury organizace
		*/
		ixs_su_navrh?: string|null;
		/**Barva
		*      Barva označující funkci. Slouží např. u zápisu poznámek s barvou do PDF.
		*/
		barva?: string|null;
		/**IČO
		*      IČO organizace, ke které funkční místo přísluší - nelze dodatečně měnit.
		*/
		ico?: string|null;
		/**Účel zpracování*/
		ixs_zap?: string|null;
		/**Název funkce, název osoby
		*      Složenina názvu funkce a názvu osoby
		*/
		nazev_fr?: string|null;
		/**Povoleno IP
		*      Příznak, zda funkční místo smí přistupivat na zadané stanice
		*/
		priz_ip_adr?: number|null;
		cast_rap?: string|null;
	}
	const enum GGinsfunDtoNames { ixs_fun = "ixs_fun", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", nazev_su = "nazev_su", zkratka = "zkratka", nazev = "nazev", uroven_fun = "uroven_fun", priorita_max = "priorita_max", fc = "fc", ixs_nad = "ixs_nad", ixs_ref = "ixs_ref", nazev_ref = "nazev_ref", ixs_orj = "ixs_orj", nazev_orj = "nazev_orj", mistnost_kod = "mistnost_kod", ur_hod = "ur_hod", tel = "tel", mail = "mail", fax = "fax", ofic_nazev = "ofic_nazev", status_fun = "status_fun", pri_fun = "pri_fun", ixs_zmp = "ixs_zmp", cs_nazev = "cs_nazev", num_pod = "num_pod", dat_mpd = "dat_mpd", nazev_rf = "nazev_rf", zkratka_su = "zkratka_su", url = "url", z_int = "z_int", aktuz = "aktuz", poradi_log = "poradi_log", ixs_ose = "ixs_ose", priz_servis = "priz_servis", ixs_lpc = "ixs_lpc", ixs_su_navrh = "ixs_su_navrh", barva = "barva", ico = "ico", ixs_zap = "ixs_zap", nazev_fr = "nazev_fr", priz_ip_adr = "priz_ip_adr", cast_rap = "cast_rap",}
	const enum GGinsfunDtoFragments { ixs_fun = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", nazev_su = "*", zkratka = "*", nazev = "*", uroven_fun = "*", priorita_max = "*", fc = "*", ixs_nad = "*", ixs_ref = "*", nazev_ref = "*", ixs_orj = "*", nazev_orj = "*", mistnost_kod = "*", ur_hod = "*", tel = "*", mail = "*", fax = "*", ofic_nazev = "*", status_fun = "*", pri_fun = "*", ixs_zmp = "*", cs_nazev = "*", num_pod = "*", dat_mpd = "*", nazev_rf = "*", zkratka_su = "*", url = "*", z_int = "*", aktuz = "*", poradi_log = "*", ixs_ose = "*", priz_servis = "*", ixs_lpc = "*", ixs_su_navrh = "*", barva = "*", ico = "*", ixs_zap = "*", nazev_fr = "*", priz_ip_adr = "*", cast_rap = "*",}
	const enum GGinsfunDtoTypes { ixs_fun = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", nazev_su = "string", zkratka = "string", nazev = "string", uroven_fun = "number", priorita_max = "number", fc = "string", ixs_nad = "string", ixs_ref = "string", nazev_ref = "string", ixs_orj = "string", nazev_orj = "string", mistnost_kod = "string", ur_hod = "string", tel = "string", mail = "string", fax = "string", ofic_nazev = "string", status_fun = "number", pri_fun = "number", ixs_zmp = "string", cs_nazev = "string", num_pod = "number", dat_mpd = "JsonDate", nazev_rf = "string", zkratka_su = "string", url = "string", z_int = "number", aktuz = "number", poradi_log = "number", ixs_ose = "string", priz_servis = "number", ixs_lpc = "string", ixs_su_navrh = "string", barva = "string", ico = "string", ixs_zap = "string", nazev_fr = "string", priz_ip_adr = "number", cast_rap = "string",}
	const enum GGinsfunDtoTypeLengths { ixs_fun = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, nazev_su = 25, zkratka = 16, nazev = 25, fc = 50, ixs_nad = 12, ixs_ref = 12, nazev_ref = 200, ixs_orj = 12, nazev_orj = 25, mistnost_kod = 8, ur_hod = 50, tel = 33, mail = 254, fax = 33, ofic_nazev = 254, ixs_zmp = 12, cs_nazev = 25, nazev_rf = 200, zkratka_su = 16, url = 254, ixs_ose = 12, ixs_lpc = 12, ixs_su_navrh = 12, barva = 10, ico = 10, ixs_zap = 12, nazev_fr = 200, cast_rap = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsgdtDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsgdt
	*      Definice balíku GDZ
	*/
	interface GGinsgdtDto {
		/**Balík GDZ
		*      Interní ID balíku - je přidělováno vždy z GDEV databáze a to přes aplikaci ADT07
		*/
		ixs_gdt?: string|null;
		/**Název souboru balíku*/
		nazev?: string|null;
		/**Popis balíku*/
		popis?: string|null;
		/**ORJ autora*/
		orj?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Binární obsah
		*      Binární obsah GDZ balíku
		*/
		kopie?: JsonBlob|null;
		/**Verze balíku*/
		verze?: number|null;
		/**Distribuční podmínka*/
		dist_cond?: string|null;
		/**Spouštěcí podmínka*/
		run_cond?: string|null;
		/**Typ balíku GDZ*/
		typ_gdt?: number|null;
		/**Priorita balíku GDZ*/
		priorita_gdt?: number|null;
		/**Logovat*/
		priz_log_db?: number|null;
		zdroj?: string|null;
		/**Veřejný
		*      Příznak, že obsah scriptu je možné zveřejnit
		*/
		priz_public?: number|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**CS popis*/
		cs_popis?: string|null;
		/**Exspirace ADL
		*      Počet dní určující exspiraci ADL - tedy doba po které budou ADL diagnostické balíky odstraněny z centrálního portálu
		*/
		dnu_exs_adl?: number|null;
		/**Hlavní verze databáze GINIS*/
		verze_db?: number|null;
		/**Subverze databáze*/
		sub_verze_db?: number|null;
	}
	const enum GGinsgdtDtoNames { ixs_gdt = "ixs_gdt", nazev = "nazev", popis = "popis", orj = "orj", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kopie = "kopie", verze = "verze", dist_cond = "dist_cond", run_cond = "run_cond", typ_gdt = "typ_gdt", priorita_gdt = "priorita_gdt", priz_log_db = "priz_log_db", zdroj = "zdroj", priz_public = "priz_public", cs_nazev = "cs_nazev", cs_popis = "cs_popis", dnu_exs_adl = "dnu_exs_adl", verze_db = "verze_db", sub_verze_db = "sub_verze_db",}
	const enum GGinsgdtDtoFragments { ixs_gdt = "*", nazev = "*", popis = "*", orj = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kopie = "*", verze = "*", dist_cond = "*", run_cond = "*", typ_gdt = "*", priorita_gdt = "*", priz_log_db = "*", zdroj = "*", priz_public = "*", cs_nazev = "*", cs_popis = "*", dnu_exs_adl = "*", verze_db = "*", sub_verze_db = "*",}
	const enum GGinsgdtDtoTypes { ixs_gdt = "string", nazev = "string", popis = "string", orj = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kopie = "JsonBlob", verze = "number", dist_cond = "string", run_cond = "string", typ_gdt = "number", priorita_gdt = "number", priz_log_db = "number", zdroj = "string", priz_public = "number", cs_nazev = "string", cs_popis = "string", dnu_exs_adl = "number", verze_db = "number", sub_verze_db = "number",}
	const enum GGinsgdtDtoTypeLengths { ixs_gdt = 12, nazev = 254, popis = 254, orj = 4, zmenu_prov = 12, dist_cond = 4000, run_cond = 4000, zdroj = 255, cs_nazev = 254, cs_popis = 254,}
	/**Rozšíření logu spuštění balíku GDZ*/
	interface GGinsgdtExtDto extends Gordic.Adm.Interface.GGinsgdtDto {
		/**Typ balíku*/
		typ_gdt_txt?: string|null;
		/**Priorita GDT*/
		priorita_gdt_txt?: string|null;
	}
	const enum GGinsgdtExtDtoNames { typ_gdt_txt = "typ_gdt_txt", priorita_gdt_txt = "priorita_gdt_txt", ixs_gdt = "ixs_gdt", nazev = "nazev", popis = "popis", orj = "orj", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kopie = "kopie", verze = "verze", dist_cond = "dist_cond", run_cond = "run_cond", typ_gdt = "typ_gdt", priorita_gdt = "priorita_gdt", priz_log_db = "priz_log_db", zdroj = "zdroj", priz_public = "priz_public", cs_nazev = "cs_nazev", cs_popis = "cs_popis", dnu_exs_adl = "dnu_exs_adl", verze_db = "verze_db", sub_verze_db = "sub_verze_db",}
	const enum GGinsgdtExtDtoFragments { typ_gdt_txt = "*", priorita_gdt_txt = "*", ixs_gdt = "*", nazev = "*", popis = "*", orj = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kopie = "*", verze = "*", dist_cond = "*", run_cond = "*", typ_gdt = "*", priorita_gdt = "*", priz_log_db = "*", zdroj = "*", priz_public = "*", cs_nazev = "*", cs_popis = "*", dnu_exs_adl = "*", verze_db = "*", sub_verze_db = "*",}
	const enum GGinsgdtExtDtoTypes { typ_gdt_txt = "string", priorita_gdt_txt = "string", ixs_gdt = "string", nazev = "string", popis = "string", orj = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kopie = "JsonBlob", verze = "number", dist_cond = "string", run_cond = "string", typ_gdt = "number", priorita_gdt = "number", priz_log_db = "number", zdroj = "string", priz_public = "number", cs_nazev = "string", cs_popis = "string", dnu_exs_adl = "number", verze_db = "number", sub_verze_db = "number",}
	const enum GGinsgdtExtDtoTypeLengths { ixs_gdt = 12, nazev = 254, popis = 254, orj = 4, zmenu_prov = 12, dist_cond = 4000, run_cond = 4000, zdroj = 255, cs_nazev = 254, cs_popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinshvlDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginshvl
	*      Hodnota vlastnosti
	*/
	interface GGinshvlDto {
		/**Vlastnost*/
		ixs_vla?: string|null;
		/**Hodnota*/
		hovla?: string|null;
		/**Hodnota*/
		hovla_txt?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		hovla_txt2?: string|null;
	}
	const enum GGinshvlDtoNames { ixs_vla = "ixs_vla", hovla = "hovla", hovla_txt = "hovla_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", hovla_txt2 = "hovla_txt2",}
	const enum GGinshvlDtoFragments { ixs_vla = "*", hovla = "*", hovla_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", hovla_txt2 = "*",}
	const enum GGinshvlDtoTypes { ixs_vla = "string", hovla = "string", hovla_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", hovla_txt2 = "string",}
	const enum GGinshvlDtoTypeLengths { ixs_vla = 12, hovla = 254, hovla_txt = 254, zmenu_prov = 12, hovla_txt2 = 1000,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsicoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsico
	*      Interní IČO
	*/
	interface GGinsicoDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Název subjektu*/
		nazev?: string|null;
		/**Interní subjekt
		*      Interní ID subjektu, který je hlavním sídlem interního subjektu
		*/
		ixs_isu?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinsicoDtoNames { ico = "ico", nazev = "nazev", ixs_isu = "ixs_isu", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsicoDtoFragments { ico = "*", nazev = "*", ixs_isu = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsicoDtoTypes { ico = "string", nazev = "string", ixs_isu = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsicoDtoTypeLengths { ico = 10, nazev = 100, ixs_isu = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsinsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsins
	*      Instance
	*/
	interface GGinsinsDto {
		/**Instance programové fáze
		*      Instance programové fáze - to je správcem systému pojmenováné konkrétní nastavení jedné fáze
		*/
		ixs_ins?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**minimální priorita pro přístup*/
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Zkratka instance*/
		zkratka?: string|null;
		/**Název instance*/
		nazev?: string|null;
		/**Programová fáze
		*      Fáze spojená na pevno s instancí
		*/
		faze?: string|null;
		/**Přístup*/
		ktg_ins?: number|null;
		/**Externí přístup
		*      Označení instancí webových služeb - slouží pro přístup externích systému do systému GINIS
		*/
		priz_ext?: number|null;
		/**Typ externí agendy
		*      Typ agendy přidělený externímu systému ( měl by být vždy větší jako 3000 )
		*/
		typ_ag_ext?: number|null;
		/**expirace vstupenky ve vteřinách*/
		exp_tic?: number|null;
		/**Externí systém
		*      ID systému, ke kterému je instance fáze přiřazena
		*/
		ixs_ext?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Účel zpracování*/
		ixs_zap?: string|null;
	}
	const enum GGinsinsDtoNames { ixs_ins = "ixs_ins", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", faze = "faze", ktg_ins = "ktg_ins", priz_ext = "priz_ext", typ_ag_ext = "typ_ag_ext", exp_tic = "exp_tic", ixs_ext = "ixs_ext", ixs_lpc = "ixs_lpc", ixs_zap = "ixs_zap",}
	const enum GGinsinsDtoFragments { ixs_ins = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", faze = "*", ktg_ins = "*", priz_ext = "*", typ_ag_ext = "*", exp_tic = "*", ixs_ext = "*", ixs_lpc = "*", ixs_zap = "*",}
	const enum GGinsinsDtoTypes { ixs_ins = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", faze = "string", ktg_ins = "number", priz_ext = "number", typ_ag_ext = "number", exp_tic = "number", ixs_ext = "string", ixs_lpc = "string", ixs_zap = "string",}
	const enum GGinsinsDtoTypeLengths { ixs_ins = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 50, faze = 8, ixs_ext = 12, ixs_lpc = 12, ixs_zap = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinskalDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginskal
	*      Plánovací kalendář
	*/
	interface GGinskalDto {
		/**kalendářní datum*/
		datum?: JsonDate|null;
		/**den v měsíci*/
		den_mes?: number|null;
		/**měsíc v roce*/
		mesic?: number|null;
		/**rok RRRR*/
		rok?: number|null;
		/**Den v týdnu*/
		den_tyd?: number|null;
		/**pořadí týdne v roce*/
		tyden?: number|null;
		/**typ dne (ne/prac,sv)*/
		typ_dne?: number|null;
		/**kdo má svátek*/
		svatek?: string|null;
		/**poř. číslo prac. dne např. od 1.1.1995
		*      Pořadové číslo dne v rámci roku. První den roku bude mít číslo 1. Nepracovní dny budou NULL ( dříve byly 0 )
		*/
		prac_por_cislo?: number|null;
		/**RRMMDD 00:00:00 (pro od-do v selectech přes čas. razítka)*/
		cas_start?: JsonDate|null;
		/**RRMMDD 23:59:59 (pro od-do v selectech přes čas. razítka)*/
		cas_stop?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Pořadové číslo pracovního dnes
		*      Pořadové číslo pracovního dnes spojité přes všechny roky. Nepracovní dny budou NULL ( dříve byly 0 )
		*/
		prac_por_cislo_tot?: number|null;
	}
	const enum GGinskalDtoNames { datum = "datum", den_mes = "den_mes", mesic = "mesic", rok = "rok", den_tyd = "den_tyd", tyden = "tyden", typ_dne = "typ_dne", svatek = "svatek", prac_por_cislo = "prac_por_cislo", cas_start = "cas_start", cas_stop = "cas_stop", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prac_por_cislo_tot = "prac_por_cislo_tot",}
	const enum GGinskalDtoFragments { datum = "*", den_mes = "*", mesic = "*", rok = "*", den_tyd = "*", tyden = "*", typ_dne = "*", svatek = "*", prac_por_cislo = "*", cas_start = "*", cas_stop = "*", dat_zmena = "*", zmenu_prov = "*", prac_por_cislo_tot = "*",}
	const enum GGinskalDtoTypes { datum = "JsonDate", den_mes = "number", mesic = "number", rok = "number", den_tyd = "number", tyden = "number", typ_dne = "number", svatek = "string", prac_por_cislo = "number", cas_start = "JsonDate", cas_stop = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", prac_por_cislo_tot = "number",}
	const enum GGinskalDtoTypeLengths { svatek = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinskeyDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginskey
	*      Slovník přístupových klíčů
	*/
	interface GGinskeyDto {
		acckey?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinskeyDtoNames { acckey = "acckey", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinskeyDtoFragments { acckey = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinskeyDtoTypes { acckey = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinskeyDtoTypeLengths { acckey = 12, nazev = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinskovDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginskov
	*      Způsob využití
	*/
	interface GGinskovDto {
		/**Způsob využití
		*      Způsob využití
		*/
		kod_vyu?: number|null;
		/**Způsob využití
		*      Způsob využití
		*/
		kod_vyu_txt?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		kod_vyu_rsx?: number|null;
	}
	const enum GGinskovDtoNames { kod_vyu = "kod_vyu", kod_vyu_txt = "kod_vyu_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", kod_vyu_rsx = "kod_vyu_rsx",}
	const enum GGinskovDtoFragments { kod_vyu = "*", kod_vyu_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", kod_vyu_rsx = "*",}
	const enum GGinskovDtoTypes { kod_vyu = "number", kod_vyu_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", kod_vyu_rsx = "number",}
	const enum GGinskovDtoTypeLengths { kod_vyu_txt = 50, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinslapDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginslap
	*      Lang AI Aplikace
	*/
	interface GGinslapDto {
		/**PK*/
		ixs_lap?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Systémový prompt
		*       Systémový prompt ovlivňuje chování modelu. Obsahuje instrukce, jakým způsob má model odpovídat na uživatelské prompty
		*/
		lap_sys_prompt?: string|null;
		/**Temperature
		*       hyperparametr ovlivňující determinismus odpovědi. Reálné číslo v intervalu 0-1. Nižší hodnota znamená vyšší determinismus, vyšší naopak větší kreativitu při tvorbe odpovědí
		*/
		lap_temperature?: JsonDecimal|null;
		/**Top P
		*      Hyperparametr Top P je podobný hyperparametru Temperature. Ovlivňuje kreativitu odpovědí, avšak jinou metodou. Hodnota ovlivňuje selekci množiny output tokenů, ze kterých model vybírá. Nižší hodnoty vedou  k nižší kreativitě, naopak vyšší hodnota umožní modelu vybírat z tokenů s nižší pravděpodobností. Realné číslo v intervalo 0-1
		*/
		lap_topp?: JsonDecimal|null;
		/**Omezení počtu vstupních tokenů
		*       Omezí počet tokenů, které jsou uživateli dovoleny ke "spotřebování" v rámci jednoho uživatelského promptu.
		*/
		max_tokeny_in?: number|null;
		/**Omezení počtu výstupních tokenů
		*      Parametr říká modelu, do kolika výstupních tokenů se má jeho odpověď vejít. Výstup (odpověď) modelu nikdy nepřekročí tento limit.
		*/
		max_tokeny_out?: number|null;
		/**Typ Lang AI Aplikace
		*       enumová hodnota
		*/
		lap_typ?: number|null;
		/**Typ výstupu aplikace
		*      Modely běžně odpovídají přes typ Text, avšak mohou vracet i libovolný JSON, nebo JSON odpovídající JSON SCHEMA na vstupu. Pozor, pakliže je nastaven JSON nebo JSON SCHEMA, je nutno k této skutečnosti model instruovat i systémovým promptem, aby nedošlo ke zmatení modelu, které může vést generování maximálního počtu výstupních tokenů.
		*/
		lap_vystup_typ?: number|null;
		/**Ixs datového zdroje
		*       V případě, že má mít chat připojený datový zdroj (RAG)
		*/
		ixs_ldi?: string|null;
		/**Ixs modelu
		*      Ixs identifikátor deploynutého modelu, který má zprostředkovat chat
		*/
		ixs_lmd?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**lidsky čitelný název aplikace, je zobrazován uživateli*/
		nazev_txt?: string|null;
		/**Popis
		*      lidsky čitelný popis ai aplikace, který může být zobrazen uživateli
		*/
		popis?: string|null;
	}
	const enum GGinslapDtoNames { ixs_lap = "ixs_lap", nazev = "nazev", lap_sys_prompt = "lap_sys_prompt", lap_temperature = "lap_temperature", lap_topp = "lap_topp", max_tokeny_in = "max_tokeny_in", max_tokeny_out = "max_tokeny_out", lap_typ = "lap_typ", lap_vystup_typ = "lap_vystup_typ", ixs_ldi = "ixs_ldi", ixs_lmd = "ixs_lmd", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_txt = "nazev_txt", popis = "popis",}
	const enum GGinslapDtoFragments { ixs_lap = "Base", nazev = "Base", lap_sys_prompt = "*", lap_temperature = "*", lap_topp = "*", max_tokeny_in = "*", max_tokeny_out = "*", lap_typ = "*", lap_vystup_typ = "*", ixs_ldi = "*", ixs_lmd = "*", poznamka = "*", aktivita = "Base", dat_zmena = "*", zmenu_prov = "*", nazev_txt = "Base", popis = "Base",}
	const enum GGinslapDtoTypes { ixs_lap = "string", nazev = "string", lap_sys_prompt = "string", lap_temperature = "JsonDecimal", lap_topp = "JsonDecimal", max_tokeny_in = "number", max_tokeny_out = "number", lap_typ = "number", lap_vystup_typ = "number", ixs_ldi = "string", ixs_lmd = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_txt = "string", popis = "string",}
	const enum GGinslapDtoTypeLengths { ixs_lap = 12, nazev = 100, lap_sys_prompt = 32000, ixs_ldi = 12, ixs_lmd = 12, poznamka = 254, zmenu_prov = 12, nazev_txt = 254, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsldiDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsldi
	*      Lang AI datové indexy
	*/
	interface GGinsldiDto {
		ixs_ldi?: string|null;
		nazev_indexu?: string|null;
		popis_indexu?: string|null;
		/**FK na ginsldz*/
		ixs_ldz?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinsldiDtoNames { ixs_ldi = "ixs_ldi", nazev_indexu = "nazev_indexu", popis_indexu = "popis_indexu", ixs_ldz = "ixs_ldz", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsldiDtoFragments { ixs_ldi = "*", nazev_indexu = "*", popis_indexu = "*", ixs_ldz = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsldiDtoTypes { ixs_ldi = "string", nazev_indexu = "string", popis_indexu = "string", ixs_ldz = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsldiDtoTypeLengths { ixs_ldi = 12, nazev_indexu = 128, popis_indexu = 254, ixs_ldz = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsldzDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsldz
	*      Lang AI Datové Zdroje
	*/
	interface GGinsldzDto {
		ixs_ldz?: string|null;
		/**Endpoint URL služby datového zdroje
		*      URL cesta k datovému zdroji, od kud má AI aplikace číst/vyhledávat data
		*/
		endpoint_url?: string|null;
		/**Api klíč ke službě*/
		psw?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinsldzDtoNames { ixs_ldz = "ixs_ldz", endpoint_url = "endpoint_url", psw = "psw", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsldzDtoFragments { ixs_ldz = "Base", endpoint_url = "Base", psw = "*", poznamka = "*", aktivita = "Base", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsldzDtoTypes { ixs_ldz = "string", endpoint_url = "string", psw = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsldzDtoTypeLengths { ixs_ldz = 12, endpoint_url = 512, psw = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinslicDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginslic
	*      Obsah licenčního certifikátu
	*/
	interface GGinslicDto {
		/**Licence databáze*/
		lic?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Položka*/
		pol?: string|null;
		/**PPol*/
		ppol?: string|null;
		/**Režim licencování*/
		rezim_lic?: number|null;
		/**Popis
		*      Popis ceníkové položky
		*/
		popis?: string|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Počet
		*      Počet povolených použití položky - může se jednat o počet naadministrovaných přístupů k aplikaci nebo o počet dokladů za rok atd..
		*/
		pocet?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		ico_fakt?: string|null;
	}
	const enum GGinslicDtoNames { lic = "lic", dat_od = "dat_od", pol = "pol", ppol = "ppol", rezim_lic = "rezim_lic", popis = "popis", dat_do = "dat_do", pocet = "pocet", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico_fakt = "ico_fakt",}
	const enum GGinslicDtoFragments { lic = "*", dat_od = "*", pol = "*", ppol = "*", rezim_lic = "*", popis = "*", dat_do = "*", pocet = "*", dat_zmena = "*", zmenu_prov = "*", ico_fakt = "*",}
	const enum GGinslicDtoTypes { lic = "string", dat_od = "JsonDate", pol = "string", ppol = "string", rezim_lic = "number", popis = "string", dat_do = "JsonDate", pocet = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico_fakt = "string",}
	const enum GGinslicDtoTypeLengths { lic = 4, pol = 4, ppol = 3, popis = 254, zmenu_prov = 12, ico_fakt = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinslmdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginslmd
	*      Lang Model Deploy
	*/
	interface GGinslmdDto {
		ixs_lmd?: string|null;
		/**Název
		*       Název musí přesně odpovídat názvu modelu jako je uvedená v předplatném. Pokud je model v Azure AI pojmenován jako GPT4o-vlastni, musí být stejně název zadán i zde
		*/
		nazev?: string|null;
		/**Limit deklarovaný dodavatelem pro konkrétní model*/
		lmd_token_limit?: number|null;
		/**Platnost OD
		*      Modely mají uváděnou platnost provozu.
		*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Doplňující URL. Aktuálně se přistupuje ke všem modelům s URL předplatného a názvu deploy. Zatím rezervováno pro budoucí použití*/
		lmd_url?: string|null;
		/**Lang Model API
		*       Které API se má v rámci komunikace využít.
		*/
		lm_api_typ?: number|null;
		/**Typ modelu z katalogu jazykových modelů vas.ginclmk*/
		lmodel_typ?: number|null;
		/**Identifikátor předplatného*/
		ixs_lps?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinslmdDtoNames { ixs_lmd = "ixs_lmd", nazev = "nazev", lmd_token_limit = "lmd_token_limit", dat_od = "dat_od", dat_do = "dat_do", lmd_url = "lmd_url", lm_api_typ = "lm_api_typ", lmodel_typ = "lmodel_typ", ixs_lps = "ixs_lps", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinslmdDtoFragments { ixs_lmd = "*", nazev = "*", lmd_token_limit = "*", dat_od = "*", dat_do = "*", lmd_url = "*", lm_api_typ = "*", lmodel_typ = "*", ixs_lps = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinslmdDtoTypes { ixs_lmd = "string", nazev = "string", lmd_token_limit = "number", dat_od = "JsonDate", dat_do = "JsonDate", lmd_url = "string", lm_api_typ = "number", lmodel_typ = "number", ixs_lps = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinslmdDtoTypeLengths { ixs_lmd = 12, nazev = 100, lmd_url = 255, ixs_lps = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinslpsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginslps
	*      ginslps
	*/
	interface GGinslpsDto {
		baseFragment?: string|null;
		/**Lang Předplatné Služby
		*      V této tabulce se nachází předplacené služby, na které se váže základní URL modelu, OAuth profil, popř API klíč
		*/
		ixs_lps?: string|null;
		/**Endpoint URL
		*      Url předplacené AI služby. Např. předplatné na Azure Open AI
		*/
		endpoint?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
		/**API klíč
		*      Doporučeno nepoužívat a založit OAuth profil, pokud však je nutné API klíč zadat, je zadáván zde
		*/
		psw?: string|null;
		/**Identifikátor OAuth profilu*/
		ixs_oap?: string|null;
		/**Typ (dodavatel) služby*/
		lpsluzby_typ?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinslpsDtoNames { baseFragment = "baseFragment", ixs_lps = "ixs_lps", endpoint = "endpoint", nazev = "nazev", popis = "popis", psw = "psw", ixs_oap = "ixs_oap", lpsluzby_typ = "lpsluzby_typ", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinslpsDtoFragments { baseFragment = "*", ixs_lps = "Base", endpoint = "Base", nazev = "Base", popis = "*", psw = "*", ixs_oap = "*", lpsluzby_typ = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinslpsDtoTypes { baseFragment = "string", ixs_lps = "string", endpoint = "string", nazev = "string", popis = "string", psw = "string", ixs_oap = "string", lpsluzby_typ = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinslpsDtoTypeLengths { ixs_lps = 12, endpoint = 4000, nazev = 100, popis = 255, psw = 254, ixs_oap = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinslscDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginslsc
	*      AI přednastavené scénáře
	*/
	interface GGinslscDto {
		ixs_lsc?: string|null;
		/**Uživatelský prompt
		*      Scénář odešle dotaz s tímto uživatelským promptem
		*/
		lsc_prompt?: string|null;
		/**Lidsky čitelný popis promptu. Je zobrazován uživateli*/
		lsc_prompt_txt?: string|null;
		/**Systémový prompt
		*      Lze nastavovat i systémový prompt, avšak ten je zatím rezervován pro budoucí využití, aktuálně ve scénářnich nehraje žádnou roli.
		*/
		lsc_sys_prompt?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		lsc_popis?: string|null;
	}
	const enum GGinslscDtoNames { ixs_lsc = "ixs_lsc", lsc_prompt = "lsc_prompt", lsc_prompt_txt = "lsc_prompt_txt", lsc_sys_prompt = "lsc_sys_prompt", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", lsc_popis = "lsc_popis",}
	const enum GGinslscDtoFragments { ixs_lsc = "*", lsc_prompt = "*", lsc_prompt_txt = "*", lsc_sys_prompt = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", lsc_popis = "*",}
	const enum GGinslscDtoTypes { ixs_lsc = "string", lsc_prompt = "string", lsc_prompt_txt = "string", lsc_sys_prompt = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", lsc_popis = "string",}
	const enum GGinslscDtoTypeLengths { ixs_lsc = 12, lsc_prompt = 32000, lsc_prompt_txt = 50, lsc_sys_prompt = 32000, poznamka = 254, zmenu_prov = 12, lsc_popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsmbxDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsmbx
	*      Schránka
	*/
	interface GGinsmbxDto {
		/**ID schránky*/
		mailbox?: string|null;
		/**Spisový uzel
		*      Spisový uzel, ke kterému datová schránka přísluší
		*/
		ixs_su?: string|null;
		/**Typ schránky
		*      Určuje typ schánky ( mail, ISDS, GEX )
		*/
		typ_mbx?: number|null;
		/**Server
		*      Má význam pro mail schránku
		*/
		server_name?: string|null;
		/**Port
		*      Má význam pro mail schránku
		*/
		port?: number|null;
		/**Login
		*      Login k serveru elektronické schánky, který je aplikační loginkou použit pro fyzické připojení.
		*/
		ldb?: string|null;
		/**Heslo 
		*      Heslo pro přihlášení k serveru
		*/
		pdb?: string|null;
		/**Příznak bezpečné autorizace*/
		priz_ba?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název schránky*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		dat_start?: JsonDate|null;
		dat_stop?: JsonDate|null;
		krok_inb?: number|null;
		gor_err?: number|null;
		db_err?: number|null;
		dat_err?: JsonDate|null;
		txt_err?: string|null;
		lok_err?: string|null;
		txt_err_uziv?: string|null;
		priz_automat?: number|null;
		/**Certifikát*/
		ixs_cer?: string|null;
		/**Hlavní schránka
		*      Příznak hlavní schránky organizace
		*/
		priz_main?: number|null;
		/**Typ autentizace
		*      Typ autentizace pro tuto schránku
		*/
		typ_aute?: number|null;
		/**Schránka pro hledání
		*      Tato datová schrána je určena pro hledání adres v registru
		*/
		priz_findbx?: number|null;
		priz_send_only?: number|null;
		priz_master?: number|null;
		/**Typ DB stroje*/
		typ_db?: string|null;
		/**Jméno databáze*/
		db_name?: string|null;
		/**Jméno DB serveru*/
		servername32?: string|null;
		pds_ldb?: string|null;
		pds_pdb?: string|null;
		pds_url?: string|null;
		id_uzemi?: string|null;
		/**Typ subjektu pro ISDS*/
		typ_isds?: string|null;
		dat_chpasswd?: JsonDate|null;
		dat_exp_warn1?: JsonDate|null;
		dat_exp_warn2?: JsonDate|null;
		dat_exp?: JsonDate|null;
		priz_read?: number|null;
		priz_write?: number|null;
		priz_find?: number|null;
		priz_work?: number|null;
		faze_krok_inb?: string|null;
		/**Interní subjekt*/
		ixs_isu?: string|null;
		ixs_zmp_start?: string|null;
		ixs_zmp_stop?: string|null;
		priz_ssl?: number|null;
		dat_posl_stazeni?: JsonDate|null;
		/**OAuth profil*/
		ixs_oap?: string|null;
	}
	const enum GGinsmbxDtoNames { mailbox = "mailbox", ixs_su = "ixs_su", typ_mbx = "typ_mbx", server_name = "server_name", port = "port", ldb = "ldb", pdb = "pdb", priz_ba = "priz_ba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", poznamka = "poznamka", dat_start = "dat_start", dat_stop = "dat_stop", krok_inb = "krok_inb", gor_err = "gor_err", db_err = "db_err", dat_err = "dat_err", txt_err = "txt_err", lok_err = "lok_err", txt_err_uziv = "txt_err_uziv", priz_automat = "priz_automat", ixs_cer = "ixs_cer", priz_main = "priz_main", typ_aute = "typ_aute", priz_findbx = "priz_findbx", priz_send_only = "priz_send_only", priz_master = "priz_master", typ_db = "typ_db", db_name = "db_name", servername32 = "servername32", pds_ldb = "pds_ldb", pds_pdb = "pds_pdb", pds_url = "pds_url", id_uzemi = "id_uzemi", typ_isds = "typ_isds", dat_chpasswd = "dat_chpasswd", dat_exp_warn1 = "dat_exp_warn1", dat_exp_warn2 = "dat_exp_warn2", dat_exp = "dat_exp", priz_read = "priz_read", priz_write = "priz_write", priz_find = "priz_find", priz_work = "priz_work", faze_krok_inb = "faze_krok_inb", ixs_isu = "ixs_isu", ixs_zmp_start = "ixs_zmp_start", ixs_zmp_stop = "ixs_zmp_stop", priz_ssl = "priz_ssl", dat_posl_stazeni = "dat_posl_stazeni", ixs_oap = "ixs_oap",}
	const enum GGinsmbxDtoFragments { mailbox = "*", ixs_su = "*", typ_mbx = "*", server_name = "*", port = "*", ldb = "*", pdb = "*", priz_ba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", poznamka = "*", dat_start = "*", dat_stop = "*", krok_inb = "*", gor_err = "*", db_err = "*", dat_err = "*", txt_err = "*", lok_err = "*", txt_err_uziv = "*", priz_automat = "*", ixs_cer = "*", priz_main = "*", typ_aute = "*", priz_findbx = "*", priz_send_only = "*", priz_master = "*", typ_db = "*", db_name = "*", servername32 = "*", pds_ldb = "*", pds_pdb = "*", pds_url = "*", id_uzemi = "*", typ_isds = "*", dat_chpasswd = "*", dat_exp_warn1 = "*", dat_exp_warn2 = "*", dat_exp = "*", priz_read = "*", priz_write = "*", priz_find = "*", priz_work = "*", faze_krok_inb = "*", ixs_isu = "*", ixs_zmp_start = "*", ixs_zmp_stop = "*", priz_ssl = "*", dat_posl_stazeni = "*", ixs_oap = "*",}
	const enum GGinsmbxDtoTypes { mailbox = "string", ixs_su = "string", typ_mbx = "number", server_name = "string", port = "number", ldb = "string", pdb = "string", priz_ba = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", poznamka = "string", dat_start = "JsonDate", dat_stop = "JsonDate", krok_inb = "number", gor_err = "number", db_err = "number", dat_err = "JsonDate", txt_err = "string", lok_err = "string", txt_err_uziv = "string", priz_automat = "number", ixs_cer = "string", priz_main = "number", typ_aute = "number", priz_findbx = "number", priz_send_only = "number", priz_master = "number", typ_db = "string", db_name = "string", servername32 = "string", pds_ldb = "string", pds_pdb = "string", pds_url = "string", id_uzemi = "string", typ_isds = "string", dat_chpasswd = "JsonDate", dat_exp_warn1 = "JsonDate", dat_exp_warn2 = "JsonDate", dat_exp = "JsonDate", priz_read = "number", priz_write = "number", priz_find = "number", priz_work = "number", faze_krok_inb = "string", ixs_isu = "string", ixs_zmp_start = "string", ixs_zmp_stop = "string", priz_ssl = "number", dat_posl_stazeni = "JsonDate", ixs_oap = "string",}
	const enum GGinsmbxDtoTypeLengths { mailbox = 100, ixs_su = 12, server_name = 50, ldb = 254, pdb = 254, zmenu_prov = 12, nazev = 50, poznamka = 50, txt_err = 254, lok_err = 254, txt_err_uziv = 254, ixs_cer = 12, typ_db = 3, db_name = 100, servername32 = 100, pds_ldb = 254, pds_pdb = 254, pds_url = 254, id_uzemi = 100, typ_isds = 100, faze_krok_inb = 8, ixs_isu = 12, ixs_zmp_start = 12, ixs_zmp_stop = 12, ixs_oap = 12,}
	/**Rozšíření o txt proměnné*/
	interface GGinsmbxExtDto extends Gordic.Adm.Interface.GGinsmbxDto {
		/**ixs_su_txt*/
		ixs_su_txt?: string|null;
	}
	const enum GGinsmbxExtDtoNames { ixs_su_txt = "ixs_su_txt", mailbox = "mailbox", ixs_su = "ixs_su", typ_mbx = "typ_mbx", server_name = "server_name", port = "port", ldb = "ldb", pdb = "pdb", priz_ba = "priz_ba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", poznamka = "poznamka", dat_start = "dat_start", dat_stop = "dat_stop", krok_inb = "krok_inb", gor_err = "gor_err", db_err = "db_err", dat_err = "dat_err", txt_err = "txt_err", lok_err = "lok_err", txt_err_uziv = "txt_err_uziv", priz_automat = "priz_automat", ixs_cer = "ixs_cer", priz_main = "priz_main", typ_aute = "typ_aute", priz_findbx = "priz_findbx", priz_send_only = "priz_send_only", priz_master = "priz_master", typ_db = "typ_db", db_name = "db_name", servername32 = "servername32", pds_ldb = "pds_ldb", pds_pdb = "pds_pdb", pds_url = "pds_url", id_uzemi = "id_uzemi", typ_isds = "typ_isds", dat_chpasswd = "dat_chpasswd", dat_exp_warn1 = "dat_exp_warn1", dat_exp_warn2 = "dat_exp_warn2", dat_exp = "dat_exp", priz_read = "priz_read", priz_write = "priz_write", priz_find = "priz_find", priz_work = "priz_work", faze_krok_inb = "faze_krok_inb", ixs_isu = "ixs_isu", ixs_zmp_start = "ixs_zmp_start", ixs_zmp_stop = "ixs_zmp_stop", priz_ssl = "priz_ssl", dat_posl_stazeni = "dat_posl_stazeni", ixs_oap = "ixs_oap",}
	const enum GGinsmbxExtDtoFragments { ixs_su_txt = "*", mailbox = "*", ixs_su = "*", typ_mbx = "*", server_name = "*", port = "*", ldb = "*", pdb = "*", priz_ba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", poznamka = "*", dat_start = "*", dat_stop = "*", krok_inb = "*", gor_err = "*", db_err = "*", dat_err = "*", txt_err = "*", lok_err = "*", txt_err_uziv = "*", priz_automat = "*", ixs_cer = "*", priz_main = "*", typ_aute = "*", priz_findbx = "*", priz_send_only = "*", priz_master = "*", typ_db = "*", db_name = "*", servername32 = "*", pds_ldb = "*", pds_pdb = "*", pds_url = "*", id_uzemi = "*", typ_isds = "*", dat_chpasswd = "*", dat_exp_warn1 = "*", dat_exp_warn2 = "*", dat_exp = "*", priz_read = "*", priz_write = "*", priz_find = "*", priz_work = "*", faze_krok_inb = "*", ixs_isu = "*", ixs_zmp_start = "*", ixs_zmp_stop = "*", priz_ssl = "*", dat_posl_stazeni = "*", ixs_oap = "*",}
	const enum GGinsmbxExtDtoTypes { ixs_su_txt = "string", mailbox = "string", ixs_su = "string", typ_mbx = "number", server_name = "string", port = "number", ldb = "string", pdb = "string", priz_ba = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", poznamka = "string", dat_start = "JsonDate", dat_stop = "JsonDate", krok_inb = "number", gor_err = "number", db_err = "number", dat_err = "JsonDate", txt_err = "string", lok_err = "string", txt_err_uziv = "string", priz_automat = "number", ixs_cer = "string", priz_main = "number", typ_aute = "number", priz_findbx = "number", priz_send_only = "number", priz_master = "number", typ_db = "string", db_name = "string", servername32 = "string", pds_ldb = "string", pds_pdb = "string", pds_url = "string", id_uzemi = "string", typ_isds = "string", dat_chpasswd = "JsonDate", dat_exp_warn1 = "JsonDate", dat_exp_warn2 = "JsonDate", dat_exp = "JsonDate", priz_read = "number", priz_write = "number", priz_find = "number", priz_work = "number", faze_krok_inb = "string", ixs_isu = "string", ixs_zmp_start = "string", ixs_zmp_stop = "string", priz_ssl = "number", dat_posl_stazeni = "JsonDate", ixs_oap = "string",}
	const enum GGinsmbxExtDtoTypeLengths { mailbox = 100, ixs_su = 12, server_name = 50, ldb = 254, pdb = 254, zmenu_prov = 12, nazev = 50, poznamka = 50, txt_err = 254, lok_err = 254, txt_err_uziv = 254, ixs_cer = 12, typ_db = 3, db_name = 100, servername32 = 100, pds_ldb = 254, pds_pdb = 254, pds_url = 254, id_uzemi = 100, typ_isds = 100, faze_krok_inb = 8, ixs_isu = 12, ixs_zmp_start = 12, ixs_zmp_stop = 12, ixs_oap = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsmisDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsmis
	*      Místnost
	*/
	interface GGinsmisDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy*/
		segment_kod?: string|null;
		/**umístění židle, kód místnosti*/
		mistnost_kod?: string|null;
		/**název/popis místnosti*/
		mistnost_naz?: string|null;
		/**Patro*/
		patro?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Uživatel*/
		ixs_esu_uziv?: string|null;
		/**Správce budovy*/
		ixs_esu_spr?: string|null;
		/**Plocha*/
		plocha?: JsonDecimal|null;
		/**Druh místnosti*/
		mistnost_druh?: number|null;
		/**Způsob využití*/
		kod_vyu?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Čárový kód*/
		id_kod?: string|null;
		/**Zodpovědná osoba
		*      Zodpovědná osoba
		*/
		ixs_ref?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Elementární objekt*/
		ixs_elo?: string|null;
	}
	const enum GGinsmisDtoNames { ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", mistnost_naz = "mistnost_naz", patro = "patro", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", plocha = "plocha", mistnost_druh = "mistnost_druh", kod_vyu = "kod_vyu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_kod = "id_kod", ixs_ref = "ixs_ref", ixs_lpc = "ixs_lpc", ixs_elo = "ixs_elo",}
	const enum GGinsmisDtoFragments { ico = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", mistnost_naz = "*", patro = "*", dat_od = "*", dat_do = "*", poznamka = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", plocha = "*", mistnost_druh = "*", kod_vyu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_kod = "*", ixs_ref = "*", ixs_lpc = "*", ixs_elo = "*",}
	const enum GGinsmisDtoTypes { ico = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", mistnost_naz = "string", patro = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", plocha = "JsonDecimal", mistnost_druh = "number", kod_vyu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_kod = "string", ixs_ref = "string", ixs_lpc = "string", ixs_elo = "string",}
	const enum GGinsmisDtoTypeLengths { ico = 10, budova_kod = 8, segment_kod = 8, mistnost_kod = 8, mistnost_naz = 50, patro = 10, poznamka = 254, ixs_esu_uziv = 12, ixs_esu_spr = 12, zmenu_prov = 12, id_kod = 12, ixs_ref = 12, ixs_lpc = 12, ixs_elo = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsoapDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsoap
	*      OAuth profily
	*/
	interface GGinsoapDto {
		/**OAuth profil
		*      OAuth profily
		*/
		ixs_oap?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		tenant_id?: string|null;
		typ_cloudu?: number|null;
		clie_id?: string|null;
		cl_sec?: string|null;
		o365_url?: string|null;
		typ_aut_oauth?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		prompt?: number|null;
		csas_api_key?: string|null;
		csas_type?: number|null;
	}
	const enum GGinsoapDtoNames { ixs_oap = "ixs_oap", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", tenant_id = "tenant_id", typ_cloudu = "typ_cloudu", clie_id = "clie_id", cl_sec = "cl_sec", o365_url = "o365_url", typ_aut_oauth = "typ_aut_oauth", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prompt = "prompt", csas_api_key = "csas_api_key", csas_type = "csas_type",}
	const enum GGinsoapDtoFragments { ixs_oap = "*", nazev = "*", dat_od = "*", dat_do = "*", tenant_id = "*", typ_cloudu = "*", clie_id = "*", cl_sec = "*", o365_url = "*", typ_aut_oauth = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", prompt = "*", csas_api_key = "*", csas_type = "*",}
	const enum GGinsoapDtoTypes { ixs_oap = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", tenant_id = "string", typ_cloudu = "number", clie_id = "string", cl_sec = "string", o365_url = "string", typ_aut_oauth = "number", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", prompt = "number", csas_api_key = "string", csas_type = "number",}
	const enum GGinsoapDtoTypeLengths { ixs_oap = 12, nazev = 100, tenant_id = 254, clie_id = 254, cl_sec = 254, o365_url = 254, poznamka = 254, zmenu_prov = 12, csas_api_key = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsoatDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsoat
	*      Tabulka pro uložení tokenů pro OAuth
	*/
	interface GGinsoatDto {
		/**Identifikátor GUID*/
		oauth_token?: string|null;
		/**Profil*/
		ixs_oap?: string|null;
		/**Secret pro OAuth*/
		obsah?: JsonBlob|null;
		/**Typ tokenu*/
		oa_token_typ?: number|null;
		/**Datum expirace*/
		dat_exp?: JsonDate|null;
		/**Secret scope*/
		secret_scope?: number|null;
		/**Služba OAuth*/
		oauth_service?: number|null;
		/**Osoba*/
		ixs_ref?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinsoatDtoNames { oauth_token = "oauth_token", ixs_oap = "ixs_oap", obsah = "obsah", oa_token_typ = "oa_token_typ", dat_exp = "dat_exp", secret_scope = "secret_scope", oauth_service = "oauth_service", ixs_ref = "ixs_ref", ixs_lpc = "ixs_lpc", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsoatDtoFragments { oauth_token = "*", ixs_oap = "*", obsah = "*", oa_token_typ = "*", dat_exp = "*", secret_scope = "*", oauth_service = "*", ixs_ref = "*", ixs_lpc = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsoatDtoTypes { oauth_token = "string", ixs_oap = "string", obsah = "JsonBlob", oa_token_typ = "number", dat_exp = "JsonDate", secret_scope = "number", oauth_service = "number", ixs_ref = "string", ixs_lpc = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsoatDtoTypeLengths { oauth_token = 36, ixs_oap = 12, ixs_ref = 12, ixs_lpc = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsobdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsobd
	*      Evidenční období
	*/
	interface GGinsobdDto {
		/**ID období
		*      Nevypovídající ID evidenčního období organizace.
		*/
		ixs_obd?: string|null;
		/**IČo
		*      IČo organizace, pro kterou evidenční období patří
		*/
		ico?: string|null;
		/**Externí systém
		*      ID systému ke kterému evidenční obodbí patří - pro vlastní systém GINIS se bude jednat o konstantu 0000AIE00006
		*/
		ixs_ext?: string|null;
		/**Název evidenčního období
		*      U strojně generovaných období to bude ROK - ICO
		*/
		nazev?: string|null;
		/**Počátek období
		*      Počátek evidenčního období. Standardně se bude jednat o 01.01.ROK
		*/
		dat_od?: JsonDate|null;
		/**Konec období
		*      Konec evidenčního období.
		*/
		dat_do?: JsonDate|null;
		/**Aktivita
		*      Příznak otevření evidenčního období
		*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Poslední použité číslo
		*      Poslední použité evidenční pořadové číslo v rámci evidenčního období. Pokud nebylo použito žádné číslo, potom je zde 0.
		*/
		por_cislo_obd_max?: number|null;
		/**Formátovací předpis nového ČJ*/
		zkratka?: string|null;
	}
	const enum GGinsobdDtoNames { ixs_obd = "ixs_obd", ico = "ico", ixs_ext = "ixs_ext", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_obd_max = "por_cislo_obd_max", zkratka = "zkratka",}
	const enum GGinsobdDtoFragments { ixs_obd = "*", ico = "*", ixs_ext = "*", nazev = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_obd_max = "*", zkratka = "*",}
	const enum GGinsobdDtoTypes { ixs_obd = "string", ico = "string", ixs_ext = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_obd_max = "number", zkratka = "string",}
	const enum GGinsobdDtoTypeLengths { ixs_obd = 12, ico = 10, ixs_ext = 12, nazev = 254, zmenu_prov = 12, zkratka = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsobjDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsobj*/
	interface GGinsobjDto {
		/**DBCOLUMN:ginsobj.sxs*/
		sxs?: string|null;
		/**DBCOLUMN:ginsobj.typ_obj*/
		typ_obj?: number|null;
		/**DBCOLUMN:ginsobj.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:ginsobj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsobj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsobj.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsobj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsobj.ixs_lpc*/
		ixs_lpc?: string|null;
	}
	const enum GGinsobjDtoNames { sxs = "sxs", typ_obj = "typ_obj", typ_ag = "typ_ag", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ixs_lpc = "ixs_lpc",}
	const enum GGinsobjDtoFragments { sxs = "*", typ_obj = "*", typ_ag = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", ixs_lpc = "*",}
	const enum GGinsobjDtoTypes { sxs = "string", typ_obj = "number", typ_ag = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ixs_lpc = "string",}
	const enum GGinsobjDtoTypeLengths { sxs = 50, zmenu_prov = 12, nazev = 50, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsorjDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsorj*/
	interface GGinsorjDto {
		/**DBCOLUMN:ginsorj.ixs_orj*/
		ixs_orj?: string|null;
		/**DBCOLUMN:ginsorj.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginsorj.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsorj.arw*/
		arw?: number|null;
		/**DBCOLUMN:ginsorj.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsorj.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsorj.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsorj.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsorj.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsorj.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:ginsorj.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsorj.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsorj.uroven_orj*/
		uroven_orj?: number|null;
		/**DBCOLUMN:ginsorj.ixs_nad*/
		ixs_nad?: string|null;
		/**DBCOLUMN:ginsorj.kod_orj*/
		kod_orj?: string|null;
		/**DBCOLUMN:ginsorj.ixs_isu*/
		ixs_isu?: string|null;
		/**DBCOLUMN:ginsorj.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ginsorj.ofic_nazev*/
		ofic_nazev?: string|null;
		/**DBCOLUMN:ginsorj.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:ginsorj.num_pod*/
		num_pod?: number|null;
		/**DBCOLUMN:ginsorj.mail*/
		mail?: string|null;
		/**DBCOLUMN:ginsorj.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:ginsorj.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:ginsorj.tel*/
		tel?: string|null;
		/**DBCOLUMN:ginsorj.fax*/
		fax?: string|null;
		/**DBCOLUMN:ginsorj.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginsorj.ico*/
		ico?: string|null;
		/**DBCOLUMN:ginsorj.dat_sync*/
		dat_sync?: JsonDate|null;
	}
	const enum GGinsorjDtoNames { ixs_orj = "ixs_orj", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", uroven_orj = "uroven_orj", ixs_nad = "ixs_nad", kod_orj = "kod_orj", ixs_isu = "ixs_isu", ixs_fun = "ixs_fun", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev", num_pod = "num_pod", mail = "mail", z_int = "z_int", dat_mpd = "dat_mpd", tel = "tel", fax = "fax", ixs_lpc = "ixs_lpc", ico = "ico", dat_sync = "dat_sync",}
	const enum GGinsorjDtoFragments { ixs_orj = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "*", uroven_orj = "*", ixs_nad = "*", kod_orj = "*", ixs_isu = "*", ixs_fun = "*", ofic_nazev = "*", cs_nazev = "*", num_pod = "*", mail = "*", z_int = "*", dat_mpd = "*", tel = "*", fax = "*", ixs_lpc = "*", ico = "*", dat_sync = "*",}
	const enum GGinsorjDtoTypes { ixs_orj = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", uroven_orj = "number", ixs_nad = "string", kod_orj = "string", ixs_isu = "string", ixs_fun = "string", ofic_nazev = "string", cs_nazev = "string", num_pod = "number", mail = "string", z_int = "number", dat_mpd = "JsonDate", tel = "string", fax = "string", ixs_lpc = "string", ico = "string", dat_sync = "JsonDate",}
	const enum GGinsorjDtoTypeLengths { ixs_orj = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, zkratka = 16, nazev = 100, ixs_nad = 12, kod_orj = 30, ixs_isu = 12, ixs_fun = 12, ofic_nazev = 254, cs_nazev = 100, mail = 254, tel = 33, fax = 33, ixs_lpc = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsparDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginspar*/
	interface GGinsparDto {
		/**DBCOLUMN:ginspar.uroven_cfg*/
		uroven_cfg?: number|null;
		/**DBCOLUMN:ginspar.param*/
		param?: string|null;
		/**DBCOLUMN:ginspar.subj_cfg*/
		subj_cfg?: string|null;
		/**DBCOLUMN:ginspar.config*/
		config?: string|null;
		/**DBCOLUMN:ginspar.config_txt*/
		config_txt?: string|null;
		/**DBCOLUMN:ginspar.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginspar.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginspar.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginspar.ixs_lpc*/
		ixs_lpc?: string|null;
	}
	const enum GGinsparDtoNames { uroven_cfg = "uroven_cfg", param = "param", subj_cfg = "subj_cfg", config = "config", config_txt = "config_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc",}
	const enum GGinsparDtoFragments { uroven_cfg = "*", param = "*", subj_cfg = "*", config = "*", config_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*",}
	const enum GGinsparDtoTypes { uroven_cfg = "number", param = "string", subj_cfg = "string", config = "string", config_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string",}
	const enum GGinsparDtoTypeLengths { param = 15, subj_cfg = 40, config = 200, config_txt = 200, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsparhhDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsparhh
	*      konfigurace parametrů - audit
	*/
	interface GGinsparhhDto {
		iud?: string|null;
		dat_iud?: JsonDate|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**úroveň konfigurace*/
		uroven_cfg?: number|null;
		/**subjekt, ke kterému se konfigurace vztahuje*/
		subj_cfg?: string|null;
		/**parametr*/
		param?: string|null;
		/**hodnota parametru*/
		config?: string|null;
		/**Hodnota parametru*/
		config_txt?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinsparhhDtoNames { iud = "iud", dat_iud = "dat_iud", ixs_lpc = "ixs_lpc", uroven_cfg = "uroven_cfg", subj_cfg = "subj_cfg", param = "param", config = "config", config_txt = "config_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsparhhDtoFragments { iud = "*", dat_iud = "*", ixs_lpc = "*", uroven_cfg = "*", subj_cfg = "*", param = "*", config = "*", config_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsparhhDtoTypes { iud = "string", dat_iud = "JsonDate", ixs_lpc = "string", uroven_cfg = "number", subj_cfg = "string", param = "string", config = "string", config_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsparhhDtoTypeLengths { iud = 1, ixs_lpc = 12, subj_cfg = 40, param = 15, config = 200, config_txt = 200, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinspodDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginspod
	*      Spisový uzel
	*/
	interface GGinspodDto {
		/**Spisový uzel*/
		ixs_su?: string|null;
		/**Licence*/
		lic?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Nepoužívá se*/
		arw?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Podatelna
		*      Příznak, že spisový uzel funguje jako podatelna
		*/
		priz_pod?: number|null;
		/**Výpravna
		*      Příznak, že spisový uzel funguje jako výpravna
		*/
		priz_vyp?: number|null;
		/**Nadříízený
		*      ID nadřízeného spisového uzlu. Uzly tvoří stromovou strukturu na jejímž vrcholu stojí hlavní podatelna a nad ní uzel Neurčeno.
		*/
		ixs_nad?: string|null;
		/**Licence uzlu
		*      Licence databáze ke které organizačně spisový uzel přísluší. Má význam pouze na MO ČR
		*/
		lic_adr?: string|null;
		/**Oficiální název*/
		ofic_nazev?: string|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**Počet podřízených
		*      Pomocný sloupec který se neukazuje. Obsahuje počet podřízených spisových uzlů. Průběžně se udržuje a pomáhá při vykreslení stromu spisových uzlů - tzv. podací graf
		*/
		num_pod?: number|null;
		/**Mail
		*      Kontaktní mail na spisový uzel
		*/
		mail?: string|null;
		/**URL*/
		url?: string|null;
		/**Kurýr
		*      Příznak, že se nejedná o skutečný spisový uzel ale pouze o skupiny kurýrů, kteří zajišťují přesun dokumentů mezi spisovými uzly. Nejsou logickou součástí podacího grafu a účastní se redistribucí ale tak, že nemění plánování tras.
		*/
		priz_kur?: number|null;
		/**Zodpovídá
		*      Funkční místo, které zodpovídá za spisový uzel z pohledu redistribuce dokumnetů. Často se jedná o sekretářku, která přerozděluje dokumenty v rámci uzlu a v některých případech vystupuje za celý uzel.
		*/
		ixs_fun?: string|null;
		/**Středisko
		*      Středisko spisových uzlů ke kterému spisový uzel náleží. Od střediska se odvozuje Interní subjekt a tím i organizace a IČO ke které uzel patří
		*/
		ixs_tre?: string|null;
		/**El.podatelna
		*      Příznak elektronické podatelny
		*/
		priz_evy?: number|null;
		/**Z interface
		*      Příznak, že záznam vznikl prostřednictvím interface.
		*/
		z_int?: number|null;
		/**Čas zápisu
		*      Čas vzniku záznamu.
		*/
		dat_mpd?: JsonDate|null;
		/**Průtokový
		*      Příznak, že v rámci redistribucí dokumentů je tento uzel průtokový. Tedy při výpočtu další trasy dokumentu tento uzel není do trasy zahrnut jako další cíl - je přeskakován.
		*/
		priz_prut?: number|null;
		/**Servisní
		*      Příznak, že se jedná o servisní uzel. Při redistribucích se uživatelům tento uzel nenabízí jako cíl pro předání. Jsou na něm umístěny uživatelů systémových služeb, např. ZUDu.
		*/
		priz_servis?: number|null;
		/**Telefon
		*      Kontaktní telefon na spisový uzel
		*/
		tel?: string|null;
		/**Fax
		*      Kontaktní fax na spisový uzel
		*/
		fax?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**IČO
		*      IČO interního subjeltu ke kterému spisový uzel přísluší
		*/
		ico?: string|null;
		/**Externí systém
		*      Externí systém typu AIS, na který se mají předat přes rozhraní dokumenty v případě, že je dokument předán a tento spisový uzel
		*/
		ixs_ext_ais?: string|null;
	}
	const enum GGinspodDtoNames { ixs_su = "ixs_su", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", priz_pod = "priz_pod", priz_vyp = "priz_vyp", ixs_nad = "ixs_nad", lic_adr = "lic_adr", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev", num_pod = "num_pod", mail = "mail", url = "url", priz_kur = "priz_kur", ixs_fun = "ixs_fun", ixs_tre = "ixs_tre", priz_evy = "priz_evy", z_int = "z_int", dat_mpd = "dat_mpd", priz_prut = "priz_prut", priz_servis = "priz_servis", tel = "tel", fax = "fax", ixs_lpc = "ixs_lpc", ico = "ico", ixs_ext_ais = "ixs_ext_ais",}
	const enum GGinspodDtoFragments { ixs_su = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", priz_pod = "*", priz_vyp = "*", ixs_nad = "*", lic_adr = "*", ofic_nazev = "*", cs_nazev = "*", num_pod = "*", mail = "*", url = "*", priz_kur = "*", ixs_fun = "*", ixs_tre = "*", priz_evy = "*", z_int = "*", dat_mpd = "*", priz_prut = "*", priz_servis = "*", tel = "*", fax = "*", ixs_lpc = "*", ico = "*", ixs_ext_ais = "*",}
	const enum GGinspodDtoTypes { ixs_su = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", priz_pod = "number", priz_vyp = "number", ixs_nad = "string", lic_adr = "string", ofic_nazev = "string", cs_nazev = "string", num_pod = "number", mail = "string", url = "string", priz_kur = "number", ixs_fun = "string", ixs_tre = "string", priz_evy = "number", z_int = "number", dat_mpd = "JsonDate", priz_prut = "number", priz_servis = "number", tel = "string", fax = "string", ixs_lpc = "string", ico = "string", ixs_ext_ais = "string",}
	const enum GGinspodDtoTypeLengths { ixs_su = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 25, ixs_nad = 12, lic_adr = 4, ofic_nazev = 100, cs_nazev = 25, mail = 254, url = 254, ixs_fun = 12, ixs_tre = 12, tel = 33, fax = 33, ixs_lpc = 12, ico = 10, ixs_ext_ais = 12,}
	/**GinspodEko - spisový uzel pro deníky EKO*/
	interface GGinspodEkoDto extends Gordic.Adm.Interface.GGinspodDto {
		/**Rok*/
		rok?: number|null;
		/**GString ico*/
		eko_ico?: string|null;
		/**Účetní středisko*/
		ucs?: string|null;
	}
	const enum GGinspodEkoDtoNames { rok = "rok", eko_ico = "eko_ico", ucs = "ucs", ixs_su = "ixs_su", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", priz_pod = "priz_pod", priz_vyp = "priz_vyp", ixs_nad = "ixs_nad", lic_adr = "lic_adr", ofic_nazev = "ofic_nazev", cs_nazev = "cs_nazev", num_pod = "num_pod", mail = "mail", url = "url", priz_kur = "priz_kur", ixs_fun = "ixs_fun", ixs_tre = "ixs_tre", priz_evy = "priz_evy", z_int = "z_int", dat_mpd = "dat_mpd", priz_prut = "priz_prut", priz_servis = "priz_servis", tel = "tel", fax = "fax", ixs_lpc = "ixs_lpc", ico = "ico", ixs_ext_ais = "ixs_ext_ais",}
	const enum GGinspodEkoDtoFragments { rok = "*", eko_ico = "*", ucs = "*", ixs_su = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", priz_pod = "*", priz_vyp = "*", ixs_nad = "*", lic_adr = "*", ofic_nazev = "*", cs_nazev = "*", num_pod = "*", mail = "*", url = "*", priz_kur = "*", ixs_fun = "*", ixs_tre = "*", priz_evy = "*", z_int = "*", dat_mpd = "*", priz_prut = "*", priz_servis = "*", tel = "*", fax = "*", ixs_lpc = "*", ico = "*", ixs_ext_ais = "*",}
	const enum GGinspodEkoDtoTypes { rok = "number", eko_ico = "string", ucs = "string", ixs_su = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", priz_pod = "number", priz_vyp = "number", ixs_nad = "string", lic_adr = "string", ofic_nazev = "string", cs_nazev = "string", num_pod = "number", mail = "string", url = "string", priz_kur = "number", ixs_fun = "string", ixs_tre = "string", priz_evy = "number", z_int = "number", dat_mpd = "JsonDate", priz_prut = "number", priz_servis = "number", tel = "string", fax = "string", ixs_lpc = "string", ico = "string", ixs_ext_ais = "string",}
	const enum GGinspodEkoDtoTypeLengths { ixs_su = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 25, ixs_nad = 12, lic_adr = 4, ofic_nazev = 100, cs_nazev = 25, mail = 254, url = 254, ixs_fun = 12, ixs_tre = 12, tel = 33, fax = 33, ixs_lpc = 12, ico = 10, ixs_ext_ais = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsppwDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsppw
	*      Hesla ext.uživatelů
	*/
	interface GGinsppwDto {
		/**Login*/
		ldb?: string|null;
		/**Heslo
		*      Zašifrované heslo
		*/
		pdb?: string|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Osoba
		*      Osoba, ke které je teno externí účet navázán
		*/
		ixs_ref?: string|null;
		/**Externí systém
		*      Externí systém, pro který je heslo nastaveno
		*/
		ixs_ext?: string|null;
	}
	const enum GGinsppwDtoNames { ldb = "ldb", pdb = "pdb", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_ref = "ixs_ref", ixs_ext = "ixs_ext",}
	const enum GGinsppwDtoFragments { ldb = "*", pdb = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_ref = "*", ixs_ext = "*",}
	const enum GGinsppwDtoTypes { ldb = "string", pdb = "string", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_ref = "string", ixs_ext = "string",}
	const enum GGinsppwDtoTypeLengths { ldb = 254, pdb = 254, zmenu_prov = 12, ixs_ref = 12, ixs_ext = 12,}
	/**Rozšířená verze dto*/
	interface GGinsppwExtDto extends Gordic.Adm.Interface.GGinsppwDto {
		/**název uživatele*/
		ixs_ref_txt?: string|null;
		/**login*/
		login?: string|null;
		/**login%ext*/
		login_ext?: string|null;
		/**aktivita*/
		aktivita_txt?: string|null;
		/**Nové heslo*/
		new_password?: string|null;
	}
	const enum GGinsppwExtDtoNames { ixs_ref_txt = "ixs_ref_txt", login = "login", login_ext = "login_ext", aktivita_txt = "aktivita_txt", new_password = "new_password", ldb = "ldb", pdb = "pdb", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_ref = "ixs_ref", ixs_ext = "ixs_ext",}
	const enum GGinsppwExtDtoFragments { ixs_ref_txt = "*", login = "*", login_ext = "*", aktivita_txt = "*", new_password = "*", ldb = "*", pdb = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_ref = "*", ixs_ext = "*",}
	const enum GGinsppwExtDtoTypes { ixs_ref_txt = "string", login = "string", login_ext = "string", aktivita_txt = "string", new_password = "string", ldb = "string", pdb = "string", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_ref = "string", ixs_ext = "string",}
	const enum GGinsppwExtDtoTypeLengths { ldb = 254, pdb = 254, zmenu_prov = 12, ixs_ref = 12, ixs_ext = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsproDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginspro
	*      Profil vlastností
	*/
	interface GGinsproDto {
		/**Profil vlastnosti
		*      Profil vlastnosti
		*/
		ixs_pro?: string|null;
		/**Název
		*      Název profilu
		*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		ixb_det?: string|null;
		ixb_sez?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Virtuální*/
		priz_vir?: number|null;
		/**Kód*/
		kod?: string|null;
		/**Formulář*/
		ixs_for?: string|null;
		/**Rozšířený profil
		*      Interní ID rozšířeného profilu, který se dříve v rámci EKO používal
		*/
		ixs_rpp?: string|null;
	}
	const enum GGinsproDtoNames { ixs_pro = "ixs_pro", nazev = "nazev", zkratka = "zkratka", aktivita = "aktivita", ixb_det = "ixb_det", ixb_sez = "ixb_sez", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_vir = "priz_vir", kod = "kod", ixs_for = "ixs_for", ixs_rpp = "ixs_rpp",}
	const enum GGinsproDtoFragments { ixs_pro = "*", nazev = "*", zkratka = "*", aktivita = "*", ixb_det = "*", ixb_sez = "*", dat_zmena = "*", zmenu_prov = "*", priz_vir = "*", kod = "*", ixs_for = "*", ixs_rpp = "*",}
	const enum GGinsproDtoTypes { ixs_pro = "string", nazev = "string", zkratka = "string", aktivita = "number", ixb_det = "string", ixb_sez = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_vir = "number", kod = "string", ixs_for = "string", ixs_rpp = "string",}
	const enum GGinsproDtoTypeLengths { ixs_pro = 12, nazev = 50, zkratka = 16, ixb_det = 12, ixb_sez = 12, zmenu_prov = 12, kod = 6, ixs_for = 12, ixs_rpp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinspscDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginspsc
	*      Pošta
	*/
	interface GGinspscDto {
		/**Stát*/
		stat?: number|null;
		/**PSČ
		*      Poštovní směrovací číslo
		*/
		psc?: string|null;
		/**Pošta
		*      Název pošty
		*/
		posta?: string|null;
		/**Aktivita
		*      Aktivita záznamu
		*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Aplikačně neplnit, souvisí s replikacemi*/
		dat_mpd?: JsonDate|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Oficiální název*/
		ofic_nazev?: string|null;
		/**Individuálně přidělené PSČ*/
		priz_indiv_prir?: number|null;
	}
	const enum GGinspscDtoNames { stat = "stat", psc = "psc", posta = "posta", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_mpd = "dat_mpd", ixs_lpc = "ixs_lpc", ofic_nazev = "ofic_nazev", priz_indiv_prir = "priz_indiv_prir",}
	const enum GGinspscDtoFragments { stat = "*", psc = "*", posta = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", dat_mpd = "*", ixs_lpc = "*", ofic_nazev = "*", priz_indiv_prir = "*",}
	const enum GGinspscDtoTypes { stat = "number", psc = "string", posta = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_mpd = "JsonDate", ixs_lpc = "string", ofic_nazev = "string", priz_indiv_prir = "number",}
	const enum GGinspscDtoTypeLengths { psc = 12, posta = 50, zmenu_prov = 12, ixs_lpc = 12, ofic_nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsrefDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsref
	*      Osoba
	*/
	interface GGinsrefDto {
		/**Osoba
		*       Interní identifikátor osoby
		*/
		ixs_ref?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Nepoužívá se*/
		arw?: number|null;
		/**Poznámka
		*      Poznámka administrátora systému k osobě
		*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Spisový uzel
		*      Spisový uzel ke kterémů osoba přísluší - tato vazba určuje také příslušnost k IČO
		*/
		ixs_su?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název
		*      Složený text jména a příjmení + titul
		*/
		nazev?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Titul před*/
		tit_pred?: string|null;
		/**Titul za*/
		tit_za?: string|null;
		/**Osobní číslo*/
		oc?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Zatím nepoužito*/
		pritomnost?: number|null;
		/**Primární login
		*      Primární login uživatele určený pro přihlášení do szstému GINIS. Slouží pro dohledání uživatele podle loginu, pro kontroly případných duplicit loginů atd..
		*/
		login_name?: string|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**Datum a čas vzniku záznamu*/
		dat_mpd?: JsonDate|null;
		/**Mail*/
		mail?: string|null;
		/**Identifikátor externího subjektu zaměstnance
		*      Využívá pouze personalistika
		*/
		ixs_esu?: string|null;
		/**Z interface*/
		z_int?: number|null;
		/**Typ primárního účtu*/
		typ_aut?: number|null;
		/**Délka expirace hesla
		*      Počet dní, po kterých má exspirovat primární heslo uživatele GINIS.
		*/
		poc_dni_exp?: number|null;
		/**Expirace hesla
		*      Čas příští exspirace hesla primárního přihlašovacího účtu.
		*/
		dat_exp?: JsonDate|null;
		/**Externí uživatel
		*      Příznak, že uživatel má oprávnění pracovat přes externí rozhraní - tedy prostřednictvím webových služeb XRG
		*/
		priz_ext?: number|null;
		/**Interní uživatel
		*      Příznak, že uživatel má oprávnění pracovat přes interní aplikace systému GINIS
		*/
		priz_int?: number|null;
		priz_f?: number|null;
		/**Externí login
		*      Login uživatele určený pro přihlášení externích systémů prostřednictvím webových služeb XRG.
		*/
		login_name_ext?: string|null;
		/**Login
		*      Forma loginu, která se proti DB stroji použije pro grantování. Je CASE SENSITIVE.
		*/
		login_name_grant?: string|null;
		/**Sekundární login
		*      Alternativní login uživatele určený pro přihlášení do szstému GINIS. Slouží pro dohledání uživatele podle loginu, pro kontroly případných duplicit loginů atd..
		*/
		login_name2?: string|null;
		/**Alternativní login
		*      Forma alternativního loginu, která se proti DB stroji použije pro grantování. Je CASE SENSITIVE.
		*/
		login_name_grant2?: string|null;
		/**Typ alternativního účtu*/
		typ_aut2?: number|null;
		/**Datum exspirace alt.účtu
		*      Pokud je NULL, potom účet nebude exspirovat
		*/
		dat_exp2?: JsonDate|null;
		priz_msmsesu?: number|null;
		ixs_esu_pam?: string|null;
		/**Telefon*/
		tel?: string|null;
		/**Soukromý telefon*/
		tel_privat?: string|null;
		/**Mobil*/
		tel_mobil?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Rodné příjmení*/
		rod_prijmeni?: string|null;
		/**Fax*/
		fax?: string|null;
		/**HASH loginu se solí*/
		login_passwdh?: string|null;
		/**Sůl*/
		login_salt?: string|null;
		/**HASH alternativního loginu se solí*/
		login_passwdh2?: string|null;
		/**Sůl pro alternativní login*/
		login_salt2?: string|null;
		/**IČO
		*      IČO interního subjeltu ke kterému tento záznam přísluší
		*/
		ico?: string|null;
		/**Čas synchronizace*/
		dat_sync?: JsonDate|null;
		/**SID pro login
		*      Jedná se o guid přidělený OS/doménou pro login
		*/
		login_sid?: string|null;
		/**SID pro alternativná login
		*      Jedná se o guid přidělený OS/doménou pro použitý alternativní login
		*/
		login_sid2?: string|null;
		/**Účel zpracování*/
		ixs_zap?: string|null;
		/**Vícefaktorové autentizace
		*      Povinnost uživatele použít vícefaktorovou autentizaci typu TOTP
		*/
		priz_totp?: number|null;
		/**Klíč vícefaktorové autentizace*/
		totp_key?: string|null;
		mail_public?: string|null;
	}
	const enum GGinsrefDtoNames { ixs_ref = "ixs_ref", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", oc = "oc", rc = "rc", pritomnost = "pritomnost", login_name = "login_name", cs_nazev = "cs_nazev", dat_mpd = "dat_mpd", mail = "mail", ixs_esu = "ixs_esu", z_int = "z_int", typ_aut = "typ_aut", poc_dni_exp = "poc_dni_exp", dat_exp = "dat_exp", priz_ext = "priz_ext", priz_int = "priz_int", priz_f = "priz_f", login_name_ext = "login_name_ext", login_name_grant = "login_name_grant", login_name2 = "login_name2", login_name_grant2 = "login_name_grant2", typ_aut2 = "typ_aut2", dat_exp2 = "dat_exp2", priz_msmsesu = "priz_msmsesu", ixs_esu_pam = "ixs_esu_pam", tel = "tel", tel_privat = "tel_privat", tel_mobil = "tel_mobil", ixs_lpc = "ixs_lpc", rod_prijmeni = "rod_prijmeni", fax = "fax", login_passwdh = "login_passwdh", login_salt = "login_salt", login_passwdh2 = "login_passwdh2", login_salt2 = "login_salt2", ico = "ico", dat_sync = "dat_sync", login_sid = "login_sid", login_sid2 = "login_sid2", ixs_zap = "ixs_zap", priz_totp = "priz_totp", totp_key = "totp_key", mail_public = "mail_public",}
	const enum GGinsrefDtoFragments { ixs_ref = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", oc = "*", rc = "*", pritomnost = "*", login_name = "*", cs_nazev = "*", dat_mpd = "*", mail = "*", ixs_esu = "*", z_int = "*", typ_aut = "*", poc_dni_exp = "*", dat_exp = "*", priz_ext = "*", priz_int = "*", priz_f = "*", login_name_ext = "*", login_name_grant = "*", login_name2 = "*", login_name_grant2 = "*", typ_aut2 = "*", dat_exp2 = "*", priz_msmsesu = "*", ixs_esu_pam = "*", tel = "*", tel_privat = "*", tel_mobil = "*", ixs_lpc = "*", rod_prijmeni = "*", fax = "*", login_passwdh = "*", login_salt = "*", login_passwdh2 = "*", login_salt2 = "*", ico = "*", dat_sync = "*", login_sid = "*", login_sid2 = "*", ixs_zap = "*", priz_totp = "*", totp_key = "*", mail_public = "*",}
	const enum GGinsrefDtoTypes { ixs_ref = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", oc = "string", rc = "string", pritomnost = "number", login_name = "string", cs_nazev = "string", dat_mpd = "JsonDate", mail = "string", ixs_esu = "string", z_int = "number", typ_aut = "number", poc_dni_exp = "number", dat_exp = "JsonDate", priz_ext = "number", priz_int = "number", priz_f = "number", login_name_ext = "string", login_name_grant = "string", login_name2 = "string", login_name_grant2 = "string", typ_aut2 = "number", dat_exp2 = "JsonDate", priz_msmsesu = "number", ixs_esu_pam = "string", tel = "string", tel_privat = "string", tel_mobil = "string", ixs_lpc = "string", rod_prijmeni = "string", fax = "string", login_passwdh = "string", login_salt = "string", login_passwdh2 = "string", login_salt2 = "string", ico = "string", dat_sync = "JsonDate", login_sid = "string", login_sid2 = "string", ixs_zap = "string", priz_totp = "number", totp_key = "string", mail_public = "string",}
	const enum GGinsrefDtoTypeLengths { ixs_ref = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, zkratka = 16, nazev = 200, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, oc = 30, rc = 10, login_name = 60, cs_nazev = 200, mail = 254, ixs_esu = 12, login_name_ext = 60, login_name_grant = 60, login_name2 = 60, login_name_grant2 = 60, ixs_esu_pam = 12, tel = 33, tel_privat = 33, tel_mobil = 33, ixs_lpc = 12, rod_prijmeni = 100, fax = 33, login_passwdh = 254, login_salt = 254, login_passwdh2 = 254, login_salt2 = 254, ico = 10, login_sid = 254, login_sid2 = 254, ixs_zap = 12, totp_key = 254, mail_public = 254,}
	/**Rozšíření osoby*/
	interface GGinsrefExtDto extends Gordic.Adm.Interface.GGinsrefDto {
		/**Textová reprezentace spisového uzlu*/
		ixs_su_txt?: string|null;
	}
	const enum GGinsrefExtDtoNames { ixs_su_txt = "ixs_su_txt", ixs_ref = "ixs_ref", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", zkratka = "zkratka", nazev = "nazev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", oc = "oc", rc = "rc", pritomnost = "pritomnost", login_name = "login_name", cs_nazev = "cs_nazev", dat_mpd = "dat_mpd", mail = "mail", ixs_esu = "ixs_esu", z_int = "z_int", typ_aut = "typ_aut", poc_dni_exp = "poc_dni_exp", dat_exp = "dat_exp", priz_ext = "priz_ext", priz_int = "priz_int", priz_f = "priz_f", login_name_ext = "login_name_ext", login_name_grant = "login_name_grant", login_name2 = "login_name2", login_name_grant2 = "login_name_grant2", typ_aut2 = "typ_aut2", dat_exp2 = "dat_exp2", priz_msmsesu = "priz_msmsesu", ixs_esu_pam = "ixs_esu_pam", tel = "tel", tel_privat = "tel_privat", tel_mobil = "tel_mobil", ixs_lpc = "ixs_lpc", rod_prijmeni = "rod_prijmeni", fax = "fax", login_passwdh = "login_passwdh", login_salt = "login_salt", login_passwdh2 = "login_passwdh2", login_salt2 = "login_salt2", ico = "ico", dat_sync = "dat_sync", login_sid = "login_sid", login_sid2 = "login_sid2", ixs_zap = "ixs_zap", priz_totp = "priz_totp", totp_key = "totp_key", mail_public = "mail_public",}
	const enum GGinsrefExtDtoFragments { ixs_su_txt = "*", ixs_ref = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ixs_su = "*", zkratka = "*", nazev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", oc = "*", rc = "*", pritomnost = "*", login_name = "*", cs_nazev = "*", dat_mpd = "*", mail = "*", ixs_esu = "*", z_int = "*", typ_aut = "*", poc_dni_exp = "*", dat_exp = "*", priz_ext = "*", priz_int = "*", priz_f = "*", login_name_ext = "*", login_name_grant = "*", login_name2 = "*", login_name_grant2 = "*", typ_aut2 = "*", dat_exp2 = "*", priz_msmsesu = "*", ixs_esu_pam = "*", tel = "*", tel_privat = "*", tel_mobil = "*", ixs_lpc = "*", rod_prijmeni = "*", fax = "*", login_passwdh = "*", login_salt = "*", login_passwdh2 = "*", login_salt2 = "*", ico = "*", dat_sync = "*", login_sid = "*", login_sid2 = "*", ixs_zap = "*", priz_totp = "*", totp_key = "*", mail_public = "*",}
	const enum GGinsrefExtDtoTypes { ixs_su_txt = "string", ixs_ref = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", zkratka = "string", nazev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", oc = "string", rc = "string", pritomnost = "number", login_name = "string", cs_nazev = "string", dat_mpd = "JsonDate", mail = "string", ixs_esu = "string", z_int = "number", typ_aut = "number", poc_dni_exp = "number", dat_exp = "JsonDate", priz_ext = "number", priz_int = "number", priz_f = "number", login_name_ext = "string", login_name_grant = "string", login_name2 = "string", login_name_grant2 = "string", typ_aut2 = "number", dat_exp2 = "JsonDate", priz_msmsesu = "number", ixs_esu_pam = "string", tel = "string", tel_privat = "string", tel_mobil = "string", ixs_lpc = "string", rod_prijmeni = "string", fax = "string", login_passwdh = "string", login_salt = "string", login_passwdh2 = "string", login_salt2 = "string", ico = "string", dat_sync = "JsonDate", login_sid = "string", login_sid2 = "string", ixs_zap = "string", priz_totp = "number", totp_key = "string", mail_public = "string",}
	const enum GGinsrefExtDtoTypeLengths { ixs_ref = 12, lic = 4, poznamka = 254, zmenu_prov = 12, ixs_su = 12, zkratka = 16, nazev = 200, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, oc = 30, rc = 10, login_name = 60, cs_nazev = 200, mail = 254, ixs_esu = 12, login_name_ext = 60, login_name_grant = 60, login_name2 = 60, login_name_grant2 = 60, ixs_esu_pam = 12, tel = 33, tel_privat = 33, tel_mobil = 33, ixs_lpc = 12, rod_prijmeni = 100, fax = 33, login_passwdh = 254, login_salt = 254, login_passwdh2 = 254, login_salt2 = 254, ico = 10, login_sid = 254, login_sid2 = 254, ixs_zap = 12, totp_key = 254, mail_public = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinssagDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginssag
	*      Šablony konvence Gordic
	*/
	interface GGinssagDto {
		/**Název souboru (včetně prefixu)*/
		soubor?: string|null;
		/**Cesta*/
		cesta?: string|null;
		/**Popis
		*       Popis souboru
		*/
		popis?: string|null;
		/**Kopie
		*       Uložený soubor v db jako blob
		*/
		kopie?: JsonBlob|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		prefix?: string|null;
		priz_spis?: number|null;
		/**Ičo*/
		ico?: string|null;
	}
	const enum GGinssagDtoNames { soubor = "soubor", cesta = "cesta", popis = "popis", kopie = "kopie", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prefix = "prefix", priz_spis = "priz_spis", ico = "ico",}
	const enum GGinssagDtoFragments { soubor = "*", cesta = "*", popis = "*", kopie = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", prefix = "*", priz_spis = "*", ico = "*",}
	const enum GGinssagDtoTypes { soubor = "string", cesta = "string", popis = "string", kopie = "JsonBlob", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prefix = "string", priz_spis = "number", ico = "string",}
	const enum GGinssagDtoTypeLengths { soubor = 100, cesta = 100, popis = 254, zmenu_prov = 12, prefix = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinssbuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginssbu
	*      Segmenty budovy
	*/
	interface GGinssbuDto {
		/**IČO*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy
		*      Segment budovy
		*/
		segment_kod?: string|null;
		/**Název segmentu
		*      Název segmentu budovy
		*/
		segment_naz?: string|null;
		/**Patro
		*      Patro
		*/
		patro?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Uživatel*/
		ixs_esu_uziv?: string|null;
		/**Správce budovy*/
		ixs_esu_spr?: string|null;
		/**Plocha
		*      Plocha - výměra v m2
		*/
		plocha?: JsonDecimal|null;
		/**Druh segmentu budovy*/
		segment_druh?: number|null;
		/**Způsob využití*/
		kod_vyu?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Čárový kód*/
		id_kod?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Elementární objekt*/
		ixs_elo?: string|null;
	}
	const enum GGinssbuDtoNames { ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", segment_naz = "segment_naz", patro = "patro", poznamka = "poznamka", ixs_esu_uziv = "ixs_esu_uziv", ixs_esu_spr = "ixs_esu_spr", plocha = "plocha", segment_druh = "segment_druh", kod_vyu = "kod_vyu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_kod = "id_kod", ixs_lpc = "ixs_lpc", ixs_elo = "ixs_elo",}
	const enum GGinssbuDtoFragments { ico = "*", budova_kod = "*", segment_kod = "*", segment_naz = "*", patro = "*", poznamka = "*", ixs_esu_uziv = "*", ixs_esu_spr = "*", plocha = "*", segment_druh = "*", kod_vyu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", id_kod = "*", ixs_lpc = "*", ixs_elo = "*",}
	const enum GGinssbuDtoTypes { ico = "string", budova_kod = "string", segment_kod = "string", segment_naz = "string", patro = "string", poznamka = "string", ixs_esu_uziv = "string", ixs_esu_spr = "string", plocha = "JsonDecimal", segment_druh = "number", kod_vyu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_kod = "string", ixs_lpc = "string", ixs_elo = "string",}
	const enum GGinssbuDtoTypeLengths { ico = 10, budova_kod = 8, segment_kod = 8, segment_naz = 50, patro = 10, poznamka = 254, ixs_esu_uziv = 12, ixs_esu_spr = 12, zmenu_prov = 12, id_kod = 12, ixs_lpc = 12, ixs_elo = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinssfuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginssfu
	*      Skupina funkcí
	*/
	interface GGinssfuDto {
		/**Skupina funkcí*/
		ixs_sfu?: string|null;
		/**Název skupiny*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinssfuDtoNames { ixs_sfu = "ixs_sfu", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinssfuDtoFragments { ixs_sfu = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinssfuDtoTypes { ixs_sfu = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinssfuDtoTypeLengths { ixs_sfu = 12, nazev = 50, zkratka = 16, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinssgnDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginssgn
	*      ginssgn
	*/
	interface GGinssgnDto {
		/**Osoba*/
		ixs_ref?: string|null;
		podklad?: JsonBlob|null;
		vyska?: number|null;
		sirka?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Typ souboru*/
		soubor_pri?: string|null;
	}
	const enum GGinssgnDtoNames { ixs_ref = "ixs_ref", podklad = "podklad", vyska = "vyska", sirka = "sirka", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", soubor_pri = "soubor_pri",}
	const enum GGinssgnDtoFragments { ixs_ref = "*", podklad = "*", vyska = "*", sirka = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", soubor_pri = "*",}
	const enum GGinssgnDtoTypes { ixs_ref = "string", podklad = "JsonBlob", vyska = "number", sirka = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", soubor_pri = "string",}
	const enum GGinssgnDtoTypeLengths { ixs_ref = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsskrDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsskr
	*      Skartační režimy
	*/
	interface GGinsskrDto {
		/**Skartační režimy
		*      ID skartačního režimu
		*/
		ixs_skr?: string|null;
		/**Spouštění událost*/
		ixs_spu?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Komentář*/
		komentar?: string|null;
		/**Odůvodnění*/
		oduvodneni?: string|null;
		/**Skartační znak*/
		skar_znak?: string|null;
		/**Skartační lhůta*/
		skar_lhuta?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Kontrolní lhůta*/
		kontrolni_lhuta?: number|null;
		/**Rok vyřazení*/
		rok_vyrazeni?: number|null;
		/**Licence*/
		lic?: string|null;
	}
	const enum GGinsskrDtoNames { ixs_skr = "ixs_skr", ixs_spu = "ixs_spu", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", komentar = "komentar", oduvodneni = "oduvodneni", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kontrolni_lhuta = "kontrolni_lhuta", rok_vyrazeni = "rok_vyrazeni", lic = "lic",}
	const enum GGinsskrDtoFragments { ixs_skr = "*", ixs_spu = "*", zkratka = "*", nazev = "*", poznamka = "*", komentar = "*", oduvodneni = "*", skar_znak = "*", skar_lhuta = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kontrolni_lhuta = "*", rok_vyrazeni = "*", lic = "*",}
	const enum GGinsskrDtoTypes { ixs_skr = "string", ixs_spu = "string", zkratka = "string", nazev = "string", poznamka = "string", komentar = "string", oduvodneni = "string", skar_znak = "string", skar_lhuta = "number", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kontrolni_lhuta = "number", rok_vyrazeni = "number", lic = "string",}
	const enum GGinsskrDtoTypeLengths { ixs_skr = 12, ixs_spu = 12, zkratka = 16, nazev = 254, poznamka = 254, komentar = 254, oduvodneni = 254, skar_znak = 2, zmenu_prov = 12, lic = 4,}
	/**Rozšiřující DTO pro skartační režimy*/
	interface GGinsskrExtDto extends Gordic.Adm.Interface.GGinsskrDto {
		/**Textová reprezentace spuštěcí události*/
		ixs_spu_txt?: string|null;
	}
	const enum GGinsskrExtDtoNames { ixs_spu_txt = "ixs_spu_txt", ixs_skr = "ixs_skr", ixs_spu = "ixs_spu", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", komentar = "komentar", oduvodneni = "oduvodneni", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kontrolni_lhuta = "kontrolni_lhuta", rok_vyrazeni = "rok_vyrazeni", lic = "lic",}
	const enum GGinsskrExtDtoFragments { ixs_spu_txt = "*", ixs_skr = "*", ixs_spu = "*", zkratka = "*", nazev = "*", poznamka = "*", komentar = "*", oduvodneni = "*", skar_znak = "*", skar_lhuta = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", kontrolni_lhuta = "*", rok_vyrazeni = "*", lic = "*",}
	const enum GGinsskrExtDtoTypes { ixs_spu_txt = "string", ixs_skr = "string", ixs_spu = "string", zkratka = "string", nazev = "string", poznamka = "string", komentar = "string", oduvodneni = "string", skar_znak = "string", skar_lhuta = "number", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", kontrolni_lhuta = "number", rok_vyrazeni = "number", lic = "string",}
	const enum GGinsskrExtDtoTypeLengths { ixs_skr = 12, ixs_spu = 12, zkratka = 16, nazev = 254, poznamka = 254, komentar = 254, oduvodneni = 254, skar_znak = 2, zmenu_prov = 12, lic = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsspnDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsspn
	*      Spisový plán NS 2023
	*/
	interface GGinsspnDto {
		/**Spisový plán
		*      Spisový plán NS 2023
		*/
		ixs_spn?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Název plánu
		*      Název plánu
		*/
		nazev?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Poznámka k plánu
		*      Poznámka k plánu
		*/
		poznamka?: string|null;
		/**Aktivita plánu
		*      Stav otevření/uzavření spisového plánu
		*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		ixs_spn_prev?: string|null;
		ixs_spn_next?: string|null;
	}
	const enum GGinsspnDtoNames { ixs_spn = "ixs_spn", ico = "ico", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_spn_prev = "ixs_spn_prev", ixs_spn_next = "ixs_spn_next",}
	const enum GGinsspnDtoFragments { ixs_spn = "*", ico = "*", nazev = "*", dat_od = "*", dat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_spn_prev = "*", ixs_spn_next = "*",}
	const enum GGinsspnDtoTypes { ixs_spn = "string", ico = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_spn_prev = "string", ixs_spn_next = "string",}
	const enum GGinsspnDtoTypeLengths { ixs_spn = 12, ico = 10, nazev = 100, poznamka = 254, zmenu_prov = 12, ixs_spn_prev = 12, ixs_spn_next = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsspuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsspu
	*      Spouštění událost
	*/
	interface GGinsspuDto {
		/**Spouštění událost
		*      Spouštění událost
		*/
		ixs_spu?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název
		*      Náxev dpouštěnící události
		*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Kategorie spouštěcí události*/
		ktg_spu?: number|null;
		k_xml?: string|null;
	}
	const enum GGinsspuDtoNames { ixs_spu = "ixs_spu", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_spu = "ktg_spu", k_xml = "k_xml",}
	const enum GGinsspuDtoFragments { ixs_spu = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ktg_spu = "*", k_xml = "*",}
	const enum GGinsspuDtoTypes { ixs_spu = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ktg_spu = "number", k_xml = "string",}
	const enum GGinsspuDtoTypeLengths { ixs_spu = 12, zkratka = 16, nazev = 254, poznamka = 254, zmenu_prov = 12, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsstaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginssta
	*      Pracovní stanice
	*/
	interface GGinsstaDto {
		/**Síťové jméno
		*      Síťové jméno nebo IP stanice. Formát záleží na typu DB serveru.
		*/
		ip_adr?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**minimální priorita pro přístup*/
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název stanice*/
		nazev?: string|null;
		/**Velikost RAM*/
		ram?: number|null;
		/**Velikost systémového disku*/
		hdd?: number|null;
		/**CPU*/
		cpu?: string|null;
		/**OS stanice*/
		os?: string|null;
		/**Typ CPU*/
		cputype?: number|null;
		/**Jazyk stanice*/
		language?: number|null;
		/**Verze OS*/
		osfixesrevision?: number|null;
		/**Subverze OS*/
		osmajorrevision?: number|null;
		/**Revize OS*/
		osminorrevision?: number|null;
		/**Display výška*/
		screenheight?: number|null;
		/**Display šířka*/
		screenwidth?: number|null;
		/**Typ OS
		*      Typ 32 nebo 64
		*/
		ostype?: number|null;
		/**Adresář instalace GINIS*/
		gin_adr?: string|null;
		/**Typ aktualizace GINIS*/
		gin_inst_type?: number|null;
		db_net_adr?: string|null;
		db_net_verze?: string|null;
		hdd_txt?: string|null;
		hdd_free_txt?: string|null;
		/**Osoba*/
		ixs_ref?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy*/
		segment_kod?: string|null;
		/**Místnost*/
		mistnost_kod?: string|null;
		cpu_max_speed?: number|null;
		/**Jméno CPU*/
		cpu_name?: string|null;
		/**ID CPU*/
		cpu_id?: string|null;
		/**Popis CPU*/
		cpu_description?: string|null;
		/**Volné místo na disku C:*/
		disk_c_free_size?: number|null;
		/**Celková velikost disku C:*/
		disk_c_total_size?: number|null;
		/**Verze OS*/
		os_current_version?: string|null;
		/**Editce OS*/
		os_edition_id?: string|null;
		os_product_name?: string|null;
		os_bit?: number|null;
		client_version?: string|null;
		client_type?: string|null;
		client_charset?: string|null;
		/**Verze .NET frameworku
		*      Číslo verze .NET FrameWorku
		*/
		dot_net_framework?: string|null;
		/**Restriktivní zóna
		*      Příznak, že stanice se nachází v restriktivní zóně. Do této zóny se může přihlásit pouze označené funkční místi.
		*/
		priz_restrict?: number|null;
	}
	const enum GGinsstaDtoNames { ip_adr = "ip_adr", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ram = "ram", hdd = "hdd", cpu = "cpu", os = "os", cputype = "cputype", language = "language", osfixesrevision = "osfixesrevision", osmajorrevision = "osmajorrevision", osminorrevision = "osminorrevision", screenheight = "screenheight", screenwidth = "screenwidth", ostype = "ostype", gin_adr = "gin_adr", gin_inst_type = "gin_inst_type", db_net_adr = "db_net_adr", db_net_verze = "db_net_verze", hdd_txt = "hdd_txt", hdd_free_txt = "hdd_free_txt", ixs_ref = "ixs_ref", ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", cpu_max_speed = "cpu_max_speed", cpu_name = "cpu_name", cpu_id = "cpu_id", cpu_description = "cpu_description", disk_c_free_size = "disk_c_free_size", disk_c_total_size = "disk_c_total_size", os_current_version = "os_current_version", os_edition_id = "os_edition_id", os_product_name = "os_product_name", os_bit = "os_bit", client_version = "client_version", client_type = "client_type", client_charset = "client_charset", dot_net_framework = "dot_net_framework", priz_restrict = "priz_restrict",}
	const enum GGinsstaDtoFragments { ip_adr = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", ram = "*", hdd = "*", cpu = "*", os = "*", cputype = "*", language = "*", osfixesrevision = "*", osmajorrevision = "*", osminorrevision = "*", screenheight = "*", screenwidth = "*", ostype = "*", gin_adr = "*", gin_inst_type = "*", db_net_adr = "*", db_net_verze = "*", hdd_txt = "*", hdd_free_txt = "*", ixs_ref = "*", ico = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", cpu_max_speed = "*", cpu_name = "*", cpu_id = "*", cpu_description = "*", disk_c_free_size = "*", disk_c_total_size = "*", os_current_version = "*", os_edition_id = "*", os_product_name = "*", os_bit = "*", client_version = "*", client_type = "*", client_charset = "*", dot_net_framework = "*", priz_restrict = "*",}
	const enum GGinsstaDtoTypes { ip_adr = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ram = "number", hdd = "number", cpu = "string", os = "string", cputype = "number", language = "number", osfixesrevision = "number", osmajorrevision = "number", osminorrevision = "number", screenheight = "number", screenwidth = "number", ostype = "number", gin_adr = "string", gin_inst_type = "number", db_net_adr = "string", db_net_verze = "string", hdd_txt = "string", hdd_free_txt = "string", ixs_ref = "string", ico = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", cpu_max_speed = "number", cpu_name = "string", cpu_id = "string", cpu_description = "string", disk_c_free_size = "number", disk_c_total_size = "number", os_current_version = "string", os_edition_id = "string", os_product_name = "string", os_bit = "number", client_version = "string", client_type = "string", client_charset = "string", dot_net_framework = "string", priz_restrict = "number",}
	const enum GGinsstaDtoTypeLengths { ip_adr = 50, poznamka = 254, zmenu_prov = 12, nazev = 254, cpu = 254, os = 254, gin_adr = 254, db_net_adr = 254, db_net_verze = 254, hdd_txt = 254, hdd_free_txt = 254, ixs_ref = 12, ico = 10, budova_kod = 8, segment_kod = 8, mistnost_kod = 8, cpu_name = 254, cpu_id = 254, cpu_description = 254, os_current_version = 254, os_edition_id = 254, os_product_name = 254, client_version = 254, client_type = 254, client_charset = 254, dot_net_framework = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsstvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsstv
	*      Struktura vlastností
	*/
	interface GGinsstvDto {
		/**Struktura
		*      ID struktury vlastností
		*/
		ixs_stv?: string|null;
		/**Název
		*      Název struktury vlastností
		*/
		nazev?: string|null;
		/**Zkratka
		*      Zkratka struktury vlastnotí
		*/
		zkratka?: string|null;
		/**Kód
		*      Kód struktury
		*/
		kod?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Virtuální*/
		priz_vir?: number|null;
	}
	const enum GGinsstvDtoNames { ixs_stv = "ixs_stv", nazev = "nazev", zkratka = "zkratka", kod = "kod", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_vir = "priz_vir",}
	const enum GGinsstvDtoFragments { ixs_stv = "*", nazev = "*", zkratka = "*", kod = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_vir = "*",}
	const enum GGinsstvDtoTypes { ixs_stv = "string", nazev = "string", zkratka = "string", kod = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_vir = "number",}
	const enum GGinsstvDtoTypeLengths { ixs_stv = 12, nazev = 50, zkratka = 16, kod = 6, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinstreDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginstre
	*      Středisko spisových uzlů
	*/
	interface GGinstreDto {
		/**Středisko spisových uzlů - Interní ID střediska spisových uzlů*/
		ixs_tre?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Inetrní subjekt
		*      Interní subjekt ke kterému středisko spisových uzlů náleží
		*/
		ixs_isu?: string|null;
		/**Spisový plán
		*      Výchozí spisový plán pro toto středisko spisových uzlů
		*/
		spis_pl?: string|null;
		/**Spisový znak pro Ad acta
		*      Výchozí spisový znak pro toto středisko spisových uzlů
		*/
		spis_znak?: string|null;
		/**Spisový znak pro spisy
		*      Výchozí spisový znak pro toto středisko spisových uzlů
		*/
		spis_znak_spis?: string|null;
		/**Spisový znak pro kopie
		*      Výchozí spisový plán pro toto středisko spisových uzlů
		*/
		spis_znak_kopie?: string|null;
		/**Spisový uzel pro MAS
		*      Spisový uzel určeného pracovník pro MAS ( skenovací linka )
		*/
		ixs_su_pod?: string|null;
		/**Pracovník pro MAS
		*      Funkční místo určeného pracovník pro MAS ( skenovací linka )
		*/
		ixs_fun_pod?: string|null;
		/**Spisový graf
		*      Podací spisový graf pro toto středisko spisových uzlů
		*/
		spis_graf?: string|null;
		/**Výpravní graf
		*      Výpravní spisový graf pro toto středisko spisových uzlů
		*/
		spis_graf_v?: string|null;
		/**IČO interního subjektu, ke kterému středisko spisových uzlů náleží*/
		ico?: string|null;
		/**Externí systém -  Interní ID externího systému, ke kterému středisko náleží*/
		ixs_ext_ess?: string|null;
	}
	const enum GGinstreDtoNames { ixs_tre = "ixs_tre", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", ixs_isu = "ixs_isu", spis_pl = "spis_pl", spis_znak = "spis_znak", spis_znak_spis = "spis_znak_spis", spis_znak_kopie = "spis_znak_kopie", ixs_su_pod = "ixs_su_pod", ixs_fun_pod = "ixs_fun_pod", spis_graf = "spis_graf", spis_graf_v = "spis_graf_v", ico = "ico", ixs_ext_ess = "ixs_ext_ess",}
	const enum GGinstreDtoFragments { ixs_tre = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", ixs_isu = "*", spis_pl = "*", spis_znak = "*", spis_znak_spis = "*", spis_znak_kopie = "*", ixs_su_pod = "*", ixs_fun_pod = "*", spis_graf = "*", spis_graf_v = "*", ico = "*", ixs_ext_ess = "*",}
	const enum GGinstreDtoTypes { ixs_tre = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", ixs_isu = "string", spis_pl = "string", spis_znak = "string", spis_znak_spis = "string", spis_znak_kopie = "string", ixs_su_pod = "string", ixs_fun_pod = "string", spis_graf = "string", spis_graf_v = "string", ico = "string", ixs_ext_ess = "string",}
	const enum GGinstreDtoTypeLengths { ixs_tre = 12, zkratka = 16, nazev = 50, poznamka = 254, zmenu_prov = 12, ixs_lpc = 12, ixs_isu = 12, spis_pl = 5, spis_znak = 50, spis_znak_spis = 50, spis_znak_kopie = 50, ixs_su_pod = 12, ixs_fun_pod = 12, spis_graf = 10, spis_graf_v = 10, ico = 10, ixs_ext_ess = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsurdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsurd
	*      URL odkazy na uživatelskou dokumentaci
	*/
	interface GGinsurdDto {
		/**Licence databáze*/
		lic?: string|null;
		/**Programová fáze*/
		faze?: string|null;
		/**Interní ID zásilky*/
		por_cislo?: number|null;
		/**URL*/
		url?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		typ_url?: number|null;
	}
	const enum GGinsurdDtoNames { lic = "lic", faze = "faze", por_cislo = "por_cislo", url = "url", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_url = "typ_url",}
	const enum GGinsurdDtoFragments { lic = "*", faze = "*", por_cislo = "*", url = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_url = "*",}
	const enum GGinsurdDtoTypes { lic = "string", faze = "string", por_cislo = "number", url = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_url = "number",}
	const enum GGinsurdDtoTypeLengths { lic = 4, faze = 8, url = 254, nazev = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsurlDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsurl
	*      URL webových aplikací
	*/
	interface GGinsurlDto {
		/**Licence databáze*/
		lic?: string|null;
		/**Programová fáze*/
		faze?: string|null;
		/**Interní ID zásilky*/
		por_cislo?: number|null;
		/**URL*/
		url?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinsurlDtoNames { lic = "lic", faze = "faze", por_cislo = "por_cislo", url = "url", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsurlDtoFragments { lic = "*", faze = "*", por_cislo = "*", url = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsurlDtoTypes { lic = "string", faze = "string", por_cislo = "number", url = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsurlDtoTypeLengths { lic = 4, faze = 8, url = 254, nazev = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsurpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsurp
	*      Úroveň přístupu ESU
	*/
	interface GGinsurpDto {
		/**Úroveň přístupu ESU*/
		ur_pri?: number|null;
		/**Úroveň přístupu ESU*/
		ur_pri_txt?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinsurpDtoNames { ur_pri = "ur_pri", ur_pri_txt = "ur_pri_txt", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinsurpDtoFragments { ur_pri = "*", ur_pri_txt = "*", popis = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinsurpDtoTypes { ur_pri = "number", ur_pri_txt = "string", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinsurpDtoTypeLengths { ur_pri_txt = 50, popis = 2000, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsusrDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsusr
	*      Konfigurační skupina
	*/
	interface GGinsusrDto {
		/**Konfigurační skupina
		*      Konfigurační skupina slouží pro sdružení uživatelů, kteří mají povolenu stejnou kolekci instancí programovách fází
		*/
		ixs_usr?: string|null;
		/**Licence databáze
		*      Konfigurační skupina je platná pouze v rámci této licence - má význam asi jen na MO ČR
		*/
		lic?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**ico*/
		ico?: string|null;
		/**minimální priorita pro přístup*/
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název skupiny*/
		nazev?: string|null;
		/**Kategorie administrátora*/
		ktg_usr?: number|null;
		/**Datum a čas vzniku záznamu*/
		dat_mpd?: JsonDate|null;
		/**Typ konfigurační skupiny*/
		typ_usr?: number|null;
		/**Změnil
		*      ID přihlášení, které realizovalo poslední změnu tohot záznamu
		*/
		ixs_lpc?: string|null;
	}
	const enum GGinsusrDtoNames { ixs_usr = "ixs_usr", lic = "lic", aktivita = "aktivita", ico = "ico", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", ktg_usr = "ktg_usr", dat_mpd = "dat_mpd", typ_usr = "typ_usr", ixs_lpc = "ixs_lpc",}
	const enum GGinsusrDtoFragments { ixs_usr = "*", lic = "*", aktivita = "*", ico = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", ktg_usr = "*", dat_mpd = "*", typ_usr = "*", ixs_lpc = "*",}
	const enum GGinsusrDtoTypes { ixs_usr = "string", lic = "string", aktivita = "number", ico = "string", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", ktg_usr = "number", dat_mpd = "JsonDate", typ_usr = "number", ixs_lpc = "string",}
	const enum GGinsusrDtoTypeLengths { ixs_usr = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 50, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsvauDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsvau
	*      Administrace vaultů
	*/
	interface GGinsvauDto {
		ixs_vau?: string|null;
		/**Pořadí*/
		poradi?: number|null;
		/**Typ vault*/
		typ_vau?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Název pro Azure*/
		nazev_azure?: string|null;
		/**OAuth profil*/
		ixs_oap?: string|null;
		/**Cesta k souboru*/
		path?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Url pro SAB*/
		sab_url?: string|null;
		/**Login pro SAB*/
		sab_login?: string|null;
		/**Přístupový kód pro SAB*/
		sab_acc?: string|null;
	}
	const enum GGinsvauDtoNames { ixs_vau = "ixs_vau", poradi = "poradi", typ_vau = "typ_vau", nazev = "nazev", nazev_azure = "nazev_azure", ixs_oap = "ixs_oap", path = "path", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", sab_url = "sab_url", sab_login = "sab_login", sab_acc = "sab_acc",}
	const enum GGinsvauDtoFragments { ixs_vau = "*", poradi = "*", typ_vau = "*", nazev = "*", nazev_azure = "*", ixs_oap = "*", path = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", sab_url = "*", sab_login = "*", sab_acc = "*",}
	const enum GGinsvauDtoTypes { ixs_vau = "string", poradi = "number", typ_vau = "number", nazev = "string", nazev_azure = "string", ixs_oap = "string", path = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", sab_url = "string", sab_login = "string", sab_acc = "string",}
	const enum GGinsvauDtoTypeLengths { ixs_vau = 12, nazev = 100, nazev_azure = 254, ixs_oap = 12, path = 254, poznamka = 254, zmenu_prov = 12, sab_url = 1000, sab_login = 524, sab_acc = 524,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsvlaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsvla
	*      Vlastnost dokumentu
	*/
	interface GGinsvlaDto {
		/**Vlastnost
		*      Interní ID definice vlastnosti
		*/
		ixs_vla?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Povoleno editovat*/
		priz_edit?: number|null;
		/**Povoleno přidávat*/
		priz_add?: number|null;
		/**Typ vlastnosti*/
		typ_vla?: number|null;
		/**Datový typ*/
		dat_typ?: number|null;
		/**Max.velikost*/
		velikost?: number|null;
		/**maska pro zadání hodnoty*/
		maska?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Kód*/
		kod?: string|null;
		/**Číselník
		*      Interní ID odkazového číselníku
		*/
		ixs_cis?: string|null;
		/**Hodnota
		*      Interní hodnota vlastnosti
		*/
		hovla?: string|null;
		/**Hodnota
		*      Uživatelská podoba hodnoty vlastnosti
		*/
		hovla_txt?: string|null;
		/**Povoleno mazat*/
		priz_del?: number|null;
		/**Kód formuláře
		*      Kód vlastnosti v rámci formulářů
		*/
		kod_form?: string|null;
		/**Úroveň
		*      Úroveň vlastnosti
		*/
		uroven_vla?: number|null;
		barva?: string|null;
		s_view_detail?: number|null;
		ixs_rpp?: string|null;
		rpp_colname?: string|null;
	}
	const enum GGinsvlaDtoNames { ixs_vla = "ixs_vla", nazev = "nazev", zkratka = "zkratka", aktivita = "aktivita", priz_edit = "priz_edit", priz_add = "priz_add", typ_vla = "typ_vla", dat_typ = "dat_typ", velikost = "velikost", maska = "maska", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kod = "kod", ixs_cis = "ixs_cis", hovla = "hovla", hovla_txt = "hovla_txt", priz_del = "priz_del", kod_form = "kod_form", uroven_vla = "uroven_vla", barva = "barva", s_view_detail = "s_view_detail", ixs_rpp = "ixs_rpp", rpp_colname = "rpp_colname",}
	const enum GGinsvlaDtoFragments { ixs_vla = "*", nazev = "*", zkratka = "*", aktivita = "*", priz_edit = "*", priz_add = "*", typ_vla = "*", dat_typ = "*", velikost = "*", maska = "*", dat_zmena = "*", zmenu_prov = "*", kod = "*", ixs_cis = "*", hovla = "*", hovla_txt = "*", priz_del = "*", kod_form = "*", uroven_vla = "*", barva = "*", s_view_detail = "*", ixs_rpp = "*", rpp_colname = "*",}
	const enum GGinsvlaDtoTypes { ixs_vla = "string", nazev = "string", zkratka = "string", aktivita = "number", priz_edit = "number", priz_add = "number", typ_vla = "number", dat_typ = "number", velikost = "number", maska = "string", dat_zmena = "JsonDate", zmenu_prov = "string", kod = "string", ixs_cis = "string", hovla = "string", hovla_txt = "string", priz_del = "number", kod_form = "string", uroven_vla = "number", barva = "string", s_view_detail = "number", ixs_rpp = "string", rpp_colname = "string",}
	const enum GGinsvlaDtoTypeLengths { ixs_vla = 12, nazev = 50, zkratka = 16, maska = 50, zmenu_prov = 12, kod = 6, ixs_cis = 12, hovla = 50, hovla_txt = 50, kod_form = 254, barva = 10, ixs_rpp = 12, rpp_colname = 18,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinsvskDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsvsk
	*      Věcná skupina
	*/
	interface GGinsvskDto {
		/**Identifikátor věcné skupiny
		*      Strojně generovaný identifikátor věcné skupiny
		*/
		ixs_vsk?: string|null;
		/**IČo organizace
		*      IČo organizace, která používá tuto věcnou skupinu
		*/
		ico?: string|null;
		/**Název věcné skupiny
		*      Název věcné skupiny
		*/
		nazev?: string|null;
		/**Čas otevření
		*      Čas otevření věcné skupiny
		*/
		dat_od?: JsonDate|null;
		/**Čas uzavření
		*      Čas uzavření věcné skupiny.
		*/
		dat_do?: JsonDate|null;
		/**Spisový znak
		*      Plně určený spisový znak.
		*/
		spis_znak?: string|null;
		/**Jednoduchý spisový znak
		*      Jednoduchý spisový znak
		*/
		spis_znak_short?: string|null;
		/**Nadřízená věcná skupina
		*      Nadřízená věcná skupina
		*/
		ixs_vsk_nad?: string|null;
		/**Skartační režimy*/
		ixs_skr?: string|null;
		/**Určení spis.znaku*/
		urceni_spis_z?: number|null;
		/**Způsob přiřazení ČJj*/
		zpus_prid_cj?: number|null;
		/**Formát ČJ
		*      Formátovací předpis pro vyskládání textové podoby ČJ
		*/
		format_cj?: string|null;
		/**Trvalý skartační souhlas*/
		priz_trvskar?: number|null;
		/**Spisový plán OD
		*      Spisový plán OD
		*/
		ixs_spn_od?: string|null;
		/**Spisový plán DO*/
		ixs_spn_do?: string|null;
		/**Předchozí spisový znak*/
		ixs_vsk_prev?: string|null;
		/**Následující spisový znak*/
		ixs_vsk_next?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		cs2_spis_znak?: string|null;
		cs2_spis_znak_shor?: string|null;
		/**obd_vsk období číselník - dny roky atd.
		*      obd_vsk období číselník - dny roky atd.
		*/
		obd_vsk?: number|null;
		/**Kam byly entity věcné skupiny přetříděny (např. při přetřídění TS)
		*      Kam byly entity věcné skupiny přetříděny (např. při přetřídění TS)
		*/
		ixs_vsk_pret?: string|null;
		pocet_obd_vsk?: number|null;
		priz_vazba_fun?: number|null;
		priz_kon_form?: number|null;
		/**Skartace pozastavena*/
		priz_poz_skar?: number|null;
		duvod_poz_skar?: string|null;
		ixs_zmp_poz_skar?: string|null;
		dat_poz_skar?: JsonDate|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
	}
	const enum GGinsvskDtoNames { ixs_vsk = "ixs_vsk", ico = "ico", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", spis_znak = "spis_znak", spis_znak_short = "spis_znak_short", ixs_vsk_nad = "ixs_vsk_nad", ixs_skr = "ixs_skr", urceni_spis_z = "urceni_spis_z", zpus_prid_cj = "zpus_prid_cj", format_cj = "format_cj", priz_trvskar = "priz_trvskar", ixs_spn_od = "ixs_spn_od", ixs_spn_do = "ixs_spn_do", ixs_vsk_prev = "ixs_vsk_prev", ixs_vsk_next = "ixs_vsk_next", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cs2_spis_znak = "cs2_spis_znak", cs2_spis_znak_shor = "cs2_spis_znak_shor", obd_vsk = "obd_vsk", ixs_vsk_pret = "ixs_vsk_pret", pocet_obd_vsk = "pocet_obd_vsk", priz_vazba_fun = "priz_vazba_fun", priz_kon_form = "priz_kon_form", priz_poz_skar = "priz_poz_skar", duvod_poz_skar = "duvod_poz_skar", ixs_zmp_poz_skar = "ixs_zmp_poz_skar", dat_poz_skar = "dat_poz_skar", ixp = "ixp",}
	const enum GGinsvskDtoFragments { ixs_vsk = "*", ico = "*", nazev = "*", dat_od = "*", dat_do = "*", spis_znak = "*", spis_znak_short = "*", ixs_vsk_nad = "*", ixs_skr = "*", urceni_spis_z = "*", zpus_prid_cj = "*", format_cj = "*", priz_trvskar = "*", ixs_spn_od = "*", ixs_spn_do = "*", ixs_vsk_prev = "*", ixs_vsk_next = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", cs2_spis_znak = "*", cs2_spis_znak_shor = "*", obd_vsk = "*", ixs_vsk_pret = "*", pocet_obd_vsk = "*", priz_vazba_fun = "*", priz_kon_form = "*", priz_poz_skar = "*", duvod_poz_skar = "*", ixs_zmp_poz_skar = "*", dat_poz_skar = "*", ixp = "*",}
	const enum GGinsvskDtoTypes { ixs_vsk = "string", ico = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", spis_znak = "string", spis_znak_short = "string", ixs_vsk_nad = "string", ixs_skr = "string", urceni_spis_z = "number", zpus_prid_cj = "number", format_cj = "string", priz_trvskar = "number", ixs_spn_od = "string", ixs_spn_do = "string", ixs_vsk_prev = "string", ixs_vsk_next = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cs2_spis_znak = "string", cs2_spis_znak_shor = "string", obd_vsk = "number", ixs_vsk_pret = "string", pocet_obd_vsk = "number", priz_vazba_fun = "number", priz_kon_form = "number", priz_poz_skar = "number", duvod_poz_skar = "string", ixs_zmp_poz_skar = "string", dat_poz_skar = "JsonDate", ixp = "string",}
	const enum GGinsvskDtoTypeLengths { ixs_vsk = 12, ico = 10, nazev = 100, spis_znak = 255, spis_znak_short = 50, ixs_vsk_nad = 12, ixs_skr = 12, format_cj = 60, ixs_spn_od = 12, ixs_spn_do = 12, ixs_vsk_prev = 12, ixs_vsk_next = 12, poznamka = 254, zmenu_prov = 12, cs2_spis_znak = 254, cs2_spis_znak_shor = 254, ixs_vsk_pret = 12, duvod_poz_skar = 254, ixs_zmp_poz_skar = 12, ixp = 12,}
	/**Rozšíření DTO pro věcnou skupinu*/
	interface GGinsvskExtDto extends Gordic.Adm.Interface.GGinsvskDto {
		/**Textová reprezentace skartačního režimu*/
		ixs_skr_txt?: string|null;
		/**Určení spisového znaku (txt)*/
		urceni_spis_z_txt?: string|null;
	}
	const enum GGinsvskExtDtoNames { ixs_skr_txt = "ixs_skr_txt", urceni_spis_z_txt = "urceni_spis_z_txt", ixs_vsk = "ixs_vsk", ico = "ico", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", spis_znak = "spis_znak", spis_znak_short = "spis_znak_short", ixs_vsk_nad = "ixs_vsk_nad", ixs_skr = "ixs_skr", urceni_spis_z = "urceni_spis_z", zpus_prid_cj = "zpus_prid_cj", format_cj = "format_cj", priz_trvskar = "priz_trvskar", ixs_spn_od = "ixs_spn_od", ixs_spn_do = "ixs_spn_do", ixs_vsk_prev = "ixs_vsk_prev", ixs_vsk_next = "ixs_vsk_next", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cs2_spis_znak = "cs2_spis_znak", cs2_spis_znak_shor = "cs2_spis_znak_shor", obd_vsk = "obd_vsk", ixs_vsk_pret = "ixs_vsk_pret", pocet_obd_vsk = "pocet_obd_vsk", priz_vazba_fun = "priz_vazba_fun", priz_kon_form = "priz_kon_form", priz_poz_skar = "priz_poz_skar", duvod_poz_skar = "duvod_poz_skar", ixs_zmp_poz_skar = "ixs_zmp_poz_skar", dat_poz_skar = "dat_poz_skar", ixp = "ixp",}
	const enum GGinsvskExtDtoFragments { ixs_skr_txt = "*", urceni_spis_z_txt = "*", ixs_vsk = "*", ico = "*", nazev = "*", dat_od = "*", dat_do = "*", spis_znak = "*", spis_znak_short = "*", ixs_vsk_nad = "*", ixs_skr = "*", urceni_spis_z = "*", zpus_prid_cj = "*", format_cj = "*", priz_trvskar = "*", ixs_spn_od = "*", ixs_spn_do = "*", ixs_vsk_prev = "*", ixs_vsk_next = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", cs2_spis_znak = "*", cs2_spis_znak_shor = "*", obd_vsk = "*", ixs_vsk_pret = "*", pocet_obd_vsk = "*", priz_vazba_fun = "*", priz_kon_form = "*", priz_poz_skar = "*", duvod_poz_skar = "*", ixs_zmp_poz_skar = "*", dat_poz_skar = "*", ixp = "*",}
	const enum GGinsvskExtDtoTypes { ixs_skr_txt = "string", urceni_spis_z_txt = "string", ixs_vsk = "string", ico = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", spis_znak = "string", spis_znak_short = "string", ixs_vsk_nad = "string", ixs_skr = "string", urceni_spis_z = "number", zpus_prid_cj = "number", format_cj = "string", priz_trvskar = "number", ixs_spn_od = "string", ixs_spn_do = "string", ixs_vsk_prev = "string", ixs_vsk_next = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cs2_spis_znak = "string", cs2_spis_znak_shor = "string", obd_vsk = "number", ixs_vsk_pret = "string", pocet_obd_vsk = "number", priz_vazba_fun = "number", priz_kon_form = "number", priz_poz_skar = "number", duvod_poz_skar = "string", ixs_zmp_poz_skar = "string", dat_poz_skar = "JsonDate", ixp = "string",}
	const enum GGinsvskExtDtoTypeLengths { ixs_vsk = 12, ico = 10, nazev = 100, spis_znak = 255, spis_znak_short = 50, ixs_vsk_nad = 12, ixs_skr = 12, format_cj = 60, ixs_spn_od = 12, ixs_spn_do = 12, ixs_vsk_prev = 12, ixs_vsk_next = 12, poznamka = 254, zmenu_prov = 12, cs2_spis_znak = 254, cs2_spis_znak_shor = 254, ixs_vsk_pret = 12, duvod_poz_skar = 254, ixs_zmp_poz_skar = 12, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinswgpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginswgp
	*      Pracovní skupiny pro IRP
	*/
	interface GGinswgpDto {
		ixs_wgp?: string|null;
		/**Název*/
		nazev?: string|null;
		duvod_vzniku?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
	}
	const enum GGinswgpDtoNames { ixs_wgp = "ixs_wgp", nazev = "nazev", duvod_vzniku = "duvod_vzniku", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc",}
	const enum GGinswgpDtoFragments { ixs_wgp = "*", nazev = "*", duvod_vzniku = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*",}
	const enum GGinswgpDtoTypes { ixs_wgp = "string", nazev = "string", duvod_vzniku = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string",}
	const enum GGinswgpDtoTypeLengths { ixs_wgp = 12, nazev = 50, duvod_vzniku = 254, poznamka = 254, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinszahDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginszah
	*      Zakázaná hesla
	*/
	interface GGinszahDto {
		heslo?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinszahDtoNames { heslo = "heslo", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinszahDtoFragments { heslo = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinszahDtoTypes { heslo = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinszahDtoTypeLengths { heslo = 100, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGintlisDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gintlis
	*      Aktuální počty potřebných serverových licencí
	*/
	interface GGintlisDto {
		/**Identifikátor databázového připojení*/
		log_por_cislo?: number|null;
		/**Položka*/
		pol?: string|null;
		/**Popis*/
		popis?: string|null;
		pocet?: number|null;
		pocet_cert?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**PPol*/
		ppol?: string|null;
		ppol_cert?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
	}
	const enum GGintlisDtoNames { log_por_cislo = "log_por_cislo", pol = "pol", popis = "popis", pocet = "pocet", pocet_cert = "pocet_cert", poznamka = "poznamka", ppol = "ppol", ppol_cert = "ppol_cert", zkratka = "zkratka",}
	const enum GGintlisDtoFragments { log_por_cislo = "*", pol = "*", popis = "*", pocet = "*", pocet_cert = "*", poznamka = "*", ppol = "*", ppol_cert = "*", zkratka = "*",}
	const enum GGintlisDtoTypes { log_por_cislo = "number", pol = "string", popis = "string", pocet = "number", pocet_cert = "number", poznamka = "string", ppol = "string", ppol_cert = "string", zkratka = "string",}
	const enum GGintlisDtoTypeLengths { pol = 4, popis = 254, poznamka = 254, ppol = 3, ppol_cert = 3, zkratka = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGintsesDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gintses*/
	interface GGintsesDto {
		/**DBCOLUMN:gintses.sessid*/
		sessid?: number|null;
		/**DBCOLUMN:gintses.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:gintses.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:gintses.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GGintsesDtoNames { sessid = "sessid", log_por_cislo = "log_por_cislo", ixs_lpc = "ixs_lpc", dat_zmena = "dat_zmena",}
	const enum GGintsesDtoFragments { sessid = "*", log_por_cislo = "*", ixs_lpc = "*", dat_zmena = "*",}
	const enum GGintsesDtoTypes { sessid = "number", log_por_cislo = "number", ixs_lpc = "string", dat_zmena = "JsonDate",}
	const enum GGintsesDtoTypeLengths { ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvadiDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvadi
	*      IČO pro administrátora
	*/
	interface GGinvadiDto {
		/**Funkční místo
		*      Interní identifikace funkčního místa ke kterému se práva k IČu navazují
		*/
		ixs_fun?: string|null;
		/**IČO
		*      IČO organizace ke které se přiřazují práva administrátora ( k jejím datům administrace )
		*/
		ico?: string|null;
		/**Úroveň přístupu*/
		urpri_fico?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinvadiDtoNames { ixs_fun = "ixs_fun", ico = "ico", urpri_fico = "urpri_fico", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvadiDtoFragments { ixs_fun = "*", ico = "*", urpri_fico = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvadiDtoTypes { ixs_fun = "string", ico = "string", urpri_fico = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvadiDtoTypeLengths { ixs_fun = 12, ico = 10, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvdbpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvdbp*/
	interface GGinvdbpDto {
		/**DBCOLUMN:ginvdbp.faze*/
		faze?: string|null;
		/**DBCOLUMN:ginvdbp.dbprofil*/
		dbprofil?: string|null;
		/**DBCOLUMN:ginvdbp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginvdbp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginvdbp.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GGinvdbpDtoNames { faze = "faze", dbprofil = "dbprofil", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvdbpDtoFragments { faze = "*", dbprofil = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvdbpDtoTypes { faze = "string", dbprofil = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvdbpDtoTypeLengths { faze = 8, dbprofil = 15, zmenu_prov = 12,}
	/**Rozšíření navázané fáze*/
	interface GGinvdbpExtDto extends Gordic.Adm.Interface.GGinvdbpDto {
		/**Textová reprezentace fáze*/
		faze_txt?: string|null;
		/**Textová reprezentace aktivita*/
		aktivita_txt?: string|null;
	}
	const enum GGinvdbpExtDtoNames { faze_txt = "faze_txt", aktivita_txt = "aktivita_txt", faze = "faze", dbprofil = "dbprofil", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvdbpExtDtoFragments { faze_txt = "*", aktivita_txt = "*", faze = "*", dbprofil = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvdbpExtDtoTypes { faze_txt = "string", aktivita_txt = "string", faze = "string", dbprofil = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvdbpExtDtoTypeLengths { faze = 8, dbprofil = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvfmsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvfms
	*      Možné migrace formátů
	*/
	interface GGinvfmsDto {
		pronom_id_puv?: number|null;
		pronom_id_konc?: number|null;
		url_migr_sluzby_1?: string|null;
		url_migr_sluzby_2?: string|null;
		url_migr_sluzby_3?: string|null;
		url_migr_sl_alt_1?: string|null;
		url_migr_sl_alt_2?: string|null;
		url_migr_sl_alt_3?: string|null;
		proc_ztrat?: JsonDecimal|null;
		proc_ztrat_alt?: JsonDecimal|null;
		priz_vidim?: number|null;
		priz_vidim_alt?: number|null;
		priorita?: number|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinvfmsDtoNames { pronom_id_puv = "pronom_id_puv", pronom_id_konc = "pronom_id_konc", url_migr_sluzby_1 = "url_migr_sluzby_1", url_migr_sluzby_2 = "url_migr_sluzby_2", url_migr_sluzby_3 = "url_migr_sluzby_3", url_migr_sl_alt_1 = "url_migr_sl_alt_1", url_migr_sl_alt_2 = "url_migr_sl_alt_2", url_migr_sl_alt_3 = "url_migr_sl_alt_3", proc_ztrat = "proc_ztrat", proc_ztrat_alt = "proc_ztrat_alt", priz_vidim = "priz_vidim", priz_vidim_alt = "priz_vidim_alt", priorita = "priorita", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvfmsDtoFragments { pronom_id_puv = "*", pronom_id_konc = "*", url_migr_sluzby_1 = "*", url_migr_sluzby_2 = "*", url_migr_sluzby_3 = "*", url_migr_sl_alt_1 = "*", url_migr_sl_alt_2 = "*", url_migr_sl_alt_3 = "*", proc_ztrat = "*", proc_ztrat_alt = "*", priz_vidim = "*", priz_vidim_alt = "*", priorita = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvfmsDtoTypes { pronom_id_puv = "number", pronom_id_konc = "number", url_migr_sluzby_1 = "string", url_migr_sluzby_2 = "string", url_migr_sluzby_3 = "string", url_migr_sl_alt_1 = "string", url_migr_sl_alt_2 = "string", url_migr_sl_alt_3 = "string", proc_ztrat = "JsonDecimal", proc_ztrat_alt = "JsonDecimal", priz_vidim = "number", priz_vidim_alt = "number", priorita = "number", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvfmsDtoTypeLengths { url_migr_sluzby_1 = 254, url_migr_sluzby_2 = 254, url_migr_sluzby_3 = 254, url_migr_sl_alt_1 = 254, url_migr_sl_alt_2 = 254, url_migr_sl_alt_3 = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvfusDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvfus
	*      Navázané SU
	*/
	interface GGinvfusDto {
		/**identifik. subjektu*/
		ixs_fun?: string|null;
		/**spisový uzel*/
		ixs_su?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
	}
	const enum GGinvfusDtoNames { ixs_fun = "ixs_fun", ixs_su = "ixs_su", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc",}
	const enum GGinvfusDtoFragments { ixs_fun = "*", ixs_su = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*",}
	const enum GGinvfusDtoTypes { ixs_fun = "string", ixs_su = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string",}
	const enum GGinvfusDtoTypeLengths { ixs_fun = 12, ixs_su = 12, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvinuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvinu
	*      Instance konfigurační skupiny
	*/
	interface GGinvinuDto {
		/**Konfigurační skupina*/
		ixs_usr?: string|null;
		/**Instance programové fáze*/
		ixs_ins?: string|null;
		/**Aktivita vazby*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Licence*/
		lic?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
	}
	const enum GGinvinuDtoNames { ixs_usr = "ixs_usr", ixs_ins = "ixs_ins", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", lic = "lic", ixs_lpc = "ixs_lpc",}
	const enum GGinvinuDtoFragments { ixs_usr = "*", ixs_ins = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", lic = "*", ixs_lpc = "*",}
	const enum GGinvinuDtoTypes { ixs_usr = "string", ixs_ins = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", lic = "string", ixs_lpc = "string",}
	const enum GGinvinuDtoTypeLengths { ixs_usr = 12, ixs_ins = 12, zmenu_prov = 12, lic = 4, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvlgcDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvlgc
	*      Využití Lang AI aplikací v GContentech
	*      Napojení LangAi na Ginis
	*/
	interface GGinvlgcDto {
		lgcontent?: number|null;
		/**Ixs identifikátor Lang AI Aplikace*/
		ixs_lap?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinvlgcDtoNames { lgcontent = "lgcontent", ixs_lap = "ixs_lap", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvlgcDtoFragments { lgcontent = "*", ixs_lap = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvlgcDtoTypes { lgcontent = "number", ixs_lap = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvlgcDtoTypeLengths { ixs_lap = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvlscDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvlsc
	*      AI aplikace využívající scénáře
	*/
	interface GGinvlscDto {
		ixs_lap?: string|null;
		ixs_lsc?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		lgcontent?: number|null;
	}
	const enum GGinvlscDtoNames { ixs_lap = "ixs_lap", ixs_lsc = "ixs_lsc", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", lgcontent = "lgcontent",}
	const enum GGinvlscDtoFragments { ixs_lap = "*", ixs_lsc = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", lgcontent = "*",}
	const enum GGinvlscDtoTypes { ixs_lap = "string", ixs_lsc = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", lgcontent = "number",}
	const enum GGinvlscDtoTypeLengths { ixs_lap = 12, ixs_lsc = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvovkDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvovk
	*      Vlastnost pro obecný objekt
	*/
	interface GGinvovkDto {
		/**ID subjektu*/
		sxs?: string|null;
		/**ID vlastnosti/struktury/profilu
		*      ID vlastnosti, struktury nebo profilu, který je navázán na objekt identifikovaný klíčem sxs a typem objektu GINIS
		*/
		ixs?: string|null;
		/**Typu subjektu*/
		typ_obj?: number|null;
		/**Typ vlastnosti*/
		typ_vps?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Pořadí*/
		poradi?: number|null;
	}
	const enum GGinvovkDtoNames { sxs = "sxs", ixs = "ixs", typ_obj = "typ_obj", typ_vps = "typ_vps", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", poradi = "poradi",}
	const enum GGinvovkDtoFragments { sxs = "*", ixs = "*", typ_obj = "*", typ_vps = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*", poradi = "*",}
	const enum GGinvovkDtoTypes { sxs = "string", ixs = "string", typ_obj = "number", typ_vps = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", poradi = "number",}
	const enum GGinvovkDtoTypeLengths { sxs = 200, ixs = 12, zmenu_prov = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvovlDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvovl
	*      Vlastnost pro typ subjektu
	*/
	interface GGinvovlDto {
		/**ID typu objektu 
		*      ID typu jednoho z objektů vedených v IS GINIS
		*/
		typ_obj?: number|null;
		/**ID vlastnosti/struktury/profilu
		*      ID vlastnosti, struktury nebo profilu, který má být povolen pro vazbu na zadaný typ objektu GINIS
		*/
		ixs?: string|null;
		/**Typ vlastnosti
		*      Upřesnění, zda se jedná o vlastnost, strukturu nebo profil.
		*/
		typ_vps?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Pořadí*/
		poradi?: number|null;
	}
	const enum GGinvovlDtoNames { typ_obj = "typ_obj", ixs = "ixs", typ_vps = "typ_vps", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", poradi = "poradi",}
	const enum GGinvovlDtoFragments { typ_obj = "*", ixs = "*", typ_vps = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*", poradi = "*",}
	const enum GGinvovlDtoTypes { typ_obj = "number", ixs = "string", typ_vps = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", poradi = "number",}
	const enum GGinvovlDtoTypeLengths { ixs = 12, zmenu_prov = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvovpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvovp
	*      Vlastnosti pro typ subjektu a IČO
	*/
	interface GGinvovpDto {
		/**Typ subjektu
		*      Interní ID typu subjektu, pro který je možné přidat profil/strukturu/vlastnost
		*/
		typ_obj?: number|null;
		/**ID vlastnosti/struktury/profilu
		*      ID vlastnosti, struktury nebo profilu, které má být umožněno navázat na zadaný typ objektu GINIS
		*/
		ixs?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Typ vlastnosti*/
		typ_vps?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinvovpDtoNames { typ_obj = "typ_obj", ixs = "ixs", ico = "ico", typ_vps = "typ_vps", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvovpDtoFragments { typ_obj = "*", ixs = "*", ico = "*", typ_vps = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvovpDtoTypes { typ_obj = "number", ixs = "string", ico = "string", typ_vps = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvovpDtoTypeLengths { ixs = 12, ico = 10, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvpodDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvpod
	*      Spisové uzly pro předávání
	*/
	interface GGinvpodDto {
		/**Spisový uzel*/
		ixs_su?: string|null;
		ixs_su_pre?: string|null;
		nazev_su_pre?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
	}
	const enum GGinvpodDtoNames { ixs_su = "ixs_su", ixs_su_pre = "ixs_su_pre", nazev_su_pre = "nazev_su_pre", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc",}
	const enum GGinvpodDtoFragments { ixs_su = "*", ixs_su_pre = "*", nazev_su_pre = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*",}
	const enum GGinvpodDtoTypes { ixs_su = "string", ixs_su_pre = "string", nazev_su_pre = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string",}
	const enum GGinvpodDtoTypeLengths { ixs_su = 12, ixs_su_pre = 12, nazev_su_pre = 50, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvpsuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvpsu
	*      Přívěsky spisové značky za spisový uzel
	*/
	interface GGinvpsuDto {
		/**Spisový uzel*/
		ixs_su?: string|null;
		cj_ext?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GGinvpsuDtoNames { ixs_su = "ixs_su", cj_ext = "cj_ext", k_v = "k_v", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvpsuDtoFragments { ixs_su = "*", cj_ext = "*", k_v = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvpsuDtoTypes { ixs_su = "string", cj_ext = "string", k_v = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvpsuDtoTypeLengths { ixs_su = 12, cj_ext = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvreuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvreu
	*      Úroveň přístupu osoby
	*/
	interface GGinvreuDto {
		/**Osoba*/
		ixs_ref?: string|null;
		/**Úroveň přístupu*/
		st_utaj_id?: number|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinvreuDtoNames { ixs_ref = "ixs_ref", st_utaj_id = "st_utaj_id", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvreuDtoFragments { ixs_ref = "*", st_utaj_id = "*", dat_od = "*", dat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvreuDtoTypes { ixs_ref = "string", st_utaj_id = "number", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvreuDtoTypeLengths { ixs_ref = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvsfuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvsfu
	*      Práva ke skupině
	*/
	interface GGinvsfuDto {
		/**Funkční místo
		*      Funkční místo, kterému jsou přiřazena práva ke skupině. Přesněji k dokumentům členů skupiny.
		*/
		ixs_fun?: string|null;
		/**Skupina funkcí*/
		ixs_sfu?: string|null;
		/**Oprávnění ke skupině
		*      Práva udělená ke skupině funkčních míst - přesněji k dokumentům členů skupiny
		*/
		typ_prist_sfu?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinvsfuDtoNames { ixs_fun = "ixs_fun", ixs_sfu = "ixs_sfu", typ_prist_sfu = "typ_prist_sfu", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvsfuDtoFragments { ixs_fun = "*", ixs_sfu = "*", typ_prist_sfu = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvsfuDtoTypes { ixs_fun = "string", ixs_sfu = "string", typ_prist_sfu = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvsfuDtoTypeLengths { ixs_fun = 12, ixs_sfu = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvstfDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvstf
	*      Povolené stanice
	*/
	interface GGinvstfDto {
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Síťové jméno*/
		ip_adr?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinvstfDtoNames { ixs_fun = "ixs_fun", ip_adr = "ip_adr", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvstfDtoFragments { ixs_fun = "*", ip_adr = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvstfDtoTypes { ixs_fun = "string", ip_adr = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvstfDtoTypeLengths { ixs_fun = 12, ip_adr = 50, zmenu_prov = 12,}
	/**Rozšíření stanice*/
	interface GGinvstfExtDto extends Gordic.Adm.Interface.GGinvstfDto {
		/**Textová reprezentace stanice*/
		ip_adr_txt?: string|null;
	}
	const enum GGinvstfExtDtoNames { ip_adr_txt = "ip_adr_txt", ixs_fun = "ixs_fun", ip_adr = "ip_adr", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvstfExtDtoFragments { ip_adr_txt = "*", ixs_fun = "*", ip_adr = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvstfExtDtoTypes { ip_adr_txt = "string", ixs_fun = "string", ip_adr = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvstfExtDtoTypeLengths { ixs_fun = 12, ip_adr = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvtvlDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvtvl
	*      Vazba typu písemnosti na vlastnosti
	*/
	interface GGinvtvlDto {
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		/**vlastnost, struktura, profil
		*      vlastnost, struktura, profil
		*/
		ixs?: string|null;
		/**Typ vlastnosti*/
		typ_vps?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**IČO*/
		ico?: string|null;
	}
	const enum GGinvtvlDtoNames { ixs_typ = "ixs_typ", ixs = "ixs", typ_vps = "typ_vps", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico",}
	const enum GGinvtvlDtoFragments { ixs_typ = "*", ixs = "*", typ_vps = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*",}
	const enum GGinvtvlDtoTypes { ixs_typ = "string", ixs = "string", typ_vps = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string",}
	const enum GGinvtvlDtoTypeLengths { ixs_typ = 12, ixs = 12, zmenu_prov = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvusrDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvusr
	*      Členství funkčních míst v konfiguračních skupinách
	*/
	interface GGinvusrDto {
		/**Funkční místo
		*      Funkční místo přiřazené ke konfigurační skupině
		*/
		ixs_fun?: string|null;
		/**Konfigurační skupina
		*      Konfigurační skupina přiřazená k funkčnímu místu
		*/
		ixs_usr?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
	}
	const enum GGinvusrDtoNames { ixs_fun = "ixs_fun", ixs_usr = "ixs_usr", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc",}
	const enum GGinvusrDtoFragments { ixs_fun = "*", ixs_usr = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*",}
	const enum GGinvusrDtoTypes { ixs_fun = "string", ixs_usr = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string",}
	const enum GGinvusrDtoTypeLengths { ixs_fun = 12, ixs_usr = 12, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvvskDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvvsk
	*      Oprávnění k věcné skupině
	*/
	interface GGinvvskDto {
		/**Identifikátor věcné skupiny*/
		ixs_vsk?: string|null;
		/**Konfigurační skupina*/
		ixs_usr?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GGinvvskDtoNames { ixs_vsk = "ixs_vsk", ixs_usr = "ixs_usr", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GGinvvskDtoFragments { ixs_vsk = "*", ixs_usr = "*", nazev = "*", dat_od = "*", dat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GGinvvskDtoTypes { ixs_vsk = "string", ixs_usr = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GGinvvskDtoTypeLengths { ixs_vsk = 12, ixs_usr = 12, nazev = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GGinvzasDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginvzas*/
	interface GGinvzasDto {
		/**DBCOLUMN:ginvzas.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:ginvzas.ixs_ref*/
		ixs_ref?: string|null;
		/**DBCOLUMN:ginvzas.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:ginvzas.ixs_zmp*/
		ixs_zmp?: string|null;
		/**DBCOLUMN:ginvzas.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginvzas.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginvzas.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginvzas.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginvzas.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginvzas.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:ginvzas.poradi_log*/
		poradi_log?: number|null;
		/**DBCOLUMN:ginvzas.faze*/
		faze?: string|null;
		/**DBCOLUMN:ginvzas.priz_adm*/
		priz_adm?: number|null;
		/**DBCOLUMN:ginvzas.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginvzas.mimo_faze*/
		mimo_faze?: string|null;
		/**DBCOLUMN:ginvzas.priz_avizas*/
		priz_avizas?: number|null;
	}
	const enum GGinvzasDtoNames { ixs_fun = "ixs_fun", ixs_ref = "ixs_ref", nazev_ref = "nazev_ref", ixs_zmp = "ixs_zmp", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", poradi_log = "poradi_log", faze = "faze", priz_adm = "priz_adm", ixs_lpc = "ixs_lpc", mimo_faze = "mimo_faze", priz_avizas = "priz_avizas",}
	const enum GGinvzasDtoFragments { ixs_fun = "*", ixs_ref = "*", nazev_ref = "*", ixs_zmp = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", poradi_log = "*", faze = "*", priz_adm = "*", ixs_lpc = "*", mimo_faze = "*", priz_avizas = "*",}
	const enum GGinvzasDtoTypes { ixs_fun = "string", ixs_ref = "string", nazev_ref = "string", ixs_zmp = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", poradi_log = "number", faze = "string", priz_adm = "number", ixs_lpc = "string", mimo_faze = "string", priz_avizas = "number",}
	const enum GGinvzasDtoTypeLengths { ixs_fun = 12, ixs_ref = 12, nazev_ref = 200, ixs_zmp = 12, zmenu_prov = 12, nazev_rf = 200, faze = 8, ixs_lpc = 12, mimo_faze = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Gin\GWflcrspDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcrsp
	*      Režim řízení
	*/
	interface GWflcrspDto {
		/**Režim řízení
		*      Režim řízení schvalovacího procesu EPK
		*/
		rezim_sch?: number|null;
		/**Zkratka režimu schvalovacího procesu*/
		rezim_sch_zkr?: string|null;
		/**Název režimu schvalovacího procesu*/
		rezim_sch_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		rezim_sch_rsx?: number|null;
	}
	const enum GWflcrspDtoNames { rezim_sch = "rezim_sch", rezim_sch_zkr = "rezim_sch_zkr", rezim_sch_txt = "rezim_sch_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", rezim_sch_rsx = "rezim_sch_rsx",}
	const enum GWflcrspDtoFragments { rezim_sch = "*", rezim_sch_zkr = "*", rezim_sch_txt = "*", k_v = "*", k_s = "*", aktivita = "*", rezim_sch_rsx = "*",}
	const enum GWflcrspDtoTypes { rezim_sch = "number", rezim_sch_zkr = "string", rezim_sch_txt = "string", k_v = "number", k_s = "string", aktivita = "number", rezim_sch_rsx = "number",}
	const enum GWflcrspDtoTypeLengths { rezim_sch_zkr = 3, rezim_sch_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Grf\GGindgrfDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gindgrf*/
	interface GGindgrfDto {
		/**DBCOLUMN:gindgrf.ixs_grf*/
		ixs_grf?: string|null;
		/**DBCOLUMN:gindgrf.ixs_grt*/
		ixs_grt?: string|null;
		/**DBCOLUMN:gindgrf.grt_por_cislo*/
		grt_por_cislo?: number|null;
		/**DBCOLUMN:gindgrf.grf_count*/
		grf_count?: number|null;
		/**DBCOLUMN:gindgrf.grf_sum*/
		grf_sum?: JsonDecimal|null;
		/**DBCOLUMN:gindgrf.dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GGindgrfDtoNames { ixs_grf = "ixs_grf", ixs_grt = "ixs_grt", grt_por_cislo = "grt_por_cislo", grf_count = "grf_count", grf_sum = "grf_sum", dat_zmena = "dat_zmena",}
	const enum GGindgrfDtoFragments { ixs_grf = "*", ixs_grt = "*", grt_por_cislo = "*", grf_count = "*", grf_sum = "*", dat_zmena = "*",}
	const enum GGindgrfDtoTypes { ixs_grf = "string", ixs_grt = "string", grt_por_cislo = "number", grf_count = "number", grf_sum = "JsonDecimal", dat_zmena = "JsonDate",}
	const enum GGindgrfDtoTypeLengths { ixs_grf = 12, ixs_grt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Grf\GGinsgrfDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsgrf*/
	interface GGinsgrfDto {
		/**DBCOLUMN:ginsgrf.ixs_grf*/
		ixs_grf?: string|null;
		/**DBCOLUMN:ginsgrf.ixs_grt*/
		ixs_grt?: string|null;
		/**DBCOLUMN:ginsgrf.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsgrf.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ginsgrf.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ginsgrf.sxs_prim*/
		sxs_prim?: string|null;
		/**DBCOLUMN:ginsgrf.typ_obj_prim*/
		typ_obj_prim?: number|null;
		/**DBCOLUMN:ginsgrf.popis_prim*/
		popis_prim?: string|null;
		/**DBCOLUMN:ginsgrf.sxs_sec*/
		sxs_sec?: string|null;
		/**DBCOLUMN:ginsgrf.typ_obj_sec*/
		typ_obj_sec?: number|null;
		/**DBCOLUMN:ginsgrf.popis_sec*/
		popis_sec?: string|null;
		/**DBCOLUMN:ginsgrf.popis_count*/
		popis_count?: string|null;
		/**DBCOLUMN:ginsgrf.popis_sum*/
		popis_sum?: string|null;
		/**DBCOLUMN:ginsgrf.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsgrf.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsgrf.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsgrf.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ginsgrf.popis_grf1*/
		popis_grf1?: string|null;
		/**DBCOLUMN:ginsgrf.popis_grf2*/
		popis_grf2?: string|null;
		/**DBCOLUMN:ginsgrf.meritko_count*/
		meritko_count?: JsonDecimal|null;
		/**DBCOLUMN:ginsgrf.meritko_sum*/
		meritko_sum?: JsonDecimal|null;
		/**DBCOLUMN:ginsgrf.jednotky_count*/
		jednotky_count?: string|null;
		/**DBCOLUMN:ginsgrf.jednotky_sum*/
		jednotky_sum?: string|null;
		/**DBCOLUMN:ginsgrf.sql_sel_sum*/
		sql_sel_sum?: string|null;
		/**DBCOLUMN:ginsgrf.sql_sel_count*/
		sql_sel_count?: string|null;
		/**DBCOLUMN:ginsgrf.sql_sp_sum*/
		sql_sp_sum?: string|null;
		/**DBCOLUMN:ginsgrf.sql_sp_count*/
		sql_sp_count?: string|null;
		/**DBCOLUMN:ginsgrf.ixs_grf_nad*/
		ixs_grf_nad?: string|null;
		/**DBCOLUMN:ginsgrf.typ_grf*/
		typ_grf?: number|null;
	}
	const enum GGinsgrfDtoNames { ixs_grf = "ixs_grf", ixs_grt = "ixs_grt", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", sxs_prim = "sxs_prim", typ_obj_prim = "typ_obj_prim", popis_prim = "popis_prim", sxs_sec = "sxs_sec", typ_obj_sec = "typ_obj_sec", popis_sec = "popis_sec", popis_count = "popis_count", popis_sum = "popis_sum", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", popis_grf1 = "popis_grf1", popis_grf2 = "popis_grf2", meritko_count = "meritko_count", meritko_sum = "meritko_sum", jednotky_count = "jednotky_count", jednotky_sum = "jednotky_sum", sql_sel_sum = "sql_sel_sum", sql_sel_count = "sql_sel_count", sql_sp_sum = "sql_sp_sum", sql_sp_count = "sql_sp_count", ixs_grf_nad = "ixs_grf_nad", typ_grf = "typ_grf",}
	const enum GGinsgrfDtoFragments { ixs_grf = "*", ixs_grt = "*", nazev = "*", dat_od = "*", dat_do = "*", sxs_prim = "*", typ_obj_prim = "*", popis_prim = "*", sxs_sec = "*", typ_obj_sec = "*", popis_sec = "*", popis_count = "*", popis_sum = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", popis_grf1 = "*", popis_grf2 = "*", meritko_count = "*", meritko_sum = "*", jednotky_count = "*", jednotky_sum = "*", sql_sel_sum = "*", sql_sel_count = "*", sql_sp_sum = "*", sql_sp_count = "*", ixs_grf_nad = "*", typ_grf = "*",}
	const enum GGinsgrfDtoTypes { ixs_grf = "string", ixs_grt = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", sxs_prim = "string", typ_obj_prim = "number", popis_prim = "string", sxs_sec = "string", typ_obj_sec = "number", popis_sec = "string", popis_count = "string", popis_sum = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", popis_grf1 = "string", popis_grf2 = "string", meritko_count = "JsonDecimal", meritko_sum = "JsonDecimal", jednotky_count = "string", jednotky_sum = "string", sql_sel_sum = "string", sql_sel_count = "string", sql_sp_sum = "string", sql_sp_count = "string", ixs_grf_nad = "string", typ_grf = "number",}
	const enum GGinsgrfDtoTypeLengths { ixs_grf = 12, ixs_grt = 12, nazev = 100, sxs_prim = 50, popis_prim = 254, sxs_sec = 50, popis_sec = 254, popis_count = 254, popis_sum = 254, poznamka = 254, zmenu_prov = 12, popis_grf1 = 254, popis_grf2 = 254, jednotky_count = 254, jednotky_sum = 254, sql_sel_sum = 2000, sql_sel_count = 2000, sql_sp_sum = 50, sql_sp_count = 50, ixs_grf_nad = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Int\GIntcpesDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:intcpes
	*      Směr BP rozhraní
	*/
	interface GIntcpesDto {
		/**Směr BP rozhraní*/
		priz_ess?: number|null;
		priz_ess_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GIntcpesDtoNames { priz_ess = "priz_ess", priz_ess_txt = "priz_ess_txt", k_v = "k_v", k_s = "k_s",}
	const enum GIntcpesDtoFragments { priz_ess = "*", priz_ess_txt = "*", k_v = "*", k_s = "*",}
	const enum GIntcpesDtoTypes { priz_ess = "number", priz_ess_txt = "string", k_v = "number", k_s = "string",}
	const enum GIntcpesDtoTypeLengths { priz_ess_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Int\GIntddavDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:intddav
	*      Externí identifikace
	*/
	interface GIntddavDto {
		/**ID externího systému*/
		ixs_ext?: string|null;
		/**ID typu objektu
		*      Pro externí systémy je typ objektu identifikován tzv. segmentem. Je to stringové ID přiřazené v rámci rozhraní INT pro konkrétní typ objektu se kterým systém GINIS pracuje.
		*/
		id_seg?: string|null;
		/**Externí ID objektu
		*      Externí systém přiřadí objektu se kterým v rámci rozhraní GINIS pracuje svou unikátní identifikaci. Systém GINIS ji při prvním zachyceném výskytu zaregistruje do převodní tabulky a následně již objekt externím systémem takto identifikovaný dokáže přiřadit k vnitřní identifikaci systému GINIS
		*/
		id_ext?: string|null;
		/**Iterní identifikace objektu
		*      Pokud je v rámci rozhraní zaregistrována externí identifikace objektu, potom je v rámci této tabulky přiřazena interní identifikaci.
		*/
		id_int?: string|null;
		/**Příznak generování*/
		s_gener?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Typ vazby dvou identifikací*/
		priz_log?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GIntddavDtoNames { ixs_ext = "ixs_ext", id_seg = "id_seg", id_ext = "id_ext", id_int = "id_int", s_gener = "s_gener", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_log = "priz_log", aktivita = "aktivita",}
	const enum GIntddavDtoFragments { ixs_ext = "*", id_seg = "*", id_ext = "*", id_int = "*", s_gener = "*", dat_zmena = "*", zmenu_prov = "*", priz_log = "*", aktivita = "*",}
	const enum GIntddavDtoTypes { ixs_ext = "string", id_seg = "string", id_ext = "string", id_int = "string", s_gener = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_log = "number", aktivita = "number",}
	const enum GIntddavDtoTypeLengths { ixs_ext = 12, id_seg = 12, id_ext = 200, id_int = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Int\GIntsextDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:intsext
	*      Externí systém
	*/
	interface GIntsextDto {
		/**Externí systém
		*      Interní ID externího systému
		*/
		ixs_ext?: string|null;
		/**Název externího systému*/
		nazev?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**Příznak exportu rodných čísel*/
		priz_exp_rc?: number|null;
		/**Mail pro chyby*/
		mail_chyby?: string|null;
		/**Příznak testu formátu rodného čísla*/
		priz_test_rc?: number|null;
		/**délka pořadového čísla dávky*/
		delka_pc?: number|null;
		/**délka verze dávky*/
		delka_ver?: number|null;
		/**Plnit RČ do nevyplněného IČA v segmentu ESU*/
		priz_ico_rc?: number|null;
		/**Úroveň pro ESU
		*      Úroveň přístupu pro zakládané externí subjekty tímto externím systémem
		*/
		ur_pri?: number|null;
		priz_maz_fud?: number|null;
		/**Příznak hledání posledního aktivního ESU*/
		priz_akt_esu?: number|null;
		/**Příznak administrace z ADM (ws)*/
		priz_aws?: number|null;
		/**Příznak testovaní formátu bankovního účtu*/
		priz_test_bu?: number|null;
		/**Příznak zachování obálkové adresy v ESU*/
		priz_zach_obal?: number|null;
		/**Příznak stejného ESU*/
		priz_st_esu?: number|null;
		skupina_id_ext?: number|null;
		/**Příznak vazby externího systému na dávku*/
		priz_vazba_esf?: number|null;
		/**Příznak ignorování ORJ a FUN*/
		priz_ign_orjfun?: number|null;
		/**Povolení verzování dávek při odmítání celé dávky při chybě*/
		priz_ver_odm?: number|null;
		priz_msm?: number|null;
		/**Příznak IS*/
		priz_no_is?: number|null;
		/**Příznak formátu XML*/
		priz_xml?: number|null;
		/**Pov.předávat
		*      Příznak, že v rámci tohoto externího systému je povoleno předávat PIDy
		*/
		priz_ruc_pre_do_ea?: number|null;
		/**ZJ - Záznamová jednotka*/
		uef?: string|null;
		/**ID externího systému dle NS
		*      Identifikace systému dle Národního standardu pro eSSL
		*/
		id_nss?: string|null;
		/**URL SOAP WS
		*      URL SOAP webových služeb rozhraní, které vystavuje externí systém pro komunikaci dle NS
		*/
		url_ws1?: string|null;
		/**URL REST WS
		*      URL pro REST služby pro GET na obsah ele.souboru/komponenty
		*/
		url_ws2?: string|null;
		url_ws3?: string|null;
		/**Typ rozhraní
		*      Příznak, o jaký typ systému se z pohledu NS jedná
		*/
		priz_ess?: number|null;
		/**Typ eSS
		*      Typ externího systému z pohledu dodavatele - každý dodavatel se k národnímu standardu chová po svém a tento typ má upřesnit o jakého dodatavate/ tedy jaké chování se jedná
		*/
		typ_ess?: string|null;
		/**Příznak zakládání cizích účtů k ESU*/
		priz_zal_cu?: number|null;
		/**Verze rozhraní eSS
		*      Určení verze rozhraní podle různých postupně vydávaných specifikací NS - MV ČR
		*/
		verze_ess?: string|null;
		ixs_fun_zodp?: string|null;
		/**Mutace eSS
		*      Upřesňující údaj k verzi rozhraní. Jednotlivé implementace rozhraní mají své specifické mutace.
		*/
		mutace_ess?: string|null;
		priz_pr_ruian?: number|null;
		/**IČO organizace systému
		*      IČO organizace, pro kterou je externí systém napojen
		*/
		ico?: string|null;
		/**ID tohoto GINIS systému dle NS
		*      Zatím ve stavu přípravy - bude obslouženo
		*/
		id_nss_this?: string|null;
		/**Typ agendy GINIS
		*      Typ externí agendy, která je přiřazena k externímu systému.
		*/
		typ_ag_ext?: number|null;
		priz_dis_sync?: number|null;
		priz_des_car?: number|null;
		priz_varov_ch_hash?: number|null;
		/**Prefix pro kód uživatele
		*      Pro napojení podle NS pro GINIS-EKO. Prefix, který je v ránci ginsfun.fc uveden navíc oproti údajům přicházejícím z externí spisové služby
		*/
		id_fun_prefix?: string|null;
		/**Je samostatnou evidencí - listinnou (NSESSS)
		*      Je samostatnou evidencí - listinnou (NSESSS)
		*/
		je_sed_list?: number|null;
	}
	const enum GIntsextDtoNames { ixs_ext = "ixs_ext", nazev = "nazev", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cs_nazev = "cs_nazev", priz_exp_rc = "priz_exp_rc", mail_chyby = "mail_chyby", priz_test_rc = "priz_test_rc", delka_pc = "delka_pc", delka_ver = "delka_ver", priz_ico_rc = "priz_ico_rc", ur_pri = "ur_pri", priz_maz_fud = "priz_maz_fud", priz_akt_esu = "priz_akt_esu", priz_aws = "priz_aws", priz_test_bu = "priz_test_bu", priz_zach_obal = "priz_zach_obal", priz_st_esu = "priz_st_esu", skupina_id_ext = "skupina_id_ext", priz_vazba_esf = "priz_vazba_esf", priz_ign_orjfun = "priz_ign_orjfun", priz_ver_odm = "priz_ver_odm", priz_msm = "priz_msm", priz_no_is = "priz_no_is", priz_xml = "priz_xml", priz_ruc_pre_do_ea = "priz_ruc_pre_do_ea", uef = "uef", id_nss = "id_nss", url_ws1 = "url_ws1", url_ws2 = "url_ws2", url_ws3 = "url_ws3", priz_ess = "priz_ess", typ_ess = "typ_ess", priz_zal_cu = "priz_zal_cu", verze_ess = "verze_ess", ixs_fun_zodp = "ixs_fun_zodp", mutace_ess = "mutace_ess", priz_pr_ruian = "priz_pr_ruian", ico = "ico", id_nss_this = "id_nss_this", typ_ag_ext = "typ_ag_ext", priz_dis_sync = "priz_dis_sync", priz_des_car = "priz_des_car", priz_varov_ch_hash = "priz_varov_ch_hash", id_fun_prefix = "id_fun_prefix", je_sed_list = "je_sed_list",}
	const enum GIntsextDtoFragments { ixs_ext = "*", nazev = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", cs_nazev = "*", priz_exp_rc = "*", mail_chyby = "*", priz_test_rc = "*", delka_pc = "*", delka_ver = "*", priz_ico_rc = "*", ur_pri = "*", priz_maz_fud = "*", priz_akt_esu = "*", priz_aws = "*", priz_test_bu = "*", priz_zach_obal = "*", priz_st_esu = "*", skupina_id_ext = "*", priz_vazba_esf = "*", priz_ign_orjfun = "*", priz_ver_odm = "*", priz_msm = "*", priz_no_is = "*", priz_xml = "*", priz_ruc_pre_do_ea = "*", uef = "*", id_nss = "*", url_ws1 = "*", url_ws2 = "*", url_ws3 = "*", priz_ess = "*", typ_ess = "*", priz_zal_cu = "*", verze_ess = "*", ixs_fun_zodp = "*", mutace_ess = "*", priz_pr_ruian = "*", ico = "*", id_nss_this = "*", typ_ag_ext = "*", priz_dis_sync = "*", priz_des_car = "*", priz_varov_ch_hash = "*", id_fun_prefix = "*", je_sed_list = "*",}
	const enum GIntsextDtoTypes { ixs_ext = "string", nazev = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", cs_nazev = "string", priz_exp_rc = "number", mail_chyby = "string", priz_test_rc = "number", delka_pc = "number", delka_ver = "number", priz_ico_rc = "number", ur_pri = "number", priz_maz_fud = "number", priz_akt_esu = "number", priz_aws = "number", priz_test_bu = "number", priz_zach_obal = "number", priz_st_esu = "number", skupina_id_ext = "number", priz_vazba_esf = "number", priz_ign_orjfun = "number", priz_ver_odm = "number", priz_msm = "number", priz_no_is = "number", priz_xml = "number", priz_ruc_pre_do_ea = "number", uef = "string", id_nss = "string", url_ws1 = "string", url_ws2 = "string", url_ws3 = "string", priz_ess = "number", typ_ess = "string", priz_zal_cu = "number", verze_ess = "string", ixs_fun_zodp = "string", mutace_ess = "string", priz_pr_ruian = "number", ico = "string", id_nss_this = "string", typ_ag_ext = "number", priz_dis_sync = "number", priz_des_car = "number", priz_varov_ch_hash = "number", id_fun_prefix = "string", je_sed_list = "number",}
	const enum GIntsextDtoTypeLengths { ixs_ext = 12, nazev = 50, poznamka = 50, zmenu_prov = 12, cs_nazev = 50, mail_chyby = 254, uef = 3, id_nss = 200, url_ws1 = 254, url_ws2 = 254, url_ws3 = 254, typ_ess = 20, verze_ess = 50, ixs_fun_zodp = 12, mutace_ess = 50, ico = 10, id_nss_this = 200, id_fun_prefix = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Int\GIntvatyDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:intvaty
	*      Povolení pro avizace
	*/
	interface GIntvatyDto {
		/**Externí systém*/
		ixs_ext?: string|null;
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GIntvatyDtoNames { ixs_ext = "ixs_ext", ixs_typ = "ixs_typ", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GIntvatyDtoFragments { ixs_ext = "*", ixs_typ = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GIntvatyDtoTypes { ixs_ext = "string", ixs_typ = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GIntvatyDtoTypeLengths { ixs_ext = 12, ixs_typ = 12, poznamka = 254, zmenu_prov = 12,}
	/**Rozšířená verze Typy pro rozhraní*/
	interface GIntvatyExtDto extends Gordic.Adm.Interface.GRssvtypDto {
		/**nazev pisemnosti*/
		nazev?: string|null;
		/**aktivita_txt*/
		aktivita_txt?: string|null;
	}
	const enum GIntvatyExtDtoNames { nazev = "nazev", aktivita_txt = "aktivita_txt", ixs_ext = "ixs_ext", ixs_typ = "ixs_typ", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GIntvatyExtDtoFragments { nazev = "*", aktivita_txt = "*", ixs_ext = "*", ixs_typ = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GIntvatyExtDtoTypes { nazev = "string", aktivita_txt = "string", ixs_ext = "string", ixs_typ = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GIntvatyExtDtoTypeLengths { ixs_ext = 12, ixs_typ = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Int\GIntvptyDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:intvpty
	*      Povolení pro předání
	*/
	interface GIntvptyDto {
		/**Externí systém*/
		ixs_ext?: string|null;
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GIntvptyDtoNames { ixs_ext = "ixs_ext", ixs_typ = "ixs_typ", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GIntvptyDtoFragments { ixs_ext = "*", ixs_typ = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GIntvptyDtoTypes { ixs_ext = "string", ixs_typ = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GIntvptyDtoTypeLengths { ixs_ext = 12, ixs_typ = 12, poznamka = 254, zmenu_prov = 12,}
	/**Rozšířená verze Povolení pro předání*/
	interface GIntvptyExtDto extends Gordic.Adm.Interface.GRssvtypDto {
		/**nazev pisemnosti*/
		nazev?: string|null;
		/**aktivita_txt*/
		aktivita_txt?: string|null;
	}
	const enum GIntvptyExtDtoNames { nazev = "nazev", aktivita_txt = "aktivita_txt", ixs_ext = "ixs_ext", ixs_typ = "ixs_typ", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GIntvptyExtDtoFragments { nazev = "*", aktivita_txt = "*", ixs_ext = "*", ixs_typ = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GIntvptyExtDtoTypes { nazev = "string", aktivita_txt = "string", ixs_ext = "string", ixs_typ = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GIntvptyExtDtoTypeLengths { ixs_ext = 12, ixs_typ = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Iszr\GSzrsageDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:szrsage
	*      Agenda ISZR
	*/
	interface GSzrsageDto {
		/**Agenda ISZR
		*      ID přidělené pro agendu ISZR
		*/
		agenda?: string|null;
		/**Název agendy*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Úroveň přístupu ESU
		*      Úroveň přístupu ESU pro subjekty zakládané v rámci této agendy ISZR
		*/
		ur_pri?: number|null;
		priz_agr?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		ag_role_num?: number|null;
		ag_role_status?: string|null;
		cs2_ag_role?: string|null;
		seznam_udaju?: string|null;
		s_prist_rob?: number|null;
		/**Seznam údajů ROS
		*      Seznam údajů ROS
		*/
		seznam_udaju_ros?: string|null;
		/**Seznam údajů pro ISC (cizinci)*/
		seznam_udaju_isc?: string|null;
		/**Seznam údajů pro ISEO (evidence obyvatel)*/
		seznam_udaju_iseo?: string|null;
		/**Seznam údajů EOP
		*      Seznam údajů EOP
		*/
		sezn_udaju_aiseop?: string|null;
	}
	const enum GSzrsageDtoNames { agenda = "agenda", nazev = "nazev", aktivita = "aktivita", poznamka = "poznamka", ixs_lpc = "ixs_lpc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ur_pri = "ur_pri", priz_agr = "priz_agr", dat_od = "dat_od", dat_do = "dat_do", ag_role_num = "ag_role_num", ag_role_status = "ag_role_status", cs2_ag_role = "cs2_ag_role", seznam_udaju = "seznam_udaju", s_prist_rob = "s_prist_rob", seznam_udaju_ros = "seznam_udaju_ros", seznam_udaju_isc = "seznam_udaju_isc", seznam_udaju_iseo = "seznam_udaju_iseo", sezn_udaju_aiseop = "sezn_udaju_aiseop",}
	const enum GSzrsageDtoFragments { agenda = "*", nazev = "*", aktivita = "*", poznamka = "*", ixs_lpc = "*", dat_zmena = "*", zmenu_prov = "*", ur_pri = "*", priz_agr = "*", dat_od = "*", dat_do = "*", ag_role_num = "*", ag_role_status = "*", cs2_ag_role = "*", seznam_udaju = "*", s_prist_rob = "*", seznam_udaju_ros = "*", seznam_udaju_isc = "*", seznam_udaju_iseo = "*", sezn_udaju_aiseop = "*",}
	const enum GSzrsageDtoTypes { agenda = "string", nazev = "string", aktivita = "number", poznamka = "string", ixs_lpc = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ur_pri = "number", priz_agr = "number", dat_od = "JsonDate", dat_do = "JsonDate", ag_role_num = "number", ag_role_status = "string", cs2_ag_role = "string", seznam_udaju = "string", s_prist_rob = "number", seznam_udaju_ros = "string", seznam_udaju_isc = "string", seznam_udaju_iseo = "string", sezn_udaju_aiseop = "string",}
	const enum GSzrsageDtoTypeLengths { agenda = 15, nazev = 254, poznamka = 254, ixs_lpc = 12, zmenu_prov = 12, ag_role_status = 100, cs2_ag_role = 50, seznam_udaju = 300, seznam_udaju_ros = 254, seznam_udaju_isc = 1700, seznam_udaju_iseo = 1700, sezn_udaju_aiseop = 700,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Iszr\GSzrsagrDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:szrsagr
	*      Agendové role agend
	*/
	interface GSzrsagrDto {
		/**Agenda ISZR*/
		agenda?: string|null;
		agendova_role?: string|null;
		/**název osoby*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		seznam_udaju?: string|null;
		seznam_udaju_ros?: string|null;
		/**Seznam údajů pro ISC (cizinci)*/
		seznam_udaju_isc?: string|null;
		/**Seznam údajů pro ISEO (evidence obyvatel)*/
		seznam_udaju_iseo?: string|null;
		/**Seznam údajů EOP
		*      Seznam údajů EOP
		*/
		sezn_udaju_aiseop?: string|null;
	}
	const enum GSzrsagrDtoNames { agenda = "agenda", agendova_role = "agendova_role", nazev = "nazev", aktivita = "aktivita", poznamka = "poznamka", ixs_lpc = "ixs_lpc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", seznam_udaju = "seznam_udaju", seznam_udaju_ros = "seznam_udaju_ros", seznam_udaju_isc = "seznam_udaju_isc", seznam_udaju_iseo = "seznam_udaju_iseo", sezn_udaju_aiseop = "sezn_udaju_aiseop",}
	const enum GSzrsagrDtoFragments { agenda = "*", agendova_role = "*", nazev = "*", aktivita = "*", poznamka = "*", ixs_lpc = "*", dat_zmena = "*", zmenu_prov = "*", seznam_udaju = "*", seznam_udaju_ros = "*", seznam_udaju_isc = "*", seznam_udaju_iseo = "*", sezn_udaju_aiseop = "*",}
	const enum GSzrsagrDtoTypes { agenda = "string", agendova_role = "string", nazev = "string", aktivita = "number", poznamka = "string", ixs_lpc = "string", dat_zmena = "JsonDate", zmenu_prov = "string", seznam_udaju = "string", seznam_udaju_ros = "string", seznam_udaju_isc = "string", seznam_udaju_iseo = "string", sezn_udaju_aiseop = "string",}
	const enum GSzrsagrDtoTypeLengths { agenda = 15, agendova_role = 15, nazev = 254, poznamka = 254, ixs_lpc = 12, zmenu_prov = 12, seznam_udaju = 300, seznam_udaju_ros = 254, seznam_udaju_isc = 1700, seznam_udaju_iseo = 1700, sezn_udaju_aiseop = 700,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Iszr\GSzrsaroDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:szrsaro
	*      Agendová role
	*/
	interface GSzrsaroDto {
		agendova_role?: string|null;
		/**název osoby*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		agenda_num?: number|null;
		agenda_status?: string|null;
		cs2_agenda?: string|null;
		duvod_ucel?: string|null;
		typ_req_isep?: number|null;
	}
	const enum GSzrsaroDtoNames { agendova_role = "agendova_role", nazev = "nazev", aktivita = "aktivita", poznamka = "poznamka", ixs_lpc = "ixs_lpc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_od = "dat_od", dat_do = "dat_do", agenda_num = "agenda_num", agenda_status = "agenda_status", cs2_agenda = "cs2_agenda", duvod_ucel = "duvod_ucel", typ_req_isep = "typ_req_isep",}
	const enum GSzrsaroDtoFragments { agendova_role = "*", nazev = "*", aktivita = "*", poznamka = "*", ixs_lpc = "*", dat_zmena = "*", zmenu_prov = "*", dat_od = "*", dat_do = "*", agenda_num = "*", agenda_status = "*", cs2_agenda = "*", duvod_ucel = "*", typ_req_isep = "*",}
	const enum GSzrsaroDtoTypes { agendova_role = "string", nazev = "string", aktivita = "number", poznamka = "string", ixs_lpc = "string", dat_zmena = "JsonDate", zmenu_prov = "string", dat_od = "JsonDate", dat_do = "JsonDate", agenda_num = "number", agenda_status = "string", cs2_agenda = "string", duvod_ucel = "string", typ_req_isep = "number",}
	const enum GSzrsaroDtoTypeLengths { agendova_role = 15, nazev = 254, poznamka = 254, ixs_lpc = 12, zmenu_prov = 12, agenda_status = 100, cs2_agenda = 50, duvod_ucel = 255,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Iszr\GSzrsisuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:szrsisu
	*      ISZR interní subjekt
	*/
	interface GSzrsisuDto {
		/**Interní subjekt*/
		ixs_isu?: string|null;
		ais?: number|null;
		ovm?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Certifikát*/
		ixs_cer?: string|null;
		subjekt?: string|null;
		typ_ovm_aisc?: string|null;
		/**ISEP-Certifikát*/
		ixs_cer_isep?: string|null;
		/**ldb*/
		ldb_crv?: string|null;
		/**pdb*/
		pdb_crv?: string|null;
		/**ixs_cer_cli*/
		ixs_cer_crv_cli?: string|null;
		/**ixs_cer_srv*/
		ixs_cer_crv_srv?: string|null;
		/**kod_pracoviste*/
		kod_pracoviste_crv?: string|null;
		duvod_crv?: string|null;
		/**Kód ORP*/
		kod_orp_crv?: string|null;
	}
	const enum GSzrsisuDtoNames { ixs_isu = "ixs_isu", ais = "ais", ovm = "ovm", aktivita = "aktivita", ixs_lpc = "ixs_lpc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_cer = "ixs_cer", subjekt = "subjekt", typ_ovm_aisc = "typ_ovm_aisc", ixs_cer_isep = "ixs_cer_isep", ldb_crv = "ldb_crv", pdb_crv = "pdb_crv", ixs_cer_crv_cli = "ixs_cer_crv_cli", ixs_cer_crv_srv = "ixs_cer_crv_srv", kod_pracoviste_crv = "kod_pracoviste_crv", duvod_crv = "duvod_crv", kod_orp_crv = "kod_orp_crv",}
	const enum GSzrsisuDtoFragments { ixs_isu = "*", ais = "*", ovm = "*", aktivita = "*", ixs_lpc = "*", dat_zmena = "*", zmenu_prov = "*", ixs_cer = "*", subjekt = "*", typ_ovm_aisc = "*", ixs_cer_isep = "*", ldb_crv = "*", pdb_crv = "*", ixs_cer_crv_cli = "*", ixs_cer_crv_srv = "*", kod_pracoviste_crv = "*", duvod_crv = "*", kod_orp_crv = "*",}
	const enum GSzrsisuDtoTypes { ixs_isu = "string", ais = "number", ovm = "string", aktivita = "number", ixs_lpc = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_cer = "string", subjekt = "string", typ_ovm_aisc = "string", ixs_cer_isep = "string", ldb_crv = "string", pdb_crv = "string", ixs_cer_crv_cli = "string", ixs_cer_crv_srv = "string", kod_pracoviste_crv = "string", duvod_crv = "string", kod_orp_crv = "string",}
	const enum GSzrsisuDtoTypeLengths { ixs_isu = 12, ovm = 36, ixs_lpc = 12, zmenu_prov = 12, ixs_cer = 12, subjekt = 65, typ_ovm_aisc = 10, ixs_cer_isep = 12, ldb_crv = 100, pdb_crv = 100, ixs_cer_crv_cli = 12, ixs_cer_crv_srv = 12, kod_pracoviste_crv = 100, duvod_crv = 255, kod_orp_crv = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Iszr\GSzrsprfDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:szrsprf
	*      Právní forma dle SZR
	*/
	interface GSzrsprfDto {
		kod_pravni_formy?: number|null;
		nazev_prav_formy?: string|null;
		cas_odpovedi?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Typ organizace*/
		typ_org?: number|null;
	}
	const enum GSzrsprfDtoNames { kod_pravni_formy = "kod_pravni_formy", nazev_prav_formy = "nazev_prav_formy", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_org = "typ_org",}
	const enum GSzrsprfDtoFragments { kod_pravni_formy = "*", nazev_prav_formy = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_org = "*",}
	const enum GSzrsprfDtoTypes { kod_pravni_formy = "number", nazev_prav_formy = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_org = "number",}
	const enum GSzrsprfDtoTypeLengths { nazev_prav_formy = 240, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Iszr\GSzrvagsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:szrvags
	*      Vazba střediska a agendy SZR
	*/
	interface GSzrvagsDto {
		/**Středisko spisových uzlů*/
		ixs_tre?: string|null;
		/**Agenda ISZR*/
		agenda?: string|null;
		/**Úroveň přístupu ESU*/
		ur_pri?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSzrvagsDtoNames { ixs_tre = "ixs_tre", agenda = "agenda", ur_pri = "ur_pri", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSzrvagsDtoFragments { ixs_tre = "*", agenda = "*", ur_pri = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSzrvagsDtoTypes { ixs_tre = "string", agenda = "string", ur_pri = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSzrvagsDtoTypeLengths { ixs_tre = 12, agenda = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Iszr\GSzrvaroDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:szrvaro
	*      Agendy funkce
	*/
	interface GSzrvaroDto {
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Agenda ISZR*/
		agenda?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		priz_agr?: number|null;
		s_prist_aiseo?: number|null;
		s_prist_isep?: number|null;
		s_prist_aisc?: number|null;
		/**Přístup do EOP
		*      Přístup do EOP
		*/
		s_prist_aiseop?: number|null;
	}
	const enum GSzrvaroDtoNames { ixs_fun = "ixs_fun", agenda = "agenda", aktivita = "aktivita", ixs_lpc = "ixs_lpc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_agr = "priz_agr", s_prist_aiseo = "s_prist_aiseo", s_prist_isep = "s_prist_isep", s_prist_aisc = "s_prist_aisc", s_prist_aiseop = "s_prist_aiseop",}
	const enum GSzrvaroDtoFragments { ixs_fun = "*", agenda = "*", aktivita = "*", ixs_lpc = "*", dat_zmena = "*", zmenu_prov = "*", priz_agr = "*", s_prist_aiseo = "*", s_prist_isep = "*", s_prist_aisc = "*", s_prist_aiseop = "*",}
	const enum GSzrvaroDtoTypes { ixs_fun = "string", agenda = "string", aktivita = "number", ixs_lpc = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_agr = "number", s_prist_aiseo = "number", s_prist_isep = "number", s_prist_aisc = "number", s_prist_aiseop = "number",}
	const enum GSzrvaroDtoTypeLengths { ixs_fun = 12, agenda = 15, ixs_lpc = 12, zmenu_prov = 12,}
	interface GSzrvaroExtDto extends Gordic.Adm.Interface.GSzrvaroDto {
		/**Textová reprezentace agendy*/
		agenda_txt?: string|null;
		/**Počet dostupných rolí*/
		pocet_role?: number|null;
	}
	const enum GSzrvaroExtDtoNames { agenda_txt = "agenda_txt", pocet_role = "pocet_role", ixs_fun = "ixs_fun", agenda = "agenda", aktivita = "aktivita", ixs_lpc = "ixs_lpc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_agr = "priz_agr", s_prist_aiseo = "s_prist_aiseo", s_prist_isep = "s_prist_isep", s_prist_aisc = "s_prist_aisc", s_prist_aiseop = "s_prist_aiseop",}
	const enum GSzrvaroExtDtoFragments { agenda_txt = "*", pocet_role = "*", ixs_fun = "*", agenda = "*", aktivita = "*", ixs_lpc = "*", dat_zmena = "*", zmenu_prov = "*", priz_agr = "*", s_prist_aiseo = "*", s_prist_isep = "*", s_prist_aisc = "*", s_prist_aiseop = "*",}
	const enum GSzrvaroExtDtoTypes { agenda_txt = "string", pocet_role = "number", ixs_fun = "string", agenda = "string", aktivita = "number", ixs_lpc = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_agr = "number", s_prist_aiseo = "number", s_prist_isep = "number", s_prist_aisc = "number", s_prist_aiseop = "number",}
	const enum GSzrvaroExtDtoTypeLengths { ixs_fun = 12, agenda = 15, ixs_lpc = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Iszr\GSzrvfarDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:szrvfar
	*      Agendové role funkce
	*/
	interface GSzrvfarDto {
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Agenda ISZR*/
		agenda?: string|null;
		agendova_role?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSzrvfarDtoNames { ixs_fun = "ixs_fun", agenda = "agenda", agendova_role = "agendova_role", aktivita = "aktivita", ixs_lpc = "ixs_lpc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSzrvfarDtoFragments { ixs_fun = "*", agenda = "*", agendova_role = "*", aktivita = "*", ixs_lpc = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSzrvfarDtoTypes { ixs_fun = "string", agenda = "string", agendova_role = "string", aktivita = "number", ixs_lpc = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSzrvfarDtoTypeLengths { ixs_fun = 12, agenda = 15, agendova_role = 15, ixs_lpc = 12, zmenu_prov = 12,}
	interface GSzrvfarExtDto extends Gordic.Adm.Interface.GSzrvfarDto {
		/**Textová reprezentace agendy*/
		agenda_txt?: string|null;
		/**Textová reprezentace agendy*/
		agendova_role_txt?: string|null;
	}
	const enum GSzrvfarExtDtoNames { agenda_txt = "agenda_txt", agendova_role_txt = "agendova_role_txt", ixs_fun = "ixs_fun", agenda = "agenda", agendova_role = "agendova_role", aktivita = "aktivita", ixs_lpc = "ixs_lpc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSzrvfarExtDtoFragments { agenda_txt = "*", agendova_role_txt = "*", ixs_fun = "*", agenda = "*", agendova_role = "*", aktivita = "*", ixs_lpc = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSzrvfarExtDtoTypes { agenda_txt = "string", agendova_role_txt = "string", ixs_fun = "string", agenda = "string", agendova_role = "string", aktivita = "number", ixs_lpc = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSzrvfarExtDtoTypeLengths { ixs_fun = 12, agenda = 15, agendova_role = 15, ixs_lpc = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Rak\GRakcdenDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:rakcden
	*      Typ deníků
	*/
	interface GRakcdenDto {
		/**Typy deníků*/
		typ_dk?: number|null;
		/**název*/
		typ_dk_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
	}
	const enum GRakcdenDtoNames { typ_dk = "typ_dk", typ_dk_txt = "typ_dk_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GRakcdenDtoFragments { typ_dk = "*", typ_dk_txt = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GRakcdenDtoTypes { typ_dk = "number", typ_dk_txt = "string", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GRakcdenDtoTypeLengths { typ_dk_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Rak\GRaksdenDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:raksden
	*      Deník autorizovaných konverzí
	*/
	interface GRaksdenDto {
		/**Identifikátor knihy*/
		ixp_den?: string|null;
		/**Název deníku*/
		nazev?: string|null;
		/**Zkratka deníku*/
		zkratka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktuální (naposledy přidělené) pořadové číslo*/
		por_cislo_max?: number|null;
		/**Nejvyšší hodnota pořadového čísla.*/
		por_cislo_do?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Typ deníku - viz detail*/
		typ_dk?: number|null;
		/**IČO*/
		ico?: string|null;
	}
	const enum GRaksdenDtoNames { ixp_den = "ixp_den", nazev = "nazev", zkratka = "zkratka", dat_od = "dat_od", dat_do = "dat_do", por_cislo_max = "por_cislo_max", por_cislo_do = "por_cislo_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dk = "typ_dk", ico = "ico",}
	const enum GRaksdenDtoFragments { ixp_den = "*", nazev = "*", zkratka = "*", dat_od = "*", dat_do = "*", por_cislo_max = "*", por_cislo_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_dk = "*", ico = "*",}
	const enum GRaksdenDtoTypes { ixp_den = "string", nazev = "string", zkratka = "string", dat_od = "JsonDate", dat_do = "JsonDate", por_cislo_max = "number", por_cislo_do = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dk = "number", ico = "string",}
	const enum GRaksdenDtoTypeLengths { ixp_den = 12, nazev = 50, zkratka = 16, poznamka = 254, zmenu_prov = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Rak\GRakvdenDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:rakvden
	*      Přístup fun. místa k deníku autorizovaných konverzí
	*/
	interface GRakvdenDto {
		/**Identifikátor knihy*/
		ixp_den?: string|null;
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRakvdenDtoNames { ixp_den = "ixp_den", ixs_fun = "ixs_fun", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRakvdenDtoFragments { ixp_den = "*", ixs_fun = "*", dat_od = "*", dat_do = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GRakvdenDtoTypes { ixp_den = "string", ixs_fun = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRakvdenDtoTypeLengths { ixp_den = 12, ixs_fun = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Rss\GRssvtypDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:rssvtyp
	*      Typy pro rozhraní
	*/
	interface GRssvtypDto {
		/**Externí systém*/
		ixs_ext?: string|null;
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GRssvtypDtoNames { ixs_ext = "ixs_ext", ixs_typ = "ixs_typ", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRssvtypDtoFragments { ixs_ext = "*", ixs_typ = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GRssvtypDtoTypes { ixs_ext = "string", ixs_typ = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRssvtypDtoTypeLengths { ixs_ext = 12, ixs_typ = 12, zmenu_prov = 12,}
	/**Rozšířená verze Typy pro rozhraní*/
	interface GRssvtypExtDto extends Gordic.Adm.Interface.GRssvtypDto {
		/**nazev*/
		nazev?: string|null;
		/**aktivita_txt*/
		aktivita_txt?: string|null;
	}
	const enum GRssvtypExtDtoNames { nazev = "nazev", aktivita_txt = "aktivita_txt", ixs_ext = "ixs_ext", ixs_typ = "ixs_typ", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GRssvtypExtDtoFragments { nazev = "*", aktivita_txt = "*", ixs_ext = "*", ixs_typ = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GRssvtypExtDtoTypes { nazev = "string", aktivita_txt = "string", ixs_ext = "string", ixs_typ = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GRssvtypExtDtoTypeLengths { ixs_ext = 12, ixs_typ = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Spi\GSpisspiDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:spisspi
	*      Spisovna
	*/
	interface GSpisspiDto {
		/**Spisovna*/
		ixs_spi?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Spisový uzel
		*      Spisový uzel, ke kterému spisovna přísluší
		*/
		ixs_su?: string|null;
		/**Typ spisovny*/
		typ_spi?: number|null;
		/**Název spisony
		*      Název spisony
		*/
		nazev?: string|null;
		/**Poznámka
		*      Poznámka
		*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**Změnil
		*      Změn
		*/
		zmenu_prov?: string|null;
		/**Fomát čísla balíku
		*      Fomát čísla balíku
		*/
		format_zn_zup?: string|null;
		/**Fomát čísla výpůjčních lístků 
		*      Fomát čísla výpůjčních lístků
		*/
		format_zn_vyl?: string|null;
		/**Interní subjekt
		*      Interní subjekt, ke kterému spisovna přísluší
		*/
		ixs_isu?: string|null;
	}
	const enum GSpisspiDtoNames { ixs_spi = "ixs_spi", zkratka = "zkratka", ixs_su = "ixs_su", typ_spi = "typ_spi", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", format_zn_zup = "format_zn_zup", format_zn_vyl = "format_zn_vyl", ixs_isu = "ixs_isu",}
	const enum GSpisspiDtoFragments { ixs_spi = "*", zkratka = "*", ixs_su = "*", typ_spi = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", format_zn_zup = "*", format_zn_vyl = "*", ixs_isu = "*",}
	const enum GSpisspiDtoTypes { ixs_spi = "string", zkratka = "string", ixs_su = "string", typ_spi = "number", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", format_zn_zup = "string", format_zn_vyl = "string", ixs_isu = "string",}
	const enum GSpisspiDtoTypeLengths { ixs_spi = 12, zkratka = 5, ixs_su = 12, nazev = 50, poznamka = 50, zmenu_prov = 12, format_zn_zup = 60, format_zn_vyl = 60, ixs_isu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Spi\GSpivktgDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:spivktg
	*      Kategorie dokumentů spisovny
	*/
	interface GSpivktgDto {
		/**Spisovna*/
		ixs_spi?: string|null;
		/**Kategorie typu dokumentu*/
		ktg_typ?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GSpivktgDtoNames { ixs_spi = "ixs_spi", ktg_typ = "ktg_typ", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSpivktgDtoFragments { ixs_spi = "*", ktg_typ = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSpivktgDtoTypes { ixs_spi = "string", ktg_typ = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSpivktgDtoTypeLengths { ixs_spi = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Spi\GSpivmisDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:spivmis
	*      Místnost spisovny
	*/
	interface GSpivmisDto {
		/**Spisovna*/
		ixs_spi?: string|null;
		/**IČO*/
		ico?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy*/
		segment_kod?: string|null;
		/**Místnost*/
		mistnost_kod?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSpivmisDtoNames { ixs_spi = "ixs_spi", ico = "ico", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSpivmisDtoFragments { ixs_spi = "*", ico = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSpivmisDtoTypes { ixs_spi = "string", ico = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSpivmisDtoTypeLengths { ixs_spi = 12, ico = 10, budova_kod = 8, segment_kod = 8, mistnost_kod = 8, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Spi\GSpivspiDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:spivspi
	*      Fukce spisovny
	*/
	interface GSpivspiDto {
		/**Spisovna
		*      Spisovna v rámci které může funkční místo pracovat
		*/
		ixs_spi?: string|null;
		/**Funkční místo
		*      Funkční místo, které může pracovat se spisovnou
		*/
		ixs_fun?: string|null;
		/**Aktivita
		*      Aktivita vazby
		*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSpivspiDtoNames { ixs_spi = "ixs_spi", ixs_fun = "ixs_fun", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSpivspiDtoFragments { ixs_spi = "*", ixs_fun = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSpivspiDtoTypes { ixs_spi = "string", ixs_fun = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSpivspiDtoTypeLengths { ixs_spi = 12, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslcpcoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslcpco*/
	interface GSslcpcoDto {
		/**DBCOLUMN:sslcpco.priz_cj_only*/
		priz_cj_only?: number|null;
		/**DBCOLUMN:sslcpco.priz_cj_only_txt*/
		priz_cj_only_txt?: string|null;
		/**DBCOLUMN:sslcpco.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslcpco.k_s*/
		k_s?: string|null;
	}
	const enum GSslcpcoDtoNames { priz_cj_only = "priz_cj_only", priz_cj_only_txt = "priz_cj_only_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcpcoDtoFragments { priz_cj_only = "*", priz_cj_only_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcpcoDtoTypes { priz_cj_only = "number", priz_cj_only_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslcpcoDtoTypeLengths { priz_cj_only_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslcpdcDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslcpdc*/
	interface GSslcpdcDto {
		/**DBCOLUMN:sslcpdc.priz_den_cj*/
		priz_den_cj?: number|null;
		/**DBCOLUMN:sslcpdc.priz_den_cj_txt*/
		priz_den_cj_txt?: string|null;
		/**DBCOLUMN:sslcpdc.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslcpdc.k_s*/
		k_s?: string|null;
	}
	const enum GSslcpdcDtoNames { priz_den_cj = "priz_den_cj", priz_den_cj_txt = "priz_den_cj_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcpdcDtoFragments { priz_den_cj = "*", priz_den_cj_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcpdcDtoTypes { priz_den_cj = "number", priz_den_cj_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslcpdcDtoTypeLengths { priz_den_cj_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslcpuzDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslcpuz*/
	interface GSslcpuzDto {
		/**DBCOLUMN:sslcpuz.priz_uzav*/
		priz_uzav?: number|null;
		/**DBCOLUMN:sslcpuz.priz_uzav_txt*/
		priz_uzav_txt?: string|null;
		/**DBCOLUMN:sslcpuz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslcpuz.k_s*/
		k_s?: string|null;
	}
	const enum GSslcpuzDtoNames { priz_uzav = "priz_uzav", priz_uzav_txt = "priz_uzav_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslcpuzDtoFragments { priz_uzav = "*", priz_uzav_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslcpuzDtoTypes { priz_uzav = "number", priz_uzav_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslcpuzDtoTypeLengths { priz_uzav_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslcstuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslcstu
	*      Stav uzavření
	*/
	interface GSslcstuDto {
		/**Stav uzavření
		*      Stav uzavření roku deníku
		*/
		stav_uzav?: number|null;
		/**popis*/
		stav_uzav_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		stav_uzav_rsx?: number|null;
	}
	const enum GSslcstuDtoNames { stav_uzav = "stav_uzav", stav_uzav_txt = "stav_uzav_txt", k_v = "k_v", k_s = "k_s", stav_uzav_rsx = "stav_uzav_rsx",}
	const enum GSslcstuDtoFragments { stav_uzav = "*", stav_uzav_txt = "*", k_v = "*", k_s = "*", stav_uzav_rsx = "*",}
	const enum GSslcstuDtoTypes { stav_uzav = "number", stav_uzav_txt = "string", k_v = "number", k_s = "string", stav_uzav_rsx = "number",}
	const enum GSslcstuDtoTypeLengths { stav_uzav_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslctydDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslctyd*/
	interface GSslctydDto {
		/**DBCOLUMN:sslctyd.typ_den*/
		typ_den?: number|null;
		/**DBCOLUMN:sslctyd.typ_den_txt*/
		typ_den_txt?: string|null;
		/**DBCOLUMN:sslctyd.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslctyd.k_s*/
		k_s?: string|null;
	}
	const enum GSslctydDtoNames { typ_den = "typ_den", typ_den_txt = "typ_den_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslctydDtoFragments { typ_den = "*", typ_den_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslctydDtoTypes { typ_den = "number", typ_den_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslctydDtoTypeLengths { typ_den_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslczpcDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslczpc*/
	interface GSslczpcDto {
		/**DBCOLUMN:sslczpc.zpus_prid_cj*/
		zpus_prid_cj?: number|null;
		/**DBCOLUMN:sslczpc.zpus_prid_cj_txt*/
		zpus_prid_cj_txt?: string|null;
		/**DBCOLUMN:sslczpc.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:sslczpc.k_s*/
		k_s?: string|null;
	}
	const enum GSslczpcDtoNames { zpus_prid_cj = "zpus_prid_cj", zpus_prid_cj_txt = "zpus_prid_cj_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSslczpcDtoFragments { zpus_prid_cj = "*", zpus_prid_cj_txt = "*", k_v = "*", k_s = "*",}
	const enum GSslczpcDtoTypes { zpus_prid_cj = "number", zpus_prid_cj_txt = "string", k_v = "number", k_s = "string",}
	const enum GSslczpcDtoTypeLengths { zpus_prid_cj_txt = 100, k_s = 15,}
	/**ENUM:sslczpc*/
	const enum GSslczpcEnum {
		/**Při vložení do spisu nepřidělovat ČJ - metodika platná do 2023*/
		_0=0,
		/**Odvozením od období a pořadového čísla v rámci období*/
		_10=10,
		/**Odvozením od spisové značky spisu a pořadí ve spisu*/
		_20=20,
	}
	function GSslczpcEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GSslczpcEnum, Gordic.Adm.Interface.GSslczpcDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslddenDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ssldden
	*      Otevřené roky deníků
	*/
	interface GSslddenDto {
		/**Deník SSL*/
		sslden?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSslddenDtoNames { sslden = "sslden", rok = "rok", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSslddenDtoFragments { sslden = "*", rok = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSslddenDtoTypes { sslden = "string", rok = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSslddenDtoTypeLengths { sslden = 7, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSsldforDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ssldfor
	*      Vlastnosti formuláře
	*/
	interface GSsldforDto {
		ixs_for?: string|null;
		/**Obsah profilu vlastnistí*/
		ixs_pro?: string|null;
		/**Struktura*/
		ixs_stv?: string|null;
		/**Vlastnost*/
		ixs_vla?: string|null;
		vyraz?: string|null;
		priz_expr?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Příznak, zda je vlastnost pro export či import*/
		priz_import?: number|null;
		/**Příznak, zda je vlastnost pro export či import*/
		priz_export?: number|null;
	}
	const enum GSsldforDtoNames { ixs_for = "ixs_for", ixs_pro = "ixs_pro", ixs_stv = "ixs_stv", ixs_vla = "ixs_vla", vyraz = "vyraz", priz_expr = "priz_expr", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_import = "priz_import", priz_export = "priz_export",}
	const enum GSsldforDtoFragments { ixs_for = "*", ixs_pro = "*", ixs_stv = "*", ixs_vla = "*", vyraz = "*", priz_expr = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", priz_import = "*", priz_export = "*",}
	const enum GSsldforDtoTypes { ixs_for = "string", ixs_pro = "string", ixs_stv = "string", ixs_vla = "string", vyraz = "string", priz_expr = "number", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_import = "number", priz_export = "number",}
	const enum GSsldforDtoTypeLengths { ixs_for = 12, ixs_pro = 12, ixs_stv = 12, ixs_vla = 12, vyraz = 2000, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSsldtypDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ssldtyp
	*      Přednastavené chování pro IXS podle typů dokumentů
	*/
	interface GSsldtypDto {
		/**Druh dokumentu*/
		ixs_typ?: string|null;
		ixs?: string|null;
		/**Typ subjektu*/
		ix?: string|null;
		/**IRP Úroveň oprávnění*/
		uroven_prist?: number|null;
		/**Důvod přidělení IRP*/
		duvod_txt?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
	}
	const enum GSsldtypDtoNames { ixs_typ = "ixs_typ", ixs = "ixs", ix = "ix", uroven_prist = "uroven_prist", duvod_txt = "duvod_txt", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", dat_od = "dat_od", dat_do = "dat_do",}
	const enum GSsldtypDtoFragments { ixs_typ = "*", ixs = "*", ix = "*", uroven_prist = "*", duvod_txt = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", dat_od = "*", dat_do = "*",}
	const enum GSsldtypDtoTypes { ixs_typ = "string", ixs = "string", ix = "string", uroven_prist = "number", duvod_txt = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", dat_od = "JsonDate", dat_do = "JsonDate",}
	const enum GSsldtypDtoTypeLengths { ixs_typ = 12, ixs = 12, ix = 3, duvod_txt = 254, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslrdcjDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslrdcj
	*      Registr posledních čísel pro subřady
	*/
	interface GSslrdcjDto {
		/**Deník SSL*/
		sslden?: string|null;
		/**Rok deníku*/
		rok?: number|null;
		/**Číslo subřady
		*      Číslo subřady deníku SSL
		*/
		subrada?: number|null;
		/**Počáteční hodnota*/
		por_cislo_od?: number|null;
		/**Max.povolená hodnota*/
		por_cislo_do?: number|null;
		/**Poslední použitá hodnota*/
		por_cislo_max?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Stav uzavření*/
		stav_uzav?: number|null;
		/**Uzamkl
		*      Log_por_cislo uživatele, který zahájil uzavírání deníku. Tedy uzamkl si deník pro svou výhradní potřebu.
		*/
		log_por_cislo_uzav?: number|null;
	}
	const enum GSslrdcjDtoNames { sslden = "sslden", rok = "rok", subrada = "subrada", por_cislo_od = "por_cislo_od", por_cislo_do = "por_cislo_do", por_cislo_max = "por_cislo_max", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav_uzav = "stav_uzav", log_por_cislo_uzav = "log_por_cislo_uzav",}
	const enum GSslrdcjDtoFragments { sslden = "*", rok = "*", subrada = "*", por_cislo_od = "*", por_cislo_do = "*", por_cislo_max = "*", dat_zmena = "*", zmenu_prov = "*", stav_uzav = "*", log_por_cislo_uzav = "*",}
	const enum GSslrdcjDtoTypes { sslden = "string", rok = "number", subrada = "number", por_cislo_od = "number", por_cislo_do = "number", por_cislo_max = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav_uzav = "number", log_por_cislo_uzav = "number",}
	const enum GSslrdcjDtoTypeLengths { sslden = 7, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslscfdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslscfd*/
	interface GSslscfdDto {
		/**DBCOLUMN:sslscfd.lic*/
		lic?: string|null;
		/**DBCOLUMN:sslscfd.spis_graf*/
		spis_graf?: string|null;
		/**DBCOLUMN:sslscfd.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:sslscfd.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslscfd.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:sslscfd.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:sslscfd.spis_graf_v*/
		spis_graf_v?: string|null;
		/**DBCOLUMN:sslscfd.s_vicgraf*/
		s_vicgraf?: number|null;
		/**DBCOLUMN:sslscfd.jeden*/
		jeden?: number|null;
		/**DBCOLUMN:sslscfd.ixs_su_pod*/
		ixs_su_pod?: string|null;
		/**DBCOLUMN:sslscfd.ixs_fun_pod*/
		ixs_fun_pod?: string|null;
		/**DBCOLUMN:sslscfd.ico*/
		ico?: string|null;
		/**DBCOLUMN:sslscfd.subrada_ag*/
		subrada_ag?: number|null;
		/**DBCOLUMN:sslscfd.spis_pl_spis*/
		spis_pl_spis?: string|null;
		/**DBCOLUMN:sslscfd.spis_znak_spis*/
		spis_znak_spis?: string|null;
		/**DBCOLUMN:sslscfd.sslden_spz*/
		sslden_spz?: string|null;
		/**DBCOLUMN:sslscfd.rok_spz*/
		rok_spz?: number|null;
		/**DBCOLUMN:sslscfd.ssl_subrada_spz*/
		ssl_subrada_spz?: number|null;
		/**DBCOLUMN:sslscfd.sslden_cj*/
		sslden_cj?: string|null;
		/**DBCOLUMN:sslscfd.rok_cj*/
		rok_cj?: number|null;
		/**DBCOLUMN:sslscfd.ssl_subrada_cj*/
		ssl_subrada_cj?: number|null;
		/**DBCOLUMN:sslscfd.s_vicden_spz*/
		s_vicden_spz?: number|null;
		/**DBCOLUMN:sslscfd.s_vicden_cj*/
		s_vicden_cj?: number|null;
		/**DBCOLUMN:sslscfd.spis_pl_kopie*/
		spis_pl_kopie?: string|null;
		/**DBCOLUMN:sslscfd.spis_znak_kopie*/
		spis_znak_kopie?: string|null;
	}
	const enum GSslscfdDtoNames { lic = "lic", spis_graf = "spis_graf", spis_pl = "spis_pl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", spis_znak = "spis_znak", spis_graf_v = "spis_graf_v", s_vicgraf = "s_vicgraf", jeden = "jeden", ixs_su_pod = "ixs_su_pod", ixs_fun_pod = "ixs_fun_pod", ico = "ico", subrada_ag = "subrada_ag", spis_pl_spis = "spis_pl_spis", spis_znak_spis = "spis_znak_spis", sslden_spz = "sslden_spz", rok_spz = "rok_spz", ssl_subrada_spz = "ssl_subrada_spz", sslden_cj = "sslden_cj", rok_cj = "rok_cj", ssl_subrada_cj = "ssl_subrada_cj", s_vicden_spz = "s_vicden_spz", s_vicden_cj = "s_vicden_cj", spis_pl_kopie = "spis_pl_kopie", spis_znak_kopie = "spis_znak_kopie",}
	const enum GSslscfdDtoFragments { lic = "*", spis_graf = "*", spis_pl = "*", dat_zmena = "*", zmenu_prov = "*", spis_znak = "*", spis_graf_v = "*", s_vicgraf = "*", jeden = "*", ixs_su_pod = "*", ixs_fun_pod = "*", ico = "*", subrada_ag = "*", spis_pl_spis = "*", spis_znak_spis = "*", sslden_spz = "*", rok_spz = "*", ssl_subrada_spz = "*", sslden_cj = "*", rok_cj = "*", ssl_subrada_cj = "*", s_vicden_spz = "*", s_vicden_cj = "*", spis_pl_kopie = "*", spis_znak_kopie = "*",}
	const enum GSslscfdDtoTypes { lic = "string", spis_graf = "string", spis_pl = "string", dat_zmena = "JsonDate", zmenu_prov = "string", spis_znak = "string", spis_graf_v = "string", s_vicgraf = "number", jeden = "number", ixs_su_pod = "string", ixs_fun_pod = "string", ico = "string", subrada_ag = "number", spis_pl_spis = "string", spis_znak_spis = "string", sslden_spz = "string", rok_spz = "number", ssl_subrada_spz = "number", sslden_cj = "string", rok_cj = "number", ssl_subrada_cj = "number", s_vicden_spz = "number", s_vicden_cj = "number", spis_pl_kopie = "string", spis_znak_kopie = "string",}
	const enum GSslscfdDtoTypeLengths { lic = 4, spis_graf = 10, spis_pl = 5, zmenu_prov = 12, spis_znak = 50, spis_graf_v = 10, ixs_su_pod = 12, ixs_fun_pod = 12, ico = 10, spis_pl_spis = 5, spis_znak_spis = 50, sslden_spz = 7, sslden_cj = 7, spis_pl_kopie = 5, spis_znak_kopie = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslsdenDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslsden
	*      Deník SSL
	*/
	interface GSslsdenDto {
		/**Deník SSL
		*      Označení deníku
		*/
		sslden?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**minimální priorita pro přístup*/
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název deníku*/
		nazev?: string|null;
		/**Formát čísla dokumentu*/
		format_cj?: string|null;
		/**Typ číselné řady*/
		typ_den?: number|null;
		/**Nevím*/
		priz_ext_den?: number|null;
		/**Stav uzávěreky
		*      Stav uzávěreky - neadministruje se. Nastavuje se v rámci procesu uzávěrky.
		*/
		krok_uza?: number|null;
		/**Formát značky vklad.dok.*/
		format_cj_pis?: string|null;
		/**Formát přívěšku čísla spisu*/
		format_cj_ext?: string|null;
		/**Vlastnost1*/
		sslden1?: string|null;
		/**Vlastnost2*/
		sslden2?: string|null;
		/**Vlastnost3*/
		sslden3?: string|null;
		/**Aktuální rok*/
		rok_akt?: number|null;
		/**Řídit stupně utajení 
		*      Příznak, že deník je určen pro evidování dokumentů s řízeným stupněm přístupů.
		*/
		priz_stu?: number|null;
		/**Určení deníku*/
		priz_den_cj?: number|null;
		/**Formát čísla spisu*/
		format_spz?: string|null;
		/**Uzávěrky*/
		priz_uzav?: number|null;
		/**Vlastnost4*/
		sslden4?: string|null;
		/**Účel*/
		priz_den_ts?: number|null;
		/**Spisový plán*/
		spis_pl?: string|null;
		/**Spisový znak*/
		spis_znak?: string|null;
		/**IČO
		*      IČO interního subjektu, který je vlastníkem deníku
		*/
		ico?: string|null;
		/**Označení
		*      Pro uživatele identifikce deníku
		*/
		zkratka?: string|null;
		/**Režim nakládání*/
		rezim_nakl?: number|null;
	}
	const enum GSslsdenDtoNames { sslden = "sslden", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", format_cj = "format_cj", typ_den = "typ_den", priz_ext_den = "priz_ext_den", krok_uza = "krok_uza", format_cj_pis = "format_cj_pis", format_cj_ext = "format_cj_ext", sslden1 = "sslden1", sslden2 = "sslden2", sslden3 = "sslden3", rok_akt = "rok_akt", priz_stu = "priz_stu", priz_den_cj = "priz_den_cj", format_spz = "format_spz", priz_uzav = "priz_uzav", sslden4 = "sslden4", priz_den_ts = "priz_den_ts", spis_pl = "spis_pl", spis_znak = "spis_znak", ico = "ico", zkratka = "zkratka", rezim_nakl = "rezim_nakl",}
	const enum GSslsdenDtoFragments { sslden = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", format_cj = "*", typ_den = "*", priz_ext_den = "*", krok_uza = "*", format_cj_pis = "*", format_cj_ext = "*", sslden1 = "*", sslden2 = "*", sslden3 = "*", rok_akt = "*", priz_stu = "*", priz_den_cj = "*", format_spz = "*", priz_uzav = "*", sslden4 = "*", priz_den_ts = "*", spis_pl = "*", spis_znak = "*", ico = "*", zkratka = "*", rezim_nakl = "*",}
	const enum GSslsdenDtoTypes { sslden = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", format_cj = "string", typ_den = "number", priz_ext_den = "number", krok_uza = "number", format_cj_pis = "string", format_cj_ext = "string", sslden1 = "string", sslden2 = "string", sslden3 = "string", rok_akt = "number", priz_stu = "number", priz_den_cj = "number", format_spz = "string", priz_uzav = "number", sslden4 = "string", priz_den_ts = "number", spis_pl = "string", spis_znak = "string", ico = "string", zkratka = "string", rezim_nakl = "number",}
	const enum GSslsdenDtoTypeLengths { sslden = 7, poznamka = 254, zmenu_prov = 12, nazev = 254, format_cj = 60, format_cj_pis = 60, format_cj_ext = 60, sslden1 = 2, sslden2 = 2, sslden3 = 2, format_spz = 60, sslden4 = 1, spis_pl = 5, spis_znak = 50, ico = 10, zkratka = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslssplDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslsspl
	*      Spisový plán
	*/
	interface GSslssplDto {
		/**Spisový plán
		*      Id spisového plánu. Jedná se o identifikátor v otevřeném tvaru, takže se zobrazuje běžným uživatelům a nelze jej dodatečně editovat.
		*/
		spis_pl?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		arw?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Výčet středisek
		*      Příznak výčtu přiřazených středisek spisových uzlů. Pokud je 0-ne, potom spisový plán platí pro všechna střediska. Pokud je 1-Ano, potom platí pouze pro výčtem uvedená střediska.
		*/
		priz_vycet?: number|null;
		/**Oddělovač
		*      Znaky, které jsou v rámci plně určeného spisového znaku použity jako oddělovače jednotlivých spisových znaků
		*/
		oddelovace?: string|null;
		/**Přírustek
		*      Výchozí inkrement, který se má použít při zakládání nového spisového znaku v rámci nějaké věcné skupiny.
		*/
		prirustek?: number|null;
		/**PREPARED
		*      Bylo myšleno jako příznak, že spisový plán může obsahovat pouze číselné znaky a zadané oddělovače
		*/
		priz_num?: number|null;
		/**PREPARED
		*      Bylo myšleno jaké příznak, že do spisového plánu mohou být zadávány nové znaky volnou editací - opačná možnost je generování na základě přírustku
		*/
		priz_manual?: number|null;
		/**PREPARED
		*      Bylo myšleno jako příznak, že se důsledně mají kontrolovat jednotlivé úrovně a že se nesmí žádná úroveň přeskočit.
		*/
		priz_check_lev?: number|null;
		/**PREPARED*/
		root_level?: number|null;
		/**PREPARED*/
		priz_end_znak?: number|null;
		/**OBSOLETE*/
		ixs_tre?: string|null;
		/**Externí označení
		*      ID použité v externím systému ( např. po importu spisového plánu z externího zdroje )
		*/
		spis_pl_ext?: string|null;
	}
	const enum GSslssplDtoNames { spis_pl = "spis_pl", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", popis = "popis", priz_vycet = "priz_vycet", oddelovace = "oddelovace", prirustek = "prirustek", priz_num = "priz_num", priz_manual = "priz_manual", priz_check_lev = "priz_check_lev", root_level = "root_level", priz_end_znak = "priz_end_znak", ixs_tre = "ixs_tre", spis_pl_ext = "spis_pl_ext",}
	const enum GSslssplDtoFragments { spis_pl = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", popis = "*", priz_vycet = "*", oddelovace = "*", prirustek = "*", priz_num = "*", priz_manual = "*", priz_check_lev = "*", root_level = "*", priz_end_znak = "*", ixs_tre = "*", spis_pl_ext = "*",}
	const enum GSslssplDtoTypes { spis_pl = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", popis = "string", priz_vycet = "number", oddelovace = "string", prirustek = "number", priz_num = "number", priz_manual = "number", priz_check_lev = "number", root_level = "number", priz_end_znak = "number", ixs_tre = "string", spis_pl_ext = "string",}
	const enum GSslssplDtoTypeLengths { spis_pl = 5, lic = 4, poznamka = 50, zmenu_prov = 12, nazev = 50, popis = 254, oddelovace = 20, ixs_tre = 12, spis_pl_ext = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslsspzDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslsspz
	*      Spisový znak
	*/
	interface GSslsspzDto {
		/**Spisový plán*/
		spis_pl?: string|null;
		/**Plně určený spisový znak
		*      Plně určený spisový znak, Jedná se o plně určené označení tzv. věcné skupiny.
		*/
		spis_znak?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**minimální priorita pro přístup*/
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**název spisového znaku*/
		nazev?: string|null;
		/**Skartační znak*/
		skar_znak?: string|null;
		/**Skartační lhůta*/
		skar_lhuta?: number|null;
		/**bližší popis spis. znaku*/
		popis?: string|null;
		/**CS2 spisového znaku
		*      Technologický sloupec který zajišťuje číselní třeídění textového sloupce
		*/
		cs2_spis_znak?: string|null;
		/**Skartační lhůta pro správní archiv*/
		skar_lhuta_spra?: number|null;
		/**Zdědit z nadřízeného spisového znaku
		*      Příznak, že se parametry tohoto spisového znaku mají zdědit z nadřízeného spisového znaku
		*/
		priz_zded?: number|null;
		typ_spis_z?: number|null;
		/**Externí spisový znak
		*      Externí označení spisového znaku
		*/
		spis_znak_ext?: string|null;
		priz_usr?: number|null;
		/**Nadřízený spisový znak
		*      Plně určený nadřízený spisový znak - jedná se o nadřízený znak z pohledu stromové struktury znaků
		*/
		spis_znak_nad?: string|null;
		/**Počet podřízených*/
		num_pod?: number|null;
		/**Normalizovaný spis znak
		*      Pomocný technologický sloupec. Zadané oddělovače všechny nahradí oddělovacím znakem # - tím se umožní jednoznačené čtení jednotlivých úrovní spisového znaku.
		*/
		spis_znak_norm?: string|null;
		/**Přírůstek
		*      Při vytváření nového podřízeného znaku automatickým generováním se použije zde uvedený číselný přírůstek. POkud není zadán, potom se použije číslo 1
		*/
		prirustek?: number|null;
		/**Trvalý skartační souhlas
		*      Příznak trvalého skartačního souhlasu
		*/
		priz_trvskar?: number|null;
		/**Následující plán
		*      Spisový plán a znak, který je určen jako nástupce aktuální spisového znaku
		*/
		spis_pl_nas?: string|null;
		/**Následující spisový znak
		*      Spisový plán a znak, který je určen jako nástupce aktuální spisového znaku
		*/
		spis_znak_nas?: string|null;
		/**Spouštění událost*/
		ixs_spu?: string|null;
		/**ID spisového znaku*/
		ixs_szn?: string|null;
		/**Určení spisového znaku*/
		urceni_spis_z?: number|null;
		priz_poz_skar?: number|null;
		duvod_poz_skar?: string|null;
		ixs_zmp_poz_skar?: string|null;
		dat_poz_skar?: JsonDate|null;
		/**Jednoduchý spisový znak
		*      Jednoduchý spisový znak
		*/
		spis_znak_short?: string|null;
		/**Způsob přiřazení ČJj*/
		zpus_prid_cj?: number|null;
		format_cj_evid?: string|null;
		format_cj_spis?: string|null;
		/**Skartační režimy*/
		ixs_skr?: string|null;
		/**Dokument TSS
		*      PID dokumentu povolující trvalý transakční souhlas pro tento spisový znak
		*/
		ixp_tss?: string|null;
	}
	const enum GSslsspzDtoNames { spis_pl = "spis_pl", spis_znak = "spis_znak", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", popis = "popis", cs2_spis_znak = "cs2_spis_znak", skar_lhuta_spra = "skar_lhuta_spra", priz_zded = "priz_zded", typ_spis_z = "typ_spis_z", spis_znak_ext = "spis_znak_ext", priz_usr = "priz_usr", spis_znak_nad = "spis_znak_nad", num_pod = "num_pod", spis_znak_norm = "spis_znak_norm", prirustek = "prirustek", priz_trvskar = "priz_trvskar", spis_pl_nas = "spis_pl_nas", spis_znak_nas = "spis_znak_nas", ixs_spu = "ixs_spu", ixs_szn = "ixs_szn", urceni_spis_z = "urceni_spis_z", priz_poz_skar = "priz_poz_skar", duvod_poz_skar = "duvod_poz_skar", ixs_zmp_poz_skar = "ixs_zmp_poz_skar", dat_poz_skar = "dat_poz_skar", spis_znak_short = "spis_znak_short", zpus_prid_cj = "zpus_prid_cj", format_cj_evid = "format_cj_evid", format_cj_spis = "format_cj_spis", ixs_skr = "ixs_skr", ixp_tss = "ixp_tss",}
	const enum GSslsspzDtoFragments { spis_pl = "*", spis_znak = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", skar_znak = "*", skar_lhuta = "*", popis = "*", cs2_spis_znak = "*", skar_lhuta_spra = "*", priz_zded = "*", typ_spis_z = "*", spis_znak_ext = "*", priz_usr = "*", spis_znak_nad = "*", num_pod = "*", spis_znak_norm = "*", prirustek = "*", priz_trvskar = "*", spis_pl_nas = "*", spis_znak_nas = "*", ixs_spu = "*", ixs_szn = "*", urceni_spis_z = "*", priz_poz_skar = "*", duvod_poz_skar = "*", ixs_zmp_poz_skar = "*", dat_poz_skar = "*", spis_znak_short = "*", zpus_prid_cj = "*", format_cj_evid = "*", format_cj_spis = "*", ixs_skr = "*", ixp_tss = "*",}
	const enum GSslsspzDtoTypes { spis_pl = "string", spis_znak = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", skar_znak = "string", skar_lhuta = "number", popis = "string", cs2_spis_znak = "string", skar_lhuta_spra = "number", priz_zded = "number", typ_spis_z = "number", spis_znak_ext = "string", priz_usr = "number", spis_znak_nad = "string", num_pod = "number", spis_znak_norm = "string", prirustek = "number", priz_trvskar = "number", spis_pl_nas = "string", spis_znak_nas = "string", ixs_spu = "string", ixs_szn = "string", urceni_spis_z = "number", priz_poz_skar = "number", duvod_poz_skar = "string", ixs_zmp_poz_skar = "string", dat_poz_skar = "JsonDate", spis_znak_short = "string", zpus_prid_cj = "number", format_cj_evid = "string", format_cj_spis = "string", ixs_skr = "string", ixp_tss = "string",}
	const enum GSslsspzDtoTypeLengths { spis_pl = 5, spis_znak = 50, lic = 4, poznamka = 50, zmenu_prov = 12, nazev = 100, skar_znak = 2, popis = 254, cs2_spis_znak = 254, spis_znak_ext = 254, spis_znak_nad = 50, spis_znak_norm = 50, spis_pl_nas = 5, spis_znak_nas = 50, ixs_spu = 12, ixs_szn = 12, duvod_poz_skar = 254, ixs_zmp_poz_skar = 12, spis_znak_short = 50, format_cj_evid = 60, format_cj_spis = 60, ixs_skr = 12, ixp_tss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslstypDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslstyp
	*      Druh dokumentu
	*/
	interface GSslstypDto {
		/**Druh dokumentu
		*      Druh dokumentu
		*/
		ixs_typ?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**minimální priorita pro přístup*/
		arw?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název
		*      Název typu dokumentů%tt
		*/
		nazev?: string|null;
		/**Kategorie
		*      Kategorie typu písemnosti
		*/
		ktg_typ?: number|null;
		/**Popis*/
		popis?: string|null;
		/**Úroveň přístupu
		*      Výchozí stupen utajení/zveřejnění pro nově podávané dokumenty se zadaným typem dokumentu.
		*/
		st_utaj_id?: number|null;
		/**Lhůta pro vyřízení
		*      Lhůta pro vyřízení
		*/
		lhuta_vyr?: number|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Skupina úložišť*/
		ixs_ulz?: string|null;
		/**Aktivita pro eSSL*/
		aktivita_ssl?: number|null;
		/**Výchozí spisový plán*/
		spis_pl?: string|null;
		/**Výchozí spisový znak
		*      Výchozí spisový znak pro podání dokumentů s tímto typem dokumentu.
		*/
		spis_znak?: string|null;
		/**Oficiální název*/
		ofic_nazev?: string|null;
		/**Generovat ČJ
		*      Příznak generovat ČJ
		*/
		s_gen_cj?: number|null;
		/**Výchozí dotčený subjekt
		*      V rámci SSL se tato položka přenese při podání automaticky jako dotčený subjekt dokumentu
		*/
		ixs_esu?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Z interface*/
		z_int?: number|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**Platnost pro střediska
		*      Příznak, zda se typ dokumentu má používat pouze u středisek uvedených výčtem. 0-platí pro všechna střediska.
		*/
		priz_vycet?: number|null;
		/**Účel zpracování*/
		ixs_cin?: string|null;
		poc_dnu_vyp_dor?: number|null;
		/**Opr.typ dokladu*/
		ixs_typ_opr?: string|null;
		/**Schval. proces*/
		priz_rsp?: number|null;
		/**identifikátor interního formuláře pro dokument*/
		ixs_frm_gform?: string|null;
		/**Označeno pro EPK*/
		priz_epk?: number|null;
		/**Předplnění věci*/
		predpl_vec?: string|null;
		/**Typ vazby ESU*/
		typ_vazby?: number|null;
		/**PID šablony*/
		ixp_sablony?: string|null;
		/**identifikátor interního formuláře pro spis*/
		ixs_frm_gform_spi?: string|null;
		/**Duplikáty*/
		priz_dupli?: number|null;
		over_duver?: number|null;
		/**Legislativní důvod*/
		zakon_duvod_gdpr?: string|null;
		/**Dotazovat u dokumentu s IRP na důvod otevření el. obrazu/příloh*/
		s_dotaz_irp?: number|null;
		/**Zveřejnění*/
		plan_zve?: number|null;
		/**Výchozí forma*/
		priz_fyz?: number|null;
		/**Účel zpracování
		*      Je sice NULL, ale v ADM ji vyžaduji jako povinnou
		*/
		ixs_zap?: string|null;
		/**Formulář SK*/
		ixs_fsk?: string|null;
		/**IČO*/
		ico?: string|null;
		id_ext_alt?: string|null;
		/**Skartační režim*/
		ixs_skr?: string|null;
		typ_dok_zaz?: number|null;
	}
	const enum GSslstypDtoNames { ixs_typ = "ixs_typ", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", ktg_typ = "ktg_typ", popis = "popis", st_utaj_id = "st_utaj_id", lhuta_vyr = "lhuta_vyr", zkratka = "zkratka", ixs_ulz = "ixs_ulz", aktivita_ssl = "aktivita_ssl", spis_pl = "spis_pl", spis_znak = "spis_znak", ofic_nazev = "ofic_nazev", s_gen_cj = "s_gen_cj", ixs_esu = "ixs_esu", ixs_lpc = "ixs_lpc", z_int = "z_int", cs_nazev = "cs_nazev", priz_vycet = "priz_vycet", ixs_cin = "ixs_cin", poc_dnu_vyp_dor = "poc_dnu_vyp_dor", ixs_typ_opr = "ixs_typ_opr", priz_rsp = "priz_rsp", ixs_frm_gform = "ixs_frm_gform", priz_epk = "priz_epk", predpl_vec = "predpl_vec", typ_vazby = "typ_vazby", ixp_sablony = "ixp_sablony", ixs_frm_gform_spi = "ixs_frm_gform_spi", priz_dupli = "priz_dupli", over_duver = "over_duver", zakon_duvod_gdpr = "zakon_duvod_gdpr", s_dotaz_irp = "s_dotaz_irp", plan_zve = "plan_zve", priz_fyz = "priz_fyz", ixs_zap = "ixs_zap", ixs_fsk = "ixs_fsk", ico = "ico", id_ext_alt = "id_ext_alt", ixs_skr = "ixs_skr", typ_dok_zaz = "typ_dok_zaz",}
	const enum GSslstypDtoFragments { ixs_typ = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", ktg_typ = "*", popis = "*", st_utaj_id = "*", lhuta_vyr = "*", zkratka = "*", ixs_ulz = "*", aktivita_ssl = "*", spis_pl = "*", spis_znak = "*", ofic_nazev = "*", s_gen_cj = "*", ixs_esu = "*", ixs_lpc = "*", z_int = "*", cs_nazev = "*", priz_vycet = "*", ixs_cin = "*", poc_dnu_vyp_dor = "*", ixs_typ_opr = "*", priz_rsp = "*", ixs_frm_gform = "*", priz_epk = "*", predpl_vec = "*", typ_vazby = "*", ixp_sablony = "*", ixs_frm_gform_spi = "*", priz_dupli = "*", over_duver = "*", zakon_duvod_gdpr = "*", s_dotaz_irp = "*", plan_zve = "*", priz_fyz = "*", ixs_zap = "*", ixs_fsk = "*", ico = "*", id_ext_alt = "*", ixs_skr = "*", typ_dok_zaz = "*",}
	const enum GSslstypDtoTypes { ixs_typ = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", ktg_typ = "number", popis = "string", st_utaj_id = "number", lhuta_vyr = "number", zkratka = "string", ixs_ulz = "string", aktivita_ssl = "number", spis_pl = "string", spis_znak = "string", ofic_nazev = "string", s_gen_cj = "number", ixs_esu = "string", ixs_lpc = "string", z_int = "number", cs_nazev = "string", priz_vycet = "number", ixs_cin = "string", poc_dnu_vyp_dor = "number", ixs_typ_opr = "string", priz_rsp = "number", ixs_frm_gform = "string", priz_epk = "number", predpl_vec = "string", typ_vazby = "number", ixp_sablony = "string", ixs_frm_gform_spi = "string", priz_dupli = "number", over_duver = "number", zakon_duvod_gdpr = "string", s_dotaz_irp = "number", plan_zve = "number", priz_fyz = "number", ixs_zap = "string", ixs_fsk = "string", ico = "string", id_ext_alt = "string", ixs_skr = "string", typ_dok_zaz = "number",}
	const enum GSslstypDtoTypeLengths { ixs_typ = 12, lic = 4, poznamka = 50, zmenu_prov = 12, nazev = 50, popis = 254, zkratka = 16, ixs_ulz = 12, spis_pl = 5, spis_znak = 50, ofic_nazev = 254, ixs_esu = 12, ixs_lpc = 12, cs_nazev = 50, ixs_cin = 12, ixs_typ_opr = 12, ixs_frm_gform = 12, predpl_vec = 100, ixp_sablony = 12, ixs_frm_gform_spi = 12, zakon_duvod_gdpr = 1000, ixs_zap = 12, ixs_fsk = 12, ico = 10, id_ext_alt = 200, ixs_skr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslsumiDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslsumi
	*      Umístění dokumentů pro SU
	*/
	interface GSslsumiDto {
		/**Spisový uzel*/
		ixs_su?: string|null;
		/**Umístění*/
		umisteni?: string|null;
		umisteni_nad?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		umisteni_txt?: string|null;
		priz_oper?: number|null;
		ixs_fun_zodp?: string|null;
	}
	const enum GSslsumiDtoNames { ixs_su = "ixs_su", umisteni = "umisteni", umisteni_nad = "umisteni_nad", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", umisteni_txt = "umisteni_txt", priz_oper = "priz_oper", ixs_fun_zodp = "ixs_fun_zodp",}
	const enum GSslsumiDtoFragments { ixs_su = "*", umisteni = "*", umisteni_nad = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", umisteni_txt = "*", priz_oper = "*", ixs_fun_zodp = "*",}
	const enum GSslsumiDtoTypes { ixs_su = "string", umisteni = "string", umisteni_nad = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", umisteni_txt = "string", priz_oper = "number", ixs_fun_zodp = "string",}
	const enum GSslsumiDtoTypeLengths { ixs_su = 12, umisteni = 20, umisteni_nad = 20, poznamka = 254, zmenu_prov = 12, umisteni_txt = 50, ixs_fun_zodp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslsumpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslsump
	*      Umístění dokumentů
	*/
	interface GSslsumpDto {
		/**Umístění
		*      ID umístění dokumentů
		*/
		umisteni?: string|null;
		/**Nadřízené umístění*/
		umisteni_nad?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		umisteni_txt?: string|null;
		priz_oper?: number|null;
		ixs_fun_zodp?: string|null;
		/**Kód budovy*/
		budova_kod?: string|null;
		/**Segment budovy*/
		segment_kod?: string|null;
		/**Místnost*/
		mistnost_kod?: string|null;
	}
	const enum GSslsumpDtoNames { umisteni = "umisteni", umisteni_nad = "umisteni_nad", aktivita = "aktivita", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", umisteni_txt = "umisteni_txt", priz_oper = "priz_oper", ixs_fun_zodp = "ixs_fun_zodp", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod",}
	const enum GSslsumpDtoFragments { umisteni = "*", umisteni_nad = "*", aktivita = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", umisteni_txt = "*", priz_oper = "*", ixs_fun_zodp = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*",}
	const enum GSslsumpDtoTypes { umisteni = "string", umisteni_nad = "string", aktivita = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", umisteni_txt = "string", priz_oper = "number", ixs_fun_zodp = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string",}
	const enum GSslsumpDtoTypeLengths { umisteni = 20, umisteni_nad = 20, poznamka = 254, zmenu_prov = 12, umisteni_txt = 50, ixs_fun_zodp = 12, budova_kod = 8, segment_kod = 8, mistnost_kod = 8,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslszvsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslszvs
	*      Způsob vyřízení
	*/
	interface GSslszvsDto {
		/**způsoby vyřízení spisu*/
		zp_vyriz?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název
		*      Název způsobu vyřízení
		*/
		zp_vyriz_txt?: string|null;
		/**Pouze pro ČJ
		*      Příznak, že způsob vyřízení je určen pouze pro dokumenty s ČJ
		*/
		priz_cj_only?: number|null;
		/**Výčet středisek
		*      Příznak, že tento způsob vyřízení je určen pro určitá vybraná střediska spisových uzlů. V opačném případě platí pro všechna střediska.
		*/
		priz_vycet?: number|null;
		/**IČO*/
		ico?: string|null;
	}
	const enum GSslszvsDtoNames { zp_vyriz = "zp_vyriz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zp_vyriz_txt = "zp_vyriz_txt", priz_cj_only = "priz_cj_only", priz_vycet = "priz_vycet", ico = "ico",}
	const enum GSslszvsDtoFragments { zp_vyriz = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zp_vyriz_txt = "*", priz_cj_only = "*", priz_vycet = "*", ico = "*",}
	const enum GSslszvsDtoTypes { zp_vyriz = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zp_vyriz_txt = "string", priz_cj_only = "number", priz_vycet = "number", ico = "string",}
	const enum GSslszvsDtoTypeLengths { zp_vyriz = 15, zmenu_prov = 12, zp_vyriz_txt = 50, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslvrfuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslvrfu
	*      Povolené deníky pro funkci
	*/
	interface GSslvrfuDto {
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Deník SSL*/
		sslden?: string|null;
		/**číslo subřady*/
		subrada?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSslvrfuDtoNames { ixs_fun = "ixs_fun", sslden = "sslden", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSslvrfuDtoFragments { ixs_fun = "*", sslden = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSslvrfuDtoTypes { ixs_fun = "string", sslden = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSslvrfuDtoTypeLengths { ixs_fun = 12, sslden = 7, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslvrojDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslvroj
	*      Deníky povolené pro organizační jednotku
	*/
	interface GSslvrojDto {
		/**Organizační jednotka*/
		ixs_orj?: string|null;
		/**Deník SSL*/
		sslden?: string|null;
		/**Číslo subřady*/
		subrada?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSslvrojDtoNames { ixs_orj = "ixs_orj", sslden = "sslden", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSslvrojDtoFragments { ixs_orj = "*", sslden = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSslvrojDtoTypes { ixs_orj = "string", sslden = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSslvrojDtoTypeLengths { ixs_orj = 12, sslden = 7, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslvrstDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslvrst
	*      Deníky povolené pro střediska spisových uzlů
	*/
	interface GSslvrstDto {
		/**Středisko spisových uzlů
		*      Středisko spisových uzlů
		*/
		ixs_tre?: string|null;
		/**Deník SSL
		*      Deník SSL
		*/
		sslden?: string|null;
		/**Subřada
		*      Subřada v rámci deníku SSL - je vždy hodnota 1
		*/
		subrada?: number|null;
		/**Aktivita
		*      Aktivita
		*/
		aktivita?: number|null;
		/**Platnost OD
		*      Platnost OD
		*/
		dat_od?: JsonDate|null;
		/**Platnost DO
		*      Platnost DO
		*/
		dat_do?: JsonDate|null;
		/**Změněno
		*      Změněno
		*/
		dat_zmena?: JsonDate|null;
		/**Změnil
		*      Změnil
		*/
		zmenu_prov?: string|null;
	}
	const enum GSslvrstDtoNames { ixs_tre = "ixs_tre", sslden = "sslden", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSslvrstDtoFragments { ixs_tre = "*", sslden = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSslvrstDtoTypes { ixs_tre = "string", sslden = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSslvrstDtoTypeLengths { ixs_tre = 12, sslden = 7, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslvrsuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslvrsu
	*      Deníky povolené pro spisový uzel
	*/
	interface GSslvrsuDto {
		/**Spisový uzel*/
		ixs_su?: string|null;
		/**Deník SSL*/
		sslden?: string|null;
		/**číslo subřady*/
		subrada?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSslvrsuDtoNames { ixs_su = "ixs_su", sslden = "sslden", subrada = "subrada", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSslvrsuDtoFragments { ixs_su = "*", sslden = "*", subrada = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSslvrsuDtoTypes { ixs_su = "string", sslden = "string", subrada = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSslvrsuDtoTypeLengths { ixs_su = 12, sslden = 7, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslvsplDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslvspl
	*      Spisové plány pro střediska
	*/
	interface GSslvsplDto {
		/**Středisko spisových uzlů*/
		ixs_tre?: string|null;
		/**Spisový plán*/
		spis_pl?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
	}
	const enum GSslvsplDtoNames { ixs_tre = "ixs_tre", spis_pl = "spis_pl", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSslvsplDtoFragments { ixs_tre = "*", spis_pl = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSslvsplDtoTypes { ixs_tre = "string", spis_pl = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSslvsplDtoTypeLengths { ixs_tre = 12, spis_pl = 5, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslvstuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslvstu
	*      Povolené stupně utajení pro deník
	*/
	interface GSslvstuDto {
		/**deník*/
		sslden?: string|null;
		/**Úroveň přístupu*/
		st_utaj_id?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSslvstuDtoNames { sslden = "sslden", st_utaj_id = "st_utaj_id", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSslvstuDtoFragments { sslden = "*", st_utaj_id = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSslvstuDtoTypes { sslden = "string", st_utaj_id = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSslvstuDtoTypeLengths { sslden = 7, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslvtysDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslvtys*/
	interface GSslvtysDto {
		/**DBCOLUMN:sslvtys.ixs_tre*/
		ixs_tre?: string|null;
		/**DBCOLUMN:sslvtys.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:sslvtys.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sslvtys.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sslvtys.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslvtys.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSslvtysDtoNames { ixs_tre = "ixs_tre", ixs_typ = "ixs_typ", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSslvtysDtoFragments { ixs_tre = "*", ixs_typ = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSslvtysDtoTypes { ixs_tre = "string", ixs_typ = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSslvtysDtoTypeLengths { ixs_tre = 12, ixs_typ = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Ssl\GSslvzvsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslvzvs*/
	interface GSslvzvsDto {
		/**DBCOLUMN:sslvzvs.ixs_tre*/
		ixs_tre?: string|null;
		/**DBCOLUMN:sslvzvs.zp_vyriz*/
		zp_vyriz?: string|null;
		/**DBCOLUMN:sslvzvs.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:sslvzvs.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sslvzvs.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslvzvs.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSslvzvsDtoNames { ixs_tre = "ixs_tre", zp_vyriz = "zp_vyriz", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSslvzvsDtoFragments { ixs_tre = "*", zp_vyriz = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GSslvzvsDtoTypes { ixs_tre = "string", zp_vyriz = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSslvzvsDtoTypeLengths { ixs_tre = 12, zp_vyriz = 15, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcdrzDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcdrz
	*      Druh zásilky
	*/
	interface GWflcdrzDto {
		/**Druh zásilky*/
		druh_zas?: number|null;
		/**Název druhu zásilky*/
		druh_zas_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
		/**Zkratka druhu zásilky*/
		druh_zas_zkr?: string|null;
		/**Mezinárodní*/
		priz_zahr?: number|null;
		/**Příznak doporučeně*/
		priz_doruc?: number|null;
		/**Filtr formátů sestav pro obálky*/
		filtr_format?: string|null;
		/**Povolené služby*/
		povol_sl?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		druh_zas_rsx?: number|null;
	}
	const enum GWflcdrzDtoNames { druh_zas = "druh_zas", druh_zas_txt = "druh_zas_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", k_xml = "k_xml", druh_zas_zkr = "druh_zas_zkr", priz_zahr = "priz_zahr", priz_doruc = "priz_doruc", filtr_format = "filtr_format", povol_sl = "povol_sl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", druh_zas_rsx = "druh_zas_rsx",}
	const enum GWflcdrzDtoFragments { druh_zas = "*", druh_zas_txt = "*", k_v = "*", k_s = "*", aktivita = "*", k_xml = "*", druh_zas_zkr = "*", priz_zahr = "*", priz_doruc = "*", filtr_format = "*", povol_sl = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", druh_zas_rsx = "*",}
	const enum GWflcdrzDtoTypes { druh_zas = "number", druh_zas_txt = "string", k_v = "number", k_s = "string", aktivita = "number", k_xml = "string", druh_zas_zkr = "string", priz_zahr = "number", priz_doruc = "number", filtr_format = "string", povol_sl = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", druh_zas_rsx = "number",}
	const enum GWflcdrzDtoTypeLengths { druh_zas_txt = 50, k_s = 15, k_xml = 254, druh_zas_zkr = 5, filtr_format = 50, povol_sl = 100, zmenu_prov = 12, ixs_lpc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcgraDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcgra
	*      Typ spisového grafu
	*/
	interface GWflcgraDto {
		/**typ spis. grafu*/
		typ_gra?: number|null;
		/**název typu spis. grafu*/
		typ_gra_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		typ_gra_rsx?: number|null;
	}
	const enum GWflcgraDtoNames { typ_gra = "typ_gra", typ_gra_txt = "typ_gra_txt", k_v = "k_v", k_s = "k_s", typ_gra_rsx = "typ_gra_rsx",}
	const enum GWflcgraDtoFragments { typ_gra = "*", typ_gra_txt = "*", k_v = "*", k_s = "*", typ_gra_rsx = "*",}
	const enum GWflcgraDtoTypes { typ_gra = "number", typ_gra_txt = "string", k_v = "number", k_s = "string", typ_gra_rsx = "number",}
	const enum GWflcgraDtoTypeLengths { typ_gra_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcktpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcktp
	*      Kategorie typu přílohy
	*/
	interface GWflcktpDto {
		/**Kategorie příloh*/
		ktg_typ_pri?: number|null;
		/**Kategorie příloh*/
		ktg_typ_pri_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Povolení změny aktivity a příznaků archivní platná u záznamů šířených centrálou*/
		priz_zme_ktg?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		ktg_typ_pri_rsx?: number|null;
		/**Platná*/
		priz_plat_ver?: number|null;
		/**Archivní*/
		priz_arch_ver?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**K odeslání
		*      Příznak že má být kategorie nabízena k odeslání priz_odes
		*/
		priz_ode_pri?: number|null;
	}
	const enum GWflcktpDtoNames { ktg_typ_pri = "ktg_typ_pri", ktg_typ_pri_txt = "ktg_typ_pri_txt", k_v = "k_v", k_s = "k_s", priz_zme_ktg = "priz_zme_ktg", aktivita = "aktivita", ktg_typ_pri_rsx = "ktg_typ_pri_rsx", priz_plat_ver = "priz_plat_ver", priz_arch_ver = "priz_arch_ver", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_ode_pri = "priz_ode_pri",}
	const enum GWflcktpDtoFragments { ktg_typ_pri = "*", ktg_typ_pri_txt = "*", k_v = "*", k_s = "*", priz_zme_ktg = "*", aktivita = "*", ktg_typ_pri_rsx = "*", priz_plat_ver = "*", priz_arch_ver = "*", dat_zmena = "*", zmenu_prov = "*", priz_ode_pri = "*",}
	const enum GWflcktpDtoTypes { ktg_typ_pri = "number", ktg_typ_pri_txt = "string", k_v = "number", k_s = "string", priz_zme_ktg = "number", aktivita = "number", ktg_typ_pri_rsx = "number", priz_plat_ver = "number", priz_arch_ver = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_ode_pri = "number",}
	const enum GWflcktpDtoTypeLengths { ktg_typ_pri_txt = 50, k_s = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflckzdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflckzd
	*      wflckzd
	*/
	interface GWflckzdDto {
		ktg_zp_dor?: number|null;
		ktg_zp_dor_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GWflckzdDtoNames { ktg_zp_dor = "ktg_zp_dor", ktg_zp_dor_txt = "ktg_zp_dor_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflckzdDtoFragments { ktg_zp_dor = "*", ktg_zp_dor_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflckzdDtoTypes { ktg_zp_dor = "number", ktg_zp_dor_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflckzdDtoTypeLengths { ktg_zp_dor_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcltvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcltv
	*      Typ elektronicého podpisu z hlediska dlouhodobého ověření
	*/
	interface GWflcltvDto {
		/**Typ podpisu typu LTV*/
		typ_ltv?: number|null;
		typ_ltv_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GWflcltvDtoNames { typ_ltv = "typ_ltv", typ_ltv_txt = "typ_ltv_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcltvDtoFragments { typ_ltv = "*", typ_ltv_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcltvDtoTypes { typ_ltv = "number", typ_ltv_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcltvDtoTypeLengths { typ_ltv_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcozvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcozv*/
	interface GWflcozvDto {
		/**DBCOLUMN:wflcozv.operace*/
		operace?: number|null;
		/**DBCOLUMN:wflcozv.operace_txt*/
		operace_txt?: string|null;
		/**DBCOLUMN:wflcozv.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflcozv.k_s*/
		k_s?: string|null;
	}
	const enum GWflcozvDtoNames { operace = "operace", operace_txt = "operace_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcozvDtoFragments { operace = "*", operace_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcozvDtoTypes { operace = "number", operace_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcozvDtoTypeLengths { operace_txt = 50, k_s = 15,}
	/**ENUM:wflcozv*/
	const enum GWflcozvEnum {
		/**Nové zveřejnění*/
		_0=0,
		/**Přidání přílohy*/
		_10=10,
		/**Odstranění přílohy*/
		_20=20,
		/**Storno zveřejnění*/
		_30=30,
		/**Stažení zveřejnění (z úřední desky)*/
		_40=40,
		/**Oprava zveřejnění*/
		_50=50,
	}
	function GWflcozvEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflcozvEnum, Gordic.Adm.Interface.GWflcozvDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcpkvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcpkv
	*      Příznak kvalifikovaného/zaručeného certifikátu
	*/
	interface GWflcpkvDto {
		/**Příznak kvalifikovaného/zaručeného certifikátu*/
		priz_kvcrt?: number|null;
		priz_kvcrt_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GWflcpkvDtoNames { priz_kvcrt = "priz_kvcrt", priz_kvcrt_txt = "priz_kvcrt_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcpkvDtoFragments { priz_kvcrt = "*", priz_kvcrt_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcpkvDtoTypes { priz_kvcrt = "number", priz_kvcrt_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcpkvDtoTypeLengths { priz_kvcrt_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcposDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcpos
	*      Poštovní služby pro zásilky
	*/
	interface GWflcposDto {
		/**Poštovní služba*/
		post_sluzba?: number|null;
		/**Zkratka služby*/
		post_sluzba_zkr?: string|null;
		/**Název služby*/
		post_sluzba_txt?: string|null;
		/**Poznámka*/
		post_sluzba_poz?: string|null;
		/**Druh doručení*/
		priz_doruc?: number|null;
		/**Filtr fomátů sestav pro obálky*/
		filtr_format?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		ess_xml?: string|null;
	}
	const enum GWflcposDtoNames { post_sluzba = "post_sluzba", post_sluzba_zkr = "post_sluzba_zkr", post_sluzba_txt = "post_sluzba_txt", post_sluzba_poz = "post_sluzba_poz", priz_doruc = "priz_doruc", filtr_format = "filtr_format", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ess_xml = "ess_xml",}
	const enum GWflcposDtoFragments { post_sluzba = "*", post_sluzba_zkr = "*", post_sluzba_txt = "*", post_sluzba_poz = "*", priz_doruc = "*", filtr_format = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ess_xml = "*",}
	const enum GWflcposDtoTypes { post_sluzba = "number", post_sluzba_zkr = "string", post_sluzba_txt = "string", post_sluzba_poz = "string", priz_doruc = "number", filtr_format = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ess_xml = "string",}
	const enum GWflcposDtoTypeLengths { post_sluzba_zkr = 10, post_sluzba_txt = 50, post_sluzba_poz = 50, filtr_format = 50, zmenu_prov = 12, ess_xml = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcpriDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcpri
	*      Příznak entity (dokument/spis)
	*/
	interface GWflcpriDto {
		/**příznak spisu*/
		priz_spis?: number|null;
		/**popis příznaku spisu*/
		priz_spis_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
		priz_spis_rsx?: number|null;
	}
	const enum GWflcpriDtoNames { priz_spis = "priz_spis", priz_spis_txt = "priz_spis_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", priz_spis_rsx = "priz_spis_rsx",}
	const enum GWflcpriDtoFragments { priz_spis = "*", priz_spis_txt = "*", k_v = "*", k_s = "*", k_xml = "*", priz_spis_rsx = "*",}
	const enum GWflcpriDtoTypes { priz_spis = "number", priz_spis_txt = "string", k_v = "number", k_s = "string", k_xml = "string", priz_spis_rsx = "number",}
	const enum GWflcpriDtoTypeLengths { priz_spis_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcprpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcprp
	*      Příznak nepodpis/podpis
	*/
	interface GWflcprpDto {
		/**Příznak nepodpis/podpis*/
		priz_podp?: number|null;
		/**popis*/
		priz_podp_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		priz_podp_rsx?: number|null;
	}
	const enum GWflcprpDtoNames { priz_podp = "priz_podp", priz_podp_txt = "priz_podp_txt", k_v = "k_v", k_s = "k_s", priz_podp_rsx = "priz_podp_rsx",}
	const enum GWflcprpDtoFragments { priz_podp = "*", priz_podp_txt = "*", k_v = "*", k_s = "*", priz_podp_rsx = "*",}
	const enum GWflcprpDtoTypes { priz_podp = "number", priz_podp_txt = "string", k_v = "number", k_s = "string", priz_podp_rsx = "number",}
	const enum GWflcprpDtoTypeLengths { priz_podp_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcptsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcpts
	*      Způsob chování TS v kategoriích podpisů
	*/
	interface GWflcptsDto {
		/**Způsob chování TS v kategoriích podpisů*/
		priz_ts?: number|null;
		priz_ts_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GWflcptsDtoNames { priz_ts = "priz_ts", priz_ts_txt = "priz_ts_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcptsDtoFragments { priz_ts = "*", priz_ts_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcptsDtoTypes { priz_ts = "number", priz_ts_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcptsDtoTypeLengths { priz_ts_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcpvpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcpvp
	*      Pozice obrázku doplněného do PDF při přidání el. podpisu
	*/
	interface GWflcpvpDto {
		/**Pozice obrázku doplněného do PDF při přidání el. podpisu*/
		poz_viz_podp?: number|null;
		poz_viz_podp_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GWflcpvpDtoNames { poz_viz_podp = "poz_viz_podp", poz_viz_podp_txt = "poz_viz_podp_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcpvpDtoFragments { poz_viz_podp = "*", poz_viz_podp_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcpvpDtoTypes { poz_viz_podp = "number", poz_viz_podp_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcpvpDtoTypeLengths { poz_viz_podp_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcsvpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcsvp
	*      Stránka podpisu
	*/
	interface GWflcsvpDto {
		/**Stránka podpisu
		*      Přepínač pro určení stránky na kterou se má umístit elektronický podpis
		*/
		str_viz_podp?: number|null;
		str_viz_podp_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GWflcsvpDtoNames { str_viz_podp = "str_viz_podp", str_viz_podp_txt = "str_viz_podp_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcsvpDtoFragments { str_viz_podp = "*", str_viz_podp_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcsvpDtoTypes { str_viz_podp = "number", str_viz_podp_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcsvpDtoTypeLengths { str_viz_podp_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflctdzDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflctdz
	*      wflctdz
	*/
	interface GWflctdzDto {
		typ_dok_zaz?: number|null;
		typ_dok_zaz_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GWflctdzDtoNames { typ_dok_zaz = "typ_dok_zaz", typ_dok_zaz_txt = "typ_dok_zaz_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflctdzDtoFragments { typ_dok_zaz = "*", typ_dok_zaz_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflctdzDtoTypes { typ_dok_zaz = "number", typ_dok_zaz_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflctdzDtoTypeLengths { typ_dok_zaz_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflctkrDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflctkr
	*      Typy kroků tras
	*/
	interface GWflctkrDto {
		/**Typ kroku trasy*/
		typ_krok?: number|null;
		typ_krok_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		typ_krok_rsx?: number|null;
	}
	const enum GWflctkrDtoNames { typ_krok = "typ_krok", typ_krok_txt = "typ_krok_txt", k_v = "k_v", k_s = "k_s", typ_krok_rsx = "typ_krok_rsx",}
	const enum GWflctkrDtoFragments { typ_krok = "*", typ_krok_txt = "*", k_v = "*", k_s = "*", typ_krok_rsx = "*",}
	const enum GWflctkrDtoTypes { typ_krok = "number", typ_krok_txt = "string", k_v = "number", k_s = "string", typ_krok_rsx = "number",}
	const enum GWflctkrDtoTypeLengths { typ_krok_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflctsuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflctsu
	*      Typy subjektů
	*/
	interface GWflctsuDto {
		/**typ subjektu*/
		typ_subj?: number|null;
		/**název typu subjektu*/
		typ_subj_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Jméno tabulky*/
		tab_name?: string|null;
	}
	const enum GWflctsuDtoNames { typ_subj = "typ_subj", typ_subj_txt = "typ_subj_txt", k_v = "k_v", k_s = "k_s", tab_name = "tab_name",}
	const enum GWflctsuDtoFragments { typ_subj = "*", typ_subj_txt = "*", k_v = "*", k_s = "*", tab_name = "*",}
	const enum GWflctsuDtoTypes { typ_subj = "number", typ_subj_txt = "string", k_v = "number", k_s = "string", tab_name = "string",}
	const enum GWflctsuDtoTypeLengths { typ_subj_txt = 254, k_s = 15, tab_name = 18,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflctvpDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflctvp
	*      wflctvp
	*/
	interface GWflctvpDto {
		typ_viz_podpis?: number|null;
		typ_viz_podpis_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GWflctvpDtoNames { typ_viz_podpis = "typ_viz_podpis", typ_viz_podpis_txt = "typ_viz_podpis_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflctvpDtoFragments { typ_viz_podpis = "*", typ_viz_podpis_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflctvpDtoTypes { typ_viz_podpis = "number", typ_viz_podpis_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflctvpDtoTypeLengths { typ_viz_podpis_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflctypDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflctyp
	*      Typ poznámkového bloku
	*/
	interface GWflctypDto {
		/**Typ poznámkového bloku*/
		typ?: number|null;
		/**název typu subjektu*/
		typ_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GWflctypDtoNames { typ = "typ", typ_txt = "typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflctypDtoFragments { typ = "*", typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflctypDtoTypes { typ = "number", typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflctypDtoTypeLengths { typ_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflcwslDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcwsl
	*      wflcwsl
	*/
	interface GWflcwslDto {
		priz_wsl?: number|null;
		priz_wsl_txt?: string|null;
		/**Váha pro třídění*/
		k_v?: number|null;
		/**Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GWflcwslDtoNames { priz_wsl = "priz_wsl", priz_wsl_txt = "priz_wsl_txt", k_v = "k_v", k_s = "k_s",}
	const enum GWflcwslDtoFragments { priz_wsl = "*", priz_wsl_txt = "*", k_v = "*", k_s = "*",}
	const enum GWflcwslDtoTypes { priz_wsl = "number", priz_wsl_txt = "string", k_v = "number", k_s = "string",}
	const enum GWflcwslDtoTypeLengths { priz_wsl_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflczpdDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflczpd
	*      Způsob doručení
	*/
	interface GWflczpdDto {
		/**Kód způsobu doručení
		*      Způsob doručení/odesláníZpůsob doručení/odeslání
		*/
		zpusob_dor?: number|null;
		/**Název způsobu doručení*/
		zpusob_dor_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Kód pro XML*/
		k_xml?: string|null;
		/**Povolené služby
		*      Plní se seznamem čísel služeb - setříděný a oddělený čárkou. Pokud je prázdno nebo NULL, potom to znamená povoleno vše. Pokud je zadán znak '#' potom to znamená že není povoleno nic.
		*/
		povol_sl?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Enum pro XML rozhraní dle NS*/
		ess_xml?: string|null;
		/**RESX kód
		*      Resx kód pro lokalizaci této hodnoty číselníku
		*/
		zpusob_dor_rsx?: number|null;
		/**Kategorie způsobo doručení či odeslání (wflckzd)*/
		ktg_zp_dor?: number|null;
		/**Příznak zda daný způsob je pro doručení*/
		priz_pro_doruc?: number|null;
		/**Příznak zda daný způsob je pro odeslání*/
		priz_pro_odes?: number|null;
		/**SU e-výpravny pro odeslání na kterou bude předána zásilka automaticky při odeslání*/
		ixs_su_evyp?: string|null;
		/**FUN e-výpravny pro odeslání na kterou bude předána zásilka automaticky při odeslání*/
		ixs_fun_evyp?: string|null;
	}
	const enum GWflczpdDtoNames { zpusob_dor = "zpusob_dor", zpusob_dor_txt = "zpusob_dor_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", k_xml = "k_xml", povol_sl = "povol_sl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_lpc = "ixs_lpc", ess_xml = "ess_xml", zpusob_dor_rsx = "zpusob_dor_rsx", ktg_zp_dor = "ktg_zp_dor", priz_pro_doruc = "priz_pro_doruc", priz_pro_odes = "priz_pro_odes", ixs_su_evyp = "ixs_su_evyp", ixs_fun_evyp = "ixs_fun_evyp",}
	const enum GWflczpdDtoFragments { zpusob_dor = "*", zpusob_dor_txt = "*", k_v = "*", k_s = "*", aktivita = "*", k_xml = "*", povol_sl = "*", dat_zmena = "*", zmenu_prov = "*", ixs_lpc = "*", ess_xml = "*", zpusob_dor_rsx = "*", ktg_zp_dor = "*", priz_pro_doruc = "*", priz_pro_odes = "*", ixs_su_evyp = "*", ixs_fun_evyp = "*",}
	const enum GWflczpdDtoTypes { zpusob_dor = "number", zpusob_dor_txt = "string", k_v = "number", k_s = "string", aktivita = "number", k_xml = "string", povol_sl = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_lpc = "string", ess_xml = "string", zpusob_dor_rsx = "number", ktg_zp_dor = "number", priz_pro_doruc = "number", priz_pro_odes = "number", ixs_su_evyp = "string", ixs_fun_evyp = "string",}
	const enum GWflczpdDtoTypeLengths { zpusob_dor_txt = 50, k_s = 15, k_xml = 254, povol_sl = 100, zmenu_prov = 12, ixs_lpc = 12, ess_xml = 100, ixs_su_evyp = 12, ixs_fun_evyp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflczveDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflczve*/
	interface GWflczveDto {
		/**DBCOLUMN:wflczve.ktg_zve*/
		ktg_zve?: number|null;
		/**DBCOLUMN:wflczve.ktg_zve_txt*/
		ktg_zve_txt?: string|null;
		/**DBCOLUMN:wflczve.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflczve.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:wflczve.k_s*/
		k_s?: string|null;
	}
	const enum GWflczveDtoNames { ktg_zve = "ktg_zve", ktg_zve_txt = "ktg_zve_txt", aktivita = "aktivita", k_v = "k_v", k_s = "k_s",}
	const enum GWflczveDtoFragments { ktg_zve = "*", ktg_zve_txt = "*", aktivita = "*", k_v = "*", k_s = "*",}
	const enum GWflczveDtoTypes { ktg_zve = "number", ktg_zve_txt = "string", aktivita = "number", k_v = "number", k_s = "string",}
	const enum GWflczveDtoTypeLengths { ktg_zve_txt = 50, k_s = 15,}
	/**ENUM:wflczve*/
	const enum GWflczveEnum {
		/**Zásilka pro ISDS*/
		_0=0,
		/**Export souborů*/
		_10=10,
		/**WS*/
		_20=20,
		/**Úřední deska*/
		_30=30,
		/**Interaktivní úřad*/
		_40=40,
		/**Export souborů bez žádosti*/
		_1001=1001,
		/**Úřední deska bez žádosti*/
		_1002=1002,
	}
	function GWflczveEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GWflczveEnum, Gordic.Adm.Interface.GWflczveDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWfldblkDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wfldblk
	*      Obsah poznámkového bloku ADM
	*/
	interface GWfldblkDto {
		/**Poznámkový blok*/
		ixs_blk?: string|null;
		/**Typ subjektu*/
		typ_subj?: number|null;
		/**Sxs subjektu*/
		sxs_subj?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
	}
	const enum GWfldblkDtoNames { ixs_blk = "ixs_blk", typ_subj = "typ_subj", sxs_subj = "sxs_subj", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", aktivita = "aktivita",}
	const enum GWfldblkDtoFragments { ixs_blk = "*", typ_subj = "*", sxs_subj = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", aktivita = "*",}
	const enum GWfldblkDtoTypes { ixs_blk = "string", typ_subj = "number", sxs_subj = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", aktivita = "number",}
	const enum GWfldblkDtoTypeLengths { ixs_blk = 12, sxs_subj = 200, poznamka = 50, zmenu_prov = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWfldcauDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wfldcau*/
	interface GWfldcauDto {
		/**DBCOLUMN:wfldcau.ixs_cau*/
		ixs_cau?: string|null;
		/**DBCOLUMN:wfldcau.typ_souboru_cert*/
		typ_souboru_cert?: string|null;
	}
	const enum GWfldcauDtoNames { ixs_cau = "ixs_cau", typ_souboru_cert = "typ_souboru_cert",}
	const enum GWfldcauDtoFragments { ixs_cau = "*", typ_souboru_cert = "*",}
	const enum GWfldcauDtoTypes { ixs_cau = "string", typ_souboru_cert = "string",}
	const enum GWfldcauDtoTypeLengths { ixs_cau = 12, typ_souboru_cert = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWfldcerDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wfldcer
	*      Veřejná část certifikátu
	*/
	interface GWfldcerDto {
		/**Certifikát*/
		ixs_cer?: string|null;
		/**Obsah
		*      Obsah certifikátu - jeho binární podoba
		*/
		kopie?: JsonBlob|null;
		/**Typ souboru
		*      Přípona, která určuje formát binární podoby načteného certifikátu v @kopie
		*/
		typ_souboru_cert?: string|null;
	}
	const enum GWfldcerDtoNames { ixs_cer = "ixs_cer", kopie = "kopie", typ_souboru_cert = "typ_souboru_cert",}
	const enum GWfldcerDtoFragments { ixs_cer = "*", kopie = "*", typ_souboru_cert = "*",}
	const enum GWfldcerDtoTypes { ixs_cer = "string", kopie = "JsonBlob", typ_souboru_cert = "string",}
	const enum GWfldcerDtoTypeLengths { ixs_cer = 12, typ_souboru_cert = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWfldcftDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wfldcft
	*      Parametry trasy
	*/
	interface GWfldcftDto {
		/**Trasa*/
		ixs_tra?: string|null;
		/**Interní ID zásilky*/
		por_cislo?: number|null;
		/**Parametr trasy
		*      Pojmenovaný parametr kroku trasy. Definice povolených parametrů je v wflcpat
		*/
		param_tra?: string|null;
		param_tra_txt?: string|null;
		config_tra?: string|null;
		config_tra_txt?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		param_tra_index?: number|null;
	}
	const enum GWfldcftDtoNames { ixs_tra = "ixs_tra", por_cislo = "por_cislo", param_tra = "param_tra", param_tra_txt = "param_tra_txt", config_tra = "config_tra", config_tra_txt = "config_tra_txt", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", param_tra_index = "param_tra_index",}
	const enum GWfldcftDtoFragments { ixs_tra = "*", por_cislo = "*", param_tra = "*", param_tra_txt = "*", config_tra = "*", config_tra_txt = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", param_tra_index = "*",}
	const enum GWfldcftDtoTypes { ixs_tra = "string", por_cislo = "number", param_tra = "string", param_tra_txt = "string", config_tra = "string", config_tra_txt = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", param_tra_index = "number",}
	const enum GWfldcftDtoTypeLengths { ixs_tra = 12, param_tra = 15, param_tra_txt = 254, config_tra = 254, config_tra_txt = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWfldgraDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wfldgra
	*      Definice spisových grafů
	*/
	interface GWfldgraDto {
		/**Spisový graf*/
		spis_graf?: string|null;
		/**Spisový uzel*/
		ixs_su?: string|null;
		ixs_su_nad?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Název spisového uzlu*/
		nazev_su?: string|null;
		priz_graf?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Počet podřízených*/
		num_pod?: number|null;
	}
	const enum GWfldgraDtoNames { spis_graf = "spis_graf", ixs_su = "ixs_su", ixs_su_nad = "ixs_su_nad", aktivita = "aktivita", nazev_su = "nazev_su", priz_graf = "priz_graf", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", num_pod = "num_pod",}
	const enum GWfldgraDtoFragments { spis_graf = "*", ixs_su = "*", ixs_su_nad = "*", aktivita = "*", nazev_su = "*", priz_graf = "*", dat_zmena = "*", zmenu_prov = "*", num_pod = "*",}
	const enum GWfldgraDtoTypes { spis_graf = "string", ixs_su = "string", ixs_su_nad = "string", aktivita = "number", nazev_su = "string", priz_graf = "number", dat_zmena = "JsonDate", zmenu_prov = "string", num_pod = "number",}
	const enum GWfldgraDtoTypeLengths { spis_graf = 10, ixs_su = 12, ixs_su_nad = 12, nazev_su = 50, zmenu_prov = 12,}
	interface GWfldgraExtDto extends Gordic.Adm.Interface.GWfldgraDto {
		/**Textová reprezentace spisového uzlu*/
		ixs_su_txt?: string|null;
		/**Textová reprezentace změnu púorvedl*/
		zmenu_prov_txt?: string|null;
	}
	const enum GWfldgraExtDtoNames { ixs_su_txt = "ixs_su_txt", zmenu_prov_txt = "zmenu_prov_txt", spis_graf = "spis_graf", ixs_su = "ixs_su", ixs_su_nad = "ixs_su_nad", aktivita = "aktivita", nazev_su = "nazev_su", priz_graf = "priz_graf", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", num_pod = "num_pod",}
	const enum GWfldgraExtDtoFragments { ixs_su_txt = "*", zmenu_prov_txt = "*", spis_graf = "*", ixs_su = "*", ixs_su_nad = "*", aktivita = "*", nazev_su = "*", priz_graf = "*", dat_zmena = "*", zmenu_prov = "*", num_pod = "*",}
	const enum GWfldgraExtDtoTypes { ixs_su_txt = "string", zmenu_prov_txt = "string", spis_graf = "string", ixs_su = "string", ixs_su_nad = "string", aktivita = "number", nazev_su = "string", priz_graf = "number", dat_zmena = "JsonDate", zmenu_prov = "string", num_pod = "number",}
	const enum GWfldgraExtDtoTypeLengths { spis_graf = 10, ixs_su = 12, ixs_su_nad = 12, nazev_su = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWfldtraDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wfldtra
	*      Kroky trasy
	*/
	interface GWfldtraDto {
		/**Trasa*/
		ixs_tra?: string|null;
		/**Interní ID zásilky
		*      Neslouží pro uchování pořadí. Jedná se pouze o datovou identifikaci. Pro určení pořadí kroků slouží sloupec PORADI
		*/
		por_cislo?: number|null;
		/**Spisový uzel
		*      Nepovinný parametr - Spisový uzel. Pokud je zadán pouze spisový uzel kroku trasy, potom je krok trasy splněn, pokud dokument projde přes zadaný spisový uzel. V případě že spisový uzel není zadán, potom se může jednat ne o krok trasy ale o úkon, který se má s dokumentem realizovat a to bez zadání realizátora úkonu.
		*/
		ixs_su?: string|null;
		/**Funkční místo
		*      Nepovinný parametr - Funkce. Pokud je zadána funkce kroku trasy, potom je krok trasy splněn, pokud dokument projde přes zadanou funkci. V případě že je funkce zadána, nesmí být zadána hodnota do sloupce IXS_SU. Důvodem je možnost administrací přesunout funkci na jiný spisový uzel a v tom případě by v této tabulce vznikla nekonzistentní data.
		*/
		ixs_fun?: string|null;
		/**Povinnost
		*      Příznak povinnosti realizovat tento krok trasy. Pokud bude nastaven na 0, potom se na tento krok trasy bude nahlížet pouze jako na doporučení. Doporučené kroky trasy budou zobrazeny graficky odlišně. Pokud bude trasa obsahovat příznak povinného pořadí kroků, potom tento krok nebude při testech realizace kroků uvažován. Doporučené kroky nebudou zahrnuty do kontrol na termíny.
		*/
		priz_pov?: number|null;
		/**Editovatelnost
		*      Příznak, že běžný uživatel může tento krok trasy vztažený ke konkrétnímu dokumentu modifikovat. Modifikací je myšleno - změna názvu, poznámky, termínu, popř. smazání celého kroku trasy.
		*/
		priz_edit?: number|null;
		/**Název
		*      Výstižné označení kroku trasy. Bude zobrazováno v uživatelských modulech při zobrazení seznamu kroků trasy.
		*/
		nazev?: string|null;
		/**Poznámka
		*      Poznámka ke kroku trasy.
		*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Pořadí
		*      Určuje pořadí kroků tras pro zobrazení a v případě povinného pořadí také pro realizaci kroků.
		*/
		poradi?: number|null;
		/**Příznak povinnosti dodržet zadané pořadí tohoto kroku trasy. Pokud bude nastaven na 1, potom bude krok trasy splněn pouze v případě, že bude realizována v okamžiku, kdy bude na řadě. Pokud bude příznak povinnosti pořadí 0, potom stačí aby kdykoliv písemnost prošla tímto krokem a tímto bude krok považován za splněný.*/
		priz_pov_porad?: number|null;
		/**Typ kroku trasy
		*      Příznak o jaký typ kroku trasy se jedná. Zatím pouze zda se jedná o krok trasy a nebo o úkon, popř. o jaký úkon se jedná. Tento atribut určuje, jakým způsobem je krok trasy realizován. Pro krok je to odpovídající změna vlastníka ( bude realizováno automaticky triggerem ) . Pro úkon je požadován zásah uživatele, který označí úkon za realizovaný. V budoucnu se očekává doplnění tohoto číselníku o další typu způsobu vyřízení kroku trasy. ( např. odesláním dokumentu, proúčtováním atd.. tyto podmíněné realizace kroků budou ale poměrně komplikovaným systémem takže raději až někdy v budoucnu. )
		*/
		typ_krok?: number|null;
		/**Počet dnů od zadání trasy, které jsou vyhrazeny pro realizaci kroku trasy. Tento údaj bude použit pro výpočet konkrétního datumového termínu zadaného pro vyřízení kroku trasy. Tento udaj bude možné zadat pouze pro trasu s povinným pořadím kroků. U nepovinného pořadí kroků se nedá uřídit následnost termínů jednotlivých kroků. Přesto si uživatel pro konkrétní kroky dokumentu může nastavit termín libovolně. ( ale samozřejmě pouze podle přístupových práv a příznaku editovatelnosti kroku trasy )*/
		dnu_termin?: number|null;
		typ_dnu_termin?: number|null;
		ixs_fun_pov?: string|null;
		/**Popis*/
		popis?: string|null;
	}
	const enum GWfldtraDtoNames { ixs_tra = "ixs_tra", por_cislo = "por_cislo", ixs_su = "ixs_su", ixs_fun = "ixs_fun", priz_pov = "priz_pov", priz_edit = "priz_edit", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poradi = "poradi", priz_pov_porad = "priz_pov_porad", typ_krok = "typ_krok", dnu_termin = "dnu_termin", typ_dnu_termin = "typ_dnu_termin", ixs_fun_pov = "ixs_fun_pov", popis = "popis",}
	const enum GWfldtraDtoFragments { ixs_tra = "*", por_cislo = "*", ixs_su = "*", ixs_fun = "*", priz_pov = "*", priz_edit = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", poradi = "*", priz_pov_porad = "*", typ_krok = "*", dnu_termin = "*", typ_dnu_termin = "*", ixs_fun_pov = "*", popis = "*",}
	const enum GWfldtraDtoTypes { ixs_tra = "string", por_cislo = "number", ixs_su = "string", ixs_fun = "string", priz_pov = "number", priz_edit = "number", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", poradi = "number", priz_pov_porad = "number", typ_krok = "number", dnu_termin = "number", typ_dnu_termin = "number", ixs_fun_pov = "string", popis = "string",}
	const enum GWfldtraDtoTypeLengths { ixs_tra = 12, ixs_su = 12, ixs_fun = 12, nazev = 50, poznamka = 254, zmenu_prov = 12, ixs_fun_pov = 12, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflsblkDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsblk
	*      Výběrová skupina ADM
	*/
	interface GWflsblkDto {
		/**Poznámkový blok
		*      ID poznámkového bloku
		*/
		ixs_blk?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Vlastník*/
		ixs_fun?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Typ bloku
		*      Jednotypová / vícetypová / šablona parametrů
		*/
		typ?: number|null;
		/**Typ subjektů
		*      Typ subjektů, které se do jednotypové supiny mohou zapisovat.
		*/
		typ_subj?: number|null;
	}
	const enum GWflsblkDtoNames { ixs_blk = "ixs_blk", lic = "lic", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", ixs_fun = "ixs_fun", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ = "typ", typ_subj = "typ_subj",}
	const enum GWflsblkDtoFragments { ixs_blk = "*", lic = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_od = "*", dat_do = "*", ixs_fun = "*", dat_zmena = "*", zmenu_prov = "*", typ = "*", typ_subj = "*",}
	const enum GWflsblkDtoTypes { ixs_blk = "string", lic = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", ixs_fun = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ = "number", typ_subj = "number",}
	const enum GWflsblkDtoTypeLengths { ixs_blk = 12, lic = 4, nazev = 50, poznamka = 50, ixs_fun = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflscauDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflscau
	*      Certifikační autorita
	*/
	interface GWflscauDto {
		/**Certifikační autorita
		*      Interní ID certifikační autority
		*/
		ixs_cau?: string|null;
		/**Jméno certifikátu*/
		jmeno?: string|null;
		/**Stát*/
		stat?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Firma*/
		firma?: string|null;
		/**Útvar*/
		utvar?: string|null;
		/**E-mail*/
		email?: string|null;
		/**ID certifikátu*/
		id_cert?: string|null;
		/**Otisk certifikátu*/
		otisk?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Platnost OD*/
		dat_od?: JsonDate|null;
		/**Platnost DO*/
		dat_do?: JsonDate|null;
		/**Akreditovaná
		*      Příznak, že autorita je akreditovaná podle pravidel EU
		*/
		priz_akr?: number|null;
		/**Aktivita
		*      Aktivita záznamu
		*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Adresa*/
		adresa?: string|null;
		/**Telefon*/
		tel?: string|null;
		/**Subjekt*/
		ixs_esu?: string|null;
		/**Typ certifikátu*/
		typ_cert?: string|null;
		/**Status*/
		status?: string|null;
		/**Nadřízená autorita
		*      Interní ID nadřízené certifikační autority
		*/
		ixs_cau_nad?: string|null;
		/**EU TSL
		*      Příznak, že certifikační autorita byla načtena z TSL vystaveného EU
		*/
		priz_eu_tsl?: number|null;
		ixs_cau_next?: string|null;
	}
	const enum GWflscauDtoNames { ixs_cau = "ixs_cau", jmeno = "jmeno", stat = "stat", ulice = "ulice", obec = "obec", firma = "firma", utvar = "utvar", email = "email", id_cert = "id_cert", otisk = "otisk", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", priz_akr = "priz_akr", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", adresa = "adresa", tel = "tel", ixs_esu = "ixs_esu", typ_cert = "typ_cert", status = "status", ixs_cau_nad = "ixs_cau_nad", priz_eu_tsl = "priz_eu_tsl", ixs_cau_next = "ixs_cau_next",}
	const enum GWflscauDtoFragments { ixs_cau = "*", jmeno = "*", stat = "*", ulice = "*", obec = "*", firma = "*", utvar = "*", email = "*", id_cert = "*", otisk = "*", poznamka = "*", dat_od = "*", dat_do = "*", priz_akr = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", adresa = "*", tel = "*", ixs_esu = "*", typ_cert = "*", status = "*", ixs_cau_nad = "*", priz_eu_tsl = "*", ixs_cau_next = "*",}
	const enum GWflscauDtoTypes { ixs_cau = "string", jmeno = "string", stat = "string", ulice = "string", obec = "string", firma = "string", utvar = "string", email = "string", id_cert = "string", otisk = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", priz_akr = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", adresa = "string", tel = "string", ixs_esu = "string", typ_cert = "string", status = "string", ixs_cau_nad = "string", priz_eu_tsl = "number", ixs_cau_next = "string",}
	const enum GWflscauDtoTypeLengths { ixs_cau = 12, jmeno = 254, stat = 254, ulice = 254, obec = 254, firma = 254, utvar = 254, email = 254, id_cert = 254, otisk = 254, poznamka = 254, zmenu_prov = 12, adresa = 254, tel = 254, ixs_esu = 12, typ_cert = 254, status = 254, ixs_cau_nad = 12, ixs_cau_next = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflscerDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflscer
	*      Elektronické certifikáty
	*/
	interface GWflscerDto {
		/**Certifikát
		*      Interní ID elektronického certifikátu
		*/
		ixs_cer?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Stát*/
		stat?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Firma*/
		firma?: string|null;
		/**Útvar*/
		utvar?: string|null;
		/**E-mail*/
		email?: string|null;
		/**ID certifikátu
		*       Seriové číslo certifikátu
		*/
		id_cert?: string|null;
		/**Otisk certifikátu*/
		otisk?: string|null;
		/**Certifikační autorita
		*      Interní ID certifikační autority
		*/
		ixs_cau?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Adresa*/
		adresa?: string|null;
		/**Telefon*/
		tel?: string|null;
		bio?: JsonDecimal|null;
		/**Typ certifikátu*/
		typ_cer?: number|null;
		alg_h?: string|null;
		stav_revok?: number|null;
		dat_revok?: JsonDate|null;
		/**Datum a čas vzniku záznamu*/
		dat_mpd?: JsonDate|null;
		/**ID následovníka certifikátu
		*      ID certifikátu, který je vydán jako navazující certifikát po vypršení platnosti certifikátu.
		*/
		ixs_cer_next?: string|null;
		/**Interní
		*      Příznak, že se jedná o certifikát, interně využívaný systémem GINIS. Ostatní certifikáty jsou ověřované cizí certifikáty.
		*/
		priz_int?: number|null;
		/**Název*/
		nazev?: string|null;
		cau_nazev?: string|null;
		cau_otisk?: string|null;
		cau_id_klice?: string|null;
		/**příznak udává, jaký typ služby se má využít pro čerpání certifikátu*/
		priz_wsl?: number|null;
	}
	const enum GWflscerDtoNames { ixs_cer = "ixs_cer", jmeno = "jmeno", stat = "stat", ulice = "ulice", obec = "obec", firma = "firma", utvar = "utvar", email = "email", id_cert = "id_cert", otisk = "otisk", ixs_cau = "ixs_cau", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", adresa = "adresa", tel = "tel", bio = "bio", typ_cer = "typ_cer", alg_h = "alg_h", stav_revok = "stav_revok", dat_revok = "dat_revok", dat_mpd = "dat_mpd", ixs_cer_next = "ixs_cer_next", priz_int = "priz_int", nazev = "nazev", cau_nazev = "cau_nazev", cau_otisk = "cau_otisk", cau_id_klice = "cau_id_klice", priz_wsl = "priz_wsl",}
	const enum GWflscerDtoFragments { ixs_cer = "*", jmeno = "*", stat = "*", ulice = "*", obec = "*", firma = "*", utvar = "*", email = "*", id_cert = "*", otisk = "*", ixs_cau = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", adresa = "*", tel = "*", bio = "*", typ_cer = "*", alg_h = "*", stav_revok = "*", dat_revok = "*", dat_mpd = "*", ixs_cer_next = "*", priz_int = "*", nazev = "*", cau_nazev = "*", cau_otisk = "*", cau_id_klice = "*", priz_wsl = "*",}
	const enum GWflscerDtoTypes { ixs_cer = "string", jmeno = "string", stat = "string", ulice = "string", obec = "string", firma = "string", utvar = "string", email = "string", id_cert = "string", otisk = "string", ixs_cau = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", adresa = "string", tel = "string", bio = "JsonDecimal", typ_cer = "number", alg_h = "string", stav_revok = "number", dat_revok = "JsonDate", dat_mpd = "JsonDate", ixs_cer_next = "string", priz_int = "number", nazev = "string", cau_nazev = "string", cau_otisk = "string", cau_id_klice = "string", priz_wsl = "number",}
	const enum GWflscerDtoTypeLengths { ixs_cer = 12, jmeno = 254, stat = 254, ulice = 254, obec = 254, firma = 254, utvar = 254, email = 254, id_cert = 254, otisk = 254, ixs_cau = 12, poznamka = 254, zmenu_prov = 12, adresa = 254, tel = 254, alg_h = 100, ixs_cer_next = 12, nazev = 254, cau_nazev = 254, cau_otisk = 254, cau_id_klice = 254,}
	/**GWflscerExtDto*/
	interface GWflscerExtDto extends Gordic.Adm.Interface.GWflscerDto {
		jmeno_cau?: string|null;
		jmeno_txt?: string|null;
	}
	const enum GWflscerExtDtoNames { jmeno_cau = "jmeno_cau", jmeno_txt = "jmeno_txt", ixs_cer = "ixs_cer", jmeno = "jmeno", stat = "stat", ulice = "ulice", obec = "obec", firma = "firma", utvar = "utvar", email = "email", id_cert = "id_cert", otisk = "otisk", ixs_cau = "ixs_cau", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", adresa = "adresa", tel = "tel", bio = "bio", typ_cer = "typ_cer", alg_h = "alg_h", stav_revok = "stav_revok", dat_revok = "dat_revok", dat_mpd = "dat_mpd", ixs_cer_next = "ixs_cer_next", priz_int = "priz_int", nazev = "nazev", cau_nazev = "cau_nazev", cau_otisk = "cau_otisk", cau_id_klice = "cau_id_klice", priz_wsl = "priz_wsl",}
	const enum GWflscerExtDtoFragments { jmeno_cau = "*", jmeno_txt = "*", ixs_cer = "*", jmeno = "*", stat = "*", ulice = "*", obec = "*", firma = "*", utvar = "*", email = "*", id_cert = "*", otisk = "*", ixs_cau = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", adresa = "*", tel = "*", bio = "*", typ_cer = "*", alg_h = "*", stav_revok = "*", dat_revok = "*", dat_mpd = "*", ixs_cer_next = "*", priz_int = "*", nazev = "*", cau_nazev = "*", cau_otisk = "*", cau_id_klice = "*", priz_wsl = "*",}
	const enum GWflscerExtDtoTypes { jmeno_cau = "string", jmeno_txt = "string", ixs_cer = "string", jmeno = "string", stat = "string", ulice = "string", obec = "string", firma = "string", utvar = "string", email = "string", id_cert = "string", otisk = "string", ixs_cau = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", adresa = "string", tel = "string", bio = "JsonDecimal", typ_cer = "number", alg_h = "string", stav_revok = "number", dat_revok = "JsonDate", dat_mpd = "JsonDate", ixs_cer_next = "string", priz_int = "number", nazev = "string", cau_nazev = "string", cau_otisk = "string", cau_id_klice = "string", priz_wsl = "number",}
	const enum GWflscerExtDtoTypeLengths { jmeno_cau = 254, jmeno_txt = 400, ixs_cer = 12, jmeno = 254, stat = 254, ulice = 254, obec = 254, firma = 254, utvar = 254, email = 254, id_cert = 254, otisk = 254, ixs_cau = 12, poznamka = 254, zmenu_prov = 12, adresa = 254, tel = 254, alg_h = 100, ixs_cer_next = 12, nazev = 254, cau_nazev = 254, cau_otisk = 254, cau_id_klice = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflsdpoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsdpo
	*      Šablona elektronických podpisů
	*/
	interface GWflsdpoDto {
		/**Šablona elektronických podpisů*/
		ixs_dpo?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Důvod přidělení IRP*/
		duvod_txt?: string|null;
		ktg_duv_podp?: number|null;
		priz_edit_text?: number|null;
		priz_znacka?: number|null;
		/**El. podpis*/
		priz_podpis?: number|null;
		/**Typ LTV*/
		typ_ltv?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Příznak časového razítka*/
		priz_ts?: number|null;
		/**Kval. cert.*/
		priz_kvcrt?: number|null;
		ixs_cer_znacky?: string|null;
		viz_podpis?: string|null;
		/**Pozice obrázku*/
		poz_viz_podp?: number|null;
		/**Přesná pozice
		*      Přesná pozice vizualizace podpisu
		*/
		poz_viz_podp_pres?: string|null;
		typ_viz_podpis?: number|null;
		pozadi_viz_podp?: JsonBlob|null;
		/**Stránka podpisu*/
		str_viz_podp?: number|null;
	}
	const enum GWflsdpoDtoNames { ixs_dpo = "ixs_dpo", nazev = "nazev", duvod_txt = "duvod_txt", ktg_duv_podp = "ktg_duv_podp", priz_edit_text = "priz_edit_text", priz_znacka = "priz_znacka", priz_podpis = "priz_podpis", typ_ltv = "typ_ltv", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_ts = "priz_ts", priz_kvcrt = "priz_kvcrt", ixs_cer_znacky = "ixs_cer_znacky", viz_podpis = "viz_podpis", poz_viz_podp = "poz_viz_podp", poz_viz_podp_pres = "poz_viz_podp_pres", typ_viz_podpis = "typ_viz_podpis", pozadi_viz_podp = "pozadi_viz_podp", str_viz_podp = "str_viz_podp",}
	const enum GWflsdpoDtoFragments { ixs_dpo = "*", nazev = "*", duvod_txt = "*", ktg_duv_podp = "*", priz_edit_text = "*", priz_znacka = "*", priz_podpis = "*", typ_ltv = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_ts = "*", priz_kvcrt = "*", ixs_cer_znacky = "*", viz_podpis = "*", poz_viz_podp = "*", poz_viz_podp_pres = "*", typ_viz_podpis = "*", pozadi_viz_podp = "*", str_viz_podp = "*",}
	const enum GWflsdpoDtoTypes { ixs_dpo = "string", nazev = "string", duvod_txt = "string", ktg_duv_podp = "number", priz_edit_text = "number", priz_znacka = "number", priz_podpis = "number", typ_ltv = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_ts = "number", priz_kvcrt = "number", ixs_cer_znacky = "string", viz_podpis = "string", poz_viz_podp = "number", poz_viz_podp_pres = "string", typ_viz_podpis = "number", pozadi_viz_podp = "JsonBlob", str_viz_podp = "number",}
	const enum GWflsdpoDtoTypeLengths { ixs_dpo = 12, nazev = 100, duvod_txt = 254, poznamka = 254, zmenu_prov = 12, ixs_cer_znacky = 12, viz_podpis = 1000, poz_viz_podp_pres = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflsepoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsepo
	*      Text odpovědi na el. podání
	*/
	interface GWflsepoDto {
		/**Druh odpovědi na el. podání*/
		stav_epod?: number|null;
		/**Interní ID zásilky*/
		por_cislo?: number|null;
		/**Popis*/
		popis?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflsepoDtoNames { stav_epod = "stav_epod", por_cislo = "por_cislo", popis = "popis", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflsepoDtoFragments { stav_epod = "*", por_cislo = "*", popis = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflsepoDtoTypes { stav_epod = "number", por_cislo = "number", popis = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflsepoDtoTypeLengths { popis = 4000, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflsgraDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsgra
	*      Spisový graf
	*/
	interface GWflsgraDto {
		/**Spisový graf
		*      ID spisového grafu. Jedná se o identifikátor v otevřeném tvaru, který vidí i běžný uživatel a který nelze dodatečně měnit..
		*/
		spis_graf?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		typ_gra?: number|null;
		ixs_su_root?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflsgraDtoNames { spis_graf = "spis_graf", aktivita = "aktivita", nazev = "nazev", poznamka = "poznamka", typ_gra = "typ_gra", ixs_su_root = "ixs_su_root", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflsgraDtoFragments { spis_graf = "*", aktivita = "*", nazev = "*", poznamka = "*", typ_gra = "*", ixs_su_root = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflsgraDtoTypes { spis_graf = "string", aktivita = "number", nazev = "string", poznamka = "string", typ_gra = "number", ixs_su_root = "string", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflsgraDtoTypeLengths { spis_graf = 10, nazev = 50, poznamka = 50, ixs_su_root = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflskslDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsksl
	*      Oblíbená kombinace poštovních služeb
	*/
	interface GWflskslDto {
		komb_sluzeb?: string|null;
		komb_sluzeb_txt?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		filtr_format?: string|null;
	}
	const enum GWflskslDtoNames { komb_sluzeb = "komb_sluzeb", komb_sluzeb_txt = "komb_sluzeb_txt", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", filtr_format = "filtr_format",}
	const enum GWflskslDtoFragments { komb_sluzeb = "*", komb_sluzeb_txt = "*", zkratka = "*", nazev = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", filtr_format = "*",}
	const enum GWflskslDtoTypes { komb_sluzeb = "string", komb_sluzeb_txt = "string", zkratka = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", filtr_format = "string",}
	const enum GWflskslDtoTypeLengths { komb_sluzeb = 100, komb_sluzeb_txt = 254, zkratka = 16, nazev = 50, zmenu_prov = 12, filtr_format = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflsozvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsozv*/
	interface GWflsozvDto {
		/**DBCOLUMN:wflsozv.ixs_zpv*/
		ixs_zpv?: string|null;
		/**DBCOLUMN:wflsozv.operace*/
		operace?: number|null;
		/**DBCOLUMN:wflsozv.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflsozv.popis*/
		popis?: string|null;
		/**DBCOLUMN:wflsozv.url_ws*/
		url_ws?: string|null;
		/**DBCOLUMN:wflsozv.ixs_cer*/
		ixs_cer?: string|null;
		/**DBCOLUMN:wflsozv.name_ws*/
		name_ws?: string|null;
		/**DBCOLUMN:wflsozv.pass_ws*/
		pass_ws?: string|null;
		/**DBCOLUMN:wflsozv.proxy_url*/
		proxy_url?: string|null;
		/**DBCOLUMN:wflsozv.name_proxy*/
		name_proxy?: string|null;
		/**DBCOLUMN:wflsozv.pass_proxy*/
		pass_proxy?: string|null;
		/**DBCOLUMN:wflsozv.typ_srv*/
		typ_srv?: number|null;
		/**DBCOLUMN:wflsozv.server*/
		server?: string|null;
		/**DBCOLUMN:wflsozv.user_server*/
		user_server?: string|null;
		/**DBCOLUMN:wflsozv.pass_server*/
		pass_server?: string|null;
		/**DBCOLUMN:wflsozv.id_operace*/
		id_operace?: string|null;
		/**DBCOLUMN:wflsozv.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsozv.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsozv.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflsozv.priz_pov_prilohy*/
		priz_pov_prilohy?: number|null;
	}
	const enum GWflsozvDtoNames { ixs_zpv = "ixs_zpv", operace = "operace", nazev = "nazev", popis = "popis", url_ws = "url_ws", ixs_cer = "ixs_cer", name_ws = "name_ws", pass_ws = "pass_ws", proxy_url = "proxy_url", name_proxy = "name_proxy", pass_proxy = "pass_proxy", typ_srv = "typ_srv", server = "server", user_server = "user_server", pass_server = "pass_server", id_operace = "id_operace", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_pov_prilohy = "priz_pov_prilohy",}
	const enum GWflsozvDtoFragments { ixs_zpv = "*", operace = "*", nazev = "*", popis = "*", url_ws = "*", ixs_cer = "*", name_ws = "*", pass_ws = "*", proxy_url = "*", name_proxy = "*", pass_proxy = "*", typ_srv = "*", server = "*", user_server = "*", pass_server = "*", id_operace = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_pov_prilohy = "*",}
	const enum GWflsozvDtoTypes { ixs_zpv = "string", operace = "number", nazev = "string", popis = "string", url_ws = "string", ixs_cer = "string", name_ws = "string", pass_ws = "string", proxy_url = "string", name_proxy = "string", pass_proxy = "string", typ_srv = "number", server = "string", user_server = "string", pass_server = "string", id_operace = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_pov_prilohy = "number",}
	const enum GWflsozvDtoTypeLengths { ixs_zpv = 12, nazev = 50, popis = 100, url_ws = 254, ixs_cer = 12, name_ws = 30, pass_ws = 30, proxy_url = 254, name_proxy = 30, pass_proxy = 30, server = 254, user_server = 30, pass_server = 30, id_operace = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflssskDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsssk*/
	interface GWflssskDto {
		/**DBCOLUMN:wflsssk.ixs_slo*/
		ixs_slo?: string|null;
		/**DBCOLUMN:wflsssk.mailbox*/
		mailbox?: string|null;
		/**DBCOLUMN:wflsssk.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflsssk.typ_slo_upvs*/
		typ_slo_upvs?: number|null;
		/**DBCOLUMN:wflsssk.id_upvs*/
		id_upvs?: number|null;
		/**DBCOLUMN:wflsssk.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:wflsssk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsssk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsssk.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GWflssskDtoNames { ixs_slo = "ixs_slo", mailbox = "mailbox", nazev = "nazev", typ_slo_upvs = "typ_slo_upvs", id_upvs = "id_upvs", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflssskDtoFragments { ixs_slo = "*", mailbox = "*", nazev = "*", typ_slo_upvs = "*", id_upvs = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflssskDtoTypes { ixs_slo = "string", mailbox = "string", nazev = "string", typ_slo_upvs = "number", id_upvs = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflssskDtoTypeLengths { ixs_slo = 12, mailbox = 100, nazev = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflssslDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsssl
	*      Šablona poštovních služeb
	*/
	interface GWflssslDto {
		/**Druh zásilky*/
		druh_zas?: number|null;
		sablona_sluzeb?: string|null;
		sablona_sluzeb_txt?: string|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		filtr_format?: string|null;
		soubor_obr_m?: string|null;
		soubor_obr_v?: string|null;
	}
	const enum GWflssslDtoNames { druh_zas = "druh_zas", sablona_sluzeb = "sablona_sluzeb", sablona_sluzeb_txt = "sablona_sluzeb_txt", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", filtr_format = "filtr_format", soubor_obr_m = "soubor_obr_m", soubor_obr_v = "soubor_obr_v",}
	const enum GWflssslDtoFragments { druh_zas = "*", sablona_sluzeb = "*", sablona_sluzeb_txt = "*", zkratka = "*", nazev = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", filtr_format = "*", soubor_obr_m = "*", soubor_obr_v = "*",}
	const enum GWflssslDtoTypes { druh_zas = "number", sablona_sluzeb = "string", sablona_sluzeb_txt = "string", zkratka = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", filtr_format = "string", soubor_obr_m = "string", soubor_obr_v = "string",}
	const enum GWflssslDtoTypeLengths { sablona_sluzeb = 100, sablona_sluzeb_txt = 254, zkratka = 16, nazev = 50, zmenu_prov = 12, filtr_format = 50, soubor_obr_m = 254, soubor_obr_v = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflstraDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflstra
	*      Trasa workflow
	*/
	interface GWflstraDto {
		/**Trasa
		*      ID definice trasy
		*/
		ixs_tra?: string|null;
		/**Povinnost
		*      Příznak povinnosti dodržet kroky trasy. Tento příznak zatím bude vždy plněn na 0. To znamená, že zatím veškerá konstrukce tras bude umožňovat vždy udělat krok mino trasu. Tento příznak je pouze připraven pro budoucí použití a zatím nebude zobrazována.
		*/
		priz_pov?: number|null;
		/**Příznak povinnosti dodržet zadané pořadí kroků trasy. Pokud bude nastaven na 1, potom bude krok trasy splněn pouze v případě, že bude realizována v okamžiku, kdy bude na řadě. Pokud bude příznak povinnosti pořadí 0, potom stačí aby kdykoliv písemnost prošla zadaným krokem a tímto bude krok považován za splněný.*/
		priz_pov_porad?: number|null;
		/**Editovatelnost
		*      Příznak, že běžná obsluha může tuto trasu modifikovat. Např. vyřadit krok ze seznamu kroků dokumentu, změnit termín na kroku atd. Povolení editace se ale vztahuje vždy na kroky vztažené ke konkrétnímu dokumentu. Povolení editace se nevztahuje k deklaraci trasy jako takové.
		*/
		priz_edit?: number|null;
		/**Název
		*      Výstižné označení trasy. Bude zobrazováno v uživatelských modulech při zobrazení seznamu tras.
		*/
		nazev?: string|null;
		/**Poznámka
		*      Poznámka k trase.
		*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		typ_tra?: number|null;
	}
	const enum GWflstraDtoNames { ixs_tra = "ixs_tra", priz_pov = "priz_pov", priz_pov_porad = "priz_pov_porad", priz_edit = "priz_edit", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_tra = "typ_tra",}
	const enum GWflstraDtoFragments { ixs_tra = "*", priz_pov = "*", priz_pov_porad = "*", priz_edit = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_tra = "*",}
	const enum GWflstraDtoTypes { ixs_tra = "string", priz_pov = "number", priz_pov_porad = "number", priz_edit = "number", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_tra = "number",}
	const enum GWflstraDtoTypeLengths { ixs_tra = 12, nazev = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflstysDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflstys
	*      Povolené typy souborů pro el. podatelnu
	*/
	interface GWflstysDto {
		typ_soub?: string|null;
		priz_podp?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflstysDtoNames { typ_soub = "typ_soub", priz_podp = "priz_podp", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflstysDtoFragments { typ_soub = "*", priz_podp = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflstysDtoTypes { typ_soub = "string", priz_podp = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflstysDtoTypeLengths { typ_soub = 50, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflszpvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflszpv
	*      Způsoby zveřejnění
	*/
	interface GWflszpvDto {
		ixs_zpv?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
		ktg_zve?: number|null;
		/**Kód způsobu doručení*/
		zpusob_dor?: number|null;
		termin_zve?: number|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**Editovatelnost*/
		priz_edit?: number|null;
		priz_aut_zve?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		max_pocet_soub?: number|null;
		max_velikost_soub?: number|null;
		xml_namespace?: string|null;
		id_rejstriku?: string|null;
		povol_typ_soub?: string|null;
		/**Skupina úložišť*/
		ixs_ulz?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		poc_dni_sej?: number|null;
		mailbox?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
	}
	const enum GWflszpvDtoNames { ixs_zpv = "ixs_zpv", nazev = "nazev", popis = "popis", ktg_zve = "ktg_zve", zpusob_dor = "zpusob_dor", termin_zve = "termin_zve", ixs_esu = "ixs_esu", priz_edit = "priz_edit", priz_aut_zve = "priz_aut_zve", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", max_pocet_soub = "max_pocet_soub", max_velikost_soub = "max_velikost_soub", xml_namespace = "xml_namespace", id_rejstriku = "id_rejstriku", povol_typ_soub = "povol_typ_soub", ixs_ulz = "ixs_ulz", ico = "ico", poc_dni_sej = "poc_dni_sej", mailbox = "mailbox", ucs = "ucs",}
	const enum GWflszpvDtoFragments { ixs_zpv = "*", nazev = "*", popis = "*", ktg_zve = "*", zpusob_dor = "*", termin_zve = "*", ixs_esu = "*", priz_edit = "*", priz_aut_zve = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", max_pocet_soub = "*", max_velikost_soub = "*", xml_namespace = "*", id_rejstriku = "*", povol_typ_soub = "*", ixs_ulz = "*", ico = "*", poc_dni_sej = "*", mailbox = "*", ucs = "*",}
	const enum GWflszpvDtoTypes { ixs_zpv = "string", nazev = "string", popis = "string", ktg_zve = "number", zpusob_dor = "number", termin_zve = "number", ixs_esu = "string", priz_edit = "number", priz_aut_zve = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", max_pocet_soub = "number", max_velikost_soub = "number", xml_namespace = "string", id_rejstriku = "string", povol_typ_soub = "string", ixs_ulz = "string", ico = "string", poc_dni_sej = "number", mailbox = "string", ucs = "string",}
	const enum GWflszpvDtoTypeLengths { ixs_zpv = 12, nazev = 50, popis = 100, ixs_esu = 12, zmenu_prov = 12, xml_namespace = 254, id_rejstriku = 50, povol_typ_soub = 254, ixs_ulz = 12, ico = 10, mailbox = 100, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvcerDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvcer
	*      Přiřazení certifikátu
	*/
	interface GWflvcerDto {
		/**Certifikát*/
		ixs_cer?: string|null;
		/**ID objektu
		*      Např. Hodnota z IXS_REF pokud se navazuje certifikát na osobu.
		*/
		ixs?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Pořadí
		*      Většinou tato hodnota nemá význam.
		*/
		por_zast?: number|null;
		/**Typ objektu
		*      Např. hodnota SR pokud se certifikát navazuje na Osobu
		*/
		ix?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Vazba platná OD
		*      Začátek platnosti vazby - nemusí souviset s platností samotného certifikátu
		*/
		dat_od?: JsonDate|null;
		/**Vazba platná DO
		*      Konec platnosti vazby
		*/
		dat_do?: JsonDate|null;
		/**Aktivita vazby*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		ixb?: string|null;
		dat_zadost?: JsonDate|null;
		dat_schval?: JsonDate|null;
		dat_zam?: JsonDate|null;
		zmenu_prov_zadost?: string|null;
		zmenu_prov_schval?: string|null;
		zmenu_prov_zam?: string|null;
		dat_mpd2?: JsonDate|null;
	}
	const enum GWflvcerDtoNames { ixs_cer = "ixs_cer", ixs = "ixs", lic = "lic", por_zast = "por_zast", ix = "ix", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixb = "ixb", dat_zadost = "dat_zadost", dat_schval = "dat_schval", dat_zam = "dat_zam", zmenu_prov_zadost = "zmenu_prov_zadost", zmenu_prov_schval = "zmenu_prov_schval", zmenu_prov_zam = "zmenu_prov_zam", dat_mpd2 = "dat_mpd2",}
	const enum GWflvcerDtoFragments { ixs_cer = "*", ixs = "*", lic = "*", por_zast = "*", ix = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixb = "*", dat_zadost = "*", dat_schval = "*", dat_zam = "*", zmenu_prov_zadost = "*", zmenu_prov_schval = "*", zmenu_prov_zam = "*", dat_mpd2 = "*",}
	const enum GWflvcerDtoTypes { ixs_cer = "string", ixs = "string", lic = "string", por_zast = "number", ix = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixb = "string", dat_zadost = "JsonDate", dat_schval = "JsonDate", dat_zam = "JsonDate", zmenu_prov_zadost = "string", zmenu_prov_schval = "string", zmenu_prov_zam = "string", dat_mpd2 = "JsonDate",}
	const enum GWflvcerDtoTypeLengths { ixs_cer = 12, ixs = 12, lic = 4, ix = 3, poznamka = 254, zmenu_prov = 12, ixb = 12, zmenu_prov_zadost = 12, zmenu_prov_schval = 12, zmenu_prov_zam = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvcexDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvcex
	*      Vazba certifikátů na externí systémy
	*/
	interface GWflvcexDto {
		/**Certifikát*/
		ixs_cer?: string|null;
		/**Externí systém*/
		ixs_ext?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflvcexDtoNames { ixs_cer = "ixs_cer", ixs_ext = "ixs_ext", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvcexDtoFragments { ixs_cer = "*", ixs_ext = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvcexDtoTypes { ixs_cer = "string", ixs_ext = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvcexDtoTypeLengths { ixs_cer = 12, ixs_ext = 12, poznamka = 254, zmenu_prov = 12,}
	/**Rozšíření wflvcex*/
	interface GWflvcexExtDto extends Gordic.Adm.Interface.GWflvcexDto {
		/**Nazev cert*/
		nazev_cer?: string|null;
	}
	const enum GWflvcexExtDtoNames { nazev_cer = "nazev_cer", ixs_cer = "ixs_cer", ixs_ext = "ixs_ext", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvcexExtDtoFragments { nazev_cer = "*", ixs_cer = "*", ixs_ext = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvcexExtDtoTypes { nazev_cer = "string", ixs_cer = "string", ixs_ext = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvcexExtDtoTypeLengths { ixs_cer = 12, ixs_ext = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvdzsDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvdzs
	*      Povolená služba pro druh zásilky
	*/
	interface GWflvdzsDto {
		/**Druh zásilky*/
		druh_zas?: number|null;
		post_sluzba?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflvdzsDtoNames { druh_zas = "druh_zas", post_sluzba = "post_sluzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvdzsDtoFragments { druh_zas = "*", post_sluzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvdzsDtoTypes { druh_zas = "number", post_sluzba = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvdzsDtoTypeLengths { zmenu_prov = 12,}
	/**Filter*/
	const enum GFilterWflvdzs {
		/**Způsob doručení*/
		druh_zas,
		/**Poštovní služba*/
		post_sluzba,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvkslDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvksl
	*      Poštovních služeb na vlastníka
	*/
	interface GWflvkslDto {
		komb_sluzeb?: string|null;
		ixs?: string|null;
		/**Typ subjektu*/
		ix?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflvkslDtoNames { komb_sluzeb = "komb_sluzeb", ixs = "ixs", ix = "ix", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvkslDtoFragments { komb_sluzeb = "*", ixs = "*", ix = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvkslDtoTypes { komb_sluzeb = "string", ixs = "string", ix = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvkslDtoTypeLengths { komb_sluzeb = 100, ixs = 12, ix = 3, zmenu_prov = 12,}
	/**GWflvkslDtoExt*/
	interface GWflvkslDtoExt extends Gordic.Adm.Interface.GWflvkslDto {
		/**nazev*/
		nazev?: string|null;
		/**aktivita_txt*/
		aktivita_txt?: string|null;
	}
	const enum GWflvkslDtoExtNames { nazev = "nazev", aktivita_txt = "aktivita_txt", komb_sluzeb = "komb_sluzeb", ixs = "ixs", ix = "ix", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvkslDtoExtFragments { nazev = "*", aktivita_txt = "*", komb_sluzeb = "*", ixs = "*", ix = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvkslDtoExtTypes { nazev = "string", aktivita_txt = "string", komb_sluzeb = "string", ixs = "string", ix = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvkslDtoExtTypeLengths { komb_sluzeb = 100, ixs = 12, ix = 3, zmenu_prov = 12,}
	/**GFilterWflvksl*/
	const enum GFilterWflvksl {
		/**komb_sluzeb*/
		komb_sluzeb,
		/**aktivita*/
		aktivita,
		/**ixs*/
		ixs,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvsslDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvssl
	*      Vazba šablony poštovních služeb na vlastníka
	*/
	interface GWflvsslDto {
		/**Druh zásilky*/
		druh_zas?: number|null;
		sablona_sluzeb?: string|null;
		ixs?: string|null;
		/**Typ subjektu*/
		ix?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflvsslDtoNames { druh_zas = "druh_zas", sablona_sluzeb = "sablona_sluzeb", ixs = "ixs", ix = "ix", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvsslDtoFragments { druh_zas = "*", sablona_sluzeb = "*", ixs = "*", ix = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvsslDtoTypes { druh_zas = "number", sablona_sluzeb = "string", ixs = "string", ix = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvsslDtoTypeLengths { sablona_sluzeb = 100, ixs = 12, ix = 3, zmenu_prov = 12,}
	/**GWflvsslDtoExt*/
	interface GWflvsslDtoExt extends Gordic.Adm.Interface.GWflvsslDto {
		/**nazev*/
		nazev?: string|null;
		/**aktivita_txt*/
		aktivita_txt?: string|null;
	}
	const enum GWflvsslDtoExtNames { nazev = "nazev", aktivita_txt = "aktivita_txt", druh_zas = "druh_zas", sablona_sluzeb = "sablona_sluzeb", ixs = "ixs", ix = "ix", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvsslDtoExtFragments { nazev = "*", aktivita_txt = "*", druh_zas = "*", sablona_sluzeb = "*", ixs = "*", ix = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvsslDtoExtTypes { nazev = "string", aktivita_txt = "string", druh_zas = "number", sablona_sluzeb = "string", ixs = "string", ix = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvsslDtoExtTypeLengths { sablona_sluzeb = 100, ixs = 12, ix = 3, zmenu_prov = 12,}
	/**GFilterWflvssl*/
	const enum GFilterWflvssl {
		/**druh_zas*/
		druh_zas,
		/**sablona_sluzeb*/
		sablona_sluzeb,
		/**aktivita*/
		aktivita,
		/**ixs*/
		ixs,
		/**ix*/
		ix,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvszvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvszv
	*      Vazby způsobu zveřejnění, operace a sestav pro vznik žádosti a vlastní zveřejnění s agendou
	*/
	interface GWflvszvDto {
		ixs_zpv?: string|null;
		operace?: number|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		ixs_alv_ob_met?: string|null;
		ixs_alv_zve?: string|null;
		priz_zakon?: number|null;
		/**Označeno pro EPK*/
		priz_epk?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Zveřejnění*/
		plan_zve?: number|null;
		priz_pov_zve?: number|null;
	}
	const enum GWflvszvDtoNames { ixs_zpv = "ixs_zpv", operace = "operace", typ_ag = "typ_ag", ixs_alv_ob_met = "ixs_alv_ob_met", ixs_alv_zve = "ixs_alv_zve", priz_zakon = "priz_zakon", priz_epk = "priz_epk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", plan_zve = "plan_zve", priz_pov_zve = "priz_pov_zve",}
	const enum GWflvszvDtoFragments { ixs_zpv = "*", operace = "*", typ_ag = "*", ixs_alv_ob_met = "*", ixs_alv_zve = "*", priz_zakon = "*", priz_epk = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", plan_zve = "*", priz_pov_zve = "*",}
	const enum GWflvszvDtoTypes { ixs_zpv = "string", operace = "number", typ_ag = "number", ixs_alv_ob_met = "string", ixs_alv_zve = "string", priz_zakon = "number", priz_epk = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", plan_zve = "number", priz_pov_zve = "number",}
	const enum GWflvszvDtoTypeLengths { ixs_zpv = 12, ixs_alv_ob_met = 12, ixs_alv_zve = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvtraDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvtra
	*      Trasy pro typy dokumentů
	*/
	interface GWflvtraDto {
		/**Trasa*/
		ixs_tra?: string|null;
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflvtraDtoNames { ixs_tra = "ixs_tra", ixs_typ = "ixs_typ", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvtraDtoFragments { ixs_tra = "*", ixs_typ = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvtraDtoTypes { ixs_tra = "string", ixs_typ = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvtraDtoTypeLengths { ixs_tra = 12, ixs_typ = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvzepDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvzep*/
	interface GWflvzepDto {
		/**DBCOLUMN:wflvzep.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:wflvzep.ixs_ref*/
		ixs_ref?: string|null;
		/**Agenda, do které má funkce X referent přístup*/
		typ_ag_prim?: number|null;
		/**DBCOLUMN:wflvzep.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflvzep.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflvzep.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GWflvzepDtoNames { ixs_fun = "ixs_fun", ixs_ref = "ixs_ref", typ_ag_prim = "typ_ag_prim", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvzepDtoFragments { ixs_fun = "*", ixs_ref = "*", typ_ag_prim = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvzepDtoTypes { ixs_fun = "string", ixs_ref = "string", typ_ag_prim = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvzepDtoTypeLengths { ixs_fun = 12, ixs_ref = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvzpvDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvzpv
	*      Vazba způsobu zveřejnění na typ písemnosti
	*/
	interface GWflvzpvDto {
		ixs_zpv?: string|null;
		/**Druh dokumentu*/
		ixs_typ?: string|null;
		priz_pov_zve?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Zveřejnění*/
		plan_zve?: number|null;
		/**Označeno pro EPK*/
		priz_epk?: number|null;
		operace?: number|null;
		ixs_alv_ob_met?: string|null;
		ixs_alv_zve?: string|null;
		priz_zakon?: number|null;
	}
	const enum GWflvzpvDtoNames { ixs_zpv = "ixs_zpv", ixs_typ = "ixs_typ", priz_pov_zve = "priz_pov_zve", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", plan_zve = "plan_zve", priz_epk = "priz_epk", operace = "operace", ixs_alv_ob_met = "ixs_alv_ob_met", ixs_alv_zve = "ixs_alv_zve", priz_zakon = "priz_zakon",}
	const enum GWflvzpvDtoFragments { ixs_zpv = "*", ixs_typ = "*", priz_pov_zve = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", plan_zve = "*", priz_epk = "*", operace = "*", ixs_alv_ob_met = "*", ixs_alv_zve = "*", priz_zakon = "*",}
	const enum GWflvzpvDtoTypes { ixs_zpv = "string", ixs_typ = "string", priz_pov_zve = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", plan_zve = "number", priz_epk = "number", operace = "number", ixs_alv_ob_met = "string", ixs_alv_zve = "string", priz_zakon = "number",}
	const enum GWflvzpvDtoTypeLengths { ixs_zpv = 12, ixs_typ = 12, zmenu_prov = 12, ixs_alv_ob_met = 12, ixs_alv_zve = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvzslDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvzsl
	*      Povolené služby pro způsob doručení
	*/
	interface GWflvzslDto {
		/**Způsob doručení*/
		zpusob_dor?: number|null;
		/**Poštovní služba*/
		post_sluzba?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflvzslDtoNames { zpusob_dor = "zpusob_dor", post_sluzba = "post_sluzba", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvzslDtoFragments { zpusob_dor = "*", post_sluzba = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvzslDtoTypes { zpusob_dor = "number", post_sluzba = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvzslDtoTypeLengths { zmenu_prov = 12,}
	/**Filter*/
	const enum GFilterGWflvzsl {
		/**Způsob doručení*/
		zpusob_dor,
		/**Poštovní služba*/
		post_sluzba,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Dto\Wfl\GWflvzzaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflvzza
	*      Vazba způsobu zveřejnění na typ agendy
	*/
	interface GWflvzzaDto {
		ixs_zpv?: string|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GWflvzzaDtoNames { ixs_zpv = "ixs_zpv", typ_ag = "typ_ag", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GWflvzzaDtoFragments { ixs_zpv = "*", typ_ag = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GWflvzzaDtoTypes { ixs_zpv = "string", typ_ag = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GWflvzzaDtoTypeLengths { ixs_zpv = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderAdmGincpba - Copy.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmGincren {
		/**Režim nakládání*/
		rezim_nakl,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderAdmGincpba.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmGincpba {
		/**Příznak bezpečné autorizace*/
		priz_ba,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderAdmGinctao.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmGinctao {
		/**Typ autorizace do OAuth*/
		typ_aut_oauth,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderAdmGinctcl - Copy.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmGinsfun {
		/**Ixs_fun*/
		ixs_fun,
		/**Aktivita*/
		aktivita,
		/**Ico*/
		ico,
		/**IČO Organizační jednotka v externím subjektu*/
		IxsOrInEsuIco,
		/**GpcIcoOrSharedIco*/
		GpcIcoOrSharedIco,
		/**IcoOrSharedIco*/
		IcoOrSharedIco,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderAdmGinctcl.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmGinctcl {
		/**Typ cloudu*/
		typ_cloudu,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderGincoat.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterGincoat {
		/**Typ funkce*/
		oa_token_typ,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderGincprf.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterGincprf {
		/**Typ funkce*/
		pri_fun,
		/**Typ funkce*/
		pri_fun_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderGincpri.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterGincpri {
		/**Priorita*/
		priorita_max,
		/**Priorita*/
		priorita_max_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderGincstf.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterGincstf {
		/**Status funkce*/
		status_fun,
		/**Status funkce*/
		status_fun_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderGincufu.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterGincufu {
		/**Úroveň funkčního místa*/
		uroven_fun,
		/**Úrovně funkčních míst*/
		uroven_fun_txt,
		/**Aktivita záznamu dle gincakt*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderGinsspu.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterGinsspu {
		/**Spouštění událost*/
		ixs_spu,
		/**Zkratka*/
		zkratka,
		/**Název*/
		nazev,
		/**Aktivita záznamu dle gincakt*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\IGReaderGinszap.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterGinszap {
		/**Účel zpracování*/
		ixs_zap,
		/**Kategorie*/
		ktg_zap,
		/**Název*/
		nazev,
		/**Aktivita záznamu dle gincakt*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderAdmGincpbaDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpba*/
	interface GReaderAdmGincpbaDto {
		/**DBCOLUMN:gincpba.priz_ba - Příznak bezpečné autorizace*/
		priz_ba?: number|null;
		/**DBCOLUMN:gincpba.priz_ba_txt - popis*/
		priz_ba_txt?: string|null;
		/**DBCOLUMN:gincpba.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:gincpba.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**DBCOLUMN:gincpba.priz_ba_rsx -*/
		priz_ba_rsx?: number|null;
	}
	const enum GReaderAdmGincpbaDtoNames { priz_ba = "priz_ba", priz_ba_txt = "priz_ba_txt", k_v = "k_v", k_s = "k_s", priz_ba_rsx = "priz_ba_rsx",}
	const enum GReaderAdmGincpbaDtoFragments { priz_ba = "*", priz_ba_txt = "*", k_v = "*", k_s = "*", priz_ba_rsx = "*",}
	const enum GReaderAdmGincpbaDtoTypes { priz_ba = "number", priz_ba_txt = "string", k_v = "number", k_s = "string", priz_ba_rsx = "number",}
	const enum GReaderAdmGincpbaDtoTypeLengths { priz_ba_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderAdmGincrenDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincren*/
	interface GReaderAdmGincrenDto {
		/**DBCOLUMN:gincren.rezim_nakl - Režim nakládání*/
		rezim_nakl?: number|null;
		/**DBCOLUMN:gincren.rezim_nakl_txt - Režim nakládání*/
		rezim_nakl_txt?: string|null;
		/**DBCOLUMN:gincren.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:gincren.k_s - Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
		/**DBCOLUMN:gincren.rezim_nakl_rsx -*/
		rezim_nakl_rsx?: number|null;
	}
	const enum GReaderAdmGincrenDtoNames { rezim_nakl = "rezim_nakl", rezim_nakl_txt = "rezim_nakl_txt", k_v = "k_v", k_s = "k_s", rezim_nakl_rsx = "rezim_nakl_rsx",}
	const enum GReaderAdmGincrenDtoFragments { rezim_nakl = "*", rezim_nakl_txt = "*", k_v = "*", k_s = "*", rezim_nakl_rsx = "*",}
	const enum GReaderAdmGincrenDtoTypes { rezim_nakl = "number", rezim_nakl_txt = "string", k_v = "number", k_s = "string", rezim_nakl_rsx = "number",}
	const enum GReaderAdmGincrenDtoTypeLengths { rezim_nakl_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderAdmGinctaoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginctao*/
	interface GReaderAdmGinctaoDto {
		/**DBCOLUMN:ginctao.typ_aut_oauth -*/
		typ_aut_oauth?: number|null;
		/**DBCOLUMN:ginctao.typ_aut_oauth_txt -*/
		typ_aut_oauth_txt?: string|null;
		/**DBCOLUMN:ginctao.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:ginctao.k_s - Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GReaderAdmGinctaoDtoNames { typ_aut_oauth = "typ_aut_oauth", typ_aut_oauth_txt = "typ_aut_oauth_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderAdmGinctaoDtoFragments { typ_aut_oauth = "*", typ_aut_oauth_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderAdmGinctaoDtoTypes { typ_aut_oauth = "number", typ_aut_oauth_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderAdmGinctaoDtoTypeLengths { typ_aut_oauth_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderGincoatDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincoat*/
	interface GReaderGincoatDto {
		/**DBCOLUMN:gincoat.oa_token_typ -*/
		oa_token_typ?: number|null;
		/**DBCOLUMN:gincoat.oa_token_typ_txt -*/
		oa_token_typ_txt?: string|null;
		/**DBCOLUMN:gincoat.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:gincoat.k_s - Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GReaderGincoatDtoNames { oa_token_typ = "oa_token_typ", oa_token_typ_txt = "oa_token_typ_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderGincoatDtoFragments { oa_token_typ = "*", oa_token_typ_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderGincoatDtoTypes { oa_token_typ = "number", oa_token_typ_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderGincoatDtoTypeLengths { oa_token_typ_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderGincoseDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincose*/
	interface GReaderGincoseDto {
		/**DBCOLUMN:gincose.oauth_service -*/
		oauth_service?: number|null;
		/**DBCOLUMN:gincose.oauth_service_txt -*/
		oauth_service_txt?: string|null;
		/**DBCOLUMN:gincose.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:gincose.k_s - Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
	}
	const enum GReaderGincoseDtoNames { oauth_service = "oauth_service", oauth_service_txt = "oauth_service_txt", k_v = "k_v", k_s = "k_s",}
	const enum GReaderGincoseDtoFragments { oauth_service = "*", oauth_service_txt = "*", k_v = "*", k_s = "*",}
	const enum GReaderGincoseDtoTypes { oauth_service = "number", oauth_service_txt = "string", k_v = "number", k_s = "string",}
	const enum GReaderGincoseDtoTypeLengths { oauth_service_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderGincprfDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincprf*/
	interface GReaderGincprfDto {
		/**DBCOLUMN:gincprf.pri_fun - Typ funkce*/
		pri_fun?: number|null;
		/**DBCOLUMN:gincprf.pri_fun_txt - Typ funkce*/
		pri_fun_txt?: string|null;
	}
	const enum GReaderGincprfDtoNames { pri_fun = "pri_fun", pri_fun_txt = "pri_fun_txt",}
	const enum GReaderGincprfDtoFragments { pri_fun = "*", pri_fun_txt = "*",}
	const enum GReaderGincprfDtoTypes { pri_fun = "number", pri_fun_txt = "string",}
	const enum GReaderGincprfDtoTypeLengths { pri_fun_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderGincpriDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincpri*/
	interface GReaderGincpriDto {
		/**DBCOLUMN:gincpri.priorita_max - Priorita*/
		priorita_max?: number|null;
		/**DBCOLUMN:gincpri.priorita_max_txt - Priorita*/
		priorita_max_txt?: string|null;
	}
	const enum GReaderGincpriDtoNames { priorita_max = "priorita_max", priorita_max_txt = "priorita_max_txt",}
	const enum GReaderGincpriDtoFragments { priorita_max = "*", priorita_max_txt = "*",}
	const enum GReaderGincpriDtoTypes { priorita_max = "number", priorita_max_txt = "string",}
	const enum GReaderGincpriDtoTypeLengths { priorita_max_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderGincstfDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincstf*/
	interface GReaderGincstfDto {
		/**DBCOLUMN:gincstf.status_fun - Status funkce*/
		status_fun?: number|null;
		/**DBCOLUMN:gincstf.status_fun_txt - Status funkce*/
		status_fun_txt?: string|null;
	}
	const enum GReaderGincstfDtoNames { status_fun = "status_fun", status_fun_txt = "status_fun_txt",}
	const enum GReaderGincstfDtoFragments { status_fun = "*", status_fun_txt = "*",}
	const enum GReaderGincstfDtoTypes { status_fun = "number", status_fun_txt = "string",}
	const enum GReaderGincstfDtoTypeLengths { status_fun_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderGinctclDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginctcl*/
	interface GReaderAdmGinctclDto {
		/**DBCOLUMN:ginctcl.typ_cloudu -*/
		typ_cloudu?: number|null;
		/**DBCOLUMN:ginctcl.typ_cloudu_txt -*/
		typ_cloudu_txt?: string|null;
		/**DBCOLUMN:ginctcl.k_v - Váha pro třídění*/
		k_v?: number|null;
		/**DBCOLUMN:ginctcl.k_s - Symbolická konstanta (textová reprezentace číselníkové hodnoty)*/
		k_s?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GReaderAdmGinctclDtoNames { typ_cloudu = "typ_cloudu", typ_cloudu_txt = "typ_cloudu_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita",}
	const enum GReaderAdmGinctclDtoFragments { typ_cloudu = "*", typ_cloudu_txt = "*", k_v = "*", k_s = "*", aktivita = "*",}
	const enum GReaderAdmGinctclDtoTypes { typ_cloudu = "number", typ_cloudu_txt = "string", k_v = "number", k_s = "string", aktivita = "number",}
	const enum GReaderAdmGinctclDtoTypeLengths { typ_cloudu_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderGincufuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gincufu*/
	interface GReaderGincufuDto {
		/**DBCOLUMN:gincufu.uroven_fun - Úroveň funkčního místa*/
		uroven_fun?: number|null;
		/**DBCOLUMN:gincufu.uroven_fun_txt - Úrovně funkčních míst*/
		uroven_fun_txt?: string|null;
		/**DBCOLUMN:gincufu.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
	}
	const enum GReaderGincufuDtoNames { uroven_fun = "uroven_fun", uroven_fun_txt = "uroven_fun_txt", aktivita = "aktivita",}
	const enum GReaderGincufuDtoFragments { uroven_fun = "*", uroven_fun_txt = "*", aktivita = "*",}
	const enum GReaderGincufuDtoTypes { uroven_fun = "number", uroven_fun_txt = "string", aktivita = "number",}
	const enum GReaderGincufuDtoTypeLengths { uroven_fun_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderGinsspuDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginsspu*/
	interface GReaderGinsspuDto {
		/**DBCOLUMN:ginsspu.ixs_spu - Spouštění událost*/
		ixs_spu?: string|null;
		/**DBCOLUMN:ginsspu.zkratka - Zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsspu.nazev - Název*/
		nazev?: string|null;
		/**DBCOLUMN:ginsspu.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		ktg_spu?: number|null;
		ktg_spu_txt?: string|null;
	}
	const enum GReaderGinsspuDtoNames { ixs_spu = "ixs_spu", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita", ktg_spu = "ktg_spu", ktg_spu_txt = "ktg_spu_txt",}
	const enum GReaderGinsspuDtoFragments { ixs_spu = "*", zkratka = "*", nazev = "*", aktivita = "*", ktg_spu = "*", ktg_spu_txt = "*",}
	const enum GReaderGinsspuDtoTypes { ixs_spu = "string", zkratka = "string", nazev = "string", aktivita = "number", ktg_spu = "number", ktg_spu_txt = "string",}
	const enum GReaderGinsspuDtoTypeLengths { ixs_spu = 12, zkratka = 16, nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Gin\Dto\GReaderGinszapDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:ginszap*/
	interface GReaderGinszapDto {
		/**DBCOLUMN:ginszap.ixs_zap - Účel zpracování*/
		ixs_zap?: string|null;
		/**DBCOLUMN:ginszap.ktg_zap - Kategorie*/
		ktg_zap?: number|null;
		/**DBCOLUMN:ginszap.nazev - Název*/
		nazev?: string|null;
		/**DBCOLUMN:ginszap.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
	}
	const enum GReaderGinszapDtoNames { ixs_zap = "ixs_zap", ktg_zap = "ktg_zap", nazev = "nazev", aktivita = "aktivita",}
	const enum GReaderGinszapDtoFragments { ixs_zap = "*", ktg_zap = "*", nazev = "*", aktivita = "*",}
	const enum GReaderGinszapDtoTypes { ixs_zap = "string", ktg_zap = "number", nazev = "string", aktivita = "number",}
	const enum GReaderGinszapDtoTypeLengths { ixs_zap = 12, nazev = 1000,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGGincorj.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Gincorj*/
	const enum FilterGincorj {
		/**PK*/
		uroven_orj,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderAdmGinstre.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginstre*/
	const enum GFilterReaderAdmGinstre {
		/**PK číselníku*/
		ixs_tre,
		/**Název záznamu*/
		nazev,
		/**Příznak, zda se mají data filtrovat podle jejich vazby na ICO aktuálně nastavené
		*      v GPC nastavené pro uživatele a nebo IČO typu neurčeno (hodnoty: true/false)
		*      FFIALA,ADM
		*/
		GpcIcoOrSharedIco,
		/**Příznak, zda se mají data filtrovat podle jejich vazby na zadané ICO a nebo IČO
		*     typu neurčeno FFIALA,ADM
		*/
		IcoOrSharedIco,
		/**Na sloupec ICO*/
		ico,
		/**Na ID externího systému*/
		ixs_ext_ess,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderAdmInterniSubjekt.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Rozšířená verze interního subjektu*/
	interface GGinsesuExtDto extends Gordic.Adm.Interface.GGinsesuDto {
		/**Priz hlavni txt*/
		priz_hlavni_txt?: string|null;
	}
	const enum GGinsesuExtDtoNames { priz_hlavni_txt = "priz_hlavni_txt", ixs_esu = "ixs_esu", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", ob_jmeno = "ob_jmeno", typ_esu = "typ_esu", stupen_ver = "stupen_ver", ixs_nad = "ixs_nad", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", ico = "ico", dic = "dic", tel = "tel", mail = "mail", fax = "fax", ixs_su = "ixs_su", priz_eko = "priz_eko", priz_int = "priz_int", num_pod = "num_pod", num_zast = "num_zast", cs_nazev = "cs_nazev", cs_zkratka = "cs_zkratka", typ_org = "typ_org", dat_mpd = "dat_mpd", cs_ulice = "cs_ulice", cs_obec = "cs_obec", esu_txt = "esu_txt", rc = "rc", ixs_prev = "ixs_prev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", pobox = "pobox", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", priz_vp = "priz_vp", ixs_puv = "ixs_puv", ixs_obj = "ixs_obj", ixs_adr = "ixs_adr", ixs_org = "ixs_org", ixs_oso = "ixs_oso", ixs_eko = "ixs_eko", ur_pri = "ur_pri", adresa_kod = "adresa_kod", priz_dph = "priz_dph", st0 = "st0", pco = "pco", z_int = "z_int", typ_ag = "typ_ag", neakt_oba_int = "neakt_oba_int", dat_nar = "dat_nar", bio = "bio", url = "url", typ_upadku = "typ_upadku", dat_akt_rob = "dat_akt_rob", kod_o = "kod_o", stat_sp = "stat_sp", gps_sirka = "gps_sirka", gps_delka = "gps_delka", priz_umrti = "priz_umrti", dat_umrti = "dat_umrti", ixs_lpc = "ixs_lpc", oc = "oc", pohlavi = "pohlavi", rod_stav = "rod_stav", typ_adr = "typ_adr", s_pruk = "s_pruk", rod_prijmeni = "rod_prijmeni", misto_nar = "misto_nar", prezdivka = "prezdivka", ixs_esu_zam = "ixs_esu_zam", id_ds = "id_ds", id_gex = "id_gex", partner_uct = "partner_uct", mi_jmeno = "mi_jmeno", mi_prijmeni = "mi_prijmeni", up_nazev = "up_nazev", up_prijmeni = "up_prijmeni",}
	const enum GGinsesuExtDtoFragments { priz_hlavni_txt = "*", ixs_esu = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", ob_jmeno = "*", typ_esu = "*", stupen_ver = "*", ixs_nad = "*", stat = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", ico = "*", dic = "*", tel = "*", mail = "*", fax = "*", ixs_su = "*", priz_eko = "*", priz_int = "*", num_pod = "*", num_zast = "*", cs_nazev = "*", cs_zkratka = "*", typ_org = "*", dat_mpd = "*", cs_ulice = "*", cs_obec = "*", esu_txt = "*", rc = "*", ixs_prev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", pobox = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", priz_vp = "*", ixs_puv = "*", ixs_obj = "*", ixs_adr = "*", ixs_org = "*", ixs_oso = "*", ixs_eko = "*", ur_pri = "*", adresa_kod = "*", priz_dph = "*", st0 = "*", pco = "*", z_int = "*", typ_ag = "*", neakt_oba_int = "*", dat_nar = "*", bio = "*", url = "*", typ_upadku = "*", dat_akt_rob = "*", kod_o = "*", stat_sp = "*", gps_sirka = "*", gps_delka = "*", priz_umrti = "*", dat_umrti = "*", ixs_lpc = "*", oc = "*", pohlavi = "*", rod_stav = "*", typ_adr = "*", s_pruk = "*", rod_prijmeni = "*", misto_nar = "*", prezdivka = "*", ixs_esu_zam = "*", id_ds = "*", id_gex = "*", partner_uct = "*", mi_jmeno = "*", mi_prijmeni = "*", up_nazev = "*", up_prijmeni = "*",}
	const enum GGinsesuExtDtoTypes { priz_hlavni_txt = "string", ixs_esu = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", ob_jmeno = "string", typ_esu = "number", stupen_ver = "number", ixs_nad = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", ico = "string", dic = "string", tel = "string", mail = "string", fax = "string", ixs_su = "string", priz_eko = "number", priz_int = "number", num_pod = "number", num_zast = "number", cs_nazev = "string", cs_zkratka = "string", typ_org = "number", dat_mpd = "JsonDate", cs_ulice = "string", cs_obec = "string", esu_txt = "string", rc = "string", ixs_prev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", pobox = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", priz_vp = "number", ixs_puv = "string", ixs_obj = "string", ixs_adr = "string", ixs_org = "string", ixs_oso = "string", ixs_eko = "string", ur_pri = "number", adresa_kod = "string", priz_dph = "number", st0 = "string", pco = "number", z_int = "number", typ_ag = "number", neakt_oba_int = "number", dat_nar = "JsonDate", bio = "JsonDecimal", url = "string", typ_upadku = "number", dat_akt_rob = "JsonDate", kod_o = "number", stat_sp = "number", gps_sirka = "string", gps_delka = "string", priz_umrti = "number", dat_umrti = "JsonDate", ixs_lpc = "string", oc = "string", pohlavi = "number", rod_stav = "number", typ_adr = "number", s_pruk = "number", rod_prijmeni = "string", misto_nar = "string", prezdivka = "string", ixs_esu_zam = "string", id_ds = "string", id_gex = "string", partner_uct = "string", mi_jmeno = "string", mi_prijmeni = "string", up_nazev = "string", up_prijmeni = "string",}
	const enum GGinsesuExtDtoTypeLengths { ixs_esu = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 100, ob_jmeno = 254, ixs_nad = 12, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, ico = 14, dic = 15, tel = 33, mail = 254, fax = 33, ixs_su = 12, cs_nazev = 100, cs_zkratka = 16, cs_ulice = 30, cs_obec = 30, esu_txt = 254, rc = 10, ixs_prev = 12, jmeno = 24, prijmeni = 36, tit_pred = 35, tit_za = 35, pobox = 8, st1 = 50, st2 = 50, st3 = 50, st4 = 50, st5 = 50, st6 = 50, st7 = 50, ixs_puv = 12, ixs_obj = 12, ixs_adr = 12, ixs_org = 12, ixs_oso = 12, ixs_eko = 12, adresa_kod = 10, st0 = 50, url = 254, gps_sirka = 12, gps_delka = 12, ixs_lpc = 12, oc = 30, rod_prijmeni = 36, misto_nar = 48, prezdivka = 254, ixs_esu_zam = 12, id_ds = 100, id_gex = 100, partner_uct = 10, mi_jmeno = 24, mi_prijmeni = 36, up_nazev = 100, up_prijmeni = 36,}
	/**Filtrační parametry*/
	const enum FilterReaderAdmInterniSubjekt {
		/**Intern9 subjekt*/
		ixs_esu,
		/**Příznak, zda se mají data filtrovat podle jejich vazby na ICO aktuálně nastavené
		*      v GPC nastavené pro uživatele a nebo IČO typu neurčeno (hodnoty: true/false)
		*      FFIALA,ADM
		*/
		GpcIcoOrSharedIco,
		/**Příznak, zda se mají data filtrovat podle jejich vazby na zadané ICO a nebo IČO
		*     typu neurčeno FFIALA,ADM
		*/
		IcoOrSharedIco,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderDbLogins.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginspar*/
	const enum GFilterReaderDbLogins {
		/**PK - login*/
		name,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGincaut.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku gincaut*/
	const enum GFilterReaderGincaut {
		/**PK číselníku*/
		typ_aute,
	}
	/**DBTABLE:gincaut*/
	interface GReaderGincautDto {
		/**DBCOLUMN:gincaut.typ_aute*/
		typ_aute?: number|null;
		/**DBCOLUMN:gincaut.typ_aute_txt*/
		typ_aute_txt?: string|null;
	}
	const enum GReaderGincautDtoNames { typ_aute = "typ_aute", typ_aute_txt = "typ_aute_txt",}
	const enum GReaderGincautDtoFragments { typ_aute = "*", typ_aute_txt = "*",}
	const enum GReaderGincautDtoTypes { typ_aute = "number", typ_aute_txt = "string",}
	const enum GReaderGincautDtoTypeLengths { typ_aute_txt = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGinccfg.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginstau*/
	const enum GFilterReaderGinccfg {
		/**PK číselníku*/
		uroven_cfg,
		/**Pouze platné*/
		pouze_platne,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGinccst.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginccst*/
	const enum GFilterReaderGinccst {
		/**PK číselníku*/
		csas_type,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGincdat.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginctvp*/
	const enum GFilterReaderGincdat {
		/**PK číselníku*/
		dat_typ,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGincevn.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku gincevn*/
	const enum GFilterReaderGincevn {
		/**PK číselníku*/
		ktg_evn,
	}
	/**DBTABLE:gincevn*/
	interface GReaderGincevnDto {
		/**DBCOLUMN:gincaut.ktg_evn*/
		ktg_evn?: number|null;
		/**DBCOLUMN:gincaut.ktg_evn_txt*/
		ktg_evn_txt?: string|null;
	}
	const enum GReaderGincevnDtoNames { ktg_evn = "ktg_evn", ktg_evn_txt = "ktg_evn_txt",}
	const enum GReaderGincevnDtoFragments { ktg_evn = "*", ktg_evn_txt = "*",}
	const enum GReaderGincevnDtoTypes { ktg_evn = "number", ktg_evn_txt = "string",}
	const enum GReaderGincevnDtoTypeLengths { ktg_evn_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGinchop.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginchop*/
	const enum GFilterReaderGinchop {
		/**PK číselníku*/
		param,
		/**PK*/
		config,
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGincmbx.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Gincmbx*/
	const enum GFilterReaderGincmbx {
		/**PK číselníku*/
		typ_mbx,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGincpar.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginspar*/
	const enum GFilterReaderGincpar {
		/**PK číselníku*/
		param,
		/**Aktivita*/
		aktivita,
		/**Úroveň, pro kterou se má parametr nastavovat*/
		uroven_cfg,
		/**faze*/
		faze,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGinctau.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginstau*/
	const enum GFilterReaderGinctau {
		/**PK číselníku*/
		typ_aut,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGinctvp.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginctvp*/
	const enum GFilterReaderGinctvp {
		/**PK číselníku*/
		typ_vla,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGincuvl.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginstau*/
	const enum GFilterReaderGincuvl {
		/**PK číselníku*/
		uroven_vla,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGincvau.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Gincvau*/
	const enum GFilterReaderGincvau {
		/**PK číselníku*/
		typ_vau,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGinsins.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginsins*/
	const enum GFilterReaderGinsins {
		/**PK číselníku*/
		ixs_ins,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderGinssta.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filter pro stanice*/
	const enum FilterGinssta {
		/**PK*/
		ip_adr,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderSslcpco.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginstau*/
	const enum GFilterReaderSslcpco {
		/**PK číselníku*/
		priz_cj_only,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderSslsump.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Sslsump*/
	const enum GFilterReaderSslsump {
		/**PK číselníku*/
		umisteni,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderWflcpak.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Wflcpak*/
	const enum GFilterReaderWflcpak {
		/**PK číselníku*/
		priz_akr,
	}
	/**DBTABLE:wflcpak*/
	interface GReaderWflcpakDto {
		/**DBCOLUMN:wflcpak.priz_akr*/
		priz_akr?: number|null;
		/**DBCOLUMN:wflcpak.priz_akr_txt*/
		priz_akr_txt?: string|null;
	}
	const enum GReaderWflcpakDtoNames { priz_akr = "priz_akr", priz_akr_txt = "priz_akr_txt",}
	const enum GReaderWflcpakDtoFragments { priz_akr = "*", priz_akr_txt = "*",}
	const enum GReaderWflcpakDtoTypes { priz_akr = "number", priz_akr_txt = "string",}
	const enum GReaderWflcpakDtoTypeLengths { priz_akr_txt = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\GinReaders\IGReaderWindowsLogins.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Ginspar*/
	const enum GFilterReaderWindowsLogins {
		/**PK - login*/
		name,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Int\IGReaderIntcpes.d.ts 

declare namespace Gordic.Adm.Interface {
	/**GFilterIntcpes*/
	const enum GFilterIntcpes {
		/**priz_ess*/
		priz_ess,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Pravidlo\GAdmGdessloDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gdesslo*/
	interface GAdmGdessloDto {
		/**Jméno DB tabulky bez vlastníka*/
		tabulka?: string|null;
		/**Fyzické jméno databázového sloupce*/
		sloupec?: string|null;
		/**Datový typ sloupce ve formátu INFOMRIX*/
		datovy_typ?: string|null;
		/**Příznak, že sloupec neumožňuje uložení NULL hodnoty.*/
		not_null?: number|null;
		/**Výchozí hodnota hodnoty sloupce ve formáítu INFORMIX*/
		default_hodnota?: string|null;
		/**Popiska sloupce/položky, určený pro zobrazení v aplikacích.*/
		nazev?: string|null;
		/**Zkrácený popis sloupce určený pro zobrazení v aplikacích*/
		zkratka?: string|null;
		/**Upřesňující poznámka ke sloupci*/
		poznamka?: string|null;
		/**Podrobný popis významu DB sloupce*/
		popis?: string|null;
		/**Datum vzniku sloupce*/
		dat_od?: JsonDate|null;
		/**Datum odstranění sloupce*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:gdesslo.verze_db_od*/
		verze_db_od?: string|null;
		/**DBCOLUMN:gdesslo.verze_db_do*/
		verze_db_do?: string|null;
		/**Osobní číslo autora popisu / garanta dané položky*/
		orj_autor?: string|null;
		/**Poznámka autora/garanta položky*/
		pozn_autor?: string|null;
		/**DBCOLUMN:gdesslo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdesslo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdesslo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Fyzické pořadí slouce v DB tabulce*/
		poradi?: number|null;
		/**Příznak, že sloupec je označen ke zrušení*/
		priz_obsolete?: number|null;
		/**Pořadové číslo sloupce v rámci primárního klíče.*/
		poradi_pk?: number|null;
		/**Lisdký popis požadavků na formát zadaných dat -*/
		format_obsahu?: string|null;
		/**Popis pravidel, která musí zadaná data splňovat. Zde se uvásí pravidla, která nelze zadat pomocí struktury databázové tabulky.*/
		pravidla_obsahu?: string|null;
		/**Jedná se o špinavá data - je to pouze náhled na začátek RTF dlouhého popisu ve formátu TXT*/
		popis_long?: string|null;
		/**Pokud jsou některá popisná data tohoto sloupce převzata ze vzorového sloupce, potom zde je uvedeno jméno vzorového sloupce.*/
		sloupec_vzor?: string|null;
		/**TAGy*/
		kl_slova?: string|null;
		/**ID resx pro label sloupce pro lokalizační tabulky*/
		data_name_id?: number|null;
		/**DBCOLUMN:gdesslo.business_object*/
		business_object?: string|null;
	}
	const enum GAdmGdessloDtoNames { tabulka = "tabulka", sloupec = "sloupec", datovy_typ = "datovy_typ", not_null = "not_null", default_hodnota = "default_hodnota", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", popis = "popis", dat_od = "dat_od", dat_do = "dat_do", verze_db_od = "verze_db_od", verze_db_do = "verze_db_do", orj_autor = "orj_autor", pozn_autor = "pozn_autor", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poradi = "poradi", priz_obsolete = "priz_obsolete", poradi_pk = "poradi_pk", format_obsahu = "format_obsahu", pravidla_obsahu = "pravidla_obsahu", popis_long = "popis_long", sloupec_vzor = "sloupec_vzor", kl_slova = "kl_slova", data_name_id = "data_name_id", business_object = "business_object",}
	const enum GAdmGdessloDtoFragments { tabulka = "*", sloupec = "*", datovy_typ = "*", not_null = "*", default_hodnota = "*", nazev = "*", zkratka = "*", poznamka = "*", popis = "*", dat_od = "*", dat_do = "*", verze_db_od = "*", verze_db_do = "*", orj_autor = "*", pozn_autor = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", poradi = "*", priz_obsolete = "*", poradi_pk = "*", format_obsahu = "*", pravidla_obsahu = "*", popis_long = "*", sloupec_vzor = "*", kl_slova = "*", data_name_id = "*", business_object = "*",}
	const enum GAdmGdessloDtoTypes { tabulka = "string", sloupec = "string", datovy_typ = "string", not_null = "number", default_hodnota = "string", nazev = "string", zkratka = "string", poznamka = "string", popis = "string", dat_od = "JsonDate", dat_do = "JsonDate", verze_db_od = "string", verze_db_do = "string", orj_autor = "string", pozn_autor = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", poradi = "number", priz_obsolete = "number", poradi_pk = "number", format_obsahu = "string", pravidla_obsahu = "string", popis_long = "string", sloupec_vzor = "string", kl_slova = "string", data_name_id = "number", business_object = "string",}
	const enum GAdmGdessloDtoTypeLengths { tabulka = 18, sloupec = 18, datovy_typ = 254, default_hodnota = 254, nazev = 254, zkratka = 16, poznamka = 254, popis = 4000, verze_db_od = 12, verze_db_do = 12, orj_autor = 4, pozn_autor = 254, zmenu_prov = 12, format_obsahu = 254, pravidla_obsahu = 254, popis_long = 4000, sloupec_vzor = 18, kl_slova = 1000, business_object = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Pravidlo\GAdmGdestabDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gdestab*/
	interface GAdmGdestabDto {
		/**Skutečné, fyzické jméno databázové tabulky*/
		tabulka?: string|null;
		/**Databázový submodel do kterého tabulka patří*/
		submodel?: string|null;
		/**Lidské pojmenování DB tabulky*/
		nazev?: string|null;
		/**DBCOLUMN:gdestab.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:gdestab.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdestab.popis*/
		popis?: string|null;
		/**DBCOLUMN:gdestab.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:gdestab.dat_do*/
		dat_do?: JsonDate|null;
		/**Verze databáze vzniku tabulky ve formátu 382.01.24*/
		verze_db_od?: string|null;
		/**DBCOLUMN:gdestab.verze_db_do*/
		verze_db_do?: string|null;
		/**DBCOLUMN:gdestab.orj_autor*/
		orj_autor?: string|null;
		/**DBCOLUMN:gdestab.pozn_autor*/
		pozn_autor?: string|null;
		/**DBCOLUMN:gdestab.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdestab.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdestab.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Příznak pro plánované odstranění tabulky*/
		priz_obsolete?: number|null;
		/**DBCOLUMN:gdestab.kl_slova*/
		kl_slova?: string|null;
		/**DBCOLUMN:gdestab.domain*/
		domain?: string|null;
		/**Označení objektu v rámci ISL*/
		business_object?: string|null;
		/**SQL výraz, který zobrazí uživatelský sloupec popisující/vystihující záznam.*/
		user_exression?: string|null;
		/**Interní ID typu objektu vedeného v IS GINIS. Odkazuje do gincobj.*/
		typ_obj?: number|null;
		/**DBCOLUMN:gdestab.data_name_id*/
		data_name_id?: number|null;
		/**DBCOLUMN:gdestab.tab_owner*/
		tab_owner?: string|null;
		/**DBCOLUMN:gdestab.pk_name*/
		pk_name?: string|null;
	}
	const enum GAdmGdestabDtoNames { tabulka = "tabulka", submodel = "submodel", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", popis = "popis", dat_od = "dat_od", dat_do = "dat_do", verze_db_od = "verze_db_od", verze_db_do = "verze_db_do", orj_autor = "orj_autor", pozn_autor = "pozn_autor", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_obsolete = "priz_obsolete", kl_slova = "kl_slova", domain = "domain", business_object = "business_object", user_exression = "user_exression", typ_obj = "typ_obj", data_name_id = "data_name_id", tab_owner = "tab_owner", pk_name = "pk_name",}
	const enum GAdmGdestabDtoFragments { tabulka = "*", submodel = "*", nazev = "*", zkratka = "*", poznamka = "*", popis = "*", dat_od = "*", dat_do = "*", verze_db_od = "*", verze_db_do = "*", orj_autor = "*", pozn_autor = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", priz_obsolete = "*", kl_slova = "*", domain = "*", business_object = "*", user_exression = "*", typ_obj = "*", data_name_id = "*", tab_owner = "*", pk_name = "*",}
	const enum GAdmGdestabDtoTypes { tabulka = "string", submodel = "string", nazev = "string", zkratka = "string", poznamka = "string", popis = "string", dat_od = "JsonDate", dat_do = "JsonDate", verze_db_od = "string", verze_db_do = "string", orj_autor = "string", pozn_autor = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", priz_obsolete = "number", kl_slova = "string", domain = "string", business_object = "string", user_exression = "string", typ_obj = "number", data_name_id = "number", tab_owner = "string", pk_name = "string",}
	const enum GAdmGdestabDtoTypeLengths { tabulka = 18, submodel = 3, nazev = 254, zkratka = 16, poznamka = 254, popis = 4000, verze_db_od = 12, verze_db_do = 12, orj_autor = 4, pozn_autor = 254, zmenu_prov = 12, kl_slova = 1000, domain = 254, business_object = 254, user_exression = 254, tab_owner = 30, pk_name = 18,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Pravidlo\GAdmGdevpraDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:gdevpra*/
	interface GAdmGdevpraDto {
		/**DBCOLUMN:gdevpra.pravidlo_id*/
		pravidlo_id?: number|null;
		/**DBCOLUMN:gdevpra.tabulka*/
		tabulka?: string|null;
		/**DBCOLUMN:gdevpra.sloupec*/
		sloupec?: string|null;
		/**DBCOLUMN:gdevpra.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:gdevpra.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:gdevpra.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:gdevpra.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GAdmGdevpraDtoNames { pravidlo_id = "pravidlo_id", tabulka = "tabulka", sloupec = "sloupec", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GAdmGdevpraDtoFragments { pravidlo_id = "*", tabulka = "*", sloupec = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GAdmGdevpraDtoTypes { pravidlo_id = "number", tabulka = "string", sloupec = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GAdmGdevpraDtoTypeLengths { tabulka = 18, sloupec = 18, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\IGReaderAdmSsldden.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmSsldden {
		/**Deník SSL*/
		sslden,
		/**Rok*/
		rok,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\IGReaderAdmSslsspz - Copy.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmSslcstu {
		/**Stav uzavření*/
		stav_uzav,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\IGReaderAdmSslsspz.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmSslsspz {
		/**Spisový plán*/
		spis_pl,
		/**Plně určený spisový znak*/
		spis_znak,
		/**Aktivita záznamu dle gincakt*/
		aktivita,
		/**Příznak, že se má z DB načíst a vypočítat následující podřízený znak, který je na řadě pro další zakládání.*/
		ComputeNextChildSpisZnak,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\IGReaderSslcpfy.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterSslcpfy {
		/**Forma dokumentu*/
		priz_fyz,
		/**Forma dokumentu*/
		priz_fyz_txt,
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v,
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s,
		priz_fyz_rsx,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\IGReaderSslcusz.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterSslcusz {
		/**Určení spis.znaku*/
		urceni_spis_z,
		/**Určení spis.znaku*/
		urceni_spis_z_txt,
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v,
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s,
		urceni_spis_z_rsx,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\IGReaderSslsden.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterSslsden {
		/**Deník SSL*/
		sslden,
		/**Aktivita záznamu dle gincakt*/
		aktivita,
		/**Název deníku*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\IGReaderSslsspl.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterSslsspl {
		/**Spisový plán*/
		spis_pl,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\IGReaderSslsspz.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterSslsspz {
		/**Spisový plán*/
		spis_pl,
		/**Plně určený spisový znak*/
		spis_znak,
		/**Aktivita záznamu dle gincakt*/
		aktivita,
		/**Příznak, že se má z DB načíst a vypočítat následující podřízený znak, který je na řadě pro další zakládání.*/
		ComputeNextChildSpisZnak,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\Dto\GReaderAdmSslsspzDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslsspz*/
	interface GReaderAdmSslsspzDto {
		/**DBCOLUMN:sslsspz.spis_pl - Spisový plán*/
		spis_pl?: string|null;
		/**DBCOLUMN:sslsspz.spis_znak - Plně určený spisový znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:sslsspz.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**DBCOLUMN:sslsspz.nazev - název spisového znaku*/
		nazev?: string|null;
		/**Teoretický další spisový znak, který by se měl vygenerovat pro tento nadřízený spisový znak.  Vypočte se na základě nejvyššího spisového znaku, přírůstku a výchozího oddělovače. Tato položka se použije pro předplnění nového znaku podle nadřízeného znaku*/
		spis_znak_pod_next?: string|null;
		/**Skartační režim*/
		ixs_skr?: string|null;
	}
	const enum GReaderAdmSslsspzDtoNames { spis_pl = "spis_pl", spis_znak = "spis_znak", aktivita = "aktivita", nazev = "nazev", spis_znak_pod_next = "spis_znak_pod_next", ixs_skr = "ixs_skr",}
	const enum GReaderAdmSslsspzDtoFragments { spis_pl = "*", spis_znak = "*", aktivita = "*", nazev = "*", spis_znak_pod_next = "*", ixs_skr = "*",}
	const enum GReaderAdmSslsspzDtoTypes { spis_pl = "string", spis_znak = "string", aktivita = "number", nazev = "string", spis_znak_pod_next = "string", ixs_skr = "string",}
	const enum GReaderAdmSslsspzDtoTypeLengths { spis_pl = 5, spis_znak = 50, nazev = 100, spis_znak_pod_next = 50, ixs_skr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\Dto\GReaderSslcpfyDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslcpfy*/
	interface GReaderSslcpfyDto {
		/**DBCOLUMN:sslcpfy.priz_fyz - Forma dokumentu*/
		priz_fyz?: number|null;
		/**DBCOLUMN:sslcpfy.priz_fyz_txt - Forma dokumentu*/
		priz_fyz_txt?: string|null;
		/**DBCOLUMN:sslcpfy.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:sslcpfy.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**DBCOLUMN:sslcpfy.priz_fyz_rsx -*/
		priz_fyz_rsx?: number|null;
	}
	const enum GReaderSslcpfyDtoNames { priz_fyz = "priz_fyz", priz_fyz_txt = "priz_fyz_txt", k_v = "k_v", k_s = "k_s", priz_fyz_rsx = "priz_fyz_rsx",}
	const enum GReaderSslcpfyDtoFragments { priz_fyz = "*", priz_fyz_txt = "*", k_v = "*", k_s = "*", priz_fyz_rsx = "*",}
	const enum GReaderSslcpfyDtoTypes { priz_fyz = "number", priz_fyz_txt = "string", k_v = "number", k_s = "string", priz_fyz_rsx = "number",}
	const enum GReaderSslcpfyDtoTypeLengths { priz_fyz_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\Dto\GReaderSslcuszDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslcusz*/
	interface GReaderSslcuszDto {
		/**DBCOLUMN:sslcusz.urceni_spis_z - Určení spis.znaku*/
		urceni_spis_z?: number|null;
		/**DBCOLUMN:sslcusz.urceni_spis_z_txt - Určení spis.znaku*/
		urceni_spis_z_txt?: string|null;
		/**DBCOLUMN:sslcusz.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:sslcusz.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**DBCOLUMN:sslcusz.urceni_spis_z_rsx -*/
		urceni_spis_z_rsx?: number|null;
	}
	const enum GReaderSslcuszDtoNames { urceni_spis_z = "urceni_spis_z", urceni_spis_z_txt = "urceni_spis_z_txt", k_v = "k_v", k_s = "k_s", urceni_spis_z_rsx = "urceni_spis_z_rsx",}
	const enum GReaderSslcuszDtoFragments { urceni_spis_z = "*", urceni_spis_z_txt = "*", k_v = "*", k_s = "*", urceni_spis_z_rsx = "*",}
	const enum GReaderSslcuszDtoTypes { urceni_spis_z = "number", urceni_spis_z_txt = "string", k_v = "number", k_s = "string", urceni_spis_z_rsx = "number",}
	const enum GReaderSslcuszDtoTypeLengths { urceni_spis_z_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\Dto\GReaderSslsdenDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslsden*/
	interface GReaderSslsdenDto {
		/**DBCOLUMN:sslsden.sslden - Deník SSL*/
		sslden?: string|null;
		/**DBCOLUMN:sslsden.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**DBCOLUMN:sslsden.nazev - Název deníku*/
		nazev?: string|null;
	}
	const enum GReaderSslsdenDtoNames { sslden = "sslden", aktivita = "aktivita", nazev = "nazev",}
	const enum GReaderSslsdenDtoFragments { sslden = "*", aktivita = "*", nazev = "*",}
	const enum GReaderSslsdenDtoTypes { sslden = "string", aktivita = "number", nazev = "string",}
	const enum GReaderSslsdenDtoTypeLengths { sslden = 7, nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\Dto\GReaderSslssplDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslsspl*/
	interface GReaderSslssplDto {
		/**DBCOLUMN:sslsspl.spis_pl - Spisový plán*/
		spis_pl?: string|null;
		/**DBCOLUMN:sslsspl.aktivita - Aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:sslsspl.nazev - Název*/
		nazev?: string|null;
	}
	const enum GReaderSslssplDtoNames { spis_pl = "spis_pl", aktivita = "aktivita", nazev = "nazev",}
	const enum GReaderSslssplDtoFragments { spis_pl = "*", aktivita = "*", nazev = "*",}
	const enum GReaderSslssplDtoTypes { spis_pl = "string", aktivita = "number", nazev = "string",}
	const enum GReaderSslssplDtoTypeLengths { spis_pl = 5, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Ssl\Dto\GReaderSslsspzDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:sslsspz*/
	interface GReaderSslsspzDto {
		/**DBCOLUMN:sslsspz.spis_pl - Spisový plán*/
		spis_pl?: string|null;
		/**DBCOLUMN:sslsspz.spis_znak - Plně určený spisový znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:sslsspz.aktivita - Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**DBCOLUMN:sslsspz.nazev - název spisového znaku*/
		nazev?: string|null;
		/**Teoretický další spisový znak, který by se měl vygenerovat pro tento nadřízený spisový znak.  Vypočte se na základě nejvyššího spisového znaku, přírůstku a výchozího oddělovače. Tato položka se použije pro předplnění nového znaku podle nadřízeného znaku*/
		spis_znak_pod_next?: string|null;
	}
	const enum GReaderSslsspzDtoNames { spis_pl = "spis_pl", spis_znak = "spis_znak", aktivita = "aktivita", nazev = "nazev", spis_znak_pod_next = "spis_znak_pod_next",}
	const enum GReaderSslsspzDtoFragments { spis_pl = "*", spis_znak = "*", aktivita = "*", nazev = "*", spis_znak_pod_next = "*",}
	const enum GReaderSslsspzDtoTypes { spis_pl = "string", spis_znak = "string", aktivita = "number", nazev = "string", spis_znak_pod_next = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\GWflsfskDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflsfsk*/
	interface GWflsfskDto {
		/**DBCOLUMN:wflsfsk.ixs_fsk*/
		ixs_fsk?: string|null;
		/**DBCOLUMN:wflsfsk.eform_id*/
		eform_id?: string|null;
		/**DBCOLUMN:wflsfsk.eformversion*/
		eformversion?: string|null;
		/**DBCOLUMN:wflsfsk.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:wflsfsk.typ_zarazeni*/
		typ_zarazeni?: number|null;
		/**DBCOLUMN:wflsfsk.ixb_xslt_default*/
		ixb_xslt_default?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xslt_ro*/
		ixb_xslt_ro?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xml_edoc*/
		ixb_xml_edoc?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xslt_html*/
		ixb_xslt_html?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xsl_fo*/
		ixb_xsl_fo?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_posp*/
		ixb_posp?: string|null;
		/**DBCOLUMN:wflsfsk.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:wflsfsk.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:wflsfsk.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xml_dct*/
		ixb_xml_dct?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xml_nat*/
		ixb_xml_nat?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xsd_nat*/
		ixb_xsd_nat?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xml_mtd*/
		ixb_xml_mtd?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_html_form*/
		ixb_html_form?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xslt_sb*/
		ixb_xslt_sb?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xsd_edoc*/
		ixb_xsd_edoc?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xslt_nat_edoc*/
		ixb_xslt_nat_edoc?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xslt_edoc_nat*/
		ixb_xslt_edoc_nat?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xml_map*/
		ixb_xml_map?: string|null;
		/**DBCOLUMN:wflsfsk.ixb_xml_edd*/
		ixb_xml_edd?: string|null;
		ixs_slo?: string|null;
		ixs_fsk_do?: string|null;
		/**priz_xml_pril_pod*/
		priz_xml_pril_pod?: number|null;
	}
	const enum GWflsfskDtoNames { ixs_fsk = "ixs_fsk", eform_id = "eform_id", eformversion = "eformversion", nazev = "nazev", typ_zarazeni = "typ_zarazeni", ixb_xslt_default = "ixb_xslt_default", ixb_xslt_ro = "ixb_xslt_ro", ixb_xml_edoc = "ixb_xml_edoc", ixb_xslt_html = "ixb_xslt_html", ixb_xsl_fo = "ixb_xsl_fo", ixb_posp = "ixb_posp", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixb_xml_dct = "ixb_xml_dct", ixb_xml_nat = "ixb_xml_nat", ixb_xsd_nat = "ixb_xsd_nat", ixb_xml_mtd = "ixb_xml_mtd", ixb_html_form = "ixb_html_form", ixb_xslt_sb = "ixb_xslt_sb", ixb_xsd_edoc = "ixb_xsd_edoc", ixb_xslt_nat_edoc = "ixb_xslt_nat_edoc", ixb_xslt_edoc_nat = "ixb_xslt_edoc_nat", ixb_xml_map = "ixb_xml_map", ixb_xml_edd = "ixb_xml_edd", ixs_slo = "ixs_slo", ixs_fsk_do = "ixs_fsk_do", priz_xml_pril_pod = "priz_xml_pril_pod",}
	const enum GWflsfskDtoFragments { ixs_fsk = "*", eform_id = "*", eformversion = "*", nazev = "*", typ_zarazeni = "*", ixb_xslt_default = "*", ixb_xslt_ro = "*", ixb_xml_edoc = "*", ixb_xslt_html = "*", ixb_xsl_fo = "*", ixb_posp = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixb_xml_dct = "*", ixb_xml_nat = "*", ixb_xsd_nat = "*", ixb_xml_mtd = "*", ixb_html_form = "*", ixb_xslt_sb = "*", ixb_xsd_edoc = "*", ixb_xslt_nat_edoc = "*", ixb_xslt_edoc_nat = "*", ixb_xml_map = "*", ixb_xml_edd = "*", ixs_slo = "*", ixs_fsk_do = "*", priz_xml_pril_pod = "*",}
	const enum GWflsfskDtoTypes { ixs_fsk = "string", eform_id = "string", eformversion = "string", nazev = "string", typ_zarazeni = "number", ixb_xslt_default = "string", ixb_xslt_ro = "string", ixb_xml_edoc = "string", ixb_xslt_html = "string", ixb_xsl_fo = "string", ixb_posp = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixb_xml_dct = "string", ixb_xml_nat = "string", ixb_xsd_nat = "string", ixb_xml_mtd = "string", ixb_html_form = "string", ixb_xslt_sb = "string", ixb_xsd_edoc = "string", ixb_xslt_nat_edoc = "string", ixb_xslt_edoc_nat = "string", ixb_xml_map = "string", ixb_xml_edd = "string", ixs_slo = "string", ixs_fsk_do = "string", priz_xml_pril_pod = "number",}
	const enum GWflsfskDtoTypeLengths { ixs_fsk = 12, eform_id = 254, eformversion = 100, nazev = 254, ixb_xslt_default = 12, ixb_xslt_ro = 12, ixb_xml_edoc = 12, ixb_xslt_html = 12, ixb_xsl_fo = 12, ixb_posp = 12, zmenu_prov = 12, ixb_xml_dct = 12, ixb_xml_nat = 12, ixb_xsd_nat = 12, ixb_xml_mtd = 12, ixb_html_form = 12, ixb_xslt_sb = 12, ixb_xsd_edoc = 12, ixb_xslt_nat_edoc = 12, ixb_xslt_edoc_nat = 12, ixb_xml_map = 12, ixb_xml_edd = 12, ixs_slo = 12, ixs_fsk_do = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderAdmWflckzd.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterWflckzd {
		ktg_zp_dor,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderAdmWflcpri - Copy.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Wflctkr*/
	const enum GFilterReaderAdmWflctkr {
		/**PK číselníku*/
		typ_krok,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderAdmWflcpri.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Wflcpri*/
	const enum GFilterReaderAdmWflcpri {
		/**PK číselníku*/
		priz_spis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderAdmWflctsu.d.ts 

declare namespace Gordic.Adm.Interface {
	/**Filtry pro přístup k číselníku Wflctsu*/
	const enum GFilterReaderAdmWflctsu {
		/**PK číselníku*/
		typ_subj,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderAdmWflctyp.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmWflctyp {
		/**Typ výběrové skupiny*/
		typ,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderAdmWflsblk.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmWflsblk {
		/**Výběrová skupina*/
		ixs_blk,
		/**Typ subjektu*/
		typ_subj,
		/**Typ*/
		typ,
		/**Aktivita*/
		aktivita,
		/**Vybere pouze platné skupiny*/
		pouzePlatne,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderAdmWflsssk.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterAdmWflsssk {
		/**Složka SK*/
		ixs_slo,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderWflcpso.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterWflcpso {
		/**Skartace pozastavena*/
		priz_poz_skar,
		/**Skartace pozastavena*/
		priz_poz_skar_txt,
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v,
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s,
		priz_poz_skar_rsx,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderWflscau.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterWflscau {
		/**Certifikační autorita*/
		ixs_cau,
		/**Jméno certifikátu*/
		jmeno,
		/**ID certifikátu*/
		id_cert,
		/**Otisk certifikátu*/
		otisk,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\IGReaderWflscer.d.ts 

declare namespace Gordic.Adm.Interface {
	const enum GReaderFilterWflscer {
		/**Certifikát*/
		ixs_cer,
		/**Zda je certifikát interní*/
		priz_int,
		/**Aktivita*/
		aktivita,
		/**Pouze platné*/
		pouze_platne,
		/**Datum do*/
		dat_do,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\Dto\GReaderWflcpdoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcpdo*/
	interface GReaderWflcpdoDto {
		/**DBCOLUMN:wflcpdo.priz_doruc - Příznak doručenky*/
		priz_doruc?: number|null;
		/**DBCOLUMN:wflcpdo.priz_doruc_txt - název typu spis. grafu*/
		priz_doruc_txt?: string|null;
		/**DBCOLUMN:wflcpdo.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:wflcpdo.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**DBCOLUMN:wflcpdo.k_xml - Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
		/**DBCOLUMN:wflcpdo.priz_doruc_rsx -*/
		priz_doruc_rsx?: number|null;
	}
	const enum GReaderWflcpdoDtoNames { priz_doruc = "priz_doruc", priz_doruc_txt = "priz_doruc_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", priz_doruc_rsx = "priz_doruc_rsx",}
	const enum GReaderWflcpdoDtoFragments { priz_doruc = "*", priz_doruc_txt = "*", k_v = "*", k_s = "*", k_xml = "*", priz_doruc_rsx = "*",}
	const enum GReaderWflcpdoDtoTypes { priz_doruc = "number", priz_doruc_txt = "string", k_v = "number", k_s = "string", k_xml = "string", priz_doruc_rsx = "number",}
	const enum GReaderWflcpdoDtoTypeLengths { priz_doruc_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\Dto\GReaderWflcpsoDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflcpso*/
	interface GReaderWflcpsoDto {
		/**DBCOLUMN:wflcpso.priz_poz_skar - Skartace pozastavena*/
		priz_poz_skar?: number|null;
		/**DBCOLUMN:wflcpso.priz_poz_skar_txt - Skartace pozastavena*/
		priz_poz_skar_txt?: string|null;
		/**DBCOLUMN:wflcpso.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:wflcpso.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**DBCOLUMN:wflcpso.priz_poz_skar_rsx -*/
		priz_poz_skar_rsx?: number|null;
	}
	const enum GReaderWflcpsoDtoNames { priz_poz_skar = "priz_poz_skar", priz_poz_skar_txt = "priz_poz_skar_txt", k_v = "k_v", k_s = "k_s", priz_poz_skar_rsx = "priz_poz_skar_rsx",}
	const enum GReaderWflcpsoDtoFragments { priz_poz_skar = "*", priz_poz_skar_txt = "*", k_v = "*", k_s = "*", priz_poz_skar_rsx = "*",}
	const enum GReaderWflcpsoDtoTypes { priz_poz_skar = "number", priz_poz_skar_txt = "string", k_v = "number", k_s = "string", priz_poz_skar_rsx = "number",}
	const enum GReaderWflcpsoDtoTypeLengths { priz_poz_skar_txt = 100, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adm.Interface\Wfl\Dto\GReaderWflscauDto.d.ts 

declare namespace Gordic.Adm.Interface {
	/**DBTABLE:wflscau*/
	interface GReaderWflscauDto {
		/**DBCOLUMN:wflscau.ixs_cau - Certifikační autorita*/
		ixs_cau?: string|null;
		/**DBCOLUMN:wflscau.jmeno - Jméno certifikátu*/
		jmeno?: string|null;
		/**DBCOLUMN:wflscau.id_cert - ID certifikátu*/
		id_cert?: string|null;
		/**DBCOLUMN:wflscau.otisk - Otisk certifikátu*/
		otisk?: string|null;
		/**DBCOLUMN:wflscau.dat_od - Platnost OD*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:wflscau.dat_do - Platnost DO*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:wflscau.aktivita - Aktivita*/
		aktivita?: number|null;
	}
	const enum GReaderWflscauDtoNames { ixs_cau = "ixs_cau", jmeno = "jmeno", id_cert = "id_cert", otisk = "otisk", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita",}
	const enum GReaderWflscauDtoFragments { ixs_cau = "*", jmeno = "*", id_cert = "*", otisk = "*", dat_od = "*", dat_do = "*", aktivita = "*",}
	const enum GReaderWflscauDtoTypes { ixs_cau = "string", jmeno = "string", id_cert = "string", otisk = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number",}
	const enum GReaderWflscauDtoTypeLengths { ixs_cau = 12, jmeno = 254, id_cert = 254, otisk = 254,}
}

//#endregion

