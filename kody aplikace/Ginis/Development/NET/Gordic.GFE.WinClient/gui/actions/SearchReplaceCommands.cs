//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SearchReplaceCommands.cs               </Name>
//    <Description> Hledání v textu                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-06                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.SearchReplaceCommands
{
    /// <summary>
    /// Hledání v textu
    /// </summary>
    class Search : AbstractMenuCommand
    {
        /// <summary>
        /// Prvek pro editací
        /// </summary>
        protected ISearchReplaceHandler editable;
        /// <summary>
        /// Indikuje dostupnost příkazu
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveContent as ISearchReplaceHandler;
                return editable != null;
            }
        }
        /// <summary>
        /// Spuštění akce Hledání v textu Ctrl+F
        /// </summary>
        public override void Run()
        {
            if (editable != null)
                editable.Search();
        }
    }

    /// <summary>
    /// Nahradí řetězec zadaným (Ctrl+H)
    /// </summary>
    class SearchReplace : AbstractMenuCommand
    {
        /// <summary>
        /// Prvek pro editací
        /// </summary>
        protected ISearchReplaceHandler editable;
        /// <summary>
        /// Indikuje dostupnost příkazu
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveContent as ISearchReplaceHandler;
                return editable != null;
            }
        }

        /// <summary>
        /// Spuštění akce Hledání v textu Ctrl+F
        /// </summary>
        public override void Run()
        {
            if (editable != null)
                editable.Replace();
        }
    }
}
