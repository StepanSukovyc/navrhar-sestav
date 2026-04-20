using System;

namespace Gordic.TextEditor.Misc.Util
{
    /// <summary>
    /// This is a basic interface to a "progress bar" type of
    /// control.
    /// </summary>
    public interface IProgressMonitor
    {
        /// <summary>
        /// Begins a new task with the specified name and total amount of work.
        /// </summary>
        /// <param name="name">Name of the task. Use null to display a default message</param>
        /// <param name="totalWork">Total amount of work in work units. Use 0 for unknown amount of work.</param>
        /// <param name="allowCancel">Specifies whether the task can be cancelled.</param>
        void BeginTask(string name, int totalWork, bool allowCancel);

        /// <summary>
        /// Gets/Sets the amount of work already done
        /// </summary>
        int WorkDone
        {
            get;
            set;
        }

        /// <summary>
        /// Marks the current task as Done.
        /// </summary>
        void Done();

        /// <summary>
        /// Gets/Sets the current task name.
        /// </summary>
        string TaskName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets/sets if the task current shows a modal dialog. Set this property to true to make progress
        /// dialogs windows temporarily invisible while your modal dialog is showing.
        /// </summary>
        bool ShowingDialog
        {
            get;
            set;
        }

        /// <summary>
        /// Gets whether the user has cancelled the operation.
        /// </summary>
        bool IsCancelled
        {
            get;
        }

        /// <summary>
        /// Occurs when the user cancels the operation.
        /// This event could be raised on any thread.
        /// </summary>
        event EventHandler Cancelled;
    }
}
