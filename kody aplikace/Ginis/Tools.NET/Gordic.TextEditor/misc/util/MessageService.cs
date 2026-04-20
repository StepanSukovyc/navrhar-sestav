using System;
using System.Text;
using System.Windows.Forms;

namespace Gordic.TextEditor.Misc.Util
{
    /// <summary>
    /// Class with static methods to show message boxes.
    /// All text displayed using the MessageService is passed to the
    /// to replace ${res} markers.
    /// </summary>
    static class MessageService
    {
        static string defaultMessageBoxTitle = "MessageBox";

        /// <summary>
        /// Gets/Sets the default title for message boxes displayed
        /// by the message service.
        /// </summary>
        public static string DefaultMessageBoxTitle
        {
            get { return defaultMessageBoxTitle; }
            set { defaultMessageBoxTitle = value; }
        }

        /// <summary>
        /// Shows an exception error using the.
        /// </summary>
        public static void ShowError(Exception ex)
        {
            ShowError(ex, null);
        }

        /// <summary>
        /// Shows an error.
        /// If <paramref name="ex"/> is null, the message is shown inside
        /// a message box.
        /// Otherwise, the custom error reporter is used to display
        /// the exception error.
        /// </summary>
        public static void ShowError(Exception ex, string message)
        {
            if (message == null) message = string.Empty;

            ShowMessage(message);
        }

        public static void ShowMessageFormatted(string caption, string formatstring, params string[] formatitems)
        {
            ShowMessage(Format(formatstring, formatitems), caption);
        }

        public static void ShowMessage(string message)
        {
            ShowMessage(message, DefaultMessageBoxTitle);
        }

        public static void ShowMessage(string message, string caption)
        {
            MessageBox.Show(message, caption);
        }
        static string Format(string formatstring, string[] formatitems)
        {
            try
            {
                return String.Format(formatstring, formatitems);
            }
            catch (FormatException)
            {
                StringBuilder b = new StringBuilder(formatstring);
                foreach (string formatitem in formatitems)
                {
                    b.Append("\nItem: ");
                    b.Append(formatitem);
                }
                return b.ToString();
            }
        }
    }
}
