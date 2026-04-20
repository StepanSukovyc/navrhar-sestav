//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGSecuredVault.cs                            </Name>
//    <Description> Secured key vault                                           </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-08-18                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// IGSecuredVault2
    /// </summary>
    public interface IGSecuredVaultExtensions
    {
        /// <summary>
        /// CanProvideSecret
        /// </summary>
        /// <param name="secretDefinition"></param>
        /// <returns></returns>
        bool CanProvideSecret(GSecretDefinition secretDefinition);
    }

    /// <summary>
    /// Secured key vault
    /// </summary>
    [ActivatedObject("Gordic.General.ApplicationServer.GServerSecuredVault")]
    public interface IGSecuredVault
    {
        /// <summary>
        /// Name of vault
        /// </summary>
        string Name
        {
            get;
        }

        /// <summary>
        /// Id
        /// </summary>
        string Id
        {
            get;
        }

        /// <summary>
        /// Vrátí tajemství - použijte hodnotu těsně před voláním
        /// ISecret lze na serveru předávat, nikoliv server vs. klient
        /// </summary>
        /// <param name="path">Cesta k tajemství </param>
        IPasswordSecret GetPasswordSecret(string path);

        /// <summary>
        /// Vrátí certifikát podle názvu tajemství, ne podle otisku!
        /// ISecret lze na serveru předávat, nikoliv server vs. klient
        /// </summary>
        /// <param name="path">Cesta k tajemství </param>
        ICertificateSecret GetCertificateSecret(string path);
    }
}
