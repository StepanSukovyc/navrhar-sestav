//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Task.cs                                </Name>
//    <Description> typy úkolů                                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-07                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.WinClient.Project;
using Gordic.General;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// typy úkolů
    /// </summary>
    enum TaskType
    {
        Error,
        Warning,
        Message,
        Comment,
    }

    /// <summary>
    /// třída úkolů
    /// </summary>
    class Task_
    {
        string description;
        string fileName;
        TaskType type;
        int line;
        int column;
        string contextMenuAddInTreeEntry;
        object tag;

        public override string ToString()
        {
            return String.Format("[" + GResources.GetResourceText(29450578) + ": " + GResources.GetResourceText(29450253) + "={0}, " + GResources.GetResourceText(29450577) + "={1}, " + GResources.GetResourceText(29450576) + "={2}, " + GResources.GetResourceText(29450575) + "={3}, " + GResources.GetResourceText(29450236) + "={4}", //RC 29450578 : Úkol
                                 fileName,
                                 line,
                                 column,
                                 type,
                                 description);
        }

        /// <summary>
        /// Číslo řádku úkolu.
        /// </summary>
        public int Line { get { return line; } }

        /// <summary>
        /// Číslo sloupce úkolu
        /// </summary>
        public int Column { get { return column; } }
        /// <summary>
        /// popis
        /// </summary>
        public string Description { get { return description; } }
        /// <summary>
        /// název souboru
        /// </summary>
        public string FileName
        {
            get { return fileName; }
            set { fileName = value; }
        }

        public TaskType TaskType { get { return type; } }

        public string ContextMenuAddInTreeEntry
        {
            get { return contextMenuAddInTreeEntry; }
            set { contextMenuAddInTreeEntry = value; }
        }

        public object Tag
        {
            get { return tag; }
            set { tag = value; }
        }

        /// <summary>
        /// Obsahuje odkaz na chybu sestavení.
        /// </summary>
        public BuildError BuildError { get; private set; }

        public Task_(string fileName, string description, int column, int line, TaskType type)
        {
            this.type = type;
            this.fileName = fileName;
            this.description = description.Trim();
            this.column = column;
            this.line = line;
        }

        public Task_(BuildError error)
        {
            type = error.IsWarning ? TaskType.Warning : TaskType.Error;
            column = Math.Max(error.Column - 1, 0);
            line = Math.Max(error.Line - 1, 0);
            fileName = error.FileName;
            if (string.IsNullOrEmpty(error.ErrorCode))
                description = error.ErrorText;
            else
                description = error.ErrorText + " (" + error.ErrorCode + ")";
            if (error.ContextMenuAddInTreeEntry != null)
                contextMenuAddInTreeEntry = error.ContextMenuAddInTreeEntry;
            tag = error.Tag;
            this.BuildError = error;
        }

        public void JumpToPosition()
        {
            FileAgent.JumpToFilePosition(fileName, line, column);
        }
    }

}
