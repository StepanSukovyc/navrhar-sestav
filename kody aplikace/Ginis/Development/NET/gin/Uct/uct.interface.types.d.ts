/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       uct.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Uct.Interface\Gordic.Uct.Interface.csproj
*    created     2026-02-16 14:33:50
*    files       ds\Roz\GRozaaatPrislib.Dto.d.ts
*                ds\Roz\GRozdisp.Dto.d.ts
*                ds\Roz\GRozdpep.Dto.d.ts
*                ds\Roz\GRozsisp.Dto.d.ts
*                ds\Roz\GRozsmsk.Dto.d.ts
*                ds\Roz\GRozsobd.Dto.d.ts
*                ds\Uct\GUctDefPolickaDto.d.ts
*                ds\Uct\GUctPolickoSeznamuDto.d.ts
*                ds\Uct\GUctSeznamZapisuStavu.Dto.d.ts
*                dto\Common\GEkosucsDto.d.ts
*                dto\Common\GEkosuvlDto.d.ts
*                dto\Common\GPidDto.d.ts
*                dto\Common\GRozvrhDatovaVetaDto.d.ts
*                dto\Common\GZapisyIdentDto.d.ts
*                dto\Roz\GDatabaseParamsDto.d.ts
*                dto\Roz\GEkoParamsDto.d.ts
*                dto\Roz\GRozAkceSeznamuDto.d.ts
*                dto\Roz\GRozcadrDto.d.ts
*                dto\Roz\GRozcastDto.d.ts
*                dto\Roz\GRozdkzuVysledekDto.d.ts
*                dto\Roz\GRozDokladActionPermissions.d.ts
*                dto\Roz\GRozDokladDto.d.ts
*                dto\Roz\GRozDokladFieldPermissions.d.ts
*                dto\Roz\GRozDokladInDto.d.ts
*                dto\Roz\GRozDokladOutDto.d.ts
*                dto\Roz\GRozdpepDto.d.ts
*                dto\Roz\GRozGlobalsDto.d.ts
*                dto\Roz\GRozHromadnaAkceDto.d.ts
*                dto\Roz\GRozsahlDto.d.ts
*                dto\Roz\GRozsahlInDto.d.ts
*                dto\Roz\GRozsahlOutDto.d.ts
*                dto\Roz\GRozsdenDto.d.ts
*                dto\Roz\GRozSeznamContentDto.d.ts
*                dto\Roz\GRozSeznamDokladuDto.d.ts
*                dto\Roz\GRozUkazatelDto.d.ts
*                dto\Roz\GRozVysledekHromadneAkceDto.d.ts
*                dto\Roz\GRozZapisRequestDto.d.ts
*                dto\Roz\GRozZapisResponseDto.d.ts
*                dto\Roz\GSessionParamsDto.d.ts
*                dto\Roz\Vstup\GInputDto.d.ts
*                dto\Roz\VV\GDokladyDto.d.ts
*                dto\Roz\VV\GUzaverkyDto.d.ts
*                dto\Roz\Vystup\GOutputDto.d.ts
*                dto\StatniPokladna\GRozIisspEkisSpPskRequestDto.d.ts
*                dto\Ucr\GEkosazoDto.d.ts
*                dto\Ucr\GEkoSeznamDphDto.d.ts
*                dto\Ucr\GRozSeznamAatDto.d.ts
*                dto\Ucr\GRozSeznamAatFilterDto.d.ts
*                dto\Ucr\GUcrListObdDto.d.ts
*                dto\Ucr\GUctaixmDto.d.ts
*                dto\Ucr\Uschovna\GUctUschovnaKategorieDto.d.ts
*                dto\Ucr\Uschovna\GUctUschovnaSubKategoreDto.d.ts
*                Enums\GEAkceFormulare.d.ts
*                Enums\GEFilterRozdpep.d.ts
*                Enums\GEFiltryDokladu.d.ts
*                Enums\GEPredvyplneniDatumu.d.ts
*                Enums\GEResultOperation.d.ts
*                Enums\GERezimPraceSIntHlavickami.d.ts
*                Enums\GERezimVyrovnavaniPripaduPap.d.ts
*                Enums\GERezimZatridovaniAnalytikPap.d.ts
*                Enums\GERezimZpracovaniPap.d.ts
*                Enums\GERozFiltrAHlavicekStav.d.ts
*                Enums\GETypObjektu.d.ts
*                Enums\GETypOznaceniDokladu.d.ts
*                Enums\GETypyChyb.d.ts
*                Enums\GEZobrazeniStavu.d.ts
*                Enums\Ucr\GETypRegistru.d.ts
*                Enums\Ucr\GEUcrEnums.d.ts
*                Enums\Ucr\GEUcrPovoleniEditaceZapisu.d.ts
*                Enums\Ucr\GEUschovnaFilter.d.ts
*                Enums\Uct\GEAktivitaKnihy.d.ts
*                Enums\Uct\GEUCTAktivitaKnihy.d.ts
*                Enums\Uct\GEUCTParametry.d.ts
*                Enums\Uct\GEUctPristupnostSmlouvy.d.ts
*                Enums\Uct\GEUctSeznamAkci.d.ts
*                Enums\Uct\GEUCTTypKontroly.d.ts
*                Enums\Uct\GEUCTTypyUzaverek.d.ts
*                Enums\Uct\GEUCTTypyUzaverekKnih.d.ts
*                Konsolidace\GUctakon.Dto.d.ts
*                Risre\GRisreBanka.Dto.d.ts
*                Risre\GRisreIIssp.Dto.d.ts
*                Risre\GUctasps.Dto.d.ts
*                Roz\GFiltrRozpoctoveZapisy.d.ts
*                Roz\Dto\GRozVybranyZapisDto.d.ts
*                Roz\Dto\AHlavicka\GRozAHlavickaBaseResponseDto.d.ts
*                Roz\Dto\AHlavicka\GRozAHlavickaCreateRequestDto.d.ts
*                Roz\Dto\AHlavicka\GRozAHlavickaListiRequestDto.d.ts
*                Roz\Dto\AHlavicka\GRozAHlavickaPermissions.d.ts
*                Roz\Dto\AHlavicka\GRozAHlavickaPermissionsDetail.d.ts
*                Roz\Dto\AHlavicka\GRozAHlavickaPermissionsSeznam.d.ts
*                Roz\Dto\AHlavicka\GRozAHlavickaReadRequestDto.d.ts
*                Roz\Dto\AHlavicka\GRozAHlavickaReadResponseDto.d.ts
*                Roz\Dto\Base\GRozDokladActionResponseDto.d.ts
*                Roz\Dto\Base\GRozVybraneDokladyDto.d.ts
*                Roz\Dto\Base\GRozVybranyDokladDto.d.ts
*                Roz\Dto\Base\GUctSkupinaDokladuDto.d.ts
*                Roz\Dto\Doklad\GRozDokladPermissionsList.d.ts
*                Roz\Dto\Doklad\GRozFiltrDokladu.d.ts
*                Roz\Dto\Doklad\GRozRozvrhResponseDto.d.ts
*                Roz\Dto\IISSP\GRozIK.d.ts
*                Roz\Dto\Import\GRozDokladZapisImportReqDto.d.ts
*                Roz\Dto\Import\GRozDokladZapisImportRequestDto.d.ts
*                Roz\Dto\Import\GRoztResultZapisyDto.d.ts
*                Roz\Dto\Knihy\GRozKnihaFiltr.d.ts
*                Roz\Dto\Manager\GRozCileDto.d.ts
*                Roz\Dto\OznacitDoklady\GRozOznacitDokladyDto.d.ts
*                Roz\Dto\Preevidence\GUctDokladPreevidovatHromadneRequestDto.d.ts
*                Roz\Dto\spolecne\GRozHromadnyRequestDto.d.ts
*                Roz\Dto\StavyAat\GRozSeznamAatSumCountDto.d.ts
*                Roz\Dto\Ukazatele\GRozVysledekUkazateluResponseDto.d.ts
*                Roz\ISL\IGRozDoklad.d.ts
*                Roz\ISL\IGRozDokladAgenda.d.ts
*                Roz\ISL\IGRozDokladHlavickaA.d.ts
*                Roz\ISL\IGRozDokladKniha.d.ts
*                Roz\ISL\IGRozDokladZapis.d.ts
*                Roz\ISL\IGRozIissp.d.ts
*                Roz\ISL\IGRozManagerCile.d.ts
*                Roz\ISL\IGRozPrislib.d.ts
*                Roz\ISL\IGRozRozvrh.d.ts
*                Roz\ISL\IGRozUkazatele.d.ts
*                Roz\Objekty\CStavyDokladu.d.ts
*                Roz\Objekty\GRozGlobalParams.d.ts
*                Roz\StatniPokladna\GIdentifikaceKorunyDto.d.ts
*                Roz\StatniPokladna\GSIdentifikaceKoruny.d.ts
*                Ucr\GProhlizeniUctTaskType.d.ts
*                Ucr\GUcrGlobalsBase.d.ts
*                Ucr\GUcrRezimDph.d.ts
*                Ucr\GUcrRezimProvozu.d.ts
*                Ucr\GUcrTypMasky.d.ts
*                Ucr\GUcrTypPraceESU.d.ts
*                Ucr\GUcrTypPraceWFL.d.ts
*                Ucr\GUcrTypPristupuNS.d.ts
*                Ucr\GUcrTypSestavy.d.ts
*                Ucr\GUcrTypSumarizace.d.ts
*                Ucr\IGUcrPevnaMaska.d.ts
*                Ucr\IGUcrsexp.d.ts
*                Ucr\ds\GUcrDetailMaskaBase.Dto.d.ts
*                Ucr\ds\GUcrDetailPozadavekBase.Dto.d.ts
*                Ucr\ds\GUcrElement.Dto.d.ts
*                Ucr\ds\GUcrSeznamPozadavku.Dto.d.ts
*                Ucr\DTO\GUcBaseRequestDto.d.ts
*                Ucr\DTO\GUcrBaseNastaveniDto.d.ts
*                Ucr\DTO\GUcrGlobalDto.d.ts
*                Ucr\DTO\GUcrOtherParamsDto.d.ts
*                Ucr\DTO\GUcrReportInfoDto.d.ts
*                Ucr\DTO\GUcrsexpDto.d.ts
*                Ucr\DTO\GUcrTxtDto.d.ts
*                Ucr\DTO\GUcrZkrDto.d.ts
*                Ucr\DTO\Async\GUcrZapisListAllRequestDto.d.ts
*                Ucr\DTO\DPH\GEkocskoDto.d.ts
*                Ucr\DTO\DPH\GEkoDanEvidenceListRequestDto.d.ts
*                Ucr\DTO\DPH\GEkoDanEvidenceListResponseDto.d.ts
*                Ucr\DTO\DPH\GEkoDanPriznaniListRequestDto.d.ts
*                Ucr\DTO\DPH\GEkoSeznamDphFilterDto.d.ts
*                Ucr\DTO\Filtr\GUCRFilterDto.d.ts
*                Ucr\DTO\Filtr\GUcrMaskaDto.d.ts
*                Ucr\DTO\Info\GUcrInfoDto.d.ts
*                Ucr\DTO\Info\GUcrPlatnostDto.d.ts
*                Ucr\DTO\Konsolidace\GUcrKonsolidaceStavyListFilterDto.d.ts
*                Ucr\DTO\Konsolidace\GUcrKonsolidaceStavyListRequestDto.d.ts
*                Ucr\DTO\Obalkovac\GUcrObalkovacRequestDto.d.ts
*                Ucr\DTO\Obalkovac\GUcrRecipientDto.d.ts
*                Ucr\DTO\Obalkovac\GUcrSenderDto.d.ts
*                Ucr\DTO\Parametry\GUcrParamsDto.d.ts
*                Ucr\DTO\Parametry\GUcrPevnaMaskaDto.d.ts
*                Ucr\DTO\Pozadavky\GUcrPozadavekDetailDto.d.ts
*                Ucr\DTO\Pozadavky\GUcrPozadavekDetailMainDto.d.ts
*                Ucr\DTO\RegistrPZ\GUcrDefSloupceDto.d.ts
*                Ucr\DTO\RegistrPZ\GUcrHodnotyListRequestDto.d.ts
*                Ucr\DTO\RegistrPZ\GUcrHodnotyListResponseDto.d.ts
*                Ucr\DTO\RegistrPZ\GUcrListRequestRegistrPZDto.d.ts
*                Ucr\DTO\RegistrPZ\GUcrTestIxpResponceDto.d.ts
*                Ucr\DTO\RegistrPZ\GUCRZPfilterDto.d.ts
*                Ucr\DTO\RegistrPZ\GUctssudModDto.d.ts
*                Ucr\DTO\Report\GSeznamEkoZaznamuGeneratorDto.d.ts
*                Ucr\DTO\RISRE\GRisreIIsspFilterDto.d.ts
*                Ucr\DTO\RISRE\GUcrFMRezimResponse.d.ts
*                Ucr\DTO\RISRE\GUcrPreuctovaniStavListFilterDto.d.ts
*                Ucr\DTO\RISRE\GUcrVytvorDavkuRequest.d.ts
*                Ucr\DTO\Saldokonto\GUcrListRequestDto.d.ts
*                Ucr\DTO\Stavy\GRozStavyAatListRequestDto.d.ts
*                Ucr\DTO\Stavy\GRozStavyAatListResponseDto.d.ts
*                Ucr\DTO\Stavy\GRoztStavytRequestDto.d.ts
*                Ucr\DTO\Stavy\GUctStavytRequestDto.d.ts
*                Ucr\DTO\StuktPopis\GStruktPopisDto.d.ts
*                Ucr\DTO\StuktPopis\GStruktPopisHodnotyDto.d.ts
*                Ucr\DTO\Sumarizace\GUcrExportDto.d.ts
*                Ucr\DTO\Sumarizace\GUcrSelectOptionDto.d.ts
*                Ucr\DTO\UctZapis\GIdentifikatorRadkuDto.d.ts
*                Ucr\DTO\UctZapis\GPopisDokladuRequestDto.d.ts
*                Ucr\DTO\UctZapis\GSeznamZapisuStavuDto.d.ts
*                Ucr\DTO\UctZapis\GStrukturovanyPopisFilterDto.d.ts
*                Ucr\DTO\UctZapis\GUctZapisListRequestDto.d.ts
*                Ucr\DTO\Ukazatel\GUcrUkazatelFilterDto.d.ts
*                Ucr\DTO\Ukazatel\GUcrUkazatelHistoryDto.d.ts
*                Ucr\DTO\Ukazatel\GUctUkazatelListRequestDto.d.ts
*                Ucr\DTO\VYK\GListVykazuFilterDto.d.ts
*                Ucr\DTO\VYK\GUcrVykazDavkaResponse.d.ts
*                Ucr\ISL\IGUcrInfos.d.ts
*                Ucr\ISL\IGUCRParams.d.ts
*                Ucr\ISL\DPH\IGUcrDph.d.ts
*                Ucr\ISL\Filtr\IGUcrFiltr.d.ts
*                Ucr\ISL\Konsolidace\IGUcrKonsolidaceStavy.d.ts
*                Ucr\ISL\Konsolidace\IGUcrKonsolidaceTransformace.d.ts
*                Ucr\ISL\Obalkovac\IGUcrObalkovac.d.ts
*                Ucr\ISL\Pozadavky\IGUcrPozadavek.d.ts
*                Ucr\ISL\Registr PZ\IGUcrRegistrZP.d.ts
*                Ucr\ISL\Risre\IGUcrRisreIissp.d.ts
*                Ucr\ISL\Risre\IGUcrRisreSkutecnost.d.ts
*                Ucr\ISL\Risre\IGUcrRisreStavy.d.ts
*                Ucr\ISL\Saldokonto\IGUcrSaldokonto.d.ts
*                Ucr\ISL\Stavy\IGRozStav.d.ts
*                Ucr\ISL\Stavy\IGRozStavyAat.d.ts
*                Ucr\ISL\Stavy\IGUctStav.d.ts
*                Ucr\ISL\Ukazatele\IGUcrUkazatel.d.ts
*                Ucr\ISL\Uschovna\IGUcrUschovna.d.ts
*                Ucr\ISL\VYK\IGUcrVykaz.d.ts
*                Ucr\ISL\VYK\IGUcrVykazAdm.d.ts
*                Ucr\ISL\Zapisy\IGRozZapis.d.ts
*                Ucr\ISL\Zapisy\IGUctZapis.d.ts
*                Uct\IGUctInOutParams.d.ts
*                Uct\IGUctStavy.d.ts
*                Uct\Dto\GParametryOtevreniPKHDPHDto.d.ts
*                Uct\Dto\GUctDokladStavDokladuDto.d.ts
*                Uct\Dto\GUctdpep.Dto.d.ts
*                Uct\Dto\GUctEkoParamsDto.d.ts
*                Uct\Dto\GUctFiltrDokladuZapisyDto.d.ts
*                Uct\Dto\GUctFiltrUcetniZapisy.d.ts
*                Uct\Dto\GUctGlobalDto.d.ts
*                Uct\Dto\GUctHromadnyRequestDto.d.ts
*                Uct\Dto\GUctParamsDto.d.ts
*                Uct\Dto\GUctRadekZDto.d.ts
*                Uct\Dto\GUctsdenDto.d.ts
*                Uct\Dto\GUctsmsk.Dto.d.ts
*                Uct\Dto\GUctStavyNaUctech.d.ts
*                Uct\Dto\GUctVybraneDokladyDto.d.ts
*                Uct\Dto\GUctVybraneZapisyDto.d.ts
*                Uct\Dto\Agenda\GUctAgendaDto.d.ts
*                Uct\Dto\Doklad\GUctDokladActionResponseBaseDto.d.ts
*                Uct\Dto\Doklad\GUctDokladActionResponseDto.d.ts
*                Uct\Dto\Doklad\GUctDokladDto.d.ts
*                Uct\Dto\Doklad\GUctDokladExtensDto.d.ts
*                Uct\Dto\Doklad\GUctDokladReadRequestDto..d.ts
*                Uct\Dto\Doklad\GUctDokladReadStavRequestDto.d.ts
*                Uct\Dto\Doklad\GUctDokladReadStavResponseDto.d.ts
*                Uct\Dto\Doklad\GUctFiltrDokladu.d.ts
*                Uct\Dto\Doklad\GUctPocetDokladuDto.d.ts
*                Uct\Dto\Doklad\GUctSeznamDokladuDto.d.ts
*                Uct\Dto\Doklad\GUctspidExtendDto.d.ts
*                Uct\Dto\Evidence\GUctDokladEvidenceNastaveniDto.d.ts
*                Uct\Dto\Evidence\GUctDokladEvidenceRequestDto.d.ts
*                Uct\Dto\Evidence\GUctDokladEvidenceResponseDto.d.ts
*                Uct\Dto\HromadnaUcetKontrola\GUctDokladFIKUCKHromadneRequestDto.d.ts
*                Uct\Dto\HromadnaUcetKontrola\GUctVybraneDokladyDto.d.ts
*                Uct\Dto\HromadnyPopisZapisu\GUctHromadnyPopisZapisyDto.d.ts
*                Uct\Dto\HromadnyPopisZapisu\GUctVybranyZapisDto.d.ts
*                Uct\Dto\HromadnyPopisZapisu\GUctVysledekZapisyDto.d.ts
*                Uct\Dto\IISSP\GUctDokladZapisAlgoritmusKRResponseDto.d.ts
*                Uct\Dto\IISSP\GUctDokladZapisRezervaceIISSPRequestDto.d.ts
*                Uct\Dto\IISSP\GUctDokladZapisRezervaceIISSPResponseDto.d.ts
*                Uct\Dto\IISSP\GUctIISSPAttrDto.d.ts
*                Uct\Dto\Import\GUctDokladZapisImportClipPrepareRequestDto.d.ts
*                Uct\Dto\Import\GUctDokladZapisImportFilePrepareRequestDto.d.ts
*                Uct\Dto\Import\GUctDokladZapisImportPrepareBaseRequestDto.d.ts
*                Uct\Dto\Import\GUctDokladZapisImportRequestDto.d.ts
*                Uct\Dto\Import\GUctResultZapisyDto.d.ts
*                Uct\Dto\Knihy\GUctDokladPermissionsSeznam.d.ts
*                Uct\Dto\Knihy\GUctKnihaFiltr.d.ts
*                Uct\Dto\Knihy\GUctKnihyDto.d.ts
*                Uct\Dto\Knihy\GUctSouctyKnihDto.d.ts
*                Uct\Dto\Knihy\GUctVybraneKnihyDto.d.ts
*                Uct\Dto\KopieDokladu\GUctDokladKopieRequestDto.d.ts
*                Uct\Dto\Odschvalit\GUctDokladOdschvalitInDto.d.ts
*                Uct\Dto\Odschvalit\GUctDokladOdSchvalitNastaveniDto.d.ts
*                Uct\Dto\Odschvalit\GUctDokladOdschvalitResponseDto.d.ts
*                Uct\Dto\OdStornovat\GUctDokladOdStornovatNastaveniDto.d.ts
*                Uct\Dto\OdStornovat\GUctDokladOdStornovatRequestDto.d.ts
*                Uct\Dto\OdStornovat\GUctDokladOdStornovatResponseDto.d.ts
*                Uct\Dto\OznacitDokladu\GUctOznacitDokladyDto.d.ts
*                Uct\Dto\Permissions\GUctDokladPermissions.d.ts
*                Uct\Dto\Permissions\GUctDokladPermissionsHlavicka.d.ts
*                Uct\Dto\Permissions\GUctDokladPermissionsZapis.d.ts
*                Uct\Dto\PermissionsSeznam\GUctDokladPermissionsSeznam.d.ts
*                Uct\Dto\PermissionsSeznam\GUctDokladPermissionsSeznamRequestDto.d.ts
*                Uct\Dto\Podani\GUctDokladPodaniNastaveniDto.d.ts
*                Uct\Dto\Podani\GUctDokladPodaniRequestDto.d.ts
*                Uct\Dto\Podani\GUctDokladPodaniResponseDto.d.ts
*                Uct\Dto\Predat\GUctDokladPredatRequestDto.d.ts
*                Uct\Dto\Predat\GUctDokladPredattHromadneRequestDto.d.ts
*                Uct\Dto\Preevidovat\GUctDokladPreevidovatHromadneRequestDto.d.ts
*                Uct\Dto\Preevidovat\GUctDokladPreevidovatRequestDto.d.ts
*                Uct\Dto\Prevzit\GUctDokladPrevzitHormadneRequestDto.d.ts
*                Uct\Dto\Prevzit\GUctDokladPrevzitRequestDto.d.ts
*                Uct\Dto\Prevzit\GUctDokladPrevzitResponseDto.d.ts
*                Uct\Dto\Pridelit\GUctDokladPrevzitRequestDto.d.ts
*                Uct\Dto\Request\GUctBaseVybaneZapisyDto.d.ts
*                Uct\Dto\Request\GUctDokladActionBaseRequestDto.d.ts
*                Uct\Dto\Request\GUctDokladActionRequestDto.d.ts
*                Uct\Dto\Request\GUctDokladActionRequestGroupDto.d.ts
*                Uct\Dto\Request\GUctDokladAkceNastaveniDto.d.ts
*                Uct\Dto\Request\GUctInOutParamsDto.d.ts
*                Uct\Dto\Request\GUctSkupinaDokladuDto.d.ts
*                Uct\Dto\Request\GUctSkupinaZapisuDto.d.ts
*                Uct\Dto\Schvalit\GUctDokladSchvalitNastaveniDto.d.ts
*                Uct\Dto\Schvalit\GUctDokladSchvalitRequestDto.d.ts
*                Uct\Dto\Schvalit\GUctDokladSchvalitResponseDto.d.ts
*                Uct\Dto\Stornovat\GUctDokladStornovatNastaveniDto.d.ts
*                Uct\Dto\Stornovat\GUctDokladStornovatRequestDto.d.ts
*                Uct\Dto\Stornovat\GUctDokladStornovatResponseDto.d.ts
*                Uct\Dto\Uzaverka\GUctUzaverkaAgendyRequestDto.d.ts
*                Uct\Dto\Uzaverka\GUctUzaverkaAgendyResponseDto.d.ts
*                Uct\Dto\Uzaverka\GUctUzaverkaKontrolaRequestDto.d.ts
*                Uct\Dto\Uzaverka\GUctUzaverkaRequestDto.d.ts
*                Uct\Dto\Uzaverka\GUctUzaverkaResponseDto.d.ts
*                Uct\Dto\Uzavrit\GUctDokladUzavritNastaveniDto.d.ts
*                Uct\Dto\Uzavrit\GUctDokladUzavritRequestDto.d.ts
*                Uct\Dto\Uzavrit\GUctDokladUzavritResponseDto.d.ts
*                Uct\Dto\VratitDoWFL\GUctDokladVratitDoWFLRequestDto.d.ts
*                Uct\Dto\VyrovnatRadekDokladu\GUctZapisVyrovnatRequestDto.d.ts
*                Uct\Dto\VyrovnatRadekDokladu\GUctZapisVyrovnatResponceDto.d.ts
*                Uct\Dto\Zapis\GUctZapisActionRequestDto.d.ts
*                Uct\Dto\Zapis\GUctZapisActionResponseDto.d.ts
*                Uct\Dto\ZapisOductovat\GUctDokladZapisOductovatRequestDto.d.ts
*                Uct\Dto\ZapisUloz\GUctDokladZapisUlozRequestDto.d.ts
*                Uct\Dto\ZapisUloz\GUctDokladZapisVymazatResponseDto.d.ts
*                Uct\Dto\ZapisVymazat\GUctDokladZapisVymazatNastaveniDto.d.ts
*                Uct\Dto\ZapisVymazat\GUctDokladZapisVymazatRequestDto.d.ts
*                Uct\Dto\ZapisVymazat\GUctDokladZapisVymazatResponseDto.d.ts
*                Uct\Dto\Zauctovat\GUctDokladSchvalitNastaveniDto.d.ts
*                Uct\Dto\Zauctovat\GUctDokladZauctovatHromadneRequestDto.d.ts
*                Uct\Dto\Zauctovat\GUctDokladZauctovatRequestDto.d.ts
*                Uct\Dto\Zauctovat\GUctDokladZauctovatResponseDto.d.ts
*                Uct\Enum\GEUctFiltrSeznamPevne.d.ts
*                Uct\Enum\GEUctHromadneOperace.d.ts
*                Uct\Enum\GEUctTypKurzovychRozdilu.d.ts
*                Uct\Enum\GEUctTypPolicek.d.ts
*                Uct\Enum\GEUctTypZpracovani.d.ts
*                Uct\ISL\IGUctDoklad.d.ts
*                Uct\ISL\IGUctDokladAgenda.d.ts
*                Uct\ISL\IGUctDokladKniha.d.ts
*                Uct\ISL\IGUctDokladZapis.d.ts
*                Uct\ISL\IGUctLoadAttachmentService.d.ts
*                Uct\ISL\IGUctPermitActions.d.ts
*                Uct\Objekty\IGUctParams.d.ts
*                Uct\Pap\ds\GUctdmpa.Dto.d.ts
*                Ukazatele\GEkoauka.Dto.d.ts
*                Ukazatele\IGUkazatele.d.ts
*                Vyk\IGVykazy.d.ts
*                Vyk\IGVykazyAdm.d.ts
*                Vyk\IGVykcsvk.d.ts
*                Vyk\ds\GSeznamVykazu.Dto.d.ts
*                Vyk\ds\GVyksvkh.Dto.d.ts
*                Vyk\ds\GVyksvkz.Dto.d.ts
*                Vyk\DTO\GVykazRequestFileDto.d.ts
*                Vyk\DTO\GVykazRequestHistorieDto.d.ts
*                Vyk\DTO\GVykazTopologieDto.d.ts
*                Vyk\DTO\GVykColValueDto.d.ts
*                Vyk\DTO\GVykDefHodnotaDto.d.ts
*                Vyk\DTO\GVykdvkdDto.d.ts
*                Vyk\DTO\GVykdvkhHodnotyDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\ds\Roz\GRozaaatPrislib.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GRozaaatPrislibDto {
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
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
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
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.kc1_puvodni*/
		kc1_puvodni?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kc1_nova*/
		kc1_nova?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.radek_hdr_ris*/
		radek_hdr_ris?: number|null;
	}
	const enum GRozaaatPrislibDtoNames { nks = "nks", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", kc1_puvodni = "kc1_puvodni", kc1_nova = "kc1_nova", radek_z = "radek_z", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", radek_hdr_ris = "radek_hdr_ris",}
	const enum GRozaaatPrislibDtoFragments { nks = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", kc1_puvodni = "*", kc1_nova = "*", radek_z = "*", id_hdr_ris = "*", radek_hdr = "*", radek_hdr_ris = "*",}
	const enum GRozaaatPrislibDtoTypes { nks = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", kc1_puvodni = "JsonDecimal", kc1_nova = "JsonDecimal", radek_z = "number", id_hdr_ris = "string", radek_hdr = "number", radek_hdr_ris = "number",}
	const enum GRozaaatPrislibDtoTypeLengths { uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\ds\Roz\GRozdisp.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GRozdispDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:Seznam.isp_kap*/
		isp_kap?: string|null;
		/**DBCOLUMN:Seznam.isp_fim*/
		isp_fim?: string|null;
		/**DBCOLUMN:Seznam.isp_rpo*/
		isp_rpo?: string|null;
		/**DBCOLUMN:Seznam.isp_par*/
		isp_par?: string|null;
		/**DBCOLUMN:Seznam.isp_zdr*/
		isp_zdr?: string|null;
		/**DBCOLUMN:Seznam.isp_eds*/
		isp_eds?: string|null;
		/**DBCOLUMN:Seznam.isp_ucl*/
		isp_ucl?: string|null;
		/**DBCOLUMN:Seznam.isp_pvs*/
		isp_pvs?: string|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.isp_nd*/
		isp_nd?: string|null;
		/**DBCOLUMN:Seznam.isp_rd*/
		isp_rd?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.radek_isp*/
		radek_isp?: number|null;
		/**DBCOLUMN:Seznam.isp_zj*/
		isp_zj?: string|null;
		/**DBCOLUMN:Seznam.isp_uj*/
		isp_uj?: string|null;
		/**DBCOLUMN:Seznam.isp_uz*/
		isp_uz?: string|null;
	}
	const enum GRozdispDtoNames { ixp = "ixp", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", isp_kap = "isp_kap", isp_fim = "isp_fim", isp_rpo = "isp_rpo", isp_par = "isp_par", isp_zdr = "isp_zdr", isp_eds = "isp_eds", isp_ucl = "isp_ucl", isp_pvs = "isp_pvs", c0 = "c0", c1 = "c1", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", isp_nd = "isp_nd", isp_rd = "isp_rd", popis = "popis", radek_isp = "radek_isp", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz",}
	const enum GRozdispDtoFragments { ixp = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ac = "*", radek_z = "*", isp_kap = "*", isp_fim = "*", isp_rpo = "*", isp_par = "*", isp_zdr = "*", isp_eds = "*", isp_ucl = "*", isp_pvs = "*", c0 = "*", c1 = "*", dat_zmena = "*", zmenu_prov = "*", isp_nd = "*", isp_rd = "*", popis = "*", radek_isp = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*",}
	const enum GRozdispDtoTypes { ixp = "string", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", isp_kap = "string", isp_fim = "string", isp_rpo = "string", isp_par = "string", isp_zdr = "string", isp_eds = "string", isp_ucl = "string", isp_pvs = "string", c0 = "JsonDecimal", c1 = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", isp_nd = "string", isp_rd = "string", popis = "string", radek_isp = "number", isp_zj = "string", isp_uj = "string", isp_uz = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\ds\Roz\GRozdpep.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GRozdpepDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0_new*/
		c0_new?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_new*/
		c1_new?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m0*/
		m0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m1*/
		m1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m0_new*/
		m0_new?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m1_new*/
		m1_new?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.stav_kch*/
		stav_kch?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
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
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
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
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
		/**DBCOLUMN:Seznam.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Seznam.up_stav*/
		up_stav?: number|null;
		/**DBCOLUMN:Seznam.ac_ixe*/
		ac_ixe?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.typ_roz*/
		typ_roz?: number|null;
		/**DBCOLUMN:Seznam.zd*/
		zd?: number|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.ixp_srv*/
		ixp_srv?: string|null;
		/**DBCOLUMN:Seznam.rok_srv*/
		rok_srv?: number|null;
		/**DBCOLUMN:Seznam.priz_poriz*/
		priz_poriz?: number|null;
		/**DBCOLUMN:Seznam.ixs_uka*/
		ixs_uka?: string|null;
		/**DBCOLUMN:Seznam.xpf_pf*/
		xpf_pf?: string|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.priz_bal*/
		priz_bal?: number|null;
		/**DBCOLUMN:Seznam.vyhr_roz*/
		vyhr_roz?: number|null;
		/**DBCOLUMN:Seznam.ixs_fun_mng*/
		ixs_fun_mng?: string|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.radek_hdr_ris*/
		radek_hdr_ris?: number|null;
		/**DBCOLUMN:Seznam.pozadavek*/
		pozadavek?: string|null;
		/**DBCOLUMN:Seznam.smlouva*/
		smlouva?: string|null;
		/**DBCOLUMN:Seznam.priz_bal_inv*/
		priz_bal_inv?: number|null;
	}
	const enum GRozdpepDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ixp_den = "ixp_den", ac = "ac", radek_z = "radek_z", nks = "nks", por_cislo = "por_cislo", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", c0_new = "c0_new", c1_new = "c1_new", m0 = "m0", m1 = "m1", m0_new = "m0_new", m1_new = "m1_new", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", ixs_kon = "ixs_kon", up_stav = "up_stav", ac_ixe = "ac_ixe", popis = "popis", typ_roz = "typ_roz", zd = "zd", uus = "uus", ixp_srv = "ixp_srv", rok_srv = "rok_srv", priz_poriz = "priz_poriz", ixs_uka = "ixs_uka", xpf_pf = "xpf_pf", ixp_sml = "ixp_sml", priz_bal = "priz_bal", vyhr_roz = "vyhr_roz", ixs_fun_mng = "ixs_fun_mng", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", radek_hdr_ris = "radek_hdr_ris", pozadavek = "pozadavek", smlouva = "smlouva", priz_bal_inv = "priz_bal_inv",}
	const enum GRozdpepDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ixp_den = "*", ac = "*", radek_z = "*", nks = "*", por_cislo = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c1 = "*", c0_new = "*", c1_new = "*", m0 = "*", m1 = "*", m0_new = "*", m1_new = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", ixs_kon = "*", up_stav = "*", ac_ixe = "*", popis = "*", typ_roz = "*", zd = "*", uus = "*", ixp_srv = "*", rok_srv = "*", priz_poriz = "*", ixs_uka = "*", xpf_pf = "*", ixp_sml = "*", priz_bal = "*", vyhr_roz = "*", ixs_fun_mng = "*", id_hdr_ris = "*", radek_hdr = "*", radek_hdr_ris = "*", pozadavek = "*", smlouva = "*", priz_bal_inv = "*",}
	const enum GRozdpepDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ixp_den = "string", ac = "string", radek_z = "number", nks = "string", por_cislo = "number", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", c0_new = "JsonDecimal", c1_new = "JsonDecimal", m0 = "JsonDecimal", m1 = "JsonDecimal", m0_new = "JsonDecimal", m1_new = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", ixs_kon = "string", up_stav = "number", ac_ixe = "string", popis = "string", typ_roz = "number", zd = "number", uus = "string", ixp_srv = "string", rok_srv = "number", priz_poriz = "number", ixs_uka = "string", xpf_pf = "string", ixp_sml = "string", priz_bal = "number", vyhr_roz = "number", ixs_fun_mng = "string", id_hdr_ris = "string", radek_hdr = "number", radek_hdr_ris = "number", pozadavek = "string", smlouva = "string", priz_bal_inv = "number",}
	const enum GRozdpepDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ixp_den = 12, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uek = 6, uel = 10, uem = 10, uen = 6, ixs_kon = 12, ac_ixe = 20, popis = 254, uus = 10, ixp_srv = 12, ixs_uka = 12, xpf_pf = 63, ixp_sml = 12, ixs_fun_mng = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\ds\Roz\GRozsisp.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GRozsispDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.cj_oss*/
		cj_oss?: string|null;
		/**DBCOLUMN:Seznam.cj_kap*/
		cj_kap?: string|null;
		/**DBCOLUMN:Seznam.jm_zakl_oss*/
		jm_zakl_oss?: string|null;
		/**DBCOLUMN:Seznam.jm_zakl_kap*/
		jm_zakl_kap?: string|null;
		/**DBCOLUMN:Seznam.cislo_ro_sp*/
		cislo_ro_sp?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.kap_ro_sp*/
		kap_ro_sp?: string|null;
		/**DBCOLUMN:Seznam.rok_ro_sp*/
		rok_ro_sp?: string|null;
		/**DBCOLUMN:Seznam.dokl_status_iissp*/
		dokl_status_iissp?: number|null;
		/**DBCOLUMN:Seznam.vysl_volani*/
		vysl_volani?: number|null;
		/**DBCOLUMN:Seznam.dat_odeslat*/
		dat_odeslat?: JsonDate|null;
		/**DBCOLUMN:Seznam.id_volani_ssp*/
		id_volani_ssp?: number|null;
		/**DBCOLUMN:Seznam.ro_cislo_kap_sp*/
		ro_cislo_kap_sp?: string|null;
		/**DBCOLUMN:Seznam.rok_rzam*/
		rok_rzam?: number|null;
		/**DBCOLUMN:Seznam.id_rzam*/
		id_rzam?: number|null;
		/**DBCOLUMN:Seznam.typ_vazani*/
		typ_vazani?: number|null;
		/**Odpoved statni pokladny - dokl_status_iissp*/
		OdpovedIissp?: Gordic.Eko.Interface.GEOdpovedIISSP|null;
		/**Stav komunikace se statni pokladnou - vysl_volani*/
		StavKomunikaceIISSP?: Gordic.Eko.Interface.GEStavKomunikaceIISSP|null;
		/**Typ vazani vydaju statniho rozpoctu - typ_vazani*/
		TypVazani?: Gordic.Uct.Interface.GETypVazani|null;
	}
	const enum GRozsispDtoNames { ixp = "ixp", cj_oss = "cj_oss", cj_kap = "cj_kap", jm_zakl_oss = "jm_zakl_oss", jm_zakl_kap = "jm_zakl_kap", cislo_ro_sp = "cislo_ro_sp", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kap_ro_sp = "kap_ro_sp", rok_ro_sp = "rok_ro_sp", dokl_status_iissp = "dokl_status_iissp", vysl_volani = "vysl_volani", dat_odeslat = "dat_odeslat", id_volani_ssp = "id_volani_ssp", ro_cislo_kap_sp = "ro_cislo_kap_sp", rok_rzam = "rok_rzam", id_rzam = "id_rzam", typ_vazani = "typ_vazani", OdpovedIissp = "OdpovedIissp", StavKomunikaceIISSP = "StavKomunikaceIISSP", TypVazani = "TypVazani",}
	const enum GRozsispDtoFragments { ixp = "*", cj_oss = "*", cj_kap = "*", jm_zakl_oss = "*", jm_zakl_kap = "*", cislo_ro_sp = "*", dat_zmena = "*", zmenu_prov = "*", kap_ro_sp = "*", rok_ro_sp = "*", dokl_status_iissp = "*", vysl_volani = "*", dat_odeslat = "*", id_volani_ssp = "*", ro_cislo_kap_sp = "*", rok_rzam = "*", id_rzam = "*", typ_vazani = "*", OdpovedIissp = "*", StavKomunikaceIISSP = "*", TypVazani = "*",}
	const enum GRozsispDtoTypes { ixp = "string", cj_oss = "string", cj_kap = "string", jm_zakl_oss = "string", jm_zakl_kap = "string", cislo_ro_sp = "string", dat_zmena = "JsonDate", zmenu_prov = "string", kap_ro_sp = "string", rok_ro_sp = "string", dokl_status_iissp = "number", vysl_volani = "number", dat_odeslat = "JsonDate", id_volani_ssp = "number", ro_cislo_kap_sp = "string", rok_rzam = "number", id_rzam = "number", typ_vazani = "number", OdpovedIissp = "Gordic.Eko.Interface.GEOdpovedIISSP", StavKomunikaceIISSP = "Gordic.Eko.Interface.GEStavKomunikaceIISSP", TypVazani = "Gordic.Uct.Interface.GETypVazani",}
	const enum GRozsispDtoTypeLengths { ixp = 12, cj_oss = 50, cj_kap = 50, jm_zakl_oss = 50, jm_zakl_kap = 50, cislo_ro_sp = 10, zmenu_prov = 12, kap_ro_sp = 3, rok_ro_sp = 4, ro_cislo_kap_sp = 10,}
	/**Enumerator s typy vazani vydaju*/
	const enum GETypVazani {
		BEZ_VAZANI=0,
		VAZA=10,
		VAZB=20,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\ds\Roz\GRozsmsk.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GRozsmskDto {
		/**DBCOLUMN:Seznam.ixs_msk*/
		ixs_msk?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.typ_masky*/
		typ_masky?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.rok_0*/
		rok_0?: number|null;
		/**DBCOLUMN:Seznam.rok_1*/
		rok_1?: number|null;
		/**DBCOLUMN:Seznam.mesic_0*/
		mesic_0?: number|null;
		/**DBCOLUMN:Seznam.mesic_1*/
		mesic_1?: number|null;
		/**DBCOLUMN:Seznam.den_0*/
		den_0?: number|null;
		/**DBCOLUMN:Seznam.den_1*/
		den_1?: number|null;
		/**DBCOLUMN:Seznam.ac_ixe_0*/
		ac_ixe_0?: string|null;
		/**DBCOLUMN:Seznam.ac_ixe_1*/
		ac_ixe_1?: string|null;
		/**DBCOLUMN:Seznam.s_zau*/
		s_zau?: number|null;
		/**DBCOLUMN:Seznam.uea_0*/
		uea_0?: string|null;
		/**DBCOLUMN:Seznam.uea_1*/
		uea_1?: string|null;
		/**DBCOLUMN:Seznam.ueb_0*/
		ueb_0?: string|null;
		/**DBCOLUMN:Seznam.ueb_1*/
		ueb_1?: string|null;
		/**DBCOLUMN:Seznam.uec_0*/
		uec_0?: string|null;
		/**DBCOLUMN:Seznam.uec_1*/
		uec_1?: string|null;
		/**DBCOLUMN:Seznam.ued_0*/
		ued_0?: string|null;
		/**DBCOLUMN:Seznam.ued_1*/
		ued_1?: string|null;
		/**DBCOLUMN:Seznam.uee_0*/
		uee_0?: string|null;
		/**DBCOLUMN:Seznam.uee_1*/
		uee_1?: string|null;
		/**DBCOLUMN:Seznam.uef_0*/
		uef_0?: string|null;
		/**DBCOLUMN:Seznam.uef_1*/
		uef_1?: string|null;
		/**DBCOLUMN:Seznam.ueg_0*/
		ueg_0?: string|null;
		/**DBCOLUMN:Seznam.ueg_1*/
		ueg_1?: string|null;
		/**DBCOLUMN:Seznam.ueh_0*/
		ueh_0?: string|null;
		/**DBCOLUMN:Seznam.ueh_1*/
		ueh_1?: string|null;
		/**DBCOLUMN:Seznam.uei_0*/
		uei_0?: string|null;
		/**DBCOLUMN:Seznam.uei_1*/
		uei_1?: string|null;
		/**DBCOLUMN:Seznam.uej_0*/
		uej_0?: string|null;
		/**DBCOLUMN:Seznam.uej_1*/
		uej_1?: string|null;
		/**DBCOLUMN:Seznam.uek_0*/
		uek_0?: string|null;
		/**DBCOLUMN:Seznam.uek_1*/
		uek_1?: string|null;
		/**DBCOLUMN:Seznam.uel_0*/
		uel_0?: string|null;
		/**DBCOLUMN:Seznam.uel_1*/
		uel_1?: string|null;
		/**DBCOLUMN:Seznam.uem_0*/
		uem_0?: string|null;
		/**DBCOLUMN:Seznam.uem_1*/
		uem_1?: string|null;
		/**DBCOLUMN:Seznam.uen_0*/
		uen_0?: string|null;
		/**DBCOLUMN:Seznam.uen_1*/
		uen_1?: string|null;
		/**DBCOLUMN:Seznam.te0_0*/
		te0_0?: string|null;
		/**DBCOLUMN:Seznam.te0_1*/
		te0_1?: string|null;
		/**DBCOLUMN:Seznam.te1_0*/
		te1_0?: string|null;
		/**DBCOLUMN:Seznam.te1_1*/
		te1_1?: string|null;
		/**DBCOLUMN:Seznam.te2_0*/
		te2_0?: string|null;
		/**DBCOLUMN:Seznam.te2_1*/
		te2_1?: string|null;
		/**DBCOLUMN:Seznam.te3_0*/
		te3_0?: string|null;
		/**DBCOLUMN:Seznam.te3_1*/
		te3_1?: string|null;
		/**DBCOLUMN:Seznam.te4_0*/
		te4_0?: string|null;
		/**DBCOLUMN:Seznam.te4_1*/
		te4_1?: string|null;
		/**DBCOLUMN:Seznam.te5_0*/
		te5_0?: string|null;
		/**DBCOLUMN:Seznam.te5_1*/
		te5_1?: string|null;
		/**DBCOLUMN:Seznam.te6_0*/
		te6_0?: string|null;
		/**DBCOLUMN:Seznam.te6_1*/
		te6_1?: string|null;
		/**DBCOLUMN:Seznam.te7_0*/
		te7_0?: string|null;
		/**DBCOLUMN:Seznam.te7_1*/
		te7_1?: string|null;
		/**DBCOLUMN:Seznam.te8_0*/
		te8_0?: string|null;
		/**DBCOLUMN:Seznam.te8_1*/
		te8_1?: string|null;
		/**DBCOLUMN:Seznam.te9_0*/
		te9_0?: string|null;
		/**DBCOLUMN:Seznam.te9_1*/
		te9_1?: string|null;
		/**DBCOLUMN:Seznam.c0_0*/
		c0_0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0_1*/
		c0_1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_0*/
		c1_0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_1*/
		c1_1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m0_0*/
		m0_0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m0_1*/
		m0_1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m1_0*/
		m1_0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.m1_1*/
		m1_1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.vlastni*/
		vlastni?: number|null;
		/**DBCOLUMN:Seznam.popis_pid*/
		popis_pid?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.druh_masky*/
		druh_masky?: number|null;
		/**DBCOLUMN:Seznam.rok_kniha*/
		rok_kniha?: number|null;
		/**DBCOLUMN:Seznam.aktivita_kniha*/
		aktivita_kniha?: number|null;
		/**DBCOLUMN:Seznam.popis_pep*/
		popis_pep?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_cil*/
		ixs_fun_cil?: string|null;
		/**DBCOLUMN:Seznam.fun_hist*/
		fun_hist?: number|null;
		/**DBCOLUMN:Seznam.poznamka_ixp*/
		poznamka_ixp?: string|null;
		/**DBCOLUMN:Seznam.ks_db*/
		ks_db?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:Seznam.ac_0*/
		ac_0?: string|null;
		/**DBCOLUMN:Seznam.ac_1*/
		ac_1?: string|null;
		/**DBCOLUMN:Seznam.ac_ag_0*/
		ac_ag_0?: string|null;
		/**DBCOLUMN:Seznam.ac_ag_1*/
		ac_ag_1?: string|null;
		/**DBCOLUMN:Seznam.stav_evi*/
		stav_evi?: number|null;
		/**DBCOLUMN:Seznam.num_row*/
		num_row?: number|null;
		/**DBCOLUMN:Seznam.a_cislo*/
		a_cislo?: string|null;
		/**DBCOLUMN:Seznam.ft_text*/
		ft_text?: string|null;
		/**DBCOLUMN:Seznam.ft_zdroj*/
		ft_zdroj?: number|null;
		/**DBCOLUMN:Seznam.ft_oblast*/
		ft_oblast?: number|null;
		/**DBCOLUMN:Seznam.ft_souvisejici*/
		ft_souvisejici?: number|null;
		/**DBCOLUMN:Seznam.c_0*/
		c_0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_1*/
		c_1?: JsonDecimal|null;
	}
	const enum GRozsmskDtoNames { ixs_msk = "ixs_msk", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", typ_masky = "typ_masky", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", ucs = "ucs", nks = "nks", ixp = "ixp", ac = "ac", ixs_typ = "ixs_typ", drd = "drd", rok_0 = "rok_0", rok_1 = "rok_1", mesic_0 = "mesic_0", mesic_1 = "mesic_1", den_0 = "den_0", den_1 = "den_1", ac_ixe_0 = "ac_ixe_0", ac_ixe_1 = "ac_ixe_1", s_zau = "s_zau", uea_0 = "uea_0", uea_1 = "uea_1", ueb_0 = "ueb_0", ueb_1 = "ueb_1", uec_0 = "uec_0", uec_1 = "uec_1", ued_0 = "ued_0", ued_1 = "ued_1", uee_0 = "uee_0", uee_1 = "uee_1", uef_0 = "uef_0", uef_1 = "uef_1", ueg_0 = "ueg_0", ueg_1 = "ueg_1", ueh_0 = "ueh_0", ueh_1 = "ueh_1", uei_0 = "uei_0", uei_1 = "uei_1", uej_0 = "uej_0", uej_1 = "uej_1", uek_0 = "uek_0", uek_1 = "uek_1", uel_0 = "uel_0", uel_1 = "uel_1", uem_0 = "uem_0", uem_1 = "uem_1", uen_0 = "uen_0", uen_1 = "uen_1", te0_0 = "te0_0", te0_1 = "te0_1", te1_0 = "te1_0", te1_1 = "te1_1", te2_0 = "te2_0", te2_1 = "te2_1", te3_0 = "te3_0", te3_1 = "te3_1", te4_0 = "te4_0", te4_1 = "te4_1", te5_0 = "te5_0", te5_1 = "te5_1", te6_0 = "te6_0", te6_1 = "te6_1", te7_0 = "te7_0", te7_1 = "te7_1", te8_0 = "te8_0", te8_1 = "te8_1", te9_0 = "te9_0", te9_1 = "te9_1", c0_0 = "c0_0", c0_1 = "c0_1", c1_0 = "c1_0", c1_1 = "c1_1", m0_0 = "m0_0", m0_1 = "m0_1", m1_0 = "m1_0", m1_1 = "m1_1", vlastni = "vlastni", popis_pid = "popis_pid", c = "c", druh_masky = "druh_masky", rok_kniha = "rok_kniha", aktivita_kniha = "aktivita_kniha", popis_pep = "popis_pep", bu_vl = "bu_vl", sk_vl = "sk_vl", ixs_fun_cil = "ixs_fun_cil", fun_hist = "fun_hist", poznamka_ixp = "poznamka_ixp", ks_db = "ks_db", ac_ag = "ac_ag", priz_view = "priz_view", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", ac_0 = "ac_0", ac_1 = "ac_1", ac_ag_0 = "ac_ag_0", ac_ag_1 = "ac_ag_1", stav_evi = "stav_evi", num_row = "num_row", a_cislo = "a_cislo", ft_text = "ft_text", ft_zdroj = "ft_zdroj", ft_oblast = "ft_oblast", ft_souvisejici = "ft_souvisejici", c_0 = "c_0", c_1 = "c_1",}
	const enum GRozsmskDtoFragments { ixs_msk = "*", nazev = "*", zkratka = "*", poznamka = "*", typ_masky = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*", ucs = "*", nks = "*", ixp = "*", ac = "*", ixs_typ = "*", drd = "*", rok_0 = "*", rok_1 = "*", mesic_0 = "*", mesic_1 = "*", den_0 = "*", den_1 = "*", ac_ixe_0 = "*", ac_ixe_1 = "*", s_zau = "*", uea_0 = "*", uea_1 = "*", ueb_0 = "*", ueb_1 = "*", uec_0 = "*", uec_1 = "*", ued_0 = "*", ued_1 = "*", uee_0 = "*", uee_1 = "*", uef_0 = "*", uef_1 = "*", ueg_0 = "*", ueg_1 = "*", ueh_0 = "*", ueh_1 = "*", uei_0 = "*", uei_1 = "*", uej_0 = "*", uej_1 = "*", uek_0 = "*", uek_1 = "*", uel_0 = "*", uel_1 = "*", uem_0 = "*", uem_1 = "*", uen_0 = "*", uen_1 = "*", te0_0 = "*", te0_1 = "*", te1_0 = "*", te1_1 = "*", te2_0 = "*", te2_1 = "*", te3_0 = "*", te3_1 = "*", te4_0 = "*", te4_1 = "*", te5_0 = "*", te5_1 = "*", te6_0 = "*", te6_1 = "*", te7_0 = "*", te7_1 = "*", te8_0 = "*", te8_1 = "*", te9_0 = "*", te9_1 = "*", c0_0 = "*", c0_1 = "*", c1_0 = "*", c1_1 = "*", m0_0 = "*", m0_1 = "*", m1_0 = "*", m1_1 = "*", vlastni = "*", popis_pid = "*", c = "*", druh_masky = "*", rok_kniha = "*", aktivita_kniha = "*", popis_pep = "*", bu_vl = "*", sk_vl = "*", ixs_fun_cil = "*", fun_hist = "*", poznamka_ixp = "*", ks_db = "*", ac_ag = "*", priz_view = "*", uus = "*", cis_real = "*", ixs_fun_vyriz = "*", ac_0 = "*", ac_1 = "*", ac_ag_0 = "*", ac_ag_1 = "*", stav_evi = "*", num_row = "*", a_cislo = "*", ft_text = "*", ft_zdroj = "*", ft_oblast = "*", ft_souvisejici = "*", c_0 = "*", c_1 = "*",}
	const enum GRozsmskDtoTypes { ixs_msk = "string", nazev = "string", zkratka = "string", poznamka = "string", typ_masky = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", ucs = "string", nks = "string", ixp = "string", ac = "string", ixs_typ = "string", drd = "number", rok_0 = "number", rok_1 = "number", mesic_0 = "number", mesic_1 = "number", den_0 = "number", den_1 = "number", ac_ixe_0 = "string", ac_ixe_1 = "string", s_zau = "number", uea_0 = "string", uea_1 = "string", ueb_0 = "string", ueb_1 = "string", uec_0 = "string", uec_1 = "string", ued_0 = "string", ued_1 = "string", uee_0 = "string", uee_1 = "string", uef_0 = "string", uef_1 = "string", ueg_0 = "string", ueg_1 = "string", ueh_0 = "string", ueh_1 = "string", uei_0 = "string", uei_1 = "string", uej_0 = "string", uej_1 = "string", uek_0 = "string", uek_1 = "string", uel_0 = "string", uel_1 = "string", uem_0 = "string", uem_1 = "string", uen_0 = "string", uen_1 = "string", te0_0 = "string", te0_1 = "string", te1_0 = "string", te1_1 = "string", te2_0 = "string", te2_1 = "string", te3_0 = "string", te3_1 = "string", te4_0 = "string", te4_1 = "string", te5_0 = "string", te5_1 = "string", te6_0 = "string", te6_1 = "string", te7_0 = "string", te7_1 = "string", te8_0 = "string", te8_1 = "string", te9_0 = "string", te9_1 = "string", c0_0 = "JsonDecimal", c0_1 = "JsonDecimal", c1_0 = "JsonDecimal", c1_1 = "JsonDecimal", m0_0 = "JsonDecimal", m0_1 = "JsonDecimal", m1_0 = "JsonDecimal", m1_1 = "JsonDecimal", vlastni = "number", popis_pid = "string", c = "JsonDecimal", druh_masky = "number", rok_kniha = "number", aktivita_kniha = "number", popis_pep = "string", bu_vl = "string", sk_vl = "string", ixs_fun_cil = "string", fun_hist = "number", poznamka_ixp = "string", ks_db = "string", ac_ag = "string", priz_view = "number", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", ac_0 = "string", ac_1 = "string", ac_ag_0 = "string", ac_ag_1 = "string", stav_evi = "number", num_row = "number", a_cislo = "string", ft_text = "string", ft_zdroj = "number", ft_oblast = "number", ft_souvisejici = "number", c_0 = "JsonDecimal", c_1 = "JsonDecimal",}
	const enum GRozsmskDtoTypeLengths { ixs_msk = 12, nazev = 50, zkratka = 16, poznamka = 50, zmenu_prov = 12, ico = 10, ucs = 10, nks = 12, ixp = 12, ac = 20, ixs_typ = 12, ac_ixe_0 = 20, ac_ixe_1 = 20, uea_0 = 3, uea_1 = 3, ueb_0 = 4, ueb_1 = 4, uec_0 = 12, uec_1 = 12, ued_0 = 12, ued_1 = 12, uee_0 = 12, uee_1 = 12, uef_0 = 3, uef_1 = 3, ueg_0 = 16, ueg_1 = 16, ueh_0 = 4, ueh_1 = 4, uei_0 = 4, uei_1 = 4, uej_0 = 16, uej_1 = 16, uek_0 = 6, uek_1 = 6, uel_0 = 10, uel_1 = 10, uem_0 = 10, uem_1 = 10, uen_0 = 6, uen_1 = 6, te0_0 = 20, te0_1 = 20, te1_0 = 16, te1_1 = 16, te2_0 = 20, te2_1 = 20, te3_0 = 6, te3_1 = 6, te4_0 = 12, te4_1 = 12, te5_0 = 30, te5_1 = 30, te6_0 = 12, te6_1 = 12, te7_0 = 20, te7_1 = 20, te8_0 = 12, te8_1 = 12, te9_0 = 20, te9_1 = 20, popis_pid = 50, popis_pep = 50, bu_vl = 34, sk_vl = 11, ixs_fun_cil = 12, poznamka_ixp = 254, ks_db = 254, ac_ag = 20, uus = 10, cis_real = 6, ixs_fun_vyriz = 12, ac_0 = 20, ac_1 = 20, ac_ag_0 = 20, ac_ag_1 = 20, a_cislo = 20, ft_text = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\ds\Roz\GRozsobd.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GRozsobdDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.akt_obd*/
		akt_obd?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.priz_schv*/
		priz_schv?: number|null;
	}
	const enum GRozsobdDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", drd = "drd", akt_obd = "akt_obd", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_schv = "priz_schv",}
	const enum GRozsobdDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", drd = "*", akt_obd = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", priz_schv = "*",}
	const enum GRozsobdDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", drd = "number", akt_obd = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", priz_schv = "number",}
	const enum GRozsobdDtoTypeLengths { lic = 4, ico = 10, ucs = 10, poznamka = 50, zmenu_prov = 12,}
	/**DBTABLE:Seznam*/
	interface GRozMesicDto {
		/**cislo mesice*/
		id?: number|null;
		/**cislo mesice jako string na 2 mista*/
		cislo?: string|null;
		/**Textovy nazev mesic*/
		nazev?: string|null;
	}
	const enum GRozMesicDtoNames { id = "id", cislo = "cislo", nazev = "nazev",}
	const enum GRozMesicDtoFragments { id = "*", cislo = "*", nazev = "*",}
	const enum GRozMesicDtoTypes { id = "number", cislo = "string", nazev = "string",}
	const enum GRozMesicDtoTypeLengths { cislo = 2, nazev = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\ds\Uct\GUctDefPolickaDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Definice policek formulare*/
	interface GUctDefPolickaDto {
        /**Typ hodnoty polozky*/
		TypHodnoty?: Gordic.Uct.Interface.GEUctTypPolicek|null;
        /**Popis polozky*/
		Describe?: string|null;
        /**Mozne volby pro typ List*/
		Volby?: Gordic.Uct.Interface.GUctPolickoSeznamuDto[]|null;
        /**Jmeno policka*/
		Name?: string|null;
        /**Vybrana/prednastavena hodnota*/
		Value?: number|null;
        /**ID policka*/
		ID?: number|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\ds\Uct\GUctPolickoSeznamuDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Policko seznamuseznamu*/
	interface GUctPolickoSeznamuDto {
        /**Id polozky*/
		Id?: number|null;
        /**Jmeno polozky*/
		Name?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\ds\Uct\GUctSeznamZapisuStavu.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:SeznamZapisuStavu*/
	interface GUctSeznamZapisuStavuDto {
		/**DBCOLUMN:SeznamZapisuStavu.lic*/
		lic?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uus*/
		uus?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.den*/
		den?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.ac*/
		ac?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.drd*/
		drd?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.drd_msk*/
		drd_msk?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.c0_new*/
		c0_new?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.c1_new*/
		c1_new?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamZapisuStavu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uea*/
		uea?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uec*/
		uec?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ued*/
		ued?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uee*/
		uee?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uef*/
		uef?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uei*/
		uei?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uej*/
		uej?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uek*/
		uek?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uel*/
		uel?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uem*/
		uem?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.uen*/
		uen?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te0*/
		te0?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te1*/
		te1?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te2*/
		te2?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te3*/
		te3?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te4*/
		te4?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te5*/
		te5?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te6*/
		te6?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te7*/
		te7?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te8*/
		te8?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.te9*/
		te9?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.popis*/
		popis?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.s_prep*/
		s_prep?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.rok_uej*/
		rok_uej?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.mesic_uej*/
		mesic_uej?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.zd*/
		zd?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.c0_as*/
		c0_as?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.c1_as*/
		c1_as?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.c0c1_new*/
		c0c1_new?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.c0c1*/
		c0c1?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.c0c1_as*/
		c0c1_as?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ixp_s*/
		ixp_s?: boolean|null;
		/**DBCOLUMN:SeznamZapisuStavu.ixp_prim*/
		ixp_prim?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.esu_ico*/
		esu_ico?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.esu_rc*/
		esu_rc?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.priz_ur*/
		priz_ur?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.pdok*/
		pdok?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.typ_nazev*/
		typ_nazev?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.priz_kur_roz*/
		priz_kur_roz?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.s_prep_aisp*/
		s_prep_aisp?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ixb_dzu*/
		ixb_dzu?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.ixp_roz*/
		ixp_roz?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.priz_blok*/
		priz_blok?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.c0c0_proc*/
		c0c0_proc?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.c1c1_proc*/
		c1c1_proc?: JsonDecimal|null;
		/**DBCOLUMN:SeznamZapisuStavu.value0*/
		value0?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.value1*/
		value1?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.status*/
		status?: number|null;
		/**DBCOLUMN:SeznamZapisuStavu.wildchar*/
		wildcard?: number|null;
		rok_sml?: number|null;
		cislo_sml?: number|null;
		ixp_sml?: string|null;
		/**DBCOLUMN:SeznamZapisuStavu.typ_ag_txt*/
		typ_ag_txt?: string|null;
		/**Strukturovany popis*/
		struktPopis?: ObjectLiteral<GStrukturovanyPopisFilterDto>|null;
		/**DBCOLUMN:SeznamZapisuStavu.ixs_typ_txt*/
		ixs_typ_txt?: string|null;
	}
	const enum GUctSeznamZapisuStavuDtoNames { lic = "lic", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", rok = "rok", mesic = "mesic", den = "den", ac = "ac", radek_z = "radek_z", drd = "drd", drd_msk = "drd_msk", c0_new = "c0_new", c1_new = "c1_new", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", popis = "popis", s_prep = "s_prep", rok_uej = "rok_uej", mesic_uej = "mesic_uej", zd = "zd", c0_as = "c0_as", c1_as = "c1_as", c0c1_new = "c0c1_new", c0c1 = "c0c1", c0c1_as = "c0c1_as", ixp = "ixp", ixp_s = "ixp_s", ixp_prim = "ixp_prim", esu_ico = "esu_ico", esu_rc = "esu_rc", ixs_esu = "ixs_esu", esu_txt = "esu_txt", priz_ur = "priz_ur", pdok = "pdok", ac_ag = "ac_ag", ixs_typ = "ixs_typ", typ_nazev = "typ_nazev", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", priz_kur_roz = "priz_kur_roz", s_prep_aisp = "s_prep_aisp", nazev_rf = "nazev_rf", ixb_dzu = "ixb_dzu", ixp_roz = "ixp_roz", priz_blok = "priz_blok", c0c0_proc = "c0c0_proc", c1c1_proc = "c1c1_proc", value0 = "value0", value1 = "value1", status = "status", wildcard = "wildcard", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ixp_sml = "ixp_sml", typ_ag_txt = "typ_ag_txt", struktPopis = "struktPopis", ixs_typ_txt = "ixs_typ_txt",}
	const enum GUctSeznamZapisuStavuDtoFragments { lic = "*", ico = "*", ucs = "*", uus = "*", nks = "*", rok = "*", mesic = "*", den = "*", ac = "*", radek_z = "*", drd = "*", drd_msk = "*", c0_new = "*", c1_new = "*", c0 = "*", c1 = "*", typ_ag = "*", dat_zmena = "*", zmenu_prov = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", popis = "*", s_prep = "*", rok_uej = "*", mesic_uej = "*", zd = "*", c0_as = "*", c1_as = "*", c0c1_new = "*", c0c1 = "*", c0c1_as = "*", ixp = "*", ixp_s = "*", ixp_prim = "*", esu_ico = "*", esu_rc = "*", ixs_esu = "*", esu_txt = "*", priz_ur = "*", pdok = "*", ac_ag = "*", ixs_typ = "*", typ_nazev = "*", id_hdr_ris = "*", radek_hdr = "*", priz_kur_roz = "*", s_prep_aisp = "*", nazev_rf = "*", ixb_dzu = "*", ixp_roz = "*", priz_blok = "*", c0c0_proc = "*", c1c1_proc = "*", value0 = "*", value1 = "*", status = "*", wildcard = "*", rok_sml = "*", cislo_sml = "*", ixp_sml = "*", typ_ag_txt = "*", struktPopis = "*", ixs_typ_txt = "*",}
	const enum GUctSeznamZapisuStavuDtoTypes { lic = "string", ico = "string", ucs = "string", uus = "string", nks = "string", rok = "number", mesic = "number", den = "number", ac = "string", radek_z = "number", drd = "number", drd_msk = "string", c0_new = "JsonDecimal", c1_new = "JsonDecimal", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", popis = "string", s_prep = "number", rok_uej = "number", mesic_uej = "number", zd = "number", c0_as = "JsonDecimal", c1_as = "JsonDecimal", c0c1_new = "JsonDecimal", c0c1 = "JsonDecimal", c0c1_as = "JsonDecimal", ixp = "string", ixp_s = "boolean", ixp_prim = "string", esu_ico = "string", esu_rc = "string", ixs_esu = "string", esu_txt = "string", priz_ur = "number", pdok = "string", ac_ag = "string", ixs_typ = "string", typ_nazev = "string", id_hdr_ris = "string", radek_hdr = "number", priz_kur_roz = "number", s_prep_aisp = "number", nazev_rf = "string", ixb_dzu = "string", ixp_roz = "string", priz_blok = "number", c0c0_proc = "JsonDecimal", c1c1_proc = "JsonDecimal", value0 = "string", value1 = "string", status = "number", wildcard = "number", rok_sml = "number", cislo_sml = "number", ixp_sml = "string", typ_ag_txt = "string", struktPopis = "ObjectLiteral<GStrukturovanyPopisFilterDto>", ixs_typ_txt = "string",}
	const enum GUctSeznamZapisuStavuDtoTypeLengths { lic = 4, ico = 10, ucs = 10, uus = 10, nks = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Common\GEkosucsDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro*/
	interface GEkosucsDto {
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**lic*/
		lic?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**arw*/
		arw?: number|null;
		/**poznámka*/
		poznamka?: string|null;
		/**datum od*/
		dat_od?: JsonDate|null;
		/**datum do*/
		dat_do?: JsonDate|null;
		/**název*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**ixs su*/
		ixs_su?: string|null;
		/**ixs esu*/
		ixs_esu?: string|null;
		/**rok od*/
		rok_od?: number|null;
		/**rok do*/
		rok_do?: number|null;
		/**akt prohl*/
		akt_prohl?: number|null;
		/**rezim fin*/
		rezim_fin?: number|null;
		/**ixs ose*/
		ixs_ose?: string|null;
		/**ičo ext*/
		ico_ext?: string|null;
		/**ucs ext*/
		ucs_ext?: string|null;
		/**fm iissp*/
		fm_iissp?: string|null;
		/**blok iissp*/
		blok_iissp?: number|null;
		/**ičo 1*/
		ico_1?: string|null;
		/**ucs 1*/
		ucs_1?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**rok od 1*/
		rok_od_1?: number|null;
		/**rok do 1*/
		rok_do_1?: number|null;
		/**aktivita 1*/
		aktivita_1?: number|null;
		/**datum změna 1*/
		dat_zmena_1?: JsonDate|null;
		/**zmenu prov 1*/
		zmenu_prov_1?: string|null;
		/**k v*/
		k_v?: number|null;
		/**rezim fin 1*/
		rezim_fin_1?: number|null;
		/**rezim uct*/
		rezim_uct?: number|null;
		/**datum mpd*/
		dat_mpd?: JsonDate|null;
		/**priz pam*/
		priz_pam?: number|null;
	}
	const enum GEkosucsDtoNames { ico = "ico", ucs = "ucs", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", zkratka = "zkratka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_su = "ixs_su", ixs_esu = "ixs_esu", rok_od = "rok_od", rok_do = "rok_do", akt_prohl = "akt_prohl", rezim_fin = "rezim_fin", ixs_ose = "ixs_ose", ico_ext = "ico_ext", ucs_ext = "ucs_ext", fm_iissp = "fm_iissp", blok_iissp = "blok_iissp", ico_1 = "ico_1", ucs_1 = "ucs_1", nks = "nks", rok_od_1 = "rok_od_1", rok_do_1 = "rok_do_1", aktivita_1 = "aktivita_1", dat_zmena_1 = "dat_zmena_1", zmenu_prov_1 = "zmenu_prov_1", k_v = "k_v", rezim_fin_1 = "rezim_fin_1", rezim_uct = "rezim_uct", dat_mpd = "dat_mpd", priz_pam = "priz_pam",}
	const enum GEkosucsDtoFragments { ico = "main", ucs = "main", lic = "main", aktivita = "main", arw = "main", poznamka = "main", dat_od = "main", dat_do = "main", nazev = "main", zkratka = "main", dat_zmena = "main", zmenu_prov = "main", ixs_su = "main", ixs_esu = "main", rok_od = "main", rok_do = "main", akt_prohl = "main", rezim_fin = "main", ixs_ose = "main", ico_ext = "main", ucs_ext = "main", fm_iissp = "main", blok_iissp = "main", ico_1 = "main", ucs_1 = "main", nks = "main", rok_od_1 = "main", rok_do_1 = "main", aktivita_1 = "main", dat_zmena_1 = "main", zmenu_prov_1 = "main", k_v = "main", rezim_fin_1 = "main", rezim_uct = "main", dat_mpd = "main", priz_pam = "main",}
	const enum GEkosucsDtoTypes { ico = "string", ucs = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", zkratka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_su = "string", ixs_esu = "string", rok_od = "number", rok_do = "number", akt_prohl = "number", rezim_fin = "number", ixs_ose = "string", ico_ext = "string", ucs_ext = "string", fm_iissp = "string", blok_iissp = "number", ico_1 = "string", ucs_1 = "string", nks = "string", rok_od_1 = "number", rok_do_1 = "number", aktivita_1 = "number", dat_zmena_1 = "JsonDate", zmenu_prov_1 = "string", k_v = "number", rezim_fin_1 = "number", rezim_uct = "number", dat_mpd = "JsonDate", priz_pam = "number",}
	const enum GEkosucsDtoTypeLengths { ico = 10, ucs = 10, lic = 4, poznamka = 50, nazev = 50, zkratka = 16, zmenu_prov = 12, ixs_su = 12, ixs_esu = 12, ixs_ose = 12, ico_ext = 10, ucs_ext = 10, fm_iissp = 20, ico_1 = 10, ucs_1 = 10, nks = 12, zmenu_prov_1 = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Common\GEkosuvlDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:ekosuvl*/
	interface GEkosuvlDto {
		/**DBCOLUMN:ekosuvl.rok*/
		rok?: number|null;
		/**DBCOLUMN:ekosuvl.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekosuvl.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:ekosuvl.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:ekosuvl.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:ekosuvl.bu_txt*/
		bu_txt?: string|null;
		/**DBCOLUMN:ekosuvl.ktg_bu*/
		ktg_bu?: number|null;
		/**DBCOLUMN:ekosuvl.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekosuvl.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ekosuvl.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ekosuvl.uea_lim*/
		uea_lim?: string|null;
		/**DBCOLUMN:ekosuvl.ueb_lim*/
		ueb_lim?: string|null;
		/**DBCOLUMN:ekosuvl.ixs_esu_ban*/
		ixs_esu_ban?: string|null;
		/**DBCOLUMN:ekosuvl.c_lim*/
		c_lim?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.c_kuhr*/
		c_kuhr?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.c_uhr*/
		c_uhr?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.typ_bu*/
		typ_bu?: number|null;
		/**DBCOLUMN:ekosuvl.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekosuvl.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekosuvl.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekosuvl.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:ekosuvl.mena*/
		mena?: number|null;
		/**DBCOLUMN:ekosuvl.uea_uc*/
		uea_uc?: string|null;
		/**DBCOLUMN:ekosuvl.ueb_uc*/
		ueb_uc?: string|null;
		/**DBCOLUMN:ekosuvl.subrada_duz*/
		subrada_duz?: number|null;
		/**DBCOLUMN:ekosuvl.priz_up_bu*/
		priz_up_bu?: number|null;
		/**DBCOLUMN:ekosuvl.ixp_den_buc*/
		ixp_den_buc?: string|null;
		/**DBCOLUMN:ekosuvl.sbu*/
		sbu?: number|null;
		/**DBCOLUMN:ekosuvl.dat_bvy*/
		dat_bvy?: JsonDate|null;
		/**DBCOLUMN:ekosuvl.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.c_rok_db*/
		c_rok_db?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.c_rok_kr*/
		c_rok_kr?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.c_zust*/
		c_zust?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.druh_bu*/
		druh_bu?: number|null;
		/**DBCOLUMN:ekosuvl.cis_bvy*/
		cis_bvy?: number|null;
		/**DBCOLUMN:ekosuvl.ixp_bvy*/
		ixp_bvy?: string|null;
		/**DBCOLUMN:ekosuvl.c_lim_max*/
		c_lim_max?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.uus*/
		uus?: string|null;
		/**DBCOLUMN:ekosuvl.iban*/
		iban?: string|null;
		/**DBCOLUMN:ekosuvl.zc_vyp*/
		zc_vyp?: number|null;
		/**DBCOLUMN:ekosuvl.per_vyp*/
		per_vyp?: number|null;
		/**DBCOLUMN:ekosuvl.ur_prist_bu*/
		ur_prist_bu?: number|null;
		/**DBCOLUMN:ekosuvl.priz_isprofin*/
		priz_isprofin?: number|null;
		/**DBCOLUMN:ekosuvl.kod_vys*/
		kod_vys?: string|null;
		/**DBCOLUMN:ekosuvl.kon_maxlim*/
		kon_maxlim?: number|null;
		/**DBCOLUMN:ekosuvl.par_vyp*/
		par_vyp?: number|null;
		/**DBCOLUMN:ekosuvl.c_lim_ban*/
		c_lim_ban?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.c_zust_ban*/
		c_zust_ban?: JsonDecimal|null;
		/**DBCOLUMN:ekosuvl.dat_bvy_ban*/
		dat_bvy_ban?: JsonDate|null;
		/**DBCOLUMN:ekosuvl.dat_ttv*/
		dat_ttv?: JsonDate|null;
		/**DBCOLUMN:ekosuvl.priz_sr*/
		priz_sr?: number|null;
		/**DBCOLUMN:ekosuvl.id_hdr_ris_kr*/
		id_hdr_ris_kr?: string|null;
		/**DBCOLUMN:ekosuvl.radek_hdr_kr*/
		radek_hdr_kr?: number|null;
		/**DBCOLUMN:ekosuvl.priz_rozp*/
		priz_rozp?: number|null;
	}
	const enum GEkosuvlDtoNames { rok = "rok", ico = "ico", ucs = "ucs", bu_vl = "bu_vl", sk_vl = "sk_vl", bu_txt = "bu_txt", ktg_bu = "ktg_bu", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", uea_lim = "uea_lim", ueb_lim = "ueb_lim", ixs_esu_ban = "ixs_esu_ban", c_lim = "c_lim", c_kuhr = "c_kuhr", c_uhr = "c_uhr", typ_bu = "typ_bu", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", zkratka = "zkratka", mena = "mena", uea_uc = "uea_uc", ueb_uc = "ueb_uc", subrada_duz = "subrada_duz", priz_up_bu = "priz_up_bu", ixp_den_buc = "ixp_den_buc", sbu = "sbu", dat_bvy = "dat_bvy", c_ps = "c_ps", c_rok_db = "c_rok_db", c_rok_kr = "c_rok_kr", c_zust = "c_zust", druh_bu = "druh_bu", cis_bvy = "cis_bvy", ixp_bvy = "ixp_bvy", c_lim_max = "c_lim_max", uus = "uus", iban = "iban", zc_vyp = "zc_vyp", per_vyp = "per_vyp", ur_prist_bu = "ur_prist_bu", priz_isprofin = "priz_isprofin", kod_vys = "kod_vys", kon_maxlim = "kon_maxlim", par_vyp = "par_vyp", c_lim_ban = "c_lim_ban", c_zust_ban = "c_zust_ban", dat_bvy_ban = "dat_bvy_ban", dat_ttv = "dat_ttv", priz_sr = "priz_sr", id_hdr_ris_kr = "id_hdr_ris_kr", radek_hdr_kr = "radek_hdr_kr", priz_rozp = "priz_rozp",}
	const enum GEkosuvlDtoFragments { rok = "*", ico = "*", ucs = "*", bu_vl = "*", sk_vl = "*", bu_txt = "*", ktg_bu = "*", aktivita = "*", dat_od = "*", dat_do = "*", uea_lim = "*", ueb_lim = "*", ixs_esu_ban = "*", c_lim = "*", c_kuhr = "*", c_uhr = "*", typ_bu = "*", dat_zmena = "*", zmenu_prov = "*", nazev = "*", zkratka = "*", mena = "*", uea_uc = "*", ueb_uc = "*", subrada_duz = "*", priz_up_bu = "*", ixp_den_buc = "*", sbu = "*", dat_bvy = "*", c_ps = "*", c_rok_db = "*", c_rok_kr = "*", c_zust = "*", druh_bu = "*", cis_bvy = "*", ixp_bvy = "*", c_lim_max = "*", uus = "*", iban = "*", zc_vyp = "*", per_vyp = "*", ur_prist_bu = "*", priz_isprofin = "*", kod_vys = "*", kon_maxlim = "*", par_vyp = "*", c_lim_ban = "*", c_zust_ban = "*", dat_bvy_ban = "*", dat_ttv = "*", priz_sr = "*", id_hdr_ris_kr = "*", radek_hdr_kr = "*", priz_rozp = "*",}
	const enum GEkosuvlDtoTypes { rok = "number", ico = "string", ucs = "string", bu_vl = "string", sk_vl = "string", bu_txt = "string", ktg_bu = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", uea_lim = "string", ueb_lim = "string", ixs_esu_ban = "string", c_lim = "JsonDecimal", c_kuhr = "JsonDecimal", c_uhr = "JsonDecimal", typ_bu = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", zkratka = "string", mena = "number", uea_uc = "string", ueb_uc = "string", subrada_duz = "number", priz_up_bu = "number", ixp_den_buc = "string", sbu = "number", dat_bvy = "JsonDate", c_ps = "JsonDecimal", c_rok_db = "JsonDecimal", c_rok_kr = "JsonDecimal", c_zust = "JsonDecimal", druh_bu = "number", cis_bvy = "number", ixp_bvy = "string", c_lim_max = "JsonDecimal", uus = "string", iban = "string", zc_vyp = "number", per_vyp = "number", ur_prist_bu = "number", priz_isprofin = "number", kod_vys = "string", kon_maxlim = "number", par_vyp = "number", c_lim_ban = "JsonDecimal", c_zust_ban = "JsonDecimal", dat_bvy_ban = "JsonDate", dat_ttv = "JsonDate", priz_sr = "number", id_hdr_ris_kr = "string", radek_hdr_kr = "number", priz_rozp = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Common\GPidDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datovy objekt pro ulozeni kolekce pidu dokladu*/
	interface GPidDto {
		/**Identifikator predavaneho dokladu*/
		ixp?: string|null;
		/**Datum posledni zmeny dokladu*/
		dat_zmena?: JsonDate|null;
		/**Stav dokladu*/
		s_zau?: number|null;
		/**Atribut storna*/
		eko_akt?: number|null;
		/**Akce provedena na formulari*/
		action?: Gordic.Uct.Interface.GEAkceFormulare|null;
		/**Vysledny kod zpracovani dokladu*/
		returnType?: Gordic.Uct.Interface.GETypyChyb|null;
		/**Kod chyby, pokud dojde k nejake chybe pri zpracovani dokladu*/
		code?: number|null;
		/**Text chybove hlasky*/
		message?: string|null;
	}
	const enum GPidDtoNames { ixp = "ixp", dat_zmena = "dat_zmena", s_zau = "s_zau", eko_akt = "eko_akt", action = "action", returnType = "returnType", code = "code", message = "message",}
	const enum GPidDtoFragments { ixp = "*", dat_zmena = "*", s_zau = "*", eko_akt = "*", action = "*", returnType = "*", code = "*", message = "*",}
	const enum GPidDtoTypes { ixp = "string", dat_zmena = "JsonDate", s_zau = "number", eko_akt = "number", action = "Gordic.Uct.Interface.GEAkceFormulare", returnType = "Gordic.Uct.Interface.GETypyChyb", code = "number", message = "string",}
	const enum GPidDtoTypeLengths {}
	/**Datovy objekt pro ulozeni kolekce pidu dokladu vcetne identifikatoru radku*/
	interface GPidRowDto extends Gordic.Uct.Interface.GPidDto {
		/**Identifikator radku dokladu*/
		radek_z?: number|null;
	}
	const enum GPidRowDtoNames { radek_z = "radek_z", ixp = "ixp", dat_zmena = "dat_zmena", s_zau = "s_zau", eko_akt = "eko_akt", action = "action", returnType = "returnType", code = "code", message = "message",}
	const enum GPidRowDtoFragments { radek_z = "*", ixp = "*", dat_zmena = "*", s_zau = "*", eko_akt = "*", action = "*", returnType = "*", code = "*", message = "*",}
	const enum GPidRowDtoTypes { radek_z = "number", ixp = "string", dat_zmena = "JsonDate", s_zau = "number", eko_akt = "number", action = "Gordic.Uct.Interface.GEAkceFormulare", returnType = "Gordic.Uct.Interface.GETypyChyb", code = "number", message = "string",}
	const enum GPidRowDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Common\GRozvrhDatovaVetaDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:uctsroz*/
	interface GRozvrhDatovaVetaDto {
		/**DBCOLUMN:uctsroz.ixs_roz*/
		ixs_roz?: string|null;
		/**DBCOLUMN:uctsroz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:uctsroz.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:uctsroz.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:uctsroz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:uctsroz.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:uctsroz.zkratka*/
		code?: string|null;
		/**DBCOLUMN:uctsroz.nazev*/
		nazev?: string|null;
	}
	const enum GRozvrhDatovaVetaDtoNames { ixs_roz = "ixs_roz", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zkratka = "zkratka", code = "code", nazev = "nazev",}
	const enum GRozvrhDatovaVetaDtoFragments { ixs_roz = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zkratka = "*", code = "*", nazev = "*",}
	const enum GRozvrhDatovaVetaDtoTypes { ixs_roz = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zkratka = "string", code = "string", nazev = "string",}
	const enum GRozvrhDatovaVetaDtoTypeLengths { ixs_roz = 12, poznamka = 50, zkratka = 16, code = 16, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Common\GZapisyIdentDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datovy objekt pro jednoznacnou identifikaci zapisu*/
	interface GZapisyIdent extends Gordic.Uct.Interface.GUctInOutParamsDto {
		/**Identifikatory zapisu*/
		identZapisu?: Gordic.Uct.Interface.GUctRadekZDto[]|null;
	}
	const enum GZapisyIdentNames { identZapisu = "identZapisu", PidDokladu = "PidDokladu", IdMessage = "IdMessage", TransferMessage = "TransferMessage", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", StavDokladu = "StavDokladu", StavDokladuTxt = "StavDokladuTxt",}
	const enum GZapisyIdentFragments { identZapisu = "*", PidDokladu = "*", IdMessage = "*", TransferMessage = "*", DatumPosledniZmenyDokladu = "*", StavDokladu = "*", StavDokladuTxt = "*",}
	const enum GZapisyIdentTypes { identZapisu = "Gordic.Uct.Interface.GUctRadekZDto[]", PidDokladu = "string", IdMessage = "string", TransferMessage = "Gordic.Eko.Interface.GTransferMessage", DatumPosledniZmenyDokladu = "JsonDate", StavDokladu = "number", StavDokladuTxt = "string",}
	const enum GZapisyIdentTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GDatabaseParamsDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Global DTO s databazovymi parametry*/
	interface GDatabaseParamsDto {
		/**Parametr, zda je pozadovana vazba uctarny funkci*/
		VazbaUctarnyNaFunkci?: boolean|null;
		/**Parametr, zda je pozadovana vazba NKS na funkci*/
		VazbaNksNaFunkci?: boolean|null;
		/**Parametr, ktery umoznuje menit uctarnu i po schvaleni*/
		PovolenaZmenaUctarnyPoSchvaleni?: boolean|null;
		/**Parametr rezimu pristupu*/
		RezimProvozu?: Gordic.Uct.Interface.RezimProvozuEnum|null;
		/**Povoleni zmeny kompetenta*/
		PovoleniZmenitKompetenta?: boolean|null;
		/**Parametr, zda aplikace pracuje s manazery cilu (pouze MO)*/
		ZpracovatManazeryCilu?: boolean|null;
		/**Parametr, zda je mozno editovat data i ve stavu Navrh*/
		PovolenaRozsirenaEditaceHlavicky?: boolean|null;
		/**Napisy policek v porizovaci*/
		NazevPoleC0?: string|null;
		/**Napisy policek v porizovaci*/
		NazevPoleC1?: string|null;
		/**Priznak zda pid generovat nebo sejmout stitkem (text ano/ne)*/
		PovolitGenerovaniPiduDokladu?: boolean|null;
		/**Algoritmus filtrovani PVS*/
		AlgoritmusFiltrovaniPVS?: string|null;
		/**Zpusob zadani priznaku balancovatelnosti*/
		ZadaniPriznakuBalancovatelnosti?: Gordic.Uct.Interface.ZadaniPriznakuBalancovatelnostiEnum|null;
		/**Priznak, zda se pracuje s a-hlavickami*/
		SpravaAHlavicek?: boolean|null;
		/**Zobrazovani pidu polickach v SML a POZ*/
		ZobrazovatPIDVPrimDokladech?: boolean|null;
		/**Priznak zda je povolena funkcnost validace*/
		PovolenaFunkcnostValidace?: boolean|null;
		/**Nazev pevne masky*/
		NazevPevneMasky?: string|null;
		/**Omezeni vyberu na seznamu pevnou maskou*/
		OmezeniVyberuPevnouMaskou?: boolean|null;
		/**Omezeni vyberu na seznamu pevnou maskou + dalsi omezujici funkcnost specificka pouze pro BIS*/
		PouzitiMaterialovychKompetentu?: boolean|null;
		/**Parametr ktery rika, ze pokud je nastaveno pouziti pevne masky a neni nastaveno pro uzivatele zadne seskupeni (masky), potom bud zobrazim vsechny (T) nebo nezobranim nic (F - default)*/
		UseDefaultniSeskupeni?: boolean|null;
		/**Pokud je hodnota true, pak se predvyplnuje ns do rozpoctovych zapisu
		*     ROZ – ŘP VLZR Předplnění NS v zápisech
		*/
		PreplneniNSVZapisech?: boolean|null;
		/**Parametr povoli uzivateli porizovani novych zapisu pouze pomoci predkontaci*/
		ZapnutoPorizovaniZapisuPredkontaci?: boolean|null;
		/**Rezim uctovani dle kategorie dokladu (vyberovy fomular centralni/decentralni)*/
		UrceniRezimuUctovaniDleKategorieDokladu?: boolean|null;
		/**Seznam masek pro filtrovani v porizovaci*/
		SeznamMasek?: any|null;
		/**Priznak, zda je povoleno pouziti vazani vydaju RZAM*/
		VazaniRZAM?: boolean|null;
		/**pokud je povoleno, pak 1)muzu specifikovat rok pri vyrobe rozdpepu, 2) vsechny rozdpepy na dalsi leta dostanou drd 9.
		*     (Drdy 9 se nezapocitavaji do aktualnich zdroju!)
		*/
		ViceleteRozpoctovani?: Gordic.Uct.Interface.ViceleteRozpoctovaniEnum|null;
	}
	const enum GDatabaseParamsDtoNames { VazbaUctarnyNaFunkci = "VazbaUctarnyNaFunkci", VazbaNksNaFunkci = "VazbaNksNaFunkci", PovolenaZmenaUctarnyPoSchvaleni = "PovolenaZmenaUctarnyPoSchvaleni", RezimProvozu = "RezimProvozu", PovoleniZmenitKompetenta = "PovoleniZmenitKompetenta", ZpracovatManazeryCilu = "ZpracovatManazeryCilu", PovolenaRozsirenaEditaceHlavicky = "PovolenaRozsirenaEditaceHlavicky", NazevPoleC0 = "NazevPoleC0", NazevPoleC1 = "NazevPoleC1", PovolitGenerovaniPiduDokladu = "PovolitGenerovaniPiduDokladu", AlgoritmusFiltrovaniPVS = "AlgoritmusFiltrovaniPVS", ZadaniPriznakuBalancovatelnosti = "ZadaniPriznakuBalancovatelnosti", SpravaAHlavicek = "SpravaAHlavicek", ZobrazovatPIDVPrimDokladech = "ZobrazovatPIDVPrimDokladech", PovolenaFunkcnostValidace = "PovolenaFunkcnostValidace", NazevPevneMasky = "NazevPevneMasky", OmezeniVyberuPevnouMaskou = "OmezeniVyberuPevnouMaskou", PouzitiMaterialovychKompetentu = "PouzitiMaterialovychKompetentu", UseDefaultniSeskupeni = "UseDefaultniSeskupeni", PreplneniNSVZapisech = "PreplneniNSVZapisech", ZapnutoPorizovaniZapisuPredkontaci = "ZapnutoPorizovaniZapisuPredkontaci", UrceniRezimuUctovaniDleKategorieDokladu = "UrceniRezimuUctovaniDleKategorieDokladu", SeznamMasek = "SeznamMasek", VazaniRZAM = "VazaniRZAM", ViceleteRozpoctovani = "ViceleteRozpoctovani",}
	const enum GDatabaseParamsDtoFragments { VazbaUctarnyNaFunkci = "*", VazbaNksNaFunkci = "*", PovolenaZmenaUctarnyPoSchvaleni = "*", RezimProvozu = "*", PovoleniZmenitKompetenta = "*", ZpracovatManazeryCilu = "*", PovolenaRozsirenaEditaceHlavicky = "*", NazevPoleC0 = "*", NazevPoleC1 = "*", PovolitGenerovaniPiduDokladu = "*", AlgoritmusFiltrovaniPVS = "*", ZadaniPriznakuBalancovatelnosti = "*", SpravaAHlavicek = "*", ZobrazovatPIDVPrimDokladech = "*", PovolenaFunkcnostValidace = "*", NazevPevneMasky = "*", OmezeniVyberuPevnouMaskou = "*", PouzitiMaterialovychKompetentu = "*", UseDefaultniSeskupeni = "*", PreplneniNSVZapisech = "*", ZapnutoPorizovaniZapisuPredkontaci = "*", UrceniRezimuUctovaniDleKategorieDokladu = "*", SeznamMasek = "*", VazaniRZAM = "*", ViceleteRozpoctovani = "*",}
	const enum GDatabaseParamsDtoTypes { VazbaUctarnyNaFunkci = "boolean", VazbaNksNaFunkci = "boolean", PovolenaZmenaUctarnyPoSchvaleni = "boolean", RezimProvozu = "Gordic.Uct.Interface.RezimProvozuEnum", PovoleniZmenitKompetenta = "boolean", ZpracovatManazeryCilu = "boolean", PovolenaRozsirenaEditaceHlavicky = "boolean", NazevPoleC0 = "string", NazevPoleC1 = "string", PovolitGenerovaniPiduDokladu = "boolean", AlgoritmusFiltrovaniPVS = "string", ZadaniPriznakuBalancovatelnosti = "Gordic.Uct.Interface.ZadaniPriznakuBalancovatelnostiEnum", SpravaAHlavicek = "boolean", ZobrazovatPIDVPrimDokladech = "boolean", PovolenaFunkcnostValidace = "boolean", NazevPevneMasky = "string", OmezeniVyberuPevnouMaskou = "boolean", PouzitiMaterialovychKompetentu = "boolean", UseDefaultniSeskupeni = "boolean", PreplneniNSVZapisech = "boolean", ZapnutoPorizovaniZapisuPredkontaci = "boolean", UrceniRezimuUctovaniDleKategorieDokladu = "boolean", SeznamMasek = "any", VazaniRZAM = "boolean", ViceleteRozpoctovani = "Gordic.Uct.Interface.ViceleteRozpoctovaniEnum",}
	const enum GDatabaseParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GEkoParamsDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Global DTO s ekonomickymi parametry*/
	interface GEkoParamsDto {
		/**Ico vybrane pri ekonomicke inicializaci*/
		Ico?: string|null;
		/**Aktualni ucetni obdobi*/
		Rok?: number|null;
		/**Stredisko uctovani*/
		Ucs?: string|null;
		/**Nakladove stredisko*/
		Nks?: string|null;
		/**Vlasni NKS*/
		NksVl?: string|null;
		/**Uctarna*/
		Uus?: string|null;
		/**Subrada*/
		Subrada?: number|null;
		/**Pid vybrane knihy*/
		IxpDen?: string|null;
		/**Aktivita subrady*/
		AktSubrady?: number|null;
		/**Priznak komunikace se statni pokladnou*/
		PrizIissp?: number|null;
		/**Ucetni rozvrh*/
		IxsRoz?: string|null;
		/**Povoleni zadavat znaky do ucetnich slov*/
		PrizCheckUete?: number|null;
		/**Rok sberu pro VLZR*/
		RokSberu?: number|null;
	}
	const enum GEkoParamsDtoNames { Ico = "Ico", Rok = "Rok", Ucs = "Ucs", Nks = "Nks", NksVl = "NksVl", Uus = "Uus", Subrada = "Subrada", IxpDen = "IxpDen", AktSubrady = "AktSubrady", PrizIissp = "PrizIissp", IxsRoz = "IxsRoz", PrizCheckUete = "PrizCheckUete", RokSberu = "RokSberu",}
	const enum GEkoParamsDtoFragments { Ico = "*", Rok = "*", Ucs = "*", Nks = "*", NksVl = "*", Uus = "*", Subrada = "*", IxpDen = "*", AktSubrady = "*", PrizIissp = "*", IxsRoz = "*", PrizCheckUete = "*", RokSberu = "*",}
	const enum GEkoParamsDtoTypes { Ico = "string", Rok = "number", Ucs = "string", Nks = "string", NksVl = "string", Uus = "string", Subrada = "number", IxpDen = "string", AktSubrady = "number", PrizIissp = "number", IxsRoz = "string", PrizCheckUete = "number", RokSberu = "number",}
	const enum GEkoParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozAkceSeznamuDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO se seznamem akci na seznamu*/
	interface GRozAkceSeznamuDto {
        /**Podani dokladu*/
		PodaniVisible?: boolean|null;
        /**Detail*/
		DetailVisible?: boolean|null;
        /**Predani*/
		PredaniVisible?: boolean|null;
        /**Prideleni*/
		PrideleniVisible?: boolean|null;
        /**Preevidence*/
		PreevidenceVisible?: boolean|null;
        /**Klicova slova*/
		KlicovaSlovaVisible?: boolean|null;
        /**Tisk*/
		TiskVisible?: boolean|null;
        /**Obcerstvit*/
		ObcerstvitVisible?: boolean|null;
        /**Podani dokladu*/
		PodaniEnable?: boolean|null;
        /**Detail*/
		DetailEnable?: boolean|null;
        /**Predani*/
		PredaniEnable?: boolean|null;
        /**Prideleni*/
		PrideleniEnable?: boolean|null;
        /**Preevidence*/
		PreevidenceEnable?: boolean|null;
        /**Klicova slova*/
		KlicovaSlovaEnable?: boolean|null;
        /**Tisk*/
		TiskEnable?: boolean|null;
        /**Obcerstvit*/
		ObcerstvitEnable?: boolean|null;
        /**Podani dokladu*/
		PodaniText?: string|null;
        /**Detail*/
		DetailText?: string|null;
        /**Predani*/
		PredaniText?: string|null;
        /**Prideleni*/
		PrideleniText?: string|null;
        /**Preevidence*/
		PreevidenceText?: string|null;
        /**Klicova slova*/
		KlicovaSlovaText?: string|null;
        /**Tisk*/
		TiskText?: string|null;
        /**Obcerstvit*/
		ObcerstvitText?: string|null;
        /**Podani dokladu*/
		PodaniDisableText?: string|null;
        /**Detail*/
		DetailDisableText?: string|null;
        /**Predani*/
		PredaniDisableText?: string|null;
        /**Prideleni*/
		PrideleniDisableText?: string|null;
        /**Preevidence*/
		PreevidenceDisableText?: string|null;
        /**Klicova slova*/
		KlicovaSlovaDisableText?: string|null;
        /**Tisk*/
		TiskDisableText?: string|null;
        /**Obcerstvit*/
		ObcerstvitDisableText?: string|null;
	}
	const enum GRozAkceSeznamuDtoNames { PodaniVisible = "PodaniVisible", DetailVisible = "DetailVisible", PredaniVisible = "PredaniVisible", PrideleniVisible = "PrideleniVisible", PreevidenceVisible = "PreevidenceVisible", KlicovaSlovaVisible = "KlicovaSlovaVisible", TiskVisible = "TiskVisible", ObcerstvitVisible = "ObcerstvitVisible", PodaniEnable = "PodaniEnable", DetailEnable = "DetailEnable", PredaniEnable = "PredaniEnable", PrideleniEnable = "PrideleniEnable", PreevidenceEnable = "PreevidenceEnable", KlicovaSlovaEnable = "KlicovaSlovaEnable", TiskEnable = "TiskEnable", ObcerstvitEnable = "ObcerstvitEnable", PodaniText = "PodaniText", DetailText = "DetailText", PredaniText = "PredaniText", PrideleniText = "PrideleniText", PreevidenceText = "PreevidenceText", KlicovaSlovaText = "KlicovaSlovaText", TiskText = "TiskText", ObcerstvitText = "ObcerstvitText", PodaniDisableText = "PodaniDisableText", DetailDisableText = "DetailDisableText", PredaniDisableText = "PredaniDisableText", PrideleniDisableText = "PrideleniDisableText", PreevidenceDisableText = "PreevidenceDisableText", KlicovaSlovaDisableText = "KlicovaSlovaDisableText", TiskDisableText = "TiskDisableText", ObcerstvitDisableText = "ObcerstvitDisableText",}
	const enum GRozAkceSeznamuDtoFragments { PodaniVisible = "*", DetailVisible = "*", PredaniVisible = "*", PrideleniVisible = "*", PreevidenceVisible = "*", KlicovaSlovaVisible = "*", TiskVisible = "*", ObcerstvitVisible = "*", PodaniEnable = "*", DetailEnable = "*", PredaniEnable = "*", PrideleniEnable = "*", PreevidenceEnable = "*", KlicovaSlovaEnable = "*", TiskEnable = "*", ObcerstvitEnable = "*", PodaniText = "*", DetailText = "*", PredaniText = "*", PrideleniText = "*", PreevidenceText = "*", KlicovaSlovaText = "*", TiskText = "*", ObcerstvitText = "*", PodaniDisableText = "*", DetailDisableText = "*", PredaniDisableText = "*", PrideleniDisableText = "*", PreevidenceDisableText = "*", KlicovaSlovaDisableText = "*", TiskDisableText = "*", ObcerstvitDisableText = "*",}
	const enum GRozAkceSeznamuDtoTypes { PodaniVisible = "boolean", DetailVisible = "boolean", PredaniVisible = "boolean", PrideleniVisible = "boolean", PreevidenceVisible = "boolean", KlicovaSlovaVisible = "boolean", TiskVisible = "boolean", ObcerstvitVisible = "boolean", PodaniEnable = "boolean", DetailEnable = "boolean", PredaniEnable = "boolean", PrideleniEnable = "boolean", PreevidenceEnable = "boolean", KlicovaSlovaEnable = "boolean", TiskEnable = "boolean", ObcerstvitEnable = "boolean", PodaniText = "string", DetailText = "string", PredaniText = "string", PrideleniText = "string", PreevidenceText = "string", KlicovaSlovaText = "string", TiskText = "string", ObcerstvitText = "string", PodaniDisableText = "string", DetailDisableText = "string", PredaniDisableText = "string", PrideleniDisableText = "string", PreevidenceDisableText = "string", KlicovaSlovaDisableText = "string", TiskDisableText = "string", ObcerstvitDisableText = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozcadrDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DBTABLE:rozcadr*/
    interface GRozcadrDto {
        /**DBCOLUMN:rozcadr.a_druh*/
        a_druh?: number|null;
        /**DBCOLUMN:rozcadr.a_druh_txt*/
        a_druh_txt?: string|null;
        /**DBCOLUMN:rozcadr.k_v*/
        k_v?: number|null;
        /**DBCOLUMN:rozcadr.k_s*/
        k_s?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozcastDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:rozcast*/
	interface GRozcastDto {
		/**DBCOLUMN:rozcast.a_stav*/
		a_stav?: number|null;
		/**DBCOLUMN:rozcast.a_stav_txt*/
		a_stav_txt?: string|null;
		/**DBCOLUMN:rozcast.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rozcast.k_s*/
		k_s?: string|null;
	}
	const enum GRozcastDtoNames { a_stav = "a_stav", a_stav_txt = "a_stav_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRozcastDtoFragments { a_stav = "*", a_stav_txt = "*", k_v = "*", k_s = "*",}
	const enum GRozcastDtoTypes { a_stav = "number", a_stav_txt = "string", k_v = "number", k_s = "string",}
	const enum GRozcastDtoTypeLengths { a_stav_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozdkzuVysledekDto.d.ts 

declare namespace Gordic.Uct.Interface {
	interface GRozdkzuVysledekDto {
		nazev_ukazatele?: string|null;
		typ_ukazatele?: string|null;
		typ_kontroly?: string|null;
		vysl_oper_uka?: string|null;
		nasl_operace?: string|null;
		text?: string|null;
	}
	const enum GRozdkzuVysledekDtoNames { nazev_ukazatele = "nazev_ukazatele", typ_ukazatele = "typ_ukazatele", typ_kontroly = "typ_kontroly", vysl_oper_uka = "vysl_oper_uka", nasl_operace = "nasl_operace", text = "text",}
	const enum GRozdkzuVysledekDtoFragments { nazev_ukazatele = "*", typ_ukazatele = "*", typ_kontroly = "*", vysl_oper_uka = "*", nasl_operace = "*", text = "*",}
	const enum GRozdkzuVysledekDtoTypes { nazev_ukazatele = "string", typ_ukazatele = "string", typ_kontroly = "string", vysl_oper_uka = "string", nasl_operace = "string", text = "string",}
	const enum GRozdkzuVysledekDtoTypeLengths { nazev_ukazatele = 254, typ_ukazatele = 254, typ_kontroly = 254, vysl_oper_uka = 10, nasl_operace = 254, text = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozDokladActionPermissions.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Seznam akci nad dokladem*/
	interface GRozDokladActionPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		Podani: Gordic.General.ApplicationInterface.GPermission;
		Evidence: Gordic.General.ApplicationInterface.GPermission;
		Vazba: Gordic.General.ApplicationInterface.GPermission;
		Schvaleni: Gordic.General.ApplicationInterface.GPermission;
		/**Pristup ke schvalovacimu procesu*/
		SchvalovaciProces: Gordic.General.ApplicationInterface.GPermission;
		Odschvaleni: Gordic.General.ApplicationInterface.GPermission;
		Validace: Gordic.General.ApplicationInterface.GPermission;
		Odvalidace: Gordic.General.ApplicationInterface.GPermission;
		OdeslaniSP: Gordic.General.ApplicationInterface.GPermission;
		Realizace: Gordic.General.ApplicationInterface.GPermission;
		Potvrzeni: Gordic.General.ApplicationInterface.GPermission;
		Uzavrit: Gordic.General.ApplicationInterface.GPermission;
		Storno: Gordic.General.ApplicationInterface.GPermission;
		Aktivace: Gordic.General.ApplicationInterface.GPermission;
		Oprava: Gordic.General.ApplicationInterface.GPermission;
		/**Zruseni opravy*/
		Zrusit: Gordic.General.ApplicationInterface.GPermission;
		Predat: Gordic.General.ApplicationInterface.GPermission;
		Prevzit: Gordic.General.ApplicationInterface.GPermission;
		Preevidence: Gordic.General.ApplicationInterface.GPermission;
		Pridelit: Gordic.General.ApplicationInterface.GPermission;
		Tisk: Gordic.General.ApplicationInterface.GPermission;
		NovyPorizovac: Gordic.General.ApplicationInterface.GPermission;
		OpravitPorizovac: Gordic.General.ApplicationInterface.GPermission;
		OdstranitPorizovac: Gordic.General.ApplicationInterface.GPermission;
		UlozitPorizovac: Gordic.General.ApplicationInterface.GPermission;
		ZrusitPorizovac: Gordic.General.ApplicationInterface.GPermission;
		PredkontacePorizovac: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni vytvorit predkontaci ze zapisu*/
		VytvoritPredkontaciPorizovac: Gordic.General.ApplicationInterface.GPermission;
		VyrovnatPorizovac: Gordic.General.ApplicationInterface.GPermission;
		ImportZapisuPorizovac: Gordic.General.ApplicationInterface.GPermission;
		VraceniDoWfl: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRozDokladActionPermissionsNames { Podani = "Podani", Evidence = "Evidence", Vazba = "Vazba", Schvaleni = "Schvaleni", SchvalovaciProces = "SchvalovaciProces", Odschvaleni = "Odschvaleni", Validace = "Validace", Odvalidace = "Odvalidace", OdeslaniSP = "OdeslaniSP", Realizace = "Realizace", Potvrzeni = "Potvrzeni", Uzavrit = "Uzavrit", Storno = "Storno", Aktivace = "Aktivace", Oprava = "Oprava", Zrusit = "Zrusit", Predat = "Predat", Prevzit = "Prevzit", Preevidence = "Preevidence", Pridelit = "Pridelit", Tisk = "Tisk", NovyPorizovac = "NovyPorizovac", OpravitPorizovac = "OpravitPorizovac", OdstranitPorizovac = "OdstranitPorizovac", UlozitPorizovac = "UlozitPorizovac", ZrusitPorizovac = "ZrusitPorizovac", PredkontacePorizovac = "PredkontacePorizovac", VytvoritPredkontaciPorizovac = "VytvoritPredkontaciPorizovac", VyrovnatPorizovac = "VyrovnatPorizovac", ImportZapisuPorizovac = "ImportZapisuPorizovac", VraceniDoWfl = "VraceniDoWfl",}
	const enum GRozDokladActionPermissionsFragments { Podani = "*", Evidence = "*", Vazba = "*", Schvaleni = "*", SchvalovaciProces = "*", Odschvaleni = "*", Validace = "*", Odvalidace = "*", OdeslaniSP = "*", Realizace = "*", Potvrzeni = "*", Uzavrit = "*", Storno = "*", Aktivace = "*", Oprava = "*", Zrusit = "*", Predat = "*", Prevzit = "*", Preevidence = "*", Pridelit = "*", Tisk = "*", NovyPorizovac = "*", OpravitPorizovac = "*", OdstranitPorizovac = "*", UlozitPorizovac = "*", ZrusitPorizovac = "*", PredkontacePorizovac = "*", VytvoritPredkontaciPorizovac = "*", VyrovnatPorizovac = "*", ImportZapisuPorizovac = "*", VraceniDoWfl = "*",}
	const enum GRozDokladActionPermissionsTypes { Podani = "Gordic.General.ApplicationInterface.GPermission", Evidence = "Gordic.General.ApplicationInterface.GPermission", Vazba = "Gordic.General.ApplicationInterface.GPermission", Schvaleni = "Gordic.General.ApplicationInterface.GPermission", SchvalovaciProces = "Gordic.General.ApplicationInterface.GPermission", Odschvaleni = "Gordic.General.ApplicationInterface.GPermission", Validace = "Gordic.General.ApplicationInterface.GPermission", Odvalidace = "Gordic.General.ApplicationInterface.GPermission", OdeslaniSP = "Gordic.General.ApplicationInterface.GPermission", Realizace = "Gordic.General.ApplicationInterface.GPermission", Potvrzeni = "Gordic.General.ApplicationInterface.GPermission", Uzavrit = "Gordic.General.ApplicationInterface.GPermission", Storno = "Gordic.General.ApplicationInterface.GPermission", Aktivace = "Gordic.General.ApplicationInterface.GPermission", Oprava = "Gordic.General.ApplicationInterface.GPermission", Zrusit = "Gordic.General.ApplicationInterface.GPermission", Predat = "Gordic.General.ApplicationInterface.GPermission", Prevzit = "Gordic.General.ApplicationInterface.GPermission", Preevidence = "Gordic.General.ApplicationInterface.GPermission", Pridelit = "Gordic.General.ApplicationInterface.GPermission", Tisk = "Gordic.General.ApplicationInterface.GPermission", NovyPorizovac = "Gordic.General.ApplicationInterface.GPermission", OpravitPorizovac = "Gordic.General.ApplicationInterface.GPermission", OdstranitPorizovac = "Gordic.General.ApplicationInterface.GPermission", UlozitPorizovac = "Gordic.General.ApplicationInterface.GPermission", ZrusitPorizovac = "Gordic.General.ApplicationInterface.GPermission", PredkontacePorizovac = "Gordic.General.ApplicationInterface.GPermission", VytvoritPredkontaciPorizovac = "Gordic.General.ApplicationInterface.GPermission", VyrovnatPorizovac = "Gordic.General.ApplicationInterface.GPermission", ImportZapisuPorizovac = "Gordic.General.ApplicationInterface.GPermission", VraceniDoWfl = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRozDokladActionPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozDokladDto.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozDokladFieldPermissions.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Seznam policek na detailu dokladu*/
	interface GRozDokladFieldPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Identifikator*/
		Identifikator: Gordic.General.ApplicationInterface.GPermission;
		/**Agendove cislo*/
		AgendoveCislo: Gordic.General.ApplicationInterface.GPermission;
		/**Evidencni cislo*/
		EvidencniCislo: Gordic.General.ApplicationInterface.GPermission;
		/**Cislo RO v IISSP*/
		CisloRo: Gordic.General.ApplicationInterface.GPermission;
		/**Typ dokladu*/
		TypDokladu: Gordic.General.ApplicationInterface.GPermission;
		/**Uctarna*/
		Uctarna: Gordic.General.ApplicationInterface.GPermission;
		/**A-hlavicka*/
		Ahlavicka: Gordic.General.ApplicationInterface.GPermission;
		/**Cislo sablony EDS/SMVS*/
		CisloSablonyEds: Gordic.General.ApplicationInterface.GPermission;
		/**Zpracovatel*/
		Zpracovatel: Gordic.General.ApplicationInterface.GPermission;
		/**KOmpetent*/
		Kompetent: Gordic.General.ApplicationInterface.GPermission;
		/**Realizator*/
		Realizator: Gordic.General.ApplicationInterface.GPermission;
		/**Rok*/
		Rok: Gordic.General.ApplicationInterface.GPermission;
		/**Mesic*/
		Mesic: Gordic.General.ApplicationInterface.GPermission;
		/**Den*/
		Den: Gordic.General.ApplicationInterface.GPermission;
		/**Druh dokladu*/
		DruhDokladu: Gordic.General.ApplicationInterface.GPermission;
		/**Cislo dokladu*/
		CisloDokladu: Gordic.General.ApplicationInterface.GPermission;
		/**Popis*/
		Popis: Gordic.General.ApplicationInterface.GPermission;
		/**Castka*/
		Castka: Gordic.General.ApplicationInterface.GPermission;
		/**Nazev knihy*/
		Kniha: Gordic.General.ApplicationInterface.GPermission;
		/**Pristup ke slozce popisne vlastnosti*/
		PopisneVlastnosti: Gordic.General.ApplicationInterface.GPermission;
		/**Manazer cile*/
		ManagerCile: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRozDokladFieldPermissionsNames { Identifikator = "Identifikator", AgendoveCislo = "AgendoveCislo", EvidencniCislo = "EvidencniCislo", CisloRo = "CisloRo", TypDokladu = "TypDokladu", Uctarna = "Uctarna", Ahlavicka = "Ahlavicka", CisloSablonyEds = "CisloSablonyEds", Zpracovatel = "Zpracovatel", Kompetent = "Kompetent", Realizator = "Realizator", Rok = "Rok", Mesic = "Mesic", Den = "Den", DruhDokladu = "DruhDokladu", CisloDokladu = "CisloDokladu", Popis = "Popis", Castka = "Castka", Kniha = "Kniha", PopisneVlastnosti = "PopisneVlastnosti", ManagerCile = "ManagerCile",}
	const enum GRozDokladFieldPermissionsFragments { Identifikator = "*", AgendoveCislo = "*", EvidencniCislo = "*", CisloRo = "*", TypDokladu = "*", Uctarna = "*", Ahlavicka = "*", CisloSablonyEds = "*", Zpracovatel = "*", Kompetent = "*", Realizator = "*", Rok = "*", Mesic = "*", Den = "*", DruhDokladu = "*", CisloDokladu = "*", Popis = "*", Castka = "*", Kniha = "*", PopisneVlastnosti = "*", ManagerCile = "*",}
	const enum GRozDokladFieldPermissionsTypes { Identifikator = "Gordic.General.ApplicationInterface.GPermission", AgendoveCislo = "Gordic.General.ApplicationInterface.GPermission", EvidencniCislo = "Gordic.General.ApplicationInterface.GPermission", CisloRo = "Gordic.General.ApplicationInterface.GPermission", TypDokladu = "Gordic.General.ApplicationInterface.GPermission", Uctarna = "Gordic.General.ApplicationInterface.GPermission", Ahlavicka = "Gordic.General.ApplicationInterface.GPermission", CisloSablonyEds = "Gordic.General.ApplicationInterface.GPermission", Zpracovatel = "Gordic.General.ApplicationInterface.GPermission", Kompetent = "Gordic.General.ApplicationInterface.GPermission", Realizator = "Gordic.General.ApplicationInterface.GPermission", Rok = "Gordic.General.ApplicationInterface.GPermission", Mesic = "Gordic.General.ApplicationInterface.GPermission", Den = "Gordic.General.ApplicationInterface.GPermission", DruhDokladu = "Gordic.General.ApplicationInterface.GPermission", CisloDokladu = "Gordic.General.ApplicationInterface.GPermission", Popis = "Gordic.General.ApplicationInterface.GPermission", Castka = "Gordic.General.ApplicationInterface.GPermission", Kniha = "Gordic.General.ApplicationInterface.GPermission", PopisneVlastnosti = "Gordic.General.ApplicationInterface.GPermission", ManagerCile = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRozDokladFieldPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozDokladInDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**
	*     Vstupni DTO do kazde akce zakladni
	*     
	*/
	interface GRozDokladInDto {
		/**DBCOLUMN:rozspid.ixp*/
		ixp?: string|null;
		dat_zmena?: JsonDate|null;
		/**
		*     Vykonavana akce nad detailem
		*     
		*/
		action?: Gordic.Uct.Interface.GEAkceFormulare|null;
		/**
		*     Kolekce parametru uzivatelskeho nastaveni
		*     
		*/
		parameters?: any|null;
		/**
		*     Navratovy kod pouzivany pro LK
		*     
		*/
		lastCode?: number|null;
		/**
		*     Textovy kod chyby
		*     
		*/
		member?: string|null;
		/**
		*     Pripadne doplnujici informace o chybe
		*     
		*/
		addInfo?: string|null;
	}
	const enum GRozDokladInDtoNames { ixp = "ixp", dat_zmena = "dat_zmena", action = "action", parameters = "parameters", lastCode = "lastCode", member = "member", addInfo = "addInfo",}
	const enum GRozDokladInDtoFragments { ixp = "*", dat_zmena = "*", action = "*", parameters = "*", lastCode = "*", member = "*", addInfo = "*",}
	const enum GRozDokladInDtoTypes { ixp = "string", dat_zmena = "JsonDate", action = "Gordic.Uct.Interface.GEAkceFormulare", parameters = "any", lastCode = "number", member = "string", addInfo = "string",}
	const enum GRozDokladInDtoTypeLengths { ixp = 12,}
	/**
	*     Vstupni DTO pro podani
	*     
	*/
	interface GRozDokladPodaniInDto extends Gordic.Uct.Interface.GRozDokladInDto {
		/**
		*     Typ dokladu
		*     
		*/
		ixs_typ?: string|null;
		/**
		*     Kategorie dokladu
		*     
		*/
		ktg_typ?: number|null;
		/**
		*     Identifikator knihy
		*     
		*/
		ixp_den?: string|null;
	}
	const enum GRozDokladPodaniInDtoNames { ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", ixp_den = "ixp_den", ixp = "ixp", dat_zmena = "dat_zmena", action = "action", parameters = "parameters", lastCode = "lastCode", member = "member", addInfo = "addInfo",}
	const enum GRozDokladPodaniInDtoFragments { ixs_typ = "*", ktg_typ = "*", ixp_den = "*", ixp = "*", dat_zmena = "*", action = "*", parameters = "*", lastCode = "*", member = "*", addInfo = "*",}
	const enum GRozDokladPodaniInDtoTypes { ixs_typ = "string", ktg_typ = "number", ixp_den = "string", ixp = "string", dat_zmena = "JsonDate", action = "Gordic.Uct.Interface.GEAkceFormulare", parameters = "any", lastCode = "number", member = "string", addInfo = "string",}
	const enum GRozDokladPodaniInDtoTypeLengths { ixp = 12,}
	/**
	*     Vstupni DTO do kazde akce s data z hlavicky dokladu
	*     
	*/
	interface GRozDokladHeaderInDto extends Gordic.Uct.Interface.GRozDokladInDto {
		/**
		*     Udaje z hlavicky ktere uzivatel zasila pri evidenci
		*     
		*/
		header?: Gordic.Eko.Interface.GRozspidDto|null;
		/**
		*     Komunikace se statni pokladnou (nepovinne)
		*     
		*/
		iissp?: Gordic.Uct.Interface.GRozsispDto|null;
		/**
		*     DTO dokumentu SSL
		*     
		*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**
		*     Popisne vlastnosti (rozsireny profil)
		*     
		*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
	}
	const enum GRozDokladHeaderInDtoNames { header = "header", iissp = "iissp", dokument = "dokument", vlastnosti = "vlastnosti", ixp = "ixp", dat_zmena = "dat_zmena", action = "action", parameters = "parameters", lastCode = "lastCode", member = "member", addInfo = "addInfo",}
	const enum GRozDokladHeaderInDtoFragments { header = "*", iissp = "*", dokument = "*", vlastnosti = "*", ixp = "*", dat_zmena = "*", action = "*", parameters = "*", lastCode = "*", member = "*", addInfo = "*",}
	const enum GRozDokladHeaderInDtoTypes { header = "Gordic.Eko.Interface.GRozspidDto", iissp = "Gordic.Uct.Interface.GRozsispDto", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ixp = "string", dat_zmena = "JsonDate", action = "Gordic.Uct.Interface.GEAkceFormulare", parameters = "any", lastCode = "number", member = "string", addInfo = "string",}
	const enum GRozDokladHeaderInDtoTypeLengths { ixp = 12,}
	/**
	*     Vstupni DTO do kazde akce s data hlavicky a kolekci polozek
	*     
	*/
	interface GRozDokladHeaderRowInDto extends Gordic.Uct.Interface.GRozDokladHeaderInDto {
		/**
		*     Polozky (zapisy) dokladu (rozdpep)
		*     
		*/
		rows?: Gordic.Uct.Interface.GRozdpepDto[]|null;
	}
	const enum GRozDokladHeaderRowInDtoNames { rows = "rows", header = "header", iissp = "iissp", dokument = "dokument", vlastnosti = "vlastnosti", ixp = "ixp", dat_zmena = "dat_zmena", action = "action", parameters = "parameters", lastCode = "lastCode", member = "member", addInfo = "addInfo",}
	const enum GRozDokladHeaderRowInDtoFragments { rows = "*", header = "*", iissp = "*", dokument = "*", vlastnosti = "*", ixp = "*", dat_zmena = "*", action = "*", parameters = "*", lastCode = "*", member = "*", addInfo = "*",}
	const enum GRozDokladHeaderRowInDtoTypes { rows = "Gordic.Uct.Interface.GRozdpepDto[]", header = "Gordic.Eko.Interface.GRozspidDto", iissp = "Gordic.Uct.Interface.GRozsispDto", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ixp = "string", dat_zmena = "JsonDate", action = "Gordic.Uct.Interface.GEAkceFormulare", parameters = "any", lastCode = "number", member = "string", addInfo = "string",}
	const enum GRozDokladHeaderRowInDtoTypeLengths { ixp = 12,}
	/**
	*     DTO pro import zapisu
	*     
	*/
	interface GRozDokladPidsInDto extends Gordic.Uct.Interface.GRozDokladInDto {
		/**
		*     Kolekce pidu dokladu, ktere chteji importovat zapisy
		*     
		*/
		pids?: string[]|null;
	}
	const enum GRozDokladPidsInDtoNames { pids = "pids", ixp = "ixp", dat_zmena = "dat_zmena", action = "action", parameters = "parameters", lastCode = "lastCode", member = "member", addInfo = "addInfo",}
	const enum GRozDokladPidsInDtoFragments { pids = "*", ixp = "*", dat_zmena = "*", action = "*", parameters = "*", lastCode = "*", member = "*", addInfo = "*",}
	const enum GRozDokladPidsInDtoTypes { pids = "string[]", ixp = "string", dat_zmena = "JsonDate", action = "Gordic.Uct.Interface.GEAkceFormulare", parameters = "any", lastCode = "number", member = "string", addInfo = "string",}
	const enum GRozDokladPidsInDtoTypeLengths { ixp = 12,}
	/**
	*     DTO s informaci o predani (predani, preevidence ...)
	*     
	*/
	interface GRozDokladRedistribuceInDto extends Gordic.Uct.Interface.GRozDokladInDto {
		/**
		*     Kniha do ktere doklad preevidovavam
		*     
		*/
		ixp_den?: string|null;
		/**
		*     Funkce na kterou predavam
		*     
		*/
		ixs_fun_akt?: string|null;
		/**
		*     Referent kteremu doklad predavam
		*     
		*/
		ixs_ref?: string|null;
		/**
		*     Kompetent
		*     
		*/
		ixs_fun_vyriz?: string|null;
		/**
		*     Realizator
		*     
		*/
		cis_real?: string|null;
		/**
		*     Spisovy uzel
		*     
		*/
		ixs_su?: string|null;
		/**
		*     Duvod pro operaci - nepovinne
		*     
		*/
		duvod?: string|null;
		/**
		*     Novy pid pri stornu
		*     
		*/
		ixp_new?: string|null;
	}
	const enum GRozDokladRedistribuceInDtoNames { ixp_den = "ixp_den", ixs_fun_akt = "ixs_fun_akt", ixs_ref = "ixs_ref", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", ixs_su = "ixs_su", duvod = "duvod", ixp_new = "ixp_new", ixp = "ixp", dat_zmena = "dat_zmena", action = "action", parameters = "parameters", lastCode = "lastCode", member = "member", addInfo = "addInfo",}
	const enum GRozDokladRedistribuceInDtoFragments { ixp_den = "*", ixs_fun_akt = "*", ixs_ref = "*", ixs_fun_vyriz = "*", cis_real = "*", ixs_su = "*", duvod = "*", ixp_new = "*", ixp = "*", dat_zmena = "*", action = "*", parameters = "*", lastCode = "*", member = "*", addInfo = "*",}
	const enum GRozDokladRedistribuceInDtoTypes { ixp_den = "string", ixs_fun_akt = "string", ixs_ref = "string", ixs_fun_vyriz = "string", cis_real = "string", ixs_su = "string", duvod = "string", ixp_new = "string", ixp = "string", dat_zmena = "JsonDate", action = "Gordic.Uct.Interface.GEAkceFormulare", parameters = "any", lastCode = "number", member = "string", addInfo = "string",}
	const enum GRozDokladRedistribuceInDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozDokladOutDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vystupni DTO z kazde akce*/
	interface GRozDokladOutDto {
		/**DBCOLUMN:rozspid.ixp*/
		ixp?: string|null;
		/**Hlavicka dokladu*/
		header?: Gordic.Eko.Interface.GRozspidDto|null;
		/**Polozky (zapisy) dokladu (rozdpep)*/
		rows?: Gordic.Uct.Interface.GRozdpepDto[]|null;
		/**A-hlavicka dokladu (nepovinna)*/
		aHeader?: Gordic.Uct.Interface.GRozsahlOutDto|null;
		/**Udaje o knize, vyzadovano WK*/
		kniha?: Gordic.Uct.Interface.GRozsdenDto|null;
		/**Komunikace se statni pokladnou (nepovinne)*/
		iissp?: Gordic.Uct.Interface.GRozsispDto|null;
		/**Radky IK pro komunikaci se statni pokladnou (nepovinne)*/
		iisspRows?: Gordic.Uct.Interface.GRozdispDto[]|null;
		/**Radky ukazetelu a vysledek kontroly*/
		ukazatele?: Gordic.Uct.Interface.GRozVysledekUkazateluResponseDto|null;
		/**DTO dokumentu SSL*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**Popisne vlastnosti (rozsireny profil)*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**Pristup k akcim na detailu dokladu*/
		ActionPermissions?: Gordic.Uct.Interface.GRozDokladActionPermissions|null;
		/**Pristup k polim na detailu dokladu*/
		FieldPermissions?: Gordic.Uct.Interface.GRozDokladFieldPermissions|null;
		/**Mozne pouzitelne rozvrhy*/
		Rozvrhy?: Gordic.Uct.Interface.GRozRozvrhResponseDto|null;
		/**Ukazatele manageru cilu*/
		ManageryCilu?: Gordic.Uct.Interface.GRozCileDto[]|null;
		/**Atribut existence vazby na primarni doklad*/
		VazbaExistuje?: boolean|null;
		/**Atribut, zda je potraba rozpoctovy doklad navazat na prim. doklad*/
		IsMusiNavazat?: boolean|null;
	}
	const enum GRozDokladOutDtoNames { ixp = "ixp", header = "header", rows = "rows", aHeader = "aHeader", kniha = "kniha", iissp = "iissp", iisspRows = "iisspRows", ukazatele = "ukazatele", dokument = "dokument", vlastnosti = "vlastnosti", ActionPermissions = "ActionPermissions", FieldPermissions = "FieldPermissions", Rozvrhy = "Rozvrhy", ManageryCilu = "ManageryCilu", VazbaExistuje = "VazbaExistuje", IsMusiNavazat = "IsMusiNavazat",}
	const enum GRozDokladOutDtoFragments { ixp = "*", header = "*", rows = "*", aHeader = "*", kniha = "*", iissp = "*", iisspRows = "*", ukazatele = "*", dokument = "*", vlastnosti = "*", ActionPermissions = "*", FieldPermissions = "*", Rozvrhy = "*", ManageryCilu = "*", VazbaExistuje = "*", IsMusiNavazat = "*",}
	const enum GRozDokladOutDtoTypes { ixp = "string", header = "Gordic.Eko.Interface.GRozspidDto", rows = "Gordic.Uct.Interface.GRozdpepDto[]", aHeader = "Gordic.Uct.Interface.GRozsahlOutDto", kniha = "Gordic.Uct.Interface.GRozsdenDto", iissp = "Gordic.Uct.Interface.GRozsispDto", iisspRows = "Gordic.Uct.Interface.GRozdispDto[]", ukazatele = "Gordic.Uct.Interface.GRozVysledekUkazateluResponseDto", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ActionPermissions = "Gordic.Uct.Interface.GRozDokladActionPermissions", FieldPermissions = "Gordic.Uct.Interface.GRozDokladFieldPermissions", Rozvrhy = "Gordic.Uct.Interface.GRozRozvrhResponseDto", ManageryCilu = "Gordic.Uct.Interface.GRozCileDto[]", VazbaExistuje = "boolean", IsMusiNavazat = "boolean",}
	const enum GRozDokladOutDtoTypeLengths { ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozdpepDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Rozpoctovy zapis*/
	interface GRozdpepDto {
        /**DBCOLUMN:rozdpep.rok*/
		rok?: number|null;
        /**DBCOLUMN:rozdpep.lic*/
		lic?: string|null;
        /**DBCOLUMN:rozdpep.ico*/
		ico?: string|null;
        /**DBCOLUMN:rozdpep.ucs*/
		ucs?: string|null;
        /**DBCOLUMN:rozdpep.mesic*/
		mesic?: number|null;
        /**DBCOLUMN:rozdpep.ixp_den*/
		ixp_den?: string|null;
        /**DBCOLUMN:rozdpep.ac*/
		ac?: string|null;
        /**DBCOLUMN:rozdpep.radek_z*/
		radek_z?: number|null;
        /**DBCOLUMN:rozdpep.nks*/
		nks?: string|null;
        /**DBCOLUMN:rozdpep.por_cislo*/
		por_cislo?: number|null;
        /**DBCOLUMN:rozdpep.ixp*/
		ixp?: string|null;
        /**DBCOLUMN:rozdpep.drd*/
		drd?: number|null;
        /**DBCOLUMN:rozdpep.aktivita*/
		aktivita?: number|null;
        /**DBCOLUMN:rozdpep.den*/
		den?: number|null;
        /**DBCOLUMN:rozdpep.c0*/
		c0?: JsonDecimal|null;
        /**DBCOLUMN:rozdpep.c1*/
		c1?: JsonDecimal|null;
        /**DBCOLUMN:rozdpep.c0_new*/
		c0_new?: JsonDecimal|null;
        /**DBCOLUMN:rozdpep.c1_new*/
		c1_new?: JsonDecimal|null;
        /**DBCOLUMN:rozdpep.m0*/
		m0?: JsonDecimal|null;
        /**DBCOLUMN:rozdpep.m1*/
		m1?: JsonDecimal|null;
        /**DBCOLUMN:rozdpep.m0_new*/
		m0_new?: JsonDecimal|null;
        /**DBCOLUMN:rozdpep.m1_new*/
		m1_new?: JsonDecimal|null;
        /**DBCOLUMN:rozdpep.typ_ag*/
		typ_ag?: number|null;
        /**DBCOLUMN:rozdpep.stav_kch*/
		stav_kch?: number|null;
        /**DBCOLUMN:rozdpep.dat_zmena*/
		dat_zmena?: JsonDate|null;
        /**DBCOLUMN:rozdpep.zmenu_prov*/
		zmenu_prov?: string|null;
        /**DBCOLUMN:rozdpep.te0*/
		te0?: string|null;
        /**DBCOLUMN:rozdpep.te1*/
		te1?: string|null;
        /**DBCOLUMN:rozdpep.te2*/
		te2?: string|null;
        /**DBCOLUMN:rozdpep.te3*/
		te3?: string|null;
        /**DBCOLUMN:rozdpep.te4*/
		te4?: string|null;
        /**DBCOLUMN:rozdpep.uea*/
		uea?: string|null;
        /**DBCOLUMN:rozdpep.ueb*/
		ueb?: string|null;
        /**DBCOLUMN:rozdpep.uec*/
		uec?: string|null;
        /**DBCOLUMN:rozdpep.ued*/
		ued?: string|null;
        /**DBCOLUMN:rozdpep.uee*/
		uee?: string|null;
        /**DBCOLUMN:rozdpep.uef*/
		uef?: string|null;
        /**DBCOLUMN:rozdpep.ueg*/
		ueg?: string|null;
        /**DBCOLUMN:rozdpep.ueh*/
		ueh?: string|null;
        /**DBCOLUMN:rozdpep.uei*/
		uei?: string|null;
        /**DBCOLUMN:rozdpep.uej*/
		uej?: string|null;
        /**DBCOLUMN:rozdpep.ixs_kon*/
		ixs_kon?: string|null;
        /**DBCOLUMN:rozdpep.up_stav*/
		up_stav?: number|null;
        /**DBCOLUMN:rozdpep.ac_ixe*/
		ac_ixe?: string|null;
        /**DBCOLUMN:rozdpep.popis*/
		popis?: string|null;
        /**DBCOLUMN:rozdpep.typ_roz*/
		typ_roz?: number|null;
        /**DBCOLUMN:rozdpep.zd*/
		zd?: number|null;
        /**DBCOLUMN:rozdpep.uus*/
		uus?: string|null;
        /**DBCOLUMN:rozdpep.ixp_srv*/
		ixp_srv?: string|null;
        /**DBCOLUMN:rozdpep.rok_srv*/
		rok_srv?: number|null;
        /**DBCOLUMN:rozdpep.priz_poriz*/
		priz_poriz?: number|null;
        /**DBCOLUMN:rozdpep.ixs_uka*/
		ixs_uka?: string|null;
        /**DBCOLUMN:rozdpep.xpf_pf*/
		xpf_pf?: string|null;
        /**DBCOLUMN:rozdpep.ixp_sml*/
		ixp_sml?: string|null;
        /**DBCOLUMN:rozdpep.priz_bal*/
		priz_bal?: number|null;
        /**DBCOLUMN:rozdpep.vyhr_roz*/
		vyhr_roz?: number|null;
        /**DBCOLUMN:rozdpep.ixs_fun_mng*/
		ixs_fun_mng?: string|null;
        /**DBCOLUMN:rozdpep.id_hdr_ris*/
		id_hdr_ris?: string|null;
        /**DBCOLUMN:rozdpep.radek_hdr*/
		radek_hdr?: number|null;
        /**DBCOLUMN:rozdpep.radek_hdr_ris*/
		radek_hdr_ris?: number|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozGlobalsDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Globalni parametry a promenne pro celou aplikaci. Vyuzito predevsim pro LK*/
	interface GRozGlobalsDto {
		/**DTO s ekonimockymi parametry*/
		EkoParams?: Gordic.Uct.Interface.GEkoParamsDto|null;
		/**DTO s parametry session*/
		SessionParams?: Gordic.Uct.Interface.GSessionParamsDto|null;
		/**DTO s databazovymi parametry*/
		DatabaseParams?: Gordic.Uct.Interface.GDatabaseParamsDto|null;
		/**Ostatni nastaveni*/
		Others?: Gordic.Uct.Interface.GUcrOtherParamsDto;
	}
	const enum GRozGlobalsDtoNames { EkoParams = "EkoParams", SessionParams = "SessionParams", DatabaseParams = "DatabaseParams", Others = "Others",}
	const enum GRozGlobalsDtoFragments { EkoParams = "*", SessionParams = "*", DatabaseParams = "*", Others = "*",}
	const enum GRozGlobalsDtoTypes { EkoParams = "Gordic.Uct.Interface.GEkoParamsDto", SessionParams = "Gordic.Uct.Interface.GSessionParamsDto", DatabaseParams = "Gordic.Uct.Interface.GDatabaseParamsDto", Others = "Gordic.Uct.Interface.GUcrOtherParamsDto",}
	const enum GRozGlobalsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozHromadnaAkceDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro doklad na seznamu v hromadnych akcich*/
	interface GRozHromadnaAkceDto {
		ixp?: string|null;
		dat_zmena?: JsonDate|null;
		ac_ag?: string|null;
		ac?: string|null;
		ac_ixe?: string|null;
		drd?: number|null;
		rok?: number|null;
		mesic?: number|null;
		den?: number|null;
		typ_dokladu?: string|null;
		s_zau?: number|null;
		eko_akt?: number|null;
		stav_dokladu?: string|null;
		popis?: string|null;
		c?: JsonDecimal|null;
		ixs_fun_nazev?: string|null;
		/**Priznak, zda operace dopadla dobre nebo spatne*/
		vysledek?: boolean|null;
		/**Textovy vysledek operace*/
		vysledekTxt?: string|null;
	}
	const enum GRozHromadnaAkceDtoNames { ixp = "ixp", dat_zmena = "dat_zmena", ac_ag = "ac_ag", ac = "ac", ac_ixe = "ac_ixe", drd = "drd", rok = "rok", mesic = "mesic", den = "den", typ_dokladu = "typ_dokladu", s_zau = "s_zau", eko_akt = "eko_akt", stav_dokladu = "stav_dokladu", popis = "popis", c = "c", ixs_fun_nazev = "ixs_fun_nazev", vysledek = "vysledek", vysledekTxt = "vysledekTxt",}
	const enum GRozHromadnaAkceDtoFragments { ixp = "*", dat_zmena = "*", ac_ag = "*", ac = "*", ac_ixe = "*", drd = "*", rok = "*", mesic = "*", den = "*", typ_dokladu = "*", s_zau = "*", eko_akt = "*", stav_dokladu = "*", popis = "*", c = "*", ixs_fun_nazev = "*", vysledek = "*", vysledekTxt = "*",}
	const enum GRozHromadnaAkceDtoTypes { ixp = "string", dat_zmena = "JsonDate", ac_ag = "string", ac = "string", ac_ixe = "string", drd = "number", rok = "number", mesic = "number", den = "number", typ_dokladu = "string", s_zau = "number", eko_akt = "number", stav_dokladu = "string", popis = "string", c = "JsonDecimal", ixs_fun_nazev = "string", vysledek = "boolean", vysledekTxt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozsahlDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DBTABLE:rozsahl*/
	interface GRozsahlDto {
        /**DBCOLUMN:rozsahl.ixs_ahl*/
		ixs_ahl?: string|null;
        /**DBCOLUMN:rozsahl.ico*/
		ico?: string|null;
        /**DBCOLUMN:rozsahl.rok*/
		rok?: number|null;
        /**DBCOLUMN:rozsahl.a_cislo*/
		a_cislo?: string|null;
        /**DBCOLUMN:rozsahl.a_druh*/
		a_druh?: number|null;
        /**DBCOLUMN:rozsahl.a_stav*/
		a_stav?: number|null;
        /**DBCOLUMN:rozsahl.nazev*/
		nazev?: string|null;
        /**DBCOLUMN:rozsahl.popis*/
		popis?: string|null;
        /**DBCOLUMN:rozsahl.dat_evid*/
		dat_evid?: JsonDate|null;
        /**DBCOLUMN:rozsahl.dat_zpr*/
		dat_zpr?: JsonDate|null;
        /**DBCOLUMN:rozsahl.c0*/
		c0?: JsonDecimal|null;
        /**DBCOLUMN:rozsahl.c1*/
		c1?: JsonDecimal|null;
        /**DBCOLUMN:rozsahl.c0_upl*/
		c0_upl?: JsonDecimal|null;
        /**DBCOLUMN:rozsahl.c1_upl*/
		c1_upl?: JsonDecimal|null;
        /**DBCOLUMN:rozsahl.c0_valid*/
		c0_valid?: JsonDecimal|null;
        /**DBCOLUMN:rozsahl.c1_valid*/
		c1_valid?: JsonDecimal|null;
        /**DBCOLUMN:rozsahl.aktivita*/
		aktivita?: number|null;
        /**DBCOLUMN:rozsahl.dat_zmena*/
		dat_zmena?: JsonDate|null;
        /**DBCOLUMN:rozsahl.zmenu_prov*/
		zmenu_prov?: string|null;
        /**DBCOLUMN:Seznam.stav*/
		stav?: string|null;
        /**DBCOLUMN:Seznam.druh*/
		druh?: string|null;
	}
	const enum GRozsahlDtoNames { ixs_ahl = "ixs_ahl", ico = "ico", rok = "rok", a_cislo = "a_cislo", a_druh = "a_druh", a_stav = "a_stav", nazev = "nazev", popis = "popis", dat_evid = "dat_evid", dat_zpr = "dat_zpr", c0 = "c0", c1 = "c1", c0_upl = "c0_upl", c1_upl = "c1_upl", c0_valid = "c0_valid", c1_valid = "c1_valid", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stav = "stav", druh = "druh",}
	const enum GRozsahlDtoFragments { ixs_ahl = "*", ico = "*", rok = "*", a_cislo = "*", a_druh = "*", a_stav = "*", nazev = "*", popis = "*", dat_evid = "*", dat_zpr = "*", c0 = "*", c1 = "*", c0_upl = "*", c1_upl = "*", c0_valid = "*", c1_valid = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", stav = "*", druh = "*",}
	const enum GRozsahlDtoTypes { ixs_ahl = "string", ico = "string", rok = "number", a_cislo = "string", a_druh = "number", a_stav = "number", nazev = "string", popis = "string", dat_evid = "JsonDate", dat_zpr = "JsonDate", c0 = "JsonDecimal", c1 = "JsonDecimal", c0_upl = "JsonDecimal", c1_upl = "JsonDecimal", c0_valid = "JsonDecimal", c1_valid = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stav = "string", druh = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozsahlInDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vstupni DTO do kazde akce*/
	interface GRozsahlInDto {
		/**DBCOLUMN:rozspid.ixp*/
		ixs_ahl?: string|null;
		dat_zmena?: JsonDate|null;
		/**Textovy kod chyby*/
		member?: string|null;
		/**Pripadne doplnujici informace o chybe*/
		addInfo?: string|null;
	}
	const enum GRozsahlInDtoNames { ixs_ahl = "ixs_ahl", dat_zmena = "dat_zmena", member = "member", addInfo = "addInfo",}
	const enum GRozsahlInDtoFragments { ixs_ahl = "*", dat_zmena = "*", member = "*", addInfo = "*",}
	const enum GRozsahlInDtoTypes { ixs_ahl = "string", dat_zmena = "JsonDate", member = "string", addInfo = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozsahlOutDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro a-hlavicku*/
	interface GRozsahlOutDto {
		/**ixs_ahl*/
		ixs_ahl?: string|null;
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**a_cislo*/
		a_cislo?: string|null;
		/**a_druh*/
		a_druh?: number|null;
		/**a_stav*/
		a_stav?: number|null;
		/**nazev*/
		nazev?: string|null;
		/**popis*/
		popis?: string|null;
		/**dat_evid*/
		dat_evid?: JsonDate|null;
		/**dat_zpr*/
		dat_zpr?: JsonDate|null;
		/**c0*/
		c0?: JsonDecimal|null;
		/**c1*/
		c1?: JsonDecimal|null;
		/**c0_upl*/
		c0_upl?: JsonDecimal|null;
		/**c1_upl*/
		c1_upl?: JsonDecimal|null;
		/**c0_valid*/
		c0_valid?: JsonDecimal|null;
		/**c1_valid*/
		c1_valid?: JsonDecimal|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**a_druh_txt*/
		a_druh_txt?: string|null;
		/**a_stav_txt*/
		a_stav_txt?: string|null;
		/**a_druh_txt*/
		druh?: string|null;
		/**a_stav_txt*/
		stav?: string|null;
	}
	const enum GRozsahlOutDtoNames { ixs_ahl = "ixs_ahl", ico = "ico", rok = "rok", a_cislo = "a_cislo", a_druh = "a_druh", a_stav = "a_stav", nazev = "nazev", popis = "popis", dat_evid = "dat_evid", dat_zpr = "dat_zpr", c0 = "c0", c1 = "c1", c0_upl = "c0_upl", c1_upl = "c1_upl", c0_valid = "c0_valid", c1_valid = "c1_valid", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", a_druh_txt = "a_druh_txt", a_stav_txt = "a_stav_txt", druh = "druh", stav = "stav",}
	const enum GRozsahlOutDtoFragments { ixs_ahl = "main", ico = "main", rok = "main", a_cislo = "main", a_druh = "main", a_stav = "main", nazev = "main", popis = "main", dat_evid = "main", dat_zpr = "main", c0 = "main", c1 = "main", c0_upl = "main", c1_upl = "main", c0_valid = "main", c1_valid = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", a_druh_txt = "a_druh_txt", a_stav_txt = "a_stav_txt", druh = "druh", stav = "stav",}
	const enum GRozsahlOutDtoTypes { ixs_ahl = "string", ico = "string", rok = "number", a_cislo = "string", a_druh = "number", a_stav = "number", nazev = "string", popis = "string", dat_evid = "JsonDate", dat_zpr = "JsonDate", c0 = "JsonDecimal", c1 = "JsonDecimal", c0_upl = "JsonDecimal", c1_upl = "JsonDecimal", c0_valid = "JsonDecimal", c1_valid = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", a_druh_txt = "string", a_stav_txt = "string", druh = "string", stav = "string",}
	const enum GRozsahlOutDtoTypeLengths {}
	/**Filtr pro rozsahl*/
	const enum FilterRozsahl {
		/**ixs_ahl*/
		ixs_ahl,
		/**ico*/
		ico,
		/**rok*/
		rok,
		/**a_cislo*/
		a_cislo,
		/**a_druh*/
		a_druh,
		/**a_stav*/
		a_stav,
		/**nazev*/
		nazev,
		/**popis*/
		popis,
		/**dat_evid*/
		dat_evid,
		/**dat_zpr*/
		dat_zpr,
		/**c0*/
		c0,
		/**c1*/
		c1,
		/**c0_upl*/
		c0_upl,
		/**c1_upl*/
		c1_upl,
		/**c0_valid*/
		c0_valid,
		/**c1_valid*/
		c1_valid,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozsdenDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DBTABLE:rozsden*/
	interface GRozsdenDto {
        /**DBCOLUMN:rozsden.ixp_den*/
		ixp_den?: string|null;
        /**DBCOLUMN:rozsden.lic*/
		lic?: string|null;
        /**DBCOLUMN:rozsden.aktivita*/
		aktivita?: number|null;
        /**DBCOLUMN:rozsden.arw*/
		arw?: number|null;
        /**DBCOLUMN:rozsden.poznamka*/
		poznamka?: string|null;
        /**DBCOLUMN:rozsden.dat_od*/
		dat_od?: JsonDate|null;
        /**DBCOLUMN:rozsden.dat_do*/
		dat_do?: JsonDate|null;
        /**DBCOLUMN:rozsden.ico*/
		ico?: string|null;
        /**DBCOLUMN:rozsden.ucs*/
		ucs?: string|null;
        /**DBCOLUMN:rozsden.nazev*/
		nazev?: string|null;
        /**DBCOLUMN:rozsden.rok*/
		rok?: number|null;
        /**DBCOLUMN:rozsden.typ_den*/
		typ_den?: number|null;
        /**DBCOLUMN:rozsden.ktg_den*/
		ktg_den?: number|null;
        /**DBCOLUMN:rozsden.rez_den*/
		rez_den?: number|null;
        /**DBCOLUMN:rozsden.dat_zmena*/
		dat_zmena?: JsonDate|null;
        /**DBCOLUMN:rozsden.zmenu_prov*/
		zmenu_prov?: string|null;
        /**DBCOLUMN:rozsden.por_cislo_max*/
		por_cislo_max?: number|null;
        /**DBCOLUMN:rozsden.subrada_max*/
		subrada_max?: number|null;
        /**DBCOLUMN:rozsden.subrada_duz*/
		subrada_duz?: number|null;
        /**DBCOLUMN:rozsden.len_ac*/
		len_ac?: number|null;
        /**DBCOLUMN:rozsden.krok_uza*/
		krok_uza?: number|null;
        /**DBCOLUMN:rozsden.ixp_den_old*/
		ixp_den_old?: string|null;
        /**DBCOLUMN:rozsden.uus*/
		uus?: string|null;
        /**DBCOLUMN:rozsden.prefix*/
		prefix?: string|null;
        /**DBCOLUMN:rozsden.suffix*/
		suffix?: string|null;
        /**DBCOLUMN:rozsden.uex*/
		uex?: string|null;
        /**DBCOLUMN:rozsden.ixs_vpk*/
		ixs_vpk?: string|null;
	}
	const enum GRozsdenDtoNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", rez_den = "rez_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix", uex = "uex", ixs_vpk = "ixs_vpk",}
	const enum GRozsdenDtoFragments { ixp_den = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_od = "*", dat_do = "*", ico = "*", ucs = "*", nazev = "*", rok = "*", typ_den = "*", ktg_den = "*", rez_den = "*", dat_zmena = "*", zmenu_prov = "*", por_cislo_max = "*", subrada_max = "*", subrada_duz = "*", len_ac = "*", krok_uza = "*", ixp_den_old = "*", uus = "*", prefix = "*", suffix = "*", uex = "*", ixs_vpk = "*",}
	const enum GRozsdenDtoTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", rez_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string", uex = "string", ixs_vpk = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozSeznamContentDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Objekt jednoho radku seznamu vcetne prav*/
	interface GRozSeznamContentDto {
        /**Data jednoho radku*/
		Row?: Gordic.Uct.Interface.GRozSeznamDokladuDto|null;
        /**Pristupova prava k menu*/
		Permissions?: Gordic.Uct.Interface.GRozAkceSeznamuDto|null;
	}
	const enum GRozSeznamContentDtoNames { Row = "Row", Permissions = "Permissions",}
	const enum GRozSeznamContentDtoFragments { Row = "*", Permissions = "*",}
	const enum GRozSeznamContentDtoTypes { Row = "Gordic.Uct.Interface.GRozSeznamDokladuDto", Permissions = "Gordic.Uct.Interface.GRozAkceSeznamuDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozSeznamDokladuDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Objekt polozky seznamu*/
	interface GRozSeznamDokladuDto extends Gordic.Eko.Interface.GRozspidDto {
		priz_spis?: Gordic.Wfl.Interface.WflcpriEnum|null;
		typ_spis?: Gordic.Wfl.Interface.WflctysEnum|null;
		s_fyz?: Gordic.Wfl.Interface.WflcfyzEnum|null;
		s_ele?: Gordic.Wfl.Interface.WflceleEnum|null;
		s_prij?: Gordic.Wfl.Interface.WflcsprEnum|null;
		puvod?: Gordic.Wfl.Interface.TypPuvoduDokumentuEnum|null;
		s_sgn?: Gordic.Wfl.Interface.WflcsgnEnum|null;
		stav_pis?: Gordic.Wfl.Interface.WflcstpEnum|null;
		priz_cj?: Gordic.Wfl.Interface.WflcpcjEnum|null;
		dat_vyriz_do?: JsonDate|null;
		dat_vyriz?: JsonDate|null;
		s_schval?: number|null;
		stav_dist?: number|null;
		ixs_fun?: string|null;
		s_orig?: number|null;
		/**Gets or sets - ixp_spis_prir . Identifikátor spisu ke kterému je dokument přiřazen*/
		ixp_spis_prir?: string|null;
		typ_ag?: number|null;
		typ_entity_ico?: Gordic.Wfl.Interface.TypEntityIco|null;
		vlastnictvi_doruceni_ico?: Gordic.Wfl.Interface.VlastnictviDoruceniIco|null;
		technicke_vlastnosti_ico?: Gordic.Wfl.Interface.TechnickeVlastnostiIco|null;
		stav_zpracovani_ico?: Gordic.Wfl.Interface.StavZpracovaniIco|null;
		vlastnictvi_redistribuce_ico?: Gordic.Wfl.Interface.VlastnictviRedistribuceIco|null;
		vlastnictvi?: number|null;
		pozice_spis_ico?: Gordic.Wfl.Interface.PoziceSpisIco|null;
		termin_ico?: Gordic.Wfl.Interface.TerminIco|null;
		doplnujici_informace_ico?: Gordic.Wfl.Interface.DoplnujiciInformaceIco[]|null;
		/**DBCOLUMN:Seznam.stav_txt*/
		s_zau_txt?: string|null;
		/**Nazev typu dokumentu*/
		ixs_typ_txt?: string|null;
		/**Nazev funkce*/
		ixs_fun_akt_txt?: string|null;
		/**Pocet el. priloh*/
		poc_epri?: number|null;
		/**uzo*/
		uzo?: string|null;
		s_odes?: number|null;
		/**směřuje na nadřízený spis*/
		ixp_spis?: string|null;
		/**Směřuje na nejvyší nadřazenou entitu, takže třeba na typový spis*/
		ixp_top?: string|null;
		/**Směřuje na nejbližší nadřazenou entitu*/
		ixp_soucast?: string|null;
		/**Atribut preevidence*/
		preevidence?: number|null;
		/**Atribut preevidence*/
		preevid?: number|null;
		/**Kniha do ktere se preevidovalo*/
		novakniha?: string|null;
		/**Jmeno nove knihy*/
		ixp_den_txt?: string|null;
		/**Navigacni vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**Atribut pro popisne vlasnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
	}
	const enum GRozSeznamDokladuDtoNames { priz_spis = "priz_spis", typ_spis = "typ_spis", s_fyz = "s_fyz", s_ele = "s_ele", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", vlastnictvi = "vlastnictvi", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", s_zau_txt = "s_zau_txt", ixs_typ_txt = "ixs_typ_txt", ixs_fun_akt_txt = "ixs_fun_akt_txt", poc_epri = "poc_epri", uzo = "uzo", s_odes = "s_odes", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", preevidence = "preevidence", preevid = "preevid", novakniha = "novakniha", ixp_den_txt = "ixp_den_txt", dokument = "dokument", vlastnosti = "vlastnosti", ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun_akt = "ixs_fun_akt", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_uka = "ixs_uka", ixs_esu = "ixs_esu", ico_esu = "ico_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", ks = "ks", vs = "vs", ss = "ss", ext_valid = "ext_valid", ixs_ahl = "ixs_ahl", cis_sabl_eds = "cis_sabl_eds", ixs_evp = "ixs_evp", ixs_evp_eo = "ixs_evp_eo", ixs_fun_mng = "ixs_fun_mng", kontrola_dok = "kontrola_dok", dokl_status_iissp = "dokl_status_iissp", vysl_volani = "vysl_volani", stav_dokl_txt = "stav_dokl_txt", stav_storno_txt = "stav_storno_txt", stav_iissp_txt = "stav_iissp_txt", stav_epk_txt = "stav_epk_txt", manager_cile_txt = "manager_cile_txt",}
	const enum GRozSeznamDokladuDtoFragments { priz_spis = "*", typ_spis = "*", s_fyz = "*", s_ele = "*", s_prij = "*", puvod = "*", s_sgn = "*", stav_pis = "*", priz_cj = "*", dat_vyriz_do = "*", dat_vyriz = "*", s_schval = "*", stav_dist = "*", ixs_fun = "*", s_orig = "*", ixp_spis_prir = "*", typ_ag = "*", typ_entity_ico = "*", vlastnictvi_doruceni_ico = "*", technicke_vlastnosti_ico = "*", stav_zpracovani_ico = "*", vlastnictvi_redistribuce_ico = "*", vlastnictvi = "vlastnictvi", pozice_spis_ico = "*", termin_ico = "*", doplnujici_informace_ico = "*", s_zau_txt = "*", ixs_typ_txt = "ixs_typ_txt", ixs_fun_akt_txt = "*", poc_epri = "*", uzo = "*", s_odes = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", preevidence = "*", preevid = "*", novakniha = "*", ixp_den_txt = "preevidence", dokument = "dokument", vlastnosti = "vlastnost", ixp = "main", lic = "main", popis = "main", ico = "main", ucs = "main", nks = "main", ixp_den = "main", ac = "main", rok = "main", mesic = "main", den = "main", dat_prij_pod = "main", ixs_typ = "main", ktg_typ = "main", eko_akt = "main", dat_evid = "main", dat_zau = "main", s_zau = "main", s_sto = "main", ac_ixe = "main", stav_ac_ixe = "main", drd = "main", c = "main", dat_zmena = "main", zmenu_prov = "main", ixs_fun_akt = "main", bu_vl = "main", sk_vl = "main", priz_view = "main", ac_ag = "main", uus = "main", cis_real = "main", ixs_fun_vyriz = "main", ixs_uka = "main", ixs_esu = "main", ico_esu = "main", bu_ci = "main", sk_ci = "main", ks = "main", vs = "main", ss = "main", ext_valid = "main", ixs_ahl = "main", cis_sabl_eds = "main", ixs_evp = "main", ixs_evp_eo = "main", ixs_fun_mng = "main", kontrola_dok = "main", dokl_status_iissp = "main", vysl_volani = "main", stav_dokl_txt = "main", stav_storno_txt = "main", stav_iissp_txt = "main", stav_epk_txt = "main", manager_cile_txt = "*",}
	const enum GRozSeznamDokladuDtoTypes { priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", typ_ag = "number", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", vlastnictvi = "number", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", s_zau_txt = "string", ixs_typ_txt = "string", ixs_fun_akt_txt = "string", poc_epri = "number", uzo = "string", s_odes = "number", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", preevidence = "number", preevid = "number", novakniha = "string", ixp_den_txt = "string", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun_akt = "string", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", ixs_uka = "string", ixs_esu = "string", ico_esu = "string", bu_ci = "string", sk_ci = "string", ks = "string", vs = "string", ss = "string", ext_valid = "number", ixs_ahl = "string", cis_sabl_eds = "string", ixs_evp = "string", ixs_evp_eo = "string", ixs_fun_mng = "string", kontrola_dok = "number", dokl_status_iissp = "number", vysl_volani = "number", stav_dokl_txt = "string", stav_storno_txt = "string", stav_iissp_txt = "string", stav_epk_txt = "string", manager_cile_txt = "string",}
	const enum GRozSeznamDokladuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozUkazatelDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Ulozeny ukazatel nascitany za doklad*/
	interface GRozUkazatelDto {
		/**identifikator ukazatele*/
		ixs_evp?: string|null;
		/**Nazev ukazatele*/
		nazev_uka?: string|null;
		/**Identifikator dokladu*/
		ixp?: string|null;
		/**DBCOLUMN:rozdkzu.rok*/
		rok?: number|null;
		lic?: string|null;
		/**DBCOLUMN:rozdkzu.ico*/
		ico?: string|null;
		ucs?: string|null;
		nks?: string|null;
		uus?: string|null;
		/**DBCOLUMN:rozdkzu.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:rozdkzu.c1*/
		c1?: JsonDecimal|null;
		/**Typ ukazatele - souhrany,interni atd.*/
		ixs_tuk?: string|null;
		/**Typ kontroly - na zmenu, na zvyseni atd.*/
		typ_kuk?: number|null;
		/**Typ kontroly v pripade poruseni ukazatele*/
		typ_oper_uka_0?: number|null;
		/**Typ kontroly v pripade splneni ukazatele*/
		typ_oper_uka_1?: number|null;
		/**Druh dokladu*/
		drd?: number|null;
		/**Castka limitu, slouzi pouze k vypisum*/
		c_limit?: JsonDecimal|null;
		/**Ciselna hodnota typu vysledne operace (zda vratit, predat k ext.validaci atd.)*/
		typ_oper_uka?: number|null;
		/**Cislna hodnota vysledku operace - 0-ukazatel porusen, 1-vse je v poradku*/
		vysl_oper_uka?: number|null;
	}
	const enum GRozUkazatelDtoNames { ixs_evp = "ixs_evp", nazev_uka = "nazev_uka", ixp = "ixp", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", nks = "nks", uus = "uus", c0 = "c0", c1 = "c1", ixs_tuk = "ixs_tuk", typ_kuk = "typ_kuk", typ_oper_uka_0 = "typ_oper_uka_0", typ_oper_uka_1 = "typ_oper_uka_1", drd = "drd", c_limit = "c_limit", typ_oper_uka = "typ_oper_uka", vysl_oper_uka = "vysl_oper_uka",}
	const enum GRozUkazatelDtoFragments { ixs_evp = "*", nazev_uka = "*", ixp = "*", rok = "*", lic = "*", ico = "*", ucs = "*", nks = "*", uus = "*", c0 = "*", c1 = "*", ixs_tuk = "*", typ_kuk = "*", typ_oper_uka_0 = "*", typ_oper_uka_1 = "*", drd = "*", c_limit = "*", typ_oper_uka = "*", vysl_oper_uka = "*",}
	const enum GRozUkazatelDtoTypes { ixs_evp = "string", nazev_uka = "string", ixp = "string", rok = "number", lic = "string", ico = "string", ucs = "string", nks = "string", uus = "string", c0 = "JsonDecimal", c1 = "JsonDecimal", ixs_tuk = "string", typ_kuk = "number", typ_oper_uka_0 = "number", typ_oper_uka_1 = "number", drd = "number", c_limit = "JsonDecimal", typ_oper_uka = "number", vysl_oper_uka = "number",}
	const enum GRozUkazatelDtoTypeLengths { ixs_evp = 12, ixp = 12, lic = 4, ico = 10, ucs = 10, nks = 10, uus = 10, ixs_tuk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozVysledekHromadneAkceDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro predani vysledku zpracovani hromadne akce*/
	interface GRozVysledekHromadneAkceDto {
		/**Identifikator dokladu*/
		ixp?: string|null;
		/**Ulozeni informace o datumu posledni zmeny kvuli vicekrokovych operacich - probihaji kontroly atd.*/
		dat_zmena?: JsonDate|null;
		/**Priznak, zda operace dopadla dobre nebo spatne*/
		vysledek?: boolean|null;
		/**Textovy vysledek operace*/
		vysledekTxt?: string|null;
	}
	const enum GRozVysledekHromadneAkceDtoNames { ixp = "ixp", dat_zmena = "dat_zmena", vysledek = "vysledek", vysledekTxt = "vysledekTxt",}
	const enum GRozVysledekHromadneAkceDtoFragments { ixp = "*", dat_zmena = "*", vysledek = "*", vysledekTxt = "*",}
	const enum GRozVysledekHromadneAkceDtoTypes { ixp = "string", dat_zmena = "JsonDate", vysledek = "boolean", vysledekTxt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozZapisRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Predek vstupniho pozadavku pro zapisy*/
	interface GRozZapisRequestDto {
		/**Pid dokladu*/
		ixp?: string|null;
		/**Datum zmeny hlavicky dokladu*/
		dat_zmena?: JsonDate|null;
		/**Stav dokladu*/
		s_zau?: number|null;
		/**Zapis dokladu*/
		Zapis?: Gordic.Uct.Interface.GRozdpepDto|null;
		/**Zapisy dokladu*/
		Zapisy?: Gordic.Uct.Interface.GRozdpepDto[]|null;
	}
	const enum GRozZapisRequestDtoNames { ixp = "ixp", dat_zmena = "dat_zmena", s_zau = "s_zau", Zapis = "Zapis", Zapisy = "Zapisy",}
	const enum GRozZapisRequestDtoFragments { ixp = "*", dat_zmena = "*", s_zau = "*", Zapis = "*", Zapisy = "*",}
	const enum GRozZapisRequestDtoTypes { ixp = "string", dat_zmena = "JsonDate", s_zau = "number", Zapis = "Gordic.Uct.Interface.GRozdpepDto", Zapisy = "Gordic.Uct.Interface.GRozdpepDto[]",}
	const enum GRozZapisRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GRozZapisResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro ulozeni zapisu dokladu odpoved*/
	interface GRozZapisResponseDto {
		/**Vysledna hlaska*/
		ResultMessage?: string|null;
		/**Pid dokladu*/
		PidDokladu?: string|null;
		/**Datum zmeny*/
		DatumZmeny?: JsonDate|null;
		/**Stav Dokladu textove*/
		StavTxt?: string|null;
		/**Stav Dokladu*/
		StavDokladu?: Gordic.Uct.Interface.CStavyDokladu.GEStavyDokladu|null;
		/**Sloupecek s_zau*/
		s_zau?: number|null;
		/**Sloupecek eko_akt*/
		eko_akt?: number|null;
		/**Atribut zmeny stavu dokladu*/
		StateChanged?: boolean|null;
		/**Hlavicka doiladu*/
		Hlavicka?: Gordic.Eko.Interface.GRozspidDto|null;
		/**Zapis dokladu*/
		Zapis?: Gordic.Uct.Interface.GRozdpepDto|null;
		/**Zapisydokladu*/
		Zapisy?: Gordic.Uct.Interface.GRozdpepDto[]|null;
		/**Pocet ovlivnenych radku*/
		PocetOvlivnenychRadku?: number|null;
		/**Pristupk k akcim*/
		ActionPermissions?: Gordic.Uct.Interface.GRozDokladActionPermissions|null;
		/**Pristup k polickam*/
		FieldPermissions?: Gordic.Uct.Interface.GRozDokladFieldPermissions|null;
	}
	const enum GRozZapisResponseDtoNames { ResultMessage = "ResultMessage", PidDokladu = "PidDokladu", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapis = "Zapis", Zapisy = "Zapisy", PocetOvlivnenychRadku = "PocetOvlivnenychRadku", ActionPermissions = "ActionPermissions", FieldPermissions = "FieldPermissions",}
	const enum GRozZapisResponseDtoFragments { ResultMessage = "*", PidDokladu = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapis = "*", Zapisy = "*", PocetOvlivnenychRadku = "*", ActionPermissions = "*", FieldPermissions = "*",}
	const enum GRozZapisResponseDtoTypes { ResultMessage = "string", PidDokladu = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Uct.Interface.CStavyDokladu.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GRozspidDto", Zapis = "Gordic.Uct.Interface.GRozdpepDto", Zapisy = "Gordic.Uct.Interface.GRozdpepDto[]", PocetOvlivnenychRadku = "number", ActionPermissions = "Gordic.Uct.Interface.GRozDokladActionPermissions", FieldPermissions = "Gordic.Uct.Interface.GRozDokladFieldPermissions",}
	const enum GRozZapisResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\GSessionParamsDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Global DTO s parametry session*/
	interface GSessionParamsDto {
		/**Licence databaze*/
		Licence?: string|null;
		/**LogPorCislo*/
		LogPorCislo?: number|null;
		/**Prihlaseny uzivatel (funkce)*/
		IxsFun?: string|null;
		/**Aktivni spisovy uzel*/
		IxsSu?: string|null;
		/**Kompletni infomrace o prihlasenem*/
		IxsLpc?: string|null;
	}
	const enum GSessionParamsDtoNames { Licence = "Licence", LogPorCislo = "LogPorCislo", IxsFun = "IxsFun", IxsSu = "IxsSu", IxsLpc = "IxsLpc",}
	const enum GSessionParamsDtoFragments { Licence = "*", LogPorCislo = "*", IxsFun = "*", IxsSu = "*", IxsLpc = "*",}
	const enum GSessionParamsDtoTypes { Licence = "string", LogPorCislo = "number", IxsFun = "string", IxsSu = "string", IxsLpc = "string",}
	const enum GSessionParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\Vstup\GInputDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vstupni DTO obsahujici ixp a dat_zmena*/
	interface GIxpDto {
		/**Identifikator objektu*/
		ixp?: string|null;
		/**Datum posledni databazove zmeny objektu*/
		dat_zmena?: JsonDate|null;
	}
	const enum GIxpDtoNames { ixp = "ixp", dat_zmena = "dat_zmena",}
	const enum GIxpDtoFragments { ixp = "*", dat_zmena = "*",}
	const enum GIxpDtoTypes { ixp = "string", dat_zmena = "JsonDate",}
	const enum GIxpDtoTypeLengths {}
	/**Vstupni DTO obsahujici cislo chyby / null*/
	interface GErrorInDto {
		/**Kod chyby*/
		lastErrorCode?: number|null;
	}
	const enum GErrorInDtoNames { lastErrorCode = "lastErrorCode",}
	const enum GErrorInDtoFragments { lastErrorCode = "*",}
	const enum GErrorInDtoTypes { lastErrorCode = "number",}
	const enum GErrorInDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\VV\GDokladyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vstupni DTO pro doklad*/
	interface GInputDokladDto {
		/**Kolekce vstupnich dat*/
		inputData?: Gordic.Uct.Interface.GIxpDto|null;
		/**Informace o pripadne chybe*/
		error?: Gordic.Uct.Interface.GErrorInDto|null;
		/**Akce, ze ktere je uloha volana*/
		action?: Gordic.Uct.Interface.GEAkceFormulare|null;
	}
	const enum GInputDokladDtoNames { inputData = "inputData", error = "error", action = "action",}
	const enum GInputDokladDtoFragments { inputData = "*", error = "*", action = "*",}
	const enum GInputDokladDtoTypes { inputData = "Gordic.Uct.Interface.GIxpDto", error = "Gordic.Uct.Interface.GErrorInDto", action = "Gordic.Uct.Interface.GEAkceFormulare",}
	const enum GInputDokladDtoTypeLengths {}
	/**Vstupni DTO pro uzaverky*/
	interface GInputDokladyDto {
		/**Kolekce vstupnich dat*/
		inputData?: Gordic.Uct.Interface.GIxpDto[]|null;
	}
	const enum GInputDokladyDtoNames { inputData = "inputData",}
	const enum GInputDokladyDtoFragments { inputData = "*",}
	const enum GInputDokladyDtoTypes { inputData = "Gordic.Uct.Interface.GIxpDto[]",}
	const enum GInputDokladyDtoTypeLengths {}
	/**Vystupni DTO s jednou knihou*/
	interface GOutputDokladDto {
		/**Informace o dokladu*/
		doklad?: Gordic.Uct.Interface.GRozpoctovyDokladDto|null;
		/**Informace o pripadne chybe*/
		error?: Gordic.Uct.Interface.GResultOutDto|null;
	}
	const enum GOutputDokladDtoNames { doklad = "doklad", error = "error",}
	const enum GOutputDokladDtoFragments { doklad = "*", error = "*",}
	const enum GOutputDokladDtoTypes { doklad = "Gordic.Uct.Interface.GRozpoctovyDokladDto", error = "Gordic.Uct.Interface.GResultOutDto",}
	const enum GOutputDokladDtoTypeLengths {}
	/**Vystupni DTO s kolekci knih*/
	interface GOutputDokladyDto {
		/**Informace o knize*/
		doklady?: Gordic.Uct.Interface.GOutputDokladDto[]|null;
		/**Informace o celkovem vysledku hromadne operace*/
		error?: Gordic.Uct.Interface.GResultOutDto|null;
	}
	const enum GOutputDokladyDtoNames { doklady = "doklady", error = "error",}
	const enum GOutputDokladyDtoFragments { doklady = "*", error = "*",}
	const enum GOutputDokladyDtoTypes { doklady = "Gordic.Uct.Interface.GOutputDokladDto[]", error = "Gordic.Uct.Interface.GResultOutDto",}
	const enum GOutputDokladyDtoTypeLengths {}
	/**Obecny objekt dokladu*/
	interface GRozpoctovyDokladDto {
		/**Hlavicka dokladu*/
		hlavicka?: Gordic.Eko.Interface.GRozspidWDto|null;
		/**Polozky (zapisy) dokladu (rozdpep)*/
		rows?: Gordic.Uct.Interface.GRozdpepDto[]|null;
		/**A-hlavicka dokladu (nepovinna)*/
		aHeader?: Gordic.Uct.Interface.GRozsahlOutDto|null;
		/**Udaje o knize, vyzadovano WK*/
		kniha?: Gordic.Uct.Interface.GRozsdenDto|null;
		/**Komunikace se statni pokladnou (nepovinne)*/
		iissp?: Gordic.Uct.Interface.GRozsispDto|null;
		/**Radky IK pro komunikaci se statni pokladnou (nepovinne)*/
		iisspRows?: Gordic.Uct.Interface.GRozdispDto[]|null;
		/**Radky ukazetelu a vysledek kontroly*/
		ukazatele?: Gordic.Uct.Interface.GRozVysledekUkazateluResponseDto|null;
	}
	const enum GRozpoctovyDokladDtoNames { hlavicka = "hlavicka", rows = "rows", aHeader = "aHeader", kniha = "kniha", iissp = "iissp", iisspRows = "iisspRows", ukazatele = "ukazatele",}
	const enum GRozpoctovyDokladDtoFragments { hlavicka = "*", rows = "*", aHeader = "*", kniha = "*", iissp = "*", iisspRows = "*", ukazatele = "*",}
	const enum GRozpoctovyDokladDtoTypes { hlavicka = "Gordic.Eko.Interface.GRozspidWDto", rows = "Gordic.Uct.Interface.GRozdpepDto[]", aHeader = "Gordic.Uct.Interface.GRozsahlOutDto", kniha = "Gordic.Uct.Interface.GRozsdenDto", iissp = "Gordic.Uct.Interface.GRozsispDto", iisspRows = "Gordic.Uct.Interface.GRozdispDto[]", ukazatele = "Gordic.Uct.Interface.GRozVysledekUkazateluResponseDto",}
	const enum GRozpoctovyDokladDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\VV\GUzaverkyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vstupni DTO pro uzaverky*/
	interface GInputUzaverkaDto {
		/**Kolekce vstupnich dat*/
		inputData?: Gordic.Uct.Interface.GIxpDto|null;
		/**Informace o pripadne chybe*/
		error?: Gordic.Uct.Interface.GErrorInDto|null;
	}
	const enum GInputUzaverkaDtoNames { inputData = "inputData", error = "error",}
	const enum GInputUzaverkaDtoFragments { inputData = "*", error = "*",}
	const enum GInputUzaverkaDtoTypes { inputData = "Gordic.Uct.Interface.GIxpDto", error = "Gordic.Uct.Interface.GErrorInDto",}
	const enum GInputUzaverkaDtoTypeLengths {}
	/**Vstupni DTO pro uzaverky*/
	interface GInputUzaverkyDto {
		/**Kolekce vstupnich dat*/
		inputData?: Gordic.Uct.Interface.GIxpDto[]|null;
	}
	const enum GInputUzaverkyDtoNames { inputData = "inputData",}
	const enum GInputUzaverkyDtoFragments { inputData = "*",}
	const enum GInputUzaverkyDtoTypes { inputData = "Gordic.Uct.Interface.GIxpDto[]",}
	const enum GInputUzaverkyDtoTypeLengths {}
	/**Vystupni DTO s jednou knihou*/
	interface GOutputUzaverkaDto {
		/**Informace o knize*/
		kniha?: Gordic.Uct.Interface.GRozpoctovaKnihaDto|null;
		/**Informace o pripadne chybe*/
		error?: Gordic.Uct.Interface.GResultOutDto|null;
	}
	const enum GOutputUzaverkaDtoNames { kniha = "kniha", error = "error",}
	const enum GOutputUzaverkaDtoFragments { kniha = "*", error = "*",}
	const enum GOutputUzaverkaDtoTypes { kniha = "Gordic.Uct.Interface.GRozpoctovaKnihaDto", error = "Gordic.Uct.Interface.GResultOutDto",}
	const enum GOutputUzaverkaDtoTypeLengths {}
	/**Vystupni DTO s kolekci knih*/
	interface GOutputUzaverkyDto {
		/**Informace o knize*/
		knihy?: Gordic.Uct.Interface.GOutputUzaverkaDto[]|null;
		/**Informace o celkovem vysledku hromadne operace*/
		error?: Gordic.Uct.Interface.GResultOutDto|null;
	}
	const enum GOutputUzaverkyDtoNames { knihy = "knihy", error = "error",}
	const enum GOutputUzaverkyDtoFragments { knihy = "*", error = "*",}
	const enum GOutputUzaverkyDtoTypes { knihy = "Gordic.Uct.Interface.GOutputUzaverkaDto[]", error = "Gordic.Uct.Interface.GResultOutDto",}
	const enum GOutputUzaverkyDtoTypeLengths {}
	interface GRozpoctovaKnihaDto {
		/**DBCOLUMN:rozsden.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:rozsden.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:rozsden.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:rozsden.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:rozsden.rok*/
		rok?: number|null;
	}
	const enum GRozpoctovaKnihaDtoNames { ixp_den = "ixp_den", dat_zmena = "dat_zmena", aktivita = "aktivita", nazev = "nazev", rok = "rok",}
	const enum GRozpoctovaKnihaDtoFragments { ixp_den = "*", dat_zmena = "*", aktivita = "*", nazev = "*", rok = "*",}
	const enum GRozpoctovaKnihaDtoTypes { ixp_den = "string", dat_zmena = "JsonDate", aktivita = "number", nazev = "string", rok = "number",}
	const enum GRozpoctovaKnihaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Roz\Vystup\GOutputDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vystupni DTO obsahujici informaci o pripadne chybe*/
	interface GResultOutDto {
		/**Kod chyby*/
		errorCode?: number|null;
		/**Vysledna hlaska*/
		message?: string|null;
		/**Typ hlasky*/
		typ?: Gordic.Uct.Interface.GETypyChyb|null;
		/**Kontrola uspechu*/
		readonly Success?: boolean|null;
		/**Indikuje, ze metoda nebyla spustena z duvodu nesplneni podminek*/
		readonly NotLaunched?: boolean|null;
	}
	const enum GResultOutDtoNames { errorCode = "errorCode", message = "message", typ = "typ", Success = "Success", NotLaunched = "NotLaunched",}
	const enum GResultOutDtoFragments { errorCode = "*", message = "*", typ = "*", Success = "*", NotLaunched = "*",}
	const enum GResultOutDtoTypes { errorCode = "number", message = "string", typ = "Gordic.Uct.Interface.GETypyChyb", Success = "boolean", NotLaunched = "boolean",}
	const enum GResultOutDtoTypeLengths {}
	/**Vystupni DTO obsahujici informaci o pripadne chybe a data v pripade uspechu*/
	interface GResultOutDataDto<T> {
		/**Indikuje, zda byla operace úspěšná*/
		readonly Success?: boolean|null;
		/**Indikuje, ze metoda nebyla spustena z duvodu nesplneni podminek*/
		readonly NotLaunched?: boolean|null;
		/**Vrací data, pokud byla operace úspěšná*/
		Data?: T|null;
		/**Vrací chybu, pokud byla operace neúspěšná*/
		ErrorResult?: Gordic.Uct.Interface.GResultOutDto|null;
	}
	const enum GResultOutDataDtoNames { Success = "Success", NotLaunched = "NotLaunched", Data = "Data", ErrorResult = "ErrorResult",}
	const enum GResultOutDataDtoFragments { Success = "*", NotLaunched = "*", Data = "*", ErrorResult = "*",}
	const enum GResultOutDataDtoTypes { Success = "boolean", NotLaunched = "boolean", Data = "T", ErrorResult = "Gordic.Uct.Interface.GResultOutDto",}
	const enum GResultOutDataDtoTypeLengths {}
	/**Pristupova prava k akcim seznamu*/
	interface GPravaSeznam {
		uzaverky: Gordic.General.ApplicationInterface.GPermission;
		uzavreniKnihy: Gordic.General.ApplicationInterface.GPermission;
		zruseniUzavreniKnihy: Gordic.General.ApplicationInterface.GPermission;
		hromadneUzavreniKnih: Gordic.General.ApplicationInterface.GPermission;
		uzavreniAgendy: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPravaSeznamNames { uzaverky = "uzaverky", uzavreniKnihy = "uzavreniKnihy", zruseniUzavreniKnihy = "zruseniUzavreniKnihy", hromadneUzavreniKnih = "hromadneUzavreniKnih", uzavreniAgendy = "uzavreniAgendy",}
	const enum GPravaSeznamFragments { uzaverky = "*", uzavreniKnihy = "*", zruseniUzavreniKnihy = "*", hromadneUzavreniKnih = "*", uzavreniAgendy = "*",}
	const enum GPravaSeznamTypes { uzaverky = "Gordic.General.ApplicationInterface.GPermission", uzavreniKnihy = "Gordic.General.ApplicationInterface.GPermission", zruseniUzavreniKnihy = "Gordic.General.ApplicationInterface.GPermission", hromadneUzavreniKnih = "Gordic.General.ApplicationInterface.GPermission", uzavreniAgendy = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPravaSeznamTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\StatniPokladna\GRozIisspEkisSpPskRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Požadavek na přeúčtování skutečnosti z EKIS do IISSP*/
	interface GRozIisspEkisSpPskRequestDto {
		/**způsob volání*/
		zpusob_volani?: Gordic.Ginis.DbModel.GIisspZpusobVolaniEnum|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**ixb souboru*/
		ixb?: string|null;
		/**ixs_vkz*/
		ixs_vkz?: string|null;
		/**por_cislo*/
		por_cislo?: number|null;
	}
	const enum GRozIisspEkisSpPskRequestDtoNames { zpusob_volani = "zpusob_volani", ico = "ico", ucs = "ucs", ixb = "ixb", ixs_vkz = "ixs_vkz", por_cislo = "por_cislo",}
	const enum GRozIisspEkisSpPskRequestDtoFragments { zpusob_volani = "*", ico = "*", ucs = "*", ixb = "*", ixs_vkz = "*", por_cislo = "*",}
	const enum GRozIisspEkisSpPskRequestDtoTypes { zpusob_volani = "Gordic.Ginis.DbModel.GIisspZpusobVolaniEnum", ico = "string", ucs = "string", ixb = "string", ixs_vkz = "string", por_cislo = "number",}
	const enum GRozIisspEkisSpPskRequestDtoTypeLengths { ico = 10, ucs = 10, ixb = 12, ixs_vkz = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Ucr\GEkosazoDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:ekosazo*/
	interface GEkosazoDto {
		/**DBCOLUMN:ekosazo.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekosazo.rok*/
		rok?: number|null;
		/**DBCOLUMN:ekosazo.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:ekosazo.typ_priz_dph*/
		typ_priz_dph?: number|null;
		/**DBCOLUMN:ekosazo.s_dph*/
		s_dph?: number|null;
		/**DBCOLUMN:ekosazo.s_prep_dph*/
		s_prep_dph?: number|null;
		/**DBCOLUMN:ekosazo.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekosazo.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekosazo.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekosazo.platce_dph*/
		platce_dph?: number|null;
		/**DBCOLUMN:ekosazo.koef_zal*/
		koef_zal?: JsonDecimal|null;
		/**DBCOLUMN:ekosazo.koef_vyp*/
		koef_vyp?: JsonDecimal|null;
	}
	const enum GEkosazoDtoNames { ico = "ico", rok = "rok", mesic = "mesic", typ_priz_dph = "typ_priz_dph", s_dph = "s_dph", s_prep_dph = "s_prep_dph", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", platce_dph = "platce_dph", koef_zal = "koef_zal", koef_vyp = "koef_vyp",}
	const enum GEkosazoDtoFragments { ico = "*", rok = "*", mesic = "*", typ_priz_dph = "*", s_dph = "*", s_prep_dph = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", platce_dph = "*", koef_zal = "*", koef_vyp = "*",}
	const enum GEkosazoDtoTypes { ico = "string", rok = "number", mesic = "number", typ_priz_dph = "number", s_dph = "number", s_prep_dph = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", platce_dph = "number", koef_zal = "JsonDecimal", koef_vyp = "JsonDecimal",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Ucr\GEkoSeznamDphDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:SeznamDph*/
	interface GEkoSeznamDphDto {
		/**DBCOLUMN:SeznamDph.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamDph.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamDph.uus*/
		uus?: string|null;
		/**DBCOLUMN:SeznamDph.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamDph.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:SeznamDph.uex_dph*/
		uex_dph?: string|null;
		/**DBCOLUMN:SeznamDph.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamDph.priz_zobr*/
		priz_zobr?: string|null;
		/**DBCOLUMN:SeznamDph.c_akt_1*/
		c_akt_1?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_priz_1*/
		c_priz_1?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_diff_1*/
		c_diff_1?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_akt_2*/
		c_akt_2?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_priz_2*/
		c_priz_2?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_diff_2*/
		c_diff_2?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_akt_3*/
		c_akt_3?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_priz_3*/
		c_priz_3?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_diff_3*/
		c_diff_3?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_akt_4*/
		c_akt_4?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_priz_4*/
		c_priz_4?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.c_diff_4*/
		c_diff_4?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDph.radek_dph*/
		radek_dph?: string|null;
	}
	const enum GEkoSeznamDphDtoNames { ico = "ico", ucs = "ucs", uus = "uus", rok = "rok", mesic = "mesic", uex_dph = "uex_dph", nazev = "nazev", priz_zobr = "priz_zobr", c_akt_1 = "c_akt_1", c_priz_1 = "c_priz_1", c_diff_1 = "c_diff_1", c_akt_2 = "c_akt_2", c_priz_2 = "c_priz_2", c_diff_2 = "c_diff_2", c_akt_3 = "c_akt_3", c_priz_3 = "c_priz_3", c_diff_3 = "c_diff_3", c_akt_4 = "c_akt_4", c_priz_4 = "c_priz_4", c_diff_4 = "c_diff_4", radek_dph = "radek_dph",}
	const enum GEkoSeznamDphDtoFragments { ico = "*", ucs = "*", uus = "*", rok = "*", mesic = "*", uex_dph = "*", nazev = "*", priz_zobr = "*", c_akt_1 = "*", c_priz_1 = "*", c_diff_1 = "*", c_akt_2 = "*", c_priz_2 = "*", c_diff_2 = "*", c_akt_3 = "*", c_priz_3 = "*", c_diff_3 = "*", c_akt_4 = "*", c_priz_4 = "*", c_diff_4 = "*", radek_dph = "*",}
	const enum GEkoSeznamDphDtoTypes { ico = "string", ucs = "string", uus = "string", rok = "number", mesic = "number", uex_dph = "string", nazev = "string", priz_zobr = "string", c_akt_1 = "JsonDecimal", c_priz_1 = "JsonDecimal", c_diff_1 = "JsonDecimal", c_akt_2 = "JsonDecimal", c_priz_2 = "JsonDecimal", c_diff_2 = "JsonDecimal", c_akt_3 = "JsonDecimal", c_priz_3 = "JsonDecimal", c_diff_3 = "JsonDecimal", c_akt_4 = "JsonDecimal", c_priz_4 = "JsonDecimal", c_diff_4 = "JsonDecimal", radek_dph = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Ucr\GRozSeznamAatDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:SeznamAat*/
	interface GRozSeznamAatDto {
		/**DBCOLUMN:SeznamAat.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamAat.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamAat.uus*/
		uus?: string|null;
		/**DBCOLUMN:SeznamAat.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamAat.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamAat.uea*/
		uea?: string|null;
		/**DBCOLUMN:SeznamAat.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:SeznamAat.uec*/
		uec?: string|null;
		/**DBCOLUMN:SeznamAat.ued*/
		ued?: string|null;
		/**DBCOLUMN:SeznamAat.uee*/
		uee?: string|null;
		/**DBCOLUMN:SeznamAat.uef*/
		uef?: string|null;
		/**DBCOLUMN:SeznamAat.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:SeznamAat.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:SeznamAat.uei*/
		uei?: string|null;
		/**DBCOLUMN:SeznamAat.uej*/
		uej?: string|null;
		/**DBCOLUMN:SeznamAat.uek*/
		uek?: string|null;
		/**DBCOLUMN:SeznamAat.uel*/
		uel?: string|null;
		/**DBCOLUMN:SeznamAat.uem*/
		uem?: string|null;
		/**DBCOLUMN:SeznamAat.uen*/
		uen?: string|null;
		/**DBCOLUMN:SeznamAat.te0*/
		te0?: string|null;
		/**DBCOLUMN:SeznamAat.te1*/
		te1?: string|null;
		/**DBCOLUMN:SeznamAat.te2*/
		te2?: string|null;
		/**DBCOLUMN:SeznamAat.te3*/
		te3?: string|null;
		/**DBCOLUMN:SeznamAat.te4*/
		te4?: string|null;
		/**DBCOLUMN:SeznamAat.te5*/
		te5?: string|null;
		/**DBCOLUMN:SeznamAat.te6*/
		te6?: string|null;
		/**DBCOLUMN:SeznamAat.te7*/
		te7?: string|null;
		/**DBCOLUMN:SeznamAat.te8*/
		te8?: string|null;
		/**DBCOLUMN:SeznamAat.te9*/
		te9?: string|null;
		/**DBCOLUMN:SeznamAat.c_sl*/
		c_sl?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_ru*/
		c_ru?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_14*/
		c_14?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_mrz*/
		c_mrz?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_act*/
		c_act?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_vz*/
		c_vz?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_sml*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_vz_sml*/
		c_vz_sml?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_obj*/
		c_obj?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_obj_sml*/
		c_obj_sml?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_obj_blk*/
		c_obj_blk?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_fak*/
		c_fak?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_rsm*/
		c_rsm?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_disp*/
		c_disp?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_uct*/
		c_uct?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.druh_char*/
		druh_char?: number|null;
		/**DBCOLUMN:SeznamAat.druh dokladur*/
		drd?: number|null;
		druh_char_txt?: string|null;
		/**DBCOLUMN:SeznamAat.priz_char*/
		priz_char?: number|null;
		priz_char_txt?: string|null;
		/**DBCOLUMN:SeznamAat.c_cerpani_rs*/
		c_cerpani_rs?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.c_cerpani_ru*/
		c_cerpani_ru?: JsonDecimal|null;
		/**DBCOLUMN:SeznamAat.zdrojdat*/
		zdrojdat?: string|null;
		/**DBCOLUMN:SeznamAat.c_navrh*/
		c_navrh?: JsonDecimal|null;
	}
	const enum GRozSeznamAatDtoNames { ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", rok = "rok", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c_sl = "c_sl", c_ru = "c_ru", c_14 = "c_14", c_mrz = "c_mrz", c_act = "c_act", c_vz = "c_vz", c_sml = "c_sml", c_vz_sml = "c_vz_sml", c_obj = "c_obj", c_obj_sml = "c_obj_sml", c_obj_blk = "c_obj_blk", c_fak = "c_fak", c_rsm = "c_rsm", c_disp = "c_disp", c_uct = "c_uct", druh_char = "druh_char", drd = "drd", druh_char_txt = "druh_char_txt", priz_char = "priz_char", priz_char_txt = "priz_char_txt", c_cerpani_rs = "c_cerpani_rs", c_cerpani_ru = "c_cerpani_ru", zdrojdat = "zdrojdat", c_navrh = "c_navrh",}
	const enum GRozSeznamAatDtoFragments { ico = "*", ucs = "*", uus = "*", nks = "*", rok = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", c_sl = "*", c_ru = "*", c_14 = "*", c_mrz = "*", c_act = "*", c_vz = "*", c_sml = "*", c_vz_sml = "*", c_obj = "*", c_obj_sml = "*", c_obj_blk = "*", c_fak = "*", c_rsm = "*", c_disp = "*", c_uct = "*", druh_char = "*", drd = "*", druh_char_txt = "*", priz_char = "*", priz_char_txt = "*", c_cerpani_rs = "*", c_cerpani_ru = "*", zdrojdat = "*", c_navrh = "*",}
	const enum GRozSeznamAatDtoTypes { ico = "string", ucs = "string", uus = "string", nks = "string", rok = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", c_sl = "JsonDecimal", c_ru = "JsonDecimal", c_14 = "JsonDecimal", c_mrz = "JsonDecimal", c_act = "JsonDecimal", c_vz = "JsonDecimal", c_sml = "JsonDecimal", c_vz_sml = "JsonDecimal", c_obj = "JsonDecimal", c_obj_sml = "JsonDecimal", c_obj_blk = "JsonDecimal", c_fak = "JsonDecimal", c_rsm = "JsonDecimal", c_disp = "JsonDecimal", c_uct = "JsonDecimal", druh_char = "number", drd = "number", druh_char_txt = "string", priz_char = "number", priz_char_txt = "string", c_cerpani_rs = "JsonDecimal", c_cerpani_ru = "JsonDecimal", zdrojdat = "string", c_navrh = "JsonDecimal",}
	const enum GRozSeznamAatDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Ucr\GRozSeznamAatFilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:SeznamAat*/
	interface GRozSeznamAatFilterDto {
		/**DBCOLUMN:SeznamAat.ico*/
		ico?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ucs*/
		ucs?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uus*/
		uus?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.nks*/
		nks?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.rok*/
		rok?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamAat.uea*/
		uea?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueb*/
		ueb?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uec*/
		uec?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ued*/
		ued?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uee*/
		uee?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uef*/
		uef?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueg*/
		ueg?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueh*/
		ueh?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uei*/
		uei?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uej*/
		uej?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uek*/
		uek?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uel*/
		uel?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uem*/
		uem?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uen*/
		uen?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te0*/
		te0?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te1*/
		te1?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te2*/
		te2?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te3*/
		te3?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te4*/
		te4?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te5*/
		te5?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te6*/
		te6?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te7*/
		te7?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te8*/
		te8?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.te9*/
		te9?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.c_sl*/
		c_sl?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_ru*/
		c_ru?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_14*/
		c_14?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_mrz*/
		c_mrz?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_act*/
		c_act?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_vz*/
		c_vz?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_sml*/
		c_sml?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_vz_sml*/
		c_vz_sml?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_obj*/
		c_obj?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_obj_sml*/
		c_obj_sml?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_obj_blk*/
		c_obj_blk?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_fak*/
		c_fak?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_rsm*/
		c_rsm?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_disp*/
		c_disp?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_uct*/
		c_uct?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.druh_char*/
		druh_char?: number|null;
		druh_char_txt?: string|null;
		/**DBCOLUMN:SeznamAat.drd*/
		drd?: number|null;
		/**DBCOLUMN:SeznamAat.druh dokladur*/
		drd_msk?: string|null;
		/**DBCOLUMN:SeznamAat.priz_char*/
		priz_char?: number|null;
		priz_char_txt?: string|null;
		/**DBCOLUMN:SeznamAat.c_cerpani_rs*/
		c_cerpani_rs?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.c_cerpani_ru*/
		c_cerpani_ru?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamAat.zdrojdat*/
		zdrojdat?: string|null;
		/**DBCOLUMN:SeznamAat.c_navrh*/
		c_navrh?: GIntervalDto<JsonDecimal>|null;
	}
	const enum GRozSeznamAatFilterDtoNames { ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", rok = "rok", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", c_sl = "c_sl", c_ru = "c_ru", c_14 = "c_14", c_mrz = "c_mrz", c_act = "c_act", c_vz = "c_vz", c_sml = "c_sml", c_vz_sml = "c_vz_sml", c_obj = "c_obj", c_obj_sml = "c_obj_sml", c_obj_blk = "c_obj_blk", c_fak = "c_fak", c_rsm = "c_rsm", c_disp = "c_disp", c_uct = "c_uct", druh_char = "druh_char", druh_char_txt = "druh_char_txt", drd = "drd", drd_msk = "drd_msk", priz_char = "priz_char", priz_char_txt = "priz_char_txt", c_cerpani_rs = "c_cerpani_rs", c_cerpani_ru = "c_cerpani_ru", zdrojdat = "zdrojdat", c_navrh = "c_navrh",}
	const enum GRozSeznamAatFilterDtoFragments { ico = "*", ucs = "*", uus = "*", nks = "*", rok = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", c_sl = "*", c_ru = "*", c_14 = "*", c_mrz = "*", c_act = "*", c_vz = "*", c_sml = "*", c_vz_sml = "*", c_obj = "*", c_obj_sml = "*", c_obj_blk = "*", c_fak = "*", c_rsm = "*", c_disp = "*", c_uct = "*", druh_char = "*", druh_char_txt = "*", drd = "*", drd_msk = "*", priz_char = "*", priz_char_txt = "*", c_cerpani_rs = "*", c_cerpani_ru = "*", zdrojdat = "*", c_navrh = "*",}
	const enum GRozSeznamAatFilterDtoTypes { ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", rok = "GIntervalDto<number>", uea = "GIntervalDto<string>", ueb = "GIntervalDto<string>", uec = "GIntervalDto<string>", ued = "GIntervalDto<string>", uee = "GIntervalDto<string>", uef = "GIntervalDto<string>", ueg = "GIntervalDto<string>", ueh = "GIntervalDto<string>", uei = "GIntervalDto<string>", uej = "GIntervalDto<string>", uek = "GIntervalDto<string>", uel = "GIntervalDto<string>", uem = "GIntervalDto<string>", uen = "GIntervalDto<string>", te0 = "GIntervalDto<string>", te1 = "GIntervalDto<string>", te2 = "GIntervalDto<string>", te3 = "GIntervalDto<string>", te4 = "GIntervalDto<string>", te5 = "GIntervalDto<string>", te6 = "GIntervalDto<string>", te7 = "GIntervalDto<string>", te8 = "GIntervalDto<string>", te9 = "GIntervalDto<string>", c_sl = "GIntervalDto<JsonDecimal>", c_ru = "GIntervalDto<JsonDecimal>", c_14 = "GIntervalDto<JsonDecimal>", c_mrz = "GIntervalDto<JsonDecimal>", c_act = "GIntervalDto<JsonDecimal>", c_vz = "GIntervalDto<JsonDecimal>", c_sml = "GIntervalDto<JsonDecimal>", c_vz_sml = "GIntervalDto<JsonDecimal>", c_obj = "GIntervalDto<JsonDecimal>", c_obj_sml = "GIntervalDto<JsonDecimal>", c_obj_blk = "GIntervalDto<JsonDecimal>", c_fak = "GIntervalDto<JsonDecimal>", c_rsm = "GIntervalDto<JsonDecimal>", c_disp = "GIntervalDto<JsonDecimal>", c_uct = "GIntervalDto<JsonDecimal>", druh_char = "number", druh_char_txt = "string", drd = "number", drd_msk = "string", priz_char = "number", priz_char_txt = "string", c_cerpani_rs = "GIntervalDto<JsonDecimal>", c_cerpani_ru = "GIntervalDto<JsonDecimal>", zdrojdat = "string", c_navrh = "GIntervalDto<JsonDecimal>",}
	const enum GRozSeznamAatFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Ucr\GUcrListObdDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Seznam obdobi (mesci rok)*/
	interface GUcrListObdDto {
		/**Rok*/
		rok?: number|null;
		/**Mesic*/
		mesic?: number|null;
	}
	const enum GUcrListObdDtoNames { rok = "rok", mesic = "mesic",}
	const enum GUcrListObdDtoFragments { rok = "*", mesic = "*",}
	const enum GUcrListObdDtoTypes { rok = "number", mesic = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Ucr\GUctaixmDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:~*/
	interface GUctaixmDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:Seznam.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:Seznam.ec_dd*/
		ec_dd?: string|null;
		/**DBCOLUMN:Seznam.dic*/
		dic?: string|null;
		/**DBCOLUMN:Seznam.klic*/
		klic?: string|null;
		/**DBCOLUMN:Seznam.hodnota*/
		hodnota?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekocsko.klic_txt*/
		klic_txt?: string|null;
		/**DBCOLUMN:ekocsko.klic_typ*/
		klic_typ?: number|null;
		/**DBCOLUMN:ekocsko.klic_format*/
		klic_format?: string|null;
		/**DBCOLUMN:ekocsko.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekocsko.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekocsko.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ekocsko.k_xml*/
		k_xml?: string|null;
	}
	const enum GUctaixmDtoNames { ico = "ico", rok_dph = "rok_dph", mesic_dph = "mesic_dph", ec_dd = "ec_dd", dic = "dic", klic = "klic", hodnota = "hodnota", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", klic_txt = "klic_txt", klic_typ = "klic_typ", klic_format = "klic_format", aktivita = "aktivita", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GUctaixmDtoFragments { ico = "*", rok_dph = "*", mesic_dph = "*", ec_dd = "*", dic = "*", klic = "*", hodnota = "*", dat_zmena = "*", zmenu_prov = "*", klic_txt = "*", klic_typ = "*", klic_format = "*", aktivita = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GUctaixmDtoTypes { ico = "string", rok_dph = "number", mesic_dph = "number", ec_dd = "string", dic = "string", klic = "string", hodnota = "string", dat_zmena = "JsonDate", zmenu_prov = "string", klic_txt = "string", klic_typ = "number", klic_format = "string", aktivita = "number", k_v = "number", k_s = "string", k_xml = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Ucr\Uschovna\GUctUschovnaKategorieDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Dto pro nacteni kategorii ucetnich zapisu uschovny*/
	interface GUctUschovnaKategorieDto {
		/**kategorie*/
		ktg_typ?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Nazev kategorie*/
		ktg_typ_txt?: string|null;
		/**Subkategorie*/
		SubKategorie?: Gordic.Uct.Interface.GUctUschovnaSubKategorieDto[]|null;
		/**Identifikator hlavni kategorie*/
		readonly HlavniKategorie?: string|null;
	}
	const enum GUctUschovnaKategorieDtoNames { ktg_typ = "ktg_typ", aktivita = "aktivita", ktg_typ_txt = "ktg_typ_txt", SubKategorie = "SubKategorie", HlavniKategorie = "HlavniKategorie",}
	const enum GUctUschovnaKategorieDtoFragments { ktg_typ = "*", aktivita = "*", ktg_typ_txt = "*", SubKategorie = "*", HlavniKategorie = "*",}
	const enum GUctUschovnaKategorieDtoTypes { ktg_typ = "number", aktivita = "number", ktg_typ_txt = "string", SubKategorie = "Gordic.Uct.Interface.GUctUschovnaSubKategorieDto[]", HlavniKategorie = "string",}
	const enum GUctUschovnaKategorieDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\dto\Ucr\Uschovna\GUctUschovnaSubKategoreDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Dto pro nacteni subkategorii ucetnich zapisu uschovny*/
	interface GUctUschovnaSubKategorieDto {
		/**Pk klic*/
		ixs_typ?: string|null;
		/**Kategorie*/
		ktg_typ?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Nazev subkategorie*/
		nazev?: string|null;
		/**Identifikator hlavni kategorie*/
		readonly HlavniKategorie?: string|null;
	}
	const enum GUctUschovnaSubKategorieDtoNames { ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", aktivita = "aktivita", nazev = "nazev", HlavniKategorie = "HlavniKategorie",}
	const enum GUctUschovnaSubKategorieDtoFragments { ixs_typ = "*", ktg_typ = "*", aktivita = "*", nazev = "*", HlavniKategorie = "*",}
	const enum GUctUschovnaSubKategorieDtoTypes { ixs_typ = "string", ktg_typ = "number", aktivita = "number", nazev = "string", HlavniKategorie = "string",}
	const enum GUctUschovnaSubKategorieDtoTypeLengths { ixs_typ = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GEAkceFormulare.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typ akce spustene na formulari*/
	const enum GEAkceFormulare {
		/**Kontrola pred provedenim akce*/
		BeforeAction,
		/**Prvotni nacteni dokladu pri oteverni detailu*/
		Init,
		/**Nacteni dat dokladu*/
		Read,
		Podani,
		Evidence,
		Vazba,
		KontrolaPredSchvalenim,
		Schvaleni,
		Odschvaleni,
		SchvalovaciProces,
		Validace,
		Odvalidace,
		OdeslaniDoSP,
		Realizace,
		/**Oprava hlavicky dokladu*/
		Oprava,
		/**Zruseni opravy hlavicky*/
		Zrusit,
		Storno,
		Aktivace,
		Uzavreni,
		/**Ooeslani potvrzeni do EDS/SMVS*/
		Potvrzeni,
		/**Import zapisu z vybranych dokladu*/
		ImportZapisu,
		Predani,
		/**Prevzeti dokladu jinou funkci*/
		Prevzeti,
		/**Preevidence dokladu do jine knihy a pripadne na jinou funkci*/
		Preevidence,
		/**Prideleni dokladu jine osobe*/
		Prideleni,
		Tisk,
		/**Vraceni dokladu do WFL*/
		VraceniDoWfl,
		/**Hromadna kopie dokladu v obdobi provizoria*/
		HromadnaKopieProvizorium,
		/**Hromadne storno dokladu v obdobi provizoria*/
		HromadneStornoProvizorium,
		/**Novy*/
		PorizovacNovy,
		/**Ulozit*/
		PorizovacUlozit,
		/**Zrusit*/
		PorizovacZrusit,
		/**Opravit*/
		PorizovacOpravit,
		/**Odstranit*/
		PorizovacOdstranit,
		PorizovacPredkontace,
		PorizovacVyrovnat,
		HromadnaAkceKontrola,
		/**Uzavreni knihy*/
		UzavreniKnihy,
		/**Zruseni uzavreni knihy*/
		ZruseniUzavreniKnihy,
		/**Hromadne uzavreni knih*/
		HromadneUzavreniKnih,
		/**Uzavreni agendy*/
		UzavreniAgendy,
		/**Vazba mezi doklady ZR a VLZR*/
		VazbaDokladuZrVlzr,
		/**Vytvorim kopii hlavicky dokladu, stav evidovano*/
		KopieDokladu,
		/**Vytvorim kopii hlavicky a zapisu dokladu, stav navrh*/
		KopieDokladuZapisy,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GEFilterRozdpep.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Filtr na ROZ/UCT zapisy*/
	const enum FilterRozdpep {
		/**Autogenerated.*/
		rok,
		/**Autogenerated.*/
		lic,
		/**Autogenerated.*/
		ico,
		/**Autogenerated.*/
		ucs,
		/**Autogenerated.*/
		mesic,
		/**Autogenerated.*/
		ixp_den,
		/**Autogenerated.*/
		ac,
		/**Autogenerated.*/
		ixp,
		up_stav,
		radek_z,
		/**Aktivita*/
		aktivita,
		den,
		dat_zmena,
		zmenu_prov,
	}
	/**Filtr pro rozdpep*/
	const enum GFilterRozdpep {
		/**rok*/
		rok,
		/**lic*/
		lic,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**mesic*/
		mesic,
		/**ixp_den*/
		ixp_den,
		/**ac*/
		ac,
		/**radek_z*/
		radek_z,
		/**nks*/
		nks,
		/**por_cislo*/
		por_cislo,
		/**ixp*/
		ixp,
		/**drd*/
		drd,
		/**aktivita*/
		aktivita,
		/**den*/
		den,
		/**c0*/
		c0,
		/**c1*/
		c1,
		/**c0_new*/
		c0_new,
		/**c1_new*/
		c1_new,
		/**m0*/
		m0,
		/**m1*/
		m1,
		/**m0_new*/
		m0_new,
		/**m1_new*/
		m1_new,
		/**typ_ag*/
		typ_ag,
		/**stav_kch*/
		stav_kch,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**te0*/
		te0,
		/**te1*/
		te1,
		/**te2*/
		te2,
		/**te3*/
		te3,
		/**te4*/
		te4,
		/**te5*/
		te5,
		/**te6*/
		te6,
		/**te7*/
		te7,
		/**te8*/
		te8,
		/**te9*/
		te9,
		/**uea*/
		uea,
		/**ueb*/
		ueb,
		/**uec*/
		uec,
		/**ued*/
		ued,
		/**uee*/
		uee,
		/**uef*/
		uef,
		/**ueg*/
		ueg,
		/**ueh*/
		ueh,
		/**uei*/
		uei,
		/**uej*/
		uej,
		/**uek*/
		uek,
		/**uel*/
		uel,
		/**uem*/
		uem,
		/**uen*/
		uen,
		/**ixs_kon*/
		ixs_kon,
		/**up_stav*/
		up_stav,
		/**ac_ixe*/
		ac_ixe,
		/**popis*/
		popis,
		/**typ_roz*/
		typ_roz,
		/**zd*/
		zd,
		/**uus*/
		uus,
		/**ixp_srv*/
		ixp_srv,
		/**rok_srv*/
		rok_srv,
		/**priz_poriz*/
		priz_poriz,
		/**ixs_uka*/
		ixs_uka,
		/**xpf_pf*/
		xpf_pf,
		/**ixp_sml*/
		ixp_sml,
		/**priz_bal*/
		priz_bal,
		/**vyhr_roz*/
		vyhr_roz,
		/**ixs_fun_mng*/
		ixs_fun_mng,
		/**id_hdr_ris*/
		id_hdr_ris,
		/**radek_hdr*/
		radek_hdr,
		/**radek_hdr_ris*/
		radek_hdr_ris,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GEFiltryDokladu.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Filtry dokladu*/
	const enum GEFiltryDokladu {
        /**Doklady k validaci*/
		KValidaci//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Doklady k realizaci*/
		KRealizaci//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Doklady ke schvaleni*/
		KeSchvaleni//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Doklady, ktere cekaji na externi validaci*/
		OdeslanyKExterniValidaci//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Zamitnute doklady externi validaci*/
		ZamitnuteVExterniValidaci//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Vsechny doklady*/
		Vsechny//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Zobrazeni dokladu se stejnou a-hlavickou*/
		DleAHlavicky//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Doklady, ktere je potreba uzavrit*/
		NepripraveneKUzavreni//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**K odeslani k externi validaci*/
		KOdeslaniDoSP//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Doklady, ktere byly kladne vyrizeny v schvalovacim procesu a cekaji na schvaleni. (Schvalovaci proces predrazen pred schvaleni.)*/
		KOvereniPoSchvProcesu//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Schvalene v IISSP a nerealizovane*/
		SchvaleneVIISSPNerealizovane//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GEPredvyplneniDatumu.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Zpusob predvyplneni datumu v hlavicce pri evidenci*/
	const enum GEPredvyplneniDatumu {
		/**Aktualni datum pocitace*/
		AktualniDatum=2,
		/**Nejnizsi otevreny mesic*/
		NejnizsiOtevrenyMesic=1,
		/**Nejvyssi otevreny mesic*/
		NejvyssiOtevrenyMesic=3,
		/**Nepradvyplnovat, nebo pokud je pouze jeden*/
		NepredvyplnovatNeboPouzeJeden=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GEResultOperation.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vysledky operaci*/
	const enum GEResultOperation {
		/**The success*/
		Success=200,
		/**The information*/
		Info=203,
		/**The warning*/
		Warning=206,
		/**The error*/
		Error=400,
		/**Netestovano*/
		NotChecked=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GERezimPraceSIntHlavickami.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Rezim prace s internimi hlavickami*/
	const enum GERezimPraceSIntrHlavickami {
        /**je možno pracovat a pořizovat pouze s hlavičkami druhu INT (původní interní hlavičky). Stejná práce jako doposud bez hlaviček druhu INTS*/
		PracovatPouzeSInterniHlavickou=0,
        /**je možno pracovat a pořizovat pouze s hlavičkami nového druhu INTS*/
		PracovatPouzeInterniHlavičkouBezKontrol=1,
        /**je možno pracovat a pořizovat všechny interní hlavičky*/
		PracovatSeVsemiInternimiHlavickami=2,
        /**není možno pořizovat ani pracovat s interními hlavičkami*/
		BezPraceSInternimiHlavickami=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GERezimVyrovnavaniPripaduPap.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Rezim vyrovnavani pripadu pap zapisy*/
	const enum GERezimVyrovnavaniPripaduPap {
		/**vyrovnani za doklad*/
		ZaDoklad=0,
		/**vyrovnani za pripad*/
		ZaPripad=1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GERezimZatridovaniAnalytikPap.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Rezim zatridovani nezatridenych analytik*/
	const enum GERezimZatridovaniAnalytikPap {
		/**zatriduje se za doklad*/
		ZaDoklad=0,
		/**zatriduje se sumarne za pripad*/
		ZaPripad=1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GERezimZpracovaniPap.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Rezim zpracovani PAP*/
	const enum GERezimZpracovaniPap {
		/**Rocni*/
		Rocni=0,
		/**Ctvrtletni*/
		Ctvrtletni=1,
		/**Mesicni*/
		Mesicni=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GERozFiltrAHlavicekStav.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Filtry na a-hlavicku stav*/
	const enum GERozFiltrAHlavicekStav {
        /**Vsechny hlavicky*/
		VsechnyHlavicky//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Vsechny aktivni hlavicky*/
		AktivniHlavicky//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Neaktivni hlavicky (uzavrene)*/
		NeaktivniHlavicky//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Pouzite hlavicky*/
		PouziteHlavicky//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GETypObjektu.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typy objektů*/
	const enum GETypObjektu {
		/**typ dokumentu*/
		TypDokumentu=680,
		/**Kniha UCT*/
		KnihaUCT=434,
		/**Kniha roz*/
		KnihaROZ=436,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GETypOznaceniDokladu.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Typ oznaceni dokladu*/
	const enum GETypOznaceniDokladu {
        /**Precteny doklad*/
		Precteno=0,
        /**Neprecteny doklad*/
		Neprecteno=10,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GETypyChyb.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vycet pro typy navratovych chyb*/
	const enum GETypyChyb {
		/**Bez chyby*/
		none,
		/**Informacni hlaska*/
		information,
		/**Dotaz na pokracovani*/
		question,
		/**Varovani*/
		warning,
		/**Tvrda chyba*/
		error,
		/**Zobrazeni formulare*/
		showForm,
		/**Zobrazeni reportu*/
		showReport,
		/**Zobrazeni reportu a ukonceni chybou*/
		showReportAndError,
		/**Zobrazeni reportu a ukonceni otazkou*/
		showReportAndQuestion,
		/**Metoda byla ukoncena predcasne z duvodu nesplneni podminek pro provedeni*/
		notLaunched,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\GEZobrazeniStavu.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Enum pro vyber zobrazeni stavu ve statusbaru*/
	const enum GEZobrazeniStavu {
        /**Pouze stav*/
		PouzeStav=0,
        /**Stav a vsechny nezauctovane radky*/
		StavANezauctovaneVsechny=1,
        /**Stav a nezauctovane radky akt. dokladu*/
		StavANezauctovaneDokladu=2,
        /**Stav na dokladu*/
		StavDokladu=3,
        /**Vyscitane sumy za doklad*/
		StavSouctyZapisu=4,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Ucr\GETypRegistru.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typ registru P/Z*/
	const enum GETypRegistru {
		/**Pohledavky*/
		Pohledavky=20,
		/**Zavazky*/
		Zavazky=10,
		/**Podminene pohledavky*/
		PodminenePohledavky=60,
		/**Podminena zavazky*/
		PodminenaZavazky=50,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Ucr\GEUcrEnums.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Zobrazení viditelnosti úloh*/
	const enum GUcrRezimZobrazeniFinancovani {
		/**Pouze financování*/
		PouzeFinancovani=0,
		/**Financování se střednědobým výhledem (drd 9 a 69)*/
		FinancovaniSeStrednedobymVyhledem=1,
	}
	/**Zobrazení viditelnosti úloh*/
	const enum GUcrZobrazeniRisre {
		/**Invisible*/
		Ne=0,
		/**Readonly*/
		AnoProhlizeni=1,
		/**Write*/
		AnoEditace=2,
		/**SU*/
		AnoEditaceJenSU=3,
		/**SD*/
		AnoEditaceJenSD=4,
	}
	/**Režim provozu pro modul UCR*/
	const enum GUcrRisrePsOdes {
		Neodesilat=0,
		Offline=1,
		Online=2,
		Inbox=3,
	}
	/**Zobrazení viditelnosti úloh*/
	const enum GUcrZobrazeniVdu {
		/**Invisible*/
		Ne=0,
		/**Readonly*/
		AnoProhlizeni=1,
		/**Write*/
		AnoEditace=2,
	}
	/**Rozsah financovani*/
	const enum GERozsahFinancovani {
		/**Pouze druh dokladu Financování*/
		PouzeFinancovani=0,
		/**Všechny druhy dokladu*/
		VcetneServisnichDRD=1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Ucr\GEUcrPovoleniEditaceZapisu.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Povoleni editace zapisu*/
	const enum GEUcrPovoleniEditaceZapisu {
		/**Nepovoleno*/
		Nepovoleno=0,
		/**Povoleno menit popisi zapisu*/
		PouzePopis=1,
		/**Povoleno menit popis a účetní větu*/
		PopisAUcetniVeta=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Ucr\GEUschovnaFilter.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Filtry pro uschovnu*/
	const enum GEUschovnaFilter {
		/**Aktivita*/
		aktivita,
		/**KAtegorie*/
		ktg_typ,
		/**ssl typ*/
		ixs_typ,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Uct\GEAktivitaKnihy.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Aktivita knihy*/
	const enum GEAktivitaKnihy {
		/**Neobsazeno*/
		Neobsazeno=0,
		/**Otevreno*/
		Otevreno=100,
		/**Pripraveno k uzavreni*/
		Pripraveno_k_uzavreni=300,
		/**Uzavreno neodlito*/
		Uzavreno_neodlito=400,
		/**Uzavreno odlito*/
		Uzavreno_odlito=500,
		/**Zruseno*/
		Zruseno=900,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Uct\GEUCTAktivitaKnihy.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Aktivita knihy*/
	const enum GEUCTAktivitaKnihy {
		NEOBSAZENO=0,
		/**Otevreno*/
		OTEVRENO=100,
		/**Pripraveno k uzavreni*/
		PRIPRAVENO_K_UZAVRENI=300,
		/**Uzavreno neodlito*/
		UZAVRENO_NEODLITO=400,
		/**Uzevreno odlito*/
		UZAVRENO_ODLITO=500,
		/**Zruseno*/
		ZRUSENO=900,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Uct\GEUCTParametry.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typy omezeni na smlouvy dle stavu dokladu*/
	const enum OmezeniVazbyNaSmlouvuE {
		/**Vazba bez omezeni*/
		BezOmezeni=0,
		/**Moznost vazat na polozky smlouvy pouze pokud je vazba na prim. doklad*/
		PouzeSVazbouNaPrimDoklad=1,
		/**Pokud neexistuje vazba na prim. doklad, pak dotaz, zda pokracovat*/
		SDotazem=2,
	}
	/**Enum pro Režim editace částky*/
	const enum RezimEvidenceCastkyE {
		/**Částku není možno editovat po zaúčtování dokladu.*/
		standardni,
		/**Částku je možno editovat i po zaúčtování dokladu.*/
		volny,
	}
	/**Enum pro Přednastavení stavu zaúčtování v prim. agd.*/
	const enum PrednastaveniStavuZauctVPrimAgendeE {
		/**částečně zaúčtováno*/
		castecne,
		/**dle systému*/
		system,
		/**zaúčtováno*/
		zauctovano,
	}
	/**Varianty kontrol na nulove hodnoty castek pri predkontaci*/
	const enum GEPovoleniNulVPredkontace {
		/**Povolene nulove hodnoty MD a DAL*/
		Povoleno=0,
		/**Nepovoleny nulove hodnoty MD a DAL*/
		Nepovoleno=1,
		/**Povoleni dle uzivatelskeho nastaveni*/
		DleUzivNastaveni=2,
	}
	/**Varianty parametru Kontrola danovych uctu*/
	const enum GEKontrolaDanovychUctu {
		/**Nekontrolovat*/
		Ne=0,
		/**Kontrolovat vse*/
		Ano=1,
		/**Kontrolovat hodnoty dle vyctu*/
		DleVyctu=2,
		/**Kontrolovat hodnoty ale pouze s varovanim*/
		Varovani=3,
		/**Kontrolovat hodnoty dle vyctu ale pouze s varovanim*/
		VarovaniDleVyctu=4,
	}
	/**Varianty parametru Kontrola trid uctu*/
	const enum GEKontrolaTridyUctu {
		/**Nekontrolovat*/
		Ne=0,
		/**Kontrolovat , dovolit pokracovat*/
		KontrolovatPokracovat=1,
		/**Kontrolovat nedovolit pokracovat*/
		KontrolovatNepokracovat=2,
	}
	/**Rezim ucetni kontroly*/
	const enum GERezimUcetniKontroly {
		/**Účetní kontrola je nepovinna*/
		Povinna=0,
		/**Účetní kontrola je povinná*/
		Nepovinna=1,
		/**Účetní kontrola je povinná v případě, že není provedena finanční kontrola*/
		PovinnaPokudNeniFinancniKontrola=2,
	}
	/**Varianty parametru Kontrola castky hlavicky dokladu*/
	const enum GEKontrolaHlavickyDokladu {
		/**Nekontrolovat*/
		Nekontrolovat=0,
		/**Kontrolovat a pokracovat s dotazem*/
		InformativniKontrola=1,
		/**Kontrolovat a ukoncit*/
		BlokacniKontrola=2,
	}
	const enum GEAutomatickeOtevreniKontrolnihoHlaseni {
		/**Default - nebude se automaticky otevirat okno*/
		Ne=0,
		/**Otevre se okno podkladu Kontrolniho hlaseni v editaci*/
		Ano=1,
		/**Otevre se okno podkladu Kontrolniho hlaseni v editaci bez vyplnenych datumu DPH (pouze po prvotni evidenci)*/
		AnoBezDatumu=2,
	}
	const enum GEPostupneProuctovani {
		/**Ne, neni povoleno*/
		Ne=0,
		/**Ano bez FIK*/
		Ano=1,
		/**Ano s FIK*/
		AnoSFIK=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Uct\GEUctPristupnostSmlouvy.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Pristupnost smlouvy*/
	const enum GEPristupnostSmlouvy {
        /**Dosud nenastaveno*/
		Nepouzito,
        /**Neurceno, zda smlouva bude pristupna, nepristupna*/
		Neurceno,
        /**Policko smlouvy nepristupne*/
		Nepristupna,
        /**Policko pristupne, ale nepovinne*/
		PristupnaNepovinna,
        /**Pristupne a je povinnost vyplneni smlouvy*/
		PristupnaPovinna,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Uct\GEUctSeznamAkci.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Seznam akci*/
	const enum GEUctSeznamAkci {
		/**Schvelni*/
		SCHVALIT,
		/**Odchvaleni*/
		ODSCHVALIT,
		/**Zauctovani*/
		ZAUCTOVAT,
		/**Zauctovani hromadne*/
		ZAUCTOVAT_HROMADNE,
		/**Cteni hlavicky*/
		READ,
		/**cteni seznam*/
		LIST,
		/**Podani*/
		CREATE,
		/**Evidence*/
		UPDATE,
		/**Stornovani*/
		STORNO,
		/**Aktivace storna*/
		AKTIVACE_STORNO,
		/**Uzavrit doklad*/
		UZAVRIT,
		/**Uzavrit doklad*/
		UZAVRIT_HROMADNE,
		/**Editace*/
		EDITACE,
		/**Zruseni editace*/
		ZRUSIT_EDITACE,
		/**Kontrolni hlaseni*/
		KONTROLNI_HLASENI,
		/**Zobrazeni vazeb dokladu*/
		VAZBY_DOKLADU,
		/**Prevzit doklady*/
		PREVZIT,
		/**Prevzit doklady hromadne*/
		PREVZIT_HROMADNE,
		/**Preevidnece dokladu*/
		PREEVIDENCE,
		/**Preevidnece dokladu hromadne*/
		PREEVIDENCE_HROMADNE,
		/**Hromadna kontrola metadat*/
		KONTROLA_METADAT_HROMADNE,
		PRIDELIT,
		PRIDELIT_HROMADNE,
		PREDAT,
		PREDAT_HROMADNE,
		KOPIE_DOKLADU,
		KOPIE_DOKLADU_BEZ_POLOZEK,
		/**Akce polozek*/
		ZAPIS_ODSTRANIT,
		/**Ulozit zapis*/
		ZAPIS_ULOZIT,
		/**Novy zapis*/
		ZAPIS_NOVY,
		/**Oductovat zapis*/
		ZAPIS_ODUCTOVAT,
		/**Hromadny popis dokladu*/
		ZAPIS_HROMADNY_POPIS,
		/**Ucetni kontrola*/
		UCETNI_KONTROLA,
		/**Ucetni kontrola - hromadna*/
		UCETNI_KONTROLA_HROMADNA,
		/**Financni kontrola - hromadna*/
		FINANCNI_KONTROLA_HROMADNA,
		/**Financni kontrola*/
		FINANCNI_KONTROLA,
		/**Klicova slova*/
		KLICOVA_SLOVA,
		/**Vrati do WFL*/
		VRATIT_DO_WFL,
		/**oznacit presteni*/
		OZNACIT_PRECTENE,
		/**Oznacit neprecteni*/
		OZNACIT_NEPRECTENE,
		/**Zobrazeni vazeb dokladu na seznamu*/
		VAZBY_DOKLADU_SEZNAM,
		/**Uzaverka knih*/
		UZAVERKA_KNIH,
		/**Uzaverka aktualni knihy*/
		UZAVERKA_KNIHA,
		/**Uzaverka agendy*/
		UZAVERKA_AGENDA,
		/**Zpetne otevreni knihy*/
		UZAVERKA_ZRUSIT_UZAVERKU_KNIHY,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Uct\GEUCTTypKontroly.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Typ kontroly FIN / UCK*/
	const enum GEUCTTypKontroly {
        /**Financni kontrola*/
		FinancniKontrola,
        /**Ucetni kontrola*/
		UcetniKontrola,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Uct\GEUCTTypyUzaverek.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Typ uzaverek*/
	const enum GEUCTTypyUzaverek {
        /**Hromadne uzavreni knih vsech dostupnych knih uzivateli*/
		HROMADNE_UZAVRENI_KNIH//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Hromadne uzavreni knih vybranych*/
		HROMADNE_UZAVRENI_VYBRANYCH_KNIH//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Uzavreni aktualni knihy*/
		UZAVRENI_AKTUALNI_KNIHY//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Znovuotevreni aktualni knihy*/
		ZNOVUOTEVRENI_AKTUALNI_KNIHY//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Znovuotevreni vybranych knih*/
		HROMADNE_ZNOVUOTEVRENI_VYBRANYCH_KNIH//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**Uzavreni agendy*/
		UZAVRENI_AGENDY//Error generating initializer: System.NullReferenceException: Odkaz na objekt není nastaven na instanci objektu.

			//   v Gordic.Develop.Makara2019.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Enums\Uct\GEUCTTypyUzaverekKnih.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typ uzaverek*/
	const enum GEUCTTypyUzaverekKnih {
		/**Uzavreni vybranych knih*/
		UZAVRENI_KNIHY,
		/**Znovuotevreni uzavrenych knih*/
		ZNOVUOTEVRENI_KNIH,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Konsolidace\GUctakon.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GUctakonDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.id_kons*/
		id_kons?: string|null;
		/**DBCOLUMN:Seznam.ico_kons*/
		ico_kons?: string|null;
		/**DBCOLUMN:Seznam.c0_kons*/
		c0_kons?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_kons*/
		c1_kons?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0c1_kons*/
		c0c1_kons?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GUctakonDtoNames { ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", rok = "rok", mesic = "mesic", id_kons = "id_kons", ico_kons = "ico_kons", c0_kons = "c0_kons", c1_kons = "c1_kons", c0c1_kons = "c0c1_kons", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GUctakonDtoFragments { ico = "*", ucs = "*", uus = "*", nks = "*", rok = "*", mesic = "*", id_kons = "*", ico_kons = "*", c0_kons = "*", c1_kons = "*", c0c1_kons = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GUctakonDtoTypes { ico = "string", ucs = "string", uus = "string", nks = "string", rok = "number", mesic = "number", id_kons = "string", ico_kons = "string", c0_kons = "JsonDecimal", c1_kons = "JsonDecimal", c0c1_kons = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Risre\GRisreBanka.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GRisreBankaDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.denmes*/
		denmes?: number|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.ps_uct*/
		ps_uct?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0_uct*/
		c0_uct?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_uct*/
		c1_uct?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.as_uct*/
		as_uct?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ps_buc*/
		ps_buc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0_buc*/
		c0_buc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_buc*/
		c1_buc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.as_buc*/
		as_buc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.cis_pid*/
		cis_pid?: number|null;
		/**DBCOLUMN:Seznam.dat_nov_zus*/
		dat_nov_zus?: JsonDate|null;
		/**DBCOLUMN:Seznam.s_bvy*/
		s_bvy?: number|null;
	}
	const enum GRisreBankaDtoNames { ico = "ico", rok = "rok", mesic = "mesic", den = "den", denmes = "denmes", sk_vl = "sk_vl", bu_vl = "bu_vl", ps_uct = "ps_uct", c0_uct = "c0_uct", c1_uct = "c1_uct", as_uct = "as_uct", ps_buc = "ps_buc", c0_buc = "c0_buc", c1_buc = "c1_buc", as_buc = "as_buc", cis_pid = "cis_pid", dat_nov_zus = "dat_nov_zus", s_bvy = "s_bvy",}
	const enum GRisreBankaDtoFragments { ico = "*", rok = "*", mesic = "*", den = "*", denmes = "*", sk_vl = "*", bu_vl = "*", ps_uct = "*", c0_uct = "*", c1_uct = "*", as_uct = "*", ps_buc = "*", c0_buc = "*", c1_buc = "*", as_buc = "*", cis_pid = "*", dat_nov_zus = "*", s_bvy = "*",}
	const enum GRisreBankaDtoTypes { ico = "string", rok = "number", mesic = "number", den = "number", denmes = "number", sk_vl = "string", bu_vl = "string", ps_uct = "JsonDecimal", c0_uct = "JsonDecimal", c1_uct = "JsonDecimal", as_uct = "JsonDecimal", ps_buc = "JsonDecimal", c0_buc = "JsonDecimal", c1_buc = "JsonDecimal", as_buc = "JsonDecimal", cis_pid = "number", dat_nov_zus = "JsonDate", s_bvy = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Risre\GRisreIIssp.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GRisreIIsspDto {
		/**DBCOLUMN:Seznam.ixs_hpr*/
		ixs_hpr?: string|null;
		/**DBCOLUMN:Seznam.id_hdr*/
		id_hdr?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:Seznam.radek_hdr_ris*/
		radek_hdr_ris?: number|null;
		/**DBCOLUMN:Seznam.isp_fim*/
		isp_fim?: string|null;
		/**DBCOLUMN:Seznam.isp_zdr*/
		isp_zdr?: string|null;
		/**DBCOLUMN:Seznam.isp_par*/
		isp_par?: string|null;
		/**DBCOLUMN:Seznam.isp_pol*/
		isp_pol?: string|null;
		/**DBCOLUMN:Seznam.isp_eds*/
		isp_eds?: string|null;
		/**DBCOLUMN:Seznam.eds_dok*/
		eds_dok?: string|null;
		/**DBCOLUMN:Seznam.isp_pvs*/
		isp_pvs?: string|null;
		/**DBCOLUMN:Seznam.isp_ucl*/
		isp_ucl?: string|null;
		/**DBCOLUMN:Seznam.isp_zj*/
		isp_zj?: string|null;
		/**DBCOLUMN:Seznam.isp_uj*/
		isp_uj?: string|null;
		/**DBCOLUMN:Seznam.isp_uz*/
		isp_uz?: string|null;
		/**DBCOLUMN:Seznam.s_rezsp_isp*/
		s_rezsp_isp?: number|null;
		/**DBCOLUMN:Seznam.s_vyriz_rezsp*/
		s_vyriz_rezsp?: number|null;
		/**DBCOLUMN:Seznam.s_vyriz_rezsp_txt*/
		s_vyriz_rezsp_txt?: string|null;
		/**DBCOLUMN:Seznam.c_rsp_gin*/
		c_rsp_gin?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_cerp_xma*/
		c_cerp_xma?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_cerp_gin*/
		c_cerp_gin?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_rsp_isp*/
		c_rsp_isp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_cerp_isp*/
		c_cerp_isp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.denmes*/
		denmes?: number|null;
		/**DBCOLUMN:Seznam.dat_cerp_isp*/
		dat_cerp_isp?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_odes*/
		dat_odes?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vyriz*/
		dat_vyriz?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_rad_iissp*/
		dat_rad_iissp?: JsonDate|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**agneda*/
		typ_ag_txt?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
	}
	const enum GRisreIIsspDtoNames { ixs_hpr = "ixs_hpr", id_hdr = "id_hdr", rok = "rok", radek_hdr = "radek_hdr", id_hdr_ris = "id_hdr_ris", radek_hdr_ris = "radek_hdr_ris", isp_fim = "isp_fim", isp_zdr = "isp_zdr", isp_par = "isp_par", isp_pol = "isp_pol", isp_eds = "isp_eds", eds_dok = "eds_dok", isp_pvs = "isp_pvs", isp_ucl = "isp_ucl", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", s_rezsp_isp = "s_rezsp_isp", s_vyriz_rezsp = "s_vyriz_rezsp", s_vyriz_rezsp_txt = "s_vyriz_rezsp_txt", c_rsp_gin = "c_rsp_gin", c_cerp_xma = "c_cerp_xma", c_cerp_gin = "c_cerp_gin", c_rsp_isp = "c_rsp_isp", c_cerp_isp = "c_cerp_isp", denmes = "denmes", dat_cerp_isp = "dat_cerp_isp", dat_odes = "dat_odes", dat_vyriz = "dat_vyriz", dat_rad_iissp = "dat_rad_iissp", aktivita = "aktivita", dat_zmena = "dat_zmena", typ_ag = "typ_ag", typ_ag_txt = "typ_ag_txt", nks = "nks",}
	const enum GRisreIIsspDtoFragments { ixs_hpr = "*", id_hdr = "*", rok = "*", radek_hdr = "*", id_hdr_ris = "*", radek_hdr_ris = "*", isp_fim = "*", isp_zdr = "*", isp_par = "*", isp_pol = "*", isp_eds = "*", eds_dok = "*", isp_pvs = "*", isp_ucl = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*", s_rezsp_isp = "*", s_vyriz_rezsp = "*", s_vyriz_rezsp_txt = "*", c_rsp_gin = "*", c_cerp_xma = "*", c_cerp_gin = "*", c_rsp_isp = "*", c_cerp_isp = "*", denmes = "*", dat_cerp_isp = "*", dat_odes = "*", dat_vyriz = "*", dat_rad_iissp = "*", aktivita = "*", dat_zmena = "*", typ_ag = "*", typ_ag_txt = "*", nks = "*",}
	const enum GRisreIIsspDtoTypes { ixs_hpr = "string", id_hdr = "number", rok = "number", radek_hdr = "number", id_hdr_ris = "string", radek_hdr_ris = "number", isp_fim = "string", isp_zdr = "string", isp_par = "string", isp_pol = "string", isp_eds = "string", eds_dok = "string", isp_pvs = "string", isp_ucl = "string", isp_zj = "string", isp_uj = "string", isp_uz = "string", s_rezsp_isp = "number", s_vyriz_rezsp = "number", s_vyriz_rezsp_txt = "string", c_rsp_gin = "JsonDecimal", c_cerp_xma = "JsonDecimal", c_cerp_gin = "JsonDecimal", c_rsp_isp = "JsonDecimal", c_cerp_isp = "JsonDecimal", denmes = "number", dat_cerp_isp = "JsonDate", dat_odes = "JsonDate", dat_vyriz = "JsonDate", dat_rad_iissp = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", typ_ag = "number", typ_ag_txt = "string", nks = "string",}
	const enum GRisreIIsspDtoTypeLengths { ixs_hpr = 12, id_hdr_ris = 10, isp_fim = 16, isp_zdr = 10, isp_par = 16, isp_pol = 24, isp_eds = 15, eds_dok = 30, isp_pvs = 10, isp_ucl = 9, isp_zj = 3, isp_uj = 6, isp_uz = 7,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Risre\GUctasps.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GUctaspsDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.denmes*/
		denmes?: number|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.isp_fim*/
		isp_fim?: string|null;
		/**DBCOLUMN:Seznam.isp_zdr*/
		isp_zdr?: string|null;
		/**DBCOLUMN:Seznam.isp_par*/
		isp_par?: string|null;
		/**DBCOLUMN:Seznam.isp_pol*/
		isp_pol?: string|null;
		/**DBCOLUMN:Seznam.isp_eds*/
		isp_eds?: string|null;
		/**DBCOLUMN:Seznam.isp_pvs*/
		isp_pvs?: string|null;
		/**DBCOLUMN:Seznam.isp_ucl*/
		isp_ucl?: string|null;
		/**DBCOLUMN:Seznam.isp_zj*/
		isp_zj?: string|null;
		/**DBCOLUMN:Seznam.isp_uj*/
		isp_uj?: string|null;
		/**DBCOLUMN:Seznam.isp_uz*/
		isp_uz?: string|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.sc0*/
		sc0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.sc1*/
		sc1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kc0*/
		kc0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kc1*/
		kc1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.xfimuz*/
		xfimuz?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**Datum rezervace*/
		dat_rez?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.kc01*/
		kc01?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		c_r_sch?: JsonDecimal|null;
		c_r_zme?: JsonDecimal|null;
		c_r_kon?: JsonDecimal|null;
		dat_akt_stro?: JsonDate|null;
		c_psk_suma?: JsonDecimal|null;
		c_psk?: JsonDecimal|null;
		c_platba?: JsonDecimal|null;
		c_bvypis?: JsonDecimal|null;
		dat_akt_cero?: JsonDate|null;
		priz_detail?: number|null;
		id_volani_ssp?: number|null;
		radek_ik?: number|null;
		radek_pol?: number|null;
	}
	const enum GUctaspsDtoNames { ico = "ico", rok = "rok", mesic = "mesic", den = "den", denmes = "denmes", sk_vl = "sk_vl", bu_vl = "bu_vl", isp_fim = "isp_fim", isp_zdr = "isp_zdr", isp_par = "isp_par", isp_pol = "isp_pol", isp_eds = "isp_eds", isp_pvs = "isp_pvs", isp_ucl = "isp_ucl", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", popis = "popis", sc0 = "sc0", sc1 = "sc1", kc0 = "kc0", kc1 = "kc1", xfimuz = "xfimuz", dat_zmena = "dat_zmena", dat_rez = "dat_rez", zmenu_prov = "zmenu_prov", kc01 = "kc01", nks = "nks", ucs = "ucs", uus = "uus", c_r_sch = "c_r_sch", c_r_zme = "c_r_zme", c_r_kon = "c_r_kon", dat_akt_stro = "dat_akt_stro", c_psk_suma = "c_psk_suma", c_psk = "c_psk", c_platba = "c_platba", c_bvypis = "c_bvypis", dat_akt_cero = "dat_akt_cero", priz_detail = "priz_detail", id_volani_ssp = "id_volani_ssp", radek_ik = "radek_ik", radek_pol = "radek_pol",}
	const enum GUctaspsDtoFragments { ico = "*", rok = "*", mesic = "*", den = "*", denmes = "*", sk_vl = "*", bu_vl = "*", isp_fim = "*", isp_zdr = "*", isp_par = "*", isp_pol = "*", isp_eds = "*", isp_pvs = "*", isp_ucl = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*", id_hdr_ris = "*", radek_hdr = "*", popis = "*", sc0 = "*", sc1 = "*", kc0 = "*", kc1 = "*", xfimuz = "*", dat_zmena = "*", dat_rez = "*", zmenu_prov = "*", kc01 = "*", nks = "*", ucs = "*", uus = "*", c_r_sch = "*", c_r_zme = "*", c_r_kon = "*", dat_akt_stro = "*", c_psk_suma = "*", c_psk = "*", c_platba = "*", c_bvypis = "*", dat_akt_cero = "*", priz_detail = "*", id_volani_ssp = "*", radek_ik = "*", radek_pol = "*",}
	const enum GUctaspsDtoTypes { ico = "string", rok = "number", mesic = "number", den = "number", denmes = "number", sk_vl = "string", bu_vl = "string", isp_fim = "string", isp_zdr = "string", isp_par = "string", isp_pol = "string", isp_eds = "string", isp_pvs = "string", isp_ucl = "string", isp_zj = "string", isp_uj = "string", isp_uz = "string", id_hdr_ris = "string", radek_hdr = "number", popis = "string", sc0 = "JsonDecimal", sc1 = "JsonDecimal", kc0 = "JsonDecimal", kc1 = "JsonDecimal", xfimuz = "string", dat_zmena = "JsonDate", dat_rez = "JsonDate", zmenu_prov = "string", kc01 = "JsonDecimal", nks = "string", ucs = "string", uus = "string", c_r_sch = "JsonDecimal", c_r_zme = "JsonDecimal", c_r_kon = "JsonDecimal", dat_akt_stro = "JsonDate", c_psk_suma = "JsonDecimal", c_psk = "JsonDecimal", c_platba = "JsonDecimal", c_bvypis = "JsonDecimal", dat_akt_cero = "JsonDate", priz_detail = "number", id_volani_ssp = "number", radek_ik = "number", radek_pol = "number",}
	const enum GUctaspsDtoTypeLengths { ico = 10, zmenu_prov = 12, ucs = 10, uus = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\GFiltrRozpoctoveZapisy.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Filtry na uct doklady*/
	interface GFiltrRozpoctoveZapisy {
		/**Cfu set*/
		cfu2?: ObjectLiteral<GIntervalDto<string>>|null;
		/**Eko policka*/
		cfu?: Gordic.Uct.Interface.GEkoRozPolicko|null;
		/**Uctarna stredisko*/
		uus?: GIntervalDto<string>|null;
		/**Ucetni stredisko*/
		ucs?: GIntervalDto<string>|null;
		/**Nakladove stredisko*/
		nks?: GIntervalDto<string>|null;
		/**MD*/
		c0?: GIntervalDto<JsonDecimal>|null;
		/**Dal*/
		c1?: GIntervalDto<JsonDecimal>|null;
	}
	const enum GFiltrRozpoctoveZapisyNames { cfu2 = "cfu2", cfu = "cfu", uus = "uus", ucs = "ucs", nks = "nks", c0 = "c0", c1 = "c1",}
	const enum GFiltrRozpoctoveZapisyFragments { cfu2 = "*", cfu = "*", uus = "*", ucs = "*", nks = "*", c0 = "*", c1 = "*",}
	const enum GFiltrRozpoctoveZapisyTypes { cfu2 = "ObjectLiteral<GIntervalDto<string>>", cfu = "Gordic.Uct.Interface.GEkoRozPolicko", uus = "GIntervalDto<string>", ucs = "GIntervalDto<string>", nks = "GIntervalDto<string>", c0 = "GIntervalDto<JsonDecimal>", c1 = "GIntervalDto<JsonDecimal>",}
	const enum GFiltrRozpoctoveZapisyTypeLengths {}
	/**Eko policka*/
	interface GEkoRozPolicko {
		/**DBCOLUMN:Seznam.uea_0*/
		uea?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ueb_0*/
		ueb?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.uec_0*/
		uec?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.uec_1	DBCOLUMN:Seznam.ued_0*/
		ued?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uee_0*/
		uee?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uef_0*/
		uef?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.ueg_0*/
		ueg?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.ueh_0*/
		ueh?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uei_0*/
		uei?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uej_0*/
		uej?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uek*/
		uek?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uel_0*/
		uel?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uem_0*/
		uem?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uen_0*/
		uen?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te0_0*/
		te0?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te1_0*/
		te1?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te2_0*/
		te2?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te3_0*/
		te3?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te4_0*/
		te4?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te5_0*/
		te5?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te6_0*/
		te6?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te7_0*/
		te7?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te8_0*/
		te8?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te9_0*/
		te9?: GBaseFilter<string>|null;
	}
	const enum GEkoRozPolickoNames { uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GEkoRozPolickoFragments { uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*",}
	const enum GEkoRozPolickoTypes { uea = "GIntervalDto<string>", ueb = "GIntervalDto<string>", uec = "GIntervalDto<string>", ued = "GBaseFilter<string>", uee = "GBaseFilter<string>", uef = "GBaseFilter<string>", ueg = "GBaseFilter<string>", ueh = "GBaseFilter<string>", uei = "GBaseFilter<string>", uej = "GBaseFilter<string>", uek = "GBaseFilter<string>", uel = "GBaseFilter<string>", uem = "GBaseFilter<string>", uen = "GBaseFilter<string>", te0 = "GBaseFilter<string>", te1 = "GBaseFilter<string>", te2 = "GBaseFilter<string>", te3 = "GBaseFilter<string>", te4 = "GBaseFilter<string>", te5 = "GBaseFilter<string>", te6 = "GBaseFilter<string>", te7 = "GBaseFilter<string>", te8 = "GBaseFilter<string>", te9 = "GBaseFilter<string>",}
	const enum GEkoRozPolickoTypeLengths { uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\GRozVybranyZapisDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Rozsireni zapisu o otribty pro hromadne oprerace*/
	interface GRozVybranyZapisDto extends Gordic.Uct.Interface.GRozdpepDto {
		/**Vybrany radek*/
		wiz_check?: boolean|null;
		/**Text chyby*/
		wiz_txt_err?: string|null;
		/**Vysledek akce*/
		wiz_kind?: number|null;
	}
	const enum GRozVybranyZapisDtoNames { wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", check = "check", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ixp_den = "ixp_den", ac = "ac", radek_z = "radek_z", nks = "nks", por_cislo = "por_cislo", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", c0_new = "c0_new", c1_new = "c1_new", m0 = "m0", m1 = "m1", m0_new = "m0_new", m1_new = "m1_new", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", ixs_kon = "ixs_kon", up_stav = "up_stav", ac_ixe = "ac_ixe", popis = "popis", typ_roz = "typ_roz", zd = "zd", uus = "uus", ixp_srv = "ixp_srv", rok_srv = "rok_srv", priz_poriz = "priz_poriz", ixs_uka = "ixs_uka", xpf_pf = "xpf_pf", ixp_sml = "ixp_sml", priz_bal = "priz_bal", vyhr_roz = "vyhr_roz", ixs_fun_mng = "ixs_fun_mng", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", radek_hdr_ris = "radek_hdr_ris", pozadavek = "pozadavek", smlouva = "smlouva", priz_bal_inv = "priz_bal_inv",}
	const enum GRozVybranyZapisDtoFragments { wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", check = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ixp_den = "*", ac = "*", radek_z = "*", nks = "*", por_cislo = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c1 = "*", c0_new = "*", c1_new = "*", m0 = "*", m1 = "*", m0_new = "*", m1_new = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", ixs_kon = "*", up_stav = "*", ac_ixe = "*", popis = "*", typ_roz = "*", zd = "*", uus = "*", ixp_srv = "*", rok_srv = "*", priz_poriz = "*", ixs_uka = "*", xpf_pf = "*", ixp_sml = "*", priz_bal = "*", vyhr_roz = "*", ixs_fun_mng = "*", id_hdr_ris = "*", radek_hdr = "*", radek_hdr_ris = "*", pozadavek = "*", smlouva = "*", priz_bal_inv = "*",}
	const enum GRozVybranyZapisDtoTypes { wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", check = "boolean", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ixp_den = "string", ac = "string", radek_z = "number", nks = "string", por_cislo = "number", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", c0_new = "JsonDecimal", c1_new = "JsonDecimal", m0 = "JsonDecimal", m1 = "JsonDecimal", m0_new = "JsonDecimal", m1_new = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", ixs_kon = "string", up_stav = "number", ac_ixe = "string", popis = "string", typ_roz = "number", zd = "number", uus = "string", ixp_srv = "string", rok_srv = "number", priz_poriz = "number", ixs_uka = "string", xpf_pf = "string", ixp_sml = "string", priz_bal = "number", vyhr_roz = "number", ixs_fun_mng = "string", id_hdr_ris = "string", radek_hdr = "number", radek_hdr_ris = "number", pozadavek = "string", smlouva = "string", priz_bal_inv = "number",}
	const enum GRozVybranyZapisDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ixp_den = 12, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, ixs_kon = 12, ac_ixe = 20, popis = 254, uus = 10, ixp_srv = 12, ixs_uka = 12, xpf_pf = 63, ixp_sml = 12, ixs_fun_mng = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\AHlavicka\GRozAHlavickaBaseResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Predek akci A-hlavicky*/
	interface GRozAHlavickaBaseResponseDto {
		/**DTO s daty a-hlavicky*/
		AHlavicka?: Gordic.Uct.Interface.GRozsahlOutDto|null;
		/**Opravneni k akcim*/
		Permisions?: Gordic.Uct.Interface.GRozAHlavickaPermissionsDetail|null;
		/**Seznam dokladu priprazenych k dane a-hlavicke*/
		SeznamDokladu?: Gordic.Uct.Interface.GRozSeznamDokladuDto[]|null;
	}
	const enum GRozAHlavickaBaseResponseDtoNames { AHlavicka = "AHlavicka", Permisions = "Permisions", SeznamDokladu = "SeznamDokladu",}
	const enum GRozAHlavickaBaseResponseDtoFragments { AHlavicka = "*", Permisions = "*", SeznamDokladu = "*",}
	const enum GRozAHlavickaBaseResponseDtoTypes { AHlavicka = "Gordic.Uct.Interface.GRozsahlOutDto", Permisions = "Gordic.Uct.Interface.GRozAHlavickaPermissionsDetail", SeznamDokladu = "Gordic.Uct.Interface.GRozSeznamDokladuDto[]",}
	const enum GRozAHlavickaBaseResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\AHlavicka\GRozAHlavickaCreateRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro vstup akce Create a-hlavicky*/
	interface GRozAHlavickaCreateRequestDto {
        /**Dto s A-hlavickou*/
		AHlavicka?: Gordic.Uct.Interface.GRozsahlOutDto|null;
	}
	const enum GRozAHlavickaCreateRequestDtoNames { AHlavicka = "AHlavicka",}
	const enum GRozAHlavickaCreateRequestDtoFragments { AHlavicka = "*",}
	const enum GRozAHlavickaCreateRequestDtoTypes { AHlavicka = "Gordic.Uct.Interface.GRozsahlOutDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\AHlavicka\GRozAHlavickaListiRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Enum filtru dokladu*/
	const enum GERozFilterHlavicky {
		/**identifikator hlavicky*/
		ixs_ahl,
		/**Typ dokladu*/
		ixs_typ,
	}
	/**DTO pro vstup akce LIST*/
	interface GRozAhlavickaListiRequestDto {
		ixs_ahl?: GBaseFilter<string>|null;
		/**Filtr na stav hlavicky*/
		FiltrStav?: Gordic.Uct.Interface.GERozFiltrAHlavicekStav|null;
		/**Rok hlavicky*/
		Rok?: number|null;
		/**Droh hlavicky*/
		Druh?: number|null;
	}
	const enum GRozAhlavickaListiRequestDtoNames { ixs_ahl = "ixs_ahl", FiltrStav = "FiltrStav", Rok = "Rok", Druh = "Druh",}
	const enum GRozAhlavickaListiRequestDtoFragments { ixs_ahl = "*", FiltrStav = "*", Rok = "*", Druh = "*",}
	const enum GRozAhlavickaListiRequestDtoTypes { ixs_ahl = "GBaseFilter<string>", FiltrStav = "Gordic.Uct.Interface.GERozFiltrAHlavicekStav", Rok = "number", Druh = "number",}
	const enum GRozAhlavickaListiRequestDtoTypeLengths { ixs_ahl = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\AHlavicka\GRozAHlavickaPermissions.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Opravneni k akcim A-hlavicek*/
	interface GRozAHlavickaPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Povoleni nacteni dokladu*/
		CanRead: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni podani*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zobrazit detail*/
		CanShowDetail: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zobrazit navazane dokladu*/
		CanDocuments: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni vymazat*/
		CanDelete: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni otevrit*/
		CanOpen: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavrit*/
		CanClose: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRozAHlavickaPermissionsNames { CanRead = "CanRead", CanCreate = "CanCreate", CanShowDetail = "CanShowDetail", CanDocuments = "CanDocuments", CanDelete = "CanDelete", CanOpen = "CanOpen", CanClose = "CanClose",}
	const enum GRozAHlavickaPermissionsFragments { CanRead = "*", CanCreate = "*", CanShowDetail = "*", CanDocuments = "*", CanDelete = "*", CanOpen = "*", CanClose = "*",}
	const enum GRozAHlavickaPermissionsTypes { CanRead = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanShowDetail = "Gordic.General.ApplicationInterface.GPermission", CanDocuments = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanOpen = "Gordic.General.ApplicationInterface.GPermission", CanClose = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRozAHlavickaPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\AHlavicka\GRozAHlavickaPermissionsDetail.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Opravneni k akcim A-hlavicek*/
	interface GRozAHlavickaPermissionsDetail extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Povoleni nacteni dokladu*/
		CanRead: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni podani*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zobrazit navazane dokladu*/
		CanDocuments: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni vymazat*/
		CanDelete: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni otevrit*/
		CanOpen: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavrit*/
		CanClose: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavrit*/
		CanSave: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRozAHlavickaPermissionsDetailNames { CanRead = "CanRead", CanCreate = "CanCreate", CanDocuments = "CanDocuments", CanDelete = "CanDelete", CanOpen = "CanOpen", CanClose = "CanClose", CanSave = "CanSave",}
	const enum GRozAHlavickaPermissionsDetailFragments { CanRead = "*", CanCreate = "*", CanDocuments = "*", CanDelete = "*", CanOpen = "*", CanClose = "*", CanSave = "*",}
	const enum GRozAHlavickaPermissionsDetailTypes { CanRead = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanDocuments = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanOpen = "Gordic.General.ApplicationInterface.GPermission", CanClose = "Gordic.General.ApplicationInterface.GPermission", CanSave = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRozAHlavickaPermissionsDetailTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\AHlavicka\GRozAHlavickaPermissionsSeznam.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Opravneni k akcim A-hlavicek*/
	interface GRozAHlavickaPermissionsSeznam extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Povoleni nacteni dokladu*/
		CanRead: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni podani*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zobrazit detail*/
		CanShowDetail: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zobrazit navazane dokladu*/
		CanDocuments: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni vymazat*/
		CanDelete: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni otevrit*/
		CanOpen: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavrit*/
		CanClose: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRozAHlavickaPermissionsSeznamNames { CanRead = "CanRead", CanCreate = "CanCreate", CanShowDetail = "CanShowDetail", CanDocuments = "CanDocuments", CanDelete = "CanDelete", CanOpen = "CanOpen", CanClose = "CanClose",}
	const enum GRozAHlavickaPermissionsSeznamFragments { CanRead = "*", CanCreate = "*", CanShowDetail = "*", CanDocuments = "*", CanDelete = "*", CanOpen = "*", CanClose = "*",}
	const enum GRozAHlavickaPermissionsSeznamTypes { CanRead = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanShowDetail = "Gordic.General.ApplicationInterface.GPermission", CanDocuments = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", CanOpen = "Gordic.General.ApplicationInterface.GPermission", CanClose = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRozAHlavickaPermissionsSeznamTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\AHlavicka\GRozAHlavickaReadRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro vstup akce Read*/
	interface GRozAHlavickaReadRequestDto {
        /**ID hlavicky*/
		Identikator?: string|null;
	}
	const enum GRozAHlavickaReadRequestDtoNames { Identikator = "Identikator",}
	const enum GRozAHlavickaReadRequestDtoFragments { Identikator = "*",}
	const enum GRozAHlavickaReadRequestDtoTypes { Identikator = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\AHlavicka\GRozAHlavickaReadResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro akci Read A-hlavicky*/
	interface GRozAHlavickaReadResponseDto extends Gordic.Uct.Interface.GRozAHlavickaBaseResponseDto {
	}
	const enum GRozAHlavickaReadResponseDtoNames { AHlavicka = "AHlavicka",}
	const enum GRozAHlavickaReadResponseDtoFragments { AHlavicka = "*",}
	const enum GRozAHlavickaReadResponseDtoTypes { AHlavicka = "Gordic.Uct.Interface.GRozsahlOutDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Base\GRozDokladActionResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Predek DTO pro predani vysledku akce*/
	interface GRozDokladActionResponseDto {
		/**Vysledna hlaska*/
		ResultMessage?: string|null;
		/**Datum zmeny*/
		DatumZmeny?: JsonDate|null;
		/**Stav Dokladu textove*/
		StavTxt?: string|null;
		/**Stav Dokladu*/
		StavDokladu?: Gordic.Uct.Interface.CStavyDokladu.GEStavyDokladu|null;
		/**Sloupecek s_zau*/
		s_zau?: number|null;
		/**Sloupecek eko_akt*/
		eko_akt?: number|null;
		/**Atribut zmeny stavu*/
		StateChanged?: boolean|null;
		/**Rozpoctovy doklad v DTO*/
		Doklad?: Gordic.Uct.Interface.GRozDokladOutDto|null;
	}
	const enum GRozDokladActionResponseDtoNames { ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Doklad = "Doklad",}
	const enum GRozDokladActionResponseDtoFragments { ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Doklad = "*",}
	const enum GRozDokladActionResponseDtoTypes { ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Uct.Interface.CStavyDokladu.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Doklad = "Gordic.Uct.Interface.GRozDokladOutDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Base\GRozVybraneDokladyDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro praci hromadne operace nad seznamem dokladu*/
	interface GRozVybraneDokladyDto extends Gordic.Uct.Interface.GUctDokladActionBaseRequestDto {
        /**Vybrane doklady*/
		Seznam?: Gordic.Uct.Interface.GRozVybranyDokladDto[]|null;
	}
	const enum GRozVybraneDokladyDtoNames { Seznam = "Seznam", ixpDen = "ixpDen",}
	const enum GRozVybraneDokladyDtoFragments { Seznam = "*", ixpDen = "*",}
	const enum GRozVybraneDokladyDtoTypes { Seznam = "Gordic.Uct.Interface.GRozVybranyDokladDto[]", ixpDen = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Base\GRozVybranyDokladDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO s atributy pro vysledek  operace dokladem*/
	interface GRozVybranyDokladDto extends Gordic.Uct.Interface.GRozSeznamDokladuDto {
		/**Vybrany radek*/
		Selected?: boolean|null;
		/**Vysledek operace*/
		ResultOperation?: Gordic.Uct.Interface.GEResultOperation|null;
		/**Textovy vysledek operace*/
		ResultMsg?: string|null;
		/**Kod chyby*/
		ResultErrorID?: number|null;
		/**Vybrany radek*/
		wiz_check?: boolean|null;
		/**Text chyby*/
		wiz_txt_err?: string|null;
		/**Vysledek akce*/
		wiz_kind?: number|null;
	}
	const enum GRozVybranyDokladDtoNames { Selected = "Selected", ResultOperation = "ResultOperation", ResultMsg = "ResultMsg", ResultErrorID = "ResultErrorID", wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", priz_spis = "priz_spis", typ_spis = "typ_spis", s_fyz = "s_fyz", s_ele = "s_ele", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", s_orig = "s_orig", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", vlastnictvi = "vlastnictvi", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", s_zau_txt = "s_zau_txt", ixs_typ_txt = "ixs_typ_txt", ixs_fun_akt_txt = "ixs_fun_akt_txt", poc_epri = "poc_epri", uzo = "uzo", s_odes = "s_odes", preevidence = "preevidence", preevid = "preevid", novakniha = "novakniha", ixp_den_txt = "ixp_den_txt", ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun_akt = "ixs_fun_akt", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", ixs_uka = "ixs_uka", ixs_esu = "ixs_esu", ico_esu = "ico_esu", bu_ci = "bu_ci", sk_ci = "sk_ci", ks = "ks", vs = "vs", ss = "ss", ext_valid = "ext_valid", ixs_ahl = "ixs_ahl", cis_sabl_eds = "cis_sabl_eds", ixs_evp = "ixs_evp", ixs_evp_eo = "ixs_evp_eo", ixs_fun_mng = "ixs_fun_mng", dokl_status_iissp = "dokl_status_iissp", vysl_volani = "vysl_volani", stav_dokl_txt = "stav_dokl_txt", stav_storno_txt = "stav_storno_txt", stav_iissp_txt = "stav_iissp_txt", stav_epk_txt = "stav_epk_txt",}
	const enum GRozVybranyDokladDtoFragments { Selected = "*", ResultOperation = "*", ResultMsg = "*", ResultErrorID = "*", wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", priz_spis = "*", typ_spis = "*", s_fyz = "*", s_ele = "*", s_prij = "*", puvod = "*", s_sgn = "*", stav_pis = "*", priz_cj = "*", dat_vyriz_do = "*", dat_vyriz = "*", s_schval = "*", stav_dist = "*", ixs_fun = "*", s_orig = "*", ixp_spis_prir = "*", typ_ag = "*", typ_entity_ico = "*", vlastnictvi_doruceni_ico = "*", technicke_vlastnosti_ico = "*", stav_zpracovani_ico = "*", vlastnictvi_redistribuce_ico = "*", vlastnictvi = "vlastnictvi", pozice_spis_ico = "*", termin_ico = "*", doplnujici_informace_ico = "*", s_zau_txt = "*", ixs_typ_txt = "ixs_typ_txt", ixs_fun_akt_txt = "*", poc_epri = "*", uzo = "*", s_odes = "wflIconCalculator", preevidence = "*", preevid = "*", novakniha = "*", ixp_den_txt = "preevidence", ixp = "main", lic = "main", popis = "main", ico = "main", ucs = "main", nks = "main", ixp_den = "main", ac = "main", rok = "main", mesic = "main", den = "main", dat_prij_pod = "main", ixs_typ = "main", ktg_typ = "main", eko_akt = "main", dat_evid = "main", dat_zau = "main", s_zau = "main", s_sto = "main", ac_ixe = "main", stav_ac_ixe = "main", drd = "main", c = "main", dat_zmena = "main", zmenu_prov = "main", ixs_fun_akt = "main", bu_vl = "main", sk_vl = "main", priz_view = "main", ac_ag = "main", uus = "main", cis_real = "main", ixs_fun_vyriz = "main", ixs_uka = "main", ixs_esu = "main", ico_esu = "main", bu_ci = "main", sk_ci = "main", ks = "main", vs = "main", ss = "main", ext_valid = "main", ixs_ahl = "main", cis_sabl_eds = "main", ixs_evp = "main", ixs_evp_eo = "main", ixs_fun_mng = "main", dokl_status_iissp = "main", vysl_volani = "main", stav_dokl_txt = "main", stav_storno_txt = "main", stav_iissp_txt = "main", stav_epk_txt = "main",}
	const enum GRozVybranyDokladDtoTypes { Selected = "boolean", ResultOperation = "Gordic.Uct.Interface.GEResultOperation", ResultMsg = "string", ResultErrorID = "number", wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_schval = "number", stav_dist = "number", ixs_fun = "string", s_orig = "number", ixp_spis_prir = "string", typ_ag = "number", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", vlastnictvi = "number", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", s_zau_txt = "string", ixs_typ_txt = "string", ixs_fun_akt_txt = "string", poc_epri = "number", uzo = "string", s_odes = "number", preevidence = "number", preevid = "number", novakniha = "string", ixp_den_txt = "string", ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun_akt = "string", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", ixs_uka = "string", ixs_esu = "string", ico_esu = "string", bu_ci = "string", sk_ci = "string", ks = "string", vs = "string", ss = "string", ext_valid = "number", ixs_ahl = "string", cis_sabl_eds = "string", ixs_evp = "string", ixs_evp_eo = "string", ixs_fun_mng = "string", dokl_status_iissp = "number", vysl_volani = "number", stav_dokl_txt = "string", stav_storno_txt = "string", stav_iissp_txt = "string", stav_epk_txt = "string",}
	const enum GRozVybranyDokladDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Base\GUctSkupinaDokladuDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro seznam vybranych dokladu ze seznamu*/
	interface GRozSkupinaDokladuDto extends Gordic.Uct.Interface.GUctDokladActionBaseRequestDto {
        /**Vybrane doklady*/
		Seznam?: Gordic.Uct.Interface.GRozVybranyDokladDto[]|null;
	}
	const enum GRozSkupinaDokladuDtoNames { Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GRozSkupinaDokladuDtoFragments { Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GRozSkupinaDokladuDtoTypes { Seznam = "Gordic.Uct.Interface.GRozVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Doklad\GRozDokladPermissionsList.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Opravneni k akcim na seznamu dokladu*/
	interface GRozDokladPermissionsList extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Povoleni nacteni dokladu*/
		CanRead: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni podani*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zobrazit detail*/
		CanShowDetail: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavreni dokladu*/
		PovoleniUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni predani*/
		PovoleniPredat: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni prideleni*/
		PovoleniPridelit: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni prevzeti*/
		PovoleniPrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Preevidence*/
		PovoleniPreevidence: Gordic.General.ApplicationInterface.GPermission;
		/**Oznacit neprectene*/
		PovolenOznacitPrectene: Gordic.General.ApplicationInterface.GPermission;
		/**Oznacit prectene*/
		PovolenOznacitNeprectene: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni kontroly metadat*/
		PovoleniKontrolyMetadat: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk knihy rozpoctovych dokladu*/
		PovoleniTiskuKnihaRD: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk polozek rozpoctovych dokladu*/
		PovoleniTiskuPolozekRD: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk vsech rozpoctovych dokladu*/
		PovoleniTiskuVsechRD: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk vybranych rozpoctovych dokladu*/
		PovoleniTiskuVybranychRD: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk zaverecnych rozpoctovych opetreni*/
		PovoleniTiskuZaverRozpOpatreni: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk zaverecnych ocekavani*/
		PovoleniTiskuOcekavanaSkutecnost: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk vyporadani rozpoctu*/
		PovoleniTiskuVyporadaniRozpoctu: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk mimorozpoctovych prostredku*/
		PovoleniTiskuMimorozpoctoveProstredky: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk prevodu do RF*/
		PovoleniTiskuPrevodDoRF: Gordic.General.ApplicationInterface.GPermission;
		/**Tisk prevodu momorozpoctovych do RF*/
		PovoleniTiskuPrevodMRZDoRF: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRozDokladPermissionsListNames { CanRead = "CanRead", CanCreate = "CanCreate", CanShowDetail = "CanShowDetail", PovoleniUzavreni = "PovoleniUzavreni", PovoleniPredat = "PovoleniPredat", PovoleniPridelit = "PovoleniPridelit", PovoleniPrevzit = "PovoleniPrevzit", PovoleniPreevidence = "PovoleniPreevidence", PovolenOznacitPrectene = "PovolenOznacitPrectene", PovolenOznacitNeprectene = "PovolenOznacitNeprectene", PovoleniKontrolyMetadat = "PovoleniKontrolyMetadat", PovoleniTiskuKnihaRD = "PovoleniTiskuKnihaRD", PovoleniTiskuPolozekRD = "PovoleniTiskuPolozekRD", PovoleniTiskuVsechRD = "PovoleniTiskuVsechRD", PovoleniTiskuVybranychRD = "PovoleniTiskuVybranychRD", PovoleniTiskuZaverRozpOpatreni = "PovoleniTiskuZaverRozpOpatreni", PovoleniTiskuOcekavanaSkutecnost = "PovoleniTiskuOcekavanaSkutecnost", PovoleniTiskuVyporadaniRozpoctu = "PovoleniTiskuVyporadaniRozpoctu", PovoleniTiskuMimorozpoctoveProstredky = "PovoleniTiskuMimorozpoctoveProstredky", PovoleniTiskuPrevodDoRF = "PovoleniTiskuPrevodDoRF", PovoleniTiskuPrevodMRZDoRF = "PovoleniTiskuPrevodMRZDoRF",}
	const enum GRozDokladPermissionsListFragments { CanRead = "*", CanCreate = "*", CanShowDetail = "*", PovoleniUzavreni = "*", PovoleniPredat = "*", PovoleniPridelit = "*", PovoleniPrevzit = "*", PovoleniPreevidence = "*", PovolenOznacitPrectene = "*", PovolenOznacitNeprectene = "*", PovoleniKontrolyMetadat = "*", PovoleniTiskuKnihaRD = "*", PovoleniTiskuPolozekRD = "*", PovoleniTiskuVsechRD = "*", PovoleniTiskuVybranychRD = "*", PovoleniTiskuZaverRozpOpatreni = "*", PovoleniTiskuOcekavanaSkutecnost = "*", PovoleniTiskuVyporadaniRozpoctu = "*", PovoleniTiskuMimorozpoctoveProstredky = "*", PovoleniTiskuPrevodDoRF = "*", PovoleniTiskuPrevodMRZDoRF = "*",}
	const enum GRozDokladPermissionsListTypes { CanRead = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanShowDetail = "Gordic.General.ApplicationInterface.GPermission", PovoleniUzavreni = "Gordic.General.ApplicationInterface.GPermission", PovoleniPredat = "Gordic.General.ApplicationInterface.GPermission", PovoleniPridelit = "Gordic.General.ApplicationInterface.GPermission", PovoleniPrevzit = "Gordic.General.ApplicationInterface.GPermission", PovoleniPreevidence = "Gordic.General.ApplicationInterface.GPermission", PovolenOznacitPrectene = "Gordic.General.ApplicationInterface.GPermission", PovolenOznacitNeprectene = "Gordic.General.ApplicationInterface.GPermission", PovoleniKontrolyMetadat = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuKnihaRD = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuPolozekRD = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuVsechRD = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuVybranychRD = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuZaverRozpOpatreni = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuOcekavanaSkutecnost = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuVyporadaniRozpoctu = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuMimorozpoctoveProstredky = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuPrevodDoRF = "Gordic.General.ApplicationInterface.GPermission", PovoleniTiskuPrevodMRZDoRF = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRozDokladPermissionsListTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Doklad\GRozFiltrDokladu.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Enum filtru dokladu*/
	const enum GERozFilterDokladu {
		/**Pid dokladu*/
		ixp,
		/**Typ dokladu*/
		ixs_typ,
		/**Druh dokladu*/
		drd,
		/**Uctarna*/
		uus,
		/**ucetni stredisko*/
		ucs,
		/**Interni dokladu*/
		vlastni_doklady,
		/**Vlastnik*/
		ixs_fun_cil,
		/**Vlstnictvi s historii*/
		fun_hist,
		/**Realizator*/
		cis_real,
		/**kompetent*/
		ixs_fun_vyriz,
		/**agendove cislo*/
		ac_ag,
		/**evidencni cislo*/
		ac,
		/**cislo ucetniho dokladu*/
		ac_ixe,
		/**castka dokladu*/
		c,
		/**Rok*/
		rok,
		/**mesic*/
		mesic,
		/**den*/
		den,
		/**pocet poslednich zaznamu*/
		num_row,
		/**popis dokladu*/
		popis_doklad,
		/**Poznamka dokladu*/
		poznamka_ixp,
		/**klicova slova*/
		ks_db,
		/**stav dokladu*/
		s_zau,
		/**stav evidence*/
		stav_evi,
		/**zobrazeni dokladu*/
		priz_view,
		/**Priznak financni kontroly*/
		priz_fik,
		/**Popis radku*/
		popis_pep,
		/**text pro fulltext*/
		ft_text,
		/**Zdroj hledani*/
		ft_zdroj,
		/**Oblast hledeni*/
		ft_oblast,
		/**Hledat FT v souvisejicich dokladech*/
		ft_souvisejici,
		/**klic a-hlavicky*/
		ixs_ahl,
		/**identifikator knihy*/
		ixp_den,
		/**Ucetni zapisy*/
		zapisy,
		/**Nakladove stredisko*/
		nks,
		/**slovo ucetni vety*/
		uea,
		/**slovo ucetni vety*/
		ueb,
		/**slovo ucetni vety*/
		uec,
		/**slovo ucetni vety*/
		ued,
		/**slovo ucetni vety*/
		uee,
		/**slovo ucetni vety*/
		uef,
		/**slovo ucetni vety*/
		ueg,
		/**slovo ucetni vety*/
		ueh,
		/**slovo ucetni vety*/
		uei,
		/**slovo ucetni vety*/
		uej,
		/**slovo ucetni vety*/
		uek,
		/**slovo ucetni vety*/
		uel,
		/**slovo ucetni vety*/
		uem,
		/**slovo ucetni vety*/
		uen,
		/**slovo ucetni vety*/
		te0,
		/**slovo ucetni vety*/
		te1,
		/**slovo ucetni vety*/
		te2,
		/**slovo ucetni vety*/
		te3,
		/**slovo ucetni vety*/
		te4,
		/**slovo ucetni vety*/
		te5,
		/**slovo ucetni vety*/
		te6,
		/**slovo ucetni vety*/
		te7,
		/**slovo ucetni vety*/
		te8,
		/**slovo ucetni vety*/
		te9,
		/**MD*/
		c0,
		/**dal*/
		c1,
		/**rozšířující vlastnosti*/
		vlastnosti_r,
		/**popisné vlastnosti*/
		vlastnosti_s,
		/**spisu ve kterém je dokument vložen*/
		dokument_ixp_spis,
		/**se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu)*/
		dokument_priz_spis,
		/**aktuálního vlastníka (uzel) dokumentu*/
		dokument_ixs_su_akt,
		dokument_nazev,
		/**nebo agendové číslo nebo sp. značka spisu*/
		dokument_akt_znacka,
		dokument_stav_dist,
		/**(písemnosti)*/
		dokument_stav_pis,
		/**že k dokumentu existuje profil o doručení - záznam v tabulce wflspio*/
		dokument_s_prij,
		/**profil SSL pro tento dokument*/
		dokument_s_ssl,
		/**čas poslední změny dokumentu*/
		dokument_dat_zmena,
		/**autora poslední změny dokumentu*/
		dokument_zmenu_prov,
		/**existuje elektronická verze dokumentu*/
		dokument_s_ele,
		/**existuje fyzická verze dokumentu*/
		dokument_s_fyz,
		/**Barva*/
		dokument_uzo,
		/**plánu*/
		dokument_spis_pl,
		/**spisového znaku*/
		dokument_spis_znak,
		/**funkce agendového vlastníka*/
		dokument_ixs_fun_wfl,
		/**uzlu agendového vlastníka*/
		dokument_ixs_su_wfl,
		dokument_dat_vyriz,
		/**schválení dokumentu (úrovně wfl)*/
		dokument_s_schval,
		/**upravené oproti spisovému znaku*/
		dokument_skar_znak,
		/**oproti spisovému znaku*/
		dokument_skar_lhuta,
		/**události*/
		dokument_rok_spo_uda,
		/**skartace dokumentu*/
		dokument_rok_skartace,
		dokument_poc_listu,
		/**dokumentu*/
		dokument_poc_stran,
		/**fyzických - text box na detailu písemnosti*/
		dokument_poc_kop,
		/**dokumentu*/
		dokument_poc_priloh,
		/**příloh*/
		dokument_poc_l_priloh,
		/**pro zobrazení v seznamech*/
		dokument_cj,
		/**existuje profil čísla jednacího*/
		dokument_priz_cj,
		/**je dokument v balíku (>0)*/
		dokument_PrizVBaliku,
		/**balíku, ve kterém je dokument*/
		dokument_ixs_zup,
		/**skartační operace*/
		dokument_PrizPozSkar,
	}
	/**Filtry na uct doklady*/
	interface GRozFiltrDokladu {
		/**Varovani pri velkem mnozstvi dat (dotaz uzivateli)*/
		varovaniVelkehoMnoztviDat?: boolean|null;
		/**Oznaceni hranice, ktera rika, kde varovat uzivatele pred velkem mnozstvi dat*/
		hraniceVelkychDat?: number|null;
		/**Identifiaktor zpravy*/
		idMessage?: string|null;
		/**Nazev filtru v LK*/
		gfilterpanel_name?: string|null;
		ixp?: GBaseFilter<string>|null;
		/**Typ dokladu*/
		ixs_typ?: GBaseFilter<string>|null;
		/**Druh dokladu*/
		drd?: GBaseFilter<number>|null;
		/**Uctarna*/
		uus?: GBaseFilter<string>|null;
		/**Vlastni doklady*/
		vlastni_doklady?: GBaseFilter<number>|null;
		/**Vlastnik*/
		ixs_fun_cil?: GBaseFilter<string>|null;
		/**Vlastnictvi s historii*/
		fun_hist?: GBaseFilter<number>|null;
		/**realizator*/
		cis_real?: GBaseFilter<string>|null;
		/**Kompetent*/
		ixs_fun_vyriz?: GBaseFilter<string>|null;
		/**Agendove cislo*/
		ac_ag?: GIntervalDto<string>|null;
		/**Evidencni cislo*/
		ac?: GIntervalDto<string>|null;
		/**Cislo ucetniho dokladu*/
		ac_ixe?: GIntervalDto<string>|null;
		/**Castka hlavicky dokladu*/
		c?: GIntervalDto<JsonDecimal>|null;
		/**Rok dokladu*/
		rok?: GIntervalDto<number>|null;
		/**Mesic dokladu*/
		mesic?: GIntervalDto<number>|null;
		/**Den dokladu*/
		den?: GIntervalDto<number>|null;
		/**Nacteni poctu poslednich zaznamu*/
		num_row?: GBaseFilter<number>|null;
		/**Nacteni dle a-hlavicky*/
		ixs_ahl?: GBaseFilter<string>|null;
		/**Popis dokladu*/
		popis_doklad?: GBaseFilter<string>|null;
		/**Poznamka k dokladu*/
		poznamka_ixp?: GBaseFilter<string>|null;
		/**Klicova slova*/
		ks_db?: GBaseFilter<string>|null;
		/**Identifikator knihy*/
		ixp_den?: GBaseFilter<string>|null;
		/**Stav zauctovani*/
		s_zau?: GBaseFilter<number>|null;
		/**Stav evidence
		*     Default - evidovane
		*/
		stav_evi?: GBaseFilter<number>|null;
		/**filtr na zobrazene doklady (jiz byly zobrazeny)*/
		priz_view?: GBaseFilter<number>|null;
		/**Priznak financni kontroly*/
		priz_fik?: GBaseFilter<number>|null;
		/**Ucetni zapisy*/
		zapisy?: Gordic.Uct.Interface.GFiltrRozpoctoveZapisy[]|null;
		/**Popis polozky*/
		popis_pep?: GBaseFilter<string>|null;
		/**rozšiřující vlastnosti*/
		vlastnosti_r?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**popisné vlastnosti*/
		vlastnosti_s?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**spisu ve kterém je dokument vložen*/
		dokument_ixp_spis?: GBaseFilter<string>|null;
		/**se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu)*/
		dokument_priz_spis?: GBaseFilter<number>|null;
		/**aktuálního vlastníka (uzel) dokumentu*/
		dokument_ixs_su_akt?: GBaseFilter<string>|null;
		dokument_nazev?: GBaseFilter<string>|null;
		/**nebo agendové číslo nebo sp. značka spisu*/
		dokument_akt_znacka?: GBaseFilter<string>|null;
		dokument_stav_dist?: GBaseFilter<number>|null;
		/**(písemnosti)*/
		dokument_stav_pis?: GBaseFilter<number>|null;
		/**že k dokumentu existuje profil o doručení - záznam v tabulce wflspio*/
		dokument_s_prij?: GBaseFilter<number>|null;
		/**profil SSL pro tento dokument*/
		dokument_s_ssl?: GBaseFilter<number>|null;
		/**čas poslední změny dokumentu*/
		dokument_dat_zmena?: GIntervalDto<JsonDate>|null;
		/**autora poslední změny dokumentu*/
		dokument_zmenu_prov?: GBaseFilter<string>|null;
		/**existuje elektronická verze dokumentu*/
		dokument_s_ele?: GBaseFilter<number>|null;
		/**existuje fyzická verze dokumentu*/
		dokument_s_fyz?: GBaseFilter<number>|null;
		/**Barva*/
		dokument_uzo?: GBaseFilter<string>|null;
		/**plánu*/
		dokument_spis_pl?: GBaseFilter<string>|null;
		/**spisového znaku*/
		dokument_spis_znak?: GBaseFilter<string>|null;
		/**funkce agendového vlastníka*/
		dokument_ixs_fun_wfl?: GBaseFilter<string>|null;
		/**uzlu agendového vlastníka*/
		dokument_ixs_su_wfl?: GBaseFilter<string>|null;
		dokument_dat_vyriz?: GIntervalDto<JsonDate>|null;
		/**schválení dokumentu (úrovně wfl)*/
		dokument_s_schval?: GBaseFilter<number>|null;
		/**upravené oproti spisovému znaku*/
		dokument_skar_znak?: GBaseFilter<string>|null;
		/**oproti spisovému znaku*/
		dokument_skar_lhuta?: GBaseFilter<number>|null;
		/**události*/
		dokument_rok_spo_uda?: GBaseFilter<number>|null;
		/**skartace dokumentu*/
		dokument_rok_skartace?: GBaseFilter<number>|null;
		dokument_poc_listu?: GBaseFilter<string>|null;
		/**dokumentu*/
		dokument_poc_stran?: GBaseFilter<number>|null;
		/**fyzických - text box na detailu písemnosti*/
		dokument_poc_kop?: GBaseFilter<number>|null;
		/**dokumentu*/
		dokument_poc_priloh?: GBaseFilter<number>|null;
		/**příloh*/
		dokument_poc_l_priloh?: GBaseFilter<string>|null;
		/**pro zobrazení v seznamech*/
		dokument_cj?: GBaseFilter<string>|null;
		/**existuje profil čísla jednacího*/
		dokument_priz_cj?: GBaseFilter<number>|null;
		/**je dokument v balíku (>0)*/
		dokument_PrizVBaliku?: GBaseFilter<number>|null;
		/**balíku, ve kterém je dokument*/
		dokument_ixs_zup?: GBaseFilter<string>|null;
		/**skartační operace*/
		dokument_PrizPozSkar?: GBaseFilter<number>|null;
	}
	const enum GRozFiltrDokladuNames { varovaniVelkehoMnoztviDat = "varovaniVelkehoMnoztviDat", hraniceVelkychDat = "hraniceVelkychDat", idMessage = "idMessage", gfilterpanel_name = "gfilterpanel_name", ixp = "ixp", ixs_typ = "ixs_typ", drd = "drd", uus = "uus", vlastni_doklady = "vlastni_doklady", ixs_fun_cil = "ixs_fun_cil", fun_hist = "fun_hist", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", ac_ag = "ac_ag", ac = "ac", ac_ixe = "ac_ixe", c = "c", rok = "rok", mesic = "mesic", den = "den", num_row = "num_row", ixs_ahl = "ixs_ahl", popis_doklad = "popis_doklad", poznamka_ixp = "poznamka_ixp", ks_db = "ks_db", ixp_den = "ixp_den", s_zau = "s_zau", stav_evi = "stav_evi", priz_view = "priz_view", priz_fik = "priz_fik", zapisy = "zapisy", popis_pep = "popis_pep", vlastnosti_r = "vlastnosti_r", vlastnosti_s = "vlastnosti_s", dokument_ixp_spis = "dokument_ixp_spis", dokument_priz_spis = "dokument_priz_spis", dokument_ixs_su_akt = "dokument_ixs_su_akt", dokument_nazev = "dokument_nazev", dokument_akt_znacka = "dokument_akt_znacka", dokument_stav_dist = "dokument_stav_dist", dokument_stav_pis = "dokument_stav_pis", dokument_s_prij = "dokument_s_prij", dokument_s_ssl = "dokument_s_ssl", dokument_dat_zmena = "dokument_dat_zmena", dokument_zmenu_prov = "dokument_zmenu_prov", dokument_s_ele = "dokument_s_ele", dokument_s_fyz = "dokument_s_fyz", dokument_uzo = "dokument_uzo", dokument_spis_pl = "dokument_spis_pl", dokument_spis_znak = "dokument_spis_znak", dokument_ixs_fun_wfl = "dokument_ixs_fun_wfl", dokument_ixs_su_wfl = "dokument_ixs_su_wfl", dokument_dat_vyriz = "dokument_dat_vyriz", dokument_s_schval = "dokument_s_schval", dokument_skar_znak = "dokument_skar_znak", dokument_skar_lhuta = "dokument_skar_lhuta", dokument_rok_spo_uda = "dokument_rok_spo_uda", dokument_rok_skartace = "dokument_rok_skartace", dokument_poc_listu = "dokument_poc_listu", dokument_poc_stran = "dokument_poc_stran", dokument_poc_kop = "dokument_poc_kop", dokument_poc_priloh = "dokument_poc_priloh", dokument_poc_l_priloh = "dokument_poc_l_priloh", dokument_cj = "dokument_cj", dokument_priz_cj = "dokument_priz_cj", dokument_PrizVBaliku = "dokument_PrizVBaliku", dokument_ixs_zup = "dokument_ixs_zup", dokument_PrizPozSkar = "dokument_PrizPozSkar",}
	const enum GRozFiltrDokladuFragments { varovaniVelkehoMnoztviDat = "*", hraniceVelkychDat = "*", idMessage = "*", gfilterpanel_name = "*", ixp = "*", ixs_typ = "*", drd = "*", uus = "*", vlastni_doklady = "*", ixs_fun_cil = "*", fun_hist = "*", cis_real = "*", ixs_fun_vyriz = "*", ac_ag = "*", ac = "*", ac_ixe = "*", c = "*", rok = "*", mesic = "*", den = "*", num_row = "*", ixs_ahl = "*", popis_doklad = "*", poznamka_ixp = "*", ks_db = "*", ixp_den = "*", s_zau = "*", stav_evi = "*", priz_view = "*", priz_fik = "*", zapisy = "*", popis_pep = "*", vlastnosti_r = "*", vlastnosti_s = "*", dokument_ixp_spis = "*", dokument_priz_spis = "*", dokument_ixs_su_akt = "*", dokument_nazev = "*", dokument_akt_znacka = "*", dokument_stav_dist = "*", dokument_stav_pis = "*", dokument_s_prij = "*", dokument_s_ssl = "*", dokument_dat_zmena = "*", dokument_zmenu_prov = "*", dokument_s_ele = "*", dokument_s_fyz = "*", dokument_uzo = "*", dokument_spis_pl = "*", dokument_spis_znak = "*", dokument_ixs_fun_wfl = "*", dokument_ixs_su_wfl = "*", dokument_dat_vyriz = "*", dokument_s_schval = "*", dokument_skar_znak = "*", dokument_skar_lhuta = "*", dokument_rok_spo_uda = "*", dokument_rok_skartace = "*", dokument_poc_listu = "*", dokument_poc_stran = "*", dokument_poc_kop = "*", dokument_poc_priloh = "*", dokument_poc_l_priloh = "*", dokument_cj = "*", dokument_priz_cj = "*", dokument_PrizVBaliku = "*", dokument_ixs_zup = "*", dokument_PrizPozSkar = "*",}
	const enum GRozFiltrDokladuTypes { varovaniVelkehoMnoztviDat = "boolean", hraniceVelkychDat = "number", idMessage = "string", gfilterpanel_name = "string", ixp = "GBaseFilter<string>", ixs_typ = "GBaseFilter<string>", drd = "GBaseFilter<number>", uus = "GBaseFilter<string>", vlastni_doklady = "GBaseFilter<number>", ixs_fun_cil = "GBaseFilter<string>", fun_hist = "GBaseFilter<number>", cis_real = "GBaseFilter<string>", ixs_fun_vyriz = "GBaseFilter<string>", ac_ag = "GIntervalDto<string>", ac = "GIntervalDto<string>", ac_ixe = "GIntervalDto<string>", c = "GIntervalDto<JsonDecimal>", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", den = "GIntervalDto<number>", num_row = "GBaseFilter<number>", ixs_ahl = "GBaseFilter<string>", popis_doklad = "GBaseFilter<string>", poznamka_ixp = "GBaseFilter<string>", ks_db = "GBaseFilter<string>", ixp_den = "GBaseFilter<string>", s_zau = "GBaseFilter<number>", stav_evi = "GBaseFilter<number>", priz_view = "GBaseFilter<number>", priz_fik = "GBaseFilter<number>", zapisy = "Gordic.Uct.Interface.GFiltrRozpoctoveZapisy[]", popis_pep = "GBaseFilter<string>", vlastnosti_r = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", vlastnosti_s = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", dokument_ixp_spis = "GBaseFilter<string>", dokument_priz_spis = "GBaseFilter<number>", dokument_ixs_su_akt = "GBaseFilter<string>", dokument_nazev = "GBaseFilter<string>", dokument_akt_znacka = "GBaseFilter<string>", dokument_stav_dist = "GBaseFilter<number>", dokument_stav_pis = "GBaseFilter<number>", dokument_s_prij = "GBaseFilter<number>", dokument_s_ssl = "GBaseFilter<number>", dokument_dat_zmena = "GIntervalDto<JsonDate>", dokument_zmenu_prov = "GBaseFilter<string>", dokument_s_ele = "GBaseFilter<number>", dokument_s_fyz = "GBaseFilter<number>", dokument_uzo = "GBaseFilter<string>", dokument_spis_pl = "GBaseFilter<string>", dokument_spis_znak = "GBaseFilter<string>", dokument_ixs_fun_wfl = "GBaseFilter<string>", dokument_ixs_su_wfl = "GBaseFilter<string>", dokument_dat_vyriz = "GIntervalDto<JsonDate>", dokument_s_schval = "GBaseFilter<number>", dokument_skar_znak = "GBaseFilter<string>", dokument_skar_lhuta = "GBaseFilter<number>", dokument_rok_spo_uda = "GBaseFilter<number>", dokument_rok_skartace = "GBaseFilter<number>", dokument_poc_listu = "GBaseFilter<string>", dokument_poc_stran = "GBaseFilter<number>", dokument_poc_kop = "GBaseFilter<number>", dokument_poc_priloh = "GBaseFilter<number>", dokument_poc_l_priloh = "GBaseFilter<string>", dokument_cj = "GBaseFilter<string>", dokument_priz_cj = "GBaseFilter<number>", dokument_PrizVBaliku = "GBaseFilter<number>", dokument_ixs_zup = "GBaseFilter<string>", dokument_PrizPozSkar = "GBaseFilter<number>",}
	const enum GRozFiltrDokladuTypeLengths { ixp = 12, ixs_typ = 12, ixs_fun_cil = 12, cis_real = 6, ixs_fun_vyriz = 12, ac_ag = 20, ac = 20, poznamka_ixp = 254, popis_pep = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Doklad\GRozRozvrhResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro seznam moznych rozvrhu*/
	interface GRozRozvrhResponseDto {
		/**Rozvrh navazan na ucetni stredisko*/
		UseUcs?: boolean|null;
		/**Pouziva se specialni rozvrh pro vlzr*/
		UseVLZR?: boolean|null;
		/**Identifikator rozvrhu pro VLZR*/
		IxsVLZR?: string|null;
		/**Seznam rozvrhu*/
		Seznam?: Gordic.Uct.Interface.GRozRozvrhItemDto[]|null;
	}
	const enum GRozRozvrhResponseDtoNames { UseUcs = "UseUcs", UseVLZR = "UseVLZR", IxsVLZR = "IxsVLZR", Seznam = "Seznam",}
	const enum GRozRozvrhResponseDtoFragments { UseUcs = "*", UseVLZR = "*", IxsVLZR = "*", Seznam = "*",}
	const enum GRozRozvrhResponseDtoTypes { UseUcs = "boolean", UseVLZR = "boolean", IxsVLZR = "string", Seznam = "Gordic.Uct.Interface.GRozRozvrhItemDto[]",}
	const enum GRozRozvrhResponseDtoTypeLengths {}
	/**Polozka rozvrhu*/
	interface GRozRozvrhItemDto {
		/**Nakladove stredisko*/
		nks?: string|null;
		/**Ucetni stredisko*/
		ucs?: string|null;
		/**Identifikator rozvrhu*/
		Ixs?: string|null;
	}
	const enum GRozRozvrhItemDtoNames { nks = "nks", ucs = "ucs", Ixs = "Ixs",}
	const enum GRozRozvrhItemDtoFragments { nks = "*", ucs = "*", Ixs = "*",}
	const enum GRozRozvrhItemDtoTypes { nks = "string", ucs = "string", Ixs = "string",}
	const enum GRozRozvrhItemDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\IISSP\GRozIK.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Struktura IK v IISSP*/
	interface GRozIK extends Gordic.Uct.Interface.GRozdispDto {
		/**Pocet radku z kolika se sklada sumacni radek*/
		cnt?: number|null;
	}
	const enum GRozIKNames { cnt = "cnt", ixp = "ixp", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", isp_kap = "isp_kap", isp_fim = "isp_fim", isp_rpo = "isp_rpo", isp_par = "isp_par", isp_zdr = "isp_zdr", isp_eds = "isp_eds", isp_ucl = "isp_ucl", isp_pvs = "isp_pvs", c0 = "c0", c1 = "c1", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", isp_nd = "isp_nd", isp_rd = "isp_rd", popis = "popis", radek_isp = "radek_isp", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz",}
	const enum GRozIKFragments { cnt = "*", ixp = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ac = "*", radek_z = "*", isp_kap = "*", isp_fim = "*", isp_rpo = "*", isp_par = "*", isp_zdr = "*", isp_eds = "*", isp_ucl = "*", isp_pvs = "*", c0 = "*", c1 = "*", dat_zmena = "*", zmenu_prov = "*", isp_nd = "*", isp_rd = "*", popis = "*", radek_isp = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*",}
	const enum GRozIKTypes { cnt = "number", ixp = "string", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", isp_kap = "string", isp_fim = "string", isp_rpo = "string", isp_par = "string", isp_zdr = "string", isp_eds = "string", isp_ucl = "string", isp_pvs = "string", c0 = "JsonDecimal", c1 = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", isp_nd = "string", isp_rd = "string", popis = "string", radek_isp = "number", isp_zj = "string", isp_uj = "string", isp_uz = "string",}
	const enum GRozIKTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, ac = 20, isp_kap = 16, isp_fim = 16, isp_rpo = 24, isp_par = 16, isp_zdr = 10, isp_eds = 15, isp_ucl = 9, isp_pvs = 10, zmenu_prov = 12, isp_nd = 1, isp_rd = 4, popis = 254, isp_zj = 3, isp_uj = 6, isp_uz = 7,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Import\GRozDokladZapisImportReqDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro import dat do rozpoctovych zapisu- vstup*/
	interface GRozDokladZapisImportReqDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Vybrane zapisy pro import*/
		Seznam?: Gordic.Uct.Interface.GRozVybranyZapisDto[]|null;
	}
	const enum GRozDokladZapisImportReqDtoNames { Seznam = "Seznam", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GRozDokladZapisImportReqDtoFragments { Seznam = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GRozDokladZapisImportReqDtoTypes { Seznam = "Gordic.Uct.Interface.GRozVybranyZapisDto[]", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GRozDokladZapisImportReqDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Import\GRozDokladZapisImportRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro import dat do rozpoctovych zapisu- vstup*/
	interface GRozDokladZapisImportRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Vybrane zapisy pro import*/
		Seznam?: Gordic.Uct.Interface.GRozVybranyZapisDto[]|null;
	}
	const enum GRozDokladZapisImportRequestDtoNames { Seznam = "Seznam", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GRozDokladZapisImportRequestDtoFragments { Seznam = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GRozDokladZapisImportRequestDtoTypes { Seznam = "Gordic.Uct.Interface.GRozVybranyZapisDto[]", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GRozDokladZapisImportRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Import\GRoztResultZapisyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro vysledek akce -> seznam zapisu*/
	interface GRozResultZapisyDto {
		/**Vybrane zapisy*/
		Seznam?: Gordic.Uct.Interface.GRozVybranyZapisDto[]|null;
		/**Novy aktualni datum zmeny dokladu*/
		DatumZmenyDokladuNove?: JsonDate|null;
	}
	const enum GRozResultZapisyDtoNames { Seznam = "Seznam", DatumZmenyDokladuNove = "DatumZmenyDokladuNove",}
	const enum GRozResultZapisyDtoFragments { Seznam = "*", DatumZmenyDokladuNove = "*",}
	const enum GRozResultZapisyDtoTypes { Seznam = "Gordic.Uct.Interface.GRozVybranyZapisDto[]", DatumZmenyDokladuNove = "JsonDate",}
	const enum GRozResultZapisyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Knihy\GRozKnihaFiltr.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Enum filtru dokladu*/
	const enum GERozKnihaFiltr {
		/**Pid knihy*/
		ixp_den,
		/**Uctarna*/
		uus,
		/**Ucetnistredisko*/
		ucs,
		/**Subrada*/
		subrada,
		/**Rok*/
		rok,
		/**aktivita deniku*/
		aktivita,
		/**Nazev knihy*/
		nazev,
		/**Zkratka subrady*/
		zkratka,
		/**Aktivita subrady*/
		akt_subrady,
	}
	/**Filtry na uct doklady*/
	interface GRozKnihaFiltr {
		/**Pid knihy*/
		ixp_den?: GBaseFilter<string>|null;
		/**Rok dokladu*/
		rok?: GIntervalDto<number>|null;
		/**Aktivita knihy*/
		aktivita?: GIntervalDto<Gordic.Uct.Interface.GEAktivitaKnihy>|null;
		/**Uctarna*/
		uus?: GBaseFilter<string>|null;
		/**Ucetni stredisko*/
		ucs?: GIntervalDto<number>|null;
		/**Nazev knihy*/
		nazev?: GBaseFilter<string>|null;
		/**Aktivita subrady*/
		akt_subrady?: GIntervalDto<number>|null;
		/**Subrada*/
		subrada?: GBaseFilter<number>|null;
		/**Zkratka subrady*/
		zkratka?: GBaseFilter<string>|null;
	}
	const enum GRozKnihaFiltrNames { ixp_den = "ixp_den", rok = "rok", aktivita = "aktivita", uus = "uus", ucs = "ucs", nazev = "nazev", akt_subrady = "akt_subrady", subrada = "subrada", zkratka = "zkratka",}
	const enum GRozKnihaFiltrFragments { ixp_den = "rozsden", rok = "rozsden", aktivita = "rozsden", uus = "rozsden", ucs = "rozsden", nazev = "rozsden", akt_subrady = "rozrdac", subrada = "rozrdac", zkratka = "rozrdac",}
	const enum GRozKnihaFiltrTypes { ixp_den = "GBaseFilter<string>", rok = "GIntervalDto<number>", aktivita = "GIntervalDto<Gordic.Uct.Interface.GEAktivitaKnihy>", uus = "GBaseFilter<string>", ucs = "GIntervalDto<number>", nazev = "GBaseFilter<string>", akt_subrady = "GIntervalDto<number>", subrada = "GBaseFilter<number>", zkratka = "GBaseFilter<string>",}
	const enum GRozKnihaFiltrTypeLengths { ixp_den = 12, zkratka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Manager\GRozCileDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Cile*/
	interface GRozCileDto {
		/**DBCOLUMN:Cile.ixs_evp*/
		ixs_evp?: string|null;
		/**DBCOLUMN:Cile.uko*/
		uko?: string|null;
		/**DBCOLUMN:Cile.uroven*/
		uroven?: number|null;
		/**DBCOLUMN:Cile.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Cile.ixs_ref_mng*/
		ixs_ref_mng?: string|null;
		/**DBCOLUMN:Cile.ref_nazev_mng*/
		ref_nazev_mng?: string|null;
		/**DBCOLUMN:Cile.ixs_fun_mng*/
		ixs_fun_mng?: string|null;
		/**DBCOLUMN:Cile.fun_nazev_mng*/
		fun_nazev_mng?: string|null;
		/**DBCOLUMN:Cile.ixs_ref_eko*/
		ixs_ref_eko?: string|null;
		/**DBCOLUMN:Cile.ref_nazev_eko*/
		ref_nazev_eko?: string|null;
		/**DBCOLUMN:Cile.ixs_fun_eko*/
		ixs_fun_eko?: string|null;
		/**DBCOLUMN:Cile.fun_nazev_eko*/
		fun_nazev_eko?: string|null;
		/**DBCOLUMN:Cile.ixs_ref_vrk*/
		ixs_ref_vrk?: string|null;
		/**DBCOLUMN:Cile.ref_nazev_vrk*/
		ref_nazev_vrk?: string|null;
		/**DBCOLUMN:Cile.ixs_fun_vrk*/
		ixs_fun_vrk?: string|null;
		/**DBCOLUMN:Cile.fun_nazev_vrk*/
		fun_nazev_vrk?: string|null;
	}
	const enum GRozCileDtoNames { ixs_evp = "ixs_evp", uko = "uko", uroven = "uroven", nazev = "nazev", ixs_ref_mng = "ixs_ref_mng", ref_nazev_mng = "ref_nazev_mng", ixs_fun_mng = "ixs_fun_mng", fun_nazev_mng = "fun_nazev_mng", ixs_ref_eko = "ixs_ref_eko", ref_nazev_eko = "ref_nazev_eko", ixs_fun_eko = "ixs_fun_eko", fun_nazev_eko = "fun_nazev_eko", ixs_ref_vrk = "ixs_ref_vrk", ref_nazev_vrk = "ref_nazev_vrk", ixs_fun_vrk = "ixs_fun_vrk", fun_nazev_vrk = "fun_nazev_vrk",}
	const enum GRozCileDtoFragments { ixs_evp = "*", uko = "*", uroven = "*", nazev = "*", ixs_ref_mng = "*", ref_nazev_mng = "*", ixs_fun_mng = "*", fun_nazev_mng = "*", ixs_ref_eko = "*", ref_nazev_eko = "*", ixs_fun_eko = "*", fun_nazev_eko = "*", ixs_ref_vrk = "*", ref_nazev_vrk = "*", ixs_fun_vrk = "*", fun_nazev_vrk = "*",}
	const enum GRozCileDtoTypes { ixs_evp = "string", uko = "string", uroven = "number", nazev = "string", ixs_ref_mng = "string", ref_nazev_mng = "string", ixs_fun_mng = "string", fun_nazev_mng = "string", ixs_ref_eko = "string", ref_nazev_eko = "string", ixs_fun_eko = "string", fun_nazev_eko = "string", ixs_ref_vrk = "string", ref_nazev_vrk = "string", ixs_fun_vrk = "string", fun_nazev_vrk = "string",}
	const enum GRozCileDtoTypeLengths { ixs_evp = 12, uko = 254, nazev = 254, ixs_ref_mng = 12, ref_nazev_mng = 254, ixs_fun_mng = 12, fun_nazev_mng = 254, ixs_ref_eko = 12, ref_nazev_eko = 254, ixs_fun_eko = 12, fun_nazev_eko = 254, ixs_ref_vrk = 12, ref_nazev_vrk = 254, ixs_fun_vrk = 12, fun_nazev_vrk = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\OznacitDoklady\GRozOznacitDokladyDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro vybrane doklady k oznaceni k ne/precteni*/
	interface GRozOznacitDokladyDto {
        /**Oznaceni dokladu ne/precteni*/
		Oznacit?: Gordic.Uct.Interface.GETypOznaceniDokladu|null;
        /**Vybrane doklady*/
		Seznam?: Gordic.Uct.Interface.GRozVybranyDokladDto[]|null;
	}
	const enum GRozOznacitDokladyDtoNames { Oznacit = "Oznacit", Seznam = "Seznam",}
	const enum GRozOznacitDokladyDtoFragments { Oznacit = "*", Seznam = "*",}
	const enum GRozOznacitDokladyDtoTypes { Oznacit = "Gordic.Uct.Interface.GETypOznaceniDokladu", Seznam = "Gordic.Uct.Interface.GRozVybranyDokladDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Preevidence\GUctDokladPreevidovatHromadneRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO hromadne preevidovat UCT dokladu - vstup (pozadavek)*/
	interface GRozDokladPreevidovatHromadneRequestDto extends Gordic.Uct.Interface.GRozSkupinaDokladuDto {
		/**Nova kniha*/
		IxpDenNew?: string|null;
		/**Nova funkce*/
		IxsFunNew?: string|null;
		/**Referent*/
		IxsRefNew?: string|null;
		/**Referent*/
		Duvod?: string|null;
		/**Spisovy uzel*/
		IxsSu?: string|null;
		/**Identifikátor kompetenta*/
		IxsFunVyriz?: string|null;
		/**Identifikátor realizatora*/
		CisReal?: string|null;
	}
	const enum GRozDokladPreevidovatHromadneRequestDtoNames { IxpDenNew = "IxpDenNew", IxsFunNew = "IxsFunNew", IxsRefNew = "IxsRefNew", Duvod = "Duvod", IxsSu = "IxsSu", IxsFunVyriz = "IxsFunVyriz", CisReal = "CisReal", Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GRozDokladPreevidovatHromadneRequestDtoFragments { IxpDenNew = "*", IxsFunNew = "*", IxsRefNew = "*", Duvod = "*", IxsSu = "*", IxsFunVyriz = "*", CisReal = "*", Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GRozDokladPreevidovatHromadneRequestDtoTypes { IxpDenNew = "string", IxsFunNew = "string", IxsRefNew = "string", Duvod = "string", IxsSu = "string", IxsFunVyriz = "string", CisReal = "string", Seznam = "Gordic.Uct.Interface.GRozVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
	const enum GRozDokladPreevidovatHromadneRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\spolecne\GRozHromadnyRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO hromadne operace na dokladech dokladu - vstup (pozadavek)*/
	interface GRozHromadnyRequestDto extends Gordic.Uct.Interface.GRozSkupinaDokladuDto {
		/**Druh akce*/
		Akce?: Gordic.Uct.Interface.GEUctHromadneOperace|null;
		/**Nova kniha*/
		IxpDenNew?: string|null;
		/**Nova funkce*/
		IxsFunNew?: string|null;
		/**Referent*/
		IxsRefNew?: string|null;
		/**Referent*/
		Duvod?: string|null;
		/**Spisovy uzel*/
		IxsSu?: string|null;
		/**Identifikátor kompetenta*/
		IxsFunVyriz?: string|null;
		/**Identifikátor realizatora*/
		CisReal?: string|null;
	}
	const enum GRozHromadnyRequestDtoNames { Akce = "Akce", IxpDenNew = "IxpDenNew", IxsFunNew = "IxsFunNew", IxsRefNew = "IxsRefNew", Duvod = "Duvod", IxsSu = "IxsSu", IxsFunVyriz = "IxsFunVyriz", CisReal = "CisReal", Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GRozHromadnyRequestDtoFragments { Akce = "*", IxpDenNew = "*", IxsFunNew = "*", IxsRefNew = "*", Duvod = "*", IxsSu = "*", IxsFunVyriz = "*", CisReal = "*", Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GRozHromadnyRequestDtoTypes { Akce = "Gordic.Uct.Interface.GEUctHromadneOperace", IxpDenNew = "string", IxsFunNew = "string", IxsRefNew = "string", Duvod = "string", IxsSu = "string", IxsFunVyriz = "string", CisReal = "string", Seznam = "Gordic.Uct.Interface.GRozVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
	const enum GRozHromadnyRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\StavyAat\GRozSeznamAatSumCountDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Součtová sekce pro seznam financování (AAT)*/
	interface GRozSeznamAatSumCountDto {
		/**počet záznamů*/
		count?: number|null;
		/**rozpocet schavelny*/
		sum_sl?: JsonDecimal|null;
		/**rozpocet upraveny 2+3+7+8*/
		sum_ru?: JsonDecimal|null;
		/**Rozpočet vázaný*/
		sum_14?: JsonDecimal|null;
		/**mimorozpoctove zdroje 23+25*/
		sum_mrz?: JsonDecimal|null;
		/**aktualni zdroje*/
		sum_act?: JsonDecimal|null;
		/**Blokováno ROZ*/
		sum_vz?: JsonDecimal|null;
		/**nasmlouvano ROZ*/
		sum_sml?: JsonDecimal|null;
		/**nasmlouvano BLK*/
		sum_vz_sml?: JsonDecimal|null;
		/**objednano ROZ*/
		sum_obj?: JsonDecimal|null;
		/**objednano SML*/
		sum_obj_sml?: JsonDecimal|null;
		/**objednano BLK*/
		sum_obj_blk?: JsonDecimal|null;
		/**rezervovano ROZ*/
		sum_fak?: JsonDecimal|null;
		/**rezervovano SML*/
		sum_rsm?: JsonDecimal|null;
		/**Disponibilní zdroje*/
		sum_disp?: JsonDecimal|null;
		/**cerpano*/
		sum_uct?: JsonDecimal|null;
		/**Cerpani RS v procentech*/
		sum_cerpani_rs?: JsonDecimal|null;
		/**Cerpani RU v procentech*/
		sum_cerpani_ru?: JsonDecimal|null;
		/**Nacrh rozpoctu*/
		sum_navrh_rs?: JsonDecimal|null;
		/**drd*/
		drd?: number|null;
	}
	const enum GRozSeznamAatSumCountDtoNames { count = "count", sum_sl = "sum_sl", sum_ru = "sum_ru", sum_14 = "sum_14", sum_mrz = "sum_mrz", sum_act = "sum_act", sum_vz = "sum_vz", sum_sml = "sum_sml", sum_vz_sml = "sum_vz_sml", sum_obj = "sum_obj", sum_obj_sml = "sum_obj_sml", sum_obj_blk = "sum_obj_blk", sum_fak = "sum_fak", sum_rsm = "sum_rsm", sum_disp = "sum_disp", sum_uct = "sum_uct", sum_cerpani_rs = "sum_cerpani_rs", sum_cerpani_ru = "sum_cerpani_ru", sum_navrh_rs = "sum_navrh_rs", drd = "drd",}
	const enum GRozSeznamAatSumCountDtoFragments { count = "*", sum_sl = "*", sum_ru = "*", sum_14 = "*", sum_mrz = "*", sum_act = "*", sum_vz = "*", sum_sml = "*", sum_vz_sml = "*", sum_obj = "*", sum_obj_sml = "*", sum_obj_blk = "*", sum_fak = "*", sum_rsm = "*", sum_disp = "*", sum_uct = "*", sum_cerpani_rs = "*", sum_cerpani_ru = "*", sum_navrh_rs = "*", drd = "*",}
	const enum GRozSeznamAatSumCountDtoTypes { count = "number", sum_sl = "JsonDecimal", sum_ru = "JsonDecimal", sum_14 = "JsonDecimal", sum_mrz = "JsonDecimal", sum_act = "JsonDecimal", sum_vz = "JsonDecimal", sum_sml = "JsonDecimal", sum_vz_sml = "JsonDecimal", sum_obj = "JsonDecimal", sum_obj_sml = "JsonDecimal", sum_obj_blk = "JsonDecimal", sum_fak = "JsonDecimal", sum_rsm = "JsonDecimal", sum_disp = "JsonDecimal", sum_uct = "JsonDecimal", sum_cerpani_rs = "JsonDecimal", sum_cerpani_ru = "JsonDecimal", sum_navrh_rs = "JsonDecimal", drd = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Dto\Ukazatele\GRozVysledekUkazateluResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO s vysledky kontrolu na ukazatele*/
	interface GRozVysledekUkazateluResponseDto extends Gordic.Uct.Interface.GRozDokladActionResponseDto {
		/**Pid dokladu*/
		ResultOperation?: string|null;
		/**Seznam vysledku ukazatelu*/
		Seznam?: Gordic.Uct.Interface.GRozdkzuVysledekDto[]|null;
	}
	const enum GRozVysledekUkazateluResponseDtoNames { ResultOperation = "ResultOperation", Seznam = "Seznam", ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Doklad = "Doklad",}
	const enum GRozVysledekUkazateluResponseDtoFragments { ResultOperation = "*", Seznam = "*", ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Doklad = "*",}
	const enum GRozVysledekUkazateluResponseDtoTypes { ResultOperation = "string", Seznam = "Gordic.Uct.Interface.GRozdkzuVysledekDto[]", ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Uct.Interface.CStavyDokladu.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Doklad = "Gordic.Uct.Interface.GRozDokladOutDto",}
	const enum GRozVysledekUkazateluResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozDoklad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani ISL pro praci nad dokladem
	* @domain Rozpocet
	*/
	interface RozDoklad {
		/**Metoda pro nacteni detailu dokladu*/
		read(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceReadRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceReadRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceReadResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Podani dokladu*/
		create(rq?:Gordic.Uct.Interface.GRozDokladPodaniInDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GRozDokladPodaniInDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GRozDokladPodaniInDto>,GServiceSaveResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Evidence dokladu*/
		update(rq?:Gordic.Uct.Interface.GRozDokladHeaderInDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GRozDokladHeaderInDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GRozDokladHeaderInDto>,GServiceSaveResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Oprava hlavicky dokladu*/
		opravaHlavicky(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Schvaleni dokladu*/
		schvaleniDokladu(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Odschvaleni dokladu*/
		odschvaleniDokladu(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Validace dokladu*/
		validaceDokladu(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Odvalidace dokladu*/
		odvalidaceDokladu(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Realizace dokladu*/
		realizaceDokladu(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Storno dokladu*/
		stornoDokladu(rq?:Gordic.Uct.Interface.GRozDokladRedistribuceInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Odstornovani dokladu*/
		odstornovaniDokladu(rq?:Gordic.Uct.Interface.GRozDokladRedistribuceInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Uzavreni dokladu*/
		uzavreniDokladu(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Vraceni dokladu do WFL*/
		vraceniDoWfl(rq?:Gordic.Uct.Interface.GRozDokladRedistribuceInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>,GServiceActionResponse<Gordic.Uct.Interface.GPidDto>>;
		/**Zalozeni noveho radku pro TK*/
		novyRadek(rq?:CallParams<{doklad:Gordic.Uct.Interface.GRozDokladInDto}>): _Task<{doklad:Gordic.Uct.Interface.GRozDokladInDto},Gordic.Uct.Interface.GRozdpepDto>;
		/**Prevzeti dokladu*/
		prevzetiDokladu(rq?:Gordic.Uct.Interface.GRozDokladRedistribuceInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>,GServiceActionResponse<Gordic.Uct.Interface.GPidDto>>;
		/**Preevidence dokladu*/
		preevidenceDokladu(rq?:Gordic.Uct.Interface.GRozDokladRedistribuceInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>,GServiceActionResponse<Gordic.Uct.Interface.GPidDto>>;
		/**Predani dokladu*/
		predaniDokladu(rq?:Gordic.Uct.Interface.GRozDokladRedistribuceInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>,GServiceActionResponse<Gordic.Uct.Interface.GPidDto>>;
		/**Prideleni dokladu*/
		prideleniDokladu(rq?:Gordic.Uct.Interface.GRozDokladRedistribuceInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladRedistribuceInDto>,GServiceActionResponse<Gordic.Uct.Interface.GPidDto>>;
		/**Odeslani dokladu do statni pokladny*/
		odeslaniDokladuDoIissp(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GPidDto>>;
		/**Zjisteni stavu dokladu ve statni pokladne*/
		zjisteniStavuDokladuIissp(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GPidDto>>;
		/**Nasteni pocto moznych dokladu*/
		count(rq?:Gordic.Uct.Interface.GRozFiltrDokladu|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Nacteni seznam dokladu*/
		list(rq?:Gordic.Uct.Interface.GRozFiltrDokladu|CallParams<GServiceListRequestWithOrder<Gordic.Uct.Interface.GERozFilterDokladu>>): _Task<GServiceListRequestWithOrder<Gordic.Uct.Interface.GERozFilterDokladu>,GServiceListResponseWithMeta<Gordic.Uct.Interface.GRozSeznamDokladuDto, Gordic.Uct.Interface.GRozDokladPermissionsList>>;
		/**Nacteni dokladu pro zobrazeni v hromadne akci*/
		list(rq?:CallParams<{ixps:string[]}>): _Task<{ixps:string[]},Gordic.Uct.Interface.GRozHromadnaAkceDto[]>;
		/**Hromadna operace: Nastavi priznak vstupnim dokladum ne/prectene*/
		hromadneOznacit(rq?:Gordic.Uct.Interface.GRozOznacitDokladyDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GRozOznacitDokladyDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GRozOznacitDokladyDto>,GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Kontrola zaslanych dokladu, zda mohou byt uzavreny*/
		validovatProUzavreni(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozSkupinaDokladuDto}>): _Task<{rq:Gordic.Uct.Interface.GRozSkupinaDokladuDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Hromadne uzavreni dokladu*/
		hromadneUzavrit(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozSkupinaDokladuDto}>): _Task<{rq:Gordic.Uct.Interface.GRozSkupinaDokladuDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Kontrola zaslanych dokladu, zda mohou byt preevidovany*/
		hromadneOperaceValidace(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Hromadne akce*/
		hromadneOperace(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Kontrola zaslanych dokladu, zda mohou byt preevidovany*/
		preevidovatValidace(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Hromadne preevidovat vybrane doklady*/
		preevidovatHromadne(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Hromadne predat vybrane doklady*/
		predatHromadne(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Hromadne pridelit vybrane doklady*/
		pridelitHromadne(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Hromadna preevidence dokladu*/
		preevidenceHromadna(rq?:CallParams<{seznamDokladu:Gordic.Uct.Interface.GRozDokladRedistribuceInDto[],newTransaction:boolean}>): _Task<{seznamDokladu:Gordic.Uct.Interface.GRozDokladRedistribuceInDto[],newTransaction:boolean},GServiceListResponse<Gordic.Uct.Interface.GRozVysledekHromadneAkceDto>>;
		/**Hromadne prevzeti vybrane doklady*/
		prevzitHromadne(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GRozHromadnyRequestDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Kontrola zaslanych dokladu, zda mohou byt prevzety*/
		kontrolaDokladuProPrevzeti(rq?:CallParams<{request:Gordic.Uct.Interface.GRozSkupinaDokladuDto}>): _Task<{request:Gordic.Uct.Interface.GRozSkupinaDokladuDto},GServiceListResponse<Gordic.Uct.Interface.GRozVybranyDokladDto>>;
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
		/**Zjisteni rezimu*/
		getRezim(rq?:CallParams<{kategorieDokladu:number,nks:string,throwException:boolean}>): _Task<{kategorieDokladu:number,nks:string,throwException:boolean},number>;
		/**Nasteni ucetniho strediska*/
		getUcsTable(rq?:CallParams<{nks:string,rezim:number,ucsFilter:string}>): _Task<{nks:string,rezim:number,ucsFilter:string},Gordic.Uct.Interface.GEkosucsDto[]>;
		/**Je povinna vazba*/
		isMandatoryBinding(rq?:CallParams<{head:Gordic.Eko.Interface.GRozspidDto}>): _Task<{head:Gordic.Eko.Interface.GRozspidDto},boolean>;
		/**Pocty dokladu dle filtru a knihy (pouziti v DashBoardu)*/
		listCount(rq?:CallParams<{idKnihy:string,filtry:Gordic.Uct.Interface.GEUctFiltrSeznamPevne[]}>): _Task<{idKnihy:string,filtry:Gordic.Uct.Interface.GEUctFiltrSeznamPevne[]},any>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozDoklad: ServiceBase & Catalog.RozDoklad;
	}
	const RozDoklad: Client["RozDoklad"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozDokladAgenda.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Prace s uct knihami
	* @domain Rozpocet
	* @businessObject RozAgenda
	*/
	interface RozAgenda {
		/**Nacteni inforaci o agende*/
		read(rq?:CallParams<{}>): _Task<{},GServiceReadRequest<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Uzavreni agendy*/
		uzavritAgendu(rq?:CallParams<{}>): _Task<{},void>;
		/**Zjisteni povoleni uzavrit agendu*/
		povoleniUzavreniAgendy(rq?:CallParams<{}>): _Task<{},Gordic.General.ApplicationInterface.GPermission>;
		/**Zjisteni povoleni akci na agende*/
		povoleniAkciAgendy2(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoAgendaPermissions>;
		/**Zjisteni povoleni akci na agende*/
		povoleniAkciAgendy(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoAgendaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozAgenda: ServiceBase & Catalog.RozAgenda;
	}
	const RozAgenda: Client["RozAgenda"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozDokladHlavickaA.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani ISL pro praci nad a-hlavickou*/
	interface RozDokladHlavickaA {
		/**Metoda pro nacteni detailu dokladu*/
		read(rq?:Gordic.Uct.Interface.GRozAHlavickaReadRequestDto|CallParams<GServiceReadRequest<Gordic.Uct.Interface.GRozAHlavickaReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Uct.Interface.GRozAHlavickaReadRequestDto>,GServiceReadResponse<Gordic.Uct.Interface.GRozAHlavickaBaseResponseDto>>;
		/**Podani dokladu*/
		upsert(rq?:Gordic.Uct.Interface.GRozAHlavickaCreateRequestDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GRozAHlavickaCreateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GRozAHlavickaCreateRequestDto>,GServiceSaveResponse<Gordic.Uct.Interface.GRozAHlavickaBaseResponseDto>>;
		/**Smazani zaznamu a-hlavicky*/
		delete(rq?:CallParams<{identifikator:string}>): _Task<{identifikator:string},void>;
		/**Nasteni seznamu dokladu*/
		list(rq?:Gordic.Uct.Interface.GRozAhlavickaListiRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponseWithMeta<Gordic.Uct.Interface.GRozsahlOutDto, Gordic.Uct.Interface.GRozAHlavickaPermissionsSeznam>>;
		/**Vraceni seznamu druhu a-hlavicek*/
		seznamDruhuHlavicek(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Uct.Interface.GRozcadrDto>>;
		/**Uzavreni a-hlavicky*/
		uzavrit(rq?:CallParams<{identifikator:string}>): _Task<{identifikator:string},GServiceSaveResponse<Gordic.Uct.Interface.GRozAHlavickaBaseResponseDto>>;
		/**Smazani zaznamu a-hlavicky*/
		otevrit(rq?:CallParams<{identifikator:string}>): _Task<{identifikator:string},GServiceSaveResponse<Gordic.Uct.Interface.GRozAHlavickaBaseResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozDokladHlavickaA: ServiceBase & Catalog.RozDokladHlavickaA;
	}
	const RozDokladHlavickaA: Client["RozDokladHlavickaA"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozDokladKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Prace s uct knihami
	* @domain Rozpocet
	* @businessObject RozKniha
	*/
	interface RozKniha {
		/**Seznam povolenych knih pro danou funkci*/
		list(rq?:Gordic.Eko.Interface.GEkoKnihaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Seznam povolenych knih k uzavreni pro danou funkci*/
		knihyKUzaverkam(rq?:Gordic.Eko.Interface.GEkoKnihaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Zjisteni povoleni uzaverky knih*/
		nactiPovoleniUzaverky(rq?:CallParams<{}>): _Task<{},Gordic.General.ApplicationInterface.GPermission>;
		/**Zjisteni pristupnosti akci*/
		getPermissions(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Eko.Interface.GEkoKnihaPermissions>;
		/**Kontrola knih pred uzavrenim*/
		kontrolaKnihUzavrit(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Kontrola knih pred znovuotevrenim*/
		kontrolaKnihOtevrit(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Akce uzaverek uzavreni/otevreni knih*/
		uzaverky(rq?:Gordic.Uct.Interface.GUctUzaverkaRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctUzaverkaRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctUzaverkaRequestDto>,Gordic.Eko.Interface.GEkoVybraneKnihyDto[]>;
		/**Znovu otevreni vybranych knih*/
		otevritKnihy(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Uzavreni vybranych knih*/
		uzavritKnihy(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Uzavreni knihy v ramci uzaverek*/
		uzavreniKnihy(rq?:Gordic.Uct.Interface.GInputUzaverkaDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GInputUzaverkaDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GInputUzaverkaDto>,GServiceActionResponse<Gordic.Uct.Interface.GOutputUzaverkaDto>>;
		/**Metoda slouzici k otevreni jiz uzavrene (pripadne odlite) knihy*/
		zruseniUzavreniKnihy(rq?:Gordic.Uct.Interface.GInputUzaverkaDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GInputUzaverkaDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GInputUzaverkaDto>,GServiceActionResponse<Gordic.Uct.Interface.GOutputUzaverkaDto>>;
		/**Hromadne uzavreni knih v ramci uzaverek*/
		hromadneUzavreniKnih(rq?:Gordic.Uct.Interface.GInputUzaverkyDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GInputUzaverkyDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GInputUzaverkyDto>,GServiceActionResponse<Gordic.Uct.Interface.GOutputUzaverkyDto>>;
		/**Uzavreni agendy v ramci uzaverek*/
		uzavreniAgendy(rq?:Gordic.Uct.Interface.GErrorInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GErrorInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GErrorInDto>,GServiceActionResponse<Gordic.Uct.Interface.GResultOutDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozKniha: ServiceBase & Catalog.RozKniha;
	}
	const RozKniha: Client["RozKniha"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozDokladZapis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s objektem  GRozDokladZapisy*/
	interface RozDokladZapis {
		/**Ulozeni zapisu*/
		upsert(rq?:Gordic.Uct.Interface.GRozDokladHeaderRowInDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GRozDokladHeaderRowInDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GRozDokladHeaderRowInDto>,GServiceSaveResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Zalozeni noveho radku pro TK*/
		novyRadek(rq?:Gordic.Uct.Interface.GRozDokladInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Odstraneni zapisu*/
		zrusitRadek(rq?:Gordic.Uct.Interface.GRozDokladHeaderRowInDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladHeaderRowInDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozDokladHeaderRowInDto>,GServiceActionResponse<Gordic.Uct.Interface.GRozDokladOutDto>>;
		/**Hromadna operace: Hromadne smazani zapisu dokladu*/
		hromadneOdstranit(rq?:Gordic.Uct.Interface.GRozZapisRequestDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GRozZapisRequestDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GRozZapisRequestDto>,GServiceSaveResponse<Gordic.Uct.Interface.GRozZapisResponseDto>>;
		/**Start importu za souboru*/
		prepareImportFromClipboard(rq?:CallParams<{viditelneSloupce:Gordic.Eko.Interface.GVisibleTableColumns[],dataZeSchranky:string}>): _Task<{viditelneSloupce:Gordic.Eko.Interface.GVisibleTableColumns[],dataZeSchranky:string},Gordic.Uct.Interface.GRozResultZapisyDto>;
		/**Priprava importu za souboru*/
		prepareImportFromFile(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,viditelneSloupce:Gordic.Eko.Interface.GVisibleTableColumns[]}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,viditelneSloupce:Gordic.Eko.Interface.GVisibleTableColumns[]},Gordic.Uct.Interface.GRozResultZapisyDto>;
		/**Kontrola vstupnich dat importu*/
		verifyImportData(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozDokladZapisImportRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GRozDokladZapisImportRequestDto},Gordic.Uct.Interface.GRozResultZapisyDto>;
		/**Import dat do ucetnich zapisu*/
		import(rq?:CallParams<{rq:Gordic.Uct.Interface.GRozDokladZapisImportRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GRozDokladZapisImportRequestDto},Gordic.Uct.Interface.GRozResultZapisyDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozDokladZapis: ServiceBase & Catalog.RozDokladZapis;
	}
	const RozDokladZapis: Client["RozDokladZapis"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozIissp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani ISL pro praci se Státní pokladnou*/
	interface RozIissp {
		/**Odeslání požadavku na přeúčtování skutečnosti – provádí Commit!*/
		odeslaniPreuctovaniSkutecnosti(rq?:Gordic.Uct.Interface.GRozIisspEkisSpPskRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GRozIisspEkisSpPskRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GRozIisspEkisSpPskRequestDto>,GServiceActionResponse<Gordic.Iissp.Interface.GIisspEkisSpPskResponseDto>>;
		/**Nacteni radku IISSP k dokladu kumulovanych dle IK*/
		getRowsIisspKumulovaneDoklad(rq?:CallParams<{pidDokladu:string,nuloveRadky:boolean}>): _Task<{pidDokladu:string,nuloveRadky:boolean},Gordic.Uct.Interface.GRozIK[]>;
		/**Nacteni radku IISSP k a-hlavicce kumulovanych dle IK*/
		getRowsIisspKumulovaneHlavicka(rq?:CallParams<{pidDokladu:string,nuloveRadky:boolean}>): _Task<{pidDokladu:string,nuloveRadky:boolean},Gordic.Uct.Interface.GRozIK[]>;
		/**Nacteni radku IISSP k dokladu nekumulovane dle IK*/
		getRowsIisspNekumulovaneDoklad(rq?:CallParams<{pidDokladu:string,ik:Gordic.Uct.Interface.GIdentifikaceKorunyDto}>): _Task<{pidDokladu:string,ik:Gordic.Uct.Interface.GIdentifikaceKorunyDto},Gordic.Uct.Interface.GRozdispDto[]>;
		/**Nacteni radku IISSP k a-hlavicce  nekumulovane dle IK*/
		getRowsIisspNekumulovaneHlavicka(rq?:CallParams<{pidDokladu:string,ik:Gordic.Uct.Interface.GIdentifikaceKorunyDto}>): _Task<{pidDokladu:string,ik:Gordic.Uct.Interface.GIdentifikaceKorunyDto},Gordic.Uct.Interface.GRozdispDto[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozIissp: ServiceBase & Catalog.RozIissp;
	}
	const RozIissp: Client["RozIissp"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozManagerCile.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani ISL pro praci nad managery cilu*/
	interface RozManagerCile {
		/**Metoda pro vyplneni stromu cilu od zaslaneho uzlu az ke spravci kapitoly*/
		listStromCilu(rq?:CallParams<{idCile:string,uroven:number}>): _Task<{idCile:string,uroven:number},Gordic.Uct.Interface.GRozCileDto[]>;
		/**Metoda pro vyplneni seznamu cilu, kde je prihlasena funkce ekonomickym organem*/
		listCiluEO(rq?:CallParams<{}>): _Task<{},Gordic.Uct.Interface.GRozCileDto[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozManagerCile: ServiceBase & Catalog.RozManagerCile;
	}
	const RozManagerCile: Client["RozManagerCile"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozPrislib.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani ISL pro praci s prisliby
	* @domain Rozpocet
	* @businessObject RozPrislib
	*/
	interface RozPrislib {
		/**Nacteni dat Invidiulnho prislibu*/
		listIndividualniPrislib(rq?:CallParams<{nks:string,au:string,akce:string,drd:number}>): _Task<{nks:string,au:string,akce:string,drd:number},GServiceListResponse<Gordic.Uct.Interface.GRozaaatPrislibDto>>;
		/**Limiovany prislib*/
		listLimitovanyPrislib(rq?:CallParams<{nks:string,au:string,drd:number}>): _Task<{nks:string,au:string,drd:number},GServiceListResponse<Gordic.Uct.Interface.GRozaaatPrislibDto>>;
		/**Opravny invidualni prislib*/
		listOpravnyIndividualniPrislib(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceListResponse<Gordic.Uct.Interface.GRozaaatPrislibDto>>;
		/**Opravny limitovany prislib*/
		listOpravnyLimitovanyPrislib(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},GServiceListResponse<Gordic.Uct.Interface.GRozaaatPrislibDto>>;
		/**Generovani zapisu prislibu*/
		generovatZapisy(rq?:CallParams<{hlavickaDokladu:Gordic.Eko.Interface.GRozspidDto,dataProGenerovani:Gordic.Uct.Interface.GRozaaatPrislibDto[]}>): _Task<{hlavickaDokladu:Gordic.Eko.Interface.GRozspidDto,dataProGenerovani:Gordic.Uct.Interface.GRozaaatPrislibDto[]},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozPrislib: ServiceBase & Catalog.RozPrislib;
	}
	const RozPrislib: Client["RozPrislib"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozRozvrh.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface ISL pro metody k rozpoctovemu rozvrhu*/
	interface RozRozvrh {
		/**Dohledani rozpoctoveho rozvrhu*/
		getPidRozpoctovehoRozvrhuZapisu(rq?:CallParams<{drd:number,ucs:string,nks:string,rok:number}>): _Task<{drd:number,ucs:string,nks:string,rok:number},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozRozvrh: ServiceBase & Catalog.RozRozvrh;
	}
	const RozRozvrh: Client["RozRozvrh"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\ISL\IGRozUkazatele.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani ISL pro praci s ukazateli*/
	interface RozUkazatel {
		/**Nacteni informaci o ukazatelich dokladu pro zobrazeni ve vysledkove zalozce po schvaleni, kdy ukazatele mam v pameti*/
		getVysledkyUkazatelu(rq?:CallParams<{header:Gordic.Eko.Interface.GRozspidDto,ukazatele:Gordic.Uct.Interface.GRozUkazatelDto[]}>): _Task<{header:Gordic.Eko.Interface.GRozspidDto,ukazatele:Gordic.Uct.Interface.GRozUkazatelDto[]},Gordic.Uct.Interface.GRozVysledekUkazateluResponseDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozUkazatel: ServiceBase & Catalog.RozUkazatel;
	}
	const RozUkazatel: Client["RozUkazatel"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Objekty\CStavyDokladu.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Staticka trida pro urcovani stavu dokladu*/
	interface CStavyDokladu {
	}
	const enum CStavyDokladuNames {}
	const enum CStavyDokladuFragments {}
	const enum CStavyDokladuTypes {}
	const enum CStavyDokladuTypeLengths {}
}
declare namespace Gordic.Uct.Interface.CStavyDokladu {
	/**Konstanty pro aktivitu dokladu*/
	const enum GEAktivitaDokladu {
		/**aktivni doklad*/
		aktivni=100,
		/**stornovany doklad*/
		storno=500,
		/**zruseny doklad*/
		zruseno=900,
	}
	/**Konstanty pro stavy dokladu*/
	const enum GEStavyDokladu {
		/**Stornovany doklad*/
		stornovany=90,
		/**uzavreny doklad*/
		uzavreny=50,
		/**realizovany doklad*/
		realizovany=40,
		/**validovany doklad*/
		validovany=38,
		/**schvaleny doklad*/
		schvaleny=30,
		/**castecne realizovany doklad*/
		castecneRealizovany=10,
		/**navrh*/
		navrh=5,
		/**nerealizovany doklad*/
		evidovano=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\Objekty\GRozGlobalParams.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Globalni parametry ulozene v objektu*/
	interface GRozGlobalParams {
		/**Priznak debug*/
		Debug?: boolean|null;
		/**Kontrola vazanych prostredku dle roku(true), nebo dle vety(false)*/
		readonly VLZRKontrolaDleRoku?: boolean|null;
		/**ROZ – ŘP VLZR Kontrola objemu vázaných prostředků*/
		readonly VLZRKontrolaVazanychProstredku?: number|null;
		/**Povoleni zeleneho filtru v porizovace*/
		readonly PovolitUzivatelskyFiltrVZapisech?: boolean|null;
		/**Kontrola na porizovani au, aby neodpovidalo au definovaneho pro prislib*/
		readonly KontrolaNaPorizovaniDisponibilityPam?: boolean|null;
		/**Algoritmus filtrovani PVS*/
		readonly AlgoritmusFiltrovaniPVS?: string|null;
		/**ROZ – ŘP práce s dokladem pokud je v řízeném schvalovacím procesu (EPK)*/
		readonly PovolenaEditaceDokladuVeSchvalovacimProcesu?: boolean|null;
		/**ROZ – ŘP kontrola dokladů mimo aktivní operace*/
		readonly PovolitKontroluPredNavrhem?: boolean|null;
		/**Urcuje, zda se budou doklady se souctem za IK = 0 odesilat do statni pokladny*/
		readonly OdesilatNuloveDokladyDoIISSP?: boolean|null;
		/**Pokud je hodnota true, pak se predvyplnuje ns do rozpoctovych zapisu
		*     ROZ – ŘP VLZR Předplnění NS v zápisech
		*/
		readonly PreplneniNSVZapisech?: boolean|null;
		/**EKO – ŘP Možnost pořízení požadavků na rozpočet připravovaného NS*/
		readonly PovolenoPorizeniPozadavkuNaRozPripravovanehoNS?: boolean|null;
		/**ROZ  - ŘP Rozšířená editace hlavičky dokladu*/
		readonly PovolenaRozsirenaEditaceHlavicky?: boolean|null;
		/**EKO - Výběr pořizovacího objektu položek dokladu*/
		readonly PouzivatStaryPorizovac?: boolean|null;
		/**Filtr na slova ktere pouzivaji prisliby*/
		readonly PouzivanaSlovaVPam?: string|null;
		/**EKO – ŘP Rezervovat převod VBÚ na BÚCP v subsystému EKO*/
		readonly RezervovatPrevodVBUNaBUCP?: boolean|null;
		/**ROZ – ŘP výběr typu písemnosti pro zaúčtování mezd*/
		readonly TypDokladuProFuc?: string|null;
		/**ROZ – ŘP typ účetního případu*/
		readonly TypUcetnihoPripadu?: string|null;
		/**ROZ – ŘP typ účetního případu pro opravu*/
		readonly TypUcetnihoPripaduOprava?: string|null;
		/**Zda zobrazovad pid z sml/evz ci pozadavku na rozpoctovych radcich 
		*     ROZ – ŘP zobrazení vazby prim. dokladů
		*/
		readonly ZobrazovatPIDVPrimDokladech?: boolean|null;
		/**ROZ – ŘP VLZR Možnost změny požadavků na rozpočet v rámci IK*/
		readonly KontrolovatNaZmenuIKVeVLZR?: boolean|null;
		/**ROZ - ŘP Povolena změna IK za doklad (default Ano)*/
		readonly KontrolovatNaZmenuIKAktualniRok?: boolean|null;
		/**Možnost opravit účtárnu až po schválení dokladu
		*     ROZ ŘP - Změna účtárny po schválení
		*/
		readonly PovolenaZmenaUctarnyPoSchvaleni?: boolean|null;
		/**Povoleni uzivatelske predkontace*/
		readonly PovoleniUzivatelskePredkontace?: Gordic.Eko.Interface.GEPovoleniUzivatelskePredkontace|null;
		/**Povoleni prevodu predkontaci na verejne*/
		readonly PovoleniPrevoduPredkontace?: Gordic.Eko.Interface.GEPovoleniPrevoduPredkontace|null;
		/**Priznak jakym zpusobem lze pracovat s internimi hlavickami*/
		readonly RezimPraceSInternimiHlavickami?: Gordic.Uct.Interface.GERezimPraceSIntrHlavickami|null;
	}
	const enum GRozGlobalParamsNames { Debug = "Debug", VLZRKontrolaDleRoku = "VLZRKontrolaDleRoku", VLZRKontrolaVazanychProstredku = "VLZRKontrolaVazanychProstredku", PovolitUzivatelskyFiltrVZapisech = "PovolitUzivatelskyFiltrVZapisech", KontrolaNaPorizovaniDisponibilityPam = "KontrolaNaPorizovaniDisponibilityPam", AlgoritmusFiltrovaniPVS = "AlgoritmusFiltrovaniPVS", PovolenaEditaceDokladuVeSchvalovacimProcesu = "PovolenaEditaceDokladuVeSchvalovacimProcesu", PovolitKontroluPredNavrhem = "PovolitKontroluPredNavrhem", OdesilatNuloveDokladyDoIISSP = "OdesilatNuloveDokladyDoIISSP", PreplneniNSVZapisech = "PreplneniNSVZapisech", PovolenoPorizeniPozadavkuNaRozPripravovanehoNS = "PovolenoPorizeniPozadavkuNaRozPripravovanehoNS", PovolenaRozsirenaEditaceHlavicky = "PovolenaRozsirenaEditaceHlavicky", PouzivatStaryPorizovac = "PouzivatStaryPorizovac", PouzivanaSlovaVPam = "PouzivanaSlovaVPam", RezervovatPrevodVBUNaBUCP = "RezervovatPrevodVBUNaBUCP", TypDokladuProFuc = "TypDokladuProFuc", TypUcetnihoPripadu = "TypUcetnihoPripadu", TypUcetnihoPripaduOprava = "TypUcetnihoPripaduOprava", ZobrazovatPIDVPrimDokladech = "ZobrazovatPIDVPrimDokladech", KontrolovatNaZmenuIKVeVLZR = "KontrolovatNaZmenuIKVeVLZR", KontrolovatNaZmenuIKAktualniRok = "KontrolovatNaZmenuIKAktualniRok", PovolenaZmenaUctarnyPoSchvaleni = "PovolenaZmenaUctarnyPoSchvaleni", PovoleniUzivatelskePredkontace = "PovoleniUzivatelskePredkontace", PovoleniPrevoduPredkontace = "PovoleniPrevoduPredkontace", RezimPraceSInternimiHlavickami = "RezimPraceSInternimiHlavickami",}
	const enum GRozGlobalParamsFragments { Debug = "*", VLZRKontrolaDleRoku = "*", VLZRKontrolaVazanychProstredku = "*", PovolitUzivatelskyFiltrVZapisech = "*", KontrolaNaPorizovaniDisponibilityPam = "*", AlgoritmusFiltrovaniPVS = "*", PovolenaEditaceDokladuVeSchvalovacimProcesu = "*", PovolitKontroluPredNavrhem = "*", OdesilatNuloveDokladyDoIISSP = "*", PreplneniNSVZapisech = "*", PovolenoPorizeniPozadavkuNaRozPripravovanehoNS = "*", PovolenaRozsirenaEditaceHlavicky = "*", PouzivatStaryPorizovac = "*", PouzivanaSlovaVPam = "*", RezervovatPrevodVBUNaBUCP = "*", TypDokladuProFuc = "*", TypUcetnihoPripadu = "*", TypUcetnihoPripaduOprava = "*", ZobrazovatPIDVPrimDokladech = "*", KontrolovatNaZmenuIKVeVLZR = "*", KontrolovatNaZmenuIKAktualniRok = "*", PovolenaZmenaUctarnyPoSchvaleni = "*", PovoleniUzivatelskePredkontace = "*", PovoleniPrevoduPredkontace = "*", RezimPraceSInternimiHlavickami = "*",}
	const enum GRozGlobalParamsTypes { Debug = "boolean", VLZRKontrolaDleRoku = "boolean", VLZRKontrolaVazanychProstredku = "number", PovolitUzivatelskyFiltrVZapisech = "boolean", KontrolaNaPorizovaniDisponibilityPam = "boolean", AlgoritmusFiltrovaniPVS = "string", PovolenaEditaceDokladuVeSchvalovacimProcesu = "boolean", PovolitKontroluPredNavrhem = "boolean", OdesilatNuloveDokladyDoIISSP = "boolean", PreplneniNSVZapisech = "boolean", PovolenoPorizeniPozadavkuNaRozPripravovanehoNS = "boolean", PovolenaRozsirenaEditaceHlavicky = "boolean", PouzivatStaryPorizovac = "boolean", PouzivanaSlovaVPam = "string", RezervovatPrevodVBUNaBUCP = "boolean", TypDokladuProFuc = "string", TypUcetnihoPripadu = "string", TypUcetnihoPripaduOprava = "string", ZobrazovatPIDVPrimDokladech = "boolean", KontrolovatNaZmenuIKVeVLZR = "boolean", KontrolovatNaZmenuIKAktualniRok = "boolean", PovolenaZmenaUctarnyPoSchvaleni = "boolean", PovoleniUzivatelskePredkontace = "Gordic.Eko.Interface.GEPovoleniUzivatelskePredkontace", PovoleniPrevoduPredkontace = "Gordic.Eko.Interface.GEPovoleniPrevoduPredkontace", RezimPraceSInternimiHlavickami = "Gordic.Uct.Interface.GERezimPraceSIntrHlavickami",}
	const enum GRozGlobalParamsTypeLengths {}
	/**Vycet hodnot pro hromadnou kopii a storno v ramci provizoria*/
	const enum GEHromadneAkceProvizorium {
		Ne,
		Ano10,
		Ano50,
		AnoVse,
	}
	const enum ZpusobUrceniZaokrouhlovaniEnum {
		parametry,
		ciselniky,
	}
	const enum GTypInstalace {
		centralni,
		decentralni,
		samostatna,
	}
	const enum GDostupneKnihyKUzavreniEnum {
		/**Uzivatel nema pristupne hromadne uzaverky knih*/
		zadne=0,
		dostupneUzivateli=1,
		aktualniUCS=2,
		aktualniRealizator=3,
	}
	const enum DefiniceAgCislaEnum {
		/**Cislo dokladu je shodne s agendovym cislem dokladu*/
		ac,
		/**Cislo dokladu je zadavano manualne*/
		manualni,
		/**cislo dokladu je zadavano automaticky dle rady*/
		rada,
		/**neni nastaven parametr*/
		none,
	}
	const enum AktivaceStornoDokladuEnum {
		ne=0,
		ano=1,
		anoDleDrd=2,
	}
	const enum PovolitPorizovaniPolozkovehoProfiluEnum {
		ne,
		ano,
		anoDleDrd,
	}
	const enum PovolitEvidenciDokladuEnum {
		ne,
		ano,
		anoDleDrd,
	}
	const enum PovolitZruseniSchvaleniDokladuEnum {
		ne,
		ano,
		anoDleDrd,
		/**u dokladu 2,3,23 lze zrusit, u 7,8 nelze zrusit.*/
		kap,
		/**u dokladu 7 lze zrusit, u 2,3,8,23 nelze zrusit schvaleni.*/
		mf,
		/**u dokladu 8 lze zrusit schvaleni, u 2,3,7,23 nelze zrusit schvaleni*/
		vl,
		/**u dokladu 7,8 lze zrusit schvaleni, u 2,3,23 nelze.*/
		mf_vl,
	}
	const enum KontrolaAktLimitNaMaxLimitEnum {
		ne=0,
		ano=1,
		pouzeMimoISPROFIN=2,
		pouzeISPROFIN=3,
		anoSVarovanim=4,
	}
	const enum GEYesNoWarn {
		ne,
		ano,
		anoSVarovanim,
	}
	const enum PovolitOpravuHlavickyDokladuEnum {
		ne,
		ano,
		anoNeschvalene,
		anoDleDrd,
	}
	const enum PovolitOpravuPolozkyDokladuEnum {
		ne,
		ano,
		anoNeschvalene,
		anoDleDrd,
	}
	const enum RezimProvozuEnum {
		zakladni=1,
		uctarna=2,
		realizator=3,
		kompetent=4,
		uzivatel=0,
	}
	const enum RezimVazbyNaPrimarniDokladyEnum {
		zakladni,
		uctarna,
		realizator,
		kompetent,
		vlastnik,
	}
	const enum RezimZobrazeniDokladuEnum {
		zakladni=0,
		uctarna=1,
		realizator=2,
		kompetent=3,
		vlastnik=4,
	}
	const enum ViceleteRozpoctovaniEnum {
		ne,
		ano,
		anoBezBeznehoRoku,
		/**Porizovani pouze do roku sberu*/
		anoPouzeBAR,
		/**Porizovani pro roky vyssi nez rok sberu*/
		anoPouzeSRV,
	}
	const enum PovolitSchvaleniDokladuEnum {
		ne=0,
		ano=1,
		anoDleDrd=100,
		/**u dokladu 2,3,23 lze schvalit, u 7,8 nelze.*/
		kap=2,
		/**u dokladu 7 lze schvalit, u 2,3,8,23 nelze schvaleni.*/
		mf=3,
		/**u dokladu 8 lze schvaleni, u 2,3,7,23 nelze schvaleni*/
		vl=4,
		/**u dokladu 7,8 lze schvaleni, u 2,3,23 nelze.*/
		mf_vl=5,
	}
	const enum PovolitStornoDokladuEnum {
		ne=0,
		ano=1,
		anoDleDrd=2,
	}
	const enum PovolitRealizaciDokladuEnum {
		ne=0,
		ano=1,
		anoDleDrd=2,
	}
	const enum PovolitUzavreniDokladuEnum {
		ne=0,
		ano=1,
		anoDleDrd=2,
	}
	const enum ZadaniIdentifikatoruPrimarnihoVazebnihoDokladuEnum {
		ne=0,
		anoNepovinne=1,
		anoPovinneUBalancovani=2,
		anoPovinne=3,
	}
	const enum ZadaniPriznakuBalancovatelnostiEnum {
		automatickyBalancovatelne=0,
		automatickyNebalancovatelne=1,
		automatickyNebalancovatelneUPrimarnichDokladu=2,
		prednastavenoBalancovatelne=3,
		prednastavenoNebalancovatelne=4,
		prednastavenoNebalancovatelneUPrimarnichDokladu=5,
	}
	const enum RezimZadavaniCislaRozpoctovehoDokladuEnum {
		primo,
		vyberSubrady,
		primoNeboVyberSubrady,
	}
	const enum RezimVyrovnaniDokladuEnum {
		dokladovy,
		nekontrolovat,
		strediskovy,
	}
	const enum PovolitSchvalovaniCizichDokladuEnum {
		ano,
		anoDleDrd,
		ne,
	}
	const enum TypRozvrhuVLZREnum {
		ProRokSberu=0,
		ProAktRok=1,
		ProRozpocet=2,
	}
	/**Založení parametru pro povolení kontroly dokladu*/
	const enum GEKontrolaDokladu {
		/**Tlačítko „Kontrola“ nebude viditelné a systém nebude stav kontroly dokladu zohledňovat (současná funkcionalita).*/
		Neaktivni=0,
		/**Tlačítko „Kontrola“ bude viditelné, ale uživatelsky nedostupné (neaktivní).*/
		AktivniZakazana=1,
		/**Tlačítko „Kontrola“ bude viditelné a uživatelsky dostupné (aktivní).*/
		AktivniPovolena=2,
	}
	/**Povolení kontroly ORG na IP PP*/
	const enum GEKontrolaOrgNaIP {
		/**(defaultní hodnota).*/
		Vypnuta=0,
		/**Uživatel bude moci rozhodnou, zda pokračovat, či nikoliv*/
		ZapnutaVarovani=1,
		/**Provádění ověření bude následně zastaveno.*/
		ZapnutaChyba=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\StatniPokladna\GIdentifikaceKorunyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Struktura reprezentujici identifikaci koruny*/
	interface GIdentifikaceKorunyDto {
		/**Kapitola - povinne*/
		isp_kap?: string|null;
		/**Finanční místo - Organizační členění v rámci kapitoly - povinne*/
		isp_fim?: string|null;
		/**Rozpoctova polozka - Druhové třídění rozpočtové skladby - povinne*/
		isp_rpo?: string|null;
		/**Paragraf - Odvětvové třídění rozpočtové skladby - povinne*/
		isp_par?: string|null;
		/**Zdroj - Zdrojové třídění - povinne*/
		isp_zdr?: string|null;
		/**EDS/SMVS - Identifikace programového financování*/
		isp_eds?: string|null;
		/**Ucel - Účelově vázané prostředky*/
		isp_ucl?: string|null;
		/**Příjmové a výdajové struktury - povinne*/
		isp_pvs?: string|null;
		/**Narok-druh*/
		isp_nd?: string|null;
		isp_rd?: string|null;
		/**Zaznamova jednotka - Konsolidační třídění*/
		isp_zj?: string|null;
		/**Územní jednotka*/
		isp_uj?: string|null;
		/**Ucelovy znak - Transfery ÚSC*/
		isp_uz?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Castka prijem*/
		c0?: JsonDecimal|null;
		/**Castka vydej*/
		c1?: JsonDecimal|null;
	}
	const enum GIdentifikaceKorunyDtoNames { isp_kap = "isp_kap", isp_fim = "isp_fim", isp_rpo = "isp_rpo", isp_par = "isp_par", isp_zdr = "isp_zdr", isp_eds = "isp_eds", isp_ucl = "isp_ucl", isp_pvs = "isp_pvs", isp_nd = "isp_nd", isp_rd = "isp_rd", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", popis = "popis", c0 = "c0", c1 = "c1",}
	const enum GIdentifikaceKorunyDtoFragments { isp_kap = "*", isp_fim = "*", isp_rpo = "*", isp_par = "*", isp_zdr = "*", isp_eds = "*", isp_ucl = "*", isp_pvs = "*", isp_nd = "*", isp_rd = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*", popis = "*", c0 = "*", c1 = "*",}
	const enum GIdentifikaceKorunyDtoTypes { isp_kap = "string", isp_fim = "string", isp_rpo = "string", isp_par = "string", isp_zdr = "string", isp_eds = "string", isp_ucl = "string", isp_pvs = "string", isp_nd = "string", isp_rd = "string", isp_zj = "string", isp_uj = "string", isp_uz = "string", popis = "string", c0 = "JsonDecimal", c1 = "JsonDecimal",}
	const enum GIdentifikaceKorunyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Roz\StatniPokladna\GSIdentifikaceKoruny.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Struktura reprezentujici identifikaci koruny*/
	interface GSIdentifikaceKoruny {
		/**Kapitola - povinne*/
		isp_kap?: string|null;
		/**Finanční místo - Organizační členění v rámci kapitoly - povinne*/
		isp_fim?: string|null;
		/**Rozpoctova polozka - Druhové třídění rozpočtové skladby - povinne*/
		isp_rpo?: string|null;
		/**Paragraf - Odvětvové třídění rozpočtové skladby - povinne*/
		isp_par?: string|null;
		/**Zdroj - Zdrojové třídění - povinne*/
		isp_zdr?: string|null;
		/**EDS/SMVS - Identifikace programového financování*/
		isp_eds?: string|null;
		/**Ucel - Účelově vázané prostředky*/
		isp_ucl?: string|null;
		/**Příjmové a výdajové struktury - povinne*/
		isp_pvs?: string|null;
		/**Narok-druh*/
		isp_nd?: string|null;
		isp_rd?: string|null;
		/**Zaznamova jednotka - Konsolidační třídění*/
		isp_zj?: string|null;
		/**Územní jednotka*/
		isp_uj?: string|null;
		/**Ucelovy znak - Transfery ÚSC*/
		isp_uz?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Castka prijem*/
		c0?: JsonDecimal|null;
		/**Castka vydej*/
		c1?: JsonDecimal|null;
	}
	const enum GSIdentifikaceKorunyNames { isp_kap = "isp_kap", isp_fim = "isp_fim", isp_rpo = "isp_rpo", isp_par = "isp_par", isp_zdr = "isp_zdr", isp_eds = "isp_eds", isp_ucl = "isp_ucl", isp_pvs = "isp_pvs", isp_nd = "isp_nd", isp_rd = "isp_rd", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", popis = "popis", c0 = "c0", c1 = "c1",}
	const enum GSIdentifikaceKorunyFragments { isp_kap = "*", isp_fim = "*", isp_rpo = "*", isp_par = "*", isp_zdr = "*", isp_eds = "*", isp_ucl = "*", isp_pvs = "*", isp_nd = "*", isp_rd = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*", popis = "*", c0 = "*", c1 = "*",}
	const enum GSIdentifikaceKorunyTypes { isp_kap = "string", isp_fim = "string", isp_rpo = "string", isp_par = "string", isp_zdr = "string", isp_eds = "string", isp_ucl = "string", isp_pvs = "string", isp_nd = "string", isp_rd = "string", isp_zj = "string", isp_uj = "string", isp_uz = "string", popis = "string", c0 = "JsonDecimal", c1 = "JsonDecimal",}
	const enum GSIdentifikaceKorunyTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GProhlizeniUctTaskType.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typy uloh UCR*/
	const enum GProhlizeniUctTaskType {
		/**stavy rozpoctu*/
		RozpocetStav,
		/**zapisy rozpoctu*/
		RozpocetZapis,
		/**stavy ucetnictvi*/
		UcetnictviStav,
		/**zapisy ucetnictvi*/
		UcetnictviZapis,
		/**zapisy financovani*/
		FinancovaniZapis,
		/**zapisy danove evidence*/
		DanovaEvidenceZapis,
		/**zapisy danoveho priznani*/
		DanovePriznaniZapis,
		/**Zapisy primarnich pozadavku*/
		PrimarniPozadavkyZapis,
		/**Zapisy balancovani*/
		BalancovaniZapis,
		/**Vicelete financovani*/
		ViceleteFinancovaniZapis,
		/**Registr pohledavek a zavazku*/
		RegistrPZ,
		/**Saldokonto*/
		Saldokonto,
		/**Saldokontni zapisy*/
		SaldokontoZapis,
		/**Vsechny saldokontni zapisy ze seznamu*/
		SaldokontoZapisyVse,
		/**Ukazatele - strednedobi vyhled*/
		StrednedobyVyhled,
		/**Ukazatele - aktualni obdobi*/
		AktualniObdobi,
		/**Nezarazene zapisy*/
		IISSP_Nezarazene_zapisy,
		/**IISSP - preuctovani skutecnosti - stavy*/
		IISSP_Preuctovani_stavy,
		/**Bankovni ucty*/
		IISSP_Preuctovani_BankovniUcty,
		/**Registr davek*/
		IISSP_Preuctovani_RegistrDavek,
		/**Stavy rozpoctu*/
		IISSP_Stavy_StavyRozpoctu,
		/**Stavy cerpani rozpoctu*/
		IISSP_Stavy_StavyCerpaniRozpoctu,
		/**Stavy skutecnosti*/
		IISSP_Stavy_StavySkutecnosti,
		/**Inbox*/
		IISSP_Stavy_Inbox,
		/**Stav rezervaci*/
		IISSP_Stavy_StavyRezervaci,
		/**Stav rezervaci chyby*/
		IISSP_Stavy_StavyRezervaciChyby,
		/**Seznam pozadvku*/
		PozadavekSeznam,
		/**Detail pozadvku*/
		PozadavekDetail,
		/**Konsolidace -stavy*/
		KonsolidaceStavy,
		/**Uloha pro testovani*/
		TestovaciUloha,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GUcrGlobalsBase.d.ts 

declare namespace Gordic.Uct.Interface {
	interface GUcrGlobalsBase {
		/**Datum, ke kterému se vztahuje platnost pevné masky*/
		PlatnostPM?: string|null;
		/**Režim provozu*/
		m_RezimProvozu?: Gordic.Uct.Interface.GUcrRezimProvozu|null;
		/**Režim provozu*/
		readonly RezimProvozu?: Gordic.Uct.Interface.GUcrRezimProvozu|null;
		/**Maximální režim provozu*/
		MaxRezimProvozu?: Gordic.Uct.Interface.GUcrRezimProvozu|null;
		/**Typ sumarizace*/
		TypSumarizace?: Gordic.Uct.Interface.GUcrTypSumarizace|null;
		/**predplnovani ucs*/
		PredplnUCS?: boolean|null;
		/**predplnovani pristupu k NS*/
		PredplnPri?: Gordic.Uct.Interface.GUcrTypPristupuNS|null;
		/**moznost nastaveni vlastniho zahlavi*/
		VlastniZahlavi?: boolean|null;
		/**povoleni na ulozeni noveho pozadavku*/
		Rad_NovyPozadavek?: boolean|null;
		/**povoleni na zruseni pozadavku*/
		Rad_ZrusPozadavek?: boolean|null;
		/**povoleni na zruseni cizich pozadavku*/
		Rad_ZrusCiziPozadavek?: boolean|null;
		/**povoleni na ulozeni nove masky*/
		Rad_NovaMaska?: boolean|null;
		/**povoleni na zruseni masky*/
		Rad_ZrusMasku?: boolean|null;
		/**odeslání sestavy generované mailem*/
		Rad_OdeslatMail?: boolean|null;
		/**povolení prohlížení Financování*/
		Rad_Financovani?: boolean|null;
		/**povolení prohlížení DPH*/
		Rad_Dph?: boolean|null;
		/**povolení zobrazeni cerpani RU, RS v procentech*/
		ZobrazeniCerpaniRozpoctuVProcentech?: boolean|null;
		/**povolení Registru P/Z*/
		Rad_Rzp?: boolean|null;
		/**Povoleni menit hodnoty v registru P/Z*/
		RPZ_Povoleni_Menit_Hodnoty?: boolean|null;
		/**Povoleni v registru P/Z zmenit prim. doklad*/
		RPZ_Povoleni_Menit_PRIM_DOKL?: boolean|null;
		/**povolení Vykaznictvi DU*/
		Rad_Vdu?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**režim zpracování DPH*/
		Dph_Rezim?: Gordic.Uct.Interface.GUcrRezimDph|null;
		/**ŘP - Možnost mít prázdnou pevnou masku. Při false nezobrazí nic pokud nemá administovánu pevnou masku.*/
		Rad_DefaultSes?: boolean|null;
		/**možnost nabídky subřad na F4 na polích ac*/
		Rad_NabidkaSubrad?: boolean|null;
		/**možnost zobrazení rozdílu MD-Dal v prohlížení*/
		Rad_ZobrazMdDal?: boolean|null;
		/**mazání cizích požadavků ODL*/
		Rad_ZrusCiziODL?: boolean|null;
		/**editace cizích požadavků ODL*/
		Rad_EditCiziODL?: boolean|null;
		/**povolení ODL*/
		Rad_ODLEnabled?: boolean|null;
		/**Povoleni editovat popisy a radky ucetnich dokladu*/
		PovoleniEditacePopisuUCTDokladu?: boolean|null;
		/**Povoleni editovat popisy a radky rozpoctovych dokladu*/
		PovoleniEditacePopisuROZDokladu?: boolean|null;
		/**Povoleni zobrazeni strednedobeho vyhledu*/
		PovoleniZobrazeniStrednedobehoVyhledu?: boolean|null;
		/**Rezim nacitani dat v uloze financovani*/
		RezimZobrazeniUlohyFinancovani?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrRezimZobrazeniFinancovani|null;
		/**Povoleni PAP kontrol a oprav*/
		Rad_Pap?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**Povoleni prepoctu stavu od zacatku roku*/
		Rad_PapRocniPrepocetStavu?: boolean|null;
		/**Povoleni zauctovani pap zapisu*/
		Rad_PapPovoleniZauctovani?: boolean|null;
		/**Atribut, zda kontrolovat strany v PAP*/
		Rad_PapKontrolovatStrany?: boolean|null;
		/**Rezim zpracovani vykazu v PAP nastroji*/
		RezimZpracovaniPap?: Gordic.Uct.Interface.GERezimZpracovaniPap|null;
		/**Rezim zatridovani analytik*/
		RezimZatridovani?: Gordic.Uct.Interface.GERezimZatridovaniAnalytikPap|null;
		/**Rezim vyrovnavani pripadu pap zapisy*/
		RezimVyrovnavaniPripadu?: Gordic.Uct.Interface.GERezimVyrovnavaniPripaduPap|null;
		/**Filtrovani na tridy 7,8,9*/
		FiltrNaTridy789Pap?: string|null;
		/**povolení RISRE*/
		Rad_Risre?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniRisre|null;
		/**povolení RISRE/PS dávky rezervací*/
		Rad_Risdrez?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**povolení RISRE/PS dávky rozpočtu*/
		Rad_Risdrop?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**povolení RISRE IISSP stavy rezervaci*/
		Rad_RisStav?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**povolení RISRE IISSP stavy rozpoctu a cerpani (Inbox)*/
		Rad_RisStrc?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**povolení RISRE IISSP stavy skutecnosti (Inbox)*/
		Rad_RisStsk?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**povolení RISRE IISSP stavy skutecnosti (Inbox)*/
		Rad_RisVyka?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**způsob odeslání RISRE/PS*/
		Rad_RisOdes?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrRisrePsOdes|null;
		/**povolení Konsolidace*/
		Rad_Konsolidace?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**povolení Ukazatele*/
		Rad_Ukazatele?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**povolení Ukazatele VLZR*/
		Rad_UkazateleVL?: Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu|null;
		/**nastavení prace s WFL*/
		TypPraceWfl?: Gordic.Uct.Interface.GUcrTypPraceWfl|null;
		/**nastavení prace s ESU*/
		TypPraceESU?: Gordic.Uct.Interface.GUcrTypPraceESU|null;
		/**možnost zobrazeni RČ*/
		Rad_Esu_RcZobr?: boolean|null;
		/**možnost vyhledávání RČ*/
		Rad_Esu_RcVyhl?: boolean|null;
		/**Pevná maska nastavená na přihlášenou funkci (a období)*/
		readonly PevnaMaska?: any|null;
		/**Délka AC pro UCT*/
		readonly DelkaAcUct?: number|null;
		/**Délka AC pro ROZ*/
		readonly DelkaAcRoz?: number|null;
		/**Max(DelkaAcUct, DelkaAcRoz)*/
		readonly DelkaAcMax?: number|null;
		/**Příznak, zda je aktuální období (EkoParams.Rok) otevřené (aktivita 100)*/
		OtevreneObdobi?: boolean|null;
		/**Povoleni ulohy saldokonto*/
		PovoleniUlohySaldokonto?: boolean|null;
		/**Saldokonto - vyber 1. sloupce ze strukturovaneho popisu*/
		SaldokontoParam1?: string|null;
		/**Saldokonto - vyber 2. sloupce ze strukturovaneho popisu*/
		SaldokontoParam2?: string|null;
	}
	const enum GUcrGlobalsBaseNames { PlatnostPM = "PlatnostPM", m_RezimProvozu = "m_RezimProvozu", RezimProvozu = "RezimProvozu", MaxRezimProvozu = "MaxRezimProvozu", TypSumarizace = "TypSumarizace", PredplnUCS = "PredplnUCS", PredplnPri = "PredplnPri", VlastniZahlavi = "VlastniZahlavi", Rad_NovyPozadavek = "Rad_NovyPozadavek", Rad_ZrusPozadavek = "Rad_ZrusPozadavek", Rad_ZrusCiziPozadavek = "Rad_ZrusCiziPozadavek", Rad_NovaMaska = "Rad_NovaMaska", Rad_ZrusMasku = "Rad_ZrusMasku", Rad_OdeslatMail = "Rad_OdeslatMail", Rad_Financovani = "Rad_Financovani", Rad_Dph = "Rad_Dph", ZobrazeniCerpaniRozpoctuVProcentech = "ZobrazeniCerpaniRozpoctuVProcentech", Rad_Rzp = "Rad_Rzp", RPZ_Povoleni_Menit_Hodnoty = "RPZ_Povoleni_Menit_Hodnoty", RPZ_Povoleni_Menit_PRIM_DOKL = "RPZ_Povoleni_Menit_PRIM_DOKL", Rad_Vdu = "Rad_Vdu", Dph_Rezim = "Dph_Rezim", Rad_DefaultSes = "Rad_DefaultSes", Rad_NabidkaSubrad = "Rad_NabidkaSubrad", Rad_ZobrazMdDal = "Rad_ZobrazMdDal", Rad_ZrusCiziODL = "Rad_ZrusCiziODL", Rad_EditCiziODL = "Rad_EditCiziODL", Rad_ODLEnabled = "Rad_ODLEnabled", PovoleniEditacePopisuUCTDokladu = "PovoleniEditacePopisuUCTDokladu", PovoleniEditacePopisuROZDokladu = "PovoleniEditacePopisuROZDokladu", PovoleniZobrazeniStrednedobehoVyhledu = "PovoleniZobrazeniStrednedobehoVyhledu", RezimZobrazeniUlohyFinancovani = "RezimZobrazeniUlohyFinancovani", Rad_Pap = "Rad_Pap", Rad_PapRocniPrepocetStavu = "Rad_PapRocniPrepocetStavu", Rad_PapPovoleniZauctovani = "Rad_PapPovoleniZauctovani", Rad_PapKontrolovatStrany = "Rad_PapKontrolovatStrany", RezimZpracovaniPap = "RezimZpracovaniPap", RezimZatridovani = "RezimZatridovani", RezimVyrovnavaniPripadu = "RezimVyrovnavaniPripadu", FiltrNaTridy789Pap = "FiltrNaTridy789Pap", Rad_Risre = "Rad_Risre", Rad_Risdrez = "Rad_Risdrez", Rad_Risdrop = "Rad_Risdrop", Rad_RisStav = "Rad_RisStav", Rad_RisStrc = "Rad_RisStrc", Rad_RisStsk = "Rad_RisStsk", Rad_RisVyka = "Rad_RisVyka", Rad_RisOdes = "Rad_RisOdes", Rad_Konsolidace = "Rad_Konsolidace", Rad_Ukazatele = "Rad_Ukazatele", Rad_UkazateleVL = "Rad_UkazateleVL", TypPraceWfl = "TypPraceWfl", TypPraceESU = "TypPraceESU", Rad_Esu_RcZobr = "Rad_Esu_RcZobr", Rad_Esu_RcVyhl = "Rad_Esu_RcVyhl", PevnaMaska = "PevnaMaska", DelkaAcUct = "DelkaAcUct", DelkaAcRoz = "DelkaAcRoz", DelkaAcMax = "DelkaAcMax", OtevreneObdobi = "OtevreneObdobi", PovoleniUlohySaldokonto = "PovoleniUlohySaldokonto", SaldokontoParam1 = "SaldokontoParam1", SaldokontoParam2 = "SaldokontoParam2",}
	const enum GUcrGlobalsBaseFragments { PlatnostPM = "*", m_RezimProvozu = "*", RezimProvozu = "*", MaxRezimProvozu = "*", TypSumarizace = "*", PredplnUCS = "*", PredplnPri = "*", VlastniZahlavi = "*", Rad_NovyPozadavek = "*", Rad_ZrusPozadavek = "*", Rad_ZrusCiziPozadavek = "*", Rad_NovaMaska = "*", Rad_ZrusMasku = "*", Rad_OdeslatMail = "*", Rad_Financovani = "*", Rad_Dph = "*", ZobrazeniCerpaniRozpoctuVProcentech = "*", Rad_Rzp = "*", RPZ_Povoleni_Menit_Hodnoty = "*", RPZ_Povoleni_Menit_PRIM_DOKL = "*", Rad_Vdu = "*", Dph_Rezim = "*", Rad_DefaultSes = "*", Rad_NabidkaSubrad = "*", Rad_ZobrazMdDal = "*", Rad_ZrusCiziODL = "*", Rad_EditCiziODL = "*", Rad_ODLEnabled = "*", PovoleniEditacePopisuUCTDokladu = "*", PovoleniEditacePopisuROZDokladu = "*", PovoleniZobrazeniStrednedobehoVyhledu = "*", RezimZobrazeniUlohyFinancovani = "*", Rad_Pap = "*", Rad_PapRocniPrepocetStavu = "*", Rad_PapPovoleniZauctovani = "*", Rad_PapKontrolovatStrany = "*", RezimZpracovaniPap = "*", RezimZatridovani = "*", RezimVyrovnavaniPripadu = "*", FiltrNaTridy789Pap = "*", Rad_Risre = "*", Rad_Risdrez = "*", Rad_Risdrop = "*", Rad_RisStav = "*", Rad_RisStrc = "*", Rad_RisStsk = "*", Rad_RisVyka = "*", Rad_RisOdes = "*", Rad_Konsolidace = "*", Rad_Ukazatele = "*", Rad_UkazateleVL = "*", TypPraceWfl = "*", TypPraceESU = "*", Rad_Esu_RcZobr = "*", Rad_Esu_RcVyhl = "*", PevnaMaska = "*", DelkaAcUct = "*", DelkaAcRoz = "*", DelkaAcMax = "*", OtevreneObdobi = "*", PovoleniUlohySaldokonto = "*", SaldokontoParam1 = "*", SaldokontoParam2 = "*",}
	const enum GUcrGlobalsBaseTypes { PlatnostPM = "string", m_RezimProvozu = "Gordic.Uct.Interface.GUcrRezimProvozu", RezimProvozu = "Gordic.Uct.Interface.GUcrRezimProvozu", MaxRezimProvozu = "Gordic.Uct.Interface.GUcrRezimProvozu", TypSumarizace = "Gordic.Uct.Interface.GUcrTypSumarizace", PredplnUCS = "boolean", PredplnPri = "Gordic.Uct.Interface.GUcrTypPristupuNS", VlastniZahlavi = "boolean", Rad_NovyPozadavek = "boolean", Rad_ZrusPozadavek = "boolean", Rad_ZrusCiziPozadavek = "boolean", Rad_NovaMaska = "boolean", Rad_ZrusMasku = "boolean", Rad_OdeslatMail = "boolean", Rad_Financovani = "boolean", Rad_Dph = "boolean", ZobrazeniCerpaniRozpoctuVProcentech = "boolean", Rad_Rzp = "boolean", RPZ_Povoleni_Menit_Hodnoty = "boolean", RPZ_Povoleni_Menit_PRIM_DOKL = "boolean", Rad_Vdu = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Dph_Rezim = "Gordic.Uct.Interface.GUcrRezimDph", Rad_DefaultSes = "boolean", Rad_NabidkaSubrad = "boolean", Rad_ZobrazMdDal = "boolean", Rad_ZrusCiziODL = "boolean", Rad_EditCiziODL = "boolean", Rad_ODLEnabled = "boolean", PovoleniEditacePopisuUCTDokladu = "boolean", PovoleniEditacePopisuROZDokladu = "boolean", PovoleniZobrazeniStrednedobehoVyhledu = "boolean", RezimZobrazeniUlohyFinancovani = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrRezimZobrazeniFinancovani", Rad_Pap = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Rad_PapRocniPrepocetStavu = "boolean", Rad_PapPovoleniZauctovani = "boolean", Rad_PapKontrolovatStrany = "boolean", RezimZpracovaniPap = "Gordic.Uct.Interface.GERezimZpracovaniPap", RezimZatridovani = "Gordic.Uct.Interface.GERezimZatridovaniAnalytikPap", RezimVyrovnavaniPripadu = "Gordic.Uct.Interface.GERezimVyrovnavaniPripaduPap", FiltrNaTridy789Pap = "string", Rad_Risre = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniRisre", Rad_Risdrez = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Rad_Risdrop = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Rad_RisStav = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Rad_RisStrc = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Rad_RisStsk = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Rad_RisVyka = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Rad_RisOdes = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrRisrePsOdes", Rad_Konsolidace = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Rad_Ukazatele = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", Rad_UkazateleVL = "Gordic.Uct.Interface.GUcrGlobalsBase.GUcrZobrazeniVdu", TypPraceWfl = "Gordic.Uct.Interface.GUcrTypPraceWfl", TypPraceESU = "Gordic.Uct.Interface.GUcrTypPraceESU", Rad_Esu_RcZobr = "boolean", Rad_Esu_RcVyhl = "boolean", PevnaMaska = "any", DelkaAcUct = "number", DelkaAcRoz = "number", DelkaAcMax = "number", OtevreneObdobi = "boolean", PovoleniUlohySaldokonto = "boolean", SaldokontoParam1 = "string", SaldokontoParam2 = "string",}
	const enum GUcrGlobalsBaseTypeLengths {}
}
declare namespace Gordic.Uct.Interface.GUcrGlobalsBase {
	/**Zobrazení viditelnosti úloh*/
	const enum GUcrZobrazeniVdu {
		/**Invisible*/
		Ne=0,
		/**Readonly*/
		AnoProhlizeni=1,
		/**Write*/
		AnoEditace=2,
	}
	/**Zobrazení viditelnosti úloh*/
	const enum GUcrRezimZobrazeniFinancovani {
		/**Pouze financování*/
		PouzeFinancovani=0,
		/**Financování se střednědobým výhledem (drd 9 a 69)*/
		FinancovaniSeStrednedobymVyhledem=1,
	}
	/**Zobrazení viditelnosti úloh*/
	const enum GUcrZobrazeniRisre {
		/**Invisible*/
		Ne=0,
		/**Readonly*/
		AnoProhlizeni=1,
		/**Write*/
		AnoEditace=2,
		/**SU*/
		AnoEditaceJenSU=3,
		/**SD*/
		AnoEditaceJenSD=4,
	}
	/**Režim provozu pro modul UCR*/
	const enum GUcrRisrePsOdes {
		Neodesilat=0,
		Offline=1,
		Online=2,
		Inbox=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GUcrRezimDph.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Režim provozu pro modul UCR*/
	const enum GUcrRezimDph {
		/**Organizace*/
		Ico=0,
		/**Středisko účtování*/
		Ucs=1,
		/**Účtárna*/
		Uus=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GUcrRezimProvozu.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Režim provozu pro modul UCR*/
	const enum GUcrRezimProvozu {
		/**Režim neurčeno. Nenastavovat.*/
		Neurceno=0,
		/**Režim nákladového střediska*/
		NKS=10,
		/**Režim účetního střediska*/
		UCS=20,
		/**Režim IČ*/
		ICO=30,
		/**Režim SOR*/
		SOR=40,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GUcrTypMasky.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typ masky*/
	const enum GUcrTypMasky {
		/**Veřejná maska*/
		Verejna=0,
		/**Osobní maska*/
		Osobni=10,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GUcrTypPraceESU.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typ práce s ESU*/
	const enum GUcrTypPraceESU {
		/**TODO*/
		Automat=0,
		/**TODO*/
		Manual=1,
		/**TODO*/
		Ne=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GUcrTypPraceWFL.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typ práce s WFL*/
	const enum GUcrTypPraceWfl {
		/**Nic z WFL nedotahovat*/
		Ne=0,
		/**Dotahovat WFL*/
		Ano=1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GUcrTypPristupuNS.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typ přístupu k NS*/
	const enum GUcrTypPristupuNS {
		/**Souhrně*/
		Souhrne=0,
		/**Jednotlivě*/
		Jednotlive=10,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GUcrTypSestavy.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typ sestavy*/
	const enum GUcrTypSestavy {
		/**Zápisová (leze do ucrdxma)*/
		Zapisova=10,
		/**Stavová (leze do ucta0ar)*/
		Stavova=20,
		/**Obojetná (leze kam se jí zlíbí)*/
		ZapisovoStavova=30,
		/**AAT*/
		Financovani=100,
		/**Registr zavazku/pohledavek*/
		RegistrZP=200,
		/**Neurceno*/
		Neurceno=999,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\GUcrTypSumarizace.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Typ sumarizace pro modul UCR*/
	const enum GUcrTypSumarizace {
		/**Interní sumarizace (v režimu SOR)*/
		Interni=0,
		/**Externí sumarizace (v režimu SOR)*/
		Externi=1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\IGUcrPevnaMaska.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\IGUcrsexp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Seznam exportovaných dávek.
	* @domain VykazExport
	* @businessObject VykazExport
	*/
	interface Ucrsexp {
		/**Detail Seznam exportovaných dávek.*/
		read(rq?:Gordic.Uct.Interface.GUcrsexpDto|CallParams<GServiceReadRequest<Gordic.Uct.Interface.GUcrsexpDto>>): _Task<GServiceReadRequest<Gordic.Uct.Interface.GUcrsexpDto>,GServiceReadResponse<Gordic.Uct.Interface.GUcrsexpDto>>;
		/**Seznam Seznam exportovaných dávek.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUcrsexpDto>>;
		/**Počet Seznam exportovaných dávek.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení Seznam exportovaných dávek.*/
		create(rq?:Gordic.Uct.Interface.GUcrsexpDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUcrsexpDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUcrsexpDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUcrsexpDto>>;
		/**Oprava Seznam exportovaných dávek.*/
		update(rq?:Gordic.Uct.Interface.GUcrsexpDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUcrsexpDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUcrsexpDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUcrsexpDto>>;
		/**Oprava resp. založení Seznam exportovaných dávek.*/
		upsert(rq?:Gordic.Uct.Interface.GUcrsexpDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUcrsexpDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUcrsexpDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUcrsexpDto>>;
		/**Odstranění Seznam exportovaných dávek.*/
		delete(rq?:Gordic.Uct.Interface.GUcrsexpDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUcrsexpDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUcrsexpDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUcrsexpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ucrsexp: ServiceBase & Catalog.Ucrsexp;
	}
	const Ucrsexp: Client["Ucrsexp"];
}
declare namespace Gordic.Uct.Interface {
	/**Filtr pro Seznam exportovaných dávek.*/
	const enum GUcrsexpFilter {
		/**Identifikátor exp.*/
		ixs_exp,
		/**Rok.*/
		rok,
		/**Mesic.*/
		mesic,
		/**Exp Typ.*/
		exp_typ,
		/**Exp format.*/
		exp_format,
		/**Soubor.*/
		soubor,
		/**Zkratka.*/
		zkratka,
		/**Popis.*/
		popis,
		/**Mail.*/
		mail,
		/**Datum zmena exp.*/
		dat_zmena_exp,
		/**Zmenu prov exp.*/
		zmenu_prov_exp,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ds\GUcrDetailMaskaBase.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Maska*/
	interface GUcrDetailMaskaBaseDto {
		/**DBCOLUMN:Maska.ixs_msk*/
		ixs_msk?: string|null;
		/**DBCOLUMN:Maska.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Maska.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Maska.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Maska.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Maska.typ_masky*/
		typ_masky?: number|null;
		/**DBCOLUMN:Maska.ktg_msk*/
		ktg_msk?: number|null;
		/**DBCOLUMN:Maska.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Maska.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Maska.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Maska.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Maska.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Maska.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GUcrDetailMaskaBaseDtoNames { ixs_msk = "ixs_msk", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", typ_masky = "typ_masky", ktg_msk = "ktg_msk", ixs_fun = "ixs_fun", nazev_rf = "nazev_rf", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GUcrDetailMaskaBaseDtoFragments { ixs_msk = "*", nazev = "*", zkratka = "*", poznamka = "*", aktivita = "*", typ_masky = "*", ktg_msk = "*", ixs_fun = "*", nazev_rf = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GUcrDetailMaskaBaseDtoTypes { ixs_msk = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", typ_masky = "number", ktg_msk = "number", ixs_fun = "string", nazev_rf = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GUcrDetailMaskaBaseDtoTypeLengths { nazev = 50, zkratka = 16, poznamka = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ds\GUcrDetailPozadavekBase.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Pozadavek*/
	interface GUcrDetailPozadavekBaseDto {
		/**DBCOLUMN:Pozadavek.ixs_ses*/
		ixs_ses?: string|null;
		/**DBCOLUMN:Pozadavek.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Pozadavek.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Pozadavek.idRep*/
		idRep?: string|null;
		/**DBCOLUMN:Pozadavek.rok*/
		rok?: number|null;
		/**DBCOLUMN:Pozadavek.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Pozadavek.ses*/
		ses?: string|null;
		/**DBCOLUMN:Pozadavek.ico*/
		ico?: string|null;
		/**DBCOLUMN:Pozadavek.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Pozadavek.uus*/
		uus?: string|null;
		/**DBCOLUMN:Pozadavek.nks*/
		nks?: string|null;
		/**DBCOLUMN:Pozadavek.ses_n*/
		ses_n?: boolean|null;
		/**DBCOLUMN:Pozadavek.ico_n*/
		ico_n?: boolean|null;
		/**DBCOLUMN:Pozadavek.ucs_n*/
		ucs_n?: boolean|null;
		/**DBCOLUMN:Pozadavek.uus_n*/
		uus_n?: boolean|null;
		/**DBCOLUMN:Pozadavek.nks_n*/
		nks_n?: boolean|null;
		/**DBCOLUMN:Pozadavek.ico_s*/
		ico_s?: boolean|null;
		/**DBCOLUMN:Pozadavek.ucs_s*/
		ucs_s?: boolean|null;
		/**DBCOLUMN:Pozadavek.uus_s*/
		uus_s?: boolean|null;
		/**DBCOLUMN:Pozadavek.nks_s*/
		nks_s?: boolean|null;
		/**DBCOLUMN:Pozadavek.flagSouhrne*/
		flagSouhrne?: boolean|null;
		/**DBCOLUMN:Pozadavek.flagTextove*/
		flagTextove?: boolean|null;
		/**DBCOLUMN:Pozadavek.flagVyberovaMaska*/
		flagVyberovaMaska?: boolean|null;
		/**DBCOLUMN:Pozadavek.flagVlastniZahlavi*/
		flagVlastniZahlavi?: boolean|null;
		/**DBCOLUMN:Pozadavek.ixs_msk_uzi*/
		ixs_msk_uzi?: string|null;
		/**DBCOLUMN:Pozadavek.msk_uzi_nazev*/
		msk_uzi_nazev?: string|null;
		/**DBCOLUMN:Pozadavek.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Pozadavek.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Pozadavek.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:Pozadavek.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Pozadavek.typ_msk*/
		typ_msk?: number|null;
		/**DBCOLUMN:Pozadavek.flagPap*/
		flagPap?: number|null;
	}
	const enum GUcrDetailPozadavekBaseDtoNames { ixs_ses = "ixs_ses", nazev = "nazev", poznamka = "poznamka", idRep = "idRep", rok = "rok", mesic = "mesic", ses = "ses", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", ses_n = "ses_n", ico_n = "ico_n", ucs_n = "ucs_n", uus_n = "uus_n", nks_n = "nks_n", ico_s = "ico_s", ucs_s = "ucs_s", uus_s = "uus_s", nks_s = "nks_s", flagSouhrne = "flagSouhrne", flagTextove = "flagTextove", flagVyberovaMaska = "flagVyberovaMaska", flagVlastniZahlavi = "flagVlastniZahlavi", ixs_msk_uzi = "ixs_msk_uzi", msk_uzi_nazev = "msk_uzi_nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", ixs_fun = "ixs_fun", typ_msk = "typ_msk", flagPap = "flagPap",}
	const enum GUcrDetailPozadavekBaseDtoFragments { ixs_ses = "*", nazev = "*", poznamka = "*", idRep = "*", rok = "*", mesic = "*", ses = "*", ico = "*", ucs = "*", uus = "*", nks = "*", ses_n = "*", ico_n = "*", ucs_n = "*", uus_n = "*", nks_n = "*", ico_s = "*", ucs_s = "*", uus_s = "*", nks_s = "*", flagSouhrne = "*", flagTextove = "*", flagVyberovaMaska = "*", flagVlastniZahlavi = "*", ixs_msk_uzi = "*", msk_uzi_nazev = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", ixs_fun = "*", typ_msk = "*", flagPap = "*",}
	const enum GUcrDetailPozadavekBaseDtoTypes { ixs_ses = "string", nazev = "string", poznamka = "string", idRep = "string", rok = "number", mesic = "number", ses = "string", ico = "string", ucs = "string", uus = "string", nks = "string", ses_n = "boolean", ico_n = "boolean", ucs_n = "boolean", uus_n = "boolean", nks_n = "boolean", ico_s = "boolean", ucs_s = "boolean", uus_s = "boolean", nks_s = "boolean", flagSouhrne = "boolean", flagTextove = "boolean", flagVyberovaMaska = "boolean", flagVlastniZahlavi = "boolean", ixs_msk_uzi = "string", msk_uzi_nazev = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", ixs_fun = "string", typ_msk = "number", flagPap = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ds\GUcrElement.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Element*/
	interface GUcrElementDto {
		/**DBCOLUMN:Element.ixs_msk*/
		ixs_msk?: string|null;
		/**DBCOLUMN:Element.radek*/
		radek?: number|null;
		/**DBCOLUMN:Element.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Element.ico_0*/
		ico_0?: string|null;
		/**DBCOLUMN:Element.ico_1*/
		ico_1?: string|null;
		/**DBCOLUMN:Element.ucs_0*/
		ucs_0?: string|null;
		/**DBCOLUMN:Element.ucs_1*/
		ucs_1?: string|null;
		/**DBCOLUMN:Element.uus_0*/
		uus_0?: string|null;
		/**DBCOLUMN:Element.uus_1*/
		uus_1?: string|null;
		/**DBCOLUMN:Element.nks_0*/
		nks_0?: string|null;
		/**DBCOLUMN:Element.nks_1*/
		nks_1?: string|null;
		/**DBCOLUMN:Element.uea_0*/
		uea_0?: string|null;
		/**DBCOLUMN:Element.ueb_0*/
		ueb_0?: string|null;
		/**DBCOLUMN:Element.uec_0*/
		uec_0?: string|null;
		/**DBCOLUMN:Element.ued_0*/
		ued_0?: string|null;
		/**DBCOLUMN:Element.uee_0*/
		uee_0?: string|null;
		/**DBCOLUMN:Element.uef_0*/
		uef_0?: string|null;
		/**DBCOLUMN:Element.ueg_0*/
		ueg_0?: string|null;
		/**DBCOLUMN:Element.ueh_0*/
		ueh_0?: string|null;
		/**DBCOLUMN:Element.uei_0*/
		uei_0?: string|null;
		/**DBCOLUMN:Element.uej_0*/
		uej_0?: string|null;
		/**DBCOLUMN:Element.te0_0*/
		te0_0?: string|null;
		/**DBCOLUMN:Element.te1_0*/
		te1_0?: string|null;
		/**DBCOLUMN:Element.te2_0*/
		te2_0?: string|null;
		/**DBCOLUMN:Element.te3_0*/
		te3_0?: string|null;
		/**DBCOLUMN:Element.te4_0*/
		te4_0?: string|null;
		/**DBCOLUMN:Element.uea_1*/
		uea_1?: string|null;
		/**DBCOLUMN:Element.ueb_1*/
		ueb_1?: string|null;
		/**DBCOLUMN:Element.uec_1*/
		uec_1?: string|null;
		/**DBCOLUMN:Element.ued_1*/
		ued_1?: string|null;
		/**DBCOLUMN:Element.uee_1*/
		uee_1?: string|null;
		/**DBCOLUMN:Element.uef_1*/
		uef_1?: string|null;
		/**DBCOLUMN:Element.ueg_1*/
		ueg_1?: string|null;
		/**DBCOLUMN:Element.ueh_1*/
		ueh_1?: string|null;
		/**DBCOLUMN:Element.uei_1*/
		uei_1?: string|null;
		/**DBCOLUMN:Element.uej_1*/
		uej_1?: string|null;
		/**DBCOLUMN:Element.te0_1*/
		te0_1?: string|null;
		/**DBCOLUMN:Element.te1_1*/
		te1_1?: string|null;
		/**DBCOLUMN:Element.te2_1*/
		te2_1?: string|null;
		/**DBCOLUMN:Element.te3_1*/
		te3_1?: string|null;
		/**DBCOLUMN:Element.te4_1*/
		te4_1?: string|null;
		/**DBCOLUMN:Element.den_0*/
		den_0?: number|null;
		/**DBCOLUMN:Element.mesic_0*/
		mesic_0?: number|null;
		/**DBCOLUMN:Element.rok_0*/
		rok_0?: number|null;
		/**DBCOLUMN:Element.ac_0*/
		ac_0?: string|null;
		/**DBCOLUMN:Element.c0_0*/
		c0_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.c1_0*/
		c1_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.c2_0*/
		c2_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.den_1*/
		den_1?: number|null;
		/**DBCOLUMN:Element.mesic_1*/
		mesic_1?: number|null;
		/**DBCOLUMN:Element.rok_1*/
		rok_1?: number|null;
		/**DBCOLUMN:Element.ac_1*/
		ac_1?: string|null;
		/**DBCOLUMN:Element.c0_1*/
		c0_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.c1_1*/
		c1_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.c2_1*/
		c2_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc0_0*/
		sc0_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc1_0*/
		sc1_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc2_0*/
		sc2_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc3_0*/
		sc3_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc4_0*/
		sc4_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc5_0*/
		sc5_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc6_0*/
		sc6_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc7_0*/
		sc7_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc8_0*/
		sc8_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc9_0*/
		sc9_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.kc0_0*/
		kc0_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.kc1_0*/
		kc1_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.kc2_0*/
		kc2_0?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc0_1*/
		sc0_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc1_1*/
		sc1_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc2_1*/
		sc2_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc3_1*/
		sc3_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc4_1*/
		sc4_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc5_1*/
		sc5_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc6_1*/
		sc6_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc7_1*/
		sc7_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc8_1*/
		sc8_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.sc9_1*/
		sc9_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.kc0_1*/
		kc0_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.kc1_1*/
		kc1_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.kc2_1*/
		kc2_1?: JsonDecimal|null;
		/**DBCOLUMN:Element.dat_zmena_0*/
		dat_zmena_0?: JsonDate|null;
		/**DBCOLUMN:Element.dat_zmena_1*/
		dat_zmena_1?: JsonDate|null;
		/**DBCOLUMN:Element.drd_msk*/
		drd_msk?: string|null;
		/**DBCOLUMN:Element.popis*/
		popis?: string|null;
		/**DBCOLUMN:Element.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Element.esu_ico*/
		esu_ico?: string|null;
		/**DBCOLUMN:Element.esu_rc*/
		esu_rc?: string|null;
		/**DBCOLUMN:Element.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:Element.id_hdr_ris_0*/
		id_hdr_ris_0?: string|null;
		/**DBCOLUMN:Element.id_hdr_ris_1*/
		id_hdr_ris_1?: string|null;
		/**DBCOLUMN:Element.radek_hdr_0*/
		radek_hdr_0?: number|null;
		/**DBCOLUMN:Element.radek_hdr_1*/
		radek_hdr_1?: number|null;
		/**DBCOLUMN:Element.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Element.s_ixp*/
		s_ixp?: number|null;
	}
	const enum GUcrElementDtoNames { ixs_msk = "ixs_msk", radek = "radek", nazev = "nazev", ico_0 = "ico_0", ico_1 = "ico_1", ucs_0 = "ucs_0", ucs_1 = "ucs_1", uus_0 = "uus_0", uus_1 = "uus_1", nks_0 = "nks_0", nks_1 = "nks_1", uea_0 = "uea_0", ueb_0 = "ueb_0", uec_0 = "uec_0", ued_0 = "ued_0", uee_0 = "uee_0", uef_0 = "uef_0", ueg_0 = "ueg_0", ueh_0 = "ueh_0", uei_0 = "uei_0", uej_0 = "uej_0", te0_0 = "te0_0", te1_0 = "te1_0", te2_0 = "te2_0", te3_0 = "te3_0", te4_0 = "te4_0", uea_1 = "uea_1", ueb_1 = "ueb_1", uec_1 = "uec_1", ued_1 = "ued_1", uee_1 = "uee_1", uef_1 = "uef_1", ueg_1 = "ueg_1", ueh_1 = "ueh_1", uei_1 = "uei_1", uej_1 = "uej_1", te0_1 = "te0_1", te1_1 = "te1_1", te2_1 = "te2_1", te3_1 = "te3_1", te4_1 = "te4_1", den_0 = "den_0", mesic_0 = "mesic_0", rok_0 = "rok_0", ac_0 = "ac_0", c0_0 = "c0_0", c1_0 = "c1_0", c2_0 = "c2_0", den_1 = "den_1", mesic_1 = "mesic_1", rok_1 = "rok_1", ac_1 = "ac_1", c0_1 = "c0_1", c1_1 = "c1_1", c2_1 = "c2_1", sc0_0 = "sc0_0", sc1_0 = "sc1_0", sc2_0 = "sc2_0", sc3_0 = "sc3_0", sc4_0 = "sc4_0", sc5_0 = "sc5_0", sc6_0 = "sc6_0", sc7_0 = "sc7_0", sc8_0 = "sc8_0", sc9_0 = "sc9_0", kc0_0 = "kc0_0", kc1_0 = "kc1_0", kc2_0 = "kc2_0", sc0_1 = "sc0_1", sc1_1 = "sc1_1", sc2_1 = "sc2_1", sc3_1 = "sc3_1", sc4_1 = "sc4_1", sc5_1 = "sc5_1", sc6_1 = "sc6_1", sc7_1 = "sc7_1", sc8_1 = "sc8_1", sc9_1 = "sc9_1", kc0_1 = "kc0_1", kc1_1 = "kc1_1", kc2_1 = "kc2_1", dat_zmena_0 = "dat_zmena_0", dat_zmena_1 = "dat_zmena_1", drd_msk = "drd_msk", popis = "popis", typ_ag = "typ_ag", esu_ico = "esu_ico", esu_rc = "esu_rc", esu_txt = "esu_txt", id_hdr_ris_0 = "id_hdr_ris_0", id_hdr_ris_1 = "id_hdr_ris_1", radek_hdr_0 = "radek_hdr_0", radek_hdr_1 = "radek_hdr_1", ixp = "ixp", s_ixp = "s_ixp",}
	const enum GUcrElementDtoFragments { ixs_msk = "*", radek = "*", nazev = "*", ico_0 = "*", ico_1 = "*", ucs_0 = "*", ucs_1 = "*", uus_0 = "*", uus_1 = "*", nks_0 = "*", nks_1 = "*", uea_0 = "*", ueb_0 = "*", uec_0 = "*", ued_0 = "*", uee_0 = "*", uef_0 = "*", ueg_0 = "*", ueh_0 = "*", uei_0 = "*", uej_0 = "*", te0_0 = "*", te1_0 = "*", te2_0 = "*", te3_0 = "*", te4_0 = "*", uea_1 = "*", ueb_1 = "*", uec_1 = "*", ued_1 = "*", uee_1 = "*", uef_1 = "*", ueg_1 = "*", ueh_1 = "*", uei_1 = "*", uej_1 = "*", te0_1 = "*", te1_1 = "*", te2_1 = "*", te3_1 = "*", te4_1 = "*", den_0 = "*", mesic_0 = "*", rok_0 = "*", ac_0 = "*", c0_0 = "*", c1_0 = "*", c2_0 = "*", den_1 = "*", mesic_1 = "*", rok_1 = "*", ac_1 = "*", c0_1 = "*", c1_1 = "*", c2_1 = "*", sc0_0 = "*", sc1_0 = "*", sc2_0 = "*", sc3_0 = "*", sc4_0 = "*", sc5_0 = "*", sc6_0 = "*", sc7_0 = "*", sc8_0 = "*", sc9_0 = "*", kc0_0 = "*", kc1_0 = "*", kc2_0 = "*", sc0_1 = "*", sc1_1 = "*", sc2_1 = "*", sc3_1 = "*", sc4_1 = "*", sc5_1 = "*", sc6_1 = "*", sc7_1 = "*", sc8_1 = "*", sc9_1 = "*", kc0_1 = "*", kc1_1 = "*", kc2_1 = "*", dat_zmena_0 = "*", dat_zmena_1 = "*", drd_msk = "*", popis = "*", typ_ag = "*", esu_ico = "*", esu_rc = "*", esu_txt = "*", id_hdr_ris_0 = "*", id_hdr_ris_1 = "*", radek_hdr_0 = "*", radek_hdr_1 = "*", ixp = "*", s_ixp = "*",}
	const enum GUcrElementDtoTypes { ixs_msk = "string", radek = "number", nazev = "string", ico_0 = "string", ico_1 = "string", ucs_0 = "string", ucs_1 = "string", uus_0 = "string", uus_1 = "string", nks_0 = "string", nks_1 = "string", uea_0 = "string", ueb_0 = "string", uec_0 = "string", ued_0 = "string", uee_0 = "string", uef_0 = "string", ueg_0 = "string", ueh_0 = "string", uei_0 = "string", uej_0 = "string", te0_0 = "string", te1_0 = "string", te2_0 = "string", te3_0 = "string", te4_0 = "string", uea_1 = "string", ueb_1 = "string", uec_1 = "string", ued_1 = "string", uee_1 = "string", uef_1 = "string", ueg_1 = "string", ueh_1 = "string", uei_1 = "string", uej_1 = "string", te0_1 = "string", te1_1 = "string", te2_1 = "string", te3_1 = "string", te4_1 = "string", den_0 = "number", mesic_0 = "number", rok_0 = "number", ac_0 = "string", c0_0 = "JsonDecimal", c1_0 = "JsonDecimal", c2_0 = "JsonDecimal", den_1 = "number", mesic_1 = "number", rok_1 = "number", ac_1 = "string", c0_1 = "JsonDecimal", c1_1 = "JsonDecimal", c2_1 = "JsonDecimal", sc0_0 = "JsonDecimal", sc1_0 = "JsonDecimal", sc2_0 = "JsonDecimal", sc3_0 = "JsonDecimal", sc4_0 = "JsonDecimal", sc5_0 = "JsonDecimal", sc6_0 = "JsonDecimal", sc7_0 = "JsonDecimal", sc8_0 = "JsonDecimal", sc9_0 = "JsonDecimal", kc0_0 = "JsonDecimal", kc1_0 = "JsonDecimal", kc2_0 = "JsonDecimal", sc0_1 = "JsonDecimal", sc1_1 = "JsonDecimal", sc2_1 = "JsonDecimal", sc3_1 = "JsonDecimal", sc4_1 = "JsonDecimal", sc5_1 = "JsonDecimal", sc6_1 = "JsonDecimal", sc7_1 = "JsonDecimal", sc8_1 = "JsonDecimal", sc9_1 = "JsonDecimal", kc0_1 = "JsonDecimal", kc1_1 = "JsonDecimal", kc2_1 = "JsonDecimal", dat_zmena_0 = "JsonDate", dat_zmena_1 = "JsonDate", drd_msk = "string", popis = "string", typ_ag = "number", esu_ico = "string", esu_rc = "string", esu_txt = "string", id_hdr_ris_0 = "string", id_hdr_ris_1 = "string", radek_hdr_0 = "number", radek_hdr_1 = "number", ixp = "string", s_ixp = "number",}
	const enum GUcrElementDtoTypeLengths { ico_0 = 10, ico_1 = 10, ucs_0 = 10, ucs_1 = 10, uus_0 = 10, uus_1 = 10, nks_0 = 12, nks_1 = 12, ac_0 = 20, ac_1 = 20, popis = 50, esu_ico = 10, esu_rc = 10, esu_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ds\GUcrSeznamPozadavku.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:SeznamPozadavku*/
	interface GUcrSeznamPozadavkuDto {
		/**DBCOLUMN:SeznamPozadavku.ixs_ses*/
		ixs_ses?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ixs_alv*/
		ixs_alv?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ixs_frm*/
		ixs_frm?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ixs_str*/
		ixs_str?: string|null;
		/**DBCOLUMN:SeznamPozadavku.priz_fos*/
		priz_fos?: number|null;
		/**DBCOLUMN:SeznamPozadavku.nazev_alv*/
		nazev_alv?: string|null;
		/**DBCOLUMN:SeznamPozadavku.nazev_frm*/
		nazev_frm?: string|null;
		/**DBCOLUMN:SeznamPozadavku.id_ses_alv*/
		id_ses_alv?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ixs_msk*/
		ixs_msk?: string|null;
		/**DBCOLUMN:SeznamPozadavku.msk_nazev*/
		msk_nazev?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ixs_msk_pev*/
		ixs_msk_pev?: string|null;
		/**DBCOLUMN:SeznamPozadavku.typ_sor*/
		typ_sor?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamPozadavku.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamPozadavku.uus*/
		uus?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ixs_sor*/
		ixs_sor?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ixs_sns*/
		ixs_sns?: string|null;
		/**DBCOLUMN:SeznamPozadavku.sns_nazev*/
		sns_nazev?: string|null;
		/**DBCOLUMN:SeznamPozadavku.typ_hro*/
		typ_hro?: number|null;
		/**DBCOLUMN:SeznamPozadavku.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamPozadavku.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:SeznamPozadavku.aktivita*/
		aktivita?: string|null;
		/**DBCOLUMN:SeznamPozadavku.rok_0*/
		rok_0?: number|null;
		/**DBCOLUMN:SeznamPozadavku.rok_1*/
		rok_1?: number|null;
		/**DBCOLUMN:SeznamPozadavku.mesic_0*/
		mesic_0?: number|null;
		/**DBCOLUMN:SeznamPozadavku.mesic_1*/
		mesic_1?: number|null;
		/**DBCOLUMN:SeznamPozadavku.den_0*/
		den_0?: number|null;
		/**DBCOLUMN:SeznamPozadavku.den_1*/
		den_1?: number|null;
		/**DBCOLUMN:SeznamPozadavku.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamPozadavku.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:SeznamPozadavku.mesic_comp*/
		mesic_comp?: string|null;
		/**DBCOLUMN:SeznamPozadavku.tabulka*/
		tabulka?: string|null;
		/**DBCOLUMN:SeznamPozadavku.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamPozadavku.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamPozadavku.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:SeznamPozadavku.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:SeznamPozadavku.typ_msk*/
		typ_msk?: number|null;
		/**DBCOLUMN:SeznamPozadavku.priz_pap*/
		priz_pap?: number|null;
		/**DBCOLUMN:SeznamPozadavku.zobr_msk*/
		zobr_msk?: number|null;
		/**DBCOLUMN:SeznamPozadavku.zobr_zah*/
		zobr_zah?: number|null;
	}
	const enum GUcrSeznamPozadavkuDtoNames { ixs_ses = "ixs_ses", ixs_alv = "ixs_alv", ixs_frm = "ixs_frm", ixs_str = "ixs_str", priz_fos = "priz_fos", nazev_alv = "nazev_alv", nazev_frm = "nazev_frm", id_ses_alv = "id_ses_alv", ixs_msk = "ixs_msk", msk_nazev = "msk_nazev", ixs_msk_pev = "ixs_msk_pev", typ_sor = "typ_sor", ico = "ico", ucs = "ucs", nks = "nks", uus = "uus", ixs_sor = "ixs_sor", ixs_sns = "ixs_sns", sns_nazev = "sns_nazev", typ_hro = "typ_hro", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", rok_0 = "rok_0", rok_1 = "rok_1", mesic_0 = "mesic_0", mesic_1 = "mesic_1", den_0 = "den_0", den_1 = "den_1", rok = "rok", mesic = "mesic", mesic_comp = "mesic_comp", tabulka = "tabulka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", ixs_fun = "ixs_fun", typ_msk = "typ_msk", priz_pap = "priz_pap", zobr_msk = "zobr_msk", zobr_zah = "zobr_zah",}
	const enum GUcrSeznamPozadavkuDtoFragments { ixs_ses = "ixs_ses", ixs_alv = "ixs_alv", ixs_frm = "ixs_frm", ixs_str = "ixs_str", priz_fos = "priz_fos", nazev_alv = "nazev_alv", nazev_frm = "nazev_frm", id_ses_alv = "id_ses_alv", ixs_msk = "ixs_msk", msk_nazev = "msk_nazev", ixs_msk_pev = "ixs_msk_pev", typ_sor = "typ_sor", ico = "ico", ucs = "ucs", nks = "nks", uus = "uus", ixs_sor = "ixs_sor", ixs_sns = "ixs_sns", sns_nazev = "sns_nazev", typ_hro = "typ_hro", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", rok_0 = "rok_0", rok_1 = "rok_1", mesic_0 = "mesic_0", mesic_1 = "mesic_1", den_0 = "den_0", den_1 = "den_1", rok = "rok", mesic = "mesic", mesic_comp = "mesic_comp", tabulka = "tabulka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", ixs_fun = "ixs_fun", typ_msk = "typ_msk", priz_pap = "priz_pap", zobr_msk = "zobr_msk", zobr_zah = "zobr_zah",}
	const enum GUcrSeznamPozadavkuDtoTypes { ixs_ses = "string", ixs_alv = "string", ixs_frm = "string", ixs_str = "string", priz_fos = "number", nazev_alv = "string", nazev_frm = "string", id_ses_alv = "string", ixs_msk = "string", msk_nazev = "string", ixs_msk_pev = "string", typ_sor = "string", ico = "string", ucs = "string", nks = "string", uus = "string", ixs_sor = "string", ixs_sns = "string", sns_nazev = "string", typ_hro = "number", nazev = "string", poznamka = "string", aktivita = "string", rok_0 = "number", rok_1 = "number", mesic_0 = "number", mesic_1 = "number", den_0 = "number", den_1 = "number", rok = "number", mesic = "number", mesic_comp = "string", tabulka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", ixs_fun = "string", typ_msk = "number", priz_pap = "number", zobr_msk = "number", zobr_zah = "number",}
	const enum GUcrSeznamPozadavkuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\GUcBaseRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Odpoved na pozadavek na nacteni hodnot*/
	interface GUcBaseRequestDto {
		/**Max. pocet nactenych zazznamu*/
		maxRecords?: number|null;
		/**Nastaveni*/
		Nastaveni?: Gordic.Uct.Interface.GUcrBaseNastaveniDto|null;
	}
	const enum GUcBaseRequestDtoNames { maxRecords = "maxRecords", Nastaveni = "Nastaveni",}
	const enum GUcBaseRequestDtoFragments { maxRecords = "*", Nastaveni = "*",}
	const enum GUcBaseRequestDtoTypes { maxRecords = "number", Nastaveni = "Gordic.Uct.Interface.GUcrBaseNastaveniDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\GUcrBaseNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO  Predek nastaveni akci*/
	interface GUcrBaseNastaveniDto {
		/**Otazka, zda pokracovat pri velkem mnoztvi dat*/
		OtazkaVelkeMnozstviZaznamu?: boolean|null;
	}
	const enum GUcrBaseNastaveniDtoNames { OtazkaVelkeMnozstviZaznamu = "OtazkaVelkeMnozstviZaznamu",}
	const enum GUcrBaseNastaveniDtoFragments { OtazkaVelkeMnozstviZaznamu = "*",}
	const enum GUcrBaseNastaveniDtoTypes { OtazkaVelkeMnozstviZaznamu = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\GUcrGlobalDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datovy objekt pro globalni nastaveni*/
	interface GUcrGlobalDto {
		/**Eko pamametry*/
		EkoParams?: Gordic.Uct.Interface.GUctEkoParamsDto|null;
		/**Parametry uct*/
		Params?: Gordic.Uct.Interface.GUcrParamsDto|null;
		/**Zkratky*/
		Zkratky?: Gordic.Uct.Interface.GUcrZkrDto|null;
		/**Texty*/
		Texty?: Gordic.Uct.Interface.GUcrTxtDto|null;
		/**Ostatni nastaveni*/
		Others?: Gordic.Uct.Interface.GUcrOtherParamsDto;
	}
	const enum GUcrGlobalDtoNames { EkoParams = "EkoParams", Params = "Params", Zkratky = "Zkratky", Texty = "Texty", Others = "Others",}
	const enum GUcrGlobalDtoFragments { EkoParams = "*", Params = "*", Zkratky = "*", Texty = "*", Others = "*",}
	const enum GUcrGlobalDtoTypes { EkoParams = "Gordic.Uct.Interface.GUctEkoParamsDto", Params = "Gordic.Uct.Interface.GUcrParamsDto", Zkratky = "Gordic.Uct.Interface.GUcrZkrDto", Texty = "Gordic.Uct.Interface.GUcrTxtDto", Others = "Gordic.Uct.Interface.GUcrOtherParamsDto",}
	const enum GUcrGlobalDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\GUcrOtherParamsDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Ostani nastaveni aplikace*/
	interface GUcrOtherParamsDto {
		/**Licence*/
		Licence?: string;
		/**Zastupny znak pouzivany pri filtrovani slova ucetni vety*/
		Wildcard?: string;
		/**Prihlasena funkce*/
		IxsFun?: string|null;
	}
	const enum GUcrOtherParamsDtoNames { Licence = "Licence", Wildcard = "Wildcard", IxsFun = "IxsFun",}
	const enum GUcrOtherParamsDtoFragments { Licence = "*", Wildcard = "*", IxsFun = "*",}
	const enum GUcrOtherParamsDtoTypes { Licence = "string", Wildcard = "string", IxsFun = "string",}
	const enum GUcrOtherParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\GUcrReportInfoDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Info o UCR sestave*/
	interface GUcrReportInfoDto {
		/**TypSestavy*/
		typSestavy?: Gordic.Uct.Interface.GUcrTypSestavy|null;
		/**Umi sumace*/
		umiSumace?: boolean|null;
		/**Umi hromadne?*/
		umiHro?: boolean|null;
		/**Informace o sestave*/
		reportInfo?: Gordic.Report.Interface.GReportInfoDto|null;
	}
	const enum GUcrReportInfoDtoNames { typSestavy = "typSestavy", umiSumace = "umiSumace", umiHro = "umiHro", reportInfo = "reportInfo",}
	const enum GUcrReportInfoDtoFragments { typSestavy = "*", umiSumace = "*", umiHro = "*", reportInfo = "*",}
	const enum GUcrReportInfoDtoTypes { typSestavy = "Gordic.Uct.Interface.GUcrTypSestavy", umiSumace = "boolean", umiHro = "boolean", reportInfo = "Gordic.Report.Interface.GReportInfoDto",}
	const enum GUcrReportInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\GUcrsexpDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datový objekt popisující Seznam exportovaných dávek.*/
	interface GUcrsexpDto {
		/**Identifikátor exp.*/
		ixs_exp?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Mesic.*/
		mesic?: number|null;
		/**Exp Typ.*/
		exp_typ?: string|null;
		/**Exp format.*/
		exp_format?: string|null;
		/**Soubor.*/
		soubor?: string|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Mail.*/
		mail?: string|null;
		/**Datum zmena exp.*/
		dat_zmena_exp?: JsonDate|null;
		/**Zmenu prov exp.*/
		zmenu_prov_exp?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**nazecRF změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**nazecRF změnu provedl exp.*/
		zmenu_prov_exp_txt?: string|null;
		/**priloha*/
		priloha?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GUcrsexpDtoNames { ixs_exp = "ixs_exp", rok = "rok", mesic = "mesic", exp_typ = "exp_typ", exp_format = "exp_format", soubor = "soubor", zkratka = "zkratka", popis = "popis", mail = "mail", dat_zmena_exp = "dat_zmena_exp", zmenu_prov_exp = "zmenu_prov_exp", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", zmenu_prov_exp_txt = "zmenu_prov_exp_txt", priloha = "priloha", pocet = "pocet",}
	const enum GUcrsexpDtoFragments { ixs_exp = "main", rok = "main", mesic = "main", exp_typ = "main", exp_format = "main", soubor = "main", zkratka = "main", popis = "main", mail = "main", dat_zmena_exp = "main", zmenu_prov_exp = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "main", zmenu_prov_exp_txt = "main", priloha = "main", pocet = "main",}
	const enum GUcrsexpDtoTypes { ixs_exp = "string", rok = "number", mesic = "number", exp_typ = "string", exp_format = "string", soubor = "string", zkratka = "string", popis = "string", mail = "string", dat_zmena_exp = "JsonDate", zmenu_prov_exp = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", zmenu_prov_exp_txt = "string", priloha = "string", pocet = "number",}
	const enum GUcrsexpDtoTypeLengths { ixs_exp = 12, exp_typ = 5, exp_format = 5, soubor = 254, zkratka = 16, popis = 254, mail = 254, zmenu_prov_exp = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\GUcrTxtDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Cele nazvy*/
	interface GUcrTxtDto {
		/**Nks*/
		Nks?: string;
		/**Ucs*/
		Ucs?: string;
		/**Uus*/
		Uus?: string;
		/**Ico*/
		Ico: string;
	}
	const enum GUcrTxtDtoNames { Nks = "Nks", Ucs = "Ucs", Uus = "Uus", Ico = "Ico",}
	const enum GUcrTxtDtoFragments { Nks = "*", Ucs = "*", Uus = "*", Ico = "*",}
	const enum GUcrTxtDtoTypes { Nks = "string", Ucs = "string", Uus = "string", Ico = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\GUcrZkrDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**ReadOnly DTO se zkratkami*/
	interface GUcrZkrDto {
		/**Nks*/
		Nks?: string;
		/**Ucs*/
		Ucs?: string;
		/**Uus*/
		Uus?: string;
		/**Ico*/
		Ico: string;
	}
	const enum GUcrZkrDtoNames { Nks = "Nks", Ucs = "Ucs", Uus = "Uus", Ico = "Ico",}
	const enum GUcrZkrDtoFragments { Nks = "*", Ucs = "*", Uus = "*", Ico = "*",}
	const enum GUcrZkrDtoTypes { Nks = "string", Ucs = "string", Uus = "string", Ico = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Async\GUcrZapisListAllRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na seznam uct zapisu*/
	interface GUcrZapisListAllRequestDto extends Gordic.Uct.Interface.GUcBaseRequestDto {
		/**Atribut logovani*/
		logovatGdpr?: boolean|null;
		/**Typ ulohy*/
		TypUlohy?: Gordic.Uct.Interface.GProhlizeniUctTaskType|null;
		/**Maska*/
		Maska?: Gordic.Uct.Interface.GUcrFilterDto|null;
		/**Maska2*/
		Maska2?: Gordic.Uct.Interface.GUcrFilterDto|null;
		/**Radek stavu*/
		RadekStavu?: Gordic.Uct.Interface.GUctSeznamZapisuStavuDto[]|null;
		/**Elementy*/
		Elementy?: Gordic.Uct.Interface.GEkoElementsDto|null;
		/**Filtr na strukturovany popis*/
		FilterStrPopis?: Gordic.Uct.Interface.GStrukturovanyPopisFilterDto[]|null;
	}
	const enum GUcrZapisListAllRequestDtoNames { logovatGdpr = "logovatGdpr", TypUlohy = "TypUlohy", Maska = "Maska", Maska2 = "Maska2", RadekStavu = "RadekStavu", Elementy = "Elementy", FilterStrPopis = "FilterStrPopis", maxRecords = "maxRecords", Nastaveni = "Nastaveni",}
	const enum GUcrZapisListAllRequestDtoFragments { logovatGdpr = "*", TypUlohy = "*", Maska = "*", Maska2 = "*", RadekStavu = "*", Elementy = "*", FilterStrPopis = "*", maxRecords = "*", Nastaveni = "*",}
	const enum GUcrZapisListAllRequestDtoTypes { logovatGdpr = "boolean", TypUlohy = "Gordic.Uct.Interface.GProhlizeniUctTaskType", Maska = "Gordic.Uct.Interface.GUcrFilterDto", Maska2 = "Gordic.Uct.Interface.GUcrFilterDto", RadekStavu = "Gordic.Uct.Interface.GUctSeznamZapisuStavuDto[]", Elementy = "Gordic.Uct.Interface.GEkoElementsDto", FilterStrPopis = "Gordic.Uct.Interface.GStrukturovanyPopisFilterDto[]", maxRecords = "number", Nastaveni = "Gordic.Uct.Interface.GUcrBaseNastaveniDto",}
	const enum GUcrZapisListAllRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\DPH\GEkocskoDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:ekocsko*/
	interface GEkocskoDto {
		/**DBCOLUMN:ekocsko.klic*/
		klic?: string|null;
		/**DBCOLUMN:ekocsko.klic_txt*/
		klic_txt?: string|null;
		/**DBCOLUMN:ekocsko.klic_typ*/
		klic_typ?: number|null;
		/**DBCOLUMN:ekocsko.klic_format*/
		klic_format?: string|null;
		/**DBCOLUMN:ekocsko.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekocsko.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:ekocsko.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:ekocsko.k_xml*/
		k_xml?: string|null;
	}
	const enum GEkocskoDtoNames { klic = "klic", klic_txt = "klic_txt", klic_typ = "klic_typ", klic_format = "klic_format", aktivita = "aktivita", k_v = "k_v", k_s = "k_s", k_xml = "k_xml",}
	const enum GEkocskoDtoFragments { klic = "*", klic_txt = "*", klic_typ = "*", klic_format = "*", aktivita = "*", k_v = "*", k_s = "*", k_xml = "*",}
	const enum GEkocskoDtoTypes { klic = "string", klic_txt = "string", klic_typ = "number", klic_format = "string", aktivita = "number", k_v = "number", k_s = "string", k_xml = "string",}
	const enum GEkocskoDtoTypeLengths { klic = 10, klic_txt = 254, klic_format = 254, k_s = 15, k_xml = 254,}
	/**ENUM:ekocsko*/
	const enum GEkocskoEnum {
		/**Datum doručení*/
		DDO="DDO",
		/**Datum evidence*/
		DEV="DEV",
		/**DIČ*/
		DIC="DIC",
		/**DIČ OLD*/
		DICO="DICO",
		/**Název subjektu*/
		DICT="DICT",
		/**Datum uplatnění daně*/
		DUD="DUD",
		/**Den uplatnění daně OLD*/
		DUDO="DUDO",
		/**Datum vystavení*/
		DVD="DVD",
		/**Datum zdanitelného plnění*/
		DZP="DZP",
		/**Evidenční číslo daňového dokladu*/
		ECDD="ECDD",
		/**Evidenční číslo daňového dokladu OLD*/
		ECDDO="ECDDO",
		/**Evidence, druh a číslo (IPD)*/
		EVK="EVK",
		/**Popis dokladu*/
		EVKT="EVKT",
		/**IČ*/
		IC="IC",
		/**Insolvenční rejstřík*/
		INR="INR",
		/**Odběratel – Fyzická osoba - datum narození*/
		OFDN="OFDN",
		/**Odběratel – Fyzická osoba - datum narození OLD*/
		OFDNO="OFDNO",
		/**Odběratel – Fyzická osoba - Jméno a příjmení*/
		OFJP="OFJP",
		/**Odběratel – Fyzická osoba - Místo pobytu*/
		OFMP="OFMP",
		/**Ostatní zdanitelná plnění do 10 000,-*/
		OZP="OZP",
		/**Příznak daňového dokladu*/
		PDD="PDD",
		/**PID*/
		PID="PID",
		/**Použit poměr*/
		POP="POP",
		/**Kód předmětu plnění - pro poskytnutá plnění, část A.1. Kontrolního hlášení DPH*/
		PPA="PPA",
		/**Kód předmětu plnění - pro přijatá plnění, část B.1. Kontrolního hlášení DPH*/
		PPB="PPB",
		/**Párovací symbol majetkového dokladu*/
		PSMAJ="PSMAJ",
	}
	function GEkocskoEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GEkocskoEnum, Gordic.Uct.Interface.GEkocskoDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\DPH\GEkoDanEvidenceListRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na seznam stavů Daňové evidence*/
	interface GEkoDanEvidenceListRequestDto {
		/**Maska*/
		Maska?: Gordic.Uct.Interface.GEkoSeznamDphFilterDto|null;
	}
	const enum GEkoDanEvidenceListRequestDtoNames { Maska = "Maska",}
	const enum GEkoDanEvidenceListRequestDtoFragments { Maska = "*",}
	const enum GEkoDanEvidenceListRequestDtoTypes { Maska = "Gordic.Uct.Interface.GEkoSeznamDphFilterDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\DPH\GEkoDanEvidenceListResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Odpoved  seznam stavů Daňové evidence*/
	interface GEkoDanEvidenceListResponseDto {
		/**Sloupce z cisleniku (Ekocsko)*/
		Cols?: Gordic.Uct.Interface.GEkocskoDto[]|null;
		/**Seznam hodnot*/
		ListValues?: any[]|null;
	}
	const enum GEkoDanEvidenceListResponseDtoNames { Cols = "Cols", ListValues = "ListValues",}
	const enum GEkoDanEvidenceListResponseDtoFragments { Cols = "*", ListValues = "*",}
	const enum GEkoDanEvidenceListResponseDtoTypes { Cols = "Gordic.Uct.Interface.GEkocskoDto[]", ListValues = "any[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\DPH\GEkoDanPriznaniListRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na seznam stavů Daňové evidence*/
	interface GEkoDanPriznaniListRequestDto extends Gordic.Uct.Interface.GEkoDanEvidenceListRequestDto {
		/**Sumarne*/
		Summary?: boolean|null;
		/**Limit dat*/
		Limit?: number|null;
	}
	const enum GEkoDanPriznaniListRequestDtoNames { Summary = "Summary", Limit = "Limit", Maska = "Maska",}
	const enum GEkoDanPriznaniListRequestDtoFragments { Summary = "*", Limit = "*", Maska = "*",}
	const enum GEkoDanPriznaniListRequestDtoTypes { Summary = "boolean", Limit = "number", Maska = "Gordic.Uct.Interface.GEkoSeznamDphFilterDto",}
	const enum GEkoDanPriznaniListRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\DPH\GEkoSeznamDphFilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:SeznamDph*/
	interface GEkoSeznamDphFilterDto {
		/**DBCOLUMN:SeznamDph.ico*/
		ico?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.ucs*/
		ucs?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.uus*/
		uus?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.rok*/
		rok?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDph.mesic*/
		mesic?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDph.uex_dph*/
		uex_dph?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.nazev*/
		nazev?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.priz_zobr*/
		priz_zobr?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.c_akt_1*/
		c_akt_1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_priz_1*/
		c_priz_1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_diff_1*/
		c_diff_1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_akt_2*/
		c_akt_2?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_priz_2*/
		c_priz_2?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_diff_2*/
		c_diff_2?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_akt_3*/
		c_akt_3?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_priz_3*/
		c_priz_3?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_diff_3*/
		c_diff_3?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_akt_4*/
		c_akt_4?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_priz_4*/
		c_priz_4?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_diff_4*/
		c_diff_4?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.radek_dph*/
		radek_dph?: GIntervalDto<string>|null;
	}
	const enum GEkoSeznamDphFilterDtoNames { ico = "ico", ucs = "ucs", uus = "uus", rok = "rok", mesic = "mesic", uex_dph = "uex_dph", nazev = "nazev", priz_zobr = "priz_zobr", c_akt_1 = "c_akt_1", c_priz_1 = "c_priz_1", c_diff_1 = "c_diff_1", c_akt_2 = "c_akt_2", c_priz_2 = "c_priz_2", c_diff_2 = "c_diff_2", c_akt_3 = "c_akt_3", c_priz_3 = "c_priz_3", c_diff_3 = "c_diff_3", c_akt_4 = "c_akt_4", c_priz_4 = "c_priz_4", c_diff_4 = "c_diff_4", radek_dph = "radek_dph",}
	const enum GEkoSeznamDphFilterDtoFragments { ico = "*", ucs = "*", uus = "*", rok = "*", mesic = "*", uex_dph = "*", nazev = "*", priz_zobr = "*", c_akt_1 = "*", c_priz_1 = "*", c_diff_1 = "*", c_akt_2 = "*", c_priz_2 = "*", c_diff_2 = "*", c_akt_3 = "*", c_priz_3 = "*", c_diff_3 = "*", c_akt_4 = "*", c_priz_4 = "*", c_diff_4 = "*", radek_dph = "*",}
	const enum GEkoSeznamDphFilterDtoTypes { ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", uex_dph = "GIntervalDto<string>", nazev = "GIntervalDto<string>", priz_zobr = "GIntervalDto<string>", c_akt_1 = "GIntervalDto<JsonDecimal>", c_priz_1 = "GIntervalDto<JsonDecimal>", c_diff_1 = "GIntervalDto<JsonDecimal>", c_akt_2 = "GIntervalDto<JsonDecimal>", c_priz_2 = "GIntervalDto<JsonDecimal>", c_diff_2 = "GIntervalDto<JsonDecimal>", c_akt_3 = "GIntervalDto<JsonDecimal>", c_priz_3 = "GIntervalDto<JsonDecimal>", c_diff_3 = "GIntervalDto<JsonDecimal>", c_akt_4 = "GIntervalDto<JsonDecimal>", c_priz_4 = "GIntervalDto<JsonDecimal>", c_diff_4 = "GIntervalDto<JsonDecimal>", radek_dph = "GIntervalDto<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Filtr\GUCRFilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Filtr pro dvou-radkovy filtr nad gridem*/
	interface GUcrFilterDto extends Gordic.Eko.Interface.GCfuTopoFilterDto {
		/**drd_msk*/
		drd_msk?: string|null;
		/**rok*/
		rok?: GIntervalDto<number>|null;
		/**mesic*/
		mesic?: GIntervalDto<number>|null;
		/**den*/
		den?: GIntervalDto<number>|null;
		/**Doklad*/
		ac?: GIntervalDto<string>|null;
		/**Popis dokladu*/
		pdok?: string|null;
		/**Popis dokladu*/
		popis?: string|null;
		/**MD*/
		c0?: GIntervalDto<JsonDecimal>|null;
		/**Dal*/
		c1?: GIntervalDto<JsonDecimal>|null;
		/**???*/
		c2?: GIntervalDto<JsonDecimal>|null;
		/**MD - Dal*/
		c0c1?: GIntervalDto<JsonDecimal>|null;
		/**AS MD*/
		c0_as?: GIntervalDto<JsonDecimal>|null;
		/**AS DAL*/
		c1_as?: GIntervalDto<JsonDecimal>|null;
		/**AS P-V*/
		c0c1_as?: GIntervalDto<JsonDecimal>|null;
		/**ROK DPH*/
		rok_uej?: GIntervalDto<number>|null;
		/**Mesic DPH*/
		mesic_uej?: GIntervalDto<number>|null;
		/**ZD*/
		zd?: GIntervalDto<number>|null;
		/**PID*/
		ixp?: Gordic.Uct.Interface.GUcrFilterDto.GEkoIxpFilterDto|null;
		/**PID Primarni*/
		ixp_prim?: string|null;
		/**Agendove cislo*/
		ac_ag?: GIntervalDto<string>|null;
		/**Datum zmeny*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**esu_txt*/
		esu_txt?: string|null;
		/**ixs_ico*/
		ixs_esu?: string|null;
		/**esu_ico*/
		esu_ico?: string|null;
		/**esu_rc*/
		esu_rc?: string|null;
		/**id_hdr_ris*/
		id_hdr_ris?: GIntervalDto<string>|null;
		/**ixs_msk*/
		ixs_msk?: string|null;
		/**Zmenu prov.*/
		nazev_rf?: string|null;
		/**typ dokuemntu*/
		ixs_typ?: string|null;
		/**generated*/
		kc0?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		kc1?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		kc2?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		nazev?: string|null;
		/**generated*/
		radek?: number|null;
		/**generated*/
		sc0?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc1?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc2?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc3?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc4?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc5?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc6?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc7?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc8?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc9?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		radek_hdr?: GIntervalDto<number>|null;
		/**generated*/
		te0?: GIntervalDto<string>|null;
		/**generated*/
		te1?: GIntervalDto<string>|null;
		/**generated*/
		te2?: GIntervalDto<string>|null;
		/**generated*/
		te3?: GIntervalDto<string>|null;
		/**generated*/
		te4?: GIntervalDto<string>|null;
		/**generated*/
		te5?: GIntervalDto<string>|null;
		/**generated*/
		te6?: GIntervalDto<string>|null;
		/**generated*/
		te7?: GIntervalDto<string>|null;
		/**generated*/
		te8?: GIntervalDto<string>|null;
		/**generated*/
		te9?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uea*/
		uea?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueb*/
		ueb?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uec*/
		uec?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ued*/
		ued?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uee*/
		uee?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uef*/
		uef?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueg*/
		ueg?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueh*/
		ueh?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uei*/
		uei?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uej*/
		uej?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uek*/
		uek?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uel*/
		uel?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uem*/
		uem?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uen*/
		uen?: GIntervalDto<string>|null;
		/**Status*/
		status?: boolean|null;
		/**Priznak blokace*/
		priz_blok?: number|null;
		rok_sml?: GIntervalDto<number>|null;
		cislo_sml?: GIntervalDto<number>|null;
		ixp_sml?: string|null;
		/**MD*/
		c_navrh?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_sl?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_cerpani_rs?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_ru?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_cerpani_ru?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_14?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_mrz?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_act?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_vz?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_sml?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_vz_sml?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_obj?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_obj_sml?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_obj_blk?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_fak?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_rsm?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_disp?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_uct?: GIntervalDto<JsonDecimal>|null;
		druh_char?: GIntervalDto<number>|null;
		priz_char?: GIntervalDto<number>|null;
		/**Par 1*/
		value0?: GIntervalDto<string>|null;
		/**Par 2*/
		value1?: GIntervalDto<string>|null;
	}
	const enum GUcrFilterDtoNames { drd_msk = "drd_msk", rok = "rok", mesic = "mesic", den = "den", ac = "ac", pdok = "pdok", popis = "popis", c0 = "c0", c1 = "c1", c2 = "c2", c0c1 = "c0c1", c0_as = "c0_as", c1_as = "c1_as", c0c1_as = "c0c1_as", rok_uej = "rok_uej", mesic_uej = "mesic_uej", zd = "zd", ixp = "ixp", ixp_prim = "ixp_prim", ac_ag = "ac_ag", dat_zmena = "dat_zmena", typ_ag = "typ_ag", esu_txt = "esu_txt", ixs_esu = "ixs_esu", esu_ico = "esu_ico", esu_rc = "esu_rc", id_hdr_ris = "id_hdr_ris", ixs_msk = "ixs_msk", nazev_rf = "nazev_rf", ixs_typ = "ixs_typ", kc0 = "kc0", kc1 = "kc1", kc2 = "kc2", nazev = "nazev", radek = "radek", sc0 = "sc0", sc1 = "sc1", sc2 = "sc2", sc3 = "sc3", sc4 = "sc4", sc5 = "sc5", sc6 = "sc6", sc7 = "sc7", sc8 = "sc8", sc9 = "sc9", radek_hdr = "radek_hdr", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", status = "status", priz_blok = "priz_blok", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ixp_sml = "ixp_sml", c_navrh = "c_navrh", c_sl = "c_sl", c_cerpani_rs = "c_cerpani_rs", c_ru = "c_ru", c_cerpani_ru = "c_cerpani_ru", c_14 = "c_14", c_mrz = "c_mrz", c_act = "c_act", c_vz = "c_vz", c_sml = "c_sml", c_vz_sml = "c_vz_sml", c_obj = "c_obj", c_obj_sml = "c_obj_sml", c_obj_blk = "c_obj_blk", c_fak = "c_fak", c_rsm = "c_rsm", c_disp = "c_disp", c_uct = "c_uct", druh_char = "druh_char", priz_char = "priz_char", value0 = "value0", value1 = "value1", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", cfu = "cfu",}
	const enum GUcrFilterDtoFragments { drd_msk = "*", rok = "*", mesic = "*", den = "*", ac = "*", pdok = "*", popis = "*", c0 = "*", c1 = "*", c2 = "*", c0c1 = "*", c0_as = "*", c1_as = "*", c0c1_as = "*", rok_uej = "*", mesic_uej = "*", zd = "*", ixp = "*", ixp_prim = "*", ac_ag = "*", dat_zmena = "*", typ_ag = "*", esu_txt = "*", ixs_esu = "*", esu_ico = "*", esu_rc = "*", id_hdr_ris = "*", ixs_msk = "*", nazev_rf = "*", ixs_typ = "*", kc0 = "*", kc1 = "*", kc2 = "*", nazev = "*", radek = "*", sc0 = "*", sc1 = "*", sc2 = "*", sc3 = "*", sc4 = "*", sc5 = "*", sc6 = "*", sc7 = "*", sc8 = "*", sc9 = "*", radek_hdr = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", status = "*", priz_blok = "*", rok_sml = "*", cislo_sml = "*", ixp_sml = "*", c_navrh = "*", c_sl = "*", c_cerpani_rs = "*", c_ru = "*", c_cerpani_ru = "*", c_14 = "*", c_mrz = "*", c_act = "*", c_vz = "*", c_sml = "*", c_vz_sml = "*", c_obj = "*", c_obj_sml = "*", c_obj_blk = "*", c_fak = "*", c_rsm = "*", c_disp = "*", c_uct = "*", druh_char = "*", priz_char = "*", value0 = "*", value1 = "*", ico = "*", ucs = "*", uus = "*", nks = "*", cfu = "*",}
	const enum GUcrFilterDtoTypes { drd_msk = "string", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", den = "GIntervalDto<number>", ac = "GIntervalDto<string>", pdok = "string", popis = "string", c0 = "GIntervalDto<JsonDecimal>", c1 = "GIntervalDto<JsonDecimal>", c2 = "GIntervalDto<JsonDecimal>", c0c1 = "GIntervalDto<JsonDecimal>", c0_as = "GIntervalDto<JsonDecimal>", c1_as = "GIntervalDto<JsonDecimal>", c0c1_as = "GIntervalDto<JsonDecimal>", rok_uej = "GIntervalDto<number>", mesic_uej = "GIntervalDto<number>", zd = "GIntervalDto<number>", ixp = "Gordic.Uct.Interface.GUcrFilterDto.GEkoIxpFilterDto", ixp_prim = "string", ac_ag = "GIntervalDto<string>", dat_zmena = "GIntervalDto<JsonDate>", typ_ag = "number", esu_txt = "string", ixs_esu = "string", esu_ico = "string", esu_rc = "string", id_hdr_ris = "GIntervalDto<string>", ixs_msk = "string", nazev_rf = "string", ixs_typ = "string", kc0 = "GIntervalDto<JsonDecimal>", kc1 = "GIntervalDto<JsonDecimal>", kc2 = "GIntervalDto<JsonDecimal>", nazev = "string", radek = "number", sc0 = "GIntervalDto<JsonDecimal>", sc1 = "GIntervalDto<JsonDecimal>", sc2 = "GIntervalDto<JsonDecimal>", sc3 = "GIntervalDto<JsonDecimal>", sc4 = "GIntervalDto<JsonDecimal>", sc5 = "GIntervalDto<JsonDecimal>", sc6 = "GIntervalDto<JsonDecimal>", sc7 = "GIntervalDto<JsonDecimal>", sc8 = "GIntervalDto<JsonDecimal>", sc9 = "GIntervalDto<JsonDecimal>", radek_hdr = "GIntervalDto<number>", te0 = "GIntervalDto<string>", te1 = "GIntervalDto<string>", te2 = "GIntervalDto<string>", te3 = "GIntervalDto<string>", te4 = "GIntervalDto<string>", te5 = "GIntervalDto<string>", te6 = "GIntervalDto<string>", te7 = "GIntervalDto<string>", te8 = "GIntervalDto<string>", te9 = "GIntervalDto<string>", uea = "GIntervalDto<string>", ueb = "GIntervalDto<string>", uec = "GIntervalDto<string>", ued = "GIntervalDto<string>", uee = "GIntervalDto<string>", uef = "GIntervalDto<string>", ueg = "GIntervalDto<string>", ueh = "GIntervalDto<string>", uei = "GIntervalDto<string>", uej = "GIntervalDto<string>", uek = "GIntervalDto<string>", uel = "GIntervalDto<string>", uem = "GIntervalDto<string>", uen = "GIntervalDto<string>", status = "boolean", priz_blok = "number", rok_sml = "GIntervalDto<number>", cislo_sml = "GIntervalDto<number>", ixp_sml = "string", c_navrh = "GIntervalDto<JsonDecimal>", c_sl = "GIntervalDto<JsonDecimal>", c_cerpani_rs = "GIntervalDto<JsonDecimal>", c_ru = "GIntervalDto<JsonDecimal>", c_cerpani_ru = "GIntervalDto<JsonDecimal>", c_14 = "GIntervalDto<JsonDecimal>", c_mrz = "GIntervalDto<JsonDecimal>", c_act = "GIntervalDto<JsonDecimal>", c_vz = "GIntervalDto<JsonDecimal>", c_sml = "GIntervalDto<JsonDecimal>", c_vz_sml = "GIntervalDto<JsonDecimal>", c_obj = "GIntervalDto<JsonDecimal>", c_obj_sml = "GIntervalDto<JsonDecimal>", c_obj_blk = "GIntervalDto<JsonDecimal>", c_fak = "GIntervalDto<JsonDecimal>", c_rsm = "GIntervalDto<JsonDecimal>", c_disp = "GIntervalDto<JsonDecimal>", c_uct = "GIntervalDto<JsonDecimal>", druh_char = "GIntervalDto<number>", priz_char = "GIntervalDto<number>", value0 = "GIntervalDto<string>", value1 = "GIntervalDto<string>", ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GUcrFilterDtoTypeLengths {}
}
declare namespace Gordic.Uct.Interface.GUcrFilterDto {
	/**Pomocna trida pro formular Gordic.Filter.ixp*/
	interface GEkoIxpFilterDto {
		/**PID*/
		ixp?: string|null;
		/**PID souvisejici*/
		ixp_s?: boolean|null;
	}
	const enum GEkoIxpFilterDtoNames { ixp = "ixp", ixp_s = "ixp_s",}
	const enum GEkoIxpFilterDtoFragments { ixp = "*", ixp_s = "*",}
	const enum GEkoIxpFilterDtoTypes { ixp = "string", ixp_s = "boolean",}
	const enum GEkoIxpFilterDtoTypeLengths {}
}
declare namespace Gordic.Uct.Interface {
	/**DTO elementu*/
	interface GEkoElementsDto {
		/**ixs_msk*/
		ixs_msk?: string|null;
		/**Jednotlive elementy*/
		filters?: Gordic.Uct.Interface.GUcrFilterDto[]|null;
	}
	const enum GEkoElementsDtoNames { ixs_msk = "ixs_msk", filters = "filters",}
	const enum GEkoElementsDtoFragments { ixs_msk = "*", filters = "*",}
	const enum GEkoElementsDtoTypes { ixs_msk = "string", filters = "Gordic.Uct.Interface.GUcrFilterDto[]",}
	const enum GEkoElementsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Filtr\GUcrMaskaDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO UCR masky*/
	interface GUcrMaskaDto extends Gordic.Gin.Interface.GSeznamMasekDto {
		/**platnost_od*/
		platnost_od?: JsonDate|null;
		/**platnost_do*/
		platnost_do?: JsonDate|null;
		/**zkratka*/
		zkratka?: string|null;
		/**typSestavy*/
		typSestavy?: Gordic.Uct.Interface.GUcrTypSestavy|null;
		elementy?: Gordic.Uct.Interface.GEkoElementsDto|null;
		filters?: Gordic.Uct.Interface.GUcrFilterDto[]|null;
	}
	const enum GUcrMaskaDtoNames { platnost_od = "platnost_od", platnost_do = "platnost_do", zkratka = "zkratka", typSestavy = "typSestavy", elementy = "elementy", filters = "filters", ixs_mas = "ixs_mas", gfilterpanel_name = "gfilterpanel_name", tema = "tema", typ_masky = "typ_masky", typ_masky_txt = "typ_masky_txt", gfilterpanel_poznamka = "gfilterpanel_poznamka", gfilterpanel_dat_zmena = "gfilterpanel_dat_zmena", gfilterpanel_zmenu_prov = "gfilterpanel_zmenu_prov", gfilterpanel_zmenu_prov_txt = "gfilterpanel_zmenu_prov_txt", gfilterpanel_aktivita = "gfilterpanel_aktivita", dataInFilter = "dataInFilter", dataInFilterString = "dataInFilterString",}
	const enum GUcrMaskaDtoFragments { platnost_od = "*", platnost_do = "*", zkratka = "*", typSestavy = "*", elementy = "elementy", filters = "elementy", ixs_mas = "*", gfilterpanel_name = "*", tema = "*", typ_masky = "*", typ_masky_txt = "*", gfilterpanel_poznamka = "*", gfilterpanel_dat_zmena = "*", gfilterpanel_zmenu_prov = "*", gfilterpanel_zmenu_prov_txt = "*", gfilterpanel_aktivita = "*", dataInFilter = "*", dataInFilterString = "*",}
	const enum GUcrMaskaDtoTypes { platnost_od = "JsonDate", platnost_do = "JsonDate", zkratka = "string", typSestavy = "Gordic.Uct.Interface.GUcrTypSestavy", elementy = "Gordic.Uct.Interface.GEkoElementsDto", filters = "Gordic.Uct.Interface.GUcrFilterDto[]", ixs_mas = "string", gfilterpanel_name = "string", tema = "string", typ_masky = "Gordic.Gin.Interface.TypMaskyEnum", typ_masky_txt = "string", gfilterpanel_poznamka = "string", gfilterpanel_dat_zmena = "JsonDate", gfilterpanel_zmenu_prov = "string", gfilterpanel_zmenu_prov_txt = "string", gfilterpanel_aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", dataInFilter = "Newtonsoft.Json.Linq.JObject", dataInFilterString = "string",}
	const enum GUcrMaskaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Info\GUcrInfoDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Info UCR*/
	interface GUcrInfoDto {
		/**Platnost*/
		Platnost?: Gordic.Uct.Interface.GUcrPlatnostDto|null;
		/**Textovy popis mesice (v pripade vyberu minuly, aktualni, max. otevreny a min. otevreny)*/
		MesicPopis?: string|null;
	}
	const enum GUcrInfoDtoNames { Platnost = "Platnost", MesicPopis = "MesicPopis",}
	const enum GUcrInfoDtoFragments { Platnost = "*", MesicPopis = "*",}
	const enum GUcrInfoDtoTypes { Platnost = "Gordic.Uct.Interface.GUcrPlatnostDto", MesicPopis = "string",}
	const enum GUcrInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Info\GUcrPlatnostDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Platnost*/
	interface GUcrPlatnostDto {
		/**Rok*/
		rok?: number|null;
		/**Mesic*/
		mesic?: number|null;
		/**Platnost*/
		platnost?: string|null;
		/**Platnost formatovana*/
		platnostformat?: string|null;
	}
	const enum GUcrPlatnostDtoNames { rok = "rok", mesic = "mesic", platnost = "platnost", platnostformat = "platnostformat",}
	const enum GUcrPlatnostDtoFragments { rok = "*", mesic = "*", platnost = "*", platnostformat = "*",}
	const enum GUcrPlatnostDtoTypes { rok = "number", mesic = "number", platnost = "string", platnostformat = "string",}
	const enum GUcrPlatnostDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Konsolidace\GUcrKonsolidaceStavyListFilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:SeznamDph*/
	interface GUcrKonsolidaceStavyListFilterDto {
		/**DBCOLUMN:SeznamDph.ico*/
		ico?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.ucs*/
		ucs?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.uus*/
		uus?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.uus*/
		nks?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.rok*/
		rok?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDph.mesic*/
		mesic?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDph.uex_dph*/
		id_kons?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.nazev*/
		ico_kons?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.c_akt_1*/
		c0_kons?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_priz_1*/
		c1_kons?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_diff_1*/
		c0c1_kons?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_diff_1*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		zmenu_prov?: GIntervalDto<string>|null;
	}
	const enum GUcrKonsolidaceStavyListFilterDtoNames { ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", rok = "rok", mesic = "mesic", id_kons = "id_kons", ico_kons = "ico_kons", c0_kons = "c0_kons", c1_kons = "c1_kons", c0c1_kons = "c0c1_kons", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GUcrKonsolidaceStavyListFilterDtoFragments { ico = "*", ucs = "*", uus = "*", nks = "*", rok = "*", mesic = "*", id_kons = "*", ico_kons = "*", c0_kons = "*", c1_kons = "*", c0c1_kons = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GUcrKonsolidaceStavyListFilterDtoTypes { ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", id_kons = "GIntervalDto<string>", ico_kons = "GIntervalDto<string>", c0_kons = "GIntervalDto<JsonDecimal>", c1_kons = "GIntervalDto<JsonDecimal>", c0c1_kons = "GIntervalDto<JsonDecimal>", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "GIntervalDto<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Konsolidace\GUcrKonsolidaceStavyListRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na seznam zapisu stavu*/
	interface GUcrKonsolidaceStavyListRequestDto extends Gordic.Uct.Interface.GUcBaseRequestDto {
		/**Maska*/
		Maska?: Gordic.Uct.Interface.GUcrKonsolidaceStavyListFilterDto|null;
		/**rok*/
		rok?: GBaseFilter<number>|null;
		/**mesic*/
		mesic?: GBaseFilter<number>|null;
		/**mesic*/
		ico?: GBaseFilter<string>|null;
	}
	const enum GUcrKonsolidaceStavyListRequestDtoNames { Maska = "Maska", rok = "rok", mesic = "mesic", ico = "ico", maxRecords = "maxRecords", Nastaveni = "Nastaveni",}
	const enum GUcrKonsolidaceStavyListRequestDtoFragments { Maska = "*", rok = "*", mesic = "*", ico = "*", maxRecords = "*", Nastaveni = "*",}
	const enum GUcrKonsolidaceStavyListRequestDtoTypes { Maska = "Gordic.Uct.Interface.GUcrKonsolidaceStavyListFilterDto", rok = "GBaseFilter<number>", mesic = "GBaseFilter<number>", ico = "GBaseFilter<string>", maxRecords = "number", Nastaveni = "Gordic.Uct.Interface.GUcrBaseNastaveniDto",}
	const enum GUcrKonsolidaceStavyListRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Obalkovac\GUcrObalkovacRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na obaleni XML souboru vykazu*/
	interface GUcrObalkovacRequestDto {
		/**informace o souboru*/
		FileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Infomace o odesilateli*/
		Sender?: Gordic.Uct.Interface.GUcrSenderDto|null;
		/**Idzpravy*/
		Idzpravy?: string|null;
	}
	const enum GUcrObalkovacRequestDtoNames { FileInfo = "FileInfo", Sender = "Sender", Idzpravy = "Idzpravy",}
	const enum GUcrObalkovacRequestDtoFragments { FileInfo = "*", Sender = "*", Idzpravy = "*",}
	const enum GUcrObalkovacRequestDtoTypes { FileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto", Sender = "Gordic.Uct.Interface.GUcrSenderDto", Idzpravy = "string",}
	const enum GUcrObalkovacRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Obalkovac\GUcrRecipientDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Prijemce - statni pokladna*/
	interface GUcrRecipientDto {
		/**ICO*/
		IC?: string|null;
		/**Jmeno sobjektu*/
		SubjectName?: string|null;
		/**Modul*/
		Module?: string|null;
	}
	const enum GUcrRecipientDtoNames { IC = "IC", SubjectName = "SubjectName", Module = "Module",}
	const enum GUcrRecipientDtoFragments { IC = "*", SubjectName = "*", Module = "*",}
	const enum GUcrRecipientDtoTypes { IC = "string", SubjectName = "string", Module = "string",}
	const enum GUcrRecipientDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Obalkovac\GUcrSenderDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Trida s informacemi o oesilateli do statni pokladny*/
	interface GUcrSenderDto {
		/**ICO*/
		IC?: string|null;
		/**Jmeno organizace*/
		SubjectName?: string|null;
		/**Jmeno odesilatele*/
		PesonalName?: string|null;
		/**Email odesiletele*/
		Email?: string|null;
		/**Cislo odesilatele evidovane v statni pokladne*/
		PersonalID?: string|null;
		/**cislo telefonu*/
		PhoneNumber?: string|null;
	}
	const enum GUcrSenderDtoNames { IC = "IC", SubjectName = "SubjectName", PesonalName = "PesonalName", Email = "Email", PersonalID = "PersonalID", PhoneNumber = "PhoneNumber",}
	const enum GUcrSenderDtoFragments { IC = "*", SubjectName = "*", PesonalName = "*", Email = "*", PersonalID = "*", PhoneNumber = "*",}
	const enum GUcrSenderDtoTypes { IC = "string", SubjectName = "string", PesonalName = "string", Email = "string", PersonalID = "string", PhoneNumber = "string",}
	const enum GUcrSenderDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Parametry\GUcrParamsDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO s podmnozinou parametru UCR*/
	interface GUcrParamsDto {
		/**IxsFun akt. prihl. uzivatele*/
		ixs_fun?: string|null;
		/**Pevna maska*/
		PevnaMaska?: Gordic.Uct.Interface.GUcrPevnaMaskaDto|null;
		/**Datum, ke kterému se vztahuje platnost pevné masky*/
		PlatnostPM?: string|null;
		/**Režim provozu*/
		RezimProvozu?: Gordic.Uct.Interface.GUcrRezimProvozu|null;
		/**Maximální režim provozu*/
		MaxRezimProvozu?: Gordic.Uct.Interface.GUcrRezimProvozu|null;
		/**Typ sumarizace*/
		TypSumarizace?: Gordic.Uct.Interface.GUcrTypSumarizace|null;
		/**predplnovani ucs*/
		PredplnUCS?: boolean|null;
		/**predplnovani pristupu k NS*/
		PredplnPri?: Gordic.Uct.Interface.GUcrTypPristupuNS|null;
		/**moznost nastaveni vlastniho zahlavi*/
		VlastniZahlavi?: boolean|null;
		/**povoleni na ulozeni noveho pozadavku*/
		Rad_NovyPozadavek?: boolean|null;
		/**povoleni na zruseni pozadavku*/
		Rad_ZrusPozadavek?: boolean|null;
		/**povoleni na zruseni cizich pozadavku*/
		Rad_ZrusCiziPozadavek?: boolean|null;
		/**povoleni na ulozeni nove masky*/
		Rad_NovaMaska?: boolean|null;
		/**povoleni na zruseni masky*/
		Rad_ZrusMasku?: boolean|null;
		/**odeslání sestavy generované mailem*/
		Rad_OdeslatMail?: boolean|null;
		/**povolení prohlížení Financování*/
		Rad_Financovani?: boolean|null;
		/**povolení prohlížení DPH*/
		Rad_Dph?: boolean|null;
		/**povolení Registru P/Z*/
		Rad_Rzp?: boolean|null;
		/**Povoleni menit hodnoty v registru P/Z*/
		RPZ_Povoleni_Menit_Hodnoty?: boolean|null;
		/**Povoeleni v registru P/Z zmenit prim. doklad*/
		RPZ_Povoleni_Menit_PRIM_DOKL?: boolean|null;
		/**povolení Vykaznictvi DU*/
		Rad_Vdu?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**režim zpracování DPH*/
		Dph_Rezim?: Gordic.Uct.Interface.GUcrRezimDph|null;
		/**ŘP - Možnost mít prázdnou pevnou masku. Při false nezobrazí nic pokud nemá administovánu pevnou masku.*/
		Rad_DefaultSes?: boolean|null;
		/**možnost nabídky subřad na F4 na polích ac*/
		Rad_NabidkaSubrad?: boolean|null;
		/**možnost zobrazení rozdílu MD-Dal v prohlížení*/
		Rad_ZobrazMdDal?: boolean|null;
		/**mazání cizích požadavků ODL*/
		Rad_ZrusCiziODL?: boolean|null;
		/**editace cizích požadavků ODL*/
		Rad_EditCiziODL?: boolean|null;
		/**povolení ODL*/
		Rad_ODLEnabled?: boolean|null;
		/**Povoleni PAP kontrol a oprav*/
		Rad_Pap?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**Povoleni prepoctu stavu od zacatku roku*/
		Rad_PapRocniPrepocetStavu?: boolean|null;
		/**Povoleni zauctovani pap zapisu*/
		Rad_PapPovoleniZauctovani?: boolean|null;
		/**Atribut, zda kontrolovat strany v PAP*/
		Rad_PapKontrolovatStrany?: boolean|null;
		/**Rezim zpracovani vykazu v PAP nastroji*/
		RezimZpracovaniPap?: Gordic.Uct.Interface.GERezimZpracovaniPap|null;
		/**Rezim zatridovani analytik*/
		RezimZatridovani?: Gordic.Uct.Interface.GERezimZatridovaniAnalytikPap|null;
		/**Rezim vyrovnavani pripadu pap zapisy*/
		RezimVyrovnavaniPripadu?: Gordic.Uct.Interface.GERezimVyrovnavaniPripaduPap|null;
		/**Filtrovani na tridy 7,8,9*/
		FiltrNaTridy789Pap?: string|null;
		/**povolení RISRE*/
		Rad_Risre?: Gordic.Uct.Interface.GUcrZobrazeniRisre|null;
		/**povolení RISRE/PS dávky rezervací*/
		Rad_Risdrez?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**povolení RISRE/PS dávky rozpočtu*/
		Rad_Risdrop?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**povolení RISRE IISSP stavy rezervaci*/
		Rad_RisStav?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**povolení RISRE IISSP stavy rozpoctu a cerpani (Inbox)*/
		Rad_RisStrc?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**povolení RISRE IISSP stavy skutecnosti (Inbox)*/
		Rad_RisStsk?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**povolení RISRE IISSP stavy skutecnosti (Inbox)*/
		Rad_RisVyka?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**způsob odeslání RISRE/PS*/
		Rad_RisOdes?: Gordic.Uct.Interface.GUcrRisrePsOdes|null;
		/**povolení Konsolidace*/
		Rad_Konsolidace?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**povolení Ukazatele*/
		Rad_Ukazatele?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**povolení Ukazatele VLZR*/
		Rad_UkazateleVL?: Gordic.Uct.Interface.GUcrZobrazeniVdu|null;
		/**RezimZobrazeniUlohyFinancovani*/
		RezimZobrazeniUlohyFinancovani?: Gordic.Uct.Interface.GUcrRezimZobrazeniFinancovani|null;
		/**PevnaMaskaName*/
		PevnaMaskaName?: string|null;
		/**nastavení prace s WFL*/
		TypPraceWfl?: Gordic.Uct.Interface.GUcrTypPraceWfl|null;
		/**nastavení prace s ESU*/
		TypPraceESU?: Gordic.Uct.Interface.GUcrTypPraceESU|null;
		/**možnost zobrazeni RČ*/
		Rad_Esu_RcZobr?: boolean|null;
		/**možnost vyhledávání RČ*/
		Rad_Esu_RcVyhl?: boolean|null;
		/**Délka AC pro UCT*/
		DelkaAcUct?: number|null;
		/**Délka AC pro ROZ*/
		DelkaAcRoz?: number|null;
		/**Max(DelkaAcUct, DelkaAcRoz)*/
		DelkaAcMax?: number|null;
		/**Příznak, zda je aktuální období (EkoParams.Rok) otevřené (aktivita 100)*/
		OtevreneObdobi?: boolean|null;
		/**Priznak externi sumarizace*/
		ExterniSumarizace?: boolean|null;
		/**povolení zobrazeni cerpani RU, RS v procentech*/
		ZobrazeniCerpaniRozpoctuVProcentech?: boolean|null;
		/**Řízení přístupu - které druhy dokladu se budou ze stavů zobrazovat*/
		RozsahFinancovani?: Gordic.Uct.Interface.GERozsahFinancovani|null;
		/**Povoleni editovat popisy a radky ucetnich dokladu*/
		PovoleniEditacePopisuUCTDokladu?: boolean|null;
		/**Povoleni editovat popisy a radky rozpoctovych dokladu*/
		PovoleniEditacePopisuROZDokladu?: boolean|null;
		/**Povoleni editace zapisu dokladu*/
		PovoleniEditaceZapisuDokladu?: Gordic.Uct.Interface.GEUcrPovoleniEditaceZapisu|null;
		/**Povoleni editace zapisu dokladu*/
		PovoleniZobrazeniNeaktivnichZapisu?: boolean|null;
		/**Povoleni zobrazeni strednedobeho vyhledu*/
		PovoleniZobrazeniStrednedobehoVyhledu?: boolean|null;
		/**Povoleni ulohy saldokonto*/
		PovoleniUlohySaldokonto?: boolean|null;
		/**Saldokonto - vyber 1. sloupec 1. úrovně*/
		SaldokontoParam1?: string|null;
		/**Saldokonto - vyber 2. sloupec 1. úrovně*/
		SaldokontoParam2?: string|null;
	}
	const enum GUcrParamsDtoNames { ixs_fun = "ixs_fun", PevnaMaska = "PevnaMaska", PlatnostPM = "PlatnostPM", RezimProvozu = "RezimProvozu", MaxRezimProvozu = "MaxRezimProvozu", TypSumarizace = "TypSumarizace", PredplnUCS = "PredplnUCS", PredplnPri = "PredplnPri", VlastniZahlavi = "VlastniZahlavi", Rad_NovyPozadavek = "Rad_NovyPozadavek", Rad_ZrusPozadavek = "Rad_ZrusPozadavek", Rad_ZrusCiziPozadavek = "Rad_ZrusCiziPozadavek", Rad_NovaMaska = "Rad_NovaMaska", Rad_ZrusMasku = "Rad_ZrusMasku", Rad_OdeslatMail = "Rad_OdeslatMail", Rad_Financovani = "Rad_Financovani", Rad_Dph = "Rad_Dph", Rad_Rzp = "Rad_Rzp", RPZ_Povoleni_Menit_Hodnoty = "RPZ_Povoleni_Menit_Hodnoty", RPZ_Povoleni_Menit_PRIM_DOKL = "RPZ_Povoleni_Menit_PRIM_DOKL", Rad_Vdu = "Rad_Vdu", Dph_Rezim = "Dph_Rezim", Rad_DefaultSes = "Rad_DefaultSes", Rad_NabidkaSubrad = "Rad_NabidkaSubrad", Rad_ZobrazMdDal = "Rad_ZobrazMdDal", Rad_ZrusCiziODL = "Rad_ZrusCiziODL", Rad_EditCiziODL = "Rad_EditCiziODL", Rad_ODLEnabled = "Rad_ODLEnabled", Rad_Pap = "Rad_Pap", Rad_PapRocniPrepocetStavu = "Rad_PapRocniPrepocetStavu", Rad_PapPovoleniZauctovani = "Rad_PapPovoleniZauctovani", Rad_PapKontrolovatStrany = "Rad_PapKontrolovatStrany", RezimZpracovaniPap = "RezimZpracovaniPap", RezimZatridovani = "RezimZatridovani", RezimVyrovnavaniPripadu = "RezimVyrovnavaniPripadu", FiltrNaTridy789Pap = "FiltrNaTridy789Pap", Rad_Risre = "Rad_Risre", Rad_Risdrez = "Rad_Risdrez", Rad_Risdrop = "Rad_Risdrop", Rad_RisStav = "Rad_RisStav", Rad_RisStrc = "Rad_RisStrc", Rad_RisStsk = "Rad_RisStsk", Rad_RisVyka = "Rad_RisVyka", Rad_RisOdes = "Rad_RisOdes", Rad_Konsolidace = "Rad_Konsolidace", Rad_Ukazatele = "Rad_Ukazatele", Rad_UkazateleVL = "Rad_UkazateleVL", RezimZobrazeniUlohyFinancovani = "RezimZobrazeniUlohyFinancovani", PevnaMaskaName = "PevnaMaskaName", TypPraceWfl = "TypPraceWfl", TypPraceESU = "TypPraceESU", Rad_Esu_RcZobr = "Rad_Esu_RcZobr", Rad_Esu_RcVyhl = "Rad_Esu_RcVyhl", DelkaAcUct = "DelkaAcUct", DelkaAcRoz = "DelkaAcRoz", DelkaAcMax = "DelkaAcMax", OtevreneObdobi = "OtevreneObdobi", ExterniSumarizace = "ExterniSumarizace", ZobrazeniCerpaniRozpoctuVProcentech = "ZobrazeniCerpaniRozpoctuVProcentech", RozsahFinancovani = "RozsahFinancovani", PovoleniEditacePopisuUCTDokladu = "PovoleniEditacePopisuUCTDokladu", PovoleniEditacePopisuROZDokladu = "PovoleniEditacePopisuROZDokladu", PovoleniEditaceZapisuDokladu = "PovoleniEditaceZapisuDokladu", PovoleniZobrazeniNeaktivnichZapisu = "PovoleniZobrazeniNeaktivnichZapisu", PovoleniZobrazeniStrednedobehoVyhledu = "PovoleniZobrazeniStrednedobehoVyhledu", PovoleniUlohySaldokonto = "PovoleniUlohySaldokonto", SaldokontoParam1 = "SaldokontoParam1", SaldokontoParam2 = "SaldokontoParam2",}
	const enum GUcrParamsDtoFragments { ixs_fun = "*", PevnaMaska = "*", PlatnostPM = "*", RezimProvozu = "*", MaxRezimProvozu = "*", TypSumarizace = "*", PredplnUCS = "*", PredplnPri = "*", VlastniZahlavi = "*", Rad_NovyPozadavek = "*", Rad_ZrusPozadavek = "*", Rad_ZrusCiziPozadavek = "*", Rad_NovaMaska = "*", Rad_ZrusMasku = "*", Rad_OdeslatMail = "*", Rad_Financovani = "*", Rad_Dph = "*", Rad_Rzp = "*", RPZ_Povoleni_Menit_Hodnoty = "*", RPZ_Povoleni_Menit_PRIM_DOKL = "*", Rad_Vdu = "*", Dph_Rezim = "*", Rad_DefaultSes = "*", Rad_NabidkaSubrad = "*", Rad_ZobrazMdDal = "*", Rad_ZrusCiziODL = "*", Rad_EditCiziODL = "*", Rad_ODLEnabled = "*", Rad_Pap = "*", Rad_PapRocniPrepocetStavu = "*", Rad_PapPovoleniZauctovani = "*", Rad_PapKontrolovatStrany = "*", RezimZpracovaniPap = "*", RezimZatridovani = "*", RezimVyrovnavaniPripadu = "*", FiltrNaTridy789Pap = "*", Rad_Risre = "*", Rad_Risdrez = "*", Rad_Risdrop = "*", Rad_RisStav = "*", Rad_RisStrc = "*", Rad_RisStsk = "*", Rad_RisVyka = "*", Rad_RisOdes = "*", Rad_Konsolidace = "*", Rad_Ukazatele = "*", Rad_UkazateleVL = "*", RezimZobrazeniUlohyFinancovani = "*", PevnaMaskaName = "*", TypPraceWfl = "*", TypPraceESU = "*", Rad_Esu_RcZobr = "*", Rad_Esu_RcVyhl = "*", DelkaAcUct = "*", DelkaAcRoz = "*", DelkaAcMax = "*", OtevreneObdobi = "*", ExterniSumarizace = "*", ZobrazeniCerpaniRozpoctuVProcentech = "*", RozsahFinancovani = "*", PovoleniEditacePopisuUCTDokladu = "*", PovoleniEditacePopisuROZDokladu = "*", PovoleniEditaceZapisuDokladu = "*", PovoleniZobrazeniNeaktivnichZapisu = "*", PovoleniZobrazeniStrednedobehoVyhledu = "*", PovoleniUlohySaldokonto = "*", SaldokontoParam1 = "*", SaldokontoParam2 = "*",}
	const enum GUcrParamsDtoTypes { ixs_fun = "string", PevnaMaska = "Gordic.Uct.Interface.GUcrPevnaMaskaDto", PlatnostPM = "string", RezimProvozu = "Gordic.Uct.Interface.GUcrRezimProvozu", MaxRezimProvozu = "Gordic.Uct.Interface.GUcrRezimProvozu", TypSumarizace = "Gordic.Uct.Interface.GUcrTypSumarizace", PredplnUCS = "boolean", PredplnPri = "Gordic.Uct.Interface.GUcrTypPristupuNS", VlastniZahlavi = "boolean", Rad_NovyPozadavek = "boolean", Rad_ZrusPozadavek = "boolean", Rad_ZrusCiziPozadavek = "boolean", Rad_NovaMaska = "boolean", Rad_ZrusMasku = "boolean", Rad_OdeslatMail = "boolean", Rad_Financovani = "boolean", Rad_Dph = "boolean", Rad_Rzp = "boolean", RPZ_Povoleni_Menit_Hodnoty = "boolean", RPZ_Povoleni_Menit_PRIM_DOKL = "boolean", Rad_Vdu = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Dph_Rezim = "Gordic.Uct.Interface.GUcrRezimDph", Rad_DefaultSes = "boolean", Rad_NabidkaSubrad = "boolean", Rad_ZobrazMdDal = "boolean", Rad_ZrusCiziODL = "boolean", Rad_EditCiziODL = "boolean", Rad_ODLEnabled = "boolean", Rad_Pap = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Rad_PapRocniPrepocetStavu = "boolean", Rad_PapPovoleniZauctovani = "boolean", Rad_PapKontrolovatStrany = "boolean", RezimZpracovaniPap = "Gordic.Uct.Interface.GERezimZpracovaniPap", RezimZatridovani = "Gordic.Uct.Interface.GERezimZatridovaniAnalytikPap", RezimVyrovnavaniPripadu = "Gordic.Uct.Interface.GERezimVyrovnavaniPripaduPap", FiltrNaTridy789Pap = "string", Rad_Risre = "Gordic.Uct.Interface.GUcrZobrazeniRisre", Rad_Risdrez = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Rad_Risdrop = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Rad_RisStav = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Rad_RisStrc = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Rad_RisStsk = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Rad_RisVyka = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Rad_RisOdes = "Gordic.Uct.Interface.GUcrRisrePsOdes", Rad_Konsolidace = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Rad_Ukazatele = "Gordic.Uct.Interface.GUcrZobrazeniVdu", Rad_UkazateleVL = "Gordic.Uct.Interface.GUcrZobrazeniVdu", RezimZobrazeniUlohyFinancovani = "Gordic.Uct.Interface.GUcrRezimZobrazeniFinancovani", PevnaMaskaName = "string", TypPraceWfl = "Gordic.Uct.Interface.GUcrTypPraceWfl", TypPraceESU = "Gordic.Uct.Interface.GUcrTypPraceESU", Rad_Esu_RcZobr = "boolean", Rad_Esu_RcVyhl = "boolean", DelkaAcUct = "number", DelkaAcRoz = "number", DelkaAcMax = "number", OtevreneObdobi = "boolean", ExterniSumarizace = "boolean", ZobrazeniCerpaniRozpoctuVProcentech = "boolean", RozsahFinancovani = "Gordic.Uct.Interface.GERozsahFinancovani", PovoleniEditacePopisuUCTDokladu = "boolean", PovoleniEditacePopisuROZDokladu = "boolean", PovoleniEditaceZapisuDokladu = "Gordic.Uct.Interface.GEUcrPovoleniEditaceZapisu", PovoleniZobrazeniNeaktivnichZapisu = "boolean", PovoleniZobrazeniStrednedobehoVyhledu = "boolean", PovoleniUlohySaldokonto = "boolean", SaldokontoParam1 = "string", SaldokontoParam2 = "string",}
	const enum GUcrParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Parametry\GUcrPevnaMaskaDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pevne masky*/
	interface GUcrPevnaMaskaDto {
		/**Je použita pevná maska?*/
		Active?: boolean|null;
		/**Jméno pevné masky*/
		Name?: string|null;
	}
	const enum GUcrPevnaMaskaDtoNames { Active = "Active", Name = "Name",}
	const enum GUcrPevnaMaskaDtoFragments { Active = "*", Name = "*",}
	const enum GUcrPevnaMaskaDtoTypes { Active = "boolean", Name = "string",}
	const enum GUcrPevnaMaskaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Pozadavky\GUcrPozadavekDetailDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO objekt detailu pozadavku (v budoucnu mozna bude model)*/
	interface GUcrPozadavekDetailDto {
		/**IxsSes*/
		IxsSes?: string|null;
		/**Nazev*/
		Nazev?: string|null;
		/**Poznamka*/
		Poznamka?: string|null;
		/**Rok*/
		Rok?: number|null;
		/**Mesic*/
		Mesic?: number|null;
		/**Nazev vystupu*/
		Vystup?: string|null;
		/**TypPozadavku*/
		TypPozadavku?: Gordic.Uct.Interface.GUcrTypMasky|null;
		/**VyberovaMaska*/
		VyberovaMaska?: boolean|null;
		/**VlastniZahlavi*/
		VlastniZahlavi?: boolean|null;
		/**Seskupeni*/
		ses?: string|null;
		ses_n?: boolean|null;
		/**Ico (plati pro vsechny krome externi sumarizace)*/
		ico?: string|null;
		/**Ico (plati pouze pro externi sumarizaci)*/
		IcoExt?: string|null;
		ico_n?: boolean|null;
		ico_s?: boolean|null;
		ucs?: string|null;
		ucs_n?: boolean|null;
		ucs_s?: boolean|null;
		uus?: string|null;
		uus_n?: boolean|null;
		uus_s?: boolean|null;
		nks?: string|null;
		nks_n?: boolean|null;
		nks_s?: boolean|null;
		flagSouhrne?: string|null;
		/**Jednotlive elementy*/
		elements?: Gordic.Uct.Interface.GUcrFilterDto[]|null;
		/**Nazev masky*/
		msk_uzi_nazev?: string|null;
		/**Ixs masky*/
		ixs_msk_uzi?: string|null;
		/**Flag pap*/
		flagPap?: boolean|null;
		/**Identifikator sestavy*/
		Wrid?: string|null;
		/**Typ vystupu*/
		OutputStyle?: string|null;
		/**Nazev vystupniho formatu v lidsky citelne forme*/
		OutputStyleName?: string|null;
		/**Platnost sestav*/
		platnost?: string|null;
		/**ReportInfo*/
		ReportInfo?: Gordic.Uct.Interface.GUcrReportInfoDto|null;
	}
	const enum GUcrPozadavekDetailDtoNames { IxsSes = "IxsSes", Nazev = "Nazev", Poznamka = "Poznamka", Rok = "Rok", Mesic = "Mesic", Vystup = "Vystup", TypPozadavku = "TypPozadavku", VyberovaMaska = "VyberovaMaska", VlastniZahlavi = "VlastniZahlavi", ses = "ses", ses_n = "ses_n", ico = "ico", IcoExt = "IcoExt", ico_n = "ico_n", ico_s = "ico_s", ucs = "ucs", ucs_n = "ucs_n", ucs_s = "ucs_s", uus = "uus", uus_n = "uus_n", uus_s = "uus_s", nks = "nks", nks_n = "nks_n", nks_s = "nks_s", flagSouhrne = "flagSouhrne", elements = "elements", msk_uzi_nazev = "msk_uzi_nazev", ixs_msk_uzi = "ixs_msk_uzi", flagPap = "flagPap", Wrid = "Wrid", OutputStyle = "OutputStyle", OutputStyleName = "OutputStyleName", platnost = "platnost", ReportInfo = "ReportInfo",}
	const enum GUcrPozadavekDetailDtoFragments { IxsSes = "*", Nazev = "*", Poznamka = "*", Rok = "*", Mesic = "*", Vystup = "*", TypPozadavku = "*", VyberovaMaska = "*", VlastniZahlavi = "*", ses = "*", ses_n = "*", ico = "*", IcoExt = "*", ico_n = "*", ico_s = "*", ucs = "*", ucs_n = "*", ucs_s = "*", uus = "*", uus_n = "*", uus_s = "*", nks = "*", nks_n = "*", nks_s = "*", flagSouhrne = "*", elements = "*", msk_uzi_nazev = "*", ixs_msk_uzi = "*", flagPap = "*", Wrid = "*", OutputStyle = "*", OutputStyleName = "*", platnost = "*", ReportInfo = "*",}
	const enum GUcrPozadavekDetailDtoTypes { IxsSes = "string", Nazev = "string", Poznamka = "string", Rok = "number", Mesic = "number", Vystup = "string", TypPozadavku = "Gordic.Uct.Interface.GUcrTypMasky", VyberovaMaska = "boolean", VlastniZahlavi = "boolean", ses = "string", ses_n = "boolean", ico = "string", IcoExt = "string", ico_n = "boolean", ico_s = "boolean", ucs = "string", ucs_n = "boolean", ucs_s = "boolean", uus = "string", uus_n = "boolean", uus_s = "boolean", nks = "string", nks_n = "boolean", nks_s = "boolean", flagSouhrne = "string", elements = "Gordic.Uct.Interface.GUcrFilterDto[]", msk_uzi_nazev = "string", ixs_msk_uzi = "string", flagPap = "boolean", Wrid = "string", OutputStyle = "string", OutputStyleName = "string", platnost = "string", ReportInfo = "Gordic.Uct.Interface.GUcrReportInfoDto",}
	const enum GUcrPozadavekDetailDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Pozadavky\GUcrPozadavekDetailMainDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO objekt detailu pozadavku (v budoucnu mozna bude model)*/
	interface GUcrPozadavekDetailMainDto {
		/**Elementy*/
		Elementy?: Gordic.Uct.Interface.GUcrElementDto[]|null;
		/**Detail*/
		DetailPozadavek?: Gordic.Uct.Interface.GUcrDetailPozadavekBaseDto|null;
	}
	const enum GUcrPozadavekDetailMainDtoNames { Elementy = "Elementy", DetailPozadavek = "DetailPozadavek",}
	const enum GUcrPozadavekDetailMainDtoFragments { Elementy = "*", DetailPozadavek = "*",}
	const enum GUcrPozadavekDetailMainDtoTypes { Elementy = "Gordic.Uct.Interface.GUcrElementDto[]", DetailPozadavek = "Gordic.Uct.Interface.GUcrDetailPozadavekBaseDto",}
	const enum GUcrPozadavekDetailMainDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RegistrPZ\GUcrDefSloupceDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro definice sloupcu*/
	interface GUcrDefSloupceDto {
		/**DBCOLUMN:Seznam.h0*/
		Name?: string|null;
		Caption?: string|null;
		/**Typ hodnoty*/
		Typ?: number|null;
	}
	const enum GUcrDefSloupceDtoNames { Name = "Name", Caption = "Caption", Typ = "Typ",}
	const enum GUcrDefSloupceDtoFragments { Name = "*", Caption = "*", Typ = "*",}
	const enum GUcrDefSloupceDtoTypes { Name = "string", Caption = "string", Typ = "number",}
	const enum GUcrDefSloupceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RegistrPZ\GUcrHodnotyListRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vstopni paremetryu pro nacteni spec hodnot pro registr PZ*/
	interface GUcrHodnotyListRequestDto {
		/**Radek registru*/
		Row?: Gordic.Eko.Interface.GRegistrZPDto|null;
		/**Mesic*/
		Month?: number|null;
	}
	const enum GUcrHodnotyListRequestDtoNames { Row = "Row", Month = "Month",}
	const enum GUcrHodnotyListRequestDtoFragments { Row = "*", Month = "*",}
	const enum GUcrHodnotyListRequestDtoTypes { Row = "Gordic.Eko.Interface.GRegistrZPDto", Month = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RegistrPZ\GUcrHodnotyListResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Odpoved na pozadavek na nacteni hodnot*/
	interface GUcrHodnotyListResponseDto {
		/**seznam hodnot*/
		Seznam?: Gordic.Eko.Interface.GRegistrZPDto[]|null;
		/**Definece sloupcu*/
		Columns?: Gordic.Uct.Interface.GUcrDefSloupceDto[]|null;
	}
	const enum GUcrHodnotyListResponseDtoNames { Seznam = "Seznam", Columns = "Columns",}
	const enum GUcrHodnotyListResponseDtoFragments { Seznam = "*", Columns = "*",}
	const enum GUcrHodnotyListResponseDtoTypes { Seznam = "Gordic.Eko.Interface.GRegistrZPDto[]", Columns = "Gordic.Uct.Interface.GUcrDefSloupceDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RegistrPZ\GUcrListRequestRegistrPZDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek ne seznam registru PZ*/
	interface GUcrListRequestRegistrPZDto extends Gordic.Uct.Interface.GUcBaseRequestDto {
		/**Maska*/
		maska?: Gordic.Eko.Interface.GRegistrZPfilterDto|null;
		filter?: Gordic.Uct.Interface.GUCRZPfilterDto|null;
	}
	const enum GUcrListRequestRegistrPZDtoNames { maska = "maska", filter = "filter", maxRecords = "maxRecords", Nastaveni = "Nastaveni",}
	const enum GUcrListRequestRegistrPZDtoFragments { maska = "*", filter = "*", maxRecords = "*", Nastaveni = "*",}
	const enum GUcrListRequestRegistrPZDtoTypes { maska = "Gordic.Eko.Interface.GRegistrZPfilterDto", filter = "Gordic.Uct.Interface.GUCRZPfilterDto", maxRecords = "number", Nastaveni = "Gordic.Uct.Interface.GUcrBaseNastaveniDto",}
	const enum GUcrListRequestRegistrPZDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RegistrPZ\GUcrTestIxpResponceDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO odpoved na request testovani ixp*/
	interface GUcrTestIxpResponceDto {
		/**Zkratka agendy*/
		ZkratkaAg?: string|null;
		/**Nadpis*/
		Ixp?: string|null;
		/**Typ agendy*/
		TypAg?: number|null;
		/**Vysledek validace*/
		Valid?: boolean|null;
	}
	const enum GUcrTestIxpResponceDtoNames { ZkratkaAg = "ZkratkaAg", Ixp = "Ixp", TypAg = "TypAg", Valid = "Valid",}
	const enum GUcrTestIxpResponceDtoFragments { ZkratkaAg = "*", Ixp = "*", TypAg = "*", Valid = "*",}
	const enum GUcrTestIxpResponceDtoTypes { ZkratkaAg = "string", Ixp = "string", TypAg = "number", Valid = "boolean",}
	const enum GUcrTestIxpResponceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RegistrPZ\GUCRZPfilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:~*/
	interface GUCRZPfilterDto {
		mesic?: number|null;
		ktg_ueab?: number|null;
	}
	const enum GUCRZPfilterDtoNames { mesic = "mesic", ktg_ueab = "ktg_ueab",}
	const enum GUCRZPfilterDtoFragments { mesic = "*", ktg_ueab = "*",}
	const enum GUCRZPfilterDtoTypes { mesic = "number", ktg_ueab = "number",}
	const enum GUCRZPfilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RegistrPZ\GUctssudModDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GUctssudModDto {
		/**DBCOLUMN:Seznam.ixs_sud*/
		ixs_sud?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.pov_sud*/
		pov_sud?: number|null;
		/**DBCOLUMN:Seznam.sud_rep*/
		sud_rep?: string|null;
		/**DBCOLUMN:Seznam.aut_sud*/
		aut_sud?: number|null;
		/**DBCOLUMN:Seznam.typ_sud*/
		typ_sud?: number|null;
		/**DBCOLUMN:Seznam.text_min*/
		text_min?: number|null;
		/**DBCOLUMN:Seznam.text_max*/
		text_max?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ktg_sud*/
		ktg_sud?: number|null;
		/**druh z tabulky uctdsud - neni v uctssud*/
		druh_sud?: number|null;
		ah?: string|null;
		aht?: number|null;
		h?: string|null;
		vh?: string|null;
	}
	const enum GUctssudModDtoNames { ixs_sud = "ixs_sud", zkratka = "zkratka", nazev = "nazev", pov_sud = "pov_sud", sud_rep = "sud_rep", aut_sud = "aut_sud", typ_sud = "typ_sud", text_min = "text_min", text_max = "text_max", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_sud = "ktg_sud", druh_sud = "druh_sud", ah = "ah", aht = "aht", h = "h", vh = "vh",}
	const enum GUctssudModDtoFragments { ixs_sud = "*", zkratka = "*", nazev = "*", pov_sud = "*", sud_rep = "*", aut_sud = "*", typ_sud = "*", text_min = "*", text_max = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ktg_sud = "*", druh_sud = "*", ah = "*", aht = "*", h = "*", vh = "*",}
	const enum GUctssudModDtoTypes { ixs_sud = "string", zkratka = "string", nazev = "string", pov_sud = "number", sud_rep = "string", aut_sud = "number", typ_sud = "number", text_min = "number", text_max = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ktg_sud = "number", druh_sud = "number", ah = "string", aht = "number", h = "string", vh = "string",}
	const enum GUctssudModDtoTypeLengths { ixs_sud = 12, zkratka = 16, nazev = 100, sud_rep = 10, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Report\GSeznamEkoZaznamuGeneratorDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro predani parametru sestav generatoru GSeznamEkoZaznamuGenerator*/
	interface GSeznamEkoZaznamuGeneratorDto {
		/**TypUlohy*/
		typUlohy?: Gordic.Uct.Interface.GProhlizeniUctTaskType|null;
		/**Filtr*/
		filter?: Gordic.Uct.Interface.GUcrFilterDto|null;
		/**Pap*/
		pap?: GBaseFilter<number>|null;
		/**Elementy*/
		elementy?: Gordic.Uct.Interface.GEkoElementsDto|null;
		/**Filtr str. popis*/
		filterStrPopis?: Gordic.Uct.Interface.GStrukturovanyPopisFilterDto[]|null;
	}
	const enum GSeznamEkoZaznamuGeneratorDtoNames { typUlohy = "typUlohy", filter = "filter", pap = "pap", elementy = "elementy", filterStrPopis = "filterStrPopis",}
	const enum GSeznamEkoZaznamuGeneratorDtoFragments { typUlohy = "*", filter = "*", pap = "*", elementy = "*", filterStrPopis = "*",}
	const enum GSeznamEkoZaznamuGeneratorDtoTypes { typUlohy = "Gordic.Uct.Interface.GProhlizeniUctTaskType", filter = "Gordic.Uct.Interface.GUcrFilterDto", pap = "GBaseFilter<number>", elementy = "Gordic.Uct.Interface.GEkoElementsDto", filterStrPopis = "Gordic.Uct.Interface.GStrukturovanyPopisFilterDto[]",}
	const enum GSeznamEkoZaznamuGeneratorDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RISRE\GRisreIIsspFilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Filtry pro RISRE IISSP*/
	const enum GRisreIIsspFilterEnum {
		/**ico*/
		ixs_hpr,
		/**ucs*/
		id_hdr,
		rok,
		radek_hdr,
		/**s chybou*/
		chyba,
		id_hdr_ris,
		radek_hdr_ris,
		isp_fim,
		isp_zdr,
		isp_par,
		isp_pol,
		isp_eds,
		eds_dok,
		isp_pvs,
		isp_ucl,
		isp_zj,
		isp_uj,
		isp_uz,
		s_rezsp_isp,
		s_vyriz_rezsp,
		s_vyriz_rezsp_txt,
		c_rsp_gin,
		c_cerp_xma,
		c_cerp_gin,
		c_rsp_isp,
		c_cerp_isp,
		denmes,
		dat_cerp_isp,
		dat_odes,
		dat_vyriz,
		dat_rad_iissp,
		aktivita,
		dat_zmena,
		typ_ag,
		nks,
		nksxma,
		icoxma,
		ucsxma,
		typ_ag_txt,
	}
	/**DBTABLE:SeznamDph*/
	interface GRisreIIsspFilterDto {
		chyba?: GBaseFilter<number>|null;
		ixs_hpr?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.id_hdr*/
		id_hdr?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.radek_hdr_ris*/
		radek_hdr_ris?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.isp_fim*/
		isp_fim?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.isp_zdr*/
		isp_zdr?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.isp_par*/
		isp_par?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.isp_pol*/
		isp_pol?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.isp_eds*/
		isp_eds?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.eds_dok*/
		eds_dok?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.isp_pvs*/
		isp_pvs?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.isp_ucl*/
		isp_ucl?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.isp_zj*/
		isp_zj?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.isp_uj*/
		isp_uj?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.isp_uz*/
		isp_uz?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.s_rezsp_isp*/
		s_rezsp_isp?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.s_vyriz_rezsp*/
		s_vyriz_rezsp?: GBaseFilter<number>|null;
		/**DBCOLUMN:Seznam.s_vyriz_rezsp_txt*/
		s_vyriz_rezsp_txt?: string|null;
		/**DBCOLUMN:Seznam.c_rsp_gin*/
		c_rsp_gin?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.c_cerp_xma*/
		c_cerp_xma?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.c_cerp_gin*/
		c_cerp_gin?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.c_rsp_isp*/
		c_rsp_isp?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.c_cerp_isp*/
		c_cerp_isp?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.denmes*/
		denmes?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.dat_cerp_isp*/
		dat_cerp_isp?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Seznam.dat_odes*/
		dat_odes?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Seznam.dat_vyriz*/
		dat_vyriz?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Seznam.dat_rad_iissp*/
		dat_rad_iissp?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: GIntervalDto<string>|null;
		typ_ag_txt?: string|null;
	}
	const enum GRisreIIsspFilterDtoNames { chyba = "chyba", ixs_hpr = "ixs_hpr", id_hdr = "id_hdr", rok = "rok", radek_hdr = "radek_hdr", id_hdr_ris = "id_hdr_ris", radek_hdr_ris = "radek_hdr_ris", isp_fim = "isp_fim", isp_zdr = "isp_zdr", isp_par = "isp_par", isp_pol = "isp_pol", isp_eds = "isp_eds", eds_dok = "eds_dok", isp_pvs = "isp_pvs", isp_ucl = "isp_ucl", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", s_rezsp_isp = "s_rezsp_isp", s_vyriz_rezsp = "s_vyriz_rezsp", s_vyriz_rezsp_txt = "s_vyriz_rezsp_txt", c_rsp_gin = "c_rsp_gin", c_cerp_xma = "c_cerp_xma", c_cerp_gin = "c_cerp_gin", c_rsp_isp = "c_rsp_isp", c_cerp_isp = "c_cerp_isp", denmes = "denmes", dat_cerp_isp = "dat_cerp_isp", dat_odes = "dat_odes", dat_vyriz = "dat_vyriz", dat_rad_iissp = "dat_rad_iissp", aktivita = "aktivita", dat_zmena = "dat_zmena", typ_ag = "typ_ag", nks = "nks", typ_ag_txt = "typ_ag_txt",}
	const enum GRisreIIsspFilterDtoFragments { chyba = "*", ixs_hpr = "*", id_hdr = "*", rok = "*", radek_hdr = "*", id_hdr_ris = "*", radek_hdr_ris = "*", isp_fim = "*", isp_zdr = "*", isp_par = "*", isp_pol = "*", isp_eds = "*", eds_dok = "*", isp_pvs = "*", isp_ucl = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*", s_rezsp_isp = "*", s_vyriz_rezsp = "*", s_vyriz_rezsp_txt = "*", c_rsp_gin = "*", c_cerp_xma = "*", c_cerp_gin = "*", c_rsp_isp = "*", c_cerp_isp = "*", denmes = "*", dat_cerp_isp = "*", dat_odes = "*", dat_vyriz = "*", dat_rad_iissp = "*", aktivita = "*", dat_zmena = "*", typ_ag = "*", nks = "*", typ_ag_txt = "*",}
	const enum GRisreIIsspFilterDtoTypes { chyba = "GBaseFilter<number>", ixs_hpr = "GIntervalDto<string>", id_hdr = "GIntervalDto<number>", rok = "GIntervalDto<number>", radek_hdr = "GIntervalDto<number>", id_hdr_ris = "GIntervalDto<string>", radek_hdr_ris = "GIntervalDto<number>", isp_fim = "GIntervalDto<string>", isp_zdr = "GIntervalDto<string>", isp_par = "GIntervalDto<string>", isp_pol = "GIntervalDto<string>", isp_eds = "GIntervalDto<string>", eds_dok = "GIntervalDto<string>", isp_pvs = "GIntervalDto<string>", isp_ucl = "GIntervalDto<string>", isp_zj = "GIntervalDto<string>", isp_uj = "GIntervalDto<string>", isp_uz = "GIntervalDto<string>", s_rezsp_isp = "GIntervalDto<number>", s_vyriz_rezsp = "GBaseFilter<number>", s_vyriz_rezsp_txt = "string", c_rsp_gin = "GIntervalDto<JsonDecimal>", c_cerp_xma = "GIntervalDto<JsonDecimal>", c_cerp_gin = "GIntervalDto<JsonDecimal>", c_rsp_isp = "GIntervalDto<JsonDecimal>", c_cerp_isp = "GIntervalDto<JsonDecimal>", denmes = "GIntervalDto<number>", dat_cerp_isp = "GIntervalDto<JsonDate>", dat_odes = "GIntervalDto<JsonDate>", dat_vyriz = "GIntervalDto<JsonDate>", dat_rad_iissp = "GIntervalDto<JsonDate>", aktivita = "GIntervalDto<number>", dat_zmena = "GIntervalDto<JsonDate>", typ_ag = "number", nks = "GIntervalDto<string>", typ_ag_txt = "string",}
	const enum GRisreIIsspFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RISRE\GUcrFMRezimResponse.d.ts 

declare namespace Gordic.Uct.Interface {
	/**ReadOnly DTO se zkratkami*/
	interface GUcrFMRezimResponse {
		/**Financni misto*/
		Fm?: string|null;
		/**Rezim*/
		Rezim?: number|null;
	}
	const enum GUcrFMRezimResponseNames { Fm = "Fm", Rezim = "Rezim",}
	const enum GUcrFMRezimResponseFragments { Fm = "*", Rezim = "*",}
	const enum GUcrFMRezimResponseTypes { Fm = "string", Rezim = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RISRE\GUcrPreuctovaniStavListFilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:SeznamDph*/
	interface GUcrPreuctovaniStavListFilterDto {
		/**DBCOLUMN:SeznamDph.ico*/
		ico?: GIntervalDto<string>|null;
		rok?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDph.mesic*/
		mesic?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDph.mesic*/
		den?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDph.mesic*/
		denmes?: GIntervalDto<number>|null;
		sk_vl?: GIntervalDto<string>|null;
		bu_vl?: GIntervalDto<string>|null;
		isp_fim?: GIntervalDto<string>|null;
		isp_zdr?: GIntervalDto<string>|null;
		isp_par?: GIntervalDto<string>|null;
		isp_pol?: GIntervalDto<string>|null;
		isp_eds?: GIntervalDto<string>|null;
		isp_pvs?: GIntervalDto<string>|null;
		isp_ucl?: GIntervalDto<string>|null;
		isp_zj?: GIntervalDto<string>|null;
		isp_uj?: GIntervalDto<string>|null;
		isp_uz?: GIntervalDto<string>|null;
		id_hdr_ris?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.mesic*/
		radek_hdr?: GIntervalDto<number>|null;
		popis?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.c_akt_1*/
		sc0?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_akt_1*/
		sc1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_akt_1*/
		kc0?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_priz_1*/
		kc1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.c_diff_1*/
		kc01?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:SeznamDph.ucs*/
		ucs?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.uus*/
		uus?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.uus*/
		nks?: GIntervalDto<string>|null;
		xfimuz?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamDph.c_diff_1*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		zmenu_prov?: GIntervalDto<string>|null;
	}
	const enum GUcrPreuctovaniStavListFilterDtoNames { ico = "ico", rok = "rok", mesic = "mesic", den = "den", denmes = "denmes", sk_vl = "sk_vl", bu_vl = "bu_vl", isp_fim = "isp_fim", isp_zdr = "isp_zdr", isp_par = "isp_par", isp_pol = "isp_pol", isp_eds = "isp_eds", isp_pvs = "isp_pvs", isp_ucl = "isp_ucl", isp_zj = "isp_zj", isp_uj = "isp_uj", isp_uz = "isp_uz", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", popis = "popis", sc0 = "sc0", sc1 = "sc1", kc0 = "kc0", kc1 = "kc1", kc01 = "kc01", ucs = "ucs", uus = "uus", nks = "nks", xfimuz = "xfimuz", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GUcrPreuctovaniStavListFilterDtoFragments { ico = "*", rok = "*", mesic = "*", den = "*", denmes = "*", sk_vl = "*", bu_vl = "*", isp_fim = "*", isp_zdr = "*", isp_par = "*", isp_pol = "*", isp_eds = "*", isp_pvs = "*", isp_ucl = "*", isp_zj = "*", isp_uj = "*", isp_uz = "*", id_hdr_ris = "*", radek_hdr = "*", popis = "*", sc0 = "*", sc1 = "*", kc0 = "*", kc1 = "*", kc01 = "*", ucs = "*", uus = "*", nks = "*", xfimuz = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GUcrPreuctovaniStavListFilterDtoTypes { ico = "GIntervalDto<string>", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", den = "GIntervalDto<number>", denmes = "GIntervalDto<number>", sk_vl = "GIntervalDto<string>", bu_vl = "GIntervalDto<string>", isp_fim = "GIntervalDto<string>", isp_zdr = "GIntervalDto<string>", isp_par = "GIntervalDto<string>", isp_pol = "GIntervalDto<string>", isp_eds = "GIntervalDto<string>", isp_pvs = "GIntervalDto<string>", isp_ucl = "GIntervalDto<string>", isp_zj = "GIntervalDto<string>", isp_uj = "GIntervalDto<string>", isp_uz = "GIntervalDto<string>", id_hdr_ris = "GIntervalDto<string>", radek_hdr = "GIntervalDto<number>", popis = "GIntervalDto<string>", sc0 = "GIntervalDto<JsonDecimal>", sc1 = "GIntervalDto<JsonDecimal>", kc0 = "GIntervalDto<JsonDecimal>", kc1 = "GIntervalDto<JsonDecimal>", kc01 = "GIntervalDto<JsonDecimal>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", xfimuz = "GIntervalDto<string>", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "GIntervalDto<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\RISRE\GUcrVytvorDavkuRequest.d.ts 

declare namespace Gordic.Uct.Interface {
	/**vstupni parametry pro vytvoreni davky*/
	interface GUcrVytvorDavkuRequest {
		/**Financni misto*/
		KeDni?: JsonDate|null;
		/**Rezim*/
		Maska?: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto|null;
	}
	const enum GUcrVytvorDavkuRequestNames { KeDni = "KeDni", Maska = "Maska",}
	const enum GUcrVytvorDavkuRequestFragments { KeDni = "*", Maska = "*",}
	const enum GUcrVytvorDavkuRequestTypes { KeDni = "JsonDate", Maska = "Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto",}
	const enum GUcrVytvorDavkuRequestTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Saldokonto\GUcrListRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Odpoved na pozadavek na nacteni hodnot*/
	interface GUcrListRequestDto extends Gordic.Uct.Interface.GUcBaseRequestDto {
		/**Atribut logovani*/
		logovatGdpr?: boolean|null;
		/**zobrazeni sloupce nakladove stredisko*/
		ns?: boolean|null;
		/**zobrazeni slova org*/
		org?: boolean|null;
		/**zobrazeni slova orj*/
		orj?: boolean|null;
		/**Maska*/
		maska?: Gordic.Uct.Interface.GUcrFilterDto|null;
		/**Pap*/
		Pap?: GBaseFilter<number>|null;
	}
	const enum GUcrListRequestDtoNames { logovatGdpr = "logovatGdpr", ns = "ns", org = "org", orj = "orj", maska = "maska", Pap = "Pap", maxRecords = "maxRecords", Nastaveni = "Nastaveni",}
	const enum GUcrListRequestDtoFragments { logovatGdpr = "*", ns = "*", org = "*", orj = "*", maska = "*", Pap = "*", maxRecords = "*", Nastaveni = "*",}
	const enum GUcrListRequestDtoTypes { logovatGdpr = "boolean", ns = "boolean", org = "boolean", orj = "boolean", maska = "Gordic.Uct.Interface.GUcrFilterDto", Pap = "GBaseFilter<number>", maxRecords = "number", Nastaveni = "Gordic.Uct.Interface.GUcrBaseNastaveniDto",}
	const enum GUcrListRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Stavy\GRozStavyAatListRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na seznam zapisu stavu*/
	interface GRozStavyAatListRequestDto {
		/**Typ ulohy*/
		TypUlohy?: Gordic.Uct.Interface.GProhlizeniUctTaskType|null;
		/**Limit dat poct nactenych dat*/
		Limit?: number|null;
		/**Maska*/
		Maska?: Gordic.Uct.Interface.GRozSeznamAatFilterDto|null;
		/**Elementy*/
		Elementy?: Gordic.Uct.Interface.GUcrFilterDto[]|null;
	}
	const enum GRozStavyAatListRequestDtoNames { TypUlohy = "TypUlohy", Limit = "Limit", Maska = "Maska", Elementy = "Elementy",}
	const enum GRozStavyAatListRequestDtoFragments { TypUlohy = "*", Limit = "*", Maska = "*", Elementy = "*",}
	const enum GRozStavyAatListRequestDtoTypes { TypUlohy = "Gordic.Uct.Interface.GProhlizeniUctTaskType", Limit = "number", Maska = "Gordic.Uct.Interface.GRozSeznamAatFilterDto", Elementy = "Gordic.Uct.Interface.GUcrFilterDto[]",}
	const enum GRozStavyAatListRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Stavy\GRozStavyAatListResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Odpoved na pozadavek na zapisy stavu*/
	interface GRozStavyAatListResponseDto {
		/**seznam zapisu*/
		SeznamZapisu?: Gordic.Uct.Interface.GRozSeznamAatDto[]|null;
		/**Souctovy radek*/
		Sumy?: Gordic.Uct.Interface.GRozSeznamAatSumCountDto|null;
	}
	const enum GRozStavyAatListResponseDtoNames { SeznamZapisu = "SeznamZapisu", Sumy = "Sumy",}
	const enum GRozStavyAatListResponseDtoFragments { SeznamZapisu = "*", Sumy = "*",}
	const enum GRozStavyAatListResponseDtoTypes { SeznamZapisu = "Gordic.Uct.Interface.GRozSeznamAatDto[]", Sumy = "Gordic.Uct.Interface.GRozSeznamAatSumCountDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Stavy\GRoztStavytRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na seznam roz stavu*/
	interface GRoztStavytRequestDto extends Gordic.Uct.Interface.GUcBaseRequestDto {
		/**Maska*/
		Maska?: Gordic.Uct.Interface.GUcrFilterDto|null;
		/**Elementy*/
		Elementy?: Gordic.Uct.Interface.GEkoElementsDto|null;
	}
	const enum GRoztStavytRequestDtoNames { Maska = "Maska", Elementy = "Elementy", maxRecords = "maxRecords", Nastaveni = "Nastaveni",}
	const enum GRoztStavytRequestDtoFragments { Maska = "*", Elementy = "*", maxRecords = "*", Nastaveni = "*",}
	const enum GRoztStavytRequestDtoTypes { Maska = "Gordic.Uct.Interface.GUcrFilterDto", Elementy = "Gordic.Uct.Interface.GEkoElementsDto", maxRecords = "number", Nastaveni = "Gordic.Uct.Interface.GUcrBaseNastaveniDto",}
	const enum GRoztStavytRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Stavy\GUctStavytRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na seznam uct stavu*/
	interface GUctStavyRequestDto extends Gordic.Uct.Interface.GUcBaseRequestDto {
		/**Maska*/
		Maska?: Gordic.Uct.Interface.GUcrFilterDto|null;
		/**Elementy*/
		Elementy?: Gordic.Uct.Interface.GEkoElementsDto|null;
		/**Pap*/
		Pap?: GBaseFilter<number>|null;
	}
	const enum GUctStavyRequestDtoNames { Maska = "Maska", Elementy = "Elementy", Pap = "Pap", maxRecords = "maxRecords", Nastaveni = "Nastaveni",}
	const enum GUctStavyRequestDtoFragments { Maska = "*", Elementy = "*", Pap = "*", maxRecords = "*", Nastaveni = "*",}
	const enum GUctStavyRequestDtoTypes { Maska = "Gordic.Uct.Interface.GUcrFilterDto", Elementy = "Gordic.Uct.Interface.GEkoElementsDto", Pap = "GBaseFilter<number>", maxRecords = "number", Nastaveni = "Gordic.Uct.Interface.GUcrBaseNastaveniDto",}
	const enum GUctStavyRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\StuktPopis\GStruktPopisDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datový objekt strukturovaneho popisu pro nacitani.*/
	interface GStruktPopisDto {
		/**Lic.*/
		lic?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Mesic.*/
		mesic?: number|null;
		/**Radek pz.*/
		ac?: string|null;
		/**Radek pz.*/
		radek_pz?: number|null;
		/**Popis.*/
		popis?: string|null;
	}
	const enum GStruktPopisDtoNames { lic = "lic", ico = "ico", ucs = "ucs", rok = "rok", mesic = "mesic", ac = "ac", radek_pz = "radek_pz", popis = "popis",}
	const enum GStruktPopisDtoFragments { lic = "main", ico = "main", ucs = "main", rok = "main", mesic = "main", ac = "main", radek_pz = "main", popis = "main",}
	const enum GStruktPopisDtoTypes { lic = "string", ico = "string", ucs = "string", rok = "number", mesic = "number", ac = "string", radek_pz = "number", popis = "string",}
	const enum GStruktPopisDtoTypeLengths { lic = 4, ico = 10, ucs = 10, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\StuktPopis\GStruktPopisHodnotyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datový objekt hodnot strukturovaneho popisu pro nacitani.*/
	interface GStruktPopisHodnotyDto {
		/**Rok.*/
		rok?: number|null;
		/**Lic.*/
		lic?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Mesic.*/
		mesic?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Klic.*/
		klic?: string|null;
		/**Hodnota.*/
		hodnota?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Drd.*/
		drd?: number|null;
		/**Datum mpd.*/
		dat_mpd?: JsonDate|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GStruktPopisHodnotyDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", klic = "klic", hodnota = "hodnota", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", drd = "drd", dat_mpd = "dat_mpd", pocet = "pocet",}
	const enum GStruktPopisHodnotyDtoFragments { rok = "main", lic = "main", ico = "main", ucs = "main", mesic = "main", ac = "main", klic = "main", hodnota = "main", dat_zmena = "main", zmenu_prov = "main", drd = "main", dat_mpd = "main", pocet = "main",}
	const enum GStruktPopisHodnotyDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", klic = "string", hodnota = "string", dat_zmena = "JsonDate", zmenu_prov = "string", drd = "number", dat_mpd = "JsonDate", pocet = "number",}
	const enum GStruktPopisHodnotyDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ac = 20, klic = 10, hodnota = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Sumarizace\GUcrExportDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO s podmnozinou informaci v Globals*/
	interface GUcrExportDto {
		/**DBCOLUMN:typ*/
		typ?: string|null;
		/**DBCOLUMN:lic*/
		lic?: string|null;
		/**DBCOLUMN:ico*/
		ico?: string|null;
		/**DBCOLUMN:ucs*/
		ucs?: string|null;
		/**DBCOLUMN:akt_ico*/
		akt_ico?: string|null;
		/**DBCOLUMN:akt_ucs*/
		akt_ucs?: string|null;
		/**DBCOLUMN:rok*/
		rok?: number|null;
		/**DBCOLUMN:mesic*/
		mesic?: number|null;
		/**DBCOLUMN:typ_vystupu*/
		typ_vystupu?: string|null;
		/**DBCOLUMN:typ_zapisu*/
		typ_zapisu?: string|null;
		/**DBCOLUMN:vystup*/
		vystup?: string|null;
		/**DBCOLUMN:komprimovat*/
		komprimovat?: number|null;
		/**DBCOLUMN:email*/
		email?: string|null;
		/**DBCOLUMN:soubor_vykaz*/
		soubor_vykaz?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**DBCOLUMN:email_predmet*/
		email_predmet?: string|null;
		/**DBCOLUMN:email*/
		telo?: string|null;
		/**DBCOLUMN:ico_nazev*/
		ico_nazev?: string|null;
	}
	const enum GUcrExportDtoNames { typ = "typ", lic = "lic", ico = "ico", ucs = "ucs", akt_ico = "akt_ico", akt_ucs = "akt_ucs", rok = "rok", mesic = "mesic", typ_vystupu = "typ_vystupu", typ_zapisu = "typ_zapisu", vystup = "vystup", komprimovat = "komprimovat", email = "email", soubor_vykaz = "soubor_vykaz", email_predmet = "email_predmet", telo = "telo", ico_nazev = "ico_nazev",}
	const enum GUcrExportDtoFragments { typ = "*", lic = "*", ico = "*", ucs = "*", akt_ico = "*", akt_ucs = "*", rok = "*", mesic = "*", typ_vystupu = "*", typ_zapisu = "*", vystup = "*", komprimovat = "*", email = "*", soubor_vykaz = "*", email_predmet = "*", telo = "*", ico_nazev = "*",}
	const enum GUcrExportDtoTypes { typ = "string", lic = "string", ico = "string", ucs = "string", akt_ico = "string", akt_ucs = "string", rok = "number", mesic = "number", typ_vystupu = "string", typ_zapisu = "string", vystup = "string", komprimovat = "number", email = "string", soubor_vykaz = "Gordic.General.ApplicationInterface.GFileInfoDto", email_predmet = "string", telo = "string", ico_nazev = "string",}
	const enum GUcrExportDtoTypeLengths { typ = 3, lic = 10, ico = 10, ucs = 10, akt_ico = 10, akt_ucs = 10, typ_vystupu = 10, typ_zapisu = 10, vystup = 254, email = 254, telo = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Sumarizace\GUcrSelectOptionDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Option do html selectu*/
	interface GUcrSelectOptionDto {
		/**Text*/
		Text?: string|null;
		/**Hodnota*/
		Value?: string|null;
	}
	const enum GUcrSelectOptionDtoNames { Text = "Text", Value = "Value",}
	const enum GUcrSelectOptionDtoFragments { Text = "*", Value = "*",}
	const enum GUcrSelectOptionDtoTypes { Text = "string", Value = "string",}
	const enum GUcrSelectOptionDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\UctZapis\GIdentifikatorRadkuDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO jednoznacenoho identifikatoru zapisu*/
	interface GIdentifikatorRadkuDto {
		rok?: number|null;
		lic?: string|null;
		ico?: string|null;
		ucs?: string|null;
		mesic?: number|null;
		ac?: string|null;
	}
	const enum GIdentifikatorRadkuDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac",}
	const enum GIdentifikatorRadkuDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ac = "*",}
	const enum GIdentifikatorRadkuDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string",}
	const enum GIdentifikatorRadkuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\UctZapis\GPopisDokladuRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO request na zmenu popisu radku dokadu*/
	interface GPopisDokladuRequestDto extends Gordic.Uct.Interface.GIdentifikatorRadkuDto {
		/**Zkratka agendy*/
		zkrAgendy?: string|null;
		/**Novy popis dokladu*/
		novyPopis?: string|null;
	}
	const enum GPopisDokladuRequestDtoNames { zkrAgendy = "zkrAgendy", novyPopis = "novyPopis", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac",}
	const enum GPopisDokladuRequestDtoFragments { zkrAgendy = "*", novyPopis = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ac = "*",}
	const enum GPopisDokladuRequestDtoTypes { zkrAgendy = "string", novyPopis = "string", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string",}
	const enum GPopisDokladuRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\UctZapis\GSeznamZapisuStavuDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO stavu zapisu*/
	interface GSeznamZapisuStavuDto {
		/**Popisek typu agendy*/
		typ_ag_txt?: string|null;
		/**Klic ulozeneho dokumentu v ELE(dokladu o zauctovani)*/
		ixb_dzu?: string|null;
		/**Autogenerated.*/
		lic?: string|null;
		/**Autogenerated.*/
		ico?: string|null;
		/**Autogenerated.*/
		ucs: string;
		/**Autogenerated.*/
		uus?: string|null;
		/**Autogenerated.*/
		nks?: string|null;
		/**Autogenerated.*/
		rok?: number|null;
		/**Autogenerated.*/
		mesic: number;
		/**Autogenerated.*/
		den?: number|null;
		/**Autogenerated.*/
		ac: string;
		/**Autogenerated.*/
		radek_z?: number|null;
		/**Autogenerated.*/
		drd?: number|null;
		/**Autogenerated.*/
		drd_msk?: string|null;
		/**Autogenerated.*/
		c0?: JsonDecimal|null;
		/**Autogenerated.*/
		c1?: JsonDecimal|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Zmenu prov*/
		nazev_rf?: string|null;
		/**Autogenerated.*/
		uea?: string|null;
		/**Autogenerated.*/
		ueb?: string|null;
		/**Autogenerated.*/
		uec?: string|null;
		/**Autogenerated.*/
		ued?: string|null;
		/**Autogenerated.*/
		uee?: string|null;
		/**Autogenerated.*/
		uef?: string|null;
		/**Autogenerated.*/
		ueg?: string|null;
		/**Autogenerated.*/
		ueh?: string|null;
		/**Autogenerated.*/
		uei?: string|null;
		/**Autogenerated.*/
		uej?: string|null;
		/**Autogenerated.*/
		uek?: string|null;
		/**Autogenerated.*/
		uel?: string|null;
		/**Autogenerated.*/
		uem?: string|null;
		/**Autogenerated.*/
		uen?: string|null;
		/**Autogenerated.*/
		te0?: string|null;
		/**Autogenerated.*/
		te1?: string|null;
		/**Autogenerated.*/
		te2?: string|null;
		/**Autogenerated.*/
		te3?: string|null;
		/**Autogenerated.*/
		te4?: string|null;
		/**Autogenerated.*/
		te5?: string|null;
		/**Autogenerated.*/
		te6?: string|null;
		/**Autogenerated.*/
		te7?: string|null;
		/**Autogenerated.*/
		te8?: string|null;
		/**Autogenerated.*/
		te9?: string|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		s_prep?: number|null;
		/**Autogenerated.*/
		rok_uej?: number|null;
		/**Autogenerated.*/
		mesic_uej?: number|null;
		/**Autogenerated.*/
		zd?: number;
		/**Autogenerated.*/
		c0_as?: JsonDecimal|null;
		/**Autogenerated.*/
		c1_as?: JsonDecimal|null;
		/**Autogenerated.*/
		c0c1?: JsonDecimal|null;
		/**Autogenerated.*/
		c0c1_as?: JsonDecimal|null;
		/**Autogenerated.*/
		ixp?: string|null;
		ixp_prim?: string|null;
		ixp_roz?: string|null;
		/**identifikator smlouvy*/
		ixp_sml?: string|null;
		/**cislo smlouvy*/
		cislo_sml?: number|null;
		/**Rok smlouvy*/
		rok_sml?: number|null;
		/**Autogenerated.*/
		ixp_s?: boolean|null;
		/**Autogenerated.*/
		esu_txt?: string|null;
		/**Autogenerated.*/
		esu_ico?: string|null;
		/**Autogenerated.*/
		esu_rc?: string|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		priz_ur?: number|null;
		/**Autogenerated.*/
		pdok?: string|null;
		/**Autogenerated.*/
		ac_ag?: string|null;
		/**Autogenerated.*/
		ixs_typ?: string|null;
		/**typ dokumentu*/
		ixs_typ_txt?: string|null;
		/**ID IISSP*/
		id_hdr_ris?: string|null;
		/**Radek IISSP*/
		radek_hdr?: number|null;
		/**Atribut prepocteni*/
		s_prep_aisp?: number|null;
		/**Autogenerated.*/
		typ_nazev?: string|null;
		value0?: string|null;
		value1?: string|null;
		status?: number|null;
		/**Strukturovany popis*/
		struktPopis?: ObjectLiteral<GStrukturovanyPopisFilterDto>|null;
	}
	const enum GSeznamZapisuStavuDtoNames { typ_ag_txt = "typ_ag_txt", ixb_dzu = "ixb_dzu", lic = "lic", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", rok = "rok", mesic = "mesic", den = "den", ac = "ac", radek_z = "radek_z", drd = "drd", drd_msk = "drd_msk", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", popis = "popis", s_prep = "s_prep", rok_uej = "rok_uej", mesic_uej = "mesic_uej", zd = "zd", c0_as = "c0_as", c1_as = "c1_as", c0c1 = "c0c1", c0c1_as = "c0c1_as", ixp = "ixp", ixp_prim = "ixp_prim", ixp_roz = "ixp_roz", ixp_sml = "ixp_sml", cislo_sml = "cislo_sml", rok_sml = "rok_sml", ixp_s = "ixp_s", esu_txt = "esu_txt", esu_ico = "esu_ico", esu_rc = "esu_rc", ixs_esu = "ixs_esu", priz_ur = "priz_ur", pdok = "pdok", ac_ag = "ac_ag", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", s_prep_aisp = "s_prep_aisp", typ_nazev = "typ_nazev", value0 = "value0", value1 = "value1", status = "status", struktPopis = "struktPopis",}
	const enum GSeznamZapisuStavuDtoFragments { typ_ag_txt = "*", ixb_dzu = "*", lic = "*", ico = "*", ucs = "*", uus = "*", nks = "*", rok = "*", mesic = "*", den = "*", ac = "*", radek_z = "*", drd = "*", drd_msk = "*", c0 = "*", c1 = "*", typ_ag = "*", dat_zmena = "*", zmenu_prov = "*", nazev_rf = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", popis = "*", s_prep = "*", rok_uej = "*", mesic_uej = "*", zd = "*", c0_as = "*", c1_as = "*", c0c1 = "*", c0c1_as = "*", ixp = "*", ixp_prim = "*", ixp_roz = "*", ixp_sml = "*", cislo_sml = "*", rok_sml = "*", ixp_s = "*", esu_txt = "*", esu_ico = "*", esu_rc = "*", ixs_esu = "*", priz_ur = "*", pdok = "*", ac_ag = "*", ixs_typ = "*", ixs_typ_txt = "*", id_hdr_ris = "*", radek_hdr = "*", s_prep_aisp = "*", typ_nazev = "*", value0 = "*", value1 = "*", status = "*", struktPopis = "*",}
	const enum GSeznamZapisuStavuDtoTypes { typ_ag_txt = "string", ixb_dzu = "string", lic = "string", ico = "string", ucs = "string", uus = "string", nks = "string", rok = "number", mesic = "number", den = "number", ac = "string", radek_z = "number", drd = "number", drd_msk = "string", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_rf = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", popis = "string", s_prep = "number", rok_uej = "number", mesic_uej = "number", zd = "number", c0_as = "JsonDecimal", c1_as = "JsonDecimal", c0c1 = "JsonDecimal", c0c1_as = "JsonDecimal", ixp = "string", ixp_prim = "string", ixp_roz = "string", ixp_sml = "string", cislo_sml = "number", rok_sml = "number", ixp_s = "boolean", esu_txt = "string", esu_ico = "string", esu_rc = "string", ixs_esu = "string", priz_ur = "number", pdok = "string", ac_ag = "string", ixs_typ = "string", ixs_typ_txt = "string", id_hdr_ris = "string", radek_hdr = "number", s_prep_aisp = "number", typ_nazev = "string", value0 = "string", value1 = "string", status = "number", struktPopis = "ObjectLiteral<GStrukturovanyPopisFilterDto>",}
	const enum GSeznamZapisuStavuDtoTypeLengths { lic = 4, ico = 10, ucs = 10, uus = 10, nks = 12, ac = -1, drd_msk = -1, zmenu_prov = -1, uea = -1, ueb = -1, uec = -1, ued = -1, uee = -1, uef = -1, ueg = -1, ueh = -1, uei = -1, uej = -1, uek = -1, uel = -1, uem = -1, uen = -1, te0 = -1, te1 = -1, te2 = -1, te3 = -1, te4 = -1, te5 = -1, te6 = -1, te7 = -1, te8 = -1, te9 = -1, popis = -1, ixp = -1, esu_txt = -1, esu_ico = -1, esu_rc = -1, ixs_esu = -1, pdok = -1, ac_ag = -1, ixs_typ = -1, typ_nazev = -1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\UctZapis\GStrukturovanyPopisFilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro jeden filtr strukturovaneho popisu*/
	interface GStrukturovanyPopisFilterDto {
		/**klic*/
		klic?: string|null;
		/**klic_txt*/
		klic_txt?: string|null;
		/**hodnota*/
		hodnota?: string|null;
	}
	const enum GStrukturovanyPopisFilterDtoNames { klic = "klic", klic_txt = "klic_txt", hodnota = "hodnota",}
	const enum GStrukturovanyPopisFilterDtoFragments { klic = "*", klic_txt = "*", hodnota = "*",}
	const enum GStrukturovanyPopisFilterDtoTypes { klic = "string", klic_txt = "string", hodnota = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\UctZapis\GUctZapisListRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na seznam uct zapisu*/
	interface GUctZapisListRequestDto extends Gordic.Uct.Interface.GUcBaseRequestDto {
		/**Atribut logovani*/
		logovatGdpr?: boolean|null;
		/**Typ ulohy*/
		TypUlohy?: Gordic.Uct.Interface.GProhlizeniUctTaskType|null;
		/**Maska*/
		Maska?: Gordic.Uct.Interface.GUcrFilterDto|null;
		/**Maska2*/
		Maska2?: Gordic.Uct.Interface.GUcrFilterDto|null;
		/**Radek stavu*/
		RadekStavu?: Gordic.Uct.Interface.GUctSeznamZapisuStavuDto|null;
		/**Elementy*/
		Elementy?: Gordic.Uct.Interface.GEkoElementsDto|null;
		/**Filtr na strukturovany popis*/
		FilterStrPopis?: Gordic.Uct.Interface.GStrukturovanyPopisFilterDto[]|null;
		/**Ma se k zaznamu pridat data str. popisu?*/
		StrPopisKeys?: string[]|null;
		/**Atribut nacteni esu sloupcu*/
		LoadEsu?: boolean|null;
		/**Atribut nacteni popisu dokladu*/
		LoadPopisDokladu?: boolean|null;
		/**Pap*/
		Pap?: GBaseFilter<number>|null;
		/**pdok*/
		pdok?: GBaseFilter<number>|null;
		/**ec_dd*/
		ec_dd?: GBaseFilter<number>|null;
		/**dic*/
		dic?: GBaseFilter<number>|null;
	}
	const enum GUctZapisListRequestDtoNames { logovatGdpr = "logovatGdpr", TypUlohy = "TypUlohy", Maska = "Maska", Maska2 = "Maska2", RadekStavu = "RadekStavu", Elementy = "Elementy", FilterStrPopis = "FilterStrPopis", StrPopisKeys = "StrPopisKeys", LoadEsu = "LoadEsu", LoadPopisDokladu = "LoadPopisDokladu", Pap = "Pap", pdok = "pdok", ec_dd = "ec_dd", dic = "dic", maxRecords = "maxRecords", Nastaveni = "Nastaveni",}
	const enum GUctZapisListRequestDtoFragments { logovatGdpr = "*", TypUlohy = "*", Maska = "*", Maska2 = "*", RadekStavu = "*", Elementy = "*", FilterStrPopis = "*", StrPopisKeys = "*", LoadEsu = "*", LoadPopisDokladu = "*", Pap = "*", pdok = "*", ec_dd = "*", dic = "*", maxRecords = "*", Nastaveni = "*",}
	const enum GUctZapisListRequestDtoTypes { logovatGdpr = "boolean", TypUlohy = "Gordic.Uct.Interface.GProhlizeniUctTaskType", Maska = "Gordic.Uct.Interface.GUcrFilterDto", Maska2 = "Gordic.Uct.Interface.GUcrFilterDto", RadekStavu = "Gordic.Uct.Interface.GUctSeznamZapisuStavuDto", Elementy = "Gordic.Uct.Interface.GEkoElementsDto", FilterStrPopis = "Gordic.Uct.Interface.GStrukturovanyPopisFilterDto[]", StrPopisKeys = "string[]", LoadEsu = "boolean", LoadPopisDokladu = "boolean", Pap = "GBaseFilter<number>", pdok = "GBaseFilter<number>", ec_dd = "GBaseFilter<number>", dic = "GBaseFilter<number>", maxRecords = "number", Nastaveni = "Gordic.Uct.Interface.GUcrBaseNastaveniDto",}
	const enum GUctZapisListRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Ukazatel\GUcrUkazatelFilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:ekoauka*/
	interface GUcrUkazatelFilterDto {
		/**DBCOLUMN:ekoauka.ixs_evp*/
		ixs_evp?: GIntervalDto<string>|null;
		/**DBCOLUMN:ekoauka.rok*/
		rok?: GIntervalDto<number>|null;
		/**DBCOLUMN:ekoauka.ico*/
		ico?: GIntervalDto<string>|null;
		/**DBCOLUMN:ekoauka.ucs*/
		ucs?: GIntervalDto<string>|null;
		/**DBCOLUMN:ekoauka.uus*/
		uus?: GIntervalDto<string>|null;
		/**DBCOLUMN:ekoauka.nks*/
		nks?: GIntervalDto<string>|null;
		/**DBCOLUMN:ekoauka.c0*/
		c0?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:ekoauka.c1*/
		c1?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:ekoauka.dat_zmena*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:ekoauka.zmenu_prov*/
		zmenu_prov?: GIntervalDto<string>|null;
		/**DBCOLUMN:ekoauka.c0_poc*/
		c0_poc?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:ekoauka.c1_poc*/
		c1_poc?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:ekoauka.c0_schv*/
		c0_schv?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:ekoauka.c1_schv*/
		c1_schv?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:ekoauka.rok_akt*/
		rok_akt?: GIntervalDto<number>|null;
		/**DBCOLUMN:ekoauka.c0_aut*/
		c0_aut?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:ekoauka.c1_aut*/
		c1_aut?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:ekoauka.priz_uziv*/
		priz_uziv?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.c0_rz*/
		c0_rz?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.c1_rz*/
		c1_rz?: GIntervalDto<JsonDecimal>|null;
		/**DBCOLUMN:Seznam.ixs_evp_nad*/
		ixs_evp_nad?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ixs_evp_root*/
		ixs_evp_root?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.rokmes_od*/
		rokmes_od?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.rokmes_do*/
		rokmes_do?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: GIntervalDto<string>|null;
		/**vicelety pohled*/
		vl?: boolean|null;
	}
	const enum GUcrUkazatelFilterDtoNames { ixs_evp = "ixs_evp", rok = "rok", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", c0 = "c0", c1 = "c1", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c0_poc = "c0_poc", c1_poc = "c1_poc", c0_schv = "c0_schv", c1_schv = "c1_schv", rok_akt = "rok_akt", c0_aut = "c0_aut", c1_aut = "c1_aut", priz_uziv = "priz_uziv", c0_rz = "c0_rz", c1_rz = "c1_rz", ixs_evp_nad = "ixs_evp_nad", ixs_evp_root = "ixs_evp_root", nazev = "nazev", popis = "popis", poznamka = "poznamka", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", aktivita = "aktivita", k_v = "k_v", vl = "vl",}
	const enum GUcrUkazatelFilterDtoFragments { ixs_evp = "*", rok = "*", ico = "*", ucs = "*", uus = "*", nks = "*", c0 = "*", c1 = "*", dat_zmena = "*", zmenu_prov = "*", c0_poc = "*", c1_poc = "*", c0_schv = "*", c1_schv = "*", rok_akt = "*", c0_aut = "*", c1_aut = "*", priz_uziv = "*", c0_rz = "*", c1_rz = "*", ixs_evp_nad = "*", ixs_evp_root = "*", nazev = "*", popis = "*", poznamka = "*", rokmes_od = "*", rokmes_do = "*", aktivita = "*", k_v = "*", vl = "*",}
	const enum GUcrUkazatelFilterDtoTypes { ixs_evp = "GIntervalDto<string>", rok = "GIntervalDto<number>", ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", c0 = "GIntervalDto<JsonDecimal>", c1 = "GIntervalDto<JsonDecimal>", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "GIntervalDto<string>", c0_poc = "GIntervalDto<JsonDecimal>", c1_poc = "GIntervalDto<JsonDecimal>", c0_schv = "GIntervalDto<JsonDecimal>", c1_schv = "GIntervalDto<JsonDecimal>", rok_akt = "GIntervalDto<number>", c0_aut = "GIntervalDto<JsonDecimal>", c1_aut = "GIntervalDto<JsonDecimal>", priz_uziv = "GIntervalDto<number>", c0_rz = "GIntervalDto<JsonDecimal>", c1_rz = "GIntervalDto<JsonDecimal>", ixs_evp_nad = "GIntervalDto<string>", ixs_evp_root = "GIntervalDto<string>", nazev = "GBaseFilter<string>", popis = "GIntervalDto<string>", poznamka = "GIntervalDto<string>", rokmes_od = "GIntervalDto<string>", rokmes_do = "GIntervalDto<string>", aktivita = "string", k_v = "GIntervalDto<string>", vl = "boolean",}
	const enum GUcrUkazatelFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Ukazatel\GUcrUkazatelHistoryDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro histoiri ukazatelu*/
	interface GUcrUkazatelHistoryDto {
		/**radek*/
		radek?: number|null;
		/**text*/
		text?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**nazev_rf*/
		nazev_rf?: string|null;
	}
	const enum GUcrUkazatelHistoryDtoNames { radek = "radek", text = "text", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf",}
	const enum GUcrUkazatelHistoryDtoFragments { radek = "main", text = "main", dat_zmena = "main", nazev_rf = "main",}
	const enum GUcrUkazatelHistoryDtoTypes { radek = "number", text = "string", dat_zmena = "JsonDate", nazev_rf = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\Ukazatel\GUctUkazatelListRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pozadavek na seznam pozadavku*/
	interface GUctUkazatelListRequestDto {
		/**Typ ulohy*/
		TypUlohy?: Gordic.Uct.Interface.GProhlizeniUctTaskType|null;
		/**Limit dat poct nactenych dat*/
		Limit?: number|null;
		/**Maska*/
		Maska?: Gordic.Uct.Interface.GUcrUkazatelFilterDto|null;
	}
	const enum GUctUkazatelListRequestDtoNames { TypUlohy = "TypUlohy", Limit = "Limit", Maska = "Maska",}
	const enum GUctUkazatelListRequestDtoFragments { TypUlohy = "*", Limit = "*", Maska = "*",}
	const enum GUctUkazatelListRequestDtoTypes { TypUlohy = "Gordic.Uct.Interface.GProhlizeniUctTaskType", Limit = "number", Maska = "Gordic.Uct.Interface.GUcrUkazatelFilterDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\VYK\GListVykazuFilterDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**filtr vykazu*/
	interface GListVykazuFilterDto {
		ixs_vkz?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.kod_vkz*/
		kod_vkz?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.typ_vkz*/
		typ_vkz?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.ixb*/
		ixb?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.den*/
		den?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.stav_vkz*/
		stav_vkz?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: GIntervalDto<number>|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.zmenu_prov_rf*/
		zmenu_prov_rf?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.id_csuis*/
		id_csuis?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.dat_zmena_ixb*/
		dat_zmena_ixb?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Seznam.zmenu_prov_ixb*/
		zmenu_prov_ixb?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.zmenu_prov_ixb*/
		zmenu_prov_rf_ixb?: GIntervalDto<string>|null;
	}
	const enum GListVykazuFilterDtoNames { ixs_vkz = "ixs_vkz", por_cislo = "por_cislo", kod_vkz = "kod_vkz", nazev = "nazev", poznamka = "poznamka", typ_vkz = "typ_vkz", ixb = "ixb", ico = "ico", ucs = "ucs", rok = "rok", mesic = "mesic", den = "den", stav_vkz = "stav_vkz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_rf = "zmenu_prov_rf", id_csuis = "id_csuis", dat_zmena_ixb = "dat_zmena_ixb", zmenu_prov_ixb = "zmenu_prov_ixb", zmenu_prov_rf_ixb = "zmenu_prov_rf_ixb",}
	const enum GListVykazuFilterDtoFragments { ixs_vkz = "*", por_cislo = "*", kod_vkz = "*", nazev = "*", poznamka = "*", typ_vkz = "*", ixb = "*", ico = "*", ucs = "*", rok = "*", mesic = "*", den = "*", stav_vkz = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_rf = "*", id_csuis = "*", dat_zmena_ixb = "*", zmenu_prov_ixb = "*", zmenu_prov_rf_ixb = "*",}
	const enum GListVykazuFilterDtoTypes { ixs_vkz = "GIntervalDto<string>", por_cislo = "GIntervalDto<number>", kod_vkz = "GIntervalDto<string>", nazev = "GIntervalDto<string>", poznamka = "GIntervalDto<string>", typ_vkz = "GIntervalDto<number>", ixb = "GIntervalDto<string>", ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", den = "GIntervalDto<number>", stav_vkz = "GIntervalDto<number>", aktivita = "GIntervalDto<number>", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "GIntervalDto<string>", zmenu_prov_rf = "GIntervalDto<string>", id_csuis = "GIntervalDto<string>", dat_zmena_ixb = "GIntervalDto<JsonDate>", zmenu_prov_ixb = "GIntervalDto<string>", zmenu_prov_rf_ixb = "GIntervalDto<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\DTO\VYK\GUcrVykazDavkaResponse.d.ts 

declare namespace Gordic.Uct.Interface {
	/**ReadOnly DTO se zkratkami*/
	interface GUcrVykazDavkaResponse {
		/**vystupni soubor*/
		FileDto?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Vysledek akce*/
		Result?: string|null;
	}
	const enum GUcrVykazDavkaResponseNames { FileDto = "FileDto", Result = "Result",}
	const enum GUcrVykazDavkaResponseFragments { FileDto = "*", Result = "*",}
	const enum GUcrVykazDavkaResponseTypes { FileDto = "Gordic.General.ApplicationInterface.GFileInfoDto", Result = "string",}
	const enum GUcrVykazDavkaResponseTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\IGUcrInfos.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**interface pro další informace v UCR*/
	interface UcrInfos {
		getInfo(rq?:CallParams<{mesic:number,rok:number}>): _Task<{mesic:number,rok:number},Gordic.Uct.Interface.GUcrInfoDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrInfos: ServiceBase & Catalog.UcrInfos;
	}
	const UcrInfos: Client["UcrInfos"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\IGUCRParams.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro inicializaci Parametru UCR*/
	interface UCRParams {
		/**Ziskani globalnich parametru*/
		read(rq?:CallParams<{}>): _Task<{},Gordic.Uct.Interface.GUcrGlobalDto>;
		/**Ulozeni hodnot do cache*/
		save(rq?:CallParams<{ucrParams:Gordic.Uct.Interface.GUcrGlobalDto}>): _Task<{ucrParams:Gordic.Uct.Interface.GUcrGlobalDto},void>;
		/**Změna režimu provozu včetně zapamatování*/
		setRezimProvozu(rq?:CallParams<{value:Gordic.Uct.Interface.GUcrRezimProvozu}>): _Task<{value:Gordic.Uct.Interface.GUcrRezimProvozu},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UCRParams: ServiceBase & Catalog.UCRParams;
	}
	const UCRParams: Client["UCRParams"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\DPH\IGUcrDph.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro podporu práce s DPH
	* @domain VystupyUcR
	* @businessObject UcrDph
	*/
	interface UcrDph {
		/**Načtení období daňové evidence*/
		readObdobiDanEvidence(rq?:CallParams<{}>): _Task<{},Gordic.Uct.Interface.GEkosazoDto[]>;
		/**Seznam stavů daňové evidence (uctaixm)*/
		listDanovaEvidence(rq?:CallParams<{filter:Gordic.Uct.Interface.GEkoSeznamDphFilterDto}>): _Task<{filter:Gordic.Uct.Interface.GEkoSeznamDphFilterDto},Gordic.Uct.Interface.GEkoDanEvidenceListResponseDto>;
		/**Načtení podkladů daňového přiznání*/
		list(rq?:CallParams<{rq:Gordic.Uct.Interface.GEkoDanPriznaniListRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GEkoDanPriznaniListRequestDto},GServiceListResponse<Gordic.Uct.Interface.GEkoSeznamDphDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrDph: ServiceBase & Catalog.UcrDph;
	}
	const UcrDph: Client["UcrDph"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Filtr\IGUcrFiltr.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu filtru
	* @domain VystupyUcR
	* @businessObject Filtr
	*/
	interface UcrFiltr {
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUcrMaskaDto>>;
		/**Načte detail masky z DB*/
		read(rq?:CallParams<{ixs_msk:string}>): _Task<{ixs_msk:string},GServiceReadResponse<Gordic.Uct.Interface.GUcrMaskaDto>>;
		/**Ulozeni nove nebo stavajici masky*/
		upsert(rq?:CallParams<{filter:Gordic.Uct.Interface.GUcrMaskaDto}>): _Task<{filter:Gordic.Uct.Interface.GUcrMaskaDto},GServiceSaveRequest<Gordic.Uct.Interface.GUcrMaskaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrFiltr: ServiceBase & Catalog.UcrFiltr;
	}
	const UcrFiltr: Client["UcrFiltr"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Konsolidace\IGUcrKonsolidaceStavy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro podporu práce s konsolidovanými stavy
	* @domain VystupyUcR
	* @businessObject Konsolidace stavu
	*/
	interface UcrKonsolidaceStavy {
		/**Načtení seznamu konsolidovaných stavů*/
		listData(rq?:CallParams<{rq:Gordic.Uct.Interface.GUcrKonsolidaceStavyListRequestDto,filter:GServiceListRequest}>): _Task<{rq:Gordic.Uct.Interface.GUcrKonsolidaceStavyListRequestDto,filter:GServiceListRequest},GServiceListResponse<Gordic.Uct.Interface.GUctakonDto>>;
		/**Seznam konsolidovaných stavů*/
		list(rq?:Gordic.Uct.Interface.GUcrKonsolidaceStavyListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctakonDto>>;
		/**Počet konsolidovaných stavů*/
		count(rq?:Gordic.Uct.Interface.GUcrKonsolidaceStavyListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Přepočet konsolidovaných stavů*/
		recalculation(rq?:CallParams<{}>): _Task<{},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrKonsolidaceStavy: ServiceBase & Catalog.UcrKonsolidaceStavy;
	}
	const UcrKonsolidaceStavy: Client["UcrKonsolidaceStavy"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Konsolidace\IGUcrKonsolidaceTransformace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro transformačních předpisů
	* @domain VystupyUcR
	* @businessObject Konsolidace stavu transformace
	*/
	interface UcrKonsolidaceTransformace {
		/**Načtení transformačních řádku dle filtru*/
		list(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Uct.Interface.GUctdmpaDto>>;
		/**Odstranění řádku transformačního předpisu*/
		hromadneOdstranit(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctdmpaDto[]}>): _Task<{rq:Gordic.Uct.Interface.GUctdmpaDto[]},void>;
		/**Uloženíeni/oprava řádku transformačních předpisů*/
		upsert(rq?:CallParams<{row:Gordic.Uct.Interface.GUctdmpaDto}>): _Task<{row:Gordic.Uct.Interface.GUctdmpaDto},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrKonsolidaceTransformace: ServiceBase & Catalog.UcrKonsolidaceTransformace;
	}
	const UcrKonsolidaceTransformace: Client["UcrKonsolidaceTransformace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Obalkovac\IGUcrObalkovac.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu obalkovace
	* @domain VystupyUcR
	* @businessObject UcrObalkovac
	*/
	interface UcrObalkovac {
		/**PridejObalku*/
		pridejObalku(rq?:CallParams<{rq:Gordic.Uct.Interface.GUcrObalkovacRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUcrObalkovacRequestDto},Gordic.General.ApplicationInterface.GFileInfoDto>;
		/**InboxSeznamZpravRequest*/
		inboxSeznamZpravRequest(rq?:CallParams<{rq:Gordic.Uct.Interface.GUcrObalkovacRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUcrObalkovacRequestDto},string>;
		/**InboxDetailZpravyRequest*/
		inboxDetailZpravyRequest(rq?:CallParams<{rq:Gordic.Uct.Interface.GUcrObalkovacRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUcrObalkovacRequestDto},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrObalkovac: ServiceBase & Catalog.UcrObalkovac;
	}
	const UcrObalkovac: Client["UcrObalkovac"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Pozadavky\IGUcrPozadavek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu požadavků
	* @domain VystupyUcR
	* @businessObject Pozadavky
	*/
	interface UcrPozadavek {
		/**Načtení seznamu požadavků*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUcrSeznamPozadavkuDto>>;
		/**Počet požadavků*/
		count(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Vymazani pozadavku*/
		delete(rq?:CallParams<{identifikator:string}>): _Task<{identifikator:string},void>;
		/**Nacteni hlavicky dokladu*/
		read(rq?:CallParams<{identifikator:string}>): _Task<{identifikator:string},GServiceReadResponse<Gordic.Uct.Interface.GUcrSeznamPozadavkuDto>>;
		/**Ulozeni požadavku*/
		save(rq?:Gordic.Uct.Interface.GUcrPozadavekDetailDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUcrPozadavekDetailDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUcrPozadavekDetailDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUcrPozadavekDetailDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrPozadavek: ServiceBase & Catalog.UcrPozadavek;
	}
	const UcrPozadavek: Client["UcrPozadavek"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Registr PZ\IGUcrRegistrZP.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu registru Závazků a požadavků
	* @domain VystupyUcR
	* @businessObject Registr zavazku a pozadavku
	*/
	interface UcrRegistrZP {
		/**Počet záznamu registru Závazků a požadavků*/
		count(rq?:Gordic.Uct.Interface.GUcrListRequestRegistrPZDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Seznam zaznamu*/
		list(rq?:Gordic.Uct.Interface.GUcrListRequestRegistrPZDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GRegistrZPDto>>;
		/**Seznamu registru*/
		listData(rq?:CallParams<{maska:Gordic.Eko.Interface.GRegistrZPfilterDto,rq:GServiceListRequest}>): _Task<{maska:Gordic.Eko.Interface.GRegistrZPfilterDto,rq:GServiceListRequest},GServiceListResponse<Gordic.Eko.Interface.GRegistrZPDto>>;
		/**Seznamu s hodnotami*/
		listWithValues(rq?:CallParams<{mesic:number,rq:Gordic.Eko.Interface.GRegistrZPDto[]}>): _Task<{mesic:number,rq:Gordic.Eko.Interface.GRegistrZPDto[]},Gordic.Uct.Interface.GUcrHodnotyListResponseDto>;
		/**Seznam hodnot registru*/
		listHodnoty(rq?:CallParams<{rq:Gordic.Uct.Interface.GUcrHodnotyListRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUcrHodnotyListRequestDto},GServiceListResponse<Gordic.Uct.Interface.GUctssudModDto>>;
		/**Uložení změn hodnot registru*/
		upsert(rq?:CallParams<{month:number,row:Gordic.Eko.Interface.GRegistrZPDto,hodnoty:Gordic.Uct.Interface.GUctssudModDto[]}>): _Task<{month:number,row:Gordic.Eko.Interface.GRegistrZPDto,hodnoty:Gordic.Uct.Interface.GUctssudModDto[]},void>;
		/**Test vstupního pidu, zda existuje. Případě existence vrací agendu k ekteré patří*/
		testExistsIxp(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Uct.Interface.GUcrTestIxpResponceDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrRegistrZP: ServiceBase & Catalog.UcrRegistrZP;
	}
	const UcrRegistrZP: Client["UcrRegistrZP"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Risre\IGUcrRisreIissp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu RISRE stavy rezervace
	* @domain VystupyUcR
	* @businessObject Risre IISSP
	*/
	interface UcrRisreIissp {
		/**Pocet nezarazenych učetnich zápisu*/
		count(rq?:Gordic.Uct.Interface.GRisreIIsspFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		list(rq?:Gordic.Uct.Interface.GRisreIIsspFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GRisreIIsspDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrRisreIissp: ServiceBase & Catalog.UcrRisreIissp;
	}
	const UcrRisreIissp: Client["UcrRisreIissp"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Risre\IGUcrRisreSkutecnost.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu RISRE
	* @domain VystupyUcR
	* @businessObject Risre IISSP
	*/
	interface UcrRisreSkutecnost {
		/**Seznam nezarazenych účetních zápisů*/
		list(rq?:Gordic.Uct.Interface.GUctZapisListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
		/**Pocet nezarazenych učetnich zápisu*/
		count(rq?:Gordic.Uct.Interface.GUctZapisListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Zatřídění zápisu do RISRE*/
		zatridit(rq?:CallParams<{zapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto,id_hdr_ris:string,radek_hdr:number}>): _Task<{zapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto,id_hdr_ris:string,radek_hdr:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrRisreSkutecnost: ServiceBase & Catalog.UcrRisreSkutecnost;
	}
	const UcrRisreSkutecnost: Client["UcrRisreSkutecnost"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Risre\IGUcrRisreStavy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu RISRE Stavy
	* @domain VystupyUcR
	* @businessObject UcrIISSPStavy
	*/
	interface UcrRisreStavy {
		/**Stavy RISRE*/
		list(rq?:CallParams<{agregace:boolean,maska:Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto,filter:GServiceListRequest}>): _Task<{agregace:boolean,maska:Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto,filter:GServiceListRequest},GServiceListResponse<Gordic.Uct.Interface.GUctaspsDto>>;
		/**Přepocet stavů*/
		prepocet(rq?:CallParams<{}>): _Task<{},void>;
		/**Uplný přepocet*/
		prepocetUplny(rq?:CallParams<{}>): _Task<{},void>;
		/**Počet zznamů k přepočtu*/
		pocetZaznamuKPrepoctu(rq?:CallParams<{uplny:boolean}>): _Task<{uplny:boolean},number>;
		/**Vytvoření dávky výkazu*/
		createDose(rq?:CallParams<{request:Gordic.Uct.Interface.GUcrVytvorDavkuRequest}>): _Task<{request:Gordic.Uct.Interface.GUcrVytvorDavkuRequest},void>;
		/**Zjištění aktuálního FM (finanční místo) a rezimu*/
		zjistiFmARezim(rq?:CallParams<{}>): _Task<{},Gordic.Uct.Interface.GUcrFMRezimResponse>;
		/**Seznam bankovnich uctu*/
		listBankovniUcty(rq?:CallParams<{keDni:JsonDate}>): _Task<{keDni:JsonDate},GServiceListResponse<Gordic.Uct.Interface.GRisreBankaDto>>;
		/**Agregované stavy RISRE ke dni pro Inbox*/
		stavyRozpoctu(rq?:CallParams<{maska:Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto,filter:GServiceListRequest}>): _Task<{maska:Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto,filter:GServiceListRequest},GServiceListResponse<Gordic.Uct.Interface.GUctaspsDto>>;
		/**Agregované stavy RISRE ke dni pro Inbo*/
		stavyCerpaniRozpoctu(rq?:CallParams<{maska:Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto,filter:GServiceListRequest}>): _Task<{maska:Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto,filter:GServiceListRequest},GServiceListResponse<Gordic.Uct.Interface.GUctaspsDto>>;
		/**Agregované stavy RISRE ke dni pro Inbox*/
		stavySkutecnosti(rq?:CallParams<{maska:Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto,filter:GServiceListRequest}>): _Task<{maska:Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto,filter:GServiceListRequest},GServiceListResponse<Gordic.Uct.Interface.GUctaspsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrRisreStavy: ServiceBase & Catalog.UcrRisreStavy;
	}
	const UcrRisreStavy: Client["UcrRisreStavy"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Saldokonto\IGUcrSaldokonto.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu saldokonta
	* @domain VystupyUcR
	* @businessObject Saldokonto
	*/
	interface UcrSaldokonto {
		/**Seznam záznamů saldokonta*/
		listData(rq?:CallParams<{maska:Gordic.Uct.Interface.GUcrFilterDto,rq:Gordic.Uct.Interface.GUcrListRequestDto}>): _Task<{maska:Gordic.Uct.Interface.GUcrFilterDto,rq:Gordic.Uct.Interface.GUcrListRequestDto},GServiceListResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
		/**Seznam záznamů saldokonta*/
		list(rq?:Gordic.Uct.Interface.GUcrListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
		/**Pocet záznamů*/
		count(rq?:Gordic.Uct.Interface.GUcrListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrSaldokonto: ServiceBase & Catalog.UcrSaldokonto;
	}
	const UcrSaldokonto: Client["UcrSaldokonto"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Stavy\IGRozStav.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu rozpočtových stavů
	* @domain VystupyUcR
	* @businessObject Rozpočtový stav
	*/
	interface UcrRozpoctovyStav {
		/**Seznam záznamů rozpočtových stavů*/
		list(rq?:Gordic.Uct.Interface.GRoztStavytRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
		/**Počet rozpočtových stavů*/
		count(rq?:Gordic.Uct.Interface.GRoztStavytRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrRozpoctovyStav: ServiceBase & Catalog.UcrRozpoctovyStav;
	}
	const UcrRozpoctovyStav: Client["UcrRozpoctovyStav"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Stavy\IGRozStavyAat.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu rozpočtových stavů
	* @domain VystupyUcR
	* @businessObject Stavy ROZ
	*/
	interface UcrRozStavyAat {
		/**Nacteni seznamu stavu aat*/
		list(rq?:Gordic.Uct.Interface.GRozStavyAatListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GRozSeznamAatDto>>;
		/**načte počet a součty zápisů dle masky*/
		count(rq?:Gordic.Uct.Interface.GRozStavyAatListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrRozStavyAat: ServiceBase & Catalog.UcrRozStavyAat;
	}
	const UcrRozStavyAat: Client["UcrRozStavyAat"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Stavy\IGUctStav.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu účetních stavů
	* @domain VystupyUcR
	* @businessObject Účetní stav
	*/
	interface UcrUcetniStav {
		/**Seznam záznamů účetních stavů*/
		list(rq?:Gordic.Uct.Interface.GUctStavyRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
		/**Počet záznamů stavů*/
		count(rq?:Gordic.Uct.Interface.GUctStavyRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrUcetniStav: ServiceBase & Catalog.UcrUcetniStav;
	}
	const UcrUcetniStav: Client["UcrUcetniStav"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Ukazatele\IGUcrUkazatel.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu ukazatelů	ISL služby pro obsluhu ukazatelů
	* @domain VystupyUcR
	* @businessObject Ukazatel
	*/
	interface Ukazatel {
		/**Nasteni seznamu ukazatelů*/
		list(rq?:Gordic.Uct.Interface.GUcrUkazatelFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GEkoaukaDto>>;
		/**Nasteni seznamu pozadavku*/
		count(rq?:Gordic.Uct.Interface.GUcrUkazatelFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Povoleni editovat*/
		povoleniEditace(rq?:CallParams<{typUlohy:Gordic.Uct.Interface.GProhlizeniUctTaskType}>): _Task<{typUlohy:Gordic.Uct.Interface.GProhlizeniUctTaskType},Gordic.General.ApplicationInterface.GPermission>;
		/**Editace uživatelské hodnoty stavu ukazatele*/
		update(rq?:CallParams<{row:Gordic.Uct.Interface.GEkoaukaDto,c0:JsonDecimal,c1:JsonDecimal,userChange:boolean,typUlohy:Gordic.Uct.Interface.GProhlizeniUctTaskType}>): _Task<{row:Gordic.Uct.Interface.GEkoaukaDto,c0:JsonDecimal,c1:JsonDecimal,userChange:boolean,typUlohy:Gordic.Uct.Interface.GProhlizeniUctTaskType},Gordic.Uct.Interface.GEkoaukaDto>;
		/**Přidání uživatelské poznámky*/
		addNote(rq?:CallParams<{row:Gordic.Uct.Interface.GEkoaukaDto,note:string}>): _Task<{row:Gordic.Uct.Interface.GEkoaukaDto,note:string},void>;
		/**Seznam historie hodnot*/
		listHistory(rq?:CallParams<{ixsEvp:string}>): _Task<{ixsEvp:string},GServiceListResponse<Gordic.Uct.Interface.GUcrUkazatelHistoryDto>>;
		/**Seznam poznámek*/
		listPoznamky(rq?:CallParams<{ixsEvp:string}>): _Task<{ixsEvp:string},GServiceListResponse<Gordic.Uct.Interface.GUcrUkazatelHistoryDto>>;
		/**Nasteni seznamu ukazatelů*/
		list(rq?:Gordic.Uct.Interface.GUcrUkazatelFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GEkoaukaDto>>;
		/**Nasteni seznamu pozadavku*/
		count(rq?:Gordic.Uct.Interface.GUcrUkazatelFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Povoleni editovat*/
		povoleniEditace(rq?:CallParams<{typUlohy:Gordic.Uct.Interface.GProhlizeniUctTaskType}>): _Task<{typUlohy:Gordic.Uct.Interface.GProhlizeniUctTaskType},Gordic.General.ApplicationInterface.GPermission>;
		/**Editace uživatelské hodnoty stavu ukazatele*/
		update(rq?:CallParams<{row:Gordic.Uct.Interface.GEkoaukaDto,c0:JsonDecimal,c1:JsonDecimal,userChange:boolean,typUlohy:Gordic.Uct.Interface.GProhlizeniUctTaskType}>): _Task<{row:Gordic.Uct.Interface.GEkoaukaDto,c0:JsonDecimal,c1:JsonDecimal,userChange:boolean,typUlohy:Gordic.Uct.Interface.GProhlizeniUctTaskType},Gordic.Uct.Interface.GEkoaukaDto>;
		/**Přidání uživatelské poznámky*/
		addNote(rq?:CallParams<{row:Gordic.Uct.Interface.GEkoaukaDto,note:string}>): _Task<{row:Gordic.Uct.Interface.GEkoaukaDto,note:string},void>;
		/**Seznam historie hodnot*/
		listHistory(rq?:CallParams<{ixsEvp:string}>): _Task<{ixsEvp:string},GServiceListResponse<Gordic.Uct.Interface.GUcrUkazatelHistoryDto>>;
		/**Seznam poznámek*/
		listPoznamky(rq?:CallParams<{ixsEvp:string}>): _Task<{ixsEvp:string},GServiceListResponse<Gordic.Uct.Interface.GUcrUkazatelHistoryDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ukazatel: ServiceBase & Catalog.Ukazatel;
	}
	const Ukazatel: Client["Ukazatel"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Uschovna\IGUcrUschovna.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**interface pro uschovnu ucetnich zapisu
	* @domain VystupyUcR
	* @businessObject Uschovna zapisu
	*/
	interface UcrUschovna {
		/**Nasteni seznamu kategori s podkategoriemi*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctUschovnaKategorieDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrUschovna: ServiceBase & Catalog.UcrUschovna;
	}
	const UcrUschovna: Client["UcrUschovna"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\VYK\IGUcrVykaz.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu výkazů
	* @domain VystupyUcR
	* @businessObject Vykazy
	*/
	interface UcrVykaz {
		/**Seznam výkazů*/
		list(rq?:CallParams<{maska:Gordic.Uct.Interface.GListVykazuFilterDto,filter:GServiceListRequest}>): _Task<{maska:Gordic.Uct.Interface.GListVykazuFilterDto,filter:GServiceListRequest},GServiceListResponse<Gordic.Uct.Interface.GSeznamVykazuDto>>;
		/**Odtřenění výkazu*/
		zrusit(rq?:CallParams<{ixsVkz:string,porCislo:number}>): _Task<{ixsVkz:string,porCislo:number},void>;
		/**Potvrzeni odeslani*/
		potvrdit(rq?:CallParams<{ixsVkz:string,porCislo:number}>): _Task<{ixsVkz:string,porCislo:number},void>;
		/**Storno odeslani výkazu*/
		stornovat(rq?:CallParams<{ixsVkz:string,porCislo:number}>): _Task<{ixsVkz:string,porCislo:number},void>;
		/**Ulozit jako*/
		ulozitJako(rq?:CallParams<{ixsVkz:string,porCislo:number}>): _Task<{ixsVkz:string,porCislo:number},Gordic.Uct.Interface.GUcrVykazDavkaResponse>;
		/**Otevrit*/
		otevrit(rq?:CallParams<{ixsVkz:string,porCislo:number}>): _Task<{ixsVkz:string,porCislo:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrVykaz: ServiceBase & Catalog.UcrVykaz;
	}
	const UcrVykaz: Client["UcrVykaz"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\VYK\IGUcrVykazAdm.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL služby pro obsluhu administrace výkazů
	* @domain VystupyUcR
	* @businessObject Vykazy adm
	*/
	interface UcrVykazAdm {
		/**Načteni seznamu výkazů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GVyksvkzDto>>;
		/**Seznam části vykazu*/
		listCastiVykazu(rq?:CallParams<{ixs_vkz:string,rok:number,mesic:number}>): _Task<{ixs_vkz:string,rok:number,mesic:number},GServiceListResponse<Gordic.Uct.Interface.GVyksvkzDto>>;
		/**Seznam řádků výkazů*/
		listRadkuVykazu(rq?:CallParams<{ixs_vkz:string,kod_cast_vkz:string,rok:number,mesic:number}>): _Task<{ixs_vkz:string,kod_cast_vkz:string,rok:number,mesic:number},GServiceListResponse<Gordic.Uct.Interface.GVykdvkdDto>>;
		/**Seznam sloupců řádku výkazu*/
		listSloupcuVykazu(rq?:CallParams<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,rok:number,mesic:number}>): _Task<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,rok:number,mesic:number},GServiceListResponse<Gordic.Uct.Interface.GVyksvkhDto>>;
		/**Seznam konkrétních hodnot výkazu*/
		listHodnoty(rq?:CallParams<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto}>): _Task<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto},GServiceListResponse<Gordic.Uct.Interface.GVykdvkhHodnotyDto>>;
		/**Uložení hodnoty výkazu*/
		saveValue(rq?:CallParams<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,typ_du:number,por_opak:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto,hodnota:string}>): _Task<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,typ_du:number,por_opak:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto,hodnota:string},void>;
		/**Uložení seznamu hodnot výkazu*/
		saveValues(rq?:CallParams<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto,hodnoty:Gordic.Uct.Interface.GVykColValueDto[]}>): _Task<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto,hodnoty:Gordic.Uct.Interface.GVykColValueDto[]},void>;
		/**Dotaz na historická data*/
		historie(rq?:CallParams<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto}>): _Task<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto},Gordic.Uct.Interface.GVykazRequestHistorieDto>;
		/**Seznam posledních zápisů hodnoty*/
		listHistorie(rq?:CallParams<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto}>): _Task<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto},Gordic.Uct.Interface.GUcrListObdDto[]>;
		/**Kopie hodnot z jineho obdobi*/
		kopieHodnot(rq?:CallParams<{mesic:number,rok:number,ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto}>): _Task<{mesic:number,rok:number,ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto},void>;
		/**Načtení souboru uloženého u výkazu*/
		loadFile(rq?:CallParams<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,por_opak:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto}>): _Task<{ixs_vkz:string,kod_cast_vkz:string,por_cislo:number,por_opak:number,topologie:Gordic.Uct.Interface.GVykazTopologieDto},Gordic.Uct.Interface.GVykazRequestFileDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrVykazAdm: ServiceBase & Catalog.UcrVykazAdm;
	}
	const UcrVykazAdm: Client["UcrVykazAdm"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Zapisy\IGRozZapis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Služby pro praci s rozpočtovými zápisy
	* @domain VystupyUcR
	* @businessObject UcrRozZapis
	*/
	interface UcrRozpoctovyZapis {
		/**Seznam rozpočtových zápisů*/
		list(rq?:Gordic.Uct.Interface.GUctZapisListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
		/**Pocet rozpočtových zápisů*/
		count(rq?:Gordic.Uct.Interface.GUctZapisListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Oprava rozpoctoveho zapisu*/
		update(rq?:CallParams<{puvodniZapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto,upravenyZapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto}>): _Task<{puvodniZapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto,upravenyZapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto},GServiceActionResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrRozpoctovyZapis: ServiceBase & Catalog.UcrRozpoctovyZapis;
	}
	const UcrRozpoctovyZapis: Client["UcrRozpoctovyZapis"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ucr\ISL\Zapisy\IGUctZapis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Služby pro praci s účetními zápisy
	* @domain VystupyUcR
	* @businessObject UcrUctZapis
	*/
	interface UcrUcetniZapis {
		/**Nacteni seznamu účetních zapisu*/
		listData(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctZapisListRequestDto,filters:GServiceListRequest}>): _Task<{rq:Gordic.Uct.Interface.GUctZapisListRequestDto,filters:GServiceListRequest},GServiceListResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
		/**Seznam účetních zápisů*/
		list(rq?:Gordic.Uct.Interface.GUctZapisListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
		/**Pocet učetnich zápisu*/
		count(rq?:Gordic.Uct.Interface.GUctZapisListRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Oprava ucetniho zapisu*/
		update(rq?:CallParams<{puvodniZapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto,upravenyZapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto}>): _Task<{puvodniZapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto,upravenyZapis:Gordic.Uct.Interface.GUctSeznamZapisuStavuDto},GServiceActionResponse<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>>;
		/**Ulozeni popisu dokladu*/
		ulozPopisDokladu(rq?:CallParams<{rq:Gordic.Uct.Interface.GPopisDokladuRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GPopisDokladuRequestDto},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UcrUcetniZapis: ServiceBase & Catalog.UcrUcetniZapis;
	}
	const UcrUcetniZapis: Client["UcrUcetniZapis"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\IGUctInOutParams.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\IGUctStavy.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Filtry pro stavy*/
	const enum UctStavyFilter {
		/**PAP  0=bez pap, 1=normal*/
		Pap,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GParametryOtevreniPKHDPHDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Parametry pro zobrazeni okna podkladu KH DPH*/
	interface GParametryOtevreniPKHDPHDto {
		/**Prvotni evidence dokladu*/
		PrvotniEvidence?: boolean|null;
		/**Editacni mod*/
		ClearDatumDPH?: boolean|null;
		/**Editacni mod*/
		EditMode?: boolean|null;
		/**Datum doruceni*/
		DatumDorEnabled?: boolean|null;
		/**Datum evidence*/
		DatumVystEnabled?: boolean|null;
		/**Datum zdan. plneni*/
		DatumZPEnabled?: boolean|null;
		/**Datum uplatneni dane*/
		DatumUPDEnabled?: boolean|null;
		/**Datum evidence*/
		DatumEvidenceEnabled?: boolean|null;
		/**ECDD*/
		EcddEnabled?: boolean|null;
		/**Pomer*/
		PomerEnabled?: boolean|null;
		/**polozky*/
		EditacePolozekEnabled?: boolean|null;
		/**Plneni Do*/
		PlneniDoEnabled?: boolean|null;
		/**Uskutecnene plneni*/
		PlneniEnabled?: boolean|null;
		/**Plneni s dodanenim v zahr./tuzemske*/
		PlneniSDodanenimEnabled?: boolean|null;
		/**ESU*/
		EsuEnabled?: boolean|null;
		/**Specialni mod editace Ecdd*/
		SpecialModeEcdd?: boolean|null;
	}
	const enum GParametryOtevreniPKHDPHDtoNames { PrvotniEvidence = "PrvotniEvidence", ClearDatumDPH = "ClearDatumDPH", EditMode = "EditMode", DatumDorEnabled = "DatumDorEnabled", DatumVystEnabled = "DatumVystEnabled", DatumZPEnabled = "DatumZPEnabled", DatumUPDEnabled = "DatumUPDEnabled", DatumEvidenceEnabled = "DatumEvidenceEnabled", EcddEnabled = "EcddEnabled", PomerEnabled = "PomerEnabled", EditacePolozekEnabled = "EditacePolozekEnabled", PlneniDoEnabled = "PlneniDoEnabled", PlneniEnabled = "PlneniEnabled", PlneniSDodanenimEnabled = "PlneniSDodanenimEnabled", EsuEnabled = "EsuEnabled", SpecialModeEcdd = "SpecialModeEcdd",}
	const enum GParametryOtevreniPKHDPHDtoFragments { PrvotniEvidence = "*", ClearDatumDPH = "*", EditMode = "*", DatumDorEnabled = "*", DatumVystEnabled = "*", DatumZPEnabled = "*", DatumUPDEnabled = "*", DatumEvidenceEnabled = "*", EcddEnabled = "*", PomerEnabled = "*", EditacePolozekEnabled = "*", PlneniDoEnabled = "*", PlneniEnabled = "*", PlneniSDodanenimEnabled = "*", EsuEnabled = "*", SpecialModeEcdd = "*",}
	const enum GParametryOtevreniPKHDPHDtoTypes { PrvotniEvidence = "boolean", ClearDatumDPH = "boolean", EditMode = "boolean", DatumDorEnabled = "boolean", DatumVystEnabled = "boolean", DatumZPEnabled = "boolean", DatumUPDEnabled = "boolean", DatumEvidenceEnabled = "boolean", EcddEnabled = "boolean", PomerEnabled = "boolean", EditacePolozekEnabled = "boolean", PlneniDoEnabled = "boolean", PlneniEnabled = "boolean", PlneniSDodanenimEnabled = "boolean", EsuEnabled = "boolean", SpecialModeEcdd = "boolean",}
	const enum GParametryOtevreniPKHDPHDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctDokladStavDokladuDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO stav UCT dokladu*/
	interface GUctDokladStavDokladuDto {
		/**Stav evidence dokladu*/
		IsEvidovany?: boolean|null;
		/**Stav uzavrenosti dokladu*/
		IsUzavreny?: boolean|null;
		/**Stav shvaleni dokladu*/
		IsSchvaleny?: boolean|null;
		/**Stav castecne zauctovanosti dokladu*/
		IsZauctovanoCastecne?: boolean|null;
	}
	const enum GUctDokladStavDokladuDtoNames { IsEvidovany = "IsEvidovany", IsUzavreny = "IsUzavreny", IsSchvaleny = "IsSchvaleny", IsZauctovanoCastecne = "IsZauctovanoCastecne",}
	const enum GUctDokladStavDokladuDtoFragments { IsEvidovany = "*", IsUzavreny = "*", IsSchvaleny = "*", IsZauctovanoCastecne = "*",}
	const enum GUctDokladStavDokladuDtoTypes { IsEvidovany = "boolean", IsUzavreny = "boolean", IsSchvaleny = "boolean", IsZauctovanoCastecne = "boolean",}
	const enum GUctDokladStavDokladuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctdpep.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GUctdpepDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.stav_kch*/
		stav_kch?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
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
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
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
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
		/**DBCOLUMN:Seznam.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Seznam.up_stav*/
		up_stav?: number|null;
		/**DBCOLUMN:Seznam.ac_ixe*/
		ac_ixe?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.zd*/
		zd?: number|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:Seznam.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:Seznam.priz_rez_sml*/
		priz_rez_sml?: number|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.priz_ncf*/
		priz_ncf?: number|null;
		/**DBCOLUMN:Seznam.priz_ner*/
		priz_ner?: number|null;
		/**DBCOLUMN:Seznam.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:Seznam.smlouva*/
		smlouva?: string|null;
		/**DBCOLUMN:Seznam.priz_kur_roz*/
		priz_kur_roz?: number|null;
		/**Typ kurzovych rozdilu*/
		readonly TypKurzovychRozdilu?: Gordic.Uct.Interface.GETypKurzovychRozdilu|null;
		/**Pristupny radek*/
		enabled?: boolean|null;
		/**Priznak noveho radku*/
		readonly IsNewRow?: boolean|null;
	}
	const enum GUctdpepDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ixp_den = "ixp_den", ac = "ac", radek_z = "radek_z", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", ixs_kon = "ixs_kon", up_stav = "up_stav", ac_ixe = "ac_ixe", popis = "popis", zd = "zd", uus = "uus", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", priz_rez_sml = "priz_rez_sml", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", priz_ncf = "priz_ncf", priz_ner = "priz_ner", ac_sml = "ac_sml", smlouva = "smlouva", priz_kur_roz = "priz_kur_roz", TypKurzovychRozdilu = "TypKurzovychRozdilu", enabled = "enabled", IsNewRow = "IsNewRow",}
	const enum GUctdpepDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ixp_den = "*", ac = "*", radek_z = "*", nks = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c1 = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", ixs_kon = "*", up_stav = "*", ac_ixe = "*", popis = "*", zd = "*", uus = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", priz_rez_sml = "*", id_hdr_ris = "*", radek_hdr = "*", priz_ncf = "*", priz_ner = "*", ac_sml = "*", smlouva = "*", priz_kur_roz = "*", TypKurzovychRozdilu = "*", enabled = "*", IsNewRow = "*",}
	const enum GUctdpepDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ixp_den = "string", ac = "string", radek_z = "number", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", ixs_kon = "string", up_stav = "number", ac_ixe = "string", popis = "string", zd = "number", uus = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", priz_rez_sml = "number", id_hdr_ris = "string", radek_hdr = "number", priz_ncf = "number", priz_ner = "number", ac_sml = "string", smlouva = "string", priz_kur_roz = "number", TypKurzovychRozdilu = "Gordic.Uct.Interface.GETypKurzovychRozdilu", enabled = "boolean", IsNewRow = "boolean",}
	const enum GUctdpepDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ixp_den = 12, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6, ixs_kon = 12, ac_ixe = 20, popis = 254, uus = 10, ixp_sml = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctEkoParamsDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datovy objekt pro nastaveni ekoinicializace*/
	interface GUctEkoParamsDto {
		/**Vybrane ico*/
		ICO?: string|null;
		/**UCS*/
		UCS?: string|null;
		/**UUS*/
		UUS?: string|null;
		/**Nks*/
		NKS?: string|null;
		/**Vybrany rok*/
		Rok?: number|null;
		/**Klic knihy*/
		IxpDen?: string|null;
		/**Subrada*/
		Subrada?: number|null;
		/**Nks valstni*/
		NKSVL?: string|null;
		/**Aktivita knihy*/
		AktivitaKnihy?: number|null;
		/**Povoleni zadavat znaky do ucetnich slov*/
		PrizCheckUete?: number|null;
		/**Komunikace s IISSP*/
		IsIssp?: boolean|null;
	}
	const enum GUctEkoParamsDtoNames { ICO = "ICO", UCS = "UCS", UUS = "UUS", NKS = "NKS", Rok = "Rok", IxpDen = "IxpDen", Subrada = "Subrada", NKSVL = "NKSVL", AktivitaKnihy = "AktivitaKnihy", PrizCheckUete = "PrizCheckUete", IsIssp = "IsIssp",}
	const enum GUctEkoParamsDtoFragments { ICO = "*", UCS = "*", UUS = "*", NKS = "*", Rok = "*", IxpDen = "*", Subrada = "*", NKSVL = "*", AktivitaKnihy = "*", PrizCheckUete = "*", IsIssp = "*",}
	const enum GUctEkoParamsDtoTypes { ICO = "string", UCS = "string", UUS = "string", NKS = "string", Rok = "number", IxpDen = "string", Subrada = "number", NKSVL = "string", AktivitaKnihy = "number", PrizCheckUete = "number", IsIssp = "boolean",}
	const enum GUctEkoParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctFiltrDokladuZapisyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Filtry pro zapisy uct dokladu*/
	interface GUctFiltrDokladuZapisyDto {
		/**Pid dokladu*/
		ixp?: GBaseFilter<string>|null;
		/**Radek z*/
		radek_z?: GBaseFilter<number>|null;
	}
	const enum GUctFiltrDokladuZapisyDtoNames { ixp = "ixp", radek_z = "radek_z",}
	const enum GUctFiltrDokladuZapisyDtoFragments { ixp = "*", radek_z = "*",}
	const enum GUctFiltrDokladuZapisyDtoTypes { ixp = "GBaseFilter<string>", radek_z = "GBaseFilter<number>",}
	const enum GUctFiltrDokladuZapisyDtoTypeLengths { ixp = 12,}
	/**Filtr na typ nacitanych zapisu*/
	const enum GEFiltrTypNacitanychZapisu {
		/**pouze aktivni zapisy*/
		aktivni,
		/**pouze smazane s aktivitou 900*/
		smazane,
		/**Vsechny zapisy*/
		vsechny,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctFiltrUcetniZapisy.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Filtry na uct doklady*/
	interface GUctFiltrUcetniZapisy {
		/**Cfu set*/
		cfu2?: ObjectLiteral<GIntervalDto<string>>|null;
		/**Eko policka*/
		cfu?: Gordic.Uct.Interface.GEkoPolicko|null;
		/**Nakladove stedisko*/
		nks?: GIntervalDto<string>|null;
		/**MD*/
		c0?: GIntervalDto<JsonDecimal>|null;
		/**Dal*/
		c1?: GIntervalDto<JsonDecimal>|null;
	}
	const enum GUctFiltrUcetniZapisyNames { cfu2 = "cfu2", cfu = "cfu", nks = "nks", c0 = "c0", c1 = "c1",}
	const enum GUctFiltrUcetniZapisyFragments { cfu2 = "*", cfu = "*", nks = "*", c0 = "*", c1 = "*",}
	const enum GUctFiltrUcetniZapisyTypes { cfu2 = "ObjectLiteral<GIntervalDto<string>>", cfu = "Gordic.Uct.Interface.GEkoPolicko", nks = "GIntervalDto<string>", c0 = "GIntervalDto<JsonDecimal>", c1 = "GIntervalDto<JsonDecimal>",}
	const enum GUctFiltrUcetniZapisyTypeLengths {}
	/**Eko policka*/
	interface GEkoPolicko {
		/**DBCOLUMN:Seznam.uea_0*/
		uea?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.ueb_0*/
		ueb?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.uec_0*/
		uec?: GIntervalDto<string>|null;
		/**DBCOLUMN:Seznam.uec_1	DBCOLUMN:Seznam.ued_0*/
		ued?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uee_0*/
		uee?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uef_0*/
		uef?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.ueg_0*/
		ueg?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.ueh_0*/
		ueh?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uei_0*/
		uei?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uej_0*/
		uej?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uek_0*/
		uek?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uel_0*/
		uel?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uem_0*/
		uem?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.uen_0*/
		uen?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te0_0*/
		te0?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te1_0*/
		te1?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te2_0*/
		te2?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te3_0*/
		te3?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te4_0*/
		te4?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te5_0*/
		te5?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te6_0*/
		te6?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te7_0*/
		te7?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te8_0*/
		te8?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.te9_0*/
		te9?: GBaseFilter<string>|null;
	}
	const enum GEkoPolickoNames { uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GEkoPolickoFragments { uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*",}
	const enum GEkoPolickoTypes { uea = "GIntervalDto<string>", ueb = "GIntervalDto<string>", uec = "GIntervalDto<string>", ued = "GBaseFilter<string>", uee = "GBaseFilter<string>", uef = "GBaseFilter<string>", ueg = "GBaseFilter<string>", ueh = "GBaseFilter<string>", uei = "GBaseFilter<string>", uej = "GBaseFilter<string>", uek = "GBaseFilter<string>", uel = "GBaseFilter<string>", uem = "GBaseFilter<string>", uen = "GBaseFilter<string>", te0 = "GBaseFilter<string>", te1 = "GBaseFilter<string>", te2 = "GBaseFilter<string>", te3 = "GBaseFilter<string>", te4 = "GBaseFilter<string>", te5 = "GBaseFilter<string>", te6 = "GBaseFilter<string>", te7 = "GBaseFilter<string>", te8 = "GBaseFilter<string>", te9 = "GBaseFilter<string>",}
	const enum GEkoPolickoTypeLengths { uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctGlobalDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datovy objekt pro globalni nastaveni*/
	interface GUctGlobalDto {
		/**Typ agendy*/
		TypAg?: number|null;
		/**Eko pamametry*/
		EkoParams?: Gordic.Uct.Interface.GUctEkoParamsDto;
		/**Parametry uct*/
		Params?: Gordic.Uct.Interface.GUctParamsDto|null;
		/**Ostatni nastaveni*/
		Others?: Gordic.Uct.Interface.GUcrOtherParamsDto;
	}
	const enum GUctGlobalDtoNames { TypAg = "TypAg", EkoParams = "EkoParams", Params = "Params", Others = "Others",}
	const enum GUctGlobalDtoFragments { TypAg = "*", EkoParams = "*", Params = "*", Others = "*",}
	const enum GUctGlobalDtoTypes { TypAg = "number", EkoParams = "Gordic.Uct.Interface.GUctEkoParamsDto", Params = "Gordic.Uct.Interface.GUctParamsDto", Others = "Gordic.Uct.Interface.GUcrOtherParamsDto",}
	const enum GUctGlobalDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctHromadnyRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO hromadne operace na dokladech dokladu - vstup (pozadavek)*/
	interface GUctHromadnyRequestDto extends Gordic.Uct.Interface.GUctSkupinaDokladuDto {
		/**Druh akce*/
		akce?: Gordic.Uct.Interface.GEUctHromadneOperace|null;
		/**Nova kniha*/
		IxpDenNew?: string|null;
		/**Nova funkce*/
		IxsFunNew?: string|null;
		/**Referent*/
		IxsRefNew?: string|null;
		/**Referent*/
		Duvod?: string|null;
		/**Spisovy uzel*/
		IxsSu?: string|null;
		/**Identifikátor kompetenta*/
		IxsFunVyriz?: string|null;
		/**Identifikátor realizatora*/
		CisReal?: string|null;
	}
	const enum GUctHromadnyRequestDtoNames { akce = "akce", IxpDenNew = "IxpDenNew", IxsFunNew = "IxsFunNew", IxsRefNew = "IxsRefNew", Duvod = "Duvod", IxsSu = "IxsSu", IxsFunVyriz = "IxsFunVyriz", CisReal = "CisReal", Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctHromadnyRequestDtoFragments { akce = "*", IxpDenNew = "*", IxsFunNew = "*", IxsRefNew = "*", Duvod = "*", IxsSu = "*", IxsFunVyriz = "*", CisReal = "*", Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctHromadnyRequestDtoTypes { akce = "Gordic.Uct.Interface.GEUctHromadneOperace", IxpDenNew = "string", IxsFunNew = "string", IxsRefNew = "string", Duvod = "string", IxsSu = "string", IxsFunVyriz = "string", CisReal = "string", Seznam = "Gordic.Uct.Interface.GUctVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
	const enum GUctHromadnyRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctParamsDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datovy objekt parametru uct*/
	interface GUctParamsDto {
		/**O kolik dni muze byt doklad zauctovan drive. Pokud je to nula, 
		*     nebo mensi nez nula, pak datum zauctovani musi byt stejne jako aktualni datum.
		*     19.1.15 KK - chybny nazev parametru, bylo .._uup namisto .._upp
		*/
		PovolenyPredstihZauctovaniDokladu?: number|null;
		/**Povoleni generovad PID*/
		PovolitGenerovaniPiduDokladu?: boolean|null;
		/**Pokud false, paklze cizi doklady aktivne menit, pokud true, lze je pouze prohlizet.*/
		AktivniPristupKCizimDokladum?: boolean|null;
		/**Povoleni vazby na zauctovanych dokladech*/
		PovoleniVazbyNaZauctDokl?: boolean|null;
		/**Povoleni opravy hlavicky*/
		PovolitOpravuHlavickyDokladu?: boolean|null;
		/**EKO - ŘP Řízení účetních vazeb dle kategorií
		*     Podk je true, pak musi opravne doklady vazat na prim doklady
		*/
		RizeniUcetnichVazebDleKategorii?: boolean|null;
		/**Vraci pouze primy/neprimy*/
		RezimZadavaniCislaUcetnihoDokladu?: Gordic.Uct.Interface.RezimZadavaniCislaRozpoctovehoDokladuEnum|null;
		/**pri pouziti uct_rada_acag a pri jeji hodnote rada plnit pri evidenci*/
		RadaAgendovychCisel?: number|null;
		/**Povolit hromadne uzavreni dokladu*/
		PovolitHromadneUzavreniDokladu?: boolean|null;
		/**Povoleni uzavreni dokladu*/
		PovolitUzavreniDokladu?: boolean|null;
		/**Povolit zauctovani dokladu*/
		PovolitZauctovaniDokladu?: boolean|null;
		/**Povoleni schvaleni dokladu*/
		PovolitSchvaleniDokladu?: boolean|null;
		/**Povoleni zruseni schvaleni dokladu*/
		PovolitZruseniSchvaleniDokladu?: boolean|null;
		/**Povoleni stornovani dokladu*/
		PovolitStornoDokladu?: boolean|null;
		/**Rezim zobrazeni dokladu*/
		RezimZobrazeniDokladu?: Gordic.Uct.Interface.RezimZobrazeniDokladuEnum|null;
		/**Rezim vazby na prim doklady (zakladni,uctarna,realizator,kompetent, vlastnik)*/
		RezimVazbyNaPrimarniDoklady?: Gordic.Uct.Interface.RezimVazbyNaPrimarniDokladyEnum|null;
		/**urcuje nastaveni promennych pred podanim dokladu,pred evidenci,rizeni pristupnosti poli 
		*     Tohle pocka. IGNORE!!!!!!!!!!!!!!!!1
		*/
		RezimProvozu?: Gordic.Uct.Interface.RezimProvozuEnum|null;
		/**Povoleni preevidence*/
		PovolitPreevidenceDokladu?: boolean|null;
		/**Povoleni predani*/
		PovolitPredaniDokladu?: boolean|null;
		/**Povoleni podani*/
		PovolitPodaniDokladu?: boolean|null;
		/**Povolit predkontace na dokladu*/
		PovolitSpusteniPredkontace?: boolean|null;
		/**Povolit opravu zapisu dokladu*/
		PovolitOpravuPolozkyDokladu?: boolean|null;
		/**Povoleni provest napocet castky na polozky financniho profilu smlouvy*/
		PovolitNapocetNaFPSML?: boolean|null;
		/**Povolit vazbu na smlouvu*/
		PovolitVazbaNaSmlouvu?: boolean|null;
		/**Povolit evidenci dokladu*/
		PovolitEvidenciDokladu?: boolean|null;
		/**Povoleni porizovani polozek dokladu*/
		PovolitPorizovaniPolozkovehoProfilu?: boolean|null;
		/**Povolit zruseni storna dokladu*/
		PovolitAktivaciStornoDokladu?: boolean|null;
		/**Povolit aktivni pristup k cizim dokladum*/
		PovolitAktivniPristupKCizimDokladum?: boolean|null;
		/**Povoleni podpory schvalovaciho procesu*/
		PodporaSchvalovacihoProcesuGIN?: boolean|null;
		/**Povoleni podpory schvalovaciho procesu*/
		PodporaSchvalovacihoProcesuUCT?: boolean|null;
		/**Povoleni podpory schvalovaciho procesu (kontorla obou parametru)*/
		PodporaSchvalovaciho?: boolean|null;
		/**Povolení pracovat s interním daňovým dokladem.*/
		PovoleniPraceSInternimDanDokladem?: boolean|null;
		/**Povolení předplňovat jednoznačné hodnoty do pořizovače*/
		PovoleniPredplnovatHodnotyDoPorizovace?: boolean|null;
		/**Povoleni importu zapisu*/
		PovolitImportDoZapisu?: boolean|null;
		/**UCT – ŘP Povinná vazba na SML u KR ztráty při realizaci příjmu (POL 5142)*/
		KurzoveRozdilyPovinnaSmlouvaZRP?: boolean|null;
		/**Povolení změny stavu úhrady v KOF*/
		PovolitZmenuStavuUhrady?: boolean|null;
		/**O kolik dni muze byt doklad zauctovan drive. Pokud je to nula, 
		*     nebo mensi nez nula, pak datum zauctovani musi byt stejne jako aktualni datum.
		*     19.1.15 KK - chybny nazev parametru, bylo .._uup namisto .._upp
		*/
		PovolenyPredstihZauctovaniDoklad?: number|null;
		/**Pri manualni se umozni editace agendoveho cisla, to je pak napevno a evideuje se pomoci storovky evidence.
		*     kdyz je "rada" - zada se cislo subrady, ktere se nacte uct_def_acag - viz radaAgendovchCisel.
		*     kdyz ja "ac" - cpat tam -1.
		*/
		DefiniceAgendovehoCisla?: Gordic.Uct.Interface.DefiniceAgCislaEnum|null;
		/**Povoleni schvalovat cizi doklady*/
		PovolitSchvalovaniCizichDokladu?: boolean|null;
		/**Povoleni postupneho prouctovani*/
		PovolitPostupneZauctovani?: Gordic.Uct.Interface.GEPostupneProuctovani|null;
		/**Povoleni prekrocit limit pri zauctovani*/
		PovolitPrekrocitLimitRozpoctu?: boolean|null;
		/**Vazba NKS na funkci*/
		VazbaNksNaFunkci?: boolean|null;
		/**Zaokrouhleni rozpoctu pro ZRO*/
		ZaokrouhleniRozpoctuProZRO?: boolean|null;
		/**Povoleni vraceni dokladu do WFL vrstvy*/
		PovolitVraceniDokladuDoWFL?: boolean|null;
		/**TePovoleni uctovani do jiz uzavreneho obdobi (1-ano, 0-ne)*/
		PovolenoUctovaniDoUzavrenehoObdobi?: boolean|null;
		/**Povoleni prevzeti dokladu*/
		PovolenoPrevzetiDokladu?: boolean|null;
		/**Povoleni překročení maximálního limitu na bankovnim uctu (1-ano, 0-ne)*/
		PovoleniPrekroceniMaximalnihoLimituBU?: boolean|null;
		/**Přednastavení stavu zaúčtování dokladu v primární agendě po jeho zaúčtování dokladem UCT*/
		PrednastaveniStavuZauctVPrimAgende?: number|null;
		/**Přednastavení stavu zaúčtování dokladu v primární agendě po jeho zaúčtování dokladem UCT*/
		PrednastaveniHodnotyVyberuStavuZauctVPrimAgende?: number|null;
		/**Povoleni hromadneho zauctovani dokladu (uct_rad_hrzauc)*/
		PovolitHromadnehoZauctovaniDokladu?: boolean|null;
		/**Omezeni vazby na smlouvy dle stavu dokladu*/
		OmezeniVazbyNaSmlouvu?: Gordic.Uct.Interface.OmezeniVazbyNaSmlouvuE|null;
		/**Povoleni kopie dokladu*/
		PovolenaKopieDokladu?: boolean|null;
		/**Urcuje, zdali je mozno zavrit knihu*/
		PovolitUzavreniKnihy?: boolean|null;
		/**Zdali je mozno opet otevrit uzavrenou knihu(a tim i agendu)*/
		ZruseniUzavreniKnihy?: boolean|null;
		/**Povoleni uzavrit agendu*/
		PovolitUzavreniAgendy?: boolean|null;
		/**Priznak zda pri uzaverce rovnou odlevat data*/
		AutomatickeOdlevaniDatPriUzaverceKnihy?: number|null;
		/**pri povoleni zapise popis dane urovne rozvrhu do popisu uctdpepu*/
		PredvyplneniNazvuUcetniAnalytikyDoPopisuZapisu?: string|null;
		/**Povoleni smazani zapisu dokladu*/
		PovolitSmazaniZapisu?: boolean|null;
		/**EKO - Výběr pořizovacího objektu položek dokladu*/
		PouzivatStaryPorizovac?: boolean|null;
		/**Uroven porizovani do uctoveho rozvehu*/
		UrovenPorizovaniDoUctovehoRozvrhuUct?: string|null;
		/**Rezim vornovnavani dokladu dokladovy, strediskovy*/
		RezimVyrovnaniDokladu?: Gordic.Uct.Interface.RezimVyrovnaniDokladuEnum|null;
		/**Kontrolovat zakazane subrady z knihy.(zakazana subrada nelze pouzit na dokladu)*/
		KontrolovatVyberuSubradyDleKnihy?: boolean|null;
		/**Kontrola nuloveho obratu bankovnihoU uctu*/
		KontrolaNulovehoObratuBankovnihoUctu?: number|null;
		/**Povoleni financni kontroly*/
		PovoleniFinancniKontroly?: number|null;
		/**Povoleni ucetni kontroly
		*     EKO – ŘP Režim dokladové účetní kontroly
		*/
		PovoleniUcetniKontroly?: boolean|null;
		/**Povoleni hromadne ucetni kontroly
		*     
		*     EKO – ŘP Režim dokladové účetní kontroly
		*/
		PovoleniHromadneUcetniKontroly?: boolean|null;
		/**UCT - Režim provádění účetní kontroly
		*     uct_rez_uck
		*/
		RezimUcetniKontroly?: Gordic.Uct.Interface.GERezimUcetniKontroly|null;
		/**EKO – ŘP Režim kontroly použití hodnot pro dodatečné daňové přiznání*/
		PovoleniKontrolyProDodatecneDanPriznani?: boolean|null;
		/**Vycet dani DPH, ktere chce uzivatel kontrolovat*/
		KontrolaDanovychUctuVycet?: string[]|null;
		/**Kontrola danovych uctu dokladu*/
		KontrolaDanovychUctu?: Gordic.Uct.Interface.GEKontrolaDanovychUctu|null;
		/**Kontrola PAP uctovani (1-ano, 0-ne)*/
		KontrolaPapUctovani?: boolean|null;
		/**Kontrola na sumace za třídy účtů (0-6, 7, 8, 9) při schvalování dokladu.*/
		KontrolaNaTridyPriSchvalovani?: Gordic.Uct.Interface.GEKontrolaTridyUctu|null;
		/**parametr urcuje zda se provadi kontrola dle uct_ctrl_uup pokud se realizuje drive nez je nastavene datum dokladu*/
		KontrolaDataZauctovaniShodneSDnesnimDnem?: boolean|null;
		/**Kontrolovat na prekroceni rozpoctu*/
		KontrolaPrekroceniLimituRozpoctu?: boolean|null;
		/**pokud je to false, nevola se pred zauctovanim uct1tdokex, ale jde se rovnou do zauctovani.*/
		KontrolaNaRozvrhPriUctovani?: boolean|null;
		/**Kontrola  rok, mesic, den na dokladu musi sedet na kalendarni datum, 
		*     jinak nabizet mesice dle otevrenych a dny 1-31
		*/
		KontrolaDneVMesiciPodleKalendare?: boolean|null;
		/**Povoleni uzivatelske predkontace*/
		PovoleniUzivatelskePredkontace?: Gordic.Eko.Interface.GEPovoleniUzivatelskePredkontace|null;
		/**Povolení nulových častek v předkontacích*/
		PovoleniNulVPredkontaci?: Gordic.Uct.Interface.GEPovoleniNulVPredkontace|null;
		/**Povoleni prevodu predkontaci na verejne*/
		PovoleniPrevoduPredkontace?: Gordic.Eko.Interface.GEPovoleniPrevoduPredkontace|null;
		/**GIN ESU - stupně verifikace ESU umožňující evidenci bez varování (blokace při jiném stupni) (ISZR)*/
		VerifikaceESUBlokace?: string[]|null;
		/**GIN ESU - stupně verifikace ESU umožňující evidenci s varováním (ISZR, ... )*/
		VerifikaceESUVarovani?: string[]|null;
		/**Automaticek otevirani okna Pokladu kontrolniho hlaseni DPH pri evidenci*/
		AutomatickeOtevreniKHDPH?: Gordic.Uct.Interface.GEAutomatickeOtevreniKontrolnihoHlaseni|null;
		/**Povoleni editace cizich masek*/
		PovolitEditaciCiziMasky?: boolean|null;
		/**Upresneni financni kontroly*/
		FinancniKontrolaUpresneni?: Gordic.Uct.Interface.GEFinancniKontrolaUpresneni|null;
		/**Povoleni zmeny kompetenta*/
		PovoleniZmenitKompetenta?: boolean|null;
		/**Typ instalace databaze*/
		TypInstalaceDatabaze?: Gordic.Uct.Interface.GTypInstalace|null;
		DostupneKnihyKUzaveni?: Gordic.Uct.Interface.GDostupneKnihyKUzavreniEnum|null;
	}
	const enum GUctParamsDtoNames { PovolenyPredstihZauctovaniDokladu = "PovolenyPredstihZauctovaniDokladu", PovolitGenerovaniPiduDokladu = "PovolitGenerovaniPiduDokladu", AktivniPristupKCizimDokladum = "AktivniPristupKCizimDokladum", PovoleniVazbyNaZauctDokl = "PovoleniVazbyNaZauctDokl", PovolitOpravuHlavickyDokladu = "PovolitOpravuHlavickyDokladu", RizeniUcetnichVazebDleKategorii = "RizeniUcetnichVazebDleKategorii", RezimZadavaniCislaUcetnihoDokladu = "RezimZadavaniCislaUcetnihoDokladu", RadaAgendovychCisel = "RadaAgendovychCisel", PovolitHromadneUzavreniDokladu = "PovolitHromadneUzavreniDokladu", PovolitUzavreniDokladu = "PovolitUzavreniDokladu", PovolitZauctovaniDokladu = "PovolitZauctovaniDokladu", PovolitSchvaleniDokladu = "PovolitSchvaleniDokladu", PovolitZruseniSchvaleniDokladu = "PovolitZruseniSchvaleniDokladu", PovolitStornoDokladu = "PovolitStornoDokladu", RezimZobrazeniDokladu = "RezimZobrazeniDokladu", RezimVazbyNaPrimarniDoklady = "RezimVazbyNaPrimarniDoklady", RezimProvozu = "RezimProvozu", PovolitPreevidenceDokladu = "PovolitPreevidenceDokladu", PovolitPredaniDokladu = "PovolitPredaniDokladu", PovolitPodaniDokladu = "PovolitPodaniDokladu", PovolitSpusteniPredkontace = "PovolitSpusteniPredkontace", PovolitOpravuPolozkyDokladu = "PovolitOpravuPolozkyDokladu", PovolitNapocetNaFPSML = "PovolitNapocetNaFPSML", PovolitVazbaNaSmlouvu = "PovolitVazbaNaSmlouvu", PovolitEvidenciDokladu = "PovolitEvidenciDokladu", PovolitPorizovaniPolozkovehoProfilu = "PovolitPorizovaniPolozkovehoProfilu", PovolitAktivaciStornoDokladu = "PovolitAktivaciStornoDokladu", PovolitAktivniPristupKCizimDokladum = "PovolitAktivniPristupKCizimDokladum", PodporaSchvalovacihoProcesuGIN = "PodporaSchvalovacihoProcesuGIN", PodporaSchvalovacihoProcesuUCT = "PodporaSchvalovacihoProcesuUCT", PodporaSchvalovaciho = "PodporaSchvalovaciho", PovoleniPraceSInternimDanDokladem = "PovoleniPraceSInternimDanDokladem", PovoleniPredplnovatHodnotyDoPorizovace = "PovoleniPredplnovatHodnotyDoPorizovace", PovolitImportDoZapisu = "PovolitImportDoZapisu", KurzoveRozdilyPovinnaSmlouvaZRP = "KurzoveRozdilyPovinnaSmlouvaZRP", PovolitZmenuStavuUhrady = "PovolitZmenuStavuUhrady", PovolenyPredstihZauctovaniDoklad = "PovolenyPredstihZauctovaniDoklad", DefiniceAgendovehoCisla = "DefiniceAgendovehoCisla", PovolitSchvalovaniCizichDokladu = "PovolitSchvalovaniCizichDokladu", PovolitPostupneZauctovani = "PovolitPostupneZauctovani", PovolitPrekrocitLimitRozpoctu = "PovolitPrekrocitLimitRozpoctu", VazbaNksNaFunkci = "VazbaNksNaFunkci", ZaokrouhleniRozpoctuProZRO = "ZaokrouhleniRozpoctuProZRO", PovolitVraceniDokladuDoWFL = "PovolitVraceniDokladuDoWFL", PovolenoUctovaniDoUzavrenehoObdobi = "PovolenoUctovaniDoUzavrenehoObdobi", PovolenoPrevzetiDokladu = "PovolenoPrevzetiDokladu", PovoleniPrekroceniMaximalnihoLimituBU = "PovoleniPrekroceniMaximalnihoLimituBU", PrednastaveniStavuZauctVPrimAgende = "PrednastaveniStavuZauctVPrimAgende", PrednastaveniHodnotyVyberuStavuZauctVPrimAgende = "PrednastaveniHodnotyVyberuStavuZauctVPrimAgende", PovolitHromadnehoZauctovaniDokladu = "PovolitHromadnehoZauctovaniDokladu", OmezeniVazbyNaSmlouvu = "OmezeniVazbyNaSmlouvu", PovolenaKopieDokladu = "PovolenaKopieDokladu", PovolitUzavreniKnihy = "PovolitUzavreniKnihy", ZruseniUzavreniKnihy = "ZruseniUzavreniKnihy", PovolitUzavreniAgendy = "PovolitUzavreniAgendy", AutomatickeOdlevaniDatPriUzaverceKnihy = "AutomatickeOdlevaniDatPriUzaverceKnihy", PredvyplneniNazvuUcetniAnalytikyDoPopisuZapisu = "PredvyplneniNazvuUcetniAnalytikyDoPopisuZapisu", PovolitSmazaniZapisu = "PovolitSmazaniZapisu", PouzivatStaryPorizovac = "PouzivatStaryPorizovac", UrovenPorizovaniDoUctovehoRozvrhuUct = "UrovenPorizovaniDoUctovehoRozvrhuUct", RezimVyrovnaniDokladu = "RezimVyrovnaniDokladu", KontrolovatVyberuSubradyDleKnihy = "KontrolovatVyberuSubradyDleKnihy", KontrolaNulovehoObratuBankovnihoUctu = "KontrolaNulovehoObratuBankovnihoUctu", PovoleniFinancniKontroly = "PovoleniFinancniKontroly", PovoleniUcetniKontroly = "PovoleniUcetniKontroly", PovoleniHromadneUcetniKontroly = "PovoleniHromadneUcetniKontroly", RezimUcetniKontroly = "RezimUcetniKontroly", PovoleniKontrolyProDodatecneDanPriznani = "PovoleniKontrolyProDodatecneDanPriznani", KontrolaDanovychUctuVycet = "KontrolaDanovychUctuVycet", KontrolaDanovychUctu = "KontrolaDanovychUctu", KontrolaPapUctovani = "KontrolaPapUctovani", KontrolaNaTridyPriSchvalovani = "KontrolaNaTridyPriSchvalovani", KontrolaDataZauctovaniShodneSDnesnimDnem = "KontrolaDataZauctovaniShodneSDnesnimDnem", KontrolaPrekroceniLimituRozpoctu = "KontrolaPrekroceniLimituRozpoctu", KontrolaNaRozvrhPriUctovani = "KontrolaNaRozvrhPriUctovani", KontrolaDneVMesiciPodleKalendare = "KontrolaDneVMesiciPodleKalendare", PovoleniUzivatelskePredkontace = "PovoleniUzivatelskePredkontace", PovoleniNulVPredkontaci = "PovoleniNulVPredkontaci", PovoleniPrevoduPredkontace = "PovoleniPrevoduPredkontace", VerifikaceESUBlokace = "VerifikaceESUBlokace", VerifikaceESUVarovani = "VerifikaceESUVarovani", AutomatickeOtevreniKHDPH = "AutomatickeOtevreniKHDPH", PovolitEditaciCiziMasky = "PovolitEditaciCiziMasky", FinancniKontrolaUpresneni = "FinancniKontrolaUpresneni", PovoleniZmenitKompetenta = "PovoleniZmenitKompetenta", TypInstalaceDatabaze = "TypInstalaceDatabaze", DostupneKnihyKUzaveni = "DostupneKnihyKUzaveni",}
	const enum GUctParamsDtoFragments { PovolenyPredstihZauctovaniDokladu = "*", PovolitGenerovaniPiduDokladu = "*", AktivniPristupKCizimDokladum = "*", PovoleniVazbyNaZauctDokl = "*", PovolitOpravuHlavickyDokladu = "*", RizeniUcetnichVazebDleKategorii = "*", RezimZadavaniCislaUcetnihoDokladu = "*", RadaAgendovychCisel = "*", PovolitHromadneUzavreniDokladu = "*", PovolitUzavreniDokladu = "*", PovolitZauctovaniDokladu = "*", PovolitSchvaleniDokladu = "*", PovolitZruseniSchvaleniDokladu = "*", PovolitStornoDokladu = "*", RezimZobrazeniDokladu = "*", RezimVazbyNaPrimarniDoklady = "*", RezimProvozu = "*", PovolitPreevidenceDokladu = "*", PovolitPredaniDokladu = "*", PovolitPodaniDokladu = "*", PovolitSpusteniPredkontace = "*", PovolitOpravuPolozkyDokladu = "*", PovolitNapocetNaFPSML = "*", PovolitVazbaNaSmlouvu = "*", PovolitEvidenciDokladu = "*", PovolitPorizovaniPolozkovehoProfilu = "*", PovolitAktivaciStornoDokladu = "*", PovolitAktivniPristupKCizimDokladum = "*", PodporaSchvalovacihoProcesuGIN = "*", PodporaSchvalovacihoProcesuUCT = "*", PodporaSchvalovaciho = "*", PovoleniPraceSInternimDanDokladem = "*", PovoleniPredplnovatHodnotyDoPorizovace = "*", PovolitImportDoZapisu = "*", KurzoveRozdilyPovinnaSmlouvaZRP = "*", PovolitZmenuStavuUhrady = "*", PovolenyPredstihZauctovaniDoklad = "*", DefiniceAgendovehoCisla = "*", PovolitSchvalovaniCizichDokladu = "*", PovolitPostupneZauctovani = "*", PovolitPrekrocitLimitRozpoctu = "*", VazbaNksNaFunkci = "*", ZaokrouhleniRozpoctuProZRO = "*", PovolitVraceniDokladuDoWFL = "*", PovolenoUctovaniDoUzavrenehoObdobi = "*", PovolenoPrevzetiDokladu = "*", PovoleniPrekroceniMaximalnihoLimituBU = "*", PrednastaveniStavuZauctVPrimAgende = "*", PrednastaveniHodnotyVyberuStavuZauctVPrimAgende = "*", PovolitHromadnehoZauctovaniDokladu = "*", OmezeniVazbyNaSmlouvu = "*", PovolenaKopieDokladu = "*", PovolitUzavreniKnihy = "*", ZruseniUzavreniKnihy = "*", PovolitUzavreniAgendy = "*", AutomatickeOdlevaniDatPriUzaverceKnihy = "*", PredvyplneniNazvuUcetniAnalytikyDoPopisuZapisu = "*", PovolitSmazaniZapisu = "*", PouzivatStaryPorizovac = "*", UrovenPorizovaniDoUctovehoRozvrhuUct = "*", RezimVyrovnaniDokladu = "*", KontrolovatVyberuSubradyDleKnihy = "*", KontrolaNulovehoObratuBankovnihoUctu = "*", PovoleniFinancniKontroly = "*", PovoleniUcetniKontroly = "*", PovoleniHromadneUcetniKontroly = "*", RezimUcetniKontroly = "*", PovoleniKontrolyProDodatecneDanPriznani = "*", KontrolaDanovychUctuVycet = "*", KontrolaDanovychUctu = "*", KontrolaPapUctovani = "*", KontrolaNaTridyPriSchvalovani = "*", KontrolaDataZauctovaniShodneSDnesnimDnem = "*", KontrolaPrekroceniLimituRozpoctu = "*", KontrolaNaRozvrhPriUctovani = "*", KontrolaDneVMesiciPodleKalendare = "*", PovoleniUzivatelskePredkontace = "*", PovoleniNulVPredkontaci = "*", PovoleniPrevoduPredkontace = "*", VerifikaceESUBlokace = "*", VerifikaceESUVarovani = "*", AutomatickeOtevreniKHDPH = "*", PovolitEditaciCiziMasky = "*", FinancniKontrolaUpresneni = "*", PovoleniZmenitKompetenta = "*", TypInstalaceDatabaze = "*", DostupneKnihyKUzaveni = "*",}
	const enum GUctParamsDtoTypes { PovolenyPredstihZauctovaniDokladu = "number", PovolitGenerovaniPiduDokladu = "boolean", AktivniPristupKCizimDokladum = "boolean", PovoleniVazbyNaZauctDokl = "boolean", PovolitOpravuHlavickyDokladu = "boolean", RizeniUcetnichVazebDleKategorii = "boolean", RezimZadavaniCislaUcetnihoDokladu = "Gordic.Uct.Interface.RezimZadavaniCislaRozpoctovehoDokladuEnum", RadaAgendovychCisel = "number", PovolitHromadneUzavreniDokladu = "boolean", PovolitUzavreniDokladu = "boolean", PovolitZauctovaniDokladu = "boolean", PovolitSchvaleniDokladu = "boolean", PovolitZruseniSchvaleniDokladu = "boolean", PovolitStornoDokladu = "boolean", RezimZobrazeniDokladu = "Gordic.Uct.Interface.RezimZobrazeniDokladuEnum", RezimVazbyNaPrimarniDoklady = "Gordic.Uct.Interface.RezimVazbyNaPrimarniDokladyEnum", RezimProvozu = "Gordic.Uct.Interface.RezimProvozuEnum", PovolitPreevidenceDokladu = "boolean", PovolitPredaniDokladu = "boolean", PovolitPodaniDokladu = "boolean", PovolitSpusteniPredkontace = "boolean", PovolitOpravuPolozkyDokladu = "boolean", PovolitNapocetNaFPSML = "boolean", PovolitVazbaNaSmlouvu = "boolean", PovolitEvidenciDokladu = "boolean", PovolitPorizovaniPolozkovehoProfilu = "boolean", PovolitAktivaciStornoDokladu = "boolean", PovolitAktivniPristupKCizimDokladum = "boolean", PodporaSchvalovacihoProcesuGIN = "boolean", PodporaSchvalovacihoProcesuUCT = "boolean", PodporaSchvalovaciho = "boolean", PovoleniPraceSInternimDanDokladem = "boolean", PovoleniPredplnovatHodnotyDoPorizovace = "boolean", PovolitImportDoZapisu = "boolean", KurzoveRozdilyPovinnaSmlouvaZRP = "boolean", PovolitZmenuStavuUhrady = "boolean", PovolenyPredstihZauctovaniDoklad = "number", DefiniceAgendovehoCisla = "Gordic.Uct.Interface.DefiniceAgCislaEnum", PovolitSchvalovaniCizichDokladu = "boolean", PovolitPostupneZauctovani = "Gordic.Uct.Interface.GEPostupneProuctovani", PovolitPrekrocitLimitRozpoctu = "boolean", VazbaNksNaFunkci = "boolean", ZaokrouhleniRozpoctuProZRO = "boolean", PovolitVraceniDokladuDoWFL = "boolean", PovolenoUctovaniDoUzavrenehoObdobi = "boolean", PovolenoPrevzetiDokladu = "boolean", PovoleniPrekroceniMaximalnihoLimituBU = "boolean", PrednastaveniStavuZauctVPrimAgende = "number", PrednastaveniHodnotyVyberuStavuZauctVPrimAgende = "number", PovolitHromadnehoZauctovaniDokladu = "boolean", OmezeniVazbyNaSmlouvu = "Gordic.Uct.Interface.OmezeniVazbyNaSmlouvuE", PovolenaKopieDokladu = "boolean", PovolitUzavreniKnihy = "boolean", ZruseniUzavreniKnihy = "boolean", PovolitUzavreniAgendy = "boolean", AutomatickeOdlevaniDatPriUzaverceKnihy = "number", PredvyplneniNazvuUcetniAnalytikyDoPopisuZapisu = "string", PovolitSmazaniZapisu = "boolean", PouzivatStaryPorizovac = "boolean", UrovenPorizovaniDoUctovehoRozvrhuUct = "string", RezimVyrovnaniDokladu = "Gordic.Uct.Interface.RezimVyrovnaniDokladuEnum", KontrolovatVyberuSubradyDleKnihy = "boolean", KontrolaNulovehoObratuBankovnihoUctu = "number", PovoleniFinancniKontroly = "number", PovoleniUcetniKontroly = "boolean", PovoleniHromadneUcetniKontroly = "boolean", RezimUcetniKontroly = "Gordic.Uct.Interface.GERezimUcetniKontroly", PovoleniKontrolyProDodatecneDanPriznani = "boolean", KontrolaDanovychUctuVycet = "string[]", KontrolaDanovychUctu = "Gordic.Uct.Interface.GEKontrolaDanovychUctu", KontrolaPapUctovani = "boolean", KontrolaNaTridyPriSchvalovani = "Gordic.Uct.Interface.GEKontrolaTridyUctu", KontrolaDataZauctovaniShodneSDnesnimDnem = "boolean", KontrolaPrekroceniLimituRozpoctu = "boolean", KontrolaNaRozvrhPriUctovani = "boolean", KontrolaDneVMesiciPodleKalendare = "boolean", PovoleniUzivatelskePredkontace = "Gordic.Eko.Interface.GEPovoleniUzivatelskePredkontace", PovoleniNulVPredkontaci = "Gordic.Uct.Interface.GEPovoleniNulVPredkontace", PovoleniPrevoduPredkontace = "Gordic.Eko.Interface.GEPovoleniPrevoduPredkontace", VerifikaceESUBlokace = "string[]", VerifikaceESUVarovani = "string[]", AutomatickeOtevreniKHDPH = "Gordic.Uct.Interface.GEAutomatickeOtevreniKontrolnihoHlaseni", PovolitEditaciCiziMasky = "boolean", FinancniKontrolaUpresneni = "Gordic.Uct.Interface.GEFinancniKontrolaUpresneni", PovoleniZmenitKompetenta = "boolean", TypInstalaceDatabaze = "Gordic.Uct.Interface.GTypInstalace", DostupneKnihyKUzaveni = "Gordic.Uct.Interface.GDostupneKnihyKUzavreniEnum",}
	const enum GUctParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctRadekZDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Datovy objekt pro identifikaci radku*/
	interface GUctRadekZDto {
		/**Identifikator radku*/
		radek_z?: number|null;
	}
	const enum GUctRadekZDtoNames { radek_z = "radek_z",}
	const enum GUctRadekZDtoFragments { radek_z = "*",}
	const enum GUctRadekZDtoTypes { radek_z = "number",}
	const enum GUctRadekZDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctsdenDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:uctsden*/
	interface GUctsdenDto {
		/**Indentifikátor knihy*/
		ixp_den?: string|null;
		/**DBCOLUMN:uctsden.lic*/
		lic?: string|null;
		/**DBCOLUMN:uctsden.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:uctsden.arw*/
		arw?: number|null;
		/**DBCOLUMN:uctsden.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:uctsden.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:uctsden.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:uctsden.ico*/
		ico?: string|null;
		/**DBCOLUMN:uctsden.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:uctsden.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:uctsden.rok*/
		rok?: number|null;
		/**DBCOLUMN:uctsden.typ_den*/
		typ_den?: number|null;
		/**DBCOLUMN:uctsden.ktg_den*/
		ktg_den?: number|null;
		/**DBCOLUMN:uctsden.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:uctsden.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:uctsden.por_cislo_max*/
		por_cislo_max?: number|null;
		/**DBCOLUMN:uctsden.subrada_max*/
		subrada_max?: number|null;
		/**DBCOLUMN:uctsden.subrada_duz*/
		subrada_duz?: number|null;
		/**DBCOLUMN:uctsden.len_ac*/
		len_ac?: number|null;
		/**DBCOLUMN:uctsden.krok_uza*/
		krok_uza?: number|null;
		/**DBCOLUMN:uctsden.ixp_den_old*/
		ixp_den_old?: string|null;
		/**DBCOLUMN:uctsden.uus*/
		uus?: string|null;
		/**DBCOLUMN:uctsden.prefix*/
		prefix?: string|null;
		/**DBCOLUMN:uctsden.suffix*/
		suffix?: string|null;
		/**DBCOLUMN:uctsden.uex*/
		uex?: string|null;
		/**DBCOLUMN:uctsden.ixs_vpk*/
		ixs_vpk?: string|null;
	}
	const enum GUctsdenDtoNames { ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix", uex = "uex", ixs_vpk = "ixs_vpk",}
	const enum GUctsdenDtoFragments { ixp_den = "sden", lic = "sden", aktivita = "sden", arw = "sden", poznamka = "sden", dat_od = "sden", dat_do = "sden", ico = "sden", ucs = "sden", nazev = "sden", rok = "sden", typ_den = "sden", ktg_den = "sden", dat_zmena = "sden", zmenu_prov = "sden", por_cislo_max = "sden", subrada_max = "sden", subrada_duz = "sden", len_ac = "sden", krok_uza = "sden", ixp_den_old = "sden", uus = "sden", prefix = "sden", suffix = "sden", uex = "sden", ixs_vpk = "sden",}
	const enum GUctsdenDtoTypes { ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string", uex = "string", ixs_vpk = "string",}
	const enum GUctsdenDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30, uex = 16, ixs_vpk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctsmsk.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GUctsmskDto {
		/**DBCOLUMN:Seznam.ixs_msk*/
		ixs_msk?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.typ_masky*/
		typ_masky?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.rok_0*/
		rok_0?: number|null;
		/**DBCOLUMN:Seznam.rok_1*/
		rok_1?: number|null;
		/**DBCOLUMN:Seznam.mesic_0*/
		mesic_0?: number|null;
		/**DBCOLUMN:Seznam.mesic_1*/
		mesic_1?: number|null;
		/**DBCOLUMN:Seznam.den_0*/
		den_0?: number|null;
		/**DBCOLUMN:Seznam.den_1*/
		den_1?: number|null;
		/**DBCOLUMN:Seznam.ac_ixe_0*/
		ac_ixe_0?: string|null;
		/**DBCOLUMN:Seznam.ac_ixe_1*/
		ac_ixe_1?: string|null;
		/**DBCOLUMN:Seznam.s_zau*/
		s_zau?: number|null;
		/**DBCOLUMN:Seznam.uea_0*/
		uea_0?: string|null;
		/**DBCOLUMN:Seznam.uea_1*/
		uea_1?: string|null;
		/**DBCOLUMN:Seznam.ueb_0*/
		ueb_0?: string|null;
		/**DBCOLUMN:Seznam.ueb_1*/
		ueb_1?: string|null;
		/**DBCOLUMN:Seznam.uec_0*/
		uec_0?: string|null;
		/**DBCOLUMN:Seznam.uec_1*/
		uec_1?: string|null;
		/**DBCOLUMN:Seznam.ued_0*/
		ued_0?: string|null;
		/**DBCOLUMN:Seznam.ued_1*/
		ued_1?: string|null;
		/**DBCOLUMN:Seznam.uee_0*/
		uee_0?: string|null;
		/**DBCOLUMN:Seznam.uee_1*/
		uee_1?: string|null;
		/**DBCOLUMN:Seznam.uef_0*/
		uef_0?: string|null;
		/**DBCOLUMN:Seznam.uef_1*/
		uef_1?: string|null;
		/**DBCOLUMN:Seznam.ueg_0*/
		ueg_0?: string|null;
		/**DBCOLUMN:Seznam.ueg_1*/
		ueg_1?: string|null;
		/**DBCOLUMN:Seznam.ueh_0*/
		ueh_0?: string|null;
		/**DBCOLUMN:Seznam.ueh_1*/
		ueh_1?: string|null;
		/**DBCOLUMN:Seznam.uei_0*/
		uei_0?: string|null;
		/**DBCOLUMN:Seznam.uei_1*/
		uei_1?: string|null;
		/**DBCOLUMN:Seznam.uej_0*/
		uej_0?: string|null;
		/**DBCOLUMN:Seznam.uej_1*/
		uej_1?: string|null;
		/**DBCOLUMN:Seznam.uek_0*/
		uek_0?: string|null;
		/**DBCOLUMN:Seznam.uek_1*/
		uek_1?: string|null;
		/**DBCOLUMN:Seznam.uel_0*/
		uel_0?: string|null;
		/**DBCOLUMN:Seznam.uel_1*/
		uel_1?: string|null;
		/**DBCOLUMN:Seznam.uem_0*/
		uem_0?: string|null;
		/**DBCOLUMN:Seznam.uem_1*/
		uem_1?: string|null;
		/**DBCOLUMN:Seznam.uen_0*/
		uen_0?: string|null;
		/**DBCOLUMN:Seznam.uej_11*/
		uej_11?: string|null;
		/**DBCOLUMN:Seznam.te0_0*/
		te0_0?: string|null;
		/**DBCOLUMN:Seznam.te0_1*/
		te0_1?: string|null;
		/**DBCOLUMN:Seznam.te1_0*/
		te1_0?: string|null;
		/**DBCOLUMN:Seznam.te1_1*/
		te1_1?: string|null;
		/**DBCOLUMN:Seznam.te2_0*/
		te2_0?: string|null;
		/**DBCOLUMN:Seznam.te2_1*/
		te2_1?: string|null;
		/**DBCOLUMN:Seznam.te3_0*/
		te3_0?: string|null;
		/**DBCOLUMN:Seznam.te3_1*/
		te3_1?: string|null;
		/**DBCOLUMN:Seznam.te4_0*/
		te4_0?: string|null;
		/**DBCOLUMN:Seznam.te4_1*/
		te4_1?: string|null;
		/**DBCOLUMN:Seznam.te5_0*/
		te5_0?: string|null;
		/**DBCOLUMN:Seznam.te5_1*/
		te5_1?: string|null;
		/**DBCOLUMN:Seznam.te6_0*/
		te6_0?: string|null;
		/**DBCOLUMN:Seznam.te6_1*/
		te6_1?: string|null;
		/**DBCOLUMN:Seznam.te7_0*/
		te7_0?: string|null;
		/**DBCOLUMN:Seznam.te7_1*/
		te7_1?: string|null;
		/**DBCOLUMN:Seznam.te8_0*/
		te8_0?: string|null;
		/**DBCOLUMN:Seznam.te8_1*/
		te8_1?: string|null;
		/**DBCOLUMN:Seznam.te9_0*/
		te9_0?: string|null;
		/**DBCOLUMN:Seznam.te9_1*/
		te9_1?: string|null;
		/**DBCOLUMN:Seznam.c0_0*/
		c0_0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0_1*/
		c0_1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_0*/
		c1_0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_1*/
		c1_1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.vlastni*/
		vlastni?: number|null;
		/**DBCOLUMN:Seznam.popis_pid*/
		popis_pid?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.druh_masky*/
		druh_masky?: number|null;
		/**DBCOLUMN:Seznam.rok_kniha*/
		rok_kniha?: number|null;
		/**DBCOLUMN:Seznam.aktivita_kniha*/
		aktivita_kniha?: number|null;
		/**DBCOLUMN:Seznam.popis_pep*/
		popis_pep?: string|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_cil*/
		ixs_fun_cil?: string|null;
		/**DBCOLUMN:Seznam.fun_hist*/
		fun_hist?: number|null;
		/**DBCOLUMN:Seznam.poznamka_ixp*/
		poznamka_ixp?: string|null;
		/**DBCOLUMN:Seznam.ks_db*/
		ks_db?: string|null;
		/**DBCOLUMN:Seznam.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:Seznam.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:Seznam.ac_0*/
		ac_0?: string|null;
		/**DBCOLUMN:Seznam.ac_1*/
		ac_1?: string|null;
		/**DBCOLUMN:Seznam.ac_ag_0*/
		ac_ag_0?: string|null;
		/**DBCOLUMN:Seznam.ac_ag_1*/
		ac_ag_1?: string|null;
		/**DBCOLUMN:Seznam.stav_evi*/
		stav_evi?: number|null;
		/**DBCOLUMN:Seznam.num_row*/
		num_row?: number|null;
		/**DBCOLUMN:Seznam.ft_text*/
		ft_text?: string|null;
		/**DBCOLUMN:Seznam.ft_zdroj*/
		ft_zdroj?: number|null;
		/**DBCOLUMN:Seznam.ft_oblast*/
		ft_oblast?: number|null;
		/**DBCOLUMN:Seznam.ft_souvisejici*/
		ft_souvisejici?: number|null;
		/**DBCOLUMN:Seznam.c_0*/
		c_0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_1*/
		c_1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.priz_fik*/
		priz_fik?: number|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:Seznam.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:Seznam.priz_sml*/
		priz_sml?: number|null;
		/**DBCOLUMN:Seznam.priz_ozp_kh*/
		priz_ozp_kh?: number|null;
		/**DBCOLUMN:Seznam.ec_dd_kh*/
		ec_dd_kh?: string|null;
		/**DBCOLUMN:Seznam.priz_zpl_kh*/
		priz_zpl_kh?: number|null;
		/**DBCOLUMN:Seznam.priz_pomer_kh*/
		priz_pomer_kh?: number|null;
		/**DBCOLUMN:Seznam.priz_zahr_kh*/
		priz_zahr_kh?: number|null;
		/**DBCOLUMN:Seznam.priz_pdp_kh*/
		priz_pdp_kh?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu_kh*/
		ixs_esu_kh?: string|null;
		/**DBCOLUMN:Seznam.dat_zdan_od_kh*/
		dat_zdan_od_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zdan_do_kh*/
		dat_zdan_do_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_upd_od_kh*/
		dat_upd_od_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_upd_do_kh*/
		dat_upd_do_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vyst_od_kh*/
		dat_vyst_od_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vyst_do_kh*/
		dat_vyst_do_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_dor_od_kh*/
		dat_dor_od_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_dor_do_kh*/
		dat_dor_do_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_evid_od_kh*/
		dat_evid_od_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_evid_do_kh*/
		dat_evid_do_kh?: JsonDate|null;
		/**DBCOLUMN:Seznam.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:Seznam.priz_euct*/
		priz_euct?: number|null;
		/**DBCOLUMN:Seznam.int_dok*/
		int_dok?: number|null;
		/**DBCOLUMN:Seznam.priz_uk*/
		priz_uk?: number|null;
	}
	const enum GUctsmskDtoNames { ixs_msk = "ixs_msk", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", typ_masky = "typ_masky", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", ucs = "ucs", nks = "nks", ixp = "ixp", ac = "ac", ixs_typ = "ixs_typ", drd = "drd", rok_0 = "rok_0", rok_1 = "rok_1", mesic_0 = "mesic_0", mesic_1 = "mesic_1", den_0 = "den_0", den_1 = "den_1", ac_ixe_0 = "ac_ixe_0", ac_ixe_1 = "ac_ixe_1", s_zau = "s_zau", uea_0 = "uea_0", uea_1 = "uea_1", ueb_0 = "ueb_0", ueb_1 = "ueb_1", uec_0 = "uec_0", uec_1 = "uec_1", ued_0 = "ued_0", ued_1 = "ued_1", uee_0 = "uee_0", uee_1 = "uee_1", uef_0 = "uef_0", uef_1 = "uef_1", ueg_0 = "ueg_0", ueg_1 = "ueg_1", ueh_0 = "ueh_0", ueh_1 = "ueh_1", uei_0 = "uei_0", uei_1 = "uei_1", uej_0 = "uej_0", uej_1 = "uej_1", uek_0 = "uek_0", uek_1 = "uek_1", uel_0 = "uel_0", uel_1 = "uel_1", uem_0 = "uem_0", uem_1 = "uem_1", uen_0 = "uen_0", uej_11 = "uej_11", te0_0 = "te0_0", te0_1 = "te0_1", te1_0 = "te1_0", te1_1 = "te1_1", te2_0 = "te2_0", te2_1 = "te2_1", te3_0 = "te3_0", te3_1 = "te3_1", te4_0 = "te4_0", te4_1 = "te4_1", te5_0 = "te5_0", te5_1 = "te5_1", te6_0 = "te6_0", te6_1 = "te6_1", te7_0 = "te7_0", te7_1 = "te7_1", te8_0 = "te8_0", te8_1 = "te8_1", te9_0 = "te9_0", te9_1 = "te9_1", c0_0 = "c0_0", c0_1 = "c0_1", c1_0 = "c1_0", c1_1 = "c1_1", vlastni = "vlastni", popis_pid = "popis_pid", c = "c", druh_masky = "druh_masky", rok_kniha = "rok_kniha", aktivita_kniha = "aktivita_kniha", popis_pep = "popis_pep", bu_vl = "bu_vl", sk_vl = "sk_vl", ixs_fun_cil = "ixs_fun_cil", fun_hist = "fun_hist", poznamka_ixp = "poznamka_ixp", ks_db = "ks_db", ac_ag = "ac_ag", priz_view = "priz_view", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", ac_0 = "ac_0", ac_1 = "ac_1", ac_ag_0 = "ac_ag_0", ac_ag_1 = "ac_ag_1", stav_evi = "stav_evi", num_row = "num_row", ft_text = "ft_text", ft_zdroj = "ft_zdroj", ft_oblast = "ft_oblast", ft_souvisejici = "ft_souvisejici", c_0 = "c_0", c_1 = "c_1", priz_fik = "priz_fik", ixp_sml = "ixp_sml", cislo_sml = "cislo_sml", ac_sml = "ac_sml", priz_sml = "priz_sml", priz_ozp_kh = "priz_ozp_kh", ec_dd_kh = "ec_dd_kh", priz_zpl_kh = "priz_zpl_kh", priz_pomer_kh = "priz_pomer_kh", priz_zahr_kh = "priz_zahr_kh", priz_pdp_kh = "priz_pdp_kh", ixs_esu_kh = "ixs_esu_kh", dat_zdan_od_kh = "dat_zdan_od_kh", dat_zdan_do_kh = "dat_zdan_do_kh", dat_upd_od_kh = "dat_upd_od_kh", dat_upd_do_kh = "dat_upd_do_kh", dat_vyst_od_kh = "dat_vyst_od_kh", dat_vyst_do_kh = "dat_vyst_do_kh", dat_dor_od_kh = "dat_dor_od_kh", dat_dor_do_kh = "dat_dor_do_kh", dat_evid_od_kh = "dat_evid_od_kh", dat_evid_do_kh = "dat_evid_do_kh", subrada = "subrada", priz_euct = "priz_euct", int_dok = "int_dok", priz_uk = "priz_uk",}
	const enum GUctsmskDtoFragments { ixs_msk = "*", nazev = "*", zkratka = "*", poznamka = "*", typ_masky = "*", aktivita = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*", ucs = "*", nks = "*", ixp = "*", ac = "*", ixs_typ = "*", drd = "*", rok_0 = "*", rok_1 = "*", mesic_0 = "*", mesic_1 = "*", den_0 = "*", den_1 = "*", ac_ixe_0 = "*", ac_ixe_1 = "*", s_zau = "*", uea_0 = "*", uea_1 = "*", ueb_0 = "*", ueb_1 = "*", uec_0 = "*", uec_1 = "*", ued_0 = "*", ued_1 = "*", uee_0 = "*", uee_1 = "*", uef_0 = "*", uef_1 = "*", ueg_0 = "*", ueg_1 = "*", ueh_0 = "*", ueh_1 = "*", uei_0 = "*", uei_1 = "*", uej_0 = "*", uej_1 = "*", uek_0 = "*", uek_1 = "*", uel_0 = "*", uel_1 = "*", uem_0 = "*", uem_1 = "*", uen_0 = "*", uej_11 = "*", te0_0 = "*", te0_1 = "*", te1_0 = "*", te1_1 = "*", te2_0 = "*", te2_1 = "*", te3_0 = "*", te3_1 = "*", te4_0 = "*", te4_1 = "*", te5_0 = "*", te5_1 = "*", te6_0 = "*", te6_1 = "*", te7_0 = "*", te7_1 = "*", te8_0 = "*", te8_1 = "*", te9_0 = "*", te9_1 = "*", c0_0 = "*", c0_1 = "*", c1_0 = "*", c1_1 = "*", vlastni = "*", popis_pid = "*", c = "*", druh_masky = "*", rok_kniha = "*", aktivita_kniha = "*", popis_pep = "*", bu_vl = "*", sk_vl = "*", ixs_fun_cil = "*", fun_hist = "*", poznamka_ixp = "*", ks_db = "*", ac_ag = "*", priz_view = "*", uus = "*", cis_real = "*", ixs_fun_vyriz = "*", ac_0 = "*", ac_1 = "*", ac_ag_0 = "*", ac_ag_1 = "*", stav_evi = "*", num_row = "*", ft_text = "*", ft_zdroj = "*", ft_oblast = "*", ft_souvisejici = "*", c_0 = "*", c_1 = "*", priz_fik = "*", ixp_sml = "*", cislo_sml = "*", ac_sml = "*", priz_sml = "*", priz_ozp_kh = "*", ec_dd_kh = "*", priz_zpl_kh = "*", priz_pomer_kh = "*", priz_zahr_kh = "*", priz_pdp_kh = "*", ixs_esu_kh = "*", dat_zdan_od_kh = "*", dat_zdan_do_kh = "*", dat_upd_od_kh = "*", dat_upd_do_kh = "*", dat_vyst_od_kh = "*", dat_vyst_do_kh = "*", dat_dor_od_kh = "*", dat_dor_do_kh = "*", dat_evid_od_kh = "*", dat_evid_do_kh = "*", subrada = "*", priz_euct = "*", int_dok = "*", priz_uk = "*",}
	const enum GUctsmskDtoTypes { ixs_msk = "string", nazev = "string", zkratka = "string", poznamka = "string", typ_masky = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", ucs = "string", nks = "string", ixp = "string", ac = "string", ixs_typ = "string", drd = "number", rok_0 = "number", rok_1 = "number", mesic_0 = "number", mesic_1 = "number", den_0 = "number", den_1 = "number", ac_ixe_0 = "string", ac_ixe_1 = "string", s_zau = "number", uea_0 = "string", uea_1 = "string", ueb_0 = "string", ueb_1 = "string", uec_0 = "string", uec_1 = "string", ued_0 = "string", ued_1 = "string", uee_0 = "string", uee_1 = "string", uef_0 = "string", uef_1 = "string", ueg_0 = "string", ueg_1 = "string", ueh_0 = "string", ueh_1 = "string", uei_0 = "string", uei_1 = "string", uej_0 = "string", uej_1 = "string", uek_0 = "string", uek_1 = "string", uel_0 = "string", uel_1 = "string", uem_0 = "string", uem_1 = "string", uen_0 = "string", uej_11 = "string", te0_0 = "string", te0_1 = "string", te1_0 = "string", te1_1 = "string", te2_0 = "string", te2_1 = "string", te3_0 = "string", te3_1 = "string", te4_0 = "string", te4_1 = "string", te5_0 = "string", te5_1 = "string", te6_0 = "string", te6_1 = "string", te7_0 = "string", te7_1 = "string", te8_0 = "string", te8_1 = "string", te9_0 = "string", te9_1 = "string", c0_0 = "JsonDecimal", c0_1 = "JsonDecimal", c1_0 = "JsonDecimal", c1_1 = "JsonDecimal", vlastni = "number", popis_pid = "string", c = "JsonDecimal", druh_masky = "number", rok_kniha = "number", aktivita_kniha = "number", popis_pep = "string", bu_vl = "string", sk_vl = "string", ixs_fun_cil = "string", fun_hist = "number", poznamka_ixp = "string", ks_db = "string", ac_ag = "string", priz_view = "number", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", ac_0 = "string", ac_1 = "string", ac_ag_0 = "string", ac_ag_1 = "string", stav_evi = "number", num_row = "number", ft_text = "string", ft_zdroj = "number", ft_oblast = "number", ft_souvisejici = "number", c_0 = "JsonDecimal", c_1 = "JsonDecimal", priz_fik = "number", ixp_sml = "string", cislo_sml = "number", ac_sml = "string", priz_sml = "number", priz_ozp_kh = "number", ec_dd_kh = "string", priz_zpl_kh = "number", priz_pomer_kh = "number", priz_zahr_kh = "number", priz_pdp_kh = "number", ixs_esu_kh = "string", dat_zdan_od_kh = "JsonDate", dat_zdan_do_kh = "JsonDate", dat_upd_od_kh = "JsonDate", dat_upd_do_kh = "JsonDate", dat_vyst_od_kh = "JsonDate", dat_vyst_do_kh = "JsonDate", dat_dor_od_kh = "JsonDate", dat_dor_do_kh = "JsonDate", dat_evid_od_kh = "JsonDate", dat_evid_do_kh = "JsonDate", subrada = "number", priz_euct = "number", int_dok = "number", priz_uk = "number",}
	const enum GUctsmskDtoTypeLengths { ixs_msk = 12, nazev = 50, zkratka = 16, poznamka = 50, zmenu_prov = 12, ico = 10, ucs = 10, nks = 12, ixp = 12, ac = 20, ixs_typ = 12, ac_ixe_0 = 20, ac_ixe_1 = 20, uea_0 = 3, uea_1 = 3, ueb_0 = 4, ueb_1 = 4, uec_0 = 12, uec_1 = 12, ued_0 = 12, ued_1 = 12, uee_0 = 12, uee_1 = 12, uef_0 = 3, uef_1 = 3, ueg_0 = 16, ueg_1 = 16, ueh_0 = 4, ueh_1 = 4, uei_0 = 4, uei_1 = 4, uej_0 = 16, uej_1 = 16, uek_0 = 6, uek_1 = 6, uel_0 = 10, uel_1 = 10, uem_0 = 10, uem_1 = 10, uen_0 = 6, uej_11 = 16, te0_0 = 20, te0_1 = 20, te1_0 = 16, te1_1 = 16, te2_0 = 20, te2_1 = 20, te3_0 = 6, te3_1 = 6, te4_0 = 12, te4_1 = 12, te5_0 = 30, te5_1 = 30, te6_0 = 12, te6_1 = 12, te7_0 = 20, te7_1 = 20, te8_0 = 12, te8_1 = 12, te9_0 = 20, te9_1 = 20, popis_pid = 50, popis_pep = 50, bu_vl = 34, sk_vl = 11, ixs_fun_cil = 12, poznamka_ixp = 254, ks_db = 254, ac_ag = 20, uus = 10, cis_real = 6, ixs_fun_vyriz = 12, ac_0 = 20, ac_1 = 20, ac_ag_0 = 20, ac_ag_1 = 20, ft_text = 254, ixp_sml = 12, ac_sml = 20, ec_dd_kh = 60, ixs_esu_kh = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctStavyNaUctech.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vysledek stavu na uctech*/
	interface GUctStavyNaUctech {
		/**MD*/
		MD?: JsonDecimal|null;
		/**DAL*/
		DAL?: JsonDecimal|null;
		/**MD - DAL*/
		MDDAL?: JsonDecimal|null;
		/**Popis stavu*/
		Popis?: string|null;
	}
	const enum GUctStavyNaUctechNames { MD = "MD", DAL = "DAL", MDDAL = "MDDAL", Popis = "Popis",}
	const enum GUctStavyNaUctechFragments { MD = "*", DAL = "*", MDDAL = "*", Popis = "*",}
	const enum GUctStavyNaUctechTypes { MD = "JsonDecimal", DAL = "JsonDecimal", MDDAL = "JsonDecimal", Popis = "string",}
	const enum GUctStavyNaUctechTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctVybraneDokladyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro vybrane doklady ze seznamu*/
	interface GUctVybranyDokladDto extends Gordic.Uct.Interface.GUctSeznamDokladuDto {
		/**Vybrany radek*/
		Selected?: boolean|null;
		/**Vysledek operace*/
		ResultOperation?: Gordic.Uct.Interface.GEResultOperation|null;
		/**Textovy vysledek operace*/
		ResultMsg?: string|null;
		/**Kod chyby pro dalsi mozne zpracovani
		*     Poz.: Zatim se pouziva pro chyby metadat 11
		*/
		ResultErrorID?: number|null;
		/**Vybrany radek*/
		wiz_check?: boolean|null;
		/**Text chyby*/
		wiz_txt_err?: string|null;
		/**Vysledek akce*/
		wiz_kind?: number|null;
	}
	const enum GUctVybranyDokladDtoNames { Selected = "Selected", ResultOperation = "ResultOperation", ResultMsg = "ResultMsg", ResultErrorID = "ResultErrorID", wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", stav_fk = "stav_fk", stav_uk = "stav_uk", stav_pk = "stav_pk", stav_eko_schval = "stav_eko_schval", ixp_den_txt = "ixp_den_txt", poc_priloh = "poc_priloh", poc_priloh_ele = "poc_priloh_ele", preevid = "preevid", zauctovanoPolozek = "zauctovanoPolozek", c1 = "c1", c0 = "c0", ixs_fun_nazev = "ixs_fun_nazev", poc_epri = "poc_epri", novakniha = "novakniha", ktgTypNazev = "ktgTypNazev", preevidovano = "preevidovano", nevlastnik = "nevlastnik", uzo = "uzo", typ_spis = "typ_spis", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_orig = "s_orig", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", ixp_spis_prir = "ixp_spis_prir", s_odes = "s_odes", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", priz_spis = "priz_spis", s_fyz = "s_fyz", s_ele = "s_ele", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", dokument = "dokument", vlastnosti = "vlastnosti", wfl_typ_ag = "wfl_typ_ag", ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", ixs_fun_akt = "ixs_fun_akt", rok_dph = "rok_dph", mesic_dph = "mesic_dph", subrada = "subrada", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", ixs_esu = "ixs_esu", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", stav = "stav", ac_akt = "ac_akt", fik = "fik", uck = "uck", int_dok = "int_dok", stav_txt = "stav_txt", banklimit_c0 = "banklimit_c0", banklimit_c1 = "banklimit_c1", stupen_ver = "stupen_ver", icoesu = "icoesu", ixp_zauct = "ixp_zauct", priz_euct = "priz_euct", ixs_fun_ooup = "ixs_fun_ooup", ixs_fun_oozu = "ixs_fun_oozu", kniha = "kniha", ecdd = "ecdd", StavDokladu = "StavDokladu", IsEvidovany = "IsEvidovany", IsZauctovanoCastecne = "IsZauctovanoCastecne", IsZmenenePodkladyDPH = "IsZmenenePodkladyDPH", IsUzavreny = "IsUzavreny", Aktivita = "Aktivita", IsStornovano = "IsStornovano", IsZauctovany = "IsZauctovany", IsNavrh = "IsNavrh", IsSchvaleny = "IsSchvaleny", IsAktivni = "IsAktivni", IsVyzadujeVazbu = "IsVyzadujeVazbu", KategorieDokladu = "KategorieDokladu", DruhDokladu = "DruhDokladu", IsDanovyDoklad = "IsDanovyDoklad", IsPrimDokladStornovany = "IsPrimDokladStornovany", IsDokladNesparovanychPlateb = "IsDokladNesparovanychPlateb", JeDokladSchvalenFinancniKontrolou = "JeDokladSchvalenFinancniKontrolou", JeDokladZamitnutFinancniKontrolou = "JeDokladZamitnutFinancniKontrolou", JeDokladVProcesuFinancniKontroly = "JeDokladVProcesuFinancniKontroly", JeDokladVProcesuUcetniKontroly = "JeDokladVProcesuUcetniKontroly", IsPohledavkaBPL = "IsPohledavkaBPL", IsDokladEuct = "IsDokladEuct",}
	const enum GUctVybranyDokladDtoFragments { Selected = "*", ResultOperation = "*", ResultMsg = "*", ResultErrorID = "*", wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", stav_fk = "WFL_FK", stav_uk = "WFL_UK", stav_pk = "WFL_PK", stav_eko_schval = "EKO_SCHVAL", ixp_den_txt = "preevidence", poc_priloh = "all", poc_priloh_ele = "all", preevid = "all", zauctovanoPolozek = "all", c1 = "c1", c0 = "c0", ixs_fun_nazev = "ixs_fun_nazev", poc_epri = "wfl_poc_epri", novakniha = "all", ktgTypNazev = "ktgTypNazev", preevidovano = "all", nevlastnik = "all", uzo = "wfl_uzo", typ_spis = "wfl_typ_spis", dat_vyriz_do = "all", dat_vyriz = "all", s_orig = "all", typ_entity_ico = "all", vlastnictvi_doruceni_ico = "all", technicke_vlastnosti_ico = "all", stav_zpracovani_ico = "all", vlastnictvi_redistribuce_ico = "all", pozice_spis_ico = "all", termin_ico = "all", doplnujici_informace_ico = "all", ixp_spis_prir = "wflIconCalculator", s_odes = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", priz_spis = "wfl_priz_spis", s_fyz = "wfl_s_fyz", s_ele = "wfl_s_ele", s_prij = "wfl_s_prij", puvod = "wfl_puvod", s_sgn = "wfl_s_sgn", stav_pis = "wfl_stav_pis", priz_cj = "wfl_priz_cj", s_schval = "wfl_s_schval", stav_dist = "wfl_stav_dist", ixs_fun = "wfl_ixs_fun", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", dokument = "dokument", vlastnosti = "vlastnost", wfl_typ_ag = "wfl_typ_ag", ixp = "all", lic = "all", popis = "popis", ico = "all", ucs = "all", nks = "all", ixp_den = "all", ac = "all", rok = "all", mesic = "all", den = "all", dat_prij_pod = "dat_prij_pod", ixs_typ = "all", ktg_typ = "all", eko_akt = "all", dat_evid = "all", dat_zau = "all", s_zau = "all", s_sto = "all", ac_ixe = "all", stav_ac_ixe = "all", drd = "all", c = "all", dat_zmena = "all", zmenu_prov = "all", typ_ag = "all", ixs_fun_akt = "all", rok_dph = "all", mesic_dph = "all", subrada = "all", bu_vl = "all", sk_vl = "all", priz_view = "all", ac_ag = "all", ixs_esu = "all", uus = "all", cis_real = "all", ixs_fun_vyriz = "all", stav = "stav", ac_akt = "ac_akt", fik = "all", uck = "all", int_dok = "all", stav_txt = "stav_txt", banklimit_c0 = "all", banklimit_c1 = "all", stupen_ver = "all", icoesu = "all", ixp_zauct = "all", priz_euct = "all", ixs_fun_ooup = "ixs_fun_oozu", ixs_fun_oozu = "ixs_fun_oozu", kniha = "kniha", ecdd = "ecdd", StavDokladu = "all", IsEvidovany = "all", IsZauctovanoCastecne = "all", IsZmenenePodkladyDPH = "all", IsUzavreny = "all", Aktivita = "all", IsStornovano = "all", IsZauctovany = "all", IsNavrh = "all", IsSchvaleny = "all", IsAktivni = "all", IsVyzadujeVazbu = "all", KategorieDokladu = "all", DruhDokladu = "all", IsDanovyDoklad = "all", IsPrimDokladStornovany = "all", IsDokladNesparovanychPlateb = "all", JeDokladSchvalenFinancniKontrolou = "all", JeDokladZamitnutFinancniKontrolou = "all", JeDokladVProcesuFinancniKontroly = "all", JeDokladVProcesuUcetniKontroly = "all", IsPohledavkaBPL = "all", IsDokladEuct = "all",}
	const enum GUctVybranyDokladDtoTypes { Selected = "boolean", ResultOperation = "Gordic.Uct.Interface.GEResultOperation", ResultMsg = "string", ResultErrorID = "number", wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_uk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_pk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_eko_schval = "Gordic.Wfl.Interface.GWflvdfkDto", ixp_den_txt = "string", poc_priloh = "number", poc_priloh_ele = "number", preevid = "number", zauctovanoPolozek = "number", c1 = "JsonDecimal", c0 = "JsonDecimal", ixs_fun_nazev = "string", poc_epri = "number", novakniha = "string", ktgTypNazev = "string", preevidovano = "number", nevlastnik = "number", uzo = "string", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_orig = "number", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", ixp_spis_prir = "string", s_odes = "number", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", s_schval = "number", stav_dist = "number", ixs_fun = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", wfl_typ_ag = "number", ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", ixs_fun_akt = "string", rok_dph = "number", mesic_dph = "number", subrada = "number", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", ixs_esu = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", stav = "number", ac_akt = "string", fik = "number", uck = "number", int_dok = "number", stav_txt = "string", banklimit_c0 = "JsonDecimal", banklimit_c1 = "JsonDecimal", stupen_ver = "number", icoesu = "string", ixp_zauct = "string", priz_euct = "number", ixs_fun_ooup = "string", ixs_fun_oozu = "string", kniha = "string", ecdd = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", IsEvidovany = "boolean", IsZauctovanoCastecne = "boolean", IsZmenenePodkladyDPH = "boolean", IsUzavreny = "boolean", Aktivita = "Gordic.Eko.Interface.GEAktivitaDokladu", IsStornovano = "boolean", IsZauctovany = "boolean", IsNavrh = "boolean", IsSchvaleny = "boolean", IsAktivni = "boolean", IsVyzadujeVazbu = "boolean", KategorieDokladu = "Gordic.Eko.Interface.GEKategorieDokladu", DruhDokladu = "Gordic.Eko.Interface.GEDruhDokladu", IsDanovyDoklad = "boolean", IsPrimDokladStornovany = "boolean", IsDokladNesparovanychPlateb = "boolean", JeDokladSchvalenFinancniKontrolou = "boolean", JeDokladZamitnutFinancniKontrolou = "boolean", JeDokladVProcesuFinancniKontroly = "boolean", JeDokladVProcesuUcetniKontroly = "boolean", IsPohledavkaBPL = "boolean", IsDokladEuct = "boolean",}
	const enum GUctVybranyDokladDtoTypeLengths { ixp = 12, lic = 4, popis = 254, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ac = 20, ixs_typ = 12, ac_ixe = 20, zmenu_prov = 12, ixs_fun_akt = 12, bu_vl = 34, sk_vl = 11, ac_ag = 20, ixs_esu = 12, uus = 10, cis_real = 6, ixs_fun_vyriz = 12, icoesu = 10, ixp_zauct = 12, ixs_fun_ooup = 12, ixs_fun_oozu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\GUctVybraneZapisyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro vybrane zapisy dokladu*/
	interface GUctVybraneZapisyDto extends Gordic.Uct.Interface.GUctdpepDto {
		/**Vybrany radek*/
		Selected?: boolean|null;
		/**Vybrany radek*/
		Error?: boolean|null;
		/**Chybova zprava*/
		ErrMsg?: string|null;
	}
	const enum GUctVybraneZapisyDtoNames { Selected = "Selected", Error = "Error", ErrMsg = "ErrMsg", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ixp_den = "ixp_den", ac = "ac", radek_z = "radek_z", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", ixs_kon = "ixs_kon", up_stav = "up_stav", ac_ixe = "ac_ixe", popis = "popis", zd = "zd", uus = "uus", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", priz_rez_sml = "priz_rez_sml", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", priz_ncf = "priz_ncf", priz_ner = "priz_ner", ac_sml = "ac_sml", smlouva = "smlouva", priz_kur_roz = "priz_kur_roz", TypKurzovychRozdilu = "TypKurzovychRozdilu", enabled = "enabled", IsNewRow = "IsNewRow",}
	const enum GUctVybraneZapisyDtoFragments { Selected = "*", Error = "*", ErrMsg = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ixp_den = "*", ac = "*", radek_z = "*", nks = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c1 = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", ixs_kon = "*", up_stav = "*", ac_ixe = "*", popis = "*", zd = "*", uus = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", priz_rez_sml = "*", id_hdr_ris = "*", radek_hdr = "*", priz_ncf = "*", priz_ner = "*", ac_sml = "*", smlouva = "*", priz_kur_roz = "*", TypKurzovychRozdilu = "*", enabled = "*", IsNewRow = "*",}
	const enum GUctVybraneZapisyDtoTypes { Selected = "boolean", Error = "boolean", ErrMsg = "string", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ixp_den = "string", ac = "string", radek_z = "number", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", ixs_kon = "string", up_stav = "number", ac_ixe = "string", popis = "string", zd = "number", uus = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", priz_rez_sml = "number", id_hdr_ris = "string", radek_hdr = "number", priz_ncf = "number", priz_ner = "number", ac_sml = "string", smlouva = "string", priz_kur_roz = "number", TypKurzovychRozdilu = "Gordic.Uct.Interface.GETypKurzovychRozdilu", enabled = "boolean", IsNewRow = "boolean",}
	const enum GUctVybraneZapisyDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ixp_den = 12, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6, ixs_kon = 12, ac_ixe = 20, popis = 254, uus = 10, ixp_sml = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Agenda\GUctAgendaDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO agendy*/
	interface GUctAgendaDto extends Gordic.Uct.Interface.GUctSouctyKnihDto {
		/**Jmeno agendy*/
		Name?: string|null;
		/**Zkratka agendy*/
		Shortcut?: string|null;
	}
	const enum GUctAgendaDtoNames { Name = "Name", Shortcut = "Shortcut", NumberOfBooks = "NumberOfBooks", NumberOfClosedBooks = "NumberOfClosedBooks", NumberOfOpenedBooks = "NumberOfOpenedBooks",}
	const enum GUctAgendaDtoFragments { Name = "*", Shortcut = "*", NumberOfBooks = "*", NumberOfClosedBooks = "*", NumberOfOpenedBooks = "*",}
	const enum GUctAgendaDtoTypes { Name = "string", Shortcut = "string", NumberOfBooks = "number", NumberOfClosedBooks = "number", NumberOfOpenedBooks = "number",}
	const enum GUctAgendaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctDokladActionResponseBaseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Predek DTO pro predani vysledku akce*/
	interface GUctDokladActionResponseBaseDto {
		/**Pid dokladu*/
		PidDokladu?: string|null;
		/**Vysledna hlaska*/
		ResultMessage?: string|null;
	}
	const enum GUctDokladActionResponseBaseDtoNames { PidDokladu = "PidDokladu", ResultMessage = "ResultMessage",}
	const enum GUctDokladActionResponseBaseDtoFragments { PidDokladu = "*", ResultMessage = "*",}
	const enum GUctDokladActionResponseBaseDtoTypes { PidDokladu = "string", ResultMessage = "string",}
	const enum GUctDokladActionResponseBaseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctDokladActionResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Predek DTO pro predani vysledku akce*/
	interface GUctDokladActionResponseDto {
		/**Vysledna hlaska*/
		ResultMessage?: string|null;
		/**Datum zmeny*/
		DatumZmeny?: JsonDate|null;
		/**Stav dokladu textove*/
		StavTxt?: string|null;
		/**Stav dokladu*/
		StavDokladu?: Gordic.Eko.Interface.GEStavyDokladu|null;
		/**Stav zápisu*/
		s_zau?: number|null;
		/**Aktivita dokladu (500 - stornovaný)*/
		eko_akt?: number|null;
		/**Příznak zmeny stavu dokladu*/
		StateChanged?: boolean|null;
		/**Hlavicka doiladu*/
		Hlavicka?: Gordic.Uct.Interface.GUctSeznamDokladuDto|null;
		/**Ucetni zapisy*/
		Zapisy?: Gordic.Uct.Interface.GUctdpepDto[]|null;
		/**Příznak daňovosti dokladu*/
		IsTypDanovy?: boolean|null;
		/**Příznak povinnosti navázání dokladu na primární doklad*/
		IsMusiNavazat?: boolean|null;
		/**Opravneni k dokladu*/
		DokladPermissions?: Gordic.Uct.Interface.GUctDokladPermissions|null;
	}
	const enum GUctDokladActionResponseDtoNames { ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", IsTypDanovy = "IsTypDanovy", IsMusiNavazat = "IsMusiNavazat", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladActionResponseDtoFragments { ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", IsTypDanovy = "*", IsMusiNavazat = "*", DokladPermissions = "*",}
	const enum GUctDokladActionResponseDtoTypes { ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Uct.Interface.GUctSeznamDokladuDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", IsTypDanovy = "boolean", IsMusiNavazat = "boolean", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladActionResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctDokladDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO predavane do detailu dokladu v js*/
	interface GUctDokladDto extends Gordic.Uct.Interface.GUctDokladReadStavResponseDto {
		/**Identifikátor účetního dokladu*/
		ixp?: string|null;
		/**Stav dokladu v textové podobě*/
		StavTxt?: string|null;
		/**Stav dokladu*/
		StavDokladu?: Gordic.Eko.Interface.GEStavyDokladu|null;
		/**Datum zmeny dokladu*/
		DatumZmeny?: JsonDate|null;
		/**Hlavička dokladu*/
		HlavickaDokladu?: Gordic.Uct.Interface.GUctSeznamDokladuDto|null;
		/**Hlavicka kontrolního hlášení DPH*/
		HlavickaKH?: Gordic.Eko.Interface.GEkospdeDto|null;
		/**Seznam navazanych smluv k primárnímu dokladu*/
		SeznamNavazanychSmluvKPrimDokladu?: string[]|null;
		/**Zapisy dokladu*/
		Zapisy?: Gordic.Uct.Interface.GUctdpepDto[]|null;
		/**Prvni otevreny mesic v účetním roce*/
		PrvniOtevrenyMesic?: number|null;
		/**Posledni otevreny mesic v účetním roce*/
		PosledniOtevrenyMesic?: number|null;
		/**Příznak daňovosti dokladu*/
		IsTypDanovy?: boolean|null;
		/**Příznak povinnosti navázání dokladu na primární doklad*/
		IsMusiNavazat?: boolean|null;
		/**Akt. znacka pro esu*/
		AktZnacka?: string|null;
		/**Typ agendy hlavniho dokladu (pokud má doklad navázaný primární doklad)*/
		TypAgHlaDokladu?: number|null;
		/**Počet dokladů v celém účetním případu*/
		PocetNavazanychDokladu?: number|null;
		/**Identifikator uctenky bankovniho vypisu*/
		IdentifikatorUctenky?: string|null;
		/**Identifikator storna/ stornujiciho dokladu*/
		IdentifikatorStorna?: string|null;
		/**Identifikator storna/stornujiciho dokladu*/
		StavStornujicihoTxt?: string|null;
		/**Identifikator storna/stornujiciho dokladu*/
		StavStornujiciho?: Gordic.Eko.Interface.GEStavyDokladu|null;
		/**WFL dokument*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
	}
	const enum GUctDokladDtoNames { ixp = "ixp", StavTxt = "StavTxt", StavDokladu = "StavDokladu", DatumZmeny = "DatumZmeny", HlavickaDokladu = "HlavickaDokladu", HlavickaKH = "HlavickaKH", SeznamNavazanychSmluvKPrimDokladu = "SeznamNavazanychSmluvKPrimDokladu", Zapisy = "Zapisy", PrvniOtevrenyMesic = "PrvniOtevrenyMesic", PosledniOtevrenyMesic = "PosledniOtevrenyMesic", IsTypDanovy = "IsTypDanovy", IsMusiNavazat = "IsMusiNavazat", AktZnacka = "AktZnacka", TypAgHlaDokladu = "TypAgHlaDokladu", PocetNavazanychDokladu = "PocetNavazanychDokladu", IdentifikatorUctenky = "IdentifikatorUctenky", IdentifikatorStorna = "IdentifikatorStorna", StavStornujicihoTxt = "StavStornujicihoTxt", StavStornujiciho = "StavStornujiciho", dokument = "dokument", EnabledItems = "EnabledItems", HiddenItems = "HiddenItems", VisibledItems = "VisibledItems", Permissions = "Permissions",}
	const enum GUctDokladDtoFragments { ixp = "*", StavTxt = "*", StavDokladu = "*", DatumZmeny = "*", HlavickaDokladu = "*", HlavickaKH = "*", SeznamNavazanychSmluvKPrimDokladu = "*", Zapisy = "*", PrvniOtevrenyMesic = "*", PosledniOtevrenyMesic = "*", IsTypDanovy = "*", IsMusiNavazat = "*", AktZnacka = "*", TypAgHlaDokladu = "*", PocetNavazanychDokladu = "*", IdentifikatorUctenky = "*", IdentifikatorStorna = "*", StavStornujicihoTxt = "*", StavStornujiciho = "*", dokument = "dokument", EnabledItems = "*", HiddenItems = "*", VisibledItems = "*", Permissions = "*",}
	const enum GUctDokladDtoTypes { ixp = "string", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", DatumZmeny = "JsonDate", HlavickaDokladu = "Gordic.Uct.Interface.GUctSeznamDokladuDto", HlavickaKH = "Gordic.Eko.Interface.GEkospdeDto", SeznamNavazanychSmluvKPrimDokladu = "string[]", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", PrvniOtevrenyMesic = "number", PosledniOtevrenyMesic = "number", IsTypDanovy = "boolean", IsMusiNavazat = "boolean", AktZnacka = "string", TypAgHlaDokladu = "number", PocetNavazanychDokladu = "number", IdentifikatorUctenky = "string", IdentifikatorStorna = "string", StavStornujicihoTxt = "string", StavStornujiciho = "Gordic.Eko.Interface.GEStavyDokladu", dokument = "Gordic.Ssl.Interface.GDokumentDto", EnabledItems = "string", HiddenItems = "string", VisibledItems = "string", Permissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctDokladExtensDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO dodatecne informace k dokladu*/
	interface GUctDokladExtensDto {
		/**Pristupnost polozek (policek) na dokladu*/
		EnabledItems?: string|null;
		/**Neviditelná políčka na dokladu*/
		HiddenItems?: string|null;
		/**Videtelná políčka (opak neviditelná) na dokladu*/
		VisibledItems?: string|null;
		/**Opravneni na dokladu*/
		Permissions: Gordic.Uct.Interface.GUctDokladPermissions;
	}
	const enum GUctDokladExtensDtoNames { EnabledItems = "EnabledItems", HiddenItems = "HiddenItems", VisibledItems = "VisibledItems", Permissions = "Permissions",}
	const enum GUctDokladExtensDtoFragments { EnabledItems = "*", HiddenItems = "*", VisibledItems = "*", Permissions = "*",}
	const enum GUctDokladExtensDtoTypes { EnabledItems = "string", HiddenItems = "string", VisibledItems = "string", Permissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladExtensDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctDokladReadRequestDto..d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO nacteni UCT dokladu - vstup (request)*/
	interface GUctDokladReadRequestDto {
		/**indetifikator dokladu*/
		ixp?: string|null;
		/**Atribut editace hlavicky - nacitaji se prava a viditelnost poli*/
		EditHlavicka?: boolean|null;
		/**Atribut editace zapisu - nacitaji se prava a viditelnost poli*/
		EditZapisy?: boolean|null;
	}
	const enum GUctDokladReadRequestDtoNames { ixp = "ixp", EditHlavicka = "EditHlavicka", EditZapisy = "EditZapisy",}
	const enum GUctDokladReadRequestDtoFragments { ixp = "*", EditHlavicka = "*", EditZapisy = "*",}
	const enum GUctDokladReadRequestDtoTypes { ixp = "string", EditHlavicka = "boolean", EditZapisy = "boolean",}
	const enum GUctDokladReadRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctDokladReadStavRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO nacteni stavu  UCT dokladu - vstup (request)*/
	interface GUctDokladReadStavRequestDto extends Gordic.Uct.Interface.GUctDokladReadRequestDto {
		/**Hlavička dokladu*/
		HlavickaDokladu?: Gordic.Uct.Interface.GUctSeznamDokladuDto|null;
		/**Nebude se vyvolavat vyjimnka, pokud je zmena datumu dokladu*/
		IgnorovatZmenuDatumu?: boolean|null;
	}
	const enum GUctDokladReadStavRequestDtoNames { HlavickaDokladu = "HlavickaDokladu", IgnorovatZmenuDatumu = "IgnorovatZmenuDatumu", ixp = "ixp", EditHlavicka = "EditHlavicka", EditZapisy = "EditZapisy",}
	const enum GUctDokladReadStavRequestDtoFragments { HlavickaDokladu = "*", IgnorovatZmenuDatumu = "*", ixp = "*", EditHlavicka = "*", EditZapisy = "*",}
	const enum GUctDokladReadStavRequestDtoTypes { HlavickaDokladu = "Gordic.Uct.Interface.GUctSeznamDokladuDto", IgnorovatZmenuDatumu = "boolean", ixp = "string", EditHlavicka = "boolean", EditZapisy = "boolean",}
	const enum GUctDokladReadStavRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctDokladReadStavResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO odpoved na stav dokladu*/
	interface GUctDokladReadStavResponseDto extends Gordic.Uct.Interface.GUctDokladExtensDto {
	}
	const enum GUctDokladReadStavResponseDtoNames { EnabledItems = "EnabledItems", HiddenItems = "HiddenItems", VisibledItems = "VisibledItems", Permissions = "Permissions",}
	const enum GUctDokladReadStavResponseDtoFragments { EnabledItems = "*", HiddenItems = "*", VisibledItems = "*", Permissions = "*",}
	const enum GUctDokladReadStavResponseDtoTypes { EnabledItems = "string", HiddenItems = "string", VisibledItems = "string", Permissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladReadStavResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctFiltrDokladu.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Enum filtru dokladu*/
	const enum GEFilterDokladu {
		/**Pid dokladu*/
		ixp,
		/**Typ dokladu*/
		ixs_typ,
		/**Druh dokladu*/
		drd,
		/**Uctarna*/
		uus,
		/**Subrada*/
		subrada,
		/**Interni dokladu*/
		int_dok,
		/**Interni dokladu*/
		vlastni_doklady,
		/**Vlastnik*/
		ixs_fun_cil,
		/**Vlstnictvi s historii*/
		fun_hist,
		/**Realizator*/
		cis_real,
		/**kompetent*/
		ixs_fun_vyriz,
		/**agendove cislo*/
		ac_ag,
		/**evidencni cislo*/
		ac,
		/**cislo ucetniho dokladu*/
		ac_ixe,
		/**castka dokladu*/
		c,
		/**bankovni ucet*/
		bu_vl,
		/**Kod banky*/
		sk_vl,
		/**Rok*/
		rok,
		/**mesic*/
		mesic,
		/**den*/
		den,
		/**pocet poslednich zaznamu*/
		num_row,
		/**popis dokladu*/
		popis_doklad,
		/**Poznamka dokladu*/
		poznamka_ixp,
		/**klicova slova*/
		ks_db,
		/**priznak smlouvy*/
		priz_sml,
		/**Typy plneni*/
		priz_zpl_kh,
		/**Esu danoveho dokladu*/
		ixs_esu_kh,
		/**stav dokladu*/
		s_zau,
		/**stav evidence*/
		stav_evi,
		/**zobrazeni dokladu*/
		priz_view,
		/**Priznak financni kontroly*/
		priz_fik,
		/**Priznak e dokladu*/
		priz_euct,
		/**Popis radku*/
		popis_pep,
		/**Pid smlouvy*/
		ixp_sml,
		/**Cislo smlouvy*/
		cislo_sml,
		/**cislo radku smlouvy*/
		ac_sml,
		/**Evidencni cislo danoveho dokladu*/
		ec_dd_kh,
		/**Typy zdanitelnoho plneni*/
		priz_ozp_kh,
		/**Pouziti pomeru pro vypocet*/
		priz_pomer_kh,
		/**Tuzemske plneni zahranicni/domaci*/
		priz_zahr_kh,
		/**Datum doruceni*/
		dat_dor_kh,
		/**Datum vystaveni*/
		dat_vyst_kh,
		/**Datum evidence*/
		dat_evid_kh,
		/**Datum uplatneni dane*/
		dat_upd_kh,
		/**Datum zenitelneho plneni*/
		dat_zdan_kh,
		/**text pro fulltext*/
		ft_text,
		/**Zdroj hledani*/
		ft_zdroj,
		/**Oblast hledeni*/
		ft_oblast,
		/**Hledat FT v souvisejicich dokladech*/
		ft_souvisejici,
		/**Ucetni zapisy*/
		zapisy,
		/**ucetni stredisko*/
		ucs,
		/**Nakladove stredisko*/
		nks,
		/**slovo ucetni vety*/
		uea,
		/**slovo ucetni vety*/
		ueb,
		/**slovo ucetni vety*/
		uec,
		/**slovo ucetni vety*/
		ued,
		/**slovo ucetni vety*/
		uee,
		/**slovo ucetni vety*/
		uef,
		/**slovo ucetni vety*/
		ueg,
		/**slovo ucetni vety*/
		ueh,
		/**slovo ucetni vety*/
		uei,
		/**slovo ucetni vety*/
		uej,
		/**slovo ucetni vety*/
		uek,
		/**slovo ucetni vety*/
		uel,
		/**slovo ucetni vety*/
		uem,
		/**slovo ucetni vety*/
		uen,
		/**slovo ucetni vety*/
		te0,
		/**slovo ucetni vety*/
		te1,
		/**slovo ucetni vety*/
		te2,
		/**slovo ucetni vety*/
		te3,
		/**slovo ucetni vety*/
		te4,
		/**slovo ucetni vety*/
		te5,
		/**slovo ucetni vety*/
		te6,
		/**slovo ucetni vety*/
		te7,
		/**slovo ucetni vety*/
		te8,
		/**slovo ucetni vety*/
		te9,
		/**MD*/
		c0,
		/**dal*/
		c1,
		/**rozšířující vlastnosti*/
		vlastnosti_r,
		/**popisné vlastnosti*/
		vlastnosti_s,
		/**spisu ve kterém je dokument vložen*/
		dokument_ixp_spis,
		/**se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu)*/
		dokument_priz_spis,
		/**aktuálního vlastníka (uzel) dokumentu*/
		dokument_ixs_su_akt,
		dokument_nazev,
		/**nebo agendové číslo nebo sp. značka spisu*/
		dokument_akt_znacka,
		dokument_stav_dist,
		/**(písemnosti)*/
		dokument_stav_pis,
		/**že k dokumentu existuje profil o doručení - záznam v tabulce wflspio*/
		dokument_s_prij,
		/**profil SSL pro tento dokument*/
		dokument_s_ssl,
		/**čas poslední změny dokumentu*/
		dokument_dat_zmena,
		/**autora poslední změny dokumentu*/
		dokument_zmenu_prov,
		/**existuje elektronická verze dokumentu*/
		dokument_s_ele,
		/**existuje fyzická verze dokumentu*/
		dokument_s_fyz,
		/**Barva*/
		dokument_uzo,
		/**plánu*/
		dokument_spis_pl,
		/**spisového znaku*/
		dokument_spis_znak,
		/**funkce agendového vlastníka*/
		dokument_ixs_fun_wfl,
		/**uzlu agendového vlastníka*/
		dokument_ixs_su_wfl,
		dokument_dat_vyriz,
		/**schválení dokumentu (úrovně wfl)*/
		dokument_s_schval,
		/**upravené oproti spisovému znaku*/
		dokument_skar_znak,
		/**oproti spisovému znaku*/
		dokument_skar_lhuta,
		/**události*/
		dokument_rok_spo_uda,
		/**skartace dokumentu*/
		dokument_rok_skartace,
		dokument_poc_listu,
		/**dokumentu*/
		dokument_poc_stran,
		/**fyzických - text box na detailu písemnosti*/
		dokument_poc_kop,
		/**dokumentu*/
		dokument_poc_priloh,
		/**příloh*/
		dokument_poc_l_priloh,
		/**pro zobrazení v seznamech*/
		dokument_cj,
		/**existuje profil čísla jednacího*/
		dokument_priz_cj,
		/**je dokument v balíku (>0)*/
		dokument_PrizVBaliku,
		/**balíku, ve kterém je dokument*/
		dokument_ixs_zup,
		/**skartační operace*/
		dokument_PrizPozSkar,
	}
	/**Filtry na uct doklady*/
	interface GUctFiltrDokladu {
		/**Nastaven pohled na knihu, nebo pres vhsechny knihy*/
		pohledNaKnihu?: boolean|null;
		/**Varovani pri velkem mnozstvi dat (dotaz uzivateli)*/
		varovaniVelkehoMnoztviDat?: boolean|null;
		/**Oznaceni hranice, ktera rika, kde varovat uzivatele pred velkem mnozstvi dat*/
		hraniceVelkychDat?: number|null;
		/**Identifiaktor zpravy*/
		idMessage?: string|null;
		/**Ide knihy*/
		ixpDen?: string|null;
		ixp?: GBaseFilter<string>|null;
		/**Typ dokladu*/
		ixs_typ?: GBaseFilter<string>|null;
		/**Druh dokladu*/
		drd?: GBaseFilter<number>|null;
		/**Uctarna*/
		uus?: GBaseFilter<string>|null;
		/**Subrada*/
		subrada?: GBaseFilter<number>|null;
		/**Interni doklad*/
		int_dok?: GBaseFilter<number>|null;
		/**Vlastni doklady*/
		vlastni_doklady?: GBaseFilter<number>|null;
		/**Vlastnik*/
		ixs_fun_cil?: GBaseFilter<string>|null;
		/**Vlastnictvi s historii*/
		fun_hist?: GBaseFilter<number>|null;
		/**realizator*/
		cis_real?: GBaseFilter<string>|null;
		/**Kompetent*/
		ixs_fun_vyriz?: GBaseFilter<string>|null;
		/**Agendove cislo*/
		ac_ag?: GIntervalDto<string>|null;
		/**Evidencni cislo*/
		ac?: GIntervalDto<string>|null;
		/**Cislo ucetniho dokladu*/
		ac_ixe?: GIntervalDto<string>|null;
		/**Castka hlavicky dokladu*/
		c?: GIntervalDto<JsonDecimal>|null;
		/**Vlastni bankovni ucet*/
		bu_vl?: GBaseFilter<string>|null;
		/**Smerovy kod vlastni banky*/
		sk_vl?: GBaseFilter<string>|null;
		/**Rok dokladu*/
		rok?: GIntervalDto<number>|null;
		/**Mesic dokladu*/
		mesic?: GIntervalDto<number>|null;
		/**Den dokladu*/
		den?: GIntervalDto<number>|null;
		/**Nacteni poctu poslednich zaznamu*/
		num_row?: GBaseFilter<number>|null;
		/**Popis dokladu*/
		popis_doklad?: GBaseFilter<string>|null;
		/**Poznamka k dokladu*/
		poznamka_ixp?: GBaseFilter<string>|null;
		/**Klicova slova*/
		ks_db?: GBaseFilter<string>|null;
		/**Stav zauctovani*/
		s_zau?: GBaseFilter<number>|null;
		/**Stav evidence
		*     Default - evidovane
		*/
		stav_evi?: GBaseFilter<number>|null;
		/**filtr na zobrazene doklady (jiz byly zobrazeny)*/
		priz_view?: GBaseFilter<number>|null;
		/**Priznak financni kontroly*/
		priz_fik?: GBaseFilter<number>|null;
		/**Priznak e-dokladu*/
		priz_euct?: GBaseFilter<number>|null;
		/**Ucetni zapisy*/
		zapisy?: Gordic.Uct.Interface.GUctFiltrUcetniZapisy[]|null;
		/**Popis polozky*/
		popis_pep?: GBaseFilter<string>|null;
		/**Pid smlouvy*/
		ixp_sml?: GBaseFilter<string>|null;
		/**Cislo polozky smlouvy*/
		cislo_sml?: GBaseFilter<number>|null;
		/**Cislo polozky smlouvy*/
		ac_sml?: GBaseFilter<string>|null;
		/**Priznak smlouvy*/
		priz_sml?: GBaseFilter<number>|null;
		/**Evidencni cislo danoveho dokladu*/
		ec_dd_kh?: GBaseFilter<string>|null;
		/**ESU danoveho dokladu*/
		ixs_esu_kh?: GBaseFilter<string>|null;
		/**Typy plneni*/
		priz_zpl_kh?: GBaseFilter<number>|null;
		/**Typy zdanitelneho plneni*/
		priz_ozp_kh?: GBaseFilter<number>|null;
		/**Pouziti pomeru pro odpocet*/
		priz_pomer_kh?: GBaseFilter<number>|null;
		/**Zdaneni prijemcem tuzmske plneni/ zahranicni plneni*/
		priz_zahr_kh?: GBaseFilter<number>|null;
		/**Datum doruceni*/
		dat_dor_kh?: GIntervalDto<JsonDate>|null;
		/**Datum vystaveni*/
		dat_vyst_kh?: GIntervalDto<JsonDate>|null;
		/**Datum evidence*/
		dat_evid_kh?: GIntervalDto<JsonDate>|null;
		/**Datum uplatneni dane*/
		dat_upd_kh?: GIntervalDto<JsonDate>|null;
		/**Datum zdanitelneho plneni*/
		dat_zdan_kh?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:Seznam.ft_text*/
		ft_text?: GBaseFilter<string>|null;
		/**DBCOLUMN:Seznam.ft_zdroj*/
		ft_zdroj?: GBaseFilter<number>|null;
		/**DBCOLUMN:Seznam.ft_oblast*/
		ft_oblast?: GBaseFilter<number>|null;
		/**DBCOLUMN:Seznam.ft_souvisejici*/
		ft_souvisejici?: GBaseFilter<number>|null;
		/**rozšiřující vlastnosti*/
		vlastnosti_r?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**popisné vlastnosti*/
		vlastnosti_s?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**spisu ve kterém je dokument vložen*/
		dokument_ixp_spis?: GBaseFilter<string>|null;
		/**se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu)*/
		dokument_priz_spis?: GBaseFilter<number>|null;
		/**aktuálního vlastníka (uzel) dokumentu*/
		dokument_ixs_su_akt?: GBaseFilter<string>|null;
		dokument_nazev?: GBaseFilter<string>|null;
		/**nebo agendové číslo nebo sp. značka spisu*/
		dokument_akt_znacka?: GBaseFilter<string>|null;
		dokument_stav_dist?: GBaseFilter<number>|null;
		/**(písemnosti)*/
		dokument_stav_pis?: GBaseFilter<number>|null;
		/**že k dokumentu existuje profil o doručení - záznam v tabulce wflspio*/
		dokument_s_prij?: GBaseFilter<number>|null;
		/**profil SSL pro tento dokument*/
		dokument_s_ssl?: GBaseFilter<number>|null;
		/**čas poslední změny dokumentu*/
		dokument_dat_zmena?: GIntervalDto<JsonDate>|null;
		/**autora poslední změny dokumentu*/
		dokument_zmenu_prov?: GBaseFilter<string>|null;
		/**existuje elektronická verze dokumentu*/
		dokument_s_ele?: GBaseFilter<number>|null;
		/**existuje fyzická verze dokumentu*/
		dokument_s_fyz?: GBaseFilter<number>|null;
		/**Barva*/
		dokument_uzo?: GBaseFilter<string>|null;
		/**plánu*/
		dokument_spis_pl?: GBaseFilter<string>|null;
		/**spisového znaku*/
		dokument_spis_znak?: GBaseFilter<string>|null;
		/**funkce agendového vlastníka*/
		dokument_ixs_fun_wfl?: GBaseFilter<string>|null;
		/**uzlu agendového vlastníka*/
		dokument_ixs_su_wfl?: GBaseFilter<string>|null;
		dokument_dat_vyriz?: GIntervalDto<JsonDate>|null;
		/**schválení dokumentu (úrovně wfl)*/
		dokument_s_schval?: GBaseFilter<number>|null;
		/**upravené oproti spisovému znaku*/
		dokument_skar_znak?: GBaseFilter<string>|null;
		/**oproti spisovému znaku*/
		dokument_skar_lhuta?: GBaseFilter<number>|null;
		/**události*/
		dokument_rok_spo_uda?: GBaseFilter<number>|null;
		/**skartace dokumentu*/
		dokument_rok_skartace?: GBaseFilter<number>|null;
		dokument_poc_listu?: GBaseFilter<string>|null;
		/**dokumentu*/
		dokument_poc_stran?: GBaseFilter<number>|null;
		/**fyzických - text box na detailu písemnosti*/
		dokument_poc_kop?: GBaseFilter<number>|null;
		/**dokumentu*/
		dokument_poc_priloh?: GBaseFilter<number>|null;
		/**příloh*/
		dokument_poc_l_priloh?: GBaseFilter<string>|null;
		/**pro zobrazení v seznamech*/
		dokument_cj?: GBaseFilter<string>|null;
		/**existuje profil čísla jednacího*/
		dokument_priz_cj?: GBaseFilter<number>|null;
		/**je dokument v balíku (>0)*/
		dokument_PrizVBaliku?: GBaseFilter<number>|null;
		/**balíku, ve kterém je dokument*/
		dokument_ixs_zup?: GBaseFilter<string>|null;
		/**skartační operace*/
		dokument_PrizPozSkar?: GBaseFilter<number>|null;
	}
	const enum GUctFiltrDokladuNames { pohledNaKnihu = "pohledNaKnihu", varovaniVelkehoMnoztviDat = "varovaniVelkehoMnoztviDat", hraniceVelkychDat = "hraniceVelkychDat", idMessage = "idMessage", ixpDen = "ixpDen", ixp = "ixp", ixs_typ = "ixs_typ", drd = "drd", uus = "uus", subrada = "subrada", int_dok = "int_dok", vlastni_doklady = "vlastni_doklady", ixs_fun_cil = "ixs_fun_cil", fun_hist = "fun_hist", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", ac_ag = "ac_ag", ac = "ac", ac_ixe = "ac_ixe", c = "c", bu_vl = "bu_vl", sk_vl = "sk_vl", rok = "rok", mesic = "mesic", den = "den", num_row = "num_row", popis_doklad = "popis_doklad", poznamka_ixp = "poznamka_ixp", ks_db = "ks_db", s_zau = "s_zau", stav_evi = "stav_evi", priz_view = "priz_view", priz_fik = "priz_fik", priz_euct = "priz_euct", zapisy = "zapisy", popis_pep = "popis_pep", ixp_sml = "ixp_sml", cislo_sml = "cislo_sml", ac_sml = "ac_sml", priz_sml = "priz_sml", ec_dd_kh = "ec_dd_kh", ixs_esu_kh = "ixs_esu_kh", priz_zpl_kh = "priz_zpl_kh", priz_ozp_kh = "priz_ozp_kh", priz_pomer_kh = "priz_pomer_kh", priz_zahr_kh = "priz_zahr_kh", dat_dor_kh = "dat_dor_kh", dat_vyst_kh = "dat_vyst_kh", dat_evid_kh = "dat_evid_kh", dat_upd_kh = "dat_upd_kh", dat_zdan_kh = "dat_zdan_kh", ft_text = "ft_text", ft_zdroj = "ft_zdroj", ft_oblast = "ft_oblast", ft_souvisejici = "ft_souvisejici", vlastnosti_r = "vlastnosti_r", vlastnosti_s = "vlastnosti_s", dokument_ixp_spis = "dokument_ixp_spis", dokument_priz_spis = "dokument_priz_spis", dokument_ixs_su_akt = "dokument_ixs_su_akt", dokument_nazev = "dokument_nazev", dokument_akt_znacka = "dokument_akt_znacka", dokument_stav_dist = "dokument_stav_dist", dokument_stav_pis = "dokument_stav_pis", dokument_s_prij = "dokument_s_prij", dokument_s_ssl = "dokument_s_ssl", dokument_dat_zmena = "dokument_dat_zmena", dokument_zmenu_prov = "dokument_zmenu_prov", dokument_s_ele = "dokument_s_ele", dokument_s_fyz = "dokument_s_fyz", dokument_uzo = "dokument_uzo", dokument_spis_pl = "dokument_spis_pl", dokument_spis_znak = "dokument_spis_znak", dokument_ixs_fun_wfl = "dokument_ixs_fun_wfl", dokument_ixs_su_wfl = "dokument_ixs_su_wfl", dokument_dat_vyriz = "dokument_dat_vyriz", dokument_s_schval = "dokument_s_schval", dokument_skar_znak = "dokument_skar_znak", dokument_skar_lhuta = "dokument_skar_lhuta", dokument_rok_spo_uda = "dokument_rok_spo_uda", dokument_rok_skartace = "dokument_rok_skartace", dokument_poc_listu = "dokument_poc_listu", dokument_poc_stran = "dokument_poc_stran", dokument_poc_kop = "dokument_poc_kop", dokument_poc_priloh = "dokument_poc_priloh", dokument_poc_l_priloh = "dokument_poc_l_priloh", dokument_cj = "dokument_cj", dokument_priz_cj = "dokument_priz_cj", dokument_PrizVBaliku = "dokument_PrizVBaliku", dokument_ixs_zup = "dokument_ixs_zup", dokument_PrizPozSkar = "dokument_PrizPozSkar",}
	const enum GUctFiltrDokladuFragments { pohledNaKnihu = "*", varovaniVelkehoMnoztviDat = "*", hraniceVelkychDat = "*", idMessage = "*", ixpDen = "*", ixp = "*", ixs_typ = "*", drd = "*", uus = "*", subrada = "*", int_dok = "*", vlastni_doklady = "*", ixs_fun_cil = "*", fun_hist = "*", cis_real = "*", ixs_fun_vyriz = "*", ac_ag = "*", ac = "*", ac_ixe = "*", c = "*", bu_vl = "*", sk_vl = "*", rok = "*", mesic = "*", den = "*", num_row = "*", popis_doklad = "*", poznamka_ixp = "*", ks_db = "*", s_zau = "*", stav_evi = "*", priz_view = "*", priz_fik = "*", priz_euct = "*", zapisy = "*", popis_pep = "*", ixp_sml = "*", cislo_sml = "*", ac_sml = "*", priz_sml = "*", ec_dd_kh = "*", ixs_esu_kh = "*", priz_zpl_kh = "*", priz_ozp_kh = "*", priz_pomer_kh = "*", priz_zahr_kh = "*", dat_dor_kh = "*", dat_vyst_kh = "*", dat_evid_kh = "*", dat_upd_kh = "*", dat_zdan_kh = "*", ft_text = "*", ft_zdroj = "*", ft_oblast = "*", ft_souvisejici = "*", vlastnosti_r = "*", vlastnosti_s = "*", dokument_ixp_spis = "*", dokument_priz_spis = "*", dokument_ixs_su_akt = "*", dokument_nazev = "*", dokument_akt_znacka = "*", dokument_stav_dist = "*", dokument_stav_pis = "*", dokument_s_prij = "*", dokument_s_ssl = "*", dokument_dat_zmena = "*", dokument_zmenu_prov = "*", dokument_s_ele = "*", dokument_s_fyz = "*", dokument_uzo = "*", dokument_spis_pl = "*", dokument_spis_znak = "*", dokument_ixs_fun_wfl = "*", dokument_ixs_su_wfl = "*", dokument_dat_vyriz = "*", dokument_s_schval = "*", dokument_skar_znak = "*", dokument_skar_lhuta = "*", dokument_rok_spo_uda = "*", dokument_rok_skartace = "*", dokument_poc_listu = "*", dokument_poc_stran = "*", dokument_poc_kop = "*", dokument_poc_priloh = "*", dokument_poc_l_priloh = "*", dokument_cj = "*", dokument_priz_cj = "*", dokument_PrizVBaliku = "*", dokument_ixs_zup = "*", dokument_PrizPozSkar = "*",}
	const enum GUctFiltrDokladuTypes { pohledNaKnihu = "boolean", varovaniVelkehoMnoztviDat = "boolean", hraniceVelkychDat = "number", idMessage = "string", ixpDen = "string", ixp = "GBaseFilter<string>", ixs_typ = "GBaseFilter<string>", drd = "GBaseFilter<number>", uus = "GBaseFilter<string>", subrada = "GBaseFilter<number>", int_dok = "GBaseFilter<number>", vlastni_doklady = "GBaseFilter<number>", ixs_fun_cil = "GBaseFilter<string>", fun_hist = "GBaseFilter<number>", cis_real = "GBaseFilter<string>", ixs_fun_vyriz = "GBaseFilter<string>", ac_ag = "GIntervalDto<string>", ac = "GIntervalDto<string>", ac_ixe = "GIntervalDto<string>", c = "GIntervalDto<JsonDecimal>", bu_vl = "GBaseFilter<string>", sk_vl = "GBaseFilter<string>", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", den = "GIntervalDto<number>", num_row = "GBaseFilter<number>", popis_doklad = "GBaseFilter<string>", poznamka_ixp = "GBaseFilter<string>", ks_db = "GBaseFilter<string>", s_zau = "GBaseFilter<number>", stav_evi = "GBaseFilter<number>", priz_view = "GBaseFilter<number>", priz_fik = "GBaseFilter<number>", priz_euct = "GBaseFilter<number>", zapisy = "Gordic.Uct.Interface.GUctFiltrUcetniZapisy[]", popis_pep = "GBaseFilter<string>", ixp_sml = "GBaseFilter<string>", cislo_sml = "GBaseFilter<number>", ac_sml = "GBaseFilter<string>", priz_sml = "GBaseFilter<number>", ec_dd_kh = "GBaseFilter<string>", ixs_esu_kh = "GBaseFilter<string>", priz_zpl_kh = "GBaseFilter<number>", priz_ozp_kh = "GBaseFilter<number>", priz_pomer_kh = "GBaseFilter<number>", priz_zahr_kh = "GBaseFilter<number>", dat_dor_kh = "GIntervalDto<JsonDate>", dat_vyst_kh = "GIntervalDto<JsonDate>", dat_evid_kh = "GIntervalDto<JsonDate>", dat_upd_kh = "GIntervalDto<JsonDate>", dat_zdan_kh = "GIntervalDto<JsonDate>", ft_text = "GBaseFilter<string>", ft_zdroj = "GBaseFilter<number>", ft_oblast = "GBaseFilter<number>", ft_souvisejici = "GBaseFilter<number>", vlastnosti_r = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", vlastnosti_s = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", dokument_ixp_spis = "GBaseFilter<string>", dokument_priz_spis = "GBaseFilter<number>", dokument_ixs_su_akt = "GBaseFilter<string>", dokument_nazev = "GBaseFilter<string>", dokument_akt_znacka = "GBaseFilter<string>", dokument_stav_dist = "GBaseFilter<number>", dokument_stav_pis = "GBaseFilter<number>", dokument_s_prij = "GBaseFilter<number>", dokument_s_ssl = "GBaseFilter<number>", dokument_dat_zmena = "GIntervalDto<JsonDate>", dokument_zmenu_prov = "GBaseFilter<string>", dokument_s_ele = "GBaseFilter<number>", dokument_s_fyz = "GBaseFilter<number>", dokument_uzo = "GBaseFilter<string>", dokument_spis_pl = "GBaseFilter<string>", dokument_spis_znak = "GBaseFilter<string>", dokument_ixs_fun_wfl = "GBaseFilter<string>", dokument_ixs_su_wfl = "GBaseFilter<string>", dokument_dat_vyriz = "GIntervalDto<JsonDate>", dokument_s_schval = "GBaseFilter<number>", dokument_skar_znak = "GBaseFilter<string>", dokument_skar_lhuta = "GBaseFilter<number>", dokument_rok_spo_uda = "GBaseFilter<number>", dokument_rok_skartace = "GBaseFilter<number>", dokument_poc_listu = "GBaseFilter<string>", dokument_poc_stran = "GBaseFilter<number>", dokument_poc_kop = "GBaseFilter<number>", dokument_poc_priloh = "GBaseFilter<number>", dokument_poc_l_priloh = "GBaseFilter<string>", dokument_cj = "GBaseFilter<string>", dokument_priz_cj = "GBaseFilter<number>", dokument_PrizVBaliku = "GBaseFilter<number>", dokument_ixs_zup = "GBaseFilter<string>", dokument_PrizPozSkar = "GBaseFilter<number>",}
	const enum GUctFiltrDokladuTypeLengths { ixp = 12, ixs_typ = 12, ixs_fun_cil = 12, cis_real = 6, ixs_fun_vyriz = 12, ac_ag = 20, ac = 20, bu_vl = 34, sk_vl = 11, poznamka_ixp = 254, popis_pep = 254, ixp_sml = 12, ac_sml = 20, ec_dd_kh = 60, ixs_esu_kh = 12, ft_text = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctPocetDokladuDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO s infromaci o poctech dokladu v dane knize*/
	interface GUctPocetDokladuDto {
		/**klid knihy*/
		ixp_den?: string|null;
		/**Vsechny doklady*/
		vsechny?: number|null;
		/**Vsechny uzavrene doklady*/
		uzavrene?: number|null;
		/**Vsechny prouctovane doklady*/
		prouctovane?: number|null;
		/**Vsechny stronovane doklady*/
		stornovane?: number|null;
		/**Vsechny doklady ke schvaleni*/
		keschvaleni?: number|null;
		/**Vsechny doklady k zauctovani*/
		kzauctovani?: number|null;
		/**Vsechny doklady neevidovane*/
		neevidovane?: number|null;
	}
	const enum GUctPocetDokladuDtoNames { ixp_den = "ixp_den", vsechny = "vsechny", uzavrene = "uzavrene", prouctovane = "prouctovane", stornovane = "stornovane", keschvaleni = "keschvaleni", kzauctovani = "kzauctovani", neevidovane = "neevidovane",}
	const enum GUctPocetDokladuDtoFragments { ixp_den = "*", vsechny = "*", uzavrene = "*", prouctovane = "*", stornovane = "*", keschvaleni = "*", kzauctovani = "*", neevidovane = "*",}
	const enum GUctPocetDokladuDtoTypes { ixp_den = "string", vsechny = "number", uzavrene = "number", prouctovane = "number", stornovane = "number", keschvaleni = "number", kzauctovani = "number", neevidovane = "number",}
	const enum GUctPocetDokladuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctSeznamDokladuDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GUctSeznamDokladuDto extends Gordic.Uct.Interface.GUctspidExtendDto {
		/**stav finanční kontroly*/
		stav_fk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**Experimentální light - stav finanční kontroly*/
		stav_fkl?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav účetní kontroly*/
		stav_uk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav průběžné kontroly*/
		stav_pk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav EKO schvalovacího procesu*/
		stav_eko_schval?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**Jmeno nove knihy*/
		ixp_den_txt?: string|null;
		/**Pocet příloh*/
		poc_priloh?: number|null;
		/**Počet el. priloh*/
		poc_priloh_ele?: number|null;
		/**Atribut preevidence*/
		preevid?: number|null;
		/**DBCOLUMN:Seznam.zauctovanoPolozek*/
		zauctovanoPolozek?: number|null;
		/**MD*/
		c1?: JsonDecimal|null;
		/**Dal*/
		c0?: JsonDecimal|null;
		/**Název funkce*/
		ixs_fun_nazev?: string|null;
		/**Pocet el. priloh*/
		poc_epri?: number|null;
		/**DBCOLUMN:Seznam.stav_dist*/
		novakniha?: string|null;
		/**Nazev kategorie dokladu*/
		ktgTypNazev?: string|null;
		/**Atribut preevidence*/
		preevidovano?: number|null;
		nevlastnik?: number|null;
		/**uzo*/
		uzo?: string|null;
		typ_spis?: Gordic.Wfl.Interface.WflctysEnum|null;
		dat_vyriz_do?: JsonDate|null;
		dat_vyriz?: JsonDate|null;
		s_orig?: number|null;
		typ_entity_ico?: Gordic.Wfl.Interface.TypEntityIco|null;
		vlastnictvi_doruceni_ico?: Gordic.Wfl.Interface.VlastnictviDoruceniIco|null;
		technicke_vlastnosti_ico?: Gordic.Wfl.Interface.TechnickeVlastnostiIco|null;
		stav_zpracovani_ico?: Gordic.Wfl.Interface.StavZpracovaniIco|null;
		vlastnictvi_redistribuce_ico?: Gordic.Wfl.Interface.VlastnictviRedistribuceIco|null;
		pozice_spis_ico?: Gordic.Wfl.Interface.PoziceSpisIco|null;
		termin_ico?: Gordic.Wfl.Interface.TerminIco|null;
		doplnujici_informace_ico?: Gordic.Wfl.Interface.DoplnujiciInformaceIco[]|null;
		/**Gets or sets ixp_spis_prir . Identifikátor spisu ke kterému je dokument přiřazen wflspid*/
		ixp_spis_prir?: string|null;
		s_odes?: number|null;
		/**směřuje na nadřízený spis*/
		ixp_spis?: string|null;
		/**Směřuje na nejvyší nadřazenou entitu, takže třeba na typový spis*/
		ixp_top?: string|null;
		/**Směřuje na nejbližší nadřazenou entitu*/
		ixp_soucast?: string|null;
		priz_spis?: Gordic.Wfl.Interface.WflcpriEnum|null;
		s_fyz?: Gordic.Wfl.Interface.WflcfyzEnum|null;
		s_ele?: Gordic.Wfl.Interface.WflceleEnum|null;
		s_prij?: Gordic.Wfl.Interface.WflcsprEnum|null;
		puvod?: Gordic.Wfl.Interface.TypPuvoduDokumentuEnum|null;
		s_sgn?: Gordic.Wfl.Interface.WflcsgnEnum|null;
		stav_pis?: Gordic.Wfl.Interface.WflcstpEnum|null;
		priz_cj?: Gordic.Wfl.Interface.WflcpcjEnum|null;
		s_schval?: number|null;
		stav_dist?: number|null;
		ixs_fun?: string|null;
		/**přeevidence (0 - v aktuální knize, 1 - předáno z jiné knihy, 2 - předáno do jiné knihy)*/
		preevidence?: number|null;
		/**vlastnictví (0 - vlastní doklad, 1 - jiný zpracovatel)*/
		vlastnictvi?: number|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
		/**el. přílohy - počet příloh*/
		el_prilohy_pocet?: number|null;
	}
	const enum GUctSeznamDokladuDtoNames { stav_fk = "stav_fk", stav_fkl = "stav_fkl", stav_uk = "stav_uk", stav_pk = "stav_pk", stav_eko_schval = "stav_eko_schval", ixp_den_txt = "ixp_den_txt", poc_priloh = "poc_priloh", poc_priloh_ele = "poc_priloh_ele", preevid = "preevid", zauctovanoPolozek = "zauctovanoPolozek", c1 = "c1", c0 = "c0", ixs_fun_nazev = "ixs_fun_nazev", poc_epri = "poc_epri", novakniha = "novakniha", ktgTypNazev = "ktgTypNazev", preevidovano = "preevidovano", nevlastnik = "nevlastnik", uzo = "uzo", typ_spis = "typ_spis", dat_vyriz_do = "dat_vyriz_do", dat_vyriz = "dat_vyriz", s_orig = "s_orig", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", pozice_spis_ico = "pozice_spis_ico", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", ixp_spis_prir = "ixp_spis_prir", s_odes = "s_odes", ixp_spis = "ixp_spis", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", priz_spis = "priz_spis", s_fyz = "s_fyz", s_ele = "s_ele", s_prij = "s_prij", puvod = "puvod", s_sgn = "s_sgn", stav_pis = "stav_pis", priz_cj = "priz_cj", s_schval = "s_schval", stav_dist = "stav_dist", ixs_fun = "ixs_fun", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", dokument = "dokument", vlastnosti = "vlastnosti", wfl_typ_ag = "wfl_typ_ag", ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", ixs_fun_akt = "ixs_fun_akt", rok_dph = "rok_dph", mesic_dph = "mesic_dph", subrada = "subrada", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", ixs_esu = "ixs_esu", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", stav = "stav", ac_akt = "ac_akt", fik = "fik", uck = "uck", int_dok = "int_dok", stav_txt = "stav_txt", banklimit_c0 = "banklimit_c0", banklimit_c1 = "banklimit_c1", stupen_ver = "stupen_ver", icoesu = "icoesu", ixp_zauct = "ixp_zauct", priz_euct = "priz_euct", ixs_fun_ooup = "ixs_fun_ooup", ixs_fun_oozu = "ixs_fun_oozu", kniha = "kniha", ecdd = "ecdd", StavDokladu = "StavDokladu", IsEvidovany = "IsEvidovany", IsZauctovanoCastecne = "IsZauctovanoCastecne", IsZmenenePodkladyDPH = "IsZmenenePodkladyDPH", IsUzavreny = "IsUzavreny", Aktivita = "Aktivita", IsStornovano = "IsStornovano", IsZauctovany = "IsZauctovany", IsNavrh = "IsNavrh", IsSchvaleny = "IsSchvaleny", IsAktivni = "IsAktivni", IsVyzadujeVazbu = "IsVyzadujeVazbu", KategorieDokladu = "KategorieDokladu", DruhDokladu = "DruhDokladu", IsDanovyDoklad = "IsDanovyDoklad", IsPrimDokladStornovany = "IsPrimDokladStornovany", IsDokladNesparovanychPlateb = "IsDokladNesparovanychPlateb", IsDokladOpravny = "IsDokladOpravny", JeDokladSchvalenFinancniKontrolou = "JeDokladSchvalenFinancniKontrolou", JeDokladZamitnutFinancniKontrolou = "JeDokladZamitnutFinancniKontrolou", JeDokladVProcesuFinancniKontroly = "JeDokladVProcesuFinancniKontroly", JeDokladVProcesuUcetniKontroly = "JeDokladVProcesuUcetniKontroly", IsPohledavkaBPL = "IsPohledavkaBPL", IsDokladEuct = "IsDokladEuct",}
	const enum GUctSeznamDokladuDtoFragments { stav_fk = "WFL_FK", stav_fkl = "WFL_FKL", stav_uk = "WFL_UK", stav_pk = "WFL_PK", stav_eko_schval = "EKO_SCHVAL", ixp_den_txt = "preevidence", poc_priloh = "all", poc_priloh_ele = "all", preevid = "all", zauctovanoPolozek = "all", c1 = "c1", c0 = "c0", ixs_fun_nazev = "ixs_fun_nazev", poc_epri = "wfl_poc_epri", novakniha = "all", ktgTypNazev = "ktgTypNazev", preevidovano = "all", nevlastnik = "all", uzo = "wfl_uzo", typ_spis = "wfl_typ_spis", dat_vyriz_do = "all", dat_vyriz = "all", s_orig = "all", typ_entity_ico = "all", vlastnictvi_doruceni_ico = "all", technicke_vlastnosti_ico = "all", stav_zpracovani_ico = "all", vlastnictvi_redistribuce_ico = "all", pozice_spis_ico = "all", termin_ico = "all", doplnujici_informace_ico = "all", ixp_spis_prir = "wflIconCalculator", s_odes = "wflIconCalculator", ixp_spis = "wflIconCalculator", ixp_top = "wflIconCalculator", ixp_soucast = "wflIconCalculator", priz_spis = "wfl_priz_spis", s_fyz = "wfl_s_fyz", s_ele = "wfl_s_ele", s_prij = "wfl_s_prij", puvod = "wfl_puvod", s_sgn = "wfl_s_sgn", stav_pis = "wfl_stav_pis", priz_cj = "wfl_priz_cj", s_schval = "wfl_s_schval", stav_dist = "wfl_stav_dist", ixs_fun = "wfl_ixs_fun", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", dokument = "dokument", vlastnosti = "vlastnost", wfl_typ_ag = "wfl_typ_ag", ixp = "all", lic = "all", popis = "popis", ico = "all", ucs = "all", nks = "all", ixp_den = "all", ac = "all", rok = "all", mesic = "all", den = "all", dat_prij_pod = "dat_prij_pod", ixs_typ = "all", ktg_typ = "all", eko_akt = "all", dat_evid = "all", dat_zau = "all", s_zau = "all", s_sto = "all", ac_ixe = "all", stav_ac_ixe = "all", drd = "all", c = "all", dat_zmena = "all", zmenu_prov = "all", typ_ag = "all", ixs_fun_akt = "all", rok_dph = "all", mesic_dph = "all", subrada = "all", bu_vl = "all", sk_vl = "all", priz_view = "all", ac_ag = "all", ixs_esu = "all", uus = "all", cis_real = "all", ixs_fun_vyriz = "all", stav = "stav", ac_akt = "ac_akt", fik = "all", uck = "all", int_dok = "all", stav_txt = "stav_txt", banklimit_c0 = "all", banklimit_c1 = "all", stupen_ver = "all", icoesu = "all", ixp_zauct = "all", priz_euct = "all", ixs_fun_ooup = "ixs_fun_oozu", ixs_fun_oozu = "ixs_fun_oozu", kniha = "kniha", ecdd = "ecdd", StavDokladu = "all", IsEvidovany = "all", IsZauctovanoCastecne = "all", IsZmenenePodkladyDPH = "all", IsUzavreny = "all", Aktivita = "all", IsStornovano = "all", IsZauctovany = "all", IsNavrh = "all", IsSchvaleny = "all", IsAktivni = "all", IsVyzadujeVazbu = "all", KategorieDokladu = "all", DruhDokladu = "all", IsDanovyDoklad = "all", IsPrimDokladStornovany = "all", IsDokladNesparovanychPlateb = "all", IsDokladOpravny = "all", JeDokladSchvalenFinancniKontrolou = "all", JeDokladZamitnutFinancniKontrolou = "all", JeDokladVProcesuFinancniKontroly = "all", JeDokladVProcesuUcetniKontroly = "all", IsPohledavkaBPL = "all", IsDokladEuct = "all",}
	const enum GUctSeznamDokladuDtoTypes { stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_fkl = "Gordic.Wfl.Interface.GWflvdfkDto", stav_uk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_pk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_eko_schval = "Gordic.Wfl.Interface.GWflvdfkDto", ixp_den_txt = "string", poc_priloh = "number", poc_priloh_ele = "number", preevid = "number", zauctovanoPolozek = "number", c1 = "JsonDecimal", c0 = "JsonDecimal", ixs_fun_nazev = "string", poc_epri = "number", novakniha = "string", ktgTypNazev = "string", preevidovano = "number", nevlastnik = "number", uzo = "string", typ_spis = "Gordic.Wfl.Interface.WflctysEnum", dat_vyriz_do = "JsonDate", dat_vyriz = "JsonDate", s_orig = "number", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", ixp_spis_prir = "string", s_odes = "number", ixp_spis = "string", ixp_top = "string", ixp_soucast = "string", priz_spis = "Gordic.Wfl.Interface.WflcpriEnum", s_fyz = "Gordic.Wfl.Interface.WflcfyzEnum", s_ele = "Gordic.Wfl.Interface.WflceleEnum", s_prij = "Gordic.Wfl.Interface.WflcsprEnum", puvod = "Gordic.Wfl.Interface.TypPuvoduDokumentuEnum", s_sgn = "Gordic.Wfl.Interface.WflcsgnEnum", stav_pis = "Gordic.Wfl.Interface.WflcstpEnum", priz_cj = "Gordic.Wfl.Interface.WflcpcjEnum", s_schval = "number", stav_dist = "number", ixs_fun = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", wfl_typ_ag = "number", ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", ixs_fun_akt = "string", rok_dph = "number", mesic_dph = "number", subrada = "number", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", ixs_esu = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", stav = "number", ac_akt = "string", fik = "number", uck = "number", int_dok = "number", stav_txt = "string", banklimit_c0 = "JsonDecimal", banklimit_c1 = "JsonDecimal", stupen_ver = "number", icoesu = "string", ixp_zauct = "string", priz_euct = "number", ixs_fun_ooup = "string", ixs_fun_oozu = "string", kniha = "string", ecdd = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", IsEvidovany = "boolean", IsZauctovanoCastecne = "boolean", IsZmenenePodkladyDPH = "boolean", IsUzavreny = "boolean", Aktivita = "Gordic.Eko.Interface.GEAktivitaDokladu", IsStornovano = "boolean", IsZauctovany = "boolean", IsNavrh = "boolean", IsSchvaleny = "boolean", IsAktivni = "boolean", IsVyzadujeVazbu = "boolean", KategorieDokladu = "Gordic.Eko.Interface.GEKategorieDokladu", DruhDokladu = "Gordic.Eko.Interface.GEDruhDokladu", IsDanovyDoklad = "boolean", IsPrimDokladStornovany = "boolean", IsDokladNesparovanychPlateb = "boolean", IsDokladOpravny = "boolean", JeDokladSchvalenFinancniKontrolou = "boolean", JeDokladZamitnutFinancniKontrolou = "boolean", JeDokladVProcesuFinancniKontroly = "boolean", JeDokladVProcesuUcetniKontroly = "boolean", IsPohledavkaBPL = "boolean", IsDokladEuct = "boolean",}
	const enum GUctSeznamDokladuDtoTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ac = 20, ixs_typ = 12, ac_ixe = 20, zmenu_prov = 12, ixs_fun_akt = 12, bu_vl = 34, sk_vl = 11, ac_ag = 20, ixs_esu = 12, uus = 10, cis_real = 6, ixs_fun_vyriz = 12, icoesu = 10, ixp_zauct = 12, ixs_fun_ooup = 12, ixs_fun_oozu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Doklad\GUctspidExtendDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Rozsireni dto UctspidDto o dokument*/
	interface GUctspidExtendDto extends Gordic.Eko.Interface.GUctspidDto {
		/**Navigacni vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**Atribut pro popisne vlasnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**Typ agendy ve WFL*/
		wfl_typ_ag?: number|null;
	}
	const enum GUctspidExtendDtoNames { dokument = "dokument", vlastnosti = "vlastnosti", wfl_typ_ag = "wfl_typ_ag", ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", ixs_fun_akt = "ixs_fun_akt", rok_dph = "rok_dph", mesic_dph = "mesic_dph", subrada = "subrada", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", ixs_esu = "ixs_esu", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", stav = "stav", ac_akt = "ac_akt", fik = "fik", uck = "uck", int_dok = "int_dok", stav_txt = "stav_txt", banklimit_c0 = "banklimit_c0", banklimit_c1 = "banklimit_c1", stupen_ver = "stupen_ver", icoesu = "icoesu", ixp_zauct = "ixp_zauct", priz_euct = "priz_euct", ixs_fun_ooup = "ixs_fun_ooup", ixs_fun_oozu = "ixs_fun_oozu", kniha = "kniha", ecdd = "ecdd", StavDokladu = "StavDokladu", IsEvidovany = "IsEvidovany", IsZauctovanoCastecne = "IsZauctovanoCastecne", IsZmenenePodkladyDPH = "IsZmenenePodkladyDPH", IsUzavreny = "IsUzavreny", Aktivita = "Aktivita", IsStornovano = "IsStornovano", IsZauctovany = "IsZauctovany", IsNavrh = "IsNavrh", IsSchvaleny = "IsSchvaleny", IsAktivni = "IsAktivni", IsVyzadujeVazbu = "IsVyzadujeVazbu", KategorieDokladu = "KategorieDokladu", DruhDokladu = "DruhDokladu", IsDanovyDoklad = "IsDanovyDoklad", IsPrimDokladStornovany = "IsPrimDokladStornovany", IsDokladNesparovanychPlateb = "IsDokladNesparovanychPlateb", JeDokladSchvalenFinancniKontrolou = "JeDokladSchvalenFinancniKontrolou", JeDokladZamitnutFinancniKontrolou = "JeDokladZamitnutFinancniKontrolou", JeDokladVProcesuFinancniKontroly = "JeDokladVProcesuFinancniKontroly", JeDokladVProcesuUcetniKontroly = "JeDokladVProcesuUcetniKontroly", IsPohledavkaBPL = "IsPohledavkaBPL", IsDokladEuct = "IsDokladEuct",}
	const enum GUctspidExtendDtoFragments { dokument = "dokument", vlastnosti = "vlastnost", wfl_typ_ag = "wfl_typ_ag", ixp = "all", lic = "all", popis = "popis", ico = "all", ucs = "all", nks = "all", ixp_den = "all", ac = "all", rok = "all", mesic = "all", den = "all", dat_prij_pod = "dat_prij_pod", ixs_typ = "all", ktg_typ = "all", eko_akt = "all", dat_evid = "all", dat_zau = "all", s_zau = "all", s_sto = "all", ac_ixe = "all", stav_ac_ixe = "all", drd = "all", c = "all", dat_zmena = "all", zmenu_prov = "all", typ_ag = "all", ixs_fun_akt = "all", rok_dph = "all", mesic_dph = "all", subrada = "all", bu_vl = "all", sk_vl = "all", priz_view = "all", ac_ag = "all", ixs_esu = "all", uus = "all", cis_real = "all", ixs_fun_vyriz = "all", stav = "stav", ac_akt = "ac_akt", fik = "all", uck = "all", int_dok = "all", stav_txt = "stav_txt", banklimit_c0 = "all", banklimit_c1 = "all", stupen_ver = "all", icoesu = "all", ixp_zauct = "all", priz_euct = "all", ixs_fun_ooup = "ixs_fun_oozu", ixs_fun_oozu = "ixs_fun_oozu", kniha = "kniha", ecdd = "ecdd", StavDokladu = "all", IsEvidovany = "all", IsZauctovanoCastecne = "all", IsZmenenePodkladyDPH = "all", IsUzavreny = "all", Aktivita = "all", IsStornovano = "all", IsZauctovany = "all", IsNavrh = "all", IsSchvaleny = "all", IsAktivni = "all", IsVyzadujeVazbu = "all", KategorieDokladu = "all", DruhDokladu = "all", IsDanovyDoklad = "all", IsPrimDokladStornovany = "all", IsDokladNesparovanychPlateb = "all", JeDokladSchvalenFinancniKontrolou = "all", JeDokladZamitnutFinancniKontrolou = "all", JeDokladVProcesuFinancniKontroly = "all", JeDokladVProcesuUcetniKontroly = "all", IsPohledavkaBPL = "all", IsDokladEuct = "all",}
	const enum GUctspidExtendDtoTypes { dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", wfl_typ_ag = "number", ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", ixs_fun_akt = "string", rok_dph = "number", mesic_dph = "number", subrada = "number", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", ixs_esu = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", stav = "number", ac_akt = "string", fik = "number", uck = "number", int_dok = "number", stav_txt = "string", banklimit_c0 = "JsonDecimal", banklimit_c1 = "JsonDecimal", stupen_ver = "number", icoesu = "string", ixp_zauct = "string", priz_euct = "number", ixs_fun_ooup = "string", ixs_fun_oozu = "string", kniha = "string", ecdd = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", IsEvidovany = "boolean", IsZauctovanoCastecne = "boolean", IsZmenenePodkladyDPH = "boolean", IsUzavreny = "boolean", Aktivita = "Gordic.Eko.Interface.GEAktivitaDokladu", IsStornovano = "boolean", IsZauctovany = "boolean", IsNavrh = "boolean", IsSchvaleny = "boolean", IsAktivni = "boolean", IsVyzadujeVazbu = "boolean", KategorieDokladu = "Gordic.Eko.Interface.GEKategorieDokladu", DruhDokladu = "Gordic.Eko.Interface.GEDruhDokladu", IsDanovyDoklad = "boolean", IsPrimDokladStornovany = "boolean", IsDokladNesparovanychPlateb = "boolean", JeDokladSchvalenFinancniKontrolou = "boolean", JeDokladZamitnutFinancniKontrolou = "boolean", JeDokladVProcesuFinancniKontroly = "boolean", JeDokladVProcesuUcetniKontroly = "boolean", IsPohledavkaBPL = "boolean", IsDokladEuct = "boolean",}
	const enum GUctspidExtendDtoTypeLengths { ixp = 12, lic = 4, popis = 254, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ac = 20, ixs_typ = 12, ac_ixe = 20, zmenu_prov = 12, ixs_fun_akt = 12, bu_vl = 34, sk_vl = 11, ac_ag = 20, ixs_esu = 12, uus = 10, cis_real = 6, ixs_fun_vyriz = 12, icoesu = 10, ixp_zauct = 12, ixs_fun_ooup = 12, ixs_fun_oozu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Evidence\GUctDokladEvidenceNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO evidence UCt dokladu - nastaveni evidence*/
	interface GUctDokladEvidenceNastaveniDto extends Gordic.Uct.Interface.GUctDokladAkceNastaveniDto {
		/**Provedena kontrola na uzavrene obdobi DPH*/
		OtazkaKontUzavOBDDPH?: boolean|null;
		/**Byl zmenen typ dokladu, budou vynulovany urcite polozku. 
		*     Byl zobrazen dotaz, zda uzivatel seouhlasi.
		*/
		OtazkaNaZmenuTypuDokladu?: boolean|null;
		/**Byl zobrazen dotaz na zruseni schvaleni*/
		OtazkaZruseniSchvaleni?: boolean|null;
		/**Zobrazen vysledek verifikace esu*/
		InfoVerifikaceEsu?: boolean|null;
		/**null - nebyla provedena kontrola
		*     1    - zachovat zapsane cislo
		*     2    - vzit nabidnute cislo
		*/
		OtazkaVysledkuKontrolyCislaDokladu?: number|null;
		/**Období účtování a DPH se liší.*/
		OtazkaDPHUctovani?: boolean|null;
		OtazkaDPHNeniZJ?: boolean|null;
		OtazkaDPHMesicUctovaniJiny?: boolean|null;
		OtazkaDPHDanoveUctyNedanovyDoklad?: boolean|null;
		/**Doaz na pokracovani v pripade knihy pripravene k uzavreni*/
		OtazkaKnihaPripravenaKUzavreni?: boolean|null;
	}
	const enum GUctDokladEvidenceNastaveniDtoNames { OtazkaKontUzavOBDDPH = "OtazkaKontUzavOBDDPH", OtazkaNaZmenuTypuDokladu = "OtazkaNaZmenuTypuDokladu", OtazkaZruseniSchvaleni = "OtazkaZruseniSchvaleni", InfoVerifikaceEsu = "InfoVerifikaceEsu", OtazkaVysledkuKontrolyCislaDokladu = "OtazkaVysledkuKontrolyCislaDokladu", OtazkaDPHUctovani = "OtazkaDPHUctovani", OtazkaDPHNeniZJ = "OtazkaDPHNeniZJ", OtazkaDPHMesicUctovaniJiny = "OtazkaDPHMesicUctovaniJiny", OtazkaDPHDanoveUctyNedanovyDoklad = "OtazkaDPHDanoveUctyNedanovyDoklad", OtazkaKnihaPripravenaKUzavreni = "OtazkaKnihaPripravenaKUzavreni",}
	const enum GUctDokladEvidenceNastaveniDtoFragments { OtazkaKontUzavOBDDPH = "*", OtazkaNaZmenuTypuDokladu = "*", OtazkaZruseniSchvaleni = "*", InfoVerifikaceEsu = "*", OtazkaVysledkuKontrolyCislaDokladu = "*", OtazkaDPHUctovani = "*", OtazkaDPHNeniZJ = "*", OtazkaDPHMesicUctovaniJiny = "*", OtazkaDPHDanoveUctyNedanovyDoklad = "*", OtazkaKnihaPripravenaKUzavreni = "*",}
	const enum GUctDokladEvidenceNastaveniDtoTypes { OtazkaKontUzavOBDDPH = "boolean", OtazkaNaZmenuTypuDokladu = "boolean", OtazkaZruseniSchvaleni = "boolean", InfoVerifikaceEsu = "boolean", OtazkaVysledkuKontrolyCislaDokladu = "number", OtazkaDPHUctovani = "boolean", OtazkaDPHNeniZJ = "boolean", OtazkaDPHMesicUctovaniJiny = "boolean", OtazkaDPHDanoveUctyNedanovyDoklad = "boolean", OtazkaKnihaPripravenaKUzavreni = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Evidence\GUctDokladEvidenceRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO evidence UCt dokladu - vstup (pozadavek)*/
	interface GUctDokladEvidenceRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**DTO hlavicky UCt dokladu*/
		Hlavicka?: Gordic.Uct.Interface.GUctspidExtendDto|null;
		/**Povolit praci s DPH*/
		PovolitPraciSDPH?: boolean|null;
		/**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladEvidenceNastaveniDto|null;
	}
	const enum GUctDokladEvidenceRequestDtoNames { Hlavicka = "Hlavicka", PovolitPraciSDPH = "PovolitPraciSDPH", Nastaveni = "Nastaveni", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladEvidenceRequestDtoFragments { Hlavicka = "*", PovolitPraciSDPH = "*", Nastaveni = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladEvidenceRequestDtoTypes { Hlavicka = "Gordic.Uct.Interface.GUctspidExtendDto", PovolitPraciSDPH = "boolean", Nastaveni = "Gordic.Uct.Interface.GUctDokladEvidenceNastaveniDto", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladEvidenceRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Evidence\GUctDokladEvidenceResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO evidence UCt dokladu - vystup (odpoved)*/
	interface GUctDokladEvidenceResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseDto {
		/**Zobrazit podklady KH DPH v editaci*/
		ZobrazitKHDPH?: boolean|null;
		/**Prvotni evidence dokladu*/
		PrvotniEvidence?: boolean|null;
	}
	const enum GUctDokladEvidenceResponseDtoNames { ZobrazitKHDPH = "ZobrazitKHDPH", PrvotniEvidence = "PrvotniEvidence", ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladEvidenceResponseDtoFragments { ZobrazitKHDPH = "*", PrvotniEvidence = "*", ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctDokladEvidenceResponseDtoTypes { ZobrazitKHDPH = "boolean", PrvotniEvidence = "boolean", ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladEvidenceResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\HromadnaUcetKontrola\GUctDokladFIKUCKHromadneRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO hromadna ucetni/financni kontrola UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladFIKUCKHromadneRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestGroupDto {
		/**Vybrane doklady*/
		Seznam?: Gordic.Uct.Interface.GUctDokladyRequestDto[]|null;
		/**Typ kontroly*/
		TypKontroly?: Gordic.Uct.Interface.GEUCTTypKontroly|null;
	}
	const enum GUctDokladFIKUCKHromadneRequestDtoNames { Seznam = "Seznam", TypKontroly = "TypKontroly", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladFIKUCKHromadneRequestDtoFragments { Seznam = "*", TypKontroly = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladFIKUCKHromadneRequestDtoTypes { Seznam = "Gordic.Uct.Interface.GUctDokladyRequestDto[]", TypKontroly = "Gordic.Uct.Interface.GEUCTTypKontroly", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladFIKUCKHromadneRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\HromadnaUcetKontrola\GUctVybraneDokladyDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro vybrane doklady ze seznamu*/
	interface GUctDokladyRequestDto extends Gordic.Eko.Interface.GUctspidDto {
        /**Vybrany radek*/
		Selected?: boolean|null;
        /**Vysledek operace*/
		ResultOperation?: Gordic.Uct.Interface.GEResultOperation|null;
        /**Textovy vysledek operace*/
		ResultMsg?: string|null;
	}
	const enum GUctDokladyRequestDtoNames { Selected = "Selected", ResultOperation = "ResultOperation", ResultMsg = "ResultMsg",}
	const enum GUctDokladyRequestDtoFragments { Selected = "*", ResultOperation = "*", ResultMsg = "*",}
	const enum GUctDokladyRequestDtoTypes { Selected = "boolean", ResultOperation = "Gordic.Uct.Interface.GEResultOperation", ResultMsg = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\HromadnyPopisZapisu\GUctHromadnyPopisZapisyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro hromadny popis zapisu dokladu*/
	interface GUctHromadnyPopisZapisyDto {
		/**Pid dokladu*/
		PidDokladu?: string|null;
		/**seznam indetifikatoru (radek_z) radku, kde se bude menit popis*/
		listIDRows?: number[]|null;
		/**Novy popis radku*/
		PopisRadku?: string|null;
		/**Prepsat i jiz zadany text na radku*/
		PrepsatNeprazdnePopisy?: boolean|null;
		/**Datum posledni zmeny*/
		DatumPosledniZmenyDokladu?: JsonDate|null;
		/**Novy aktualni datum zmeny*/
		DatumZmenyDokladuNove?: JsonDate|null;
	}
	const enum GUctHromadnyPopisZapisyDtoNames { PidDokladu = "PidDokladu", listIDRows = "listIDRows", PopisRadku = "PopisRadku", PrepsatNeprazdnePopisy = "PrepsatNeprazdnePopisy", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", DatumZmenyDokladuNove = "DatumZmenyDokladuNove",}
	const enum GUctHromadnyPopisZapisyDtoFragments { PidDokladu = "*", listIDRows = "*", PopisRadku = "*", PrepsatNeprazdnePopisy = "*", DatumPosledniZmenyDokladu = "*", DatumZmenyDokladuNove = "*",}
	const enum GUctHromadnyPopisZapisyDtoTypes { PidDokladu = "string", listIDRows = "number[]", PopisRadku = "string", PrepsatNeprazdnePopisy = "boolean", DatumPosledniZmenyDokladu = "JsonDate", DatumZmenyDokladuNove = "JsonDate",}
	const enum GUctHromadnyPopisZapisyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\HromadnyPopisZapisu\GUctVybranyZapisDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vybrane zapisy*/
	interface GUctVybranyZapisDto extends Gordic.Uct.Interface.GUctdpepDto {
		/**Vybrany radek*/
		wiz_check?: boolean|null;
		/**Text chyby*/
		wiz_txt_err?: string|null;
		/**Vysledek akce*/
		wiz_kind?: number|null;
		/**Vybrany radek*/
		Selected?: boolean|null;
		/**Vysledek operace*/
		ResultOperation?: Gordic.Uct.Interface.GEResultOperation|null;
		/**Textovy vysledek operace*/
		ResultMsg?: string|null;
	}
	const enum GUctVybranyZapisDtoNames { wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", Selected = "Selected", ResultOperation = "ResultOperation", ResultMsg = "ResultMsg", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ixp_den = "ixp_den", ac = "ac", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", ixs_kon = "ixs_kon", up_stav = "up_stav", ac_ixe = "ac_ixe", popis = "popis", zd = "zd", uus = "uus", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", priz_rez_sml = "priz_rez_sml", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", priz_ncf = "priz_ncf", priz_ner = "priz_ner", priz_kur_roz = "priz_kur_roz", TypKurzovychRozdilu = "TypKurzovychRozdilu", ac_sml = "ac_sml", smlouva = "smlouva", enabled = "enabled", IsNewRow = "IsNewRow", radek_z = "radek_z",}
	const enum GUctVybranyZapisDtoFragments { wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", Selected = "*", ResultOperation = "*", ResultMsg = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ixp_den = "*", ac = "*", nks = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c1 = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", ixs_kon = "*", up_stav = "*", ac_ixe = "*", popis = "*", zd = "*", uus = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", priz_rez_sml = "*", id_hdr_ris = "*", radek_hdr = "*", priz_ncf = "*", priz_ner = "*", priz_kur_roz = "*", TypKurzovychRozdilu = "*", ac_sml = "*", smlouva = "*", enabled = "*", IsNewRow = "*", radek_z = "*",}
	const enum GUctVybranyZapisDtoTypes { wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", Selected = "boolean", ResultOperation = "Gordic.Uct.Interface.GEResultOperation", ResultMsg = "string", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ixp_den = "string", ac = "string", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", ixs_kon = "string", up_stav = "number", ac_ixe = "string", popis = "string", zd = "number", uus = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", priz_rez_sml = "number", id_hdr_ris = "string", radek_hdr = "number", priz_ncf = "number", priz_ner = "number", priz_kur_roz = "number", TypKurzovychRozdilu = "Gordic.Uct.Interface.GETypKurzovychRozdilu", ac_sml = "string", smlouva = "string", enabled = "boolean", IsNewRow = "boolean", radek_z = "number",}
	const enum GUctVybranyZapisDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ixp_den = 12, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, ixs_kon = 12, ac_ixe = 20, popis = 254, uus = 10, ixp_sml = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\HromadnyPopisZapisu\GUctVysledekZapisyDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro vysledek akce -> seznam zapisu*/
	interface GUctVysledekZapisyDto {
        /**Vybrane zapisy*/
		Seznam?: Gordic.Uct.Interface.GUctdpepDto[]|null;
        /**Pocet ovlivnenych radku*/
		PocetOvlivnenychRadku?: number|null;
        /**Novy aktualni datum zmeny dokladu*/
		DatumZmenyDokladuNove?: JsonDate|null;
	}
	const enum GUctVysledekZapisyDtoNames { Seznam = "Seznam", PocetOvlivnenychRadku = "PocetOvlivnenychRadku", DatumZmenyDokladuNove = "DatumZmenyDokladuNove",}
	const enum GUctVysledekZapisyDtoFragments { Seznam = "*", PocetOvlivnenychRadku = "*", DatumZmenyDokladuNove = "*",}
	const enum GUctVysledekZapisyDtoTypes { Seznam = "Gordic.Uct.Interface.GUctdpepDto[]", PocetOvlivnenychRadku = "number", DatumZmenyDokladuNove = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\IISSP\GUctDokladZapisAlgoritmusKRResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro ulozeni zapisu dokladu odpoved*/
	interface GUctDokladZapisAlgoritmusKRResponseDto extends Gordic.Uct.Interface.GUctZapisActionResponseDto {
        /**Pristupnost smlouvy*/
		PristupnostSmlouvy?: boolean|null;
        /**Upraveny ucetni zapis*/
		TypKurzovychRozdilu?: Gordic.Uct.Interface.GETypKurzovychRozdilu|null;
	}
	const enum GUctDokladZapisAlgoritmusKRResponseDtoNames { PristupnostSmlouvy = "PristupnostSmlouvy", TypKurzovychRozdilu = "TypKurzovychRozdilu", PocetOvlivnenychRadku = "PocetOvlivnenychRadku", ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladZapisAlgoritmusKRResponseDtoFragments { PristupnostSmlouvy = "*", TypKurzovychRozdilu = "*", PocetOvlivnenychRadku = "*", ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctDokladZapisAlgoritmusKRResponseDtoTypes { PristupnostSmlouvy = "boolean", TypKurzovychRozdilu = "Gordic.Uct.Interface.GETypKurzovychRozdilu", PocetOvlivnenychRadku = "number", ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\IISSP\GUctDokladZapisRezervaceIISSPRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro zjištní atributá IISSP - vstup*/
	interface GUctDokladZapisRezervaceIISSPRequestDto extends Gordic.Uct.Interface.GUctZapisActionRequestDto {
		/**typ zpracovani procedury 0- standardni, 1 - bez kontrol*/
		TypZpracovani?: Gordic.Uct.Interface.GEUctTypZpracovani|null;
		/**Příznak zápisu PAM*/
		IsPam?: boolean|null;
	}
	const enum GUctDokladZapisRezervaceIISSPRequestDtoNames { TypZpracovani = "TypZpracovani", IsPam = "IsPam", Zapis = "Zapis", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladZapisRezervaceIISSPRequestDtoFragments { TypZpracovani = "*", IsPam = "*", Zapis = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladZapisRezervaceIISSPRequestDtoTypes { TypZpracovani = "Gordic.Uct.Interface.GEUctTypZpracovani", IsPam = "boolean", Zapis = "Gordic.Uct.Interface.GUctVybranyZapisDto", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladZapisRezervaceIISSPRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\IISSP\GUctDokladZapisRezervaceIISSPResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro ulozeni zapisu dokladu odpoved*/
	interface GUctDokladZapisRezervaceIISSPResponseDto extends Gordic.Uct.Interface.GUctZapisActionResponseDto {
        /**atribut, zda se jedna o pik kuro\vych rozdilu*/
		IsKurzoveRozdily?: boolean|null;
        /**Atributy IISSP pro dany ucetni zapis*/
		IISSPAttr?: Gordic.Uct.Interface.GUctIISSPAttrDto|null;
        /**Upraveny ucetni zapis*/
		Zapis?: Gordic.Uct.Interface.GUctdpepDto|null;
	}
	const enum GUctDokladZapisRezervaceIISSPResponseDtoNames { IsKurzoveRozdily = "IsKurzoveRozdily", IISSPAttr = "IISSPAttr", Zapis = "Zapis", PocetOvlivnenychRadku = "PocetOvlivnenychRadku", ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladZapisRezervaceIISSPResponseDtoFragments { IsKurzoveRozdily = "*", IISSPAttr = "*", Zapis = "*", PocetOvlivnenychRadku = "*", ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctDokladZapisRezervaceIISSPResponseDtoTypes { IsKurzoveRozdily = "boolean", IISSPAttr = "Gordic.Uct.Interface.GUctIISSPAttrDto", Zapis = "Gordic.Uct.Interface.GUctdpepDto", PocetOvlivnenychRadku = "number", ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\IISSP\GUctIISSPAttrDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO atributy z IISSP*/
	interface GUctIISSPAttrDto {
        /**id_hdr_ris*/
		id_hdr_ris?: string|null;
        /**radek_hdr*/
		radek_hdr?: number|null;
        /**typ_pik*/
		typ_pik?: number|null;
        /**priznak ssp (urcuje vazbu na smlouvu)*/
		priz_ssp?: number|null;
	}
	const enum GUctIISSPAttrDtoNames { id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", typ_pik = "typ_pik", priz_ssp = "priz_ssp",}
	const enum GUctIISSPAttrDtoFragments { id_hdr_ris = "*", radek_hdr = "*", typ_pik = "*", priz_ssp = "*",}
	const enum GUctIISSPAttrDtoTypes { id_hdr_ris = "string", radek_hdr = "number", typ_pik = "number", priz_ssp = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Import\GUctDokladZapisImportClipPrepareRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro pripravu importu ze schranky dat do zapisu - vstup*/
	interface GUctDokladZapisImportClipPrepareRequestDto extends Gordic.Uct.Interface.GUctDokladZapisImportPrepareBaseRequestDto {
		/**Data ze schranky*/
		DataZeSchranky?: string|null;
	}
	const enum GUctDokladZapisImportClipPrepareRequestDtoNames { DataZeSchranky = "DataZeSchranky", ProvestKontrolu = "ProvestKontrolu", ViditelneSloupce = "ViditelneSloupce", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladZapisImportClipPrepareRequestDtoFragments { DataZeSchranky = "*", ProvestKontrolu = "*", ViditelneSloupce = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladZapisImportClipPrepareRequestDtoTypes { DataZeSchranky = "string", ProvestKontrolu = "boolean", ViditelneSloupce = "Gordic.Eko.Interface.GVisibleTableColumns[]", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladZapisImportClipPrepareRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Import\GUctDokladZapisImportFilePrepareRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro pripravu importu ze souboru dat do zapisu - vstup*/
	interface GUctDokladZapisImportPrepareRequestDto extends Gordic.Uct.Interface.GUctDokladZapisImportPrepareBaseRequestDto {
		/**Souborove informace pro import*/
		FileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
	}
	const enum GUctDokladZapisImportPrepareRequestDtoNames { FileInfo = "FileInfo", ProvestKontrolu = "ProvestKontrolu", ViditelneSloupce = "ViditelneSloupce", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladZapisImportPrepareRequestDtoFragments { FileInfo = "*", ProvestKontrolu = "*", ViditelneSloupce = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladZapisImportPrepareRequestDtoTypes { FileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto", ProvestKontrolu = "boolean", ViditelneSloupce = "Gordic.Eko.Interface.GVisibleTableColumns[]", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladZapisImportPrepareRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Import\GUctDokladZapisImportPrepareBaseRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO zakladni pro pripravu import dat do zapisu - vstup*/
	interface GUctDokladZapisImportPrepareBaseRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Provadet kontrolu dat na pripravenych datach*/
		ProvestKontrolu?: boolean|null;
		/**Viditelne sloupce na porizovaci*/
		ViditelneSloupce?: Gordic.Eko.Interface.GVisibleTableColumns[]|null;
	}
	const enum GUctDokladZapisImportPrepareBaseRequestDtoNames { ProvestKontrolu = "ProvestKontrolu", ViditelneSloupce = "ViditelneSloupce", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladZapisImportPrepareBaseRequestDtoFragments { ProvestKontrolu = "*", ViditelneSloupce = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladZapisImportPrepareBaseRequestDtoTypes { ProvestKontrolu = "boolean", ViditelneSloupce = "Gordic.Eko.Interface.GVisibleTableColumns[]", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladZapisImportPrepareBaseRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Import\GUctDokladZapisImportRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro import dat do ucetnich zapisu - vstup*/
	interface GUctDokladZapisImportRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Provadet kontrolu na rozvrh pri importu*/
		KontrolovatNaRozvrh?: boolean|null;
		/**Vybrane zapisy pro import*/
		Seznam?: Gordic.Uct.Interface.GUctVybranyZapisDto[]|null;
	}
	const enum GUctDokladZapisImportRequestDtoNames { KontrolovatNaRozvrh = "KontrolovatNaRozvrh", Seznam = "Seznam", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladZapisImportRequestDtoFragments { KontrolovatNaRozvrh = "*", Seznam = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladZapisImportRequestDtoTypes { KontrolovatNaRozvrh = "boolean", Seznam = "Gordic.Uct.Interface.GUctVybranyZapisDto[]", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladZapisImportRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Import\GUctResultZapisyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro vysledek akce -> seznam zapisu*/
	interface GUctResultZapisyDto {
		/**Vybrane zapisy*/
		Seznam?: Gordic.Uct.Interface.GUctVybranyZapisDto[]|null;
		/**Novy aktualni datum zmeny dokladu*/
		DatumZmenyDokladuNove?: JsonDate|null;
	}
	const enum GUctResultZapisyDtoNames { Seznam = "Seznam", DatumZmenyDokladuNove = "DatumZmenyDokladuNove",}
	const enum GUctResultZapisyDtoFragments { Seznam = "*", DatumZmenyDokladuNove = "*",}
	const enum GUctResultZapisyDtoTypes { Seznam = "Gordic.Uct.Interface.GUctVybranyZapisDto[]", DatumZmenyDokladuNove = "JsonDate",}
	const enum GUctResultZapisyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Knihy\GUctDokladPermissionsSeznam.d.ts 

declare namespace Gordic.Uct.Interface {
	/**opravneni k  akcim na seznamu dokladu*/
	interface GUctKnihaPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Povoleni uzaverek*/
		EnableClosing: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni znovuotevreni aktualni knihy*/
		OpenBook: Gordic.General.ApplicationInterface.GPermission;
		/**Povolen9 uzavreni knihy*/
		CloseBook: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GUctKnihaPermissionsNames { EnableClosing = "EnableClosing", OpenBook = "OpenBook", CloseBook = "CloseBook",}
	const enum GUctKnihaPermissionsFragments { EnableClosing = "*", OpenBook = "*", CloseBook = "*",}
	const enum GUctKnihaPermissionsTypes { EnableClosing = "Gordic.General.ApplicationInterface.GPermission", OpenBook = "Gordic.General.ApplicationInterface.GPermission", CloseBook = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GUctKnihaPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Knihy\GUctKnihaFiltr.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Enum filtru dokladu*/
	const enum GEUctKnihaFiltr {
		/**Pid knihy*/
		ixp_den,
		/**Uctarna*/
		uus,
		/**Ucetnistredisko*/
		ucs,
		/**Subrada*/
		subrada,
		/**Rok*/
		rok,
		/**aktivita deniku*/
		aktivita,
		/**Nazev knihy*/
		nazev,
		/**Zkratka subrady*/
		zkratka,
		/**Aktivita subrady*/
		akt_subrady,
	}
	/**Filtry na uct doklady*/
	interface GUctKnihaFiltr {
		/**Pid knihy*/
		ixp_den?: GBaseFilter<string>|null;
		/**Rok dokladu*/
		rok?: GIntervalDto<number>|null;
		/**Aktivita knihy*/
		aktivita?: GBaseFilter<number>|null;
		/**Uctarna*/
		uus?: GBaseFilter<string>|null;
		/**Ucetni stredisko*/
		ucs?: GIntervalDto<number>|null;
		/**Nazev knihy*/
		nazev?: GBaseFilter<string>|null;
		/**Aktivita subrady*/
		akt_subrady?: GIntervalDto<number>|null;
		/**Subrada*/
		subrada?: GBaseFilter<number>|null;
		/**Zkratka subrady*/
		zkratka?: GBaseFilter<string>|null;
	}
	const enum GUctKnihaFiltrNames { ixp_den = "ixp_den", rok = "rok", aktivita = "aktivita", uus = "uus", ucs = "ucs", nazev = "nazev", akt_subrady = "akt_subrady", subrada = "subrada", zkratka = "zkratka",}
	const enum GUctKnihaFiltrFragments { ixp_den = "uctsden", rok = "uctsden", aktivita = "uctsden", uus = "uctsden", ucs = "uctsden", nazev = "uctsden", akt_subrady = "uctrdac", subrada = "uctrdac", zkratka = "uctrdac",}
	const enum GUctKnihaFiltrTypes { ixp_den = "GBaseFilter<string>", rok = "GIntervalDto<number>", aktivita = "GBaseFilter<number>", uus = "GBaseFilter<string>", ucs = "GIntervalDto<number>", nazev = "GBaseFilter<string>", akt_subrady = "GIntervalDto<number>", subrada = "GBaseFilter<number>", zkratka = "GBaseFilter<string>",}
	const enum GUctKnihaFiltrTypeLengths { ixp_den = 12, zkratka = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Knihy\GUctKnihyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO knihy*/
	interface GUctKnihaDto extends Gordic.Uct.Interface.GUctsdenDto {
		/**zkratka knihy*/
		zkratka?: string|null;
		/**subrada knihy*/
		subrada?: number|null;
		/**aktivita subrady*/
		akt_subrady?: number|null;
		/**Kategorie knihy  - popis*/
		ktg_den_txt?: string|null;
		/**Stav knihy - popis*/
		stav_txt?: string|null;
		/**Počet dokladů aktuálně evidovaných v knize*/
		pocet_vsech_dokladu?: number|null;
		/**Celkovy pocet dokladu ke knize v archivu*/
		pocet_vsech_dokladu_archiv?: number|null;
		/**Pocet nepripravenych dokladu k uzaverce*/
		pocet_neuzavrenych_dokladu?: number|null;
		/**Počet dokladů podaných do knihy a nezaevidovaných, které rovněž mohou bránit uzávěrce*/
		pocet_neevid_dokladu?: number|null;
	}
	const enum GUctKnihaDtoNames { zkratka = "zkratka", subrada = "subrada", akt_subrady = "akt_subrady", ktg_den_txt = "ktg_den_txt", stav_txt = "stav_txt", pocet_vsech_dokladu = "pocet_vsech_dokladu", pocet_vsech_dokladu_archiv = "pocet_vsech_dokladu_archiv", pocet_neuzavrenych_dokladu = "pocet_neuzavrenych_dokladu", pocet_neevid_dokladu = "pocet_neevid_dokladu", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix", uex = "uex", ixs_vpk = "ixs_vpk",}
	const enum GUctKnihaDtoFragments { zkratka = "rdac", subrada = "rdac", akt_subrady = "rdac", ktg_den_txt = "uctcktd", stav_txt = "ekocakr", pocet_vsech_dokladu = "doklad_vse", pocet_vsech_dokladu_archiv = "doklad_archiv", pocet_neuzavrenych_dokladu = "doklad_neuzavreno", pocet_neevid_dokladu = "doklad_neevid", ixp_den = "sden", lic = "sden", aktivita = "sden", arw = "sden", poznamka = "sden", dat_od = "sden", dat_do = "sden", ico = "sden", ucs = "sden", nazev = "sden", rok = "sden", typ_den = "sden", ktg_den = "sden", dat_zmena = "sden", zmenu_prov = "sden", por_cislo_max = "sden", subrada_max = "sden", subrada_duz = "sden", len_ac = "sden", krok_uza = "sden", ixp_den_old = "sden", uus = "sden", prefix = "sden", suffix = "sden", uex = "sden", ixs_vpk = "sden",}
	const enum GUctKnihaDtoTypes { zkratka = "string", subrada = "number", akt_subrady = "number", ktg_den_txt = "string", stav_txt = "string", pocet_vsech_dokladu = "number", pocet_vsech_dokladu_archiv = "number", pocet_neuzavrenych_dokladu = "number", pocet_neevid_dokladu = "number", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string", uex = "string", ixs_vpk = "string",}
	const enum GUctKnihaDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30, uex = 16, ixs_vpk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Knihy\GUctSouctyKnihDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO knihy*/
	interface GUctSouctyKnihDto {
		/**Pocet knih v agende*/
		NumberOfBooks?: number|null;
		/**Pocet uzavrenych knih v agende*/
		NumberOfClosedBooks?: number|null;
		/**Pocet otevrenych knih v agende*/
		NumberOfOpenedBooks?: number|null;
		/**Pocet pripavenych knih k uzavreni knih v agende*/
		NumberOfReadyForClosing?: number|null;
	}
	const enum GUctSouctyKnihDtoNames { NumberOfBooks = "NumberOfBooks", NumberOfClosedBooks = "NumberOfClosedBooks", NumberOfOpenedBooks = "NumberOfOpenedBooks", NumberOfReadyForClosing = "NumberOfReadyForClosing",}
	const enum GUctSouctyKnihDtoFragments { NumberOfBooks = "*", NumberOfClosedBooks = "*", NumberOfOpenedBooks = "*", NumberOfReadyForClosing = "*",}
	const enum GUctSouctyKnihDtoTypes { NumberOfBooks = "number", NumberOfClosedBooks = "number", NumberOfOpenedBooks = "number", NumberOfReadyForClosing = "number",}
	const enum GUctSouctyKnihDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Knihy\GUctVybraneKnihyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO knihy*/
	interface GUctVybraneKnihyDto extends Gordic.Uct.Interface.GUctKnihaDto {
		/**Vybrany radek*/
		Selected?: boolean|null;
		/**Vysledek operace*/
		ResultOperation?: Gordic.Uct.Interface.GEResultOperation|null;
		/**Textovy vysledek operace*/
		ResultMsg?: string|null;
		/**Vybrany radek*/
		wiz_check?: boolean|null;
		/**Text chyby*/
		wiz_txt_err?: string|null;
		/**Vysledek akce*/
		wiz_kind?: number|null;
	}
	const enum GUctVybraneKnihyDtoNames { Selected = "Selected", ResultOperation = "ResultOperation", ResultMsg = "ResultMsg", wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", zkratka = "zkratka", subrada = "subrada", akt_subrady = "akt_subrady", stav_txt = "stav_txt", pocet_vsech_dokladu = "pocet_vsech_dokladu", pocet_vsech_dokladu_archiv = "pocet_vsech_dokladu_archiv", pocet_neuzavrenych_dokladu = "pocet_neuzavrenych_dokladu", ixp_den = "ixp_den", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", ico = "ico", ucs = "ucs", nazev = "nazev", rok = "rok", typ_den = "typ_den", ktg_den = "ktg_den", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", por_cislo_max = "por_cislo_max", subrada_max = "subrada_max", subrada_duz = "subrada_duz", len_ac = "len_ac", krok_uza = "krok_uza", ixp_den_old = "ixp_den_old", uus = "uus", prefix = "prefix", suffix = "suffix", uex = "uex", ixs_vpk = "ixs_vpk",}
	const enum GUctVybraneKnihyDtoFragments { Selected = "*", ResultOperation = "*", ResultMsg = "*", wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", zkratka = "*", subrada = "*", akt_subrady = "*", stav_txt = "*", pocet_vsech_dokladu = "doklad", pocet_vsech_dokladu_archiv = "doklad", pocet_neuzavrenych_dokladu = "doklad", ixp_den = "uctsden", lic = "uctsden", aktivita = "uctsden", arw = "uctsden", poznamka = "uctsden", dat_od = "uctsden", dat_do = "uctsden", ico = "uctsden", ucs = "uctsden", nazev = "uctsden", rok = "uctsden", typ_den = "uctsden", ktg_den = "uctsden", dat_zmena = "uctsden", zmenu_prov = "uctsden", por_cislo_max = "uctsden", subrada_max = "uctsden", subrada_duz = "uctsden", len_ac = "uctsden", krok_uza = "uctsden", ixp_den_old = "uctsden", uus = "uctsden", prefix = "uctsden", suffix = "uctsden", uex = "uctsden", ixs_vpk = "uctsden",}
	const enum GUctVybraneKnihyDtoTypes { Selected = "boolean", ResultOperation = "Gordic.Uct.Interface.GEResultOperation", ResultMsg = "string", wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", zkratka = "string", subrada = "number", akt_subrady = "number", stav_txt = "string", pocet_vsech_dokladu = "number", pocet_vsech_dokladu_archiv = "number", pocet_neuzavrenych_dokladu = "number", ixp_den = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", ico = "string", ucs = "string", nazev = "string", rok = "number", typ_den = "number", ktg_den = "number", dat_zmena = "JsonDate", zmenu_prov = "string", por_cislo_max = "number", subrada_max = "number", subrada_duz = "number", len_ac = "number", krok_uza = "number", ixp_den_old = "string", uus = "string", prefix = "string", suffix = "string", uex = "string", ixs_vpk = "string",}
	const enum GUctVybraneKnihyDtoTypeLengths { ixp_den = 12, lic = 4, poznamka = 50, ico = 10, ucs = 10, nazev = 50, zmenu_prov = 12, ixp_den_old = 12, uus = 10, prefix = 30, suffix = 30, uex = 16, ixs_vpk = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\KopieDokladu\GUctDokladKopieRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro kopie dokladu - vstup*/
	interface GUctDokladKopieRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Sejmuty pid*/
		SejmutyPidDokladu?: string|null;
		/**Kopirovani i zapisu*/
		KopirovatZapisy?: boolean|null;
		/**Nastaveni, zda se snima stitky*/
		SejnmoutStitek?: boolean|null;
	}
	const enum GUctDokladKopieRequestDtoNames { SejmutyPidDokladu = "SejmutyPidDokladu", KopirovatZapisy = "KopirovatZapisy", SejnmoutStitek = "SejnmoutStitek", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladKopieRequestDtoFragments { SejmutyPidDokladu = "*", KopirovatZapisy = "*", SejnmoutStitek = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladKopieRequestDtoTypes { SejmutyPidDokladu = "string", KopirovatZapisy = "boolean", SejnmoutStitek = "boolean", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladKopieRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Odschvalit\GUctDokladOdschvalitInDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO odschvaleni UCT dokladu - vstup (request)*/
	interface GUctDokladOdschvalitRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
        /**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladOdSchvalitNastaveniDto|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Odschvalit\GUctDokladOdSchvalitNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO schvaleni UCT dokladu - nastaveni odschvaleni*/
	interface GUctDokladOdSchvalitNastaveniDto extends Gordic.Uct.Interface.GUctDokladAkceNastaveniDto {
		/**Účtujete do uzavřeného období.*/
		OtazkaUzavObdobi?: boolean|null;
		/**Doklad dosud neprošel ucetni kontrolou.Opravdu si přejete pokračovat bez FIK ?*/
		OtazkaUKUcetniKontrola?: boolean|null;
		/**Doklad dosud neprošel finanční kontrolou.Opravdu si přejete pokračovat bez FIK ?*/
		OtazkaFIKFinancniKontrola?: boolean|null;
	}
	const enum GUctDokladOdSchvalitNastaveniDtoNames { OtazkaUzavObdobi = "OtazkaUzavObdobi", OtazkaUKUcetniKontrola = "OtazkaUKUcetniKontrola", OtazkaFIKFinancniKontrola = "OtazkaFIKFinancniKontrola", OtazkaVimCoDelam = "OtazkaVimCoDelam",}
	const enum GUctDokladOdSchvalitNastaveniDtoFragments { OtazkaUzavObdobi = "*", OtazkaUKUcetniKontrola = "*", OtazkaFIKFinancniKontrola = "*", OtazkaVimCoDelam = "*",}
	const enum GUctDokladOdSchvalitNastaveniDtoTypes { OtazkaUzavObdobi = "boolean", OtazkaUKUcetniKontrola = "boolean", OtazkaFIKFinancniKontrola = "boolean", OtazkaVimCoDelam = "boolean",}
	const enum GUctDokladOdSchvalitNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Odschvalit\GUctDokladOdschvalitResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO schvaleni UCT dokladu - vystup (response)*/
	interface GUctDokladOdschvalitResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseDto {
	}
	const enum GUctDokladOdschvalitResponseDtoNames { ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladOdschvalitResponseDtoFragments { ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctDokladOdschvalitResponseDtoTypes { ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladOdschvalitResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\OdStornovat\GUctDokladOdStornovatNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO odstornovat UCT dokladu - nastaveni*/
	interface GUctDokladOdStornovatNastaveniDto extends Gordic.Uct.Interface.GUctDokladAkceNastaveniDto {
		/**Otazka duvodu zruseni storna*/
		OtazkaDuvodZruseniStorna?: boolean|null;
		/**Otazka uzavreni stronujiciho dokladu*/
		OtazkaUzavreniStornujicihoDokladu?: boolean|null;
	}
	const enum GUctDokladOdStornovatNastaveniDtoNames { OtazkaDuvodZruseniStorna = "OtazkaDuvodZruseniStorna", OtazkaUzavreniStornujicihoDokladu = "OtazkaUzavreniStornujicihoDokladu",}
	const enum GUctDokladOdStornovatNastaveniDtoFragments { OtazkaDuvodZruseniStorna = "*", OtazkaUzavreniStornujicihoDokladu = "*",}
	const enum GUctDokladOdStornovatNastaveniDtoTypes { OtazkaDuvodZruseniStorna = "boolean", OtazkaUzavreniStornujicihoDokladu = "boolean",}
	const enum GUctDokladOdStornovatNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\OdStornovat\GUctDokladOdStornovatRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO odstornovani UCT dokladu - vstup (request)*/
	interface GUctDokladOdStornovatRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
        /**Duvod aktivace storna*/
		DuvodAktivaceStorna?: string|null;
        /**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladOdStornovatNastaveniDto|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\OdStornovat\GUctDokladOdStornovatResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO odstornovat UCT dokladu - vystup (response)*/
	interface GUctDokladOdStornovatResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseDto {
		/**Gets or sets the identifier of the documents that are being canceled.*/
		PidStornujicihDokladu?: string|null;
	}
	const enum GUctDokladOdStornovatResponseDtoNames { PidStornujicihDokladu = "PidStornujicihDokladu", ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladOdStornovatResponseDtoFragments { PidStornujicihDokladu = "*", ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctDokladOdStornovatResponseDtoTypes { PidStornujicihDokladu = "string", ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladOdStornovatResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\OznacitDokladu\GUctOznacitDokladyDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro vybrane doklady k oznaceni k ne/precnteni*/
	interface GUctOznacitDokladyDto extends Gordic.Uct.Interface.GUctSkupinaDokladuDto {
        /**Oznaceni dokladu ne/precteni*/
		Oznacit?: Gordic.Uct.Interface.GETypOznaceniDokladu|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Permissions\GUctDokladPermissions.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Opravneni k akcim na dokladu*/
	interface GUctDokladPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
        /**Opravneni na hlavicce*/
		PermissionsHlavicka: Gordic.Uct.Interface.GUctDokladPermissionsHlavicka;
        /**Opravneni na polozkach*/
		PermissionsZapis: Gordic.Uct.Interface.GUctDokladPermissionsZapis;
	}
	const enum GUctDokladPermissionsNames { PermissionsHlavicka = "PermissionsHlavicka", PermissionsZapis = "PermissionsZapis",}
	const enum GUctDokladPermissionsFragments { PermissionsHlavicka = "*", PermissionsZapis = "*",}
	const enum GUctDokladPermissionsTypes { PermissionsHlavicka = "Gordic.Uct.Interface.GUctDokladPermissionsHlavicka", PermissionsZapis = "Gordic.Uct.Interface.GUctDokladPermissionsZapis",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Permissions\GUctDokladPermissionsHlavicka.d.ts 

declare namespace Gordic.Uct.Interface {
	/**opravneni k  akcim na hlavicce dokladu*/
	interface GUctDokladPermissionsHlavicka extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Povoleni nacteni dokladu*/
		CanRead: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni podani*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni evidence*/
		CanUpdate: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni editace hlavicky*/
		CanEdit: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni storna dokladu*/
		PovoleniStorna: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni aktivace storna dokladu*/
		PovoleniAktivaceStorna: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavreni dokladu*/
		PovoleniUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zrusit editace hlavicky*/
		CanStornoEdit: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni podkladu kontrolniho hlaseni DPH*/
		PovoleniKontrolnihoHlaseni: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni vazeb dokladu*/
		PovoleniVazebDokladu: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni schvaleni*/
		PovoleniSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni odschvaleni*/
		PovoleniOdschvalit: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni prouctovat*/
		PovoleniProuctovat: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni predani*/
		PovoleniPredat: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni preevedivat*/
		PovoleniPreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni prideleni*/
		PovoleniPridelit: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni prevzeti*/
		PovoleniPrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni kopie dokladu*/
		PovoleniKopieDokladu: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni kopie dokladu*/
		PovoleniKopieDokladuBezPolozek: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zobrazit uctenku z bankovniho vypisu*/
		PovoleniZobrazitUctenku: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni vraceni do WFL*/
		PovoleniVraceniDoWFL: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GUctDokladPermissionsHlavickaNames { CanRead = "CanRead", CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanEdit = "CanEdit", PovoleniStorna = "PovoleniStorna", PovoleniAktivaceStorna = "PovoleniAktivaceStorna", PovoleniUzavreni = "PovoleniUzavreni", CanStornoEdit = "CanStornoEdit", PovoleniKontrolnihoHlaseni = "PovoleniKontrolnihoHlaseni", PovoleniVazebDokladu = "PovoleniVazebDokladu", PovoleniSchvalit = "PovoleniSchvalit", PovoleniOdschvalit = "PovoleniOdschvalit", PovoleniProuctovat = "PovoleniProuctovat", PovoleniPredat = "PovoleniPredat", PovoleniPreevidovat = "PovoleniPreevidovat", PovoleniPridelit = "PovoleniPridelit", PovoleniPrevzit = "PovoleniPrevzit", PovoleniKopieDokladu = "PovoleniKopieDokladu", PovoleniKopieDokladuBezPolozek = "PovoleniKopieDokladuBezPolozek", PovoleniZobrazitUctenku = "PovoleniZobrazitUctenku", PovoleniVraceniDoWFL = "PovoleniVraceniDoWFL",}
	const enum GUctDokladPermissionsHlavickaFragments { CanRead = "*", CanCreate = "*", CanUpdate = "*", CanEdit = "*", PovoleniStorna = "*", PovoleniAktivaceStorna = "*", PovoleniUzavreni = "*", CanStornoEdit = "*", PovoleniKontrolnihoHlaseni = "*", PovoleniVazebDokladu = "*", PovoleniSchvalit = "*", PovoleniOdschvalit = "*", PovoleniProuctovat = "*", PovoleniPredat = "*", PovoleniPreevidovat = "*", PovoleniPridelit = "*", PovoleniPrevzit = "*", PovoleniKopieDokladu = "*", PovoleniKopieDokladuBezPolozek = "*", PovoleniZobrazitUctenku = "*", PovoleniVraceniDoWFL = "*",}
	const enum GUctDokladPermissionsHlavickaTypes { CanRead = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanEdit = "Gordic.General.ApplicationInterface.GPermission", PovoleniStorna = "Gordic.General.ApplicationInterface.GPermission", PovoleniAktivaceStorna = "Gordic.General.ApplicationInterface.GPermission", PovoleniUzavreni = "Gordic.General.ApplicationInterface.GPermission", CanStornoEdit = "Gordic.General.ApplicationInterface.GPermission", PovoleniKontrolnihoHlaseni = "Gordic.General.ApplicationInterface.GPermission", PovoleniVazebDokladu = "Gordic.General.ApplicationInterface.GPermission", PovoleniSchvalit = "Gordic.General.ApplicationInterface.GPermission", PovoleniOdschvalit = "Gordic.General.ApplicationInterface.GPermission", PovoleniProuctovat = "Gordic.General.ApplicationInterface.GPermission", PovoleniPredat = "Gordic.General.ApplicationInterface.GPermission", PovoleniPreevidovat = "Gordic.General.ApplicationInterface.GPermission", PovoleniPridelit = "Gordic.General.ApplicationInterface.GPermission", PovoleniPrevzit = "Gordic.General.ApplicationInterface.GPermission", PovoleniKopieDokladu = "Gordic.General.ApplicationInterface.GPermission", PovoleniKopieDokladuBezPolozek = "Gordic.General.ApplicationInterface.GPermission", PovoleniZobrazitUctenku = "Gordic.General.ApplicationInterface.GPermission", PovoleniVraceniDoWFL = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GUctDokladPermissionsHlavickaTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Permissions\GUctDokladPermissionsZapis.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Prava k akcim zapisu dokladu*/
	interface GUctDokladPermissionsZapis extends Gordic.General.ApplicationInterface.GPermissionSet {
        /**Povoleni noveho zapisu*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni ulozeni zapisu*/
		CanUpdate: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni zruseni editace zapisu*/
		PovoleniZrusitEditaciZapisu: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni editace zapisu*/
		CanEdit: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni odstraneni zapisu*/
		CanDelete: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni predkontace*/
		PovoleniPredkontace: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni vyrovnani zapisu*/
		PovoleniVyrovnaniZapisu: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni importu ze souboru*/
		PovoleniImportuZeSouboru: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni importu ze schranky*/
		PovoleniImportuZeSchranky: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni vytvorit predkontaci ze zapisu*/
		PovoleniVytvoritPredkontaci: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni hromadneho popisu zapisu*/
		PovoleniHromadnehoPopisuZapisu: Gordic.General.ApplicationInterface.GPermission;
        /**Povoleni hromadneho popisu zapisu*/
		PovoleniSmlouvy: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GUctDokladPermissionsZapisNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate", PovoleniZrusitEditaciZapisu = "PovoleniZrusitEditaciZapisu", CanEdit = "CanEdit", CanDelete = "CanDelete", PovoleniPredkontace = "PovoleniPredkontace", PovoleniVyrovnaniZapisu = "PovoleniVyrovnaniZapisu", PovoleniImportuZeSouboru = "PovoleniImportuZeSouboru", PovoleniImportuZeSchranky = "PovoleniImportuZeSchranky", PovoleniVytvoritPredkontaci = "PovoleniVytvoritPredkontaci", PovoleniHromadnehoPopisuZapisu = "PovoleniHromadnehoPopisuZapisu", PovoleniSmlouvy = "PovoleniSmlouvy",}
	const enum GUctDokladPermissionsZapisFragments { CanCreate = "*", CanUpdate = "*", PovoleniZrusitEditaciZapisu = "*", CanEdit = "*", CanDelete = "*", PovoleniPredkontace = "*", PovoleniVyrovnaniZapisu = "*", PovoleniImportuZeSouboru = "*", PovoleniImportuZeSchranky = "*", PovoleniVytvoritPredkontaci = "*", PovoleniHromadnehoPopisuZapisu = "*", PovoleniSmlouvy = "*",}
	const enum GUctDokladPermissionsZapisTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", PovoleniZrusitEditaciZapisu = "Gordic.General.ApplicationInterface.GPermission", CanEdit = "Gordic.General.ApplicationInterface.GPermission", CanDelete = "Gordic.General.ApplicationInterface.GPermission", PovoleniPredkontace = "Gordic.General.ApplicationInterface.GPermission", PovoleniVyrovnaniZapisu = "Gordic.General.ApplicationInterface.GPermission", PovoleniImportuZeSouboru = "Gordic.General.ApplicationInterface.GPermission", PovoleniImportuZeSchranky = "Gordic.General.ApplicationInterface.GPermission", PovoleniVytvoritPredkontaci = "Gordic.General.ApplicationInterface.GPermission", PovoleniHromadnehoPopisuZapisu = "Gordic.General.ApplicationInterface.GPermission", PovoleniSmlouvy = "Gordic.General.ApplicationInterface.GPermission",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\PermissionsSeznam\GUctDokladPermissionsSeznam.d.ts 

declare namespace Gordic.Uct.Interface {
	/**opravneni k  akcim na seznamu dokladu*/
	interface GUctDokladPermissionsSeznam extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Povoleni nacteni dokladu*/
		CanRead: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni podani*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zobrazeni detailu dokladu*/
		PovoleniEditaceDokladu: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavreni dokladu*/
		PovoleniUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni prouctovat*/
		PovoleniProuctovat: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni predani*/
		PovoleniPredat: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni prideleni*/
		PovoleniPridelit: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni prevzeti*/
		PovoleniPrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Preevidence*/
		PovoleniPreevidence: Gordic.General.ApplicationInterface.GPermission;
		/**Klicova slova*/
		PovoleniKlicovaSlova: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni vazeb dokladu*/
		PovoleniVazebDokladu: Gordic.General.ApplicationInterface.GPermission;
		/**Oznacit neprectene*/
		PovolenOznacitPrectene: Gordic.General.ApplicationInterface.GPermission;
		/**Oznacit prectene*/
		PovolenOznacitNeprectene: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni hromadne kontroly metadat*/
		PovoleniKontrolyMetadat: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni hromadne FIK*/
		PovoleniFIK: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni hromadne UK*/
		PovoleniUK: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GUctDokladPermissionsSeznamNames { CanRead = "CanRead", CanCreate = "CanCreate", PovoleniEditaceDokladu = "PovoleniEditaceDokladu", PovoleniUzavreni = "PovoleniUzavreni", PovoleniProuctovat = "PovoleniProuctovat", PovoleniPredat = "PovoleniPredat", PovoleniPridelit = "PovoleniPridelit", PovoleniPrevzit = "PovoleniPrevzit", PovoleniPreevidence = "PovoleniPreevidence", PovoleniKlicovaSlova = "PovoleniKlicovaSlova", PovoleniVazebDokladu = "PovoleniVazebDokladu", PovolenOznacitPrectene = "PovolenOznacitPrectene", PovolenOznacitNeprectene = "PovolenOznacitNeprectene", PovoleniKontrolyMetadat = "PovoleniKontrolyMetadat", PovoleniFIK = "PovoleniFIK", PovoleniUK = "PovoleniUK",}
	const enum GUctDokladPermissionsSeznamFragments { CanRead = "*", CanCreate = "*", PovoleniEditaceDokladu = "*", PovoleniUzavreni = "*", PovoleniProuctovat = "*", PovoleniPredat = "*", PovoleniPridelit = "*", PovoleniPrevzit = "*", PovoleniPreevidence = "*", PovoleniKlicovaSlova = "*", PovoleniVazebDokladu = "*", PovolenOznacitPrectene = "*", PovolenOznacitNeprectene = "*", PovoleniKontrolyMetadat = "*", PovoleniFIK = "*", PovoleniUK = "*",}
	const enum GUctDokladPermissionsSeznamTypes { CanRead = "Gordic.General.ApplicationInterface.GPermission", CanCreate = "Gordic.General.ApplicationInterface.GPermission", PovoleniEditaceDokladu = "Gordic.General.ApplicationInterface.GPermission", PovoleniUzavreni = "Gordic.General.ApplicationInterface.GPermission", PovoleniProuctovat = "Gordic.General.ApplicationInterface.GPermission", PovoleniPredat = "Gordic.General.ApplicationInterface.GPermission", PovoleniPridelit = "Gordic.General.ApplicationInterface.GPermission", PovoleniPrevzit = "Gordic.General.ApplicationInterface.GPermission", PovoleniPreevidence = "Gordic.General.ApplicationInterface.GPermission", PovoleniKlicovaSlova = "Gordic.General.ApplicationInterface.GPermission", PovoleniVazebDokladu = "Gordic.General.ApplicationInterface.GPermission", PovolenOznacitPrectene = "Gordic.General.ApplicationInterface.GPermission", PovolenOznacitNeprectene = "Gordic.General.ApplicationInterface.GPermission", PovoleniKontrolyMetadat = "Gordic.General.ApplicationInterface.GPermission", PovoleniFIK = "Gordic.General.ApplicationInterface.GPermission", PovoleniUK = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GUctDokladPermissionsSeznamTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\PermissionsSeznam\GUctDokladPermissionsSeznamRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO zjisteni pristupnosti akci na seznamu - vstup (pozadavek)*/
	interface GUctDokladPermissionsSeznamRequestDto extends Gordic.Uct.Interface.GUctDokladActionBaseRequestDto {
	}
	const enum GUctDokladPermissionsSeznamRequestDtoNames {}
	const enum GUctDokladPermissionsSeznamRequestDtoFragments {}
	const enum GUctDokladPermissionsSeznamRequestDtoTypes {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Podani\GUctDokladPodaniNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO podani UCT dokladu - nastaveni podani*/
	interface GUctDokladPodaniNastaveniDto {
		/**Kniha je připravena k uzavření.*/
		OtazkaKnihaPripravenaKUzavreni?: boolean|null;
		/**Dotaz, zda agendove cislo a evidencni v knize je ok pri prvnim podani do knihy*/
		OtazkaPrvniDokladVKnize?: boolean|null;
	}
	const enum GUctDokladPodaniNastaveniDtoNames { OtazkaKnihaPripravenaKUzavreni = "OtazkaKnihaPripravenaKUzavreni", OtazkaPrvniDokladVKnize = "OtazkaPrvniDokladVKnize",}
	const enum GUctDokladPodaniNastaveniDtoFragments { OtazkaKnihaPripravenaKUzavreni = "*", OtazkaPrvniDokladVKnize = "*",}
	const enum GUctDokladPodaniNastaveniDtoTypes { OtazkaKnihaPripravenaKUzavreni = "boolean", OtazkaPrvniDokladVKnize = "boolean",}
	const enum GUctDokladPodaniNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Podani\GUctDokladPodaniRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro podani dokladu*/
	interface GUctDokladPodaniRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
        /**Nastaveno sejmuti pidu*/
		SejmutiPidu?: boolean|null;
        /**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladPodaniNastaveniDto|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Podani\GUctDokladPodaniResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO s vysledkem podani dokladu*/
	interface GUctDokladPodaniResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseBaseDto {
		/**Poslani pid dokladu jiz existuje*/
		DokladJizExistuje?: boolean|null;
		/**Lze pracovat s novym dokladem (muze se jednat pouze o zobrazeni jiz existujiciho)*/
		LzeSDoklademPracovat?: boolean|null;
	}
	const enum GUctDokladPodaniResponseDtoNames { DokladJizExistuje = "DokladJizExistuje", LzeSDoklademPracovat = "LzeSDoklademPracovat", PidDokladu = "PidDokladu",}
	const enum GUctDokladPodaniResponseDtoFragments { DokladJizExistuje = "*", LzeSDoklademPracovat = "*", PidDokladu = "*",}
	const enum GUctDokladPodaniResponseDtoTypes { DokladJizExistuje = "boolean", LzeSDoklademPracovat = "boolean", PidDokladu = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Predat\GUctDokladPredatRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO predat UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladPredatRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Duvod predani*/
		Duvod?: string|null;
		/**Funkce, ktere se přiděluje daný doklad*/
		IxsFun?: string|null;
		/**Spisovy uzel*/
		IxsSu?: string|null;
		/**Identifikátor referenta*/
		IxsRef?: string|null;
		/**Identifikátor kompetenta*/
		IxsFunVyriz?: string|null;
		/**Identifikátor realizatora*/
		CisReal?: string|null;
	}
	const enum GUctDokladPredatRequestDtoNames { Duvod = "Duvod", IxsFun = "IxsFun", IxsSu = "IxsSu", IxsRef = "IxsRef", IxsFunVyriz = "IxsFunVyriz", CisReal = "CisReal", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladPredatRequestDtoFragments { Duvod = "*", IxsFun = "*", IxsSu = "*", IxsRef = "*", IxsFunVyriz = "*", CisReal = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladPredatRequestDtoTypes { Duvod = "string", IxsFun = "string", IxsSu = "string", IxsRef = "string", IxsFunVyriz = "string", CisReal = "string", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladPredatRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Predat\GUctDokladPredattHromadneRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO hromadne predat UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladPredattHromadneRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestGroupDto {
		/**Duvod predani*/
		Duvod?: string|null;
		/**Funkce, ktere se přiděluje daný doklad*/
		IxsFun?: string|null;
		/**Spisovy uzel*/
		IxsSu?: string|null;
		/**Identifikátor referenta*/
		IxsRef?: string|null;
		/**Identifikátor kompetenta*/
		IxsFunVyriz?: string|null;
		/**Identifikátor realizatora*/
		CisReal?: string|null;
	}
	const enum GUctDokladPredattHromadneRequestDtoNames { Duvod = "Duvod", IxsFun = "IxsFun", IxsSu = "IxsSu", IxsRef = "IxsRef", IxsFunVyriz = "IxsFunVyriz", CisReal = "CisReal", Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladPredattHromadneRequestDtoFragments { Duvod = "*", IxsFun = "*", IxsSu = "*", IxsRef = "*", IxsFunVyriz = "*", CisReal = "*", Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladPredattHromadneRequestDtoTypes { Duvod = "string", IxsFun = "string", IxsSu = "string", IxsRef = "string", IxsFunVyriz = "string", CisReal = "string", Seznam = "Gordic.Uct.Interface.GUctVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladPredattHromadneRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Preevidovat\GUctDokladPreevidovatHromadneRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO hromadne preevidovat UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladPreevidovatHromadneRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestGroupDto {
		/**Nova kniha*/
		IxpDenNew?: string|null;
		/**Nova funkce*/
		IxsFunNew?: string|null;
		/**Referent*/
		IxsRefNew?: string|null;
		/**Referent*/
		Duvod?: string|null;
		/**Spisovy uzel*/
		IxsSu?: string|null;
		/**Identifikátor kompetenta*/
		IxsFunVyriz?: string|null;
		/**Identifikátor realizatora*/
		CisReal?: string|null;
	}
	const enum GUctDokladPreevidovatHromadneRequestDtoNames { IxpDenNew = "IxpDenNew", IxsFunNew = "IxsFunNew", IxsRefNew = "IxsRefNew", Duvod = "Duvod", IxsSu = "IxsSu", IxsFunVyriz = "IxsFunVyriz", CisReal = "CisReal", Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladPreevidovatHromadneRequestDtoFragments { IxpDenNew = "*", IxsFunNew = "*", IxsRefNew = "*", Duvod = "*", IxsSu = "*", IxsFunVyriz = "*", CisReal = "*", Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladPreevidovatHromadneRequestDtoTypes { IxpDenNew = "string", IxsFunNew = "string", IxsRefNew = "string", Duvod = "string", IxsSu = "string", IxsFunVyriz = "string", CisReal = "string", Seznam = "Gordic.Uct.Interface.GUctVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladPreevidovatHromadneRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Preevidovat\GUctDokladPreevidovatRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO  preevidovat UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladPreevidovatRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestGroupDto {
		/**Nova kniha*/
		IxpDenNew?: string|null;
		/**Nova funkce*/
		IxsFunNew?: string|null;
		/**Referent*/
		IxsRefNew?: string|null;
		/**Doklad pro preevidenci*/
		Doklad?: Gordic.Eko.Interface.GUctspidDto|null;
		/**Důvod akce (přeevidence)*/
		Duvod?: string|null;
		/**Identifikátor kompetenta*/
		IxsFunVyriz?: string|null;
		/**Identifikátor realizatora*/
		CisReal?: string|null;
	}
	const enum GUctDokladPreevidovatRequestDtoNames { IxpDenNew = "IxpDenNew", IxsFunNew = "IxsFunNew", IxsRefNew = "IxsRefNew", Doklad = "Doklad", Duvod = "Duvod", IxsFunVyriz = "IxsFunVyriz", CisReal = "CisReal", Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladPreevidovatRequestDtoFragments { IxpDenNew = "*", IxsFunNew = "*", IxsRefNew = "*", Doklad = "*", Duvod = "*", IxsFunVyriz = "*", CisReal = "*", Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladPreevidovatRequestDtoTypes { IxpDenNew = "string", IxsFunNew = "string", IxsRefNew = "string", Doklad = "Gordic.Eko.Interface.GUctspidDto", Duvod = "string", IxsFunVyriz = "string", CisReal = "string", Seznam = "Gordic.Uct.Interface.GUctVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladPreevidovatRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Prevzit\GUctDokladPrevzitHormadneRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO hromadne prevzit UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladPrevzitHromadneRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestGroupDto {
		/**Duvod prevzeti dokladu*/
		Duvod?: string|null;
		/**Funkce, ktere přebírá doklady*/
		IxsFun?: string|null;
		/**Spisovy uzel*/
		IxsSu?: string|null;
		/**Identifikátor kompetenta*/
		IxsFunVyriz?: string|null;
		/**Identifikátor realizatora*/
		CisReal?: string|null;
	}
	const enum GUctDokladPrevzitHromadneRequestDtoNames { Duvod = "Duvod", IxsFun = "IxsFun", IxsSu = "IxsSu", IxsFunVyriz = "IxsFunVyriz", CisReal = "CisReal", Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladPrevzitHromadneRequestDtoFragments { Duvod = "*", IxsFun = "*", IxsSu = "*", IxsFunVyriz = "*", CisReal = "*", Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladPrevzitHromadneRequestDtoTypes { Duvod = "string", IxsFun = "string", IxsSu = "string", IxsFunVyriz = "string", CisReal = "string", Seznam = "Gordic.Uct.Interface.GUctVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladPrevzitHromadneRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Prevzit\GUctDokladPrevzitRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO prevzit UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladPrevzitRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Duvod prevzetí*/
		Duvod?: string|null;
		/**Identifikátor kompetenta*/
		IxsFunVyriz?: string|null;
		/**Identifikátor realizatora*/
		CisReal?: string|null;
	}
	const enum GUctDokladPrevzitRequestDtoNames { Duvod = "Duvod", IxsFunVyriz = "IxsFunVyriz", CisReal = "CisReal", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladPrevzitRequestDtoFragments { Duvod = "*", IxsFunVyriz = "*", CisReal = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladPrevzitRequestDtoTypes { Duvod = "string", IxsFunVyriz = "string", CisReal = "string", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladPrevzitRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Prevzit\GUctDokladPrevzitResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO Prevzit UCT dokladu - vystup (response)*/
	interface GUctDokladPrevzitResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseBaseDto {
	}
	const enum GUctDokladPrevzitResponseDtoNames { PidDokladu = "PidDokladu", ResultMessage = "ResultMessage",}
	const enum GUctDokladPrevzitResponseDtoFragments { PidDokladu = "*", ResultMessage = "*",}
	const enum GUctDokladPrevzitResponseDtoTypes { PidDokladu = "string", ResultMessage = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Pridelit\GUctDokladPrevzitRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pridelit UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladPridelitRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Duvod prideleni*/
		Duvod?: string|null;
		/**Funkce, ktere se přiděluje daný doklad*/
		IxsFun?: string|null;
		/**Spisovy uzel*/
		IxsSu?: string|null;
	}
	const enum GUctDokladPridelitRequestDtoNames { Duvod = "Duvod", IxsFun = "IxsFun", IxsSu = "IxsSu", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladPridelitRequestDtoFragments { Duvod = "*", IxsFun = "*", IxsSu = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladPridelitRequestDtoTypes { Duvod = "string", IxsFun = "string", IxsSu = "string", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladPridelitRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Request\GUctBaseVybaneZapisyDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Predek DTO pro vybrane zapisy dokladu*/
	interface GUctBaseVybaneZapisyDto extends Gordic.Uct.Interface.GUctSkupinaZapisuDto {
        /**Pocet ovlivnenych radku*/
		PocetOvlivnenychRadku?: number|null;
        /**Novy stavu dokladu*/
		StavDokladuNovy?: Gordic.Eko.Interface.GEStavyDokladu|null;
        /**Novy aktualni datum zmeny*/
		DatumZmenyNove?: JsonDate|null;
        /**Novy stav dokladu textem*/
		StavDokladuTxtNovy?: string|null;
        /**Doslo ke zmene*/
		DosloKeZmene?: boolean|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Request\GUctDokladActionBaseRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Zakladni predek vstupniho pozadavku*/
	interface GUctDokladActionBaseRequestDto {
        /**Vybrana kniha*/
		ixpDen?: string|null;
        /**Vybrana kniha*/
		lastCode?: number|null;
	}
	const enum GUctDokladActionBaseRequestDtoNames { ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladActionBaseRequestDtoFragments { ixpDen = "*", lastCode = "*",}
	const enum GUctDokladActionBaseRequestDtoTypes { ixpDen = "string", lastCode = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Request\GUctDokladActionRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Predek vstupniho pozadavku*/
	interface GUctDokladActionRequestDto extends Gordic.Uct.Interface.GUctDokladActionBaseRequestDto {
        /**Id zpravy*/
		IdMessage?: string|null;
        /**Pid dokladu*/
		PidDokladu?: string|null;
        /**Datum posledni zmeny*/
		DatumPosledniZmenyDokladu?: JsonDate|null;
	}
	const enum GUctDokladActionRequestDtoNames { IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu",}
	const enum GUctDokladActionRequestDtoFragments { IdMessage = "Default", PidDokladu = "Default", DatumPosledniZmenyDokladu = "Default",}
	const enum GUctDokladActionRequestDtoTypes { IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Request\GUctDokladActionRequestGroupDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Predek vstupniho pozadavku hromadne akce*/
	interface GUctDokladActionRequestGroupDto extends Gordic.Uct.Interface.GUctSkupinaDokladuDto {
	}
	const enum GUctDokladActionRequestGroupDtoNames { Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladActionRequestGroupDtoFragments { Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladActionRequestGroupDtoTypes { Seznam = "Gordic.Uct.Interface.GUctVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladActionRequestGroupDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Request\GUctDokladAkceNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO  Predek nastaveni akci*/
	interface GUctDokladAkceNastaveniDto {
		/**Otazka opravdu vim co delam*/
		OtazkaVimCoDelam?: boolean|null;
	}
	const enum GUctDokladAkceNastaveniDtoNames { OtazkaVimCoDelam = "OtazkaVimCoDelam",}
	const enum GUctDokladAkceNastaveniDtoFragments { OtazkaVimCoDelam = "*",}
	const enum GUctDokladAkceNastaveniDtoTypes { OtazkaVimCoDelam = "boolean",}
	const enum GUctDokladAkceNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Request\GUctInOutParamsDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Prede DTO pro vstupni/vystupni parametry pro operace nad doklady*/
	interface GUctInOutParamsDto {
        /**ID dokladu*/
		PidDokladu?: string|null;
        /**Id zpravy*/
		IdMessage?: string|null;
        /**Predavaci informace*/
		TransferMessage?: Gordic.Eko.Interface.GTransferMessage|null;
        /**Datum posledni zmeny*/
		DatumPosledniZmenyDokladu?: JsonDate|null;
        /**Stav dokladu*/
		StavDokladu?: number|null;
        /**Stav dokladu textove*/
		StavDokladuTxt?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Request\GUctSkupinaDokladuDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro seznam vybranych dokladu ze seznamu*/
	interface GUctSkupinaDokladuDto extends Gordic.Uct.Interface.GUctDokladActionBaseRequestDto {
        /**Vybrane doklady*/
		Seznam?: Gordic.Uct.Interface.GUctVybranyDokladDto[]|null;
	}
	const enum GUctSkupinaDokladuDtoNames { Seznam = "Seznam", ixpDen = "ixpDen",}
	const enum GUctSkupinaDokladuDtoFragments { Seznam = "*", ixpDen = "*",}
	const enum GUctSkupinaDokladuDtoTypes { Seznam = "Gordic.Uct.Interface.GUctVybranyDokladDto[]", ixpDen = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Request\GUctSkupinaZapisuDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro seznam vybranych  zapisy dokladu*/
	interface GUctSkupinaZapisuDto extends Gordic.Uct.Interface.GUctInOutParamsDto {
        /**Vybrane zapisy*/
		Seznam?: Gordic.Uct.Interface.GUctVybraneZapisyDto[]|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Schvalit\GUctDokladSchvalitNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO SCHVALOVANI UCT dokladu - nastaveni SCHVALOVANI*/
	interface GUctDokladSchvalitNastaveniDto extends Gordic.Uct.Interface.GUctDokladAkceNastaveniDto {
		/**Nalezeny nesrovnalosti při účtování PAP.*/
		OtazkaKontrolaNaPapUcty?: boolean|null;
		/**Kontrola na vyrovnansot okruhu*/
		OtazkaKontrolaNaOkruhy?: boolean|null;
		/**V podkladech pro Kontrolní hlášení DPH je uveden externí subjekt, který nemá DIČ.*/
		OtazkaKHDPHEsuNemaDIC?: boolean|null;
		/**Účtujete do uzavřeného období.*/
		OtazkaUzavObdobi?: boolean|null;
		/**Datum uplatnění daně nedopovídá datumu zdanitelného plnění.Chcete pokračovat?*/
		OtazkaKHDPHDUDRuznyDZP?: boolean|null;
		/**Na účetním dokladu chybí zápis bankovního účtu.*/
		OtazkaBucZapis?: boolean|null;
		/**Nesouhlasí částka na hlavičce dokladu s nespárovanou platbou.*/
		OtazkaBucCastkaHlavicka?: boolean|null;
		/**Rozdílná částka na hlavičce a zápisech BÚ {0}*/
		OtazkaBucRozdilCastek?: boolean|null;
		/**Období účtování a DPH se liší.*/
		OtazkaDPHUctovani?: boolean|null;
		/**Na daňovém dokladu jste nezadali ZJ.*/
		OtazkaDPHNeniZJ?: boolean|null;
		/**Měsíc účtování se liší od zdaňovacího období.Jestliže se jedná o dodatečné daňové přiznání, zkontrolujte, zda jste použili správné ZJ a vyplnili UZ podle metodiky pro zpracování DPH.*/
		OtazkaDPHMesicUctovaniJiny?: boolean|null;
		/**Byly zjištěny chyby při kontrole daňových účtů na nedaňovém dokladu.*/
		OtazkaDPHDanoveUctyNedanovyDoklad?: boolean|null;
		/**Zadáním tohoto čísla vznikne nespojitost v subřadě. Nejnižší volné číslo pro tuto subřadu je {0}.*/
		OtazkaCisloNespojitost?: boolean|null;
		/**Chyba na rozvrh*/
		OtazkaRozvrh?: boolean|null;
		/**Nulove cstaky MD a Dal na radku*/
		OtazkaNuloveCastkyMDDal?: boolean|null;
		/**null - nebyla provedena kontrola
		*     1    - zachovat zapsane cislo
		*     2    - vzit nabidnute cislo
		*/
		OtazkaVysledkuKontrolyCislaDokladu?: number|null;
	}
	const enum GUctDokladSchvalitNastaveniDtoNames { OtazkaKontrolaNaPapUcty = "OtazkaKontrolaNaPapUcty", OtazkaKontrolaNaOkruhy = "OtazkaKontrolaNaOkruhy", OtazkaKHDPHEsuNemaDIC = "OtazkaKHDPHEsuNemaDIC", OtazkaUzavObdobi = "OtazkaUzavObdobi", OtazkaKHDPHDUDRuznyDZP = "OtazkaKHDPHDUDRuznyDZP", OtazkaBucZapis = "OtazkaBucZapis", OtazkaBucCastkaHlavicka = "OtazkaBucCastkaHlavicka", OtazkaBucRozdilCastek = "OtazkaBucRozdilCastek", OtazkaDPHUctovani = "OtazkaDPHUctovani", OtazkaDPHNeniZJ = "OtazkaDPHNeniZJ", OtazkaDPHMesicUctovaniJiny = "OtazkaDPHMesicUctovaniJiny", OtazkaDPHDanoveUctyNedanovyDoklad = "OtazkaDPHDanoveUctyNedanovyDoklad", OtazkaCisloNespojitost = "OtazkaCisloNespojitost", OtazkaRozvrh = "OtazkaRozvrh", OtazkaNuloveCastkyMDDal = "OtazkaNuloveCastkyMDDal", OtazkaVysledkuKontrolyCislaDokladu = "OtazkaVysledkuKontrolyCislaDokladu", OtazkaVimCoDelam = "OtazkaVimCoDelam",}
	const enum GUctDokladSchvalitNastaveniDtoFragments { OtazkaKontrolaNaPapUcty = "*", OtazkaKontrolaNaOkruhy = "*", OtazkaKHDPHEsuNemaDIC = "*", OtazkaUzavObdobi = "*", OtazkaKHDPHDUDRuznyDZP = "*", OtazkaBucZapis = "*", OtazkaBucCastkaHlavicka = "*", OtazkaBucRozdilCastek = "*", OtazkaDPHUctovani = "*", OtazkaDPHNeniZJ = "*", OtazkaDPHMesicUctovaniJiny = "*", OtazkaDPHDanoveUctyNedanovyDoklad = "*", OtazkaCisloNespojitost = "*", OtazkaRozvrh = "*", OtazkaNuloveCastkyMDDal = "*", OtazkaVysledkuKontrolyCislaDokladu = "*", OtazkaVimCoDelam = "*",}
	const enum GUctDokladSchvalitNastaveniDtoTypes { OtazkaKontrolaNaPapUcty = "boolean", OtazkaKontrolaNaOkruhy = "boolean", OtazkaKHDPHEsuNemaDIC = "boolean", OtazkaUzavObdobi = "boolean", OtazkaKHDPHDUDRuznyDZP = "boolean", OtazkaBucZapis = "boolean", OtazkaBucCastkaHlavicka = "boolean", OtazkaBucRozdilCastek = "boolean", OtazkaDPHUctovani = "boolean", OtazkaDPHNeniZJ = "boolean", OtazkaDPHMesicUctovaniJiny = "boolean", OtazkaDPHDanoveUctyNedanovyDoklad = "boolean", OtazkaCisloNespojitost = "boolean", OtazkaRozvrh = "boolean", OtazkaNuloveCastkyMDDal = "boolean", OtazkaVysledkuKontrolyCislaDokladu = "number", OtazkaVimCoDelam = "boolean",}
	const enum GUctDokladSchvalitNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Schvalit\GUctDokladSchvalitRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO schvaleni UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladSchvalitRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
        /**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladSchvalitNastaveniDto|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Schvalit\GUctDokladSchvalitResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO schvaleni UCT dokladu - vystup (odpoved)*/
	interface GUctDokladSchvalitResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseDto {
	}
	const enum GUctDokladSchvalitResponseDtoNames { ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladSchvalitResponseDtoFragments { ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctDokladSchvalitResponseDtoTypes { ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladSchvalitResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Stornovat\GUctDokladStornovatNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO stornovat UCT dokladu - nastaveni*/
	interface GUctDokladStornovatNastaveniDto extends Gordic.Uct.Interface.GUctDokladAkceNastaveniDto {
		/**Otazka zda pokracovat. Storno stornujiciho dokladu -> uzavreni dokladu (nevratna operace)*/
		OtazkaStornoStornujicihoDokladu?: boolean|null;
		/**Otazka zda chci stornovat zauctovany doklad a vytvorit stornujici doklad*/
		OtazkaStornoZauctDokladu?: boolean|null;
		/**Otazka zda chci stornovat zauctovany doklad i kdyz existuji opravne doklady*/
		OtazkaExistenceOpravneDoklady?: boolean|null;
	}
	const enum GUctDokladStornovatNastaveniDtoNames { OtazkaStornoStornujicihoDokladu = "OtazkaStornoStornujicihoDokladu", OtazkaStornoZauctDokladu = "OtazkaStornoZauctDokladu", OtazkaExistenceOpravneDoklady = "OtazkaExistenceOpravneDoklady", OtazkaVimCoDelam = "OtazkaVimCoDelam",}
	const enum GUctDokladStornovatNastaveniDtoFragments { OtazkaStornoStornujicihoDokladu = "*", OtazkaStornoZauctDokladu = "*", OtazkaExistenceOpravneDoklady = "*", OtazkaVimCoDelam = "*",}
	const enum GUctDokladStornovatNastaveniDtoTypes { OtazkaStornoStornujicihoDokladu = "boolean", OtazkaStornoZauctDokladu = "boolean", OtazkaExistenceOpravneDoklady = "boolean", OtazkaVimCoDelam = "boolean",}
	const enum GUctDokladStornovatNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Stornovat\GUctDokladStornovatRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO stornovat UCT dokladu - vstup (request)*/
	interface GUctDokladStornovatRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Textovy duvod storna*/
		DuvodStorna?: string|null;
		/**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladStornovatNastaveniDto|null;
	}
	const enum GUctDokladStornovatRequestDtoNames { DuvodStorna = "DuvodStorna", Nastaveni = "Nastaveni", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladStornovatRequestDtoFragments { DuvodStorna = "*", Nastaveni = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladStornovatRequestDtoTypes { DuvodStorna = "string", Nastaveni = "Gordic.Uct.Interface.GUctDokladStornovatNastaveniDto", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladStornovatRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Stornovat\GUctDokladStornovatResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO stornovat UCT dokladu - vystup (response)*/
	interface GUctDokladStornovatResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseDto {
		/**Pid stornujiciho dokladu*/
		PidStornujicihoDoladu?: string|null;
		/**Stornovaci zauctovany doklad*/
		ZauctovanyDoklad?: boolean|null;
	}
	const enum GUctDokladStornovatResponseDtoNames { PidStornujicihoDoladu = "PidStornujicihoDoladu", ZauctovanyDoklad = "ZauctovanyDoklad", ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladStornovatResponseDtoFragments { PidStornujicihoDoladu = "*", ZauctovanyDoklad = "*", ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctDokladStornovatResponseDtoTypes { PidStornujicihoDoladu = "string", ZauctovanyDoklad = "boolean", ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladStornovatResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Uzaverka\GUctUzaverkaAgendyRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO uzaverky agendy UCT - vstup (pozadavek)*/
	interface GUctUzaverkaAgendyRequestDto extends Gordic.Uct.Interface.GUctDokladActionBaseRequestDto {
	}
	const enum GUctUzaverkaAgendyRequestDtoNames {}
	const enum GUctUzaverkaAgendyRequestDtoFragments {}
	const enum GUctUzaverkaAgendyRequestDtoTypes {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Uzaverka\GUctUzaverkaAgendyResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO uzaverka agendy UCT - vystup (odpoved)*/
	interface GUctUzaverkaAgendyResponseDto {
	}
	const enum GUctUzaverkaAgendyResponseDtoNames {}
	const enum GUctUzaverkaAgendyResponseDtoFragments {}
	const enum GUctUzaverkaAgendyResponseDtoTypes {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Uzaverka\GUctUzaverkaKontrolaRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Vstupni parametry pro kontrolu dat pro akce pro uzavekach knih*/
	interface GUctUzaverkaKontrolaRequestDto {
		/**Typ uzaverky (otevereni, uzaveren)*/
		TypUzaverky?: Gordic.Uct.Interface.GEUCTTypyUzaverekKnih|null;
		/**Seznam vybranych knih*/
		seznamKnih?: Gordic.Eko.Interface.GEkoVybraneKnihyDto[]|null;
	}
	const enum GUctUzaverkaKontrolaRequestDtoNames { TypUzaverky = "TypUzaverky", seznamKnih = "seznamKnih",}
	const enum GUctUzaverkaKontrolaRequestDtoFragments { TypUzaverky = "*", seznamKnih = "*",}
	const enum GUctUzaverkaKontrolaRequestDtoTypes { TypUzaverky = "Gordic.Uct.Interface.GEUCTTypyUzaverekKnih", seznamKnih = "Gordic.Eko.Interface.GEkoVybraneKnihyDto[]",}
	const enum GUctUzaverkaKontrolaRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Uzaverka\GUctUzaverkaRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO uzaverky UCT - vstup (pozadavek)*/
	interface GUctUzaverkaRequestDto extends Gordic.Uct.Interface.GUctDokladActionBaseRequestDto {
		/**Typ uzaverky (otevereni, uzaveren, uzavreka agendy)*/
		TypUzaverky?: Gordic.Uct.Interface.GEUCTTypyUzaverek|null;
		/**Seznam vybranych knih*/
		seznamKnih?: Gordic.Eko.Interface.GEkoVybraneKnihyDto[]|null;
	}
	const enum GUctUzaverkaRequestDtoNames { TypUzaverky = "TypUzaverky", seznamKnih = "seznamKnih", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctUzaverkaRequestDtoFragments { TypUzaverky = "*", seznamKnih = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctUzaverkaRequestDtoTypes { TypUzaverky = "Gordic.Uct.Interface.GEUCTTypyUzaverek", seznamKnih = "Gordic.Eko.Interface.GEkoVybraneKnihyDto[]", ixpDen = "string", lastCode = "number",}
	const enum GUctUzaverkaRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Uzaverka\GUctUzaverkaResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO uzaverka UCT - vystup (odpoved)*/
	interface GUctUzaverkaResponseDto {
	}
	const enum GUctUzaverkaResponseDtoNames {}
	const enum GUctUzaverkaResponseDtoFragments {}
	const enum GUctUzaverkaResponseDtoTypes {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Uzavrit\GUctDokladUzavritNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO uzavrit UCT dokladu - nastaveni*/
	interface GUctDokladUzavritNastaveniDto extends Gordic.Uct.Interface.GUctDokladAkceNastaveniDto {
        /**Otazka zda pokracovat. Storno stornujiciho dokladu -> uzavreni dokladu (nevratna operace)*/
		OtazkaPokracovatPriChybeMetadat?: boolean|null;
	}
	const enum GUctDokladUzavritNastaveniDtoNames { OtazkaPokracovatPriChybeMetadat = "OtazkaPokracovatPriChybeMetadat",}
	const enum GUctDokladUzavritNastaveniDtoFragments { OtazkaPokracovatPriChybeMetadat = "*",}
	const enum GUctDokladUzavritNastaveniDtoTypes { OtazkaPokracovatPriChybeMetadat = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Uzavrit\GUctDokladUzavritRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO uzavreni UCT dokladu - vstup (request)*/
	interface GUctDokladUzavritRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Nastaveni  (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladUzavritNastaveniDto|null;
	}
	const enum GUctDokladUzavritRequestDtoNames { Nastaveni = "Nastaveni", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladUzavritRequestDtoFragments { Nastaveni = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladUzavritRequestDtoTypes { Nastaveni = "Gordic.Uct.Interface.GUctDokladUzavritNastaveniDto", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladUzavritRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Uzavrit\GUctDokladUzavritResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO uzavrit UCT dokladu - vystup (response)*/
	interface GUctDokladUzavritResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseDto {
	}
	const enum GUctDokladUzavritResponseDtoNames { ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladUzavritResponseDtoFragments { ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctDokladUzavritResponseDtoTypes { ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\VratitDoWFL\GUctDokladVratitDoWFLRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO vraceni  UCT dokladu do WFL - vstup (request)*/
	interface GUctDokladVratitDoWFLRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Textovy duvod vraceni do WFL*/
		Duvod?: string|null;
		/**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladAkceNastaveniDto|null;
	}
	const enum GUctDokladVratitDoWFLRequestDtoNames { Duvod = "Duvod", Nastaveni = "Nastaveni", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladVratitDoWFLRequestDtoFragments { Duvod = "*", Nastaveni = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladVratitDoWFLRequestDtoTypes { Duvod = "string", Nastaveni = "Gordic.Uct.Interface.GUctDokladAkceNastaveniDto", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladVratitDoWFLRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\VyrovnatRadekDokladu\GUctZapisVyrovnatRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO vyrovnani radku dokladu UCTu - vstup (request)*/
	interface GUctZapisVyrovnatRequestDto {
        /**Pid dokladu*/
		PidDokladu?: string|null;
        /**radek_z*/
		radek_z?: number|null;
        /**nakladove stredisko*/
		nks?: string|null;
        /**MD*/
		c0?: JsonDecimal|null;
        /**Dal*/
		c1?: JsonDecimal|null;
        /**Jmeno slouce na kterem se provadi vyrovnani*/
		ColumnName?: string|null;
	}
	const enum GUctZapisVyrovnatRequestDtoNames { PidDokladu = "PidDokladu", radek_z = "radek_z", nks = "nks", c0 = "c0", c1 = "c1", ColumnName = "ColumnName",}
	const enum GUctZapisVyrovnatRequestDtoFragments { PidDokladu = "*", radek_z = "*", nks = "*", c0 = "*", c1 = "*", ColumnName = "*",}
	const enum GUctZapisVyrovnatRequestDtoTypes { PidDokladu = "string", radek_z = "number", nks = "string", c0 = "JsonDecimal", c1 = "JsonDecimal", ColumnName = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\VyrovnatRadekDokladu\GUctZapisVyrovnatResponceDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO vyrovnat zapis dokladu UCT - vystup (request)*/
	interface GUctZapisVyrovnatResponceDto {
        /**vysledna castk apro vyrovnani*/
		c?: JsonDecimal|null;
	}
	const enum GUctZapisVyrovnatResponceDtoNames { c = "c",}
	const enum GUctZapisVyrovnatResponceDtoFragments { c = "*",}
	const enum GUctZapisVyrovnatResponceDtoTypes { c = "JsonDecimal",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Zapis\GUctZapisActionRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Predek vstupniho pozadavku pro zapisy*/
	interface GUctZapisActionRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Zapis dokladu*/
		Zapis?: Gordic.Uct.Interface.GUctVybranyZapisDto|null;
	}
	const enum GUctZapisActionRequestDtoNames { Zapis = "Zapis", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctZapisActionRequestDtoFragments { Zapis = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctZapisActionRequestDtoTypes { Zapis = "Gordic.Uct.Interface.GUctVybranyZapisDto", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctZapisActionRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Zapis\GUctZapisActionResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Predek DTO pro predani vysledku akce pro zapisy*/
	interface GUctZapisActionResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseDto {
		/**Pocet ovlivnenych radku*/
		PocetOvlivnenychRadku?: number|null;
	}
	const enum GUctZapisActionResponseDtoNames { PocetOvlivnenychRadku = "PocetOvlivnenychRadku", ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctZapisActionResponseDtoFragments { PocetOvlivnenychRadku = "*", ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctZapisActionResponseDtoTypes { PocetOvlivnenychRadku = "number", ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctZapisActionResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\ZapisOductovat\GUctDokladZapisOductovatRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro oductovani zapisu dokladu - vstup*/
	interface GUctDokladZapisOductovatRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
		/**Vybrane účetní zápisy*/
		Seznam?: Gordic.Eko.Interface.GZapisyDto[]|null;
	}
	const enum GUctDokladZapisOductovatRequestDtoNames { Seznam = "Seznam", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladZapisOductovatRequestDtoFragments { Seznam = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladZapisOductovatRequestDtoTypes { Seznam = "Gordic.Eko.Interface.GZapisyDto[]", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladZapisOductovatRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\ZapisUloz\GUctDokladZapisUlozRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro ulozeni zapisu dokladu - vstup*/
	interface GUctDokladZapisUlozRequestDto extends Gordic.Uct.Interface.GUctZapisActionRequestDto {
		/**Kontrolovat nulove hodnoty MD a Dal*/
		KontrolaNulovychHodnot?: boolean|null;
		KontrolaNaRozvrh?: boolean|null;
	}
	const enum GUctDokladZapisUlozRequestDtoNames { KontrolaNulovychHodnot = "KontrolaNulovychHodnot", KontrolaNaRozvrh = "KontrolaNaRozvrh", Zapis = "Zapis", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladZapisUlozRequestDtoFragments { KontrolaNulovychHodnot = "*", KontrolaNaRozvrh = "*", Zapis = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladZapisUlozRequestDtoTypes { KontrolaNulovychHodnot = "boolean", KontrolaNaRozvrh = "boolean", Zapis = "Gordic.Uct.Interface.GUctVybranyZapisDto", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladZapisUlozRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\ZapisUloz\GUctDokladZapisVymazatResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro ulozeni zapisu dokladu odpoved*/
	interface GUctDokladZapisUlozResponseDto extends Gordic.Uct.Interface.GUctZapisActionResponseDto {
        /**Uklozeny zapis*/
		Zapis?: Gordic.Uct.Interface.GUctdpepDto|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\ZapisVymazat\GUctDokladZapisVymazatNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO ZAUCTOVANI UCT dokladu - nastaveni Vymazani zapisu*/
	interface GUctDokladZapisVymazatNastaveniDto extends Gordic.Uct.Interface.GUctDokladAkceNastaveniDto {
        /**Některé požadované řádky nebudou vymazány:{0}*/
		OtazkaNeVsechnyRadkyVymazany?: boolean|null;
        /**Bude odstraněn řádek s číslem {0}. Opravdu chcete pokračovat?*/
		OtazkaOpravduOdstranit?: boolean|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\ZapisVymazat\GUctDokladZapisVymazatRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro vymazani zapisu dokladu - vstup*/
	interface GUctDokladZapisVymazatRequestDto extends Gordic.Uct.Interface.GUctZapisActionRequestDto {
        /**Vybrane radky*/
		Seznam?: Gordic.Uct.Interface.GUctRadekZDto[]|null;
        /**Nastaveni vymazani*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladZapisVymazatNastaveniDto|null;
	}
	const enum GUctDokladZapisVymazatRequestDtoNames { Seznam = "Seznam", Nastaveni = "Nastaveni", Zapis = "Zapis", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen",}
	const enum GUctDokladZapisVymazatRequestDtoFragments { Seznam = "*", Nastaveni = "*", Zapis = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*",}
	const enum GUctDokladZapisVymazatRequestDtoTypes { Seznam = "Gordic.Uct.Interface.GUctRadekZDto[]", Nastaveni = "Gordic.Uct.Interface.GUctDokladZapisVymazatNastaveniDto", Zapis = "Gordic.Uct.Interface.GUctdpepDto", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\ZapisVymazat\GUctDokladZapisVymazatResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO pro vymazani zapisu dokladu odpovede*/
	interface GUctDokladZapisVymazatResponseDto extends Gordic.Uct.Interface.GUctZapisActionResponseDto {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Zauctovat\GUctDokladSchvalitNastaveniDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO ZAUCTOVANI UCT dokladu - nastaveni ZAUCTOVANI*/
	interface GUctDokladZauctovatNastaveniDto extends Gordic.Uct.Interface.GUctDokladAkceNastaveniDto {
		/**Datum není platné kalendářní datum.Nebude možno nastavit stav zaúčtování primárního dokladu. Chcete pokračovat ?*/
		OtazkaKalendarniDatum?: boolean|null;
		/**Datum účetního případu neodpovídá aktuálnímu datu. Chcete skutečně pokračovat ?*/
		OtazkaDatumUcetnihoPripadu?: boolean|null;
		/**Doklad provádí nenulový obrat na SU/AU bankovního účtu (spg_uctbuvlchck)*/
		OtazkaNenulovyObratNaBU?: boolean|null;
		/**Doklad provádí nulový obrat na SU/AU limitu zvoleného bankovního účtu(spg_uctbuvlchck)*/
		OtazkaNenulovyObratNaLimBU?: boolean|null;
		/**Kontrola na prekroceni limitu*/
		OtazkaKontPrekLim?: boolean|null;
		/**Zobrazeni formulare uzivateli pro nastaveni stavu zauctovani na prim dokladu po zauctovani.*/
		OtazkaVyberuStavuZaucPrimDokladu?: boolean|null;
		/**Zobrazeni furmulare uzivateli pro nastaveni stavu uhrady na prim dokladu po zauctovani.*/
		OtazkaVyberuStavuUhradyPrimDokladu?: boolean|null;
		/**Kontrola na danove ucty na nedanovem dokladu*/
		OtazkaKontDanUcetNaNedDokl?: boolean|null;
		/**Doklad dosud neprošel účetní kontrolou.Opravdu si přejete pokračovat bez FIK ?*/
		OtazkaUKUcetniKontrola?: boolean|null;
		/**Doklad dosud neprošel ucetni kontrolou.Opravdu si přejete pokračovat bez FIK ?*/
		OtazkaFIKFinancniKontrola?: boolean|null;
		/**Účtujete do uzavřeného období.*/
		OtazkaUzavObdobi?: boolean|null;
		/**Období účtování a DPH se liší.*/
		OtazkaDPHUctovani?: boolean|null;
		/**Na daňovém dokladu jste nezadali ZJ.*/
		OtazkaDPHNeniZJ?: boolean|null;
		/**Měsíc účtování se liší od zdaňovacího období.Jestliže se jedná o dodatečné daňové přiznání, zkontrolujte, zda jste použili správné ZJ a vyplnili UZ podle metodiky pro zpracování DPH.*/
		OtazkaDPHMesicUctovaniJiny?: boolean|null;
		/**Byly zjištěny chyby při kontrole daňových účtů na nedaňovém dokladu.*/
		OtazkaDPHDanoveUctyNedanovyDoklad?: boolean|null;
		/**Chyba na rozvrh*/
		OtazkaRozvrh?: boolean|null;
		/**Stav uhrady prim. dokladu, ktery se nastavi po zauctovani dokladu za urcitych podminek*/
		StavUhradyPrimDokladu?: number|null;
		/**Stav zauctovani prim. dokladu, ktery se nastavi po zauctovani dokladu za urcitych podminek*/
		StavZauctovaniPrimDokladu?: number|null;
	}
	const enum GUctDokladZauctovatNastaveniDtoNames { OtazkaKalendarniDatum = "OtazkaKalendarniDatum", OtazkaDatumUcetnihoPripadu = "OtazkaDatumUcetnihoPripadu", OtazkaNenulovyObratNaBU = "OtazkaNenulovyObratNaBU", OtazkaNenulovyObratNaLimBU = "OtazkaNenulovyObratNaLimBU", OtazkaKontPrekLim = "OtazkaKontPrekLim", OtazkaVyberuStavuZaucPrimDokladu = "OtazkaVyberuStavuZaucPrimDokladu", OtazkaVyberuStavuUhradyPrimDokladu = "OtazkaVyberuStavuUhradyPrimDokladu", OtazkaKontDanUcetNaNedDokl = "OtazkaKontDanUcetNaNedDokl", OtazkaUKUcetniKontrola = "OtazkaUKUcetniKontrola", OtazkaFIKFinancniKontrola = "OtazkaFIKFinancniKontrola", OtazkaUzavObdobi = "OtazkaUzavObdobi", OtazkaDPHUctovani = "OtazkaDPHUctovani", OtazkaDPHNeniZJ = "OtazkaDPHNeniZJ", OtazkaDPHMesicUctovaniJiny = "OtazkaDPHMesicUctovaniJiny", OtazkaDPHDanoveUctyNedanovyDoklad = "OtazkaDPHDanoveUctyNedanovyDoklad", OtazkaRozvrh = "OtazkaRozvrh", StavUhradyPrimDokladu = "StavUhradyPrimDokladu", StavZauctovaniPrimDokladu = "StavZauctovaniPrimDokladu", OtazkaVimCoDelam = "OtazkaVimCoDelam",}
	const enum GUctDokladZauctovatNastaveniDtoFragments { OtazkaKalendarniDatum = "*", OtazkaDatumUcetnihoPripadu = "*", OtazkaNenulovyObratNaBU = "*", OtazkaNenulovyObratNaLimBU = "*", OtazkaKontPrekLim = "*", OtazkaVyberuStavuZaucPrimDokladu = "*", OtazkaVyberuStavuUhradyPrimDokladu = "*", OtazkaKontDanUcetNaNedDokl = "*", OtazkaUKUcetniKontrola = "*", OtazkaFIKFinancniKontrola = "*", OtazkaUzavObdobi = "*", OtazkaDPHUctovani = "*", OtazkaDPHNeniZJ = "*", OtazkaDPHMesicUctovaniJiny = "*", OtazkaDPHDanoveUctyNedanovyDoklad = "*", OtazkaRozvrh = "*", StavUhradyPrimDokladu = "*", StavZauctovaniPrimDokladu = "*", OtazkaVimCoDelam = "*",}
	const enum GUctDokladZauctovatNastaveniDtoTypes { OtazkaKalendarniDatum = "boolean", OtazkaDatumUcetnihoPripadu = "boolean", OtazkaNenulovyObratNaBU = "boolean", OtazkaNenulovyObratNaLimBU = "boolean", OtazkaKontPrekLim = "boolean", OtazkaVyberuStavuZaucPrimDokladu = "boolean", OtazkaVyberuStavuUhradyPrimDokladu = "boolean", OtazkaKontDanUcetNaNedDokl = "boolean", OtazkaUKUcetniKontrola = "boolean", OtazkaFIKFinancniKontrola = "boolean", OtazkaUzavObdobi = "boolean", OtazkaDPHUctovani = "boolean", OtazkaDPHNeniZJ = "boolean", OtazkaDPHMesicUctovaniJiny = "boolean", OtazkaDPHDanoveUctyNedanovyDoklad = "boolean", OtazkaRozvrh = "boolean", StavUhradyPrimDokladu = "number", StavZauctovaniPrimDokladu = "number", OtazkaVimCoDelam = "boolean",}
	const enum GUctDokladZauctovatNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Zauctovat\GUctDokladZauctovatHromadneRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO hromadne zauctovani UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladZauctovatHromadneRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestGroupDto {
		/**Ukoncit cele zpracovani v pripade chyby*/
		UkoncitVPripadeChyby?: boolean|null;
		/**Stav uhrady prim. dokladu, ktery se nastavi po zauctovani dokladu za urcitych podminek*/
		StavUhradyPrimDokladu?: number|null;
		/**Stav zauctovani prim. dokladu, ktery se nastavi po zauctovani dokladu za urcitych podminek*/
		StavZauctovaniPrimDokladu?: number|null;
		/**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladZauctovatNastaveniDto|null;
	}
	const enum GUctDokladZauctovatHromadneRequestDtoNames { UkoncitVPripadeChyby = "UkoncitVPripadeChyby", StavUhradyPrimDokladu = "StavUhradyPrimDokladu", StavZauctovaniPrimDokladu = "StavZauctovaniPrimDokladu", Nastaveni = "Nastaveni", Seznam = "Seznam", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladZauctovatHromadneRequestDtoFragments { UkoncitVPripadeChyby = "*", StavUhradyPrimDokladu = "*", StavZauctovaniPrimDokladu = "*", Nastaveni = "*", Seznam = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladZauctovatHromadneRequestDtoTypes { UkoncitVPripadeChyby = "boolean", StavUhradyPrimDokladu = "number", StavZauctovaniPrimDokladu = "number", Nastaveni = "Gordic.Uct.Interface.GUctDokladZauctovatNastaveniDto", Seznam = "Gordic.Uct.Interface.GUctVybranyDokladDto[]", ixpDen = "string", lastCode = "number",}
	const enum GUctDokladZauctovatHromadneRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Zauctovat\GUctDokladZauctovatRequestDto.d.ts 

declare namespace Gordic.Uct.Interface {
    /**DTO zauctovani UCT dokladu - vstup (pozadavek)*/
	interface GUctDokladZauctovatRequestDto extends Gordic.Uct.Interface.GUctDokladActionRequestDto {
        /**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Uct.Interface.GUctDokladZauctovatNastaveniDto|null;
	}
	const enum GUctDokladZauctovatRequestDtoNames { Nastaveni = "Nastaveni", IdMessage = "IdMessage", PidDokladu = "PidDokladu", DatumPosledniZmenyDokladu = "DatumPosledniZmenyDokladu", ixpDen = "ixpDen", lastCode = "lastCode",}
	const enum GUctDokladZauctovatRequestDtoFragments { Nastaveni = "*", IdMessage = "*", PidDokladu = "*", DatumPosledniZmenyDokladu = "*", ixpDen = "*", lastCode = "*",}
	const enum GUctDokladZauctovatRequestDtoTypes { Nastaveni = "Gordic.Uct.Interface.GUctDokladZauctovatNastaveniDto", IdMessage = "string", PidDokladu = "string", DatumPosledniZmenyDokladu = "JsonDate", ixpDen = "string", lastCode = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Dto\Zauctovat\GUctDokladZauctovatResponseDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO zauctovani UCT dokladu - vystup (odpoved)*/
	interface GUctDokladZauctovatResponseDto extends Gordic.Uct.Interface.GUctDokladActionResponseDto {
	}
	const enum GUctDokladZauctovatResponseDtoNames { ResultMessage = "ResultMessage", DatumZmeny = "DatumZmeny", StavTxt = "StavTxt", StavDokladu = "StavDokladu", s_zau = "s_zau", eko_akt = "eko_akt", StateChanged = "StateChanged", Hlavicka = "Hlavicka", Zapisy = "Zapisy", DokladPermissions = "DokladPermissions",}
	const enum GUctDokladZauctovatResponseDtoFragments { ResultMessage = "*", DatumZmeny = "*", StavTxt = "*", StavDokladu = "*", s_zau = "*", eko_akt = "*", StateChanged = "*", Hlavicka = "*", Zapisy = "*", DokladPermissions = "*",}
	const enum GUctDokladZauctovatResponseDtoTypes { ResultMessage = "string", DatumZmeny = "JsonDate", StavTxt = "string", StavDokladu = "Gordic.Eko.Interface.GEStavyDokladu", s_zau = "number", eko_akt = "number", StateChanged = "boolean", Hlavicka = "Gordic.Eko.Interface.GUctspidDto", Zapisy = "Gordic.Uct.Interface.GUctdpepDto[]", DokladPermissions = "Gordic.Uct.Interface.GUctDokladPermissions",}
	const enum GUctDokladZauctovatResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Enum\GEUctFiltrSeznamPevne.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Pevne filtry na seznamu dokladu*/
	const enum GEUctFiltrSeznamPevne {
		/**Doklady k zauctovani*/
		KZauctovani=0,
		/**Doklady ke schvaleni*/
		KeSchvaleni=1,
		/**Stornovane doklady*/
		Stornovane=2,
		/**Uzavrene*/
		Uzavrene=3,
		/**Prouctovane*/
		Prouctovane,
		/**Neevidovane*/
		Neevidovane,
		/**Vsechny doklady*/
		Vsechny=20,
		/**Filtr nezadan*/
		Nezadan=100,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Enum\GEUctHromadneOperace.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Hromadne operace*/
	const enum GEUctHromadneOperace {
		/**Prevzeti*/
		Prevzeti,
		/**Preevidence*/
		Preevidence,
		/**Prouctovani*/
		Prouctovani,
		/**Uzavreni*/
		Uzavreni,
		/**Schvaleni*/
		Schvaleni,
		/**Stornovani*/
		Stornovani,
		/**Prideleni*/
		Prideleni,
		/**Predani*/
		Predani,
		/**Hromadna kontrola metadat*/
		KontrolaMetadat,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Enum\GEUctTypKurzovychRozdilu.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Typy kurzovych rozdilu*/
	const enum GETypKurzovychRozdilu {
        /**Zadny kurzovy rozdil*/
		Zadny=0,
        /**Kurzovy zisk*/
		Zisk=1,
        /**Oprava kurzoveho zisku*/
		OpravaZisku=2,
        /**Kurzova ztrata*/
		KurzovaZtrataPriRealizaciVydaje=3,
        /**Oprava kurzove ztraty*/
		OpravaKurzoveZtratyPriRealizaciVydaje=4,
        /**Jiny vydaj*/
		JinyVydaj=5,
        /**Kurzové ztráty při realizaci příjmu*/
		KurzovaZtrataPriRealizaciPrijmu=6,
        /**Oprava kurzové ztráty při realizaci příjmu*/
		OpravaKurzoveZtratyPriRealizaciPrijmu=7,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Enum\GEUctTypPolicek.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Typ policek*/
	const enum GEUctTypPolicek {
        /**zaskrtavatko*/
		Check,
        /**vyberovy seznam*/
		List,
        /**Prepinac - zatim se nevyuziva*/
		Radio,
        /**nezadano*/
		Empty,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Enum\GEUctTypZpracovani.d.ts 

declare namespace Gordic.Uct.Interface {
    /**Typ zpracovani procedury*/
	const enum GEUctTypZpracovani {
        /**Standardni zpracovani*/
		Standardni=0,
        /**Bez kontrol*/
		BezKontrol=1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\ISL\IGUctDoklad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s objektem UctDoklad
	* @domain Ucetnictvi
	* @businessObject Doklad UCT
	*/
	interface UctDoklad {
		/**Novy doklad*/
		newDoklad(rq?:CallParams<{}>): _Task<{},void>;
		/**Načíst účetního dokladu se všemi vazbami*/
		read(rq?:Gordic.Uct.Interface.GUctDokladReadRequestDto|CallParams<GServiceReadRequest<Gordic.Uct.Interface.GUctDokladReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Uct.Interface.GUctDokladReadRequestDto>,GServiceReadResponse<Gordic.Uct.Interface.GUctDokladDto>>;
		/**Inicializace nového dokladu s defaultními hodnotami*/
		readDefaults(rq?:Gordic.Uct.Interface.GUctDokladDto|CallParams<GServiceReadRequest<Gordic.Uct.Interface.GUctDokladDto>>): _Task<GServiceReadRequest<Gordic.Uct.Interface.GUctDokladDto>,GServiceReadResponse<Gordic.Uct.Interface.GUctDokladDto>>;
		/**Nacteni ucetniho dokladu - zjednoduseny*/
		readSimpleDoklad(rq?:Gordic.Uct.Interface.GUctDokladActionRequestDto|CallParams<GServiceReadRequest<Gordic.Uct.Interface.GUctDokladActionRequestDto>>): _Task<GServiceReadRequest<Gordic.Uct.Interface.GUctDokladActionRequestDto>,GServiceReadResponse<Gordic.Uct.Interface.GUctDokladActionResponseDto>>;
		/**Načíst seznam účetních dokladů*/
		list(rq?:Gordic.Uct.Interface.GUctFiltrDokladu|CallParams<GServiceListRequestWithOrder<Gordic.Uct.Interface.GEFilterDokladu>>): _Task<GServiceListRequestWithOrder<Gordic.Uct.Interface.GEFilterDokladu>,GServiceListResponseWithMeta<Gordic.Uct.Interface.GUctSeznamDokladuDto, Gordic.Uct.Interface.GUctDokladPermissionsSeznam>>;
		/**Nacist knihu z dokladu*/
		getKnihaZDokladu(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
		/**Dohledani dokladu dle zadaneho filtru*/
		findDocuments(rq?:CallParams<{ixp:string,ac:string,ac_ag:string}>): _Task<{ixp:string,ac:string,ac_ag:string},Gordic.Eko.Interface.GWflspidSimpleDto[]>;
		/**Podani dokladu*/
		create(rq?:Gordic.Uct.Interface.GUctDokladPodaniRequestDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladPodaniRequestDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladPodaniRequestDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUctDokladPodaniResponseDto>>;
		/**Aktualizace hlavicky dokladu (evidence)*/
		update(rq?:Gordic.Uct.Interface.GUctDokladEvidenceRequestDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladEvidenceRequestDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladEvidenceRequestDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUctDokladEvidenceResponseDto>>;
		/**Ulozeni hlavicky dokladu, wfl dokuemntu a vlastnosti*/
		saveDocument(rq?:Gordic.Uct.Interface.GUctDokladEvidenceRequestDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladEvidenceRequestDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladEvidenceRequestDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUctDokladEvidenceResponseDto>>;
		/**Ulozeni hlavicky dokladu, wfl dokuemntu a vlastnosti - nova verze s pouzitim nove procedury*/
		saveDoklad(rq?:Gordic.Uct.Interface.GUctDokladEvidenceRequestDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladEvidenceRequestDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladEvidenceRequestDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUctDokladEvidenceResponseDto>>;
		/**Schválit účetní doklad*/
		schvalit(rq?:Gordic.Uct.Interface.GUctDokladSchvalitRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladSchvalitRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladSchvalitRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladSchvalitResponseDto>>;
		/**Odschválit doklad*/
		odSchvalit(rq?:Gordic.Uct.Interface.GUctDokladOdschvalitRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladOdschvalitRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladOdschvalitRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladOdschvalitResponseDto>>;
		/**Zaúčtovat doklad do učetního deníku*/
		zauctovat(rq?:Gordic.Uct.Interface.GUctDokladZauctovatRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladZauctovatRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladZauctovatRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladZauctovatResponseDto>>;
		/**Stornovat doklad*/
		stornovat(rq?:Gordic.Uct.Interface.GUctDokladStornovatRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladStornovatRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladStornovatRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladStornovatResponseDto>>;
		/**Zrušení stavu storna účetního dokladu 
		*     (Zrušit storno doklad lze pouze u nezaúčtovaného dokladu)
		*/
		odStornovat(rq?:Gordic.Uct.Interface.GUctDokladOdStornovatRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladOdStornovatRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladOdStornovatRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladOdStornovatResponseDto>>;
		/**Převzít doklad od jiného uživatele (funkci)*/
		prevzitDoklad(rq?:Gordic.Uct.Interface.GUctDokladPrevzitRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladPrevzitRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladPrevzitRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladPrevzitResponseDto>>;
		/**Předat doklad jinému úživateli (funkci)*/
		predat(rq?:Gordic.Uct.Interface.GUctDokladPredatRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladPredatRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladPredatRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladActionResponseDto>>;
		/**Kontrola dokladů na možnost předání jinému uživateli (funkci)*/
		validovatProPredat(rq?:Gordic.Uct.Interface.GUctDokladPredattHromadneRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Hromadně předat doklady jinému uživateli (funkci)*/
		hromadnePredat(rq?:Gordic.Uct.Interface.GUctHromadnyRequestDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Přidělit doklad*/
		pridelit(rq?:Gordic.Uct.Interface.GUctDokladPridelitRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladPridelitRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladPridelitRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladActionResponseDto>>;
		/**Hromadně přidšlit*/
		hromadnePridelit(rq?:Gordic.Uct.Interface.GUctHromadnyRequestDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Kontrola dokladů na možnost přidělení*/
		validovatProPridelit(rq?:Gordic.Uct.Interface.GUctDokladPrevzitHromadneRequestDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctDokladPrevzitHromadneRequestDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctDokladPrevzitHromadneRequestDto>,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Uzavřít doklad*/
		uzavrit(rq?:Gordic.Uct.Interface.GUctDokladUzavritRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladUzavritRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladUzavritRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladActionResponseDto>>;
		/**Vytvořit kopie dokladu*/
		kopieDokladu(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladKopieRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladKopieRequestDto},GServiceActionResponse<Gordic.Uct.Interface.GUctDokladActionResponseBaseDto>>;
		/**Hromadne akce*/
		hromadneOperace(rq?:Gordic.Uct.Interface.GUctHromadnyRequestDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Kontrola dokladů na možnost provedení dané operace*/
		hromadneOperaceValidace(rq?:Gordic.Uct.Interface.GUctHromadnyRequestDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Hromadně uzavřít doklady*/
		hromadneUzavrit(rq?:Gordic.Uct.Interface.GUctSkupinaDokladuDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctSkupinaDokladuDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctSkupinaDokladuDto>,Gordic.Uct.Interface.GUctVybranyDokladDto[]>;
		/**Hromadna operace: Nastavi priznak vstupnim dokladum ne/prectene*/
		hromadneOznacit(rq?:Gordic.Uct.Interface.GUctOznacitDokladyDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctOznacitDokladyDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctOznacitDokladyDto>,Gordic.Uct.Interface.GUctVybranyDokladDto[]>;
		/**Hromadně zaúčtovat doklady*/
		hromadneZauctovat(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZauctovatHromadneRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZauctovatHromadneRequestDto},Gordic.Uct.Interface.GUctVybranyDokladDto[]>;
		/**Hromadně převzít doklady*/
		hromadnePrevzit(rq?:Gordic.Uct.Interface.GUctDokladPrevzitHromadneRequestDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctDokladPrevzitHromadneRequestDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctDokladPrevzitHromadneRequestDto>,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Hromadně přeevidovat doklady*/
		hromadnePreevidovat(rq?:Gordic.Uct.Interface.GUctHromadnyRequestDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyRequestDto>,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Preevidovat doklad*/
		preevidovat(rq?:Gordic.Uct.Interface.GUctDokladPreevidovatRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladPreevidovatRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladPreevidovatRequestDto>,void>;
		/**Kontrola seznamu dokladů pro možnost uzavření*/
		validovatProUzavreni(rq?:Gordic.Uct.Interface.GUctDokladActionRequestGroupDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Kontrola seznamu dokladů pro možnost zaúčtování*/
		validovatProZauctovani(rq?:Gordic.Uct.Interface.GUctDokladZauctovatHromadneRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Kontrola seznamu dokladů pro možnost převzetí*/
		validovatProPrevzeti(rq?:Gordic.Uct.Interface.GUctDokladPrevzitHromadneRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Kontrola seznamu dokladů pro možnost provedení přeevidenci*/
		validovatProPreevidenci(rq?:Gordic.Uct.Interface.GUctDokladPreevidovatHromadneRequestDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctVybranyDokladDto>>;
		/**Kontrola seznamu dokladů pro možnost hromadné účetní kontroly*/
		validovatProUCK(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladFIKUCKHromadneRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladFIKUCKHromadneRequestDto},Gordic.Uct.Interface.GUctDokladyRequestDto[]>;
		/**Kontrola seznamu dokladů pro možnost provedení hromadné finanční kontroly*/
		validovatProFIK(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladFIKUCKHromadneRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladFIKUCKHromadneRequestDto},Gordic.Uct.Interface.GUctDokladyRequestDto[]>;
		/**Kontrola čísla dokladu*/
		kontrolaCislaDokladu(rq?:CallParams<{idMessage:string,dataHlavickyDokladu:Gordic.Eko.Interface.GUctspidDto}>): _Task<{idMessage:string,dataHlavickyDokladu:Gordic.Eko.Interface.GUctspidDto},void>;
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
		/**Lze zobrazit uctenku*/
		lzeZobrazitUctenku(rq?:CallParams<{pidDokladu:string,kategorie:number}>): _Task<{pidDokladu:string,kategorie:number},boolean>;
		/**Id uctenky*/
		getIdUctenky(rq?:CallParams<{pidDokladu:string}>): _Task<{pidDokladu:string},string>;
		/**Vrceni dokladu do WFL*/
		vratitDoWFL(rq?:Gordic.Uct.Interface.GUctDokladVratitDoWFLRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladVratitDoWFLRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctDokladVratitDoWFLRequestDto>,GServiceActionResponse<Gordic.Uct.Interface.GUctDokladActionResponseBaseDto>>;
		/**Automaticke doplneni a kontrala metadat dokladu*/
		doplneniKontrolaMetadat(rq?:CallParams<{pidDokladu:string}>): _Task<{pidDokladu:string},void>;
		/**Hromadna kontrola metadat*/
		hromadneDoplneniKontrolaMetadat(rq?:Gordic.Uct.Interface.GUctSkupinaDokladuDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctSkupinaDokladuDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctSkupinaDokladuDto>,Gordic.Uct.Interface.GUctVybranyDokladDto[]>;
		/**Stav dokladu pro urceni pristupnosti akci*/
		readStavDokladu(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladReadStavRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladReadStavRequestDto},GServiceReadResponse<Gordic.Uct.Interface.GUctDokladDto>>;
		/**Pocty dokladu dle filtru a knihy (pouziti v DashBoardu)*/
		listCount(rq?:CallParams<{idKnihy:string,filtry:Gordic.Uct.Interface.GEUctFiltrSeznamPevne[]}>): _Task<{idKnihy:string,filtry:Gordic.Uct.Interface.GEUctFiltrSeznamPevne[]},any>;
		/**Pocty dokladu dle filtru (pouziti v DashBoardu)*/
		poctyDokladuVKnihach(rq?:CallParams<{SeznamKnih:string[],filtry:Gordic.Uct.Interface.GEUctFiltrSeznamPevne[]}>): _Task<{SeznamKnih:string[],filtry:Gordic.Uct.Interface.GEUctFiltrSeznamPevne[]},GServiceListResponse<Gordic.Uct.Interface.GUctPocetDokladuDto>>;
		/**Počet dokladu dle filtru*/
		count(rq?:Gordic.Uct.Interface.GUctFiltrDokladu|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Nacteni defaultniho gridu (nebude v ESL)*/
		getDefaultDrd(rq?:CallParams<{head:Gordic.Eko.Interface.GUctspidDto}>): _Task<{head:Gordic.Eko.Interface.GUctspidDto},number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UctDoklad: ServiceBase & Catalog.UctDoklad;
	}
	const UctDoklad: Client["UctDoklad"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\ISL\IGUctDokladAgenda.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Prace agendou UCT
	* @domain Ucetnictvi
	* @businessObject UctAgenda
	*/
	interface UctAgenda {
		/**Nacteni inforaci o agende*/
		read(rq?:CallParams<{}>): _Task<{},GServiceReadRequest<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Uzavreni agendy*/
		uzavritAgendu(rq?:CallParams<{}>): _Task<{},void>;
		/**Zjisteni povoleni uzavrit agendu*/
		povoleniUzavreniAgendy(rq?:CallParams<{}>): _Task<{},Gordic.General.ApplicationInterface.GPermission>;
		/**Zjisteni povoleni akci na agende*/
		povoleniAkciAgendy(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoAgendaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UctAgenda: ServiceBase & Catalog.UctAgenda;
	}
	const UctAgenda: Client["UctAgenda"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\ISL\IGUctDokladKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Prace s uct knihami
	* @domain Ucetnictvi
	* @businessObject UctKniha
	*/
	interface UctKniha {
		/**Nacteni knihy*/
		read(rq?:Gordic.Uct.Interface.GUctsdenDto|CallParams<GServiceReadRequest<Gordic.Uct.Interface.GUctsdenDto>>): _Task<GServiceReadRequest<Gordic.Uct.Interface.GUctsdenDto>,GServiceReadResponse<Gordic.Uct.Interface.GUctsdenDto>>;
		/**Seznam povolenych knih pro danou funkci*/
		list(rq?:Gordic.Eko.Interface.GEkoKnihaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Seznam povolenych knih k uzavreni pro danou funkci*/
		knihyKUzaverkam(rq?:Gordic.Eko.Interface.GEkoKnihaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Kontrola knih pred uzavrenim*/
		kontrolaKnihUzavrit(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Kontrola knih pred znovuotevrenim*/
		kontrolaKnihOtevrit(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Uzavreni vybranych knih*/
		uzavritKnihy(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Znovu otevreni vybranych knih*/
		otevritKnihy(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Zjisteni pristupnosti akci ke kneize*/
		getPermissions(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},Gordic.Eko.Interface.GEkoKnihaPermissions>;
		/**Zjisteni povoleni uzaverky knih*/
		nactiPovoleniUzaverky(rq?:CallParams<{}>): _Task<{},Gordic.General.ApplicationInterface.GPermission>;
		/**Zalozeni knihy*/
		create(rq?:Gordic.Uct.Interface.GUctsdenDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUctsdenDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUctsdenDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUctsdenDto>>;
		/**Akce uzaverek uzavreni/otevreni knih*/
		uzaverky(rq?:Gordic.Uct.Interface.GUctUzaverkaRequestDto|CallParams<GServiceActionRequest<Gordic.Uct.Interface.GUctUzaverkaRequestDto>>): _Task<GServiceActionRequest<Gordic.Uct.Interface.GUctUzaverkaRequestDto>,Gordic.Eko.Interface.GEkoVybraneKnihyDto[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UctKniha: ServiceBase & Catalog.UctKniha;
	}
	const UctKniha: Client["UctKniha"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\ISL\IGUctDokladZapis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s objektem  GUctUcetniDokladZapisy
	* @domain Ucetnictvi
	* @businessObject Kniha dokladů UCT
	*/
	interface UctDokladZapis {
		/**Načíst účetní zapisu dokladu*/
		read(rq?:Gordic.Uct.Interface.GUctdpepDto|CallParams<GServiceReadRequest<Gordic.Uct.Interface.GUctdpepDto>>): _Task<GServiceReadRequest<Gordic.Uct.Interface.GUctdpepDto>,GServiceReadResponse<Gordic.Uct.Interface.GUctdpepDto>>;
		/**Načíst seznam účetních zápisů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Uct.Interface.GUctdpepDto>>;
		/**Založit nový účetní zápis*/
		create(rq?:Gordic.Uct.Interface.GUctDokladActionRequestDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladActionRequestDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladActionRequestDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUctdpepDto>>;
		/**Založit/aktualizovat účetní zápis*/
		upsert(rq?:Gordic.Uct.Interface.GUctDokladZapisUlozRequestDto|CallParams<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladZapisUlozRequestDto>>): _Task<GServiceSaveRequest<Gordic.Uct.Interface.GUctDokladZapisUlozRequestDto>,GServiceSaveResponse<Gordic.Uct.Interface.GUctDokladZapisUlozResponseDto>>;
		/**Odúčtovat účetní zápis*/
		oductovatZapisy(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZapisOductovatRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZapisOductovatRequestDto},void>;
		/**Hromadna operace: Hromadne smazani zapisu dokladu*/
		hromadneOdstranit(rq?:Gordic.Uct.Interface.GUctDokladZapisVymazatRequestDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctDokladZapisVymazatRequestDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctDokladZapisVymazatRequestDto>,Gordic.Uct.Interface.GUctDokladZapisVymazatResponseDto>;
		/**Hromadna operace: Hromadny popis zapisu*/
		hromadnePopsat(rq?:Gordic.Uct.Interface.GUctHromadnyPopisZapisyDto|CallParams<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyPopisZapisyDto>>): _Task<GServiceGroupRequest<Gordic.Uct.Interface.GUctHromadnyPopisZapisyDto>,Gordic.Uct.Interface.GUctVysledekZapisyDto>;
		/**Import dat do ucetnich zapisu*/
		import(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZapisImportRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZapisImportRequestDto},Gordic.Uct.Interface.GUctResultZapisyDto>;
		/**Kontrola vstupnich dat importu*/
		verifyImportData(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZapisImportRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZapisImportRequestDto},Gordic.Uct.Interface.GUctResultZapisyDto>;
		/**Start importu za souboru*/
		prepareImportFromClipboard(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZapisImportClipPrepareRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZapisImportClipPrepareRequestDto},Gordic.Uct.Interface.GUctResultZapisyDto>;
		/**Import ze schranky - zpracovani dat ze schranky*/
		prepareImportFromClipboardToADP(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZapisImportClipPrepareRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZapisImportClipPrepareRequestDto},GServiceListResponse<Gordic.Eko.Interface.GUctRozdkonDto>>;
		/**Priprava importu za souboru*/
		prepareImportFromFile(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZapisImportPrepareRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZapisImportPrepareRequestDto},Gordic.Uct.Interface.GUctResultZapisyDto>;
		/**Priprava importu ze souboru*/
		prepareImportFromFileToADP(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZapisImportPrepareRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZapisImportPrepareRequestDto},GServiceListResponse<Gordic.Eko.Interface.GUctRozdkonDto>>;
		/**stavy na uctech*/
		stavyNaUctech(rq?:CallParams<{radek:Gordic.Uct.Interface.GUctdpepDto,typStavu:Gordic.Uct.Interface.GEZobrazeniStavu,editaceRadku:boolean}>): _Task<{radek:Gordic.Uct.Interface.GUctdpepDto,typStavu:Gordic.Uct.Interface.GEZobrazeniStavu,editaceRadku:boolean},Gordic.Uct.Interface.GUctStavyNaUctech>;
		/**Zjisteni castky MD/DAL, ktera dany doklad vyrovna*/
		vyrovnatRadekDokladu(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctZapisVyrovnatRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctZapisVyrovnatRequestDto},Gordic.Uct.Interface.GUctZapisVyrovnatResponceDto>;
		/**Test, zda ucet je prijmovy*/
		isPrijmovyUcet(rq?:CallParams<{radek:Gordic.Uct.Interface.GUctdpepDto}>): _Task<{radek:Gordic.Uct.Interface.GUctdpepDto},boolean>;
		/**Zjisteni parametru IISSP pro ucetni zapis*/
		getAttrIISSP(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZapisRezervaceIISSPRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZapisRezervaceIISSPRequestDto},Gordic.Uct.Interface.GUctDokladZapisRezervaceIISSPResponseDto>;
		/**Zjisteni rezervace atributu IISSP pro ucetni zapis a doplni ho do zaslaneho ucetniho zapisu*/
		doplneniZapisuPolozkamiIISSP(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctDokladZapisRezervaceIISSPRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctDokladZapisRezervaceIISSPRequestDto},Gordic.Uct.Interface.GUctDokladZapisRezervaceIISSPResponseDto>;
		/**Test, zda je povolena smlouva na ucetnim radku*/
		isAllowedSmlouva(rq?:CallParams<{rq:Gordic.Uct.Interface.GUctZapisActionRequestDto}>): _Task<{rq:Gordic.Uct.Interface.GUctZapisActionRequestDto},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UctDokladZapis: ServiceBase & Catalog.UctDokladZapis;
	}
	const UctDokladZapis: Client["UctDokladZapis"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\ISL\IGUctLoadAttachmentService.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Pomocné metody
	* @domain Ucetnictvi
	*/
	interface UctLoadAttachmentService {
		/**Seznam příloh obecného subjektu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		/**Nacteni prilohy*/
		read(rq?:Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UctLoadAttachmentService: ServiceBase & Catalog.UctLoadAttachmentService;
	}
	const UctLoadAttachmentService: Client["UctLoadAttachmentService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\ISL\IGUctPermitActions.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Povoleni akci dle stavu dokladu
	* @domain Ucetnictvi
	*/
	interface UctPovoleni {
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UctPovoleni: ServiceBase & Catalog.UctPovoleni;
	}
	const UctPovoleni: Client["UctPovoleni"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Objekty\IGUctParams.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Upresneni financni kontroly*/
	const enum GEFinancniKontrolaUpresneni {
		/**Kontrola pouze dokladů s vlastním bankovním účtem (default)*/
		PouzeVlastniUcet=0,
		/**Finanční kontrola prováděna na všech dokladech. (Nepovinna)*/
		VsechnyDokladyNepovinna=1,
		/**Finanční kontrola prováděna na všech dokladech. Doklady s vlastním bankovním účtem musí projít finanční kontrolou*/
		VsechnyDokladyPovinnaProBU=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Uct\Pap\ds\GUctdmpa.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GUctdmpaDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.ac_0*/
		ac_0?: string|null;
		/**DBCOLUMN:Seznam.ac_1*/
		ac_1?: string|null;
		/**DBCOLUMN:Seznam.te0_0*/
		te0_0?: string|null;
		/**DBCOLUMN:Seznam.te0_1*/
		te0_1?: string|null;
		/**DBCOLUMN:Seznam.te1_0*/
		te1_0?: string|null;
		/**DBCOLUMN:Seznam.te1_1*/
		te1_1?: string|null;
		/**DBCOLUMN:Seznam.te2_0*/
		te2_0?: string|null;
		/**DBCOLUMN:Seznam.te2_1*/
		te2_1?: string|null;
		/**DBCOLUMN:Seznam.te3_0*/
		te3_0?: string|null;
		/**DBCOLUMN:Seznam.te3_1*/
		te3_1?: string|null;
		/**DBCOLUMN:Seznam.te4_0*/
		te4_0?: string|null;
		/**DBCOLUMN:Seznam.te4_1*/
		te4_1?: string|null;
		/**DBCOLUMN:Seznam.uea_0*/
		uea_0?: string|null;
		/**DBCOLUMN:Seznam.uea_1*/
		uea_1?: string|null;
		/**DBCOLUMN:Seznam.ueb_0*/
		ueb_0?: string|null;
		/**DBCOLUMN:Seznam.ueb_1*/
		ueb_1?: string|null;
		/**DBCOLUMN:Seznam.uec_0*/
		uec_0?: string|null;
		/**DBCOLUMN:Seznam.uec_1*/
		uec_1?: string|null;
		/**DBCOLUMN:Seznam.ued_0*/
		ued_0?: string|null;
		/**DBCOLUMN:Seznam.ued_1*/
		ued_1?: string|null;
		/**DBCOLUMN:Seznam.uee_0*/
		uee_0?: string|null;
		/**DBCOLUMN:Seznam.uee_1*/
		uee_1?: string|null;
		/**DBCOLUMN:Seznam.uef_0*/
		uef_0?: string|null;
		/**DBCOLUMN:Seznam.uef_1*/
		uef_1?: string|null;
		/**DBCOLUMN:Seznam.ueg_0*/
		ueg_0?: string|null;
		/**DBCOLUMN:Seznam.ueg_1*/
		ueg_1?: string|null;
		/**DBCOLUMN:Seznam.ueh_0*/
		ueh_0?: string|null;
		/**DBCOLUMN:Seznam.ueh_1*/
		ueh_1?: string|null;
		/**DBCOLUMN:Seznam.uei_0*/
		uei_0?: string|null;
		/**DBCOLUMN:Seznam.uei_1*/
		uei_1?: string|null;
		/**DBCOLUMN:Seznam.uej_0*/
		uej_0?: string|null;
		/**DBCOLUMN:Seznam.uej_1*/
		uej_1?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.ico_0*/
		ico_0?: string|null;
		/**DBCOLUMN:Seznam.ico_1*/
		ico_1?: string|null;
		/**DBCOLUMN:Seznam.ucs_0*/
		ucs_0?: string|null;
		/**DBCOLUMN:Seznam.ucs_1*/
		ucs_1?: string|null;
		/**DBCOLUMN:Seznam.uus_0*/
		uus_0?: string|null;
		/**DBCOLUMN:Seznam.uus_1*/
		uus_1?: string|null;
		/**DBCOLUMN:Seznam.nks_0*/
		nks_0?: string|null;
		/**DBCOLUMN:Seznam.nks_1*/
		nks_1?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.md_dal*/
		md_dal?: number|null;
	}
	const enum GUctdmpaDtoNames { ico = "ico", rok = "rok", por_cislo = "por_cislo", ac_0 = "ac_0", ac_1 = "ac_1", te0_0 = "te0_0", te0_1 = "te0_1", te1_0 = "te1_0", te1_1 = "te1_1", te2_0 = "te2_0", te2_1 = "te2_1", te3_0 = "te3_0", te3_1 = "te3_1", te4_0 = "te4_0", te4_1 = "te4_1", uea_0 = "uea_0", uea_1 = "uea_1", ueb_0 = "ueb_0", ueb_1 = "ueb_1", uec_0 = "uec_0", uec_1 = "uec_1", ued_0 = "ued_0", ued_1 = "ued_1", uee_0 = "uee_0", uee_1 = "uee_1", uef_0 = "uef_0", uef_1 = "uef_1", ueg_0 = "ueg_0", ueg_1 = "ueg_1", ueh_0 = "ueh_0", ueh_1 = "ueh_1", uei_0 = "uei_0", uei_1 = "uei_1", uej_0 = "uej_0", uej_1 = "uej_1", nazev = "nazev", popis = "popis", ico_0 = "ico_0", ico_1 = "ico_1", ucs_0 = "ucs_0", ucs_1 = "ucs_1", uus_0 = "uus_0", uus_1 = "uus_1", nks_0 = "nks_0", nks_1 = "nks_1", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", drd = "drd", md_dal = "md_dal",}
	const enum GUctdmpaDtoFragments { ico = "*", rok = "*", por_cislo = "*", ac_0 = "*", ac_1 = "*", te0_0 = "*", te0_1 = "*", te1_0 = "*", te1_1 = "*", te2_0 = "*", te2_1 = "*", te3_0 = "*", te3_1 = "*", te4_0 = "*", te4_1 = "*", uea_0 = "*", uea_1 = "*", ueb_0 = "*", ueb_1 = "*", uec_0 = "*", uec_1 = "*", ued_0 = "*", ued_1 = "*", uee_0 = "*", uee_1 = "*", uef_0 = "*", uef_1 = "*", ueg_0 = "*", ueg_1 = "*", ueh_0 = "*", ueh_1 = "*", uei_0 = "*", uei_1 = "*", uej_0 = "*", uej_1 = "*", nazev = "*", popis = "*", ico_0 = "*", ico_1 = "*", ucs_0 = "*", ucs_1 = "*", uus_0 = "*", uus_1 = "*", nks_0 = "*", nks_1 = "*", dat_od = "*", dat_do = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", drd = "*", md_dal = "*",}
	const enum GUctdmpaDtoTypes { ico = "string", rok = "number", por_cislo = "number", ac_0 = "string", ac_1 = "string", te0_0 = "string", te0_1 = "string", te1_0 = "string", te1_1 = "string", te2_0 = "string", te2_1 = "string", te3_0 = "string", te3_1 = "string", te4_0 = "string", te4_1 = "string", uea_0 = "string", uea_1 = "string", ueb_0 = "string", ueb_1 = "string", uec_0 = "string", uec_1 = "string", ued_0 = "string", ued_1 = "string", uee_0 = "string", uee_1 = "string", uef_0 = "string", uef_1 = "string", ueg_0 = "string", ueg_1 = "string", ueh_0 = "string", ueh_1 = "string", uei_0 = "string", uei_1 = "string", uej_0 = "string", uej_1 = "string", nazev = "string", popis = "string", ico_0 = "string", ico_1 = "string", ucs_0 = "string", ucs_1 = "string", uus_0 = "string", uus_1 = "string", nks_0 = "string", nks_1 = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", drd = "number", md_dal = "number",}
	const enum GUctdmpaDtoTypeLengths { ico = 10, ac_0 = 20, ac_1 = 20, te0_0 = 16, te0_1 = 16, te1_0 = 16, te1_1 = 16, te2_0 = 16, te2_1 = 16, te3_0 = 6, te3_1 = 6, te4_0 = 12, te4_1 = 12, uea_0 = 3, uea_1 = 3, ueb_0 = 4, ueb_1 = 4, uec_0 = 12, uec_1 = 12, ued_0 = 12, ued_1 = 12, uee_0 = 12, uee_1 = 12, uef_0 = 3, uef_1 = 3, ueg_0 = 16, ueg_1 = 16, ueh_0 = 4, ueh_1 = 4, uei_0 = 4, uei_1 = 4, uej_0 = 12, uej_1 = 12, nazev = 50, popis = 50, ico_0 = 10, ico_1 = 10, ucs_0 = 10, ucs_1 = 10, uus_0 = 10, uus_1 = 10, nks_0 = 12, nks_1 = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ukazatele\GEkoauka.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GEkoaukaDto {
		/**DBCOLUMN:Seznam.ixs_evp*/
		ixs_evp?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.c0_rz*/
		c0_rz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_rz*/
		c1_rz?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0_poc*/
		c0_poc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_poc*/
		c1_poc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c0_schv*/
		c0_schv?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_schv*/
		c1_schv?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_evp_nad*/
		ixs_evp_nad?: string|null;
		/**DBCOLUMN:Seznam.ixs_evp_root*/
		ixs_evp_root?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.rokmes_od*/
		rokmes_od?: string|null;
		/**DBCOLUMN:Seznam.rokmes_do*/
		rokmes_do?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: string|null;
		/**DBCOLUMN:Seznam.rok_akt*/
		rok_akt?: number|null;
		/**DBCOLUMN:Seznam.c0_aut*/
		c0_aut?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_aut*/
		c1_aut?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.priz_uziv*/
		priz_uziv?: number|null;
	}
	const enum GEkoaukaDtoNames { ixs_evp = "ixs_evp", rok = "rok", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", c0 = "c0", c1 = "c1", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c0_rz = "c0_rz", c1_rz = "c1_rz", c0_poc = "c0_poc", c1_poc = "c1_poc", c0_schv = "c0_schv", c1_schv = "c1_schv", ixs_evp_nad = "ixs_evp_nad", ixs_evp_root = "ixs_evp_root", nazev = "nazev", popis = "popis", poznamka = "poznamka", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", aktivita = "aktivita", k_v = "k_v", rok_akt = "rok_akt", c0_aut = "c0_aut", c1_aut = "c1_aut", priz_uziv = "priz_uziv",}
	const enum GEkoaukaDtoFragments { ixs_evp = "*", rok = "*", ico = "*", ucs = "*", uus = "*", nks = "*", c0 = "*", c1 = "*", dat_zmena = "*", zmenu_prov = "*", c0_rz = "*", c1_rz = "*", c0_poc = "*", c1_poc = "*", c0_schv = "*", c1_schv = "*", ixs_evp_nad = "*", ixs_evp_root = "*", nazev = "*", popis = "*", poznamka = "*", rokmes_od = "*", rokmes_do = "*", aktivita = "*", k_v = "*", rok_akt = "*", c0_aut = "*", c1_aut = "*", priz_uziv = "*",}
	const enum GEkoaukaDtoTypes { ixs_evp = "string", rok = "number", ico = "string", ucs = "string", uus = "string", nks = "string", c0 = "JsonDecimal", c1 = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", c0_rz = "JsonDecimal", c1_rz = "JsonDecimal", c0_poc = "JsonDecimal", c1_poc = "JsonDecimal", c0_schv = "JsonDecimal", c1_schv = "JsonDecimal", ixs_evp_nad = "string", ixs_evp_root = "string", nazev = "string", popis = "string", poznamka = "string", rokmes_od = "string", rokmes_do = "string", aktivita = "string", k_v = "string", rok_akt = "number", c0_aut = "JsonDecimal", c1_aut = "JsonDecimal", priz_uziv = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Ukazatele\IGUkazatele.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Autogenerated.*/
	const enum FilterSeznamUkazatelu {
		/**Autogenerated.*/
		ixs_evp,
		/**Autogenerated.*/
		rok,
		/**Autogenerated.*/
		rok_akt,
		/**Autogenerated.*/
		ico,
		/**Autogenerated.*/
		ucs,
		/**Autogenerated.*/
		uus,
		/**Autogenerated.*/
		nks,
		/**Autogenerated.*/
		c0,
		/**Autogenerated.*/
		c1,
		/**Autogenerated.*/
		dat_zmena,
		/**Autogenerated.*/
		zmenu_prov,
		/**Autogenerated.*/
		c0_poc,
		/**Autogenerated.*/
		c1_poc,
		/**Autogenerated.*/
		c0_schv,
		/**Autogenerated.*/
		c1_schv,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\IGVykazy.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Autogenerated.*/
	const enum FilterSeznamVykazu {
		/**Autogenerated.*/
		ixs_vkz,
		/**Autogenerated.*/
		kod_vkz,
		/**Autogenerated.*/
		typ_vkz,
		/**Autogenerated.*/
		aktivita,
		/**Autogenerated.*/
		zdroj_vkz,
		/**Autogenerated.*/
		cfu,
		/**Autogenerated.*/
		priz_du,
		/**Autogenerated.*/
		nazev,
		/**Autogenerated.*/
		poznamka,
		ico,
		ucs,
		stav_vkz,
		/**Platnost rokmes_od..rokmes_do. jen VALUE*/
		platnost,
		/**poradove cislo*/
		por_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\IGVykazyAdm.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\IGVykcsvk.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Stav výkazu*/
	const enum FilterVykcsvk {
		/**Kód stavu výkazu*/
		stav_vkz,
		/**Stav výkazu*/
		stav_vkz_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\ds\GSeznamVykazu.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GSeznamVykazuDto {
		/**DBCOLUMN:Seznam.ixs_vkz*/
		ixs_vkz?: string|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.kod_vkz*/
		kod_vkz?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.typ_vkz*/
		typ_vkz?: number|null;
		/**DBCOLUMN:Seznam.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.stav_vkz*/
		stav_vkz?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.zmenu_prov_rf*/
		zmenu_prov_rf?: string|null;
		/**DBCOLUMN:Seznam.id_csuis*/
		id_csuis?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena_ixb*/
		dat_zmena_ixb?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov_ixb*/
		zmenu_prov_ixb?: string|null;
		/**DBCOLUMN:Seznam.zmenu_prov_rf_ixb*/
		zmenu_prov_rf_ixb?: string|null;
		stav_vkz_txt?: string|null;
		fim?: string|null;
	}
	const enum GSeznamVykazuDtoNames { ixs_vkz = "ixs_vkz", por_cislo = "por_cislo", kod_vkz = "kod_vkz", nazev = "nazev", poznamka = "poznamka", typ_vkz = "typ_vkz", ixb = "ixb", ico = "ico", ucs = "ucs", rok = "rok", mesic = "mesic", den = "den", stav_vkz = "stav_vkz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_rf = "zmenu_prov_rf", id_csuis = "id_csuis", dat_zmena_ixb = "dat_zmena_ixb", zmenu_prov_ixb = "zmenu_prov_ixb", zmenu_prov_rf_ixb = "zmenu_prov_rf_ixb", stav_vkz_txt = "stav_vkz_txt", fim = "fim",}
	const enum GSeznamVykazuDtoFragments { ixs_vkz = "*", por_cislo = "*", kod_vkz = "*", nazev = "*", poznamka = "*", typ_vkz = "*", ixb = "*", ico = "*", ucs = "*", rok = "*", mesic = "*", den = "*", stav_vkz = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_rf = "*", id_csuis = "*", dat_zmena_ixb = "*", zmenu_prov_ixb = "*", zmenu_prov_rf_ixb = "*", stav_vkz_txt = "*", fim = "*",}
	const enum GSeznamVykazuDtoTypes { ixs_vkz = "string", por_cislo = "number", kod_vkz = "string", nazev = "string", poznamka = "string", typ_vkz = "number", ixb = "string", ico = "string", ucs = "string", rok = "number", mesic = "number", den = "number", stav_vkz = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_rf = "string", id_csuis = "string", dat_zmena_ixb = "JsonDate", zmenu_prov_ixb = "string", zmenu_prov_rf_ixb = "string", stav_vkz_txt = "string", fim = "string",}
	const enum GSeznamVykazuDtoTypeLengths { ixs_vkz = 12, kod_vkz = 20, nazev = 150, poznamka = 254, ixb = 12, ico = 10, ucs = 10, zmenu_prov = 12, zmenu_prov_ixb = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\ds\GVyksvkh.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GVyksvkhDto {
		/**DBCOLUMN:Seznam.ixs_vkz*/
		ixs_vkz?: string|null;
		/**DBCOLUMN:Seznam.kod_cast_vkz*/
		kod_cast_vkz?: string|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.typ_du*/
		typ_du?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.dat_du*/
		dat_du?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GVyksvkhDtoNames { ixs_vkz = "ixs_vkz", kod_cast_vkz = "kod_cast_vkz", por_cislo = "por_cislo", typ_du = "typ_du", nazev = "nazev", dat_du = "dat_du", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GVyksvkhDtoFragments { ixs_vkz = "*", kod_cast_vkz = "*", por_cislo = "*", typ_du = "*", nazev = "*", dat_du = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GVyksvkhDtoTypes { ixs_vkz = "string", kod_cast_vkz = "string", por_cislo = "number", typ_du = "number", nazev = "string", dat_du = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\ds\GVyksvkz.Dto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GVyksvkzDto {
		/**DBCOLUMN:Seznam.ixs_vkz*/
		ixs_vkz?: string|null;
		/**DBCOLUMN:Seznam.kod_vkz*/
		kod_vkz?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.typ_vkz*/
		typ_vkz?: number|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.rokmes_od*/
		rokmes_od?: string|null;
		/**DBCOLUMN:Seznam.rokmes_do*/
		rokmes_do?: string|null;
		/**DBCOLUMN:Seznam.cfu*/
		cfu?: string|null;
		/**DBCOLUMN:Seznam.zdroj_vkz*/
		zdroj_vkz?: number|null;
		/**DBCOLUMN:Seznam.priz_du*/
		priz_du?: number|null;
	}
	const enum GVyksvkzDtoNames { ixs_vkz = "ixs_vkz", kod_vkz = "kod_vkz", nazev = "nazev", poznamka = "poznamka", typ_vkz = "typ_vkz", k_v = "k_v", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", cfu = "cfu", zdroj_vkz = "zdroj_vkz", priz_du = "priz_du",}
	const enum GVyksvkzDtoFragments { ixs_vkz = "*", kod_vkz = "*", nazev = "*", poznamka = "*", typ_vkz = "*", k_v = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", rokmes_od = "*", rokmes_do = "*", cfu = "*", zdroj_vkz = "*", priz_du = "*",}
	const enum GVyksvkzDtoTypes { ixs_vkz = "string", kod_vkz = "string", nazev = "string", poznamka = "string", typ_vkz = "number", k_v = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", rokmes_od = "string", rokmes_do = "string", cfu = "string", zdroj_vkz = "number", priz_du = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\DTO\GVykazRequestFileDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Odpoved na pozadavek stazeni souboru*/
	interface GVykazRequestFileDto {
		/**jmeno souboru*/
		FileName?: string|null;
		/**obsah souboru*/
		Content?: string|null;
	}
	const enum GVykazRequestFileDtoNames { FileName = "FileName", Content = "Content",}
	const enum GVykazRequestFileDtoFragments { FileName = "*", Content = "*",}
	const enum GVykazRequestFileDtoTypes { FileName = "string", Content = "string",}
	const enum GVykazRequestFileDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\DTO\GVykazRequestHistorieDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Odpoved na pozadavek historie hodnot*/
	interface GVykazRequestHistorieDto {
		/**Atribut, zda jsou historicka data*/
		isHistory?: boolean|null;
		/**rok*/
		rok?: number|null;
		/**mesic*/
		mesic?: number|null;
	}
	const enum GVykazRequestHistorieDtoNames { isHistory = "isHistory", rok = "rok", mesic = "mesic",}
	const enum GVykazRequestHistorieDtoFragments { isHistory = "*", rok = "*", mesic = "*",}
	const enum GVykazRequestHistorieDtoTypes { isHistory = "boolean", rok = "number", mesic = "number",}
	const enum GVykazRequestHistorieDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\DTO\GVykazTopologieDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**Dto topologie pro vykazy*/
	interface GVykazTopologieDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**uus*/
		uus?: string|null;
		/**nks*/
		nks?: string|null;
		/**rok*/
		rok?: number|null;
		/**mesic*/
		mesic?: number|null;
	}
	const enum GVykazTopologieDtoNames { ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", rok = "rok", mesic = "mesic",}
	const enum GVykazTopologieDtoFragments { ico = "*", ucs = "*", uus = "*", nks = "*", rok = "*", mesic = "*",}
	const enum GVykazTopologieDtoTypes { ico = "string", ucs = "string", uus = "string", nks = "string", rok = "number", mesic = "number",}
	const enum GVykazTopologieDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\DTO\GVykColValueDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro indentifikaci hodnoty*/
	interface GVykColValueDto {
		por_opak?: number|null;
		typ_du?: number|null;
		name?: string|null;
		value?: string|null;
	}
	const enum GVykColValueDtoNames { por_opak = "por_opak", typ_du = "typ_du", name = "name", value = "value",}
	const enum GVykColValueDtoFragments { por_opak = "*", typ_du = "*", name = "*", value = "*",}
	const enum GVykColValueDtoTypes { por_opak = "number", typ_du = "number", name = "string", value = "string",}
	const enum GVykColValueDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\DTO\GVykDefHodnotaDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro nactene hodnoty*/
	interface GVykDefHodnotaDto {
		/**DBCOLUMN:Seznam.h0*/
		Name?: string|null;
		/**DBCOLUMN:Seznam.h1*/
		Value?: string|null;
	}
	const enum GVykDefHodnotaDtoNames { Name = "Name", Value = "Value",}
	const enum GVykDefHodnotaDtoFragments { Name = "*", Value = "*",}
	const enum GVykDefHodnotaDtoTypes { Name = "string", Value = "string",}
	const enum GVykDefHodnotaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\DTO\GVykdvkdDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DBTABLE:Seznam*/
	interface GVykdvkdDto extends Gordic.Uct.Interface.GVyksvkzDto {
		/**DBCOLUMN:Seznam.kod_cast_vkz*/
		kod_cast_vkz?: string|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.delka_du*/
		delka_du?: number|null;
		/**DBCOLUMN:Seznam.priz_opak*/
		priz_opak?: number|null;
		/**DBCOLUMN:Seznam.delka_vaz*/
		delka_vaz?: number|null;
		/**DBCOLUMN:Seznam.nazev_vaz*/
		nazev_vaz?: string|null;
		/**DBCOLUMN:Seznam.poznamka_vaz*/
		poznamka_vaz?: string|null;
		/**DBCOLUMN:Seznam.pattern_du*/
		pattern_du?: string|null;
		/**DBCOLUMN:Seznam.pattern_vaz*/
		pattern_vaz?: string|null;
		/**DBCOLUMN:Seznam.delka_vaz2*/
		delka_vaz2?: number|null;
		/**DBCOLUMN:Seznam.nazev_vaz2*/
		nazev_vaz2?: string|null;
		/**DBCOLUMN:Seznam.poznamka_vaz2*/
		poznamka_vaz2?: string|null;
		/**DBCOLUMN:Seznam.pattern_vaz2*/
		pattern_vaz2?: string|null;
	}
	const enum GVykdvkdDtoNames { kod_cast_vkz = "kod_cast_vkz", por_cislo = "por_cislo", delka_du = "delka_du", priz_opak = "priz_opak", delka_vaz = "delka_vaz", nazev_vaz = "nazev_vaz", poznamka_vaz = "poznamka_vaz", pattern_du = "pattern_du", pattern_vaz = "pattern_vaz", delka_vaz2 = "delka_vaz2", nazev_vaz2 = "nazev_vaz2", poznamka_vaz2 = "poznamka_vaz2", pattern_vaz2 = "pattern_vaz2", ixs_vkz = "ixs_vkz", kod_vkz = "kod_vkz", nazev = "nazev", poznamka = "poznamka", typ_vkz = "typ_vkz", k_v = "k_v", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", rokmes_od = "rokmes_od", rokmes_do = "rokmes_do", cfu = "cfu", zdroj_vkz = "zdroj_vkz", priz_du = "priz_du",}
	const enum GVykdvkdDtoFragments { kod_cast_vkz = "*", por_cislo = "*", delka_du = "*", priz_opak = "*", delka_vaz = "*", nazev_vaz = "*", poznamka_vaz = "*", pattern_du = "*", pattern_vaz = "*", delka_vaz2 = "*", nazev_vaz2 = "*", poznamka_vaz2 = "*", pattern_vaz2 = "*", ixs_vkz = "*", kod_vkz = "*", nazev = "*", poznamka = "*", typ_vkz = "*", k_v = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", rokmes_od = "*", rokmes_do = "*", cfu = "*", zdroj_vkz = "*", priz_du = "*",}
	const enum GVykdvkdDtoTypes { kod_cast_vkz = "string", por_cislo = "number", delka_du = "number", priz_opak = "number", delka_vaz = "number", nazev_vaz = "string", poznamka_vaz = "string", pattern_du = "string", pattern_vaz = "string", delka_vaz2 = "number", nazev_vaz2 = "string", poznamka_vaz2 = "string", pattern_vaz2 = "string", ixs_vkz = "string", kod_vkz = "string", nazev = "string", poznamka = "string", typ_vkz = "number", k_v = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", rokmes_od = "string", rokmes_do = "string", cfu = "string", zdroj_vkz = "number", priz_du = "number",}
	const enum GVykdvkdDtoTypeLengths { kod_cast_vkz = 20, nazev_vaz = 150, poznamka_vaz = 254, nazev_vaz2 = 150, poznamka_vaz2 = 254, ixs_vkz = 12, kod_vkz = 20, nazev = 150, poznamka = 254, zmenu_prov = 12, rokmes_od = 6, rokmes_do = 6, cfu = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.Interface\Vyk\DTO\GVykdvkhHodnotyDto.d.ts 

declare namespace Gordic.Uct.Interface {
	/**DTO pro nactene hodnoty*/
	interface GVykdvkhHodnotyDto {
		/**DBCOLUMN:Seznam.por_opak*/
		por_opak?: number|null;
		/**DBCOLUMN:Seznam.por_opak1*/
		por_opak1?: number|null;
		/**DBCOLUMN:Seznam.h0*/
		h0?: string|null;
		/**DBCOLUMN:Seznam.h1*/
		h1?: string|null;
		/**DBCOLUMN:Seznam.h2*/
		h2?: string|null;
		/**hodnoty*/
		values?: Gordic.Uct.Interface.GVykDefHodnotaDto[]|null;
	}
	const enum GVykdvkhHodnotyDtoNames { por_opak = "por_opak", por_opak1 = "por_opak1", h0 = "h0", h1 = "h1", h2 = "h2", values = "values",}
	const enum GVykdvkhHodnotyDtoFragments { por_opak = "*", por_opak1 = "*", h0 = "*", h1 = "*", h2 = "*", values = "*",}
	const enum GVykdvkhHodnotyDtoTypes { por_opak = "number", por_opak1 = "number", h0 = "string", h1 = "string", h2 = "string", values = "Gordic.Uct.Interface.GVykDefHodnotaDto[]",}
	const enum GVykdvkhHodnotyDtoTypeLengths {}
}

//#endregion

