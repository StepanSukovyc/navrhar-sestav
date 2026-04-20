//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHeaderLayoutRenderer.cs                     </Name>
//    <Description> Renderer pro výstup mnoha kontextových informací používaných v hlavičce logovacího souboru</Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-10-30                                                  </Created>
//  </FileHeader>


using NLog;
using NLog.LayoutRenderers;
using System.Text;

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
    

    /// <summary>Renderer kvůli volitelnému šifrování logovací zprávy</summary>
    [LayoutRenderer("message")]
    //[LayoutRenderer("message:withexception=true")]
    //[LayoutRenderer("message:withexception")]
    public class GMessageLayoutRenderer : MessageLayoutRenderer, IGObject
    {

        private const string m_csSecret = "Secret";
        /// <summary>
        /// 
        /// </summary>
        public GMessageLayoutRenderer()
        {
            // !!! bez této vlastnosti nefunguje šifrování logů !!!
            // když je v layout rendereru je nastaveno ${message:withexception=true}
            WithException = false;
        }

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                bool l_bSecret = false;     // výchozí stav (nekryptovat)

                if (logEvent.HasProperties) // dříve tady padalo
                {
                    logEvent.Properties.TryGetValue(m_csSecret, out object l_oValue);
                    if (l_oValue != null && l_oValue is bool)   // nesmí spadnout na výjimku, musí být zabezpečené
                        l_bSecret = (bool)l_oValue;
                }
                //string l_sMessage = l_bSecret ? GCrypto.EncryptedMessage(logEvent.Message) : logEvent.Message;
                // && !WithException TRACE target donutím takto !!nešifrovat!!
                if (l_bSecret && !WithException)
                {
                    var l_sMessage = GCrypto.EncryptedMessage(logEvent.FormattedMessage); // chyba - dříve tam byla zpráva s formátovacími znaky: logEvent.Message - tam dával i formátovací řetězce např.: {0}
                    builder.Append(l_sMessage);
                }
                else
                {
                    base.Append(builder, logEvent);
                }

                //if (logEvent.Exception != null)
                //{
                //    return base.RenderInner(logEvent);
                //}

                //return string.Empty; 
        }


        ///// <summary>
        ///// Určuje, zda bude použita informace o výjimce
        ///// </summary>
        //public new bool WithException
        //{
        //    get { return false; }
        //    set { base.WithException = false; }
        //}

    }


}
