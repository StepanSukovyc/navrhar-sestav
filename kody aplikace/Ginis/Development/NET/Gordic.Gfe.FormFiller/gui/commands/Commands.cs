//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.Commands.cs                </Name>
//    <Description> příkazy aplikace                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using Gordic.Gfe.FormFiller.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.Gfe.FormFiller.Commands
{
    /// <summary>
    /// Ukončení aplikace
    /// </summary>
    class InsertLineBefore : AbstractMenuCommand
    {
        protected IHost editable;
        protected SelectionService service;

        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    service = editable.ServiceSelection;
                    if (service != null)
                        return
                            service.SelectedComponents.Exists(itm => (itm is IParentable
                                                            && (itm as IParentable).Parent is GridLine
                                                            && ((itm as IParentable).Parent as GridLine).Adding));
                }
                return false;
            }
        }

        /// <summary>
        /// Spuštění příkazu ukončení
        /// </summary>
        public override void Run()
        {
            //editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
            //if (editable != null)
            //{
            //    service = editable.ServiceSelection;
            //    if (service != null)
            //        if (service.SelectedComponents.Exists(itm => (itm is IParentable
            //                                            && (itm as IParentable).Parent is ICell
            //                                            && ((itm as IParentable).Parent as ICell).Line is ILine)
            //                                            || (itm is IGRRLabel && (itm as IGRRLabel).EnableLineBefore)))
            //            MessageService.ShowMessage("Existuje!");
            //}
            //return false;
        }
    }

    /// <summary>
    /// přepnutí na úplnou obrazovku
    /// </summary>
    class InsertLineAfter : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
        }
    }

}
