declare namespace Gordic.Spr.WebApp {
    type UsedComponentsNew = Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GChangeAktivitaComponentExtensions>> & Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions & ThisType<GContent<Gordic.Gin.WebClient.RegSpa.GDetailMoveComponentExtensions>>;
    const VyberEsu_DuvodHledaniTxt = "zadaniucastnikarizeni";
    function UpravRequiredNaFieldu(parentContent: GContent, fieldName: string, required: boolean): void;
    function VyhledatDlePID_SPR(content: GContent, taskId: string): void;
}
