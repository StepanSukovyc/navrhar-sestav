//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CodeCompletionData.cs                    </Name>
//    <Description> dokončovací položka                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;
using Gordic.TextEditor;
using Gordic.TextEditor.Gui.CompletionWindow;
using Gordic.GFE.Parsers.Lexer;
using Gordic.General;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// dokončovací položka
    /// </summary>
    public class CodeCompletionData : ICompletionData
    {
        #region ICompletionData
        int imageIndex;
        /// <summary>
        /// index obrázku (položky dokončení) externího seznamu všech dostupných obrázků
        /// </summary>
        public int ImageIndex
        {
            get { return imageIndex; }
            set { imageIndex = value; }
        }
        
        string text;
        /// <summary>
        /// text položky
        /// </summary>
        public string Text
        {
            get { return text; }
            set { text = value; }
        }

        string description;
        /// <summary>
        /// popis položky
        /// </summary>
        public string Description
        {
            get
            {
                return description + (Overloads > 0 ? " "
                    + StringParser.Parse("(+${NumOverloads} " + GResources.GetResourceText(29450095) + ")", new string[,] { { "NumOverloads", Overloads.ToString() } })
                    : String.Empty); //RC 29450095 : přetížení
            }
            set { description = value; }
        }
        /// <summary>
        /// Získá/nastaví hodnotu priority pro dokončení datové položky.
        /// Užitečné při výběru položky podle jejich počátečních znaků, 
        /// položka s nejvyšší prioritou je vybrána jako první.
        /// </summary>
        public double Priority { get; set; }

        /// <summary>
        /// Indikuje, jedinečnost dokončovací položky dle počatečních znaků.
        /// </summary>
        public bool IsUnique { get; set; }

        /// <summary>
        /// Vložení prvku do textového editoru
        /// </summary>
        /// <param name="textArea">TextArea do které se vkláda dokončovací položka.</param>
        /// <param name="ch">
        /// Znak, který by měl být po dokončení dat vložen.
        /// Použijte \0, pokud nechcete vkládat žádný znak.
        /// </param>
        /// <returns>
        /// TRUE pokud akce vložení byla dokončená znakem <paramref name="ch"/>; jinak FALSE.
        /// </returns>
        public bool InsertAction(TextArea textArea, char ch)
        {
            if (wordName != null)
                CodeCompletionDataUsageCache.IncrementUsage(wordName);
            textArea.InsertString(text);
            return false;
        }
        #endregion

        /// <summary>
        /// člen, pro který byla vytvořená tato nápověda.
        /// </summary>
        public IMember Member { get { return entity as IMember; } }

        readonly IEntity entity;
        /// <summary>
        /// Jednotka, pro kterou byla vytvořená nápověda.
        /// </summary>
        public IEntity Entity { get { return entity; } }

        /// <summary>
        /// přetížení
        /// </summary>
        public int Overloads { get; set; }

        string wordName;
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="text">text dokončovací položky</param>
        /// <param name="imageIndex">index obrázku (položky dokončení) externího seznamu všech dostupných obrázků</param>
        public CodeCompletionData(string text, int imageIndex)
        {
            description = String.Empty;
            this.text = text;
            this.imageIndex = imageIndex;
            InitializePriority(text);
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="member">člen</param>
        public CodeCompletionData(IMember member)
        {
            this.entity = member;
            imageIndex = ClassBrowserIconService.GetIcon(member);
            //text = ambience.Convert(member);
            //ambience.ConversionFlags = ConversionFlags.StandardConversionFlags;
            //description = ambience.Convert(member);
            InitializePriority(member.Name);
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="field">uvedené pole</param>
        public CodeCompletionData(IField field)
            : this((IMember)field)
        {
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="completationEntity">daná jednotka nápovědy</param>
        public CodeCompletionData(ICompletationEntity completationEntity)
        {
            text = completationEntity.Name;
            imageIndex = ClassBrowserIconService.GetIcon(completationEntity);
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="tokenObject">klíčový objekt</param>
        public CodeCompletionData(TokenObject tokenObject)
        {
            text = tokenObject.Word;
            imageIndex = tokenObject.ImageIndex;
            description = tokenObject.Description;
            InitializePriority(text);
        }

        void InitializePriority(string name)
        {
            this.wordName = name;
            Priority = CodeCompletionDataUsageCache.GetPriority(name, true);
        }
    }
}
