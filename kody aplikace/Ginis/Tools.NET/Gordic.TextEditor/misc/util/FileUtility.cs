// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <author name="Daniel Grunwald"/>
//     <version>$Revision$</version>
// </file>

using System;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace Gordic.TextEditor.Misc.Util
{
    /// <summary>
    /// A minimal version of FileUtility. Is used by ICSharpCode.SharpDevelop.Dom (which doesn't reference
    /// ICSharpCode.Core)
    /// </summary>
    static partial class FileUtility
    {
        /// <summary>
        /// Gets the normalized version of fileName.
        /// Slashes are replaced with backslashes, backreferences "." and ".." are 'evaluated'.
        /// </summary>
        public static string NormalizePath(string fileName)
        {
            if (string.IsNullOrEmpty(fileName)) return fileName;

            int i;

            bool isWeb = false;
            for (i = 0; i < fileName.Length; i++)
            {
                if (fileName[i] == '/' || fileName[i] == '\\')
                    break;
                if (fileName[i] == ':')
                {
                    if (i > 1)
                        isWeb = true;
                    break;
                }
            }

            char outputSeparator = isWeb ? '/' : System.IO.Path.DirectorySeparatorChar;

            StringBuilder result = new StringBuilder();
            if (isWeb == false && fileName.StartsWith(@"\\") || fileName.StartsWith("//"))
            {
                i = 2;
                result.Append(outputSeparator);
            }
            else
            {
                i = 0;
            }
            int segmentStartPos = i;
            for (; i <= fileName.Length; i++)
            {
                if (i == fileName.Length || fileName[i] == '/' || fileName[i] == '\\')
                {
                    int segmentLength = i - segmentStartPos;
                    switch (segmentLength)
                    {
                        case 0:
                            // ignore empty segment (if not in web mode)
                            // On unix, don't ignore empty segment if i==0
                            if (isWeb || (i == 0 && Environment.OSVersion.Platform == PlatformID.Unix))
                            {
                                result.Append(outputSeparator);
                            }
                            break;
                        case 1:
                            // ignore /./ segment, but append other one-letter segments
                            if (fileName[segmentStartPos] != '.')
                            {
                                if (result.Length > 0) result.Append(outputSeparator);
                                result.Append(fileName[segmentStartPos]);
                            }
                            break;
                        case 2:
                            if (fileName[segmentStartPos] == '.' && fileName[segmentStartPos + 1] == '.')
                            {
                                // remove previous segment
                                int j;
                                for (j = result.Length - 1; j >= 0 && result[j] != outputSeparator; j--) ;
                                if (j > 0)
                                {
                                    result.Length = j;
                                }
                                break;
                            }
                            else
                            {
                                // append normal segment
                                goto default;
                            }
                        default:
                            if (result.Length > 0) result.Append(outputSeparator);
                            result.Append(fileName, segmentStartPos, segmentLength);
                            break;
                    }
                    segmentStartPos = i + 1; // remember start position for next segment
                }
            }
            if (isWeb == false)
            {
                if (result.Length > 0 && result[result.Length - 1] == outputSeparator)
                {
                    result.Length -= 1;
                }
                if (result.Length == 2 && result[1] == ':')
                {
                    result.Append(outputSeparator);
                }
            }
            return result.ToString();
        }

        public static bool IsEqualFileName(string fileName1, string fileName2)
        {
            return string.Equals(NormalizePath(fileName1),
                                 NormalizePath(fileName2),
                                 StringComparison.OrdinalIgnoreCase);
        }

        /// <summary>
        /// Creates a FolderBrowserDialog that will initially select the
        /// specified folder. If the folder does not exist then the default
        /// behaviour of the FolderBrowserDialog is used where it selects the
        /// desktop folder.
        /// </summary>
        public static FolderBrowserDialog CreateFolderBrowserDialog(string description, string selectedPath)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            dialog.Description = description;
            if (selectedPath != null && selectedPath.Length > 0 && Directory.Exists(selectedPath))
            {
                dialog.RootFolder = Environment.SpecialFolder.MyComputer;
                dialog.SelectedPath = selectedPath;
            }
            return dialog;
        }
    }
}
