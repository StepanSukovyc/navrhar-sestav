//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GUcrOdlozParam.cs                                   </Name>
//    <Description> INT - Parametry sestavy udloženého zpracování       </Description>
//    <Author>      Martin Aliger                                       </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2007          </Copyright>
//    <Created>     2007-04-11                                          </Created>
//  </FileHeader>

using Gordic.General;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// TODO
    /// </summary>
    public class GScheduledReportParameter: IGDto
    {
        private string m_key;
        private string m_name;
        private char m_type;
        private int m_len;
        private string m_value = null;

        internal GScheduledReportParameter(string key, string name, char t, int len)
        {
            m_key = key;
            m_name = name;
            m_type = t;
            m_len = len;
        }

        /// <summary>Ctor pro DTO</summary>
        public GScheduledReportParameter()
        { }

        /// <summary>
        /// TODO
        /// </summary>
        [JsonProperty("key")]
        [GTypeScript(AllowNull = false, AllowUndefined = false, ReadOnly = true)]
        public string Key
        {
            get { return m_key; }
            set { m_key = value; }
        }

        /// <summary>
        /// TODO
        /// </summary>
        [JsonProperty("name")]
        public string Name
        {
            get { return m_name; }
            set { m_name = value; }
        }

        /// <summary>
        /// Typ policka? V C# je jako char.
        /// </summary>
        [JsonProperty("type")]
        [GTypeScript(Type = "string")]
        public char Type
        {
            get { return m_type; }
            set { m_type = value; }
        }

        /// <summary>
        /// TODO
        /// </summary>
        [JsonProperty("length")]
        [GTypeScript(ReadOnly = true)]
        public int Length
        {
            get { return m_len; }
            set { m_len = value; }
        }

        /// <summary>
        /// TODO
        /// </summary>
        [JsonProperty("value")]
        public string Value
        {
            get { return m_value; }
            set { m_value = value; }
        }

        /// <summary>
        /// TODO
        /// </summary>
        public static GScheduledReportParameter Parse(string key, string s)
        {
            //Nul. stavy#S(1)#
            string[] l_spl = s.Split('#');
            string l_type = l_spl[1];
            int l_len = 0;
            if (l_type.Length >= 4 && l_type[1] == '(')
            {
                int l_end = l_type.IndexOf(')');
                string l_sLen = l_type.Substring(2, l_end - 2);
                l_len = Int32.Parse(l_sLen);
            }
            return new GScheduledReportParameter(key, l_spl[0], l_type[0], l_len);
        }

    }
}
