//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddInTreeSyntaxModeProvider.cs           </Name>
//    <Description> Popis AddInTreeSyntaxModeProvider.                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Diagnostics;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.TextEditor.Document;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// Popis AddInTreeSyntaxModeProvider.
    /// Načtení syntaxe z konfiguračního stromu
    /// </summary>
    public class AddInTreeSyntaxModeProvider : ISyntaxModeFileProvider
    {
        const string syntaxModePath = "/Parsers/ViewContent/DefaultTextEditor/SyntaxModes";
        readonly List<SyntaxMode> syntaxModes;
        /// <summary>
        /// Dostupné syntaxe
        /// </summary>
        public ICollection<SyntaxMode> SyntaxModes { get { return syntaxModes; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public AddInTreeSyntaxModeProvider()
        {
            syntaxModes = AddInTree.BuildItems<SyntaxMode>(syntaxModePath, this, false);
        }

        /// <summary>
        /// Získání souboru syntaxe
        /// </summary>
        /// <param name="syntaxMode">Syntaxe</param>
        /// <returns></returns>
        public XmlTextReader GetSyntaxModeFile(SyntaxMode syntaxMode)
        {
            Debug.Assert(syntaxMode is AddInTreeSyntaxMode);
            return ((AddInTreeSyntaxMode)syntaxMode).CreateTextReader();
        }

        /// <summary>
        /// Atualizace syntaxí
        /// </summary>
        public void UpdateSyntaxModeList()
        {
            // nelze měnit za běhu        
        }
    }
}
