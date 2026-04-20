//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGServerGXL.cs                      </Name>
//    <Description> Nepoužívat - podpora generování GXL souborů na apl.serveru  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2009                  </Copyright>
//    <Created>     2009-02-05                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Nepoužívat - podpora generování GXL souborů na apl.serveru
    /// </summary>
    [ActivatedObject("Gordic.Report.Server.GServerGXL")]
    [System.Security.SecurityCritical]
    public interface IGServerGXL
    {
        /// <summary>Nepoužívat</summary>
        IGMemoryFile RunServerGXL(IGReport report);
    }

}
