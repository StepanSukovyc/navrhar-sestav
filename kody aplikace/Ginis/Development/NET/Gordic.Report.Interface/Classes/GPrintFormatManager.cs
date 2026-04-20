//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GPrintFormatManager.cs              </Name>
//    <Description> Manager tiskových předvoleb                                 </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2008                  </Copyright>
//    <Created>     2008-11-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Win32;
using System.Runtime.InteropServices;
using Gordic.Report.Interface;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Manager tiskových předvoleb
    /// </summary>
    [System.Security.SecurityCritical]
    public class GPrintFormatManager
    {
        internal const string REGPATH = @"SOFTWARE\Gordic\SHARED\Viewer\";

        /// <summary>konstruktor</summary>
        public GPrintFormatManager()
        {
        }

        List<GPrintFormat> m_formats = null;

        /// <summary>
        /// Seznam všech tiskových předvoleb
        /// </summary>
        public GPrintFormat[] Formats
        {
            get
            {
                if (m_formats == null)
                {
                    m_formats = new List<GPrintFormat>();
                    //RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, RegistryView.Registry32))
                    using (RegistryKey root = Registry.CurrentUser.OpenSubKey(REGPATH, false))
                    {
                        if (root != null) //může nastat, pokud klíč neexistuje
                        {
                            foreach (string subkey in root.GetSubKeyNames())
                            {
                                using (RegistryKey key = root.OpenSubKey(subkey))
                                {
                                    if (key != null) //asi by nemělo nastat
                                    {
                                        GPrintFormat f = GPrintFormat.Load(key);
                                        if (f != null)
                                            m_formats.Add(f);
                                    }
                                }
                            }
                        }
                    }
                }
                return m_formats.ToArray();
            }
        }

        /// <summary>
        /// Hledání jedné konkrétní předvolby
        /// </summary>
        public static GPrintFormat GetFormat(string printFormatName)
        {
            if (printFormatName == null) return null;
            printFormatName = printFormatName.Replace(@"~", "~~");
            printFormatName = printFormatName.Replace(@"\", "~/");

            string[] spl = printFormatName.Split(new string[] { " : " }, StringSplitOptions.None);
            if (spl.Length != 2) return null;

            using (RegistryKey root = Registry.CurrentUser.OpenSubKey(REGPATH, false))
            {
                if (root == null) return null;
                foreach (string subkey in root.GetSubKeyNames())
                {
                    if (subkey.StartsWith(spl[0]))
                    {
                        using (RegistryKey key = root.OpenSubKey(subkey))
                        {
                            GPrintFormat f = GPrintFormat.Load(key);
                            if (f != null && f.Name == spl[1])
                                return f;
                        }
                    }
                }
            }
            return null;
        }

    }


}
