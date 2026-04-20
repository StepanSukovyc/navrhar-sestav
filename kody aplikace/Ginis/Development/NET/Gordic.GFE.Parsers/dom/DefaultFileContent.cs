//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultFileContent.cs                    </Name>
//    <Description> výchozí obsah souboru                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-26                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using System;
using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// výchozí obsah souboru
    /// </summary>
    public class DefaultFileContent : IFileContent
    {
        class DummyContent : DefaultFileContent
        {
            /// <exclude/>
            public override string ToString() => "[DefaultFileContent]";
        }

        /// <summary>
        /// výchozí obsah
        /// </summary>
        public static readonly IFileContent DummyFileContent = new DummyContent();

        string content;
        /// <exclude/>
        public string Content { get => content; } 

        ICompilationUnit unit;
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            throw new NotImplementedException();
        }

        readonly ICollection<IMember> members = null;
        /// <exclude/>
        public ICollection<IMember> Members { get => members; }

        readonly LanguageProperties language = null;
        /// <exclude/>
        public LanguageProperties Language { get => language; }
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
        public IMember GetMemeber(string typeName, int typeParameterCount)
        {
            throw new NotImplementedException();
        }
        /// <exclude/>
        public FilePosition GetPosition(IEntity entity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// aktualizace obsahu
        /// </summary>
        /// <param name="content">obsah k aktuallizací</param>
        /// <param name="showError">TRUE - zobrazení hlášení o chybě</param>
        public void UpdateContent(string content, bool showError = false)
        {
            if (this.content != content)
            {
                this.content = content;
                unit?.Compile();
                if (unit.ErrorsDuringCompile && showError)
                    MessageService.ShowError(unit.ErrorMessage);
            }
        }
        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        private DefaultFileContent() { }

        /// <summary>
        /// konstruktor třídy dle obsahu
        /// </summary>
        /// <param name="unit">kompilační jednotka</param>
        public DefaultFileContent(ICompilationUnit unit)
        {
            this.unit = unit;
        }
    }
}
