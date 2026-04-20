//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CUData.cs                              </Name>
//    <Description> jednotka překladu datového souboru                        </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-14                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;

namespace Gordic.GFE.WinClient.DataEditor
{
    /// <summary>
    /// jednotka překladu datového souboru
    /// </summary>
    class CUData : CompilationUnit
    {
        public sealed class FCData : IFileContent
        {
            #region IFileContent
            string content;
            /// <summary>
            /// obsah souboru
            /// </summary>
            public string Content { get { return content; } }

            /// <summary>
            /// uvolnění obsahu souboru
            /// </summary>
            public void Dispose() { if (unit != null) unit = null; }

            /// <exclude/>
            public IMember GetMemeber(string typeName, int typeParameterCount)
            {
                throw new NotImplementedException();
            }

            /// <exclude/>
            public FilePosition GetPosition(IEntity entity)
            {
                throw new NotImplementedException();
            }

            /// <exclude/>
            public LanguageProperties Language
            {
                get { return LanguageProperties.None; }
            }

            /// <exclude/>
            public ICollection<IMember> Members
            {
                get { throw new NotImplementedException(); }
            }

            /// <exclude/>
            public void RemoveCompilationUnit(ICompilationUnit oldUnit)
            {
                throw new NotImplementedException();
            }

            /// <exclude/>
            public void UpdateCompilationUnit(ICompilationUnit oldUnit, ICompilationUnit parserOutput, string fileName)
            {
                throw new NotImplementedException();
            }

            /// <exclude/>
            public void UpdateContent(string content, bool showError = false)
            {
                if (this.content != content)
                {
                    if (ParserService.IsWellFormedXML(content, out string errorMessage))
                    {
                        this.content = string.Empty;
                        if (xmlContent == null)
                            xmlContent = new XmlDocument();
                        xmlContent.LoadXml(content);
                        if (isXml == 2)
                            isXml = 1;
                    }
                    else
                    {
                        this.content = content;
                        xmlContent = null;
                        if (isXml == 2)
                            isXml = 0;
                    }

                    if (unit != null)
                        unit.Compile();
                }
            }
            #endregion

            XmlDocument xmlContent = null;
            /// <summary>
            /// XML prezentace datového obsahu
            /// </summary>
            public XmlDocument XmlContent { get { return xmlContent; } }

            byte isXml = 2;
            /// <summary>
            /// data jsou formátu XML
            /// </summary>
            public bool IsXml { get { return isXml == 1; } }
            ICompilationUnit unit;

            /// <summary>
            /// prázdný konstruktor třídy
            /// </summary>
            FCData() { }
            /// <summary>
            /// konstruktor třídy dle obsahu
            /// </summary>
            /// <param name="unit">kompilační jednotka</param>
            public FCData(ICompilationUnit unit)
            {
                this.unit = unit;
            }
            /// <summary>
            /// konstruktor třídy dle obsahu
            /// </summary>
            /// <param name="unit">kompilační jednotka</param>
            /// <param name="content">případný obsah souboru</param>
            public FCData(ICompilationUnit unit, string content)
                : this(unit)
            {
                UpdateContent(content);
            }
        }

        #region ICompilationUnit
        /// <summary>
        /// překlad jednotky
        /// </summary>
        public override void Compile()
        {
            if (FileContent != null)
            {
                CheckBeforeMutation();
                if (DataView.IsValidContent(FileContent.Content) || (FileContent as FCData).XmlContent != null)
                {
                    errorsDuringCompile = false;
                    ErrorMessage = string.Empty;
                }
                else
                {
                    errorsDuringCompile = true;
                    ErrorMessage = GResources.GetResourceText(29450679); //RC 29450679 : Obsah nemůže být datovým!!!
                }
            }
        }
        /// <summary>
        /// překlad jednotky
        /// </summary>
        /// <param name="view">sekundární pohled na obsah</param>
        public override void Compile(DefaultAbstractSecondaryViewContent view)
        {
            lock (syncRoot)
            {
                try
                {
                    UpdateContent(OnCompileMethod(this));
                    OnCompiled();
                    ErrorsDuringCompile = false;
                }
                catch (Exception ex)
                {
                    LoggingService.Error(ex.Message, ex);
                    ErrorsDuringCompile = true;
                    ErrorMessage = ex.Message;
                }
            }
        }

        /// <summary>
        /// Získání identifikátoru souboru
        /// </summary>
        /// <returns>Idfentifikátor souboru</returns>
        public override string GetID()
        {

            if (fileContent is FCData data)
                if (data.IsXml)
                {
                    if (data.XmlContent != null && data.XmlContent.DocumentElement.HasAttribute("xmlns"))
                    {
                        string xmlns = data.XmlContent.DocumentElement.GetAttribute("xmlns");
                        List<string> xmlNs = xmlns.Split(':').ToList<string>();
                        return xmlNs.FirstOrDefault(itm => !string.IsNullOrEmpty(itm) && !itm.Equals("data"));
                    }
                }
                else if (!string.IsNullOrEmpty(data.Content))
                {
                    string[] splitR = data.Content.TrimStart().Split('\r');
                    if (splitR.Length != 0)
                    {
                        string[] splitP = splitR[0].Split('|');
                        if (splitP.Length > 2)
                            return splitP[1];
                    }
                }

            return null;
        }

        #endregion

        /// <summary>
        /// indikuje XML data
        /// </summary>
        public bool IsXml { get { return FileContent != null && (fileContent as FCData).IsXml; } }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public CUData()
            : base()
        {
        }
        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="fileName">název vázaného souboru</param>
        /// <param name="fileContent">obsah souboru</param>
        public CUData(string fileName, string fileContent)
        {
            this.FileName = fileName;
            isCompiled = false;
        }

        /// <summary>
        /// aktualizace obsahu
        /// </summary>
        /// <param name="content">obsah k aktualizací</param>
        /// <param name="showError">TRUE - zobrazení hlášení o chybě</param>
        public override void UpdateContent(string content, bool showError = false)
        {
            if (fileContent == null)
                this.fileContent = string.IsNullOrEmpty(content) ? new FCData(this) : new FCData(this, content);
            else
                fileContent.UpdateContent(content, showError);
        }
    }
}
