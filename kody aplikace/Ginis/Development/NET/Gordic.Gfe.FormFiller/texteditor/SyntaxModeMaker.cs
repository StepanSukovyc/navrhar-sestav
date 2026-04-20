//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.AddInTreeSyntaxMode.cs                   </Name>
//    <Description> Syntaxe z konfiguračního stromu                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;
using System.IO;
using System.Reflection;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.TextEditor.Document;

namespace Gordic.Gfe.FormFiller.DefaultEditor
{
    /// <summary>
    /// Syntaxe z konfiguračního stromu
    /// </summary>
    class AddInTreeSyntaxMode : SyntaxMode
    {
        readonly Runtime[] runtimes;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="runtimes">běhová prostředí</param>
        /// <param name="fileName">název souboru</param>
        /// <param name="name">název syntaxe</param>
        /// <param name="extensions">koncovky</param>
        public AddInTreeSyntaxMode(Runtime[] runtimes, string fileName, string name, string[] extensions)
            : base(fileName, name, extensions)
        {
            this.runtimes = runtimes;
        }

        /// <summary>
        /// Vytvoření čtečky syntaxe
        /// </summary>
        /// <returns></returns>
        public XmlTextReader CreateTextReader()
        {
            foreach (Runtime runtime in runtimes)
            {
                Assembly assembly = runtime.LoadedAssembly;
                if (assembly != null)
                {
                    Stream stream = assembly.GetManifestResourceStream(FileName);
                    if (stream != null)
                        return new XmlTextReader(stream);
                }
            }
            return null;
        }
    }

    /// <summary>
    /// Vytvoření AddInTreeSyntaxMode objektů zabalujících .xshd režim syntaxe uložený ve zdroji
    /// přidaného sestavení.
    /// </summary>
    /// <attribute name="name" use="required">
    /// Název jazyka, pro který se používá režim syntaxe.
    /// </attribute>
    /// <attribute name="extensions" use="required">
    /// Středníkem oddělený seznam přípon, pro které se používá režim syntaxe.
    /// </attribute>
    /// <attribute name="resource" use="required">
    /// Plně kvalifikovaný název zdrojového souboru.
    /// </attribute>
    /// <usage>Pouze v ViewContent/DefaultTextEditor/SyntaxModes</usage>
    /// <returns>
    /// AddInTreeSyntaxMode objekt, který načte zdroj z doplňku sestavení, když se volá jeho
    /// CreateTextReader metoda.
    /// </returns>
    class SyntaxModeMaker : IMaker
    {
        /// <exclude/>
        public bool HandleConditions { get { return false; } }

        /// <summary>
        /// Vytvoření položek
        /// </summary>
        /// <param name="caller"></param>
        /// <param name="entity"></param>
        /// <param name="subItems"></param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            string highlightingName = entity.Properties["name"];
            string[] extensions = entity.Properties["extensions"].Split(';');
            string resource = entity.Properties["resource"];

            Runtime[] assemblies = new Runtime[entity.AddIn.Runtimes.Count];
            int i = 0;
            foreach (Runtime library in entity.AddIn.Runtimes)
                assemblies[i++] = library;

            return new AddInTreeSyntaxMode(assemblies, resource, highlightingName, extensions);
        }
    }
}
