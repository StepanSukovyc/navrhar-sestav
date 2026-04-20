//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CodeCompletionBindingMaker.cs            </Name>
//    <Description> vytvoření vazby na domplňování textu                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.IO;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.TextEditor;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// vytvoření vazby na domplňování textu
    /// </summary>
    class CodeCompletionBindingMaker : IMaker
    {
        /// <exclude/>
        public bool HandleConditions { get { return false; } }
        /// <exclude/>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            string ext = entity.Properties["extensions"];
            if (ext != null && ext.Length > 0)
                return new LazyCodeCompletionBinding(entity, ext.Split(';'));
            else
                return entity.AddIn.CreateObject(entity.Properties["class"]);
        }
    }

    /// <summary>
    /// jednoduchá vazba na doplnění textu
    /// </summary>
    sealed class LazyCodeCompletionBinding : ICodeCompletionBinding
    {
        Entity entity;
        readonly string[] extensions;
        ICodeCompletionBinding binding;

        /// <exclude/>
        public string Language { get => null; }
        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="entity">jednotka konfiguračního stromu</param>
        /// <param name="extensions">zakončení</param>
        public LazyCodeCompletionBinding(Entity entity, string[] extensions)
        {
            this.entity = entity;
            this.extensions = extensions;
        }
        /// <summary>
        /// vazba na stisknutou kombinací kláves
        /// </summary>
        /// <param name="editor">textový editor, nad kterým se uskutečnilo stisknutí</param>
        /// <param name="ch">stisknuté tlačítko</param>
        /// <returns></returns>
        public bool HandleKeyPress(ICodeCompletionEditor editor, char ch)
        {
            if (editor is TextEditorControl tec)
            {
                string ext = Path.GetExtension(tec.FileName);
                foreach (string extension in extensions)
                    if (ext.Equals(extension, StringComparison.OrdinalIgnoreCase))
                    {
                        if (binding == null)
                            binding = (ICodeCompletionBinding)entity.AddIn.CreateObject(entity.Properties["class"]);
                        return binding.HandleKeyPress(editor, ch);
                    }
            }
            return false;
        }

        /// <summary>
        /// reakce na stisknutí kombinace kláves Ctrl|Space
        /// </summary>
        /// <param name="editor">textový editor, nad kterým se uskutečnilo stisknutí</param>
        /// <returns></returns>
        public bool CtrlSpace(ICodeCompletionEditor editor)
        {
            if (editor is TextEditorControl tec)
            {
                string ext = Path.GetExtension(tec.FileName);
                foreach (string extension in extensions)
                    if (ext.Equals(extension, StringComparison.OrdinalIgnoreCase))
                    {
                        if (binding == null)
                            binding = (ICodeCompletionBinding)entity.AddIn.CreateObject(entity.Properties["class"]);
                        return binding.CtrlSpace(editor);
                    }
            }
            return false;
        }
    }
}
