//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GScopeContextLayoutRenderer.cs               </Name>
//    <Description> Renderer pro výstup kontextu (postupně se zanořuje).        </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-04-22                                                  </Created>
//  </FileHeader>


using NLog;
using NLog.LayoutRenderers;
using NLog.Common;
using System;

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

    /// <summary>Renderer pro výstup kontextu (postupně se zanořuje).</summary>
    [LayoutRenderer("trace-id")]
    [Obsolete("Bude vyřazeno bez náhrady")]
    public class GNestedContextLayoutRenderer : NdlcLayoutRenderer, IGObject
    //public class GScopeContextNestedStatesLayoutRenderer : ScopeContextNestedStatesLayoutRenderer, IGObject
    {   // pozor! nová třída je sealed - nedá se vůbec dědit
        //private const string s_csDefaultValue = "";
        private const string s_csSeparator = ">";
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public GNestedContextLayoutRenderer() 
        //public GScopeContextNestedStatesLayoutRenderer() 
        {
            Separator = s_csSeparator;
        }
    }


#if OLD
    /// <summary>Renderer pro výstup kontextu (postupně se zanořuje).</summary>
    [LayoutRenderer("nestedcontext")]
    public class GNestedContextLayoutRenderer : LayoutRenderer, IGObject
    {
        private const string s_csDefaultValue = "";
        private const string s_csSeparator = ">";
        //private const string s_csDomainEnd = "]";
        //private LayoutRenderer m_oNdlcLayoutRenderer = new NdlcLayoutRenderer() { Separator = s_csSeparator };    NdlcTimingLayoutRenderer
        private LayoutRenderer m_oNdlcTimingLayoutRenderer = new NdlcTimingLayoutRenderer() { /*Separator = s_csSeparator*/ };

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
            // !NdlcTiming
            var l_sNdlc = m_oNdlcTimingLayoutRenderer.Render(logEvent);

            if (l_sNdlc == null)
            {
                builder.Append(s_csDefaultValue);
                return;
            }
            /*if (l_sNdlc.Length == 0)        // to je běžné - když není žádné zanoření
            {                               // nesmíme pustit do dalšího zpracování a hledání řetězce v dictionary
                builder.Append(l_sNdlc);
                return;
            }*/

            builder.Append(l_sNdlc);

            object[] l_aoScopeData = NestedDiagnosticsLogicalContext.GetAllObjects();

            if (l_aoScopeData == null)
            {
                builder.Append(s_csDefaultValue);
                return;
            }

            for (int i = l_aoScopeData.Length - 1; i >= 0; i--) // jedu od posledního
            {
                object l_oScope = l_aoScopeData[i];

                if (l_oScope is GScopeData l_oScopeData)
                {
                    var l_nLastValue = GMaxScopeRegister.GetLastValue(l_oScopeData.Scope);

                    builder.Append($"{l_oScopeData.ToString()}#{l_nLastValue}");   // scopeData.ToString() dělá [domena]scope

                    if (i > 0 && i != l_aoScopeData.Length)
                        builder.Append(s_csSeparator);
                }
                else
                {
                    builder.Append(l_oScope);
                }
            }

            //celý scope rozdělím nejprve na pole
            /*var l_oNdlcArray = l_sNdlc.Split(s_csSeparator.ToCharArray());

            foreach (string scope in l_oNdlcArray)
            {
                string l_sScopeOnly = ExtractScope(scope);
                var l_nLastValue = GMaxScopeRegister.GetLastValue(l_sScopeOnly);

                builder.Append($"{scope}#{l_nLastValue}");         // doména se ukládá přímo do ndlc
            }*/



            //var l_oNdlc = new StringBuilder(l_sNdlc);
            //l_oNdlc.



            // doména se ukládá přímo do ndlc
            //var l_cDomain = GDomainRegister.Get();

            //var l_sDomain = l_cDomain.HasValue ? $"[{l_cDomaidupn}]" : String.Empty;
            //var l_nMaxValue = ContextMaxValues.GetOrAdd(l_sNdlc, s_cnDefaultFirstValue);

            //if (l_nMaxValue != s_cnDefaultFirstValue)
            //{
            //    Interlocked.Increment(ref l_nMaxValue);
            //    ContextMaxValues[l_sNdlc] = l_nMaxValue;
            //}


            //builder.Append($"{l_sDomain}{l_sNdlc}#{l_nLastValue}");
        }

        //private string ExtractScope(string scope)
        //{
        //    if (scope.Contains(s_csDomainEnd))
        //        return scope.CutFrom(s_csDomainEnd);
        //    else
        //        return scope;
        //}


        //ConcurrentDictionary<string, int> m_oContextMaxValues;

        //private ConcurrentDictionary<string, int> ContextMaxValues
        //{
        //    get
        //    {
        //        if (m_oContextMaxValues != null)
        //            return m_oContextMaxValues;

        //        //if (GlobalDiagnosticsContext.GetObject(s_csContextMaxValues) is ConcurrentDictionary<string, int> l_oContextMaxValues)
        //        //{
        //        //    m_oContextMaxValues = l_oContextMaxValues;
        //        //    return m_oContextMaxValues;
        //        //}
        //        //else
        //        //{
        //        m_oContextMaxValues = new ConcurrentDictionary<string, int>();

        //        GlobalDiagnosticsContext.Set(s_csContextMaxValues, m_oContextMaxValues);

        //        return m_oContextMaxValues;
        //        //}
        //    }
        //}

    }

#endif

}
