//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.InterpreterALV.GReportDebugSupport.cs         </Name>
//    <Description> Pomocná třída pro debugování sestav                         </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2009                  </Copyright>
//    <Created>     2009-02-05                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Pomocná třída pro debugování sestav
    /// </summary>
    [System.Security.SecurityCritical]
    public static class GReportDebugSupport
    {
        /// <summary>
        /// Načte parametry sestavy z debug.par
        /// </summary>
        public static void ReadDebugPar(IGReport report, string debugparFileName)
        {
            using (StreamReader r = new StreamReader(debugparFileName, Encoding.Default))
            {
                for(int i=0;i<10;i++)
                {
                    string name = String.Format("X{0:0000}", i);
                    string value = U(r.ReadLine());
                    report.Parameters[name] = value;
                }
            }
        }

        /// <summary>
        /// Načte parametry sestavy z debug.par
        /// </summary>
        public static void WriteDebugPar(IGReport report, string debugparFileName)
        {
            using (StreamWriter r = new StreamWriter(debugparFileName, false, Encoding.Default))
            {
                for (int i = 0; i < 10; i++)
                {
                    string name = String.Format("X{0:0000}", i);
                    object value = report.Parameters[name];
                    string vals = value == null ? "" : M(value.ToString());
                    r.WriteLine(vals);
                }
            }
        }

        private static string M(string s)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char ch in s)
            {
                switch (ch)
                {
                    case '\\': sb.Append("\\\\"); break;
                    case '\n': sb.Append("\\n"); break;
                    case '\r': sb.Append("\\r"); break;
                    default: sb.Append(ch); break;
                }
            }
            return sb.ToString();
        }

        private static string U(string s)
        {
            StringBuilder sb = new StringBuilder();
            int c = s.Length;
            for(int i=0;i<c;i++)
            {
                char ch = s[i];
                if (ch == '\\')
                {
                    if (++i < c)
                    {
                        switch (s[i])
                        {
                            case '\\': sb.Append('\\'); break;
                            case 'n': sb.Append('\n'); break;
                            case 'r': sb.Append('\r'); break;
                            default: throw new GReportException(21000026, 18); //RC-EX 18 : Chybné kódování dparams
                        }
                    }
                }
                else sb.Append(ch); 
            }
            return sb.ToString();
        }

    }
}
