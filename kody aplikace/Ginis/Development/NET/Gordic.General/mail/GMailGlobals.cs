//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GMailGlobals.cs                              </Name>
//    <Description> Mail globals - general level constants, not implementation specific</Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-11-07                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Mail globals - general level constants, not implementation specific
    /// </summary>
    public static class GMailGlobals
    {
        public static string ProdSmtpError => $"[doc::Mail.SMTP-remove] Modul [{GParamNames.GetFaze()}] požaduje odeslání mailu přes nepodporovaný typ odesílatele: [SMTP] - viz. compatibility list. Není zaručena funkčnost. Přejděte na SecureBlackBox. Viz. instalační příručka a parametry gin_gms_typesnd, <Mail-method>sbbsmtp</Mail-method> a modul ADX05.";

        /// <summary>
        /// Remove SMTP support - documentation message
        /// </summary>
        /// <param name="logger"></param>
        public static void Printdoc_Mail_SMTP_remove(IGLogger logger = null)
        {
            if (logger == null)
            {
                logger = GLogManager.CurrentClassLogger();
            }

            logger.Error(ProdSmtpError);
        }
    }
}
