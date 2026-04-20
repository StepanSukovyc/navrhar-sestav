//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileOperationClipboardObject.cs        </Name>
//    <Description> Objekt do schránky                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.WinClient.AddIns;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.ProjectBrowser
{
    /// <summary>
    /// Objekt do schránky
    /// </summary>
    [Serializable]
    class FileOperationClipboardObject
    {
        string fileName;
        bool performMove;
        public string FileName { get { return fileName; } }
        public bool PerformMove { get { return performMove; } }
        public FileOperationClipboardObject(string fileName, bool performMove)
        {
            this.fileName = fileName;
            this.performMove = performMove;
        }

        public static IDataObject CreateDataObject(FileNode node, bool performMove)
        {
            return new DataObject(typeof(FileNode).ToString(), new FileOperationClipboardObject(node.FileName, performMove));
        }

        public static IDataObject CreateDataObject(SolutionItemNode node, bool performMove)
        {
            return new DataObject(typeof(SolutionItemNode).ToString(),
                                  new FileOperationClipboardObject(node.FileName, performMove));
        }

        public static IDataObject CreateDataObject(DirectoryNode node, bool performMove)
        {
            //return new DataObject(typeof(DirectoryNode).ToString(),
            return new DataObject(node.GetType().FullName,
                                  new FileOperationClipboardObject(node.Directory, performMove));
        }
    }
}
