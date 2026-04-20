//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGServerGFF.cs                      </Name>
//    <Description> GFF formátování (plnění formulářů)                          </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2009                  </Copyright>
//    <Created>     2009-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// GFF formátování (plnění formulářů)
    /// </summary>
    [ActivatedObject("Gordic.Report.Server.GServerGFF")]
    [System.Security.SecurityCritical]
    public interface IGServerGFF
    {
        /// <summary>Plnění GFF</summary>
        IGMemoryFile RunServerGFF(IGReport report);
    }

}
