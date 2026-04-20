//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ICertificateSecret.cs                        </Name>
//    <Description> GINIS certificate secret                                    </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-04-14                                                  </Created>
//  </FileHeader>

using System.Security.Cryptography.X509Certificates;

namespace Gordic.General
{
    /// <summary>
    /// GINIS certificate secret
    /// </summary>
    public interface ICertificateSecret : ISecret
    {
        /// <summary>
        /// Certificate
        /// </summary>
        X509Certificate2 Certificate
        {
            get;
        }

        /// <summary>
        /// IsCertificateDateValid
        /// </summary>
        bool IsCertificateDateValid
        {
            get;
        }
    }
}
