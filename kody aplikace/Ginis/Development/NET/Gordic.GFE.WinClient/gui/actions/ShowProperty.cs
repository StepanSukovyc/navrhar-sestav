//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ShowProperty.cs                        </Name>
//    <Description> Příkaz vlastnosti                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-20                                                  </Created>
//  </FileHeader>

using System.ComponentModel;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Příkaz vlastnosti
    /// </summary>
    class PropertyCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Zobrazení jmenovaných možnosti
        /// </summary>
        /// <param name="dialogTitle">titulek dialogového okna</param>
        /// <param name="node">větev konfiguračníh ostromu</param>
        public static bool ShowPropertyOptions(string dialogTitle, AddInTreeNode node)
        {
            LocalCommonService.PropertyOptions?.Close();

            LocalCommonService.PropertyOptions = new PropertyOptions(dialogTitle, node, SimpleDesktop.Desktop.ActiveViewContent)
            {
                Icon = WinFormsResourceService.GetIcon(node.Icon)
            };
            LocalCommonService.PropertyOptions.FormClosed += FormClosed;
            LocalCommonService.PropertyOptions.Show(SimpleDesktop.MainForm);

            return true;
        }

        static void FormClosed(object sender, System.Windows.Forms.FormClosedEventArgs e)
        {
            LocalCommonService.PropertyOptions = null;
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { }
    }

    /// <summary>
    /// odstranit obrázek pozadí
    /// </summary>
    class ShowProperty : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                return ServiceService.ServiceSelection != null 
                    && ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => cmp is ITagComponent || cmp is IComponent || cmp is IPage)
                    && canEdit;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            PropertyCommand.ShowPropertyOptions(GResources.GetResourceText(29450439), AddInTree.GetTreeNode("/PropertyDialog")); //RC 29450439 : Vlastnosti výběru
        }
    }
}
