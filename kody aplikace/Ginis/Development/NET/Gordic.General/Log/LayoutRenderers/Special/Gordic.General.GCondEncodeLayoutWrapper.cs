//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCondEncodeLayoutWrapper.cs                  </Name>
//    <Description> Provádí podmíněné šifrování vnitřního layoutRendereru       </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-08-08                                                  </Created>
//  </FileHeader>

using NLog.Config;
using NLog.LayoutRenderers;
using NLog.LayoutRenderers.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NLog;

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

#if OLD

    // obdoba NLog/LayoutRenderers/Wrappers/OnExceptionLayoutRendererWrapper.cs    
    /// <summary>
    /// Provádí podmíněné šifrování vnitřního layoutRendereru
    /// </summary>
    [LayoutRenderer("gcondencode")]
    [Obsolete("Už není potřeba, kódování obsahu dělá nově přímo přetížený $message (MessageLayoutRender)")]
    public class GCondEncodeLayoutWrapper : WrapperLayoutRendererBase
    {

        private const string m_csSecret = "Secret";

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public GCondEncodeLayoutWrapper()
        {
        }

        /// <summary>
        /// Povinné přetížení (zatím vrací pouze původní text)
        /// </summary>
        protected override string Transform(string text)
        {
            return text;
        }

        /// <summary>
        /// Renders the inner layout contents.
        /// </summary>
        /// <param name="logEvent">The log event.</param>
        /// <returns>
        /// Contents of inner layout.
        /// </returns>
        protected override string RenderInner(LogEventInfo logEvent)
        {
            bool l_bSecret = false;     // výchozí stav (nekryptovat)

            if (logEvent.HasProperties) // dříve tady padalo
            {
                logEvent.Properties.TryGetValue(m_csSecret, out object l_oValue);
                if (l_oValue != null && l_oValue is bool)   // nesmí spadnout na výjimku, musí být zabezpečené
                    l_bSecret = (bool)l_oValue;
            }
            string l_sMessage = l_bSecret ? GCrypto.EncryptedMessage(logEvent.Message) : logEvent.Message;

            if (l_bSecret)
                return l_sMessage;
            else
                return base.RenderInner(logEvent);

            //if (logEvent.Exception != null)
            //{
            //    return base.RenderInner(logEvent);
            //}

            //return string.Empty;
        }

        /*/// <summary>
        /// Provede zakódování textu jen tehdy, když je předána vlastnost "Secret" na true
        /// </summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
            //base.Append(builder, logEvent);
            bool l_bSecret = false;     // výchozí stav (nekryptovat)

            if (logEvent.HasProperties) // dříve tady padalo
            {
                logEvent.Properties.TryGetValue(m_csSecret, out object l_oValue);
                if (l_oValue != null && l_oValue is bool)   // nesmí spadnout na výjimku, musí být zabezpečené
                    l_bSecret = (bool)l_oValue;
            }
            string l_sMessage = l_bSecret ? GCrypto.EncryptedMessage(logEvent.Message) : logEvent.Message;

            if (l_bSecret)
                builder.Append(l_sMessage);
            else
                base.Append(builder, logEvent);
        }
        */

    }
#endif

}
