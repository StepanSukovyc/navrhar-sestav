//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AddNewItemsToProject.cs                </Name>
//    <Description> Přidání položky do projektu                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Přidání položky do projektu
    /// </summary>
    class AddNewItemsToProject : AbstractMenuCommand
    {
        public override void Run()
        {
            ProjectBrowserPad.Instance.BringToFront(SimpleDesktop.Desktop.DesktopLayout);
            this.AddNewItems();
        }

        protected IEnumerable<FileProjectItem> AddNewItems()
        {
            DirectoryNode node = ProjectBrowserPad.Instance.ProjectBrowserControl.SelectedDirectoryNode;
            if (node == null)
                return null;
            node.Expand();
            node.Expanding();

            List<FileProjectItem> addedItems = new List<FileProjectItem>();

            using (NewFileDialog nfd = new NewFileDialog(node.Directory))
            {
                if (nfd.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                {
                    bool additionalProperties = false;
                    foreach (KeyValuePair<string, FileDescriptionTemplate> createdFile in nfd.CreatedFiles)
                    {
                        FileProjectItem item = node.AddNewFile(createdFile.Key);
                        addedItems.Add(item);
                    }
                    if (additionalProperties)
                    {
                        node.Project.Save();
                        node.RecreateSubNodes();
                    }
                }
            }

            return addedItems.AsReadOnly();
        }
    }
}
