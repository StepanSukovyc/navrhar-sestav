//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.VariablePanel.cs                       </Name>
//    <Description> panel pro práci s jednou proměnnou                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-07                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.VariablesView;
using Gordic.WinForms.Controls;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// panel pro práci s jednou proměnnou
    /// </summary>
    class VariablePanel : AbstractOptionPanel
    {
        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.VariablePanel.xfrm");
                ((GLabeledTextBox)ControlDictionary["tbName"]).TextChanged += delegate { if (Tag is IVariable) (Tag as IVariable).Name = ((GLabeledTextBox)ControlDictionary["tbName"]).Text; };
                ((GLabeledTextBox)ControlDictionary["tbValue"]).TextChanged += delegate { if (Tag is IVariable) (Tag as IVariable).ValueScript = ((GLabeledTextBox)ControlDictionary["tbValue"]).Text; };
                this.Dock = System.Windows.Forms.DockStyle.Fill;
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " VariablePanel.xfrm:" + ex.Message); }
        }

        /// <summary>
        /// načtení výchozí honoty
        /// </summary>
        /// <param name="e"></param>
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            if (Tag is IVariable)
            {
                Tag = new VariableNode(Tag as IVariable);
                ((GLabeledTextBox)ControlDictionary["tbName"]).Text = (Tag as IVariable).Name;
                ((GLabeledTextBox)ControlDictionary["tbValue"]).Text = (Tag as IVariable).ValueScript;
            }
            else
                Tag = new VariableNode();
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // VariablePanel
            // 
            this.Name = "VariablePanel";
            this.ResumeLayout(false);

        }
    }
}
