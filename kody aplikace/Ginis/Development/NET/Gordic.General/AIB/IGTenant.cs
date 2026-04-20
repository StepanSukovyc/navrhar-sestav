//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGTenant.cs                                  </Name>
//    <Description> Tenant request identifier                                   </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-02-17                                                  </Created>
//  </FileHeader>

using System.Net.Http;

namespace Gordic.General.ApplicationInterface
{
    /// <summary>
    /// Tenant request identifier
    /// </summary>
    public interface IGTenant
    {
        /// <summary>
        /// Resolved tenant
        /// </summary>
        string ResolvedTenant { get; }

        /// <summary>
        /// Requested tenant
        /// </summary>
        string Tenant { get; }

        /// <summary>
        /// Tenant: Ico
        /// </summary>
        string Ico { get; }

        /// <summary>
        /// Tenant: Lic
        /// </summary>
        string Lic { get; }

        /// <summary>
        /// Tenant: P/T
        /// </summary>
        string PT { get; }
    }

    /// <summary>
    /// Tenant header - formatter
    /// Shared code.
    /// </summary>
    public static class AibTenantFormatter
    {
        /// <summary>
        /// Format tenant to header
        /// </summary>
        /// <param name="tenant"></param>
        /// <returns></returns>
        public static string FormatTenant(IGTenant tenant) => $"{tenant.Lic}_{tenant.PT}_{tenant.Ico}";

#if NETFRAMEWORK
        /// <summary>
        /// Modify httpclient headers for AIB tenant
        /// Unified.
        /// </summary>
        /// <param name="request"></param>
        /// <param name="tenant"></param>
        public static System.Net.WebRequest AddMultitenantHeadersNET48(System.Net.WebRequest request, IGTenant tenant)
        {
            if (tenant != null)
            {
                request.Headers.Add("x-gordic-tenant", FormatTenant(tenant));
            }
            return request;
        }
#endif

        /// <summary>
        /// Modify httpclient headers for AIB tenant
        /// Unified.
        /// </summary>
        /// <param name="content"></param>
        /// <param name="tenant"></param>
        public static HttpContent AddMultitenantHeaders(HttpContent content, IGTenant tenant)
        {
            if(tenant != null)
            {
                content.Headers.Add("x-gordic-tenant", FormatTenant(tenant));
            }

            return content;
        }

        /// <summary>
        /// Modify httpclient headers for AIB tenant
        /// Unified.
        /// </summary>
        /// <param name="mpc"></param>
        /// <param name="tenant"></param>
        public static MultipartContent AddMultitenantHeaders(MultipartContent mpc, IGTenant tenant)
        {
            if (tenant != null)
            {
                mpc.Headers.Add("x-gordic-tenant", FormatTenant(tenant));
            }
            return mpc;
        }
    }
}
