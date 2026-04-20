//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TemplateCompletionDataProvider.cs        </Name>
//    <Description> poskytovatel šabon na doplnění textu                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor;
using Gordic.TextEditor.Gui.CompletionWindow;
using Gordic.General;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// poskytovatel šabon na doplnění textu
    /// </summary>
    public class TemplateCompletionDataProvider : AbstractCompletionDataProvider
    {
        /// <summary>
        /// list obrázků
        /// </summary>
        public override ImageList ImageList { get { return ClassBrowserIconService.ImageList; } }

        /// <summary>
        /// automatické vložení
        /// </summary>
        public bool AutomaticInsert;

        public override ICompletionData[] GenerateCompletionData(string fileName, TextArea textArea, char charTyped)
        {
            preSelection = "";

            CodeTemplateGroup templateGroup = CodeTemplateLoader.GetTemplateGroupPerFilename(fileName);
            if (templateGroup == null)
                return null;
            List<ICompletionData> completionData = new List<ICompletionData>();
            foreach (CodeTemplate template in templateGroup.Templates)
                completionData.Add(new TemplateCompletionData(template, this.AutomaticInsert));

            return completionData.ToArray();
        }

        class TemplateCompletionData : DefaultCompletionData
        {
            readonly CodeTemplate template;
            readonly bool automaticInsert;

            public override bool InsertAction(TextArea textArea, char ch)
            {
                if (ch == '\t' || automaticInsert)
                {
                    (textArea.MotherTextEditorControl as ICodeCompletionEditor).InsertTemplate(template);
                    return false;
                }
                else
                    return base.InsertAction(textArea, ch);
            }

            public TemplateCompletionData(CodeTemplate template, bool automaticInsert)
                : base(template.Shortcut,
                       template.Description + StringParser.Parse('\n' + GResources.GetResourceText(29450106) + "\n\n") + template.Text, //RC 29450106 : Stisknutím klávesy TAB vložíte tento kód šablony.
                       ClassBrowserIconService.CodeTemplateIndex)
            {
                this.template = template;
                this.automaticInsert = automaticInsert;
            }
        }
    }
}
