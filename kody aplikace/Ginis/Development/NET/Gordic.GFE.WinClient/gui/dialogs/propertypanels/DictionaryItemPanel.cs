//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DictionaryItemPanel.cs                 </Name>
//    <Description> panel editace položek seznamu                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-06                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// panel editace položek seznamu
    /// </summary>
    class DictionaryItemPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get => currentItem; }

        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            if (Context == null)
                return;
            try
            {
                currentItem = new DictionaryItem(Context.PropertyDescriptor.GetValue(Context.Instance) as DictionaryItem);
                if (currentItem != null)
                    textEditorControl.Text = currentItem.Value;
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " DictionaryItemPanel:" + ex.Message); }
            _change = false;
        }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (_change && Context != null && Context.PropertyDescriptor != null)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450470)); //RC 29450470 : změna položek seznamu

                Context?.PropertyDescriptor.SetValue(Context.Instance, currentItem);
            }
            return base.Accept();
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.DictionaryItemPanel.xfrm");
                textEditorControl = (TextEditorControl)ControlDictionary["textEditorControl"];
                textEditorControl.Leave += TxbLeave;
                textEditorControl.SetHighlighting("Python");
                ThreadService.SafeThreadAsyncCall(SetDefault);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " DictionaryItemPanel.xfrm:" + ex.Message); }
        }
        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition() => false;
        #endregion

        TextEditorControl textEditorControl;

        //indikuje, že text sktiptu byl záměrně pozměněn
        // maximální množství skriptů je 4
        bool _change = false;

        DictionaryItem currentItem;

        void TxbLeave(object sender, EventArgs e)
        {
            _change = currentItem.Value != textEditorControl.Text;
            currentItem.Value = textEditorControl.Text;
        }

    }
}
