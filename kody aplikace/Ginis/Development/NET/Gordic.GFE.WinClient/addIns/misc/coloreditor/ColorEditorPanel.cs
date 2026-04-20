//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ColorEditorPanel.cs                    </Name>
//    <Description> panel editace barvy                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-29                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.WinClient.ColorEditor
{
    /// <summary>
    /// panel editace barvy
    /// </summary>
    class ColorEditorPanel : AbstractOptionPanel
    {
        /// <summary>
        /// načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            SetupLocalizedXFRM(AssemblyName + ".Resources.forms.options.ColorEditorPanel.xfrm");

            //((ListBox)ControlDictionary["toolListBox"]).BeginUpdate();
            //try
            //{
            //    foreach (object o in ToolLoader.Tool)
            //        ((ListBox)ControlDictionary["toolListBox"]).Items.Add(o);
            //}
            //finally
            //{
            //    ((ListBox)ControlDictionary["toolListBox"]).EndUpdate();
            //}

            //MenuService.CreateQuickInsertMenu((TextBox)ControlDictionary["argumentTextBox"],
            //                                  ControlDictionary["argumentQuickInsertButton"],
            //                                  argumentQuickInsertMenu);

            //MenuService.CreateQuickInsertMenu((TextBox)ControlDictionary["workingDirTextBox"],
            //                                  ControlDictionary["workingDirQuickInsertButton"],
            //                                  workingDirInsertMenu);

            //((ListBox)ControlDictionary["toolListBox"]).SelectedIndexChanged += new EventHandler(selectEvent);
            //ControlDictionary["removeButton"].Click += new EventHandler(removeEvent);
            //ControlDictionary["addButton"].Click += new EventHandler(addEvent);
            //ControlDictionary["moveUpButton"].Click += new EventHandler(moveUpEvent);
            //ControlDictionary["moveDownButton"].Click += new EventHandler(moveDownEvent);
            //ControlDictionary["browseButton"].Click += new EventHandler(browseEvent);

            //selectEvent(this, EventArgs.Empty);
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // ColorEditorPanel
            // 
            this.Name = "ColorEditorPanel";
            this.ResumeLayout(false);

        }

    }
}
