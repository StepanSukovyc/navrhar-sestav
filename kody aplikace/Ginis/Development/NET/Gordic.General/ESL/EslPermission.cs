//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.EslPermissionAtribute.cs                     </Name>
//    <Description> ESL permissions                                             </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-07-19                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Reflection;
using System.Security;

namespace Gordic.General
{
    /// <summary>
    /// ESL permissions
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public sealed class EslPermission : Attribute
    {
        public readonly string[] Permissions;

        /// <summary>
        /// EslPermissionAtribute
        /// </summary>
        /// <param name="permissions"></param>
        public EslPermission(params string[] permissions)
        {
            Permissions = permissions;
        }

        /// <summary>
        /// CheckEslPermissions
        /// </summary>
        /// <param name="methodInfo"></param>
        /// <param name="authorization"></param>
        /// <exception cref="SecurityException"></exception>
        public static IGEslAuthorization CheckEslPermissions(MethodInfo methodInfo, IGEslAuthorization authorization)
        {
            var permissionAttribute = methodInfo.GetCustomAttributes<EslPermission>(true).FirstOrDefault();
            if(permissionAttribute == null)
            {
                return authorization;
            }

            var missingPermission = Array.Find(permissionAttribute.Permissions, (permission) => !authorization.IsInRole(permission));
            return missingPermission != null
                ? throw new SecurityException($"ESL authorization denied - [{missingPermission}]")
                : authorization;
        }
    }
}
