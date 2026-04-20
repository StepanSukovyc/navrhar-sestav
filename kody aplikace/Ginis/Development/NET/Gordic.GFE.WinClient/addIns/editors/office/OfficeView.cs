//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AlfView.cs                             </Name>
//    <Description> Třída obálky pro XmlEditor používaný na zobrazení XML souboru</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.FormatOffice;
using Gordic.GFE.WinClient.MessageView;
using Gordic.TextEditor.Document;
using System;
using System.IO;
using System.Runtime.InteropServices.ComTypes;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Třída obálky pro XmlEditor používaný na zobrazení XML souboru
    /// </summary>
    class OfficeView : AXmlOfficeView
    {
        #region XmlView
        /// <summary>
        /// přetížení kvůli uložení kopii šablony
        /// </summary>
        /// <param name="file"></param>
        /// <param name="stream"></param>
        public override void Save(OpenedFile file, Stream stream)
        {
            if (file.CancelSaving)
                return;

            base.Save(file, stream);
            try
            {
                IPersistFile persistFile = "MSE".Equals(CategoryName) || "OXS".Equals(CategoryName) ? (IPersistFile)OfficeTemplateService.GetDocument(file) : (IPersistFile)RtfTemplateService.GetDocument(file);

                if (persistFile != null && persistFile.IsDirty() == 0)
                {
                    persistFile.GetCurFile(out string curFile);
                    if (!string.IsNullOrEmpty(curFile))
                        persistFile.Save(curFile, true);
                }
            }
            catch { LoggingService.Error(GResources.GetResourceText(29450105) + "..."); } //RC 29450105 : Chybný pokus uložení dokumetu
        }
        #endregion

        #region AXmlOfficeView
        /// <summary>
        /// Validace dokumentu
        /// </summary>
        /// <returns>TRUE - validace proběhla úspěšně, FALSE v opačném případě</returns>
        public override bool Validate() => ValidateDocument(true);
        #endregion

        /// <summary>
        /// Instance objektu
        /// </summary>
        public static OfficeView Instance => instance as OfficeView;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="file">Otevřený soubor</param>
        /// <param name="category">kategorie sestavy</param>
        public virtual void Initialize(OpenedFile file, string category)
        {
            Initialize();
            Language = "ALF-" + category;
            _RdEditor.Language = this.Language;

            SetCategory(category);

            _Files.Add(file);
            _OnFileNameChanged(file);

            file.ForceInitializeView(this);

            switch (category)
            {
                case "RTF":
                    officeView = new RtfViewContent();
                    break;
                case "OXS":
                    officeView = new OxsViewContent();
                    break;
                default:
                    officeView = new MseViewContent();
                    break;
            }
            officeView.Initialize(this);
            SetStandardSecContent();
            SetPads(file);

            // indikuje, že soubor je nový
            if (PrimaryFile.IsUntitled)
                officeView.CreateTemplate();
        }

        void SetCategory(string category)
        {
            CategoryName = category;
            if (!CompilerMessageView.Instance.SelectCategory(category))
                CompilerMessageView.Instance.AddCategory(new MessageViewCategory(CategoryName, string.Format("{0} formát", CategoryName)));
        }

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override IViewContent Initialize()
        {
            bool? is64 = (new OfficeService.Office()).Is64();

            if (is64.HasValue
                && (is64.Value && !Environment.Is64BitProcess
                || !is64.Value && Environment.Is64BitProcess))
                MessageService.ShowWarning(String.Format(GResources.GetResourceText(2945200).Replace("\\r\\n", "\r\n"), (Environment.Is64BitProcess ? " 64-bitový" : " 32-bitový"), (is64.Value ? " 64-bitový" : " 32-bitový"))); //RC 2945200 : Řežim Návrháře sestav není kompatibilní s režimem Office.\r;\r;Office {0}\r;Návrhář sestav {1}\r;\r;Pro správné fungování spusťte aplikaci ve stejném režimu.

            return Initialize(ReportDesignerTextEditorProperties.Instance);
        }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="textEditorProperties">vlastnosti textového editoru</param>
        public override IViewContent Initialize(ITextEditorProperties textEditorProperties)
        {
            base.Initialize(textEditorProperties);

            _RdEditor.ActiveTextAreaControl.Caret.CaretModeChanged += pCaretModeChanged;
            _RdEditor.ActiveTextAreaControl.Caret.PositionChanged += pCaretChanged;
            _RdEditor.ActiveTextAreaControl.Enter += pCaretUpdate;
            return this;
        }

        /// <summary>
        /// Validace RTF objektu
        /// </summary>
        /// <param name="waitDialog">Indikuje zobrazení čekacího dialogu</param>
        internal bool ValidateDocument(bool waitDialog)
        {
            bool result = true;
            pShowOutputWindow();
            MessageViewCategory mvc = CompilerMessageView.Instance.GetCategory(CategoryName);
            mvc.AppendLine(string.Format("------ {0} {1} ------", GResources.GetResourceText(29450139), PrimaryFileName)); //RC 29450139 : validace sestavy
            string validateText = string.Empty;
            try
            {
                validateText += officeView.ValidateDocument(waitDialog, out bool validateResult);
                result = result && validateResult;
            }
            catch (RtfValidateException ex)
            {
                mvc.AppendLine(String.Empty);
                mvc.AppendLine(StringParser.Parse(ex.Message));
            }
            catch (MseValidateException ex)
            {
                mvc.AppendLine(String.Empty);
                mvc.AppendLine(StringParser.Parse(ex.Message));
            }
            mvc.AppendLine(validateText);
            mvc.AppendLine("------ " + GResources.GetResourceText(29450140) + " ------"); //RC 29450140 : konec validace 

            CompilerMessageView.Instance.SelectCategory(CategoryName);

            return result;
        }
    }
}
