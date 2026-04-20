//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.DocfrmSender.cs                       </Name>
//    <Description> Odesílání formuláře                                         </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-06-09                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.ComponentModel;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.Report.Implementation;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Odesílání formuláře
    /// </summary>
    class DocfrmSender 
        //: Gordic.Report.Client.GfrmSender
        : Sender
    {
        public override void SendMail(GFEFormat.OfflineSubmit Submit, string AttachFileName)
        {
            using (var mm = new System.Net.Mail.MailMessage("kuk@kukuk.cz", Submit.MailTo, Submit.MailSubject, Submit.MailBody))
            {
                mm.Attachments.Add(new System.Net.Mail.Attachment(AttachFileName));
                using (var smtp = new System.Net.Mail.SmtpClient("mhost-ji.gordic.cz"))
                {
                    smtp.Send(mm);
                }
            }
        }
    }
}
