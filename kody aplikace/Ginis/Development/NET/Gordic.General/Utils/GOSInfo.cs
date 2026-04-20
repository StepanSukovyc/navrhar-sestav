//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GOSInfo.cs              </Name>
//    <Description> Informace o operačním systému                               </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2012-03-20                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using Microsoft.Win32;

namespace Gordic.General    
{
    /// <summary>
    /// Informace o operačním systému
    /// </summary>
    public class GOSInfo
    {
        /*private string m_sName;*/
        /// <summary>
        /// Gets the name of the operating system running on this computer.
        /// </summary>
        public string Name
        {
            get
            {
                /*if (m_sName != null)
                    return m_sName;*/
                return GetOsName();    // funguje i na jiných OS
                /*m_sName = GetOsName();    // funguje i na jiných OS
                return m_sName;*/

                #region Environment.OSVersion property does not provide a reliable way
                /* Remarks
The Environment.OSVersion property does not provide a reliable way to identify the exact operating system and its version. Therefore, we do not recommend that you use this method. Instead:
To identify the operating system platform, use the RuntimeInformation.IsOSPlatform method.
Avoid writing code that depends on a reported operating system version. Instead, check for the availability of the features that your application needs.

Funguje správně, až po přidání app.manifest s definicí pro osplatform 
<!-- Windows 8.1 -->
<supportedOS Id="{1f676c76-80e1-4239-95bb-83d0f6d0da78}" />
<!-- Windows 10 -->   
<supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}" />

For applications that have been manifested for Windows 8.1 or Windows 10. 
Applications not manifested for Windows 8.1 or Windows 10 will return the Windows 8 OS version value (6.2). 
To manifest your applications for Windows 8.1 or Windows 10, refer to Targeting your application for Windows.
*/
                #endregion

            }
        }

        /// <summary>
        /// Vrací název OS (funguje i na jiných OS)
        /// </summary>
        /// <returns>vždy vrátí nějakou hodnotu (null nikdy nevrací)</returns>
        private string GetOsName()
        {
            string l_sName = null;
            try
            {
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                {
                    using (var l_sKey = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Windows NT\CurrentVersion"))
                    {
                        if (l_sKey?.GetValue("ProductName") is string l_sProductName)
                            l_sName = l_sProductName;
                    }
                }
                else
                {
                    l_sName = RuntimeInformation.OSDescription.Trim();
                }
            }
            catch (Exception)
            {
                l_sName = null;
            }

            if (l_sName == null)    // vždy vrátí nějakou hodnotu (null nikdy nevrací)
                l_sName = GResources.GetResourceText(23320010); //RC 23320010 : neznámý

            return l_sName;
        }

        /// <summary>
        /// Vrací verzi (nebo architekturu - na jiných OS než Windows) OS (funguje i na jiných OS)
        /// </summary>
        /// <returns>vždy vrátí nějakou hodnotu (null nikdy nevrací)</returns>
        private string GetOsVersionOrAchitecture()
        {
            string l_sVersionOrArchitecture = null;
            string l_sLabel = GResources.GetResourceText(23320007);   //RC 23320007 : verze
            try
            {
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                {
                    using (var l_sKey = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Windows NT\CurrentVersion"))
                    {
                        if (l_sKey?.GetValue("ReleaseId") is string l_sReleaseId)
                            l_sVersionOrArchitecture = l_sReleaseId;
                    }
                }
                else
                {
                    l_sVersionOrArchitecture = RuntimeInformation.OSArchitecture.ToString();
                    l_sLabel = GResources.GetResourceText(23320008); //RC 23320008 : architektura
                }
            }
            catch (Exception)
            {
                l_sVersionOrArchitecture = null;
            }

            if (l_sVersionOrArchitecture == null)    // vždy vrátí nějakou hodnotu (null nikdy nevrací)
                l_sVersionOrArchitecture = GResources.GetResourceText(23320009); //RC 23320009 : neznámá

            l_sVersionOrArchitecture = $"({l_sLabel} {l_sVersionOrArchitecture})";

            return l_sVersionOrArchitecture;
        }

        /// <summary>
        /// Úplný název včetně případného service packu a typu OS (32/64bit)
        /// </summary>
        public string FullName
        {
            get
            {
                return String.Join(" ",
                    GetOsName(),
                    GetOsVersionOrAchitecture(),
                    (Environment.Is64BitOperatingSystem ? "64bit" : "32bit"));

            }
        }


    }

}
