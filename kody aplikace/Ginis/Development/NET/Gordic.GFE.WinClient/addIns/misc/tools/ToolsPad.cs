//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ToolsPad.cs                            </Name>
//    <Description> Podložka zobrazující prvek závislý na dokumentu aktuálního poledu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Podložka zobrazující prvek závislý na dokumentu aktuálního poledu
    /// </summary>
    class ToolsPad : AbstractPadContent
    {
        Panel panel = new Panel();
        Label noToolsAvailable = new Label();
        Control child;

        /// <summary>
        /// Ovladač obsahu podložky
        /// </summary>
        public override Control Control { get => panel; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public ToolsPad()
        {
            noToolsAvailable.Text = GResources.GetResourceText(29450257); //RC 29450257 : Pro aktuální dokument nejsou dostupné nástroje
            noToolsAvailable.Dock = DockStyle.Fill;
            panel.Controls.Add(noToolsAvailable);
            child = noToolsAvailable;

            SimpleDesktop.Desktop.ActiveViewContentChanged += DesktopActiveContentChanged;
            DesktopActiveContentChanged(null, null);
        }

        void SetChild(Control newChild)
        {
            if (child != newChild)
            {
                panel.Controls.Clear();
                newChild.Dock = DockStyle.Fill;
                panel.Controls.Add(newChild);
                child = newChild;
            }
        }

        void DesktopActiveContentChanged(object sender, EventArgs e)
        {
            SetChild((SimpleDesktop.Desktop.ActiveViewContent as IToolsHost)?.ToolsControl as Control ?? noToolsAvailable);
        }
    }
}
