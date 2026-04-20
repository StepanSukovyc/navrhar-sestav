//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.LanguageProperties.cs                    </Name>
//    <Description> Vlastnosti jazyka, v jakem je napsan dokument               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Refactoring;
using Gordic.General;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Vlastnosti jazyka, v jakem je napsan dokument
    /// </summary>
    public class LanguageProperties
    {
        /// <summary>
        /// Fiktivní case-sensitive vlastnosti jazyka, ve kterém je napsan obsah souboru
        /// </summary>
        public readonly static LanguageProperties None = new LanguageProperties(StringComparer.Ordinal);

        /// <summary>
        /// vlastnosti formátu GRF
        /// </summary>
        public readonly static LanguageProperties GRF = new GRFProperties();
        /// <summary>
        /// vlastnosti formátu GRR
        /// </summary>
        public readonly static LanguageProperties GRR = new GRRProperties();
        /// <summary>
        /// vlastnosti formátu MSE
        /// </summary>
        public readonly static LanguageProperties MSE = new MSEProperties();
        /// <summary>
        /// vlastnosti formátu OXS
        /// </summary>
        public readonly static LanguageProperties OXS = new OXSProperties();
        /// <summary>
        /// vlastnosti formátu RTF
        /// </summary>
        public readonly static LanguageProperties RTF = new RTFProperties();

        bool isKnownLanguage = false;
        /// <summary>
        /// znamý jazyk
        /// </summary>
        public bool IsKnownLanguage { get { return isKnownLanguage; } }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="nameComparer">Porovnávač jmén</param>
        public LanguageProperties(StringComparer nameComparer)
        {
            this.nameComparer = nameComparer;
            isKnownLanguage = false;
        }

        #region Poskytovatelé služeb specifické pro jazyk
        readonly StringComparer nameComparer;
        /// <summary>
        /// Porovnávač jmén
        /// </summary>
        public StringComparer NameComparer { get { return nameComparer; } }

        /// <summary>
        /// Získání CodeDomProvider pro tento jazyk. Vrácí NULL!
        /// </summary>
        public virtual System.CodeDom.Compiler.CodeDomProvider CodeDomProvider { get => null; }
        #endregion

        /// <summary>
        /// Gets if the language supports calling extension properties
        /// (first parameter = instance parameter)
        /// </summary>
        public virtual bool SupportsExtensionProperties
        {
            get { return false; }
        }

        /// <exclude/>
        public override string ToString()
        {
            return "[" + base.ToString() + "]";
        }

        #region Text Finder
        /// <summary>
        /// Hledání textu
        /// </summary>
        protected sealed class WholeWordTextFinder : TextFinder
        {
            readonly string searchedText;
            readonly bool caseInsensitive;
            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            /// <param name="word">slovo</param>
            /// <param name="nameComparer">porovnávač názvů</param>
            public WholeWordTextFinder(string word, StringComparer nameComparer)
            {
                if (word == null) word = string.Empty;

                caseInsensitive = nameComparer.Equals("a", "A");
                if (caseInsensitive)
                    this.searchedText = word.ToLowerInvariant();
                else
                    this.searchedText = word;
            }
            /// <summary>
            /// příprava vstupního textu
            /// </summary>
            /// <param name="inputText">vstupní text</param>
            /// <returns></returns>
            public override string PrepareInputText(string inputText)
            {
                if (caseInsensitive)
                    return inputText.ToLowerInvariant();
                else
                    return inputText;
            }
            /// <summary>
            /// hledání textu
            /// </summary>
            /// <param name="inputText">vstupní text</param>
            /// <param name="startPosition">startovní pozice</param>
            /// <returns></returns>
            public override TextFinderMatch Find(string inputText, int startPosition)
            {
                if (searchedText.Length == 0)
                    return TextFinderMatch.Empty;
                int pos = startPosition - 1;
                while ((pos = inputText.IndexOf(searchedText, pos + 1)) >= 0)
                {
                    if (pos > 0 && char.IsLetterOrDigit(inputText, pos - 1))
                        continue; // memberName není celé slovo (a.SomeName nelze odkazovat na Name)
                    if (pos < inputText.Length - searchedText.Length - 1
                        && char.IsLetterOrDigit(inputText, pos + searchedText.Length))
                        continue; // memberName není celé slovo (a.Name2 nelze odkazovat Name)
                    return new TextFinderMatch(pos, searchedText.Length);
                }
                return TextFinderMatch.Empty;
            }
        }
        /// <summary>
        /// Kombinované hledání textu
        /// </summary>
        protected sealed class CombinedTextFinder : TextFinder
        {
            readonly TextFinder[] finders;
            /// <summary>
            /// Vytvoření nnové instance třídy
            /// </summary>
            /// <param name="finders">seznam hledačů</param>
            public CombinedTextFinder(params TextFinder[] finders)
            {
                if (finders == null)
                    throw new ArgumentNullException("finders");
                if (finders.Length == 0)
                    throw new ArgumentException("finders.Length " + GResources.GetResourceText(29450343) + " > 0"); //RC 29450343 : musí být
                this.finders = finders;
            }
            /// <summary>
            /// příprava textu
            /// </summary>
            /// <param name="inputText">Vstupní text</param>
            /// <returns></returns>
            public override string PrepareInputText(string inputText)
            {
                return finders[0].PrepareInputText(inputText);
            }
            /// <summary>
            /// Hledání
            /// </summary>
            /// <param name="inputText">vstupní text</param>
            /// <param name="startPosition">startovní pozice</param>
            /// <returns></returns>
            public override TextFinderMatch Find(string inputText, int startPosition)
            {
                TextFinderMatch best = TextFinderMatch.Empty;
                foreach (TextFinder f in finders)
                {
                    TextFinderMatch r = f.Find(inputText, startPosition);
                    if (r.Position >= 0 && (best.Position < 0 || r.Position < best.Position))
                        best = r;
                }
                return best;
            }
        }
        /// <summary>
        /// Další hledání
        /// </summary>
        protected sealed class IndexBeforeTextFinder : TextFinder
        {
            readonly string searchText;
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="searchText">Hledaný text</param>
            public IndexBeforeTextFinder(string searchText)
            {
                this.searchText = searchText;
            }
            /// <summary>
            /// Hledání
            /// </summary>
            /// <param name="inputText">vstupní text</param>
            /// <param name="startPosition">startovní pozice</param>
            /// <returns></returns>
            public override TextFinderMatch Find(string inputText, int startPosition)
            {
                int pos = inputText.IndexOf(searchText, startPosition);
                if (pos >= 0)
                    return new TextFinderMatch(pos, searchText.Length, pos - 1);
                else
                    return TextFinderMatch.Empty;
            }
        }
        #endregion

        #region ALFProperties
        /// <summary>
        /// vlastnosti GRF formátu
        /// </summary>
        internal sealed class GRFProperties : LanguageProperties
        {
            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            public GRFProperties() : base(StringComparer.Ordinal) { isKnownLanguage = true; }
        }
        /// <summary>
        /// vlastnosti GRR formátu
        /// </summary>
        internal sealed class GRRProperties : LanguageProperties
        {
            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            public GRRProperties() : base(StringComparer.Ordinal) { isKnownLanguage = true; }
        }
        /// <summary>
        /// vlastnosti MSE formátu
        /// </summary>
        internal sealed class MSEProperties : LanguageProperties
        {
            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            public MSEProperties() : base(StringComparer.Ordinal) { isKnownLanguage = true; }
        }
        /// <summary>
        /// vlastnosti MSE formátu
        /// </summary>
        internal sealed class OXSProperties : LanguageProperties
        {
            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            public OXSProperties() : base(StringComparer.Ordinal) { isKnownLanguage = true; }
        }
        /// <summary>
        /// vlastnosti RTF formátu
        /// </summary>
        internal sealed class RTFProperties : LanguageProperties
        {
            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            public RTFProperties() : base(StringComparer.Ordinal) { isKnownLanguage = true; }
        }
        #endregion
    }
}
