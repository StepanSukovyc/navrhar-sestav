//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GFileTargetConfig.cs                         </Name>
//    <Description> Konfigurace logovacího výstupu do souboru                   </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-10-09                                                  </Created>
//  </FileHeader>

using NLog;
using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Konfigurace logovacího výstupu do souboru
    /// </summary>
    public class GFileTargetConfig : GTargetConfig
    {

        private string m_sFileName;

        /// <summary>
        /// Název souboru
        /// </summary>
        public string FileName
        {
            get { return m_sFileName; }
            set { m_sFileName = value; }
        }

        



        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public GFileTargetConfig()
        {
            


        }

    }
}
