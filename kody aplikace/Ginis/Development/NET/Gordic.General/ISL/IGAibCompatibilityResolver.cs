//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGAibCompatibilityResolver.cs                </Name>
//    <Description> AIB protocol request                                        </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-02-17                                                  </Created>
//  </FileHeader>

using System;
using System.Text.RegularExpressions;

namespace Gordic.General
{
    /// <summary>
    /// AIB protocol request
    /// </summary>
    public interface IGAibProtocolRequest
    {
        /// <summary>
        /// Revize
        /// </summary>
        string Revize
        {
            get;
        }

        /// <summary>
        /// MethodName
        /// </summary>
        string MethodName
        {
            get;
        }

        /// <summary>
        /// OriginalType
        /// </summary>
        string ConnectorType
        {
            get;
        }
    }

    /// <summary>
    /// GAibCompatibilityResolverResult
    /// </summary>
    public sealed class GAibCompatibilityResolverResult
    {
        private GAibCompatibilityResolverResult(string resolvedType)
        {
            ResolvedType = resolvedType;
        }

        static readonly Regex RE = new Regex("Version=(\\d+\\.\\d+\\.\\d+\\.\\d+),");

        /// <summary>
        /// ResolvedType
        /// </summary>
        public readonly string ResolvedType;

        /// <summary>
        /// Allow all
        /// </summary>
        /// <returns></returns>
        public static GAibCompatibilityResolverResult AllowAnyVersion(IGAibProtocolRequest protocolRequest)
        {
            if (Environment.Version.Major >= 7)
            {
                return new GAibCompatibilityResolverResult(protocolRequest.ConnectorType);
            }

            // resolve type. ignore 488, 490,... by default
            return new GAibCompatibilityResolverResult(
                resolvedType: RE.Replace(
                    protocolRequest.ConnectorType,
                    "Version=*,"
                )
            );
        }
    }

    /// <summary>
    /// IGAibCompatibilityResolver
    /// </summary>
    public interface IGAibCompatibilityResolver
    {
        /// <summary>
        /// CheckVersion
        /// </summary>
        /// <param name="protocolRequest"></param>
        /// <returns></returns>
        GAibCompatibilityResolverResult ResolveVersionType(IGAibProtocolRequest protocolRequest);
    }
}
