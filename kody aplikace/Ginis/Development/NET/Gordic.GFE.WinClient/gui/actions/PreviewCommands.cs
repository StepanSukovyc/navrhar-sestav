//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.PreviewCommands.cs                     </Name>
//    <Description> Náhled                                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.PreviewCommands
{
    /// <summary>
    /// Náhled
    /// </summary>
    class Preview : AbstractMenuCommand
    {
        IPreviewHandler editable;
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveContent as IPreviewHandler;
                return editable != null;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (editable != null)
                editable.Preview();
        }
    }

    /// <summary>
    /// Náhled
    /// </summary>
    class PreviewEdit : AbstractMenuCommand
    {
        IPreviewHandler editable;
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveContent as IPreviewHandler;
                return editable != null && editable.EnablePreviewEdit;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (editable != null)
                editable.PreviewEdit();
        }
    }
}
