//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGSimpleTotp.cs                              </Name>
//    <Description> IGSimpleTotp                                                </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-14                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// IGSimpleTotp
    /// Vzniklo nej pro účely akceptace na KUSK.
    /// GINIS implementace referencuje MarshalByRefObject na rozhraní
    /// </summary>
    public interface IGSimpleTotp
    {
        /// <summary>
        /// Generate TOTP for user
        /// </summary>
        /// <param name="userIdentifier"></param>
        /// <returns></returns>
        byte[] GenerateQrCode(string userIdentifier);

        /// <summary>
        /// Generate new TOTP key for user
        /// </summary>
        /// <param name="userIdentifier"></param>
        void GenerateNewKey(string userIdentifier);

        /// <summary>
        /// Calculate TOTP for user
        /// </summary>
        /// <param name="identityBearer"></param>
        /// <returns></returns>
        string ComputeTotp(string identityBearer);

        /// <summary>
        /// Verify TOTP for user
        /// </summary>
        /// <param name="identityBearer"></param>
        /// <param name="totp"></param>
        bool VerifyTotp(string identityBearer, string totp);

        /// <summary>
        /// Get TOTP mode for user
        /// </summary>
        /// <returns></returns>
        string GetTotpUserMode(string identityBearer);
    }
}
