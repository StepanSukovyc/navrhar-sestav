//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.TextEditorDisplayBinding.cs            </Name>
//    <Description> Vazba na textový editor souborů                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-08                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor.Document;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.Gfe.FormFiller.DefaultEditor
{
    /// <summary>
    /// Vazba na textový editor souborů
    /// </summary>
    class TextEditorDisplayBinding : IDisplayBinding
    {
        #region IDisplayBinding
        readonly List<NamedFileOperationDelegate> afterInitialize = new List<NamedFileOperationDelegate>();
        /// <summary>
        /// události po inicializací 
        /// </summary>
        public List<NamedFileOperationDelegate> AfterInitialize { get { return afterInitialize; } }

        /// <summary>
        /// Tato třída vrací TRUE, pokud vazbu lze vytvořit.
        /// Je to dle názvu souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="content">Případný obsah</param>
        /// <returns></returns>
        public virtual bool CanCreateContent(string fileName, string content) { return true; }
        /// <summary>
        /// Vytvoření nového IViewContent objektu dle otevřeného souboru
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        /// <returns></returns>
        public virtual IViewContent CreateContent(OpenedFile file)
        {
            TextEditorDisplayBindingWrapper b2 = CreateWrapper(file);
            file.ForceInitializeView(b2); // načtení souboru pro inicializací skládací strategie

            b2.textEditorControl.Dock = DockStyle.Fill;
            try
            {
                b2.textEditorControl.Document.HighlightingStrategy = HighlightingStrategyFactory.CreateHighlightingStrategyForFile(file.FileName);
                b2.textEditorControl.InitializeAdvancedHighlighter();
            }
            catch (HighlightingDefinitionInvalidException ex)
            {
                b2.textEditorControl.Document.HighlightingStrategy = HighlightingStrategyFactory.CreateHighlightingStrategy();
                MessageBox.Show(ex.ToString(), GResources.GetResourceText(29450003), MessageBoxButtons.OK, MessageBoxIcon.Error); //RC 29450003 : Chyba
            }
            b2.textEditorControl.InitializeFormatter();

            return b2;
        }
        #endregion

        static TextEditorDisplayBinding()
        {
            string modeDir = Path.Combine(PropertyService.ConfigDirectory, "modes");
            if (!Directory.Exists(modeDir))
                Directory.CreateDirectory(modeDir);

            HighlightingManager.Manager.AddSyntaxModeFileProvider(new AddInTreeSyntaxModeProvider());
            ClipboardHandling.Initialize();
        }

        /// <summary>
        /// vynucený statický konstruktor třídy. 
        /// Jinak, ostatní editory jako XML nepoužívají vlastní zvýrazňovací strategii 
        /// </summary>
        public static void InitializeSyntaxModes() { }

        /// <summary>
        /// Vytvoření obálky nad soubore
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        /// <returns></returns>
        protected virtual TextEditorDisplayBindingWrapper CreateWrapper(OpenedFile file)
        {
            var tedbw = new TextEditorDisplayBindingWrapper();
            tedbw.Initialize(file);

            return tedbw;
        }
    }
}
