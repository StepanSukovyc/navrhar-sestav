//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DatabaseCommands.cs                    </Name>
//    <Description> příkazy napojené na DB                                      </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-03-03                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.WinClient.Gui;
using Gordic.Report.Client;

namespace Gordic.GFE.WinClient.Database
{
    /// <summary>
    /// příkazy napojené na DB
    /// </summary>
    class NewPID : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is ITextEditorControlProvider editable)
            {
                var textControl = editable.TextEditorControl;

                if (textControl == null || textControl.ActiveTextAreaControl == null)
                    return;

                Gordic.TextEditor.Document.SelectionManager manager = textControl.ActiveTextAreaControl.SelectionManager;
                Generate(out string pid);
                if (!string.IsNullOrEmpty(pid))
                    if (manager == null || !manager.HasSomethingSelected)
                        textControl.ActiveTextAreaControl.Document.Insert(textControl.ActiveTextAreaControl.Caret.Offset, pid);
                    else
                        foreach (var item in manager.SelectionCollection)
                            textControl.ActiveTextAreaControl.Document.Replace(item.EndOffset - item.Length, item.Length, pid);
            }
        }

        /// <summary>
        /// generuje nový PID sestavy
        /// </summary>
        /// <param name="pid">vygenerovaný PID</param>
        /// <returns></returns>
        public static GReportAdmin Generate(out string pid)
        {
            if (!DatabaseService.IsAuthorized)
            {
                pid = string.Empty;
                return null;
            }
            GReportAdmin ads = new GReportAdmin(DatabaseService.UserProcess);
            pid = ads.NewIxsFrm();
            return ads;
        }
    }
}
