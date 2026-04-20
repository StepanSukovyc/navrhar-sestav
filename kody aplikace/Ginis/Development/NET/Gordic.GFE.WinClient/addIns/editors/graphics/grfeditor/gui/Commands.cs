//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Commands.cs                              </Name>
//    <Description> odstranit obrázek pozadí                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.GrfEditor
{

    /// <summary>
    /// Ukotvit vybrané objekty
    /// </summary>
    class Anchor : AbstractCheckableMenuCommand
    {
        /// <summary>
        /// služb apro práci s vybranými objekty
        /// </summary>
        protected SelectionService ServiceSelection
        {
            get => (SimpleDesktop.Desktop.ActiveViewContent is IHost) ? (SimpleDesktop.Desktop.ActiveViewContent as IHost).ServiceSelection : null;
        }

        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceSelection?.SelectedComponents.Count > 0) || ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                return SimpleDesktop.Desktop.ActiveViewContent is IAnchorHandler && canEdit;
            }
        }

        /// <summary>
        /// Indikuje vybranost
        /// </summary>
        public override bool IsChecked
        {
            get => IsEnabled
                && (SimpleDesktop.Desktop.ActiveViewContent as IAnchorHandler).AllAnchored;
            set
            {
                if (IsEnabled)
                    (SimpleDesktop.Desktop.ActiveViewContent as IAnchorHandler).Anchor(value);
            }
        }

        /// <summary>
        /// Spuštění akce Ukotvit objekt/y
        /// </summary>
        public override void Run() { IsChecked = !IsChecked; }
    }

    /// <summary>
    /// Editace argumentu 'edit'
    /// </summary>
    class ArgumentEdit : AbstractCheckableMenuCommand
    {
        /// <summary>
        /// služb apro práci s vybranými objekty
        /// </summary>
        protected SelectionService ServiceSelection
        {
            get => (SimpleDesktop.Desktop.ActiveViewContent is IHost) ? (SimpleDesktop.Desktop.ActiveViewContent as IHost).ServiceSelection : null;
        }

        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceSelection?.SelectedComponents.Count > 0) || ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                return SimpleDesktop.Desktop.ActiveViewContent is IRDArgumentHandler
                && (SimpleDesktop.Desktop.ActiveViewContent as IRDArgumentHandler).EnableEdit
                && canEdit;
            }
        }

        /// <summary>
        /// Indikuje vybranost
        /// </summary>
        public override bool IsChecked
        {
            get => IsEnabled && (SimpleDesktop.Desktop.ActiveViewContent as IRDArgumentHandler).Edit;
            set
            {
                if (IsEnabled)
                    (SimpleDesktop.Desktop.ActiveViewContent as IRDArgumentHandler).Edit = value;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { IsChecked = !IsChecked; }
    }
}
