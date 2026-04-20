//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHeaderLayoutRenderer.cs                     </Name>
//    <Description> Renderer pro výstup mnoha kontextových informací používaných v hlavičce logovacího souboru</Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-10-30                                                  </Created>
//  </FileHeader>


using NLog;
using NLog.LayoutRenderers;
using NLog.Targets;
using NLog.Layouts;
using NLog.Common;
using NLog.Config;

using System;
using System.Reflection;
using System.Text;
using Microsoft.IdentityModel.Logging;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General
{
    /* Ve výchozím nastavení od NLog 5 LayoutRenderer JE threadově bezpečný a obsahuje:
    protected virtual void WriteAsyncThreadSafe(AsyncLogEventInfo logEvent)
    {
        lock (SyncRoot)
        {
            // ...
            Write(logEvent);
        }
    } */

    /// <summary>Renderer pro výstup nastaveného hlavního Layout</summary>
    [LayoutRenderer("structure")]
    public class GStructureLayoutRenderer : LayoutRenderer, IGObject
    {
        private const string s_csStructure = "${structure}";

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
            foreach (FileTarget file in LoggingConfiguration.AllTargets.Where(target => target is FileTarget))
            {
                // !!! Když tady bylo Layout a ne SimpleLayout, nenabízela se vůbec vlastnost LayoutRenderers!!!
                if (file.Header is SimpleLayout l_oLayoutHeader)
                {
                    if (IsMyRenderer(this, l_oLayoutHeader.LayoutRenderers))
                        builder.Append(file.Layout);
                }
                if (file.Footer is SimpleLayout l_oLayoutFooter)
                {
                    if (IsMyRenderer(this, l_oLayoutFooter.LayoutRenderers))
                        builder.Append(file.Layout);
                }
                if (file.Layout is SimpleLayout l_oLayout)
                {
                    if (IsMyRenderer(this, l_oLayout.LayoutRenderers))
                        builder.Append(file.Layout);
                }

                //fungovalo, ale výstupů bylo více - pro každý použitý target
/*                if ((file.Header != null && file.Header.ToString().Contains(s_csStructure)) ||
                    (file.Footer != null && file.Footer.ToString().Contains(s_csStructure)) ||
                    (file.Layout != null && file.Layout.ToString().Contains(s_csStructure)))
                    builder.Append(file.Layout);*/
            }

        }

        private bool IsMyRenderer(GStructureLayoutRenderer myRenderer, IEnumerable<LayoutRenderer> layoutRenderers)
        {
            return layoutRenderers.Where<LayoutRenderer>(lr => lr == myRenderer).FirstOrDefault() != null;
        }
    }


}
