//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TaskEventArgs.cs                       </Name>
//    <Description> delegát metod s úkolem jako argumentem                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-07                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// delegát metod s úkolem jako argumentem
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    delegate void TaskEventHandler(object sender, TaskEventArgs e);
    /// <summary>
    /// Argument úkolu
    /// </summary>
    class TaskEventArgs : EventArgs
    {
        Task_ task;

        public Task_ Task { get { return task; } }

        public TaskEventArgs(Task_ task)
        {
            this.task = task;
        }
    }
}
