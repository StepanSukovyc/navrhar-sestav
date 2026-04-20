//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CodeCompletionOptions.cs                 </Name>
//    <Description> Třída obsahuje statické vlastnosti pro možnosti doplňování kódu.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.TextEditor.Gui.CompletionWindow;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Třída obsahuje statické vlastnosti pro možnosti doplňování kódu.
    /// </summary>
    public class CodeCompletionOptions : ICompletionOptions
    {
        #region ICompletionOptions
        /// <summary>
        /// automatické vložení jednoznačného textu
        /// </summary>
        public bool AutomateCompleteIfUnique
        {
            get { return properties.Get("AutomateCompleteIfUnique", true); }
            set { properties.Set("AutomateCompleteIfUnique", value); }
        }
        /// <summary>
        /// automatické vložení jednoznačného textu
        /// </summary>
        public bool ShowDescriptionWindow
        {
            get { return properties.Get("ShowDescriptionWindow", true); }
            set { properties.Set("ShowDescriptionWindow", value); }
        }
        #endregion

        Property properties;
        /// <summary>
        /// Vlastnosti
        /// </summary>
        public Property Properties { get { return properties; } }

        /// <summary>
        /// Globální nastavení zapnutí doplňovače.
        /// </summary>
        public bool EnableCodeCompletion
        {
            get { return properties.Get("EnableCC", true); }
            set { properties.Set("EnableCC", value); }
        }

        /// <exclude/>
        public bool DataUsageCacheEnabled
        {
            get { return properties.Get("DataUsageCacheEnabled", true); }
            set { properties.Set("DataUsageCacheEnabled", value); }
        }

        /// <exclude/>
        public int DataUsageCacheItemCount
        {
            get { return properties.Get("DataUsageCacheItemCount", 500); }
            set { properties.Set("DataUsageCacheItemCount", value); }
        }

        /// <exclude/>
        public bool TooltipsEnabled
        {
            get { return properties.Get("TooltipsEnabled", true); }
            set { properties.Set("TooltipsEnabled", value); }
        }

        /// <exclude/>
        public bool KeywordCompletionEnabled
        {
            get { return properties.Get("KeywordCompletionEnabled", true); }
            set { properties.Set("KeywordCompletionEnabled", value); }
        }

        /// <exclude/>
        public bool CompleteWhenTyping
        {
            get
            {
                return /*
                          * až se dodělá kompletní mapování
                          * jinak docelá brzdí psaní
                          * properties.Get("CompleteWhenTyping", true);*/ 
                    false;
            }
            set { properties.Set("CompleteWhenTyping", value); }
        }

        /// <exclude/>
        public bool InsightEnabled
        {
            get { return properties.Get("InsightEnabled", true); }
            set { properties.Set("InsightEnabled", value); }
        }

        /// <exclude/>
        public bool InsightRefreshOnComma
        {
            get { return properties.Get("InsightRefreshOnComma", true); }
            set { properties.Set("InsightRefreshOnComma", value); }
        }

        /// <summary>
        /// přepsaní stávajícího textu textového editoru
        /// </summary>
        public bool AllowCompleteExistingExpression
        {
            get { return properties.Get("AllowCompleteExistingExpression", true); }
            set { properties.Set("AllowCompleteExistingExpression", value); }
        }

        static CodeCompletionOptions mainProperties;
        /// <summary>
        /// Instance třídy
        /// </summary>
        public static CodeCompletionOptions Instance
        {
            get
            {
                if (mainProperties == null)
                    mainProperties = new CodeCompletionOptions();

                return mainProperties;
            }
        }

        private CodeCompletionOptions()
        {
            properties = PropertyService.Get("CodeCompletionOptions", new Property());
        }

    }
}
