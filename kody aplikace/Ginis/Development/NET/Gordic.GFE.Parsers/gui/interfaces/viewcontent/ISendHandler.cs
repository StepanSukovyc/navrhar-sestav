//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ISend.cs                                 </Name>
//    <Description> Rozhraní pro odesilatelné soubory                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-14                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro odesilatelné soubory
    /// </summary>
    public interface ISendHandler
    {
        /// <summary>
        /// Metoda odeslání obsahu
        /// </summary>
        void Send(int submitIndex, Sender sender);

        bool CanSend { get; }
    }

    public abstract class Sender
    {
        public abstract void SendMail(GFEFormat.OfflineSubmit Submit, string AttachFileName);

        public virtual void SendGetPost(GFEFormat.OfflineSubmit Submit, string method, string AttachFileName)
        {
/*            
            var h = !GHttpClientFactory System.Net.WebRequest.Create(Submit.SubmitUrl);
            //var ext = string.Equals(Submit.SubmitMethod, "post-xml", StringComparison.InvariantCultureIgnoreCase) ? ".xml" : ".gfrm";
            var ext = System.IO.Path.GetExtension(AttachFileName);
            //h.Headers.Add("fn", System.IO.Path.GetFileName(AttachFileName));
            h.Headers.Add("fn", string.Format("{2}_{0}{1}", DateTime.Now.Ticks, ext, method));
            h.Method = method;
            try
            {
                using (var req = h.GetRequestStream())
                {
                    var fc = System.IO.File.ReadAllBytes(AttachFileName);
                    req.Write(fc, 0, fc.Length);
                }

                var r = h.GetResponse();
                //using (var res = new StreamReader(r.GetResponseStream()))
                //{
                //    result = res.ReadToEnd();
                //}
            }
            catch
            {
                //result = "Chyba spojení."
                //break;
                throw;
            }
            //if (!string.IsNullOrEmpty(result))
            //{
            //    try
            //    {
            //        (content as AbstractSecondaryViewer).DataParser.Document.LoadXml(result);
            //        (content as AbstractSecondaryViewer).DataParser.Save();
            //        content.ReLoad(null);
            //    }
            //    catch { }
            //}
 */
        }

    }

}
