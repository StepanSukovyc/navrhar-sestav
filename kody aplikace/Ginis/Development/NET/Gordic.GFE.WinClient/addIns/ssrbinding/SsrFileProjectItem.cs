//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SsrFileProjectItem.cs                  </Name>
//    <Description> rozšíření třídy                                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-28                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.AddIns;
using Gordic.GFE.WinClient.Project;
using Gordic.GFE.WinClient.ProjectBrowser;
using Gordic.GFE.WinClient.Services;
using System.ComponentModel;
using System.IO;

namespace Gordic.GFE.WinClient.SsrBinding
{
    /// <summary>
    /// rozšíření třídy
    /// </summary>
    class SsrFileProjectItem : FileProjectItem
    {
        readonly IProjectSection item;
        /// <summary>
        /// sekce projektu
        /// </summary>
        public SsrProjectSection Section { get { return item as SsrProjectSection; } }

        /// <summary>
        /// Úplný název souboru projektu
        /// </summary>
        [Browsable(false)]
        public override string FileName { get { return Section != null ? Section.FileName : base.FileName; } }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="ssrProject">projekt položky</param>
        /// <param name="item">sekce položky</param>
        public SsrFileProjectItem(SsrProject ssrProject, Parsers.AddIns.Project.IProjectSection item)
            : base(ssrProject, item.SectionType, item.Name)
        {
            this.item = item;
        }
    }

    class SsrFileNode : FileNode, IFileProjectItemHandler
    {
        #region IFileProjectItemHandler
        /// <exclude/>
        public bool CanBeDefault { get { return item != null && (item.ItemType == ItemType.Data || item.ItemType == ItemType.Generator); } }
        bool isDefault = false;
        /// <exclude/>
        public bool IsDefault { get { return isDefault; } }
        /// <exclude/>
        public void SetDefault(bool value, bool withoutSave = false)
        {
            if (!value)
                isDefault = false;
            else if (Project is SsrProject)
                isDefault = (Project as SsrProject).SetDefault(item, withoutSave);

            drawDefault = !isDefault;
        }

        SsrFileProjectItem item;
        /// <summary>
        /// položka projektu
        /// </summary>
        public dynamic Item { get { return item; } set { ProjectItem = value; } }
        #endregion

        /// <exclude/>
        public override ProjectItem ProjectItem
        {
            get { return base.ProjectItem; }
            set
            {
                item = value as SsrFileProjectItem;
                base.ProjectItem = value;
            }
        }

        /// <exclude/>
        public override bool EnableDelete { get { return !IsEditing; } }
        /// <exclude/>
        public override bool EnableCut { get { return false; } }

        /// <summary>
        /// inicializace třídy
        /// </summary>
        /// <param name="item">položka SSR souboru</param>
        public void Initialize(ProjectItem item)
        {
            base.Initialize(item.FileName);
            Item = item;
        }
        /// <exclude/>
        public override void AfterLabelEdit(string newName)
        {
            if (string.IsNullOrEmpty(newName))
                return;
            if (!FileService.CheckDirectoryEntryName(newName))
                return;

            string oldFileName = FileName;
            string newFileName = Path.Combine(Path.GetDirectoryName(oldFileName), newName);
            if (FileAgent.RenameFile(oldFileName, newFileName, false))
            {
                FileName = newFileName;
                Text = newName;                
                Project.AfterLabelEdit(new AfterFileNodeEditEventArgs(this, oldFileName));
            }
        }

        /// <summary>
        /// odstranění větve
        /// </summary>
        public override void Delete()
        {
            if (Nodes.Count > 0)
            {
                if (MessageService.AskQuestion(GetQuestionText(string.Join(" ", GResources.GetResourceText(29450359), "'${FileName}'", GResources.GetResourceText(29450367))))) //RC 29450359 : Odstranit
                {
                    DeleteChildNodes();
                    OnDeleted();
                }
            }
            else if (MessageService.AskQuestion(GetQuestionText(string.Join(" ", GResources.GetResourceText(29450359), "'${FileName}'", GResources.GetResourceText(29450368))))) //RC 29450359 : Odstranit
                OnDeleted();
        }

        /// <summary>
        /// reakce na odstranění větve
        /// </summary>
        protected override void OnDeleted()
        {
            ExcludeFileFromProject.ExcludeFileNode(this);
            this.Remove();
            base.OnDeleted();
            ProjectService.SaveSolution();
        }
    }

    class SsrDirectoryNode : DirectoryNode, IFileProjectItemHandler
    {
        #region IFileProjectItemHandler
        /// <exclude/>
        public bool CanBeDefault { get { return false; } }
        /// <exclude/>
        public bool IsDefault { get { return false; } }
        /// <exclude/>
        public void SetDefault(bool value, bool withoutSave = false) { }

        readonly SsrFileProjectItem item;
        /// <summary>
        /// položka projektu
        /// </summary>
        public dynamic Item { get { return item; } }
        #endregion

        public SsrDirectoryNode(SsrFileProjectItem item)
            : base(item.FileName)
        {
            // TODO: Complete member initialization
            this.item = item;
        }

        public SsrDirectoryNode(string file)
            : base(file)
        {
        }
    }
}
