//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.BuildError.cs                          </Name>
//    <Description> Chyba kompilace                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-07                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Globalization;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Chyba kompilace
    /// </summary>
    [Serializable]
    class BuildError
    {
        public BuildError()
        {
            this.line = -1;
            this.column = -1;
            this.errorCode = string.Empty;
            this.errorText = string.Empty;
            this.fileName = string.Empty;
        }

        public BuildError(string fileName, string errorText)
        {
            this.line = -1;
            this.column = -1;
            this.errorCode = string.Empty;
            this.errorText = errorText;
            this.fileName = fileName;
        }

        public BuildError(string fileName, int line, int column, string errorCode, string errorText)
        {
            this.line = line;
            this.column = column;
            this.errorCode = errorCode;
            this.errorText = errorText;
            this.fileName = fileName;
        }

        int column;
        string errorCode;
        string errorText;
        string fileName;
        int line;
        bool warning;
        [NonSerialized]
        object tag;
        string contextMenuAddInTreeEntry;

        public int Column
        {
            get { return column; }
            set { column = value; }
        }

        public string ErrorCode
        {
            get { return errorCode; }
            set { errorCode = value; }
        }

        public string ErrorText
        {
            get { return errorText; }
            set { errorText = value; }
        }

        public string FileName
        {
            get { return fileName; }
            set { fileName = value; }
        }

        public int Line
        {
            get { return line; }
            set { line = value; }
        }

        public bool IsWarning
        {
            get { return warning; }
            set { warning = value; }
        }

        /// <summary>
        /// Umožňuje ukládat jakýkoliv objekt s touto chybou
        /// </summary>
        /// <remarks>Vlastnost Tag je [NonSerialized].</remarks>
        public object Tag
        {
            get { return tag; }
            set { tag = value; }
        }

        public string ContextMenuAddInTreeEntry
        {
            get { return contextMenuAddInTreeEntry; }
            set { contextMenuAddInTreeEntry = value; }
        }

        public override string ToString()
        {
            if (string.IsNullOrEmpty(this.FileName))
                return string.Format(CultureInfo.CurrentCulture,
                                     "{0} {1}: {2}",
                                     this.IsWarning ? GResources.GetResourceText(29450426) : GResources.GetResourceText(29450189), //RC 29450189 : Chyba
                                     this.ErrorCode, this.ErrorText);
            else
                return string.Format(CultureInfo.CurrentCulture,
                                     "{0}({1},{2}) : {3} {4}: {5}",
                                     this.FileName, this.Line, this.Column,
                                     this.IsWarning ? GResources.GetResourceText(29450426) : GResources.GetResourceText(29450189), //RC 29450189 : Chyba
                                     this.ErrorCode, this.ErrorText);
        }
    }
}
