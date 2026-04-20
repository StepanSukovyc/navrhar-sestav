//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.EnvironmentService.cs                    </Name>
//    <Description> služby prostředí                                            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-02-27                                                  </Created>
//  </FileHeader>

using System;
using System.IO;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// služby prostředí
    /// </summary>
    public class EnvironmentService
    {
        /// <summary>
        /// hlavní složka aplikace pro uložení pomocných souborů (logování, konfigurace atp.)
        /// </summary>
        public static string ApplicationData
        {
            get
            {
                return Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "Gordic");
                //return Path.Combine(@"\\gnet2\test\prohlizec", "Gordic");
            }
        }
    }
}
