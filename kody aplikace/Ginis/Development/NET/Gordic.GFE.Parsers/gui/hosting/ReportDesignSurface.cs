//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ReportDesignSurface.cs                 </Name>
//    <Description> Vlastní plocha pro návrhář                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-21                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel.Design;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Hosting
{
    /// <summary>
    /// Vlastní plocha pro návrhář
    /// </summary>
    [ComVisible(false)]
    public class ReportDesignSurface : DesignSurface
    {
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="provider">Poskytovatel služeb</param>
        public ReportDesignSurface(IServiceProvider provider)
            : base(provider)
        {
            // odstranění standardní služby System.ComponentModel.Design.ISelectionService
            ServiceContainer.RemoveService(typeof(ISelectionService));
        }
    }
}
