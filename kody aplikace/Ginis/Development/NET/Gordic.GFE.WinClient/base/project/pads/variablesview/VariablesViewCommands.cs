//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.VariablesViewCommands.cs               </Name>
//    <Description> příkazy záložky proměnných                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-03                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.General;

namespace Gordic.GFE.WinClient.VariablesView
{
    /// <summary>
    /// nová proměnná
    /// </summary>
    class NewVariable : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            VariablesViewTree tree = null;

            if (Owner is VariablesViewPad)
                tree = (Owner as VariablesViewPad).Tree;
            else if (Owner is VariablesViewTree)
                tree = Owner as VariablesViewTree;

            if ((tree == null || tree.Label == null) && !(Owner is ILabel))
            {
                MessageService.ShowError(GResources.GetResourceText(29450393)); //RC 29450393 : Proměnnou nelze přidat - není označen žádný region (skupina) nebo větev proměnných (okno Proměnné)!
                return;
            }

            GrrRegion region = Owner is ILabel
                ? (Owner is GrrRegion ? Owner as GrrRegion : (Owner as ILabel).ParentLabel as GrrRegion) 
                : tree.Label as GrrRegion;

            if (region == null || !(region.Parent is ILabel))
            {
                MessageService.ShowError(GResources.GetResourceText(29450395) + '\n' + GResources.GetResourceText(29450394)); //RC 29450395 : Musí být označen alespoň jeden region!
                return;
            }

            CustomDialog cd = new CustomDialog(AddInTree.GetTreeNode("/Pad/VariablesView/Dialogs"));
            cd.Text = GResources.GetResourceText(29450397);
            if (cd.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                if (cd.Tag != null && cd.Tag is IVariable)
                    if (string.IsNullOrEmpty((cd.Tag as IVariable).Name))
                        MessageService.ShowWarning(GResources.GetResourceText(29450396)); //RC 29450396 : Název proměnné musí být daný!
                    else
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450397))) //RC 29450397 : nová proměnná
                        {
                            (cd.Tag as IVariable).Region = region;
                            region.Variables.Add(new VariableNode(cd.Tag as IVariable));
                            UndoRedoService.Commit();
                        }
        }
    }

    /// <summary>
    /// přejmenování proměnné
    /// </summary>
    class RenameVariable : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (!(Owner is VariablesViewTree
                    && (Owner as VariablesViewTree).SelectedNode is VarExtNode
                    && !((Owner as VariablesViewTree).SelectedNode as VarExtNode).IsRoot))
                return;
        }
    }

    /// <summary>
    /// editace proměnné
    /// </summary>
    class EditVariable : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            VariablesViewTree tree = null;

            if (Owner is VariablesViewPad)
                tree = (Owner as VariablesViewPad).Tree;
            else if (Owner is VariablesViewTree)
                tree = Owner as VariablesViewTree;

            if (tree == null || !(tree.SelectedNode is VarExtNode) || (tree.SelectedNode as VarExtNode).IsRoot)
                return;

            VarExtNode node = tree.SelectedNode as VarExtNode;

            CustomDialog cd = new CustomDialog(AddInTree.GetTreeNode("/Pad/VariablesView/Dialogs"));
            cd.SetTag(node.Variable);
            if (cd.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                if (cd.Tag != null && cd.Tag is IVariable)
                    if (string.IsNullOrEmpty((cd.Tag as IVariable).Name))
                        MessageService.ShowWarning(GResources.GetResourceText(29450396)); //RC 29450396 : Název proměnné musí být daný!
                    else
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450398))) //RC 29450398 : úprava proměnné
                        {
                            node.Variable.Name = (cd.Tag as IVariable).Name;
                            node.Variable.ValueScript = (cd.Tag as IVariable).ValueScript;
                            UndoRedoService.Commit();
                        }
        }
    }

    /// <summary>
    /// odstranění proměnné
    /// </summary>
    class DeleteVariable : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            VariablesViewTree tree = null;

            if (Owner is VariablesViewPad)
                tree = (Owner as VariablesViewPad).Tree;
            else if (Owner is VariablesViewTree)
                tree = Owner as VariablesViewTree;

            if (tree == null || !(tree.SelectedNode is VarExtNode) || (tree.SelectedNode as VarExtNode).IsRoot)
                return;

            VarExtNode node = tree.SelectedNode as VarExtNode;

            using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450398))) //RC 29450398 : úprava proměnné
            {
                (tree.Label as GrrRegion).Variables.Remove(node.Variable);
                UndoRedoService.Commit();
            }
        }
    }
}
