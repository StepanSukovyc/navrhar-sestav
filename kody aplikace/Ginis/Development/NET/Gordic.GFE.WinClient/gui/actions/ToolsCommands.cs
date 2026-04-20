//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ToolsCommands.cs                       </Name>
//    <Description> Nástrojové příkazy                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.ToolsCommands
{
    /// <summary>
    /// Vlastností
    /// </summary>
    class ShowTextEditorOptions : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            OptionsCommand.ShowTabbedOptions(GResources.GetResourceText(29450445) + "...", //RC 29450445 : Nastavení textového editoru
                                             AddInTree.GetTreeNode("/ReportDesigner/DefaultTextEditor/OptionsDialog"));
        }
    }
    /// <summary>
    /// Operace Znovu
    /// </summary>
    class GenerateFormation : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            List<FileTemplate> template = FileTemplate.GetTemplateByType("gfrm");
            if (template.Count != 0)
            {
                NewFileDialog nfd = new NewFileDialog(null);
                nfd.CreateEvent(template[0]);
            }
        }
    }
}
