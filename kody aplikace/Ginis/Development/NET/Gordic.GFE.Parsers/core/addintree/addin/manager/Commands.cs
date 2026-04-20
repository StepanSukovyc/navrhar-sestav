//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Commands.cs                              </Name>
//    <Description> dostupné pøíkazy nástroje správy doplòkù                    </Description>
//    <Author>      Mgr. Stepan Sukovyè                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using System.Collections.Generic;

namespace Gordic.GFE.Parsers.AddInManager
{
    /// <summary>
    /// pøíkaz zobrazení
    /// </summary>
    public class ShowCommand : AbstractMenuCommand
    {
        static bool resourcesRegistered;
        /// <exclude/>
        public override void Run()
        {
            if (!resourcesRegistered)
            {
                resourcesRegistered = true;
                ResourceService.RegisterStrings("ReportDesigner.AddInManager.StringResources", typeof(ShowCommand).Assembly);
            }
            ManagerForm.ShowForm();
        }
    }

    /// <exclude/>
    public class AddInManagerAddInStateConditionEvaluator : IConditionEvaluator
    {
        /// <exclude/>
        public bool IsValid(object caller, Condition condition)
        {
            string states = condition.Properties["states"];
            string action = ((AddInControl)caller).AddIn.Action.ToString();
            foreach (string state in states.Split(','))
                if (state == action)
                    return true;
            return false;
        }
    }

    /// <exclude/>
    public class DisableCommand : AbstractMenuCommand
    {
        /// <exclude/>
        public override void Run()
        {
            ManagerForm.Instance.TryRunAction(((AddInControl)Owner).AddIn, AddInAction.Disable);
        }
    }

    /// <exclude/>
    public class EnableCommand : AbstractMenuCommand
    {
        /// <exclude/>
        public override void Run()
        {
            ManagerForm.Instance.TryRunAction(((AddInControl)Owner).AddIn, AddInAction.Enable);
        }
    }

    /// <exclude/>
    public class AbortInstallCommand : AbstractMenuCommand
    {
        /// <exclude/>
        public override void Run()
        {
            ManagerForm.Instance.TryRunAction(((AddInControl)Owner).AddIn, AddInAction.Uninstall);
        }
    }

    /// <exclude/>
    public class AbortUpdateCommand : AbstractMenuCommand
    {
        /// <exclude/>
        public override void Run()
        {
            ManagerForm.Instance.TryRunAction(((AddInControl)Owner).AddIn, AddInAction.InstalledTwice);
        }
    }

    /// <exclude/>
    public class UninstallCommand : AbstractMenuCommand
    {
        /// <exclude/>
        public override void Run()
        {
            ManagerForm.Instance.TryUninstall(((AddInControl)Owner).AddIn);
        }
    }

    /// <summary>
    /// spuštìní pøíkazu Možnosti
    /// </summary>
    public class OptionsCommand : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                AddIn addIn = ((AddInControl)Owner).AddIn;
                if (addIn.Enabled)
                    foreach (KeyValuePair<string, ExtensionPath> pair in addIn.Paths)
                        if (pair.Key.StartsWith("/ReportDesigner/Dialogs/OptionsDialog"))
                            return true;
                return false;
            }
        }
        /// <exclude/>
        public override void Run()
        {
            AddIn addIn = ((AddInControl)Owner).AddIn;
            AddInTreeNode dummyNode = new AddInTreeNode();
            foreach (KeyValuePair<string, ExtensionPath> pair in addIn.Paths)
                if (pair.Key.StartsWith("/ReportDesigner/Dialogs/OptionsDialog"))
                    dummyNode.Entities.AddRange(pair.Value.Entities);
            Gordic.GFE.Parsers.Gui.OptionsCommand.ShowTabbedOptions(addIn.Name + " " + GResources.GetResourceText(29450538), dummyNode);
        }
    }
}
