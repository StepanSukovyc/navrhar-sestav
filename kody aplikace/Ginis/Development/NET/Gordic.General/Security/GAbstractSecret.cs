//  <FileHeader xmlns = "http://www.gordic.cz/shared/file-header/v_1.0.0.0" >
//    <Name>        Gordic.General.ApplicationServer.GAbstractSecret.cs         </Name>
//    <Description> Abstract base for most of secrets                           </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-09-03                                                  </Created>
//  </FileHeader>

using System.Linq;
using System.Reflection;
using System.Diagnostics;
using System;

namespace Gordic.General
{
    /// <summary>
    /// Abstract base for most of secrets.
    /// In most cases, simply implement only Secret => GetSecretValue();
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class GAbstractSecret<T> : ISecret
    {
        /// <summary>
        /// Path
        /// </summary>
        protected readonly string Path;

        /// <summary>
        /// Exists
        /// </summary>
        protected readonly bool Exists;

        /// <summary>
        /// Stack
        /// </summary>
        protected readonly string Stack;

        /// <summary>
        /// VaultId
        /// </summary>
        readonly string VaultId;

        /// <summary>
        /// Used
        /// </summary>
        protected int Used = 0;

        readonly T SecretValue;

        readonly SecretScope Scope;

        bool IExistable.Exists => Exists;

        SecretScope ISecret.Scope => Scope;

        string ISecret.VaultId => VaultId;

        /// <summary>
        /// VaultName
        /// </summary>
        public readonly string VaultName;

        string ISecret.Path => Path;

        /// <summary>
        /// SecretValue
        /// </summary>
        /// <param name="path"></param>
        /// <param name="secretValue"></param>
        /// <param name="vault"></param>
        /// <param name="scope"></param>
        /// <param name="exists"></param>
        protected GAbstractSecret(
            string path,
            T secretValue,
            IGSecuredVault vault,
            SecretScope scope,
            bool exists
        )
        {
            Path = path;
            Scope = scope;
            Stack = GetCallerMethodInfo();
            SecretValue = secretValue;
            VaultId = vault.Id;
            VaultName = vault != null ? vault.Name : "NULL";
            Exists = exists;
            if(Exists)
            {
                GLogManager.SECURITY.Info("Secret-LOADED [{scope}]::{secret} vault({vaultId}):{vaultName} loaded by: {stack}", Scope, Path, VaultId, VaultName, Stack);
            }
        }

        /// <summary>
        /// GetSecretValue
        /// </summary>
        /// <returns></returns>
        protected virtual T GetSecretValue()
        {
            if(!Exists)
            {
                throw new Exception($"Secret-WRONG-ACCESS {ToString()} does not exists");
            }

            Used++;
            if (Used == 1)
            {
                GLogManager.SECURITY.Info("Secret-REVEALED {secret} has been revealed by: {stack}", ToString(), Stack);
            }
            else
            {
                GLogManager.SECURITY.Warn("Secret-REVEALED {secret} has been revealed by: {stack}", ToString(), Stack);
            }

            return SecretValue;
        }

        string GetCallerMethodInfo()
        {
            var mb = FindCallerMethod();
            return $"{mb.DeclaringType}.{mb.Name}()";
        }

        /// <summary>
        /// SecretFullPath
        /// </summary>
        protected virtual string FullPath => $"[{Scope}]::{Path}";

        /// <summary>
        /// Details
        /// </summary>
        protected virtual string Details => $"{(Exists ? "Exists" : "Not-found")}, {Used}x, vault: {VaultName}({VaultId})";

        /// <summary>
        /// ToString
        /// </summary>
        /// <returns></returns>
        public override string ToString() => $"[{FullPath}] => [{Details}] ${GetType().Name}:{GetHashCode()}";

        MethodBase FindCallerMethod() => new StackTrace(5)
            .GetFrames()
            .First(f =>
            {
                var moduleName = f.GetMethod().Module.Name;
                return
                    !moduleName.Contains("System.Core") &&
                    !moduleName.Contains("System.Linq.Enumerable") &&
                    !moduleName.StartsWith("Gordic.General") &&
                    !moduleName.StartsWith("Gordic.Support");
            })
            .GetMethod();

        void IDisposable.Dispose()
        {
            GLogManager.SECURITY.Trace("DISPOSED secret {Secret}", this);
        }
    }
}
